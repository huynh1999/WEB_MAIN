/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : SYS_ROL_0010.jsp
*@FileTitle  : 롤 관리화면
*@author     : CLT
*@version    : 1.0
*@since      : 2014/06/04
=========================================================*/
function doWork(srcName){ 
	if(!btnGetVisible(srcName)){	//버튼의 단축키 사용가능여부 체크
		return;
	}
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var sheetObj2=docObjects[1];
    var formObj=document.form;
    try {
        switch(srcName) {
           case "SEARCHLIST":
                formObj.f_cmd.value=SEARCHLIST;
                //검증로직
                if(validateForm(sheetObj, formObj, SEARCHLIST, 1)){
                	sheetObj.DoSearch("RoleMngGS.clt", FormQueryString(formObj) );
                }
                break;
            case "SEARCHLIST01":
                formObj.f_cmd.value=SEARCHLIST01;
                //검증로직
                sheetObj2.DoSearch("RoleFncGS.clt", FormQueryString(formObj) );
                break;     
           case "ADD":
        	    if(!addValid()) return;
        	    //rolcoed duplicate 유무체크
        	    roleCodeCheck();
        	    if(formObj.dup_row.value !=""){
        	    	alert(getLabel('FMS_COM_ALT008'));
        	    	sheetObj.SelectCell(formObj.dup_row.value,"role_cd");
        	    	formObj.dup_row.value =="";
        	    	return;
        	    }
           		if(formObj.role_cd.value == "ADM"){
           			for(var i=1; i<sheetObj.RowCount()+1; i++){
           				if(sheetObj.GetCellValue(i, 'role_cd') == "Master"){
           					//That code is used already.
           					alert(getLabel('SYS_COM_ALT007'));
           					return;
           				}
           			}
           		}
           		var sht2=sheetObj2.GetSaveString(true);
                formObj.f_cmd.value=ADD;
                //if(inpuValCheck(sheetObj, ADD)){
                    //전체 CellRow의 갯수
                	//Do you want to proceed?
                	if(confirm(getLabel('FMS_COM_CFMSAV'))){
                        doProcess=true;
                        
//                        #1850 [BINEX V4421] ROLE NAME AND DESCRIPTION DOESN'T SAVE "&" AND AFTER
//                        sheetObj.DoAllSave("RoleMngGS.clt", FormQueryString(formObj) + '&' + sht2,false);
                        sheetObj.DoSave("RoleMngGS.clt", FormQueryString(formObj) + '&' + sht2,"ibflag",false);
                    }
                //}
           break;
           /*
           case "MODIFY":
                formObj.f_cmd.value=MODIFY;
                if(inpuValCheck(sheetObj, MODIFY)){
                    if(confirm(getLabel('FMS_COM_CFMMOD'))){
                        doProcess=true;
                        sheetObj.DoSave("RoleMngGS.clt", FormQueryString(formObj),"ibflag",false);
                    }
                }
           break;
           case "REMOVE":
                formObj.f_cmd.value=REMOVE;
                if(inpuValCheck(sheetObj, REMOVE)){
                    if(confirm(getLabel('FMS_COM_CFMDEL'))){
                        doProcess=true;
                        sheetObj.DoSave("RoleMngGS.clt", FormQueryString(formObj),"ibflag",false);
                    }
                }
           break;
           */
           case "EXCEL":
//        	   sheetObj.Down2Excel({ HiddenColumn:1,Merge:true,TreeLevel:false});
        	   if(sheetObj.RowCount() < 1){//no data	
	   	   			ComShowCodeMessage("COM132501");
	   	   		}else{
	   	   			sheetObj.Down2Excel( {DownCols: makeHiddenSkipCol(sheetObj), SheetDesign:1,Merge:1 });
	   	   		}
           break;
           case "ROWADD":
//        	   var intRows=sheetObj.RowCount();
//        	   intRows--;
        	   sheetObj.DataInsert(sheetObj.LastRow() + 1);
        	   //
        	   sheetObj.SelectCell(sheetObj.LastRow(), "role_cd", 1);
           break;
           case "COPY":
        	   roleCopyPopup();
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
//코드표시 Ajax
function dispAjaxReq(reqVal){
	try{
		var doc=getAjaxMsgXML(reqVal);
		if(doc[0]=='OK'){
			/*
			//Perent의 <Select>의 options를 제거한다.
			var pSelect=opener.document.forms[0].f_rolecd_cd;
			var curSelec=pSelect.value; 
			var optVal=pSelect.options;
			var sLen=optVal.length;
			sLen--;
			for(var p=sLen; p >0; p--){
				optVal.remove(p);
			}
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split(';');
			for(var i=0; i<rtnArr.length; i++){
				var cdVals=rtnArr[i].split(',');
				if(typeof(cdVals[1])!='undefined'){
					var oOption=opener.document.createElement("OPTION");
					optVal.add(oOption);
					oOption.innerText=cdVals[1];
					oOption.value=cdVals[0];
					if(curSelec==cdVals[0]){
						oOption.selected=true;
					}
				}
			}
			*/
		}else{
			//Error Errupt!	
			alert(getLabel('FMS_COM_ERR001'));		
		}
	}catch(err){
		//alert('Error Msg.:'+err.message);
		alert(getLabel('FMS_COM_ERR001') + err.message );
	}
}
function inpuValCheck(sheetObj, f_cmd){
	var rowCnt=sheetObj.LastRow() + 1;
	var isOk=true;
	var loopNum=0;
	var checkVal=false;
	for(var i=1; i < rowCnt; i++){
		var stat=sheetObj.GetCellValue(i, 'ibflag');
	   if(stat!='R'){
		   if(f_cmd==ADD&&stat=='I'){
			   checkVal=true;
			   loopNum++;
		   }else if(f_cmd==MODIFY&&stat=='U'){
			   checkVal=true;
			   loopNum++;
		   }else if(f_cmd==REMOVE&&stat=='D'){
			   loopNum++;
		   }
		   if(checkVal){
			   if(checkInputVal(sheetObj.GetCellValue(i, 'role_cd'),         3, 6,   "T", getLabel('ITM_ROLECD'))!='O'){
				   isOk=false;
				   break;
			   }else if(checkInputVal(sheetObj.GetCellValue(i, 'role_nm'),   5, 50,   "T", getLabel('ITM_ROLENM'))!='O'){
				   isOk=false;
				   break;
			   }else if(checkInputVal(sheetObj.GetCellValue(i, 'srt_seq'),   1, 3,    "N", getLabel('ITM_ORD'))!='O'){
				   isOk=false;
				   break;
			   }else if(checkInputVal(sheetObj.GetCellValue(i, 'role_desc'), 10, 200, "T", getLabel('ITM_DESC'))!='O'){
				   isOk=false;
				   break;
			   }
		   }
		   checkVal=false;
	   }
	}
	if(loopNum==0){
		if(f_cmd==ADD){
			//There is nothing to register!
		}else if(f_cmd==MODIFY){
			//There is no change to UPDATE!
		}
		isOk=false;
	}else{
		for(var i=1; i < rowCnt; i++){
			var stat=sheetObj.GetCellValue(i, 'ibflag');
		   if(stat!='R'){
			   if(f_cmd==ADD&&stat=='I'){
			   }else if(f_cmd==MODIFY&&stat=='U'){
			   }else if(f_cmd==REMOVE&&stat=='D'){
			   }else{
				   sheetObj.SetCellValue(i, 'ibflag','R');
			   }
		   }
		}
	}
	return isOk;
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
    //#609 [Role Management] Cannot auto search data when open UI
    doWork('SEARCHLIST');
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
	var fullWidth = $(window).width();
    switch(sheetNo) {
         case 1:      //IBSheet1 init
        	    with(sheetObj){
        	       SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0 } );

        	       var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
        	       var headers = [ { Text:getLabel('ROLE_HDR1'), Align:"Center"} ];
        	       InitHeaders(headers, info);

        	       var cols = [ 
        	              {Type:"DelCheck",  Hidden:0, Width:80,   Align:"Center",  ColMerge:0,   SaveName:"curChk" },
        	              {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"ibflag" },
        	              {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:0,   SaveName:"role_cd",    KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1,   EditLen:6 },
        	              {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"role_nm",    KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:50 },
        	              {Type:"Int",       Hidden:0,  Width:80,   Align:"Center",  ColMerge:0,   SaveName:"srt_seq",    KeyField:1,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:7 },
        	              {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:0,   SaveName:"role_desc",  KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:200 },
        	              {Type:"Combo",      Hidden:0,  Width:128,   Align:"Center",  ColMerge:0,   SaveName:"tgt_auth_role_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1,   EditLen:6 },
        	              {Type:"Combo",     Hidden:0, Width:100,  Align:"Center",  ColMerge:0,   SaveName:"use_flg",    KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	              {Type:"Text",      Hidden:1, Width:0,    Align:"Left",    ColMerge:0,   SaveName:"usr_cnt" },
        	              {Type:"Text",      Hidden:1, Width:0,    Align:"Left",    ColMerge:0,   SaveName:"mnu_cnt" },
        	              {Type:"Text",      Hidden:1, Width:0,    Align:"Left",    ColMerge:0,   SaveName:"pgm_cnt" } ];
        	        
        	       InitColumns(cols);
        	       SetSheetHeight(500);
        	       SetSheetWidth(800);
        	       SetEditable(1);
        	       SetColProperty(0, "use_flg",{ComboText:"ENABLE|DISABLE", ComboCode:"Y|N"} );
//        	       SetColProperty(7, "use_flg", {ComboText:"N|Y", ComboCode:"N|Y"} );
        	       SetColProperty(0 ,"role_cd", {AcceptKeys:"N|E|[ ]", InputCaseSensitive:"1"} );
        	       SetColProperty('tgt_auth_role_cd', {ComboText:ROLCD1, ComboCode:ROLCD2} );
	       }
           break;
    	case 2:      //IBSheet1 init
    	    with(sheetObj){          
          SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0 } );

          var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
          var headers = [ { Text:"|Name", Align:"Center"} ];
          InitHeaders(headers, info);

          var cols = [ {Type:"CheckBox",  Hidden:0, Width:40,   Align:"Center",  ColMerge:0,   SaveName:"chk", TrueValue:"Y", FalseValue:"N" },
                 {Type:"Text",      Hidden:0,  Width:140,  Align:"Left",    ColMerge:0,   SaveName:"role_fnc_nm",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:50 },
                 {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:0,   SaveName:"role_fnc_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1,   EditLen:6 },
                 {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"ibflag_dtl" } ];
           
				InitColumns(cols);
				SetSheetWidth(450);
				SetSheetHeight(500);
				SetEditable(1);
				sheetObj.SetFocusAfterProcess(0);
    		}

    	    break;       
    }
}

/**
 * IBSheet 이벤트 처리후 이벤트를 받아서 처리하기 위한 메소드임
 */
function sheet1_OnSaveEnd(sheetObj, errMsg){
	//Ajax로  Role 코드정보를 조회하여 Opener에 표시함
	//ajaxSendPost(callback, param, data, url)
	//ajaxSendPost(dispAjaxReq, 'reqVal', '&goWhere=aj&bcKey=rolecd', './GateServlet.gsl');
	if(errMsg=="" ||errMsg==undefined|| errMsg==null ){
		//alert(getLabel('FMS_COM_NTYCOM'));
		/* LHK 20130822 #19443 Save & Complete Alert message 변경 */
		showCompleteProcess();
	}
}
function sheet1_OnChange(sheetObj, row, col){
	var colNm=sheetObj.ColSaveName(col);
	if(colNm=='curChk'){
		if(sheetObj.GetCellValue(row, colNm)==1){
			if(sheetObj.GetCellValue(row, 'usr_cnt')>0){
				sheetObj.SetCellValue(row, colNm,0,0);
				//This Role is used at [User Management] page!. Please change the role!
				alert(getLabel('SYS_COM_ALT005')+ "\n\n: RoleMng.284");
			}else if(sheetObj.GetCellValue(row, 'mnu_cnt')>0){
				sheetObj.SetCellValue(row, colNm,0,0);
				//This Role is used at [Program/Role Mapping]  page!. Please change the role!
				alert(getLabel('SYS_COM_ALT006')+ "\n\n: RoleMng.288");
			}else if(sheetObj.GetCellValue(row, 'pgm_cnt')>0){
				sheetObj.SetCellValue(row, colNm,0,0);
				//This Role is used at [Program/Role Mapping]  page!. Please change the role!
				alert(getLabel('SYS_COM_ALT005')+ "\n\n: RoleMng.292");
			}
		}
	}
}

//#1958 [BINEX MSD] V4421 ROLE/ROLE CONTROL OPTION ERROR
var selectedRow = 0;
var selectCol = "";
function sheet1_OnClick(sheetObj, row, col){
//	var colNm=sheetObj.ColSaveName(col);
//	var roleCd=sheetObj.GetCellValue(row, "role_cd");

	selectedRow = row;
	selectCol = col;
	//alert(roleCd);
	//if(colNm=='role_cd' || colNm=='role_nm'){
//		form.f_role_cd.value=roleCd;
//		getObj('role_fnc').style.display='';
//		doWork("SEARCHLIST01");
//		sheetObj.SetCellValue(row, 'ibflag', 'U');
		
	//}
	//#2662 Target Auth Role 과 Use Y/N은 콤보박스라 onclick이벤트에서 제외
	//6: Target Auth
	//7: Use Y/N
	if(col != 6 && col !=7) {
		searchControlOption(sheetObj, selectedRow);
	}
}

function sheet1_OnSaveEnd(sheetObj, row, col) {
	sheetObj.SetSelectRow(selectedRow);
	searchControlOption(sheetObj, selectedRow);
}

function searchControlOption(sheetObj, selectRow){
	var roleCd=sheetObj.GetCellValue(selectRow, "role_cd");
	
	form.f_role_cd.value=roleCd;
	getObj('role_fnc').style.display='';
	doWork("SEARCHLIST01");
	
	if(sheetObj.GetRowStatus(selectRow) == "I"){
		sheetObj.SelectCell(selectRow, "role_cd", 1);
		sheetObj.SelectCell(selectRow, selectCol);
	}else{
		sheetObj.SetCellValue(selectRow, 'ibflag', 'U');
	}
	
	
}

/**
 * Save Validation
 * @return
 */
function addValid(){
    var sheetObj=docObjects[0];
    var formObj=document.form;
    var rowCnt=0;
    if(sheetObj.RowCount()<1){
    	//Please Retrieve first!;
    	alert(getLabel('FMS_COM_ALT029'));
    	return false;
    }
    for(var i=1;i<=sheetObj.RowCount();i++){
    	if(sheetObj.GetRowStatus(i) !="R"){
    		rowCnt++;
    	}
    	if(sheetObj.GetCellValue(i,"role_cd")==""){
    		alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('ITM_ROLECD'));
    		sheetObj.SelectCell(i,"role_cd");
    		return false;
    	}
    	if(sheetObj.GetCellValue(i,"role_nm")==""){
    		alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('ITM_ROLENM'));
    		sheetObj.SelectCell(i,"role_nm");
    		return false;
    	}
    }
	/*
    if(rowCnt==0){
    	alert(getLabel('FMS_COM_ALT038'));
    	return false;
    }
    */
    return true;
}
/** 
 * Check duplicate role code
 * @return
 */
function roleCodeCheck(){
    var formObj=document.form;
    var sheetObj=docObjects[0];
    for(var i=1;i<=sheetObj.RowCount();i++){
        //  Check duplicate role code
    	if(sheetObj.GetRowStatus(i) =="I"){
    		formObj.dup_row.value=i;
    		ajaxSendPost(dispAjaxRoleCdReq, 'reqVal', '&goWhere=aj&bcKey=searchRoleCode&role_cd='+sheetObj.GetCellValue(i,"role_cd"), './GateServlet.gsl');
    	}
    }
}
//확인 Ajax
function dispAjaxRoleCdReq(reqVal){
	var formObj=document.form;
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	var dup_cnt=0;
	if(doc[0]=='OK'){
		if(doc[1]=="0"){
			formObj.dup_row.value="";
		}else{
		} 
	}else{
		//Error Errupt!	
		alert(getLabel('FMS_COM_ERR001'));		
	}
}

//#614 [Role Management] Don't insert a new row when Pressing Tab key
function sheet1_OnKeyDown(sheetObj, row, col, keyCode){
	if(sheetObj.LastRow() == row && keyCode==9 && sheetObj.ColSaveName(col)=="use_flg"){
		doWork('ROWADD');
		sheetObj.SelectCell(row+1, 1);
	}
}

function roleCopyPopup(){
	var sheet=docObjects[0];
	var formObj=document.form;
	rtnary = new Array();
	callBackFunc = "sheet1_OnPopupClick_attr_extension";
	modal_center_open('./RoleCopyPop.clt', rtnary, 750,150,"yes");
}

function sheet1_OnPopupClick_attr_extension(rtnVal){
	var formObj  = document.form;
	if (rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		docObjects[0].SetCellValue(cur_row, "attr_extension",rtnVal, 0);
	}
}