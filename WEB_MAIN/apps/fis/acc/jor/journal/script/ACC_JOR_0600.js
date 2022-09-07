//=========================================================
//*@FileName   : ACC_JOR_0600.jsp
//*@FileTitle  : Payment History
//*@Description: Payment History
//*@author     : wyjoung - Cyberlogitec
//*@version    : 1.0 - 2013/11/01
//*@since      : 2013/11/01
//
//*@Change history: LHK, 2014/04/09 
//*@author     : Tuan.Chau
//*@version    : 2.0 - 2014/07/09
//*@since      : 2014/07/09
//=========================================================

var rtnary=new Array(1);
var callBackFunc = "";
//OFVFOUR-6967 [STAR MEX] OPUS PAYMENT LV2 HISTORY - TAX INVOICE NO 칼럼 추가 (Zen#4494)
var TAX_COL = "N";
function doWork(srcName){
	// if(!btnVisible(srcName)){//버튼의 단축키 사용가능여부 체크
	// 	return;
	// }
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var formObj=document.frm1;
    switch(srcName) {
	   case "DEFAULT":
	   break;
       case "SEARCHLIST":
	   	    if(formObj.f_cust_flag[0].checked){
		    	formObj.s_cust_flag.value="A";	//Vendor_Customer
		    }else{
		    	formObj.s_cust_flag.value="B";	//Account_Group_ID
		    }
	   	    if(formObj.f_inv_sts_cd[0].checked){
		    	formObj.s_inv_sts_cd.value="A";	//ALL
		    }else{
		    	formObj.s_inv_sts_cd.value="O";	//OPEN
		    }
           formObj.f_cmd.value=SEARCHLIST;
           sheetObj.DoSearch("./ACC_JOR_0600GS.clt", FormQueryString(formObj) );
       break;
        case "EXCEL":
        	if(sheetObj.RowCount() < 1){//no data	
    			ComShowCodeMessage("COM132501");
    		}else{
    			sheetObj.Down2Excel( {DownCols: makeHiddenSkipCol(sheetObj), SheetDesign:1,Merge:1 });
    		}
        break;
		case "ALL_DPT":
			formObj.f_dpt_tp_1.checked=true;
			formObj.f_dpt_tp_2.checked=true;
			formObj.f_dpt_tp_3.checked=true;
			formObj.f_dpt_tp_4.checked=true;
			formObj.f_dpt_tp_5.checked=true;
		break;
		case "CLEAR_DPT":
			formObj.f_dpt_tp_1.checked=false;
			formObj.f_dpt_tp_2.checked=false;
			formObj.f_dpt_tp_3.checked=false;
			formObj.f_dpt_tp_4.checked=false;
			formObj.f_dpt_tp_5.checked=false;
		break;
        case "CUSTOMER_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
	   		rtnary=new Array(1);
	   		rtnary[0]="";
	   		//#781 [Payment History] Cannot open empty popup
//	   		rtnary[1]=formObj.f_trdp_nm.value;
//	   		rtnary[2]=window;
  	        
  	      callBackFunc = "CUSTOMER_POPLIST";
  	      modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
     	break;
     	//#781 [Payment History] Cannot open empty popup
        case "CUSTOMER_NAME":
	   		rtnary=new Array(1);
	   		rtnary[0]="";
	   		rtnary[1]=formObj.f_trdp_nm.value;
	   		rtnary[2]=window;
  	        
  	      callBackFunc = "CUSTOMER_POPLIST";
  	      modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
     	break;
        case 'MINIMIZE':
			if(mainForm.style.display != "none") {
				getObj('mainForm').style.display="none";
				//sheetObj.SetSheetHeight(580);
				resizeSheet();
			} else {
				getObj('mainForm').style.display="block";
				//sheetObj.SetSheetHeight(440 );
				resizeSheet();
			}
        break; 
    }
}

function CUSTOMER_POPLIST(rtnVal){
  	var formObj=document.frm1;
      if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_trdp_cd.value=rtnValAry[0];//full_nm
	
		//#3488 Accounting Multi Language 적용 
		if ( MULTI_LANGUAGE == "Y" ){
			formObj.f_trdp_nm.value=rtnValAry[10];//locl_nm
		}else{
			formObj.f_trdp_nm.value=rtnValAry[2];//eng_nm			
		}
		
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
	doWork('SEARCHLIST', '');
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function viewCntChg(){
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
/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
function loadPage() {
    var formObj=document.frm1;
    
    //LHK, 20141029 #44986 [BINEX]Office - All Option
    setOfficeAllOption(formObj.f_ofc_cd);
    
    //OFVFOUR-6967 [STAR MEX] OPUS PAYMENT LV2 HISTORY - TAX INVOICE NO 칼럼 추가 (Zen#4494)
	var opt_key = "TAX_COL";
	ajaxSendPost(setTaxCol, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
    
	for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
	//사용자가 저장한 Header 정보를 읽어온다.
    IBS_RestoreGridSetting(formObj.user_id.value, getPageURL(), docObjects[0], false, "RestoreGrid");
    setFromToDtEndPlus(formObj.f_start_date, 90, formObj.f_end_date, 30);
}

function RestoreGrid() {
	
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
			var col = sheetObj.MouseCol();
			sheetObj.SetColHidden(col, 1);
			sheetObj.SetColWidth(col, 1);
		break;
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
/**
 * 시트 초기설정값, 헤더 정의
 * param : sheetObj ==> 시트오브젝트, sheetNo ==> 시트오브젝트 태그의 아이디에 붙인 일련번호
 * 시트가 다수일 경우 시트 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
 */
function initSheet(sheetObj,sheetNo) {
    switch(sheetNo) {
         case 1:      //IBSheet1 init
            with (sheetObj) {
             SetConfig( { SearchMode:2, MergeSheet:2, Page:20, DataRowMerge:0 } );

             var info    = { Sort:0, ColMove:0, HeaderCheck:1, ColResize:1 };
             var headers = [ { Text:getLabel('ACC_JOR_0600_HDR'), Align:"Center"} ];
             InitHeaders(headers, info);

             var cols = [ {Type:"Text",      Hidden:0,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"rnum",              KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Date",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"inv_dt",            KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Date",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"inv_due_dt",        KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:160,  Align:"Left",    ColMerge:1,   SaveName:"trdp_nm",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"dept_nm",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"inv_tp",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    //OFVFOUR-6967 [STAR MEX] OPUS PAYMENT LV2 HISTORY - TAX INVOICE NO 칼럼 추가 (Zen#4494)
                    {Type:"Text",      Hidden:1,  Width:120,  Align:"Center",  ColMerge:0,   SaveName:"tax_no",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"inv_no",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"ref_no",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"bl_no",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"inv_aply_curr_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"inv_seq",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"inv_sum_amt",       KeyField:0,   CalcLogic:"",   Format:"NullFloat",   PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:1,   SaveName:"bal_sum_amt",       KeyField:0,   CalcLogic:"",   Format:"NullFloat",   PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:0,   SaveName:"pay_amt",           KeyField:0,   CalcLogic:"",   Format:"NullFloat",   PointCount:2,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Date",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"post_dt",           KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"bank_nm",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:0,   SaveName:"chk_no",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Date",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"clr_dt",            KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Date",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"void_dt",           KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 } ];
              
	             InitColumns(cols);
	             //OFVFOUR-6967 [STAR MEX] OPUS PAYMENT LV2 HISTORY - TAX INVOICE NO 칼럼 추가 (Zen#4494)
	             if(TAX_COL == "Y"){
	 				SetColHidden("tax_no",0);
	 			 }
	
	             SetEditable(0);
                 //InitViewFormat(0, "inv_dt", 	"MM-dd-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
	             //InitViewFormat(0, "inv_due_dt","MM-dd-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
	             //InitViewFormat(0, "post_dt", 	"MM-dd-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
	             //InitViewFormat(0, "void_dt", 	"MM-dd-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
	             //InitViewFormat(0, "clr_dt", 	"MM-dd-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
	             
	             SetActionMenu("Column Hidden|*-|Header Setting Save|Header Setting Reset");
	             SetSheetHeight(440);
	             sheetObj.ShowSubSum([{StdCol:9, SumCols:"inv_sum_amt|bal_sum_amt|pay_amt", Sort:false, ShowCumulate:false, CaptionCol:'inv_aply_curr_cd', CaptionText:"%col TOTAL"}]);
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
	//sheetObj.ShowSubSum([{StdCol:9, SumCols:"inv_sum_amt|bal_sum_amt|pay_amt", Sort:false, ShowCumulate:false, CaptionCol:'inv_aply_curr_cd', CaptionText:"%s TOTAL"}]);
}
/**
달력팝업을 호출한다.
**/
function doDisplay(doWhat,formObj){
    switch(doWhat){
	    case 'DATE1':   //달력 조회 From ~ To 팝업 호출 
	        var cal=new ComCalendarFromTo(); 
	    	cal.select(formObj.f_start_date, formObj.f_end_date, 'MM-dd-yyyy');
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
	setFromToDtEndPlus(formObj.f_start_date, 90, formObj.f_end_date, 30);
	formObj.f_dpt_tp_1.checked=true;
	formObj.f_dpt_tp_2.checked=true;
	formObj.f_dpt_tp_3.checked=true;
	formObj.f_dpt_tp_4.checked=true;
	formObj.f_dpt_tp_5.checked=true;
	formObj.f_sell_buy_tp_cd_s.checked=true;
	formObj.f_sell_buy_tp_cd_d.checked=true;
	formObj.f_sell_buy_tp_cd_c.checked=true;
	formObj.f_sell_buy_tp_cd_b.checked=true;
	formObj.f_inv_sts_cd[1].checked=true;
	formObj.f_cust_flag[0].checked=true;
	formObj.f_grp_id_cd.value="";

	//LHK, 20141029 #44986 [BINEX]Office - All Option
    setOfficeAllOption(formObj.f_ofc_cd);
    
	formObj.f_date_flag.value="A";
	formObj.f_inv_aply_curr_cd.value="";
	sheetObj.RemoveAll();
}
/**
 * code name select
 */
function codeNameAction(str, obj, tmp){
	var formObj=document.frm1;
	var s_code=obj.value.toUpperCase();		
	var s_type="";
	if ( s_code != "" ) {
		if ( tmp == "onKeyDown" ) {
			if (event.keyCode == 13){
				CODETYPE=str;	
				s_type="trdpCode";
				if(CODETYPE=="TRDPCD"){
					ajaxSendPost(trdpCdReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
				}
			}
		} else if ( tmp == "onBlur" ) {
			if ( s_code != "" ) {
				CODETYPE=str;		
				s_type="trdpCode";
				if(CODETYPE=="TRDPCD"){
					ajaxSendPost(trdpCdReq,  'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
				}
			}
		}
	}else{
		formObj.f_trdp_cd.value="";
		formObj.f_trdp_nm.value="";
	}
}
/**
 * Trade Partner 관린 코드조회
 */
function trdpCdReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@@;');
			var masterVals=rtnArr[0].split('@@^');	
			if(CODETYPE =="TRDPCD"){
				formObj.f_trdp_cd.value=masterVals[0];	//trdp_cd  AS param1

				//#3488 Accounting Multi Language 적용 
				if ( MULTI_LANGUAGE == "Y" ){
					formObj.f_trdp_nm.value=masterVals[16];		//eng_nm   AS param2
				}else{
					formObj.f_trdp_nm.value=masterVals[3];		//eng_nm   AS param2	
				}				
			}
		}else{
			if(CODETYPE =="TRDPCD"){
				formObj.f_trdp_cd.value="";//trdp_cd  AS param1
				formObj.f_trdp_nm.value="";//eng_nm   AS param2
			}
		}
	}
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
    	   mm="0"+mm
       }
       boundDay=mm+"-"+mon[mm-1]+"-"+yy;
    } else {
      if (yy%4 == 0 && yy%100 != 0 || yy%400 == 0){
    	  if(mm < 10){
       	   mm="0"+mm
          }
          boundDay=mm+"-"+29+"-"+yy;
      }else {
    	  if(mm < 10){
       	   mm="0"+mm
          }
          boundDay=mm+"-"+28+"-"+yy;
      }
    }
    return boundDay;  
}
function custEnterAction(obj, type){
	var formObj=document.frm1;
	if (event.keyCode == 13){
		if(type == "CUSTOMER"){
			doWork("CUSTOMER_POPLIST");
		}else if(type == "CUSTOMER_NAME"){
			doWork("CUSTOMER_NAME");
		}
	}
}
function entSearch(){
	if(event.keyCode == 13){
		doWork('SEARCHLIST');
	}
}
//Calendar flag value
var firCalFlag=false;
//OFVFOUR-6967 [STAR MEX] OPUS PAYMENT LV2 HISTORY - TAX INVOICE NO 칼럼 추가 (Zen#4494)
function setTaxCol(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
		TAX_COL=doc[1];
	} else {
		TAX_COL="";
	}
}
