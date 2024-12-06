import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import BoxContent from '../../../share/box-content/box-content';
import { BackButton, CancelButton, EditButton, SaveButton } from '../../../share/main-button/main-button';
import { RootState, useAppDispatch } from '../../../store/store';
import { GetdataAction, SaveAction, _new_data } from '../../../store/slices/group-slice';
import { initGroup, Group, validateGroup } from './group-type';
import { useSelector } from 'react-redux';
import { env } from '../../../Environment';
import Alert, { TYPE } from '../../../share/alert/alert';

type Props = {}

const GroupDetail = (props: Props) => {
  const dispatch = useAppDispatch();
  const loading= useSelector((state: RootState) => state.GroupSlice).loading;
  const rxdata = useSelector((state: RootState) => state.GroupSlice).data;
  const errmsg = useSelector((state: RootState) => state.GroupSlice).errmsg;

  const navigate = useNavigate();
  const location = useLocation();
  const [mode, setMode] = useState("V");   
  const [data, setData] = useState<Group>(initGroup);  


  useEffect(() => {
    let state: any = location.state;  //console.log(state.type);  //setData(state.data);
    if (state.type === "NEW") {
        dispatch( _new_data() );
        setMode("A");
    }
    else {
        dispatch( GetdataAction(state.data.grp_id, navigate) );
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
    if (validateGroup(data) === false) 
        return;    
    dispatch( SaveAction(data, navigate) );
    setMode("V");
  }
  
  const cancelData =() =>{
    setData(rxdata);
    setMode("V");
  }  

  const goBack =() =>{
    navigate(env.app_root + "/group-search");
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

    <BoxContent title={"ข้อมูลกลุ่มวัสดุ (" + mode + ")"} id="1">
    <fieldset disabled={mode !== 'E' && mode !== 'A'}>   
        <div className='container'>
            <div className='row justify-content-center'> 
                <div className='col-sm-3'>
                    <label>รหัสกลุ่มวัสดุ</label>
                    <input type="text" className="form-control" value={data.grp_id}
                        readOnly/>   
                </div>
                <div className='col-sm-9'>
                    <label>ชื่อกลุ่มวัสดุ</label>
                    <input type="text" className="form-control" value={data.grp_name}
                        name="grp_name" onChange={handleChangeData}/>    
                </div> 
            </div>
        </div>         
    </fieldset>
    </BoxContent>
  </div>)
}

export default GroupDetail