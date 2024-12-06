import { createSlice } from '@reduxjs/toolkit'
import { env } from '../../Environment';
import axios from 'axios';
import { SearchSupplier, Supplier, initSupplier } from '../../app/app1-component/supplier/supplier-type';
import { _authenReset } from './authen-slice';



type SupplierState = {
    loading: boolean,
    list: Supplier[]
    page: number,
    pages: number,
    total: number
    data: Supplier,
    errmsg: string,

    param1: string,
}

const initialState: SupplierState = {
    loading: false,
    list:  [],
    page:  1,
    pages: 1,
    total: 0,
    data: initSupplier,
    errmsg: '',

    param1: '',
}


const SupplierSlice = createSlice({
  name: 'supplier',
  initialState,
  reducers: {
    _loading: (state: SupplierState) => {
        state.loading = true;
    },

    _set_list: (state: SupplierState, action: any) => {
        state.loading= false;
        state.page   = action.payload.page;
        state.pages  = action.payload.pages;
        state.total  = action.payload.total;
        state.list   = action.payload.list;   
        state.errmsg = action.payload.errmsg;      
    },

    _set_data: (state: SupplierState, action: any) => {
        state.loading= false;
        state.data   = action.payload.data;   
        state.errmsg = action.payload.errmsg;         
    },

    _new_data: (state: SupplierState) => {
        state.data = initSupplier;
        state.errmsg = "";
    },
    _clear_state: (state: SupplierState) => initialState,

    //*******************************/
    _param1_change: (state: SupplierState, action: any) => {
        state.param1 = action.payload.param1;
    },
  }  
});

export const { _loading, _set_list, _set_data, _new_data, _clear_state, _param1_change } = SupplierSlice.actions
export default SupplierSlice.reducer



export const SearchAction = (cond: SearchSupplier, navigate: any) =>{
    let _param = "";
    _param += "?pageNo="   + cond.pageNo;
    _param += "&pageSize=" + cond.pageSize;
    _param += "&totalRec=" + cond.totalRec;
    _param += "&sup_name=" + cond.sup_name;

    const _serviceurl = env.url+'/service/supplier/search' + _param;
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


export const SaveAction = (data: Supplier, navigate: any) =>{
    const _serviceurl = env.url+'/service/supplier/save';
    return async (dispatch: any) =>{
        dispatch( _loading() );
        try {
            const config   = { withCredentials: true, headers: {'Content-Type': 'application/json;charset=UTF-8'} };
            const response = await axios.post(_serviceurl, data, config);   
            const resData  = response.data;
            dispatch( _set_data({data: resData, errmsg: ''} as any) );           
        }
        catch(e: any) {
            console.log(e);
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


export const GetdataAction = (sup_id: string, navigate: any) =>{
    const _serviceurl = env.url+'/service/supplier/' + sup_id;
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