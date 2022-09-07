//=========================================================
//*@FileName   : CMM_POP_0240.jsp
//*@FileTitle  : CMM
//*@Description: 
//*@author     : Tuan.Chau
//*@version    : 2.0 - 28/07/2014
//*@since      : 28/07/2014
//
//*@Change history:
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
    	   case "PREVIEW":
    		   var retArray="";	
    		   for(var i=1 ; i<docObjects[0].LastRow()+1 ; i++){
    			   if(docObjects[0].GetCellValue(i, "check")==1){
    				   var formObj=document.form;
    				   formObj.file_name.value += "^@@^";
    	    		   formObj.rd_param.value += "^@@^";
						if(formObj.bl_type[0].checked){
							formObj.file_name.value=formObj.file_name.value + 'HBL_AIR_ORG.mrd';
						}else if(formObj.bl_type[1].checked){
							formObj.file_name.value=formObj.file_name.value + 'HBL_AIR_COPY.mrd';
						}
						formObj.title.value='Air Export House B/L';
    					//Parameter Setting
						var param="['" + docObjects[0].GetCellValue(i, "intg_bl_seq") + "']";	// [1]
    		        	if(formObj.clause_rule.checked){
    		        		param += '[Y]';										// [2]
    		        	}else{
    		        		param += '[N]';										// [2]
    		        	}
    		        	if(formObj.bl_type[0].checked){
    		        		param += '[org]';									// [3]
    		        	}else if(formObj.bl_type[1].checked){
    		        		param += '[copy]';									// [3]
    		        	}
    		        	if(formObj.frt_flg[0].checked){
    		        		param += '[Y]';										// [4]
    		        	}else if(formObj.frt_flg[1].checked){
    		        		param += '[N]';										// [4]
    		        	}
    		        	if(formObj.charge_flg[0].checked){
    		        		param += '[Y]';										// [5]
    		        	}else{
    		        		param += '[N]';										// [5]
    		        	}
    		        	//if(formObj.bl_for[0].checked){
    		        	//	param += '[SHIP]';									// [6]
    		        	//}else if(formObj.bl_for[1].checked){
    		        	//	param += '[CNEE]';									// [6]
    		        	//}else if(formObj.bl_for[2].checked){
    		        		param += '[ALL]';									// [6]
    		        	//}
    		        	param += '[]';											// [7]
    		        	param += '[' + usrid + ']';											// [8]
						param += '[' + docObjects[0].GetCellValue(i, "dest_cnt") + ']';		// [9]
						param += '[' + docObjects[0].GetCellValue(i, "by_carr") + ']';			// [10]
						param += '[' + docObjects[0].GetCellValue(i, "sign_ship") + ']';		// [11]
						param += '[' + docObjects[0].GetCellValue(i, "sign_carr") + ']';		// [12]
    		        	if(formObj.show_org.checked){
    		        		param += '[Y]';										// [13]
    		        	}else{
    		        		param += '[N]';										// [13]
    		        	}
    		        	param += '[' + formObj.sci.value + ']';					// [14]
    		        	if(formObj.desc_flg[0].checked){						//shipper
    		        		param += '[Y]';										// [15]
    		        	}else{
    		        		param += '[N]';										// [15]
    		        	}
    		        	if(formObj.desc_flg[2].checked){						//consignee
    		        		param += '[Y]';										// [16]
    		        	}else{
    		        		param += '[N]';										// [16]
    		        	}
    		        	if(formObj.charge_flg[2].checked){						//consignee
    		        		param += '[Y]';										// [17]
    		        	}else{
    		        		param += '[N]';										// [17]
    		        	}
    		        	/* #24114, [BINEX]AWB PRINT, jsjang 2013.12.5. 국가코드 */
    		        	param += '[' + docObjects[0].GetCellValue(i, "cnt_cd") + ']';	// [18]
    		        	/* #24114, [BINEX]AWB PRINT, jsjang 2013.12.5  국가코드 */
    		        	//if(docObjects[0].CellValue(i, "cnt_cd") == 'CA')
    		        	//{
			        	if(formObj.bl_for_s.checked){
			        		param += '[SHIP]';							// [19]
			        	}else{
			        		param += '[]';								// [19]
			        	}
			        	if(formObj.bl_for_i.checked){
			        		param += '[ISUE]';							// [20]
			        	}else{
			        		param += '[]';								// [20]
			        	}
			        	if(formObj.bl_for_c.checked){
			        		param += '[CNEE]';							// [21]
			        	}else{
			        		param += '[]';								// [21]
			        	}
			        	if(formObj.bl_for_d.checked){
			        		param += '[DELI]';							// [22]
			        	}else{
			        		param += '[]';								// [22]
			        	}
			        	if(!formObj.bl_for_s.checked && !formObj.bl_for_i.checked && !formObj.bl_for_c.checked && !formObj.bl_for_d.checked){
			        		alert(getLabel('FMS_COM_ALT061'));
			        		return;
			        	}
    		        	if(formObj.desc_flg[1].checked){						//issuing carrier
    		        		param += '[Y]';										// [23]
    		        	}else{
    		        		param += '[N]';										// [23]
    		        	}
    		        	if(formObj.desc_flg[3].checked){						//delivery receipt
    		        		param += '[Y]';										// [24]
    		        	}else{
    		        		param += '[N]';										// [24]
    		        	}
    		        	if(formObj.charge_flg[1].checked){						//issuing carrier
    		        		param += '[Y]';										// [25]
    		        	}else{
    		        		param += '[N]';										// [25]
    		        	}	 	        	
    		        	if(formObj.charge_flg[3].checked){						//delivery receipt
    		        		param += '[Y]';										// [26]
    		        	}else{
    		        		param += '[N]';										// [26]
    		        	}	
    		        	if(formObj.bl_type[0].checked){
    		        		param += ' /rpaperlength [3049]';
    					}else if(formObj.bl_type[1].checked){
    						param += ' /rpaperlength [2970]';
    					}
    					formObj.rd_param.value=formObj.rd_param.value + param;
    			   }
    		   }
    		   formObj.file_name.value=formObj.file_name.value.substring(4);
    		   formObj.rd_param.value=formObj.rd_param.value.substring(4);
    		   retArray=formObj.rd_param.value;
    		   if(retArray==""){
//    			   alert("Please select HAWB.");
    			   alert(getLabel('AIR_MSG_046'));
    		   }else{
					if(srcName == "PREVIEW") {
						$("#prt_option").val("opt_preview");
					} else if(srcName == "PRINT") {
						$("#prt_option").val("opt_print");
					}
			
					if($("#chk_auto_close").is(":checked")){
						doWork("CLOSE");
					}			   

    			   popPOST(formObj, 'RPT_RD_0030.clt', 'popTest', 1025, 740);
    			   ComClosePopup(retArray);
    		   }
    	   break;
        } // end switch
	}catch(e) {
        if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	alert(getLabel('FMS_COM_ERR002') + "\n\n: AIE_BMD_0071.001");
        } 
        else{
        	//System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001') + " - " + e + "\n\n: AIE_BMD_0071.002");
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
//	formObj.openMean.value=arg[0];
    for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
    //arg[0]을 parsing 하여 리스트에 반영한다.
	var tmpArray=arg[0].toString().split("@@@");
	for(var i=0 ; i<tmpArray.length-1 ; i++){
		var result=tmpArray[i].split("^^^");
		docObjects[0].DataInsert(docObjects[0].LastRow() + 1);
		docObjects[0].SetCellValue(docObjects[0].LastRow(), "intg_bl_seq",result[0]);
		docObjects[0].SetCellValue(docObjects[0].LastRow(), "bl_no",result[1]);
		docObjects[0].SetCellValue(docObjects[0].LastRow(), "flt_no",result[2]);
		docObjects[0].SetCellValue(docObjects[0].LastRow(), "hbl_tp_cd",result[3]);
		docObjects[0].SetCellValue(docObjects[0].LastRow(), "lnr_trdp_nm",result[4]);
		docObjects[0].SetCellValue(docObjects[0].LastRow(), "third_trdp_nm",result[5]);
		docObjects[0].SetCellValue(docObjects[0].LastRow(), "shpr_trdp_nm",result[6]);
		docObjects[0].SetCellValue(docObjects[0].LastRow(), "ref_ofc_eng_nm",result[7]);
		//extra column
		docObjects[0].SetCellValue(docObjects[0].LastRow(), "dest_cnt",'');
		
		// #4681 Air Waybill Routing 표기 관련 개선 (v470, v5반영 필요)
		//docObjects[0].SetCellValue(docObjects[0].LastRow(), "by_carr",result[2] + " " + result[4]);
		docObjects[0].SetCellValue(docObjects[0].LastRow(), "by_carr", result[4]);

		// #4693 [BNX GE] AEM Doc package , HAWB Print 시 일부 칼럼 값 틀리게 출력되는 issue
		var signShip='';
		var signCarr='';
		if(result[3]=="TP"){
			signShip += result[5];
		}else if(result[8] != ""){  // Change from [7-ref_ofc_eng_nm] to [8-iss_trdp_nm]
			signShip += result[8];
		}else{
			signShip += "ADVANCED";
		}
		//docObjects[0].SetCellValue(docObjects[0].LastRow(), "sign_ship",signShip);
		
		signShip += "\r\nAS AGENT OF " + result[9];
		docObjects[0].SetCellValue(docObjects[0].LastRow(), "sign_ship",signShip);
		
        if(result[3]=="TP"){
        	signCarr += result[5];
        }else if(result[8] != ""){
        	signCarr += result[8];
        }else{
        	signCarr += "ADVANCED";
        }
        //docObjects[0].SetCellValue(docObjects[0].LastRow(), "sign_carr","AS AGENT FOR THE CARRIER " + result[4]);
        
        signCarr += "\r\nAS AGENT FOR THE CARRIER " + result[4];
        docObjects[0].SetCellValue(docObjects[0].LastRow(), "sign_carr",signCarr);
		
		/* #24114, [BINEX]AWB PRINT, jsjang 2013.12.5. 국가코드 */
		docObjects[0].SetCellValue(docObjects[0].LastRow(), "cnt_cd",result[10]);
	}
	/* #24114, [BINEX]AWB PRINT, jsjang 2013.12.5 */
	//if(docObjects[0].CellValue(docObjects[0].LastRow, "cnt_cd") == "CA"){
	//	tblForNonCA.style.display    	= 'none';
		getObj('tblForCA').style.display='block';
	//}else{
	//	tblForNonCA.style.display    	= 'block';
	//	tblForCA.style.display    		= 'none';
	//}
	if(ofc_cnt_cd1=="US"){
		document.all.rule1.style.display="block";
		formObj.clause_rule.checked=true;
	}else{
		document.all.rule1.style.display="none";
	}
	if(ofc_cnt_cd1=="JP"){
		//formObj.bl_for[1].checked = true;
	}else{
		formObj.desc_flg[0].checked=true;
		//formObj.desc_flg[1].checked = true;
		formObj.desc_flg[2].checked=true;
		//formObj.desc_flg[3].checked = true;	
		formObj.charge_flg[0].checked=true;
		//formObj.charge_flg[1].checked = true;
		formObj.charge_flg[2].checked=true;
		//formObj.charge_flg[3].checked = true;			
	}
	formObj.frt_flg[0].checked=true;
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
             var formObj=document.form;
             var HeadTitle1="";
             if(true){

             SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1 } );

             var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
             var headers = [ { Text:getLabel('AIE_BMD_0071_HDR1'), Align:"Center"} ];
             InitHeaders(headers, info);

             var cols = [ {Type:"CheckBox",  Hidden:0, Width:40,   Align:"Center",  ColMerge:0,   SaveName:"check",           KeyField:0 },
                    {Type:"Text",      Hidden:0,  Width:140,  Align:"Left",    ColMerge:0,   SaveName:"bl_no",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:70,   Align:"Center",  ColMerge:0,   SaveName:"intg_bl_seq",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:70,   Align:"Center",  ColMerge:0,   SaveName:"flt_no",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:70,   Align:"Center",  ColMerge:0,   SaveName:"hbl_tp_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:70,   Align:"Center",  ColMerge:0,   SaveName:"lnr_trdp_nm",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:70,   Align:"Center",  ColMerge:0,   SaveName:"third_trdp_nm",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:70,   Align:"Center",  ColMerge:0,   SaveName:"shpr_trdp_nm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:70,   Align:"Center",  ColMerge:0,   SaveName:"ref_ofc_eng_nm",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:70,   Align:"Center",  ColMerge:0,   SaveName:"dest_cnt",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:70,   Align:"Center",  ColMerge:0,   SaveName:"by_carr",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:70,   Align:"Center",  ColMerge:0,   SaveName:"sign_ship",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:70,   Align:"Center",  ColMerge:0,   SaveName:"sign_carr",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 },
                    {Type:"Text",      Hidden:1, Width:70,   Align:"Center",  ColMerge:0,   SaveName:"cnt_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0 } ];
              
             	InitColumns(cols);
                SetEditable(1);
                SetSheetHeight(150);
				}
           }                                                      
           break;
    }
}


$(document).ready(function(){
    var cookie_key = "aie_bmd_0071_auto_close";
    if(getCookie(cookie_key) == "1") {
        $("#chk_auto_close").attr("checked", true);
    }
    $("#chk_auto_close").change(function(){
        if($("#chk_auto_close").is(":checked")){
            setCookie(cookie_key, "1", 365);
        }else{
            setCookie(cookie_key, "", -1);
        }
    }); 
});    