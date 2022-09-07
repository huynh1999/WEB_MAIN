function doWork(srcName){
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var formObj=document.frm1;
    switch(srcName) {
       case "SEARCHLIST":
    	    doShowProcess();
            formObj.f_cmd.value=SEARCHLIST;
            sheetObj.DoSearch("./EDI_BKG_0010GS.clt", FormQueryString(formObj));
       break;
		//Booking EDI 전송 
       case "SEND_BOOKING_EDI":
    		if(sheetObj.GetTotalRows()== 0){
    			return;
			}
    	   
			if (!bkgEdiValidation(sheetObj,1,'S')){
				return;
			}
			var chk_cnt=0;
			for(var i=1; i<=sheetObj.LastRow();i++){
		   		if(sheetObj.GetCellValue(i ,"chk") == "1"){
		   			formObj.f_cmd.value=COMMAND01;
		   			formObj.f_bkg_seq.value=sheetObj.GetCellValue(i, "bkg_seq");
				    if(confirm(getLabel('FMS_COM_CFMSENDEDI'))){
				    	sheetObj.DoAllSave("./EDI_BKG_0010GS.clt", FormQueryString(formObj) +'&f_bkg_cancel=N', false);
				    }
				    chk_cnt += 1;
				    break;
		   		}
			}
		   if(chk_cnt == 0){
			   //No Save Data!!
			   alert(getLabel('FMS_COM_ALT007'));
			   return;
		   }
	    
		break;
       case "SEND_CANCEL_EDI":
    	   if(sheetObj.GetTotalRows()== 0){
    		   return;
    	   }
    	   if (!bkgEdiValidation(sheetObj,1,'C')){
    		   return;
    	   }
    	   for(var i=1; i<=sheetObj.LastRow();i++){
		   		if(sheetObj.GetCellValue(i ,"chk") == "1"){
		   			formObj.f_cmd.value=COMMAND01;
		   			formObj.f_bkg_seq.value=sheetObj.GetCellValue(i, "bkg_seq");
		   			if(confirm(getLabel('FMS_COM_CFMCAN'))){
		 		    	sheetObj.DoAllSave("./EDI_BKG_0010GS.clt", FormQueryString(formObj) +'&f_bkg_cancel=Y', false);
		   			}
		   			break;
		   		}
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
   docObjects[0]=sheet_obj;
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
             //MSG_KEY['EDI_BKG_0010_HDR'] = '|Booking No||Vessel|Voyage||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||EDI Status';
             //MSG_KEY['EDI_BKG_0010_HDR'] = '|Booking No||Vessel|Voyage||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||EDI Status';
             var headers = [ { Text:getLabel('EDI_BKG_0010_HDR'), Align:"Center"} ];
             
             InitHeaders(headers, info);
             var cols = [ 
	                    //{Type:"Seq",  	   Hidden:0, Width:40,   Align:"Center",  ColMerge:0,   SaveName:"no"},
	                    
	                    {Type:"CheckBox",  Hidden:0, Width:30,   Align:"Center",  ColMerge:0,   SaveName:"chk",              KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	                    {Type:"Text",      Hidden:0, Width:120,    Align:"Left",  ColMerge:0,   SaveName:"bkg_no",   UpdateEdit:0,   InsertEdit:0},
	                    {Type:"Text",      Hidden:1,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:"lnr_trdp_nm"},
	                    {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:1,   SaveName:"trnk_vsl_nm",   UpdateEdit:0,   InsertEdit:0},
	                    {Type:"Text",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"trnk_voy",   UpdateEdit:0,   InsertEdit:0},
	                    {Type:"Text",      Hidden:1,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"bkg_seq",   UpdateEdit:0,   InsertEdit:0},
	                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"bkg_dt_tm"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"po_no"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"lc_no"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"prnr_trdp_cd"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"prnr_trdp_nm"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"act_shpr_trdp_cd"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"act_shpr_trdp_nm"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"shpr_trdp_cd"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"shpr_trdp_nm"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"shpr_trdp_addr"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"shpr_pic_nm"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"shpr_pic_phn"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"shpr_nm"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"shpr_eml"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"shpr_phn"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"shpr_fax"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"shpr_cnt_cd"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"cnee_trdp_cd"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"cnee_trdp_nm"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"cnee_trdp_addr"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"cnee_pic_nm"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"cnee_pic_phn"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"cnee_nm"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"cnee_eml"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"cnee_phn"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"cnee_fax "},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"cnee_cnt_cd"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"ntfy_trdp_cd"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"ntfy_trdp_nm"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"ntfy_trdp_addr"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"ntfy_pic_nm"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"ntfy_pic_phn"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"ntfy_nm"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"ntfy_eml"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"ntfy_phn"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"ntfy_fax "},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"ntfy_cnt_cd"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"exp_ref_no"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"pu_trdp_cd"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"pu_trdp_nm"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"cgo_pu_trdp_cd"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"cgo_pu_trdp_nm"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"cgo_pu_trdp_addr"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"rcv_wh_cd"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"rcv_wh_nm"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"trk_trdp_cd"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"trk_trdp_nm"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"cust_ref_no"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"cntr_info"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"trnk_vsl_cd"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"por_cd"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"por_nod_cd"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"por_nm"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"por_un_loc_cd "},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"pol_cd"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"pol_un_loc_cd"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"pol_nod_cd"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"pol_nm"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"pod_cd"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"pod_un_loc_cd"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"pod_nod_cd"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"pod_nm"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"del_cd"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"del_un_loc_cd"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"del_nod_cd"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"del_nm"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"fnl_dest_loc_cd"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"fnl_dest_nod_cd"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"fnl_dest_loc_nm"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"lnr_trdp_cd"},
	                      {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"lnr_bkg_no"},	                    
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"lnr_nm"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"lnr_eml"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"lnr_phn"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"lnr_fax"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"lnr_cnt_cd"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"etd_dt_tm"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"eta_dt_tm"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"etd_por_tm"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"shp_mod_cd"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"rep_cmdt_cd"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"rep_cmdt_nm"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"pck_qty"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"pck_ut_cd"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"grs_wgt_ut_cd"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"grs_wgt"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"grs_wgt1"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"meas_ut_cd"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"meas"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"meas1"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"fm_svc_term_cd"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"to_svc_term_cd"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"cargo_tp_cd"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"cut_off_dt"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"rail_cut_off_dt"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"wh_cut_off_dt"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"doc_cut_off_dt"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"sls_ofc_cd"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"sls_dept_cd"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"sls_usrid"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"sls_usr_nm"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"rmk"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"dept_cd"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"rgst_usrid"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"rgst_ofc_cd"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"rgst_tms"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"modi_usrid"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"modi_ofc_cd"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"modi_tms"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"delt_flg"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"lnr_ctrt_no"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"frt_term_cd"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"iso_cntr_cd_null"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"msg_no"},
		                  {Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:1,   SaveName:"msg_no_seq"},
		                  {Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:1,   SaveName:"msg_fnc_cd"},
		                  {Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:1,   SaveName:"msg_err_cd"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"msg_sts"},
		                  {Type:"Text",      Hidden:0, Width:50,   Align:"Left",    ColMerge:1,   SaveName:"msg_sts_nm",   UpdateEdit:0,   InsertEdit:0},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"bl_no"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"iss_loc_cd"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"iss_un_loc_cd"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"iss_loc_nm"},
		                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"orientil_vld_flg"}
                    ];
             InitColumns(cols);
             SetEditable(1);
             SetSheetHeight(300);
           }                                                      
         break;
     }
}

//조회 후 페이지징 표시
function sheet1_OnSearchEnd(sheetObj, errMsg) {
	doHideProcess();
	var por_cd = "";
	var del_cd = "";
	
	for(var i=1; i<sheetObj.LastRow() + 1; i++){
		por_cd = 			sheetObj.GetCellValue(i, "por_cd");
		del_cd = 			sheetObj.GetCellValue(i, "del_cd");
		if(por_cd == ""){
			sheetObj.SetCellValue(i,"por_cd", sheetObj.GetCellValue(i, "pol_cd") ,0);
			sheetObj.SetCellValue(i,"por_un_loc_cd", sheetObj.GetCellValue(i, "pol_un_loc_cd") ,0);
			sheetObj.SetCellValue(i,"por_nm", sheetObj.GetCellValue(i, "pol_nm") ,0);
		}
		if(del_cd == ""){
			sheetObj.SetCellValue(i,"del_cd", sheetObj.GetCellValue(i, "pod_cd") ,0);
			sheetObj.SetCellValue(i,"del_un_loc_cd", sheetObj.GetCellValue(i, "pod_un_loc_cd") ,0);
			sheetObj.SetCellValue(i,"del_nm", sheetObj.GetCellValue(i, "pod_nm") ,0);
		}
		
	}
	var msg_err_cd =  docObjects[0].GetCellValue(1, "msg_err_cd");
	document.frm1.f_msg_err_cd.value = msg_err_cd;
}
function sheet1_OnSaveEnd(obj, ErrMsg){
	doWork("SEARCHLIST");
}
function bkgEdiValidation(sheetObj, row, sendType) {
	var valMsgArr = new Array();
	//SI EDI Validation check 와 동일
	// 1. 허용된 선사인가? Com_Cd로 조회 > E001
	var lnrList = new Array();
	var existLnrList = false;
	var formObj=document.frm1;
	
	
	var bkg_seq = 	   	"";
	var bkg_no = 	   	"";
	var bkg_dt_tm =   	"";
	var ib_c_name = 		"";
	var ib_c_phn = 		"";
	var ib_c_fax = 		"";
	var ib_c_email = 	"";
	var trnk_vsl_nm =  	"";
	var cust_ref_no = 		"";
	var lnr_trdp_cd  =  	"";
	var lnr_trdp_nm	 = 	"";
	var frt_term_cd  =	"";
	var fm_svc_term_cd =  	"";
	var to_svc_term_cd =   	"";
	var grs_wgt =   	"";
	var grs_wgt_ut_cd =    	"";
	var rep_cmdt_cd	= 			"";
	var cntr_info	=			"";
	var por_cd = 				"";
	var por_un_loc_cd = 	"";
	var por_nm = 				"";
	var pol_cd = 				"";
	var pol_un_loc_cd = 	"";
	var pol_nm = 				"";
	var pod_cd = 				"";
	var pod_un_loc_cd = 	"";
	var pod_nm = 				"";
	var del_cd = 				"";
	var del_un_loc_cd =	"";
	var del_nm = 				"";
	var shpr_trdp_cd = 	"";
	var shpr_pic_nm =  	"";
	var shpr_pic_eml =  	"";
	var shpr_pic_phn =  	"";
	var shpr_pic_fax =  	"";
	var cnee_trdp_cd = 	"";
	var cnee_pic_nm =  	"";
	var cnee_pic_eml =  	"";
	var cnee_pic_phn =  	"";
	var cnee_pic_fax =  	"";
	var ntfy_trdp_cd =	 "";
	var ntfy_pic_nm =  	"";
	var ntfy_pic_eml = 	"";
	var ntfy_pic_phn =  	"";
	var ntfy_pic_fax =  	"";
	var carr_pic_nm =  	"";
	var carr_pic_eml = 	"";
	var carr_pic_phn =  	"";
	var carr_pic_fax =  	"";
	var iso_cntr_cd_null =  	"";
	var msg_fnc_cd =  	"";
	var msg_sts =  	"";
	var bl_no =  	"";
	var iss_loc_cd =  	"";
	var iss_un_loc_cd =  	"";
	var iss_loc_nm =  	"";
	
	var shpr_pic_nms 	=  	"";
	var shpr_pic_phns 	=  	"";
	var cnee_pic_nms 	=  	"";
	var cnee_pic_phns 	=  	"";
	var ntfy_pic_nms 	=  	"";
	var ntfy_pic_phns 	=  	"";
	var orientil_vld_flg=  	"";
	
	if (trim(LNRCD) != "") {
		lnrList = LNRCD.split("|");
		if ( lnrList.length > 0){
			var lnr_cd = formObj.f_lnr_trdp_cd.value;
			
			for (var i=0;i<lnrList.length;i++) {
				if (lnrList[i] == lnr_cd) {
					existLnrList = true;
					break;
				}
			}
			
			if (!existLnrList) {
				valMsgArr.push(getLabel('EDI_COM_ALT009') );
			}
		}
	}
	
	for(var i=1; i<sheetObj.LastRow() + 1; i++){
		if(sheetObj.GetCellValue(i, "chk") == 1){
			bkg_seq = 	   	sheetObj.GetCellValue(i, "bkg_seq");
			bkg_no = 	   	sheetObj.GetCellValue(i, "bkg_no");
			bkg_dt_tm =   	sheetObj.GetCellValue(i, "bkg_dt_tm");
			ib_c_name = 	formObj.user_name.value;
			ib_c_phn = 		formObj.user_phn.value;
			ib_c_fax = 		formObj.user_fax.value;
			ib_c_email = 	formObj.user_email.value;
			trnk_vsl_nm =   sheetObj.GetCellValue(i, "trnk_vsl_nm");
			cust_ref_no = 	sheetObj.GetCellValue(i, "cust_ref_no");
			lnr_trdp_cd  =  sheetObj.GetCellValue(i, "lnr_trdp_cd");
			lnr_trdp_nm	 = 	sheetObj.GetCellValue(i, "lnr_trdp_nm");
			frt_term_cd  =	sheetObj.GetCellValue(i, "frt_term_cd");
			fm_svc_term_cd =    sheetObj.GetCellValue(i, "fm_svc_term_cd");
			to_svc_term_cd =    sheetObj.GetCellValue(i, "to_svc_term_cd");
			grs_wgt =      	sheetObj.GetCellValue(i, "grs_wgt");
			grs_wgt_ut_cd =     sheetObj.GetCellValue(i, "grs_wgt_ut_cd");
			rep_cmdt_cd	= 		sheetObj.GetCellValue(i, "rep_cmdt_cd");
			cntr_info	=		sheetObj.GetCellValue(i, "cntr_info");
			por_cd = 			sheetObj.GetCellValue(i, "por_cd");
			por_un_loc_cd = 	sheetObj.GetCellValue(i, "por_un_loc_cd");
			por_nm = 			sheetObj.GetCellValue(i, "por_nm");
			pol_cd = 			sheetObj.GetCellValue(i, "pol_cd");
			pol_un_loc_cd = 	sheetObj.GetCellValue(i, "pol_un_loc_cd");
			pol_nm = 			sheetObj.GetCellValue(i, "pol_nm");
			pod_cd = 			sheetObj.GetCellValue(i, "pod_cd");
			pod_un_loc_cd = 	sheetObj.GetCellValue(i, "pod_un_loc_cd");
			pod_nm = 			sheetObj.GetCellValue(i, "pod_nm");
			del_cd = 			sheetObj.GetCellValue(i, "del_cd");
			del_un_loc_cd = 	sheetObj.GetCellValue(i, "del_un_loc_cd");
			del_nm = 			sheetObj.GetCellValue(i, "del_nm");
			shpr_trdp_cd =  sheetObj.GetCellValue(i, "shpr_trdp_cd");
			shpr_pic_nm =  sheetObj.GetCellValue(i, "shpr_nm");
			shpr_pic_eml =  sheetObj.GetCellValue(i, "shpr_eml");
			shpr_pic_phn =  sheetObj.GetCellValue(i, "shpr_phn");
			shpr_pic_fax =  sheetObj.GetCellValue(i, "shpr_fax");
			shpr_pic_nms =	sheetObj.GetCellValue(i, "shpr_pic_nm");
			shpr_pic_phns=	sheetObj.GetCellValue(i, "shpr_pic_phn");
			cnee_trdp_cd =  sheetObj.GetCellValue(i, "cnee_trdp_cd");
			cnee_pic_nm =  sheetObj.GetCellValue(i, "cnee_nm");
			cnee_pic_eml =  sheetObj.GetCellValue(i, "cnee_eml");
			cnee_pic_phn =  sheetObj.GetCellValue(i, "cnee_phn");
			cnee_pic_fax =  sheetObj.GetCellValue(i, "cnee_fax");
			cnee_pic_nms =	sheetObj.GetCellValue(i, "cnee_pic_nm");
			cnee_pic_phns=	sheetObj.GetCellValue(i, "cnee_pic_phn");
			ntfy_trdp_cd =  sheetObj.GetCellValue(i, "ntfy_trdp_cd");
			ntfy_pic_nm =  sheetObj.GetCellValue(i, "ntfy_nm");
			ntfy_pic_eml =  sheetObj.GetCellValue(i, "ntfy_eml");
			ntfy_pic_phn =  sheetObj.GetCellValue(i, "ntfy_phn");
			ntfy_pic_fax =  sheetObj.GetCellValue(i, "ntfy_fax");
			ntfy_pic_nms =	sheetObj.GetCellValue(i, "ntfy_pic_nm");
			ntfy_pic_phns=	sheetObj.GetCellValue(i, "ntfy_pic_phn");
			carr_pic_nm =  sheetObj.GetCellValue(i, "lnr_nm");
			carr_pic_eml =  sheetObj.GetCellValue(i, "lnr_eml");
			carr_pic_phn =  sheetObj.GetCellValue(i, "lnr_phn");
			carr_pic_fax =  sheetObj.GetCellValue(i, "lnr_fax");
			iso_cntr_cd_null =  sheetObj.GetCellValue(i, "iso_cntr_cd_null");
			msg_fnc_cd =  sheetObj.GetCellValue(i, "msg_fnc_cd");
			msg_sts =  sheetObj.GetCellValue(i, "msg_sts");

			bl_no =  sheetObj.GetCellValue(i, "bl_no");
			iss_loc_cd =  sheetObj.GetCellValue(i, "iss_loc_cd");
			iss_un_loc_cd =  sheetObj.GetCellValue(i, "iss_un_loc_cd");
			iss_loc_nm =  sheetObj.GetCellValue(i, "iss_loc_nm");
			orientil_vld_flg = sheetObj.GetCellValue(i, "orientil_vld_flg");
			
			
			if(iso_cntr_cd_null != ""){
				valMsgArr.push(bkg_no + " : " + "Container TP/SZ, ISO Code - "+ iso_cntr_cd_null);
			}
			
		    // 1. null check
		    if (bkg_no == "") {  
		    	valMsgArr.push(bkg_no + " : " + "Booking No.");
		    }
		    if (bkg_dt_tm == "") {  
		    	valMsgArr.push(bkg_no + " : " + "Booking Date Time");
		    }
		    if (ib_c_name == "") {  
		    	alert(bkg_no + " : " + "Login User Name");
		    }
		    if (trnk_vsl_nm == "") {  
		    	valMsgArr.push(bkg_no + " : " + "Vessel Name");
				alert(getLabel('FMS_COM_ALT001') + " - " + MSG_KEY['FMS_COD_VESL']);
				isOk=false;
				return isOk; 
		    }
//		    if (cust_ref_no == "") {  
//		    	valMsgArr.push(bkg_no + " : " + "Customer Ref. No.");
//		    }
//		    if (frt_term_cd == "") {  
//		    	valMsgArr.push(bkg_no + " : " + "Freight ");
//		    	return false;
//		    }
		    if (fm_svc_term_cd == "") {  
		    	valMsgArr.push(bkg_no + " : " + "SVC Term From");
		    }
		    if (to_svc_term_cd == "") {  
		    	valMsgArr.push(bkg_no + " : " + "SVC Term To");
		    }
		    if (grs_wgt == "" || Number(grs_wgt) == 0) {  
		    	valMsgArr.push(bkg_no + " : " + "Gross Weight");
		    }
		    if (grs_wgt_ut_cd == "") {  
		    	valMsgArr.push(bkg_no + " : " + "Gross Weight "+grs_wgt_ut_cd);
		    }
		    if (por_cd != pol_cd && por_un_loc_cd == "") {  
		    	valMsgArr.push(bkg_no + " : " + "POR (UN) Location Code");
		    }
		    if (por_nm == "") {  
		    	valMsgArr.push(bkg_no + " : " + "POR Location Name");
		    }
		    if (pol_cd == "" || pol_un_loc_cd == "") {  
		    	valMsgArr.push(bkg_no + " : " + "POL (UN) Location Code");
		    }
		    if (pol_nm == "") {  
		    	valMsgArr.push(bkg_no + " : " + "POL Location Name");
		    }
		    if (pod_cd == "" || pod_un_loc_cd == "") {  
		    	valMsgArr.push(bkg_no + " : " + "POD (UN) Location Code");
		    }
		    if (pod_nm == "") {  
		    	valMsgArr.push(bkg_no + " : " + "POD Location Name");
		    }
		    if (del_cd != pod_cd && del_un_loc_cd == "") {  
		    	valMsgArr.push(bkg_no + " : " + "Del (UN) Location Code");
		    }
		    if (cntr_info == "") {  
		    	valMsgArr.push(bkg_no + " : " + "Container TP/SZ");
		    }
		    
		    if(lnr_trdp_cd == ""){
		    	valMsgArr.push(bkg_no + " : " + "Carrier");
		    }
		    if(shpr_trdp_cd == ""){
		    	valMsgArr.push(bkg_no + " : " + "Customer");
		    }
		    
		    // 각trdp에 tel/fax/eml 이 있을때 pic는 필수
		    //server check로 변경함.
		    
		    /*
		    if(shpr_pic_nms == "" && shpr_pic_phns == ""){
		    	if (shpr_pic_phn != "" || shpr_pic_fax !="" ) {
			    	if (shpr_pic_nm  == "") {
			    		valMsgArr.push(bkg_no + " : " + "Shipper's Contact Person Name");
			    	}
			    }else{
			    	valMsgArr.push(bkg_no + " : " + "Shipper's Contact Person Information");
			    }
		    }
		    
		    if(cnee_pic_nms == "" && cnee_pic_phns == ""){
		    	if (cnee_trdp_cd != ""){
			    	if (cnee_pic_phn != "" || cnee_pic_fax !="" ) {
			        	if (cnee_pic_nm  == "") {
			        		valMsgArr.push(bkg_no + " : " + "Consignee's Contact Person Name");
			        	}
			        }else{
			        	valMsgArr.push(bkg_no + " : " + "Consignee's Contact Person Information");
			        }
			    }
		    }
		    
		    if(ntfy_pic_nms == "" && ntfy_pic_phns == ""){
		    	if (ntfy_trdp_cd != ""){
			    	if (ntfy_pic_phn != "" || ntfy_pic_fax !="" ) {
			        	if (ntfy_pic_nm  == "") {
			        		valMsgArr.push(bkg_no + " : " + "Notify's Contact Person Name");
			        	}
			        }else{
			        	valMsgArr.push(bkg_no + " : " + "Notify's Contact Person Information");
			        }
			    }
		    }
		    
		    
		    if (carr_pic_phn != "" || carr_pic_fax !="" || carr_pic_eml != "") {
		    	if (carr_pic_nm  == "") {
		    		valMsgArr.push(bkg_no + " : " + "Carrier's Contact Person Name");
		    	}
		    }else{
		    	valMsgArr.push(bkg_no + " : " + "Carrier's Contact Person Information");
		    }
		    */
		    if((msg_sts == "S" || msg_sts == "T") && sendType == "S"){
		    	// #3544 [BINEX] CARRIER BOOKING EDI ERROR
		    	//valMsgArr.push(bkg_no + " : " + "Received From Carrier information");
		    	valMsgArr.push(bkg_no + " : " + "Transmitted to Carrier, please wait for Carrier's confirmation.");
		    	
		    }
		    
		    if(msg_fnc_cd == "" && sendType == "C"){
		    	valMsgArr.push(bkg_no + " : " + "Please Send EDI first");
		    }
		    
		    //MBLNO가 있으면 Isseud Place는 필수 항목이다.
		    if(bl_no != "") {
		    	if(iss_loc_cd=="" || iss_un_loc_cd ==""){
		    		valMsgArr.push(bkg_no + " : " + " Issued Place (UN) Location Code");
		    	}
		    }
		    
		    // 1. null check
		    if (orientil_vld_flg == "N") {  
		    	valMsgArr.push(bkg_no + " : " + "ORIENTIL Only Allowed Container Type size : 20GP,20FR,20RF,20TK,20OT,40GP,40FR,40RF,40TK,40OT,40HC,45HC");
		    }
		}
	}
	
	
	
	
	
    
//    if (ib_c_phn != "" || ib_c_fax !="" || ib_c_email != "") {
//    	if (ib_c_name  == "") {
//    		valMsgArr.push(bkg_no + " : " + "Login User Contact Person Name");
//    		return false;
//    	}
//    }
    
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

