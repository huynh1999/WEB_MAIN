function doWork(srcName, curObj) {
	// 탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
	var sheetObj=docObjects[0];
	var formObj=document.frm1;
	switch (srcName) {
	case "SEARCHLIST":
		formObj.f_cmd.value=SEARCHLIST;
		sheetObj.DoSearch("SEE_BMD_0065GS.clt", FormQueryString(formObj) );
		break;
	case "PRINT":
		// 프린트
		var formObj=document.frm1;
		formObj.file_name.value='usda_hold_notice_02.mrd';
		formObj.title.value='USDA Hold Notice';
		// 다중선택 BL SEQ 넘기기
		var temp_intg_bl_seq="";
		var hblNos = "";
		var v_bl_no = "";
		
		for ( var i=1; i <= sheetObj.LastRow() + 1; i++) {
			if (sheetObj.GetCellValue(i, "chk") == "1") {
				
				if(v_bl_no == sheetObj.GetCellValue(i, "bl_no")){
					continue;
				}
				
				v_bl_no = sheetObj.GetCellValue(i, "bl_no");
				
				if(temp_intg_bl_seq.length <= 0) {
					// 첫번째 시퀀스는 콤마 없이
					temp_intg_bl_seq=sheetObj.GetCellValue(i, "intg_bl_seq");
				} else {
					// 두번째 부터는 콤마붙임
					temp_intg_bl_seq += " ', '" +sheetObj.GetCellValue(i, "intg_bl_seq");
				}
				hblNos += "," + sheetObj.GetCellValue(i, "bl_no");
			}
		}
		
		
		
		if(temp_intg_bl_seq == ""){
			//Please, Select HBL No.
			alert(getLabel('FMS_COM_ALT004'));
			return;
		}
		// Parameter Setting
		var param='';
		param += '[' + temp_intg_bl_seq + ']'; 			// $1
		param += '[' + formObj.ofc_eng_nm.value + ']'; 	// $2
		param += '[' + formObj.ofc_locl_nm.value + ']'; // $3
		param += '[' + formObj.ofc_phn.value + ']'; 	// $4
		param += '[' + formObj.ofc_fax.value + ']'; 	// $5
		param += '[' + formObj.eml.value + ']'; 		// $6
		param += '[' + formObj.f_title.value + ']';  	// $7
		param += '[' + formObj.to_date.value + ']';  	// $8
		param += '[' + formObj.by_user.value + ']'; 	// $9
		param += '[' + formObj.commercial.value + ']';  // $10
		param += '[' + formObj.fumigation.value + ']';  // $11
		param += '[' + formObj.guarantee.value + ']';  	// $12
		param += '[' + formObj.remark.value + ']';  	// $13
		param += '[' + formObj.f_sub_title.value + ']'; // $14
		
		formObj.rd_param.value=param;
		formObj.rpt_biz_tp.value="OIM";
		formObj.rpt_biz_sub_tp.value="UH";
		formObj.intg_bl_seq.value=formObj.s_rlt_intg_bl_seq.value;
		formObj.h_intg_bl_seq.value = temp_intg_bl_seq;
		formObj.rpt_pdf_file_nm.value=getPdfFileNm();
		
		//#52724 - [BINEX] IF REPORT TITLE IS UPDATED BY USER, TO SAVE THE PDF FILE AS "UPDATED TITLE"  FILE NAME도 USER가 입력한 UPDATED TITLE로 저장되도록의 요청
		formObj.rpt_file_name_title.value = formObj.f_title.value+"_"+hblNos.substring(1, hblNos.length);			
		var t_attachFileName = formObj.rpt_file_name_title.value;
		
		formObj.mailTitle.value = formObj.f_title.value + " [HBL No : " + hblNos.substring(1, hblNos.length) + "]";
		
		t_attachFileName = t_attachFileName.replace(/\./g, "");
		t_attachFileName = t_attachFileName.replace(/\\|\/|\:|\*|\?|\"|\<|\>|\||\&|\-|\__|\s/g, "_");
		formObj.rpt_file_name_title.value = t_attachFileName;
	
		// alert(param);
		popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
		// /////////////////////////////////////////////////////////
		break;
	case 'EMAIL':			
		//#27552	[BINEX]H. MBL List에서 “USDA Hold”의 버튼 동작이 “Arrival Notice” 와 같이 동작 되도록
		if(sheetObj.RowCount()> 0){
			/*var iCheckRow=sheetObj.CheckedRows(1);
			if(iCheckRow == 0){
			 	alert(getLabel('FMS_COM_ALT004'));
				return;
			}*/	
			
			
			// 다중선택 BL SEQ 넘기기
			var temp_intg_bl_seq="";
			var hblNos = "";
			var v_bl_no = "";
			
			for ( var i=1; i <= sheetObj.LastRow() + 1; i++) {
				if (sheetObj.GetCellValue(i, "chk") == "1") {
					
					if(v_bl_no == sheetObj.GetCellValue(i, "bl_no")){
						continue;
					}
					
					v_bl_no = sheetObj.GetCellValue(i, "bl_no");
					
					if(temp_intg_bl_seq.length <= 0) {
						// 첫번째 시퀀스는 콤마 없이
						temp_intg_bl_seq=sheetObj.GetCellValue(i, "intg_bl_seq");
					} else {
						// 두번째 부터는 콤마붙임
						temp_intg_bl_seq += " ', '" +sheetObj.GetCellValue(i, "intg_bl_seq");
					}
					hblNos += "," + sheetObj.GetCellValue(i, "bl_no");
				}
			}
			
			var custCheckRow=sheetObj.CheckedRows(7);
			var brkCheckRow=sheetObj.CheckedRows(9);
			
			if(custCheckRow + brkCheckRow == 0){
				alert(getLabel('FMS_COM_ALT007') + "\n\n CM or NM");
				return;
			}	
			
			formObj.file_name.value='usda_hold_notice_02.mrd';
			formObj.title.value= formObj.f_title.value + " [HBL No : " + hblNos.substring(1, hblNos.length) + "]";

			// #266 - [BNX] EMAIL FUNCTION TO: AND CC: EMAIL from MBL List
			var v_intg_bl_seq = "";
			
			for(var i=1; i<=sheetObj.LastRow(); i++){
				
				if(v_intg_bl_seq.indexOf(sheetObj.GetCellValue(i, "intg_bl_seq")) != -1){
					continue;
				}
				
				var eml_addr = "";
				
				for(var j=1; j<=sheetObj.LastRow(); j++){
					if(sheetObj.GetCellValue(i, "intg_bl_seq") == sheetObj.GetCellValue(j, "intg_bl_seq")){
						if(sheetObj.GetCellValue(j, "cust_eml_flg") == "1"){
							if(eml_addr.indexOf(sheetObj.GetCellValue(j, "cust_eml")) == -1){
								eml_addr += sheetObj.GetCellValue(j, "cust_eml") + ";";
							}
						}
						if(sheetObj.GetCellValue(j, "brk_eml_flg") == "1"){
							if(eml_addr.indexOf(sheetObj.GetCellValue(j, "brk_eml")) == -1){
								eml_addr += sheetObj.GetCellValue(j, "brk_eml") + ";";
							}
						}
					}
				}
				
				sheetObj.SetCellValue(i, "eml_addr", eml_addr);
				
				v_intg_bl_seq += sheetObj.GetCellValue(i, "intg_bl_seq") + "&";
			}
			
			for(var i=1 ; i < sheetObj.LastRow() + 1 ; i++){
				/*if(sheetObj.GetCellValue(i , "cust_eml_flg") != 1 && sheetObj.GetCellValue(i , "brk_eml_flg") != 1 ){
					//alert("Please Check the Email Check box ! ");
					alert(getLabel('FMS_COM_ALT004'));
					return;
				}*/
				//RD File Name
				sheetObj.SetCellValue(i , "eml_tit_nm", formObj.f_title.value + " [HBL No : " + docObjects[0].GetCellValue(i, "bl_no") + ']');				
				
				var tmp =  formObj.f_title.value + "_" +docObjects[0].GetCellValue(i, "bl_no");
				tmp = tmp.replace(/\./g, "");
				tmp = tmp.replace(/\\|\/|\:|\*|\?|\"|\<|\>|\||\&|\-|\__|\s/g, "_");
				sheetObj.SetCellValue(i , "eml_mrd_nm",  tmp);
				
				
				//Email Title
				var usrEmlCon = formObj.h_usrEmlCon.value;
				var eml_ctnt = "";
				eml_ctnt += usrEmlCon;
				eml_ctnt += "\r\n";
				eml_ctnt += usrnm;
				eml_ctnt += "\r\n";
				eml_ctnt += usrEml;
				eml_ctnt += "\r\n";
				eml_ctnt += usrPhn;
				eml_ctnt += "\r\n";
				eml_ctnt += usrFax;
				eml_ctnt += "\r\n";
				sheetObj.SetCellValue(i , "eml_ctnt",eml_ctnt);
				
				//Parameter Setting
				var param='/rp ';
					param += "[" + sheetObj.GetCellValue(i , "intg_bl_seq") + "]";		// [1]
				param += '[' + formObj.ofc_eng_nm.value + ']';
				param += '[' + formObj.ofc_locl_nm.value + ']';
				param += '[' + formObj.ofc_phn.value + ']';
				param += '[' + formObj.ofc_fax.value + ']';
				param += '[' + formObj.eml.value + ']'; // $6
				param += '[' + formObj.f_title.value + ']'; 
				param += '[' + formObj.to_date.value + ']'; 
				param += '[' + formObj.by_user.value + ']';
				param += '[' + formObj.commercial.value + ']'; 
				param += '[' + formObj.fumigation.value + ']'; 
				param += '[' + formObj.guarantee.value + ']'; 
				param += '[' + formObj.remark.value + ']'; 
				param += '[' + formObj.f_sub_title.value + ']'; // $14
				
				//param += ' /riprnmargin';	
				//alert(param)
				sheetObj.SetCellValue(i , "rd_param",param);
			}
			formObj.rpt_biz_tp.value="OIM_P";
			formObj.rpt_biz_sub_tp.value="UH";
			formObj.f_cmd.value=COMMAND01;
			
			//#52724 - [BINEX] IF REPORT TITLE IS UPDATED BY USER, TO SAVE THE PDF FILE AS "UPDATED TITLE"  FILE NAME도 USER가 입력한 UPDATED TITLE로 저장되도록의 요청  
			/*사용안함 그리드 안 타이틀로 대신 생성 
			var t_attachFileName = formObj.f_title.value; 
			t_attachFileName = t_attachFileName.replace(/\./g, "");
			t_attachFileName = t_attachFileName.replace(/\\|\/|\:|\*|\?|\"|\<|\>|\||\&|\-|\__|\s/g, "_");
			if (t_attachFileName != ""){
				formObj.rpt_file_name_title.value = t_attachFileName + "_" + hblNos.substring(1, hblNos.length)+".mrd";
			}
			*/
			
			if(confirm(getLabel('FMS_COM_CFMSENDEML'))){
				sheetObj.DoAllSave("./SEE_BMD_0065GS.clt", FormQueryString(formObj), true);
			}
		}
		break;
	case 'FAX':		
		//#27552	[BINEX]H. MBL List에서 “USDA Hold”의 버튼 동작이 “Arrival Notice” 와 같이 동작 되도록
		if(sheetObj.RowCount()> 0){
			/*var iCheckRow=sheetObj.CheckedRows(1);
			if(iCheckRow == 0){
			 	alert(getLabel('FMS_COM_ALT004'));
				return;
			}*/	
			
			var custCheckRow=sheetObj.CheckedRows(6);
			var brkCheckRow=sheetObj.CheckedRows(8);
			
			if(custCheckRow + brkCheckRow == 0){
				alert(getLabel('FMS_COM_ALT007') + "\n\n CF or NF");
				return;
			}	
			
			
			// 다중선택 BL SEQ 넘기기
			var temp_intg_bl_seq="";
			var hblNos = "";
			var v_bl_no = "";
			
			for ( var i=1; i <= sheetObj.LastRow() + 1; i++) {
				if (sheetObj.GetCellValue(i, "chk") == "1") {
					
					if(v_bl_no == sheetObj.GetCellValue(i, "bl_no")){
						continue;
					}
					
					v_bl_no = sheetObj.GetCellValue(i, "bl_no");
					
					if(temp_intg_bl_seq.length <= 0) {
						// 첫번째 시퀀스는 콤마 없이
						temp_intg_bl_seq=sheetObj.GetCellValue(i, "intg_bl_seq");
					} else {
						// 두번째 부터는 콤마붙임
						temp_intg_bl_seq += " ', '" +sheetObj.GetCellValue(i, "intg_bl_seq");
					}
					hblNos += "," + sheetObj.GetCellValue(i, "bl_no");
				}
			}
			
			formObj.file_name.value='usda_hold_notice_02.mrd';
			formObj.title.value= formObj.f_title.value + " [HBL No : " + hblNos.substring(1, hblNos.length) + "]";
			
			for(var i=1 ; i < sheetObj.LastRow() + 1 ; i++){
				/*if(sheetObj.GetCellValue(i , "cust_fax_flg") != 1 && sheetObj.GetCellValue(i , "brk_fax_flg") != 1 ){
					//alert("Please Check the Fax Check box ! ");
					alert(getLabel('FMS_COM_ALT004') + "\n\n CF or BF");
					return;
				}*/
				
				//RD File Name, Email Title
				//sheetObj.SetCellValue(i , "file_name",'usda_hold_notice_02.mrd');
				sheetObj.SetCellValue(i , "eml_tit_nm",formObj.f_title.value +" [HBL No : " + docObjects[0].GetCellValue(i, "bl_no") + ']');
				//Parameter Setting
				var param='/rp '
					param += "[" + sheetObj.GetCellValue(i , "intg_bl_seq") + "]";		// [1]
				param += '[' + formObj.ofc_eng_nm.value + ']';
				param += '[' + formObj.ofc_locl_nm.value + ']';
				param += '[' + formObj.ofc_phn.value + ']';
				param += '[' + formObj.ofc_fax.value + ']';
				param += '[' + formObj.eml.value + ']'; // $6
				param += '[' + formObj.f_title.value + ']'; 
				param += '[' + formObj.to_date.value + ']'; 
				param += '[' + formObj.by_user.value + ']';
				param += '[' + formObj.commercial.value + ']'; 
				param += '[' + formObj.fumigation.value + ']'; 
				param += '[' + formObj.guarantee.value + ']'; 
				param += '[' + formObj.remark.value + ']'; 
				param += '[' + formObj.f_sub_title.value + ']'; // $14
				
				param += ' /riprnmargin';	
				sheetObj.SetCellValue(i , "rd_param",param);
			}
			formObj.rpt_biz_tp.value="OIM_P"; 
			formObj.rpt_biz_sub_tp.value="UH";
			formObj.f_cmd.value=COMMAND02;
			if(confirm(getLabel('FMS_COM_CFMSENDFAX'))){
				sheetObj.DoAllSave("./SEE_BMD_0065GS.clt", FormQueryString(formObj), true);
			}
		}
		break;
	/* jsjang 2013.7.17 short cut key */
	case "CLOSE":
		ComClosePopup(); 
		break;	
	}
}
// --------------------------------------------------------------------------------------------------------------
// AJAX 설정
//--------------------------------------------------------------------------------------------------------------
/**
 * code name select
 */
function codeNameAction2(str, obj, tmp){
	CODETYPE=str;
	var formObj=document.frm1;
	var s_code=obj.value.toUpperCase();		
	var s_type=str.substring(0,8);
	if(str == "trdpcode_dest" || str == "trdpcode_delivery") {
		s_type="trdpcode";
	}
	if (s_code != "") {
		if (tmp == "onKeyDown") {
			if (event.keyCode == 13) {
				ajaxSendPost(dispCodeNameAjaxReq2, 'reqVal',
						'&goWhere=aj&bcKey=searchCodeName&codeType=' + s_type
								+ '&s_code=' + s_code, './GateServlet.gsl');
			}
		} else if (tmp == "onBlur") {
			if (s_code != "") {
				ajaxSendPost(dispCodeNameAjaxReq2, 'reqVal',
						'&goWhere=aj&bcKey=searchCodeName&codeType=' + s_type
								+ '&s_code=' + s_code, './GateServlet.gsl');
			}
		}
	} else {
		if (CODETYPE == "trdpcode_dest") {
			formObj.trdp_cd.value="";//trdp_cd
			formObj.trdp_addr.value="";//shrt_nm
			formObj.trdp_nm.value="";//full_nm
			formObj.trdp_phn.value="";//full_nm
			formObj.trdp_fax.value="";//full_nm
		}
		if (CODETYPE == "trdpcode_delivery") {
			formObj.delivery_trdp_cd.value="";//delivery_trdp_cd
			formObj.delivery_trdp_addr.value="";//shrt_nm
			formObj.delivery_trdp_nm.value="";//full_nm
			formObj.delivery_trdp_phn.value="";//full_nm
			formObj.delivery_trdp_fax.value="";//full_nm
		}
	}
}
//코드표시 Ajax
function dispCodeNameAjaxReq2(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split(';');
			var masterVals=rtnArr[0].split('@@^');	
			if(CODETYPE =="trdpcode_dest"){
				formObj.trdp_cd.value=masterVals[0];//trdp_cd
				formObj.trdp_addr.value=masterVals[2];//shrt_nm
				formObj.trdp_nm.value=masterVals[3];//full_nm
				formObj.trdp_phn.value="";//full_nm
				formObj.trdp_fax.value="";//full_nm
			}
			if(CODETYPE =="trdpcode_delivery"){
				formObj.delivery_trdp_cd.value=masterVals[0];//delivery_trdp_cd
				formObj.delivery_trdp_addr.value=masterVals[2];//shrt_nm
				formObj.delivery_trdp_nm.value=masterVals[3];//full_nm
				formObj.delivery_trdp_phn.value="";//full_nm
				formObj.delivery_trdp_fax.value="";//full_nm
			}
		}else{
			if(CODETYPE =="trdpcode_dest"){
				formObj.trdp_cd.value="";//trdp_cd
				formObj.trdp_addr.value="";//shrt_nm
				formObj.trdp_nm.value="";//full_nm
				formObj.trdp_phn.value="";//full_nm
				formObj.trdp_fax.value="";//full_nm
			}
			if(CODETYPE =="trdpcode_delivery"){
				formObj.delivery_trdp_cd.value="";//delivery_trdp_cd
				formObj.delivery_trdp_addr.value="";//shrt_nm
				formObj.delivery_trdp_nm.value="";//full_nm
				formObj.delivery_trdp_phn.value="";//full_nm
				formObj.delivery_trdp_fax.value="";//full_nm
			}
		}
	}else{
		//Error Errupt!	
		alert(getLabel('FMS_COM_ERR001'));		
	}
}
//--------------------------------------------------------------------------------------------------------------
// IBSheet 설정
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
	frm1.to_date.value=getTodayStr(); 
	doWork('SEARCHLIST');
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
             SetConfig( { SearchMode:2, MergeSheet:7, Page:20, DataRowMerge:0 } );
             var info    = { Sort:0, ColMove:1, HeaderCheck:1, ColResize:1 };
             var headers = [ { Text:getLabel('SEE_BMD_0065_HDR1'), Align:"Center"} ];
             InitHeaders(headers, info);

             var cols = [ 
      	               {Type:"Text",      Hidden:0,  Width:143,  Align:"Left",    ColMerge:1,   SaveName:"bl_no",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0 },
      	               {Type:"Text",      Hidden:1, Width:100,  Align:"Center",  ColMerge:1,   SaveName:"cust_cd",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0 },
      	               {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:"cust_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0 },
      	               {Type:"Text",      Hidden:1, Width:100,  Align:"Center",  ColMerge:1,   SaveName:"brk_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0 },
      	               {Type:"Text",      Hidden:0,  Width:150,  Align:"Left",    ColMerge:1,   SaveName:"brk_nm",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0 },
      	               {Type:"CheckBox",  Hidden:0, Width:50,   Align:"Center",  ColMerge:1,   SaveName:"chk",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1 },
      	               {Type:"CheckBox",  Hidden:0, Width:40,   Align:"Center",  ColMerge:0,   SaveName:"cust_fax_flg",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1, TrueValue:"Y" ,FalseValue:"N" },
      	               {Type:"CheckBox",  Hidden:0, Width:40,   Align:"Center",  ColMerge:0,   SaveName:"cust_eml_flg",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1, TrueValue:"Y" ,FalseValue:"N" },
      	               {Type:"CheckBox",  Hidden:0, Width:40,   Align:"Center",  ColMerge:0,   SaveName:"brk_fax_flg",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1, TrueValue:"Y" ,FalseValue:"N" },
      	               {Type:"CheckBox",  Hidden:0, Width:40,   Align:"Center",  ColMerge:0,   SaveName:"brk_eml_flg",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1, TrueValue:"Y" ,FalseValue:"N" },
      	               {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:0,   SaveName:"intg_bl_seq",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0 },
      	               {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:0,   SaveName:"cust_fax",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0 },
      	               {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:0,   SaveName:"cust_eml",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0 },
      	               {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"brk_fax",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0 },
      	               {Type:"Text",      Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"brk_eml",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0 },
      	               {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:1,   SaveName:"cust_pic_nm",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0 },
      	               {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:1,   SaveName:"brk_pic_nm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0 },      	               
      	               {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:1,   SaveName:"sndr_eml",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0 },
      	               {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:1,   SaveName:"sndr_nm",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0 },
      	               {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:1,   SaveName:"to_eml_ctnt",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0 },
      	               {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:1,   SaveName:"cc_eml_ctnt",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0 },
      	               {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:1,   SaveName:"eml_tit_nm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0 },
      	               {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:1,   SaveName:"eml_ctnt",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0 },
      	               {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:1,   SaveName:"rd_param",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0 },
    	               {Type:"Status",    Hidden:1, Width:30,   Align:"Center",  ColMerge:1,   SaveName:"ibflag",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0 },
    	               {Type:"Text",      Hidden:1, Width:80,   Align:"Center",  ColMerge:1,   SaveName:"eml_mrd_nm",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0 },
    	               {Type:"Text",      Hidden:1, Width:120,  Align:"Left",    ColMerge:0,   SaveName:"eml_addr",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0 }];
              
             InitColumns(cols);
             SetEditable(1);
             SetSheetHeight(150);
           }                                                      
           break;
     }
}
function sheet1_OnSearchEnd(){
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	if(sheetObj.DataRows == 1){
		sheetObj.SetCellValue(1, "chk",1);
	}
	for(var i=1 ; i < sheetObj.LastRow() + 1 ; i++){
		if(sheetObj.GetCellValue(i , "cust_eml") == "" ){
			sheetObj.SetCellEditable(i , "cust_eml_flg",0);
		}
		if(sheetObj.GetCellValue(i , "cust_fax") == "" ){
			sheetObj.SetCellEditable(i , "cust_fax_flg",0);
		}
		if(sheetObj.GetCellValue(i , "brk_fax") == "" ){
			sheetObj.SetCellEditable(i , "brk_fax_flg",0);
		}
		if(sheetObj.GetCellValue(i , "brk_eml") == "" ){
			sheetObj.SetCellEditable(i , "brk_eml_flg",0);
		}
	}
} 
function sheet1_OnSaveEnd(sheetObj, errMsg){
	var formObj=document.frm1;
	for(var i=1 ; i < sheetObj.LastRow() + 1 ; i++){
		if(sheetObj.GetCellValue(i , "cust_eml") == "" ){
			sheetObj.SetCellEditable(i , "cust_eml_flg",0);
		}
		if(sheetObj.GetCellValue(i , "cust_fax") == "" ){
			sheetObj.SetCellEditable(i , "cust_fax_flg",0);
		}
		if(sheetObj.GetCellValue(i , "brk_fax") == "" ){
			sheetObj.SetCellEditable(i , "brk_fax_flg",0);
		}
		if(sheetObj.GetCellValue(i , "brk_eml") == "" ){
			sheetObj.SetCellEditable(i , "brk_eml_flg",0);
		}
		// #266 - [BNX] EMAIL FUNCTION TO: AND CC: EMAIL from MBL List
		sheetObj.SetCellValue(i , "eml_addr", "");
	}
	if(errMsg == ""){
		if(formObj.f_cmd.value == COMMAND01){
			alert(getLabel('FMS_COM_ALT056'));
		}else if(formObj.f_cmd.value == COMMAND02){
			alert(getLabel('FMS_COM_ALT057'));
		}
	}	
}
function getRptMailParameters(reqVal){
	var formObj=document.frm1;
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK") {
		if (typeof(doc[1]) != 'undefined' && doc[1] != undefined && doc[1] != "") {
			formObj.mailTo.value=doc[1];
		}
	}
}

function sheet1_OnSort(sheetObj, col, sortArrow) {
 sheetObj.SetSelectRow(sheetObj.HeaderRows());
}

function getPdfFileNm(){
	var formObj=document.frm1;
	var pdfFileNm = "";
	var ref_no = formObj.ref_no.value;
	
	if (ref_no == "" || ref_no == "undefined" || ref_no == undefined) {
		return "";
	}
	pdfFileNm = "USDA_FilingNo_"+ref_no;	
	return pdfFileNm;
}

function sheet1_OnChange(sheetObj, Row, Col){
	var formObj=document.frm1;
    switch (sheetObj.ColSaveName(Col)) {
        case "chk" :
    		for(var i=1 ; i < sheetObj.LastRow() + 1 ; i++){
    			if(sheetObj.GetCellValue(Row,"bl_no") == sheetObj.GetCellValue(i,"bl_no")){
    				sheetObj.SetCellValue(i, "chk", sheetObj.GetCellValue(Row,"chk"));
    			}
    		}
    }
}