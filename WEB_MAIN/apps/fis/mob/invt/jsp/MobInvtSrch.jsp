<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>

<!-- 공통 Header -->
<%@include file="./../../../../../../syscommon/header/CLTMobHeader.jsp"%>

<script type="text/javascript">

	$(document).ready(function() {
		//#3557 [BINEX WMS] MOBILE - INVENTORY SEARCH 에 Contract 조회조건 추가
		//Contract Code Option 조회 설정
		invtSrchJS.selectCtrtCode();

		$('#itemSerNo, #licPlatNo').on("keypress", function(e){
			if(e.keyCode == '13') {
				invtSrchJS.goSearchList();
			}
		});

		$('#itemCd').on("keypress", function(e){
			if(e.keyCode == '13') {
				$('#licPlatNo').focus();
			}
		});

		$('#whLocNm').on("keypress", function(e){
			if(e.keyCode == '13') {
				$('#btSearch').focus();
			}
		});

		//검색 조건을 모두 입력하지 않은 상태로 Search 버튼을 클릭하면
		//메시지 출력 후 버튼으로 Focusing 되므로...
		$('#btSearch').focus(function() {
			if(invtSrchJS.nextFocus != "") {
				$(invtSrchJS.nextFocus).val("");
				$(invtSrchJS.nextFocus).focus();
				invtSrchJS.nextFocus = "";
			} else {
				invtSrchJS.nextFocus = "";
			}
		});

		$('#itemSerNo').focus();

	});

	var invtSrchJS = {
		nextFocus : "",
		selectCtrtCode : function () {
			ajaxSendPost(invtSrchJS.setCtrtCode, 'reqVal', '&goWhere=aj&bcKey=selectMobCtrtList', './GateServlet.gsl');
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
		goSearchList : function() {
			//#3557 [BINEX WMS] MOBILE - INVENTORY SEARCH 에 Contract 조회조건 추가
			var ctrtNo = $('#ctrtNo').val().trim();
			
			var itemSerNo = $('#itemSerNo').val().trim();
			var itemCd = $('#itemCd').val().trim();
			var licPlatNo = $('#licPlatNo').val().trim();
			var whLocNm = $('#whLocNm').val().trim();

			//#4107 [BINEX] WMS MOBILE - INVENTORY SEARCH BY SERIAL # ONLY - Contract No 검색 필수조건에서 제외 조치
 			//if(ctrtNo == '' ) {
			//	wmsCommonJS.wmsMobAlert({title : "Notice", content : 'Contract # is required.'});
			//	invtSrchJS.nextFocus = '#ctrtNo';
			//	return;
			//}else{
				if(itemSerNo == '' && itemCd == '' && licPlatNo == '' && whLocNm == '') {
					wmsCommonJS.wmsMobAlert({title : "Notice", content : getLabel('MOB_INVT_COND_CHECK_MSG')});
					invtSrchJS.nextFocus = '#itemSerNo';
					return;
				}
 			//}

			//#3557 [BINEX WMS] MOBILE - INVENTORY SEARCH 에 Contract 조회조건 추가
			//wmsCommonJS.goPage('MobInvtSrchList.clt?itemSerNo='+itemSerNo+'&itemCd='+itemCd+'&licPlatNo='+licPlatNo+'&whLocNm='+whLocNm);
			wmsCommonJS.goPage('MobInvtSrchList.clt?ctrtNo='+$("#ctrtNo option:selected").val()+'&itemSerNo='+itemSerNo+'&itemCd='+itemCd+'&licPlatNo='+licPlatNo+'&whLocNm='+whLocNm);

		}
	}
</script>

<div class="well">
	<!-- #3557 [BINEX WMS] MOBILE - INVENTORY SEARCH 에 Contract 조회조건 추가 -->
	<div class="ol-md-12 form-wrapper">
		<label for="order">Contract #</label>
		<select id="ctrtNo" class="form-control">
			<option value="">Contract</option>
		</select>
	</div>
	
	<div class="ol-md-12 form-wrapper">
		<label for="order">Serial #</label>
		<input type="text" id="itemSerNo" class="form-control" placeholder="Serial #" aria-describedby="basic-addon1">
	</div>
	<div class="ol-md-12 form-wrapper">
		<label for="order">SKU</label>
		<input type="text" id="itemCd" class="form-control" placeholder="Item #" aria-describedby="basic-addon1">
	</div>
	<div class="ol-md-12 form-wrapper">
		<label for="order">License Plate #</label>
		<input type="text" id="licPlatNo" class="form-control" placeholder="License Plate #" aria-describedby="basic-addon1">
	</div>
	<div class="ol-md-12 form-wrapper">
		<label for="order">Location</label>
		<input type="text" id="whLocNm" class="form-control" placeholder="Location" aria-describedby="basic-addon1">
	</div>
</div>
<div class="navbar-fixed-bottom">
	<div class="btn-group btn-group-justified" role="group" aria-label="...">
		<div class="btn-group" role="group">
			<button type="button" id="btSearch" class="btn btn-primary footer-button" onClick="javascript:invtSrchJS.goSearchList();">Search</button>
		</div>
	</div>
</div>