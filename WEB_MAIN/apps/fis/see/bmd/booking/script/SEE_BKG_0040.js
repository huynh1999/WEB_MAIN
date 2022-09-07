/**
=========================================================
*@FileName   : SEE_BKG_0040.js
*@FileTitle  : Carrier Booking / Customer Booking combine
*@Description:
*@author     : 
*@version    : 
*@since      : 
=========================================================
 */
var rtnary=new Array(1);
var formObj = document.frm1;
function initFinish(){
	var pDoc=parent.parent.parent.document;
	hideProcess('WORKING', pDoc);
//	setFromToDtEndPlus(document.frm1.etd_strdt, 180, document.frm1.etd_enddt, 30);
}
function doWork(srcName, valObj){
	if(!btnGetVisible(srcName)){
		return;
	}
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한다.
    var formObj=document.frm1;
    var sheetObj=docObjects[0];
	try {
		switch(srcName) {
    	   	case "SEARCHLIST":
    	   		if(!formValidation()) return;
    	   		//search 조건 추가로 combo box 이용한 추가 조건 set
    	   		//searchValueSet();
    	   		document.getElementById("combineMsg").innerHTML="";
    	   		if(validateForm(sheetObj, formObj, SEARCHLIST, 1)){
			   		formObj.f_cmd.value=SEARCHLIST01;
			   		sheetObj.DoSearch("./SEE_BKG_0040GS.clt", FormQueryString(formObj) );
			    }
			    break;
    	   	case "MODIFY1":

    	   		if(formObj.f_chk_o.checked == true ){
    	   			formObj.chk_origin.value ="Y"
    	   		}else{
    	   			formObj.chk_origin.value ="N";
    	   		}
				formObj.f_cmd.value=MODIFY;
				sheetObj.DoSave("./SEE_BKG_0040GS.clt", FormQueryString(formObj),"ibflag",false);
			    break;			    
    	   		
           	case "POL_LOCATION_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
           		rtnary=new Array(5);
          		rtnary[0]="S";
		   		rtnary[1]="BL";
		   		//2011.12.27 value parameter 
		   		if(typeof(valObj)!='undefined'){
		   			rtnary[2]=valObj;
		   		}
		   		else{
		   			rtnary[2]="";
		   		}
		   		rtnary[3]="";
		   		rtnary[4]=document.getElementById('pol');
		   		callBackFunc = "POL_LOCATION_POPLIST";
	   	        modal_center_open('./CMM_POP_0030.clt', rtnary, 810,480,"yes");
    	        /*var rtnVal=window.showModalDialog('./CMM_POP_0030.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:806px;dialogHeight:480px");*/
    	        break;
			case "POD_LOCATION_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
           		rtnary=new Array(5);
          		rtnary[0]="S";
		   		rtnary[1]="BL";
		   		//2011.12.27 value parameter
		   		if(typeof(valObj)!='undefined'){
		   			rtnary[2]=valObj;
		   		}
		   		else{
		   			rtnary[2]="";
		   		}
		   		rtnary[3]="";
		   		rtnary[4]=document.getElementById('pod');
		   		callBackFunc = "POD_LOCATION_POPLIST";
	   	        modal_center_open('./CMM_POP_0030.clt', rtnary, 810,480,"yes");
//    	        var rtnVal=window.showModalDialog('./CMM_POP_0030.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:806px;dialogHeight:480px");
    	        break;
			case "TRDP_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
		   		rtnary=new Array(1);
		   		rtnary[0]="1";
		   		if(typeof(valObj)!='undefined'){
		   			rtnary[1]=valObj;
		   		}
		   		else{
		   			rtnary[1]="";
		   		}
		   		rtnary[2]=window;
		   		callBackFunc = "TRDP_POPLIST";
	   	        modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
	   	        break;
	   	 	/*case "SHIP_TRDP_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
	   	 		rtnary=new Array(1);
	   	 		rtnary[0]="1";
	   	 		// 2011.12.27 value parameter
		   		if(typeof(valObj)!='undefined'){
		   			rtnary[1]=valObj;
		   		}
		   		else{
		   			rtnary[1]="";
		   		}
		   		rtnary[2]=window;
		   		callBackFunc = "SHIP_TRDP_POPLIST";
	   	        modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
//	   	 		var rtnVal=window.showModalDialog('./CMM_POP_0010.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:1150px;dialogHeight:480px");
	   	 		break;
	   	 	case "CNEE_TRDP_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
	   	 		rtnary=new Array(1);
	   	 		rtnary[0]="1";
	   	 		//2011.12.27 value parameter
		   		if(typeof(valObj)!='undefined'){
		   			rtnary[1]=valObj;
		   		}
		   		else{
		   			rtnary[1]="";
		   		}
		   		rtnary[2]=window;
		   		callBackFunc = "CNEE_TRDP_POPLIST";
	   	        modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
//	   	 		var rtnVal=window.showModalDialog('./CMM_POP_0010.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:1150px;dialogHeight:480px");
	   	 		break;
		   	case "NTFY_TRDP_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
		 		rtnary=new Array(1);
		 		rtnary[0]="1";
		 		//2011.12.27 value parameter
		   		if(typeof(valObj)!='undefined'){
		   			rtnary[1]=valObj;
		   		}
		   		else{
		   			rtnary[1]="";
		   		}
		   		rtnary[2]=window;
		   		callBackFunc = "NTFY_TRDP_POPLIST";
	   	        modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
//		 		var rtnVal=window.showModalDialog('./CMM_POP_0010.clt', rtnary, "scroll:yes;status:no;help:no;dialogWidth:1150px;dialogHeight:480px");
		 		break;*/
	        case "USER_POPLIST"://사용자조회 openMean 1=화면에서 오픈, 2=그리드에서 오픈
				rtnary = new Array(1);
				rtnary[0] = "1";
				//if (typeof (valObj) != 'undefined') {
				//	rtnary[1] = valObj;
				//} else {
				//	rtnary[1] = "";
				//}
	        	callBackFunc = "USER_POPLIST";
	        	modal_center_open('./CMM_POP_0060.clt', rtnary, 556,470,"yes");
	        	break;    	   	 		
	   	} // end switch
	}
	catch(e) {
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
var headerRowCnt=2;
function sheet1_OnClick(sheetObj,Row,Col){
	var formObj=document.frm1;
	
	switch (sheetObj.ColSaveName(Col)) {
	case "check_flag" :
		for(var i=headerRowCnt; i<=sheetObj.LastRow();i++){
			if(i == Row){
				if(sheetObj.GetCellValue(i, "check_flag") == "0"){
					sheetObj.SetCellValue(i, "check_flag","0");
				}else{
					sheetObj.SetCellValue(i, "check_flag","1");
				}
			}else{
				sheetObj.SetCellValue(i, "check_flag","0");
			}
		}
	break;
	}
}
//combine
function combineBkg(){

    var formObj=document.frm1;
    var sheetObj=docObjects[0];
	var chkCnt=0;
	var chkMain="";

	var chk_bkg_seq="";
	var sqlChkSeq="";
	var Row = sheetObj.GetSelectRow();
	var iCheckRow = "";
	var dupRow =0;
	var combineNo="";
	var lnrNo="";
	for(var i=headerRowCnt; i < sheetObj.LastRow() + 1; i++){
	
		if(sheetObj.GetCellValue(i, "bkg_check") == 1){		//checkbox	
			if(sheetObj.GetCellValue(i, "check_flag") == "0"){
				chkMain += "";
				combineNo += "";
				lnrNo +="";
			}else{
				chkMain += sheetObj.GetCellValue(i, 'bkg_seq');
				combineNo += sheetObj.GetCellValue(i, 'bkg_no');
				lnrNo += sheetObj.GetCellValue(i, 'lnr_bkg_no');
			}
			if(chkCnt > 0){
				chk_bkg_seq += ',';
				sqlChkSeq +=',';
			}
			chk_bkg_seq		+= 	sheetObj.GetCellValue(i, 'bkg_seq');
			sqlChkSeq       += 	"'"+sheetObj.GetCellValue(i, 'bkg_seq')+"'";
			chkCnt++;

		}
	}

    //체크박스 선택하지 않은 경우 처리
	if (chkCnt <2){
		alert("check booking !!");
		return false;
	}
	//체크박스 안의 Main이 선택되지 않은 경우 처리
	if (chkMain == ""){
		alert("Please select a main booking from selected bookings.");
		return false;	
	}
	formObj.main_bkg_seq.value = chkMain;
	formObj.chk_bkg_seq.value = sqlChkSeq;
	formObj.combine_no.value = combineNo;
	formObj.lnr_bkg_no.value = lnrNo;
	
    //동일 컬럼 체크
	if(!findDiff()) return;
	doWork('MODIFY1');
	//ajaxSendPost(getBkgCombinChk, 'reqVal', '&goWhere=aj&bcKey=getBkgCombinChk&sqlChkSeq='+sqlChkSeq+"&f_biz_clss_cd="+formObj.f_biz_clss_cd.value, './GateServlet.gsl');
		
}
function findDiff(){
	var formObj=document.frm1;
	var arr_diff =new Array();

	if(formObj.f_biz_clss_cd.value=="M" ){//carrier
		arr_diff =new Array("act_trdp_nm","lnr_trdp_nm","shp_trdp_nm","cne_trdp_nm","etd_dt_tm","eta_dt_tm","trnk_vsl_nm","trnk_voy","por_cd","pol_cd","pod_cd","del_cd","shp_mod_cd","nomi_flg");	
		arr_diffTitle =new Array("Customer","Carrier","Shipper","Consignee","ETD","ETA","VSL","VOY","POR","POL","POD","DEL","Ship Mode","Sales Type");	
	}else{
		arr_diff =new Array("lnr_bkg_no","act_trdp_nm","lnr_trdp_nm","shp_trdp_nm","cne_trdp_nm","etd_dt_tm","eta_dt_tm","trnk_vsl_nm","trnk_voy","por_cd","pol_cd","pod_cd","del_cd","shp_mod_cd","nomi_flg");
		arr_diffTitle =new Array("Carrier Bkg No.","Customer","Carrier","Shipper","Consignee","ETD","ETA","VSL","VOY","POR","POL","POD","DEL","Ship Mode","Sales Type");	
	}
	
	var sheetObj=docObjects[0];
	var sRow = sheetObj.FindCheckedRow("bkg_check");
		
	//받은 결과를 배열로 생성한다.
	var arrRow = sRow.split("|");
	for(var i =0;i<arr_diff.length;i++){
		var v_str ="";
		var dupRow=0;
		for(idx=0; idx<arrRow.length; idx++){ 
		    if (sheetObj.GetCellValue(arrRow[idx], arr_diff[i])!=""){
				if(v_str!=sheetObj.GetCellValue(arrRow[idx], arr_diff[i])) {
					dupRow++;
				}			
				v_str = sheetObj.GetCellValue(arrRow[idx],arr_diff[i]);
		    }
		    if (dupRow>1){
		    	alert("The "+arr_diffTitle[i]+" of selected bookings should be same");
		    	sheetObj.SelectCell(arrRow[idx],arr_diff[i], false);
		    	return false;
		    }
		 }
	}
	return true;
}

function getBkgCombinChk(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var sheetObj=docObjects[0];
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1];
			if (rtnArr =="1"){
				//Combine 처리
				doWork('MODIFY1');

			}else{
				alert("The ETD of selected bookings should be same");
			}
		}else{
			alert("The ETD of selected bookings should be same");
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}
function combineClick(){	

	var formObj=document.frm1;
   	doProcess=true;
   	formObj.f_cmd.value="";
   	var paramStr = "";
   	
   	if(formObj.f_biz_clss_cd.value == "M"){
   		paramStr="./SEE_BMD_0500.clt?f_cmd="+SEARCHLIST+"&f_lnr_bkg_no="+formObj.lnr_bkg_no.value+"&f_bkg_seq="+formObj.main_bkg_seq.value+"&f_bkg_no="+formObj.combine_no.value;
   	   	parent.mkNewFrame('Carrier Booking Entry', paramStr,"SEE_BMD_0500_SHEET_"+formObj.lnr_bkg_no.value+"_"+formObj.main_bkg_seq.value+"_"+formObj.combine_no.value);
   	}else{
   		paramStr="./SEE_BMD_0200.clt?f_cmd="+SEARCHLIST+"&f_bkg_no="+formObj.combine_no.value+"&f_bkg_seq="+formObj.main_bkg_seq.value;
   	   	parent.mkNewFrame('OEH Booking Entry', paramStr,"SEE_BMD_0200_SHEET_"+formObj.combine_no.value+"_"+formObj.main_bkg_seq.value);
   	}
}
function USER_POPLIST(rtnVal){
	var formObj=document.frm1;
    if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		frm1.f_opr_usrid.value=rtnValAry[0];
	}
}

/**
 * 화면에서 사용하는 메소드
 * @param doWhat
 * @param formObj
 * @return
*/
function doDisplay(doWhat, formObj){
    switch(doWhat){
        case 'DATE11':   //달력 조회 From ~ To 팝업 호출 
            var cal=new ComCalendarFromTo();
            cal.displayType="date";
            cal.select(formObj.f_bkg_strdt, formObj.f_bkg_enddt, 'MM-dd-yyyy');
        break;
    }
}
/**
 * Paging 항목 선택시 호출되
 */
function goToPage(callPage){
	document.forms[0].f_CurPage.value=callPage;
	doWork('SEARCHLIST');
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function searchList(){
	doWork('SEARCHLIST');
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
	var formObj=document.frm1;
	var s_ofc_cd=formObj.s_ofc_cd.value;
	if(s_ofc_cd != ""){
		formObj.f_ofc_cd.value=s_ofc_cd;
	}
	//LHK, 20141029 #44986 [BINEX]Office - All Option
	setOfficeAllOption(formObj.f_ofc_cd);
    for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);																																																																												(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
    
    var opt_key = "BKG_EDIT_MODE";
	ajaxSendPost(setBkgEditStsCdVal, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
    
 // 사용자가 저장한 Header 정보를 읽어온다.
    IBS_RestoreGridSetting(formObj.user_id.value, getPageURL(), docObjects[0], false);
    //단축키추가.
    setShortcut();
    initFinish();
    
    /* operation 권한이 없는 경우 */    	   		
	var objDisable = false; 
	if (uod_flg == "N"){ 
		objDisable = true;
		formObj.f_opr_usrid.value=usrId;
		formObj.f_opr_usrid.disabled = objDisable; 
		$("#oprBtn").prop('disabled', objDisable);    	   			
	} 
	
  //  doWork('SEARCHLIST');
}
function setShortcut(){
	/* LHK 20131118 공통으로 처리
	shortcut.add("Alt+4",function() {
		doWork('PROFIT_REPORT');
	});
	*/
	shortcut.add("Alt+G",function() {
		sheet1_OnDblClick(docObjects[0], docObjects[0].GetSelectRow(), 1);
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
	            var headers = [ { Text:getLabel('SEE_BKG_0040_HDR1'), Align:"Center"},
	        	                   { Text:getLabel('SEE_BKG_0040_HDR2'), Align:"Center"}  ];
	            InitHeaders(headers, info);
	
	            var cols = [
	                         {Type:"CheckBox",  Hidden:0, Width:45,   Align:"Center",   ColMerge:1,   SaveName:"bkg_check",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	                         {Type:"Radio",     Hidden:0, Width:40,   Align:"Center",   ColMerge:1,   SaveName:"check_flag",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	                         {Type:"Seq",     	Hidden:0,  Width:40,   Align:"Center",  ColMerge:0,   SaveName:"no",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                         {Type:"Combo",     Hidden:0,  Width:110,  Align:"Left",    ColMerge:0,   SaveName:"biz_clss_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                         
	                         {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"bkg_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                         {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"lnr_bkg_no",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                         {Type:"Combo",     Hidden:0,  Width:130,  Align:"Center",  ColMerge:0,   SaveName:"bkg_sts_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                         
	                         {Type:"Date",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"bkg_dt_tm",     KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                         {Type:"Text",      Hidden:1,  Width:0,    Align:"Center",  ColMerge:1,   SaveName:"act_trdp_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	     	                 {Type:"Text",      Hidden:0,  Width:140,  Align:"Left",    ColMerge:1,   SaveName:"act_trdp_nm",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	     	                 {Type:"Text",      Hidden:1,  Width:0,    Align:"Center",  ColMerge:0,   SaveName:"lnr_trdp_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                         {Type:"Text",      Hidden:0,  Width:140,  Align:"Left",    ColMerge:0,   SaveName:"lnr_trdp_nm",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                         {Type:"Text",      Hidden:1,  Width:0,    Align:"Center",  ColMerge:0,   SaveName:"shp_trdp_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                         {Type:"Text",      Hidden:0,  Width:140,  Align:"Left",    ColMerge:0,   SaveName:"shp_trdp_nm",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                         {Type:"Text",      Hidden:1,  Width:0,    Align:"Center",  ColMerge:0,   SaveName:"cne_trdp_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                         {Type:"Text",      Hidden:0,  Width:140,  Align:"Left",    ColMerge:0,   SaveName:"cne_trdp_nm",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                         {Type:"Date",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"etd_dt_tm",     KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                         {Type:"Date",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"eta_dt_tm",     KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                         {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"trnk_vsl_nm",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                         {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"trnk_voy",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                         
	                         {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"por_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                         {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"por_nm",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                         {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"pol_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                         {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"pol_nm",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                         {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"pod_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                         {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"pod_nm",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                         {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"del_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                         {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"del_nm",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                         {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"shp_mod_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                         {Type:"Combo",     Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"nomi_flg",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                         {Type:"Float",     Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"cntr_qty",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                         {Type:"Float",     Hidden:0,  Width:120,  Align:"Right",   ColMerge:0,   SaveName:"pck_qty",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
	     	                 {Type:"Float",     Hidden:1,  Width:120,  Align:"Right",   ColMerge:0,   SaveName:"pck_ut_cd",     KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
	     	                 {Type:"Text",      Hidden:0,  Width:120,  Align:"Right",   ColMerge:0,   SaveName:"pck_ut_nm",     KeyField:0,   CalcLogic:"",   Format:"",       		PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	     	                 {Type:"Float",     Hidden:0,  Width:120,  Align:"Right",   ColMerge:0,   SaveName:"grs_wgt",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
	     	                 {Type:"Float",     Hidden:0,  Width:120,  Align:"Right",   ColMerge:0,   SaveName:"grs_wgt1",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
	     	                 {Type:"Float",     Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"meas",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:0,   InsertEdit:0 },
	     	                 {Type:"Float",     Hidden:0,  Width:120,  Align:"Right",   ColMerge:0,   SaveName:"meas1",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:0,   InsertEdit:0 },
	     	         	     	                
	                         {Type:"Text",      Hidden:1,  Width:80,   Align:"Center",  ColMerge:0,   SaveName:"bkg_seq",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                         {Type:"Status",    Hidden:1, Width:40,   Align:"Center",  ColMerge:1,  SaveName:"ibflag",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	                         {Type:"Text",      Hidden:1,  Width:80,   Align:"Center",  ColMerge:0,   SaveName:"origin_bkg_seq",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                         ];
	             
	            InitColumns(cols);
	
	            SetEditable(1);
	            
	            SetColProperty("bkg_sts_cd", {ComboText:BKGSTSNM, ComboCode:BKGSTSCD} );
	            SetColProperty("nomi_flg", {ComboText:BKGNOMINM, ComboCode:BKGNOMICD} );
	            SetColProperty("biz_clss_cd", {ComboText:'Carrier Booking|Customer Booking', ComboCode:'M|H'} );
	            SetActionMenu("Column Hidden|*-|Header Setting Save|Header Setting Reset");
	            SetSheetHeight(480);
		   }                                                      
		break;
    }
}
function getPageURL() {
	return document.getElementById("pageurl").value;
}
/**
 * Sheet1의 Action Menu Event
 * @param sheetObj
 * @param MenuString
 * @return
 */
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
		// 사용자가 저장한 Header Setting을 삭제한다.
//		case "Header Setting Delete":
//			IBS_DelGridSetting(document.fName.user_id.value, getPageURL(), sheetObj);
//		break;
		// 선택된 Column Hidden
		case "Column Hidden":
			var col=sheetObj.GetSelectCol();
			sheetObj.SetColHidden(col,1);
			sheetObj.SetColWidth(col,1);
		break;
	 }
}
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnPopupClick이벤트 발생시.
 * sheet1_OnPopupClick(sheetObj, Row, Col)  <= sheet1번+'_'+IBsheet상에 명시된 Event명+(Sheet Oeject, Row, Column) 
 */
function sheet1_OnDblClick(sheetObj,Row,Col){	
	var colStr=sheetObj.ColSaveName(Col);
	var formObj=document.frm1;
   	doProcess=true;
   	formObj.f_cmd.value="";
   	var paramStr = "";
   	
   	if(sheetObj.GetCellValue(Row,"biz_clss_cd") == "M"){
   		paramStr="./SEE_BMD_0500.clt?f_cmd="+SEARCHLIST+"&f_lnr_bkg_no="+sheetObj.GetCellValue(Row,"lnr_bkg_no")+"&f_bkg_seq="+sheetObj.GetCellValue(Row,"bkg_seq")+"&f_bkg_no="+sheetObj.GetCellValue(Row,"bkg_no");
   	   	parent.mkNewFrame('Carrier Booking Entry', paramStr,"SEE_BMD_0500_SHEET_"+sheetObj.GetCellValue(Row,"lnr_bkg_no")+"_"+sheetObj.GetCellValue(Row,"bkg_seq")+"_"+sheetObj.GetCellValue(Row,"bkg_no"));
   	}else{
   		paramStr="./SEE_BMD_0200.clt?f_cmd="+SEARCHLIST+"&f_bkg_no="+sheetObj.GetCellValue(Row,"bkg_no")+"&f_bkg_seq="+sheetObj.GetCellValue(Row,"bkg_seq");
   	   	parent.mkNewFrame('OEH Booking Entry', paramStr,"SEE_BMD_0200_SHEET_"+sheetObj.GetCellValue(Row,"bkg_no")+"_"+sheetObj.GetCellValue(Row,"bkg_seq"));
   	}
}
var CODETYPE='';
/**
 * code name select
 */
function codeNameAction(str, obj, tmp, air_sea_clss_cd){
	var s_code=obj.value.toUpperCase();
	var s_type="";
//	if ( s_code != "" ) {
		if ( tmp == "onKeyDown" ) {
			if (event.keyCode == 13){
				CODETYPE=str;		
				var sub_str=str.substring(0,8);
				if(sub_str=="location"){
					s_type=sub_str;
					ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code+'&air_sea_clss_cd='+air_sea_clss_cd, './GateServlet.gsl');
				}else if(sub_str=="trdpCode"){
					s_type=sub_str;
					ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
				}else{
					s_type=str;
					ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
				}
			}
		} else if ( tmp == "onBlur" ) {
//			if ( s_code != "" ) {
				CODETYPE=str;		
				var sub_str=str.substring(0,8);
				if(sub_str=="location"){
					s_type=sub_str;
					ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code+'&air_sea_clss_cd='+air_sea_clss_cd, './GateServlet.gsl');
				}else if(sub_str=="trdpCode"){
					s_type=sub_str;
					ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
				}else{
					s_type=str;
					ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
				}
//			}
		}else if ( tmp == "onChange" ) {
//			if ( s_code != "" ) {
				CODETYPE=str;
				var sub_str=str.substring(0,str.indexOf("_s"));
				s_type=sub_str;
				ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code+'&air_sea_clss_cd='+air_sea_clss_cd, './GateServlet.gsl');
//			}
		}
//	}
}
//코드표시 Ajax
function dispCodeNameAjaxReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@@;');
			var masterVals=rtnArr[0].split('@@^');	
			if(CODETYPE == "location_pol"){
				formObj.f_pol_cd.value=masterVals[0];
				formObj.f_pol_nm.value=masterVals[3];
			}else if(CODETYPE == "location_pod"){
				formObj.f_pod_cd.value=masterVals[0];
				formObj.f_pod_nm.value=masterVals[3];
			}else if(CODETYPE == "trdpCode"){
				formObj.s_trdp_cd.value=masterVals[0]; 
				formObj.s_trdp_full_nm.value=masterVals[3];//loc_nm
			}
		}else{
			if(CODETYPE == "location_pol"){
				formObj.f_pol_cd.value="";
				formObj.f_pol_nm.value="";
			}else if(CODETYPE == "location_pod"){
				formObj.f_pod_cd.value="";
				formObj.f_pod_nm.value="";
			}else if(CODETYPE == "trdpCode"){
				formObj.s_trdp_cd.value=""; 
				formObj.s_trdp_full_nm.value="";
			}
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}
//조회 후 페이지징 표시
function sheet1_OnSearchEnd(sheetObj, errMsg) {
	var formObj=document.frm1;
	
	for(var i=headerRowCnt; i < sheetObj.LastRow() + 1; i++){

		sheetObj.SetCellBackColor(i, "biz_clss_cd","#f7d9dc");
		if(formObj.f_biz_clss_cd.value=="H" ){//customer
			sheetObj.SetCellBackColor(i, "lnr_bkg_no","#f7d9dc");
	    }		
		sheetObj.SetCellBackColor(i, "act_trdp_nm","#f7d9dc");
		sheetObj.SetCellBackColor(i, "lnr_trdp_nm","#f7d9dc");
		sheetObj.SetCellBackColor(i, "shp_trdp_nm","#f7d9dc");
		sheetObj.SetCellBackColor(i, "cne_trdp_nm","#f7d9dc");
		sheetObj.SetCellBackColor(i, "etd_dt_tm","#f7d9dc");
		sheetObj.SetCellBackColor(i, "eta_dt_tm","#f7d9dc");
		sheetObj.SetCellBackColor(i, "trnk_vsl_nm","#f7d9dc");
		sheetObj.SetCellBackColor(i, "trnk_voy","#f7d9dc");
		sheetObj.SetCellBackColor(i, "por_cd","#f7d9dc");
		sheetObj.SetCellBackColor(i, "pol_cd","#f7d9dc");
		sheetObj.SetCellBackColor(i, "pod_cd","#f7d9dc");
		sheetObj.SetCellBackColor(i, "del_cd","#f7d9dc");
		sheetObj.SetCellBackColor(i, "shp_mod_cd","#f7d9dc");
		sheetObj.SetCellBackColor(i, "nomi_flg","#f7d9dc");
		
		
	}
	if(frm1.f_cmd.value==REMOVE){
		doWork("SEARCHLIST");
	}
	
	if(sheetObj.GetCellValue(1, "biz_clss_cd") == "M"){
		getBtnObj('btn_CreateMBL').style.display="inline";
		getBtnObj('btn_BkgEdi').style.display="inline";
	}else{
		getBtnObj('btn_CreateMBL').style.display="none";
		getBtnObj('btn_BkgEdi').style.display="none";
	}
	
	if(sheetObj.GetCellValue(1, "biz_clss_cd") == "H"){
		getBtnObj('btnPrint').style.display="inline";
	}else{
		getBtnObj('btnPrint').style.display="none";
	}
	
	doDispPaging(docObjects[0].GetCellValue(1, "Indexing"), getObj('pagingTb'));
}
function sheet1_OnSaveEnd(sheetObj, errMsg) {	
	var formObj=document.frm1;

	if(errMsg == undefined  || errMsg==null || errMsg =='' ){
		showCompleteProcess();
		document.getElementById("combineMsg").innerHTML="Combined_Booking_No : <a href='#' onClick='combineClick();'>"+formObj.combine_no.value+"</a>";
		formObj.f_chk_o.checked = false;
	}else{
		document.getElementById("combineMsg").innerHTML="";
		
	}
	for(var i=headerRowCnt; i < sheetObj.LastRow() + 1; i++){

		sheetObj.SetCellBackColor(i, "biz_clss_cd","#f7d9dc");
		if(formObj.f_biz_clss_cd.value=="H" ){//customer
			sheetObj.SetCellBackColor(i, "lnr_bkg_no","#f7d9dc");
	    }
		sheetObj.SetCellBackColor(i, "act_trdp_nm","#f7d9dc");
		sheetObj.SetCellBackColor(i, "lnr_trdp_nm","#f7d9dc");
		sheetObj.SetCellBackColor(i, "shp_trdp_nm","#f7d9dc");
		sheetObj.SetCellBackColor(i, "cne_trdp_nm","#f7d9dc");
		sheetObj.SetCellBackColor(i, "etd_dt_tm","#f7d9dc");
		sheetObj.SetCellBackColor(i, "eta_dt_tm","#f7d9dc");
		sheetObj.SetCellBackColor(i, "trnk_vsl_nm","#f7d9dc");
		sheetObj.SetCellBackColor(i, "trnk_voy","#f7d9dc");
		sheetObj.SetCellBackColor(i, "por_cd","#f7d9dc");
		sheetObj.SetCellBackColor(i, "pol_cd","#f7d9dc");
		sheetObj.SetCellBackColor(i, "pod_cd","#f7d9dc");
		sheetObj.SetCellBackColor(i, "del_cd","#f7d9dc");
		sheetObj.SetCellBackColor(i, "shp_mod_cd","#f7d9dc");
		sheetObj.SetCellBackColor(i, "nomi_flg","#f7d9dc");	
		
	}
}
function checkBlReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.frm1;
	var biz_clss_cd = docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "biz_clss_cd");
	
	if(doc[0]=='OK'){
		if(doc[1]=='Y'){
			if(biz_clss_cd == "M"){
				//Cannot delete because MB/L was Created!
	   	 		alert(getLabel('FMS_COM_ALT092'));
			}else{
				//Cannot delete because HB/L was Created!
	   	 		alert(getLabel('FMS_COM_ALT068'));
			}
		}
		else{
			ajaxSendPost(getBkgStatus, 'reqVal', '&goWhere=aj&bcKey=getBkgStatus&bkg_seq='+ docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "bkg_seq")
																			  +'&biz_clss_cd='+ docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "biz_clss_cd"), './GateServlet.gsl');
			
			if(getBkgEditMode(v_bkg_sts_cd) != "Y"){
				alert(getLabel('FMS_COM_ALT007') + "\n - "+ getLabel('BKG_STATUS'));
			} else {
				//'Do you want to delete?')){
				if(confirm(getLabel('FMS_COM_CFMDEL'))){
	   	 			formObj.f_cmd.value=REMOVE;
	   	 			formObj.bkg_seq.value=docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "bkg_seq");
		   	 		if(biz_clss_cd == "M"){
		   	 			docObjects[0].DoSearch("./SEE_BKG_0040GS.clt", FormQueryString(formObj) );
					}else{
						docObjects[0].DoSearch("./SEE_BMD_0210GS.clt", FormQueryString(formObj) );
					}
	 			}
			}
		}
	}
}

function clearAll(){
	docObjects[0].RemoveAll();
	var formObj=document.frm1;
	//LHK, 20141029 #44986 [BINEX]Office - All Option
	setOfficeAllOption(formObj.f_ofc_cd);
	formObj.f_shp_mod_cd.selectedIndex=0;
	var collTxt=document.getElementsByTagName("INPUT");   // document 상의 모든 INPUT 태그 요소들을 컬렉션으로 구하고...
	for(var i=0; i<collTxt.length; i++){
		if(collTxt[i].type == "text"){
			collTxt[i].value="";
		}           
	}
	if (uod_flg == "N"){ 
		formObj.f_opr_usrid.value=usrId;
	}
}
function entSearch(){
	if(event.keyCode == 13){
		document.forms[0].f_CurPage.value='';
		doWork('SEARCHLIST')
	}
}
function formValidation(){
	if(!chkSearchCmprPrd(false, frm1.f_bkg_strdt, frm1.f_bkg_enddt)){
		return false;
	}
	/*if(!frm1.f_lnr_bkg_chk.checked && !frm1.f_bkg_chk.checked){
		alert(getLabel('SEA_COM_ALT033'));
		return false;
	}*/
	return true;
}
//Calendar flag value
var firCalFlag=false;
function searchValueSet(){
	var formObj = document.frm1;
	
	formObj.f_prnr_trdp_nm.value="";
	formObj.f_shpr_trdp_nm.value="";
	formObj.f_cnee_trdp_nm.value="";
	formObj.f_ntfy_trdp_nm.value="";
	formObj.f_ahpr_trdp_nm.value="";
	
	formObj.f_mbl_no.value="";
	formObj.f_hbl_no.value="";
	
	formObj.f_po_no.value="";
	formObj.f_lc_no.value="";
	
	if(formObj.f_sel_trdp_tp.value == "PRNR"){
		formObj.f_prnr_trdp_nm.value=formObj.f_sel_trdp_nm.value;
	}else if(formObj.f_sel_trdp_tp.value == "SHPR"){
		formObj.f_shpr_trdp_nm.value=formObj.f_sel_trdp_nm.value;
	}else if(formObj.f_sel_trdp_tp.value == "CNEE"){
		formObj.f_cnee_trdp_nm.value=formObj.f_sel_trdp_nm.value;
	}else if(formObj.f_sel_trdp_tp.value == "NTFY"){
		formObj.f_ntfy_trdp_nm.value=formObj.f_sel_trdp_nm.value;
	}else if(formObj.f_sel_trdp_tp.value == "AHPR"){
		formObj.f_ahpr_trdp_nm.value=formObj.f_sel_trdp_nm.value;
	}
	
	if(formObj.f_bl_cd.value == "MBL_No"){
		formObj.f_mbl_no.value=formObj.f_bl_no.value;
	}else if(formObj.f_bl_cd.value == "HBL_No"){
		formObj.f_hbl_no.value=formObj.f_bl_no.value;
	}
	
	if(formObj.f_sel_cd.value == "PO_NO"){
		formObj.f_po_no.value=formObj.f_sel_no.value;
	}else if(formObj.f_sel_cd.value == "LC_NO"){
		formObj.f_lc_no.value=formObj.f_sel_no.value;
	}
	
	/*if(formObj.f_lnr_bkg_chk.checked && formObj.f_bkg_chk.checked){
		formObj.f_biz_clss_cd.value="";
	}else{
		if(formObj.f_lnr_bkg_chk.checked){
			formObj.f_biz_clss_cd.value="M";
		}
		if(formObj.f_bkg_chk.checked){
			formObj.f_biz_clss_cd.value="H";
		}
	}*/
}
function searchValueClear(type){
	formObj = document.frm1;
	
	if(type == "TRDP"){
		formObj.f_sel_trdp_nm.value="";
	} else if(type == "BL"){
		formObj.f_bl_no.value="";
	} else if(type == "USER"){
		if (uod_flg != "N"){ 
			formObj.f_opr_usrid.value = "";
		}
	} else {
		formObj.f_sel_no.value="";
	}
}
function POL_LOCATION_POPLIST(rtnVal){
	formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}
	else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_pol_cd.value=rtnValAry[0];//loc_cd 
		formObj.f_pol_nm.value=rtnValAry[2];//loc_nm
	} 
}
function POD_LOCATION_POPLIST(rtnVal){
	formObj = document.frm1;
    if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}
    else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_pod_cd.value=rtnValAry[0];//loc_cd 
		formObj.f_pod_nm.value=rtnValAry[2];//loc_nm
	} 
}
function TRDP_POPLIST(rtnVal){
	formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}
        else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_sel_trdp_nm.value=rtnValAry[2];//full_nm
	}    
}
/*function SHIP_TRDP_POPLIST(rtnVal){
	formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}
	else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_shpr_trdp_nm.value=rtnValAry[2];//full_nm
	}    
}
function CNEE_TRDP_POPLIST(rtnVal){
	formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}
	else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_cnee_trdp_nm.value=rtnValAry[2];//full_nm
	}  
}
function NTFY_TRDP_POPLIST(rtnVal){
	formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}
	else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_ntfy_trdp_nm.value=rtnValAry[2];//full_nm
	}     
}*/



function createMBL(reqVal) {
	var doc = getAjaxMsgXML(reqVal);
	if (doc[0] == 'OK') {
		if(doc[1]=='N'){
			ajaxSendPost(getBkgStatus, 'reqVal', '&goWhere=aj&bcKey=getBkgStatus&bkg_seq='+docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "bkg_seq")
																			  +'&biz_clss_cd='+ docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "biz_clss_cd"), './GateServlet.gsl');
		
			if(v_bkg_sts_cd == "CF"){
				ajaxSendPost(getLnrBkgNo, 'reqVal', '&goWhere=aj&bcKey=getLnrBkgNo&bkg_seq='+docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "bkg_seq"), './GateServlet.gsl');

				if(v_lnr_bkg_no == ""){
					alert(getLabel('SAVE_CARRIER_BOOKING_ENTRY'));
					return;
				}
				
				//C.W Park.
				//동일한 BKG_NO가 존재할 경우 Bug발생으로 Seq 까지 추가함.
				var paramStr="./SEE_BMD_0040.clt?f_cmd=130&f_lnr_bkg_no="+v_lnr_bkg_no + "&f_bkg_seq=" + docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "bkg_seq");
				parent.mkNewFrame('Master B/L Entry', paramStr);
			} else{
				alert(getLabel('FMS_COM_ALT007') + "\n - "+ getLabel('BKG_STATUS'));
			}
		}else{
			alert(getLabel('FMS_COM_ALT096'));
		}
	} else {
		// alert(getLabel('SEE_BMD_MSG43'));
	}
}

var v_bkg_sts_cd = "";

function getBkgStatus(reqVal) {
	var doc = getAjaxMsgXML(reqVal);
	if (doc[0] == 'OK') {
		if(typeof(doc[1])!='undefined'){
			v_bkg_sts_cd = doc[1];
		}
	}
}

var v_lnr_bkg_no = "";

function getLnrBkgNo(reqVal) {
	var doc = getAjaxMsgXML(reqVal);
	if (doc[0] == 'OK') {
		if(typeof(doc[1])!='undefined'){
			v_lnr_bkg_no = doc[1];
		}
	}
}

function setBkgEditStsCdVal(reqVal){
	var doc=getAjaxMsgXML(reqVal);

	if (doc[0]=="OK" && typeof doc[1] != "undefined" ){
		BKG_EDIT_MODE = doc[1];
	}else{
		BKG_EDIT_MODE = "[CR]:Y,[RD]:N,[RJ]:Y,[CF]:N,[CN]:Y,[BL]:N";
	}
}

function getBkgEditMode(bkg_sts_cd){
	var rtnValAry=BKG_EDIT_MODE.split(",");
	var bkg_edit_mode = "N";
	
	for (var i=0; i < rtnValAry.length; i++) {
		var result = rtnValAry[i].split(":");
		if(result[0] == "[" + bkg_sts_cd + "]"){
			bkg_edit_mode = result[1];
		}
	}
	
	return bkg_edit_mode;
}

