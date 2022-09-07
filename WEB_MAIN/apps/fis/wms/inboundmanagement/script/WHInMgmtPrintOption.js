
var frm;
var docObjects=new Array();
function loadPage() {
	frm = document.form;
	//디폴트 checked
	if($("#bk_sts_cd").val() == "I" || $("#bk_sts_cd").val() == "")
	{
		$('#chOption1').attr('checked',true);
	}
	/*else if($("#bk_sts_cd").val() == "X")
	{
		$('#chOption2').attr('checked',true);
	}*/
	frm.box_lvl_opt.disabled = true;
	//#6473 [Hanaro] Customized Inbound Pallet Label
	var opt_key = "PAPER_SIZE_OF_PALLET_LABEL";
	ajaxSendPost(setUpOpt, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
	if (setUp_opt == 'Y') {
		   $("#chOption7_lbl").css({"display":"inline"});
		   $("#chOption7_val").css({"display":"inline"});
		   $("#detail_opt").css({"display":""}); 
	}
}

/* PRINT OPTION CHECKBOX 클릭 이벤트*/
function changePrintOption(obj)
{
	/*if($('input[name="chOption1"]').is(":checked") == true || $('input[name="chOption2"]').is(":checked") == true)
	{
		$('#chOption3').attr('checked',false);
		$('#chOption4').attr('checked',false);
		frm.box_lvl_opt.disabled = true;
	}*/
}

/*
 * LABEL PRINT OPTION의 CHECKBOX 클릭 이벤트
 */
function changeLabelOption(label_div, obj)
{
	/*if($('input[name="chOption3"]').is(":checked") == false && $('input[name="chOption4"]').is(":checked") == false)
	{
		frm.box_lvl_opt.disabled = true;
		return;
	}*/
//	$('#chOption1').attr('checked',false);
//	$('#chOption2').attr('checked',false);
	
	var chk_nm1 = "";
	var chk_nm2 = "";
	var box_lvl_opt_enble = false;
	if(label_div == "BX")
	{
//		chk_nm1 = "chOption4";
		chk_nm2 = "chOption3";
		box_lvl_opt_enble = false;
	}
	else
	{
		chk_nm1 = "chOption3";
//		chk_nm2 = "chOption4";
		box_lvl_opt_enble = true;
	}
	if($("input[name='" + chk_nm1+ "']").is(":checked") == true)
	{
		$("#" + chk_nm2).attr('checked',false);
		frm.box_lvl_opt.disabled = box_lvl_opt_enble;
	}
}

function doWork(srcName){
	switch (srcName) {
	case 'PRINT':
		btnPrint();
		break;
	case 'CLOSE':
		btnClose();
		break;
	}
}

/*
 * Close
 */
function btnClose(){
	ComClosePopup();
}

/*
 * Print
 */
function btnPrint(){
	
	if (!$('input[name="chOption1"]').is(":checked") 
//	 && !$('input[name="chOption2"]').is(":checked")
	 && !$('input[name="chOption3"]').is(":checked")
//	 && !$('input[name="chOption4"]').is(":checked")
	) {
		ComShowCodeMessage("COM0538");
		return;
	}
	
	//label프린트는 한개이상 선택 할수없다. 체크박스 이벤트로 하나만 선택하게끔 되어있지만, 자바스크립트 에러로 하나 이상 체크가능하게 될 경우를 대비하여
	//프린트전에 한번 더 체크한다.
/*	if($('input[name="chOption3"]').is(":checked")  && $('input[name="chOption4"]').is(":checked"))
	{
		ComShowCodeMessage("COM0254");
		return;
	}*/

	//label option에 체크가 되어있는데 print option이 체크되어있는 경우 프린트 불가하다.
	var cnt = 0;
//	if ($('input[name="chOption1"]').is(":checked") || $('input[name="chOption2"]').is(":checked")) 
	if ($('input[name="chOption1"]').is(":checked") )
	{
		cnt = cnt + 1;
	}
//	if ($('input[name="chOption3"]').is(":checked") || $('input[name="chOption4"]').is(":checked")) 
	if ($('input[name="chOption3"]').is(":checked") )
	{
		cnt = cnt + 1;
	}
	
	/*if(cnt > 1)
	{
		ComShowCodeMessage("COM0254");
		return
	}*/
	
//	if ($('input[name="chOption1"]').is(":checked") || $('input[name="chOption2"]').is(":checked") || $('input[name="chOption3"]').is(":checked")) 
	if ($('input[name="chOption1"]').is(":checked") || $('input[name="chOption3"]').is(":checked") || $('input[name="chOption5"]').is(":checked")) 
	{
		printPrintOption();
	}
/*	else if($('input[name="chOption4"]').is(":checked"))
	{
		printLabelOption();
	}*/
}

function printPrintOption()
{
	var wib_bk_no = ComGetObjValue(frm.wib_bk_no);	
	if (ComIsEmpty(wib_bk_no)) {
		ComShowCodeMessage("COM0015"); // Booking No does not exist.
		return;
	}		
	var fileName = "";
	var param= "";
	var mrd_size="";
	frm.title.value="Inbound Report";
	//Inbound Work Sheet
	if(frm.chOption1.checked) 
	{
		fileName +="^@@^" + 'WH_IN_WORK_SHT.mrd' ;
		param += "^@@^" +"[" + frm.wib_bk_no.value + "]" ; //파라메타 입력

		//LKH::#1939 [BINEX WMS4.0] PDF EXPORTED FILE NAME
		frm.rpt_file_name_title.value ="";
		if(frm.file_name_title.value != null && frm.file_name_title.value != ''){
			frm.rpt_file_name_title.value = "IN_WORKSHT_" + frm.file_name_title.value; 
		}
	}
	//Inbound OS&D Sheet
	if(frm.chOption2.checked) 
	{
		fileName +="^@@^" + 'WH_IN_OSD_SHT.mrd' ;
		param += "^@@^" +"[" + frm.wib_bk_no.value + "]" ; //파라메타 입력
	}

	
	
	//Warehouse Reciept
	if(frm.chOption5.checked) 
	{
		fileName +="^@@^" + 'WH_IN_WH_REC_SHT.mrd' ;
		param += "^@@^" +"[" + frm.wib_bk_no.value + "]" ; //파라메타 입력
		
		//LKH::#1939 [BINEX WMS4.0] PDF EXPORTED FILE NAME
		frm.rpt_file_name_title.value ="";
		if(frm.file_name_title.value != null && frm.file_name_title.value != ''){
			frm.rpt_file_name_title.value = "IN_WH_REC_" + frm.file_name_title.value; 
		}
	}
	
	//Work Sheet
	if(frm.chOption3.checked) 
	{
		fileName += "^@@^" +'WH_IN_PALLET_LABEL_SHT.mrd' ;
		param += "^@@^" +"[" + frm.wib_bk_no.value + "]" ; //파라메타 입력
		param += "["+ frm.option7_size.value +"]"; //[2] #6473 [Hanaro] Customized Inbound Pallet Label

		//LKH::#1939 [BINEX WMS4.0] PDF EXPORTED FILE NAME
		frm.rpt_file_name_title.value ="";
		if(frm.file_name_title.value != null && frm.file_name_title.value != ''){
			frm.rpt_file_name_title.value = "IN_PALLETLABEL_" + frm.file_name_title.value; 
		}
	}
	
	fileName = fileName.substring(4);
	param = param.substring(4);
	frm.file_name.value= fileName;
	frm.rd_param.value=param;
	popPOST(frm, 'RPT_RD_0030.clt', 'popTest', 1025, 740);
}

function printLabelOption()
{
	var wib_bk_no = ComGetObjValue(frm.wib_bk_no);
	var sum_bx_label_qty = eval($("#sum_bx_label_qty").val());
	if(sum_bx_label_qty <= 0)
	{
		ComShowCodeMessage("COM0185", "");
		return;
	}
	if($('input[name="chOption4"]').is(":checked"))
	{
		var fileName = "";
		var param= "";
		var mrd_size="";
		frm.title.value="Label Option Report";
		
		fileName = 'WH_IN_BOX_LABEL_ZEBRA_' + frm.box_lvl_opt.value + '.mrd' ;
		param = "[" + frm.wib_bk_no.value.slice(1,param.length-1) + "]" ; //파라메타 입력
		
		frm.file_name.value= fileName;
		frm.rd_param.value= param;
		popPOST(frm, 'RPT_RD_0010.clt', 'popTest', 1025, 740);
	}
}
//#6473 [Hanaro] Customized Inbound Pallet Label
var setUp_opt = "N";
function setUpOpt(reqVal){
	var formObj=document.form;
	  var doc=getAjaxMsgXML(reqVal);
	  if (doc[0]=="OK" && typeof doc[1] != "undefined" ){
		  setUp_opt=doc[1];
	  }
}