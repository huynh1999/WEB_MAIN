function doWork(srcName){
	var formObj=document.frm1;
    switch(srcName) {
		case "CLOSE":
			var retArray="";	
			retArray += formObj.pre_vsl_cd.value;
			retArray += "|";
			retArray += formObj.pre_vsl_nm.value;
			retArray += "|";
			retArray += formObj.pre_voy.value.trim();
			retArray += "|";
			retArray += formObj.ts_pol_cd.value;
			retArray += "|";
			retArray += formObj.ts_pol_nm.value;
			retArray += "|";
			retArray += formObj.ts_eta_dt_tm.value;
			retArray += "|";
			retArray += formObj.ts_etd_dt_tm.value;
			ComClosePopup(retArray); 
	    	break;
    }
}
function loadPage(){
	/*
	var arg=parent.rtnary;
	var formObj=document.frm1;
	formObj.pre_vsl_cd.value=(arg[0] == undefined || arg[0] == 'undefined') ? "" : arg[0];
	formObj.pre_vsl_nm.value=(arg[1] == undefined || arg[1] == 'undefined') ? "" : arg[1];
	formObj.pre_voy.value=(arg[2] == undefined || arg[2] == 'undefined') ? "" : arg[2];
	formObj.ts_pol_cd.value=(arg[3] == undefined || arg[3] == 'undefined') ? "" : arg[3];
	formObj.ts_pol_nm.value=(arg[4] == undefined || arg[4] == 'undefined') ? "" : arg[4];
	formObj.ts_eta_dt_tm.value=(arg[5] == undefined || arg[5] == 'undefined') ? "" : arg[5];
	formObj.ts_etd_dt_tm.value=(arg[6] == undefined || arg[6] == 'undefined') ? "" : arg[6];
	*/
	//#3873 [JAPT]  T/S popup , validation and sync.
	fnSetAutocomplete('ts_pol_nm'			, 'LOCATION_POPLIST', 'ts_pol', 'O');	//POR
	fnSetAutocomplete('pre_vsl_nm'			, 'VESSEL_POPLIST', 'prevesel');	//VSL
	
}
function closeIt(){
}
function cobChange(){	
}
