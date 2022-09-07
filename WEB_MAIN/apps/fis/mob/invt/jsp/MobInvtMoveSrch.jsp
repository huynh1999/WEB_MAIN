<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<!-- 공통 Header -->
<%@include file="./../../../../../../syscommon/header/CLTMobHeader.jsp"%>

<script type="text/javascript">
	$( document ).ready(function() {
		invtMoveSrchJS.selectCtrtCode();

		//#2807 [BINEX WMS4.0] LOT04, LOT05 NICKNAME CUSTOMIZATION
		wmsCommonJS.getCtrtLotAlias();

		//alert(wmsCommonJS.getToDate());
		//console.log(new Date().format("dd/MM/yyyy"));
		//$("#planDate").val(new Date().format("MM-dd-yyyy"));
		//$("#planDate").datetimepicker('setDate', new Date());

		//#2807 [BINEX WMS4.0] LOT04, LOT05 NICKNAME CUSTOMIZATION
		$('#ctrtNo').change(function(){
			wmsCommonJS.getCtrtLotAlias();
		});

	});

	$(window).on('load', function(){
		$('#planDate').datetimepicker({
			format: 'mm-dd-yyyy',
		    todayBtn:  1,
			autoclose: 1,
			todayHighlight: 1,
			startView: 2,
			minView: 2,
			forceParse: 0
		});
		$("#planDate").datetimepicker('update', new Date());
		
	});
	var invtMoveSrchJS = {
		selectCtrtCode : function () {
			ajaxSendPost(invtMoveSrchJS.setCtrtCode, 'reqVal', '&goWhere=aj&bcKey=selectMobCtrtList', './GateServlet.gsl');
		},
		setCtrtCode : function(rtnVal){
			var returnVal = wmsCommonJS.ajaxRes(rtnVal)
			if(returnVal != false){
				if(returnVal.resultCode == "success"){
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
		goSearchList : function(){
			var fmDate = $("#planDate").val().split("-")[2] + $('#planDate').val().split("-")[0] + $('#planDate').val().split("-")[1];
			fmDate = (fmDate == 'NaN') ? '' : fmDate;
			wmsCommonJS.goPage('MobInvMoveList.clt?planDate='+fmDate+'&ctrtNo='+$("#ctrtNo option:selected").val()+'&lotAlias='+$("#lotAlias").val());
		}
	}
</script>	

<div class="well">
	<div class="ol-md-12 form-wrapper">
		<label for="order">Contract #</label>
		<select id="ctrtNo" class="form-control">
			<option value="">Contract</option>
		</select>
		<input type="hidden" id="lotAlias" />	<!-- #2807 [BINEX WMS4.0] LOT04, LOT05 NICKNAME CUSTOMIZATION -->
	</div>
	<label for="estimateDate">Plan Date</label>
	<div class="input-group">
		<input id="planDate" type="text" style="width:100%" class="form-control col-xs-4" placeholder="Plan Date" aria-describedby="sizing-addon" readonly><span class="input-group-addon"><span class="glyphicon glyphicon-remove" onClick="javascript:wmsCommonJS.removeFormVal('planDate')"></span></span>
	</div>
</div>
<div class="navbar-fixed-bottom">
	<div class="btn-group btn-group-justified" role="group" aria-label="...">
	  <div class="btn-group" role="group">
	    <button type="button" class="btn btn-primary footer-button"  onClick="javascript:invtMoveSrchJS.goSearchList();">Search</button>
	  </div>
	</div>
</div>