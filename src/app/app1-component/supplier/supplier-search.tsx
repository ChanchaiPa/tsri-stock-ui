import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { env } from '../../../Environment';
import BoxContent from '../../../share/box-content/box-content';
import Table, { Pagination } from '../../../share/table/table';
import { RootState, useAppDispatch } from '../../../store/store';
import { SearchSupplier, validateSearchSupplier } from './supplier-type';
import { SearchAction, _clear_state, _param1_change } from '../../../store/slices/supplier-slice';

type Props = {}

const header: any[] = [
  { name: 'sup_id', displayName: 'ID บริษัท' }, 
  { name: 'sup_name', displayName: 'ชื่อบริษัท' }, 
  { name: 'sup_contact_name', displayName: 'ผู้ติดต่อ' }, 
  { name: 'sup_tel', displayName: 'เบอร์โทร' }];    

  
const SupplierSearch = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const param1 = useSelector((state: RootState) => state.SupplierSlice).param1; //==> sup_name
  const page   = useSelector((state: RootState) => state.SupplierSlice).page;
  const pages  = useSelector((state: RootState) => state.SupplierSlice).pages;
  const total  = useSelector((state: RootState) => state.SupplierSlice).total;
  const list   = useSelector((state: RootState) => state.SupplierSlice).list;
  const loading= useSelector((state: RootState) => state.SupplierSlice).loading;

  const [searchParams] = useSearchParams();
  useEffect(() => {
    if (searchParams.get("c") === "1") // flag for clear
        dispatch( _clear_state() );   
  }, [])
  

  const add =() =>{
    navigate(env.app_root+'/supplier-detail', { state: { type: "NEW", data: null }}); 
  }  

  const search =() =>{
    const cond = {} as SearchSupplier;
    cond.pageNo = 1;
    cond.pageSize = 5;
    cond.totalRec = 0;
    cond.sup_name = param1;

    if (validateSearchSupplier(cond) === false) 
        return;
    dispatch( SearchAction(cond, navigate) ); 
  }  

  const toPage =(page: number) =>{
    const cond = {} as SearchSupplier;
    cond.pageNo = page;
    cond.pageSize = 5;
    cond.totalRec = total;
    cond.sup_name = param1;
    dispatch( SearchAction(cond, navigate) ); 
  }   
  
  const toDetail =(row: any) =>{
    navigate(env.app_root+'/supplier-detail', { state: { type: "SELECT", data: row }});
  }  

  return (<div className='container'>
    {loading ? <div className='loading'>
        <div className="spinner-grow text-success" role="status" /><span>กรุณารอสักครู่</span>
    </div> : null}    

    <BoxContent title='ค้นหาบริษัท' id="1">
      <div className='container'>
        <div className='row'>
          <div className='col-sm-3'>
            <label>ชื่อบริษัท</label>
            <input type="text" className="form-control" value={param1} 
                onChange={(e: any)=> dispatch( _param1_change({param1: e.target.value} as any) )} />            
          </div>
          <div className='col-sm-3'>&nbsp;</div>
          <div className='col-sm-3'>&nbsp;</div>
          <div className='col-sm-3' style={{marginTop: 23, paddingRight: 23, textAlign: 'right'}}>
            <button type="button" className="btn btn-success" onClick={()=>search()}> Search </button>&nbsp;
            <button type="button" className="btn btn-primary" onClick={()=>add()}> &nbsp;Add&nbsp; </button>
          </div>
        </div>
      </div>

      <br/>
      <div className='container'>
        <Table header={header} rowData={list} onRowClick={(row: any) => toDetail(row)} />
        <Pagination page={page} pages={pages} page_limit={5} onPageChange={(p: number) => { toPage(p) }} />
      </div>         
    </BoxContent>     
  </div>)
}

export default SupplierSearch