import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import BoxContent from '../../../share/box-content/box-content';
import { BackButton, CancelButton, EditButton, SaveButton } from '../../../share/main-button/main-button';
import { useSelector } from 'react-redux';
import { env } from '../../../Environment';
import Alert, { TYPE } from '../../../share/alert/alert';
import { RootState, useAppDispatch } from '../../../store/store';
import { DropList2Action, GetdataAction, SaveAction, _new_data } from '../../../store/slices/asset-slice';
import { initAsset, Asset, validateAsset } from './asset-type';


type Props = {}

const AssetDetail = (props: Props) => {
  const dispatch = useAppDispatch();
  const loading= useSelector((state: RootState) => state.AssetSlice).loading;
  const rxdata = useSelector((state: RootState) => state.AssetSlice).data;
  const errmsg = useSelector((state: RootState) => state.AssetSlice).errmsg;
  const droplist1: any[] = useSelector((state: RootState) => state.AssetSlice).droplist1;
  const droplist2: any[] = useSelector((state: RootState) => state.AssetSlice).droplist2;

  const navigate = useNavigate();
  const location = useLocation();
  const [mode, setMode] = useState("V");   
  const [data, setData] = useState<Asset>(initAsset);  


  useEffect(() => {
    let state: any = location.state;  
    if (state.type === "NEW") {
        dispatch( _new_data() );
        setMode("A");
    }
    else {
        dispatch( GetdataAction(state.data.ast_id, navigate) );
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
    if (validateAsset(data) === false) 
        return;    
    dispatch( SaveAction(data, navigate) );
    setMode("V");
  }
  
  const cancelData =() =>{
    setData(rxdata);
    setMode("V");
  }  

  const goBack =() =>{
    navigate(env.app_root + "/asset-search");
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

    <BoxContent title={"ข้อมูลทรัพย์สิน (" + mode + ")"} id="1">
    <fieldset disabled={mode !== 'E' && mode !== 'A'}>   
        <div className='container'>
            <div className='row justify-content-center'> 
                <div className='col-sm-3'>
                    <label>รหัสกลุ่มวัสดุ</label>
                    <select className="form-select" value={data.ast_grp_id}
                        name="ast_grp_id" onChange={(e: any) => {
                          handleChangeData(e);
                          dispatch( DropList2Action(e.target.value) );
                        }}>
                        <option key='' value=''>&nbsp;</option>
                        { droplist1.map((item, index) => (
                          <option key={index} value={item.code}> {item.name} </option>
                        )) }
                    </select>      
                </div>    
                <div className='col-sm-3'>
                    <label>รหัสหมวดหมู่</label>
                    <select className="form-select" value={data.ast_cat_id}
                        name="ast_cat_id" onChange={handleChangeData}>
                        <option key='' value='' >&nbsp;</option>
                        { droplist2.map((item, index) => (
                          <option key={index} value={item.code}> {item.name} </option>
                        )) }
                    </select>      
                </div>                    
                <div className='col-sm-6'>&nbsp;</div>  

                <div className='col-sm-3'>
                    <label>รหัสทรัพย์สิน</label>
                    <input type="text" className="form-control" value={data.ast_id}
                        readOnly/>   
                </div>
                <div className='col-sm-9'>
                    <label>ชื่อทรัพย์สิน</label>
                    <input type="text" className="form-control" value={data.ast_name}
                        name="ast_name" onChange={handleChangeData}/>   
                </div> 

                <div className='col-sm-3'>
                    <label>จุดสั่งซื้อต่ำสุด</label>
                    <input type="text" className="form-control" value={data.ast_min_purchase}
                        name="ast_min_purchase" onChange={handleChangeData}/>   
                </div>
                <div className='col-sm-3'>
                    <label>ชื่อหน่วย</label>
                    <input type="text" className="form-control" value={data.ast_unit}
                        name="ast_unit" onChange={handleChangeData}/>   
                </div>                
                <div className='col-sm-6'></div>
            </div>
        </div>         
    </fieldset>
    </BoxContent>
  </div>)
}

export default AssetDetail