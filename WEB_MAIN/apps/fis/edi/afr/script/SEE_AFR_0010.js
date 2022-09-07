//=========================================================
//*@FileName   : SEE_AFR_0010.jsp

//*@FileTitle  : 일본 세관 화물적화목록 EDI 처리
//*@Description: 일본 세관 화물적화목록 EDI 처리
//*@author     : Park,Cheol-Woo - Cyberlogitec
//*@version    : 1.0 - 04/20/2016
//*@since      : 04/20/2016
//=========================================================
/**
 * 화면로드 후 초기값 세팅
 */
var TODAY;
function initFinish(){
	var pDoc=parent.parent.parent.document;
	hideProcess('WORKING', pDoc);
	setFromToDtEndPlus(document.frm1.f_etd_str_dt, 15, document.frm1.f_etd_end_dt, 20);
}

var rtnary=new Array(1);
var callBackFunc = "";
function doWork(srcName, valObj){
	switch(srcName) {
		case "SEARCHLIST01":	//조회
			frm1.val_msg.value = "";
			frm1.f_cmd.value=SEARCHLIST01;
			docObjects[0].DoSearch("SEE_AFR_0010GS.clt",   FormQueryString(frm1) );
		break;
		case "COMMAND01":		
			frm1.val_msg.value = "";
			if(docObjects[0].CheckedRows("chk") == 0){
        		alert(getLabel('FMS_COM_ALT004') );
        		return;
        	}
			if (!afrEdiValidation(docObjects[0], srcName)){
    			return false;
    		}
			setTimeout(function(){
				if( confirm(getLabel('FMS_COM_CFMSENDEDI')) ){
					frm1.f_cmd.value=COMMAND01;
					var param = FormQueryString(frm1);
					docObjects[0].DoSave("./SEE_AFR_0010GS.clt", param,"ibflag", false);
				}
			},100);
		break;
		case "COMMAND02":		//Delete Transmit
			frm1.val_msg.value = "";
			if(docObjects[0].CheckedRows("chk") == 0){
        		alert(getLabel('FMS_COM_ALT004') );
        		return;
        	}
			if (!afrEdiValidation(docObjects[0], srcName)){
    			return false;
    		}
			setTimeout(function(){
				if(confirm("DELETE : " + getLabel('FMS_COM_CFMSENDEDI'))){
					frm1.f_cmd.value=COMMAND02;
					var param = FormQueryString(frm1);
					docObjects[0].DoSave("./SEE_AFR_0010GS.clt", param,"ibflag", false);
				}
			},100);
		break;
		case "COMMAND03":		//Completion Transmit
			frm1.val_msg.value = "";
			if(docObjects[0].CheckedRows("chk") == 0){
        		alert(getLabel('FMS_COM_ALT004') );
        		return;
        	}
			for(var i=2; i<=docObjects[0].RowCount(); i++){
				if(docObjects[0].GetCellValue(i, "chk") == 1){
					if(docObjects[0].GetCellValue(i, "hbl_cmpl_flg") == "Y"){
						alert(getLabel('EDI_COM_ALT182'));
						return;
					}
	    		}
			}
			setTimeout(function(){
				if(confirm("HBL Completion : " + getLabel('FMS_COM_CFMSENDEDI'))){
					frm1.f_cmd.value=COMMAND03;
					var param = FormQueryString(frm1);
					docObjects[0].DoSave("./SEE_AFR_0010GS.clt", param,"ibflag", false);
				}
			},100);
		break;
		case "COMMAND10":		//Excel
			docObjects[0].Down2Excel( {DownCols: makeHiddenSkipCol(docObjects[0]), SheetDesign:1,Merge:1 });
		break;
		
		case "POD_LOCATION_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
       		rtnary=new Array(3);
      		rtnary[0]="S";
	   		rtnary[1]="BL";
	   		// 2011.12.27 value parameter
	   		if(typeof(valObj)!='undefined'){
	   			rtnary[2]=frm1.f_pod_nm.value;
	   		}else{
	   			rtnary[2]="";
	   		}
	   		rtnary[3]="";
	   		rtnary[4]=frm1.f_pod_cd;
	   		
	   		callBackFunc = "POD_LOCATION_POPLIST";
  	        modal_center_open('./CMM_POP_0030.clt',  rtnary, 806,440,"yes");
	       
		break;
		
		case "EDI_BL_SAVE":
			
			var msg_sts_cd ='';
			for(var i=2; i<=docObjects[0].LastRow(); i++){
				if(docObjects[0].GetCellValue(i, "ibflag") == "U"){
					msg_sts_cd 	= docObjects[0].GetCellValue(i, "msg_sts_cd");
					if(msg_sts_cd == "S"){ // Sent
						alert(getLabel('EDI_COM_ALT276') );
						docObjects[0].SetCellValue(i, "ibflag", "R");
						return;
					}
					
				}
			}	
			
			if (!afrEdiValidation(docObjects[0], srcName)){
    			return false;
    		}
			
            frm1.f_cmd.value=COMMAND04;
            var param = FormQueryString(frm1);
			docObjects[0].DoSave("./SEE_AFR_0010GS.clt", param,"ibflag", "U");
		break;
	}
}


function afrEdiValidation(sheetObj, cmd){
	var formObj=document.frm1;	
	var valMsgArr = new Array();

	for(var i=2; i<sheetObj.LastRow() + 1; i++){
		
		//Validation for saving
		if(cmd == 'EDI_BL_SAVE' && (sheetObj.GetCellValue(i, "ibflag") == "U" || sheetObj.GetCellValue(i, "ibflag") == "I")){
			var mk_txt 			= sheetObj.GetCellValue(i, "mk_txt");
			var desc_txt 		= sheetObj.GetCellValue(i, "desc_txt");
			var row = i - 1;
			
			//Check length remark
			if(mk_txt.length > 140){	//
				valMsgArr.push("Row["+ row +"] : " +  getLabel('EDI_COM_ALT278'));
			}			
			//Check length desc
			if(desc_txt.length > 350){	//
				valMsgArr.push("Row["+ row +"] : " +  getLabel('EDI_COM_ALT279'));
			}
		} else if(sheetObj.GetCellValue(i, "chk") == 1){
			
			var msg_sts_cd 			= sheetObj.GetCellValue(i, "msg_sts_cd");
			var cstms_rgst_flg 		= sheetObj.GetCellValue(i, "cstms_rgst_flg");
			var shpr_trdp_nm 		= sheetObj.GetCellValue(i, "shpr_trdp_nm");
			var shpr_trdp_phn 		= sheetObj.GetCellValue(i, "shpr_trdp_phn");
			var shpr_trdp_addr 		= sheetObj.GetCellValue(i, "shpr_trdp_addr");
			var shpr_trdp_cnt_cd 	= sheetObj.GetCellValue(i, "shpr_trdp_cnt_cd");
			var cnee_trdp_nm 		= sheetObj.GetCellValue(i, "cnee_trdp_nm");
			var cnee_trdp_phn 		= sheetObj.GetCellValue(i, "cnee_trdp_phn");
			var cnee_trdp_addr 		= sheetObj.GetCellValue(i, "cnee_trdp_addr");
			var cnee_trdp_cnt_cd 	= sheetObj.GetCellValue(i, "cnee_trdp_cnt_cd");
			var ntfy_trdp_nm 		= sheetObj.GetCellValue(i, "ntfy_trdp_nm");
			var ntfy_trdp_phn 		= sheetObj.GetCellValue(i, "ntfy_trdp_phn");
			var ntfy_trdp_addr 		= sheetObj.GetCellValue(i, "ntfy_trdp_addr");
			var ntfy_trdp_cnt_cd 	= sheetObj.GetCellValue(i, "ntfy_trdp_cnt_cd");
			
			var lnr_scac_cd 	= sheetObj.GetCellValue(i, "lnr_scac_cd");
			var lnr_trdp_nm 	= sheetObj.GetCellValue(i, "lnr_trdp_nm");
			var call_sgn_cd 	= sheetObj.GetCellValue(i, "call_sgn_cd");
			var trnk_vsl_nm 	= sheetObj.GetCellValue(i, "trnk_vsl_nm");
			var trnk_voy_no 	= sheetObj.GetCellValue(i, "trnk_voy_no");
			var etd_dt_tm 		= sheetObj.GetCellValue(i, "etd_dt_tm");
			var etd_tmzn_val 	= sheetObj.GetCellValue(i, "etd_tmzn_val");
			var eta_dt_tm 		= sheetObj.GetCellValue(i, "eta_dt_tm");
			var org_un_pol_cd 	= sheetObj.GetCellValue(i, "org_un_pol_cd");
			var un_pol_cd 		= sheetObj.GetCellValue(i, "un_pol_cd");
			
			var un_pod_cd 		= sheetObj.GetCellValue(i, "un_pod_cd");
			var un_del_cd 		= sheetObj.GetCellValue(i, "un_del_cd");
			var rep_cmdt_cd 	= sheetObj.GetCellValue(i, "rep_cmdt_cd");
			var pck_qty 		= sheetObj.GetCellValue(i, "pck_qty");
			var pck_ut_cd 		= sheetObj.GetCellValue(i, "pck_ut_cd");
			var grs_wgt 		= sheetObj.GetCellValue(i, "grs_wgt");
			var wgt_ut_cd 		= sheetObj.GetCellValue(i, "wgt_ut_cd");
			var meas 			= sheetObj.GetCellValue(i, "meas");
			
			var meas_ut_cd 		= sheetObj.GetCellValue(i, "meas_ut_cd");
			var mk_txt 			= sheetObj.GetCellValue(i, "mk_txt");
			var desc_txt 		= sheetObj.GetCellValue(i, "desc_txt");
			var cntr_cnt 		= sheetObj.GetCellValue(i, "cntr_cnt");
			var cntr_blank_cnt 	= sheetObj.GetCellValue(i, "cntr_blank_cnt");
			var imdg_cd 		= sheetObj.GetCellValue(i, "imdg_cd");
			var undg_no 		= sheetObj.GetCellValue(i, "undg_no");
			
			var row = i - 1;
			
			//Mandatory Checking Logic 추가
			if(msg_sts_cd == "S"){	//Sent
				valMsgArr.push("Row["+ row +"] : " +  getLabel('EDI_COM_ALT076'));
			}
			//
			//alert(cmd);
			if(cstms_rgst_flg == "N" && (cmd =="COMMAND02" || cmd =="COMMAND03")){
				valMsgArr.push("Row["+ row +"] : " +  getLabel('EDI_COM_ALT181'));
			}
			
			if(cntr_cnt == 0){	//
				ajaxSendPost(getEdiAfrValidateInfo, 'reqVal', '&goWhere=aj&bcKey=getEdiAfrValidateInfo&intg_bl_seq='+sheetObj.GetCellValue(i, "intg_bl_seq"), './GateServlet.gsl');
				
				if(formObj.cntr_cnt.value == 0){
					valMsgArr.push("Row["+ row +"] : " +  getLabel('EDI_COM_ALT088'));
				}
			}
			
			if(shpr_trdp_nm == ""){	//
				valMsgArr.push("Row["+ row +"] : " +  "Shipper Name"+getLabel('EDI_COM_ALT256'));
			}
			if(shpr_trdp_phn == ""){	//
				valMsgArr.push("Row["+ row +"] : " +  "Shipper Telephone"+getLabel('EDI_COM_ALT256'));
			}
			if(shpr_trdp_addr == ""){	//
				valMsgArr.push("Row["+ row +"] : " +  "Shipper Address"+getLabel('EDI_COM_ALT256'));
			}
			if(shpr_trdp_cnt_cd == ""){	//
				valMsgArr.push("Row["+ row +"] : " +  "Shipper Country"+getLabel('EDI_COM_ALT256'));
			}
			if(cnee_trdp_nm == ""){	//
				valMsgArr.push("Row["+ row +"] : " +  "Consignee Name"+getLabel('EDI_COM_ALT256'));
			}
			if(cnee_trdp_phn == ""){	//
				valMsgArr.push("Row["+ row +"] : " +  "Consignee Telephone"+getLabel('EDI_COM_ALT256'));
			}
			if(cnee_trdp_addr == ""){	//
				valMsgArr.push("Row["+ row +"] : " +  "Consignee Address"+getLabel('EDI_COM_ALT256'));
			}
			if(cnee_trdp_cnt_cd == ""){	//
				valMsgArr.push("Row["+ row +"] : " +  "Consignee Country"+getLabel('EDI_COM_ALT256'));
			}
			if(ntfy_trdp_nm == ""){	//
				valMsgArr.push("Row["+ row +"] : " +  "Notify Name"+getLabel('EDI_COM_ALT256'));
			}
			if(ntfy_trdp_phn == ""){	//
				valMsgArr.push("Row["+ row +"] : " +  "Notify Telephone"+getLabel('EDI_COM_ALT256'));
			}
			if(ntfy_trdp_addr == ""){	//
				valMsgArr.push("Row["+ row +"] : " +  "Notify Address"+getLabel('EDI_COM_ALT256'));
			}
			if(ntfy_trdp_cnt_cd == ""){	//
				valMsgArr.push("Row["+ row +"] : " +  "Notify Country"+getLabel('EDI_COM_ALT256'));
			}
			if(lnr_scac_cd == ""){	//
				valMsgArr.push("Row["+ row +"] : " +  "Carrier Scac"+getLabel('EDI_COM_ALT256'));
			}
			if(lnr_trdp_nm == ""){	//
				valMsgArr.push("Row["+ row +"] : " +  "Carrier Name"+getLabel('EDI_COM_ALT256'));
			}
			if(call_sgn_cd == ""){	//
				valMsgArr.push("Row["+ row +"] : " +  "Vessel Call Sign"+getLabel('EDI_COM_ALT256'));
			}
			if(trnk_vsl_nm == ""){	//
				valMsgArr.push("Row["+ row +"] : " +  "Vessel Name"+getLabel('EDI_COM_ALT256'));
			}
			if(trnk_voy_no == ""){	//
				valMsgArr.push("Row["+ row +"] : " +  "Voyage"+getLabel('EDI_COM_ALT256'));
			}
			if(etd_dt_tm == ""){	//
				valMsgArr.push("Row["+ row +"] : " +  "ETD"+getLabel('EDI_COM_ALT256'));
			}
			if(etd_tmzn_val == ""){	//
				valMsgArr.push("Row["+ row +"] : " +  "ETD GMT"+getLabel('EDI_COM_ALT256'));
			}
			if(eta_dt_tm == ""){	//
				valMsgArr.push("Row["+ row +"] : " +  "ETA"+getLabel('EDI_COM_ALT256'));
			}
			if(org_un_pol_cd == ""){	//
				valMsgArr.push("Row["+ row +"] : " +  "ORG POL"+getLabel('EDI_COM_ALT256'));
			}
			if(un_pol_cd == ""){	//
				valMsgArr.push("Row["+ row +"] : " +  "POL"+getLabel('EDI_COM_ALT256'));
			}
			if(un_pod_cd == ""){	//
				valMsgArr.push("Row["+ row +"] : " +  "POD"+getLabel('EDI_COM_ALT256'));
			}
			if(un_del_cd == ""){	//
				valMsgArr.push("Row["+ row +"] : " +  "DEL"+getLabel('EDI_COM_ALT256'));
			}
			if(rep_cmdt_cd == ""){	//
				valMsgArr.push("Row["+ row +"] : " +  "HS Code"+getLabel('EDI_COM_ALT256'));
			}
			if(pck_qty == 0){	//
				valMsgArr.push("Row["+ row +"] : " +  "Package"+getLabel('EDI_COM_ALT256'));
			}
			if(pck_ut_cd == 0){	//
				valMsgArr.push("Row["+ row +"] : " +  "Package Unit"+getLabel('EDI_COM_ALT256'));
			}
			if(grs_wgt == 0){	//
				valMsgArr.push("Row["+ row +"] : " +  "Weight"+getLabel('EDI_COM_ALT256'));
			}
			if(meas == 0){	//
				valMsgArr.push("Row["+ row +"] : " +  "CBM"+getLabel('EDI_COM_ALT256'));
			}
			
			if(mk_txt == ""){	//
				valMsgArr.push("Row["+ row +"] : " +  "Mark"+getLabel('EDI_COM_ALT256'));
			}
			if(desc_txt == ""){	//
				valMsgArr.push("Row["+ row +"] : " +  "Description"+getLabel('EDI_COM_ALT256'));
			}
			if(cntr_blank_cnt != 0){	//
				valMsgArr.push("Row["+ row +"] : " +  "Container No"+getLabel('EDI_COM_ALT256'));
			}
			
			if(imdg_cd != "" && undg_no == ""){	//
				valMsgArr.push("Row["+ row +"] : " +  "UN No."+getLabel('EDI_COM_ALT256'));
			}
			if(imdg_cd == "" && undg_no != ""){	//
				valMsgArr.push("Row["+ row +"] : " +  "IMDG Code"+getLabel('EDI_COM_ALT256'));
			}
			
			//Check length remark
			if(mk_txt.length > 140){	//
				valMsgArr.push("Row["+ row +"] : " +  getLabel('EDI_COM_ALT278'));
			}
			
			//Check length desc
			if(desc_txt.length > 350){	//
				valMsgArr.push("Row["+ row +"] : " +  getLabel('EDI_COM_ALT279'));
			}
			
			if(!ComIsContainsCharsOnly(shpr_trdp_nm, FORMAT_EDI_AFR)){
				valMsgArr.push("Row["+ row +"] : " +  getLabel('EDI_COM_ALT152'));
			}
			
			if(!ComIsContainsCharsOnly(shpr_trdp_addr, FORMAT_EDI_AFR)){
				valMsgArr.push("Row["+ row +"] : " +  getLabel('EDI_COM_ALT153'));
			}
			
			if(!ComIsContainsCharsOnly(cnee_trdp_nm, FORMAT_EDI_AFR)){
				valMsgArr.push("Row["+ row +"] : " +  getLabel('EDI_COM_ALT161'));
			}
			
			if(!ComIsContainsCharsOnly(cnee_trdp_addr, FORMAT_EDI_AFR)){
				valMsgArr.push("Row["+ row +"] : " +  getLabel('EDI_COM_ALT162'));
			}
			
			
			if(!ComIsContainsCharsOnly(ntfy_trdp_nm, FORMAT_EDI_AFR)){
				valMsgArr.push("Row["+ row +"] : " +  getLabel('EDI_COM_ALT170')); 
			}
			
			if(!ComIsContainsCharsOnly(ntfy_trdp_addr, FORMAT_EDI_AFR)){
				valMsgArr.push("Row["+ row +"] : " +  getLabel('EDI_COM_ALT171')); 
			}
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

/**
 * 화면에서 사용하는 메소드
 * 
 * @param doWhat
 * @param formObj
 * @return
 */
function doDisplay(doWhat, formObj) {
	switch (doWhat) {
	case 'DATE1': // 달력 조회 From ~ To 팝업 호출
		cal=new ComCalendarFromTo();
		cal.displayType = "date";
		cal.select(formObj.f_etd_str_dt, formObj.f_etd_end_dt, 'MM-dd-yyyy');
		break;
	case 'DATE2': // 달력 조회 From ~ To 팝업 호출
		cal=new ComCalendarFromTo();
		cal.displayType = "date";
		cal.select(formObj.f_eta_str_dt, formObj.f_eta_end_dt, 'MM-dd-yyyy');
		break;
	}
}

//--------------------------------------------------------------------------------------------------------------
//IBSheet 설정
//--------------------------------------------------------------------------------------------------------------
var docObjects=new Array();
var sheetCnt=0;
var headerRowCnt=2;
/**
* Sheet 기본 설정 및 초기화
* body 태그의 onLoad 이벤트핸들러 구현
* 화면을 브라우저에서 로딩한 후에 선처리해야 하는 기능을 추가한다
*/
function loadPage() {
	var formObj=document.frm1;
	for(var i=0;i<docObjects.length;i++){
		comConfigSheet(docObjects[i], SYSTEM_FIS);
		initSheet(docObjects[i],i+1);
		comEndConfigSheet(docObjects[i]);
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
	var AcceptKeysOfNameField 	 = "E|N|[-,/ .;:~!@#$^&*()_+|=()[]{}?<> ]";
	var AcceptKeysOfAddressField = "E|N|[!@#%&()+-=;':\",./<>? ]";
	var AcceptKeysOfTextField 	 = "E|N|[-,/ .;:~!@#$^&*()_+|=()[]{}?<> ]";
	var AcceptKeysOfCodeField 	 = "E|N";
	switch(sheetNo) {
		case 1:
			with (sheetObj) {
		      SetConfig( { SearchMode:2, MergeSheet:8, Page:20, DataRowMerge:0, FrozenCol: 8 } );
		      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		      var headers = [ { Text:getLabel('SEE_AFR_0010_HDR_1'), Align:"Center"},
		                      { Text:getLabel('SEE_AFR_0010_HDR_2'), Align:"Center"} ];
		      InitHeaders(headers, info);
	
		      var cols = [ 
		                   {Type:"Seq",      Hidden:0, Width:45,    Align:"Center", ColMerge:1, SaveName:"",                    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                   {Type:"CheckBox", Hidden:0, Width:25,  	Align:"Center", ColMerge:0, SaveName:"chk",         		KeyField:0,  	Format:"",    		UpdateEdit:1, InsertEdit:1, EditLen:1, TrueValue : "Y", FalseValue : "N"},
		                   {Type:"Text",     Hidden:0, Width:130, 	Align:"Left", 	ColMerge:0, SaveName:"mbl_no",     			KeyField:1,  	Format:"",    		UpdateEdit:0, InsertEdit:0 },
		                   {Type:"Text",     Hidden:0, Width:100, 	Align:"Left", 	ColMerge:0, SaveName:"bl_no",      			KeyField:1,  	Format:"",    		UpdateEdit:0, InsertEdit:0 },
		                   {Type:"Combo",    Hidden:0, Width:60,  	Align:"Left", 	ColMerge:0, SaveName:"msg_sts_cd",      	KeyField:0,  	Format:"",    		UpdateEdit:0, InsertEdit:0 },
		                   {Type:"Text",     Hidden:0, Width:0,   	Align:"Center", ColMerge:0, SaveName:"cstms_rgst_flg",  	KeyField:0,  	Format:"", 			UpdateEdit:0, InsertEdit:0, PointCount:0 },
		                   {Type:"Text",     Hidden:0, Width:0,  	Align:"Left", 	ColMerge:0, SaveName:"rsk_ass_rslt",    	KeyField:0,  	Format:"",    		UpdateEdit:0, InsertEdit:0 },
		                   {Type:"Text",     Hidden:0, Width:0,  	Align:"Left", 	ColMerge:0, SaveName:"mtch_sts_cd",    		KeyField:0,  	Format:"",    		UpdateEdit:0, InsertEdit:0 },
		                   {Type:"Date",     Hidden:1, Width:120, 	Align:"Left", 	ColMerge:0, SaveName:"snd_dt_tm",   		KeyField:0,  	Format:"Ymd", 		UpdateEdit:0, InsertEdit:0 },
		                   {Type:"Text",     Hidden:0, Width:0, 	Align:"Center", ColMerge:0, SaveName:"hbl_cmpl_flg",    	KeyField:0,  	Format:"",    		UpdateEdit:0, InsertEdit:0 },
		                   {Type:"Combo",    Hidden:0, Width:0, 	Align:"Center", ColMerge:0, SaveName:"atd_cmpl_flg",    	KeyField:0,  	Format:"",    		UpdateEdit:1, InsertEdit:0 },
		                   {Type:"Text",     Hidden:0, Width:50,  	Align:"Center", ColMerge:0, SaveName:"his_view",    		KeyField:0,  	Format:"",    		UpdateEdit:0, InsertEdit:0, FontUnderline:1 },
		                   {Type:"Text",     Hidden:1, Width:50, 	Align:"Left", 	ColMerge:0, SaveName:"shpr_trdp_cd", 		KeyField:0,  	Format:"",    		UpdateEdit:1, InsertEdit:0, Ellipsis:1 },
		                   {Type:"PopupEdit",Hidden:0, Width:140, 	Align:"Left", 	ColMerge:0, SaveName:"shpr_trdp_nm", 		KeyField:0,  	Format:"",    		UpdateEdit:1, InsertEdit:0, EditLen:70, Ellipsis:1,  AcceptKeys:AcceptKeysOfAddressField, InputCaseSensitive:1 },
		                   {Type:"Text",     Hidden:0, Width:80, 	Align:"Left", 	ColMerge:0, SaveName:"shpr_trdp_phn", 		KeyField:0,  	Format:"",    		UpdateEdit:1, InsertEdit:0, EditLen:14, Ellipsis:1,  AcceptKeys:AcceptKeysOfAddressField, InputCaseSensitive:1 },
		                   {Type:"Text",     Hidden:0, Width:140, 	Align:"Left", 	ColMerge:0, SaveName:"shpr_trdp_addr", 		KeyField:0,  	Format:"",    		UpdateEdit:1, InsertEdit:0, EditLen:170, Ellipsis:1, AcceptKeys:AcceptKeysOfAddressField, InputCaseSensitive:1 },
		                   {Type:"Image",    Hidden:0, Width:30,    Align:"Center", ColMerge:0, SaveName:"shpr_img",         	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                   {Type:"PopupEdit",Hidden:0, Width:70, 	Align:"Left", 	ColMerge:0, SaveName:"shpr_trdp_cnt_cd", 	KeyField:0,  	Format:"",    		UpdateEdit:1, InsertEdit:0, EditLen:2, Ellipsis:1, AcceptKeys:AcceptKeysOfNameField, InputCaseSensitive:1 },
		                   {Type:"Text",     Hidden:1, Width:50, 	Align:"Left", 	ColMerge:0, SaveName:"cnee_trdp_cd", 		KeyField:0,  	Format:"",    		UpdateEdit:1, InsertEdit:0, Ellipsis:1 },
		                   {Type:"PopupEdit",Hidden:0, Width:140, 	Align:"Left", 	ColMerge:0, SaveName:"cnee_trdp_nm", 		KeyField:0,  	Format:"",    		UpdateEdit:1, InsertEdit:0, EditLen:70,  Ellipsis:1, AcceptKeys:AcceptKeysOfAddressField, InputCaseSensitive:1 },
		                   {Type:"Text",     Hidden:0, Width:80, 	Align:"Left", 	ColMerge:0, SaveName:"cnee_trdp_phn",		KeyField:0,  	Format:"",    		UpdateEdit:1, InsertEdit:0, EditLen:14, Ellipsis:1, AcceptKeys:AcceptKeysOfAddressField, InputCaseSensitive:1 },
		                   {Type:"Text",     Hidden:0, Width:170, 	Align:"Left", 	ColMerge:0, SaveName:"cnee_trdp_addr", 		KeyField:0,  	Format:"",    		UpdateEdit:1, InsertEdit:0, EditLen:170, Ellipsis:1, AcceptKeys:AcceptKeysOfAddressField, InputCaseSensitive:1 },
		                   {Type:"Image",    Hidden:0, Width:30,    Align:"Center", ColMerge:0, SaveName:"cnee_img",         	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                   {Type:"PopupEdit",Hidden:0, Width:70, 	Align:"Left", 	ColMerge:0, SaveName:"cnee_trdp_cnt_cd", 	KeyField:0,  	Format:"",    		UpdateEdit:1, InsertEdit:0, EditLen:2, Ellipsis:1, AcceptKeys:AcceptKeysOfNameField, InputCaseSensitive:1 },
		                   {Type:"Text",     Hidden:1, Width:50, 	Align:"Left", 	ColMerge:0, SaveName:"ntfy_trdp_cd", 		KeyField:0,  	Format:"",    		UpdateEdit:1, InsertEdit:0, Ellipsis:1 },
		                   {Type:"PopupEdit",Hidden:0, Width:140, 	Align:"Left", 	ColMerge:0, SaveName:"ntfy_trdp_nm", 		KeyField:0,  	Format:"",    		UpdateEdit:1, InsertEdit:0, EditLen:70,   Ellipsis:1, AcceptKeys:AcceptKeysOfAddressField, InputCaseSensitive:1 },
		                   {Type:"Text",     Hidden:0, Width:80, 	Align:"Left", 	ColMerge:0, SaveName:"ntfy_trdp_phn", 		KeyField:0,  	Format:"",    		UpdateEdit:1, InsertEdit:0, EditLen:14, Ellipsis:1, AcceptKeys:AcceptKeysOfAddressField, InputCaseSensitive:1 },
		                   {Type:"Text",     Hidden:0, Width:170, 	Align:"Left", 	ColMerge:0, SaveName:"ntfy_trdp_addr", 		KeyField:0,  	Format:"",    		UpdateEdit:1, InsertEdit:0, EditLen:170,  Ellipsis:1, AcceptKeys:AcceptKeysOfAddressField, InputCaseSensitive:1 },
		                   {Type:"Image",    Hidden:0, Width:30,    Align:"Center", ColMerge:0, SaveName:"ntfy_img",         	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                   {Type:"PopupEdit",Hidden:0, Width:70, 	Align:"Left", 	ColMerge:0, SaveName:"ntfy_trdp_cnt_cd", 	KeyField:0,  	Format:"",    		UpdateEdit:1, InsertEdit:0, EditLen:2, Ellipsis:1, AcceptKeys:AcceptKeysOfNameField, InputCaseSensitive:1 },
		                   {Type:"Text",     Hidden:0, Width:40, 	Align:"Left", 	ColMerge:0, SaveName:"lnr_scac_cd",         KeyField:0,  	Format:"",    		UpdateEdit:1, InsertEdit:0, EditLen:4,  Ellipsis:0, AcceptKeys:"E|N",InputCaseSensitive:1 },
		                   {Type:"Text",     Hidden:0, Width:170,	Align:"Left", 	ColMerge:0, SaveName:"lnr_trdp_nm", 		KeyField:0,  	Format:"",    		UpdateEdit:1, InsertEdit:0, Ellipsis:1, AcceptKeys:AcceptKeysOfNameField, InputCaseSensitive:1 },
		                   {Type:"PopupEdit",Hidden:0, Width:0,   	Align:"Center", ColMerge:0, SaveName:"call_sgn_cd",  		KeyField:0,    	Format:"", 	  		UpdateEdit:1, InsertEdit:0, EditLen:9, PointCount:0, AcceptKeys:AcceptKeysOfCodeField, InputCaseSensitive:1 },
		                   {Type:"Text",     Hidden:1, Width:50, 	Align:"Left", 	ColMerge:0, SaveName:"trnk_vsl_cd", 		KeyField:0,     Format:"",    		UpdateEdit:1, InsertEdit:0 },
		                   {Type:"Text",     Hidden:0, Width:140, 	Align:"Left", 	ColMerge:0, SaveName:"trnk_vsl_nm", 		KeyField:0,     Format:"",    		UpdateEdit:1, InsertEdit:0,EditLen:35,  AcceptKeys:AcceptKeysOfCodeField, InputCaseSensitive:1 },
		                   {Type:"Text",     Hidden:1, Width:30, 	Align:"Left", 	ColMerge:0, SaveName:"vsl_cnt_cd", 			KeyField:0,     Format:"",    		UpdateEdit:1, InsertEdit:0},
		                   {Type:"Text",     Hidden:0, Width:0, 	Align:"Left", 	ColMerge:0, SaveName:"trnk_voy_no",  		KeyField:0,     Format:"",    		UpdateEdit:1, InsertEdit:0, EditLen:10, AcceptKeys:AcceptKeysOfCodeField, InputCaseSensitive:1 },
		                   {Type:"Date",     Hidden:0, Width:80, 	Align:"Center", ColMerge:0, SaveName:"etd_dt_tm", 			KeyField:0,   	Format:"Ymd", 		UpdateEdit:1, InsertEdit:0 },
		                   {Type:"Text",     Hidden:0, Width:50, 	Align:"Center", ColMerge:0, SaveName:"etd_tm", 				KeyField:0,  	Format:"", 			UpdateEdit:1, InsertEdit:0, EditLen:4,AcceptKeys:"N"  },
		                   {Type:"Combo",    Hidden:0, Width:60, 	Align:"Left", 	ColMerge:0, SaveName:"etd_tmzn_val", 		KeyField:0,  	Format:"",    		UpdateEdit:1, InsertEdit:0, Ellipsis:0 },
		                   {Type:"Date",     Hidden:0, Width:80, 	Align:"Center", ColMerge:0, SaveName:"eta_dt_tm",  			KeyField:0,     Format:"Ymd", 		UpdateEdit:1, InsertEdit:0 },
		                   {Type:"Text",     Hidden:1, Width:50, 	Align:"Left", 	ColMerge:0, SaveName:"org_pol_cd",      	KeyField:0,    	Format:"",    		UpdateEdit:1, InsertEdit:0, Ellipsis:1 },
		                   {Type:"PopupEdit",Hidden:0, Width:50, 	Align:"Left", 	ColMerge:0, SaveName:"org_un_pol_cd",      	KeyField:0,    	Format:"",    		UpdateEdit:1, InsertEdit:0, EditLen:5, Ellipsis:1, AcceptKeys:AcceptKeysOfCodeField, InputCaseSensitive:1 },
		                   {Type:"Text",     Hidden:0, Width:140, 	Align:"Left", 	ColMerge:0, SaveName:"org_pol_nm",   		KeyField:0,     Format:"",    		UpdateEdit:1, InsertEdit:0, EditLen:20, Ellipsis:1, AcceptKeys:AcceptKeysOfNameField, InputCaseSensitive:1 },
		                   {Type:"Text",     Hidden:1, Width:50, 	Align:"Left", 	ColMerge:0, SaveName:"pol_cd",      		KeyField:0,    	Format:"",    		UpdateEdit:1, InsertEdit:0, Ellipsis:1 },
		                   {Type:"PopupEdit",Hidden:0, Width:50, 	Align:"Left", 	ColMerge:0, SaveName:"un_pol_cd",			KeyField:0,     Format:"",    		UpdateEdit:1, InsertEdit:0, EditLen:5, Ellipsis:1, AcceptKeys:AcceptKeysOfCodeField, InputCaseSensitive:1 },
		                   {Type:"Text",     Hidden:0, Width:140, 	Align:"Left", 	ColMerge:0, SaveName:"pol_nm",   			KeyField:0,     Format:"",    		UpdateEdit:1, InsertEdit:0, EditLen:20, Ellipsis:1, AcceptKeys:AcceptKeysOfNameField, InputCaseSensitive:1 },
		                   {Type:"Text",     Hidden:1, Width:50, 	Align:"Left", 	ColMerge:0, SaveName:"pod_cd",    			KeyField:0,     Format:"",    		UpdateEdit:1, InsertEdit:0, Ellipsis:1 },
		                   {Type:"PopupEdit",Hidden:0, Width:50, 	Align:"Left", 	ColMerge:0, SaveName:"un_pod_cd",			KeyField:0, 	Format:"",    		UpdateEdit:1, InsertEdit:0, EditLen:5, Ellipsis:1, AcceptKeys:AcceptKeysOfCodeField, InputCaseSensitive:1 },
		                   {Type:"Text",     Hidden:0, Width:140, 	Align:"Left", 	ColMerge:0, SaveName:"pod_nm",  			KeyField:0,     Format:"",    		UpdateEdit:1, InsertEdit:0, EditLen:20, Ellipsis:1, AcceptKeys:AcceptKeysOfNameField, InputCaseSensitive:1 },
		                   {Type:"Text",     Hidden:1, Width:50, 	Align:"Left", 	ColMerge:0, SaveName:"del_cd",      		KeyField:0,    	Format:"",    		UpdateEdit:1, InsertEdit:0, Ellipsis:1 },
		                   {Type:"PopupEdit",Hidden:0, Width:50, 	Align:"Left", 	ColMerge:0, SaveName:"un_del_cd",			KeyField:0, 	Format:"",    		UpdateEdit:1, InsertEdit:0, EditLen:5, Ellipsis:1, AcceptKeys:AcceptKeysOfCodeField, InputCaseSensitive:1 },
		                   {Type:"Text",     Hidden:0, Width:140, 	Align:"Left", 	ColMerge:0, SaveName:"del_nm",    			KeyField:0,     Format:"",    		UpdateEdit:1, InsertEdit:0, EditLen:20, Ellipsis:1, AcceptKeys:AcceptKeysOfNameField, InputCaseSensitive:1 },
		                   {Type:"Text",     Hidden:1, Width:0,   	Align:"Center", ColMerge:0, SaveName:"intg_bl_seq", 		KeyField:0,  	Format:"",    		UpdateEdit:0, InsertEdit:0 },
		                   {Type:"Text",     Hidden:1, Width:0,   	Align:"Center", ColMerge:0, SaveName:"intg_mbl_seq",  		KeyField:0,  	Format:"",    		UpdateEdit:0, InsertEdit:0 },
		                   {Type:"PopupEdit",Hidden:0, Width:0, 	Align:"Left", 	ColMerge:0, SaveName:"rep_cmdt_cd",   		KeyField:0,     Format:"",    		UpdateEdit:1, InsertEdit:0, EditLen:6, Ellipsis:0, AcceptKeys:AcceptKeysOfCodeField, InputCaseSensitive:1 },
		                   {Type:"Text",     Hidden:1, Width:140,	Align:"Left", 	ColMerge:0, SaveName:"rep_cmdt_nm",  		KeyField:0,  	Format:"",    		UpdateEdit:1, InsertEdit:0, Ellipsis:1, AcceptKeys:AcceptKeysOfNameField, InputCaseSensitive:1 },
		                   {Type:"Int",      Hidden:0, Width:50, 	Align:"Right", 	ColMerge:0, SaveName:"pck_qty",      		KeyField:0,   	Format:"Integer",   UpdateEdit:1, InsertEdit:0, Ellipsis:1},
		                   {Type:"Combo",    Hidden:0, Width:80, 	Align:"Left", 	ColMerge:0, SaveName:"pck_ut_cd", 			KeyField:0,  	Format:"",    		UpdateEdit:1, InsertEdit:0, Ellipsis:0 },
		                   {Type:"Float",    Hidden:0, Width:70, 	Align:"Right", 	ColMerge:0, SaveName:"grs_wgt", 			KeyField:0,     Format:"Float",		UpdateEdit:1, InsertEdit:0, PointCount:3, Ellipsis:1 },
		                   {Type:"Text",     Hidden:1, Width:30, 	Align:"Left", 	ColMerge:0, SaveName:"wgt_ut_cd", 			KeyField:0,  	Format:"",    		UpdateEdit:0, InsertEdit:0, Ellipsis:0 },
		                   {Type:"Float",    Hidden:0, Width:70, 	Align:"Right", 	ColMerge:0, SaveName:"meas",    			KeyField:0,     Format:"Float", 	UpdateEdit:1, InsertEdit:0, PointCount:3, Ellipsis:1 },
		                   {Type:"Text",     Hidden:1, Width:30, 	Align:"Left", 	ColMerge:0, SaveName:"meas_ut_cd", 			KeyField:0,  	Format:"",    		UpdateEdit:0, InsertEdit:0, Ellipsis:0 },
		                   {Type:"Text",     Hidden:0, Width:140, 	Align:"Left", 	ColMerge:0, SaveName:"mk_txt",    			KeyField:0,     Format:"",    		UpdateEdit:1, InsertEdit:0, Ellipsis:1, AcceptKeys:AcceptKeysOfAddressField, InputCaseSensitive:1, EditLen:2000 },
		                   {Type:"Image",    Hidden:0, Width:30,    Align:"Center", ColMerge:0, SaveName:"mk_img",         		KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                   {Type:"Text",     Hidden:0, Width:140, 	Align:"Left", 	ColMerge:0, SaveName:"desc_txt",    		KeyField:0,     Format:"",    		UpdateEdit:1, InsertEdit:0, Ellipsis:1, AcceptKeys:AcceptKeysOfAddressField, InputCaseSensitive:1, EditLen:2000 },
		                   {Type:"Image",    Hidden:0, Width:30,    Align:"Center", ColMerge:0, SaveName:"desc_img",         	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                   {Type:"Text",     Hidden:0, Width:80, 	Align:"Right", 	ColMerge:0, SaveName:"cntr_cnt",    		KeyField:0,  	Format:"",    		UpdateEdit:0, InsertEdit:0, Ellipsis:1 },
		                   {Type:"Text",     Hidden:0, Width:80, 	Align:"Right", 	ColMerge:0, SaveName:"imdg_cd",    			KeyField:0,  	Format:"",    		UpdateEdit:1, InsertEdit:1, EditLen:4,Ellipsis:1, InputCaseSensitive:1 },
		                   {Type:"Int",     Hidden:0, Width:50, 	Align:"Right", 	ColMerge:0, SaveName:"undg_no",    			KeyField:0,  	Format:"",    		UpdateEdit:1, InsertEdit:1, EditLen:4,Ellipsis:1, InputCaseSensitive:1 },
		                   {Type:"Text",     Hidden:1, Width:50, 	Align:"Right", 	ColMerge:0, SaveName:"ref_no",    			KeyField:0,  	Format:"",    		UpdateEdit:0, InsertEdit:0, Ellipsis:1 },
		                   {Type:"Text",     Hidden:1, Width:50, 	Align:"Right", 	ColMerge:0, SaveName:"cntr_blank_cnt",		KeyField:0,  	Format:"",    		UpdateEdit:0, InsertEdit:0, Ellipsis:1 },
		                   {Type:"Status",   Hidden:1, Width:0,   	Align:"Left",   ColMerge:0, SaveName:"ibflag" }
		                   ];
		       
		      	InitColumns(cols);
		      	//InitViewFormat(0, "snd_dt_tm", "MM\\-dd\\-yyyy");
		      	//InitViewFormat(0, "etd_dt_tm", "MM\\-dd\\-yyyy");
		      	SetImageList(0,"web/img/main/icon_m.gif");
		      	SetImageList(1,"web/img/main/icon_m.gif");
		      	SetImageList(2,"web/img/main/icon_m.gif");
		      	SetImageList(3,"web/img/main/icon_m.gif");
		      	SetImageList(4,"web/img/main/icon_m.gif");
		      	SetColProperty('msg_sts_cd', {ComboText:MSG_STS_NM, ComboCode:MSG_STS_CD} );
		      	SetColProperty('atd_cmpl_flg', {ComboText:'Y|N', ComboCode:'Y|N'} );
		      	SetColProperty('pck_ut_cd', {ComboText:PCKCD1, ComboCode:PCKCD2} );
		      	SetColProperty('etd_tmzn_val', 	{ComboText:GMT_NM, ComboCode:GMT_CD} );
		      	
		      	SetEditable(1);
		        SetSheetHeight(500);
		        SetHeaderRowHeight(20);
		        SetHeaderRowHeight(20);
			}
		break;
	}
}
function sheet1_OnSaveEnd(sheetObj, errCd, errMsg){
	if(errMsg != ""){
		alert(errMsg);
	}else{
		formatDataRow();
	}
}

function sheet1_OnSearchEnd() {
	formatDataRow();
}

function sheet1_OnClick(sheetObj, Row, col) {
	var formObj=document.frm1;
	var colStr=sheetObj.ColSaveName(col);
	if(colStr == "his_view"){
   		rtnary=new Array(1);
   		rtnary[0]=sheetObj.GetCellValue(Row, "bl_no");
   		rtnary[1]="AFR";
	    modal_center_open('./EDI_ACI_0012.clt', rtnary, 950,450,"yes");
	}else if (colStr == "cnee_img" || colStr == "shpr_img" || colStr == "ntfy_img") {
		var pfx = colStr.substring(0, 4);
		ComShowMemoPad4(sheetObj, Row, pfx + "_trdp_addr", false, 250, 130, col, pfx + "_trdp_addr");   
	}else if (colStr == "mk_img") {
		ComShowMemoPad4(sheetObj, Row, "mk_txt", false, 250, 130, col, "mk_txt");   
	}else if (colStr == "desc_img") {
		ComShowMemoPad4(sheetObj, Row, "desc_txt", false, 250, 130, col, "desc_txt");   
	}
}

function sheet1_OnChange(sheetObj, Row, Col) {
	cur_sheetObj = sheetObj;
	cur_rowIdx = Row;
	var colStr=sheetObj.ColSaveName(Col);
	if(colStr=="un_pol_cd"){
		var codeStr =  sheetObj.GetCellValue(Row, Col);
		if(codeStr.length >= 2){
			sheetObj.SetCellValue(Row, 'pol_nm', '', 0);
			doAutoSearch(sheetObj, Row, Col, 'location_un', codeStr, 'un_pol_cd', 'pol_nm');
		}
	} else if(colStr=="un_pod_cd"){
		var codeStr =  sheetObj.GetCellValue(Row, Col);
		if(codeStr.length >= 2){
			sheetObj.SetCellValue(Row, 'pod_nm', '', 0);
			doAutoSearch(sheetObj, Row, Col, 'location_un', codeStr, 'un_pod_cd', 'pod_nm');
		}
	} else if(colStr=="un_del_cd"){
		var codeStr =  sheetObj.GetCellValue(Row, Col);
		if(codeStr.length >= 2){
			sheetObj.SetCellValue(Row, 'del_nm', '', 0);
			doAutoSearch(sheetObj, Row, Col, 'location_un', codeStr, 'un_del_cd', 'del_nm');
		}
	} else if(colStr=="org_un_pol_cd"){
		var codeStr =  sheetObj.GetCellValue(Row, Col);
		if(codeStr.length >= 2){
			sheetObj.SetCellValue(Row, 'org_pol_nm', '', 0);
			doAutoSearch(sheetObj, Row, Col, 'location_un', codeStr, 'org_un_pol_cd', 'org_pol_nm');
		}
	} else if(colStr=="rep_cmdt_cd"){
		var codeStr =  sheetObj.GetCellValue(Row, Col);
		if(codeStr.length >= 2){
			sheetObj.SetCellValue(Row, 'rep_cmdt_nm', '', 0);
			doAutoSearch(sheetObj, Row, Col, 'commodity', codeStr, 'rep_cmdt_cd', 'rep_cmdt_nm');
		}
	} else if(colStr=="call_sgn_cd"){
		var codeStr =  sheetObj.GetCellValue(Row, Col);
		if(codeStr.length >= 2){
			sheetObj.SetCellValue(Row, 'trnk_vsl_nm', '', 0);
			sheetObj.SetCellValue(Row, 'vsl_cnt_cd', '', 0);
			ajaxSendPost(setRtnCallSgnCd, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType=vessel_call_sgn_cd&s_code='+codeStr, './GateServlet.gsl');
		}
	} else if(colStr=="shpr_trdp_cnt_cd" || colStr=="cnee_trdp_cnt_cd" || colStr=="ntfy_trdp_cnt_cd"){
		var codeStr =  sheetObj.GetCellValue(Row, Col);
		if(codeStr.length >= 2){
			sheetObj.SetCellValue(Row, codeStr.replace('_cd','_nm'), '', 0);
			doAutoSearch(sheetObj, Row, Col, 'country', codeStr, colStr, codeStr.replace('_cd','_nm'));
		}
	}
}

var trdp_tp = "";
var loc_tp = "";
var cnt_tp = "";
var cur_sheetObj;
var cur_rowIdx;

function sheet1_OnKeyDown(sheetObj, row, col, keyCode){
	var colStr = sheetObj.ColSaveName(col);
	cur_sheetObj = sheetObj;
	cur_rowIdx = row;
	
	if(keyCode==13){
		if(sheetObj.ColSaveName(col)=="shpr_trdp_nm"){
			sheetObj.SelectCell(row, col);
			
			trdp_tp = "shpr";
			rtnary=new Array(1);
	   		rtnary[0]="2";
	   		rtnary[1]=sheetObj.GetCellValue(row, col);
	   		rtnary[2]=window;
	   		
	   		callBackFunc = "TRDP_POPUP";
	   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150, 650,"yes");
	   		
		} else if(sheetObj.ColSaveName(col)=="cnee_trdp_nm"){
			sheetObj.SelectCell(row, col);
			
			trdp_tp = "cnee";
			rtnary=new Array(1);
	   		rtnary[0]="2";
	   		rtnary[1]=sheetObj.GetCellValue(row, col);
	   		rtnary[2]=window;
	   		
	   		callBackFunc = "TRDP_POPUP";
	   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150, 650,"yes");
	   		
		} else if(sheetObj.ColSaveName(col)=="ntfy_trdp_nm"){
			sheetObj.SelectCell(row, col);
			
			trdp_tp = "ntfy";
			rtnary=new Array(1);
	   		rtnary[0]="2";
	   		rtnary[1]=sheetObj.GetCellValue(row, col);
	   		rtnary[2]=window;
	   		
	   		callBackFunc = "TRDP_POPUP";
	   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150, 650,"yes");
	   		
		} else if(sheetObj.ColSaveName(col)=="pol_nm"){
			sheetObj.SelectCell(row, col);
			
			loc_tp = "un_pol";
	   		rtnary=new Array(1);
	   		rtnary[0]="SEA";
	   		rtnary[1]="BL";
	   		rtnary[2]=sheetObj.GetCellValue(row, col);
	   		
	   		callBackFunc = "LOC_POPUP";
	   		modal_center_open('./CMM_POP_0030.clt', rtnary, 806, 415, "yes");
	   		
		} else if(sheetObj.ColSaveName(col)=="pod_nm"){
			sheetObj.SelectCell(row, col);
			
			loc_tp = "un_pod";
	   		rtnary=new Array(1);
	   		rtnary[0]="SEA";
	   		rtnary[1]="BL";
	   		rtnary[2]=sheetObj.GetCellValue(row, col);
	   		
	   		callBackFunc = "LOC_POPUP";
	   		modal_center_open('./CMM_POP_0030.clt', rtnary, 806, 415, "yes");
	   		
		} else if(sheetObj.ColSaveName(col)=="del_nm"){
			sheetObj.SelectCell(row, col);
			
			loc_tp = "un_del";
	   		rtnary=new Array(1);
	   		rtnary[0]="SEA";
	   		rtnary[1]="BL";
	   		rtnary[2]=sheetObj.GetCellValue(row, col);
	   		
	   		callBackFunc = "LOC_POPUP";
	   		modal_center_open('./CMM_POP_0030.clt', rtnary, 806, 415, "yes");
	   		
		} else if(sheetObj.ColSaveName(col)=="org_pol_nm"){
			sheetObj.SelectCell(row, col);
			
			loc_tp = "org_un_pol";
	   		rtnary=new Array(1);
	   		rtnary[0]="SEA";
	   		rtnary[1]="BL";
	   		rtnary[2]=sheetObj.GetCellValue(row, col);
	   		
	   		callBackFunc = "LOC_POPUP";
	   		modal_center_open('./CMM_POP_0030.clt', rtnary, 806, 415, "yes");
	   		
		} else if(sheetObj.ColSaveName(col)=="trnk_vsl_nm"){
			sheetObj.SelectCell(row, col);
			
			rtnary=new Array(2);
	   		rtnary[0]="1";
	   		rtnary[1]=sheetObj.GetCellValue(row, col);
	   		callBackFunc = "VESSEL_POPUP";
			modal_center_open('./CMM_POP_0140.clt', rtnary, 656, 470,"yes");
	   		
		}
	}
}

function sheet1_OnPopupClick(sheetObj, row, col){
	var colStr = sheetObj.ColSaveName(col);
	cur_sheetObj = sheetObj;
	cur_rowIdx = row;
	
	if(colStr=="shpr_trdp_nm"){
		trdp_tp = "shpr";
   		rtnary=new Array(1);
   		rtnary[0]="2";
   		rtnary[1]="";
   		rtnary[2]=window;
   		
   		callBackFunc = "TRDP_POPUP";
   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150, 650, "yes");
   		
	} else if(colStr=="cnee_trdp_nm"){
		trdp_tp = "cnee";
   		rtnary=new Array(1);
   		rtnary[0]="2";
   		rtnary[1]="";
   		rtnary[2]=window;
   		
   		callBackFunc = "TRDP_POPUP";
   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150, 650, "yes");
   		
	} else if(colStr=="ntfy_trdp_nm"){
		trdp_tp = "ntfy";
   		rtnary=new Array(1);
   		rtnary[0]="2";
   		rtnary[1]="";
   		rtnary[2]=window;
   		
   		callBackFunc = "TRDP_POPUP";
   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150, 650, "yes");
   		
	} else if(colStr=="un_pol_cd"){
		loc_tp = "un_pol";
   		rtnary=new Array(1);
   		rtnary[0]="SEA";
   		rtnary[1]="BL";
   		rtnary[2]="";
   		
   		callBackFunc = "LOC_POPUP";
   		modal_center_open('./CMM_POP_0030.clt', rtnary, 806, 415, "yes");
   		
	} else if(colStr=="un_pod_cd"){
		loc_tp = "un_pod";
   		rtnary=new Array(1);
   		rtnary[0]="SEA";
   		rtnary[1]="BL";
   		rtnary[2]="";
   		
   		callBackFunc = "LOC_POPUP";
   		modal_center_open('./CMM_POP_0030.clt', rtnary, 806, 415, "yes");
   		
	} else if(colStr=="un_del_cd"){
		loc_tp = "un_del";
   		rtnary=new Array(1);
   		rtnary[0]="SEA";
   		rtnary[1]="BL";
   		rtnary[2]="";
   		
   		callBackFunc = "LOC_POPUP";
   		modal_center_open('./CMM_POP_0030.clt', rtnary, 806, 415, "yes");
   		
	} else if(colStr=="org_un_pol_cd"){
		loc_tp = "org_un_pol";
   		rtnary=new Array(1);
   		rtnary[0]="SEA";
   		rtnary[1]="BL";
   		rtnary[2]="";
   		
   		callBackFunc = "LOC_POPUP";
   		modal_center_open('./CMM_POP_0030.clt', rtnary, 806, 415, "yes");
   		
	} else if(colStr=="rep_cmdt_cd"){
   		rtnary=new Array(1);
   		rtnary[0]="1";
   		rtnary[1]="";	//Commodity code
   		rtnary[2]="";	//Commodity name
   		
   		callBackFunc = "COMMODITY_POPUP";
   		modal_center_open('./CMM_POP_0110.clt', rtnary, 756, 483,"yes");
   		
	} else if(colStr=="call_sgn_cd"){
		rtnary=new Array(2);
   		rtnary[0]="1";
   		rtnary[1]="";
   		callBackFunc = "VESSEL_POPUP";
		modal_center_open('./CMM_POP_0140.clt', rtnary, 656, 470,"yes");
		
	} else if(colStr=="shpr_trdp_cnt_cd" || colStr=="cnee_trdp_cnt_cd" || colStr=="ntfy_trdp_cnt_cd"){
		cnt_tp = colStr;
		rtnary=new Array(3);
	    rtnary[0]="";
	    rtnary[1]="" ;
	    rtnary[2]="";
	    callBackFunc = "CNT_POPUP";
	    modal_center_open('./CMM_POP_0020.clt', rtnary, 806,480,"yes");
	} 
}

function TRDP_POPUP(rtnVal){
	var sheetObj = cur_sheetObj;
	
    if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		
		sheetObj.SetCellValue(cur_rowIdx, trdp_tp + '_trdp_cd', rtnValAry[0], 0); // trdp_cd
		sheetObj.SetCellValue(cur_rowIdx, trdp_tp + '_trdp_nm', rtnValAry[2], 0); // full_nm
		sheetObj.SetCellValue(cur_rowIdx, trdp_tp + '_trdp_phn', rtnValAry[4], 0); // trdp_phn
		sheetObj.SetCellValue(cur_rowIdx, trdp_tp + '_trdp_addr', rtnValAry[7].replaceAll("\r\n", " ").replaceAll("\n", " ").substring(0, 105), 0); // address
		sheetObj.SetCellValue(cur_rowIdx, trdp_tp + '_trdp_zip_cd', rtnValAry[11], 0); // zip code
		sheetObj.SetCellValue(cur_rowIdx, trdp_tp + '_trdp_cnt_cd', rtnValAry[12], 0); // country
	}
    sheetObj.SelectCell(cur_rowIdx, trdp_tp + '_trdp_nm');
}

function LOC_POPUP(rtnVal){
	var sheetObj = cur_sheetObj;
	var nmCol = loc_tp.replace("un_","");
	
    if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		
		sheetObj.SetCellValue(cur_rowIdx, loc_tp + '_cd', rtnValAry[9], 0); // un_loc_cd
		sheetObj.SetCellValue(cur_rowIdx, nmCol + '_nm', rtnValAry[2].substring(0, 20), 0); // loc_nm
	}
    sheetObj.SelectCell(cur_rowIdx, nmCol + '_nm');
}

function COMMODITY_POPUP(rtnVal){
	var sheetObj = cur_sheetObj;
	
    if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		
		sheetObj.SetCellValue(cur_rowIdx, 'rep_cmdt_cd', rtnValAry[0].substring(0, 6), 0); // rep_cmdt_cd
		sheetObj.SetCellValue(cur_rowIdx, 'rep_cmdt_nm', rtnValAry[2], 0); // rep_cmdt_nm
	}
}

function VESSEL_POPUP(rtnVal){
	var sheetObj = cur_sheetObj;
	
    if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		
		sheetObj.SetCellValue(cur_rowIdx, 'call_sgn_cd', rtnValAry[3], 0); // call_sgn_cd
		sheetObj.SetCellValue(cur_rowIdx, 'trnk_vsl_nm', rtnValAry[1], 0); // trnk_vsl_nm
		sheetObj.SetCellValue(cur_rowIdx, 'vsl_cnt_cd', rtnValAry[2], 0); // vsl_cnt_cd
	}
}

function CNT_POPUP(rtnVal){
	var sheetObj = cur_sheetObj;
	
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		sheetObj.SetCellValue(cur_rowIdx, cnt_tp,rtnValAry[0], 0);
	}
}

/**
 * IBSheet에서 이벤트 발생시 해당 이벤트를 받아서 처리하기 위한 메소드임. Sheet1에서 OnPopupClick이벤트 발생시.
 * sheet1_OnPopupClick(sheetObj, Row, Col) <= sheet1번+'_'+IBsheet상에 명시된
 * Event명+(Sheet Oeject, Row, Column)
 */
function sheet1_OnDblClick(sheetObj, Row, Col) {
	var colStr = sheetObj.ColSaveName(Col);
	var formObj = document.frm1;
	if (colStr == 'bl_no') {
		doProcess = true;
		formObj.f_cmd.value = "";
		var paramStr = "./SEE_BMD_0020.clt?f_cmd=" + SEARCHLIST + "&f_bl_no="
				+ escape(sheetObj.GetCellValue(Row, "bl_no")) + "&f_intg_bl_seq="
				+ sheetObj.GetCellValue(Row, "intg_bl_seq");
		parent.mkNewFrame('Booking & HBL', paramStr,"SEE_BMD_0020_SHEET_" +  sheetObj.GetCellValue(Row, "bl_no") + "_" + sheetObj.GetCellValue(Row, "intg_bl_seq"));
	}else if(colStr == 'mbl_no'){
		doProcess=true;
		formObj.f_cmd.value="";
		var pgmId = "SEE_BMD_0040";
		var bndClssCd = "O";
		var paramStr="./" + pgmId + ".clt?f_cmd="+SEARCHLIST+'&f_ref_no='+escape(sheetObj.GetCellValue(Row, 'ref_no'))+"&f_intg_bl_seq="+sheetObj.GetCellValue(Row, "intg_mbl_seq");
	   	parent.mkNewFrame('Master B/L Entry', paramStr, pgmId+"_SHEET_" + sheetObj.GetCellValue(Row, 'ref_no')+"_"+sheetObj.GetCellValue(Row, "intg_bl_seq"));
	   	
	}else if(colStr == 'msg_sts_cd'){ //History Pop Up Open
		var param  = 'intg_bl_seq=';
		param += sheetObj.GetCellValue(Row, "intg_bl_seq");
		param += '&s_bl_no=';
		param += sheetObj.GetCellValue(Row, "bl_no");
		param += '&s_mbl_no=';
		param += sheetObj.GetCellValue(Row, "mbl_no");
		param += '&f_cmd=';
		param += '-1';
	
		rtnary[0]="";
		modal_center_open('./SEE_AFR_0090.clt?'+param, rtnary, 840,420,"yes");
	}
}

function sheet1_OnMouseMove(sheetObj,Button, Shift, X, Y){
	var col=sheetObj.MouseCol();
    var row=sheetObj.MouseRow();
    var colName=sheetObj.ColSaveName(col);
    if(colName == "bl_no" || colName == "msg_sts_cd"){
   		sheetObj.SetMousePointer("Hand");
    }else{
    	sheetObj.SetMousePointer("Default");
    }    
}

function vslPopup(vslNm){
	if(vslNm == null){
		vslNm = ""
	}
	rtnary=new Array(1);
	rtnary[0]="1";
	rtnary[1]=vslNm;
    callBackFunc = "VSL_POP";
    modal_center_open('./CMM_POP_0140.clt', rtnary, 656,480,"yes");
	
}
        
function VSL_POP(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		frm1.f_trnk_vsl_cd.value=rtnValAry[0];
		frm1.f_trnk_vsl_nm.value=rtnValAry[1];
		frm1.trnk_vsl_nm.value=rtnValAry[1];
	}
}

//Calendar flag value
var firCalFlag=false;
function vslCdSearch(obj){
	frm1.f_vsl_nm.value='';
	if(obj.value==''){
		return;
	}
	ajaxSendPost(dispVslCdSearch, "reqVal", "&goWhere=aj&bcKey=searchCodeName&codeType=srVessel&s_code="+obj.value, "./GateServlet.gsl");
}

function dispVslCdSearch(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			if(doc[1]=='ERR'){
				frm1.f_vsl_cd.value='';
			}else{
				var rtnValArr=doc[1].split('@@^');
				frm1.f_vsl_nm.value=rtnValArr[3];
			}
		}else{
			frm1.f_vsl_cd.value='';	
		}
	}else{
		frm1.f_vsl_cd.value='';
	}
}

function onBoardDateChange(val){
	if(val == "1"){
	    //오늘일자구하기
	    var now = new Date();
	    
	    var year = now.getFullYear();
	    var month = now.getMonth() + 1;
	    var date = now.getDate();
	    
	    if (month < 10) {
	    	month="0" + (month);
	    }
	    if (date < 10) {
	    	date="0" + date;
	    }
	    
	    frm1.f_etd_str_dt.value = month + "-" + date + "-" + year;
	    frm1.f_etd_end_dt.value = month + "-" + date + "-" + year;

	    TODAY = month + "-" + date + "-" + year;
	    
	}else if(val == "2"){
	    var now = new Date();
	    now.setDate(now.getDate() - 7); //일주일전 데이터를 가져옴
	    
	    var year = now.getFullYear();
	    var month = now.getMonth() + 1;
	    var date = now.getDate();
	    
	    if (month < 10) {
	    	month="0" + (month);
	    }
	    
	    if (date < 10) {
	    	date="0" + date;
	    }
	    
	    frm1.f_etd_str_dt.value = month + "-" + date + "-" + year;
	    frm1.f_etd_end_dt.value = TODAY;

	}else if(val == "3"){
		var now = new Date();
		var firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
		var lastMonth = new Date (firstDayOfMonth.setDate( firstDayOfMonth.getDate() - 1 ));
		
	    var year = lastMonth.getFullYear();
	    var month = lastMonth.getMonth() + 1;
	    
	    if (month < 10) {
	    	month="0" + (month);
	    }
	    
	    frm1.f_etd_str_dt.value = month + "-" + "01" + "-" + year;  //한달의 시작은 무조건 1일부터
	    frm1.f_etd_end_dt.value = month + "-" + (new Date(year, month, 0)).getDate() + "-" + year; //해당월의 마지막 날.
	    
	}else{
		var now = new Date();
		var firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
		
	    var year = firstDayOfMonth.getFullYear();
	    var month = firstDayOfMonth.getMonth() + 1;
	    
	    if (month < 10) {
	    	month="0" + (month);
	    }
	    
	    frm1.f_etd_str_dt.value = month + "-" + "01" + "-" + year;  //한달의 시작은 무조건 1일부터
	    frm1.f_etd_end_dt.value = month + "-" + (new Date(year, month, 0)).getDate() + "-" + year; //해당월의 마지막 날.
	}
}

function clearAll() {
	docObjects[0].RemoveAll();
	var formObj = document.frm1;
	var collTxt = document.getElementsByTagName("INPUT"); // document 상의 모든
															// INPUT 태그 요소들을
															// 컬렉션으로 구하고...
	for ( var i = 0; i < collTxt.length; i++) {
		if (collTxt[i].type == "text" || collTxt[i].type == "hidden") {
			collTxt[i].value = "";
		}
	}
	onBoardDateChange(1);
}

function setRtnCallSgnCd(rtnMsg){
	var sheetObj = cur_sheetObj;
    var doc=getAjaxMsgXML(rtnMsg);
    if(doc[0]=='OK'){
        if(typeof(doc[1])=='undefined'){
        	sheetObj.SetCellValue(cur_rowIdx, 'call_sgn_cd','',0);
        	sheetObj.SetCellValue(cur_rowIdx, 'trnk_vsl_nm','',0);
        	sheetObj.SetCellValue(cur_rowIdx, 'vsl_cnt_cd','',0);
            alert(CODE_NOT_FND);
        }else{
            var rtnArr=doc[1].split('@@;');
            var masterVals=rtnArr[0].split('@@^');
            sheetObj.SetCellValue(cur_rowIdx, 'trnk_vsl_nm',masterVals[3],0);
        	sheetObj.SetCellValue(cur_rowIdx, 'vsl_cnt_cd',masterVals[2],0);
        }
    }else{
        alert(AJ_FND_ERR);
    }
}

function getEdiAfrValidateInfo(reqVal){
	
	var formObj = document.frm1;
	var doc=getAjaxMsgXML(reqVal);
    
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var rtnArr = doc[1].split('^@');
			formObj.cntr_cnt.value = rtnArr[0];
		}
	}
}

function POD_LOCATION_POPLIST(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var formObj  = document.frm1;
		var rtnValAry=rtnVal.split("|");
		formObj.f_pod_cd.value=rtnValAry[0];//loc_cd 
		formObj.f_pod_nm.value=rtnValAry[2];//loc_nm
	} 
}


var CODETYPE='';
/**
 * code name select
 */
function codeNameAction2(str, obj, tmp){
	// obj가 form or sheet에서 온걸 구분해서 value결정.
	if(obj == '[object]' || obj =='[object HTMLInputElement]'){
		var s_code=obj.value.toUpperCase();
	}else{
		var s_code=obj;
	}		
	var s_type="";
//	if ( s_code != "" ) {
		if ( tmp == "onKeyDown" ) {
			if (event.keyCode == 13){
				CODETYPE=str;		
				var sub_str=str.substring(0,8);
				if(sub_str=="location"){
					s_type=sub_str;
				}else if(sub_str=="trdpCode"){
					s_type=sub_str;
				}else{
					s_type=str;
				}
				ajaxSendPost(dispCodeNameAjaxReq2, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
			}
		} else if ( tmp == "onBlur" ) {
//			if ( s_code != "" ) {
				CODETYPE=str;		
				var sub_str=str.substring(0,8);
				if(sub_str=="location"){
					s_type=sub_str;
				}else if(sub_str=="trdpCode"){
					s_type=sub_str;
				}else{
					s_type=str;
				}
				ajaxSendPost(dispCodeNameAjaxReq2, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
//			}
		}else if ( tmp == "onChange" ) {
//			if ( s_code != "" ) {
				CODETYPE=str;
				var sub_str=str.substring(0,str.indexOf("_s"));
				s_type=sub_str;
				ajaxSendPost(dispCodeNameAjaxReq2, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
//			}
		}
//	}
}
//코드표시 Ajax
function dispCodeNameAjaxReq2(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	var formObj=document.frm1;
	var sheetObj=docObjects[0];
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@@;');
			var masterVals=rtnArr[0].split('@@^');	
			if(CODETYPE == "location_pol"){
				formObj.f_pol_cd.value=masterVals[0];
				formObj.f_pol_nm.value=masterVals[3];
			}else if(CODETYPE == "location_pod"){
				formObj.f_pod_cd.value=masterVals.length > 0 ? masterVals[0] : "";
				formObj.f_pod_nm.value=masterVals.length > 3 ? masterVals[3] : "";
			}else if(CODETYPE == "location_del"){
				formObj.f_del_cd.value=masterVals[0];
				formObj.f_del_nm.value=masterVals[3];
			}else if(CODETYPE == "trdpCode"){
				formObj.s_trdp_cd.value=masterVals[0]; 
				formObj.s_trdp_full_nm.value=masterVals[3];//loc_nm
			}
		}else{
			if(CODETYPE == "location_pol"){
				formObj.f_pol_cd.value="";
				formObj.f_pol_nm.value="";
			}else if(CODETYPE == "location_pod"){
				formObj.f_pod_cd.value="";
				formObj.f_pod_nm.value="";
			}else if(CODETYPE == "location_del"){
				formObj.f_del_cd.value="";
				formObj.f_del_nm.value="";
			}else if(CODETYPE == "trdpCode"){
				formObj.s_trdp_cd.value=""; 
				formObj.s_trdp_full_nm.value="";
			}
		}
	}else{
		//alert(getLabel('SEE_BMD_MSG43'));		
	}
}

//Adjust font color and cell image after searching
function formatDataRow(){
	var formObj = document.frm1;
	var sheetObj = docObjects[0];
	
	for(var i=2; i<=sheetObj.LastRow(); i++){
		sheetObj.SetCellImage(i, "shpr_img", 0);
		sheetObj.SetCellImage(i, "cnee_img", 0);
		sheetObj.SetCellImage(i, "ntfy_img", 0);
		sheetObj.SetCellImage(i, "mk_img", 0);
		sheetObj.SetCellImage(i, "desc_img", 0);
		
		sheetObj.SetCellValue(i, 'shpr_trdp_addr',  sheetObj.GetCellValue(i,"shpr_trdp_addr").replace(/[:]/g,";").replace(/[']/g, "`").substring(0,105)  , 0);
		sheetObj.SetCellValue(i, 'cnee_trdp_addr',  sheetObj.GetCellValue(i,"cnee_trdp_addr").replace(/[:]/g,";").replace(/[']/g, "`").substring(0,105)  , 0);
		sheetObj.SetCellValue(i, 'nfty_trdp_addr',  sheetObj.GetCellValue(i,"nfty_trdp_addr").replace(/[:]/g,";").replace(/[']/g, "`").substring(0,105)  , 0);
		
		sheetObj.SetCellValue(i, 'shpr_trdp_nm',  sheetObj.GetCellValue(i,"shpr_trdp_nm").replace(/[:]/g,";").replace(/[']/g, "`").substring(0,60)  , 0);
		sheetObj.SetCellValue(i, 'cnee_trdp_nm',  sheetObj.GetCellValue(i,"cnee_trdp_nm").replace(/[:]/g,";").replace(/[']/g, "`").substring(0,60)  , 0);
		sheetObj.SetCellValue(i, 'nfty_trdp_nm',  sheetObj.GetCellValue(i,"nfty_trdp_nm").replace(/[:]/g,";").replace(/[']/g, "`").substring(0,60)  , 0);
		
		sheetObj.SetCellFontColor(i,'mbl_no',"#0000FF");
		sheetObj.SetCellFontColor(i,'bl_no',"#0000FF");
		sheetObj.SetCellValue(i, "ibflag", "R");
	}
}

function checkChangeTrnkVslNm(){
	var formObj = document.frm1;
	if(formObj.f_trnk_vsl_nm.value != formObj.trnk_vsl_nm.value){
		formObj.f_trnk_vsl_cd.value = "";
	}
}