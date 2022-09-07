//=========================================================
//*@FileName   : SEE_AMS_0010.jsp
//*@FileTitle  : SEE AMS Search 
//*@Description: SEE AMS Search 
//*@author     : Chungrue
//*@version    : 
//*@since      : 
//
//*@Change history:
//*@author2     : Tuan.Chau
//*@version    : 2.0 - 2014/06/04
//*@since      : 2014/06/04
//=========================================================
var isInvStsOk=false;
var rtnary=new Array(1);
var callBackFunc = "";
var delete_show_msg = "N";
var isPdOrdStsOk=false;

function doWork(srcName, valObj) {
	if(!btnGetVisible(srcName)){
		return;
	}
	// 탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
	var sheetObj=docObjects[0];
	var sheetObj2=docObjects[1];
	var formObj=document.frm1;
	switch (srcName) {
		case "SEARCHLIST":
			if(!formValidation()) return;
	        formObj.f_cmd.value=SEARCHLIST;
	        sheetObj2.RemoveAll();
			sheetObj.DoSearch("OTH_OPR_0020GS.clt", FormQueryString(formObj) );
			//Log Monitor Start
	   		gLogMonitor();
	 		//Log Monitor End
		break;
       	case "NEW":
       	    var paramStr="./OTH_OPR_0010.clt?f_cmd=-1";
       	    parent.mkNewFrame('Other Sales Details', paramStr);
		break;  		
		case "REMOVE":
			
			// 51974 [BNX, ZEN] Invoice Create/Edit 권한 추가, Other Office View/Edit 권한 추가
   	 		var ref_ofc_cd = docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "ofc_cd");
   	 		
   	 		//alert(edob_flg + " "+ofc_cd+" "+ref_ofc_cd);
	   	 	var btnflag = "Y";
			if (edob_flg == "N"){
				if (ofc_cd != ref_ofc_cd){  
					btnflag = "N";
				}
			}  
			if (btnflag == "Y"){ 
			}else{
				alert(getLabel('FMS_COM_ALT084'));
				return;
			}
			
			//BLOCK 체크한다.
			var block_flg = docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "block_flag");
			if(block_flg == "Y"){
				alert(getLabel('FMS_COM_ALT115'));
	     	    return;
			}
			
			//var formObj = document.frm1;
			ajaxSendPost(checkOthInvReq, 'reqVal', '&goWhere=aj&bcKey=getCheckOthInv&oth_seq='+docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "oth_seq"), './GateServlet.gsl');
		   	if(isInvStsOk){
		   		
		   		// wo 생성 유무를 체크한다.
		     	ajaxSendPost(checkBlPdOrd, 'reqVal', '&goWhere=aj&bcKey=getCheckPdOrd&oth_seq='+docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "oth_seq"), './GateServlet.gsl');
		     	if(isPdOrdStsOk){
	     	      alert(getLabel('FMS_COM_ALT113'));
	     	      return;
		     	}
		   		
				if (confirm(getLabel('FMS_COM_CFMDEL'))) {
					//OFVFOUR-7211 [V4] Delete Other BL issue
					var param = "?f_cmd="+REMOVE;
					param += "&ref_no="+docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "ref_no");
					param += "&oth_seq="+docObjects[0].GetCellValue(docObjects[0].GetSelectRow(), "oth_seq");
					delete_show_msg = "Y";
					sheetObj.DoAllSave("./OTH_OPR_0020GS.clt"+param, '', true);
				}
			}else{
	   	 		alert(getLabel('FMS_COM_ALT022'));
	   	 	}
		break;
		case "GOTOACCT":
			var ref_no=sheetObj.GetCellValue(sheetObj.GetSelectRow(), "ref_no");
			var oth_seq=sheetObj.GetCellValue(sheetObj.GetSelectRow(), "oth_seq");
			var paramStr="./ACC_INV_0040.clt?f_cmd=-1&f_ref_no="+ref_no+"&s_oth_seq="+oth_seq;
			paramStr+= "&refType=othRefNo";
			
			//#5203 [BINEX] AFTER V470.06 RELEASE, PERIOD RANGE SETTING : Link시 검색기간 제외 조회 옵션처리
			paramStr+= "&linkOpt=KEY";
			
			if(ref_no != "-1"){
				parent.mkNewFrame('Invoice List', paramStr);
			}
		break;
		case "INSTRUCTION":
			if(sheetObj.LastRow()== 0){
				//There is no data
				alert(getLabel('FMS_COM_ALT004'));	
			}else{
				var paramStr="";
				paramStr += "./AIC_WOM_0018.clt?f_cmd=-1";
				paramStr += "&s_type=G"; // Other 에서 Pickup 호출할때 G , BL에서 호출시 B
				paramStr += "&s_seq=" + sheetObj.GetCellValue(sheetObj.GetSelectRow(), "oth_seq"); // Other Seq
				paramStr += '&air_sea_clss_cd='; 
				paramStr += '&bnd_clss_cd=G';
				paramStr += '&biz_clss_cd=';
				parent.mkNewFrame('Pickup Delivery Instruction', paramStr);
			}
		break;
		case "ORDER":
			var reqParam='';
			reqParam += '?f_ref_no=' + sheetObj.GetCellValue(sheetObj.GetSelectRow(), "ref_no");
			popGET('CMM_POP_0322.clt'+reqParam, '', 620, 605, "scroll:yes;status:no;help:no;");
		break;
		case "PROFIT_REPORT":
	   	 	if(sheetObj.LastRow()== 0){
	   	 		//There is no data
				alert(getLabel('FMS_COM_ALT004'));	
			}else{
				var sRow=sheetObj.GetSelectRow();
				//WMS ACCOUNT LKH 2015.01.20
				var reqParam='?oth_seq=' + sheetObj.GetCellValue(sRow, "oth_seq");
					reqParam += '&ref_no=' + sheetObj.GetCellValue(sRow, "ref_no");
					reqParam += '&air_sea_clss_cd=' + "O";
					reqParam += '&bnd_clss_cd=' + "N";
					reqParam += '&biz_clss_cd=' + "";
				popGET('RPT_PRN_0210.clt'+reqParam, '', 1270, 750, "scroll:yes;status:no;help:no;");
			}
   	 	break;
       	case "COPY":
	   	 	if(sheetObj.LastRow()== 0){
	   	 		//There is no data
				alert(getLabel('FMS_COM_ALT010'));	
			}else{
				var sRow=sheetObj.GetSelectRow();
				var paramStr="./OTH_OPR_0010.clt?f_cmd=15&oth_seq=" + sheetObj.GetCellValue(sRow, "oth_seq");
	       	    parent.mkNewFrame('Other Sales Details', paramStr);
			}
		break;
		
       	case "FILE_LABEL":
      		 var param = "";
			var formObj=document.frm1;
		var oth_seq=sheetObj.GetCellValue(sheetObj.GetSelectRow(), "oth_seq");
 			if(oth_seq != ""){
			
			formObj.file_name.value = 'file_label_01_oth_UFF.mrd';
			formObj.title.value='File Label';
			// Parameter Setting
			
		param += '[' + oth_seq + ']'; // $1
			formObj.rd_param.value=param;
			popPOST(frm1, 'RPT_RD_0010.clt', 'popTest', 1025, 740);

 			}else {
 				//Please select the row to print.
 				alert(getLabel('FMS_COM_ALT004'));
 		
 				return;
 			}

      		
      	break; 	

		
       	case "SHIP_TRDP_POPLIST":// openMean 1=화면에서 오픈, 2=그리드에서 오픈
			rtnary = new Array(1);
			rtnary[0] = "1";
			// 2011.12.27 value parameter
			if (typeof (valObj) != 'undefined') {
				rtnary[1] = valObj;
			} else {
				rtnary[1] = "";
			}
			rtnary[2] = window;
			callBackFunc = "SHIP_TRDP_POPLIST";
			modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
			
			break;
		case "CNEE_TRDP_POPLIST":// openMean 1=화면에서 오픈, 2=그리드에서 오픈
			rtnary = new Array(1);
			rtnary[0] = "1";
			// 2011.12.27 value parameter
			if (typeof (valObj) != 'undefined') {
				rtnary[1] = valObj;
			} else {
				rtnary[1] = "";
			}
			rtnary[2] = window;
			callBackFunc = "CNEE_TRDP_POPLIST";
			modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
			
			break;
		case "CUST_TRDP_POPLIST":// openMean 1=화면에서 오픈, 2=그리드에서 오픈
			rtnary = new Array(1);
			rtnary[0] = "1";
			// 2011.12.27 value parameter
			if (typeof (valObj) != 'undefined') {
				rtnary[1] = valObj;
			} else {
				rtnary[1] = "";
			}
			rtnary[2] = window;
			callBackFunc = "CUST_TRDP_POPLIST";
			modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
			
			break;
		case "POL_LOCATION_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
       		rtnary=new Array(1);
      		rtnary[0]="SEA";
	   		rtnary[1]="BL";
	   		// 2011.12.27 value parameter
	   		if(typeof(valObj)!='undefined'){
	   			rtnary[2]=valObj;
	   		}
	   		else{
	   			rtnary[2]="";
	   		}
	   		callBackFunc = "POL_LOCATION_POPLIST";
	   		modal_center_open('./CMM_POP_0030.clt', rtnary, 806,415,"yes");
	         
	        break;
        case "POD_LOCATION_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
       		rtnary=new Array(1);
      		rtnary[0]="SEA";
	   		rtnary[1]="BL";
	   		// 2011.12.27 value parameter
	   		if(typeof(valObj)!='undefined'){
	   			rtnary[2]=valObj;
	   		}
	   		else{
	   			rtnary[2]="";
	   		}
	   		callBackFunc = "POD_LOCATION_POPLIST";
	   		modal_center_open('./CMM_POP_0030.clt', rtnary, 806,415,"yes");
	         
	        break;	

        case "CLEAR":
        	formObj.reset();        	
        	//docObjects[0].RemoveAll();
        	//docObjects[1].RemoveAll();
        	formObj.f_ofc_cd.value = "";
        	if (uod_flg == "N"){ 
        		formObj.f_opr_usrid.value=usrId;
        	}
        break;	
       
        case 'EXCEL':		
      	  if(sheetObj.RowCount() < 1){//no data	
     			ComShowCodeMessage("COM132501");
     		}else{
     			sheetObj.Down2Excel( {DownCols: makeHiddenSkipCol(sheetObj), SheetDesign:1,Merge:1 });
     		}
        break;

        case 'EXCEL_ALL':   
        	if(sheetObj.RowCount() < 1){//no data	
	   			ComShowCodeMessage("COM132501");
        	} else if (sheetObj.GetTotalRows() > formObj.endMaxIdx.value) { //out of memory
        		alert(getLabel('FMS_COM_ALT088'));
        		formObj.etd_strdt.focus();
        		return;
	   		} else {
	   			excelDown3(sheetObj);
	   		}
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
        /* #6859:[KING FREIGHT] ADDING 'LOG' BUTTON ON B/L LIST UNDER LOCAL TRANSPORT */
   	 	case "LOG":
	   	 		if(sheetObj.GetTotalRows()== 0){
	   	 		//There is no data
	   	 		alert(getLabel('FMS_COM_ALT004'));
			}
	   	 	else{
	   	 		if(/'|&/g.test( sheetObj.GetCellValue(sheetObj.GetSelectRow(), "mbl_no") )){
	   	 			alert("MBL data has special characters ");
	   	 		}else{		   	 		
	   	 			var sRow=sheetObj.GetSelectRow();
	   	 			var reqParam='?s_bl_inv=' + sheetObj.GetCellValue(sRow, "ref_no");
					reqParam += '&f_his_type=' + "";
					reqParam += '&f_cmd=' + "11";
					reqParam += '&p_gb=' + "POP";
					reqParam += '&f_oth_seq=' + sheetObj.GetCellValue(sheetObj.GetSelectRow(), "oth_seq");
					popGET('MGT_HIS_0041.clt'+reqParam, '', 1240, 670, "scroll:yes;status:no;help:no;");
	   	 		}
			}
	   	 	break;	
	}// end switch
	
	//Log Monitor Start:Btn
	if(srcName!="SEARCHLIST") gLogMonitorBtnClick(srcName);
	//Log Monitor End:Btn
	
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

//#52472 [CLT] 안정성 : 엑셀 다운로드 2016.12.07
function excelDown3(mySheet){
	var formObj = document.frm1;
	formObj.f_cmd.value = COMMAND10;
	var formParam = FormQueryString(formObj);
	var param = {
					DownCols: makeHiddenSkipCol(mySheet)
					,SheetDesign:1
					,Merge:1
					,URL:"./OTH_OPR_0020.clt"
					,ExtendParam:formParam
					,ExtendParamMethod:"GET"
				};
	mySheet.DirectDown2Excel(param);
	
}
/**
 * 달력 POPUP
 * @param doWhat
 * @param frm1
 * @return
*/
function doDisplay(doWhat, frm1){
	var formObj=document.frm1;
    switch(doWhat){
        case 'POST_DATE':   //달력 조회 From ~ To 팝업 호출 
        	var cal = new ComCalendarFromTo();
	        cal.select(formObj.post_frmdt, formObj.post_todt, 'MM-dd-yyyy');
        break;
        case 'INVOICE_DATE':
            var cal = new ComCalendarFromTo();
	        cal.select(formObj.invoice_frmdt, formObj.invoice_todt, 'MM-dd-yyyy');
        break;
        case 'CUSTOMER_POPLIST':
        	rtnary=new Array(1);
        	rtnary[0]="";
	   		rtnary[1]=formObj.cust_nm.value;
	   		rtnary[2]=window;
  	        
  	        callBackFunc = "CUSTOMER_POPLIST";
  	        modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
        break;
	    case 'DATE11':   //달력 조회 From ~ To 팝업 호출 
	    	var cal=new ComCalendarFromTo();
	        cal.displayType="date";
	        cal.select(formObj.eta_strdt, formObj.eta_enddt,  'MM-dd-yyyy');
	    break;
	    case 'DATE12':   //달력 조회 From ~ To 팝업 호출 
	    	var cal=new ComCalendarFromTo();
		    cal.displayType="date";
		    cal.select(formObj.f_eta_strdt,  formObj.f_eta_enddt,  'MM-dd-yyyy');
	    break;
	    case 'DATE13':   //달력 조회 From ~ To 팝업 호출 
	    	var cal=new ComCalendarFromTo();
		    cal.displayType="date";
		    cal.select(formObj.etd_strdt,  formObj.etd_enddt,  'MM-dd-yyyy');
	    break;        
    }
}
function CUSTOMER_POPLIST(rtnVal){
  	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	} else {
		var rtnValAry=rtnVal.split("|");
		formObj.cust_cd.value=rtnValAry[0];
		formObj.cust_nm.value=rtnValAry[2];// loc_nm
	}
  }
//--------------------------------------------------------------------------------------------------------------
//IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
var docObjects=new Array();
var sheetCnt=0;
//#6837 : [JAPT] B/L Type column add request on BL List
var COMBOOTHTypeTEXT = ' |';
var COMBOOTHTypeCODE = ' |';
/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
function loadPage() {
	var formObj=document.frm1;
	
	
//	개인정보 관리화면 정렬순서 2016.03 
	ajaxSendPost(setOrderByInfo, 'reqVal','&goWhere=aj&bcKey=searchTbUserOrderbyInfoAttr&pgm_usr_id='+formObj.user_id.value+'&pgm_url=./OTH_OPR_0020.clt',	'./GateServlet.gsl');

	
    //LHK, 20141029 #44986 [BINEX]Office - All Option
    setOfficeAllOption(formObj.f_ofc_cd);

    for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
    //사용자가 저장한 Header 정보를 읽어온다.
    IBS_RestoreGridSetting(formObj.user_id.value, getPageURL(), docObjects[0], false, "RestoreGrid");
    
	/* operation 권한이 없는 경우 */    	   		
	var objDisable = false; 
	if (uod_flg == "N"){ 
		objDisable = true;
		formObj.f_opr_usrid.value=usrId;

		formObj.f_opr_usrid.disabled = objDisable; 
		$("#oprBtn").prop('disabled', objDisable);    	   			
	} 
}

function RestoreGrid(){
	var formObj=document.frm1;
	
    //오늘일자구하기
	var now=new Date(); 			
	var year=now.getFullYear(); 			
	var month=now.getMonth() + 1; 		
	var date=now.getDate(); 	
	//4개월전 날짜구하기
	var preDt=new Date(Date.parse(now) - 90 * 1000 * 60 * 60 * 24);
	var preyear=preDt.getFullYear();
	var premonth=preDt.getMonth() + 1;
	if(month < 10){
		month="0"+(month);
	}
	if(date < 10){
		date="0"+date;
	}
	if(premonth < 10){
		premonth="0"+(premonth);
	}
	var fromDay=premonth + "-" + "01" + "-" + preyear;
	var today=month + "-" + date + "-" + year;
	//이번달 말일구하기
	var endDay=getEndDate(today);
	//ZOOT 
	//formObj.post_frmdt.value=fromDay;
	//formObj.post_todt.value=endDay;
	
	doWork("SEARCHLIST");
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
  * Paging 항목 선택시 호출되
  */
function goToPage(callPage){
	docObjects[0].RemoveAll();
 	document.frm1.f_CurPage.value=callPage;
 	doWork('SEARCHLIST', '');
}

function entSearch(){
	if(event.keyCode == 13){
		document.frm1.f_CurPage.value='';
		doWork('SEARCHLIST');
	}
}

/**
  * 목록 조회건수 변경시 호출됨
  */
function viewCntChg(){
 	document.frm1.f_CurPage.value=1;
 	doWork('SEARCHLIST');
}
/**
  * 목록 조회건수 변경시 호출됨
  */
function searchList(){
 	document.frm1.f_CurPage.value=1;
 	doWork('SEARCHLIST');
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
             (22, 0, 0, false);
             var cnt=0;

             SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

             var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
             var headers = [ { Text:getLabel('OTH_OPR_0020_HDR1'), Align:"Center"} ];
             InitHeaders(headers, info);

             var cols = [ 
                    {Type:"Seq",       Hidden:0,   Width:40,   Align:"Center",  ColMerge:1,   SaveName:"seq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,   Width:35,   Align:"Center",  ColMerge:1,   SaveName:"block_flag",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,   Width:90,   Align:"Center",  ColMerge:1,   SaveName:"ref_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Date",      Hidden:0,   Width:70,   Align:"Center",  ColMerge:1,   SaveName:"lod_dt_tm",    KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,   Width:40,   Align:"Center",  ColMerge:1,   SaveName:"lod_tm",    KeyField:0,   CalcLogic:"",   Format:"##:##",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Date",      Hidden:0,   Width:70,   Align:"Center",  ColMerge:1,   SaveName:"etd_dt_tm",    KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Date",      Hidden:0,   Width:70,   Align:"Center",  ColMerge:1,   SaveName:"eta_dt_tm",    KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    
                    //#873 [STARWAY] LOAD DATE, DATE OF RECEIPT FIELDS TO BE ADDED
                    {Type:"Date",      Hidden:0,   Width:70,   Align:"Center",  ColMerge:1,   SaveName:"feta_dt_tm",    KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,   Width:40,   Align:"Center",  ColMerge:1,   SaveName:"feta_tm",    KeyField:0,   CalcLogic:"",   Format:"##:##",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    
                    {Type:"Date",      Hidden:0,   Width:70,   Align:"Center",  ColMerge:1,   SaveName:"post_dt",      KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,   Width:50,   Align:"Center",  ColMerge:1,   SaveName:"ofc_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,   Width:100,  Align:"Left",    ColMerge:1,   SaveName:"mbl_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,   Width:100,  Align:"Left",    ColMerge:1,   SaveName:"hbl_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,   Width:120,  Align:"Left",    ColMerge:1,   SaveName:"cntr_no",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,   Width:90,   Align:"Left",    ColMerge:1,   SaveName:"vsl_flt",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1,   Width:70,   Align:"Center",  ColMerge:1,   SaveName:"cust_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,   Width:120,  Align:"Left",    ColMerge:1,   SaveName:"cust_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,   Width:120,  Align:"Left",    ColMerge:1,   SaveName:"shpr_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,   Width:120,  Align:"Left",    ColMerge:1,   SaveName:"cnee_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,   Width:120,  Align:"Left",    ColMerge:1,   SaveName:"cust_ref_no",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1,   Width:120,  Align:"Left",    ColMerge:0,   SaveName:"pol_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
 	                {Type:"Text",      Hidden:0,   Width:120,  Align:"Left",    ColMerge:0,   SaveName:"pol_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
 	                {Type:"Text",      Hidden:1,   Width:120,  Align:"Left",    ColMerge:0,   SaveName:"pod_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
 	                {Type:"Text",      Hidden:0,   Width:120,  Align:"Left",    ColMerge:0,   SaveName:"pod_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                    {Type:"Text",      Hidden:1,   Width:30,   Align:"Center",  ColMerge:0,   SaveName:"frt_chk",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,   Width:30,   Align:"Center",  ColMerge:0,   SaveName:"ar_chk",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,   Width:30,   Align:"Center",  ColMerge:0,   SaveName:"ap_chk",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,   Width:30,   Align:"Center",  ColMerge:0,   SaveName:"dc_chk",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1,   Width:60,   Align:"Center",  ColMerge:1,   SaveName:"op_useid",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1,   Width:60,   Align:"Center",  ColMerge:1,   SaveName:"sls_usrid",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,   Width:80,   Align:"Center",  ColMerge:1,   SaveName:"op_usenm",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,   Width:80,   Align:"Center",  ColMerge:1,   SaveName:"sls_usrnm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    //#4980 [Best Ocean] Created Time and Last Modify Time columns add to BL List
                    {Type:"Date",      Hidden:0,  Width:130,  Align:"Center",  ColMerge:0,   SaveName:"rgst_tms",          KeyField:0,   CalcLogic:"",   Format:"YmdHm",       PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:110,  Align:"Center",  ColMerge:0,   SaveName:"modi_usr_nm",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Date",      Hidden:0,  Width:110,  Align:"Center",  ColMerge:0,   SaveName:"modi_tms",          KeyField:0,   CalcLogic:"",   Format:"YmdHm",       PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    //#6837 : [JAPT] B/L Type column add request on BL List
                    {Type:"Combo",      Hidden:0, Width:80,   Align:"Center",  ColMerge:0,   SaveName:"oth_type",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                    /*OFVFOUR-7597 [StarCluster-Mex] Adding G.WGT(KG) / G.WGT(LB) column in BL list*/
                    {Type:"Text",      Hidden:0,   Width:80,   Align:"Center",  ColMerge:1,   SaveName:"grs_wgt_k",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,   Width:80,   Align:"Center",  ColMerge:1,   SaveName:"grs_wgt_l",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    
                    {Type:"Text",      Hidden:1,   Width:60,   Align:"Center",  ColMerge:1,   SaveName:"oth_seq",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1,   Width:60,   Align:"Center",  ColMerge:1,   SaveName:"sts_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Status",    Hidden:1,   Width:1,    Align:"Center",  ColMerge:1,   SaveName:"ibflag" },
                    {Type:"Text",      Hidden:1,   Width:0,    Align:"Center",  ColMerge:0,   SaveName:"Indexing" } ];
              
             InitColumns(cols);

             SetEditable(1);
             //InitViewFormat(0, "post_dt", 		"MM-dd-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
             //InitViewFormat(0, "eta_dt_tm", 	"MM-dd-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
             //InitViewFormat(0, "etd_dt_tm", 	"MM-dd-yyyy"); //그리드에 보여지는 날짜포멧을 월/일/년 으로 설정
             SetActionMenu("Column Hidden|*-|Header Setting Save|Header Setting Reset");
             SetSheetHeight(450);
             resizeSheet();
 			//#6837 : [JAPT] B/L Type column add request on BL List
 			SetColProperty('oth_type', {ComboText:COMBOOTHTypeTEXT, ComboCode:COMBOOTHTypeCODE} );
         }                                                      
           break;
           
       <!-- ############################################### COMMON MEMO 2-4 ##################################################### -->
         case 2:      //IBSheet1 init
      	   initMemo(sheetObj);                                              
         break;
       <!-- ############################################### COMMON MEMO 2-4 ##################################################### -->
     }
}

function resizeSheet() {
	ComResizeSheet(docObjects[0]);
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
//조회 후 페이지징 표시
function sheet1_OnSearchEnd(sheetObj, errMsg){
	for(var i=1; i<=sheetObj.LastRow();i++){
		if(sheetObj.GetCellValue(i, "sts_cd") == "B") {
			sheetObj.SetCellValue(i, "block_flag","Y");
			sheetObj.SetCellFontColor(i, "block_flag","#FF0000");
		}
	}
	if(errMsg == undefined  || errMsg==null || errMsg =='' ){		
		if(delete_show_msg == 'Y'){
			setTimeout("showCompleteProcess()",1000);
			delete_show_msg = 'N';
		}
	} 		
 	if(frm1.f_cmd.value==REMOVE){
 		doWork("SEARCHLIST");
 	}
 	doDispPaging(docObjects[0].GetCellValue(1, 'Indexing'), getObj('pagingTb'));

	<!-- ############################################### COMMON MEMO 4-4 ##################################################### -->
	var intg_bl_seq = '';
	var palt_mnu_cd = '';
	var opr_no = '';
	
	if(sheetObj.GetTotalRows()>0){
		intg_bl_seq = sheetObj.GetCellValue(sheetObj.GetSelectRow(), "ref_no");
		palt_mnu_cd = 'OTH';
		opr_no = sheetObj.GetCellValue(sheetObj.GetSelectRow(), "ref_no");
	}
	
	setMemoParam(palt_mnu_cd, intg_bl_seq, opr_no);
	<!-- ############################################### COMMON MEMO 4-4 ##################################################### -->
} 
function sheet1_OnSaveEnd(sheetOBj, ErrMsg){
	var sheetObj=docObjects[0];
	var formObj=document.frm1;
	if(ErrMsg==undefined || ErrMsg==null || ErrMsg!=''){
		return;
	}
	//Save success!
		//alert(getLabel('FMS_COM_NTYCOM'));
		/*Changed the Alert Message Type.130824 - LHK 20130822 #19443 Save & Complete Alert message 변경 */
	showCompleteProcess();
	doWork('SEARCHLIST');
}
function sheet1_OnClick(sheetObj,Row,Col){
	var sheetObj=docObjects[0];
	var formObj=document.frm1;
	formObj.ref_no.value	=sheetObj.GetCellValue(Row, "ref_no");
	formObj.oth_seq.value	=sheetObj.GetCellValue(Row, "oth_seq");
	for(var i=1; i<=sheetObj.LastRow();i++){
		if(i == Row){
			sheetObj.SetRowBackColor(i,"#DFFFFF");
		}else{
			sheetObj.SetRowBackColor(i,"#FFFFFF");
		}
	}
	
	if(sheetObj.ColSaveName(Col) == "ref_no" || Col==-2){
		var intg_bl_seq =  sheetObj.GetCellValue(Row, "ref_no");
		var palt_mnu_cd = 'OTH';
		var opr_no = sheetObj.GetCellValue(Row, "ref_no");
		setMemoParam(palt_mnu_cd, intg_bl_seq, opr_no);
		doWorkMemo("SEARCHMEMO");
	}
}

/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnClick이벤트 발생시.
 */
function sheet1_OnDblClick(sheetObj,Row,Col){
	var formObj=document.frm1;
	var ref_no=sheetObj.GetCellValue(Row, "ref_no");
	var oth_seq=sheetObj.GetCellValue(Row, "oth_seq");
    var paramStr="./OTH_OPR_0010.clt?f_cmd=-1&ref_no="+escape(ref_no)+"&oth_seq="+oth_seq;
    parent.mkNewFrame('MISC. Operation Entry', paramStr, "OTH_OPR_0010_SHEET_" + ref_no+"_"+oth_seq);
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
				if(sub_str=="location"){
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
				if(sub_str=="location"){
					s_type=sub_str;
				}else if(sub_str=="trdpCode"){
					s_type=sub_str;
				}else{
					s_type=str;
				}
				ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
				//			}
		}else if ( tmp == "onChange" ) {
			//			if ( s_code != "" ) {
				CODETYPE=str;
				var sub_str=str.substring(0,str.indexOf("_s"));
				s_type=sub_str;
				ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
				//			}
		}
//	}
}
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
			}else if(CODETYPE == "location_por"){
				formObj.f_por_cd.value=masterVals[0];
				formObj.f_por_nm.value=masterVals[3];
			}else if(CODETYPE == "location_pod"){
				formObj.f_pod_cd.value=masterVals[0];
				formObj.f_pod_nm.value=masterVals[3];
			}else if(CODETYPE == "location_del"){
				formObj.f_del_cd.value=masterVals[0];
				formObj.f_del_nm.value=masterVals[3];
			}else if(CODETYPE == "trdpCode"){
				formObj.f_trdp_cd.value=masterVals[0]; 
				formObj.f_trdp_full_nm.value=masterVals[3];//loc_nm
			}
		}else{
			if(CODETYPE == "location_pol"){
				formObj.f_pol_cd.value="";
				formObj.f_pol_nm.value="";
			}else if(CODETYPE == "location_por"){
				formObj.f_por_cd.value="";
				formObj.f_por_nm.value="";
			}else if(CODETYPE == "location_pod"){
				formObj.f_pod_cd.value="";
				formObj.f_pod_nm.value="";
			}else if(CODETYPE == "location_del"){
				formObj.f_del_cd.value="";
				formObj.f_del_nm.value="";
			}else if(CODETYPE == "trdpCode"){
				formObj.f_trdp_cd.value=""; 
				formObj.f_trdp_full_nm.value="";
			}
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
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
function formValidation(){
	var formObj=document.frm1;
	if(trim(formObj.post_frmdt.value)!= "" && trim(formObj.post_todt.value) != ""){
		if(getDaysBetweenFormat(formObj.post_frmdt,formObj.post_todt,"MM-dd-yyyy") < 0){
			alert(getLabel('FMS_COM_ALT033'));
			formObj.post_todt.focus();
			return false;
		}
	}	
	if(!chkSearchCmprPrd(false, frm1.post_frmdt, frm1.post_todt)){
		return false;
	}
	return true;
}
//Calendar flag value
var firCalFlag=false;
function checkOthInvReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(doc[1]=='N'){
			isInvStsOk=false;
		}else{
			isInvStsOk=true;
		}
	}
}

function checkBlPdOrd(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(doc[1]=='Y'){
			isPdOrdStsOk=true;
		}else{
			isPdOrdStsOk=false;
		}
	}
}

function SHIP_TRDP_POPLIST(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	} else {
		var rtnValAry = rtnVal.split("|");
		formObj.shpr_nm.value = rtnValAry[2];// full_nm
	}
}
function CNEE_TRDP_POPLIST(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	} else {
		var rtnValAry = rtnVal.split("|");
		formObj.cnee_nm.value = rtnValAry[2];// full_nm
	}
}
function CUST_TRDP_POPLIST(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	} else {
		var rtnValAry = rtnVal.split("|");
		formObj.cust_nm.value = rtnValAry[2];// full_nm
	}
}

function POL_LOCATION_POPLIST(rtnVal){
	var formObj=document.frm1;
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
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}
    else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_pod_cd.value=rtnValAry[0];//loc_cd 
		formObj.f_pod_nm.value=rtnValAry[2];//loc_nm
	}
}

//개인정보 관리화면 정렬순서 2016.03 
function setOrderByInfo(reqVal) {

	var formObj = document.frm1;
	var doc = getAjaxMsgXML(reqVal);
	var orderByInfo = "";
	if (doc[0] == 'OK') {
		if (typeof (doc[1]) == "undefined") {
			orderByInfo = "";
		} else {
			orderByInfo = doc[1];
		}
	}
	formObj.f_orderByInfo.value = orderByInfo; 
}


function searchValueClear(){
	var formObj = document.frm1;
	if (uod_flg == "N"){ 
		
	}else{
		formObj.f_opr_usrid.value = "";
	}
}

//OFVFOUR-8056: [BNX-LA] Adding Search option in AR/AP list and OIH List screen
function openPopUp(popName, curObj, valObj){
	cmmOpenPopUp(popName, curObj, "S", "O", valObj, "H");
}

function COMMODITY_POPLIST(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_cmdt_cd.value = rtnValAry[0];
		formObj.f_cmdt_nm.value = rtnValAry[2];
	}
}

var cur_curObj;
var cur_airSeaTp;
var cur_bndTp;
var cur_valObj;
var cur_bizTp;
var curObjId="";
function cmmOpenPopUp(popName, curObj, airSeaTp, bndTp, valObj, bizTp,cobFlag){
	cur_curObj = curObj;
	cur_airSeaTp = airSeaTp;
	cur_bndTp = bndTp;
	cur_valObj = valObj;
	cur_bizTp = bizTp;
	var formObj=document.frm1;
	try {
		switch(popName) {
			case "CUSTBKG":
				rtnary=new Array(1);
				rtnary[0]="1";
				rtnary[1]="";
				rtnary[2]=window;
				callBackFunc = "CUSTBKG_callBackFunc";
				modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");

				break;
			case "PRINT":
				if(formObj.intg_bl_seq.value == ""){
					//
					alert(getLabel('FMS_COM_ALT010'));
				}else{
					var reqParam='?intg_bl_seq='  +formObj.intg_bl_seq.value;
					reqParam += '&house_bl_no=' +formObj.f_bl_no.value;

					if(formObj.rider_lbl.style.color=="black"){
						reqParam += '&rider_flg=N';
					}else{
						reqParam += '&rider_flg=Y';
					}

					reqParam += '&agent_text=' + sea_body;
					//#1912 [PATENT]B/L 출력 AS AGENT FOR THE CARRIER 설정
					/*
                    if(user_ofc_cnt_cd=="JP"){
                    }else if(user_ofc_cnt_cd=="DE"){
                        reqParam += " " + formObj.lnr_trdp_nm.value.replaceAll('&','%26');
                    }else{
                        reqParam += ", " + formObj.lnr_trdp_nm.value.replaceAll('&','%26');
                    }
                    */
					// #6897 [BNX] Adjust B/L (Zen#4238)
					if(sea_body.lastIndexOf('(END') != -1){
						reqParam = reqParam.substring(0,reqParam.lastIndexOf("(END)"));
					} else if(user_ofc_cnt_cd !="JP"){
						reqParam += " " + formObj.lnr_trdp_nm.value.replaceAll('&','%26');
					}


					reqParam += '&mailTitle=' + 'House BL : ' + frm1.bl_no.value;
					var trdp_cd='';
					trdp_cd += '(' + '\'' + frm1.shpr_trdp_cd.value + '\'';
					trdp_cd += ',' + '\'' + frm1.prnr_trdp_cd.value + '\'' + ')';

					ajaxSendPost(getMailTo, 'reqVal', '&goWhere=aj&bcKey=getMailTo&trdp_cd='+trdp_cd, './GateServlet.gsl');
					reqParam += '&mailTo=' + mailTo;
					if($("#shp_mod_cd").length) {
						var shpModCd = $("#shp_mod_cd option:selected").val();
						reqParam += '&shp_mod_cd=' + shpModCd;
					}
					//OFVFOUR-7452 [SOUTH EAST WORLD WIDE] CREATING HB/L PRINT FUNCTION IN OIH B/L ENTRY
					if(!(cur_airSeaTp == "S" && cur_bndTp =="I" && cur_bizTp =="H")){
						//#6301 [JAPT] Mail sending function related request(requirement 1)
						reqParam += '&lnr_bkg_no=' + frm1.lnr_bkg_no.value;
						reqParam += '&trnk_vsl_nm=' + frm1.trnk_vsl_nm.value;
						reqParam += '&trnk_voy=' + frm1.trnk_voy.value;
						var etdDtTm='';
						if(frm1.etd_dt_tm.value != ""){
							etdDtTm = frm1.etd_dt_tm.value.substring(6,10) + "." + frm1.etd_dt_tm.value.substring(0,2) + "." + frm1.etd_dt_tm.value.substring(3,5);
						}
						reqParam += '&etd_dt_tm=' + etdDtTm;
					}
					reqParam += '&airSeaTp=' + cur_airSeaTp;
					reqParam += '&bndTp=' + cur_bndTp;
					reqParam += '&bizTp=' + cur_bizTp;
					popGET('RPT_PRN_0020.clt'+reqParam, '', 440, 616, "scroll:yes;status:no;help:no;");
				}
				break;
			case "B_CONFIRM":
				if(formObj.intg_bl_seq.value == ""){
					//
					alert(getLabel('FMS_COM_ALT010'));
				}else{
					var reqParam='?intg_bl_seq='  +formObj.intg_bl_seq.value;
					//reqParam += '&house_bl_no=' +formObj.f_bl_no.value;
					//reqParam += '&v_ofc_eng_nm=' +formObj.v_ofc_eng_nm.value;
					//reqParam += '&v_eml=' +formObj.v_eml.value;
					reqParam += '&v_ofc_cd=' +formObj.u_ofc_cd.value;
					//reqParam += '&v_phn=' +formObj.v_phn.value;
					//reqParam += '&v_fax=' +formObj.v_fax.value;

					popGET('RPT_PRN_0240.clt'+reqParam, '', 780, 530, "scroll:yes;status:no;help:no;");
				}
				break;
			case "PACKAGE_POPLIST":
				rtnary=new Array(1);
				rtnary[0]="1";
				callBackFunc = "PACKAGE_POPLIST";
				modal_center_open('./CMM_POP_0120.clt', rtnary, 450,480,"yes");

				break;

			case "CNEE_POPLIST":
				var opt_key_sec = "BL_SAME_AS_CNEE01";
				ajaxSendPost(setBlSameAsCnee, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key_sec, "./GateServlet.gsl");

				rtnary=new Array(2);
				rtnary[0]="1";
				/* jsjang 2013.8.6 #18801 trade partner 조회조건 변경 */
				var iata_val="";
				curObjId=curObj.id;
				var cstmTpCd='';
				if(typeof(valObj)!='undefined'){
					rtnary[1]=valObj;
				}else{
					rtnary[1]="";
				}
				rtnary[2]=window;
				callBackFunc = "CNEE_POPLIST";
				modal_center_open('./CMM_POP_0010.clt?callTp='+cstmTpCd+'&iata_cd='+iata_val, rtnary, 1150,650,"yes");

				break;

			case "LINER_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
				var opt_key_sec = "BL_SAME_AS_CNEE01";
				ajaxSendPost(setBlSameAsCnee, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key_sec, "./GateServlet.gsl");

				rtnary=new Array(2);
				rtnary[0]="1";
				/* jsjang 2013.8.6 #18801 trade partner 조회조건 변경 */
				var iata_val="";
				curObjId=curObj.id;
				//`alert(curObjId);
				var cstmTpCd='';
				//선사
				if(curObjId=='liner'){
					//alert(airSeaTp);
					if(airSeaTp=='A'){
						cstmTpCd='AC';
					}else{
						cstmTpCd='LN';
					}
					//Shipper/Consignee인경우
				}else if(curObjId=='shipper'||curObjId=='consignee'){
					cstmTpCd='';
					// 파트너사
				}else if(curObjId=='partner'){
					cstmTpCd='';
					//콘솔사
				}else if(curObjId=='console'){
					cstmTpCd='PR';
				}else if(curObjId=='cust'){
					cstmTpCd='';
				}else if(curObjId=='carr'){
					//cstmTpCd = 'LN';
					cstmTpCd='';
				}else if(curObjId=='notify'){
					cstmTpCd='';
				}else if(curObjId=='ashipper'){
					cstmTpCd='';
				}else if(curObjId=='vndr'){
					cstmTpCd='';
				}else if(curObjId=='agent'){
					cstmTpCd='';
				}else if(curObjId=='partner2'){
					cstmTpCd='';
				}else if(curObjId=='rcv'){
					cstmTpCd='';
				}else if(curObjId=='pu'){
					cstmTpCd='';
				}else if(curObjId=='cgo_pu'){
					cstmTpCd='';
				}else if(curObjId=='cy' || curObjId=='cfs' || curObjId== 'frt_loc'){
					//alert(airSeaTp);
					if(airSeaTp=='A'){
						cstmTpCd='';
					}
					//#3508 Multi Language 옵션인 경우 TRDP Popup 에서 Firm Check 제거
					if(MULTI_LANGUAGE != 'Y') {
						iata_val="Y" // jsjang 수정예정 , iata_cd 값 자체는 텍스트 데이타임.
					}
				}else if(curObjId=='door'){
					cstmTpCd='';
				}else if(curObjId=='third'){
					cstmTpCd='';
				}else if(curObjId=='frt_loc'){
					cstmTpCd='';
				}else if(curObjId=='forwarder'){
					cstmTpCd='';
				}
				// 2011.12.27 value parameter
				if(typeof(valObj)!='undefined'){
					rtnary[1]=valObj;
				}else{
					rtnary[1]="";
				}
				rtnary[2]=window;
				callBackFunc = "LINER_POPLIST";
				modal_center_open('./CMM_POP_0010.clt?callTp='+cstmTpCd+'&iata_cd='+iata_val, rtnary, 1150,650,"yes");

				break;
			case "LINER_POPLIST_BLANK"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
				var opt_key_sec = "BL_SAME_AS_CNEE01";
				ajaxSendPost(setBlSameAsCnee, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key_sec, "./GateServlet.gsl");

				rtnary=new Array(2);
				rtnary[0]="1";
				/* jsjang 2013.8.6 #18801 trade partner 조회조건 변경 */
				var iata_val="";
				curObjId=curObj.id;
				//`alert(curObjId);
				var cstmTpCd='';
				//선사
				if(curObjId=='liner'){
					//alert(airSeaTp);
					if(airSeaTp=='A'){
						cstmTpCd='AC';
					}else{
						cstmTpCd='LN';
					}
					//Shipper/Consignee인경우
				}else if(curObjId=='shipper'||curObjId=='consignee'){
					cstmTpCd='';
					// 파트너사
				}else if(curObjId=='partner'){
					cstmTpCd='';
					//콘솔사
				}else if(curObjId=='console'){
					cstmTpCd='PR';
				}else if(curObjId=='cust'){
					cstmTpCd='';
				}else if(curObjId=='carr'){
					//cstmTpCd = 'LN';
					cstmTpCd='';
				}else if(curObjId=='notify'){
					cstmTpCd='';
				}else if(curObjId=='ashipper'){
					cstmTpCd='';
				}else if(curObjId=='vndr'){
					cstmTpCd='';
				}else if(curObjId=='agent'){
					cstmTpCd='';
				}else if(curObjId=='partner2'){
					cstmTpCd='';
				}else if(curObjId=='rcv'){
					cstmTpCd='';
				}else if(curObjId=='pu'){
					cstmTpCd='';
				}else if(curObjId=='cgo_pu'){
					cstmTpCd='';
				}else if(curObjId=='cy' || curObjId=='cfs' || curObjId== 'frt_loc'){
					//alert(airSeaTp);
					if(airSeaTp=='A'){
						cstmTpCd='';
					}
					//#3508 Multi Language 옵션인 경우 TRDP Popup 에서 Firm Check 제거
					if(MULTI_LANGUAGE != 'Y') {
						iata_val="Y" // jsjang 수정예정 , iata_cd 값 자체는 텍스트 데이타임.
					}
				}else if(curObjId=='door'){
					cstmTpCd='';
				}else if(curObjId=='third'){
					cstmTpCd='';
				}else if(curObjId=='frt_loc'){
					cstmTpCd='';
				}
				rtnary[1]="";
				rtnary[2]=window;
				callBackFunc = "LINER_POPLIST";
				modal_center_open('./CMM_POP_0010.clt?callTp='+cstmTpCd+'&iata_cd='+iata_val, rtnary, 1150,650,"yes");

				break;

			case "LINER_POPLIST_MS"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
				rtnary=new Array(2);
				rtnary[0]="1";
				curObjId=curObj.id;
				var cstmTpCd='CS';
				//선사
				if(curObjId=='liner'){
					if(airSeaTp=='A'){
						cstmTpCd='AC';
					}else{
						cstmTpCd='LN';
					}
				}
				// 2011.12.27 value parameter
				if(typeof(valObj)!='undefined'){
					rtnary[1]=valObj;
				}else{
					rtnary[1]="";
				}
				rtnary[2]=window;
				callBackFunc = "LINER_POPLIST_MS";
				modal_center_open('./CMM_POP_0010.clt?callTp='+cstmTpCd, rtnary, 1150,650,"yes");

				break;


			case "LINER_POPLIST_M"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
				rtnary=new Array(2);
				rtnary[0]="1";
				curObjId=curObj.id;
				var cstmTpCd='CS';
				if(curObjId=='liner'){
					if(airSeaTp=='A'){
						cstmTpCd='AC';
					}else{
						cstmTpCd='LN';
					}
				}
				//2011.12.27 value parameter
				if(typeof(valObj)!='undefined'){
					rtnary[1]=valObj;
				}else{
					rtnary[1]="";
				}
				rtnary[2]=window;
				callBackFunc = "LINER_POPLIST_M";
				modal_center_open('./CMM_POP_0010.clt?callTp='+cstmTpCd, rtnary, 1150,650,"yes");

				break;
			case "LINER_POPLIST_AIR_M"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
				rtnary=new Array(2);
				rtnary[0]="1";
				curObjId=curObj.id;
				var cstmTpCd='CS';
				if(curObjId=='liner'){
					if(airSeaTp=='A'){
						cstmTpCd='AC';
					}else{
						cstmTpCd='LN';
					}
				}
				//2011.12.27 value parameter
				if(typeof(valObj)!='undefined'){
					rtnary[1]=valObj;
				}else{
					rtnary[1]="";
				}
				rtnary[2]=window;
				callBackFunc = "LINER_POPLIST_AIR_M";
				modal_center_open('./CMM_POP_0010.clt?callTp='+cstmTpCd, rtnary, 1150,650,"yes");
				break;
			case "LINER_POPLIST_IATA"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
				rtnary=new Array(2);
				rtnary[0]="1";
				curObjId=curObj.id;
				var cstmTpCd='CS';
				if(curObjId=='liner'){
					if(airSeaTp=='A'){
						cstmTpCd='AC';
					}else{
						cstmTpCd='LN';
					}
				}
				//2011.12.27 value parameter
				if(typeof(valObj)!='undefined'){
					rtnary[1]=valObj;
				}else{
					rtnary[1]="";
				}
				rtnary[2]=window;
				callBackFunc = "LINER_POPLIST_IATA";
				modal_center_open('./CMM_POP_0010.clt?callTp='+cstmTpCd, rtnary, 1150,650,"yes");
				break;
			case "PIC_POP":
				if(formObj.intg_bl_seq.value == ""){
					//House B/L 정보가 없습니다. House B/L 저장후 PIC정보를 등록할수 있습니다.
					alert(getLabel('FMS_COM_ALT015'));
					return;
				}else{
					rtnary=new Array(1);
					curObjId=curObj.id;
					rtnary[0]="";
					rtnary[2]=formObj.intg_bl_seq.value;
					if(curObjId == "shipper"){
						if(formObj.shpr_trdp_cd.value == ""){
							//shipper 정보가 없습니다. shipper정보를 선택후  PIC정보를 등록할수 있습니다.
							alert(getLabel('FMS_COM_ALT004') + " - " + getLabel('FMS_COD_SHIP'));
							//formObj.shpr_trdp_cd.focus();
							return;
						}
						rtnary[0]="S01";
						rtnary[1]=formObj.shpr_trdp_cd.value;
					}else if(curObjId == "consignee"){
						if(formObj.cnee_trdp_cd.value == ""){
							//consignee 정보가 없습니다. consignee정보를 선택후  PIC정보를 등록할수 있습니다.
							alert(getLabel('FMS_COM_ALT004') + " - " + getLabel('FMS_COD_CNEE'));
							//formObj.cnee_trdp_cd.focus();
							return;
						}
						rtnary[0]="C01";
						rtnary[1]=formObj.cnee_trdp_cd.value;
					}else if(curObjId == "notify"){
						if(formObj.ntfy_trdp_cd.value == ""){
							//notify 정보가 없습니다. notify정보를 선택후  PIC정보를 등록할수 있습니다.
							alert(getLabel('FMS_COM_ALT004') + " - " + getLabel('FMS_COD_NTFY'));
							//formObj.ntfy_trdp_cd.focus();
							return;
						}
						rtnary[0]="N01";
						rtnary[1]=formObj.ntfy_trdp_cd.value;
					}else if(curObjId == "ashipper"){
						if(formObj.act_shpr_trdp_cd.value == ""){
							//ashipper 정보가 없습니다. ashipper정보를 선택후  PIC정보를 등록할수 있습니다.
							alert(getLabel('FMS_COM_ALT004') + " - " + getLabel('FMS_COD_ASHP'));
							//formObj.act_shpr_trdp_cd.focus();
							return;
						}
						rtnary[0]="S02";
						rtnary[1]=formObj.act_shpr_trdp_cd.value;
					}else if(curObjId == "liner"){
						if(formObj.lnr_trdp_cd.value == ""){
							//liner 정보가 없습니다. liner정보를 선택후  PIC정보를 등록할수 있습니다.
							alert(getLabel('FMS_COM_ALT004') + " - " + getLabel('FMS_COD_LINE'));
							//formObj.lnr_trdp_cd.focus();
							return;
						}
						rtnary[0]="L01";
						rtnary[1]=formObj.lnr_trdp_cd.value;
					}else if(curObjId == "console"){
						if(formObj.agt_trdp_cd.value == ""){
							//alert("console 정보가 없습니다. console정보를 선택후  PIC정보를 등록할수 있습니다. ");
							alert(getLabel('FMS_COM_ALT004') + " - " + getLabel('FMS_COD_CONS'));
							//formObj.agt_trdp_cd.focus();
							return;
						}
						rtnary[0]="L02";
						rtnary[1]=formObj.agt_trdp_cd.value;
					}else if(curObjId == "partner"){
						if(formObj.prnr_trdp_cd.value == ""){
							//partner 정보가 없습니다. partner정보를 선택후  PIC정보를 등록할수 있습니다.
							alert(getLabel('FMS_COM_ALT004') + " - " + getLabel('FMS_COD_TRPT'));
							//formObj.prnr_trdp_cd.focus();
							return;
						}
						rtnary[0]="P02";
						rtnary[1]=formObj.prnr_trdp_cd.value;
					}
					callBackFunc = "PIC_POP";
					modal_center_open('./SEE_BMD_0028.clt?trdp_cd='+rtnary[1], rtnary, 756,470,"yes");
				}
				break;
			case "COMMODITY_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
				rtnary=new Array(1);
				rtnary[0]="1";
				rtnary[1]="";	//Commodity code
				rtnary[2]=curObj.value;	//Commodity name
				callBackFunc = "COMMODITY_POPLIST";
				/*20170118 #986에 의해 변경*/
				modal_center_open('./CMM_POP_0110.clt', rtnary, 756,483,"yes");
				//modal_center_open('./CMM_POP_0110.clt', rtnary, 556,483,"yes");

				break;
			case "LOCATION_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
				rtnary=new Array(3);
				rtnary[0]=airSeaTp;
				rtnary[1]="BL";
				// 2011.12.27 value parameter
				if(typeof(valObj)!='undefined'){
					rtnary[2]=valObj;
				}else{
					rtnary[2]="";
				}
				rtnary[3]="";
				//[ LHK 20130712 ]
				//Ocean POL, POD 항목의 Location 화면 Popup아이콘에 Type=L01 지정
				//Air 의 Departure, Trans1, Trans2, Trans3, Destination 항목의 Location 화면 Popup아이콘에 Type=L02 지정
				rtnary[4]=curObj;
				callBackFunc = "LOCATION_POPLIST";
				modal_center_open('./CMM_POP_0030.clt', rtnary, 806,440,"yes");

				break;
			case "LOCATION_POPLIST_BLANK"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
				rtnary=new Array(3);
				rtnary[0]=airSeaTp;
				rtnary[1]="BL";
				// 2011.12.27 value parameter
//		   		if(typeof(valObj)!='undefined'){
//		   			rtnary[2]=valObj;
//		   		}else{
//		   			rtnary[2]="";
//		   		}
				rtnary[2]="";
				rtnary[3]="";
				//[ LHK 20130712 ]
				//Ocean POL, POD 항목의 Location 화면 Popup아이콘에 Type=L01 지정
				//Air 의 Departure, Trans1, Trans2, Trans3, Destination 항목의 Location 화면 Popup아이콘에 Type=L02 지정
				rtnary[4]=curObj;
				callBackFunc = "LOCATION_POPLIST";
				modal_center_open('./CMM_POP_0030.clt', rtnary, 806,440,"yes");

				break;

			case "NODECODE_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
				rtnary=new Array(1);
				rtnary[0]="1";
				rtnary[1]="ND";//Node Code
				rtnary[2]="L04";//국가코드
				callBackFunc = "NODECODE_POPLIST";
				modal_center_open('./CMM_POP_0030.clt', rtnary, 806,480,"yes");

				break;
			case "USER_POPLIST"://사용자조회 openMean 1=화면에서 오픈, 2=그리드에서 오픈
				rtnary=new Array(1);
				rtnary[0]="1";

				callBackFunc = "USER_POPLIST";
				modal_center_open('./CMM_POP_0060.clt', rtnary, 556,450,"yes");
				break;
			case "OPR_POPLIST"://담당자openMean 1=화면에서 오픈, 2=그리드에서 오픈
				rtnary=new Array(1);
				rtnary[0]="1";
				callBackFunc = "OPR_POPLIST";
				modal_center_open('./CMM_POP_0060.clt', rtnary, 556,450,"yes");
				break;
			case "ISS_POPLIST"://Issued by 조회 openMean 1=화면에서 오픈, 2=그리드에서 오픈
				rtnary=new Array(1);
				rtnary[0]="1";
				callBackFunc = "ISS_POPLIST";
				modal_center_open('./CMM_POP_0060.clt', rtnary, 556,450,"yes");
				break;

			case "ASGN_POPLIST"://Issued by 조회 openMean 1=화면에서 오픈, 2=그리드에서 오픈
				rtnary=new Array(1);
				rtnary[0]="1";
				callBackFunc = "ASGN_POPLIST";
				modal_center_open('./CMM_POP_0060.clt', rtnary, 556,450,"yes");
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
			case "VESSEL_POPLIST_BLANK"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
				rtnary=new Array(2);
				rtnary[0]="1";
				rtnary[1]="";
				callBackFunc = "VESSEL_POPLIST";
				modal_center_open('./CMM_POP_0140.clt', rtnary, 656,470,"yes");

				break;
			case "OFFICE_GRID_POPLIST"://통화코드 openMean 1=화면에서 오픈, 2=그리드에서 오픈
				rtnary=new Array(2);
				rtnary[0]="1";
//		   		rtnary[1] = "111";
				callBackFunc = "OFFICE_GRID_POPLIST";
				modal_center_open('./CMM_POP_0150.clt', rtnary, 556,600,"yes");
				break;
			case "BKNO_POPLIST"://openMean S=해운에서 오픈, A=항공에서 오픈
				rtnary=new Array(1);
				rtnary[0] = formObj.f_bkg_no.value;
				rtnary[1] = '';
				callBackFunc = "BKNO_POPLIST";
				modal_center_open('./CMM_POP_0210.clt', rtnary, 815,480,"yes");
				break;


			case "BKNO_POPLIST_BLANK"://openMean S=해운에서 오픈, A=항공에서 오픈
				rtnary=new Array(1);
				rtnary[0] = "";
				rtnary[1] = '';
				callBackFunc = "BKNO_POPLIST";
				modal_center_open('./CMM_POP_0210.clt', rtnary, 815,480,"yes");
				break;
			case "LNRBKNO_POPLIST"://openMean S=해운에서 오픈, A=항공에서 오픈
				rtnary=new Array(1);
				rtnary[0] = formObj.f_lnr_bkg_no.value;
				rtnary[1] = '';
				callBackFunc = "LNRBKNO_POPLIST";
				modal_center_open('./CMM_POP_0280.clt', rtnary, 815,480,"yes");
				break;
			case "LNRBKNO_POPLIST_BLANK"://openMean S=해운에서 오픈, A=항공에서 오픈
				rtnary=new Array(1);
				rtnary[0] = "";
				rtnary[1] = '';
				callBackFunc = "LNRBKNO_POPLIST";
				modal_center_open('./CMM_POP_0280.clt', rtnary, 815,480,"yes");
				break;
			case "HBL_POPLIST"://  openMean S=해운에서 오픈, A=항공에서 오픈
				rtnary=new Array(1);
				rtnary[0]=airSeaTp;
				rtnary[1]=bndTp;
				callBackFunc = "HBL_POPLIST";
				modal_center_open('./CMM_POP_0170.clt', rtnary, 818,468,"yes");
				break;
			case "MBL_POPLIST"://openMean S=해운에서 오픈, A=항공에서 오픈
				rtnary=new Array(1);
				rtnary[0]=airSeaTp;
				rtnary[1]=bndTp;
				if(curObj.type != "button"){
					rtnary[2]=formObj.f_bl_no.value;
				}else{
					rtnary[2]='';
				}
				rtnary[3]='';

				callBackFunc = "MBL_POPLIST";
				modal_center_open('./CMM_POP_0180.clt', rtnary, 818,500,"yes");

				break;
			case "MBL_POPLIST_BLANK"://openMean S=해운에서 오픈, A=항공에서 오픈
				rtnary=new Array(1);
				rtnary[0]=airSeaTp;
				rtnary[1]=bndTp;
//	   			rtnary[2]=formObj.f_bl_no.value;
				rtnary[2]="";
				rtnary[3]='';

				callBackFunc = "MBL_POPLIST";
				modal_center_open('./CMM_POP_0180.clt', rtnary, 818,500,"yes");

				break;

			case "SR_POPLIST"://openMean S=해운에서 오픈, A=항공에서 오픈
				rtnary=new Array(1);
				rtnary[0]=airSeaTp;
				rtnary[1]=bndTp;
				callBackFunc = "SR_POPLIST";
				modal_center_open('./CMM_POP_0190.clt', rtnary, 818,480,"yes");

				break;
			case "WORKFLOW_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
				rtnary=new Array(1);
				rtnary[0]="1";
				rtnary[1]=airSeaTp+bndTp;

				callBackFunc = "WORKFLOW_POPLIST";
				modal_center_open('./CMM_POP_0100.clt', rtnary, 610,460,"yes");
				break;
			case "STATE_POPLIST"://통화코드 openMean 1=화면에서 오픈, 2=그리드에서 오픈
				rtnary=new Array(2);
				rtnary[0]="1";

				if(typeof(formObj.pol_cnt_cd) != "undefined"){
					rtnary[1]=formObj.pol_cnt_cd.value;
				}else{
					rtnary[1]="";
				}
				callBackFunc = "STATE_POPLIST";
				modal_center_open('./CMM_POP_0310.clt', rtnary, 610,400,"yes");
				break;
			case "REF_POPLIST"://openMean S=해운에서 오픈, A=항공에서 오픈
				rtnary=new Array(3);
				rtnary[0]=airSeaTp;
				rtnary[1]=bndTp;
				rtnary[2]='';
				rtnary[3]=formObj.f_ref_no.value;
				callBackFunc = "REF_POPLIST";
				modal_center_open('./CMM_POP_0180.clt', rtnary, 818,500,"yes");

				break;
			case "REF_POPLIST_BLANK"://openMean S=해운에서 오픈, A=항공에서 오픈
				rtnary=new Array(3);
				rtnary[0]=airSeaTp;
				rtnary[1]=bndTp;
				rtnary[2]='';
//	   			rtnary[3]=formObj.f_ref_no.value;
				rtnary[3]="";
				callBackFunc = "REF_POPLIST";
				modal_center_open('./CMM_POP_0180.clt', rtnary, 818,500,"yes");

				break;

			case "AES_HBL_POPLIST"://  openMean S=해운에서 오픈, A=항공에서 오픈
				rtnary=new Array(1);
				rtnary[0]=airSeaTp;
				rtnary[1]=bndTp;
				callBackFunc = "AES_HBL_POPLIST";
				modal_center_open('./CMM_POP_0170.clt', rtnary, 818,476,"yes");

				break;

			case "COPY_CONFIRM_POPUP"://BL_COPY
				rtnary=new Array(1);
				callBackFunc = "COPY_CONFIRM_POPUP";
				modal_center_open('./CMM_POP_0330.clt', rtnary, 260,200,"no");
				break;
			case "COPY_CONFIRM_POPUP_1"://BL_COPY
				rtnary=new Array(1);
				rtnary[0]= "AIE_BMD_0040";
				callBackFunc = "COPY_CONFIRM_POPUP";
				modal_center_open('./CMM_POP_0330.clt', rtnary, 480,230,"no");
				break;
			/*
			case "COPY_CONFIRM_POPUP_2"://BL_COPY  Vinh.Vo - 04/09/2015 - Modified
				rtnary=new Array(1);
				rtnary[0]= "SEE_BMD_0020";
				callBackFunc = "COPY_CONFIRM_POPUP";
				modal_center_open('./CMM_POP_0330.clt', rtnary, 480,230,"no");
			break;
			*/
			case "COPY_CONFIRM_POPUP_2"://#1374 [IMPEX][독일]OIH BL Copy 시 Option 추가 요청
				rtnary=new Array(1);
				rtnary[0]= "ABL";
				callBackFunc = "COPY_CONFIRM_POPUP";
				modal_center_open('./CMM_POP_0330.clt', rtnary, 480,230,"no");
				break;
			case "COPY_CONFIRM_POPUP_3": //#1741 [PATENT]HBL Copy 옵션에 Filing No 복사여부 추가
				rtnary=new Array(1);
				rtnary[0]= "HBL";
				callBackFunc = "COPY_CONFIRM_POPUP";
				modal_center_open('./CMM_POP_0330.clt', rtnary, 480,230,"no");
				break;
			case "COPY_CONFIRM_POPUP_31": //#1374 [IMPEX][독일]OIH BL Copy 시 Option 추가 요청
				rtnary=new Array(1);
				rtnary[0]= "HBL1";
				callBackFunc = "COPY_CONFIRM_POPUP";
				modal_center_open('./CMM_POP_0330.clt', rtnary, 480,230,"no");
				break;
			case "COPY_CONFIRM_POPUP_4"://#1374 [IMPEX][독일]OIH BL Copy 시 Option 추가 요청
				rtnary=new Array(1);
				rtnary[0]= "OBL";
				callBackFunc = "COPY_CONFIRM_POPUP";
				modal_center_open('./CMM_POP_0330.clt', rtnary, 480,230,"no");
				break;
			case "COUNTRY_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
				rtnary=new Array(1);
				rtnary[0]="1";
				rtnary[1]="";//대륙코드
				callBackFunc = "COUNTRY_POPLIST";
				modal_center_open('./CMM_POP_0020.clt', rtnary, 560,450,"yes");
				break;
			case "STATE_POPLIST"://통화코드 openMean 1=화면에서 오픈, 2=그리드에서 오픈
				rtnary=new Array(2);
				rtnary[0]="1";
				rtnary[1]="";
				callBackFunc = "STATE_POPLIST";
				modal_center_open('./CMM_POP_0310.clt', rtnary, 610,450,"yes");
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