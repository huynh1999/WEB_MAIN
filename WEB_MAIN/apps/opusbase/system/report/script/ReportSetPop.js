function doWork(srcName){
	var formObj=document.frm1;
    switch(srcName) {
		case "OK":
			var set_nm = formObj.f_rpt_set_cd.value;
			if(set_nm == "") {
				ComClosePopup(); 
				break;
			}
			var retArray="";	
			retArray += set_nm
			retArray += "|";
			retArray += formObj.f_rpt_set_cd.options[formObj.f_rpt_set_cd.selectedIndex].text;
			ComClosePopup(retArray); 
	    	break;
		case "CANCEL":
			ComClosePopup(); 
	    	break;
    }
}
