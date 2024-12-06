import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import TopBar from './layout-component/top-bar-component';
import LeftBar from './layout-component/left-bar-component';
import { App4Welcome } from './app4-welcome';
// import { Temp } from './temp';
import { RootState, useAppDispatch } from '../store/store';
import { LogoutAction } from '../store/slices/authen-slice';
import { useSelector } from 'react-redux';
import { env } from '../Environment';
import SupplierSearch from './app1-component/supplier/supplier-search';
import GroupSearch from './app1-component/group/group-search';
import CategorySearch from './app1-component/category/category-search';
import AssetSearch from './app1-component/asset/asset-search';
import InventorySearch from './app2-component/inventory/inventory-search';
import DistributeSearch from './app2-component/distribute/distribute-search';
import Report1 from './app3-component/report1';
import SupplierDetail from './app1-component/supplier/supplier-detail';
import GroupDetail from './app1-component/group/group-detail';
import CategoryDetail from './app1-component/category/category-detail';
import AssetDetail from './app1-component/asset/asset-detail';
import InventoryDetail from './app2-component/inventory/inventory-detail';
import DistributeDetail from './app2-component/distribute/distribute-detail';


export const App3Content =(props: any) => {
    const [isLeftCollapse, setIsLeftCollapse] = useState<boolean>(false);
    
    const authenState = useSelector((state: RootState) => state.AuthenSlicer); 
    const loadingState= useSelector((state: RootState) => state.LoadingSlicer);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        console.log("AppContent init " + location.pathname);
        //setTimeout(()=>{  alert("Hi..."); }, 3000);
    }, [location.pathname]);    


    const onLeftCollapse = (value: boolean) => {
        setIsLeftCollapse(!value);
    }

    const handleLogout =() => {
        dispatch( LogoutAction(authenState.username!) ); 
        //navigate('/login');  //navigate to login by ProtectedRoutes
    }

    const RouteToPath =(path: string, right: string)  => {
        if (path !== undefined) {
            navigate( path + "?c=1" ); // flag for clear
        }            
    }


    const app_root = env.app_root;
    return(<div className='core_container'>
        <TopBar onLeftCollapse={ ()=>onLeftCollapse(isLeftCollapse) } 
            isLeftCollapse={ isLeftCollapse } 
            callBackLogout={ ()=>handleLogout() } />
        <LeftBar {...props} isLeftCollapse={isLeftCollapse} 
            RouteToPath={RouteToPath} dispatch={dispatch}/>  

        {loadingState.isLoading ? <div className='loading'>
            <div className="spinner-grow text-success" role="status" />
            <span>กรุณารอสักครู่</span>
        </div> : null}

        <div className='app_container'>
            {location.pathname == "/app/welcome" && <div><App4Welcome></App4Welcome></div> }
            {/* {location.pathname == "/app/temp" && <div><Temp></Temp></div> } */}

            { location.pathname === app_root+"/supplier-search"    && <div><SupplierSearch></SupplierSearch></div> }
            { location.pathname === app_root+"/supplier-detail"    && <div><SupplierDetail></SupplierDetail></div> }
            { location.pathname === app_root+"/group-search"       && <div><GroupSearch></GroupSearch></div> }
            { location.pathname === app_root+"/group-detail"       && <div><GroupDetail></GroupDetail></div> }
            { location.pathname === app_root+"/category-search"    && <div><CategorySearch></CategorySearch></div> }
            { location.pathname === app_root+"/category-detail"    && <div><CategoryDetail></CategoryDetail></div> }
            { location.pathname === app_root+"/asset-search"        && <div><AssetSearch></AssetSearch></div> }
            { location.pathname === app_root+"/asset-detail"        && <div><AssetDetail></AssetDetail></div> }

            { location.pathname === app_root+"/inventory-search"   && <div><InventorySearch></InventorySearch></div> }
            { location.pathname === app_root+"/inventory-detail"   && <div><InventoryDetail></InventoryDetail></div> }
            { location.pathname === app_root+"/distribute-search"  && <div><DistributeSearch></DistributeSearch></div> }
            { location.pathname === app_root+"/distribute-detail"  && <div><DistributeDetail></DistributeDetail></div> }
            { location.pathname === app_root+"/report1"            && <div><Report1></Report1></div> }
        </div>
    </div>);

}