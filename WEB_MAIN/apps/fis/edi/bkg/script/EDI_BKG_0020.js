function doWork(srcName){
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var formObj=document.frm1;
    switch(srcName) {
       case "SEARCHLIST":
            formObj.f_cmd.value=SEARCHLIST;
            sheetObj.DoSearch("./EDI_BKG_0020GS.clt", FormQueryString(formObj) );
       break;
		//EDI 전송 
		case "SEND_EDI":
			var chks=sheetObj.FindCheckedRow('chk');
			if(chks == ''){
				alert(getLabel('FMS_COM_ALT007'));
				return false;
			}
		
			for(var i=1;i<sheetObj.LastRow() + 1;i++){
				if(sheetObj.GetCellValue(i, "chk")=="1"){		//현재 한진해운만 가능
					if (!mblEdiValidation(sheetObj,i, "S")){
						return false;
					}
				}
			}
			
		    formObj.f_cmd.value=COMMAND01;
		    if(confirm(getLabel('FMS_COM_CFMSENDEDI'))){
		    	sheetObj.DoAllSave("./EDI_BKG_0020GS.clt", FormQueryString(formObj)  +'&f_bkg_cancel=N', true);
		    }
		    
		break;
		
		//EDI 전송 
		case "CANCEL_EDI":
			var chks=sheetObj.FindCheckedRow('chk');
			if(chks == ''){
				alert(getLabel('FMS_COM_ALT007'));
				return false;
			}
		
			for(var i=1;i<sheetObj.LastRow() + 1;i++){
				if(sheetObj.GetCellValue(i, "chk")=="1"){		//현재 한진해운만 가능
					if (!mblEdiValidation(sheetObj,i, "C")){
						return false;
					}
				}
			}
			
		    formObj.f_cmd.value=COMMAND01;
		    if(confirm(getLabel('FMS_COM_CFMSENDEDI'))){
		    	sheetObj.DoAllSave("./EDI_BKG_0020GS.clt", FormQueryString(formObj)  +'&f_bkg_cancel=Y', true);
		    }
		    
		break;
  	    case "CLOSE":
  	    	window.close();
   	    break;
    }
}
//--------------------------------------------------------------------------------------------------------------
//                                             IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
var docObjects=new Array();
var sheetCnt=0;
var ctlKind="";
var ctlCol=0;
var ctlRow=0;
/**
 * Paging 항목 선택시 호출되
 */
function goToPage(callPage){
	docObjects[0].RemoveAll();
	document.forms[0].f_CurPage.value=callPage;
	doWork('SEARCHLIST', '');
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function viewCntChg(){
	document.forms[0].f_CurPage.value=1;
	doWork('SEARCHLIST');
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function searchList(){
	document.forms[0].f_CurPage.value=1;
	doWork('SEARCHLIST');
}
/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
function loadPage() {
    var formObj=document.frm1;
	for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
	doWork("SEARCHLIST");
}
/**
 * IBSheet Object를 배열로 등록
 * 향후 다른 항목들을 일괄처리할 필요가 있을 때 배열로 담는 프로세스를 추가할 수 있다
 * 배열은 소스 상단에 정의
 */
function setDocumentObject(sheet_obj){
   docObjects[sheetCnt++]=sheet_obj;
}
/**
 * 시트 초기설정값, 헤더 정의
 * param : sheetObj ==> 시트오브젝트, sheetNo ==> 시트오브젝트 태그의 아이디에 붙인 일련번호
 * 시트가 다수일 경우 시트 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
 */
function initSheet(sheetObj,sheetNo) {
    switch(sheetNo) {
         case 1:      //IBSheet1 init
            with (sheetObj) {

             SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0 } );

             var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
             var headers = [ { Text:getLabel('EDI_MBL_0020_HDR'), Align:"Center"} ];
             InitHeaders(headers, info);

             var cols = [ {Type:"CheckBox",  Hidden:0, Width:50,   Align:"Center",  ColMerge:0,   SaveName:"chk",              KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Text",      Hidden:0,  Width:140,  Align:"Left",    ColMerge:1,   SaveName:"mbl_no",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"ref_no",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"mbl_intg_bl_seq" },
                    {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"lnr_bkg_no",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"lnr_trdp_cd" },
                    {Type:"Text",      Hidden:1,  Width:0,   Align:"Center",  ColMerge:0,   SaveName:"msg_no",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1,  Width:0,   Align:"Center",  ColMerge:0,   SaveName:"msg_no_seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1,  Width:0,   Align:"Center",  ColMerge:0,   SaveName:"msg_err_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1,  Width:0,   Align:"Center",  ColMerge:0,   SaveName:"msg_sts",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0, Width:200,    Align:"Center",  ColMerge:0,   SaveName:"cnee_trdp_nm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0  },
                    {Type:"Text",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:0,   SaveName:"msg_sts_nm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"un_pol_cd" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"un_pod_cd" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"un_por_cd" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"un_del_cd" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"pol_nm" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"pod_nm" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"por_cd" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"por_nm" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"del_cd" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"del_nm" },
                    
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"etd_dt_tm" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"eta_dt_tm" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"fm_svc_term_cd" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"to_svc_term_cd" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"trnk_vsl_cd" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"trnk_vsl_nm" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"trnk_vsl_cnt_cd" },
                    
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"trnk_voy" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"rmk" },
                    
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"pck_qty" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"pck_ut_cd" },  //20161027 hjw add ebkg edi
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"grs_wgt" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"meas" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"itn_no" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"cntr_cnt" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"no_name_cntr_cnt" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"no_tpsz_cntr_cnt" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"desc_txt" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"shpr_pic_nm" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"shpr_pic_phn" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"shpr_pic_fax" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"shpr_pic_eml" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"shpr_cnt_cd" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"shpr_trdp_cd" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"shpr_trdp_addr" },
                    
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"cnee_pic_nm" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"cnee_pic_phn" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"cnee_pic_fax" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"cnee_pic_eml" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"cnee_cnt_cd" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"cnee_trdp_cd" },
                    
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"cnee_trdp_addr" },
                    
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"ntfy_pic_nm" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"ntfy_pic_phn" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"ntfy_pic_fax" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"ntfy_pic_eml" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"ntfy_cnt_cd" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"ntfy_trdp_cd" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"ntfy_trdp_addr" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"carr_pic_nm" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"carr_pic_phn" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"carr_pic_fax" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"carr_pic_eml" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"carr_cnt_cd" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"carr_trdp_cd" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"carr_trdp_addr" },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"carr_trdp_scac_cd" }
                    
                    ];
              
             InitColumns(cols);

             SetEditable(1);
             SetSheetHeight(305);
             
           }                                                      
         break;
     }
}

//조회 후 페이지징 표시
/*
function sheet1_OnSearchEnd(sheetObj, errMsg) {
	for ( var i = 1; i <= sheetObj.LastRow(); i++) {
		if (sheetObj.GetCellValue(i, "msg_sts") == "S") {
			sheetObj.SetCellValue(i, "block_flag", "Y");
		}
	}
}
*/

function sheet1_OnSaveEnd(sheetObj, errMsg){
	doWork('SEARCHLIST', '');
}

function sheet1_OnSort(sheetObj, col, sortArrow) {
 sheetObj.SetSelectRow(sheetObj.HeaderRows());
}

function sheet1_OnClick(sheetObj, Row, Col){	
	var msg_err_cd =  sheetObj.GetCellValue(Row, "msg_err_cd");
	document.frm1.f_msg_err_cd.value = msg_err_cd;
}

function mblEdiValidation(sheetObj, row, sendType) {
	//SI EDI Validation check
	// 1. 허용된 선사인가? Com_Cd로 조회 > E001
	var valMsgArr = new Array();
	var lnrList = new Array();
	var existLnrList = false;
	var formObj=document.frm1;
	if (trim(LNRCD) != "") {
		lnrList = LNRCD.split("|");
		if ( lnrList.length > 0){
			var lnr_cd = sheetObj.GetCellValue(row, "lnr_trdp_cd");
			
			for (var i=0;i<lnrList.length;i++) {
				if (lnrList[i] == lnr_cd) {
					existLnrList = true;
					break;
				}
			}
			
			if (!existLnrList) {
				valMsgArr.push(getLabel('EDI_COM_ALT009'));
			}
		}
	}
		
	
	// 2. VSL VVD Check 
/*    var formObj=document.frm1;
	var vmlNm = formObj.vsl_nm.value();
	var voy   = formObj.voy.value();
	
	if (vmlNm == "" || voy == ""){
    	alert(getLabel('EDI_COM_ALT007') + "\n - "+ "Vessel/Voyage");
    	return false;
	}*/
	
	// 3. 이외 항목 check 
	var ref_no = sheetObj.GetCellValue(row, "ref_no");
	var intg_bl_seq = 	   	sheetObj.GetCellValue(row, "intg_bl_seq");
	var cnee_nm   =    sheetObj.GetCellValue(row, "cnee_nm");
    
	var por_cd = 			sheetObj.GetCellValue(row, "por_cd");
	var un_por_cd = 	sheetObj.GetCellValue(row, "un_por_cd");
	var por_nm = 			sheetObj.GetCellValue(row, "por_nm");
	var del_cd = 			sheetObj.GetCellValue(row, "del_cd");
	var un_del_cd = 	sheetObj.GetCellValue(row, "un_del_cd");
	var del_nm = 			sheetObj.GetCellValue(row, "del_nm");
	
    var pck_qty =      sheetObj.GetCellValue(row, "pck_qty");
    var pck_ut_cd =      sheetObj.GetCellValue(row, "pck_ut_cd");    //20161027 hjw add ebkg edi
    var grs_wgt =      sheetObj.GetCellValue(row, "grs_wgt");
    var meas =         sheetObj.GetCellValue(row, "meas");
    
    var fm_svc_term_cd =    sheetObj.GetCellValue(row, "fm_svc_term_cd");
	var to_svc_term_cd =    sheetObj.GetCellValue(row, "to_svc_term_cd");
	var grs_wgt_ut_cd =     sheetObj.GetCellValue(row, "grs_wgt_ut_cd");
	var rep_cmdt_cd	= 		sheetObj.GetCellValue(row, "rep_cmdt_cd");
    var cntr_cnt =        sheetObj.GetCellValue(row, "cntr_cnt");
    
    var trnk_vsl_nm =     sheetObj.GetCellValue(row, "trnk_vsl_nm");
    
    
    var itn_no =	   sheetObj.GetCellValue(row, "itn_no");
//    var no_name_cntr_cn = sheetObj.GetCellValue(row, "no_name_cntr_cnt");
    var no_tpsz_cntr_cn = sheetObj.GetCellValue(row, "no_tpsz_cntr_cnt");
    var desc_txt =     sheetObj.GetCellValue(row, "desc_txt");
    
    var shpr_trdp_cd =  sheetObj.GetCellValue(row, "shpr_trdp_cd");
//    var shpr_trdp_nm =  sheetObj.GetCellValue(row, "shpr_trdp_nm");
    var shpr_pic_nm =  sheetObj.GetCellValue(row, "shpr_pic_nm");
    var shpr_pic_phn = sheetObj.GetCellValue(row, "shpr_pic_phn");
    var shpr_pic_fax = sheetObj.GetCellValue(row, "shpr_pic_fax");
    var shpr_pic_eml = sheetObj.GetCellValue(row, "shpr_pic_eml");
    var cnee_trdp_cd =  sheetObj.GetCellValue(row, "cnee_trdp_cd");
    var cnee_trdp_nm =  sheetObj.GetCellValue(row, "cnee_trdp_nm");
    var cnee_pic_nm =  sheetObj.GetCellValue(row, "cnee_pic_nm");
    var cnee_pic_phn = sheetObj.GetCellValue(row, "cnee_pic_phn");
    var cnee_pic_fax = sheetObj.GetCellValue(row, "cnee_pic_fax");
    var cnee_pic_eml = sheetObj.GetCellValue(row, "cnee_pic_eml");
    var ntfy_trdp_cd =  sheetObj.GetCellValue(row, "ntfy_trdp_cd");
//    var ntfy_trdp_nm =  sheetObj.GetCellValue(row, "ntfy_trdp_nm");
    var ntfy_pic_nm =  sheetObj.GetCellValue(row, "ntfy_pic_nm");
    var ntfy_pic_phn = sheetObj.GetCellValue(row, "ntfy_pic_phn");
    var ntfy_pic_fax = sheetObj.GetCellValue(row, "ntfy_pic_fax");
    var ntfy_pic_eml = sheetObj.GetCellValue(row, "ntfy_pic_eml");
    var carr_trdp_cd =  sheetObj.GetCellValue(row, "carr_trdp_cd");//lnr_trdp_cd
    var carr_trdp_nm =  sheetObj.GetCellValue(row, "carr_trdp_nm");
    var carr_pic_nm =  sheetObj.GetCellValue(row, "carr_pic_nm");
    var carr_pic_phn = sheetObj.GetCellValue(row, "carr_pic_phn");
    var carr_pic_fax = sheetObj.GetCellValue(row, "carr_pic_fax");
    var carr_pic_eml = sheetObj.GetCellValue(row, "carr_pic_eml");
    
    var carr_trdp_scac_cd = sheetObj.GetCellValue(row, "carr_trdp_scac_cd");
    
//    var iso_cntr_cd_null =  sheetObj.GetCellValue(row, "iso_cntr_cd_null");
    var msg_fnc_cd =  sheetObj.GetCellValue(row, "msg_fnc_cd");
	var msg_sts =  sheetObj.GetCellValue(row, "msg_sts");

    
    // 1. null check
    if (cnee_trdp_nm == "") {  
    	valMsgArr.push(getLabel('EDI_COM_ALT010'));
    }
    if (un_por_cd == "") {  
    	valMsgArr.push(getLabel('EDI_COM_ALT011'));
    }
    if (un_del_cd == "") {  
    	valMsgArr.push(getLabel('EDI_COM_ALT012'));
    }
    if (por_nm == "") {  
    	valMsgArr.push(getLabel('EDI_COM_ALT013'));
    }
    if (del_nm == "") {  
    	valMsgArr.push(getLabel('EDI_COM_ALT014'));
    }
    
    //20161027 hjw add ebkg edi 
    if(document.frm1.f_rcvr_id.value == 'ENP' ){
    	if (pck_qty == "" ||  pck_qty < 1) {  
    		valMsgArr.push(getLabel('EDI_COM_ALT015'));
    	}
    	if (grs_wgt == "" ||  grs_wgt < 1) {  
    		valMsgArr.push(getLabel('EDI_COM_ALT016'));
    	}
    	if (pck_ut_cd == "" ) {  
    		valMsgArr.push(getLabel('EDI_COM_ALT080'));
    	}
    	if (meas == "" ) {  
    		valMsgArr.push(getLabel('EDI_COM_ALT081'));
    	}
    	if (desc_txt == "" ) {  
    		valMsgArr.push(getLabel('EDI_COM_ALT082'));
    	}
    }
    
    if (trnk_vsl_nm == "") { 
    	valMsgArr.push(getLabel('EDI_COM_ALT017'));
    }
    
    // 0 > 이상인지 체크 
    if (cntr_cnt == 0 ) {  
    	valMsgArr.push(getLabel('EDI_COM_ALT018'));
    	

    }
    if (no_tpsz_cntr_cn > 0) {  // TPSZ 없는 컨테이너가 1개 이상이라면 
    	valMsgArr.push(getLabel('EDI_COM_ALT019'));
    }
    
    if (fm_svc_term_cd == "") {  
    	valMsgArr.push(getLabel('EDI_COM_ALT020'));
    }
    if (to_svc_term_cd == "") {  
    	valMsgArr.push(getLabel('EDI_COM_ALT021'));
    }
    
    
    if(carr_trdp_cd == ""){
    	valMsgArr.push(getLabel('EDI_COM_ALT022'));
    }
    if(carr_trdp_scac_cd == ""){
    	valMsgArr.push(getLabel('EDI_COM_ALT023'));
    }
    
    if(shpr_trdp_cd == ""){
    	valMsgArr.push(getLabel('EDI_COM_ALT024'));
    }
    if(cnee_trdp_cd == ""){
    	valMsgArr.push(getLabel('EDI_COM_ALT025'));
    }
    
    // 각trdp에 tel/fax/eml 이 있을때 pic는 필수
    if (shpr_pic_phn != "" || shpr_pic_fax !="" || shpr_pic_eml != "") {
    	if (shpr_pic_nm  == "") {
    		valMsgArr.push(getLabel('EDI_COM_ALT026'));
    		
    	}
    }
    if (cnee_trdp_cd != ""){
	    if (cnee_pic_phn != "" || cnee_pic_fax !="" || cnee_pic_eml != "") {
	    	if (cnee_pic_nm  == "") {
	    		valMsgArr.push(getLabel('EDI_COM_ALT027'));
	    	}
	    }
    }
    if(ntfy_trdp_cd != ""){
    	if (ntfy_pic_phn != "" || ntfy_pic_fax !="" || ntfy_pic_eml != "") {
        	if (ntfy_pic_nm  == "") {
        		valMsgArr.push(getLabel('EDI_COM_ALT028'));
        	}
        }
    }
    
    if (carr_pic_phn != "" || carr_pic_fax !="" || carr_pic_eml != "") {
    	if (carr_pic_nm  == "") {
    		valMsgArr.push(getLabel('EDI_COM_ALT029'));
    	}
    }
    
    if((msg_sts == "S" || msg_sts == "T") && sendType == "S"){
    	valMsgArr.push(getLabel('EDI_COM_ALT030'));
    }
    
    if(msg_fnc_cd == "" && sendType == "C"){
    	valMsgArr.push(getLabel('EDI_COM_ALT031'));
    }
    
    if(valMsgArr.length > 0){
    	formObj.val_msg.value = "";
    	for(var i=0; i<valMsgArr.length; i++){
    		formObj.val_msg.value += ((i+1) + ". " + valMsgArr[i] + "\n");
	    }
    	disp_val_msg.style.display='inline';
    	return false;
    }
    
    return true;
	
}

function VAL_MSG(rtnVal){
}
var rtnary;
var callBackFunc;
