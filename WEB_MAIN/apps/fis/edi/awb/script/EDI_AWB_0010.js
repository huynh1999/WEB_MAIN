//=========================================================
//*@FileName   : EDI_AWB_0010.jsp

//*@FileTitle  : AWB EDI 처리
//*@Description: AWB EDI 처리
//*@author     : Wonki Eo - Cyberlogitec
//*@version    : 1.0 - 10/23/2018
//*@since      : 10/23/2018
//=========================================================
/**
 * 화면로드 후 초기값 세팅
 */
var TODAY;
function initFinish(){
	var pDoc=parent.parent.parent.document;
	hideProcess('WORKING', pDoc);
}

var rtnary=new Array(1);
var callBackFunc = "";

function doWork(srcName, valObj){
	switch(srcName) {
		case "SEARCHLIST01":	//MAWB 조회
			frm1.val_msg.value = "";
			frm1.f_cmd.value=SEARCHLIST01;
			docObjects[0].DoSearch("EDI_AWB_0010GS.clt",   FormQueryString(frm1) );
		break;
		
		case "SEARCHLIST02":	//HAWB 조회
			frm1.val_msg.value = "";
			frm1.f_cmd.value=SEARCHLIST02;
			docObjects[1].DoSearch("EDI_AWB_0011GS.clt",   FormQueryString(frm1) );
		break;

		case "POL_LOCATION_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
       		rtnary=new Array(3);
      		rtnary[0]="A";
	   		rtnary[1]="BL";
	   		if(typeof(valObj)!='undefined'){
	   			rtnary[2]=frm1.f_pol_nm.value;
	   		}else{
	   			rtnary[2]="";
	   		}
	   		rtnary[3]="";
	   		rtnary[4]=document.frm1.dpt;
	   		
	   		callBackFunc = "POL_LOCATION_POPLIST";
  	        modal_center_open('./CMM_POP_0030.clt',  rtnary, 806,440,"yes");  
		break;
		
		case "POD_LOCATION_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
       		rtnary=new Array(3);
      		rtnary[0]="A";
	   		rtnary[1]="BL";
	   		if(typeof(valObj)!='undefined'){
	   			rtnary[2]=frm1.f_pod_nm.value;
	   		}else{
	   			rtnary[2]="";
	   		}
	   		rtnary[3]="";
	   		rtnary[4]=document.frm1.dpt;
	   		
	   		callBackFunc = "POD_LOCATION_POPLIST";
  	        modal_center_open('./CMM_POP_0030.clt',  rtnary, 806,440,"yes");  
		break;
		
		case "EDI_BL_SAVE":
			
			var msg_sts_cd ='';
			var flt_crr_cd = '';
			for(var i=2; i<=cur_sheetObj.LastRow(); i++){
				if(cur_sheetObj.GetCellValue(i, "ibflag") == "U"){
					msg_sts_cd 	= cur_sheetObj.GetCellValue(i, "msg_sts_cd");
					flt_crr_cd 	= cur_sheetObj.GetCellValue(i, "flt_crr_cd");
					if(msg_sts_cd == "S"){ // Sent
						//#6827 : [BEST OCEAN] EAWB TRNSMISSION AFTER REVISE DATA
						if(flt_crr_cd == "CA") {
							if(!confirm(getLabel('FMS_COM_ALT166'))){
								return;
							}
						} else {
							alert(getLabel('EDI_COM_ALT276') );
							cur_sheetObj.SetCellValue(i, "ibflag", "R");
							return;
						}
					}
					
					//체크박스 체크여부와 관계없이 수정된 ROW 즉, IBFLAG = 'U'는 모두 저장
					//if(cur_sheetObj.GetCellValue(i, "chk") == 0){
					//	cur_sheetObj.SetCellValue(i, "ibflag", "R");
					//}
					
				}
			}	
			
			//SAVE 시 필수 항목 BL ENTRY에서 수정하도록 가이드하는 VALIDATION
			if (!awbSaveOnlyValidation(cur_sheetObj, srcName)){
    			return false;
    		}
			
            frm1.f_cmd.value=COMMAND04;
            deleteFunction();
            var param = FormQueryString(frm1);
            if ( cur_sheetObj == docObjects[0] ){
            	cur_sheetObj.DoSave("./EDI_AWB_0010GS.clt", param,"ibflag", "U");
            }else{
            	cur_sheetObj.DoSave("./EDI_AWB_0011GS.clt", param,"ibflag", "U");
            }
		break;
		
		case "SEND_EDI":		
			frm1.val_msg.value = "";
			if(cur_sheetObj.CheckedRows("chk") == 0){
        		alert(getLabel('FMS_COM_ALT004') );
        		return;
        	}
			if (!awbEdiValidation(cur_sheetObj, srcName)){
    			return false;
    		}
			setTimeout(function(){
				if( confirm(getLabel('FMS_COM_CFMSENDEDI')) ){
					
					for(var i=2; i<=cur_sheetObj.LastRow(); i++){
						if(cur_sheetObj.GetCellValue(i, "ibflag") == "U"){
							//수정된 칼럼이라도 체크 안 한 경우 IBFLAG = 'R'로 변경하여 EDI SEND 불가 처리
							if(cur_sheetObj.GetCellValue(i, "chk") == 0){	
								cur_sheetObj.SetCellValue(i, "ibflag", "R");
							}
							
							if(cur_sheetObj.GetCellValue(i, "airln_sprt") == 'N'){
								alert("This airline is not support E-AWB.")
								return false;
							}
						}
					}	
					
					frm1.f_cmd.value=COMMAND01;
					deleteFunction();
					var param = FormQueryString(frm1);
					if ( cur_sheetObj == docObjects[0] ){
						cur_sheetObj.DoSave("./EDI_AWB_0010GS.clt", param,"ibflag", false);
					}else{
						cur_sheetObj.DoSave("./EDI_AWB_0011GS.clt", param,"ibflag", false);
					}
				}
			},100);
		break;
		
		case "DELETE":		//Send Delete EDI
			frm1.val_msg.value = "";
			if(cur_sheetObj.CheckedRows("chk") == 0){
        		alert(getLabel('FMS_COM_ALT004') );
        		return;
        	}

			var msg_sts_cd ='';
			for(var i=2; i<=cur_sheetObj.LastRow(); i++){
				if(cur_sheetObj.GetCellValue(i, "ibflag") == "U"){
					msg_sts_cd 	= cur_sheetObj.GetCellValue(i, "msg_sts_cd");
					
					//Only 'Created' Status can be deleted.
					//Cannot delete at least one of checked item is Sent, Rejected, Error, Accepted.
					if(msg_sts_cd != "C"){
						alert( 'Only Created Status can be deleted.' );
						return;
					}
					
					if(cur_sheetObj.GetCellValue(i, "ibflag") == "U"){
						//수정된 칼럼이라도 체크되어 있지 않은 경우 IBFLAG = 'R'로 변경하여 EDI SEND 하지 않도록 처리
						if(cur_sheetObj.GetCellValue(i, "chk") == 0){	
							cur_sheetObj.SetCellValue(i, "ibflag", "R");
						}
					}
					
				}
			}				
			
			setTimeout(function(){
				if(getLabel('FMS_COM_CFMDEL')){
					frm1.f_cmd.value=COMMAND02;
					var param = FormQueryString(frm1);
					if ( cur_sheetObj == docObjects[0] ){
						cur_sheetObj.DoSave("./EDI_AWB_0010GS.clt", param,"ibflag", false);
					}else{
						cur_sheetObj.DoSave("./EDI_AWB_0011GS.clt", param,"ibflag", false);
					}
				}
			},100);
		break;
	}
}

function awbEdiValidation(sheetObj, cmd){
	var formObj=document.frm1;	
	var valMsgArr = new Array();

	for(var i=2; i<sheetObj.LastRow() + 1; i++){
		
		//Validation for saving
		if(sheetObj.GetCellValue(i, "chk") == 1){
			
			var msg_sts_cd 		= sheetObj.GetCellValue(i, "msg_sts_cd");
			
			var eta_dt 			= sheetObj.GetCellValue(i, "eta_dt"); 
			var pck_qty			= sheetObj.GetCellValue(i, "pck_qty");
			var awb_wgt_cd		= sheetObj.GetCellValue(i, "awb_wgt_cd");
			var awb_wgt			= sheetObj.GetCellValue(i, "awb_wgt");
			var awb_vol_cd		= sheetObj.GetCellValue(i, "awb_vol_cd");
			var awb_vol			= sheetObj.GetCellValue(i, "awb_vol");
			
			var flt_crr_cd		= sheetObj.GetCellValue(i, "flt_crr_cd");
			var flt_no			= sheetObj.GetCellValue(i, "flt_no");
			
			var awb_pfx_no		= sheetObj.GetCellValue(i, "awb_pfx_no");
			var awb_no			= sheetObj.GetCellValue(i, "awb_no");
			
			var spcl_rqst_desc  = sheetObj.GetCellValue(i, "spcl_rqst_desc");
			var acct_info_desc 	= sheetObj.GetCellValue(i, "acct_info_desc");

			var ppd_wgt_chg_amt = sheetObj.GetCellValue(i, "ppd_wgt_chg_amt");
			var ppd_val_chg_amt = sheetObj.GetCellValue(i, "ppd_val_chg_amt");
			var ppd_tax_amt 	= sheetObj.GetCellValue(i, "ppd_tax_amt");
			var ppd_agt_chg_amt = sheetObj.GetCellValue(i, "ppd_agt_chg_amt");
			var ppd_crr_chg_amt = sheetObj.GetCellValue(i, "ppd_crr_chg_amt");
			var ppd_ttl_chg_amt = sheetObj.GetCellValue(i, "ppd_ttl_chg_amt");

			var clt_wgt_chg_amt = sheetObj.GetCellValue(i, "clt_wgt_chg_amt");
			var clt_val_chg_amt = sheetObj.GetCellValue(i, "clt_val_chg_amt");
			var clt_tax_amt 	= sheetObj.GetCellValue(i, "clt_tax_amt");
			var clt_agt_chg_amt = sheetObj.GetCellValue(i, "clt_agt_chg_amt");
			var clt_crr_chg_amt = sheetObj.GetCellValue(i, "clt_crr_chg_amt");
			var clt_ttl_chg_amt = sheetObj.GetCellValue(i, "clt_ttl_chg_amt");

			var rt_piec_qty 	= sheetObj.GetCellValue(i, "rt_piec_qty");
			var rt_wgt_cd 		= sheetObj.GetCellValue(i, "rt_wgt_cd");
			var rt_wgt 			= sheetObj.GetCellValue(i, "rt_wgt");
			var rt_cd 			= sheetObj.GetCellValue(i, "rt_cd");
			var rt_val 			= sheetObj.GetCellValue(i, "rt_val");
			var rt_chg_wgt 		= sheetObj.GetCellValue(i, "rt_chg_wgt");
			var rt_chg_amt 		= sheetObj.GetCellValue(i, "rt_chg_amt");
			var rt_gds_desc 	= sheetObj.GetCellValue(i, "rt_gds_desc");
			var rt_cnsl_desc 	= sheetObj.GetCellValue(i, "rt_cnsl_desc");
			var rt_vol_cd 		= sheetObj.GetCellValue(i, "rt_vol_cd");
			var rt_vol 			= sheetObj.GetCellValue(i, "rt_vol");
			var rt_cmdt_cd 		= sheetObj.GetCellValue(i, "rt_cmdt_cd");
			var rt_org_cnt_cd 	= sheetObj.GetCellValue(i, "rt_org_cnt_cd");

			var shpr_cd 		= sheetObj.GetCellValue(i, "shpr_cd");
			var shpr_nm 		= sheetObj.GetCellValue(i, "shpr_nm");
			var shpr_addr 		= sheetObj.GetCellValue(i, "shpr_addr");
			var shpr_cty_nm 	= sheetObj.GetCellValue(i, "shpr_cty_nm");
			var shpr_cnt_cd 	= sheetObj.GetCellValue(i, "shpr_cnt_cd");

			var cnee_cd 		= sheetObj.GetCellValue(i, "cnee_cd");
			var cnee_nm 		= sheetObj.GetCellValue(i, "cnee_nm");
			var cnee_addr 		= sheetObj.GetCellValue(i, "cnee_addr");
			var cnee_cty_nm 	= sheetObj.GetCellValue(i, "cnee_cty_nm");
			var cnee_cnt_cd 	= sheetObj.GetCellValue(i, "cnee_cnt_cd");


			var agt_iata_cd 	= sheetObj.GetCellValue(i, "agt_iata_cd");
			var agt_nm 			= sheetObj.GetCellValue(i, "agt_nm");
			var agt_addr 		= sheetObj.GetCellValue(i, "agt_addr");

			var decl_curr_cd 	= sheetObj.GetCellValue(i, "decl_curr_cd");
			var decl_pay_term_cd= sheetObj.GetCellValue(i, "decl_pay_term_cd");
			var decl_crr_no 	= sheetObj.GetCellValue(i, "decl_crr_no");
			var decl_cstms_no 	= sheetObj.GetCellValue(i, "decl_cstms_no");
			var decl_insur_no 	= sheetObj.GetCellValue(i, "decl_insur_no");

			var iss_dt 			= sheetObj.GetCellValue(i, "iss_dt");
			var iss_loc_nm 		= sheetObj.GetCellValue(i, "iss_loc_nm");

			var ofc_port_cd 	= sheetObj.GetCellValue(i, "ofc_port_cd");
			var ofc_desi_cd 	= sheetObj.GetCellValue(i, "ofc_desi_cd");
			var co_desi_cd 		= sheetObj.GetCellValue(i, "co_desi_cd");

			var part_id 		= sheetObj.GetCellValue(i, "part_id");
			var part_cd 		= sheetObj.GetCellValue(i, "part_cd");
			var part_port_cd 	= sheetObj.GetCellValue(i, "part_port_cd");
			
			var row = i - 1;
			
			//Sent 완료 경우 재전송 불가
			if(msg_sts_cd == "S"){	//Sent
				//#6827 : [BEST OCEAN] EAWB TRNSMISSION AFTER REVISE DATA
				if(flt_crr_cd == "CA") {
					if(!confirm(getLabel('FMS_COM_ALT166'))){
						return false;
					}
				} else {
					valMsgArr.push("Row["+ row +"] : " +  getLabel('EDI_COM_ALT076'));
				}
				
			}

//			if(cstms_rgst_flg == "N" && (cmd =="COMMAND02" || cmd =="COMMAND03")){
//				valMsgArr.push("Row["+ row +"] : " +  getLabel('EDI_COM_ALT181'));
//			}
			
			if(pck_qty == 0){
				valMsgArr.push("Row["+ row +"] : " +  "[Package Quantity] " + getLabel('EDI_COM_ALT256') + "(Please input value on BL Entry screen)" );
			}
			if(awb_wgt == 0){
				valMsgArr.push("Row["+ row +"] : " +  "[Weight(KG)] - must be greater than zero." + "(Please input value on BL Entry screen)" );
			}
			if(awb_vol == 0){
				valMsgArr.push("Row["+ row +"] : " +  "[Volume(CBM)] - must be greater than zero." + "(Please input value on BL Entry screen)" );
			}
			if(awb_pfx_no == ""){
				valMsgArr.push("Row["+ row +"] : " +  "[AWB No. Prefix] " + getLabel('EDI_COM_ALT256') + "(Please input value on BL Entry screen)" );
			}
			if(awb_no == ""){
				valMsgArr.push("Row["+ row +"] : " +  "[AWB No.] " + getLabel('EDI_COM_ALT256') + "(Please input value on B/L Entry screen)" );
			}
			
			if(flt_crr_cd == ""){
				valMsgArr.push("Row["+ row +"] : " +  "[Carrier] " + getLabel('EDI_COM_ALT256') + "(Please input Flight No. value on BL Entry screen)" );
			}
			if(flt_no == ""){
				valMsgArr.push("Row["+ row +"] : " +  "[Flight No.] " + getLabel('EDI_COM_ALT256') + "(Please input Flight No. value on BL Entry screen)" );
			}
			
			////Special Request Description
			//if(spcl_rqst_desc.length > 65){	
			//	valMsgArr.push("Row["+ row +"] : " +  "[Special Request Description] - max Length is 65 characters!");
			//}
			////Accounting Information
			//if(acct_info_desc.length > 34){	
			//	valMsgArr.push("Row["+ row +"] : " +  "[Account Info] - max Length is 34 characters!" );
			//}
			////Good Description - Nature and Quantity of Goods
			//if(rt_gds_desc.length > 20){
			//	valMsgArr.push("Row["+ row +"] : " +  "[Nature and Quantity of Goods] - max Length is 20 characters!" );
			//}
			
			//Prepaid Charge & Collect Charge
			if(ppd_wgt_chg_amt == 0 && clt_wgt_chg_amt == 0){
				valMsgArr.push("Row["+ row +"] : " +  "Prepaid or Collect Weight Charge must be greater than zero."+getLabel('EDI_COM_ALT256'));
			}
			
			//Rate
			//if(rt_cd == ""){	
				//valMsgArr.push("Row["+ row +"] : " +  "[Rate] - Charge Code"+getLabel('EDI_COM_ALT256'));
			//}
			if(rt_val == 0){
				valMsgArr.push("Row["+ row +"] : " +  "[Rate] - Charge Rate must be greater than zero." );
			}
			if(rt_chg_wgt == 0){
				valMsgArr.push("Row["+ row +"] : " +  "[Rate] - Charge Weight must be greater than zero." );
			}
			if(rt_chg_amt == 0){
				valMsgArr.push("Row["+ row +"] : " +  "[Rate] - Charge Amount must be greater than zero." );
			}
			if(rt_vol == 0){
				valMsgArr.push("Row["+ row +"] : " +  "[Rate] - Volume must be greater than zero." );
			}
			
			//if(rt_cmdt_cd == ""){	
			//	valMsgArr.push("Row["+ row +"] : " +  "[Rate] - HTS Code"+getLabel('EDI_COM_ALT256'));
			//}
			//if(rt_cmdt_cd.length > 8){
			//	valMsgArr.push("Row["+ row +"] : " +  "[Rate] - HST Code max Length is 8 characters!");
			//}
			//if(rt_org_cnt_cd == ""){	
			//	valMsgArr.push("Row["+ row +"] : " +  "[Rate] - Origin Country Code"+getLabel('EDI_COM_ALT256'));
			//}
			
			//Shipper, Consignee
			if(shpr_nm == ""){	
				valMsgArr.push("Row["+ row +"] : " +  "[Shipper] - Name"+getLabel('EDI_COM_ALT256'));
			}
			if(shpr_addr == ""){	
				valMsgArr.push("Row["+ row +"] : " +  "[Shipper] - Address"+getLabel('EDI_COM_ALT256'));
			}
			if(shpr_cty_nm == ""){	
				valMsgArr.push("Row["+ row +"] : " +  "[Shipper] - City"+getLabel('EDI_COM_ALT256'));
			}
			if(shpr_cnt_cd == ""){
				valMsgArr.push("Row["+ row +"] : " +  "[Shipper] - Country"+getLabel('EDI_COM_ALT256'));
			}
			if(cnee_nm == ""){	
				valMsgArr.push("Row["+ row +"] : " +  "[Consignee] - Name"+getLabel('EDI_COM_ALT256'));
			}
			if(cnee_addr == ""){
				valMsgArr.push("Row["+ row +"] : " +  "[Consignee] - Address"+getLabel('EDI_COM_ALT256'));
			}
			if(cnee_cty_nm == ""){	
				valMsgArr.push("Row["+ row +"] : " +  "[Consignee] - City"+getLabel('EDI_COM_ALT256'));
			}
			if(cnee_cnt_cd == ""){	
				valMsgArr.push("Row["+ row +"] : " +  "[Consignee] - Country"+getLabel('EDI_COM_ALT256'));
			}			
			
			// Shipper, Consignee Length Check
			if(shpr_nm.length > 35){
				valMsgArr.push("Row["+ row +"] : " + "[Shipper] - Name max Length is 35 characters!" );
			}
			if(shpr_addr.length > 35){
				valMsgArr.push("Row["+ row +"] : " + "[Shipper] - Address max Length is 35 characters!" );
			}
			if(shpr_cty_nm.length > 17){
				valMsgArr.push("Row["+ row +"] : " + "[Shipper] - City max Length is 17 characters!" );
			}
			if(cnee_nm.length > 35){	
				valMsgArr.push("Row["+ row +"] : " + "[Consignee] - Name max Length is 35 characters!" );
			}
			if(cnee_addr.length > 35){	
				valMsgArr.push("Row["+ row +"] : " + "[Consignee] - Address max Length is 35 characters!" );
			}
			if(cnee_cty_nm.length > 17){	
				valMsgArr.push("Row["+ row +"] : " + "[Consignee] - City max Length is 17 characters!" );
			}
			
			//Agent
			if(agt_iata_cd == ""){	
				valMsgArr.push("Row["+ row +"] : " +  "[Agent] - IATA Code"+getLabel('EDI_COM_ALT256'));
			}
			if(agt_nm == ""){	
				valMsgArr.push("Row["+ row +"] : " +  "[Agent] - Name"+getLabel('EDI_COM_ALT256'));
			}
			if(agt_addr == ""){	
				valMsgArr.push("Row["+ row +"] : " +  "[Agent] - Address"+getLabel('EDI_COM_ALT256'));
			}
			// Agent Length Check
			if(agt_iata_cd.length > 8){
				valMsgArr.push("Row["+ row +"] : " + "[Agent] - IATA Code Length is 8 characters!" );
			}
			if(agt_nm.length > 35){
				valMsgArr.push("Row["+ row +"] : " + "[Agent] - Name max Length is 35 characters!" );
			}
			if(agt_addr.length > 35){
				valMsgArr.push("Row["+ row +"] : " + "[Agent] - Address max Length is 35 characters!" );
			}
			
			//CVD Info
			if(decl_curr_cd == ""){		
				valMsgArr.push("Row["+ row +"] : " +  "[CVD Info] - Currency"+getLabel('EDI_COM_ALT256'));
			}
			if(decl_pay_term_cd == ""){	
				valMsgArr.push("Row["+ row +"] : " +  "[CVD Info] - Freight Code"+getLabel('EDI_COM_ALT256'));
			}
			if(decl_crr_no == ""){
				valMsgArr.push("Row["+ row +"] : " +  "[CVD Info] - Carriage No"+getLabel('EDI_COM_ALT256'));
			}
			if(decl_cstms_no == ""){
				valMsgArr.push("Row["+ row +"] : " +  "[CVD Info] - Customs No"+getLabel('EDI_COM_ALT256'));
			}
			if(decl_insur_no == ""){
				valMsgArr.push("Row["+ row +"] : " +  "[CVD Info] - Insurance No"+getLabel('EDI_COM_ALT256'));
			}
			
			if(decl_crr_no.length > 12){
				valMsgArr.push("Row["+ row +"] : " + "[CVD Info] - Carrage No. Length is 12 characters!" );
			}
			if(decl_cstms_no.length > 12){
				valMsgArr.push("Row["+ row +"] : " + "[CVD Info] - Customs Code Length is 12 characters!" );
			}
			if(decl_insur_no.length > 11){
				valMsgArr.push("Row["+ row +"] : " + "[CVD Info] - Insurance No. Length is 11 characters!" );
			}
			
			//Issue
			if(iss_dt == ""){	
				valMsgArr.push("Row["+ row +"] : " +  "[AWB Issue] - Date"+getLabel('EDI_COM_ALT256'));
			}
			if(iss_loc_nm == ""){	
				valMsgArr.push("Row["+ row +"] : " +  "[AWB Issue] - Place"+getLabel('EDI_COM_ALT256'));
			}
			if(iss_loc_nm.length > 17 ){	
				valMsgArr.push("Row["+ row +"] : " +  "[AWB Issue] - Place max Length is 17 characters!");
			}
			
			//Sender
			if(ofc_port_cd == ""){	
				valMsgArr.push("Row["+ row +"] : " +  "[Sender] - Port"+getLabel('EDI_COM_ALT256'));
			}
			//if(ofc_desi_cd == ""){	
			//	valMsgArr.push("Row["+ row +"] : " +  "[Sender] - Designator"+getLabel('EDI_COM_ALT256'));
			//}
			//if(co_desi_cd == ""){	
			//	valMsgArr.push("Row["+ row +"] : " +  "[Sender] - Company"+getLabel('EDI_COM_ALT256'));
			//}
			if(ofc_desi_cd.length > 2 ){	
				valMsgArr.push("Row["+ row +"] : " +  "[Sender] - Designator is 2 characters!");
			}
			if(co_desi_cd.length > 2 ){	
				valMsgArr.push("Row["+ row +"] : " +  "[Sender] - Company Length is 2 characters!");
			}
			
			//Participant - 미사용 주석 처리
			//if(part_id == ""){	
			//	valMsgArr.push("Row["+ row +"] : " +  "Participant ID"+getLabel('EDI_COM_ALT256'));
			//}
			//if(part_cd == ""){	
			//	valMsgArr.push("Row["+ row +"] : " +  "Participant Code"+getLabel('EDI_COM_ALT256'));
			//}
			//if(part_port_cd == ""){	
			//	valMsgArr.push("Row["+ row +"] : " +  "Participant Port Code"+getLabel('EDI_COM_ALT256'));
			//}
			
			//if(part_id.length > 3 ){	
			//	valMsgArr.push("Row["+ row +"] : " +  "Sender Company Length is 3 characters!");
			//}
			//if(part_cd.length > 17 ){	
			//	valMsgArr.push("Row["+ row +"] : " +  "Sender Company Length is 17 characters!");
			//}
			
			// Dash, Dot만 허용, CoCommon.js에 정의
			////Special Request Description
			//if(!ComIsContainsCharsOnly(spcl_rqst_desc, FORMAT_EDI_AWB)){	
			//	valMsgArr.push("Row["+ row +"] : " +  "[Special Request Description] " + getLabel('EDI_COM_ALT291') );
			//}
			////Accounting Information
			//if(!ComIsContainsCharsOnly(acct_info_desc, FORMAT_EDI_AWB)){	
			//	valMsgArr.push("Row["+ row +"] : " +  "[Account Info] " + getLabel('EDI_COM_ALT291') );
			//}
			////Good Description - Nature and Quantity of Goods
			//if(!ComIsContainsCharsOnly(rt_gds_desc, FORMAT_EDI_AWB)){
			//	valMsgArr.push("Row["+ row +"] : " +  "[Nature and Quantity of Goods] " + getLabel('EDI_COM_ALT291') );
			//}
			
			/*
			if(!ComIsContainsCharsOnly(shpr_nm, FORMAT_EDI_AWB)){
				valMsgArr.push("Row["+ row +"] : " + "[Shipper] - Name " + getLabel('EDI_COM_ALT291'));
			}
			if(!ComIsContainsCharsOnly(shpr_addr, FORMAT_EDI_AWB)){
				valMsgArr.push("Row["+ row +"] : " + "[Shipper] - Address " + getLabel('EDI_COM_ALT291'));
			}
			if(!ComIsContainsCharsOnly(shpr_cty_nm, FORMAT_EDI_AWB)){
				valMsgArr.push("Row["+ row +"] : " + "[Shipper] - City " + getLabel('EDI_COM_ALT291'));
			}
			
			if(!ComIsContainsCharsOnly(cnee_nm, FORMAT_EDI_AWB)){
				valMsgArr.push("Row["+ row +"] : " + "[Consignee] - Name " + getLabel('EDI_COM_ALT291'));
			}
			if(!ComIsContainsCharsOnly(cnee_addr, FORMAT_EDI_AWB)){
				valMsgArr.push("Row["+ row +"] : " + "[Consignee] - Address " + getLabel('EDI_COM_ALT291'));
			}
			if(!ComIsContainsCharsOnly(cnee_cty_nm, FORMAT_EDI_AWB)){
				valMsgArr.push("Row["+ row +"] : " + "[Consignee] - City " + getLabel('EDI_COM_ALT291'));
			}
			
			//Agent  
			if(!ComIsContainsCharsOnly(agt_nm, FORMAT_EDI_AWB)){
				valMsgArr.push("Row["+ row +"] : " + "[Agent] - Name " + getLabel('EDI_COM_ALT291'));
			}
			if(!ComIsContainsCharsOnly(agt_addr, FORMAT_EDI_AWB)){
				valMsgArr.push("Row["+ row +"] : " + "[Agent] - Address " + getLabel('EDI_COM_ALT291'));
			}
			
			//CVD Info
			if(!ComIsContainsCharsOnly(decl_crr_no, FORMAT_EDI_AWB)){
				valMsgArr.push("Row["+ row +"] : " + "[CVD Info] - Carriage No " + getLabel('EDI_COM_ALT291'));
			}
			if(!ComIsContainsCharsOnly(decl_cstms_no, FORMAT_EDI_AWB)){
				valMsgArr.push("Row["+ row +"] : " + "[CVD Info] - Customs No " + getLabel('EDI_COM_ALT291'));
			}
			if(!ComIsContainsCharsOnly(decl_insur_no, FORMAT_EDI_AWB)){
				valMsgArr.push("Row["+ row +"] : " + "[CVD Info] - Insurance No " + getLabel('EDI_COM_ALT291'));
			}
			
			//AWB Issue - Place
			if(!ComIsContainsCharsOnly(iss_loc_nm, FORMAT_EDI_AWB)){
				valMsgArr.push("Row["+ row +"] : " + "[AWB Issue] - Place " + getLabel('EDI_COM_ALT291'));
			}
			*/
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

function awbSaveOnlyValidation(sheetObj, cmd){
	var formObj=document.frm1;	
	var valMsgArr = new Array();

	for(var i=2; i<sheetObj.LastRow() + 1; i++){
		
		//Validation for saving
		if(sheetObj.GetCellValue(i, "chk") == 1){
				
			var pck_qty			= sheetObj.GetCellValue(i, "pck_qty");
			var awb_wgt_cd		= sheetObj.GetCellValue(i, "awb_wgt_cd");
			var awb_wgt			= sheetObj.GetCellValue(i, "awb_wgt");
			var awb_vol_cd		= sheetObj.GetCellValue(i, "awb_vol_cd");
			var awb_vol			= sheetObj.GetCellValue(i, "awb_vol");
			
			var awb_pfx_no		= sheetObj.GetCellValue(i, "awb_pfx_no");
			var awb_no			= sheetObj.GetCellValue(i, "awb_no");
			
			var row = i - 1;
			
			if(pck_qty == 0){
				valMsgArr.push("Row["+ row +"] : " +  "[Package Quantity] " + getLabel('EDI_COM_ALT256') + "(Please input value on BL Entry screen)" );
			}
			if(awb_wgt == 0){
				valMsgArr.push("Row["+ row +"] : " +  "[Weight(KG)] - must be greater than zero." + "(Please input value on BL Entry screen)" );
			}
			if(awb_vol == 0){
				valMsgArr.push("Row["+ row +"] : " +  "[Volume(CBM)] - must be greater than zero." + "(Please input value on BL Entry screen)" );
			}
			if(awb_pfx_no == ""){
				valMsgArr.push("Row["+ row +"] : " +  "[Carrier] " + getLabel('EDI_COM_ALT256') + "(Please input value on BL Entry screen)" );
			}
			if(awb_no == ""){
				valMsgArr.push("Row["+ row +"] : " +  "[Flight No.] " + getLabel('EDI_COM_ALT256') + "(Please input value on BL Entry screen)" );
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
//Calendar flag value
var firCalFlag=false;

function doDisplay(doWhat, formObj) {
	switch (doWhat) {
	case 'DATE1': // 달력 조회 From ~ To 팝업 호출
		cal=new ComCalendarFromTo();
		cal.displayType = "date";
		cal.select(formObj.f_strdt, formObj.f_enddt, 'MM-dd-yyyy');
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
	
	//화면 초기 로딩 후 HAWB SEARCH 버튼 HIDE
	formObj.btnSearch2.style.display = 'none';
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
		case 1: //MAWB TAB
			with (sheetObj) {
		      SetConfig( { SearchMode:2, MergeSheet:8, Page:20, DataRowMerge:0, FrozenCol: 13} ); 
		      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		      var headers = [ { Text:getLabel('EDI_AWB_0010_HDR_1'), Align:"Center"},
		                      { Text:getLabel('EDI_AWB_0010_HDR_2'), Align:"Center"} ];
		      InitHeaders(headers, info);
	
		      var cols = [ 
							{Type:"CheckBox",	Hidden:0,  Width:25,   Align:"Center", 	ColMerge:0,  SaveName:"chk",         	 	KeyField:0,   Format:"",  		UpdateEdit:1,  InsertEdit:1 , EditLen:1, TrueValue : "Y", FalseValue : "N"},
							{Type:"Text",  		Hidden:1,  Width:100,  Align:"Left",  	ColMerge:0,  SaveName:"msg_no",  		 	KeyField:0,   Format:"",  		UpdateEdit:0,  InsertEdit:0 }, // Additional Info
							{Type:"Text",  		Hidden:1,  Width:100,  Align:"Left",  	ColMerge:0,  SaveName:"intg_bl_seq",  	 	KeyField:0,   Format:"",  		UpdateEdit:0,  InsertEdit:0 }, // Additional Info 
							{Type:"Text",  		Hidden:1,  Width:100,  Align:"Left",  	ColMerge:0,  SaveName:"biz_clss_cd",  	 	KeyField:0,   Format:"",  		UpdateEdit:0,  InsertEdit:0 }, // Additional Info
							{Type:"Text",  		Hidden:1,  Width:100,  Align:"Left",  	ColMerge:0,  SaveName:"cust_id",  		 	KeyField:0,   Format:"",   		UpdateEdit:0,  InsertEdit:0 }, // Additional Info
							{Type:"Text",  		Hidden:1,  Width:100,  Align:"Left",  	ColMerge:0,  SaveName:"airln_cd",  		 	KeyField:0,   Format:"",  		UpdateEdit:0,  InsertEdit:0 }, // Additional Info
							{Type:"Text",  		Hidden:1,  Width:100,  Align:"Left",  	ColMerge:0,  SaveName:"msg_tp_cd",  	 	KeyField:0,   Format:"",  		UpdateEdit:0,  InsertEdit:0 }, // Additional Info
							{Type:"Text",  		Hidden:1,  Width:100,  Align:"Left",  	ColMerge:0,  SaveName:"awb_pfx_no",  	 	KeyField:0,   Format:"",  		UpdateEdit:0,  InsertEdit:0 }, // Additional Info
							{Type:"Text",  		Hidden:0,  Width:100,  Align:"Left",  	ColMerge:0,  SaveName:"org_bl_no",  	 	KeyField:0,   Format:"",  		UpdateEdit:0,  InsertEdit:0 }, // Additional Info
							{Type:"Text",  		Hidden:1,  Width:100,  Align:"Center",  ColMerge:0,  SaveName:"awb_no",  		 	KeyField:0,   Format:"",  		UpdateEdit:0,  InsertEdit:0 },
							{Type:"Text",  		Hidden:0,  Width:50,   Align:"Center",  ColMerge:0,  SaveName:"hbl_cnt",  		 	KeyField:0,   Format:"",  		UpdateEdit:0,  InsertEdit:0 , FontUnderline:1 ,FontBold:1 },
							{Type:"Combo",  	Hidden:0,  Width:75,   Align:"Center",  ColMerge:0,  SaveName:"msg_sts_cd",  	 	KeyField:0,   Format:"",  		UpdateEdit:0,  InsertEdit:0 },
							{Type:"Text",   	Hidden:1,  Width:30,   Align:"Center",  ColMerge:0,  SaveName:"err_msg", 		 	KeyField:0,   Format:"",   		UpdateEdit:0,  InsertEdit:0 },
							{Type:"Text",  		Hidden:0,  Width:50,   Align:"Center",  ColMerge:0,  SaveName:"cstms_rgst_flg",  	KeyField:0,   Format:"",  		UpdateEdit:0,  InsertEdit:0 },
							{Type:"Text",  		Hidden:1,  Width:100,  Align:"Left",    ColMerge:0,  SaveName:"cstms_cnt_cd",  	 	KeyField:0,   Format:"",  		UpdateEdit:0,  InsertEdit:0 }, // Additional Info
							{Type:"Date",  		Hidden:0,  Width:110,  Align:"Center",  ColMerge:0,  SaveName:"snt_tms",  	     	KeyField:0,   Format:"YmdHm",	UpdateEdit:0,  InsertEdit:0 },
							{Type:"Date",  		Hidden:0,  Width:110,  Align:"Center",  ColMerge:0,  SaveName:"mod_tms",  	     	KeyField:0,   Format:"YmdHm",	UpdateEdit:0,  InsertEdit:0 },
							{Type:"Text",  		Hidden:0,  Width:50,   Align:"Center",  ColMerge:0,  SaveName:"his_view",    	 	KeyField:0,   Format:"",   		UpdateEdit:0,  InsertEdit:0 , FontUnderline:1 },
							{Type:"Text",  		Hidden:1,  Width:50,   Align:"Center",  ColMerge:0,  SaveName:"org_port_cd",     	KeyField:0,   Format:"",  		UpdateEdit:0,  InsertEdit:0 },
							{Type:"Text",  		Hidden:0,  Width:120,  Align:"Left",  	ColMerge:0,  SaveName:"org_port_nm",     	KeyField:0,   Format:"",  		UpdateEdit:0,  InsertEdit:0 , Ellipsis:1},
							{Type:"Date",  		Hidden:0,  Width:110,  Align:"Center",  ColMerge:0,  SaveName:"etd_dt",  	     	KeyField:0,   Format:"YmdHm",	UpdateEdit:0,  InsertEdit:0 },
							{Type:"Text",  		Hidden:1,  Width:50,   Align:"Center",  ColMerge:0,  SaveName:"dest_port_cd",  	 	KeyField:0,   Format:"",  		UpdateEdit:0,  InsertEdit:0 },
							{Type:"Text",  		Hidden:0,  Width:120,  Align:"Left",  	ColMerge:0,  SaveName:"dest_port_nm",    	KeyField:0,   Format:"",  		UpdateEdit:0,  InsertEdit:0 , Ellipsis:1},
							{Type:"Date",  		Hidden:0,  Width:110,  Align:"Center",  ColMerge:0,  SaveName:"eta_dt",  		 	KeyField:0,   Format:"YmdHm",	UpdateEdit:0,  InsertEdit:0 },
							
							{Type:"Int",  		Hidden:0,  Width:50,   Align:"Center",  ColMerge:0,  SaveName:"piec_qty",  			KeyField:0,   Format:"Integer", UpdateEdit:0,  InsertEdit:0 },
							{Type:"Float",  	Hidden:0,  Width:75,   Align:"Right",   ColMerge:0,  SaveName:"awb_wgt",  			KeyField:0,   Format:"Float",  	UpdateEdit:0,  InsertEdit:0 , PointCount:3 },
							{Type:"Text",  		Hidden:1,  Width:100,  Align:"Left",    ColMerge:0,  SaveName:"awb_wgt_cd",  		KeyField:0,   Format:"",  		UpdateEdit:0,  InsertEdit:0 }, // Additional Info
							{Type:"Float",  	Hidden:0,  Width:75,   Align:"Right",   ColMerge:0,  SaveName:"awb_vol",  			KeyField:0,   Format:"Float",   UpdateEdit:0,  InsertEdit:0 , PointCount:3 },
							{Type:"Text",  		Hidden:1,  Width:100,  Align:"Left",    ColMerge:0,  SaveName:"awb_vol_cd",  		KeyField:0,   Format:"",  		UpdateEdit:0,  InsertEdit:0 }, // Additional Info
							
							{Type:"Text",  		Hidden:0,  Width:50,   Align:"Center",  ColMerge:0,  SaveName:"flt_crr_cd",  		KeyField:0,   Format:"",  		UpdateEdit:0,  InsertEdit:0 },
							{Type:"Text",  		Hidden:1,  Width:75,   Align:"Center",  ColMerge:0,  SaveName:"flt_no",  	 		KeyField:0,   Format:"",  		UpdateEdit:0,  InsertEdit:0 },
							{Type:"Int",  		Hidden:1,  Width:100,  Align:"Left",  	ColMerge:0,  SaveName:"flt_dy",  	 		KeyField:0,   Format:"Integer", UpdateEdit:0,  InsertEdit:0 }, // Additional Info
							{Type:"Text",  		Hidden:1,  Width:100,  Align:"Left",  	ColMerge:0,  SaveName:"n1st_crr_cd", 		KeyField:0,   Format:"",  		UpdateEdit:0,  InsertEdit:0 }, // Additional Info
							{Type:"Text",  		Hidden:0,  Width:75,   Align:"Center",  ColMerge:0,  SaveName:"org_flt_no",   		KeyField:0,   Format:"",  		UpdateEdit:0,  InsertEdit:0 }, // Additional Info
							
							{Type:"Text",  		Hidden:1,  Width:100,  Align:"Left",  	ColMerge:0,  SaveName:"spcl_rqst_desc",  	KeyField:0,   Format:"",  		UpdateEdit:1,  InsertEdit:1,  EditLen:65, Ellipsis:1 , AcceptKeys:AcceptKeysOfTextField, InputCaseSensitive:1 },
							{Type:"Text",   	Hidden:1,  Width:30,   Align:"Center",  ColMerge:0,  SaveName:"spcl_rqst_desc_img", KeyField:0,   Format:"",  		UpdateEdit:0,  InsertEdit:0  ,FontBold:1 },
							{Type:"Text",  		Hidden:1,  Width:100,  Align:"Left",  	ColMerge:0,  SaveName:"acct_info_desc",  	KeyField:0,   Format:"",  		UpdateEdit:1,  InsertEdit:1,  Ellipsis:1 , AcceptKeys:AcceptKeysOfTextField, InputCaseSensitive:1 },
							{Type:"Text",   	Hidden:1,  Width:30,   Align:"Center",  ColMerge:0,  SaveName:"acct_info_desc_img", KeyField:0,   Format:"",  		UpdateEdit:0,  InsertEdit:0  ,FontBold:1 },
							{Type:"Text",  		Hidden:1,  Width:150,  Align:"Left",  	ColMerge:0,  SaveName:"rt_gds_desc",  	 	KeyField:0,   Format:"",  		UpdateEdit:1,  InsertEdit:1,  Ellipsis:1 , AcceptKeys:AcceptKeysOfTextField, InputCaseSensitive:1 }, // Additional Info
							{Type:"Text",   	Hidden:1,  Width:30,   Align:"Center",  ColMerge:0,  SaveName:"rt_gds_desc_img",    KeyField:0,   Format:"",  		UpdateEdit:0,  InsertEdit:0  ,FontBold:1 },
							
							{Type:"Float",  	Hidden:0,  Width:80,   Align:"Right",   ColMerge:0,  SaveName:"ppd_wgt_chg_amt",  	KeyField:1,   Format:"Float",   UpdateEdit:1,  InsertEdit:1 , PointCount:3 },
							{Type:"Float",  	Hidden:0,  Width:80,   Align:"Right",   ColMerge:0,  SaveName:"ppd_val_chg_amt",  	KeyField:0,   Format:"Float",   UpdateEdit:1,  InsertEdit:1 , PointCount:3 },
							{Type:"Float",  	Hidden:0,  Width:80,   Align:"Right",   ColMerge:0,  SaveName:"ppd_tax_amt",  		KeyField:0,   Format:"Float",   UpdateEdit:1,  InsertEdit:1 , PointCount:3 },
							{Type:"Float",  	Hidden:0,  Width:80,   Align:"Right",   ColMerge:0,  SaveName:"ppd_agt_chg_amt",  	KeyField:0,   Format:"Float",   UpdateEdit:1,  InsertEdit:1 , PointCount:3 },
							{Type:"Float",  	Hidden:0,  Width:80,   Align:"Right",   ColMerge:0,  SaveName:"ppd_crr_chg_amt",  	KeyField:0,   Format:"Float",   UpdateEdit:1,  InsertEdit:1 , PointCount:3 },
							{Type:"Float",  	Hidden:1,  Width:80,   Align:"Right",   ColMerge:0,  SaveName:"ppd_ttl_chg_amt",  	KeyField:0,   Format:"Float",   UpdateEdit:1,  InsertEdit:1 , PointCount:3 }, // Additional Info
							
							{Type:"Float",  	Hidden:0,  Width:80,   Align:"Right",   ColMerge:0,  SaveName:"clt_wgt_chg_amt",  	KeyField:1,   Format:"Float",   UpdateEdit:1,  InsertEdit:1 , PointCount:3 },
							{Type:"Float",  	Hidden:0,  Width:80,   Align:"Right",   ColMerge:0,  SaveName:"clt_val_chg_amt",  	KeyField:0,   Format:"Float",   UpdateEdit:1,  InsertEdit:1 , PointCount:3 },
							{Type:"Float",  	Hidden:0,  Width:80,   Align:"Right",   ColMerge:0,  SaveName:"clt_tax_amt",  	 	KeyField:0,   Format:"Float",   UpdateEdit:1,  InsertEdit:1 , PointCount:3 },
							{Type:"Float",  	Hidden:0,  Width:80,   Align:"Right",   ColMerge:0,  SaveName:"clt_agt_chg_amt", 	KeyField:0,   Format:"Float",   UpdateEdit:1,  InsertEdit:1 , PointCount:3 },
							{Type:"Float",  	Hidden:0,  Width:80,   Align:"Right",   ColMerge:0,  SaveName:"clt_crr_chg_amt", 	KeyField:0,   Format:"Float",   UpdateEdit:1,  InsertEdit:1 , PointCount:3 },
							{Type:"Float",  	Hidden:1,  Width:80,   Align:"Right",   ColMerge:0,  SaveName:"clt_ttl_chg_amt", 	KeyField:0,   Format:"Float",   UpdateEdit:1,  InsertEdit:1 , PointCount:3 }, // Additional Info							
							
							{Type:"Int",  		Hidden:1,  Width:100,  Align:"Right",   ColMerge:0,  SaveName:"rt_piec_qty",  	 	KeyField:0,   Format:"Integer", UpdateEdit:1,  InsertEdit:1 , EditLen:4 }, // Additional Info
							{Type:"Text",  		Hidden:1,  Width:100,  Align:"Center",  ColMerge:0,  SaveName:"rt_wgt_cd",  		KeyField:0,   Format:"",  		UpdateEdit:1,  InsertEdit:1 }, // Additional Info
							{Type:"Float",  	Hidden:1,  Width:100,  Align:"Right",   ColMerge:0,  SaveName:"rt_wgt",  			KeyField:0,   Format:"Float",   UpdateEdit:1,  InsertEdit:1 }, // Additional Info
							{Type:"Combo",  	Hidden:0,  Width:170,  Align:"Center",  ColMerge:0,  SaveName:"rt_cd",    			KeyField:0,   Format:"",  		UpdateEdit:1,  InsertEdit:1 },
							{Type:"Float",  	Hidden:0,  Width:85,   Align:"Right",   ColMerge:0,  SaveName:"rt_val",	  	 		KeyField:0,   Format:"Float",   UpdateEdit:1,  InsertEdit:1 , PointCount:3 },
							{Type:"Float",  	Hidden:0,  Width:85,   Align:"Right",   ColMerge:0,  SaveName:"rt_chg_wgt",  		KeyField:0,   Format:"Float",   UpdateEdit:1,  InsertEdit:1 , PointCount:3 },
							{Type:"Float",  	Hidden:0,  Width:85,   Align:"Right",   ColMerge:0,  SaveName:"rt_chg_amt",  		KeyField:0,   Format:"Float",   UpdateEdit:0,  InsertEdit:0 , PointCount:3 },
							{Type:"Text",  		Hidden:1,  Width:100,  Align:"Left",    ColMerge:0,  SaveName:"rt_gds_desc",  		KeyField:0,   Format:"",        UpdateEdit:1,  InsertEdit:1 , AcceptKeys:AcceptKeysOfTextField, InputCaseSensitive:1 }, // Additional Info
							{Type:"Text",  		Hidden:1,  Width:100,  Align:"Left",    ColMerge:0,  SaveName:"rt_cnsl_desc",   	KeyField:0,   Format:"",        UpdateEdit:1,  InsertEdit:1 , AcceptKeys:AcceptKeysOfTextField, InputCaseSensitive:1 }, // Additional Info
							{Type:"Text",  		Hidden:1,  Width:100,  Align:"Center",  ColMerge:0,  SaveName:"rt_vol_cd",  		KeyField:0,   Format:"",        UpdateEdit:1,  InsertEdit:1 }, // Additional Info
							{Type:"Float",  	Hidden:0,  Width:85,   Align:"Right",   ColMerge:0,  SaveName:"rt_vol",  			KeyField:0,   Format:"Float",   UpdateEdit:1,  InsertEdit:1 , PointCount:3 },
							{Type:"PopupEdit",  Hidden:1,  Width:85,   Align:"Center",  ColMerge:0,  SaveName:"rt_cmdt_cd",  		KeyField:0,   Format:"",        UpdateEdit:1,  InsertEdit:1 , AcceptKeys: "N", InputCaseSensitive:1},
							{Type:"PopupEdit",	Hidden:1,  Width:100,  Align:"Center",  ColMerge:0,  SaveName:"rt_org_cnt_cd",  	KeyField:0,   Format:"",        UpdateEdit:1,  InsertEdit:1 , EditLen:2, AcceptKeys:AcceptKeysOfCodeField, InputCaseSensitive:1  },
							
							{Type:"Text",  		Hidden:1,  Width:100,  Align:"Left",  	ColMerge:0,  SaveName:"shpr_cd",  			KeyField:0,   Format:"",  		UpdateEdit:1,  InsertEdit:1 }, // Additional Info
							{Type:"PopupEdit",  Hidden:0,  Width:100,  Align:"Left",  	ColMerge:0,  SaveName:"shpr_nm",  			KeyField:0,   Format:"",  		UpdateEdit:1,  InsertEdit:1,  Ellipsis:1 , AcceptKeys:AcceptKeysOfNameField, 	  InputCaseSensitive:1 },
							{Type:"Text",  		Hidden:0,  Width:100,  Align:"Left",  	ColMerge:0,  SaveName:"shpr_addr",  		KeyField:0,   Format:"",  		UpdateEdit:1,  InsertEdit:1,  Ellipsis:1 , AcceptKeys:AcceptKeysOfAddressField, InputCaseSensitive:1 },
							{Type:"Text",    	Hidden:0,  Width:30,   Align:"Center",	ColMerge:0,  SaveName:"shpr_img",    		KeyField:0,   Format:"",  		UpdateEdit:0,  InsertEdit:0 , FontBold:1 },
							{Type:"Text",  		Hidden:0,  Width:100,  Align:"Left",  	ColMerge:0,  SaveName:"shpr_cty_nm",  		KeyField:0,   Format:"",  		UpdateEdit:1,  InsertEdit:1,  Ellipsis:1 , AcceptKeys:AcceptKeysOfNameField, 	  InputCaseSensitive:1 },
							{Type:"PopupEdit",  Hidden:0,  Width:50,   Align:"Center",	ColMerge:0,  SaveName:"shpr_cnt_cd",  		KeyField:0,   Format:"",  		UpdateEdit:1,  InsertEdit:1,  EditLen:2  , AcceptKeys:AcceptKeysOfCodeField,    InputCaseSensitive:1 },
							
							{Type:"Text",  		Hidden:1,  Width:100,  Align:"Left",  	ColMerge:0,  SaveName:"cnee_cd",  		 	KeyField:0,   Format:"",  		UpdateEdit:1,  InsertEdit:1 }, // Additional Info
							{Type:"PopupEdit",  Hidden:0,  Width:100,  Align:"Left",  	ColMerge:0,  SaveName:"cnee_nm",  		 	KeyField:0,   Format:"",  		UpdateEdit:1,  InsertEdit:1,  Ellipsis:1 , AcceptKeys:AcceptKeysOfNameField, 	  InputCaseSensitive:1 },
							{Type:"Text",  		Hidden:0,  Width:100,  Align:"Left",  	ColMerge:0,  SaveName:"cnee_addr", 		 	KeyField:0,   Format:"",  		UpdateEdit:1,  InsertEdit:1,  Ellipsis:1 , AcceptKeys:AcceptKeysOfAddressField, InputCaseSensitive:1 },
							{Type:"Text",    	Hidden:0,  Width:30,   Align:"Center",	ColMerge:0,  SaveName:"cnee_img",     	 	KeyField:0,   Format:"",  		UpdateEdit:0,  InsertEdit:0 , FontBold:1 },							
							{Type:"Text",  		Hidden:0,  Width:100,  Align:"Left",  	ColMerge:0,  SaveName:"cnee_cty_nm",  	 	KeyField:0,   Format:"",  		UpdateEdit:1,  InsertEdit:1,  Ellipsis:1 , AcceptKeys:AcceptKeysOfNameField, 	  InputCaseSensitive:1 },
							{Type:"PopupEdit",  Hidden:0,  Width:50,   Align:"Center",	ColMerge:0,  SaveName:"cnee_cnt_cd",  		KeyField:0,   Format:"",  		UpdateEdit:1,  InsertEdit:1,  EditLen:2  , AcceptKeys:AcceptKeysOfCodeField, 	  InputCaseSensitive:1 },
							
							{Type:"Text",  		Hidden:1,  Width:100,  Align:"Left",  	ColMerge:0,  SaveName:"ntfy_cd", 	 	 	KeyField:0,   Format:"",  		UpdateEdit:1,  InsertEdit:1 }, // Additional Info
							{Type:"PopupEdit",  Hidden:1,  Width:100,  Align:"Left",  	ColMerge:0,  SaveName:"ntfy_nm",  		 	KeyField:0,   Format:"",  		UpdateEdit:1,  InsertEdit:1,  Ellipsis:1}, // Additional Info
							{Type:"Text",  		Hidden:1,  Width:100,  Align:"Left",  	ColMerge:0,  SaveName:"ntfy_addr",  	 	KeyField:0,   Format:"",  		UpdateEdit:1,  InsertEdit:1,  Ellipsis:1}, // Additional Info
							{Type:"Text",  		Hidden:1,  Width:100,  Align:"Left",  	ColMerge:0,  SaveName:"ntfy_cty_nm",  	 	KeyField:0,   Format:"",  		UpdateEdit:1,  InsertEdit:1,  Ellipsis:1}, // Additional Info
							{Type:"PopupEdit",  Hidden:1,  Width:50,   Align:"Center",	ColMerge:0,  SaveName:"ntfy_cnt_cd",  	 	KeyField:0,   Format:"",  		UpdateEdit:1,  InsertEdit:1,  EditLen:2 }, // Additional Info
							
							{Type:"Text",  		Hidden:0,  Width:100,  Align:"Center",  ColMerge:0,  SaveName:"agt_iata_cd",	 	KeyField:0,   Format:"",  		UpdateEdit:1,  InsertEdit:1 , AcceptKeys:AcceptKeysOfCodeField, InputCaseSensitive:1 },
							{Type:"PopupEdit",  Hidden:0,  Width:100,  Align:"Left",  	ColMerge:0,  SaveName:"agt_nm",  		 	KeyField:0,   Format:"",  		UpdateEdit:1,  InsertEdit:1 , Ellipsis:1 , AcceptKeys:AcceptKeysOfNameField, 	InputCaseSensitive:1 },
							{Type:"Text",  		Hidden:0,  Width:100,  Align:"Left",  	ColMerge:0,  SaveName:"agt_addr",   	 	KeyField:0,   Format:"", 		UpdateEdit:1,  InsertEdit:1 , Ellipsis:1 , AcceptKeys:AcceptKeysOfAddressField, InputCaseSensitive:1 },
							{Type:"Text",    	Hidden:0,  Width:30,   Align:"Center",  ColMerge:0,  SaveName:"agt_img",    	 	KeyField:0,   Format:"",  		UpdateEdit:0,  InsertEdit:0 , FontBold:1 },
							
							{Type:"Combo",  	Hidden:0,  Width:50,   Align:"Center",  ColMerge:0,  SaveName:"decl_curr_cd",    	KeyField:0,   Format:"",  		UpdateEdit:1,  InsertEdit:1 , EditLen:3 },
							{Type:"Combo",  	Hidden:0,  Width:175,  Align:"Center",  ColMerge:0,  SaveName:"decl_pay_term_cd",	KeyField:0,   Format:"",  		UpdateEdit:1,  InsertEdit:1 , EditLen:2 },
							{Type:"Text",  		Hidden:0,  Width:100,  Align:"Center",  ColMerge:0,  SaveName:"decl_crr_no",  	 	KeyField:0,   Format:"",  		UpdateEdit:1,  InsertEdit:1 , AcceptKeys:AcceptKeysOfTextField, InputCaseSensitive:1 },
							{Type:"Text",  		Hidden:0,  Width:100,  Align:"Center",  ColMerge:0,  SaveName:"decl_cstms_no",   	KeyField:0,   Format:"",  		UpdateEdit:1,  InsertEdit:1 , AcceptKeys:AcceptKeysOfTextField, InputCaseSensitive:1 },
							{Type:"Text",  		Hidden:0,  Width:100,  Align:"Center",  ColMerge:0,  SaveName:"decl_insur_no",   	KeyField:0,   Format:"",  		UpdateEdit:1,  InsertEdit:1 , AcceptKeys:AcceptKeysOfTextField, InputCaseSensitive:1 },
							
							{Type:"Date",  		Hidden:0,  Width:75,   Align:"Center",  ColMerge:0,  SaveName:"iss_dt",  		 	KeyField:0,   Format:"Ymd",  	UpdateEdit:1,  InsertEdit:1 },
							{Type:"Text",  		Hidden:0,  Width:75,   Align:"Left", 	ColMerge:0,  SaveName:"iss_loc_nm",  	 	KeyField:0,   Format:"",  	 	UpdateEdit:1,  InsertEdit:1, EditLen:17 , AcceptKeys:AcceptKeysOfNameField, InputCaseSensitive:1 },
							
							{Type:"PopupEdit",  Hidden:0,  Width:50,   Align:"Center",  ColMerge:0,  SaveName:"ofc_port_cd", 	 	KeyField:0,   Format:"",  		UpdateEdit:1,  InsertEdit:1, EditLen:3 ,  AcceptKeys:AcceptKeysOfCodeField, InputCaseSensitive:1 },
							{Type:"Combo",  	Hidden:0,  Width:200,  Align:"Left",    ColMerge:0,  SaveName:"ofc_desi_cd", 	 	KeyField:0,   Format:"",  		UpdateEdit:1,  InsertEdit:1, EditLen:2 ,  AcceptKeys:AcceptKeysOfCodeField, InputCaseSensitive:1 },
							{Type:"Text", 		Hidden:0,  Width:100,  Align:"Center",  ColMerge:0,  SaveName:"co_desi_cd",  	 	KeyField:0,   Format:"",  		UpdateEdit:1,  InsertEdit:1, EditLen:2 ,  AcceptKeys:AcceptKeysOfCodeField, InputCaseSensitive:1 },
							
							{Type:"Text",  		Hidden:1,  Width:100,  Align:"Center",  ColMerge:0,  SaveName:"part_id",  	 	 	KeyField:0,   Format:"",  		UpdateEdit:1,  InsertEdit:1, EditLen:3  , AcceptKeys:AcceptKeysOfCodeField, InputCaseSensitive:1 },
							{Type:"Text",  		Hidden:1,  Width:100,  Align:"Center",  ColMerge:0,  SaveName:"part_cd",  	 	 	KeyField:0,   Format:"",  		UpdateEdit:1,  InsertEdit:1, EditLen:17 , AcceptKeys:AcceptKeysOfCodeField, InputCaseSensitive:1 },
							{Type:"PopupEdit",  Hidden:1,  Width:100,  Align:"Center",  ColMerge:0,  SaveName:"part_port_cd",	 	KeyField:0,   Format:"",  		UpdateEdit:1,  InsertEdit:1, EditLen:3  , AcceptKeys:AcceptKeysOfCodeField, InputCaseSensitive:1 },
							
							{Type:"Text",  		Hidden:1,  Width:100,  Align:"Left",    ColMerge:0,  SaveName:"doc_sts_cd",  	 	KeyField:0,   Format:"",  		UpdateEdit:1,  InsertEdit:1 }, // Additional Info
							
							{Type:"Text",  		Hidden:1,  Width:100,  Align:"Left",  	ColMerge:0,  SaveName:"airln_sprt",  	 	KeyField:0,   Format:"",  		UpdateEdit:0,  InsertEdit:0 }, // Additional Info
							
		                    {Type:"Status",   	Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,  SaveName:"ibflag" }
							
		                   ];
		       
		      	InitColumns(cols);
		      	//SetImageList(0,"web/img/main/icon_m.gif");
		      	SetColProperty('msg_sts_cd',       {ComboText:MSG_STS_NM,  ComboCode:MSG_STS_CD} );
		      	SetColProperty('pck_ut_cd',    	   {ComboText:PCKCD1,      ComboCode:PCKCD2} );
		      	SetColProperty('decl_curr_cd', 	   {ComboText:'|'+CURRCD1, ComboCode:'|'+CURRCD2} );
		        SetColProperty('decl_pay_term_cd', {ComboText:'|'+TERMCD1, ComboCode:'|'+TERMCD2} );
		        SetColProperty('ofc_desi_cd',      {ComboText:'|'+DESICD1, ComboCode:'|'+DESICD2} );
		        SetColProperty('rt_cd', 		   {ComboText:'|'+RATECD1, ComboCode:'|'+RATECD2} );
		      	
		        //NAME ADDRESS SPECIAL CHARACTER LIMIT
		        SetColProperty(0 ,"shpr_nm", 	{AcceptKeys:"E|N|[/ -. ]" , InputCaseSensitive:1});
	            SetColProperty(0 ,"shpr_addr", 	{AcceptKeys:"E|N|[/-. \n\r]" , InputCaseSensitive:1});
	            SetColProperty(0 ,"shpr_cty_nm",{AcceptKeys:"E|N|[/ -. ]" , InputCaseSensitive:1});
	            SetColProperty(0 ,"cnee_nm", 	{AcceptKeys:"E|N|[/ -. ]" , InputCaseSensitive:1});
	            SetColProperty(0 ,"cnee_addr", 	{AcceptKeys:"E|N|[/-. \n\r]" , InputCaseSensitive:1});
	            SetColProperty(0 ,"cnee_cty_nm",{AcceptKeys:"E|N|[/ -. ]" , InputCaseSensitive:1});
	            SetColProperty(0 ,"ntfy_nm", 	{AcceptKeys:"E|N|[/ -. ]" , InputCaseSensitive:1});
	            SetColProperty(0 ,"ntfy_addr", 	{AcceptKeys:"E|N|[/-. \n\r]" , InputCaseSensitive:1});
	            SetColProperty(0 ,"ntfy_cty_nm",{AcceptKeys:"E|N|[/ -. ]" , InputCaseSensitive:1});
	            SetColProperty(0 ,"agt_nm", 	{AcceptKeys:"E|N|[/ -. ]" , InputCaseSensitive:1});
	            SetColProperty(0 ,"agt_addr", 	{AcceptKeys:"E|N|[/-. \n\r]" , InputCaseSensitive:1});
	            SetColProperty(0 ,"iss_loc_nm", {AcceptKeys:"E|N|[/-. \n\r]" , InputCaseSensitive:1});
	            
		      	SetEditable(1);
		        SetSheetHeight(350);
		        SetHeaderRowHeight(20);
		        SetHeaderRowHeight(20);
		        
			}
		break;
		case 2: //HAWB TAB
			with (sheetObj) {
		      SetConfig( { SearchMode:2, MergeSheet:8, Page:20, DataRowMerge:0, FrozenCol: 12} );  
		      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		      var headers = [ { Text:getLabel('EDI_AWB_0010_HDR_3'), Align:"Center"},
		                      { Text:getLabel('EDI_AWB_0010_HDR_4'), Align:"Center"} ];
		      InitHeaders(headers, info);
	
		      var cols = [ 
							{Type:"CheckBox",	Hidden:0,  Width:25,   Align:"Center", 	ColMerge:0,  SaveName:"chk",         	 	KeyField:0,   Format:"",  		UpdateEdit:1,  InsertEdit:1 , EditLen:1, TrueValue : "Y", FalseValue : "N"},
							{Type:"Text",  		Hidden:1,  Width:100,  Align:"Left",  	ColMerge:0,  SaveName:"msg_no",  		 	KeyField:0,   Format:"",  		UpdateEdit:0,  InsertEdit:0 }, // Additional Info
							{Type:"Text",  		Hidden:1,  Width:100,  Align:"Left",  	ColMerge:0,  SaveName:"intg_bl_seq",  	 	KeyField:0,   Format:"",  		UpdateEdit:0,  InsertEdit:0 }, // Additional Info
							{Type:"Text",  		Hidden:1,  Width:100,  Align:"Left",  	ColMerge:0,  SaveName:"mawb_intg_bl_seq",	KeyField:0,   Format:"",  		UpdateEdit:0,  InsertEdit:0 }, // Additional Info
							{Type:"Text",  		Hidden:1,  Width:100,  Align:"Left",  	ColMerge:0,  SaveName:"biz_clss_cd",  	 	KeyField:0,   Format:"",  		UpdateEdit:0,  InsertEdit:0 }, // Additional Info
							{Type:"Text",  		Hidden:1,  Width:100,  Align:"Left",  	ColMerge:0,  SaveName:"cust_id",  		 	KeyField:0,   Format:"",   		UpdateEdit:0,  InsertEdit:0 }, // Additional Info
							{Type:"Text",  		Hidden:1,  Width:100,  Align:"Left",  	ColMerge:0,  SaveName:"airln_cd",  		 	KeyField:0,   Format:"",  		UpdateEdit:0,  InsertEdit:0 }, // Additional Info
							{Type:"Text",  		Hidden:1,  Width:100,  Align:"Left",  	ColMerge:0,  SaveName:"msg_tp_cd",  	 	KeyField:0,   Format:"",  		UpdateEdit:0,  InsertEdit:0 }, // Additional Info
							{Type:"Text",  		Hidden:1,  Width:100,  Align:"Left",  	ColMerge:0,  SaveName:"awb_pfx_no",  	 	KeyField:0,   Format:"",  		UpdateEdit:0,  InsertEdit:0 }, // Additional Info
							{Type:"Text",  		Hidden:0,  Width:100,  Align:"Left",  	ColMerge:0,  SaveName:"org_bl_no",  	 	KeyField:0,   Format:"",  		UpdateEdit:0,  InsertEdit:0 }, // Additional Info
							{Type:"Text",  		Hidden:1,  Width:100,  Align:"Center",  ColMerge:0,  SaveName:"hawb_no",  		 	KeyField:0,   Format:"",  		UpdateEdit:0,  InsertEdit:0 },
							
							{Type:"Combo",  	Hidden:0,  Width:75,   Align:"Center",  ColMerge:0,  SaveName:"msg_sts_cd",  	 	KeyField:0,   Format:"",  		UpdateEdit:0,  InsertEdit:0 },
							{Type:"Text",   	Hidden:1,  Width:30,   Align:"Center",  ColMerge:0,  SaveName:"err_msg", 		 	KeyField:0,   Format:"",   		UpdateEdit:0,  InsertEdit:0 },
							{Type:"Text",  		Hidden:0,  Width:50,   Align:"Center",  ColMerge:0,  SaveName:"cstms_rgst_flg",  	KeyField:0,   Format:"",  		UpdateEdit:0,  InsertEdit:0 },
							{Type:"Text",  		Hidden:1,  Width:100,  Align:"Left",    ColMerge:0,  SaveName:"cstms_cnt_cd",  	 	KeyField:0,   Format:"",  		UpdateEdit:0,  InsertEdit:0 }, // Additional Info
							{Type:"Date",  		Hidden:0,  Width:110,  Align:"Center",  ColMerge:0,  SaveName:"snt_tms",  	     	KeyField:0,   Format:"YmdHm",	UpdateEdit:0,  InsertEdit:0 },
							{Type:"Date",  		Hidden:0,  Width:110,  Align:"Center",  ColMerge:0,  SaveName:"mod_tms",  	     	KeyField:0,   Format:"YmdHm",	UpdateEdit:0,  InsertEdit:0 },
							{Type:"Text",  		Hidden:0,  Width:50,   Align:"Center",  ColMerge:0,  SaveName:"his_view",    	 	KeyField:0,   Format:"",   		UpdateEdit:0,  InsertEdit:0 , FontUnderline:1 },
							{Type:"Text",  		Hidden:1,  Width:50,   Align:"Center",  ColMerge:0,  SaveName:"hawb_org_port_cd",	KeyField:0,   Format:"",  		UpdateEdit:0,  InsertEdit:0 },
							{Type:"Text",  		Hidden:0,  Width:120,  Align:"Left",  	ColMerge:0,  SaveName:"org_port_nm",     	KeyField:0,   Format:"",  		UpdateEdit:0,  InsertEdit:0 , Ellipsis:1},
							{Type:"Date",  		Hidden:0,  Width:110,  Align:"Center",  ColMerge:0,  SaveName:"etd_dt",  	     	KeyField:0,   Format:"YmdHm",	UpdateEdit:0,  InsertEdit:0 },
							{Type:"Text",  		Hidden:1,  Width:50,   Align:"Center",  ColMerge:0,  SaveName:"hawb_dest_port_cd",	KeyField:0,   Format:"",  		UpdateEdit:0,  InsertEdit:0 },
							{Type:"Text",  		Hidden:0,  Width:120,  Align:"Left",  	ColMerge:0,  SaveName:"dest_port_nm",    	KeyField:0,   Format:"",  		UpdateEdit:0,  InsertEdit:0 , Ellipsis:1},
							{Type:"Date",  		Hidden:0,  Width:110,  Align:"Center",  ColMerge:0,  SaveName:"eta_dt",  		 	KeyField:0,   Format:"YmdHm",	UpdateEdit:0,  InsertEdit:0 },
							
							{Type:"Int",  		Hidden:0,  Width:50,   Align:"Center",  ColMerge:0,  SaveName:"hawb_piec_qty",  	KeyField:0,   Format:"Integer", UpdateEdit:0,  InsertEdit:0 },
							{Type:"Float",  	Hidden:0,  Width:75,   Align:"Right",   ColMerge:0,  SaveName:"hawb_wgt",  			KeyField:0,   Format:"Float",  	UpdateEdit:0,  InsertEdit:0 , PointCount:3 },
							{Type:"Text",  		Hidden:1,  Width:100,  Align:"Left",    ColMerge:0,  SaveName:"hawb_wgt_cd",  		KeyField:0,   Format:"",  		UpdateEdit:0,  InsertEdit:0 }, // Additional Info
							{Type:"Float",  	Hidden:0,  Width:75,   Align:"Right",   ColMerge:0,  SaveName:"awb_vol",  			KeyField:0,   Format:"Float",   UpdateEdit:0,  InsertEdit:0 , PointCount:3 },
							{Type:"Text",  		Hidden:1,  Width:100,  Align:"Left",    ColMerge:0,  SaveName:"awb_vol_cd",  		KeyField:0,   Format:"",  		UpdateEdit:0,  InsertEdit:0 }, // Additional Info
							
							{Type:"Text",  		Hidden:0,  Width:50,   Align:"Center",  ColMerge:0,  SaveName:"flt_crr_cd",  		KeyField:0,   Format:"",  		UpdateEdit:0,  InsertEdit:0 },
							{Type:"Text",  		Hidden:1,  Width:75,   Align:"Center",  ColMerge:0,  SaveName:"flt_no",  	 		KeyField:0,   Format:"",  		UpdateEdit:0,  InsertEdit:0 },
							{Type:"Int",  		Hidden:1,  Width:100,  Align:"Left",  	ColMerge:0,  SaveName:"flt_dy",  	 		KeyField:0,   Format:"Integer", UpdateEdit:0,  InsertEdit:0 }, // Additional Info
							{Type:"Text",  		Hidden:1,  Width:100,  Align:"Left",  	ColMerge:0,  SaveName:"n1st_crr_cd", 		KeyField:0,   Format:"",  		UpdateEdit:0,  InsertEdit:0 }, // Additional Info
							{Type:"Text",  		Hidden:0,  Width:75,   Align:"Center",  ColMerge:0,  SaveName:"org_flt_no",  		KeyField:0,   Format:"",  		UpdateEdit:0,  InsertEdit:0 }, // Additional Info							
							
							{Type:"Text",  		Hidden:1,  Width:150,  Align:"Left",  	ColMerge:0,  SaveName:"hawb_gds_desc",  	KeyField:0,   Format:"",  		UpdateEdit:1,  InsertEdit:1,  Ellipsis:1 , AcceptKeys:AcceptKeysOfTextField,     InputCaseSensitive:1 }, // Additional Info
							{Type:"Text",   	Hidden:1,  Width:30,   Align:"Center",  ColMerge:0,  SaveName:"hawb_gds_desc_img",  KeyField:0,   Format:"",  		UpdateEdit:0,  InsertEdit:0,  FontBold:1 },
														
							{Type:"Text",  		Hidden:1,  Width:100,  Align:"Left",    ColMerge:0,  SaveName:"shpr_cd",  			KeyField:0,   Format:"",  		UpdateEdit:1,  InsertEdit:1 }, // Additional Info
							{Type:"PopupEdit",  Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,  SaveName:"shpr_nm",  			KeyField:0,   Format:"",  		UpdateEdit:1,  InsertEdit:1,  Ellipsis:1 , AcceptKeys:AcceptKeysOfNameField, 	InputCaseSensitive:1 },
							{Type:"Text",  		Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,  SaveName:"shpr_addr",  		KeyField:0,   Format:"",  		UpdateEdit:1,  InsertEdit:1,  Ellipsis:1 , AcceptKeys:AcceptKeysOfAddressField, InputCaseSensitive:1 },
							{Type:"Text",    	Hidden:0,  Width:30,   Align:"Center",  ColMerge:0,  SaveName:"shpr_img",     		KeyField:0,   Format:"",  		UpdateEdit:0,  InsertEdit:0,  FontBold:1 },
							{Type:"Text",  		Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,  SaveName:"shpr_cty_nm",  		KeyField:0,   Format:"",  		UpdateEdit:1,  InsertEdit:1,  Ellipsis:1 , AcceptKeys:AcceptKeysOfNameField, 	InputCaseSensitive:1 },
							{Type:"PopupEdit",  Hidden:0,  Width:50,   Align:"Center",  ColMerge:0,  SaveName:"shpr_cnt_cd",  		KeyField:0,   Format:"",  		UpdateEdit:1,  InsertEdit:1,  EditLen:2  , AcceptKeys:AcceptKeysOfCodeField, 	InputCaseSensitive:1 },
							
							{Type:"Text",  		Hidden:1,  Width:100,  Align:"Left",    ColMerge:0,  SaveName:"cnee_cd",  			KeyField:0,   Format:"",  		UpdateEdit:1,  InsertEdit:1 }, // Additional Info
							{Type:"PopupEdit",  Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,  SaveName:"cnee_nm",  			KeyField:0,   Format:"",  		UpdateEdit:1,  InsertEdit:1,  Ellipsis:1 , AcceptKeys:AcceptKeysOfNameField, 	InputCaseSensitive:1 },
							{Type:"Text",  		Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,  SaveName:"cnee_addr", 			KeyField:0,   Format:"",  		UpdateEdit:1,  InsertEdit:1,  Ellipsis:1 , AcceptKeys:AcceptKeysOfAddressField, InputCaseSensitive:1 },
							{Type:"Text",    	Hidden:0,  Width:30,   Align:"Center",  ColMerge:0,  SaveName:"cnee_img",     		KeyField:0,   Format:"",  		UpdateEdit:0,  InsertEdit:0 , FontBold:1 },							
							{Type:"Text",  		Hidden:0,  Width:100,  Align:"Left",    ColMerge:0,  SaveName:"cnee_cty_nm",  		KeyField:0,   Format:"",  		UpdateEdit:1,  InsertEdit:1,  Ellipsis:1 , AcceptKeys:AcceptKeysOfNameField, 	InputCaseSensitive:1 },
							{Type:"PopupEdit",  Hidden:0,  Width:50,   Align:"Center",  ColMerge:0,  SaveName:"cnee_cnt_cd",  		KeyField:0,   Format:"",  		UpdateEdit:1,  InsertEdit:1,  EditLen:2  , AcceptKeys:AcceptKeysOfCodeField, 	InputCaseSensitive:1 },
							
							{Type:"Text",  		Hidden:1,  Width:100,  Align:"Left",    ColMerge:0,  SaveName:"ntfy_cd", 	 		KeyField:0,   Format:"",  		UpdateEdit:1,  InsertEdit:1 }, // Additional Info
							{Type:"PopupEdit",  Hidden:1,  Width:100,  Align:"Left",    ColMerge:0,  SaveName:"ntfy_nm",  			KeyField:0,   Format:"",  		UpdateEdit:1,  InsertEdit:1,  Ellipsis:1, AcceptKeys:AcceptKeysOfNameField, 	InputCaseSensitive:1 }, // Additional Info
							{Type:"Text",  		Hidden:1,  Width:100,  Align:"Left",    ColMerge:0,  SaveName:"ntfy_addr",  		KeyField:0,   Format:"",  		UpdateEdit:1,  InsertEdit:1,  Ellipsis:1, AcceptKeys:AcceptKeysOfAddressField,  InputCaseSensitive:1 }, // Additional Info
							{Type:"Text",  		Hidden:1,  Width:100,  Align:"Left",    ColMerge:0,  SaveName:"ntfy_cty_nm",  		KeyField:0,   Format:"",  		UpdateEdit:1,  InsertEdit:1,  Ellipsis:1, AcceptKeys:AcceptKeysOfNameField, 	InputCaseSensitive:1 }, // Additional Info
							{Type:"PopupEdit",  Hidden:1,  Width:50,   Align:"Center",  ColMerge:0,  SaveName:"ntfy_cnt_cd",  		KeyField:0,   Format:"",  		UpdateEdit:1,  InsertEdit:1,  EditLen:2 , AcceptKeys:AcceptKeysOfCodeField, 	InputCaseSensitive:1 }, // Additional Info
							
							{Type:"Combo",  	Hidden:0,  Width:50,   Align:"Center",  ColMerge:0,  SaveName:"decl_curr_cd",    	KeyField:0,   Format:"",  		UpdateEdit:1,  InsertEdit:1,  EditLen:3 },
							{Type:"Combo",  	Hidden:0,  Width:175,  Align:"Center",  ColMerge:0,  SaveName:"decl_pay_term_cd",	KeyField:0,   Format:"",  		UpdateEdit:1,  InsertEdit:1,  EditLen:2 },
							{Type:"Text",  		Hidden:0,  Width:100,  Align:"Center",  ColMerge:0,  SaveName:"decl_crr_no",  	 	KeyField:0,   Format:"",  		UpdateEdit:1,  InsertEdit:1,  AcceptKeys:AcceptKeysOfTextField, 	  			InputCaseSensitive:1 },
							{Type:"Text",  		Hidden:0,  Width:100,  Align:"Center",  ColMerge:0,  SaveName:"decl_cstms_no",   	KeyField:0,   Format:"",  		UpdateEdit:1,  InsertEdit:1,  AcceptKeys:AcceptKeysOfTextField, 	  			InputCaseSensitive:1 },
							{Type:"Text",  		Hidden:0,  Width:100,  Align:"Center",  ColMerge:0,  SaveName:"decl_insur_no",   	KeyField:0,   Format:"",  		UpdateEdit:1,  InsertEdit:1,  AcceptKeys:AcceptKeysOfTextField, 	  			InputCaseSensitive:1 },
							
							{Type:"Text",  		Hidden:1,  Width:100,  Align:"Left",    ColMerge:0,  SaveName:"doc_sts_cd",  		KeyField:0,   Format:"",  		UpdateEdit:1,  InsertEdit:1 }, // Additional Info
							
							{Type:"Text",  		Hidden:1,  Width:100,  Align:"Left",    ColMerge:0,  SaveName:"airln_sprt", 	 	KeyField:0,   Format:"",  		UpdateEdit:0,  InsertEdit:0 }, // Additional Info
							
							{Type:"Status",   	Hidden:1,  Width:0,    Align:"Left",    ColMerge:0,  SaveName:"ibflag" }
		                   ];
		       
		      	InitColumns(cols);
		      	//SetImageList(1,"web/img/main/icon_m.gif");
		      	SetColProperty('msg_sts_cd',       {ComboText:MSG_STS_NM, ComboCode:MSG_STS_CD} );
		      	SetColProperty('pck_ut_cd',        {ComboText:PCKCD1, ComboCode:PCKCD2} );
		      	SetColProperty('decl_curr_cd', 	   {ComboText:'|'+CURRCD1, ComboCode:'|'+CURRCD2} );
		        SetColProperty('decl_pay_term_cd', {ComboText:'|'+TERMCD1, ComboCode:'|'+TERMCD2} );
		        SetColProperty('ofc_desi_cd', 	   {ComboText:'|'+DESICD1, ComboCode:'|'+DESICD2} );
		      	
		      	SetEditable(1);
		        SetSheetHeight(350);
		        SetHeaderRowHeight(20);
		        SetHeaderRowHeight(20);
			}
		break;	
	}
}

var trdp_tp = "";
var loc_tp = "";
var cnt_tp = "";

var cur_sheetObj;
var cur_rowIdx;

//SPECIAL CHARACTER REMOVE
function deleteFunction(){
	var sheetObj=docObjects[0];
	var rows=sheetObj.LastRow() + 1;
	
	for(var i=2 ; i<rows ; i++){
		sheetObj.SetCellValue(i, "shpr_nm",		deleteChar(sheetObj.GetCellValue(i, "shpr_nm"), 	'-/. ', 0));
		sheetObj.SetCellValue(i, "shpr_addr",	deleteChar(sheetObj.GetCellValue(i, "shpr_addr"), 	'-/. ', 0));
		sheetObj.SetCellValue(i, "shpr_cty_nm",	deleteChar(sheetObj.GetCellValue(i, "shpr_cty_nm"), '-/. ', 0));
		sheetObj.SetCellValue(i, "cnee_nm",		deleteChar(sheetObj.GetCellValue(i, "cnee_nm"), 	'-/. ', 0));
		sheetObj.SetCellValue(i, "cnee_addr",	deleteChar(sheetObj.GetCellValue(i, "cnee_addr"), 	'-/. ', 0));
		sheetObj.SetCellValue(i, "cnee_cty_nm",	deleteChar(sheetObj.GetCellValue(i, "cnee_cty_nm"), '-/. ', 0));
		sheetObj.SetCellValue(i, "ntfy_nm",		deleteChar(sheetObj.GetCellValue(i, "ntfy_nm"), 	'-/. ', 0));
		sheetObj.SetCellValue(i, "ntfy_addr",	deleteChar(sheetObj.GetCellValue(i, "ntfy_addr"), 	'-/. ', 0));
		sheetObj.SetCellValue(i, "ntfy_cty_nm",	deleteChar(sheetObj.GetCellValue(i, "ntfy_cty_nm"), '-/. ', 0));
		sheetObj.SetCellValue(i, "agt_nm",		deleteChar(sheetObj.GetCellValue(i, "agt_nm"), 		'-/. ', 0));
		sheetObj.SetCellValue(i, "agt_addr",	deleteChar(sheetObj.GetCellValue(i, "agt_addr"), 	'-/. ', 0));
		sheetObj.SetCellValue(i, "iss_loc_nm",	deleteChar(sheetObj.GetCellValue(i, "iss_loc_nm"), 	'-/. ', 0));
	}
}

function deleteChar(text, char, mode){
	var alpha='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	var numeric='1234567890.';
	var checkStr='';
	var line='\r\n';
	if(mode==0){
		checkStr=alpha + numeric + char + line;
	}else if(mode==1){
		checkStr=alpha + char + line;
	}else if(mode==2){
		checkStr=numeric + char + line;
	}else{
		checkStr=char + line;
	}
	var result='';
	for(var i=0 ; i<text.length ; i++){
		if(checkStr.indexOf(text.substring(i, i+1)) < 0){
		}else{
			result += text.substring(i, i+1);
		}
	}
	return result.toUpperCase();
}

// SHEET1 ACTION
function sheet1_OnSearchEnd() {
	formatDataRow();
	cur_sheetObj = docObjects[0];
}

function sheet1_OnSaveEnd(sheetObj, errCd, errMsg){
	if(errMsg != ""){
		alert(errMsg);
	}else{
        doWork("SEARCHLIST01");
		formatDataRow();
	}
}

function sheet1_OnClick(sheetObj, Row, col) {
	var formObj=document.frm1;
	var colStr=sheetObj.ColSaveName(col);
	if(colStr == "his_view"){									// History View Popup
   		rtnary=new Array(1);
   		//rtnary[0]=sheetObj.GetCellValue(Row, "awb_no");
   		rtnary[0]=sheetObj.GetCellValue(Row, "intg_bl_seq");
   		rtnary[1]="AWB";
	    modal_center_open('./EDI_AWB_0020.clt', rtnary, 950,450,"yes");
	}else if (colStr == "msg_sts_cd") { 				// Error Message of Reject
		if( sheetObj.GetCellValue(Row, "msg_sts_cd") == 'R' ){
			ComShowMemoPad2(sheetObj, Row, "err_msg", false, 350, 200, col, "err_msg");
		}
	}else if (colStr == "spcl_rqst_desc_img") { 				// Special Request Input Box
		ComShowMemoPad4(sheetObj, Row, "spcl_rqst_desc", false, 250, 130, col, "spcl_rqst_desc");   
	}else if (colStr == "acct_info_desc_img") { // Account Info Input Box
		ComShowMemoPad4(sheetObj, Row, "acct_info_desc", false, 250, 130, col, "acct_info_desc");   
	}else if (colStr == "rt_gds_desc_img") {    				// Nature & Quantity of Goods Input Box
		ComShowMemoPad4(sheetObj, Row, "rt_gds_desc", false, 250, 130, col, "rt_gds_desc");   
	}else if (colStr == "shpr_img" || colStr == "cnee_img") {   // SHPR , CNEE Input Box
		var pfx = colStr.substring(0, 4);
		ComShowMemoPad4(sheetObj, Row, pfx + "_addr", false, 250, 130, col, pfx + "_addr");   
	}else if (colStr == "agt_img") {							//Agent Address Input Box
		var pfx = colStr.substring(0, 3);
		ComShowMemoPad4(sheetObj, Row, pfx + "_addr", false, 250, 130, col, pfx + "_addr");   
	}
}

function sheet1_OnDblClick(sheetObj, Row, Col) {
	var colStr = sheetObj.ColSaveName(Col);
	var formObj = document.frm1;
	if (colStr == 'org_bl_no' && sheetObj.GetCellValue(Row, "org_bl_no") != "" ) {
		doProcess = true;
		formObj.f_cmd.value = "";
		var paramStr = "./AIE_BMD_0040.clt?f_cmd=" + SEARCHLIST + "&f_bl_no="
				+ escape(sheetObj.GetCellValue(Row, "org_bl_no")) + "&f_intg_bl_seq="
				+ sheetObj.GetCellValue(Row, "intg_bl_seq");
		parent.mkNewFrame('MAWB', paramStr,"AIE_BMD_0040_SHEET_" +  sheetObj.GetCellValue(Row, "bl_no") + "_" + sheetObj.GetCellValue(Row, "intg_bl_seq"));
	}
	if(colStr == 'hbl_cnt' ){
		formObj.f_mbl_no.value = sheetObj.GetCellValue(Row, "org_bl_no");
		formObj.val_msg.value = "";
		goTabSelect("02");
	}
}

function sheet1_OnKeyDown(sheetObj, row, col, keyCode){
	var colStr = sheetObj.ColSaveName(col);
	cur_sheetObj = sheetObj;
	cur_rowIdx = row;
	
	if(keyCode==13){
		if(sheetObj.ColSaveName(col)=="shpr_nm"){
			sheetObj.SelectCell(row, col);
			
			trdp_tp = "shpr";
			rtnary=new Array(1);
	   		rtnary[0]="2";
	   		rtnary[1]=sheetObj.GetCellValue(row, col);
	   		rtnary[2]=window;
	   		
	   		callBackFunc = "TRDP_POPUP";
	   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150, 650,"yes");
	   		
		} else if(sheetObj.ColSaveName(col)=="cnee_nm"){
			sheetObj.SelectCell(row, col);
			
			trdp_tp = "cnee";
			rtnary=new Array(1);
	   		rtnary[0]="2";
	   		rtnary[1]=sheetObj.GetCellValue(row, col);
	   		rtnary[2]=window;
	   		
	   		callBackFunc = "TRDP_POPUP";
	   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150, 650,"yes");
	   		
		} else if(sheetObj.ColSaveName(col)=="ntfy_nm"){
			sheetObj.SelectCell(row, col);
			
			trdp_tp = "ntfy";
			rtnary=new Array(1);
	   		rtnary[0]="2";
	   		rtnary[1]=sheetObj.GetCellValue(row, col);
	   		rtnary[2]=window;
	   		
	   		callBackFunc = "TRDP_POPUP";
	   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150, 650,"yes");
	   		
		} 
	}
}

function sheet1_OnChange(sheetObj, Row, Col) {
	cur_sheetObj = sheetObj;
	cur_rowIdx = Row;
	var colStr=sheetObj.ColSaveName(Col);
	
	//Prepaid Auto Sum
	if(colStr=="ppd_wgt_chg_amt" || colStr=="ppd_val_chg_amt" || colStr=="ppd_tax_amt" || colStr=="ppd_agt_chg_amt" || colStr=="ppd_crr_chg_amt" ){
		sheetObj.SetCellValue(Row, "ppd_ttl_chg_amt" , sheetObj.ComputeSum("|ppd_wgt_chg_amt|+|ppd_val_chg_amt|+|ppd_tax_amt|+|ppd_agt_chg_amt|+|ppd_crr_chg_amt|",Row,Row), 0);
	} //Collect Auto Sum
	else if(colStr=="clt_wgt_chg_amt" || colStr=="clt_val_chg_amt" || colStr=="clt_tax_amt" || colStr=="clt_agt_chg_amt" || colStr=="clt_crr_chg_amt" ){
		sheetObj.SetCellValue(Row, "clt_ttl_chg_amt" , sheetObj.ComputeSum("|clt_wgt_chg_amt|+|clt_val_chg_amt|+|clt_tax_amt|+|clt_agt_chg_amt|+|clt_crr_chg_amt|",Row,Row), 0);
	} //Rate Amt Auto Calculation
	else if(colStr=="rt_val" || colStr=="rt_chg_wgt"){
		sheetObj.SetCellValue(Row, "rt_chg_amt" , sheetObj.GetCellValue(Row, "rt_val") * sheetObj.GetCellValue(Row, "rt_chg_wgt") , 0);
	}
	
}

function sheet1_OnPopupClick(sheetObj, row, col){
	var colStr = sheetObj.ColSaveName(col);
	cur_sheetObj = sheetObj;
	cur_rowIdx = row;
	
	if(colStr=="shpr_nm"){
		trdp_tp = "shpr";
   		rtnary=new Array(1);
   		rtnary[0]="2";
   		rtnary[1]="";
   		rtnary[2]=window;
   		
   		callBackFunc = "TRDP_POPUP";
   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150, 650, "yes");
   		
	} else if(colStr=="cnee_nm"){
		trdp_tp = "cnee";
   		rtnary=new Array(1);
   		rtnary[0]="2";
   		rtnary[1]="";
   		rtnary[2]=window;
   		
   		callBackFunc = "TRDP_POPUP";
   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150, 650, "yes");
   		
	} else if(colStr=="ntfy_nm"){
		trdp_tp = "ntfy";
   		rtnary=new Array(1);
   		rtnary[0]="2";
   		rtnary[1]="";
   		rtnary[2]=window;
   		
   		callBackFunc = "TRDP_POPUP";
   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150, 650, "yes");
   		
	} else if(colStr=="agt_nm"){
		trdp_tp = "agt";
   		rtnary=new Array(1);
   		rtnary[0]="2";
   		rtnary[1]="";
   		rtnary[2]=window;
   		
   		callBackFunc = "TRDP_POPUP";
   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150, 650, "yes");
   		
	} else if(colStr=="ofc_port_cd"){
		loc_tp = colStr;
   		rtnary=new Array(1);
   		rtnary[0]="A";
   		rtnary[1]="";
   		rtnary[2]="";
   		rtnary[3]="";
   		rtnary[4]=document.frm1.dpt;
   		
   		callBackFunc = "PORT_POPUP";
   		modal_center_open('./CMM_POP_0030.clt', rtnary, 806, 415, "yes");
   		
	} else if(colStr=="rt_cmdt_cd"){
   		rtnary=new Array(1);
   		rtnary[0]="1";
   		rtnary[1]="";
   		rtnary[2]="";
   		
   		callBackFunc = "COMMODITY_POPUP";
   		modal_center_open('./CMM_POP_0110.clt?s_hs_grp_cd=HU', rtnary, 756, 483, "yes");
   		
	} else if(colStr=="shpr_cnt_cd" || colStr=="cnee_cnt_cd" || colStr=="ntfy_cnt_cd"|| colStr=="rt_org_cnt_cd"){
		cnt_tp = colStr;
		rtnary=new Array(3);
	    rtnary[0]="";
	    rtnary[1]="" ;
	    rtnary[2]="";
	    callBackFunc = "CNT_POPUP";
	    modal_center_open('./CMM_POP_0020.clt', rtnary, 806,480,"yes");
	} 
		
}

// SHEET2 ACTION
function sheet2_OnSearchEnd() {
	formatDataRow2();
	cur_sheetObj = docObjects[1];
}

function sheet2_OnSaveEnd(sheetObj, errCd, errMsg){
	if(errMsg != ""){
		alert(errMsg);
	}else{
		doWork("SEARCHLIST02");
		formatDataRow2();
	}
}

function sheet2_OnClick(sheetObj, Row, col) {
	var formObj=document.frm1;
	var colStr=sheetObj.ColSaveName(col);
	if(colStr == "his_view"){									// History View Popup
   		rtnary=new Array(1);
   		//rtnary[0]=sheetObj.GetCellValue(Row, "awb_no");
   		rtnary[0]=sheetObj.GetCellValue(Row, "intg_bl_seq");
   		rtnary[1]="AWB";
	    modal_center_open('./EDI_AWB_0020.clt', rtnary, 950,450,"yes");
	}else if (colStr == "msg_sts_cd") { 						// Error Message of Reject
		if( sheetObj.GetCellValue(Row, "msg_sts_cd") == 'R' ){
			ComShowMemoPad2(sheetObj, Row, "err_msg", false, 350, 200, col, "err_msg");
		}
	}else if (colStr == "hawb_gds_desc_img") {    				// Nature & Quantity of Goods Input Box
		ComShowMemoPad4(sheetObj, Row, "hawb_gds_desc", false, 250, 130, col, "hawb_gds_desc");   
	}else if (colStr == "shpr_img" || colStr == "cnee_img") {   // SHPR , CNEE Input Box
		var pfx = colStr.substring(0, 4);
		ComShowMemoPad4(sheetObj, Row, pfx + "_addr", false, 250, 130, col, pfx + "_addr");   
	}
}

function sheet2_OnDblClick(sheetObj, Row, Col) {
	var colStr = sheetObj.ColSaveName(Col);
	var formObj = document.frm1;
	if (colStr == 'org_bl_no' && sheetObj.GetCellValue(Row, "org_bl_no") != "" ) {
		doProcess = true;
		formObj.f_cmd.value = "";
		var paramStr = "./AIE_BMD_0020.clt?f_cmd=" + SEARCHLIST + "&f_bl_no="
				+ escape(sheetObj.GetCellValue(Row, "org_bl_no")) + "&f_intg_bl_seq="
				+ sheetObj.GetCellValue(Row, "intg_bl_seq");
		parent.mkNewFrame('HAWB', paramStr,"AIE_BMD_0020_SHEET_" +  sheetObj.GetCellValue(Row, "bl_no") + "_" + sheetObj.GetCellValue(Row, "intg_bl_seq"));
	}
}

function sheet2_OnKeyDown(sheetObj, row, col, keyCode){
	var colStr = sheetObj.ColSaveName(col);
	cur_sheetObj = sheetObj;
	cur_rowIdx = row;
	
	if(keyCode==13){
		if(sheetObj.ColSaveName(col)=="shpr_nm"){
			sheetObj.SelectCell(row, col);
			
			trdp_tp = "shpr";
			rtnary=new Array(1);
	   		rtnary[0]="2";
	   		rtnary[1]=sheetObj.GetCellValue(row, col);
	   		rtnary[2]=window;
	   		
	   		callBackFunc = "TRDP_POPUP";
	   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150, 650,"yes");
	   		
		} else if(sheetObj.ColSaveName(col)=="cnee_nm"){
			sheetObj.SelectCell(row, col);
			
			trdp_tp = "cnee";
			rtnary=new Array(1);
	   		rtnary[0]="2";
	   		rtnary[1]=sheetObj.GetCellValue(row, col);
	   		rtnary[2]=window;
	   		
	   		callBackFunc = "TRDP_POPUP";
	   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150, 650,"yes");
	   		
		} else if(sheetObj.ColSaveName(col)=="ntfy_nm"){
			sheetObj.SelectCell(row, col);
			
			trdp_tp = "ntfy";
			rtnary=new Array(1);
	   		rtnary[0]="2";
	   		rtnary[1]=sheetObj.GetCellValue(row, col);
	   		rtnary[2]=window;
	   		
	   		callBackFunc = "TRDP_POPUP";
	   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150, 650,"yes");
	   		
		} 
	}
}

function sheet2_OnPopupClick(sheetObj, row, col){
	var colStr = sheetObj.ColSaveName(col);
	cur_sheetObj = sheetObj;
	cur_rowIdx = row;
	
	if(colStr=="shpr_nm"){
		trdp_tp = "shpr";
   		rtnary=new Array(1);
   		rtnary[0]="2";
   		rtnary[1]="";
   		rtnary[2]=window;
   		
   		callBackFunc = "TRDP_POPUP";
   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150, 650, "yes");
   		
	} else if(colStr=="cnee_nm"){
		trdp_tp = "cnee";
   		rtnary=new Array(1);
   		rtnary[0]="2";
   		rtnary[1]="";
   		rtnary[2]=window;
   		
   		callBackFunc = "TRDP_POPUP";
   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150, 650, "yes");
   		
	} else if(colStr=="ntfy_nm"){
		trdp_tp = "ntfy";
   		rtnary=new Array(1);
   		rtnary[0]="2";
   		rtnary[1]="";
   		rtnary[2]=window;
   		
   		callBackFunc = "TRDP_POPUP";
   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150, 650, "yes");
   		
	} else if(colStr=="agt_nm"){
		trdp_tp = "agt";
   		rtnary=new Array(1);
   		rtnary[0]="2";
   		rtnary[1]="";
   		rtnary[2]=window;
   		
   		callBackFunc = "TRDP_POPUP";
   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150, 650, "yes");
   		
	} 
	 else if(colStr=="shpr_cnt_cd" || colStr=="cnee_cnt_cd" || colStr=="ntfy_cnt_cd"|| colStr=="rt_org_cnt_cd"){
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
		
		sheetObj.SetCellValue(cur_rowIdx, trdp_tp + '_cd', rtnValAry[0], 0); // trdp_cd
		sheetObj.SetCellValue(cur_rowIdx, trdp_tp + '_nm', rtnValAry[2], 0); // full_nm
		//sheetObj.SetCellValue(cur_rowIdx, trdp_tp + '_trdp_phn', rtnValAry[4], 0); // trdp_phn
		sheetObj.SetCellValue(cur_rowIdx, trdp_tp + '_addr', rtnValAry[7].replaceAll("\r\n", " ").replaceAll("\n", " ").substring(0, 105), 0); // address
		//sheetObj.SetCellValue(cur_rowIdx, trdp_tp + '_trdp_zip_cd', rtnValAry[11], 0); // zip code
		sheetObj.SetCellValue(cur_rowIdx, trdp_tp + '_cnt_cd', rtnValAry[12], 0); // country
	}
    sheetObj.SelectCell(cur_rowIdx, trdp_tp + '_nm');
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

function PORT_POPUP(rtnVal){

	var sheetObj = cur_sheetObj;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		sheetObj.SetCellValue(cur_rowIdx, loc_tp, rtnValAry[0], 0);
	}
}

function COMMODITY_POPUP(rtnVal){
	var sheetObj = cur_sheetObj;
	
    if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		
		// Wonki Eo Comment - 8 자리 중분류 Commodity까지 자르는 것으로 안준상 수석 가이드.
		sheetObj.SetCellValue(cur_rowIdx, 'rt_cmdt_cd', rtnValAry[0].substring(0, 8), 0); // rep_cmdt_cd
		//sheetObj.SetCellValue(cur_rowIdx, 'rep_cmdt_nm', rtnValAry[2], 0); // rep_cmdt_nm
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

function POL_LOCATION_POPLIST(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var formObj  = document.frm1;
		var rtnValAry=rtnVal.split("|");
		formObj.f_pol_cd.value=rtnValAry[0];//loc_cd 
		formObj.f_pol_nm.value=rtnValAry[2];//loc_nm
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
function codeNameAction(str, obj, tmp){
	if(obj == '[object]' || obj =='[object HTMLInputElement]'){
		var s_code=obj.value.toUpperCase();
	}else{
		var s_code=obj;
	}		
	var s_type="";
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
		}else if ( tmp == "onChange" ) {
				CODETYPE=str;
				var sub_str=str.substring(0,str.indexOf("_s"));
				s_type=sub_str;
				ajaxSendPost(dispCodeNameAjaxReq2, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
		}
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
		//Image Set 처리하는 과정에서 그리드 로딩 시간 증가 
		//sheetObj.SetCellImage(i, "spcl_rqst_desc_img", 0);   
		//sheetObj.SetCellImage(i, "acct_info_desc_img", 0);
		//sheetObj.SetCellImage(i, "rt_gds_desc_img", 0);
		//sheetObj.SetCellImage(i, "shpr_img", 0);
		//sheetObj.SetCellImage(i, "cnee_img", 0);
		//sheetObj.SetCellImage(i, "agt_img", 0);
		
		sheetObj.SetCellValue(i, 'shpr_addr',  sheetObj.GetCellValue(i,"shpr_addr").replace(/[:]/g,";").replace(/[']/g, "`").substring(0,105)  , 0);
		sheetObj.SetCellValue(i, 'cnee_addr',  sheetObj.GetCellValue(i,"cnee_addr").replace(/[:]/g,";").replace(/[']/g, "`").substring(0,105)  , 0);
		sheetObj.SetCellValue(i, 'agt_addr',   sheetObj.GetCellValue(i,"agt_addr").replace(/[:]/g,";").replace(/[']/g, "`").substring(0,105)  , 0);
		
		sheetObj.SetCellValue(i, 'shpr_nm',  sheetObj.GetCellValue(i,"shpr_nm").replace(/[:]/g,";").replace(/[']/g, "`").substring(0,60)  , 0);
		sheetObj.SetCellValue(i, 'cnee_nm',  sheetObj.GetCellValue(i,"cnee_nm").replace(/[:]/g,";").replace(/[']/g, "`").substring(0,60)  , 0);
		sheetObj.SetCellValue(i, 'agt_nm',   sheetObj.GetCellValue(i,"agt_nm").replace(/[:]/g,";").replace(/[']/g, "`").substring(0,60)  , 0);
		
		//charge amt == charge rate * charge wgt grid calculate
		sheetObj.SetCellValue(i, 'rt_chg_amt',   sheetObj.GetCellValue(i,"rt_val")*sheetObj.GetCellValue(i,"rt_chg_wgt") );
		
		sheetObj.SetCellFontColor(i,'org_bl_no',"#0000FF");  // Blue
		
		if( sheetObj.GetCellValue(i, "msg_sts_cd") == 'R' ){
			sheetObj.SetCellFontColor(i,'msg_sts_cd',"#FF0000");
		}

		sheetObj.SetCellValue(i, "ibflag", "R");
	}
}

function formatDataRow2(){
	var formObj = document.frm1;
	var sheetObj = docObjects[1];
	
	for(var i=2; i<=sheetObj.LastRow(); i++){
		//Image Set 처리하는 과정에서 그리드 로딩 시간 증가 
		//sheetObj.SetCellImage(i, "spcl_rqst_desc_img", 1);   
		//sheetObj.SetCellImage(i, "acct_info_desc_img", 1);
		//sheetObj.SetCellImage(i, "hawb_gds_desc_img", 1);
		//sheetObj.SetCellImage(i, "shpr_img", 1);
		//sheetObj.SetCellImage(i, "cnee_img", 1);
		
		sheetObj.SetCellValue(i, 'shpr_addr',  sheetObj.GetCellValue(i,"shpr_addr").replace(/[:]/g,";").replace(/[']/g, "`").substring(0,105)  , 0);
		sheetObj.SetCellValue(i, 'cnee_addr',  sheetObj.GetCellValue(i,"cnee_addr").replace(/[:]/g,";").replace(/[']/g, "`").substring(0,105)  , 0);
		
		sheetObj.SetCellValue(i, 'shpr_nm',  sheetObj.GetCellValue(i,"shpr_nm").replace(/[:]/g,";").replace(/[']/g, "`").substring(0,60)  , 0);
		sheetObj.SetCellValue(i, 'cnee_nm',  sheetObj.GetCellValue(i,"cnee_nm").replace(/[:]/g,";").replace(/[']/g, "`").substring(0,60)  , 0);
		
		sheetObj.SetCellFontColor(i,'org_bl_no',"#0000FF");     //BLUE
		if( sheetObj.GetCellValue(i, "msg_sts_cd") == 'R' ){
			sheetObj.SetCellFontColor(i,'msg_sts_cd',"#FF0000");//RED (REJECT)
		}
		
		sheetObj.SetCellValue(i, "ibflag", "R");
	}
}

var currTab;
function goTabSelect(isNumSep) {
	var formObj = document.frm1;
	var tabObjs=document.getElementsByName('tabLayer');
	if( isNumSep == "01" ) { //MAWB
		currTab=isNumSep;	//탭상태저장
		tabObjs[0].style.display='inline';
		tabObjs[1].style.display='none';
		
		formObj.btnSearch.style.display  = 'inline';
		formObj.btnSearch2.style.display = 'none';
		formObj.btnSave.disabled = false;
        formObj.btnSendEDI.disabled = false;    
        formObj.btnDelete.disabled  = false;
	}else if( isNumSep == "02" ) { //HAWB
		currTab=isNumSep;	//탭상태저장
		tabObjs[0].style.display='none';
		tabObjs[1].style.display="inline";
		//frm1.send_msg_txt.value='';
		doWork("SEARCHLIST02");

		formObj.btnSearch.style.display  = 'none' ;
		formObj.btnSearch2.style.display = 'inline';
		formObj.btnSave.disabled = true;
        formObj.btnSendEDI.disabled = true;    
        formObj.btnDelete.disabled  = true;       
	}
	
    var index = parseInt(isNumSep);
	var count = 0;
	$('.opus_design_tab').find("li").each(function(){
		if(count++ == index - 1){
			$(this).addClass('nowTab');
		}else{
			$(this).removeClass('nowTab');
		}
	});
}