/*--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : WHInbkMgmt.js
*@FileTitle  : Inbound Booking Management
*@author     : Kieu.Le - DOU Network
*@version    : 1.0
*@since      : 2015/04/21
=========================================================--*/

//--------------------------------------------------------------------------------------------------------------
//IBSheet  
//--------------------------------------------------------------------------------------------------------------
var sheetCnt=0;
var uploadObjects=new Array();
var firCalFlag=false;

var uploadCnt=0;
var fastOnLoadFlg=true;
var fastOwnerFlg=true; 
var loading_flag="N";
var imgFlg=false;
var ownerFlg = true;
var vendorFlg = true;
var consigneeFlg = true;
var docObjects=new Array();
var rtnary=new Array(2);
var firCalFlag=false;
var callBackFunc = "";
var WMS_QTY_FORMAT2 = "Integer";
var WMS_QTY_POINT = 0;            
var WMS_CBM_POINT = 3;      
var WMS_KGS_POINT = 3; 
var flagTab = false;
var uploadflg =  false;
var FORMAT_CUSTOMER_CD = "0123456789`~!@#$%^&*()_+-=<>?,./[]{}\|;': \"\\";
$(document).ready(function () {
    $.ajaxSetup({ cache: false });
});
/**
* Sheet  onLoad
*/
function loadPage() {
	var formObj=document.form;
	for(var i=0;i<docObjects.length;i++){
	    comConfigSheet(docObjects[i]);
	    initSheet(docObjects[i],i+1);
	    comEndConfigSheet(docObjects[i]);
	}
 	//IBMultiCombo초기화
//    for(var c=0; c<comboObjects.length; c++){
//        initCombo(comboObjects[c], c+1);
//    }
	
    //ComOpenWait(false);
    loading_flag="Y";
//	initControl();
	//디폴트 Search 실행
	if (!isNull(formObj.c_wib_bk_no)) {
		btn_Search();
		formObj.bk_stff_nm.value = formObj.user_nm.value;
	} else {
		//화면 초기화
		wBin_New();		
	}
	//upload 초기화
	//ComConfigUpload(uploadObjects[0], "./addFileWHInbk.clt?FileUploadModule=OMS"); 
//	initUpload();
	//Forwarding Direction 초기값
	setFieldValue(formObj.old_fwd_dir,	formObj.fwd_dir.value);
//	comboObjects[3].SetSelectCode("G");
	formObj.fwd_dir.value = 'G';
	// Kieu Modify:
	ComBtnDisable("btn_reinstate");
	ComBtnDisable("btn_cancel");
	//comboObjects[4].SetSelectCode("F");
	//comboObjects[2].SetSelectIndex(0);
	ComBtnDisable("btn_file_upload");
	ComBtnDisable("btn_file_delete");
	formObj.fwd_dir.value = "G";
	formObj.bk_sts_cd.value = "N";
	formObj.order_rel.value = "P";
	formObj.wb_src_cd.value = "M";
	formObj.ord_tp_cd.value = "G";
	formObj.load_tp_cd.value = "F";
	
	setOldValueAllObj();
	if(formObj.uploadfile.value!="")
		{
			goTabSelect('04');
			btn_Search();
		}
	check_authority_wh();
}
		
/** 
 * initControl()
 */ 
document.onkeydown=form_keyEnter;
function initControl() {
	var formObj=document.form;
    axon_event.addListenerFormat('keypress', 'obj_keypress', document.getElementById("form"));
    axon_event.addListenerForm("beforedeactivate", "frmObj_OnBeforeDeactivate",  document.form);
    axon_event.addListenerFormat("beforeactivate", "frmObj_OnBeforeActivate", document.form);
	axon_event.addListenerForm("change", "form_onChange", formObj);
	axon_event.addListenerForm("keydown", "form_keyEnter", formObj);
}
function form_keyEnter(){
    var backspace=8; 
    var t=document.activeElement;  
    var vKeyCode=event.keyCode;
	var formObj=document.form;
	var srcName=ComGetEvent("name");
	var srcValue=ComGetEvent("value");
    if (vKeyCode == 13) {
		switch (srcName) {
			case "c_wib_bk_no":	
				if (!ComIsNull(srcValue)){
					btn_Search();
				}
				break;		
			default:				
				form_onChange();
				break;
		}
	}
    if (event.keyCode == backspace) { 
        if (t.tagName == "SELECT") {
        	return false;
        } 
        if (t.tagName == "INPUT" && t.getAttribute("readonly") == "readonly"){
        	return false;
        } 
    } 
    return true;
}
var currTab;
function goTabSelect(isNumSep) {
	var formObj=document.form;	
    if( isNumSep == "01" ) { // Header
    	currTab = isNumSep;
    	document.all.Tab01.className="On";
        document.all.Tab02.className="Off";
        document.all.Tab03.className="Off";
        document.all.Tab04.className="Off";      
    } else if( isNumSep == "02" ) { // Booking Item
    	// Booking Item tab 이동시 Warehouse & Forwarding Direction & Contract No 필수 입력 체크
    	currTab = isNumSep;
		if (formObj.warehouse.value == null || formObj.warehouse.value == "") {
			// Warehouse 체크
			ComShowCodeMessage("COM0278", "Warehouse");
			formObj.warehouse.focus();
			return;
		}
		if (formObj.fwd_dir.value == "") {
			// Forwarding Direction 체크
			ComShowCodeMessage("COM0082", "Forwarding Direction");
			return;
		}
		if (isNull(formObj.ctrt_no)) {
			// Contract No 체크
			ComShowCodeMessage("COM0278", "Contract No");
			formObj.ctrt_no.focus();
			return;
		}
    	document.all.Tab01.className="Off";
        document.all.Tab02.className="On";
        document.all.Tab03.className="Off";
        document.all.Tab04.className="Off";
    } else if( isNumSep == "03" ) { // Doc Detail
    	currTab = isNumSep;
    	document.all.Tab01.className="Off";
        document.all.Tab02.className="Off";
        document.all.Tab03.className="On";
        document.all.Tab04.className="Off";
    } else if( isNumSep == "04" ) { // Attachment
    	currTab = isNumSep;
    	document.all.Tab01.className="Off";
        document.all.Tab02.className="Off";
        document.all.Tab03.className="Off";
        document.all.Tab04.className="On"; 
        flagTab = true;
    	btn_Search();
    }
    var tabObjs=document.getElementsByName('tabLayer');
    if(isNumSep=='01') {
		tabObjs[0].style.display='inline';
        tabObjs[1].style.display='none';
        tabObjs[2].style.display='none';
        tabObjs[3].style.display='none';
    }else if(isNumSep=='02') {
		tabObjs[0].style.display='none';
        tabObjs[1].style.display='inline';
        tabObjs[2].style.display='none';
        tabObjs[3].style.display='none';
    }else if(isNumSep=='03') {
		tabObjs[0].style.display='none';
        tabObjs[1].style.display='none';
        tabObjs[2].style.display='inline';
        tabObjs[3].style.display='none';
    }else if(isNumSep=='04') {
		tabObjs[0].style.display='none';
        tabObjs[1].style.display='none';
        tabObjs[2].style.display='none';
        tabObjs[3].style.display='inline';        
    }
    var index = parseInt(isNumSep);
	var count = 0;
	$('.opus_design_tab').find("li").each(function(){
		if(count++ == index - 1){
			$(this).addClass('nowTab');
		}else{
			$(this).removeClass('nowTab');
		}
		resizeSheet();
	});
   // resizeSheet();
}
/**
 * 마우스 아웃일때 
 */
document.onchange=form_onChange;
function form_onChange() {
	var formObj=document.form;
	var sheetObj=docObjects[5];
	var srcName=ComGetEvent("name");
	if(srcName == "wib_bk_no"){
		if( ComGetObjValue(formObj.form_mode) == "NEW" && !isNull(formObj.wib_bk_no)) {
			//WB 존재여부 체크
 			var sXml=sheetObj.GetSearchData("./existsWBInInfoGS.clt", "wib_bk_no="+ComGetObjValue(formObj.wib_bk_no) +"&f_cmd=" + SEARCH01);
 			if(sXml.replace(/^\s+|\s+$/gm,'') != ''){
 				var xmlDoc = $.parseXML(sXml);
 				var $xml1 = $(xmlDoc);
 				var res = $xml1.find("result").text();
 				if(res == 'OK'){
 					ComShowCodeMessage("COM0016");
 					formObj.wib_bk_no.value="";
 					formObj.wib_bk_no.focus();
 				}
 			}
		}
	}else if(srcName == "ctrt_no" && !(formObj.btn_ctrt_no.disabled)){
		if(isNull(formObj.ctrt_no)){
			setFieldValue(formObj.ctrt_no,				"");
			setFieldValue(formObj.ctrt_nm,			"");
			setFieldValue(formObj.sales_ofc_cd,	"");
			//setFieldValue(formObj.sales_ofc_nm,	"");
			//setFieldValue(formObj.sales_pic_id,	"");
			setFieldValue(formObj.sales_pic_nm,	"");
			setFieldValue(formObj.rtp_no,				"");
			setFieldValue(formObj.main_svc_type,"");
			setFieldValue(formObj.main_svc_nm,"");
			//setFieldValue(formObj.supp_cd,		"");
		}else{
			// Contract No 변경시 Booking Item 삭제 체크
			if (!isNull(formObj.ctrt_no)) {
				if (docObjects[2].RowCount()== 0) {
					searchTlCtrtInfo();
				} else {			
					if (ComGetObjValue(formObj.ctrt_no) != ComGetObjValue(formObj.old_ctrt_no)) {
						if (ComShowCodeConfirm("COM0294")) { // PO/Item will be deleted. Are you sure to change?;
							docObjects[2].RemoveAll();
							searchTlCtrtInfo();
						} else {
							setFieldValue(formObj.ctrt_no, ComGetObjValue(formObj.old_ctrt_no));
						}
					}
				}
			}
		}
	}else if(srcName == "rcv_loc_cd" && !(formObj.btn_rcv_loc_cd.disabled)){
		 if(isNull(formObj.rcv_loc_cd)){
			 setTlLocInfoNull("rcv_loc");
		 }else{
			 searchTlLocInfo("rcv_loc", ComGetObjValue(formObj.rcv_loc_cd), "WH"); 
		 }
	}
}

function onblur_Del(srcName) {
	var formObj=document.form;
	if(srcName == "del" && !(formObj.btn_del.disabled)){
		if(isNull(formObj.del)){
			setTlLocInfoNull("del");
		}else{
			searchTlLocInfo("del", ComGetObjValue(formObj.del), "P");			
		}
	}
}

function onblur_Pod(srcName) {
	var formObj=document.form;
	if(srcName == "pod" && !(formObj.btn_pod.disabled)){
		if(isNull(formObj.pod)){
			setTlLocInfoNull("pod");
		}else{
			searchTlLocInfo("pod", ComGetObjValue(formObj.pod), "P");			
		}
	}
}

function onblur_Pol(srcName) {
	var formObj=document.form;
	if(srcName == "pol" && !(formObj.btn_pol.disabled)){
		 if(isNull(formObj.pol)){
			 setTlLocInfoNull("pol");
		 }else{
			 searchTlLocInfo("pol", ComGetObjValue(formObj.pol), "P");			 
		 }
	}

}

function onblur_Carrier(srcName) {
	var formObj=document.form;
	if(srcName == "carrier_cd" && !(formObj.btn_carrier_cd.disabled)){
		if(isNull(formObj.carrier_cd)){
			setFieldValue(formObj.carrier_cd, "");
			setFieldValue(formObj.carrier_nm, "");
		}else{
			searchTlCustInfo("carrier", ComGetObjValue(formObj.carrier_cd));			
		}
	}
}
function searchTlCtrtInfo(){
	var formObj=document.form;
	var ord_tp_lvl1_cd="P";
//	var sXml=docObjects[0].GetSearchData("searchTlCtrtInfo.clt?"+"ctrt_no="+ComGetObjValue(formObj.ctrt_no)+"&ord_tp_lvl1_cd="+ord_tp_lvl1_cd+"&mgmt_flg=Y&org_cd="+formObj.org_cd.value);			
	//ajaxSendPost(setTlCtrtInfo, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType=trdpCode'+"&s_code="+ComGetObjValue(formObj.owner_cd), './GateServlet.gsl');
	ajaxSendPost(setTlCtrtInfo, 'reqVal', '&goWhere=aj&bcKey=searchTlCtrtInfo&ctrt_no='+ComGetObjValue(formObj.ctrt_no)+"&ord_tp_lvl1_cd="+ord_tp_lvl1_cd+"&mgmt_flg=Y&org_cd="+formObj.org_cd.value, './GateServlet.gsl');
//	var s_type="";
//	s_type="trdpCode";
//	ajaxSendPost(setTlCtrtInfo, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type, './GateServlet.gsl');
}

function setTlCtrtInfo(reqVal){
	var formObj=document.form;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			var rtnArr=doc[1].split('^@');
			if(rtnArr[0] != ""){
				setFieldValue(formObj.ctrt_no,				rtnArr[1]);
				setFieldValue(formObj.ctrt_nm,			    rtnArr[0]);
				setFieldValue(formObj.sales_ofc_cd,	    rtnArr[3]);
				setFieldValue(formObj.sales_pic_nm,	    rtnArr[4]);
				setFieldValue(formObj.rtp_no,				rtnArr[2]);
				setFieldValue(formObj.main_svc_type,       rtnArr[5]);
				setFieldValue(formObj.main_svc_nm,         rtnArr[6]);
				setFieldValue(formObj.old_ctrt_no, ComGetObjValue(formObj.ctrt_no));
				if(!isNull(formObj.ctrt_no)){
					if(isNull(formObj.owner_cd)){
						setFieldValue(formObj.owner_cd,	rtnArr[7]);
						searchTlCustInfo("owner", ComGetObjValue(formObj.owner_cd));
					}else{
						if( ComGetObjValue(formObj.owner_cd) != rtnArr[7]){
							if(ComShowCodeConfirm("COM0272")){
								setFieldValue(formObj.owner_cd,		rtnArr[7]);
								searchTlCustInfo("owner", ComGetObjValue(formObj.owner_cd));
							}		
						}
					}
				}
			}else{
				setFieldValue(formObj.ctrt_no,				'');
				setFieldValue(formObj.ctrt_nm,			    '');
				setFieldValue(formObj.sales_ofc_cd,	    '');
				setFieldValue(formObj.sales_pic_nm,	    '');
				setFieldValue(formObj.rtp_no,				'');
				setFieldValue(formObj.main_svc_type,       '');
				setFieldValue(formObj.main_svc_nm,         '');
				setFieldValue(formObj.old_ctrt_no, ComGetObjValue(formObj.ctrt_no));
			}
		}else{
			setFieldValue(formObj.ctrt_no,				'');
			setFieldValue(formObj.ctrt_nm,			    '');
			setFieldValue(formObj.sales_ofc_cd,	    '');
			setFieldValue(formObj.sales_pic_nm,	    '');
			setFieldValue(formObj.rtp_no,				'');
			setFieldValue(formObj.main_svc_type,       '');
			setFieldValue(formObj.main_svc_nm,         '');
			setFieldValue(formObj.old_ctrt_no, ComGetObjValue(formObj.ctrt_no));
		}
	}
}

function onblur_Buyer(srcName) {
	var formObj=document.form;
	if(srcName == "buyer_cd" && !(formObj.btn_buyer_cd.disabled)){
		 if(isNull(formObj.buyer_cd)){
			 setTlCustInfoNull("buyer");
		 }else{
			 searchTlCustInfo("buyer", ComGetObjValue(formObj.buyer_cd)); 
		 }
	}
}
function onblur_Supp(srcName) {
	var formObj=document.form;
	if(srcName == "supp_cd" && !(formObj.btn_supp_cd.disabled)){
		//if(name == "owner" || name == "supp" || name == "buyer"){
		 if(isNull(formObj.supp_cd)){
			 setTlCustInfoNull("supp");
		 }else{
			 searchTlCustInfo("supp", ComGetObjValue(formObj.supp_cd));
		 }
	}
}

function onblur_Owner(srcName) {
	formObj=document.form;
	if(srcName == "owner_cd" && !(formObj.btn_owner_cd.disabled)){
		 if(isNull(formObj.owner_cd)){
				setTlCustInfoNull("owner");
		 } else{
			 searchTlCustInfo("owner", ComGetObjValue(formObj.owner_cd));			 
		 }
	}
}

function searchTlCustInfo(name, value){
//	var sXml=docObjects[0].GetSearchData("searchTlCustInfo.clt?"+"cust_cd="+value);
//	ajaxSendPost(setTlCustInfo, name, '&goWhere=aj&bcKey=searchTlCustInfo&cust_cd='+value, './GateServlet.gsl');
	var s_type="";
	formObj=document.form;
	var s_code= eval("formObj."+name+"_cd").value;
	s_type="trdpCode";
	ajaxSendPost(setTlCustInfo, name, '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
//	setTlCustInfo(name, sXml);
	
}
function setTlCustInfo(reqVal, name){
	var doc=getAjaxMsgXML(reqVal);
	 var formObj=document.form;
	 if(doc[0]=='OK'){
	  if(typeof(doc[1])!='undefined'){
	   //조회해온 결과를 Parent에 표시함
	   var rtnArr=doc[1].split('@@^');
	   if(rtnArr[0] != ""){
			if(name == "owner" || name == "supp" || name == "buyer"){
				setFieldValue(eval("formObj."+name+"_nm"), rtnArr[2]);
				setFieldValue(eval("formObj."+name+"_addr1"), rtnArr[1]);
			}else if(name == "carrier"){
				setFieldValue(eval("formObj."+name+"_cd"), rtnArr[0]);
				setFieldValue(eval("formObj."+name+"_nm"), rtnArr[1]);
			}
			if("owner" == name){
				if(fastOwnerFlg &&  (ComGetObjValue(formObj.form_mode) == "NEW")){
					//Forwarding Direction
					var vFwdDir= formObj.fwd_dir.value;
					if(vFwdDir == "I")
						searchTlCustInfo("supp", ComGetObjValue(formObj.owner_cd));
					else if(vFwdDir == "E")
						searchTlCustInfo("buyer", ComGetObjValue(formObj.owner_cd));
					fastOwnerFlg=false;
				}
			}
	   }
	   else{
		   if(name == "owner" || name == "supp" || name == "buyer"){
				setFieldValue(eval("formObj."+name+"_nm"), '');
				setFieldValue(eval("formObj."+name+"_addr1"), '');
			}else if(name == "carrier"){
				setFieldValue(eval("formObj."+name+"_cd"), '');
				setFieldValue(eval("formObj."+name+"_nm"), '');
			}
			if("owner" == name){
				if(fastOwnerFlg &&  (ComGetObjValue(formObj.form_mode) == "NEW")){
					//Forwarding Direction
					var vFwdDir= formObj.fwd_dir.value;
					if(vFwdDir == "I")
						searchTlCustInfo("supp", ComGetObjValue(formObj.owner_cd));
					else if(vFwdDir == "E")
						searchTlCustInfo("buyer", ComGetObjValue(formObj.owner_cd));
					fastOwnerFlg=false;
				}
			}
	   }
	  }else{
		   if(name == "owner" || name == "supp" || name == "buyer"){
				setFieldValue(eval("formObj."+name+"_nm"), '');
				setFieldValue(eval("formObj."+name+"_addr1"), '');
			}else if(name == "carrier"){
				setFieldValue(eval("formObj."+name+"_cd"), '');
				setFieldValue(eval("formObj."+name+"_nm"), '');
			}
			if("owner" == name){
				if(fastOwnerFlg &&  (ComGetObjValue(formObj.form_mode) == "NEW")){
					//Forwarding Direction
					var vFwdDir= formObj.fwd_dir.value;
					if(vFwdDir == "I")
						searchTlCustInfo("supp", ComGetObjValue(formObj.owner_cd));
					else if(vFwdDir == "E")
						searchTlCustInfo("buyer", ComGetObjValue(formObj.owner_cd));
					fastOwnerFlg=false;
				}
			}
	   }
	 }
}
function setTlCustInfoNull(name){
	var formObj=document.form;
	setFieldValue(eval("formObj."+name+"_nm"), "");
	setFieldValue(eval("formObj."+name+"_addr1"), "");
}
function searchTlLocInfo(name, value, type){
	var formObj=document.form;
//	var sXml=docObjects[0].GetSearchData("searchTlLocInfo.clt?type="+type+"&loc_cd="+value);
//	setTlLocInfo(name, sXml);
//	ajaxSendPost(setTlLocInfo, name, '&goWhere=aj&bcKey=searchTlLocInfo&type='+type+"&loc_cd="+value, './GateServlet.gsl');
	var s_code= eval("formObj."+name).value;
	s_type="location";
	ajaxSendPost(setTlLocInfo, name, '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
}
function rmk_len_chk(){
	var formObj=document.form;
	if(formObj.rmk.value.length > 400){
		ComShowCodeMessage("COM0215", "400");
		formObj.rmk.value=formObj.rmk.value.substring(0,400);
	}
}
function setTlLocInfo(reqVal ,name){
	var doc=getAjaxMsgXML(reqVal);
	 var formObj=document.form;
	 if(doc[0]=='OK'){
		  if(typeof(doc[1])!='undefined'){
		   //조회해온 결과를 Parent에 표시함
			   var rtnArr=doc[1].split('@@^');
			   if(rtnArr[0] != ""){
					if(name == "pol" || name == "pod" || name == "del"){
						setFieldValue(eval("formObj."+name), rtnArr[0]);
					}else if(name == "rcv_loc"){
						setFieldValue(eval("formObj."+name+"_cd"), rtnArr[1]);
					}
					setFieldValue(eval("formObj."+name+"_nm"), rtnArr[3]);
			   }else{
				   if(name == "pol" || name == "pod" || name == "del"){
						setFieldValue(eval("formObj."+name), '');
					}else if(name == "rcv_loc"){
						setFieldValue(eval("formObj."+name+"_cd"),'');
					}
					setFieldValue(eval("formObj."+name+"_nm"),'');
			   } 
		  }else{
			  setFieldValue(eval("formObj."+name),'');
			  setFieldValue(eval("formObj."+name+"_nm"),'');
		  }
	 }
}
function setTlLocInfoNull(name){
	var formObj=document.form;
	if(name == "pol" || name == "pod" || name == "del"){
		setFieldValue(eval("formObj."+name), "");
	}else if(name == "rcv_loc"){
		setFieldValue(eval("formObj."+name+"_cd"), "");
	}
	setFieldValue(eval("formObj."+name+"_nm"), "");
}

function onblur_Vsl(srcName) {
	var formObj=document.form;
	if(srcName == "vsl_cd" && !(formObj.btn_vsl_cd.disabled)){
		if(isNull(formObj.vsl_cd)){
			setTlVslInfoNull("vsl");
		}else{
			searchTlVslInfo("vsl", ComGetObjValue(formObj.vsl_cd));
		}
	}
}


function vslCdSearch(obj){
	var formObj=document.form;
	formObj.vsl_nm.value='';
	if(obj.value==''){
		return;
	}
	ajaxSendPost(dispVslCdSearch, "reqVal", '&goWhere=aj&bcKey=searchTlVslInfo&'+"code="+obj.value, './GateServlet.gsl');
}
function dispVslCdSearch(reqVal){
	var frm1=document.form;
	var doc=getAjaxMsgXML(reqVal);
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			if(doc[1]=='ERR'){
				frm1.vsl_cd.value='';
			}else{
				var rtnValArr=doc[1].split('^@');
				frm1.vsl_nm.value=rtnValArr[0];
			}
		}else{
			frm1.vsl_cd.value='';	
		}
	}else{
		frm1.vsl_cd.value='';
	}
}

function searchTlVslInfo(name, value){
//	var sXml=docObjects[0].GetSearchData("searchTlVslInfo.clt?"+"code="+value);	
//	setTlVslInfo(name, sXml);
	var s_type="";
	 formObj=document.form;
	 var s_code= eval("formObj."+name+"_cd").value;
	 s_type="trdpcode";
	ajaxSendPost(setTlVslInfo, name, '&goWhere=aj&bcKey=searchCodeName&codeType='+s_type+'&s_code='+s_code, './GateServlet.gsl');
}
function setTlVslInfo(reqVal, name){
	var doc=getAjaxMsgXML(reqVal);
	 var formObj=document.form;
	 if(doc[0]=='OK'){
	  if(typeof(doc[1])!='undefined'){
	   //조회해온 결과를 Parent에 표시함
	   var rtnArr=doc[1].split('@@^');
	   if(rtnArr[0] != ""){
			setFieldValue(eval("formObj."+name+"_cd"), rtnArr[1]);
			setFieldValue(eval("formObj."+name+"_nm"), rtnArr[0]);
	   }
	   else{
		   setFieldValue(eval("formObj."+name+"_cd"), '');
			setFieldValue(eval("formObj."+name+"_nm"),'');
	   }
	  }
	 }
}
function setTlVslInfoNull(name){
	var formObj=document.form;
	setFieldValue(eval("formObj."+name+"_cd"), "");
	setFieldValue(eval("formObj."+name+"_nm"), "");
}
/**
* IBSheet Object
*/
function setDocumentObject(sheet_obj){
	docObjects[sheetCnt++]=sheet_obj;
}
/**
 * Upload Object
 */
function setUploadObject(uploadObj){
	uploadObjects[uploadCnt++]=uploadObj;
}
/**
 * Combo Object를 배열로 등록
 */    
// function setComboObject(combo_obj){
//	comboObjects[comboCnt++]=combo_obj;
// }

/**
 * 시트 초기설정값, 헤더 정의
 * param : sheetObj ==> 시트오브젝트, sheetNo ==> 시트오브젝트 태그의 아이디에 붙인 일련번호
 * 시트가 다수일 경우 시트 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
*/
function initSheet(sheetObj,sheetNo) {
	var cnt=0;
	switch(sheetNo) {
	case 1:
	    with(sheetObj){
		      var hdr1="hbl_no";
		
		      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:0 } );
		
		      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		      var headers = [ { Text:hdr1, Align:"Center"} ];
		      InitHeaders(headers, info);
		
		      var cols = [ {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"hbl_no",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 } ];
		       
		      InitColumns(cols);
		      SetSheetHeight(75);
		      SetEditable(0);
		      SetWaitImageVisible(0);
		      SetRowHidden(0, 1);
	      }
	      break;
	case 2:
	    with(sheetObj){
	        
		      var hdr1="hbl_no";
		
		      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:0 } );
		
		      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		      var headers = [ { Text:hdr1, Align:"Center"} ];
		      InitHeaders(headers, info);
		
		      var cols = [ {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:"mbl_no",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 } ];
		       
		      InitColumns(cols);
		      SetSheetHeight(75);
		     // SetSheetWidth(180);
		      SetEditable(0);
		      SetWaitImageVisible(0);
		      SetRowHidden(0, 1);
	      }
	    break;
	case 3:
	    with(sheetObj){
		      var hdr1="||Item|Item Name|Item Lot No|Estimated|Estimated|Estimated|Estimated|Volume|Volume|GWT|GWT|NWT|NWT|PO No|Planned Transport|Planned Transport|Planned Transport|Planned Transport|Additional Lot Property|Additional Lot Property|Additional Lot Property|Additional Lot Property";
		      hdr1 += "|Lot ID|Lot ID|Import Information|Import Information|Import Information|Import Information|Import Information";
		      hdr1 += "|Import Information|Import Information|Import Information|Import Information|Import Information|Import Information|Import Information|Import Information|Commercial Invoice|Commercial Invoice";
		      hdr1 += "|po_sys_no|item_sys_no|org_qty|load_flg|ref_po_sys_no|ref_item_sys_no|item_seq|ctrt_no|eq_tp_cd|pkg_lv1_qty|pkg_lv1_unit_cd|pkg_lv2_qty|pkg_lv2_unit_cd|pkg_lv3_qty|pkg_lv3_unit_cd|pkg_lv4_qty|pkg_lv4_unit_cd|lv1_cbm|lv1_cbf|lv1_grs_kgs|lv1_grs_lbs|lv1_net_kgs|lv1_net_lbs|INVALID_YN|SU_VALID_YN|ORG_ITEM_SYS_NO";
		      var hdr2="||Item|Item Name|Item Lot No|Unit|QTY|Pack Master Info.|EA Qty|CBM |CFT|KG|LB|KG|LB|PO No|Type|CNTR / TR No|Seal No|Seal No|Inbound Date|Expiration Date|Lot 04|Lot 05";
		      hdr2 += "|Lot ID |Sel|CNTR Ref|HBL No|MBL No|POL|ETD|POD|ETA|DEL|Carrier Code|Carrier Name|Vessel Code|Vessel Name|Voyage|Currency|Unit Price";
		      hdr2 += "|po_sys_no|item_sys_no|org_qty|load_flg|ref_po_sys_no|ref_item_sys_no|item_seq|ctrt_no|eq_tp_cd|pkg_lv1_qty|pkg_lv1_unit_cd|pkg_lv2_qty|pkg_lv2_unit_cd|pkg_lv3_qty|pkg_lv3_unit_cd|pkg_lv4_qty|pkg_lv4_unit_cd|lv1_cbm|lv1_cbf|lv1_grs_kgs|lv1_grs_lbs|lv1_net_kgs|lv1_net_lbs|INVALID_YN|SU_VALID_YN|ORG_ITEM_SYS_NO";
		      var prefix="Grd01";
		
		      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:5, DataRowMerge:1 } );
		
		      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		      var headers = [ { Text:hdr1, Align:"Center"},
		                  { Text:hdr2, Align:"Center"} ];
		      InitHeaders(headers, info);
		
		      var cols = [ {Type:"Status",    Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"ibflag" },
		             {Type:"CheckBox",  Hidden:0, Width:30,   Align:"Center",  ColMerge:1,   SaveName:prefix+"del_chk", UpdateEdit:1, InsertEdit:1 },
		             {Type:"PopupEdit", Hidden:0, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"item_cd",         KeyField:1,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
		             {Type:"Text",      Hidden:0,  Width:120,  Align:"Left",    ColMerge:1,   SaveName:prefix+"item_nm",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
		             {Type:"Text",      Hidden:0,  Width:110,  Align:"Center",  ColMerge:1,   SaveName:prefix+"lot_no",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
		             {Type:"PopupEdit", Hidden:0, Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"item_pkgunit",    KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
		             {Type:"AutoSum",   Hidden:0, Width:60,   Align:"Right",   ColMerge:1,   SaveName:prefix+"item_pkgqty",     KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:WMS_QTY_POINT,UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
		             {Type:"Text",      Hidden:0,  Width:160,  Align:"Left",    ColMerge:1,   SaveName:prefix+"pkg_info",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:100 },
		             {Type:"AutoSum",   Hidden:0, Width:70,   Align:"Right",   ColMerge:0,   SaveName:prefix+"item_ea_qty",     KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:WMS_QTY_POINT,UpdateEdit:0,   InsertEdit:0 },
		             {Type:"AutoSum",   Hidden:0, Width:60,   Align:"Right",   ColMerge:1,   SaveName:prefix+"item_cbm",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:WMS_CBM_POINT,UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
		             {Type:"AutoSum",   Hidden:0, Width:60,   Align:"Right",   ColMerge:1,   SaveName:prefix+"item_cbf",        KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:WMS_CBM_POINT,UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
		             {Type:"AutoSum",   Hidden:0, Width:60,   Align:"Right",   ColMerge:1,   SaveName:prefix+"item_grs_kgs",    KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:WMS_KGS_POINT,UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
		             {Type:"AutoSum",   Hidden:0, Width:60,   Align:"Right",   ColMerge:1,   SaveName:prefix+"item_grs_lbs",    KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:WMS_KGS_POINT,UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
		             {Type:"AutoSum",   Hidden:0, Width:60,   Align:"Right",   ColMerge:1,   SaveName:prefix+"item_net_kgs",    KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:WMS_KGS_POINT,UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
		             {Type:"AutoSum",   Hidden:0, Width:60,   Align:"Right",   ColMerge:1,   SaveName:prefix+"item_net_lbs",    KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:WMS_KGS_POINT,UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
		             {Type:"Text",      Hidden:0,  Width:110,  Align:"Center",  ColMerge:1,   SaveName:prefix+"po_no",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
		             {Type:"PopupEdit", Hidden:0, Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"eq_tpsz_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
		             {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"eq_no",           KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
		             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"seal_no",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:100 },
		             {Type:"Image",     Hidden:0, Width:30,   Align:"Center",  ColMerge:1,   SaveName:prefix+"seal_img",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
		             {Type:"Date",      Hidden:0,  Width:90,   Align:"Center",  ColMerge:1,   SaveName:prefix+"inbound_dt",      KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:0,   InsertEdit:1 },
		             {Type:"Date",      Hidden:0,  Width:90,   Align:"Center",  ColMerge:1,   SaveName:prefix+"exp_dt",          KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		             {Type:"Text",      Hidden:0,  Width:90,   Align:"Center",  ColMerge:1,   SaveName:prefix+"lot_04",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
		             {Type:"Text",      Hidden:0,  Width:90,   Align:"Center",  ColMerge:1,   SaveName:prefix+"lot_05",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
		             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"fix_lot_id",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0,   EditLen:20 },
		             {Type:"Image",     Hidden:0, Width:30,   Align:"Center",  ColMerge:1,   SaveName:prefix+"lot_id_img",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
		             {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"cntr_ref_no",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:30 },
		             {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:prefix+"hbl_no",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
		             {Type:"Text",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:prefix+"mbl_no",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:20 },
		             {Type:"PopupEdit", Hidden:0, Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"pol",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
		             {Type:"Date",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"etd",             KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		             {Type:"PopupEdit", Hidden:0, Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"pod",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
		             {Type:"Date",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"eta",             KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1},
		             {Type:"PopupEdit", Hidden:0, Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"del",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:5 },
		             {Type:"PopupEdit", Hidden:0, Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"carrier_cd",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:10 },
		             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"carrier_nm",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"PopupEdit", Hidden:0, Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"vsl_cd",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:35 },
		             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"vsl_nm",          KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
		             {Type:"Text",      Hidden:0,  Width:80,   Align:"Center",  ColMerge:1,   SaveName:prefix+"voy",             KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:11 },
		             {Type:"Combo", Hidden:0, Width:70,   Align:"Center",  ColMerge:1,   SaveName:prefix+"curr_cd",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1,   EditLen:3 },
		             {Type:"AutoSum",   Hidden:0, Width:70,   Align:"Right",   ColMerge:1,   SaveName:prefix+"unit_price",      KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:3,   UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
		             {Type:"Text",      Hidden:1, Width:150,  Align:"Left",    ColMerge:0,   SaveName:prefix+"po_sys_no",       KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		             {Type:"Text",      Hidden:1, Width:150,  Align:"Left",    ColMerge:0,   SaveName:prefix+"item_sys_no",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		             {Type:"Float",      Hidden:1, Width:150,  Align:"Right",   ColMerge:0,   SaveName:prefix+"org_qty",         KeyField:0,   CalcLogic:"",   Format:"Float",       PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		             {Type:"Text",      Hidden:1, Width:150,  Align:"Center",  ColMerge:0,   SaveName:prefix+"load_flg",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		             {Type:"Text",      Hidden:1, Width:150,  Align:"Left",    ColMerge:0,   SaveName:prefix+"ref_po_sys_no",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		             {Type:"Text",      Hidden:1, Width:150,  Align:"Left",    ColMerge:0,   SaveName:prefix+"ref_item_sys_no", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		             {Type:"Int",      Hidden:1, Width:150,  Align:"Center",  ColMerge:0,   SaveName:prefix+"item_seq",        KeyField:0,   CalcLogic:"",   Format:"Integer",     PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		             {Type:"Text",      Hidden:1, Width:150,  Align:"Center",  ColMerge:0,   SaveName:prefix+"ctrt_no",         KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		             {Type:"Text",      Hidden:1, Width:150,  Align:"Center",  ColMerge:0,   SaveName:prefix+"eq_tp_cd",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		             {Type:"Float",      Hidden:1, Width:60,   Align:"Right",   ColMerge:1,   SaveName:prefix+"pkg_lv1_qty",     KeyField:0,   CalcLogic:"",   Format:"Float",     PointCount:WMS_QTY_POINT,UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
		             {Type:"Text",      Hidden:1, Width:150,  Align:"Center",  ColMerge:0,   SaveName:prefix+"pkg_lv1_unit_cd", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		             {Type:"Float",      Hidden:1, Width:60,   Align:"Right",   ColMerge:1,   SaveName:prefix+"pkg_lv2_qty",     KeyField:0,   CalcLogic:"",   Format:"Float",     PointCount:WMS_QTY_POINT,UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
		             {Type:"Text",      Hidden:1, Width:150,  Align:"Center",  ColMerge:0,   SaveName:prefix+"pkg_lv2_unit_cd", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		             {Type:"Float",      Hidden:1, Width:60,   Align:"Right",   ColMerge:1,   SaveName:prefix+"pkg_lv3_qty",     KeyField:0,   CalcLogic:"",   Format:"Float",     PointCount:WMS_QTY_POINT,UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
		             {Type:"Text",      Hidden:1, Width:150,  Align:"Center",  ColMerge:0,   SaveName:prefix+"pkg_lv3_unit_cd", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		             {Type:"Float",      Hidden:1, Width:60,   Align:"Right",   ColMerge:1,   SaveName:prefix+"pkg_lv4_qty",     KeyField:0,   CalcLogic:"",   Format:"Float",     PointCount:WMS_QTY_POINT,UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
		             {Type:"Text",      Hidden:1, Width:150,  Align:"Center",  ColMerge:0,   SaveName:prefix+"pkg_lv4_unit_cd", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		             {Type:"Float",      Hidden:1, Width:60,   Align:"Right",   ColMerge:1,   SaveName:prefix+"lv1_cbm",         KeyField:0,   CalcLogic:"",   Format:"NullFloat",       PointCount:MST_CBM_POINT,UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
		             {Type:"Float",      Hidden:1, Width:60,   Align:"Right",   ColMerge:1,   SaveName:prefix+"lv1_cbf",         KeyField:0,   CalcLogic:"",   Format:"NullFloat",       PointCount:MST_CBM_POINT,UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
		             {Type:"Float",      Hidden:1, Width:60,   Align:"Right",   ColMerge:1,   SaveName:prefix+"lv1_grs_kgs",     KeyField:0,   CalcLogic:"",   Format:"NullFloat",       PointCount:MST_CBM_POINT,UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
		             {Type:"Float",      Hidden:1, Width:60,   Align:"Right",   ColMerge:1,   SaveName:prefix+"lv1_grs_lbs",     KeyField:0,   CalcLogic:"",   Format:"NullFloat",       PointCount:MST_CBM_POINT,UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
		             {Type:"Float",      Hidden:1, Width:60,   Align:"Right",   ColMerge:1,   SaveName:prefix+"lv1_net_kgs",     KeyField:0,   CalcLogic:"",   Format:"NullFloat",       PointCount:MST_CBM_POINT,UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
		             {Type:"Float",      Hidden:1, Width:60,   Align:"Right",   ColMerge:1,   SaveName:prefix+"lv1_net_lbs",     KeyField:0,   CalcLogic:"",   Format:"NullFloat",       PointCount:MST_CBM_POINT,UpdateEdit:1,   InsertEdit:1,   EditLen:15 },
		             {Type:"Text",      Hidden:1, Width:150,  Align:"Left",    ColMerge:0,   SaveName:prefix+"invalid_yn",      KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		             {Type:"Text",      Hidden:1, Width:150,  Align:"Left",    ColMerge:0,   SaveName:prefix+"su_valid_yn",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
		             {Type:"Text",      Hidden:1, Width:150,  Align:"Left",    ColMerge:0,   SaveName:prefix+"org_item_sys_no", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 } ];
       
		      InitColumns(cols);
		      SetSheetHeight(450);
		      SetEditable(1);
		      SetWaitImageVisible(0);
		      SetImageList(0,"web/img/main/icon_search_s.gif");
		      SetImageList(1,"web/img/main/icon_m.gif");
		      SetColProperty(0, prefix+"item_cd",		{AcceptKeys:"E|N|[-_]" , InputCaseSensitive:1});
		      SetColProperty(0, prefix+"item_nm",		{AcceptKeys:"E|N" , InputCaseSensitive:1});
		      SetColProperty(0, prefix+"po_no",		{AcceptKeys:"E|N" , InputCaseSensitive:1});
		      SetColProperty(0, prefix+"eq_no",		{AcceptKeys:"E|N|[-,/ .;:~!@#$^&*()_+|=`()[]{}?<>' ]" , InputCaseSensitive:1});
//		      SetColProperty(0, prefix+"seal_no",		{AcceptKeys:"E|N" , InputCaseSensitive:1});
		      SetColProperty(0, prefix+"fix_lot_id",		{AcceptKeys:"E|N" , InputCaseSensitive:1});
		      SetColProperty(0, prefix+"cntr_ref_no",		{AcceptKeys:"E|N|[-,/ .;:~!@#$^&*()_+|=`()[]{}?<>' ]" , InputCaseSensitive:1});
		      SetColProperty(0, prefix+"hbl_no",		{AcceptKeys:"E|N|[-,/ .;:~!@#$^&*()_+|=`()[]{}?<>' ]" , InputCaseSensitive:1});
		      SetColProperty(0, prefix+"mbl_no",		{AcceptKeys:"E|N|[-,/ .;:~!@#$^&*()_+|=`()[]{}?<>' ]" , InputCaseSensitive:1});
		      SetColProperty(0, prefix+"lot_no",		{AcceptKeys:"E|N|[-,/ .;:~!@#$^&*()_+|=`()[]{}?<>' ]" , InputCaseSensitive:1});
		      SetColProperty(0, prefix+"eq_tpsz_cd",		{AcceptKeys:"E|N" , InputCaseSensitive:1});
		      
		      SetColProperty(0 ,prefix+"item_pkgunit" , {AcceptKeys:"E|[0123456789]" , InputCaseSensitive:1});
		      SetColProperty(0 ,prefix+"pol" , {AcceptKeys:"E|[0123456789]" , InputCaseSensitive:1});
		      SetColProperty(0 ,prefix+"pod" , {AcceptKeys:"E|[0123456789]" , InputCaseSensitive:1});
		      SetColProperty(0 ,prefix+"del" , {AcceptKeys:"E|[0123456789]" , InputCaseSensitive:1});
		      SetColProperty(0 ,prefix+"carrier_cd" , {AcceptKeys:"E|[0123456789]" , InputCaseSensitive:1});
		      SetColProperty(0 ,prefix+"vsl_cd" , {AcceptKeys:"E|[0123456789]" , InputCaseSensitive:1});
		      SetColProperty(0 ,prefix+"voy" , {AcceptKeys:"E|[0123456789]" , InputCaseSensitive:1});
		      SetColProperty(0 ,prefix+"curr_cd" , {AcceptKeys:"E|[0123456789]" , InputCaseSensitive:1});
		      SetColProperty(0 ,prefix+"lot_04" , {AcceptKeys:"E|[0123456789]|[-,/ .;:~!@#$^&*()_+|=`()[]{}?<>' ]" , InputCaseSensitive:1});
		      SetColProperty(0 ,prefix+"lot_05" , {AcceptKeys:"E|[0123456789]|[-,/ .;:~!@#$^&*()_+|=`()[]{}?<>' ]" , InputCaseSensitive:1});
		      SetColProperty(0 ,prefix+"fix_lot_id" , {AcceptKeys:"E|[0123456789]" , InputCaseSensitive:1});
		      
		      SetColProperty(prefix+"curr_cd", {ComboText:"|"+currCdListText, ComboCode:"|"+currCdListCode} );
		      SetColProperty(prefix+"item_pkgunit", {ComboText:"|"+UNITCDText, ComboCode:"|"+UNITCDCode} );
		      
		      //InitViewFormat(0,prefix+ "inbound_dt", "MM-dd-yyyy");
		      //InitViewFormat(0,prefix+ "exp_dt", "MM-dd-yyyy");
		      //InitViewFormat(0,prefix+ "etd", "MM-dd-yyyy");
		      //InitViewFormat(0,prefix+ "eta", "MM-dd-yyyy");
		      
		      SetHeaderRowHeight(30);
		      SetAutoRowHeight(0);
		      resizeSheet();
		      
      	}
	    break;
	case 4:
		    with(sheetObj){
		      var hdr1="|field_name|field_val|doc_type";
		      var prefix="Grd02";
	
		      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:0, DataRowMerge:0 } );
	
		      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
		      var headers = [ { Text:hdr1, Align:"Center"} ];
		      InitHeaders(headers, info);
	
		      var cols = [ {Type:"Status",    Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"ibflag" },
	             {Type:"Text",      Hidden:0,  Width:200,  Align:"Left",    ColMerge:1,   SaveName:prefix+"field_name", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:0,   InsertEdit:0 },
	             {Type:"Text",      Hidden:0,  Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"field_val",  KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
	             {Type:"Text",      Hidden:1, Width:150,  Align:"Left",    ColMerge:0,   SaveName:prefix+"doc_type",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 } ];
	       
		      InitColumns(cols);
		      SetSheetHeight(450);
		      SetHeaderRowHeight(30);
		      SetAutoRowHeight(0);
		      resizeSheet();
		      SetEditable(0);
		      SetWaitImageVisible(0);
		      SetRowHidden(0, 1);
	      }
	      break;
	case 5:
		    with(sheetObj){
			      var hdr1="|Seq|File Name (Click For Download)|Upload Date|Size(KB)|doc_no|file_path|file_sys_nm|svc_tp_cd|doc_ref_tp_cd|doc_tp_cd";
			      var prefix="Grd03";
		
			      SetConfig( { SearchMode:2, MergeSheet:5, Page:20, FrozenCol:4, DataRowMerge:1 } );
		
			      var info    = { Sort:1, ColMove:1, HeaderCheck:1, ColResize:1 };
			      var headers = [ { Text:hdr1, Align:"Center"} ];
			      InitHeaders(headers, info);
		
			      var cols = [ {Type:"Status",    Hidden:1, Width:50,   Align:"Center",  ColMerge:1,   SaveName:prefix+"ibflag" },
			             {Type:"Seq",       Hidden:0, Width:60,   Align:"Center",  ColMerge:1,   SaveName:prefix+"Seq" },
			             {Type:"Text",      Hidden:0,  Width:800,  Align:"Left",    ColMerge:1,   SaveName:prefix+"file_org_nm",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Date",      Hidden:0,  Width:100,  Align:"Center",  ColMerge:1,   SaveName:prefix+"upload_date",   KeyField:0,   CalcLogic:"",   Format:"Ymd",         PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Float",       Hidden:0,  Width:100,  Align:"Right",   ColMerge:1,   SaveName:prefix+"file_size",     KeyField:0,   CalcLogic:"",   Format:"Float",     PointCount:3,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Text",      Hidden:1, Width:150,  Align:"Left",    ColMerge:0,   SaveName:prefix+"doc_no",        KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"file_path",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"file_sys_nm",   KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Text",      Hidden:1, Width:100,  Align:"Left",    ColMerge:1,   SaveName:prefix+"svc_tp_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Text",      Hidden:1, Width:150,  Align:"Left",    ColMerge:0,   SaveName:prefix+"doc_ref_tp_cd", KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 },
			             {Type:"Text",      Hidden:1, Width:150,  Align:"Left",    ColMerge:0,   SaveName:prefix+"doc_tp_cd",     KeyField:0,   CalcLogic:"",   Format:"",            PointCount:0,   UpdateEdit:1,   InsertEdit:1 } ];
			       
			      InitColumns(cols);
			      SetSheetHeight(450);
			      SetHeaderRowHeight(30);
			      SetAutoRowHeight(0);
			      resizeSheet();
			      SetEditable(0);
			      SetWaitImageVisible(0);
	      }
	      break;
	}
}
//화면 Merge 컬럼 Name
//var InputName = "wb_no|fwd_dir|order_rel|bk_sts_cd|bk_stff_ofc_cd|bk_stff_nm|bk_stff_id|bk_date|ref_no|job_no|wb_src_cd|ctrt_no|rtp_no|so_no|ctrt_nm|sales_ofc_cd|sales_ofc_nm|sales_pic_id|sales_pic_nm|main_svc_type|main_svc_nm";
//InputName += "|owner_cd|owner_addr1|owner_addr2|owner_addr3|owner_addr4|owner_addr5|supp_cd|supp_addr1|supp_addr2|supp_addr3|supp_addr4|supp_addr5|buyer_cd|buyer_addr1|buyer_addr2|buyer_addr3|buyer_addr4|buyer_addr5";
//InputName += "|cg_av_dt|est_in_dt|rcv_loc_cd|rcv_loc_nm|rmk";
//InputName += "|vsl_cd|vsl_nm|voy|carrier_cd|carrier_nm|pol|pol_nm|etd|pod|pod_nm|eta|del|del_nm";
var InputName="wib_bk_no|so_no|ctrt_no|ctrt_nm|eff_fr_dt|eff_to_dt|ctrt_cust_cd|ctrt_cust_nm|sales_ofc_cd|sales_ofc_nm|sales_pic_id|sales_pic_nm|rtp_no|wh_cd|wh_nm|bk_date|ord_tp_cd_hidden|bk_sts_cd_hidden|est_in_dt|load_tp_cd_hidden|fwd_dir_hidden|order_rel_hidden|main_svc_type";
	InputName += "|main_svc_nm|ctrt_ord_tp_nm|owner_cd|owner_addr1|owner_addr2|owner_addr3|owner_addr4|owner_addr5|supp_cd|supp_nm|supp_addr1|supp_addr2|supp_addr3|supp_addr4|supp_addr5|supp_type|buyer_cd|buyer_nm|buyer_addr1|buyer_addr2|buyer_addr3|buyer_addr4|buyer_addr5";
	InputName += "|buyer_type|cust_ord_no|commc_inv_no|dlv_ord_no|job_no|rmk|vsl_cd|vsl_nm|voy|hbl_no|mbl_no|carrier_cd|carrier_nm|pol|pol_nm|etd|pod|pod_nm|eta|del|del_nm|del_dt|est_cmpl_dt|src_cd|in_sts_cd|unload_sht_cnt|src_tp_cd|ref_no";
/** 
 * Search()
 */ 
function btn_Search() {
	var formObj=document.form;
	var sheetObj=docObjects[2];
	if(loading_flag != "Y"){
		return;
	}
	if (ComIsEmpty(formObj.c_wib_bk_no.value)) {
		if(flagTab != true)
		{
			ComShowCodeMessage("COM0126"); // Please enter Booking No.
		}else{
			flagTab = false;			
		}
		formObj.c_wib_bk_no.focus();
		return ;
	}
	doShowProcess();
	setTimeout(function(){
		sheet1.RemoveAll();
		sheet2.RemoveAll();
		sheet3.RemoveAll();
		sheet4.RemoveAll();
		sheet5.RemoveAll();
		formObj.logo_rectangle.value ="";
		//Attachment 탭 초기화
		setFieldValue(formObj.file_path, "");
		//uploadObjects[0].DeleteFile(); Lock Temp Kieu
		formObj.f_cmd.value = SEARCH;
	     var sXml=sheetObj.GetSearchData("./searchWHInbkInfoGS.clt", FormQueryString(formObj,null, ""));
	     var strtIndxCheck = sXml.indexOf("<CHECK>") + "<CHECK>".length;
	 		var endIndxCheck = sXml.indexOf("</CHECK>");
	 		
	 		var xmlDoc = $.parseXML(sXml.substring(strtIndxCheck,endIndxCheck));
	 		var $xml = $(xmlDoc);
	     if ($xml.find( "listCnt").text() != '0'){
	    		setDataControl(sXml);
				var strtIndxSheet1 = sXml.indexOf("<SHEET1>");
				var endIndxSheet1 = sXml.indexOf("</SHEET1>") + "</SHEET1>".length;
				var sheet1Data = sXml.substring(strtIndxSheet1,endIndxSheet1);
				if (sheet1Data.replace(/^\s+|\s+$/gm,'') != ""){
					sheet1.LoadSearchData(sheet1Data.replaceAll('SHEET1', 'SHEET'));
					var cnt= "";
					for(var i = 0; i < sheet1.RowCount(); i++)
						{
							if(sheet1.GetCellValue(i, "hbl_no") != "")
								cnt ++;
						}
					if(cnt == ""){
						sheet1.LoadSearchData("");
					}
				}
				
				var strtIndxSheet2 = sXml.indexOf("<SHEET2>");
				var endIndxSheet2 = sXml.indexOf("</SHEET2>") + "</SHEET2>".length;
				var sheet2Data = sXml.substring(strtIndxSheet2,endIndxSheet2);
				if (sheet2Data.replace(/^\s+|\s+$/gm,'') != ''){
					sheet2.LoadSearchData(sheet2Data.replaceAll('SHEET2', 'SHEET'));
					var cnt= "";
					for(var i = 0; i < sheet2.RowCount(); i++)
						{
							if(sheet2.GetCellValue(i, "hbl_no") != "")
								cnt ++;
						}
					if(cnt == ""){
						sheet2.LoadSearchData("");
					}
				}
				
				var strtIndxSheet3 = sXml.indexOf("<SHEET3>");
				var endIndxSheet3 = sXml.indexOf("</SHEET3>") + "</SHEET3>".length;
				var sheet3Data = sXml.substring(strtIndxSheet3,endIndxSheet3);
				sheet3.LoadSearchData(sheet3Data.replaceAll('SHEET3', 'SHEET'));
				
				var strtIndxSheet4 = sXml.indexOf("<SHEET4>");
				var endIndxSheet4 = sXml.indexOf("</SHEET4>") + "</SHEET4>".length;
				var sheet4Data = sXml.substring(strtIndxSheet4,endIndxSheet4);
				sheet4.LoadSearchData(sheet4Data.replaceAll('SHEET4', 'SHEET'));
				
				var strtIndxSheet5 = sXml.indexOf("<SHEET5>");
				var endIndxSheet5 = sXml.indexOf("</SHEET5>") + "</SHEET5>".length;
				var sheet5Data = sXml.substring(strtIndxSheet5,endIndxSheet5);
				sheet5.LoadSearchData(sheet5Data.replaceAll('SHEET5', 'SHEET'));
			// Forwarding Direction
			setFieldValue(formObj.form_mode, "UPDATE");
			var vFwdDir= formObj.fwd_dir.value;
			// star_img_control(vFwdDir);
			if ("I" == vFwdDir) {
				btn_show_shipping(true);
			} else {
				btn_show_shipping(false);
			}
			//Attachment
			// ComEnableButton("btn_file_path", true, 6);  //추가 예정
			ComBtnEnable("btn_file_upload");
			ComBtnEnable("btn_file_delete");
			formObj.bk_sts_cd.disabled = true;
			formObj.fwd_dir.disabled = true;
			formObj.order_rel.disabled = true;
			var vBkSts= document.form.bk_sts_cd.value;
			if (vBkSts == "N") {
				ComEnableObject(formObj.ctrt_no, false);
				/*
			    - Disabled=false
			      Save, Cancel, Shipper, Shipper 버튼,  Issue 체크버튼, Item(ADD, Excel Upload, Templete Download, DEL)
			    - Disabled=true
			      Contract No, Contract 버튼, Work Order, Cargo Receipt, Reinstate, SVO Freight
				*/
				ComEnableObject(formObj.warehouse, true);	
				//ComBtnEnable("btn_wh_cd");
				formObj.ord_tp_cd.disabled = false;
				formObj.load_tp_cd.disabled = false;
				ComEnableObject(formObj.est_in_dt, true);			
				ComBtnEnable("btn_est_in_dt");
				ComEnableObject(formObj.ctrt_no, false);
				ComBtnDisable("btn_ctrt_no");
				ComEnableObject(formObj.owner_cd, true);
				ComBtnEnable("btn_owner_cd");
				//ComBtnEnable("btn_owner_cd1");
				setEnableOwner("btn_owner_cd1", true, 5);
				ComEnableObject(formObj.supp_cd, true);
				ComBtnEnable("btn_supp_cd");
				//ComBtnEnable("btn_supp_cd1");
				setEnableVendor("btn_supp_cd1", true);
				ComBtnEnable("btnSave");
				ComBtnDisable("btn_reinstate");
				ComBtnEnable("btn_cancel");
				setFieldValue(formObj.old_ctrt_no,	ComGetObjValue(formObj.ctrt_no));	
				
				formObj.issue.disabled=false;
				link_button(vBkSts);
				po_item_button(vFwdDir);
				//sheetObj.Editable = true;
			} else if(vBkSts == "I") {
				/*
				@param flg 1:버튼, 2:링크, 3: 돋보기, 4:상세 돋보기, 5:달력 
				- Disabled=false
				  Reinstate, Save, Cancel, Work Order, Cargo Receipt, SVO Freight
				- Disabled=true
				  Contract No, Contract 버튼, Shipper, Shipper 버튼,  Issue 체크버튼, 
				  Item(ADD, Excel Upload, Templete Download, DEL) 
				 */
				ComEnableObject(formObj.warehouse, false);	
//				ComBtnDisable("btn_wh_cd");
				formObj.ord_tp_cd.disabled = true;
				formObj.load_tp_cd.disabled = true;
				ComEnableObject(formObj.est_in_dt, false);			
				ComBtnDisable("btn_est_in_dt");
				ComEnableObject(formObj.ctrt_no, false);
				ComBtnDisable("btn_ctrt_no");
				ComEnableObject(formObj.owner_cd, false);
				ComBtnDisable("btn_owner_cd");
				//ComBtnDisable("btn_owner_cd1");
				setEnableOwner("btn_owner_cd1", false, 5);
				ComEnableObject(formObj.supp_cd, false);
				ComBtnDisable("btn_supp_cd");
				//ComBtnDisable("btn_supp_cd1");
				setEnableVendor("btn_supp_cd1", false);
				formObj.issue.disabled=true;
				ComBtnEnable("btnSave");
				ComBtnEnable("btn_reinstate");
				ComBtnEnable("btn_cancel");
				link_button(vBkSts);
				po_item_button("");
				//PP/Item 수정 못함.
				//sheetObj.Editable = false;
			} else if(vBkSts == "C") {
				/*
				- Disabled=true
				  Contract No, Contract 버튼, Reinstate, Save, Cancel, Shipper, Shipper 버튼,  Issue 체크버튼, Item(ADD, Excel Upload, Templete Download, DEL), Work Order, Cargo Receipt, SVO Freight 
				 */
				ComEnableObject(formObj.warehouse, false);	
				ComBtnDisable("btn_wh_cd");
				formObj.ord_tp_cd.disabled = true;
				formObj.load_tp_cd.disabled = true;
				ComEnableObject(formObj.est_in_dt, false);			
				ComBtnDisable("btn_est_in_dt");
				ComEnableObject(formObj.ctrt_no, false);
				ComBtnDisable("btn_ctrt_no");
				ComEnableObject(formObj.owner_cd, false);
				ComBtnDisable("btn_owner_cd");
				//ComBtnDisable("btn_owner_cd1");
				setEnableOwner("btn_owner_cd1", false, 5);
				ComEnableObject(formObj.supp_cd, false);
				ComBtnDisable("btn_supp_cd");
				//ComBtnDisable("btn_supp_cd1");
				setEnableVendor("btn_supp_cd1", false);
				formObj.issue.disabled=true;
				ComBtnDisable("btnSave");
				ComBtnDisable("btn_reinstate");
				ComBtnDisable("btn_cancel");
				link_button(vBkSts);
				po_item_button("");
				//PP/Item 수정 못함.
				//sheetObj.Editable = false;
			}
			//	3. Booking No Disabled
			ComEnableObject(formObj.wib_bk_no, false);
			formObj.issue.checked=false;
			// Inbound Complete 링크 활성화 여부
			var in_sts_cd=ComGetObjValue(formObj.in_sts_cd);
			if (formObj.bk_sts_cd.value == "I" && (in_sts_cd == "P" || in_sts_cd == "")) {
				ComBtnEnable("lnk_cargo");
			} else {
				ComBtnDisable("lnk_cargo");
			}			
			// Order Type 선택시
			ord_tp_cd_OnChange(null, ComGetObjValue(formObj.ord_tp_cd), null);		
	//		alert(arrXml[0]);		
	//		var est_in_dt		= getXmlDataNullToNullString(arrXml[0], "est_in_dt");
	//		alert(est_in_dt);		
			// Unloading Sheet 버튼 활성화 여부		
			if (ComParseInt(ComNullToZero(formObj.unload_sht_cnt.value)) > 0) {
				//alert("search...");
				btn_show_uploading_sheet(false);
			} else {
				//alert("new...");
				btn_show_uploading_sheet(true);
			}		
			}else {
		    	 ComShowCodeMessage("COM0192"); // W/H Booking No does not exist.
		    	 doHideProcess(false);
			}
	     
	     setOldValueAllObj();
	},100);
	
	
}

function setDataControl(sXml) {
	var formObj=document.form;
	var strtIndxField = sXml.indexOf("<FIELD>") + "<FIELD>".length;
	var endIndxField = sXml.indexOf("</FIELD>");
	
	var xmlDoc = $.parseXML(sXml.substring(strtIndxField,endIndxField));
	var $xml = $(xmlDoc);
	
	formObj.wib_bk_no.value = $xml.find( "wib_bk_no").text();
//	formObj.so_no.value = $xml.find( "so_no").text();
	formObj.ctrt_no.value = $xml.find( "ctrt_no").text();
	formObj.ctrt_nm.value = $xml.find( "ctrt_nm").text();
	formObj.sales_ofc_cd.value = $xml.find( "sales_ofc_cd").text();
//	formObj.rtp_no.value = $xml.find( "rtp_no").text();
	formObj.warehouse.value = $xml.find( "wh_cd").text();
	//formObj.warehouse.SetSelectCode($("#warehouse").val(),false);
	formObj.bk_date.value = convDate($xml.find( "bk_date").text());
	formObj.ord_tp_cd.value = $xml.find( "ord_tp_cd").text();
	formObj.bk_sts_cd.value = $xml.find( "bk_sts_cd").text();
	formObj.est_in_dt.value = convDate($xml.find( "est_in_dt").text());
	formObj.load_tp_cd.value = $xml.find( "load_tp_cd").text();
	formObj.fwd_dir.value = $xml.find( "fwd_dir").text();
	formObj.order_rel.value = $xml.find( "order_rel").text();
//	formObj.main_svc_type.value = $xml.find( "main_svc_type").text();
//	formObj.main_svc_nm.value = $xml.find( "main_svc_nm").text();
	formObj.owner_cd.value = $xml.find( "owner_cd").text();
	onblur_Owner("owner_cd");
	formObj.owner_addr1.value = $xml.find( "owner_addr1").text();
	formObj.supp_cd.value = $xml.find( "supp_cd").text();
	onblur_Supp("supp_cd");
	formObj.supp_addr1.value = $xml.find( "supp_addr1").text();
	formObj.buyer_cd.value = $xml.find( "buyer_cd").text();
	onblur_Buyer("buyer_cd");
	formObj.buyer_addr1.value = $xml.find( "buyer_addr1").text();
	formObj.cust_ord_no.value = $xml.find( "cust_ord_no").text();
	formObj.commc_inv_no.value = $xml.find( "commc_inv_no").text();
	formObj.dlv_ord_no.value = $xml.find( "dlv_ord_no").text();
	formObj.rmk.value = $xml.find( "rmk").text();
	formObj.vsl_cd.value = $xml.find( "vsl_cd").text();
	formObj.vsl_nm.value = ($xml.find( "vsl_nm").text().replaceAll("&lt;","<")).replaceAll("&gt;",">");
	formObj.voy.value = $xml.find( "voy").text();
	formObj.carrier_cd.value = $xml.find( "carrier_cd").text();
	formObj.carrier_nm.value = $xml.find( "carrier_nm").text();
	formObj.pol.value = $xml.find( "pol").text();
	formObj.pol_nm.value = $xml.find( "pol_nm").text().replaceAll("&quot;", "\"");
	formObj.etd.value =convDate( $xml.find( "etd").text());
	formObj.pod.value = $xml.find( "pod").text();
	formObj.pod_nm.value = $xml.find( "pod_nm").text().replaceAll("&quot;", "\"");
	formObj.eta.value =convDate( $xml.find( "eta").text());
	formObj.del.value = $xml.find( "del").text();
	
	formObj.del_nm.value = $xml.find( "del_nm").text().replaceAll("&quot;", "\"");
	formObj.in_sts_cd.value = $xml.find( "in_sts_cd").text();
	formObj.unload_sht_cnt.value = $xml.find( "unload_sht_cnt").text();
//	formObj.src_tp_cd.value = $xml.find( "src_tp_cd").text();
	formObj.ref_no.value = $xml.find( "ref_no").text();
	formObj.user_id.value = $xml.find( "user_id").text();
	formObj.org_cd.value = $xml.find( "org_cd").text();
}
function convDate(date) {
	if (date != 0){
		if (date.length == 8){
			var rtn = date.substring(4, 6) + "-" + date.substring(6, 8) + "-" + date.substring(0, 4);
			return rtn;
		}else if (date.length == 10){
			var rtn = date.substring(5,7) + "-" + date.substring(8, 10) + "-" + date.substring(0, 4);
			return rtn;
		}
	}else {
		return date;
	}
}
/**
 * Save
 */
function btn_Save() {
	if (ComDisableTdButton("btnSave", 1)) {
		return;
	}
	
	var formObj=document.form;
	var sheetObj=docObjects[2];
	var prefix="Grd01";
	// Forwarding Direction
	var vFwdDir= formObj.fwd_dir.value;
	//if (ComGetObjValue(formObj.form_mode) == "NEW") {
	//	return;
	//}
	if (formObj.warehouse.value == null || formObj.warehouse.value == "") {
		// Warehouse 체크
		ComShowCodeMessage("COM0278", "Warehouse");
		goTabSelect('01');
		formObj.warehouse.focus();
		return;
	} else if (isNull(formObj.bk_date)) {
		// Booking Date
		ComShowCodeMessage("COM0278", "Booking Date");
		goTabSelect('01');
		formObj.bk_date.focus();
		return;		
	} else if (ComGetObjValue(formObj.ord_tp_cd) == "") {
		// Order Type체크
		ComShowCodeMessage("COM0278", "Order Type");
		goTabSelect('01');
		formObj.ord_tp_cd.focus();
		return;
	} else if (ComGetObjValue(formObj.ord_tp_cd) == "A" && isNull(formObj.rmk)) {
		// Order Type이 Adjustment 인 경우 Remark/Reason for ADJ 필수입력
		// Remark/Reason for ADJ 체크
		ComShowCodeMessage("COM0278", "Reason for ADJ");
		goTabSelect('01');
		formObj.rmk.focus();
		return;
	} else if (isNull(formObj.est_in_dt)) {
		// Estimated In Date
		ComShowCodeMessage("COM0278", "Estimated IN Date");
		goTabSelect('01');
		formObj.est_in_dt.focus();
		return;
	} else if (vFwdDir == "") {
		// Forwarding Direction 체크
		ComShowCodeMessage("COM0082", "Forwarding Direction");
		return;
	} else if (isNull(formObj.ctrt_no)) {
		// Contract No 체크
		ComShowCodeMessage("COM0278", "Contract No");
		goTabSelect('01');
		formObj.ctrt_no.focus();
		return;
	} else if (isNull(formObj.owner_nm)) {
		// Owner 체크
		ComShowCodeMessage("COM0278", "Owner");
		goTabSelect('01');
		formObj.owner_cd.focus();
		return;
	/*	
	}else if(isNull(formObj.supp_cd) && (vFwdDir == "E")){
		//Shipper 체크 - Export Forwarding일 경우 Mandatory
		ComShowCodeMessage("COM0278", "Shipper(Supplier)");
		ComSetFocus(formObj.supp_cd);
		return ;
	}else if(isNull(formObj.buyer_cd) && (vFwdDir == "I")){
		//Consignee 체크
		ComShowCodeMessage("COM0278", "Consignee");
		ComSetFocus(formObj.buyer_cd);
		return ;
	*/	
	} else if ((formObj.bk_sts_cd.value== "I") && (sheetObj.RowCount()== 0)) {
		ComShowCodeMessage("COM0115"); // Please PO/Item enter at least one Row.
		return;
	} else if(formObj.rmk.value.length > 999) {
		// Reason for ADJ
		ComShowCodeMessage("COM0215", "Remark[1000]");
		formObj.rmk.focus();
		return;
	} else if (formObj.issue.checked) {
		if (sheetObj.RowCount()== 0) {
			ComShowCodeMessage("COM0115");
			return ;
		}
	} 
	
	if(!haveAnyChanged() && !getSaveString()){
		
		ComShowCodeMessage("COM0409"); 
		return;
	
	}

	// Booking Item 필수입력 CHECK	
	if (sheetObj.RowCount()> 0) {
		for (var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow()-1; i++) {
			// Item필수 입력 체크
			if (ComIsNull(sheetObj.GetCellValue(i, prefix+"item_cd"))) {
				ComShowCodeMessage("COM0162", i-1, "Item");
				sheetObj.SelectCell(i, prefix+"item_cd");
				return;				
			} 
			if (!ComIsNull(sheetObj.GetCellValue(i, prefix+"item_pkgunit"))) {
				//Unit은 입력되어있는데 pkg qty가 0일경우 체크
				/*
				  if (ComIsNull(sheetObj.cellValue(i, prefix+"item_pkgqty")) || sheetObj.cellValue(i, prefix+"item_pkgqty") == 0) {
					ComShowCodeMessage("COM0162", i-1, "[Estimated] QTY");
					sheetObj.SelectCell(i, prefix+"item_pkgqty");
					return;
				}
				*/
				//VIS에서 들어온건중 ITEM_CD가 TL_CTRT_CUST_ITEM에는 존재하지만 UNIT이 다른경우 체크(WMS건은 체크안함)
				if(sheetObj.GetCellValue(i, prefix+"invalid_yn") == "Y" && sheetObj.GetCellValue(i, prefix+"su_valid_yn") == "Y"
				  && sheetObj.GetCellValue(i, prefix+"pkg_info").indexOf(sheetObj.GetCellValue(i, prefix+"item_pkgunit"))	== -1
				  && sheetObj.GetCellValue(i, prefix+"ibflag") != "D"
				)
				{
					ComShowCodeMessage("COM0344");
					sheetObj.SelectCell(i, prefix+"item_pkgunit");
					return;
				}
			}	
			//VIS에서 들어온건중 ITEM_CD가 TL_CTRT_CUST_ITEM에는 존재하고 UNIT정보도 올바르기때문에 따로 수정작업을 안거쳤을경우
			//강제로 UPDATE모드로 바꿔주어야 프로시저내에서 INVALID_YN여부를 NULL로 업데이트칠수있으므로 IBFLAG모드를 수정한다.
			if(sheetObj.GetCellValue(i, prefix+"invalid_yn") == "Y" && sheetObj.GetCellValue(i, prefix+"su_valid_yn") == "Y"
				  && sheetObj.GetCellValue(i, prefix+"ibflag") == "R"
				)
			{
				//sheetObj.GetCellValue(i, prefix+"ibflag")="U";
				sheetObj.SetCellValue(i, prefix+"ibflag", "U");
			}
/*			
			// Pack Unit Definition Popup에서 체크
else if (isEmpty2(sheetObj.GetCellValue(i, prefix+"item_pkgunit"))) {
				ComShowCodeMessage("COM0162", i-1, "[Estimated] Unit");
				sheetObj.SelectCell(i, prefix+"item_pkgunit");
				return;				
} else if (sheetObj.GetCellValue(i, prefix+"item_pkgqty") == 0) {
				ComShowCodeMessage("COM0162", i-1, "[Estimated] QTY");
				sheetObj.SelectCell(i, prefix+"item_pkgqty");
				return;				
			}
*/			
		}		
	}	
	// 마스터가 등록되지 않거나 Pack Unit이 미등록 된 Item을 대상
	var chkCnt=0;
	for (var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow()-1; i++) {
		if ((ComIsNull(sheetObj.GetCellValue(i, prefix+"item_sys_no")) && !ComIsNull(sheetObj.GetCellValue(i, prefix+"item_cd"))) ||
				(!ComIsNull(sheetObj.GetCellValue(i, prefix+"item_sys_no")) && ComIsNull(sheetObj.GetCellValue(i, prefix+"item_pkgunit")))) {
			if(sheetObj.GetCellValue(i, prefix+"ibflag") != "D")
			{
				chkCnt++;
			}
		}
	}
	if (chkCnt > 0) {
		// 저장될 때 해당 Item이 있으면 Alert 띄우고 저장 안 됨.
		ComShowCodeMessage("COM0338"); // the Items unregistered in Item Master exists. Please define Pack Unit first.
		var sUrl="./WHInPackDefPopup.clt?ctrt_no="+formObj.ctrt_no.value+"&ctrt_nm="+formObj.ctrt_nm.value;
//		ComOpenPopup(sUrl, 1000, 600, "setPackDefItem", "0,0", true);	
		callBackFunc = "setPackDefItem";
	    modal_center_open(sUrl, callBackFunc, 1000,530,"yes");
	} else {
		wb_save();
	}
}
/**
 * Save
 * @param aryPopupData
 */
function setPackDefItem(rtnVal) {
	var formObj=document.form;
	var sheetObj=docObjects[2];
	var prefix="Grd01";
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
	//vis에서 들어온 건중 valid체크가 성공되지않은 건은 item_cd 재검색후 item_sys_no재셋팅
	// Booking Item 필수입력 CHECK	
		if (sheetObj.RowCount()> 0) {
			for (var i=sheetObj.HeaderRows(); i<=sheetObj.LastRow()-1; i++) {
				if(sheetObj.GetCellValue(i, prefix+"invalid_yn") == "Y" && sheetObj.GetCellValue(i, prefix+"su_valid_yn") != "Y")
				{
					var Row=i;
					var rtnValAry=rtnVal.split("|");
					// item code 변경시 Pack Master (TL_CTRT_CUST_ITEM)의 패키지 Level1 기본 정보를 가져온다			
					var sParam="ctrt_no="+ComGetObjValue(formObj.ctrt_no)+"&item_cd="+encodeURIComponent(sheetObj.GetCellValue(Row, prefix+"item_cd"));
					var sXml=sheetObj.GetSearchData("./searchWHItemCodeInfoGS.clt?"+sParam + "&f_cmd=" + SEARCH02);	
					if (sXml.replace(/^\s+|\s+$/gm,'') != ''){
						setDataControl_searchWHItemCodeInfo(sXml, Row);
					}
				}
			}
		}
	}
}

function setDataControl_searchWHItemCodeInfo(sXml, Row) {
	var formObj=document.form;
	var sheetObj=docObjects[2];
	var strtIndxField = sXml.indexOf("<FIELD>") + "<FIELD>".length;
	var endIndxField = sXml.indexOf("</FIELD>");
	
	var xmlDoc = $.parseXML(sXml.substring(strtIndxField,endIndxField));
	var $xml = $(xmlDoc);
	
	formObj.wib_bk_no.value = $xml.find( "wib_bk_no").text();
	sheetObj.SetCellValue(Row, prefix+"item_sys_no",$xml.find( "item_sys_no").text(),0);
	sheetObj.SetCellValue(Row, prefix+"item_nm",$xml.find( "item_nm").text(),0);
	sheetObj.SetCellValue(Row, prefix+"lv1_cbm",$xml.find( "lv1_cbm").text() ,0);
	sheetObj.SetCellValue(Row, prefix+"lv1_cbf",$xml.find( "lv1_cbf").text() ,0);
	sheetObj.SetCellValue(Row, prefix+"lv1_grs_kgs",$xml.find( "lv1_grs_kgs").text(),0);
	sheetObj.SetCellValue(Row, prefix+"lv1_grs_lbs",$xml.find( "lv1_grs_lbs").text(),0);
	sheetObj.SetCellValue(Row, prefix+"lv1_net_kgs",$xml.find( "lv1_net_kgs").text(),0);
	sheetObj.SetCellValue(Row, prefix+"lv1_net_lbs",$xml.find( "lv1_net_lbs").text(),0);
	//ITEM MASTER정보
	sheetObj.SetCellValue(Row, prefix+"pkg_lv1_qty",$xml.find( "pkg_lv1_qty").text(),0);
	sheetObj.SetCellValue(Row, prefix+"pkg_lv1_unit_cd",$xml.find( "pkg_lv1_unit_cd").text(),0);
	sheetObj.SetCellValue(Row, prefix+"pkg_lv2_qty",$xml.find( "item_pkgbaseqty").text(),0);
	sheetObj.SetCellValue(Row, prefix+"pkg_lv2_unit_cd",$xml.find( "item_pkgunit").text(),0);
	sheetObj.SetCellValue(Row, prefix+"pkg_lv3_qty",$xml.find( "pkg_lv3_qty").text(),0);
	sheetObj.SetCellValue(Row, prefix+"pkg_lv3_unit_cd",$xml.find( "pkg_lv3_unit_cd").text(),0);
	sheetObj.SetCellValue(Row, prefix+"pkg_lv4_qty",$xml.find( "pkg_lv4_qty").text(),0);
	sheetObj.SetCellValue(Row, prefix+"pkg_lv4_unit_cd",$xml.find( "pkg_lv4_unit_cd").text(),0);
	sheetObj.SetCellValue(Row, prefix+"pkg_info",$xml.find( "pkg_info").text(),0);
	// item sys no 존재시					
	if (!ComIsNull(sheetObj.GetCellValue(Row, prefix + "item_sys_no"))) {
		//valid 체크 성공 flag 변경(su_valid_yn = 'Y'로)
		sheetObj.SetCellValue(Row, prefix+"su_valid_yn",'Y',0);
		// item_eq_qty로 환산후, 조회된 마스터의 Meature 정보로 CBM GWT NWT를 재계산한다
		fnCalcItemEaQtyExcelData(sheetObj, Row, "");
	}
}
/**
 * Save
 */
function wb_save() {	
	var formObj=document.form;
	var sheetObj=docObjects[2];
	var prefix="Grd01";
	if (ComShowCodeConfirm("COM130101")) {
		// Issue 확인
		if (formObj.issue.checked) {
			formObj.issue.value="Y";
		} else {
			formObj.issue.value="N";
		}
		formObj.f_cmd.value = MODIFY;
		var sParam=FormQueryString(formObj);		
		sParam += "&" + sheet3.GetSaveString();
 		var saveXml=docObjects[2].GetSaveData("./saveWHInbkInfoGS.clt", sParam);
 		docObjects[2].LoadSaveData(saveXml);
		// Save 후 조회
/*		
		if (saveXml.indexOf('<ERROR>') == -1) {			
			ComShowCodeMessage("COM0093", ""); // Saved successfully.
			var InputName="c_wib_bk_no";	
			ComsetXmlDataToForm2(saveXml, InputName, 0);
			btn_Search();
		}
*/
 		if(saveXml.replace(/^\s+|\s+$/gm,'') != ''){
 			var xmlDoc = $.parseXML(saveXml);
 			var $xml = $(xmlDoc);
 			var message = $xml.find("result").text();
// 			ComShowMessage(message);
 			//Change Save - Deleted -Confrimed - Cancel 'Successfully' to showCompleteProcess();
			showCompleteProcess();
 			
			var vMsgs=message.split('[');
			var vWbNo=vMsgs[1].replaceAll(']', '');
			setFieldValue(formObj.c_wib_bk_no, vWbNo);
			btn_Search();
		}
	}
}
/**
 * Copy
 */
function btn_Copy() {	
	if (ComDisableTdButton("btnCopy", 1)) {
		return;
	}
	var formObj=document.form;
	if (ComGetObjValue(formObj.form_mode) == "NEW") {
		return;
	}
	if (ComShowCodeConfirm("COM132611")) { // Do you want to copy?		
		setFieldValue(formObj.c_wib_bk_no, "");
		/*
		 * 2. Data clear
		 *  Booking No, PO/ITEM GRID, Service Order No
		 */
		setFieldValue(formObj.wib_bk_no, "");
//		setFieldValue(formObj.so_no, "");
		setFieldValue(formObj.in_sts_cd, "");
		setFieldValue(formObj.unload_sht_cnt, "");
		docObjects[0].RemoveAll();
		docObjects[1].RemoveAll();
		docObjects[2].RemoveAll();
		docObjects[3].RemoveAll();
		docObjects[4].RemoveAll();
		/*
		 * 3. 열어줄필드
		 * Contract No, Route Plan No, Shipper, Consignee, Contract 버튼,  Shipper 버튼,  Consignee 버튼, ISSUE 체크박스, Save
		 */
		ComEnableObject(formObj.warehouse, true);	
//		ComBtnEnable("btn_wh_cd");
		formObj.ord_tp_cd.disabled = false;
		formObj.load_tp_cd.disabled = false;
		ComEnableObject(formObj.est_in_dt, true);			
		ComBtnEnable("btn_est_in_dt");
		ComEnableObject(formObj.ctrt_no, true);
		ComBtnEnable("btn_ctrt_no");
		ComEnableObject(formObj.owner_nm, true);
		ComBtnEnable("btn_owner_cd");
		//ComBtnEnable("btn_owner_cd1");
		setEnableOwner("btn_owner_cd1", true, 5);
		ComEnableObject(formObj.supp_nm, true);
		ComBtnEnable("btn_supp_cd");
		//ComBtnEnable("btn_supp_cd1");
		setEnableVendor("btn_supp_cd1", true);
		ComEnableObject(formObj.buyer_nm, true);
		ComBtnEnable("btn_buyer_cd");
		//ComBtnEnable("btn_buyer_cd1");
		setEnableConsignee("btn_buyer_cd1", true);
		formObj.issue.disabled=false;
		formObj.issue.checked=false;
		ComBtnEnable("btnSave");
		formObj.fwd_dir.disabled = false;
		/*
		 * 4. FORM_MODE = NEW, Booking Status = 'N' 
		 */
		setFieldValue(formObj.form_mode, "NEW");
		formObj.bk_sts_cd.value = "N";
		/*
		 * 5. Booking Office/PIC 로그인 세션값으로
		 */
		//setFieldValue(formObj.bk_stff_ofc_cd, ComGetObjValue(formObj.org_cd));
		//setFieldValue(formObj.bk_stff_id, ComGetObjValue(formObj.user_id));
		setFieldValue(formObj.bk_stff_nm, ComGetObjValue(formObj.user_nm));
		/*
		6. 버튼활성화
	    - Disabled=true
	      SVO No, Work Order, Cargo Receipt, Reinstate, SVO Freight
	    - Disabled=false
	      Save, Cancel, Shipper, Shipper 버튼,  Issue 체크버튼, Item(ADD, Excel Upload, Templete Download, DEL)
		*/
//		ComEnableObject(formObj.so_no, false);
		ComBtnEnable("btnSave");
		ComBtnDisable("btn_reinstate");
		ComBtnDisable("btn_cancel");
		ComBtnDisable("btn_create_uploading_sheet");
		setEnableUnloadSht("btn_document_uploading_sheet", false, 5);
		imgFlg = false;
		link_button("");
		fwd_dir_OnChange();
		ComBtnDisable("lnk_cargo");
		//	3. Booking No
		ComEnableObject(formObj.wib_bk_no, true);
		//Copy 시 Booking Date 를 Today로 설정
		var date_now = ComGetNowInfo("mdy");
		setFieldValue(formObj.bk_date, date_now);
		setFieldValue(formObj.old_ctrt_no, ComGetObjValue(formObj.ctrt_no));		
		//PO/Item 활성화
		docObjects[2].SetEditable(1);
	}
}
/**
 * Reinstate 
 */
function btn_Reinstate() {	
	if (ComDisableTdButton("btn_reinstate", 1)) {
		return;
	}
	var formObj=document.form;
	if (ComGetObjValue(formObj.form_mode) == "NEW") {
		return;
	}	
	var sheetObj=docObjects[2];
	if (ComShowCodeConfirm("COM0061")) { // Do you want to reinstate?
		formObj.f_cmd.value = MODIFY01;
		var sParam=FormQueryString(formObj,null, "");
 		var saveXml=sheetObj.GetSaveData("./reinstateWHInbkInfoGS.clt",sParam);
		//1. Reinstate 후 조회
 		if(saveXml.replace(/^\s+|\s+$/gm,'') != ''){
 			var strtIndxField = saveXml.indexOf("<FIELD>") + "<FIELD>".length;
 			var endIndxField = saveXml.indexOf("</FIELD>");
 			var xmlDoc = $.parseXML(saveXml.substring(strtIndxField,endIndxField));
 			var $xml = $(xmlDoc);
 			if ($xml.find("message").text() != ''){
 				ComShowMessage($xml.find("message").text());
 				setFieldValue(formObj.c_wib_bk_no, ComGetObjValue(formObj.wib_bk_no));
 				btn_Search();
 			}else {
 				ComShowCodeMessage("COM0268", "");
 				
 			/*	//Change Save - Deleted - Confrimed - Cancel - Updated 'Successfully' to showCompleteProcess();
				showCompleteProcess();*/
 				
	 			setFieldValue(formObj.c_wib_bk_no, ComGetObjValue(formObj.wib_bk_no));
	 			btn_Search();
			}
 		}
	}
}
/** 
 * New()
 */
function btn_New() {
	if (ComDisableTdButton("btn_new", 1)) {
		return;
	}
	// All the data you input in this page will be wiped off. Continue? 	
	if (ComShowCodeConfirm("COM0309")) {
		var currLocUrl=this.location.href;
		var hasPlNo = currLocUrl.indexOf("fwd_bk_no");
		if(hasPlNo > 0){
			currLocUrl=currLocUrl.substring(0, currLocUrl.indexOf('.clt'));
			currLocUrl='.'+currLocUrl.substring(currLocUrl.lastIndexOf('/'), currLocUrl.length)+'.clt?callId=NEW['+(new Date()).getTime()+']';
		
			//parent.mkNewFrame(formObj.screen_title.value, currLocUrl);
			window.location.href = currLocUrl;
		}else{
			location.reload();
		}
	}
}
function wBin_New(){
	var formObj=document.form;
	//Button&Link Disable
    //Reinstate, SVO Freight
	link_button("");
	ComBtnDisable("lnk_cargo");
	//formObj.fwd_dir.disabled = false;
	formObj.fwd_dir.disabled = false;
	formObj.bk_sts_cd.disabled = true;
	formObj.order_rel.disabled = true;
	//formObj.wb_src_cd.Enable = false;
	// Warehouse&Contract 세션 정보 Default 세팅
//	setFieldValue(formObj.wh_cd, ComGetObjValue(formObj.def_wh_cd));
//	setFieldValue(formObj.wh_nm, ComGetObjValue(formObj.def_wh_nm));
	formObj.warehouse.value = ComGetObjValue(formObj.def_wh_cd);
	setFieldValue(formObj.ctrt_no, ComGetObjValue(formObj.def_wh_ctrt_no));	
	setFieldValue(formObj.ctrt_nm, ComGetObjValue(formObj.def_wh_ctrt_nm));
	setFieldValue(formObj.old_ctrt_no, ComGetObjValue(formObj.def_wh_ctrt_no));
	if (!isNull(formObj.ctrt_no)) {
		searchTlCtrtInfo();
	}
	//초기값 세팅
	//comboObjects[0].SetSelectCode("P");//Order Type
//	comboObjects[1].SetSelectCode("N");//Booking Status="Booked"
	formObj.bk_sts_cd.value = "N";
//	comboObjects[0].SetSelectIndex(0);//Order Type
	formObj.ord_tp_cd.value = "0";
	
	//comboObjects[3].Code = "G";  //Forwarding Direction = "No Forwarding Related"		
	setFieldValue(formObj.form_mode, "NEW");
	//setFieldValue(formObj.bk_stff_ofc_cd, ComGetObjValue(formObj.org_cd));
	//setFieldValue(formObj.bk_stff_id, ComGetObjValue(formObj.user_id));
	setFieldValue(formObj.bk_stff_nm, ComGetObjValue(formObj.user_nm));
	//setFieldValue(formObj.bk_date, ComGetObjValue(formObj.curr_date));
	setFieldValue(formObj.bk_date, ComGetNowInfo("mdy"));
	ComBtnDisable("btn_create_uploading_sheet");
	setEnableUnloadSht("btn_document_uploading_sheet", false, 5);
	imgFlg = false;
}
/**
 * Cancel 
 */
function btn_Cancel() {	
	if (ComDisableTdButton("btn_cancel", 1)) {
		return;
	}
	var formObj=document.form;
	var sheetObj=docObjects[2];
	if (ComGetObjValue(formObj.form_mode) == "NEW") {
		return;
	}
	//1. 같은 branch만 cancel 가능
//	if (ComGetObjValue(formObj.bk_stff_ofc_cd) != ComGetObjValue(formObj.org_cd)) {
//		ComShowCodeMessage("COM0189");
//		return ;
//	}
	if (ComShowCodeConfirm("COM0045")) { // Do you want to continue Warehouse Booking cancel?
		formObj.f_cmd.value = REMOVE;
		var sParam=FormQueryString(formObj, "");
 		var saveXml=sheetObj.GetSaveData("./cancelWHInbkInfoGS.clt", sParam);
		//1. Cancel 후 조회
 		if(saveXml.replace(/^\s+|\s+$/gm,'') != ''){
 			var strtIndxField = saveXml.indexOf("<FIELD>") + "<FIELD>".length;
 			var endIndxField = saveXml.indexOf("</FIELD>");
 			var xmlDoc = $.parseXML(saveXml.substring(strtIndxField,endIndxField));
 			var $xml = $(xmlDoc);
 			if ($xml.find("message").text() != ''){
 				ComShowMessage($xml.find("message").text());
 				setFieldValue(formObj.c_wib_bk_no, ComGetObjValue(formObj.wib_bk_no));
 				btn_Search();
 			}else {
// 				ComShowCodeMessage("COM0079", "");
 				//Change Save - Deleted -Confrimed - Cancel 'Successfully' to showCompleteProcess();
				showCompleteProcess();
				
	 			setFieldValue(formObj.c_wib_bk_no, ComGetObjValue(formObj.wib_bk_no));
	 			btn_Search();
			}
 		}
	}
}
/**
 * Print
 */
function btn_Print() {
	if (ComDisableTdButton("lnk_print", 2)) {
		return;
	}	
	var formObj=document.form;
	var wib_bk_no=ComGetObjValue(formObj.wib_bk_no);
	if (ComIsEmpty(wib_bk_no)) {
		ComShowCodeMessage("COM0015"); // Booking No does not exist.
		return;
	}	
	// Unloading Sheet 버튼 활성화 여부
	var unload_sht_yn="N";
	if (ComParseInt(ComNullToZero(formObj.unload_sht_cnt.value)) > 0) {
		//ComShowCodeMessage("COM0321"); // No unloading sheet is created.
		//return;
		unload_sht_yn="Y";
	}		
	// Warehouse In Booking Print Option 팝업 호출시.
    // letter_yn 은 Print 양식이 Letter Size 일 경우 "Y" 로 일반양식일 경우는 "N" 값을 넘겨 주시면 됩니다.	
	var sUrl="./WHInPrintOption.clt?wib_bk_no=" + wib_bk_no + "&letter_yn=N";
//	ComOpenPopup(sUrl, 250, 270, "setWHInPrintOption", "0,0", true);
	callBackFunc = "setWHInPrintOption";
	modal_center_open(sUrl, callBackFunc, 250,200,"yes");
}
function setWHInPrintOption(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		  return;
		 }else{
			 //var rtnValArr = rtnVal.split("|");
		 }
}
/**
 * Work Order
 */
function btn_Work_Order() {
	if (ComDisableTdButton("lnk_work", 2)) {
		return;
	}
	var formObj=document.form;
	var sheetObj=docObjects[4];
 	var sXml=sheetObj.GetSearchData("./existsWOGS.clt", "flag=WO&sb_no="+ComGetObjValue(formObj.wib_bk_no) +"&f_cmd=" +SEARCH03);
 	if(sXml.replace(/^\s+|\s+$/gm,'') != ''){
 		var strtIndxField = sXml.indexOf("<FIELD>") + "<FIELD>".length;
 		var endIndxField = sXml.indexOf("</FIELD>");
 		
 		var xmlDoc = $.parseXML(sXml.substring(strtIndxField,endIndxField));
 		var $xml = $(xmlDoc);
 		var wo_cnt= $xml.find( "wo_cnt").text(); 
 		var wo_sts_cd= $xml.find( "wo_sts_cd").text(); 
 		var wo_no= $xml.find( "wo_no").text();
			}
	if (wo_cnt > 0) {
		if (ComShowCodeConfirm("COM0243")) { // Work Order exists. Want to create another new Work Order?
			var sParam=FormQueryString(formObj, "");	
 			var saveXml=sheetObj.GetSaveData("addWOWHInbk.clt", sParam);
 			sheetObj.LoadSaveData(saveXml);
			if (saveXml.indexOf('<MESSAGE>') == -1) {
				setFieldValue(formObj.c_wib_bk_no, ComGetObjValue(formObj.wib_bk_no));
				btn_Search();
				moveWorkOrder(ComGetEtcData(saveXml, "wo_no"));
			}			
		}
	} else {
		if (ComShowCodeConfirm("COM0035")) { // Do you want WorkOrder creation?
			var sParam=FormQueryString(formObj,null, "");	
 			var saveXml=sheetObj.GetSaveData("addWOWHInbk.clt", sParam);
 			sheetObj.LoadSaveData(saveXml);
			if (saveXml.indexOf('<MESSAGE>') == -1) {
				setFieldValue(formObj.c_wib_bk_no, ComGetObjValue(formObj.wib_bk_no));
				btn_Search();
				moveWorkOrder(ComGetEtcData(saveXml, "wo_no"));
			}			
		}
	}
}
function moveWorkOrder(wo_no){
	var sUrl="./WOMgmt.clt?wo_no="+wo_no;
	parent.mkNewFrame('Work Order Management', sUrl, "WOMgmt_" + wo_no);
}
/**
 * Inbound Complete
 */
function btn_Cargo_Receipt(){
	if(ComDisableTdButton("lnk_cargo", 2))
		return ;	
	var formObj=document.form;	
/*	
	var sheetObj=docObjects[5];
//	var sXml = sheetObj.GetSearchXml("existsWHIC.clt", "flag=CR&sb_no="+ComGetObjValue(formObj.wib_bk_no));	
//	var wo_cnt		= getXmlDataNullToNullString(sXml,"wo_cnt");
//	var wo_sts_cd 	= getXmlDataNullToNullString(sXml,"wo_sts_cd");		
//	var wo_no 		= getXmlDataNullToNullString(sXml,"wo_no");	
	var sParam="search_tp=WIB_BK_NO&search_no="+ComGetObjValue(formObj.wib_bk_no);
 	var sXml=sheetObj.GetSearchData("existsWHIC.clt", "wib_bk_no="+ComGetObjValue(formObj.wib_bk_no));
	var ic_cnt=parseInt(getXmlDataNullToNullString(sXml, "ic_cnt"));
	if (ic_cnt == 0) {
		var sUrl="./WHICMgmt.clt?"+sParam;
		parent.mkNewFrame('Inbound Complete Creation', sUrl);
	} else if (ic_cnt == 1) {
		var sUrl="./WHICUpdate.clt?"+sParam;
		parent.mkNewFrame('Inbound Complete Update', sUrl);
	} else if (ic_cnt > 1) {
		var sUrl="./WHICList.clt?"+sParam;
		parent.mkNewFrame('Inbound Complete Search', sUrl);
	}
*/
	// IN_STS_CD가 Partial(P) , null일 경우 이동
	var in_sts_cd=ComGetObjValue(formObj.in_sts_cd);
	var sParam="search_tp=WIB_BK_NO&search_no="+ComGetObjValue(formObj.wib_bk_no);
	if (formObj.bk_sts_cd.value == "I" && (in_sts_cd == "P" || in_sts_cd == "")) {
		var sUrl="./WHICMgmt.clt?"+sParam;
		parent.mkNewFrame('Inbound Complete Management', sUrl, "WHICMgmt_" + "WIB_BK_NO" +"_"+ ComGetObjValue(formObj.wib_bk_no));
	}	
}
function btn_SVO_Freight(){
	if(ComDisableTdButton("lnk_svo", 2))
		return ;
	var formObj=document.form;
	var sParam="doc_cls_cd=S&frt_doc_no="+ComGetObjValue(formObj.so_no);
	var sUrl="./FreightMgmt.clt?"+sParam;
	parent.mkNewFrame('Freight Management', sUrl, "FreightMgmt_" + "S" +"_"+ ComGetObjValue(formObj.so_no));
}
function btn_link_ctrt(){
	var formObj=document.form;
	if(!ComIsEmpty(formObj.ctrt_no)){
		var sUrl="./CtrtMgmt.clt?ctrt_no="+formObj.ctrt_no.value;
		parent.mkNewFrame('Contract Management', sUrl, "CtrtMgmt_" + formObj.ctrt_no.value);
	}
}
function btn_link_rpt(){
	var formObj=document.form;
	if(!ComIsEmpty(formObj.rtp_no)){
		var sUrl="./RoutePlanMgmt.clt?rtp_no="+formObj.rtp_no.value;
		parent.mkNewFrame('Route Plan Management', sUrl, "RoutePlanMgmt_" + formObj.rtp_no.value);
	}
}
function btn_link_so(){
	var formObj=document.form;
	if(!ComIsEmpty(formObj.so_no)){
		var sUrl="./ServiceOrderMgmt.clt?so_no="+formObj.so_no.value;
		parent.mkNewFrame('Service Order Management', sUrl, "ServiceOrderMgmt_" + formObj.so_no.value);
	}
}
function on_btn_dt(name){
	if (ComDisableTdButton("btn_est_in_dt", 2)) {
		return;
	}
	var formObj=document.form;
	var cal=new ComCalendar();
	cal.select(eval("formObj."+name), 'MM-dd-yyyy');
}
function on_enter_customer(name, valObj){ 
	var formObj=document.form;
	var funName="";
	if(name == "owner_cd"){
		funName="setOwnerInfo";
	}else if(name == "supp_cd"){
		funName="setShipperInfo";
	}else if(name == "buyer_cd"){
		funName="setConsigneeInfo";
	}
	var sParam="cust_cd="+ComGetObjValue(eval("formObj."+name));
	sParam += "&ctrt_no="+ComGetObjValue(formObj.ctrt_no);
	sParam += "&ctrt_nm="+ComGetObjValue(formObj.ctrt_nm);
	
	var sUrl="./CMM_POP_0010.clt?"+sParam;
	rtnary=new Array(2);
	rtnary[0]="1";//openMean 1=화면에서 오픈, 2=그리드에서 오픈
	if(typeof(valObj)!='undefined'){
		rtnary[1]=valObj;
	}else{
		rtnary[1]="";
	}
	rtnary[2]=window;
	callBackFunc = funName;
	modal_center_open(sUrl, rtnary, 1150,650,"yes");   
}
function on_btn_customer(name){
	var formObj=document.form;
	var funName="";
	if(name == "owner_cd"){
		funName="setOwnerInfo";
	}else if(name == "supp_cd"){
		funName="setShipperInfo";
	}else if(name == "buyer_cd"){
		funName="setConsigneeInfo";
	}
	var sParam="cust_cd="+ComGetObjValue(eval("formObj."+name));
	sParam += "&ctrt_no="+ComGetObjValue(formObj.ctrt_no);
	sParam += "&ctrt_nm="+ComGetObjValue(formObj.ctrt_nm);
   	var sUrl="./CMM_POP_0010.clt?"+sParam;
//	ComOpenPopup(sUrl, 900, 670, funName, "0,0", true);
   	callBackFunc = funName;
    modal_center_open(sUrl, callBackFunc, 1150,650,"yes");
}
/**
 * Contract No 버튼 클릭시
 */
function on_btn_ctrt_no(){
	var formObj=document.form;
	if (docObjects[2].RowCount()== 0) {
		searchTlCtrtPopup();
	} else {			
		if (ComShowCodeConfirm("COM0294")) { // PO/Item will be deleted. Are you sure to change?;
			docObjects[2].RemoveAll();
			searchTlCtrtPopup();
		} else {
			setFieldValue(formObj.ctrt_no, ComGetObjValue(formObj.old_ctrt_no));
		}
	}
}
/**
 * Contract No 버튼 클릭시 Booking Item 삭제 체크
 */
function searchTlCtrtPopup() {
	var formObj=document.form;
	var ord_tp_lvl1_cd="\'P\'";
	var sUrl="./ContractRoutePopup.clt?ctrt_no="+formObj.ctrt_no.value+"&ctrt_nm="+formObj.ctrt_nm.value+"&ctrt_use_flg=A";
//	ComOpenPopup(sUrl, 900, 620, "setContractInfo", "0,0", true);
	callBackFunc = "setContractInfo";
    modal_center_open(sUrl, callBackFunc, 900, 580,"yes");
	//Owner 디폴트 작업
	if (!isNull(formObj.ctrt_no)) {
		if (isNull(formObj.owner_cd)) {
			searchTlCustInfo("owner", ComGetObjValue(formObj.temp_owner_cd));
		} else {			
			if (ComGetObjValue(formObj.owner_cd) != ComGetObjValue(formObj.temp_owner_cd)) {
				if (ComShowCodeConfirm("COM0272")) { // Do you want to update the account info (Owner/Shpr/Cnee) with the Contract No changed?
					searchTlCustInfo("owner", ComGetObjValue(formObj.temp_owner_cd));
				}else{
					 ComClosePopup();
					return;
				}
			}
		}
	}
}
function on_btn_vsl(){
	var formObj=document.form;
	rtnary=new Array(2);
	rtnary[0]=1;
	rtnary[1]=formObj.vsl_nm.value;
	var sUrl="./CMM_POP_0140.clt";
//	ComOpenPopup(sUrl, 900, 550, "setVslInfo", "0,0", true);
	callBackFunc = "setVslInfo";
    modal_center_open(sUrl, rtnary, 900,550,"yes");
}
function setVslInfo(rtnVal){
	var formObj=document.form;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
	setFieldValue(formObj.vsl_cd,    	rtnValAry[0]);
	setFieldValue(formObj.vsl_nm, 	rtnValAry[1]);
	}
}
function on_btn_carrier(){
	var formObj=document.form;
	var nameObj = formObj.carrier_nm.value;
    rtnary=new Array(2);
	rtnary[0]="1";
	if(typeof(nameObj)!='undefined'){
		rtnary[1]= nameObj;
	}else{
		rtnary[1]="";
	}
	rtnary[2]=window;
	
    callBackFunc = "setCarrierInfo";
    modal_center_open('./CMM_POP_0010.clt', rtnary, 1150,650,"yes");
//	var sUrl="./CMM_POP_0010.clt?cust_cd="+formObj.carrier_cd.value+"&in_part_tp=P"+"&ctrt_no="+formObj.ctrt_no.value+"&ctrt_nm="+formObj.ctrt_nm.value;
//	modal_center_open(sUrl, "callBackFunc", 900, 670,"yes");
}
function setCarrierInfo(rtnVal){
	var formObj=document.form;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
	setFieldValue(formObj.carrier_cd,rtnValAry[0]);
	setFieldValue(formObj.carrier_nm,rtnValAry[2]);
	}
}
function on_btn_pol(){
	var formObj=document.form;
	rtnary=new Array(3);
	rtnary[0]= "";
	rtnary[1]= "";
	rtnary[2]= "";
	//var sUrl="./CMM_POP_0030.clt?type=P&loc_cd="+formObj.pol.value;
	var sUrl="./CMM_POP_0030.clt";
	callBackFunc = "setPolLocInfo";
	modal_center_open(sUrl, rtnary, 900, 450,"yes");
}
function setPolLocInfo(rtnVal){
	var formObj=document.form;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
	setFieldValue(formObj.pol,			rtnValAry[0]);
	setFieldValue(formObj.pol_nm,	rtnValAry[2]);
	}
}
function on_btn_pod(){
	var formObj=document.form;
	rtnary=new Array(3);
	rtnary[0]="";
	rtnary[1]="";
	rtnary[2]="";
	//var sUrl="./CMM_POP_0030.clt?type=P&loc_cd="+formObj.pod_nm.value;
	var sUrl="./CMM_POP_0030.clt"
	callBackFunc = "setPodLocInfo";
	modal_center_open(sUrl, rtnary, 900, 450,"yes");
}
function setPodLocInfo(rtnVal){
	var formObj=document.form;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
	setFieldValue(formObj.pod,			rtnValAry[0]);
	setFieldValue(formObj.pod_nm,	rtnValAry[2]);
}
}
function on_btn_del(){
	var formObj=document.form;
	rtnary=new Array(3);
	rtnary[0]="";
	rtnary[1]="";
	rtnary[2]="";
	//var sUrl="./CMM_POP_0030.clt?type=P&loc_cd="+formObj.del_nm.value;
	var sUrl="./CMM_POP_0030.clt";
	callBackFunc = "setDelLocInfo";
	modal_center_open(sUrl,rtnary , 900, 450,"yes");
}
function setDelLocInfo(rtnVal){
	var formObj=document.form;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
	setFieldValue(formObj.del,			rtnValAry[0]);
	setFieldValue(formObj.del_nm,	rtnValAry[2]);
	}
}
/**
 * Contract No 팝업에서 결과 선택시 리턴
 * @param aryPopupData
 */
function setContractInfo(rtnVal) {
	var formObj=document.form;
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
	var formObj=document.form;
	setFieldValue(formObj.ctrt_no,				rtnValAry[13]);
	setFieldValue(formObj.ctrt_nm,			    rtnValAry[14]);
	setFieldValue(formObj.sales_ofc_cd,	    rtnValAry[16]);
	setFieldValue(formObj.sales_pic_nm,	    rtnValAry[19]);
	setFieldValue(formObj.rtp_no,				rtnValAry[15]);
	setFieldValue(formObj.main_svc_type,       rtnValAry[20]);
	setFieldValue(formObj.main_svc_nm,	        rtnValAry[21]);
	setFieldValue(formObj.temp_owner_cd,		rtnValAry[22]);
	// Owner 정보 세팅
	setFieldValue(formObj.owner_cd,		    rtnValAry[8]);
	var sheetObj=docObjects[5];
	if (!isNull(formObj.owner_cd)) {
		ajaxSendPost(result_setContractInfo, 'reqVal', '&goWhere=aj&bcKey=searchCodeName&codeType=trdpCode'+"&s_code="+ComGetObjValue(formObj.owner_cd), './GateServlet.gsl');
	}	
	}
}

function result_setContractInfo (reqVal){
	var doc=getAjaxMsgXML(reqVal);
	 var formObj=document.form;
	 if(doc[0]=='OK'){
	  if(typeof(doc[1])!='undefined'){
	   //조회해온 결과를 Parent에 표시함
	   var rtnArr=doc[1].split('@@^');
	   if(rtnArr[0] != ""){
		   var sheetObj=docObjects[5];		
		   if (!(rtnArr[0] == "" || rtnArr[0] == "null")) {
				setFieldValue(formObj.owner_addr1, rtnArr[1]);
				setFieldValue(formObj.owner_nm, rtnArr[3]);
			}
	   }
	   else{
		   setFieldValue(formObj.owner_addr1,'');
	   }
	  }
	 }
	
}
function setOwnerInfo(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		  return;
		 }else{
			 var rtnValArr = rtnVal.split("|");
				var formObj=document.form;
				setFieldValue(formObj.owner_cd,    rtnValArr[0]);
				setFieldValue(formObj.owner_nm,    rtnValArr[2]);
				setFieldValue(formObj.owner_addr1, rtnValArr[7]);
				if(fastOwnerFlg &&  (ComGetObjValue(formObj.form_mode) == "NEW")){
					//Forwarding Direction
					var vFwdDir= formObj.fwd_dir.value;
					if(vFwdDir == "I")
						searchTlCustInfo("supp", ComGetObjValue(formObj.owner_cd));
					else if(vFwdDir == "E")
						searchTlCustInfo("buyer", ComGetObjValue(formObj.owner_cd));
					fastOwnerFlg=false;
				}
		 }
}
function setShipperInfo(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		  return;
		 }else{
			 var rtnValArr = rtnVal.split("|");
	var formObj=document.form;
	setFieldValue(formObj.supp_cd,    rtnValArr[0]);
	setFieldValue(formObj.supp_nm,    rtnValArr[2]);
	setFieldValue(formObj.supp_addr1, rtnValArr[7]);
}
}
function setConsigneeInfo(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		  return;
		 }else{
			 var rtnValArr = rtnVal.split("|");
	var formObj=document.form;
	setFieldValue(formObj.buyer_cd,    rtnValArr[0]);
	setFieldValue(formObj.buyer_nm,    rtnValArr[2]);
	setFieldValue(formObj.buyer_addr1, rtnValArr[7]);
}
}


function ComAlertFocus(obj, message) {
	try{
		if ( message != '') ComShowMessage( message );
		obj.focus();
    } catch(err) { ComFuncErrMsg(err.message); }
}

/*
 * BL Load 팝업 데이터 리턴
 */
function BL_Load() {
	var formObj=document.form;	
	if (ComDisableTdButton("btn_bl_load", 1)) {
		return;
	}
	var sUrl="./WOLoadPopup.clt?popup_flag=WB&opener_sheet_idx=2"+"&ctrt_no="+ComGetObjValue(formObj.ctrt_no)+"&ctrt_nm="+ComGetObjValue(formObj.ctrt_nm);
	callBackFunc = "setBlLoadInfo";
	modal_center_open(sUrl, "callBackFunc", 1050, 625,"yes");
}
function setBlLoadInfo(rtnVal){
	var sheetObj=docObjects[2];
	var prefix="Grd01";
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		return;
	}else{
		var rtnValAry=rtnVal.split("|");
		var insertRow=sheetObj.DataInsert(-1);
		sheetObj.SetCellValue(insertRow, prefix+"item_cd",rtnValAry[10],0);//item_cd
		sheetObj.SetCellValue(insertRow, prefix+"item_nm",rtnValAry[11],0);//item_nm
		sheetObj.SetCellValue(insertRow, prefix+"lot_no",rtnValAry[12],0);//lot_no
		sheetObj.SetCellValue(insertRow, prefix+"item_pkgunit",rtnValAry[19],0);//item_pkgunit
		sheetObj.SetCellValue(insertRow, prefix+"item_pkgqty",rtnValAry[15],0);//item_pkgqty
		sheetObj.SetCellValue(insertRow, prefix+"item_cbm",rtnValAry[16],0);//item_cbm
		sheetObj.SetCellValue(insertRow, prefix+"item_cbf",0,0);
		sheetObj.SetCellValue(insertRow, prefix+"item_grs_kgs",rtnValAry[17],0);//item_kgs
		sheetObj.SetCellValue(insertRow, prefix+"item_grs_lbs",0,0);
		sheetObj.SetCellValue(insertRow, prefix+"item_net_kgs",rtnValAry[18],0);//item_net_wgt
		sheetObj.SetCellValue(insertRow, prefix+"item_net_lbs",0,0);
		sheetObj.SetCellValue(insertRow, prefix+"po_no",rtnValAry[9],0);//po_no
		sheetObj.SetCellValue(insertRow, prefix+"eq_tpsz_cd",rtnValAry[35],0);//Type
		sheetObj.SetCellValue(insertRow, prefix+"eq_no",rtnValAry[8],0);//cntr_no
		sheetObj.SetCellValue(insertRow, prefix+"seal_no","",0);
		sheetObj.SetCellValue(insertRow, prefix+"inbound_dt","",0);
		sheetObj.SetCellValue(insertRow, prefix+"exp_dt","",0);
		sheetObj.SetCellValue(insertRow, prefix+"lot_04","",0);
		sheetObj.SetCellValue(insertRow, prefix+"lot_05","",0);
		sheetObj.SetCellValue(insertRow, prefix+"cntr_ref_no","",0);
		sheetObj.SetCellValue(insertRow, prefix+"hbl_no",rtnValAry[56],0);//hbl_no
		sheetObj.SetCellValue(insertRow, prefix+"mbl_no",rtnValAry[0],0);//mbl_no
		sheetObj.SetCellValue(insertRow, prefix+"pol",rtnValAry[3],0);//pol
		sheetObj.SetCellValue(insertRow, prefix+"etd",rtnValAry[4],0);//pol_etd
		sheetObj.SetCellValue(insertRow, prefix+"pod",rtnValAry[5],0);//pod
		sheetObj.SetCellValue(insertRow, prefix+"eta",rtnValAry[6],0);//pod_eta
		sheetObj.SetCellValue(insertRow, prefix+"del",rtnValAry[7],0);//del
		sheetObj.SetCellValue(insertRow, prefix+"carrier_cd",rtnValAry[24],0);//carrier_cd
		sheetObj.SetCellValue(insertRow, prefix+"carrier_nm",rtnValAry[25],0);//carrier_nm
		sheetObj.SetCellValue(insertRow, prefix+"vsl_cd",rtnValAry[26],0);//vsl_cd
		sheetObj.SetCellValue(insertRow, prefix+"vsl_nm",rtnValAry[27],0);//vsl_nm
		sheetObj.SetCellValue(insertRow, prefix+"voy",rtnValAry[28],0);//voy
		sheetObj.SetCellValue(insertRow, prefix+"curr_cd","",0);
		sheetObj.SetCellValue(insertRow, prefix+"unit_price",0,0);
		sheetObj.SetCellValue(insertRow, prefix+"eq_tp_cd","",0);
		//sheetObj.CellValue2(insertRow, prefix+"item_sys_no")   = rtnValAry[35];//item_sys_no (BL 팝업의 item_sys_no은 사용하지 않는다->MAIN의 Contract No로 재조회한다)
		sheetObj.SetCellValue(insertRow, prefix+"item_ea_qty",rtnValAry[14],0);//item_qty
		sheetObj.SetCellValue(insertRow, prefix+"pkg_lv1_qty",0,0);
		sheetObj.SetCellValue(insertRow, prefix+"lv1_cbm",0,0);
		sheetObj.SetCellValue(insertRow, prefix+"lv1_cbf",0,0);
		sheetObj.SetCellValue(insertRow, prefix+"lv1_grs_kgs",0,0);
		sheetObj.SetCellValue(insertRow, prefix+"lv1_grs_lbs",0,0);
		sheetObj.SetCellValue(insertRow, prefix+"lv1_net_kgs",0,0);
		sheetObj.SetCellValue(insertRow, prefix+"lv1_net_lbs",0,0);
		sheetObj.SetCellValue(insertRow, prefix+"load_flg","N",0);
		sheetObj.SetCellImage(insertRow, (prefix+"lot_id_img"),0);
		sheetObj.SetCellImage(insertRow, (prefix+"seal_img"),1);
		// excel upload data 유효성 체크			
		base_process(sheetObj, insertRow, "");
		// EQ TYPE 조회
		searchEqType(sheetObj, insertRow, "");
	}
}
/*
 * Excel Upload
 */
function excel_Upload() {	
	if (ComDisableTdButton("btn_upload", 1)) {
		return;
	}
	var formObj=document.form;
	var ctrt_no=formObj.ctrt_no.value;	
   	var sUrl="./WHInExcelUploadPopup.clt?display=none&ctrt_no="+ctrt_no;
//	ComOpenPopup(sUrl, 900, 430, "setPoItem_Insert", "0,0", true);
   	callBackFunc = "setPoItem_Insert";
	modal_center_open(sUrl, callBackFunc, 900,430,"yes");
}
/**
 * Template Download
 */
function excel_Download() {	
	var formObj1=document.frm1;
	if (document.getElementById('btn_upload').disabled) {
		return;
	}
	var fileName="WH_IB_ITEM_TEMPLETE.xls";
	//formObj1.file_path.value = ;
	formObj1.file_name.value = fileName;
	document.frm1.submit();
}
/** 
 * Booking Item Add
 */
function row_Add() {	
	if (ComDisableTdButton("btn_row_add", 1)) {
		return;
	}

	//if (vLoadCheck) {
		var sheetObj=docObjects[2];
		var prefix="Grd01";
		var insertRow=sheetObj.DataInsert(-1);
		sheetObj.SetCellValue(insertRow, prefix+"load_flg","N",0);
	//}
	sheetObj.SetCellImage(insertRow, (prefix+"lot_id_img"),0);
	sheetObj.SetCellImage(insertRow, (prefix+"seal_img"),1);
	sheetObj.SetSumText(2, "TOTAL");
	sheetObj.SetCellAlign(sheetObj.LastRow(), 2, "Center");
}
/** 
 * Booking Item Del
 */
function row_Del() {
	if (ComDisableTdButton("btn_row_del", 1)) {
		return;
	}
	 var sheetObj=sheet3;
		if(sheetObj.RowCount()> 0){
			for(var i=sheetObj.HeaderRows(); i<= sheetObj.LastRow()-1; i++) {
				if(sheetObj.GetCellValue(i,"Grd01del_chk") == "1"){
					sheetObj.SetCellValue(i,8,0);
					sheetObj.SetCellValue(i,9,0);
					sheetObj.SetCellValue(i,10,0);
					sheetObj.SetCellValue(i,11,0);
					sheetObj.SetCellValue(i,12,0);
				//	sheetObj.SetCellValue(i,16,0);
				}	
			}
			ComRowHideDelete(sheetObj,"Grd01del_chk",true);		
		}else{
			ComShowCodeMessage("COM0046");
		}
		sheetObj.CheckAll("Grd01del_chk",0);
}
/** 
 * Row Copy
 */
function row_Copy() {
	if (ComDisableTdButton("btn_row_copy", 1)) {
		return;
	}
	row_copy();
}
function row_copy() {
	var prefix="Grd01";	
	var sheetObj=docObjects[2];
	//var intRows = sheetObj.Rows;
	if (sheetObj.CheckedRows(prefix+"del_chk") == 1) {
		var copyRow=sheetObj.FindCheckedRow(prefix+"del_chk");
		var arrRow=copyRow.split("|");
		//vis에서 들어온건은 copy불가
		if(sheetObj.GetCellValue(arrRow[0], prefix+"invalid_yn") == "Y")
		{
			ComShowCodeMessage("COM0373");
			return;
		}
		sheetObj.SelectCell(arrRow[0], prefix+"del_chk");
		//var Row     = sheetObj.DataInsert(-1); // 마지막 행에 생성하기
		var Row=sheetObj.DataInsert(); // 현재 선택된 행의 바로 아래에 생성
		sheetObj.SetCellValue(Row, prefix+"item_cd",sheetObj.GetCellValue(arrRow[0], prefix+"item_cd"),0);
		sheetObj.SetCellValue(Row, prefix+"item_nm",sheetObj.GetCellValue(arrRow[0], prefix+"item_nm"),0);
		sheetObj.SetCellValue(Row, prefix+"lot_no",sheetObj.GetCellValue(arrRow[0], prefix+"lot_no"),0);
		sheetObj.SetCellValue(Row, prefix+"item_pkgunit",sheetObj.GetCellValue(arrRow[0], prefix+"item_pkgunit"),0);
		sheetObj.SetCellValue(Row, prefix+"item_pkgqty",sheetObj.GetCellValue(arrRow[0], prefix+"item_pkgqty"),0);
		sheetObj.SetCellValue(Row, prefix+"item_cbm",sheetObj.GetCellValue(arrRow[0], prefix+"item_cbm"),0);
		sheetObj.SetCellValue(Row, prefix+"item_cbf",sheetObj.GetCellValue(arrRow[0], prefix+"item_cbf"),0);
		sheetObj.SetCellValue(Row, prefix+"item_grs_kgs",sheetObj.GetCellValue(arrRow[0], prefix+"item_grs_kgs"),0);
		sheetObj.SetCellValue(Row, prefix+"item_grs_lbs",sheetObj.GetCellValue(arrRow[0], prefix+"item_grs_lbs"),0);
		sheetObj.SetCellValue(Row, prefix+"item_net_kgs",sheetObj.GetCellValue(arrRow[0], prefix+"item_net_kgs"),0);
		sheetObj.SetCellValue(Row, prefix+"item_net_lbs",sheetObj.GetCellValue(arrRow[0], prefix+"item_net_lbs"),0);
		sheetObj.SetCellValue(Row, prefix+"po_no",sheetObj.GetCellValue(arrRow[0], prefix+"po_no"),0);
		sheetObj.SetCellValue(Row, prefix+"eq_tp_cd",sheetObj.GetCellValue(arrRow[0], prefix+"eq_tp_cd"),0);
		sheetObj.SetCellValue(Row, prefix+"eq_tpsz_cd",sheetObj.GetCellValue(arrRow[0], prefix+"eq_tpsz_cd"),0);
		sheetObj.SetCellValue(Row, prefix+"eq_no",sheetObj.GetCellValue(arrRow[0], prefix+"eq_no"),0);
		sheetObj.SetCellValue(Row, prefix+"seal_no",sheetObj.GetCellValue(arrRow[0], prefix+"seal_no"),0);
		sheetObj.SetCellValue(Row, prefix+"seal_img",sheetObj.GetCellValue(arrRow[0], prefix+"seal_img"),0);
		sheetObj.SetCellValue(Row, prefix+"inbound_dt",sheetObj.GetCellValue(arrRow[0], prefix+"inbound_dt"),0);
		sheetObj.SetCellValue(Row, prefix+"exp_dt",sheetObj.GetCellValue(arrRow[0], prefix+"exp_dt"),0);
		sheetObj.SetCellValue(Row, prefix+"lot_04",sheetObj.GetCellValue(arrRow[0], prefix+"lot_04"),0);
		sheetObj.SetCellValue(Row, prefix+"lot_05",sheetObj.GetCellValue(arrRow[0], prefix+"lot_05"),0);
		sheetObj.SetCellValue(Row, prefix+"fix_lot_id",sheetObj.GetCellValue(arrRow[0], prefix+"fix_lot_id"),0);
		sheetObj.SetCellValue(Row, prefix+"lot_id_img",sheetObj.GetCellValue(arrRow[0], prefix+"lot_id_img"),0);
		sheetObj.SetCellValue(Row, prefix+"cntr_ref_no",sheetObj.GetCellValue(arrRow[0], prefix+"cntr_ref_no"),0);
		sheetObj.SetCellValue(Row, prefix+"hbl_no",sheetObj.GetCellValue(arrRow[0], prefix+"hbl_no"),0);
		sheetObj.SetCellValue(Row, prefix+"mbl_no",sheetObj.GetCellValue(arrRow[0], prefix+"mbl_no"),0);
		sheetObj.SetCellValue(Row, prefix+"pol",sheetObj.GetCellValue(arrRow[0], prefix+"pol"),0);
		sheetObj.SetCellValue(Row, prefix+"etd",sheetObj.GetCellValue(arrRow[0], prefix+"etd"),0);
		sheetObj.SetCellValue(Row, prefix+"pod",sheetObj.GetCellValue(arrRow[0], prefix+"pod"),0);
		sheetObj.SetCellValue(Row, prefix+"eta",sheetObj.GetCellValue(arrRow[0], prefix+"eta"),0);
		sheetObj.SetCellValue(Row, prefix+"del",sheetObj.GetCellValue(arrRow[0], prefix+"del"),0);
		sheetObj.SetCellValue(Row, prefix+"carrier_cd",sheetObj.GetCellValue(arrRow[0], prefix+"carrier_cd"),0);
		sheetObj.SetCellValue(Row, prefix+"carrier_nm",sheetObj.GetCellValue(arrRow[0], prefix+"carrier_nm"),0);
		sheetObj.SetCellValue(Row, prefix+"vsl_cd",sheetObj.GetCellValue(arrRow[0], prefix+"vsl_cd"),0);
		sheetObj.SetCellValue(Row, prefix+"vsl_nm",sheetObj.GetCellValue(arrRow[0], prefix+"vsl_nm"),0);
		sheetObj.SetCellValue(Row, prefix+"voy",sheetObj.GetCellValue(arrRow[0], prefix+"voy"),0);
		sheetObj.SetCellValue(Row, prefix+"curr_cd",sheetObj.GetCellValue(arrRow[0], prefix+"curr_cd"),0);
		sheetObj.SetCellValue(Row, prefix+"unit_price",sheetObj.GetCellValue(arrRow[0], prefix+"unit_price"),0);
		sheetObj.SetCellValue(Row, prefix+"po_sys_no",sheetObj.GetCellValue(arrRow[0], prefix+"po_sys_no"),0);
		sheetObj.SetCellValue(Row, prefix+"item_sys_no",sheetObj.GetCellValue(arrRow[0], prefix+"item_sys_no"),0);
		sheetObj.SetCellValue(Row, prefix+"item_ea_qty",sheetObj.GetCellValue(arrRow[0], prefix+"item_ea_qty"),0);
		sheetObj.SetCellValue(Row, prefix+"lv1_cbm",sheetObj.GetCellValue(arrRow[0], prefix+"lv1_cbm"),0);
		sheetObj.SetCellValue(Row, prefix+"lv1_cbf",sheetObj.GetCellValue(arrRow[0], prefix+"lv1_cbf"),0);
		sheetObj.SetCellValue(Row, prefix+"lv1_grs_kgs",sheetObj.GetCellValue(arrRow[0], prefix+"lv1_grs_kgs"),0);
		sheetObj.SetCellValue(Row, prefix+"lv1_grs_lbs",sheetObj.GetCellValue(arrRow[0], prefix+"lv1_grs_lbs"),0);
		sheetObj.SetCellValue(Row, prefix+"lv1_net_kgs",sheetObj.GetCellValue(arrRow[0], prefix+"lv1_net_kgs"),0);
		sheetObj.SetCellValue(Row, prefix+"lv1_net_lbs",sheetObj.GetCellValue(arrRow[0], prefix+"lv1_net_lbs"),0);
		sheetObj.SetCellValue(Row, prefix+"pkg_lv1_qty",sheetObj.GetCellValue(arrRow[0], prefix+"pkg_lv1_qty"),0);
		sheetObj.SetCellValue(Row, prefix+"pkg_lv1_unit_cd",sheetObj.GetCellValue(arrRow[0], prefix+"pkg_lv1_unit_cd"),0);;
		sheetObj.SetCellValue(Row, prefix+"pkg_lv2_qty",sheetObj.GetCellValue(arrRow[0], prefix+"pkg_lv2_qty"),0);;
		sheetObj.SetCellValue(Row, prefix+"pkg_lv2_unit_cd",sheetObj.GetCellValue(arrRow[0], prefix+"pkg_lv2_unit_cd"),0);;
		sheetObj.SetCellValue(Row, prefix+"pkg_lv3_qty",sheetObj.GetCellValue(arrRow[0], prefix+"pkg_lv3_qty"),0);;
		sheetObj.SetCellValue(Row, prefix+"pkg_lv3_unit_cd",sheetObj.GetCellValue(arrRow[0], prefix+"pkg_lv3_unit_cd"),0);;
		sheetObj.SetCellValue(Row, prefix+"pkg_lv4_qty",sheetObj.GetCellValue(arrRow[0], prefix+"pkg_lv4_qty"),0);;
		sheetObj.SetCellValue(Row, prefix+"pkg_lv4_unit_cd",sheetObj.GetCellValue(arrRow[0], prefix+"pkg_lv4_unit_cd"),0);;
		sheetObj.SetCellValue(Row, prefix+"pkg_info",sheetObj.GetCellValue(arrRow[0], prefix+"pkg_info"),0);
		setItemSheetEditable(sheetObj, Row, "N");
		setBookingItemGetCellEditable(sheetObj, Row);
		sheetObj.CheckAll(prefix+"del_chk",0);
		sheetObj.SetCellEditable(Row, prefix + "item_cd"     ,1);//ROW COPY시 ITEM_CD변경가능
    } else {
    	ComShowCodeMessage("COM0254"); // Please select one only.
    }
}
/**
 * Excel
 */
function btn_Excel() {
	/*var prefix="Grd01";
	//docObjects[2].Down2Excel(-1);
 	docObjects[2].Down2Excel({ HiddenColumn:true,Merge:true,TreeLevel:false});*/
 	var prefix = "Grd01";
 	if(docObjects[2].RowCount() < 1){//no data
	    ComShowCodeMessage("COM132501");
	}else{
		docObjects[2].Down2Excel( {DownCols: makeHiddenSkipCol(docObjects[2], prefix + "seal_img|" + prefix + "lot_id_img|" + prefix + "del_chk"), SheetDesign:1, Merge:1, HiddenColumn: 1, CheckBoxOnValue:'Y', CheckBoxOffValue:' ', AutoSizeColumn: 1, ExtendParam: "Total: 1"});
	}
}
/**
 * Excel Upload 리턴 데이터
 * @param aryPopupData
 */
function setPoItem_Insert(rtnValAry) {
	if (rtnValAry == "" || rtnValAry == "undefined" || rtnValAry == undefined) {
		return;
	}else{
		uploadflg = true;
		doShowProcess();
		setTimeout(function(){
			var xml = convertArrayToXmlIBSheet(sheet3, rtnValAry);
			sheet3.LoadSearchData(xml, {Append : 1, sync : 1});
		},100);
		

	}
	/*var sheetObj=docObjects[2];
	var prefix="Grd01";
	if (rtnValAry == "" || rtnValAry == "undefined" || rtnValAry == undefined) {
		return;
	}else{
		//var rtnValAry=rtnVal.split("|");
		if (rtnValAry[0] != -1){
			for(var k=0; k < rtnValAry.length; k++){
			var insertRow=sheetObj.DataInsert(-1);
			sheetObj.SetCellValue(insertRow, prefix+"item_cd",rtnValAry[k]["item_cd"],0);
			sheetObj.SetCellValue(insertRow, prefix+"item_nm",rtnValAry[k]["item_nm"],0);
			sheetObj.SetCellValue(insertRow, prefix+"lot_no",rtnValAry[k]["lot_no"]  ,0);
			sheetObj.SetCellValue(insertRow, prefix+"item_pkgunit",rtnValAry[k]["item_pkgunit"],0);
			sheetObj.SetCellValue(insertRow, prefix+"item_pkgqty", rtnValAry[k]["item_pkgqty"],0);
			sheetObj.SetCellValue(insertRow, prefix+"item_cbm",rtnValAry[k]["item_cbm"],0);
			sheetObj.SetCellValue(insertRow, prefix+"item_cbf",rtnValAry[k]["item_cbf"],0);
			sheetObj.SetCellValue(insertRow, prefix+"item_grs_kgs",rtnValAry[k]["item_grs_kgs"],0);
			sheetObj.SetCellValue(insertRow, prefix+"item_grs_lbs",rtnValAry[k]["item_grs_lbs"],0);
			sheetObj.SetCellValue(insertRow, prefix+"item_net_kgs",rtnValAry[k]["item_net_kgs"],0);
			sheetObj.SetCellValue(insertRow, prefix+"item_net_lbs",rtnValAry[k]["item_net_lbs"],0);
			sheetObj.SetCellValue(insertRow, prefix+"po_no", rtnValAry[k]["po_no"],0);
			sheetObj.SetCellValue(insertRow, prefix+"eq_tpsz_cd",rtnValAry[k]["eq_tpsz_cd"]	,0);
			sheetObj.SetCellValue(insertRow, prefix+"eq_no", rtnValAry[k]["eq_no"],0);
			sheetObj.SetCellValue(insertRow, prefix+"seal_no",rtnValAry[k]["seal_no"],0);
			sheetObj.SetCellValue(insertRow, prefix+"inbound_dt",rtnValAry[k]["inbound_dt"]	,0);
			sheetObj.SetCellValue(insertRow, prefix+"exp_dt",rtnValAry[k]["exp_dt"],0);
			sheetObj.SetCellValue(insertRow, prefix+"lot_04",rtnValAry[k]["lot_04"],0);
			sheetObj.SetCellValue(insertRow, prefix+"lot_05",rtnValAry[k]["lot_05"],0);
			sheetObj.SetCellValue(insertRow, prefix+"cntr_ref_no", rtnValAry[k]["cntr_ref_no"],0);
			sheetObj.SetCellValue(insertRow, prefix+"hbl_no",rtnValAry[k]["hbl_no"],0);
			sheetObj.SetCellValue(insertRow, prefix+"mbl_no",rtnValAry[k]["mbl_no"],0);
			sheetObj.SetCellValue(insertRow, prefix+"pol",rtnValAry[k]["pol"],0);
			sheetObj.SetCellValue(insertRow, prefix+"etd",rtnValAry[k]["etd"],0);
			sheetObj.SetCellValue(insertRow, prefix+"pod",rtnValAry[k]["pod"],0);
			sheetObj.SetCellValue(insertRow, prefix+"eta",rtnValAry[k]["eta"],0);
			sheetObj.SetCellValue(insertRow, prefix+"del",rtnValAry[k]["del"],0);
			sheetObj.SetCellValue(insertRow, prefix+"carrier_cd",rtnValAry[k]["carrier_cd"]	,0);
			sheetObj.SetCellValue(insertRow, prefix+"vsl_cd",rtnValAry[k]["vsl_cd"],0);
			sheetObj.SetCellValue(insertRow, prefix+"vsl_nm",rtnValAry[k]["vsl_nm"],0);
			sheetObj.SetCellValue(insertRow, prefix+"voy",rtnValAry[k]["voy"],0);
			sheetObj.SetCellValue(insertRow, prefix+"curr_cd",rtnValAry[k]["curr_cd"],0);
			sheetObj.SetCellValue(insertRow, prefix+"unit_price",rtnValAry[k]["unit_price"]	,0);
			sheetObj.SetCellValue(insertRow, prefix+"eq_tp_cd",rtnValAry[k]["eq_tp_cd"],0);
			sheetObj.SetCellValue(insertRow, prefix+"item_sys_no", rtnValAry[k]["item_sys_no"],0);
			sheetObj.SetCellValue(insertRow, prefix+"item_ea_qty", rtnValAry[k]["item_ea_qty"],0);
			sheetObj.SetCellValue(insertRow, prefix+"pkg_lv1_qty", rtnValAry[k]["pkg_lv1_qty"],0);
			sheetObj.SetCellValue(insertRow, prefix+"lv1_cbm",rtnValAry[k]["lv1_cbm"],0);
			sheetObj.SetCellValue(insertRow, prefix+"lv1_cbf",rtnValAry[k]["lv1_cbf"],0);
			sheetObj.SetCellValue(insertRow, prefix+"lv1_grs_kgs", rtnValAry[k]["lv1_grs_kgs"],0);
			sheetObj.SetCellValue(insertRow, prefix+"lv1_grs_lbs", rtnValAry[k]["lv1_grs_lbs"],0);
			sheetObj.SetCellValue(insertRow, prefix+"lv1_net_kgs", rtnValAry[k]["lv1_net_kgs"],0);
			sheetObj.SetCellValue(insertRow, prefix+"lv1_net_lbs", rtnValAry[k]["lv1_net_lbs"],0);
			sheetObj.SetCellValue(insertRow, prefix+"load_flg","N",0);
 			sheetObj.SetCellImage(insertRow, (prefix+"lot_id_img"),0);
 			sheetObj.SetCellImage(insertRow, (prefix+"seal_img"),1);
			// excel upload data 유효성 체크			
			base_process(sheetObj, insertRow, "");
			// EQ TYPE 조회
			searchEqType(sheetObj, insertRow, "");
			}
		}	
	}*/
}
/**
 * Set data for sheet after load data from popup 
 */
function applydt_afterload(){
	var prefix="Grd01";
	var sheetObj = sheet3;
	for(var i=0 ; i < sheetObj.RowCount(); i++){
	sheetObj.SetCellValue(i + sheetObj.HeaderRows(), prefix+"load_flg","N",0);
	sheetObj.SetCellImage(i + sheetObj.HeaderRows(), (prefix+"lot_id_img"),0);
	sheetObj.SetCellImage(i + sheetObj.HeaderRows(), (prefix+"seal_img"),1);
	base_process(sheetObj, i + sheetObj.HeaderRows(), "");
	// EQ TYPE 조회
	searchEqType(sheetObj, i + sheetObj.HeaderRows(), "");
	
	sheet3.SetCellValue(i + sheetObj.HeaderRows(),prefix+"ibflag", 'I', 0);
	}
}

/**
 * 
 * @param sheetObj
 * @param arrData
 * @returns {String}
 */
function convertArrayToXmlIBSheet(sheetObj, arrData){
	var rtnStr = "";
	var prefix = "Grd01";
	var beginIdx = sheetObj.SaveNameCol(prefix + "ibflag");
	var endInx = sheetObj.SaveNameCol(prefix + "org_item_sys_no");
	
	rtnStr += "<SHEET> \n";
	rtnStr += "		<DATA Total=\"" + arrData.length +"\"> \n	";
	
	for(var i = 0; i < arrData.length; i++){
		rtnStr += " <TR> \n ";
		
		for (var j = beginIdx; j <= endInx; j++){
			rtnStr += "<TD><![CDATA[";
			
			if(typeof(arrData[i][sheetObj.ColSaveName(j).replace(prefix,"")]) != undefined 
				&& typeof(arrData[i][sheetObj.ColSaveName(j).replace(prefix,"")]) != "undefined" 
					&& typeof(arrData[i][sheetObj.ColSaveName(j).replace(prefix,"")]) != null)
			{
				rtnStr += arrData[i][sheetObj.ColSaveName(j).replace(prefix,"")];
			}
			
			rtnStr += "]]></TD> \n ";
		}
		
		rtnStr += " </TR> \n ";
	}
	
	rtnStr += "</SHEET>";
	
	return rtnStr;
}

function base_process(sheetObj, Row, Col) {
	var formObj=document.form;	
	   var prefix="Grd01";		
		// item code 변경시 Pack Master (TL_CTRT_CUST_ITEM)의 패키지 Level1 기본 정보를 가져온다			
	var sParam="ctrt_no="+ComGetObjValue(formObj.ctrt_no)+"&item_cd="+encodeURIComponent(sheetObj.GetCellValue(Row, prefix+"item_cd"));
		
//		var sXml=sheetObj.GetSearchData("searchWHItemCodeInfo.clt?"+sParam);	
	ajaxSendPost(rtn_searchWHItemCodeInfo, Row, '&goWhere=aj&bcKey=searchWHItemCodeInfo&'+sParam, './GateServlet.gsl');
		// item sys no 존재시					
		if (!ComIsNull(sheetObj.GetCellValue(Row, prefix + "item_sys_no"))) {
			if (!ComIsNull(sheetObj.GetCellValue(Row, prefix+"item_nm"))) {
				sheetObj.SetCellEditable(Row, prefix+"item_nm",0);
			}
			// item_eq_qty로 환산후, 조회된 마스터의 Meature 정보로 CBM GWT NWT를 재계산한다
			fnCalcItemEaQtyExcelData(sheetObj, Row, "");
		} else {
			sheetObj.SetCellEditable(Row, prefix+"item_nm",1);
			sheetObj.SetCellValue(Row, prefix+"item_pkgunit","",0);
			//sheetObj.CellValue2(Row, prefix+"item_pkgqty")  = "";
			sheetObj.SetCellValue(Row, prefix+"item_cbm","",0);
			sheetObj.SetCellValue(Row, prefix+"item_cbf","",0);
			sheetObj.SetCellValue(Row, prefix+"item_grs_kgs","",0);
			sheetObj.SetCellValue(Row, prefix+"item_grs_lbs","",0);
			sheetObj.SetCellValue(Row, prefix+"item_net_kgs","",0);
			sheetObj.SetCellValue(Row, prefix+"item_net_lbs","",0);
			sheetObj.SetCellValue(Row, prefix+"pkg_lv1_qty","",0);
			sheetObj.SetCellValue(Row, prefix+"pkg_lv1_unit_cd","",0);
			sheetObj.SetCellValue(Row, prefix+"pkg_lv2_qty","",0);
			sheetObj.SetCellValue(Row, prefix+"pkg_lv2_unit_cd","",0);
			sheetObj.SetCellValue(Row, prefix+"pkg_lv3_qty","",0);
			sheetObj.SetCellValue(Row, prefix+"pkg_lv3_unit_cd","",0);
			sheetObj.SetCellValue(Row, prefix+"pkg_lv4_qty","",0);
			sheetObj.SetCellValue(Row, prefix+"pkg_lv4_unit_cd","",0);
			sheetObj.SetCellValue(Row, prefix+"pkg_info","",0);
		}
}
function rtn_searchWHItemCodeInfo (reqVal, Row){
	var doc=getAjaxMsgXML(reqVal);
	 var formObj=document.form;
	 var sheetObj = sheet3;
	 if(doc[0]=='OK'){
	  if(typeof(doc[1])!='undefined'){
	   //조회해온 결과를 Parent에 표시함
	   var rtnArr=doc[1].split('^@');
	   if(rtnArr[0] != ""){
		   var prefix="Grd01";		
			sheetObj.SetCellValue(Row, prefix+"item_sys_no",rtnArr[0],0);
			sheetObj.SetCellValue(Row, prefix+"item_nm",rtnArr[3],0);
			sheetObj.SetCellValue(Row, prefix+"lv1_cbm",rtnArr[12],0);
			sheetObj.SetCellValue(Row, prefix+"lv1_cbf",rtnArr[13],0);
			sheetObj.SetCellValue(Row, prefix+"lv1_grs_kgs",rtnArr[14],0);
			sheetObj.SetCellValue(Row, prefix+"lv1_grs_lbs",rtnArr[15],0);
			sheetObj.SetCellValue(Row, prefix+"lv1_net_kgs",rtnArr[16],0);
			sheetObj.SetCellValue(Row, prefix+"lv1_net_lbs",rtnArr[17],0);
			sheetObj.SetCellValue(Row, prefix+"pkg_lv1_qty",rtnArr[5],0);
			sheetObj.SetCellValue(Row, prefix+"pkg_lv1_unit_cd",rtnArr[4],0);
			sheetObj.SetCellValue(Row, prefix+"pkg_lv2_qty",rtnArr[7],0);
			sheetObj.SetCellValue(Row, prefix+"pkg_lv2_unit_cd",rtnArr[6],0);
			sheetObj.SetCellValue(Row, prefix+"pkg_lv3_qty",rtnArr[9],0);
			sheetObj.SetCellValue(Row, prefix+"pkg_lv3_unit_cd",rtnArr[8],0);
			sheetObj.SetCellValue(Row, prefix+"pkg_lv4_qty",rtnArr[11],0);
			sheetObj.SetCellValue(Row, prefix+"pkg_lv4_unit_cd",rtnArr[10],0);
			sheetObj.SetCellValue(Row, prefix+"pkg_info",rtnArr[18],0);
	   }
	   else{
		   var prefix="Grd01";		
			sheetObj.SetCellValue(Row, prefix+"item_sys_no",'',0);
			sheetObj.SetCellValue(Row, prefix+"item_nm",'',0);
			sheetObj.SetCellValue(Row, prefix+"lv1_cbm",'',0);
			sheetObj.SetCellValue(Row, prefix+"lv1_cbf",'',0);
			sheetObj.SetCellValue(Row, prefix+"lv1_grs_kgs",'',0);
			sheetObj.SetCellValue(Row, prefix+"lv1_grs_lbs",'',0);
			sheetObj.SetCellValue(Row, prefix+"lv1_net_kgs",'',0);
			sheetObj.SetCellValue(Row, prefix+"lv1_net_lbs",'',0);
			sheetObj.SetCellValue(Row, prefix+"pkg_lv1_qty",'',0);
			sheetObj.SetCellValue(Row, prefix+"pkg_lv1_unit_cd",'',0);
			sheetObj.SetCellValue(Row, prefix+"pkg_lv2_qty",'',0);
			sheetObj.SetCellValue(Row, prefix+"pkg_lv2_unit_cd",'',0);
			sheetObj.SetCellValue(Row, prefix+"pkg_lv3_qty",'',0);
			sheetObj.SetCellValue(Row, prefix+"pkg_lv3_unit_cd",'',0);
			sheetObj.SetCellValue(Row, prefix+"pkg_lv4_qty",'',0);
			sheetObj.SetCellValue(Row, prefix+"pkg_lv4_unit_cd",'',0);
			sheetObj.SetCellValue(Row, prefix+"pkg_info",'',0);
	   }
	  }
	 }
	
}
/**
* Item EA_QTY 계산
* @param sheetObj
* @param Row
* @param col
*/
function fnCalcItemEaQtyExcelData(sheetObj, Row, Col) {
	var formObj=document.form;
	var prefix="Grd01";
	var item_pkgunit=sheetObj.GetCellValue(Row, prefix+"item_pkgunit").trim();
	var item_pkgqty=sheetObj.GetCellValue(Row, prefix+"item_pkgqty");//.trim();
	var ctrt_no=ComGetObjValue(formObj.ctrt_no) ;
	var item_sys_no=sheetObj.GetCellValue(Row, prefix+"item_sys_no").trim();
	if (item_pkgunit == "" && item_pkgqty > 0) {
		//return;
	}
//	var sXml=sheetObj.GetSearchData("searchPutawayEaQty.clt?putaway_pkgunit=" + item_pkgunit 
//						            + "&putaway_pkgqty=" + item_pkgqty
//						            + "&ctrt_no="        + ctrt_no
//						            + "&item_sys_no="    + item_sys_no);
//	resultCalcItemEaQtyExcelData(sXml, sheetObj, Row, Col);
	ajaxSendPost(resultCalcItemEaQtyExcelData, Row, '&goWhere=aj&bcKey=searchPutawayEaQty&putaway_pkgunit=' + item_pkgunit 
            + "&putaway_pkgqty=" + item_pkgqty
            + "&ctrt_no="        + ctrt_no
            + "&item_sys_no="    + item_sys_no, './GateServlet.gsl');
}
/*
* receving 정보바뀐경우 os계산 ajax return function
*/
function resultCalcItemEaQtyExcelData(reqVal, Row) {
	var doc=getAjaxMsgXML(reqVal);
	 var formObj=document.form;
	 if(doc[0]=='OK'){
	  if(typeof(doc[1])!='undefined'){
	   //조회해온 결과를 Parent에 표시함
	   var rtnArr=doc[1].split('^@');
	   if(rtnArr[0] != ""){
		   var prefix="Grd01";
			sheetObj = sheet3;
			var suYn= rtnArr[2];
			var suValue=rtnArr[3];
			if (suYn == "" || suYn == null)	{
			}
			if (suYn == "N") {
				sheetObj.SetCellValue(Row, prefix+"item_pkgunit","",0);
			}
			var item_pkgqty= rtnArr[1];
			sheetObj.SetCellValue(Row, prefix+"item_ea_qty",item_pkgqty,0);
	   }
	   else{
		   var suYn= '';
		   var suValue='';
		   var item_pkgqty= '';
	   }
	  }
	 }
}
/**
 * EQ TYPE 조회
 * @param sheetObj
 * @param Row
 * @param Col
 * @param Value
 */
function searchEqType(sheetObj, Row, Col) {
	var formObj=document.form;
	var prefix="Grd01";
	var eq_tpsz_cd=sheetObj.GetCellValue(Row, prefix+"eq_tpsz_cd");
    if (eq_tpsz_cd != "") {
		var sParam="cntr_tp="+eq_tpsz_cd;
//		var sXml=sheetObj.GetSearchData("searchCntrTrTp.clt?"+sParam);	
		ajaxSendPost(rtn_searchEqType, Row, '&goWhere=aj&bcKey=searchCntrTrTp&'+sParam, './GateServlet.gsl');
	}
}

function rtn_searchEqType(reqVal, Row) {
	var doc=getAjaxMsgXML(reqVal);
	 var formObj=document.form;
	 if(doc[0]=='OK'){
	  if(typeof(doc[1])!='undefined'){
	   //조회해온 결과를 Parent에 표시함
	   var rtnArr=doc[1].split('^@');
	   if(rtnArr[0] != ""){
		   var prefix="Grd01";
			sheetObj = sheet3;
			sheetObj.SetCellValue(Row, prefix+"eq_tp_cd",rtnArr[2],0);
	   }
	   else{
		   sheetObj.SetCellValue(Row, prefix+"eq_tp_cd",'',0);
	   }
	  }
	 }
}
/**
 * Booking Item 팝업 클릭시
 * @param sheetObj
 * @param Row
 * @param Col
 */
function sheet3_OnPopupClick(sheetObj, Row, Col)
{
	var formObj=document.form;
	var prefix="Grd01";
	var colName=sheetObj.ColSaveName(Col);
	var colValue=sheetObj.GetCellValue(Row, Col) ;
	var cal=new ComCalendarGrid();
	with(sheetObj)
	{
		if (colName == (prefix+"item_cd") ) {
			// Contract No 체크
			if (isNull(formObj.ctrt_no)) {
				ComShowCodeMessage("COM0278", "Contract No");
				sheetObj.SetCellValue(Row, prefix+"item_cd","",0);
				sheetObj.SelectCell(Row, Col);
				return;
			}
		   	var sUrl="./CtrtItemPopup.clt?ctrt_no="+ComGetObjValue(formObj.ctrt_no)+"&item_cd="+colValue + "&c_exist_item_bom=N";
//			ComOpenPopup(sUrl, 400, 560, "setItemGrid", "0,0", true);
		   	callBackFunc = "setItemGrid";
			modal_center_open(sUrl, callBackFunc, 400, 520,"yes");
			
		} else if (colName == (prefix+"item_pkgunit") ) {
			var sUrl="./CommonCodePopup.clt?grp_cd=A6&code="+colValue+"&wh_flag=Y&ctrt_no="+ComGetObjValue(formObj.ctrt_no)+"&item_sys_no="+sheetObj.GetCellValue(Row, (prefix+"item_sys_no"));
//			ComOpenPopup(sUrl, 400, 560, "setPkgunitGrid", "0,0", true);
			callBackFunc = "setPkgunitGrid";
			modal_center_open(sUrl, callBackFunc, 400,520,"yes");
			
		} else if ( colName == prefix+"eq_tpsz_cd" ) {
			var eq_tp_cd=sheetObj.GetCellValue(Row, (prefix+"eq_tp_cd"));
			var code="A";
			if (!ComIsNull(eq_tp_cd)) {
				code=eq_tp_cd;
			}
			sUrl="./ContainerTypePopup.clt?type="+code+"&eq_unit="+colValue;
//			ComOpenPopup(sUrl, 400, 600, "setIbContainerTypeInfo", "0,0", true);
			callBackFunc = "setIbContainerTypeInfo";
			modal_center_open(sUrl, callBackFunc, 400, 590,"yes");
			
		} else if (colName == (prefix+"pol") ) {
			rtnary=new Array(3);
			rtnary[0]="";
			rtnary[1]="";
			rtnary[2]="";
			   	var sUrl="./CMM_POP_0030.clt?type=P&loc_cd="+colValue;
//				ComOpenPopup(sUrl, 900, 670, "setPolLocInfoGrid", "0,0", true);
			   	callBackFunc = "setPolLocInfoGrid";
				modal_center_open(sUrl, rtnary, 900, 450,"yes");
		} else if (colName == (prefix+"fix_lot_id") ) {
/*			
			// Contract No 체크
			if (isNull(formObj.ctrt_no)) {
				ComShowCodeMessage("COM0278", "Contract No");
				ComSetFocus(formObj.ctrt_no);
				return;
			}			
			// Item
if (isEmpty2(sheetObj.GetCellValue(Row, prefix+"item_cd"))) {
				ComShowCodeMessage("COM0162", Row-1, "Item");
				sheetObj.SelectCell(Row, prefix+"item_cd");
				return;				
			}			
			var sParam="ctrt_no=" + ComGetObjValue(formObj.ctrt_no);
			sParam += "&ctrt_nm=" + ComGetObjValue(formObj.ctrt_nm);
sParam += "&item_cd=" + sheetObj.GetCellValue(Row, (prefix+"item_cd"));
sParam += "&fix_lot_id=" + sheetObj.GetCellValue(Row, (prefix+"fix_lot_id"));
sParam += "&inbound_dt=" + sheetObj.GetCellValue(Row, (prefix+"inbound_dt"));
//alert(sParam);			
		   	var sUrl="WHInLotSelectPopup.clt?" + sParam;
			ComOpenPopup(sUrl, 1050, 550, "setLotInfoGrid", "0,0", true);
*/			
	    }else if (colName == (prefix+"pod") ) {
		   	var sUrl="./CMM_POP_0030.clt?type=P&loc_cd="+colValue;
		   	rtnary=new Array(3);
			rtnary[0]="";
			rtnary[1]="";
			rtnary[2]="";
		   	callBackFunc = "setPodLocInfoGrid";
		   	modal_center_open(sUrl, rtnary, 900, 450,"yes");
//			ComOpenPopup(sUrl, 900, 670, "setPodLocInfoGrid", "0,0", true);
		}else if (colName == (prefix+"del") ) {
		   	var sUrl="./CMM_POP_0030.clt?type=P&loc_cd="+colValue;
		   	rtnary=new Array(3);
			rtnary[0]="";
			rtnary[1]="";
			rtnary[2]="";
//			ComOpenPopup(sUrl, 900, 670, "setDelLocInfoGrid", "0,0", true);
		   	callBackFunc = "setDelLocInfoGrid";
		   	modal_center_open(sUrl, rtnary, 900, 450,"yes");
		}else if (colName == (prefix+"vsl_cd") ) {
			rtnary=new Array(2);
			rtnary[0]="1";
			rtnary[1]=sheetObj.GetCellValue(Row, Col+1);
		   	var sUrl="./CMM_POP_0140.clt";
//			ComOpenPopup(sUrl, 900, 550, "setVslInfoGrid", "0,0", true);
		   	callBackFunc = "setVslInfoGrid";
		   	modal_center_open(sUrl, rtnary, 900,500,"yes");
		}else if (colName == (prefix+"carrier_cd") ) {
		   	var sUrl="./CMM_POP_0010.clt?cust_nm="+sheet3.GetCellValue(sheetObj.GetSelectRow(), prefix+"carrier_nm");
			callBackFunc = "setCarrierInfoGrid";
		   	modal_center_open(sUrl, callBackFunc, 1150,650,"yes");
//			ComOpenPopup(sUrl, 900, 670, "setCarrierInfoGrid", "0,0", true);
	    }else if (colName == (prefix+"etd") ) {
	    	cal.select(sheetObj, Row, Col, 'MM-dd-yyyy');
	    }else if (colName == (prefix+"curr_cd") ) {
		   	var sUrl="./CommonCodePopup.clt?grp_cd=C010&code="+colValue;
//			ComOpenPopup(sUrl, 400, 560, "setCurrCdGrid", "0,0", true);
		   	callBackFunc = "setCurrCdGrid";
		   	modal_center_open(sUrl, callBackFunc, 400,520,"yes");
		}	
	}
}
function setItemGrid(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		  return;
		 }else{
			 var rtnValArr = rtnVal.split("|");
			var sheetObj=docObjects[2];
			var prefix="Grd01";
			sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"item_cd",rtnValArr[0],0);
			sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"item_nm",rtnValArr[1],0);
			sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"ctrt_no",rtnValArr[2],0);
			sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"item_sys_no",rtnValArr[3],0);
			sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"lot_no",rtnValArr[4],0);
			sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"lv1_cbm",rtnValArr[8],0);
			sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"lv1_cbf",rtnValArr[9],0);
			sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"lv1_grs_kgs",rtnValArr[10],0);
			sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"lv1_grs_lbs",rtnValArr[11],0);
			sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"lv1_net_kgs",rtnValArr[12],0);
			sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"lv1_net_lbs",rtnValArr[13],0);
			sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"pkg_lv1_qty",rtnValArr[7],0);
			sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"pkg_lv1_unit_cd",rtnValArr[15],0);
			sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"pkg_lv2_qty",rtnValArr[5],0);
			sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"pkg_lv2_unit_cd",rtnValArr[6],0);
			sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"pkg_lv3_qty",rtnValArr[16],0);
			sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"pkg_lv3_unit_cd",rtnValArr[17],0);
			sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"pkg_lv4_qty",rtnValArr[18],0);
			sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"pkg_lv4_unit_cd",rtnValArr[19],0);
			sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"pkg_info",rtnValArr[20],0);
			sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"curr_cd",rtnValArr[21],0);
			sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"unit_price",rtnValArr[22],0);
			if (!ComIsNull(sheetObj.GetCellValue(sheetObj.GetSelectRow(), prefix+"item_nm"))) {
				sheetObj.SetCellEditable(sheetObj.GetSelectRow(), prefix+"item_nm",0);
			}	
			// item sys no 존재시					
			if (!ComIsNull(sheetObj.GetCellValue(sheetObj.GetSelectRow(), prefix + "item_sys_no"))) {
				// item_eq_qty로 환산후, 조회된 마스터의 Meature 정보로 CBM GWT NWT를 재계산한다
				fnCalcItemEaQty(sheetObj, sheetObj.GetSelectRow(), "");
			}
		 }
}
function setPkgunitGrid(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		  return;
		 }else{
			 var rtnValArr = rtnVal.split("|");
	var sheetObj=docObjects[2];
	var prefix="Grd01";
	sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"item_pkgunit",rtnValArr[1],0);
	// item_eq_qty로 환산후, 조회된 마스터의 Meature 정보로 CBM GWT NWT를 재계산한다
	fnCalcItemEaQty(sheetObj, sheetObj.GetSelectRow(), sheetObj.GetSelectCol());
		 }
}
function setIbContainerTypeInfo(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		  return;
		 }else{
			 var rtnValArr = rtnVal.split("|");
	var sheetObj=docObjects[2];
	var prefix="Grd01";
	sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"eq_tpsz_cd",rtnValArr[0]);
	sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"eq_tp_cd",rtnValArr[2]);
		 }
}
function setLotInfoGrid(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		  return;
		 }else{
			 var rtnValArr = rtnVal.split("|");
	var sheetObj=docObjects[2];
	var prefix="Grd01";
	sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"inbound_dt",rtnValArr[2],0);
	sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"lot_no",rtnValArr[3],0);
	sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"exp_dt",rtnValArr[4],0);
	sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"lot_04",rtnValArr[5],0);
	sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"lot_05",rtnValArr[6],0);
	sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"fix_lot_id",rtnValArr[7],0);
	sheet3.SetCellValue(sheet3.GetSelectRow(),"Grd01lot_id_img",'');
	// Khanh 2015-08-13 Comment
//	setBookingItemGetCellEditable(sheetObj, sheetObj.GetSelectRow()); 
	// Comment End
		 }
}
function setPolLocInfoGrid(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		  return;
		 }else{
			 var rtnValArr = rtnVal.split("|");
	var sheetObj=docObjects[2];
	var prefix="Grd01";
	sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"pol",rtnValArr[0],0);
		 }
}
function setPodLocInfoGrid(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		  return;
		 }else{
			 var rtnValArr = rtnVal.split("|");
	var sheetObj=docObjects[2];
	var prefix="Grd01";
	sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"pod",rtnValArr[0],0);
		 }
}
function setDelLocInfoGrid(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		  return;
		 }else{
			 var rtnValArr = rtnVal.split("|");
	var sheetObj=docObjects[2];
	var prefix="Grd01";
	sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"del",rtnValArr[0],0);
		 }
}
function setVslInfoGrid(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		  return;
		 }else{
			 var rtnValArr = rtnVal.split("|");
	var sheetObj=docObjects[2];
	var prefix="Grd01";
	sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"vsl_cd",rtnValArr[0],0);
	sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"vsl_nm",rtnValArr[1],0);
		 }
}
function setCarrierInfoGrid(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		  return;
		 }else{
			 var rtnValArr = rtnVal.split("|");
	var sheetObj=docObjects[2];
	var prefix="Grd01";
	sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"carrier_cd",rtnValArr[0],0);
	sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"carrier_nm",rtnValArr[2],0);
		 }
}
function setCurrCdGrid(rtnVal){
	if (rtnVal == "" || rtnVal == "undefined" || rtnVal == undefined) {
		  return;
		 }else{
			 var rtnValArr = rtnVal.split("|");
	var sheetObj=docObjects[2];
	var prefix="Grd01";
	sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"curr_cd",rtnVal[1],0);
		 }
}
/*
function sheet3_OnSelectCell(sheetObj, OldRow, OldCol, NewRow, NewCol){
	var prefix="Grd01";
	if (sheetObj.ColSaveName(OldCol) == (prefix+"item_pkgunit") ) {
sheetObj.GetCellValue(OldRow, prefix+"item_pkgunit");
	}
}
*/
function sheet3_OnChange(sheetObj, Row, Col, Value){
	var formObj=document.form;
	var prefix="Grd01";
	var colName=sheetObj.ColSaveName(Col);
	if (colName == (prefix+"item_cd")) {
		if (Value != "") {
			// Contract No 체크
			if (isNull(formObj.ctrt_no)) {
				ComShowCodeMessage("COM0278", "Contract No");
				sheetObj.SetCellValue(Row, prefix+"item_cd","",0);
				sheetObj.SelectCell(Row, Col);
				return;
			}
			// item code 변경시 Pack Master (TL_CTRT_CUST_ITEM)의 패키지 Level1 기본 정보를 가져온다			
			var sParam="ctrt_no="+ComGetObjValue(formObj.ctrt_no)+"&item_cd="+encodeURIComponent(Value);
//			var sXml=sheetObj.GetSearchData("searchWHItemCodeInfo.clt?"+sParam);	
			ajaxSendPost(result_sheet3_OnChange, Row, '&goWhere=aj&bcKey=searchWHItemCodeInfo&'+sParam, './GateServlet.gsl');
			
			if (!ComIsNull(sheetObj.GetCellValue(Row, prefix+"item_nm"))) {
				sheetObj.SetCellEditable(Row, prefix+"item_nm",0);
			} else {
				sheetObj.SetCellEditable(Row, prefix+"item_nm",1);
			}					
			// item sys no 존재시					
			if (!ComIsNull(sheetObj.GetCellValue(Row, prefix + "item_sys_no"))) {
				// item_eq_qty로 환산후, 조회된 마스터의 Meature 정보로 CBM GWT NWT를 재계산한다
				fnCalcItemEaQty(sheetObj, Row, Col);
			} else {
				sheetObj.SetCellValue(Row, prefix+"item_pkgunit","",0);
				sheetObj.SetCellValue(Row, prefix+"item_pkgqty","",0);
				sheetObj.SetCellValue(Row, prefix+"item_ea_qty","",0);
				sheetObj.SetCellValue(Row, prefix+"item_cbm","",0);
				sheetObj.SetCellValue(Row, prefix+"item_cbf","",0);
				sheetObj.SetCellValue(Row, prefix+"item_grs_kgs","",0);
				sheetObj.SetCellValue(Row, prefix+"item_grs_lbs","",0);
				sheetObj.SetCellValue(Row, prefix+"item_net_kgs","",0);
				sheetObj.SetCellValue(Row, prefix+"item_net_lbs","",0);
			}
		} else {
			sheetObj.SetCellValue(Row, prefix+"item_sys_no","",0);
			sheetObj.SetCellValue(Row, prefix+"item_cd","",0);
			sheetObj.SetCellValue(Row, prefix+"item_nm","",0);
			sheetObj.SetCellValue(Row, prefix+"lot_no","",0);
			//sheetObj.CellValue2(Row, prefix+"item_pkgunit") = "";			
			//sheetObj.CellValue2(Row, prefix+"item_pkgqty")  = "";
			sheetObj.SetCellValue(Row, prefix+"lv1_cbm","",0);
			sheetObj.SetCellValue(Row, prefix+"lv1_cbf","",0);
			sheetObj.SetCellValue(Row, prefix+"lv1_grs_kgs","",0);
			sheetObj.SetCellValue(Row, prefix+"lv1_grs_lbs","",0);
			sheetObj.SetCellValue(Row, prefix+"lv1_net_kgs","",0);
			sheetObj.SetCellValue(Row, prefix+"lv1_net_lbs","",0);
			//sheetObj.CellValue2(Row, prefix+"item_remark")  = "";
			sheetObj.SetCellValue(Row, prefix+"pkg_lv1_qty","",0);
			sheetObj.SetCellValue(Row, prefix+"pkg_lv1_unit_cd","",0);
			sheetObj.SetCellValue(Row, prefix+"pkg_lv2_qty","",0);
			sheetObj.SetCellValue(Row, prefix+"pkg_lv2_unit_cd","",0);
			sheetObj.SetCellValue(Row, prefix+"pkg_lv3_qty","",0);
			sheetObj.SetCellValue(Row, prefix+"pkg_lv3_unit_cd","",0);
			sheetObj.SetCellValue(Row, prefix+"pkg_lv4_qty","",0);
			sheetObj.SetCellValue(Row, prefix+"pkg_lv4_unit_cd","",0);
			sheetObj.SetCellValue(Row, prefix+"pkg_info","",0);
			sheetObj.SetCellEditable(Row, prefix+"item_nm",1);
		}			
	} else if (colName == (prefix+"item_pkgunit") || colName == (prefix+"item_pkgqty")) {	
		if (!ComIsNull(sheetObj.GetCellValue(Row, prefix + "item_sys_no"))) {
			// item sys no 존재시
			// item_eq_qty로 환산후, 조회된 마스터의 Meature 정보로 CBM GWT NWT를 재계산한다
			fnCalcItemEaQty(sheetObj, Row, Col);
		} else {
			// item sys no 미존재시 => popup 저장후 조회(item sys no) => qty
			var sParam="ctrt_no="+ComGetObjValue(formObj.ctrt_no)+"&item_cd="+encodeURIComponent(sheetObj.GetCellValue(Row, prefix + "item_cd"));
//			var sXml=sheetObj.GetSearchData("searchWHItemCodeInfo.clt?"+sParam);
			ajaxSendPost(result_sheet3_OnChange1, Row, '&goWhere=aj&bcKey=searchWHItemCodeInfo&'+sParam, './GateServlet.gsl');
			
			if (!ComIsNull(sheetObj.GetCellValue(Row, prefix+"item_nm"))) {
				sheetObj.SetCellEditable(Row, prefix+"item_nm",0);
			} else {
				sheetObj.SetCellEditable(Row, prefix+"item_nm",1);
			}					
			// item_eq_qty로 환산후, 조회된 마스터의 Meature 정보로 CBM GWT NWT를 재계산한다
			if (!ComIsNull(sheetObj.GetCellValue(Row, prefix + "item_sys_no"))) {
				fnCalcItemEaQty(sheetObj, Row, Col);
			}
		}		
	} else if (colName == (prefix+"item_cbf") && Value != "") {
		funcKGS_CBM_CAC("CBF_CBM", (prefix+"item_cbf"), (prefix+"item_cbm"), sheetObj);		
	}else if (colName == (prefix+"item_cbm") && Value != "") {
		funcKGS_CBM_CAC("CBM_CBF", (prefix+"item_cbm"), (prefix+"item_cbf"), sheetObj);		
	} else if (colName == (prefix+"item_grs_lbs") && Value != "") {
		funcKGS_CBM_CAC("LB_KG", (prefix+"item_grs_lbs"), (prefix+"item_grs_kgs"), sheetObj);		
	} else if (colName == (prefix+"item_grs_kgs") && Value != "") {
		funcKGS_CBM_CAC("KG_LB", (prefix+"item_grs_kgs"), (prefix+"item_grs_lbs"), sheetObj);		
	}else if (colName == (prefix+"item_net_lbs") && Value != "") {
		funcKGS_CBM_CAC("LB_KG", (prefix+"item_net_lbs"), (prefix+"item_net_kgs"), sheetObj);		
	}else if (colName == (prefix+"item_net_kgs") && Value != "") {
		funcKGS_CBM_CAC("KG_LB", (prefix+"item_net_kgs"), (prefix+"item_net_lbs"), sheetObj);		
	} else 	if (colName == (prefix+"eq_tpsz_cd") && Value != "") {		
		var sParam="cntr_tp="+Value;
//		var sXml=sheetObj.GetSearchData("searchCntrTrTp.clt?"+sParam);
		ajaxSendPost(result_sheet3_OnChange2, sheetObj, '&goWhere=aj&bcKey=searchCntrTrTp&'+sParam, './GateServlet.gsl');
		
	}else 	if (colName == (prefix+"fix_lot_id") && Value != "") {
		//setBookingItemCellEditable(sheetObj, Row);
	}else if ( (colName == (prefix+"pol") || colName == (prefix+"pod") || colName == (prefix+"del") )  && Value != "") {
//		var sXml=sheetObj.GetSearchData("searchTlLocInfo.clt?type=P&loc_cd="+Value);
		ajaxSendPost(result_sheet3_OnChange3, sheetObj, '&goWhere=aj&bcKey=searchTlLocInfo&type=P&loc_cd='+Value + "&ctrt_no="  + formObj.def_wh_ctrt_no.value + "&ofc_cd=" + formObj.org_cd.value, './GateServlet.gsl');
		
	}else if ( colName == (prefix+"carrier_cd")  && Value != "") {
		
//		var sXml=sheetObj.GetSearchData("searchTlCustInfo.clt?"+"cust_cd="+Value);
		ajaxSendPost(result_sheet3_OnChange4, sheetObj, '&goWhere=aj&bcKey=getTrdpInfo&trdp_cd='+Value, './GateServlet.gsl');
		
	}else if ( colName == (prefix+"vsl_cd")  && Value != "") {
//		var sXml=sheetObj.GetSearchData("searchTlVslInfo.clt?"+"code="+Value);
		ajaxSendPost(result_sheet3_OnChange5, sheetObj, '&goWhere=aj&bcKey=searchTlVslInfo&'+"code="+Value, './GateServlet.gsl');
		
	} else if(colName == prefix + "curr_cd") {
			searchGrdCurrInfoInfo(formObj, Value, colName);
	}
}

function result_sheet3_OnChange (reqVal, Row) {
	var doc=getAjaxMsgXML(reqVal);
	 var formObj=document.form;
	 var sheetObj = sheet3;
	 if(doc[0]=='OK'){
	  if(typeof(doc[1])!='undefined'){
	   //조회해온 결과를 Parent에 표시함
	   var rtnArr=doc[1].split('^@');
	   var prefix="Grd01";
	   if(rtnArr[0] != ""){
		   sheetObj.SetCellValue(Row, prefix+"item_sys_no",rtnArr[0],0);
			sheetObj.SetCellValue(Row, prefix+"item_nm",rtnArr[3],0);
			sheetObj.SetCellValue(Row, prefix+"lot_no",rtnArr[19],0);
			sheetObj.SetCellValue(Row, prefix+"lv1_cbm",rtnArr[12],0);
			sheetObj.SetCellValue(Row, prefix+"lv1_cbf",rtnArr[13],0);
			sheetObj.SetCellValue(Row, prefix+"lv1_grs_kgs",rtnArr[14],0);
			sheetObj.SetCellValue(Row, prefix+"lv1_grs_lbs",rtnArr[15],0);
			sheetObj.SetCellValue(Row, prefix+"lv1_net_kgs",rtnArr[16],0);
			sheetObj.SetCellValue(Row, prefix+"lv1_net_lbs",rtnArr[17],0);
			//ITEM MASTER정보
			sheetObj.SetCellValue(Row, prefix+"pkg_lv1_qty",rtnArr[5],0);
			sheetObj.SetCellValue(Row, prefix+"pkg_lv1_unit_cd",rtnArr[4],0);
			sheetObj.SetCellValue(Row, prefix+"pkg_lv2_qty",rtnArr[7],0);
			sheetObj.SetCellValue(Row, prefix+"pkg_lv2_unit_cd",rtnArr[6],0);
			sheetObj.SetCellValue(Row, prefix+"pkg_lv3_qty",rtnArr[9],0);
			sheetObj.SetCellValue(Row, prefix+"pkg_lv3_unit_cd",rtnArr[8],0);
			sheetObj.SetCellValue(Row, prefix+"pkg_lv4_qty",rtnArr[11],0);
			sheetObj.SetCellValue(Row, prefix+"pkg_lv4_unit_cd",rtnArr[10],0);
			sheetObj.SetCellValue(Row, prefix+"pkg_info",rtnArr[18],0);
			sheetObj.SetCellValue(Row, prefix+"curr_cd",rtnArr[20],0);
			sheetObj.SetCellValue(Row, prefix+"unit_price",rtnArr[21],0);
	   }
	   else{
//		   sheetObj.SetCellValue(Row, prefix+"item_sys_no",'',0);
//		   sheetObj.SetCellValue(Row, prefix+"item_cd",'',0);
//			sheetObj.SetCellValue(Row, prefix+"item_nm",'',0);
//			sheetObj.SetCellValue(Row, prefix+"lot_no",'',0);
//			sheetObj.SetCellValue(Row, prefix+"lv1_cbm",'',0);
//			sheetObj.SetCellValue(Row, prefix+"lv1_cbf",'',0);
//			sheetObj.SetCellValue(Row, prefix+"lv1_grs_kgs",'',0);
//			sheetObj.SetCellValue(Row, prefix+"lv1_grs_lbs",'',0);
//			sheetObj.SetCellValue(Row, prefix+"lv1_net_kgs",'',0);
//			sheetObj.SetCellValue(Row, prefix+"lv1_net_lbs",'',0);
//			//ITEM MASTER정보
//			sheetObj.SetCellValue(Row, prefix+"pkg_lv1_qty",'',0);
//			sheetObj.SetCellValue(Row, prefix+"pkg_lv1_unit_cd",'',0);
//			sheetObj.SetCellValue(Row, prefix+"pkg_lv2_qty",'',0);
//			sheetObj.SetCellValue(Row, prefix+"pkg_lv2_unit_cd",'',0);
//			sheetObj.SetCellValue(Row, prefix+"pkg_lv3_qty",'',0);
//			sheetObj.SetCellValue(Row, prefix+"pkg_lv3_unit_cd",'',0);
//			sheetObj.SetCellValue(Row, prefix+"pkg_lv4_qty",'',0);
//			sheetObj.SetCellValue(Row, prefix+"pkg_lv4_unit_cd",'',0);
//			sheetObj.SetCellValue(Row, prefix+"pkg_info",'',0);
//			sheetObj.SetCellValue(Row, prefix+"curr_cd",'',0);
//			sheetObj.SetCellValue(Row, prefix+"unit_price",'',0);
	   }
	  }
	 }
}

function result_sheet3_OnChange1 (reqVal, Row) {
	var doc=getAjaxMsgXML(reqVal);
	 var formObj=document.form;
	 var sheetObj = sheet3;
	 if(doc[0]=='OK'){
	  if(typeof(doc[1])!='undefined'){
	   //조회해온 결과를 Parent에 표시함
	   var rtnArr=doc[1].split('^@');
	   if(rtnArr[0] != ""){
		   var prefix="Grd01";
		   sheetObj.SetCellValue(Row, prefix+"item_sys_no",rtnArr[0],0);
			sheetObj.SetCellValue(Row, prefix+"item_nm",rtnArr[3],0);
			sheetObj.SetCellValue(Row, prefix+"lot_no",rtnArr[19],0);
			sheetObj.SetCellValue(Row, prefix+"lv1_cbm",rtnArr[12],0);
			sheetObj.SetCellValue(Row, prefix+"lv1_cbf",rtnArr[13],0);
			sheetObj.SetCellValue(Row, prefix+"lv1_grs_kgs",rtnArr[14],0);
			sheetObj.SetCellValue(Row, prefix+"lv1_grs_lbs",rtnArr[15],0);
			sheetObj.SetCellValue(Row, prefix+"lv1_net_kgs",rtnArr[16],0);
			sheetObj.SetCellValue(Row, prefix+"lv1_net_lbs",rtnArr[17],0);
			
			sheetObj.SetCellValue(Row, prefix+"pkg_lv1_qty",rtnArr[5],0);
			sheetObj.SetCellValue(Row, prefix+"pkg_lv1_unit_cd",rtnArr[4],0);
			sheetObj.SetCellValue(Row, prefix+"pkg_lv2_qty",rtnArr[7],0);
			sheetObj.SetCellValue(Row, prefix+"pkg_lv2_unit_cd",rtnArr[6],0);
			sheetObj.SetCellValue(Row, prefix+"pkg_lv3_qty",rtnArr[9],0);
			sheetObj.SetCellValue(Row, prefix+"pkg_lv3_unit_cd",rtnArr[8],0);
			sheetObj.SetCellValue(Row, prefix+"pkg_lv4_qty",rtnArr[11],0);
			sheetObj.SetCellValue(Row, prefix+"pkg_lv4_unit_cd",rtnArr[10],0);
			sheetObj.SetCellValue(Row, prefix+"pkg_info",rtnArr[18],0);
	   }
	   else{
		   sheetObj.SetCellValue(Row, prefix+"item_sys_no",'',0);
			sheetObj.SetCellValue(Row, prefix+"item_nm",'',0);
			sheetObj.SetCellValue(Row, prefix+"lot_no",'',0);
			sheetObj.SetCellValue(Row, prefix+"lv1_cbm",'',0);
			sheetObj.SetCellValue(Row, prefix+"lv1_cbf",'',0);
			sheetObj.SetCellValue(Row, prefix+"lv1_grs_kgs",'',0);
			sheetObj.SetCellValue(Row, prefix+"lv1_grs_lbs",'',0);
			sheetObj.SetCellValue(Row, prefix+"lv1_net_kgs",'',0);
			sheetObj.SetCellValue(Row, prefix+"lv1_net_lbs",'',0);
			//ITEM MASTER정보
			sheetObj.SetCellValue(Row, prefix+"pkg_lv1_qty",'',0);
			sheetObj.SetCellValue(Row, prefix+"pkg_lv1_unit_cd",'',0);
			sheetObj.SetCellValue(Row, prefix+"pkg_lv2_qty",'',0);
			sheetObj.SetCellValue(Row, prefix+"pkg_lv2_unit_cd",'',0);
			sheetObj.SetCellValue(Row, prefix+"pkg_lv3_qty",'',0);
			sheetObj.SetCellValue(Row, prefix+"pkg_lv3_unit_cd",'',0);
			sheetObj.SetCellValue(Row, prefix+"pkg_lv4_qty",'',0);
			sheetObj.SetCellValue(Row, prefix+"pkg_lv4_unit_cd",'',0);
			sheetObj.SetCellValue(Row, prefix+"pkg_info",'',0);
	   }
	  }
	 }
}

function result_sheet3_OnChange2 (reqVal, sheetObj) {
	var doc=getAjaxMsgXML(reqVal);
	 var formObj=document.form;
//	 var sheetObj = sheet3;
	 var Row = sheetObj.GetSelectRow();
	 var Col = sheetObj.GetSelectCol();
	 if(doc[0]=='OK'){
	  if(typeof(doc[1])!='undefined'){
	   //조회해온 결과를 Parent에 표시함
	   var rtnArr=doc[1].split('^@');
	   if(rtnArr[0] != ""){
		   var prefix="Grd01";
		   sheetObj.SetCellValue(Row,  Col,rtnArr[0],0);
			sheetObj.SetCellValue(Row, prefix+"eq_tp_cd",rtnArr[2]);
	   }
	   else{
		   sheetObj.SetCellValue(Row,  Col,'',0);
			sheetObj.SetCellValue(Row, prefix+"eq_tp_cd",'');
	   }
	  }
	 }else {
		 sheetObj.SetCellValue(Row,  Col,'',0);
			sheetObj.SetCellValue(Row, prefix+"eq_tp_cd",'');
	}
}

function result_sheet3_OnChange3 (reqVal, sheetObj) {
	var doc=getAjaxMsgXML(reqVal);
	 var formObj=document.form;
//	 var sheetObj = sheet3;
	 var Row = sheetObj.GetSelectRow();
	 var Col = sheetObj.GetSelectCol();
	 if(doc[0]=='OK'){
	  if(typeof(doc[1])!='undefined'){
	   //조회해온 결과를 Parent에 표시함
	   var rtnArr=doc[1].split('^@');
	   if(rtnArr[0] != ""){
		   sheetObj.SetCellValue(Row,  Col,rtnArr[1],0);
	   }
	   else{
		   sheetObj.SetCellValue(Row,  Col,'',0);
	   }
	  }
	 }
}

function result_sheet3_OnChange4 (reqVal, sheetObj) {
	var doc=getAjaxMsgXML(reqVal);
	 var formObj=document.form;
//	 var sheetObj = sheet3;
	 var Row = sheetObj.GetSelectRow();
	 var Col = sheetObj.GetSelectCol();
	 if(doc[0]=='OK'){
	  if(typeof(doc[1])!='undefined'){
	   //조회해온 결과를 Parent에 표시함
	   var rtnArr=doc[1].split('@@^');
	   if(rtnArr[0] != ""){
		   sheetObj.SetCellValue(Row,  Col,rtnArr[0],0);
			sheetObj.SetCellValue(Row,  Col+1,rtnArr[1],0);
	   }
	   else{
		   sheetObj.SetCellValue(Row,  Col,'',0);
		   sheetObj.SetCellValue(Row,  Col+1,'',0);
	   }
	  }else {
		  sheetObj.SetCellValue(Row,  Col,'',0);
		   sheetObj.SetCellValue(Row,  Col+1,'',0);
	}
	 }
}

function result_sheet3_OnChange5 (reqVal, sheetObj) {
	var doc=getAjaxMsgXML(reqVal);
	 var formObj=document.form;
//	 var sheetObj = sheet3;
	 var Row = sheetObj.GetSelectRow();
	 var Col = sheetObj.GetSelectCol();
	 if(doc[0]=='OK'){
	  if(typeof(doc[1])!='undefined'){
	   //조회해온 결과를 Parent에 표시함
	   var rtnArr=doc[1].split('^@');
	   if(rtnArr[0] != ""){
		   sheetObj.SetCellValue(Row,  Col,rtnArr[1],0);
			sheetObj.SetCellValue(Row,  Col+1,rtnArr[0],0);
	   }
	   else{
		   sheetObj.SetCellValue(Row,  Col,'',0);
			sheetObj.SetCellValue(Row,  Col+1,'',0);
	   }
	  }
	 }
}
function searchGrdCurrInfoInfo(form, value, col_nm){
	var sheetObj=docObjects[2];
	var prefix="Grd01";
// 	var sXml=sheetObj.GetSearchData("searchCommonCodeInfo.clt", "grp_cd=C010&code_cd="+value);
	ajaxSendPost(result_searchGrdCurrInfoInfo, sheetObj, '&goWhere=aj&bcKey=searchCommonCodeInfo&'+"grp_cd=C010&code_cd="+value, './GateServlet.gsl');
	
}

function result_searchGrdCurrInfoInfo (reqVal, sheetObj) {
	var doc=getAjaxMsgXML(reqVal);
	 var formObj=document.form;
//	 var sheetObj = sheet3;
	 var prefix = "Grd01";
	 var Row = sheetObj.GetSelectRow();
	 var Col = sheetObj.GetSelectCol();
	 if(doc[0]=='OK'){
	  if(typeof(doc[1])!='undefined'){
	   //조회해온 결과를 Parent에 표시함
	   var rtnArr=doc[1].split('^@');
	   if(rtnArr[0] != ""){
		   if( col_nm == prefix + "curr_cd"){ 
				sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"curr_cd",rtnArr[0],0);
			}
	   }
	   else{
		   if( col_nm == prefix + "curr_cd"){ 
				sheetObj.SetCellValue(sheetObj.GetSelectRow(), prefix+"curr_cd",'',0);
			}
	   }
	  }
	 }
}
/**
 * Seal No 메모 오픈
 * @param sheetObj
 * @param Row
 * @param Col
 */
function sheet3_OnClick(sheetObj, Row, Col) {
	var formObj=document.form;
	var colName=sheetObj.ColSaveName(Col);
	var prefix="Grd01";
	var bk_sts_cd=formObj.bk_sts_cd.value;
	if ("N" == bk_sts_cd) { // Booked
		if (colName == (prefix+"lot_id_img")) {
			if (sheet3.GetCellValue(sheet3.GetSelectRow(),"Grd01lot_id_img") == ''){
				return;
			}else {
				// Item 저장후 조회시 System Lot Select Popup 조회 버튼 선택불가
				// Khanh 2015-08-13 Comment
				//if (!ComIsNull(sheetObj.GetCellValue(Row, prefix+"fix_lot_id"))) {
				//				return;	
				//			}	
				// Comment End
				// Contract No 체크
				if (isNull(formObj.ctrt_no)) {
					ComShowCodeMessage("COM0278", "Contract No");
					sheetObj.SetCellValue(Row, prefix+"item_cd","",0);
					sheetObj.SelectCell(Row, prefix+"item_cd");
					return;
				}			
				// Item
				if (isEmpty2(sheetObj.GetCellValue(Row, prefix+"item_cd"))) {
					ComShowCodeMessage("COM0162", Row-1, "Item");
					sheetObj.SelectCell(Row, prefix+"item_cd");
					return;				
				}
				var date = convDate(sheetObj.GetCellValue(Row, (prefix+"inbound_dt")));
				var exp_dt = convDate(sheetObj.GetCellValue(Row, (prefix+"exp_dt")));
				var sParam="wh_cd=" + formObj.warehouse.value;
				sParam += "&wh_nm=" + formObj.warehouse.options[formObj.warehouse.selectedIndex].text;
				sParam += "&ctrt_no=" + ComGetObjValue(formObj.ctrt_no);
				sParam += "&ctrt_nm=" + ComGetObjValue(formObj.ctrt_nm);
				sParam += "&item_cd=" + sheetObj.GetCellValue(Row, (prefix+"item_cd"));
				sParam += "&fix_lot_id=" + sheetObj.GetCellValue(Row, (prefix+"fix_lot_id"));
				sParam += "&inbound_dt=" + date;
				sParam += "&exp_dt=" + exp_dt;
				//alert(sParam);			
				var sUrl="./WHInLotSelectPopup.clt?" + sParam;
				//ComOpenPopup(sUrl, 1050, 550, "setLotInfoGrid", "0,0", true);
				callBackFunc = "setLotInfoGrid";
				modal_center_open(sUrl, callBackFunc, 1050, 500,"yes");
			}
		} else if (colName == (prefix+"seal_img")) {
			ComShowMemoPad3(sheetObj, Row, (prefix+"seal_no"), false, 300, 82, 16, (prefix+"seal_no"));         		
		}
	} else if ("I" == bk_sts_cd) { // Issued
		if (colName == (prefix+"seal_img")) {
			ComShowMemoPad3(sheetObj, Row, (prefix+"seal_no"), false, 300, 82, 16, (prefix+"seal_no"));         		
		}
	}
}
/*
function sheet3_OnDblClick(sheetObj, Row, Col){
//alert(Row);	
	var formObj=document.form;
	var colName=sheetObj.ColSaveName(Col);
	var prefix="Grd01";
	if (colName == (prefix+"seal_img")) {		
		//var value = sheetObj.CellValue(Row, (prefix+"seal_no"));		
		//if (value.length > 0) {
			//ComShowMemoPad2(sheetObj, Row, "act_rmk", false, 326, 100, 4000, 2); 
		ComShowMemoPad3(sheetObj, Row, (prefix+"seal_no"), false, 300, 82, 16, (prefix+"seal_no"));
		//}
	}
}
*/
function sheet3_OnSearchEnd(sheetObj, ErrMsg){
	//sheetObj.ImageList("seal") = "./web/images/common/icon_m.gif";	
	var vBkSts=document.form.bk_sts_cd.value;
	var prefix="Grd01";
	for(var i=0 ; i < sheetObj.RowCount(); i++){
		
		//var vLoad_flg=sheetObj.GetCellValue(i+sheetObj.HeaderRows(), prefix+"load_flg",0);
		if(uploadflg == true ){
		}else{
			setItemSheetEditable(sheetObj, i+sheetObj.HeaderRows(), document.form.bk_sts_cd.value);
		}
		setBookingItemGetCellEditable(sheetObj, i+sheetObj.HeaderRows());
		/*
		if(uploadflg == true ){
			sheetObj.SetCellValue(i + sheetObj.HeaderRows(), prefix+"load_flg","N",0);
			sheetObj.SetCellImage(i + sheetObj.HeaderRows(), (prefix+"lot_id_img"),0);
			sheetObj.SetCellImage(i + sheetObj.HeaderRows(), (prefix+"seal_img"),1);
			base_process(sheetObj, i + sheetObj.HeaderRows(), "");
			// EQ TYPE 조회
			searchEqType(sheetObj, i + sheetObj.HeaderRows(), "");
			sheetObj.SetCellEditable( i + sheetObj.HeaderRows(), prefix+"item_cd",1);
			sheetObj.SetCellEditable( i + sheetObj.HeaderRows(), prefix+"item_nm",1);
			sheet3.SetCellValue(i + sheetObj.HeaderRows(),prefix+"ibflag", 'I', 0);
		}
		*/
	}
	uploadflg = false;
	sheetObj.SetSumText(2, "TOTAL");
	sheetObj.SetCellAlign(sheetObj.LastRow(), 2, "Center");
	check_authority_wh();
	doHideProcess();
}
function sheet4_OnSearchEnd(sheetObj, ErrMsg){
	var prefix="Grd02";
	for(var i=sheetObj.HeaderRows(); i < (sheetObj.RowCount()+sheetObj.HeaderRows()) ; i++){
		sheetObj.SetCellBackColor(i, prefix+"field_name","#D9E5FF");
 		sheetObj.SetCellFontColor(i, prefix+"field_val","#0000FF");
 		sheetObj.SetCellFont("FontBold", i, prefix+"field_name",1);
	}
}
/**
 * Doc Detail sheet 더블클릭시
 * @param sheetObj
 * @param Row
 * @param Col
 */
function sheet4_OnDblClick(sheetObj, Row, Col) {
	var prefix="Grd02";
	var sName=sheetObj.ColSaveName(Col);
	var sValue=sheetObj.GetCellValue(Row, Col);
	if (!isNull2(sValue) && sName == (prefix+"field_val")) {
		if ("IC" == sheetObj.GetCellValue(Row, prefix+"doc_type")) { // Inbound Complete
			var sParam="search_tp=WIB_IN_NO&search_no="+sValue;
			var sUrl="./WHICUpdate.clt?"+sParam;
			parent.mkNewFrame("Inbound Complete Update", sUrl, "WHICUpdate_" + "WHICUpdate" +"_"+ sheetObj.GetCellValue(Row, Col));
		} else if ("WO" == sheetObj.GetCellValue(Row, prefix+"doc_type")) { // Work Order No
			var sParam="wo_no="+sValue;
			var sUrl="./WOMgmt.clt?"+sParam;
			parent.mkNewFrame("Work Order Management", sUrl, "WOMgmt_" + sheetObj.GetCellValue(Row, Col));
		} else if ("PA" == sheetObj.GetCellValue(Row, prefix+"doc_type")) { // PUTAWAY
			var sUrl="./WHPutawayMgmt.clt?wib_in_no="+sValue;
			parent.mkNewFrame('Putaway Management', sUrl, "WHPutawayMgmt_" + sValue);
		}		
	}
}
function setPoItemGetCellEditable(sheetObj, Row){
	var prefix="Grd01";
	sheetObj.SetCellEditable(Row, prefix+"lot_no",0);
	//sheetObj.CellEditable(Row, prefix+"pallet_no") = false;
	//sheetObj.CellEditable(Row, prefix+"item_pkgqty") = false;
	sheetObj.SetCellEditable(Row, prefix+"item_cbm",0);
	sheetObj.SetCellEditable(Row, prefix+"item_kgs",0);
	sheetObj.SetCellEditable(Row, prefix+"item_net_wgt",0);
	sheetObj.SetCellEditable(Row, prefix+"custms_ref_no",0);
	sheetObj.SetCellEditable(Row, prefix+"cntr_no",0);
	sheetObj.SetCellEditable(Row, prefix+"cntr_ref_no",0);
	sheetObj.SetCellEditable(Row, prefix+"hbl_no",0);
	sheetObj.SetCellEditable(Row, prefix+"mbl_no",0);
	sheetObj.SetCellEditable(Row, prefix+"pol",0);
	sheetObj.SetCellEditable(Row, prefix+"etd",0);
	sheetObj.SetCellEditable(Row, prefix+"pod",0);
	sheetObj.SetCellEditable(Row, prefix+"eta",0);
	sheetObj.SetCellEditable(Row, prefix+"del",0);
	sheetObj.SetCellEditable(Row, prefix+"carrier_cd",0);
	sheetObj.SetCellEditable(Row, prefix+"vsl_cd",0);
	sheetObj.SetCellEditable(Row, prefix+"voy",0);
}
function sheet5_OnSearchEnd(sheetObj, ErrMsg){
	
	var formObj=document.form;
	sheetObj.SetColFontUnderline(2,1);
	doHideProcess();
	
	setOldValueAllObj();
}
function sheet5_OnDblClick(sheetObj, Row, Col){
	var formObj1=document.frm1;
	var sName=sheetObj.ColSaveName(Col);
	if (sName == "Grd03file_org_nm") {
		//var vFileOrgNm = sheetObj.CellValue(Row, "Grd03file_org_nm").split(".");
		//setFieldValue(formObj1.downloadLocation,  sheetObj.CellValue(Row, "Grd03file_path")+sheetObj.CellValue(Row, "Grd03file_sys_nm")+"."+vFileOrgNm[vFileOrgNm.length-1]);
		formObj1.file_path.value = sheetObj.GetCellValue(Row, "Grd03file_path")+sheetObj.GetCellValue(Row, "Grd03file_sys_nm");
		formObj1.file_name.value = sheetObj.GetCellValue(Row, "Grd03file_org_nm");
		//formObj1.downloadFileName.value = sheetObj.GetCellValue(Row, "Grd03file_org_nm");
		//formObj1.target="downiframe";
		formObj1.submit();
		showCompleteProcess();
	}
}
/** 
 * Forwarding Direction 선택시
 */
//function fwd_dir_OnChange(comObj, code, text)
function fwd_dir_OnChange()
{
	var formObj=document.form;
	var oldfwdDir=ComGetObjValue(formObj.old_fwd_dir);
	var sheetObj=docObjects[2];
	var forCheck=true;
	var newCode = formObj.fwd_dir.value;
	if (oldfwdDir != "" && oldfwdDir != newCode) {
		if (ComShowConfirm("PO/Item will be deleted. Are you sure to change?")) { // PO/Item will be deleted. Are you sure to change?;
			forCheck=true;
		} else {
			forCheck=false;
		}
	}
	if (forCheck) {	
		if ("I" == newCode) { // Import Forwarding
			btn_show_shipping(true); // Show Shipping Information Show
			//PO/Item 초기화
			sheetObj.RemoveAll();
		} else {
			btn_show_shipping(false);
			//PO/Item 초기화
			if("I" == oldfwdDir || "" == oldfwdDir){
				sheetObj.RemoveAll();
			}
		}
		//star_img_control(code);
		po_item_button(newCode);	
		setFieldValue(formObj.old_fwd_dir, newCode);
	} else {
		formObj.fwd_dir.value =oldfwdDir;
	}
}
/**
function star_img_control(code){
	if("E" == code){
		document.all.show_shipper.style.display="block";
		document.all.hide_shipper.style.display="none";
		document.all.show_consignee.style.display="none";
		document.all.hide_consignee.style.display="block";
	}else if("I" == code){
		document.all.show_shipper.style.display="none";
		document.all.hide_shipper.style.display="block";
		document.all.show_consignee.style.display="block";
		document.all.hide_consignee.style.display="none";
	}else if("G" == code){
		document.all.show_shipper.style.display="none";
		document.all.hide_shipper.style.display="block";
		document.all.show_consignee.style.display="none";
		document.all.hide_consignee.style.display="block";
	}
}
**/
function link_button(bk_sts_cd){
	if("I" == bk_sts_cd){
		ComBtnEnable("lnk_print");
		ComBtnEnable("lnk_work");
		ComBtnEnable("lnk_svo");
	}else{
		ComBtnDisable("lnk_print");
		ComBtnDisable("lnk_work");
		ComBtnDisable("lnk_svo");
	}
}
/**
 * Booking Item 버튼 활성화 여부
 */
function po_item_button(fwd_dir_code) {
	if ("" == fwd_dir_code){
		/*ComEnableButton("btn_bl_load", false, 1);
		//ComEnableButton("btn_po_load", false, 1);
		ComEnableButton("btn_upload", false, 1);
		ComEnableButton("btn_download", false, 1);
		ComEnableButton("btn_row_add", false, 1);
		ComEnableButton("btn_row_del", false, 1);
		ComEnableButton("btn_row_copy", false, 1);*/
		
		ComBtnDisable("btn_bl_load");
		ComBtnDisable("btn_upload");
		ComBtnDisable("btn_download");
		ComBtnDisable("btn_row_add");
		ComBtnDisable("btn_row_del");
		ComBtnDisable("btn_row_copy");
		
	} else if ("I" == fwd_dir_code) {
		ComBtnEnable("btn_bl_load");
		ComBtnEnable("btn_upload");
		ComBtnEnable("btn_download");
		ComBtnEnable("btn_row_add");
		ComBtnEnable("btn_row_del");
		ComBtnEnable("btn_row_copy");
	} else {
		ComBtnDisable("btn_bl_load");
		ComBtnEnable("btn_upload");
		ComBtnEnable("btn_download");
		ComBtnEnable("btn_row_add");
		ComBtnEnable("btn_row_del");
		ComBtnEnable("btn_row_copy");
	}
}
/**
 * File Upload 
 */
function btn_File_Upload(){
	
	if (ComDisableTdButton("btn_file_upload", 1)) {
		return;
	}
	
	var formObj=document.form;
	if(formObj.wib_bk_no.value == ""){
		ComShowCodeMessage("COM132614");
		return;
	}
	
	if(formObj.logo_rectangle.value == "" || formObj.logo_rectangle.value == null){
		ComShowCodeMessage("COM0119");
		return;
	}
	
	//ComBtnDisable("btn_file_upload");
	
	formObj.f_cmd.value=ADD;
	getParam();
	submitForm();
}
function submitForm(){
	
	
	var formObj=document.form;
	doShowProcess();
	var formData;
	if(navigator.appName.indexOf("Microsoft") != -1) {
		if(formObj.f_cmd.value==SEARCH){
			formObj.action = "./WHInbkMgmt.clt?fwd_bk_no="+formObj.c_wib_bk_no.value+"&uploadfile=T";
			formObj.submit();
//			btn_Search();
			return;
		}else{
			formObj.action = "./WHInbkMgmt.clt?fwd_bk_no="+formObj.c_wib_bk_no.value+"&uploadfile=T";
			formObj.submit();
//			goTabSelect('04');
//			btn_Search();
			return;
		}
	} else {
		formData = new FormData();
		$.each($("form").find("input[type='file']"), function(i, tag) {
	        $.each($(tag)[0].files, function(i, file) {
	            formData.append(tag.name, file);
	        });
	    });
	    var params = $("form").serializeArray();
	    $.each(params, function (i, val) {
	        formData.append(val.name, val.value);
	    });
	}
    
	$.ajax({
		   type: "POST",
		   url: "./WHInbkMgmtAJ.clt",
		   dataType: 'xml',
		   data: formData,
		   contentType: false,
	       processData: false,
		   success: function(data){
			   doHideProcess();
			   if($('res',data).text() == "OK"){
				   
				   formObj.logo_rec_flg.value = "N";
				   formObj.logo_rec_flg.checked = false;
				   
				   var xmlString = new XMLSerializer().serializeToString(data);

				   var sheet5XML = getSheetXmlStr(xmlString, "5");
				   sheet5.LoadSearchData(sheet5XML);
				   showCompleteProcess();
			   }else{
				   ComShowCodeMessage('COM131202');//Failed to upload
			   }
		   },
		   error: function(){
			   doHideProcess();
			   alert("UpLoad Fail! Please check format file upload.");
		   }
		 });
	document.form.logo_rectangle.value = "";
}
function getSheetXmlStr(xml, sSheetNo){
	
	var sBeginTag = '<SHEET' + sSheetNo + '>';
	
	var sCloseTag = '</SHEET' + sSheetNo + '>';
	
	var strtIndx = xml.indexOf(sBeginTag) + sBeginTag.length + 1;
	
	var endIndx = xml.indexOf(sCloseTag) - 1;
	
	return xml.substring(strtIndx, endIndx);
}
/** 
 * File 선택
 */
function btn_File_Path(){
	var formObj=document.form;
    setFieldValue(formObj.file_path, "");
    var files = upload1.GetList();
    for( var i = 0; i < files.length; i++) {
        upload1.RemoveOneFile(files[i].GetSerialNo());
    }
    upload1.AddFile();
}
/** 
 * File Delete
 */
function btn_File_Delete() {
	if (ComDisableTdButton("btn_file_delete", 1)) {
		return;
	}
	
	var formObj=document.form;
	var sheetObj=docObjects[4];
	var selRow=sheetObj.GetSelectRow();
	if (selRow < 1){
		ComShowCodeMessage("COM12189");
		return;
	}
	if (ComShowCodeConfirm("COM0053")) { // Do you want to delete?
		doShowProcess(true);
		setTimeout(function(){
			sheetObj.SetRowHidden(selRow,0);
			sheetObj.SetRowStatus(selRow,"D");
			var sParam=ComGetSaveString(sheetObj);
			if (sParam == "") { return; }
			var sXml=sheetObj.GetSaveData("./removeFileWHInbkGS.clt", sParam + "&doc_ref_no=" + ComGetObjValue(formObj.wib_bk_no) + "&f_cmd=" + REMOVE01);
	 		var strtIndxCheck = sXml.indexOf("<CHECK>") + "<CHECK>".length;
		 	var endIndxCheck = sXml.indexOf("</CHECK>");
		 	var xmlDoc = $.parseXML(sXml.substring(strtIndxCheck,endIndxCheck));
		 	var $xml = $(xmlDoc);
		    if ($xml.find( "res").text() != 'OK'){
		    	ComShowCodeMessage("COM12201");
				var strtIndxSheet1 = sXml.indexOf("<SHEET>");
				var endIndxSheet1 = sXml.indexOf("</SHEET>") + "</SHEET>".length;
				var sheet1Data = sXml.substring(strtIndxSheet1,endIndxSheet1);
				sheetObj.LoadSearchData(sheet1Data);
		     }
		},100);
	}
	showCompleteProcess();
}
//Show Shipping Information ==> Show/Hidden
function btn_show_shipping(showFlg){
	if(showFlg){
		document.all.btn_hide_nm.style.display="block";
		document.all.btn_show_nm.style.display="none";
		document.all.show_shipping.style.display="block";
	}else{
		document.all.btn_hide_nm.style.display="none";
		document.all.btn_show_nm.style.display="block";
		document.all.show_shipping.style.display="none";
	}
}
/**
 * Uploading Task Note Popup
 */
function btn_uploading_sheet(){
	//alert("This button is developing !");
	// Booking Issued status 인 경우에만 Create 가능.
	var vBkSts= document.form.bk_sts_cd.value;
	if (vBkSts != "I") {
		ComShowCodeMessage("COM0316"); // Please make Booking ISSUED first.
		return;		
	}
	var formObj=document.form;
	var sUrl="./WHUnloadSht.clt?wib_bk_no=" + ComGetObjValue(formObj.wib_bk_no) + "&wh_cd=" + formObj.warehouse.value + "&ctrt_no=" + ComGetObjValue(formObj.ctrt_no);
//	ComOpenPopup(sUrl, 1000, 670, "setVerUpInfo", "0,0", true);
	callBackFunc = "setVerUpInfo";
	modal_center_open(sUrl, callBackFunc, 1000, 630,"yes");
}

function btn_uploading_sheet2(){
	// Booking Issued status 인 경우에만 Create 가능.
	if(imgFlg){
		var vBkSts=document.form.bk_sts_cd.value;
		if (vBkSts != "I") {
			ComShowCodeMessage("COM0316"); // Please make Booking ISSUED first.
			return;		
		}
		var formObj=document.form;
		var sUrl="./WHUnloadSht.clt?wib_bk_no=" + ComGetObjValue(formObj.wib_bk_no) + "&wh_cd=" + formObj.warehouse.value + "&ctrt_no=" + ComGetObjValue(formObj.ctrt_no);
//		ComOpenPopup(sUrl, 1000, 670, "setVerUpInfo", "0,0", true);
		callBackFunc = "setVerUpInfo";
		modal_center_open(sUrl, callBackFunc, 1000, 630,"yes");
	}
}
function setVerUpInfo(rtnVal){
	
}
function doWork(srcName){
	if(!btnGetVisible(srcName)){	//버튼의 단축키 사용가능여부 체크
		return;
	}
    try{
		var formObj=document.form;
        switch(srcName) {
			case "SEARCHLIST":
				btn_Search();
				break;
			case "btn_excel":
				btn_Excel();
				break;
			case "btn_row_add":
				row_Add();
				break;
			case "btn_row_del":
				row_Del();
				break;
			case "btn_row_copy":
				row_Copy();
				break;
			case "btn_download":
				excel_Download();
				break;
			case "btn_upload":
				excel_Upload();
				break;
			case "btn_bl_load":
				BL_Load();
				break;
			case "btn_file_path":
				btn_File_Path();
				break;
			case "btn_file_upload":
				btn_File_Upload();
				break;
			case "btn_file_delete":
				btn_File_Delete();
				break;
			case "lnk_print":
				btn_Print();
				break;
			case "lnk_work":
				btn_Work_Order();
				break;
			case "lnk_svo":
				btn_SVO_Freight();
				break;
			case "lnk_cargo":
				btn_Cargo_Receipt();
				break;
			case "SAVE":
				btn_Save();
				break;
			case "COPY":
				btn_Copy();
				break;
			case "btn_reinstate":
				//alert("This button is developing !");
				btn_Reinstate();
				break;
			case "NEW":
				btn_New();
				break;
			case "btn_cancel":
				btn_Cancel();
				break;
        } // end switch
    } catch(e) {
        if(e == "[object Error]"){
         //Unexpected Error occurred. Please contact Help Desk!
         alert(getLabel('FMS_COM_ERR002'));
        } 
        else{
         //System Error! + MSG
         alert(getLabel('FMS_COM_ERR001') + " - " + e); 
        }
 }
}
// Warehouse popup
function getLocInfo(obj){
	var formObj=document.form;
	if(obj.value == ""){
		form.wh_cd.value="";
		form.wh_nm.value="";
	}else{
		searchLocInfo(formObj, ComGetObjValue(formObj.wh_cd), "wh_cd");
	}
}
function searchLocInfo (form, value, col){
	var formObj=document.form;
//	var sXml=docObjects[0].GetSearchData("searchTlLocInfo.clt?loc_cd="+ComGetObjValue(formObj.wh_cd));
	ajaxSendPost(resultLocNm, col, '&goWhere=aj&bcKey=searchTlLocInfo&loc_cd='+ComGetObjValue(formObj.wh_cd), './GateServlet.gsl');
}
function resultLocNm(reqVal, col) {
	var formObj=document.form;
	var doc=getAjaxMsgXML(reqVal);
	 var formObj=document.form;
	 if(doc[0]=='OK'){
	  if(typeof(doc[1])!='undefined'){
	   //조회해온 결과를 Parent에 표시함
	   var rtnArr=doc[1].split('@@^');
	   if(rtnArr[0] != ""){
		   formObj.wh_cd.value= rtnArr[1];
		   formObj.wh_nm.value= rtnArr[0];
	   }
	   else{
		   formObj.wh_cd.value= "";
		   formObj.wh_nm.value= "";
	   }
	  }
	 }
}

/** 
 * Attachment 처리 결과 메시지
 */
function upload1_OnMessage(Message,MsgCode,Description,EventFile){
    //var aryMsgCode = MsgCode.split("-");
    //alert(aryMsgCode + " : " + Description);
}
/**
 * 
 * @param showFlg
 */
function btn_show_uploading_sheet(showFlg) {
	if (showFlg) {
		ComBtnEnable("btn_create_uploading_sheet");
		setEnableUnloadSht("btn_document_uploading_sheet", false, 5);
		imgFlg = false;
	}else{
		ComBtnDisable("btn_create_uploading_sheet");
		setEnableUnloadSht("btn_document_uploading_sheet", true, 5);
		imgFlg = true;
	}
}
/** 
 * Order Type 선택시
 */
function ord_tp_cd_OnChange(comboObj, oldIndex, oldText, oldCode, newIndex, newText, newCode)
{
	// Adjustment 인 경우 Reason for ADJ * 필수입력 else Remark 옵션입력
	// 타이틀에 * 가 실시간 추가됨
	if ("A" == newCode) { // Adjustment
//		document.all.show_remark.style.display="block";
//		document.all.hide_remark.style.display="none";	
		document.getElementById("rmk").required = true;
	} else if ("G" == newCode) { // General
//		document.all.show_remark.style.display="none";
//		document.all.hide_remark.style.display="block";
		document.getElementById("rmk").required = false;
	} else if ("R" == newCode) { // Return
//		document.all.show_remark.style.display="none";
//		document.all.hide_remark.style.display="block";
		document.getElementById("rmk").required = false;
	} else { // All
//		document.all.show_remark.style.display="none";
//		document.all.hide_remark.style.display="block";
		document.getElementById("rmk").required = false;
	}	
}
/*
 * CBF -> CBM, LBS -> KGS 계산 스크립트 => CoCommon.js 정의
 */

function funcKGS_CBM_CAC(command, obj, obj2) {
	var formObj=document.form;
	var sheetObj=docObjects[2];
	var currow=0;	
	currow=sheetObj.GetSelectRow();
	if (command == "LB_KG") { // GWT / NWT
var lb_amt=roundXL((sheetObj.GetCellValue(currow, obj) / CNVT_CNST_KG_LB), 3);
//		lb_amt=lb_amt * 1000;
//		lb_amt=Math.round(lb_amt);
//		lb_amt=lb_amt / 1000;
		sheetObj.SetCellValue(currow, obj2,lb_amt,0);
	} else if (command == "KG_LB") { // CBM
var lb_amt=roundXL((sheetObj.GetCellValue(currow, obj) * CNVT_CNST_KG_LB), 3);
//		lb_amt=lb_amt * 1000;
//		lb_amt=Math.round(lb_amt);
//		lb_amt=lb_amt / 1000;
		sheetObj.SetCellValue(currow, obj2,lb_amt,0);
	} else if (command == "CBF_CBM") { // CBM
var lb_amt=roundXL((sheetObj.GetCellValue(currow, obj) * 0.028317), 3);
//		lb_amt=lb_amt * 1000;
//		lb_amt=Math.round(lb_amt);
//		lb_amt=lb_amt / 1000;
		sheetObj.SetCellValue(currow, obj2,lb_amt,0);
	}	else if (command == "CBM_CBF") { // CBM
var lb_amt=roundXL((sheetObj.GetCellValue(currow, obj) / 0.028317), 3);
		lb_amt=lb_amt * 100000;
		lb_amt=Math.round(lb_amt);
		lb_amt=lb_amt / 100000;
		sheetObj.SetCellValue(currow, obj2,lb_amt,0);
	}
}

/**
 * Unloading Sheet Doc icon 활성화 여부
 */
function setEnableUnloadSht(btId, bEnable, flg)
{
	if (flg == 5) {
	    if (bEnable) {
	        document.getElementById(btId).src=APP_PATH+"/web/img/main/icon_m.gif";
	        document.getElementById(btId).disabled=false;
	    } else {
	        document.getElementById(btId).src=APP_PATH+"/web/img/main/icon_doc_g.gif";
	    	document.getElementById(btId).disabled=true;
	    }
	}
}
/**
 *  Booking Item 수정 불가 칼럼
 * @param sheetObj
 * @param Row
 */
function setBookingItemGetCellEditable(sheetObj, Row) {
	var prefix="Grd01";
	var bk_sts_cd=document.form.bk_sts_cd.value;
	if ("N" == bk_sts_cd) { // Booked
		sheetObj.SetCellEditable(Row, prefix+"item_cd",0);
		sheetObj.SetCellEditable(Row, prefix+"item_nm",0);
		sheetObj.SetCellEditable(Row, prefix+"po_no",0);
		// Lot ID가 입력된경우, Status와 상관없이 Lot 속성 5가지는 수정 불가
		if (!ComIsNull(sheetObj.GetCellValue(Row, prefix+"fix_lot_id"))) {
			sheetObj.SetCellEditable(Row, prefix+"inbound_dt",0);
			sheetObj.SetCellEditable(Row, prefix+"lot_no",0);
			sheetObj.SetCellEditable(Row, prefix+"exp_dt",0);
			sheetObj.SetCellEditable(Row, prefix+"lot_04",0);
			sheetObj.SetCellEditable(Row, prefix+"lot_05",0);
			sheetObj.SetCellEditable(Row, prefix+"fix_lot_id",0);
 			sheetObj.SetCellImage(Row, prefix+"lot_id_img","");
			// Lot Id Popup 버튼은 클릭시 리턴 처리
			//sheetObj.CellEditable(Row, prefix+"lot_id_img") = false;
		}		
	}
}
/**
 * Item EA_QTY 계산
 * @param sheetObj
 * @param Row
 * @param col
 */
function fnCalcItemEaQty(sheetObj, Row, Col) {
	var formObj=document.form;	
	var prefix="Grd01";
	var item_pkgunit=sheetObj.GetCellValue(Row, prefix + "item_pkgunit").trim();
	var item_pkgqty=sheetObj.GetCellValue(Row, prefix + "item_pkgqty");//;.trim();
	var ctrt_no=ComGetObjValue(formObj.ctrt_no) ;
	var item_sys_no=sheetObj.GetCellValue(Row, prefix + "item_sys_no").trim();
	if (item_pkgunit == "" && item_pkgqty > 0) {
		//ComShowCodeMessage("COM0311"); //sound unit는 없고 qty있는경우 메세지
		//sheetObj.SelectCell(Row, Col);
		ComShowCodeMessage("COM0162", Row-1, "[Item] Unit");
		sheetObj.SelectCell(Row, Col);
		return;
	}
//	var sXml=sheetObj.GetSearchData("searchPutawayEaQty.clt?putaway_pkgunit=" + item_pkgunit 
//							            + "&putaway_pkgqty=" + item_pkgqty
//							            + "&ctrt_no="        + ctrt_no
//							            + "&item_sys_no="    + item_sys_no);	
//	resultCalcItemEaQty(sXml, sheetObj, Row, Col);
	ajaxSendPost(resultCalcItemEaQty, Row, '&goWhere=aj&bcKey=searchPutawayEaQty&putaway_pkgunit=' + item_pkgunit 
            + "&putaway_pkgqty=" + item_pkgqty
            + "&ctrt_no="        + ctrt_no
            + "&item_sys_no="    + item_sys_no, './GateServlet.gsl');
}
/*
 * receving 정보바뀐경우 os계산 ajax return function                           
 */
function resultCalcItemEaQty(reqVal, Row) {
	var doc=getAjaxMsgXML(reqVal);
	 var formObj=document.form;
	 if(doc[0]=='OK'){
	  if(typeof(doc[1])!='undefined'){
	   //조회해온 결과를 Parent에 표시함
	   var rtnArr=doc[1].split('^@');
	   if(rtnArr[0] != ""){
		   var prefix="Grd01";
			sheetObj = sheet3;
			var suYn= rtnArr[2];
			var suValue=rtnArr[3];
			if (suYn == "" || suYn == null)	{
				alert("error"); //TODO : MJY MESSAGE
				return;
			}
			if (suYn == "N") {
				ComShowCodeMessage(suValue); //COM0313~COM0315
				sheetObj.SetCellValue(Row, prefix + "item_pkgqty",0,0);
				sheetObj.SetCellValue(Row, prefix + "item_ea_qty",0,0);
				sheetObj.SetCellValue(Row, prefix + "item_pkgunit","",0);
				sheetObj.SelectCell(Row, prefix + "item_pkgunit");
				return;
			}
			var item_pkgqty= rtnArr[1];
			sheetObj.SetCellValue(Row, prefix + "item_ea_qty",item_pkgqty,0);
			//sheetObj.CellValue2(Row, prefix + "add_row") = item_pkgqty;
			// CBM, GWT, NWT 계산 
			fnCalcItemCbmGwtNwt(sheetObj, Row);
	   }
	   else{
		   sheetObj.SetCellValue(Row, prefix + "item_ea_qty",'',0);
	   }
	  }
	 }
}
/**
 * CBM, GWT, NWT 계산
 */
function fnCalcItemCbmGwtNwt(sheetObj, Row) {
	var formObj=document.form;	
	var prefix="Grd01";
	// CBM, GWT, NWT 계산			 item_cbm
var item_ea_qty=eval(sheetObj.GetCellValue(Row, prefix + "item_ea_qty"));
var pkg_lv1_qty=eval(sheetObj.GetCellValue(Row, prefix + "pkg_lv1_qty"));
var lv1_cbm=eval(sheetObj.GetCellValue(Row, prefix + "lv1_cbm"));
var lv1_cbf=eval(sheetObj.GetCellValue(Row, prefix + "lv1_cbf"));
var lv1_grs_kgs=eval(sheetObj.GetCellValue(Row, prefix + "lv1_grs_kgs"));
var lv1_grs_lbs=eval(sheetObj.GetCellValue(Row, prefix + "lv1_grs_lbs"));
var lv1_net_kgs=eval(sheetObj.GetCellValue(Row, prefix + "lv1_net_kgs"));
var lv1_net_lbs=eval(sheetObj.GetCellValue(Row, prefix + "lv1_net_lbs"));
	sheetObj.SetCellValue(Row,  prefix + "item_cbm",(pkg_lv1_qty * item_ea_qty) * lv1_cbm,0);
	sheetObj.SetCellValue(Row,  prefix + "item_cbf",(pkg_lv1_qty * item_ea_qty) * lv1_cbf,0);
	sheetObj.SetCellValue(Row,  prefix + "item_grs_kgs",(pkg_lv1_qty * item_ea_qty) * lv1_grs_kgs,0);
	sheetObj.SetCellValue(Row,  prefix + "item_grs_lbs",(pkg_lv1_qty * item_ea_qty) * lv1_grs_lbs,0);
	sheetObj.SetCellValue(Row,  prefix + "item_net_kgs",(pkg_lv1_qty * item_ea_qty) * lv1_net_kgs,0);
	sheetObj.SetCellValue(Row,  prefix + "item_net_lbs",(pkg_lv1_qty * item_ea_qty) * lv1_net_lbs,0);
}
/**
 * Booking Issued 된 경우, Item 그리드의 수정 가능 여부에 따른 칼럼 비활성화 처리
 * @param sheetObj
 * @param Row
 * @param Value
 */
function setItemSheetEditable(sheetObj, Row, Value) {
	var prefix="Grd01";
	if (Value == "N") { // Booked
		sheetObj.SetCellEditable(Row, prefix + "del_chk"     ,1);
		sheetObj.SetCellEditable(Row, prefix + "item_cd"     ,1);
		sheetObj.SetCellEditable(Row, prefix + "item_nm"     ,1);
		sheetObj.SetCellEditable(Row, prefix + "lot_no"      ,1);
		sheetObj.SetCellEditable(Row, prefix + "item_pkgunit",1);
		sheetObj.SetCellEditable(Row, prefix + "item_pkgqty" ,1);
		sheetObj.SetCellEditable(Row, prefix + "item_cbm"    ,1);
		sheetObj.SetCellEditable(Row, prefix + "item_cbf"    ,1);
		sheetObj.SetCellEditable(Row, prefix + "item_grs_kgs",1);
		sheetObj.SetCellEditable(Row, prefix + "item_grs_lbs",1);
		sheetObj.SetCellEditable(Row, prefix + "item_net_kgs",1);
		sheetObj.SetCellEditable(Row, prefix + "item_net_lbs",1);
		sheetObj.SetCellEditable(Row, prefix + "po_no"       ,0);
		sheetObj.SetCellEditable(Row, prefix + "eq_tpsz_cd"  ,1);
		sheetObj.SetCellEditable(Row, prefix + "eq_no"       ,1);
		sheetObj.SetCellEditable(Row, prefix + "seal_no"     ,1);
		sheetObj.SetCellEditable(Row, prefix + "seal_img"    ,1);
 		sheetObj.SetCellImage(Row, prefix+"seal_img",1);
		sheetObj.SetCellEditable(Row, prefix + "inbound_dt"  ,1);
		sheetObj.SetCellEditable(Row, prefix + "exp_dt"      ,1);
		sheetObj.SetCellEditable(Row, prefix + "lot_04"      ,1);
		sheetObj.SetCellEditable(Row, prefix + "lot_05"      ,1);
		sheetObj.SetCellEditable(Row, prefix + "fix_lot_id"  ,1);
		sheetObj.SetCellEditable(Row, prefix + "lot_id_img"  ,1);
 		sheetObj.SetCellImage(Row,  prefix + "lot_id_img",0);
		sheetObj.SetCellEditable(Row, prefix + "cntr_ref_no" ,1);
		sheetObj.SetCellEditable(Row, prefix + "hbl_no"      ,1);
		sheetObj.SetCellEditable(Row, prefix + "mbl_no"      ,1);
		sheetObj.SetCellEditable(Row, prefix + "pol"         ,1);
		sheetObj.SetCellEditable(Row, prefix + "etd"         ,1);
		sheetObj.SetCellEditable(Row, prefix + "pod"         ,1);
		sheetObj.SetCellEditable(Row, prefix + "eta"         ,1);
		sheetObj.SetCellEditable(Row, prefix + "del"         ,1);
		sheetObj.SetCellEditable(Row, prefix + "carrier_cd"  ,1);
		sheetObj.SetCellEditable(Row, prefix + "carrier_nm"  ,0);
		sheetObj.SetCellEditable(Row, prefix + "vsl_cd"      ,1);
		sheetObj.SetCellEditable(Row, prefix + "vsl_nm"      ,0);
		sheetObj.SetCellEditable(Row, prefix + "voy"         ,1);
		sheetObj.SetCellEditable(Row, prefix + "curr_cd"     ,1);
		sheetObj.SetCellEditable(Row, prefix + "unit_price"  ,1);
	} else if (Value == "I") { // Issued
		sheetObj.SetCellEditable(Row, prefix + "del_chk"     ,0);
		sheetObj.SetCellEditable(Row, prefix + "item_cd"     ,0);
		sheetObj.SetCellEditable(Row, prefix + "item_nm"     ,0);
		sheetObj.SetCellEditable(Row, prefix + "lot_no"      ,0);
		sheetObj.SetCellEditable(Row, prefix + "item_pkgunit",0);
		sheetObj.SetCellEditable(Row, prefix + "item_pkgqty" ,0);
		sheetObj.SetCellEditable(Row, prefix + "item_cbm"    ,1);
		sheetObj.SetCellEditable(Row, prefix + "item_cbf"    ,1);
		sheetObj.SetCellEditable(Row, prefix + "item_grs_kgs",1);
		sheetObj.SetCellEditable(Row, prefix + "item_grs_lbs",1);
		sheetObj.SetCellEditable(Row, prefix + "item_net_kgs",1);
		sheetObj.SetCellEditable(Row, prefix + "item_net_lbs",1);
		sheetObj.SetCellEditable(Row, prefix + "po_no"       ,0);
		sheetObj.SetCellEditable(Row, prefix + "eq_tpsz_cd"  ,1);
		sheetObj.SetCellEditable(Row, prefix + "eq_no"       ,1);
		sheetObj.SetCellEditable(Row, prefix + "seal_no"     ,1);
		sheetObj.SetCellEditable(Row, prefix + "seal_img"    ,1);
 		sheetObj.SetCellImage(Row, prefix+"seal_img",1);
		sheetObj.SetCellEditable(Row, prefix + "inbound_dt"  ,0);
		sheetObj.SetCellEditable(Row, prefix + "exp_dt"      ,0);
		sheetObj.SetCellEditable(Row, prefix + "lot_04"      ,0);
		sheetObj.SetCellEditable(Row, prefix + "lot_05"      ,0);
		sheetObj.SetCellEditable(Row, prefix + "fix_lot_id"  ,0);
		sheetObj.SetCellEditable(Row, prefix + "lot_id_img"  ,0);
 		sheetObj.SetCellImage(Row, prefix+"lot_id_img","");
		sheetObj.SetCellEditable(Row, prefix + "cntr_ref_no" ,1);
		sheetObj.SetCellEditable(Row, prefix + "hbl_no"      ,1);
		sheetObj.SetCellEditable(Row, prefix + "mbl_no"      ,1);
		sheetObj.SetCellEditable(Row, prefix + "pol"         ,1);
		sheetObj.SetCellEditable(Row, prefix + "etd"         ,1);
		sheetObj.SetCellEditable(Row, prefix + "pod"         ,1);
		sheetObj.SetCellEditable(Row, prefix + "eta"         ,1);
		sheetObj.SetCellEditable(Row, prefix + "del"         ,1);
		sheetObj.SetCellEditable(Row, prefix + "carrier_cd"  ,1);
		sheetObj.SetCellEditable(Row, prefix + "carrier_nm"  ,0);
		sheetObj.SetCellEditable(Row, prefix + "vsl_cd"      ,1);
		sheetObj.SetCellEditable(Row, prefix + "vsl_nm"      ,0);
		sheetObj.SetCellEditable(Row, prefix + "voy"         ,1);
		sheetObj.SetCellEditable(Row, prefix + "curr_cd"     ,0);
		sheetObj.SetCellEditable(Row, prefix + "unit_price"  ,0);
	} else if (Value == "C") { // Cancel
		sheetObj.SetCellEditable(Row, prefix + "del_chk"     ,0);
		sheetObj.SetCellEditable(Row, prefix + "item_cd"     ,0);
		sheetObj.SetCellEditable(Row, prefix + "item_nm"     ,0);
		sheetObj.SetCellEditable(Row, prefix + "lot_no"      ,0);
		sheetObj.SetCellEditable(Row, prefix + "item_pkgunit",0);
		sheetObj.SetCellEditable(Row, prefix + "item_pkgqty" ,0);
		sheetObj.SetCellEditable(Row, prefix + "item_cbm"    ,0);
		sheetObj.SetCellEditable(Row, prefix + "item_cbf"    ,0);
		sheetObj.SetCellEditable(Row, prefix + "item_grs_kgs",0);
		sheetObj.SetCellEditable(Row, prefix + "item_grs_lbs",0);
		sheetObj.SetCellEditable(Row, prefix + "item_net_kgs",0);
		sheetObj.SetCellEditable(Row, prefix + "item_net_lbs",0);
		sheetObj.SetCellEditable(Row, prefix + "po_no"       ,0);
		sheetObj.SetCellEditable(Row, prefix + "eq_tpsz_cd"  ,0);
		sheetObj.SetCellEditable(Row, prefix + "eq_no"       ,0);
		sheetObj.SetCellEditable(Row, prefix + "seal_no"     ,0);
		sheetObj.SetCellEditable(Row, prefix + "seal_img"    ,0);
 		sheetObj.SetCellImage(Row, prefix+"seal_img","");
		sheetObj.SetCellEditable(Row, prefix + "inbound_dt"  ,0);
		sheetObj.SetCellEditable(Row, prefix + "exp_dt"      ,0);
		sheetObj.SetCellEditable(Row, prefix + "lot_04"      ,0);
		sheetObj.SetCellEditable(Row, prefix + "lot_05"      ,0);
		sheetObj.SetCellEditable(Row, prefix + "fix_lot_id"  ,0);
		sheetObj.SetCellEditable(Row, prefix + "lot_id_img"  ,0);
 		sheetObj.SetCellImage(Row, prefix+"lot_id_img","");
		sheetObj.SetCellEditable(Row, prefix + "cntr_ref_no" ,0);
		sheetObj.SetCellEditable(Row, prefix + "hbl_no"      ,0);
		sheetObj.SetCellEditable(Row, prefix + "mbl_no"      ,0);
		sheetObj.SetCellEditable(Row, prefix + "pol"         ,0);
		sheetObj.SetCellEditable(Row, prefix + "etd"         ,0);
		sheetObj.SetCellEditable(Row, prefix + "pod"         ,0);
		sheetObj.SetCellEditable(Row, prefix + "eta"         ,0);
		sheetObj.SetCellEditable(Row, prefix + "del"         ,0);
		sheetObj.SetCellEditable(Row, prefix + "carrier_cd"  ,0);
		sheetObj.SetCellEditable(Row, prefix + "carrier_nm"  ,0);
		sheetObj.SetCellEditable(Row, prefix + "vsl_cd"      ,0);
		sheetObj.SetCellEditable(Row, prefix + "vsl_nm"      ,0);
		sheetObj.SetCellEditable(Row, prefix + "voy"         ,0);
		sheetObj.SetCellEditable(Row, prefix + "curr_cd"     ,0);
		sheetObj.SetCellEditable(Row, prefix + "unit_price"  ,0);
	}
}
function initUpload(){ 
    upload1.Initialize({
         SaveUrl:'./addFileWHInbk.clt'
        ,AdditionalParam:"FileUploadModule=OMS"
        ,Language:"en"
        ,ShowButtonArea: false
        ,ShowInfoArea: true
        ,ExtraForm: 'upLoadForm'
        ,ResponseType : 'xml'
        ,BeforeAddFile : function(result){  //파일추가전 발생 이벤트
            return true;
        }
        ,BeforeSaveStatus : function(result){   // 저장전 발생 이벤트
            return true;
        }
        ,AfterSaveStatus : function(result) {         // 저장후 발생 이벤트
            btn_Search();

        }
        ,AfterAddFile:function(result){         // 파일추가 후 발생 이벤트
            var files = upload1.GetList();
            var formObj=document.form;
            setFieldValue(formObj.file_path, files[0].GetFileName());
        }
    });
    var upload1_upload = document.getElementById('upload1_upload');
    upload1_upload.style.display = 'none';
}
function ClearHTML() {
    var ibupForm = document.getElementById('ibup_form');
    ibupForm.action = ibupForm.action.replace('&FileUploadModule=OMS', '');
}
function getParam() {
    var formObj = document.form;

    var sParam="svc_tp_cd="+ComGetObjValue(formObj.svc_tp_cd);
	sParam += "&doc_ref_tp_cd="+ComGetObjValue(formObj.doc_ref_tp_cd);
	sParam += "&doc_tp_cd="+ComGetObjValue(formObj.doc_tp_cd);
	sParam += "&doc_ref_no="+ComGetObjValue(formObj.wib_bk_no);
	sParam += "&doc_ref_no2="+ComGetObjValue(formObj.doc_ref_no2);
	
    return sParam;
}
function resizeSheet(){
	ComResizeSheet(sheet3);
	ComResizeSheet(sheet4);
	ComResizeSheet(sheet5);
}

function setEnableOwner(btId, bEnable, flg)
{
	if (flg == 5) {
	    if (bEnable) {
	      //  document.getElementById(btId).src=APP_PATH+ "/web/img/main/icon_search1.gif";
	       // document.getElementById(btId).disabled=false;
	        ownerFlg = true;
	    } else {
//	        document.getElementById(btId).src=APP_PATH+"/web/img/main/icon_search1_g.gif";
	    	//document.getElementById(btId).disabled=true;
	    	ownerFlg = false;
	    }
	}
}

function setEnableVendor(btId, bEnable)
{
   /* if (bEnable) {
        document.getElementById(btId).src=APP_PATH+"/web/img/main/icon_search1.gif";
        document.getElementById(btId).disabled=false;
        vendorFlg = true;
    } else {
        document.getElementById(btId).src=APP_PATH+"/web/img/main/icon_search1_g.gif";
    	document.getElementById(btId).disabled=true;
    	vendorFlg = false;
    }*/
}
function setEnableConsignee(btId, bEnable)
{
   /* if (bEnable) {
        document.getElementById(btId).src=APP_PATH+ "/web/img/main/icon_search1.gif";
        document.getElementById(btId).disabled=false;
        consigneeFlg = true;
    } else {
        document.getElementById(btId).src=APP_PATH+"/web/img/main/icon_search1_g.gif";
    	document.getElementById(btId).disabled=true;
    	consigneeFlg = false;
    }*/
}

function ComDisableTdButton(btId, flg)
{
    if (flg==1) {
    	var vClassName = document.getElementById(btId).className;
		if("Btn_Disable" == vClassName)	return true;
		return false;
    }else if (flg==2) {
    	if(document.getElementById(btId).disabled)	return true;
		return false;
    }
}

function haveAnyChanged(){
	
	var sheetChange = "";
	
//	for(var i = 1 ; i < docObjects.length; i++){
//		sheetChange += docObjects[i].GetSaveString();
//	}
//	
//	if(sheetChange != "" ){
//		
//		return true;
//	} 
	
	var arrInput = document.getElementsByTagName("input");
	
	for(var i = 0 ; i < arrInput.length; i++){
		var bFlag;
		
		if(arrInput[i].type != "hidden" 
			&& arrInput[i].disabled == false 
			&& arrInput[i].readOnly == false 
			&& arrInput[i].oldvalue != undefined 
			&& arrInput[i].oldvalue != 'undefined' 
			)
		{
			if(arrInput[i].type == "checkbox"){
				
				bFlag = (arrInput[i].oldvalue != arrInput[i].checked);
				
			}else{
				bFlag = (arrInput[i].oldvalue != arrInput[i].value);
			}
			
			if(bFlag){
				return true;
			}
		}
	}
	
	var arrTextarea = document.getElementsByTagName("textarea");
	
	for(var i = 0 ; i < arrTextarea.length; i++){
		if( arrTextarea[i].type != "hidden" 
			&& arrTextarea[i].disabled == false 
			&& arrTextarea[i].readOnly == false 
			&& arrTextarea[i].oldvalue != undefined 
			&& arrTextarea[i].oldvalue != 'undefined' 
			&& arrTextarea[i].oldvalue != arrTextarea[i].value)
		{
			return true;
		}
	}
	
	var arrSelect = document.getElementsByTagName("select");
	
	for(var i = 0 ; i < arrSelect.length; i++){
		if( arrSelect[i].type != "hidden" 
			&& arrSelect[i].disabled == false 
			//&& arrSelect[i].readOnly == false 
			&& arrSelect[i].oldvalue != undefined 
			&& arrSelect[i].oldvalue != 'undefined' 
			&& arrSelect[i].oldvalue != arrSelect[i].value)
		{
			return true;
		}
	}
	 
	return false;
}

function setOldValueAllObj(){
	var arrInput = document.getElementsByTagName("input");
	
	for(var i = 0 ; i < arrInput.length; i++){
		if(arrInput[i].type != "hidden" && arrInput[i].disabled == false && arrInput[i].readOnly == false)
			if(arrInput[i].type == "checkbox"){
				arrInput[i].oldvalue = arrInput[i].checked;
			}else{
				arrInput[i].oldvalue = arrInput[i].value;
			}
	}
	
	var arrTextarea = document.getElementsByTagName("textarea");
	
	for(var i = 0 ; i < arrTextarea.length; i++){
		if(arrTextarea[i].type != "hidden" && arrTextarea[i].disabled == false && arrTextarea[i].readOnly == false)
			arrTextarea[i].oldvalue = arrTextarea[i].value;
	}
	
	var arrSelect = document.getElementsByTagName("select");
	
	for(var i = 0 ; i < arrSelect.length; i++){
		//if(arrSelect[i].type != "hidden" && arrSelect[i].disabled == false && arrSelect[i].readOnly == false)
		if(arrSelect[i].type != "hidden" && arrSelect[i].disabled == false)
			arrSelect[i].oldvalue = arrSelect[i].value;
	}
}

function getSaveString(){
	var prefix="Grd01";
	for(var i = 2 ; i < sheet3.LastRow(); i++){
		if(sheet3.GetCellValue(i,prefix+ "ibflag")!="R" && sheet3.GetCellValue(i,prefix+ "ibflag")!="-1")
			return true;
	}
	var prefix3="Grd03";
	for(var i = 1 ; i < sheet5.LastRow(); i++){
		if(sheet5.GetCellValue(i,prefix3+ "ibflag")=="R" && sheet5.GetCellValue(i,prefix3+ "ibflag")=="-1")
			return true;
	}
	return false;
	
}

function getInfo_Carrier(obj) {
	formObj=document.form;
	var val = obj.value;
	if(val != ""){
		ajaxSendPost(dispCodeNameAjaxReq2, 'reqVal','&goWhere=aj&bcKey=getTrdpInfo&trdp_cd=' + val, './GateServlet.gsl');
	}else {
		formObj.carrier_nm.value = '';
		formObj.carrier_cd.value = '';
	}
}

//코드표시 Ajax
function dispCodeNameAjaxReq2(reqVal){
	var doc=getAjaxMsgXML(reqVal);
	var targetFr='mainFrame';
	var formObj=document.form;
	if(doc[0]=='OK'){
		if(typeof(doc[1])!='undefined'){
			//조회해온 결과를 Parent에 표시함
			var rtnArr=doc[1].split(';');
			var masterVals=rtnArr[0].split('@@^');	
			formObj.carrier_nm.value=masterVals[2];	
		}else{
			formObj.carrier_cd.value="";//trdp_cd
			formObj.carrier_nm.value="";//trdp_nm
		}
	}else{
		//Error Errupt!	
		alert(getLabel('FMS_COM_ERR001') + "\n\n: SEE_BMD_0061.152");		
	}
}
/**
 * Check Authority Warehouse Code
 * @author tin.luong
 */
function check_authority_wh(){
	var formObj = document.form;
	var sheetObj = sheet1;
	var countwd = 0;
	//List Warehouse from TB_SEQ
	var wh_list_ath = formObj.wh_list_ath.value;
	var arrwhcd =  wh_list_ath.split(',');
	//List warehouse default in User Entry Screen.
	var wh_cfg = formObj.wh_cfg.value;
	var arrwhcd_df =  wh_cfg.split(',');
	
	//Warehosue selected.
	var warehouse = formObj.warehouse.value;
	for(var i = 0; i < arrwhcd_df.length; i ++){
		for(var j = 0; j < arrwhcd.length; j ++){
			if( (warehouse == arrwhcd_df[i] && warehouse == arrwhcd[j])){
			countwd = countwd + 1;
			}
		}
	}
	if(countwd == 0){
		ComBtnDisable("btnSave");
		ComBtnDisable("btnCopy");
		ComBtnDisable("btn_reinstate");
		ComBtnDisable("btn_cancel");
		ComBtnDisable("lnk_cargo");
	}else{
		ComBtnEnable("btnSave");
		ComBtnEnable("btnCopy");
	}
}
