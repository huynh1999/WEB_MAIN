// 공통전역변수
var docObjects = new Array();
var sheetCnt = 0;
var rdObjects = new Array();
var rdCnt = 0;

function loadPage() {
	setRdInit(rdObjects[0]);

	document.getElementById("mainTable").height = screen.height - 150;
}
}

/**
 * Report Design 환경을 초기화한다.
 */
function setRdInit(objRd){

	objRd.AutoAdjust = false;
//	objRd.HideToolbar();
	objRd.ZoomRatio = 90;
	//objRd.SetSaveDialog("C:\\", "", "5");
	var rptFilePath = rpt_file_path;
	if(rptFilePath == "") {
		rptFilePath = "C:\\opus\\";
	} else if(rptFilePath.substring(rptFilePath.length,rptFilePath.length-1)!="\\") {
		rptFilePath = rptFilePath + "\\";
	}
    objRd.SetSaveDialogEx(rptFilePath, "", "xls@doc@pdf@tif@bmp", "pdf");
    //objRd.SetSaveDialogEx("C:\\opus\\", "", "xls@doc@pdf@tif@bmp", "pdf");
//	objRd.SetSaveDialogEx("", "", "xls@doc@pdf@tif@bmp", "pdf");
	//objRd.DisableToolbar(13);
	objRd.DisableToolbar(1);
	objRd.DisableToolbar(14);
	objRd.DisableToolbar(16);
	//objRd.DisableToolbar(17);
	//objRd.HideStatusbar();
	objRd.ViewShowMode(0);
	objRd.SetBackgroundColor(255,255,255); //Case Sensitive
	objRd.SetPageLineColor(255,255,255);
	objRd.ApplyLicense("0.0.0.0");					//License Checking
		
	rdOpen(objRd, document.frm1);
}

function rdOpen(objRd, formObj) {
	if (user_ofc_cnt_cd == "US" || user_ofc_cnt_cd=="CA") {
		RD_path += "letter/";
	}else{
		//US / CA 제외 경로셋팅 옵션 제공
		var opt_key = "MRD_A4_FOLDER";
	    ajaxSendPost(rdSetter, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	}
	objRd.FileOpen(RD_path+formObj.fileName.value, RDServer+'/rp '+formObj.rdParam.value);
}

function doWork(srcName){
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한다.
    var formObj  = document.form;
    
    switch(srcName) {
	    case "Fax":

			var lpSubject = (formObj.mailTitle.value != ""?  formObj.mailTitle.value: formObj.title.value);
			var lpAttachFileName = formObj.fileName.value.replaceAll(".mrd",  ".tif");

			var rptBizTp = formObj.rpt_biz_tp.value;
			var rptBizSubTp = formObj.rpt_biz_sub_tp.value;
			var rptTp = formObj.rpt_tp.value
			var rptTrdpCd = formObj.rpt_trdp_cd.value
			
			/* jsjang 2013.8.20 #17610 : [BINEX] 7. Email 전송 History */
			var his_type = "F"; // E : email, P : print, F : FAX
			var his_call_view = formObj.title.value;
			var his_call_file = formObj.fileName.value;
			var his_title = formObj.mailTitle.value;	
			var inv_seq = formObj.f_inv_seq.value;

			if (!(((rptBizTp == "" || rptBizTp == "undefined" || rptBizTp == undefined) &&
				       (rptBizSubTp == "" || rptBizSubTp == "undefined" || rptBizSubTp == undefined) &&
				           (rptTp == "" || rptTp == "undefined" || rptTp == undefined) &&
				               (rptTrdpCd == "" || rptTrdpCd == "undefined" || rptTrdpCd == undefined)) ||
				  (rptBizTp == "OIM" && rptBizSubTp == "DS"))
				) {    // Ocean Import > Master B/L >Devanning / Segregation 일 경우는 parameter로 받음
				// mailTo 조회 & setting
				ajaxSendPost(getRptFaxParameters, "reqVal", "&goWhere=aj&bcKey=getRptMailParameters&intg_bl_seq=" + formObj.intg_bl_seq.value
																			+ "&rpt_biz_tp=" + rptBizTp
																			+ "&rpt_biz_sub_tp=" + rptBizSubTp
																			+ "&rpt_tp=" + formObj.rpt_tp.value
																			+ "&rpt_trdp_cd=" + formObj.rpt_trdp_cd.value
																			, "./GateServlet.gsl");
			}
    		
    		
    		var formObj = document.frm1;    		
    		formObj.f_cmd.value = COMMAND01;
    		formObj.target = "ifr_hidden";
			formObj.action = "./RPT_RD_0011.clt";
			formObj.submit();
			
		break;
		
		case "Mail":
			rdObjects[0].SendMail(8);
		break;
		
		case "Print":
			rdObjects[0].PrintDialog();
		break;
		
		case "CLOSE":
	    	window.close();
    	break;
    }
}


function getRptFaxParameters(reqVal){
	var formObj = document.frm1;
	var doc = getAjaxMsgXML(reqVal);
	if (doc[0]=="OK") {
		if (typeof(doc[1]) != 'undefined' && doc[1] != undefined && doc[1] != "") {

			var rtnArr = doc[1].split('@@');
			formObj.fax_no.value = rtnArr[2];
			
		}
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
