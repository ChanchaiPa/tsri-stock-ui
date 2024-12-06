export type SearchSupplier = {
    pageNo: number,
    pageSize: number,
    totalRec: number,
    sup_name: string
}

export const validateSearchSupplier =(param: SearchSupplier) =>{
    if (param.sup_name.trim().length > 0 && param.sup_name.trim().length <3) {
        alert("ชื่อบริษัท ค้นหาอย่างน้อย 3 ตัวอักษร");
        return false;
    }
    return true;
}


//**********************/
export type Supplier = {
    sup_id: string,
    sup_code: string,
    sup_name: string,
    sup_addr1: string,
    sup_addr2: string,
    sup_addr3: string,
    sup_email: string,
    sup_tel: string,
    sup_fax: string,
    sup_contact_name: string,
    sup_regis_id: string,
    sup_regis_dt: string,
    sup_status: string
}

export const initSupplier: Supplier = {
    sup_id: '0',
    sup_code: '',
    sup_name: '',
    sup_addr1: '',
    sup_addr2: '',
    sup_addr3: '',
    sup_email: '',
    sup_tel: '',
    sup_fax: '',
    sup_contact_name: '',
    sup_regis_id: '',
    sup_regis_dt: '',
    sup_status: ''
}

export const validateSupplier =(data: Supplier) =>{  
    if (data.sup_name.trim().length === 0 || data.sup_name.trim().length <3) {
        alert("กรุณาใส่ข้อมูล ชื่อบริษัท");
        return false;
    }  
    if (data.sup_tel.trim().length === 0) {
        alert("กรุณาใส่ข้อมูล เบอร์โทร");
        return false;
    }  
    return true;    
}