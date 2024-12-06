export enum Deploy {
    DEV,
    UAT,
    PRO,
    
}

const env_config = { 
    DEV: { status: Deploy.DEV, app_root: '/app', basename: '/tsri-stock',  url: 'http://localhost:8080/tsri-stock' },
    UAT: { status: Deploy.UAT, app_root: '/app', basename: '/tsri-stock',  url: 'https://demo.ergo.co.th:8443/tsri-stock' },
    PRO: { status: Deploy.PRO, app_root: '/app', basename: '/tsri-stock',  url: 'http://192.168.107.62:8080/tsri-stock' }
}

//export const env = env_config.UAT; 



const env_mode = () => {
    if (process.env.REACT_APP_MODE === "PRO")
        return env_config.PRO;
    else
        if (process.env.REACT_APP_MODE === "UAT")
            return env_config.UAT;
        else
            return env_config.DEV;
}
export const env = env_mode(); 
//  set "REACT_APP_MODE=DEV" && npm start
// ($env:REACT_APP_MODE = "DEV") -and (npm start)   ***
//  REACT_APP_MODE=DEV npm start