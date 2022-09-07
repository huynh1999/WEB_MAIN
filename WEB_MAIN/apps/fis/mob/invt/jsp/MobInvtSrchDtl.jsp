<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<!-- 공통 Header -->
<%@include file="./../../../../../../syscommon/header/CLTMobHeader.jsp"%>

<%
//#3557 [BINEX WMS] MOBILE - INVENTORY SEARCH 에 Contract 조회조건 추가
String ctrtNo = request.getParameter("ctrtNo");
String lotId = request.getParameter("lotId");
String whLocCd = request.getParameter("whLocCd");

String wibBkNo = request.getParameter("wibBkNo");
String itemCd  = request.getParameter("itemCd");
String itemSeq = request.getParameter("itemSeq");
String licPlatNo = request.getParameter("licPlatNo");
String itemSerNo = request.getParameter("itemSerNo");
%>

<script type="text/javascript">
	$(document).ready(function() {
		invtSrchDtlJS.selectInvtSrchDtl();

		$('#lotAlias').on('change', function() {
			var lot_alias = $('#lotAlias').val().split('|');
			$('body > div > div.well > table:nth-child(1) > tbody > tr:nth-child(5) > th').html(lot_alias[0] + ' / ' + lot_alias[1]);
		});

		$('#lotAlias').change();
	});

	var invtSrchDtlJS = {
		//#3557 [BINEX WMS] MOBILE - INVENTORY SEARCH 에 Contract 조회조건 추가
		ctrtNo   : ('<%=ctrtNo%>' == 'null') ? '' : '<%=ctrtNo%>',	
		lotId   : ('<%=lotId%>' == 'null') ? '' : '<%=lotId%>',
		whLocCd   : ('<%=whLocCd%>' == 'null') ? '' : '<%=whLocCd%>',				
				
		wibBkNo   : ('<%=wibBkNo%>' == 'null') ? '' : '<%=wibBkNo%>',
		itemCd    : ('<%=itemCd%>' == 'null') ? '' : '<%=itemCd%>',
		itemSeq   : ('<%=itemSeq%>' == 'null') ? '' : '<%=itemSeq%>',
		licPlatNo : ('<%=licPlatNo%>' == 'null') ? '' : '<%=licPlatNo%>',
		itemSerNo : ('<%=itemSerNo%>' == 'null') ? '' : '<%=itemSerNo%>',
		selectInvtSrchDtl : function(){
			var sendData = JSON.stringify({
				//#3557 [BINEX WMS] MOBILE - INVENTORY SEARCH 에 Contract 조회조건 추가
				"ctrtNo":invtSrchDtlJS.ctrtNo,
				"lotId":invtSrchDtlJS.lotId,
				"whLocCd":invtSrchDtlJS.whLocCd,
				
				"wibBkNo":invtSrchDtlJS.wibBkNo,
				"itemCd":invtSrchDtlJS.itemCd,
				"itemSeq":invtSrchDtlJS.itemSeq,
				"licPlatNo":invtSrchDtlJS.licPlatNo,
				"itemSerNo":invtSrchDtlJS.itemSerNo
			});
			ajaxSendPost(invtSrchDtlJS.setInvtSrchDtl, 'reqVal', '&goWhere=aj&bcKey=selectInvtSrchList&data='+sendData, './GateServlet.gsl');
		},
		setInvtSrchDtl : function(rtnVal){
			var returnVal = wmsCommonJS.ajaxRes(rtnVal)
			if(returnVal != false){
				if(returnVal.resultCode == "success") {
					// 검색 결과가 하나 인 경우 상세 페이지로 이동
					if(returnVal.mobInvtItems.length == 1) {
						var value = returnVal.mobInvtItems[0];
						$('body > div > div.well > table:nth-child(1) > tbody > tr:nth-child(1) > td').html(value.ctrt_no);
						$('body > div > div.well > table:nth-child(1) > tbody > tr:nth-child(2) > td').html(value.item_cd);
						$('body > div > div.well > table:nth-child(1) > tbody > tr:nth-child(3) > td').html(value.item_nm);
						$('body > div > div.well > table:nth-child(1) > tbody > tr:nth-child(4) > td').html(value.lot_no);
						$('body > div > div.well > table:nth-child(1) > tbody > tr:nth-child(5) > td:nth-child(2)').html(value.lot_04);
						$('body > div > div.well > table:nth-child(1) > tbody > tr:nth-child(5) > td:nth-child(3)').html(value.lot_05);
						$('body > div > div.well > table:nth-child(1) > tbody > tr:nth-child(6) > td:nth-child(2)').html(value.lic_plat_no);
						$('body > div > div.well > table:nth-child(1) > tbody > tr:nth-child(6) > td:nth-child(3)').html(value.item_ser_no);
						$('body > div > div.well > table:nth-child(1) > tbody > tr:nth-child(7) > td').html(value.wh_loc_nm);
						$('body > div > div.well > table:nth-child(1) > tbody > tr:nth-child(8) > td').html(value.tot_qty+" "+value.pck_nm);
						$('body > div > div.well > table:nth-child(1) > tbody > tr:nth-child(9) > td').html(value.stc_qty);
						$('body > div > div.well > table:nth-child(1) > tbody > tr:nth-child(10) > td').html(value.hold_qty);
						$('body > div > div.well > table:nth-child(1) > tbody > tr:nth-child(11) > td').html(value.dmg_qty);
						$('body > div > div.well > table:nth-child(1) > tbody > tr:nth-child(12) > td').html(value.allc_qty);

						$('body > div > div.well > table:nth-child(3) > tbody > tr:nth-child(1) > td').html(value.cust_ord_no);
						$('body > div > div.well > table:nth-child(3) > tbody > tr:nth-child(2) > td').html(value.inbound_dt);

						//#2807 [BINEX WMS4.0] LOT04, LOT05 NICKNAME CUSTOMIZATION
						$('#ctrtNo').val(value.ctrt_no);
						wmsCommonJS.getCtrtLotAlias();
					}
				}
			}
		}
	}
</script>

<div class="well">
	<table class="table panel panel-default" border="1">
		<tr>
			<th colspan="2" class="info" style="text-align: left;">Contract</th>
			<td colspan="2"></td>
		</tr>
		<tr>
			<th colspan="2" class="info" style="text-align: left;">SKU</th>
			<td colspan="2"></td>
		</tr>
		<tr>
			<th colspan="2" class="info" style="text-align: left;">Description</th>
			<td colspan="2"></td>
		</tr>
		<tr>
			<th colspan="2" class="info" style="text-align: left;">Item Lot</th>
			<td colspan="2"></td>
		</tr>
		<tr>
			<th colspan="2" class="info" style="text-align: left;">Lot 4 / Lot 5</th>
			<td style="width: 160px;"></td>
			<td></td>
		</tr>
		<tr>
			<th colspan="2" class="info" style="text-align: left;">LP# / Serial#</th>
			<td></td>
			<td></td>
		</tr>
		<tr>
			<th colspan="2" class="info" style="text-align: left;">Location</th>
			<td colspan="2"></td>
		</tr>
		<tr>
			<th rowspan="5" class="info" style="text-align: left; width: 60px;">Qty</th>
			<th class="info width-120" style="text-align: left;">Total</th>
			<td colspan="2" style="text-align: right;"></td>
		</tr>
		<tr>
			<th class="info width-120" style="text-align: left;">Available</th>
			<td colspan="2" style="text-align: right;"></td>
		</tr>
		<tr>
			<th class="info width-120" style="text-align: left;">Hold</th>
			<td colspan="2" style="text-align: right;"></td>
		</tr>
		<tr>
			<th class="info width-120" style="text-align: left;">Damage</th>
			<td colspan="2" style="text-align: right;"></td>
		</tr>
		<tr>
			<th class="info width-120" style="text-align: left;">Allocated</th>
			<td colspan="2" style="text-align: right;"></td>
		</tr>
	</table>

	<br/>

	<table class="table panel panel-default" border="1">
		<tr>
			<th class="info" style="text-align: left; width: 180px;">I/B Order #</th>
			<td></td>
		</tr>
		<tr>
			<th class="info" style="text-align: left;">Received Date</th>
			<td></td>
		</tr>
	</table>

	<!-- #2807 [BINEX WMS4.0] LOT04, LOT05 NICKNAME CUSTOMIZATION -->
	<input type="hidden" id="ctrtNo" />
	<input type="hidden" id="lotAlias" />

</div>
<div class="navbar-fixed-bottom">
	<div class="btn-group btn-group-justified" role="group" aria-label="...">
		<div class="btn-group" role="group">
			<button type="button" class="btn btn-primary footer-button" onClick="wmsCommonJS.historyBack();">OK</button>
		</div>
	</div>
</div>