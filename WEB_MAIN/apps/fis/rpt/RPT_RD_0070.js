function loadPage() {
	window.close();
	getPdfFile();
}

function getPdfFile() {
	var formObj=document.frm1;
	//OFVFOUR-7087 [JAPT] Stamp does not show on Local statement when click PDF Download
	fileNmArr  = formObj.fileName.value.split("^@@^");
	var rdParamArr = formObj.rdParam.value.split("^@@^");
	if(user_ofc_cnt_cd=="US" || user_ofc_cnt_cd=="CA"){
		
		if(RD_path.indexOf("/letter/") == -1) {  
			RD_path += "letter/";
		}
	}else{
		//US / CA 제외 경로셋팅 옵션 제공
		var opt_key = "MRD_A4_FOLDER";
	    ajaxSendPost(rdSetter, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	}
	//OFVFOUR-7087 [JAPT] Stamp does not show on Local statement when click PDF Download
	var opt_key="USE_RPT_CUSTZ_LOGIC";
	ajaxSendPost(customizeReportSetting, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	var v_rwait = '';
	
	if (fileNmArr.length > 1){
		v_rwait = '/rwait';
	}
	
	var rdParamVal = "";
	var filePathStr = "";
	for(var i = 0 ; i < fileNmArr.length ; i ++){
		if(user_ofc_cnt_cd=="US" || user_ofc_cnt_cd=="CA" || user_ofc_cnt_cd=="DE"){
			if(     fileNmArr[i] == "pfm_profit_month_multi.mrd" ){
				rdParamVal = RDServer+'/ruseurlmoniker [0] ' + v_rwait + ' /rp '+rdParamArr[i] + " /riprnmargin";

			} else {
				// 기존방식 유지
				if(fileNmArr[i].value=="air_label_01.mrd" || formObj.fileName.value == "air_mbl_label_01.mrd" || fileNmArr[i].value=="package_label.mrd"){
					rdParamVal = RDServer+ v_rwait + ' /rp '+rdParamArr[i];
					
				}else{
					rdParamVal = RDServer+v_rwait + ' /rp '+rdParamArr[i] + " /riprnmargin";
				}
			}
		}else{
			rdParamVal = RDServer+v_rwait + ' /rp '+rdParamArr[i];
		}
	}
	frm2.filePath.value = RD_path+fileNmArr[0];
	frm2.fileNm.value = rdParamVal;
	frm2.target = 'pdfDn';
	frm2.submit();	
}

//Jpn RD폴더 셋팅.
function rdSetter(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
		if (doc[1] != "") {
			RD_path += doc[1];
		}
	}
}

//OFVFOUR-7087 [JAPT] Stamp does not show on Local statement when click PDF Download
function setFileName(reqVal){
	var formObj=document.frm1; 
	var doc=getAjaxMsgXML(reqVal); 
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) { 
		var res = JSON.parse(doc[1]);  
		RD_path = RD_path_tmp + res.rdPath; 
		var realfileNm = ""; 
		for(var i=0; i < res.mrdFile.length ; i++) { 
			if(realfileNm == ""){ 
				realfileNm = res.mrdFile[i]; 
			}else{ 
				realfileNm = realfileNm + "^@@^" + res.mrdFile[i]; 
			} 
		} 
		fileNmArr = realfileNm.split("^@@^"); 
	} 
}

function customizeReportSetting(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
		if (doc[1] == "Y") {
			ajaxSendPost(setFileName, "reqVal", "&goWhere=aj&bcKey=getReportFile&fileArr="+frm1.fileName.value.replaceAll("^@@^", ","), "./GateServlet.gsl");
		}
	}
}

