/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : ACC_JOR_0020.js
*@FileTitle  : Deposit Journal List
*@author     : CLT
*@version    : 1.0
*@since      : 2014/06/20
=========================================================*/
var rtnary=new Array(1);
var callBackFunc = "";
//Calendar flag value
var firCalFlag=false;

function doWork(srcName){
	if(!btnGetVisible(srcName)){	//버튼의 단축키 사용가능여부 체크
		return;
	}
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var sheetObj2=docObjects[1];
    var formObj=document.frm1;
    switch(srcName) {
	   case "DEFAULT":
	   break;
	   break;   
       case "SEARCH":
    	   if(!fnValidation()) return;
    	   //sheetObj.ShowDebugMsg = true;
            formObj.f_cmd.value=SEARCHLIST;
            //검증로직
            //formObj.s_amt_fr.value=removeComma(formObj.s_amt_fr.value);
            //formObj.s_amt_to.value=removeComma(formObj.s_amt_to.value);
            docObjects[0].DoSearch("./ACC_INV_0150GS.clt", FormQueryString(formObj) );
       break;
       case "RE_ISS" :
    		var formObj=document.frm1;
    		var selRow=sheetObj.GetSelectRow();
   			var paramStr="./ACC_INV_0140.clt?f_cmd=-1&f_tax_inv_seq="+sheetObj.GetCellValue(selRow, "tax_inv_seq")+"&f_re_iss=Y";
   		    parent.mkNewFrame('Customer Payment', paramStr,"ACC_INV_0140_SHEET_" + sheetObj.GetCellValue(selRow, "tax_inv_seq"));
   		    
    	   break;       
       case "DELETE" :
    	   var formObj=document.frm1;
    	   var selRow=sheetObj.GetSelectRow();
    	   if(confirm(getLabel('FMS_COM_CFMDEL'))){
    		   formObj.f_cmd.value=REMOVE;
    		   formObj.f_tax_inv_seq.value =sheetObj.GetCellValue(selRow, "tax_inv_seq");
    		   docObjects[0].DoAllSave("./ACC_INV_0150GS.clt", FormQueryString(formObj), "ibflag", true);
    	   }
    	   break;
       case "PRINT" :
    	   fn_print();
    	   break;
       case "CUSTOMER_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
	   		rtnary=new Array(1);
	   		rtnary[0]="";
//	   		rtnary[1]=formObj.s_cust_nm.value;
//	   		rtnary[2]=window;
	   		callBackFunc = "CUSTOMER_POPLIST";
	   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
	   	break;
       case "CUSTOMER_NAME"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
	   		rtnary=new Array(1);
	   		rtnary[0]="";
	   		rtnary[1]=formObj.s_cust_nm.value;
	   		rtnary[2]=window;
	   		callBackFunc = "CUSTOMER_POPLIST";
	   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
	   	break;	   
       case "NEW" :
    		//#3291 [PBS] Tax Invoice 수정사항 처리
   			var formObj=document.frm1;
			var paramStr="./ACC_INV_0140.clt";
		    parent.mkNewFrame('Customer Payment', paramStr,"ACC_INV_0140_SHEET_01");	   
    	   break;
       case "CLEAR" :
    	   //#3291 [PBS] Tax Invoice 수정사항 처리
    	   var formObj=document.frm1;
    	   //docObjects[0].RemoveAll();
    	   formObj.s_ref_no.value = '';
    	   formObj.s_cust_cd.value = '';
    	   formObj.s_cust_nm.value = '';
    	   formObj.s_tax_inv_no.value = '';
    	   formObj.s_curr.value = '';
    	   formObj.s_dept.value = '';
    	   formObj.s_bl_no.value = '';
    	   formObj.s_inv_tit.value = '';
    	   formObj.s_issuer.value = '';
    	   formObj.s_inv_sts.value = 'C';  //SAVE
    	   formObj.s_deposit_sts.value = '';
     	   
    	   formObj.s_iss_strdt.value=FROMDATE;
    	   formObj.s_iss_enddt.value=TODAY;        	    
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
	doWork('SEARCH', '');
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function viewCntChg(){
	document.forms[0].f_CurPage.value=1;
	doWork('SEARCH');
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function searchList(){
	document.forms[0].f_CurPage.value=1;
	doWork('SEARCH');
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
	//사용자가 저장한 Header 정보를 읽어온다.
    IBS_RestoreGridSetting(formObj.user_id.value, getPageURL(), docObjects[0], false, "RestoreGrid");
    //오늘일자구하기
    var now=new Date();
    var preDt=new Date(Date.parse(now) - 90 * 1000 * 60 * 60 * 24);
    var year=now.getFullYear(); 			
    var month=now.getMonth() + 1;
    var date=now.getDate(); 	
    var preyear=preDt.getFullYear();
    var premonth=preDt.getMonth() + 1;
    var predate=preDt.getDate();
    if(month < 10){
    	month="0"+(month);
    }
    if(date < 10){
    	date="0"+date;
    }
    if(premonth < 10){
    	premonth="0"+(premonth);
    }
    if(predate < 10){
    	predate="0"+predate;
    }
    FROMDATE=premonth + "-" + predate + "-" + preyear;
    TODAY=month + "-" + date + "-" + year;
    formObj.s_iss_strdt.value=FROMDATE;
    formObj.s_iss_enddt.value=TODAY;
}
function RestoreGrid() {
	doWork("SEARCH");
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
	 switch(MenuString){}
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
             var cnt=0;
             SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
             var info    = { Sort:1, ColMove:1, HeaderCheck:0, ColResize:1 };
             var headers = [ { Text:getLabel('ACC_INV_0150_HDR_1'), Align:"Center"} ];
             InitHeaders(headers, info);
             var cols = [ {Type:"Seq",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:0,   SaveName:"no",               KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
						{Type:"Text", Hidden:0,  Width:150,   Align:"Center",  ColMerge:1,   SaveName:"bl_no",    KeyField:0,   CalcLogic:"",   Format:"",    PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
						{Type:"Text", Hidden:0,  Width:120,   Align:"Center",  ColMerge:1,   SaveName:"trdp_nm",    KeyField:0,   CalcLogic:"",   Format:"",    PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
						{Type:"Text", Hidden:0,  Width:120,   Align:"Center",  ColMerge:1,   SaveName:"tax_inv_tit",    KeyField:0,   CalcLogic:"",   Format:"",    PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
						{Type:"Text", Hidden:0,  Width:120,   Align:"Center",  ColMerge:1,   SaveName:"tax_inv_no",    KeyField:0,   CalcLogic:"",   Format:"",    PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
						{Type:"Date", Hidden:0,  Width:120,   Align:"Center",  ColMerge:1,   SaveName:"iss_dt",    KeyField:0,   CalcLogic:"",   Format:"",    PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
						{Type:"Text", Hidden:0,  Width:120,   Align:"Center",  ColMerge:1,   SaveName:"vol",    KeyField:0,   CalcLogic:"",   Format:"",    PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
						{Type:"Text", Hidden:0,  Width:120,   Align:"Center",  ColMerge:1,   SaveName:"pol",    KeyField:0,   CalcLogic:"",   Format:"",    PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
						{Type:"Text", Hidden:0,  Width:120,   Align:"Center",  ColMerge:1,   SaveName:"pod",    KeyField:0,   CalcLogic:"",   Format:"",    PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
						{Type:"Text", Hidden:0,  Width:120,   Align:"Center",  ColMerge:1,   SaveName:"inv_sum_amt",    KeyField:0,   CalcLogic:"",   Format:"",    PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
						{Type:"Text", Hidden:0,  Width:120,   Align:"Center",  ColMerge:1,   SaveName:"",    KeyField:0,   CalcLogic:"",   Format:"",    PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
						{Type:"Text", Hidden:0,  Width:120,   Align:"Center",  ColMerge:1,   SaveName:"tax_sum_amt",    KeyField:0,   CalcLogic:"",   Format:"",    PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
						{Type:"Text", Hidden:0,  Width:120,   Align:"Center",  ColMerge:1,   SaveName:"void_yn",    KeyField:0,   CalcLogic:"",   Format:"",    PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
						{Type:"Combo", Hidden:0,  Width:120,   Align:"Center",  ColMerge:1,   SaveName:"tax_inv_tp",    KeyField:0,   CalcLogic:"",   Format:"",    PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
						{Type:"Text", Hidden:0,  Width:120,   Align:"Center",  ColMerge:1,   SaveName:"",    KeyField:0,   CalcLogic:"",   Format:"",    PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
						{Type:"Text", Hidden:1,  Width:120,   Align:"Center",  ColMerge:1,   SaveName:"tax_inv_seq",    KeyField:0,   CalcLogic:"",   Format:"",    PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
						{Type:"Text", Hidden:1,  Width:120,   Align:"Center",  ColMerge:1,   SaveName:"tax_inv_sts_cd",    KeyField:0,   CalcLogic:"",   Format:"",    PointCount:0,   UpdateEdit:0,   InsertEdit:0 }
		             	//<!-- paging 처리 -->
		             	//{Type:"Text",      Hidden:1,  Width:80,   Align:"Center",  ColMerge:0,   SaveName:"Indexing",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0}
             	 ];
             
             InitColumns(cols);
             SetEditable(1);
             //InitViewFormat(0, "post_dt", 		"MM-dd-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
             //InitViewFormat(0, "org_post_dt", 	"MM-dd-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
             //InitViewFormat(0, "clr_dt", 		"MM-dd-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
             //InitViewFormat(0, "void_dt", 		"MM-dd-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
             SetColProperty('tax_inv_tp', {ComboText:' |'+TAX_INV_TYPE_NM, ComboCode:' |'+TAX_INV_TYPE_CD} );
             SetActionMenu("Column Hidden|*-|Header Setting Save|Header Setting Reset");
             SetSheetHeight(500);
             resizeSheet();
           }                                                      
           break;
           

     }
}

function resizeSheet() {
	ComResizeSheet(docObjects[0]);
}

//조회 후 페이지징 표시
function sheet1_OnSearchEnd(sheetObj, errMsg){
	var formObj=document.frm1;

} 
//등록/수정/삭제 후 페이지징 표시
function sheet1_OnSaveEnd(sheetObj, errMsg){
	var formObj=document.frm1;
	for(var i=1; i<=sheetObj.LastRow();i++){}
	//Save success!
	if(errMsg == undefined  || errMsg==null || errMsg =='' ){
		//alert(getLabel('FMS_COM_NTYCOM'));
		/*Changed the Alert Message Type.130824 - LHK 20130822 #19443 Save & Complete Alert message 변경 */
		doWork('SEARCH');
		showCompleteProcess();
	};
}
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnClick이벤트 발생시.
 */
function sheet1_OnClick(sheetObj,Row,Col){}
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnClick이벤트 발생시.
 */
function sheet1_OnDblClick(sheetObj,Row,Col){
	var formObj=document.frm1;
	if(sheetObj.ColSaveName(Col) != "post_dt" && sheetObj.ColSaveName(Col) != "check_flag"){
		var paramStr="./ACC_INV_0140.clt?f_cmd=-1&f_tax_inv_seq="+sheetObj.GetCellValue(Row, "tax_inv_seq");
	    parent.mkNewFrame('Customer Payment', paramStr,"ACC_INV_0140_SHEET_" + sheetObj.GetCellValue(Row, "tax_inv_seq"));
	}
}
function sheet1_OnChange(sheetObj,Row,Col){}
/**
달력팝업을 호출한다.
**/
function doDisplay(doWhat,formObj){
    switch(doWhat){
	    case 'DATE1':   //달력 조회 From ~ To 팝업 호출 
	    	var cal=new ComCalendarFromTo();
	        cal.displayType="date";
	        cal.select(formObj.s_iss_strdt, formObj.s_iss_enddt,  'MM-dd-yyyy');
	    break;
    }
}


//화면 클리어
function clearAll(){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	var collTxt=document.getElementsByTagName("INPUT");   // document 상의 모든 INPUT 태그 요소들을 컬렉션으로 구하고...
	for(var i=0; i<collTxt.length; i++){
	  if(collTxt[i].type == "text" || collTxt[i].type == "hidden"){
		  collTxt[i].value="";
	  }           
	}
	//formObj.s_post_strdt.value=FROMDATE;
	//formObj.s_post_enddt.value=TODAY;

	sheetObj.RemoveAll();
}

//말일구하기
function getEndDate(datestr){
	datestr=datestr.replaceAll("-","");
    var yy=Number(datestr.substring(4,8));
    var mm=Number(datestr.substring(0,2));
    //윤년 검증
    var boundDay="";
    if(mm != 2){
       var mon=new Array(31,28,31,30,31,30,31,31,30,31,30,31);
       if(mm < 10){
    	   mm="0"+mm;
       }
       boundDay=mm+"-"+mon[mm-1]+"-"+yy;
    } else {
      if (yy%4 == 0 && yy%100 != 0 || yy%400 == 0){
    	  if(mm < 10){
       	   mm="0"+mm;
          }
          boundDay=mm+"-"+29+"-"+yy;
      }else {
    	  if(mm < 10){
       	   mm="0"+mm;
          }
          boundDay=mm+"-"+28+"-"+yy;
      }
    }
    return boundDay;  
}


function fnValidation(){
	return true;
}


/**
 * code name select
 */
function fn_codeNameAction(str, obj, tmp){
	var formObj=document.frm1;
	var s_code=obj.value.toUpperCase();		
	var s_type="";
	if ( s_code != "" ) {
		if ( tmp == "onKeyDown" ) {
			if (event.keyCode == 13){
				CODETYPE=str;	
				s_type="trdpCode";
				if(CODETYPE=="CUSTOMER"){
					ajaxSendPost(fn_trdpCdReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
				}
			}
		} else if ( tmp == "onBlur" ) {
			if ( s_code != "" ) {
				CODETYPE=str;		
				s_type="trdpCode";
				if(CODETYPE=="CUSTOMER"){
					ajaxSendPost(fn_trdpCdReq,  'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
				}
			}
		}
	}else{
		formObj.s_cust_cd.value="";//trdp_cd  AS param1
		formObj.s_cust_nm.value="";//eng_nm   AS param2
	}
}

/**
 * Trade Partner 관린 코드조회
 */
function fn_trdpCdReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@@;');
			var masterVals=rtnArr[0].split('@@^');	
			if(CODETYPE =="CUSTOMER"){
				formObj.s_cust_cd.value=masterVals[0];		//trdp_cd  AS param1
				formObj.s_cust_nm.value=masterVals[3];		//eng_nm   AS param2
			}
		}else{
			if(CODETYPE =="CUSTOMER"){
				formObj.s_cust_cd.value="";//trdp_cd  AS param1
				formObj.s_cust_nm.value="";//eng_nm   AS param2
			}
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}

function CUSTOMER_POPLIST(rtnVal){
	var formObj = document.frm1;
 	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		 	return;
		}else{
			var rtnValAry=rtnVal.split("|");
			formObj.s_cust_cd.value=rtnValAry[0];		//trdp_cd  AS param1
			formObj.s_cust_nm.value=rtnValAry[2];		//eng_nm   AS param2
		} 
 }


function custEnterAction(obj, type){
	var formObj=document.frm1;
	if (event.keyCode == 13){
		if(type == "CUSTOMER"){
			doWork("CUSTOMER_POPLIST");
		}else if(type == "CUSTOMER2"){
			doWork("CUSTOMER_POPLIST2");
		}else if(type == "CUSTOMER_NAME"){
			doWork("CUSTOMER_NAME");
		}
	}
}

function fn_print(){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
  	var sRow=sheetObj.GetSelectRow();
  	formObj.title.value='Tax Invoice';
  	formObj.file_name.value='tax_invoice_01.mrd';
  	
  	//if(sheetObj.GetCellValue(sRow, "tax_inv_seq") != '-1'){
  		var param="[" +  sheetObj.GetCellValue(sRow, "tax_inv_seq")  + ']';					// [1]
  		
  		formObj.rd_param.value=param;
  		popPOST(frm1, 'RPT_RD_0010.clt', 'popTest', 1025, 740);	
  		
  	//}else{
  		
  	//}
  	
	
}