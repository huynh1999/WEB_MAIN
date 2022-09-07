var sheetObjects = new Array();
var sheetCnt = 0;

function doWork(srcName, valObj){
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한다.
    var formObj  = document.frm1;

	try {
		switch(srcName) {
    	   	case "CUST_ITM_POP":
    	   	 rtnary=new Array(1);
	  		   var formObj=document.frm1;
	  		   
	  		   rtnary[0]="1";
	  		   rtnary[1]=formObj.cust_nm.value;
	  		   rtnary[2]=window;
	  		   
	  		   callBackFunc = "CUST_ITM_POP";
	  		   modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
    	   		
    	   	break;
    	   	case "SEARCH":
    	   		searchCustItem();
    	   		break;
    	   	case "CLOSE":
    	   		ComClosePopup();
    	   		break;
    	   	case "CLEAR":
    	   		formObj.cust_cd.disabled = 0;
    			formObj.cust_nm.disabled = 0;		
    			formObj.billto.disabled = 0;
    			formObj.cust_cd.value="";
				formObj.cust_nm.value="";	
				sheet1.RemoveAll();
    	   		break;
    	   	case "NEW":
//    	   		var paramStr="./WHM_WHM_0003.clt?f_cmd=-1";
    	   		var paramStr="./ITMgmt.clt";

				//OFVFOUR-7669 [PQC][OEM B/L Entry] The system show "System Error!" message when clicking New button
				var opener = parent.parent;
				if ( opener.opener == null ){
					opener.mkNewFrame('Item Entry (PO & W/H)',paramStr)
				} else {
					opener.openner.parent.mkNewFrame('Item Entry (PO & W/H)',paramStr)
				}
    	   		ComClosePopup();
    	   	   	//parent.mkNewFrame('Item Entry (PO & W/H)', paramStr);
    	   		break;
	   	} // end switch
	}catch(e) {
        if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	alert(getLabel('FMS_COM_ERR002'));
        } 
        else{
        	//System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001') + " - " + e);
        }
	}
}

function CUST_ITM_POP(rtnVal){
	var formObj = document.frm1;
	   if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		   return;
	   }else{
		   var rtnValAry=rtnVal.split("|");
		   formObj.cust_cd.value=rtnValAry[0];
		   formObj.cust_nm.value=rtnValAry[2];
		   searchCustItem();
	   }    
}

function sheet1_OnSearchEnd(){
	sheet1.HideProcessDlg();
}

function sheet1_OnDblClick(sheetObj,Row,Col){

	var formObj=document.frm1;
 
	var retArray="";		
	retArray += sheetObj.GetCellValue(Row, "cust_cd");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "cust_nm");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "cust_itm_id");
	retArray += "|";
	retArray += sheetObj.GetCellValue(Row, "item_sys_no");
	
	
	ComClosePopup(retArray);
}

function codeNameAction(str, obj, tmp){
	var formObj=document.frm1;
	var s_code=obj.value.toUpperCase();
	var s_type="";
	if(s_code != ""){
		CODETYPE=str;
		if(str == "commodity") {
			s_type="commodity";
		}else{
			s_type="trdpCode";
		}
		if(tmp == "onKeyDown"){
			
			if(event.keyCode == 13){
				ajaxSendPost(trdpCdReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
			}
		}
		else if(tmp == "onBlur"){
			if(s_code != ""){
				ajaxSendPost(trdpCdReq,  'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
			}
		}
	}
	else{
		if(str == "CUSTUMER"){
			formObj.cust_cd.value="";//cust_cd  AS param1
			formObj.cust_nm.value="";//cust_nm   AS param2
		}
		if (CODETYPE == "commodity") {
			formObj.itm_hts_cd.value="";// itm_hts_cd AS param1
			formObj.itm_hts_nm.value="";// itm_hts_nm AS param2
		}
	}
}

function trdpCdReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@@;');
			var masterVals=rtnArr[0].split('@@^');
			if(CODETYPE =="CUSTUMER"){
				formObj.cust_cd.value=masterVals[0];	//cust_cd  AS param1
				formObj.cust_nm.value=masterVals[3];	//cust_nm   AS param2
			}
			if(CODETYPE=="commodity"){
				formObj.itm_hts_cd.value=masterVals[0];		//f_cmdt_cd  AS param1
				formObj.itm_hts_nm.value=masterVals[3];		//f_cmdt_nm   AS param2
			}
		}
		else{
			if(CODETYPE =="CUSTUMER"){
				formObj.cust_cd.value="";				//cust_cd  AS param1
				formObj.cust_nm.value="";				//cust_nm   AS param2
			}
			if(CODETYPE=="commodity"){
				formObj.itm_hts_cd.value="";				//itm_hts_cd  AS param1
				formObj.itm_hts_nm.value="";				//itm_hts_nm   AS param2
			}
		}
	}
	else{
		//alert(getLabel('SEE_BMD_MSG43'));
	}
}

function GetRegisterOfficeCd(){
	var formObj=document.frm1;
	ajaxSendPost(GetRegisterOfficeCode, 'reqVal', '&goWhere=aj&bcKey=GetRegisterOfficeCode&cust_cd='+formObj.cust_cd.value, './GateServlet.gsl');
}

function loadPage() {
	
	for (var i = 0; i < sheetObjects.length; i++) {
		//khlee-시작 환경 설정 함수 이름 변경
		comConfigSheet(sheetObjects[i]);
		initSheet(sheetObjects[i], i + 1);
		// khlee-마지막 환경 설정 함수 추가
		comEndConfigSheet(sheetObjects[i]);
	}
	
	var arg=parent.rtnary;
	var formObj=document.frm1;
	if(arg!=undefined){
		formObj.cust_cd.value=(arg[1] == undefined || arg[1] == 'undefined') ? '' : arg[1];
		formObj.cust_nm.value=(arg[2] == undefined || arg[2] == 'undefined') ? '' : arg[2];
	}
	
	if(formObj.cust_cd.value != ""){
		formObj.cust_cd.disabled = true;
		formObj.cust_nm.disabled = true;		
		formObj.billto.disabled = true;
		searchCustItem();
	}
}

function searchCustItem(){
	var formObj=document.frm1;
	sheet1.ShowProcessDlg();
	var params = "?f_cmd="+SEARCH + "&cust_cd="+formObj.cust_cd.value;
	var xml = sheet1.GetSearchData("./WHM_ITL_0001GS.clt"+params);
	sheet1.LoadSearchData(xml);
}

function initSheet(sheetObj,sheetNo,flag) {
    switch(sheetObj.id) {
        case "sheet1":
            with (sheetObj) {
                var HeadTitle = "Item Code|Item Name|Contract No.";
                SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:0 , ColResize:1} );

                var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
                var headers = [ { Text:HeadTitle, Align:"Center"} ];
                InitHeaders(headers, info);

                var cols = [
                            {Type:"Text",      Hidden:0,  Width:180,  Align:"Left",    ColMerge:0,   SaveName:"cust_itm_id",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0, EditLen:400},
                       		//{Type:"Text",      Hidden:1,  Width:180,  Align:"Left",    ColMerge:0,   SaveName:"cust_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0, EditLen:400},
                       		{Type:"Text",      Hidden:0,  Width:180,  Align:"Left",    ColMerge:0,   SaveName:"cust_nm",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 , EditLen:400},
                       		{Type:"Text",      Hidden:0,  Width:180,  Align:"Left",    ColMerge:0,   SaveName:"ctrt_no",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 , EditLen:400},
                       		{Type:"Text",      Hidden:1,  Width:180,  Align:"Left",    ColMerge:0,   SaveName:"item_sys_no",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 , EditLen:400}
                       		
                       		];
                 
                InitColumns(cols);
                SetEditable(1);
               //SetSheetHeight(200); 
	           //SetCountFormat("BOTTOMDATA / TOTALROWS");
	           //SetSheetWidth(1050);
               //resizeSheet();
        	}
            break;
    }
}

function setDocumentObject(sheet_obj){
	sheetObjects[sheetCnt++]=sheet_obj;
}

