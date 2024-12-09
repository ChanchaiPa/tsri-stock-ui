import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Alert, { TYPE } from '../share/alert/alert';
import { SubBoxContent } from '../share/box-content/box-content';
import { PasswordInput, TextInput } from '../share/input/input';

import { RootState, useAppDispatch } from "../store/store";
import { LoginAction, _authenReset } from "../store/slices/authen-slice";
import { Deploy, env } from "../Environment";

interface State {
    username: string,
    password: string,
}

const initialState: State = {
    username: '',
    password: '',
}

export const App2Login =(props: any) =>{
    const [param, setParam] = useState<State>(initialState);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const authenState = useSelector((state: RootState) => state.AuthenSlicer);
    const loadingState= useSelector((state: RootState) => state.LoadingSlicer);

    useEffect(() => {
        console.log("Login init component");
        dispatch( _authenReset() );
    }, []);

    const submit = () => {
        dispatch( LoginAction(param.username, param.password, navigate) );
    }


    const handleKeypress = (e: any) => { 
        if (e.key === 'Enter')
            submit();
    };       

    return (<div className='container login_container'>
        {loadingState.isLoading ? <div className='loading'>
            <div className="spinner-grow text-success" role="status" />
            <span>กรุณารอสักครู่</span>
        </div> : null}

        <div className='login_logo' /> 
        <SubBoxContent title='Tsri Stock - Log In'>
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-sm-9'>
                        <TextInput label='Username' placeholder='Username' value={param.username} onChange={(v: string) => setParam({...param, username: v})} />
                    </div>
                    <div className='col-sm-9'>
                        <PasswordInput label='Password' placeholder='Password' value={param.password} onChange={(v: string) => setParam({...param, password: v})} onKeyPress={(e: any) => handleKeypress(e)}/>
                    </div>
                </div>

                <div className='row justify-content-center' style={{ marginTop: '15px' }}>
                    <div className='col-sm-9'>
                        <button className='button_with_icon button_block' onClick={() => submit()} >เข้าสู่ระบบ</button>
                    </div>
                </div>
                <Alert type={TYPE.DANGER}>{authenState.moreinfo}</Alert>
            </div>
        </SubBoxContent>
        <div>{Deploy[env.status]}</div>
        </div>
    );

}