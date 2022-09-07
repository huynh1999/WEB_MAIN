/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : SYS_ROL_0010.jsp
*@FileTitle  : 롤 관리화면
*@author     : CLT
*@version    : 1.0
*@since      : 2014/06/04
=========================================================*/
function doWork(srcName, valObj){ 
	if(!btnGetVisible(srcName)){	//버튼의 단축키 사용가능여부 체크
		return;
	}
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var sheetObj2=docObjects[1];
    var sheetObj3=docObjects[2];
    var formObj=document.form;
    try {
        switch(srcName) {
           case "SEARCHLIST01": //Container Movement Event 조회
                formObj.f_cmd.value=SEARCHLIST01;
                //검증로직
                if(validateForm(sheetObj, formObj, SEARCHLIST, 1)){
                	sheetObj.DoSearch("SEC_BMD_0020GS.clt", FormQueryString(formObj) );
                }
                break;
            case "SEARCHLIST": // MBL List
                formObj.f_cmd.value=SEARCHLIST; 
                //검증로직
                if(!searchValid(SEARCHLIST)) {
                	alert(getLabel('SUP_COM_ALT010'));
                	//MSG_KEY['SUP_COM_ALT010'] = 'Please input the search condition';
                	return;
                } 
                sheetObj2.DoSearch("SEC_BMD_0020_MBL_GS.clt", FormQueryString(formObj) );
                break;  
            case "SEARCHLIST02": //Event History 조회
                formObj.f_cmd.value=SEARCHLIST02;
                //검증로직
                if(searchValid(SEARCHLIST02)) {
                	sheetObj3.DoSearch("SEC_BMD_0020_HIS_GS.clt", FormQueryString(formObj) );
                }
                break;                
           case "ADD":
        	    if(!addValid()) return;
           		var sht2=sheetObj2.GetSaveString(false);
                formObj.f_cmd.value=ADD;
            	if(confirm(getLabel('FMS_COM_CFMSAV'))){
                    doProcess=true;
                    
                    sheetObj.DoSave("SEC_BMD_0020GS.clt", FormQueryString(formObj) + '&' + sht2,"ibflag",false);
                }
           break;

   		case "POL_LOCATION_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
       		rtnary=new Array(3);
      		rtnary[0]="S";
	   		rtnary[1]="BL";
	   		// 2011.12.27 value parameter
	   		if(typeof(valObj)!='undefined'){
	   			rtnary[2]=form.f_pol_nm.value;
	   		}else{
	   			rtnary[2]="";
	   		}
	   		rtnary[3]="";
	   		rtnary[4]=form.f_pol_cd;
	   		
	   		callBackFunc = "POL_LOCATION_POPLIST";
  	        modal_center_open('./CMM_POP_0030.clt',  rtnary, 806,440,"yes");
	       
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

function searchValid(val) {
	var formObj=document.form;	
	if (val == SEARCHLIST){
		
		if(formObj.f_trnk_vsl_nm.value=="" && formObj.f_trnk_voy_no.value=="" && 
				formObj.f_pol_cd.value=="" && formObj.f_pol_nm.value=="" &&
				formObj.f_cntr_no.value=="" && formObj.f_mbl_no.value=="" 
				// #3764 [BINEX] CONTAINER MOVEMENT EVENT					
				&& formObj.f_lnr_bkg_no.value==""								){
			return false;
		}
	} else if(val == SEARCHLIST02){
		if(formObj.f_h_mbl_no.value=="" && formObj.f_h_cntr_no.value==""
		// #3764 [BINEX] CONTAINER MOVEMENT EVENT					
		&& formObj.f_lnr_bkg_no.value==""								){
			return false;
		}
	}
		
	return true;
}

//코드표시 Ajax
function dispAjaxReq(reqVal){
	try{
		var doc=getAjaxMsgXML(reqVal);
		if(doc[0]=='OK'){
		}else{
			//Error Errupt!	
			alert(getLabel('FMS_COM_ERR001'));		
		}
	}catch(err){
		//alert('Error Msg.:'+err.message);
		alert(getLabel('FMS_COM_ERR001') + err.message );
	}
}
//function inpuValCheck(sheetObj, f_cmd){
//	var rowCnt=sheetObj.LastRow() + 1;
//	var isOk=true;
//	var loopNum=0;
//	var checkVal=false;
//	for(var i=1; i < rowCnt; i++){
//		var stat=sheetObj.GetCellValue(i, 'ibflag');
//	   if(stat!='R'){
//		   if(f_cmd==ADD&&stat=='I'){
//			   checkVal=true;
//			   loopNum++;
//		   }else if(f_cmd==MODIFY&&stat=='U'){
//			   checkVal=true;
//			   loopNum++;
//		   }else if(f_cmd==REMOVE&&stat=='D'){
//			   loopNum++;
//		   }
//		   if(checkVal){
//			   if(checkInputVal(sheetObj.GetCellValue(i, 'role_cd'),         3, 6,   "T", getLabel('ITM_ROLECD'))!='O'){
//				   isOk=false;
//				   break;
//			   }else if(checkInputVal(sheetObj.GetCellValue(i, 'role_nm'),   5, 50,   "T", getLabel('ITM_ROLENM'))!='O'){
//				   isOk=false;
//				   break;
//			   }else if(checkInputVal(sheetObj.GetCellValue(i, 'srt_seq'),   1, 3,    "N", getLabel('ITM_ORD'))!='O'){
//				   isOk=false;
//				   break;
//			   }else if(checkInputVal(sheetObj.GetCellValue(i, 'role_desc'), 10, 200, "T", getLabel('ITM_DESC'))!='O'){
//				   isOk=false;
//				   break;
//			   }
//		   }
//		   checkVal=false;
//	   }
//	}
//	if(loopNum==0){
//		if(f_cmd==ADD){
//			//There is nothing to register!
//		}else if(f_cmd==MODIFY){
//			//There is no change to UPDATE!
//		}
//		isOk=false;
//	}else{
//		for(var i=1; i < rowCnt; i++){
//			var stat=sheetObj.GetCellValue(i, 'ibflag');
//		   if(stat!='R'){
//			   if(f_cmd==ADD&&stat=='I'){
//			   }else if(f_cmd==MODIFY&&stat=='U'){
//			   }else if(f_cmd==REMOVE&&stat=='D'){
//			   }else{
//				   sheetObj.SetCellValue(i, 'ibflag','R');
//			   }
//		   }
//		}
//	}
//	return isOk;
//}
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
    
    doWork('SEARCHLIST01');
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
        	       var headers = [ { Text:getLabel('SEC_BMD_0020_HDR_1'), Align:"Center"},
   		  		                { Text:getLabel('SEC_BMD_0020_HDR_2'), Align:"Center"} ];
        	       InitHeaders(headers, info);

        	       var cols = [ 
        	              {Type:"CheckBox",  Hidden:0, Width:50,   Align:"Center",  ColMerge:0,   SaveName:"curChk" },
        	              {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"ibflag" },
        	              {Type:"Text",      Hidden:0,  Width:65,   Align:"Center",  ColMerge:0,   SaveName:"cd_val",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
        	              {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:0,   SaveName:"cd_nm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:50 },
        	              {Type:"Date",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:0,   SaveName:"event_date",    KeyField:0,   CalcLogic:"",   Format:"Ymd",     PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
   		             	  {Type:"Date",      Hidden:0,   Width:65,  Align:"Center",  	ColMerge:0, SaveName:"event_time",      KeyField:0, CalcLogic:"", Format:"Hm",  PointCount:0, UpdateEdit:1, InsertEdit:1,   EditLen:5 },
        	              {Type:"PopupEdit", Hidden:0,  Width:80,  Align:"Left",    ColMerge:0,   SaveName:"event_loc_cd",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:0,   EditLen:20 },
        	              {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"event_loc_nm",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:0,   EditLen:50 }
        	              ];
        	        
        	       InitColumns(cols);
        	       SetColProperty(0 ,"event_loc_cd" , {AcceptKeys:"E|N|[_]" , InputCaseSensitive:1});
        	       SetColProperty(0 ,"event_loc_nm" , {AcceptKeys:"E|N|[/ -., ]" , InputCaseSensitive:1});
        	       SetSheetHeight(450);
//        	       SetSheetWidth(fullWidth - 150);
        	       SetSheetWidth(600);
        	       SetHeaderRowHeight(20);
      		       SetHeaderRowHeight(20);


	       }
           break;
    	case 2:      //IBSheet1 init
    	    with(sheetObj){          
          SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0 } );

          var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
          var headers = [ { Text:getLabel('SEC_BMD_0020_HDR_3'), Align:"Center"} ];
          InitHeaders(headers, info);

          var cols = [ {Type:"CheckBox",  Hidden:0, Width:50,   Align:"Center",  ColMerge:0,   SaveName:"chk", TrueValue:"Y", FalseValue:"N" },
                 {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"ref_no",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                 {Type:"Text",      Hidden:0, Width:100,   Align:"Left",  ColMerge:0,   SaveName:"bl_no",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                 // #3764 [BINEX] CONTAINER MOVEMENT EVENT UPDATE TO SHOW 315 HISTORY
                 {Type:"Text",      Hidden:0, Width:100,   Align:"Left",  ColMerge:0,   SaveName:"lnr_bkg_no",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                 {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"cntr_no",        KeyField:0,   CalcLogic:"",   Format:"",  PointCount:0,   UpdateEdit:0,   InsertEdit:1 },                 
                 {Type:"Text",      Hidden:0,  Width:130,  Align:"Left",    ColMerge:0,   SaveName:"trnk_vsl_nm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                 {Type:"Text",      Hidden:0,  Width:80,   Align:"Left",    ColMerge:0,   SaveName:"trnk_voy",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                 {Type:"Text",      Hidden:0,  Width:90,  Align:"Left",    ColMerge:0,   SaveName:"pol_nm",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                 {Type:"Text",      Hidden:1,  Width:0,  Align:"Left",    ColMerge:0,   SaveName:"trnk_vsl_cd",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                 {Type:"Text",      Hidden:1,  Width:0,  Align:"Left",    ColMerge:0,   SaveName:"pol_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                 {Type:"Text",      Hidden:1,  Width:0,  Align:"Left",    ColMerge:0,   SaveName:"intg_bl_seq",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                 {Type:"Text",      Hidden:1,  Width:0,  Align:"Left",    ColMerge:0,   SaveName:"cntr_tpsz_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                 {Type:"Text",      Hidden:1,  Width:0,  Align:"Left",    ColMerge:0,   SaveName:"lloyd_no",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                 {Type:"Text",      Hidden:1,  Width:0,  Align:"Left",    ColMerge:0,   SaveName:"intg_bkg_seq",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                 {Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"ibflag_mbl" } ];
           
				InitColumns(cols);
				//SetSheetWidth(800);
				SetSheetHeight(450);
				SetEditable(1);
				sheetObj.SetFocusAfterProcess(0);
    		}

    	    break;     
    	case 3:      //IBSheet1 init
    	    with(sheetObj){          
          SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0 } );

          var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
          var headers = [ { Text:getLabel('SEC_BMD_0020_HDR_4'), Align:"Center"} ];
          InitHeaders(headers, info);

          var cols = [ 
                 {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"mbl_no",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
                 {Type:"Text",      Hidden:0, Width:100,   Align:"Left",  ColMerge:0,   SaveName:"lnr_bkg_no",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                 {Type:"Text",      Hidden:0,  Width:80,  Align:"Center",    ColMerge:1,   SaveName:"event_status",        KeyField:0,   CalcLogic:"",   Format:"",  PointCount:0,   UpdateEdit:0,   InsertEdit:1 },                 
                 {Type:"Date",      Hidden:0,  Width:120,   Align:"Center",  ColMerge:0,   SaveName:"event_date",    KeyField:0,   CalcLogic:"",   Format:"YmdHm",     PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                 {Type:"Text",      Hidden:0,  Width:120,   Align:"Left",    ColMerge:0,   SaveName:"event_loc_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                 {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"cntr_no",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                 {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"cntr_tp",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                 {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"voyage_no",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                 {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"vsl_nm",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                 {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"por_loc_nm",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                 {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"pol_loc_nm",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                 {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"pod_loc_nm",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                 {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"del_loc_nm",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
                 {Type:"Date",      Hidden:0,  Width:100,   Align:"Center",  ColMerge:0,   SaveName:"rgst_tms",    KeyField:0,   CalcLogic:"",   Format:"YmdHm",     PointCount:0,   UpdateEdit:0,   InsertEdit:1 } , 
                 {Type:"Text",      Hidden:0,  Width:80,  Align:"Center",    ColMerge:0,   SaveName:"src",        KeyField:0,   CalcLogic:"",   Format:"",  PointCount:0,   UpdateEdit:0,   InsertEdit:1 }
                 //{Type:"Status",    Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"ibflag_mbl" } 
                 ];
           
				InitColumns(cols);
				SetSheetWidth(1450);
				//SetSheetHeight(200);
				SetEditable(1);
				sheetObj.SetFocusAfterProcess(0);
    		}

    	    break;       	    
    }
}

/**
 * IBSheet 이벤트 처리후 이벤트를 받아서 처리하기 위한 메소드임
 */
var rtnary=new Array(1);
var cur_row;
function sheet1_OnPopupClick(sheetObj, row, col) {
	cur_row = row;
	var formObj=document.form;	
	var colStr=sheetObj.ColSaveName(col);
	if(colStr=='event_loc_cd'){
		rtnary=new Array(3);
		rtnary[0]="";
		//Service Lane Flg 추가
		rtnary[1]="";
   		if(typeof(sheetObj)!='undefined'){
   			rtnary[2]=sheetObj.GetCellValue(row, 'event_loc_nm');
   		}else{
   			rtnary[2]="";
   		}
   		callBackFunc = "sheet1_OnPopupClick_callBack";
	   	modal_center_open('./CMM_POP_0030.clt', rtnary, 806,415,"yes");
	   	
	} 
	
}


function sheet1_OnPopupClick_callBack(rtnVal){
		if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		docObjects[0].SetCellValue(cur_row, 'event_loc_cd',rtnValAry[0]);
		docObjects[0].SetCellValue(cur_row, 'event_loc_nm',rtnValAry[2]);
	} 
}

function sheet1_OnKeyDown(sheetObj, row, col, keyCode){
	cur_row = row;
	if(keyCode==13){
		if(sheetObj.ColSaveName(col)=="event_loc_nm"){
			sheetObj.SelectCell(row, col);
//			mutiSheetOnPopupClick(sheetObj, row, col, '', 'S', 'O', 'H');
	   		rtnary=new Array(3);
	   		rtnary[0]="";
	   		rtnary[1]="";
	   		rtnary[2]=sheetObj.GetCellValue(row, col);
	   		
//   			callBackFunc = "SHEET_TRDP_POPUP";
   			callBackFunc = "sheet1_OnPopupClick_callBack";
//	   		modal_center_open('./CMM_POP_0030.clt', rtnary, 1150,650,"yes");
   			modal_center_open('./CMM_POP_0030.clt', rtnary, 806,415,"yes");
		}
	}
}



function sheet1_OnSaveEnd(sheetObj, errMsg){
	//Ajax로  Role 코드정보를 조회하여 Opener에 표시함
	//ajaxSendPost(callback, param, data, url)
	//ajaxSendPost(dispAjaxReq, 'reqVal', '&goWhere=aj&bcKey=rolecd', './GateServlet.gsl');
	if(errMsg=="" ||errMsg==undefined|| errMsg==null ){
		showCompleteProcess();
	}
}

var callRow=0;
var callNm='';
function sheet1_OnChange(sheetObj, row, col){
	colNm=sheetObj.ColSaveName(col);
//	if(colNm=='curChk'){
//		var eventDt=sheetObj.GetCellValue(row, "event_date");
//		var eventLocCd=sheetObj.GetCellValue(row, "event_loc_cd");
//		var eventLocNm=sheetObj.GetCellValue(row, "event_loc_nm");
//		
//		var curChk=sheetObj.GetCellValue(row, "curChk");
//		if( eventDt =='' || eventLocCd =='' || eventLocNm =='') {
//			alert(getLabel('FMS_COM_ALT119'));	
//			sheetObj.SetCellValue(row, 'curChk', 0, 0);
//			//MSG_KEY['FMS_COM_ALT102'] = 'Please enter Event Date, Event Code, Event Name!';
//		}
//	}
	
    if(colNm=='event_loc_cd'){
    	if(sheetObj.GetCellValue(row, colNm)!=''){
        	callRow=row;
            callNm='event_loc_cd';
            ajaxSendPost(locCdReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType=location&s_code='+sheetObj.GetCellValue(row, colNm), './GateServlet.gsl');
//            ajaxSendPost(locCdReq, 'reqVal', '&goWhere=aj&bcKey=searchLocationCode&s_loc_cd='+sheetObj.GetCellValue(row, colNm), './GateServlet.gsl');
    	}else{
    		sheetObj.SetCellValue(row, 'event_loc_nm','',0);
    	}
    }
}

function locCdReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.form;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var rtnArr=doc[1].split('@@;');
			var masterVals=rtnArr[0].split('@@^');
            docObjects[0].SetCellValue(callRow, 'event_loc_nm',masterVals[3],0);
		}else{
			//alert(getLabel('FMS_COM_ALT007'));
			docObjects[0].SetCellValue(callRow, callNm,'',0);
			docObjects[0].SetCellValue(callRow, 'event_loc_nm','',0);
		}
	}else{
		//REFINE THIS MESSAGE (2012.11.26)
		//alert(getLabel('FMS_COM_ALT007'));
		docObjects[0].SetCellValue(callRow, callNm,'',0);
		docObjects[0].SetCellValue(callRow, 'event_loc_nm','',0);
	}
}

 
var selectedRow = 0;
var selectCol = "";

function sheet1_OnClick(sheetObj, row, col){
 
	selectedRow = row;
	selectCol = col;
}

function sheet2_OnDblClick(sheetObj, row, col){
	 
	var formObj  = document.form;

	
	var bl_no = sheetObj.GetCellValue(row, "bl_no");
	var cntr_no = sheetObj.GetCellValue(row, "cntr_no");
	
    // #3764 [BINEX] CONTAINER MOVEMENT EVENT UPDATE TO SHOW 315 HISTORY
	var lnr_bkg_no = sheetObj.GetCellValue(row, "lnr_bkg_no");
		
	// hid form에 값을 가지고 있는다.
	formObj.f_h_mbl_no.value = bl_no;	
	formObj.f_h_cntr_no.value = cntr_no;	
	
    // #3764 [BINEX] CONTAINER MOVEMENT EVENT UPDATE TO SHOW 315 HISTORY
	formObj.f_h_lnr_bkg_no.value = lnr_bkg_no;
	
	doWork('SEARCHLIST02');

}

//function sheet1_OnSaveEnd(sheetObj, row, col) {
//	sheetObj.SetSelectRow(selectedRow);
// 
//}


/**
 * Save Validation
 * @return
 */
function addValid(){
    var sheetObj=docObjects[0];
    var sheetObj2=docObjects[1];
    var formObj=document.form;
    var rowCnt=0;
    rowCnt = sheetObj.CheckedRows("curChk");
    
    if(rowCnt < 1){
    	// 이벤트 체크 하라 MSG_KEY['SUP_COM_ALT011'] = 'Please check Movement Event and Mbl list.';
    	alert(getLabel('SUP_COM_ALT011'));
    	return false;
    }
    
    
    var sRow = sheetObj.FindCheckedRow("curChk");
    //받은 결과를 배열로 생성한다.
	var arrRow = sRow.split("|");
	for(idx=0; idx<arrRow.length; idx++){
		var eventDt=sheetObj.GetCellValue(arrRow[idx], "event_date");
		var eventTm=sheetObj.GetCellValue(arrRow[idx], "event_time");
		var eventLocCd=sheetObj.GetCellValue(arrRow[idx] , "event_loc_cd");
		var eventLocNm=sheetObj.GetCellValue(arrRow[idx] , "event_loc_nm");
		
//		var curChk=sheetObj.GetCellValue(row, "curChk");
		if( eventDt =='' || eventTm =='' || eventLocCd =='' || eventLocNm =='') {
			alert(getLabel('FMS_COM_ALT119'));	
			//sheetObj.SetCellValue(arrRow[idx], 'curChk', 0, 0);
			if(eventDt =='') {
				sheetObj.SelectCell(arrRow[idx], 'event_date');
			} else if(eventTm =='') {
				sheetObj.SelectCell(arrRow[idx], 'event_time');
			} else if(eventLocCd =='') {
				sheetObj.SelectCell(arrRow[idx], 'event_loc_cd');
			} else if(eventLocCd =='') {
				sheetObj.SelectCell(arrRow[idx], 'event_loc_nm');
			}
			//MSG_KEY['FMS_COM_ALT102'] = 'Please enter Event Date, Event Code, Event Name!';
			
			return false;
		}
    }
	  
//    for(var i=1;i<=sheetObj.RowCount();i++){
//    	if(sheetObj.GetRowStatus(i) !="R"){
//    		rowCnt++;
//    	}
//    	if(sheetObj.GetCellValue(i,"role_cd")==""){
//    		alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('ITM_ROLECD'));
//    		sheetObj.SelectCell(i,"role_cd");
//    		return false;
//    	}
//    	if(sheetObj.GetCellValue(i,"role_nm")==""){
//    		alert(getLabel('FMS_COM_ALT007') + "\n - " + getLabel('ITM_ROLENM'));
//    		sheetObj.SelectCell(i,"role_nm");
//    		return false;
//    	}
//    }    
    
    
    
    rowCnt = sheetObj2.CheckedRows("chk");
    
    if(rowCnt < 1){
    	// mbl 체크 하라 
    	alert(getLabel('SUP_COM_ALT011'));
    	return false;
    }
    
    if(sheetObj.RowCount()<1){
    	//Please Retrieve first!;
    	alert(getLabel('FMS_COM_ALT029'));
    	return false;
    }
    for(var i=1;i<=sheetObj.RowCount();i++){
    	if(sheetObj.GetRowStatus(i) !="R"){
    		rowCnt++;
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
//function sheet1_OnKeyDown(sheetObj, row, col, keyCode){
//	if(sheetObj.LastRow() == row && keyCode==9 && sheetObj.ColSaveName(col)=="use_flg"){
//		doWork('ROWADD');
//		sheetObj.SelectCell(row+1, 1);
//	}
//}

//function roleCopyPopup(){
//	var sheet=docObjects[0];
//	var formObj=document.form;
//	rtnary = new Array();
//	callBackFunc = "sheet1_OnPopupClick_attr_extension";
//	modal_center_open('./RoleCopyPop.clt', rtnary, 750,150,"yes");
//}

//function sheet1_OnPopupClick_attr_extension(rtnVal){
//	var formObj  = document.form;
//	if (rtnVal == "undefined" || rtnVal == undefined) {
//		return;
//	}else{
//		docObjects[0].SetCellValue(cur_row, "attr_extension",rtnVal, 0);
//	}
//}


/**
 * code name select
 */
function codeNameAction(str, obj, tmp){
	var formObj=document.form;
	var sub_str=str.substring(0,8);
	var sub_str2=str.substring(9);
	CODETYPE=str;
	 
	if(obj.value != ""){
//		if(tmp=="onKeyDown"){
//			if(event.keyCode==13){
//				var s_code=obj.value.toUpperCase();		
//				
//				if(sub_str=="Location"){
//					
//					str=sub_str;					
//					ajaxSendPost(dispCodeNameAjaxReq, "reqVal", "&goWhere=aj&bcKey=searchCodeName&codeType="+str+"&s_code="+s_code+'&air_sea_clss_cd='+"S", "./GateServlet.gsl");
//				}
//				
//			}
//		}else if(tmp=="onBlur"){
//			var s_code=obj.value.toUpperCase();			
//			if(sub_str=="Location"){
//				str=sub_str;
//				ajaxSendPost(dispCodeNameAjaxReq, "reqVal", "&goWhere=aj&bcKey=searchCodeName&codeType="+str+"&s_code="+s_code+'&air_sea_clss_cd='+"S", "./GateServlet.gsl");
//			}
//			
//			
//		}
	}else{
		if(obj.name == "s_liner_code"){
			formObj.s_liner_name.value="";
			formObj.s_liner_abbr.value="";
		}else if(obj.name == "s_port_code"){
			formObj.s_port_name.value="";
		}else if(obj.name == "f_pol_cd"){
			formObj.f_pol_cd.value="";
			formObj.f_pol_nm.value="";
		}else if(obj.name == "i_pol_cd"){
			formObj.i_pol_cd.value="";
			formObj.i_pol_nm.value="";
		}else if(obj.name == "i_pod_cd"){
			formObj.i_pod_cd.value="";
			formObj.i_pod_nm.value="";
		}
		
	}
}


function vslPopup(vslNm){
	if(vslNm == null){
		vslNm = ""
	}
	rtnary=new Array(1);
	rtnary[0]="1";
	rtnary[1]=vslNm;
    callBackFunc = "VSL_POP";
    modal_center_open('./CMM_POP_0140.clt', rtnary, 656,480,"yes");
	
}
function VSL_POP(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		form.f_trnk_vsl_cd.value=rtnValAry[0];
		form.f_trnk_vsl_nm.value=rtnValAry[1];
	}
}


function POL_LOCATION_POPLIST(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var formObj  = document.form;
		var rtnValAry=rtnVal.split("|");
		formObj.f_pol_cd.value=rtnValAry[0];//loc_cd 
		formObj.f_pol_nm.value=rtnValAry[2];//loc_nm
	} 
}
/**
 * code name select
 */
var CODETYPE='';
function codeNameAction2(str, obj, tmp){
	// obj가 form or sheet에서 온걸 구분해서 value결정.
	if(obj == '[object]' || obj =='[object HTMLInputElement]'){
		var s_code=obj.value.toUpperCase();
	}else{
		var s_code=obj;
	}		
	var s_type="";
//	if ( s_code != "" ) {
		if ( tmp == "onKeyDown" ) {
			if (event.keyCode == 13){
				CODETYPE=str;		
				var sub_str=str.substring(0,8);
				if(sub_str=="location"){
					s_type=sub_str;
				}else if(sub_str=="trdpCode"){
					s_type=sub_str;
				}else{
					s_type=str;
				}
				ajaxSendPost(dispCodeNameAjaxReq2, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
			}
		} else if ( tmp == "onBlur" ) {
//			if ( s_code != "" ) {
				CODETYPE=str;		
				var sub_str=str.substring(0,8);
				if(sub_str=="location"){
					s_type=sub_str;
				}else if(sub_str=="trdpCode"){
					s_type=sub_str;
				}else{
					s_type=str;
				}
				ajaxSendPost(dispCodeNameAjaxReq2, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
//			}
		}else if ( tmp == "onChange" ) {
//			if ( s_code != "" ) {
				CODETYPE=str;
				var sub_str=str.substring(0,str.indexOf("_s"));
				s_type=sub_str;
				ajaxSendPost(dispCodeNameAjaxReq2, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
//			}
		}
//	}
}

//코드표시 Ajax
function dispCodeNameAjaxReq2(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	var formObj=document.form;
	var sheetObj=docObjects[0];
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@@;');
			var masterVals=rtnArr[0].split('@@^');	
			if(CODETYPE == "location_pol"){
				formObj.f_pol_cd.value=masterVals[0];
				formObj.f_pol_nm.value=masterVals[3];
			}else if(CODETYPE == "location_pod"){
				formObj.f_pod_cd.value=masterVals.length > 0 ? masterVals[0] : "";
				formObj.f_pod_nm.value=masterVals.length > 3 ? masterVals[3] : "";
			}else if(CODETYPE == "location_del"){
				formObj.f_del_cd.value=masterVals[0];
				formObj.f_del_nm.value=masterVals[3];
			}else if(CODETYPE == "trdpCode"){
				formObj.s_trdp_cd.value=masterVals[0]; 
				formObj.s_trdp_full_nm.value=masterVals[3];//loc_nm
			}
		}else{
			if(CODETYPE == "location_pol"){
				formObj.f_pol_cd.value="";
				formObj.f_pol_nm.value="";
			}else if(CODETYPE == "location_pod"){
				formObj.f_pod_cd.value="";
				formObj.f_pod_nm.value="";
			}else if(CODETYPE == "location_del"){
				formObj.f_del_cd.value="";
				formObj.f_del_nm.value="";
			}else if(CODETYPE == "trdpCode"){
				formObj.s_trdp_cd.value=""; 
				formObj.s_trdp_full_nm.value="";
			}
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}

//Folding 기능 추가
function btn_Folding(val){
	if(val == "MINUS"){ //show효과(master sheet보이게끔)
		$("#sheet315_history").height("200px") ;
		docObjects[2].SetSheetHeight(200);
	}else if(val == "PLUS"){  //hide효과(master sheet 안보이게끔)	
		$("#sheet315_history").height("500px") ;
		docObjects[2].SetSheetHeight(500);
	}
} 

//
//function cmmOpenPopUp(popName, curObj,valObj){
//	cur_curObj = curObj;	
//		
//	
//	var formObj=document.form;
//	try {
//		switch(popName) {
//			
//           case "LOCATION_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
//           		rtnary=new Array(3);
//		   		rtnary[0]="S";
//		   		rtnary[1]="BL";
//		   		// 2011.12.27 value parameter
//		   		
//		   		if(typeof(valObj)!='undefined'){
//		   			rtnary[2]=valObj;
//		   		}else{
//		   			rtnary[2]="";
//		   			
//		   		}
//		   		rtnary[3]="";		   		
//		   		rtnary[4]=curObj;
//		   		callBackFunc = "LOCATION_POPLIST";
//				modal_center_open('./CMM_POP_0030.clt', rtnary, 806,440,"yes");
//    	        
//           break;
//	      
//           case "VESSEL_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
//           		rtnary=new Array(2);
//		   		rtnary[0]="1";
//		   		// 2011.12.27 value parameter
//		   		if(typeof(valObj)!='undefined'){
//		   			rtnary[1]=valObj;
//		   		}else{
//		   			rtnary[1]="";
//		   		}
//		   		callBackFunc = "VESSEL_POPLIST";
//				modal_center_open('./CMM_POP_0140.clt', rtnary, 656,470,"yes");
//				
//           break;
//          
//      } // end switch
//	}catch(e) {
//        if(e == "[object Error]"){
//        	//Unexpected Error occurred. Please contact Help Desk!
//        	alert(getLabel('FMS_COM_ERR002'));
//        } 
//        else{
//        	//System Error! + MSG
//        	alert(getLabel('FMS_COM_ERR001') + " - " + e );
//        }
//	}
//}
//
//
//function VESSEL_POPLIST(rtnVal){
//	var formObj=document.form;
//	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
//	 	return;
//	}else{
//		var rtnValAry=rtnVal.split("|");
//		if(cur_curObj.id == "f_vsl"){
//			formObj.f_vsl_cd.value=rtnValAry[0];
//			formObj.f_vsl_nm.value=rtnValAry[1];
//		}else if(cur_curObj.id == "vsl"){
//			formObj.i_vsl_cd.value=rtnValAry[0];
//			formObj.i_vsl_nm.value=rtnValAry[1];
//		}
//	}
//}