function doWork(srcName){
	if(!btnVisible(srcName)){
		return;
	}
	if(srcName=='ADD'){
		
		if(checkVal()){
			
			//'BL 정보를 입력하시겠습니까?'
			if(confirm(getLabel('FMS_COM_CFMSAV'))){
				frm1.f_cmd.value = COMMAND01;
				frm1.submit();
			}
		}
	}
}


function checkVal(){
	var isOk = true;
	if(checkInputVal(frm1.pol_cd.value, 3, 3, "T", '출발지 코드')!='O'){
		isOk = false;
		
	}else if(checkInputVal(frm1.pod_cd.value, 3, 3, "T", '도착지 코드')!='O'){
		isOk = false;
		
	}else if(checkInputVal(frm1.pck_qty.value, 0, 4, "T", '수량')!='O'){
		isOk = false;
		
	}else if(checkInputVal(frm1.grs_wgt.value, 0, 7, "T", '중량')!='O'){
		isOk = false;
		
	}else if(checkInputVal(frm1.itm_nm1.value, 1, 15, "T", '품명 1번째 입력란')!='O'){
		isOk = false;
		
	}else if(checkInputVal(frm1.itm_nm2.value, 0, 20, "T", '품명 2번째 입력란')!='O'){
		isOk = false;
		
		
	}else if(checkInputVal(frm1.shp_co_nm.value, 1, 35, "T", '송하인 상호/이름')!='O'){
		isOk = false;
		
	}else if(checkInputVal(frm1.shp_cnt_cd.value, 2, 2, "T", '송하인 국가코드')!='O'){
		isOk = false;
		
	}else if(checkInputVal(frm1.shp_ste.value, 0, 9, "T", '송하인 State/Provice')!='O'){
		isOk = false;
		
	//}else if(checkInputVal(frm1.shp_plc.value, 0, 17, "T", '송하인 Place')!='O'){
		//isOk = false;
		
	//}else if(checkInputVal(frm1.shp_st.value, 0, 35, "T", '송하인 Street')!='O'){
		//isOk = false;
		
	}else if(checkInputVal(frm1.shp_zip_cd.value, 0, 9, "T", '송하인 우편번호')!='O'){
		isOk = false;

		
	}else if(checkInputVal(frm1.cnee_co_nm.value, 1, 35, "T", '수하인의 상호/이름')!='O'){
		isOk = false;
		
	}else if(checkInputVal(frm1.cnee_cnt_cd.value, 2, 2, "T", '수하인의 국가코드')!='O'){
		isOk = false;
		
	}else if(checkInputVal(frm1.cnee_ste.value, 0, 9, "T", '수하인의 State/Provice')!='O'){
		isOk = false;
		
	//}else if(checkInputVal(frm1.cnee_plc.value, 0, 17, "T", '수하인의 Place')!='O'){
		//isOk = false;
		
	//}else if(checkInputVal(frm1.cnee_st.value, 0, 35, "T", '수하인의 Street')!='O'){
		//isOk = false;
		
	}else if(checkInputVal(frm1.cnee_zip_cd.value, 0, 9, "T", '수하인의 우편번호')!='O'){
		isOk = false;
	}
	return isOk;
}