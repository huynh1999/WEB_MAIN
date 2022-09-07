<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<!-- 공통 Header -->
<%@include file="./../../../../../../syscommon/header/CLTMobHeader.jsp"%>
<script type="text/javascript">
	$( document ).ready(function() {
		wmsCommonJS.selectCtrtCode();

		//#2807 [BINEX WMS4.0] LOT04, LOT05 NICKNAME CUSTOMIZATION
		wmsCommonJS.getCtrtLotAlias();

		$('#orderNo').focus();

		//포커스 시  input box text 전체 선택
		$("#orderNo").on("focus", function(){
			$(this).select();
		});
		$("#itemCd").on("focus", function(){
			$(this).select();
		});

		//input box 모바일 클릭 시 키보드 안나오게 
		$("#itemCd").on("click", function(){return;
			$('#itemCd').attr("readonly", true);
			setTimeout(function() {
				$('#itemCd').attr("readonly", false);
			}, 10);
		});

		//#2332 [WMS4.0] MOBILE SEARCH CONDITION
		$('#orderNo').keypress(function(e) {
			if(e.keyCode == '13') {
				$('#itemCd').focus();

				//input box 모바일 키보드 숨기기 위한 로직  
				$('#itemCd').attr("readonly", true);
				setTimeout(function() {
					$('#itemCd').attr("readonly", false);
				}, 10);
			}
		});

		$('#itemCd').keypress(function(e) {
			if(e.keyCode == '13') {
				whinSrchJS.goInCompleteList();
			}
		});

		//#2807 [BINEX WMS4.0] LOT04, LOT05 NICKNAME CUSTOMIZATION
		$('#ctrtNo').change(function(){
			wmsCommonJS.getCtrtLotAlias();
		});

	});

	$(window).on('load', function(){
		var dateNow = new Date();
		$('#fmDate').datetimepicker({
			
			format: 'mm/dd/yyyy',
		    todayBtn:  1,
			autoclose: 1,
			todayHighlight: 1,
			startView: 2,
			minView: 2,
			forceParse: 0
		});
		$('#toDate').datetimepicker({
			
			format: 'mm/dd/yyyy',
		    todayBtn:  1,
			autoclose: 1,
			todayHighlight: 1,
			startView: 2,
			minView: 2,
			forceParse: 0
		});
		whinSrchJS.setDate();  //#1699 [WMS4.0] OPUS and Mobile Inbound/Outbound Default 조회 기준일

	});

	var whinSrchJS = {
		goInCompleteList : function(){
			var fmDate = $("#fmDate").val() != "" ? $("#fmDate").val().split("/")[2] + $('#fmDate').val().split("/")[0] + $('#fmDate').val().split("/")[1] : "";
			var toDate = $("#toDate").val() != "" ? $("#toDate").val().split("/")[2] + $('#toDate').val().split("/")[0] + $('#toDate').val().split("/")[1] : "";
			fmDate = (fmDate == 'NaN') ? '' : fmDate;
			toDate = (toDate == 'NaN') ? '' : toDate;
			//#2332 [WMS4.0] MOBILE SEARCH CONDITION
			wmsCommonJS.goPage('MobWHInList.clt?bkStsCd=I&ctrtNo='+$("#ctrtNo option:selected").val()+'&orderNo='+$("#orderNo").val()+'&fmDate='+fmDate+'&toDate='+toDate+'&itemCd='+$("#itemCd").val()+'&lotAlias='+$("#lotAlias").val());
		},
		
		//#1699 [WMS4.0] OPUS and Mobile Inbound/Outbound Default 조회 기준일
		setDate : function(){
			var dateNow = new Date();
			var dateOpt = $('#dateOpt').val();
			
			if(dateOpt == "A"){//Previous and Next month
				$('#fmDate').datetimepicker('update', ComGetDateAdd(null, "M", -1) );
				$('#toDate').datetimepicker('update', ComGetDateAdd(null, "M", +1) );
			}
			if(dateOpt == "B"){//Current and Previous month
				$('#fmDate').datetimepicker('update', ComGetDateAdd(null, "M", -1) );
				$('#toDate').datetimepicker('update', dateNow );
			}
			if(dateOpt == "C"){//Current and Next month
				$('#fmDate').datetimepicker('update', dateNow );
				$('#toDate').datetimepicker('update', ComGetDateAdd(null, "M", +1) );
			}
			if(dateOpt == "D"){//Current and Last 90 days
				$('#fmDate').datetimepicker('update', ComGetDateAdd(null, "D", -90) );
				$('#toDate').datetimepicker('update', dateNow );
			}
		}
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
	<div class="ol-md-12 form-wrapper">
		<label for="order">Order #</label>
		<p><input id="orderNo" type="text" class="form-control" placeholder="Order #" barCode="true" aria-describedby="basic-addon1"></p>
	</div>
	<!-- #2332 [WMS4.0] MOBILE SEARCH CONDITION (S) -->
	<div class="ol-md-12 form-wrapper">
		<label for="order">SKU</label>
		<p><input id="itemCd" type="text" class="form-control" placeholder="Item #" barCode="true" aria-describedby="basic-addon1"></p>
	</div>
	<!-- #2332 [WMS4.0] MOBILE SEARCH CONDITION (E) -->
	<label for="estimateDate">Estimate Date</label>
	<div class="ol-md-12 form-wrapper">  <!-- #1699 [WMS4.0] OPUS and Mobile Inbound/Outbound Default 조회 기준일 -->
		<select id="dateOpt" class="form-control" onchange="whinSrchJS.setDate();">
			<option value="A">Previous and Next month</option>
			<option value="B">Current and Previous month</option>
			<option value="C">Current and Next month</option>
			<option value="D">Current and Last 90 days</option>
		</select>	
	</div>
	<div class="input-group">
		<input id="fmDate" type="text" style="width:100%" class="form-control col-xs-4" placeholder="Start Date" aria-describedby="sizing-addon" readonly><span class="input-group-addon"><span class="glyphicon glyphicon-remove" onClick="javascript:wmsCommonJS.removeFormVal('fmDate')"></span></span>
		<input id="toDate" type="text" style="width:100%" class="form-control col-xs-4" placeholder="End Date" aria-describedby="sizing-addon" readonly><span class="input-group-addon"><span class="glyphicon glyphicon-remove" onClick="javascript:wmsCommonJS.removeFormVal('toDate')"></span></span>
	</div>
</form>
</div>
<div class="navbar-fixed-bottom">
	<div class="btn-group btn-group-justified" role="group" aria-label="...">
	  <div class="btn-group" role="group">
	    <button id="btSearch" type="button" class="btn btn-primary footer-button" onClick="javascript:whinSrchJS.goInCompleteList();">Search</button>
	  </div>
	</div>
</div>