function doWork(srcName){
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var formObj=document.form;
	try {
        switch(srcName) {
    	   case "SEARCHLIST":
                formObj.f_cmd.value=SEARCHLIST;
                //검증로직
                
                if(validateForm(sheetObj, formObj, SEARCHLIST, 1)){
                	sheetObj.RemoveAll();
                	sheetObj.DoSearch("CMM_POP_0360GS.clt", FormQueryString(formObj) );
                    var intRow=sheetObj.LastRow();
                    for ( var i=1 ; i <= intRow ; i++ ) {
						sheetObj.SetRowHeight(i,20);
					}
                    //디버깅
                   // alert("FormQueryString(formObj)==>"+FormQueryString(formObj));
                   // alert(sheetObj.GetSearchXml("searchProgram.clt", FormQueryString(formObj)));
                }
    	   break;    
    	   case "SELECT":
    		   	var formObj=document.form;
				var retArray="";
				if(formObj.openMean.value == "1"){	//Email
					for(var i=1 ; i < sheetObj.LastRow() + 1 ; i++){
						if(sheetObj.GetCellValue(i, "chk") == "1" && sheetObj.GetCellValue(i, "pic_eml") != ""){
							retArray += ";" + sheetObj.GetCellValue(i, "pic_eml");
					   }
				   }
				   retArray=retArray.substring(1);
				   if(retArray == ""){
	    			   //alert("Please check Email");
	    			   alert(getLabel('FMS_COM_ALT007') + " - " + getLabel('FMS_COD_MAIL'));	
	    			   return;
	    		   }
				}else if(formObj.openMean.value == "2"){		//Fax
					for(var i=1 ; i < sheetObj.LastRow() + 1 ; i++){
						if(sheetObj.GetCellValue(i, "chk") == "1" && sheetObj.GetCellValue(i, "pic_fax") != ""){
							retArray += "^^" + sheetObj.GetCellValue(i, "eng_nm") + "@@" + sheetObj.GetCellValue(i, "pic_nm") + "@@" + "" + "@@" + sheetObj.GetCellValue(i, "pic_fax") ;
						}
					}
					retArray=retArray.substring(2);
					if(retArray == ""){
	    			   //alert("Please check Email");
	    			   alert(getLabel('FMS_COM_ALT007') + " - " + getLabel('FMS_COD_MAIL'));	
	    			   return;
	    		   }
		        }else if(formObj.openMean.value == "3"){		//Email
		        	for(var i=1 ; i < sheetObj.LastRow() + 1 ; i++){
		        		if(sheetObj.GetCellValue(i, "chk") == "1" && sheetObj.GetCellValue(i, "pic_eml") != ""){
		        			//retArray += "^^" + sheetObj.CellValue(i, "eng_nm") + "@@" + sheetObj.CellValue(i, "pic_nm") + "@@" + "" + "@@" + sheetObj.CellValue(i, "pic_fax") ;	
		        			//#27546 [BINEX] Arrival Notice Mail/Fax 전송 시 수신자 설정
		        			// Email 정보 추가
		        			// OFVFOUR-7137 [JAPT] Add Remark Column when sending mail Arrival Notice
		        			retArray += "^^" + sheetObj.GetCellValue(i, "eng_nm") + "@@" + sheetObj.GetCellValue(i, "pic_nm") + "@@" + "" + "@@" + sheetObj.GetCellValue(i, "pic_fax") + "@@@@" + sheetObj.GetCellValue(i, "pic_eml")+ "@@@@" + sheetObj.GetCellValue(i, "pic_desc");
		        		}
		        	}
		        	retArray=retArray.substring(2);
		        	if(retArray == ""){
	    			   //alert("Please check Email");
	    			   alert(getLabel('FMS_COM_ALT007') + " - " + getLabel('FMS_COD_MAIL'));	
	    			   return;
	    		   }
		        }
    			ComClosePopup(retArray);
       	   break;
       	    case "CLOSE":
       	    	ComClosePopup();
       	    break;	   
        } // end switch
	}catch(e) {
        if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	alert(getLabel('FMS_COM_ERR002') + "\n\n: CMM_POP_0360.001");
        } 
        else{
        	//System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001') + " - " + e + "\n\n: CMM_POP_0360.002");
        }
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
	var formObj=document.form;
    for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
    var arg=parent.rtnary;
	formObj.openMean.value=arg[0];
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
             var headers = [ { Text:getLabel('CMM_POP_0360_HDR1'), Align:"Center"} ];
             InitHeaders(headers, info);

             var cols = [ {Type:"CheckBox",  Hidden:0, Width:50,   Align:"Center",  ColMerge:0,   SaveName:"chk",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
                    {Type:"Text",      Hidden:0,  Width:70,   Align:"Center",  ColMerge:0,   SaveName:"trdp_cd",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:0,  Width:170,  Align:"Left",    ColMerge:0,   SaveName:"eng_nm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                    {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"shrt_nm",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                    {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"pic_nm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                    {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:0,   SaveName:"pic_eml",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                    {Type:"Text",      Hidden:0,  Width:90,   Align:"Left",    ColMerge:0,   SaveName:"pic_fax",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                    // OFVFOUR-7137 [JAPT] Add Remark Column when sending mail Arrival Notice
                    {Type:"Text",      Hidden:1,  Width:90,   Align:"Left",    ColMerge:0,   SaveName:"pic_desc",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                    {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"Indexing" } ];
              
             InitColumns(cols);

             SetEditable(1);
             SetHeaderRowHeight(20 );
             SetSheetHeight(300);
//             SetCountPosition(0);
             sheetObj.SetCountFormat("BOTTOMDATA / TOTALROWS");
           }                                                      
           break;
    }
}

function sheet1_OnSort(sheetObj,Col, Value) { 
	sheetObj.SetSelectRow(1);
}
//OnDblClick(Row,Col) 
/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnDblClick이벤트 발생시.
 * sheet1_OnDblClick(sheetObj, Row, Col)  <= sheet1번+'_'+IBsheet상에 명시된 Event명+(Sheet Oeject, Row, Column) 
 */
function sheet1_OnDblClick(sheetObj,Row,Col){
	var formObj=document.form;
	var openMean=formObj.openMean.value ; 
	var retArray="";
	if(formObj.openMean.value == "1"){	//Email
		if(sheetObj.GetCellValue(Row, "pic_eml") == ""){
			alert(getLabel('FMS_COM_ALT007') + " - " + getLabel('FMS_COD_MAIL') + "\n\n: CMM_POP_0360.164");
			return;
		}
		retArray=sheetObj.GetCellValue(Row, "pic_eml");
	}else if(formObj.openMean.value == "2"){		//Fax
		retArray=sheetObj.GetCellValue(Row, "eng_nm") + "@@" + sheetObj.GetCellValue(Row, "pic_nm") + "@@" + "" + "@@" + sheetObj.GetCellValue(Row, "pic_fax") + "^^"  ;
	}else if(formObj.openMean.value == "3"){		//EMAIL 팝업
		//#27546 [BINEX] Arrival Notice Mail/Fax 전송 시 수신자 설정
		// Email 정보 추가
		 // OFVFOUR-7137 [JAPT] Add Remark Column when sending mail Arrival Notice
		retArray=sheetObj.GetCellValue(Row, "eng_nm") + "@@" + sheetObj.GetCellValue(Row, "pic_nm") + "@@" + "" + "@@" + sheetObj.GetCellValue(Row, "pic_fax") + "@@@@" + sheetObj.GetCellValue(Row, "pic_eml") + "@@@@" + sheetObj.GetCellValue(Row, "pic_desc") + "^^";
	}
	ComClosePopup(retArray)
}
//조회 후 페이지징 표시
function sheet1_OnSearchEnd(){
	var formObj=document.form;
	doDispPaging(docObjects[0].GetCellValue(1, 'Indexing'), getObj('pagingTb'));
	for (idxRow=1; idxRow < docObjects[0].RowCount(); idxRow++) {
		if(formObj.openMean.value == "1"){	//email
			if(docObjects[0].GetCellValue(idxRow, "pic_eml") == ""){
				docObjects[0].SetRowEditable(idxRow,0);
			} else {
				docObjects[0].SetRowEditable(idxRow,1);
			}
		}else if(formObj.openMean.value == "2"){	//fax
			if(docObjects[0].GetCellValue(idxRow, "pic_fax") == ""){
				docObjects[0].SetRowEditable(idxRow,0);
			} else {
				docObjects[0].SetRowEditable(idxRow,1);
			}
		}else if(formObj.openMean.value == "3"){	//이메일 팝업
			if(docObjects[0].GetCellValue(idxRow, "pic_eml") == ""){
				docObjects[0].SetRowEditable(idxRow,0);
			} else {
				docObjects[0].SetRowEditable(idxRow,1);
			}
		}
	}
}
/**
 * Paging 항목 선택시 호출되
 */
function goToPage(callPage){
	docObjects[0].RemoveAll();
	document.form.f_CurPage.value=callPage;	
	doWork('SEARCHLIST');
}
/**
 * 목록 조회건수 변경시 호출됨
 */
function searchList(){
	document.forms[0].f_CurPage.value=1;
	doWork('SEARCHLIST');
}
