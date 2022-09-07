var rtnary=new Array(1);
var callBackFunc = "";
var cur_curObj;
var CODETYPE="";
function doWork(srcName){	
	if(!btnGetVisible(srcName)){
		return;
	}
	
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var formObj=document.form;
	try {
        switch(srcName) {
    	   case "SEARCHLIST":
    		   //if(!searchValid()) return;
    		   if (formObj.f_vsl_nm.value == "") formObj.f_vsl_cd.value = "";
    		   
    		   formObj.f_cmd.value=SEARCHLIST;
    		   sheetObj.DoSearch("SEC_BMD_0011GS.clt", FormQueryString(formObj) );
    	   break;
    	   case "ADD":
    		   var cnt=sheetObj.CheckedRows("palt_check");
    			 
    		   if (cnt == 0){    			   
    			   alert(getLabel('FMS_COM_ALT007'))
    			   return false; 
    		   } 
    			
    		   if (formObj.i_pod_cd.value == "" && formObj.i_pol_cd.value == "" && 
    				   formObj.i_vsl_nm.value == "" && formObj.i_voy.value == "" &&
    					   formObj.i_etd_dt_tm.value == "" && formObj.i_eta_dt_tm.value == ""
    				   ){
    			   alert(getLabel('FMS_COM_ALT001'))
    			   formObj.i_vsl_nm.focus();
    			   return false; 
    		   }
    		   
    		   if (formObj.i_pol_nm.value != "" && formObj.i_pol_cd.value == "" ){
    			   formObj.i_pol_cd.focus();
    			   alert(getLabel('FMS_COM_ALT001'))
    			   return false;
    		   }
    		   
    		   if (formObj.i_pod_nm.value != "" && formObj.i_pod_cd.value == "" ){
    			   formObj.i_pod_cd.focus();
    			   alert(getLabel('FMS_COM_ALT001'))
    			   return false;
    		   }
    		    if(confirm(getLabel('FMS_COM_CFMVSL'))){
                	formObj.f_cmd.value=ADD;
                    doProcess=true;
                    sheetObj.DoSave("SEC_BMD_0011GS.clt", FormQueryString(formObj),"ibflag",false);
                }
  	       break;
    	            

           
        } // end switch
	}catch(e) {
        if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	alert(getLabel('FMS_COM_ERR002'));
        } 
        else{
        	//System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001') + " - " + e );
        }
	}
}

function searchValid(){
	var formObj = document.form;
	
	if(trim(formObj.f_vsl_nm.value) == ""  ){
		alert(getLabel('FMS_COM_ALT014'));
		formObj.f_vsl_nm.focus();
		return false;
	}
	
	if(trim(formObj.f_voy.value) == ""  ){
		alert(getLabel('FMS_COM_ALT014'));
		formObj.f_voy.focus();
		return false;
	}
	
	if(trim(formObj.f_pol_cd.value) == ""  ){
		alert(getLabel('FMS_COM_ALT014'));
		formObj.f_pol_cd.focus();
		return false;
	}
	
	if(trim(formObj.f_pol_nm.value) == ""  ){
		alert(getLabel('FMS_COM_ALT014'));
		formObj.f_pol_nm.focus();
		return false;
	}
	
	return true;
}


function cmmOpenPopUp(popName, curObj,valObj){
	cur_curObj = curObj;	
		
	
	var formObj=document.form;
	try {
		switch(popName) {
			
           case "LOCATION_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
           		rtnary=new Array(3);
		   		rtnary[0]="S";
		   		rtnary[1]="BL";
		   		// 2011.12.27 value parameter
		   		
		   		if(typeof(valObj)!='undefined'){
		   			rtnary[2]=valObj;
		   		}else{
		   			rtnary[2]="";
		   			
		   		}
		   		rtnary[3]="";		   		
		   		rtnary[4]=curObj;
		   		callBackFunc = "LOCATION_POPLIST";
				modal_center_open('./CMM_POP_0030.clt', rtnary, 806,440,"yes");
    	        
           break;
	      
           case "VESSEL_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
           		rtnary=new Array(2);
		   		rtnary[0]="1";
		   		// 2011.12.27 value parameter
		   		if(typeof(valObj)!='undefined'){
		   			rtnary[1]=valObj;
		   		}else{
		   			rtnary[1]="";
		   		}
		   		callBackFunc = "VESSEL_POPLIST";
				modal_center_open('./CMM_POP_0140.clt', rtnary, 656,470,"yes");
				
           break;
          
      } // end switch
	}catch(e) {
        if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	alert(getLabel('FMS_COM_ERR002'));
        } 
        else{
        	//System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001') + " - " + e );
        }
	}
}

function VESSEL_POPLIST(rtnVal){
	var formObj=document.form;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		if(cur_curObj.id == "f_vsl"){
			formObj.f_vsl_cd.value=rtnValAry[0];
			formObj.f_vsl_nm.value=rtnValAry[1];
		}else if(cur_curObj.id == "vsl"){
			formObj.i_vsl_cd.value=rtnValAry[0];
			formObj.i_vsl_nm.value=rtnValAry[1];
		}
	}
}




function LOCATION_POPLIST(rtnVal){
	 
	var formObj = document.form;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		if(cur_curObj.id == "por"){
			if(rtnValAry[0]==''){
			}else{				
				formObj.f_pol_cd.value=rtnValAry[0];//loc_cd 
				formObj.f_pol_nm.value=rtnValAry[2];//loc_nm				
			}
		}else if(cur_curObj.id == "pol"){
			if(rtnValAry[0]==''){
			}else{
				formObj.i_pol_cd.value=rtnValAry[0];//loc_cd 
				formObj.i_pol_nm.value=rtnValAry[2];//loc_nm				
			}
		}else if(cur_curObj.id == "pod"){
			if(rtnValAry[0]==''){
			}else{
				formObj.i_pod_cd.value=rtnValAry[0];//loc_cd
				formObj.i_pod_nm.value=rtnValAry[2];//loc_nm
			}
		}
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
    	case 'DATE1':    //달력 조회 팝업 호출      
        var cal=new ComCalendar();
        cal.select(formObj, 'MM-dd-yyyy');
        break;
	    case 'DATE11':   //달력 조회 From ~ To 팝업 호출 
	        var cal=new ComCalendarFromTo();
	        cal.select(formObj.f_etd_strdt, formObj.f_etd_enddt, 'MM-dd-yyyy');
	    break;   
	    
       
    }
}
//Calendar flag value
var firCalFlag=false;
function goToPage(callPage){
	docObjects[0].RemoveAll();
	document.form.f_CurPage.value=callPage;
	doWork('SEARCHLIST');
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function viewCntChg(){
	//document.form.f_CurPage.value = 1;
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



function inputdataclear(){
	form.i_vsl_cd.value =""; 
	form.i_vsl_nm.value ="";
	form.i_voy.value ="";
	
	form.i_pol_cd.value =""; 
	form.i_pol_nm.value ="";
	form.i_pod_cd.value =""; 
	form.i_pod_nm.value ="";
	form.i_etd_dt_tm.value ="";
	form.i_eta_dt_tm.value ="";
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
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
function loadPage() {
	var formObj=document.form;
	setOfficeAllOption(formObj.ofc_cd);
	for ( var i = 0; i < docObjects.length; i++) {
		// khlee-시작 환경 설정 함수 이름 변경
		comConfigSheet(docObjects[i], SYSTEM_FIS);
		initSheet(docObjects[i], i + 1);
		// khlee-마지막 환경 설정 함수 추가
		comEndConfigSheet(docObjects[i]);
	}	
	removeFirstKeyField(docObjects[0]);
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
             with(sheetObj){
				SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
				var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
				var headers = [ { Text:getLabel('SEC_BMD_0011_HDR_1'), Align:"Center"} ];
				InitHeaders(headers, info);
				
				//"CHK|MB/L No.|Ship Mode|Office|Filing No.|Carrier Bkg No|Count|ETD|ETA|ATD|ATA|Container|Triangle Agent";
				var cols = [ {Type:"CheckBox",  Hidden:0, Width:50,   Align:"Center",  ColMerge:0,   SaveName:"palt_check",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
				             {Type:"Status",    Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"ibflag" },				             
				{Type:"Text",      Hidden:0, Width:150,   Align:"Left",     ColMerge:1,   SaveName:"mbl_no",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
				{Type:"Text",      Hidden:0,  Width:80,  Align:"Left",    ColMerge:1,   SaveName:"shp_mod_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
				{Type:"Text",      Hidden:0,  Width:80,  Align:"Left",    ColMerge:1,   SaveName:"ref_ofc_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
				{Type:"Text",      Hidden:0,  Width:150,   Align:"Left",    ColMerge:1,   SaveName:"ref_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:6},
				{Type:"Text",      Hidden:0,  Width:150,   Align:"Left",    ColMerge:1,   SaveName:"lnr_bkg_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:6},
				{Type:"Text",      Hidden:0, Width:70,   Align:"Center",  ColMerge:1,   SaveName:"hbl_cnt",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
				{Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:"trnk_vsl_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
				{Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:"trnk_voy",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
				{Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"pol_cd",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
				{Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:0,   SaveName:"pol_nm",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
				{Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"pod_cd",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	            {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:0,   SaveName:"pod_nm",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
				{Type:"Date", 	   Hidden:0, Width:100,   Align:"Center",  ColMerge:1,   SaveName:"etd_dt_tm",          KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
				{Type:"Date", 	   Hidden:0, Width:100,   Align:"Center",  ColMerge:1,   SaveName:"eta_dt_tm",          KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
				{Type:"Text",      Hidden:0, Width:150,   Align:"Left",     ColMerge:1,   SaveName:"cntr_no",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
				{Type:"Text",      Hidden:0, Width:150,   Align:"Left",     ColMerge:1,   SaveName:"prnr_trdp_nm2",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
				{Type:"Text",      Hidden:1, Width:150,   Align:"Left",     ColMerge:1,   SaveName:"rlt_intg_bl_seq",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
				{Type:"Text",      Hidden:1, Width:150,   Align:"Left",     ColMerge:1,   SaveName:"bnd_clss_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
				{Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"Indexing" } ];
				InitColumns(cols);
				SetEditable(1);
				//InitViewFormat(0, "etd", "MM\\-dd\\-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
				//InitViewFormat(0, "eta", "MM\\-dd\\-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
			
	            SetSheetHeight(450);
	            resizeSheet();
         }
           break;
    }
}

function resizeSheet() {
	ComResizeSheet(docObjects[0]);
}


//조회 후 페이지징 표시
function sheet1_OnSearchEnd(){	
	doDispPaging(docObjects[0].GetCellValue(1, 'Indexing'), getObj('pagingTb'));
	removeFirstKeyField(sheet1);
	inputdataclear();

	
} 

function removeFirstKeyField(sheetObj) {
	$($('#DIV_' + ((typeof sheetObj == "string") ? sheetObj : sheetObj.id)).find('span.GMKeyfield')[0]).remove();
}
//등록/수정/삭제 후 페이지징 표시
function sheet1_OnSaveEnd(sheetObj, errMsg){
	doDispPaging(docObjects[0].GetCellValue(2, 'Indexing'), getObj('pagingTb'));
	if(errMsg=="" || errMsg==undefined || errMsg==null ){
		//alert(getLabel('FMS_COM_NTYCOM'));
		/* LHK 20130822 #19443 Save & Complete Alert message 변경 */
		showCompleteProcess();
	}
	inputdataclear();
}
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnPopupClick이벤트 발생시.
 * sheet1_OnPopupClick(sheetObj, Row, Col)  <= sheet1번+'_'+IBsheet상에 명시된 Event명+(Sheet Oeject, Row, Column) 
 */
var cur_row;

function sheet1_OnChange(sheetObj, Row, Col){
	var formObj=document.form;
	
}
/**
 * code name select
 */
function codeNameAction(str, obj, tmp){
	var formObj=document.form;
	var sub_str=str.substring(0,8);
	var sub_str2=str.substring(9);
	CODETYPE=str;
	 
	if(obj.value != ""){
		if(tmp=="onKeyDown"){
			if(event.keyCode==13){
				var s_code=obj.value.toUpperCase();		
				
				if(sub_str=="Location"){
					
					str=sub_str;					
					ajaxSendPost(dispCodeNameAjaxReq, "reqVal", "&goWhere=aj&bcKey=searchCodeName&codeType="+str+"&s_code="+s_code+'&air_sea_clss_cd='+"S", "./GateServlet.gsl");
				}
				
			}
		}else if(tmp=="onBlur"){
			var s_code=obj.value.toUpperCase();			
			if(sub_str=="Location"){
				str=sub_str;
				ajaxSendPost(dispCodeNameAjaxReq, "reqVal", "&goWhere=aj&bcKey=searchCodeName&codeType="+str+"&s_code="+s_code+'&air_sea_clss_cd='+"S", "./GateServlet.gsl");
			}
			
			
		}
	}else{
		if(obj.name == "s_liner_code"){
			formObj.s_liner_name.value="";
			formObj.s_liner_abbr.value="";
		}else if(obj.name == "s_port_code"){
			formObj.s_port_name.value="";
		}else if(obj.name == "f_pol_cd"){
			formObj.f_pol_cd.value="";
			formObj.f_pol_nm.value="";
		}else if(obj.name == "i_pol_cd"){
			formObj.i_pol_cd.value="";
			formObj.i_pol_nm.value="";
		}else if(obj.name == "i_pod_cd"){
			formObj.i_pod_cd.value="";
			formObj.i_pod_nm.value="";
		}
		
	}
}
//코드표시 Ajax
function dispCodeNameAjaxReq(reqVal){
	
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	var sheetObj=docObjects[0];
	var formObj=document.form;
	 
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@@;');
			var masterVals=rtnArr[0].split('@@^');
			 if(CODETYPE =="Location_fpol"){
				formObj.f_pol_cd.value=masterVals[0];
				formObj.f_pol_nm.value=masterVals[3];
			}else if(CODETYPE =="Location_pol"){
					formObj.i_pol_cd.value=masterVals[0];
					formObj.i_pol_nm.value=masterVals[3];
			}else if(CODETYPE =="Location_pod"){
				formObj.i_pod_cd.value=masterVals[0];
				formObj.i_pod_nm.value=masterVals[3];
			}
		}else{
			 if(CODETYPE =="Location_fpol"){
				formObj.f_pol_cd.value="";
				formObj.f_pol_nm.value="";
			}else if(CODETYPE =="Location_pol"){
				formObj.i_pol_cd.value="";
				formObj.i_pol_nm.value="";
			}else if(CODETYPE =="Location_pod"){
				formObj.i_pod_cd.value="";
				formObj.i_pod_nm.value="";
			}else if(CODETYPE =="srVessel"){
				formObj.f_vsl_cd.value="";
				formObj.f_vsl_nm.value="";
			}			
		}
	}else{
		//Error Errupt!	
		alert(getLabel('FMS_COM_ERR001'));		
	}
}

function formValidation(){
	var formObj=document.form;
	if(!chkSearchCmprPrd(false, form.f_etd_strdt, form.f_etd_enddt)){
		return false;
	}
	if(!chkSearchCmprPrd(false, form.f_eta_strdt, form.f_eta_enddt)){
		return false;
	}
    return true;
}

