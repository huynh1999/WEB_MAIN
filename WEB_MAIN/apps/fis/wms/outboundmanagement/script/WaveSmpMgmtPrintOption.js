var comboObjects=new Array();
var comboCnt=0;
function loadPage() {
		
	initControl();
	// Print Size 세션값 세팅
	
	//option체크관련
	var allc_cnt_tot=eval($("#allc_cnt_tot").val());
	var lp_cnt_tot=eval($("#lp_cnt_tot").val());
	var callByScreen = $("#callByScreen").val();
	if(allc_cnt_tot <= 0)
	{
		$('#chOptPickShtByOrder').attr('disabled',true);
		$('#chOptPickShtByWave').attr('disabled',true);
		$('#chOptSortSht').attr('disabled',true);
		$('#chOptHOManifestShtByShipTo').attr('disabled',true);
		$('#chOptHOManifestShtByOrder').attr('disabled',true);
	}
	else
	{
		if(lp_cnt_tot<=0)
		{
			$('#chOptHOManifestShtByShipTo').attr('disabled',true);
			$('#chOptHOManifestShtByOrder').attr('disabled',true);
		}
	}
	if(callByScreen == 'ManualAllcCmplPopup'){
		$("#outboundWorkSheetTR").hide();
		$("#outboundHOManifestTR").hide();
		$("#goodsIssueTR").hide();
	}
}
 /**
  * Combo 기본 설정 
  * param : comboObj ==> 콤보오브젝트, comboNo ==> 콤보오브젝트 태그의 아이디에 붙인 일련번호
  * 콤보가 다수일 경우 콤보 수만큼 case를 추가하여 시트 초기화모듈을 구성한다 
  */ 
function initControl() {
	 axon_event.addListenerFormat('keypress', 'obj_keypress', document.getElementById("form"));
}
/*
 * Close
 */
function btn_Close(){
  ComClosePopup(); 
}
/*
 * Print
 */
function btn_Print(){
	if (!$('input[name="chOptWorkSht"]').is(":checked") 
	 && !$('input[name="chOptPickShtByOrder"]').is(":checked")
	 && !$('input[name="chOptPickShtByWave"]').is(":checked")
	 && !$('input[name="chOptHOManifestShtByShipTo"]').is(":checked")
	 && !$('input[name="chOptSortSht"]').is(":checked")
	 && !$('input[name="chOptHOManifestShtByOrder"]').is(":checked")
	 && !$('input[name="chOptGoodsIssue"]').is(":checked")
	) {
		ComShowCodeMessage("COM0538");
		return;
	}
	var formObj = document.form;
	var fileName = "";
	var param= "";
	
	var wave_no=$("#wave_no").val();
	//--프린트 생성
	//Outbound Work Sheet
	if($('input[name="chOptWorkSht"]').is(":checked")) 
	{
		formObj.title.value="Outbound Work Sheet Report";
		fileName += "^@@^" +'WH_OUT_WORK_SHT.mrd' ;
		param += "^@@^" + "[" + 'WAVE' + "]"+"[" +"'"+'X'+"'"+ "]"+"["+wave_no+"]"+"["+"'"+'X'+"'"+"]";
	}
	//GOODS ISSUE
	if($('input[name="chOptGoodsIssue"]').is(":checked")) 
	{
		formObj.title.value="Goods Issue Report";
		fileName += "^@@^"+ 'WH_OUT_GOODS_ISSUE.mrd' ;
		param += "^@@^" + "[" + 'WAVE' + "]"+"["+"]"+"[" + wave_no + "]"; 
	}
	//Picking Sheet
	if($('input[name="chOptPickShtByOrder"]').is(":checked")) 
	{
		formObj.title.value="Picking Sheet Report";
		fileName += "^@@^"+ 'WH_OUT_PICK_ORDER_SHT.mrd' ;
		param += "^@@^" + "[" + wave_no + "]" + "[N]" + "["+ $("#prn_lot_tp").val() + "]" + "["+ $("#user_id").val() + "]" + "["+ $("#pick_unit").val() + "]";
	}
	if($('input[name="chOptPickShtByWave"]').is(":checked")) 
	{
		formObj.title.value="Picking Sheet Report";
		fileName += "^@@^"+ 'WH_OUT_PICK_WAVE_SHT.mrd' ;
		param += "^@@^" + "[" + wave_no + "]" + "[N]" + "["+ $("#prn_lot_tp").val() + "]" + "["+ $("#user_id").val() + "]" + "["+ $("#pick_unit").val() + "]";
	}
	//Sorting Sheet
	if($('input[name="chOptSortSht"]').is(":checked")) 
	{
		formObj.title.value="Sorting Sheet Report";
		fileName += "^@@^"+ 'WH_OUT_SORT_SHT.mrd' ;
		param += "^@@^" + "[" + wave_no + "]" + "[N]" + "["+ $("#prn_lot_tp").val() + "]" + "["+ $("#user_id").val() + "]" + "["+ $("#pick_unit").val() + "]";
	}
	//Outbound H/O Manifest
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
	formObj.file_name.value= fileName;
	formObj.rd_param.value=param;
	popPOST(formObj, './RPT_RD_0030.clt', 'popTest', 1025, 740);
}
function doWork(srcName){
	/***** 탭당 시트가 2개 이상인 경우엔 추가 시트변수 지정하여 사용한 *****/
	/*******************************************************/
	var formObj=document.form;
	try {
//		var srcName=ComGetEvent("name");
//		var cal=new ComCalendar();
		switch(srcName) {
			case "PRINT":	
				btn_Print();
				break;
			case "CLOSE":
				btn_Close();
					break;
    } // end switch
	}catch(e) {
		if( e == "[object Error]") {
			//ComShowMessage(OBJECT_ERROR);
		} else {
			//ComShowMessage(e);
		}
	}
}
function pick_by_sku_onclick(obj)
{
	if($('input[name="chOptPickShtByWave"]').is(":checked")) 
	{
		$('#chOptSortSht').attr('checked',true);
	}
}
function pick_opt_change(div)
{
	if(div == "ORDER")
	{
		if($('input[name="chOptPickShtByOrder"]').is(":checked") && $('input[name="chOptPickShtByWave"]').is(":checked")) 
		{
			$('#chOptPickShtByWave').attr('checked',false);
		}
	}
	else
	{
		if($('input[name="chOptPickShtByOrder"]').is(":checked") && $('input[name="chOptPickShtByWave"]').is(":checked")) 
		{
			$('#chOptPickShtByOrder').attr('checked',false);
		}
	}
}
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
