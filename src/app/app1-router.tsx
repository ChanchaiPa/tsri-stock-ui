import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { env } from "../Environment";
import { App2Login } from './app2-login';
import { App3Content } from './app3-content';
import { App5Logout } from './app5-logout';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';


const app_root = env.app_root;
export const App1Router = (props: any) => {
    return(<BrowserRouter basename={env.basename}>
        <Routes >
            <Route path={"/login"} element={ <App2Login/> } />
            <Route path={"/"} element={<Navigate to="/login"></Navigate>} />
            
            <Route path="/" element={ <ProtectedRoutes/> }>
                <Route path={app_root + "/welcome"} element={ <App3Content/> } />
                <Route path={app_root + "/temp"}    element={ <App3Content/> } />

                <Route path={app_root+"/supplier-search"}    element={ <App3Content/> } />
                <Route path={app_root+"/supplier-detail"}    element={ <App3Content/> } />
                <Route path={app_root+"/group-search"}       element={ <App3Content/> } />
                <Route path={app_root+"/group-detail"}       element={ <App3Content/> } />
                <Route path={app_root+"/category-search"}    element={ <App3Content/> } />
                <Route path={app_root+"/category-detail"}    element={ <App3Content/> } />
                <Route path={app_root+"/asset-search"}        element={ <App3Content/> } />
                <Route path={app_root+"/asset-detail"}        element={ <App3Content/> } />

                <Route path={app_root+"/inventory-search"}   element={ <App3Content/> } />
                <Route path={app_root+"/inventory-detail"}   element={ <App3Content/> } />
                <Route path={app_root+"/distribute-search"}  element={ <App3Content/> } />
                <Route path={app_root+"/distribute-detail"}  element={ <App3Content/> } />
                <Route path={app_root+"/report1"}            element={ <App3Content/> } />                   
            </Route>

            <Route path="*" element={ <App5Logout/> } />
        </Routes>
    </BrowserRouter>);
}

//*****************************************************************/
  const ProtectedRoutes = (props: any) => {
    const authenState = useSelector((state: RootState) => state.AuthenSlicer);
    return authenState.userid ? <Outlet /> : <Navigate to="/login" />;
  };  