var rtnary=new Array(1);
var callBackFunc = "";

function doWork(srcName){
	if(!btnGetVisible(srcName)){	//버튼의 단축키 사용가능여부 체크
		return;
	}
	//탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
	var sheetObj=docObjects[0];
	var sheetObj1=docObjects[1];
	var formObj=document.frm1;
	switch(srcName) {
	case "SEARCHLIST":
 		//sheetObj.ShowDebugMsg = true;
		formObj.f_cmd.value=SEARCHLIST;
		sheetObj.DoSearch("ACC_INV_0070GS.clt", FormQueryString(formObj) );
		docObjects[1].RemoveAll();
		getObj('excel').style.display='inline';
		getObj('balPrint').style.display='inline';
		//조회 조건을 저장한다.
		formObj.hid_fm_et_dt.value=formObj.fm_et_dt.value;
		formObj.hid_to_et_dt.value=formObj.to_et_dt.value;
		formObj.hid_clt_cmpl_flg.value=formObj.clt_cmpl_flg.value;
		formObj.hid_inv_sts_cd.value=formObj.inv_sts_cd.value;
	break;
	case "SEARCHLIST01":
		//sheetObj.ShowDebugMsg = true;
		formObj.f_cmd.value=SEARCHLIST01;
		sheetObj1.DoSearch("ACC_INV_0070_1GS.clt", FormQueryString(formObj) );
		//sheetObj.ShowDebugMsg = false;
	break;
	//엑셀내려받기
	case "EXCEL":
		if(sheetObj.RowCount() < 1){//no data	
			ComShowCodeMessage("COM132501");
		}else{
			sheetObj.Down2Excel( {DownCols: makeHiddenSkipCol(sheetObj), SheetDesign:1,Merge:1 });
		}
	break;
	//엑셀내려받기
	case "SUBEXCEL":
		if(sheetObj1.RowCount() < 1){//no data	
			ComShowCodeMessage("COM132501");
		}else{
			sheetObj1.Down2Excel( {DownCols: makeHiddenSkipCol(sheetObj1), SheetDesign:1,Merge:1 });
		}
	break;
	case "NEW":
 	   formObj.reset();
 	   sheetObj.RemoveAll();
 	  sheetObj1.RemoveAll();
 	  getObj('prn').style.display="none";
 	  getBtnObj('btnPrint').style.display="none";
    break;
	case "PARTNER_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
		rtnary=new Array(1);
		rtnary[0]="1";
		rtnary[1]="";
		rtnary[2]=window;
		var cstmTpCd='PR';
		callBackFunc = "PARTNER_POPLIST";
   		modal_center_open('./CMM_POP_0010.clt?callTp='+cstmTpCd, rtnary, 1150,650,"yes");
   		
	break;
	case "PRINT":
		var param='open_type=S';
		param += '&hid_air_sea_clss_cd=' + formObj.hid_air_sea_clss_cd.value;
		param += '&hid_bnd_clss_cd=' + formObj.hid_bnd_clss_cd.value;
		param += '&hid_trdp_cd=' + formObj.hid_trdp_cd.value;
		param += '&hid_curr_cd=' + formObj.hid_curr_cd.value;
		param += '&fm_et_dt=' + formObj.hid_fm_et_dt.value;
		param += '&to_et_dt=' + formObj.hid_to_et_dt.value;
		param += '&clt_cmpl_flg=' + formObj.hid_clt_cmpl_flg.value;
		param += '&inv_sts_cd=' + formObj.hid_inv_sts_cd.value;
		param += '&dept_cd=' + formObj.dept_cd.value;
		param += '&date_cd=' + formObj.date_cd.value;
		popGET('RPT_PRN_0040.clt?'+param, '', 385, 330, "scroll:yes;status:no;help:no;");
	break;
	case "BALPRINT":
		popPOST(formObj, 'RPT_PRN_0050.clt', 'PartnerBalanceList', 1025, 740);
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
    for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
    fncFormStart();
    //doWork('SEARCHLIST');
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
             SetConfig( { SearchMode:2, MergeSheet:7, Page:20, DataRowMerge:1 } );

             var info    = { Sort:0, ColMove:1, HeaderCheck:1, ColResize:1 };
             var headers = [ { Text:getLabel('ACC_INV_0070_HDR1'), Align:"Center"} ];
             InitHeaders(headers, info);

             var cols = [ {Type:"Status",    Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"ibflag" },
                 {Type:"Text",      Hidden:0,  Width:320,  Align:"Left",    ColMerge:1,   SaveName:"trdp_nm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:3 },
                 {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:1,   SaveName:"bnd_clss_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:3 },
                 {Type:"Text",      Hidden:0,  Width:120,  Align:"Center",  ColMerge:1,   SaveName:"dept_nm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:3 },
                 {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:"curr_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:3 },
                 {Type:"Float",     Hidden:0,  Width:120,  Align:"Right",   ColMerge:1,   SaveName:"balance",          KeyField:0,   CalcLogic:"|debit|-|credit|",Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:10 },
                 {Type:"Float",     Hidden:0,  Width:100,  Align:"Right",   ColMerge:1,   SaveName:"debit",            KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:10 },
                 {Type:"Float",     Hidden:0,  Width:100,  Align:"Right",   ColMerge:0,   SaveName:"credit",           KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:10 },
                 {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:1,   SaveName:"trdp_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:3 },
                 {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:1,   SaveName:"air_sea_clss_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:3 },
                 {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:1,   SaveName:"bound",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:3 } ];
              
             InitColumns(cols);

             SetEditable(1);
             SetSheetHeight(200);
           }                                                      
           break;
         case 2:      //IBSheet1 init
             with (sheetObj) {
             SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

             var info    = { Sort:0, ColMove:1, HeaderCheck:1, ColResize:1 };
             var headers = [ { Text:getLabel('ACC_INV_0070_HDR2'), Align:"Center"} ];
             InitHeaders(headers, info);

             var cols = [ {Type:"Status",    Hidden:1, Width:25,   Align:"Center",  ColMerge:1,   SaveName:"dtl_ibflag" },
              {Type:"Seq",      Hidden:0,  Width:30,   Align:"Center",  ColMerge:1,   SaveName:"no",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:20 },
              {Type:"Text",      Hidden:0,  Width:65,   Align:"Center",  ColMerge:1,   SaveName:"et_dt_tm",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:20 },
              {Type:"Text",      Hidden:0,  Width:65,   Align:"Center",  ColMerge:1,   SaveName:"clt_due_dt",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:20 },
              {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"mbl_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:20 },
              {Type:"Text",      Hidden:0,  Width:105,  Align:"Left",    ColMerge:1,   SaveName:"bl_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:20 },
              {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"inv_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:20 },
              {Type:"Text",      Hidden:0,  Width:70,   Align:"Left",    ColMerge:1,   SaveName:"buy_inv_no",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:20 },
              {Type:"Text",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:1,   SaveName:"curr_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:20 },
              {Type:"AutoSum",   Hidden:0, Width:80,   Align:"Right",   ColMerge:1,   SaveName:"debit",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:20 },
              {Type:"AutoSum",   Hidden:0, Width:80,   Align:"Right",   ColMerge:1,   SaveName:"clt_amt",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:20 },
              {Type:"AutoSum",   Hidden:0, Width:70,   Align:"Right",   ColMerge:1,   SaveName:"credit",       KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:20 },
              {Type:"AutoSum",   Hidden:0, Width:80,   Align:"Right",   ColMerge:1,   SaveName:"disbur_amt",   KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:20 },
              {Type:"Text",      Hidden:1, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"trdp_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:20 },
              {Type:"Text",      Hidden:1, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"bnd_clss_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:20 } ];
              
             InitColumns(cols);

             SetEditable(1);
             SetColProperty("et_dt_tm", {Format:"####-##-##"} );
             SetColProperty("clt_due_dt", {Format:"####-##-##"} );
             SetSheetHeight(200);

            }                                                      
            break;
     }
}
function sheet1_OnSearchEnd() {
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	var rowCnt=sheetObj.RowCount();
	// 가로 합계를 구해 total에 넣어준다.
	for(var i=1;i<=rowCnt;i++){
		sheetObj.SetCellValue(i, "total",sheetObj.ComputeSum("|debit|+|credit|", i, i), 0);
	}
	// total의 배경색을 소계 색과 동일하게 한다.
//	sheetObj.ColBackColor("total") = "#F7E7EC";
	// curr 마다의 소계를 보여준다.
	sheetObj.ShowSubSum([{StdCol:"curr_cd", SumCols:"curr_cd|debit|credit", Sort:true, ShowCumulate:false, CaptionCol:3, CaptionText:"curr_cd=%s"}]);
	for(var i=rowCnt+1;i<=docObjects[0].RowCount();i++){
		sheetObj.SetCellFont("FontBold", i, 1, i, "bound",1);
		sheetObj.SetCellText(rowCnt+1, 'trdp_nm' ,"Total");
	}
	docObjects[0].ColumnSort("trdp_nm", "ASC", "ASC", true);
}
function sheet2_OnSearchEnd() {
	docObjects[1].SetCellValue(docObjects[1].LastRow(), "no","", 0);
	docObjects[1].SetCellValue(docObjects[1].LastRow(), "buy_inv_no","TOTAL", 0);
	docObjects[1].ColumnSort("et_dt_tm", "ASC", "ASC", true);
	var rowcount=docObjects[1].RowCount();
	for(var i=1;i<=rowcount;i++){
		docObjects[1].SetCellValue(i, "no",i,0);
	}
}
function sheet1_OnClick(sheetObj,Row,Col){
	var formObj=document.frm1;
if(sheetObj.GetCellValue(Row, "air_sea_clss_cd")=="")return;
	docObjects[1].RemoveAll();
var air_sea_clss_cd=sheetObj.GetCellValue(Row, "air_sea_clss_cd");
var bound=sheetObj.GetCellValue(Row, "bound");
var trdp_cd=sheetObj.GetCellValue(Row, "trdp_cd");
var curr_cd=sheetObj.GetCellValue(Row, "curr_cd");
	// hid form에 값을 가지고 있는다.
	formObj.hid_air_sea_clss_cd.value=air_sea_clss_cd;
	formObj.hid_bnd_clss_cd.value=bound;	
	formObj.hid_trdp_cd.value=trdp_cd;	
	formObj.hid_curr_cd.value=curr_cd;
	//print button 활성화
	getObj('prn').style.display="inline";
	getBtnObj('btnPrint').style.display="inline";
	getObj('subexcel').style.display="inline"; 
	doWork('SEARCHLIST01');
}
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnPopupClick이벤트 발생시.
 * sheet1_OnPopupClick(sheetObj, Row, Col)  <= sheet1번+'_'+IBsheet상에 명시된 Event명+(Sheet Oeject, Row, Column) 
 */
function sheet2_OnDblClick(sheetObj,Row,Col){	
	var formObj=document.frm1;
    doProcess=true;
   	formObj.f_cmd.value="";
   	var air_sea_clss_cd=formObj.air_sea_clss_cd.value;
var bnd_clss_cd=sheetObj.GetCellValue(Row, 'bnd_clss_cd');
   	switch (sheetObj.ColSaveName(Col)) {
        case "mbl_no" :
if(sheetObj.GetCellValue(Row, 'mbl_no')=="")return;
        	if(air_sea_clss_cd=="A"){	// 항공
        		if(bnd_clss_cd=="A / O"){	// 수출
var paramStr="./AIE_BMD_0040.clt?f_cmd="+SEARCHLIST+"&f_bl_no="+sheetObj.GetCellValue(Row, 'mbl_no');
        		}else{	//수입
var paramStr="./AII_BMD_0040.clt?f_cmd="+SEARCHLIST+"&f_bl_no="+sheetObj.GetCellValue(Row, 'mbl_no');
        		}
        	}else{	// 해운
        		if(bnd_clss_cd=="S / O"){	// 수출
var paramStr="./SEE_BMD_0030.clt?f_cmd="+SEARCHLIST+"&f_bl_no="+sheetObj.GetCellValue(Row, 'mbl_no');
        		}else{	//수입
var paramStr="./SEI_BMD_0040.clt?f_cmd="+SEARCHLIST+"&f_bl_no="+sheetObj.GetCellValue(Row, 'mbl_no');
        		}
        	}
        	parent.mkNewFrame('S/R Entry', paramStr);
        	break;
        case "bl_no" :
        	if(air_sea_clss_cd=="A"){	// 항공
        		if(bnd_clss_cd=="A / O"){	// 수출
var paramStr="./AIE_BMD_0020.clt?f_cmd="+SEARCHLIST+"&f_bl_no="+sheetObj.GetCellValue(Row, 'bl_no');
        		}else{	//수입
var paramStr="./AII_BMD_0020.clt?f_cmd="+SEARCHLIST+"&f_bl_no="+sheetObj.GetCellValue(Row, 'bl_no');
        		}
        	}else{	// 해운
        		if(bnd_clss_cd=="S / O"){	// 수출
var paramStr="./SEE_BMD_0020.clt?f_cmd="+SEARCHLIST+"&f_bl_no="+sheetObj.GetCellValue(Row, 'bl_no');
        		}else{	//수입
var paramStr="./SEI_BMD_0020.clt?f_cmd="+SEARCHLIST+"&f_bl_no="+sheetObj.GetCellValue(Row, 'bl_no');
        		}
        	}
        	parent.mkNewFrame('Booking & HBL', paramStr);
        	break;
    }
}
var CODETYPE='';
/**
 * code name select
 */
function codeNameAction(str, obj, tmp){
	var s_code=obj.value.toUpperCase();		
	var s_type="";
	if ( s_code != "" ) {
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
			if ( s_code != "" ) {
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
		}
	}
}
/**
달력팝업을 호출한다.
**/
function doDisplay(doWhat,formObj){
    switch(doWhat){
		case 'DATE1':   //달력 조회 
            var cal=new ComCalendar();
            cal.select(formObj.fm_et_dt,'yyyy-MM-dd');
        break;
        case 'DATE2':   //달력 조회 
            var cal=new ComCalendar();
            cal.select(formObj.to_et_dt, 'yyyy-MM-dd');
        break;
    }
}
function fncFormStart() {
	var formObj=document.frm1;
	// 오늘 날짜 가져오기
	var now=new Date(); 				// 현재시간 가져오기
	var year=now.getFullYear(); 			// 년도 가져오기
	var month=now.getMonth() + 1; 		// 월 가져오기 (+1)
	var date=now.getDate(); 			// 날짜 가져오기
	var fromDate=new Date();
	var tempDate=now.getTime() - ( 7*24*60*60*1000);
	fromDate.setTime(tempDate);
	var iyear=fromDate.getFullYear();
	var imonth=fromDate.getMonth() +1;
	var iday=fromDate.getDate();
	if(imonth < 10){
		imonth="0"+(imonth);
	}
	if(iday < 10){
		iday="0"+iday;
	}
	if(month < 10){
		month="0"+(month);
	}
	if(date < 10){
		date="0"+date;
	}
	var searchDay1=iyear + "-01-01";
	today=year +"-"+ month +"-"+ date +"";
	formObj.fm_et_dt.value=searchDay1;
	formObj.to_et_dt.value=today;
}
//코드표시 Ajax
function dispCodeNameAjaxReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	var formObj=document.frm1;
	var sheetObj4=docObjects[4];
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@@;');
			var masterVals=rtnArr[0].split('@@^');	
			if(CODETYPE == "Location_pol"){
				formObj.loc_cd.value=masterVals[0];//loc_cd 
				formObj.loc_nm.value=masterVals[3];//loc_nm
			}else if(CODETYPE == "trdpCode"){
				formObj.trdp_cd.value=masterVals[0];//loc_cd 
				formObj.trdp_nm.value=masterVals[3];//loc_nm
			}
		}else{
			if(CODETYPE == "Location_pol"){
				formObj.loc_cd.value="";//loc_cd 
				formObj.loc_nm.value="";//loc_nm						
			}else if(CODETYPE == "trdpCode"){
				formObj.trdp_cd.value="";//loc_cd 
				formObj.trdp_nm.value="";//loc_nm						
			}
		}
	}else{
		//Error occurred!		
		alert(getLabel('FMS_COM_ERR001')+ "\n\n: ACC_INV_0070.500");			
	}
}

function PARTNER_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.trdp_cd.value=rtnValAry[0]; 
		formObj.trdp_nm.value=rtnValAry[2];//loc_nm
	}
}
