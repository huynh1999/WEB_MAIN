function doWork(srcName){
    //탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한
    var sheetObj=docObjects[0];
    var formObj=document.frm1;
    switch(srcName) {
      
    	case "CLOSE":
    		window.close();
   	    break;	  
    
    	case "SEARCHLIST":
    	    doShowProcess();
            formObj.f_cmd.value=SEARCHLIST;
                        
            sheetObj.DoSearch("./EDI_VGM_0010GS.clt", FormQueryString(formObj));
       break;
		//Booking EDI 전송 
       case "SEND_EDI":
    		if(sheetObj.GetTotalRows()== 0){
    			return;
			}
    	   
			if (!vgmEdiValidation(sheetObj,'S')){
				return;
			}
		    formObj.f_cmd.value=COMMAND01;
		    if(confirm(getLabel('FMS_COM_CFMSENDEDI'))){
		    	sheetObj.DoAllSave("./EDI_VGM_0010GS.clt", FormQueryString(formObj) +'&f_vgm_cancel=N', false);
		    }
		    
		    formObj.msg_sts_nm.value = "Sending";
		    
		break;
       case "SEND_CANCEL_EDI":
    	   if(sheetObj.GetTotalRows()== 0){
    		   return;
    	   }
    	   if (!vgmEdiValidation(sheetObj,'C')){
    		   return;
    	   }
    	   formObj.f_cmd.value=COMMAND01;
		   if(confirm(getLabel('FMS_COM_CFMCAN'))){
		    	sheetObj.DoAllSave("./EDI_VGM_0010GS.clt", FormQueryString(formObj) +'&f_vgm_cancel=Y', false);
		   }
		break;
    }
}
//--------------------------------------------------------------------------------------------------------------
//                                             IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
var docObjects=new Array();

/**
 * Sheet 기본 설정 및 초기화
 * body 태그의 onLoad 이벤트핸들러 구현
 * 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
 */
function loadPage() {
    var formObj=document.frm1;
	for(var i=0;i<docObjects.length;i++){
        //khlee-시작 환경 설정 함수 이름 변경
        comConfigSheet(docObjects[i], SYSTEM_FIS);
        initSheet(docObjects[i],i+1);
        //khlee-마지막 환경 설정 함수 추가
        comEndConfigSheet(docObjects[i]);
    }
	doWork("SEARCHLIST");
}
/**
 * IBSheet Object를 배열로 등록
 * 향후 다른 항목들을 일괄처리할 필요가 있을 때 배열로 담는 프로세스를 추가할 수 있다
 * 배열은 소스 상단에 정의
 */
function setDocumentObject(sheet_obj){
   docObjects[0]=sheet_obj;
}
/**
 * 시트 초기설정값, 헤더 정의
 * param : sheetObj ==> 시트오브젝트, sheetNo ==> 시트오브젝트 태그의 아이디에 붙인 일련번호
 * 시트가 다수일 경우 시트 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
 */
function initSheet(sheetObj,sheetNo) {
    switch(sheetNo) {
        
		 // eVGM - Container
		case 1:		//eVGM - Container List 그리드
		
			with(sheetObj){
			
			SetConfig( { SearchMode:2, MergeSheet:5, Page:20, DataRowMerge:1, TabStop:0 } );
			
			var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
			var headers = [ { Text:getLabel('SEE_BMD_HDR21'), Align:"Center"} ];
			InitHeaders(headers, info);
			
			var cols = [ {Type:"Status",    Hidden:1, Width:40,   Align:"Center",  ColMerge:0,   SaveName:"vgmls_ibflag" },
			             {Type:"Seq",      Hidden:0,  Width:40,   Align:"Center",  ColMerge:0,   SaveName:"Seq",                KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,   SaveName:"cntr_no",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:14 },
			             {Type:"Text",      Hidden:1,  Width:90,   Align:"Left",    ColMerge:0,   SaveName:"seal_no1",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:20 },
			             {Type:"Combo",     Hidden:1,  Width:100,   Align:"Left",    ColMerge:0,   SaveName:"seal_tp1",         	 KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",      Hidden:1,  Width:90,   Align:"Left",    ColMerge:0,   SaveName:"seal_no2",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:20 },
			             {Type:"Combo",     Hidden:1,  Width:100,   Align:"Left",    ColMerge:0,   SaveName:"seal_tp2",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Float",     Hidden:0,  Width:90,   Align:"Right",   ColMerge:0,   SaveName:"vgm_cgo_wgt",            KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:2,   UpdateEdit:0,   InsertEdit:0,   EditLen:10 },
			             {Type:"Combo",     Hidden:0, Width:50,   Align:"Left",    ColMerge:0,   SaveName:"vgm_cgo_wgt_tp",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Date",      Hidden:0,  Width:80,    Align:"Center",  ColMerge:1,   SaveName:"vgm_dt",      			KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Date",      Hidden:0,  Width:80,    Align:"Center",  ColMerge:1,   SaveName:"vgm_tm",      			KeyField:0,   CalcLogic:"",   Format:"Hm",         PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Combo",     Hidden:0, Width:100,   Align:"Left",    ColMerge:0,   SaveName:"vgm_method",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Combo",     Hidden:0, Width:120,   Align:"Left",    ColMerge:0,   SaveName:"vgm_cntr_tp",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"PopupEdit", Hidden:0,  Width:80,   Align:"Left",    ColMerge:1,   SaveName:"vgm_spc_trdp_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:20 },
			             {Type:"Text",      Hidden:0,  Width:180,  Align:"Left",    ColMerge:1,   SaveName:"vgm_spc_trdp_nm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:50 },
			             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"vgm_spc_trdp_pic",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:50 },
			             {Type:"PopupEdit", Hidden:0,  Width:80,   Align:"Left",    ColMerge:1,   SaveName:"vgm_am_trdp_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:20 },
	    	             {Type:"Text",      Hidden:0,  Width:180,  Align:"Left",    ColMerge:1,   SaveName:"vgm_am_trdp_nm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:50 },
	    	             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:"vgm_am_trdp_pic",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:1,   UpdateEdit:0,   InsertEdit:0,   EditLen:50 },
	    	             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"vgm_seq",       			KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"intg_bl_seq",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
			             {Type:"Text",      Hidden:1, Width:0,    Align:"Center",  ColMerge:0,   SaveName:"cntr_list_seq",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 } ];
			
			InitColumns(cols);
			
			SetCountPosition(0);
			SetEditable(1);
			SetUseDefaultTime(0);
            SetColProperty('seal_tp1', {ComboText:SEALPTYCD1, ComboCode:SEALPTYCD2} );
            SetColProperty('seal_tp2', {ComboText:SEALPTYCD1, ComboCode:SEALPTYCD2} );
			SetColProperty('vgm_cgo_wgt_tp',{ComboText:VGMWGTCD1, ComboCode:VGMWGTCD2} );
			SetColProperty('vgm_method', {ComboText:VGMMETHODCD1, ComboCode:VGMMETHODCD2} );
			SetColProperty('vgm_cntr_tp', {ComboText:VGMCNTRTPCD1, ComboCode:VGMCNTRTPCD2});
			SetColProperty(0 ,"vgm_am_trdp_pic" , {AcceptKeys:"E|N|[-,/ .;:]" , InputCaseSensitive:1});
			SetColProperty(0 ,"vgm_spc_trdp_pic" , {AcceptKeys:"E|N|[-,/ .;:]" , InputCaseSensitive:1});
			  
			SetSheetHeight(300);
			
			//sheetObj.SetFocusAfterProcess(0);
		}
		break;
    
     }
}

//조회 후 페이지징 표시
function sheet1_OnSearchEnd(sheetObj, errMsg) {
	doHideProcess();
	var msg_err_cd =  docObjects[0].GetCellValue(1, "msg_err_cd");
	document.frm1.f_msg_err_cd.value = msg_err_cd;
}
function sheet1_OnSaveEnd(obj, ErrMsg){
	doWork("SEARCHLIST");
}
function vgmEdiValidation(sheetObj, sendType) {

	var formObj = document.frm1;
	var valMsgArr = new Array();
	//SI EDI Validation check 와 동일
	// 1.VGM 허용된 선사인가? Com_Cd로 조회 > EDI:E006, EML:E007	
	var ediLnrList = new Array();
	var emlLnrList = new Array();
	var existLnrList = false;

	var isEdiCarr = false;
	var isEmlCarr = false;
	
	var lnr_cd = formObj.carr_trdp_cd.value;

	// Carrier For EDI
	if (trim(EDILNRCD) != "") {
		ediLnrList = EDILNRCD.split("|");
		if ( ediLnrList.length > 0){
			
			for (var i=0;i<ediLnrList.length;i++) {
				if (ediLnrList[i] == lnr_cd) {
					isEdiCarr = true;
					break;
				}
			}
			
		}
	}
	
	// Carrier For EML
	if (trim(EMLLNRCD) != "") {
		emlLnrList = EMLLNRCD.split("|");
		if ( emlLnrList.length > 0){
			for (var i=0;i<emlLnrList.length;i++) {
				if (emlLnrList[i] == lnr_cd) {
					isEmlCarr = true;
					break;
				}
			}
		}
	}
	
	// EDI, EML 선사가 아니면 Error
	if (!isEdiCarr && !isEmlCarr) {
		valMsgArr.push(getLabel('EDI_COM_ALT009'));
	}

	
	// EML 선사인데 Email이 없으면 
	//var carrPicEml = formObj.carr_pic_eml.value;
	/*if (isEmlCarr && trim(carrPicEml)=="") {
		alert(getLabel('FMS_COM_ALT007') + "\n - Carrier's Email");
		formObj.carr_pic_eml.focus();
		return false;
	}*/
	
	
	// form 값 check
	var carrTrpdNm = formObj.f_lnr_trdp_nm.value;
	var carrBkgNo = formObj.f_lnr_bkg_no.value;
	var msg_sts = formObj.msg_sts.value;
	var msg_fnc_cd = formObj.msg_fnc_cd.value;

	// form null check
	if (trim(carrTrpdNm) == "") {  
		valMsgArr.push(getLabel('EDI_COM_ALT022'));
	}
	if (trim(carrBkgNo) == "") {  
		valMsgArr.push(getLabel('EDI_COM_ALT043'));
	}
	if((msg_sts == "S" || msg_sts == "T") && sendType == "S"){
		valMsgArr.push(getLabel('EDI_COM_ALT030'));
	}
	if(msg_fnc_cd == "" && sendType == "C"){
		valMsgArr.push(getLabel('EDI_COM_ALT031'));
	}

	// Cntr > 0
	if (sheetObj.GetTotalRows() == 0){
		valMsgArr.push(getLabel('EDI_COM_ALT018'));
	}
		
	// Cntr값 체크 
	for (var i=1; i<sheetObj.LastRow()+1; i++) {
		
		var cntr_no	         = sheetObj.GetCellValue(i, "cntr_no");
		var seal_no1         = sheetObj.GetCellValue(i, "seal_no1");
		var seal_tp1         = sheetObj.GetCellValue(i, "seal_tp1");
		var seal_no2         = sheetObj.GetCellValue(i, "seal_no2");
		var seal_tp2         = sheetObj.GetCellValue(i, "seal_tp2");
		var vgm_cgo_wgt      = sheetObj.GetCellValue(i, "vgm_cgo_wgt");
		var vgm_cgo_wgt_tp   = sheetObj.GetCellValue(i, "vgm_cgo_wgt_tp");
		var vgm_dt           = sheetObj.GetCellValue(i, "vgm_dt");
		var vgm_method       = sheetObj.GetCellValue(i, "vgm_method");
		var vgm_tm           = sheetObj.GetCellValue(i, "vgm_tm");
		var vgm_cntr_tp      = sheetObj.GetCellValue(i, "vgm_cntr_tp");
		var vgm_am_trdp_cd   = sheetObj.GetCellValue(i, "vgm_am_trdp_cd");
		var vgm_am_trdp_nm   = sheetObj.GetCellValue(i, "vgm_am_trdp_nm");
		var vgm_am_trdp_pic  = sheetObj.GetCellValue(i, "vgm_am_trdp_pic");
		var vgm_spc_trdp_cd  = sheetObj.GetCellValue(i, "vgm_spc_trdp_cd");
		var vgm_spc_trdp_nm  = sheetObj.GetCellValue(i, "vgm_spc_trdp_nm");
		var vgm_spc_trdp_pic = sheetObj.GetCellValue(i, "vgm_spc_trdp_pic");

		//Cntr NO Check 
		if (trim(cntr_no)=="") {
			valMsgArr.push("Row["+ i +"] : " +  getLabel('EDI_COM_ALT041'));
		}
		
		//Seal TP Check 
		/*
		if (trim(seal_no1) != "" && trim(seal_tp1)=="") {
			alert(getLabel('FMS_COM_ALT007') + "\n - " + cntr_no +" : Seal1 Type");
			sheetObj.SelectCell(i,"seal_tp1");
			return false;
		}
		if (trim(seal_no2) != "" && trim(seal_tp2)=="") {
			alert(getLabel('FMS_COM_ALT007') + "\n - " + cntr_no +" : Seal2 Type");
			sheetObj.SelectCell(i,"seal_tp2");
			return false;
		}
		*/
		
		//VGM Weight Check 
		if (trim(vgm_cgo_wgt) == "" || trim(vgm_cgo_wgt)=="0.00") {
			valMsgArr.push("Row["+ i +"] : " +  getLabel('EDI_COM_ALT044'));
		}
		
		//VGM Type Check 
		if (trim(vgm_cgo_wgt_tp) == "") {
			valMsgArr.push("Row["+ i +"] : " +  getLabel('EDI_COM_ALT045'));
		}
		
		//VGM Date Check 
		if (trim(vgm_dt) == "") {
			valMsgArr.push("Row["+ i +"] : " +  getLabel('EDI_COM_ALT046'));
		}

		//VGM Time Check 
		if (trim(vgm_tm) == "") {
			valMsgArr.push("Row["+ i +"] : " +  getLabel('EDI_COM_ALT047'));
		}
		
		//VGM Method Check 
		if (trim(vgm_method) == "") {
			valMsgArr.push("Row["+ i +"] : " +  getLabel('EDI_COM_ALT048'));
		}
		
		//VGM Supplier Check 
		if (trim(vgm_cntr_tp) == "") {
			valMsgArr.push("Row["+ i +"] : " +  getLabel('EDI_COM_ALT049'));
		}

		//VGM SPC NM Check 
		if (trim(vgm_spc_trdp_nm) == "") {
			valMsgArr.push("Row["+ i +"] : " +  getLabel('EDI_COM_ALT050'));
		}

		//VGM SPC PIC Check 
		if (trim(vgm_spc_trdp_pic) == "") {
			valMsgArr.push("Row["+ i +"] : " +  getLabel('EDI_COM_ALT051'));
		}

		//VGM AM NM이 있을경우 AM PIC Check 또는  VGM AM PIC가 있을경우 AM NM Check 
		if (trim(vgm_am_trdp_nm) == "" && trim(vgm_am_trdp_pic) != "") {
			valMsgArr.push("Row["+ i +"] : " +  getLabel('EDI_COM_ALT052'));
		}
		if (trim(vgm_am_trdp_nm) != "" && trim(vgm_am_trdp_pic) == "") {
			valMsgArr.push("Row["+ i +"] : " +  getLabel('EDI_COM_ALT053'));
		}
	}
	
	if(valMsgArr.length > 0){
    	formObj.val_msg.value = "";
    	for(var i=0; i<valMsgArr.length; i++){
    		formObj.val_msg.value += ((i+1) + ". " + valMsgArr[i] + "\n");
	    }
    	disp_val_msg.style.display='inline';
    	return false;
    }
	
    return true;
}

