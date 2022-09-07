/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : ACC_INV_0051.js
*@FileTitle  : Invoice Batch Print
*@author     : CLT
*@version    : 1.0
*@since      : 2014/06/12
=========================================================*/

function doWork(srcName){
	var formObj=document.form;
    switch(srcName) {
	case 'PRINT':
		
		formObj.f_cmd.value = SEARCHLIST;
		
		if(formObj.f_ap_yn.checked){
			formObj.f_ap_yn.value = "Y";
		}else{
			formObj.f_ap_yn.value = "N";
		}
		
		if(formObj.ap_not_ar_yn.checked){
			formObj.ap_not_ar_yn.value = "Y";
		}else{
			formObj.ap_not_ar_yn.value = "N";
		}
		
		if (formObj.prn_radio[1].checked) {
			if(!chkSearchCmprPrd(true, formObj.f_strdt, formObj.f_enddt)){
				return;
			}
		}
		
		// OTHER OFFICE ACCESS 권한이 없을 경우 User의 Office Code를 넘겨 자신의 Office 정보만 조회하도록 처리
		if(formObj.oa_flg.value != "Y"){
			formObj.role_ofc_cd.value = formObj.f_ofc_cd.value;
		}
		
        docObjects[0].DoSearch("./ACC_INV_0051GS.clt", FormQueryString(formObj));

	break;
	
	case "CLOSE":
    	window.close();
	break;
    }
}
var docObjects=new Array();
var sheetCnt=0;
/**
달력팝업을 호출한다.
**/
function doDisplay(doWhat,formObj){
    switch(doWhat){
	    case 'DATE1':   //달력 조회 From ~ To 팝업 호출 
	        var cal=new calendarPopupFromTo();
	        cal.displayType="date";
	        cal.select(formObj.f_st_dt, 'f_st_dt', formObj.f_en_dt, 'f_en_dt', 'MM-dd-yyyy');
	    break;
    }
}
function loadPage(){
	var formObj=document.form;
	for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
	//오늘일자구하기
	var now=new Date(); 				
	var year=now.getFullYear(); 			
	var month=now.getMonth() + 1; 		
	var date=now.getDate(); 			
	if(month < 10){
		month="0"+(month);
	}
	if(date < 10){
		date="0"+date;
	}
	var fromDate=month + "-" + "01" + "-" + year;
	var today=month + "-" + date + "-" + year;
	
	rario_onchange();
	
	formObj.f_inv_no.focus();
}
//--------------------------------------------------------------------------------------------------------------
//IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
var docObjects=new Array();
var sheetCnt=0;
var ctlKind="";
var ctlCol=0;
var ctlRow=0;
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
            
           //no support[check again]CLT 	             if (location.hostname != "") InitHostInfo(location.hostname, location.port, page_path);
           var cnt=0;
           SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:1 } );
           var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
           var headers = [ { Text:getLabel('ACC_INV_0051_HDR'), Align:"Center"} ];
           InitHeaders(headers, info);

           var cols = [ {Type:"Text",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"inv_seq",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Text",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"inv_tp",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:1,   InsertEdit:1 },
                  {Type:"Text",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"inv_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Text",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"intg_bl_seq",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Text",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"oth_seq",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Text",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"bl_cnt",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Text",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"bl_ofc",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
                  {Type:"Text",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:1,   SaveName:"trdp_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 } ];
            
           InitColumns(cols);
           SetVisible(false);
           SetEditable(1);
                 }



                          
           break;
     }
}
function sheet1_OnSearchEnd(){
	var formObj=document.form;
	var sheetObj=docObjects[0];
	var ttlFileName="";
	var ttlParam="";
	
	var param= "";
	for(var i=1; i<=sheetObj.LastRow();i++){
		if(sheetObj.GetCellValue(i, "intg_bl_seq") == ""){
			if(sheetObj.GetCellValue(i, "inv_tp") == "A/R"){
				/*if(sheetObj.GetCellValue(i, "bl_cnt") == "US" || sheetObj.GetCellValue(i, "bl_cnt") == "CA" || sheetObj.GetCellValue(i, "bl_cnt") == "DE"){
					ttlFileName += '^@@^' + 'invoice_06.mrd';
				}else if(sheetObj.GetCellValue(i, "bl_cnt") == "IT"){
					ttlFileName += '^@@^' + 'invoice_09.mrd';
				}else if(sheetObj.GetCellValue(i, "bl_cnt") == "JP"){
					ttlFileName += '^@@^' + 'invoice_08_jp.mrd';
	        	}else{
	        		if(sheetObj.GetCellValue(i, "bl_ofc") == "SEL"){
	        			ttlFileName += '^@@^' + 'invoice_08_kr.mrd';
	        		}else{
	        			ttlFileName += '^@@^' + 'invoice_08.mrd';
	        		}
	        	}*/
				ttlFileName += '^@@^' + 'invoice_06.mrd';
			}else if(sheetObj.GetCellValue(i, "inv_tp") == "DB/CR"){
				/*if(sheetObj.GetCellValue(i, "bl_cnt") == "IT"){
					ttlFileName += '^@@^' + 'invoice_10.mrd';
				}else if(sheetObj.GetCellValue(i, "bl_cnt") == "US" || sheetObj.GetCellValue(i, "bl_cnt") == "CA" || sheetObj.GetCellValue(i, "bl_cnt") == "DE"){
					ttlFileName += '^@@^' + 'invoice_07_us.mrd';
				}else{
					ttlFileName += '^@@^' + 'invoice_07.mrd';
				}*/
				ttlFileName += '^@@^' + 'invoice_07_us.mrd';
			}else if(sheetObj.GetCellValue(i, "inv_tp") == "A/P"){
				ttlFileName += '^@@^' + 'invoice_13.mrd';
			
			}
		}else{
			if(sheetObj.GetCellValue(i, "inv_tp") == "A/R"){
				/*if(sheetObj.GetCellValue(i, "bl_cnt") == "US" || sheetObj.GetCellValue(i, "bl_cnt") == "CA" || sheetObj.GetCellValue(i, "bl_cnt") == "DE"){
					ttlFileName += '^@@^' + 'invoice_01.mrd';
				}else if(sheetObj.GetCellValue(i, "bl_cnt") == "IT"){
					ttlFileName += '^@@^' + 'invoice_04.mrd';
				}else if(sheetObj.GetCellValue(i, "bl_cnt") == "JP"){
					ttlFileName += '^@@^' + 'invoice_03_jp.mrd';
	        	}else{
	        		if(sheetObj.GetCellValue(i, "bl_ofc") == "SEL"){
	        			ttlFileName += '^@@^' + 'invoice_03_kr.mrd';
	        		}else{
	        			ttlFileName += '^@@^' + 'invoice_03.mrd';
	        		}
	        	}*/
				ttlFileName += '^@@^' + 'invoice_01.mrd';
			}else if(sheetObj.GetCellValue(i, "inv_tp") == "DB/CR"){
				/*if(sheetObj.GetCellValue(i, "bl_cnt") == "IT"){
					ttlFileName += '^@@^' + 'invoice_05.mrd';
				}else if(sheetObj.GetCellValue(i, "bl_cnt") == "US" || sheetObj.GetCellValue(i, "bl_cnt") == "CA" || sheetObj.GetCellValue(i, "bl_cnt") == "DE"){
					ttlFileName += '^@@^' + 'invoice_02_us.mrd';
				}else{
					ttlFileName += '^@@^' + 'invoice_02.mrd';
				}*/
				ttlFileName += '^@@^' + 'invoice_02_us.mrd';
			}else if(sheetObj.GetCellValue(i, "inv_tp") == "A/P"){
				ttlFileName += '^@@^' + 'invoice_13.mrd';
				
			}
		}
		if(sheetObj.GetCellValue(i, "inv_tp") == "A/P"){
			//Parameter Setting
			param="[" + "'" + sheetObj.GetCellValue(i, "inv_seq") + "'" + ']';	// [1]
			param += '[' + sheetObj.GetCellValue(i, "trdp_cd") + ']';					// Vendor [2]
			param += '[' + sheetObj.GetCellValue(i, "bl_ofc") + ']';					// REF_OFC_CD [3]
			param += '[' + sheetObj.GetCellValue(i, "bl_cnt") + ']';					// CNT_CD  [4]
			param += '[' + formObj.f_usr_nm.value + ']';							// USER_NM [5]
			param += '[' + formObj.f_email.value + ']';							// USER EMAIL [6]
			param += '[' + formObj.f_usrPhn.value + ']';							// 7
			param += '[' + formObj.f_usrFax.value + ']';							// 8
			param += '[' + formObj.f_usrId.value + ']';							// 9
		}else{
			param='[' + formObj.f_email.value + ']';						// USER EMAIL';	[1]
			param += "[" + "'" + sheetObj.GetCellValue(i, "inv_seq") + "'" + ']';		// [2]
			param += '[]';															// [3]
			param += '[]';															// [4]
			param += '[]';															// [5]
			param += '[]';															// [6]	
			if(sheetObj.GetCellValue(i, "inv_tp") == "DB/CR"){
				param += '[' + sheetObj.GetCellValue(i, "trdp_cd") + ']';				// TRDP_CD [7]
				param += '[' + sheetObj.GetCellValue(i, "bl_ofc") + ']';				// OFC_CD  [8]
			}else if(sheetObj.GetCellValue(i, "inv_tp") == "A/R"){
				param += '[' + sheetObj.GetCellValue(i, "trdp_cd") + ']';				// TRDP_CD [7]
				param += '[' + sheetObj.GetCellValue(i, "bl_ofc") + ']';				// OFC_CD  [8]
				param += '[' + sheetObj.GetCellValue(i, "bl_cnt") + ']';				// CNT_CD  [9]
				param += '[' + formObj.f_usr_nm.value + ']';						// USER_NM [10]
			}
			param += '[' + formObj.f_usrPhn.value + ']';							// 9,  11
			param += '[' + formObj.f_usrFax.value + ']';							// 10, 12
			param += '[' + formObj.f_usrId.value + ']';							// 11, 13
			param += '[' + ']';					// 12, 14
			
			if(sheetObj.GetCellValue(i, "inv_tp") == "DB/CR"){
				param += '[' + formObj.f_ofc_locl_nm.value + ']';		//13  user local office name
				param += '[]';
				param += '[]';
			}
		}
		ttlParam += "^@@^" + param;
	}
	if(ttlFileName.substring(4) != ""){
		formObj.file_name.value=ttlFileName.substring(4);
		formObj.rd_param.value=ttlParam.substring(4);
		formObj.title.value="INVOICE BATCH PRINT"
		popPOST(formObj, 'RPT_RD_0030.clt', 'popTest', 1025, 740);
	}
}

/**
달력팝업을 호출한다.
**/
function doDisplay(doWhat,formObj){
    switch(doWhat){
	    case 'DATE1':   //달력 조회 From ~ To 팝업 호출 
	        var cal=new ComCalendarFromTo();
	        cal.displayType="date";
	        cal.select(formObj.f_strdt, formObj.f_enddt, 'MM-dd-yyyy');
	    break;
    }
}

function rario_onchange(){
	var formObj=document.form; 
	var flg;
	
	if(formObj.prn_radio[0].checked){
		formObj.f_strdt.value = "";
		formObj.f_enddt.value = "";
		formObj.sell_yn.checked = false;
		formObj.buy_yn.checked = false;
		formObj.dc_yn.checked = false;
		formObj.ap_not_ar_yn.checked = false;
		flg = true;
	}else{
		formObj.f_inv_no.value = "";
		formObj.t_inv_no.value = "";
		formObj.f_ap_yn.checked = false;
		flg = false;
	}
	
	formObj.date_clss_cd.disabled = flg;
	formObj.f_strdt.disabled = flg;
	formObj.f_enddt.disabled = flg;
	formObj.f_dt_cal.disabled = flg;
	formObj.sell_yn.disabled = flg;
	formObj.buy_yn.disabled = flg;
	formObj.dc_yn.disabled = flg;
	formObj.ap_not_ar_yn.disabled = flg;
	
	formObj.f_inv_no.disabled = !flg;
	formObj.t_inv_no.disabled = !flg;
	formObj.f_ap_yn.disabled = !flg;
}

function chk_onchange(){
	var formObj=document.form; 
	var ap_not_ar_yn=formObj.ap_not_ar_yn.checked;
	
	if(ap_not_ar_yn){
		formObj.sell_yn.checked = false;
		formObj.buy_yn.checked = false;
		formObj.dc_yn.checked = false;
		formObj.sell_yn.disabled = true;
		formObj.buy_yn.disabled = true;
		formObj.dc_yn.disabled = true;
	}else{
		formObj.sell_yn.disabled = false;
		formObj.buy_yn.disabled = false;
		formObj.dc_yn.disabled = false;
	}
}