import { createSlice } from '@reduxjs/toolkit'
import { env } from '../../Environment';
import axios from 'axios';
import { SearchGroup, Group, initGroup } from '../../app/app1-component/group/group-type';
import { _authenReset } from './authen-slice';



type GroupState = {
    loading: boolean,
    list: Group[]
    page: number,
    pages: number,
    total: number
    data: Group,
    errmsg: string,

    param1: string,
}

const initialState: GroupState = {
    loading: false,
    list:  [],
    page:  1,
    pages: 1,
    total: 0,
    data: initGroup,
    errmsg: '',

    param1: '',
}


const GroupSlice = createSlice({
  name: 'group',
  initialState,
  reducers: {
    _loading: (state: GroupState) => {
        state.loading = true;
    },

    _set_list: (state: GroupState, action: any) => {
        state.loading= false;
        state.page   = action.payload.page;
        state.pages  = action.payload.pages;
        state.total  = action.payload.total;
        state.list   = action.payload.list;   
        state.errmsg = action.payload.errmsg;      
    },

    _set_data: (state: GroupState, action: any) => {
        state.loading= false;
        state.data   = action.payload.data;   
        state.errmsg = action.payload.errmsg;         
    },

    _new_data: (state: GroupState) => {
        state.data = initGroup;
        state.errmsg = "";
    },
    _clear_state: (state: GroupState) => initialState,

    //*******************************/
    _param1_change: (state: GroupState, action: any) => {
        state.param1 = action.payload.param1;
    },
  }  
});

export const { _loading, _set_list, _set_data, _new_data, _clear_state, _param1_change } = GroupSlice.actions
export default GroupSlice.reducer



export const SearchAction = (cond: SearchGroup, navigate: any) =>{
    let _param = "";
    _param += "?pageNo="   + cond.pageNo;
    _param += "&pageSize=" + cond.pageSize;
    _param += "&totalRec=" + cond.totalRec;
    _param += "&grp_name=" + cond.grp_name;

    const _serviceurl = env.url+'/service/group/search' + _param;
    return async (dispatch: any) =>{
        dispatch( _loading() );
        try {
            const config   = { withCredentials: true, headers: {'Content-Type': 'application/json;charset=UTF-8'} };
            const response = await axios.get(_serviceurl, config);  
            const resData  = response.data;
            if (resData.list.length === 0) {
                alert("Not found data...");
                dispatch( _set_list({page: 1, pages: 1, total: 0, list: [], errmsg: 'Not found data...'} as any) );
            }
            else {
                dispatch( _set_list({page: cond.pageNo, pages: resData.total_page, total: resData.total_record, list: resData.list, errmsg: ''} as any) );
            }
        }
        catch(e: any) {
            if (e.response.status === 401) {
                dispatch( _clear_state() );
                dispatch( _authenReset() );
            }
            else {
                dispatch( _set_list({page: 1, pages: 1, total: 0, list: [], errmsg: e.message} as any) );
            }
        }
    }
}


export const SaveAction = (data: Group, navigate: any) =>{
    const _serviceurl = env.url+'/service/group/save';
    return async (dispatch: any) =>{
        dispatch( _loading() );
        try {
            const config   = { withCredentials: true, headers: {'Content-Type': 'application/json;charset=UTF-8'} };
            const response = await axios.post(_serviceurl, data, config);   
            const resData  = response.data;
            dispatch( _set_data({data: resData, errmsg: ''} as any) );           
        }
        catch(e: any) {
            if (e.response.status === 401) {
                dispatch( _clear_state() );
                dispatch( _authenReset() );
            }
            else {
                dispatch( _set_data({data: data, errmsg: e.message} as any) );
            }
        }
    }
}


export const GetdataAction = (grp_id: string, navigate: any) =>{
    const _serviceurl = env.url+'/service/group/' + grp_id;
    return async (dispatch: any) =>{
        dispatch( _loading() );
        try {
            const config   = { withCredentials: true, headers: {'Content-Type': 'application/json;charset=UTF-8'} };
            const response = await axios.get(_serviceurl, config);   
            const resData  = response.data;
            dispatch( _set_data({data: resData, errmsg: ''} as any) );           
        }
        catch(e: any) {
            if (e.response.status === 401) {
                dispatch( _clear_state() );
                dispatch( _authenReset() );
            }
            else {
                dispatch( _set_data({data: null, errmsg: e.message} as any) );
            }
        }
    }    
}