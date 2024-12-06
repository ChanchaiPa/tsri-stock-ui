export type SearchAsset = {
    pageNo: number,
    pageSize: number,
    totalRec: number,
    ast_grp_id: string,
    ast_cat_id: string,
    ast_name: string
}

export const validateSearchAsset =(param: SearchAsset) =>{
    if (param.ast_name.trim().length > 0 && param.ast_name.trim().length <3) {
        alert("ชื่อทรัพย์สิน ค้นหาอย่างน้อย 3 ตัวอักษร");
        return false;
    }
    return true;
}


//**********************/
export type Asset = {
    ast_id: string,
    ast_code: string,
    ast_name: string,
    ast_grp_id: string,
    ast_cat_id: string,
    ast_min_purchase: string,
    ast_unit: string,
    ast_regis_id: string,
    ast_regis_dt: string,
    ast_status: string
}

export const initAsset: Asset = {
    ast_id: '0',
    ast_code: '',
    ast_name: '',
    ast_grp_id: '',
    ast_cat_id: '',
    ast_min_purchase: '0',
    ast_unit: '',
    ast_regis_id: '',
    ast_regis_dt: '',
    ast_status: ''
}

export const validateAsset =(data: Asset) =>{  
    if (data.ast_grp_id === "") {
        alert("กรุณาเลือกข้อมูล กลุ่มวัสดุ");
        return false;
    }     
    if (data.ast_cat_id === "") {
        alert("กรุณาเลือกข้อมูล หมวดหมู่");
        return false;
    }   
    if (data.ast_name.trim().length === 0 || data.ast_name.trim().length <3) {
        alert("กรุณาใส่ข้อมูล ชื่อทรัพย์สิน");
        return false;
    }   
    return true;    
}