export type SearchGroup = {
    pageNo: number,
    pageSize: number,
    totalRec: number,
    grp_name: string
}

export const validateSearchGroup =(param: SearchGroup) =>{
    if (param.grp_name.trim().length > 0 && param.grp_name.trim().length <3) {
        alert("ชื่อกลุ่มวัสดุ ค้นหาอย่างน้อย 3 ตัวอักษร");
        return false;
    }
    return true;
}


//**********************/
export type Group = {
    grp_id: string,
    grp_code: string,
    grp_name: string,
    grp_regis_id: string,
    grp_regis_dt: string,
    grp_status: string
}

export const initGroup: Group = {
    grp_id: '0',
    grp_code: '',
    grp_name: '',
    grp_regis_id: '',
    grp_regis_dt: '',
    grp_status: ''
}

export const validateGroup =(data: Group) =>{  
    if (data.grp_name.trim().length === 0 || data.grp_name.trim().length <3) {
        alert("กรุณาใส่ข้อมูล ชื่อกลุ่มวัสดุ");
        return false;
    }   
    return true;    
}