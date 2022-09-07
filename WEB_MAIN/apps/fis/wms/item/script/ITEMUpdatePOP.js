var docObjects=new Array();
var sheetCnt=0;

var successFlg = 'N';
var existsCtrtItemNoYn = 'N';

function setDocumentObject(sheet_obj){
	docObjects[sheetCnt++]=sheet_obj;
}

function loadPage(){
	for(var i=0;i<docObjects.length;i++){
		comConfigSheet(docObjects[i]);
		initSheet(docObjects[i],i+1);
		comEndConfigSheet(docObjects[i]);
	}
	doWork('SEARCHLIST');
}

function doWork(srcName){
    var formObj=document.form;
	var sheetObj=docObjects[0]; // sheet1

    switch(srcName){
    	case "SEARCHLIST":    
            formObj.f_cmd.value=SEARCHLIST;
           	sheetObj.DoSearch("./ITEMUpdatePOPGS.clt", FormQueryString(formObj) );
           	break;
    	case "SAVE":
    		callItemAttrCngProc_func();
    		//Replace AS IS Code with TO BE Code
        	if( successFlg == 'Y' ){
        		if ( $("#f_item_cng_flg option:selected").val() == 'IC' ){
        			formObj.f_item_cd_asis.value = formObj.f_item_cd_tobe.value;
        			formObj.f_item_cd_tobe.value = "";
        		}else if( $("#f_item_cng_flg option:selected").val() == 'IN' ){
        			formObj.f_item_nm_asis.value = formObj.f_item_nm_tobe.value;
        			formObj.f_item_nm_tobe.value = "";
        		}else if( $("#f_item_cng_flg option:selected").val() == 'CN' ){
        			formObj.f_item_cd_asis.value = formObj.f_item_cd_tobe.value;
        			formObj.f_item_nm_asis.value = formObj.f_item_nm_tobe.value;
        			formObj.f_item_cd_tobe.value = "";
        			formObj.f_item_nm_tobe.value = "";
        		}
        	}
    		
            break;
        case "CLOSE":
        	//Reload Parent Screen when Changing Item has succeed.
        	if( successFlg == 'Y' ){
        		window.parent.reloadModiItem(formObj.f_item_cd_asis.value);
        	}
        	
            ComClosePopup();
            break;
    }
}

function initSheet(sheetObj,sheetNo) {
	switch(sheetNo) {
		case 1:      //IBSheet1 init
			with(sheetObj){
				SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0 } );
	
				var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
				var headers = [ { Text:getLabel('ITMgmtPop_Sheet1_HDR1'), Align:"Center"} ];		   
				InitHeaders(headers, info);
	
				var cols = [
				            {Type:"Text", Hidden:0,  Width:75,  Align:"Center", ColMerge:0, SaveName:"item_cng_flg", KeyField:0, CalcLogic:"", Format:"", PointCount:0, UpdateEdit:0,   InsertEdit:0 },
				            {Type:"Text", Hidden:0,  Width:150,  Align:"Center", ColMerge:0, SaveName:"item_sys_no", KeyField:0, CalcLogic:"", Format:"", PointCount:0, UpdateEdit:0,   InsertEdit:0 },
				            {Type:"Text", Hidden:0,  Width:100,  Align:"Center", ColMerge:0, SaveName:"ctrt_no", KeyField:0, CalcLogic:"", Format:"", PointCount:0, UpdateEdit:0,   InsertEdit:0 },
				            {Type:"Text", Hidden:0,  Width:100,  Align:"Left", ColMerge:0, SaveName:"item_cd_asis", KeyField:0, CalcLogic:"", Format:"", PointCount:0, UpdateEdit:0,   InsertEdit:0 },
				            {Type:"Text", Hidden:0,  Width:100,  Align:"Left", ColMerge:0, SaveName:"item_nm_asis", KeyField:0, CalcLogic:"", Format:"", PointCount:0, UpdateEdit:0,   InsertEdit:0 },
				            {Type:"Text", Hidden:0,  Width:100,  Align:"Left", ColMerge:0, SaveName:"item_cd_tobe", KeyField:0, CalcLogic:"", Format:"", PointCount:0, UpdateEdit:0,   InsertEdit:0 },
				            {Type:"Text", Hidden:0,  Width:100,  Align:"Left", ColMerge:0, SaveName:"item_nm_tobe", KeyField:0, CalcLogic:"", Format:"", PointCount:0, UpdateEdit:0,   InsertEdit:0 },
				            {Type:"Text", Hidden:0,  Width:100,  Align:"Center", ColMerge:0, SaveName:"rgst_id", KeyField:0, CalcLogic:"", Format:"", PointCount:0, UpdateEdit:0,   InsertEdit:0 },
				            {Type:"Date", Hidden:0,  Width:100,  Align:"Center", ColMerge:0, SaveName:"rgst_sys_dt", KeyField:0, CalcLogic:"", Format:"Ymd", PointCount:0, UpdateEdit:0,   InsertEdit:0 }
				];
	
				InitColumns(cols);
				SetSheetHeight(250);
				resizeSheet();
			}
			break;
	}
}

function resizeSheet(){
	ComResizeSheet(docObjects[0]);
}

function resultCtrtInfo(reqVal){
    var formObj=document.form;
    var doc=getAjaxMsgXML(reqVal);
    formObj.ctrt_nm.value="";
    if(doc[0]=='OK'){
        if(typeof(doc[1])!='undefined'){
            var rtnArr=doc[1].split('^@');
            if(rtnArr[0] != ""){
                formObj.ctrt_nm.value=rtnArr[0];
            }
        }
    }
}

function callItemAttrCngProc_func(){
	var formObj=document.form;
    var sParam =		  '&user_id='+formObj.user_id.value;
    	sParam = sParam + '&ctrt_no='+formObj.f_ctrt_no.value;
	    sParam = sParam + '&item_sys_no='+formObj.f_item_sys_no.value;
	    sParam = sParam + '&item_cd_asis='+formObj.f_item_cd_asis.value;
	    sParam = sParam + '&item_nm_asis='+formObj.f_item_nm_asis.value;
	    sParam = sParam + '&item_cd_tobe='+formObj.f_item_cd_tobe.value;
	    sParam = sParam + '&item_nm_tobe='+formObj.f_item_nm_tobe.value;
	    sParam = sParam + '&item_cng_flg='+$("#f_item_cng_flg option:selected").val();
  		
  		//Can call Procedure when mandatory fields are filled.
	    if( validationCheck ( $("#f_item_cng_flg option:selected").val() ) ){
	    	ajaxSendPost(existsCtrtItemNoResult, 'reqVal', '&goWhere=aj&bcKey=existsCtrtItemNo' + sParam , './GateServlet.gsl');
	    	
	    	if(existsCtrtItemNoYn!="Y"){
	    		//Confirm Box
		    	if(ComShowCodeConfirm("COM0226")){
					doShowProcess(true);
						ajaxSendPost(ajaxSendPost_callback, 'reqVal', '&goWhere=aj&bcKey=callItemAttrCngProc' + sParam , './GateServlet.gsl');
					doHideProcess(false);
				}else{
		    		return;
		    	}	    		
	    	}else{
	    		return;
	    	}
	    }   
}

function ajaxSendPost_callback(reqVal){
	var formObj=document.form;
	var sheetObj=docObjects[0]; // sheet1

	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ){
		alert("Item data has been changed.")
		successFlg = 'Y';
			
		//Reload Sheet
        formObj.f_cmd.value=SEARCHLIST;
       	sheetObj.DoSearch("./ITEMUpdatePOPGS.clt", FormQueryString(formObj) );
       	
	}
}

function existsCtrtItemNoResult(reqVal){
	
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ){	
	       	
		if(doc[1] == "Y"){		
			alert("Same Item Code already exists.");
			existsCtrtItemNoYn = 'Y';
		}else{
			existsCtrtItemNoYn = 'N';
		}
	}
}

function changeItemCngFlg(){
	if(document.form.f_item_cng_flg.value == "CN"){
		document.getElementById("f_item_cd_tobe").readOnly = false;
		document.getElementById("f_item_nm_tobe").readOnly = false;
		
		document.getElementById("f_item_cd_tobe").required = true;
		document.getElementById("f_item_nm_tobe").required = true;
	}else if(document.form.f_item_cng_flg.value == "IC"){
		document.getElementById("f_item_cd_tobe").readOnly = false;
		document.getElementById("f_item_nm_tobe").readOnly = true;
		
		document.getElementById("f_item_cd_tobe").required = true;
		document.getElementById("f_item_nm_tobe").required = false;
		
		document.getElementById("f_item_nm_tobe").value = "";
	}else if(document.form.f_item_cng_flg.value == "IN"){
		document.getElementById("f_item_cd_tobe").readOnly = true;
		document.getElementById("f_item_nm_tobe").readOnly = false;

		document.getElementById("f_item_cd_tobe").required = false;
		document.getElementById("f_item_nm_tobe").required = true;
		
		document.getElementById("f_item_cd_tobe").value = "";
	}
}

function validationCheck( itemCngFlg ) {
	var formObj=document.form;

	if ( itemCngFlg == "CN"){
	    if(formObj.f_item_cd_tobe.value=="" || formObj.f_item_nm_tobe.value=="" ){		
			alert("New Item Code & Name is mandatory field.");
			return false;
		}	
	    return true; 
	}else if( itemCngFlg == "IC"){
	    if(formObj.f_item_cd_tobe.value=="" ){		
			alert("New Item Code is mandatory field.");
			return false;
		}
	    return true; 
	}else if( itemCngFlg == "IN"){
	    if(formObj.f_item_nm_tobe.value=="" ){		
			alert("New Item Name is mandatory field.");
			return false;
		}
	    return true; 
	}
}