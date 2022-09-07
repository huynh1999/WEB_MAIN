//=========================================================
//*@FileName   : ED_ACI_0010.jsp
//*@FileTitle  : 캐나다 세관 화물적화목록 EDI 처리
//*@Description: 캐나다 세관 화물적화목록 EDI 처리
//*@author     : OJG - Cyberlogitec
//*@version    : 1.0 - 09/28/2016
//*@since      : 09/28/2016
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
function doWork(srcName){
	var sheetObj=docObjects[0];
	switch(srcName) {
		case "SEARCHLIST01":	//조회
			frm1.f_cmd.value=SEARCHLIST01;
			// [#4678][ACI] Function improvements 1 (S).
			if ((frm1.f_mbl_no.value != "" && frm1.f_mbl_no.value != null) || (frm1.f_bl_no.value != "" && frm1.f_bl_no.value != null)) 
			{
				frm1.f_etd_str_dt.value = "";
				frm1.f_etd_end_dt.value = "";
				frm1.f_eta_str_dt.value = "";
				frm1.f_eta_end_dt.value = "";
			}
			// [#4678][ACI] Function improvements 1 (E).
			docObjects[0].DoSearch("EDI_ACI_0010GS.clt",   FormQueryString(frm1) );
		break;
		case "COMMAND01": // HouseBill
			var msg_sts_cd;
			var bFirst = true;
			
			frm1.val_msg.value = "";
			
			if(docObjects[0].CheckedRows("chk") == 0){
        		alert(getLabel('FMS_COM_ALT004') );
        		return;
        	}
			if (!aciEdiValidation(docObjects[0], srcName)){
    			return false;
    		}
			for(var i=2; i<sheetObj.LastRow() + 1; i++){
				if(sheetObj.GetCellValue(i,"chk") == 1){
					if(sheetObj.GetCellValue(i,"poc_trdp_nm") == ""){
						sheetObj.SetCellValue(i,"poc_trdp_cd","",0);
					}
				}
			}
			setTimeout(function(){
				if( confirm(getLabel('FMS_COM_CFMSENDEDI')) ){
					frm1.f_cmd.value=COMMAND01;
					var param = FormQueryString(frm1);
					docObjects[0].DoSave("./EDI_ACI_0010GS.clt", param, "chk", false);
				}
			},100);
		break;
		case "COMMAND02": // Supplementary
			var msg_sts_cd;
			var bFirst = true;
			
			frm1.val_msg.value = "";
			
			if(docObjects[0].CheckedRows("chk") == 0){
        		alert(getLabel('FMS_COM_ALT004') );
        		return;
        	}
			if (!aciEdiValidation(docObjects[0], srcName)){
    			return false;
    		}
			setTimeout(function(){
				if( confirm(getLabel('FMS_COM_CFMSENDEDI')) ){
					frm1.f_cmd.value=COMMAND02;
					var param = FormQueryString(frm1);
					docObjects[0].DoSave("./EDI_ACI_0010GS.clt", param, "ibflag", false);
				}
			},100);
		break;
		case "COMMAND03": // CloseMessage
			
			var mblNo="";
			
			var selectedRows = sheet1.FindCheckedRow("chk")
			var arrSelectedRows = selectedRows.split('|');
			if(arrSelectedRows ==""){		
				alert(getLabel('FMS_COM_ALT007'));
				return;
			}
			
			
			for(var i = 0; i < arrSelectedRows.length; i++){
				
				var rowIdx = arrSelectedRows[i];
				if(i == 0){
					mblNo += sheetObj.GetCellValue(rowIdx, "mbl_no");
				}else{
					mblNo += ','+sheetObj.GetCellValue(rowIdx, "mbl_no");
				}
			}			
			
			if(mblNo == -1 || mblNo ==""){		
				alert(getLabel('FMS_COM_ALT058'));
				return;
			}			
			
			
	   		rtnary=new Array(1);
	   		rtnary[0]="1";
	   		rtnary[1]= "";
	   		
	   		callBackFunc = "LINER_POPLIST";
  	        modal_center_open('./EDI_ACI_0014.clt?f_mbl_no='+mblNo, rtnary, 900,550,"yes");			
			//EDI_ACI_0014
			
			
			
			/* 20161123 주석 처리
			var msg_sts_cd;
			var bFirst = true;
			
			frm1.val_msg.value = "";
			
			if(docObjects[0].CheckedRows("chk") == 0){
				// Please select Data!
        		alert(getLabel('FMS_COM_ALT004'));
        		return;
        		
        	}else if(docObjects[0].CheckedRows("chk") > 1){
        		// Please select only one Data!
        		alert(getLabel('FMS_COM_ALT003'));
        		return;
        	}
			
			if (!aciEdiValidation(docObjects[0], srcName)){
    			return false;
    		}
			
			rtnary=new Array(1);
			
			var scac_cd = "";
			var bl_no = "";
			
			var sRow=sheetObj.FindCheckedRow("chk");
			
			if(sheetObj.GetCellValue(sRow, "cnsl_ind_flg") == "Y"){
				scac_cd = sheetObj.GetCellValue(sRow, "fwrd_scac_cd");
				bl_no = sheetObj.GetCellValue(sRow, "bl_no");
			}else{
				scac_cd = sheetObj.GetCellValue(sRow, "crr_scac_cd");
				bl_no = sheetObj.GetCellValue(sRow, "mbl_no");
			}
			rtnary[0]=scac_cd;
	   		rtnary[1]=bl_no;
	   		rtnary[2]=sheetObj.GetCellValue(sRow, "cnsl_ind_flg");
	   		rtnary[3]=sheetObj.GetCellValue(sRow, "atd_cmpl_flg");
		    modal_center_open('./EDI_ACI_0013.clt', rtnary, 620,450,"yes");
		    20161123 주석 처리 끝*/
		    
		    
			/*setTimeout(function(){
				if( confirm(getLabel('FMS_COM_CFMSENDEDI')) ){
					frm1.f_cmd.value=COMMAND03;
					var param = FormQueryString(frm1);
					docObjects[0].DoSave("./EDI_ACI_0010GS.clt", param, "ibflag", false);
				}
			},100);*/
		break;
		
		case "COMMAND04": // HouseBill Delete
			var msg_sts_cd;
			var bFirst = true;
			
			frm1.val_msg.value = "";
			
			if(docObjects[0].CheckedRows("chk") == 0){
        		alert(getLabel('FMS_COM_ALT004') );
        		return;
        	}
			if (!aciEdiValidation(docObjects[0], srcName)){
    			return false;
    		}
			setTimeout(function(){
				if( confirm(getLabel('FMS_COM_CFMSENDEDI')) ){
					frm1.f_cmd.value=COMMAND04;
					var param = FormQueryString(frm1);
					docObjects[0].DoSave("./EDI_ACI_0010GS.clt", param, "ibflag", false);
				}
			},100);
		break;
		
		case "COMMAND05": // Supplementary Delete
			var msg_sts_cd;
			var bFirst = true;
			
			frm1.val_msg.value = "";
			
			if(docObjects[0].CheckedRows("chk") == 0){
        		alert(getLabel('FMS_COM_ALT004') );
        		return;
        	}
			if (!aciEdiValidation(docObjects[0], srcName)){
    			return false;
    		}
			setTimeout(function(){
				if( confirm(getLabel('FMS_COM_CFMSENDEDI')) ){
					frm1.f_cmd.value=COMMAND05;
					var param = FormQueryString(frm1);
					docObjects[0].DoSave("./EDI_ACI_0010GS.clt", param, "ibflag", false);
				}
			},100);
		break;
		case "EDI_BL_SAVE":
			if (!aciEdiValidation(docObjects[0], srcName)){
    			return false;
    		}
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
			
            frm1.f_cmd.value=COMMAND06;
            var param = FormQueryString(frm1);
			docObjects[0].DoSave("./EDI_ACI_0010GS.clt", param,"ibflag", false);
			
			break;
		case "COMMAND10":		//Excel
			docObjects[0].Down2Excel( {DownCols: makeHiddenSkipCol(docObjects[0]), SheetDesign:1,Merge:1 });
		break;
	}
}

function aciEdiValidation(sheetObj, cmd){
	var formObj=document.frm1;	
	var valMsgArr = new Array();
	
	for(var i=2; i<sheetObj.LastRow() + 1; i++){
		if(sheetObj.GetCellValue(i, "chk") == 1){
			
			var msg_sts_cd 		= sheetObj.GetCellValue(i, "msg_sts_cd");
            var crr_scac_cd 	= sheetObj.GetCellValue(i, "crr_scac_cd");
            var mbl_no 			= sheetObj.GetCellValue(i, "mbl_no");
            var fwrd_scac_cd 	= sheetObj.GetCellValue(i, "fwrd_scac_cd");
            var bl_no 			= sheetObj.GetCellValue(i, "bl_no");
            var cnsl_ind_flg 	= sheetObj.GetCellValue(i, "cnsl_ind_flg");
            var pre_hbl_no 		= sheetObj.GetCellValue(i, "pre_hbl_no");
            var mvmt_tp_cd 		= sheetObj.GetCellValue(i, "mvmt_tp_cd");
            var msg_sts_cd 		= sheetObj.GetCellValue(i, "msg_sts_cd");
			
            var shpr_trdp_nm 	= sheetObj.GetCellValue(i, "shpr_trdp_nm");
			var shpr_trdp_addr 	= sheetObj.GetCellValue(i, "shpr_trdp_addr");
			var shpr_trdp_cty_nm = sheetObj.GetCellValue(i, "shpr_trdp_cty_nm");
			var shpr_trdp_ste_cd = sheetObj.GetCellValue(i, "shpr_trdp_ste_cd");
			var shpr_trdp_zip_cd = sheetObj.GetCellValue(i, "shpr_trdp_zip_cd");
			var shpr_trdp_cnt_cd = sheetObj.GetCellValue(i, "shpr_trdp_cnt_cd");
			
			var cnee_trdp_nm 	= sheetObj.GetCellValue(i, "cnee_trdp_nm");
			var cnee_trdp_addr 	= sheetObj.GetCellValue(i, "cnee_trdp_addr");
			var cnee_trdp_cty_nm = sheetObj.GetCellValue(i, "cnee_trdp_cty_nm");
			var cnee_trdp_ste_cd = sheetObj.GetCellValue(i, "cnee_trdp_ste_cd");
			var cnee_trdp_zip_cd = sheetObj.GetCellValue(i, "cnee_trdp_zip_cd");
			var cnee_trdp_cnt_cd = sheetObj.GetCellValue(i, "cnee_trdp_cnt_cd");
			
			var poc_trdp_nm 	= sheetObj.GetCellValue(i, "poc_trdp_nm");
			var poc_trdp_addr 	= sheetObj.GetCellValue(i, "poc_trdp_addr");
			var poc_trdp_cty_nm = sheetObj.GetCellValue(i, "poc_trdp_cty_nm");
			var poc_trdp_ste_cd = sheetObj.GetCellValue(i, "poc_trdp_ste_cd");
			var poc_trdp_zip_cd = sheetObj.GetCellValue(i, "poc_trdp_zip_cd");
			var poc_trdp_cnt_cd = sheetObj.GetCellValue(i, "poc_trdp_cnt_cd");
			
			var fnl_dest_cd 	= sheetObj.GetCellValue(i, "fnl_dest_cd");
			var fnl_dest_nm 	= sheetObj.GetCellValue(i, "fnl_dest_nm");
			var sub_fnl_dest_cd = sheetObj.GetCellValue(i, "sub_fnl_dest_cd");
            
			var pod_cd 			= sheetObj.GetCellValue(i, "pod_cd");
			var pod_nm 			= sheetObj.GetCellValue(i, "pod_nm");
			var sub_pod_cd 		= sheetObj.GetCellValue(i, "sub_pod_cd");
			
			var del_nm 			= sheetObj.GetCellValue(i, "del_nm");
			var del_cnt_cd 		= sheetObj.GetCellValue(i, "del_cnt_cd");
			
			var grs_wgt 		= sheetObj.GetCellValue(i, "grs_wgt");
			var meas 			= sheetObj.GetCellValue(i, "meas");
			var cntr_cnt 		= sheetObj.GetCellValue(i, "cntr_cnt");
			var cntr_cgo 		= sheetObj.GetCellValue(i, "cntr_cgo");
			var dg_cgo 			= sheetObj.GetCellValue(i, "dg_cgo");
			var rmk3_txt 		= sheetObj.GetCellValue(i, "rmk3_txt");
			var haz_cntc_nm 	= sheetObj.GetCellValue(i, "haz_cntc_nm");
			var haz_cntc_phn 	= sheetObj.GetCellValue(i, "haz_cntc_phn");
			var cntr_cgo 		= sheetObj.GetCellValue(i, "cntr_cgo");
			var air_sea_clss_cd = sheetObj.GetCellValue(i, "air_sea_clss_cd");
			
			var row = i - 1;
			
			// Mandatory Checking Logic 추가
			if(msg_sts_cd == "S"){ // Sent
				valMsgArr.push("Row["+ row +"] : " +  getLabel('EDI_COM_ALT076'));
			}
			
			if(cmd == "COMMAND01"){ // HouseBill
				if(crr_scac_cd == ""){
					valMsgArr.push("Row["+ row +"] : " + getLabel('EDI_COM_ALT184') );
				}
				if(mbl_no == ""){	
					valMsgArr.push("Row["+ row +"] : " +  getLabel('EDI_COM_ALT244'));  
				}
				if(fwrd_scac_cd == ""){	
					valMsgArr.push("Row["+ row +"] : " +  getLabel('EDI_COM_ALT191'));
				}
				if(bl_no == ""){	
					valMsgArr.push("Row["+ row +"] : " +  getLabel('EDI_COM_ALT190'));
				}
				
				if(mvmt_tp_cd =='FROB'){
					valMsgArr.push("Row["+ row +"] : " +  "House Bill Movement Type Can not FROB");
				}
				
				if(shpr_trdp_nm == "" || !ComIsContainsCharsOnly(shpr_trdp_nm, FORMAT_EDI_ACI)){	
					valMsgArr.push("Row["+ row +"] : " +  getLabel('EDI_COM_ALT196'));
				}
				if(shpr_trdp_addr == "" || !ComIsContainsCharsOnly(shpr_trdp_addr, FORMAT_EDI_ACI)){	
					valMsgArr.push("Row["+ row +"] : " +  getLabel('EDI_COM_ALT197'));
				}
				if(shpr_trdp_cty_nm == "" || !ComIsContainsCharsOnly(shpr_trdp_cty_nm, FORMAT_EDI_ACI) || shpr_trdp_cty_nm.length > 35){	
					valMsgArr.push("Row["+ row +"] : " +  getLabel('EDI_COM_ALT198'));
				}
				if(shpr_trdp_cnt_cd == ""){
					valMsgArr.push("Row["+ row +"] : " +  getLabel('EDI_COM_ALT199'));
				}
				if(shpr_trdp_cnt_cd == "US" || shpr_trdp_cnt_cd == "CA"){		//EDI Spec 수정요청
					if(shpr_trdp_ste_cd == ""){	
						valMsgArr.push("Row["+ row +"] : " +  getLabel('EDI_COM_ALT199'));
					}
					if(shpr_trdp_zip_cd == ""){	
						valMsgArr.push("Row["+ row +"] : " + getLabel('EDI_COM_ALT200'));
					}
				}
				if(!ComIsContainsCharsOnly(shpr_trdp_zip_cd, FORMAT_EDI_ACI)){	
					valMsgArr.push("Row["+ row +"] : " +  getLabel('EDI_COM_ALT200'));
				}
				
				if(cnee_trdp_nm == "" || !ComIsContainsCharsOnly(cnee_trdp_nm, FORMAT_EDI_ACI)){	
					valMsgArr.push("Row["+ row +"] : " +  getLabel('EDI_COM_ALT205'));
				}
				if(cnee_trdp_addr == "" || !ComIsContainsCharsOnly(cnee_trdp_addr, FORMAT_EDI_ACI)){	
					valMsgArr.push("Row["+ row +"] : " +  getLabel('EDI_COM_ALT206'));
				}
				if(cnee_trdp_cty_nm == "" || !ComIsContainsCharsOnly(cnee_trdp_cty_nm, FORMAT_EDI_ACI) || cnee_trdp_cty_nm.length > 35){	
					valMsgArr.push("Row["+ row +"] : " +  getLabel('EDI_COM_ALT207'));
				}
				if(cnee_trdp_cnt_cd == ""){	
					valMsgArr.push("Row["+ row +"] : " +  getLabel('EDI_COM_ALT208'));
				}
				if(cnee_trdp_cnt_cd == "US" || cnee_trdp_cnt_cd == "CA"){
					if(cnee_trdp_ste_cd == ""){	
						valMsgArr.push("Row["+ row +"] : " +  getLabel('EDI_COM_ALT208'));
					}
					if(cnee_trdp_zip_cd == ""){	
						valMsgArr.push("Row["+ row +"] : " + getLabel('EDI_COM_ALT210'));
					}
				}
				if(!ComIsContainsCharsOnly(cnee_trdp_zip_cd, FORMAT_EDI_ACI)){	
					valMsgArr.push("Row["+ row +"] : " +   getLabel('EDI_COM_ALT210'));
				}
				
				if(cnsl_ind_flg == "Y"){
					if(poc_trdp_nm == ""){	
						valMsgArr.push("Row["+ row +"] : " + getLabel('EDI_COM_ALT232'));
					}
					if(poc_trdp_addr == ""){	
						valMsgArr.push("Row["+ row +"] : " +  getLabel('EDI_COM_ALT233'));
					}
					if(poc_trdp_cty_nm == ""){	
						valMsgArr.push("Row["+ row +"] : " +  getLabel('EDI_COM_ALT234'));
					}
					if(poc_trdp_cnt_cd == ""){	
						valMsgArr.push("Row["+ row +"] : " +  getLabel('EDI_COM_ALT235'));
					}
					if(poc_trdp_cnt_cd == "US" || poc_trdp_cnt_cd == "CA"){
						if(poc_trdp_ste_cd == ""){	
							valMsgArr.push("Row["+ row +"] : " +  getLabel('EDI_COM_ALT236'));
						}
						if(poc_trdp_zip_cd == ""){	
							valMsgArr.push("Row["+ row +"] : " +  getLabel('EDI_COM_ALT237'));
						}
					}
				}
				if(!ComIsContainsCharsOnly(poc_trdp_nm, FORMAT_EDI_ACI)){	
					valMsgArr.push("Row["+ row +"] : " +  getLabel('EDI_COM_ALT238'));
				}
				if(!ComIsContainsCharsOnly(poc_trdp_addr, FORMAT_EDI_ACI)){	
					valMsgArr.push("Row["+ row +"] : " +  getLabel('EDI_COM_ALT239'));
				}
				if(!ComIsContainsCharsOnly(poc_trdp_cty_nm, FORMAT_EDI_ACI)){	
					valMsgArr.push("Row["+ row +"] : " +  getLabel('EDI_COM_ALT240'));
				}
				if(!ComIsContainsCharsOnly(poc_trdp_zip_cd, FORMAT_EDI_ACI)){	
					valMsgArr.push("Row["+ row +"] : " + getLabel('EDI_COM_ALT241'));
				}
				
				if(fnl_dest_cd == ""){	
					valMsgArr.push("Row["+ row +"] : " +  getLabel('EDI_COM_ALT192'));
				}
				if(sub_fnl_dest_cd == ""){	
					valMsgArr.push("Row["+ row +"] : " +  getLabel('EDI_COM_ALT194'));
				}
				
				if(air_sea_clss_cd == 'S' && (cntr_cnt == 0 || cntr_cgo == "N")){
					ajaxSendPost(getEdiAciValidateInfo, 'reqVal', '&goWhere=aj&bcKey=getEdiAciValidateInfo&intg_bl_seq='+sheetObj.GetCellValue(i, "intg_bl_seq"), './GateServlet.gsl');
					
					if(formObj.cntr_cnt.value == 0){	
						valMsgArr.push("Row["+ row +"] : " +  getLabel('EDI_COM_ALT188'));
					}
					if(formObj.cntr_cgo.value == "N"){	
						valMsgArr.push("Row["+ row +"] : " +  getLabel('EDI_COM_ALT189'));
					}
				}
				
				if(grs_wgt == 0){
					valMsgArr.push("Row["+ row +"] : " +  getLabel('EDI_COM_ALT195'));
				}
				
				if(meas == 0){	
					valMsgArr.push("Row["+ row +"] : " +  "Check the CBM on BL");
				}
				
				if(dg_cgo == 'Y'){
					if(rmk3_txt ==''){
						valMsgArr.push("Row["+ row +"] : " +  "DG Instruction Remark Mandatory Item");
					}
					if(haz_cntc_nm ==''){
						valMsgArr.push("Row["+ row +"] : " +  "DG Contact Name Mandatory Item");
					}
					if(haz_cntc_phn ==''){
						valMsgArr.push("Row["+ row +"] : " +  "DG Contact Phone Mandatory Item");
					}
				}
			} else if(cmd == "COMMAND02"){		//Supplementary
				if(crr_scac_cd == ""){	
					valMsgArr.push("Row["+ row +"] : " +  getLabel('EDI_COM_ALT184'));
				}
				if(mbl_no == ""){	
					valMsgArr.push("Row["+ row +"] : " +  getLabel('EDI_COM_ALT244'));
				}
				if(fwrd_scac_cd == ""){	
					valMsgArr.push("Row["+ row +"] : " +  getLabel('EDI_COM_ALT191'));
				}
				if(bl_no == ""){	
					valMsgArr.push("Row["+ row +"] : " +  getLabel('EDI_COM_ALT190'));
				}
				if(shpr_trdp_nm == "" || !ComIsContainsCharsOnly(shpr_trdp_nm, FORMAT_EDI_ACI)){	
					valMsgArr.push("Row["+ row +"] : " +  getLabel('EDI_COM_ALT196'));
				}
				if(shpr_trdp_addr == "" || !ComIsContainsCharsOnly(shpr_trdp_addr, FORMAT_EDI_ACI)){	
					valMsgArr.push("Row["+ row +"] : " +  getLabel('EDI_COM_ALT197'));
				}
				if(shpr_trdp_cty_nm == "" || !ComIsContainsCharsOnly(shpr_trdp_cty_nm, FORMAT_EDI_ACI) || shpr_trdp_cty_nm.length > 35){	
					valMsgArr.push("Row["+ row +"] : " +  getLabel('EDI_COM_ALT198'));
				}
				if(shpr_trdp_cnt_cd == ""){	
					valMsgArr.push("Row["+ row +"] : " +  getLabel('EDI_COM_ALT199'));
				}
				if(shpr_trdp_cnt_cd == "US" || shpr_trdp_cnt_cd == "CA"){
					if(shpr_trdp_ste_cd == ""){	
						valMsgArr.push("Row["+ row +"] : " +  getLabel('EDI_COM_ALT199'));
					}
					if(shpr_trdp_zip_cd == ""){	
						valMsgArr.push("Row["+ row +"] : " +  getLabel('EDI_COM_ALT200'));
					}
				}
				if(!ComIsContainsCharsOnly(shpr_trdp_zip_cd, FORMAT_EDI_ACI)){	
					valMsgArr.push("Row["+ row +"] : " +  getLabel('EDI_COM_ALT200'));
				}
				
				if(cnee_trdp_nm == "" || !ComIsContainsCharsOnly(cnee_trdp_nm, FORMAT_EDI_ACI)){	
					valMsgArr.push("Row["+ row +"] : " +  getLabel('EDI_COM_ALT205'));
				}
				if(cnee_trdp_addr == "" || !ComIsContainsCharsOnly(cnee_trdp_addr, FORMAT_EDI_ACI)){	
					valMsgArr.push("Row["+ row +"] : " +  getLabel('EDI_COM_ALT206'));
				}
				if(cnee_trdp_cty_nm == "" || !ComIsContainsCharsOnly(cnee_trdp_cty_nm, FORMAT_EDI_ACI) || cnee_trdp_cty_nm.length > 35){	
					valMsgArr.push("Row["+ row +"] : " +  getLabel('EDI_COM_ALT207'));
				}
				if(cnee_trdp_cnt_cd == ""){	
					valMsgArr.push("Row["+ row +"] : " +  getLabel('EDI_COM_ALT208'));
				}
				if(cnee_trdp_cnt_cd == "US" || cnee_trdp_cnt_cd == "CA"){
					if(cnee_trdp_ste_cd == ""){	
						valMsgArr.push("Row["+ row +"] : " +  getLabel('EDI_COM_ALT209'));
					}
					if(cnee_trdp_zip_cd == ""){	
						valMsgArr.push("Row["+ row +"] : " +  getLabel('EDI_COM_ALT210'));
					}
				}
				if(!ComIsContainsCharsOnly(cnee_trdp_zip_cd, FORMAT_EDI_ACI)){	
					valMsgArr.push("Row["+ row +"] : " +  getLabel('EDI_COM_ALT210'));
				}
				if(del_nm == ""){	
					valMsgArr.push("Row["+ row +"] : " +  getLabel('EDI_COM_ALT203'));
				}
				if(del_cnt_cd == ""){	
					valMsgArr.push("Row["+ row +"] : " +  getLabel('EDI_COM_ALT204'));
				}
				
				if(cntr_cnt == 0){	
					valMsgArr.push("Row["+ row +"] : " +  getLabel('EDI_COM_ALT188'));
				}
				if(cntr_cgo == "N"){	
					valMsgArr.push("Row["+ row +"] : " + getLabel('EDI_COM_ALT189'));
				}
				
			} else if(cmd == "COMMAND03"){
				if(mbl_no == ""){	
					valMsgArr.push("Row["+ row +"] : " +  getLabel('EDI_COM_ALT244'));
				}
				if(crr_scac_cd == ""){	
					valMsgArr.push("Row["+ row +"] : " +  getLabel('EDI_COM_ALT184'));
				}
				if(bl_no == ""){	
					valMsgArr.push("Row["+ row +"] : " +  getLabel('EDI_COM_ALT190'));
				}
			}
		}
		
		// Check length of Consignee City Name and Shipper City Name when clicking Save button.
		// [#4678][ACI] Function improvements 1.
		if(cmd == "EDI_BL_SAVE" && (sheetObj.GetCellValue(i, "ibflag") == "U" || sheetObj.GetCellValue(i, "ibflag") == "I")){
			var row = i - 1;
			var cnee_trdp_cty_nm = sheetObj.GetCellValue(i, "cnee_trdp_cty_nm");
			var shpr_trdp_cty_nm = sheetObj.GetCellValue(i, "shpr_trdp_cty_nm");
			
			if(cnee_trdp_cty_nm.length > 35){	
				valMsgArr.push("Row["+ row +"] : " +  getLabel('EDI_COM_ALT207'));
			}
			if(shpr_trdp_cty_nm.length > 35){	
				valMsgArr.push("Row["+ row +"] : " +  getLabel('EDI_COM_ALT198'));
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
    }else{
    	formObj.val_msg.value = "";
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
	//alert(doWhat);
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
	formObj.f_dept_cd[1].selected=true;
	ediClssChg();
	chgDept();
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
	var AcceptKeysOfNameField 	 = 'E|N|[`@#$%^&()_+-[]{};",./<>? ]';
	var AcceptKeysOfAddressField = 'E|N|[`@#$%^&()_+-[]{};",./<>? ]';
	var AcceptKeysOfTextField    = 'E|N|[`@#$%^&()_+-[]{};",./<>? ]';
	var AcceptKeysOfCodeField 	 = "E|N";
	switch(sheetNo) {
		case 1:
			with (sheetObj) {
		      SetConfig( { SearchMode:2, MergeSheet:8, Page:20, DataRowMerge:0, FrozenCol: 6 } );
	
		      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		      var headers = [ { Text:getLabel('EDI_ACI_0010_HDR_1'), Align:"Center"},
	  		                  { Text:getLabel('EDI_ACI_0010_HDR_2'), Align:"Center"} ];
		      InitHeaders(headers, info);
	
		      var cols = [ 
		                   {Type:"Seq",      	Hidden:0, Width:45,  Align:"Center", 	ColMerge:1, SaveName:"",                    KeyField:0, Format:"",    UpdateEdit:0, InsertEdit:0,  CalcLogic:"",		PointCount:0},
		                   {Type:"CheckBox", 	Hidden:0, Width:25,  Align:"Center", 	ColMerge:0, SaveName:"chk",         		KeyField:0, Format:"",    UpdateEdit:1, InsertEdit:1, EditLen:1, TrueValue : "Y", FalseValue : "N"},
		                   {Type:"Text",     	Hidden:0, Width:60,  Align:"Left", 		ColMerge:0, SaveName:"crr_scac_cd",     	KeyField:0, Format:"",    UpdateEdit:1, InsertEdit:0, EditLen:4,Ellipsis:0, AcceptKeys:"E|N",InputCaseSensitive:1 },
		                   {Type:"Text",     	Hidden:0, Width:120, Align:"Left", 		ColMerge:1, SaveName:"mbl_no",      		KeyField:0, Format:"",    UpdateEdit:0, InsertEdit:0},
		                   {Type:"Text",     	Hidden:0, Width:60,  Align:"Left", 		ColMerge:0, SaveName:"fwrd_scac_cd",  		KeyField:0, Format:"",    UpdateEdit:1, InsertEdit:0, EditLen:4, AcceptKeys:"E|N",InputCaseSensitive:1 },
		                   {Type:"Text",     	Hidden:0, Width:120, Align:"Left", 		ColMerge:0, SaveName:"bl_no",       		KeyField:0, Format:"",    UpdateEdit:0, InsertEdit:0, InputCaseSensitive:1},
		                   {Type:"Combo",    	Hidden:0, Width:75,  Align:"Center", 	ColMerge:0, SaveName:"cnsl_ind_flg",  		KeyField:0, Format:"",    UpdateEdit:1, InsertEdit:0, EditLen:1 },
		                   {Type:"Text",     	Hidden:0, Width:120, Align:"Left", 		ColMerge:0, SaveName:"pre_hbl_no",  		KeyField:0, Format:"",    UpdateEdit:1, InsertEdit:0, EditLen:20, InputCaseSensitive:1 },
		                   {Type:"Combo",    	Hidden:0, Width:75,  Align:"Center", 	ColMerge:0, SaveName:"mvmt_tp_cd",  		KeyField:0, Format:"",    UpdateEdit:1, InsertEdit:0, EditLen:1 },
		                   {Type:"Text",     	Hidden:0, Width:60,  Align:"Left", 		ColMerge:0, SaveName:"smt_tp_cd",       	KeyField:0, Format:"",    UpdateEdit:0, InsertEdit:0 },
		                   {Type:"Combo",    	Hidden:0, Width:60,  Align:"Left", 		ColMerge:0, SaveName:"msg_sts_cd",      	KeyField:0, Format:"",    UpdateEdit:0, InsertEdit:0 },
		                   {Type:"Combo",     	Hidden:0, Width:130, Align:"Left", 		ColMerge:0, SaveName:"rsk_ass_cd",    		KeyField:0, Format:"",    UpdateEdit:0, InsertEdit:0 },
		                   {Type:"Text",     	Hidden:1, Width:40,  Align:"Left", 		ColMerge:0, SaveName:"hbl_cmpl_flg",    	KeyField:0, Format:"",    UpdateEdit:0, InsertEdit:0 },
		                   {Type:"Combo",     	Hidden:0, Width:120, Align:"Left", 		ColMerge:0, SaveName:"hbl_cmpl_cd",    		KeyField:0, Format:"",    UpdateEdit:0, InsertEdit:0 },
		                   {Type:"Combo",     	Hidden:0, Width:100, Align:"Left", 		ColMerge:0, SaveName:"dspo_cd",    			KeyField:0, Format:"",    UpdateEdit:0, InsertEdit:0 },
		                   {Type:"Combo",     	Hidden:0, Width:70,  Align:"Left", 		ColMerge:0, SaveName:"mtch_sts_cd",    		KeyField:0, Format:"",    UpdateEdit:0, InsertEdit:0 },
		                   {Type:"Text",     	Hidden:1, Width:70,  Align:"Left", 		ColMerge:0, SaveName:"atd_cmpl_flg",    	KeyField:0, Format:"",    UpdateEdit:0, InsertEdit:0 },
		                   {Type:"Text",     	Hidden:0, Width:50,  Align:"Center", 	ColMerge:0, SaveName:"his_view",    		KeyField:0, Format:"",    UpdateEdit:0, InsertEdit:0, FontUnderline:1 },
		                   {Type:"Text",     	Hidden:1, Width:50,  Align:"Left", 		ColMerge:0, SaveName:"shpr_trdp_cd", 		KeyField:0, Format:"",    UpdateEdit:1, InsertEdit:0, EditLen:20,  Ellipsis:1 },
		                   {Type:"PopupEdit",   Hidden:0, Width:140, Align:"Left", 		ColMerge:0, SaveName:"shpr_trdp_nm", 		KeyField:0, Format:"",    UpdateEdit:1, InsertEdit:0, EditLen:60,  Ellipsis:0, AcceptKeys:AcceptKeysOfAddressField, InputCaseSensitive:1 },
		                   {Type:"Text",     	Hidden:0, Width:140, Align:"Left", 		ColMerge:0, SaveName:"shpr_trdp_addr", 		KeyField:0, Format:"",    UpdateEdit:1, InsertEdit:0, EditLen:105, Ellipsis:1, AcceptKeys:AcceptKeysOfAddressField, InputCaseSensitive:1 },
		                   {Type:"Image",     	Hidden:0, Width:30,  Align:"Center",  	ColMerge:0, SaveName:"shpr_img",            KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                   {Type:"Text",     	Hidden:0, Width:60,  Align:"Left", 		ColMerge:0, SaveName:"shpr_trdp_cty_nm", 	KeyField:0, Format:"",    UpdateEdit:1, InsertEdit:0, EditLen:35,  Ellipsis:1, AcceptKeys:AcceptKeysOfAddressField, InputCaseSensitive:1 },
		                   {Type:"PopupEdit",	Hidden:0, Width:40,  Align:"Left", 		ColMerge:0, SaveName:"shpr_trdp_ste_cd", 	KeyField:0, Format:"",    UpdateEdit:1, InsertEdit:0, EditLen:2,   Ellipsis:0, AcceptKeys:AcceptKeysOfCodeField, InputCaseSensitive:1 },
		                   {Type:"PopupEdit",	Hidden:0, Width:65,  Align:"Left", 		ColMerge:0, SaveName:"shpr_trdp_cnt_cd", 	KeyField:0, Format:"",    UpdateEdit:1, InsertEdit:0, EditLen:2,   Ellipsis:0, AcceptKeys:AcceptKeysOfCodeField, InputCaseSensitive:1 },
		                   {Type:"Text",     	Hidden:0, Width:80,  Align:"Left", 		ColMerge:0, SaveName:"shpr_trdp_zip_cd", 	KeyField:0, Format:"",    UpdateEdit:1, InsertEdit:0, EditLen:9,   Ellipsis:1, AcceptKeys:AcceptKeysOfAddressField, InputCaseSensitive:1 },
		                   {Type:"Text",     	Hidden:1, Width:50,  Align:"Left", 		ColMerge:0, SaveName:"cnee_trdp_cd", 		KeyField:0, Format:"",    UpdateEdit:1, InsertEdit:0, EditLen:20,  Ellipsis:1 },
		                   {Type:"PopupEdit",	Hidden:0, Width:140, Align:"Left", 		ColMerge:0, SaveName:"cnee_trdp_nm", 		KeyField:0, Format:"",    UpdateEdit:1, InsertEdit:0, EditLen:60,  Ellipsis:1, AcceptKeys:AcceptKeysOfAddressField, InputCaseSensitive:1 },
		                   {Type:"Text",     	Hidden:0, Width:140, Align:"Left", 		ColMerge:0, SaveName:"cnee_trdp_addr", 		KeyField:0, Format:"",    UpdateEdit:1, InsertEdit:0, EditLen:105, Ellipsis:1, AcceptKeys:AcceptKeysOfAddressField, InputCaseSensitive:1 },
		                   {Type:"Image",     	Hidden:0, Width:30,  Align:"Center",  	ColMerge:0, SaveName:"cnee_img",          	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                   {Type:"Text",     	Hidden:0, Width:60,  Align:"Left", 		ColMerge:0, SaveName:"cnee_trdp_cty_nm", 	KeyField:0, Format:"",    UpdateEdit:1, InsertEdit:0, EditLen:35,  Ellipsis:1, AcceptKeys:AcceptKeysOfAddressField, InputCaseSensitive:1 },
		                   {Type:"PopupEdit",	Hidden:0, Width:40,  Align:"Left", 		ColMerge:0, SaveName:"cnee_trdp_ste_cd", 	KeyField:0, Format:"",    UpdateEdit:1, InsertEdit:0, EditLen:2,   Ellipsis:1, AcceptKeys:AcceptKeysOfCodeField, InputCaseSensitive:1 },
		                   {Type:"PopupEdit",	Hidden:0, Width:65,  Align:"Left", 		ColMerge:0, SaveName:"cnee_trdp_cnt_cd", 	KeyField:0, Format:"",    UpdateEdit:1, InsertEdit:0, EditLen:2,   Ellipsis:1, AcceptKeys:AcceptKeysOfCodeField, InputCaseSensitive:1 },
		                   {Type:"Text",     	Hidden:0, Width:80,  Align:"Left", 		ColMerge:0, SaveName:"cnee_trdp_zip_cd", 	KeyField:0, Format:"",    UpdateEdit:1, InsertEdit:0, EditLen:9,   Ellipsis:1, AcceptKeys:AcceptKeysOfAddressField, InputCaseSensitive:1 },
		                   {Type:"Text",     	Hidden:1, Width:50,  Align:"Left", 		ColMerge:0, SaveName:"poc_trdp_cd", 		KeyField:0, Format:"",    UpdateEdit:1, InsertEdit:0, EditLen:20,  Ellipsis:1 },
		                   {Type:"PopupEdit",   Hidden:1, Width:140, Align:"Left", 		ColMerge:0, SaveName:"poc_trdp_nm", 		KeyField:0, Format:"",    UpdateEdit:1, InsertEdit:0, EditLen:60,  Ellipsis:1, AcceptKeys:AcceptKeysOfAddressField, InputCaseSensitive:1 },
		                   {Type:"Text",     	Hidden:1, Width:140, Align:"Left", 		ColMerge:0, SaveName:"poc_trdp_addr", 		KeyField:0, Format:"",    UpdateEdit:1, InsertEdit:0, EditLen:105, Ellipsis:1, AcceptKeys:AcceptKeysOfAddressField, InputCaseSensitive:1 },
		                   {Type:"Image",     	Hidden:0, Width:30,  Align:"Center",  	ColMerge:0, SaveName:"poc_img",         	KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		                   {Type:"Text",     	Hidden:1, Width:60,  Align:"Left", 		ColMerge:0, SaveName:"poc_trdp_cty_nm", 	KeyField:0, Format:"",    UpdateEdit:1, InsertEdit:0, EditLen:30,  Ellipsis:1, AcceptKeys:AcceptKeysOfAddressField, InputCaseSensitive:1 },
		                   {Type:"PopupEdit",   Hidden:1, Width:40,  Align:"Left", 		ColMerge:0, SaveName:"poc_trdp_ste_cd", 	KeyField:0, Format:"",    UpdateEdit:1, InsertEdit:0, EditLen:2,   Ellipsis:1, AcceptKeys:AcceptKeysOfCodeField, InputCaseSensitive:1 },
		                   {Type:"PopupEdit",   Hidden:1, Width:50,  Align:"Left", 		ColMerge:0, SaveName:"poc_trdp_cnt_cd", 	KeyField:0, Format:"",    UpdateEdit:1, InsertEdit:0, EditLen:2,   Ellipsis:1, AcceptKeys:AcceptKeysOfCodeField, InputCaseSensitive:1 },
		                   {Type:"Text",     	Hidden:1, Width:80,  Align:"Left", 		ColMerge:0, SaveName:"poc_trdp_zip_cd", 	KeyField:0, Format:"",    UpdateEdit:1, InsertEdit:0, EditLen:9,   Ellipsis:1, AcceptKeys:AcceptKeysOfAddressField, InputCaseSensitive:1 },
		                   {Type:"PopupEdit",	Hidden:0, Width:50,  Align:"Left", 		ColMerge:0, SaveName:"fnl_dest_cd",  		KeyField:0, Format:"",    UpdateEdit:1, InsertEdit:0, EditLen:4, AcceptKeys:AcceptKeysOfCodeField, InputCaseSensitive:1 },
		                   {Type:"Text",     	Hidden:0, Width:140, Align:"Left", 		ColMerge:0, SaveName:"fnl_dest_nm",  		KeyField:0, Format:"",    UpdateEdit:0, InsertEdit:0, EditLen:50, Ellipsis:1, AcceptKeys:AcceptKeysOfNameField, InputCaseSensitive:1},
		                   {Type:"PopupEdit",	Hidden:0, Width:60,  Align:"Left", 		ColMerge:0, SaveName:"sub_fnl_dest_cd", 	KeyField:0, Format:"",    UpdateEdit:1, InsertEdit:0, EditLen:4 , AcceptKeys:AcceptKeysOfCodeField, InputCaseSensitive:1},
		                   {Type:"PopupEdit",	Hidden:0, Width:60,  Align:"Left", 		ColMerge:0, SaveName:"pod_cd",    			KeyField:0, Format:"",    UpdateEdit:1, InsertEdit:0, EditLen:4, Ellipsis:1, AcceptKeys:AcceptKeysOfCodeField, InputCaseSensitive:1 },
		                   {Type:"Text",     	Hidden:0, Width:140, Align:"Left", 		ColMerge:0, SaveName:"pod_nm",  			KeyField:0, Format:"",    UpdateEdit:0, InsertEdit:0, EditLen:50, Ellipsis:1, AcceptKeys:AcceptKeysOfNameField, InputCaseSensitive:1 },
		                   {Type:"PopupEdit",	Hidden:0, Width:60,  Align:"Left", 		ColMerge:0, SaveName:"sub_pod_cd",  		KeyField:0, Format:"",    UpdateEdit:1, InsertEdit:0, EditLen:4, AcceptKeys:AcceptKeysOfCodeField, InputCaseSensitive:1 },
		                   {Type:"Text",     	Hidden:0, Width:140, Align:"Left", 		ColMerge:0, SaveName:"del_nm",  			KeyField:0, Format:"",    UpdateEdit:1, InsertEdit:0, EditLen:25, Ellipsis:1, AcceptKeys:AcceptKeysOfNameField, InputCaseSensitive:1},
		                   {Type:"PopupEdit",	Hidden:0, Width:60,  Align:"Left", 		ColMerge:0, SaveName:"del_cnt_cd", 			KeyField:0, Format:"",    UpdateEdit:1, InsertEdit:0, EditLen:2, AcceptKeys:AcceptKeysOfCodeField, InputCaseSensitive:1 },
		                   {Type:"Float",     	Hidden:0, Width:70,  Align:"Right", 	ColMerge:0, SaveName:"grs_wgt",     		KeyField:0, Format:"Float",    UpdateEdit:1, InsertEdit:0, EditLen:10 },
		                   {Type:"Float",     	Hidden:0, Width:70,  Align:"Right", 	ColMerge:0, SaveName:"meas",        		KeyField:0, Format:"Float",    UpdateEdit:1, InsertEdit:0, EditLen:8 },
		                   {Type:"Text",     	Hidden:0, Width:70,  Align:"Right",    	ColMerge:0, SaveName:"cntr_cnt",    		KeyField:0, Format:"",    UpdateEdit:0, InsertEdit:0 },
		                   {Type:"Text",     	Hidden:0, Width:70,  Align:"Center",   	ColMerge:0, SaveName:"cntr_cgo",   			KeyField:0, Format:"",    UpdateEdit:0, InsertEdit:0 },
		                   {Type:"Text",     	Hidden:0, Width:70,  Align:"Center",   	ColMerge:0, SaveName:"dg_cgo",   			KeyField:0, Format:"",    UpdateEdit:0, InsertEdit:0 },
		                   {Type:"Text",     	Hidden:1, Width:140, Align:"Left", 		ColMerge:0, SaveName:"rmk3_txt",        	KeyField:0, Format:"",    UpdateEdit:1, InsertEdit:0, EditLen:300, Ellipsis:1, AcceptKeys:AcceptKeysOfAddressField, InputCaseSensitive:1},
		                   {Type:"Text",     	Hidden:1, Width:140, Align:"Left", 		ColMerge:0, SaveName:"haz_cntc_nm",        	KeyField:0, Format:"",    UpdateEdit:1, InsertEdit:0, EditLen:60, Ellipsis:1, AcceptKeys:AcceptKeysOfAddressField, InputCaseSensitive:1},
		                   {Type:"Text",     	Hidden:1, Width:140, Align:"Left", 		ColMerge:0, SaveName:"haz_cntc_phn",        KeyField:0, Format:"",    UpdateEdit:1, InsertEdit:0, EditLen:35, Ellipsis:1, AcceptKeys:AcceptKeysOfAddressField, InputCaseSensitive:1},
		                   {Type:"Text",     	Hidden:1, Width:0,   Align:"Center", 	ColMerge:0, SaveName:"intg_bl_seq", 		KeyField:0, Format:"",    UpdateEdit:0, InsertEdit:0 },
		                   {Type:"Text",     	Hidden:1, Width:0,   Align:"Center", 	ColMerge:0, SaveName:"intg_mbl_seq",  		KeyField:0, Format:"",    UpdateEdit:0, InsertEdit:0 },
		                   {Type:"Text",     	Hidden:1, Width:0,   Align:"Center", 	ColMerge:0, SaveName:"air_sea_clss_cd",  	KeyField:0, Format:"",    UpdateEdit:0, InsertEdit:0 },
		                   {Type:"Text",     	Hidden:1, Width:0,   Align:"Center", 	ColMerge:0, SaveName:"bnd_clss_cd",  		KeyField:0, Format:"",    UpdateEdit:0, InsertEdit:0 },
		                   {Type:"Text",     	Hidden:1, Width:0,   Align:"Center", 	ColMerge:0, SaveName:"cstms_rgst_flg",  	KeyField:0, Format:"",    UpdateEdit:0, InsertEdit:0 },
		                   {Type:"Text",     	Hidden:1, Width:0,   Align:"Center", 	ColMerge:0, SaveName:"ref_no",  			KeyField:0, Format:"",    UpdateEdit:0, InsertEdit:0 },
		                   {Type:"Status",   	Hidden:1, Width:0,   Align:"Left",   	ColMerge:0, SaveName:"ibflag" }
		                   ];
		       
		      	InitColumns(cols);
		      	SetColProperty('msg_sts_cd', 	{ComboText:MSG_STS_NM, ComboCode:MSG_STS_CD} );
		      	SetColProperty('dspo_cd', 		{ComboText:DSPO_NM, ComboCode:DSPO_CD} );
		      	SetColProperty('rsk_ass_cd', 	{ComboText:DSPO_NM, ComboCode:DSPO_CD} );
		      	SetColProperty('hbl_cmpl_cd', 	{ComboText:DSPO_NM, ComboCode:DSPO_CD} );
		      	SetColProperty('mtch_sts_cd', 	{ComboText:DSPO_NM, ComboCode:DSPO_CD} );
		      	SetColProperty('cnsl_ind_flg', 	{ComboText:'Consol|Non-Consol', ComboCode:'Y|N'} );
		      	SetColProperty('mvmt_tp_cd', 	{ComboText:'Import|InTransit|FROB', ComboCode:'Import|InTransit|FROB'} );
		      	
		      	SetImageList(0,"web/img/main/icon_m.gif");
		      	SetImageList(1,"web/img/main/icon_m.gif");
		      	SetImageList(2,"web/img/main/icon_m.gif");

		      	
		      	SetEditable(1);
		        SetSheetHeight(511);
		        SetHeaderRowHeight(20);
		        SetHeaderRowHeight(20);
			}
		break;
	}
}

function sheet1_OnSearchEnd() {
	formatDataRow();
}

function sheet1_OnSaveEnd(sheetObj, errCd, errMsg){
	if(errMsg != ""){
		alert(errMsg);
	}else{
		formatDataRow();
	}
}

function sheet1_OnChange(sheetObj, Row, Col, value) {
	cur_sheetObj = sheetObj;
	cur_rowIdx = Row;
	var colStr=sheetObj.ColSaveName(Col);
	if(colStr == "cnsl_ind_flg"){
//		if(sheetObj.GetCellValue(Row,"cnsl_ind_flg") == "N"){
//			sheetObj.SetCellEditable(Row, "pre_hbl_no", 0);
//		} else {
//			sheetObj.SetCellEditable(Row, "pre_hbl_no", 1);
//		}
		
	} else if(colStr=="pod_cd"){
		var codeStr =  sheetObj.GetCellValue(Row, Col);
		if(codeStr.length >= 2){
			sheetObj.SetCellValue(Row, 'pod_nm', '', 0);
			doAutoSearch(sheetObj, Row, Col, 'location_cbsa', codeStr, 'pod_cd', 'pod_nm');
		}
	} else if(colStr=="fnl_dest_cd"){
		var codeStr =  sheetObj.GetCellValue(Row, Col);
		if(codeStr.length >= 2){
			sheetObj.SetCellValue(Row, 'fnl_dest_nm', '', 0);
			doAutoSearch(sheetObj, Row, Col, 'location_cbsa', codeStr, 'fnl_dest_cd', 'fnl_dest_nm');
		}
	} else if(colStr=="shpr_trdp_cnt_cd" || colStr=="cnee_trdp_cnt_cd" || colStr=="del_cnt_cd"
		|| colStr=="poc_trdp_cnt_cd" ){
		var codeStr =  sheetObj.GetCellValue(Row, Col);
		if(codeStr.length >= 2){
			sheetObj.SetCellValue(Row, codeStr.replace('_cd','_nm'), '', 0);
			doAutoSearch(sheetObj, Row, Col, 'country', codeStr, colStr, codeStr.replace('_cd','_nm'));
		}
	} else if(colStr=="shpr_trdp_ste_cd" || colStr=="cnee_trdp_ste_cd" 
		|| colStr=="poc_trdp_ste_cd" ){
		var codeStr =  sheetObj.GetCellValue(Row, Col);
		if(codeStr.length >= 2){
			sheetObj.SetCellValue(Row, codeStr.replace('_cd','_nm'), '', 0);
			doAutoSearch(sheetObj, Row, Col, 'state', codeStr, colStr, codeStr.replace('_cd','_nm'), '&s_cnt_cd='+sheetObj.GetCellValue(Row, colStr.replace("ste","cnt")));
		}
	} else if(colStr=="sub_pod_cd" || colStr=="sub_fnl_dest_cd"){
		var codeStr =  sheetObj.GetCellValue(Row, Col);
		if(codeStr.length >= 2){
			doAutoSearch(sheetObj, Row, Col, 'location_cbsa_sub', codeStr, colStr);
			if(sheetObj.GetCellValue(Row, "pod_cd") == sheetObj.GetCellValue(Row, "fnl_dest_cd")  ){
				sheetObj.SetCellValue(Row, "sub_pod_cd", sheetObj.GetCellValue(Row, colStr), 0);
				sheetObj.SetCellValue(Row, "sub_fnl_dest_cd", sheetObj.GetCellValue(Row, colStr), 0);
			}
		}
	} else if(colStr=="grs_wgt" || colStr=="meas"){
		if (value == "") {
			sheetObj.SetCellValue(Row, Col, 0);
		}
	}
}

function sheet1_OnClick(sheetObj, Row, col) {
	var formObj=document.frm1;
	var colStr=sheetObj.ColSaveName(col);
	if(colStr == "his_view"){
   		rtnary=new Array(1);
   		rtnary[0]=sheetObj.GetCellValue(Row, "bl_no");
   		rtnary[1]="ACI";
	    modal_center_open('./EDI_ACI_0012.clt', rtnary, 950,450,"yes");
	}else if (colStr == "cnee_img" || colStr == "shpr_img" ) {
		var pfx = colStr.substring(0, 4);
		ComShowMemoPad4(sheetObj, Row, pfx + "_trdp_addr", false, 250, 130, col, pfx + "_trdp_addr");   
	}else if (colStr == "del_img" || colStr == "poc_img") {
		var pfx = colStr.substring(0, 3);
		ComShowMemoPad4(sheetObj, Row, pfx + "_trdp_addr", false, 250, 130, col, pfx + "_trdp_addr");  
	}
}

var trdp_tp = "";
var loc_tp = "";
var cnt_tp = "";
var ste_tp = "";
var sub_loc_tp = "";
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
	   		
		} else if(sheetObj.ColSaveName(col)=="poc_trdp_nm"){
			sheetObj.SelectCell(row, col);
			
			trdp_tp = "poc";
			rtnary=new Array(1);
	   		rtnary[0]="2";
	   		rtnary[1]=sheetObj.GetCellValue(row, col);
	   		rtnary[2]=window;
	   		
	   		callBackFunc = "TRDP_POPUP";
	   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150, 650,"yes");
	   		
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
   		
	} else if(colStr=="poc_trdp_nm"){
		trdp_tp = "poc";
   		rtnary=new Array(1);
   		rtnary[0]="2";
   		rtnary[1]="";
   		rtnary[2]=window;
   		
   		callBackFunc = "TRDP_POPUP";
   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150, 650, "yes");
   		
	} else if(colStr=="pod_cd"){
		loc_tp = colStr;
		rtnary=new Array(3);
	    rtnary[0]="";   // 
	    rtnary[1]="" ;
	    rtnary[2]="";
	    callBackFunc = "LOC_POPUP";
	    modal_center_open('./EDI_ACI_0011.clt?loc_tp_cd=O', rtnary, 806,480,"yes");
   		
   		
	} else if(colStr=="fnl_dest_cd"){
		loc_tp = colStr;
		rtnary=new Array(3);
	    rtnary[0]="";   // 
	    rtnary[1]="" ;
	    rtnary[2]="";
	    callBackFunc = "LOC_POPUP";
	    modal_center_open('./EDI_ACI_0011.clt?loc_tp_cd=O', rtnary, 806,480,"yes");
   		
	} else if(colStr=="shpr_trdp_cnt_cd" || colStr=="cnee_trdp_cnt_cd" || colStr=="del_cnt_cd" 
		|| colStr=="poc_trdp_cnt_cd" ){
		cnt_tp = colStr;
		rtnary=new Array(3);
	    rtnary[0]="";
	    rtnary[1]="" ;
	    rtnary[2]="";
	    callBackFunc = "CNT_POPUP";
	    modal_center_open('./CMM_POP_0020.clt', rtnary, 806,480,"yes");
	    
	} else if(colStr=="shpr_trdp_ste_cd" || colStr=="cnee_trdp_ste_cd" 
		|| colStr=="poc_trdp_ste_cd" ){
		ste_tp = colStr;
		rtnary=new Array(3);
	    rtnary[0]="1";
	    rtnary[1]=sheetObj.GetCellValue(row, colStr.replace("ste","cnt"));
	    callBackFunc = "STE_POPUP";
	    modal_center_open('./CMM_POP_0310.clt', rtnary, 806,480,"yes");
	    
	} else if(colStr=="sub_pod_cd" || colStr=="sub_fnl_dest_cd"){
		sub_loc_tp = colStr;
		rtnary=new Array(3);
	    rtnary[0]=sheetObj.GetCellValue(row, colStr.substring(4));   // 
	    rtnary[1]="" ;
	    rtnary[2]="";
	    callBackFunc = "SUB_LOC_POPUP";
	    modal_center_open('./EDI_ACI_0011.clt?loc_tp_cd=W', rtnary, 806,480,"yes");
	}
}

function SUB_LOC_POPUP(rtnVal){
	var sheetObj = cur_sheetObj;
	
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		sheetObj.SetCellValue(cur_rowIdx, sub_loc_tp,rtnValAry[0], 0);
		if(sheetObj.GetCellValue(cur_rowIdx, "pod_cd") == sheetObj.GetCellValue(cur_rowIdx, "fnl_dest_cd")  ){
			sheetObj.SetCellValue(cur_rowIdx, "sub_pod_cd",rtnValAry[0], 0);
			sheetObj.SetCellValue(cur_rowIdx, "sub_fnl_dest_cd",rtnValAry[0], 0);
		}
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

function STE_POPUP(rtnVal){
	var sheetObj = cur_sheetObj;
	
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		sheetObj.SetCellValue(cur_rowIdx, ste_tp,rtnValAry[0], 0);
	}
}

function TRDP_POPUP(rtnVal){
	var sheetObj = cur_sheetObj;
	
    if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		sheetObj.SetCellValue(cur_rowIdx, trdp_tp + '_trdp_cd', rtnValAry[0], 0); // trdp_cd
		sheetObj.SetCellValue(cur_rowIdx, trdp_tp + '_trdp_nm', rtnValAry[2].replace(/[:]/g,";").replace(/[']/g, "`"), 0); // full_nm
		sheetObj.SetCellValue(cur_rowIdx, trdp_tp + '_trdp_addr', rtnValAry[7].replace(rtnValAry[2], "").replace(/\n/g, " ").replace(/\r/g, " ").replace(/[:]/g,";").replace(/[']/g, "`").trim().substring(0, 105), 0); // address
		sheetObj.SetCellValue(cur_rowIdx, trdp_tp + '_trdp_cty_nm', rtnValAry[19], 0); // city
		sheetObj.SetCellValue(cur_rowIdx, trdp_tp + '_trdp_ste_cd', rtnValAry[20], 0); // state
		sheetObj.SetCellValue(cur_rowIdx, trdp_tp + '_trdp_zip_cd', rtnValAry[11], 0); // zip code
		sheetObj.SetCellValue(cur_rowIdx, trdp_tp + '_trdp_cnt_cd', rtnValAry[12], 0); // country
		sheetObj.SetCellValue(cur_rowIdx, trdp_tp + '_trdp_phn', rtnValAry[4], 0); // Phone
		sheetObj.SetCellValue(cur_rowIdx, trdp_tp + '_trdp_pic', rtnValAry[3], 0); // PIC
	}
    sheetObj.SelectCell(cur_rowIdx, trdp_tp + '_trdp_nm');
}

function LOC_POPUP(rtnVal){

	var sheetObj = cur_sheetObj;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		sheetObj.SetCellValue(cur_rowIdx, loc_tp,rtnValAry[0], 0);
		if(loc_tp =='pod_cd'){
			sheetObj.SetCellValue(cur_rowIdx, 'pod_nm',rtnValAry[1], 0);
		}else{
			sheetObj.SetCellValue(cur_rowIdx, 'fnl_dest_nm',rtnValAry[1], 0);
		}
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
		var pgmId = "";
		var bndClssCd = sheetObj.GetCellValue(Row, "bnd_clss_cd");
		var airSeaClssCd = sheetObj.GetCellValue(Row, "air_sea_clss_cd");
		var deptCd = airSeaClssCd + bndClssCd;
		if( deptCd == "SI"){
			pgmId = "SEI_BMD_0020";
		}else if(deptCd == "SO"){
			pgmId = "SEE_BMD_0020";
		}else if(deptCd == "AI"){
			pgmId = "AII_BMD_0020";
		}else if(deptCd == "AO"){
			pgmId = "AIE_BMD_0020";
		}
		var paramStr = "./" + pgmId + ".clt?f_cmd=" + SEARCHLIST + "&f_bl_no="
				+ escape(sheetObj.GetCellValue(Row, "bl_no")) + "&f_intg_bl_seq="
				+ sheetObj.GetCellValue(Row, "intg_bl_seq");
		parent.mkNewFrame('Booking & HBL', paramStr,pgmId+"_SHEET_" +  sheetObj.GetCellValue(Row, "bl_no") + "_" + sheetObj.GetCellValue(Row, "intg_bl_seq"));
		
	}else if(colStr == 'mbl_no'){
		doProcess=true;
		formObj.f_cmd.value="";
		var pgmId = "";
		var bndClssCd = sheetObj.GetCellValue(Row, "bnd_clss_cd");
		var airSeaClssCd = sheetObj.GetCellValue(Row, "air_sea_clss_cd");
		var deptCd = airSeaClssCd + bndClssCd;
		if( deptCd == "SI"){
			pgmId = "SEI_BMD_0040";
		}else if(deptCd == "SO"){
			pgmId = "SEE_BMD_0040";
		}else if(deptCd == "AI"){
			pgmId = "AII_BMD_0040";
		}else if(deptCd == "AO"){
			pgmId = "AIE_BMD_0040";
		}
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
		//modal_center_open('./SEE_AFR_0090.clt?'+param, rtnary, 840,420,"yes");
		
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
    modal_center_open('./CMM_POP_0140.clt', rtnary, 656,500,"yes");
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

function ediClssChg(){
	// Button Control
	btnCtrl(frm1.f_mf_sub_tp_cd.value); 
	// Grid Control
	grdCtrl(frm1.f_mf_sub_tp_cd.value); 
}

function btnCtrl(ediClssCd){
	if(ediClssCd == "Supplementary"){	// Supplementary
		getBtnObj("btnSndHblEdi").style.display = "none";
		getBtnObj("btnSndHblClzEdi").style.display = "none";
		getBtnObj("btnSndHblDelEdi").style.display = "none";
		
		getBtnObj("btnSndHblSplEdi").style.display = "";
		getBtnObj("btnSndHblSplDelEdi").style.display = "";
		
	}else if(ediClssCd == "HouseBill"){	//House Bill
		getBtnObj("btnSndHblEdi").style.display = "";
		getBtnObj("btnSndHblClzEdi").style.display = "";
		getBtnObj("btnSndHblDelEdi").style.display = "";
		
		getBtnObj("btnSndHblSplEdi").style.display = "none";
		getBtnObj("btnSndHblSplDelEdi").style.display = "none";
	}else{	//House Bill
		getBtnObj("btnSndHblEdi").style.display = "";
		getBtnObj("btnSndHblClzEdi").style.display = "";
		getBtnObj("btnSndHblDelEdi").style.display = "";
		
		getBtnObj("btnSndHblSplEdi").style.display = "";
		getBtnObj("btnSndHblSplDelEdi").style.display = "";
	}
}

function grdCtrl(ediClssCd){
	shtObj = docObjects[0];
	if(ediClssCd == "Supplementary"){	// Supplementary
		shtObj.SetColHidden("clz_flg", 1);
		shtObj.SetColHidden("dspo_cd", 1);
		shtObj.SetColHidden("pod_cd", 1);
		shtObj.SetColHidden("pod_nm", 1);
		shtObj.SetColHidden("sub_pod_cd", 1);
		shtObj.SetColHidden("rsk_ass_cd", 0);
		shtObj.SetColHidden("hbl_cmpl_cd", 1);
		shtObj.SetColHidden("cnsl_ind_flg", 1);
		shtObj.SetColHidden("pre_hbl_no", 1);
		shtObj.SetColHidden("del_nm", 0);
		shtObj.SetColHidden("del_cnt_cd", 0);
		shtObj.SetColHidden("fnl_dest_cd", 1);
		shtObj.SetColHidden("fnl_dest_nm", 1);
		shtObj.SetColHidden("sub_fnl_dest_cd", 1);
		shtObj.SetColHidden("rmk3_txt", 1);
		shtObj.SetColHidden("poc_trdp_nm", 1);
		shtObj.SetColHidden("poc_trdp_addr", 1);
		shtObj.SetColHidden("poc_img", 1);
		shtObj.SetColHidden("poc_trdp_cty_nm", 1);
		shtObj.SetColHidden("poc_trdp_ste_cd", 1);
		shtObj.SetColHidden("poc_trdp_zip_cd", 1);
		shtObj.SetColHidden("poc_trdp_cnt_cd", 1);
		shtObj.SetColHidden("dg_cgo", 1);
		shtObj.SetColHidden("haz_cntc_nm", 1);
		shtObj.SetColHidden("haz_cntc_phn", 1);
		shtObj.SetColHidden("grs_wgt", 1);
		shtObj.SetColHidden("meas", 1);
		//shtObj.SetColHidden("atd_cmpl_flg", 1);
		//shtObj.SetColHidden("hbl_cmpl_flg", 1);
		
	}else if(ediClssCd == "HouseBill"){	//House Bill
		shtObj.SetColHidden("clz_flg", 0);
		shtObj.SetColHidden("dspo_cd", 0);
		shtObj.SetColHidden("pod_cd", 0);
		shtObj.SetColHidden("pod_nm", 0);
		shtObj.SetColHidden("sub_pod_cd", 0);
		shtObj.SetColHidden("rsk_ass_cd", 1);
		shtObj.SetColHidden("hbl_cmpl_cd", 0);
		shtObj.SetColHidden("cnsl_ind_flg", 0);
		shtObj.SetColHidden("pre_hbl_no", 0);
		shtObj.SetColHidden("del_nm", 1);
		shtObj.SetColHidden("del_cnt_cd", 1);
		shtObj.SetColHidden("fnl_dest_cd", 0);
		shtObj.SetColHidden("fnl_dest_nm", 0);
		shtObj.SetColHidden("rmk3_txt", 0);
		shtObj.SetColHidden("sub_fnl_dest_cd", 0);
		shtObj.SetColHidden("poc_trdp_nm", 0);
		shtObj.SetColHidden("poc_trdp_addr", 0);
		shtObj.SetColHidden("poc_trdp_cty_nm", 0);
		shtObj.SetColHidden("poc_trdp_ste_cd", 0);
		shtObj.SetColHidden("poc_trdp_zip_cd", 0);
		shtObj.SetColHidden("poc_trdp_cnt_cd", 0);
		shtObj.SetColHidden("dg_cgo", 0);
		shtObj.SetColHidden("haz_cntc_nm", 0);
		shtObj.SetColHidden("haz_cntc_phn", 0);
		shtObj.SetColHidden("grs_wgt", 0);
		shtObj.SetColHidden("meas", 0);
		//shtObj.SetColHidden("atd_cmpl_flg", 0);
		//shtObj.SetColHidden("hbl_cmpl_flg", 0);
	}else{	// All View
		shtObj.SetColHidden("flz_flg", 0);
		shtObj.SetColHidden("dspo_cd", 0);
		shtObj.SetColHidden("mtch_sts_cd", 0);
		shtObj.SetColHidden("pod_cd", 0);
		shtObj.SetColHidden("pod_nm", 0);
		shtObj.SetColHidden("sub_pod_cd", 0);
		shtObj.SetColHidden("cnsl_ind_flg", 0);
		shtObj.SetColHidden("pre_hbl_no", 0);
		shtObj.SetColHidden("del_nm", 0);
		shtObj.SetColHidden("del_cnt_cd", 0);
		shtObj.SetColHidden("fnl_dest_cd", 0);
		shtObj.SetColHidden("fnl_dest_nm", 0);
		shtObj.SetColHidden("rmk3_txt", 0);
		shtObj.SetColHidden("sub_fnl_dest_cd", 0);
		shtObj.SetColHidden("poc_trdp_nm", 0);
		shtObj.SetColHidden("poc_trdp_addr", 0);
		shtObj.SetColHidden("poc_trdp_cty_nm", 0);
		shtObj.SetColHidden("poc_trdp_ste_cd", 0);
		shtObj.SetColHidden("poc_trdp_zip_cd", 0);
		shtObj.SetColHidden("poc_trdp_cnt_cd", 0);
		shtObj.SetColHidden("dg_cgo", 0);
		shtObj.SetColHidden("haz_cntc_nm", 0);
		shtObj.SetColHidden("haz_cntc_phn", 0);
		shtObj.SetColHidden("grs_wgt", 0);
		shtObj.SetColHidden("meas", 0);
		//shtObj.SetColHidden("atd_cmpl_flg", 0);
		//shtObj.SetColHidden("hbl_cmpl_flg", 0);
	}
}



function getEdiAciValidateInfo(reqVal){
	
	var formObj = document.frm1;
	var doc=getAjaxMsgXML(reqVal);
    
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var rtnArr = doc[1].split('^@');
			formObj.cntr_cnt.value = rtnArr[0];
			formObj.cntr_cgo.value = rtnArr[1];
		}
	}
}

function chgDept(){
	var formObj = document.frm1;
	formObj.f_air_sea_clss_cd.value = formObj.f_dept_cd.value.substring(0,1);
	formObj.f_bnd_clss_cd.value = formObj.f_dept_cd.value.substring(1, 2);
}

//Adjust font color and cell image after searching
function formatDataRow(){
	var sheetObj = docObjects[0];
	var shpr_trdp_addr = "";
	var cnee_trdp_addr = "";
	for(var i=2; i<=sheetObj.LastRow(); i++){
		if(sheetObj.GetCellValue(i,"cnsl_ind_flg") == "N"){
			sheetObj.SetCellEditable(i, "pre_hbl_no", 1);
		} else {
			sheetObj.SetCellEditable(i, "pre_hbl_no", 1);
		}
		sheetObj.SetCellImage(i, "shpr_img", 0);
		sheetObj.SetCellImage(i, "cnee_img", 0);
		sheetObj.SetCellImage(i, "poc_img", 0);
		
		sheetObj.SetCellValue(i, 'shpr_trdp_addr',  sheetObj.GetCellValue(i,"shpr_trdp_addr").replace(/[:]/g,";").replace(/[']/g, "`").substring(0,105)  , 0);
		sheetObj.SetCellValue(i, 'cnee_trdp_addr',  sheetObj.GetCellValue(i,"cnee_trdp_addr").replace(/[:]/g,";").replace(/[']/g, "`").substring(0,105)  , 0);
		sheetObj.SetCellValue(i, 'poc_trdp_addr',  sheetObj.GetCellValue(i,"poc_trdp_addr").replace(/[:]/g,";").replace(/[']/g, "`").substring(0,105)  , 0);
		
		sheetObj.SetCellValue(i, 'shpr_trdp_nm',  sheetObj.GetCellValue(i,"shpr_trdp_nm").replace(/[:]/g,";").replace(/[']/g, "`").substring(0,60)  , 0);
		sheetObj.SetCellValue(i, 'cnee_trdp_nm',  sheetObj.GetCellValue(i,"cnee_trdp_nm").replace(/[:]/g,";").replace(/[']/g, "`").substring(0,60)  , 0);
		sheetObj.SetCellValue(i, 'poc_trdp_nm',  sheetObj.GetCellValue(i,"poc_trdp_nm").replace(/[:]/g,";").replace(/[']/g, "`").substring(0,60)  , 0);
		
		sheetObj.SetCellFontColor(i,'mbl_no',"#0000FF");
		sheetObj.SetCellFontColor(i,'bl_no',"#0000FF");
		sheetObj.SetCellValue(i, 'ibflag','R');
	}
}

function checkChangeTrnkVslNm(){
	var formObj = document.frm1;
	if(formObj.f_trnk_vsl_nm.value != formObj.trnk_vsl_nm.value){
		formObj.f_trnk_vsl_cd.value = "";
	}
}