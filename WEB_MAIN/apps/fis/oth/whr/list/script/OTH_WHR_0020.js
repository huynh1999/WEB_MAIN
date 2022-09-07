//=========================================================
//*@FileName   : OTH_WHR_0020.jsp
//*@FileTitle  : Other Sales List
//*@Description: Other Sales List
//*@author     : Jung,Byung-Chul - Cyberlogitec
//*@version    : 1.0 - 10/20/2011
//*@since      : 10/20/2011
//
//*@Change history:
//*@author     : Tuan.Chau
//*@version    : 2.0 - 2014/06/18
//*@since      : 2014/06/18
//=========================================================
var rtnary=new Array(1);
var callBackFunc = "";
function doWork(srcName) {
	// 탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
	var sheetObj=docObjects[0];
	var formObj=document.frm1;
	switch (srcName) {
	case "SEARCHLIST":
		if(!formValidation()) return;
		// sheetObj.ShowDebugMsg = true;
		if(!searchValid()) return;
		formObj.f_cmd.value=SEARCHLIST;
		// 검증로직
		sheetObj.DoSearch("OTH_WHR_0020GS.clt", FormQueryString(formObj) );
		break;
   	case "NEW":
   	   	var paramStr="./OTH_WHR_0010.clt?f_cmd=-1";
   	   	parent.mkNewFrame('Warehouse Receipt Entry', paramStr);
	break;   
	case "DELETE": // 삭제
		frm1.f_cmd.value=REMOVE;
		if (confirm(getLabel('FMS_COM_CFMDEL'))){
			sheetObj.DoSave("OTH_WHR_0020GS.clt", FormQueryString(formObj),	"ibflag", false);
		}
		break;
	case 'PRINT':
		// /////////////////////////////////////////////////////////
		// 프린트
		var formObj=document.frm1;
		formObj.file_name.value='warehouse_receipt_detail.mrd';
		formObj.title.value='Warehouse Receipt';
		var chkCnt=0;
		for ( var i=1; i <= sheetObj.LastRow(); i++) {
			if (sheetObj.GetCellValue(i, "check_flag") == "1") {
				chkCnt += 1;
			}
		}
		if (chkCnt == 1) {
			var f_wh_recp_no="";
			for ( var i=1; i <= sheetObj.LastRow(); i++) {
				if (sheetObj.GetCellValue(i, "check_flag") == "1") {
					f_wh_recp_no=sheetObj.GetCellValue(i, "wh_recp_no");
					break;
				}
			}
			// Parameter Setting
			var param='';
			param += '[' + f_wh_recp_no + ']'; // $1
			param += '[' + formObj.f_ofc_cd.value + ']';
			param += '[' + formObj.f_ofc_nm.value + ']';
			param += '[' + usrPhn + ']';
			param += '[' + usrFax + ']';
			param += '[' + usrEml + ']';
			formObj.rd_param.value=param;
			popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
		} else if (chkCnt == 0) {
			//alert("Please select the row to print. ");
			alert(getLabel('FMS_COM_ALT004'));	
			return;
		} else {
			//alert("Please select 1 row. ");
			alert(getLabel('FMS_COM_ALT003'));	
			return;
		}
		break;
	//#5541 [Impex] Report Customization Warehouse Receipt Label
	case 'LABEL':
		// /////////////////////////////////////////////////////////
		// 프린트
		var formObj=document.frm1;
		
		formObj.file_name.value='warehouse_receipt_label.mrd';
		formObj.title.value='Warehouse Label';
		var chkCnt=0;
		for ( var i=1; i <= sheetObj.LastRow(); i++) {
			if (sheetObj.GetCellValue(i, "check_flag") == "1") {
				chkCnt += 1;
			}
		}
		if (chkCnt == 1) {
			var f_wh_recp_no="";
			for ( var i=1; i <= sheetObj.LastRow(); i++) {
				if (sheetObj.GetCellValue(i, "check_flag") == "1") {
					f_wh_recp_no=sheetObj.GetCellValue(i, "wh_recp_no");
					
					
					break;
				}
			}
			
			//check item
			if(!checkWhrItm(f_wh_recp_no)){
				return;
			}
			// Parameter Setting
			var param='';
			param += '[' + f_wh_recp_no + ']'; // $1
			param += '[' + formObj.f_ofc_cd.value + ']';
			param += '[' + formObj.f_ofc_nm.value + ']';
			param += '[' + usrPhn + ']';
			param += '[' + usrFax + ']';
			param += '[' + usrEml + ']';
			formObj.rd_param.value=param;
			popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
		} else if (chkCnt == 0) {
			//alert("Please select the row to print. ");
			alert(getLabel('FMS_COM_ALT004'));	
			return;
		} else {
			//alert("Please select 1 row. ");
			alert(getLabel('FMS_COM_ALT003'));	
			return;
		}
		break;
//		[#5547] [Impex] Copy Warehouse Receipt List
		case 'COPY':	
		var formObj=document.frm1;
		var chkCnt=0;
		for ( var i=1; i <= sheetObj.LastRow(); i++) {
			if (sheetObj.GetCellValue(i, "check_flag") == "1") {
				chkCnt += 1;
			}
		}
		if (chkCnt == 1) {
			var f_wh_recp_no="";
			for ( var i=1; i <= sheetObj.LastRow(); i++) {
				if (sheetObj.GetCellValue(i, "check_flag") == "1") {
					f_wh_recp_no=sheetObj.GetCellValue(i, "wh_recp_no");
					break;
				}
			}
			var paramStr="./OTH_WHR_0010.clt?f_cmd="+ COMMAND01 +"&s_wh_recp_no="+f_wh_recp_no;
		   	    parent.mkNewFrame('WH Receipt Entry', paramStr);
		} else if (chkCnt == 0) {
			//alert("Please select the row to print. ");
			alert(getLabel('FMS_COM_ALT004'));	
			return;
		} else {
			//alert("Please select 1 row. ");
			alert(getLabel('FMS_COM_ALT003'));	
			return;
		}
		 	break;
		// OFVFOUR-7351 [UTS CARGO] ADDING COLUMN AND TOTAL TO WH RECEIPT ENTRY AND LIST SCREEN
		case "EXCEL":
	   	 	if(docObjects[0].RowCount() < 1){//no data	
	   			ComShowCodeMessage("COM132501");
	   		}else{
	   	 		docObjects[0].Down2Excel( {DownCols: makeHiddenSkipCol(docObjects[0]), SheetDesign:1,Merge:1 });
	   		}
   	 		break;
		case "EXCEL_ALL":
        	excelDown(sheetObj);
	     break;
	}
}
var CODETYPE='';
/**
 * code name select
 */
function codeNameAction(str, obj, tmp){
	var formObj=document.frm1;
	// obj가 form or sheet에서 온걸 구분해서 value결정.
	if(obj == '[object]' || obj =='[object HTMLInputElement]'){
		var s_code=obj.value.toUpperCase();
	}else{
		var s_code=obj;
	}
	var s_type="";
	if ( s_code != "" ) {
		if ( tmp == "onKeyDown" ) {
			if (event.keyCode == 13){
				CODETYPE=str;		
				var sub_str=str.substring(0,8);
				if(sub_str=="Location"){
					s_type=sub_str;
				}else if(sub_str=="trdpCode"){
					s_type=sub_str;
				}else{
					s_type=str;
				}
				ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
			}
		} else if ( tmp == "onBlur" ) {
			if ( s_code != "" ) {
				CODETYPE=str;		
				var sub_str=str.substring(0,8);
				if(sub_str=="Location"){
					s_type=sub_str;
				}else if(sub_str=="trdpCode"){
					s_type=sub_str;
				}else{
					s_type=str;
				}
				ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
			}
		}
	}else{
		if(obj.name == "f_wh_cd"){
			formObj.f_wh_nm.value="";
		}else if(obj.name == "f_shpr_cd"){
			formObj.f_shpr_nm.value="";
		}else if(obj.name == "f_maker_cd"){
			formObj.f_maker_nm.value="";
		}else if(obj.name == "f_cnee_cd"){
			formObj.f_cnee_nm.value="";
		}else if (CODETYPE == "usergs") {
			formObj.f_op_useid.value="";// trdp_cd AS param1
			formObj.f_op_usenm.value="";// eng_nm AS param2
		}
	}
}
//코드표시 Ajax
function dispCodeNameAjaxReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	var sheetObj1=docObjects[1];
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split(';');
			var masterVals=rtnArr[0].split('@@^');	
			if(CODETYPE == "trdpCode_maker"){
				formObj.f_maker_cd.value=masterVals[0]; 
				formObj.f_maker_nm.value=masterVals[3];//loc_nm
			}
			if(CODETYPE == "trdpCode_shipper"){
				formObj.f_shpr_cd.value=masterVals[0]; 
				formObj.f_shpr_nm.value=masterVals[3];//loc_nm
			}
			if(CODETYPE == "trdpCode_consignee"){
				formObj.f_cnee_cd.value=masterVals[0]; 
				formObj.f_cnee_nm.value=masterVals[3];//loc_nm
			}
			if(CODETYPE == "trdpCode_warehouse"){
				formObj.f_wh_cd.value=masterVals[0]; 
				formObj.f_wh_nm.value=masterVals[3];//loc_nm
			}
			if (CODETYPE == "usergs") {
				formObj.f_op_useid.value=masterVals[0];// trdp_cd AS param1
				formObj.f_op_usenm.value=masterVals[3];// eng_nm AS param2
			}
		}else{
			if(CODETYPE == "trdpCode_maker"){
				formObj.f_maker_cd.value=""; 
				formObj.f_maker_nm.value="";
			}
			if(CODETYPE == "trdpCode_shipper"){
				formObj.f_shpr_cd.value=""; 
				formObj.f_shpr_nm.value="";
			}
			if(CODETYPE == "trdpCode_consignee"){
				formObj.f_cnee_cd.value=""; 
				formObj.f_cnee_nm.value="";
			}
			if(CODETYPE == "trdpCode_warehouse"){
				formObj.f_wh_cd.value=""; 
				formObj.f_wh_nm.value="";//loc_nm
			}
			if (CODETYPE == "usergs") {
				formObj.f_op_useid.value="";// trdp_cd AS param1
				formObj.f_op_usenm.value="";// eng_nm AS param2
			}
		}
	}else{
		//Error occurred!
		alert(getLabel('FMS_COM_ERR001'));	
	}
}
function sheet1_OnDblClick(sheetObj,Row,Col){
	var formObj=document.frm1;
   	doProcess=true;
   	var paramStr="";
   	paramStr += "./OTH_WHR_0010.clt?f_cmd="+SEARCH;
   	paramStr += "&s_wh_recp_no=" + sheetObj.GetCellValue(Row,"wh_recp_no");
   	paramStr += "&s_rgst_ofc_cd=" + sheetObj.GetCellValue(Row,"rgst_ofc_cd");
   	parent.mkNewFrame('Warehouse Receipt Entry', paramStr, "OTH_WHR_0010_SHEET_" + sheetObj.GetCellValue(Row,"wh_recp_no") + "_" + sheetObj.GetCellValue(Row,"rgst_ofc_cd"));
}
function sheet1_OnClick(sheetObj,Row,Col){
	var formObj=document.frm1;
	var colStr=sheetObj.ColSaveName(Col);
	if(colStr=='bl_no'){
		if(docObjects[0].GetCellValue(Row, "bl_no") != ""){
			searchBlCmmInfo(docObjects[0].GetCellValue(Row, "bl_no"));
			if(frm1.f_intg_bl_seq.value == ""){
				alert(getLabel('FMS_COM_ALT010'));
				return;
			}
			var formObj=document.frm1;
			var paramStr="";
			var titleStr="Booking & HB/L Entry";
			if(frm1.f_air_sea_clss_cd.value == "S" && frm1.f_bnd_clss_cd.value =="O"){	//Ocean Export
				paramStr="./SEE_BMD_0020.clt?f_cmd="+SEARCHLIST+"&f_bl_no="+docObjects[0].GetCellValue(Row, "bl_no")+"&f_intg_bl_seq="+frm1.f_intg_bl_seq.value;
			}else if(frm1.f_air_sea_clss_cd.value == "S" && frm1.f_bnd_clss_cd.value =="I"){	//Ocean Import
				paramStr="./SEI_BMD_0020.clt?f_cmd="+SEARCHLIST+"&f_bl_no="+docObjects[0].GetCellValue(Row, "bl_no")+"&f_intg_bl_seq="+frm1.f_intg_bl_seq.value;
			}else if(frm1.f_air_sea_clss_cd.value == "A" && frm1.f_bnd_clss_cd.value =="O"){	//Air Export
				titleStr="Booking & House AWB Entry";
				paramStr="./AIE_BMD_0020.clt?f_cmd="+SEARCHLIST+"&f_bkg_no=&f_intg_bl_seq="+frm1.f_intg_bl_seq.value + "&f_bl_no="+docObjects[0].GetCellValue(Row, "bl_no");
			}else if(frm1.f_air_sea_clss_cd.value == "A" && frm1.f_bnd_clss_cd.value =="I"){	//Air Import
				titleStr="Booking & House AWB Entry";
				paramStr="./AII_BMD_0020.clt?f_cmd="+SEARCHLIST+"&f_bkg_no=&f_intg_bl_seq="+frm1.f_intg_bl_seq.value + "&f_bl_no="+docObjects[0].GetCellValue(Row, "bl_no");
			}
			parent.mkNewFrame(titleStr, paramStr);
		}
	}
}
function searchBlCmmInfo(blNo){
	if(blNo != ""){
		ajaxSendPost(getBlCmmInfo, 'reqVal', '&goWhere=aj&bcKey=getBlCmmInfo&s_bl_no='+blNo, './GateServlet.gsl');
	}
}
/**
 * AJAX RETURN
 * BL_INFO를 가져온다.
 */
function getBlCmmInfo(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != "null" && rtnArr[0] != ""){
				frm1.f_intg_bl_seq.value=rtnArr[0];
				frm1.f_biz_clss_cd.value=rtnArr[2];
				frm1.f_air_sea_clss_cd.value=rtnArr[3];
				frm1.f_bnd_clss_cd.value=rtnArr[4];
				//doWork("DEFAULT");
			}else{
				//frm1.f_intg_bl_seq.value  		= "";
				//frm1.f_bl_no.value				= "";
				//frm1.f_biz_clss_cd.value  		= "";
				//frm1.f_air_sea_clss_cd.value  	= "";
				//frm1.f_bnd_clss_cd.value  		= "";
			}
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}
/**
 * 달력 POPUP
 * @param doWhat
 * @param frm1
 * @return
*/
function doDisplay(doWhat, frm1){
	var formObj=document.frm1;
    switch(doWhat){
        case 'REPT_DATE':   //달력 조회 From ~ To 팝업 호출 
        	var cal = new ComCalendarFromTo();
        	cal.select(formObj.f_rept_fmdt,formObj.f_rept_todt, 'MM-dd-yyyy');
        break;
        case 'MAKER_POPLIST':
        	rtnary=new Array(1);
    		rtnary[0]="1";
    		rtnary[1]="";
    		rtnary[2]=window;
    		var cstmTpCd='';
    		
    		callBackFunc = "MAKER_POPLIST";
    		modal_center_open('./CMM_POP_0010.clt?callTp=' + cstmTpCd, rtnary, 1150,650,"yes");
        break;
        case 'MAKER_POPLIST_NAME':
        	rtnary=new Array(1);
    		rtnary[0]="1";
    		rtnary[1]=formObj.f_maker_nm.value;
    		rtnary[2]=window;
    		var cstmTpCd='';
    		
    		callBackFunc = "MAKER_POPLIST";
    		modal_center_open('./CMM_POP_0010.clt?callTp=' + cstmTpCd, rtnary, 1150,650,"yes");
        break;
        
        case 'SHIPPER_POPLIST':
        	rtnary=new Array(1);
        	rtnary[0]="1";
        	rtnary[1]="";
        	rtnary[2]=window;
        	//var cstmTpCd = 'CS';
        	var cstmTpCd='';
        	
        	callBackFunc = "SHIPPER_POPLIST";
        	modal_center_open('./CMM_POP_0010.clt?callTp=' + cstmTpCd, rtnary, 1150,650,"yes");
        	break;
        case 'SHIPPER_POPLIST_NAME':
        	rtnary=new Array(1);
        	rtnary[0]="1";
        	rtnary[1]=formObj.f_shpr_nm.value;
        	rtnary[2]=window;
        	//var cstmTpCd = 'CS';
        	var cstmTpCd='';
        	
        	callBackFunc = "SHIPPER_POPLIST";
        	modal_center_open('./CMM_POP_0010.clt?callTp=' + cstmTpCd, rtnary, 1150,650,"yes");
        	break;
        	
        case 'CONSIGNEE_POPLIST_NAME':
        	rtnary=new Array(1);
        	rtnary[0]="1";
        	rtnary[1]=formObj.f_cnee_nm.value;
        	rtnary[2]=window;
        	var cstmTpCd='';
        	callBackFunc = "CONSIGNEE_POPLIST";
        	modal_center_open('./CMM_POP_0010.clt?callTp=' + cstmTpCd, rtnary, 1150,650,"yes");
        break;
        case 'CONSIGNEE_POPLIST':
        	rtnary=new Array(1);
        	rtnary[0]="1";
        	rtnary[1]="";
        	rtnary[2]=window;
        	var cstmTpCd='';
        	callBackFunc = "CONSIGNEE_POPLIST";
        	modal_center_open('./CMM_POP_0010.clt?callTp=' + cstmTpCd, rtnary, 1150,650,"yes");
        break;
       	case "SHIP_TRDP_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
   	 		rtnary=new Array(1);
   	 		rtnary[0]="1";
   	 		// 2011.12.27 value parameter
	   		if(typeof(formObj.f_shpr_nm.value)!='undefined'){
	   			rtnary[1]=formObj.f_shpr_nm.value;
	   		}
	   		else{
	   			rtnary[1]="";
	   		}
	   		rtnary[2]=window;
   	 		var rtnVal =  ComOpenWindow('./CMM_POP_0010.clt',  rtnary,  "scroll:yes;status:no;help:no;dialogWidth:1150px;dialogHeight:650px" , true);
   	 		if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
   	 			return;
   	 		}
   	 		else{
   	 			var rtnValAry=rtnVal.split("|");
   	 			formObj.f_shpr_cd.value=rtnValAry[0];//
   	 			formObj.f_shpr_nm.value=rtnValAry[2];//full_nm
   	 		}             
	   	 break;
		case "CNEE_TRDP_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
   	 		rtnary=new Array(1);
   	 		rtnary[0]="1";
   	 		// 2011.12.27 value parameter
	   		if(typeof(formObj.f_cnee_nm.value)!='undefined'){
	   			rtnary[1]=formObj.f_cnee_nm.value;
	   		}
	   		else{
	   			rtnary[1]="";
	   		}
	   		rtnary[2]=window;
   	 		var rtnVal =  ComOpenWindow('./CMM_POP_0010.clt',  rtnary,  "scroll:yes;status:no;help:no;dialogWidth:1150px;dialogHeight:650px" , true);
   	 		if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
   	 			return;
   	 		}
   	 		else{
   	 			var rtnValAry=rtnVal.split("|");
   	 			formObj.f_cnee_cd.value=rtnValAry[0];//
   	 			formObj.f_cnee_nm.value=rtnValAry[2];//full_nm
   	 		}
   	 	break;   	 		
		case "MAKER_TRDP_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
   	 		rtnary=new Array(1);
   	 		rtnary[0]="1";
   	 		// 2011.12.27 value parameter
	   		if(typeof(formObj.f_maker_nm.value)!='undefined'){
	   			rtnary[1]=formObj.f_maker_nm.value;
	   		}
	   		else{
	   			rtnary[1]="";
	   		}
	   		rtnary[2]=window;
   	 		var rtnVal =  ComOpenWindow('./CMM_POP_0010.clt',  rtnary,  "scroll:yes;status:no;help:no;dialogWidth:1150px;dialogHeight:650px" , true);
   	 		if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
   	 			return;
   	 		}
   	 		else{
   	 			var rtnValAry=rtnVal.split("|");
   	 			formObj.f_maker_cd.value=rtnValAry[0];//
   	 			formObj.f_maker_nm.value=rtnValAry[2];//full_nm
   	 		}
   	 	break;   	 	   	 		
//		case "SHIP_TRDP_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
//	 		var rtnary=new Array(1);
//	 		rtnary[0]="1";
//	 		// 2011.12.27 value parameter
//	   		if(typeof(formObj.f_shpr_nm.value)!='undefined'){
//	   			rtnary[1]=formObj.f_shpr_nm.value;
//	   		}
//	   		else{
//	   			rtnary[1]="";
//	   		}
//	   		rtnary[2]=window;
//	 		var rtnVal =  ComOpenWindow('./CMM_POP_0010.clt',  rtnary,  "scroll:yes;status:no;help:no;dialogWidth:1150px;dialogHeight:650px" , true);
//	 		if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
//	 			return;
//	 		}
//	 		else{
//	 			var rtnValAry=rtnVal.split("|");
//	 			formObj.f_shpr_cd.value=rtnValAry[0];//
//	 			formObj.f_shpr_nm.value=rtnValAry[2];//full_nm
//	 		}             
//	 	break; 	
		case "WH_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
	 		rtnary=new Array(1);
	 		rtnary[0]="1";
	   		rtnary[1]="";
	   		rtnary[2]=window;
	   		
	   		callBackFunc = "WH_POPLIST";
	   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
	 	break;
		case "WH_POPLIST_NAME"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
	 		rtnary=new Array(1);
	 		rtnary[0]="1";
	   		rtnary[1]=formObj.f_wh_nm.value;
	   		rtnary[2]=window;
	   		
	   		callBackFunc = "WH_POPLIST";
	   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
	 	break;
	 	
		case "WH_POPLIST_NAME"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
	 		rtnary=new Array(1);
	 		rtnary[0]="1";
	   		if(typeof(formObj.f_wh_nm.value)!='undefined'){
	   			rtnary[1]=formObj.f_wh_nm.value;
	   		}
	   		else{
	   			rtnary[1]="";
	   		}
	   		rtnary[2]=window;
	   		
	   		callBackFunc = "WH_POPLIST";
	   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
	 	break;
		case "USER_POPLIST":
	      	rtnary=new Array(1);
	   		rtnary[0]="1";
	   		callBackFunc = "USER_POPLIST";
	   		modal_center_open('./CMM_POP_0060.clt', rtnary, 556,450,"yes");
		break;
		case "USER_POPLIST_NAME":
	      	rtnary=new Array(1);
	   		rtnary[0]="1";
	   		if(typeof(formObj.f_op_usenm.value)!='undefined'){
	   			rtnary[1]=formObj.f_op_usenm.value;
	   		}
	   		else{
	   			rtnary[1]="";
	   		}
	   		callBackFunc = "USER_POPLIST";
	   		modal_center_open('./CMM_POP_0060.clt', rtnary, 556,450,"yes");
		break;
    }
}

function CONSIGNEE_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	} else {
		var rtnValAry=rtnVal.split("|");
		formObj.f_cnee_cd.value=rtnValAry[0];
		formObj.f_cnee_nm.value=rtnValAry[2];// loc_nm
	}
}

function MAKER_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	} else {
		var rtnValAry=rtnVal.split("|");
		formObj.f_maker_cd.value=rtnValAry[0];
		formObj.f_maker_nm.value=rtnValAry[2];// loc_nm
	}
}

function SHIPPER_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	} else {
		var rtnValAry=rtnVal.split("|");
		formObj.f_shpr_cd.value=rtnValAry[0];
		formObj.f_shpr_nm.value=rtnValAry[2];// loc_nm
	}
}

function WH_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}
	else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_wh_cd.value=rtnValAry[0];//
		formObj.f_wh_nm.value=rtnValAry[2];//full_nm
	}
}

//#5541 [Impex] Report Customization Warehouse Receipt Label
function checkWhrItm(wh_recp_no) {
	
	if (wh_recp_no != "") {
		ajaxSendPost(checkItmReq, 'reqVal', '&goWhere=aj&bcKey=searchWhrItmChk&wh_recp_no='+wh_recp_no, './GateServlet.gsl');
		
		if (!hasItm) {
			alert(getLabel('FMS_COM_ALT010'));
		}
		
		return hasItm;
	} else {
		return true;
	}
}

var hasItm = false;

function checkItmReq(reqVal){
	var doc = getAjaxMsgXML(reqVal);
	
	if(doc[0]=='OK'){
		if(doc[1]=='Y'){
			hasItm = true;
		}
		else{
			hasItm = false;
		}
	}
}
//--------------------------------------------------------------------------------------------------------------
//IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
var docObjects=new Array();
var sheetCnt=0;
var obl_decimal_len = 0;
/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
function loadPage() {
	
	var formObj=document.frm1;
	// OFVFOUR-7351 [UTS CARGO] ADDING COLUMN AND TOTAL TO WH RECEIPT ENTRY AND LIST SCREEN
	var opt_key = "OBL_DECIMAL_LEN";
	ajaxSendPost(setDecimalLen, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	
    //LHK, 20141029 #44986 [BINEX]Office - All Option
    setOfficeAllOption(formObj.f_rgst_ofc_cd);

    for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
    //doWork('SEARCHLIST');
    //사용자가 저장한 Header 정보를 읽어온다.
	
	setFromToDtEndPlus(formObj.f_rept_fmdt, 30, formObj.f_rept_todt, 0);
    IBS_RestoreGridSetting(formObj.user_id.value, getPageURL(), docObjects[0], false, "RestoreGrid");
}
function RestoreGrid() {
	doWork('SEARCHLIST');
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
	           SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1, SortEventMode:1 } );
	
	           var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	           var headers = [ { Text:getLabel('OTH_WHR_0020_HDR1'), Align:"Center"} ];
	           InitHeaders(headers, info);
	
	           var cols = [ {Type:"Status",    Hidden:1, Width:1,    Align:"Center",  ColMerge:1,   SaveName:"ibflag" },
	                  {Type:"CheckBox",  Hidden:0, Width:50,   Align:"Center",  ColMerge:0,   SaveName:"check_flag" },
	                  {Type:"Text",      Hidden:0,  Width:150,  Align:"Center",  ColMerge:1,   SaveName:"wh_recp_no",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                  {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:1,   SaveName:"wh_nm",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                  {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"rgst_ofc_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                  {Type:"Date",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"recp_dt_tm",   KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                  {Type:"Combo",     Hidden:0, Width:100,  Align:"Center",  ColMerge:1,   SaveName:"status",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                  {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"trk_bl_no",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                  {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:"po_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                  {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"bl_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                  {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"maker_nm",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                  {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:1,   SaveName:"shpr_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                  {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:1,   SaveName:"cnee_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                  {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:1,   SaveName:"op_use_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                  {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:1,   SaveName:"rmk",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                  {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",    ColMerge:1,   SaveName:"rgst_usrid",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	               // OFVFOUR-7351 [UTS CARGO] ADDING COLUMN AND TOTAL TO WH RECEIPT ENTRY AND LIST SCREEN
	                  {Type:"Int",       Hidden:0,  Width:40,   Align:"Right",   ColMerge:1,   SaveName:"pck_qty",     KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:7 },
	                  {Type:"Float",     Hidden:0,  Width:75,   Align:"Right",   ColMerge:1,   SaveName:"wgt_k",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:obl_decimal_len,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	                  {Type:"Float",     Hidden:0,  Width:75,   Align:"Right",   ColMerge:1,   SaveName:"wgt_l",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:obl_decimal_len,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 },
	                  {Type:"Float",     Hidden:0,  Width:70,   Align:"Right",   ColMerge:1,   SaveName:"meas",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:0,   InsertEdit:0,   EditLen:17 },
	                  {Type:"Float",     Hidden:0,  Width:110,  Align:"Right",   ColMerge:1,   SaveName:"act_wgt",     KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:obl_decimal_len,   UpdateEdit:0,   InsertEdit:0,   EditLen:18 }];
	            
	           InitColumns(cols);
	           SetEditable(1);
//	           InitViewFormat(0, "recp_dt_tm","MM-dd-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
	           SetActionMenu("Column Hidden|*-|Header Setting Save|Header Setting Reset");
	           SetColProperty("status", {ComboText:WHCD2, ComboCode:WHCD1} );
	           SetSheetHeight(500);
	           resizeSheet();
           }                                                      
           break;
     }
}

function resizeSheet() {
	ComResizeSheet(docObjects[0]);
}

// Set focus 1st Row when sort.
function sheet1_OnSort(sheetObj, col, sortArrow) {
	sheetObj.SetSelectRow(sheetObj.HeaderRows());
}
function getPageURL() {
	return document.getElementById("pageurl").value;
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
function searchValid(){
	var formObj=document.frm1;
	if(trim(formObj.f_rept_fmdt.value) == "" &&
	   trim(formObj.f_rept_todt.value) == "" &&
	   trim(formObj.f_maker_cd.value) == "" &&
	   trim(formObj.f_wh_recp_no.value) == "" &&
	   trim(formObj.f_shpr_cd.value) == "" &&
	   trim(formObj.f_cnee_cd.value) == "" ){
		alert(getLabel('FMS_COM_ALT014'));
		formObj.f_rept_fmdt.focus();
		return false;
	}
	return true;
}
function formValidation(){
	if(!chkSearchCmprPrd(true, frm1.f_rept_fmdt, frm1.f_rept_todt)){
		return;
	}
	return true;
}
//Calendar flag value
var firCalFlag=false;

function entSearch(){
	if(event.keyCode == 13){
		document.frm1.f_CurPage.value='';
		doWork('SEARCHLIST');
	}
}

function USER_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_op_useid.value=rtnValAry[0];
		formObj.f_op_usenm.value=rtnValAry[1];
	}
}
//OFVFOUR-7351 [UTS CARGO] ADDING COLUMN AND TOTAL TO WH RECEIPT ENTRY AND LIST SCREEN
function sheet1_OnSearchEnd(){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	calTot();
}
function calTot() {
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	var pck_qty_tot=0;
	var wgt_k_tot=0;
	var wgt_l_tot=0;
	var meas_tot=0;
	var act_wgt_tot=0;
	for(var i=1; i<=sheetObj.LastRow(); i++){
		pck_qty_tot 	+= Number(sheetObj.GetCellValue(i, "pck_qty"));
		wgt_k_tot 	+= Number(sheetObj.GetCellValue(i, "wgt_k"));
		wgt_l_tot 	+= Number(sheetObj.GetCellValue(i, "wgt_l"));
		meas_tot 	+= Number(sheetObj.GetCellValue(i, "meas"));
		act_wgt_tot 	+= Number(sheetObj.GetCellValue(i, "act_wgt"));
	}
	formObj.f_pck_qty_tot.value=doMoneyFmt(Number(pck_qty_tot.toFixed(0)));
	formObj.f_wgt_k_tot.value=doMoneyFmt(wgt_k_tot.toFixed(obl_decimal_len));
	formObj.f_wgt_l_tot.value=doMoneyFmt(wgt_l_tot.toFixed(obl_decimal_len));
	formObj.f_meas_tot.value=doMoneyFmt(meas_tot.toFixed(3));
	formObj.f_act_wgt_tot.value=doMoneyFmt(act_wgt_tot.toFixed(obl_decimal_len));
}
function setDecimalLen(reqVal){
	var doc=getAjaxMsgXML(reqVal);

	if (doc[0]=="OK" && typeof doc[1] != "undefined" ){
		obl_decimal_len = Number(doc[1]);
	}else{
		obl_decimal_len = 3;
	}
}
function excelDown(mySheet){
	
	var formObj = document.frm1;
	
	if(!formValidation()){
		
		return;
	}
	
	formObj.f_cmd.value = COMMAND10;
	
	
	var formParam = FormQueryString(formObj);
	
	var param = {
					DownCols: makeHiddenSkipCol(mySheet)
					,SheetDesign:1
					,URL:"./OTH_WHR_0020.clt"
					,ExtendParam:formParam
					,ExtendParamMethod:"GET"
				};	
	mySheet.DirectDown2Excel(param);
}