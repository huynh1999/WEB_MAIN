/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : CMM_POP_0330.js
*@FileTitle  : ?
*@author     : CLT
*@version    : 1.0
*@since      : 
=========================================================*/
var titleScreen = false;
var frItem      = [];
var groupNoArr = new Array();
var docObjects=new Array();
var sheetCnt=0;

/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
function loadPage() {	
	
	for(var i=0;i<docObjects.length;i++){
        initSheet(docObjects[i],i+1);
    }
	
	
	var formObj=document.frm1;	
	var arg=parent.rtnary;	
	if(arg[0] == "CMM_POP_0900"){
	}
	
	var type        = arg[0];
	frItem          = arg[1];
	groupNoArr      = arg[2];
	
	formObj.f_type.value           = type;
	formObj.f_bl_no.value          = frItem[0].cmb_inv_no;
	formObj.f_intg_bl_seq.value    = frItem[0].intg_bl_seq;
	formObj.fr_trdp_cd.value       = frItem[0].fr_trdp_cd;
	formObj.fr_frt_seq.value       = frItem[0].fr_frt_seq;
	
	if(frItem[0].fr_cmb_inv_seq != null && frItem[0].fr_cmb_inv_seq != ''){
		printCmb();
		return;
	}
	
	
	//Group# 가 해당 Freight List 에 한개라도 있는 경우만 보여줌, Group# 가 없는 Row 가 존재하는 경우
	for(var i=0; i < groupNoArr.length; i++){
		if(groupNoArr[i] != "" && groupNoArr[i] != null && groupNoArr[i] != "null" ){
			titleScreen = true;
		}
	}
	
	// 
	var pop_width = $(this).width();
	var txt_AR = "<p>Do you want to create a new Debit Note# for the added account receivable?</p>";
	var txt_AP = "<p>Do you want to create a new AP# for the added account payable?</p>"; 
	
	// Group# 가 해당 List 에 없는 경우만 출력
	if(titleScreen){
		if(type == "AR")
			$(".warning_msg").append(txt_AR);
		if(type == "AP")
			$(".warning_msg").append(txt_AP);
		
		document.getElementById("chk_table").style.display="Inline";
	}
	
	if(type == "AR"){
		document.getElementById("ar_rmk").style.display="Inline";
		document.getElementById("ap_rmk").style.display="none";
	}
	if(type == "AP"){
		document.getElementById("ar_rmk").style.display="none";
		document.getElementById("ap_rmk").style.display="Inline";		
	}
	
	formObj.f_rmk.focus();
	
}



function doWork(srcName, curObj, valObj){
	
	switch(srcName) {
		case "CLOSE":
			var retArray=false;
			ComClosePopup(retArray); 
		break;	       
		case "NO":
			var retArray=false;
			ComClosePopup(retArray); 
			break;	       
		case "PRINT":
			
			frm1.f_cmd.value=COMMAND01;
			
			if(frm1.f_vchr_no.value == "AUTO"){
				frm1.f_vchr_no.value = "";
			}
			
			//docObjects[0].DataInsert();
			docObjects[0].DataInsert(-1);
			docObjects[0].DoAllSave("./CMM_POP_0900GS.clt", FormQueryString(frm1), true);
		break;	       
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
        	case 1:      //empty IBSheet init
        		with(sheetObj){
        		
        		SetConfig( { SearchMode:2, MergeSheet:5, Page:100, FrozenCol:0, DataRowMerge:1 } );
        		
        		var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
        		var headers = [ { Text:"||", Align:"Center"} ];
        		InitHeaders(headers, info);
        		
        		var cols = [ {Type:"Text",      Hidden:0,  Width:100,   Align:"Center",  ColMerge:0,   SaveName:"fr_frt_seq" },
        		             {Type:"Text",      Hidden:0,  Width:100,   Align:"Center",  ColMerge:0,   SaveName:"fr_inv_seq" },
        		             {Type:"Text",      Hidden:0,  Width:100,   Align:"Center",  ColMerge:0,   SaveName:"fr_cmb_inv_no" },
        		             {Type:"Text",      Hidden:0,  Width:100,   Align:"Center",  ColMerge:0,   SaveName:"fr_cmb_inv_seq" },
        		             {Type:"Text",      Hidden:0,  Width:100,   Align:"Center",  ColMerge:0,   SaveName:"intg_bl_seq" },
        		             {Type:"Text",      Hidden:0,  Width:100,   Align:"Center",  ColMerge:0,   SaveName:"cmb_inv_no" },
        		             {Type:"Text",      Hidden:0,  Width:100,   Align:"Center",  ColMerge:0,   SaveName:"trdp_cd" },
        		             {Type:"Status",    Hidden:0,  Width:30,    Align:"Center",  ColMerge:0,   SaveName:"ibflag" }
        		             ];
        		
        		InitColumns(cols);
        		
        		SetEditable(1);
        		SetVisible(0);    
        	}                    
                     
		  break;
    }
}

function sheet1_OnSaveEnd(sheetObj, errMsg){

	printCmb();
	
}

function printCmb(){
	var formObj=document.frm1;	
	var type = formObj.f_type.value;
	if( type =="AR"){
		
	    var param ="["+formObj.fr_frt_seq.value+"]";  	//1

	    formObj.file_name.value = 'cmb_invoice_01.mrd';
	    formObj.title.value = 'Debit Note';
	    formObj.rd_param.value=param;
	    popPOST(formObj, "RPT_RD_0030.clt", "popTest", 1025, 740);		
		
	}else if( type =="AP"){
 
		
	    var param ="["+formObj.fr_frt_seq.value+"]";  	//1

	    formObj.file_name.value = 'cmb_invoice_13.mrd';
	    formObj.title.value = 'Debit Note';
	    formObj.rd_param.value=param;
	    popPOST(formObj, "RPT_RD_0030.clt", "popTest", 1025, 740);				
	}	
	
	ComClosePopup(); 
}