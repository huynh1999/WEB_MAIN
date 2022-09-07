// 공통전역변수
var docObjects=new Array();
var sheetCnt=0;
var rdObjects=new Array();
var rdCnt=0;
var isChrome = false;
var PRN_USE_ACTIVEX = true;
var PRN_WAS_PORT = "8001";

function loadPage() {
	
	var opt_key = "PRN_USE_ACTIVEX";
	ajaxSendPost(setUseActivexReq, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	
	if(PRN_USE_ACTIVEX){
		setRdInit(rdObjects[0]);
		document.getElementById("mainTable").height=screen.height - 150;
	} else {
		hostUrl = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
		loadPageHtml5();
	}	
}

function loadPageHtml5() {
	
	isChrome = true;

	var opt_key2 = "PRN_WAS_PORT";
	ajaxSendPost(setWasPortReq, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key2, "./GateServlet.gsl");

	var hostUrl = window.location.protocol + "//" + window.location.hostname + ":" + PRN_WAS_PORT;
	var viewer = new m2soft.crownix.Viewer( hostUrl+'/ReportingServer/service', "mainTable");
	
	rdObjects[0] = viewer;
	setRdInit(rdObjects[0]);
}


/**
 *  Print Finished Event Catch for Chrome
 *  Don't use alert fucntion in this Fucntion 
 */
function PrintFinished(){
	registRptPrintHistory();
}

/**
 * Report Design 환경을 초기화한다.
 */
function setRdInit(objRd){
	var formObj=document.frm1;
	
	if (!isChrome) {
		objRd.height = (screen.height - 220) + "px";
		if(formObj.fileName.value=="air_label_01.mrd" || formObj.fileName.value == "air_mbl_label_01.mrd" || formObj.fileName.value=="package_label.mrd" || formObj.fileName.value=="check_journal_01.mrd"){
			objRd.AutoAdjust=false;
			objRd.ZoomRatio=100;
		}else{
			objRd.AutoAdjust=2;
			
			// US, CA 이외(현재는 DE)에는 RD에 LETTER로 설정되어 있어도 기본값을 A4로 설정한다.
			if (user_ofc_cnt_cd=="DE") {
				objRd.SetPrint2(1,1,1,100); // A4
			}
		}
	}
	
	var rptFilePath = rpt_file_path;
	if(rptFilePath == "") {
		rptFilePath = "C:\\opus\\";
	} else if(rptFilePath.substring(rptFilePath.length,rptFilePath.length-1)!="\\") {
		rptFilePath = rptFilePath + "\\";
	}
	
	if (!isChrome) {
	    objRd.SetSaveDialogEx(rptFilePath, "", "xls@doc@pdf@tif@bmp", "pdf");
	    objRd.DisableToolbar(1);
	    objRd.DisableToolbar(14);
		objRd.ViewShowMode(0);
		objRd.SetBackgroundColor(255,255,255); //Case Sensitive
		objRd.SetPageLineColor(255,255,255);	
		objRd.ApplyLicense("0.0.0.0");	//License Checking
	}
	
	rdOpen(objRd, document.frm1);	
}

function rdOpen(objRd, formObj) {
	
	
	if(user_ofc_cnt_cd=="US" || user_ofc_cnt_cd=="CA"){
		RD_path += "letter/";
	}else{
		//US / CA 제외 경로셋팅 옵션 제공
		var opt_key = "MRD_A4_FOLDER";
	    ajaxSendPost(rdSetter, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	}
	var rdParamVal = "";
	if(user_ofc_cnt_cd=="US" || user_ofc_cnt_cd=="CA" || user_ofc_cnt_cd=="DE"){
		if(formObj.fileName.value=="air_label_01.mrd" || formObj.fileName.value == "air_mbl_label_01.mrd" || formObj.fileName.value=="package_label.mrd"){
			//objRd.FileOpen(RD_path+formObj.fileName.value, RDServer+'/rp '+formObj.rdParam.value);
			rdParamVal = RDServer+'/rp '+formObj.rdParam.value;
		}else{
			//objRd.FileOpen(RD_path+formObj.fileName.value, RDServer+'/rp '+formObj.rdParam.value + " /riprnmargin");
			rdParamVal = RDServer+'/rp '+formObj.rdParam.value + " /riprnmargin";
		}
	}else{
		//objRd.FileOpen(RD_path+formObj.fileName.value, RDServer+'/rp '+formObj.rdParam.value);
		rdParamVal = RDServer+'/rp '+formObj.rdParam.value;
	}
	
	if (!isChrome) {
		objRd.FileOpen(RD_path+formObj.fileName.value,rdParamVal);
	} else {
		//objRd.openFile(RD_path+formObj.fileName.value,rdParamVal ,{defaultZoom : '1.5' ,defaultZoomCentre:'LEFTTOP'});
		objRd.openFile(RD_path+formObj.fileName.value,rdParamVal );
	}
	
	
}



function doWork(srcName){
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한다.
    var formObj=document.frm1;
    switch(srcName) {
		case "Print":
			//#25704 Payment 화면에서 Print 시 Validation
			try{
				// opener이 삭제될 경우를 대비해 try catch처리
				//LHK, 20140326 #27576 [BINEX]Payment - Rider Print 시 Check Print 로 인식됨, Payment Print 시에만 CallBack 함수 호출함
				if(formObj.fileName.value.indexOf("check_journal_01") == 0){
					opener.doWork('PRINT_CALLBACK');
				}
			} catch(e){}
			doPrintAction();
		break;
		case "CLOSE":
			window.close();
    	break;
    }
}
//Ajax로 업무를 수행한다.
function doPrintAction(){
	var formObj=document.frm1;
	if(formObj.f_jnr_no.value != ""){
		//LHK, 20140326 #27576 [BINEX]Payment - Rider Print 시 Check Print 로 인식됨,  Rider Print 시 에는 제외
		if(formObj.fileName.value.indexOf("check_journal_02") == 0){
			
			if (isChrome) {
				rdObjects[0].print({
					isServerSide: true,
					limitedPage: 10000
				});
			} else {
				rdObjects[0].PrintDialog();
			}
			
		}else{
			ajaxSendPost(updateChkPntDt, 'reqVal', '&goWhere=aj&bcKey=updateChkPntDt&f_jnr_no='+formObj.f_jnr_no.value+'&proc_usrid='+formObj.proc_usrid.value+'&f_list_yn='+listYn, './GateServlet.gsl');
		}
	}
}
/**
 * AJAX RETURN
 */
function updateChkPntDt(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			if(doc[1] == "Y"){
				if (isChrome) {
					rdObjects[0].print({
						isServerSide: true,
						limitedPage: 10000
					});
				} else {
					rdObjects[0].PrintDialog();
				}
				
			}else{
			}
		}
	}else{
	}
}

 /* jsjang 2013.8.20 #17610 : [BINEX] 7. Email 전송 History */
 function getRptMailHistory(reqVal){
 	var formObj=document.frm1;
 	var doc=getAjaxMsgXML(reqVal);
 	if (doc[0]=="OK") {
 		if (typeof(doc[1]) != 'undefined' && doc[1] != undefined && doc[1] != "") {
 			formObj.mailTo.value=doc[1];
 		}
 	}
 }
 /* jsjang 2013.8.20 #17610 : [BINEX] 7. Email 전송 History */
 function registRptPrintHistory(){
		var formObj=document.frm1;
		/* jsjang 2013.8.20 #17610 : [BINEX] 7. Email 전송 History */
		var his_type="P"; // E : email, P : print
		var his_call_view=formObj.title.value;
		var his_call_file=formObj.fileName.value;
		var his_title="";
		var inv_seq=formObj.f_inv_seq.value;
		/* jsjang 2013.8.20 #17610 : [BINEX] 7. Email 전송 History */
		ajaxSendPost(getRptMailHistory, "reqVal", "&goWhere=aj&bcKey=getRptMailHistory&intg_bl_seq="
				+ "&inv_seq=" + inv_seq
				+ "&his_type=" + his_type
				+ "&his_call_view=" + his_call_view
				+ "&his_call_file=" + his_call_file
				+ "&his_title=" + his_title
				, "./GateServlet.gsl");		
}
 
 
 function setUseActivexReq(reqVal){
	 var doc=getAjaxMsgXML(reqVal);
	 if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined) {
		 //N 으로 설정되어 있다면 Html5버젼으로, 아니면 ActiveX버젼으로 설정한다.
		 PRN_USE_ACTIVEX = doc[1]=="N"?false:true;
	 }
 }

 
 function setWasPortReq(reqVal){
		var doc=getAjaxMsgXML(reqVal);
		if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined) {
			PRN_WAS_PORT = doc[1];
		}
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
