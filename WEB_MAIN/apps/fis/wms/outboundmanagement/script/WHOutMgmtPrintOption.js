var comboObjects = new Array();
var comboCnt = 0;

function loadPage() {

	// IBMultiCombo초기화
	initControl();
	if($("#bk_sts_cd").val() != 'X'){
		$('#chOptHOManifestShtByShipTo').attr('disabled',true);
		$('#chOptHOManifestShtByOrder').attr('disabled',true);
	}
}

/**
 * Combo 기본 설정 param : comboObj ==> 콤보오브젝트, comboNo ==> 콤보오브젝트 태그의 아이디에 붙인 일련번호
 * 콤보가 다수일 경우 콤보 수만큼 case를 추가하여 시트 초기화모듈을 구성한다
 */

function initControl() {
	axon_event.addListenerFormat('keypress', 'obj_keypress', document.getElementById("form"));
}

function doWork(srcName){
	switch (srcName) {
		case 'PRINT':
			btn_Print();
			break;
		case 'CLOSE':
			btn_Close();
			break;
	}
}

/*
 * Close
 */
function btn_Close() {
	ComClosePopup(); 
}

/*
 * Print
 */
function btn_Print() {

	if(!$('input[name="chOption1"]').is(":checked") &&
	   !$('input[name="chOption2"]').is(":checked") &&
	   !$('input[name="chOptHOManifestShtByShipTo"]').is(":checked") &&
	   !$('input[name="chOptHOManifestShtByOrder"]').is(":checked")
	){
		// ComShowCodeMessage("COM0122", "print Option");
		ComShowCodeMessage("COM0608");
		return;
	}

	var formObj = document.form;
	var fileName = "";
	var param= "";
	// --프린트 생성
	/*var rdParam = "";
	var rdParam_default = " /rpagenuminit [1] /riprnmargin ";
	var print = "<input type=\"hidden\" id=\"com_mrdBodyTitle\" name=\"com_mrdBodyTitle\" value=\"Outbooking Print\" />";
	var mrd_size = "";
	if ($("#print_size_tp")[0].Code == "LT") {
		mrd_size = "_LT";
	}
	*/
	// Outbound Work Sheet
	if ($('input[name="chOption1"]').is(":checked")) {
		formObj.title.value="Outbound Work Sheet Report";
		fileName += "^@@^" + 'WH_OUT_WORK_SHT.mrd' ;
		param += "^@@^"+ "[" + 'WOB_BK_NO' + "]"+"[" + $("#wob_bk_no").val() + "]"+"["+"]"+"[" + $("#wob_bk_no").val().replaceAll("','","") + "]";
		
		//LKH::#1939 [BINEX WMS4.0] PDF EXPORTED FILE NAME
		formObj.rpt_file_name_title.value ="";
		if(formObj.file_name_title.value != null && formObj.file_name_title.value != ''){
			formObj.rpt_file_name_title.value = "OUT_WORKSHT_" + formObj.file_name_title.value; 
		}
	}
	
	if ($('input[name="chOption2"]').is(":checked")) {
//		formObj.title.value="Goods Issue Report";
//		fileName += "^@@^"+'WH_OUT_GOODS_ISSUE.mrd' ;
//		param += "^@@^"+ "[" + 'WOB_BK_NO' + "]"+"[" + $("#wob_bk_no").val() +"]"+"[" +  + "]"; 
		formObj.title.value="Packing Slip Report";
		fileName += "^@@^"+'WH_OUT_PACKING_SLIP.mrd' ;
		var url = window.location.href.substring(0,window.location.href.indexOf(APP_PATH));
		param += "^@@^"+"[" + $("#wob_bk_no").val() +"]"+"[" + url + "]";
		param += "[" + ($("#chOption3").is(":checked") ? "Y" : "N") + "]";		//#2888 [WMS4.0][Mobile]Picking 시 Serial# Scan & Validation 기능 추가

		//LKH::#1939 [BINEX WMS4.0] PDF EXPORTED FILE NAME
		formObj.rpt_file_name_title.value ="";
		if(formObj.file_name_title.value != null && formObj.file_name_title.value != ''){
			formObj.rpt_file_name_title.value = "OUT_PKGSLIP_" + formObj.file_name_title.value; 
		}
	}
	//Outbound H/O Manifest
	var wave_no=$("#wave_no").val();
	if($('input[name="chOptHOManifestShtByShipTo"]').is(":checked")) 
	{
		formObj.title.value="Outbound H/O Manifest Report";
		fileName += "^@@^"+ 'WH_OUT_HO_MANIFEST_SHT.mrd' ;
		param += "^@@^" + "[" + wave_no + "]" + "[N]" +"[SHIPTO]"; 
	}
	if($('input[name="chOptHOManifestShtByOrder"]').is(":checked")) 
	{
		formObj.title.value="Outbound H/O Manifest Report";
		fileName += "^@@^"+ 'WH_OUT_HO_MANIFEST_SHT.mrd' ;
		param += "^@@^" + "[" + wave_no + "]" + "[N]" +"[ORDER]"; 
	}
	fileName = fileName.substring(4);
	param = param.substring(4);
	formObj.file_name.value = fileName;
	formObj.rd_param.value = param;
	popPOST(formObj, './RPT_RD_0030.clt', 'popTest', 1025, 740);

	//$('#printArea').html(print);
	//ComOpenRDPopupModal();
}

//#2888 [WMS4.0][Mobile]Picking 시 Serial# Scan & Validation 기능 추가 (S)
$(document).ready(function(){
	$('#chOption2').click(function(){
		if($('#chOption2').is(":checked")) {
			$('#chOption3').prop("checked", true);
			//$('#chOption3').removeAttr("disabled");
			$('#chOption3').prop("disabled", false);
		} else {
			$('#chOption3').prop("disabled", true);
			$('#chOption3').prop("checked", false);
		}
	});
});
//#2888 [WMS4.0][Mobile]Picking 시 Serial# Scan & Validation 기능 추가 (E)

function complete_opt_change(div)
{
	if(div == "SHIPTO")
	{
		if($('input[name="chOptHOManifestShtByShipTo"]').is(":checked") && $('input[name="chOptHOManifestShtByOrder"]').is(":checked")) 
		{
			$('#chOptHOManifestShtByOrder').attr('checked',false);
		}
	}
	else
	{
		if($('input[name="chOptHOManifestShtByShipTo"]').is(":checked") && $('input[name="chOptHOManifestShtByOrder"]').is(":checked")) 
		{
			$('#chOptHOManifestShtByShipTo').attr('checked',false);
		}
	}
}
