<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<!-- 공통 Header -->
<%@include file="./../../../../../../syscommon/header/CLTMobHeader.jsp"%>
<%
String wibBkNo = request.getParameter("wibBkNo");
String wibInNo = request.getParameter("wibInNo");
String lotId = request.getParameter("lotId");
String itemSeq =  request.getParameter("itemSeq");
String ctrtNo = request.getParameter("ctrtNo");

//#2807 [BINEX WMS4.0] LOT04, LOT05 NICKNAME CUSTOMIZATION
String lotAlias = request.getParameter("lotAlias");
String lot4_alias = lotAlias.substring(0, lotAlias.indexOf("|"));
String lot5_alias = lotAlias.substring(lotAlias.indexOf("|")+1);

%>
<script type="text/javascript">
	$( document ).ready(function() {
		whibPtawyDltJS.selectInPtawyList();
		$('#btSave').click(function(){
			if($('#toLocation').val() == ""){
				wmsCommonJS.wmsMobAlert({content : getLabel('MOB_CMM_LOC_MSG'), focus: $('#uom')});
				return;
			}
			whibPtawyDltJS.getLocation();
			
		});
		
		//#1880 [BINEX WMS4.0] PUTAWAY ERROR OF SHOWING MULTIPLE LINES OF SAME LP
		//동일한 LP는 동일한 Location 지정	
		$('#toLocation').change(function() {
			if(whibPtawyDltJS.plLocFlag == "ROCK"){
				$('#toLocation').val(whibPtawyDltJS.chk_lco_nm);
				$('#toLocationCd').val(whibPtawyDltJS.chk_lco_cd);
				wmsCommonJS.wmsMobAlert({content : getLabel('MOB_CMM_LOC_MSG2'), focus:"" });
			}
		});
		
		$('#toLocation').keypress(function(e) {
			if(e.keyCode == '13') {
				$('#btSave').click();
			}
		});

		$('#toLp').keypress(function(e) {
			if(e.keyCode == '13') {
				$('#toLocation').focus();
			}
		});
	});
	$(window).on('load', function(){
		var dateNow = new Date();
		$('#ptawyDate').datetimepicker({
			format: 'yyyymmdd',
		    todayBtn:  1,
			autoclose: 1,
			todayHighlight: 1,
			startView: 2,
			minView: 2,
			forceParse: 0
		});
		$('#ptawyDate').datetimepicker('update', new Date());

	});
	var whibPtawyDltJS = {
		ctrtNo : ('<%=ctrtNo%>' == 'null') ? '' : '<%=ctrtNo%>',
		wibBkNo : ('<%=wibBkNo%>' == 'null') ? '' : '<%=wibBkNo%>',
		wibInNo : ('<%=wibInNo%>' == 'null') ? '' : '<%=wibInNo%>',		
		lotId : ('<%=lotId%>' == 'null') ? '' : '<%=lotId%>',
		itemSeq : ('<%=itemSeq%>' == 'null') ? '' : '<%=itemSeq%>',
		uomData : [],
		plLocFlag : "N",      //#1880  동일한 LP는 동일한 Location 확인여부
		chk_lco_cd : "",       //#1880  동일한 LP는 동일한 Location 확인여부
		chk_lco_nm : "",       //#1880  동일한 LP는 동일한 Location 확인여부
		lot4_alias : ('<%=lot4_alias%>' == 'null') ? '' : '<%=lot4_alias%>',	//#2807 [BINEX WMS4.0] LOT04, LOT05 NICKNAME CUSTOMIZATION
		lot5_alias : ('<%=lot5_alias%>' == 'null') ? '' : '<%=lot5_alias%>',	//#2807 [BINEX WMS4.0] LOT04, LOT05 NICKNAME CUSTOMIZATION
		status : false,
		selectUomData : [],
		ibPtawys : [],
		selectInPtawyList : function(){
			var sendData = JSON.stringify({
				"ctrtNo":whibPtawyDltJS.ctrtNo,
				"wibBkNo":whibPtawyDltJS.wibBkNo,
				"wibInNo":whibPtawyDltJS.wibInNo,
				"lotId":whibPtawyDltJS.lotId,
				"itemSeq":whibPtawyDltJS.itemSeq
			});
			ajaxSendPost(whibPtawyDltJS.setIbPtawyDlt, 'reqVal', '&goWhere=aj&bcKey=selectIbPtawyList&data='+sendData, './GateServlet.gsl');
		},
		setIbPtawyDlt : function(rtnVal){
			var returnVal = wmsCommonJS.ajaxRes(rtnVal)
			if(returnVal != false){
				if(returnVal.resultCode == "success"){
					if(returnVal.ibPtawys.length > 0){
						whibPtawyDltJS.ibPtawys = returnVal.ibPtawys;
						$.each(returnVal.ibPtawys,function(index, value){
							whibPtawyDltJS.makeIbPtawyDlt(index, value);
						});
						$('#toLocation').focus();
						
					}else{
						$(location).attr('href', 'MobWHInPtawySrch.clt');
					}
				}
			}
		},
		
		makeIbPtawyDlt : function(index, value){
			$(".ctrtNm")[0].innerHTML = value.ctrt_nm;
			$(".ord")[0].innerHTML = value.cust_ord_no;
			$(".sku")[0].innerHTML = value.item_cd + ":" + value.item_nm;
			$(".desc")[0].innerHTML = value.item_nm;
			$(".lot")[0].innerHTML = value.lot_no == undefined ? "" :  value.lot_no;
			$(".lot4")[0].innerHTML = value.lot_04 == undefined ? "" :  value.lot_04;
			$(".lot5")[0].innerHTML = value.lot_05 == undefined ? "" :  value.lot_05;;
			$(".fromLoc")[0].innerHTML = value.inbound_loc_nm;
			$(".lpNo")[0].innerHTML = value.inbound_lcs_plt;
			$(".qtyTotal")[0].innerHTML = value.pkgunit +" | " + Number(value.pkgqty)  +" | " + Number(value.ea_qty);
			
			$("#toLocation").val(value.putaway_wh_loc_nm);
			$("#toLp").val(value.inbound_lcs_plt);
			$("#qty").val(Number(value.pkgqty));
			$("#totalQty").val(Number(value.ea_qty));
			
			
			// UOM Code 조회
			whibPtawyDltJS.itemPkgunit = value.pkgunit;
			whibPtawyDltJS.selectUOMInfo(value.item_cd);
			
			//#1880 [BINEX WMS4.0] PUTAWAY ERROR OF SHOWING MULTIPLE LINES OF SAME LP
			//동일한 LP는 동일한 Location 지정
			whibPtawyDltJS.checkLpLoction();
			
		},
		selectUOMInfo : function (itemCd) {
			//#1811 [WMS4.0]Item Code 특수문자 허용
			ajaxSendPost(whibPtawyDltJS.setUomInfo, 'reqVal', '&goWhere=aj&bcKey=selectUOMInfo&itemCd='+encodeURIComponent(itemCd)+'&ctrtNo='+whibPtawyDltJS.ctrtNo, './GateServlet.gsl');
		},
		setUomInfo : function(rtnVal){
			var returnVal = wmsCommonJS.ajaxRes(rtnVal)
			if(returnVal != false){
				if(returnVal.resultCode == "success"){
					whibPtawyDltJS.uomData = [];
					//console.log(returnVal);
					
					whibPtawyDltJS.uomData.push(new Array(returnVal.itemPkgbaseqty, returnVal.itemPkgunit, returnVal.itemPkgunitNm, returnVal.item_cbm, returnVal.item_cbf, returnVal.item_grs_kgs, returnVal.item_net_kgs, returnVal.item_grs_lbs, returnVal.item_net_lbs));
					whibPtawyDltJS.uomData.push(new Array(returnVal.pkgLv1Qty, returnVal.pkgLv1UnitCd, returnVal.pkgLv1UnitNm, returnVal.lv1_cbm, returnVal.lv1_cbf, returnVal.lv1_grs_kgs, returnVal.lv1_grs_lbs, returnVal.lv1_net_kgs, returnVal.lv1_net_lbs));
					whibPtawyDltJS.uomData.push(new Array(returnVal.pkgLv3Qty, returnVal.pkgLv3UnitCd, returnVal.pkgLv3UnitNm, returnVal.lv3_cbm, returnVal.lv3_cbf, returnVal.lv3_grs_kgs, returnVal.lv3_grs_lbs, returnVal.lv3_net_kgs, returnVal.lv3_net_lbs));
					//console.log(uomList);
					// Uom 초기화
					var optionLength = $("#toUom option").length - 1;
					$.each($("#toUom option"), function(idx, item){
						$("#toUom option:eq("+ (optionLength - idx)+")").remove();
					});
					// Uom 초기화 값 셋팅 
					$("#toUom").append("<option value=''>UOM</option>");
					$.each(whibPtawyDltJS.uomData,function(index, value){
						var selectVal = "";
						if(whibPtawyDltJS.itemPkgunit == value[1]){
							selectVal = "selected";
							whibPtawyDltJS.selectUomData = value;
						}
						if(value[0]){
							$("#toUom").append("<option value='"+index+"' "+selectVal+">"+value[1] +" : " + value[2] + "</option>");
						}
					});
				}
			}
		},
		uomChange : function () {
			whibPtawyDltJS.selectUomData = whibPtawyDltJS.uomData[$("#toUom option:selected").val()];
			if(whibPtawyDltJS.selectUomData != undefined){
				var receivedQty = $("#qty").val();
				var uomQty = whibPtawyDltJS.selectUomData[0];
				$("#totalQty").val(Number(receivedQty) * Number(uomQty));
			}else{
				$("#totalQty").val(0);
			}
		},
		saveWHPutaway : function () {
			if(!whibPtawyDltJS.status){
				whibPtawyDltJS.ibPtawys[0].chk = "0";
				whibPtawyDltJS.ibPtawys[0].putaway_wh_loc_cd = $("#toLocationCd").val();
				whibPtawyDltJS.ibPtawys[0].putaway_wh_loc_nm = $("#toLocation").val();
				whibPtawyDltJS.ibPtawys[0].putaway_lcs_plt = $("#toLp").val();
				whibPtawyDltJS.ibPtawys[0].putaway_dt = $("#ptawyDate").val();
				
				
				whibPtawyDltJS.ibPtawys[0].putaway_pkgunit = whibPtawyDltJS.selectUomData[1];
				whibPtawyDltJS.ibPtawys[0].putaway_pkgqty = $("#qty").val();
				whibPtawyDltJS.ibPtawys[0].putaway_ea_qty = $("#totalQty").val();
				
				whibPtawyDltJS.ibPtawys[0].putaway_cbm = Number(whibPtawyDltJS.uomData[1][3]) * Number($("#totalQty").val());
				whibPtawyDltJS.ibPtawys[0].putaway_cbf = Number(whibPtawyDltJS.uomData[1][4]) * Number($("#totalQty").val());
				whibPtawyDltJS.ibPtawys[0].putaway_grs_kgs = Number(whibPtawyDltJS.uomData[1][5]) * Number($("#totalQty").val());
				whibPtawyDltJS.ibPtawys[0].putaway_grs_lbs = Number(whibPtawyDltJS.uomData[1][6]) * Number($("#totalQty").val());
				whibPtawyDltJS.ibPtawys[0].putaway_net_kgs = Number(whibPtawyDltJS.uomData[1][7]) *  Number($("#totalQty").val());
				whibPtawyDltJS.ibPtawys[0].putaway_net_lbs = Number(whibPtawyDltJS.uomData[1][8]) * Number($("#totalQty").val());
				
				whibPtawyDltJS.ibPtawys[0].ibflag = "U";
				//#1811 [WMS4.0]Item Code 특수문자 허용
				var sendData = encodeURIComponent(JSON.stringify(whibPtawyDltJS.ibPtawys));
				ajaxSendPost(whibPtawyDltJS.saveResult, 'reqVal', '&goWhere=aj&bcKey=saveWHPutaway&data='+sendData, './GateServlet.gsl');
			}else{
				wmsCommonJS.wmsMobAlert({content : getLabel('MOB_IB_PTAWY_DATA_CHECK_MSG1')});
			}
		},
		saveResult : function (rtnVal){
			var returnVal = wmsCommonJS.ajaxRes(rtnVal)
			if(returnVal != false){
				if(returnVal.resultCode == "success"){
					wmsCommonJS.wmsMobAlert({content : getLabel('MOB_CMM_CMPL_MSG'), page : "back"});
				}else{
					wmsCommonJS.wmsMobAlert({content : returnVal.msssage});
				}
			}
		},
		getLocation :function(){
			return ajaxSendPost(whibPtawyDltJS.setLocation, 'reqVal', '&goWhere=aj&bcKey=selectGetLocation&wh_loc_nm='+$('#toLocation').val(), './GateServlet.gsl');			
		},
		setLocation : function(rtnVal){
			var returnVal = wmsCommonJS.ajaxRes(rtnVal)
			if(returnVal != false){
				if(returnVal.resultCode == "success"){
					// To Location 정보가 DB에 있는 경우 저장.
					$("#toLocationCd").val(returnVal.wh_loc_cd);
					whibPtawyDltJS.saveWHPutaway();
				}else{
					wmsCommonJS.wmsMobAlert({content : getLabel('MOB_CMM_LOC_MSG'), focus: $('#toLocation')});
				}
				
			}	
			return false;
		},
		//#1880 [BINEX WMS4.0] PUTAWAY ERROR OF SHOWING MULTIPLE LINES OF SAME LP
		//동일한 LP는 동일한 Location 지정		
		checkLpLoction :function(){
			//wib_in_no,wib_bk_no,item_sys_no,inbound_lcs_plt
			var sendData = JSON.stringify({
				"wib_in_no":whibPtawyDltJS.ibPtawys[0].wib_in_no,
				"wib_bk_no":whibPtawyDltJS.ibPtawys[0].wib_bk_no,
				"item_sys_no":whibPtawyDltJS.ibPtawys[0].item_sys_no,
				"inbound_lcs_plt":whibPtawyDltJS.ibPtawys[0].inbound_lcs_plt
			});			
			var inParam = "&wib_in_no="+whibPtawyDltJS.ibPtawys[0].wib_in_no;
			    inParam+= "&wib_bk_no="+whibPtawyDltJS.ibPtawys[0].wib_bk_no;
			    inParam+= "&item_sys_no="+whibPtawyDltJS.ibPtawys[0].item_sys_no;
			    inParam+= "&putaway_lic_plat_no="+whibPtawyDltJS.ibPtawys[0].inbound_lcs_plt;
			return ajaxSendPost(whibPtawyDltJS.setCheckLoction, 'reqVal', '&goWhere=aj&bcKey=checkLpLoction'+inParam, './GateServlet.gsl');
		},
		//#1880 [BINEX WMS4.0] PUTAWAY ERROR OF SHOWING MULTIPLE LINES OF SAME LP
		//동일한 LP는 동일한 Location 지정
		setCheckLoction : function(rtnVal){
			var returnVal = wmsCommonJS.ajaxRes(rtnVal)
			if(returnVal != false){
				if(returnVal.resultCode == "success"){
					$('#toLocation').val(returnVal.wh_loc_nm)
					$('#toLocationCd').val(returnVal.wh_loc_cd)
					
					whibPtawyDltJS.chk_lco_cd = returnVal.wh_loc_cd;
					whibPtawyDltJS.chk_lco_nm = returnVal.wh_loc_nm;
					whibPtawyDltJS.plLocFlag = "ROCK";
				}else{
					whibPtawyDltJS.chk_lco_cd = "";
					whibPtawyDltJS.chk_lco_nm = "";					
					whibPtawyDltJS.plLocFlag = "N";
				}
				
			}
			return false;
		}
	}
</script>
<div  class="well" style="margin-bottom:0px">
	<table class="table panel panel-default">
		<tbody>
			<tr>
				<td class="info width-120">Contract</td>
				<td class="ctrtNm"></td>
			</tr>
			<tr>
				<td class="info width-120">Order #</td>
				<td class="ord">ORD-01</td>
			</tr>
			<tr>
				<td class="info width-120">SKU</td>
				<td class="sku">ITEM-EA-01</td>
			</tr>
			<tr>
				<td class="info width-120">Description</td>
				<td class="desc">NEW ITEM 01</td>
			</tr>
			<tr>
				<td class="info width-120">Item Lot</td>
				<td class="lot">LOT</td>
			</tr>
			<tr>
				<td class="info width-120"><%=lot4_alias %></td>
				<td class="lot4">RED</td>
			</tr>
			<tr>
				<td class="info width-120"><%=lot5_alias %></td>
				<td class="lot5">LARGE</td>
			</tr>
			<tr>
				<td class="info width-120">From Loc.</td>
				<td class="fromLoc">QC</td>
			</tr>
			<tr>
				<td class="info width-120">LP#</td>
				<td class="lpNo">LP-23</td>
			</tr>
			<tr>
				<td class="info width-120">Qty / Total</td>
				<td class="qtyTotal">BOX | 100 | 1,000</td>
			</tr>
		</tbody>
	</table>
	<form class="form-horizontal" id="form" name="form">  <!-- //#2010 [BINEX WMS4.0] ITEM LOT4,LOT5,Customer Order No 특수문자 처리 -->
		<input id="ptawyDate" type="hidden">
		<div class="well" style="margin-bottom:0px">
			<div class="form-group form-margin-bottom">
				<label for="orderLineId" class="form-title">LP#</label>
				<div class="col-xs-7 form-padding-0">
					<input id="toLp" type="text" class="form-control" style="ime-mode:disabled;text-transform:uppercase;" dataformat="engup" otherchar="<%=WMS_OTHER_CHAR%>" placeholder="LP#">
				</div>
			</div>
			<div class="form-group form-margin-bottom">
				<label for="orderLineId" class="form-title">Qty / Total</label>
				<div class="col-xs-3 form-padding-0">
					<select id="toUom" class="form-control" onChange="whibPtawyDltJS.uomChange();">
					</select>
				</div>
				<div class="col-xs-2 form-padding-0">
					<input id="qty" type="text" class="form-control keyup-event" style="text-align: right; padding-right:6px; padding-left:6px;" placeholder="Qty">
				</div>
				<div class="col-xs-2 form-padding-0">
					<input id="totalQty" type="text" class="form-control" style="text-align: right; padding-right:6px; padding-left:6px;" placeholder="Total"  readonly="readonly">
				</div>
			</div>
			<div class="row form-group form-margin-bottom">
				<label for="orderLineId" class="form-title">To Location</label>
				<div class="col-xs-7 form-padding-0">
					<input id="toLocation" type="text" class="form-control" placeholder="To Location">
					<input id="toLocationCd" type="hidden" class="form-control" placeholder="To Location">
				</div>
			</div>
		</div>
		<div class="navbar-fixed-bottom">
			<div class="btn-group btn-group-justified" role="group" aria-label="...">
					<div class="btn-group" role="group">
					  	<button type="button" style="width:50%" class="btn btn-default  footer-button" data-dismiss="modal" onclick="wmsCommonJS.historyBack();">Cancel</button>
						<button id="btSave" type="button" style="width:50%" class="btn btn-primary  footer-button">Save</button>
					</div>
			</div>
		</div>
	</form>
</div>