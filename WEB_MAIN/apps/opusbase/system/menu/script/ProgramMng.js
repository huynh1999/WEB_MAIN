var show_complete = "N";
function doWork(srcName){
	if(!btnGetVisible(srcName)){	//버튼의 단축키 사용가능여부 체크
		return;
	}
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var sheetObj2=docObjects[1];
    var formObj=document.frm1;
    try {
        switch(srcName) {
           case "SEARCHLIST":
                formObj.f_cmd.value=SEARCHLIST;
                //검증로직
                if(validateForm(sheetObj, formObj, SEARCHLIST, 1)){
                	sheetObj.DoSearch("ProgramMngGS.clt", FormQueryString(formObj) );
                    //디버깅
                    //alert(sheetObj.GetSearchXml("masterCodeMngGS.clt", FormQueryString(formObj)));
                	sheetObj2.DoSearch(null, null );
                }
           break;
           case "SEARCHLIST01":
        	   formObj.f_cmd.value=SEARCHLIST;
               //검증로직
               sheetObj2.DoSearch("ProgramButtonRoleMngGS.clt", FormQueryString(formObj) );
           break; 
           case "MOVE":
        	   
        	   if(sheetObj.RowCount()== 0){
					//There is no data
	   				alert(getLabel('FMS_COM_ALT004'));
				}
				else{
					
					var rowLen=sheetObj.LastRow() + 1;
					var chk_pgm_seq="pgm_seq=";
					var chk_mnu_seq;
					var tnsParm;
					var checkRowCount=0;
					for(var i=1; i < rowLen; i++){
						if(sheetObj.GetCellValue(i, 'chk') == '1'){
							chk_pgm_seq      += sheetObj.GetCellValue(i, 'pgm_seq')+ ",";
							
							chk_mnu_seq = sheetObj.GetCellValue(i, 'mnu_seq');
							
							checkRowCount++;
						}	 
					}
					
					if (checkRowCount == 0) {
						alert(getLabel('FMS_COM_ALT004'));
						sheetObj.SelectCell(i, 'chk');
						break;
					}
					
					tnsParm = chk_pgm_seq.slice(0,-1) + "&mnu_seq="+chk_mnu_seq
					//alert(tnsParm);
					//모달리스 
					//popGET('MenuMngSub_popup.clt?'+tnsParm, '', 850, 700, "scroll:yes;status:no;help:no;");
					//모달(창이 열렸을때 기존창 사용 못함)
					modal_center_open('ProgramMngSub_popup.clt?'+tnsParm, '', 450, 400, "yes");
				}
				break;

           case "ADD":
                formObj.f_cmd.value=ADD;
                if(inpuValCheck(sheetObj, ADD)){
                    //전체 CellRow의 갯수
                	//Do you want to proceed?
                    if(confirm(getLabel('FMS_COM_CFMCON'))){
                        doProcess=true;
                        show_complete = "Y";
                        sheetObj.DoSave("ProgramMngGS.clt", FormQueryString(formObj),"ibflag",false);
                    }
                }
           break;
           case "MODIFY":
                formObj.f_cmd.value=MODIFY;
               	if(inpuValCheck(sheetObj, MODIFY)){
                    if(confirm(getLabel('FMS_COM_CFMMOD'))){
                        doProcess=true;
                        show_complete = "Y";
                        sheetObj.DoSave("ProgramMngGS.clt", FormQueryString(formObj),"ibflag",false);
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
                        sheetObj.DoSave("ProgramMngGS.clt", FormQueryString(formObj),"ibflag",false);
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
        		   alert(getLabel('FMS_COM_ALT004'));
        	   }else{
        		   var intRows=sheetObj.LastRow()+1;
	   	           sheetObj.DataInsert(intRows);
        	   }
        	   break;
           case "ROWADD2":
        	   if(frm1.caller_level.value==''){
        		   //Please select the menu from the left menulists!
        		   alert(getLabel('FMS_COM_ALT004'));
        	   }else{
        		   var intRows=sheetObj2.LastRow()+1;
	   	           sheetObj2.DataInsert(intRows);
        	   }
        	   break;
           case "SAVE2":
        	   frm1.f_cmd.value=ADD;
               if(checkPgmBnt(sheetObj2)){
                   //전체 CellRow의 갯수
               	//Do you want to proceed?
                   if(confirm(getLabel('FMS_COM_CFMCON'))){
                       doProcess=true;
                       show_complete = "Y";
                       sheetObj2.DoSave("ProgramButtonRoleMngGS.clt", FormQueryString(frm1),"ibflag",false);
                   }
               }else{
            	   if(btnRoleCheckMsg == 1){
            		   alert(getLabel('BTN_ROLE_CHECK_MSG'));
            	   }else{
            		   alert(getLabel('BTN_ROLE_CHECK_MSG2'));
            	   }
               }
           break;
           case "MODIFY2":
        	   frm1.f_cmd.value=MODIFY;
               	if(true){
                    if(confirm(getLabel('FMS_COM_CFMMOD'))){
                        doProcess=true;
                        show_complete = "Y";
                        sheetObj.DoSave("ProgramButtonRoleMngGS.clt", FormQueryString(formObj),"ibflag",false);
                    }
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
			   if(checkInputVal(sheetObj.GetCellValue(i, 'pgm_nm'), 1, 50, "T", getLabel('ITM_PGM'))!='O'){
			    	isOk=false;
			    	break;
			   }else if(checkInputVal(sheetObj.GetCellValue(i, 'pgm_url'), 1, 100, "T", "\'URL\'")!='O'){
			    	isOk=false;
			    	break;
			   }else if(checkInputVal(sheetObj.GetCellValue(i, 'srt_seq'), 1, 3, "N", getLabel('ITM_ORD'))!='O'){
			    	isOk=false;
			    	break;
			   }else if(checkInputVal(sheetObj.GetCellValue(i, 'pgm_desc'), 1, 200, "T", getLabel('ITM_DESC'))!='O'){
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
           SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0, FrozenCol:6 } );

           var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
           var headers = [ { Text:getLabel('PGM_HDR1'), Align:"Center"} ];
           InitHeaders(headers, info);

           // Hidden:0 ->화면에 보이는것 , Hidden:1 -> 화면에 안보이는것 
           var cols = [ {Type:"DelCheck", Hidden:0, Width:60, Align:"Center", ColMerge:0, SaveName:"curSelec" },
                        {Type:"CheckBox",  Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"chk",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1 },
                        {Type:"Radio",  Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:"chk",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1 },
                        {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"ibflag" },
                        {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:0,   SaveName:"pgm_nm",    KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                        {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"pgm_id",    KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                        {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:0,   SaveName:"pgm_url",   KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                        {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"srt_seq",   KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		                {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:0,   SaveName:"pgm_nm_en",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		 	            {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:0,   SaveName:"pgm_nm_zh",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		 	            {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:0,   SaveName:"pgm_nm_ja",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		 	            {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:0,   SaveName:"pgm_nm_ko",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		                {Type:"Text",      Hidden:0,  Width:300,  Align:"Left",    ColMerge:0,   SaveName:"pgm_desc",  KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		                {Type:"Combo",     Hidden:0, Width:50,   Align:"Center",  ColMerge:0,   SaveName:"use_flg",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		                {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"cur_cnt",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		                {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"pgm_seq" },
		                {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"mnu_seq" },
                  
                  ];
            
	           InitColumns(cols);
	
	           SetEditable(1);
	           SetSheetHeight(350);
	           SetColProperty(7, {ComboText:"ENABLE|DISABLE", ComboCode:"Y|N"} );
           }                                                  
           break;
           
         case 2: //페이지 별 버튼 설정.
      	    with(sheetObj){          
              SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0, FrozenCol:0 } );

              var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
              var headers = [ { Text:getLabel("PGM_BTN_ROLE_HDR1"), Align:"Center"} ];
              InitHeaders(headers, info);

              var cols = [
 							{Type:"DelCheck", Hidden:0, Width:60, Align:"Center", ColMerge:0, SaveName:"curSelec",  UpdateEdit:1  },
 							{Type:"Text", Hidden:0, Width:100, Align:"Left", ColMerge:0, SaveName:"btn_id", KeyField:1, CalcLogic:"", Format:"", PointCount:0, UpdateEdit:0, InsertEdit:1},
 							{Type:"Text", Hidden:0, Edit:1, Width:100, Align:"Center", ColMerge:0, SaveName:"btn_key", KeyField:1, CalcLogic:"", Format:"", PointCount:0, UpdateEdit:1, InsertEdit:1},
 							{Type:"Text", Hidden:0, Edit:1, Width:100, Align:"Left", ColMerge:0, SaveName:"btn_pos", KeyField:1, CalcLogic:"", Format:"", PointCount:0, UpdateEdit:0, InsertEdit:1},
 							{Type:"Int", Hidden:0, Edit:1, EditLen :4, Width:80, Align:"Center", ColMerge:0, SaveName:"srt_seq", KeyField:1, CalcLogic:"", Format:"", PointCount:0, UpdateEdit:1, InsertEdit:1},
 							{Type:"Combo", Hidden:0, Edit:1, Width:80, Align:"Left", ColMerge:0, SaveName:"mst_be", KeyField:1, CalcLogic:"", Format:"", PointCount:0, UpdateEdit:1, InsertEdit:1},
 							{Type:"Combo", Hidden:0, Edit:1, Width:120, Align:"Left", ColMerge:0, SaveName:"css_clss", KeyField:1, CalcLogic:"", Format:"", PointCount:0, UpdateEdit:1, InsertEdit:1},
 							{Type:"Text", Hidden:0, Edit:1, EditLen :1, Width:80, Align:"Left", ColMerge:0, SaveName:"btn_grp", KeyField:0, CalcLogic:"", Format:"", PointCount:0, UpdateEdit:1, InsertEdit:1},
 							{Type:"Combo", Hidden:0, Edit:1, Width:80, Align:"Left", ColMerge:0, SaveName:"use_flg", KeyField:1, CalcLogic:"", Format:"", PointCount:0, UpdateEdit:1, InsertEdit:1},
 							{Type:"Combo", Hidden:0, Edit:1, Width:80, Align:"Left", ColMerge:0, SaveName:"init_disp", KeyField:1, CalcLogic:"", Format:"", PointCount:0, UpdateEdit:1, InsertEdit:1},
 							{Type:"Text", Hidden:0, Edit:1, Width:150, Align:"Left", ColMerge:0, SaveName:"rmk", KeyField:0, CalcLogic:"", Format:"", PointCount:0, UpdateEdit:1, InsertEdit:1},
 							{Type:"Combo", Hidden:0, Edit:1, Width:110, Align:"Left", ColMerge:0, SaveName:"lnk_prmtr", KeyField:0, CalcLogic:"", Format:"", PointCount:0, UpdateEdit:1, InsertEdit:1},
 							{Type:"Text", Hidden:0, Edit:1, Width:120, Align:"Left", ColMerge:0, SaveName:"btn_actin", KeyField:1, CalcLogic:"", Format:"", PointCount:0, UpdateEdit:1, InsertEdit:1},
 							{Type:"Text", Hidden:1, Width:0, Align:"Center", ColMerge:0, SaveName:"pgm_id"},
 							{Type:"Text", Hidden:1, Width:0, Align:"Center", ColMerge:0, SaveName:"rgst_ofc_cd"},
 							{Type:"Status", Hidden:1, Width:0, Align:"Center", ColMerge:0, SaveName:"ibflag"}
                      ];
   	           InitColumns(cols);
   	
   	           SetEditable(1);
   	           var height = $(window).height();
   	           SetSheetHeight(250);
   	           SetColProperty("use_flg", {ComboText:"Y|N", ComboCode:"Y|N"} );
   	           SetColProperty("mst_be", {ComboText:"Y|N", ComboCode:"Y|N"} );
   	           SetColProperty("lnk_prmtr", {ComboText:"Y|N", ComboCode:"Y|N"} );
   	           SetColProperty("init_disp", {ComboText:initDispName, ComboCode:initDispCode} );
   	           SetColProperty("css_clss", {ComboText:btCssName, ComboCode:btCssCode} );
          }

      	 break;
    }
}
/**
 * IBSheet 이벤트 처리후 이벤트를 받아서 처리하기 위한 메소드임
 */
function sheet1_OnClick(sheetObj, row, col){
	if(col==2){
		var colNm=sheetObj.ColSaveName(col);
		var pgmId=sheetObj.GetCellValue(row, "pgm_id");
		frm1.p_pgm_id.value=pgmId;
		doWork("SEARCHLIST01");
	}
}
function sheet1_OnSaveEnd(sheetObj, errMsg){
	if(errMsg == undefined  || errMsg==null || errMsg =='' ){
		if(show_complete == "Y"){
			showCompleteProcess();
			show_complete = "N";
		}
	}
	dispFr.location.reload();
}
function sheet1_OnSearchEnd(sheetObj, errMsg){
	if(errMsg == undefined  || errMsg==null || errMsg =='' ){
		if(show_complete == "Y"){
			showCompleteProcess();
			show_complete = "N";
		}
	}
}
function sheet1_Onload(){
	alert("test");
}

//#607 [Program Management] Not Insert a new row automatically when focus in [Using] column at grid and pressing "tab" key
function sheet1_OnKeyDown(sheetObj, row, col, keyCode){
	if(sheetObj.LastRow() == row && keyCode==9 && sheetObj.ColSaveName(col)=="use_flg"){
		doWork('ROWADD');
		sheetObj.SelectCell(row+1, 2);
	}
}

function checkPgmBnt(sheetObj2){
	var groupArr = []; 
	var groupAll = [];
	var retValue = true;
	
	// 등록 된 모든 버튼 
	$.each(sheetObj2.Rows, function(idx, item){
		if(idx <= sheetObj2.RowCount()){
			var group = new Object();
			group.id = item.C8;
			group.seq = item.C5;
			group.must_bt = item.C6;
			groupAll.push(group);
			
			if (item.C8) {
				
				var matched = false;
				
				$.map(groupArr, function(arr, arrIdx) {
					 if (arr.id == item.C8) {
					   arr.cnt += 1;
					   matched = true;
					 }
				})
				
				if (!matched){
					 group.cnt = 1;
					 groupArr.push(group);
				}
			}
		}
	});
	
	// seq로 재정렬
	groupAll.sort(function(a,b){ return a.seq < b.seq ? -1 : a.seq > b.seq ? 1 : 0;})
	
	if (groupArr.length > 0) {
		var groupCnt = 0;
		var chkID = '';
		var chkCnt = 0;
		var found = false;

		$.each(groupArr, function(idx, item){
			//groupCnt = item.cnt;
			//chkID = item.id;
			chkCnt = 0;
			found = false;
			
			$.each(groupAll, function(idxAll, itemAll){
				if (itemAll.id == item.id){
					found = true;
					chkCnt++;
				} else {
					if (found){
						if (chkCnt != item.cnt){
							retValue = false;
							btnRoleCheckMsg = 1;
							return false;	
						} else {
							return true;
						}						
					}
				}
				if(itemAll.id){
					if(itemAll.must_bt != 'N'){
						retValue = false;
						btnRoleCheckMsg = 2;
						return false;
					}
				}
			})			
		})			
	}

	return retValue;
}