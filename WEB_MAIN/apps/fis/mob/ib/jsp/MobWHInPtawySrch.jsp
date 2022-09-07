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
		
		$("#frLocNm").val("QC");      //#2205 [WMS4.0]MOBILE PUTAWAY 화면 From Location Default QC 세팅
		whinPtawySrchJS.getLocation();//#2205 [WMS4.0]MOBILE PUTAWAY 화면 From Location Default QC 세팅

		//#2332 [WMS4.0] MOBILE SEARCH CONDITION
		$('#orderNo').keypress(function(e) {
			if(e.keyCode == '13') {
				$('#itemCd').focus();
			}
		});

		$('#itemCd, #frLocNm').keypress(function(e) {
			if(e.keyCode == '13') {
				whinPtawySrchJS.goPtawyList();
			}
		});

		//#2807 [BINEX WMS4.0] LOT04, LOT05 NICKNAME CUSTOMIZATION
		$('#ctrtNo').change(function(){
			wmsCommonJS.getCtrtLotAlias();
		});
	});

	var whinPtawySrchJS = {
		goPtawyList : function(){
			if($("#orderNo") != ""){
				//#2332 [WMS4.0] MOBILE SEARCH CONDITION
				//#2205 [WMS4.0]MOBILE PUTAWAY 화면 From Location Default QC 세팅
				wmsCommonJS.goPage('MobWHInPtawyList.clt?bkStsCd=X&ctrtNo='+$("#ctrtNo option:selected").val()+'&orderNo='+$("#orderNo").val()+'&frLocCd='+$("#frLocCd").val()+'&itemCd='+$("#itemCd").val()+'&lotAlias='+$("#lotAlias").val());
			}else{
				wmsCommonJS.wmsMobAlert({content : getLabel('MOB_IB_PTAWY_DATA_CHECK_MSG2'), page : "MobWHInSrch.clt"});
			}
		},
		//#2205 [WMS4.0]MOBILE PUTAWAY 화면 From Location Default QC 세팅
		getLocation :function(){
			if($("#frLocNm").val() == '' || $("#frLocNm").val() == null){
				$("#frLocCd").val("");
				$("#frLocNm").val("");				
			}else{
				ajaxSendPost(whinPtawySrchJS.setLocation, 'reqVal', '&goWhere=aj&bcKey=selectGetLocation&wh_loc_nm='+$("#frLocNm").val(), './GateServlet.gsl');
			}
		},
		setLocation : function(rtnVal){
			var returnVal = wmsCommonJS.ajaxRes(rtnVal)
			if(returnVal != false){
				if(returnVal.resultCode == "success"){
					$("#frLocCd").val(returnVal.wh_loc_cd);
					$("#frLocNm").val(returnVal.wh_loc_nm);
					return;
				}
			}			
			$("#frLocCd").val("");
			$("#frLocNm").val("");
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
		<input id="orderNo" type="text" class="form-control" placeholder="Order #" aria-describedby="basic-addon1">
	</div>
	<!-- #2332 [WMS4.0] MOBILE SEARCH CONDITION (S) -->
	<div class="ol-md-12 form-wrapper">
		<label for="order">SKU</label>
		<input id="itemCd" type="text" class="form-control" placeholder="Item #" aria-describedby="basic-addon1">
	</div>
	<!-- #2332 [WMS4.0] MOBILE SEARCH CONDITION (E) -->
	<div class="ol-md-12 form-wrapper">
		<label for="order">From Location</label>
		<!-- #2205 [WMS4.0]MOBILE PUTAWAY 화면 From Location Default QC 세팅 -->
		<input id="frLocNm" type="text" class="form-control" placeholder="From Location" aria-describedby="basic-addon1" onChange="whinPtawySrchJS.getLocation();">
		<input id="frLocCd" type="hidden" >
	</div>
</form>
</div>
<div class="navbar-fixed-bottom">
	<div class="btn-group btn-group-justified" role="group" aria-label="...">
	  <div class="btn-group" role="group">
	    <button id="btSearch" type="button" class="btn btn-primary footer-button" onClick="javascript:whinPtawySrchJS.goPtawyList();">Search</button>
	  </div>
	</div>
</div>