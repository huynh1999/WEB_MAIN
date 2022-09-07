<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<!-- 공통 Header -->
<%@include file="./../../../../../../syscommon/header/CLTMobHeader.jsp"%>
<%
String wibBkNo = request.getParameter("wibBkNo");

//#2807 [BINEX WMS4.0] LOT04, LOT05 NICKNAME CUSTOMIZATION
String lotAlias = request.getParameter("lotAlias");
String lot4_alias = lotAlias.substring(0, lotAlias.indexOf("|"));
String lot5_alias = lotAlias.substring(lotAlias.indexOf("|")+1);
%>
<script type="text/javascript">

	$( document ).ready(function() {
		whIbDtlJS.selectCompleteDetail();
		$('#myModal').on('show.bs.modal', function (e) {
			if(e.target.id != "expDate"){
				$.each(whIbDtlJS.rcvItem, function(idx, item){
					whIbDtlJS.rcvItemTemp.push($.extend({}, item));
				});
				//whIbDtlJS.item.push($.extend({}, whIbDtlJS.item[0]));
				//whIbDtlJS.rcvItemTemp = whIbDtlJS.rcvItem;
				whIbDtlJS.setItemInfo();
				
				//#2010 [BINEX WMS4.0] ITEM LOT4,LOT5,Customer Order No 특수문자 처리
				axon_event.addListenerFormat('keyup', 'ComEditFormating', document.form);	//for CNTR
			}
			
		});

		$('#myModal').on('shown.bs.modal', function (e) {
			$('#rcvQty').focus();
		});

		$('#myModal').on('hidden.bs.modal', function (e) {
			whIbDtlJS.rcvItemTemp = [];
			
			//LP# AUTO 생성 후 ADD 하지 않고 CANCEL 한 경우 다시 Order Line Detail 상세 들어갈 경우 AUTO 버튼 비활성화 버그 수정
			$("#btAuto")[0].disabled = false;

			//whIbDtlJS.makeRcvItem();

			//#2327 [WMS4.0] MOBILE RECEIVING VALIDATION FOR PUTAWAY (S)
			$("#serial_no").html("<font color='#333'>Serial#</font>");
			$('#itemCd').val("");
			//#2327 [WMS4.0] MOBILE RECEIVING VALIDATION FOR PUTAWAY (E)
		});

		$('#lineListModal').on('show.bs.modal', function (e) {
			if(e.target.id != "expDate"){
				whIbDtlJS.setItemListInfo();
			}
		});

		$('#lineListModal').on('hidden.bs.modal', function (e) {
			if($('.modal:visible').length == 1){
				$('body').addClass('modal-open');
			}
		});

		$('#ibDate').click(function(){
			$('#ibDate').datetimepicker('setEndDate', new Date());
		});

		$('#itemSave').click(function(){
			
			whIbDtlJS.rcvItem = whIbDtlJS.rcvItemTemp;
			whIbDtlJS.rcvItemTemp = [];
			if(whIbDtlJS.rcvItem.length > 0){
				whIbDtlJS.rcvItemTotalQty(whIbDtlJS.rcvItem[0].idx);
			}
			//LKH::BINEX PDA 컨퍼런스 작업-LP# Cache 문제
			//whIbDtlJS.makeRcvItem();
			whIbDtlJS.makeRcvItem("");
			
		});

		//$.confirm 이후 Add 버튼으로 Focusing 되므로...
		$('#addRcvItem, #btSearch').focus(function() {
			if(whIbDtlJS.nextFocus != "") {
				$(whIbDtlJS.nextFocus).val("");
				$(whIbDtlJS.nextFocus).focus();
				whIbDtlJS.nextFocus = "";
			} else {
				whIbDtlJS.nextFocus = "";
			}
		});

		$('#rcvSerial, #itemCd').focus(function() {
			if(whIbDtlJS.nextFocus != "" && (whIbDtlJS.nextFocus != '#rcvSerial' && whIbDtlJS.nextFocus != '#itemCd')) {
				$(whIbDtlJS.nextFocus).val("");
				$(whIbDtlJS.nextFocus).focus();
				whIbDtlJS.nextFocus = "";
			} else {
				whIbDtlJS.nextFocus = "";
			}
		});

		$('#addRcvItem').click(function(){
			whIbDtlJS.addRcvItem();
		});

		$('#addRcvItemOk').click(function(){
			if(whIbDtlJS.addRcvItem()){
				
				whIbDtlJS.rcvItem = whIbDtlJS.rcvItemTemp;
				whIbDtlJS.rcvItemTemp = [];
				
				//LKH::BINEX PDA 컨퍼런스 작업-LP# Cache 문제
				//whIbDtlJS.makeRcvItem();
				whIbDtlJS.makeRcvItem("");
			}
			
		});

		$("#btComplete").click(function(){
			if(whIbDtlJS.checkRcvItem()){
				if(whIbDtlJS.status == "I"){
					whIbDtlJS.ibData[0].ibCmpItems = [];
					var ibDate = $("#ibDate").val().split("-")[2] + $('#ibDate').val().split("-")[0] + $('#ibDate').val().split("-")[1];
					whIbDtlJS.ibData[0].inbound_dt = ibDate;
					whIbDtlJS.ibData[0].rcvItem = whIbDtlJS.rcvItem;
					whIbDtlJS.ibData[0].ibCmpItems = whIbDtlJS.item;
					whIbDtlJS.ibData[0].inbound_pl_qty = whIbDtlJS.rcvItem.length;
					//#1811 [WMS4.0]Item Code 특수문자 허용
					var sendData = encodeURIComponent(JSON.stringify(whIbDtlJS.ibData));
					ajaxSendPost(whIbDtlJS.completeResult, 'reqVal', '&goWhere=aj&bcKey=inboundComplete&walcNo='+whIbDtlJS.wibBkNo+'&data='+sendData, './GateServlet.gsl');
				}else{
					$(location).attr('href', 'MobWHInSrch.clt')
				}
			}
		});

		$("#btAuto").unbind("click").bind("click",function(){
			$("#btAuto")[0].disabled = true;
			ajaxSendPost(whIbDtlJS.setLicPlatSeq, 'reqVal', '&goWhere=aj&bcKey=selectLicPlatSeq', './GateServlet.gsl');
		});

		$("#delRcvItem").click(function(){
			$.each($('input:checkbox[name="inlineCheckbox"]:checked'), function(idx, item){
				//LKH::BINEX PDA 컨퍼런스 작업-LP# Cache 문제 CASE 2
				//whIbDtlJS.rcvItemTemp.splice(whIbDtlJS.rcvItemTemp.indexOf(whIbDtlJS.rcvItemTemp[item.value]),1)
				var length = whIbDtlJS.rcvItemTemp.length;
				for (var i=0; i <= length; i++){
					if (whIbDtlJS.rcvItemTemp[i].itemKey == item.value){
						whIbDtlJS.rcvItemTemp.splice(i,1);
						break;						
					}
				}
			});
			
			//LKH::BINEX PDA 컨퍼런스 작업-LP# Cache 문제 CASE 2
			var unCheckIdx = 1
			$.each($('input:checkbox[name="inlineCheckbox"]'), function(idx, item){
				if(!this.checked){//checked 처리된 항목의 값

					if(unCheckIdx == 1){
						var length = whIbDtlJS.rcvItemTemp.length;
						for (var i=0; i <= length; i++){
							if (whIbDtlJS.rcvItemTemp[i].itemKey == item.value){
								whIbDtlJS.rcvItemTemp[i].flag = "U";
								break;						
							}
						}
					}
					unCheckIdx = unCheckIdx + 1;
					return false;
		        }
			});
			
			var rcvTotalQtyTemp = whIbDtlJS.setItemListInfo();
			
			$(".content tr:nth-child("+(Number(whIbDtlJS.itemIdx)+1)+") > td:nth-child(5)")[0].innerHTML = wmsCommonJS.numberWithCommas(rcvTotalQtyTemp);
			whIbDtlJS.totalRcvPkgqty = rcvTotalQtyTemp;
			whIbDtlJS.item[whIbDtlJS.itemIdx].rcvPkgqty = rcvTotalQtyTemp;
			$("#itemRecvQty").val(rcvTotalQtyTemp);
			
			//LKH::BINEX PDA 컨퍼런스 작업-LP# Cache 문제
			whIbDtlJS.rcvItem = whIbDtlJS.rcvItemTemp;
			//whIbDtlJS.rcvItemTemp = [];
			whIbDtlJS.makeRcvItem("LineListDel");
		});

		$("#okRcvItem").click(function(){
			$('#lineListModal').modal('hide');
		});

		/* event 를 필요한 필드에만 할당하기 위해 아래 코드를 사용하고 주석처리함.
		$(document).on("keydown", "input:text[enter]", function(key) {
			if(key.keyCode == 13){
				//LKH::BINEX PDA 컨퍼런스 작업-LP# Cache 문제 CASE 2
				if(key.target.attributes.enter.value == "true" && key.target.attributes.id.value == "rcvSerial"){
					whIbDtlJS.addRcvItem();
				}
			}
		}); */

		$('#rcvSerial').keypress(function (e) {
			if(e.keyCode == '13') {
				whIbDtlJS.addRcvItem();
			}
		});

		/* #2327 [WMS4.0] MOBILE RECEIVING VALIDATION FOR PUTAWAY (S) */
		$('#itemCd').keypress(function (event){
			if(event.keyCode == '13') {
				chkFunc();
			}
		});

		$('#btSearch').click(function(){
			chkFunc();
		});

		chkFunc = function() {
			var itemCdVal = $('#itemCd').val().trim();
			itemCdVal = itemCdVal.toUpperCase();
			if(itemCdVal == "") {
				wmsCommonJS.wmsMobAlert({content : getLabel('MOB_IB_DTL_DATA_CHECK_SKU_MSG'), focus : $('#itemCd')});
				whIbDtlJS.nextFocus = "#itemCd";
				return;
			}
			var tmpItem;
			var tmpItemQty;
			var tmpIndex = -1;
			$("tbody.content > tr").each(function(index, obj){
				tmpItem = "";
				tmpItemQty = "";
				$(obj).children().each(function(idx, obj2) {
					if(idx == 1) {
						tmpItem = $(obj2).html();
						tmpItem = tmpItem.split(":")[0].trim();
					}
					if(idx == 4) tmpItemQty = $(obj2).html();
				});
				//Recv.Qty 가 0인 line 우선 적용
				if(tmpItem == itemCdVal && tmpItemQty == '0') {
					tmpIndex = index;
					return false;	//Exit for each
				}
			});

			if(tmpIndex == -1) {
				wmsCommonJS.wmsMobAlert({content : getLabel('MOB_IB_DTL_UNFINDABLE_SKU_MSG') + itemCdVal});
				$('#itemCd').val("");
				whIbDtlJS.nextFocus = "#itemCd";
			} else {
				whIbDtlJS.setIdx(''+tmpIndex);
				$('#myModal').modal();
			}
		};

		//Validation location of Order Line Detail
		$('#rcvLocation').change(function(){
			whIbDtlJS.getLocation();
			$('#rcvLocation').focus();
		});

		//focus SKU
		$('#itemCd').focus();
		/* #2327 [WMS4.0] MOBILE RECEIVING VALIDATION FOR PUTAWAY (E) */

		$("#rcvLp").on("keypress", function(e){
			if(e.keyCode == '13') {
				$('#rcvSerial').focus();
			}
		});
	});

	$(window).on('load', function(){
		var dateNow = new Date();
		$('#ibDate').datetimepicker({
			format: 'mm-dd-yyyy',
			todayBtn:  1,
			autoclose: 1,
			todayHighlight: 1,
			startView: 2,
			minView: 2,
			forceParse: 0
		});
		$('#ibDate').datetimepicker('update', new Date());
		$('#expDate').datetimepicker({
			format: 'mm-dd-yyyy',
		    todayBtn:  1,
			autoclose: 1,
			todayHighlight: 1,
			startView: 2,
			minView: 2,
			forceParse: 0,
		});
	});
	//#1966 [WMS4.0] IE 모바일 Inboud Complete 화면에서 오류 status, => status : null,
	var whIbDtlJS = {
			totalItemEaQty: 0,
			totalRcvPkgqty: 0,
			totalRcvqty: 0,
			wibBkNo : ('<%=wibBkNo%>' == 'null') ? '' : '<%=wibBkNo%>',
			lot4_alias : ('<%=lot4_alias%>' == 'null') ? '' : '<%=lot4_alias%>',
			lot5_alias : ('<%=lot5_alias%>' == 'null') ? '' : '<%=lot5_alias%>',
			ibData : [],
			item : [],
			rcvItem : [],
			rcvItemTemp : [],
			ctrtNo : "",
			itemIdx : 0,
			itemPkgunit : "",
			skuData : [],
			uomData : [],
			selectUomData : {},
			status : null,
			//LKH::BINEX PDA 컨퍼런스 작업-LP# Cache 문제 CASE 2
			itemKey : 0,
			nextFocus : "",
			selectCompleteDetail : function () {
				var sendData = JSON.stringify({
					"wibBkNo":whIbDtlJS.wibBkNo
				});
				ajaxSendPost(whIbDtlJS.setIbCompleteDetail, 'reqVal', '&goWhere=aj&bcKey=selectInCompleteList&data='+sendData, './GateServlet.gsl');
			},
			setIbCompleteDetail : function(rtnVal) {
				var returnVal = wmsCommonJS.ajaxRes(rtnVal)
				if(returnVal != false){
					whIbDtlJS.ctrtNo = returnVal.ibCmpls[0].ctrtNo;
					//console.log(returnVal.ibCmpls);
					var inCmpInfo = returnVal.ibCmpls[0];
					$(".ord")[0].innerHTML = inCmpInfo.ordNo;
					$(".stsNm")[0].innerHTML = (inCmpInfo.bk_sts_cd == "I") ? "Booked" : "Received";   //#1950 WMS4.0 In/outBound Status 관리 개선
					whIbDtlJS.status = inCmpInfo.bk_sts_cd;
					$(".ref")[0].innerHTML = inCmpInfo.refNo;
					$(".ctrtNm")[0].innerHTML = inCmpInfo.ctrtNm;
					$(".content")[0].innerHTML = "";
					$.each(inCmpInfo.ibCmpItems,function(index, value){
						whIbDtlJS.setIbCompleteItem(index, value, true);
					});
					
					$(".ordQty")[0].innerHTML = wmsCommonJS.numberWithCommas(whIbDtlJS.totalItemEaQty);
					$(".recvQty")[0].innerHTML = wmsCommonJS.numberWithCommas(whIbDtlJS.totalRcvPkgqty);
					$(".ordS")[0].innerHTML = wmsCommonJS.numberWithCommas(Number(whIbDtlJS.totalItemEaQty) - Number(whIbDtlJS.totalRcvPkgqty));
					whIbDtlJS.ibData = returnVal.ibCmpls;
				}
			},
			tempTr : $("<tr></tr>"), 
			tempTd : $("<td></td>"),
			tempLink : $("<a href =\"javascript:whIbDtlJS.setIdx({});\"></a>"),
			tempSpan : $("<span></span>"),
			setIbCompleteItem : function (index, item, initi){
				var trTag = whIbDtlJS.tempTr.clone();
				var td1Tag = whIbDtlJS.tempTd.clone();
				var td2Tag = whIbDtlJS.tempTd.clone();
				var td3Tag = whIbDtlJS.tempTd.clone();
				var td4Tag = whIbDtlJS.tempTd.clone();
				var td5Tag = whIbDtlJS.tempTd.clone();
				// #2129 [BINEX WMS4.0] INBOUND COMPLETE CANCEL DELETES SAVED SERIAL #(#1882)
				var td6Tag = whIbDtlJS.tempTd.clone();
				var td7Tag = whIbDtlJS.tempTd.clone();
				var link = whIbDtlJS.tempLink.clone();
				var span1 = whIbDtlJS.tempSpan.clone();
				var span2 = whIbDtlJS.tempSpan.clone();
				var span3 = whIbDtlJS.tempSpan.clone();
				
				td1Tag.append(index+1);
				//td2Tag.append(link);
				// modal link.
				td2Tag[0].setAttribute('data-toggle', 'modal');
				td2Tag[0].setAttribute('data-target', '#myModal');
				td2Tag[0].setAttribute('style', 'color: #337ab7; text-decoration: underline');
				td2Tag[0].setAttribute('onClick', 'javascript:whIbDtlJS.setIdx(\"'+index+'\");');
				//#2327 [WMS4.0] MOBILE RECEIVING VALIDATION FOR PUTAWAY (S)
				td2Tag[0].setAttribute('item_ser_no', item.item_ser_no);
				td2Tag[0].setAttribute('serial_req_flag', item.serial_req_flag);
				td2Tag[0].setAttribute('serial_uniq_flag', item.serial_uniq_flag);
				//#2327 [WMS4.0] MOBILE RECEIVING VALIDATION FOR PUTAWAY (E)
				td2Tag.append(item.itemCd + " : " + item.itemNm);
				td3Tag.append("Item&nbsp;Lot&nbsp;:&nbsp;");
				span1.append(item.lotNo+"<br>");
				td3Tag.append(span1);
				td3Tag.append(whIbDtlJS.lot4_alias + "&nbsp;:&nbsp;");   /* #2807 [BINEX WMS4.0] LOT04, LOT05 NICKNAME CUSTOMIZATION */
				span2.append(item.lot04+"<br>");
				td3Tag.append(span2);
				td3Tag.append(whIbDtlJS.lot5_alias + "&nbsp;:&nbsp;");  /* #2807 [BINEX WMS4.0] LOT04, LOT05 NICKNAME CUSTOMIZATION */
				span3.append(item.lot05+"<br>");
				td3Tag.append(span3);
				
				td4Tag[0].setAttribute('style', 'text-align: right;');
				td4Tag.append(wmsCommonJS.numberWithCommas(item.itemEaQty));

				td5Tag[0].setAttribute('style', 'text-align: right;');
				td5Tag.append(wmsCommonJS.numberWithCommas(item.rcvPkgqty));
				
				// #2129 [BINEX WMS4.0] INBOUND COMPLETE CANCEL DELETES SAVED SERIAL #(#1882)
				td6Tag[0].setAttribute('style', 'text-align: right; display : none;');
				td6Tag.append(item.lic_plat_no);
				
				td7Tag[0].setAttribute('style', 'text-align: right; display : none;');
				td7Tag.append(item.item_ser_no);
				
				trTag.append(td1Tag);
				trTag.append(td2Tag);
				trTag.append(td3Tag);
				trTag.append(td4Tag);
				trTag.append(td5Tag);
				// #2129 [BINEX WMS4.0] INBOUND COMPLETE CANCEL DELETES SAVED SERIAL #(#1882)
				trTag.append(td6Tag);
				trTag.append(td7Tag);
				
				$(".content").append(trTag[0]);
				
				whIbDtlJS.totalItemEaQty += Number(item.itemEaQty);
				whIbDtlJS.totalRcvPkgqty += Number(item.rcvPkgqty);
				
				$(".recvQty")[0].innerHTML = wmsCommonJS.numberWithCommas(whIbDtlJS.totalRcvPkgqty);
				$(".ordQty")[0].innerHTML = wmsCommonJS.numberWithCommas(whIbDtlJS.totalItemEaQty);
				$(".ordS")[0].innerHTML = wmsCommonJS.numberWithCommas(Number(whIbDtlJS.totalItemEaQty) - Number(whIbDtlJS.totalRcvPkgqty));
				if(initi){
					whIbDtlJS.item.push(item);
				}
				
			},
			setIdx : function(idx){
				if(idx){
					whIbDtlJS.itemIdx = idx;
				}else{
					whIbDtlJS.itemIdx = "";
				}
			},
			setUomInfo : function(rtnVal){
				var returnVal = wmsCommonJS.ajaxRes(rtnVal)
				if(returnVal != false){
					if(returnVal.resultCode == "success"){
						whIbDtlJS.uomData = [];
						//console.log(returnVal);
						
						//LKH::BINEX PDA 컨퍼런스 작업-Order Line Detail ADD 시 UOM 단위가 Palletization(3LEVEL)인 경우 LP# 초기화
						whIbDtlJS.uomData.push(new Array(returnVal.pkgLv1Qty, returnVal.pkgLv1UnitCd, returnVal.pkgLv1UnitNm , 'Level1'));
						whIbDtlJS.uomData.push(new Array(returnVal.itemPkgbaseqty, returnVal.itemPkgunit, returnVal.itemPkgunitNm , 'Level2'));
						whIbDtlJS.uomData.push(new Array(returnVal.pkgLv3Qty, returnVal.pkgLv3UnitCd, returnVal.pkgLv3UnitNm , 'Level3'));
						//console.log(uomList);
						// Uom 초기화
						var optionLength = $("#uom option").length - 1;
						$.each($("#uom option"), function(idx, item){
							$("#uom option:eq("+ (optionLength - idx)+")").remove();
						});
						// Uom 초기화 값 셋팅 
						$("#uom").append("<option value=''>UOM</option>");
						$.each(whIbDtlJS.uomData,function(index, value){
							var selectVal = "";
							if(whIbDtlJS.itemPkgunit == value[1]){
								selectVal = "selected";
								whIbDtlJS.selectUomData = value;
							}
							if(value[0]){
								$("#uom").append("<option value='"+index+"' "+selectVal+">"+value[1] +" : " + value[2] + "</option>");
							}
						});
					}
				}
			},
			tempSelect : $("<select id='skuInfo' class='form-control' onchange='whIbDtlJS.skuChange();'></select>"), 
			skuSelectBox : "",
			setSKUInfo : function(rtnVal){
				var returnVal = wmsCommonJS.ajaxRes(rtnVal);
				var selectTag = whIbDtlJS.tempSelect.clone();
				whIbDtlJS.skuData = [];
				if(returnVal != false){
					if(returnVal.resultCode == "success"){
						selectTag.append("<option id='selectBoxsku' value=''>SKU</option>");
						$.each(returnVal.skuInfos,function(index, value){
							var selectVal = "";
							selectTag.append("<option value='"+index+"' "+selectVal+">"+value.item_cd +" : " + value.item_nm + "</option>");
							whIbDtlJS.skuData.push(value);
						});
					}
				}
				whIbDtlJS.skuSelectBox = selectTag;
			},
			setItemInfo : function(){
				// 변수 선언
				var itemNm = ""; 
				var lotNo = "";
				var lot04 = "";
				var lot05 = ""
				var itemEaQty = "";
				var rcvPkgqty = "";
				var expDate = "";
				// #2129 [BINEX WMS4.0] INBOUND COMPLETE CANCEL DELETES SAVED SERIAL #(#1882)
				var itemSerNo = "";
				var licPlatNo = "";
				
				// #2327 [WMS4.0] MOBILE RECEIVING VALIDATION FOR PUTAWAY
				var serialReqFlag = "";
				var serialUniqFlag = "";
				var itemCd = "";

				// 공통
				$(".itemOrd")[0].innerHTML = $(".ord")[0].innerHTML;
				whIbDtlJS.reSetItemInfo();

				// SKU 조회
				ajaxSendPost(whIbDtlJS.setSKUInfo, 'reqVal', '&goWhere=aj&bcKey=selectSKUInfo&ctrtNo='+whIbDtlJS.ctrtNo, './GateServlet.gsl');

				// 새로운 아이템 입력
				if(whIbDtlJS.itemIdx == ""){
					whIbDtlJS.itemPkgunit = "";
					
					var span = whIbDtlJS.tempSpan.clone();
					span[0].setAttribute('class', 'col-xs-12 form-padding-0');
					whIbDtlJS.skuSelectBox.appendTo(span);
					span.appendTo($(".itemSku")[0])
					
				}
				// 기존 아이템 
				else{
					var item = whIbDtlJS.item[whIbDtlJS.itemIdx];
					whIbDtlJS.itemPkgunit = item.itemPkgunit;

					$(".itemSku")[0].innerHTML = item.itemCd +" : " + item.itemNm;

					itemNm = item.itemNm; 
					lotNo = item.lotNo;
					lot04 = item.lot04;
					lot05 = item.lot05
					itemEaQty = item.itemEaQty;
					rcvPkgqty = item.rcvPkgqty;
					expDate = item.exp_dt;

					// #2129 [BINEX WMS4.0] INBOUND COMPLETE CANCEL DELETES SAVED SERIAL #(#1882)
					itemSerNo = item.item_ser_no;
					licPlatNo = item.lic_plat_no;
					
					// UOM Code 조회
					whIbDtlJS.selectUOMInfo(item.itemCd);

					//#2327 [WMS4.0] MOBILE RECEIVING VALIDATION FOR PUTAWAY (S)
					//Serial# font is red in case of SERIAL_REQ_FLAG is "Y"  
					if(item.serial_req_flag == 'Y') {
						$("#serial_no").html("<font color='#FF0000'>Serial#</font>");
					} else {
						$("#serial_no").html("<font color='#333'>Serial#</font>");
					}
					$('#serial_no').attr('item_cd', item.itemCd);
					$('#serial_no').attr('serial_req_flag', item.serial_req_flag);
					$('#serial_no').attr('serial_uniq_flag', item.serial_uniq_flag);
					//#2327 [WMS4.0] MOBILE RECEIVING VALIDATION FOR PUTAWAY (E)
				}

				var readOnlyVal = " readonly=\"readonly\" disabled";
				$(".itemDesc")[0].innerHTML = '<input id="itemDesc" type="text" class="form-control" placeholder="Description" value="'+itemNm+'"'+readOnlyVal+'>';
				readOnlyVal = (lotNo != "") ? " readonly=\"readonly\" disabled" : "";
				$(".itemLot")[0].innerHTML = '<input id="itemlotNo" type="text" class="form-control" style="ime-mode:disabled;text-transform:uppercase;" dataformat="engup" otherchar="'+WMS_OTHER_CHAR_JS_SCRIPT+'" placeholder="Item Lot" value="'+lotNo+'"'+readOnlyVal+'>';  //#2010 [BINEX WMS4.0] ITEM LOT4,LOT5,Customer Order No 특수문자 처리
				readOnlyVal = (lot04 != "") ? " readonly=\"readonly\" disabled" : "";
				$(".itemLot4")[0].innerHTML = '<input id="itemLot04" type="text" class="form-control" style="ime-mode:disabled;text-transform:uppercase;" dataformat="engup" otherchar="'+WMS_OTHER_CHAR_JS_SCRIPT+'" placeholder="Lot 4" value="'+lot04+'"'+readOnlyVal+'>';    //#2010 [BINEX WMS4.0] ITEM LOT4,LOT5,Customer Order No 특수문자 처리
				readOnlyVal = (lot05 != "") ? " readonly=\"readonly\" disabled" : "";					
				$(".itemLot5")[0].innerHTML = '<input id="itemLot05" type="text" class="form-control" style="ime-mode:disabled;text-transform:uppercase;" dataformat="engup" otherchar="'+WMS_OTHER_CHAR_JS_SCRIPT+'" placeholder="Lot 5" value="'+lot05+'"'+readOnlyVal+'>';    //#2010 [BINEX WMS4.0] ITEM LOT4,LOT5,Customer Order No 특수문자 처리
				readOnlyVal = (itemEaQty != "") ? " readonly=\"readonly\" disabled" : "";					
				$(".itemOrdQty")[0].innerHTML = '<input id="itemEstimated" type="number" class="form-control" style="text-align: right; padding-right:6px; padding-left:6px;" maxlength="6" placeholder="Estimated" value="'+itemEaQty+'"'+readOnlyVal+'>';
				readOnlyVal = " readonly=\"readonly\" disabled";				
				$(".itemRecvQty")[0].innerHTML = '<input id="itemRecvQty" type="text" class="form-control" style="text-align: right; padding-right:6px; padding-left:6px;" placeholder="Received" value="'+wmsCommonJS.numberWithCommas(rcvPkgqty)+'"'+readOnlyVal+'>';
				//$("#expDate").val(expDate);
				if(expDate != ""){
					var year = expDate.substring(0,4);
					var month = expDate.substring(6,4);
					var day = expDate.substring(8,6);
					var date = new Date(year + '-' + month + '-' + day);
					$('#expDate').datetimepicker('update', date);
					$('#expDate')[0].removeAttribute("style");
					$('#expDate').datetimepicker()[0].disabled = true;
					$('#delExpDate').removeAttr("onclick");
				}else{
					$('#expDate')[0].setAttribute('style', 'background-color: #fff');
					$('#expDate').datetimepicker()[0].disabled = false;
					$('#delExpDate')[0].setAttribute("onclick", "javascript:wmsCommonJS.removeFormVal('expDate')");				
				}
				// #2129 [BINEX WMS4.0] INBOUND COMPLETE CANCEL DELETES SAVED SERIAL #(#1882)
				$("#rcvSerial").val(itemSerNo);
				$("#rcvLp").val(licPlatNo);
			},
			reSetItemInfo : function() {
				$(".itemSku")[0].innerHTML = "";
				$(".itemDesc")[0].innerHTML = "";
				$(".itemLot")[0].innerHTML = "";
				$(".itemOrdQty")[0].innerHTML = "";
				$(".itemRecvQty")[0].innerHTML = "";
				
				$(".itemLot4")[0].innerHTML = "";
				$(".itemLot5")[0].innerHTML = "";
				$("#expDate").val("")
				// Received data 리셋
				$("#rcvQty").val("");
				$("#rcvTotalQty").val("");
				$("#itemRecvQty").val("");
				
				// #2129 [BINEX WMS4.0] INBOUND COMPLETE CANCEL DELETES SAVED SERIAL #(#1882)
				// Serial No, LP No 초기화
				$("#itemSerNo").val("");
				$("#licPlatNo").val("");
				
				// Uom 초기화
				var optionLength = $("#uom option").length - 1;
				$.each($("#uom option"), function(idx, item){
					$("#uom option:eq("+ (optionLength - idx)+")").remove();
				});
				$("#uom").append("<option value=''>UOM</option>");
				
				$("#rcvSerial").val("");
				$("#rcvLocation").val("QC");
				$("#rcvLp").val("");
			},
			skuChange : function() {
				var idx = $("#skuInfo option:selected").val();
				var item = whIbDtlJS.skuData[idx];
				
				$("#itemDesc").val(item.item_nm);
				
				// UOM Code 조회
				whIbDtlJS.selectUOMInfo(item.item_cd);
				
				//#2327 [WMS4.0] MOBILE RECEIVING VALIDATION FOR PUTAWAY (S)
				if(item.serial_req_flag == 'Y') {
					$("#serial_no").html("<font color='#F00'>Serial#</font>");
				} else {
					$("#serial_no").html("<font color='#333'>Serial#</font>");
				}
				$('#serial_no').attr('item_cd', item.item_cd);
				$('#serial_no').attr('serial_req_flag', item.serial_req_flag);
				$('#serial_no').attr('serial_uniq_flag', item.serial_uniq_flag);
				//#2327 [WMS4.0] MOBILE RECEIVING VALIDATION FOR PUTAWAY (E)
			},
			selectUOMInfo : function (itemCd) {
				//#1811 [WMS4.0]Item Code 특수문자 허용
				ajaxSendPost(whIbDtlJS.setUomInfo, 'reqVal', '&goWhere=aj&bcKey=selectUOMInfo&itemCd='+encodeURIComponent(itemCd)+'&ctrtNo='+whIbDtlJS.ctrtNo, './GateServlet.gsl');
			},
			uomChange : function () {
				whIbDtlJS.selectUomData = whIbDtlJS.uomData[$("#uom option:selected").val()];
				if(whIbDtlJS.selectUomData != undefined){
					var receivedQty = $("#rcvQty").val();
					var uomQty = whIbDtlJS.selectUomData[0];
					$("#rcvTotalQty").val(Number(receivedQty) * Number(uomQty));
				}else{
					$("#rcvTotalQty").val(0);
				}
				
				//console.log('[ZOOT LOG]-uom uomChange:selected Level:' + whIbDtlJS.selectUomData[3]);
			},
			addRcvItem : function(){
				if($("#skuInfo option:selected").val() == ""){
					wmsCommonJS.wmsMobAlert({content : getLabel('MOB_IB_DTL_DATA_CHECK_SKU_MSG')});
					whIbDtlJS.nextFocus = '#skuInfo';
					return;
				}
				if($("#uom option:selected").val() == ""){
					wmsCommonJS.wmsMobAlert({content : getLabel('MOB_IB_DTL_DATA_CHECK_UOM_MSG')});
					whIbDtlJS.nextFocus = '#uom';
					return;
				}

				//#2327 [WMS4.0] MOBILE RECEIVING VALIDATION FOR PUTAWAY (S)
				//item code 의 serial_req_flag 가 "Y" 인경우 처리
				if($('#serial_no').attr("serial_req_flag").trim() == "Y" && $('#rcvSerial').val().trim() == "") {
					wmsCommonJS.wmsMobAlert({content : getLabel('MOB_IB_DTL_SERIAL_MANDATORY_MSG')});
					whIbDtlJS.nextFocus = '#rcvSerial';
					return;
				}

				//item code 의 serial_uniq_flag 가 "Y" 인경우 처리
				if($('#serial_no').attr("serial_uniq_flag").trim() == "Y") {
					var tmpItem = $('#serial_no').attr("item_cd").trim();
					var tmpRcvSerial = $('#rcvSerial').val().trim();
					for(var i=0; i<whIbDtlJS.rcvItemTemp.length; i++) {
						if(whIbDtlJS.rcvItemTemp[i].item_cd == tmpItem) {
							if(whIbDtlJS.rcvItemTemp[i].rcvSerial.trim() != "" && whIbDtlJS.rcvItemTemp[i].rcvSerial.trim() == tmpRcvSerial) {
								wmsCommonJS.wmsMobAlert({content : getLabel('MOB_IB_DTL_SERIAL_DUPLICATED_MSG')});
								whIbDtlJS.nextFocus = '#rcvSerial';
								return;
							}
						}
					}
				}
				//#2327 [WMS4.0] MOBILE RECEIVING VALIDATION FOR PUTAWAY (E)

				if(whIbDtlJS.status != "I"){
					wmsCommonJS.wmsMobAlert({content : getLabel('MOB_CMM_CMPL_MSG')});
					$('#myModal').modal('hide');
				}else{
					if($("#rcvQty").val() != "" && Number($("#rcvQty").val()) > 0){
						var itemIdx = 0;
						if(whIbDtlJS.itemIdx != ""){
							itemIdx = whIbDtlJS.itemIdx;
						}
							
						var item = whIbDtlJS.item[itemIdx];
						var rcvLocation = ($("#rcvLocation").val() == "") ? "QC" : $("#rcvLocation").val();
						var sku = whIbDtlJS.skuData.filter(function(value){return (value.item_cd == item.itemCd)});
						var rcv = whIbDtlJS.rcvItemTemp.filter(function(value){
							return (value.idx == ((whIbDtlJS.itemIdx == "") ? whIbDtlJS.item.length : whIbDtlJS.itemIdx))
						});
						
						//LKH::BINEX PDA 컨퍼런스 작업-LP# Cache 문제 CASE 2
						whIbDtlJS.itemKey = whIbDtlJS.itemKey +1;
						var item = {
								"idx" : whIbDtlJS.itemIdx == "" ? whIbDtlJS.item.length : whIbDtlJS.itemIdx,
								"rcvQty" : $("#rcvQty").val(),
								"rcvPkgunit" : whIbDtlJS.uomData[$("#uom option:selected").val()][1],
								"rcvTotalQty" : $("#rcvTotalQty").val(),
								"rcvSerial" : $("#rcvSerial").val(),
								"rcvLocation" : rcvLocation,
								"rcvLp" : $("#rcvLp").val(),
								"cbm" : Number($("#rcvTotalQty").val()) * Number(sku[0].lv1_cbm),
								"cbf" : Number($("#rcvTotalQty").val()) * Number(sku[0].lv1_cbf),
								"grs_kgs" : Number($("#rcvTotalQty").val()) * Number(sku[0].lv1_grs_kgs),
								"grs_lbs" : Number($("#rcvTotalQty").val()) * Number(sku[0].lv1_grs_lbs),
								"net_kgs" : Number($("#rcvTotalQty").val()) * Number(sku[0].lv1_net_kgs),
								"net_lbs" : Number($("#rcvTotalQty").val()) * Number(sku[0].lv1_net_lbs),
								"os_item_ea_qty" : $("#rcvTotalQty").val(),
								"flag" : "I",
								"itemIdx" : rcv.length,
								//LKH::BINEX PDA 컨퍼런스 작업-LP# Cache 문제 CASE 2 
								"itemKey" : 'ItemKey:' + whIbDtlJS.itemKey

								//#2327 [WMS4.0] MOBILE RECEIVING VALIDATION FOR PUTAWAY (S)
								,"serial_req_flag" : $('#serial_no').attr('serial_req_flag')
								,"serial_uniq_flag" : $('#serial_no').attr('serial_uniq_flag')
								,"item_cd" : item.item_cd
								//#2327 [WMS4.0] MOBILE RECEIVING VALIDATION FOR PUTAWAY (E)
						}

						if(whIbDtlJS.itemIdx == ""){
							item.flag = "I";
						}else{
							if(rcv.length == 0){
								item.flag = "U";
							}else{
								item.flag = "I";
							}
						}

						if($("#rcvLocation").val() != ""){
							whIbDtlJS.getLocation();
							if(!whIbDtlJS.loctionFlag){
								return;
							}
						} else {
							wmsCommonJS.wmsMobAlert({content : getLabel('MOB_IB_DTL_LOCATION_CHECK_MSG')});		//Please Input Location.
							whIbDtlJS.nextFocus = '#rcvLocation';
							return;
						}

						item.item_ea_qty = $("#rcvTotalQty").val();
						whIbDtlJS.rcvItemTemp.push(item);
						itemIdx = whIbDtlJS.itemIdx == "" ? whIbDtlJS.item.length : whIbDtlJS.itemIdx;
					}else{
						wmsCommonJS.wmsMobAlert({content : getLabel('MOB_IB_DTL_DATA_CHECK_RECEIVED_QTY_MSG')});
						whIbDtlJS.nextFocus = '#rcvQty';
						return;
					}
					if($("#rcvSerial").val() != ""){
						$('#rcvSerial').focus();
					}
					// 입력 란 초기화
					//$("#rcvQty").val("");
					//$("#rcvTotalQty").val("");
					$("#rcvSerial").val("");
					//$("#rcvLocation").val("QC");
					//LKH::BINEX PDA 컨퍼런스 작업-Order Line Detail ADD 시 UOM 단위가 Palletization(3LEVEL)인 경우 LP# 초기화
					//console.log('[ZOOT LOG]-uom option:selected Level:' + whIbDtlJS.selectUomData[3]);
					if(whIbDtlJS.uomData[$("#uom option:selected").val()][3] == "Level3"){
						$("#rcvLp").val("");
					}
					//$("#rcvLp").val("");
					
					var totalQty = 0;
					$.each(whIbDtlJS.rcvItemTemp.filter(function(value){return (value.idx == itemIdx)}), function(idx, item){
						totalQty += Number(item.rcvTotalQty);
					});
					
					$("#itemRecvQty").val(wmsCommonJS.numberWithCommas(totalQty));
					
					$('#rcvSerial').focus();
					
					// Auto 버튼 활성화
					$("#btAuto")[0].disabled = false;
					return true; 
					//whIbDtlJS.rcvItemTotalQty(whIbDtlJS.itemIdx == "" ? whIbDtlJS.item.length : whIbDtlJS.itemIdx);
				}
			},
			loctionFlag : true,
			getLocation : function(){
				ajaxSendPost(whIbDtlJS.setLocation, 'reqVal', '&goWhere=aj&bcKey=selectGetLocation&wh_loc_nm='+$("#rcvLocation").val(), './GateServlet.gsl');			
			},
			setLocation : function(rtnVal){
				var returnVal = wmsCommonJS.ajaxRes(rtnVal)
				if(returnVal != false){
					if(returnVal.resultCode != "success"){
						
						wmsCommonJS.wmsMobAlert({content : getLabel('MOB_CMM_LOC_MSG'), focus: $('#toLocation')});
						whIbDtlJS.loctionFlag = false;
						return;
					}else{
						whIbDtlJS.loctionFlag = true;
					}
				}
			},
			rcvItemTotalQty : function(itemIdx){
				var totalQty = 0;
				var totalCbm = 0;
				var totalGrsKgs = 0;
				var totalNetKgs = 0;
				var totalEaQty = 0;
				var totalRcvqty = 0;

				
				$.each(whIbDtlJS.rcvItem, function(idx, item){
					totalCbm += Number(item.cbm);
					totalGrsKgs += Number(item.grs_kgs);
					totalNetKgs += Number(item.net_kgs);
					totalEaQty += Number(item.rcvTotalQty);
					totalRcvqty += Number(item.rcvQty)
				});
				//whIbDtlJS.rcvItem[0].flag = "U";
				whIbDtlJS.ibData[0].inbound_cbm = totalCbm;
				whIbDtlJS.ibData[0].inbound_grs_kgs = totalGrsKgs;
				whIbDtlJS.ibData[0].inbound_net_kgs = totalNetKgs;
				whIbDtlJS.ibData[0].inbound_ea_qty = totalEaQty;
				whIbDtlJS.totalRcvqty = totalRcvqty;
				
				return true;
			},
			
			setItemListInfo : function(){
				var rcvTotalQty = 0;
				$(".listContent")[0].innerHTML = "";
				$.each(whIbDtlJS.rcvItemTemp.filter(function(value){return (value.idx == whIbDtlJS.itemIdx)}), function(idx, item){
					whIbDtlJS.makeItemListInfo(idx, item);
					rcvTotalQty += Number(item.rcvTotalQty);
				});
				return rcvTotalQty;
			},
			/*<th>UOM</th><th>LP#</th><th>Serial#</th><th>Qty</th>*/
			makeItemListInfo : function(idx, item){
				var trTag = whIbDtlJS.tempTr.clone();
				var td1Tag = whIbDtlJS.tempTd.clone();
				var td2Tag = whIbDtlJS.tempTd.clone();
				var td3Tag = whIbDtlJS.tempTd.clone();
				var td4Tag = whIbDtlJS.tempTd.clone();
				var td5Tag = whIbDtlJS.tempTd.clone();
				
				//LKH::BINEX PDA 컨퍼런스 작업-LP# Cache 문제 CASE 2
				//td1Tag.append('<input type="checkbox" name="inlineCheckbox" value="'+idx+'">')
				td1Tag.append('<input type="checkbox" name="inlineCheckbox" value="'+item.itemKey+'">')
				td2Tag.append(item.rcvPkgunit)
				td3Tag.append(item.rcvLp)
				td4Tag.append(item.rcvSerial)
				td5Tag[0].setAttribute('style', 'text-align: right;');
				td5Tag.append(wmsCommonJS.numberWithCommas(item.rcvTotalQty))
				
				trTag.append(td1Tag);
				trTag.append(td2Tag);
				trTag.append(td3Tag);
				trTag.append(td4Tag);
				trTag.append(td5Tag);
				
				$(".listContent").append(trTag);
			},
			completeResult : function(){
				wmsCommonJS.wmsMobAlert({content : getLabel('MOB_CMM_CMPL_MSG'), page : "MobWHInSrch.clt"});
			},
			//LKH::BINEX PDA 컨퍼런스 작업-LP# Cache 문제
			//makeRcvItem : function(){
			makeRcvItem : function(lineListDelFlag){
				var expDate = "";
				if($("#expDate").val() != ""){
					expDate = $("#expDate").val().split("-")[2] + $('#expDate').val().split("-")[0] + $('#expDate').val().split("-")[1];
				}
				if(whIbDtlJS.itemIdx !=""){
					var itemData = whIbDtlJS.item[whIbDtlJS.itemIdx];
					itemData.itemEaQty = $("#itemEstimated").val().replaceAll(",","");
					itemData.lotNo = $("#itemlotNo").val();
					itemData.lot04 = $("#itemLot04").val();
					itemData.lot05 = $("#itemLot05").val();
					itemData.rcvPkgqty = $("#itemRecvQty").val().replace(",","");
					itemData.exp_dt = expDate;
					if(itemData.flag == "I"){
						whIbDtlJS.item[0].item_ea_qty = $("#itemRecvQty").val().replace(",","");
					}
					
				}else{
					var selectSkuData = whIbDtlJS.skuData[$("#skuInfo option:selected").val()];
					
					if(selectSkuData){
						whIbDtlJS.item.push($.extend({}, whIbDtlJS.item[0]));
						var addItem = whIbDtlJS.item[whIbDtlJS.item.length-1];
						addItem.itemCd = selectSkuData.item_cd;
						addItem.itemNm = selectSkuData.item_nm;
						addItem.item_cd = selectSkuData.item_cd;
						addItem.item_nm = selectSkuData.item_nm;
						addItem.item_sys_no = selectSkuData.item_sys_no;
						addItem.itemEaQty = $("#itemEstimated").val();
						addItem.item_ea_qty = $("#itemRecvQty").val().replace(",","");
						addItem.lot04 = $("#itemLot04").val();
						addItem.lot05 = $("#itemLot05").val();
						addItem.lotNo = $("#itemlotNo").val();
						addItem.exp_dt = expDate;
						addItem.rcvPkgqty = $("#itemRecvQty").val().replace(",","");
						addItem.flag = "I";
						whIbDtlJS.item[0].item_ea_qty = whIbDtlJS.item[0].item_ea_qty;
						
						// #2129 [BINEX WMS4.0] INBOUND COMPLETE CANCEL DELETES SAVED SERIAL #(#1882)
						whIbDtlJS.item[whIbDtlJS.item.length-1].item_ser_no = "";
						whIbDtlJS.item[whIbDtlJS.item.length-1].lic_plat_no = "";
						
						//#2327 [WMS4.0] MOBILE RECEIVING VALIDATION FOR PUTAWAY
						whIbDtlJS.item[whIbDtlJS.item.length-1].serial_req_flag = selectSkuData.serial_req_flag;
					}
				}
				
				//LKH::BINEX PDA 컨퍼런스 작업-LP# Cache 문제
				//$('#myModal').modal('hide');
				if(lineListDelFlag != "LineListDel"){
					$('#myModal').modal('hide');
				}
				
				$(".content")[0].innerHTML = "";
				whIbDtlJS.totalItemEaQty = 0;
				whIbDtlJS.totalRcvPkgqty = 0;
				$.each(whIbDtlJS.item,function(index, value){
					whIbDtlJS.setIbCompleteItem(index, value);
				});
				
				
				if(whIbDtlJS.rcvItem.length > 0){
					whIbDtlJS.rcvItem[0].os_item_ea_qty = Number(whIbDtlJS.rcvItem[0].os_item_ea_qty) - Number(whIbDtlJS.totalRcvqty);
				}
			},
			setLicPlatSeq : function(rtnVal){
				var returnVal = wmsCommonJS.ajaxRes(rtnVal)
				if(returnVal != false){
					if(returnVal.resultCode == "success"){
						$("#rcvLp").val(returnVal.lic_plat_seq);
						$("#rcvSerial").focus();
					}
				}
			},
			checkRcvItem : function(){
				var returnVal = true;
				$.each(whIbDtlJS.item,function(index, value){
					if(value.rcvPkgqty == 0){
						wmsCommonJS.wmsMobAlert({content : getLabel('MOB_IB_DTL_RCVITEM_CHECK_MSG')});
						returnVal = false;
						return false;
					}
				});
				
				return returnVal;
			}
	}
</script>
<form id="form" name="form">  <!-- //#2010 [BINEX WMS4.0] ITEM LOT4,LOT5,Customer Order No 특수문자 처리 -->
<div  class="well">
	<table class="table panel panel-default">
		<tbody>
			<tr>
				<td class="info width-120">Order #</td>
				<td class="ord"></td>
			</tr>
			<tr>
				<td class="info width-120">Status</td>
				<td class="stsNm"></td>
			</tr>
			<tr>
				<td class="info width-120">Reference #</td>
				<td class="ref"></td>
			</tr>
			<tr>
				<td class="info width-120">Customer</td>
				<td class="ctrtNm"></td>
			</tr>
			<tr>
				<td class="info width-120">Received Qty</td>
				<td><span class="recvQty">0</span> / <span class="ordQty">0</span> (O/S : <span class="ordS">0</span>)</td>
			</tr>
			<tr>
				<td class="info width-120">Inbound Date</td>
				<td>
					<div class="input-group">
						<input id="ibDate" type="text" style="width:100%" class="form-control col-xs-4" placeholder="O/B Date" aria-describedby="sizing-addon" readonly><span class="input-group-addon" onClick="javascript:wmsCommonJS.removeFormVal('ibDate')"><span class="glyphicon glyphicon-remove"></span></span>
					</div>
				</td>
			</tr>
			<!-- #2327 [WMS4.0] MOBILE RECEIVING VALIDATION FOR PUTAWAY (S) -->
			<tr>
				<td class="info width-120">Scan SKU</td>
				<td>
					<div class="input-group">
						<input id="itemCd" type="text" style="width:64%; ime-mode:disabled; text-transform:uppercase;" class="form-control col-xs-4" placeholder="Item Code" aria-describedby="sizing-addon" /><!--
						--><button id="btSearch" type="button" style="width:35%" class="btn btn-info">Search</button>
					</div>
				</td>
			</tr>
			<!-- #2327 [WMS4.0] MOBILE RECEIVING VALIDATION FOR PUTAWAY (E) -->
		</tbody>
	</table>
	
	<div class="panel panel-default">
		<!-- Default panel contents -->
		<div class="panel-heading">
			<span>Items</span>
			<span class="right-30"><button type="button" class="btn btn-warning btn-sm form-padding-top" data-toggle="modal" data-target="#myModal" onClick="javascript:whIbDtlJS.setIdx();">Add New Line</button></span>
		</div>
		<table class="table table-bordered panel panel-default">
			<thead>
				<tr>
					<th>#</th>
					<th>SKU</th>
					<th>Identifier</th>
					<th>Ord. Qty</th>
					<th>Recv. Qty</th>
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
				<table class="table panel panel-default">
					<tbody>
						<tr>
							<td class="info width-120">Order</td>
							<td class="itemOrd"></td>
						</tr>
						<tr>
							<td class="info width-120">SKU</td>
							<td class="itemSku"></td>
						</tr>
						<tr>
							<td class="info width-120">Description</td>
							<td class="itemDesc"></td>
						</tr>
						<tr>
							<td class="info width-120">Item Lot</td>
							<td class="itemLot"></td>
						</tr>
						<tr>
							<td class="info width-120"><%=lot4_alias %></td>
							<td class="itemLot4"></td>
						</tr>
						<tr>
							<td class="info width-120"><%=lot5_alias %></td>
							<td class="itemLot5"></td>
						</tr>
						<tr>
							<td class="info width-120">Exp. Date</td>
							<td class="itemFromLoc">
								<div class="input-group">
									<input id="expDate" type="text" style="width:100%" class="form-control col-xs-4" placeholder="Exp. Date" aria-describedby="sizing-addon" readonly><span id="delExpDate"  class="input-group-addon" onClick="javascript:wmsCommonJS.removeFormVal('expDate')"><span class="glyphicon glyphicon-remove"></span></span>
								</div>
							</td>
						</tr>
						<tr>
							<td class="info width-120">Received&nbsp;/&nbsp;Estimated</td>
							<td><span class="itemRecvQty col-xs-5 form-padding-0"></span><span class="itemRecvQty col-xs-2 form-padding-0" style="top: 8px; text-align: center"> / </span><span class="itemOrdQty col-xs-5 form-padding-0">100</span></td>
						</tr>
					</tbody>
				</table>
				<div class="panel-heading">
					<span><button type="button" class="btn btn-warning btn-sm form-padding-top" data-toggle="modal" data-target="#lineListModal">List</button></span>
					<span class="right-30">
						<button id="addRcvItem" type="button" class="btn btn-warning btn-sm form-padding-top">Add</button>
						<button id="addRcvItemOk" type="button" class="btn btn-warning btn-sm form-padding-top">Add & OK</button>
					</span>
				</div>
				<table class="table panel panel-default">
					<tbody>
						<tr>
							<td class="info">Received</td>
							<td>
								<div class="col-xs-4 form-padding-0">
									<input id="rcvQty" type="number" class="form-control keyup-event" style="text-align: right; padding-right:6px; padding-left:6px;" maxlength="6" placeholder="Qty"  enter="true">
								</div>
								<div class="col-xs-4 form-padding-0">
									<select id="uom" class="form-control" style="text-align: left; padding-right:6px; padding-left:6px;" onChange="whIbDtlJS.uomChange();">
										<option>UOM</option>
									</select>
								</div>
								<div class="col-xs-4 form-padding-0">
									<input id="rcvTotalQty" type="text" class="form-control" style="text-align: right; padding-right:6px; padding-left:6px;" maxlength="6" placeholder="Total" readonly="readonly">
								</div>
							</td>
						</tr>
						<tr>
							<td class="info">LP#</td>
							<td class="itemLP">
								<div class="col-xs-8 form-padding-0">
									<input id="rcvLp" type="text" class="form-control" style="ime-mode:disabled;text-transform:uppercase;" dataformat="engup" otherchar="<%=WMS_OTHER_CHAR%>" placeholder="LP#" enter="false">   <!-- //#2010 [BINEX WMS4.0] ITEM LOT4,LOT5,Customer Order No 특수문자 처리 -->
								</div>
								<div class="col-xs-4 form-padding-0">
									<button id="btAuto" type="button" style="width:100%" class="btn btn-info">Auto</button>
								</div>
							</td>
						</tr>
						<tr>
							<td class="info" id="serial_no">Serial#</td>
							<td>
								<div class="col-xs-12 form-padding-0">
									<input id="rcvSerial" type="text" class="form-control" style="ime-mode:disabled;text-transform:uppercase;" dataformat="engup" otherchar="<%=WMS_OTHER_CHAR%>" placeholder="Serial#" enter="true">  <!-- //#2010 [BINEX WMS4.0] ITEM LOT4,LOT5,Customer Order No 특수문자 처리 -->
								</div>
							</td>
						</tr>
						<tr>
							<td class="info">Location</td>
							<td>
								<div class="col-xs-12 form-padding-0">
									<input id="rcvLocation" type="text" class="form-control" placeholder="Location">
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="modal-footer">
				<div class="btn-group btn-group-justified" role="group" aria-label="...">
					<div class="btn-group" role="group">
					  	<button type="button" style="width:50%" class="btn btn-default" data-dismiss="modal">Cancel</button>
						<button id="itemSave" type="button" style="width:50%" class="btn btn-primary">Ok</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<div class="modal fade" id="lineListModal" id="lineList" tabindex="-1" role="dialog" aria-labelledby="lineListLabel">
	<div class="modal-dialog modal-sm" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				<h4 class="modal-title" id="lineListLabel">Line List</h4>
			</div>
			<div class="modal-body" >
				<div class="panel-heading">
					<span>&nbsp;</span>
					<span class="right-30">
						<button id="delRcvItem" type="button" class="btn btn-danger btn-sm form-padding-top">Del</button>
						<button id="okRcvItem" type="button" class="btn btn-info btn-sm form-padding-top">OK</button>
					</span>
				</div>
				<!-- Default panel contents -->
				<table class="table table-bordered panel panel-default">
					<thead>
						<tr>
							<th  class="col-xs-1">#</th>
							<th>UOM</th>
							<th>LP#</th>
							<th>Serial#</th>
							<th>Qty</th>
						</tr>
					</thead>
					<tbody class="listContent">
						<tr>
							<td><input type="checkbox" id="inlineCheckbox1" value="option1"></td>
							<td></td>
							<td></td>
							<td></td>
							<td>10</td>
						</tr>
						<tr>
							<td><input type="checkbox" id="inlineCheckbox1" value="option1"></td>
							<td></td>
							<td></td>
							<td></td>
							<td>10</td>
						</tr>
					</tbody>
				</table>
			</div>

		</div>
	</div>
</div>
</form>  <!-- //#2010 [BINEX WMS4.0] ITEM LOT4,LOT5,Customer Order No 특수문자 처리 -->