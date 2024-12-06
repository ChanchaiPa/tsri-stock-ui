export type SearchCategory = {
    pageNo: number,
    pageSize: number,
    totalRec: number,
    cat_grp_id: string,
    cat_name: string
}

export const validateSearchCategory =(param: SearchCategory) =>{
    if (param.cat_name.trim().length > 0 && param.cat_name.trim().length <3) {
        alert("ชื่อหมวดหมู่ ค้นหาอย่างน้อย 3 ตัวอักษร");
        return false;
    }
    return true;
}


//**********************/
export type Category = {
    cat_id: string,
    cat_code: string,
    cat_name: string,
    cat_grp_id: string,
    cat_regis_id: string,
    cat_regis_dt: string,
    cat_status: string
}

export const initCategory: Category = {
    cat_id: '0',
    cat_code: '',
    cat_name: '',
    cat_grp_id: '',
    cat_regis_id: '',
    cat_regis_dt: '',
    cat_status: ''
}

export const validateCategory =(data: Category) =>{  
    if (data.cat_grp_id === "") {
        alert("กรุณาเลือกข้อมูล กลุ่มวัสดุ");
        return false;
    }     
    if (data.cat_name.trim().length === 0 || data.cat_name.trim().length <3) {
        alert("กรุณาใส่ข้อมูล ชื่อหมวดหมู่");
        return false;
    }   
    return true;    
}