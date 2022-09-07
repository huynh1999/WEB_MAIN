/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : RoleBtnAssign.js
*@FileTitle  : 롤 프로그램 매핑화면
*@author     : CLT
*@version    : 1.0
*@since      : 2014/06/04
=========================================================*/
var rtnary=new Array(1);
var callBackFunc = "";
var show_complete = "N";
function doWork(srcName){
	if(!btnGetVisible(srcName)){	//버튼의 단축키 사용가능여부 체크
		return;
	}
    var formObj=document.form;
    var sheetObj=docObjects[0];
    try {
        switch(srcName) {
	    	case "POP2":		
	    		popGET('./TEST.clt', '', 800, 500);
	    		break;        
        	case "POP":		//롤관리 팝업호출
        		popGET('./RoleMng.clt', '', 800, 500);
        		break;
        	case 'ADD':		//롤관리 팝업호출
        		if(formObj.f_rolecd_cd.value==''){
        			//Please select a rule!
        			alert(getLabel('FMS_COM_ALT004'));
        			return;
        		}else{
        			//Do you want to proceed?
                    if(confirm(getLabel('FMS_COM_CFMSAV'))){
		        		formObj.f_cmd.value=ADD;
		        		show_complete = "Y";
		        		sheetObj.DoSave("RoleBtnAssignGS.clt", FormQueryString(formObj),"ibflag",false);
	        		}
        		}
        	break;
            case "EXCEL":
            	if(sheetObj.RowCount() < 1){//no data	
	   	   			ComShowCodeMessage("COM132501");
	   	   		}else{
	   	   			sheetObj.Down2Excel( {DownCols: makeHiddenSkipCol(sheetObj), SheetDesign:1,Merge:1 });
	   	   		}
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
	//Role을 선택한경우 조회
	function dispMenus(obj){
	var formObj=document.form;
    var sheetObj=docObjects[0];
	if(obj.value!=''){
		if(form.callValue.value!=obj.value){
			form.f_cmd.value=SEARCHLIST;
			sheetObj.DoSearch("RoleBtnAssignGS.clt", FormQueryString(formObj) );
		}
	}
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
	}
	//roleBtnControl(document, attr1, attr2, attr3, attr4, attr5, attr6, attr7, attr8, attr9);
	// Add by pomsjung
	//roleBtnControl(document, attr1, attr2, attr3, attr4, attr5, attr6, attr7, attr8, attr9, attr_extension);
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
        	    with(sheetObj){

           SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

           var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
           var headers = [ { Text:getLabel('ROLE_BTN_HDR1_1'), Align:"Center"},
                       { Text:getLabel('ROLE_BTN_HDR1_2'), Align:"Center"} ];
           InitHeaders(headers, info);

           var cols = [ {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"ibflag" },
                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"top_mnu_seq",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"top_mnu_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Text",      Hidden:1, Width:32,   Align:"Center",  ColMerge:1,   SaveName:"top_mnu_flg",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:0 },
                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"sub_mnu_seq",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Text",      Hidden:0,  Width:192,  Align:"Left",    ColMerge:1,   SaveName:"sub_mnu_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Text",      Hidden:1, Width:32,   Align:"Center",  ColMerge:1,   SaveName:"sub_mnu_flg",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:0 },
                  {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:1,   SaveName:"pgm_mnu_seq",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Text",      Hidden:0,  Width:192,  Align:"Left",    ColMerge:1,   SaveName:"pgm_mnu_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Text",      Hidden:1, Width:32,   Align:"Center",  ColMerge:1,   SaveName:"pgm_mnu_flg",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:0 },
                  {Type:"CheckBox",  Hidden:0, Width:70,   Align:"Center",  ColMerge:1,   SaveName:"attr1",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 , TrueValue:"Y" ,FalseValue:"N" },
                  {Type:"CheckBox",  Hidden:0, Width:70,   Align:"Center",  ColMerge:1,   SaveName:"attr2",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 , TrueValue:"Y" ,FalseValue:"N" },
                  {Type:"CheckBox",  Hidden:0, Width:70,   Align:"Center",  ColMerge:1,   SaveName:"attr3",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 , TrueValue:"Y" ,FalseValue:"N" },
                  {Type:"CheckBox",  Hidden:0, Width:70,   Align:"Center",  ColMerge:1,   SaveName:"attr4",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 , TrueValue:"Y" ,FalseValue:"N" },
                  {Type:"CheckBox",  Hidden:0, Width:70,   Align:"Center",  ColMerge:1,   SaveName:"attr5",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 , TrueValue:"Y" ,FalseValue:"N" },
                  {Type:"CheckBox",  Hidden:0, Width:70,   Align:"Center",  ColMerge:1,   SaveName:"attr6",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 , TrueValue:"Y" ,FalseValue:"N" },
                  {Type:"Text",      Hidden:1, Width:70,   Align:"Center",  ColMerge:1,   SaveName:"attr7",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                  {Type:"Text",      Hidden:1, Width:70,   Align:"Center",  ColMerge:1,   SaveName:"attr8",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                  {Type:"Text",      Hidden:1, Width:70,   Align:"Center",  ColMerge:1,   SaveName:"attr9",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                  {Type:"Popup",      Hidden:0,  Width:70,   Align:"Left",    ColMerge:1,   SaveName:"attr_extension",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1} ];
            
           InitColumns(cols);
           SetSheetHeight(410);
           SetEditable(1);
           resizeSheet();
                 }


           break;
    }
}

function resizeSheet() {
	ComResizeSheet(docObjects[0]);
}

var cur_row

function sheet1_OnDblClick(sheetObj,Row,Col){
  cur_row = Row;
  var colStr=sheetObj.ColSaveName(Col);
  if(colStr == "attr_extension"){
	  sheet1_OnPopupClick(sheetObj, Row, Col);
  }
}

function sheet1_OnPopupClick(sheetObj, row, col){
	cur_row = row;
	var formObj=document.form;
	var colStr=sheetObj.ColSaveName(col);
	 if(colStr == "attr_extension"){
		//GLCODE POPUP을 호출한다.
		rtnary = new Array();
   		rtnary[0] = sheet1.GetCellValue(row,"pgm_mnu_seq");
   		rtnary[1] = sheet1.GetCellValue(row,"attr_extension");
   		rtnary[2] = formObj.f_rolecd_cd.value;
   		callBackFunc = "sheet1_OnPopupClick_attr_extension";
   		modal_center_open('./RoleBtnAssignPop.clt?pgm_seq=' + sheet1.GetCellValue(row,"pgm_mnu_seq") + "&attr_extension=" + sheet1.GetCellValue(row,"attr_extension"), rtnary, 750,495,"yes");
   		
	}
}

function sheet1_OnPopupClick_attr_extension(rtnVal){
	var formObj  = document.frm1;
	if (rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		docObjects[0].SetCellValue(cur_row, "attr_extension",rtnVal, 0);
	}
}
function sheet1_OnSaveEnd(sheetObj, errMsg){
	if(errMsg == "" || errMsg == undefined || errMsg == null){
		if(show_complete == "Y"){
			showCompleteProcess();
			show_complete = "N";
		}
	}
}