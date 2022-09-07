<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<!-- 공통 Header -->
<%@include file="./../../../../../../syscommon/header/CLTMobHeader.jsp"%>
<script type="text/javascript">
	$( document ).ready(function() {
		whoutSrchJS.selectCtrtCode();

		//#2807 [BINEX WMS4.0] LOT04, LOT05 NICKNAME CUSTOMIZATION
		wmsCommonJS.getCtrtLotAlias();

		//#2332 [WMS4.0] MOBILE SEARCH CONDITION
		$('#itemCd').keypress(function(e) {
			if(e.keyCode == '13') {
				whoutSrchJS.goPickingList();
			}
		});

		$('#orderNo').keypress(function(e) {
			if(e.keyCode == '13') {
				$('#itemCd').focus();
			}
		});

		//#2807 [BINEX WMS4.0] LOT04, LOT05 NICKNAME CUSTOMIZATION
		$('#ctrtNo').change(function(){
			wmsCommonJS.getCtrtLotAlias();
		});

		$('#orderNo').focus();
	});
	$(window).on('load', function(){
		$('#fm_date').datetimepicker({
			format: 'mm/dd/yyyy',
		    todayBtn:  1,
			autoclose: 1,
			todayHighlight: 1,
			startView: 2,
			minView: 2,
			forceParse: 0
		});
		$('#to_date').datetimepicker({
			format: 'mm/dd/yyyy',
			todayBtn:  1,
			autoclose: 1,
			todayHighlight: 1,
			startView: 2,
			minView: 2,
			forceParse: 0
		});
	});
	var whoutSrchJS = {
		selectCtrtCode : function () {
			ajaxSendPost(whoutSrchJS.setCtrtCode, 'reqVal', '&goWhere=aj&bcKey=selectMobCtrtList', './GateServlet.gsl');
		},
		setCtrtCode : function(rtnVal){
			var returnVal = wmsCommonJS.ajaxRes(rtnVal)
			if(returnVal != false){
				if(returnVal.resultCode == "success"){
					var selectVal = "";
					$.each(returnVal.ctrts,function(index, value){
						var selectVal = "";
						if(returnVal.userInfo.def_wh_ctrt_no == value.ctrtNo){
							selectVal = "selected";
						}
						$("#ctrtNo").append("<option value='"+value.ctrtNo+"' "+selectVal+">"+value.ctrtNm+"</option>");
					});
				}
			}
		},
		goPickingList : function(){
			/* #2332 [WMS4.0] MOBILE SEARCH CONDITION */
			wmsCommonJS.goPage('MobWHOutShpList.clt?bkStsCd=P&customerNo='+$("#ctrtNo option:selected").val()+'&orderNo='+$("#orderNo").val()+'&itemCd='+$("#itemCd").val()+'&lotAlias='+$("#lotAlias").val());
		},
	}
</script>
<div class="well">
<form id="form" name="form">
	<div class="ol-md-12 form-wrapper">
		<label for="order">Contract #</label>
		<select id="ctrtNo" class="form-control">
			<option value="">Contract</option>
		</select>
		<input type="hidden" id="lotAlias" />	<!-- #2807 [BINEX WMS4.0] LOT04, LOT05 NICKNAME CUSTOMIZATION -->
	</div>
	<div class="form-wrapper">&nbsp;</div>
	<div class="ol-md-12 form-wrapper">
		<label for="order">Order #</label>
		<input id="orderNo" type="text" class="form-control" placeholder="Order #" aria-describedby="basic-addon1">
	</div>
	<!-- #2332 [WMS4.0] MOBILE SEARCH CONDITION (S) -->
	<div class="form-wrapper">&nbsp;</div>
	<div class="ol-md-12 form-wrapper">
		<label for="item">SKU</label>
		<input id="itemCd" type="text" class="form-control" placeholder="Item #" aria-describedby="basic-addon1">
	</div>
	<!-- #2332 [WMS4.0] MOBILE SEARCH CONDITION (E) -->
</form>
</div>
<div class="navbar-fixed-bottom">
	<div class="btn-group btn-group-justified" role="group" aria-label="...">
	  <div class="btn-group" role="group">
	    <button type="button" class="btn btn-primary footer-button" onClick="javascript:whoutSrchJS.goPickingList();">Search</button>
	  </div>
	</div>
</div>