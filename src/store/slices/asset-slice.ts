import { createSlice } from '@reduxjs/toolkit'
import { env } from '../../Environment';
import axios from 'axios';
import { SearchAsset, Asset, initAsset } from '../../app/app1-component/asset/asset-type';
import { _authenReset } from './authen-slice';



type AssetState = {
    loading: boolean,
    list: Asset[]
    page: number,
    pages: number,
    total: number
    data: Asset,
    errmsg: string,

    param1: string,
    param2: string,
    param3: string,
    droplist1: any[],
    droplist2: any[],
}

const initialState: AssetState = {
    loading: false,
    list:  [],
    page:  1,
    pages: 1,
    total: 0,
    data: initAsset,
    errmsg: '',

    param1: '',
    param2: '',
    param3: '',
    droplist1: [],
    droplist2: [],
}


const AssetSlice = createSlice({
  name: 'asset',
  initialState,
  reducers: {
    _loading: (state: AssetState) => {
        state.loading = true;
    },

    _set_list: (state: AssetState, action: any) => {
        state.loading= false;
        state.page   = action.payload.page;
        state.pages  = action.payload.pages;
        state.total  = action.payload.total;
        state.list   = action.payload.list;   
        state.errmsg = action.payload.errmsg;      
    },

    _set_data: (state: AssetState, action: any) => {
        state.loading= false;
        state.data   = action.payload.data;   
        state.errmsg = action.payload.errmsg;         
    },

    _new_data: (state: AssetState) => {
        state.data = initAsset;
        state.errmsg = "";
        state.droplist2 = [];
    },
    _clear_state: (state: AssetState) => initialState,

    //*******************************/
    _param1_change: (state: AssetState, action: any) => {
        state.param1 = action.payload.param1;
    },
    _param2_change: (state: AssetState, action: any) => {
        state.param2 = action.payload.param2;
    },    
    _param3_change: (state: AssetState, action: any) => {
        state.param3 = action.payload.param3;
    },       
    
    _set_droplist1: (state: AssetState, action: any) => {
        state.loading= false;
        state.errmsg = action.payload.errmsg;
        state.droplist1 = action.payload.droplist;
    },    
    _set_droplist2: (state: AssetState, action: any) => {
        state.loading= false;
        state.errmsg = action.payload.errmsg;
        state.droplist2 = action.payload.droplist;
        state.param2 = "";
    },       
  }  
});

export const { _loading, _set_list, _set_data, _new_data, _clear_state, _param1_change, _param2_change, _param3_change, _set_droplist1, _set_droplist2 } = AssetSlice.actions
export default AssetSlice.reducer



export const SearchAction = (cond: SearchAsset, navigate: any) =>{
    let _param = "";
    _param += "?pageNo="   + cond.pageNo;
    _param += "&pageSize=" + cond.pageSize;
    _param += "&totalRec=" + cond.totalRec;
    _param += "&ast_grp_id=" + cond.ast_grp_id;
    _param += "&ast_cat_id=" + cond.ast_cat_id;
    _param += "&ast_name=" + cond.ast_name;

    const _serviceurl = env.url+'/service/asset/search' + _param;
    return async (dispatch: any) =>{
        dispatch( _loading() );
        try {
            const config   = { withCredentials: true, headers: {'Content-Type': 'application/json;charset=UTF-8'} };
            const response = await axios.get(_serviceurl, config);  
            const resData  = response.data;
            if (resData.list.length === 0) {
                alert("Not found data...");
                dispatch( _set_list({page: 1, pages: 1, total: 0, list: [], errmsg: 'Not found data...'}) );
            }
            else {
                dispatch( _set_list({page: cond.pageNo, pages: resData.total_page, total: resData.total_record, list: resData.list, errmsg: ''}) );
            }
        }
        catch(e: any) {
            if (e.response.status === 401) {
                dispatch( _clear_state() );
                dispatch( _authenReset() );
            }
            else {
                dispatch( _set_list({page: 1, pages: 1, total: 0, list: [], errmsg: e.message}) );
            }
        }
    }
}


export const SaveAction = (data: Asset, navigate: any) =>{
    const _serviceurl = env.url+'/service/asset/save';
    return async (dispatch: any) =>{
        dispatch( _loading() );
        try {
            const config   = { withCredentials: true, headers: {'Content-Type': 'application/json;charset=UTF-8'} };
            const response = await axios.post(_serviceurl, data, config);   
            const resData  = response.data;
            dispatch( _set_data({data: resData, errmsg: ''}) );           
        }
        catch(e: any) {
            if (e.response.status === 401) {
                dispatch( _clear_state() );
                dispatch( _authenReset() );
            }
            else { console.log(e);
                dispatch( _set_data({data: data, errmsg: e.response.data}) );
            }
        }
    }
}


export const GetdataAction = (ast_id: string, navigate: any) =>{
    const _serviceurl = env.url+'/service/asset/' + ast_id;
    return async (dispatch: any) =>{
        dispatch( _loading() );
        let ast_grp_id = "";
        try {
            const config   = { withCredentials: true, headers: {'Content-Type': 'application/json;charset=UTF-8'} };
            const response = await axios.get(_serviceurl, config);   
            const resData  = response.data;
            ast_grp_id     = response.data.ast_grp_id;
            dispatch( _set_data({data: resData, errmsg: ''}) );          
        }
        catch(e: any) {
            if (e.response.status === 401) {
                dispatch( _clear_state() );
                dispatch( _authenReset() );
            }
            else {
                dispatch( _set_data({data: null, errmsg: e.message}) );
            }
        }
        
        // Get DropList2
        const _serviceurl2 = env.url+'/service/category/droplist?cat_grp_id=' + ast_grp_id;
        try {
            const config   = { withCredentials: true, headers: {'Content-Type': 'application/json;charset=UTF-8'} };
            const response = await axios.get(_serviceurl2, config);   
            const resData  = response.data;
            dispatch( _set_droplist2({droplist: resData, errmsg: ''}) );           
        }
        catch(e: any) {
            if (e.response.status === 401) {
                dispatch( _clear_state() );
                dispatch( _authenReset() );
            }
            else {
                dispatch( _set_droplist2({droplist: null, errmsg: e.message}) );
            }
        }
    }    
}


export const DropList1Action = () =>{
    const _serviceurl = env.url+'/service/group/droplist';
    return async (dispatch: any) =>{
        dispatch( _loading() );
        try {
            const config   = { withCredentials: true, headers: {'Content-Type': 'application/json;charset=UTF-8'} };
            const response = await axios.get(_serviceurl, config);   
            const resData  = response.data;
            dispatch( _set_droplist1({droplist: resData, errmsg: ''}) );           
        }
        catch(e: any) {
            if (e.response.status === 401) {
                dispatch( _clear_state() );
                dispatch( _authenReset() );
            }
            else {
                dispatch( _set_droplist1({droplist: null, errmsg: e.message}) );
            }
        }
    }    
}


export const DropList2Action = (grp_id: string) =>{
    const _serviceurl = env.url+'/service/category/droplist?cat_grp_id=' + grp_id;
    return async (dispatch: any) =>{
        dispatch( _loading() );
        try {
            const config   = { withCredentials: true, headers: {'Content-Type': 'application/json;charset=UTF-8'} };
            const response = await axios.get(_serviceurl, config);   
            const resData  = response.data;
            dispatch( _set_droplist2({droplist: resData, errmsg: ''}) );           
        }
        catch(e: any) {
            if (e.response.status === 401) {
                dispatch( _clear_state() );
                dispatch( _authenReset() );
            }
            else {
                dispatch( _set_droplist2({droplist: null, errmsg: e.message}) );
            }
        }
    }    
}