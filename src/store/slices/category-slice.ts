import { createSlice } from '@reduxjs/toolkit'
import { env } from '../../Environment';
import axios from 'axios';
import { SearchCategory, Category, initCategory } from '../../app/app1-component/category/category-type';
import { _authenReset } from './authen-slice';



type CategoryState = {
    loading: boolean,
    list: Category[]
    page: number,
    pages: number,
    total: number
    data: Category,
    errmsg: string,

    param1: string,
    param2: string,
    droplist1: any[]
}

const initialState: CategoryState = {
    loading: false,
    list:  [],
    page:  1,
    pages: 1,
    total: 0,
    data: initCategory,
    errmsg: '',

    param1: '',
    param2: '',
    droplist1: []
}


const CategorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    _loading: (state: CategoryState) => {
        state.loading = true;
    },

    _set_list: (state: CategoryState, action: any) => {
        state.loading= false;
        state.page   = action.payload.page;
        state.pages  = action.payload.pages;
        state.total  = action.payload.total;
        state.list   = action.payload.list;   
        state.errmsg = action.payload.errmsg;      
    },

    _set_data: (state: CategoryState, action: any) => {
        state.loading= false;
        state.data   = action.payload.data;   
        state.errmsg = action.payload.errmsg;         
    },

    _new_data: (state: CategoryState) => {
        state.data = initCategory;
        state.errmsg = "";
    },
    _clear_state: (state: CategoryState) => initialState,

    //*******************************/
    _param1_change: (state: CategoryState, action: any) => {
        state.param1 = action.payload.param1;
    },
    _param2_change: (state: CategoryState, action: any) => {
        state.param2 = action.payload.param2;
    },    
    
    _set_droplist1: (state: CategoryState, action: any) => {
        state.loading= false;
        state.droplist1 = action.payload.droplist;
        state.errmsg = action.payload.errmsg;
    },      
  }  
});

export const { _loading, _set_list, _set_data, _new_data, _clear_state, _param1_change, _param2_change, _set_droplist1 } = CategorySlice.actions
export default CategorySlice.reducer



export const SearchAction = (cond: SearchCategory, navigate: any) =>{
    let _param = "";
    _param += "?pageNo="   + cond.pageNo;
    _param += "&pageSize=" + cond.pageSize;
    _param += "&totalRec=" + cond.totalRec;
    _param += "&cat_grp_id=" + cond.cat_grp_id;
    _param += "&cat_name=" + cond.cat_name;

    const _serviceurl = env.url+'/service/category/search' + _param;
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


export const SaveAction = (data: Category, navigate: any) =>{
    const _serviceurl = env.url+'/service/category/save';
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
            else { console.log(e);
                dispatch( _set_data({data: data, errmsg: e.response.data} as any) );
            }
        }
    }
}


export const GetdataAction = (cat_id: string, navigate: any) =>{
    const _serviceurl = env.url+'/service/category/' + cat_id;
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


export const DropList1Action = () =>{
    const _serviceurl = env.url+'/service/group/droplist';
    return async (dispatch: any) =>{
        dispatch( _loading() );
        try {
            const config   = { withCredentials: true, headers: {'Content-Type': 'application/json;charset=UTF-8'} };
            const response = await axios.get(_serviceurl, config);   
            const resData  = response.data;
            dispatch( _set_droplist1({droplist: resData, errmsg: ''} as any) );           
        }
        catch(e: any) {
            if (e.response.status === 401) {
                dispatch( _clear_state() );
                dispatch( _authenReset() );
            }
            else {
                dispatch( _set_droplist1({droplist: null, errmsg: e.message} as any) );
            }
        }
    }    
}