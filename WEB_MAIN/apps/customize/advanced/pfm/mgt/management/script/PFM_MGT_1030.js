// 커런시 취득 
var currArr=new Array();
var rdObjects=new Array();

var pdf = false;
function pdfDown(prn){
	pdf = true;
	doWork(prn);
}

function doWork(srcName){
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var sheetObj2=docObjects[1];
    var sheetObj3=docObjects[2];
    var sheetObj4=docObjects[3];
    var formObj=document.frm1;
    switch(srcName) {
	   case "DEFAULT":
		    frm1.f_cmd.value=-1;
	        formObj.submit();
	   break; 
	   case "ALL":
		   formObj.s_ex_dptm_flg.checked=true;
		   formObj.s_im_dptm_flg.checked=true;
		   formObj.s_oe_dptm_flg.checked=true;
		   formObj.s_oi_dptm_flg.checked=true;
		   formObj.s_ai_dptm_flg.checked=true;
		   formObj.s_ae_dptm_flg.checked=true;
		   formObj.s_on_dptm_flg.checked=true;
		   break;     
	   case "CLEAR":
		   formObj.s_ex_dptm_flg.checked=false;
		   formObj.s_im_dptm_flg.checked=false;
		   formObj.s_oe_dptm_flg.checked=false;
		   formObj.s_oi_dptm_flg.checked=false;
		   formObj.s_ai_dptm_flg.checked=false;
		   formObj.s_ae_dptm_flg.checked=false;
		   formObj.s_on_dptm_flg.checked=false;
		   break;      
       case 'PRINT':
    	   formObj.title.value='Profit Report';
    	   //2.Department Type check
    	   var arr_dptm_flg=new Array(7);
    	   arr_dptm_flg[0]=formObj.s_oi_dptm_flg;
    	   arr_dptm_flg[1]=formObj.s_oe_dptm_flg;
    	   arr_dptm_flg[2]=formObj.s_ai_dptm_flg;
    	   arr_dptm_flg[3]=formObj.s_ae_dptm_flg;
    	   arr_dptm_flg[4]=formObj.s_on_dptm_flg;
    	   arr_dptm_flg[5]=formObj.s_ex_dptm_flg;
    	   arr_dptm_flg[6]=formObj.s_im_dptm_flg;
    	   if(arr_dptm_flg[0].checked == false && arr_dptm_flg[1].checked == false 
    			   && arr_dptm_flg[2].checked == false && arr_dptm_flg[3].checked == false
    			   && arr_dptm_flg[4].checked == false && arr_dptm_flg[5].checked == false 
    			   && arr_dptm_flg[6].checked == false){
    		   //Please select a [Department Type]!
    		   alert(getLabel('FMS_COM_ALT004') + "\n - " + getLabel('FMS_COD_DETP'));
    		   return;
    	   }
    	   isIntervalDt();
    	   // ==============  Period 조회 조건 query  ==============
    	   var periodSql="";
    	   var periodCol="";
    	   var s_dt_clss_cd=formObj.s_dt_clss_cd.value; 
    	   var s_prd_strdt=mkFormat1(formObj.s_prd_strdt.value); 
    	   var s_prd_enddt=mkFormat1(formObj.s_prd_enddt.value); 
    	   //Option, Summary, detail, All
    		if(formObj.s_grd_opt[0].checked){
    			formObj.s_grd_opt_val.value="A";
    		}
    		if(formObj.s_grd_opt[1].checked){
    			formObj.s_grd_opt_val.value="S";
    		}
    		if(formObj.s_grd_opt[2].checked){
    			formObj.s_grd_opt_val.value="D";
    		}
    	   var file_names='advance_profit_report.mrd';
    	   var param='';
    	   if (s_dt_clss_cd =='PDT') {
    		   param += '[P]';										//$1
    		   param += '[' + s_prd_strdt + ']';					//$2	StartDt
    		   param += '[' + s_prd_enddt + ']';					//$3	EndDt
    		   //48363
    		   param += '[]';										//$4	StartDt
    		   param += '[]';										//$5	EndDt
    	   } else  if (s_dt_clss_cd =='IDT') {
    		   param += '[I]';										//$1
    		   param += '[' + s_prd_strdt + ']';					//$2	StartDt
    		   param += '[' + s_prd_enddt + ']';					//$3	EndDt
    		   param += '[IDT]';									//$4	StartDt
    		   param += '[]';										//$5	EndDt

    	   } else  if (s_dt_clss_cd =='MDT') {
    		   param += '[M]';										//$1
    		   param += '[' + s_prd_strdt + ']';					//$2	StartDt
    		   param += '[' + s_prd_enddt + ']';					//$3	EndDt
    		   param += '[]';										//$4	StartDt
    		   param += '[MDT]';									//$5	EndDt

    	   } else  if (s_dt_clss_cd =='BPDT') {
    		   param += '[B]';										//$1
    		   param += '[' + s_prd_strdt + ']';					//$2	StartDt
    		   param += '[' + s_prd_enddt + ']';					//$3	EndDt
    		   param += '[]';										//$4	StartDt
    		   param += '[BPDT]';									//$5	EndDt

    	   }
    	   param += '[' + getDeptName() + ']';						//$6	Department Name
    	   param += '[' + getDeptCodeForIn() + ']';					//$7	Department Option
    	   param += '[' + getDeptCode() + ']';						//$8	Department Option
    	   
    	   /*
    	   if ( formObj.s_ofc_cd.value != '') {
    		   param += '[' + formObj.s_ofc_cd.value + ']';			//$9	Select Office
    	   } else {
    		   // ALL일 경우 (동적쿼리로 RD파일 수정하는게 번거로움)
    		   param += '[' + get_ofccd() + ']';					//$9	Select Office
    	   }
    	   */
    	   
    	   param += '[' + formObj.s_ofc_cd.value + ']';				//$9	Select Office
    	   
    	   param += '[' + formObj.f_usr_nm.value + ']';				//$10	User Name
    	   
    	   /* #1158 : [BINEX] DOCUMENT ENHANCE - PROFIT REPORT BY DEPARTMENT HEADER  By Thoa.Dien - 2017.09.07  */    	  
    	   //param += '[' + formObj.f_ofc_cd.value + ']';			//$11	User Office Code
    	   param += '[' + formObj.f_sys_ofc_cd.value + ']';			//$11	System Office Code
    	   
    	   /*#5673 [AIF] Profit Report By Department not showing G&A Income & Expense*/
    	   if(s_dt_clss_cd =='BPDT' && formObj.s_grd_opt_val.value=="D"){
    		   alert(getLabel('FMS_COM_ALT010'));
    		   return;
    	   }
    	   // Curr을 구해서 파라미터로 넘기기 위한 로직
    	   var ajaxParam=getAjaxParam();    	   
    	   // CURR을 취득한다.
    	   getCurr(ajaxParam);
    	   if (currArr.length > 0){
    			if (formObj.f_cnt_cd.value=="US" || formObj.f_cnt_cd.value=="CA") {
					RD_path += "letter/";
				}else{
					//US / CA 제외 경로셋팅 옵션 제공
					var opt_key = "MRD_A4_FOLDER";
				    ajaxSendPost(rdSetter, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
					
				}
    			
    			/*
    			// Curr 이 1인 경우는 Merge없이 바로 print
    			if(currArr.length == 1){
    				param += '[' + currArr[0] + ']';					//$12	Curr
    			// Curr이 2이상인 경우
    			} else {
    				var tmpParam="";
    				for (var i=0; i<currArr.length; i++) {
    					tmpParam=tmpParam + currArr[i];
    					if (i!=currArr.length-1){
    						tmpParam=tmpParam+',';
    					}
    				}
    				param += '[' + tmpParam + ']';						//$12	Curr
    			}
    			*/
    			
    			//LHK, 20141002, Bug #44373 [BINEX]PROFIT REPORT BY DEPT 오류, Multi Curr 일 경우 Bug 발생됨, RD에서 Currency 조회 하여 Currency 별로 조회되도록 수정 
    	        param   +=  '[]';
    	        
    			param 	+=	'[' + formObj.s_grd_opt_val.value + ']';					//$13
    			param 	+=	'[' + formObj.f_sys_ofc_cd.value + ']';				     	//$14
    			
    			formObj.file_name.value=file_names;
    			formObj.rd_param.value=param;
    			
    			//popPOST(formObj, 'RPT_RD_0030.clt', 'popTest', 1025, 740);   
    			if (pdf) {
    				popPOST(formObj, 'RPT_RD_0070.clt', 'popTest', 1025, 740);
    				pdf = false;
    			} else {
    				popPOST(formObj, 'RPT_RD_0030.clt', 'popTest', 1025, 740);
    			}
    			
    	   } else {
    		   // 조건에 맞는 CURR이 존재하지 않음
    		   alert(getLabel('FMS_COM_ALT010'));
    		   return;
    	   }
    	   break;
    }
}
function getAjaxParam(){
	var formObj=document.frm1;
	var param="";
	if (formObj.s_dt_clss_cd.value=='PDT'){
		param="param1=P";
	} else if (formObj.s_dt_clss_cd.value=='BPDT') {
		param="param1=B";
	} else {
		param="param1=I";
	}
	// 기간
	var s_prd_strdt=mkFormat1(formObj.s_prd_strdt.value); 
	var s_prd_enddt=mkFormat1(formObj.s_prd_enddt.value); 
	param=param + "&param2="+s_prd_strdt;
	param=param + "&param3="+s_prd_enddt;
	// DEPT CD
	param=param + "&param8="+getDeptCode();
	// OFC
	if (formObj.s_ofc_cd.value!=""){
		param=param + "&param9="+formObj.s_ofc_cd.value;
	} else {
		param=param + "&param9=ALL";
	}
	return param;
}
function getCurr(ajaxParam){
	// ajax함수호출뒤 curr반환 함수 만들어야함.
	ajaxSendPost(getCurrValue, 'reqVal', '&goWhere=aj&bcKey=getCurrByProfitRpt&'+ajaxParam, './GateServlet.gsl');
}
function getCurrValue(reqVal) {	
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			rtnArray=doc[1].split("^^");
			currArr=rtnArray;
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
	
    var formObj=document.frm1;
    
    //LHK, 20141029 #44986 [BINEX]Office - All Option
    setOfficeAllOption(formObj.s_ofc_cd);
    
    formObj.s_prd_strdt.value=getMonthFirstDate(-1);
    formObj.s_prd_enddt.value=getMonthLastDate(-1);
    for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        //initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
    // 기본값은 모두 체크
    formObj.s_ex_dptm_flg.checked=true;
    formObj.s_im_dptm_flg.checked=true;
    formObj.s_oe_dptm_flg.checked=true;
    formObj.s_oi_dptm_flg.checked=true;
    formObj.s_ai_dptm_flg.checked=true;
    formObj.s_ae_dptm_flg.checked=true;
    formObj.s_on_dptm_flg.checked=true;
	formObj.s_dt_clss_cd.value="BPDT";
}
/**
 * IBSheet Object를 배열로 등록
 * 향후 다른 항목들을 일괄처리할 필요가 있을 때 배열로 담는 프로세스를 추가할 수 있다
 * 배열은 소스 상단에 정의
 */
function setDocumentObject(sheet_obj){
   docObjects[sheetCnt++]=sheet_obj;
}
function mkFormat1(dtStr){
	 var rtnStr="";
	 var dtStr=dtStr.replace('-','').replace('-',''); 
	 rtnStr=dtStr.substring(4,8) + dtStr.substring(0,2) + dtStr.substring(2,4); 
	 return rtnStr;
}
function isIntervalDt(){
	var formObj=document.frm1;
    var s_prd_strdt=formObj.s_prd_strdt.value;
    var s_prd_enddt=formObj.s_prd_enddt.value;
    s_prd_strdt=mkFormat1(s_prd_strdt).substring(0,6); 
    s_prd_enddt=mkFormat1(s_prd_enddt).substring(0,6); 
    var s_prd_strYm=s_prd_strdt; 
    var date=new Date(); 
    date.setFullYear( parseInt(s_prd_strYm.substring(0,4))); 
    date.setMonth(parseInt(s_prd_strYm.substring(4)) + 2); 
    var year=date.getFullYear();
    var month=date.getMonth();
    if(month<10){month='0'+ month;}    
    var s_prd_endYm=year + month;
    if(s_prd_enddt > s_prd_endYm){
    	return true;
    }
    return false;
}
function getDeptCodeForIn(){
	var formObj=document.frm1; 
	var val="";
	if (formObj.s_oi_dptm_flg.checked) {
		val=val + ",'OI'";
	}
	if (formObj.s_ai_dptm_flg.checked) {
		val=val + ",'AI'";
	}
	if (formObj.s_oe_dptm_flg.checked) {
		val=val + ",'OE'";
	}
	if (formObj.s_ae_dptm_flg.checked) {
		val=val + ",'AE'";
	}
	if (formObj.s_on_dptm_flg.checked) {
		val=val + ",'OO'";
	}
	if (formObj.s_ex_dptm_flg.checked) {
		val=val + ",'EX'";
	}
	if (formObj.s_im_dptm_flg.checked) {
		val=val + ",'IM'";
	}
	if (val.substr(0,1) == ","){
		val=val.substr(1, val.length);
	}
	return val;
}
// SO, SI, AO, AI
function getDeptCode(){
	var formObj=document.frm1; 
	var val="";
	if (formObj.s_oi_dptm_flg.checked) {
		val=val + ",'SI'";
	}
	if (formObj.s_ai_dptm_flg.checked) {
		val=val + ",'AI'";
	}
	if (formObj.s_oe_dptm_flg.checked) {
		val=val + ",'SO'";
	}
	if (formObj.s_ae_dptm_flg.checked) {
		val=val + ",'AO'";
	}
	if (formObj.s_on_dptm_flg.checked) {
		val=val + ",'XX'";
	}
	if (val.substr(0,1) == ","){
		val=val.substr(1, val.length);
	}
	return val;
}
function getDeptName(){
	var formObj=document.frm1; 
	var val="";
	if (formObj.s_ex_dptm_flg.checked) {
		val=val + ",Export";
		if (formObj.s_im_dptm_flg.checked) {
			val=val + ",Import";
		} else {
			if (formObj.s_oi_dptm_flg.checked) {
				val=val + ",Ocean Import";
			}
			if (formObj.s_ai_dptm_flg.checked) {
				val=val + ",Air Import";
			}
		}
	} else if (formObj.s_im_dptm_flg.checked) {
		val=val + ",Import";
		if (formObj.s_oe_dptm_flg.checked) {
			val=val + ",Ocean Export";
		}
		if (formObj.s_ae_dptm_flg.checked) {
			val=val + ",Air Export";
		}
	} else {
		if (formObj.s_oi_dptm_flg.checked) {
			val=val + ",Ocean Import";
		}
		if (formObj.s_ai_dptm_flg.checked) {
			val=val + ",Air Import";
		}
	}
	if (formObj.s_on_dptm_flg.checked) {
		val=val + ",Other Operation";
	}
	if (val.substr(0,1) == ','){
		val=val.substr(1, val.length);
	}
	return val;
}
function get_ofccd(){
	var formObj=document.frm1; 
	var ofcCd="";
	for (var i=1;i<formObj.s_ofc_cd.length;i++){
		ofcCd=ofcCd + "'" +formObj.s_ofc_cd[i].value+"',";	
	}
//	if (ofcCd.substr(0,2) == "',"){
//		ofcCd = ofcCd.substr(2, ofcCd.length);
//	}
	if(ofcCd !=""){
		ofcCd=ofcCd.substring(1,ofcCd.length-2);
	}
	return ofcCd;
}
function chk_onchange(val){
	var formObj=document.frm1; 
	var ex_chk=formObj.s_ex_dptm_flg.checked;
	var im_chk=formObj.s_im_dptm_flg.checked;
	var oi_chk=formObj.s_oi_dptm_flg.checked;
	var oe_chk=formObj.s_oe_dptm_flg.checked;
	var ai_chk=formObj.s_ai_dptm_flg.checked;
	var ae_chk=formObj.s_ae_dptm_flg.checked;
	var on_chk=formObj.s_on_dptm_flg.checked;
	switch(val) {
	   case "EX":
		   if (ex_chk){
			   formObj.s_oe_dptm_flg.checked=true;
			   formObj.s_ae_dptm_flg.checked=true;
		   } else {
			   formObj.s_oe_dptm_flg.checked=false;
			   formObj.s_ae_dptm_flg.checked=false;
		   }
		   break;
	   case "IM":		   
		   if (im_chk){
			   formObj.s_oi_dptm_flg.checked=true;
			   formObj.s_ai_dptm_flg.checked=true;
		   } else {
			   formObj.s_oi_dptm_flg.checked=false;
			   formObj.s_ai_dptm_flg.checked=false;
		   }
		   break;
	   case "SE":		   
		   if (!oe_chk){
			   formObj.s_ex_dptm_flg.checked=false;
		   }
		   break;
	   case "AE":		   
		   if (!ae_chk){
			   formObj.s_ex_dptm_flg.checked=false;
		   }
		   break;
	   case "SI":		   
		   if (!oi_chk){
			   formObj.s_im_dptm_flg.checked=false;
		   }
		   break;
	   case "AI":		   
		   if (!ai_chk){
			   formObj.s_im_dptm_flg.checked=false;
		   }
		   break;
	}
}
/**
 * 화면에서 사용하는 메소드
 * @param doWhat
 * @param formObj
 * @return
*/
function doDisplay(doWhat, formObj){
    switch(doWhat){
        case 'DATE11':   //달력 조회 From ~ To 팝업 호출 
            var cal=new ComCalendarFromTo();
            cal.displayType="date";
            cal.select(formObj.s_prd_strdt, formObj.s_prd_enddt, 'MM-dd-yyyy');
        break;
    }
}

//Jpn RD폴더 셋팅.
function rdSetter(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ) {
		if (doc[1] != "") {
			RD_path += doc[1];
		}
	}
}