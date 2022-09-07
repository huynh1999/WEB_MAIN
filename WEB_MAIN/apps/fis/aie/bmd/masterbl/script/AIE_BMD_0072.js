//=========================================================
//*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
//*@FileName   : 
//*@FileTitle  :  
//*@author     : Tuan.Chau
//*@version    : 2.0
//*@since      : 2014/07/28
//=========================================================
function doWork(srcName){
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var formObj=document.form;
	try {
        switch(srcName) {
    	   case "CLOSE":
    		   ComClosePopup();
       	   break;
    	   case "PRINT":
    		   var retArray="";	
    		   formObj.file_name.value="pre_pouch.mrd";
	   			formObj.title.value="PRE-POUCH";
	   			// Parameter Setting
	   			var param='';
	   			param += '[' + formObj.intg_bl_seq.value + ']'; // $1
	   			if(formObj.ofc_for[0].checked){
	   				param += '[TYO]'; // $2
	   			}else if(formObj.ofc_for[1].checked){
	   				param += '[OSA]'; // $2
	   			}else{
	   				param += '[]'; // $2
	   			}
	   			param += '/reditmode /rfixallobject';
	   			formObj.rd_param.value=param;
	   			popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
    	   break;
        } // end switch
	}catch(e) {
        if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	alert(getLabel('FMS_COM_ERR002') + "\n\n: AIE_BMD_0072.001");
        } 
        else{
        	//System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001') + " - " + e + "\n\n: AIE_BMD_0072.002");
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
	var arg=parent.rtnary;
	//alert("arg===>["+arg[0]+"]");
	var formObj=document.form;
	formObj.intg_bl_seq.value=arg;
	if(ofc_cd == 'TYO'){
		formObj.ofc_for[0].checked=true; 
	}else if(ofc_cd == 'OSA'){
		formObj.ofc_for[1].checked=true;
	}else{
		formObj.ofc_for[0].checked=true;
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