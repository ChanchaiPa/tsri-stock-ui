import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { env } from '../../../Environment';
import Alert, { TYPE } from '../../../share/alert/alert';
import BoxContent from '../../../share/box-content/box-content';
import { BackButton, CancelButton, EditButton, SaveButton } from '../../../share/main-button/main-button';
import { RootState, useAppDispatch } from '../../../store/store';
import { GetdataAction, SaveAction, _new_data } from '../../../store/slices/supplier-slice';
import { initSupplier, Supplier, validateSupplier } from './supplier-type';

type Props = {}

const SupplierDetail = (props: Props) => {
  const dispatch = useAppDispatch();
  const loading= useSelector((state: RootState) => state.SupplierSlice).loading;
  const rxdata = useSelector((state: RootState) => state.SupplierSlice).data;
  const errmsg = useSelector((state: RootState) => state.SupplierSlice).errmsg;

  const navigate = useNavigate();
  const location = useLocation();
  const [mode, setMode] = useState("V");   
  const [data, setData] = useState<Supplier>(initSupplier); 


  useEffect(() => {
    let state: any = location.state;  //console.log(state.type);  //setData(state.data);
    if (state.type === "NEW") {
        dispatch( _new_data() );
        setMode("A");
    }
    else {
        dispatch( GetdataAction(state.data.sup_id, navigate) );
        setMode("V");
    }
  }, []);

  useEffect(() => {
    setData(rxdata);
  }, [rxdata]);  


  const editData =() =>{
    setMode("E");
  }

  const saveData =() =>{ 
    if (validateSupplier(data) === false) 
        return;
    dispatch( SaveAction(data, navigate) );
    setMode("V");
  }
  
  const cancelData =() =>{
    setData(rxdata);
    setMode("V");
  }  

  const goBack =() =>{
    navigate(env.app_root + "/supplier-search");
  }  
  
  const handleChangeData =(event: any) => {
    const dataName = event.target.name;
    const dataValue= event.target.value;
    setData({...data, [dataName]: dataValue});
  } 


  return (<div className='container' style={{marginTop: 8}}>
     <Alert type={TYPE.DANGER}>{errmsg}</Alert>
    {mode=="V" && <><EditButton  onClick={()=>editData()}/> <BackButton onClick={()=>goBack()}/></> }
    {mode=="E" && <><SaveButton  onClick={()=>saveData()}/> <CancelButton onClick={()=>cancelData()}/></> }
    {mode=="A" && <><SaveButton  onClick={()=>saveData()}/> <BackButton onClick={()=>goBack()}/></> }
 
    {loading ? <div className='loading'>
        <div className="spinner-grow text-success" role="status" /><span>กรุณารอสักครู่</span>
    </div> : null}  

    <BoxContent key={1} title={"ข้อมูลบริษัท (" + mode + ")"} id="1">
    <fieldset disabled={mode !== 'E' && mode !== 'A'}>   
        <div className='container'>
            <div className='row justify-content-center'>
                <div className='col-sm-3'>
                    <label>รหัสบริษัท</label>
                    <input type="text" className="form-control" value={data.sup_id} 
                        name="sup_id" readOnly/>    
                </div>
                <div className='col-sm-9'>
                    <label>ชื่อบริษัท *</label>
                    <input type="text" className="form-control" value={data.sup_name}
                        name="sup_name" onChange={handleChangeData}/>  
                </div>    

                <div className='col-sm-12'>
                    <label>ที่อยู่ 1</label>
                    <input type="text" className="form-control" aria-autocomplete='list' value={data.sup_addr1}
                        name="sup_addr1" onChange={handleChangeData}/>          
                </div>   
                <div className='col-sm-12'>
                    <label>ที่อยู่ 2</label>
                    <input type="text" className="form-control" aria-autocomplete='list' value={data.sup_addr2}
                        name="sup_addr2" onChange={handleChangeData}/>    
                </div> 
                <div className='col-sm-12'>
                    <label>ที่อยู่ 3</label>
                    <input type="text" className="form-control" aria-autocomplete='list' value={data.sup_addr3}
                        name="sup_addr3" onChange={handleChangeData}/>  
                </div>      

                <div className='col-sm-6'>
                    <label>Email</label>
                    <input type="text" className="form-control" aria-autocomplete='list' value={data.sup_email}
                        name="sup_email" onChange={handleChangeData}/>  
                </div>   
                <div className='col-sm-6'>
                    <label>เบอร์โทร *</label>
                    <input type="text" className="form-control" aria-autocomplete='list' value={data.sup_tel}
                        name="sup_tel" onChange={handleChangeData}/>  
                </div>   

                <div className='col-sm-6'>
                    <label>Fax No</label>
                    <input type="text" className="form-control" aria-autocomplete='list' value={data.sup_fax}
                        name="sup_fax" onChange={handleChangeData}/>     
                </div>   
                <div className='col-sm-6'>
                    <label>ผู้ติดต่อ</label>
                    <input type="text" className="form-control" aria-autocomplete='list' value={data.sup_contact_name}
                        name="sup_contact_name" onChange={handleChangeData}/>   
                </div>                                                                                                      
            </div> 
        </div>
    </fieldset>
    </BoxContent>           

  </div>)
}

export default SupplierDetail
