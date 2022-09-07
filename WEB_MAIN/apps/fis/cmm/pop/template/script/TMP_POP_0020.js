function doWork(srcName){
	var formObj = document.frm1; 
	
    switch(srcName) {
    	case "Save":
    		formObj.f_cmd.value = ADD;
    		formObj.action = './TMP_POP_0020.clt';
    		formObj.submit();
//			window.close();
    	break;
		case "CLOSE":
	    	window.close();
    	break;
    }
}

//받은 parameter 셋팅
function loadPage(){
	var arg=window.dialogArguments;
	
	var formObj = document.frm1;
	
	formObj.screen_id.value = arg[0];
	formObj.screen_value.value = arg[1];
	formObj.date_cnt.value = arg[2];
	formObj.fm_date_name1.value = arg[3];
	formObj.to_date_name1.value = arg[4];
	formObj.fm_date_name2.value = arg[5];
	formObj.to_date_name2.value = arg[6];
	formObj.fm_date_name3.value = arg[7];
	formObj.to_date_name3.value = arg[8];
	
	//date 설정 비활성화
	if(formObj.date_cnt.value==1){
		formObj.date_type2(0).disabled = true;
		formObj.date_type2(1).disabled = true;
		formObj.date_type2(2).disabled = true;
		formObj.x2.value = "";
		formObj.x2.disabled = true;
		formObj.y2.value = "";
		formObj.y2.disabled = true;
		
		formObj.date_type3(0).disabled = true;
		formObj.date_type3(1).disabled = true;
		formObj.date_type3(2).disabled = true;
		formObj.x3.value = "";
		formObj.x3.disabled = true;
		formObj.y3.value = "";
		formObj.y3.disabled = true;
	}else if(formObj.date_cnt.value==2){
		formObj.date_type3(0).disabled = true;
		formObj.date_type3(1).disabled = true;
		formObj.date_type3(2).disabled = true;
		formObj.x3.value = "";
		formObj.x3.disabled = true;
		formObj.y3.value = "";
		formObj.y3.disabled = true;
	}
}