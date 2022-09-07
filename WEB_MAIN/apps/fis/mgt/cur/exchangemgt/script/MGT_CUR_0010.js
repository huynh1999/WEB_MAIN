/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   :  MGT_CUR_0010.js
*@FileTitle  : MGT_CUR_0010
*@author     : CLT
*@version    : 1.0
*@since      : 2014/06/10
=========================================================*/
/**
 * 화면로드 후 초기값 세팅
 */
var rtnary=new Array(1);
var callBackFunc = "";

function removeFirstKeyField(sheetObj) {
 $($('#DIV_' + ((typeof sheetObj == "string") ? sheetObj : sheetObj.id)).find('span.GMKeyfield')[0]).remove();
 $($('#DIV_' + ((typeof sheetObj == "string") ? sheetObj : sheetObj.id)).find('span.GMKeyfield')[0]).remove();
}

function initFinish(){
	var pDoc=parent.parent.parent.document;
	hideProcess('WORKING', pDoc);
	setFromToDt(frm1.f_aply_fm_dt, frm1.f_aply_to_dt);
}
function doWork(srcName, valObj){
	if(!btnGetVisible(srcName)){
		return;
	}
    // 탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var formObj=document.frm1;
    switch(srcName) {
       case "SEARCHLIST":
    	   if(!formValidation()) return;
    	   if(formObj.f_curr_tp_cd.value == ""){
    		   //Apply Scope (DropDownListBox)
    	   }
    	   /*else if(formObj.f_curr_tp_cd.value=='N' && formObj.f_trdp_cd.value==''){
    		   //Customer field is mandatory! (2012.11.26 Mandatory 삭제)
			   //formObj.f_trdp_cd.focus();
    	   }*/
    	   else if(formObj.f_aply_fm_dt.value == "" || formObj.f_aply_to_dt.value ==""){
    		   //Apply Date is mandatory!
    		   alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('MAC_MSG52'));
    		   formObj.f_aply_fm_dt.focus();
    	   }else{
	            formObj.f_cmd.value=SEARCHLIST;
	            // 검증로직
	            if(validateForm(sheetObj, formObj, SEARCHLIST, 1)){

 	            	sheetObj.DoSearch("MGT_CUR_0010GS.clt", FormQueryString(formObj) );
	            	var intRows=sheetObj.LastRow();
	            	for ( var i=2 ; i <= intRows ; i++ ) {
	            		if ( sheetObj.GetCellValue(i, "curr_tp_cd") == "S" ) {
	            			sheetObj.SetCellEditable(i, "trdp_cd",0);
	            		}
	            	}
	            }
    	   }
       break;
       case "ROWADD":

 			var intRows=sheetObj.LastRow() + 1;
			sheetObj.DataInsert(intRows);
			sheetObj.SetCellValue(intRows, 'to_curr_cd',dfCurrency);
			sheetObj.SetCellValue(intRows, 'to_rt_ut',dfUnit);
			sheetObj.SetCellValue(intRows, 'fm_rt_ut',0);
       break;
       case "REMOVE":
            formObj.f_cmd.value=REMOVE;
            if(confirm(getLabel('FMS_COM_CFMDEL'))){
            	doProcess=true;
            	sheetObj.DoSave("MGT_CUR_0010GS.clt", FormQueryString(formObj),"ibflag",false);
            }
            break;
       case "ADD":    	   
    	   formObj.f_cmd.value=ADD;
    	   if ( fncGridCheck() ) {
	    	   if( confirm(getLabel('FMS_COM_CFMSAV')) ){    		   		   
	    		   doProcess=true;
	    		   //"[  "  +sheetObj.CellValue(2, 'aply_fm_dt') + " ]  [  "  +sheetObj.CellValue(2, 'aply_to_dt') alert();
	    		   sheetObj.DoSave("MGT_CUR_0010GS.clt", FormQueryString(formObj),"ibflag",false);
	    		   //doWork('SEARCHLIST');
	    	   }
    	   }
    	   break;
       case "CURRENCY_POPLIST":// 통화코드 openMean 1=화면에서 오픈, 2=그리드에서 오픈
    	   	rtnary=new Array(3);
		   	rtnary[0]="";
		    callBackFunc = "CURRENCY_POPLIST";
		   	modal_center_open('./CMM_POP_0040.clt', rtnary, 656,354,"yes");
			break;
       case "TRDP_POPLIST":
		   	rtnary=new Array(3);
		   	rtnary[0]="";
		   	rtnary[1]=formObj.f_trdp_nm.value;
		    rtnary[2]=window;
		    callBackFunc = "TRDP_POPLIST";
		   	modal_center_open('./CMM_POP_0010.clt?callTp=CS', rtnary, 1150,650,"yes");
       break;
       case "FILE":
    	   var fso, f, r="";
    	   var drvPath="";
    	   var tmp="";
    	   if(frm1.file_url.value==''){
    		   //alert('Please select upload file.');
    		   alert(getLabel('SUP_COM_ALT002')); 
    		   return;
    	   }else{
    		   drvPath=frm1.file_url.value;
    	   }
    	   //document.getElementById("").value = "";
    	   fso=new ActiveXObject("Scripting.FileSystemObject");
    	   f=fso.OpenTextFile(drvPath, 1);
    	   var n=0;
    	   while(true){
    		   try{
    			   r=f.ReadLine();
    			   tmp += r + "\r\n";
    		   }catch(e){
    			   break;
    		   }
    	   }
    	   /*
    	    * 2012.03.15 
    	    * Excel 파일을 읽어서 아래와 같은 replace 작업을 통해 원하는 데이터 셋으로 만든다.
    	    */
    	   var beginIdx=tmp.indexOf('<td colspan="9" style="text-align:left;">&nbsp;')+47;
    	   var endIdx=tmp.indexOf('<td colspan="9" style="text-align:left;">&nbsp;')+57;
    	   var tmpDate=tmp.substring(beginIdx, endIdx).replaceAll("-", "");
    	   tmp=tmp.substring(tmp.indexOf('<td>&nbsp;'));
    	   tmp=tmp.replaceAll('</table>', '');
    	   tmp=tmp.replaceAll('</body>', '');
    	   tmp=tmp.replaceAll('</html>', '');
    	   tmp=tmp.replaceAll('<td>&nbsp;', '');
    	   tmp=tmp.replaceAll('"', '');
    	   tmp=tmp.replaceAll("'", '');
    	   tmp=tmp.replaceAll("\\", '');
    	   tmp=tmp.replaceAll('<td style=mso-number-format:0\.00;>', '');
    	   tmp=tmp.replaceAll('<td style=mso-number-format:0.0000;>', '');
    	   tmp=tmp.replaceAll('<tr>', '');
    	   tmp=tmp.replaceAll('\r\n', '');
    	   tmp=tmp.replaceAll('</tr>', '\r\n');
    	   tmp=tmp.replaceAll('\t', '');
    	   tmp=tmp.replaceAll('</td>', '||');
    	   var tmpLine=tmp.split("\r\n");
    	   for(var i=0 ; i<tmpLine.length-1 ; i++){
    		   var tmpVal=tmpLine[i].split("||");
    		   var tmpCurr=tmpVal[0].split(" ");
    		   if(tmpVal[3]!=0){

    			   var intRows=sheetObj.LastRow() + 1;
    			   sheetObj.DataInsert(intRows);
    			   sheetObj.SetCellValue(intRows, 'fm_curr_cd',tmpCurr[1]);
    			   if(tmpCurr.length==3){
    				   sheetObj.SetCellValue(intRows, 'fm_rt_ut',tmpCurr[2]);
    			   }else if(tmpCurr.length==2){
    				   sheetObj.SetCellValue(intRows, 'fm_rt_ut',1);
    			   }else{
    			   }
    			   sheetObj.SetCellValue(intRows, 'to_curr_cd','KRW');
    			   sheetObj.SetCellValue(intRows, 'to_rt_ut',tmpVal[3]);
    			   sheetObj.SetCellValue(intRows, 'aply_fm_dt',tmpDate.substring(4,6) + "-" + tmpDate.substring(6,8) + "-" + tmpDate.substring(0,4));
    		   }
    	   }
    	   // logic, 금요일이면 토, 일 환율도 날짜만 변경해서 입력한다.
    	   var date=new Date(tmpDate.substring(0,4), tmpDate.substring(4,6)-1, tmpDate.substring(6,8));
    	   if(date.getDay()==5){
    		   date.setDate(date.getDate()+1);
    		   tmpDate=fullZero(date.getFullYear(), 4) + fullZero(date.getMonth()+1, 2) + fullZero(date.getDate(), 2);
    		   for(var i=0 ; i<tmpLine.length-1 ; i++){
        		   var tmpVal=tmpLine[i].split("||");
        		   var tmpCurr=tmpVal[0].split(" ");
        		   if(tmpVal[3]!=0){
        			   var intRows=sheetObj.LastRow() + 1;
        			   sheetObj.DataInsert(intRows);
        			   sheetObj.SetCellValue(intRows, 'fm_curr_cd',tmpCurr[1]);
        			   if(tmpCurr.length==3){
        				   sheetObj.SetCellValue(intRows, 'fm_rt_ut',tmpCurr[2]);
        			   }else if(tmpCurr.length==2){
        				   sheetObj.SetCellValue(intRows, 'fm_rt_ut',1);
        			   }else{
        			   }
        			   sheetObj.SetCellValue(intRows, 'to_curr_cd','KRW');
        			   sheetObj.SetCellValue(intRows, 'to_rt_ut',tmpVal[3]);
        			   sheetObj.SetCellValue(intRows, 'aply_fm_dt',tmpDate.substring(4,6) + "-" + tmpDate.substring(6,8) + "-" + tmpDate.substring(0,4));
        		   }
        	   }
    		   date.setDate(date.getDate()+1);
    		   tmpDate=fullZero(date.getFullYear(), 4) + fullZero(date.getMonth()+1, 2) + fullZero(date.getDate(), 2);
    		   for(var i=0 ; i<tmpLine.length-1 ; i++){
        		   var tmpVal=tmpLine[i].split("||");
        		   var tmpCurr=tmpVal[0].split(" ");
        		   if(tmpVal[3]!=0){
        			   var intRows=sheetObj.LastRow() + 1;
        			   sheetObj.DataInsert(intRows);
        			   sheetObj.SetCellValue(intRows, 'fm_curr_cd',tmpCurr[1]);
        			   if(tmpCurr.length==3){
        				   sheetObj.SetCellValue(intRows, 'fm_rt_ut',tmpCurr[2]);
        			   }else if(tmpCurr.length==2){
        				   sheetObj.SetCellValue(intRows, 'fm_rt_ut',1);
        			   }else{
        			   }
        			   sheetObj.SetCellValue(intRows, 'to_curr_cd','KRW');
        			   sheetObj.SetCellValue(intRows, 'to_rt_ut',tmpVal[3]);
        			   sheetObj.SetCellValue(intRows, 'aply_fm_dt',tmpDate.substring(4,6) + "-" + tmpDate.substring(6,8) + "-" + tmpDate.substring(0,4));
        		   }
        	   }
    	   }
       break;
    }
}
// --------------------------------------------------------------------------------------------------------------
// IBSheet 설정
// --------------------------------------------------------------------------------------------------------------
var docObjects=new Array();
var sheetCnt=0;
/**
 * Sheet 기본 설정 및 초기화 body 태그의 onLoad 이벤트핸들러 구현 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을
 * 추가한다
 */
function loadPage() {
	
	//#512 [BNX] VND(베트남) - USD 환율 차로 인한 환율 계산 오류
	ajaxSendPost(setVat_rt_dp_cnt, "reqVal", "&goWhere=aj&bcKey=getVat_rt_dp_cnt&s_ofc_cd="+ofc_cd, "./GateServlet.gsl");
	
    for(var i=0;i<docObjects.length;i++){
        // khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        // khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
    
    var opt_key = "EX_RATE_FM_CURR";
	ajaxSendPost(setCurrencyVal, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	
    //removeFirstKeyField(docObjects[0]);
    changeType();
}
/**
 * IBSheet Object를 배열로 등록 향후 다른 항목들을 일괄처리할 필요가 있을 때 배열로 담는 프로세스를 추가할 수 있다 배열은 소스
 * 상단에 정의
 */
function setDocumentObject(sheet_obj){
   docObjects[sheetCnt++]=sheet_obj;
}
/**
 * 시트 초기설정값, 헤더 정의 param : sheetObj ==> 시트오브젝트, sheetNo ==> 시트오브젝트 태그의 아이디에 붙인
 * 일련번호 시트가 다수일 경우 시트 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
 */
function initSheet(sheetObj,sheetNo) {
    switch(sheetNo) {
		case 1:      // IBSheet1 init
		    with(sheetObj){
	      
// 		        if (location.hostname != "") InitHostInfo(location.hostname, location.port, page_path);
	     // (17, 0, 0, true);

	      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

	      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	      var headers = [ { Text:getLabel('MGT_CUR_0010_HDR_1'), Align:"Center"},
	                  { Text:getLabel('MGT_CUR_0010_HDR_2'), Align:"Center"} ];
	      InitHeaders(headers, info);

	      var cols = [ {Type:"DelCheck",  Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"check_col" },
	             {Type:"Text",      Hidden:0,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"",              KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"ibflag" },
	             {Type:"Combo",     Hidden:0, Width:70,   Align:"Left",    ColMerge:1,   SaveName:"curr_tp_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"PopupEdit", Hidden:0, Width:80,   Align:"Left",    ColMerge:1,   SaveName:"trdp_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:"trdp_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Combo",     Hidden:0, Width:90,   Align:"Center",  ColMerge:1,   SaveName:"fm_curr_cd",    KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 , DefaultValue:1 },
	             {Type:"Float",     Hidden:0,  Width:90,   Align:"Right",   ColMerge:1,   SaveName:"fm_rt_ut",      KeyField:1,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Combo",     Hidden:0, Width:90,   Align:"Center",  ColMerge:1,   SaveName:"to_curr_cd",    KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             //{Type:"ComboEdit",     Hidden:0, Width:90,   Align:"Center",  ColMerge:1,   SaveName:"to_curr_cd",    KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1, Validation:1 },
	             {Type:"Float",     Hidden:0,  Width:90,   Align:"Right",   ColMerge:1,   SaveName:"to_rt_ut",      KeyField:1,   CalcLogic:"",   Format:"Float",       PointCount:4,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Float",     Hidden:0,  Width:90,   Align:"Right",   ColMerge:1,   SaveName:"xch_rt_ut",     KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:xch_rt_dp_cnt,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Combo",     Hidden:0, Width:80,   Align:"Left",    ColMerge:1,   SaveName:"dt_clss_cd",    KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"PopupEdit", Hidden:0, Width:80,   Align:"Center",  ColMerge:1,   SaveName:"aply_fm_dt",    KeyField:1,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1 , FormatFix:1},
	             {Type:"PopupEdit", Hidden:0, Width:80,   Align:"Center",  ColMerge:1,   SaveName:"aply_to_dt",    KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 , FormatFix:1},
	             {Type:"Text",      Hidden:0,  Width:500,   Align:"Left",    ColMerge:1,   SaveName:"rmk",    	   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 , EditLen:100},
	             {Type:"Text",      Hidden:0,  Width:60,   Align:"Left",    ColMerge:1,   SaveName:"proc_usrid",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"inv_xcrt_seq" },
	             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"Indexing" } ];
	       
	      InitColumns(cols);

	      SetEditable(1);
	      SetImageList(0,APP_PATH+"/web/img/button/btns_search.gif");
	      SetImageList(1,APP_PATH+"/web/img/button/btns_calendar.gif");
	      SetHeaderRowHeight(20);
          /*InitDataImage(0, 4,daRight);
		  InitDataImage(0,12,daRight);
	      InitDataImage(0,13,daRight);*/
//	      InitViewFormat(0, "aply_fm_dt",   "MM-dd-yyyy");
//	      InitViewFormat(0, "aply_to_dt",   "MM-dd-yyyy");
//	      InitViewFormat(0, "aply_fm_dt", "mm\\-dd\\-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
          EditDateFormat="MDY"; //그리드에 입력할 때 월/일/년 순으로 입력되게 설정
//	      InitViewFormat(0, "aply_to_dt", "mm\\-dd\\-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
          EditDateFormat="MDY"; //그리드에 입력할 때 월/일/년 순으로 입력되게 설정
	      SetColProperty("curr_tp_cd", {ComboText:"Common|Customer", ComboCode:"S|N"} );
	      SetColProperty("dt_clss_cd", {ComboText:"Day|Month", ComboCode:"D|M"} );
	      SetColProperty("fm_curr_cd", {ComboText:PARAM1_1, ComboCode:PARAM1_2,DefaultValue:PARAM1_2.split("|")[1]} );
	      //SetColProperty("fm_curr_cd", {ComboText:"AA|BB", ComboCode:"A|B"} );
	      SetColProperty("to_curr_cd", {ComboText:PARAM1_1, ComboCode:PARAM1_2} );
	      SetSheetHeight(500);
	      resizeSheet();
	      }

                                                     
		break;
    }
}

function resizeSheet() {
	ComResizeSheet(docObjects[0]);
}

//저장하기전 null 체크
function check_save_null(){
	var sheetObj=docObjects[0];
	var check_value=0;
 	for(var i=1; i <= sheetObj.LastRow() + 1; i++){
 		if (sheetObj.GetCellValue(i, "trdp_cd") == "" && sheetObj.GetCellValue(i,"curr_tp_cd") != "S"){
			//Please enter a Customer Code! 
			alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_TRPT'));
			check_value ++;
			break;
		}		
 		if (sheetObj.GetCellValue(i, "fm_curr_cd") == ""){
			//Please enter a From Currency! 
			alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_CURR'));
			check_value ++;
			break;
		}
 		if (sheetObj.GetCellValue(i, "to_curr_cd") == ""){
			//Please enter a To Currency! 
			alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_TCUR'));
			check_value ++;
			break;
		}
 		if (sheetObj.GetCellValue(i, "xch_rt_ut") == 0){
			//Please enter a Exchange Rate!
			alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_EXRT'));
			check_value ++;
			break;
		}
	}	
	if(check_value == 0){
		doWork("ADD");
	}
}
function checkInpuVals(sheetObj){
 	var totRow=sheetObj.LastRow() + 1;
	var isOk=true; 
	var workItems=0;
	for(var i=2; i < totRow ; i++){
		if(sheetObj.GetCellValue(i, 'ibflag')=='U'||sheetObj.GetCellValue(i, 'ibflag')=='I'){
			if (sheetObj.GetCellValue(i, "trdp_cd") == "" && sheetObj.GetCellValue(i,"curr_tp_cd") != "S"){
				if(checkInputVal(sheetObj.GetCellValue(i, 'frt_cd'), 3, 3, "T", getLabel('FRT_CD'))!='O'){
					isOk=false;
					break;				
				}
			}
			if(checkInputVal(sheetObj.GetCellValue(i, 'fm_curr_cd'), 3, 3, "T", getLabel('FM_CURR_CD'))!='O'){
				isOk=false;
				break;				
			}
			if(checkInputVal(sheetObj.GetCellValue(i, 'to_curr_cd'), 3, 3, "T", getLabel('TO_CURR_CD'))!='O'){
				isOk=false;
				break;				
			}
			if (sheetObj.GetCellValue(i, "xch_rt_ut") != 0){
				if(checkInputVal(sheetObj.GetCellValue(i, 'xch_rt_ut'), 3, 3, "T", getLabel('XCH_RT_UT'))!='O'){
					isOk=false;
					break;				
				}
			}
			if(sheetObj.GetCellValue(i, 'ibflag')=='U'){
				if(sheetObj.GetCellValue(i, 'frt_seq')==''){
					//alert('Invalid data!');
					alert(getLabel('FMS_COM_ALT007')); 
					isOk=false;
					break;
				}
			}
			workItems++;
		//삭제인경우
		}else if(sheetObj.GetCellValue(i, 'ibflag')=='D'){
			workItems++;
		}
	}
	if(isOk){
		if(workItems==0){
			return 'NI';
		}else{
			return 'OK';
		}
	}else{
		return 'IV';
	}
}
/**
 * Paging 항목 선택시 호출되
 */
function goToPage(callPage){
	docObjects[0].RemoveAll();
	document.forms[0].f_CurPage.value=callPage;
	doWork('SEARCHLIST');
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function searchList(){
	doWork('SEARCHLIST');
}
/**
 * 화면에서 사용하는 메소드
 * @param doWhat
 * @param formObj
 * @return
 */
function doDisplay(doWhat, formObj){
    switch(doWhat){
        case 'DATE01':   // 달력 조회 From ~ To 팝업 호출
        	var cal=new ComCalendarFromTo();
	        cal.select(formObj.f_aply_fm_dt, formObj.f_aply_to_dt, 'MM-dd-yyyy');
        	
        	/*var cal=new calendarPopupFromTo();
            cal.displayType="date";
            cal.select(formObj.f_aply_fm_dt, 'f_aply_fm_dt', formObj.f_aply_to_dt, 'f_aply_to_dt', 'MM-dd-yyyy');*/
        break;        
    }
}
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnPopupClick이벤트 발생시.
 * sheet1_OnPopupClick(sheetObj, Row, Col) <= sheet1번+'_'+IBsheet상에 명시된
 * Event명+(Sheet Oeject, Row, Column)
 */
function sheet1_OnPopupClick(sheetObj, row, col){	
	switch(sheetObj.ColSaveName(col)){
		case 'trdp_cd':     //Trade Partner 조회
			rtnary=new Array(3);
		   	rtnary[0]="";
		   	rtnary[1]="";
		    rtnary[2]=window;
		    callBackFunc = "sheet1_OnPopupClick_TRDP_POPLIST";
		   	modal_center_open('./CMM_POP_0010.clt?callTp=CS', rtnary, 1150,650,"yes");
		   	//var rtnVal =  ComOpenWindow('./CMM_POP_0010.clt?callTp=CS',  rtnary,  "scroll:yes;status:no;help:no;dialogWidth:1150px;dialogHeight:480px" , true);
	   	   
	    break;
	    
		case 'aply_fm_dt': 
			
			if(sheetObj.GetCellValue(row, "fm_rt_ut").length == 0){
	    		sheetObj.SelectCell(row, "fm_rt_ut");
	    		//
	    		alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_EXRT')); 
			}else if(sheetObj.GetCellValue(row, "to_curr_cd").length == 0){
				sheetObj.SetCellValue(row, "aply_fm_dt",'')
				sheetObj.SelectCell(row, "to_curr_cd");	    		
	    		alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_CURR'));
	    	}else{
			    var celldata = sheetObj.GetCellValue(row,col);        
			    if(sheetObj.GetCellValue(row,col-1) == "M" && celldata != ""){
			    	var dtArr = celldata.split("-");
			    	celldata = dtArr[2] + ""  + dtArr[0];
			    }
		        var opt;
		        if(sheetObj.GetCellValue(row,col-1) == "M"){
		        	opt =  { Format:"yyyyMM",CallBack : "dateInsert",CalButtons:"Close"};              
		        }else{
		            opt =  { Format:"Ymd",CallBack : "dateInsert",CalButtons:"Close"};
		        }        
		        //console.log(celldata);
		        IBShowCalendar(celldata, opt);
	    	}
		break;
		case 'fm_curr_cd':	//From Currency Code 조회
	    	rtnary=new Array(1);
	   		rtnary[0]="1";
	        var rtnVal =  ComOpenWindow('./CMM_POP_0040.clt',  rtnary,  "scroll:yes;status:no;help:no;dialogWidth:656px;dialogHeight:480px" , true);
	        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
			 	return;
			}else{
				var rtnValAry=rtnVal.split("|");
				sheetObj.SetCellValue(row, col,rtnValAry[0]);
			}
		break;
		case 'to_curr_cd':	//To Currency Code 조회
	    	rtnary=new Array(1);
	   		rtnary[0]="1";
	        var rtnVal =  ComOpenWindow('./CMM_POP_0040.clt',  rtnary,  "scroll:yes;status:no;help:no;dialogWidth:656px;dialogHeight:480px" , true);
	        if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
			 	return;
			}else{
				var rtnValAry=rtnVal.split("|");
				sheetObj.SetCellValue(row, col,rtnValAry[0]);
			}
		break;
		/*
		case "aply_fm_dt":	//환률 유효일자 시작일
			if(sheetObj.GetCellValue(row, "fm_rt_ut").length == 0){
	    		sheetObj.SelectCell(row, "fm_rt_ut");
	    		//
	    		alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_EXRT')); 
			}else if(sheetObj.GetCellValue(row, "to_curr_cd").length == 0){
	    		sheetObj.SelectCell(row, "to_curr_cd");
	    		//
	    		alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_CURR'));
	    	}else{
	    		if(sheetObj.GetCellValue(row, "dt_clss_cd")=='D'){
	    			var cal=new calendarModalPopupGrid();
	    			cal.addX=70;
	    			cal.addY=220;
	    	        cal.select(sheetObj, 'sheet1', row, col, 'yyyy-MM-dd');
	        	}else{
					var mCal=new calendarModalMonthGrid();
					mCal.addX=70;
					mCal.addY=220;
					mCal.select(sheetObj, 'sheet1', row, col, "aply_to_dt", 'yyyy-MM-dd');
				}
	    	}
		break;	
		*/
	}
}

function dateInsert(date){
	var sheetObj=docObjects[0];
    var row = sheetObj.GetSelectRow();
    var col = sheetObj.GetSelectCol();
    
    if(date.length == 6){
		sheetObj.SetCellValue(row, "aply_fm_dt", date + "01" );
		sheetObj.SetCellValue(row, "aply_to_dt", firstAndLastDayOfMonth(date, "L") );
    }else{
    	sheetObj.SetCellValue(row,"aply_fm_dt",date);
    	sheetObj.SetCellValue(row,"aply_to_dt",date);
    }
    
}


function sheet1_OnChange(sheetObj, row, col) {
	switch(sheetObj.ColSaveName(col)){
		case "curr_tp_cd":	//공통 일반 구분
			//표준
			if(sheetObj.GetCellValue(row, "curr_tp_cd")=='S'){
				sheetObj.SetCellValue(row, "trdp_cd",'');
				sheetObj.SetCellValue(row, "trdp_nm",'');
				sheetObj.SetCellEditable(row, "trdp_cd",0);
				sheetObj.SetCellEditable(row, "trdp_nm",0);
			//일반
			}else if(sheetObj.GetCellValue(row, "curr_tp_cd")=='N'){
				sheetObj.SetCellValue(row, "trdp_cd",'');
				sheetObj.SetCellValue(row, "trdp_nm",'');
				sheetObj.SetCellEditable(row, "trdp_cd",1);
				sheetObj.SetCellEditable(row, "trdp_nm",1);
			}
		break;
		case "fm_rt_ut":	//From의 Rate Unit 변경 또는 To의 Rate Unit변경인 경우
			if(sheetObj.GetCellValue(row, "fm_rt_ut")==''){
				sheetObj.SelectCell(row, "fm_rt_ut");
			}else if(sheetObj.GetCellValue(row, "to_rt_ut")==''){
				sheetObj.SelectCell(row, "to_rt_ut");
			//계산
			}else{
				if(sheetObj.GetCellValue(row, "fm_rt_ut")>0 && sheetObj.GetCellValue(row, "to_rt_ut")>0){
					//#5622 [BNX INDIA] PROFIT REPORT RELATED TO EXCHANGE RATE
					sheetObj.SetCellValue(row, "xch_rt_ut",parseFloat(getDivideFloatByNDecimalTp(sheetObj.GetCellValue(row, "to_rt_ut"), sheetObj.GetCellValue(row, "fm_rt_ut"), TP_TRM5)).toFixed(xch_rt_dp_cnt));
				}else{
					sheetObj.SetCellValue(row, "xch_rt_ut",0);
				}	
			}
		break;
		case "to_rt_ut":
			if(sheetObj.GetCellValue(row, "fm_rt_ut")==''){
				sheetObj.SelectCell(row, "fm_rt_ut");
			}else if(sheetObj.GetCellValue(row, "to_rt_ut")==''){
				sheetObj.SelectCell(row, "to_rt_ut");
			//계산
			}else{
				if(sheetObj.GetCellValue(row, "fm_rt_ut")>0 && sheetObj.GetCellValue(row, "to_rt_ut")>0){
					//#5622 [BNX INDIA] PROFIT REPORT RELATED TO EXCHANGE RATE
					sheetObj.SetCellValue(row, "xch_rt_ut",parseFloat(getDivideFloatByNDecimalTp(sheetObj.GetCellValue(row, "to_rt_ut"), sheetObj.GetCellValue(row, "fm_rt_ut"), TP_TRM5)).toFixed(xch_rt_dp_cnt));
				}else{
					sheetObj.SetCellValue(row, "xch_rt_ut",0);
				}	
			}
		break;
		case "dt_clss_cd":	//Day/Month 구분
			//Data 초기화
			sheetObj.SetCellValue(row, "aply_fm_dt",'');
			sheetObj.SetCellValue(row, "aply_to_dt",'');
		break;
		
		
		case "aply_fm_dt":	//From 일자가 선택되고 일기준인 경우
			if(sheetObj.GetCellValue(row,  "dt_clss_cd")=='D'){
				sheetObj.SetCellValue(row, "aply_to_dt",sheetObj.GetCellValue(row, "aply_fm_dt"));
			}else if(sheetObj.GetCellValue(row, "to_curr_cd").length == 0){
//				alert(1);
				sheetObj.SelectCell(row, "to_curr_cd");	    		
	    		alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_CURR'));
				sheetObj.SetCellValue(row, "aply_fm_dt",'');
	    	}else{
	    		//#941 [SBM] Exchange Rate 수정 오류
			    var celldata = sheetObj.GetCellValue(row,col);
			    
			    if(sheetObj.GetCellValue(row,  "dt_clss_cd")=='D'){
					sheetObj.SetCellValue(row, "aply_to_dt",sheetObj.GetCellValue(row, "aply_fm_dt"));
				}
			    
			    if(sheetObj.GetCellValue(row,col-1) == "M" && celldata != ""){
			    	var dtArr = celldata.split("-");
			    	
			    	var st_date = dtArr[0] + "-01"  + "-" + dtArr[2];

			    	var lastDay = ( new Date( dtArr[2], dtArr[0], 0) ).getDate();
			    	var end_date = dtArr[0] + "-" + lastDay + "-" + dtArr[2];
			    	
			    	sheetObj.SetCellValue(row, "aply_fm_dt", st_date);
			    	sheetObj.SetCellValue(row, "aply_to_dt", end_date);
			    }

//		        var opt;
//		        if(sheetObj.GetCellValue(row,col-1) == "M"){
//		        	opt =  { Format:"yyyyMM",CallBack : "dateInsert",CalButtons:"Close"};              
//		        }else{
//		            opt =  { Format:"Ymd",CallBack : "dateInsert",CalButtons:"Close"};
//		        }
		        
		        //console.log(celldata);
//		        IBShowCalendar(celldata, opt);
	    	}

/*			
			if(sheetObj.GetCellValue(row, "fm_rt_ut").length == 0){
	    		sheetObj.SelectCell(row, "fm_rt_ut");
	    		//
	    		alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_EXRT')); 
			}else if(sheetObj.GetCellValue(row, "to_curr_cd").length == 0){
	    		sheetObj.SelectCell(row, "to_curr_cd");
	    		//
	    		alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_CURR'));
	    	}else{
	    		if(sheetObj.GetCellValue(row, "dt_clss_cd")=='D'){
//	    			var cal=new calendarModalPopupGrid();
//	    			cal.addX=70;
//	    			cal.addY=220;
//	    	        cal.select(sheetObj, 'sheet1', row, col, 'yyyy-MM-dd');
	        	}else{
//					var mCal=new calendarModalMonthGrid();
//					mCal.addX=70;
//					mCal.addY=220;
//					mCal.select(sheetObj, 'sheet1', row, col, "aply_to_dt", 'yyyy-MM-dd');
	        		alert(sheetObj.GetCellValue(row, "aply_fm_dt"));
	        		var aplyFmDt = sheetObj.GetCellValue(row, "aply_fm_dt");
	        		
	        		sheetObj.SetCellValue(row, "aply_fm_dt", aplyFmDt.substr(4,2) + aplyFmDt.substr(0,4) + "01" );
	        		sheetObj.SetCellValue(row, "aply_to_dt", firstAndLastDayOfMonth(aplyFmDt, "L") );
	        		
	        		//sheetObj.InitCellProperty(row,"aply_fm_dt",{Type:"Date", Format:"Ymd"} );
				}
	    	}
*/			
			
		break;
		
		
		case "aply_to_dt":	//Apply Date From인 경우
			if(sheetObj.GetCellValue(row, "aply_fm_dt")!=''){
				if(sheetObj.GetCellValue(row, "dt_clss_cd")=='D'){
					sheetObj.SetCellValue(row, "aply_to_dt",sheetObj.GetCellValue(row, "aply_fm_dt"));
				}
				
				//sheetObj.SetCellValue(row, "aply_fm_dt", firstAndLastDayOfMonth(chkDate, "F") );
				
				//sheetObj.InitCellProperty(row,"aply_fm_dt",{Type:"Date", Format:"Ym"});
			}
			
		break;
		
	}
}

// 매월의 시작일과 말일 취득
function firstAndLastDayOfMonth(secDate, dayClssFL){
	var year = secDate.substr(0,4);
	var month = secDate.substr(4,2);
	var day = "01";

	var date = new Date(year, month-1, day);  // date로 변경
	
	var frDt = new Date(date);
	var lastDayOfMonth = new Date(frDt.getFullYear(), frDt.getMonth()+1, 0);
	
	// 월의 말일 취득
	var reDay = "01";
	if (dayClssFL == "L") {
		var lastDay = lastDayOfMonth.getDate();
		if (("" + lastDay).length  == 1) { lastDay  = "0" + lastDay; }
		
		reDay = lastDay;
	} 
	
	rtnDate = frDt.getFullYear() + month + reDay;
	return rtnDate;
}

var checkRow=0;
function fincCheckResult(reqVal){
    var doc=getAjaxMsgXML(reqVal);
    if(doc[0]=='OK'){
    	if(doc[1]=='N'){
    		//That exchange rate is registered already!
    		alert(getLabel('FMS_COM_ALT099'));
    		docObjects[0].SetCellValue(checkRow, "aply_fm_dt",'');
    		docObjects[0].SetCellValue(checkRow, "aply_to_dt",'');
   			checkRow=-1;
    	}
    }else{
    	//alert('System err');
    	alert(getLabel('FMS_COM_ERR001'));
    }
}

//OFVFOUR-6141 [BNX-TOR] 환율 입력시 중복/누락시 alert messasge (addition request)
function searchInvPair(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
    	if(doc[1]=='N'){
			//The exchange rate has not it\'s pair. Please check it
			alert(getLabel('FMS_COM_ALT169'));
			checkRow=-1;
    	}
    }else{
    	//alert('System err');
    	alert(getLabel('FMS_COM_ERR001'));
    }
}
//조회 후 페이지징 표시
function sheet1_OnSearchEnd(){
	doDispPaging(docObjects[0].GetCellValue(2, 'Indexing'), getObj('pagingTb'));
	//removeFirstKeyField(docObjects[0]);
}
function fncGridCheck() {
	var sheetObj=docObjects[0];
	var intRow=sheetObj.RowCount();
	var dupRow = "";
	for ( var i=2 ; i < intRow+2 ; i++ ) {
		if(sheetObj.GetRowStatus(i)!="R"){
			if ( sheetObj.GetCellValue(i, "curr_tp_cd") == "" || sheetObj.GetCellValue(i, "curr_tp_cd") == null ) {
				//Please enter a Apply Scope!
				alert(getLabel('FMS_COM_ALT001') + "\n - " + getLabel('APPLY_SCOPE'));
				return false;
			}
			if ( sheetObj.GetCellValue(i, "fm_curr_cd") == "" || sheetObj.GetCellValue(i, "fm_curr_cd") == null ) {
				//Please enter a From Currency!
				alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('FMS_COD_CURR'));
				return false;
			}
			if ( sheetObj.GetCellValue(i, "to_curr_cd") == "" || sheetObj.GetCellValue(i, "to_curr_cd") == null ) {
				//Please enter a To Currency!
				alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('TO_CURR_CD'));
				return false;
			}
			if ( sheetObj.GetCellValue(i, "dt_clss_cd") == "" || sheetObj.GetCellValue(i, "dt_clss_cd") == null ) {
				//Please enter a Day/Month Type!
				alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('DAY_MONTH'));
				return false;
			}
			if ( sheetObj.GetCellValue(i, "aply_fm_dt") == "" || sheetObj.GetCellValue(i, "aply_fm_dt") == null ) {
				//Please enter a Apply Date From!
				alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('MAC_MSG52'));
				return false;
			}
//			var dupRow=sheetObj.ColValueDup("curr_tp_cd|trdp_cd|fm_curr_cd|to_curr_cd|dt_clss_cd|aply_fm_dt|aply_to_dt");
//			if(dupRow > 0){
//				alert(getLabel('FMS_COM_ALT099'));
//				sheetObj.SetCellValue(i, "aply_fm_dt",'');
//				sheetObj.SetCellValue(i, "aply_to_dt",'');
//	    		return false;
//			}
  			//#5858 [BNX-TOR] Exchagne rate 화면 중복 입력 validation
			dupRow = sheetObj.ColValueDup("trdp_cd|fm_curr_cd|to_curr_cd|dt_clss_cd|curr_tp_cd|aply_fm_dt");
			if (dupRow > 0) {
				alert(getLabel('FMS_COM_ALT098'));
				docObjects[0].SetCellValue(dupRow, "aply_fm_dt", '');
				docObjects[0].SetCellValue(dupRow, "aply_to_dt", '');
				return false;
			}
			//#2173 [BINEX] EXCHANGE RATE / FINANCE EXCHANGE RATE 화면  Validation 추가
			if(sheetObj.GetRowStatus(i)!="D"){
				
				checkRow=i;
				var chkDate=sheetObj.GetCellValue(i, "aply_fm_dt");
				chkDate=chkDate.substr(6, 4) + '-' + chkDate.substr(0, 2) + '-' + chkDate.substr(3, 2);
				//일자가 들어가 있는경우 중복 여부를 확인한다.
				var parmStr='&goWhere=aj&bcKey=searchInvCurr';
				parmStr += '&ck_trdp_cd=';
				parmStr += sheetObj.GetCellValue(i, "trdp_cd");
				parmStr += '&ck_fm_curr_cd=';
				parmStr += sheetObj.GetCellValue(i, "fm_curr_cd");
				parmStr += '&ck_to_curr_cd=';
				parmStr += sheetObj.GetCellValue(i, "to_curr_cd");
				parmStr += '&ck_dt_clss_cd=';
				parmStr += sheetObj.GetCellValue(i, "dt_clss_cd");
				parmStr += '&curr_tp_cd=';
				parmStr += sheetObj.GetCellValue(i, "curr_tp_cd");
				parmStr += '&ck_aply_fm_dt=';
				parmStr += chkDate.replaceAll('-', '');
				parmStr += '&ck_inv_xcrt_seq=';
				parmStr += sheetObj.GetCellValue(i, "inv_xcrt_seq");
				ajaxSendPost(fincCheckResult,  'reqVal', parmStr, './GateServlet.gsl');
				sheetObj.SetSelectRow(i);
				if(checkRow < 0){
					return false;
				}
			}

			//OFVFOUR-6141 [BNX-TOR] 환율 입력시 중복/누락시 alert messasge (addition request)
			var checkPair = 0;
			var firstPair = sheetObj.GetCellValue(i, "trdp_cd");
			firstPair += sheetObj.GetCellValue(i, "dt_clss_cd");
			firstPair += sheetObj.GetCellValue(i, "fm_curr_cd");
			firstPair += sheetObj.GetCellValue(i, "to_curr_cd");
			firstPair += sheetObj.GetCellValue(i, "aply_fm_dt");
			firstPair += sheetObj.GetCellValue(i, "aply_to_dt");
			for ( var j = 2; j < intRow + 2 ; j++ ){
				var secondPair = sheetObj.GetCellValue(j, "trdp_cd");
				secondPair += sheetObj.GetCellValue(j, "dt_clss_cd");
				secondPair += sheetObj.GetCellValue(j, "to_curr_cd");
				secondPair += sheetObj.GetCellValue(j, "fm_curr_cd");
				secondPair += sheetObj.GetCellValue(j, "aply_fm_dt");
				secondPair += sheetObj.GetCellValue(j, "aply_to_dt");
				if ( i != j && firstPair == secondPair ){
					checkPair = 1;
				}
			}
			if ( checkPair == 0){
				if ( sheetObj.GetRowStatus(i) != "D" ){
					checkRow=i;
					var aply_fm_dt = sheetObj.GetCellValue(i, "aply_fm_dt");
					var aply_to_dt = sheetObj.GetCellValue(i, "aply_to_dt");
					aply_fm_dt = aply_fm_dt.substr(6, 4) + '-' + aply_fm_dt.substr(0, 2) + '-' + aply_fm_dt.substr(3, 2);
					aply_to_dt = aply_to_dt.substr(6, 4) + '-' + aply_to_dt.substr(0, 2) + '-' + aply_to_dt.substr(3, 2);
	
					var paramStr = '&goWhere=aj&bcKey=searchInvPair';
					paramStr += '&ck_trdp_cd=';
					paramStr += sheetObj.GetCellValue(i, "trdp_cd");
					paramStr += '&ck_dt_clss_cd=';
					paramStr += sheetObj.GetCellValue(i, "dt_clss_cd");
					paramStr += '&ck_fm_curr_cd=';
					paramStr += sheetObj.GetCellValue(i, "fm_curr_cd");
					paramStr += '&ck_to_curr_cd=';
					paramStr += sheetObj.GetCellValue(i, "to_curr_cd");
					paramStr += '&ck_aply_fm_dt=';
					paramStr += aply_fm_dt.replaceAll('-', '');
					paramStr += '&ck_aply_to_dt=';
					paramStr += aply_to_dt.replaceAll('-', '');
					ajaxSendPost(searchInvPair, 'reqVal', paramStr, './GateServlet.gsl');
					if(checkRow < 0){
						return true;
					}
				}
			}
		}
	}
	dupRow=sheetObj.ColValueDup("trdp_cd|fm_curr_cd|to_curr_cd|dt_clss_cd|curr_tp_cd|aply_fm_dt");
	if(dupRow > 0){
		alert(getLabel('FMS_COM_ALT098'));
		docObjects[0].SetCellValue(dupRow, "aply_fm_dt",'');
		docObjects[0].SetCellValue(dupRow, "aply_to_dt",'');
		return false;
	}
	return true;
}
//등록/수정/삭제 후 페이지징 표시
function sheet1_OnSaveEnd(sheetObj, errMsg){
	if(errMsg==undefined || errMsg==null || errMsg =='' ){
		//alert(getLabel('FMS_COM_NTYCOM'));
		/*Changed the Alert Message Type.130824 - LHK 20130822 #19443 Save & Complete Alert message 변경 */
		showCompleteProcess();
		doWork('SEARCHLIST');
	}
}
var CODETYPE='';
/**
 * code name select
 */
function codeNameAction(str, obj, tmp){
	// obj가 form or sheet에서 온걸 구분해서 value결정.
	if(obj == '[object]' || obj =='[object HTMLInputElement]'){
		var s_code=obj.value.toUpperCase();
	}else{
		var s_code=obj;
	}
	var s_type="";
//	if ( s_code != "" ) {
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
//			if ( s_code != "" ) {
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
//		}
//	}
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
			var rtnArr=doc[1].split('@@;');
			var masterVals=rtnArr[0].split('@@^');	
			if(CODETYPE == "trdpCode"){
				formObj.f_trdp_cd.value=masterVals[0]; 
				formObj.f_trdp_nm.value=masterVals[3];//loc_nm
			}
		}else{
			if(CODETYPE == "trdpCode"){
				formObj.f_trdp_cd.value=""; 
				formObj.f_trdp_nm.value="";
			}
		}
	}else{
	}
}
function changeType(){
	if(frm1.f_curr_tp_cd.value == 'S'){
		frm1.f_trdp_cd.className="search_form-disable";
		frm1.f_trdp_cd.readOnly=true;
		frm1.cust.disabled=true;
	}else if(frm1.f_curr_tp_cd.value == 'N'){
		frm1.f_trdp_cd.className="search_form";
		frm1.f_trdp_cd.readOnly=false;
		frm1.cust.disabled=false;
	}
}
function formValidation(){
	var formObj=document.frm1;
	if(!chkSearchCmprPrd(true, frm1.f_aply_fm_dt, frm1.f_aply_to_dt)){
		return false;
	}
	return true;
}
//Calendar flag value
var firCalFlag=false;

function TRDP_POPLIST(rtnVal){
	var formObj=document.frm1;    		
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}
	var rtnValAry=rtnVal.split("|");
	frm1.f_trdp_cd.value=rtnValAry[0];
	frm1.f_trdp_nm.value=rtnValAry[2];
}

function sheet1_OnPopupClick_TRDP_POPLIST(rtnVal){
	var formObj=document.frm1;    		
	var sheetObj=docObjects[0];
	var row = sheetObj.GetSelectRow();
	 if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	 }
	 var rtnValAry=rtnVal.split("|");
	 sheetObj.SetCellValue(row, 'trdp_cd',rtnValAry[0]);
	 sheetObj.SetCellValue(row, 'trdp_nm',rtnValAry[2]);
}

function CURRENCY_POPLIST(rtnVal){
	var formObj=document.frm1;    		
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}
	else{
		var rtnValAry=rtnVal.split("|");
		//formObj.bzc_curr_cd.value = rtnValAry[0];
		formObj.f_fm_curr_cd.value=rtnValAry[0];				
	}
}

//#49001 [BINEX MEXICO] OEH BL ENTRY 에서 EXPRESS B/L DEFAULT 옵션 NO로 설정
function setCurrencyVal(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.frm1;
	
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ){
		if(doc[1] == "USD"){
			formObj.f_fm_curr_cd.value = "USD";
		}
	} 
}

function sheet1_OnKeyDown(sheetObj, row, col, keyCode){
	if(sheetObj.LastRow() == row && keyCode==9 && sheetObj.ColSaveName(col)=="proc_usrid"){
		doWork('ROWADD');
		sheetObj.SelectCell(row+1, 1);
	}
}

//#799 [BNX] (베트남) ACCOUNTING VAT 기능 추가
function setVat_rt_dp_cnt(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
		var spValue = doc[1].split("^@@^");
		vat_rt_dp_cnt = spValue[0];
		xch_rt_dp_cnt = spValue[1];
	}
}
