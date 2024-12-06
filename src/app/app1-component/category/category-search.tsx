import React, { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { env } from '../../../Environment';
import BoxContent from '../../../share/box-content/box-content';
import Table, { Pagination } from '../../../share/table/table';
import { RootState, useAppDispatch } from '../../../store/store';
import { SearchCategory, validateSearchCategory } from './category-type';
import { DropList1Action, SearchAction, _clear_state, _param1_change, _param2_change } from '../../../store/slices/category-slice';
import { useSelector } from 'react-redux';

type Props = {}

const header: any[] = [
  { name: 'cat_grp_name', displayName: 'กลุ่มวัสดุ' }, 
  { name: 'cat_id', displayName: 'รหัสหมวดหมู่' }, 
  { name: 'cat_name', displayName: 'ชื่อหมวดหมู่' }];     

const CategorySearch = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const param1 = useSelector((state: RootState) => state.CategorySlice).param1; //==> cat_grp_id
  const param2 = useSelector((state: RootState) => state.CategorySlice).param2; //==> cat_name
  const page   = useSelector((state: RootState) => state.CategorySlice).page;
  const pages  = useSelector((state: RootState) => state.CategorySlice).pages;
  const total  = useSelector((state: RootState) => state.CategorySlice).total;
  const list   = useSelector((state: RootState) => state.CategorySlice).list;
  const loading= useSelector((state: RootState) => state.CategorySlice).loading;    
  const droplist1: any[] = useSelector((state: RootState) => state.CategorySlice).droplist1;    

  const [searchParams] = useSearchParams();
  useEffect(() => {
    if (searchParams.get("c") === "1") // flag for clear
        dispatch( _clear_state() );  
    dispatch( DropList1Action() );      
  }, [])


  const add =() =>{
    navigate(env.app_root+'/category-detail', { state: { type: "NEW", data: null }}); 
  }  
  
  const search =() =>{
    const cond = {} as SearchCategory;
    cond.pageNo = 1;
    cond.pageSize = 5;
    cond.totalRec = 0;
    cond.cat_grp_id = param1;
    cond.cat_name = param2;

    if (validateSearchCategory(cond) === false) 
        return;      
    dispatch( SearchAction(cond, navigate) ); 
  }  

  const toPage =(page: number) =>{
    const cond = {} as SearchCategory;
    cond.pageNo = page;
    cond.pageSize = 5;
    cond.totalRec = total;
    cond.cat_grp_id = param1;
    cond.cat_name = param2;
    dispatch( SearchAction(cond, navigate) ); 
  }   
  
  const toDetail =(row: any) =>{
    navigate(env.app_root+'/category-detail', { state: { type: "SELECT", data: row }}); 
  }


  return (<div className='container'>
    {loading ? <div className='loading'>
        <div className="spinner-grow text-success" role="status" /><span>กรุณารอสักครู่</span>
    </div> : null}   

    <BoxContent title='ค้นหาหมวดหมู่' id="1">
      <div className='container'>
        <div className='row'>
          <div className='col-sm-3'>
            <label>กลุ่มวัสดุ</label>
            <select className="form-select" value={param1}
                onChange={(e: any)=> dispatch( _param1_change({param1: e.target.value} as any) )} >
                <option key='' value=''>ทุกกลุ่ม</option>
                { droplist1.map((item, index) => (
                  <option key={index} value={item.code}> {item.name} </option>
                )) }
            </select>           
          </div>
          <div className='col-sm-3'>
            <label>ชื่อหมวดหมู่</label>
            <input type="text" className="form-control" value={param2}
                onChange={(e: any)=> dispatch( _param2_change({param2: e.target.value} as any) )} />  
          </div>
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

export default CategorySearch