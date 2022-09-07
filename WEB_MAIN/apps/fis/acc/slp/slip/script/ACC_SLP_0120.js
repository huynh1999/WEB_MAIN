
var G_GL_DATA_CREATE_STATUS = "END";

function doWork(srcName){
	var sheetObj=docObjects[0];
	var formObj=document.frm1;
	switch(srcName) {
		case "CURR_SEARCH":
			
			if(formObj.s_proc_mon.value != ""){
				if(compareTwoDate(formObj.s_proc_mon.value,formObj.s_lst_proc_mon.value)){
					formObj.f_cmd.value=SEARCHLIST01;
					sheetObj.DoSearch("./ACC_SLP_0120GS.clt", FormQueryString(formObj) );
				}else{
					alert(getLabel('ACC_MSG163'));
					formObj.s_proc_mon.value = '';
				}
			}
		break;
		
		case "SAVE":
			if(validateInputValue()){
				getRateQuery();
				formObj.f_cmd.value=MODIFY;
				var sheetDatas=ComGetSaveString(sheetObj, true, true); //allSave=> false 트랜잭션이 발생한 것만 저장할 경우
				var sParm=FormQueryString(formObj) + "&" + sheetDatas;
				var saveXml = sheetObj.GetSaveData("./ACC_SLP_0120GS.clt", sParm, true);
				
				var xmlDoc = $.parseXML(saveXml);
				var $xml = $(xmlDoc);
				var ret_msg = $xml.find("ret_msg").text();
				if(ret_msg != "" && ret_msg != null){
					alert(ret_msg);
				}else{
					doWork("CLEAR");
				}
			}
			
		break;
		case "SLIP":
    	   if(G_GL_DATA_CREATE_STATUS == "END"){
    		   G_GL_DATA_CREATE_STATUS ="START";
    		   setGlDataCreate('');
    	   } 
		break;
		
		case "CLEAR":
/*			docObjects[0].RemoveAll();
			formObj.s_proc_mon.value = "";
			formObj.s_ofc_cd.value=accSlpJS.ofcCd;
			fnGetLocCurr(accSlpJS.ofcCd);
			fnGetLastMonthDt(accSlpJS.ofcCd);*/
			
			var currLocUrl=this.location.href;
			currLocUrl=currLocUrl.substring(0, currLocUrl.indexOf('.clt'));
			currLocUrl='.'+currLocUrl.substring(currLocUrl.lastIndexOf('/'), currLocUrl.length)+'.clt?callId=NEW['+(new Date()).getTime()+']';
			window.location.href = currLocUrl;					
			
		break;	
		case "PRINT":	
		    //if(sheetObj.GetSelectRow()== 0){
		       //There is no data
		    //   alert(getLabel('FMS_COM_ALT004'));
		    //  return;
			//}
			
	       	formObj.file_name.value='accounting_slip_01.mrd';
			formObj.title.value='Accounting Slip';
				
			//#964 [SHINE] Account Slip 기능 보완 - 전체 Accounting 기능
	    	var rmk			= formObj.desc.value;
	    	var bloked_by	= "";
	    	var issued_by	= "";
	    	var block_dt	= "";
	    		
	    	//#1799 [PATENT] VOUCHER 양식 - Deposit/Payment for CHINA Account Slip [Form]
	    	var vchr_no = formObj.vchar_no.value;
	    	var vchr_tp_nm = formObj.vchr_tp_cd.value;
	    		
			var source="Journal";
			//Parameter Setting
			var param='';
			param += '[' + formObj.s_ofc_cd.value + ']';													// [1]
			param += '[' + ""  + ']';		// [2] slip_no
			param += '[' + accSlpJS.userNm + ']';													// [3]  usrNm
			param += '[' + source + ']';													// [4]
				
			//#964 [SHINE] Account Slip 기능 보완 - 전체 Accounting 기능
			param += '[' + formatDate(new Date(), 'MM-dd-yyyy') + ']';					// [5]			
			param += '[' + rmk.replaceAll("\n", " ") + ']';						// [6]
			param += '[' + bloked_by + ']';					// [7]
			param += '[' + issued_by + ']';					// [8]
			param += '[' + block_dt + ']';					// [9]
				
			//#1799 [PATENT] VOUCHER 양식 - Deposit/Payment for CHINA Account Slip [Form]
			param += '[' + vchr_no + ']';					// [10]
			param += '[' + vchr_tp_nm + ']';				// [11]
			param += '[' + accSlpJS.userId + ']';		// [12]  formObj.user_id.value
				
			formObj.rd_param.value=param;
			console.log(param);
			popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);			
		break;
	}
}

//Calendar flag value
var firCalFlag=false;
function getRateQuery(){
	document.frm1.rate_query.value ="";
	
	var sheetObj=docObjects[0];
	var rateSQL="select  rate.curr_cd,  rate.xch_rt "
		+     "  from ( "
		;
	//ex)
	//select fm_curr_cd as  CURR_CD, xch_rt  as  xch_rt
	//from (
	//		select 'USD' as CURR_CD, , 2 AS xch_rt
	//      UNION
	//		select 'JPY' as CURR_CD, ' 2 AS xch_rt
	//      ) rate
	var rate;
	var fchRt;
	var xchRt;
	for(var i=1; i<=sheetObj.LastRow();i++){
		rate =0;
		fchRt =0;
		xchRt =0;
		fchRt = sheetObj.GetCellValue(i, "fch_rt");
		xchRt = sheetObj.GetCellValue(i, "xch_rt");
		//rate  = xchRt/fchRt;
		rate  = xchRt - fchRt;
		console.log('rate = ' + rate  + '    :typeof =  '+ typeof(rate) + '    :isNumber =  '+ isNumber2(rate)+ '    :isNaN =  '+ isNaN(rate)+ '    :isFinite =  '+ isFinite(rate));
		if(isNaN(rate)  || !isFinite(rate)){
			return 'not';
		}
		
		rateSQL += "         SELECT '" + sheetObj.GetCellValue(i, "fr_curr_cd") + "' AS CURR_CD, "
				+ rate + " AS xch_rt ";
    	if(i < sheetObj.LastRow()){
    		rateSQL += " UNION ";
    	}else{
    		rateSQL += "      ) rate ";
    	}
	}
	
	document.frm1.rate_query.value = rateSQL;
	return rateSQL;
}


function validateInputValue(){
	if (trim(frm1.s_proc_mon.value) == ""){
		alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('ACC_PROCEMH'));
		frm1.s_proc_mon.focus();
		return false;
	}
	if (trim(frm1.date_seq.value) == ""){
		alert(getLabel('FMS_COM_ALT007') + "\n - " + 'Date');
		frm1.date_seq.focus();
		return false;
	}
	
	if(!compareTwoDate(frm1.s_proc_mon.value,frm1.s_lst_proc_mon.value)){
		alert(getLabel('ACC_MSG163'));
		formObj.s_proc_mon.value = '';		
		return false;
	}
	
	
	var sheetObj=docObjects[0];
	if(sheetObj.RowCount() < 1){
		alert(getLabel('ACC_MSG33'));
		return false;
	}
	
	for(var i=1; i<=sheetObj.LastRow();i++){
		if(sheetObj.GetCellValue(i, "fch_rt") == 0){
			alert(getLabel('ACC_MSG164'));
			return false;
		}
		if(sheetObj.GetCellValue(i, "xch_rt") == 0){
			alert(getLabel('ACC_MSG165'));
			return false;
		}
	}
	
	
	return true;
}



function loadPage() {
    var formObj=document.frm1;
    
	for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
	formObj.s_lst_proc_mon.value = modiStrDateType(accSlpJS.proc_dt,1);
	formObj.date_seq.value = modiStrDateType(accSlpJS.post_dt,1);
	
	//fnGetLocCurr(accSlpJS.ofcCd);
	changeOfc(accSlpJS.ofcCd);
	
	doWork("CURR_SEARCH");
}
/**
 * 시트 초기설정값, 헤더 정의
 * param : sheetObj ==> 시트오브젝트, sheetNo ==> 시트오브젝트 태그의 아이디에 붙인 일련번호
 * 시트가 다수일 경우 시트 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
 */
var docObjects=new Array();
var sheetCnt=0;
function initSheet(sheetObj,sheetNo) {
    switch(sheetNo) {
    	case 1:      //IBSheet2 init
		    with (sheetObj) {
	            SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );
	
	            var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	            var headers = [ { Text:getLabel('ACC_SLP_0120_HDR1'), Align:"Center"} ];
	            InitHeaders(headers, info);
	
	            var cols = [ {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:1,   SaveName:"fr_curr_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	                   {Type:"Float",      Hidden:0,  Width:120,   Align:"Right",  ColMerge:1,   SaveName:"fch_rt",  KeyField:0,   CalcLogic:"",   Format:"Float", PointCount: 4, UpdateEdit:0, InsertEdit:0 },
	                   {Type:"Float",     Hidden:0,  Width:100,  Align:"Right",   ColMerge:1,   SaveName:"xch_rt",        KeyField:0,   CalcLogic:"",   Format:"Float", PointCount: 4, UpdateEdit:1, InsertEdit:1 },
	                   {Type:"Status",    Hidden:1, Width:10,   Align:"Center",  ColMerge:0,   SaveName:"ibflag" }
	                   ];
	             
	            InitColumns(cols);
	
	            SetEditable(1);

                SetSheetHeight(320);
                SetVisible(true);
    		} 
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
 * 화면에서 사용하는 메소드
 * @param doWhat
 * @param formObj
 * @return
*/
/**
달력팝업을 호출한다.
**/
var firCalFlag=false;
function doDisplay(doWhat,formObj){
    switch(doWhat){
        case 'DATE1':    //달력 조회 팝업 호출      
        	var cal=new ComCalendar();
            cal.select(formObj, 'MM-dd-yyyy');
        break;
    }
}
/*
 * form에 형태를 맞춰 넣기 위한 메소드
 * type 1 : yyyyMMdd --> MM-dd-yyyy
 */
function modiStrDateType(strDate, type){
	var result="";
	if(type=="1"){
		if(strDate.length!=8){
		}else{
			result += strDate.substring(4,6) + "-" + strDate.substring(6,8) + "-" + strDate.substring(0,4);
		}
	}else{
	}
	return result;
}

function sheet1_OnSaveEnd(sheetObj, errMsg){
	doWork("CLEAR");
}


function changeOfc(val){
	docObjects[0].RemoveAll();
	fnGetLocCurr(val);
	fnGetLastMonthDt(val)
	doWork("CURR_SEARCH");
}



function fnGetLocCurr(val){
	ajaxSendPost(getLocCurr, 'reqVal', '&goWhere=aj&bcKey=getLoclCurrCd&s_ofc_cd='+val, './GateServlet.gsl');
}

function getLocCurr(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var result=doc[1].split('^^');
			if(result[0] != ""){
				formObj.loc_curr_cd.value = result[0];
				formObj.s_curr_cd.value = result[0];
				return;
			}
		}  
	}
	formObj.loc_curr_cd.value="";
	formObj.s_curr_cd.value="";
}

function fnGetLastMonthDt(val){
	ajaxSendPost(getLastMonthDt, 'reqVal', '&goWhere=aj&bcKey=getLastMonthDt&p_ofc_cd='+val , './GateServlet.gsl');	
}

function getLastMonthDt(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var result=doc[1].split('^^');
			if(result[0] != ""){
				formObj.s_lst_proc_mon.value = modiStrDateType(result[0],1);
				return;
			}
		}  
	}
	formObj.s_lst_proc_mon.value="";	
}



function setGlDataCreate(arg){
	var formObj=document.frm1;
	doShowProcess();		
	var type_clss_cd = 'GL_DATA_CREATE';
	ajaxSendPost(rtnAjaxFunction, 'reqVal', '&goWhere=aj&bcKey=setGlDataCreate&f_usrId='+accSlpJS.userId+'&f_type_clss_cd='+type_clss_cd, './GateServlet.gsl');
}

function rtnAjaxFunction(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	
	if(doc[0]=='OK'){
		doHideProcess();
	}else{
		doHideProcess();
		alert(getLabel('FMS_COM_ALT019'));
	}
	G_GL_DATA_CREATE_STATUS ="END";
	doWork('SAVE');
}