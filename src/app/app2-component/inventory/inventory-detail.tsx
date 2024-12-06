import React, { useState } from 'react'
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import BoxContent from '../../../share/box-content/box-content';
import DatePickerInput from '../../../share/date-picker-input/date-picker-input';
import { BackButton, CancelButton, EditButton, NewButton, SaveButton } from '../../../share/main-button/main-button';
import Table from '../../../share/table/table';

type Props = {}

const header: any[] = [
  { name: 'field1', displayName: 'รหัสวัสดุ' }, 
  { name: 'field2', displayName: 'รหัส' }, 
  { name: 'field3', displayName: 'รหัส' }, 
  { name: 'field4', displayName: 'ชื่อ' },  
  { name: 'field5', displayName: 'จำนวน' },  
  { name: 'field5', displayName: 'ราคา' }, 
  { name: 'field6', displayName: 'ราคาต่อหน่วย' }];   

const InventoryDetail = (props: Props) => {
  const navigate = useNavigate();

  const page: number = 1;
  const pages: number= 1;
  const data: any[]  = [];  

  const [mode, setMode] = useState("V");    

  const editData =() =>{
    //
  }

  const saveData =() =>{
    //
  }
  
  const cancelData =() =>{
    //
  }  

  const goBack =() =>{
    navigate(-1);
  }

  const toDetail =(row: any) =>{
  
  }   

  return (<div className='container' style={{marginTop: 8}}>
    {mode=="V" && <><EditButton  onClick={()=>editData()}/> <BackButton onClick={()=>goBack()}/></> }
    {mode=="E" && <><SaveButton  onClick={()=>saveData()}/> <CancelButton onClick={()=>cancelData()}/></> }
    {mode=="A" && <><SaveButton  onClick={()=>saveData()}/> <BackButton onClick={()=>goBack()}/></> }

    <BoxContent title={"ข้อมูลการรับเข้าวัสดุ (" + mode + ")"} id="1">
    <fieldset disabled={mode !== 'E' && mode !== 'A'}>   
        <div className='container'>
            <div className='row justify-content-center'> 
                <div className='col-sm-3'>
                    <label>Year</label>
                    <input type="text" className="form-control"/>   
                </div>
                <div className='col-sm-3'>
                    <label>No</label>
                    <input type="text" className="form-control"/>   
                </div> 
                <div className='col-sm-3'>  
                    <Form.Group>
                        <DatePickerInput value="" label='วันที่รับเข้า' withoutTime />                                  
                    </Form.Group>                     
                </div>  
                <div className='col-sm-3'>
                    <label>เลขที่ Invoice</label>
                    <input type="text" className="form-control"/>   
                </div>  

                <div className='col-sm-3'>
                    <label>รหัสบริษัท</label>
                    <input type="text" className="form-control"/>   
                </div>
                <div className='col-sm-3' style={{marginTop: 23}}>
                    <button type="button" className="btn btn-primary">Search</button>
                </div>
                <div className='col-sm-6'>
                    <label>ชื่อบริษัท</label>
                    <input type="text" className="form-control"/>   
                </div> 

                <div className='col-sm-3'>
                    <label>เบอร์โทร</label>
                    <input type="text" className="form-control"/>   
                </div>
                <div className='col-sm-3'>
                    <label>โทรสาร</label>
                    <input type="text" className="form-control"/>   
                </div>
                <div className='col-sm-6'></div>
            </div>
        </div>         
    </fieldset>
    </BoxContent>

    <br/>
    <NewButton/>
    <BoxContent title={"ข้อมูลการรับเข้าวัสดุ"} id="2">
      <div className='container'>
        <Table header={header} rowData={data} onRowClick={(row: any) => toDetail(row)} />        
      </div>
    </BoxContent>
  </div>)
}

export default InventoryDetail