var rtnary=new Array(1);
var callBackFunc = "";

function doWork(srcName){
	//탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
	var sheetObj=docObjects[0];
	var sheetObj1=docObjects[1];
	var formObj=document.frm1;
	switch(srcName) {
		case "SEARCHLIST":
			sheetObj.RemoveAll();
			//sheetObj.ShowDebugMsg = true;
			if(formObj.fm_et_dt.value==""||formObj.to_et_dt.value==""){
				//Please enter a [ETD/ETA]!
				alert(getLabel('FMS_COM_ALT001')+ "\n\n: ACC_INVT_0060.13");
				return;
			}
			formObj.f_cmd.value=SEARCHLIST;
			if(formObj.air_sea_clss_cd.value=="S"){
				test2.style.display='none';
				sheetObj.DoSearch("ACC_INV_0060GS.clt", FormQueryString(formObj) );
				test1.style.display='inline';
			}else{
				test1.style.display='none';
				sheetObj1.DoSearch("ACC_INV_0060GS.clt", FormQueryString(formObj) );
				test2.style.display='inline';
			}
			//sheetObj.ShowDebugMsg = false;
			getObj('excel').style.display='inline';
		break;
		case "NEW":
			// form reset
			formObj.reset();
			fncFormStart();
			// sheet clear
			sheetObj.RemoveAll();
		break;
		case "EXCEL":
			if(sheetObj.RowCount() < 1){//no data	
    			ComShowCodeMessage("COM132501");
    		}else{
    			sheetObj.Down2Excel( {DownCols: makeHiddenSkipCol(sheetObj), SheetDesign:1,Merge:1 });
    		}
		break;
		case "POL_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
			rtnary=new Array(1);
			rtnary[0]="SEA";
			rtnary[1]="BL";
			rtnary[2]="";
			rtnary[3]="";
			callBackFunc = "POL_POPLIST";
	   		modal_center_open('./CMM_POP_0030.clt', rtnary, 806,415,"yes");
			
		break;
		case "POD_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
			rtnary=new Array(1);
			rtnary[0]="SEA";
			rtnary[1]="BL";
			rtnary[2]="";
			rtnary[3]="";
			callBackFunc = "POD_POPLIST";
	   		modal_center_open('./CMM_POP_0030.clt', rtnary, 806,415,"yes");
			break;
		case "DEL_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
			rtnary=new Array(1);
			rtnary[0]="SEA";
			rtnary[1]="BL";
			rtnary[2]="";
			rtnary[3]="";
			callBackFunc = "DEL_POPLIST";
	   		modal_center_open('./CMM_POP_0030.clt', rtnary, 806,415,"yes");
			 
		break;
		case "USER_POPLIST"://사용자조회 openMean 1=화면에서 오픈, 2=그리드에서 오픈
       		rtnary=new Array(1);
	   		rtnary[0]="1";
	   		callBackFunc = "USER_POPLIST";
	   		modal_center_open('./CMM_POP_0060.clt', rtnary, 556,450,"yes");
	   		
       break;
		case "CUSTOMER_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
			rtnary=new Array(1);
				rtnary[0]="1";
				rtnary[1]="";
				rtnary[2]=window;
			var cstmTpCd='CS';
			callBackFunc = "CUSTOMER_POPLIST";
	   		modal_center_open('./CMM_POP_0010.clt?callTp='+cstmTpCd, rtnary, 1150,650,"yes");
	   		
		break;
		case "PRINT":
			var param="air_sea_clss_cd=" + formObj.air_sea_clss_cd.value;
			param += "&bnd_clss_cd=" + formObj.bnd_clss_cd.value;
			param += "&fm_et_dt=" + formObj.fm_et_dt.value;
			param += "&to_et_dt=" + formObj.to_et_dt.value;
			param += "&dept_cd=" + formObj.dept_cd.value;
			param += "&pol_cd=" + formObj.pol_cd.value;
			param += "&pod_cd=" + formObj.pod_cd.value;
			param += "&del_cd=" + formObj.del_cd.value;
			param += "&usr_cd=" + formObj.usr_cd.value;
			param += "&trdp_cd=" + formObj.trdp_cd.value;
			if(formObj.rpt_type.value=="dept"){
				param += "&cmd_type=17";
				param += "&title=Performance List II (Team)";
			}else if(formObj.rpt_type.value=="cust"){
				param += "&cmd_type=18";
				param += "&title=Performance List II (Customer)";
			}else if(formObj.rpt_type.value=="del"){
				param += "&cmd_type=19";
				param += "&title=Performance List II (Delivery Place)";
			}else if(formObj.rpt_type.value=="usr"){
				param += "&cmd_type=20";
				param += "&title=Performance List II (Salesman)";
			}else{
				//error
			}
			popGET('RPT_PRN_0050.clt?'+param, '', 1025, 740, "scroll:yes;status:no;help:no;");
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
    var cnt=0;
	switch(sheetNo) {
         case 1:      //IBSheet1 init
            with (sheetObj) {
             SetConfig( { SearchMode:2, MergeSheet:7, Page:20, DataRowMerge:1 } );

             var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
             var headers = [ { Text:getLabel('ACC_INV_0060_HDR1_1'), Align:"Center"},
                         { Text:getLabel('ACC_INV_0060_HDR1_2'), Align:"Center"} ];
             InitHeaders(headers, info);

             var cols = [ {Type:"Status",    Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"ibflag" },
                    {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:1,   SaveName:"grp1",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1,   EditLen:20 },
                    {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:1,   SaveName:"grp2",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1,   EditLen:20 },
                    {Type:"AutoSum",   Hidden:0, Width:80,   Align:"Right",   ColMerge:0,   SaveName:"u_revenue",  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:1,   EditLen:20 },
                    {Type:"AutoSum",   Hidden:0, Width:80,   Align:"Right",   ColMerge:0,   SaveName:"u_cost",     KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:1,   EditLen:20 },
                    {Type:"AutoSum",   Hidden:0, Width:80,   Align:"Right",   ColMerge:0,   SaveName:"u_profit",   KeyField:0,   CalcLogic:"|u_revenue|-|u_cost|",Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:1,   EditLen:20 },
                    {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:0,   SaveName:"u_ratio",    KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:1,   EditLen:20 },
                    {Type:"AutoSum",   Hidden:0, Width:80,   Align:"Right",   ColMerge:0,   SaveName:"revenue",    KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:1,   EditLen:20 },
                    {Type:"AutoSum",   Hidden:0, Width:80,   Align:"Right",   ColMerge:0,   SaveName:"cost",       KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:1,   EditLen:20 },
                    {Type:"AutoSum",   Hidden:0, Width:80,   Align:"Right",   ColMerge:0,   SaveName:"profit",     KeyField:0,   CalcLogic:"|revenue|-|cost|",Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:1,   EditLen:20 },
                    {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:0,   SaveName:"ratio",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:1,   EditLen:20 },
                    {Type:"AutoSum",   Hidden:0, Width:60,   Align:"Right",   ColMerge:0,   SaveName:"n1",         KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:1,   EditLen:20 },
                    {Type:"Text",      Hidden:1, Width:60,   Align:"Right",   ColMerge:0,   SaveName:"n12",        KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:1,   EditLen:20 },
                    {Type:"AutoSum",   Hidden:0, Width:60,   Align:"Right",   ColMerge:0,   SaveName:"n2",         KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:1,   EditLen:20 },
                    {Type:"Text",      Hidden:1, Width:60,   Align:"Right",   ColMerge:0,   SaveName:"n22",        KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:1,   EditLen:20 },
                    {Type:"AutoSum",   Hidden:0, Width:60,   Align:"Right",   ColMerge:0,   SaveName:"n3",         KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:1,   EditLen:20 },
                    {Type:"Text",      Hidden:1, Width:60,   Align:"Right",   ColMerge:0,   SaveName:"n32",        KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:1,   EditLen:20 },
                    {Type:"AutoSum",   Hidden:0, Width:60,   Align:"Right",   ColMerge:0,   SaveName:"tot",        KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:1,   EditLen:20 },
                    {Type:"AutoSum",   Hidden:0, Width:60,   Align:"Right",   ColMerge:0,   SaveName:"teu",        KeyField:0,   CalcLogic:"|n1|+(|n2|+|n3|)*2",Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:1,   EditLen:20 },
                    {Type:"AutoSum",   Hidden:0, Width:70,   Align:"Right",   ColMerge:0,   SaveName:"lcl",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:0,   InsertEdit:1,   EditLen:20 },
                    {Type:"AutoSum",   Hidden:0, Width:70,   Align:"Right",   ColMerge:0,   SaveName:"blk",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:1,   EditLen:20 },
                    {Type:"Text",      Hidden:1, Width:70,   Align:"Right",   ColMerge:0,   SaveName:"ex_rt_ut",   KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:1,   EditLen:20 } ];
              
             InitColumns(cols);

             SetEditable(0);
             SetSheetHeight(350);
//             sheetObj.SetMergeCell(0,1,2,2);

           }                                                      
           break;
         case 2:      //IBSheet1 init
        	 with (sheetObj) {
             SetConfig( { SearchMode:2, MergeSheet:7, Page:20, DataRowMerge:1 } );

             var info    = { Sort:0, ColMove:1, HeaderCheck:1, ColResize:1 };
             var headers = [ { Text:getLabel('ACC_INV_0060_HDR2_1'), Align:"Center"},
                       { Text:getLabel('ACC_INV_0060_HDR2_2'), Align:"Center"} ];
             InitHeaders(headers, info);

             var cols = [ {Type:"Status",    Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"ibflag" },
                 {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:1,   SaveName:"grp1",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1,   EditLen:20 },
                 {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:1,   SaveName:"grp2",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1,   EditLen:20 },
                 {Type:"AutoSum",   Hidden:0, Width:80,   Align:"Right",   ColMerge:0,   SaveName:"u_revenue",  KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:1,   EditLen:20 },
                 {Type:"AutoSum",   Hidden:0, Width:80,   Align:"Right",   ColMerge:0,   SaveName:"u_cost",     KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:1,   EditLen:20 },
                 {Type:"AutoSum",   Hidden:0, Width:80,   Align:"Right",   ColMerge:0,   SaveName:"u_profit",   KeyField:0,   CalcLogic:"|u_revenue|-|u_cost|",Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:1,   EditLen:20 },
                 {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:0,   SaveName:"u_ratio",    KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:1,   EditLen:20 },
                 {Type:"AutoSum",   Hidden:0, Width:80,   Align:"Right",   ColMerge:0,   SaveName:"revenue",    KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:1,   EditLen:20 },
                 {Type:"AutoSum",   Hidden:0, Width:80,   Align:"Right",   ColMerge:0,   SaveName:"cost",       KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:1,   EditLen:20 },
                 {Type:"AutoSum",   Hidden:0, Width:80,   Align:"Right",   ColMerge:0,   SaveName:"profit",     KeyField:0,   CalcLogic:"|revenue|-|cost|",Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:1,   EditLen:20 },
                 {Type:"Float",     Hidden:0,  Width:80,   Align:"Right",   ColMerge:0,   SaveName:"ratio",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:1,   EditLen:20 },
                 {Type:"AutoSum",   Hidden:0, Width:60,   Align:"Right",   ColMerge:0,   SaveName:"n1",         KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:1,   EditLen:20 },
                 {Type:"Text",      Hidden:1, Width:60,   Align:"Right",   ColMerge:0,   SaveName:"n12",        KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:1,   EditLen:20 },
                 {Type:"AutoSum",   Hidden:0, Width:60,   Align:"Right",   ColMerge:0,   SaveName:"n2",         KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:1,   EditLen:20 },
                 {Type:"Text",      Hidden:1, Width:60,   Align:"Right",   ColMerge:0,   SaveName:"n22",        KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:1,   EditLen:20 },
                 {Type:"AutoSum",   Hidden:0, Width:60,   Align:"Right",   ColMerge:0,   SaveName:"n3",         KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:1,   EditLen:20 },
                 {Type:"Text",      Hidden:1, Width:60,   Align:"Right",   ColMerge:0,   SaveName:"n32",        KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:1,   EditLen:20 },
                 {Type:"Text",      Hidden:1, Width:70,   Align:"Right",   ColMerge:0,   SaveName:"ex_rt_ut",   KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:1,   EditLen:20 } ];
              
             InitColumns(cols);

             SetEditable(0);
             SetSheetHeight(350);
//             sheetObj.SetMergeCell(0,1,2,2);

        	 }                                                      
        	 break;
     }
}
function changeNm(val){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	if(val=='dept'){
		sheetObj.SetCellValue(0, "grp1","Team/Bound", 0);
	}else if(val=='usr'){
		sheetObj.SetCellValue(0, "grp1","Salesman", 0);
	}else if(val=='cust'){
		sheetObj.SetCellValue(0, "grp1","Customer/Team", 0);
	}else if(val=='del'){
		sheetObj.SetCellValue(0, "grp1", "Delivery Place", 0);
	}
}
function sheet1_OnSearchEnd() {
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	//team 시 소계 보여준다.
	if(formObj.rpt_type.value=="dept"){
		sheetObj.ShowSubSum([{StdCol:1, SumCols:"3|4|5|6|7|8|9|10|11|13|15|17|18|19|20", Sort:true, ShowCumulate:false, CaptionCol:-1, CaptionText:"grp1=SubTotal"}]);
	}
	sheetObj.SetCellValue(sheetObj.LastRow(), "u_ratio","100.00", 0);
	sheetObj.SetCellValue(sheetObj.LastRow(), "ratio","100.00", 0);
	// grid name변경
	changeNm(formObj.rpt_type.value);
	for(var i=2;i<=sheetObj.RowCount()+1;i++){
		// ratio를 구한다.
		sheetObj.SetCellValue(i, "u_ratio",sheetObj.GetCellValue(i, "u_profit") / sheetObj.GetCellValue(sheetObj.LastRow(), "u_profit") * 100, 0);
		sheetObj.SetCellValue(i, "ratio",sheetObj.GetCellValue(i, "profit") / sheetObj.GetCellValue(sheetObj.LastRow(), "profit") * 100, 0);
		if(sheetObj.GetCellValue(i, "ex_rt_ut") =="0" && sheetObj.GetCellValue(i, "grp1") !="Sub Total"){
			sheetObj.SetRowBackColor(i,"#C0C0C0");
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
            cal.select(formObj.fm_et_dt, 'yyyy-MM-dd');
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
		}else if ( tmp == "onChange" ) {
			if ( s_code != "" ) {
				CODETYPE=str;
				var sub_str=str.substring(0,str.indexOf("_s"));
				s_type=sub_str;
				ajaxSendPost(dispCodeNameAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
			}
		}
	}
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
				formObj.trdp_cd.value=masterVals[0]; 
				formObj.trdp_nm.value=masterVals[3];//loc_nm
			}else if(CODETYPE == "user"){
				formObj.usr_cd.value=masterVals[0]; 
				formObj.usr_nm.value=masterVals[3];//loc_nm
			}
		}else{
			if(CODETYPE == "trdpCode"){
				formObj.trdp_cd.value=""; 
				formObj.trdp_nm.value="";
			}else if(CODETYPE == "user"){
				formObj.usr_cd.value=""; 
				formObj.usr_nm.value="";
			}
		}
	}else{
		//Error occurred!		
		alert(getLabel('FMS_COM_ERR001')+ "\n\n: ACC_INV_0060.543");			
	}
}
function POL_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.pol_cd.value=rtnValAry[0];//loc_cd 
//		formObj.pol_nm.value	= rtnValAry[2];//loc_nm
	} 
}
function POD_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.pod_cd.value=rtnValAry[0];//loc_cd 
//		formObj.pol_nm.value	= rtnValAry[2];//loc_nm
	} 
}
function DEL_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.del_cd.value=rtnValAry[0];//loc_cd 
//		formObj.del_nm.value	= rtnValAry[2];//loc_nm
	}
}

function USER_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.usr_cd.value=rtnValAry[0];
		formObj.usr_nm.value=rtnValAry[1];
	}
}

function CUSTOMER_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.trdp_cd.value=rtnValAry[0]; 
		formObj.trdp_nm.value=rtnValAry[2];//loc_nm
	}
}