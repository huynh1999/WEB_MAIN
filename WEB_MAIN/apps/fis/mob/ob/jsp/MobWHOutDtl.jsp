<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<!-- 공통 Header -->
<%@include file="./../../../../../../syscommon/header/CLTMobHeader.jsp"%>
<%
String wobBkNo = request.getParameter("wobBkNo");
String waveNo  = request.getParameter("waveNo");

//#2807 [BINEX WMS4.0] LOT04, LOT05 NICKNAME CUSTOMIZATION
String lotAlias = request.getParameter("lotAlias");
String lot4_alias = lotAlias.substring(0, lotAlias.indexOf("|"));
String lot5_alias = lotAlias.substring(lotAlias.indexOf("|")+1);
%>
<script type="text/javascript">
	$( document ).ready(function() {
		$("#totalQty").number( true);
		whoutDtlJS.selectPickingList();

		//#2137 [WMS4.0] [AIF FEEDBACK] MOBILE 개선사항
		$('#myModal').on('shown.bs.modal', function (e) {
			var tmpItem = whoutDtlJS.item[whoutDtlJS.itemIdx];

			if(tmpItem.picking_loc_req_flag == "Y") {
				$('#myModal > div > div > div.modal-body > form > table:nth-child(2) > tbody > tr:nth-child(2)').attr("style", "display: in-line");
			} else {
				$('#myModal > div > div > div.modal-body > form > table:nth-child(2) > tbody > tr:nth-child(2)').attr("style", "display: none");
			}

			if(tmpItem.picking_sku_req_flag == "Y") {
				$('#myModal > div > div > div.modal-body > form > table:nth-child(2) > tbody > tr:nth-child(3)').attr("style", "display: in-line");
			} else {
				$('#myModal > div > div > div.modal-body > form > table:nth-child(2) > tbody > tr:nth-child(3)').attr("style", "display: none");
			}

			if(tmpItem.allc_item_ea_qty == 0) {
				$('#itemAdd').attr("disabled", "disabled");
			} else {
				$('#itemAdd').removeAttr("disabled");
			}

			if(tmpItem.picking_loc_req_flag == "Y" || tmpItem.picking_sku_req_flag == "Y") {
				$('#myModal > div > div > div.modal-body > form > table:nth-child(2)').attr("style", "display: in-line; margin-top: 5px;");
				$('#itemPickedQty').attr("disabled", "disabled");
				$('#itemPickedQty').attr("readonly", true);
			} else {
				$('#myModal > div > div > div.modal-body > form > table:nth-child(2)').attr("style", "display: none");
				$('#itemPickedQty').removeAttr("disabled");
				$('#itemPickedQty').removeAttr("readonly");
			}
			
			if(tmpItem.picking_sku_req_flag == "Y" || tmpItem.picking_loc_req_flag == "Y") {
				$('#itemQty').val("1");
				$('#wh_loc_cd').focus();
			}
		});

		$(document).on("blur", ".pic-qty", function() {
			var inputId = $(this)[0].id;
			var item = whoutDtlJS.item[$(this)[0].id];
			var inputVal = Number(wmsCommonJS.removeComma($(this)[0].value));	//modify
			if(inputVal > Number(item.allc_item_ea_qty)){
				wmsCommonJS.wmsMobAlert({content : getLabel('MOB_OB_CHECK_PICK_CNT_MSG2')});
				$(this)[0].value = "";
				whoutDtlJS.item[inputId].pick_item_ea_qty = 0;
				whoutDtlJS.setTotalQty();	//add
				return;
			}

			whoutDtlJS.item[inputId].pick_item_ea_qty = inputVal; //modify wmsCommonJS.removeComma($(this)[0].value);
			if(whoutDtlJS.item[inputId].pick_item_ea_qty > 0){
				whoutDtlJS.item[inputId].ibflag = 'U';
			}else{
				whoutDtlJS.item[inputId].ibflag = 'R';
			}

			whoutDtlJS.setTotalQty();
		});

		$('#btComplete').click(function(){
			if(!picking(whoutDtlJS.item)){
				return;
			}
			//#1811 [WMS4.0]Item Code 특수문자 허용
			var sendData = encodeURIComponent(JSON.stringify(whoutDtlJS.item));
			if(whoutDtlJS.bkStsCd == "A"){
				ajaxSendPost(whoutDtlJS.completeResult, 'reqVal', '&goWhere=aj&bcKey=completePicking&walcNo='+whoutDtlJS.walcNo+'&wobBkNo='+whoutDtlJS.wobBkNo+'&data='+sendData, './GateServlet.gsl');
			}
		});

		$('#itemSave').click(function(){
			var p_item_index = $("#p_item_index").val();
			if(wmsCommonJS.removeComma($('#itemPickedQty').val()) > whoutDtlJS.item[p_item_index].allc_item_ea_qty){
				wmsCommonJS.wmsMobAlert({content : getLabel('MOB_OB_CHECK_PICK_CNT_MSG2')});
				$('#itemPickedQty').focus();
				return;
			}

			whoutDtlJS.item[p_item_index].pick_item_ea_qty = wmsCommonJS.removeComma($('#itemPickedQty').val());
			if(whoutDtlJS.item[p_item_index].pick_item_ea_qty > 0){
				whoutDtlJS.item[p_item_index].ibflag = 'U';
			}else{
				whoutDtlJS.item[p_item_index].ibflag = 'R';
			}
			$('#'+p_item_index).val($('#itemPickedQty').val());

			whoutDtlJS.setTotalQty();
			$('#myModal').modal('hide');
		});

		//#2137 [WMS4.0] [AIF FEEDBACK] MOBILE 개선사항 (S)
		$('input[type=number]').focus(function(){
			$(this).select();
		});

		$('#itemCd').keypress(function(e){
			if(e.keyCode == '13') {
				whoutDtlJS.validItem();
			} else {
				whoutDtlJS.nextFocus = "";
			}
		});

		$('#wh_loc_cd').keypress(function(e) {
			if(e.keyCode == '13') {
				if(whoutDtlJS.item[whoutDtlJS.itemIdx].picking_sku_req_flag == "Y") {
					$('#itemCd').focus();
				} else {
					whoutDtlJS.validItem();
				}
			} else {
				whoutDtlJS.nextFocus = "";
			}
		});

		//$.confirm 이후 Add 버튼으로 Focusing 되므로...
		$('#itemAdd').focus(function() {
			if(whoutDtlJS.nextFocus != "") {
				$(whoutDtlJS.nextFocus).val("");
				$(whoutDtlJS.nextFocus).focus();
				whoutDtlJS.nextFocus = "";
			} else {
				whoutDtlJS.nextFocus = "";
			}
		});

		$('#itemCd').focus(function() {
			if(whoutDtlJS.nextFocus != "" && whoutDtlJS.nextFocus != '#itemCd') {
				$(whoutDtlJS.nextFocus).val("");
				$(whoutDtlJS.nextFocus).focus();
				whoutDtlJS.nextFocus = "";
			}
		});

		$('#itemAdd').click(function(){
			whoutDtlJS.validItem();
		});
		//#2137 [WMS4.0] [AIF FEEDBACK] MOBILE 개선사항 (E)

		//#2888 [WMS4.0][Mobile]Picking 시 Serial# Scan & Validation 기능 추가 (S)
		$('#itemSerNo').keypress(function(e){
			if(e.keyCode == '13') {
				addQty();
			} else {
				whoutDtlJS.nextFocus = "";
			}
		});

		$('#btnSearch').click(function(){
			addQty();
		});

		addQty = function() {
			var tmpItemSerNo = $('#itemSerNo').val().trim();

			if(tmpItemSerNo == '') {
				wmsCommonJS.wmsMobAlert({content : 'Please input serial #.'});  //'Picking QTY cannot be greater than Allocated QTY.'
				whoutDtlJS.nextFocus = "#itemSerNo";
				return;
			}

			var tmpIdx = -1;

			for(var i=0; i<whoutDtlJS.item.length; i++) {
				if(tmpItemSerNo == whoutDtlJS.item[i].item_ser_no) {
					tmpIdx = i;
					break;
				}
			}

			if(tmpIdx > -1) {
				whoutDtlJS.setIdx(i);
				$('#myModal').modal("show");
			} else {
				wmsCommonJS.wmsMobAlert({content : getLabel('MOB_SRCH_RESULT_MSG2')});  //There is no matched serial#.
				whoutDtlJS.nextFocus = "#itemSerNo";
				$('#itemSerNo').val("");
			}
		};

		//메시지 출력 후 Search 버튼으로 Focusing 되므로...
		$('#btnSearch').focus(function() {
			if(whoutDtlJS.nextFocus != "") {
				$(whoutDtlJS.nextFocus).val("");
				$(whoutDtlJS.nextFocus).focus();
				whoutDtlJS.nextFocus = "";
			} else {
				whoutDtlJS.nextFocus = "";
			}
		});

		$('#itemSerNo').focus();
		//#2888 [WMS4.0][Mobile]Picking 시 Serial# Scan & Validation 기능 추가 (E)
	});

	function picking(pItem) {
		if(Number(wmsCommonJS.removeComma(whoutDtlJS.pickingInfo.qty)) < Number(wmsCommonJS.removeComma($(".totalQty")[0].innerHTML))){
			wmsCommonJS.wmsMobAlert({content : getLabel('MOB_OB_CHECK_PICK_CNT_MSG2')});  //'Picking QTY cannot be greater than Allocated QTY.'
			return false;
		}
		if(pItem.length < 1){
			wmsCommonJS.wmsMobAlert({content : getLabel('MOB_SRCH_RESULT_MSG1')});		//There is no data.
			return false;
		}

		var cnt = 0;
		var picked_cnt = 0;
		var not_picked_cnt = 0;

		$.each(pItem, function(index, value){
			//Alloc일경우만 Picking
			if(value.pickd_flg != "Y") {
				if(eval(value.pick_item_ea_qty) > 0) cnt++;
				if(value.picking_sku_req_flag == 'Y' || value.picking_loc_req_flag == 'Y') {
					if(eval(value.pick_item_ea_qty) == 0) {
						not_picked_cnt++;
					}
				}

			} else {
				picked_cnt ++;
			}
		});

		if(picked_cnt == pItem.length){
			//ComShowCodeMessage("COM0452");
			wmsCommonJS.wmsMobAlert({content : getLabel('MOB_OB_CHECK_PICK_CNT_MSG')}); //Picking was already completed
			return false;
		}

		if(cnt <= 0) {
			//ComShowCodeMessage("COM0771");
			wmsCommonJS.wmsMobAlert({content : getLabel('MOB_OB_INPUT_PICKING_QTY_MSG')});  //Please input “Picking QTY”.
			return false;
		}

		//picking_sku_req_flag == 'Y' 이거나 picking_loc_req_flag == 'Y' 인경우 pick_item_ea_qty 가 0 이면 저장되지 않도록
		if(not_picked_cnt > 0) {
			wmsCommonJS.wmsMobAlert({content : getLabel('MOB_OB_INPUT_PICKING_QTY_MSG')});  //Please input “Picking QTY”.
			return false;
		}

		return true;
	}

	var whoutDtlJS = {
		walcNo : "",
		ctrtNo : "",
		itemCd : "",
		itemPkgunit : "",
		selectUomData : "",
		pickingInfo : [],
		item : [],
		bkStsCd : "",
		wobBkNo : ('<%=wobBkNo%>' == 'null') ? '' : '<%=wobBkNo%>',
		waveNo : ('<%=waveNo%>' == 'null') ? '' : '<%=waveNo%>',
		lot4_alias : ('<%=lot4_alias%>' == 'null') ? '' : '<%=lot4_alias%>',	//#2807 [BINEX WMS4.0] LOT04, LOT05 NICKNAME CUSTOMIZATION
		lot5_alias : ('<%=lot5_alias%>' == 'null') ? '' : '<%=lot5_alias%>',	//#2807 [BINEX WMS4.0] LOT04, LOT05 NICKNAME CUSTOMIZATION
		itemIdx : 0,
		nextFocus : "",
		selectPickingList : function () {
			ajaxSendPost(whoutDtlJS.setPickingDtl, 'reqVal', '&goWhere=aj&bcKey=selectPickingList&wobBkNo='+whoutDtlJS.wobBkNo+'&wave_no='+whoutDtlJS.waveNo, './GateServlet.gsl');
		},
		setPickingDtl : function(rtnVal) {
			var returnVal = wmsCommonJS.ajaxRes(rtnVal);
			if(returnVal != false){
				if(returnVal.resultCode == "success"){
					whoutDtlJS.ctrtNo = returnVal.pickings[0].customerNo;
					whoutDtlJS.walcNo = returnVal.pickings[0].walcNo;
					whoutDtlJS.bkStsCd = returnVal.pickings[0].bkStsCd;
					$(".ord")[0].innerHTML = returnVal.pickings[0].orderNo;
					$(".ref")[0].innerHTML = returnVal.pickings[0].refNo;
					$(".bkStsNm")[0].innerHTML = returnVal.pickings[0].bkStsNm;
					$(".cust")[0].innerHTML = returnVal.pickings[0].customerNo;
					$(".shipTo")[0].innerHTML = returnVal.pickings[0].shipToNm;
					$(".totalQty")[0].innerHTML = $.commaSet(eval(returnVal.pickings[0].qty));
					$(".content").html("");
					$.each(returnVal.pickings[0].pickingItems2,function(index, value){
						whoutDtlJS.setPickingItem(index, value);
					});
					whoutDtlJS.pickingInfo = returnVal.pickings[0];
					whoutDtlJS.setTotalQty();
				}
			}
		},
		tempTr : $("<tr></tr>"),
		tempTd1 : $("<td></td>"),
		tempTd2 : $("<td style=\"text-align: left;\"></td>"),
		tempLink : $("<a href =\"javascript:whoutDtlJS.setIdx({});\"></a>"),
		tempDiv : $("<div class=\"col-xs-12 form-padding-0\">"),
		tempSpan : $("<span></span>"),
		//tempInput : $("<input id=\"{}\" type=\"number\" class=\"form-control number-only pic-qty\" style=\"text-align: right;\" placeholder=\"Qty\" value=\"\" maxlength=\"10\">"),
		tempInput : $("<input id=\"{}\" type=\"number\" class=\"form-control pic-qty\" style=\"text-align: right;\" placeholder=\"Qty\" value=\"\" maxlength=\"10\">"),
		setPickingItem : function (index, item) {
			var trTag = whoutDtlJS.tempTr.clone();
			var tdTag2 = whoutDtlJS.tempTd1.clone();
			var tdTag3 = whoutDtlJS.tempTd2.clone();
			var tdTag4 = whoutDtlJS.tempTd1.clone();
			var tdTag5 = whoutDtlJS.tempTd1.clone();
			var tdTag6 = whoutDtlJS.tempTd1.clone();
			var link = whoutDtlJS.tempLink.clone();
			var div = whoutDtlJS.tempDiv.clone();
			var input = whoutDtlJS.tempInput.clone();
			var span1 = whoutDtlJS.tempSpan.clone();
			var span2 = whoutDtlJS.tempSpan.clone();
			var span3 = whoutDtlJS.tempSpan.clone();
			var span4 = whoutDtlJS.tempSpan.clone();
			var span5 = whoutDtlJS.tempSpan.clone();
			var span6 = whoutDtlJS.tempSpan.clone();

			/* 일단 주석처리 : 
			link.append(item.item_cd + " : " + item.item_nm);
			link[0].href = link[0].href.replaceAll("{}", index);
			tdTag2.append(link);
			*/

			// modal link.
			//#2137 [WMS4.0] [AIF FEEDBACK] MOBILE 개선사항
			//#2888 [WMS4.0][Mobile]Picking 시 Serial# Scan & Validation 기능 추가
			//PICKING_SERIAL_SCAN_REQ_FLAG == 'Y' 인 경우 Barcode Scan을 통해서만 Picking 수량 증가되도록
			if(item.picking_serial_scan_req_flag != 'Y') {
				tdTag2[0].setAttribute('data-toggle', 'modal');
				tdTag2[0].setAttribute('data-target', '#myModal')
				tdTag2[0].setAttribute('style', 'color: #337ab7; text-decoration: underline');
				tdTag2[0].setAttribute('onClick', 'javascript:whoutDtlJS.setIdx(\"'+index+'\");');
			}
			tdTag2.append(item.item_cd + " : " + item.item_nm);
			tdTag3.append("Item&nbsp;Lot&nbsp;:&nbsp;");
			span1.append(clt.util.nvl(item.lot_no, "")+"<br>");
			tdTag3.append(span1);
			tdTag3.append(whoutDtlJS.lot4_alias + "&nbsp;:&nbsp;");
			span2.append(clt.util.nvl(item.lot_04, "")+"<br>");
			tdTag3.append(span2);
			tdTag3.append(whoutDtlJS.lot5_alias + "&nbsp;:&nbsp;");
			span3.append(clt.util.nvl(item.lot_05, "")+"<br>");
			tdTag3.append(span3);

			tdTag3.append("Loc&nbsp;:&nbsp;");
			//span4.append((item.wh_loc_cd_nm, "") == undefined) ? "" : item.wh_loc_cd_nm ).append("<br>");
			span4.append(clt.util.nvl(item.wh_loc_cd_nm, "")).append("<br>");
			tdTag3.append(span4);
			tdTag3.append("LP#&nbsp;:&nbsp;");
			span5.append(clt.util.nvl(item.lic_plat_no, "")+"<br>");
			tdTag3.append(span5);
			tdTag3.append("Serial#&nbsp;:&nbsp;");
			span6.append(clt.util.nvl(item.item_ser_no, "")+"<br>");
			tdTag3.append(span6);

			tdTag4.append("Qty&nbsp;:&nbsp;");
			tdTag4.append($.commaSet(item.allc_item_ea_qty) +"<br>");

			//tdTag2[0].setAttribute('class', 'col-xs-4');
			//tdTag3[0].setAttribute('class', 'col-xs-5');
			//tdTag4[0].setAttribute('class', 'col-xs-3');
			input[0].id = input[0].id.replaceAll("{}", index);

			//#2137 [WMS4.0] [AIF FEEDBACK] MOBILE 개선사항 (S)
			//주석처리
			//item.pick_item_ea_qty = item.allc_item_ea_qty;

			//if(item.pick_item_ea_qty > 0){
			if(item.allc_item_ea_qty > 0){
				item.ibflag = 'U';
			}else{
				item.ibflag = 'R';
			}

			if(item.picking_sku_req_flag == 'Y' || item.picking_loc_req_flag == 'Y' || item.picking_serial_scan_req_flag == 'Y') {
				input[0].value = 0;
				//input[0].attr("disabled", "disabled");
				input[0].disabled = "disabled";
				item.pick_item_ea_qty = 0;  //For calcurate total quantity.
			} else {
				item.pick_item_ea_qty = item.allc_item_ea_qty;  //For calcurate total quantity.
				input[0].value = $.commaSet(eval(item.pick_item_ea_qty));
			}
			//#2137 [WMS4.0] [AIF FEEDBACK] MOBILE 개선사항 (E)

			input[0].readOnly = true;
			if(item.bk_sts_cd=="LP"){
				input[0].readOnly = true;
			}else if(eval(item.allc_sum_ea_qty) > 0){
				if(item.pickd_flg != "Y" ){
					input[0].readOnly = false;
				}
			}

			div.append(input[0]);
			tdTag4.append("P-Qty&nbsp;:&nbsp;");
			tdTag4.append(div);

			trTag.append(tdTag2);
			trTag.append(tdTag3);
			trTag.append(tdTag4);

			$(".content").append(trTag[0]);
			whoutDtlJS.item.push(item);
		},
		setIdx : function(idx){
			whoutDtlJS.reSetPop();

			// itemIdx 값 셋팅
			whoutDtlJS.itemIdx = idx;
			var item = whoutDtlJS.item[whoutDtlJS.itemIdx];

			//#2137 [WMS4.0] [AIF FEEDBACK] MOBILE 개선사항
			whoutDtlJS.itemCd = item.item_cd;
			// itemPkgunit 값 셋팅
			whoutDtlJS.itemPkgunit = item.item_pkgunit;
			whoutDtlJS.selectUOMInfo();

			$(".itemOrd")[0].innerHTML = $(".ord")[0].innerHTML + " / " + (idx+1);
			$(".itemSku")[0].innerHTML = item.item_cd;
			$(".itemDesc")[0].innerHTML = item.item_nm;
			$(".itemLot")[0].innerHTML = (item.lot_no == undefined) ? "" : item.lot_no;
			$(".itemLot4")[0].innerHTML = item.lot_04;
			$(".itemLot5")[0].innerHTML = item.lot_05;
			$(".itemFromLoc")[0].innerHTML = (item.wh_loc_cd_nm == undefined) ? "" : item.wh_loc_cd_nm;
			$(".itemLp")[0].innerHTML = (clt.util.nvl(item.lic_plat_no, "") == "" ? "" : item.lic_plat_no) + " / " + (clt.util.nvl(item.item_ser_no, "") == "" ? "" : item.item_ser_no);
			//$(".itemAllocTotalQty")[0].innerHTML = item.allc_item_ea_qty;
			$("#itemAllocTotalQty").val($.commaSet(eval(item.allc_item_ea_qty)));

			//#2137 [WMS4.0] [AIF FEEDBACK] MOBILE 개선사항 (S)
			//$("#itemQty").val(item.allc_item_ea_qty);
			$("#itemPickedQty").val(item.pick_item_ea_qty);
			$("#wh_loc_cd").val("");
			$("#itemCd").val("");
			//#2137 [WMS4.0] [AIF FEEDBACK] MOBILE 개선사항 (E)

			$("#itemQty").prop("readonly", true);
			if(item.bk_sts_cd=="LP"){
				$("#itemQty").prop("readonly", true);
			}else if(eval(item.allc_sum_ea_qty) > 0){
				if(item.pickd_flg != "Y" ){
					$("#itemQty").prop("readonly", false);
				}
			}

			//$("#totalQty").val(item.itemEaQty);
			$("#itemAllocTotalQty").number( true);
			$("#p_item_index").val(idx);

			//$('#myModal').modal("show");
		},

		reSetPop : function(){
			$(".itemOrd")[0].innerHTML = "";
			$(".itemSku")[0].innerHTML = "";
			$(".itemDesc")[0].innerHTML = "";
			$(".itemLot")[0].innerHTML = "";
			$(".itemLot4")[0].innerHTML = "";
			$(".itemLot5")[0].innerHTML = "";
			$(".itemFromLoc")[0].innerHTML = "";
			$(".itemLp")[0].innerHTML = "";
			$("#itemAllocTotalQty").val("");
			$("#itemQty").val("");
			//$("#totalQty").val("");
			$("#p_item_index").val("");
		},
		//#2137 [WMS4.0] [AIF FEEDBACK] MOBILE 개선사항 (S)
		selectUOMInfo : function (itemCd) {
			ajaxSendPost(whoutDtlJS.setUomInfo, 'reqVal', '&goWhere=aj&bcKey=selectUOMInfo&itemCd='+encodeURIComponent(whoutDtlJS.itemCd)+'&ctrtNo='+whoutDtlJS.ctrtNo, './GateServlet.gsl');
		},
		//#2137 [WMS4.0] [AIF FEEDBACK] MOBILE 개선사항 (E)
		setUomInfo : function(rtnVal){
			var returnVal = wmsCommonJS.ajaxRes(rtnVal)
			if(returnVal != false){
				if(returnVal.resultCode == "success"){
					var uomList = [];
					uomList.push(new Array(returnVal.pkgLv1Qty, returnVal.pkgLv1UnitCd, returnVal.pkgLv1UnitNm));
					uomList.push(new Array(returnVal.itemPkgbaseqty, returnVal.itemPkgunit, returnVal.itemPkgunitNm));
					uomList.push(new Array(returnVal.pkgLv3Qty, returnVal.pkgLv3UnitCd, returnVal.pkgLv3UnitNm));
					// Uom 초기화
					var optionLength = $("#uom option").length - 1;
					$.each($("#uom option"), function(idx, item){
						$("#uom option:eq("+ (optionLength - idx)+")").remove();
					});
					// Uom 초기화 값 셋팅
					$("#uom").append("<option value=''>UOM</option>");
					$.each(uomList,function(index, value){
						var selectVal = "";
						if(whoutDtlJS.itemPkgunit == value[1]){
							selectVal = "selected";
						}
						if(value[0]){
							$("#uom").append("<option value='"+value[0]+"' "+selectVal+">"+value[1] +" : " + value[2] + "</option>");
						}
					});
				}
			}
		},
		setTotalQty : function(){
			//var uomQty = $("#uom option:selected").val();
			//var qty = $("#itemQty").val();
			//$("#totalQty").val(qty * uomQty);
			var sumQty =0;
			$.each(whoutDtlJS.item,function(index, value){
				//sumQty += eval(whoutDtlJS.item[index].allc_item_ea_qty);
				sumQty += eval(whoutDtlJS.item[index].pick_item_ea_qty);
			});

			$(".totalQty")[0].innerHTML = $.commaSet(sumQty);
		},
		completeResult : function(rtnVal){
			var returnVal = wmsCommonJS.ajaxRes(rtnVal);

			if(returnVal != false){
				if(returnVal.resultCode == "success"){
					whoutDtlJS.bkStsCd = "P"
					$(".bkStsNm")[0].innerHTML = "Picked";
					wmsCommonJS.wmsMobAlert({content : getLabel('MOB_CMM_CMPL_MSG'), page:'back'});
				}else{
					wmsCommonJS.wmsMobAlert({content : getLabel('MOB_CMM_FAIL_MSG')});
				}
				//$.historyBack();
			}else{
				wmsCommonJS.wmsMobAlert({content : getLabel('MOB_CMM_FAIL_MSG')});
			}
		},
		validItem : function(){
			whoutDtlJS.nextFocus = "";
			var tmpItem = whoutDtlJS.item[whoutDtlJS.itemIdx];
			if(clt.util.nvl($('#uom').attr("disabled"), "") != "disabled" && $('#uom option:selected').val() == "") {
				wmsCommonJS.wmsMobAlert({content : getLabel('MOB_OB_CHECK_UOM_MSG')});  //'Please select “UOM”.'
				return false;
			}

			if(tmpItem.picking_loc_req_flag == "Y" && $('#wh_loc_cd').val() != tmpItem.wh_loc_cd_nm) {
				wmsCommonJS.wmsMobAlert({content : getLabel('MOB_OB_INVALID_LOC_MSG')});  //'Invalid “Location”.'
				$('#wh_loc_cd').val("");
				$('#wh_loc_cd').focus();
				whoutDtlJS.nextFocus = '#wh_loc_cd';
				return false;
			}

			if(tmpItem.picking_sku_req_flag == "Y" && $('#itemCd').val() != tmpItem.item_cd) {
				wmsCommonJS.wmsMobAlert({content : getLabel('MOB_OB_INVALID_SKU_MSG')});  //'Invalid “SKU”.'
				$('#itemCd').val("");
				whoutDtlJS.nextFocus = '#itemCd';
				return false;
			}

			whoutDtlJS.selectUomData = $("#uom option:selected").val();
			if(clt.util.nvl(whoutDtlJS.selectUomData, "") != "") {
				var pickedQty = Number(clt.util.nvl($("#itemPickedQty").val(), "0"));
				var pickingQty = Number(clt.util.nvl($("#itemQty").val(), "0"));
				var uomQty = whoutDtlJS.selectUomData;
				var allocTotalQty = Number(clt.util.nvl($("#itemAllocTotalQty").val(), "0"));

				if(allocTotalQty < (pickingQty * uomQty + pickedQty)) {
					alert("Please check picked Q'ty.");
				} else {
					$("#itemPickedQty").val(pickingQty * uomQty + pickedQty);
					$('#itemCd').val("");
				}
			} else {
				$("#itemPickedQty").val("0");
			}
		}
	}

</script>
<div class="well">
	<table class="table panel panel-default">
		<tbody>
			<tr>
				<td class="info width-120">Order #</td>
				<td class="ord" colspan="2">ORD-01</td>
			</tr>
			<tr>
				<td class="info width-120">Status</td>
				<td class="bkStsNm" colspan="2"></td>
			</tr>
			<tr>
				<td class="info width-120">Reference #</td>
				<td class="ref" colspan="2">REF-2</td>
			</tr>
			<tr>
				<td class="info width-120">Customer</td>
				<td class="cust" colspan="2">SDKANG</td>
			</tr>
			<tr>
				<td class="info width-120">Ship To</td>
				<td class="shipTo" colspan="2">CASTOP</td>
			</tr>
			<tr>
				<td class="info width-120">Total Qty</td>
				<td class="totalQty" colspan="2" style="text-align: right;">2,000</td>
			</tr>
			<tr>
				<td class="info width-120">Scan Serial #</td>
				<td class="serialNo">
					<input type="text" id="itemSerNo" name="itemSerNo" class="form-control" placeholder="Serial #" />
				</td>
				<td>
					<button id="btnSearch" type="button" class="btn btn-primary form-control">Search</button>
				</td>
			</tr>
		</tbody>
	</table>
	<div class="panel panel-default" >
		<!-- Default panel contents -->
		<div class="panel-heading">
			<span>Items</span>
		</div>
		<div style="overflow:auto; overflow-y:hidden;"></div>
		<table class="table panel panel-default" >
			<thead>
				<tr>
					<th>SKU</th>
					<th>Identifier</th>
					<th>Qty</th>
				</tr>
			</thead>
			<tbody class="content"/>
		</table>
	</div>
</div>
<div class="navbar-fixed-bottom">
	<div class="btn-group btn-group-justified" role="group" aria-label="...">
	  <div class="btn-group" role="group">
	    <button id="btComplete" type="button" class="btn btn-primary footer-button">Complete</button>
	  </div>
	</div>
</div>

<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title" id="myModalLabel">Order Line Detail</h4>
			</div>
			<div class="modal-body">
				<form class="form-horizontal">
					<table class="table panel panel-default" style="word-wrap: break-all;">
						<tbody>
							<tr>
								<td class="info width-120" style="width : 160px;">Order / Line</td>
								<td class="itemOrd">ORD-01 / 1</td>
							</tr>
							<tr>
								<td class="info width-120">SKU</td>
								<td class="itemSku">ITEM-EA-01</td>
							</tr>
							<tr>
								<td class="info width-120">Description</td>
								<td class="itemDesc">NEW ITEM 01</td>
							</tr>
							<tr>
								<td class="info width-120">Item Lot</td>
								<td class="itemLot">LOT</td>
							</tr>
							<tr>
								<td class="info width-120"><%=lot4_alias %></td>
								<td class="itemLot4">RED</td>
							</tr>
							<tr>
								<td class="info width-120"><%=lot5_alias %></td>
								<td class="itemLot5">LARGE</td>
							</tr>
							<tr>
								<td class="info width-120">From Loc.</td>
								<td class="itemFromLoc">CELL-001</td>
							</tr>
							<tr>
								<td class="info width-120">LP# / Serial #</td>
								<td class="itemLp">LP-23</td>
							</tr>
							<tr>
								<td class="info width-120">Picked / Allocated</td>
								<td>
									<span class="form-padding-0" style="width: 35%; float: left;">
										<input type="number" id="itemPickedQty" class="form-control" style="text-align: right;" readonly />
									</span>
									<span class="form-padding-0" style="float: left; margin-top: 8px;">&nbsp;/&nbsp;</span>
									<span class="form-padding-0" style="width: 35%; float: left;">
										<input type="number" id="itemAllocTotalQty" class="form-control" style="text-align: right;" readonly />
									</span>
								</td>
							</tr>
						</tbody>
					</table>
					<table class="table panel panel-default" style="margin-top: 5px;">
						<tbody>
							<tr>
								<td class="info">Picking Qty</td>
								<td>
									<div class="col-xs-3 form-padding-0">
										<input id="itemQty" type="number" class="form-control" style="text-align: right;" placeholder="Qty" maxlength="10" android:inputType="number">
										<input id="p_item_index" type="hidden">
									</div>
									<div class="col-xs-6 form-padding-0">
										<select id="uom" class="form-control" style="text-align: left; padding-right:6px; padding-left:6px;">
											<option>UOM</option>
										</select>
									</div>
									<div class="col-xs-2 form-padding-0">
										<button id="itemAdd" type="button" class="btn btn-warning">Add</button>
									</div>
								</td>
							</tr>
							<tr>
								<td class="info">Scan Location</td>
								<td>
									<input id="wh_loc_cd" type="text" class="form-control" style="text-align: left;" placeholder="Location">
								</td>
							</tr>
							<tr>
								<td class="info">Scan SKU</td>
								<td>
									<input id="itemCd" type="text" class="form-control" style="text-align: left; left;" placeholder="Item #">
								</td>
							</tr>
						</tbody>
					</table>
				</form>
			</div>
			<div class="modal-footer">
				<div class="btn-group btn-group-justified" role="group" aria-label="...">
					<div class="btn-group" role="group">
					  	<button type="button" style="width:50%" class="btn btn-default" data-dismiss="modal">Cancel</button>
						<button id="itemSave" type="button" style="width:50%" class="btn btn-primary">Save</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>