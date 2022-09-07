/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : PFM_MGT_0140.js
*@FileTitle  : Vendor Performance Report
*@author     : CLT
*@version    : 1.0
*@since      : 2014/06/25
=========================================================*/
// 공통전역변수
var docObjects=new Array();
var sheetCnt=0;
var rdObjects=new Array();
var rdCnt=0;
/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
function loadPage() {
    var formObj=document.frm1;
    
    //LHK, 20141029 #44986 [BINEX]Office - All Option
    setOfficeAllOption(formObj.s_ofc_cd);
    
	for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
	setRdInit(rdObjects[0]);
	document.getElementById("mainRdTable").height=480;
}	
function doWork(srcName){
	if(!btnGetVisible(srcName)){
		return;
	}
	//탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var formObj=document.frm1;
    switch(srcName) {
    	case "SEARCH":
    		var v_dptm_tp_opt="";
    		var v_dptm_tp_ot_opt="";
    		if(formValidation()){
    			//Department parameter setting 
    			 if(formObj.s_oe_flg.checked){
    				 v_dptm_tp_opt += "'SO',";
    			 } 
    			 if(formObj.s_ae_flg.checked){
    				 v_dptm_tp_opt += "'AO',";
    			 }
    			 if(formObj.s_oi_flg.checked){
    				 v_dptm_tp_opt += "'SI',";
    			 }
    			 if(formObj.s_ai_flg.checked){
    				 v_dptm_tp_opt += "'AI',";
    			 }
    			 if(v_dptm_tp_opt != ""){
    				 v_dptm_tp_opt=v_dptm_tp_opt.substr(0,(v_dptm_tp_opt.length)-1);
    			 }
    			 if(formObj.s_ot_flg.checked){
        			 if(v_dptm_tp_opt == ""){
        				 v_dptm_tp_opt=v_dptm_tp_opt+"'OT'";
        			 }else{
        				 v_dptm_tp_opt=v_dptm_tp_opt+",'OT'";
        			 }
    			 }
    			formObj.dptm_tp_opt.value=v_dptm_tp_opt;
    			formObj.dptm_tp_ot_opt.value=v_dptm_tp_opt;
    			//Vendor Type parameter setting 
    			if(formObj.s_vndr_tp_opt[0].checked == true){
    				formObj.vndr_tp_opt.value="='L01'";
    			}else if(formObj.s_vndr_tp_opt[1].checked == true){
    				formObj.vndr_tp_opt.value="='L01'";
    			}else if(formObj.s_vndr_tp_opt[2].checked == true){
    				formObj.vndr_tp_opt.value="='T02'";
    			}else if(formObj.s_vndr_tp_opt[3].checked == true){
    				formObj.vndr_tp_opt.value="='C03'";
    			}else if(formObj.s_vndr_tp_opt[4].checked == true){
    				formObj.vndr_tp_opt.value="NOT IN ('L01','T02','C03')";
    			}
    			sheetObj.RemoveAll();
	    		formObj.f_cmd.value=SEARCH;
	    		sheetObj.DoSearch("PFM_MGT_0140GS.clt", FormQueryString(formObj) );
    		}
    	break;
    	case "TOP_CLEAR":
			clearForm();
	   	break;
    	case "EXCEL":
    		if(sheetObj.RowCount() < 1){//no data	
	   			ComShowCodeMessage("COM132501");
	   		}else{
	   			sheetObj.Down2Excel( {DownCols: makeHiddenSkipCol(sheetObj), SheetDesign:1,Merge:1 });
	   		}
        break;
    	case "CLEAR":
    		checkBoxClear();
	   	break;
    	case "ALL":
			checkAll();
	   	break;
    }
}
/* 상당 Clear버튼
* 2012.02.15 
*/
function clearForm(){
	 var formObj=document.frm1;
	 var sheetObj=docObjects[0];
	 formObj.s_ofc_cd.value="";
	 formObj.s_prd_strdt.value="";
	 formObj.s_prd_enddt.value="";
	 formObj.s_curr_cd.value="";
	 formObj.s_oe_flg.checked=false;
	 formObj.s_ae_flg.checked=false;
	 formObj.s_oi_flg.checked=false;
	 formObj.s_ai_flg.checked=false;
	 formObj.s_ot_flg.checked=false;
	 formObj.s_vndr_tp_opt[0].checked=true;
     sheetObj.RemoveAll();
}
/* Department checkBox All uncheck
 * 2012.02.15 
 */
function checkBoxClear(){
	 var formObj=document.frm1;
	 formObj.s_oe_flg.checked=false;
	 formObj.s_ae_flg.checked=false;
	 formObj.s_oi_flg.checked=false;
	 formObj.s_ai_flg.checked=false;
	 formObj.s_ot_flg.checked=false;
}
/* Department checkBox All check
 * 2012.02.15 
 */
function checkAll(){
	 var formObj=document.frm1;
	 formObj.s_oe_flg.checked=true;
	 formObj.s_ae_flg.checked=true;
	 formObj.s_oi_flg.checked=true;
	 formObj.s_ai_flg.checked=true;
	 formObj.s_ot_flg.checked=true;
}
// 조회시 Validation 체크 
function formValidation(){
	var formObj=document.frm1;
	if(!chkSearchCmprPrd(true, frm1.s_prd_strdt, frm1.s_prd_enddt)){
		return;
	}
	// Department를 선택하지 않았을 경우
	if(   formObj.s_oe_flg.checked == false 
	   && formObj.s_ae_flg.checked == false
	   && formObj.s_oi_flg.checked == false
	   && formObj.s_ai_flg.checked == false
	   && formObj.s_ot_flg.checked == false){
		alert(getLabel('PFM_COM_ALT011')+"(Department)");
		return false;
	}
	return true;
}
//--------------------------------------------------------------------------------------------------------------
//Tab 설정
//--------------------------------------------------------------------------------------------------------------
var currTab;
function goTabSelect(isNumSep) {
	var tabObjs=document.getElementsByName('tabLayer');
	var divRd = document.getElementById('mainRdTable');
	if( isNumSep == "01" ) {
		currTab=isNumSep;	//탭상태저장
		tabObjs[0].style.visibility='visible';
		divRd.style.width = '1000px';
		divRd.style.height = '500px';
		tabObjs[1].style.display='none';
		//스크롤을 하단으로 이동한다.
		//document.body.scrollTop = document.body.scrollHeight;
		//탭
	} else if( isNumSep == "02" ) {
		currTab=isNumSep;	//탭상태저장
		tabObjs[0].style.visibility='hidden';
		divRd.style.width = 0;
		divRd.style.height = 0;
		tabObjs[1].style.display='inline';
		//스크롤을 하단으로 이동한다.
		//document.body.scrollTop = document.body.scrollHeight;
		// 탭
	} 
	var index = parseInt(isNumSep);
	var count = 0;
	$('.opus_design_tab').find("li").each(function(){
		if(count++ == index - 1){
			$(this).addClass('nowTab');
		}else{
			$(this).removeClass('nowTab');
		}
	});
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
            SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

            var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
            var headers = [ { Text:getLabel('PFM_MGT_0140_HDR1'), Align:"Center"},
                        { Text:getLabel('PFM_MGT_0140_HDR2'), Align:"Center"} ];
            InitHeaders(headers, info);

            var cols = [ {Type:"Text",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"rnk",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                   {Type:"Text",      Hidden:0,  Width:250,  Align:"Left",    ColMerge:1,   SaveName:"trdp_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                   {Type:"Float",     Hidden:0,  Width:100,  Align:"Right",   ColMerge:1,   SaveName:"inv_amt",      KeyField:0,   CalcLogic:"",   Format:"NullFloat",   PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                   {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"inv_pctn",     KeyField:0,   CalcLogic:"",   Format:"NullFloat",   PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                   {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:1,   SaveName:"frt_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                   {Type:"Float",     Hidden:0,  Width:150,  Align:"Right",   ColMerge:1,   SaveName:"frt_inv_amt",  KeyField:0,   CalcLogic:"",   Format:"NullFloat",   PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                   {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"frt_pcnt",     KeyField:0,   CalcLogic:"",   Format:"NullFloat",   PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                   {Type:"Text",      Hidden:1, Width:80,   Align:"Left",    ColMerge:1,   SaveName:"trdp_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 } ];
             
            InitColumns(cols);

            SetEditable(1);
            SetSheetHeight(480);
            sheetObj.SetMergeSheet(7);
             
           }                                                      
         break;
     }
}
/**
달력팝업을 호출한다.
**/
function doDisplay(doWhat, formObj){
    switch(doWhat){
        case 'DATE1':    //달력 조회 팝업 호출      
	        var cal=new ComCalendarFromTo();
	        cal.displayType="date";
	        cal.select(formObj.s_prd_strdt,  formObj.s_prd_enddt, 'MM-dd-yyyy');
        break;
    }
}
/**
* Report Design 환경을 초기화한다.
*/
function setRdInit(objRd){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	objRd.AutoAdjust=2;
	objRd.HideToolBar();
//	objRd.ZoomRatio = 120;
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
//  objRd.DisableToolbar(13);
//	objRd.DisableToolbar(1);
//	objRd.DisableToolbar(14);
//	objRd.DisableToolbar(16);
	//objRd.DisableToolbar(17);
	//objRd.HideStatusbar();
	objRd.ViewShowMode(0);
	objRd.SetBackgroundColor(255,255,255);
	objRd.SetPageLineColor(255,255,255);
	objRd.ApplyLicense("0.0.0.0");	
	rdOpen(objRd, document.frm1);
}
function rdOpen(objRd, formObj) {
	var fileName="vendor_performance_report.mrd";
	var rdParam="";
	// 화면로딩시 조회되지 않도록 한다.
	if(formObj.rd_search_flg.value=="Y"){ 
		  var v_dptm_tp_opt="";
		  var v_dptm_tp_ot_opt="";
		  var v_vndr_tp_opt="";
		  var v_prd_strdt="";
		  var v_prd_enddt="";
		  rdParam="[";
		  // Office parameter setting 
		 if(formObj.s_ofc_cd.value != ""){
			 rdParam += " AND MST.RGST_OFC_CD='"+formObj.s_ofc_cd.value+"'";
		 }
		 // Period parameter setting 
		 if(formObj.s_prd_strdt.value != "" && formObj.s_prd_enddt.value != ""){
			 v_prd_strdt=(formObj.s_prd_strdt.value).substr(6,4)+(formObj.s_prd_strdt.value).substr(0,2)+ (formObj.s_prd_strdt.value).substr(3,2);
			 v_prd_enddt=(formObj.s_prd_enddt.value).substr(6,4)+(formObj.s_prd_enddt.value).substr(0,2)+ (formObj.s_prd_enddt.value).substr(3,2);
			 //Post date
			 if(formObj.s_dt_clss_cd.value == "P"){
				 rdParam += " AND DTL.INV_POST_DT BETWEEN '"+v_prd_strdt+"' AND '"+v_prd_enddt+"'";
			 }
			 // Invoice date
			 if(formObj.s_dt_clss_cd.value == "I"){
				 rdParam += " AND DTL.INV_DT BETWEEN '"+v_prd_strdt+"' AND '"+v_prd_enddt+"'";
			 }
		 }
		 // Currency parameter setting 
		 if(formObj.s_curr_cd.value != ""){
			 rdParam +=   " AND DTL.INV_APLY_CURR_CD='"+formObj.s_curr_cd.value+"'";
		 }
		 // Department parameter setting 
		 if(formObj.s_oe_flg.checked){
			 v_dptm_tp_opt += "'SO',";
		 } 
		 if(formObj.s_ae_flg.checked){
			 v_dptm_tp_opt += "'AO',";
		 }
		 if(formObj.s_oi_flg.checked){
			 v_dptm_tp_opt += "'SI',";
		 }
		 if(formObj.s_ai_flg.checked){
			 v_dptm_tp_opt += "'AI',";
		 }
		if(v_dptm_tp_opt != ""){
			 v_dptm_tp_opt=v_dptm_tp_opt.substr(0,(v_dptm_tp_opt.length)-1);
			 v_dptm_tp_opt=" AND MST.AIR_SEA_CLSS_CD + MST.BND_CLSS_CD IN ("+v_dptm_tp_opt+")";
		}
		 rdParam += v_dptm_tp_opt;
		// Vendor Type parameter setting 
		if(formObj.s_vndr_tp_opt[0].checked == true){
			rdParam += " AND PRNR.BL_TRDP_TP_CD='L01'";
		}else if(formObj.s_vndr_tp_opt[1].checked == true){
			rdParam += " AND PRNR.BL_TRDP_TP_CD='L01'";
		}else if(formObj.s_vndr_tp_opt[2].checked == true){
			rdParam += " AND PRNR.BL_TRDP_TP_CD='T02'";
		}else if(formObj.s_vndr_tp_opt[3].checked == true){
			rdParam += " AND PRNR.BL_TRDP_TP_CD='C03'";
		}else if(formObj.s_vndr_tp_opt[4].checked == true){
			rdParam += " AND PRNR.BL_TRDP_TP_CD NOT IN ('L01','T02','C03')";
		}
		rdParam += "]";
		rdParam += "[";
		if(formObj.s_ofc_cd.value != ""){
			 rdParam += " AND MST.RGST_OFC_CD='"+formObj.s_ofc_cd.value+"'";
		}
		 // Period parameter setting 
		if(formObj.s_prd_strdt.value != "" && formObj.s_prd_enddt.value != ""){
			 v_prd_strdt=(formObj.s_prd_strdt.value).substr(6,4)+(formObj.s_prd_strdt.value).substr(0,2)+ (formObj.s_prd_strdt.value).substr(3,2);
			 v_prd_enddt=(formObj.s_prd_enddt.value).substr(6,4)+(formObj.s_prd_enddt.value).substr(0,2)+ (formObj.s_prd_enddt.value).substr(3,2);
			 //Post date
			 if(formObj.s_dt_clss_cd.value == "P"){
				 rdParam += " AND DTL.INV_POST_DT BETWEEN '"+v_prd_strdt+"' AND '"+v_prd_enddt+"'";
			 }
			 // Invoice date
			 if(formObj.s_dt_clss_cd.value == "I"){
				 rdParam += " AND DTL.INV_DT BETWEEN '"+v_prd_strdt+"' AND '"+v_prd_enddt+"'";
			 }
		 }
		 // Currency parameter setting 
		 if(formObj.s_curr_cd.value != ""){
			 rdParam +=   " AND DTL.INV_APLY_CURR_CD='"+formObj.s_curr_cd.value+"'";
		 }
		 rdParam += "]";
		 rdParam += "[";
		 // Department parameter setting 
		 if(formObj.s_oe_flg.checked){
			 v_dptm_tp_ot_opt += "'SO',";
		 } 
		 if(formObj.s_ae_flg.checked){
			 v_dptm_tp_ot_opt += "'AO',";
		 }
		 if(formObj.s_oi_flg.checked){
			 v_dptm_tp_ot_opt += "'SI',";
		 }
		 if(formObj.s_ai_flg.checked){
			 v_dptm_tp_ot_opt += "'AI',";
		 }
		 if(formObj.s_ot_flg.checked){
			 if(v_dptm_tp_ot_opt == ""){
				 v_dptm_tp_ot_opt="'OT'";
				 rdParam += "WHERE X.DPMT_CD IN ( "+v_dptm_tp_ot_opt+")";
			 }else{
				 v_dptm_tp_ot_opt=v_dptm_tp_ot_opt.substr(0,(v_dptm_tp_ot_opt.length)-1);
				 v_dptm_tp_ot_opt=v_dptm_tp_ot_opt+",'OT'";
				 rdParam += "WHERE X.DPMT_CD IN ( "+v_dptm_tp_ot_opt+")";
			 }
		 }
		 rdParam += "]";
		objRd.SetMessageboxShow(0); 
		objRd.FileOpen(RD_path+"letter/"+fileName, RDServer+'/rp '+rdParam + " /riprnmargin");
	}
}
//조회
function sheet_OnSearchEnd(){
	var sheetObj=docObjects[0];
	var formObj=document.frm1;
	sheetObj.SetCellFont("FontBold", sheetObj.LastRow(),1,sheetObj.LastRow(),6,1);
	formObj.rd_search_flg.value="Y";    			
	setRdInit(rdObjects[0]);
}
//Sheet Click시 
function sheet_OnClick(){
	var sheetObj=docObjects[0];
	if(sheetObj.RowCount()> 0){
		sheetObj.SetCellFont("FontBold", sheetObj.LastRow(),1,sheetObj.LastRow(),6,1);
	}
} 
//Calendar flag value
var firCalFlag=false;
