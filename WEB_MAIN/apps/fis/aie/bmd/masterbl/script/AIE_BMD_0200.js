var v_issued_by ="";
function loadPage() {
	v_issued_by = document.frm1.issued_by.value;
	var trkDisabled = true;
	$("#shpr_trdp_cd").prop("disabled", trkDisabled); 
	$("#shipper").prop("disabled", trkDisabled);
}

function doWork(srcName, curObj) {

	switch (srcName) {

	case "PRINT":
	case "PREVIEW":
		// /////////////////////////////////////////////////////////
		// 프린트
		var formObj = document.frm1;

		formObj.file_name.value = 'TSA_Security.mrd';
		formObj.title.value = 'TSA Security';
		
		if (formObj.display_option[0].checked) {
			formObj.file_name.value = 'TSA_Security.mrd';
			formObj.title.value = 'TSA Security';
		} else {
			formObj.file_name.value = 'TSA_Unknown.mrd';
			formObj.title.value = 'TSA Unknown';
		}
			
		var itemQty = formObj.item_qty.value;
		if(itemQty == ''){
			itemQty = 0;
		}
		
		
		// Parameter Setting
		var param = '';
		param += '[' + formObj.intg_bl_seq.value + ']'; // $1
		param += '[' + formObj.issued_by.value.toUpperCase() + ']'; // $2
		param += '[' + itemQty + ']'; // $3
		param += '[]'; // $4 logo parameter
		param += '[' + formObj.display_option.value + ']'; // $5
		param += '[' + formObj.shpr_trdp_nm.value + ']'; // $6
		param += '[' + formObj.shpr_local_addr.value + ']'; // $7
		formObj.rd_param.value = param;

        if(srcName == "PREVIEW") {
            $("#prt_option").val("opt_preview");
        } else if(srcName == "PRINT") {
            $("#prt_option").val("opt_print");
        }

        if($("#chk_auto_close").is(":checked")){
            doWork("CLOSE");
        }	
		popPOST(formObj, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
		
		break;

	case "CLOSE":
    	window.close();
	break;	

	}
}
//Signature해제하면 disabled모드로 변경
$("input").on("input", function() {
    if($("#s_oe_dptm_flg").is(":checked")){
        // alert("체크박스 체크했음!");
    	$("input[name=issued_by]").attr("disabled",false);
     }else{
     	document.frm1.issued_by.value = '';
     	$("input[name=issued_by]").attr("disabled",true);     	
     }
   
});

$(document).ready(function(){
    $("#s_oe_dptm_flg").change(function(){
        if($("#s_oe_dptm_flg").is(":checked")){
           // alert("체크박스 체크했음!");
        	document.frm1.issued_by.value = v_issued_by;
        	$("input[name=issued_by]").attr("disabled",false);
        }else{
        	document.frm1.issued_by.value = '';
        	 $("input[name=issued_by]").attr("disabled",true);
        }
	});

    var cookie_key = "aie_bmd_0200_auto_close";
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

$(document).ready(function() {
    $('input[type=radio][name=display_option]').change(function() {
		var trkDisabled = false;
        if (this.value == 'SE') {
			trkDisabled = false;
        }
        else if (this.value == 'UN') {
			trkDisabled = true;
        }
		$("#shpr_trdp_cd").prop("disabled", trkDisabled); 
		$("#shipper").prop("disabled", trkDisabled);
    });
});