import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import BoxContent from '../../../share/box-content/box-content';
import { BackButton, CancelButton, EditButton, SaveButton } from '../../../share/main-button/main-button';
import { useSelector } from 'react-redux';
import { env } from '../../../Environment';
import Alert, { TYPE } from '../../../share/alert/alert';
import { RootState, useAppDispatch } from '../../../store/store';
import { GetdataAction, SaveAction, _new_data } from '../../../store/slices/category-slice';
import { initCategory, Category, validateCategory } from './category-type';


type Props = {}

const CategoryDetail = (props: Props) => {
  const dispatch = useAppDispatch();
  const loading= useSelector((state: RootState) => state.CategorySlice).loading;
  const rxdata = useSelector((state: RootState) => state.CategorySlice).data;
  const errmsg = useSelector((state: RootState) => state.CategorySlice).errmsg;
  const droplist1: any[] = useSelector((state: RootState) => state.CategorySlice).droplist1;

  const navigate = useNavigate();
  const location = useLocation();
  const [mode, setMode] = useState("V");   
  const [data, setData] = useState<Category>(initCategory); 
 

  useEffect(() => {
    let state: any = location.state;  
    if (state.type === "NEW") {
        dispatch( _new_data() );
        setMode("A");
    }
    else {
        dispatch( GetdataAction(state.data.cat_id, navigate) );
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
    if (validateCategory(data) === false) 
        return;
    dispatch( SaveAction(data, navigate) );
    setMode("V");
  }
  
  const cancelData =() =>{
    setData(rxdata);
    setMode("V");
  }  

  const goBack =() =>{
    navigate(env.app_root + "/category-search");
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

    <BoxContent title={"ข้อมูลหมวดหมู่ (" + mode + ")"} id="1">
    <fieldset disabled={mode !== 'E' && mode !== 'A'}>   
        <div className='container'>
            <div className='row justify-content-center'> 
                <div className='col-sm-3'>
                    <label>รหัสกลุ่มวัสดุ</label>
                    <select className="form-select" value={data.cat_grp_id}
                        name='cat_grp_id' onChange={handleChangeData}>
                        <option key='' value=''>&nbsp;</option>
                        { droplist1.map((item, index) => (
                          <option key={index} value={item.code}> {item.name} </option>
                        )) }
                    </select>      
                </div>      
                <div className='col-sm-9'>&nbsp;</div>                      
                <div className='col-sm-3'>
                    <label>รหัสหมวดหมู่</label>
                    <input type="text" className="form-control" value={data.cat_id}
                        readOnly/>   
                </div>
                <div className='col-sm-9'>
                    <label>ชื่อหมวดหมู่</label>
                    <input type="text" className="form-control" value={data.cat_name}
                        name='cat_name' onChange={handleChangeData}/>   
                </div> 
            </div>
        </div>         
    </fieldset>
    </BoxContent>
  </div>)
}

export default CategoryDetail