var rtnary=new Array(1);
var callBackFunc = "";
var show_complete = "N";

function doWork(srcName){
    var sheetObj=docObjects[0];
    var formObj=document.frm1;
    switch(srcName) {
		case "NEW":
			doShowProcess();
			var currLocUrl=this.location.href;
			currLocUrl=currLocUrl.substring(0, currLocUrl.indexOf('.clt'));
			currLocUrl='.'+currLocUrl.substring(currLocUrl.lastIndexOf('/'), currLocUrl.length)+'.clt?callId=NEW['+(new Date()).getTime()+']';
//			parent.mkNewFrame(document.getElementById("bigtitle").innerHTML, currLocUrl);
			window.location.href = currLocUrl
	   		break;
		case "SEARCHLIST":
			formObj.f_cmd.value=SEARCHLIST01;
			sheetObj.DoSearch("MGT_EQS_0031GS.clt", FormQueryString(formObj) );
			break;
		case "MODIFY":
			//validation 체크
			if (chkValidation(sheetObj, formObj)){
				formObj.f_cmd.value=MULTI;
	            if(confirm(getLabel('FMS_COM_CFMSAV'))){
	                //doProcess = true;
	                //sheetObj.DoSave("MGT_EQS_0031GS.clt", FormQueryString(formObj),"ibflag",false);
	            	//var sht1 = sheetObj.GetSaveString(true);
	            	show_complete = "Y";
	            	sheetObj.DoAllSave("./MGT_EQS_0031GS.clt", FormQueryString(formObj));
	            }
			}
			break;
		case "ROWADD":
			var rowCnt=sheetObj.LastRow() + 1;
			var row=sheetObj.DataInsert(rowCnt);
			if (rowCnt != row) {
				rowCnt--;
			}
			sheetObj.SetCellValue(rowCnt,'seq',rowCnt);
   			break;
		case "ROWUP":
	        var selRow=sheetObj.GetSelectionRows();
	        for(var j=1; j<= sheetObj.RowCount(); j++){
	        	if(sheetObj.GetCellValue(j, "seq") == ""){
                      alert("등록되지 않은 데이터가 있습니다. \n등록작업을 마친후 이동이 가능합니다. ");
                      return;
               }
	        }
	        if(Number(sheetObj.GetCellValue(selRow, "seq")) > 1){
	             //선택한 Row를 한줄 위로 올린다.
	        	sheetObj.SetCellValue(selRow, "seq",Number(sheetObj.GetCellValue(selRow, "seq")) - 1,0);
	             //sheetObj.CellValue2(selRow, "seq") = selRow - 1;
	             sheetObj.SetCellValue(selRow - 1, "ibflag","U",0);
	             //한줄위의 Row를 한줄 아래로 내린다.
	             sheetObj.SetCellValue(Number(selRow)-1, "seq",selRow,0);
	             sheetObj.SetCellValue(selRow, "ibflag","U",0);
	             //정렬을 한다.
	             sheetObj.ColumnSort("seq","ASC");
	             //포커스를 유지한다.
	             sheetObj.SelectCell(Number(sheetObj.GetCellValue(selRow, "seq")) - 1, 2);
	             //포커스색상을 준다.
	             for(var i=0; i<sheetObj.LastCol(); i++){
	            	 sheetObj.SetRowBackColor(Number(sheetObj.GetCellValue(selRow, "seq")) - 1,"#DFFFFF");
	             }
        	}
   			break;
		case "ROWDOWN":
			var selRow=sheetObj.GetSelectionRows();
			for ( var j=1; j <= sheetObj.RowCount(); j++) {
				if (sheetObj.GetCellValue(j, "seq") == "") {
					alert("등록되지 않은 데이터가 있습니다. \n등록작업을 마친후 이동이 가능합니다. ");
					return;
				}
			}
			if (Number(sheetObj.GetCellValue(selRow, "seq")) < sheetObj.LastRow()) {
				// 선택한 Row를 한줄 위로 내린다.
				sheetObj.SetCellValue(selRow, "seq",Number(sheetObj.GetCellValue(selRow, "seq")) + 1,0);
				sheetObj.SetCellValue(selRow + 1, "ibflag","U",0);
				// 한줄아래의 Row를 한줄 위로 올린다.
				sheetObj.SetCellValue(Number(selRow) + 1, "seq",selRow,0);
				sheetObj.SetCellValue(selRow , "ibflag","U",0);
				// 정렬을 한다.
				sheetObj.ColumnSort("seq", "ASC");
				// 포커스를 유지한다.
				sheetObj.SelectCell(Number(sheetObj.GetCellValue(selRow, "seq")) + 1, 2);
				// 포커스색상을 준다.
				for ( var i=0; i < sheetObj.LastCol(); i++) {
					sheetObj.SetRowBackColor(Number(sheetObj.GetCellValue(selRow,"seq")) + 1,"#DFFFFF");
				}
			}
			break;
		case "DELETE":
			if (formObj.lane_cd.value == "") {
				alert("There is no data to delete!");
				return;
			}
			if(confirm(getLabel('FMS_COM_CFMDEL'))){
				/*
				for(var i=1; i<=sheetObj.LastRow(); i++){
					sheetObj.SetCellValue(i,"ibflag","D");
				}
				sheetObj.DoSave("MGT_EQS_0031GS.clt", FormQueryString(formObj),"ibflag",false);
				*/
				deleteSvcLane();
			}
			break;
		}
}
//Lane Code가 존재 하는지 체크
function deleteSvcLane() {
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	ajaxSendPost(deleteSvcLaneAj, 'reqVal', '&goWhere=aj&bcKey=deleteSvcLaneAj&lane_cd='+formObj.lane_cd.value, './GateServlet.gsl');
	if(reFlg != "0"){
		//alert(CM_MSG3);
		//화면초기화
		clearAll(formObj);
		show_complete = "Y";
		sheetObj.DoSearch("MGT_EQS_0031GS.clt", FormQueryString(formObj) );
		return;
	} else {
		alert("There is no data to delete!");
		return;
	}
}
function deleteSvcLaneAj(reqVal){
	reFlg='';
	var doc=getAjaxMsgXML(reqVal);
//		alert(doc);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!= 'undefined'){
			reFlg=doc[1];
		}
	}
}
//화면 클리어
function clearAll(formObj){
	var sheetObj=docObjects[0];
	var collTxt=document.getElementsByTagName("INPUT");   // document 상의 모든 INPUT 태그 요소들을 컬렉션으로 구하고...
	for(var i=0; i<collTxt.length; i++){
		if(collTxt[i].type == "text" || collTxt[i].type == "hidden"){
			collTxt[i].value="";
		}           
	}
	formObj.sel_org_cd.value="";
	formObj.sel_des_cd.value="";
	formObj.sel_Frequency_cd.value="W";
	formObj.f_remark.value="";
}
var docObjects=new Array();
/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
function loadPage() {
	var formObj=document.frm1;	
	if (formObj.h_sel_org_cd.value != null && formObj.h_sel_org_cd.value != "") {
		formObj.sel_org_cd.value=formObj.h_sel_org_cd.value;
	}
	if (formObj.h_sel_des_cd.value != null && formObj.h_sel_des_cd.value != "") {
		formObj.sel_des_cd.value=formObj.h_sel_des_cd.value;
	}
	if (formObj.h_remark.value != null && formObj.h_remark.value != "") {
		formObj.f_remark.value=formObj.h_remark.value;
	}
	if (formObj.h_sel_Frequency_cd.value != null && formObj.h_sel_Frequency_cd.value != "") {
		formObj.sel_Frequency_cd.value=formObj.h_sel_Frequency_cd.value;
	}
	for(var i=0;i<docObjects.length;i++){
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        comEndConfigSheet(docObjects[i]);
    }
	doWork('SEARCHLIST');
}
/**
 * IBSheet Object를 배열로 등록
 * 향후 다른 항목들을 일괄처리할 필요가 있을 때 배열로 담는 프로세스를 추가할 수 있다
 * 배열은 소스 상단에 정의
 */
function setDocumentObject(sheet_obj){
    switch(sheet_obj.id){
		case "sheet1":
			docObjects[0]=sheet_obj;
		break;  
    }
}
/**
 * 시트 초기설정값, 헤더 정의
 * param : sheetObj ==> 시트오브젝트, sheetNo ==> 시트오브젝트 태그의 아이디에 붙인 일련번호
 * 시트가 다수일 경우 시트 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
 */
function initSheet(sheetObj,sheetNo) {
    switch(sheetNo) {
         case 1:
             with (sheetObj) {
        	       SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

        	       var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
        	       var headers = [ { Text:getLabel('MGT_EQS_0030_HDR1'), Align:"Center"} ];
        	       InitHeaders(headers, info);

        	       var cols = [ {Type:"DelCheck",  Hidden:0, Width:50,   Align:"Center",  ColMerge:0,   SaveName:"del_flg",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Status",    Hidden:1, Width:10,   Align:"Center",  ColMerge:0,   SaveName:"ibflag",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
        	              {Type:"Int",       Hidden:0,  Width:50,   Align:"Center",  ColMerge:0,   SaveName:"seq",       KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"PopupEdit", Hidden:0, Width:150,  Align:"Center",  ColMerge:0,   SaveName:"port_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1, EditLen: 5 },
        	              {Type:"Text",      Hidden:0,  Width:300,  Align:"Center",  ColMerge:0,   SaveName:"port_nm",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1, EditLen: 50 },
        	              {Type:"Combo",     Hidden:0, Width:250,  Align:"Center",  ColMerge:0,   SaveName:"ori_des",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Combo",     Hidden:0, Width:120,  Align:"Center",  ColMerge:0,   SaveName:"etb",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Combo",     Hidden:0, Width:120,  Align:"Center",  ColMerge:0,   SaveName:"etd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Int",       Hidden:0,  Width:250,  Align:"Center",  ColMerge:0,   SaveName:"trs_time",  KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1, EditLen: 5 },
        	              {Type:"Text",      Hidden:1, Width:10,   Align:"Center",  ColMerge:0,   SaveName:"Indexing" } ];
        	        
        	       InitColumns(cols);

        	       SetEditable(1);
        	       SetHeaderRowHeight(20 );
        	       SetColProperty("ori_des", {ComboText:'|Origin|Destination', ComboCode:'|Y|N'} );
              	   SetColProperty("etb", {ComboText:'|SUN|MON|TUE|WED|THU|FRI|SAT', ComboCode:'|SUN|MON|TUE|WED|THU|FRI|SAT'} );
              	   SetColProperty("etd", {ComboText:'|SUN|MON|TUE|WED|THU|FRI|SAT', ComboCode:'|SUN|MON|TUE|WED|THU|FRI|SAT'} );
              	   SetSheetHeight(250);
              	   resizeSheet();
            }                                                      
         break;     
     }
}

function resizeSheet() {
	ComResizeSheet(docObjects[0]);
}

var cur_row;
function sheet1_OnSaveEnd(sheetObj, errMsg){
	if (errMsg == undefined  || errMsg==null || errMsg == '') {
		if(show_complete == "Y"){
			showCompleteProcess();
			show_complete = "N";
		}
	}
}
function sheet1_OnSearchEnd(sheetObj, errMsg){
	if (errMsg == undefined  || errMsg==null || errMsg == '') {
		if(show_complete == "Y"){
			showCompleteProcess();
			show_complete = "N";
		}
	}
}
function sheet1_OnPopupClick(sheetObj, row, col) {
	cur_row = row;
	var formObj=document.frm1;	
	var colStr=sheetObj.ColSaveName(col);
	if(colStr=='port_cd'){
		rtnary=new Array(3);
		rtnary[0]="";
		//Service Lane Flg 추가
		rtnary[1]="SL";
   		if(typeof(sheetObj)!='undefined'){
   			rtnary[2]=sheetObj.GetCellValue(row, 'port_nm');
   		}else{
   			rtnary[2]="";
   		}
   		callBackFunc = "sheet1_OnPopupClick_port_cd";
	   	modal_center_open('./CMM_POP_0030.clt', rtnary, 806,415,"yes");
	   	
	}
}

function sheet1_OnPopupClick_port_cd(rtnVal){
		if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		docObjects[0].SetCellValue(cur_row, 'port_cd',rtnValAry[0]);
		docObjects[0].SetCellValue(cur_row, 'port_nm',rtnValAry[2]);
	} 
	}

function sheet1_OnKeyDown(sheetObj, row, col, keyCode, shift){
	var formObj=document.frm1;	
	var colStr=sheetObj.ColSaveName(col);
	if(colStr=='trs_time'){
		/*if (keyCode == 189 || keyCode == 8) {
			//'Input data must be greater than 0.'
			alert(getLabel('FMS_COM_ALT042'));
		}*/
		if(sheetObj.LastRow()== row){
			if(keyCode==9){
				gridAdd(0);
				sheetObj.SelectCell(sheetObj.LastRow(), 0);
			}
		}
	}
} 
function sheet1_OnChange(sheetObj, row, col){
	var formObj=document.frm1;	
	var colStr=sheetObj.ColSaveName(col);
	if(colStr=='trs_time'){
		var trsTime = sheetObj.GetCellValue(row, 'trs_time');
		if (trsTime < 0) {
			//'Input data must be greater than 0.'			
			alert(getLabel('FMS_COM_ALT042'));	
			sheetObj.SetCellValue(row, 'trs_time', "");
		}		
	}
} 

function gridAdd(objIdx){
/*	var intRows=docObjects[objIdx].Rows;
	intRows--;
	docObjects[objIdx].DataInsert(intRows);*/
	var rowCnt=docObjects[objIdx].LastRow() + 1;
	var row=docObjects[objIdx].DataInsert(rowCnt);
	if (rowCnt != row) {
		rowCnt--;
	}
	docObjects[objIdx].SetCellValue(rowCnt,'seq',rowCnt);
}
function chkValidation(sheetObj, formObj){
	//Input Value관련 유효성체크
	if (formObj.lane_cd.value == ""
		|| formObj.lane_nm.value == ""
			|| formObj.sel_org_cd.value == ""
				|| formObj.sel_des_cd.value == ""
					|| formObj.carrier.value == ""
						|| formObj.sel_Frequency_cd.value == "") {
    	alert(getLabel('FMS_COM_ALT001'));
    	return false;
	}
	// 그리드 관련 유효성 체크 
	if (sheetObj.RowCount()== 0) {
    	alert(getLabel('FMS_COM_ALT038'));
    	return false;
	}
	//origin에 해당하는 셀의 갯수 카운트 - limit 20
	var originCnt=0;
	//Destinaion에 해당하는 셀의 갯수 카운트 
	var destCnt=0;
    for(var j=1; j<= sheetObj.RowCount(); j++){
		var port_cd=sheetObj.GetCellValue(j, 'port_cd');
		var port_nm=sheetObj.GetCellValue(j, 'port_nm');
		var ori_des=sheetObj.GetCellValue(j, 'ori_des');
		var etb=sheetObj.GetCellValue(j, 'etb');
		var etd=sheetObj.GetCellValue(j, 'etd');
    	if (ori_des == "Y") {
    		originCnt++;
    	} else {
    		destCnt++;
    	}
    	if (j == 0) {
    		// Origin Route -> Destination Route순으로 입력해야함 Vis에서 계산식과 연계
    		if (ori_des == "N") {
            	alert("Please enter [Origin Route -> Destination Route] order!");
            	return false;
    		}
    	}
    	if (destCnt > 0) {
    		// Origin Route -> Destination Route순으로 입력해야함 Vis에서 계산식과 연계
    		if (ori_des == "Y") {
            	alert("Please enter [Origin Route -> Destination Route] order!");
            	return false;
    		}
    	}
    	if (j == sheetObj.RowCount()) {
    		// Origin Route와 Destination Route는 쌍으로 입력되어야 함
    		if ( originCnt==0 ) {
            	alert("Please enter Origin Route!");
            	return false;
    		}
    		if ( destCnt==0 ) {
            	alert("Please enter Destination Route!");
            	return false;
    		}
    	}
    	if (originCnt > 20) {
    		alert("Origin Route entry may not exceed 20");
    		return false;
    	}
        if (port_cd =="" || port_nm =="") {
        	alert("Please enter a Mandatory [Port] Value!");
        	return false;
        }
        if (ori_des == "" || ori_des ==" ") {
        	alert("Please enter a Mandatory [Origin/Destination] Value!");
        	return false;
        }
        if (etb == "" || etb ==" ") {
        	alert("Please enter a Mandatory [ETB] Value!");
        	return false;
        }
        if (etd == "" || etd ==" ") {
        	alert("Please enter a Mandatory [ETD] Value!");
        	return false;
        }
    }
    return true;
}
// Lane Code가 존재 하는지 체크
function searchDupLaneCd(obj) {
	var formObj=document.frm1;
    var keyValue=obj.value;
    var specialChars = "~`!@#$^&%*[]\/{}|:<>?;()'\"\\,.+=";
    for (var i=0; i < specialChars.length; i++) {
    	keyValue = keyValue .replace(new RegExp("\\" + specialChars[i], 'gi'), '');
    }
    obj.value = keyValue;

	ajaxSendPost(searchSvcLaneCd, 'reqVal', '&goWhere=aj&bcKey=searchSvcLaneCd&lane_cd='+formObj.lane_cd.value, './GateServlet.gsl');
	if(reFlg != "0"){
		alert(getLabel('SYS_COM_ALT009'));
		return;
	}
}
function searchSvcLaneCd(reqVal){
	reFlg='';
	var doc=getAjaxMsgXML(reqVal);
//		alert(doc);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!= 'undefined'){
			reFlg=doc[1];
		}
	}
}
// byte체크
function chkAltLenByByte(obj, len) {
	if (!chkLenByByte(obj, len)) {
		alert( "max " + len + "characters can be entered");
	}
}
