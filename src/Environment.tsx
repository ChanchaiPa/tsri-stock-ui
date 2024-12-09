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

export const env = env_config.DEV; 