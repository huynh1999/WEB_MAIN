/*
=========================================================
*@FileName   : SEE_BMD_0051.jsp
*@FileTitle  : Shipping Document
*@Description: Shipping Document 등록 수정한다.
*@author     : PhiTran
*@since      : 06/12/2014
=========================================================**/
var fileRow=0;
function doWork(srcName){
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var formObj=document.frm1;
    try {
        switch(srcName) {
           case "ADD":
        	   var isOk=true;
        	   if(checkAllEml(formObj.eml_to_addr.value)==false){
        		   isOk=false;
        	   }
        	   if(formObj.eml_cc_addr.value.length>0){
        		   if(checkAllEml(formObj.eml_cc_addr.value)==false){
            		   isOk=false;
        		   }
        	   }
        	   //Maxlength를 확인함.
        	   var objArr=checkLen(document, 'eml_to_addr;eml_cc_addr;eml_tit;');
        	   //입력되지 않은 항목처리
        	   if(objArr[0]!=''){        		   
        		   if(objArr[0].indexOf('eml_to_addr')>-1){
        			   //alert(getShowErrMsg(formObj.eml_to_addr));
        			   alert(getLabel('FMS_COM_ALT002') + " - " + getLabel('FMS_COD_MAIL') + "\n\n: SEE_BMD_0052.27");
        			   formObj.eml_to_addr.focus();
            		   isOk=false;            		   
        		   }else if(objArr[0].indexOf('eml_tit')>-1){
        			   //alert(getShowErrMsg(formObj.eml_tit));
        			   alert(getLabel('FMS_COM_ALT002') + " - " + getLabel('FMS_COD_ADDR') + "\n\n: SEE_BMD_0052.33");
        			   formObj.eml_tit.focus();
            		   isOk=false;
        		   }
        	   }
        	   //MaxLength보다 긴 항목들
        	   if(objArr[1]!=''){
        		   isOk=false;
        	   }
        	   //처리중 오류항목처리
        	   if(objArr[2]!=''){
        		   isOk=false;
        		   alert(getLabel('SEE_BMD_MSG70'));
        	   }
        	   if(isOk){
					//첨부파일이 있는경우
//					if(fileRow==0){
//						alert('File not found! Please select documents from [Document List]');
//					}
					if(confirm(getLabel('FMS_COM_CFMSEN'))){
						var intRows=docObjects[1].LastRow() + 1;
						docObjects[1].DataInsert(intRows);
						docObjects[1].SetCellValue(1,1,1);
						showProcess('WORKING', document);
						formObj.f_cmd.value=ADD;
	                	docObjects[1].DoAllSave("./SEE_BMD_0052GS.clt", docObjects[0].GetSaveString(false)+'&'+FormQueryString(frm1), false);
					}        	    	
        	   }
           break;
        } // end switch
    }catch(e) {
        if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	alert(getLabel('FMS_COM_ERR002') + "\n\n: SEE_BMD_0052.001");
        } 
        else{
        	//System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001') + " - " + e + "\n\n: SEE_BMD_0052.002"); 
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
             with(sheetObj){
           
		        // (5, 0, 0, true);
		
		         SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0 } );
		
		         var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		         var headers = [ { Text:getLabel('SEE_BMD_HDR18'), Align:"Center"} ];
		         InitHeaders(headers, info);
		
		         var cols = [ {Type:"Status",    Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"ibflag",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		          {Type:"Text",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:0,   SaveName:"docSeq",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		          {Type:"Text",      Hidden:0,  Width:90,   Align:"Left",    ColMerge:0,   SaveName:"docKind",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		          {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:0,   SaveName:"docNm",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		          {Type:"Text",      Hidden:1, Width:0,    Align:"Left",    ColMerge:0,   SaveName:"f_palt_doc_seq" } ];
		          
		         InitColumns(cols);
		
		         SetEditable(1);
		         SetSheetHeight(120);
                     }

                                                      
        break;
        case 2:      //IBSheet1 init
            with(sheetObj){
           // SetSheetHeight(0);
          //(2, 0, 0, true);

	          SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0 } );
	
	          var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
	          var headers = [ { Text:'FLAG|STS', Align:"Center"} ];
	          InitHeaders(headers, info);
	
	          var cols = [ {Type:"Status",    Hidden:1, Width:40,   Align:"Center",  ColMerge:1,   SaveName:"sv_ibflag" },
	                 {Type:"Text",      Hidden:1, Width:40,   Align:"Center",  ColMerge:0,   SaveName:"" } ];
	           
	          InitColumns(cols);
	
	          SetEditable(1);
	         SetCountPosition(3);
	          SetVisible(false);

                }

                                            
        break;
    }
}
function doDispFileList(){
	var num=1;
	var opSheetObj=opener.getSelectedFiles();
	for(var i=1; i <= opSheetObj.LastRow(); i++){
		if(opSheetObj.GetCellValue(i, 'palt_check')==1){
			var shIdx=docObjects[0].DataInsert();
			docObjects[0].SetCellValue(shIdx, 'docSeq',num++);
			docObjects[0].SetCellValue(shIdx, 'docKind',opSheetObj.GetCellValue(i, 'palt_doc_tp_cd'));
			docObjects[0].SetCellValue(shIdx, 'docNm',opSheetObj.GetCellValue(i, 'palt_doc_no'));
			docObjects[0].SetCellValue(shIdx, 'f_palt_doc_seq',opSheetObj.GetCellValue(i, 'palt_doc_seq'));
			fileRow++;
		}
	}
	if(num==1){
		//File not found! Please select documents from [Document List]
		alert(getLabel('FMS_COM_ALT010') + "\n\n: SEE_BMD_0052.214");
	}
}
function sheet2_OnSaveEnd(sheetObj, errMsg){
	hideProcess('WORKING', document);
	if(errMsg == null || errMsg == ""){
		var num=1;
		fileRow=0;
		var opSheetObj=parent.getSelectedFiles();
		for(var i=1; i <= opSheetObj.LastRow(); i++){
			if(opSheetObj.GetCellValue(i, 'palt_check')==1){
				var shIdx=docObjects[0].DataInsert();
				docObjects[0].SetCellValue(shIdx, 'docSeq',num++);
				docObjects[0].SetCellValue(shIdx, 'docKind',opSheetObj.GetCellValue(i, 'palt_doc_tp_cd'));
				docObjects[0].SetCellValue(shIdx, 'docNm',opSheetObj.GetCellValue(i, 'palt_doc_nm'));
				docObjects[0].SetCellValue(shIdx, 'f_palt_doc_seq',opSheetObj.GetCellValue(i, 10));
				fileRow++;
			}
		}
		if(errMsg==undefined || errMsg==null || errMsg =='' ){
			//alert(getLabel('FMS_COM_NTYCOM'));
			/* LHK 20130822 #19443 Save & Complete Alert message 변경 */
			showCompleteProcess();
		}
		ComClosePopup(); 
    }
}
