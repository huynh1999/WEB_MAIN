//=========================================================
//*@FileName   : ACC_JOR_0620.jsp
//*@FileTitle  : Service Contract Report
//*@Description: Service Contract Report
//*@author     : cej - Cyberlogitec
//*@version    : 1.0 - 2016
//*@since      : 2016
//
//*@Change history:  
//*@author     : Tuan.Chau
//*@version    : 2.0 - 2016
//*@since      : 2016
//=========================================================
var rtnary=new Array(1);
var callBackFunc = "";
function doWork(srcName, valObj){
	// if(!btnVisible(srcName)){//버튼의 단축키 사용가능여부 체크
	// 	return;
	// }
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var formObj=document.frm1;
    switch(srcName) {
	   case "DEFAULT":
	   break;
       case "PRINT": 
    	   if(!chkSearchCmprPrd(true, formObj.f_start_date, formObj.f_end_date)){
   			return;
    	   }
    	   
    	   if (formObj.f_service_contract_no.value == ""){
    		   alert(getLabel('FMS_COM_ALT001') + "\n\n: Service Contract No");
    		   formObj.f_service_contract_no.focus();
    		   return;
    	   }
    	   
    	   //#417 [ZEN] AFTER V4.2 RELEASE // SERVICE CONTRACT REPORT
    	   /*if (formObj.f_mqc_teu.value == ""){
    		   alert(getLabel('FMS_COM_ALT001') + "\n\n: MQC(TEU)	");
    		   formObj.f_mqc_teu.focus();
    		   return;
    	   }
    	   
    	   if (formObj.lnr_trdp_cd.value == ""){
    		   alert(getLabel('FMS_COM_ALT001') + "\n\n: Carrier	");
    		   formObj.lnr_trdp_cd.focus();
    		   return;
    	   }    	  */ 
    	   
    	   var fr_dt=formObj.f_start_date.value.replaceAll("-", "");
    	   var to_dt=formObj.f_end_date.value.replaceAll("-", "");
    	   fr_dt=fr_dt.substring(4,8) + fr_dt.substring(0,2) + fr_dt.substring(2,4);
    	   to_dt=to_dt.substring(4,8) + to_dt.substring(0,2) + to_dt.substring(2,4);
		   formObj.file_name.value='service_contract_report.mrd';
		   formObj.title.value='Service Contract Report'; 
		   var param='[' + formObj.f_service_contract_no.value + ']';				//  [1]
		   param += '[' + formObj.f_mqc_teu.value + ']';				//  [2]
	       param += '[' + fr_dt + ']';									// [3]
		   param += '[' + to_dt + ']';									// [4]
		   param += '[' + ofc_eng_nm + ']';			// [5]
		   param += '[' + usrNm + ']';									// [6]
		   
		   
    	   var fr_dt=formObj.frm_dt.value.replaceAll("-", "");
    	   var to_dt=formObj.to_dt.value.replaceAll("-", "");
    	   fr_dt=fr_dt.substring(4,8) + fr_dt.substring(0,2) + fr_dt.substring(2,4);
    	   to_dt=to_dt.substring(4,8) + to_dt.substring(0,2) + to_dt.substring(2,4);
    	   
		   param += '[' + fr_dt + ']';									// [7]
		   param += '[' + to_dt + ']';									// [8]
		   param += '[' + formObj.lnr_trdp_nm.value + ']';									// [9]
		   
		   formObj.rd_param.value=param;
		   
		   //alert(param);
		   //alert(formObj.file_name.value);
    	   
		   popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
    	   
    	   
       break; 
       case "CARR_TRDP_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
  	 		rtnary=new Array(1);
  	 		rtnary[0]="1";
  	 		if(typeof(valObj)!='undefined'){
   	 			rtnary[1]=valObj;
   	 		}
   	 		else{
   	 			rtnary[1]="";
   	 		}
  	 		rtnary[2]=window;
  	 		callBackFunc = "CARR_TRDP_POPLIST";
  	 		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
  	 	break;
        
    }
}

 
//--------------------------------------------------------------------------------------------------------------
//                                             IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
var docObjects=new Array();
var sheetCnt=0;
var ctlKind="";
var ctlCol=0;
var ctlRow=0;
 
function loadPage() {
    var formObj=document.frm1;
     
}
function getPageURL() {
	return document.getElementById("pageurl").value;
} 
var firCalFlag=false;
function doDisplay(doWhat,formObj){
    switch(doWhat){
	    case 'DATE1':   //달력 조회 From ~ To 팝업 호출 
	        var cal=new ComCalendarFromTo();
	        cal.displayType="date";
	        cal.select(formObj.f_start_date, formObj.f_end_date, 'MM-dd-yyyy');
	    break;
	    case 'DATE2':   //달력 조회 From ~ To 팝업 호출 
	        var cal=new ComCalendarFromTo();
	        cal.displayType="date";
	        cal.select(formObj.frm_dt, formObj.to_dt, 'MM-dd-yyyy');
	    break;	    
    }
}
//화면 클리어
function clearAll(){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	var collTxt=document.getElementsByTagName("INPUT");   // document 상의 모든 INPUT 태그 요소들을 컬렉션으로 구하고...
	for(var i=0; i<collTxt.length; i++){
	  if(collTxt[i].type == "text" || collTxt[i].type == "hidden"){
		  collTxt[i].value="";
	  }
	}
}	

//Carrier 명 초기화
function lnr_trdp_nmClear(){
	var formObj=document.frm1;
	if (formObj.lnr_trdp_cd.value == ""){
		formObj.lnr_trdp_nm.value = "";
	}
}	

function CARR_TRDP_POPLIST(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}
	else{
		var rtnValAry=rtnVal.split("|");
		formObj.lnr_trdp_cd.value=rtnValAry[0];//trdp_cd
		formObj.lnr_trdp_nm.value=rtnValAry[2];//eng_nm
	}  
}