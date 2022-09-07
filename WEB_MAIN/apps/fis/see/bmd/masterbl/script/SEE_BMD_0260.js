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
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한다.
    var formObj=document.frm1;
    var sheetObj=docObjects[0];
	try {
		switch(srcName) {
    	   	case "SEARCHLIST":
    	   		if(!formValidation()) return;
    	   		//search 조건 추가로 combo box 이용한 추가 조건 set
    	   		document.getElementById("combineMsg").innerHTML="";
    	   		if(validateForm(sheetObj, formObj, SEARCHLIST, 1)){
			   		formObj.f_cmd.value=SEARCHLIST01;
			   		sheetObj.DoSearch("./SEE_BMD_0260GS.clt", FormQueryString(formObj) );
			    }
			    break;
    	   	case "MODIFY":

				formObj.f_cmd.value=MODIFY;
				sheetObj.DoSave("./SEE_BMD_0260GS.clt", FormQueryString(formObj),"ibflag",false);
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
function combineBl(){

    var formObj=document.frm1;
    var sheetObj=docObjects[0];
	var chkCnt=0;
	var chkMain="";

	var chk_intg_bl_seq="";
	var sqlChkSeq="";
	var Row = sheetObj.GetSelectRow();
	var combineNo="";
	var mainBizClss = "";
	var subBizClss = "";
	var delCheck = "";
	var delFlag = true;
	
	for(var i=headerRowCnt; i < sheetObj.LastRow() + 1; i++){
		
		if(sheetObj.GetCellValue(i, "bl_check") == 1){
			if(sheetObj.GetCellValue(i, "check_flag") == "0"){
				chkMain += "";
				combineNo += "";
				subBizClss += sheetObj.GetCellValue(i, "biz_clss_cd");
			}else{
				chkMain += sheetObj.GetCellValue(i, 'intg_bl_seq');
				combineNo += sheetObj.GetCellValue(i, 'bl_no');
				mainBizClss = sheetObj.GetCellValue(i, "biz_clss_cd");
			}
			if(chkCnt > 0){
				chk_intg_bl_seq += ',';
				sqlChkSeq +=',';
			}
			
			if(sheetObj.GetCellValue(i, 'cntr_qty') != '0' && sheetObj.GetCellValue(i, 'cntr_no') == ''){
				alert("To combine B/Ls, The Container number should be assigned in advance.");
				return false;
			}
			
			if(delCheck == ""){
				delCheck = sheetObj.GetCellValue(i, 'del_cd');
			}else{
				if(delCheck != sheetObj.GetCellValue(i, 'del_cd')){
					delFlag = false;
				}
			}
			
			chk_intg_bl_seq		+= 	sheetObj.GetCellValue(i, 'intg_bl_seq');
			sqlChkSeq       += 	"'"+sheetObj.GetCellValue(i, 'intg_bl_seq')+"'";
			chkCnt++;
		}
	}

    //체크박스 선택하지 않은 경우 처리
	if (chkCnt < 2){
		alert("check B/L !!");
		return false;
	}
	//체크박스 안의 Main이 선택되지 않은 경우 처리
	if (chkMain == ""){
		alert("Please select a main B/L from selected B/Ls.");
		return false;	
	}
	
	if(subBizClss.split(mainBizClss).join("") != ""){
		alert("Please select same B/L type.");
		return;
	}
	
	if(!delFlag){
		alert("Please select same DEL.");
		return false;
	}

	
	formObj.main_intg_bl_seq.value = chkMain;
	formObj.chk_intg_bl_seq.value = sqlChkSeq;
	formObj.combine_no.value = combineNo;
	
	if(confirm(getLabel('FMS_COM_CFMSAV'))){
		doWork('MODIFY');
	}
		
}

function combineClick(){	

	var formObj=document.frm1;
   	doProcess=true;
   	formObj.f_cmd.value="";
   	var paramStr = "";
   	
   	if(formObj.f_biz_clss_cd.value == "M"){
   		paramStr="./SEE_BMD_0500.clt?f_cmd="+SEARCHLIST+"&f_lnr_bkg_no="+formObj.lnr_bkg_no.value+"&f_intg_bl_seq="+formObj.main_intg_bl_seq.value+"&f_bkg_no="+formObj.combine_no.value;
   	   	parent.mkNewFrame('Carrier Booking Entry', paramStr,"SEE_BMD_0500_SHEET_"+formObj.lnr_bkg_no.value+"_"+formObj.main_intg_bl_seq.value+"_"+formObj.combine_no.value);
   	}else{
   		paramStr="./SEE_BMD_0200.clt?f_cmd="+SEARCHLIST+"&f_bkg_no="+formObj.combine_no.value+"&f_intg_bl_seq="+formObj.main_intg_bl_seq.value;
   	   	parent.mkNewFrame('OEH Booking Entry', paramStr,"SEE_BMD_0200_SHEET_"+formObj.combine_no.value+"_"+formObj.main_intg_bl_seq.value);
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
            cal.select(formObj.f_post_strdt, formObj.f_post_enddt, 'MM-dd-yyyy');
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
	            var headers = [ { Text:getLabel('SEE_BMD_0260_HDR1'), Align:"Center"},
	        	                   { Text:getLabel('SEE_BMD_0260_HDR2'), Align:"Center"}  ];
	            InitHeaders(headers, info);
	
	            var cols = [
	                         {Type:"CheckBox",  Hidden:0, Width:45,   Align:"Center",   ColMerge:1,   SaveName:"bl_check",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	                         {Type:"Radio",     Hidden:0, Width:40,   Align:"Center",   ColMerge:1,   SaveName:"check_flag",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
	                         {Type:"Seq",     	Hidden:0,  Width:40,   Align:"Center",  ColMerge:0,   SaveName:"no",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                         {Type:"Combo",     Hidden:0,  Width:110,  Align:"Left",    ColMerge:0,   SaveName:"biz_clss_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                         {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"bl_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                         {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"ref_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                         {Type:"Date",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"post_dt",     KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
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
	                         {Type:"Text",      Hidden:0,  Width:150,   Align:"Center",  ColMerge:0,   SaveName:"cntr_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                         {Type:"Float",     Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"cntr_qty",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                         {Type:"Float",     Hidden:0,  Width:120,  Align:"Right",   ColMerge:0,   SaveName:"pck_qty",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
	     	                 {Type:"Text",      Hidden:1,  Width:120,  Align:"Right",   ColMerge:0,   SaveName:"pck_ut_cd",     KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
	     	                 {Type:"Text",      Hidden:0,  Width:120,  Align:"Right",   ColMerge:0,   SaveName:"pck_ut_nm",     KeyField:0,   CalcLogic:"",   Format:"",       		PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	     	                 {Type:"Float",     Hidden:0,  Width:120,  Align:"Right",   ColMerge:0,   SaveName:"grs_wgt",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
	     	                 {Type:"Float",     Hidden:0,  Width:120,  Align:"Right",   ColMerge:0,   SaveName:"grs_wgt1",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
	     	                 {Type:"Float",     Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"meas",          KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:0,   InsertEdit:0 },
	     	                 {Type:"Float",     Hidden:0,  Width:120,  Align:"Right",   ColMerge:0,   SaveName:"meas1",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:0,   InsertEdit:0 },
	                         {Type:"Text",      Hidden:1,  Width:80,   Align:"Center",  ColMerge:0,   SaveName:"intg_bl_seq",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                         {Type:"Text",      Hidden:1,  Width:80,   Align:"Center",  ColMerge:0,   SaveName:"mk_txt",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                         {Type:"Text",      Hidden:1,  Width:80,   Align:"Center",  ColMerge:0,   SaveName:"desc_txt",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                         {Type:"Status",    Hidden:1, Width:40,   Align:"Center",  ColMerge:1,  SaveName:"ibflag",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 }
	                         ];
	             
	            InitColumns(cols);
	
	            SetEditable(1);
	            
	            SetColProperty("nomi_flg", {ComboText:BKGNOMINM, ComboCode:BKGNOMICD} );
	            SetColProperty("biz_clss_cd", {ComboText:'Master|House', ComboCode:'M|H'} );
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
		var paramStr="./SEE_BMD_0040.clt?f_cmd="+SEARCHLIST+'&f_ref_no='+escape(sheetObj.GetCellValue(Row, 'ref_no'))+"&f_intg_bl_seq="+sheetObj.GetCellValue(Row, "intg_bl_seq");
	   	parent.mkNewFrame('Master B/L Entry', paramStr, "SEE_BMD_0040_SHEET_" + sheetObj.GetCellValue(Row, 'ref_no')+"_"+sheetObj.GetCellValue(Row, "intg_bl_seq"));
   	}else{
   		
		var paramStr = "./SEE_BMD_0020.clt?f_cmd=" + SEARCHLIST + "&f_bl_no="
		+ escape(sheetObj.GetCellValue(Row, "bl_no")) + "&f_intg_bl_seq="
		+ sheetObj.GetCellValue(Row, "intg_bl_seq");
		parent.mkNewFrame('Booking & HBL', paramStr,"SEE_BMD_0020_SHEET_" +  escape(sheetObj.GetCellValue(Row, "bl_no")) + "_" + sheetObj.GetCellValue(Row, "intg_bl_seq"));
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

		if(sheetObj.GetCellValue(i, "biz_clss_cd")=="H" ){//customer
			sheetObj.SetCellBackColor(i, "bl_no","#f7d9dc");
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
		
		var cntrNo = sheetObj.GetCellValue(i, "cntr_no");
		
		sheetObj.SetCellValue(i, "cntr_no",cntrNo.substring(0, cntrNo.length - 1));
	}
	
	doDispPaging(docObjects[0].GetCellValue(1, "Indexing"), getObj('pagingTb'));
}
function sheet1_OnSaveEnd(sheetObj, errMsg) {	
	var formObj=document.frm1;

	if(errMsg == undefined  || errMsg==null || errMsg =='' ){
		showCompleteProcess();
		document.getElementById("combineMsg").innerHTML="Combined_Booking_No : <a href='#' onClick='combineClick();'>"+formObj.combine_no.value+"</a>";
	}else{
		document.getElementById("combineMsg").innerHTML="";
		
	}
	for(var i=headerRowCnt; i < sheetObj.LastRow() + 1; i++){

		if(sheetObj.GetCellValue(i, "biz_clss_cd")=="H" ){//customer
			sheetObj.SetCellBackColor(i, "bl_no","#f7d9dc");
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
	if(!chkSearchCmprPrd(false, frm1.f_post_strdt, frm1.f_post_enddt)){
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