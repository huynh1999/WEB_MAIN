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
		whoutDtlJS.selectCtrtCode();
		
		$("#totalQty").number( true);
		$('#myModal').on('show.bs.modal', function (e) {
			// var item = whoutDtlJS.item[whoutDtlJS.itemIdx];
			// UOM Code 조회
			// ajaxSendPost(whoutDtlJS.setUomInfo, 'reqVal', '&goWhere=aj&bcKey=selectUOMInfo&itemCd='+item.itemCd+'&ctrtNo='+whoutDtlJS.ctrtNo, './GateServlet.gsl');
		});
		$('#itemQty').change(function(){
			//whoutDtlJS.setTotalQty();
		});
		$('#uom').change(function(){
			//whoutDtlJS.setTotalQty();
		});

		$(document).on("blur", ".shp-qty", function() {
			var item = whoutDtlJS.item[$(this)[0].id];

			whoutDtlJS.item[$(this)[0].id].ship_item_ea_qty = wmsCommonJS.removeComma($(this)[0].value);
			if(whoutDtlJS.item[$(this)[0].id].ship_item_ea_qty > 0){
				whoutDtlJS.item[$(this)[0].id].ibflag = 'U';
			}else{
				whoutDtlJS.item[$(this)[0].id].ibflag = 'R';
			}
			whoutDtlJS.setTotalQty();
		});
		$('#btComplete').click(function(){
			if(whoutDtlJS.bkStsCd == "P"){
				if($('#ob_date').val() != ""){
					if(!shipping(whoutDtlJS.item)){
						return false;
					}
					//#1811 [WMS4.0]Item Code 특수문자 허용
					var sendData = encodeURIComponent(JSON.stringify(whoutDtlJS.item));
					
					var obDate = $('#ob_date').val().split("-")[2] + $('#ob_date').val().split("-")[0] + $('#ob_date').val().split("-")[1];
					ajaxSendPost(whoutDtlJS.completeResult, 'reqVal', '&goWhere=aj&bcKey=completeShipping&waveNo='+whoutDtlJS.waveNo+'&obDate='+obDate+'&walcNo='+whoutDtlJS.walcNo+'&wobBkNo='+whoutDtlJS.wobBkNo+'&data='+sendData, './GateServlet.gsl');
				}else{
					wmsCommonJS.wmsMobAlert({content : getLabel('MOB_OB_DATE_CHECK_MSG')});
				}
			}
		});
		$('#ob_date').click(function(){
			$('#ob_date').datetimepicker('setEndDate', new Date());
		});
		$('#itemSave').click(function(){
			var p_item_index      = $("#p_item_index").val();
			
			//whoutDtlJS.item[whoutDtlJS.itemIdx].shippingQty = $('#itemQty').val();
			//$('#'+whoutDtlJS.itemIdx).val($('#itemQty').val());
			whoutDtlJS.item[p_item_index].ship_item_ea_qty = wmsCommonJS.removeComma($('#itemQty').val());
			if(whoutDtlJS.item[p_item_index].ship_item_ea_qty > 0){
				whoutDtlJS.item[p_item_index].ibflag = 'U';
			}else{
				whoutDtlJS.item[p_item_index].ibflag = 'R';
			}
			$('#'+p_item_index).val($('#itemQty').val());			
			
			whoutDtlJS.setTotalQty();
			$('#myModal').modal('hide');
		});
	});
	
	function shipping(pItem){
		//console.log(clt.util.trim(pItem[0].eq_tpsz_cd));
		//console.log($.trim(pItem[0].eq_tpsz_cd));
		if(pItem.length < 1){
			//ComShowCodeMessage("COM0185");
			wmsCommonJS.wmsMobAlert({content : getLabel('MOB_SRCH_RESULT_MSG1')});
			return false;
		}
		
		var cnt=0;
		var allc_cnt = 0;
		$.each(pItem,function(index, value){
			if(eval(pItem[index].ship_item_ea_qty) <= 0){
				cnt += 1;
			}
			
			allc_cnt += eval(pItem[index].allc_sum_ea_qty);
		});
		
		if(allc_cnt <= 0){
			//ComShowCodeMessage("COM0330"); 
			wmsCommonJS.wmsMobAlert({content : getLabel('MOB_OB_CHECK_ALLC_CNT_MSG')});
			return false;
		}
		if(cnt > 0){
			//ComShowCodeMessage("COM0278","Shipping Q'ty");
			wmsCommonJS.wmsMobAlert({content : getLabel('MOB_OB_CHECK_CNT_MSG')});
			return false;
		}
		
		
		
		var cnt = 0;
		//수량(Merge된 Picking수량의 첫번째 Row값을 저장하기위하여
		var allc_merge_key_arr = new Array();
		var pick_qty_arr = new Array();
		//split일경우 동일한 eq_tpsz, eq_no, outbound_dt에 등록되어있는지 체크.
		var eq_tpsz_cd_arr = new Array();
		//eq_tpsz, eq_no, outbound_dt 가 동일한데 trucker, dono, seal 정보가 다를경우 체크.
		var cargo_arr = new Array();
		var cargo_rst_arr = new Array();
		//이미 COMPLETE된 정보와 동일한 정보가 있는지 체크
		var comp_chk_arr_comp_rst = new Array();
		var comp_chk_arr_no_comp = new Array();
		var comp_chk_arr_no_comp_rst = new Array();
		//SHIPPING이 0일경우 메세지 처리체크
		var wob_bk_no_arr = new Array();
		var wob_bk_no_ship_arr = new Array();
		var outbound_dt_temp = "";
		$.each(pItem,function(index, value){  
			var dlv_ord_no = $.trim(pItem[index].dlv_ord_no);
			if(pItem[index].tro_flg == "Y"){
				dlv_ord_no = $.trim(pItem[index].dlv_ord_no_org);
			}
			//SHIP 수량이 0이상인경우만 체크
			if(pItem[index].bk_sts_cd != "LP" ){
					var outbound_dt = pItem[index].outbound_dt;
					outbound_dt_temp = outbound_dt;
					if($.trim(pItem[index].eq_no).length > 0 && $.trim(pItem[index].eq_tpsz_cd).length <= 0){
						//ComShowCodeMessage("COM0773");
						//sheetObj.SelectCell(i, prefix +  "eq_tpsz_cd");
						wmsCommonJS.wmsMobAlert({content : getLabel('MOB_OB_CHECK_CNTR_NO_MSG')});
						return false;
					}
					//split일경우 동일한 eq_tpsz_cd, eq_no, out_dt 가 동일한지 체크
					if(eq_tpsz_cd_arr.contains(pItem[index].allc_merge_key + "|" + $.trim(pItem[index].lp_no) + "|" + $.trim(pItem[index].eq_tpsz_cd) + "|" + $.trim(pItem[index].eq_no)  + "|" + outbound_dt) == false){
						eq_tpsz_cd_arr.push(pItem[index].allc_merge_key + "|" + $.trim(pItem[index].lp_no) + "|" + $.trim(pItem[index].eq_tpsz_cd) + "|" + $.trim(pItem[index].eq_no) + "|" + outbound_dt);
					}else{
						//ComShowCodeMessage("COM0442");
						//sheetObj.SelectCell(i, prefix +  "eq_tpsz_cd");
						wmsCommonJS.wmsMobAlert({content : getLabel('MOB_OB_CHECK_ITME_MSG')});
						return false;
					}
					if($.trim(pItem[index].eq_no) != ""){
						//eq_tpsz_cd, eq_no가 동일한테 trucker, dono, seal no가 다른지 체크
						if(cargo_arr.contains($.trim(pItem[index].eq_no) + "|" + outbound_dt) == false){
							cargo_arr.push($.trim(pItem[index].eq_no) + "|" + outbound_dt);
							cargo_rst_arr.push($.trim(pItem[index].eq_no) + "|" + outbound_dt
									           + "|" + $.trim(pItem[index].eq_tpsz_cd) + "#$#$" + $.trim(pItem[index].trucker_cd) + "#$#$" + $.trim(pItem[index].trucker_nm)
									           + "#$#$" + $.trim(pItem[index].seal_no) + "#$#$" + dlv_ord_no + "#$#$" + $.trim(pItem[index].lp_no));
							
						}else{
							var c_idx = cargo_arr.getidx($.trim(pItem[index].eq_no) + "|" + outbound_dt);
							var cargo_rst_arr_var = cargo_rst_arr[c_idx].split("|");
							var oth_info = cargo_rst_arr_var[2];
							if(oth_info != $.trim(pItem[index].eq_tpsz_cd) + "#$#$" + $.trim(pItem[index].trucker_cd) + "#$#$" + $.trim(pItem[index].trucker_nm)
									           + "#$#$" + $.trim(pItem[index].seal_no) + "#$#$" + dlv_ord_no + "#$#$" + $.trim(pItem[index].lp_no)){
								//ComShowCodeMessage("COM0449");
								//sheetObj.SelectCell(i, prefix +  "eq_tpsz_cd");
								wmsCommonJS.wmsMobAlert({content : getLabel('MOB_OB_CHECK_RES_MSG')});
								return false;
							}
						}
						//입력된 값이 Compete된 정보와 같은 경우
						if(comp_chk_arr_no_comp.contains($.trim(pItem[index].eq_tpsz_cd) + "|" + $.trim(pItem[index].eq_no) + "|" + outbound_dt) == false){
							comp_chk_arr_no_comp.push($.trim(pItem[index].eq_tpsz_cd) + "|" + $.trim(pItem[index].eq_no) + "|" + outbound_dt);
							comp_chk_arr_no_comp_rst.push($.trim(pItem[index].eq_tpsz_cd) + "|" + $.trim(pItem[index].eq_no) + "|" + outbound_dt + "|" + i);
						}
					}
				cnt++;
				// picking수량, shipping수량 체크위하여 데이터저장
				if(allc_merge_key_arr.contains(pItem[index].allc_merge_key) == false){
					allc_merge_key_arr.push(pItem[index].allc_merge_key);
					if(pItem[index].pickd_flg == "Y"){
						pick_qty_arr.push(pItem[index].allc_merge_key + "|" + pItem[index].pick_item_ea_qty + "|" + pItem[index].ship_item_ea_qty);
						
					}else{
						pick_qty_arr.push(pItem[index].allc_merge_key + "|" + pItem[index].allc_item_ea_qty + "|" + pItem[index].ship_item_ea_qty);
					}
				}else{
					var idx = allc_merge_key_arr.getidx(pItem[index].allc_merge_key);
					var pick_qty_val = pick_qty_arr[idx].split("|");
					var pick_qty_val_sum =eval(pick_qty_val[2]) +  eval(pItem[index].ship_item_ea_qty);
					pick_qty_arr[idx] = pick_qty_val[0] + "|" + pick_qty_val[1] + "|" + pick_qty_val_sum;
				}
				if(wob_bk_no_arr.contains(pItem[index].wob_bk_no) == false){
					wob_bk_no_arr.push(pItem[index].wob_bk_no);
					wob_bk_no_ship_arr.push(pItem[index].wob_bk_no + "|" + pItem[index].ship_item_ea_qty);
				}else{
					var idx = wob_bk_no_arr.getidx(pItem[index].wob_bk_no);
					var wob_bk_no_ship_val = wob_bk_no_ship_arr[idx].split("|");
					var wob_bk_no_ship_val_sum = eval(wob_bk_no_ship_val[1]) + eval(pItem[index].ship_item_ea_qty);
					wob_bk_no_ship_arr[idx] = wob_bk_no_ship_val[0] + "|" + wob_bk_no_ship_val_sum;
				}
			}else if(pItem[index].bk_sts_cd == "LP" && !pItem[index].eq_no == ""){
				//입력된 값이 Compete된 정보와 같은 경우
				if(comp_chk_arr_comp_rst.contains($.trim(pItem[index].eq_tpsz_cd) + "|" + $.trim(pItem[index].eq_no) + "|" + $.trim(pItem[index].outbound_dt)) == false){
					comp_chk_arr_comp_rst.push($.trim(pItem[index].eq_tpsz_cd) + "|" + $.trim(pItem[index].eq_no) + "|" + $.trim(pItem[index].outbound_dt));
				}
			}
		});
		
		
		if(cnt == 0){
			//ComShowCodeMessage("COM0454");
			wmsCommonJS.wmsMobAlert({content : getLabel('MOB_OB_CHECK_SHIP_CNT_MSG')});
			return false;
		}
		
		//입력된 값이 Compete된 정보와 같은 경우
		for(var i =0;  i<comp_chk_arr_comp_rst.length; i++){
			for(var m=0; m<comp_chk_arr_no_comp.length; m++){
				if(comp_chk_arr_comp_rst[i] == comp_chk_arr_no_comp[m]){
					var chk_row = comp_chk_arr_no_comp_rst[m].split("|");
					//ComShowCodeMessage("COM0448");
					//sheetObj.SelectCell(chk_row[3], prefix +  "eq_no");
					wmsCommonJS.wmsMobAlert({content : getLabel('MOB_OB_CHECK_ITEM_SAME_MSG')});
					return false;
				
				}
			}
		}
		//Shipping수량이 Picking수량보다 큰경우 체크
		for(var i =0;  i<pick_qty_arr.length; i++){
			var pick_qty_val = pick_qty_arr[i].split("|");
			var picked = eval(pick_qty_val[1]);
			var shipped = eval(pick_qty_val[2]);
			if(picked >= 0 && picked <shipped){
				/*
				var Row1 = sheetObj.FindText(prefix + "allc_merge_key", pick_qty_val[0], sheetObj.HeaderRows(), -1, true);
				ComShowCodeMessage("COM0450");
				if(Row1 >= 0){
					sheetObj.SelectCell(Row1, prefix +  "ship_item_ea_qty");
				}
				*/
				wmsCommonJS.wmsMobAlert({content : getLabel('MOB_OB_CHECK_SHIP_CNT_MSG2')});
				return false;
			}
		}
		//order에 Shipping수량이 모두 0인경우 체크
		$.each(pItem,function(index, value){   
			var shipped = eval(pItem[index].ship_item_ea_qty);
			if(shipped == 0){
				//ComShowCodeMessage("COM0453");
				wmsCommonJS.wmsMobAlert({content : getLabel('MOB_OB_CHECK_SHIP_CNT_MSG3')});
				return false; //break
			}
		});		
		

		return true;
	}	
	
	//contains 메소드 추가
	Array.prototype.contains = function(element) {
		for (var i = 0; i < this.length; i++) {
			if (this[i] == element) {
				return true;
			}
		}
		return false;
	};

	//getidx 메소드 추가
	Array.prototype.getidx = function(element) {
		for (var i = 0; i < this.length; i++) {
			if (this[i] == element) {
				return i;
			}
		}
		return -1;
	};	
	
	
	$(window).on('load', function(){
		var dateNow = new Date();
		$('#ob_date').datetimepicker({
			
			format: 'mm-dd-yyyy',
		    todayBtn:  1,
			autoclose: 1,
			todayHighlight: 1,
			startView: 2,
			minView: 2,
			forceParse: 0
		});
		//$('#ob_date').datetimepicker('update', new Date());
	});
	var whoutDtlJS = {
		item : [],	
		bkStsCd : "",
		wobBkNo : ('<%=wobBkNo%>' == 'null') ? '' : '<%=wobBkNo%>',
		waveNo : ('<%=waveNo%>' == 'null') ? '' : '<%=waveNo%>',
		lot4_alias : ('<%=lot4_alias%>' == 'null') ? '' : '<%=lot4_alias%>',	//#2807 [BINEX WMS4.0] LOT04, LOT05 NICKNAME CUSTOMIZATION
		lot5_alias : ('<%=lot5_alias%>' == 'null') ? '' : '<%=lot5_alias%>',	//#2807 [BINEX WMS4.0] LOT04, LOT05 NICKNAME CUSTOMIZATION
		itemIdx : '',
		walcNo : '',
		selectCtrtCode : function () {
			ajaxSendPost(whoutDtlJS.setPickingDtl, 'reqVal', '&goWhere=aj&bcKey=selectPickingList&wobBkNo='+whoutDtlJS.wobBkNo+'&wave_no='+whoutDtlJS.waveNo, './GateServlet.gsl');
		},
		setPickingDtl : function(rtnVal) {
			var returnVal = wmsCommonJS.ajaxRes(rtnVal)
			if(returnVal != false){
				if(returnVal.resultCode == "success"){
					//whoutDtlJS.waveNo = returnVal.pickings[0].waveNo;
					whoutDtlJS.walcNo = returnVal.pickings[0].walcNo;
					whoutDtlJS.bkStsCd = returnVal.pickings[0].bkStsCd;
					$(".ord")[0].innerHTML = returnVal.pickings[0].orderNo;
					$(".bkStsNm")[0].innerHTML = returnVal.pickings[0].bkStsNm;
					$(".ref")[0].innerHTML = returnVal.pickings[0].refNo;
					$(".cust")[0].innerHTML = returnVal.pickings[0].customerNo;
					$(".shipTo")[0].innerHTML = returnVal.pickings[0].shipToNm;
					$(".totalQty")[0].innerHTML = $.commaSet(eval(returnVal.pickings[0].shQty));
					$(".content").html("");
					$.each(returnVal.pickings[0].pickingItems2,function(index, value){
						whoutDtlJS.setShippingItem(index, value);
					});
					
					//whoutDtlJS.setTotalQty();
				}
			}
		},
		tempTr : $("<tr></tr>"), 
		tempTd1 : $("<td></td>"), 
		tempTd2 : $("<td style=\"text-align: left;\"></td>"),
		tempLink : $("<a href =\"javascript:whoutDtlJS.setIdx({});\"></a>"),
		tempDiv : $("<div class=\"col-xs-12 form-padding-0\">"),
		tempSpan : $("<span></span>"),
		tempInput : $("<input id=\"{}\" type=\"number\" class=\"form-control shp-qty number-only\" style=\"text-align: right;\" placeholder=\"Qty\" value=\"\" maxlength=\"10\">"),
		setShippingItem : function (index, item){
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
			
			link.append(item.item_cd + " : " + item.item_nm);
			link[0].href = link[0].href.replaceAll("{}", index);
			tdTag2.append(link);
			// modal link.
			tdTag2[0].setAttribute('data-toggle', 'modal');
			tdTag2[0].setAttribute('data-target', '#myModal')
			
			//tdTag3.append(item.item_pkgqty);
			tdTag3.append("Item&nbsp;Lot&nbsp;:&nbsp;");
			span1.append(item.lot_no+"<br>");
			tdTag3.append(span1);
			tdTag3.append(whoutDtlJS.lot4_alias+"&nbsp;:&nbsp;");
			span2.append(item.lot_04+"<br>");
			tdTag3.append(span2);
			tdTag3.append(whoutDtlJS.lot5_alias+"&nbsp;:&nbsp;");
			span3.append(item.lot_05+"<br>");
			tdTag3.append(span3);			
			
			tdTag3.append("Loc&nbsp;:&nbsp;");
			span4.append((item.wh_loc_cd_nm == undefined) ? "" : item.wh_loc_cd_nm ).append("<br>");
			tdTag3.append(span4);
			tdTag3.append("LP#&nbsp;:&nbsp;");
			span5.append(item.lic_plat_no+"<br>");
			tdTag3.append(span5);
			
			
			tdTag4.append("Qty&nbsp;:&nbsp;");
			tdTag4.append($.commaSet(eval(item.pick_item_ea_qty))  +"<br>");
			
			tdTag2[0].setAttribute('class', 'col-xs-4');
			tdTag3[0].setAttribute('class', 'col-xs-5');
			tdTag4[0].setAttribute('class', 'col-xs-3');
			input[0].id = input[0].id.replaceAll("{}", index);
			
			item.ship_item_ea_qty = item.pick_item_ea_qty;
			if(item.ship_item_ea_qty > 0){
				item.ibflag = 'U';
			}else{
				item.ibflag = 'R';
			}			
			input[0].value = $.commaSet(eval(item.ship_item_ea_qty));
			
			input[0].readOnly = true;
			if(item.bk_sts_cd=="LP"){
				input[0].readOnly = true;
			}else if(eval(item.allc_sum_ea_qty) > 0){
				input[0].readOnly = false;
			}			
			
			div.append(input[0]);
			tdTag4.append("P-Qty&nbsp;&nbsp;");
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
			// itemPkgunit 값 셋팅
			whoutDtlJS.itemPkgunit = item.itemPkgunit;
			$(".itemOrd")[0].innerHTML = $(".ord")[0].innerHTML + " / " + (idx+1);
			$(".itemSku")[0].innerHTML = item.item_cd;
			$(".itemDesc")[0].innerHTML = item.item_nm;
			$(".itemLot")[0].innerHTML = (item.lot_no == undefined) ? "" : item.lot_no;
			$(".itemLot4")[0].innerHTML = item.lot_04;
			$(".itemLot5")[0].innerHTML = item.lot_05;
			$(".itemLp")[0].innerHTML = (item.lic_plat_no == undefined) ? "" : item.lic_plat_no;
			$(".itemAllocTotalQty")[0].innerHTML = item.pick_item_ea_qty;
			$("#itemQty").val($.commaSet(eval(item.ship_item_ea_qty)));
			//$("#totalQty").val(item.ship_item_ea_qty);
			$("#itemAllocTotalQty").number( true);
			$("#p_item_index").val(idx);
			
			$("#itemQty").prop("readonly",true);
			if(item.bk_sts_cd=="LP"){
				$("#itemQty").prop("readonly",true);
			}else if(eval(item.allc_sum_ea_qty) > 0){
				$("#itemQty").prop("readonly",false);
			}			
			
		},
		
		reSetPop : function(){
			$(".itemOrd")[0].innerHTML = "";
			$(".itemSku")[0].innerHTML = "";
			$(".itemDesc")[0].innerHTML = "";
			$(".itemLot")[0].innerHTML = "";
			$(".itemLot4")[0].innerHTML = "";
			$(".itemLot5")[0].innerHTML = "";
			$(".itemLp")[0].innerHTML = "";
			$(".itemAllocTotalQty")[0].innerHTML = "";
			$("#itemQty").val("");
			//$("#totalQty").val("");
			$("#p_item_index").val("");			
		},
		
		setTotalQty : function(){
			//var uomQty = $("#uom option:selected").val();
			//var qty = $("#itemQty").val();
			//$("#totalQty").val(qty * uomQty);
			var sumQty =0;
			$.each(whoutDtlJS.item,function(index, value){
				//sumQty += eval(whoutDtlJS.item[index].allc_item_ea_qty);
				sumQty += eval(whoutDtlJS.item[index].ship_item_ea_qty);
			});
			
			$(".totalQty")[0].innerHTML = $.commaSet(sumQty);
		},		
		completeResult : function(rtnVal){
			var returnVal = wmsCommonJS.ajaxRes(rtnVal)
			if(returnVal != false){
				if(returnVal.resultCode == "success"){
					whoutDtlJS.bkStsCd = "X"
					$(".bkStsNm")[0].innerHTML = "Completed";
					wmsCommonJS.wmsMobAlert({content : getLabel('MOB_CMM_CMPL_MSG')});
					$.historyBack();
				}else{
					wmsCommonJS.wmsMobAlert({content : getLabel('MOB_CMM_FAIL_MSG')});
				}
			}else{
				wmsCommonJS.wmsMobAlert({content : getLabel('MOB_CMM_FAIL_MSG')});
			}
		}
	}

</script>
<div  class="well">
	<table class="table panel panel-default">
		<tbody>
			<tr>
				<td class="info width-120">Order #</td>
				<td class="ord">ORD-01</td>
			</tr>
			<tr>
				<td class="info width-120">Status</td>
				<td class="bkStsNm"></td>
			</tr>
			<tr>
				<td class="info width-120">Reference #</td>
				<td class="ref">REF-2</td>
			</tr>
			<tr>
				<td class="info width-120">Customer</td>
				<td class="cust">SDKANG</td>
			</tr>
			<tr>
				<td class="info width-120">Ship To</td>
				<td class="shipTo">CASTOP</td>
			</tr>
			<tr>
				<td class="info width-120">Total Qty</td>
				<td class="totalQty"  style="text-align: right;">2,000</td>
			</tr>
			<tr>
				<td class="info width-120">O/B Date</td>
				<td>
					<div class="input-group">
						<input id="ob_date" type="text" style="width:100%" class="form-control col-xs-4" placeholder="O/B Date" aria-describedby="sizing-addon" readonly><span class="input-group-addon" onClick="javascript:wmsCommonJS.removeFormVal('ob_date')"><span class="glyphicon glyphicon-remove"></span></span>
					</div>
				</td>
			</tr>
		</tbody>
	</table>
	
	<div class="panel panel-default">
		<!-- Default panel contents -->
		<div class="panel-heading">
			<span>Items</span>
		</div>
	<table class="table panel panel-default">
		<thead>
			<!--  tr>
				<th>#</th>
				<th>SKU</th>
				<th>Qty</th>
				<th>P-Qty</th>
				<th>Lot4</th>
				<th>Lot5</th>
			</tr -->
			<tr>
				<th>SKU</th>
				<th>Identifier</th>
				<th>Qty</th>
			</tr>			
		</thead>
		<tbody class="content">
		</tbody>
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
				<table class="table panel panel-default">
					<tbody>
						<tr>
							<td class="info width-120">Order / Line</td>
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
							<td class="info width-120">LP#</td>
							<td class="itemLp">LP-23</td>
						</tr>
						<tr>
							<td class="info width-120">Alloc. Qty</td>
							<td><span id="itemAllocTotalQty" class="itemAllocTotalQty number"></span></td>
						</tr>
					</tbody>
				</table>
				<div class="well">
					<div class="form-group form-margin-bottom">
						<label for="orderLineId" class="form-title">Shipping Qty</label>
		
						<div class="col-xs-3 form-padding-0">
							<input id="itemQty" type="number" class="form-control number-only" style="text-align: right;" placeholder="Qty" maxlength="10">
							<input id="p_item_index" type="hidden" class="form-control" style="text-align: right;" placeholder="Qty" maxlength="10">
						</div>
					</div>
				</div>
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
