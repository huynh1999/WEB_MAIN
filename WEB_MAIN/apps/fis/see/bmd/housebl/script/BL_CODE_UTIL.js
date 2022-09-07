//=========================================================
//*Copyright(c) 2009 CyberLogitec. All Rights Reserved.
//=========================================================
//=========================================================
//*@FileName   : SEE_BMD_0120.jsp
//*@FileTitle  : A.E.S 등록
//*@Description: A.E.S 등록 및 조회
//*@author     : PJK
//*@version    : 1.0 - 11/14/2011
//*@since      :
//
//*@Change history:
//*@author		: Tuan.Chau
//*@version		: 2.0 - 06/13/2014
//=========================================================
var rtnary=new Array(1);
var callBackFunc = "";
var blSameAsCneeYn = "Y";
var BL_SALES_MAN_DFLT = "A";
//OFVFOUR-7976: [MATRIX] ADDING CS PIC ON ALL B/L ENTRY AND TRADE PARTNER ENTRY SCREEN
var BL_CS_MAN_DFLT = "A";
var BL_SEA_USE_CS_MAN_DFLT_FLG = "Y";
var HBL_DOCNO_SYNC = "F";
var BL_PARTNER_ASSIGNMENT = "N";
var onKeyDownFlg = true;
var OIH_AN_CNTR_INFO = "CS";
var BL_SEA_USE_SALES_MAN_DFLT_FLG = "Y";
//OFVFOUR-7911 [AIF] MANAGING/ALERT CUSTOMER'S OUTSTANDING (OVERDUE)
var TP_OVER_AMT_FLG = ""; 
/**
 * 해운수출 
 */
function openPopUp(popName, curObj, valObj){
	cmmOpenPopUp(popName, curObj, "S", "O", valObj, "H");
}
function openSeeMasterPopUp(popName, curObj, valObj){
	cmmOpenPopUp(popName, curObj, "S", "O", valObj, "M");
}
function openSeeMasterPopUp(popName, curObj, valObj,cobFlag){
	cmmOpenPopUp(popName, curObj, "S", "O", valObj, "M",cobFlag);
}


/**
 * 해운 수입 팝업
 */
function openSeiPopUp(popName, curObj, valObj){
	cmmOpenPopUp(popName, curObj, "S", "I", valObj, "H");
}

function openSeiMasterPopUp(popName, curObj, valObj){
	cmmOpenPopUp(popName, curObj, "S", "I", valObj, "M");
}

/**
 * 항공수출
 */
function openAiePopUp(popName, curObj, valObj){
	cmmOpenPopUp(popName, curObj, "A", "O", valObj, "H");
}
function openAieMasterPopUp(popName, curObj, valObj){
	cmmOpenPopUp(popName, curObj, "A", "O", valObj, "M");
}

function openAiiPopUp(popName, curObj, valObj){
	cmmOpenPopUp(popName, curObj, "A", "I", valObj, "H");
}
function openAiiMasterPopUp(popName, curObj, valObj){
	cmmOpenPopUp(popName, curObj, "A", "I", valObj, "M");
}

var cur_curObj;
var cur_airSeaTp;
var cur_bndTp;
var cur_valObj;
var cur_bizTp;
var curObjId="";
function cmmOpenPopUp(popName, curObj, airSeaTp, bndTp, valObj, bizTp,cobFlag){	
	cur_curObj = curObj;
	cur_airSeaTp = airSeaTp;
	cur_bndTp = bndTp;
	cur_valObj = valObj;
	cur_bizTp = bizTp;
	var formObj=document.frm1;
	try {
		switch(popName) {
			case "CUSTBKG":
           		rtnary=new Array(1);
		   		rtnary[0]="1";
		   		rtnary[1]="";
		   		rtnary[2]=window;
		   		callBackFunc = "CUSTBKG_callBackFunc";
				modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
    	        
    	        break;
			case "PRINT":
           		if(formObj.intg_bl_seq.value == ""){
           			//
           			alert(getLabel('FMS_COM_ALT010'));
           		}else{
           			var reqParam='?intg_bl_seq='  +formObj.intg_bl_seq.value;
	         		reqParam += '&house_bl_no=' +formObj.f_bl_no.value;
	         		
	         		if(formObj.rider_lbl.style.color=="black"){
	         			reqParam += '&rider_flg=N';
	         		}else{
	         			reqParam += '&rider_flg=Y';
	         		}
	         		
	         		reqParam += '&agent_text=' + sea_body;
	         		//#1912 [PATENT]B/L 출력 AS AGENT FOR THE CARRIER 설정
	         		/*
	         		if(user_ofc_cnt_cd=="JP"){
	         		}else if(user_ofc_cnt_cd=="DE"){
	         			reqParam += " " + formObj.lnr_trdp_nm.value.replaceAll('&','%26');
	         		}else{
	         			reqParam += ", " + formObj.lnr_trdp_nm.value.replaceAll('&','%26');
	         		}
	         		*/
	         	    // #6897 [BNX] Adjust B/L (Zen#4238)
	         		if(sea_body.lastIndexOf('(END') != -1){
	         			reqParam = reqParam.substring(0,reqParam.lastIndexOf("(END)"));
	         		} else if(user_ofc_cnt_cd !="JP"){
	         				reqParam += " " + formObj.lnr_trdp_nm.value.replaceAll('&','%26');
	         		} 
	         		
	         		
	         		reqParam += '&mailTitle=' + 'House BL : ' + frm1.bl_no.value;
	         		var trdp_cd='';
	         		trdp_cd += '(' + '\'' + frm1.shpr_trdp_cd.value + '\'';
	         		trdp_cd += ',' + '\'' + frm1.prnr_trdp_cd.value + '\'' + ')';
					 
					ajaxSendPost(getMailTo, 'reqVal', '&goWhere=aj&bcKey=getMailTo&trdp_cd='+trdp_cd, './GateServlet.gsl');
	         		reqParam += '&mailTo=' + mailTo;
					if($("#shp_mod_cd").length) {
						var shpModCd = $("#shp_mod_cd option:selected").val();
						reqParam += '&shp_mod_cd=' + shpModCd;
					}
					//OFVFOUR-7452 [SOUTH EAST WORLD WIDE] CREATING HB/L PRINT FUNCTION IN OIH B/L ENTRY
					if(!(cur_airSeaTp == "S" && cur_bndTp =="I" && cur_bizTp =="H")){
					//#6301 [JAPT] Mail sending function related request(requirement 1)
					reqParam += '&lnr_bkg_no=' + frm1.lnr_bkg_no.value;
					reqParam += '&trnk_vsl_nm=' + frm1.trnk_vsl_nm.value;
					reqParam += '&trnk_voy=' + frm1.trnk_voy.value;
					var etdDtTm='';
					if(frm1.etd_dt_tm.value != ""){
						etdDtTm = frm1.etd_dt_tm.value.substring(6,10) + "." + frm1.etd_dt_tm.value.substring(0,2) + "." + frm1.etd_dt_tm.value.substring(3,5);
					}
					reqParam += '&etd_dt_tm=' + etdDtTm;
					}
					reqParam += '&airSeaTp=' + cur_airSeaTp;
					reqParam += '&bndTp=' + cur_bndTp;
					reqParam += '&bizTp=' + cur_bizTp;
	         		popGET('RPT_PRN_0020.clt'+reqParam, '', 440, 616, "scroll:yes;status:no;help:no;");
           		}
       	   break;
			case "B_CONFIRM":
           		if(formObj.intg_bl_seq.value == ""){
           			//
           			alert(getLabel('FMS_COM_ALT010'));
           		}else{
           			var reqParam='?intg_bl_seq='  +formObj.intg_bl_seq.value;
           			//reqParam += '&house_bl_no=' +formObj.f_bl_no.value;
           			//reqParam += '&v_ofc_eng_nm=' +formObj.v_ofc_eng_nm.value;
           			//reqParam += '&v_eml=' +formObj.v_eml.value;
           			reqParam += '&v_ofc_cd=' +formObj.u_ofc_cd.value;
	         		//reqParam += '&v_phn=' +formObj.v_phn.value;
	         		//reqParam += '&v_fax=' +formObj.v_fax.value;
	         		
	         		popGET('RPT_PRN_0240.clt'+reqParam, '', 780, 530, "scroll:yes;status:no;help:no;");
           		}
       	   break;
    	   case "PACKAGE_POPLIST":
    	  	 	rtnary=new Array(1);
		   		rtnary[0]="1";
		   		callBackFunc = "PACKAGE_POPLIST";
				modal_center_open('./CMM_POP_0120.clt', rtnary, 450,480,"yes");
    	        
    	   break;
    	   
    	   case "CNEE_POPLIST":
    		    var opt_key_sec = "BL_SAME_AS_CNEE01";
    		    ajaxSendPost(setBlSameAsCnee, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key_sec, "./GateServlet.gsl");
    		    
    		   	rtnary=new Array(2);
		   		rtnary[0]="1";
		   		/* jsjang 2013.8.6 #18801 trade partner 조회조건 변경 */
		   		var iata_val="";
		   		curObjId=curObj.id;
		   		var cstmTpCd='';
		   		if(typeof(valObj)!='undefined'){
		   			rtnary[1]=valObj;
		   		}else{
		   			rtnary[1]="";
		   		}
		   		rtnary[2]=window;
		   		callBackFunc = "CNEE_POPLIST";
				modal_center_open('./CMM_POP_0010.clt?callTp='+cstmTpCd+'&iata_cd='+iata_val, rtnary, 1150,650,"yes");
				
    	   break;
    		   
    	   case "LINER_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
    		    var opt_key_sec = "BL_SAME_AS_CNEE01";
   		        ajaxSendPost(setBlSameAsCnee, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key_sec, "./GateServlet.gsl");
    		   
		   		rtnary=new Array(2);
		   		rtnary[0]="1";
		   		/* jsjang 2013.8.6 #18801 trade partner 조회조건 변경 */
		   		var iata_val="";
		   		curObjId=curObj.id;
		   		//`alert(curObjId);
		   		var cstmTpCd='';
		   		//선사
		   		if(curObjId=='liner'){
		   			//alert(airSeaTp);
		   			if(airSeaTp=='A'){
		   				cstmTpCd='AC';		   				
		   			}else{
		   				cstmTpCd='LN';
		   			}
		   		//Shipper/Consignee인경우
		   		}else if(curObjId=='shipper'||curObjId=='consignee'){
		   			cstmTpCd='';
		   		// 파트너사
		   		}else if(curObjId=='partner'){
		   			cstmTpCd='';
		   		//콘솔사
		   		}else if(curObjId=='console'){
		   			cstmTpCd='PR';
		   		}else if(curObjId=='cust'){
		   			cstmTpCd='';
		   		}else if(curObjId=='carr'){
		   			//cstmTpCd = 'LN';
		   			cstmTpCd='';
		   		}else if(curObjId=='notify'){
		   			cstmTpCd='';
		   		}else if(curObjId=='ashipper'){
		   			cstmTpCd='';
		   		}else if(curObjId=='vndr'){
		   			cstmTpCd='';
		   		}else if(curObjId=='agent'){
		   			cstmTpCd='';
		   		}else if(curObjId=='partner2'){
		   			cstmTpCd='';
		   		}else if(curObjId=='rcv'){
		   			cstmTpCd='';
		   		}else if(curObjId=='pu'){
		   			cstmTpCd='';
		   		}else if(curObjId=='cgo_pu'){
		   			cstmTpCd='';
		   		}else if(curObjId=='cy' || curObjId=='cfs' || curObjId== 'frt_loc'){
		   			//alert(airSeaTp);
		   			if(airSeaTp=='A'){
		   				cstmTpCd='';		   				
		   			}
		   			//#3508 Multi Language 옵션인 경우 TRDP Popup 에서 Firm Check 제거
		   			if(MULTI_LANGUAGE != 'Y') {
		   				iata_val="Y" // jsjang 수정예정 , iata_cd 값 자체는 텍스트 데이타임.
		   			}
		   		}else if(curObjId=='door'){
		   			cstmTpCd='';
		   		}else if(curObjId=='third'){
		   			cstmTpCd='';
		   		}else if(curObjId=='frt_loc'){
		   			cstmTpCd='';
		   		}else if(curObjId=='forwarder'){
		   			cstmTpCd='';
		   		}
		   		// 2011.12.27 value parameter
		   		if(typeof(valObj)!='undefined'){
		   			rtnary[1]=valObj;
		   		}else{
		   			rtnary[1]="";
		   		}
		   		rtnary[2]=window;
		   		callBackFunc = "LINER_POPLIST";
				modal_center_open('./CMM_POP_0010.clt?callTp='+cstmTpCd+'&iata_cd='+iata_val, rtnary, 1150,650,"yes");
				
    	        break;
    	   case "LINER_POPLIST_BLANK"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
   		    var opt_key_sec = "BL_SAME_AS_CNEE01";
  		        ajaxSendPost(setBlSameAsCnee, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key_sec, "./GateServlet.gsl");
   		   
		   		rtnary=new Array(2);
		   		rtnary[0]="1";
		   		/* jsjang 2013.8.6 #18801 trade partner 조회조건 변경 */
		   		var iata_val="";
		   		curObjId=curObj.id;
		   		//`alert(curObjId);
		   		var cstmTpCd='';
		   		//선사
		   		if(curObjId=='liner'){
		   			//alert(airSeaTp);
		   			if(airSeaTp=='A'){
		   				cstmTpCd='AC';		   				
		   			}else{
		   				cstmTpCd='LN';
		   			}
		   		//Shipper/Consignee인경우
		   		}else if(curObjId=='shipper'||curObjId=='consignee'){
		   			cstmTpCd='';
		   		// 파트너사
		   		}else if(curObjId=='partner'){
		   			cstmTpCd='';
		   		//콘솔사
		   		}else if(curObjId=='console'){
		   			cstmTpCd='PR';
		   		}else if(curObjId=='cust'){
		   			cstmTpCd='';
		   		}else if(curObjId=='carr'){
		   			//cstmTpCd = 'LN';
		   			cstmTpCd='';
		   		}else if(curObjId=='notify'){
		   			cstmTpCd='';
		   		}else if(curObjId=='ashipper'){
		   			cstmTpCd='';
		   		}else if(curObjId=='vndr'){
		   			cstmTpCd='';
		   		}else if(curObjId=='agent'){
		   			cstmTpCd='';
		   		}else if(curObjId=='partner2'){
		   			cstmTpCd='';
		   		}else if(curObjId=='rcv'){
		   			cstmTpCd='';
		   		}else if(curObjId=='pu'){
		   			cstmTpCd='';
		   		}else if(curObjId=='cgo_pu'){
		   			cstmTpCd='';
		   		}else if(curObjId=='cy' || curObjId=='cfs' || curObjId== 'frt_loc'){
		   			//alert(airSeaTp);
		   			if(airSeaTp=='A'){
		   				cstmTpCd='';		   				
		   			}
		   			//#3508 Multi Language 옵션인 경우 TRDP Popup 에서 Firm Check 제거
		   			if(MULTI_LANGUAGE != 'Y') {
		   				iata_val="Y" // jsjang 수정예정 , iata_cd 값 자체는 텍스트 데이타임.
		   			}
		   		}else if(curObjId=='door'){
		   			cstmTpCd='';
		   		}else if(curObjId=='third'){
		   			cstmTpCd='';
		   		}else if(curObjId=='frt_loc'){
		   			cstmTpCd='';
		   		}
		   		rtnary[1]="";
		   		rtnary[2]=window;
		   		callBackFunc = "LINER_POPLIST";
				modal_center_open('./CMM_POP_0010.clt?callTp='+cstmTpCd+'&iata_cd='+iata_val, rtnary, 1150,650,"yes");
				
   	        break;
    	        
       	   case "LINER_POPLIST_MS"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
		   		rtnary=new Array(2);
		   		rtnary[0]="1";
		   		curObjId=curObj.id;
		   		var cstmTpCd='CS';
		   		//선사
		   		if(curObjId=='liner'){
		   			if(airSeaTp=='A'){
		   				cstmTpCd='AC';		   				
		   			}else{
		   				cstmTpCd='LN';
		   			}
		   		}
		   		// 2011.12.27 value parameter
		   		if(typeof(valObj)!='undefined'){
		   			rtnary[1]=valObj;
		   		}else{
		   			rtnary[1]="";
		   		}
		   		rtnary[2]=window;
		   		callBackFunc = "LINER_POPLIST_MS";
				modal_center_open('./CMM_POP_0010.clt?callTp='+cstmTpCd, rtnary, 1150,650,"yes");
	        
	        break;     
	        
	        
    	   case "LINER_POPLIST_M"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
		   		rtnary=new Array(2);
		   		rtnary[0]="1";
		   		curObjId=curObj.id;
		   		var cstmTpCd='CS';
		   		if(curObjId=='liner'){
		   			if(airSeaTp=='A'){
		   				cstmTpCd='AC';		   				
		   			}else{
		   				cstmTpCd='LN';
		   			}
		   		}
		   		//2011.12.27 value parameter
		   		if(typeof(valObj)!='undefined'){
		   			rtnary[1]=valObj;
		   		}else{
		   			rtnary[1]="";
		   		}
		   		rtnary[2]=window;
		   		callBackFunc = "LINER_POPLIST_M";
				modal_center_open('./CMM_POP_0010.clt?callTp='+cstmTpCd, rtnary, 1150,650,"yes");
				
			break;
    	   case "LINER_POPLIST_AIR_M"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
		   		rtnary=new Array(2);
		   		rtnary[0]="1";
		   		curObjId=curObj.id;
		   		var cstmTpCd='CS';
		   		if(curObjId=='liner'){
		   			if(airSeaTp=='A'){
		   				cstmTpCd='AC';		   				
		   			}else{
		   				cstmTpCd='LN';
		   			}
		   		}
		   		//2011.12.27 value parameter
		   		if(typeof(valObj)!='undefined'){
		   			rtnary[1]=valObj;
		   		}else{
		   			rtnary[1]="";
		   		}
		   		rtnary[2]=window;
		   		callBackFunc = "LINER_POPLIST_AIR_M";
				modal_center_open('./CMM_POP_0010.clt?callTp='+cstmTpCd, rtnary, 1150,650,"yes");
			break;
    	   case "LINER_POPLIST_IATA"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
		   		rtnary=new Array(2);
		   		rtnary[0]="1";
		   		curObjId=curObj.id;
		   		var cstmTpCd='CS';
		   		if(curObjId=='liner'){
		   			if(airSeaTp=='A'){
		   				cstmTpCd='AC';		   				
		   			}else{
		   				cstmTpCd='LN';
		   			}
		   		}
		   		//2011.12.27 value parameter
		   		if(typeof(valObj)!='undefined'){
		   			rtnary[1]=valObj;
		   		}else{
		   			rtnary[1]="";
		   		}
		   		rtnary[2]=window;
		   		callBackFunc = "LINER_POPLIST_IATA";
				modal_center_open('./CMM_POP_0010.clt?callTp='+cstmTpCd, rtnary, 1150,650,"yes");
			break;	
           case "PIC_POP":
		   		if(formObj.intg_bl_seq.value == ""){
		   			//House B/L 정보가 없습니다. House B/L 저장후 PIC정보를 등록할수 있습니다.
		   			alert(getLabel('FMS_COM_ALT015'));
		   			return;
		   		}else{
			   		rtnary=new Array(1);
			   		curObjId=curObj.id;
			   		rtnary[0]="";
			   		rtnary[2]=formObj.intg_bl_seq.value;
			   		if(curObjId == "shipper"){
			   			if(formObj.shpr_trdp_cd.value == ""){
				   			//shipper 정보가 없습니다. shipper정보를 선택후  PIC정보를 등록할수 있습니다.
			   				alert(getLabel('FMS_COM_ALT004') + " - " + getLabel('FMS_COD_SHIP'));
				   			//formObj.shpr_trdp_cd.focus();
				   			return;
				   		}
			   			rtnary[0]="S01";
			   			rtnary[1]=formObj.shpr_trdp_cd.value;
			   		}else if(curObjId == "consignee"){
			   			if(formObj.cnee_trdp_cd.value == ""){
				   			//consignee 정보가 없습니다. consignee정보를 선택후  PIC정보를 등록할수 있습니다.
			   				alert(getLabel('FMS_COM_ALT004') + " - " + getLabel('FMS_COD_CNEE'));
				   			//formObj.cnee_trdp_cd.focus();
				   			return;
				   		}
			   			rtnary[0]="C01";							
			   			rtnary[1]=formObj.cnee_trdp_cd.value;
			   		}else if(curObjId == "notify"){
			   			if(formObj.ntfy_trdp_cd.value == ""){
				   			//notify 정보가 없습니다. notify정보를 선택후  PIC정보를 등록할수 있습니다. 
			   				alert(getLabel('FMS_COM_ALT004') + " - " + getLabel('FMS_COD_NTFY'));
				   			//formObj.ntfy_trdp_cd.focus();
				   			return;
				   		}
			   			rtnary[0]="N01";
			   			rtnary[1]=formObj.ntfy_trdp_cd.value;
			   		}else if(curObjId == "ashipper"){
			   			if(formObj.act_shpr_trdp_cd.value == ""){
				   			//ashipper 정보가 없습니다. ashipper정보를 선택후  PIC정보를 등록할수 있습니다. 
			   				alert(getLabel('FMS_COM_ALT004') + " - " + getLabel('FMS_COD_ASHP'));
				   			//formObj.act_shpr_trdp_cd.focus();
				   			return;
				   		}
			   			rtnary[0]="S02";
			   			rtnary[1]=formObj.act_shpr_trdp_cd.value;
			   		}else if(curObjId == "liner"){
			   			if(formObj.lnr_trdp_cd.value == ""){
				   			//liner 정보가 없습니다. liner정보를 선택후  PIC정보를 등록할수 있습니다.
			   				alert(getLabel('FMS_COM_ALT004') + " - " + getLabel('FMS_COD_LINE'));
				   			//formObj.lnr_trdp_cd.focus();
				   			return;
				   		}
			   			rtnary[0]="L01";							
			   			rtnary[1]=formObj.lnr_trdp_cd.value;
			   		}else if(curObjId == "console"){
			   			if(formObj.agt_trdp_cd.value == ""){
				   			//alert("console 정보가 없습니다. console정보를 선택후  PIC정보를 등록할수 있습니다. ");
			   				alert(getLabel('FMS_COM_ALT004') + " - " + getLabel('FMS_COD_CONS'));
				   			//formObj.agt_trdp_cd.focus();
				   			return;
				   		}
			   			rtnary[0]="L02";							
			   			rtnary[1]=formObj.agt_trdp_cd.value;	
			   		}else if(curObjId == "partner"){
			   			if(formObj.prnr_trdp_cd.value == ""){
				   			//partner 정보가 없습니다. partner정보를 선택후  PIC정보를 등록할수 있습니다. 
			   				alert(getLabel('FMS_COM_ALT004') + " - " + getLabel('FMS_COD_TRPT'));
				   			//formObj.prnr_trdp_cd.focus();
				   			return;
				   		}
			   			rtnary[0]="P02";
			   			rtnary[1]=formObj.prnr_trdp_cd.value;
			   		}
			   		callBackFunc = "PIC_POP";
					modal_center_open('./SEE_BMD_0028.clt?trdp_cd='+rtnary[1], rtnary, 756,470,"yes");
		   		}
		   		break;
           case "COMMODITY_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
           		rtnary=new Array(1);
		   		rtnary[0]="1";
		   		rtnary[1]="";	//Commodity code
		   		rtnary[2]=curObj.value;	//Commodity name
		   		callBackFunc = "COMMODITY_POPLIST";
		   		/*20170118 #986에 의해 변경*/
				modal_center_open('./CMM_POP_0110.clt', rtnary, 756,483,"yes");
				//modal_center_open('./CMM_POP_0110.clt', rtnary, 556,483,"yes");
    	        
           break;
           case "LOCATION_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
           		rtnary=new Array(3);
		   		rtnary[0]=airSeaTp;
		   		rtnary[1]="BL";
		   		// 2011.12.27 value parameter
		   		if(typeof(valObj)!='undefined'){
		   			rtnary[2]=valObj;
		   		}else{
		   			rtnary[2]="";
		   		}
		   		rtnary[3]="";		   		
		   		//[ LHK 20130712 ]
		   		//Ocean POL, POD 항목의 Location 화면 Popup아이콘에 Type=L01 지정
		   		//Air 의 Departure, Trans1, Trans2, Trans3, Destination 항목의 Location 화면 Popup아이콘에 Type=L02 지정
		   		rtnary[4]=curObj;
		   		callBackFunc = "LOCATION_POPLIST";
				modal_center_open('./CMM_POP_0030.clt', rtnary, 806,440,"yes");
    	        
           break;
           case "LOCATION_POPLIST_BLANK"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
          		rtnary=new Array(3);
		   		rtnary[0]=airSeaTp;
		   		rtnary[1]="BL";
		   		// 2011.12.27 value parameter
//		   		if(typeof(valObj)!='undefined'){
//		   			rtnary[2]=valObj;
//		   		}else{
//		   			rtnary[2]="";
//		   		}
		   		rtnary[2]="";
		   		rtnary[3]="";		   		
		   		//[ LHK 20130712 ]
		   		//Ocean POL, POD 항목의 Location 화면 Popup아이콘에 Type=L01 지정
		   		//Air 의 Departure, Trans1, Trans2, Trans3, Destination 항목의 Location 화면 Popup아이콘에 Type=L02 지정
		   		rtnary[4]=curObj;
		   		callBackFunc = "LOCATION_POPLIST";
				modal_center_open('./CMM_POP_0030.clt', rtnary, 806,440,"yes");
   	        
          break;
           
	        case "NODECODE_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
           		rtnary=new Array(1);
		   		rtnary[0]="1";
	   			rtnary[1]="ND";//Node Code
		   		rtnary[2]="L04";//국가코드
		   		callBackFunc = "NODECODE_POPLIST";
				modal_center_open('./CMM_POP_0030.clt', rtnary, 806,480,"yes");
    	        
            break;
           case "USER_POPLIST"://사용자조회 openMean 1=화면에서 오픈, 2=그리드에서 오픈
           		rtnary=new Array(1);
		   		rtnary[0]="1";
		   		
		   		callBackFunc = "USER_POPLIST";
				modal_center_open('./CMM_POP_0060.clt', rtnary, 556,450,"yes");
           break;
           case "OPR_POPLIST"://담당자openMean 1=화면에서 오픈, 2=그리드에서 오픈
          		rtnary=new Array(1);
		   		rtnary[0]="1";
		   		callBackFunc = "OPR_POPLIST";
				modal_center_open('./CMM_POP_0060.clt', rtnary, 556,450,"yes");
          break;
           case "ISS_POPLIST"://Issued by 조회 openMean 1=화면에서 오픈, 2=그리드에서 오픈
         		rtnary=new Array(1);
		   		rtnary[0]="1";
		   		callBackFunc = "ISS_POPLIST";
				modal_center_open('./CMM_POP_0060.clt', rtnary, 556,450,"yes");
         break;
         
           case "ASGN_POPLIST"://Issued by 조회 openMean 1=화면에서 오픈, 2=그리드에서 오픈
        		rtnary=new Array(1);
		   		rtnary[0]="1";
		   		callBackFunc = "ASGN_POPLIST";
				modal_center_open('./CMM_POP_0060.clt', rtnary, 556,450,"yes");
        break;         
         
         
         
           case "VESSEL_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
           		rtnary=new Array(2);
		   		rtnary[0]="1";
		   		// 2011.12.27 value parameter
		   		if(typeof(valObj)!='undefined'){
		   			rtnary[1]=valObj;
		   		}else{
		   			rtnary[1]="";
		   		}
		   		callBackFunc = "VESSEL_POPLIST";
				modal_center_open('./CMM_POP_0140.clt', rtnary, 656,470,"yes");
				
           break;
           case "VESSEL_POPLIST_BLANK"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
          		rtnary=new Array(2);
		   		rtnary[0]="1";
	   			rtnary[1]="";
		   		callBackFunc = "VESSEL_POPLIST";
				modal_center_open('./CMM_POP_0140.clt', rtnary, 656,470,"yes");
				
           break;
           case "OFFICE_GRID_POPLIST"://통화코드 openMean 1=화면에서 오픈, 2=그리드에서 오픈
           		rtnary=new Array(2);
		   		rtnary[0]="1";
//		   		rtnary[1] = "111";
    	        callBackFunc = "OFFICE_GRID_POPLIST";
				modal_center_open('./CMM_POP_0150.clt', rtnary, 556,600,"yes");
           break;
           case "BKNO_POPLIST"://openMean S=해운에서 오픈, A=항공에서 오픈
          		rtnary=new Array(1);
          		rtnary[0] = formObj.f_bkg_no.value;
	   			rtnary[1] = '';
	   			callBackFunc = "BKNO_POPLIST";
				modal_center_open('./CMM_POP_0210.clt', rtnary, 815,480,"yes");
			break;

			
           case "BKNO_POPLIST_BLANK"://openMean S=해운에서 오픈, A=항공에서 오픈
         		rtnary=new Array(1);
         		rtnary[0] = "";
	   			rtnary[1] = '';
	   			callBackFunc = "BKNO_POPLIST";
				modal_center_open('./CMM_POP_0210.clt', rtnary, 815,480,"yes");
			break;  
           case "LNRBKNO_POPLIST"://openMean S=해운에서 오픈, A=항공에서 오픈
         		rtnary=new Array(1);
         		rtnary[0] = formObj.f_lnr_bkg_no.value;
	   			rtnary[1] = '';
	   			callBackFunc = "LNRBKNO_POPLIST";
				modal_center_open('./CMM_POP_0280.clt', rtnary, 815,480,"yes");
			break;
          case "LNRBKNO_POPLIST_BLANK"://openMean S=해운에서 오픈, A=항공에서 오픈
        		rtnary=new Array(1);
        		rtnary[0] = "";
	   			rtnary[1] = '';
	   			callBackFunc = "LNRBKNO_POPLIST";
				modal_center_open('./CMM_POP_0280.clt', rtnary, 815,480,"yes");
			break;  
            case "HBL_POPLIST"://  openMean S=해운에서 오픈, A=항공에서 오픈
          		rtnary=new Array(1);
	   			rtnary[0]=airSeaTp;
	   			rtnary[1]=bndTp;
	   			callBackFunc = "HBL_POPLIST";
				modal_center_open('./CMM_POP_0170.clt', rtnary, 818,468,"yes");
			break;
            case "MBL_POPLIST"://openMean S=해운에서 오픈, A=항공에서 오픈
          		rtnary=new Array(1);
	   			rtnary[0]=airSeaTp;
	   			rtnary[1]=bndTp;
	   			if(curObj.type != "button"){
	   				rtnary[2]=formObj.f_bl_no.value;	   				
	   			}else{
	   				rtnary[2]='';
	   			}
	   			rtnary[3]='';
	   			
	   			callBackFunc = "MBL_POPLIST";
				modal_center_open('./CMM_POP_0180.clt', rtnary, 818,500,"yes");
   	        	
			break;
            case "MBL_POPLIST_BLANK"://openMean S=해운에서 오픈, A=항공에서 오픈
          		rtnary=new Array(1);
	   			rtnary[0]=airSeaTp;
	   			rtnary[1]=bndTp;
//	   			rtnary[2]=formObj.f_bl_no.value;
	   			rtnary[2]="";
	   			rtnary[3]='';
	   			
	   			callBackFunc = "MBL_POPLIST";
				modal_center_open('./CMM_POP_0180.clt', rtnary, 818,500,"yes");
   	        	
			break;
			
			case "SR_POPLIST"://openMean S=해운에서 오픈, A=항공에서 오픈
          		rtnary=new Array(1);
	   			rtnary[0]=airSeaTp;
	   			rtnary[1]=bndTp;
	   			callBackFunc = "SR_POPLIST";
				modal_center_open('./CMM_POP_0190.clt', rtnary, 818,480,"yes");
   	        	
			break;
			case "WORKFLOW_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
				rtnary=new Array(1);
				rtnary[0]="1";
				rtnary[1]=airSeaTp+bndTp;
				
				callBackFunc = "WORKFLOW_POPLIST";
				modal_center_open('./CMM_POP_0100.clt', rtnary, 610,460,"yes");				
			break;
			case "STATE_POPLIST"://통화코드 openMean 1=화면에서 오픈, 2=그리드에서 오픈
				rtnary=new Array(2);
		   		rtnary[0]="1";
		   		
		   		if(typeof(formObj.pol_cnt_cd) != "undefined"){
		   			rtnary[1]=formObj.pol_cnt_cd.value;
		   		}else{
		   			rtnary[1]="";
		   		}
		   		callBackFunc = "STATE_POPLIST";
				modal_center_open('./CMM_POP_0310.clt', rtnary, 610,400,"yes");
			break;
			case "REF_POPLIST"://openMean S=해운에서 오픈, A=항공에서 오픈
          		rtnary=new Array(3);
	   			rtnary[0]=airSeaTp;
	   			rtnary[1]=bndTp;
	   			rtnary[2]='';
	   			rtnary[3]=formObj.f_ref_no.value;
	   			callBackFunc = "REF_POPLIST";
				modal_center_open('./CMM_POP_0180.clt', rtnary, 818,500,"yes");
				
			break;
			case "REF_POPLIST_BLANK"://openMean S=해운에서 오픈, A=항공에서 오픈
          		rtnary=new Array(3);
	   			rtnary[0]=airSeaTp;
	   			rtnary[1]=bndTp;
	   			rtnary[2]='';
//	   			rtnary[3]=formObj.f_ref_no.value;
	   			rtnary[3]="";
	   			callBackFunc = "REF_POPLIST";
				modal_center_open('./CMM_POP_0180.clt', rtnary, 818,500,"yes");
				
			break;
			
			case "AES_HBL_POPLIST"://  openMean S=해운에서 오픈, A=항공에서 오픈
      			rtnary=new Array(1);
	   			rtnary[0]=airSeaTp;
	   			rtnary[1]=bndTp;
	   			callBackFunc = "AES_HBL_POPLIST";
				modal_center_open('./CMM_POP_0170.clt', rtnary, 818,476,"yes");
				
			break;
			
			case "COPY_CONFIRM_POPUP"://BL_COPY  
				rtnary=new Array(1);
				callBackFunc = "COPY_CONFIRM_POPUP";
				modal_center_open('./CMM_POP_0330.clt', rtnary, 260,200,"no");	
			break;
			case "COPY_CONFIRM_POPUP_1"://BL_COPY  
				rtnary=new Array(1);
				rtnary[0]= "AIE_BMD_0040";
				callBackFunc = "COPY_CONFIRM_POPUP";
				modal_center_open('./CMM_POP_0330.clt', rtnary, 480,230,"no");				
			break;
			/*
			case "COPY_CONFIRM_POPUP_2"://BL_COPY  Vinh.Vo - 04/09/2015 - Modified 		
				rtnary=new Array(1);
				rtnary[0]= "SEE_BMD_0020";  
				callBackFunc = "COPY_CONFIRM_POPUP";
				modal_center_open('./CMM_POP_0330.clt', rtnary, 480,230,"no");		
			break;
			*/
			case "COPY_CONFIRM_POPUP_2"://#1374 [IMPEX][독일]OIH BL Copy 시 Option 추가 요청
				rtnary=new Array(1);
				rtnary[0]= "ABL";  
				callBackFunc = "COPY_CONFIRM_POPUP";
				modal_center_open('./CMM_POP_0330.clt', rtnary, 480,230,"no");		
			break;			
			case "COPY_CONFIRM_POPUP_3": //#1741 [PATENT]HBL Copy 옵션에 Filing No 복사여부 추가
				rtnary=new Array(1);
				rtnary[0]= "HBL";
				callBackFunc = "COPY_CONFIRM_POPUP";
				modal_center_open('./CMM_POP_0330.clt', rtnary, 480,230,"no");		
			break;
			case "COPY_CONFIRM_POPUP_31": //#1374 [IMPEX][독일]OIH BL Copy 시 Option 추가 요청
				rtnary=new Array(1);
				rtnary[0]= "HBL1";
				callBackFunc = "COPY_CONFIRM_POPUP";
				modal_center_open('./CMM_POP_0330.clt', rtnary, 480,230,"no");		
			break;			
			case "COPY_CONFIRM_POPUP_4"://#1374 [IMPEX][독일]OIH BL Copy 시 Option 추가 요청
				rtnary=new Array(1);
				rtnary[0]= "OBL";
				callBackFunc = "COPY_CONFIRM_POPUP";
				modal_center_open('./CMM_POP_0330.clt', rtnary, 480,230,"no");		
			break;	
			case "COUNTRY_POPLIST"://openMean 1=화면에서 오픈, 2=그리드에서 오픈
		       	rtnary=new Array(1);
				rtnary[0]="1";
				rtnary[1]="";//대륙코드
				callBackFunc = "COUNTRY_POPLIST";
	  	        modal_center_open('./CMM_POP_0020.clt', rtnary, 560,450,"yes");
	  	    break;
			case "STATE_POPLIST"://통화코드 openMean 1=화면에서 오픈, 2=그리드에서 오픈
				rtnary=new Array(2);
		   		rtnary[0]="1";
		   		rtnary[1]="";
		   		callBackFunc = "STATE_POPLIST";
	  	        modal_center_open('./CMM_POP_0310.clt', rtnary, 610,450,"yes");
	  	    break;
      } // end switch
	}catch(e) {
        if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	alert(getLabel('FMS_COM_ERR002'));
        } 
        else{
        	//System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001') + " - " + e );
        }
	}

}
function srOpenPopUp(popName, curObj){
	var formObj=document.frm1;
	try {		
		switch(popName) {
            case "MBL_POPLIST"://openMean S=해운에서 오픈, A=항공에서 오픈
          		rtnary=new Array(1);
	   			rtnary[0]='S';
	   			rtnary[1]='O';
	   			rtnary[2]=formObj.f_bl_no.value;
	   			rtnary[3]='';
	   			callBackFunc = "srOpenPopUp_MBL_POPLIST";
				modal_center_open('./CMM_POP_0180.clt', rtnary, 818,500,"yes");
				
			break;
            case "MBL_POPLIST_BLANK"://openMean S=해운에서 오픈, A=항공에서 오픈
          		rtnary=new Array(1);
	   			rtnary[0]='S';
	   			rtnary[1]='O';
//	   			rtnary[2]=formObj.f_bl_no.value;
	   			rtnary[2]="";
	   			rtnary[3]='';
	   			callBackFunc = "srOpenPopUp_MBL_POPLIST";
				modal_center_open('./CMM_POP_0180.clt', rtnary, 818,500,"yes");
				
			break;
			
			case "SR_POPLIST"://openMean S=해운에서 오픈, A=항공에서 오픈
          		rtnary=new Array(1);
	   			rtnary[0]='S';
	   			rtnary[1]='O';
	   			
	   			callBackFunc = "srOpenPopUp_SR_POPLIST";
				modal_center_open('./CMM_POP_0190.clt', rtnary, 818,480,"yes");
   	        	
			break;
			case "REF_POPLIST"://openMean S=해운에서 오픈, A=항공에서 오픈
          		rtnary=new Array(1);
	   			rtnary[0]='S';
	   			rtnary[1]='O';
	   			rtnary[2]='';
	   			rtnary[3]=formObj.f_ref_no.value;
	   			
	   			callBackFunc = "srOpenPopUp_REF_POPLIST";
				modal_center_open('./CMM_POP_0180.clt', rtnary, 818,500,"yes");
			break;
			case "REF_POPLIST_BLANK"://openMean S=해운에서 오픈, A=항공에서 오픈
          		rtnary=new Array(1);
	   			rtnary[0]='S';
	   			rtnary[1]='O';
	   			rtnary[2]='';
//	   			rtnary[3]=formObj.f_ref_no.value;
	   			rtnary[3]="";
	   			
	   			callBackFunc = "srOpenPopUp_REF_POPLIST";
				modal_center_open('./CMM_POP_0180.clt', rtnary, 818,500,"yes");
			break;
			case "REF_POPLIST1"://openMean S=해운에서 오픈, A=항공에서 오픈
          		rtnary=new Array(1);
	   			rtnary[0]='S';
	   			rtnary[1]='O';
	   			rtnary[2]='';
	   			rtnary[3]=formObj.ref_no.value;
	   			
	   			callBackFunc = "srOpenPopUp_REF_POPLIST1";
				modal_center_open('./CMM_POP_0180.clt', rtnary, 818,500,"yes");
				
			break;
			case "REF_POPLIST1_BLANK"://openMean S=해운에서 오픈, A=항공에서 오픈
          		rtnary=new Array(1);
	   			rtnary[0]='S';
	   			rtnary[1]='O';
	   			rtnary[2]='';
//	   			rtnary[3]=formObj.ref_no.value;
	   			rtnary[3]="";
	   			
	   			// #4781 [Binex LA] After searching Filing No., Mark&desc didnt show the info
	   			// OEH에서 밖에 안쓰기 때문에 OEH화면에 있는 checkRefNo 함수를 사용하도록함.
	   			callBackFunc = "srOpenPopUp_REF_POPLIST3";
	   			//callBackFunc = "srOpenPopUp_REF_POPLIST1";
				modal_center_open('./CMM_POP_0180.clt', rtnary, 818,500,"yes");
				
			break;
			
			case "REF_POPLIST2"://openMean S=해운에서 오픈, A=항공에서 오픈
          		rtnary=new Array(1);
	   			rtnary[0]='S';
	   			rtnary[1]='I';
	   			rtnary[2]='';
	   			rtnary[3]=formObj.ref_no.value;
	   			callBackFunc = "srOpenPopUp_REF_POPLIST2";
				modal_center_open('./CMM_POP_0180.clt', rtnary, 818,500,"yes");
   	        	
			break;
			
			case "REF_POPLIST2_BLANK"://openMean S=해운에서 오픈, A=항공에서 오픈
          		rtnary=new Array(1);
	   			rtnary[0]='S';
	   			rtnary[1]='I';
	   			rtnary[2]='';
//	   			rtnary[3]=formObj.ref_no.value;
	   			rtnary[3]='';
	   			callBackFunc = "srOpenPopUp_REF_POPLIST2";
				modal_center_open('./CMM_POP_0180.clt', rtnary, 818,500,"yes");
   	        	
			break;
			
			case "BKNO_POPLIST":
				rtnary=new Array(1);
	   			rtnary[0]=formObj.bkg_no.value;
	   			rtnary[1]='Y';
	   			callBackFunc = "srOpenPopUp_BKNO_POPLIST";
	   			modal_center_open('./CMM_POP_0210.clt', rtnary, 818,500,"yes");
	   			
			break;

			case "BKNO_POPLIST_BLANK":
				rtnary=new Array(1);
//	   			rtnary[0]=formObj.bkg_no.value;
				rtnary[0]="";
	   			rtnary[1]='Y';
	   			callBackFunc = "srOpenPopUp_BKNO_POPLIST";
	   			modal_center_open('./CMM_POP_0210.clt', rtnary, 818,500,"yes");
	   			
			break;
			
			case "LNRBKNO_POPLIST":
				rtnary=new Array(1);
	   			rtnary[0]=formObj.lnr_bkg_no.value;
	   			rtnary[1]='Y';
	   			callBackFunc = "srOpenPopUp_LNRBKNO_POPLIST";
	   			modal_center_open('./CMM_POP_0280.clt', rtnary, 818,500,"yes");
	   			
			break;

			case "LNRBKNO_POPLIST_BLANK":
				rtnary=new Array(1);
				rtnary[0]="";
	   			rtnary[1]='Y';
	   			//rtnary[2]= curObj.id;
	   			callBackFunc = "srOpenPopUp_LNRBKNO_POPLIST";
	   			modal_center_open('./CMM_POP_0280.clt?mblpage='+curObj.id, rtnary, 818,500,"yes");
	   			
			break;
			
			case "CREATE_MBL_POPLIST_OEH": //create MBL from HBL Anh.Nguyen 2015/05/11 - Modification
				rtnary=new Array(51);
				rtnary[0] =formObj.lnr_trdp_cd.value;
				rtnary[1] =formObj.lnr_trdp_nm.value;
				rtnary[2] =formObj.eta_dt_tm.value;
				rtnary[3] =formObj.etd_dt_tm.value;
				rtnary[4] =formObj.shp_mod_cd.value;
				rtnary[5] =formObj.por_cd.value;				
				rtnary[6] =formObj.etd_por_tm.value;
				rtnary[7] =formObj.trnk_vsl_nm.value;
				rtnary[8] =formObj.trnk_voy.value;
				rtnary[9] =formObj.shpr_trdp_nm.value;
				rtnary[10]=formObj.cnee_trdp_nm.value;
				rtnary[11]=formObj.ntfy_trdp_nm.value;
				rtnary[12]=formObj.del_cd.value;
				rtnary[13]=formObj.del_nm.value;
				rtnary[14]=formObj.fnl_dest_loc_cd.value;
				rtnary[15]=formObj.ctrb_ofc_cd.value;
				rtnary[16]=formObj.ctrb_dept_cd.value;
				rtnary[17]=formObj.ctrb_mgn.value;
				rtnary[18]=formObj.ctrb_ratio_yn.value;
				rtnary[19]=formObj.hbl_tp_cd.value;
				rtnary[20]=formObj.lnr_bkg_no.value;
				rtnary[21]=formObj.mrn_no.value;
				rtnary[22]=formObj.cntr_info.value;				
				rtnary[23]=formObj.trnk_vsl_cd.value;
				rtnary[24] = formObj.shp_mod_cd.value;
				rtnary[25] = formObj.pol_cd.value;
				rtnary[26] = formObj.pol_nm.value;
				rtnary[27] = formObj.pod_cd.value;
				rtnary[28] = formObj.pod_nm.value;
				rtnary[29] = formObj.shpr_trdp_addr.value;
				rtnary[30] = formObj.cnee_trdp_addr.value;
				rtnary[31] = formObj.ntfy_trdp_addr.value;
				rtnary[32] = formObj.fnl_dest_loc_nm.value;		
				rtnary[33] = formObj.por_nm.value;		
				rtnary[34] = formObj.post_dt.value;
				
				rtnary[35] = formObj.mrn_no.value;
				rtnary[36] = formObj.rep_cmdt_cd.value;
				rtnary[37] = formObj.rep_cmdt_nm.value;
				rtnary[38] = formObj.pck_qty.value;
				rtnary[39] = formObj.pck_ut_cd.value;
				rtnary[40] = formObj.grs_wgt.value;
				rtnary[41] = formObj.grs_wgt1.value;
				rtnary[42] = formObj.meas.value;
				rtnary[43] = formObj.meas1.value;
				rtnary[44] = formObj.desc_txt.value;
				rtnary[45] = formObj.sad_txt.value;
				rtnary[46] = formObj.mk_txt.value;
				rtnary[47] = formObj.mk_grs_wgt.value;
				rtnary[48] = formObj.mk_grs_wgt1.value;
				rtnary[49] = formObj.mk_meas.value;
				rtnary[50] = formObj.mk_meas1.value;
				
				callBackFunc = "srOpenPopUp_CREATE_MBL_POPLIST_OEH";
	   			modal_center_open('./CMM_POP_0450.clt', rtnary, 860,300,"yes");
	   		break;
			case "CREATE_MBL_POPLIST_OIH":
				rtnary=new Array(29);
				rtnary[0]=formObj.lnr_trdp_cd.value;
				rtnary[1]=formObj.lnr_trdp_nm.value;
				rtnary[2]=formObj.eta_dt_tm.value;
				rtnary[3]=formObj.shp_mod_cd.value;	
				rtnary[4]=formObj.hbl_tp_cd.value; 
				rtnary[5]=formObj.shpr_trdp_nm.value; 
				rtnary[6]=formObj.cnee_trdp_nm.value; 
				rtnary[7]=formObj.ntfy_trdp_nm.value; 
				rtnary[8]=formObj.ctrb_ofc_cd.value; 
				rtnary[9]=formObj.ctrb_ratio_yn.value; 
				rtnary[10]=formObj.ctrb_mgn.value; 
				rtnary[11]=formObj.trnk_vsl_cd.value; 
				rtnary[12]=formObj.trnk_vsl_nm.value; 
				rtnary[13]=formObj.f_eta_dt_tm.value; 
				rtnary[14]=formObj.por_cd.value;
				rtnary[15]=formObj.del_cd.value;
				rtnary[16]=formObj.cfs_trdp_cd.value;
				rtnary[17]=formObj.etd_dt_tm.value;
				rtnary[18]=formObj.shp_mod_cd.value; 
				rtnary[19]=formObj.pol_cd.value; 	 
				rtnary[20]=formObj.pol_nm.value; 
				rtnary[21]=formObj.pod_cd.value; 
				rtnary[22]=formObj.pod_nm.value; 
				rtnary[23]=formObj.por_nm.value;	
				rtnary[24]=formObj.del_nm.value;	
				rtnary[25]=formObj.shpr_trdp_addr.value;	
				rtnary[26]=formObj.cnee_trdp_addr.value;	
				rtnary[27]=formObj.ntfy_trdp_addr.value;	
				rtnary[28]=formObj.trnk_voy.value;					
				rtnary[29]=formObj.post_dt.value;				
				callBackFunc = "srOpenPopUp_CREATE_MBL_POPLIST_OIH";
	   			modal_center_open('./CMM_POP_0451.clt', rtnary, 860,430,"yes");
			break;	
			case "CREATE_MBL_POPLIST_AEH":
				rtnary=new Array(40);
				rtnary[0]=formObj.etd_dt_tm.value;
				rtnary[1]=formObj.pol_cd.value;
				rtnary[2]=formObj.pol_nm.value;
				rtnary[3]=formObj.pod_cd.value;	
				rtnary[4]=formObj.pod_nm.value;		
				rtnary[5]=formObj.etd_tm.value;
				rtnary[6]=formObj.hbl_tp_cd.value;
				rtnary[7]=formObj.shpr_trdp_nm.value;
				rtnary[8]=formObj.shpr_trdp_addr.value;
				rtnary[9]=formObj.cnee_trdp_nm.value;
				rtnary[10]=formObj.cnee_trdp_addr.value;
				rtnary[11]=formObj.ntfy_trdp_nm.value;
				rtnary[12]=formObj.ntfy_trdp_addr.value;
				rtnary[13]=formObj.prnr_trdp_cd2.value;
				rtnary[14]=formObj.prnr_trdp_nm2.value;
				rtnary[15]=formObj.ctrb_ofc_cd.value;
				rtnary[16]=formObj.ctrb_mgn.value;
				rtnary[17]=formObj.ctrb_ratio_yn.value;
				rtnary[18]=formObj.ctrb_dept_cd.value;
				rtnary[19]=formObj.lnr_trdp_cd.value;
				rtnary[20]=formObj.lnr_trdp_nm.value;
				rtnary[21]=formObj.flt_no.value;
				rtnary[22]=formObj.eta_dt_tm.value;
				rtnary[23]=formObj.eta_tm.value;
				rtnary[24]=formObj.iss_trdp_cd.value;
				rtnary[25]=formObj.iss_trdp_nm.value;
				rtnary[26]=formObj.fst_to_cd.value;
				rtnary[27]=formObj.fst_to_nm.value;
				rtnary[28]=formObj.ts1_port_cd.value;
				rtnary[29]=formObj.ts1_flt_no.value;
				rtnary[30]=formObj.ts2_port_cd.value;
				rtnary[31]=formObj.ts2_flt_no.value;
				rtnary[32]=formObj.ts3_port_cd.value;
				rtnary[33]=formObj.ts3_flt_no.value;
				rtnary[34]=formObj.cargo_tp_cd.value;
				rtnary[35]=formObj.rt_clss_cd.value;
				rtnary[36]=formObj.post_dt.value;
				rtnary[37]=formObj.frt_term_cd.value;
				rtnary[38]=formObj.ctrb_mgn.value;
				rtnary[39]=formObj.otr_chg_term_cd.value;
				callBackFunc = "srOpenPopUp_CREATE_MBL_POPLIST_AEH";
	   			modal_center_open('./CMM_POP_0452.clt', rtnary, 860,300,"yes");
			break;
			case "CREATE_MBL_POPLIST_AIH":
				rtnary=new Array(34);
				rtnary[0]=formObj.lnr_trdp_cd.value;
				rtnary[1]=formObj.lnr_trdp_nm.value;
				rtnary[2]=formObj.eta_dt_tm.value;
				rtnary[3]=formObj.eta_tm.value;	
				rtnary[4]=formObj.pol_cd.value;		
				rtnary[5]=formObj.pol_nm.value;
				rtnary[6]=formObj.pod_cd.value;
				rtnary[7]=formObj.pod_nm.value;
				rtnary[8]=formObj.bl_sts_cd.value;	
				rtnary[9]=formObj.etd_tm.value;
				rtnary[10]=formObj.hbl_tp_cd.value;
				rtnary[11]=formObj.shpr_trdp_nm.value;
				rtnary[12]=formObj.shpr_trdp_addr.value;
				rtnary[13]=formObj.cnee_trdp_nm.value;
				rtnary[14]=formObj.cnee_trdp_addr.value;
				rtnary[15]=formObj.ctrb_ofc_cd.value;
				rtnary[16]=formObj.ctrb_mgn.value;
				rtnary[17]=formObj.ctrb_ratio_yn.value;
				rtnary[18]=formObj.ctrb_dept_cd.value;
				rtnary[19]=formObj.lnr_trdp_cd.value;
				rtnary[20]=formObj.lnr_trdp_nm.value;
				rtnary[21]=formObj.flt_no.value;
				rtnary[22]=formObj.ts1_port_cd.value;
				rtnary[23]=formObj.ts1_flt_no.value;
				rtnary[24]=formObj.ts2_port_cd.value;
				rtnary[25]=formObj.ts2_flt_no.value;
				rtnary[26]=formObj.ts3_port_cd.value;
				rtnary[27]=formObj.ts3_flt_no.value;
				rtnary[28]=formObj.cfs_trdp_cd.value;
				rtnary[29]=formObj.cfs_trdp_nm.value;
				rtnary[30]=formObj.sto_start_dt.value;
				rtnary[31]=formObj.etd_dt_tm.value;				
				rtnary[32]=formObj.post_dt.value;		
				rtnary[33]=formObj.f_eta_dt_tm.value;
				rtnary[34]=formObj.curr_cd.value;
				callBackFunc = "srOpenPopUp_CREATE_MBL_POPLIST_AIH";
	   			modal_center_open('./CMM_POP_0453.clt', rtnary, 860,400,"yes");
			break;
			
			case "CONSOL_POPLIST":
        		rtnary=new Array(1);
        		rtnary[0] = "";
	   			rtnary[1] = '';
	   			callBackFunc = "CONSOL_POPLIST";
				modal_center_open('./CMM_POP_0440.clt', rtnary, 815,480,"yes");
			break; 
			
		}
	}catch(e) {
        if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	alert(getLabel('FMS_COM_ERR002'));
        } 
        else{
        	//System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001') + " - " + e );
        }
	}
}
function srAirOpenPopUp(popName, curObj, seaair, bnd){
	var formObj=document.frm1;
	try {
		switch(popName) {
		case "REF_POPLIST"://openMean S=해운에서 오픈, A=항공에서 오픈
			rtnary=new Array(3);
			rtnary[0]=seaair;
			rtnary[1]=bnd;
   			rtnary[2]='';
   			rtnary[3]=formObj.ref_no.value;
   			callBackFunc = "srAirOpenPopUp_REF_POPLIST";
			modal_center_open('./CMM_POP_0180.clt', rtnary, 818,500,"yes");
			
			break;
			
		case "REF_POPLIST_BLANK"://openMean S=해운에서 오픈, A=항공에서 오픈
			rtnary=new Array(3);
			rtnary[0]=seaair;
			rtnary[1]=bnd;
   			rtnary[2]='';
//   			rtnary[3]=formObj.ref_no.value;
   			rtnary[3]='';
   			callBackFunc = "srAirOpenPopUp_REF_POPLIST";
			modal_center_open('./CMM_POP_0180.clt', rtnary, 818,500,"yes");
			
			break;
		case "REF_POPLIST1"://openMean S=해운에서 오픈, A=항공에서 오픈
			rtnary=new Array(3);
			rtnary[0]=seaair;
			rtnary[1]=bnd;
   			rtnary[2]='';
   			rtnary[3]=formObj.ref_no.value;
   			callBackFunc = "srAirOpenPopUp_REF_POPLIST1";
			modal_center_open('./CMM_POP_0180.clt', rtnary, 818,500,"yes");
			
			break;
		case "REF_POPLIST2"://openMean S=해운에서 오픈, A=항공에서 오픈	
      		rtnary=new Array(3);
   			rtnary[0]=seaair;
   			rtnary[1]=bnd;
   			rtnary[2]='';
   			if(curObj.type != "button"){
   				rtnary[3]=formObj.f_ref_no.value;   				
   			}else{
   				rtnary[3]="";
   			}
   			
   			callBackFunc = "srAirOpenPopUp_REF_POPLIST2";
			modal_center_open('./CMM_POP_0180.clt', rtnary, 818,500,"yes");
		break;
		case "REF_POPLIST3"://openMean S=해운에서 오픈, A=항공에서 오픈
			rtnary=new Array(3);
			rtnary[0]=seaair;
			rtnary[1]=bnd;
   			rtnary[2]='';
   			rtnary[3]=formObj.ref_no.value;
   			callBackFunc = "srAirOpenPopUp_REF_POPLIST3";
			modal_center_open('./CMM_POP_0180.clt', rtnary, 818,500,"yes");
			
			break;
		case "REF_POPLIST3_BLANK"://openMean S=해운에서 오픈, A=항공에서 오픈
			rtnary=new Array(3);
			rtnary[0]=seaair;
			rtnary[1]=bnd;
   			rtnary[2]='';
//   			rtnary[3]=formObj.ref_no.value;
   			rtnary[3]='';
   			callBackFunc = "srAirOpenPopUp_REF_POPLIST3";
			modal_center_open('./CMM_POP_0180.clt', rtnary, 818,500,"yes");
			
			break;
		}
	}catch(e) {
        if(e == "[object Error]"){
        	//Unexpected Error occurred. Please contact Help Desk!
        	alert(getLabel('FMS_COM_ERR002'));
        } 
        else{
        	//System Error! + MSG
        	alert(getLabel('FMS_COM_ERR001') + " - " + e );
        }
	}
}
var CODETYPE="";
/**
 * code name select
 */
function codeNameAction(str, obj, tmp){
		codeNameAction(str, obj, tmp, null);
}
/**
 * code name select
 */
function codeNameAction(str, obj, tmp, air_sea_clss_cd){
	codeNameAction(str, obj, tmp, air_sea_clss_cd, null, null);
}

/**
 * code name select
 */
function codeNameAction(str, obj, tmp, air_sea_clss_cd){
	codeNameAction(str, obj, tmp, air_sea_clss_cd, null, null);
}



/**
 * code name select
 */
function codeNameAction(str, obj, tmp, air_sea_clss_cd, bnd_cd, biz_cd,cobFlag) {
	cur_airSeaTp = air_sea_clss_cd;
	cur_bndTp = bnd_cd;
	cur_bizTp = biz_cd;
	codeNameOK = false;
	var s_code=obj.value.toUpperCase();
	var s_type="";
	CODETYPE=str;
	var sub_str=str.substring(0, 8);
	var sub_str2=str.substring(9);
	
	if (window.event.keyCode == 13 && s_code == "") {
		if ((str == "commodity") || (str == "country") || (str == "state")) {
			document.getElementById(str).onclick();
		} else if (str == "srVessel") {
			if (sub_str2 == "Pre") {
				document.getElementById("prevesel").onclick();
			} else {
				document.getElementById("trunkvessel").onclick();
			}
		} else if ((sub_str2 == "sea_liner") || (sub_str2 == "air_liner")) {
			document.getElementById("liner").onclick();
		} else {
			document.getElementById(sub_str2).onclick();
		}
	} else if (s_code != "" && (window.event.keyCode == 13 || window.event.type == "blur")) {		
		if(window.event.type == "blur"){
			if(!onKeyDownFlg) return;
			if (sub_str == "Location") {
				s_type=sub_str;
				//OFVFOUR-8085: [Lever Logistics] OIH B/L - Custom Clerance Port/Date
				ajaxSendPost(locationCdReq, "reqVal", "&goWhere=aj&bcKey=searchCodeName&codeType="+s_type+"&s_code="+s_code, "./GateServlet.gsl");
			} else if (sub_str == "Nodecode") {
				s_type="node";
				ajaxSendPost(nodeCdReq, "reqVal", "&goWhere=aj&bcKey=searchCodeName&codeType="+s_type+"&s_code="+s_code, "./GateServlet.gsl");
			} else if (sub_str == "trdpCode") {				
				s_type=sub_str;
				ajaxSendPost(trdpCdReq, "reqVal", "&goWhere=aj&bcKey=searchCodeName&codeType="+s_type+"&s_code="+s_code, "./GateServlet.gsl");
			} else if (sub_str == "srVessel") {
				s_type=sub_str;
				ajaxSendPost(dispCodeNameAjaxReq, "reqVal", "&goWhere=aj&bcKey=searchCodeName&codeType="+s_type+"&s_code="+s_code, "./GateServlet.gsl");
			}  else if (sub_str == "officeCd") {
				s_type=sub_str;
				ajaxSendPost(officeCdReq, 'reqVal', '&goWhere=aj&bcKey=searchOfficeCode&s_ofc_cd='+s_code, './GateServlet.gsl');
			} else {
				s_type=str;				
				ajaxSendPost(dispCodeNameAjaxReq, "reqVal", "&goWhere=aj&bcKey=searchCodeName&codeType="+s_type+"&s_code="+s_code, "./GateServlet.gsl");
			}
		}else{
			onKeyDownFlg = false;
			if (sub_str == "Location") {
				s_type=sub_str;
				//OFVFOUR-8085: [Lever Logistics] OIH B/L - Custom Clerance Port/Date
				ajaxSendPost(locationCdReq, "reqVal", "&goWhere=aj&bcKey=searchCodeName&codeType="+s_type+"&s_code="+s_code, "./GateServlet.gsl");
			} else if (sub_str == "Nodecode") {
				s_type="node";
				ajaxSendPost(nodeCdReq, "reqVal", "&goWhere=aj&bcKey=searchCodeName&codeType="+s_type+"&s_code="+s_code, "./GateServlet.gsl");
			} else if (sub_str == "trdpCode") {
				s_type=sub_str;
				ajaxSendPost(trdpCdReq, "reqVal", "&goWhere=aj&bcKey=searchCodeName&codeType="+s_type+"&s_code="+s_code, "./GateServlet.gsl");
			} else if (sub_str == "srVessel") {
				s_type=sub_str;
				ajaxSendPost(dispCodeNameAjaxReq, "reqVal", "&goWhere=aj&bcKey=searchCodeName&codeType="+s_type+"&s_code="+s_code, "./GateServlet.gsl");
			}  else if (sub_str == "officeCd") {
				s_type=sub_str;
				ajaxSendPost(officeCdReq, 'reqVal', '&goWhere=aj&bcKey=searchOfficeCode&s_ofc_cd='+s_code, './GateServlet.gsl');
			} else {
				s_type=str;
				ajaxSendPost(dispCodeNameAjaxReq, "reqVal", "&goWhere=aj&bcKey=searchCodeName&codeType="+s_type+"&s_code="+s_code, "./GateServlet.gsl");
			}
		}
	}
	else if(s_code == ""){
		//alert(str);
		var formObj=document.frm1;
		CODETYPE=str;		
		if(CODETYPE =="trdpCode_partner"){
			formObj.prnr_trdp_cd.value="";   
			formObj.prnr_trdp_nm.value = ""; 
			formObj.prnr_trdp_addr.value="";
		}else if(CODETYPE =="trdpCode_cust"){
			formObj.cust_trdp_cd.value="";   
			formObj.cust_trdp_nm.value = ""; 
			formObj.cust_trdp_addr.value="";			
		}else if(CODETYPE =="trdpCode_ashipper"){
			formObj.act_shpr_trdp_cd.value="";   
			formObj.act_shpr_trdp_nm.value = ""; 
			formObj.act_shp_info.value="";			
		}else if(CODETYPE =="trdpCode_third"){
			formObj.third_trdp_cd.value="";   
			formObj.third_trdp_nm.value = ""; 
			formObj.third_trdp_addr.value="";			
		}else if(CODETYPE =="trdpCode_partner2"){
			formObj.prnr_trdp_cd2.value="";   
			formObj.prnr_trdp_nm2.value = ""; 
			formObj.prnr_trdp_addr2.value="";			
		}else if(CODETYPE =="trdpCode_himp_air_carr" || CODETYPE =="trdpCode_imp_air_carr" ){
			formObj.lnr_trdp_cd.value="";   
			formObj.lnr_trdp_nm.value = ""; 
			formObj.flt_no.value="";			
		}else if(CODETYPE =="Location_pol"){
			formObj.pol_cd.value="";   
			formObj.pol_nm.value = ""; 
			if(typeof(formObj.pol_nod_cd) != "undefined"){
				formObj.pol_nod_cd.value="";			
			}
		}else if(CODETYPE =="Location_cstms_clr"){//OFVFOUR-8085: [Lever Logistics] OIH B/L - Custom Clerance Port/Date
			formObj.cstms_clr_port_cd.value="";
			formObj.cstms_clr_port_nm.value = "";
		}else if(CODETYPE =="Location_air_des"){
			formObj.pod_cd.value="";   
			formObj.pod_nm.value = ""; 
			formObj.pod_nod_cd.value="";			
		}else if(CODETYPE =="Location_wh"){
			formObj.fnl_dest_loc_cd.value="";   
			formObj.fnl_dest_loc_nm.value = "";						
		}else if(CODETYPE =="trdpCode_door"){
			formObj.door_loc_cd.value="";   
			formObj.door_loc_nm.value = "";
			//OFVFOUR-7736 [SENKO USA] Consignee and Delivery Location
			if(cur_airSeaTp == "S" && cur_bizTp == "H" && cur_bndTp == "I"){
				formObj.lgl_addr.value ="";	
			}
		}else if(CODETYPE =="trdpCode_cfs"){
			formObj.cfs_trdp_cd.value="";   
			formObj.cfs_trdp_nm.value = ""; 
			formObj.cfs_nod_cd.value="";			
		}else if(CODETYPE =="commodity"){
			formObj.rep_cmdt_cd.value="";   
			formObj.rep_cmdt_nm.value = ""; 
			if(typeof(formObj.h_rep_cmdt_nm) != "undefined"){
				formObj.h_rep_cmdt_nm.value="";	
			}
		}else if(CODETYPE =="country"){
			formObj.cnt_cd.value="";   
			formObj.cnt_nm.value = ""; 
//			formObj.cust_trdp_addr.value="";			
		}else if(CODETYPE =="trdpCode_trk"){
			formObj.trk_trdp_cd.value="";   
			formObj.trk_trdp_nm.value = ""; 
			try{
				formObj.trk_trdp_addr.value = "";//trk_trdp_addr   AS param3
			}catch(e){}
		}else if(CODETYPE =="trdpCode_bond"){
			formObj.bond_carr_cd.value="";   
			formObj.bond_carr_nm.value = ""; 			
		}else if(CODETYPE =="trdpCode_shipper"){
			formObj.shpr_trdp_cd.value="";   
			formObj.shpr_trdp_nm.value = ""; 			
			formObj.shpr_trdp_addr.value = "";
		}else if(CODETYPE =="trdpCode_agent"){
			formObj.agent_trdp_cd.value="";   
			formObj.agent_trdp_nm.value = ""; 			
			formObj.agent_trdp_addr.value = "";
		}else if(CODETYPE =="trdpCode_sea_liner"){
			formObj.lnr_trdp_cd.value="";   
			formObj.lnr_trdp_nm.value = ""; 			
		}else if(CODETYPE =="srVessel"){
			formObj.trnk_vsl_cd.value="";   
			formObj.trnk_vsl_nm.value = ""; 			
			formObj.trnk_voy.value = "";
		}else if(CODETYPE =="trdpCode_carr"){
			formObj.carr_trdp_cd.value="";   
			formObj.carr_trdp_nm.value = ""; 			
			formObj.carr_trdp_addr.value = "";
		}else if(CODETYPE =="Location_por"){
			formObj.por_cd.value="";   
			formObj.por_nm.value = ""; 			
		}else if(CODETYPE =="Location_pod"){
			formObj.pod_cd.value="";   
			formObj.pod_nm.value = ""; 			
		}else if(CODETYPE =="Location_del"){
			formObj.del_cd.value="";   
			formObj.del_nm.value = ""; 			
		}else if(CODETYPE =="trdpCode_cy"){
			formObj.cy_trdp_cd.value="";   
			formObj.cy_trdp_nm.value = ""; 			
		}else if(CODETYPE =="trdpCode_rt"){
			formObj.rt_trdp_cd.value="";   
			formObj.rt_trdp_nm.value = ""; 			
		}else if(str == "location_pol"){
			formObj.f_pol_por_cd.value = "";
			formObj.f_pol_por_nm.value = "";
		}else if(str == "location_pod"){
			formObj.f_pod_del_cd.value = "";
			formObj.f_pod_del_nm.value = "";
		}else if(str == "Location_pol_oeh"){
			formObj.pol_cd.value = "";
			formObj.pol_nm.value = "";
		}else if(str == "Location_dest"){
			formObj.fnl_dest_loc_cd.value = "";
			formObj.fnl_dest_loc_nm.value = "";
		}else if(CODETYPE == "trdpCode_trsp"){
			formObj.trsp_trdp_cd.value="";
			formObj.trsp_trdp_nm.value="";				
		}else if(CODETYPE == "trdpCode_pickup"){
			formObj.org_rout_trdp_cd.value="";
			formObj.org_rout_trdp_nm.value="";
		}else if(CODETYPE =="trdpCode_fwrd_agn"){
			formObj.fwrd_agn_trdp_cd.value="";   
			formObj.fwrd_agn_trdp_nm.value = ""; 			
			formObj.fwrd_agn_trdp_addr.value = "";
		}else if(CODETYPE == "Location_first"){
			formObj.first_port_cd.value="";
			formObj.first_port_nm.value="";
		}else if(CODETYPE == "trdpCode_cgo_pu"){
			formObj.cgo_pu_trdp_cd.value="";
			formObj.cgo_pu_trdp_nm.value="";
			formObj.cgo_pu_trdp_addr.value="";
		}else if(CODETYPE == "trdpCode_liner"){
			formObj.lnr_trdp_cd.value="";
			formObj.lnr_trdp_nm.value="";
		}else if(CODETYPE == "trdpCode_pu"){
			formObj.pu_trdp_cd.value="";
			formObj.pu_trdp_nm.value="";
		}else if(CODETYPE == "trdpCode_rcv"){
			formObj.rcv_wh_cd.value="";
			formObj.rcv_wh_nm.value="";
		}else if(CODETYPE == "Location_isu"){
			formObj.iss_loc_cd.value="";
			formObj.iss_loc_nm.value="";
		}
	}else{
		onKeyDownFlg = true;
	}
	
	if(cobFlag=='Y'){
		cobChange();
	}
		
}







/**
 * Location Code 처리
 */
function locationCdReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@@;');
			var masterVals=rtnArr[0].split('@@^');	
			if(CODETYPE == "Location_por"){	
				if(masterVals[0]==''){
					//formObj.por_cd.focus();
				}else{
					formObj.por_cd.value=masterVals[0];//loc_cd
					//formObj.por_nod_cd.value= masterVals[1];//nod_cd
					//formObj.por_nm.value    = masterVals[3]+', '+masterVals[4];//loc_nm
					formObj.por_nm.value=masterVals[3];//loc_nm
				}
			}else if(CODETYPE == "Location_pol"){
				if(masterVals[0]==''){
					//formObj.pol_cd.focus();
				}else{
					formObj.pol_cd.value=masterVals[0];//loc_cd
					//formObj.pol_nod_cd.value= masterVals[1];//nod_cd
					//formObj.pol_nm.value    = masterVals[3]+', '+masterVals[4];//loc_nm
					formObj.pol_nm.value=masterVals[3];//loc_nm
					if(typeof(formObj.pol_cnt_cd) != "undefined"){
						formObj.pol_cnt_cd.value=masterVals[2];
					}
				}
				
			}else if(CODETYPE == "Location_ts_pol"){
				if(masterVals[0]==''){
					//formObj.ts_pol_cd.focus();
				}else{
					formObj.ts_pol_cd.value=masterVals[0];//loc_cd
					formObj.ts_pol_nm.value=masterVals[3];//loc_nm
				}
				
			}else if(CODETYPE == "Location_pol_oeh"){
				if(masterVals[0]==''){
					//formObj.pol_cd.focus();
				}else{
					formObj.pol_cd.value    = masterVals[0];//loc_cd
					//formObj.pol_nod_cd.value= masterVals[1];//nod_cd
					//formObj.pol_nm.value    = masterVals[3]+', '+masterVals[4];//loc_nm
					formObj.pol_nm.value    = masterVals[3];//loc_nm
					
					if(typeof(formObj.pol_cnt_cd) != "undefined"){
						formObj.pol_cnt_cd.value = masterVals[2];
					}
				}
				
				//#30284 [BINEX]OEH On-Board Date 동기화
				cobChange_pol();	
				
			}else if(CODETYPE == "Location_pod"){
				if(masterVals[0]==''){
					//formObj.pod_cd.focus();
				}else{
					formObj.pod_cd.value=masterVals[0];//loc_cd 
					//formObj.pod_nod_cd.value= masterVals[1];//nod_cd
					//formObj.pod_nm.value    = masterVals[3]+', '+masterVals[4];//loc_nm
					formObj.pod_nm.value=masterVals[3];//loc_nm
				}
			}else if(CODETYPE == "Location_del"){
				if(masterVals[0]==''){
					//formObj.del_cd.focus();
				}else{
					formObj.del_cd.value=masterVals[0];//loc_cd 
					//formObj.del_nod_cd.value= masterVals[1];//nod_cd
					//formObj.del_nm.value    = masterVals[3]+', '+masterVals[4];//loc_nm
					formObj.del_nm.value=masterVals[3];//loc_nm
					formObj.svc_lane_nm.value=masterVals[34];//loc_nm
				}
			}else if(CODETYPE == "Location_dest"){
				formObj.fnl_dest_loc_cd.value=masterVals[0];//loc_cd 
				//formObj.fnl_dest_nod_cd.value = masterVals[1];//nod_cd
				//formObj.fnl_dest_loc_nm.value = masterVals[3]+', '+masterVals[4];//loc_nm
				formObj.fnl_dest_loc_nm.value=masterVals[3];//loc_nm
			}else if(CODETYPE == "Location_isu"){
				formObj.iss_loc_cd.value=masterVals[0];//loc_cd
				//formObj.iss_loc_nm.value = masterVals[3]+', '+masterVals[4];//loc_nm
				formObj.iss_loc_nm.value=masterVals[3];//loc_nm
			}else if(CODETYPE == "Location_pay"){
				formObj.pay_loc_cd.value=masterVals[0];//loc_cd
				//formObj.pay_loc_nm.value = masterVals[3]+', '+masterVals[4];//loc_nm
				formObj.pay_loc_nm.value=masterVals[3];//loc_nm
			}else if(CODETYPE == "Location_door"){
				formObj.door_loc_cd.value=masterVals[0];//loc_cd
				//formObj.door_loc_nm.value = masterVals[3]+', '+masterVals[4];//loc_nm
				formObj.door_loc_nm.value=masterVals[3];//loc_nm
			}else if(CODETYPE == "Location_first"){
				formObj.first_port_cd.value=masterVals[0];//loc_cd
				//formObj.first_port_nm.value = masterVals[3]+', '+masterVals[4];//loc_nm
				formObj.first_port_nm.value=masterVals[3];//loc_nm
			}else if(CODETYPE == "Location_ts1"){
				formObj.ts1_port_cd.value=masterVals[0];//loc_cd
			}else if(CODETYPE == "Location_ts2"){
				formObj.ts2_port_cd.value=masterVals[0];//loc_cd
			}else if(CODETYPE == "Location_ts3"){
				formObj.ts3_port_cd.value=masterVals[0];//loc_cd
			}else if(CODETYPE == "Location_wh"){
				formObj.fnl_dest_loc_cd.value=masterVals[0];//loc_cd
				//formObj.door_loc_nm.value = masterVals[3]+', '+masterVals[4];//loc_nm
				formObj.fnl_dest_loc_nm.value=masterVals[3];//loc_nm
			}else if(CODETYPE == "Location_des"){
				formObj.pod_cd.value=masterVals[0];//loc_cd
				//formObj.door_loc_nm.value = masterVals[3]+', '+masterVals[4];//loc_nm
				formObj.pod_nm.value=masterVals[3];//loc_nm
			}else if(CODETYPE == "Location_air_des"){
				formObj.pod_cd.value=masterVals[0];//loc_cd
				//formObj.door_loc_nm.value = masterVals[3]+', '+masterVals[4];//loc_nm
				formObj.pod_nm.value=masterVals[3];//loc_nm
			}else if(CODETYPE == "Location_fst"){
				formObj.fst_to_cd.value=masterVals[0];//loc_cd
				formObj.fst_to_nm.value=masterVals[3];//loc_nm
			}//OFVFOUR-8085: [Lever Logistics] OIH B/L - Custom Clerance Port/Date
			else if(CODETYPE == "Location_cstms_clr"){
				formObj.cstms_clr_port_cd.value=masterVals[0];//loc_cd
				formObj.cstms_clr_port_nm.value=masterVals[3];//loc_nm
			}
		}
		else{
			if(CODETYPE == "Location_por"){
				formObj.por_cd.value="";//loc_cd
				//formObj.por_nod_cd.value = "";//nod_cd
				//formObj.por_nm.value  = "";//loc_nm , #21632
				//formObj.por_cd.focus();
			}else if(CODETYPE == "Location_pol"){
				formObj.pol_cd.value="";//loc_cd
				//formObj.pol_nod_cd.value = "";//nod_cd
				formObj.pol_nm.value="";//loc_nm
				//formObj.pol_cd.focus();
			}else if(CODETYPE == "Location_ts_pol"){
				formObj.ts_pol_cd.value="";//loc_cd
				formObj.ts_pol_nm.value="";//loc_nm
			}else if(CODETYPE == "Location_pol_oeh"){
				formObj.pol_cd.value     = "";//loc_cd
				//formObj.pol_nod_cd.value = "";//nod_cd
				formObj.pol_nm.value     = "";//loc_nm
				//formObj.pol_cd.focus();
			}else if(CODETYPE == "Location_pod"){
				formObj.pod_cd.value="";//loc_cd
				//formObj.pod_nod_cd.value = "";//nod_cd
				formObj.pod_nm.value="";//loc_nm
				//formObj.pod_cd.focus();
			}else if(CODETYPE == "Location_del"){
				formObj.del_cd.value="";//loc_cd 
				//formObj.del_nod_cd.value = "";//nod_cd
				//formObj.del_nm.value     = "";//loc_nm, #21632
				//formObj.del_cd.focus();
			}else if(CODETYPE == "Location_dest"){
				formObj.fnl_dest_loc_cd.value="";//loc_cd
				//formObj.fnl_dest_nod_cd.value = "";//nod_cd
				//formObj.fnl_dest_loc_nm.value = "";//loc_nm, #21632
				//formObj.fnl_dest_loc_cd.focus();
			}else if(CODETYPE == "Location_isu"){
				formObj.iss_loc_cd.value="";//loc_cd
				formObj.iss_loc_nm.value = "";// 
				//formObj.iss_loc_cd.focus();
			}else if(CODETYPE == "Location_pay"){
				formObj.pay_loc_cd.value="";//loc_cd
				//formObj.pay_loc_nm.value = "";// #21632
				//formObj.pay_loc_cd.focus();
			}else if(CODETYPE == "Location_door"){
				formObj.door_loc_cd.value='';//loc_cd
				formObj.door_loc_nm.value='';//loc_nm
			}else if(CODETYPE == "Location_first"){
				formObj.first_port_cd.value='';//loc_cd
				formObj.first_port_nm.value = '';//loc_nm #21632
			}else if(CODETYPE == "Location_ts1"){
				formObj.ts1_port_cd.value='';//loc_cd
			}else if(CODETYPE == "Location_ts2"){
				formObj.ts2_port_cd.value='';//loc_cd
			}else if(CODETYPE == "Location_ts3"){
				formObj.ts3_port_cd.value='';//loc_cd
			}else if(CODETYPE == "Location_wh"){
				formObj.fnl_dest_loc_cd.value='';//loc_cd
				//formObj.door_loc_nm.value = masterVals[3]+', '+masterVals[4];//loc_nm
				//formObj.fnl_dest_loc_nm.value = '';//loc_nm #21632
			}else if(CODETYPE == "Location_des"){
				formObj.pod_cd.value="";//loc_cd
				//formObj.pod_nm.value = "";//loc_nm #21632
			}else if(CODETYPE == "Location_air_des"){
				formObj.pod_cd.value="";//loc_cd
				formObj.pod_nm.value="";//loc_nm #21632
			}else if(CODETYPE == "Location_fst"){
				formObj.fst_to_cd.value="";//loc_cd
				formObj.fst_to_nm.value="";//loc_nm
			}//OFVFOUR-8085: [Lever Logistics] OIH B/L - Custom Clerance Port/Date
			else if(CODETYPE == "Location_cstms_clr"){
				formObj.cstms_clr_port_cd.value="";//loc_cd
				formObj.cstms_clr_port_nm.value="";//loc_nm
			}
		}
	}
	codeNameOK = true;
}

/*
 * on board date, vsl name
 * clean on board 내용을 만들어 준다.
 */
function cobChange_pol(){
	//#30284 [BINEX]OEH On-Board Date 동기화
	var formObj = document.frm1;
	if (typeof(formObj.clean_on_board) != 'undefined') {
		formObj.clean_on_board.value = sea_cob;
		formObj.clean_on_board.value += "\r\n";
		formObj.clean_on_board.value += mkCharDateFormat(formObj.etd_dt_tm.value);
		formObj.clean_on_board.value += "\r\n";		
		formObj.clean_on_board.value += "-------------------";
		if(vsl_show_flg=="Y"){
			formObj.clean_on_board.value += "\r\n";
			formObj.clean_on_board.value += formObj.trnk_vsl_nm.value + " " + formObj.trnk_voy.value;
		}
		if(load_port_show_flg=="Y"){
			formObj.clean_on_board.value += "\r\n";
			formObj.clean_on_board.value += formObj.pol_nm.value;
		}
	}
			
	//formObj.obrd_dt_tm1.value = formObj.obrd_dt_tm.value; 

}

/**
 * Node코드 처리
 */
function nodeCdReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var rtnArr=doc[1].split('@@;');		
			var masterVals=rtnArr[0].split('@@^');	
			if(CODETYPE == "Nodecode_cfs"){
				//frm1.cfs_nod_cd.value = masterVals[0];//nod_cd
				frm1.cfs_loc_cd.value=masterVals[1];//loc_cd
				//frm1.cfs_loc_nm.value = masterVals[3]+', '+masterVals[4];//loc_nm 
				frm1.cfs_loc_nm.value=masterVals[3];//loc_nm 
			//Departure
			}else if(CODETYPE == "Nodecode_pol"){
				//frm1.pol_nod_cd.value = masterVals[0];//nod_cd
				frm1.pol_cd.value=masterVals[1];//loc_cd
				//frm1.pol_nm.value  = masterVals[3]+', '+masterVals[4];//loc_nm
				frm1.pol_nm.value=masterVals[3];//loc_nm
			//Arrival	
			}else if(CODETYPE == "Nodecode_pod"){
				//frm1.pod_nod_cd.value = masterVals[0];//nod_cd
				frm1.pod_cd.value=masterVals[1];//loc_cd
				//frm1.pod_nm.value  = masterVals[3]+', '+masterVals[4];//loc_nm
				frm1.pod_nm.value=masterVals[3];//loc_nm
			//항공 TS1
			}else if(CODETYPE == "Nodecode_ts1"){
				formObj.ts1_port_cd.value=masterVals[0];//loc_cd 
			//항공 TS2
			}else if(CODETYPE == "Nodecode_ts2"){
				formObj.ts2_port_cd.value=masterVals[0];//loc_cd
			//항공 TS3
			}else if(CODETYPE == "Nodecode_ts3"){
				formObj.ts3_port_cd.value=masterVals[0];//loc_cd
			}else if(CODETYPE == "Nodecode_wh"){
				frm1.fnl_wh_cd.value=masterVals[1];//loc_cd
				//frm1.fnl_wh_nm.value  = masterVals[3]+', '+masterVals[4];//loc_nm
				frm1.fnl_wh_nm.value=masterVals[3];//loc_nm
			}
		}else{
			if(CODETYPE == "Nodecode_cfs"){
				//frm1.cfs_nod_cd.value = '';//nod_cd
				frm1.cfs_loc_cd.value='';//loc_cd
				frm1.cfs_loc_nm.value='';//loc_nm 
			//Departure
			}else if(CODETYPE == "Nodecode_pol"){
				//frm1.pol_nod_cd.value = '';//nod_cd
				frm1.pol_cd.value='';//loc_cd
				frm1.pol_nm.value='';//loc_nm
			//Arrival	
			}else if(CODETYPE == "Nodecode_pod"){
				//frm1.pod_nod_cd.value = '';//nod_cd
				frm1.pod_cd.value='';//loc_cd
				frm1.pod_nm.value='';//loc_nm
			//항공 TS1
			}else if(CODETYPE == "Nodecode_ts1"){
				formObj.ts1_port_cd.value='';//loc_cd
				//formObj.ts1_port_cd.focus();
			//항공 TS2
			}else if(CODETYPE == "Nodecode_ts2"){
				formObj.ts2_port_cd.value='';//loc_cd
				//formObj.ts2_port_cd.focus();
			//항공 TS3
			}else if(CODETYPE == "Nodecode_ts3"){
				formObj.ts3_port_cd.value='';//loc_cd
				//formObj.ts3_port_cd.focus();
			}else if(CODETYPE == "Nodecode_wh"){
				frm1.fnl_wh_cd.value='';//loc_cd
				frm1.fnl_wh_nm.value='';//loc_nm
			}
		}
	}
	else{
		//REFINE THIS MESSAGE (2012.11.26)
		alert(getLabel('FMS_COM_ALT007'));	
	}	
	codeNameOK = true;
}

/**
 * Sales Man 자동 설정 
 **/ 
function setSalesMan(s_code, s_partner_yn, s_bizTp) {
	
	var formObj=document.frm1;
	var s_trdp_type = "";
	var s_process_yn = "N";
	
	if(s_partner_yn == "Y"){
		s_trdp_type = "PARTNER";
	}else{
		s_trdp_type = "CUST";
	}
	
	if(cur_bizTp == "H" || s_bizTp == "H"){
		// #52162 - [BNX] SALESMAN MAPPING 요청 및 자동 SET UP 로직 변경
		var opt_key_sec = "BL_SALES_MAN_DFLT";
	    ajaxSendPost(setBlSalesManDfltReq, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key_sec, "./GateServlet.gsl");
	    
	    //#6369 [AIF] SALES PIC NOT PROPERLY SYNC BTW MBL AND HBL
	    if (cur_airSeaTp == 'S'){
		    var opt_key = "BL_SEA_USE_SALES_MAN_DFLT_FLG";
		    ajaxSendPost(setSalesPICInfo, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	    }
	    
	    if(BL_SALES_MAN_DFLT == "A"){
	    	if(s_trdp_type == "CUST"){
	    		s_process_yn = "Y";
	    	}
	    }else{
	    	if (typeof(formObj.nomi_flg) != 'undefined'){
	    		if(formObj.nomi_flg.value == "Y"){
	    			if(s_trdp_type == "PARTNER"){
	    				s_process_yn = "Y";
	    			}
		    	}else{
		    		if(s_trdp_type == "CUST"){
		    			s_process_yn = "Y";
	    			}
		    	}
	    	}else{
	    		if(s_trdp_type == "CUST"){
	    			s_process_yn = "Y";
    			}
	    	}
	    }
	    
	    if(s_process_yn == "Y"){
	    	ajaxSendPost(searchTradePartnerReq, "reqVal", "&goWhere=aj&bcKey=searchTradePartner&s_code="+s_code + "&user_id="+formObj.user_id.value, "./GateServlet.gsl");
	    }
	}
}

//#1948 [C&L, CBM] SALES PIC ASSIGNMENT ON MASTER B/L
function setSalesManMaster(obj_id, s_code){
	var formObj=document.frm1;
					
	//OEM,OIM,,AEM,AIM (Carrier Booking Entry 제외)
	if(document.location.href.indexOf("SEE_BMD_0500") == -1){  
		
		if (typeof(formObj.hbl_tp_cd)!='undefined'
			&& typeof(formObj.nomi_flg)!='undefined')
		{
			
			//OEM B/L Entry
			if(cur_airSeaTp == "S" && cur_bndTp == "O" && cur_bizTp =="M"){ 
				if( (formObj.hbl_tp_cd.value == "DR" || formObj.hbl_tp_cd.value == "DT" || formObj.hbl_tp_cd.value == "FW" )      //DIRECT(DR)  or DIRECT TRIANGLE(DT) or FORWARDING(FW)
					&& formObj.nomi_flg.value !='Y') //	Nomi
				{
					if(obj_id == "shipper"){ //shipper
						ajaxSendPost(searchTradePartnerReq, "reqVal", "&goWhere=aj&bcKey=searchTradePartner&s_code="+s_code + "&user_id="+formObj.user_id.value, "./GateServlet.gsl");
					}				
				}
				if( (formObj.hbl_tp_cd.value == "DR" || formObj.hbl_tp_cd.value == "DT" || formObj.hbl_tp_cd.value == "FW" )      //DIRECT(DR)  or DIRECT TRIANGLE(DT) or FORWARDING(FW)
					&& formObj.nomi_flg.value =='Y') //Nomi
				{	
					if(obj_id == "partner"){ //Destination Agent
						ajaxSendPost(searchTradePartnerReq, "reqVal", "&goWhere=aj&bcKey=searchTradePartner&s_code="+s_code + "&user_id="+formObj.user_id.value, "./GateServlet.gsl");
					}							
				}	

			}
			
			//OIM B/L Entry
			if(cur_airSeaTp == "S" && cur_bndTp == "I" && cur_bizTp =="M"){
				if( (formObj.hbl_tp_cd.value == "DR" || formObj.hbl_tp_cd.value == "DT" || formObj.hbl_tp_cd.value == "FW" )      //DIRECT(DR)  or DIRECT TRIANGLE(DT) or FORWARDING(FW)
					&& formObj.nomi_flg.value !='Y') //	Nomi
				{
					if(obj_id == "consignee"){ //consignee
						ajaxSendPost(searchTradePartnerReq, "reqVal", "&goWhere=aj&bcKey=searchTradePartner&s_code="+s_code + "&user_id="+formObj.user_id.value, "./GateServlet.gsl");
					}				
				}
				if( (formObj.hbl_tp_cd.value == "DR" || formObj.hbl_tp_cd.value == "DT" || formObj.hbl_tp_cd.value == "FW" )      //DIRECT(DR)  or DIRECT TRIANGLE(DT) or FORWARDING(FW)
					&& formObj.nomi_flg.value =='Y') //Nomi
				{	
					if(obj_id == "agent"){ //Forwarding Agent
						ajaxSendPost(searchTradePartnerReq, "reqVal", "&goWhere=aj&bcKey=searchTradePartner&s_code="+s_code + "&user_id="+formObj.user_id.value, "./GateServlet.gsl");
					}							
				}
			}
			
			
			//AEM AWB Entry
			if(cur_airSeaTp == "A" && cur_bndTp == "O" && cur_bizTp =="M"){
				if( (formObj.hbl_tp_cd.value == "DR" || formObj.hbl_tp_cd.value == "DT" || formObj.hbl_tp_cd.value == "FW" )      //DIRECT(DR)  or DIRECT TRIANGLE(DT) or FORWARDING(FW)
					&& formObj.nomi_flg.value !='Y') //	Nomi
				{
					if(obj_id == "shipper"){ //shipper
						ajaxSendPost(searchTradePartnerReq, "reqVal", "&goWhere=aj&bcKey=searchTradePartner&s_code="+s_code + "&user_id="+formObj.user_id.value, "./GateServlet.gsl");
					}				
				}				
			}
			
			//AIM AWB Entry
			if(cur_airSeaTp == "A" && cur_bndTp == "I" && cur_bizTp =="M"){
				if( (formObj.hbl_tp_cd.value == "DR" || formObj.hbl_tp_cd.value == "DT" || formObj.hbl_tp_cd.value == "FW" )      //DIRECT(DR)  or DIRECT TRIANGLE(DT) or FORWARDING(FW)
					&& formObj.nomi_flg.value !='Y') //	Nomi
				{
					if(obj_id == "consignee"){ //consignee
						ajaxSendPost(searchTradePartnerReq, "reqVal", "&goWhere=aj&bcKey=searchTradePartner&s_code="+s_code + "&user_id="+formObj.user_id.value, "./GateServlet.gsl");
					}				
				}				
			}

		}
		
	}
}

//#25711 [SUNWAY]Sales Man 자동 설정 
function searchTradePartnerReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var salesPs=doc[1].split('@@^');
			
			if (BL_SEA_USE_SALES_MAN_DFLT_FLG == 'Y' || cur_airSeaTp != 'S'){
				//#3811 [JAPT] POR,DEL,F.DEST & Sales PIC sync.
				//BL_SALES_MAN_DFLT_BLANK opt 가 Y 일때 bl entry에 SALESMAN 데이터존재시  Trade Partner SALESMAN 등록이안된경우 업데이트 안함
				if(salesPs[6] == 'Y'){  //BL_SALES_MAN_DFLT_BLANK opt
					if(salesPs[4] =='' || salesPs[5]==''){
						if(formObj.sls_usrid.value != '' && formObj.sls_ofc_cd.value != ''){
							console.log("Return!");
							return;
						}
					}
				}
				formObj.sls_usrid.value=salesPs[0];//sls_usrid
				formObj.sls_usr_nm.value=salesPs[1];//sls_usr_nm
				formObj.sls_ofc_cd.value=salesPs[2];//sls_ofc_cd
				formObj.sls_dept_cd.value=salesPs[3];//dept_cd
			}
		}
	}
}

//OFVFOUR-7976: [MATRIX] ADDING CS PIC ON ALL B/L ENTRY AND TRADE PARTNER ENTRY SCREEN
function setCSMan(cs_code, cs_partner_yn, cs_bizTp) {

	var formObj=document.frm1;
	var cs_trdp_type = "";
	var cs_process_yn = "N";

	if(cs_partner_yn == "Y"){
		cs_trdp_type = "PARTNER";
	}else{
		cs_trdp_type = "CUST";
	}

	if(cur_bizTp == "H" || cs_bizTp == "H"){
		// #52162 - [BNX] SALESMAN MAPPING 요청 및 자동 SET UP 로직 변경
		var opt_key_sec = "BL_CS_MAN_DFLT";
		ajaxSendPost(setBlCSManDfltReq, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key_sec, "./GateServlet.gsl");

		//#6369 [AIF] SALES PIC NOT PROPERLY SYNC BTW MBL AND HBL
		if (cur_airSeaTp == 'S'){
			var opt_key = "BL_SEA_USE_CS_MAN_DFLT_FLG";
			ajaxSendPost(setCSPICInfo, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
		}

		if(BL_CS_MAN_DFLT == "A"){
			if(cs_trdp_type == "CUST"){
				cs_process_yn = "Y";
			}
		}else{
			if (typeof(formObj.nomi_flg) != 'undefined'){
				if(formObj.nomi_flg.value == "Y"){
					if(cs_trdp_type == "PARTNER"){
						cs_process_yn = "Y";
					}
				}else{
					if(cs_trdp_type == "CUST"){
						cs_process_yn = "Y";
					}
				}
			}else{
				if(cs_trdp_type == "CUST"){
					cs_process_yn = "Y";
				}
			}
		}

		if(cs_process_yn == "Y"){
			ajaxSendPost(searchTradePartnerCSReq, "reqVal", "&goWhere=aj&bcKey=searchTradePartner&s_code="+cs_code + "&user_id="+formObj.user_id.value, "./GateServlet.gsl");
		}
	}
}

function setCSManMaster(obj_id, cs_code){
	var formObj=document.frm1;

	//OEM,OIM,,AEM,AIM (Carrier Booking Entry 제외)
	if(document.location.href.indexOf("SEE_BMD_0500") == -1){

		if (typeof(formObj.hbl_tp_cd)!='undefined'
			&& typeof(formObj.nomi_flg)!='undefined')
		{

			//OEM B/L Entry
			// if(cur_airSeaTp == "S" && cur_bndTp == "O" && cur_bizTp =="M"){
			// 	if( (formObj.hbl_tp_cd.value == "DR" || formObj.hbl_tp_cd.value == "DT" || formObj.hbl_tp_cd.value == "FW" )      //DIRECT(DR)  or DIRECT TRIANGLE(DT) or FORWARDING(FW)
			// 		&& formObj.nomi_flg.value !='Y') //	Nomi
			// 	{
			// 		if(obj_id == "shipper"){ //shipper
			// 			ajaxSendPost(searchTradePartnerCSReq, "reqVal", "&goWhere=aj&bcKey=searchTradePartner&s_code="+cs_code + "&user_id="+formObj.user_id.value, "./GateServlet.gsl");
			// 		}
			// 	}
			// 	if( (formObj.hbl_tp_cd.value == "DR" || formObj.hbl_tp_cd.value == "DT" || formObj.hbl_tp_cd.value == "FW" )      //DIRECT(DR)  or DIRECT TRIANGLE(DT) or FORWARDING(FW)
			// 		&& formObj.nomi_flg.value =='Y') //Nomi
			// 	{
			// 		if(obj_id == "partner"){ //Destination Agent
			// 			ajaxSendPost(searchTradePartnerCSReq, "reqVal", "&goWhere=aj&bcKey=searchTradePartner&s_code="+cs_code + "&user_id="+formObj.user_id.value, "./GateServlet.gsl");
			// 		}
			// 	}
			//
			// }

			//OIM B/L Entry
			if(cur_airSeaTp == "S" && cur_bndTp == "I" && cur_bizTp =="M"){
				if( (formObj.hbl_tp_cd.value == "DR" || formObj.hbl_tp_cd.value == "DT" || formObj.hbl_tp_cd.value == "FW" )      //DIRECT(DR)  or DIRECT TRIANGLE(DT) or FORWARDING(FW)
					&& formObj.nomi_flg.value !='Y') //	Nomi
				{
					if(obj_id == "consignee"){ //consignee
						ajaxSendPost(searchTradePartnerCSReq, "reqVal", "&goWhere=aj&bcKey=searchTradePartner&s_code="+cs_code + "&user_id="+formObj.user_id.value, "./GateServlet.gsl");
					}
				}
				if( (formObj.hbl_tp_cd.value == "DR" || formObj.hbl_tp_cd.value == "DT" || formObj.hbl_tp_cd.value == "FW" )      //DIRECT(DR)  or DIRECT TRIANGLE(DT) or FORWARDING(FW)
					&& formObj.nomi_flg.value =='Y') //Nomi
				{
					if(obj_id == "agent"){ //Forwarding Agent
						ajaxSendPost(searchTradePartnerCSReq, "reqVal", "&goWhere=aj&bcKey=searchTradePartner&s_code="+cs_code + "&user_id="+formObj.user_id.value, "./GateServlet.gsl");
					}
				}
			}


			//AEM AWB Entry
			// if(cur_airSeaTp == "A" && cur_bndTp == "O" && cur_bizTp =="M"){
			// 	if( (formObj.hbl_tp_cd.value == "DR" || formObj.hbl_tp_cd.value == "DT" || formObj.hbl_tp_cd.value == "FW" )      //DIRECT(DR)  or DIRECT TRIANGLE(DT) or FORWARDING(FW)
			// 		&& formObj.nomi_flg.value !='Y') //	Nomi
			// 	{
			// 		if(obj_id == "shipper"){ //shipper
			// 			ajaxSendPost(searchTradePartnerReq, "reqVal", "&goWhere=aj&bcKey=searchTradePartner&s_code="+s_code + "&user_id="+formObj.user_id.value, "./GateServlet.gsl");
			// 		}
			// 	}
			// }

			//AIM AWB Entry
			// if(cur_airSeaTp == "A" && cur_bndTp == "I" && cur_bizTp =="M"){
			// 	if( (formObj.hbl_tp_cd.value == "DR" || formObj.hbl_tp_cd.value == "DT" || formObj.hbl_tp_cd.value == "FW" )      //DIRECT(DR)  or DIRECT TRIANGLE(DT) or FORWARDING(FW)
			// 		&& formObj.nomi_flg.value !='Y') //	Nomi
			// 	{
			// 		if(obj_id == "consignee"){ //consignee
			// 			ajaxSendPost(searchTradePartnerReq, "reqVal", "&goWhere=aj&bcKey=searchTradePartner&s_code="+s_code + "&user_id="+formObj.user_id.value, "./GateServlet.gsl");
			// 		}
			// 	}
			// }

		}

	}
}

function searchTradePartnerCSReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var csPs=doc[1].split('@@^');

			if (BL_SEA_USE_CS_MAN_DFLT_FLG == 'Y' || cur_airSeaTp != 'S'){
				if(csPs[7] == 'Y'){  //BL_CS_MAN_DFLT_BLANK opt
					if(csPs[10] ==''){
						if(formObj.cs_usrid && formObj.cs_usrid.value != ''){
							console.log("Return!");
							return;
						}
					}
				}
				if (formObj.cs_usrid !== undefined && formObj.cs_usr_nm !== undefined) {
                    formObj.cs_usrid.value=csPs[8];
                    formObj.cs_usr_nm.value=csPs[9];
                }  
			}
		}
	}
}

/**
 * Contribution Margin 자동 설정 
 **/
function setCtrbMgn(s_cust_cd) {
	var formObj=document.frm1;
	var s_post_dt = formObj.post_dt.value;
	
	if (typeof(formObj.ctrb_ofc_cd)!='undefined')
	{
		if (s_post_dt != ""){
			ajaxSendPost(searchCtrbMgnReq, "reqVal", "&goWhere=aj&bcKey=searchCtrbMgn&s_cust_cd="+s_cust_cd + "&s_post_dt="+s_post_dt, "./GateServlet.gsl");
		}
	}
}

function searchCtrbMgnReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@^^@');
			
			formObj.ctrb_ofc_cd.value = rtnArr[0];
			formObj.ctrb_ratio_yn.value = rtnArr[1];
			formObj.ctrb_mgn.value = doMoneyFmt(Number(rtnArr[2]).toFixed(2));
			
			setCtrbDeptCd();
		} else {
			formObj.ctrb_ofc_cd.value = "";
			formObj.ctrb_ratio_yn.value = "N";
			formObj.ctrb_mgn.value = "";
			formObj.ctrb_dept_cd.value = "";
		}
		
		if(formObj.ctrb_ratio_yn.value=="Y"){
			formObj.ctrb_ratio_yn.checked=true;
		}else{
			formObj.ctrb_ratio_yn.checked=false;
		}
	}
}

/**
 * Trade Partner 관련 코드조회
 */
function trdpCdReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.frm1;
	if(doc[0]=='OK'){		
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@@;');
			var masterVals=rtnArr[0].split('@@^');

			//OFVFOUR-7911 [AIF] MANAGING/ALERT CUSTOMER'S OUTSTANDING (OVERDUE)
			var opt_key_sec = "TP_OVER_AMT_FLG";
	    	ajaxSendPost(setOverAmtCurrFlg, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key_sec, "./GateServlet.gsl");

			if(CODETYPE =="trdpCode_shipper"){
				if(masterVals[5] == 'KO'){
					alert(getLabel('COM_FRT_ALT015'));
					formObj.shpr_trdp_cd.value="";	//trdp_cd  AS param1
					formObj.shpr_trdp_nm.value="";		//eng_nm   AS param2
					formObj.shpr_trdp_addr.value="";		//eng_addr  AS param5
					formObj.shpr_trdp_cd.style.color= "#000000";
					formObj.shpr_trdp_nm.style.color= "#000000";
					return;
					
				} else if(masterVals[5] == 'CR'){

					//OFVFOUR-7911 [AIF] MANAGING/ALERT CUSTOMER'S OUTSTANDING (OVERDUE)
					if (TP_OVER_AMT_FLG != ""){
						var objArr=new Array();
						var overDueDateAmt = masterVals[38]==""?0:eval(masterVals[38]);
						if (overDueDateAmt != 0){
							objArr[0]=masterVals[3];
							objArr[1]=doMoneyFmt(roundXL(Number(overDueDateAmt),2).toFixed(2));
							if(!confirm(getLabel2('COM_FRT_CFM012', objArr))){
								formObj.shpr_trdp_cd.value="";
								formObj.shpr_trdp_nm.value=""
								formObj.shpr_trdp_addr.value="";
								formObj.shpr_trdp_cd.style.color= "#000000";
								formObj.shpr_trdp_nm.style.color= "#000000";
								return;
							} else {
								formObj.shpr_trdp_cd.style.color= "#ff0000";
								formObj.shpr_trdp_nm.style.color= "#ff0000";
							}
						}
					}

					var crdLmtAmt=masterVals[6]==""?0:eval(masterVals[6]);
					var curLmtAmt=masterVals[7]==""?0:eval(masterVals[7]);
					var balLmtAmt=crdLmtAmt - curLmtAmt;
					var overDueAmt=masterVals[20]==""?0:eval(masterVals[20]);
					var grandTotal=masterVals[22]==""?0:eval(masterVals[22]);
					
					//[20141217 YJW] #46708
					if(crdLmtAmt > 0) {
						if(overDueAmt > 0 && balLmtAmt < 0  ){
							var objArr=new Array();
							//objArr[0]=doMoneyFmt(roundXL(Number(crdLmtAmt),2).toFixed(2)); 
							//objArr[1]=doMoneyFmt(roundXL(Number(grandTotal),2).toFixed(2));
							objArr[0]=doMoneyFmt(roundXL(Number(balLmtAmt*(-1)),2).toFixed(2));
							if(!confirm(getLabel2('COM_FRT_CFM008', objArr))){
								formObj.shpr_trdp_cd.value="";	//trdp_cd  AS param1
								formObj.shpr_trdp_nm.value="";		//eng_nm   AS param2
								formObj.shpr_trdp_addr.value="";		//eng_addr  AS param5
								formObj.shpr_trdp_cd.style.color= "#000000";
								formObj.shpr_trdp_nm.style.color= "#000000";
								return;
							} else {
								formObj.shpr_trdp_cd.style.color= "#ff0000";
								formObj.shpr_trdp_nm.style.color= "#ff0000";
							}
						} else if (balLmtAmt < 0  ){
							var objArr=new Array();
							//objArr[0]=doMoneyFmt(roundXL(Number(crdLmtAmt),2).toFixed(2)); 
							//objArr[1]=doMoneyFmt(roundXL(Number(balLmtAmt*(-1)),2).toFixed(2));
							objArr[0]=doMoneyFmt(roundXL(Number(balLmtAmt*(-1)),2).toFixed(2));
							if(!confirm(getLabel2('COM_FRT_CFM006', objArr))){
								formObj.shpr_trdp_cd.value="";	//trdp_cd  AS param1
								formObj.shpr_trdp_nm.value="";		//eng_nm   AS param2
								formObj.shpr_trdp_addr.value="";		//eng_addr  AS param5
								formObj.shpr_trdp_cd.style.color= "#000000";
								formObj.shpr_trdp_nm.style.color= "#000000";
								return;
							} else {
								formObj.shpr_trdp_cd.style.color= "#ff0000";
								formObj.shpr_trdp_nm.style.color= "#ff0000";
							}
						} else if (overDueAmt > 0 ) {
							var objArr=new Array();
							objArr[0]=doMoneyFmt(roundXL(Number(grandTotal),2).toFixed(2));     
							if(!confirm(getLabel2('COM_FRT_CFM007', objArr))){
								formObj.shpr_trdp_cd.value="";	//trdp_cd  AS param1
								formObj.shpr_trdp_nm.value="";		//eng_nm   AS param2
								formObj.shpr_trdp_addr.value="";		//eng_addr  AS param5
								formObj.shpr_trdp_cd.style.color= "#000000";
								formObj.shpr_trdp_nm.style.color= "#000000";
								return;
							} else {
								formObj.shpr_trdp_cd.style.color= "#ff0000";
								formObj.shpr_trdp_nm.style.color= "#ff0000";
							}
						} else {
							formObj.shpr_trdp_cd.style.color= "#000000";
							formObj.shpr_trdp_nm.style.color= "#000000";
						}
					} else {
						formObj.shpr_trdp_cd.style.color= "#000000";
						formObj.shpr_trdp_nm.style.color= "#000000";
					}
					
				//[20140307 OJG] #26863Credit Hold가 걸려 있는 TP가 SHIPPER, CONSIGNEE, NOTIFY 중 선택이 되면 Alert 추가. - Alert 내용 : “Credit Hold is on this Trade Partner. Do you want to proceed?”
				} else if(masterVals[5] == 'CH'){
					if(confirm(getLabel('COM_FRT_CFM005'))){ 
						//formObj.shpr_trdp_cd.className='search_form_alert';
						//formObj.shpr_trdp_nm.className='search_form_alert focusElem';
						//formObj.shpr_trdp_addr.className='search_form_alert';
						formObj.shpr_trdp_cd.style.color= "#ff0000";
						formObj.shpr_trdp_nm.style.color= "#ff0000";
						formObj.shpr_trdp_nm.className='search_form focusElem';
					}else{
						formObj.shpr_trdp_cd.value="";	//trdp_cd  AS param1
						formObj.shpr_trdp_nm.value="";		//eng_nm   AS param2
						formObj.shpr_trdp_addr.value="";		//eng_addr  AS param5
						formObj.shpr_trdp_cd.style.color= "#000000";
						formObj.shpr_trdp_nm.style.color= "#000000";
						return;
					}
					
				} else if(masterVals[5] == 'CO'){
					if(confirm(getLabel('COM_FRT_ALT001'))){ 
						//formObj.shpr_trdp_cd.className='search_form_alert';
						//formObj.shpr_trdp_nm.className='search_form_alert focusElem';
						//formObj.shpr_trdp_addr.className='search_form_alert';
						formObj.shpr_trdp_cd.style.color= "#ff0000";
						formObj.shpr_trdp_nm.style.color= "#ff0000";
						formObj.shpr_trdp_nm.className='search_form focusElem';
					}else{
						formObj.shpr_trdp_cd.value="";	//trdp_cd  AS param1
						formObj.shpr_trdp_nm.value="";		//eng_nm   AS param2
						formObj.shpr_trdp_addr.value="";		//eng_addr  AS param5
						formObj.shpr_trdp_cd.style.color= "#000000";
						formObj.shpr_trdp_nm.style.color= "#000000";
						return;
					}
					
					/*if(masterVals[6]!='' && masterVals[7]!='' && masterVals[6]<masterVals[7]){
						//COD
						alert(getLabel('COM_FRT_ALT001'));
						formObj.shpr_trdp_cd.style.color= "#ff0000";
						formObj.shpr_trdp_nm.style.color= "#ff0000";
					} else {
						formObj.shpr_trdp_cd.style.color= "#000000";
						formObj.shpr_trdp_nm.style.color= "#000000";
					}*/
					
				} else {
					formObj.shpr_trdp_cd.style.color= "#000000";
					formObj.shpr_trdp_nm.style.color= "#000000";
				}				
				formObj.shpr_trdp_cd.value=masterVals[0];	//trdp_cd  AS param1
				formObj.shpr_trdp_nm.value=masterVals[3];		//eng_nm   AS param2
				formObj.shpr_trdp_addr.value=masterVals[1];		//eng_addr  AS param5
				
				if(formObj.shpr_local_addr != null && formObj.shpr_local_addr != "")
					formObj.shpr_local_addr.value = masterVals[14]; // Local Address
				//48819
				if (cur_airSeaTp == "S" && cur_bndTp =="I") {
					if(masterVals[27] != ''){ 
						var objArr = new Array();
						objArr[0] = masterVals[27]; 
						
						if (masterVals[28] !='') {
							objArr[1] = masterVals[28];     
						} else {
							objArr[1] = "";     
							
						}
						alert(getLabel2('COM_FRT_ALT014', objArr));						
					}
				}
			}else if(CODETYPE =="trdpCode_consignee"){
				if(masterVals[5] == 'KO'){
					alert(getLabel('COM_FRT_ALT015'));
					formObj.cnee_trdp_cd.value="";	//trdp_cd  AS param1
					formObj.cnee_trdp_nm.value="";		//eng_nm   AS param2
					formObj.cnee_trdp_addr.value="";		//eng_addr  AS param5 
					return;
				}
				
				if(masterVals[5] == 'CO'){
					if(confirm(getLabel('COM_FRT_ALT001'))){ 
						formObj.cnee_trdp_nm.style.color= "#ff0000";
					}else{
						formObj.cnee_trdp_cd.value="";
						formObj.cnee_trdp_nm.value="";
						formObj.cnee_trdp_addr.value="";
						formObj.cnee_trdp_nm.style.color= "#000000";
						return;
					}
					
				} else {
					formObj.cnee_trdp_nm.style.color= "#000000";
				}
				
				formObj.cnee_trdp_cd.value=masterVals[0];	//trdp_cd  AS param1
				formObj.cnee_trdp_nm.value=masterVals[3];		//eng_nm   AS param2
				formObj.cnee_trdp_addr.value=masterVals[1];		//eng_addr  AS param5 
				
				/*if(masterVals[5] == 'CO' && masterVals[6]!='' && masterVals[7]!='' && masterVals[6]<masterVals[7]){
					//COD
					alert(getLabel('COM_FRT_ALT001'));
					formObj.cnee_trdp_nm.style.color= "#ff0000";
				} else {
					formObj.cnee_trdp_nm.style.color= "#000000";
				}*/
				
				//48819
				if (cur_airSeaTp == "S" && cur_bndTp =="I") {
					if(masterVals[27] != ''){ 
						var objArr = new Array();
						objArr[0] = masterVals[27]; 
						
						if (masterVals[28] !='') {
							objArr[1] = masterVals[28];     
						} else {
							objArr[1] = "";     
							
						}
						alert(getLabel2('COM_FRT_ALT014', objArr));						
					}
				}
			}else if(CODETYPE =="trdpCode_notify"){
				if(masterVals[5] == 'KO'){
					alert(getLabel('COM_FRT_ALT015'));
					formObj.ntfy_trdp_cd.value="";	//trdp_cd  AS param1
					formObj.ntfy_trdp_nm.value="";		//eng_nm   AS param2
					formObj.ntfy_trdp_addr.value="";		//eng_addr  AS param5 
					return;
				}
				
				if(masterVals[5] == 'CO'){
					if(confirm(getLabel('COM_FRT_ALT001'))){ 
						formObj.ntfy_trdp_nm.style.color= "#ff0000";
					}else{
						formObj.ntfy_trdp_cd.value="";
						formObj.ntfy_trdp_nm.value="";
						formObj.ntfy_trdp_addr.value="";
						formObj.ntfy_trdp_nm.style.color= "#000000";
						return;
					}
					
				} else {
					formObj.ntfy_trdp_nm.style.color= "#000000";
				}
				
				formObj.ntfy_trdp_cd.value=masterVals[0];	//trdp_cd  AS param1
				formObj.ntfy_trdp_nm.value=masterVals[3];		//eng_nm   AS param2
				formObj.ntfy_trdp_addr.value=masterVals[1];		//eng_addr  AS param5 
				
				/*if(masterVals[5] == 'CO' && masterVals[6]!='' && masterVals[7]!='' && masterVals[6]<masterVals[7]){
					//COD
					alert(getLabel('COM_FRT_ALT001'));
					formObj.ntfy_trdp_nm.style.color= "#ff0000";
				} else {
					formObj.ntfy_trdp_nm.style.color= "#000000";
				}*/
			}else if(CODETYPE =="trdpCode_ashipper"){
				if(masterVals[5] == 'KO'){
					alert(getLabel('COM_FRT_ALT015'));
					formObj.act_shpr_trdp_cd.value="";//trdp_cd  AS param1
					formObj.act_shpr_trdp_nm.value="";//eng_nm   AS param2
					formObj.act_shp_info.value="";//Company Description
					return;
				//#2737 [BNX] C/BROKER TO CHECK PAYMENT STATUS
				} else if(masterVals[5] == 'CH'){
					alert(getLabel('COM_FRT_CFM005'));
					try {creditOver=true;}catch(e){};
					formObj.act_shpr_trdp_cd.style.color= "#ff0000";
					formObj.act_shpr_trdp_nm.style.color= "#ff0000";
				} else if(masterVals[5] == 'CR'){
					
					//OFVFOUR-7911 [AIF] MANAGING/ALERT CUSTOMER'S OUTSTANDING (OVERDUE)
					if (TP_OVER_AMT_FLG != ""){
						var objArr=new Array();
						var overDueDateAmt = masterVals[38]==""?0:eval(masterVals[38]);
						if (overDueDateAmt != 0){
							objArr[0]=masterVals[3];
							objArr[1]=doMoneyFmt(roundXL(Number(overDueDateAmt),2).toFixed(2));
							if(!confirm(getLabel2('COM_FRT_CFM012', objArr))){
								formObj.act_shpr_trdp_cd.value="";
								formObj.act_shpr_trdp_nm.value=""
								formObj.act_shp_info.value="";
								formObj.act_shpr_trdp_cd.style.color= "#000000";
								formObj.act_shpr_trdp_nm.style.color= "#000000";
								return;
							} else {
								formObj.act_shpr_trdp_cd.style.color= "#ff0000";
								formObj.act_shpr_trdp_nm.style.color= "#ff0000";
							}
						}
					}

					var crdLmtAmt=masterVals[6]==""?0:eval(masterVals[6]);
					var curLmtAmt=masterVals[7]==""?0:eval(masterVals[7]);
					var balLmtAmt=crdLmtAmt - curLmtAmt;
					var overDueAmt=masterVals[20]==""?0:eval(masterVals[20]);
					var grandTotal=masterVals[22]==""?0:eval(masterVals[22]);
					
					//[20141217 YJW] #46708
					if(crdLmtAmt > 0) {
						if(overDueAmt > 0 && balLmtAmt < 0  ){
							var objArr=new Array();
							//objArr[0]=doMoneyFmt(roundXL(Number(crdLmtAmt),2).toFixed(2)); 
							//objArr[1]=doMoneyFmt(roundXL(Number(grandTotal),2).toFixed(2));
							objArr[0]=doMoneyFmt(roundXL(Number(balLmtAmt*(-1)),2).toFixed(2));
							if(!confirm(getLabel2('COM_FRT_CFM008', objArr))){
								formObj.act_shpr_trdp_cd.value="";	//trdp_cd  AS param1
								formObj.act_shpr_trdp_nm.value="";		//eng_nm   AS param2
								formObj.act_shp_info.value="";		//eng_addr  AS param5
								try {creditOver=false;}catch(e){};
								formObj.act_shpr_trdp_cd.style.color= "#000000";
								formObj.act_shpr_trdp_nm.style.color= "#000000";
								return;
							} else {
								try {creditOver=true;}catch(e){};
								formObj.act_shpr_trdp_cd.style.color= "#ff0000";
								formObj.act_shpr_trdp_nm.style.color= "#ff0000";
							}
						} else if (balLmtAmt < 0  ){
							var objArr=new Array();
							//objArr[0]=doMoneyFmt(roundXL(Number(crdLmtAmt),2).toFixed(2)); 
							//objArr[1]=doMoneyFmt(roundXL(Number(balLmtAmt*(-1)),2).toFixed(2));
							objArr[0]=doMoneyFmt(roundXL(Number(balLmtAmt*(-1)),2).toFixed(2));
							if(!confirm(getLabel2('COM_FRT_CFM006', objArr))){
								formObj.act_shpr_trdp_cd.value="";	//trdp_cd  AS param1
								formObj.act_shpr_trdp_nm.value="";		//eng_nm   AS param2
								formObj.act_shp_info.value="";		//eng_addr  AS param5
								try {creditOver=false;}catch(e){};
								formObj.act_shpr_trdp_cd.style.color= "#000000";
								formObj.act_shpr_trdp_nm.style.color= "#000000";
								return;
							} else {
								try {creditOver=true;}catch(e){};
								formObj.act_shpr_trdp_cd.style.color= "#ff0000";
								formObj.act_shpr_trdp_nm.style.color= "#ff0000";
							}
						} else if (overDueAmt > 0 ) {
							try {creditOver=false;}catch(e){};
							var objArr=new Array();
							objArr[0]=doMoneyFmt(roundXL(Number(grandTotal),2).toFixed(2));     
							if(!confirm(getLabel2('COM_FRT_CFM007', objArr))){
								formObj.act_shpr_trdp_cd.value="";	//trdp_cd  AS param1
								formObj.act_shpr_trdp_nm.value="";		//eng_nm   AS param2
								formObj.act_shp_info.value="";		//eng_addr  AS param5
								formObj.act_shpr_trdp_cd.style.color= "#000000";
								formObj.act_shpr_trdp_nm.style.color= "#000000";
								return;
							} else {
								formObj.act_shpr_trdp_cd.style.color= "#ff0000";
								formObj.act_shpr_trdp_nm.style.color= "#ff0000";
							}
						} else {
							try {creditOver=false;}catch(e){};
							formObj.act_shpr_trdp_cd.style.color= "#000000";
							formObj.act_shpr_trdp_nm.style.color= "#000000";
						}
					} else {
						try {creditOver=false;}catch(e){};
						formObj.act_shpr_trdp_cd.style.color= "#000000";
						formObj.act_shpr_trdp_nm.style.color= "#000000";
					}
					
				} else if(masterVals[5] == 'CO'){
					try {creditOver=false;}catch(e){};
					if(confirm(getLabel('COM_FRT_ALT001'))){
						formObj.act_shpr_trdp_cd.style.color= "#ff0000";
						formObj.act_shpr_trdp_nm.style.color= "#ff0000";
					}else{
						formObj.act_shpr_trdp_cd.value="";
						formObj.act_shpr_trdp_nm.value="";
						formObj.act_shp_info.value="";
						formObj.act_shpr_trdp_cd.style.color= "#000000";
						formObj.act_shpr_trdp_nm.style.color= "#000000";
						return;
					}
				} /*else {
					try {creditOver=false;}catch(e){};
					if(masterVals[6]!='' && masterVals[7]!='' && masterVals[6]<masterVals[7]){
						//COD
						alert(getLabel('COM_FRT_ALT001'));
						//try {creditOver=true;}catch(e){};
						formObj.act_shpr_trdp_cd.style.color= "#ff0000";
						formObj.act_shpr_trdp_nm.style.color= "#ff0000";
					} else {
						//try {creditOver=false;}catch(e){};
						formObj.act_shpr_trdp_cd.style.color= "#000000";
						formObj.act_shpr_trdp_nm.style.color= "#000000";
					}
				}*/
				formObj.act_shpr_trdp_cd.value=masterVals[0];//trdp_cd  AS param1
				//#3495 [BINEX] ADDRESS SHOULD BE SHOWN WITH NAME ON BL ENTRY #3462
				if(MULTI_LANGUAGE == 'Y'){	
					formObj.act_shpr_trdp_nm.value=masterVals[16];//loc_nm   AS param2
					formObj.act_shp_info.value=masterVals[14];//loc_addr					
				}else{
					formObj.act_shpr_trdp_nm.value=masterVals[3];//eng_nm   AS param2
					formObj.act_shp_info.value=masterVals[1];//eng_addr
				}
				// #25711 [SUNWAY]Sales Man 자동 설정
				setSalesMan(masterVals[0]);
				//OFVFOUR-7976: [MATRIX] ADDING CS PIC ON ALL B/L ENTRY AND TRADE PARTNER ENTRY SCREEN
				setCSMan(masterVals[0]);

				 // Contribution Margin 조회
				setCtrbMgn(masterVals[0]);
				
				//#2775 [BNX] DISABLED CUSTOMS BROKER STILL SHOWING (RELATED PARTNER)
				//#4691 SEA에만 적용되어있던 로직 AIR에도 추가
				if (cur_bndTp =="I") {
					setTimeout("cbCheck()",500);
				}				
				if(cur_bizTp!='M' && typeof setShipper === "function"){
					setShipper(masterVals[3],masterVals[1]);
				}
			}else if(CODETYPE =="trdpCode_liner"){
				if(masterVals[5] == 'KO'){
					alert(getLabel('COM_FRT_ALT015'));
					formObj.lnr_trdp_cd.value="";	//trdp_cd  AS param1
					formObj.lnr_trdp_nm.value="";	//eng_nm   AS param2
					return;
				}
				
				if(masterVals[5] == 'CO'){
					if(confirm(getLabel('COM_FRT_ALT001'))){
						formObj.lnr_trdp_cd.style.color= "#ff0000";
						formObj.lnr_trdp_nm.style.color= "#ff0000";
					}else{
						formObj.lnr_trdp_cd.value="";
						formObj.lnr_trdp_nm.value="";
						formObj.lnr_trdp_cd.style.color= "#000000";
						formObj.lnr_trdp_nm.style.color= "#000000";
						return;
					}
					
				} else {
					formObj.lnr_trdp_cd.style.color= "#000000";
					formObj.lnr_trdp_nm.style.color= "#000000";
				}

				formObj.lnr_trdp_cd.value=masterVals[0];//trdp_cd  AS param1
				formObj.lnr_trdp_nm.value=masterVals[3];//eng_nm   AS param2
				
				/*if(masterVals[6]!='' && masterVals[7]!='' && masterVals[6]<masterVals[7]){
					//COD
					alert(getLabel('COM_FRT_ALT001'));
					formObj.lnr_trdp_cd.style.color= "#ff0000";
					formObj.lnr_trdp_nm.style.color= "#ff0000";
				} else {
					formObj.lnr_trdp_cd.style.color= "#000000";
					formObj.lnr_trdp_nm.style.color= "#000000";
				}*/
			}else if(CODETYPE =="trdpCode_liner_search"){
			 
				formObj.lnr_trdp_cd.value=masterVals[0];	//trdp_cd  AS param1
				formObj.lnr_trdp_nm.value=masterVals[3];	//eng_nm   AS param2
			 
			}else if(CODETYPE =="trdpCode_air_liner"){
				if(masterVals[5] == 'KO'){
					alert(getLabel('COM_FRT_ALT015'));
					formObj.lnr_trdp_cd.value="";	//trdp_cd  AS param1
					formObj.lnr_trdp_nm.value="";	//eng_nm   AS param2
					return;
				}
				
				if(masterVals[5] == 'CO'){
					if(confirm(getLabel('COM_FRT_ALT001'))){
						formObj.lnr_trdp_cd.style.color= "#ff0000";
						formObj.lnr_trdp_nm.style.color= "#ff0000";
					}else{
						formObj.lnr_trdp_cd.value="";
						formObj.lnr_trdp_nm.value="";
						formObj.lnr_trdp_cd.style.color= "#000000";
						formObj.lnr_trdp_nm.style.color= "#000000";
						return;
					}
					
				} else {
					formObj.lnr_trdp_cd.style.color= "#000000";
					formObj.lnr_trdp_nm.style.color= "#000000";
				}
				
				formObj.lnr_trdp_cd.value=masterVals[0];	//trdp_cd  AS param1
				formObj.lnr_trdp_nm.value=masterVals[3];	//eng_nm   AS param2
				
				if(formObj.iss_trdp_cd.value=="" && formObj.iss_trdp_nm.value==""){
					formObj.iss_trdp_cd.value=masterVals[0];	//trdp_cd  AS param1
					formObj.iss_trdp_nm.value=masterVals[3];	//eng_nm   AS param2			
				}
				/*if(masterVals[6]!='' && masterVals[7]!='' && masterVals[6]<masterVals[7]){
					//COD
					alert(getLabel('COM_FRT_ALT001'));
					formObj.lnr_trdp_cd.style.color= "#ff0000";
					formObj.lnr_trdp_nm.style.color= "#ff0000";
				} else {
					formObj.lnr_trdp_cd.style.color= "#000000";
					formObj.lnr_trdp_nm.style.color= "#000000";
				}*/
			}else if(CODETYPE == "trdpCode_exp_air_carr"){
				if(masterVals[5] == 'KO'){
					alert(getLabel('COM_FRT_ALT015'));
					formObj.lnr_trdp_cd.value="";	//trdp_cd  AS param1
					formObj.lnr_trdp_nm.value="";	//eng_nm   AS param2
					return;
				}
				
				if(masterVals[5] == 'CO'){
					if(confirm(getLabel('COM_FRT_ALT001'))){
						formObj.lnr_trdp_cd.style.color= "#ff0000";
						formObj.lnr_trdp_nm.style.color= "#ff0000";
					}else{
						formObj.lnr_trdp_cd.value="";
						formObj.lnr_trdp_nm.value="";
						formObj.lnr_trdp_cd.style.color= "#000000";
						formObj.lnr_trdp_nm.style.color= "#000000";
						return;
					}
					
				} else {
					formObj.lnr_trdp_cd.style.color= "#000000";
					formObj.lnr_trdp_nm.style.color= "#000000";
				}
				
				formObj.lnr_trdp_cd.value=masterVals[0];	//trdp_cd  AS param1
				formObj.lnr_trdp_nm.value=masterVals[3];	//eng_nm   AS param2
				
				
				if(formObj.iss_trdp_cd.value=="" && formObj.iss_trdp_nm.value==""){
					formObj.iss_trdp_cd.value=masterVals[0];	//trdp_cd  AS param1
					formObj.iss_trdp_nm.value=masterVals[3];	//eng_nm   AS param2			
				}
				if(formObj.flt_no.value=='' && masterVals[17]!=''){
					formObj.flt_no.value=masterVals[17] + '-';
				}
				if(formObj.bl_no.value=='' && masterVals[18]!=''){
					formObj.bl_no.value=masterVals[18] + '-';
				}
				/*if(masterVals[6]!='' && masterVals[7]!='' && masterVals[6]<masterVals[7]){
					//COD
					alert(getLabel('COM_FRT_ALT001'));
					formObj.lnr_trdp_cd.style.color= "#ff0000";
					formObj.lnr_trdp_nm.style.color= "#ff0000";
				} else {
					formObj.lnr_trdp_cd.style.color= "#000000";
					formObj.lnr_trdp_nm.style.color= "#000000";
				}	*/
			}else if(CODETYPE == "trdpCode_himp_air_carr"){
				if(masterVals[5] == 'KO'){
					alert(getLabel('COM_FRT_ALT015'));
					formObj.lnr_trdp_cd.value="";	//trdp_cd  AS param1
					formObj.lnr_trdp_nm.value="";	//eng_nm   AS param2
					return;
				}
				
				if(masterVals[5] == 'CO'){
					if(confirm(getLabel('COM_FRT_ALT001'))){
						formObj.lnr_trdp_cd.style.color= "#ff0000";
						formObj.lnr_trdp_nm.style.color= "#ff0000";
					}else{
						formObj.lnr_trdp_cd.value="";
						formObj.lnr_trdp_nm.value="";
						formObj.lnr_trdp_cd.style.color= "#000000";
						formObj.lnr_trdp_nm.style.color= "#000000";
						return;
					}
					
				} else {
					formObj.lnr_trdp_cd.style.color= "#000000";
					formObj.lnr_trdp_nm.style.color= "#000000";
				}
				
				formObj.lnr_trdp_cd.value=masterVals[0];	//trdp_cd  AS param1
				formObj.lnr_trdp_nm.value=masterVals[3];	//eng_nm   AS param2
				
				if(formObj.flt_no.value=='' && masterVals[17]!=''){
					formObj.flt_no.value=masterVals[17] + '-';
				}
				if(formObj.bl_no.value=='' && masterVals[18]!=''){
					//formObj.bl_no.value = masterVals[18] + '-';
				}
				/*if(masterVals[6]!='' && masterVals[7]!='' && masterVals[6]<masterVals[7]){
					//COD
					alert(getLabel('COM_FRT_ALT001'));
					formObj.lnr_trdp_cd.style.color= "#ff0000";
					formObj.lnr_trdp_nm.style.color= "#ff0000";
				} else {
					formObj.lnr_trdp_cd.style.color= "#000000";
					formObj.lnr_trdp_nm.style.color= "#000000";
				}		*/
			}else if(CODETYPE == "trdpCode_imp_air_carr"){
				if(masterVals[5] == 'KO'){
					alert(getLabel('COM_FRT_ALT015'));
					formObj.lnr_trdp_cd.value="";	//trdp_cd  AS param1
					formObj.lnr_trdp_nm.value="";	//eng_nm   AS param2
					return;
				}
				
				if(masterVals[5] == 'CO'){
					if(confirm(getLabel('COM_FRT_ALT001'))){
						formObj.lnr_trdp_cd.style.color= "#ff0000";
						formObj.lnr_trdp_nm.style.color= "#ff0000";
					}else{
						formObj.lnr_trdp_cd.value="";
						formObj.lnr_trdp_nm.value="";
						formObj.lnr_trdp_cd.style.color= "#000000";
						formObj.lnr_trdp_nm.style.color= "#000000";
						return;
					}
					
				} else {
					formObj.lnr_trdp_cd.style.color= "#000000";
					formObj.lnr_trdp_nm.style.color= "#000000";
				}
				
				formObj.lnr_trdp_cd.value=masterVals[0];	//trdp_cd  AS param1
				formObj.lnr_trdp_nm.value=masterVals[3];	//eng_nm   AS param2
				
				if(formObj.flt_no.value=='' && masterVals[17]!=''){
					formObj.flt_no.value=masterVals[17] + '-';
				}
				if(formObj.bl_no.value=='' && masterVals[18]!=''){
					formObj.bl_no.value=masterVals[18] + '-';
				}
				/*if(masterVals[6]!='' && masterVals[7]!='' && masterVals[6]<masterVals[7]){
					//COD
					alert(getLabel('COM_FRT_ALT001'));
					formObj.lnr_trdp_cd.style.color= "#ff0000";
					formObj.lnr_trdp_nm.style.color= "#ff0000";
				} else {
					formObj.lnr_trdp_cd.style.color= "#000000";
					formObj.lnr_trdp_nm.style.color= "#000000";
				}	*/		
			}else if(CODETYPE =="trdpCode_sea_liner"){
				if(masterVals[5] == 'KO'){
					alert(getLabel('COM_FRT_ALT015'));
					formObj.lnr_trdp_cd.value="";	//trdp_cd  AS param1
					formObj.lnr_trdp_nm.value="";	//eng_nm   AS param2
					return;
				}
				
				if(masterVals[5] == 'CO'){
					if(confirm(getLabel('COM_FRT_ALT001'))){
						formObj.lnr_trdp_cd.style.color= "#ff0000";
						formObj.lnr_trdp_nm.style.color= "#ff0000";
					}else{
						formObj.lnr_trdp_cd.value="";
						formObj.lnr_trdp_nm.value="";
						formObj.lnr_trdp_cd.style.color= "#000000";
						formObj.lnr_trdp_nm.style.color= "#000000";
						return;
					}
					
				} else {
					formObj.lnr_trdp_cd.style.color= "#000000";
					formObj.lnr_trdp_nm.style.color= "#000000";
				}
				
				formObj.lnr_trdp_cd.value=masterVals[0];	//trdp_cd  AS param1
				formObj.lnr_trdp_nm.value=masterVals[3];	//eng_nm   AS param2
								
				// #23721 요건변경됨.
				// if(formObj.carr_trdp_cd.value == "" && formObj.carr_trdp_nm.value==""){
				//	formObj.carr_trdp_cd.value = masterVals[0];	//trdp_cd  AS param1
				//	formObj.carr_trdp_nm.value = masterVals[3];	//eng_nm   AS param2			
				// }
				/*if(masterVals[6]!='' && masterVals[7]!='' && masterVals[6]<masterVals[7]){
					//COD
					alert(getLabel('COM_FRT_ALT001'));
					formObj.lnr_trdp_cd.style.color= "#ff0000";
					formObj.lnr_trdp_nm.style.color= "#ff0000";
				} else {
					formObj.lnr_trdp_cd.style.color= "#000000";
					formObj.lnr_trdp_nm.style.color= "#000000";
				}*/
			}else if(CODETYPE =="trdpCode_console"){
				if(masterVals[5] == 'KO'){
					alert(getLabel('COM_FRT_ALT015'));
					formObj.agt_trdp_cd.value="";	//trdp_cd  AS param1
					formObj.agt_trdp_nm.value="";	//eng_nm   AS param2
					return;
				}
				
				if(masterVals[5] == 'CO'){
					if(confirm(getLabel('COM_FRT_ALT001'))){
						formObj.agt_trdp_cd.style.color= "#ff0000";
						formObj.agt_trdp_nm.style.color= "#ff0000";
					}else{
						formObj.agt_trdp_cd.value="";
						formObj.agt_trdp_nm.value="";
						formObj.agt_trdp_cd.style.color= "#000000";
						formObj.agt_trdp_nm.style.color= "#000000";
						return;
					}
					
				} else {
					formObj.agt_trdp_cd.style.color= "#000000";
					formObj.agt_trdp_nm.style.color= "#000000";
				}
				
				formObj.agt_trdp_cd.value=masterVals[0];	//trdp_cd  AS param1
				formObj.agt_trdp_nm.value=masterVals[3];	//eng_nm   AS param2
				
				/*if(masterVals[6]!='' && masterVals[7]!='' && masterVals[6]<masterVals[7]){
					//COD
					alert(getLabel('COM_FRT_ALT001'));
					formObj.agt_trdp_cd.style.color= "#ff0000";
					formObj.agt_trdp_nm.style.color= "#ff0000";
				} else {
					formObj.agt_trdp_cd.style.color= "#000000";
					formObj.agt_trdp_nm.style.color= "#000000";
				}*/
			}else if(CODETYPE =="trdpCode_partner"){
				
				formObj.prnr_trdp_cd.style.color= "#000000";
				formObj.prnr_trdp_nm.style.color= "#000000";
				
				if(masterVals[5]=='CR'){
					
					//OFVFOUR-7911 [AIF] MANAGING/ALERT CUSTOMER'S OUTSTANDING (OVERDUE)
					if (TP_OVER_AMT_FLG != ""){
						var objArr=new Array();
						var overDueDateAmt = masterVals[38]==""?0:eval(masterVals[38]);
						if ( overDueDateAmt != 0){
							objArr[0]=masterVals[3];
						objArr[1]=doMoneyFmt(roundXL(Number(overDueDateAmt),2).toFixed(2));
						if(!confirm(getLabel2('COM_FRT_CFM012', objArr))){
							formObj.prnr_trdp_cd.value="";
							formObj.prnr_trdp_nm.value="";
							formObj.prnr_trdp_addr.value="";
							formObj.prnr_trdp_cd.style.color= "#000000";
							formObj.prnr_trdp_nm.style.color= "#000000";
							return;
						} else {
							formObj.prnr_trdp_cd.style.color= "#ff0000";
							formObj.prnr_trdp_nm.style.color= "#ff0000";
						}
						}
					}

					//[20140317 OYH] #27474
					var crdLmtAmt=masterVals[6]==""?0:eval(masterVals[6]);
					var curLmtAmt=masterVals[7]==""?0:eval(masterVals[7]);
					var balLmtAmt=crdLmtAmt - curLmtAmt;
					var overDueAmt=masterVals[20]==""?0:eval(masterVals[20]);
					var grandTotal=masterVals[22]==""?0:eval(masterVals[22]);
					
					//[20141217 YJW] #46708
					if(crdLmtAmt > 0) {
						if(overDueAmt > 0 && balLmtAmt < 0){
							var objArr=new Array();
							//objArr[0]=doMoneyFmt(roundXL(Number(crdLmtAmt),2).toFixed(2)); 
							//objArr[1]=doMoneyFmt(roundXL(Number(grandTotal),2).toFixed(2));
							objArr[0]=doMoneyFmt(roundXL(Number(balLmtAmt*(-1)),2).toFixed(2));
							if(!confirm(getLabel2('COM_FRT_CFM008', objArr))){
								formObj.prnr_trdp_cd.value="";//trdp_cd  AS param1
								formObj.prnr_trdp_nm.value="";//eng_nm   AS param2
								formObj.prnr_trdp_addr.value="";//eng_addr
								formObj.prnr_trdp_cd.style.color= "#000000";
								formObj.prnr_trdp_nm.style.color= "#000000";
								return;
							} else {
								formObj.prnr_trdp_cd.style.color= "#ff0000";
								formObj.prnr_trdp_nm.style.color= "#ff0000";
							}
						} else if (balLmtAmt < 0){
							var objArr=new Array();
							//objArr[0]=doMoneyFmt(roundXL(Number(crdLmtAmt),2).toFixed(2)); 
							//objArr[1]=doMoneyFmt(roundXL(Number(balLmtAmt*(-1)),2).toFixed(2));
							objArr[0]=doMoneyFmt(roundXL(Number(balLmtAmt*(-1)),2).toFixed(2));
							if(!confirm(getLabel2('COM_FRT_CFM006', objArr))){
								formObj.prnr_trdp_cd.value="";//trdp_cd  AS param1
								formObj.prnr_trdp_nm.value="";//eng_nm   AS param2
								formObj.prnr_trdp_addr.value="";//eng_addr
								formObj.prnr_trdp_cd.style.color= "#000000";
								formObj.prnr_trdp_nm.style.color= "#000000";
								return;
							} else {
								formObj.prnr_trdp_cd.style.color= "#ff0000";
								formObj.prnr_trdp_nm.style.color= "#ff0000";
							}
						} else if (overDueAmt > 0) {
							var objArr=new Array();
							objArr[0]=doMoneyFmt(roundXL(Number(grandTotal),2).toFixed(2));     
							if(!confirm(getLabel2('COM_FRT_CFM007', objArr))){
								formObj.prnr_trdp_cd.value="";//trdp_cd  AS param1
								formObj.prnr_trdp_nm.value="";//eng_nm   AS param2
								formObj.prnr_trdp_addr.value="";//eng_addr
								formObj.prnr_trdp_cd.style.color= "#000000";
								formObj.prnr_trdp_nm.style.color= "#000000";
								return;
							} else {
								formObj.prnr_trdp_cd.style.color= "#ff0000";
								formObj.prnr_trdp_nm.style.color= "#ff0000";
							}
						}
					}
				}
				formObj.prnr_trdp_cd.value=masterVals[0];//trdp_cd  AS param1
				if(formObj.prnr_trdp_nm.getAttribute("dataformat") == "multiLanguage"){
					formObj.prnr_trdp_nm.value=masterVals[16];//loc_nm   AS param2
					formObj.prnr_trdp_addr.value=masterVals[14];//loc_addr					
				}else{
					formObj.prnr_trdp_nm.value=masterVals[3];//eng_nm   AS param2
					formObj.prnr_trdp_addr.value=masterVals[1];//eng_addr
				}
				
				if(formObj.h_profit_share != undefined){
					if(masterVals[26] != 0 && masterVals[26] != ''){
						formObj.profit_share.value=masterVals[26];//profit share
					} else {
						var org_profit_share = formObj.h_profit_share.value;
						formObj.profit_share.value = org_profit_share;
					}
				}
				
				// #25711 [SUNWAY]Sales Man 자동 설정
				setSalesMan(masterVals[0], "Y");
				//OFVFOUR-7976: [MATRIX] ADDING CS PIC ON ALL B/L ENTRY AND TRADE PARTNER ENTRY SCREEN
				setCSMan(masterVals[0], "Y");
				
				/* #27773 COD 출력 조건이 잘못되어 있음 
				if(masterVals[5]=='CR'){
					if(masterVals[6]!='' && masterVals[7]!='' && masterVals[6]<masterVals[7]){
						//COD
						alert(getLabel('COM_FRT_ALT001'));
					}
				}else{
					alert(getLabel('COM_FRT_ALT007') + " - " + masterVals[5]);
				}
				*/
			}else if(CODETYPE =="trdpCode_aircmp"){
				if(masterVals[5] == 'KO'){
					alert(getLabel('COM_FRT_ALT015'));
					formObj.prnr_trdp_cd.value="";//trdp_cd  AS param1
					formObj.prnr_trdp_nm.value="";//eng_nm   AS param2
					return;
				}
				
				if(masterVals[5] == 'CO'){
					if(confirm(getLabel('COM_FRT_ALT001'))){
						formObj.prnr_trdp_cd.style.color= "#ff0000";
						formObj.prnr_trdp_nm.style.color= "#ff0000";
					}else{
						formObj.prnr_trdp_cd.value="";
						formObj.prnr_trdp_nm.value="";
						formObj.prnr_trdp_cd.style.color= "#000000";
						formObj.prnr_trdp_nm.style.color= "#000000";
						return;
					}
					
				} else {
					formObj.prnr_trdp_cd.style.color= "#000000";
					formObj.prnr_trdp_nm.style.color= "#000000";
				}
				
				formObj.prnr_trdp_cd.value=masterVals[0];//trdp_cd  AS param1
				if(formObj.prnr_trdp_nm.getAttribute("dataformat") == "multiLanguage"){
					formObj.prnr_trdp_nm.value=masterVals[16];//loc_nm   AS param2
				}else{
					formObj.prnr_trdp_nm.value=masterVals[3];//eng_nm   AS param2
				}
				/*if(masterVals[6]!='' && masterVals[7]!='' && masterVals[6]<masterVals[7]){
					//COD
					alert(getLabel('COM_FRT_ALT001'));
					formObj.prnr_trdp_cd.style.color= "#ff0000";
					formObj.prnr_trdp_nm.style.color= "#ff0000";
				} else {
					formObj.prnr_trdp_cd.style.color= "#000000";
					formObj.prnr_trdp_nm.style.color= "#000000";
				}*/
			}else if(CODETYPE =="trdpCode_agent"){
				if(masterVals[5] == 'KO'){
					alert(getLabel('COM_FRT_ALT015'));
					formObj.agent_trdp_cd.value="";//trdp_cd  AS param1
					formObj.agent_trdp_nm.value="";//eng_nm   AS param2
					formObj.agent_trdp_addr.value="";//eng_addr
					return;
				}
				
				if(cur_airSeaTp == "S" && cur_bizTp == "M"){
					 if(masterVals[5] == 'CR'){

						//OFVFOUR-7911 [AIF] MANAGING/ALERT CUSTOMER'S OUTSTANDING (OVERDUE)
						if (TP_OVER_AMT_FLG != ""){
							var objArr=new Array();
							var overDueDateAmt = masterVals[38]==""?0:eval(masterVals[38]);
							if ( overDueDateAmt != 0){
								objArr[0]=masterVals[3];
							objArr[1]=doMoneyFmt(roundXL(Number(overDueDateAmt),2).toFixed(2));
							if(!confirm(getLabel2('COM_FRT_CFM012', objArr))){
								formObj.agent_trdp_cd.value="";
								formObj.agent_trdp_nm.value="";
								formObj.agent_trdp_addr.value="";
								formObj.agent_trdp_cd.style.color= "#000000";
								formObj.agent_trdp_nm.style.color= "#000000";
								return;
							} else {
								formObj.agent_trdp_cd.style.color= "#ff0000";
								formObj.agent_trdp_nm.style.color= "#ff0000";
							}
							}
						}

						 var crdLmtAmt=masterVals[6]==""?0:eval(masterVals[6]);
						 var curLmtAmt=masterVals[7]==""?0:eval(masterVals[7]);
						 var balLmtAmt=crdLmtAmt - curLmtAmt;
						 var overDueAmt=masterVals[20]==""?0:eval(masterVals[20]);
						 var grandTotal=masterVals[22]==""?0:eval(masterVals[22]);
						
						 //[20141217 YJW] #46708
						 if(crdLmtAmt > 0) {
							 if(overDueAmt > 0 && balLmtAmt < 0  ){
								 var objArr=new Array();
								 //objArr[0]=doMoneyFmt(roundXL(Number(crdLmtAmt),2).toFixed(2)); 
								 //objArr[1]=doMoneyFmt(roundXL(Number(grandTotal),2).toFixed(2));
								 objArr[0]=doMoneyFmt(roundXL(Number(balLmtAmt*(-1)),2).toFixed(2));
								 if(!confirm(getLabel2('COM_FRT_CFM008', objArr))){
									 formObj.agent_trdp_cd.value="";	//trdp_cd  AS param1
									 formObj.agent_trdp_nm.value="";		//eng_nm   AS param2
									 formObj.agent_trdp_addr.value="";		//eng_addr  AS param5
									 formObj.agent_trdp_cd.style.color= "#000000";
									 formObj.agent_trdp_nm.style.color= "#000000";
									 return;
								 } else {
									 formObj.agent_trdp_cd.style.color= "#ff0000";
									 formObj.agent_trdp_nm.style.color= "#ff0000";
								 }
							 } else if (balLmtAmt < 0  ){
								 var objArr=new Array();
								 //objArr[0]=doMoneyFmt(roundXL(Number(crdLmtAmt),2).toFixed(2)); 
								 //objArr[1]=doMoneyFmt(roundXL(Number(balLmtAmt*(-1)),2).toFixed(2));
								 objArr[0]=doMoneyFmt(roundXL(Number(balLmtAmt*(-1)),2).toFixed(2));
								 if(!confirm(getLabel2('COM_FRT_CFM006', objArr))){
									 formObj.agent_trdp_cd.value="";	//trdp_cd  AS param1
									 formObj.agent_trdp_nm.value="";		//eng_nm   AS param2
									 formObj.agent_trdp_addr.value="";		//eng_addr  AS param5
									 formObj.agent_trdp_cd.style.color= "#000000";
									 formObj.agent_trdp_nm.style.color= "#000000";
									 return;
								 } else {
									 formObj.agent_trdp_cd.style.color= "#ff0000";
									 formObj.agent_trdp_nm.style.color= "#ff0000";
								 }
							 } else if (overDueAmt > 0 ) {
								 var objArr=new Array();
								 objArr[0]=doMoneyFmt(roundXL(Number(grandTotal),2).toFixed(2));     
								 if(!confirm(getLabel2('COM_FRT_CFM007', objArr))){
									 formObj.agent_trdp_cd.value="";	//trdp_cd  AS param1
									 formObj.agent_trdp_nm.value="";		//eng_nm   AS param2
									 formObj.agent_trdp_addr.value="";		//eng_addr  AS param5
									 formObj.agent_trdp_cd.style.color= "#000000";
									 formObj.agent_trdp_nm.style.color= "#000000";
									 return;
								 } else {
									 formObj.agent_trdp_cd.style.color= "#ff0000";
									 formObj.agent_trdp_nm.style.color= "#ff0000";
								 }
							 } else {
								 formObj.agent_trdp_cd.style.color= "#000000";
								 formObj.agent_trdp_nm.style.color= "#000000";
							 }
						 } else {
							 formObj.agent_trdp_cd.style.color= "#000000";
							 formObj.agent_trdp_nm.style.color= "#000000";
						 }
						 
					 } else if(masterVals[5] == 'CO'){
						 if(confirm(getLabel('COM_FRT_ALT001'))){
							 formObj.agent_trdp_cd.style.color= "#ff0000";
							 formObj.agent_trdp_nm.style.color= "#ff0000";
						 }else{
							 formObj.agent_trdp_cd.value="";
							 formObj.agent_trdp_nm.value="";
							 formObj.agent_trdp_addr.value="";
							 formObj.agent_trdp_cd.style.color= "#000000";
							 formObj.agent_trdp_nm.style.color= "#000000";
							 return;
						 }
					 } /*else {
						 if(masterVals[6]!='' && masterVals[7]!='' && masterVals[6]<masterVals[7]){
							 //COD
							 alert(getLabel('COM_FRT_ALT001'));
							 formObj.agent_trdp_cd.style.color= "#ff0000";
							 formObj.agent_trdp_nm.style.color= "#ff0000";
						 } else {
							 formObj.agent_trdp_cd.style.color= "#000000";
							 formObj.agent_trdp_nm.style.color= "#000000";
						 }
					 }*/
					formObj.agent_trdp_cd.value=masterVals[0];//trdp_cd  AS param1
					formObj.agent_trdp_nm.value=masterVals[3];//eng_nm   AS param2
					formObj.agent_trdp_addr.value=masterVals[1];//eng_addr
					
				} else {
					if(masterVals[5] == 'CO'){
						 if(confirm(getLabel('COM_FRT_ALT001'))){
							 formObj.agent_trdp_cd.style.color= "#ff0000";
							 formObj.agent_trdp_nm.style.color= "#ff0000";
						 }else{
							 formObj.agent_trdp_cd.value="";
							 formObj.agent_trdp_nm.value="";
							 formObj.agent_trdp_addr.value="";
							 formObj.agent_trdp_cd.style.color= "#000000";
							 formObj.agent_trdp_nm.style.color= "#000000";
							 return;
						 }
					 }

					formObj.agent_trdp_cd.value=masterVals[0];//trdp_cd  AS param1
					formObj.agent_trdp_nm.value=masterVals[3];//eng_nm   AS param2
					formObj.agent_trdp_addr.value=masterVals[1];//eng_addr
					
					/*if(masterVals[6]!='' && masterVals[7]!='' && masterVals[6]<masterVals[7]){
						//COD
						alert(getLabel('COM_FRT_ALT001'));
						formObj.agent_trdp_cd.style.color= "#ff0000";
						formObj.agent_trdp_nm.style.color= "#ff0000";
					} else {
						formObj.agent_trdp_cd.style.color= "#000000";
						formObj.agent_trdp_nm.style.color= "#000000";
					}*/
				}
				
			}else if(CODETYPE =="trdpCode_third"){
				if(masterVals[5] == 'KO'){
					alert(getLabel('COM_FRT_ALT015'));
					formObj.third_trdp_cd.value="";//trdp_cd  AS param1
					formObj.third_trdp_nm.value="";//eng_nm   AS param2
					formObj.third_trdp_addr.value="";//eng_addr
					return;
				}
				
				if(masterVals[5] == 'CO'){
					if(confirm(getLabel('COM_FRT_ALT001'))){
						formObj.third_trdp_cd.style.color= "#ff0000";
						formObj.third_trdp_nm.style.color= "#ff0000";
					}else{
						formObj.third_trdp_cd.value="";
						formObj.third_trdp_nm.value="";
						formObj.third_trdp_addr.value="";
						formObj.third_trdp_cd.style.color= "#000000";
						formObj.third_trdp_nm.style.color= "#000000";
						return;
					}
					
				} else {
					formObj.third_trdp_cd.style.color= "#000000";
					formObj.third_trdp_nm.style.color= "#000000";
				}
				
				formObj.third_trdp_cd.value=masterVals[0];//trdp_cd  AS param1
				formObj.third_trdp_nm.value=masterVals[3];//eng_nm   AS param2
				formObj.third_trdp_addr.value=masterVals[1];//eng_addr
				
				/*if(masterVals[6]!='' && masterVals[7]!='' && masterVals[6]<masterVals[7]){
					//COD
					alert(getLabel('COM_FRT_ALT001'));
					formObj.third_trdp_cd.style.color= "#ff0000";
					formObj.third_trdp_nm.style.color= "#ff0000";
				} else {
					formObj.third_trdp_cd.style.color= "#000000";
					formObj.third_trdp_nm.style.color= "#000000";
				}*/
			}else if(CODETYPE =="trdpCode_partner2"){
				if(masterVals[5] == 'KO'){
					alert(getLabel('COM_FRT_ALT015'));
					formObj.prnr_trdp_cd2.value="";//trdp_cd  AS param1
					formObj.prnr_trdp_nm2.value="";//eng_nm   AS param2
					formObj.prnr_trdp_addr2.value="";//eng_addr
					return;
				}
				
				if(cur_bizTp == "M"){
					 if(masterVals[5] == 'CR'){

						//OFVFOUR-7911 [AIF] MANAGING/ALERT CUSTOMER'S OUTSTANDING (OVERDUE)
						if (TP_OVER_AMT_FLG != ""){
							var objArr=new Array();
							var overDueDateAmt = masterVals[38]==""?0:eval(masterVals[38]);
							if (overDueDateAmt != 0){
								objArr[0]=masterVals[3];
								objArr[1]=doMoneyFmt(roundXL(Number(overDueDateAmt),2).toFixed(2));
								if(!confirm(getLabel2('COM_FRT_CFM012', objArr))){
									formObj.prnr_trdp_cd2.value="";
									formObj.prnr_trdp_nm2.value="";
									formObj.prnr_trdp_addr2.value="";
									formObj.prnr_trdp_cd2.style.color= "#000000";
									formObj.prnr_trdp_nm2.style.color= "#000000";
									return;
								} else {
									formObj.prnr_trdp_cd2.style.color= "#ff0000";
									formObj.prnr_trdp_nm2.style.color= "#ff0000";
								}
							}
						}		

						 var crdLmtAmt=masterVals[6]==""?0:eval(masterVals[6]);
						 var curLmtAmt=masterVals[7]==""?0:eval(masterVals[7]);
						 var balLmtAmt=crdLmtAmt - curLmtAmt;
						 var overDueAmt=masterVals[20]==""?0:eval(masterVals[20]);
						 var grandTotal=masterVals[22]==""?0:eval(masterVals[22]);
						
						 //[20141217 YJW] #46708
						 if(crdLmtAmt > 0) {
							 if(overDueAmt > 0 && balLmtAmt < 0  ){
								 var objArr=new Array();
								 //objArr[0]=doMoneyFmt(roundXL(Number(crdLmtAmt),2).toFixed(2)); 
								 //objArr[1]=doMoneyFmt(roundXL(Number(grandTotal),2).toFixed(2));
								 objArr[0]=doMoneyFmt(roundXL(Number(balLmtAmt*(-1)),2).toFixed(2));
								 if(!confirm(getLabel2('COM_FRT_CFM008', objArr))){
									 formObj.prnr_trdp_cd2.value="";	//trdp_cd  AS param1
									 formObj.prnr_trdp_nm2.value="";		//eng_nm   AS param2
									 formObj.prnr_trdp_addr2.value="";		//eng_addr  AS param5
									 formObj.prnr_trdp_cd2.style.color= "#000000";
									 formObj.prnr_trdp_nm2.style.color= "#000000";
									 return;
								 } else {
									 formObj.prnr_trdp_cd2.style.color= "#ff0000";
									 formObj.prnr_trdp_nm2.style.color= "#ff0000";
								 }
							 } else if (balLmtAmt < 0  ){
								 var objArr=new Array();
								 //objArr[0]=doMoneyFmt(roundXL(Number(crdLmtAmt),2).toFixed(2)); 
								 //objArr[1]=doMoneyFmt(roundXL(Number(balLmtAmt*(-1)),2).toFixed(2));
								 objArr[0]=doMoneyFmt(roundXL(Number(balLmtAmt*(-1)),2).toFixed(2));
								 if(!confirm(getLabel2('COM_FRT_CFM006', objArr))){
									 formObj.prnr_trdp_cd2.value="";	//trdp_cd  AS param1
									 formObj.prnr_trdp_nm2.value="";		//eng_nm   AS param2
									 formObj.prnr_trdp_addr2.value="";		//eng_addr  AS param5
									 formObj.prnr_trdp_cd2.style.color= "#000000";
									 formObj.prnr_trdp_nm2.style.color= "#000000";
									 return;
								 } else {
									 formObj.prnr_trdp_cd2.style.color= "#ff0000";
									 formObj.prnr_trdp_nm2.style.color= "#ff0000";
								 }
							 } else if (overDueAmt > 0 ) {
								 var objArr=new Array();
								 objArr[0]=doMoneyFmt(roundXL(Number(grandTotal),2).toFixed(2));     
								 if(!confirm(getLabel2('COM_FRT_CFM007', objArr))){
									 formObj.prnr_trdp_cd2.value="";	//trdp_cd  AS param1
									 formObj.prnr_trdp_nm2.value="";		//eng_nm   AS param2
									 formObj.prnr_trdp_addr2.value="";		//eng_addr  AS param5
									 formObj.prnr_trdp_cd2.style.color= "#000000";
									 formObj.prnr_trdp_nm2.style.color= "#000000";
									 return;
								 } else {
									 formObj.prnr_trdp_cd2.style.color= "#ff0000";
									 formObj.prnr_trdp_nm2.style.color= "#ff0000";
								 }
							 } else {
								 formObj.prnr_trdp_cd2.style.color= "#000000";
								 formObj.prnr_trdp_nm2.style.color= "#000000";
							 }
						 } else {
							 formObj.prnr_trdp_cd2.style.color= "#000000";
							 formObj.prnr_trdp_nm2.style.color= "#000000";
						 }
						 
					 } else if(masterVals[5] == 'CO'){
						 if(confirm(getLabel('COM_FRT_ALT001'))){
							 formObj.prnr_trdp_cd2.style.color= "#ff0000";
							 formObj.prnr_trdp_nm2.style.color= "#ff0000";
						 }else{
							 formObj.prnr_trdp_cd2.value="";
							 formObj.prnr_trdp_nm2.value="";
							 formObj.prnr_trdp_addr2.value="";
							 formObj.prnr_trdp_cd2.style.color= "#000000";
							 formObj.prnr_trdp_nm2.style.color= "#000000";
							 return;
						 }
					 } /*else {
						 if(masterVals[6]!='' && masterVals[7]!='' && masterVals[6]<masterVals[7]){
							 //COD
							 alert(getLabel('COM_FRT_ALT001'));
							 formObj.prnr_trdp_cd2.style.color= "#ff0000";
							 formObj.prnr_trdp_nm2.style.color= "#ff0000";
						 } else {
							 formObj.prnr_trdp_cd2.style.color= "#000000";
							 formObj.prnr_trdp_nm2.style.color= "#000000";
						 }
					 }*/
					 
					formObj.prnr_trdp_cd2.value=masterVals[0];//trdp_cd  AS param1
					
					formObj.prnr_trdp_nm2.value=masterVals[3];//eng_nm   AS param2
					formObj.prnr_trdp_addr2.value=masterVals[1];//eng_addr
					
				} else {
					if(masterVals[5] == 'CO'){
						 if(confirm(getLabel('COM_FRT_ALT001'))){
							 formObj.prnr_trdp_cd2.style.color= "#ff0000";
							 formObj.prnr_trdp_nm2.style.color= "#ff0000";
						 }else{
							 formObj.prnr_trdp_cd2.value="";
							 formObj.prnr_trdp_nm2.value="";
							 formObj.prnr_trdp_addr2.value="";
							 formObj.prnr_trdp_cd2.style.color= "#000000";
							 formObj.prnr_trdp_nm2.style.color= "#000000";
							 return;
						 }
					 }
					
					formObj.prnr_trdp_cd2.value=masterVals[0];//trdp_cd  AS param1
					formObj.prnr_trdp_nm2.value=masterVals[3];//eng_nm   AS param2
					formObj.prnr_trdp_addr2.value=masterVals[1];//eng_addr
					/*if(masterVals[6]!='' && masterVals[7]!='' && masterVals[6]<masterVals[7]){
						//COD
						alert(getLabel('COM_FRT_ALT001'));
						formObj.prnr_trdp_cd2.style.color= "#ff0000";
						formObj.prnr_trdp_nm2.style.color= "#ff0000";
					} else {
						formObj.prnr_trdp_cd2.style.color= "#000000";
						formObj.prnr_trdp_nm2.style.color= "#000000";
					}*/
				}
			}else if(CODETYPE =="trdpCode_rcv"){
				if(masterVals[5] == 'KO'){
					alert(getLabel('COM_FRT_ALT015'));
					formObj.rcv_wh_cd.value="";//trdp_cd  AS param1
					formObj.rcv_wh_nm.value="";//eng_nm   AS param2
					return;
				}
				
				if(masterVals[5] == 'CO'){
					if(confirm(getLabel('COM_FRT_ALT001'))){
						formObj.rcv_wh_cd.style.color= "#ff0000";
						formObj.rcv_wh_nm.style.color= "#ff0000";
					}else{
						formObj.rcv_wh_cd.value="";
						formObj.rcv_wh_nm.value="";
						formObj.rcv_wh_cd.style.color= "#000000";
						formObj.rcv_wh_nm.style.color= "#000000";
						return;
					}
					
				} else {
					formObj.rcv_wh_cd.style.color= "#000000";
					formObj.rcv_wh_nm.style.color= "#000000";
				}

				formObj.rcv_wh_cd.value=masterVals[0];//trdp_cd  AS param1
				//#3495 [BINEX] ADDRESS SHOULD BE SHOWN WITH NAME ON BL ENTRY #3462
				if(MULTI_LANGUAGE == 'Y'){
					formObj.rcv_wh_nm.value=masterVals[16];//loc_nm   AS param2
				}else{
					formObj.rcv_wh_nm.value=masterVals[3];//eng_nm   AS param2
				}
				
				/*if(masterVals[6]!='' && masterVals[7]!='' && masterVals[6]<masterVals[7]){
					//COD
					alert(getLabel('COM_FRT_ALT001'));
					formObj.rcv_wh_cd.style.color= "#ff0000";
					formObj.rcv_wh_nm.style.color= "#ff0000";
				} else {
					formObj.rcv_wh_cd.style.color= "#000000";
					formObj.rcv_wh_nm.style.color= "#000000";
				}*/
			}else if(CODETYPE =="trdpCode_pu"){
				if(masterVals[5] == 'KO'){
					alert(getLabel('COM_FRT_ALT015'));
					formObj.pu_trdp_cd.value="";//trdp_cd  AS param1
					formObj.pu_trdp_nm.value="";//eng_nm   AS param2
					return;
				}
				
				if(masterVals[5] == 'CO'){
					if(confirm(getLabel('COM_FRT_ALT001'))){
						formObj.pu_trdp_cd.style.color= "#ff0000";
						formObj.pu_trdp_nm.style.color= "#ff0000";
					}else{
						formObj.pu_trdp_cd.value="";
						formObj.pu_trdp_nm.value="";
						formObj.pu_trdp_cd.style.color= "#000000";
						formObj.pu_trdp_nm.style.color= "#000000";
						return;
					}
					
				} else {
					formObj.pu_trdp_cd.style.color= "#000000";
					formObj.pu_trdp_nm.style.color= "#000000";
				}
				
				formObj.pu_trdp_cd.value=masterVals[0];//trdp_cd  AS param1
				formObj.pu_trdp_nm.value=masterVals[3];//eng_nm   AS param2
				
				formObj.pu_trdp_cd.value=masterVals[0];//trdp_cd  AS param1
				//#3495 [BINEX] ADDRESS SHOULD BE SHOWN WITH NAME ON BL ENTRY #3462
				if(MULTI_LANGUAGE == 'Y'){
					formObj.pu_trdp_nm.value=masterVals[16];//loc_nm   AS param2
				}else{
					formObj.pu_trdp_nm.value=masterVals[3];//eng_nm   AS param2
				}
				
				
				
				/*if(masterVals[6]!='' && masterVals[7]!='' && masterVals[6]<masterVals[7]){
					//COD
					alert(getLabel('COM_FRT_ALT001'));
					formObj.pu_trdp_cd.style.color= "#ff0000";
					formObj.pu_trdp_nm.style.color= "#ff0000";
				} else {
					formObj.pu_trdp_cd.style.color= "#000000";
					formObj.pu_trdp_nm.style.color= "#000000";
				}*/
			}else if(CODETYPE =="trdpCode_cgo_pu"){
				if(masterVals[5] == 'KO'){
					alert(getLabel('COM_FRT_ALT015'));
					formObj.cgo_pu_trdp_cd.value="";//trdp_cd  AS param1
					formObj.cgo_pu_trdp_nm.value="";//eng_nm   AS param2
					formObj.cgo_pu_trdp_addr.value="";
					return;
				}
				
				if(masterVals[5] == 'CO'){
					if(confirm(getLabel('COM_FRT_ALT001'))){
						formObj.cgo_pu_trdp_cd.style.color= "#ff0000";
						formObj.cgo_pu_trdp_nm.style.color= "#ff0000";
					}else{
						formObj.cgo_pu_trdp_cd.value="";
						formObj.cgo_pu_trdp_nm.value="";
						formObj.cgo_pu_trdp_addr.value="";
						formObj.cgo_pu_trdp_cd.style.color= "#000000";
						formObj.cgo_pu_trdp_nm.style.color= "#000000";
						return;
					}
					
				} else {
					formObj.cgo_pu_trdp_cd.style.color= "#000000";
					formObj.cgo_pu_trdp_nm.style.color= "#000000";
				}
				
				formObj.cgo_pu_trdp_cd.value=masterVals[0];//trdp_cd  AS param1
				//#3495 [BINEX] ADDRESS SHOULD BE SHOWN WITH NAME ON BL ENTRY #3462
				if(MULTI_LANGUAGE == 'Y'){
					formObj.cgo_pu_trdp_nm.value=masterVals[16];//loc_nm   AS param2
					formObj.cgo_pu_trdp_addr.value=masterVals[14];//loc_addr					
				}else{
					formObj.cgo_pu_trdp_nm.value=masterVals[3];//eng_nm   AS param2
					formObj.cgo_pu_trdp_addr.value=masterVals[1];
				}
				
				/*if(masterVals[6]!='' && masterVals[7]!='' && masterVals[6]<masterVals[7]){
					//COD
					alert(getLabel('COM_FRT_ALT001'));
					formObj.cgo_pu_trdp_cd.style.color= "#ff0000";
					formObj.cgo_pu_trdp_nm.style.color= "#ff0000";
				} else {
					formObj.cgo_pu_trdp_cd.style.color= "#000000";
					formObj.cgo_pu_trdp_nm.style.color= "#000000";
				}*/
			}else if(CODETYPE =="trdpCode_carr"){
				if(masterVals[5] == 'KO'){
					alert(getLabel('COM_FRT_ALT015'));
					formObj.carr_trdp_cd.value="";//trdp_cd  AS param1
					formObj.carr_trdp_nm.value="";//eng_nm   AS param2
					formObj.carr_trdp_addr.value="";//end_addr
					return;
				}
				
				if(masterVals[5] == 'CO'){
					if(confirm(getLabel('COM_FRT_ALT001'))){
						formObj.carr_trdp_cd.style.color= "#ff0000";
						formObj.carr_trdp_nm.style.color= "#ff0000";
					}else{
						formObj.carr_trdp_cd.value="";
						formObj.carr_trdp_nm.value="";
						formObj.carr_trdp_addr.value="";
						formObj.carr_trdp_cd.style.color= "#000000";
						formObj.carr_trdp_nm.style.color= "#000000";
						return;
					}
					
				} else {
					formObj.carr_trdp_cd.style.color= "#000000";
					formObj.carr_trdp_nm.style.color= "#000000";
				}
				
				formObj.carr_trdp_cd.value=masterVals[0];//trdp_cd  AS param1
				//#3495 [BINEX] ADDRESS SHOULD BE SHOWN WITH NAME ON BL ENTRY #3462
				if(MULTI_LANGUAGE == 'Y'){
					formObj.carr_trdp_nm.value=masterVals[16];//loc_nm   AS param2
					formObj.carr_trdp_addr.value=masterVals[14];//loc_addr					
				}else{
					formObj.carr_trdp_nm.value=masterVals[3];//eng_nm   AS param2
					formObj.carr_trdp_addr.value=masterVals[1];//eng_addr
				}
				
				/*if(masterVals[6]!='' && masterVals[7]!='' && masterVals[6]<masterVals[7]){
					//COD
					alert(getLabel('COM_FRT_ALT001'));
					formObj.carr_trdp_cd.style.color= "#ff0000";
					formObj.carr_trdp_nm.style.color= "#ff0000";
				} else {
					formObj.carr_trdp_cd.style.color= "#000000";
					formObj.carr_trdp_nm.style.color= "#000000";
				}*/
				//formObj.lnr_trdp_cd.value = masterVals[0];//trdp_cd  AS param1
				//formObj.lnr_trdp_nm.value = masterVals[3];//eng_nm   AS param2
			//#2737 [BNX] C/BROKER TO CHECK PAYMENT STATUS
			}else if(CODETYPE =="trdpCode_cust"){
				if(masterVals[5] == 'KO'){
					alert(getLabel('COM_FRT_ALT015'));
					formObj.cust_trdp_cd.value="";//trdp_cd  AS param1
					formObj.cust_trdp_nm.value="";//eng_nm   AS param2
					formObj.cust_trdp_addr.value="";//end_addr
					return;
				} else if(masterVals[5] == 'CH'){
					if(confirm(getLabel('COM_FRT_CFM005'))){ 
						try {creditOver=true;}catch(e){};
						formObj.cust_trdp_cd.style.color= "#ff0000";
						formObj.cust_trdp_nm.style.color= "#ff0000";
						formObj.cust_trdp_nm.className='search_form focusElem';
					}else{
						try {creditOver=false;}catch(e){};
						formObj.cust_trdp_cd.value="";	//trdp_cd  AS param1
						formObj.cust_trdp_nm.value="";		//eng_nm   AS param2
						formObj.cust_trdp_addr.value="";		//eng_addr  AS param5
						formObj.cust_trdp_cd.style.color= "#000000";
						formObj.cust_trdp_nm.style.color= "#000000";
						return;
					}
					
				}else if(masterVals[5] == 'CO'){
					if(confirm(getLabel('COM_FRT_ALT001'))){
						try {creditOver=true;}catch(e){};
						formObj.cust_trdp_cd.style.color= "#ff0000";
						formObj.cust_trdp_nm.style.color= "#ff0000";
					}else{
						try {creditOver=false;}catch(e){};
						formObj.cust_trdp_cd.value="";
						formObj.cust_trdp_nm.value="";
						formObj.cust_trdp_addr.value="";
						formObj.cust_trdp_cd.style.color= "#000000";
						formObj.cust_trdp_nm.style.color= "#000000";
						return;
					}
					
				} else {
					try {creditOver=false;}catch(e){};
					formObj.cust_trdp_cd.style.color= "#000000";
					formObj.cust_trdp_nm.style.color= "#000000";
				}
				formObj.cust_trdp_cd.value=masterVals[0];//trdp_cd  AS param1
				formObj.cust_trdp_nm.value=masterVals[3];//eng_nm   AS param2
				formObj.cust_trdp_addr.value=masterVals[1];//end_addr
				
				//formObj.cust_trdp_nm.value=masterVals[3];//eng_nm   AS param2
				//formObj.cust_trdp_addr.value=masterVals[1];//end_addr
				/*if(masterVals[6]!='' && masterVals[7]!='' && masterVals[6]<masterVals[7]){
					//COD
					alert(getLabel('COM_FRT_ALT001'));
					formObj.cust_trdp_cd.style.color= "#ff0000";
					formObj.cust_trdp_nm.style.color= "#ff0000";
				} else {
					formObj.cust_trdp_cd.style.color= "#000000";
					formObj.cust_trdp_nm.style.color= "#000000";
				}*/
			}else if(CODETYPE =="trdpCode_carr1"){
				if(masterVals[5] == 'KO'){
					alert(getLabel('COM_FRT_ALT015'));
					formObj.carr_trdp_cd1.value="";//trdp_cd  AS param1
					formObj.carr_trdp_nm1.value="";//eng_nm   AS param2
					return;
				}
				
				if(masterVals[5] == 'CO'){
					if(confirm(getLabel('COM_FRT_ALT001'))){
						formObj.carr_trdp_cd1.style.color= "#ff0000";
						formObj.carr_trdp_nm1.style.color= "#ff0000";
					}else{
						formObj.carr_trdp_cd1.value="";
						formObj.carr_trdp_nm1.value="";
						formObj.carr_trdp_cd1.style.color= "#000000";
						formObj.carr_trdp_nm1.style.color= "#000000";
						return;
					}
					
				} else {
					formObj.carr_trdp_cd1.style.color= "#000000";
					formObj.carr_trdp_nm1.style.color= "#000000";
				}
				
				formObj.carr_trdp_cd1.value=masterVals[0];//trdp_cd  AS param1
				formObj.carr_trdp_nm1.value=masterVals[3];//eng_nm   AS param2
				
				/*if(masterVals[6]!='' && masterVals[7]!='' && masterVals[6]<masterVals[7]){
					//COD
					alert(getLabel('COM_FRT_ALT001'));
					formObj.carr_trdp_cd1.style.color= "#ff0000";
					formObj.carr_trdp_nm1.style.color= "#ff0000";
				} else {
					formObj.carr_trdp_cd1.style.color= "#000000";
					formObj.carr_trdp_nm1.style.color= "#000000";
				}*/
			// Ocean Import Master, CY Location
			}else if(CODETYPE =="trdpCode_cy"){
				if(masterVals[5] == 'KO'){
					alert(getLabel('COM_FRT_ALT015'));
					formObj.cy_trdp_cd.value="";//trdp_cd  AS param1
					formObj.cy_trdp_nm.value="";//eng_nm   AS param2
					return;
				}
				
				if(masterVals[5] == 'CO'){
					if(confirm(getLabel('COM_FRT_ALT001'))){
						formObj.cy_trdp_cd.style.color= "#ff0000";
						formObj.cy_trdp_nm.style.color= "#ff0000";
					}else{
						formObj.cy_trdp_cd.value="";
						formObj.cy_trdp_nm.value="";
						formObj.cy_trdp_cd.style.color= "#000000";
						formObj.cy_trdp_nm.style.color= "#000000";
						return;
					}
					
				} else {
					formObj.cy_trdp_cd.style.color= "#000000";
					formObj.cy_trdp_nm.style.color= "#000000";
				}
				formObj.cy_trdp_cd.value=masterVals[0];//trdp_cd  AS param1
				
				//#2846 [AGL] after v450, CY Location tab error
				if ( document.getElementById("cust_trdp_cd") != null ) {
					formObj.cust_trdp_cd.value=masterVals[0];//trdp_cd  AS param1
				}
				//JPT 수정요청사항 - 2018.01.15
				if(MULTI_LANGUAGE == 'Y'){
					formObj.cy_trdp_nm.value=masterVals[16];//locl_nm   AS param2
				} else {
					formObj.cy_trdp_nm.value=masterVals[3];//eng_nm   AS param2
				}
				/*if(masterVals[6]!='' && masterVals[7]!='' && masterVals[6]<masterVals[7]){
					//COD
					alert(getLabel('COM_FRT_ALT001'));
					formObj.cy_trdp_cd.style.color= "#ff0000";
					formObj.cy_trdp_nm.style.color= "#ff0000";
				} else {
					formObj.cy_trdp_cd.style.color= "#000000";
					formObj.cy_trdp_nm.style.color= "#000000";
				}*/
			// Ocean Import Master, CFS Location
			}else if(CODETYPE =="trdpCode_cfs"){
				if(masterVals[5] == 'KO'){
					alert(getLabel('COM_FRT_ALT015'));
					formObj.cfs_trdp_cd.value="";//trdp_cd  AS param1
					formObj.cfs_trdp_nm.value="";//eng_nm   AS param2
					return;
				}
				
				if(masterVals[5] == 'CO'){
					if(confirm(getLabel('COM_FRT_ALT001'))){
						formObj.cfs_trdp_cd.style.color= "#ff0000";
						formObj.cfs_trdp_nm.style.color= "#ff0000";
					}else{
						formObj.cfs_trdp_cd.value="";
						formObj.cfs_trdp_nm.value="";
						formObj.cfs_trdp_cd.style.color= "#000000";
						formObj.cfs_trdp_nm.style.color= "#000000";
						return;
					}
					
				} else {
					formObj.cfs_trdp_cd.style.color= "#000000";
					formObj.cfs_trdp_nm.style.color= "#000000";
				}
				
				formObj.cfs_trdp_cd.value=masterVals[0];//trdp_cd  AS param1
				//#3495 [BINEX] ADDRESS SHOULD BE SHOWN WITH NAME ON BL ENTRY #3462
				//JPT 수정요청사항 - 2018.01.15
				if(MULTI_LANGUAGE == 'Y'){
					formObj.cfs_trdp_nm.value=masterVals[16];//loc_nm   AS param2
				}else{
					formObj.cfs_trdp_nm.value=masterVals[3];//eng_nm   AS param2
				}
				
				/*if(masterVals[6]!='' && masterVals[7]!='' && masterVals[6]<masterVals[7]){
					//COD
					alert(getLabel('COM_FRT_ALT001'));
					formObj.cfs_trdp_cd.style.color= "#ff0000";
					formObj.cfs_trdp_nm.style.color= "#ff0000";
				} else {
					formObj.cfs_trdp_cd.style.color= "#000000";
					formObj.cfs_trdp_nm.style.color= "#000000";
				}*/
			// Ocean Import House,Air Import House
			}else if(CODETYPE =="trdpCode_door"){
				if(masterVals[5] == 'KO'){
					alert(getLabel('COM_FRT_ALT015'));
					formObj.door_loc_cd.value="";//trdp_cd  AS param1
					formObj.door_loc_nm.value="";//eng_nm   AS param2
					return;
				}
				
				if(masterVals[5] == 'CO'){
					if(confirm(getLabel('COM_FRT_ALT001'))){
						formObj.door_loc_cd.style.color= "#ff0000";
						formObj.door_loc_nm.style.color= "#ff0000";
					}else{
						formObj.door_loc_cd.value="";
						formObj.door_loc_nm.value="";
						formObj.door_loc_cd.style.color= "#000000";
						formObj.door_loc_nm.style.color= "#000000";
						return;
					}
					
				} else {
					formObj.door_loc_cd.style.color= "#000000";
					formObj.door_loc_nm.style.color= "#000000";
				}
				
				formObj.door_loc_cd.value=masterVals[0];//trdp_cd  AS param1
				//#3495 [BINEX] ADDRESS SHOULD BE SHOWN WITH NAME ON BL ENTRY #3462
				if(MULTI_LANGUAGE == 'Y'){
					formObj.door_loc_nm.value=masterVals[16];//loc_nm   AS param2
				}else{
					formObj.door_loc_nm.value=masterVals[3];//eng_nm   AS param2
				}
				//OFVFOUR-7736 [SENKO USA] Consignee and Delivery Location
				if(cur_airSeaTp == "S" && cur_bizTp == "H" && cur_bndTp == "I"){
					formObj.lgl_addr.value=masterVals[37];
				}
				/*if(masterVals[6]!='' && masterVals[7]!='' && masterVals[6]<masterVals[7]){
					//COD
					alert(getLabel('COM_FRT_ALT001'));
					formObj.door_loc_cd.style.color= "#ff0000";
					formObj.door_loc_nm.style.color= "#ff0000";
				} else {
					formObj.door_loc_cd.style.color= "#000000";
					formObj.door_loc_nm.style.color= "#000000";
				}*/
			// Ocean Import Master, Container Return Place
			}else if(CODETYPE =="trdpCode_rt"){
				if(masterVals[5] == 'KO'){
					alert(getLabel('COM_FRT_ALT015'));
					formObj.rt_trdp_cd.value="";//trdp_cd  AS param1
					formObj.rt_trdp_nm.value="";//eng_nm   AS param2
					return;
				}
				
				if(masterVals[5] == 'CO'){
					if(confirm(getLabel('COM_FRT_ALT001'))){
						formObj.rt_trdp_cd.style.color= "#ff0000";
						formObj.rt_trdp_nm.style.color= "#ff0000";
					}else{
						formObj.rt_trdp_cd.value="";
						formObj.rt_trdp_nm.value="";
						formObj.rt_trdp_cd.style.color= "#000000";
						formObj.rt_trdp_nm.style.color= "#000000";
						return;
					}
					
				} else {
					formObj.rt_trdp_cd.style.color= "#000000";
					formObj.rt_trdp_nm.style.color= "#000000";
				}
				
				formObj.rt_trdp_cd.value=masterVals[0];//trdp_cd  AS param1
				formObj.rt_trdp_nm.value=masterVals[3];//eng_nm   AS param2
				
				/*if(masterVals[6]!='' && masterVals[7]!='' && masterVals[6]<masterVals[7]){
					//COD
					alert(getLabel('COM_FRT_ALT001'));
					formObj.rt_trdp_cd.style.color= "#ff0000";
					formObj.rt_trdp_nm.style.color= "#ff0000";
				} else {
					formObj.rt_trdp_cd.style.color= "#000000";
					formObj.rt_trdp_nm.style.color= "#000000";
				}*/
			}else if(CODETYPE =="trdpCode_wh"){
				if(masterVals[5] == 'KO'){
					alert(getLabel('COM_FRT_ALT015'));
					formObj.fnl_wh_cd.value="";//trdp_cd  AS param1
					formObj.fnl_wh_nm.value="";//eng_nm   AS param2
					return;
				}
				
				if(masterVals[5] == 'CO'){
					if(confirm(getLabel('COM_FRT_ALT001'))){
						formObj.fnl_wh_cd.style.color= "#ff0000";
						formObj.fnl_wh_nm.style.color= "#ff0000";
					}else{
						formObj.fnl_wh_cd.value="";
						formObj.fnl_wh_nm.value="";
						formObj.fnl_wh_cd.style.color= "#000000";
						formObj.fnl_wh_nm.style.color= "#000000";
						return;
					}
					
				} else {
					formObj.fnl_wh_cd.style.color= "#000000";
					formObj.fnl_wh_nm.style.color= "#000000";
				}
				
				formObj.fnl_wh_cd.value=masterVals[0];//trdp_cd  AS param1
				formObj.fnl_wh_nm.value=masterVals[3];//eng_nm   AS param2
				/*if(masterVals[6]!='' && masterVals[7]!='' && masterVals[6]<masterVals[7]){
					//COD
					alert(getLabel('COM_FRT_ALT001'));
					formObj.fnl_wh_cd.style.color= "#ff0000";
					formObj.fnl_wh_nm.style.color= "#ff0000";
				} else {
					formObj.fnl_wh_cd.style.color= "#000000";
					formObj.fnl_wh_nm.style.color= "#000000";
				}*/
			}else if(CODETYPE =="trdpCode_bond"){
				if(masterVals[5] == 'KO'){
					alert(getLabel('COM_FRT_ALT015'));
					formObj.bond_carr_cd.value="";//trdp_cd  AS param1
					formObj.bond_carr_nm.value="";//eng_nm   AS param2
					return;
				}
				
				if(masterVals[5] == 'CO'){
					if(confirm(getLabel('COM_FRT_ALT001'))){
						formObj.bond_carr_cd.style.color= "#ff0000";
						formObj.bond_carr_nm.style.color= "#ff0000";
					}else{
						formObj.bond_carr_cd.value="";
						formObj.bond_carr_nm.value="";
						formObj.bond_carr_cd.style.color= "#000000";
						formObj.bond_carr_nm.style.color= "#000000";
						return;
					}
					
				} else {
					formObj.bond_carr_cd.style.color= "#000000";
					formObj.bond_carr_nm.style.color= "#000000";
				}
				
				formObj.bond_carr_cd.value=masterVals[0];//trdp_cd  AS param1
				formObj.bond_carr_nm.value=masterVals[3];//eng_nm   AS param2
				
				/*if(masterVals[6]!='' && masterVals[7]!='' && masterVals[6]<masterVals[7]){
					//COD
					alert(getLabel('COM_FRT_ALT001'));
					formObj.bond_carr_cd.style.color= "#ff0000";
					formObj.bond_carr_nm.style.color= "#ff0000";
				} else {
					formObj.bond_carr_cd.style.color= "#000000";
					formObj.bond_carr_nm.style.color= "#000000";
				}*/
			}else if(CODETYPE =="trdpCode_iss"){
				if(masterVals[5] == 'KO'){
					alert(getLabel('COM_FRT_ALT015'));
					formObj.iss_trdp_cd.value="";//trdp_cd  AS param1
					formObj.iss_trdp_nm.value="";//eng_nm   AS param2
					formObj.iss_trdp_addr.value="";//eng_addr
					return;
				}
				
				if(masterVals[5] == 'CO'){
					if(confirm(getLabel('COM_FRT_ALT001'))){
						formObj.iss_trdp_cd.style.color= "#ff0000";
						formObj.iss_trdp_nm.style.color= "#ff0000";
					}else{
						formObj.iss_trdp_cd.value="";
						formObj.iss_trdp_nm.value="";
						formObj.iss_trdp_addr.value="";
						formObj.iss_trdp_cd.style.color= "#000000";
						formObj.iss_trdp_nm.style.color= "#000000";
						return;
					}
					
				} else {
					formObj.iss_trdp_cd.style.color= "#000000";
					formObj.iss_trdp_nm.style.color= "#000000";
				}
				
				formObj.iss_trdp_cd.value=masterVals[0];//trdp_cd  AS param1
				if(formObj.iss_trdp_nm.getAttribute("dataformat") == "multiLanguage"){
					formObj.iss_trdp_nm.value=masterVals[16];//loc_nm   AS param2
					formObj.iss_trdp_addr.value=masterVals[14];//loc_addr					
				}else{
					formObj.iss_trdp_nm.value=masterVals[3];//eng_nm   AS param2
					formObj.iss_trdp_addr.value=masterVals[1];//eng_addr
				}

				// formObj.iss_trdp_addr.value = masterVals[7];//addr as param7
				
				if(typeof(formObj.iata_cd) != "undefined"){
					// Issuing Carrier 변경 시 IATA CODE 도 업데이트
					formObj.iata_cd.value = masterVals[17];//IATA CD
				}
				
				/*if(masterVals[6]!='' && masterVals[7]!='' && masterVals[6]<masterVals[7]){
					//COD
					alert(getLabel('COM_FRT_ALT001'));
					formObj.iss_trdp_cd.style.color= "#ff0000";
					formObj.iss_trdp_nm.style.color= "#ff0000";
				} else {
					formObj.iss_trdp_cd.style.color= "#000000";
					formObj.iss_trdp_nm.style.color= "#000000";
				}*/
			}else if(CODETYPE =="trdpCode_frt_loc"){
				if(masterVals[5] == 'KO'){
					alert(getLabel('COM_FRT_ALT015'));
					formObj.frt_loc_cd.value="";//trdp_cd  AS param1
					formObj.frt_loc_nm.value="";//eng_nm   AS param2
					return;
				}
				
				if(masterVals[5] == 'CO'){
					if(confirm(getLabel('COM_FRT_ALT001'))){
						formObj.frt_loc_cd.style.color= "#ff0000";
						formObj.frt_loc_nm.style.color= "#ff0000";
					}else{
						formObj.frt_loc_cd.value="";
						formObj.frt_loc_nm.value="";
						formObj.frt_loc_cd.style.color= "#000000";
						formObj.frt_loc_nm.style.color= "#000000";
						return;
					}
					
				} else {
					formObj.frt_loc_cd.style.color= "#000000";
					formObj.frt_loc_nm.style.color= "#000000";
				}
				
				formObj.frt_loc_cd.value=masterVals[0];//trdp_cd  AS param1
				//#3495 [BINEX] ADDRESS SHOULD BE SHOWN WITH NAME ON BL ENTRY #3462
				if(MULTI_LANGUAGE == 'Y'){
					formObj.frt_loc_nm.value=masterVals[16];//loc_nm   AS param2
				}else{
					formObj.frt_loc_nm.value=masterVals[3];//eng_nm   AS param2
				}

				
				/*if(masterVals[6]!='' && masterVals[7]!='' && masterVals[6]<masterVals[7]){
					//COD
					alert(getLabel('COM_FRT_ALT001'));
					formObj.frt_loc_cd.style.color= "#ff0000";
					formObj.frt_loc_nm.style.color= "#ff0000";
				} else {
					formObj.frt_loc_cd.style.color= "#000000";
					formObj.frt_loc_nm.style.color= "#000000";
				}*/
			}else if(CODETYPE =="trdpCode_trk"){
				//2012.04.27 GOALS EDI
				formObj.trk_trdp_cd.value=masterVals[0];//trdp_cd  AS param1
				
				//#3495 [BINEX] ADDRESS SHOULD BE SHOWN WITH NAME ON BL ENTRY #3462
				if(MULTI_LANGUAGE == 'Y'){
					formObj.trk_trdp_nm.value	=	masterVals[16];//loc_nm   AS param2
					formObj.trk_trdp_addr.value = 	masterVals[14];
				}else{
					formObj.trk_trdp_nm.value	=	masterVals[3];//eng_nm   AS param2
					formObj.trk_trdp_addr.value = 	masterVals[1];//trk_trdp_addr   AS param3
				}
				
			}else if(CODETYPE =="trdpCode_vndr"){
				if(masterVals[5] == 'KO'){
					alert(getLabel('COM_FRT_ALT015'));
					formObj.vndr_trdp_cd.value="";//trdp_cd  AS param1
					formObj.vndr_trdp_nm.value="";//eng_nm   AS param2
					return;
				}
				
				if(masterVals[5] == 'CO'){
					if(confirm(getLabel('COM_FRT_ALT001'))){
						formObj.vndr_trdp_cd.style.color= "#ff0000";
						formObj.vndr_trdp_nm.style.color= "#ff0000";
					}else{
						formObj.vndr_trdp_cd.value="";
						formObj.vndr_trdp_nm.value="";
						formObj.vndr_trdp_cd.style.color= "#000000";
						formObj.vndr_trdp_nm.style.color= "#000000";
						return;
					}
					
				} else {
					formObj.vndr_trdp_cd.style.color= "#000000";
					formObj.vndr_trdp_nm.style.color= "#000000";
				}
				
				formObj.vndr_trdp_cd.value=masterVals[0];//trdp_cd  AS param1
				//#3495 [BINEX] ADDRESS SHOULD BE SHOWN WITH NAME ON BL ENTRY #3462
				if(MULTI_LANGUAGE == 'Y'){
					formObj.vndr_trdp_nm.value=masterVals[16];//loc_nm   AS param2
				}else{
					formObj.vndr_trdp_nm.value=masterVals[3];//eng_nm   AS param2
				}
				
				/*if(masterVals[6]!='' && masterVals[7]!='' && masterVals[6]<masterVals[7]){
					//COD
					alert(getLabel('COM_FRT_ALT001'));
					formObj.vndr_trdp_cd.style.color= "#ff0000";
					formObj.vndr_trdp_nm.style.color= "#ff0000";
				} else {
					formObj.vndr_trdp_cd.style.color= "#000000";
					formObj.vndr_trdp_nm.style.color= "#000000";
				}*/
			}else if(CODETYPE =="trdpCode_warehouse"){ 
				if(masterVals[5] == 'KO'){
					alert(getLabel('COM_FRT_ALT015'));
					formObj.wh_trdp_cd.value="";//trdp_cd  AS param1
					formObj.wh_trdp_nm.value="";//eng_nm   AS param2
					formObj.wh_trdp_addr.value="";
					return;
				} 
				
				if(masterVals[5] == 'CO'){
					if(confirm(getLabel('COM_FRT_ALT001'))){
						formObj.wh_trdp_cd.style.color= "#ff0000";
						formObj.wh_trdp_nm.style.color= "#ff0000";
					}else{
						formObj.wh_trdp_cd.value="";
						formObj.wh_trdp_nm.value="";
						formObj.wh_trdp_addr.value="";
						formObj.wh_trdp_cd.style.color= "#000000";
						formObj.wh_trdp_nm.style.color= "#000000";
						return;
					}
					
				} else {
					formObj.wh_trdp_cd.style.color= "#000000";
					formObj.wh_trdp_nm.style.color= "#000000";
				}
				
				formObj.wh_trdp_cd.value=masterVals[0];//trdp_cd
				//#3495 [BINEX] ADDRESS SHOULD BE SHOWN WITH NAME ON BL ENTRY #3462
				if(MULTI_LANGUAGE == 'Y'){
					formObj.wh_trdp_nm.value=masterVals[16];//loc_nm   AS param2
					formObj.wh_trdp_addr.value=masterVals[14];//loc_addr					
				}else{
					formObj.wh_trdp_nm.value=masterVals[3];//eng_nm
					formObj.wh_trdp_addr.value=masterVals[1];//eng_addr
				}
				/*if(masterVals[6]!='' && masterVals[7]!='' && masterVals[6]<masterVals[7]){
					//COD
					alert(getLabel('COM_FRT_ALT001'));
					formObj.wh_trdp_cd.style.color= "#ff0000";
					formObj.wh_trdp_nm.style.color= "#ff0000";
				} else {
					formObj.wh_trdp_cd.style.color= "#000000";
					formObj.wh_trdp_nm.style.color= "#000000";
				}*/
			}else if(CODETYPE =="trdpCode_trsp"){
				formObj.trsp_trdp_cd.value=masterVals[0];
				formObj.trsp_trdp_nm.value=masterVals[3];				
			}else if(CODETYPE =="trdpCode_pickup"){
				formObj.org_rout_trdp_cd.value=masterVals[0];
				formObj.org_rout_trdp_nm.value=masterVals[3];
			}else if(CODETYPE =="trdpCode_fwrd_agn"){
				if(masterVals[5] == 'KO'){
					alert(getLabel('COM_FRT_ALT015'));
					formObj.fwrd_agn_trdp_cd.value="";//trdp_cd  AS param1
					formObj.fwrd_agn_trdp_nm.value="";//eng_nm   AS param2
					formObj.fwrd_agn_trdp_addr.value="";//eng_addr
					return;
				}
				
				if(masterVals[5] == 'CO'){
					if(confirm(getLabel('COM_FRT_ALT001'))){
						formObj.fwrd_agn_trdp_cd.style.color= "#ff0000";
						formObj.fwrd_agn_trdp_nm.style.color= "#ff0000";
					}else{
						formObj.fwrd_agn_trdp_cd.value="";
						formObj.fwrd_agn_trdp_nm.value="";
						formObj.fwrd_agn_trdp_addr.value="";
						formObj.fwrd_agn_trdp_cd.style.color= "#000000";
						formObj.fwrd_agn_trdp_nm.style.color= "#000000";
						return;
					}
					
				} else {
					formObj.fwrd_agn_trdp_cd.style.color= "#000000";
					formObj.fwrd_agn_trdp_nm.style.color= "#000000";
				}
				
				formObj.fwrd_agn_trdp_cd.value=masterVals[0];//trdp_cd  AS param1
				if(formObj.fwrd_agn_trdp_nm.getAttribute("dataformat") == "multiLanguage"){
					formObj.fwrd_agn_trdp_nm.value=masterVals[16];//loc_nm   AS param2
					formObj.fwrd_agn_trdp_addr.value=masterVals[14];//loc_addr					
				}else{
					formObj.fwrd_agn_trdp_nm.value=masterVals[3];//eng_nm   AS param2
					formObj.fwrd_agn_trdp_addr.value=masterVals[1];//eng_addr
				}
				
				
				/*if(masterVals[6]!='' && masterVals[7]!='' && masterVals[6]<masterVals[7]){
					//COD
					alert(getLabel('COM_FRT_ALT001'));
					formObj.fwrd_agn_trdp_cd.style.color= "#ff0000";
					formObj.fwrd_agn_trdp_nm.style.color= "#ff0000";
				} else {
					formObj.fwrd_agn_trdp_cd.style.color= "#000000";
					formObj.fwrd_agn_trdp_nm.style.color= "#000000";
				}*/
			}
		}else{
			if(CODETYPE =="trdpCode_shipper"){
				formObj.shpr_trdp_cd.value="";//trdp_cd  AS param1
				formObj.shpr_trdp_nm.value="";//eng_nm   AS param2
				formObj.shpr_trdp_addr.value="";//eng_addr  AS param5
			}else if(CODETYPE =="trdpCode_consignee"){
				formObj.cnee_trdp_cd.value="";//trdp_cd  AS param1
				formObj.cnee_trdp_nm.value="";//eng_nm   AS param2
				formObj.cnee_trdp_addr.value="";//eng_addr  AS param5
			}else if(CODETYPE =="trdpCode_notify"){
				formObj.ntfy_trdp_cd.value="";//trdp_cd  AS param1
				formObj.ntfy_trdp_nm.value="";//eng_nm   AS param2
				formObj.ntfy_trdp_addr.value="";//eng_addr  AS param5 
			}else if(CODETYPE =="trdpCode_ashipper"){
				formObj.act_shpr_trdp_cd.value="";//trdp_cd  AS param1
				formObj.act_shpr_trdp_nm.value="";//eng_nm   AS param2
			}else if(CODETYPE =="trdpCode_liner"){
				formObj.lnr_trdp_cd.value="";//trdp_cd  AS param1
				formObj.lnr_trdp_nm.value="";//eng_nm   AS param2
			}else if(CODETYPE =="trdpCode_liner_search"){
				formObj.lnr_trdp_cd.value="";//trdp_cd  AS param1
				formObj.lnr_trdp_nm.value="";//eng_nm   AS param2
			}else if(CODETYPE =="trdpCode_air_liner"){
				formObj.lnr_trdp_cd.value="";	//trdp_cd  AS param1
				formObj.lnr_trdp_nm.value="";	//eng_nm   AS param2	
			}else if(CODETYPE == "trdpCode_exp_air_carr"){
				formObj.lnr_trdp_cd.value="";	//trdp_cd  AS param1
				formObj.lnr_trdp_nm.value="";	//eng_nm   AS param2	
			}else if(CODETYPE == "trdpCode_imp_air_carr"){
				formObj.lnr_trdp_cd.value="";	//trdp_cd  AS param1
				formObj.lnr_trdp_nm.value="";	//eng_nm   AS param2	
			}else if(CODETYPE == "trdpCode_himp_air_carr"){
				formObj.lnr_trdp_cd.value = "";	//trdp_cd  AS param1
				formObj.lnr_trdp_nm.value = "";	//eng_nm   AS param2	
			}else if(CODETYPE =="trdpCode_sea_liner"){
				formObj.lnr_trdp_cd.value="";//trdp_cd  AS param1
				formObj.lnr_trdp_nm.value="";//eng_nm   AS param2				
			}else if(CODETYPE =="trdpCode_console"){
				formObj.agt_trdp_cd.value="";//trdp_cd  AS param1
				formObj.agt_trdp_nm.value="";//eng_nm   AS param2
			}else if(CODETYPE =="trdpCode_partner"){
				formObj.prnr_trdp_cd.value="";//trdp_cd  AS param1
				formObj.prnr_trdp_nm.value="";//eng_nm   AS param2
				formObj.prnr_trdp_addr.value="";//eng_addr
			}else if(CODETYPE =="trdpCode_aircmp"){
				formObj.prnr_trdp_cd.value='';//trdp_cd  AS param1
				formObj.prnr_trdp_nm.value='';//eng_nm   AS param2
			}else if(CODETYPE =="trdpCode_agent"){
				formObj.agent_trdp_cd.value='';//trdp_cd  AS param1
				formObj.agent_trdp_nm.value='';//eng_nm   AS param2
				formObj.agent_trdp_addr.value='';//eng_addr
			}else if(CODETYPE =="trdpCode_third"){
				formObj.third_trdp_cd.value='';//trdp_cd  AS param1
				formObj.third_trdp_nm.value='';//eng_nm   AS param2
				formObj.third_trdp_addr.value='';//eng_addr
			}else if(CODETYPE =="trdpCode_partner2"){
				formObj.prnr_trdp_cd2.value='';//trdp_cd  AS param1
				formObj.prnr_trdp_nm2.value='';//eng_nm   AS param2
				formObj.prnr_trdp_addr2.value='';//eng_addr
			}else if(CODETYPE =="trdpCode_rcv"){
				formObj.rcv_wh_cd.value='';//trdp_cd  AS param1
				formObj.rcv_wh_nm.value='';//eng_nm   AS param2
			}else if(CODETYPE =="trdpCode_pu"){
				formObj.pu_trdp_cd.value='';//trdp_cd  AS param1
				formObj.pu_trdp_nm.value='';//eng_nm   AS param2
			}else if(CODETYPE =="trdpCode_cgo_pu"){
				formObj.cgo_pu_trdp_cd.value='';//trdp_cd  AS param1
				formObj.cgo_pu_trdp_nm.value='';//eng_nm   AS param2
				formObj.cgo_pu_trdp_addr.value='';//eng_nm   AS param2
			}else if(CODETYPE =="trdpCode_carr"){
				formObj.carr_trdp_cd.value='';//trdp_cd  AS param1
				formObj.carr_trdp_nm.value='';//eng_nm   AS param2
				formObj.carr_trdp_addr.value='';//end_addr
			}else if(CODETYPE =="trdpCode_cust"){
				formObj.cust_trdp_cd.value='';//trdp_cd  AS param1
				formObj.cust_trdp_nm.value='';//eng_nm   AS param2
				formObj.cust_trdp_addr.value='';//end_addr
			}else if(CODETYPE =="trdpCode_carr1"){
				formObj.carr_trdp_cd1.value='';//trdp_cd  AS param1
				formObj.carr_trdp_nm1.value='';//eng_nm   AS param2
			// Ocean Import Master, CY Location
			}else if(CODETYPE =="trdpCode_cy"){
				formObj.cy_trdp_cd.value='';//trdp_cd  AS param1
				formObj.cy_trdp_nm.value='';//eng_nm   AS param2
			// Ocean Import Master, CFS Location
			}else if(CODETYPE =="trdpCode_cfs"){
				formObj.cfs_trdp_cd.value='';//trdp_cd  AS param1
				formObj.cfs_trdp_nm.value='';//eng_nm   AS param2
				// Ocean Import House,Air Import House
			}else if(CODETYPE =="trdpCode_door"){
				formObj.door_loc_cd.value="";//trdp_cd  AS param1
				formObj.door_loc_nm.value="";//eng_nm   AS param2
				//OFVFOUR-7736 [SENKO USA] Consignee and Delivery Location
				if(cur_airSeaTp == "S" && cur_bizTp == "H" && cur_bndTp == "I"){
					formObj.lgl_addr.value = "";	
				}
			// Ocean Import Master, Container Return Place
			}else if(CODETYPE =="trdpCode_rt"){
				formObj.rt_trdp_cd.value='';//trdp_cd  AS param1
				formObj.rt_trdp_nm.value='';//eng_nm   AS param2
			}else if(CODETYPE =="trdpCode_wh"){
				formObj.fnl_wh_cd.value='';//trdp_cd  AS param1
				formObj.fnl_wh_nm.value='';//eng_nm   AS param2
			}else if(CODETYPE =="trdpCode_bond"){
				formObj.bond_carr_cd.value='';//trdp_cd  AS param1
				formObj.bond_carr_nm.value='';//eng_nm   AS param2
			}else if(CODETYPE =="trdpCode_iss"){
				formObj.iss_trdp_cd.value='';//trdp_cd  AS param1
				formObj.iss_trdp_nm.value='';//eng_nm   AS param2
				// Issuing Carrier 변경 시 IATA CODE 도 업데이트
				formObj.iata_cd.value = "";//IATA CD
			}else if(CODETYPE =="trdpCode_frt_loc"){
				formObj.frt_loc_cd.value='';//trdp_cd  AS param1
				formObj.frt_loc_nm.value='';//eng_nm   AS param2
			}else if(CODETYPE =="trdpCode_trk"){
				formObj.trk_trdp_cd.value='';//trdp_cd  AS param1
				formObj.trk_trdp_nm.value='';//eng_nm   AS param2
			}else if(CODETYPE =="trdpCode_vndr"){
				formObj.vndr_trdp_cd.value='';//trdp_cd  AS param1
				formObj.vndr_trdp_nm.value='';//eng_nm   AS param2
			}else if(CODETYPE =="trdpCode_warehouse"){
				formObj.wh_trdp_cd.value='';//trdp_cd  AS param1
				formObj.wh_trdp_nm.value='';//eng_nm   AS param2
				formObj.wh_trdp_addr.value='';
			}else if(CODETYPE == "trdpCode_trsp"){
				formObj.trsp_trdp_cd.value="";
				formObj.trsp_trdp_nm.value="";				
			}else if(CODETYPE == "trdpCode_pickup"){
				formObj.org_rout_trdp_cd.value="";
				formObj.org_rout_trdp_nm.value="";
			}else if(CODETYPE == "trdpCode_fwrd_agn"){
				formObj.fwrd_agn_trdp_cd.value="";
				formObj.fwrd_agn_trdp_nm.value="";
				formObj.fwrd_agn_trdp_addr.value = "";
			}
		}
	}
	else{
		//REFINE THIS MESSAGE (2012.11.26)
		alert(getLabel('FMS_COM_ALT007'));	
	}
	codeNameOK = true;
}
//코드표시 Ajax
function dispCodeNameAjaxReq(reqVal){	
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	var formObj=document.frm1;
	var sheetObj4=docObjects[2];
	
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			
			var rtnArr=doc[1].split('@@;');
			var masterVals=rtnArr[0].split('@@^');	
			/*
			if(CODETYPE =="country"){
				formObj.s_country_code.value=masterVals[0];//cnt_cd
				formObj.s_country_name.value=masterVals[3];//cnt_eng_nm
			}else 
			*/
			
			if(CODETYPE =="location"){
				formObj.s_Port_code.value=masterVals[0];//loc_cd 
				//formObj.s_node_code.value = masterVals[1];//nod_cd 
				formObj.s_Port_name.value=masterVals[3];//loc_nm 
			}else if(CODETYPE =="currency"){
				formObj.s_currency_code.value=masterVals[0];//cd_val
				formObj.s_currency_name.value=masterVals[3];//cd_nm
			}else if(CODETYPE =="office"){
				formObj.s_office_code.value=masterVals[0];
				formObj.s_office_name.value=masterVals[3];
			}else if(CODETYPE =="user"){
				formObj.s_user_id.value=masterVals[0];
				formObj.s_user_name.value=masterVals[3];
			}else if(CODETYPE =="freight"){
				formObj.s_freight_code.value=masterVals[0];
				formObj.s_freight_name.value=masterVals[3];
			}else if(CODETYPE =="container"){
				formObj.s_container_code.value=masterVals[0];
				formObj.s_container_name.value=masterVals[3];
			}else if(CODETYPE =="commodity"){
				formObj.rep_cmdt_cd.value=masterVals[0];
				formObj.rep_cmdt_nm.value=masterVals[3];
				formObj.rep_cmdt_nm.onchange();
			}else if(CODETYPE =="package"){
				formObj.pck_ut_cd.value=masterVals[0];
				formObj.pck_ut_nm.value=masterVals[3];
			}else if(CODETYPE =="cargo"){
				formObj.s_cargo_code.value=masterVals[0];
				formObj.s_cargo_name.value=masterVals[3];
			//Vessel
			}else if(CODETYPE =="srVessel"){
				formObj.trnk_vsl_cd.value=masterVals[0];
				formObj.trnk_vsl_nm.value=masterVals[3];
			//Prevessel
			}else if(CODETYPE =="srVessel_Pre"){
				formObj.pre_vsl_cd.value=masterVals[0];
				formObj.pre_vsl_nm.value=masterVals[3];
			}else if(CODETYPE == "MawbCheck"){
				//House B/L NO가 중복되었습니다.
				alert(getLabel('FMS_COM_ALT008') + " - " + getLabel('FMS_COD_BLNO'));
				formObj.f_bl_no.value=formObj.Old_f_bl_no.value;
			}else if(CODETYPE =="state"){
				formObj.state_cd.value=masterVals[0];//state_cd
				formObj.state_nm.value=masterVals[3];//state_locl_nm
				try {
					formObj.state_cnt_cd.value=masterVals[2];//state_cnt_cd
				} catch (e){}
			}else if(CODETYPE =="country"){
				formObj.cnt_cd.value=masterVals[0];//state_cd
				formObj.cnt_nm.value=masterVals[3];//state_locl_nm
				//formObj.cnt_nm.onchange();
			}else if(CODETYPE =="trk"){
				formObj.trk_trdp_cd.value=masterVals[0];
				formObj.trk_trdp_nm.value=masterVals[3];
			}
			
		}else{
			/*
			if(CODETYPE =="country"){
				formObj.s_country_code.value="";//cnt_cd
				formObj.s_country_name.value="";//cnt_eng_nm
			}else 
			*/
			if(CODETYPE =="location"){
				formObj.s_Port_code.value="";//loc_cd 
				//formObj.s_node_code.value = "";//nod_cd 
				formObj.s_Port_name.value="";//loc_nm
			}else if(CODETYPE =="currency"){
				formObj.s_currency_code.value="";
				formObj.s_currency_name.value="";//cd_nm
			}else if(CODETYPE =="office"){
				formObj.s_office_code.value="";
				formObj.s_office_name.value="";
			}else if(CODETYPE =="user"){
				formObj.s_user_id.value="";
				formObj.s_user_name.value="";
			}else if(CODETYPE =="freight"){
				formObj.s_freight_code.value="";
				formObj.s_freight_name.value="";
			}else if(CODETYPE =="container"){
				formObj.s_container_code.value="";
				formObj.s_container_name.value="";
			}else if(CODETYPE =="commodity"){
				formObj.rep_cmdt_cd.value="";
				//#25722
				//formObj.rep_cmdt_nm.value = "";
//				formObj.rep_cmdt_cd.focus();
			}else if(CODETYPE =="package"){
				formObj.pck_ut_cd.value="";
				formObj.pck_ut_nm.value="";
				//formObj.pck_ut_cd.focus();
			}else if(CODETYPE =="packageGS"){
				sheetObj4.SetCellValue(packateRow, "cgo_pck_ut","",0);
			}else if(CODETYPE =="cargo"){
				formObj.s_cargo_code.value="";
				formObj.s_cargo_name.value="";
			}else if(CODETYPE =="srVessel"){
				formObj.trnk_vsl_cd.value="";
				formObj.trnk_vsl_nm.value="";
				//formObj.trnk_vsl_cd.focus();
			}else if(CODETYPE =="srVessel_Pre"){
				formObj.pre_vsl_cd.value="";
				formObj.pre_vsl_nm.value="";
				//formObj.pre_vsl_cd.focus();
			}else if(CODETYPE =="state"){
				formObj.state_cd.value="";//state_cd
				formObj.state_nm.value="";//state_locl_nm
				try {
				formObj.state_cnt_cd.value="";//state_locl_nm
				} catch (e){}
				
			}else if(CODETYPE =="country"){
				formObj.cnt_cd.value="";//state_cd
				formObj.cnt_nm.value="";//state_locl_nm
			}else if(CODETYPE =="trk"){
				formObj.trk_trdp_cd.value="";
				formObj.trk_trdp_nm.value="";
			}
		}
	}else{		
		//REFINE THIS MESSAGE (2012.11.26)
		alert(getLabel('FMS_COM_ALT007'));		
	}
}

function officeCdReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			return;
		} else {
			formObj.ctrb_ofc_cd.value = "";
		}	
	}else{
		//Error Errupt!	
		alert(getLabel('FMS_COM_ERR001'));		
	}
}

/**
 * Grid에서 팝업호출
 */
var cur_sheetObj;
var cur_rowIdx;
var cur_colIdx;
var cur_objPfx;
function gridPopCall_cntr_no(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		cur_sheetObj.SetCellValue(cur_rowIdx, 'soc_flg',rtnValAry[0]);
		cur_sheetObj.SetCellValue(cur_rowIdx, 'ls_cntr_tpsz_cd',rtnValAry[1]);
		cur_sheetObj.SetCellValue(cur_rowIdx, 'cntr_sprl_trdp_cd',rtnValAry[2]);
		cur_sheetObj.SetCellValue(cur_rowIdx, 'cntr_sprl_trdp_nm',rtnValAry[3]);
	}
}
function gridPopCall_cntr_sprl_trdp_cd(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		cur_sheetObj.SetCellValue(cur_rowIdx, 'cntr_sprl_trdp_cd',rtnValAry[0]);//trdp_cd
		cur_sheetObj.SetCellValue(cur_rowIdx, 'cntr_sprl_trdp_nm',rtnValAry[2]);//eng_nm
	}
}
function gridPopCall_item_shp_cmdt_cd(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		cur_sheetObj.SetCellValue(cur_rowIdx, 'item_shp_cmdt_cd',rtnValAry[0]);//Code
		cur_sheetObj.SetCellValue(cur_rowIdx, 'item_shp_cmdt_nm',rtnValAry[2]);//Code Name
		cur_sheetObj.SetCellValue(cur_rowIdx, 'item_hs_grp_cd',rtnValAry[5]);//HS Group Code
	}
}
function gridPopCall_item_cmdt_cd(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		cur_sheetObj.SetCellValue(cur_rowIdx, 'item_cmdt_cd',rtnValAry[2]);//Code
		cur_sheetObj.SetCellValue(cur_rowIdx, 'item_cmdt_nm',rtnValAry[1]);//Code Name
		cur_sheetObj.SetCellValue(cur_rowIdx, 'item_sys_no',rtnValAry[3]);//Code Name
	}
}
function gridPopCall_item_pck_ut_cd(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		cur_sheetObj.SetCellValue(cur_rowIdx, 'item_pck_ut_cd',rtnValAry[0]);//Code
		cur_sheetObj.SetCellValue(cur_rowIdx, 'item_pck_ut_nm',rtnValAry[1]);//Code Name
	}
}
function gridPopCall_edi_pck_ut_cd(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		cur_sheetObj.SetCellValue(cur_rowIdx, 'edi_pck_ut_cd',rtnValAry[0]);//Code
		cur_sheetObj.SetCellValue(cur_rowIdx, 'edi_pck_ut_nm',rtnValAry[1]);//Code Name
	}
}
function gridPopCall_trdp_cd(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		cur_sheetObj.SetCellValue(cur_rowIdx, cur_colIdx,rtnValAry[0]);//Code
		
		if(cur_objPfx == 'dc_'){	//English Name
			cur_sheetObj.SetCellValue(cur_rowIdx, cur_colIdx+1,rtnValAry[2]);//Code Name
		}else{	// Local Name			
			cur_sheetObj.SetCellValue(cur_rowIdx, cur_colIdx+1,rtnValAry[10]);//Code Name
		}
	}
}

function gridPopCall(sheetObj, rowIdx, colIdx, doWhat){
	cur_sheetObj = sheetObj;
	cur_rowIdx = rowIdx;
	cur_colIdx = colIdx;
	//Container탭 Container Inventory 조회
	if(doWhat=='cntr_no'){
		rtnary=new Array(1);
   		rtnary[0]="1";
   		callBackFunc = "gridPopCall_cntr_no";
		modal_center_open('./SEE_BMD_0027.clt', rtnary, 650,480,"yes");
		
	//Container탭 Lessor조회
	}else if(doWhat=='cntr_sprl_trdp_cd'){
		rtnary=new Array(1);
   		rtnary[0]="1";
   		rtnary[1]="";
   		rtnary[2]=window;
   		var cstmTpCd='';
   		callBackFunc = "gridPopCall_cntr_sprl_trdp_cd";
		modal_center_open('./CMM_POP_0010.clt?callTp='+cstmTpCd, rtnary, 1150,650,"yes");
        
    //Item탭 HTS(Commodity) 코드
	}else if(doWhat=='item_shp_cmdt_cd'){
   		rtnary=new Array(1);
   		rtnary[0]="1";
   		callBackFunc = "gridPopCall_item_shp_cmdt_cd";
		modal_center_open('./CMM_POP_0110.clt', rtnary, 756,483,"yes");
    
	//Item탭 Item 코드
	}else if(doWhat=='item_cmdt_cd'){
		rtnary=new Array(1);
		rtnary[0]="1";
		rtnary[1]=frm1.cnee_trdp_cd.value;
		rtnary[2]=frm1.cnee_trdp_nm.value;
		rtnary[3]=window;
		callBackFunc = "gridPopCall_item_cmdt_cd";
		modal_center_open('./WHM_ITL_0001.clt', rtnary, 1150,480,"yes");
		
    //Item탭 Unit코드
	}else if(doWhat=='item_pck_ut_cd'){
   		rtnary=new Array(1);
   		rtnary[0]="1";
   		callBackFunc = "gridPopCall_item_pck_ut_cd";
		modal_center_open('./CMM_POP_0120.clt', rtnary, 556,480,"yes");
        
    //EDI Unit코드
	}else if(doWhat=='edi_pck_ut_cd'){
   		rtnary=new Array(1);
   		rtnary[0]="1";
   		callBackFunc = "gridPopCall_edi_pck_ut_cd";
		modal_center_open('./CMM_POP_0120.clt', rtnary, 556,480,"yes");
	//Trade Partner 코드
	}else if(doWhat=='trdp_cd'){
		rtnary=new Array(1);
		rtnary[0]="2";
		rtnary[1]="";
		rtnary[2]=window;
		callBackFunc = "gridPopCall_trdp_cd";
   		modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
	}
}
/**
 * 자동완성 기능 처리하는 Function임
 */
function doAutoComplete(sheetObj, row, col, keyCode){
	if(keyCode==9){
		var curCols=sheetObj.cols;
		curCols--;
		if(curCols!=col){
			col--;
		}
		var colStr=sheetObj.ColSaveName(col);
		//Container 탭 - Trade Partner Code
		if(colStr=='cntr_sprl_trdp_cd'){
			var codeStr=sheetObj.GetCellValue(row, 'cntr_sprl_trdp_cd');
			if(codeStr.length>2){
				//결과를 표시할 Col을 초기화함
				sheetObj.SetCellValue(row, 'cntr_sprl_trdp_cd','');
				sheetObj.SetCellValue(row, 'cntr_sprl_trdp_nm','');
				doAutoSearch(sheetObj, row, col, 'trdpcode', codeStr, 'cntr_sprl_trdp_cd', 'cntr_sprl_trdp_nm');	
			}else{
				//The code is not enough to search
				alert(getLabel('FMS_COM_ALT014'));
				sheetObj.SelectCell(row, colStr);
			}
		//Item 탭 - Package Unit
		}else if(colStr=='item_pck_ut_cd'){
			var codeStr=sheetObj.GetCellValue(row, 'item_pck_ut_cd');
			if(codeStr.length>1){
				//결과를 표시할 Col을 초기화함
				sheetObj.SetCellValue(row, 'item_pck_ut_cd','');
				sheetObj.SetCellValue(row, 'item_pck_ut_nm','');
				doAutoSearch(sheetObj, row, col, 'package', codeStr, 'item_pck_ut_cd', 'item_pck_ut_nm');	
			}else{
				//The code is not enough to search
				alert(getLabel('FMS_COM_ALT014'));
				sheetObj.SelectCell(row, colStr);
			}
		//수출 신고 목록 탭 - Export Item List
		}else if(colStr=='edi_pck_ut_cd'){
			var codeStr=sheetObj.GetCellValue(row, 'edi_pck_ut_cd');
			if(codeStr.length>1){
				//결과를 표시할 Col을 초기화함
				sheetObj.SetCellValue(row, 'edi_pck_ut_cd','');
				doAutoSearch(sheetObj, row, col, 'package', codeStr, 'edi_pck_ut_cd', 'edi_pck_ut_nm');	
			}else{
				//The code is not enough to search
				alert(getLabel('FMS_COM_ALT014'));
				sheetObj.SelectCell(row, colStr);
			}
		}
	}
}

var currentEventSheet;
var currentRow;

/**
 * Item Code조회를 시작함
 * @param sheetObj 이벤트가 일어난 Sheet
 * @param row 이벤트가 일어난 row
 * @param col 이벤트가 일어난 col
 * @param codeTp 조회시 사용할 코드타입
 * @param codeStr 해당 코드값
 * @param curCellNm 현재 Cell의 SaveName
 */
function doItemSearch(sheetObj, row, codeTp, codeStr){
    //선택된 Sheet를 Set함
	currentEventSheet = sheetObj;
	currentRow = row;
    sheetObj.SetCellValue(row, "item_shp_cmdt_cd", codeStr.toUpperCase(), 0);
    
    ajaxSendPost(itemShpCmdtCdReq, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+codeTp+'&s_code='+codeStr, './GateServlet.gsl');
}

/**
 * Code Return 값을 Cell에 담는다
 */
function itemShpCmdtCdReq(rtnMsg){
    var doc=getAjaxMsgXML(rtnMsg);
    if(doc[0]=='OK'){
        if(typeof(doc[1])=='undefined'){
        	currentEventSheet.SetCellValue(currentRow, "item_hs_grp_cd",'',0);
        	currentEventSheet.SetCellValue(currentRow, "item_shp_cmdt_cd",'',0);
        	currentEventSheet.SetCellValue(currentRow, "item_shp_cmdt_nm",'',0);
            alert(CODE_NOT_FND);
        }else{
            var rtnArr=doc[1].split('@@;');
            var masterVals=rtnArr[0].split('@@^');
            currentEventSheet.SetCellValue(currentRow, "item_hs_grp_cd",masterVals[23],0);
            currentEventSheet.SetCellValue(currentRow, "item_shp_cmdt_nm",masterVals[3],0);
        }
    }else{
        alert(AJ_FND_ERR);
    }
}

function loadDftItmVal(sheetObj, itemId){
	doShowProcess();
	var params = "?f_cmd="+SEARCH06 + "&cust_itm_id="+itemId;
	var xml = sheetObj.GetSearchData("./WHM_WHM_0005_06GS.clt"+params);
	doHideProcess();
	return xml;
}

function displayDftItmVal(xml,sheetObj,row){
	var xmlDoc = $.parseXML(xml);
	  var $xml = $(xmlDoc);
	  sheetObj.SetCellValue(row,'item_cmdt_cd',$xml.find( "cust_itm_id").text(),0);
	  sheetObj.SetCellValue(row,'item_cmdt_nm',$xml.find( "itm_nm").text(),0);
	  sheetObj.SetCellValue(row,'item_pck_ut_cd',$xml.find( "itm_ut_cd").text(),0);
	  sheetObj.SetCellValue(row,'item_pck_inr_qty',$xml.find( "itm_inr_qty").text());
	  sheetObj.SetCellValue(row,'item_wgt',$xml.find( "itm_wgt").text(),0);
	  sheetObj.SetCellValue(row,'item_lbs_wgt',$xml.find( "itm_wgt_lbs").text(),0);
	  sheetObj.SetCellValue(row,'item_meas',$xml.find( "itm_vol").text(),0);
	  sheetObj.SetCellValue(row,'item_cft_meas',$xml.find( "itm_vol_cft").text(),0);
	  
	  if (sheetObj.GetCellValue(row,'item_cmdt_cd') == "") {
		  alert(CODE_NOT_FND);
	  }
}

function copyValue(doWhat, airSeaTp, bndTp, bizTp){
	if(doWhat=='CNEE'){
		frm1.ntfy_trdp_cd.value=frm1.cnee_trdp_cd.value; 
		frm1.ntfy_trdp_nm.value=frm1.cnee_trdp_nm.value; 
		frm1.ntfy_trdp_addr.value=frm1.cnee_trdp_addr.value 
	}else if(doWhat=='SAC'){
		frm1.ntfy_trdp_cd.value=''; 
		frm1.ntfy_trdp_nm.value='SAME AS CONSIGNEE'; 
		frm1.ntfy_trdp_addr.value='SAME AS CONSIGNEE'; 
	}
	// AEM Notify 선택하면 Acct_info에 찍어주도록 설정함.
	if(airSeaTp=='A' && bndTp=='O' && bizTp=='H'){
		if(typeof(document.getElementsByName("disp_ntfy_flg")[0])=="undefined"){
			frm1.acctg_info_txt.value=frm1.ntfy_trdp_addr.value;
		}else{
			if(document.getElementsByName("disp_ntfy_flg")[0].value == "Y"){
				frm1.acctg_info_txt.value='[NOTIFY]' + '\r\n' + frm1.ntfy_trdp_addr.value;
			}else{
				frm1.acctg_info_txt.value=frm1.ntfy_trdp_addr.value;
			}
		}
	}
	if(airSeaTp=='A' && bndTp=='O' && bizTp=='M'){
		if(typeof(document.getElementsByName("disp_ntfy_flg")[0])=="undefined"){
			// frm1.mk_txt.value = frm1.ntfy_trdp_addr.value;
		}else{
			if(document.getElementsByName("disp_ntfy_flg")[0].value == "Y"){
				frm1.mk_txt.value='[NOTIFY]' + '\r\n' + frm1.ntfy_trdp_addr.value + '\r\n';
			}else{
				// frm1.mk_txt.value = frm1.ntfy_trdp_addr.value;
			}
		}
	}
}
/**
 * Say부분. Container 갯수를 Text로 표시
 */
var sayTxt = "";
function mkSayTxt(cntrSheet, dispObj, intg_bl_seq, bnd_clss_cd){
	fromDispObj = dispObj;
	dispObj.value = "";
	
	var satTxtType = "";
	
	sayTxt = "";
	
	if(bnd_clss_cd == "O"){ // Export
		
		var opt_key = "OEH_SAY_INFO_TYPE";
		ajaxSendPost(setOehSayInfoType, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
		
		if(OEH_SAY_INFO_TYPE == "1"){
			if(frm1.shp_mod_cd.value=='FCL'){
				satTxtType = "CNTR";
			}else{
				satTxtType = "PCK";
			}
		} else if(OEH_SAY_INFO_TYPE == "2"){
			satTxtType = "PCK";
		} else if(OEH_SAY_INFO_TYPE == "3"){
			satTxtType = "CNTR";
		}
	} else { // Import
		if(frm1.shp_mod_cd.value=='FCL'){
			satTxtType = "CNTR";
		}else{
			satTxtType = "PCK";
		}
	}
	
	//if(frm1.shp_mod_cd.value=='FCL'){
	if(satTxtType == "CNTR"){
		//#47 #52766 - [ZEN] Mark & Desc Tab SAY 항목 Long Name 지정
//		var rowCnt=cntrSheet.LastRow() + 1;
//		var cntrLoop=0;
//		for(var i=1; i < rowCnt; i++){
//			if(cntrSheet.GetCellValue(i, "conls_ibflag") != "D"){
//				cntrLoop++;	
//			}
//		}
//		if(cntrLoop>0){
//			var tmpVal=new String(cntrLoop);
//			sayTxt=changeNumTostr(tmpVal);
//			sayTxt+= '(';
//			sayTxt+= cntrLoop;
//			sayTxt+= ') CNTR(S) ONLY';
//		}
		
		//#2107 [PATENT] HB/L의 FCL Shipmode 시 SAY 항목 표시 보완
		var partialCount = 0;
		
		for(var j=1; j < cntrSheet.LastRow() + 1; j++){
			if(cntrSheet.GetCellValue(j, "prt_cgo_flg") == "1"){
				++partialCount;
			}
		}
		if(frm1.shp_mod_cd.value=='FCL' && 0 < partialCount){
			ajaxSendPost(setPartialSayTxt, "reqVal", "&goWhere=aj&bcKey=setPartialSayTxt&intg_bl_seq="+intg_bl_seq, "./GateServlet.gsl");
			//sayTxt += "ONE OF ";
			var partSp = partialTxt.split("!^^!");
			//#2667 [PATENT] Bugs were reported when doing internal testing for Partial B/L (Synchronization)
//			sayTxt += changeNumTostr(partSp[0]);
			sayTxt += "PART OF";
			
			var cntrLst = partSp[1].split("@;;@");
			for(i = 0; i <= cntrLst.length; i++){
				if(cntrLst[i] != "" && cntrLst[i] != undefined){
					var tempVal = cntrLst[i].split("@^^@");
					sayTxt += ' ';
					sayTxt += changeNumTostr(tempVal[0]);
					sayTxt += '(';
					sayTxt += tempVal[0];
					sayTxt += 'X';
					sayTxt += tempVal[1];
					sayTxt += ') CNTR(S)';
				}
			}
			sayTxt+= ' ONLY';
		}
		
		if(cntrSheet.LastRow() != partialCount){
			if(sayTxt != ''){
				sayTxt += ' + ';
			}
			ajaxSendPost(setSayTxt, "reqVal", "&goWhere=aj&bcKey=getCntrSay&intg_bl_seq="+intg_bl_seq, "./GateServlet.gsl");
		}
	}else{
		if(frm1.pck_ut_cd.value==''){
			//Please select a [Package type]!
			alert(getLabel('FMS_COM_ALT004') + " - " + getLabel('FMS_COD_PKGE'));
		}else{
			var surFix='';
			/*	20130405 OJG
			if(frm1.pck_qty.value>1){
				surFix='S';
			}
			*/
			
			sayTxt=changeNumTostr(frm1.pck_qty.value);
			sayTxt += '(';
			sayTxt += frm1.pck_qty.value;
			sayTxt += ') ';
			var optArr=frm1.pck_ut_cd.options;
			for(var i=0; i < optArr.length; i++){
				if(optArr[i].selected){
					sayTxt += optArr[i].innerText;
					sayTxt += surFix;
					break;
				}
			}
			sayTxt+= ' ONLY';
		}
	}
	dispObj.value=sayTxt;
}

var partialTxt = "";
function setPartialSayTxt(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK") {
		if (doc[1] != "" && typeof(doc[1]) != "undefined" && doc[1] != undefined) {
			partialTxt = doc[1];
		}
	}
}
//#47 #52766 - [ZEN] Mark & Desc Tab SAY 항목 Long Name 지정
function setSayTxt(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK") {
		if (doc[1] != "" && typeof(doc[1]) != "undefined" && doc[1] != undefined) {
			var spValue = doc[1].split(",");
			for(var i = 0 ; i < spValue.length; i++){
				if(spValue[i] != ""){
					var cntSp = spValue[i].split("*^^*");
					
					sayTxt += changeNumTostr(cntSp[0]);
					sayTxt += cntSp[1];
					
//					if(Number(cntSp[0]) == 1){
						sayTxt += ' ONLY';
//					}
					
					if((i + 2) != spValue.length){
						sayTxt += ", ";
					}
				}
			}
		}
	}
}

/**
 * OEH_SAY_INFO_TYPE 관린 코드조회
 */

var OEH_SAY_INFO_TYPE = "1";

function setOehSayInfoType(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	
	if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined) {
		OEH_SAY_INFO_TYPE = doc[1];
	}
}

/**
 * Said부분 표시
 */
/**
 * Said부분 표시
 */
function mkSaidTxt(cntrSheet, dispObj){
	var saidTxt='';
	var tpszArr=new Array();
	var qtyArr=0;
	var cntrCnt=new Array();
	var tpszStr='';
	var loopCnt=0;
	var surFix='';
	var pkgs='';
	var optArr='';
	if(frm1.pck_ut_cd.value == ''){
		//Please select a [Package type]!
		//alert(getLabel('FMS_COM_ALT004') + "\n - " + getLabel('FMS_COD_PKGE'));
	}
	else{
		surFix='';
		/*	[20130405 OJG]
		if(frm1.pck_qty.value>1){
			surFix='S';
		}
		*/
//		pkgs='(';
		pkgs = frm1.pck_qty.value;
		pkgs += ' ';
		optArr=frm1.pck_ut_cd.options;
		for(var i=0; i < optArr.length; i++){
			if(optArr[i].selected){
				pkgs += optArr[i].innerText;
				pkgs += surFix;
				break;
			}
		}
//		pkgs += ') ';
	}
	//alert ('/'+frm1.pck_ut_cd.value+'/');
	//alert (pkgs);
	if(frm1.shp_mod_cd.value=='FCL') {
		var loopCnt=0;
		for(var i=1; i < cntrSheet.LastRow() + 1; i++){
			//var tmpCntrSeq = cntrSheet.CellValue(i, 'cntr_list_seq');
			//if(tmpCntrSeq!=''){
			// #48711 - [IMPEX] OEH B/L 생성후 MBL이나 FILING NO. 업데이트하면 OEH B/L에서 CONTAINER Q’TY가 2배로 됨
			if(cntrSheet.GetCellValue(i, "conls_ibflag") != "D"){
				var tmpTpSz=cntrSheet.GetCellValue(i, 'cntr_tpsz_cd');
				var tmpCgoQty=cntrSheet.GetCellValue(i, 'cgo_pck_qty');
				var arrSize=tpszArr.length;
				var curIdx=-1;
				for(var j=0; j < arrSize; j++){
					if(tpszArr[j]==tmpTpSz){
						curIdx=j;
						break;
					}
				}
				if(curIdx==-1){
					tpszArr[arrSize]=tmpTpSz;
					if(tmpCgoQty==''){
						tmpCgoQty=0;
					}
					qtyArr=parseInt(qtyArr)+ parseInt(tmpCgoQty);
					cntrCnt[arrSize]=1;
				}
				else{
					if(tmpCgoQty==''){
						tmpCgoQty=0;
					}
					qtyArr=parseInt(qtyArr)+ parseInt(tmpCgoQty);
					cntrCnt[curIdx]=parseInt(cntrCnt[curIdx])+1;
				}
				loopCnt++;
			}
			//}
		}
		if(loopCnt>0){
			for(var k=0; k < tpszArr.length; k++){
				if(k>0){
					saidTxt += ' AND ';	
				}
				saidTxt += cntrCnt[k];
				saidTxt += 'X';
				saidTxt += tpszArr[k];	
			}

			//#3678 [JAPT] OEH Entry 로직 수정 요건
			if(!ComIsEmpty(OEH_SAID_DESC_PRT_QTY) && OEH_SAID_DESC_PRT_QTY != 'D') {
				//FCL: CNTR TP/SZ 와 개수만 표기 (e.g. 3X30GP)
				saidTxt += ("\n"+ '(' + pkgs + ') ');
			}

		}else{

			if(!ComIsEmpty(OEH_SAID_DESC_PRT_QTY) && OEH_SAID_DESC_PRT_QTY != 'D') {
				saidTxt += changeNumTostr(frm1.pck_qty.value);
				saidTxt += ' (';
			}

			saidTxt += frm1.pck_qty.value;
			saidTxt += ' ';
			var optArr=frm1.pck_ut_cd.options;
			for(var i=0; i < optArr.length; i++){
				if(optArr[i].selected){
					saidTxt += optArr[i].innerText;
					saidTxt += surFix;
					break;
				}
			}

			if(!ComIsEmpty(OEH_SAID_DESC_PRT_QTY) && OEH_SAID_DESC_PRT_QTY != 'D') {
				saidTxt += ') ';
			}
		}
	//LCL 및 Bulk인경우
	}else{
		if(frm1.pck_ut_cd.value==''){
			//Please select a [Package type]!
			//alert(getLabel('FMS_COM_ALT004') + "\n - " + getLabel('FMS_COD_PKGE'));
		}
		else{
			var surFix='';
			/*	20130405 OJG
			if(frm1.pck_qty.value>1){
				surFix='S';
			}
			*/
			saidTxt += changeNumTostr(frm1.pck_qty.value);
			saidTxt += ' (';
			saidTxt += frm1.pck_qty.value;
			saidTxt += ' ';
			var optArr=frm1.pck_ut_cd.options;
			for(var i=0; i < optArr.length; i++){
				if(optArr[i].selected){
					saidTxt += optArr[i].innerText;
					saidTxt += surFix;
					break;
				}
			}
			saidTxt += ') ';
		}
	}
	dispObj.value=saidTxt;
}
/**
 * Container Grid추가시 거래처 정보 표시
 */
function cntrGridAdd(sheetObj){
	var intRows=sheetObj.LastRow();
	
	var sprlCd='';
	var sprlNm='';
	var socFlg='';
	for(var i=intRows; i >= 1; i--){
		if(sheetObj.GetCellValue(i, 'cntr_list_seq')!=''){
			sprlCd=sheetObj.GetCellValue(i, 'cntr_sprl_trdp_cd');
			sprlNm=sheetObj.GetCellValue(i, 'cntr_sprl_trdp_nm');
			socFlg=sheetObj.GetCellValue(i, 'soc_flg');
			break;
		}
	}
	var orgCnt = sheetObj.DataInsert();
	
	if (orgCnt > 1) {
		sheetObj.SetCellValue(orgCnt, 'cntr_tpsz_cd', sheetObj.GetCellValue(orgCnt-1, 'cntr_tpsz_cd'), 0);
	}
	
	sheetObj.SetCellValue(orgCnt, 'cntr_sprl_trdp_cd',sprlCd,0);
	sheetObj.SetCellValue(orgCnt, 'cntr_sprl_trdp_nm',sprlNm,0);
	sheetObj.SetCellValue(orgCnt, 'soc_flg',socFlg,0);
	for(var i=1; i<=sheetObj.LastRow(); i++){
		sheetObj.SetCellValue(i, 'Seq',i);
	}
}
 /**
  * LHK 20130828
  * #20146 [C&LG] Booking Confirmation 을 위한 Container 자동 q'ty add 기능 추가
  */ 
function cntrQtyGridAdd(sheetObj){
	var formObj=document.frm1; 
	var add_cntr_tpsz_cd=formObj.add_cntr_tpsz_cd.value;
	var cntr_q_ty=Number(eval((formObj.cntr_q_ty.value.replaceAll(",",""))));
	if(add_cntr_tpsz_cd==""){
		alert(getLabel('SEA_COM_ALT025'));
		return;
	}
	if(cntr_q_ty=="" || cntr_q_ty < 1){
		alert(getLabel('SEA_COM_ALT026'));
		return;
	}
	var intRows=sheetObj.LastRow();
	//var orgCnt=sheetObj.LastRow() + 1;
 	//var intRows=orgCnt-1;
 	var sprlCd='';
 	var sprlNm='';
 	var socFlg='';
 	for(var i=intRows; i >= 1; i--){
 		if(sheetObj.GetCellValue(i, 'cntr_list_seq')!=''){
			sprlCd=sheetObj.GetCellValue(i, 'cntr_sprl_trdp_cd');
			sprlNm=sheetObj.GetCellValue(i, 'cntr_sprl_trdp_nm');
			socFlg=sheetObj.GetCellValue(i, 'soc_flg');
 			break;
 		}
 	}
 	var add_qty=(intRows+1) + cntr_q_ty;
 	for(var i=intRows+1; i<add_qty; i++){
	 	var curRow=sheetObj.DataInsert();
	 	sheetObj.SetCellValue(curRow, 'cntr_sprl_trdp_cd',sprlCd,0);
	 	sheetObj.SetCellValue(curRow, 'cntr_sprl_trdp_nm',sprlNm,0);
	 	sheetObj.SetCellValue(curRow, 'soc_flg',socFlg,0);
	 	sheetObj.SetCellValue(curRow, 'cntr_tpsz_cd',add_cntr_tpsz_cd,0);
 	}	
}
 /**
 * LHK 20130828
 * #20146 [C&LG] Booking Confirmation 을 위한 자동 Container Summary Setting 기능 추가
 */
function cntrInfoSet(sheetObj){
	var formObj=document.frm1; 
	var cntr_info="";
	var Rows=sheetObj.LastRow() + 1;
 	for(var i=1; i<Rows; i++){
 		if(sheetObj.GetCellValue(i, "Del") == 0){
 			var cntr_tpsz_cd=sheetObj.GetCellValue(i, "cntr_tpsz_cd");
 	 		//
 	 		if(cntr_info.indexOf(cntr_tpsz_cd) == -1){
 	 			cntr_info += cntr_tpsz_cd + " X 1, ";
 	 		}else{
 	 			var arr_cntr_info=cntr_info.split(", ");
 	 			cntr_info="";
 	 			for(var j=0; j<arr_cntr_info.length-1; j++){
 	 				var arr_cntr_tpsz=arr_cntr_info[j].split(" X ");
 	 				if(arr_cntr_tpsz[0].indexOf(cntr_tpsz_cd) != -1){
 	 					var cntr_tpsz_cnt=eval(arr_cntr_tpsz[1]) + 1;
 	 					var addCntrStr=arr_cntr_tpsz[0] + " X " + cntr_tpsz_cnt + ", ";
 	 					cntr_info += addCntrStr;
 	 				}else{
 	 					var CntrStr=arr_cntr_tpsz[0] + " X " + arr_cntr_tpsz[1] + ", ";
 	 					cntr_info += CntrStr;
 	 				}
 	 			}
 	 		}
 		}
 	}	
 	if(cntr_info != ''){
 		cntr_info=cntr_info.substring(0, cntr_info.length-2);
 	}
 	formObj.cntr_info.value=cntr_info;
} 
/**
 * Warehouse Code를 조회함
 */
function getWhCd(callBnd){
	rtnary=new Array(1);
   	rtnary[0]="SAL";
   	if(callBnd=='S'){
   		rtnary[1]="S";
   	}else{
   		rtnary[1]="A";	
   	}
   	callBackFunc = "getWhCd_callBackFunc";
	modal_center_open('./CMM_POP_0250.clt', rtnary, 812,500,"yes");
}
function getWhCd_callBackFunc(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		frm1.cfs_loc_nm.value=rtnValAry[1];    	   
		frm1.cfs_nod_cd.value=rtnValAry[3];    	        
	}
}
/**
 * 탭이동
 */
function moveTab(callTabIdx){
	if(typeof(currTab)!='undefined'&&currTab!=callTabIdx){
		goTabSelect(callTabIdx)
	}
}
/**
 * BL의 변경여부 확인
 */
function checkBlSts(){
	ajaxSendPost(checkBlStsReq, 'reqVal', '&goWhere=aj&bcKey=getCheckBlSts&intg_bl_seq='+frm1.intg_bl_seq.value, './GateServlet.gsl');	
}
var isStsOk=false;
/**
 * Location Code 처리
 */
function checkBlStsReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.frm1;
	isStsOk=false;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var stsInfos=doc[1].split('@^');
			//삭제시
			if(stsInfos[3]=='Y'){
				//This "Bill of Lading" was deleted by '+stsInfos[2]+'! new Array(stsInfos[2])
				alert(getLabel('FMS_COM_ALT017') + ": " + stsInfos[2]);
				//재조회
				doWork('SEARCHLIST');
			//삭제되지 않은 경우	
			}else{
				//상태가 변경된 경우
				if(frm1.bl_sts_cd.value!=stsInfos[0]){
					//This "Bill of Lading" was modified by '+stsInfos[2]+'!');
					alert(getLabel('FMS_COM_ALT017') + ": " + stsInfos[2]);	
					//재조회
					doWork('SEARCHLIST');
				}
				else{
					isStsOk=true;
				}
			}
		}
	}else{
		//REFINE THIS MESSAGE (2012.11.26)
		alert(getLabel('FMS_COM_ALT007'));		
	}
	codeNameOK = true;
}
/**
 * 입력중 체크
 */
function chkCmpAddr(obj, msgTxt){
	//20121130 OJG 
	//checkTxtAreaLn(obj, 100, 10, msgTxt);
	textarea_autoenter_50(obj);
	// #4227 [Webtrans] TP Entry maximum number of line validation message
	//return checkTxtAreaLn(obj, 62, 6, msgTxt); 
	blnCheck = checkTxtAreaLn(obj, 70, 7, msgTxt); 
	if (!blnCheck) obj.blur();
	return blnCheck;
	
}

var cntrInfoType = "";
var cntrInfoHead = true;

function addCntrInfo(sheet, obj, type){
	var formObj=document.frm1;
	var cnt=sheet.LastRow() + 1;
	var tmp="";
	if(cnt > sheet.HeaderRows()){
		if(formObj.mk_txt.value != ""){
			tmp="\r\n";
		}
	}
	
	//#466 [Fulltrans] strengthen the function for "container info" copy button
	var opt_key = type + "_" + "CNTR_INFO_TYPE";
	ajaxSendPost(setCntrInfoType, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	
	//#786 [FULLTRANS] HBL 수정 사항 정리
	var opt_key = "CNTR_INFO_HEAD";
	ajaxSendPost(setCntrInfoHead, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	
	var opt_key = "OIH_AN_CNTR_INFO";
    ajaxSendPost(setOihAnCntrInfoReq, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");

	if(cntrInfoHead){
		if(cntrInfoType == "1"){//CNTR No + "/" + Seal No1
			tmp += "Container No/Seal No";
			tmp += "\r\n";
		}else if(cntrInfoType == "2"){//CNTR No + "/" + Seal No1 + Package No + Package Type + "/" + Weight K +"KGS /" + CBM + "CBM"
			tmp += "Container No/Seal No";
			tmp += "\r\n";
			tmp += "Package/Weight/CBM";
			tmp += "\r\n";
		}else if(cntrInfoType == "3"){//CNTR No + "/" + Seal No1 + Package No+Package Type + "/" + Weight K +"KGS"
			tmp += "Container No/Seal No";
			tmp += "\r\n";
			tmp += "Package/Weight";
			tmp += "\r\n";
		//JP Option
		}else if(cntrInfoType == "4"){
			if(type == "OI"){
				if(OIH_AN_CNTR_INFO == "CSW"){
					tmp += "Cntr No/Type/Seal No/Weight(K)";
				}else{
					tmp += "Container No/Type/Seal No";
				}
			} else {
				tmp += "Container No/Type/Seal No";
			}
			//#3048 [BNX JAPAN]OEH Container Information 버튼 에러
//			if(OIH_AN_CNTR_INFO == "CSW"){
//				tmp += "Cntr No/Type/Seal No/Weight(K)";
//			}else{
//				tmp += "Container No/Type/Seal No";
//			}
			tmp += "\r\n";
		//#2081 [PATENT] OEM Container Information 버튼 옵션추가
		}else if(cntrInfoType == "5"){//CNTR NO + "/" + TYPE + "/" + Seal No1 + Package No + Package Type + "/" + Weight K +"KGS /" + CBM + "CBM"
			tmp += "Container No/Type/Seal No";
			tmp += "\r\n";
			//오타수정
			tmp += "Package/Weight/CBM";
			tmp += "\r\n";
		}
	}
	
	for(var i = 1 ; i < cnt ; i++){
		if(sheet.GetCellValue(i, "cntr_no")!=''){
			var sText = sheet.GetComboInfo(i,"cgo_pck_ut", "Text");
			var sCode = sheet.GetComboInfo(i,"cgo_pck_ut", "Code");
			
			var arrText = sText.split("|");
			var arrCode = sCode.split("|");
			
			var pck_nm = "";
			for(j = 0; j < arrCode.length; j++) {
				if(sheet.GetCellValue(i, "cgo_pck_ut") == arrCode[j]) {
					pck_nm = arrText[j];
					break;
				}
			}
			
			if(cntrInfoType == "1"){//CNTR No + "/" + Seal No1
				tmp += sheet.GetCellValue(i, "cntr_no") + "/" + sheet.GetCellValue(i, "seal_no1");
				if(sheet.GetCellValue(i, "seal_no2") != ''){
					tmp += ', ' + sheet.GetCellValue(i, "seal_no2");
				}
			}else if(cntrInfoType == "2"){//CNTR No + "/" + Seal No1 + Package No + Package Type + "/" + Weight K +"KGS /" + CBM + "CBM"
				tmp += sheet.GetCellValue(i, "cntr_no") + "/" + sheet.GetCellValue(i, "seal_no1");
				if(sheet.GetCellValue(i, "seal_no2") != ''){
					tmp += ', ' + sheet.GetCellValue(i, "seal_no2");
				}
				tmp += "\r\n";
//				tmp += sheet.GetCellValue(i, "cgo_pck_qty") + sheet.GetCellValue(i, "cgo_pck_ut") + "/";
				tmp += sheet.GetCellValue(i, "cgo_pck_qty") + pck_nm + "/";
				tmp += sheet.GetCellValue(i, "cgo_wgt") + "KGS/" + sheet.GetCellValue(i, "cgo_meas") + "CBM";
			}else if(cntrInfoType == "3"){//CNTR No + "/" + Seal No1 + Package No+Package Type + "/" + Weight K +"KGS"
				tmp += sheet.GetCellValue(i, "cntr_no") + "/" + sheet.GetCellValue(i, "seal_no1");
				if(sheet.GetCellValue(i, "seal_no2") != ''){
					tmp += ', ' + sheet.GetCellValue(i, "seal_no2");
				}
				tmp += "\r\n";
//				tmp += sheet.GetCellValue(i, "cgo_pck_qty") + sheet.GetCellValue(i, "cgo_pck_ut") + "/";
				tmp += sheet.GetCellValue(i, "cgo_pck_qty") + pck_nm + "/";
				tmp += sheet.GetCellValue(i, "cgo_wgt") + "KGS";
			//JP Option
			}else if(cntrInfoType == "4"){
				tmp += sheet.GetCellValue(i, "cntr_no") + "/" + sheet.GetCellValue(i, "cntr_tpsz_cd") + "/" + sheet.GetCellValue(i, "seal_no1");
				if(sheet.GetCellValue(i, "seal_no2") != ''){
					tmp += ', ' + sheet.GetCellValue(i, "seal_no2");
				}
				if(type == "OI"){
					if(OIH_AN_CNTR_INFO == "CSW"){
						tmp += "/" + sheet.GetCellValue(i, "cgo_wgt");
					}
				}
			//#2081 [PATENT] OEM Container Information 버튼 옵션추가
			}else if(cntrInfoType == "5"){//CNTR NO + "/" + TYPE + "/" + Seal No1 + Package No + Package Type + "/" + Weight K +"KGS /" + CBM + "CBM"
				tmp += sheet.GetCellValue(i, "cntr_no") + "/" + sheet.GetCellValue(i, "cntr_tpsz_cd") + "/" + sheet.GetCellValue(i, "seal_no1");
				if(sheet.GetCellValue(i, "seal_no2") != ''){
					tmp += ', ' + sheet.GetCellValue(i, "seal_no2");
				}
				tmp += "\r\n";
				tmp += sheet.GetCellValue(i, "cgo_pck_qty") + pck_nm + "/";
				tmp += sheet.GetCellValue(i, "cgo_wgt") + "KGS/" + sheet.GetCellValue(i, "cgo_meas") + "CBM";
			}
			tmp += "\r\n";
		}
	}
	
	frm1.mk_txt.value += tmp;
}

//#466 [Fulltrans] strengthen the function for "container info" copy button
function setCntrInfoType(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ){
		cntrInfoType = doc[1];
	}else{
	}
}

function setCntrInfoHead(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ){
		if(doc[1] == "Y"){
			cntrInfoHead = true;
		}else{
			cntrInfoHead = false;
		}
	}else{
	}
}

function getCntrInfo(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if(doc[1]!=null){
			formObj.mk_txt.value += "\r\n";
			formObj.mk_txt.value += "Container No/Seal No";
			formObj.mk_txt.value += doc[1];
		}
	}	
}
function addCntrInfoType(obj){
	//현재 B/L에 저장되어있는 Container 정보를 불러온다.
	if(obj=='M'){
		if(frm1.intg_bl_seq.value!=""){
			ajaxSendPost(getCntrInfoType, 'reqVal', '&goWhere=aj&bcKey=getCntrInfoType&intg_bl_seq='+frm1.intg_bl_seq.value, './GateServlet.gsl');
		}
	}else{
		if(frm1.rlt_intg_bl_seq.value!=""){
			ajaxSendPost(getCntrInfoType, 'reqVal', '&goWhere=aj&bcKey=getCntrInfoType&intg_bl_seq='+frm1.rlt_intg_bl_seq.value, './GateServlet.gsl');
			getMasterCntrList();
		}
	}
}
function getCntrInfoType(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if(doc[1]!=null){
			formObj.mk_txt.value += "\r\n";
			formObj.mk_txt.value += "Container No/Type/Seal No";
			formObj.mk_txt.value += doc[1];
		}
	}	
}
//attach rider
function rowCount(formObj, rowCnt, targetObj, airSeaClssCd){
	var isBegin=false;
	//mk_txt
	if(formObj.mk_txt.value!=""){
		var rtnArr= formObj.mk_txt.value.split("\n");	//formObj.mk_txt.value.split("\r\n");
		if(rtnArr.length>rowCnt){
			isBegin=true;
		}else{
			isBegin=false;
		}
	}
	if(!isBegin){
		//desc_txt
		if(formObj.desc_txt.value!=""){
			var rtnArr=formObj.desc_txt.value.split("\n");	//formObj.desc_txt.value.split("\r\n");
			if(rtnArr.length>rowCnt){
				isBegin=true;
			}else{
				isBegin=false;
			}
		}
	}
	if(isBegin){
		//targetObj.style.color = "red";
		/* jsjang 2013.09.02. #16580 : [CLA]B/L Entry Mark & Desc Tab - Scroll 표시 & Rider Attach */
		/*
		if(airSeaClssCd == "A"){
			targetObj.value="OVER LIMIT";
			//targetObj.style.display  = 'block';
		}else{ 
			targetObj.value="ATTACH RIDER";
			//targetObj.style.display  = 'block';
		}
		*/
		targetObj.style.display='block';
	}else{
		//targetObj.style.color = "black";
		//targetObj.value = "";
		targetObj.style.display='none';
	}
}
//attach rider
function RowCount(formObj, rowCnt, targetObj, airSeaClssCd){
	var isBegin=false;
	if(!isBegin){
		//desc_txt1
		if(formObj.desc_txt1.value!=""){
			var rtnArr=formObj.desc_txt1.value.split("\n");	//formObj.desc_txt1.value.split("\r\n");
			if(rtnArr.length>rowCnt){
				isBegin=true;
			}else{
				isBegin=false;
			}
		}
	}
	if(isBegin){
		//targetObj.style.color = "red";
		/* jsjang 2013.09.02. #16580 : [CLA]B/L Entry Mark & Desc Tab - Scroll 표시 & Rider Attach */
		/*
		if(airSeaClssCd == "A"){
			targetObj.value="OVER LIMIT";
			//targetObj.style.display  = 'block';
		}else{ 
			targetObj.value="ATTACH RIDER";
			//targetObj.style.display  = 'block';
		}
		*/
		targetObj.style.display='block';
	}else{
		//targetObj.style.color = "black";
		//targetObj.value = "";
		targetObj.style.display='none';
	}
}
/*
 * form에 형태를 맞춰 넣기 위한 메소드
 * type 1 : yyyyMMdd --> MM-dd-yyyy
 */
function modiStrDateType(strDate, type){
	var result="";
	if(type=="1"){
		if(strDate.length!=8){
		}else{
			result += strDate.substring(4,6) + "-" + strDate.substring(6,8) + "-" + strDate.substring(0,4);
		}
	}else{
	}
	return result;
}
function saveStockAjaxReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
		}
	}else{
		//Error Errupt!	
		alert(getLabel('FMS_COM_ERR001'));		
	}
}


function textAddPck(obj, val, obj1){
	if(setPckDescFlag == 'Y'){
		var org = frm1.pck_qty_container.value + ' ' + frm1.pck_ut_cd_container.value;
		obj1.value=val;
	
		//package qty = 0 or package qty = '' 이고 package code가 blank 인 경우는 이미 mark&Desc에서 항목이 제거된 상태라 스킵한다. 
		if((frm1.pck_qty.value == '' || frm1.pck_qty.value == 0) && (frm1.pck_ut_cd.value=='')){
			return;
		}
		//package qty = 0 or package code가 blank 인 경우, 기존에 입력된 pck_qty + pck_cd를 지운다.
		if((obj1.name == 'pck_qty_container' && val==0)
				|| (obj1.name == 'pck_ut_cd_container' && val=='')){
			obj.value=obj.value.replace(org, '');
			return;
		}
		
		//Package qty& Package code 값을 설정한 경우.
		if(frm1.pck_qty_container.value != 0 && frm1.pck_ut_cd_container.value != ''){
				
			
			if(obj.value.indexOf(org) == -1) {
				obj.value += "\r\n" ;
				obj.value += frm1.pck_qty_container.value + ' ' + frm1.pck_ut_cd_container.value;
			} else {
				obj.value=obj.value.replace(org, frm1.pck_qty_container.value + ' ' + frm1.pck_ut_cd_container.value);
			}
		
			obj.value=obj.value.toUpperCase();
			obj1.value=obj1.value.toUpperCase();
		}
	}
}

//B/L Info.중에서 description에 정보를 추가해야할 경우 아래 function으로 수행함
function textAdd(obj, text, val, obj1){
	//#4886 [Best Ocean]A/N, Authority,Release order mark& desc space
	//#5556 [BNX] A/N Commodity issue
	if(obj1.value == '' || obj.value.search(text+obj1.value) == -1){
		if(obj.value != '' && obj.value.slice(-1) != "\n"){
			obj.value += "\r\n";
		}
		obj.value += text + val;
		obj1.value=val;	
	}else{		
		obj.value=obj.value.replace(text+obj1.value, text+val);		
		obj1.value=val;		
	}
	
	obj.value=obj.value.toUpperCase();
	obj1.value=obj1.value.toUpperCase();
//	var tmp = obj.value.split("\n");
//	var num = 0;
//
//	for(var i=0 ; i<tmp.length ; i++){
//		var chk = tmp[i].indexOf(text);
//		if(chk==0){
//			num = i;
//		}
//	}
//
//	if(num==0){
//		obj.value += "\n";
//		obj.value += text + val;
//	}else{
//		//copy
//		obj.value = "";
//		
//		for(var j=0 ; j<tmp.length ; j++){
//			if(num==j){
//				obj.value += text + val;
//				obj.value += "\n";
//			}else{
//				obj.value += tmp[j];
//			}
//		}
//	}
}
//B/L Info.중에서 description에 정보를 추가해야할 경우 아래 function으로 수행함 (type이 1이면 국가별 옵션 지정)
function textAdd1(obj, text, val, obj1, type){

	if(obj1.value == '' || obj.value.search(text+obj1.value) == -1){
		if(type==1){
			if(user_ofc_cnt_cd=="JP"){
				obj.value=text + val + "\r\n" + obj.value;
			}else{
				if(obj.value != '' && obj.value.slice(-1) != "\n"){
					obj.value += "\r\n";
				}
				obj.value += text + val;
			}
		}else{
			if(obj.value != '' && obj.value.slice(-1) != "\n"){
				obj.value += "\r\n";
			}
			obj.value += text + val;
		}
		obj1.value=val;
	}else{
		obj.value=obj.value.replace(text+obj1.value, text+val);
		obj1.value=val;
	}
	obj.value=obj.value.toUpperCase();
	obj1.value=obj1.value.toUpperCase();
}
//B/L Info.중에서 description에 정보를 추가해야할 경우 아래 function으로 수행함
/* #20915 - [BINEX] OEH - B/L Entry에서 PO No.를 삭제해도 Description에 PO가 남아 있음 (L/C No & Inv No: 포함) jsjang 2013.9.24 */
function textdescAdd(obj, text, val, obj1){
	var tmp=obj.value.split("\r\n");
	var num=0;
	var num1=0;
	if(obj.value.length == 0)
	{
		obj.value=(text + val).toUpperCase();
		obj1.value=val.toUpperCase();
		return;
	}
	for(var i=0 ; i<tmp.length ; i++){
		//alert(tmp[i]);
		//alert(tmp[i].indexOf(text));
		var chk=tmp[i].indexOf(text);
		if(chk==0){
			num=num+1;
		}
	}
	for(var i=0 ; i<tmp.length ; i++){
		var chk1=tmp[i].indexOf("\r\n");
		if(chk1 > 0){
			num1=num1+1;
			break;
		}		
	}	
	//alert(obj1.value);
	//alert(num);
	// 값이 없다가 생성
	//if(obj1.value=='' && num ==0){
	if(num ==0){
		if(num1 > 0){
			obj.value=obj.value.replace("\r\n", "");
		}else{
			obj.value += "\r\n";
		}
		obj.value += (text + val).toUpperCase();;
	}else{
		//alert(text+obj1.value);
		//alert(text+val);
		if(val != "")
		{
			//alert("44");
			//alert(text+obj1.value.toUpperCase());
			//alert(text+val.toUpperCase());
			//if(obj.value.indexOf("\r\n") == 0)
			//{
			obj.value=obj.value.toUpperCase();
			obj.value=obj.value.replace(text+obj1.value.toUpperCase(), text+val.toUpperCase());
		}else{
			//alert("55");
			obj.value=obj.value.replace("\r\n", "");
			obj.value=obj.value.replace(text+obj1.value.toUpperCase(), "");
		}
	}
	obj1.value=val.toUpperCase();
	//#1181 [OEH Packing List] Show error message "System error!" when input max length and save data
	ComBizChkLen(obj, obj.maxLength);
	
	//값이 잇는데 바뀜
	// 값이 있다가 없어짐
	/*
	var tmp=obj.value.split("\n");
	var num=0;
	for(var i=0 ; i<tmp.length ; i++){
		var chk=tmp[i].indexOf(text);
		if(chk==0){
			num=i;
		}
	}
	if(num==0){
		obj.value += "\n";
		obj.value += text + val;
	}else{
		//copy
		obj.value="";
		for(var j=0 ; j<tmp.length ; j++){
			if(num==j){
				obj.value += text + val;
				obj.value += "\n";
			}else{
				obj.value += tmp[j];
			}
		}
	}
	*/
}
function setFrtSizeUp(sheetObj, id){
//	document.getElementById(id).width = '800px';			//width
	sheetObj.SetSheetHeight(350);//height
//	sheetObj.FitColWidth();
}
function setFrtSizeDown(sheetObj, id){
//	document.getElementById(id).width = '800px';			//width
	sheetObj.SetSheetHeight(150);//height
//	sheetObj.FitColWidth();
}
function setSizeUp(sheetObj, height){
//	document.getElementById(id).width = '800px';			//width
	sheetObj.SetSheetHeight(height, 1);//height
//	sheetObj.FitColWidth();
}
function setSizeDown(sheetObj, height){
//	document.getElementById(id).width = '800px';			//width
	sheetObj.SetSheetHeight(height, 1);//height
//	sheetObj.FitColWidth();
}
function timeCheck(obj){
	var size=obj.value.length;
	if(size==1){
		obj.value="0" + obj.value + ":00";
	}else if(size==2){
		if(hourCheck(obj.value)){
			obj.value=obj.value + ":00";
		}else{
			obj.value='';
		}
	}else if(size==3){
		if(hourCheck(obj.value.substring(0,2))){
			if(obj.value.substring(2,3)>5 || obj.value.substring(2,3)<0){
				obj.value='';
			}else if(obj.value.substring(2,3) == ":"){
				obj.value=obj.value.substring(0,2) + ":" + "00";
			}else{
				obj.value=obj.value.substring(0,2) + ":" + obj.value.substring(2,3) + "0";
			}
		}else{
			obj.value='';
		}
	}else if(size==4){
		if(hourCheck(obj.value.substring(0,2))){
			if(minuteCheck(obj.value.substring(2,4))){
				obj.value=obj.value.substring(0,2) + ":" + obj.value.substring(2,4);
			}else{
				obj.value='';
			}
		}else{
			obj.value='';
		}
	}
}
function hourCheck(obj){
	if(isNaN(obj)){
		alert(getLabel('COM_FRT_ALT002'));
		return false;
	}
	if(obj>23 || obj<0){
		//HOUR: 0-23
		alert(getLabel('COM_FRT_ALT002'));
		return false;
	}else{
		return true;
	}
}
function minuteCheck(obj){
	if(isNaN(obj)){
		alert(getLabel('COM_FRT_ALT003'));
		return false;
	}
	if(obj>59 || obj<0){
		//alert('0-59');
		alert(getLabel('COM_FRT_ALT003'));
		return false;
	}else{
		return true;
	}
}
function onlyNumberCheck(sSubChar){
    var keyValue=event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
    if((keyValue >= 48 && keyValue <= 57) || keyValue == 8 || keyValue == 46) {//숫자
        event.returnValue=true;
    } else if(sSubChar != undefined && sSubChar != null && sSubChar.constructor==String && sSubChar.length > 0) {
    	//SubChar가 여러개 설정된 경우 여러개 글자 모두 처리한다.
    	for(var i=0; i<sSubChar.length; i++) {
     		if (keyValue == sSubChar.charCodeAt(i)) {
                event.returnValue=true;
                return;
    		}
    	}
        event.returnValue=false;
    } else {
        event.returnValue=false;
    }
}


function onlyIntCheck(){	
    var keyValue=event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;    
    if((keyValue >= 48 && keyValue <= 57) || keyValue == 8) {//숫자
        event.returnValue=true;
    } else {
        event.returnValue=false;
    }
}




function woOpenPopUp(air_sea_clss_cd){
	if(air_sea_clss_cd=='S'){
		rtnary=new Array(2);   		
		rtnary[0]='';
		rtnary[1]='';
		rtnary[2]='';
		callBackFunc = "woOpenPopUp_callBackFunc1";
		modal_center_open('./CMM_POP_0350.clt', rtnary, 756,480,"yes");
	}else{
		rtnary=new Array(2);   		
		rtnary[0]='';
		rtnary[1]='';
		rtnary[2]='';
		callBackFunc = "woOpenPopUp_callBackFunc2";
		modal_center_open('./CMM_POP_0350.clt', rtnary, 756,480,"yes");
	}
}
function getDimInfo(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			tmpVal=doc[1].split("@;;");
			for(var i=0 ; i<tmpVal.length-1 ; i++){
				rltVal=tmpVal[i].split("@^^");
				gridAdd(1);
				docObjects[1].SetCellValue(docObjects[1].LastRow(), "dim_len_dim",rltVal[0],0);
				docObjects[1].SetCellValue(docObjects[1].LastRow(), "dim_wdt_dim",rltVal[1],0);
				docObjects[1].SetCellValue(docObjects[1].LastRow(), "dim_hgt_dim",rltVal[2],0);
				docObjects[1].SetCellValue(docObjects[1].LastRow(), "dim_pce_qty",rltVal[3],0);
				sheet13_OnChange(docObjects[1], docObjects[1].LastRow(), 5);
			}
		}
	}else{
		//REFINE THIS MESSAGE (2012.11.26)
		alert(getLabel('FMS_COM_ALT007'));		
	}
}
function getDimInfoAir(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			tmpVal=doc[1].split("@;;");
			for(var i=0 ; i<tmpVal.length-1 ; i++){
				rltVal=tmpVal[i].split("@^^");
				gridAdd(1);
				docObjects[1].SetCellValue(docObjects[1].LastRow(), "dim_len_dim",rltVal[0],0);
				docObjects[1].SetCellValue(docObjects[1].LastRow(), "dim_wdt_dim",rltVal[1],0);
				docObjects[1].SetCellValue(docObjects[1].LastRow(), "dim_hgt_dim",rltVal[2],0);
				docObjects[1].SetCellValue(docObjects[1].LastRow(), "dim_pce_qty",rltVal[3],0);
				sheet4_OnChange(docObjects[1], docObjects[1].LastRow(), 5);
			}
		}
	}else{
		//REFINE THIS MESSAGE (2012.11.26)
		alert(getLabel('FMS_COM_ALT007'));		
	}
}
var mailTo="";
function getMailTo(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])=="undefined"){
			mailTo="";
		}else{
			mailTo=doc[1];
		}
	}
}
/**********************************************************************/
/* LHK 20130221, 이은조 수석님 요청사항, BL 화면에만 적용함                                      */
/* document에 존재하는 input text에 value값을 판단하여 0인 경우 공백으로 치환한다.*/
/**********************************************************************/ 
$(document).ready(function() {
	$('input.zero_remove').each(function() {
		var tempThis=$(this);
		tempThis.bind('click', function() {
			 if ($(this).val() == 0) {
				 $(this).val('');
			 }
		 });
		 tempThis.bind('focusout', function() {
		     if ($(this).val() == '') {
				 $(this).val(0);
				 $(this).trigger('onchange');
			 }
		 });
	});
 });
/**********************************************************************/
/* LHK 20130222, 이은조 수석님 요청사항, BL 화면에만 적용함                                      */
/* document에 존재하는 textarea의 cols 에 50자 입력시 auto enter 기능 추가          */
/**********************************************************************/ 
function textarea_autoenter_50(obj){
   	var enterText='\r\n';
	var textareaVal=obj.value.replace(/\r/g, '');
	var txtValArr=textareaVal.split('\n');
	var replaceVal='';
	for (var i=0 ; i < txtValArr.length; i++) {
		var rowVal=txtValArr[i];
		var rowLen=rowVal.length;
		if (rowLen > 70) {
			var replaceRowVal='';
			for (var j=0 ; j < rowLen ; j++) {
				rowVal=rowVal.replace(/\n/g, ''); 
				var tempChar=rowVal.charAt(j);
				if (0 < j && j%70 == 0) {
					replaceRowVal += (enterText + tempChar);
				} else {
					replaceRowVal += tempChar;
				}
			}
			rowVal=replaceRowVal;
		}
		if(i>0){
			replaceVal += (enterText + rowVal);
		}else{
			replaceVal += rowVal;
		}
	}
	obj.value=replaceVal;
}
//[OJG 20130303]
/* jsjang 2013.7.18 #16510 CBM Auto Caculation, dim */
var cur_air_sea_clss_cd;
function whRcptOpenPopUp_callBackFunc(rtnVal){
	var air_sea_clss_cd = cur_air_sea_clss_cd;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
 		return;
	}
    var rtnValAry=rtnVal.split("|");
	frm1.wh_recp_no.value=rtnValAry[0];
	//OFVFOUR-6866 - [BNX-LA] Selecting multi-Warehouse Receipt from B/L Entry screen (Zen#3533)
	var sheetObj;
	if(air_sea_clss_cd=='S'){
		sheetObj = docObjects[1];
	}else if (air_sea_clss_cd=='SI'){
		sheetObj = docObjects[11];
	}else if (air_sea_clss_cd=='AI'){
		sheetObj = docObjects[7];
	}else{
		sheetObj = docObjects[1];
	}
	var lastRow = sheetObj.LastRow();
	for(var i=lastRow ; i >=2 ; i--){
		if(sheetObj.GetRowStatus(i)=='I'){
			sheetObj.SetCellValue(i,'del',1);
		}
	}
	clickWHflg=true;
	var dimInfo="getWhDimInfo";
    if(air_sea_clss_cd=='S'){
		if(((frm1.po_no.value == ""
			&& frm1.shpr_trdp_nm.value == ""
				&& frm1.shpr_trdp_addr.value == ""					
					&& frm1.cnee_trdp_cd.value == ""
						&& frm1.cnee_trdp_addr.value == ""
							&& frm1.act_shpr_trdp_cd.value == ""
								&& frm1.act_shpr_trdp_nm.value == ""
									&& frm1.act_shp_info.value == ""
										&& frm1.vndr_trdp_cd.value == ""
											&& frm1.vndr_trdp_nm.value == ""
												&& multiWhFlg != "Y")
			|| (multiWhFlg != "Y" && confirm(getLabel('COM_WHR_CFM004'))))){
			
			ajaxSendPost(getWhDimInfo, 'reqVal', '&goWhere=aj&bcKey=getWhDimInfo&f_wh_recp_no='+rtnValAry[0]+'&f_shpd='+rtnValAry[18], './GateServlet.gsl');
			
			frm1.po_no.value=rtnValAry[1];
			frm1.shpr_trdp_cd.value=rtnValAry[2];
			frm1.shpr_trdp_nm.value=rtnValAry[3];
			frm1.cnee_trdp_cd.value=rtnValAry[4];
			frm1.cnee_trdp_nm.value=rtnValAry[5];
			//frm1.pck_qty.value = rtnValAry[6];
			/*Vinh.Vo 04/23/2015 set actual weight to gross weight from warehouse receipt*/
//			frm1.grs_wgt.value=rtnValAry[7];
//			frm1.grs_wgt1.value=rtnValAry[8];
			frm1.grs_wgt.value=rtnValAry[19];
			frm1.grs_wgt1.value=rtnValAry[20];
			//OFVFOUR-7843: [PQC][OEM B/L List] - Load Plan displays KG and LB = 0
			frm1.mk_grs_wgt.value=frm1.grs_wgt.value;
			frm1.mk_grs_wgt1.value=frm1.grs_wgt1.value;
			/*Vinh.Vo (E)*/
			//frm1.meas.value=Number(rtnValAry[9]).toFixed(3);
			//cbmChange(frm1.meas);
			amountChange(frm1.agent_rt);amountChange(frm1.cust_rt);
			//#5618 [BNX] HBL Entry 화면에서 Warehouse list 정보 불러올때 추가 옵션 요청
			chkSizeType();
			//frm1.meas1.value = rtnValAry[6];
			frm1.shpr_trdp_addr.value=rtnValAry[13];
			frm1.cnee_trdp_addr.value=rtnValAry[14];
			frm1.vndr_trdp_cd.value=rtnValAry[15];
			frm1.vndr_trdp_nm.value=rtnValAry[16];
			frm1.vndr_trdp_addr.value=rtnValAry[17];
			//if(frm1.act_shpr_trdp_cd.value == ""){
				frm1.act_shpr_trdp_cd.value=rtnValAry[2];
				frm1.act_shpr_trdp_nm.value=rtnValAry[3];
				frm1.act_shp_info.value=rtnValAry[13];
			//}
		}else{
			//#5618 [BNX] HBL Entry 화면에서 Warehouse list 정보 불러올때 추가 옵션 요청
			ajaxSendPost(getWhDimInfo, 'reqVal', '&goWhere=aj&bcKey=getWhDimInfo&f_wh_recp_no='+rtnValAry[0]+'&f_shpd='+rtnValAry[18], './GateServlet.gsl');

			if(multiWhFlg == "Y"){
				//OFVFOUR-7843: [PQC][OEM B/L List] - Load Plan displays KG and LB = 0
				frm1.mk_grs_wgt.value= frm1.grs_wgt.value;
				frm1.mk_grs_wgt1.value= frm1.grs_wgt1.value;
			}else{
				//OFVFOUR-7843: [PQC][OEM B/L List] - Load Plan displays KG and LB = 0
				frm1.mk_grs_wgt.value = frm1.grs_wgt.value;
				frm1.mk_grs_wgt1.value = frm1.grs_wgt1.value;
			}

			//OFVFOUR-6866 - [BNX-LA] Selecting multi-Warehouse Receipt from B/L Entry screen (Zen#3533)			
			frm1.grs_wgt.value=rtnValAry[19];
			frm1.grs_wgt1.value=rtnValAry[20];

			//frm1.meas.value=Number(rtnValAry[9]).toFixed(3);
			//cbmChange(frm1.meas);
			amountChange(frm1.agent_rt);amountChange(frm1.cust_rt);
			//#5618 [BNX] HBL Entry 화면에서 Warehouse list 정보 불러올때 추가 옵션 요청
			chkSizeType();
		}
//		else{
//			if(confirm(getLabel('COM_WHR_CFM004'))){
//				frm1.po_no.value=rtnValAry[1];
//				frm1.shpr_trdp_cd.value=rtnValAry[2];
//				frm1.shpr_trdp_nm.value=rtnValAry[3];
//				frm1.cnee_trdp_cd.value=rtnValAry[4];
//				frm1.cnee_trdp_nm.value=rtnValAry[5];
//				//frm1.pck_qty.value = rtnValAry[6];
//				frm1.grs_wgt.value=rtnValAry[7];
//				frm1.grs_wgt1.value=rtnValAry[8];
//				frm1.meas.value=rtnValAry[9];
//				//frm1.meas1.value = rtnValAry[6];
//				frm1.shpr_trdp_addr.value=rtnValAry[13];
//				frm1.cnee_trdp_addr.value=rtnValAry[14];
//				frm1.vndr_trdp_cd.value=rtnValAry[15];
//				frm1.vndr_trdp_nm.value=rtnValAry[16];
//				frm1.vndr_trdp_addr.value=rtnValAry[17];
//				//if(frm1.act_shpr_trdp_cd.value == ""){
//					frm1.act_shpr_trdp_cd.value=rtnValAry[2];
//					frm1.act_shpr_trdp_nm.value=rtnValAry[3];
//					frm1.act_shp_info.value=rtnValAry[13];
//				//}
//			}
//		}
		//alert(rtnValAry[18]);
		//Warehouse Dimension ADD
		//ajaxSendPost(getWhDimInfo, 'reqVal', '&goWhere=aj&bcKey=getWhDimInfo&f_wh_recp_no='+rtnValAry[0]+'&f_shpd='+rtnValAry[18], './GateServlet.gsl');
		/* 무조건 ADD
		if(rtnValAry[6] != '' || rtnValAry[10] != '' || rtnValAry[11] != '' || rtnValAry[12] != '' ){
			//docObjects[1].RemoveAll();
			for(var i=0; i<docObjects[1].RowCount(); i++){
if(docObjects[1].GetCellValue(i+1, "dim_ibflag") =='I'){
					docObjects[1].RowDelete(i+1, false);
				}else{
					docObjects[1].SetCellValue(i+1, "del","1");
					docObjects[1].SetCellValue(i+1, "dim_pce_qty",0);
					docObjects[1].SetRowHidden(i+1,1);
				}
			}
			//6, 10, 11, 12
			var rowCnt=docObjects[1].RowCount()+ 1//docObjects[1].SearchRows();
   		   	if(rowCnt==0){
   			   rowCnt=1;
   		   	}
   		   	docObjects[1].DataInsert(rowCnt);
   		   	docObjects[1].SetCellValue(rowCnt, "dim_pce_qty",rtnValAry[6]);
   		   	docObjects[1].SetCellValue(rowCnt, "dim_len_dim",rtnValAry[10]);
   		   	docObjects[1].SetCellValue(rowCnt, "dim_wdt_dim",rtnValAry[11]);
   		   	docObjects[1].SetCellValue(rowCnt, "dim_hgt_dim",rtnValAry[12]);
		}
    */
    }else if(air_sea_clss_cd=='SI')
    {
    	//var rtnValAry = rtnVal.split("|");
		//frm1.wh_recp_no.value  = rtnValAry[0];
    	//dimInfo = 
		if(((frm1.po_no.value == ""
			&& frm1.shpr_trdp_nm.value == ""
				&& frm1.shpr_trdp_addr.value == ""
					&& frm1.cnee_trdp_cd.value == ""
						&& frm1.cnee_trdp_addr.value == ""
							&& frm1.act_shpr_trdp_cd.value == ""
								&& frm1.act_shpr_trdp_nm.value == ""
									&& frm1.act_shp_info.value == ""
										&& multiWhFlg != "Y")
			//#5618 [BNX] HBL Entry 화면에서 Warehouse list 정보 불러올때 추가 옵션 요청
			|| (multiWhFlg != "Y" && confirm(getLabel('COM_WHR_CFM005')))) ){
			
			ajaxSendPost(getWhDimInfo_si, 'reqVal', '&goWhere=aj&bcKey=getWhDimInfo&f_wh_recp_no='+rtnValAry[0]+'&f_shpd='+rtnValAry[18], './GateServlet.gsl');
			
			frm1.po_no.value=rtnValAry[1];
			frm1.shpr_trdp_cd.value=rtnValAry[2];
			frm1.shpr_trdp_nm.value=rtnValAry[3];
			frm1.cnee_trdp_cd.value=rtnValAry[4];
			frm1.cnee_trdp_nm.value=rtnValAry[5];
			//frm1.pck_qty.value = rtnValAry[6];
			/*Vinh.Vo 23/04/2015 (S) set actual weight to gross weight from warehouse receipt*/
//			frm1.grs_wgt.value=rtnValAry[7];
//			frm1.grs_wgt1.value=rtnValAry[8];
			frm1.grs_wgt.value=rtnValAry[19];
			frm1.grs_wgt1.value=rtnValAry[20];
			/*Vinh.Vo 23/04/2015 (E)*/
			//frm1.meas.value=Number(rtnValAry[9]).toFixed(3);
			//cbmChange(frm1.meas);
			//#5618 [BNX] HBL Entry 화면에서 Warehouse list 정보 불러올때 추가 옵션 요청
			chkSizeType();
			//frm1.meas1.value = rtnValAry[6];
			frm1.shpr_trdp_addr.value=rtnValAry[13];
			frm1.cnee_trdp_addr.value=rtnValAry[14];
//			frm1.shpr_trdp_addr.value=rtnValAry[13];
//			frm1.cnee_trdp_addr.value=rtnValAry[14];
			//frm1.vndr_trdp_cd.value = rtnValAry[15];
			//frm1.vndr_trdp_nm.value = rtnValAry[16];
			//frm1.vndr_trdp_addr.value = rtnValAry[17];
			//if(frm1.act_shpr_trdp_cd.value == ""){
			//#5618 [BNX] HBL Entry 화면에서 Warehouse list 정보 불러올때 추가 옵션 요청
				frm1.act_shpr_trdp_cd.value=rtnValAry[4];
				frm1.act_shpr_trdp_nm.value=rtnValAry[5];
				frm1.act_shp_info.value=rtnValAry[14];
			//}
		}else{
			//#5618 [BNX] HBL Entry 화면에서 Warehouse list 정보 불러올때 추가 옵션 요청
			ajaxSendPost(getWhDimInfo_si, 'reqVal', '&goWhere=aj&bcKey=getWhDimInfo&f_wh_recp_no='+rtnValAry[0]+'&f_shpd='+rtnValAry[18], './GateServlet.gsl');
			//OFVFOUR-6866 - [BNX-LA] Selecting multi-Warehouse Receipt from B/L Entry screen (Zen#3533)
			frm1.grs_wgt.value=rtnValAry[19];
			frm1.grs_wgt1.value=rtnValAry[20];
			
			//frm1.meas.value=Number(rtnValAry[9]).toFixed(3);
			//cbmChange(frm1.meas);
			//#5618 [BNX] HBL Entry 화면에서 Warehouse list 정보 불러올때 추가 옵션 요청
			chkSizeType();
		}
//		else{
//			if(confirm(getLabel('COM_WHR_CFM004'))){
//				frm1.po_no.value=rtnValAry[1];
//				frm1.shpr_trdp_cd.value=rtnValAry[2];
//				frm1.shpr_trdp_nm.value=rtnValAry[3];
//				frm1.cnee_trdp_cd.value=rtnValAry[4];
//				frm1.cnee_trdp_nm.value=rtnValAry[5];
//				//frm1.pck_qty.value = rtnValAry[6];
//				frm1.grs_wgt.value=rtnValAry[7];
//				frm1.grs_wgt1.value=rtnValAry[8];
//				frm1.meas.value=rtnValAry[9];
//				//frm1.meas1.value = rtnValAry[6];
//				frm1.shpr_trdp_addr.value=rtnValAry[13];
//				frm1.cnee_trdp_addr.value=rtnValAry[14];
//				//frm1.vndr_trdp_cd.value = rtnValAry[15];
//				//frm1.vndr_trdp_nm.value = rtnValAry[16];
//				//frm1.vndr_trdp_addr.value = rtnValAry[17];
//				//if(frm1.act_shpr_trdp_cd.value == ""){
//					frm1.act_shpr_trdp_cd.value=rtnValAry[2];
//					frm1.act_shpr_trdp_nm.value=rtnValAry[3];
//					frm1.act_shp_info.value=rtnValAry[13];
//				//}
//			}
//		}
		//alert(rtnValAry[0]);
		//alert(rtnValAry[18]);
		//Warehouse Dimension ADD
		//ajaxSendPost(getWhDimInfo_si, 'reqVal', '&goWhere=aj&bcKey=getWhDimInfo&f_wh_recp_no='+rtnValAry[0]+'&f_shpd='+rtnValAry[18], './GateServlet.gsl');
	}else if(air_sea_clss_cd=='AI')
	{
		//var rtnValAry = rtnVal.split("|");
		//frm1.wh_recp_no.value  = rtnValAry[0];
		if(((frm1.po_no.value == ""
			&& frm1.shpr_trdp_nm.value == ""
				&& frm1.shpr_trdp_addr.value == ""
					&& frm1.cnee_trdp_cd.value == ""
						&& frm1.cnee_trdp_addr.value == ""
							&& frm1.act_shpr_trdp_cd.value == ""
								&& frm1.act_shpr_trdp_nm.value == ""
									&& frm1.act_shp_info.value == ""
										&& multiWhFlg != "Y")
			//#5618 [BNX] HBL Entry 화면에서 Warehouse list 정보 불러올때 추가 옵션 요청
			|| (multiWhFlg != "Y" && confirm(getLabel('COM_WHR_CFM005'))))){
			
			ajaxSendPost(getWhDimInfo_ai, 'reqVal', '&goWhere=aj&bcKey=getWhDimInfo&f_wh_recp_no='+rtnValAry[0]+'&f_shpd='+rtnValAry[18], './GateServlet.gsl');

			frm1.po_no.value=rtnValAry[1];
			frm1.shpr_trdp_cd.value=rtnValAry[2];
			frm1.shpr_trdp_nm.value=rtnValAry[3];
			frm1.cnee_trdp_cd.value=rtnValAry[4];
			frm1.cnee_trdp_nm.value=rtnValAry[5];
			//frm1.pck_qty.value = rtnValAry[6];
			/*Vinh.Vo - 04/22/2015 (S) Logic changed, refer to "des_01" */
			
//			frm1.grs_wgt.value=rtnValAry[7];
//			frm1.grs_wgt1.value=rtnValAry[8];
			
			var wgt_k = rtnValAry[7];//Dim Weight
			var act_wgt_k = rtnValAry[19];//Actual Weight
			
			
			
			if(parseFloat(act_wgt_k) >= parseFloat(wgt_k)){
				// Actual weight >= Dim Weight => Input Actual Weight into Chargeable Weight
				
				//frm1.chg_wgt.value = roundXL(rtnValAry[19], 1);
				//frm1.chg_wgt1.value = roundXL(rtnValAry[20], 1);
				//#5618 [BNX] HBL Entry 화면에서 Warehouse list 정보 불러올때 추가 옵션 요청
				chkSizeType();
				
			}else{
				// Actual weight < Dim Weight => Input Dim Weight into Chargeable Weight
				
				//frm1.chg_wgt.value = roundXL(rtnValAry[7], 1);
				//frm1.chg_wgt1.value = roundXL(rtnValAry[8], 1);
				//#5618 [BNX] HBL Entry 화면에서 Warehouse list 정보 불러올때 추가 옵션 요청
				chkSizeType();
				
			}
			
			// Both of 2 case, Input Actual Weight into Gross Weight
			
			frm1.grs_wgt.value = roundXL(rtnValAry[19], 1);
			frm1.grs_wgt1.value = roundXL(rtnValAry[20], 1);
			
			/*Vinh.Vo - 04/22/2015 (E)*/
			frm1.vol_meas.value=roundXL(rtnValAry[9], 1);
			//frm1.meas1.value = rtnValAry[6];
			frm1.shpr_trdp_addr.value=rtnValAry[13];
			frm1.cnee_trdp_addr.value=rtnValAry[14];
//			frm1.shpr_trdp_addr.value=rtnValAry[13];
//			frm1.cnee_trdp_addr.value=rtnValAry[14];
			//if(frm1.act_shpr_trdp_cd.value == ""){
			//#5618 [BNX] HBL Entry 화면에서 Warehouse list 정보 불러올때 추가 옵션 요청
				frm1.act_shpr_trdp_cd.value=rtnValAry[4];
				frm1.act_shpr_trdp_nm.value=rtnValAry[5];
				frm1.act_shp_info.value=rtnValAry[14];
			//}
		}else{
			//#5618 [BNX] HBL Entry 화면에서 Warehouse list 정보 불러올때 추가 옵션 요청
			ajaxSendPost(getWhDimInfo_ai, 'reqVal', '&goWhere=aj&bcKey=getWhDimInfo&f_wh_recp_no='+rtnValAry[0]+'&f_shpd='+rtnValAry[18], './GateServlet.gsl');
			var wgt_k = rtnValAry[7];//Dim Weight
			var act_wgt_k = rtnValAry[19];//Actual Weight
			//OFVFOUR-6866 - [BNX-LA] Selecting multi-Warehouse Receipt from B/L Entry screen (Zen#3533)
			if(parseFloat(act_wgt_k) >= parseFloat(wgt_k)){
				// Actual weight >= Dim Weight => Input Actual Weight into Chargeable Weight
				frm1.chg_wgt.value = roundXL(rtnValAry[19], 1);
				frm1.chg_wgt1.value = roundXL(rtnValAry[20], 1);
			}else{
				// Actual weight < Dim Weight => Input Dim Weight into Chargeable Weight
				frm1.chg_wgt.value = roundXL(rtnValAry[7], 1);
				frm1.chg_wgt1.value = roundXL(rtnValAry[8], 1);
			}
			// Both of 2 case, Input Actual Weight into Gross Weight
			frm1.grs_wgt.value = roundXL(rtnValAry[19], 1);
			frm1.grs_wgt1.value = roundXL(rtnValAry[20], 1);
				
			frm1.vol_meas.value=roundXL(rtnValAry[9], 1);
		}			
//		else{
//			if(confirm(getLabel('COM_WHR_CFM004'))){
//				frm1.po_no.value=rtnValAry[1];
//				frm1.shpr_trdp_cd.value=rtnValAry[2];
//				frm1.shpr_trdp_nm.value=rtnValAry[3];
//				frm1.cnee_trdp_cd.value=rtnValAry[4];
//				frm1.cnee_trdp_nm.value=rtnValAry[5];
//				//frm1.pck_qty.value = rtnValAry[6];
//				frm1.grs_wgt.value=rtnValAry[7];
//				frm1.grs_wgt1.value=rtnValAry[8];
//				frm1.vol_meas.value=rtnValAry[9];
//				//frm1.meas1.value = rtnValAry[6];
//				frm1.shpr_trdp_addr.value=rtnValAry[13];
//				frm1.cnee_trdp_addr.value=rtnValAry[14];
//				//if(frm1.act_shpr_trdp_cd.value == ""){
//					frm1.act_shpr_trdp_cd.value=rtnValAry[2];
//					frm1.act_shpr_trdp_nm.value=rtnValAry[3];
//					frm1.act_shp_info.value=rtnValAry[13];
//				//}
//			}
//		}
		//Warehouse Dimension ADD
		//ajaxSendPost(getWhDimInfo_ai, 'reqVal', '&goWhere=aj&bcKey=getWhDimInfo&f_wh_recp_no='+rtnValAry[0]+'&f_shpd='+rtnValAry[18], './GateServlet.gsl');
		/* 무조건 ADD
		if(rtnValAry[6] != '' || rtnValAry[10] != '' || rtnValAry[11] != '' || rtnValAry[12] != '' ){
			//docObjects[1].RemoveAll();
			for(var i=2; i<docObjects[1].RowCount()+2; i++){
if(docObjects[1].GetCellValue(i, "dim_ibflag") =='I'){
					docObjects[1].RowDelete(i, false);
				}else{
					docObjects[1].SetCellValue(i, "del","1");
					docObjects[1].SetCellValue(i, "dim_pce_qty",0);
					docObjects[1].SetRowHidden(i,1);
				}
			}
			//6, 10, 11, 12
			var rowCnt=docObjects[1].RowCount()+ 2//docObjects[1].SearchRows();
   		   	if(rowCnt==0){
   			   rowCnt=1;
   		   	}
   		   	docObjects[1].DataInsert(rowCnt);
   		   	docObjects[1].SetCellValue(rowCnt, "dim_pce_qty",rtnValAry[6]);
   		   	docObjects[1].SetCellValue(rowCnt, "dim_len_dim",rtnValAry[10]);
   		   	docObjects[1].SetCellValue(rowCnt, "dim_wdt_dim",rtnValAry[11]);
   		   	docObjects[1].SetCellValue(rowCnt, "dim_hgt_dim",rtnValAry[12]);
		}
    */
	}else{
		//var rtnValAry = rtnVal.split("|");
		//frm1.wh_recp_no.value  = rtnValAry[0];
		if(((frm1.po_no.value == ""
			&& frm1.shpr_trdp_nm.value == ""
				&& frm1.shpr_trdp_addr.value == ""
					&& frm1.cnee_trdp_cd.value == ""
						&& frm1.cnee_trdp_addr.value == ""
							&& frm1.act_shpr_trdp_cd.value == ""
								&& frm1.act_shpr_trdp_nm.value == ""
									&& frm1.act_shp_info.value == ""
										&& multiWhFlg != "Y")
			|| (multiWhFlg != "Y" && confirm(getLabel('COM_WHR_CFM004'))))){
			
			ajaxSendPost(getWhDimInfo, 'reqVal', '&goWhere=aj&bcKey=getWhDimInfo&f_wh_recp_no='+rtnValAry[0]+'&f_shpd='+rtnValAry[18], './GateServlet.gsl');

			frm1.po_no.value=rtnValAry[1];
			frm1.shpr_trdp_cd.value=rtnValAry[2];
			frm1.shpr_trdp_nm.value=rtnValAry[3];
			frm1.cnee_trdp_cd.value=rtnValAry[4];
			frm1.cnee_trdp_nm.value=rtnValAry[5];
			//frm1.pck_qty.value = rtnValAry[6];
			
			/*Vinh.Vo - 04/22/2015 (S) Logic changed, refer to "des_01" */
			
//			frm1.grs_wgt.value=rtnValAry[7];
//			frm1.grs_wgt1.value=rtnValAry[8];
			
			var wgt_k = rtnValAry[7];//Dim Weight
			var act_wgt_k = rtnValAry[19];//Actual Weight
			
			
			
			if(parseFloat(act_wgt_k) >= parseFloat(wgt_k)){
				// Actual weight >= Dim Weight => Input Actual Weight into Chargeable Weight(2)
				
				frm1.agent_chg_wgt.value = roundXL(rtnValAry[19], 1);
				frm1.agent_chg_wgt1.value = roundXL(rtnValAry[20], 1);
				frm1.chg_wgt.value = roundXL(rtnValAry[19], 1);
				frm1.chg_wgt1.value = roundXL(rtnValAry[20], 1);
				
			}else{
				// Actual weight < Dim Weight => Input Dim Weight into Chargeable Weight(2)
				
				frm1.agent_chg_wgt.value = roundXL(rtnValAry[7], 1);
				frm1.agent_chg_wgt1.value = roundXL(rtnValAry[8], 1);
				frm1.chg_wgt.value = roundXL(rtnValAry[7], 1);
				frm1.chg_wgt1.value = roundXL(rtnValAry[8], 1);
				
			}
			
			// Both of 2 case, Input Dim Weight into Volume Weight and Actual Weight into Gross Weight(2)
			
			//frm1.vol_wgt.value = roundXL(rtnValAry[7], 1);
			//#5618 [BNX] HBL Entry 화면에서 Warehouse list 정보 불러올때 추가 옵션 요청
			chkSizeType();
			
			frm1.agent_grs_wgt.value = roundXL(rtnValAry[19], 1);
			frm1.agent_grs_wgt1.value = roundXL(rtnValAry[20], 1);
			
			frm1.grs_wgt.value = roundXL(rtnValAry[19], 1);
			frm1.grs_wgt1.value = roundXL(rtnValAry[20], 1);
			
			/*Vinh.Vo - 04/22/2015 (E)*/
			//#5618 [BNX] HBL Entry 화면에서 Warehouse list 정보 불러올때 추가 옵션 요청
			//frm1.vol_meas.value=roundXL(rtnValAry[9], 1);
			
			//frm1.meas1.value = rtnValAry[6];
			frm1.shpr_trdp_addr.value=rtnValAry[13];
			frm1.cnee_trdp_addr.value=rtnValAry[14];
			/*frm1.shpr_trdp_addr.value=rtnValAry[13];
			frm1.cnee_trdp_addr.value=rtnValAry[14];*/
			//if(frm1.act_shpr_trdp_cd.value == ""){
				frm1.act_shpr_trdp_cd.value=rtnValAry[2];
				frm1.act_shpr_trdp_nm.value=rtnValAry[3];
				frm1.act_shp_info.value=rtnValAry[13];
			//}
				
			pckChange();
		    sGrsChange();
		    cGrsChange();
		    rtChange();
		    sChgChange();
		    cChgChange();
		    sRtChange();
		    cRtChange();
		    sAmtChange();
		    cAmtChange();
		}else{
			//#5618 [BNX] HBL Entry 화면에서 Warehouse list 정보 불러올때 추가 옵션 요청
			ajaxSendPost(getWhDimInfo, 'reqVal', '&goWhere=aj&bcKey=getWhDimInfo&f_wh_recp_no='+rtnValAry[0]+'&f_shpd='+rtnValAry[18], './GateServlet.gsl');
			//#3346 AEH GROSS
			var wgt_k = rtnValAry[7];//Dim Weight
			var act_wgt_k = rtnValAry[19];//Actual Weight
			//OFVFOUR-6866 - [BNX-LA] Selecting multi-Warehouse Receipt from B/L Entry screen (Zen#3533)
			if(parseFloat(act_wgt_k) >= parseFloat(wgt_k)){
				// Actual weight >= Dim Weight => Input Actual Weight into Chargeable Weight(2)		
				frm1.agent_chg_wgt.value = roundXL(rtnValAry[19], 1);
				frm1.agent_chg_wgt1.value = roundXL(rtnValAry[20], 1);
				frm1.chg_wgt.value = roundXL(rtnValAry[19], 1);
				frm1.chg_wgt1.value = roundXL(rtnValAry[20], 1);
					
			}else{
				// Actual weight < Dim Weight => Input Dim Weight into Chargeable Weight(2)
					
				frm1.agent_chg_wgt.value = roundXL(rtnValAry[7], 1);
				frm1.agent_chg_wgt1.value = roundXL(rtnValAry[8], 1);
				frm1.chg_wgt.value = roundXL(rtnValAry[7], 1);
				frm1.chg_wgt1.value = roundXL(rtnValAry[8], 1);
			}
				
				// Both of 2 case, Input Dim Weight into Volume Weight and Actual Weight into Gross Weight(2)
				
			frm1.vol_wgt.value = roundXL(rtnValAry[7], 1);
				
			frm1.agent_grs_wgt.value = roundXL(rtnValAry[19], 1);
			frm1.agent_grs_wgt1.value = roundXL(rtnValAry[20], 1);
				
			frm1.grs_wgt.value = roundXL(rtnValAry[19], 1);
			frm1.grs_wgt1.value = roundXL(rtnValAry[20], 1);
				
			frm1.vol_meas.value=roundXL(rtnValAry[9], 1);
			
			pckChange();
		    sGrsChange();
		    cGrsChange();
		    rtChange();
		    sChgChange();
		    cChgChange();
		    sRtChange();
		    cRtChange();
		    sAmtChange();
		    cAmtChange();
		}		
//		else{
//			if(confirm(getLabel('COM_WHR_CFM004'))){
//				frm1.po_no.value=rtnValAry[1];
//				frm1.shpr_trdp_cd.value=rtnValAry[2];
//				frm1.shpr_trdp_nm.value=rtnValAry[3];
//				frm1.cnee_trdp_cd.value=rtnValAry[4];
//				frm1.cnee_trdp_nm.value=rtnValAry[5];
//				//frm1.pck_qty.value = rtnValAry[6];
//				frm1.grs_wgt.value=rtnValAry[7];
//				frm1.grs_wgt1.value=rtnValAry[8];
//				frm1.vol_meas.value=rtnValAry[9];
//				//frm1.meas1.value = rtnValAry[6];
//				frm1.shpr_trdp_addr.value=rtnValAry[13];
//				frm1.cnee_trdp_addr.value=rtnValAry[14];
//				//if(frm1.act_shpr_trdp_cd.value == ""){
//					frm1.act_shpr_trdp_cd.value=rtnValAry[2];
//					frm1.act_shpr_trdp_nm.value=rtnValAry[3];
//					frm1.act_shp_info.value=rtnValAry[13];
//				//}
//			}
//		}
		//Warehouse Dimension ADD
		//ajaxSendPost(getWhDimInfo, 'reqVal', '&goWhere=aj&bcKey=getWhDimInfo&f_wh_recp_no='+rtnValAry[0]+'&f_shpd='+rtnValAry[18], './GateServlet.gsl');
	}
}
function whRcptOpenPopUp(air_sea_clss_cd){
	cur_air_sea_clss_cd = air_sea_clss_cd;
	
	rtnary=new Array(2);   		
	rtnary[0]='';
	rtnary[1]='';
	rtnary[2]='';
	callBackFunc = "whRcptOpenPopUp_callBackFunc";
	if(multiWhFlg=="Y"){
		var param="?wh_recp_no_exists="+wh_recp_no_exists_sql;
		modal_center_open('./WHR_POP_0010.clt'+param, rtnary, 1300,580,"yes");
	}else{
		modal_center_open('./WHR_POP_0010.clt', rtnary, 1300,580,"yes");
	}
	
}
//[OJG 20130303]
function getWhDimInfo(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			tmpVal=doc[1].split("@;;");
			for(var i=0 ; i<tmpVal.length-1 ; i++){
				rltVal=tmpVal[i].split("@^^");
				gridAdd(1);
				docObjects[1].SetCellValue(docObjects[1].LastRow(), "dim_len_dim",rltVal[0]);
				docObjects[1].SetCellValue(docObjects[1].LastRow(), "dim_wdt_dim",rltVal[1]);
				docObjects[1].SetCellValue(docObjects[1].LastRow(), "dim_hgt_dim",rltVal[2]);
				docObjects[1].SetCellValue(docObjects[1].LastRow(), "dim_pce_qty",rltVal[3]);
				
				/*Vinh.Vo - 04/22/2015 (S)*/
				docObjects[1].SetCellValue(docObjects[1].LastRow(), "dim_wh_recp_no",rltVal[4]);
				/*Vinh.Vo - 04/22/2015 (E)*/
			}
		}
	}else{
		//REFINE THIS MESSAGE (2012.11.26)
		alert(getLabel('FMS_COM_ALT007'));		
	}
}
/* jsjang 2013.7.18 #16510 CBM Auto Caculation, dim */
function getWhDimInfo_si(reqVal){
	//alert(reqVal.responseText);
	var doc=getAjaxMsgXML(reqVal);
	//alert(doc[1]);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			tmpVal=doc[1].split("@;;");
			for(var i=0 ; i<tmpVal.length-1 ; i++){
				rltVal=tmpVal[i].split("@^^");
				gridAdd(11);
				//alert(rltVal[0]);
				docObjects[11].SetCellValue(docObjects[11].LastRow(), "dim_len_dim",rltVal[0]);
				docObjects[11].SetCellValue(docObjects[11].LastRow(), "dim_wdt_dim",rltVal[1]);
				docObjects[11].SetCellValue(docObjects[11].LastRow(), "dim_hgt_dim",rltVal[2]);
				docObjects[11].SetCellValue(docObjects[11].LastRow(), "dim_pce_qty",rltVal[3]);
				
				/*Vinh.Vo - 04/23/2015 (S)*/
				docObjects[11].SetCellValue(docObjects[11].LastRow(), "dim_wh_recp_no",rltVal[4]);
				/*Vinh.Vo - 04/23/2015 (E)*/
			}
		}
	}else{
		//REFINE THIS MESSAGE (2012.11.26)
		alert(getLabel('FMS_COM_ALT007'));		
	}
}
/* jsjang 2013.7.18 #16510 CBM Auto Caculation, dim */
function getWhDimInfo_ai(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			tmpVal=doc[1].split("@;;");
			for(var i=0 ; i<tmpVal.length-1 ; i++){
				rltVal=tmpVal[i].split("@^^");
				gridAdd(7);
				docObjects[7].SetCellValue(docObjects[7].LastRow(), "dim_len_dim",rltVal[0]);
				docObjects[7].SetCellValue(docObjects[7].LastRow(), "dim_wdt_dim",rltVal[1]);
				docObjects[7].SetCellValue(docObjects[7].LastRow(), "dim_hgt_dim",rltVal[2]);
				docObjects[7].SetCellValue(docObjects[7].LastRow(), "dim_pce_qty",rltVal[3]);
				
				/*Vinh.Vo - 04/23/2015 (S)*/
				docObjects[7].SetCellValue(docObjects[7].LastRow(), "dim_wh_recp_no",rltVal[4]);
				/*Vinh.Vo - 04/23/2015 (E)*/
			}
		}
	}else{
		//REFINE THIS MESSAGE (2012.11.26)
		alert(getLabel('FMS_COM_ALT007'));		
	}
}
//[20140401 OJG] TP 정보 Clear 처리
function clearBlPrnr(blTrdpTpCd){
	//alert();
	var formObj=document.frm1;
	switch(blTrdpTpCd) {
		case "S01":			// S01	SHIPPER
			formObj.shpr_trdp_cd.value="";
			formObj.shpr_trdp_nm.value="";
			formObj.shpr_trdp_addr.value="";
			break;
		case "S02":			// S02	CUSTOMER=A/SHIPPER
			formObj.act_shpr_trdp_cd.value="";
			formObj.act_shpr_trdp_nm.value="";
			formObj.act_shp_info.value="";
			break;
		case "C01":		//C01	CONSIGNEE
			formObj.cnee_trdp_cd.value="";
			formObj.cnee_trdp_nm.value="";
			formObj.cnee_trdp_addr.value="";
			break;
		case "C03":		//C03	CUSTOM BROKER
			formObj.cust_trdp_cd.value="";
			formObj.cust_trdp_nm.value="";
			formObj.cust_trdp_addr.value="";
			break;
		case "N01":		//N01	NOTIFY
			formObj.ntfy_trdp_cd.value="";
			formObj.ntfy_trdp_nm.value="";
			formObj.ntfy_trdp_addr.value="";
			break;
		case "A01":		//A01	Forwarding Agent
			formObj.agent_trdp_cd.value="";
			formObj.agent_trdp_nm.value="";
			formObj.agent_trdp_addr.value="";
			break;
		case "P01":		//P01	Destination Agent
			formObj.prnr_trdp_cd.value="";
			formObj.prnr_trdp_nm.value="";
			formObj.prnr_trdp_addr.value="";
			break;
		case "P03":		//P03	Triangle Agent
			formObj.prnr_trdp_cd2.value="";
			formObj.prnr_trdp_nm2.value="";
			formObj.prnr_trdp_addr2.value="";
			break;
		case "V01":		//V01	Vendor
			formObj.vndr_trdp_cd.value="";
			formObj.vndr_trdp_nm.value="";
			formObj.vndr_trdp_addr.value="";
			break;
		case "I01":			//I01	ISSUING CARRIER
			formObj.iss_trdp_cd.value="";
			formObj.iss_trdp_nm.value="";
			formObj.iss_trdp_addr.value="";
			break;
		case "T01":		//T01 THIRD PARTY
			formObj.third_trdp_cd.value="";
			formObj.third_trdp_nm.value="";
			formObj.third_trdp_addr.value="";
			break;
		case "B01":		//B01  Billing Carrier
			formObj.carr_trdp_cd.value="";
			formObj.carr_trdp_nm.value="";
			formObj.carr_trdp_addr.value="";
			break;
		case "B02":		//B02  Bill to
			formObj.bill_to_trdp_cd.value="";
			formObj.bill_to_trdp_nm.value="";
			formObj.bill_to_trdp_addr.value="";
			break;			
		case "WH":		//WH #52613
			formObj.wh_trdp_cd.value=""; 
			formObj.wh_trdp_nm.value="";
			formObj.wh_trdp_addr.value="";
			break;
		case "F01":		//F01	Forwarder
			formObj.fwrd_agn_trdp_cd.value="";
			formObj.fwrd_agn_trdp_nm.value="";
			formObj.fwrd_agn_trdp_addr.value="";
			break;
		case "L01":		//L01	Carrier
			formObj.lnr_trdp_cd.value="";
			formObj.lnr_trdp_nm.value="";
			break;
		case "STATE_CD":		//State Of Origin 추가 2016.06 #52978 [ZEN] Country and State of Origin Code & Name
			formObj.state_cd.value="";
			formObj.state_nm.value="";
			try {
			formObj.state_cnt_cd.value="";
			} catch (e){}
			break;
		case "CNT_CD":		//Dest. Country	 추가 2016.06 #52978 [ZEN] Country and State of Origin Code & Name
			formObj.cnt_cd.value="";
			formObj.cnt_nm.value=""; 
			break;
		default :
			$("#"+blTrdpTpCd+"_cd").val("");
			$("#"+blTrdpTpCd+"_nm").val("");
			break;
	}
}
function CUSTBKG_callBackFunc(rtnVal){
	var formObj=document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {    	        
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.cust_doc_seq.value=rtnValAry[0];//cust_doc_seq
		//formObj.cust_doc_tp_cd.value 		= rtnValAry[7];//cust_doc_tp_cd
		formObj.cust_no.value=rtnValAry[1];//cust_no
		formObj.shpr_trdp_addr.value=rtnValAry[3];//shpr_trdp_addr
		formObj.cnee_trdp_addr.value=rtnValAry[4];//cnee_trdp_addr
		formObj.ntfy_trdp_addr.value=rtnValAry[5];//ntfy_trdp_addr
		formObj.pol_nm.value=rtnValAry[6];//pol_nm
		formObj.pod_nm.value=rtnValAry[7];//pod_nm
		formObj.lnr_trdp_nm.value=rtnValAry[8];//crr_nm
		formObj.obrd_dt.value=rtnValAry[9];//obrd_dt
		formObj.mk_txt.value=rtnValAry[10];//mk_txt
		formObj.desc_txt.value=rtnValAry[11];//desc_txt
	}
}
function PACKAGE_POPLIST(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.pck_ut_cd.value=rtnValAry[0];
		formObj.pck_ut_nm.value=rtnValAry[1];
	}
}
function LINER_POPLIST(rtnVal){
	var formObj = document.frm1;
	//#1344 [CLT] v4.4.1 bug - 자동완성 기능 side effect
	if (cur_airSeaTp == "" || cur_airSeaTp == "undefined" || cur_airSeaTp == undefined) {
		getcurType();
	}	
	 if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		 	return;
		}else{
			var rtnValAry=rtnVal.split("|");

			//OFVFOUR-7911 [AIF] MANAGING/ALERT CUSTOMER'S OUTSTANDING (OVERDUE)
			var opt_key_sec = "TP_OVER_AMT_FLG";
	    	ajaxSendPost(setOverAmtCurrFlg, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key_sec, "./GateServlet.gsl");

			if(cur_curObj.id == "shipper"){
				if(rtnValAry[0]==''){
					//formObj.shpr_trdp_cd.focus();
				}else{
				
					if(rtnValAry[13] == 'KO'){
						alert(getLabel('COM_FRT_ALT015'));
						//OFVFOUR-7699: [ANX SHIPPING] Logic of phone number on 'To' field on Shipping Advice
						formObj.shpr_trdp_nm.blur();
						setTimeout(function() {
							formObj.shpr_trdp_cd.value="";//trdp_cd
							formObj.shpr_trdp_nm.value="";//eng_nm
							formObj.shpr_trdp_addr.value="";
							formObj.shpr_trdp_cd.style.color= "#000000";
							formObj.shpr_trdp_nm.style.color= "#000000";
						},100);						
						return;
					
					} else if(rtnValAry[13] == 'CR'){

						//OFVFOUR-7911 [AIF] MANAGING/ALERT CUSTOMER'S OUTSTANDING (OVERDUE)
						if (TP_OVER_AMT_FLG != ""){
							var objArr=new Array();
							var overDueDateAmt = rtnValAry[41]==""?0:eval(rtnValAry[41]);
							if (overDueDateAmt != 0){
								objArr[0]=rtnValAry[2];
								objArr[1]=doMoneyFmt(roundXL(Number(overDueDateAmt),2).toFixed(2));
								if(!confirm(getLabel2('COM_FRT_CFM012', objArr))){
									formObj.shpr_trdp_cd.style.color= "#000000";
									formObj.shpr_trdp_nm.style.color= "#000000";
									return;
								} else {
									formObj.shpr_trdp_cd.style.color= "#ff0000";
									formObj.shpr_trdp_nm.style.color= "#ff0000";
								}
							}
						}

						//[20140317 OJG] 요구사항 #27358 - [BINEX] Trade Partner 중 “Credit Limit”이 초과 되었을 경우의 Alert 내용 변경 필요
						//[20140317 OYH] #27474
						var crdLmtAmt=rtnValAry[14]==""?0:eval(rtnValAry[14]);
						var curLmtAmt=rtnValAry[15]==""?0:eval(rtnValAry[15]);
						var balLmtAmt=crdLmtAmt - curLmtAmt;
						var overDueAmt=rtnValAry[29]==""?0:eval(rtnValAry[29]);
						var grandTotal=rtnValAry[31]==""?0:eval(rtnValAry[31]);
						
						//[20141217 YJW] #46708
						if(crdLmtAmt > 0) {
							if(overDueAmt > 0 && balLmtAmt < 0  ){
								var objArr=new Array();
								//objArr[0]=doMoneyFmt(roundXL(Number(crdLmtAmt),2).toFixed(2)); 
								//objArr[1]=doMoneyFmt(roundXL(Number(grandTotal),2).toFixed(2));
								objArr[0]=doMoneyFmt(roundXL(Number(balLmtAmt*(-1)),2).toFixed(2));
								if(!confirm(getLabel2('COM_FRT_CFM008', objArr))){
									formObj.shpr_trdp_cd.style.color= "#000000";
									formObj.shpr_trdp_nm.style.color= "#000000";
									return;
								} else {
									formObj.shpr_trdp_cd.style.color= "#ff0000";
									formObj.shpr_trdp_nm.style.color= "#ff0000";
								}
							} else if (balLmtAmt < 0  ){
								var objArr=new Array();
								//objArr[0]=doMoneyFmt(roundXL(Number(crdLmtAmt),2).toFixed(2)); 
								//objArr[1]=doMoneyFmt(roundXL(Number(balLmtAmt*(-1)),2).toFixed(2));
								objArr[0]=doMoneyFmt(roundXL(Number(balLmtAmt*(-1)),2).toFixed(2));
								if(!confirm(getLabel2('COM_FRT_CFM006', objArr))){
									formObj.shpr_trdp_cd.style.color= "#000000";
									formObj.shpr_trdp_nm.style.color= "#000000";
									return;
								} else {
									formObj.shpr_trdp_cd.style.color= "#ff0000";
									formObj.shpr_trdp_nm.style.color= "#ff0000";
								}
							} else if (overDueAmt > 0 ) {
								var objArr=new Array();
								objArr[0]=doMoneyFmt(roundXL(Number(grandTotal),2).toFixed(2));     
								if(!confirm(getLabel2('COM_FRT_CFM007', objArr))){
									formObj.shpr_trdp_cd.style.color= "#000000";
									formObj.shpr_trdp_nm.style.color= "#000000";
									return;
								} else {
									formObj.shpr_trdp_cd.style.color= "#ff0000";
									formObj.shpr_trdp_nm.style.color= "#ff0000";
								}
							} else {
								formObj.shpr_trdp_cd.style.color= "#000000";
								formObj.shpr_trdp_nm.style.color= "#000000";
							}
						} else {
							formObj.shpr_trdp_cd.style.color= "#000000";
							formObj.shpr_trdp_nm.style.color= "#000000";
						}
						
					//[20140307 OJG] #26863Credit Hold가 걸려 있는 TP가 SHIPPER, CONSIGNEE, NOTIFY 중 선택이 되면 Alert 추가. - Alert 내용 : “Credit Hold is on this Trade Partner. Do you want to proceed?”
					} else if(rtnValAry[13] == 'CH'){
						if(confirm(getLabel('COM_FRT_CFM005'))){ 
							//formObj.shpr_trdp_nm.className='search_form_alert focusElem';
							//formObj.shpr_trdp_addr.className='search_form_alert';
							formObj.shpr_trdp_cd.style.color= "#ff0000";
							formObj.shpr_trdp_nm.style.color= "#ff0000";
							formObj.shpr_trdp_nm.className='search_form focusElem';
						}else{
							formObj.shpr_trdp_cd.style.color= "#000000";
							formObj.shpr_trdp_nm.style.color= "#000000";
							return;
						}
						
					} else if(rtnValAry[13] == 'CO'){
						if(confirm(getLabel('COM_FRT_ALT001'))){ 
							//formObj.shpr_trdp_nm.className='search_form_alert focusElem';
							//formObj.shpr_trdp_addr.className='search_form_alert';
							formObj.shpr_trdp_cd.style.color= "#ff0000";
							formObj.shpr_trdp_nm.style.color= "#ff0000";
							formObj.shpr_trdp_nm.className='search_form focusElem';
						}else{
							formObj.shpr_trdp_cd.value="";//trdp_cd
							formObj.shpr_trdp_nm.value="";//eng_nm
							formObj.shpr_trdp_addr.value="";
							formObj.shpr_trdp_cd.style.color= "#000000";
							formObj.shpr_trdp_nm.style.color= "#000000";
							return;
						}
						
						/*if(rtnValAry[14] != '' && rtnValAry[15] != '' && rtnValAry[14] < rtnValAry[15]){
							//COD
							alert(getLabel('COM_FRT_ALT001')); 	
							formObj.shpr_trdp_cd.style.color= "#ff0000";
							formObj.shpr_trdp_nm.style.color= "#ff0000";
						} else {
							formObj.shpr_trdp_cd.style.color= "#000000";
							formObj.shpr_trdp_nm.style.color= "#000000";
						}*/
						
					} else {
						formObj.shpr_trdp_cd.style.color= "#000000";
						formObj.shpr_trdp_nm.style.color= "#000000";
					}
					
					formObj.shpr_trdp_cd.value=rtnValAry[0];//trdp_cd
					
					formObj.shpr_trdp_nm.value=rtnValAry[2];//eng_nm
										
					if(cur_airSeaTp=='S' && cur_bndTp=='I' && rtnValAry[7]==""){
						formObj.shpr_trdp_addr.value=rtnValAry[2];
					}else{
						
						formObj.shpr_trdp_addr.value=rtnValAry[7];//eng_addr
						
						if(formObj.shpr_local_addr != null && formObj.shpr_local_addr != "")
							formObj.shpr_local_addr.value=rtnValAry[37];//local address
						
						var nmObj = formObj.shpr_pic_nm;
						var phnObj=	formObj.shpr_pic_phn;
						if(nmObj !=undefined && nmObj != "undefined"){
							formObj.shpr_pic_nm.value=rtnValAry[3];//pic name
						}
						if(phnObj !=undefined && phnObj != "undefined"){
							formObj.shpr_pic_phn.value=rtnValAry[4];//pic address
						}
					}
					
					if(cur_airSeaTp=='S' && cur_bndTp=='O' && cur_bizTp!='M'){
						// Bug #27157 : [BINEX]OEH Shipper 변경 시 Commodity Update
						// 수정내용         : HBL 의 commodity code 와 Name 이 Null 인 경우에만 update 하도록 수정
						if (formObj.rep_cmdt_cd.value == '' && formObj.rep_cmdt_nm.value == '') {
							formObj.rep_cmdt_cd.value=rtnValAry[24];
							formObj.rep_cmdt_nm.value=rtnValAry[25];
						}
					}
					
					// #48819
					if (cur_airSeaTp == "S" && cur_bndTp =="I") {
						if( rtnValAry[34] != undefined && rtnValAry[34] != "undefined" && rtnValAry[34] != ''){ 
							var objArr = new Array();
							objArr[0] = rtnValAry[34]; 
							
							if (rtnValAry[35] != undefined && rtnValAry[35] != "undefined" && rtnValAry[35] !='') {
								objArr[1] = rtnValAry[35];     
							} else {
								objArr[1] = "";     
							}
							alert(getLabel2('COM_FRT_ALT014', objArr));						
						}
					}	
					//Carrier Booking에서 B/L Type을 Direct로 하여 Shipper를 지정하는 경우에는 Shipper를 Customer 항목으로 지정
					if(document.location.href.indexOf("SEE_BMD_0500")!=-1&& (formObj.hbl_tp_cd.value=='DR' || formObj.hbl_tp_cd.value=='DT' || formObj.hbl_tp_cd.value=='FW' ) ){
						formObj.act_shpr_trdp_cd.value = rtnValAry[0];
						formObj.act_shpr_trdp_nm.value=rtnValAry[2];//eng_nm
						
					}
					
					
					//#1948 [C&L, CBM] SALES PIC ASSIGNMENT ON MASTER B/L
					if(cur_bizTp =='M'){
						setSalesManMaster(cur_curObj.id , rtnValAry[0]);
						//OFVFOUR-7976: [MATRIX] ADDING CS PIC ON ALL B/L ENTRY AND TRADE PARTNER ENTRY SCREEN
						setCSManMaster(cur_curObj.id , rtnValAry[0]);
					}
					
				}
				
				if(cur_bndTp=='O' && cur_bizTp!='M'){
					setActShipper();
					if(cur_airSeaTp=='S' ){
						setCargoPuckup();
					}
				}
				
				//formObj.act_shpr_trdp_cd.value = rtnValAry[0];//trdp_cd
				//formObj.act_shpr_trdp_nm.value = rtnValAry[2];//eng_nm
				//rtnValAry[8];==nomi_flg   i_nomi_flg
				//rtnValAry[9];==sls_brnc_cd   i_sls_ofc_cd
				/*
				if(rtnValAry[8] =="Y"){
					formObj.nomi_flg.checked=true;
					formObj.sls_ofc_cd.value=rtnValAry[9];
				}else{
					formObj.nomi_flg.checked=false;
					formObj.sls_ofc_cd.value=formObj.ofc_cd.value;
				}
				*/
			}else if(cur_curObj.id == "consignee"){
				if(rtnValAry[0]==''){
					//formObj.cnee_trdp_cd.focus();
				}else{
					if(rtnValAry[13] == 'KO'){
						alert(getLabel('COM_FRT_ALT015'));
						formObj.cnee_trdp_cd.value="";//trdp_cd
						formObj.cnee_trdp_nm.value="";//eng_nm
						formObj.cnee_trdp_addr.value="";
						formObj.cnee_trdp_nm.style.color= "#000000";
						return;
						
					} else if(rtnValAry[13] == 'CR'){

						//OFVFOUR-7911 [AIF] MANAGING/ALERT CUSTOMER'S OUTSTANDING (OVERDUE)
						if (TP_OVER_AMT_FLG != ""){
							var objArr=new Array();
							var overDueDateAmt = rtnValAry[41]==""?0:eval(rtnValAry[41]);
							if (overDueDateAmt != 0){
								objArr[0]=rtnValAry[2];
								objArr[1]=doMoneyFmt(roundXL(Number(overDueDateAmt),2).toFixed(2));
								if(!confirm(getLabel2('COM_FRT_CFM012', objArr))){
									formObj.cnee_trdp_cd.style.color= "#000000";
									formObj.cnee_trdp_nm.style.color= "#000000";
									return;
								} else {
									formObj.cnee_trdp_cd.style.color= "#ff0000";
									formObj.cnee_trdp_nm.style.color= "#ff0000";
								}
							}
						}

						//[20140317 OJG] 요구사항 #27358 - [BINEX] Trade Partner 중 “Credit Limit”이 초과 되었을 경우의 Alert 내용 변경 필요
						//[20140317 OYH] #27474
						var crdLmtAmt=rtnValAry[14]==""?0:eval(rtnValAry[14]);
						var curLmtAmt=rtnValAry[15]==""?0:eval(rtnValAry[15]);
						var balLmtAmt=crdLmtAmt - curLmtAmt;
						var overDueAmt=rtnValAry[29]==""?0:eval(rtnValAry[29]);
						var grandTotal=rtnValAry[31]==""?0:eval(rtnValAry[31]);
						
						//[20141217 YJW] #46708
						if(crdLmtAmt > 0) {
							if(overDueAmt > 0 && balLmtAmt < 0  ){
								var objArr=new Array();
								//objArr[0]=doMoneyFmt(roundXL(Number(crdLmtAmt),2).toFixed(2)); 
								//objArr[1]=doMoneyFmt(roundXL(Number(grandTotal),2).toFixed(2));
								objArr[0]=doMoneyFmt(roundXL(Number(balLmtAmt*(-1)),2).toFixed(2));
								if(!confirm(getLabel2('COM_FRT_CFM008', objArr))){
									formObj.cnee_trdp_nm.style.color= "#000000";
									return;
								} else {
									formObj.cnee_trdp_nm.style.color= "#ff0000";
								}
							} else if (balLmtAmt < 0  ){
								var objArr=new Array();
								//objArr[0]=doMoneyFmt(roundXL(Number(crdLmtAmt),2).toFixed(2)); 
								//objArr[1]=doMoneyFmt(roundXL(Number(balLmtAmt*(-1)),2).toFixed(2));
								objArr[0]=doMoneyFmt(roundXL(Number(balLmtAmt*(-1)),2).toFixed(2));
								if(!confirm(getLabel2('COM_FRT_CFM006', objArr))){
									formObj.cnee_trdp_nm.style.color= "#000000";
									return;
								} else {
									formObj.cnee_trdp_nm.style.color= "#ff0000";
								}
							} else if (overDueAmt > 0 ) {
								var objArr=new Array();
								objArr[0]=doMoneyFmt(roundXL(Number(grandTotal),2).toFixed(2));     
								if(!confirm(getLabel2('COM_FRT_CFM007', objArr))){
									formObj.cnee_trdp_nm.style.color= "#000000";
									return;
								} else {
									formObj.cnee_trdp_nm.style.color= "#ff0000";
								}
							} else {
								formObj.cnee_trdp_nm.style.color= "#000000";
							}
						} else {
							formObj.cnee_trdp_nm.style.color= "#000000";
						}
						
					//[20140307 OJG] #26863Credit Hold가 걸려 있는 TP가 SHIPPER, CONSIGNEE, NOTIFY 중 선택이 되면 Alert 추가. - Alert 내용 : “Credit Hold is on this Trade Partner. Do you want to proceed?”	
					} else if(rtnValAry[13] == 'CH'){
						if(confirm(getLabel('COM_FRT_CFM005'))){ 
							//formObj.cnee_trdp_nm.className='search_form_alert focusElem';
							//formObj.cnee_trdp_addr.className='search_form_alert';
							formObj.cnee_trdp_nm.style.color= "#ff0000";
							formObj.cnee_trdp_nm.className='search_form focusElem';
						}else{
							formObj.cnee_trdp_nm.style.color= "#000000";
							return;
						}
						
					} else if(rtnValAry[13] == 'CO'){
						if(confirm(getLabel('COM_FRT_ALT001'))){ 
							//formObj.cnee_trdp_nm.className='search_form_alert focusElem';
							//formObj.cnee_trdp_addr.className='search_form_alert';
							formObj.cnee_trdp_nm.style.color= "#ff0000";
							formObj.cnee_trdp_nm.className='search_form focusElem';
						}else{
							formObj.cnee_trdp_cd.value="";//trdp_cd
							formObj.cnee_trdp_nm.value="";//eng_nm
							formObj.cnee_trdp_addr.value="";
							formObj.cnee_trdp_nm.style.color= "#000000";
							return;
						}
						
						/*if(rtnValAry[14]!='' && rtnValAry[15]!='' && rtnValAry[14]<rtnValAry[15]){
							//COD
							alert(getLabel('COM_FRT_ALT001'));	
							formObj.cnee_trdp_nm.style.color= "#ff0000";
						} else {
							formObj.cnee_trdp_nm.style.color= "#000000";
						}*/
						
					} else {
						formObj.cnee_trdp_nm.style.color= "#000000";
					}
					
					formObj.cnee_trdp_cd.value=rtnValAry[0];//trdp_cd
					formObj.cnee_trdp_nm.value=rtnValAry[2];//eng_nm
					
					if(cur_airSeaTp=='S' && cur_bndTp=='I' && rtnValAry[7]==""){
						formObj.cnee_trdp_addr.value=rtnValAry[2];
					}else{
						formObj.cnee_trdp_addr.value=rtnValAry[7];//eng_addr 
						
						var nmObj = formObj.cnee_pic_nm;
						var phnObj=	formObj.cnee_pic_phn;
						if(nmObj !=undefined && nmObj != "undefined"){
							formObj.cnee_pic_nm.value=rtnValAry[3];//pic name
						}
						if(phnObj !=undefined && phnObj != "undefined"){
							formObj.cnee_pic_phn.value=rtnValAry[4];//pic address
						}
					}
					
					/*20151118 #50463 BNX는 #20426 내용 예외이다. 그래서 옵션처리*/
					if(blSameAsCneeYn == 'Y'){ //BNX 가 아닐 경우만 해당
						/* oyh 2013.09.05 #20426 : [BINEX] Default로 CNEE 입력시 같은 회사가 NTFY에 입력*/
						if(typeof(formObj.ntfy_trdp_cd) != "undefined"){
							formObj.ntfy_trdp_cd.value=rtnValAry[0];//trdp_cd
							formObj.ntfy_trdp_nm.value=rtnValAry[2];//eng_nm
							formObj.ntfy_trdp_addr.value=rtnValAry[7];//eng_addr 
							
							var nmObj = formObj.ntfy_pic_nm;
							var phnObj=	formObj.ntfy_pic_phn;
							if(nmObj !=undefined && nmObj != "undefined"){
								formObj.ntfy_pic_nm.value=rtnValAry[3];//pic name
							}
							if(phnObj !=undefined && phnObj != "undefined"){
								formObj.ntfy_pic_phn.value=rtnValAry[4];//pic address
							}
							
							// Air Export인 경우 	Cnee 변경시 Ntfy도 같이 수정되고,  Desc Tab의 Account Info. 도 변경됨
							if (cur_airSeaTp =='A' && cur_bndTp == 'O') {
								notifyKeyIn();
							}
							
							//[20140307 OJG] #26863Credit Hold가 걸려 있는 TP가 SHIPPER, CONSIGNEE, NOTIFY 중 선택이 되면 Alert 추가. - Alert 내용 : “Credit Hold is on this Trade Partner. Do you want to proceed?”
							if(rtnValAry[13] == 'CH'){
								//formObj.ntfy_trdp_nm.className='search_form_alert';
								//formObj.ntfy_trdp_addr.className='search_form_alert';
								formObj.ntfy_trdp_nm.style.color= "#ff0000";
							}else{
								//formObj.ntfy_trdp_nm.className='search_form';
								//formObj.ntfy_trdp_addr.className='search_form';
								formObj.ntfy_trdp_nm.style.color= "#000000";
							}
						}
					}
					
					// #48819
					if (cur_airSeaTp == "S" && cur_bndTp =="I") {
						if( rtnValAry[34] != undefined && rtnValAry[34] != "undefined" && rtnValAry[34] != ''){ 	
							var objArr = new Array();
							objArr[0] = rtnValAry[34]; 
							
							if (rtnValAry[35] != undefined && rtnValAry[35] != "undefined" && rtnValAry[35] !='') {
								objArr[1] = rtnValAry[35];     
							} else {
								objArr[1] = "";     
							}
							alert(getLabel2('COM_FRT_ALT014', objArr));						
						}
					}
					
					
					//#1948 [C&L, CBM] SALES PIC ASSIGNMENT ON MASTER B/L
					if(cur_bizTp =='M'){
						setSalesManMaster(cur_curObj.id , rtnValAry[0]);
						//OFVFOUR-7976: [MATRIX] ADDING CS PIC ON ALL B/L ENTRY AND TRADE PARTNER ENTRY SCREEN
						setCSManMaster(cur_curObj.id , rtnValAry[0]);
					}
				}

				/*
				if(formObj.order_chk.checked == true){
					formObj.cnee_trdp_addr.value=formObj.cnee_trdp_nm.value;
				}
				*/
				//formObj.ntfy_trdp_cd.value = rtnValAry[0];//trdp_cd
				//formObj.ntfy_trdp_nm.value = rtnValAry[2];//eng_nm
				//formObj.ntfy_trdp_addr.value = rtnValAry[7];//eng_addr 
			}else if(cur_curObj.id == "notify"){
				if(rtnValAry[13] == 'KO'){
					alert(getLabel('COM_FRT_ALT015'));
					formObj.ntfy_trdp_cd.value="";//trdp_cd
					formObj.ntfy_trdp_nm.value="";//full_nm
					formObj.ntfy_trdp_addr.value="";
					formObj.ntfy_trdp_nm.style.color= "#000000";
					if (chkValidEvent(formObj.ntfy_trdp_addr.onblur)) {
						formObj.ntfy_trdp_addr.onblur();
					}
					return;
					
				} else if(rtnValAry[13] == 'CR'){

					//OFVFOUR-7911 [AIF] MANAGING/ALERT CUSTOMER'S OUTSTANDING (OVERDUE)
					if (TP_OVER_AMT_FLG != ""){
						var objArr=new Array();
						var overDueDateAmt = rtnValAry[41]==""?0:eval(rtnValAry[41]);
						if (overDueDateAmt != 0){
							objArr[0]=rtnValAry[2];
							objArr[1]=doMoneyFmt(roundXL(Number(overDueDateAmt),2).toFixed(2));
							if(!confirm(getLabel2('COM_FRT_CFM012', objArr))){
								formObj.ntfy_trdp_cd.style.color= "#000000";
								formObj.ntfy_trdp_nm.style.color= "#000000";
								return;
							} else {
								formObj.ntfy_trdp_cd.style.color= "#ff0000";
								formObj.ntfy_trdp_nm.style.color= "#ff0000";
							}
						}
					}

					//[20140317 OJG] 요구사항 #27358 - [BINEX] Trade Partner 중 “Credit Limit”이 초과 되었을 경우의 Alert 내용 변경 필요
					//[20140317 OYH] #27474
					var crdLmtAmt=rtnValAry[14]==""?0:eval(rtnValAry[14]);
					var curLmtAmt=rtnValAry[15]==""?0:eval(rtnValAry[15]);
					var balLmtAmt=crdLmtAmt - curLmtAmt;
					var overDueAmt=rtnValAry[29]==""?0:eval(rtnValAry[29]);
					var grandTotal=rtnValAry[31]==""?0:eval(rtnValAry[31]);
					
					//[20141217 YJW] #46708
					if(crdLmtAmt > 0) {
						if(overDueAmt > 0 && balLmtAmt < 0  ){
							var objArr=new Array();
							//objArr[0]=doMoneyFmt(roundXL(Number(crdLmtAmt),2).toFixed(2)); 
							//objArr[1]=doMoneyFmt(roundXL(Number(grandTotal),2).toFixed(2));
							objArr[0]=doMoneyFmt(roundXL(Number(balLmtAmt*(-1)),2).toFixed(2));
							if(!confirm(getLabel2('COM_FRT_CFM008', objArr))){
								formObj.ntfy_trdp_nm.style.color= "#000000";
								return;
							} else {
								formObj.ntfy_trdp_nm.style.color= "#ff0000";
							}
						} else if (balLmtAmt < 0  ){
							var objArr=new Array();
							//objArr[0]=doMoneyFmt(roundXL(Number(crdLmtAmt),2).toFixed(2)); 
							//objArr[1]=doMoneyFmt(roundXL(Number(balLmtAmt*(-1)),2).toFixed(2));
							objArr[0]=doMoneyFmt(roundXL(Number(balLmtAmt*(-1)),2).toFixed(2));
							if(!confirm(getLabel2('COM_FRT_CFM006', objArr))){
								formObj.ntfy_trdp_nm.style.color= "#000000";
								return;
							} else {
								formObj.ntfy_trdp_nm.style.color= "#ff0000";
							}
						} else if (overDueAmt > 0 ) {
							var objArr=new Array();
							objArr[0]=doMoneyFmt(roundXL(Number(grandTotal),2).toFixed(2));     
							if(!confirm(getLabel2('COM_FRT_CFM007', objArr))){
								formObj.ntfy_trdp_nm.style.color= "#000000";
								return;
							} else {
								formObj.ntfy_trdp_nm.style.color= "#ff0000";
							}
						} else {
							formObj.ntfy_trdp_nm.style.color= "#000000";
						}
					} else {
						formObj.ntfy_trdp_nm.style.color= "#000000";
					}
				
				//[20140307 OJG] #26863Credit Hold가 걸려 있는 TP가 SHIPPER, CONSIGNEE, NOTIFY 중 선택이 되면 Alert 추가. - Alert 내용 : “Credit Hold is on this Trade Partner. Do you want to proceed?”
				} else if(rtnValAry[13] == 'CH'){
					if(confirm(getLabel('COM_FRT_CFM005'))){ 
						//formObj.ntfy_trdp_nm.className='search_form_alert focusElem';
						//formObj.ntfy_trdp_addr.className='search_form_alert';
						formObj.ntfy_trdp_nm.style.color= "#ff0000";
						formObj.ntfy_trdp_nm.className='search_form focusElem';
					}else{
						formObj.ntfy_trdp_nm.style.color= "#000000";
						return;
					}
					
				} else if(rtnValAry[13] == 'CO'){
					if(confirm(getLabel('COM_FRT_ALT001'))){ 
						//formObj.ntfy_trdp_nm.className='search_form_alert focusElem';
						//formObj.ntfy_trdp_addr.className='search_form_alert';
						formObj.ntfy_trdp_nm.style.color= "#ff0000";
						formObj.ntfy_trdp_nm.className='search_form focusElem';
					}else{
						formObj.ntfy_trdp_cd.value="";//trdp_cd
						formObj.ntfy_trdp_nm.value="";//full_nm
						formObj.ntfy_trdp_addr.value="";
						formObj.ntfy_trdp_nm.style.color= "#000000";
						return;
					}
					
					/*if(rtnValAry[14]!='' && rtnValAry[15]!='' && rtnValAry[14]<rtnValAry[15]){
						//COD
						alert(getLabel('COM_FRT_ALT001'));
						formObj.ntfy_trdp_nm.style.color= "#ff0000";
					} else {
						formObj.ntfy_trdp_nm.style.color= "#000000";
					}*/
					
				} else {
					formObj.ntfy_trdp_nm.style.color= "#000000";
				}
				
				formObj.ntfy_trdp_cd.value=rtnValAry[0];//trdp_cd
				formObj.ntfy_trdp_nm.value=rtnValAry[2];//full_nm
				
				if(cur_airSeaTp=='S' && cur_bndTp=='I' && rtnValAry[7]==""){
					formObj.ntfy_trdp_addr.value=rtnValAry[2];
				}else{
					formObj.ntfy_trdp_addr.value=rtnValAry[7];//eng_addr 
					
					var nmObj = formObj.ntfy_pic_nm;
					var phnObj=	formObj.ntfy_pic_phn;
					if(nmObj !=undefined && nmObj != "undefined"){
						formObj.ntfy_pic_nm.value=rtnValAry[3];//pic name
					}
					if(phnObj !=undefined && phnObj != "undefined"){
						formObj.ntfy_pic_phn.value=rtnValAry[4];//pic address
					}
				}
				
				//AEM Notify 선택하면 Acct_info에 찍어주도록 설정함.
				if(cur_airSeaTp=='A' && cur_bndTp=='O' && cur_bizTp=='M'){
					if(document.getElementsByName("disp_ntfy_flg")[0].value == "Y"){
						//OFVFOUR-6222 [BEST OCEAN] AWB 관련 [NOTIFY] option 관련 (Zen#1911)
						//formObj.mk_txt.value='[NOTIFY]' + '\r\n' + rtnValAry[7] + '\r\n';
						formObj.mk_txt.value= rtnValAry[7] + '\r\n';
					}else{
						// formObj.mk_txt.value = rtnValAry[7];
					}
				}else if(cur_airSeaTp=='A' && cur_bndTp=='O' && typeof(cur_bizTp)=="undefined"){
					if(typeof(document.getElementsByName("disp_ntfy_flg")[0])=="undefined"){
						formObj.acctg_info_txt.value=rtnValAry[7];
					}else{
						if(document.getElementsByName("disp_ntfy_flg")[0].value == "Y"){
							formObj.acctg_info_txt.value='[NOTIFY]' + '\r\n' + rtnValAry[7];
						}else{
							formObj.acctg_info_txt.value=rtnValAry[7];
						}
					}
				}
                if (chkValidEvent(formObj.ntfy_trdp_addr.onblur)) {
                    formObj.ntfy_trdp_addr.onblur();
                }       
			}else if(cur_curObj.id == "ashipper"){
				if(rtnValAry[13] == 'KO'){
					alert(getLabel('COM_FRT_ALT015'));
					formObj.act_shpr_trdp_cd.value="";//trdp_cd
					formObj.act_shpr_trdp_nm.value="";//full_nm
					formObj.act_shp_info.value="";//Remark
					return;
					
				//#2737 [BNX] C/BROKER TO CHECK PAYMENT STATUS
				} else if(rtnValAry[13] == 'CH'){
					if(confirm(getLabel('COM_FRT_CFM005'))){ 
						//formObj.ntfy_trdp_nm.className='search_form_alert focusElem';
						//formObj.ntfy_trdp_addr.className='search_form_alert';
						try {creditOver=true;}catch(e){};
						formObj.act_shpr_trdp_cd.style.color= "#ff0000";
						formObj.act_shpr_trdp_nm.style.color= "#ff0000";
					}else{
						formObj.act_shpr_trdp_cd.style.color= "#000000";
						formObj.act_shpr_trdp_nm.style.color= "#000000";
						return;
					}
				} else if(rtnValAry[13] == 'CR'){

					//OFVFOUR-7911 [AIF] MANAGING/ALERT CUSTOMER'S OUTSTANDING (OVERDUE)
					if (TP_OVER_AMT_FLG != ""){
						var objArr=new Array();
						var overDueDateAmt = rtnValAry[41]==""?0:eval(rtnValAry[41]);
						if ( overDueDateAmt != 0 ){
							objArr[0]=rtnValAry[2];
							objArr[1]=doMoneyFmt(roundXL(Number(overDueDateAmt),2).toFixed(2));
							if(!confirm(getLabel2('COM_FRT_CFM012', objArr))){
								formObj.act_shpr_trdp_cd.style.color= "#000000";
								formObj.act_shpr_trdp_nm.style.color= "#000000";
								return;
							} else {
								formObj.act_shpr_trdp_cd.style.color= "#ff0000";
								formObj.act_shpr_trdp_nm.style.color= "#ff0000";
							}
						}
					}
					//[20140317 OJG] 요구사항 #27358 - [BINEX] Trade Partner 중 “Credit Limit”이 초과 되었을 경우의 Alert 내용 변경 필요
					//[20140317 OYH] #27474
					var crdLmtAmt=rtnValAry[14]==""?0:eval(rtnValAry[14]);
					var curLmtAmt=rtnValAry[15]==""?0:eval(rtnValAry[15]);
					var balLmtAmt=crdLmtAmt - curLmtAmt;
					var overDueAmt=rtnValAry[29]==""?0:eval(rtnValAry[29]);
					var grandTotal=rtnValAry[31]==""?0:eval(rtnValAry[31]);
					
					//[20141217 YJW] #46708
					if(crdLmtAmt > 0) {
						if(overDueAmt > 0 && balLmtAmt < 0  ){
							var objArr=new Array();
							//objArr[0]=doMoneyFmt(roundXL(Number(crdLmtAmt),2).toFixed(2)); 
							//objArr[1]=doMoneyFmt(roundXL(Number(grandTotal),2).toFixed(2));
							objArr[0]=doMoneyFmt(roundXL(Number(balLmtAmt*(-1)),2).toFixed(2));
							if(!confirm(getLabel2('COM_FRT_CFM008', objArr))){
								try {creditOver=false;}catch(e){};
								formObj.act_shpr_trdp_cd.style.color= "#000000";
								formObj.act_shpr_trdp_nm.style.color= "#000000";
								return;
							} else {
								try {creditOver=true;}catch(e){};
								formObj.act_shpr_trdp_cd.style.color= "#ff0000";
								formObj.act_shpr_trdp_nm.style.color= "#ff0000";
							}
						} else if (balLmtAmt < 0  ){
							var objArr=new Array();
							//objArr[0]=doMoneyFmt(roundXL(Number(crdLmtAmt),2).toFixed(2)); 
							//objArr[1]=doMoneyFmt(roundXL(Number(balLmtAmt*(-1)),2).toFixed(2));
							objArr[0]=doMoneyFmt(roundXL(Number(balLmtAmt*(-1)),2).toFixed(2));
							if(!confirm(getLabel2('COM_FRT_CFM006', objArr))){
								try {creditOver=false;}catch(e){};
								formObj.act_shpr_trdp_cd.style.color= "#000000";
								formObj.act_shpr_trdp_nm.style.color= "#000000";
								return;
							} else {
								try {creditOver=true;}catch(e){};
								formObj.act_shpr_trdp_cd.style.color= "#ff0000";
								formObj.act_shpr_trdp_nm.style.color= "#ff0000";
							}
						} else if (overDueAmt > 0 ) {
							try {creditOver=false;}catch(e){};
							var objArr=new Array();
							objArr[0]=doMoneyFmt(roundXL(Number(grandTotal),2).toFixed(2));     
							if(!confirm(getLabel2('COM_FRT_CFM007', objArr))){
								formObj.act_shpr_trdp_cd.style.color= "#000000";
								formObj.act_shpr_trdp_nm.style.color= "#000000";
								return;
							} else {
								formObj.act_shpr_trdp_cd.style.color= "#ff0000";
								formObj.act_shpr_trdp_nm.style.color= "#ff0000";
							}
						} else {
							try {creditOver=false;}catch(e){};
							formObj.act_shpr_trdp_cd.style.color= "#000000";
							formObj.act_shpr_trdp_nm.style.color= "#000000";
						}
					} else {
						try {creditOver=false;}catch(e){};
						formObj.act_shpr_trdp_cd.style.color= "#000000";
						formObj.act_shpr_trdp_nm.style.color= "#000000";
					}
				}  else if(rtnValAry[13] == 'CO'){
					try {creditOver=false;}catch(e){};
					if(confirm(getLabel('COM_FRT_ALT001'))){
						formObj.act_shpr_trdp_cd.style.color= "#ff0000";
						formObj.act_shpr_trdp_nm.style.color= "#ff0000";
					} else {
						formObj.act_shpr_trdp_cd.value="";//trdp_cd
						formObj.act_shpr_trdp_nm.value="";//full_nm
						formObj.act_shp_info.value="";//Remark
						formObj.act_shpr_trdp_cd.style.color= "#000000";
						formObj.act_shpr_trdp_nm.style.color= "#000000";
						return;
					}
				
				} /*else {
					try {creditOver=false;}catch(e){};
					if(rtnValAry[14]!='' && rtnValAry[15]!='' && rtnValAry[14]<rtnValAry[15]){
						//COD
						alert(getLabel('COM_FRT_ALT001'));
						//try {creditOver=true;}catch(e){};
						formObj.act_shpr_trdp_cd.style.color= "#ff0000";
						formObj.act_shpr_trdp_nm.style.color= "#ff0000";
					} else {
						//try {creditOver=false;}catch(e){};
						formObj.act_shpr_trdp_cd.style.color= "#000000";
						formObj.act_shpr_trdp_nm.style.color= "#000000";
					}
				}*/
				formObj.act_shpr_trdp_cd.value=rtnValAry[0];//trdp_cd
				if(formObj.act_shpr_trdp_nm.getAttribute("dataformat") == "multiLanguage"){
					formObj.act_shpr_trdp_nm.value=rtnValAry[10];//full_nm
					formObj.act_shp_info.value=rtnValAry[26];//Remark	
				}else{
					formObj.act_shpr_trdp_nm.value=rtnValAry[2];//full_nm
					formObj.act_shp_info.value=rtnValAry[7];//Remark	
				}
								
				//#25711 [SUNWAY]Sales Man 자동 설정 
				if (typeof(formObj.sls_usrid.value)!='undefined'
					&& typeof(formObj.sls_usr_nm.value)!='undefined'
						&& typeof(formObj.sls_ofc_cd.value)!='undefined'
							&& typeof(formObj.sls_dept_cd.value)!='undefined')
				{
					setSalesMan(rtnValAry[0]);
				}

				//OFVFOUR-7976: [MATRIX] ADDING CS PIC ON ALL B/L ENTRY AND TRADE PARTNER ENTRY SCREEN
				if (formObj.cs_usrid && typeof(formObj.cs_usrid.value)!='undefined' && formObj.cs_usr_nm && typeof(formObj.cs_usr_nm.value)!='undefined') {
					setCSMan(rtnValAry[0]);
				}
				
				// Contribution Margin 조회
				setCtrbMgn(rtnValAry[0]);
				
				if(cur_airSeaTp == "A" && cur_bndTp =="O" &  frm1.hbl_tp_cd.value =='TP'){
					syncCustomerToCarrier();
				}
				
				//#2775 [BNX] DISABLED CUSTOMS BROKER STILL SHOWING (RELATED PARTNER)
				if (cur_bndTp =="I") {
					setTimeout("cbCheck()",500);
				}
				//
				if(cur_bizTp!='M' && typeof setShipper === "function"){
					setShipper(rtnValAry[2],rtnValAry[7]);
				}
			}else if(cur_curObj.id == "anotify"){
				/*
				formObj.ANotify_co_in.value=rtnValAry[0];//trdp_cd
				formObj.ANotify_sn_in.value=rtnValAry[1];//cnt_cd
				formObj.ANotify_na_in.value=rtnValAry[2];//trdp_tp_cd
				formObj.AN_pic_in.value=rtnValAry[2];//eng_nm
				formObj.AN_tel_in.value=rtnValAry[4];//locl_nm
				formObj.AN_fax_in.value=rtnValAry[5];//edi_cd
				//trdp_seq
				formObj.AN_addr_in.value=rtnValAry[7];//eng_addr 
				*/
			}else if(cur_curObj.id == "liner"){
				if(rtnValAry[13] == 'KO'){
					alert(getLabel('COM_FRT_ALT015'));
					formObj.lnr_trdp_cd.value="";//trdp_cd
					formObj.lnr_trdp_nm.value="";//full_nm
					return;
				}
				
				if(rtnValAry[13] == 'CO'){
					if(confirm(getLabel('COM_FRT_ALT001'))){
						formObj.lnr_trdp_cd.style.color= "#ff0000";
						formObj.lnr_trdp_nm.style.color= "#ff0000";
					}else{
						formObj.lnr_trdp_cd.value="";//trdp_cd
						formObj.lnr_trdp_nm.value="";//full_nm
						formObj.lnr_trdp_cd.style.color= "#000000";
						formObj.lnr_trdp_nm.style.color= "#000000";
						return;
					}
					
				} else {
					formObj.lnr_trdp_cd.style.color= "#000000";
					formObj.lnr_trdp_nm.style.color= "#000000";
				}
				
				formObj.lnr_trdp_cd.value=rtnValAry[0];//trdp_cd
				formObj.lnr_trdp_nm.value=rtnValAry[2];//full_nm
				
				try{setLiner2()
					}catch(e){}//full_nm #52613
				if(formObj.lnr_ctrt_no != undefined){formObj.lnr_ctrt_no.value=rtnValAry[34];}
				/*if(rtnValAry[14]!='' && rtnValAry[15]!='' && rtnValAry[14]<rtnValAry[15]){
					//COD
					alert(getLabel('COM_FRT_ALT001'));
					formObj.lnr_trdp_cd.style.color= "#ff0000";
					formObj.lnr_trdp_nm.style.color= "#ff0000";
				} else {
					formObj.lnr_trdp_cd.style.color= "#000000";
					formObj.lnr_trdp_nm.style.color= "#000000";
				}*/
			}else if(cur_curObj.id == "console"){
				if(rtnValAry[13] == 'KO'){
					alert(getLabel('COM_FRT_ALT015'));
					formObj.agt_trdp_cd.value="";//trdp_cd
					formObj.agt_trdp_nm.value="";//eng_nm
					return;
				}
				
				if(rtnValAry[13] == 'CO'){
					if(confirm(getLabel('COM_FRT_ALT001'))){
						formObj.agt_trdp_cd.style.color= "#ff0000";
						formObj.agt_trdp_nm.style.color= "#ff0000";
					}else{
						formObj.agt_trdp_cd.value="";//trdp_cd
						formObj.agt_trdp_nm.value="";//eng_nm
						formObj.agt_trdp_cd.style.color= "#000000";
						formObj.agt_trdp_nm.style.color= "#000000";
						return;
					}
					
				} else {
					formObj.agt_trdp_cd.style.color= "#000000";
					formObj.agt_trdp_nm.style.color= "#000000";
				}
				
				formObj.agt_trdp_cd.value=rtnValAry[0];//trdp_cd
				formObj.agt_trdp_nm.value=rtnValAry[2];//eng_nm
				/*if(rtnValAry[14]!='' && rtnValAry[15]!='' && rtnValAry[14]<rtnValAry[15]){
					//COD
					alert(getLabel('COM_FRT_ALT001'));
					formObj.agt_trdp_cd.style.color= "#ff0000";
					formObj.agt_trdp_nm.style.color= "#ff0000";
				} else {
					formObj.agt_trdp_cd.style.color= "#000000";
					formObj.agt_trdp_nm.style.color= "#000000";
				}*/
			}else if(cur_curObj.id == "partner"){

				//OFVFOUR-7911 [AIF] MANAGING/ALERT CUSTOMER'S OUTSTANDING (OVERDUE)
				if (TP_OVER_AMT_FLG != "" && rtnValAry[13] == 'CR'){
					var objArr=new Array();
					var overDueDateAmt = rtnValAry[41]==""?0:eval(rtnValAry[41]);
					if ( overDueDateAmt != 0 ){
						objArr[0]=rtnValAry[2];
						objArr[1]=doMoneyFmt(roundXL(Number(overDueDateAmt),2).toFixed(2));
						if(!confirm(getLabel2('COM_FRT_CFM012', objArr))){
							formObj.prnr_trdp_cd.style.color= "#000000";
							formObj.prnr_trdp_nm.style.color= "#000000";
							return;
						} else {
							formObj.prnr_trdp_cd.style.color= "#ff0000";
							formObj.prnr_trdp_nm.style.color= "#ff0000";
						}
					}
				}
				
				formObj.prnr_trdp_cd.style.color= "#000000";
				formObj.prnr_trdp_nm.style.color= "#000000";
				
				//[20140317 OJG] 요구사항 #27358 - [BINEX] Trade Partner 중 “Credit Limit”이 초과 되었을 경우의 Alert 내용 변경 필요
				//[20140330 OYH]  #27474  
				var crdLmtAmt=rtnValAry[14]==""?0:eval(rtnValAry[14]);
				var curLmtAmt=rtnValAry[15]==""?0:eval(rtnValAry[15]);
				var balLmtAmt=crdLmtAmt - curLmtAmt;
				var overDueAmt=rtnValAry[29]==""?0:eval(rtnValAry[29]);
				var grandTotal=rtnValAry[31]==""?0:eval(rtnValAry[31]);
				
				//[20141217 YJW] #46708
				if(crdLmtAmt > 0) {
					if(overDueAmt > 0 && rtnValAry[13] == 'CR' && crdLmtAmt - curLmtAmt < 0  ){
						var objArr=new Array();
						//objArr[0]=doMoneyFmt(roundXL(Number(crdLmtAmt),2).toFixed(2)); 
						//objArr[1]=doMoneyFmt(roundXL(Number(grandTotal),2).toFixed(2));
						objArr[0]=doMoneyFmt(roundXL(Number(balLmtAmt*(-1)),2).toFixed(2));
						if(!confirm(getLabel2('COM_FRT_CFM008', objArr))){
							formObj.prnr_trdp_cd.style.color= "#000000";
							formObj.prnr_trdp_nm.style.color= "#000000";
							return;
						} else {
							formObj.prnr_trdp_cd.style.color= "#ff0000";
							formObj.prnr_trdp_nm.style.color= "#ff0000";
						}
					} else if (rtnValAry[13] == 'CR' && crdLmtAmt - curLmtAmt < 0  ){
						var objArr=new Array();
						//objArr[0]=doMoneyFmt(roundXL(Number(crdLmtAmt),2).toFixed(2)); 
						//objArr[1]=doMoneyFmt(roundXL(Number(balLmtAmt*(-1)),2).toFixed(2));
						objArr[0]=doMoneyFmt(roundXL(Number(balLmtAmt*(-1)),2).toFixed(2));
						if(!confirm(getLabel2('COM_FRT_CFM006', objArr))){
							formObj.prnr_trdp_cd.style.color= "#000000";
							formObj.prnr_trdp_nm.style.color= "#000000";
							return;
						} else {
							formObj.prnr_trdp_cd.style.color= "#ff0000";
							formObj.prnr_trdp_nm.style.color= "#ff0000";
						}
					} else if (rtnValAry[13] == 'CR' && overDueAmt > 0 ) {
						var objArr=new Array();
						objArr[0]=doMoneyFmt(roundXL(Number(grandTotal),2).toFixed(2));
						//#518 [Binex] T/P could not be selected when T/P searched
						if(!confirm(getLabel2('COM_FRT_CFM007', objArr))){
//							if (document.getElementById('prnr_trdp_nm')) {
//								formObj.prnr_trdp_nm.style.color= "#000000";
//							}else{
								formObj.prnr_trdp_cd.style.color= "#000000";
								formObj.prnr_trdp_nm.style.color= "#000000";
//							}
							return;
						} else {
//							if (document.getElementById('prnr_trdp_nm')) {
//								formObj.prnr_trdp_nm.style.color= "#ff0000";
//							}else{
								formObj.prnr_trdp_cd.style.color= "#ff0000";
								formObj.prnr_trdp_nm.style.color= "#ff0000";
//							}
						}
					}
				}
				
				formObj.prnr_trdp_cd.value=rtnValAry[0];//trdp_cd  AS param1
				if(formObj.prnr_trdp_nm.getAttribute("dataformat") == "multiLanguage"){
					formObj.prnr_trdp_nm.value=rtnValAry[10];	// v4.5.0 릴리스 테스트 수행 결과 #2
					formObj.prnr_trdp_addr.value=rtnValAry[26];	//loc_addr					
				}else{
					formObj.prnr_trdp_nm.value=rtnValAry[2];	//eng_nm
					formObj.prnr_trdp_addr.value=rtnValAry[7];	//eng_addr
				}

				if(formObj.h_profit_share != undefined){	//profit share
					var profit_share = rtnValAry[33];
					
					if(profit_share != "" && profit_share != null){
						formObj.profit_share.value = profit_share;
					} else {
						var org_profit_share = formObj.h_profit_share.value;
						formObj.profit_share.value = org_profit_share;
					}
				}
				
				// #25711 [SUNWAY]Sales Man 자동 설정
				setSalesMan(rtnValAry[0], "Y");
				//OFVFOUR-7976: [MATRIX] ADDING CS PIC ON ALL B/L ENTRY AND TRADE PARTNER ENTRY SCREEN
				setCSMan(rtnValAry[0], "Y");
				
				//#1948 [C&L, CBM] SALES PIC ASSIGNMENT ON MASTER B/L
				if(cur_bizTp =='M'){
					setSalesManMaster(cur_curObj.id , rtnValAry[0]);
					//OFVFOUR-7976: [MATRIX] ADDING CS PIC ON ALL B/L ENTRY AND TRADE PARTNER ENTRY SCREEN
					setCSManMaster(cur_curObj.id , rtnValAry[0]);
				}				
				
				/* #27773 COD 출력 조건이 잘못되어 있음 
				if(rtnValAry[13]=='CR'){
					if(rtnValAry[14]!='' && rtnValAry[15]!='' && rtnValAry[14]<rtnValAry[15]){
						//COD
						alert(getLabel('COM_FRT_ALT001'));
					}
				}else{
					//alert(rtnValAry[13]);
					alert(getLabel('FMS_COM_ALT007') + " - " + rtnValAry[13]);
				}
				*/
			}else if(cur_curObj.id == "agent"){
				if(rtnValAry[13] == 'KO'){
					alert(getLabel('COM_FRT_ALT015'));
					formObj.agent_trdp_cd.value="";//trdp_cd
					formObj.agent_trdp_nm.value="";//eng_nm
					formObj.agent_trdp_addr.value="";//eng_addr
					return;
				}
				
				if(cur_airSeaTp == "S" && cur_bizTp == "M"){
					if(rtnValAry[13] == 'CR'){

						//OFVFOUR-7911 [AIF] MANAGING/ALERT CUSTOMER'S OUTSTANDING (OVERDUE)
						if (TP_OVER_AMT_FLG != ""){
							var objArr=new Array();
							var overDueDateAmt = rtnValAry[41]==""?0:eval(rtnValAry[41]);
							if ( overDueDateAmt != 0 ){
								objArr[0]=rtnValAry[2];
								objArr[1]=doMoneyFmt(roundXL(Number(overDueDateAmt),2).toFixed(2));
								if(!confirm(getLabel2('COM_FRT_CFM012', objArr))){
									formObj.agent_trdp_cd.style.color= "#000000";
									formObj.agent_trdp_nm.style.color= "#000000";
									return;
								} else {
									formObj.agent_trdp_cd.style.color= "#ff0000";
									formObj.agent_trdp_nm.style.color= "#ff0000";
								}
							}
						}

						var crdLmtAmt=rtnValAry[14]==""?0:eval(rtnValAry[14]);
						var curLmtAmt=rtnValAry[15]==""?0:eval(rtnValAry[15]);
						var balLmtAmt=crdLmtAmt - curLmtAmt;
						var overDueAmt=rtnValAry[29]==""?0:eval(rtnValAry[29]);
						var grandTotal=rtnValAry[31]==""?0:eval(rtnValAry[31]);
						
						//[20141217 YJW] #46708
						if(crdLmtAmt > 0) {
							if(overDueAmt > 0 && balLmtAmt < 0  ){
								var objArr=new Array();
								//objArr[0]=doMoneyFmt(roundXL(Number(crdLmtAmt),2).toFixed(2)); 
								//objArr[1]=doMoneyFmt(roundXL(Number(grandTotal),2).toFixed(2));
								objArr[0]=doMoneyFmt(roundXL(Number(balLmtAmt*(-1)),2).toFixed(2));
								if(!confirm(getLabel2('COM_FRT_CFM008', objArr))){
									formObj.agent_trdp_cd.style.color= "#000000";
									formObj.agent_trdp_nm.style.color= "#000000";
									return;
								} else {
									formObj.agent_trdp_cd.style.color= "#ff0000";
									formObj.agent_trdp_nm.style.color= "#ff0000";
								}
							} else if (balLmtAmt < 0  ){
								var objArr=new Array();
								//objArr[0]=doMoneyFmt(roundXL(Number(crdLmtAmt),2).toFixed(2)); 
								//objArr[1]=doMoneyFmt(roundXL(Number(balLmtAmt*(-1)),2).toFixed(2));
								objArr[0]=doMoneyFmt(roundXL(Number(balLmtAmt*(-1)),2).toFixed(2));
								if(!confirm(getLabel2('COM_FRT_CFM006', objArr))){
									formObj.agent_trdp_cd.style.color= "#000000";
									formObj.agent_trdp_nm.style.color= "#000000";
									return;
								} else {
									formObj.agent_trdp_cd.style.color= "#ff0000";
									formObj.agent_trdp_nm.style.color= "#ff0000";
								}
							} else if (overDueAmt > 0 ) {
								var objArr=new Array();
								objArr[0]=doMoneyFmt(roundXL(Number(grandTotal),2).toFixed(2));     
								if(!confirm(getLabel2('COM_FRT_CFM007', objArr))){
									formObj.agent_trdp_cd.style.color= "#000000";
									formObj.agent_trdp_nm.style.color= "#000000";
									return;
								} else {
									formObj.agent_trdp_cd.style.color= "#ff0000";
									formObj.agent_trdp_nm.style.color= "#ff0000";
								}
							} else {
								formObj.agent_trdp_cd.style.color= "#000000";
								formObj.agent_trdp_nm.style.color= "#000000";
							}
						} else {
							formObj.agent_trdp_cd.style.color= "#000000";
							formObj.agent_trdp_nm.style.color= "#000000";
						}
						 
					} else if(rtnValAry[13] == 'CO'){
						if(confirm(getLabel('COM_FRT_ALT001'))){
							formObj.agent_trdp_cd.style.color= "#ff0000";
							formObj.agent_trdp_nm.style.color= "#ff0000";
						} else {
							formObj.agent_trdp_cd.value="";//trdp_cd
							formObj.agent_trdp_nm.value="";//eng_nm
							formObj.agent_trdp_addr.value="";//eng_addr
							formObj.agent_trdp_cd.style.color= "#000000";
							formObj.agent_trdp_nm.style.color= "#000000";
							return;
						}
					} /*else {
						if(rtnValAry[14]!='' && rtnValAry[15]!='' && rtnValAry[14]<rtnValAry[15]){
							//COD
							alert(getLabel('COM_FRT_ALT001'));
							formObj.agent_trdp_cd.style.color= "#ff0000";
							formObj.agent_trdp_nm.style.color= "#ff0000";
						} else {
							formObj.agent_trdp_cd.style.color= "#000000";
							formObj.agent_trdp_nm.style.color= "#000000";
						}
					}*/
					formObj.agent_trdp_cd.value=rtnValAry[0];//trdp_cd
					formObj.agent_trdp_nm.value=rtnValAry[2];//eng_nm
					formObj.agent_trdp_addr.value=rtnValAry[7];//eng_addr
										 
				} else {
					 if(rtnValAry[13] == 'CO'){
						 if(confirm(getLabel('COM_FRT_ALT001'))){
							 formObj.agent_trdp_cd.style.color= "#ff0000";
							 formObj.agent_trdp_nm.style.color= "#ff0000";
						 } else {
							 formObj.agent_trdp_cd.value="";//trdp_cd
							 formObj.agent_trdp_nm.value="";//eng_nm
							 formObj.agent_trdp_addr.value="";//eng_addr
							 formObj.agent_trdp_cd.style.color= "#000000";
							 formObj.agent_trdp_nm.style.color= "#000000";
							 return;
						 }
					 }
					 
					formObj.agent_trdp_cd.value=rtnValAry[0];//trdp_cd
					formObj.agent_trdp_nm.value=rtnValAry[2];//eng_nm
					formObj.agent_trdp_addr.value=rtnValAry[7];//eng_addr
					
					/*if(rtnValAry[14]!='' && rtnValAry[15]!='' && rtnValAry[14]<rtnValAry[15]){
						//COD
						alert(getLabel('COM_FRT_ALT001'));
						formObj.agent_trdp_cd.style.color= "#ff0000";
						formObj.agent_trdp_nm.style.color= "#ff0000";
					} else {
						formObj.agent_trdp_cd.style.color= "#000000";
						formObj.agent_trdp_nm.style.color= "#000000";
					}*/
				}
				
				//#1948 [C&L, CBM] SALES PIC ASSIGNMENT ON MASTER B/L
				if(cur_bizTp =='M'){
					setSalesManMaster(cur_curObj.id , rtnValAry[0]);
					//OFVFOUR-7976: [MATRIX] ADDING CS PIC ON ALL B/L ENTRY AND TRADE PARTNER ENTRY SCREEN
					setCSManMaster(cur_curObj.id , rtnValAry[0]);
				}				
				
			}else if(cur_curObj.id == "third"){
				if(rtnValAry[13] == 'KO'){
					alert(getLabel('COM_FRT_ALT015'));
					formObj.third_trdp_cd.value="";//trdp_cd
					formObj.third_trdp_nm.value="";//eng_nm
					formObj.third_trdp_addr.value="";//eng_addr
					return;
				}
				
				if(rtnValAry[13] == 'CO'){
					if(confirm(getLabel('COM_FRT_ALT001'))){
						formObj.third_trdp_cd.style.color= "#ff0000";
						formObj.third_trdp_nm.style.color= "#ff0000";
					}else{
						formObj.third_trdp_cd.value="";//trdp_cd
						formObj.third_trdp_nm.value="";//eng_nm
						formObj.third_trdp_addr.value="";//eng_addr
						formObj.third_trdp_cd.style.color= "#000000";
						formObj.third_trdp_nm.style.color= "#000000";
						return;
					}
					
				} else {
					formObj.third_trdp_cd.style.color= "#000000";
					formObj.third_trdp_nm.style.color= "#000000";
				}
				
				formObj.third_trdp_cd.value=rtnValAry[0];//trdp_cd
				
				formObj.third_trdp_nm.value=rtnValAry[2];//eng_nm
				formObj.third_trdp_addr.value=rtnValAry[7];//eng_addr
				/*if(rtnValAry[14]!='' && rtnValAry[15]!='' && rtnValAry[14]<rtnValAry[15]){
					//COD
					alert(getLabel('COM_FRT_ALT001'));
					formObj.third_trdp_cd.style.color= "#ff0000";
					formObj.third_trdp_nm.style.color= "#ff0000";
				} else {
					formObj.third_trdp_cd.style.color= "#000000";
					formObj.third_trdp_nm.style.color= "#000000";
				}*/
				if(typeof(document.getElementsByName("iss_trdp_cd")[0])=="undefined"){
				}else{
					formObj.iss_trdp_cd.value=rtnValAry[0];
					formObj.iss_trdp_nm.value=rtnValAry[2];
					formObj.iss_trdp_addr.value=rtnValAry[7];
				}
			}else if(cur_curObj.id == "partner2"){
				if(rtnValAry[13] == 'KO'){
					alert(getLabel('COM_FRT_ALT015'));
					formObj.prnr_trdp_cd2.value="";//trdp_cd
					formObj.prnr_trdp_nm2.value="";//eng_nm
					formObj.prnr_trdp_addr2.value="";//eng_addr
					return;
				}
				
				if(cur_bizTp == "M"){
					if(rtnValAry[13] == 'CR'){

						//OFVFOUR-7911 [AIF] MANAGING/ALERT CUSTOMER'S OUTSTANDING (OVERDUE)
						if (TP_OVER_AMT_FLG != ""){
							var objArr=new Array();
							var overDueDateAmt = rtnValAry[41]==""?0:eval(rtnValAry[41]);
							if ( overDueDateAmt != 0 ){
								objArr[0]=rtnValAry[2];
								objArr[1]=doMoneyFmt(roundXL(Number(overDueDateAmt),2).toFixed(2));
								if(!confirm(getLabel2('COM_FRT_CFM012', objArr))){
									formObj.prnr_trdp_cd2.style.color= "#000000";
									formObj.prnr_trdp_nm2.style.color= "#000000";
									return;
								} else {
									formObj.prnr_trdp_cd2.style.color= "#ff0000";
									formObj.prnr_trdp_nm2.style.color= "#ff0000";
								}
							}
						}

						var crdLmtAmt=rtnValAry[14]==""?0:eval(rtnValAry[14]);
						var curLmtAmt=rtnValAry[15]==""?0:eval(rtnValAry[15]);
						var balLmtAmt=crdLmtAmt - curLmtAmt;
						var overDueAmt=rtnValAry[29]==""?0:eval(rtnValAry[29]);
						var grandTotal=rtnValAry[31]==""?0:eval(rtnValAry[31]);
						
						//[20141217 YJW] #46708
						if(crdLmtAmt > 0) {
							if(overDueAmt > 0 && balLmtAmt < 0  ){
								var objArr=new Array();
								//objArr[0]=doMoneyFmt(roundXL(Number(crdLmtAmt),2).toFixed(2)); 
								//objArr[1]=doMoneyFmt(roundXL(Number(grandTotal),2).toFixed(2));
								objArr[0]=doMoneyFmt(roundXL(Number(balLmtAmt*(-1)),2).toFixed(2));
								if(!confirm(getLabel2('COM_FRT_CFM008', objArr))){
									formObj.prnr_trdp_cd2.style.color= "#000000";
									formObj.prnr_trdp_nm2.style.color= "#000000";
									return;
								} else {
									formObj.prnr_trdp_cd2.style.color= "#ff0000";
									formObj.prnr_trdp_nm2.style.color= "#ff0000";
								}
							} else if (balLmtAmt < 0  ){
								var objArr=new Array();
								//objArr[0]=doMoneyFmt(roundXL(Number(crdLmtAmt),2).toFixed(2)); 
								//objArr[1]=doMoneyFmt(roundXL(Number(balLmtAmt*(-1)),2).toFixed(2));
								objArr[0]=doMoneyFmt(roundXL(Number(balLmtAmt*(-1)),2).toFixed(2));
								if(!confirm(getLabel2('COM_FRT_CFM006', objArr))){
									formObj.prnr_trdp_cd2.style.color= "#000000";
									formObj.prnr_trdp_nm2.style.color= "#000000";
									return;
								} else {
									formObj.prnr_trdp_cd2.style.color= "#ff0000";
									formObj.prnr_trdp_nm2.style.color= "#ff0000";
								}
							} else if (overDueAmt > 0 ) {
								var objArr=new Array();
								objArr[0]=doMoneyFmt(roundXL(Number(grandTotal),2).toFixed(2));     
								if(!confirm(getLabel2('COM_FRT_CFM007', objArr))){
									formObj.prnr_trdp_cd2.style.color= "#000000";
									formObj.prnr_trdp_nm2.style.color= "#000000";
									return;
								} else {
									formObj.prnr_trdp_cd2.style.color= "#ff0000";
									formObj.prnr_trdp_nm2.style.color= "#ff0000";
								}
							} else {
								formObj.prnr_trdp_cd2.style.color= "#000000";
								formObj.prnr_trdp_nm2.style.color= "#000000";
							}
						} else {
							formObj.prnr_trdp_cd2.style.color= "#000000";
							formObj.prnr_trdp_nm2.style.color= "#000000";
						}
						 
					} else if(rtnValAry[13] == 'CO'){
						 if(confirm(getLabel('COM_FRT_ALT001'))){
							 formObj.prnr_trdp_cd2.style.color= "#ff0000";
							 formObj.prnr_trdp_nm2.style.color= "#ff0000";
						 } else {
							 formObj.prnr_trdp_cd2.value="";//trdp_cd
							 formObj.prnr_trdp_nm2.value="";//eng_nm
							 formObj.prnr_trdp_addr2.value="";//eng_addr
							 formObj.prnr_trdp_cd2.style.color= "#000000";
							 formObj.prnr_trdp_nm2.style.color= "#000000";
							 return;
						 }
					} /*else {
						if(rtnValAry[14]!='' && rtnValAry[15]!='' && rtnValAry[14]<rtnValAry[15]){
							//COD
							alert(getLabel('COM_FRT_ALT001'));
							formObj.prnr_trdp_cd2.style.color= "#ff0000";
							formObj.prnr_trdp_nm2.style.color= "#ff0000";
						} else {
							formObj.prnr_trdp_cd2.style.color= "#000000";
							formObj.prnr_trdp_nm2.style.color= "#000000";
						}
					}*/
					 
					formObj.prnr_trdp_cd2.value=rtnValAry[0];//trdp_cd
					formObj.prnr_trdp_nm2.value=rtnValAry[2];//eng_nm
					formObj.prnr_trdp_addr2.value=rtnValAry[7];//eng_addr
					 
				} else {
					
					if(rtnValAry[13] == 'CO'){
						 if(confirm(getLabel('COM_FRT_ALT001'))){
							 formObj.prnr_trdp_cd2.style.color= "#ff0000";
							 formObj.prnr_trdp_nm2.style.color= "#ff0000";
						 } else {
							 formObj.prnr_trdp_cd2.value="";//trdp_cd
							 formObj.prnr_trdp_nm2.value="";//eng_nm
							 formObj.prnr_trdp_addr2.value="";//eng_addr
							 formObj.prnr_trdp_cd2.style.color= "#000000";
							 formObj.prnr_trdp_nm2.style.color= "#000000";
							 return;
						 }
					}
					
					formObj.prnr_trdp_cd2.value=rtnValAry[0];//trdp_cd
					if(formObj.prnr_trdp_nm.getAttribute("dataformat") == "multiLanguage"){
						formObj.prnr_trdp_nm2.value=rtnValAry[10];//loc_nm
						formObj.prnr_trdp_addr2.value=rtnValAry[26];//loc_addr
						
					}else{
						formObj.prnr_trdp_nm2.value=rtnValAry[2];//eng_nm
						formObj.prnr_trdp_addr2.value=rtnValAry[7];//eng_addr
					}
					
					/*if(rtnValAry[14]!='' && rtnValAry[15]!='' && rtnValAry[14]<rtnValAry[15]){
						//COD
						alert(getLabel('COM_FRT_ALT001'));
						formObj.prnr_trdp_cd2.style.color= "#ff0000";
						formObj.prnr_trdp_nm2.style.color= "#ff0000";
					} else {
						formObj.prnr_trdp_cd2.style.color= "#000000";
						formObj.prnr_trdp_nm2.style.color= "#000000";
					}*/
				}
			}else if(cur_curObj.id == "rcv"){
				if(rtnValAry[13] == 'KO'){
					alert(getLabel('COM_FRT_ALT015'));
					formObj.rcv_wh_cd.value="";//trdp_cd
					formObj.rcv_wh_nm.value="";//eng_nm
					return;
				}
				
				if(rtnValAry[13] == 'CO'){
					if(confirm(getLabel('COM_FRT_ALT001'))){
						formObj.rcv_wh_cd.style.color= "#ff0000";
						formObj.rcv_wh_nm.style.color= "#ff0000";
					}else{
						formObj.rcv_wh_cd.value="";//trdp_cd
						formObj.rcv_wh_nm.value="";//eng_nm
						formObj.rcv_wh_cd.style.color= "#000000";
						formObj.rcv_wh_nm.style.color= "#000000";
						return;
					}
					
				} else {
					formObj.rcv_wh_cd.style.color= "#000000";
					formObj.rcv_wh_nm.style.color= "#000000";
				}
				
				formObj.rcv_wh_cd.value=rtnValAry[0];//trdp_cd
				if(formObj.rcv_wh_nm.getAttribute("dataformat") == "multiLanguage"){
					formObj.rcv_wh_nm.value=rtnValAry[10];//loc_nm
				}else{
					formObj.rcv_wh_nm.value=rtnValAry[2];//eng_nm
				}
				
				/*if(rtnValAry[14]!='' && rtnValAry[15]!='' && rtnValAry[14]<rtnValAry[15]){
					//COD
					alert(getLabel('COM_FRT_ALT001'));
					formObj.rcv_wh_cd.style.color= "#ff0000";
					formObj.rcv_wh_nm.style.color= "#ff0000";
				} else {
					formObj.rcv_wh_cd.style.color= "#000000";
					formObj.rcv_wh_nm.style.color= "#000000";
				}*/
			}else if(cur_curObj.id == "pu"){
				if(rtnValAry[13] == 'KO'){
					alert(getLabel('COM_FRT_ALT015'));
					formObj.pu_trdp_cd.value="";//trdp_cd
					formObj.pu_trdp_nm.value="";//eng_nm
					return;
				}
				
				if(rtnValAry[13] == 'CO'){
					if(confirm(getLabel('COM_FRT_ALT001'))){
						formObj.pu_trdp_cd.style.color= "#ff0000";
						formObj.pu_trdp_nm.style.color= "#ff0000";
					}else{
						formObj.pu_trdp_cd.value="";//trdp_cd
						formObj.pu_trdp_nm.value="";//eng_nm
						formObj.pu_trdp_cd.style.color= "#000000";
						formObj.pu_trdp_nm.style.color= "#000000";
						return;
					}
					
				} else {
					formObj.pu_trdp_cd.style.color= "#000000";
					formObj.pu_trdp_nm.style.color= "#000000";
				}
				
				formObj.pu_trdp_cd.value=rtnValAry[0];//trdp_cd
				if(formObj.pu_trdp_nm.getAttribute("dataformat") == "multiLanguage"){
					formObj.pu_trdp_nm.value=rtnValAry[10];//eng_nm
				}else{
					formObj.pu_trdp_nm.value=rtnValAry[2];//eng_nm
				}
				/*if(rtnValAry[14]!='' && rtnValAry[15]!='' && rtnValAry[14]<rtnValAry[15]){
					//COD
					alert(getLabel('COM_FRT_ALT001'));
					formObj.pu_trdp_cd.style.color= "#ff0000";
					formObj.pu_trdp_nm.style.color= "#ff0000";
				} else {
					formObj.pu_trdp_cd.style.color= "#000000";
					formObj.pu_trdp_nm.style.color= "#000000";
				}*/
			}else if(cur_curObj.id == "cgo_pu"){
				if(rtnValAry[13] == 'KO'){
					alert(getLabel('COM_FRT_ALT015'));
					formObj.cgo_pu_trdp_cd.value="";//trdp_cd
					formObj.cgo_pu_trdp_nm.value="";//eng_nm
					formObj.cgo_pu_trdp_addr.value="";//eng_nm
					return;
				}
				
				if(rtnValAry[13] == 'CO'){
					if(confirm(getLabel('COM_FRT_ALT001'))){
						formObj.cgo_pu_trdp_cd.style.color= "#ff0000";
						formObj.cgo_pu_trdp_nm.style.color= "#ff0000";
					}else{
						formObj.cgo_pu_trdp_cd.value="";//trdp_cd
						formObj.cgo_pu_trdp_nm.value="";//eng_nm
						formObj.cgo_pu_trdp_addr.value="";//eng_nm
						formObj.cgo_pu_trdp_cd.style.color= "#000000";
						formObj.cgo_pu_trdp_nm.style.color= "#000000";
						return;
					}
					
				} else {
					formObj.cgo_pu_trdp_cd.style.color= "#000000";
					formObj.cgo_pu_trdp_nm.style.color= "#000000";
				}
				
				formObj.cgo_pu_trdp_cd.value=rtnValAry[0];//trdp_cd
				// #3519 [Great Luck] Booking Confirmation not showing name for Cargo Pick Up
				//if(formObj.cgo_pu_trdp_nm.getAttribute("dataformat") == "multiLanguage"){
				if(MULTI_LANGUAGE == 'Y'){
					formObj.cgo_pu_trdp_nm.value=rtnValAry[10];//loc_nm
					formObj.cgo_pu_trdp_addr.value=rtnValAry[26];//loc_nm
				}else{
					formObj.cgo_pu_trdp_nm.value=rtnValAry[2];//eng_nm
					formObj.cgo_pu_trdp_addr.value=rtnValAry[7];//eng_nm
				}
				
				/*if(rtnValAry[14]!='' && rtnValAry[15]!='' && rtnValAry[14]<rtnValAry[15]){
					//COD
					alert(getLabel('COM_FRT_ALT001'));
					formObj.cgo_pu_trdp_cd.style.color= "#ff0000";
					formObj.cgo_pu_trdp_nm.style.color= "#ff0000";
				} else {
					formObj.cgo_pu_trdp_cd.style.color= "#000000";
					formObj.cgo_pu_trdp_nm.style.color= "#000000";
				}*/
			}else if(cur_curObj.id == "carr"){
				if(rtnValAry[13] == 'KO'){
					alert(getLabel('COM_FRT_ALT015'));
					formObj.carr_trdp_cd.value="";//trdp_cd
					formObj.carr_trdp_nm.value="";//eng_nm
					formObj.carr_trdp_addr.value="";//eng_nm
					return;
				}
				
				if(rtnValAry[13] == 'CO'){
					if(confirm(getLabel('COM_FRT_ALT001'))){
						formObj.carr_trdp_cd.style.color= "#ff0000";
						formObj.carr_trdp_nm.style.color= "#ff0000";
					}else{
						formObj.carr_trdp_cd.value="";//trdp_cd
						formObj.carr_trdp_nm.value="";//eng_nm
						formObj.carr_trdp_addr.value="";//eng_nm
						formObj.carr_trdp_cd.style.color= "#000000";
						formObj.carr_trdp_nm.style.color= "#000000";
						return;
					}
					
				} else {
					formObj.carr_trdp_cd.style.color= "#000000";
					formObj.carr_trdp_nm.style.color= "#000000";
				}
				
				formObj.carr_trdp_cd.value=rtnValAry[0];//trdp_cd
				if(formObj.carr_trdp_nm.getAttribute("dataformat") == "multiLanguage"){
					formObj.carr_trdp_nm.value=rtnValAry[10];//loc_nm
					formObj.carr_trdp_addr.value=rtnValAry[26];//loc_nm
				}else{
					formObj.carr_trdp_nm.value=rtnValAry[2];//eng_nm
					formObj.carr_trdp_addr.value=rtnValAry[7];//eng_nm
				}
				//#27440 Master B/L Entry 의 Billing Carrier – Carrier Setting 오류
				//if(formObj.lnr_trdp_cd.value =="" && formObj.lnr_trdp_nm.value ==""){
				//	formObj.lnr_trdp_cd.value = rtnValAry[0];//trdp_cd
				//	formObj.lnr_trdp_nm.value = rtnValAry[2];//eng_nm 
				//}
				/*if(rtnValAry[14]!='' && rtnValAry[15]!='' && rtnValAry[14]<rtnValAry[15]){
					//COD
					alert(getLabel('COM_FRT_ALT001'));
					formObj.carr_trdp_cd.style.color= "#ff0000";
					formObj.carr_trdp_nm.style.color= "#ff0000";
				} else {
					formObj.carr_trdp_cd.style.color= "#000000";
					formObj.carr_trdp_nm.style.color= "#000000";
				}*/
			//#2737 [BNX] C/BROKER TO CHECK PAYMENT STATUS
			}else if(cur_curObj.id == "cust"){
				if(rtnValAry[13] == 'KO'){
					alert(getLabel('COM_FRT_ALT015'));
					formObj.cust_trdp_cd.value="";//trdp_cd
					formObj.cust_trdp_nm.value="";//eng_nm
					formObj.cust_trdp_addr.value="";//eng_nm
					return;
				}else if(rtnValAry[13] == 'CH'){
					if(confirm(getLabel('COM_FRT_CFM005'))){ 
						try {creditOver=true;}catch(e){};
						formObj.cust_trdp_cd.style.color= "#ff0000";
						formObj.cust_trdp_nm.style.color= "#ff0000";
						formObj.cust_trdp_nm.className='search_form focusElem';
					}else{
						try {creditOver=false;}catch(e){};
						formObj.cust_trdp_cd.value="";	//trdp_cd  AS param1
						formObj.cust_trdp_nm.value="";		//eng_nm   AS param2
						formObj.cust_trdp_addr.value="";		//eng_addr  AS param5
						formObj.cust_trdp_cd.style.color= "#000000";
						formObj.cust_trdp_nm.style.color= "#000000";
						return;
					}
					
				}else if(rtnValAry[13] == 'CO'){
					if(confirm(getLabel('COM_FRT_ALT001'))){
						try {creditOver=true;}catch(e){};
						formObj.cust_trdp_cd.style.color= "#ff0000";
						formObj.cust_trdp_nm.style.color= "#ff0000";
					}else{
						try {creditOver=false;}catch(e){};
						formObj.cust_trdp_cd.value="";//trdp_cd
						formObj.cust_trdp_nm.value="";//eng_nm
						formObj.cust_trdp_addr.value="";//eng_nm
						formObj.cust_trdp_cd.style.color= "#000000";
						formObj.cust_trdp_nm.style.color= "#000000";
						return;
					}
					
				} else {
					try {creditOver=false;}catch(e){};
					formObj.cust_trdp_cd.style.color= "#000000";
					formObj.cust_trdp_nm.style.color= "#000000";
				}
				
				formObj.cust_trdp_cd.value=rtnValAry[0];//trdp_cd
				formObj.cust_trdp_nm.value=rtnValAry[2];//eng_nm
				formObj.cust_trdp_addr.value=rtnValAry[7];//eng_nm
				
				/*if(rtnValAry[14]!='' && rtnValAry[15]!='' && rtnValAry[14]<rtnValAry[15]){
					//COD
					alert(getLabel('COM_FRT_ALT001'));
					formObj.cust_trdp_cd.style.color= "#ff0000";
					formObj.cust_trdp_nm.style.color= "#ff0000";
				} else {
					formObj.cust_trdp_cd.style.color= "#000000";
					formObj.cust_trdp_nm.style.color= "#000000";
				}*/
			}else if(cur_curObj.id == "carr1"){
				if(rtnValAry[13] == 'KO'){
					alert(getLabel('COM_FRT_ALT015'));
					formObj.carr_trdp_cd1.value="";//trdp_cd
					formObj.carr_trdp_nm1.value="";//eng_nm
					return;
				}
				
				if(rtnValAry[13] == 'CO'){
					if(confirm(getLabel('COM_FRT_ALT001'))){
						formObj.carr_trdp_cd1.style.color= "#ff0000";
						formObj.carr_trdp_nm1.style.color= "#ff0000";
					}else{
						formObj.carr_trdp_cd1.value="";//trdp_cd
						formObj.carr_trdp_nm1.value="";//eng_nm
						formObj.carr_trdp_cd1.style.color= "#000000";
						formObj.carr_trdp_nm1.style.color= "#000000";
						return;
					}
					
				} else {
					formObj.carr_trdp_cd1.style.color= "#000000";
					formObj.carr_trdp_nm1.style.color= "#000000";
				}
				
				formObj.carr_trdp_cd1.value=rtnValAry[0];//trdp_cd
				formObj.carr_trdp_nm1.value=rtnValAry[2];//eng_nm
				
				/*if(rtnValAry[14]!='' && rtnValAry[15]!='' && rtnValAry[14]<rtnValAry[15]){
					//COD
					alert(getLabel('COM_FRT_ALT001'));
					formObj.carr_trdp_cd1.style.color= "#ff0000";
					formObj.carr_trdp_nm1.style.color= "#ff0000";
				} else {
					formObj.carr_trdp_cd1.style.color= "#000000";
					formObj.carr_trdp_nm1.style.color= "#000000";
				}*/
			// Ocean Import Master, CY Location
			}else if(cur_curObj.id == "cy"){
				if(rtnValAry[13] == 'KO'){
					alert(getLabel('COM_FRT_ALT015'));
					formObj.cy_trdp_cd.value="";//trdp_cd
					formObj.cy_trdp_nm.value="";//eng_nm
					return;
				}
				
				if(rtnValAry[13] == 'CO'){
					if(confirm(getLabel('COM_FRT_ALT001'))){
						formObj.cy_trdp_cd.style.color= "#ff0000";
						formObj.cy_trdp_nm.style.color= "#ff0000";
					}else{
						formObj.cy_trdp_cd.value="";//trdp_cd
						formObj.cy_trdp_nm.value="";//eng_nm
						formObj.cy_trdp_cd.style.color= "#000000";
						formObj.cy_trdp_nm.style.color= "#000000";
						return;
					}
					
				} else {
					formObj.cy_trdp_cd.style.color= "#000000";
					formObj.cy_trdp_nm.style.color= "#000000";
				}
				
				formObj.cy_trdp_cd.value=rtnValAry[0];//trdp_cd
				if(formObj.cy_trdp_nm.getAttribute("dataformat") == "multiLanguage"){
					formObj.cy_trdp_nm.value=rtnValAry[10];//loc_nm
				} else {
					formObj.cy_trdp_nm.value=rtnValAry[2];//eng_nm
				}

				/*if(rtnValAry[14]!='' && rtnValAry[15]!='' && rtnValAry[14]<rtnValAry[15]){
					//COD
					alert(getLabel('COM_FRT_ALT001'));
					formObj.cy_trdp_cd.style.color= "#ff0000";
					formObj.cy_trdp_nm.style.color= "#ff0000";
				} else {
					formObj.cy_trdp_cd.style.color= "#000000";
					formObj.cy_trdp_nm.style.color= "#000000";
				}*/
			// Ocean Import Master, CFS Location
			}else if(cur_curObj.id == "cfs"){
				if(rtnValAry[13] == 'KO'){
					alert(getLabel('COM_FRT_ALT015'));
					formObj.cfs_trdp_cd.value="";//trdp_cd
					formObj.cfs_trdp_nm.value="";//eng_nm
					return;
				}
				
				if(rtnValAry[13] == 'CO'){
					if(confirm(getLabel('COM_FRT_ALT001'))){
						formObj.cfs_trdp_cd.style.color= "#ff0000";
						formObj.cfs_trdp_nm.style.color= "#ff0000";
					}else{
						formObj.cfs_trdp_cd.value="";//trdp_cd
						formObj.cfs_trdp_nm.value="";//eng_nm
						formObj.cfs_trdp_cd.style.color= "#000000";
						formObj.cfs_trdp_nm.style.color= "#000000";
						return;
					}
					
				} else {
					formObj.cfs_trdp_cd.style.color= "#000000";
					formObj.cfs_trdp_nm.style.color= "#000000";
				}
				
				formObj.cfs_trdp_cd.value=rtnValAry[0];//trdp_cd
				//JPT 수정요청사항 - 2018.01.15
				if(MULTI_LANGUAGE == 'Y'){
					formObj.cfs_trdp_nm.value=rtnValAry[10];//loc_nm
				}else{
					formObj.cfs_trdp_nm.value=rtnValAry[2];//eng_nm
				}
				
				/*if(rtnValAry[14]!='' && rtnValAry[15]!='' && rtnValAry[14]<rtnValAry[15]){
					//COD
					alert(getLabel('COM_FRT_ALT001'));
					formObj.cfs_trdp_cd.style.color= "#ff0000";
					formObj.cfs_trdp_nm.style.color= "#ff0000";
				} else {
					formObj.cfs_trdp_cd.style.color= "#000000";
					formObj.cfs_trdp_nm.style.color= "#000000";
				}*/
			// Ocean Import House, Air Import House
			}else if(cur_curObj.id == "door"){
				if(rtnValAry[13] == 'KO'){
					alert(getLabel('COM_FRT_ALT015'));
					formObj.door_loc_cd.value="";//trdp_cd
					formObj.door_loc_nm.value="";//eng_nm
					return;
				}
				
				if(rtnValAry[13] == 'CO'){
					if(confirm(getLabel('COM_FRT_ALT001'))){
						formObj.door_loc_cd.style.color= "#ff0000";
						formObj.door_loc_nm.style.color= "#ff0000";
					}else{
						formObj.door_loc_cd.value="";//trdp_cd
						formObj.door_loc_nm.value="";//eng_nm
						formObj.door_loc_cd.style.color= "#000000";
						formObj.door_loc_nm.style.color= "#000000";
						return;
					}
					
				} else {
					formObj.door_loc_cd.style.color= "#000000";
					formObj.door_loc_nm.style.color= "#000000";
				}
				
				formObj.door_loc_cd.value=rtnValAry[0];//trdp_cd
				if(formObj.door_loc_nm.getAttribute("dataformat") == "multiLanguage"){
					formObj.door_loc_nm.value=rtnValAry[10];//loc_nm
				}else{
					formObj.door_loc_nm.value=rtnValAry[2];//eng_nm
				}
				//OFVFOUR-7736 [SENKO USA] Consignee and Delivery Location
				if(cur_airSeaTp == "S" && cur_bizTp == "H" && cur_bndTp == "I"){
					formObj.lgl_addr.value=rtnValAry[16];
				}
				
				/*if(rtnValAry[14]!='' && rtnValAry[15]!='' && rtnValAry[14]<rtnValAry[15]){
					//COD
					alert(getLabel('COM_FRT_ALT001'));
					formObj.door_loc_cd.style.color= "#ff0000";
					formObj.door_loc_nm.style.color= "#ff0000";
				} else {
					formObj.door_loc_cd.style.color= "#000000";
					formObj.door_loc_nm.style.color= "#000000";
				}*/
			// Ocean Import Master, Container Return Place
			}else if(cur_curObj.id == "rt"){
				if(rtnValAry[13] == 'KO'){
					alert(getLabel('COM_FRT_ALT015'));
					formObj.rt_trdp_cd.value="";//trdp_cd
					formObj.rt_trdp_nm.value="";//eng_nm
					return;
				}
				
				if(rtnValAry[13] == 'CO'){
					if(confirm(getLabel('COM_FRT_ALT001'))){
						formObj.rt_trdp_cd.style.color= "#ff0000";
						formObj.rt_trdp_nm.style.color= "#ff0000";
					}else{
						formObj.rt_trdp_cd.value="";//trdp_cd
						formObj.rt_trdp_nm.value="";//eng_nm
						formObj.rt_trdp_cd.style.color= "#000000";
						formObj.rt_trdp_nm.style.color= "#000000";
						return;
					}
					
				} else {
					formObj.rt_trdp_cd.style.color= "#000000";
					formObj.rt_trdp_nm.style.color= "#000000";
				}
				
				formObj.rt_trdp_cd.value=rtnValAry[0];//trdp_cd
				formObj.rt_trdp_nm.value=rtnValAry[2];//eng_nm
				
				/*if(rtnValAry[14]!='' && rtnValAry[15]!='' && rtnValAry[14]<rtnValAry[15]){
					//COD
					alert(getLabel('COM_FRT_ALT001'));
					formObj.rt_trdp_cd.style.color= "#ff0000";
					formObj.rt_trdp_nm.style.color= "#ff0000";
				} else {
					formObj.rt_trdp_cd.style.color= "#000000";
					formObj.rt_trdp_nm.style.color= "#000000";
				}*/
			}else if(cur_curObj.id == "wh"){
				if(rtnValAry[13] == 'KO'){
					alert(getLabel('COM_FRT_ALT015'));
					formObj.fnl_wh_cd.value="";//trdp_cd
					formObj.fnl_wh_nm.value="";//eng_nm
					return;
				}
				
				if(rtnValAry[13] == 'CO'){
					if(confirm(getLabel('COM_FRT_ALT001'))){
						formObj.fnl_wh_cd.style.color= "#ff0000";
						formObj.fnl_wh_nm.style.color= "#ff0000";
					}else{
						formObj.fnl_wh_cd.value="";//trdp_cd
						formObj.fnl_wh_nm.value="";//eng_nm
						formObj.fnl_wh_cd.style.color= "#000000";
						formObj.fnl_wh_nm.style.color= "#000000";
						return;
					}
					
				} else {
					formObj.fnl_wh_cd.style.color= "#000000";
					formObj.fnl_wh_nm.style.color= "#000000";
				}
				
				formObj.fnl_wh_cd.value=rtnValAry[0];//trdp_cd
				if(formObj.fnl_wh_nm.getAttribute("dataformat") == "multiLanguage"){
					formObj.fnl_wh_nm.value=rtnValAry[10];//loc_nm
				}else{
					formObj.fnl_wh_nm.value=rtnValAry[2];//eng_nm
				}
				
				/*if(rtnValAry[14]!='' && rtnValAry[15]!='' && rtnValAry[14]<rtnValAry[15]){
					//COD
					alert(getLabel('COM_FRT_ALT001'));
					formObj.fnl_wh_cd.style.color= "#ff0000";
					formObj.fnl_wh_nm.style.color= "#ff0000";
				} else {
					formObj.fnl_wh_cd.style.color= "#000000";
					formObj.fnl_wh_nm.style.color= "#000000";
				}*/
			}else if(cur_curObj.id == "bond"){
				if(rtnValAry[13] == 'KO'){
					alert(getLabel('COM_FRT_ALT015'));
					formObj.bond_carr_cd.value="";//trdp_cd
					formObj.bond_carr_nm.value="";//eng_nm
					return;
				}
				
				if(rtnValAry[13] == 'CO'){
					if(confirm(getLabel('COM_FRT_ALT001'))){
						formObj.bond_carr_cd.style.color= "#ff0000";
						formObj.bond_carr_nm.style.color= "#ff0000";
					}else{
						formObj.bond_carr_cd.value="";//trdp_cd
						formObj.bond_carr_nm.value="";//eng_nm
						formObj.bond_carr_cd.style.color= "#000000";
						formObj.bond_carr_nm.style.color= "#000000";
						return;
					}
					
				} else {
					formObj.bond_carr_cd.style.color= "#000000";
					formObj.bond_carr_nm.style.color= "#000000";
				}
				
				formObj.bond_carr_cd.value=rtnValAry[0];//trdp_cd
				formObj.bond_carr_nm.value=rtnValAry[2];//eng_nm
				
				/*if(rtnValAry[14]!='' && rtnValAry[15]!='' && rtnValAry[14]<rtnValAry[15]){
					//COD
					alert(getLabel('COM_FRT_ALT001'));
					formObj.bond_carr_cd.style.color= "#ff0000";
					formObj.bond_carr_nm.style.color= "#ff0000";
				} else {
					formObj.bond_carr_cd.style.color= "#000000";
					formObj.bond_carr_nm.style.color= "#000000";
				}*/
			}else if(cur_curObj.id == "iss"){
				if(rtnValAry[13] == 'KO'){
					alert(getLabel('COM_FRT_ALT015'));
					formObj.iss_trdp_cd.value="";//trdp_cd
					formObj.iss_trdp_nm.value="";//eng_nm
					formObj.iss_trdp_addr.value="";//eng_addr
					return;
				}
				
				if(rtnValAry[13] == 'CO'){
					if(confirm(getLabel('COM_FRT_ALT001'))){
						formObj.iss_trdp_cd.style.color= "#ff0000";
						formObj.iss_trdp_nm.style.color= "#ff0000";
					}else{
						formObj.iss_trdp_cd.value="";//trdp_cd
						formObj.iss_trdp_nm.value="";//eng_nm
						formObj.iss_trdp_addr.value="";//eng_addr
						formObj.iss_trdp_cd.style.color= "#000000";
						formObj.iss_trdp_nm.style.color= "#000000";
						return;
					}
					
				} else {
					formObj.iss_trdp_cd.style.color= "#000000";
					formObj.iss_trdp_nm.style.color= "#000000";
				}
				
				formObj.iss_trdp_cd.value=rtnValAry[0];//trdp_cd
				if(formObj.iss_trdp_nm.getAttribute("dataformat") == "multiLanguage"){
					formObj.iss_trdp_nm.value=rtnValAry[10];//loc_nm
					formObj.iss_trdp_addr.value=rtnValAry[26];//eng_addr
				}else{
					formObj.iss_trdp_nm.value=rtnValAry[2];//eng_nm
					formObj.iss_trdp_addr.value=rtnValAry[7];//eng_addr
				}

				// Issuing Carrier 변경 시 IATA CODE 도 업데이트 Air/Export/Master일 경우에만
				if(cur_airSeaTp=='A' && cur_bndTp =="O" && cur_bizTp=='M'){
					formObj.iata_cd.value = rtnValAry[22];//IATA CD
				}
				
				/*if(rtnValAry[14]!='' && rtnValAry[15]!='' && rtnValAry[14]<rtnValAry[15]){
					//COD
					alert(getLabel('COM_FRT_ALT001'));
					formObj.iss_trdp_cd.style.color= "#ff0000";
					formObj.iss_trdp_nm.style.color= "#ff0000";
				} else {
					formObj.iss_trdp_cd.style.color= "#000000";
					formObj.iss_trdp_nm.style.color= "#000000";
				}*/
			}else if(cur_curObj.id == "frt_loc"){
				if(rtnValAry[13] == 'KO'){
					alert(getLabel('COM_FRT_ALT015'));
					formObj.frt_loc_cd.value="";//trdp_cd
					formObj.frt_loc_nm.value="";//eng_nm
					return;
				}
				
				if(rtnValAry[13] == 'CO'){
					if(confirm(getLabel('COM_FRT_ALT001'))){
						formObj.frt_loc_cd.style.color= "#ff0000";
						formObj.frt_loc_nm.style.color= "#ff0000";
					}else{
						formObj.frt_loc_cd.value="";//trdp_cd
						formObj.frt_loc_nm.value="";//eng_nm
						formObj.frt_loc_cd.style.color= "#000000";
						formObj.frt_loc_nm.style.color= "#000000";
						return;
					}
					
				} else {
					formObj.frt_loc_cd.style.color= "#000000";
					formObj.frt_loc_nm.style.color= "#000000";
				}
				
				formObj.frt_loc_cd.value=rtnValAry[0];//trdp_cd
				if(formObj.frt_loc_nm.getAttribute("dataformat") == "multiLanguage"){
					formObj.frt_loc_nm.value=rtnValAry[10];//loc_nm
				}else{
					formObj.frt_loc_nm.value=rtnValAry[2];//eng_nm
				}
				
				/*if(rtnValAry[14]!='' && rtnValAry[15]!='' && rtnValAry[14]<rtnValAry[15]){
					//COD
					alert(getLabel('COM_FRT_ALT001'));
					formObj.frt_loc_cd.style.color= "#ff0000";
					formObj.frt_loc_nm.style.color= "#ff0000";
				} else {
					formObj.frt_loc_cd.style.color= "#000000";
					formObj.frt_loc_nm.style.color= "#000000";
				}*/
			}else if(cur_curObj.id == "trk"){
				//2012.04.27 GOALS EDI
				formObj.trk_trdp_cd.value=rtnValAry[0];//trdp_cd
				if(formObj.trk_trdp_nm.getAttribute("dataformat") == "multiLanguage"){
					formObj.trk_trdp_nm.value	=rtnValAry[10];	//loc_nm   AS param2
					if (formObj.trk_trdp_addr !== undefined) {
						formObj.trk_trdp_addr.value	=rtnValAry[26];//loc_nm   AS param2
					}
				}else{
					formObj.trk_trdp_nm.value	=rtnValAry[2];	 //eng_nm
					if (formObj.trk_trdp_addr !== undefined) {
						formObj.trk_trdp_addr.value	=rtnValAry[7];	 //eng_addr   AS param2
					}
				}
//				if(rtnValAry[14]!='' && rtnValAry[15]!='' && rtnValAry[14]<rtnValAry[15]){
//					//COD
//				}
			}else if(cur_curObj.id == "vndr"){
				if(rtnValAry[13] == 'KO'){
					alert(getLabel('COM_FRT_ALT015'));
					formObj.vndr_trdp_cd.value="";//trdp_cd
					formObj.vndr_trdp_nm.value="";//eng_nm
					return;
				}
				
				if(rtnValAry[13] == 'CO'){
					if(confirm(getLabel('COM_FRT_ALT001'))){
						formObj.vndr_trdp_cd.style.color= "#ff0000";
						formObj.vndr_trdp_nm.style.color= "#ff0000";
					}else{
						formObj.vndr_trdp_cd.value="";//trdp_cd
						formObj.vndr_trdp_nm.value="";//eng_nm
						formObj.vndr_trdp_cd.style.color= "#000000";
						formObj.vndr_trdp_nm.style.color= "#000000";
						return;
					}
					
				} else {
					formObj.vndr_trdp_cd.style.color= "#000000";
					formObj.vndr_trdp_nm.style.color= "#000000";
				}
				
				formObj.vndr_trdp_cd.value=rtnValAry[0];//trdp_cd
				if(formObj.vndr_trdp_nm.getAttribute("dataformat") == "multiLanguage"){
					formObj.vndr_trdp_nm.value=rtnValAry[10];//loc_nm   AS param2
				}else{
					formObj.vndr_trdp_nm.value=rtnValAry[2];//eng_nm
				}
				/*if(rtnValAry[14]!='' && rtnValAry[15]!='' && rtnValAry[14]<rtnValAry[15]){
					//COD
					alert(getLabel('COM_FRT_ALT001'));
					formObj.vndr_trdp_cd.style.color= "#ff0000";
					formObj.vndr_trdp_nm.style.color= "#ff0000";
				} else {
					formObj.vndr_trdp_cd.style.color= "#000000";
					formObj.vndr_trdp_nm.style.color= "#000000";
				}*/
			}else if(cur_curObj.id == "warehouse"){ //#52613 [BNX] TYO 오피스 B/L 양식, Booking Information 리포트
				if(rtnValAry[13] == 'KO'){
					alert(getLabel('COM_FRT_ALT015'));
					formObj.wh_trdp_cd.value="";//trdp_cd
					formObj.wh_trdp_nm.value="";//eng_nm
					formObj.wh_trdp_addr.value="";//eng_addr
					return;
				}
				
				if(rtnValAry[13] == 'CO'){
					if(confirm(getLabel('COM_FRT_ALT001'))){
						formObj.wh_trdp_cd.style.color= "#ff0000";
						formObj.wh_trdp_nm.style.color= "#ff0000";
					}else{
						formObj.wh_trdp_cd.value="";//trdp_cd
						formObj.wh_trdp_nm.value="";//eng_nm
						formObj.wh_trdp_addr.value="";//eng_addr
						formObj.wh_trdp_cd.style.color= "#000000";
						formObj.wh_trdp_nm.style.color= "#000000";
						return;
					}
					
				} else {
					formObj.wh_trdp_cd.style.color= "#000000";
					formObj.wh_trdp_nm.style.color= "#000000";
				}
				
				formObj.wh_trdp_cd.value=rtnValAry[0];//trdp_cd
				if(formObj.wh_trdp_nm.getAttribute("dataformat") == "multiLanguage"){
					formObj.wh_trdp_nm.value=rtnValAry[10];//loc_nm
					formObj.wh_trdp_addr.value=rtnValAry[26];//loc_addr
				}else{
					formObj.wh_trdp_nm.value=rtnValAry[2];//eng_nm
					formObj.wh_trdp_addr.value=rtnValAry[7];//eng_addr
				}

				/*if(rtnValAry[14]!='' && rtnValAry[15]!='' && rtnValAry[14]<rtnValAry[15]){
					//COD
					alert(getLabel('COM_FRT_ALT001'));
					formObj.wh_trdp_cd.style.color= "#ff0000";
					formObj.wh_trdp_nm.style.color= "#ff0000";
				} else {
					formObj.wh_trdp_cd.style.color= "#000000";
					formObj.wh_trdp_nm.style.color= "#000000";
				}*/
			}else if(cur_curObj.id == "forwarder"){
				if(rtnValAry[13] == 'KO'){
					alert(getLabel('COM_FRT_ALT015'));
					formObj.fwrd_agn_trdp_cd.value="";//trdp_cd
					formObj.fwrd_agn_trdp_nm.value="";//eng_nm
					formObj.fwrd_agn_trdp_addr.value="";//eng_addr
					return;
				}
				
				if(rtnValAry[13] == 'CO'){
					if(confirm(getLabel('COM_FRT_ALT001'))){
						formObj.fwrd_agn_trdp_cd.style.color= "#ff0000";
						formObj.fwrd_agn_trdp_nm.style.color= "#ff0000";
					}else{
						formObj.fwrd_agn_trdp_cd.value="";//trdp_cd
						formObj.fwrd_agn_trdp_nm.value="";//eng_nm
						formObj.fwrd_agn_trdp_addr.value="";//eng_addr
						formObj.fwrd_agn_trdp_cd.style.color= "#000000";
						formObj.fwrd_agn_trdp_nm.style.color= "#000000";
						return;
					}
					
				} else {
					formObj.fwrd_agn_trdp_cd.style.color= "#000000";
					formObj.fwrd_agn_trdp_nm.style.color= "#000000";
				}
				
				formObj.fwrd_agn_trdp_cd.value=rtnValAry[0];//trdp_cd
				formObj.fwrd_agn_trdp_nm.value=rtnValAry[2];//eng_nm
				formObj.fwrd_agn_trdp_addr.value=rtnValAry[7];//eng_addr
				
				/*if(rtnValAry[14]!='' && rtnValAry[15]!='' && rtnValAry[14]<rtnValAry[15]){
					//COD
					alert(getLabel('COM_FRT_ALT001'));
					formObj.fwrd_agn_trdp_cd.style.color= "#ff0000";
					formObj.fwrd_agn_trdp_nm.style.color= "#ff0000";
				} else {
					formObj.fwrd_agn_trdp_cd.style.color= "#000000";
					formObj.fwrd_agn_trdp_nm.style.color= "#000000";
				}*/
			} else if(cur_curObj.id == "trn"){ //Trucking Company - DO
				formObj.trsp_trdp_cd.value=rtnValAry[0];//trdp_cd
				formObj.trsp_trdp_nm.value=rtnValAry[10];//eng_nm
				formObj.trsp_trdp_addr.value=rtnValAry[37];//dflt_addr
				formObj.trsp_trdp_pic.value=rtnValAry[3];//pic_nm
				formObj.trsp_trdp_phn.value=rtnValAry[4];//pic_phn
				formObj.trsp_trdp_fax.value=rtnValAry[5];//pic_fax
			} else if(cur_curObj.id == "pck"){ //Pickup - DO
				formObj.pickup_trdp_cd.value=rtnValAry[0];//trdp_cd
				formObj.pickup_trdp_nm.value=rtnValAry[2];//eng_nm
				formObj.pickup_addr.value=rtnValAry[37];//dflt_addr
				formObj.pickup_pic.value=rtnValAry[3];//pic_nm
				formObj.pickup_pic_phn.value=rtnValAry[4];//pic_phn
				formObj.pickup_fax.value=rtnValAry[5];//pic_fax
			} else if(cur_curObj.id == "del"){ //Delivery - DO
				formObj.dest_rout_trdp_cd.value=rtnValAry[0];//trdp_cd
				formObj.dest_rout_trdp_nm.value=rtnValAry[2];//eng_nm
				formObj.dest_rout_addr.value=rtnValAry[37];//dflt_addr
				formObj.dest_rout_pic.value=rtnValAry[3];//pic_nm
				formObj.dest_rout_pic_phn.value=rtnValAry[4];//pic_phn
				formObj.dest_rout_pic_fax.value=rtnValAry[5];//pic_fax
			} 
			
        }
    
}

function chkValidEvent(event) {
    if (!event || typeof event !== "function") {
        return false;
    }
    return true;
}

function LINER_POPLIST_MS(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		if(curObjId == "liner"){
			if(rtnValAry[13] == 'KO'){
				alert(getLabel('COM_FRT_ALT015'));
				formObj.lnr_trdp_cd.value="";//trdp_cd
				formObj.lnr_trdp_nm.value="";//full_nm
				return;
			}
			
			if(rtnValAry[13] == 'CO'){
				if(confirm(getLabel('COM_FRT_ALT001'))){
					formObj.lnr_trdp_cd.style.color= "#ff0000";
					formObj.lnr_trdp_nm.style.color= "#ff0000";
				}else{
					formObj.lnr_trdp_cd.value="";//trdp_cd
					formObj.lnr_trdp_nm.value="";//full_nm
					formObj.lnr_trdp_cd.style.color= "#000000";
					formObj.lnr_trdp_nm.style.color= "#000000";
					return;
				}
				
			} else {
				formObj.lnr_trdp_cd.style.color= "#000000";
				formObj.lnr_trdp_nm.style.color= "#000000";
			}
			
			formObj.lnr_trdp_cd.value=rtnValAry[0];//trdp_cd
			formObj.lnr_trdp_nm.value=rtnValAry[2];//eng_nm
			
			// #23721 요건변경됨.
			// if(formObj.carr_trdp_cd.value =="" && formObj.carr_trdp_nm.value ==""){
			// 	formObj.carr_trdp_cd.value = rtnValAry[0];//trdp_cd
			// 	formObj.carr_trdp_nm.value = rtnValAry[2];//full_nm
			// }
			/*if(rtnValAry[14]!='' && rtnValAry[15]!='' && rtnValAry[14]<rtnValAry[15]){
				//COD
				alert(getLabel('COM_FRT_ALT001'));
				formObj.lnr_trdp_cd.style.color= "#ff0000";
				formObj.lnr_trdp_nm.style.color= "#ff0000";
			} else {
				formObj.lnr_trdp_cd.style.color= "#000000";
				formObj.lnr_trdp_nm.style.color= "#000000";
			}*/
		}
	}
}
function LINER_POPLIST_M(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		if(curObjId == "liner"){
			if(rtnValAry[13] == 'KO'){
				alert(getLabel('COM_FRT_ALT015'));
				formObj.lnr_trdp_cd.value="";//trdp_cd
				formObj.lnr_trdp_nm.value="";//full_nm
				return;
			}
			
			if(rtnValAry[13] == 'CO'){
				if(confirm(getLabel('COM_FRT_ALT001'))){
					formObj.lnr_trdp_cd.style.color= "#ff0000";
					formObj.lnr_trdp_nm.style.color= "#ff0000";
				}else{
					formObj.lnr_trdp_cd.value="";//trdp_cd
					formObj.lnr_trdp_nm.value="";//full_nm
					formObj.lnr_trdp_cd.style.color= "#000000";
					formObj.lnr_trdp_nm.style.color= "#000000";
					return;
				}
				
			} else {
				formObj.lnr_trdp_cd.style.color= "#000000";
				formObj.lnr_trdp_nm.style.color= "#000000";
			}
			
			formObj.lnr_trdp_cd.value=rtnValAry[0];//trdp_cd
			formObj.lnr_trdp_nm.value=rtnValAry[2];//eng_nm
			
			/*if(rtnValAry[14]!='' && rtnValAry[15]!='' && rtnValAry[14]<rtnValAry[15]){
				//COD
				alert(getLabel('COM_FRT_ALT001'));
				formObj.lnr_trdp_cd.style.color= "#ff0000";
				formObj.lnr_trdp_nm.style.color= "#ff0000";
			} else {
				formObj.lnr_trdp_cd.style.color= "#000000";
				formObj.lnr_trdp_nm.style.color= "#000000";
			}*/
			if(user_ofc_cnt_cd=="JP"){
				if(rtnValAry[21]!=''){
					formObj.bl_no.value=rtnValAry[21] + '-';
				}
				if(rtnValAry[22]!=''){
					formObj.flt_no.value=rtnValAry[22] + '-';
				}
			}else{
				if(formObj.bl_no.value=='' && rtnValAry[21]!=''){
					formObj.bl_no.value=rtnValAry[21] + '-';
				}
				if(formObj.flt_no.value=='' && rtnValAry[22]!=''){
					formObj.flt_no.value=rtnValAry[22] + '-';
				}
			}
		}
	}
}
function LINER_POPLIST_AIR_M(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		if(cur_curObj.id == "liner"){
			if(rtnValAry[13] == 'KO'){
				alert(getLabel('COM_FRT_ALT015'));
				formObj.lnr_trdp_cd.value="";//trdp_cd
				formObj.lnr_trdp_nm.value="";//full_nm
				return;
			}
			
			if(rtnValAry[13] == 'CO'){
				if(confirm(getLabel('COM_FRT_ALT001'))){
					formObj.lnr_trdp_cd.style.color= "#ff0000";
					formObj.lnr_trdp_nm.style.color= "#ff0000";
				}else{
					formObj.lnr_trdp_cd.value="";//trdp_cd
					formObj.lnr_trdp_nm.value="";//full_nm
					formObj.lnr_trdp_cd.style.color= "#000000";
					formObj.lnr_trdp_nm.style.color= "#000000";
					return;
				}
				
			} else {
				formObj.lnr_trdp_cd.style.color= "#000000";
				formObj.lnr_trdp_nm.style.color= "#000000";
			}
			
			formObj.lnr_trdp_cd.value=rtnValAry[0];//trdp_cd
			formObj.lnr_trdp_nm.value=rtnValAry[2];//eng_nm
			
			if(formObj.iss_trdp_cd.value== "" && formObj.iss_trdp_nm.value == ""){
				formObj.iss_trdp_cd.value=rtnValAry[0];//trdp_cd
				formObj.iss_trdp_nm.value=rtnValAry[2];//full_nm
			}
			/*if(rtnValAry[14]!='' && rtnValAry[15]!='' && rtnValAry[14]<rtnValAry[15]){
				//COD
				alert(getLabel('COM_FRT_ALT001'));
				formObj.lnr_trdp_cd.style.color= "#ff0000";
				formObj.lnr_trdp_nm.style.color= "#ff0000";
			} else {
				formObj.lnr_trdp_cd.style.color= "#000000";
				formObj.lnr_trdp_nm.style.color= "#000000";
			}*/
			if(user_ofc_cnt_cd=="JP"){
				if(rtnValAry[21]!=''){
					formObj.bl_no.value=rtnValAry[21] + '-';
				}
				if(rtnValAry[22]!=''){
					formObj.flt_no.value=rtnValAry[22] + '-';
				}
			}else{
				if(formObj.bl_no.value=='' && rtnValAry[21]!=''){
					formObj.bl_no.value=rtnValAry[21] + '-';
				}
				if(formObj.flt_no.value=='' && rtnValAry[22]!=''){
					formObj.flt_no.value=rtnValAry[22] + '-';
				}
			}
		}
	}
}
function LINER_POPLIST_IATA(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		if(cur_curObj.id == "liner"){
			if(rtnValAry[13] == 'KO'){
				alert(getLabel('COM_FRT_ALT015'));
				formObj.iata_cd.value    = "";//prefix
				formObj.iata_cd_nm.value = "";//full_nm
				return;
			}
			
			if(rtnValAry[13] == 'CO'){
				if(confirm(getLabel('COM_FRT_ALT001'))){
					formObj.iata_cd.style.color= "#ff0000";
					formObj.iata_cd_nm.style.color= "#ff0000";
				}else{
					formObj.iata_cd.value    = "";//prefix
					formObj.iata_cd_nm.value = "";//full_nm
					formObj.iata_cd.style.color= "#000000";
					formObj.iata_cd_nm.style.color= "#000000";
					return;
				}
				
			} else {
				formObj.iata_cd.style.color= "#000000";
				formObj.iata_cd_nm.style.color= "#000000";
			}
			
			formObj.iata_cd.value    = rtnValAry[21]; //prefix
			formObj.iata_cd_nm.value = rtnValAry[2];  //full_nm
			/*if(rtnValAry[14]!='' && rtnValAry[15]!='' && rtnValAry[14]<rtnValAry[15]){
				//COD
				alert(getLabel('COM_FRT_ALT001'));
				formObj.iata_cd.style.color= "#ff0000";
				formObj.iata_cd_nm.style.color= "#ff0000";
			} else {
				formObj.iata_cd.style.color= "#000000";
				formObj.iata_cd_nm.style.color= "#000000";
			}*/	
			
		}
	}
}

function PIC_POP(rtnVal){
	
}
function COMMODITY_POPLIST(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		//OFVFOUR-8056: [BNX-LA] Adding Search option in AR/AP list and OIH List screen
		if (formObj.rep_cmdt_cd) {
			formObj.rep_cmdt_cd.value = rtnValAry[0];
			formObj.rep_cmdt_nm.value = rtnValAry[2];
			formObj.rep_cmdt_nm.onchange();
		} else {
			formObj.f_cmdt_cd.value = rtnValAry[0];
			formObj.f_cmdt_nm.value = rtnValAry[2];
		}
	}
}
function LOCATION_POPLIST(rtnVal){
	var formObj = document.frm1;
//#1344 [CLT] v4.4.1 bug - 자동완성 기능 side effect
	if (cur_airSeaTp == "" || cur_airSeaTp == "undefined" || cur_airSeaTp == undefined) {
		getcurType();
	}
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		if(cur_curObj.id == "por"){
			if(rtnValAry[0]==''){
				//formObj.por_cd.focus();
			}else{
				formObj.por_cd.value=rtnValAry[0];//loc_cd 
				//formObj.por_nod_cd.value= rtnValAry[1];//nod_cd
				//formObj.por_nm.value    = rtnValAry[2]+', '+rtnValAry[4];//loc_nm
				formObj.por_nm.value=rtnValAry[2];//loc_nm
			}
		}else if(cur_curObj.id == "pol"){
			if(rtnValAry[0]==''){
				//formObj.pol_cd.focus();
			}else{
				formObj.pol_cd.value=rtnValAry[0];//loc_cd 
				//formObj.pol_nod_cd.value= rtnValAry[1];//nod_cd
				//formObj.pol_nm.value  = rtnValAry[2]+', '+rtnValAry[4];//loc_nm
				formObj.pol_nm.value=rtnValAry[2];//loc_nm
				if(typeof(formObj.pol_cnt_cd) != "undefined"){
					formObj.pol_cnt_cd.value=rtnValAry[5];
				}
				
				if(cur_airSeaTp=='S' && cur_bndTp=='O' && (cur_bizTp=="M" || cur_bizTp=="H")){
					//2016-10-17 hskang. if 조건 변경.
					//#30284 [BINEX]OEH On-Board Date 동기화
					cobChange_pol();
				}
			}
		}else if(cur_curObj.id == "pod"){
			if(rtnValAry[0]==''){
				//formObj.pod_cd.focus();
			}else{
				formObj.pod_cd.value=rtnValAry[0];//loc_cd
				//formObj.pod_nod_cd.value= rtnValAry[1];//nod_cd
				//formObj.pod_nm.value  = rtnValAry[2]+', '+rtnValAry[4];//loc_nm
				formObj.pod_nm.value=rtnValAry[2];//loc_nm
			}
		}else if(cur_curObj.id == "del"){
			if(rtnValAry[0]==''){
				//formObj.del_cd.focus();
			}else{
				formObj.del_cd.value=rtnValAry[0];//loc_cd 
				//formObj.del_nod_cd.value = rtnValAry[1];//nod_cd
				//formObj.del_nm.value  = rtnValAry[2]+', '+rtnValAry[4];//loc_nm
				formObj.del_nm.value=rtnValAry[2];//loc_nm
				if (formObj.svc_lane_nm) {
				    formObj.svc_lane_nm.value=rtnValAry[10];//lane
				}
			}
		}else if(cur_curObj.id == "dest"){
			if(rtnValAry[0]==''){
				//formObj.fnl_dest_loc_cd.focus();
			}else{
				formObj.fnl_dest_loc_cd.value=rtnValAry[0];//loc_cd 
				//formObj.fnl_dest_nod_cd.value = rtnValAry[1];//nod_cd
				//formObj.fnl_dest_loc_nm.value = rtnValAry[2]+', '+rtnValAry[4];//loc_nm
				formObj.fnl_dest_loc_nm.value=rtnValAry[2];//loc_nm
			}
		}else if(cur_curObj.id == "door"){
			if(rtnValAry[0]==''){
				//formObj.door_loc_cd.focus();
			}else{
				formObj.door_loc_cd.value=rtnValAry[0];//loc_cd 
				//formObj.fnl_dest_nod_cd.value = rtnValAry[1];//nod_cd
				//formObj.door_loc_nm.value = rtnValAry[2]+', '+rtnValAry[4];//loc_nm
				formObj.door_loc_nm.value=rtnValAry[2];//loc_nm
			}
		}else if(cur_curObj.id == "first"){		//Air Impost
			if(rtnValAry[0]==''){
				//formObj.first_port_cd.focus();
			}else{
				formObj.first_port_cd.value=rtnValAry[0];//loc_cd 
				//formObj.fnl_dest_nod_cd.value = rtnValAry[1];//nod_cd
				//formObj.first_port_nm.value = rtnValAry[2]+', '+rtnValAry[4];//loc_nm
				formObj.first_port_nm.value=rtnValAry[2];//loc_nm
			}
		}else if(cur_curObj.id == "dpt"){
			if(rtnValAry[0]==''){
				//formObj.pol_cd.focus();
			}else{
				formObj.pol_cd.value=rtnValAry[0];//loc_cd 
				//formObj.pol_nm.value  = rtnValAry[2]+', '+rtnValAry[4];//loc_nm
				formObj.pol_nm.value=rtnValAry[2];//loc_nm
			}
		}else if(cur_curObj.id == "ts1"){
			if(rtnValAry[0]==''){
				//formObj.ts1_port_cd.focus();
			}else{
				formObj.ts1_port_cd.value=rtnValAry[0];//loc_cd 
				formObj.ts1_flt_no.value="";//loc_nm
			}
		}else if(cur_curObj.id == "ts2"){
			if(rtnValAry[0]==''){
				//formObj.ts2_port_cd.focus();
			}else{
				formObj.ts2_port_cd.value=rtnValAry[0];//loc_cd 
				formObj.ts2_flt_no.value="";//loc_nm
			}
		}else if(cur_curObj.id == "ts3"){
			if(rtnValAry[0]==''){
				//formObj.ts3_port_cd.focus();
			}else{
				formObj.ts3_port_cd.value=rtnValAry[0];//loc_cd 
				formObj.ts3_flt_no.value="";//loc_nm
			}
		}else if(cur_curObj.id == "des" || cur_curObj.id == "air_des"){
			if(rtnValAry[0]==''){
				//formObj.pod_cd.focus();
			}else{
				formObj.pod_cd.value=rtnValAry[0];//loc_cd 
				//formObj.pod_nm.value  = rtnValAry[2]+', '+rtnValAry[4];//loc_nm
				formObj.pod_nm.value=rtnValAry[2];//loc_nm
			}
		}else if(cur_curObj.id == "wh"){
			if(rtnValAry[0]==''){
				//formObj.fnl_dest_loc_cd.focus();
			}else{
				formObj.fnl_dest_loc_cd.value=rtnValAry[0];//loc_cd 
				//formObj.pod_nm.value  = rtnValAry[2]+', '+rtnValAry[4];//loc_nm
				formObj.fnl_dest_loc_nm.value=rtnValAry[2];//loc_nm
			}
		}else if(cur_curObj.id == "iss"){
			formObj.iss_loc_cd.value=rtnValAry[0];//loc_cd
			formObj.iss_loc_nm.value=rtnValAry[2]+', '+rtnValAry[4];//loc_nm
		}else if(cur_curObj.id == "pay"){
			formObj.pay_loc_cd.value=rtnValAry[0];//loc_cd
			formObj.pay_loc_nm.value=rtnValAry[2]+', '+rtnValAry[4];//loc_nm
		}else if(cur_curObj.id == "fst"){	//Air Export, LHK, 20140416 #26294
			formObj.fst_to_cd.value=rtnValAry[0];//loc_cd 
			formObj.fst_to_nm.value=rtnValAry[2];//loc_nm
		}else if(cur_curObj.id == "ts_pol"){	// TransShipped Popup
			formObj.ts_pol_cd.value=rtnValAry[0];//loc_cd 
			formObj.ts_pol_nm.value=rtnValAry[2];//loc_nm
		}//OFVFOUR-8085: [Lever Logistics] OIH B/L - Custom Clerance Port/Date
		else if(cur_curObj.id == "cstms_clr_port") {
			formObj.cstms_clr_port_cd.value=rtnValAry[0];//loc_cd
			formObj.cstms_clr_port_nm.value=rtnValAry[2];//loc_nm
		}
	} 
}
function NODECODE_POPLIST(rtnVal){
	var formObj = document.frm1;
	if(rtnVal==""||rtnVal=="undefined"||rtnVal==undefined){
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		if(cur_curObj.id == "dpt"){
			frm1.pol_nod_cd.value=rtnValAry[1];//nod_cd
			frm1.pol_cd.value=rtnValAry[0];//loc_cd
			frm1.pol_nm.value=rtnValAry[2];//loc_nm
		}else if(cur_curObj.id == "des"){
			frm1.pod_nod_cd.value=rtnValAry[1];//nod_cd
			frm1.pod_cd.value=rtnValAry[0];//loc_cd
			frm1.pod_nm.value=rtnValAry[2];//loc_nm
		}else if(cur_curObj.id == "cfs"){
			frm1.cfs_loc_cd.value=rtnValAry[0];//loc_cd
			frm1.cfs_nod_cd.value=rtnValAry[1];//nod_cd
			frm1.cfs_loc_nm.value=rtnValAry[2];//loc_nm
		//항공 - TS1
		}else if(cur_curObj.id == "ts1"){
			if(rtnValAry[0]==''){
				//formObj.ts1_port_cd.focus();
			}else{
				formObj.ts1_port_cd.value=rtnValAry[1];//loc_cd 
			}
		//항공 - TS2
		}else if(cur_curObj.id == "ts2"){
			if(rtnValAry[0]==''){
				//formObj.ts2_port_cd.focus();
			}else{
				formObj.ts2_port_cd.value=rtnValAry[1];//loc_cd 
			}
		//항공 - TS3
		}else if(cur_curObj.id == "ts3"){
			if(rtnValAry[0]==''){
				//formObj.ts3_port_cd.focus();
			}else{
				formObj.ts3_port_cd.value=rtnValAry[1];//loc_cd 
			}
		}else if(cur_curObj.id == "wh"){
			if(rtnValAry[0]==''){
				//formObj.fnl_wh_cd.focus();
			}else{
				formObj.fnl_wh_cd.value=rtnValAry[1];//loc_cd 
				frm1.fnl_wh_nm.value=rtnValAry[2];//loc_nm
			}
		}
	} 
}
function USER_POPLIST(rtnVal){
	var formObj = document.frm1;
	 if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		 	return;
		}else{
			var rtnValAry=rtnVal.split("|");
			curObjId = cur_curObj.id;
			
			//20140616 LHK, OIH Released by 변경시 Sales Person 이 변경되는 bug 발견되어 수정함. 
			if(curObjId == "rlsd_by"){
				formObj.rlsd_usrid.value 	= rtnValAry[0];
				formObj.rlsd_usr_nm.value 	= rtnValAry[1];
				formObj.rlsd_dept_cd.value 	= rtnValAry[3];
			}//OFVFOUR-7976: [MATRIX] ADDING CS PIC ON ALL B/L ENTRY AND TRADE PARTNER ENTRY SCREEN
			else if (curObjId == "salesperson"){
				formObj.sls_usrid.value 	= rtnValAry[0];
				formObj.sls_usr_nm.value 	= rtnValAry[1];
				//2011.01.12 김진혁 추가, sls_dept_cd 값을 저장할 수 있도록 수정.
				formObj.sls_dept_cd.value 	= rtnValAry[3];
			}
			else {
				formObj.cs_usrid.value    	= rtnValAry[0];
				formObj.cs_usr_nm.value 	= rtnValAry[1];
			}
		}
}
function OPR_POPLIST(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.opr_usrid.value=rtnValAry[0];
		formObj.opr_usrnm.value=rtnValAry[1];
		formObj.opr_ofc_cd.value=rtnValAry[2];
		formObj.opr_dept_cd.value=rtnValAry[3];
	}
	//OFVFOUR-8159 [PQC][OIM B/L List] The popup didn't close after double click on the User
	if ( typeof setUserTeamInfo === 'function' ){
		//OFVFOUR-7814 [AIF] ADDING TEAM INFORMATION ON THE ALL ENTRY SCREEN
		ajaxSendPost(setUserTeamInfo, "reqVal", "&goWhere=aj&bcKey=searchCodeName&codeType=opr_team&issued_by="+formObj.opr_usrid.value, "./GateServlet.gsl");
	}
}

function ISS_POPLIST(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.iss_usrid.value=rtnValAry[0];
		//formObj.opr_usrnm.value=rtnValAry[1];
		//formObj.opr_ofc_cd.value=rtnValAry[2];
		//formObj.opr_dept_cd.value=rtnValAry[3];
	}
}
function ASGN_POPLIST(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.asgn_usrid.value=rtnValAry[0];
		//formObj.opr_usrnm.value=rtnValAry[1];
		//formObj.opr_ofc_cd.value=rtnValAry[2];
		//formObj.opr_dept_cd.value=rtnValAry[3];
	}
}

function VESSEL_POPLIST(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		if(cur_curObj.id == "trunkvessel"){
			formObj.trnk_vsl_cd.value=rtnValAry[0];
			formObj.trnk_vsl_nm.value=rtnValAry[1];
		}else if(cur_curObj.id == "prevesel"){
			formObj.pre_vsl_cd.value=rtnValAry[0];
			formObj.pre_vsl_nm.value=rtnValAry[1];
		}
		
		if(cur_airSeaTp=='S' &&cur_bndTp=='O' && cur_bizTp!='M'){
			cobChange();
		}else{
			cobChange_pol();
		}
		
	}
}
function OFFICE_GRID_POPLIST(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		if(cur_curObj.id == "ctrbOfc"){
			formObj.ctrb_ofc_cd.value=rtnValAry[0];
		}else{
			formObj.sls_ofc_cd.value=rtnValAry[0];
		}
	}
}
function BKNO_POPLIST(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
 		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		
		formObj.f_bkg_no.value = rtnValAry[0];//bkg_no
		formObj.f_bkg_seq.value = rtnValAry[1];//bkg_seq
		
		if(formObj.f_bkg_no.value !=""){
			doWork('SEARCHLIST');
        }
	}
}


function LNRBKNO_POPLIST(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
 		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		
		formObj.f_lnr_bkg_no.value = rtnValAry[0];//lnr_bkg_no
		formObj.f_bkg_no.value = rtnValAry[1];//bkg_no
		formObj.f_bkg_seq.value = rtnValAry[2];//bkg_seq
		
		if(formObj.f_bkg_seq.value !=""){
			doWork('SEARCHLIST');
        }
	}
}
function HBL_POPLIST(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
 		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_bl_no.value=rtnValAry[0];//house_bl_no
		formObj.intg_bl_seq.value=rtnValAry[2];//intg_bl_seq
		//formObj.f_bkg_no.value    = rtnValAry[3];//bkg_no
//		if(bndTp!='I'){
//			formObj.f_bkg_no.value = '';	
//		}
		if(formObj.f_bl_no.value !=""){				
			doWork('SEARCHLIST');
		}
	}
	
}

function MBL_POPLIST(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
 		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_bl_no.value=rtnValAry[0];//house_bl_no
		formObj.intg_bl_seq.value=rtnValAry[2];//intg_bl_seq
		if(formObj.f_bl_no.value!=''){
			doWork('SEARCHLIST');	
		}
		//formObj.f_bkg_no.value  = rtnValAry[3];//bkg_no
		//formObj.f_bkg_no.value = '';
	}
}
function SR_POPLIST(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
 		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_sr_no.value=rtnValAry[0];//sr_no
		if(formObj.f_sr_no.value!=''){
			doWork('SEARCHLIST');	
		}
	}
}
function WORKFLOW_POPLIST(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.jb_tmplt_seq.value=rtnValAry[0];
		formObj.jb_tmplt_nm.value=rtnValAry[1];
	}
}
function STATE_POPLIST(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
	 	return;
	}else{
		var rtnValAry=rtnVal.split("|");
		if(formObj.state_cd != null && formObj.state_cd != ""){
			formObj.state_cd.value=rtnValAry[0];//cd_val
			formObj.state_nm.value=rtnValAry[2];//cd_nm
		}
		if(formObj.ib_org_ste_cd != null && formObj.ib_org_ste_cd != ""){
			formObj.ib_org_ste_cd.value=rtnValAry[0];//cd_val
			formObj.ib_org_ste_nm.value=rtnValAry[2] + ' ('+ rtnValAry[4]+')'; 
		}
		try{
			formObj.state_cnt_cd.value=rtnValAry[4];//state_cnt_cd
		} catch(e){}
	}
}
function REF_POPLIST(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
 		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_ref_no.value=rtnValAry[2];//ref_no
		//formObj.f_bl_no.value = '';//house_bl_no
		//formObj.f_sr_no.value = '';
		if(formObj.f_ref_no.value!=''){
			doWork('SEARCHLIST');	
		}
	}
}
function AES_HBL_POPLIST(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
 		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_bl_no.value=rtnValAry[0];//house_bl_no
		if(formObj.f_bl_no.value !=""){				
			doWork('SEARCHLIST');
		}
	}
}
function srOpenPopUp_MBL_POPLIST(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
 		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_bl_no.value=rtnValAry[0];//house_bl_no
		//formObj.f_sr_no.value = '';
		if(formObj.f_bl_no.value!=''){
			doWork('SEARCHLIST');	
		}
	}
}
function srOpenPopUp_SR_POPLIST(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
 		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_sr_no.value=rtnValAry[0];//sr_no
		formObj.f_bl_no.value='';
		if(formObj.f_sr_no.value!=''){
			doWork('SEARCHLIST');	
		}
	}
}
function srOpenPopUp_REF_POPLIST(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
 		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_ref_no.value=rtnValAry[2];//ref_no
		//formObj.f_bl_no.value = '';//house_bl_no
		//formObj.f_sr_no.value = '';
		if(formObj.f_ref_no.value!=''){
			doWork('SEARCHLIST');	
		}
	}
}
function srOpenPopUp_REF_POPLIST1(rtnVal){
	var formObj = document.frm1;
	//alert(rtnVal);
   	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
 		return;
	}else{
		var opt_key_sec = "HBL_DOCNO_SYNC";
	    ajaxSendPost(setHblDocnoSyncReq, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key_sec, "./GateServlet.gsl");
	    
	    var opt_key_sec = "BL_PARTNER_ASSIGNMENT";
	    ajaxSendPost(setBlPartnerAssignReq, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key_sec, "./GateServlet.gsl");
	    
		//LHK, 20140318, #26727 [BINEX][BINEX]BL Copy vs Filing# Assign, Partner 가 있는 경우 정보 유지.
		var cfmFlg=true;
		if(formObj.prnr_trdp_cd.value != ""){
			cfmFlg=confirm(getLabel('SEA_COM_ALT030'));
		}
		var rtnValAry=rtnVal.split("|");
		formObj.ref_no.value=rtnValAry[2];//ref_no
		formObj.ref_ofc_cd.value=rtnValAry[3];//ref_ofc_cd
		//#3604 [JTC]OEH B/L Type 별 Original B/L 수 세팅 문제
		frm1.iss_loc_nm1.value=rtnValAry[115];
		
		formObj.rlt_intg_bl_seq.value=rtnValAry[1];//intg_bl_seq
		//Master B/L 팝업에서 ref no를 선택했을 때 가져와서 매핑하는 정보 
		formObj.mbl_no.value=rtnValAry[0];//master bl no
		formObj.trnk_vsl_nm.value=rtnValAry[4]; //trnk_vsl_nm
		formObj.trnk_voy.value=rtnValAry[5]; //trnk_voy
		formObj.lnr_trdp_cd.value=rtnValAry[6]; //lnr_trdp_cd
		formObj.lnr_trdp_nm.value=rtnValAry[7]; //lnr_trdp_nm

		formObj.prnr_ref_no.value=rtnValAry[91]; //lnr_trdp_nm
		
		//#3171 [CLT] OEH BL - Mark탭의 Carrier 정보 연계
		formObj.carr_trdp_cd1.value=rtnValAry[6]; //lnr_trdp_cd
		formObj.carr_trdp_nm1.value=rtnValAry[7]; //lnr_trdp_nm
		
		
		//#3700 [JAPT]OEM-OEH SYNC 로직 수정 (S)
		//POR, DEL, Final Destination 복사 허용 여부 판단		
		if(OEH_OEM_SYNC_ROUTE_YN == 'Y') {
			//#3811 [JAPT] POR,DEL,F.DEST & Sales PIC sync.
			if(formObj.pod_cd.value ==""){
				formObj.pod_cd.value=rtnValAry[8]; //pod_cd
				formObj.pod_nm.value=rtnValAry[9]; //pod_nm
			}
			if(formObj.pol_cd.value ==""){
				formObj.pol_cd.value=rtnValAry[10]; //pol_cd
				formObj.pol_nm.value=rtnValAry[11]; //pol_nm
			}

			if(formObj.por_cd.value ==""){
				formObj.por_cd.value=rtnValAry[15]; //por_cd
				formObj.por_nm.value=rtnValAry[16]; //por_nm
			}
			if(formObj.del_cd.value ==""){
				formObj.del_cd.value=rtnValAry[17]; //del_cd
				formObj.del_nm.value=rtnValAry[18];	//del_nm 		
			}
		}else{
			formObj.pod_cd.value=rtnValAry[8]; //pod_cd
			formObj.pod_nm.value=rtnValAry[9]; //pod_nm		
			formObj.pol_cd.value=rtnValAry[10]; //pol_cd
			formObj.pol_nm.value=rtnValAry[11]; //pol_nm		
			
			formObj.por_cd.value=rtnValAry[15]; //por_cd
			formObj.por_nm.value=rtnValAry[16]; //por_nm
			formObj.del_cd.value=rtnValAry[17]; //del_cd
			formObj.del_nm.value=rtnValAry[18];	//del_nm 			
		}
			
		
		
		formObj.obrd_dt_tm.value=modiStrDateType(rtnValAry[12], 1); //obrd_dt_tm
		formObj.etd_dt_tm.value=modiStrDateType(rtnValAry[12], 1); //etd_dt_tm
		formObj.post_dt.value=modiStrDateType(rtnValAry[51], 1); //etd_dt_tm
		formObj.eta_dt_tm.value=modiStrDateType(rtnValAry[13], 1); //eta_dt_tm
		formObj.lnr_bkg_no.value=rtnValAry[14]; //lnr_bkg_no
		//---------[20130405 OJG]---------------------
		//formObj.doc_recpt_no.value = formObj.lnr_bkg_no.value;	
		//---------[20130405 OJG]---------------------
		//---------[20130405 OJG]---------------------
		
		// #51924 [ZEN] OEH BL ENTRY에서 DOCUMENT NO. 로직
		if(HBL_DOCNO_SYNC == "M"){
			formObj.doc_recpt_no.value=formObj.mbl_no.value;	
		}else{
			formObj.doc_recpt_no.value=formObj.ref_no.value;	
		}
		

		formObj.shp_mod_cd.value=rtnValAry[19];
//		if(user_ofc_cnt_cd=="US" || user_ofc_cnt_cd=="JP"){
			//Ocean Export
			//LHK, 20140318, #26727 [BINEX][BINEX]BL Copy vs Filing# Assign, Partner 가 있는 경우 정보 유지.
			if(cfmFlg){
				formObj.prnr_trdp_cd.value=rtnValAry[20];
				formObj.prnr_trdp_nm.value=rtnValAry[21];
				formObj.prnr_trdp_addr.value=rtnValAry[32];
			}
//		}
		// #141 #49037 - Triangle Agent Ajax, Popup 동기화 안되어 있는 부분 수정
//		formObj.prnr_trdp_cd2.value=rtnValAry[22];
//		formObj.prnr_trdp_nm2.value=rtnValAry[23];
//		formObj.prnr_trdp_addr2.value=rtnValAry[33];
		formObj.fm_svc_term_cd.value=rtnValAry[49];
		formObj.to_svc_term_cd.value=rtnValAry[50];
		formObj.mrn_no.value=rtnValAry[53]; //mrn_no
		
		/* #1757-[CLC] Freight Term Interface Logic - OEH B/L Entry */
		if( rtnValAry[70] != "" ){
			formObj.frt_term_a_cd.value=rtnValAry[70]; //frt_term_cd
		}
		
		/* jsjang 2013.7.10 요구사항 #16112 (DIRECT B/L 인 경우 HBL 에 MBL 정보 COPY)  자동연계요건 Start */  
		if(rtnValAry[52] != null && rtnValAry[52] != '' && (rtnValAry[52] == 'DR' || rtnValAry[52] == 'FW' || rtnValAry[52] == 'DT'))
		{
			formObj.hbl_tp_cd.value=rtnValAry[52]; //hbl_tp_cd
			formObj.ntfy_trdp_cd.value=rtnValAry[54]; //ntfy_trdp_cd
			formObj.ntfy_trdp_nm.value=rtnValAry[55]; //ntfy_trdp_nm
			formObj.ntfy_trdp_addr.value=rtnValAry[56]; //ntfy_trdp_addr
			
			//#3700 [JAPT]OEM-OEH SYNC 로직 수정 (S)
			//POR, DEL, Final Destination 복사 허용 여부 판단
			if(OEH_OEM_SYNC_ROUTE_YN == 'Y') {
				//#3811 [JAPT] POR,DEL,F.DEST & Sales PIC sync.		
				if(formObj.fnl_dest_loc_cd.value ==""){
					formObj.fnl_dest_loc_cd.value=rtnValAry[57]; //fnl_dest_loc_cd
					formObj.fnl_dest_loc_nm.value=rtnValAry[58]; //fnl_dest_loc_nm
				}	
			}else{
				formObj.fnl_dest_loc_cd.value=rtnValAry[57]; //fnl_dest_loc_cd
				formObj.fnl_dest_loc_nm.value=rtnValAry[58]; //fnl_dest_loc_nm				
			}
			//#3700 [JAPT]OEM-OEH SYNC 로직 수정 (E)
						
			formObj.profit_share.value=rtnValAry[59]; //profit_share
			
			// #1264 - [Split - 1] [CLC] LCL HB/L 에 Filing No 변경 시  Measurement/Package정보 유지
			if(!(frm1.intg_bl_seq.value == "" && frm1.bkg_seq.value != "")){
				formObj.pck_qty.value=rtnValAry[60]; //pck_qty
				formObj.pck_ut_cd.value=rtnValAry[61]; //pck_ut_cd
				formObj.grs_wgt.value=rtnValAry[62]; //grs_wgt
				formObj.grs_wgt1.value=rtnValAry[63]; //grs_wgt1
				formObj.meas.value=rtnValAry[64]; //meas
				formObj.meas1.value=rtnValAry[65]; //meas1
			}
			
			formObj.bl_iss_dt.value=rtnValAry[66]; //bl_iss_dt
			formObj.shpr_trdp_cd.value=rtnValAry[34]; //shpr_trdp_cd
			formObj.shpr_trdp_nm.value=rtnValAry[35]; //shpr_trdp_nm
			formObj.shpr_trdp_addr.value=rtnValAry[36]; //shpr_trdp_addr
			formObj.cnee_trdp_cd.value=rtnValAry[20]; //cnee_trdp_cd
			formObj.cnee_trdp_nm.value=rtnValAry[21]; //cnee_trdp_nm
			formObj.cnee_trdp_addr.value=rtnValAry[32]; //cnee_trdp_addr
			//LHK, 20140318, #26727 [BINEX][BINEX]BL Copy vs Filing# Assign, Partner 가 있는 경우 정보 유지.
			if(cfmFlg){
				formObj.prnr_trdp_cd.value=rtnValAry[67]; //prnr_trdp_cd
				formObj.prnr_trdp_nm.value=rtnValAry[68]; //prnr_trdp_nm
				formObj.prnr_trdp_addr.value=rtnValAry[69]; //prnr_trdp_addr		
			}
		}
		
		/*#991 - [SHINE] MB/L -> HB/L 데이터 연계 로직 추가 2017.01.19
		1) OEH B/L 의 Partner 필드 
		 B/L Type이 Direct , Direct Triangle 인 경우 OEM B/L.Destination Agent_Code를 Partner로 지정
		 B/L Type이 이외의 경우 OEM B/L.Consignee_Code를 Partner로 지정 

		2) OEH B/L 의 Forwarding Agent 필드 
		 B/L Type이 Direct , Direct Triangle 인 경우 OEM B/L.Forwarding Agent_Code를 Forwarding Agent로 지정
		 B/L Type이 이외의 경우 OEM B/L.Shipper_Code를 Forwarding Agent로 지정 

		3) OEH B/L 의 Triangle Agent 필드 
		 B/L Type이 Direct , Direct Triangle 인 경우  OEM.Triangle Agent_Code를 Triangle Agent로 지정*/
		
		if(BL_PARTNER_ASSIGNMENT == "Y"){
			if(rtnValAry[52] != null && rtnValAry[52] != '' && (rtnValAry[52] == 'DR' || rtnValAry[52] == 'FW' || rtnValAry[52] == 'DT')){
				if(cfmFlg){
					formObj.prnr_trdp_cd.value=rtnValAry[67]; //prnr_trdp_cd
					formObj.prnr_trdp_nm.value=rtnValAry[68]; //prnr_trdp_nm
					formObj.prnr_trdp_addr.value=rtnValAry[69]; //prnr_trdp_addr	
				}
				
				formObj.agent_trdp_cd.value=rtnValAry[105]; //agent_trdp_cd
				formObj.agent_trdp_nm.value=rtnValAry[106]; //agent_trdp_nm
				formObj.agent_trdp_addr.value=rtnValAry[107]; //agent_trdp_addr	
				
				formObj.prnr_trdp_cd2.value=rtnValAry[22]; //prnr_trdp_cd2
				formObj.prnr_trdp_nm2.value=rtnValAry[23]; //prnr_trdp_nm2
				formObj.prnr_trdp_addr2.value=rtnValAry[33]; //prnr_trdp_addr2	
				
			} else {
				if(cfmFlg){
					formObj.prnr_trdp_cd.value=rtnValAry[20]; //cnee_trdp_cd
					formObj.prnr_trdp_nm.value=rtnValAry[21]; //cnee_trdp_nm
					formObj.prnr_trdp_addr.value=rtnValAry[32]; //cnee_trdp_addr
				}
				
				formObj.agent_trdp_cd.value=rtnValAry[34]; //shpr_trdp_cd
				formObj.agent_trdp_nm.value=rtnValAry[35]; //shpr_trdp_nm
				formObj.agent_trdp_addr.value=rtnValAry[36]; //shpr_trdp_addr
			}
		}
		
		//#22 #52882 - [CBM] MBL PACKAGE UNIT INFO TO COPY TO HOUSE
		if(rtnValAry[19] == "FCL" || (rtnValAry[52] == 'DR' || rtnValAry[52] == 'FW' || rtnValAry[52] == 'DT' )){
			
			// #1264 - [Split - 1] [CLC] LCL HB/L 에 Filing No 변경 시  Measurement/Package정보 유지
			if(!(frm1.intg_bl_seq.value == "" && frm1.bkg_seq.value != "")){
				frm1.pck_qty.value=rtnValAry[60];
				frm1.pck_ut_cd.value=rtnValAry[61];
				frm1.mk_grs_wgt.value=doMoneyFmt(Number(rtnValAry[62]).toFixed(obl_decimal_len));
				frm1.mk_grs_wgt1.value=doMoneyFmt(Number(rtnValAry[63]).toFixed(obl_decimal_len));
				frm1.mk_meas.value=doMoneyFmt(Number(rtnValAry[64]).toFixed(obl_decimal_len));
				frm1.mk_meas1.value=doMoneyFmt(Number(rtnValAry[65]).toFixed(obl_decimal_len));
				
				frm1.grs_wgt.value=doMoneyFmt(Number(rtnValAry[62]).toFixed(obl_decimal_len)); //grs_wgt
				frm1.grs_wgt1.value=doMoneyFmt(Number(rtnValAry[63]).toFixed(obl_decimal_len)); //grs_wgt1
				frm1.meas.value=doMoneyFmt(Number(rtnValAry[64]).toFixed(obl_decimal_len)); //meas
				frm1.meas1.value=doMoneyFmt(Number(rtnValAry[65]).toFixed(obl_decimal_len)); //meas1
			}
		}
		
		/* jsjang 2013.7.10 요구사항 #16112 (DIRECT B/L 인 경우 HBL 에 MBL 정보 COPY)  자동연계요건 End */  					
		// LHK, 20140402, #26727 : Sync 로직에 ETD of POR 도 추가 , LHK, 20140403, 다시 자동연계 안되도록 요청하심. 
		//formObj.etd_por_tm.value		= modiStrDateType(rtnValAry[96], 1);  //etd_por_tm
		cobChange();
		shipModeChange();
		//26239 cntr sheet를 초기화한다.
		getRefCntrList();
		//getMasterCntrList();//[20130822 OJG]
		
		// #571 - [BINEX Visibility Task]PO, BKG, MBL 입력 간소화
		getRefItemList();
		
		if(formObj.f_bl_no.value!=''){
			//doWork('SEARCHLIST');	
		}
		
		// Contribution Margin 조회
		if(typeof(formObj.act_shpr_trdp_cd) != "undefined"){
			if (formObj.act_shpr_trdp_cd.value != ""){
				setCtrbMgn(formObj.act_shpr_trdp_cd.value);
			}
		}
	}
   	//#2168 [BNX] Sales PIC based on Sales type does not simultaneously update
   	changeSalesType();
	//OFVFOUR-7976: [MATRIX] ADDING CS PIC ON ALL B/L ENTRY AND TRADE PARTNER ENTRY SCREEN
	changeCSType();
}
function srOpenPopUp_REF_POPLIST2(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
 		return;
	}else{
		
		var opt_key_sec = "BL_PARTNER_ASSIGNMENT";
	    ajaxSendPost(setBlPartnerAssignReq, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key_sec, "./GateServlet.gsl");
	    
		//LHK, 20140318, #26727 [BINEX][BINEX]BL Copy vs Filing# Assign, Partner 가 있는 경우 정보 유지.
		var cfmFlg=true;
		if(formObj.prnr_trdp_cd.value != ""){
			cfmFlg=confirm(getLabel('SEA_COM_ALT030'));
		}
		var rtnValAry=rtnVal.split("|");
		formObj.ref_no.value=rtnValAry[2];//ref_no
		formObj.ref_ofc_cd.value=rtnValAry[3];//ref_ofc_cd
		formObj.rlt_intg_bl_seq.value=rtnValAry[1];//intg_bl_seq
		//Master B/L 팝업에서 ref no를 선택했을 때 가져와서 매핑하는 정보 
		formObj.mbl_no.value=rtnValAry[0];//master bl no
		formObj.trnk_vsl_nm.value=rtnValAry[4]; //trnk_vsl_nm
		formObj.trnk_voy.value=rtnValAry[5]; //trnk_voy
		formObj.lnr_trdp_cd.value=rtnValAry[6]; //lnr_trdp_cd
		formObj.lnr_trdp_nm.value=rtnValAry[7]; //lnr_trdp_nm
		frm1.sls_usrid.value = rtnValAry[116]; //sls_usrid
		frm1.sls_usr_nm.value = rtnValAry[48]; //sls_usr_nm
		//OFVFOUR-7976: [MATRIX] ADDING CS PIC ON ALL B/L ENTRY AND TRADE PARTNER ENTRY SCREEN
		frm1.cs_usrid.value = rtnValAry[117]; //cs_usrid
		frm1.cs_usr_nm.value = rtnValAry[118]; //cs_usr_nm
		if(OIH_OIM_SYNC_ROUTE_YN == "Y"){
			if(formObj.pod_cd.value == ""){
				formObj.pod_cd.value=rtnValAry[8]; //pod_cd
				formObj.pod_nm.value=rtnValAry[9]; //pod_nm
			}
			if(formObj.pol_cd.value == ""){
				formObj.pol_cd.value=rtnValAry[10]; //pol_cd
				formObj.pol_nm.value=rtnValAry[11]; //pol_nm
			}
			if(formObj.por_cd.value ==""){
				formObj.por_cd.value=rtnValAry[15]; //por_cd
				formObj.por_nm.value=rtnValAry[16]; //por_nm
			}
			if(formObj.del_cd.value ==""){
				formObj.del_cd.value=rtnValAry[17]; //del_cd
				formObj.del_nm.value=rtnValAry[18];	//del_nm 		
			}
		}else{
			formObj.pod_cd.value=rtnValAry[8]; //pod_cd
			formObj.pod_nm.value=rtnValAry[9]; //pod_nm
			formObj.pol_cd.value=rtnValAry[10]; //pol_cd
			formObj.pol_nm.value=rtnValAry[11]; //pol_nm
			
			formObj.por_cd.value=rtnValAry[15]; //por_cd
			formObj.por_nm.value=rtnValAry[16]; //por_nm
			formObj.del_cd.value=rtnValAry[17]; //del_cd
			formObj.del_nm.value=rtnValAry[18];	//del_nm 	
		}
		
		formObj.etd_dt_tm.value=modiStrDateType(rtnValAry[12], 1); //etd_dt_tm
		formObj.eta_dt_tm.value=modiStrDateType(rtnValAry[13], 1); //eta_dt_tm
		formObj.post_dt.value=modiStrDateType(rtnValAry[51], 1); //eta_dt_tm
		// Ocean Import
		formObj.it_no.value=rtnValAry[26]; //it_no
		formObj.te_dt_tm.value=modiStrDateType(rtnValAry[27], 1); //te_dt_tm
		formObj.it_loc.value=rtnValAry[28]; //it_loc
		//LHK, 20140318, #26727 [BINEX][BINEX]BL Copy vs Filing# Assign, Partner 가 있는 경우 정보 유지.
		if(cfmFlg){
			formObj.prnr_trdp_cd.value=rtnValAry[34];
			formObj.prnr_trdp_nm.value=rtnValAry[35];
			formObj.prnr_trdp_addr.value=rtnValAry[36];
		}
		formObj.sub_bl_no.value=rtnValAry[37];
		formObj.fm_svc_term_cd.value=rtnValAry[49];
		formObj.to_svc_term_cd.value=rtnValAry[50];
		formObj.shp_mod_cd.value=rtnValAry[19]; //LHK 20130814
		if(rtnValAry[29]==''){
			formObj.cfs_trdp_cd.value=rtnValAry[38]; //cy_trdp_cd
			formObj.cfs_trdp_nm.value=rtnValAry[39]; //cy_trdp_nm
		}else{
			formObj.cfs_trdp_cd.value=rtnValAry[29]; //cfs_trdp_cd
			formObj.cfs_trdp_nm.value=rtnValAry[30]; //cfs_trdp_nm
		}
		if(rtnValAry[48]!=''){
			formObj.d_eta_dt_tm.value=modiStrDateType(rtnValAry[48], 1);
			formObj.f_eta_dt_tm.value=modiStrDateType(rtnValAry[48], 1);
			formObj.post_dt.value=modiStrDateType(rtnValAry[51], 1);
		}
		formObj.mrn_no.value=rtnValAry[53]; //mrn_no
		
		
		/* jsjang 2013.7.10 요구사항 #16112 (DIRECT B/L 인 경우 HBL 에 MBL 정보 COPY)  자동연계요건 Start */  
		if(rtnValAry[52] != null && rtnValAry[52] != '' && (rtnValAry[52] == 'DR' || rtnValAry[52] == 'FW' || rtnValAry[52] == 'DT'))
		{
			formObj.hbl_tp_cd.value=rtnValAry[52]; //hbl_tp_cd
			formObj.ntfy_trdp_cd.value=rtnValAry[54]; //ntfy_trdp_cd
			formObj.ntfy_trdp_nm.value=rtnValAry[55]; //ntfy_trdp_nm
			formObj.ntfy_trdp_addr.value=rtnValAry[56]; //ntfy_trdp_addr
			//#4913 [JAPT]Import Master/House BL data sync
			if(OEH_OEM_SYNC_ROUTE_YN == 'Y') {
				if(formObj.fnl_dest_loc_cd.value == ""){
					formObj.fnl_dest_loc_cd.value=rtnValAry[57]; //fnl_dest_loc_cd
					formObj.fnl_dest_loc_nm.value=rtnValAry[58]; //fnl_dest_loc_nm
				}	
			}else{
				formObj.fnl_dest_loc_cd.value=rtnValAry[57]; //fnl_dest_loc_cd
				formObj.fnl_dest_loc_nm.value=rtnValAry[58]; //fnl_dest_loc_nm				
			}
			formObj.profit_share.value=rtnValAry[59]; //profit_share
			formObj.pck_qty.value=rtnValAry[60]; //pck_qty
			formObj.pck_ut_cd.value=rtnValAry[61]; //pck_ut_cd
			formObj.grs_wgt.value=doMoneyFmt(Number(rtnValAry[62]).toFixed(obl_decimal_len));  //grs_wgt
			formObj.grs_wgt1.value=doMoneyFmt(Number(rtnValAry[63]).toFixed(obl_decimal_len)); //grs_wgt1
			formObj.meas.value=doMoneyFmt(Number(rtnValAry[64]).toFixed(obl_decimal_len)); //meas
			formObj.meas1.value=doMoneyFmt(Number(rtnValAry[65]).toFixed(obl_decimal_len)); //meas1
			formObj.bl_iss_dt.value=rtnValAry[66]; //bl_iss_dt
			formObj.shpr_trdp_cd.value=rtnValAry[34]; //shpr_trdp_cd
			formObj.shpr_trdp_nm.value=rtnValAry[35]; //shpr_trdp_nm
			formObj.shpr_trdp_addr.value=rtnValAry[36]; //shpr_trdp_addr
			formObj.cnee_trdp_cd.value=rtnValAry[20]; //cnee_trdp_cd
			formObj.cnee_trdp_nm.value=rtnValAry[21]; //cnee_trdp_nm
			formObj.cnee_trdp_addr.value=rtnValAry[32]; //cnee_trdp_addr
			//LHK, 20140318, #26727 [BINEX][BINEX]BL Copy vs Filing# Assign, Partner 가 있는 경우 정보 유지.
			if(cfmFlg){
				formObj.prnr_trdp_cd.value=rtnValAry[67]; //prnr_trdp_cd
				formObj.prnr_trdp_nm.value=rtnValAry[68]; //prnr_trdp_nm
				formObj.prnr_trdp_addr.value=rtnValAry[69]; //prnr_trdp_addr	
			}
			formObj.frt_term_cd.value=rtnValAry[70];//freight, bl.FRT_TERM_CD
			formObj.shp_mod_cd.value=rtnValAry[19];//ship mode, bl.shp_mod_cd
			formObj.express_tp_cd.value=rtnValAry[71];//express B/L, bl.express_tp_cd
			//frm1.rlsd_flg.value 			= result[77];//released, bl.rlsd_flg
			if(rtnValAry[72]=="Y"){
				formObj.rlsd_flg.checked=true;
			}else{
				formObj.rlsd_flg.checked=false;
			}				
			formObj.rlsd_dt_tm.value=rtnValAry[73];//released date, bl.						
		}
		/* jsjang 2013.7.10 요구사항 #16112 (DIRECT B/L 인 경우 HBL 에 MBL 정보 COPY)  자동연계요건 End */  	
		//formObj.pre_ccn_no.value=rtnValAry[93]; //oyh #24620 ccn 
		//formObj.mnf_fr_loc.value=rtnValAry[94]; //oyh #24620 ccn 
		//formObj.mnf_to_loc.value=rtnValAry[95]; //oyh #24620 ccn 
		
		//#823 [BINEX TOR] CCN, MANIFESET FROM, TO/A INFO NOT SHOWING ON HBL ENTRY
		if(formObj.shp_mod_cd.value == "FCL" || formObj.shp_mod_cd.value == "FAK"){
			formObj.pre_ccn_no.value=rtnValAry[93]; 
			formObj.mnf_fr_loc.value=rtnValAry[94]; 
			formObj.mnf_to_loc.value=rtnValAry[95]; 
		} else {
			formObj.pre_ccn_no.value=""; 
			formObj.mnf_fr_loc.value=""; 
			formObj.mnf_to_loc.value=""; 
		}	
		
		//#3188 [GENESIS] HBL GROSS WEIGHT NOT UPDATING
		//#22 #52882 - [CBM] MBL PACKAGE UNIT INFO TO COPY TO HOUSE
		formObj.pck_qty.value=rtnValAry[60];
		formObj.pck_ut_cd.value=rtnValAry[61];
		
		//#3188 [GENESIS] HBL GROSS WEIGHT NOT UPDATING
		formObj.grs_wgt.value=doMoneyFmt(Number(rtnValAry[62]).toFixed(obl_decimal_len)); //grs_wgt
		formObj.grs_wgt1.value=doMoneyFmt(Number(rtnValAry[63]).toFixed(obl_decimal_len)); //grs_wgt1
		formObj.meas.value=doMoneyFmt(Number(rtnValAry[64]).toFixed(obl_decimal_len)); //meas
		formObj.meas1.value=doMoneyFmt(Number(rtnValAry[65]).toFixed(obl_decimal_len)); //meas1
		
//			#1101 [Oceanland, Impex] V440 OE MBL Logic 변경 – Mark and Description
		//#1335 [CARGOZONE] DESCRIPTION IS NOT COPIED WHEN COPYING THE OIH B/L
		if(formObj.mk_txt.value == ""){
			formObj.mk_txt.value=rtnValAry[113];
		}
		if(formObj.desc_txt.value == ""){
			formObj.desc_txt.value=rtnValAry[114];
		}
		
		
		
		/*#991 - [SHINE] MB/L -> HB/L 데이터 연계 로직 추가 2017.01.19
		2) OIH B/L 의 Forwarding Agent필드 
		 B/L Type이 Direct , Direct Triangle 인 경우 OIM B/L.Forwarding Agent_Code를 Forwarding Agent로 지정
		 B/L Type이 이외의 경우 OIM B/L.Shipper_Code를 Forwarding Agent로 지정*/
		
		if(BL_PARTNER_ASSIGNMENT == "Y"){
			if(rtnValAry[52] != null && rtnValAry[52] != '' && (rtnValAry[52] == 'DR' || rtnValAry[52] == 'FW' || rtnValAry[52] == 'DT' )){
				formObj.agent_trdp_cd.value=rtnValAry[105]; //agent_trdp_cd
				formObj.agent_trdp_nm.value=rtnValAry[106]; //agent_trdp_nm
				formObj.agent_trdp_addr.value=rtnValAry[107]; //agent_trdp_addr
			} else {
				
				if(cfmFlg){
					formObj.prnr_trdp_cd.value=rtnValAry[34];
					formObj.prnr_trdp_nm.value=rtnValAry[35];
					formObj.prnr_trdp_addr.value=rtnValAry[36];
				}
				
				formObj.agent_trdp_cd.value=rtnValAry[34]; //shpr_trdp_cd
				formObj.agent_trdp_nm.value=rtnValAry[35]; //shpr_trdp_nm
				formObj.agent_trdp_addr.value=rtnValAry[36]; //shpr_trdp_addr
			}
		}
		
		//26239 cntr sheet를 초기화한다.
		getRefCntrList();
		//getMasterCntrList();//[20130822 OJG]
		if(formObj.f_bl_no.value!=''){
			//doWork('SEARCHLIST');	
		}
		
		// Contribution Margin 조회
		if(typeof(formObj.act_shpr_trdp_cd) != "undefined"){
			if (formObj.act_shpr_trdp_cd.value != ""){
				setCtrbMgn(formObj.act_shpr_trdp_cd.value);
			}
		}
	}
	//#2168 [BNX] Sales PIC based on Sales type does not simultaneously update
   	changeSalesType();
	//OFVFOUR-7976: [MATRIX] ADDING CS PIC ON ALL B/L ENTRY AND TRADE PARTNER ENTRY SCREEN
	changeCSType();
}

/**
 * OEH 화면에서 Filling No를 팝업으로 선택했을 경우 실행하는 함수
 * #4781 건에 의해 함수 생성
 * 2018.08.28 CJH
 * @param rtnVal
 */
function srOpenPopUp_REF_POPLIST3(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
 		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.ref_no.value=rtnValAry[2];//ref_no
		
		if(formObj.ref_no.value!=""){		        	
			checkRefNo(formObj.ref_no);
		 }
	}
}
function srOpenPopUp_BKNO_POPLIST(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
 		return;
	}else{
		var rtnValAry = rtnVal.split("|");
		
		formObj.bkg_no.value = rtnValAry[0];//bkg_no
		formObj.f_bkg_no.value = rtnValAry[0];//bkg_no
		formObj.bkg_seq.value = rtnValAry[1];//bkg_seq
		formObj.bkg_dt_tm.value = modiStrDateType(rtnValAry[2], 1);//bkg_dt_tm
		formObj.lc_no.value = rtnValAry[3];//lc_no
		formObj.act_shpr_trdp_cd.value = rtnValAry[4]; //act_shpr_trdp_cd
		formObj.act_shpr_trdp_nm.value = rtnValAry[5]; //act_shpr_trdp_nm
		formObj.exp_ref_no.value = rtnValAry[15]; //exp_ref_no
		formObj.cgo_pu_trdp_cd.value = rtnValAry[16]; //cgo_pu_trdp_cd
		formObj.cgo_pu_trdp_nm.value = rtnValAry[17]; //cgo_pu_trdp_nm
		formObj.cgo_pu_trdp_addr.value = rtnValAry[18]; //cgo_pu_trdp_addr
		formObj.trk_trdp_cd.value = rtnValAry[19]; //trk_trdp_cd
		formObj.trk_trdp_nm.value = rtnValAry[20]; //trk_trdp_nm
		formObj.cust_ref_no.value = rtnValAry[21]; //cust_ref_no
		formObj.cntr_info.value = rtnValAry[22]; //cntr_info
		formObj.por_cd.value = rtnValAry[23]; //por_cd
		formObj.por_nm.value = rtnValAry[24]; //por_nm
		formObj.del_cd.value = rtnValAry[25]; //del_cd
		formObj.del_nm.value = rtnValAry[26]; //del_nm
		formObj.etd_por_tm.value = modiStrDateType(rtnValAry[29], 1);//etd_por_tm
		formObj.shp_mod_cd.value = rtnValAry[30]; //shp_mod_cd
		formObj.rep_cmdt_cd.value = rtnValAry[31]; //rep_cmdt_cd
		formObj.rep_cmdt_nm.value = rtnValAry[32]; //rep_cmdt_nm
		formObj.fm_svc_term_cd.value = rtnValAry[40]; //fm_svc_term_cd
		formObj.to_svc_term_cd.value = rtnValAry[41]; //to_svc_term_cd
		formObj.cargo_tp_cd.value = rtnValAry[42]; //cargo_tp_cd
		formObj.wh_cut_off_dt.value = modiStrDateType(rtnValAry[43], 1);//wh_cut_off_dt
		formObj.wh_cut_off_tm.value = rtnValAry[44].length == 4 ? (rtnValAry[44].substring(0,2) + ":" + rtnValAry[44].substring(2,4)) : ""; //wh_cut_off_tm
		formObj.sls_ofc_cd.value = rtnValAry[45]; //sls_ofc_cd
		formObj.sls_dept_cd.value = rtnValAry[46]; //sls_dept_cd
		formObj.sls_usrid.value = rtnValAry[47]; //sls_usrid
		formObj.sls_usr_nm.value = rtnValAry[48]; //sls_usr_nm

		//if (formObj.hbl_tp_cd.value != "DR") {
		if (!(formObj.hbl_tp_cd.value == "DR" || formObj.hbl_tp_cd.value == "FW" || formObj.hbl_tp_cd.value == "DT")) {	
			formObj.shpr_trdp_cd.value = rtnValAry[6]; //shpr_trdp_cd
			formObj.shpr_trdp_nm.value = rtnValAry[7]; //shpr_trdp_nm
			formObj.shpr_trdp_addr.value = rtnValAry[8]; //shpr_trdp_addr
			formObj.cnee_trdp_cd.value = rtnValAry[9]; //cnee_trdp_cd
			formObj.cnee_trdp_nm.value = rtnValAry[10]; //cnee_trdp_nm
			formObj.cnee_trdp_addr.value = rtnValAry[11]; //cnee_trdp_addr
			formObj.ntfy_trdp_cd.value = rtnValAry[12]; //ntfy_trdp_cd
			formObj.ntfy_trdp_nm.value = rtnValAry[13]; //ntfy_trdp_nm
			formObj.ntfy_trdp_addr.value = rtnValAry[14]; //ntfy_trdp_addr
			formObj.fnl_dest_loc_cd.value = rtnValAry[27]; //fnl_dest_loc_cd
			formObj.fnl_dest_loc_nm.value = rtnValAry[28]; //fnl_dest_loc_nm
			formObj.pck_qty.value = rtnValAry[33]; //pck_qty					
			formObj.pck_ut_cd.value = rtnValAry[34]; //pck_ut_cd
			formObj.grs_wgt_ut_cd.value = rtnValAry[35]; //grs_wgt_ut_cd
			formObj.grs_wgt.value = rtnValAry[36]; //grs_wgt
			formObj.grs_wgt1.value = rtnValAry[37]; //grs_wgt1
			formObj.meas.value = rtnValAry[38]; //meas
			formObj.meas1.value = rtnValAry[39]; //meas1
		}
		// ##48830 - BINEX Visibility/PO 개발
		ajaxSendPost(setBkgPoInfo, 'reqVal', '&goWhere=aj&bcKey=getBkgPoInfo&bkg_seq='+rtnValAry[1], './GateServlet.gsl');
		ajaxSendPost(setBkgItemInfo, 'reqVal', '&goWhere=aj&bcKey=getBkgItemInfo&bkg_seq='+rtnValAry[1], './GateServlet.gsl');
	}
}

function srOpenPopUp_LNRBKNO_POPLIST(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
 		return;
	}else{
		var rtnValAry = rtnVal.split("|");
		
		//#3524 Carrier Booking 의 정보로 여러개의 MBL을 생성 시, Carrier Booking# 중복 validation 추가
		if("BL" == rtnValAry[82]) {
			if(!confirm(getLabel('FMS_COM_ALT142'))){
				return;
			}
		/*	formObj.lnr_bkg_no.value = "";//lnr_bkg_no
			frm1.bkg_seq.value = '';
			//#3524 - 2
			frm1.org_bkg_seq.value = '';
		*/
		}
		formObj.lnr_bkg_no.value = rtnValAry[0];//lnr_bkg_no
		formObj.bkg_seq.value = rtnValAry[2];//bkg_seq
		//formObj.org_lnr_bkg_no.value = rtnValAry[0];//lnr_bkg_no
		//formObj.bkg_dt_tm.value = modiStrDateType(rtnValAry[3], 1);//bkg_dt_tm
		formObj.lnr_trdp_cd.value = rtnValAry[4];//lnr_trdp_cd
		formObj.lnr_trdp_nm.value = rtnValAry[5];//lnr_trdp_nm
		formObj.cust_ref_no.value = rtnValAry[9]; //cust_ref_no
		formObj.sc_no.value = rtnValAry[16]; //lnr_ctrt_no
		formObj.agent_trdp_cd.value = rtnValAry[17]; //fwrd_agn_trdp_cd
		formObj.agent_trdp_nm.value = rtnValAry[18]; //fwrd_agn_trdp_nm
		formObj.agent_trdp_addr.value = rtnValAry[19]; //fwrd_agn_trdp_addr
		formObj.prnr_trdp_cd.value = rtnValAry[20]; //prnr_trdp_cd
		formObj.prnr_trdp_nm.value = rtnValAry[21]; //prnr_trdp_nm
		formObj.trnk_vsl_cd.value = rtnValAry[22]; //trnk_vsl_cd
		formObj.trnk_vsl_nm.value = rtnValAry[23]; //trnk_vsl_nm
		formObj.trnk_voy.value = rtnValAry[24]; //trnk_voy
		formObj.por_cd.value = rtnValAry[25]; //por_cd
		formObj.por_nm.value = rtnValAry[26]; //por_nm
		formObj.pol_cd.value = rtnValAry[27]; //pol_cd
		formObj.pol_nm.value = rtnValAry[28]; //pol_nm
		formObj.pod_cd.value = rtnValAry[29]; //pod_cd
		formObj.pod_nm.value = rtnValAry[30]; //pod_nm
		formObj.del_cd.value = rtnValAry[31]; //del_cd
		formObj.del_nm.value = rtnValAry[32]; //del_nm
		formObj.etd_por_tm.value = modiStrDateType(rtnValAry[35], 1);//etd_por_tm
		formObj.etd_dt_tm.value = modiStrDateType(rtnValAry[36], 1);//etd_dt_tm
		formObj.eta_dt_tm.value = modiStrDateType(rtnValAry[37], 1);//eta_dt_tm
		formObj.rep_cmdt_cd.value = rtnValAry[40]; //rep_cmdt_cd //<!-- Carrier Bkg 조회 필드 추가 팀장님지시사항 -->
		formObj.rep_cmdt_nm.value = rtnValAry[41]; //rep_cmdt_nm //<!-- Carrier Bkg 조회 필드 추가 팀장님지시사항 -->
		formObj.frt_term_cd.value = rtnValAry[42]; //frt_term_cd
		formObj.fm_svc_term_cd.value = rtnValAry[51]; //fm_svc_term_cd
		formObj.to_svc_term_cd.value = rtnValAry[52]; //to_svc_term_cd
		//formObj.cargo_tp_cd.value = rtnValAry[53]; //cargo_tp_cd
		//formObj.cntr_info.value = rtnValAry[54]; //cntr_info
		
		formObj.carr_trdp_cd.value = rtnValAry[60];
		formObj.carr_trdp_nm.value = rtnValAry[61];		
		formObj.carr_trdp_addr.value = rtnValAry[62];
		formObj.act_shpr_trdp_cd.value = rtnValAry[58];
		formObj.act_shpr_trdp_nm.value = rtnValAry[59];		
		formObj.hbl_tp_cd.value = rtnValAry[57];
		formObj.nomi_flg.value = rtnValAry[63];
		formObj.shp_mod_cd.value = rtnValAry[64];
		//#1423 hsk
		formObj.opr_usrid.value = rtnValAry[65]; //Issued by를 bkg의 assignee로 세팅
		
		// #1424 - OEM Entry 에 Booked by 항목 추가 (Carrier Booking 의 Issued by 정보)
		formObj.bk_usrid.value = rtnValAry[66];
		
		//cut off dt tm add, AJS
		formObj.cut_off_dt.value = modiStrDateType(rtnValAry[68], 1);
		formObj.cut_off_tm.value = rtnValAry[69];
		
		//<!-- Carrier Bkg 조회 필드 추가 팀장님지시사항 -->
		formObj.obrd_dt_tm.value = modiStrDateType(rtnValAry[36], 1);//etd_por_tm
		formObj.rcv_wh_cd.value = rtnValAry[70];
		formObj.rcv_wh_nm.value = rtnValAry[71];
		formObj.cntr_info.value = rtnValAry[54];
		formObj.pu_trdp_cd.value = rtnValAry[72];
		formObj.pu_trdp_nm.value = rtnValAry[73];
		formObj.vgm_cut_off_dt.value = modiStrDateType(rtnValAry[74], 1);
		formObj.vgm_cut_off_tm.value = rtnValAry[75];
		formObj.doc_cut_off_dt.value = modiStrDateType(rtnValAry[76], 1);
		formObj.doc_cut_off_tm.value = rtnValAry[77];
		formObj.rail_cut_off_dt.value = modiStrDateType(rtnValAry[78], 1);
		formObj.rail_cut_off_tm.value = rtnValAry[79];
		formObj.port_open_dt.value = modiStrDateType(rtnValAry[80], 1);
		formObj.port_open_tm.value = rtnValAry[81];
		
		timeCheck(formObj.cut_off_tm);
		timeCheck(formObj.vgm_cut_off_tm);
		timeCheck(formObj.doc_cut_off_tm);
		timeCheck(formObj.rail_cut_off_tm);
		timeCheck(formObj.port_open_tm);
		
		
		//if (formObj.hbl_tp_cd.value != "DR") {
		//Carrier Bkg 조회 필드 추가 팀장님지시사항
		//if (!(formObj.hbl_tp_cd.value == "DR" || formObj.hbl_tp_cd.value == "FW" || formObj.hbl_tp_cd.value == "DT")) {	
			formObj.shpr_trdp_cd.value = rtnValAry[6]; //shpr_trdp_cd
			formObj.shpr_trdp_nm.value = rtnValAry[7]; //shpr_trdp_nm
			formObj.shpr_trdp_addr.value = rtnValAry[8]; //shpr_trdp_addr
			formObj.cnee_trdp_cd.value = rtnValAry[10]; //cnee_trdp_cd
			formObj.cnee_trdp_nm.value = rtnValAry[11]; //cnee_trdp_nm
			formObj.cnee_trdp_addr.value = rtnValAry[12]; //cnee_trdp_addr
			formObj.ntfy_trdp_cd.value = rtnValAry[13]; //ntfy_trdp_cd
			formObj.ntfy_trdp_nm.value = rtnValAry[14]; //ntfy_trdp_nm
			formObj.ntfy_trdp_addr.value = rtnValAry[15]; //ntfy_trdp_addr
			formObj.fnl_dest_loc_cd.value = rtnValAry[33]; //fnl_dest_loc_cd
			formObj.fnl_dest_loc_nm.value = rtnValAry[34]; //fnl_dest_loc_nm
			formObj.pck_qty.value = rtnValAry[43]; //pck_qty					
			formObj.pck_ut_cd.value = rtnValAry[44]; //pck_ut_cd
			formObj.grs_wgt_ut_cd.value = rtnValAry[45]; //grs_wgt_ut_cd
			formObj.grs_wgt.value = rtnValAry[46]; //grs_wgt
			formObj.grs_wgt1.value = rtnValAry[47]; //grs_wgt1
			formObj.meas_ut_cd.value = rtnValAry[48]; //meas_ut_cd
			formObj.meas.value = rtnValAry[49]; //meas
			formObj.meas1.value = rtnValAry[50]; //meas1
			formObj.grs_wgt.value=doMoneyFmt(Number(formObj.grs_wgt.value).toFixed(2));
			formObj.grs_wgt1.value=doMoneyFmt(Number(formObj.grs_wgt1.value).toFixed(2));
			formObj.meas.value=doMoneyFmt(Number(formObj.meas.value).toFixed(3));
			formObj.meas1.value=doMoneyFmt(Number(formObj.meas1.value).toFixed(0));
		    
			formObj.mk_grs_wgt.value = formObj.grs_wgt.value;
			formObj.mk_grs_wgt1.value = formObj.grs_wgt1.value;
			formObj.mk_meas.value = formObj.meas.value;
			formObj.mk_meas1.value = formObj.meas1.value;
			//
			
		//}
		
		//#4899 ** [Binex] Carrier Booking Entry to have Customer Ref. No., Export References No., Agent Ref. No.
		if(typeof(formObj.exp_ref_no) != "undefined"){
			formObj.exp_ref_no.value= rtnValAry[83];	
		}
		if(typeof(formObj.prnr_ref_no) != "undefined"){
			formObj.prnr_ref_no.value= rtnValAry[84];		
		}
		////#5289 - [Binex] Errors when retrieving Customer Booking on OEH BL Entry (Duc Nguyen)
		if(typeof(formObj.obl_tp_cd) != "undefined"){
			formObj.obl_tp_cd.value= rtnValAry[85];	
		}
		
		
		bindBkgCntrData();
		bindBkgFrtData();
		
		// #2101 [PATENT] JOB NO., CARR. JOB NO.를 HB/L No., Filing No. 지정하여 사용 및 JOB No., HB/L No생성 로직
		bindBkgNewHblNoFlg(rtnValAry[1]);
				
		// #1056 [OEM Entry]PO# 항목 추가 및 연계
		ajaxSendPost(setBkgPoInfo, 'reqVal', '&goWhere=aj&bcKey=getBkgPoInfo&bkg_seq='+rtnValAry[2], './GateServlet.gsl');
        ajaxSendPost(setBkgItemInfo, 'reqVal', '&goWhere=aj&bcKey=getBkgItemInfo&bkg_seq='+rtnValAry[2], './GateServlet.gsl');		
	}
}

function srOpenPopUp_CREATE_MBL_POPLIST_OEH(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
 		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.ref_no.value=rtnValAry[4];
		checkRefNo(formObj.ref_no);
		isMBLCreated = true;
		if(formObj.intg_bl_seq.value==""){
            doWork("SAVE_ADD");
        }else{
            doWork("SAVE_MODIFY");
        }
	}
}

function srOpenPopUp_CREATE_MBL_POPLIST_OIH(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
 		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.ref_no.value=rtnValAry[4];//ref_no
		formObj.ref_ofc_cd.value=rtnValAry[11];//ref_ofc_cd
		formObj.rlt_intg_bl_seq.value=rtnValAry[0];//intg_bl_seq
		formObj.lnr_trdp_cd.value=rtnValAry[25]; //lnr_trdp_cd
		formObj.lnr_trdp_nm.value=rtnValAry[26]; //lnr_trdp_nm
		formObj.pod_cd.value=rtnValAry[7]; //pod_cd
		formObj.pod_nm.value=rtnValAry[28]; //pod_nm
		formObj.pol_cd.value=rtnValAry[6]; //pol_cd
		formObj.pol_nm.value=rtnValAry[29]; //pol_nm
		formObj.etd_dt_tm.value=modiStrDateType(rtnValAry[5], 1); //etd_dt_tm
		formObj.eta_dt_tm.value=modiStrDateType(rtnValAry[27], 1); //eta_dt_tm
		// Ocean Import
		formObj.it_no.value=rtnValAry[23]; //it_no
		formObj.fm_svc_term_cd.value=rtnValAry[19];
		formObj.to_svc_term_cd.value=rtnValAry[24];
		formObj.shp_mod_cd.value=rtnValAry[30]; //LHK 20130814	
	}
	isMBLCreated = true;
	if(formObj.intg_bl_seq.value==""){
        doWork("SAVE_ADD");
    }else{
        doWork("SAVE_MODIFY");
    }
}

function srOpenPopUp_CREATE_MBL_POPLIST_AEH(rtnVal){
	var formObj = document.frm1;
	//alert(rtnVal);
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.ref_no.value=rtnValAry[1];//ref_no
		formObj.ref_ofc_cd.value=rtnValAry[5];//ref_ofc_cd
		formObj.rlt_intg_bl_seq.value=rtnValAry[0];//intg_bl_seq
		formObj.pod_cd.value=rtnValAry[4]; //pod_cd
		formObj.pod_nm.value=rtnValAry[6]; //pod_nm
		formObj.pol_cd.value=rtnValAry[3]; //pol_cd
		formObj.pol_nm.value=rtnValAry[7]; //pol_nm
		formObj.etd_dt_tm.value=modiStrDateType(rtnValAry[2], 1); //etd_dt_tm
		formObj.etd_tm.value=rtnValAry[8];
	}
	isMBLCreated = true;
	if(formObj.intg_bl_seq.value==""){
        doWork("SAVE_ADD");
    }else{
        doWork("SAVE_MODIFY");
    }
}

function srOpenPopUp_CREATE_MBL_POPLIST_AIH(rtnVal){
	var formObj = document.frm1;
	//alert(rtnVal);
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.lnr_trdp_nm.value=rtnValAry[1];//ref_no
		formObj.pol_nm.value=rtnValAry[5];//ref_ofc_cd
		formObj.lnr_trdp_cd.value=rtnValAry[0];//intg_bl_seq
		formObj.pol_cd.value=rtnValAry[4];
		formObj.pod_cd.value=rtnValAry[6];
		formObj.eta_tm.value=rtnValAry[3];
		formObj.pod_nm.value=rtnValAry[7];
		formObj.eta_dt_tm.value=modiStrDateType(rtnValAry[2], 1);
		formObj.ref_no.value=rtnValAry[8];//ref_no
		formObj.ref_ofc_cd.value=rtnValAry[9];//ref_ofc_cd
		formObj.rlt_intg_bl_seq.value=rtnValAry[10];//intg_bl_seq
		formObj.mbl_no.value=rtnValAry[11];//mbl_no
	}
	isMBLCreated = true;
	if(formObj.intg_bl_seq.value==""){
        doWork("SAVE_ADD");
    }else{
        doWork("SAVE_MODIFY");
    }
}
function setBkgPoInfo(reqVal){
	var formObj = document.frm1;
	
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])=="undefined"){
			formObj.po_no.value="";
		}else{
			formObj.po_no.value=doc[1];
		}
	}
}

function setBkgItemInfo(reqVal){
	var formObj = document.frm1;
	
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])=="undefined"){
			formObj.item_no.value="";
		}else{
			formObj.item_no.value=doc[1];
		}
	}
}

function srAirOpenPopUp_REF_POPLIST(rtnVal){
	var formObj = document.frm1;
	//alert(rtnVal);
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		//LHK, 20140318, #26727 [BINEX][BINEX]BL Copy vs Filing# Assign, Partner 가 있는 경우 정보 유지.
		var cfmFlg=true;
		
		//alert(rtnVal);
		var rtnValAry=rtnVal.split("|");
		
		/*
		if(formObj.prnr_trdp_cd.value != "" || formObj.iss_trdp_cd.value != ""){
			cfmFlg=confirm(getLabel('AIR_MSG_099'));
		}
		*/
		
		// #50581 - [BINEX] HB/L DATE INPUT ISSUE 관련
		if(AEH_ISS_CARR_DFT == "Y"){
			if(formObj.prnr_trdp_cd.value != "" || formObj.hbl_tp_cd.value != rtnValAry[52]){
				cfmFlg=confirm(getLabel('AIR_MSG_101'));
			}
		}else{
			if(formObj.prnr_trdp_cd.value != "" || formObj.iss_trdp_cd.value != "" || formObj.hbl_tp_cd.value != rtnValAry[52]){
				cfmFlg=confirm(getLabel('AIR_MSG_099'));
			}
		}
		
		formObj.ref_no.value=rtnValAry[2];//ref_no
		formObj.ref_ofc_cd.value=rtnValAry[3];//ref_ofc_cd
		formObj.rlt_intg_bl_seq.value=rtnValAry[1];//intg_bl_seq
		//Master B/L 팝업에서 ref no를 선택했을 때 가져와서 매핑하는 정보 
		formObj.mbl_no.value=rtnValAry[0];//master bl no
		//formObj.trnk_vsl_nm.value = rtnValAry[4]; //trnk_vsl_nm
		//formObj.trnk_voy.value = rtnValAry[5]; //trnk_voy
		formObj.lnr_trdp_cd.value=rtnValAry[6]; //lnr_trdp_cd
		formObj.lnr_trdp_nm.value=rtnValAry[7]; //lnr_trdp_nm
		formObj.pod_cd.value=rtnValAry[8]; //pod_cd
		formObj.pod_nm.value=rtnValAry[9]; //pod_nm
		formObj.pol_cd.value=rtnValAry[10]; //pol_cd
		formObj.pol_nm.value=rtnValAry[11]; //pol_nm
		formObj.etd_dt_tm.value=modiStrDateType(rtnValAry[12], 1); //etd_dt_tm
		formObj.post_dt.value=modiStrDateType(rtnValAry[51], 1); //etd_dt_tm
		formObj.eta_dt_tm.value=modiStrDateType(rtnValAry[13], 1); //eta_dt_tm
		formObj.flt_no.value=rtnValAry[31];
		formObj.etd_tm.value=rtnValAry[24].length == 4 ? (rtnValAry[24].substring(0,2) + ":" + rtnValAry[24].substring(2,4)) : "";
		formObj.eta_tm.value=rtnValAry[25].length == 4 ? (rtnValAry[25].substring(0,2) + ":" + rtnValAry[25].substring(2,4)) : "";
		formObj.prnr_trdp_cd2.value=rtnValAry[22];
		formObj.prnr_trdp_nm2.value=rtnValAry[23];
		formObj.ts1_port_cd.value=rtnValAry[40];
		formObj.ts1_flt_no.value=rtnValAry[41];
		formObj.ts2_port_cd.value=rtnValAry[42];
		formObj.ts2_flt_no.value=rtnValAry[43];
		formObj.ts3_port_cd.value=rtnValAry[44];
		formObj.ts3_flt_no.value=rtnValAry[45];
		formObj.fst_to_cd.value=rtnValAry[97];
		formObj.fst_to_nm.value=rtnValAry[98];
		formObj.mrn_no.value=rtnValAry[53]; //mrn_no

		formObj.prnr_ref_no.value=rtnValAry[91]; 
		
		/* jsjang 2013.7.10 요구사항 #16112 (DIRECT B/L 인 경우 HBL 에 MBL 정보 COPY)  자동연계요건 Start */ 
		//alert(rtnValAry[52]);
		if(rtnValAry[52] != null && rtnValAry[52] != '' && (rtnValAry[52] == 'DR' || rtnValAry[52] == 'FW' || rtnValAry[52] == 'DT'))
		{
			//formObj.hbl_tp_cd.value				= rtnValAry[52]; //hbl_tp_cd
			formObj.ntfy_trdp_cd.value=rtnValAry[54]; //ntfy_trdp_cd
			formObj.ntfy_trdp_nm.value=rtnValAry[55]; //ntfy_trdp_nm
			formObj.ntfy_trdp_addr.value=rtnValAry[56]; //ntfy_trdp_addr
			//formObj.fnl_dest_loc_cd.value		= rtnValAry[57]; //fnl_dest_loc_cd
			//formObj.fnl_dest_loc_nm.value		= rtnValAry[58]; //fnl_dest_loc_nm
			//formObj.profit_share.value			= rtnValAry[59]; //profit_share
			formObj.pck_qty.value=rtnValAry[60]; //pck_qty
			formObj.pck_ut_cd.value=rtnValAry[61]; //pck_ut_cd
			formObj.grs_wgt.value=rtnValAry[62]; //grs_wgt
			formObj.grs_wgt1.value=rtnValAry[63]; //grs_wgt1
			//formObj.meas.value					= rtnValAry[64]; //meas
			//formObj.meas1.value					= rtnValAry[65]; //meas1
			formObj.bl_iss_dt.value=rtnValAry[66]; //bl_iss_dt
			formObj.shpr_trdp_cd.value=rtnValAry[34]; //shpr_trdp_cd
			formObj.shpr_trdp_nm.value=rtnValAry[35]; //shpr_trdp_nm
			formObj.shpr_trdp_addr.value=rtnValAry[36]; //shpr_trdp_addr
			formObj.cnee_trdp_cd.value=rtnValAry[20]; //cnee_trdp_cd
			formObj.cnee_trdp_nm.value=rtnValAry[21]; //cnee_trdp_nm
			formObj.cnee_trdp_addr.value=rtnValAry[32]; //cnee_trdp_addr
			//formObj.prnr_trdp_cd.value			= rtnValAry[67]; //prnr_trdp_cd
			//formObj.prnr_trdp_nm.value			= rtnValAry[68]; //prnr_trdp_nm
			//formObj.prnr_trdp_addr.value		= rtnValAry[69]; //prnr_trdp_addr	
			formObj.bl_dt_tm.value=rtnValAry[74]; //bl_dt_tm
			//formObj.disp_ntfy_flg.value		= rtnValAry[75]; //disp_ntfy_flg
			//disp_ntfy_flg
			if(rtnValAry[75]=="Y"){
				formObj.disp_ntfy_flg.checked=true;
			}
			else{
				formObj.disp_ntfy_flg.checked=false;
			}						
			formObj.cargo_tp_cd.value=rtnValAry[76]; //cargo_tp_cd
			formObj.rep_cmdt_cd.value=rtnValAry[77]; //rep_cmdt_cd
			formObj.rep_cmdt_nm.value=rtnValAry[78]; //rep_cmdt_nm
			formObj.agent_grs_wgt.value=rtnValAry[79]; //agent_grs_wgt
			formObj.agent_grs_wgt1.value=rtnValAry[80]; //agent_grs_wgt1
			formObj.agent_chg_wgt.value=rtnValAry[81]; //agent_chg_wgt
			formObj.agent_chg_wgt1.value=rtnValAry[82]; //agent_chg_wgt1
			formObj.chg_wgt.value=rtnValAry[83]; //chg_wgt
			formObj.chg_wgt1.value=rtnValAry[84]; //chg_wgt1
			formObj.vol_wgt.value=rtnValAry[85]; //vol_wgt
			formObj.vol_meas.value=rtnValAry[86]; //vol_meas
			formObj.h_vol_meas.value=rtnValAry[87]; //h_vol_meas
			//formObj.size_ut_cd.value		= rtnValAry[87]; //size_ut_cd
			//alert(rtnValAry[87]);
			if(rtnValAry[88]=="CM"){
				formObj.size_ut_cd[0].checked=true;
				formObj.size_ut_cd[1].checked=false;
			}else if(rtnValAry[88]=="INCH"){
				formObj.size_ut_cd[0].checked=false;
				formObj.size_ut_cd[1].checked=true;
			}else{
				formObj.size_ut_cd[0].checked=false;
				formObj.size_ut_cd[1].checked=false;
			}	
			formObj.size_ut_cd1.value=rtnValAry[88];
			formObj.decl_cstms_val.value=rtnValAry[89]; //decl_cstms_val
			formObj.rt_clss_cd.value=rtnValAry[90]; //rt_clss_cd
		}
		/* jsjang 2013.7.10 요구사항 #16112 (DIRECT B/L 인 경우 HBL 에 MBL 정보 COPY)  자동연계요건 End */ 				
		//LHK, 20140318, #26727 [BINEX][BINEX]BL Copy vs Filing# Assign, Partner 가 있는 경우 정보 유지.
		if(cfmFlg){
			/* #23821 : [BINEX] Issuing Carrier, MAWB -> HAWB, jsjang 2013.11.25 */
			formObj.hbl_tp_cd.value=rtnValAry[52]; //hbl_tp_cd
			/*if(rtnValAry[52] != null && rtnValAry[52] != '' && (rtnValAry[52] == 'DR' || rtnValAry[52] == 'FW'))
			{
				//jsjang 2013.7.10 요구사항 #16112 (DIRECT B/L 인 경우 HBL 에 MBL 정보 COPY)  자동연계요건
				formObj.prnr_trdp_cd.value=rtnValAry[67]; //prnr_trdp_cd
				formObj.prnr_trdp_nm.value=rtnValAry[68]; //prnr_trdp_nm
				formObj.prnr_trdp_addr.value=rtnValAry[69]; //prnr_trdp_addr
			}else{
				// jsjang 2013.7.10 요구사항 #17108 HAWB Agent 정보 추가 Start 
				formObj.prnr_trdp_cd.value=rtnValAry[20]; //prnr_trdp_cd
				formObj.prnr_trdp_nm.value=rtnValAry[21]; //prnr_trdp_nm
				formObj.prnr_trdp_addr.value=rtnValAry[32]; //prnr_trdp_addr
			}*/
			
			formObj.prnr_trdp_cd.value=rtnValAry[20]; //prnr_trdp_cd
			formObj.prnr_trdp_nm.value=rtnValAry[21]; //prnr_trdp_nm
			formObj.prnr_trdp_addr.value=rtnValAry[32]; //prnr_trdp_addr
			
			/* jsjang 2013.7.10 요구사항 #17108 HAWB Agent 정보 추가 End */					
			/*
			if(rtnValAry[52] != null && rtnValAry[52] != '' && rtnValAry[52] == 'TP')
			{
				// #23821 : [BINEX] Issuing Carrier, MAWB -> HAWB, jsjang 2013.11.25
				// #25751 : TP 이면 Customer 와 sync 시킨다.
				formObj.iss_trdp_cd.value=formObj.act_shpr_trdp_cd.value;
				formObj.iss_trdp_nm.value=formObj.act_shpr_trdp_nm.value;
				formObj.iss_trdp_addr.value=formObj.act_shp_info.value;
			} else {
				// mawb의 office 의 기본거래처 코드 (ex, BINEXMAINCMP) 를 COPY 한다
				formObj.iss_trdp_cd.value=rtnValAry[34];
				formObj.iss_trdp_nm.value=rtnValAry[35];
				formObj.iss_trdp_addr.value=rtnValAry[36];
			}
			*/
			
			// #50581 - [BINEX] HB/L DATE INPUT ISSUE 관련
			if(AEH_ISS_CARR_DFT == "N"){
				formObj.iss_trdp_cd.value 			= rtnValAry[99];
				formObj.iss_trdp_nm.value 			= rtnValAry[100];
				formObj.iss_trdp_addr.value 		= rtnValAry[101];
			}
		}	
		if(formObj.f_bl_no.value!=''){
			//doWork('SEARCHLIST');	
		}
		
		// Contribution Margin 조회
		if(typeof(formObj.act_shpr_trdp_cd) != "undefined"){
			if (formObj.act_shpr_trdp_cd.value != ""){
				setCtrbMgn(formObj.act_shpr_trdp_cd.value);
			}
		}
	}
	//#2168 [BNX] Sales PIC based on Sales type does not simultaneously update
	changeSalesType();
}
function srAirOpenPopUp_REF_POPLIST1(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.ref_no.value=rtnValAry[2];//ref_no
		formObj.ref_ofc_cd.value=rtnValAry[3];//ref_ofc_cd
		formObj.rlt_intg_bl_seq.value=rtnValAry[1];//intg_bl_seq
		//Master B/L 팝업에서 ref no를 선택했을 때 가져와서 매핑하는 정보 
		formObj.mbl_no.value=rtnValAry[0];//master bl no
		//formObj.trnk_vsl_nm.value = rtnValAry[4]; //trnk_vsl_nm
		//formObj.trnk_voy.value = rtnValAry[5]; //trnk_voy
		formObj.lnr_trdp_cd.value=rtnValAry[6]; //lnr_trdp_cd
		formObj.lnr_trdp_nm.value=rtnValAry[7]; //lnr_trdp_nm
		//formObj.pod_cd.value = rtnValAry[8]; //pod_cd
		//formObj.pod_nm.value = rtnValAry[9]; //pod_nm
		//formObj.pol_cd.value = rtnValAry[10]; //pol_cd
		//formObj.pol_nm.value = rtnValAry[11]; //pol_nm
		//formObj.etd_dt_tm.value = modiStrDateType(rtnValAry[12], 1); //etd_dt_tm
		//formObj.eta_dt_tm.value = modiStrDateType(rtnValAry[13], 1); //eta_dt_tm
		if(formObj.f_bl_no.value!=''){
			//doWork('SEARCHLIST');	
		}
	}
}
function srAirOpenPopUp_REF_POPLIST2(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
 		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_ref_no.value=rtnValAry[2];//ref_no
		if(formObj.f_ref_no.value!=''){
			doWork('SEARCHLIST');	
		}
	}
}
function srAirOpenPopUp_REF_POPLIST3(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		//LHK, 20140318, #26727 [BINEX][BINEX]BL Copy vs Filing# Assign, Partner 가 있는 경우 정보 유지.
		var cfmFlg=true;
		if(formObj.prnr_trdp_cd.value != ""){
			cfmFlg=confirm(getLabel('AIR_MSG_100'));
		}
		formObj.ref_no.value=rtnValAry[2];//ref_no
		formObj.ref_ofc_cd.value=rtnValAry[3];//ref_ofc_cd
		formObj.rlt_intg_bl_seq.value=rtnValAry[1];//intg_bl_seq
		//Master B/L 팝업에서 ref no를 선택했을 때 가져와서 매핑하는 정보 
		formObj.mbl_no.value=rtnValAry[0];//master bl no
		//formObj.trnk_vsl_nm.value = rtnValAry[4]; //trnk_vsl_nm
		//formObj.trnk_voy.value = rtnValAry[5]; //trnk_voy
		formObj.lnr_trdp_cd.value=rtnValAry[6]; //lnr_trdp_cd
		formObj.lnr_trdp_nm.value=rtnValAry[7]; //lnr_trdp_nm
		formObj.pod_cd.value=rtnValAry[8]; //pod_cd
		formObj.pod_nm.value=rtnValAry[9]; //pod_nm
		formObj.pol_cd.value=rtnValAry[10]; //pol_cd
		formObj.pol_nm.value=rtnValAry[11]; //pol_nm
		formObj.etd_dt_tm.value=modiStrDateType(rtnValAry[12], 1); //etd_dt_tm
		formObj.eta_dt_tm.value=modiStrDateType(rtnValAry[13], 1); //eta_dt_tm
		formObj.post_dt.value=modiStrDateType(rtnValAry[51], 1); //eta_dt_tm
		formObj.flt_no.value=rtnValAry[31];
		formObj.etd_tm.value=rtnValAry[24].length == 4 ? (rtnValAry[24].substring(0,2) + ":" + rtnValAry[24].substring(2,4)) : "";
		formObj.eta_tm.value=rtnValAry[25].length == 4 ? (rtnValAry[25].substring(0,2) + ":" + rtnValAry[25].substring(2,4)) : "";
		formObj.prnr_trdp_cd2.value=rtnValAry[22];
		formObj.prnr_trdp_nm2.value=rtnValAry[23];
		//LHK, 20140318, #26727 [BINEX][BINEX]BL Copy vs Filing# Assign, Partner 가 있는 경우 정보 유지.
		if(cfmFlg){
			formObj.prnr_trdp_cd.value=rtnValAry[34];
			formObj.prnr_trdp_nm.value=rtnValAry[35];
			formObj.prnr_trdp_addr.value=rtnValAry[36];
		}
		formObj.cfs_trdp_cd.value=rtnValAry[46];
		formObj.cfs_trdp_nm.value=rtnValAry[47];
		if(rtnValAry[48]!=''){
			formObj.f_eta_dt_tm.value=modiStrDateType(rtnValAry[48].substring(0,8), 1);
			formObj.f_eta_tm.value=rtnValAry[48].substring(8,10) + ":" + rtnValAry[48].substring(10,12);
			formObj.post_dt.value=modiStrDateType(rtnValAry[51], 1);
		}
		formObj.mrn_no.value=rtnValAry[53]; //mrn_no
		
		//#1074 [Star Cluser ATL/MIA] V440 AIH AWB Etnry, ETA of FPOE/First Port Of Entry to sync when Filing # is selected
		if(rtnValAry[102] != ""){
			var fpoeDate = rtnValAry[102].substring(4, 6) + "-" + rtnValAry[102].substring(6, 8) + "-" + rtnValAry[102].substring(0, 4);
			formObj.eta_fpoe_tm.value   = fpoeDate;
			formObj.fpoe_tm.value=rtnValAry[102].substring(8, 12).length == 4 ? (rtnValAry[102].substring(8, 10) + ":" + rtnValAry[102].substring(10, 12)) : "";
		}
		
		formObj.ctrb_ofc_cd.value   = rtnValAry[108];
		(rtnValAry[109] == "Y") ? formObj.ctrb_ratio_yn.checked = true : formObj.ctrb_ratio_yn.checked = false;
		formObj.ctrb_mgn.value      = rtnValAry[110];
		formObj.ctrb_dept_cd.value  = rtnValAry[111];
		
		formObj.ts1_port_cd.value  = rtnValAry[40];
		formObj.ts1_flt_no.value  = rtnValAry[41];
		formObj.ts2_port_cd.value  = rtnValAry[42];
		formObj.ts2_flt_no.value  = rtnValAry[43];
		formObj.ts3_port_cd.value  = rtnValAry[44];
		formObj.ts3_flt_no.value  = rtnValAry[45];
		
		formObj.sto_start_dt.value  = rtnValAry[112];
		formObj.ccn_no.value  = rtnValAry[93];
		
		if(rtnValAry[57] == ""){
			formObj.fnl_dest_loc_cd.value = rtnValAry[8]; //pod_cd
			formObj.fnl_dest_loc_nm.value = rtnValAry[9]; //pod_nm
		}else{
			formObj.fnl_dest_loc_cd.value = rtnValAry[57];//fnl_desc_loc_cd
			formObj.fnl_dest_loc_nm.value = rtnValAry[58];//fnl_desc_loc_cd
		}
		
		
		formObj.first_port_cd.value=rtnValAry[103];
		formObj.first_port_nm.value=rtnValAry[104];
//		formObj.fpoe_tm.value       = result[113];
		
		/* jsjang 2013.7.10 요구사항 #16112 (DIRECT B/L 인 경우 HBL 에 MBL 정보 COPY)  자동연계요건 Start */ 
		//alert(rtnValAry[52]);
		if(rtnValAry[52] != null && rtnValAry[52] != '' && (rtnValAry[52] == 'DR' || rtnValAry[52] == 'FW' || rtnValAry[52] == 'DT'))
		{
			formObj.hbl_tp_cd.value=rtnValAry[52]; //hbl_tp_cd
			//formObj.mrn.value					= rtnValAry[53]; //mrn
			//formObj.ntfy_trdp_cd.value			= rtnValAry[54]; //ntfy_trdp_cd
			//formObj.ntfy_trdp_nm.value			= rtnValAry[55]; //ntfy_trdp_nm
			//formObj.ntfy_trdp_addr.value		= rtnValAry[56]; //ntfy_trdp_addr
			//formObj.fnl_dest_loc_cd.value		= rtnValAry[57]; //fnl_dest_loc_cd
			//formObj.fnl_dest_loc_nm.value		= rtnValAry[58]; //fnl_dest_loc_nm
			//formObj.profit_share.value			= rtnValAry[59]; //profit_share
//			#1074 [Star Cluser ATL/MIA] V440 AIH AWB Etnry, ETA of FPOE/First Port Of Entry to sync when Filing # is selected
//			formObj.pck_qty.value=rtnValAry[60]; //pck_qty
//			formObj.pck_ut_cd.value=rtnValAry[61]; //pck_ut_cd
			formObj.grs_wgt.value=rtnValAry[62]; //grs_wgt
			formObj.grs_wgt1.value=rtnValAry[63]; //grs_wgt1
			//formObj.meas.value					= rtnValAry[64]; //meas
			//formObj.meas1.value					= rtnValAry[65]; //meas1
			formObj.bl_iss_dt.value=rtnValAry[66]; //bl_iss_dt
			formObj.shpr_trdp_cd.value=rtnValAry[34]; //shpr_trdp_cd
			formObj.shpr_trdp_nm.value=rtnValAry[35]; //shpr_trdp_nm
			formObj.shpr_trdp_addr.value=rtnValAry[36]; //shpr_trdp_addr
			formObj.cnee_trdp_cd.value=rtnValAry[20]; //cnee_trdp_cd
			formObj.cnee_trdp_nm.value=rtnValAry[21]; //cnee_trdp_nm
			formObj.cnee_trdp_addr.value=rtnValAry[32]; //cnee_trdp_addr
			//LHK, 20140318, #26727 [BINEX][BINEX]BL Copy vs Filing# Assign, Partner 가 있는 경우 정보 유지.
			if(cfmFlg){
				formObj.prnr_trdp_cd.value=rtnValAry[67]; //prnr_trdp_cd
				formObj.prnr_trdp_nm.value=rtnValAry[68]; //prnr_trdp_nm
				formObj.prnr_trdp_addr.value=rtnValAry[69]; //prnr_trdp_addr	
			}
			//formObj.bl_dt_tm.value			= rtnValAry[74]; //bl_dt_tm
			//formObj.disp_ntfy_flg.value		= rtnValAry[75]; //disp_ntfy_flg
			//disp_ntfy_flg
			//if(rtnValAry[75]=="Y"){
			//	formObj.disp_ntfy_flg.checked = true;
			//}
			//else{
			//	formObj.disp_ntfy_flg.checked = false;
			//}						
			//formObj.cargo_tp_cd.value		= rtnValAry[76]; //cargo_tp_cd
			formObj.rep_cmdt_cd.value=rtnValAry[77]; //rep_cmdt_cd
			formObj.rep_cmdt_nm.value=rtnValAry[78]; //rep_cmdt_nm
			//formObj.agent_grs_wgt.value		= rtnValAry[79]; //agent_grs_wgt
			//formObj.agent_grs_wgt1.value		= rtnValAry[80]; //agent_grs_wgt1
			//formObj.agent_chg_wgt.value		= rtnValAry[81]; //agent_chg_wgt
			//formObj.agent_chg_wgt1.value		= rtnValAry[82]; //agent_chg_wgt1
			formObj.chg_wgt.value=rtnValAry[83]; //chg_wgt
			formObj.chg_wgt1.value=rtnValAry[84]; //chg_wgt1
			//formObj.vol_wgt.value		= rtnValAry[85]; //vol_wgt
			//formObj.vol_meas.value		= rtnValAry[86]; //vol_meas
			//formObj.h_vol_meas.value	= rtnValAry[87]; //h_vol_meas
			//formObj.size_ut_cd.value		= rtnValAry[87]; //size_ut_cd
			//alert(rtnValAry[87]);
			//if(rtnValAry[88]=="CM"){
			//	formObj.size_ut_cd[0].checked = true;
			//	formObj.size_ut_cd[1].checked = false;
			//}else if(rtnValAry[88]=="INCH"){
			//	formObj.size_ut_cd[0].checked = false;
			//	formObj.size_ut_cd[1].checked = true;
			//}else{
			//	formObj.size_ut_cd[0].checked = false;
			//	formObj.size_ut_cd[1].checked = false;
			//}	
			//formObj.size_ut_cd1.value = rtnValAry[88];
			//formObj.decl_cstms_val.value		= rtnValAry[89]; //decl_cstms_val
			//formObj.rt_clss_cd.value		= rtnValAry[90]; //rt_clss_cd
			formObj.prnr_ref_no.value=rtnValAry[91];	//prnr_ref_no
			formObj.curr_cd.value=rtnValAry[92];	//curr_cd					
		}
		/* jsjang 2013.7.10 요구사항 #16112 (DIRECT B/L 인 경우 HBL 에 MBL 정보 COPY)  자동연계요건 End */				
		formObj.pre_ccn_no.value=rtnValAry[93]; //oyh #24620 ccn 
		formObj.mnf_fr_loc.value=rtnValAry[94]; //oyh #24620 ccn 
		formObj.mnf_to_loc.value=rtnValAry[95]; //oyh #24620 ccn 
		if(formObj.f_bl_no.value!=''){
			//doWork('SEARCHLIST');	
		}
		
		// Contribution Margin 조회
		if(typeof(formObj.act_shpr_trdp_cd) != "undefined"){
			if (formObj.act_shpr_trdp_cd.value != ""){
				setCtrbMgn(formObj.act_shpr_trdp_cd.value);
			}
		}
	}
	//#2168 [BNX] Sales PIC based on Sales type does not simultaneously update
	changeSalesType();
}
function woOpenPopUp_callBackFunc1(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
 		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		frm1.reserve_field03.value=rtnValAry[0];
		frm1.pck_qty.value=rtnValAry[1];
		frm1.pck_ut_cd.value=rtnValAry[2];
		frm1.grs_wgt.value=rtnValAry[3];
		frm1.grs_wgt1.value=rtnValAry[4];
		frm1.meas.value=rtnValAry[5];
		frm1.meas1.value=rtnValAry[6];
		frm1.shpr_trdp_cd.value=rtnValAry[7];
		frm1.shpr_trdp_nm.value=rtnValAry[8];
		frm1.shpr_trdp_addr.value=rtnValAry[9];
		frm1.cnee_trdp_cd.value=rtnValAry[10];
		frm1.cnee_trdp_nm.value=rtnValAry[11];
		frm1.cnee_trdp_addr.value=rtnValAry[12];
		frm1.prnr_trdp_cd.value=rtnValAry[13];
		frm1.prnr_trdp_nm.value=rtnValAry[14];
		frm1.prnr_trdp_addr.value=rtnValAry[15];
		//Dimension Info
		ajaxSendPost(getDimInfo, 'reqVal', '&goWhere=aj&bcKey=getDimInfo&intg_bl_seq='+rtnValAry[0], './GateServlet.gsl');
	}
}
function woOpenPopUp_callBackFunc2(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
 		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		frm1.reserve_field03.value=rtnValAry[0];
		frm1.pck_qty.value=rtnValAry[1];
		frm1.pck_ut_cd.value=rtnValAry[2];
		frm1.grs_wgt.value=rtnValAry[3];
		frm1.grs_wgt1.value=rtnValAry[4];
		frm1.agent_grs_wgt.value=rtnValAry[3];
		frm1.agent_grs_wgt1.value=rtnValAry[4];
		frm1.vol_meas.value=rtnValAry[5];
		frm1.shpr_trdp_cd.value=rtnValAry[7];
		frm1.shpr_trdp_nm.value=rtnValAry[8];
		frm1.shpr_trdp_addr.value=rtnValAry[9];
		frm1.cnee_trdp_cd.value=rtnValAry[10];
		frm1.cnee_trdp_nm.value=rtnValAry[11];
		frm1.cnee_trdp_addr.value=rtnValAry[12];
		frm1.prnr_trdp_cd.value=rtnValAry[13];
		frm1.prnr_trdp_nm.value=rtnValAry[14];
		frm1.prnr_trdp_addr.value=rtnValAry[15];
		weightChange(frm1.vol_meas);
		//Dimension Info
		ajaxSendPost(getDimInfoAir, 'reqVal', '&goWhere=aj&bcKey=getDimInfo&intg_bl_seq='+rtnValAry[0], './GateServlet.gsl');
	}
}

function CNEE_POPLIST(rtnVal){
	var formObj = document.frm1;
	 if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		 	return;
		}else{
			var rtnValAry=rtnVal.split("|");

			//OFVFOUR-7911 [AIF] MANAGING/ALERT CUSTOMER'S OUTSTANDING (OVERDUE)
			var opt_key_sec = "TP_OVER_AMT_FLG";
	    	ajaxSendPost(setOverAmtCurrFlg, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key_sec, "./GateServlet.gsl");

			if(cur_curObj.id == "consignee"){
				if(rtnValAry[0]==''){
					//formObj.cnee_trdp_cd.focus();
				}else{
					if(rtnValAry[13] == 'KO'){
						alert(getLabel('COM_FRT_ALT015'));
						formObj.cnee_trdp_cd.value="";//trdp_cd
						formObj.cnee_trdp_nm.value="";//eng_nm
						formObj.cnee_trdp_addr.value="";
						formObj.cnee_trdp_nm.style.color= "#000000";
						return;
						
					} else if(rtnValAry[13] == 'CR'){

						//OFVFOUR-7911 [AIF] MANAGING/ALERT CUSTOMER'S OUTSTANDING (OVERDUE)
						if (TP_OVER_AMT_FLG != ""){
							var objArr=new Array();
							var overDueDateAmt = rtnValAry[41]==""?0:eval(rtnValAry[41]);
							if (overDueDateAmt != 0){
								objArr[0]=rtnValAry[2];
								objArr[1]=doMoneyFmt(roundXL(Number(overDueDateAmt),2).toFixed(2));
								if(!confirm(getLabel2('COM_FRT_CFM012', objArr))){
									formObj.cnee_trdp_nm.style.color= "#000000";
									return;
								} else {
									formObj.cnee_trdp_nm.style.color= "#ff0000";
								}
							}
						}

						//[20140317 OJG] 요구사항 #27358 - [BINEX] Trade Partner 중 “Credit Limit”이 초과 되었을 경우의 Alert 내용 변경 필요
						//[20140317 OYH] #27474
						var crdLmtAmt=rtnValAry[14]==""?0:eval(rtnValAry[14]);
						var curLmtAmt=rtnValAry[15]==""?0:eval(rtnValAry[15]);
						var balLmtAmt=crdLmtAmt - curLmtAmt;
						var overDueAmt=rtnValAry[29]==""?0:eval(rtnValAry[29]);
						var grandTotal=rtnValAry[31]==""?0:eval(rtnValAry[31]);
						
						//[20141217 YJW] #46708
						if(crdLmtAmt > 0) {
							if(overDueAmt > 0 && balLmtAmt < 0  ){
								var objArr=new Array();
								//objArr[0]=doMoneyFmt(roundXL(Number(crdLmtAmt),2).toFixed(2)); 
								//objArr[1]=doMoneyFmt(roundXL(Number(grandTotal),2).toFixed(2));
								objArr[0]=doMoneyFmt(roundXL(Number(balLmtAmt*(-1)),2).toFixed(2));
								if(!confirm(getLabel2('COM_FRT_CFM008', objArr))){
									formObj.cnee_trdp_nm.style.color= "#000000";
									return;
								} else {
									formObj.cnee_trdp_nm.style.color= "#ff0000";
								}
							} else if (balLmtAmt < 0  ){
								var objArr=new Array();
								//objArr[0]=doMoneyFmt(roundXL(Number(crdLmtAmt),2).toFixed(2)); 
								//objArr[1]=doMoneyFmt(roundXL(Number(balLmtAmt*(-1)),2).toFixed(2));
								objArr[0]=doMoneyFmt(roundXL(Number(balLmtAmt*(-1)),2).toFixed(2));
								if(!confirm(getLabel2('COM_FRT_CFM006', objArr))){
									formObj.cnee_trdp_nm.style.color= "#000000";
									return;
								} else {
									formObj.cnee_trdp_nm.style.color= "#ff0000";
								}
							} else if (overDueAmt > 0 ) {
								var objArr=new Array();
								objArr[0]=doMoneyFmt(roundXL(Number(grandTotal),2).toFixed(2));     
								if(!confirm(getLabel2('COM_FRT_CFM007', objArr))){
									formObj.cnee_trdp_nm.style.color= "#000000";
									return;
								} else {
									formObj.cnee_trdp_nm.style.color= "#ff0000";
								}
							} else {
								formObj.cnee_trdp_nm.style.color= "#000000";
							}
						} else {
							formObj.cnee_trdp_nm.style.color= "#000000";
						}
					
					//[20140307 OJG] #26863Credit Hold가 걸려 있는 TP가 SHIPPER, CONSIGNEE, NOTIFY 중 선택이 되면 Alert 추가. - Alert 내용 : “Credit Hold is on this Trade Partner. Do you want to proceed?”
					} else if(rtnValAry[13] == 'CH'){
						if(confirm(getLabel('COM_FRT_CFM005'))){ 
							//formObj.cnee_trdp_nm.className='search_form_alert focusElem';
							//formObj.cnee_trdp_addr.className='search_form_alert';
							formObj.cnee_trdp_nm.style.color= "#ff0000";
							formObj.cnee_trdp_nm.className='search_form focusElem';
						}else{
							formObj.cnee_trdp_nm.style.color= "#000000";
							return;
						}
						
					} else if(rtnValAry[13] == 'CO'){
						if(confirm(getLabel('COM_FRT_ALT001'))){
							formObj.cnee_trdp_nm.style.color= "#ff0000";
						} else {
							formObj.cnee_trdp_cd.value="";//trdp_cd
							formObj.cnee_trdp_nm.value="";//eng_nm
							formObj.cnee_trdp_addr.value="";
							formObj.cnee_trdp_nm.style.color= "#000000";
							return;
						}
						/*if(rtnValAry[14]!='' && rtnValAry[15]!='' && rtnValAry[14]<rtnValAry[15]){
							//COD
							alert(getLabel('COM_FRT_ALT001'));	
							formObj.cnee_trdp_nm.style.color= "#ff0000";
						} else {
							formObj.cnee_trdp_nm.style.color= "#000000";
						}*/
						
					} else {
						formObj.cnee_trdp_nm.style.color= "#000000";
					}
					
					formObj.cnee_trdp_cd.value=rtnValAry[0];//trdp_cd
					formObj.cnee_trdp_nm.value=rtnValAry[2];//eng_nm
					
					if(cur_airSeaTp=='S' && cur_bndTp=='I' && rtnValAry[7]==""){
						formObj.cnee_trdp_addr.value=rtnValAry[2];
					}else{
						formObj.cnee_trdp_addr.value=rtnValAry[7];//eng_addr 
					}
					
					/*20151118 #50463 BNX는 #20426 내용 예외이다. 그래서 옵션처리*/
					if(blSameAsCneeYn == 'Y'){ //BNX 가 아닐 경우만 해당
						/* oyh 2013.09.05 #20426 : [BINEX] Default로 CNEE 입력시 같은 회사가 NTFY에 입력*/
						if(typeof(formObj.ntfy_trdp_cd) != "undefined"){
							formObj.ntfy_trdp_cd.value=rtnValAry[0];//trdp_cd
							formObj.ntfy_trdp_nm.value=rtnValAry[2];//eng_nm
							formObj.ntfy_trdp_addr.value=rtnValAry[7];//eng_addr 
							//[20140307 OJG] #26863Credit Hold가 걸려 있는 TP가 SHIPPER, CONSIGNEE, NOTIFY 중 선택이 되면 Alert 추가. - Alert 내용 : “Credit Hold is on this Trade Partner. Do you want to proceed?”
							if(rtnValAry[13] == 'CH'){
								//formObj.ntfy_trdp_nm.className='search_form_alert';
								//formObj.ntfy_trdp_addr.className='search_form_alert';
								formObj.ntfy_trdp_nm.style.color= "#ff0000";
							}else{
								//formObj.ntfy_trdp_nm.className='search_form';
								//formObj.ntfy_trdp_addr.className='search_form';
								formObj.ntfy_trdp_nm.style.color= "#000000";
							}
						}
					}
					
					// #48819
					if (cur_airSeaTp == "S" && cur_bndTp =="I") {
						if( rtnValAry[34] != undefined && rtnValAry[34] != "undefined" && rtnValAry[34] != ''){ 
							var objArr = new Array();
							objArr[0] = rtnValAry[34]; 
							
							if (rtnValAry[35] != undefined && rtnValAry[35] != "undefined" && rtnValAry[35] !='') {
								objArr[1] = rtnValAry[35];     
							} else {
								objArr[1] = "";     
							}
							alert(getLabel2('COM_FRT_ALT014', objArr));						
						}
					}	
				}
			}
		}
	 
	 setActShipper();
	 
	 // IE Debug시 Error 발생하여 처리
	 setTimeout("cbCheck()",500);
	 
	 //trCheck();
	 
	 //doCheck();
	 
}

var isRefNoOk = false;

//[20140911 YJW] HBL 저장시 Filing No 유효성 체크
function checkHblRefNo(air_sea_clss_cd, bnd_clss_cd) {
	var formObj  = document.frm1;
	
	var ref_no = formObj.ref_no.value;
	var rlt_intg_bl_seq = formObj.rlt_intg_bl_seq.value;
	
	if (rlt_intg_bl_seq == "") {
		alert(getLabel('FMS_COM_ALT065')); // Filing No. do not exist!
		return false;
	}
	
	ajaxSendPost(getCheckHblRefNo, 'reqVal', '&goWhere=aj&bcKey=getCheckHblRefNo&f_ref_no='+ref_no+'&f_rlt_intg_bl_seq='+rlt_intg_bl_seq+'&f_air_sea_clss_cd='+air_sea_clss_cd+'&f_bnd_clss_cd='+bnd_clss_cd, './GateServlet.gsl');
	
	if (!isRefNoOk) {
		alert(getLabel('FMS_COM_ALT066')); // Invalid Filing No. Please save after check Filing No!
	}
	
	return isRefNoOk;
}

function getCheckHblRefNo(reqVal){
	var doc = getAjaxMsgXML(reqVal);
	
	if(doc[0]=='OK'){
		if(doc[1] == "-1"){
			isRefNoOk = false;
		} else {
			isRefNoOk = true;
		}
	}
}

function openBlCopyPopUp(popName, curObj, valObj){
	return cmmOpenPopUp(popName, curObj, "S", "O", valObj, "H");
}

function checkRatioValid(){
	var formObj = document.frm1;
	
	if (formObj.ctrb_ratio_yn.value == "Y"){
		if (Number(removeComma(formObj.ctrb_mgn.value)) > 50) {
			alert(getLabel2('FMS_COM_ALT076',new Array("50")));
			formObj.ctrb_mgn.value = "";
			formObj.ctrb_mgn.focus();
			return;
		}
	}
}

function clickCtrbRatioYn(){
	var formObj = document.frm1;
	
	frm1.ctrb_mgn.value = '';
	frm1.ctrb_mgn.focus();
}

/**
 * Vinh.Vo
 * 04/22/2015
 * W/H is not selected more than one time
 */

function isSelectedWH(val){
	
	var sheetObj;
	
	if(val == 'S' || val == 'A'){
		sheetObj = docObjects[1];
	}else if(val == 'SI'){
		sheetObj = docObjects[11];
	}else if(val == 'AI'){
		sheetObj = docObjects[7];
	}
	
	var count = sheetObj.RowCount();
	
	if(count > 0){
		
		var beginIndex;
		var endIndex;
		// #5618 [BNX] HBL Entry 화면에서 Warehouse list 정보 불러올때 추가 옵션 요청
		/*if(val == 'S' || val == 'SI'){
			beginIndex = 1;
			endIndex = count;
		}else if (val == 'A' || val == 'AI'){
			beginIndex = 2;
			endIndex = count + 1;
		}*/		
		beginIndex = sheetObj.HeaderRows();
		endIndex = count + beginIndex;
		
		for(var i = beginIndex; i < endIndex; i++){
			if(sheetObj.GetCellValue(i,"dim_wh_recp_no") != ""){
				return true;
			}
		}
	}
	
	return false;
}
//OFVFOUR-6866 - [BNX-LA] Selecting multi-Warehouse Receipt from B/L Entry screen (Zen#3533)
function whRcptOpenPopUp2(val){
    if(multiWhFlg=="Y"){
    	updateMultiWh_recp_no(val);
    }else if(isSelectedWH(val)){
		ComShowCodeMessage('COM132603');
		return;
	}
	whRcptOpenPopUp(val);
}

function GOTOMBL(v_ref_no, v_mbl_intg_bl_seq, v_air_sea_clss_cd, v_bnd_clss_cd){
	if(v_ref_no != ''){
		var formObj=document.frm1;
		var v_url = "";
		var v_title = "";
		
		if(v_air_sea_clss_cd == "S"){
			if(v_bnd_clss_cd == "O"){
				v_url = "SEE_BMD_0040";
			}else{
				v_url = "SEI_BMD_0040";
			}
			v_title = "Master B/L Entry";
		}else{
			if(v_bnd_clss_cd == "O"){
				v_url = "AIE_BMD_0040";
			}else{
				v_url = "AII_BMD_0040";
			}
			v_title = "Master AWB Entry";
		}
		
	   	var paramStr = "./" + v_url + ".clt?f_cmd="+SEARCHLIST;
	   	paramStr+= '&f_ref_no='+v_ref_no;
	   	paramStr+= '&f_intg_bl_seq='+v_mbl_intg_bl_seq;
	   	parent.mkNewFrame(v_title, paramStr, v_url + "_SHEET_" + v_ref_no + "_" + v_mbl_intg_bl_seq);
	}
}

//#50463 [BNX] BL ENTRY에서 CONSIGNEE 입력하면 NOTIFY 칸에 COPY되는 LOGIC REMOVE
function setBlSameAsCnee(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ){
	    if(doc[1] == "N"){
	    	blSameAsCneeYn = "N";
		}else{
		}
	}else{
	}
}
/* DESCRIOPTION
 * ================== des_01 (S) ==============================
 * #48187
	When W/H item is selected on H.BL Entry

	Case 1.  If Actual Weight >= Dim Weight
               Input 
                  Actual Weight into 
                          Gross Weight(2), Chargeable Weight(2)
               and
                   Dim Weight into Volume Weight
             from Warehouse Receipt Entry

	Case 2. .  If Actual Weight < Dim Weight
              Input 
                  Actual Weight into Gross Weight(2), 
              and
                   Dim Weight into 
                       Chargeable Weight(2) and Volume Weight
             from Warehouse Receipt Entry

	And the status of the item in Warehouse receipt Entry must be changed into “Shipped” when H.BL is saved. 

 ================== des_01 (E) =================================
 */

// #52162 - [BNX] SALESMAN MAPPING 요청 및 자동 SET UP 로직 변경
function setBlSalesManDfltReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ){
	    BL_SALES_MAN_DFLT = doc[1];
	}else{
		BL_SALES_MAN_DFLT = "A";
	}
}

//OFVFOUR-7976: [MATRIX] ADDING CS PIC ON ALL B/L ENTRY AND TRADE PARTNER ENTRY SCREEN
function setBlCSManDfltReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ){
		BL_CS_MAN_DFLT = doc[1];
	}else{
		BL_CS_MAN_DFLT = "A";
	}
}


//#6369 [AIF] SALES PIC NOT PROPERLY SYNC BTW MBL AND HBL
function setSalesPICInfo(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK" && doc[1] != "undefined" && doc[1]!=undefined){
		BL_SEA_USE_SALES_MAN_DFLT_FLG = doc[1];
	}else{
		BL_SEA_USE_SALES_MAN_DFLT_FLG = "Y";
	}
}

//OFVFOUR-7976: [MATRIX] ADDING CS PIC ON ALL B/L ENTRY AND TRADE PARTNER ENTRY SCREEN
function setCSPICInfo(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if (doc[0]=="OK" && doc[1] != "undefined" && doc[1]!=undefined){
		BL_SEA_USE_CS_MAN_DFLT_FLG = doc[1];
	}else{
		BL_SEA_USE_CS_MAN_DFLT_FLG = "Y";
	}
}

// #51924 [ZEN] OEH BL ENTRY에서 DOCUMENT NO. 로직
function setHblDocnoSyncReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ){
		HBL_DOCNO_SYNC = doc[1];
	}else{
		HBL_DOCNO_SYNC = "F";
	}
}

// #991 [SHINE] MB/L -> HB/L 데이터 연계 로직 추가
function setBlPartnerAssignReq(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ){
		BL_PARTNER_ASSIGNMENT = doc[1];
	}else{
		BL_PARTNER_ASSIGNMENT = "N";
	}
}
//#1344 [CLT] v4.4.1 bug - 자동완성 기능 side effect
function getcurType(){
	//var currentPage = document.location.href.slice(7).split("/");
	//#5289 [Binex] Errors when retrieving Customer Booking on OEH BL Entry 
	var currentPage = document.location.pathname.split("/");
	var curPage = currentPage[2];
	curPage = curPage.split("_");
	//Sea, Air
	cur_airSeaTp = curPage[0].substr(0,1); 
	//Outbound, Inbound
	if(curPage[0].substr(2,1)=="E"){ 
		cur_bndTp = "O";
	}else if(curPage[0].substr(2,1)=="I"){
		cur_bndTp = "I";
	}
	//M, H
	if(curPage[2].substr(0,4)=="0040"){ 
		cur_bizTp = "M";
	}else if(curPage[2].substr(0,4)=="0020"){
		cur_bizTp = "H";
	}	
}

function CONSOL_POPLIST(rtnVal){
	var formObj = document.frm1;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
 		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		formObj.f_plan_no.value=rtnValAry[0];//plan no		
	}
}

function setOihAnCntrInfoReq(reqVal){
    var doc=getAjaxMsgXML(reqVal);
    if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined) {
    	if(doc[1] == "CSW"){
    		OIH_AN_CNTR_INFO = "CSW";
    	}
    }
}


//#2586 [BNX US] COD, CREDIT HOLD ACCOUNTS NO WARNING
var copyFlg = false;
var copyAltFlg = false;
var codType = "";
function chkCodOnLoad(type, value, cFlg){
	copyFlg = cFlg;
	codType = type;
	
	if (cur_airSeaTp == "" || cur_airSeaTp == "undefined" || cur_airSeaTp == undefined) {
		getcurType();
	}	
	
	ajaxSendPost(fnCodOnLoad, "reqVal", "&goWhere=aj&bcKey=chkCodOnLoad&s_tp_code="+value, "./GateServlet.gsl");
	
	copyFlg = false;
}

function fnCodOnLoad(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj = document.frm1;

	if (doc[0]=="OK" && typeof doc[1] != "undefined" && doc[1] != ""){
		
		var rtnValAry=doc[1].split("|");
		if(codType == "shipper"){
			if(rtnValAry[0]==''){
				//formObj.shpr_trdp_cd.focus();
			}else{
				formObj.shpr_trdp_cd.style.color= "#000000";
				formObj.shpr_trdp_nm.style.color= "#000000";
				
				if(rtnValAry[13] == 'KO'){
					
				} else if(rtnValAry[13] == 'CR'){
					var crdLmtAmt=rtnValAry[14]==""?0:eval(rtnValAry[14]);
					var curLmtAmt=rtnValAry[15]==""?0:eval(rtnValAry[15]);
					var balLmtAmt=crdLmtAmt - curLmtAmt;
					var overDueAmt=rtnValAry[29]==""?0:eval(rtnValAry[29]);
					var grandTotal=rtnValAry[31]==""?0:eval(rtnValAry[31]);
					
					if(crdLmtAmt > 0) {
						if(overDueAmt > 0 && balLmtAmt < 0){
							var objArr=new Array();
							objArr[0]=doMoneyFmt(roundXL(Number(balLmtAmt*(-1)),2).toFixed(2));
							if(copyFlg && !copyAltFlg){
								alert(getLabel2('COM_FRT_CFM008', objArr));
								copyAltFlg = true;
							}
							formObj.shpr_trdp_cd.style.color= "#ff0000";
							formObj.shpr_trdp_nm.style.color= "#ff0000";
						} else if (balLmtAmt < 0  ){
							var objArr=new Array();
							objArr[0]=doMoneyFmt(roundXL(Number(balLmtAmt*(-1)),2).toFixed(2));
							if(copyFlg && !copyAltFlg){
								alert(getLabel2('COM_FRT_CFM006', objArr));
								copyAltFlg = true;
							}
							formObj.shpr_trdp_cd.style.color= "#ff0000";
							formObj.shpr_trdp_nm.style.color= "#ff0000";
						} else if (overDueAmt > 0 ) {
							var objArr=new Array();
							objArr[0]=doMoneyFmt(roundXL(Number(grandTotal),2).toFixed(2));
							if(copyFlg && !copyAltFlg){
								alert(getLabel2('COM_FRT_CFM007', objArr));
								copyAltFlg = true;
							}
							formObj.shpr_trdp_cd.style.color= "#ff0000";
							formObj.shpr_trdp_nm.style.color= "#ff0000";
						} else {
							formObj.shpr_trdp_cd.style.color= "#000000";
							formObj.shpr_trdp_nm.style.color= "#000000";
						}
					} else {
						formObj.shpr_trdp_cd.style.color= "#000000";
						formObj.shpr_trdp_nm.style.color= "#000000";
					}
					
				} else if(rtnValAry[13] == 'CH'){
					if(copyFlg && !copyAltFlg){
						alert(getLabel('COM_FRT_CFM005'));
						copyAltFlg = true;
					}
					formObj.shpr_trdp_cd.style.color= "#ff0000";
					formObj.shpr_trdp_nm.style.color= "#ff0000";
				} else if(rtnValAry[13] == 'CO'){
					if(copyFlg && !copyAltFlg){
						alert(getLabel('COM_FRT_ALT001'));
						copyAltFlg = true;
					}
					formObj.shpr_trdp_cd.style.color= "#ff0000";
					formObj.shpr_trdp_nm.style.color= "#ff0000";
				} else {
					formObj.shpr_trdp_cd.style.color= "#000000";
					formObj.shpr_trdp_nm.style.color= "#000000";
				}
			}
			
		}else if(codType == "consignee"){
			
			formObj.cnee_trdp_nm.style.color= "#000000";
			formObj.cnee_trdp_cd.style.color= "#000000";
			
			if(rtnValAry[0]==''){
				//formObj.cnee_trdp_cd.focus();
			}else{
				if(rtnValAry[13] == 'KO'){
					
				} else if(rtnValAry[13] == 'CR'){
					var crdLmtAmt=rtnValAry[14]==""?0:eval(rtnValAry[14]);
					var curLmtAmt=rtnValAry[15]==""?0:eval(rtnValAry[15]);
					var balLmtAmt=crdLmtAmt - curLmtAmt;
					var overDueAmt=rtnValAry[29]==""?0:eval(rtnValAry[29]);
					var grandTotal=rtnValAry[31]==""?0:eval(rtnValAry[31]);
					
					if(crdLmtAmt > 0) {
						if(overDueAmt > 0 && balLmtAmt < 0  ){
							var objArr=new Array();
							objArr[0]=doMoneyFmt(roundXL(Number(balLmtAmt*(-1)),2).toFixed(2));
							if(copyFlg && !copyAltFlg){
								alert(getLabel2('COM_FRT_CFM008', objArr));
								copyAltFlg = true;
							}
							formObj.cnee_trdp_nm.style.color= "#ff0000";
							formObj.cnee_trdp_cd.style.color= "#ff0000";
						} else if (balLmtAmt < 0  ){
							var objArr=new Array();
							objArr[0]=doMoneyFmt(roundXL(Number(balLmtAmt*(-1)),2).toFixed(2));
							if(copyFlg && !copyAltFlg){
								alert(getLabel2('COM_FRT_CFM006', objArr));
								copyAltFlg = true;
							}
							formObj.cnee_trdp_nm.style.color= "#ff0000";
							formObj.cnee_trdp_cd.style.color= "#ff0000";
						} else if (overDueAmt > 0 ) {
							var objArr=new Array();
							objArr[0]=doMoneyFmt(roundXL(Number(grandTotal),2).toFixed(2));
							if(copyFlg && !copyAltFlg){
								alert(getLabel2('COM_FRT_CFM007', objArr));
								copyAltFlg = true;
							}
							formObj.cnee_trdp_nm.style.color= "#ff0000";
							formObj.cnee_trdp_cd.style.color= "#ff0000";
						} else {
							formObj.cnee_trdp_nm.style.color= "#000000";
							formObj.cnee_trdp_cd.style.color= "#000000";
						}
					} else {
						formObj.cnee_trdp_nm.style.color= "#000000";
						formObj.cnee_trdp_cd.style.color= "#000000";
					}
					
				} else if(rtnValAry[13] == 'CH'){
					if(copyFlg && !copyAltFlg){
						alert(getLabel('COM_FRT_CFM005'));
						copyAltFlg = true;
					}
					formObj.cnee_trdp_nm.style.color= "#ff0000";
					formObj.cnee_trdp_cd.style.color= "#ff0000";
				} else if(rtnValAry[13] == 'CO'){
					if(copyFlg && !copyAltFlg){
						alert(getLabel('COM_FRT_ALT001'));
						copyAltFlg = true;
					}
					formObj.cnee_trdp_nm.style.color= "#ff0000";
					formObj.cnee_trdp_cd.style.color= "#ff0000";
				} else {
					formObj.cnee_trdp_nm.style.color= "#000000";
					formObj.cnee_trdp_cd.style.color= "#000000";
				}
				
				if(blSameAsCneeYn == 'Y'){ //BNX 가 아닐 경우만 해당
					if(typeof(formObj.ntfy_trdp_cd) != "undefined"){
						if(rtnValAry[13] == 'CH'){
							formObj.ntfy_trdp_nm.style.color= "#ff0000";
							formObj.ntfy_trdp_cd.style.color= "#ff0000";
						}else{
							formObj.ntfy_trdp_nm.style.color= "#000000";
							formObj.ntfy_trdp_cd.style.color= "#000000";
						}
					}
				}
			}
		}else if(codType == "notify"){
			
			formObj.ntfy_trdp_nm.style.color= "#000000";
			formObj.ntfy_trdp_cd.style.color= "#000000";
			
			if(rtnValAry[13] == 'KO'){
				
			} else if(rtnValAry[13] == 'CR'){
				var crdLmtAmt=rtnValAry[14]==""?0:eval(rtnValAry[14]);
				var curLmtAmt=rtnValAry[15]==""?0:eval(rtnValAry[15]);
				var balLmtAmt=crdLmtAmt - curLmtAmt;
				var overDueAmt=rtnValAry[29]==""?0:eval(rtnValAry[29]);
				var grandTotal=rtnValAry[31]==""?0:eval(rtnValAry[31]);
				
				if(crdLmtAmt > 0) {
					if(overDueAmt > 0 && balLmtAmt < 0  ){
						var objArr=new Array();
						objArr[0]=doMoneyFmt(roundXL(Number(balLmtAmt*(-1)),2).toFixed(2));
						if(copyFlg && !copyAltFlg){
							alert(getLabel2('COM_FRT_CFM008', objArr));
							copyAltFlg = true;
						}
						formObj.ntfy_trdp_nm.style.color= "#ff0000";
						formObj.ntfy_trdp_cd.style.color= "#ff0000";
					} else if (balLmtAmt < 0  ){
						var objArr=new Array();
						objArr[0]=doMoneyFmt(roundXL(Number(balLmtAmt*(-1)),2).toFixed(2));
						if(copyFlg && !copyAltFlg){
							alert(getLabel2('COM_FRT_CFM006', objArr));
							copyAltFlg = true;
						}
						formObj.ntfy_trdp_nm.style.color= "#ff0000";
						formObj.ntfy_trdp_cd.style.color= "#ff0000";
					} else if (overDueAmt > 0 ) {
						var objArr=new Array();
						objArr[0]=doMoneyFmt(roundXL(Number(grandTotal),2).toFixed(2));
						if(copyFlg && !copyAltFlg){
							alert(getLabel2('COM_FRT_CFM007', objArr));
							copyAltFlg = true;
						}
						formObj.ntfy_trdp_nm.style.color= "#ff0000";
						formObj.ntfy_trdp_cd.style.color= "#ff0000";
					} else {
						formObj.ntfy_trdp_nm.style.color= "#000000";
						formObj.ntfy_trdp_cd.style.color= "#000000";
					}
				} else {
					formObj.ntfy_trdp_nm.style.color= "#000000";
					formObj.ntfy_trdp_cd.style.color= "#000000";
				}
			
			} else if(rtnValAry[13] == 'CH'){
				if(copyFlg && !copyAltFlg){
					alert(getLabel('COM_FRT_CFM005'));
					copyAltFlg = true;
				}
				formObj.ntfy_trdp_nm.style.color= "#ff0000";
				formObj.ntfy_trdp_cd.style.color= "#ff0000";
			} else if(rtnValAry[13] == 'CO'){
				if(copyFlg && !copyAltFlg){
					alert(getLabel('COM_FRT_ALT001'));
					copyAltFlg = true;
				}
				formObj.ntfy_trdp_nm.style.color= "#ff0000";
				formObj.ntfy_trdp_cd.style.color= "#ff0000";
			} else {
				formObj.ntfy_trdp_nm.style.color= "#000000";
				formObj.ntfy_trdp_cd.style.color= "#000000";
			}
		}else if(codType == "ashipper"){
			
			formObj.act_shpr_trdp_cd.style.color= "#000000";
			formObj.act_shpr_trdp_nm.style.color= "#000000";
			
			if(rtnValAry[13] == 'KO'){
			
			} else if(rtnValAry[13] == 'CH'){
				if(copyFlg && !copyAltFlg){
					alert(getLabel('COM_FRT_CFM005'));
					copyAltFlg = true;
				}
				formObj.act_shpr_trdp_cd.style.color= "#ff0000";
				formObj.act_shpr_trdp_nm.style.color= "#ff0000";
				
			} else if(rtnValAry[13] == 'CR'){
				var crdLmtAmt=rtnValAry[14]==""?0:eval(rtnValAry[14]);
				var curLmtAmt=rtnValAry[15]==""?0:eval(rtnValAry[15]);
				var balLmtAmt=crdLmtAmt - curLmtAmt;
				var overDueAmt=rtnValAry[29]==""?0:eval(rtnValAry[29]);
				var grandTotal=rtnValAry[31]==""?0:eval(rtnValAry[31]);
				
				if(crdLmtAmt > 0) {
					if(overDueAmt > 0 && balLmtAmt < 0  ){
						var objArr=new Array();
						objArr[0]=doMoneyFmt(roundXL(Number(balLmtAmt*(-1)),2).toFixed(2));
						try {creditOver=true;}catch(e){};
						if(copyFlg && !copyAltFlg){
							alert(getLabel2('COM_FRT_CFM008', objArr));
							copyAltFlg = true;
						}
						formObj.act_shpr_trdp_cd.style.color= "#ff0000";
						formObj.act_shpr_trdp_nm.style.color= "#ff0000";
					} else if (balLmtAmt < 0  ){
						var objArr=new Array();
						objArr[0]=doMoneyFmt(roundXL(Number(balLmtAmt*(-1)),2).toFixed(2));
						try {creditOver=true;}catch(e){};
						if(copyFlg && !copyAltFlg){
							alert(getLabel2('COM_FRT_CFM006', objArr));
							copyAltFlg = true;
						}
						formObj.act_shpr_trdp_cd.style.color= "#ff0000";
						formObj.act_shpr_trdp_nm.style.color= "#ff0000";
					} else if (overDueAmt > 0 ) {
						try {creditOver=false;}catch(e){};
						var objArr=new Array();
						objArr[0]=doMoneyFmt(roundXL(Number(grandTotal),2).toFixed(2));
						if(copyFlg && !copyAltFlg){
							alert(getLabel2('COM_FRT_CFM007', objArr));
							copyAltFlg = true;
						}
						formObj.act_shpr_trdp_cd.style.color= "#ff0000";
						formObj.act_shpr_trdp_nm.style.color= "#ff0000";
					} else {
						try {creditOver=false;}catch(e){};
						formObj.act_shpr_trdp_cd.style.color= "#000000";
						formObj.act_shpr_trdp_nm.style.color= "#000000";
					}
				} else {
					try {creditOver=false;}catch(e){};
					formObj.act_shpr_trdp_cd.style.color= "#000000";
					formObj.act_shpr_trdp_nm.style.color= "#000000";
				}
			}else if(rtnValAry[13] == 'CO'){
				try {creditOver=false;}catch(e){};
				if(copyFlg && !copyAltFlg){
					alert(getLabel('COM_FRT_ALT001'));
					copyAltFlg = true;
				}
				formObj.act_shpr_trdp_cd.style.color= "#ff0000";
				formObj.act_shpr_trdp_nm.style.color= "#ff0000";
			}
		}else if(codType == "anotify"){
			
		}else if(codType == "liner"){
			
			if(rtnValAry[13] == 'CO'){
				if(copyFlg && !copyAltFlg){
					alert(getLabel('COM_FRT_ALT001'));
					copyAltFlg = true;
				}
				formObj.lnr_trdp_cd.style.color= "#ff0000";
				formObj.lnr_trdp_nm.style.color= "#ff0000";
			} else {
				formObj.lnr_trdp_cd.style.color= "#000000";
				formObj.lnr_trdp_nm.style.color= "#000000";
			}
			
		}else if(codType == "console"){
			
			if(rtnValAry[13] == 'CO'){
				if(copyFlg && !copyAltFlg){
					alert(getLabel('COM_FRT_ALT001'));
					copyAltFlg = true;
				}
				formObj.agt_trdp_cd.style.color= "#ff0000";
				formObj.agt_trdp_nm.style.color= "#ff0000";
			} else {
				formObj.agt_trdp_cd.style.color= "#000000";
				formObj.agt_trdp_nm.style.color= "#000000";
			}
			
		}else if(codType == "partner"){
			
			formObj.prnr_trdp_cd.style.color= "#000000";
			formObj.prnr_trdp_nm.style.color= "#000000";
			
			var crdLmtAmt=rtnValAry[14]==""?0:eval(rtnValAry[14]);
			var curLmtAmt=rtnValAry[15]==""?0:eval(rtnValAry[15]);
			var balLmtAmt=crdLmtAmt - curLmtAmt;
			var overDueAmt=rtnValAry[29]==""?0:eval(rtnValAry[29]);
			var grandTotal=rtnValAry[31]==""?0:eval(rtnValAry[31]);
			
			if(crdLmtAmt > 0) {
				if(overDueAmt > 0 && rtnValAry[13] == 'CR' && crdLmtAmt - curLmtAmt < 0  ){
					var objArr=new Array();
					objArr[0]=doMoneyFmt(roundXL(Number(balLmtAmt*(-1)),2).toFixed(2));
					if(copyFlg && !copyAltFlg){
						alert(getLabel2('COM_FRT_CFM008', objArr));
						copyAltFlg = true;
					}
					formObj.prnr_trdp_cd.style.color= "#ff0000";
					formObj.prnr_trdp_nm.style.color= "#ff0000";
				} else if (rtnValAry[13] == 'CR' && crdLmtAmt - curLmtAmt < 0  ){
					var objArr=new Array();
					objArr[0]=doMoneyFmt(roundXL(Number(balLmtAmt*(-1)),2).toFixed(2));
					if(copyFlg && !copyAltFlg){
						alert(getLabel2('COM_FRT_CFM008', objArr));
						copyAltFlg = true;
					}
					formObj.prnr_trdp_cd.style.color= "#ff0000";
					formObj.prnr_trdp_nm.style.color= "#ff0000";
				} else if (rtnValAry[13] == 'CR' && overDueAmt > 0 ) {
					var objArr=new Array();
					objArr[0]=doMoneyFmt(roundXL(Number(grandTotal),2).toFixed(2));
					if(copyFlg && !copyAltFlg){
						alert(getLabel2('COM_FRT_CFM008', objArr));
						copyAltFlg = true;
					}
					formObj.prnr_trdp_cd.style.color= "#ff0000";
					formObj.prnr_trdp_nm.style.color= "#ff0000";
				}
			}
		}else if(codType == "agent"){
			
			if(cur_airSeaTp == "S" && cur_bizTp == "M"){
				if(rtnValAry[13] == 'CR'){
					var crdLmtAmt=rtnValAry[14]==""?0:eval(rtnValAry[14]);
					var curLmtAmt=rtnValAry[15]==""?0:eval(rtnValAry[15]);
					var balLmtAmt=crdLmtAmt - curLmtAmt;
					var overDueAmt=rtnValAry[29]==""?0:eval(rtnValAry[29]);
					var grandTotal=rtnValAry[31]==""?0:eval(rtnValAry[31]);
					
					if(crdLmtAmt > 0) {
						if(overDueAmt > 0 && balLmtAmt < 0  ){
							var objArr=new Array();
							objArr[0]=doMoneyFmt(roundXL(Number(balLmtAmt*(-1)),2).toFixed(2));
							if(copyFlg && !copyAltFlg){
								alert(getLabel2('COM_FRT_CFM008', objArr));
								copyAltFlg = true;
							}
							formObj.agent_trdp_cd.style.color= "#ff0000";
							formObj.agent_trdp_nm.style.color= "#ff0000";
						} else if (balLmtAmt < 0  ){
							var objArr=new Array();
							objArr[0]=doMoneyFmt(roundXL(Number(balLmtAmt*(-1)),2).toFixed(2));
							if(copyFlg && !copyAltFlg){
								alert(getLabel2('COM_FRT_CFM006', objArr));
								copyAltFlg = true;
							}
							formObj.agent_trdp_cd.style.color= "#ff0000";
							formObj.agent_trdp_nm.style.color= "#ff0000";
						} else if (overDueAmt > 0 ) {
							var objArr=new Array();
							objArr[0]=doMoneyFmt(roundXL(Number(grandTotal),2).toFixed(2));
							if(copyFlg && !copyAltFlg){
								alert(getLabel2('COM_FRT_CFM007', objArr));
								copyAltFlg = true;
							}
							formObj.agent_trdp_cd.style.color= "#ff0000";
							formObj.agent_trdp_nm.style.color= "#ff0000";
						} else {
							formObj.agent_trdp_cd.style.color= "#000000";
							formObj.agent_trdp_nm.style.color= "#000000";
						}
					} else {
						formObj.agent_trdp_cd.style.color= "#000000";
						formObj.agent_trdp_nm.style.color= "#000000";
					}
					 
				} else if(rtnValAry[13] == 'CO'){
					if(copyFlg && !copyAltFlg){
						alert(getLabel('COM_FRT_ALT001'));
						copyAltFlg = true;
					}
					formObj.agent_trdp_cd.style.color= "#ff0000";
					formObj.agent_trdp_nm.style.color= "#ff0000";
				}
				
			} else {
				 if(rtnValAry[13] == 'CO'){
					if(copyFlg && !copyAltFlg){
						alert(getLabel('COM_FRT_ALT001'));
						copyAltFlg = true;
					}
					formObj.agent_trdp_cd.style.color= "#ff0000";
					formObj.agent_trdp_nm.style.color= "#ff0000";
				}
			}
		}else if(codType == "third"){
			if(rtnValAry[13] == 'CO'){
				
				if(copyFlg && !copyAltFlg){
					alert(getLabel('COM_FRT_ALT001'));
					copyAltFlg = true;
				}
				formObj.third_trdp_cd.style.color= "#ff0000";
				formObj.third_trdp_nm.style.color= "#ff0000";
			} else {
				formObj.third_trdp_cd.style.color= "#000000";
				formObj.third_trdp_nm.style.color= "#000000";
			}
		}else if(codType == "partner2"){
			if(cur_bizTp == "M"){
				if(rtnValAry[13] == 'CR'){
					var crdLmtAmt=rtnValAry[14]==""?0:eval(rtnValAry[14]);
					var curLmtAmt=rtnValAry[15]==""?0:eval(rtnValAry[15]);
					var balLmtAmt=crdLmtAmt - curLmtAmt;
					var overDueAmt=rtnValAry[29]==""?0:eval(rtnValAry[29]);
					var grandTotal=rtnValAry[31]==""?0:eval(rtnValAry[31]);
					
					if(crdLmtAmt > 0) {
						if(overDueAmt > 0 && balLmtAmt < 0  ){
							var objArr=new Array();
							objArr[0]=doMoneyFmt(roundXL(Number(balLmtAmt*(-1)),2).toFixed(2));
							if(copyFlg && !copyAltFlg){
								alert(getLabel2('COM_FRT_CFM008', objArr));
								copyAltFlg = true;
							}
							formObj.prnr_trdp_cd2.style.color= "#ff0000";
							formObj.prnr_trdp_nm2.style.color= "#ff0000";
						} else if (balLmtAmt < 0  ){
							var objArr=new Array();
							objArr[0]=doMoneyFmt(roundXL(Number(balLmtAmt*(-1)),2).toFixed(2));
							if(copyFlg && !copyAltFlg){
								alert(getLabel2('COM_FRT_CFM006', objArr));
								copyAltFlg = true;
							}
							formObj.prnr_trdp_cd2.style.color= "#ff0000";
							formObj.prnr_trdp_nm2.style.color= "#ff0000";
						} else if (overDueAmt > 0 ) {
							var objArr=new Array();
							objArr[0]=doMoneyFmt(roundXL(Number(grandTotal),2).toFixed(2));
							if(copyFlg && !copyAltFlg){
								alert(getLabel2('COM_FRT_CFM007', objArr));
								copyAltFlg = true;
							}
							formObj.prnr_trdp_cd2.style.color= "#ff0000";
							formObj.prnr_trdp_nm2.style.color= "#ff0000";
						} else {
							formObj.prnr_trdp_cd2.style.color= "#000000";
							formObj.prnr_trdp_nm2.style.color= "#000000";
						}
					} else {
						formObj.prnr_trdp_cd2.style.color= "#000000";
						formObj.prnr_trdp_nm2.style.color= "#000000";
					}
					 
				} else if(rtnValAry[13] == 'CO'){
					if(copyFlg && !copyAltFlg){
						alert(getLabel('COM_FRT_ALT001'));
						copyAltFlg = true;
					}
					formObj.prnr_trdp_cd2.style.color= "#ff0000";
					formObj.prnr_trdp_nm2.style.color= "#ff0000";
				}
			}else{
				if(rtnValAry[13] == 'CO'){
					if(copyFlg && !copyAltFlg){
						alert(getLabel('COM_FRT_ALT001'));
						copyAltFlg = true;
					}
					formObj.prnr_trdp_cd2.style.color= "#ff0000";
					formObj.prnr_trdp_nm2.style.color= "#ff0000";
				}
			}
		}else if(codType == "rcv"){
			
			if(rtnValAry[13] == 'CO'){
				if(copyFlg && !copyAltFlg){
					alert(getLabel('COM_FRT_ALT001'));
					copyAltFlg = true;
				}
				formObj.rcv_wh_cd.style.color= "#ff0000";
				formObj.rcv_wh_nm.style.color= "#ff0000";
			} else {
				formObj.rcv_wh_cd.style.color= "#000000";
				formObj.rcv_wh_nm.style.color= "#000000";
			}
			
		}else if(codType == "pu"){
			if(rtnValAry[13] == 'CO'){
				if(copyFlg && !copyAltFlg){
					alert(getLabel('COM_FRT_ALT001'));
					copyAltFlg = true;
				}
				formObj.pu_trdp_cd.style.color= "#ff0000";
				formObj.pu_trdp_nm.style.color= "#ff0000";
			} else {
				formObj.pu_trdp_cd.style.color= "#000000";
				formObj.pu_trdp_nm.style.color= "#000000";
			}
		}else if(codType == "cgo_pu"){
			if(rtnValAry[13] == 'CO'){
				if(copyFlg && !copyAltFlg){
					alert(getLabel('COM_FRT_ALT001'));
					copyAltFlg = true;
				}
				formObj.cgo_pu_trdp_cd.style.color= "#ff0000";
				formObj.cgo_pu_trdp_nm.style.color= "#ff0000";
			} else {
				formObj.cgo_pu_trdp_cd.style.color= "#000000";
				formObj.cgo_pu_trdp_nm.style.color= "#000000";
			}
			
		}else if(codType == "carr"){
			if(rtnValAry[13] == 'CO'){
				if(copyFlg && !copyAltFlg){
					alert(getLabel('COM_FRT_ALT001'));
					copyAltFlg = true;
				}
				formObj.carr_trdp_cd.style.color= "#ff0000";
				formObj.carr_trdp_nm.style.color= "#ff0000";
			} else {
				formObj.carr_trdp_cd.style.color= "#000000";
				formObj.carr_trdp_nm.style.color= "#000000";
			}
			
		}else if(codType == "cust"){
			if(rtnValAry[13] == 'CO'){
				if(copyFlg && !copyAltFlg){
					alert(getLabel('COM_FRT_ALT001'));
					copyAltFlg = true;
				}
				formObj.cust_trdp_cd.style.color= "#ff0000";
				formObj.cust_trdp_nm.style.color= "#ff0000";
			}else if(rtnValAry[13] == 'CH'){
				if(copyFlg && !copyAltFlg){
					alert(getLabel('COM_FRT_CFM005'));
					copyAltFlg = true;
				}
				formObj.cust_trdp_cd.style.color= "#ff0000";
				formObj.cust_trdp_nm.style.color= "#ff0000";
			} else {
				formObj.cust_trdp_cd.style.color= "#000000";
				formObj.cust_trdp_nm.style.color= "#000000";
			}

		}else if(codType == "cust_oth"){
			if(rtnValAry[13] == 'CO'){
				if(copyFlg && !copyAltFlg){
					alert(getLabel('COM_FRT_ALT001'));
					copyAltFlg = true;
				}
				formObj.cust_cd.style.color= "#ff0000";
				formObj.cust_nm.style.color= "#ff0000";
			}else if(rtnValAry[13] == 'CH'){
				if(copyFlg && !copyAltFlg){
					alert(getLabel('COM_FRT_CFM005'));
					copyAltFlg = true;
				}
				formObj.cust_trdp_cd.style.color= "#ff0000";
				formObj.cust_trdp_nm.style.color= "#ff0000";
			} else {
				formObj.cust_cd.style.color= "#000000";
				formObj.cust_nm.style.color= "#000000";
			}
			
		}else if(codType == "carr1"){
			if(rtnValAry[13] == 'CO'){
				if(copyFlg && !copyAltFlg){
					alert(getLabel('COM_FRT_ALT001'));
					copyAltFlg = true;
				}
				formObj.carr_trdp_cd1.style.color= "#ff0000";
				formObj.carr_trdp_nm1.style.color= "#ff0000";
			} else {
				formObj.carr_trdp_cd1.style.color= "#000000";
				formObj.carr_trdp_nm1.style.color= "#000000";
			}
			
		}else if(codType == "cy"){
			if(rtnValAry[13] == 'CO'){
				if(copyFlg && !copyAltFlg){
					alert(getLabel('COM_FRT_ALT001'));
					copyAltFlg = true;
				}
				formObj.cy_trdp_cd.style.color= "#ff0000";
				formObj.cy_trdp_nm.style.color= "#ff0000";
			} else {
				formObj.cy_trdp_cd.style.color= "#000000";
				formObj.cy_trdp_nm.style.color= "#000000";
			}
			
		}else if(codType == "cfs"){
			if(rtnValAry[13] == 'CO'){
				if(copyFlg && !copyAltFlg){
					alert(getLabel('COM_FRT_ALT001'));
					copyAltFlg = true;
				}
				formObj.cfs_trdp_cd.style.color= "#ff0000";
				formObj.cfs_trdp_nm.style.color= "#ff0000";
			} else {
				formObj.cfs_trdp_cd.style.color= "#000000";
				formObj.cfs_trdp_nm.style.color= "#000000";
			}
			
		}else if(codType == "door"){
			if(rtnValAry[13] == 'CO'){
				if(copyFlg && !copyAltFlg){
					alert(getLabel('COM_FRT_ALT001'));
					copyAltFlg = true;
				}
				formObj.door_loc_cd.style.color= "#ff0000";
				formObj.door_loc_nm.style.color= "#ff0000";
			} else {
				formObj.door_loc_cd.style.color= "#000000";
				formObj.door_loc_nm.style.color= "#000000";
			}
			//OFVFOUR-7736 [SENKO USA] Consignee and Delivery Location
			formObj.lgl_addr.value = rtnValAry[16];
			
		}else if(codType == "rt"){
			if(rtnValAry[13] == 'CO'){
				if(copyFlg && !copyAltFlg){
					alert(getLabel('COM_FRT_ALT001'));
					copyAltFlg = true;
				}
				formObj.rt_trdp_cd.style.color= "#ff0000";
				formObj.rt_trdp_nm.style.color= "#ff0000";
			} else {
				formObj.rt_trdp_cd.style.color= "#000000";
				formObj.rt_trdp_nm.style.color= "#000000";
			}
			
		}else if(codType == "wh"){
			if(rtnValAry[13] == 'CO'){
				if(copyFlg && !copyAltFlg){
					alert(getLabel('COM_FRT_ALT001'));
					copyAltFlg = true;
				}
				formObj.fnl_wh_cd.style.color= "#ff0000";
				formObj.fnl_wh_nm.style.color= "#ff0000";
			} else {
				formObj.fnl_wh_cd.style.color= "#000000";
				formObj.fnl_wh_nm.style.color= "#000000";
			}
			
		}else if(codType == "bond"){
			if(rtnValAry[13] == 'CO'){
				if(copyFlg && !copyAltFlg){
					alert(getLabel('COM_FRT_ALT001'));
					copyAltFlg = true;
				}
				formObj.bond_carr_cd.style.color= "#ff0000";
				formObj.bond_carr_nm.style.color= "#ff0000";
			} else {
				formObj.bond_carr_cd.style.color= "#000000";
				formObj.bond_carr_nm.style.color= "#000000";
			}
			
		}else if(codType == "iss"){
			if(rtnValAry[13] == 'CO'){
				if(copyFlg && !copyAltFlg){
					alert(getLabel('COM_FRT_ALT001'));
					copyAltFlg = true;
				}
				formObj.iss_trdp_cd.style.color= "#ff0000";
				formObj.iss_trdp_nm.style.color= "#ff0000";
			} else {
				formObj.iss_trdp_cd.style.color= "#000000";
				formObj.iss_trdp_nm.style.color= "#000000";
			}
		}else if(codType == "frt_loc"){
			if(rtnValAry[13] == 'CO'){
				if(copyFlg && !copyAltFlg){
					alert(getLabel('COM_FRT_ALT001'));
					copyAltFlg = true;
				}
				formObj.frt_loc_cd.style.color= "#ff0000";
				formObj.frt_loc_nm.style.color= "#ff0000";
			} else {
				formObj.frt_loc_cd.style.color= "#000000";
				formObj.frt_loc_nm.style.color= "#000000";
			}
		}else if(codType == "trk"){
			
		}else if(codType == "vndr"){
			if(rtnValAry[13] == 'CO'){
				if(copyFlg && !copyAltFlg){
					alert(getLabel('COM_FRT_ALT001'));
					copyAltFlg = true;
				}
				formObj.vndr_trdp_cd.style.color= "#ff0000";
				formObj.vndr_trdp_nm.style.color= "#ff0000";
			} else {
				formObj.vndr_trdp_cd.style.color= "#000000";
				formObj.vndr_trdp_nm.style.color= "#000000";
			}
		}else if(codType == "warehouse"){
			if(rtnValAry[13] == 'CO'){
				if(copyFlg && !copyAltFlg){
					alert(getLabel('COM_FRT_ALT001'));
					copyAltFlg = true;
				}
				formObj.wh_trdp_cd.style.color= "#ff0000";
				formObj.wh_trdp_nm.style.color= "#ff0000";
			} else {
				formObj.wh_trdp_cd.style.color= "#000000";
				formObj.wh_trdp_nm.style.color= "#000000";
			}
			
		}else if(codType == "forwarder"){
			if(rtnValAry[13] == 'CO'){
				if(copyFlg && !copyAltFlg){
					alert(getLabel('COM_FRT_ALT001'));
					copyAltFlg = true;
				}
				formObj.fwrd_agn_trdp_cd.style.color= "#ff0000";
				formObj.fwrd_agn_trdp_nm.style.color= "#ff0000";
			} else {
				formObj.fwrd_agn_trdp_cd.style.color= "#000000";
				formObj.fwrd_agn_trdp_nm.style.color= "#000000";
			}
		}
	}
}


function addItemInfo(sheet){
	var formObj=document.frm1;
	var cnt=sheet.LastRow();
	var mk_tmp	="";
	var desc_tmp="";
	if(cnt > sheet.HeaderRows()){
		if(formObj.mk_txt.value != ""){
			mk_tmp="\r\n";
		}
		
		if(formObj.desc_txt.value != ""){
			desc_tmp="\r\n";
		}
	}
	
	for(var i = 2 ; i <= cnt ; i++){
		if(sheet.GetCellValue(i, "item_rmk")!=''){
			mk_tmp += sheet.GetCellValue(i, "item_rmk")
			mk_tmp += "\r\n";
		}
		
		if(sheet.GetCellValue(i, "item_shp_cmdt_nm")!=''){
			desc_tmp += sheet.GetCellValue(i, "item_shp_cmdt_nm")
			desc_tmp += "\r\n";
		}
	}
	frm1.mk_txt.value 	+= mk_tmp;
	frm1.desc_txt.value += desc_tmp;
	
}


//#4681 Air Waybill Routing 표기 관련 개선 (v470, v5반영 필요)
function setDestination(){
	var formObj=document.frm1;
	var tempLocCd ="";
	
	if(formObj.ts3_port_cd.value !=""){
		tempLocCd = formObj.ts3_port_cd.value; // Use TS3, if exists.
	}else if(formObj.ts2_port_cd.value !=""){
		tempLocCd = formObj.ts2_port_cd.value; // Use TS2, if exists.
	}else if(formObj.ts1_port_cd.value !=""){
		tempLocCd = formObj.ts1_port_cd.value; // Use TS1, if exists.
	}
	
	if(tempLocCd !=""){
		if(tempLocCd!=formObj.pod_cd.value){
			formObj.pod_cd.value=tempLocCd;
			$("#pod_cd" ).blur();
		}
	}
}


//#5241 컨테이너 삭제 시  ITEM List 컨테이너 삭제(동기화 처리)
//cntr List  Del All 클릭시  ITem List에서 해당 컨테이너 항목도 check or uncheck 해준다
function comCntrList_OnCheckAllEnd(cntrObj, col, val , itemObj){
	if(1 == val){
		var checkItem = allCheckItem(cntrObj, itemObj); 
		
		if(checkItem > 0){
			if(confirm(getLabel('FMS_COM_ALT160'))){
				allItemListCheckYN(cntrObj, itemObj, '');   //ITem List에서 해당CNTR 전체 선택
			}else{
				cntrObj.ClearHeaderCheck();
				cntrObj.CheckAll("Del", 0, 0);//전체선택시 Onchange 이벤트 발생안함 OnCheckAllEnd는 발생함
			}
		}		
	}else{
		allItemListCheckYN(cntrObj, itemObj, '');           //ITem List에서 해당CNTR 전체 선택 해제
	}
}

function allCheckItem(cntrObj, itemObj){
	for(var i=cntrObj.HeaderRows(); i <= cntrObj.LastRow(); i++) {
		var seqCnt = checkItem(cntrObj, i, itemObj);
		if (seqCnt > 0) return 1;
	}
	return 0;
}

function checkItem(cntrObj, row, itemObj){
	for(var j=itemObj.HeaderRows(); j <= itemObj.LastRow(); j++) {
		if(cntrObj.GetCellValue(row, 'cntr_list_seq') == itemObj.GetCellValue(j, 'item_cntr_list_seq')){
			if(cntrObj.GetCellValue(row, 'Del') == 1 && itemObj.GetCellValue(j, 'Del') != 1 ){
				return 1;
			}
		}
	}
	return 0;
}


function allItemListCheckYN(cntrObj, itemObj, checked){
	
	for(var i=cntrObj.HeaderRows(); i <= cntrObj.LastRow(); i++) {
		itemListCheckYN(cntrObj,i, itemObj, checked);
	}
}

function itemListCheckYN(cntrObj,row, itemObj, checked){
	for(var j=itemObj.HeaderRows(); j <= itemObj.LastRow(); j++) {
		if(cntrObj.GetCellValue(row, 'cntr_list_seq') == itemObj.GetCellValue(j, 'item_cntr_list_seq')){
			
			if(checked == 'Y'){
				if(cntrObj.GetCellValue(row, 'Del') == 1 ){
					itemObj.SetCellValue(j, 'Del', 1);
				}
			}else{
				itemObj.SetCellValue(j, 'Del', cntrObj.GetCellValue(row, 'Del'));
			}
		}
	}
}


//#5241 컨테이너 삭제 시  ITEM List 컨테이너 삭제(동기화 처리)
//cntr List  Del 클릭시  ITem List에서 해당 컨테이너 항목도 check or uncheck 해준다
function comCntrList_OnChange(cntrObj, row, col, value, itemObj){
	var seqCnt = checkItem(cntrObj, row, itemObj);
	
	if(seqCnt > 0 && value == 1){
		if(confirm(getLabel('FMS_COM_ALT160'))){
			itemListCheckYN(cntrObj, row, itemObj, '');  //ITem List에서 해당CNTR 선택
		}else{
			cntrObj.SetCellValue(row,'Del',0, 0);     
		}
	}else{
		itemListCheckYN(cntrObj, row, itemObj, '');  //ITem List에서 해당CNTR 선택 해제
	}
}


//#5241 컨테이너 삭제 시  ITEM List 컨테이너 삭제(동기화 처리)
//OEH,OIH BL 저장시  cntr List Del check  ITem List에서 해당 컨테이너 항목도 check 해준다
function comCntrDelCheckVals(cntrObj, itemObj){
	var isError=false;
	var checkItem = allCheckItem(cntrObj, itemObj); 
	
	if(checkItem > 0){
		if(confirm(getLabel('FMS_COM_ALT160'))){
			//ITem List에서  check 된 CNTR 선택
			allItemListCheckYN(cntrObj, itemObj , 'Y');   
			isError=false;
		}else{
			
			isError=true;
		}
	}
	return isError;
}
//조회 완료 전 TAB 이동 시 그리드 잔상 버그 처리 
function comGMProcessChk(){
	var rtn = false;
	var gmProcessCnt = $('.GMProcess').length;
	//console.log("comGMProcessChk gmProcessCnt :"+gmProcessCnt);
	if(length > 0){
		for(var i = 0; i < gmProcessCnt; i++){
			var display = $('.GMProcess')[i].style.display;
			var visibility = $('.GMProcess')[i].style.visibility;
			/*console.log("GMProcess display ("+ i + "):["+display +"]");
			console.log("GMProcess visibility ("+ i + "):["+visibility +"]");*/
			if(visibility=="visible" && display==""){
				//console.log("Search Waiting");
				rtn = true;
				return rtn;
			}
		}
	}
}
function comIBSheetWaitChk(){
	//IE 오류로 수정 
	//event.preventDefault();
	//event.preventDefault ? event.preventDefault() : (event.returnValue = false);
	if( navigator.userAgent.indexOf('Chrome') >= 0 ) {//크롬에서만 처리 함 
		event.preventDefault();
	}else{
		//event.returnValue = false
	}
	$(this).parent().addClass("nowTab").siblings().removeClass("nowTab");
	if(comGMProcessChk()){
		/*console.log("goTabSelect Search Waiting");
		console.log(navigator.userAgent.indexOf('Chrome'));
		console.log(navigator.userAgent);*/
		
		//event.preventDefault();
		//$(this).parent().addClass("nowTab").siblings().removeClass("nowTab");
		
		if( navigator.userAgent.indexOf('Chrome') >= 0 ) {//크롬에서만 처리 함 
			if (event.stopPropagation) event.stopImmediatePropagation();
		}else{
			event.cancelBubble = true;
		}
		return false;//waiting
		//ie 경우 체크 $($(ulTab).children()[0]).attr("class");
	}else{//조회 완료 전 TAB 이동 시 그리드 잔상 버그 처리 : 추가1
		if (typeof(loadDataProcess) == 'undefined') { 
			//console.log("loadDataProcess3 undefined");
			return true; 
		}
		if(loadDataProcess != ''){
			//event.preventDefault();
			//$(this).parent().addClass("nowTab").siblings().removeClass("nowTab");
			
			if( navigator.userAgent.indexOf('Chrome') >= 0 ) {//크롬에서만 처리 함 
				if (event.stopPropagation) event.stopImmediatePropagation();
			}else{
				event.cancelBubble = true;
			}
			return false//waiting
		}
	}
}
//OFVFOUR-6866 - [BNX-LA] Selecting multi-Warehouse Receipt from B/L Entry screen (Zen#3533)
var wh_recp_no_exists="";
var wh_recp_no_exists_sql="";
var multiWhFlg = "";
var clickWHflg=false;
function updateMultiWh_recp_no(val){
	var sheetObj;
	var listWh_recp_no_exists=[];
	var listWh_recp_no_save=[];
	if(val=='S'){
		sheetObj = docObjects[1];
	}else if (val=='SI'){
		sheetObj = docObjects[11];
	}else if (val=='AI'){
		sheetObj = docObjects[7];
	}else{
		sheetObj = docObjects[1];
	}
	var addNewWhFlg=false;
	//List Wh_recp_no exists in grid
	for(var i=2 ; i <= sheetObj.LastRow() ; i++){
		var dim_wh_recp_no = sheetObj.GetCellValue(i, "dim_wh_recp_no");
		if(listWh_recp_no_exists.indexOf(dim_wh_recp_no)==-1 && dim_wh_recp_no != '' && sheetObj.GetRowStatus(i)!='I'){
			listWh_recp_no_exists.push(dim_wh_recp_no);
		}
		if(listWh_recp_no_save.indexOf(dim_wh_recp_no)==-1 && dim_wh_recp_no != '' && sheetObj.GetCellValue(i,'del')==0){
			listWh_recp_no_save.push(dim_wh_recp_no);
			if(sheetObj.GetCellValue(i,'dim_ibflag')=='I'){
				addNewWhFlg=true;
			}
		}
	}
	if(listWh_recp_no_exists.length>0){
		wh_recp_no_exists_sql = "'"+listWh_recp_no_exists.join("','")+"'";
	}else{
		wh_recp_no_exists_sql = "";
	}
	if(listWh_recp_no_save.length>0 && addNewWhFlg && clickWHflg){
		wh_recp_no_exists = listWh_recp_no_save.join("@^^@");
	}else{
		wh_recp_no_exists = "";
	}
	frm1.wh_recp_no.value = wh_recp_no_exists;
}
function setMultiWhFlg(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ){
	    if(doc[1] == "Y"){
	    	multiWhFlg = "Y";
		}else{
			multiWhFlg = "N";
		}
	}else{
		multiWhFlg = "N";
	}
}
function chkCusCredit(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.frm1;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split('@@;');
			var masterVals=rtnArr[0].split('@@^');

			try {creditOver_flg=false;}catch(e){};

			if(masterVals[5] == 'KO'){

			} else if(masterVals[5] == 'CH'){
				try {creditOver_flg=true;}catch(e){};
				formObj.act_shpr_trdp_cd.style.color= "#ff0000";
				formObj.act_shpr_trdp_cd.style.color= "#ff0000";

			} else if(masterVals[5] == 'CR'){
				var crdLmtAmt=masterVals[6]==""?0:eval(masterVals[6]);
				var curLmtAmt=masterVals[7]==""?0:eval(masterVals[7]);
				var balLmtAmt=crdLmtAmt - curLmtAmt;
				var overDueAmt=masterVals[20]==""?0:eval(masterVals[20]);
				var grandTotal=masterVals[22]==""?0:eval(masterVals[22]);

				//[20141217 YJW] #46708
				if(crdLmtAmt > 0) {
					if(overDueAmt > 0 && balLmtAmt < 0  ){
						try {creditOver_flg=true;}catch(e){};
						formObj.act_shpr_trdp_cd.style.color= "#ff0000";
						formObj.act_shpr_trdp_nm.style.color= "#ff0000";

					} else if (balLmtAmt < 0  ){
						try {creditOver_flg=true;}catch(e){};
						formObj.act_shpr_trdp_cd.style.color= "#ff0000";
						formObj.act_shpr_trdp_nm.style.color= "#ff0000";

					} else if (overDueAmt > 0 ) {
						try {creditOver_flg=false;}catch(e){};
						formObj.act_shpr_trdp_cd.style.color= "#ff0000";
						formObj.act_shpr_trdp_nm.style.color= "#ff0000";
					} else {
						try {creditOver_flg=false;}catch(e){};
						formObj.act_shpr_trdp_cd.style.color= "#000000";
						formObj.act_shpr_trdp_nm.style.color= "#000000";
					}
				} else {
					try {creditOver_flg=false;}catch(e){};
					formObj.act_shpr_trdp_cd.style.color= "#000000";
					formObj.act_shpr_trdp_nm.style.color= "#000000";
				}
			} else {
				try {creditOver_flg=false;}catch(e){};
				if(masterVals[6]!='' && masterVals[7]!='' && masterVals[6]<masterVals[7]){
					formObj.act_shpr_trdp_cd.style.color= "#ff0000";
					formObj.act_shpr_trdp_nm.style.color= "#ff0000";
				} else {
					formObj.act_shpr_trdp_cd.style.color= "#000000";
					formObj.act_shpr_trdp_nm.style.color= "#000000";
				}
			}
		}
	}
}
function chkCredit(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var formObj=document.frm1;
	if(doc[0]=='OK'){		
		if(typeof(doc[1]) !="undefined"){
			var rtnArr=doc[1].split('@@;');
			var masterVals=rtnArr[0].split('@@^');			
			if(masterVals[4] == "Y"){
				frm1.f_credit_flg.value ="Y";
			}
		}
	}
}
//OFVFOUR-7911 [AIF] MANAGING/ALERT CUSTOMER'S OUTSTANDING (OVERDUE)
function setOverAmtCurrFlg(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined ){
		TP_OVER_AMT_FLG = doc[1];
	}else{
		TP_OVER_AMT_FLG = "";
	}
}
//OFVFOUR-7976: [MATRIX] ADDING CS PIC ON ALL B/L ENTRY AND TRADE PARTNER ENTRY SCREEN
function changeCSType(){

	var formObj=document.frm1;

	var chk_trdp_cd = "";
	var chk_partner_yn = "";
	var chk_cur_bizTp = "H";


	if(BL_CS_MAN_DFLT == "A" && formObj.act_shpr_trdp_cd){
		chk_trdp_cd = formObj.act_shpr_trdp_cd.value;
		chk_partner_yn = "N"
	} else {
		if(formObj.nomi_flg && formObj.nomi_flg.value == "Y" && formObj.prnr_trdp_cd){
			chk_trdp_cd = formObj.prnr_trdp_cd.value;
			chk_partner_yn = "Y"
		}else{
			if (formObj.act_shpr_trdp_cd) {
				chk_trdp_cd = formObj.act_shpr_trdp_cd.value;
				chk_partner_yn = "N"
			}
		}
	}

	setCSMan(chk_trdp_cd,chk_partner_yn,chk_cur_bizTp);
}