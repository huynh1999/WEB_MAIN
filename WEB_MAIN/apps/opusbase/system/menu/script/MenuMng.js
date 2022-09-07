//=========================================================
//*Copyright(c) 2008 CyberLogitec. All Rights Reserved.
//=========================================================
//
//=========================================================
//*@FileName   : MENU.jsp
//*@FileTitle  : 메뉴 표시
//*@Description: 메뉴의 관리
//*@author     : Kang,Jung-Gu - Cyberlogitec
//*@version    : 1.0 - 08/07/2008
//*@since      : 08/07/2008
//
//*@Change history:
//*@author: Tuan.Chau
//*@version: 2.0 - 05/06/2014
//=========================================================
var show_complete = "N";
function doWork(srcName){	
	if(!btnGetVisible(srcName)){	//버튼의 단축키 사용가능여부 체크
		return;
	}
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var formObj=document.frm1;
    try {
        switch(srcName) {
        
           case "SEARCHLIST":        	   
                formObj.f_cmd.value=SEARCHLIST;
                //검증로직
                if(validateForm(sheetObj, formObj, SEARCHLIST, 1)){
                	sheetObj.DoSearch("MenuMngGS.clt", FormQueryString(formObj) );
                    //디버깅
                	
                    //alert(sheetObj.GetSearchXml("masterCodeMngGS.clt", FormQueryString(formObj)));
                }
           break;
           case "MOVE":
        	   if(sheetObj.RowCount()== 0){
					//There is no data
	   				alert(getLabel('FMS_COM_ALT004'));
				}
				else{
					
					var rowLen=sheetObj.LastRow() + 1;
					var chk_mnu_seq="mnu_seq=";
					var chk_prnt_mnu_seq;
					var tnsParm;
					var checkRowCount=0;
					for(var i=1; i < rowLen; i++){
						if(sheetObj.GetCellValue(i, 'chk') == '1'){
							chk_mnu_seq      += sheetObj.GetCellValue(i, 'mnu_seq')+ ",";
							chk_prnt_mnu_seq = sheetObj.GetCellValue(i, 'prnt_mnu_seq');
							checkRowCount++;
							
						}	 
					}
					
					if (checkRowCount == 0) {
						alert(getLabel('FMS_COM_ALT004'));
						sheetObj.SelectCell(i, 'chk');
						break;
					}
					
					tnsParm = chk_mnu_seq.slice(0,-1) + "&prnt_mnu_seq="+chk_prnt_mnu_seq
					//alert(tnsParm);
					//모달리스
					//popGET('MenuMngSub_popup.clt?'+tnsParm, '', 850, 700, "scroll:yes;status:no;help:no;");
					//모달(창이 열렸을때 기존창 사용 못함)
					modal_center_open('MenuMngSub_popup.clt?'+tnsParm, '', 850, 400, "yes");
				}
				break;
           case "ADD":
        	   
                formObj.f_cmd.value=ADD;
                if(inpuValCheck(sheetObj, ADD)){
                    //전체 CellRow의 갯수
                    if(confirm(getLabel('FMS_COM_CFMCON'))){
                        doProcess=true;
                        show_complete = "Y";
                        sheetObj.DoSave("MenuMngGS.clt", FormQueryString(formObj),"ibflag",false);
                        alert("재활용");
                    }
                }
           break;
           case "MODIFY":
	            formObj.f_cmd.value=MODIFY;
	            if(inpuValCheck(sheetObj, MODIFY)){
                    if(confirm(getLabel('FMS_COM_CFMMOD'))){
                        doProcess=true;
                        show_complete = "Y";
                        sheetObj.DoSave("MenuMngGS.clt", FormQueryString(formObj),"ibflag",false);
                    }
                }
           break;
           case "REMOVE":
				var delYn=true; 
				formObj.f_cmd.value=REMOVE;
				var rowLen=sheetObj.LastRow() + 1;
				for(var i=1; i < rowLen; i++){
					if(sheetObj.GetCellValue(i, 'curSelec')==1&&sheetObj.GetCellValue(i, 'ibflag')=='D'){
					if(sheetObj.GetCellValue(i, 'cur_cnt')>0){
							//alert(getLabel('ITM_MNU')+' "'+sheetObj.CellValue(i, 'mnu_nm')+'is registrered to authorization previously.\r\n\r\nPlease revoke its authority!');
							alert(getLabel('SYS_COM_ALT003'));
							delYn=false;
							sheetObj.SelectCell(i, 'pgm_nm');
							break;
						}
					}
				}
				if(delYn&&validateForm(sheetObj, formObj, REMOVE, 1)){
	                if(confirm(getLabel('FMS_COM_CFMDEL'))){
	                    doProcess=true;
                        show_complete = "Y";
	                    sheetObj.DoSave("MenuMngGS.clt", FormQueryString(formObj),"ibflag",false);
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
           case "ROWADD":
        	   if(frm1.caller_level.value==''){
        		   //Please select the menu from the left menulists!
        		   alert(getLabel('FMS_COM_ALT004'));  //<== 임시 주석처리            			
        	   }else{
	   				var intRows=sheetObj.LastRow()+1;
	   	            sheetObj.DataInsert(intRows);
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
        	alert(getLabel('FMS_COM_ERR001'));
        }
    }
}
/**
 * 입력값 체크
 */
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
			   //Menu
			   if(checkInputVal(sheetObj.GetCellValue(i, 'mnu_nm'), 1, 50, "T", getLabel('SYS_COD_MENU'))!='O'){
				   isOk=false;
				   break;
			   }else if(checkInputVal(sheetObj.GetCellValue(i, 'srt_seq'), 1, 3, "N", getLabel('ITM_ORD'))!='O'){
				   isOk=false;
				   break;
			   }else if(checkInputVal(sheetObj.GetCellValue(i, 'mnu_desc'), 1, 200, "T", getLabel('ITM_DESC'))!='O'){
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
                // 높이 설정
        	   SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0, FrozenCol:5 } );

        	   var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
        	   var headers = [ { Text:getLabel('MNU_HDR1'), Align:"Center"} ];
        	   InitHeaders(headers, info);

        	   var cols = [ {Type:"DelCheck",  Hidden:0, Width:60,   Align:"Center",  ColMerge:0,   SaveName:"curSelec" },
        	             {Type:"CheckBox",  Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"chk",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1 },
        	             {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"ibflag" },
        	             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"mnu_seq" },
        	             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"prnt_mnu_seq" },
        	             {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:0,   SaveName:"mnu_nm",    KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	             {Type:"Text",      Hidden:0,  Width:60,   Align:"Center",  ColMerge:0,   SaveName:"srt_seq",   KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	             // #535: [SBS] 다국어 처리 V1.0
        	             {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:0,   SaveName:"mnu_nm_en",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	             {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:0,   SaveName:"mnu_nm_zh",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	             {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:0,   SaveName:"mnu_nm_ja",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	             {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:0,   SaveName:"mnu_nm_ko",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	             {Type:"Text",      Hidden:0,  Width:360,  Align:"Left",    ColMerge:0,   SaveName:"mnu_desc",  KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	             {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:0,   SaveName:"use_flg",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
        	             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"cur_cnt",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 } ];
        	    
        	   InitColumns(cols);
        	   SetEditable(1);
        	   SetSheetHeight(600);
        	   SetColProperty(6, {ComboText:"ENABLE|DISABLE", ComboCode:"Y|N"} );
           }                                                      
           break;
    }
}
function sheet1_OnSaveEnd(sheetObj, errMsg){
	
	doWork('SEARCHLIST');
	if(errMsg == undefined  || errMsg==null || errMsg =='' ){
		if(show_complete == "Y"){
			showCompleteProcess();
			show_complete = "N";
		}
	}
//    	dispFr.location.reload();
}	
function sheet1_OnSearchEnd(sheetObj, errMsg){
	if(errMsg == undefined  || errMsg==null || errMsg =='' ){
		if(show_complete == "Y"){
			showCompleteProcess();
			show_complete = "N";
		}
	}
}
//#594 [Sub Menu] Not Insert a new row automatically when focus in [Using] column at grid and pressing "tab" key
function sheet1_OnKeyDown(sheetObj, row, col, keyCode){
	if(sheetObj.LastRow() == row && keyCode==9 && sheetObj.ColSaveName(col)=="use_flg"){
		doWork('ROWADD');
		sheetObj.SelectCell(row+1, 2);
	}
}
