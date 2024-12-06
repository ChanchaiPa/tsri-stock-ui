import React from 'react'
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { env } from '../../../Environment';
import BoxContent from '../../../share/box-content/box-content';
import DatePickerInput from '../../../share/date-picker-input/date-picker-input';
import Table, { Pagination } from '../../../share/table/table';

type Props = {}

const header: any[] = [
  { name: 'field1', displayName: 'No.' }, 
  { name: 'field2', displayName: 'วันที่รับเบิก' }, 
  { name: 'field3', displayName: 'รหัสทรัพย์สิน' }, 
  { name: 'field4', displayName: 'ชื่อทรัพย์สิน' },  
  { name: 'field5', displayName: 'จำนวน' },  
  { name: 'field6', displayName: 'RC Code' }];    

const DistributeSearch = (props: Props) => {
  const navigate = useNavigate();

  const page: number = 1;
  const pages: number= 1;
  const data: any[]  = [];

  const add =() =>{
    navigate(env.app_root+'/distribute-detail', { state: { type: "NEW", data: null }}); 
  }    

  const search =(page: number) =>{

  }  
  
  const toDetail =(row: any) =>{
  
  }    

  return (<div className='container'>
    <BoxContent title='ค้นหาเบิกวัสดุ' id="1">
      <div className='container'>
        <div className='row'>
          <div className='col-sm-3'>  
            <Form.Group>
                <DatePickerInput value="" label='วันที่เบิก' withoutTime />                                  
            </Form.Group>                     
          </div>
          <div className='col-sm-3'>
            <Form.Group>
                <DatePickerInput value="" label='ถึงวันที่' withoutTime />                                  
            </Form.Group>                
          </div>
          <div className='col-sm-3'>
            <label>RC Code</label>
            <input type="text" className="form-control"/>  
          </div>
          <div className='col-sm-3' style={{marginTop: 23, paddingRight: 23, textAlign: 'right'}}>
            <button type="button" className="btn btn-success">Search</button>&nbsp;
            <button type="button" className="btn btn-primary" onClick={()=>add()}>&nbsp;Add&nbsp;</button>
          </div>
        </div>
      </div>

      <br/>
      <div className='container'>
        <Table header={header} rowData={data} onRowClick={(row: any) => toDetail(row)} />
        <Pagination page={page} pages={pages} page_limit={5} onPageChange={(p: number) => { search(p) }} />
      </div>         
    </BoxContent>     
  </div>)
}

export default DistributeSearch