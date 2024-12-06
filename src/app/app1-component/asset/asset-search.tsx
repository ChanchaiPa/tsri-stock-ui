import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { env } from '../../../Environment';
import BoxContent from '../../../share/box-content/box-content';
import Table, { Pagination } from '../../../share/table/table';
import { RootState, useAppDispatch } from '../../../store/store';
import { SearchAsset, validateSearchAsset } from './asset-type';
import { DropList1Action, DropList2Action, SearchAction, _clear_state, _param1_change, _param2_change, _param3_change } from '../../../store/slices/asset-slice';


type Props = {}

const header: any[] = [
  { name: 'ast_grp_name', displayName: 'กลุ่มวัสดุ' }, 
  { name: 'ast_cat_name', displayName: 'หมวดหมู่' }, 
  { name: 'ast_id', displayName: 'รหัสทรัพย์สิน' }, 
  { name: 'ast_name', displayName: 'ชื่อทรัพย์สิน' }];  

const AssetSearch = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const param1 = useSelector((state: RootState) => state.AssetSlice).param1; //==> ast_grp_id
  const param2 = useSelector((state: RootState) => state.AssetSlice).param2; //==> ast_cat_id
  const param3 = useSelector((state: RootState) => state.AssetSlice).param3; //==> ast_name
  const page   = useSelector((state: RootState) => state.AssetSlice).page;
  const pages  = useSelector((state: RootState) => state.AssetSlice).pages;
  const total  = useSelector((state: RootState) => state.AssetSlice).total;
  const list   = useSelector((state: RootState) => state.AssetSlice).list;
  const loading= useSelector((state: RootState) => state.AssetSlice).loading;    
  const droplist1: any[] = useSelector((state: RootState) => state.AssetSlice).droplist1;   
  const droplist2: any[] = useSelector((state: RootState) => state.AssetSlice).droplist2;     

  const [searchParams] = useSearchParams();
  useEffect(() => {
    if (searchParams.get("c") === "1") // flag for clear
        dispatch( _clear_state() );  
    dispatch( DropList1Action() );      
  }, [])

  const add =() =>{
    navigate(env.app_root+'/asset-detail', { state: { type: "NEW", data: null }}); 
  }  

  const search =() =>{
    const cond = {} as SearchAsset;
    cond.pageNo = 1;
    cond.pageSize = 5;
    cond.totalRec = 0;
    cond.ast_grp_id = param1;
    cond.ast_cat_id = param2;
    cond.ast_name   = param3;

    if (validateSearchAsset(cond) === false) 
        return;     
    dispatch( SearchAction(cond, navigate) ); 
  }  

  const toPage =(page: number) =>{
    const cond = {} as SearchAsset;
    cond.pageNo = page;
    cond.pageSize = 5;
    cond.totalRec = total;
    cond.ast_grp_id = param1;
    cond.ast_cat_id = param2;
    cond.ast_name   = param3;
    dispatch( SearchAction(cond, navigate) ); 
  }   
  
  const toDetail =(row: any) =>{
    navigate(env.app_root+'/asset-detail', { state: { type: "SELECT", data: row }}); 
  }     


  return (<div className='container'>
    {loading ? <div className='loading'>
        <div className="spinner-grow text-success" role="status" /><span>กรุณารอสักครู่</span>
    </div> : null}   

    <BoxContent title='ค้นหาทรัพย์สิน' id="1">
      <div className='container'>
        <div className='row'>
          <div className='col-sm-3'>
            <label>กลุ่มวัสดุ</label>
            <select className="form-select" value={param1}
                onChange={(e: any)=> {
                    dispatch( _param1_change({param1: e.target.value}) );
                    dispatch( DropList2Action(e.target.value) );
                }} >
                <option key='' value=''>ทุกกลุ่ม</option>
                { droplist1.map((item, index) => (
                  <option key={index} value={item.code}> {item.name} </option>
                )) }
            </select>          
          </div>
          <div className='col-sm-3'>
            <label>หมวดหมู่</label>
            <select className="form-select" value={param2}
                onChange={(e: any)=> dispatch( _param2_change({param2: e.target.value}) )}>
                <option key='' value=''>ทุกหมวดหมู่</option>
                { droplist2.map((item, index) => (
                  <option key={index} value={item.code}> {item.name} </option>
                )) }
            </select>  
          </div>
          <div className='col-sm-3'>
            <label>ชื่อทรัพย์สิน</label>
            <input type="text" className="form-control" value={param3}
                onChange={(e: any)=> dispatch( _param3_change({param3: e.target.value}) )} />    
          </div>
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

export default AssetSearch  