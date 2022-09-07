/*=========================================================
 *Copyright(c) 2014 CyberLogitec
 *@FileName : ACC_SLP_0070.jsp
 *@FileTitle : Accounting Block / Unblock
 *@author     : CLT
 *@version    : 1.0
 *@since      : 2014/06/17
 =========================================================*/
var TODAY;
var PROC_FLAG="N";
var NEXT_BLOCK_DT = "";
var ORG_BLOCK_DT = "";

function setupPage(){
	loadPage();
}
function doWork(srcName){
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var formObj=document.frm1;
    switch(srcName) {
	   case "DEFAULT":
	   break;
	   case "SEARCHLIST":
	        doProcess=true;
            //showProcess('WORKING', document);
            formObj.f_cmd.value=SEARCHLIST;
            sheetObj.DoSearch("./ACC_SLP_0070GS.clt", FormQueryString(formObj));
	   break;
       case "COMMAND01":
    	   
    	   //2016.04.20 C.W.Park Added
    	   //office가 ALL의 경우 Min Blck Date를 가져온다.
    	   
    	   if(formObj.s_ofc_cd.value == ""){
    		   
    		   for(var i=1;i<=sheetObj.RowCount();i++){
    			   
        		   if(sheetObj.GetCellValue(i, 1) != ""){
        			   var gridMinDate = sheetObj.GetCellValue(i, 1);
        			       gridMinDate = gridMinDate.substring(4,6) + "-" + gridMinDate.substring(6,8) + "-" + gridMinDate.substring(0,4);
        			       
        			   if(compareTwoDate(ORG_BLOCK_DT, gridMinDate)){ //gridMinDate < ORG_BLOCK_DT : true
        				   ORG_BLOCK_DT = gridMinDate;
        			   }else{
        				   
        				   if(ORG_BLOCK_DT == ""){
        					   ORG_BLOCK_DT = gridMinDate;
        				   }
        			   }
        		   }
    		   }
    	   }
    	   
    	    if(formObj.s_block_dt.value == ""){
    	    	alert(getLabel('ACC_MSG121'));
    	    	return;
    	    }else{
    	    	var apply_dt = formObj.s_block_dt.value;
    	    	
    	    	if(ORG_BLOCK_DT != ""){
    	    		if(formObj.s_chk_block.value == "Y"){ // Block
        	    		if(!compareTwoDate(apply_dt,ORG_BLOCK_DT)){
        	    			alert(getLabel('ACC_MSG148')); // Apply Date must be greater than Last Block Date.
        	    	    	return;
        	    		}
        	    	}else{ // Unblock
        	    		if(!compareTwoDate(ORG_BLOCK_DT,apply_dt)){
        	    			alert(getLabel('ACC_MSG149')); // Apply Date must be smaller than Last Block Date.
        	    			return;
        	    		}
        	    		// #52976 - [ZEN] WRONG EXPENSE IN BRANCH OFFICE
        	    		ajaxSendPost(setLastEndYearDt, 'reqVal', '&goWhere=aj&bcKey=searchLastEndYearDate', './GateServlet.gsl');
        	    		
        	    		var last_ye_dt = formObj.last_ye_dt.value;
        	    		
        	    		if(last_ye_dt != "" && compareTwoDate(last_ye_dt,apply_dt)){
        	    			alert(getLabel2('ACC_MSG151',new Array(last_ye_dt))); // It is not able to unblock data prior to Year-End Date(@).\nPlease cancel Year-End in advance.
        	    			return;
        	    		}
        	    	}
    	    	}
    	    }
    	    
    	    if(confirm("Do you want to "+formObj.action.value+ "? ")){
    	    	formObj.f_cmd.value=COMMAND01;
//    	    	var intRows=sheetObj.LastRow() + 1;
//    	        sheetObj.DataInsert(intRows);
    	        doProcess=true;
                //showProcess('WORKING', document);
    	        sheetObj.DoAllSave("./ACC_SLP_0070GS.clt", FormQueryString(formObj), true);
    	    	//doProcess = true;
    	    	//showProcess('WORKING', document);
    	    	//formObj.action = "./ACC_SLP_0070.clt";
				//formObj.submit();
    	    }
    	    
       break;
    }
}
//--------------------------------------------------------------------------------------------------------------
//IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
var docObjects=new Array();
var sheetCnt=0;
/**
 * IBSheet Object를 배열로 등록
 * 향후 다른 항목들을 일괄처리할 필요가 있을 때 배열로 담는 프로세스를 추가할 수 있다
 * 배열은 소스 상단에 정의
 */
function setDocumentObject(sheet_obj){
	docObjects[sheetCnt++]=sheet_obj;
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
    formObj.s_block_dt.value=getTodayStr();
	chkBlock();
	getLastBlockDt();
	doWork("SEARCHLIST");
}
/**
 * 시트 초기설정값, 헤더 정의
 * param : sheetObj ==> 시트오브젝트, sheetNo ==> 시트오브젝트 태그의 아이디에 붙인 일련번호
 * 시트가 다수일 경우 시트 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
 */
function initSheet(sheetObj,sheetNo) {
	switch(sheetNo) {
		case 1:      //IBSheet2 init
		with (sheetObj) {
		// 높이 설정
			SetSheetHeight(400);
			(10, 0, 0, true);
			SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

			var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
			
			var headers = [ { Text:getLabel('ACC_SLP_0070_HDR1'), Align:"Center"} ];
			InitHeaders(headers, info);

			var cols = [ {Type:"Text", Hidden:0, Width:70, Align:"Center", ColMerge:0, SaveName:"office",        KeyField:0, CalcLogic:"", Format:"",    PointCount:0, UpdateEdit:0, InsertEdit:0 },
			             {Type:"Date", Hidden:0, Width:0, Align:"Center", ColMerge:0, SaveName:"last_block_dt", KeyField:0, CalcLogic:"", Format:"Ymd", PointCount:0, UpdateEdit:0, InsertEdit:0 } ];
			 
			InitColumns(cols);
			SetVisible(1);
			SetEditable(0);
			
		} 
		break;
	}
}
//조회 후 페이지징 표시
function sheet1_OnSearchEnd(){
} 
function sheet1_OnSaveEnd(sheetObj, errMsg){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	hideProcess('WORKING', document);
	//Save success!
	if(errMsg == undefined  || errMsg==null || errMsg == ""){
		//alert(getLabel('FMS_COM_NTYCOM'));
		/*Changed the Alert Message Type.130824 - LHK 20130822 #19443 Save & Complete Alert message 변경 */
		getLastBlockDt();
		showCompleteProcess();
		doWork("SEARCHLIST");
	}
}
/**
 * 화면에서 사용하는 메소드
 * @param doWhat
 * @param formObj
 * @return
*/
/**
달력팝업을 호출한다.
**/
function doDisplay(doWhat,formObj){
    switch(doWhat){
        case 'DATE1':    //달력 조회 팝업 호출      
//        	var cal=new calendarPopup();
//            cal.select(formObj.s_block_dt, 's_block_dt', 'MM-dd-yyyy');
        	var cal=new ComCalendar();
        	 cal.select(formObj.s_block_dt, 'MM-dd-yyyy');

        break;
    }
}
function chkBlock(){
	var formObj=document.frm1;
	if(formObj.blk_chk[0].checked){	//block
    	formObj.s_chk_block.value='Y';
		document.getElementById('blk_title').style.display="block";
		document.getElementById('unblk_title').style.display="none";
		//unblk_title.style.display="none";
		formObj.action.value='Block';
    }
    if(formObj.blk_chk[1].checked){	//unblock
    	formObj.s_chk_block.value='N';
    	document.getElementById('blk_title').style.display="none";
		document.getElementById('unblk_title').style.display="block";
//	    blk_title.style.display="none";
//		unblk_title.style.display="block";
		formObj.action.value='Unblock';
    }
}

function getLastBlockDt(){
	var formObj=document.frm1;
	//MAX(JNR_DT) +1, MAX(BLOCK_DT)+1 중 큰 Date Next Block date 에 Set
	//ajaxSendPost(getMaxBlockOrJnrNextDt, 'reqVal', '&goWhere=aj&bcKey=getMaxBlockOrJnrNextDt', './GateServlet.gsl');
	
	var sheetObj=docObjects[0];
	var param = formObj.s_ofc_cd.value;
	
//	if(param == ""){
//		ajaxSendPost(getMaxBlockOrJnrNextDt, 'reqVal', '&goWhere=aj&bcKey=getMaxBlockOrJnrNextDt', './GateServlet.gsl');
//	}else{
//		ajaxSendPost(getMaxBlockOrJnrNextDt, 'reqVal', '&goWhere=aj&bcKey=getMaxBlockOrJnrNextDt&searchOfcCd=' + param, './GateServlet.gsl');
//	}
	
	if(param != ""){
		
		ajaxSendPost(getMaxBlockOrJnrNextDt, 'reqVal', '&goWhere=aj&bcKey=getMaxBlockOrJnrNextDt&searchOfcCd=' + param, './GateServlet.gsl');
		
		if(NEXT_BLOCK_DT == ""){
			NEXT_BLOCK_DT = "";
			ORG_BLOCK_DT = "";
		}else{
			var nextBlockDtYMD=NEXT_BLOCK_DT.replaceAll("-", "");															//NEXT_BLOCK_DT  12-01-2013
				nextBlockDtYMD=nextBlockDtYMD.substring(4,8)+nextBlockDtYMD.substring(0,2)+nextBlockDtYMD.substring(2,4);	//nextBlockDtYMD 20131201
			var orgBlockDt=addDate('d', -1, nextBlockDtYMD, "");			
				ORG_BLOCK_DT=orgBlockDt.substring(4,6) + "-" + orgBlockDt.substring(6,8) + "-" + orgBlockDt.substring(0,4);
		}
	}
	
}
function getMaxBlockOrJnrNextDt(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			if(typeof(doc[1])!=''){
				NEXT_BLOCK_DT=doc[1].substring(4,6) + "-" + doc[1].substring(6,8) + "-" + doc[1].substring(0,4);
			}else{
				NEXT_BLOCK_DT = "";
				ORG_BLOCK_DT = "";
			}
		}else{
			NEXT_BLOCK_DT="";
			ORG_BLOCK_DT = "";
		}
	}
}

/**
* Last Processed End Year Date
*/
function setLastEndYearDt(reqVal){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
    var doc=getAjaxMsgXML(reqVal);
    if(doc[0]=='OK'){
       if(doc[1] != undefined){
    	   formObj.last_ye_dt.value=doc[1];
       }else{
    	   formObj.last_ye_dt.value="";
       }
    }
}