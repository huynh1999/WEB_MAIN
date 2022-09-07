/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : UserInfoMng
*@FileTitle  : 
*@author     : CLT
*@version    : 1.0
*@since      : 2014/06/04
=========================================================*/ 

var docObjects=new Array();
var sheetCnt=0;
/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
function loadPage() {
	 
    for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
    
	var formObj=document.form; 
	// #535: [SBS] 다국어 처리 V1.0 
	formObj.use_lang_cd.value = formObj.h_languageType.value;
    
 	doWork('SEARCHLIST');
 	doWork('SEARCHLIST01');
	if(formObj.save_yn.value == 'Y'){
		//alert(getLabel('FMS_COM_NTYCOM'));
		/* LHK 20130822 #19443 Save & Complete Alert message 변경 */
		showCompleteProcess();
		location.reload();
	}
}
/**
 * IBSheet Object를 배열로 등록
 * 향후 다른 항목들을 일괄처리할 필요가 있을 때 배열로 담는 프로세스를 추가할 수 있다
 * 배열은 소스 상단에 정의
 */
function setDocumentObject(sheet_obj){
   docObjects[sheetCnt++]=sheet_obj;
}

function doWork(srcName){
	if(!btnGetVisible(srcName)){	//버튼의 단축키 사용가능여부 체크
		return;
	}
    var formObj=document.forms[0];
    var sheetObj=docObjects[0];
    var sheetObj1=docObjects[1];
    try {
        switch(srcName) {
           case "MODIFY":
        	   if(checkValues(formObj)){
        	       if(confirm(getLabel('FMS_COM_CFMSAV'))){
				       formObj.f_cmd.value=MODIFY;
				       sheetObj.DoAllSave("./UserInfoMng.clt", FormQueryString(formObj), true);
	               }
			       
        	   }
           break;
           case "btn_ctrt_no":	
//   			var sUrl="./ContractRoutePopup.clt?ctrt_nm="+formObj.dflt_wh_ctrt_nm.value;
        	   var sUrl="./ContractRoutePopup.clt";
   			   callBackFunc = "setCtrtNoInfo";
   			   modal_center_open(sUrl, callBackFunc, 900,620,"yes");
   			break;
   			
           case "SEARCHLIST": 
               formObj.f_cmd.value=SEARCHLIST; 
               sheetObj.DoSearch("UserInfoMngGS.clt", FormQueryString(formObj) );                
               break;
           case "ROWADD_RPT":
	   			var intRows = sheetObj1.LastRow() + 1;
	   			sheetObj1.DataInsert(intRows);
	   			break;
           case "MODIFY_EML":
   			if (sheet2.ColValueDup('rpt_biz_tp|rpt_biz_sub_tp')==-1) {
   				if(confirm(getLabel('FMS_COM_CFMSAV'))){
   					formObj.f_cmd.value=MODIFY01;
   					sheetObj1.DoSave("EmlCtntGS.clt", FormQueryString(formObj),"ibflag",false);
   				}
   			}else{
   				alert(getLabel('SYS_COM_ALT009'));
   			}
   			break;
           case "SEARCHLIST01":
        	   formObj.f_cmd.value=SEARCHLIST01;
        	   sheetObj1.DoSearch("EmlCtntGS.clt", FormQueryString(formObj) );
        	   break;
        } // end switch
    }catch(e) {
        if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	alert(getLabel('FMS_COM_ERR002') + "\n\n: UserInfoMng.001");
        } 
        else{
        	//System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001') + " - " + e + "\n\n: UserInfoMng.002");
        }
    }
}

function setCtrtNoInfo(aryPopupData){
	var formObj=document.form;
    if (aryPopupData == "" || aryPopupData == "undefined" || aryPopupData == undefined) {
	 	return;
	}else{
		  var rtnValAry=aryPopupData.split("|");
		   formObj.dflt_wh_ctrt_no.value=rtnValAry[0];
		   formObj.dflt_wh_ctrt_nm.value=rtnValAry[1];
	}
}

function checkValues(fName){
	return true;
    //Min/Maxlength를 확인함.
	if(checkInputVal(fName.usrid.value,             0, 12, "T", 'ID')!='O'){
    	fName.usrid.focus();
		return false;
	}else if(checkInputVal(fName.eng_usr_nm.value,  0,200, "T", getLabel('ITM_USRNMENG'))!='O'){
	   	fName.eng_usr_nm.focus();
		return false;
	}else if(checkInputVal(fName.locl_usr_nm.value, 0, 50, "T", getLabel('ITM_USRNMLOCAL'))!='O'){
	   	fName.locl_usr_nm.focus();
		return false;
	}else if(checkInputVal(fName.phn.value,         0, 30, "T", getLabel('ITM_PHN'))!='O'){
	   	fName.phn.focus();
		return false;
	}else if(checkInputVal(fName.eml.value,         0,100, "T", getLabel('ITM_EML'))!='O'){
	   	fName.eml.focus();
		return false;
	}else if(checkInputVal(fName.addr.value,       00,200, "T", getLabel('ITM_ADDR'))!='O'){
	   	fName.addr.focus();
		return false;
	}else if(checkInputVal(fName.rpt_file_path.value,    0,250, "T", getLabel('ITM_RPT_PATH'))!='O'){
		fName.addr.focus();
		return false;
	}else{
		return true;
	}
	//외부 Mail 사용시
	/*
	if(fName.eml_svc_tp[1].checked){
		if(checkInputVal(fName.eml_id.value,   3,  30, "T", getLabel('ITM_EXTEML'))!='O'){
		   	fName.eml_id.focus();
			return false;
		}else if(checkInputVal(fName.eml_pass.value,   3,  30, "T", getLabel('ITM_EXTPWD'))!='O'){
		   	fName.eml_pass.focus();
			return false;
		}else{
	    	return true;
	    }
	}else{
		return true;
	}
	*/
}
function dispTbl(dispType){
	if(dispType=='D'){
		document.forms[0].eml_id.value='';
		document.forms[0].eml_pass.value='';
		extMlInfo.style.display='none';
	}else{
		extMlInfo.style.display='block';		
	}
}

function getCtrtInfo(obj){
	var formObj=document.form;
	if(obj.value ==""){
		formObj.dflt_wh_ctrt_no.value="";
		formObj.dflt_wh_ctrt_nm.value="";
		return;
	}
	ajaxSendPost(resultCtrtInfo, 'reqVal', '&goWhere=aj&bcKey=searchCtrtInfo&ctrt_no='+obj.value, './GateServlet.gsl');
}

function resultCtrtInfo(reqVal){
	var doc = getAjaxMsgXML(reqVal);
	var formObj  = document.form;
	
	if(doc[0]=='OK' && typeof(doc[1])!='undefined'){
		var rtnArr = doc[1].split('^@');
		if(rtnArr[0]!=""){
			formObj.dflt_wh_ctrt_nm.value = rtnArr[0];
		}else{
			formObj.dflt_wh_ctrt_no.value = "";
			formObj.dflt_wh_ctrt_nm.value = "";
		}
	}else{
		formObj.dflt_wh_ctrt_no.value = "";
		formObj.dflt_wh_ctrt_nm.value = "";
	}
}

//--------------------------------------------------------------------------------------------------------------
//Tab 설정
//--------------------------------------------------------------------------------------------------------------
var currTab;
function goTabSelect(isNumSep) {
 
	var tabObjs = document.getElementsByName('tabLayer');
	if( isNumSep == "01" ) {
	
		currTab = isNumSep;	//탭상태저장 
		tabObjs[0].style.display = 'inline';
		tabObjs[1].style.display = 'none';  
	 
	}else if( isNumSep == "02" ) {
			currTab = isNumSep;	//탭상태저장
			tabObjs[0].style.display = 'none';
			tabObjs[1].style.display = 'inline'; 
	}
	
}

//--------------------------------------------------------------------------------------------------------------
//IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
 

function initSheet(sheetObj,sheetNo) { 
    switch(sheetNo) {
		case 1:      //IBSheet1 init
		    with (sheetObj) {
			      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
			      var info    = { Sort:1, ColMove:0, HeaderCheck:0, ColResize:0 };
			      var headers = [ { Text:getLabel('USERORDERBY_GRANT_HDR'), Align:"Center"} ];
			      InitHeaders(headers, info);

			      var cols = [ {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"ibflag" } ,
			             {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:0,   SaveName:"pgm_nm",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0 },
			             {Type:"Combo",     Hidden:0, Width:100,   Align:"Center",  ColMerge:0,   SaveName:"attr1",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0 },
			             {Type:"Combo",     Hidden:0, Width:100,   Align:"Center",  ColMerge:0,   SaveName:"attr2",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0 },
			             {Type:"Combo",     Hidden:0, Width:100,   Align:"Center",  ColMerge:0,   SaveName:"attr3",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0 },
			             {Type:"Combo",     Hidden:0, Width:100,   Align:"Center",  ColMerge:0,   SaveName:"attr4",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0 },
			             {Type:"Text",      Hidden:1,  Width:0,  Align:"Left",    ColMerge:0,   SaveName:"pgm_url",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0 },
			             {Type:"Text",      Hidden:1,  Width:0,  Align:"Left",    ColMerge:0,   SaveName:"pgm_usr_id",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0 }
			             ];
			       
			      InitColumns(cols);
			      SetEditable(1); 

				  
			      SetSheetHeight(450);
		   }                                                      
		break;
		case 2:     
			with (sheetObj) {
            SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0, FrozenCol:0 } );

            var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
            var headers = [ { Text:getLabel('USERMGMT_HDR4'), Align:"Center"} ];
            InitHeaders(headers, info);

            var cols = [ {Type:"DelCheck", Hidden:0, Width:60, Align:"Center", ColMerge:0, SaveName:"del_flg" },
                 {Type:"Status", Hidden:1, Width:0, Align:"Center", ColMerge:0, SaveName:"ibflag" },
                 {Type:"Combo",      Hidden:0,  Width:100,  Align:"Center",    ColMerge:0,UpdateEdit:1,InsertEdit:1,   SaveName:"rpt_biz_tp",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0 },
	             {Type:"Combo",      Hidden:0,  Width:100,  Align:"Center",    ColMerge:0,UpdateEdit:1,InsertEdit:1,   SaveName:"rpt_biz_sub_tp",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0 },
	             {Type:"Text",     Hidden:0, Width:600,   Align:"Left",  ColMerge:0,UpdateEdit:1,InsertEdit:1,   SaveName:"eml_ctnt",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,    MultiLineText:1 },
	             {Type:"Combo",     Hidden:0, Width:80,   Align:"Center",  ColMerge:0,UpdateEdit:1,InsertEdit:1,   SaveName:"eml_type",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0 },
	             {Type:"CheckBox",	Hidden:0,	Width:80,	Align:"Center",	ColMerge:0,	SaveName:"use_flg",			KeyField:0,		CalcLogic:"",	Format:"",			PointCount:0,	UpdateEdit:1,	InsertEdit:1, DefaultValue:"1"},
                 {Type:"Text",     Hidden:0, Width:80,   Align:"Center",  ColMerge:0,UpdateEdit:1,InsertEdit:1,   SaveName:"eml_rmk",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,    MultiLineText:1}, 
	             {Type:"Text",     Hidden:1, Width:0,   Align:"Center",  ColMerge:0,UpdateEdit:0,InsertEdit:0,   SaveName:"rpt_biz_tp_old",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0 },
	             {Type:"Text",     Hidden:1, Width:0,   Align:"Center",  ColMerge:0,UpdateEdit:0,InsertEdit:0,   SaveName:"rpt_biz_sub_tp_old",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0 },
	             ];
              InitColumns(cols);
		      SetEditable(1);
		      SetSheetHeight(450);
		      SetEditArrowBehavior(0);
		      SetColProperty('eml_type',{ComboText:'HTML|Text',ComboCode:'HTML|Text'});
		      SetColProperty('rpt_biz_tp',{ComboText:rpt_biz_tp_nm,ComboCode:rpt_biz_tp_cd});
		      SetColProperty('rpt_biz_sub_tp',{ComboText:rpt_biz_sub_tp_nm,ComboCode:rpt_biz_sub_tp_cd});
            }                                           
	 
    }
}


function sheet1_OnSaveEnd(sheetObj, errMsg){ 
		showCompleteProcess();  
		//location.reload();
		 
		
		doWork("SEARCHLIST");
}

function sheet1_OnSearchEnd(){
	var formObj=document.frm1;
	var sheetObj=docObjects[0]; 
	for(sheetCnt=1; sheetCnt<=sheetObj.LastRow();sheetCnt++){
		var comboInfo = "";
		var pgm_url = sheetObj.GetCellValue(sheetCnt,"pgm_url");
		//alert(pgm_url);
		if (pgm_url == "./ACC_INV_0032.clt" || pgm_url == "./ACC_JOR_0020.clt" || pgm_url == "./ACC_JOR_0040.clt") {
   			
			comboInfo = {ComboText:"|Post Date|Update Date", ComboCode:"|POS|MOD"}; 
			
   		}else if (pgm_url == "./SEE_BMD_0060.clt" || pgm_url == "./SEE_BMD_0070.clt" || pgm_url == "./SEI_BMD_0070.clt"
   			|| pgm_url == "./SEI_BMD_0060.clt" || pgm_url == "./AIE_BMD_0060.clt"
   				|| pgm_url == "./AIE_BMD_0070.clt" || pgm_url == "./AII_BMD_0070.clt" || pgm_url == "./AII_BMD_0060.clt") { 
   			
			comboInfo = {ComboText:"|Post Date|Update Date|ETD|ETA|Date Issued", ComboCode:"|POS|MOD|ETD|ETA|ISS"};
   		}else if (pgm_url == "./ACC_INV_0040.clt" ) { // 20170116 신규 추가 조건
   			
			comboInfo = {ComboText:"|Post Date|Update Date|ETD|ETA|Currency|Invoice No|Filing No|HB/L No|Bill to", ComboCode:"|POS|MOD|ETD|ETA|CUR|INV|FIL|HBL|BIL"};
			
   		}else{ 
   			
			comboInfo = {ComboText:"|Post Date|Update Date|ETD|ETA", ComboCode:"|POS|MOD|ETD|ETA"};			
   		}
   		
   		sheetObj.CellComboItem(sheetCnt,"attr1",comboInfo);
		sheetObj.CellComboItem(sheetCnt,"attr2",comboInfo);
		sheetObj.CellComboItem(sheetCnt,"attr3",comboInfo);
		sheetObj.CellComboItem(sheetCnt,"attr4",comboInfo); 
		
	}
}


function sheet1_OnChange(sheetObj,Row,Col){
	var formObj=document.frm1;	
	
	
	var attr1 = sheetObj.GetCellValue(Row, 'attr1');
	var attr2 = sheetObj.GetCellValue(Row, 'attr2');
	var attr3 = sheetObj.GetCellValue(Row, 'attr3');
	var attr4 = sheetObj.GetCellValue(Row, 'attr4');
	var pgm_nm = sheetObj.GetCellValue(Row, 'pgm_nm'); 
	
	if ((attr4 != "") && (attr1 == "" || attr2 == "" || attr3 == "")){
		//alert(pgm_nm +" orderby4 앞부터 입력");
		//select "OrderBy3" first.
		sheetObj.SetCellValue(Row, 'attr4','');
	}else if ((attr3 != "") && (attr2 == "" || attr1 == "")){
		//alert(pgm_nm +" orderby3 앞부터 입력"); 
		////select "OrderBy2" first.
		sheetObj.SetCellValue(Row, 'attr3','');
		sheetObj.SetCellValue(Row, 'attr4','');
	}else if ((attr2 != "") && (attr1 == "")){
		//alert(pgm_nm +" orderby2 앞부터 입력"); 
		//select "OrderBy1" first.
		sheetObj.SetCellValue(Row, 'attr2','');
		sheetObj.SetCellValue(Row, 'attr3','');
		sheetObj.SetCellValue(Row, 'attr4','');
	} 
	if ((attr4 != "") && (attr1 == attr4 || attr2 == attr4 || attr3 == attr4)){
		//alert(pgm_nm +" orderby1 중복"); 
		// value of OrderBy1 is duplicated on pgm_nm
		// duplicated value of OrderBy1 at pgm_nm  
		sheetObj.SetCellValue(Row, 'attr4','');
	}else if  ((attr3 != "") && (attr1 == attr3 || attr2 == attr3 || attr4 == attr3)){
		//alert(pgm_nm +" orderby2 중복");
	//OrderBy2 is duplicated on pgm_nm 
		sheetObj.SetCellValue(Row, 'attr3','');
		sheetObj.SetCellValue(Row, 'attr4','');
	}else if  ((attr2 != "") && (attr1 == attr2 || attr3 == attr2 || attr4 == attr2)){
		//alert(pgm_nm +" orderby3 중복");
		sheetObj.SetCellValue(Row, 'attr2','');
		sheetObj.SetCellValue(Row, 'attr3','');
		sheetObj.SetCellValue(Row, 'attr4','');
	}
	
}	
//OFVFOUR-7227 [KING FREIGHT NY] APPLYING LINK TO PROFILE EMAIL BODY	 
function sheet2_OnSaveEnd(){
	doWork('SEARCHLIST01');
}











