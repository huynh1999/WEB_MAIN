/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : SEE_FRT_0040.js
*@FileTitle  : Correction Advice
*@Description: Correction Advice list search
*@author     : CLT
*@version    : 1.0
*@since      : 2014/06/12
=========================================================*/
var rtnary=new Array(1);
var callBackFunc = "";

/**
 * 화면로드 후 초기값 세팅
 */
function initFinish(){
	var pDoc=parent.parent.parent.document;
	hideProcess('WORKING', pDoc);
	setFromToDt(document.form.s_rgst_strdt, document.form.s_rgst_enddt);
}
function doWork(srcName){
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var formObj=document.form;
    var sheetObj=docObjects[0];
    switch(srcName) {
   		case "SEARCHLIST":
   			if(!formValidation()) return;
   			/**if(formObj.s_rgst_strdt.value==""){
		   		alert("조회 시작일자를 입력하세요");
            	break;
			}else if(formObj.s_rgst_enddt.value==""){
		   		alert("조회 종료일자를 입력하세요");
            	break;
			}*/
   			if(!chkSearchCmprPrd(true, form.s_rgst_strdt, form.s_rgst_enddt)){
   				return;
   			}
            //디버깅
            // alert("FormQueryString(formObj)==>"+FormQueryString(formObj));
            //alert(sheetObj.GetSearchXml("searchProgram.clt", FormQueryString(formObj)));
   	   		if( trim(formObj.s_bl_no.value) 	  == "" &&
				trim(formObj.s_rgst_strdt.value) == "" &&
   			    trim(formObj.s_rgst_enddt.value) == "" &&
   			    trim(formObj.s_trdp_cd.value)    == "" ){
   				alert(getLabel('SEA_COM_ALT015') + "\n\n: SEC_FRT_0040.140");
   				formObj.s_rgst_strdt.focus();	
   				return;
   			}
            if(formObj.bnd_clss_cd.value=="O"){            	
            	if(validateForm(sheetObj, formObj, SEARCHLIST, 1)){
			   		formObj.f_cmd.value=SEARCHLIST;
			   		sheetObj.DoSearch("./SEC_FRT_0040GS.clt", FormQueryString(formObj) );
		    	}
            }else if(formObj.bnd_clss_cd.value=="I"){
            	if(validateForm(sheetObj, formObj, SEARCHLIST, 1)){
			   		formObj.f_cmd.value=SEARCHLIST;
			   		sheetObj.DoSearch("./SEC_FRT_0040GS.clt", FormQueryString(formObj) );
		    	}
            }
   	   	break;
       	case "PARTNER_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
	   		rtnary=new Array(1);
	   		rtnary[0]="1";
	   		rtnary[1]="";
	   		rtnary[2]=window;
	   		
	   		callBackFunc = "PARTNER_POPLIST";
  	        modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
  	        
         break;
         case 'NEW':
        	 var v_biz_clss_cd = formObj.biz_clss_cd.value;
        	 var v_air_sea_clss_cd = formObj.air_sea_clss_cd.value;
        	 var v_bnd_clss_cd = formObj.bnd_clss_cd.value;
        	 var v_url = "";
        	 
        	 if(v_air_sea_clss_cd == "S"){
        		 if(v_biz_clss_cd == "M"){
        			 if(v_bnd_clss_cd == "O"){
        				 v_url = "./SEC_FRT_0030.clt"; // OEM
        			 }else{
        				 v_url = "./SEC_FRT_0032.clt"; // OIM
        			 }
        		 }else{
        			 if(v_bnd_clss_cd == "O"){
        				 v_url = "./SEC_FRT_0031.clt"; // OEH
        			 }else{
        				 v_url = "./SEC_FRT_0033.clt"; // OIH
        			 }
        		 }
        	 }else{
        		 if(v_biz_clss_cd == "M"){
        			 if(v_bnd_clss_cd == "O"){
        				 v_url = "./SEC_FRT_0034.clt"; // AEM
        			 }else{
        				 v_url = "./SEC_FRT_0036.clt"; // AIM
        			 }
        		 }else{
        			 if(v_bnd_clss_cd == "O"){
        				 v_url = "./SEC_FRT_0035.clt"; // AEH
        			 }else{
        				 v_url = "./SEC_FRT_0037.clt"; // AIH
        			 }
        		 }
        	 }
        	 
    	    var paramStr=v_url + "?air_sea_clss_cd="+v_air_sea_clss_cd
    	    			  +"&bnd_clss_cd="+v_bnd_clss_cd
    	    			  +"&biz_clss_cd="+v_biz_clss_cd
    	    			  +"&f_cmd=-1"
    	    			  
    	    parent.mkNewFrame('Correction Notice', paramStr);
         break;        	
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
            cal.select(formObj.s_rgst_strdt, formObj.s_rgst_enddt, 'MM-dd-yyyy');
        break;
        case 'DATE2':   //달력 조회 팝업 호출      
             var cal=new ComCalendar();
             cal.select(formObj.s_bkg_dt_tm,  'MM-dd-yyyy');
        break;
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
	var formObj=document.form;
	var s_ofc_cd=formObj.s_ofc_cd.value;
	if(s_ofc_cd != ""){
		formObj.f_ofc_cd.value=s_ofc_cd;
	}
	
	//LHK, 20141029 #44986 [BINEX]Office - All Option
	setOfficeAllOption(formObj.f_ofc_cd);
	
    for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
    /*
    var openMean=formObj.openMean.value;
	if(openMean=="SEC"){
		var pre_ofc_cd=formObj.pre_ofc_cd.value;
		if(pre_ofc_cd != ""){
			formObj.f_ofc_cd.value=pre_ofc_cd;
		}
		doWork('SEARCHLIST');
	}
    */
    //사용자가 저장한 Header 정보를 읽어온다.
    IBS_RestoreGridSetting(formObj.user_id.value, getPageURL(), docObjects[0], false, "RestoreGrid");
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
	           (9, 0, 0, true);
	
	           SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0 } );
	
	           var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	           var headers = [ { Text:getLabel('SEC_FRT_0040_HDR'), Align:"Center"} ];
	           InitHeaders(headers, info);
	
	           var cols = [ {Type:"Seq",      Hidden:0,  Width:50,   Align:"Center",  ColMerge:0,   SaveName:"no",                KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	                  {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:0,   SaveName:"ca_no",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	                  {Type:"Combo",     Hidden:0, Width:130,   Align:"Center",  ColMerge:0,   SaveName:"biz_clss_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	                  {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:0,   SaveName:"bl_no",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	                  {Type:"Date",      Hidden:0,  Width:150,  Align:"Center",  ColMerge:0,   SaveName:"iss_dt_tm",         KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	                  {Type:"Date",      Hidden:0,  Width:150,  Align:"Center",  ColMerge:0,   SaveName:"cfm_dt_tm",         KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	                  {Type:"Text",      Hidden:0,  Width:200,  Align:"Center",  ColMerge:0,   SaveName:"ca_sts_cd_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	                  {Type:"Text",      Hidden:0,  Width:250,  Align:"Left",    ColMerge:0,   SaveName:"ntc_trdp_full_nm",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	                  {Type:"Text",      Hidden:1, Width:150,  Align:"Center",  ColMerge:0,   SaveName:"intg_bl_seq",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 } ];
	            
	           InitColumns(cols);
	
	           SetEditable(1);
//	           InitViewFormat(0, "iss_dt_tm", 		"MM-dd-yyyy");
//	           InitViewFormat(0, "cfm_dt_tm", 		"MM-dd-yyyy");
	           SetActionMenu("Column Hidden|*-|Header Setting Save|Header Setting Reset");
	           SetColProperty("biz_clss_cd", {ComboText:'MB/L|HB/L', ComboCode:'M|H'} );
	           SetSheetHeight(410);
	           sheetObj.SetCountFormat("BOTTOMDATA / TOTALROWS");
	           resizeSheet();
           }
           break;
    }
}

function resizeSheet() {
	ComResizeSheet(docObjects[0]);
}

/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnPopupClick이벤트 발생시.
 * sheet1_OnPopupClick(sheetObj, Row, Col)  <= sheet1번+'_'+IBsheet상에 명시된 Event명+(Sheet Oeject, Row, Column) 
 */
function sheet1_OnDblClick(sheetObj,Row,Col){	
	 var formObj=document.form;
	formObj.s_ca_no.value=sheetObj.GetCellValue(Row,"ca_no");
	formObj.s_intg_bl_seq.value=sheetObj.GetCellValue(Row,"intg_bl_seq");
	formObj.s_biz_clss_cd.value=sheetObj.GetCellValue(Row,"biz_clss_cd");
	 /*
	formObj.f_cmd.value=SEARCH02;
   	doProcess=true;
   	if(formObj.bnd_clss_cd.value=="O"){
    	formObj.action="./SEC_FRT_0030.clt";
    }else if(formObj.bnd_clss_cd.value=="I"){
    	formObj.action="./SEC_FRT_0031.clt";
    }
    formObj.submit();
    */
	
	var v_biz_clss_cd = formObj.biz_clss_cd.value;
	 var v_air_sea_clss_cd = formObj.air_sea_clss_cd.value;
	 var v_bnd_clss_cd = formObj.bnd_clss_cd.value;
	 var v_url = "";
	 
	 if(v_air_sea_clss_cd == "S"){
		 if(v_biz_clss_cd == "M"){
			 if(v_bnd_clss_cd == "O"){
				 v_url = "./SEC_FRT_0030.clt"; // OEM
			 }else{
				 v_url = "./SEC_FRT_0032.clt"; // OIM
			 }
		 }else{
			 if(v_bnd_clss_cd == "O"){
				 v_url = "./SEC_FRT_0031.clt"; // OEH
			 }else{
				 v_url = "./SEC_FRT_0033.clt"; // OIH
			 }
		 }
	 }else{
		 if(v_biz_clss_cd == "M"){
			 if(v_bnd_clss_cd == "O"){
				 v_url = "./SEC_FRT_0034.clt"; // AEM
			 }else{
				 v_url = "./SEC_FRT_0036.clt"; // AIM
			 }
		 }else{
			 if(v_bnd_clss_cd == "O"){
				 v_url = "./SEC_FRT_0035.clt"; // AEH
			 }else{
				 v_url = "./SEC_FRT_0037.clt"; // AIH
			 }
		 }
	 }
	
    var paramStr=v_url + "?air_sea_clss_cd="+v_air_sea_clss_cd+"&bnd_clss_cd="+v_bnd_clss_cd+"&biz_clss_cd="+v_biz_clss_cd
    +"&p_intg_bl_seq="+formObj.s_intg_bl_seq.value+"&s_ca_no="+formObj.s_ca_no.value+"&call_val=SECFRT0040"
    
   	parent.mkNewFrame('Correction Notice', paramStr,"SEC_FRT_0030_SHEET" +formObj.s_ca_no.value + "_" + formObj.s_intg_bl_seq.value 
   			+ "_" + v_biz_clss_cd + "_" + v_air_sea_clss_cd+ "_" + v_bnd_clss_cd);
	//searchSheet3(sheetObj,Row,Col);
}
function getPageURL() {
	return document.getElementById("pageurl").value;
}
function sheet1_OnSelectMenu(sheetObj, MenuString){
	var formObj=document.form;
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
function formValidation(){
	var formObj=document.form;
	if(trim(formObj.s_rgst_strdt.value)!= "" && trim(formObj.s_rgst_enddt.value) != ""){
		if(getDaysBetweenFormat(formObj.s_rgst_strdt,formObj.s_rgst_enddt,"MM-dd-yyyy") < 0){
			alert(getLabel('FMS_COM_ALT033') + "\n\n: SEC_FRT_0040.306");
			formObj.s_rgst_enddt.focus();
			return false;
		}
	}
	return true;
}
//Calendar flag value
var firCalFlag=false;
/**
 * code name select
 */
function codeNameAction(str, obj, tmp){
	var formObj=document.form;
	if(obj.value!=""){
		if(tmp=="onKeyDown"){
			if (event.keyCode == 13){
				var s_code=obj.value;
				CODETYPE=str;
				var sub_str=str.substring(0,8);
				if(sub_str=="partner_"){
					str='trdpcode'
				}
				ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+str+'&s_code='+s_code, './GateServlet.gsl');
			}
		} else if ( tmp == "onBlur" ) {
			var s_code=obj.value;
			CODETYPE=str;
			var sub_str=str.substring(0,8);
			if(sub_str=="partner_"){
				str='trdpcode'
			}
			ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+str+'&s_code='+s_code, './GateServlet.gsl');
		}
	}else{
		if(formObj.s_trdp_cd.value ==""){
			formObj.s_trdp_full_nm.value="";
		}
	}
}
//코드표시 Ajax
function dispCodeNameAjaxReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	var formObj=document.form;
	if(doc[0]=='OK'){
		if(typeof(doc[1]) != 'undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@@;');		
			var masterVals=rtnArr[0].split('@@^');
			if(CODETYPE =="partner_trsp"){
				formObj.s_trdp_cd.value=masterVals[0];//trdp_cd
//				formObj.s_trdp_full_nm.value = masterVals[3];//eng trdp name				
				formObj.s_trdp_full_nm.value=masterVals[16];//Local trdp name
			}
		}else{
			if(CODETYPE =="partner_trsp"){
				formObj.s_trdp_cd.value="";//trdp_cd
				formObj.s_trdp_full_nm.value="";//lgl_addr
				formObj.s_trdp_cd.focus();
			}
		}
	}else{
		//Error Errupt!	
		alert(getLabel('FMS_COM_ERR001'));		
	}
}

function PARTNER_POPLIST(rtnVal){
	var formObj=document.form;
   	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.s_trdp_cd.value=rtnValAry[0];//trdp_cd
//				formObj.s_trdp_short_nm.value = rtnValAry[1];//shrt_nm
		formObj.s_trdp_full_nm.value=rtnValAry[10];//full_nm
		//rtnValAry[3];//pic_nm
		//rtnValAry[4];//pic_phn
		//rtnValAry[5];//pic_fax
		//rtnValAry[6];//pic_eml
		//rtnValAry[7];//pic_desc  	
	}
   }