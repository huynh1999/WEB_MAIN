//=========================================================
//*@FileName   : SEE_DOC_1030.jsp
//*@FileTitle  : LOAD PLAN
//*@Description: LOAD PLAN
//*@author     : Chungrue - Cyberlogitec
//*@version    : 1.0 - 2011/12/12
//*@since      : 2011/12/12
//
//*@Change history:
//*@author     : Tuan.Chau
//*@version    : 2.0 - 2014/06/14
//*@since      : 2014/06/14
//=========================================================
var isError=false;
var rtnary=new Array(1);
var callBackFunc = "";
var id = "";
function doWork(srcName, curObj, valObj){
	var formObj  = document.frm1;
	var sheetObj=docObjects[0];
	
	try {
		switch(srcName) {
			case "SEARCHLIST":
				if(!validateInputValue()){
					return;
				}
		   		frm1.f_cmd.value=SEARCHLIST;
		   		sheetObj.DoSearch("./SAL_TPM_0080GS.clt", FormQueryString(frm1) );
			break;
			case "PARTNER_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
		   		rtnary=new Array(1);
		   		rtnary[0]="1";
		   		if(typeof(valObj)!='undefined'){
		   			rtnary[1]=valObj;
		   		}else{
		   			rtnary[1]="";
		   		}
		   		rtnary[2]=window;
		   		var callTp='';
		   		if(curObj.id == "trn"){
		   			//callTp = 'TK';
		   			/* #23817 D/O PRINT시 TRUCKER 로 검색이아닌 ALL, jsjang 2013.11.22*/
		   			callTp='';
		   		}else if(curObj.id == "pic"){
		   		}else if(curObj.id == "del"){
		   		}else if(curObj.id == "bil"){
		   		}else if(curObj.id == "prnr"){
		   		}else if(curObj.id == "shpr"){
		   		}else if(curObj.id == "cnee"){
		   		}
		   		
    	        callBackFunc = "PARTNER_POPLIST";
    	        modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
    	        id = curObj.id;
    	        
           break;
		  case 'NEW':
	       	var paramStr="./SAL_TPM_0070.clt?f_cmd=-1";
	        parent.mkNewFrame('Pre-Pickup Order Entry', paramStr);
	      break;
		  case "PRINT":
			///////////////////////////////////////////////////////////
	     	// 프린트
			if(ofc_cnt_cd == "DE"){
				frm1.file_name.value='pickup_delivery_instruction_03.mrd';
   		   	}else{
   		   		frm1.file_name.value='pickup_delivery_instruction_04.mrd';
   		   	}
			
			var chkCnt=0;
      		for ( var i=1; i <= sheetObj.LastRow(); i++) {
      			if (sheetObj.GetCellValue(i, "chk") == "1") {
      				chkCnt += 1;
      			}
      		}
      		
      		if (chkCnt == 1) {
      			var param = "";
      			
      			frm1.title.value='Pickup Delivery Instruction';
       		   	//Parameter Setting
      			var wo_no = "";
      			var org_value = "";
      			var via_value = "";
				//OFVFOUR-8080: [Impex-GER] Email address is not brought to Email Window for Pick Up Delivery Instruction
				var trsp_trdp_cd_value = "";

      			for ( var i=1; i <= sheetObj.LastRow(); i++) {
          			if (sheetObj.GetCellValue(i, "chk") == "1") {
          				wo_no = sheetObj.GetCellValue(i, "wo_no");
						//OFVFOUR-8080: [Impex-GER] Email address is not brought to Email Window for Pick Up Delivery Instruction
						trsp_trdp_cd_value = sheetObj.GetCellValue(i, "trsp_trdp_cd");
    					break;
          			}
          		}
      			
      			param = "[" + wo_no + "]";	// [1]
      			param += "[" + user_ofc_cd + "]";
       		   	param += "[" + user_eml + "]";
       		   	param += "[" + user_phn + "]";
       		   	param += "[" + user_fax + "]";
       		   	
       		   	if(ofc_cnt_cd == "DE"){
       			 	param += "[" + org_value + "]";
  			   		param += "[" + via_value + "]";
       		 	}
				//OFVFOUR-8080: [Impex-GER] Email address is not brought to Email Window for Pick Up Delivery Instruction
				param += "[" + trsp_trdp_cd_value + "]";
       		   	
       		   	frm1.mailTitle.value="Pre-Pickup Order [W/O No. " + wo_no + "]";
       		   	
       		   	frm1.rd_param.value=param;
       		   	
	       		 //#52512 [CLT] RD File Name을 표준화| Standardization of File Name during downloading the report 
	       		 if (wo_no != ""){
	       		 	formObj.rpt_file_name_title.value = "Pickup_Instruction_"+wo_no;
	       		 } else {
	       		 	formObj.rpt_file_name_title.value = "";
	       		 } 
       		 
       		   	popPOST(frm1, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
      		}
			
      		else if (chkCnt == 0) {
      			//alert("Please select the row to print. ");
      			ComShowMessage(getLabel('FMS_COM_ALT004'));	
      			return;
      		} else {
      			//alert("Please select 1 row. ");
      			ComShowMessage(getLabel('FMS_COM_ALT003'));	
      			return;
      		}		  	  
     	  break;
		  case "COPY":
			var chkCnt=0;

			for(var i=1; i <= sheetObj.LastRow(); i++) {
	      		if (sheetObj.GetCellValue(i, "chk") == "1") {
	      			chkCnt += 1;
	      		}
	      	}
	      		
      		if (chkCnt == 1) {
      			if(confirm(getLabel('FMS_COM_CFMCPY'))){
	   	 			var wo_no = "";
	      			
	      			for ( var i=1; i <= sheetObj.LastRow(); i++) {
	          			if (sheetObj.GetCellValue(i, "chk") == "1") {
	          				wo_no = sheetObj.GetCellValue(i, "wo_no");
	    					break;
	          			}
	          		} 
	   	 				
   	 				var paramStr = "./SAL_TPM_0070.clt?f_cmd="+ COMMAND05 +"&f_wo_no=" + wo_no;
	   	 	   	    parent.mkNewFrame('Pre-Pickup Order Entry', paramStr);
   	 			}
      		} else if (chkCnt == 0) {
      			//alert("Please select the row to print. ");
      			ComShowMessage(getLabel('FMS_COM_ALT004'));	
      			return;
      		} else {
      			//alert("Please select 1 row. ");
      			ComShowMessage(getLabel('FMS_COM_ALT003'));	
      			return;
      		}	
		  break;	  
        } // end switch
	}catch(e) {
		//alert(e.description);
        if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	alert(getLabel('FMS_COM_ERR002'));
        } 
        else{
        	//System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001') + " - " + e);
        }
	}
}

function PARTNER_POPLIST(rtnVal){
    if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		if(id=="pic"){
			var rtnValAry=rtnVal.split("|");
			frm1.org_rout_trdp_cd.value=rtnValAry[0];//trdp_cd
			frm1.org_rout_trdp_nm.value=rtnValAry[2];//eng_nm
		}else if(id=="del") {
			var rtnValAry=rtnVal.split("|");
			frm1.dest_rout_trdp_cd.value=rtnValAry[0];//trdp_cd
			frm1.dest_rout_trdp_nm.value=rtnValAry[2];//eng_nm
		}else if(id=="trn") {
			var rtnValAry=rtnVal.split("|");
			frm1.trsp_trdp_cd.value=rtnValAry[0];//trdp_cd
			frm1.trsp_trdp_nm.value=rtnValAry[2];//eng_nm
		}else if(id=="bil") {
			var rtnValAry=rtnVal.split("|");
			frm1.bill_to_trdp_cd.value=rtnValAry[0];//trdp_cd
			frm1.bill_to_trdp_nm.value=rtnValAry[2];//eng_nm
		}else if(id=="prnr") {
			var rtnValAry=rtnVal.split("|");
			frm1.prnr_trdp_cd.value=rtnValAry[0];//trdp_cd
			frm1.prnr_trdp_nm.value=rtnValAry[2];//eng_nm
		}else if(id=="shpr") {
			var rtnValAry=rtnVal.split("|");
			frm1.shpr_trdp_cd.value=rtnValAry[0];//trdp_cd
			frm1.shpr_trdp_nm.value=rtnValAry[2];//eng_nm
		}else if(id=="cnee") {
			var rtnValAry=rtnVal.split("|");
			frm1.cnee_trdp_cd.value=rtnValAry[0];//trdp_cd
			frm1.cnee_trdp_nm.value=rtnValAry[2];//eng_nm
		}
	}
}
//--------------------------------------------------------------------------------------------------------------
//                                             IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
var docObjects=new Array();
var sheetCnt=0;
/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
function loadPage() {
    for(var i=0;i<docObjects.length;i++){
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        comEndConfigSheet(docObjects[i]);
    }
    //사용자가 저장한 Header 정보를 읽어온다.
    IBS_RestoreGridSetting(frm1.user_id.value, getPageURL(), docObjects[0], false, "RestoreGrid");
    
}

function RestoreGrid(){
	doWork('SEARCHLIST');
}

/**
 * IBSheet Object를 배열로 등록
 * 향후 다른 항목들을 일괄처리할 필요가 있을 때 배열로 담는 프로세스를 추가할 수 있다
 * 배열은 소스 상단에 정의
 */
function setDocumentObject(sheet_obj){
	switch(sheet_obj.id){
		case "sheet1":
			docObjects[0]=sheet_obj;
		break;
	}
}
/**
 * 시트 초기설정값, 헤더 정의
 * param : sheetObj ==> 시트오브젝트, sheetNo ==> 시트오브젝트 태그의 아이디에 붙인 일련번호
 * 시트가 다수일 경우 시트 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
 */
function initSheet(sheetObj,sheetNo) {
    switch(sheetNo) {
    	case 1:     
			with (sheetObj) {
            SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0 } );

            var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
            var headers = [ { Text:getLabel('SAL_TPM_0080_HDR1'), Align:"Center"} ];
            InitHeaders(headers, info);

            var cols = [ {Type:"CheckBox",  Hidden:0, Width:30,   Align:"Center",  ColMerge:0,   SaveName:"chk" },
                   {Type:"Text",      Hidden:0,  Width:90,   Align:"Center",  ColMerge:0,   SaveName:"wo_no",              KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0 },
                   {Type:"Text",      Hidden:1, Width:50,   Align:"Center",  ColMerge:0,   SaveName:"trsp_trdp_cd" },
                   {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"trsp_trdp_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0 },
                   {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:0,   SaveName:"trsp_trdp_addr" },
                   {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:0,   SaveName:"org_rout_trdp_cd" },
                   {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"org_rout_trdp_nm",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0 },
                   {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:0,   SaveName:"org_rout_addr" },
                   {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:0,   SaveName:"dest_rout_trdp_cd" },
                   {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"dest_rout_trdp_nm",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0 },
                   {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:0,   SaveName:"dest_rout_addr" },
                   {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:0,   SaveName:"bill_to_trdp_cd" },
                   {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"bill_to_trdp_nm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0 },
                   {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:0,   SaveName:"bill_to_trdp_addr" },
                   {Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"cgo_itm_cmdt_nm" },
                   {Type:"Int",      Hidden:0,  Width:90,   Align:"Right",   ColMerge:0,   SaveName:"cgo_pck_qty",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0 },
                   {Type:"Text",      Hidden:0,  Width:90,   Align:"Left",    ColMerge:0,   SaveName:"pck_nm",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0 },
                   {Type:"Float",      Hidden:0,  Width:80,   Align:"Right",   ColMerge:0,   SaveName:"act_wgt_k",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0 },
                   {Type:"Float",      Hidden:0,  Width:80,   Align:"Right",   ColMerge:0,   SaveName:"act_wgt_l",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0 },
                   {Type:"Text",      Hidden:1, Width:30,   Align:"Right",   ColMerge:0,   SaveName:"cgo_meas_m" },
                   {Type:"Text",      Hidden:1, Width:30,   Align:"Right",   ColMerge:0,   SaveName:"cgo_meas_f" },
                   {Type:"Text",      Hidden:0,  Width:70,   Align:"Left",    ColMerge:0,   SaveName:"iss_dt_tm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0 },
                   {Type:"Text",      Hidden:0,  Width:90,   Align:"Center",  ColMerge:0,   SaveName:"iss_usrid",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0 },
                   {Type:"Text",      Hidden:0,  Width:90,   Align:"Center",  ColMerge:0,   SaveName:"ofc_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0 },
                   {Type:"Text",      Hidden:0,  Width:90,   Align:"Center",  ColMerge:0,   SaveName:"org_rout_dt_tm",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0 },
                   {Type:"Text",      Hidden:0,  Width:90,   Align:"Center",  ColMerge:0,   SaveName:"org2_rout_dt_tm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0 },
                   {Type:"Text",      Hidden:0,  Width:100,   Align:"Left",    ColMerge:0,   SaveName:"rmk",                KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0 },
                   {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:0,   SaveName:"dest_rout_dt_tm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0 },
                   {Type:"Text",      Hidden:0,  Width:90,   Align:"Center",  ColMerge:0,   SaveName:"via_rout_dt_tm",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0 },
                   {Type:"Text",      Hidden:0,  Width:110,  Align:"Left",    ColMerge:0,   SaveName:"via_rout_addr",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0 ,MultiLineText:1, Wrap:1},
                   {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:0,   SaveName:"shpr_trdp_cd" },
                   {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:0,   SaveName:"shpr_trdp_nm" },
                   {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:0,   SaveName:"shpr_trdp_addr" },
                   {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:0,   SaveName:"cnee_trdp_cd" },
                   {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:0,   SaveName:"cnee_trdp_nm" },
                   {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:0,   SaveName:"cnee_trdp_addr" },
                   {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:0,   SaveName:"prnr_trdp_cd" },
                   {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:0,   SaveName:"prnr_trdp_nm" },
                   {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:0,   SaveName:"prnr_trdp_addr" },
                   {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:0,   SaveName:"org2_rout_addr" },
                   {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"Indexing" } ];
             
            	InitColumns(cols);
            	SetEditable(1);
            	SetActionMenu("Column Hidden|*-|Header Setting Save|Header Setting Reset");
                SetSheetHeight(410);
//                SetColProperty('ofc_cd', {ComboText:tp_nm, ComboCode:tp_cd} );
            	resizeSheet();
			}
        break;
    }
}

function resizeSheet() {
	ComResizeSheet(docObjects[0]);
}

function sheet1_OnSort(sheetObj, col, sortArrow) {
 sheetObj.SetSelectRow(sheetObj.HeaderRows());
}

function sheet1_OnSearchEnd(){
	doDispPaging(docObjects[0].GetCellValue(1, "Indexing"), getObj('pagingTb'));
}
function sheet1_OnDblClick(sheetObj, row, col){
	var paramStr="./SAL_TPM_0070.clt?f_cmd=2&f_wo_no="+sheetObj.GetCellValue(row, "wo_no");
    parent.mkNewFrame('Pre-Pickup Order Entry', paramStr, "SAL_TPM_0070_SHEET_" + sheetObj.GetCellValue(row, "wo_no"));
}
function goToPage(callPage){
	docObjects[0].RemoveAll();
	document.frm1.f_CurPage.value=callPage;
	doWork('SEARCHLIST', '');
}
function viewCntChg(){
	document.frm1.f_CurPage.value=1;
	doWork('SEARCHLIST');
}
function searchList(){
	document.frm1.f_CurPage.value=1;
	doWork('SEARCHLIST');
}
function copyPckQty(){
	frm1.to_pck_qty.value=frm1.fm_pck_qty.value;
}
function copyGrsWgt(){
	// 소숫점 포함 11자리 이어야 한다 (Prec:8,Scale:2)
	if(!checkNumerLength(frm1.fm_grs_wgt.value,8,2)){
		alert(getLabel('FMS_COM_ALT007'));
		frm1.fm_grs_wgt.focus();
		return;
	}
	frm1.to_grs_wgt.value=frm1.fm_grs_wgt.value;
}
// TODO 공통으로 빼야한다 
function checkNumerLength(num,beforPoint,afterPoint) {
	var val1="";
	var val2="";
	if (num.indexOf('.')!=-1) {
		var1=num.substring(0,num.indexOf('.'));
		var2=num.substring(num,num.indexOf('.')+1);
	} else {
		val1=num;
	}
	if (val1.length > beforPoint || val2.length > afterPoint) {
		return false;
	}
	return true;
}
function getPageURL() {
	return document.getElementById("pageurl").value;
}
function entSearch(){
	if(event.keyCode == 13){
		if (validateInputValue()) {
			document.frm1.f_CurPage.value='';
			doWork('SEARCHLIST')
		}
	}
}
function validateInputValue(){
	// 자리수 체크를 한다.
	if(frm1.fm_grs_wgt.value != "") {
		if(!checkNumerLength(frm1.fm_grs_wgt.value,8,2)){
			alert(getLabel('FMS_COM_ALT007'));
			frm1.fm_grs_wgt.focus();
			return false;
		}
	}
	if(frm1.to_grs_wgt.length != "") {
		if(!checkNumerLength(frm1.to_grs_wgt.value,8,2)){
			alert(getLabel('FMS_COM_ALT007'));
			frm1.to_grs_wgt.focus();
			return false;
		}
	}
	// 크기체크를 한다.
	if (frm1.fm_pck_qty.value != "" && frm1.to_pck_qty.value != "") {
		if (Number(frm1.fm_pck_qty.value) > Number(frm1.to_pck_qty.value)) {
			alert(getLabel('FMS_COM_ALT007'));
			frm1.fm_pck_qty.focus();
			return false;
		}
	}
	if (frm1.fm_grs_wgt.value != "" && frm1.to_grs_wgt.value != "") {
		if (Number(frm1.fm_grs_wgt.value) > Number(frm1.to_grs_wgt.value)) {
			alert(getLabel('FMS_COM_ALT007'));
			frm1.fm_grs_wgt.focus();
			return false;
		}
	}
	return true;
}
function sheet1_OnSelectMenu(sheetObj, MenuString){
	var formObj=document.frm1;
	 switch(MenuString){
	 	// 사용자에 의해 변경된 Header 순서 및 사이즈를 저장한다.
		case "Header Setting Save":
			IBS_SaveGridSetting(formObj.user_id.value, getPageURL(), sheetObj);
		break;
		// Header Setting Reset
		case "Header Setting Reset":
			IBS_DelGridSetting(formObj.user_id.value, getPageURL(), sheetObj);
		break;
		// 선택된 Column Hidden
		case "Column Hidden":
			var col=sheetObj.MouseCol();
			if(sheetObj.ColSaveName(col)==""){
				alert(CM_MSG6);
				return false;
			}
			sheetObj.SetColHidden(col, 1);
			sheetObj.SetColWidth(col, 1);
		break;
	 }
}

function clearAll(){
	//docObjects[0].RemoveAll();
	var collTxt=document.getElementsByTagName("INPUT");   // document 상의 모든 INPUT 태그 요소들을 컬렉션으로 구하고...
	for(var i=0; i<collTxt.length; i++){
		if(collTxt[i].type == "text"){
			collTxt[i].value="";
		}           
	}	
	var formObj=document.frm1;
	setOfficeAllOption(formObj.f_ofc_cd);
}
/*
function codeNameAction(str, obj, tmp){
	
	var formObj=document.frm1;
	
	var s_code=obj.value.toUpperCase();
	
	if(s_code == ""){
		if(str == "partner_trsp"){
			formObj.trsp_trdp_cd.value = "";
			formObj.trsp_trdp_nm.value = "";
		}else if(str == "partner_pickup"){
			formObj.org_rout_trdp_cd.value = "";
			formObj.org_rout_trdp_nm.value = "";
		}
	}
}
*/