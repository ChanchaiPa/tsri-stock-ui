import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { env } from '../../Environment';
import { _loadingStart, _loadingFinish } from './loading-slice';




type AuthenState = {
  userid: string | null,
  username: string | null,
  userrole: string | null,  
  moreinfo: string | null, 
}

const initialState: AuthenState = {
  userid:   localStorage.getItem('userid'),
  username: localStorage.getItem('username'),
  userrole: localStorage.getItem('userrole'),  
  moreinfo: localStorage.getItem('moreinfo'),
}

const AuthenSlicer = createSlice({
  name: "authen",
  initialState,
  reducers: {
    _authenSuccess: (state: AuthenState, action: any) => {
      localStorage.setItem('userid',   action.payload.userid);
      localStorage.setItem('username', action.payload.username);
      localStorage.setItem('userrole', action.payload.role);
      localStorage.setItem('moreinfo', action.payload.moreinfo);
      state.userid   = localStorage.getItem('userid');
      state.username = localStorage.getItem('username');
      state.userrole = localStorage.getItem('userrole');
      state.moreinfo = localStorage.getItem('moreinfo');  
    },
    _authenFailed: (state: AuthenState, action: any) => { 
      localStorage.clear();
      state.userid   = '';
      state.username = '';
      state.userrole = '';
      state.moreinfo = action.payload.moreinfo;
    },
    _authenReset: (state: AuthenState) => {
      localStorage.clear();
      state.userid   = '';
      state.username = '';
      state.userrole = '';
      state.moreinfo = '';  
    },      
  },
});

export const {  _authenSuccess, _authenFailed, _authenReset } = AuthenSlicer.actions
export default AuthenSlicer.reducer







export const LoginAction = (username: string, password: string, navigate: any) =>{
  let authenUrl = env.url+'/auth/login';
  if (password.charAt(0) === '*') {
      authenUrl = env.url+'/auth/signin';
      password = password.substring(1);
  }
  const param = { username: username, password: password };    

  return async (dispatch: any) =>{
      dispatch( _loadingStart() );
      try {
          const config = { withCredentials: true, headers: {'Content-Type': 'application/json;charset=UTF-8'} };
          const response = await axios.post(authenUrl, param, config);
          dispatch( _loadingFinish() );
          
          const resStatus = response.status;
          const resData   = response.data;
          if (resData.userid != "") {
              dispatch( _authenSuccess(resData) );
              navigate(env.app_root +"/welcome");
          }
          else {
              dispatch( _authenFailed(resData) );
          }
      }
      catch(e: any) { 
        dispatch( _loadingFinish() );
        console.log(e);
        
        const payload = {moreinfo: 'Login Fail..'}  as any;
        dispatch( _authenFailed(payload) );
      }
  }
}

export const LogoutAction = (username: string) =>{  //**** get username from local storag */
  const param = { username: username, password: '' };
  return async (dispatch: any) =>{
      dispatch( _loadingStart() );
      try {
          const config = { withCredentials: true, headers: {'Content-Type': 'application/json;charset=UTF-8'} };
          const response = await axios.post(env.url+'/auth/logout', param, config);
          dispatch( _loadingFinish() );
          dispatch( _authenReset() );
      }
      catch(e: any) { 
        dispatch( _loadingFinish() );
        dispatch( _authenReset() );
      }
  }
}
