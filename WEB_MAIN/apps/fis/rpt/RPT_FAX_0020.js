//=========================================================
//*@FileName   : RPT_PRN_0210.jsp
//*@FileTitle  : CMM
//*@Description: package search pop
//*@author     : 
//*@version    : 
//*@since      : 
//
//*@Change history:
//*@author     : Tuan.Chau
//*@version    : 2.0 - 2014/07/17
//*@since      : 2014/07/17
//=========================================================
var rtnary=new Array(1);
var callBackFunc = "";
function doWork(srcName){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
    switch(srcName) {
    	case "MANUAL_ADD":
    		sheetObj.DataInsert(sheetObj.LastRow() + 1);
    		sheetObj.SetCellValue(sheetObj.LastRow(), "chk","1",0);
    		break;
	    case "SEND":
	    	var retArray="";
    		for(var idx=1; idx<=sheetObj.LastRow(); idx++){
    			// 체크된 것 만 전송한다
    			if (sheetObj.GetCellValue(idx,"chk") == "1") {
    				// 필수항목 체크(사용자)
    				if (sheetObj.GetCellValue(idx,"trdp_pic_nm") == "") {
    					alert(getLabel('FMS_COM_ALT001') + "\nname");
    					return;
    				}
    				// 필수항목 체크(fax no)
    				if (sheetObj.GetCellValue(idx,"fax") == "") {
    					alert(getLabel('FMS_COM_ALT001') + "\nfax no");
    					return;
    				}
    				retArray += escape(sheetObj.GetCellValue(idx,"trdp_pic_nm"));
    				retArray += "@@";
    				retArray += sheetObj.GetCellValue(idx,"fax");
    				retArray += "^^";
    			}
    		}
			// 체크한 항목이 없습니다.
			if (retArray == "") {
				alert(getLabel('FMS_COM_ALT007'));
				return;
			}
			retArray=retArray.substring(0,retArray.length-2);
			ComClosePopup(retArray);
	    case "SEARCHLIST":
	    	formObj.f_cmd.value=SEARCHLIST;
	    	sheetObj.DoSearch("RPT_FAX_0010GS.clt", FormQueryString(formObj) );
	    	break;
		case "MODIFY":
			frm1.f_cmd.value=MODIFY;
			var sht1=sheetObj1.GetSaveString(true);
			sheetObj2.DataInsert(sheetObj2.LastRow() + 1);
			sheetObj2.DoAllSave("./RPT_FAX_0010_2GS.clt", FormQueryString(frm1));
			break;
		case "FAX_TO_POPLIST":
    		var formObj=document.frm1;
    		rtnary=new Array(1);
	   		rtnary[0]="2";
   	        
   	        callBackFunc = "FAX_TO_POPLIST";
   	        modal_center_open('./CMM_POP_0360.clt', rtnary, 836,490,"yes");
   	        break;	
		case "CLOSE":
			ComClosePopup();
			break;
    }
}

function FAX_TO_POPLIST(rtnVal){
	var sheetObj=docObjects[0];
    if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("^^");
		for (i=0; i < rtnValAry.length; i++) {
			if(rtnValAry[i] == ""){
				break;
			}
			doWork("MANUAL_ADD");
			itemArr=rtnValAry[i].split("@@");
			
			//OFVFOUR-7420 [PQC] [OEM B/L List] The Contact Person Search popup is not disappeared when users select the record
			////C.W Park
			////#34 #52833 - [BNX] TRADE PARTNER'S EMAIL AND FAX DIVISION LOGIC REMOVAL
			// if(itemArr[7] != ""){
			// 	if(itemArr[6] == itemArr[7] || itemArr[6] == itemArr[7].substring(0, 1) || itemArr[6] == itemArr[7].substring(2, 1)){
			// 		docObjects[0].SetCellValue(idx+1, "chk",1,0);
			// 	}else{
			// 		docObjects[0].SetCellValue(idx+1, "chk",0,0);
			// 	}
			// }
			// if(null == itemArr[6] || itemArr[6] == "" || itemArr[6] == "null"){
			// 	docObjects[0].SetCellValue(idx+1, "chk",1,0);
			// }
			sheetObj.SetCellValue(sheetObj.LastRow(), "trdp_nm",itemArr[0],0);
			sheetObj.SetCellValue(sheetObj.LastRow(), "trdp_pic_nm",itemArr[1],0);
			sheetObj.SetCellValue(sheetObj.LastRow(), "dept_cd",itemArr[2],0);
			sheetObj.SetCellValue(sheetObj.LastRow(), "fax",itemArr[3],0);
			sheetObj.SetCellValue(sheetObj.LastRow(), "trdp_cd",itemArr[4],0);
		}
	}
}

//코드표시 Ajax
function resultAjaxReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	var formObj=document.frm1;
	var sheetObj1=docObjects[0];
	var sheetObj2=docObjects[1];
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var rtnArr=doc[1].split('@@;');
			var masterVals=rtnArr[0].split('@@^');	
			formObj.m_corpfrcode.value=masterVals[0];
			frm1.f_cmd.value=ADD;
			var sht1=sheetObj1.GetSaveString(true);
			sheetObj2.DataInsert(sheetObj2.LastRow() + 1);
			sheetObj2.DoAllSave("./RPT_FAX_0010_2GS.clt", FormQueryString(frm1)+'&'+sht1);
		}
	}
}
/**
* 전체 데이터 저장 완료시
*/
function sheet2_OnSaveEnd(sheetObj, Row, Col) {
	var formObj=document.frm1;
	var sheetObj1=docObjects[0];
	formObj.m_id.value="clt00";
	formObj.m_pw.value="clt00";
	var faxNo="";
	for(var i=1 ; i < sheetObj1.LastRow() + 1 ; i++){
		faxNo += "," + sheetObj1.GetCellValue(i, "country_no") + "-" + sheetObj1.GetCellValue(i, "area_no")
		+ "-" + sheetObj1.GetCellValue(i, "fax_no");
	}
	formObj.m_fax.value=faxNo.substring(1);
	formObj.action="http://www.netshot.co.kr/corp/tsend.php"
	formObj.submit();
}
//--------------------------------------------------------------------------------------------------------------
//IBSheet 설정
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
//		setGrid();
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
	        SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

	        var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	        var headers = [ { Text:getLabel('RPT_FAX_0020_HDR'), Align:"Center"} ];
	        InitHeaders(headers, info);

	        var cols = [ {Type:"DelCheck",  Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"del",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1,   EditLen:-1,  HeaderCheck:0},
	               {Type:"CheckBox",  Hidden:0, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"chk",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1},
	               {Type:"Text",      Hidden:0,  Width:230,  Align:"Left",    ColMerge:1,   SaveName:"trdp_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0 },
	               {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"trdp_pic_nm",  KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"Text",      Hidden:0,  Width:60,   Align:"Left",    ColMerge:1,   SaveName:"dept_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"fax",          KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
	               {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:"trdp_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0 },
	               {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"ibflag1" } ];
	         
	        InitColumns(cols);
	        SetEditable(1);
	        SetSheetHeight(396);
	        SetCountPosition(0);
		}                                                      
		break;
	}
}
function sheet1_OnClick(sheetObj, Row, Col){
	var formObj=document.frm1;
}
function setGrid() {
	var doc=window.dialogArguments;
	if(!doc){
		doc = parent.rtnary[0];
	}
	if (typeof(doc) != 'undefined' && doc != undefined && doc != "") {
		var paramArr=String(doc).substring(3).split('^^');
		var itemArr=new Array(7);
		var fax_no = "";
		
		for (idx=0; idx < paramArr.length; idx++) {
			if(paramArr[idx] == ""){
				break;
			}
			itemArr=paramArr[idx].split('@@');
			doWork("MANUAL_ADD");
			docObjects[0].SetCellValue(docObjects[0].LastRow(), "chk",0, 0);

			
			//C.W Park
			//#34 #52833 - [BNX] TRADE PARTNER'S EMAIL AND FAX DIVISION LOGIC REMOVAL

//			if(fax_no != itemArr[3]){
//				docObjects[0].SetCellValue(docObjects[0].LastRow(), "chk",1, 0);
//				fax_no = itemArr[3];
//			}
			
			if(itemArr[5] == itemArr[6]){
				docObjects[0].SetCellValue(idx+1, "chk",1,0);
			}else{
				docObjects[0].SetCellValue(idx+1, "chk",0,0);
			}
			
			docObjects[0].SetCellValue(docObjects[0].LastRow(), "trdp_nm",itemArr[0], 0);
			docObjects[0].SetCellValue(docObjects[0].LastRow(), "trdp_pic_nm",itemArr[1], 0);
			docObjects[0].SetCellValue(docObjects[0].LastRow(), "dept_cd",itemArr[2], 0);
			docObjects[0].SetCellValue(docObjects[0].LastRow(), "fax",itemArr[3], 0);
			docObjects[0].SetCellValue(docObjects[0].LastRow(), "trdp_cd",itemArr[4], 0);
		}
	}
}
