<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<!-- 공통 Header -->
<%@include file="./../../../../../../syscommon/header/CLTMobHeader.jsp"%>

<%
String ctrtNo   = request.getParameter("ctrtNo");
String planDate = request.getParameter("planDate");
String lotAlias = request.getParameter("lotAlias");		//#2807 [BINEX WMS4.0] LOT04, LOT05 NICKNAME CUSTOMIZATION
%>
<script type="text/javascript">
	$( document ).ready(function() {
		invtMoveListJS.selectInCompleteList();
	});
	var invtMoveListJS = {
		ctrtNo   : ('<%=ctrtNo%>' == 'null') ? '' : '<%=ctrtNo%>',
		planDate : ('<%=planDate%>' == 'null') ? '' : '<%=planDate%>',
		lotAlias : ('<%=lotAlias%>' == 'null') ? '' : '<%=lotAlias%>',	/* #2807 [BINEX WMS4.0] LOT04, LOT05 NICKNAME CUSTOMIZATION */
		selectInCompleteList : function(){
			var sendData = JSON.stringify({
				"ctrtNo":invtMoveListJS.ctrtNo,
				"planDate":invtMoveListJS.planDate
			});
			ajaxSendPost(invtMoveListJS.setInCompleteList, 'reqVal', '&goWhere=aj&bcKey=selectInvMoveList&data='+sendData, './GateServlet.gsl');
		},
		tempTr : $("<tr onClick=\"javascript:wmsCommonJS.goPage('MobInvtMoveItemList.clt?plan_no={}');\"></tr>"), 
		tempTd_1 : $("<td style=\"text-align: center;\" scope=\"row\"></td>"), 
		tempTd_2 : $("<td style=\"text-align: right;\"></td>"), 
		tempTd_3 : $("<td style=\"text-align: right;\"></td>"),
		tempTd_4 : $("<td style=\"text-align: right;\"></td>"),
		setInCompleteList : function(rtnVal){
			var returnVal = wmsCommonJS.ajaxRes(rtnVal)
			if(returnVal != false){
				if(returnVal.resultCode == "success"){
					// 검색 결과가 하나 인 경우 상세 페이지로 이동
					if(returnVal.moveCmpls.length == 1){
						$(location).attr('href', 'MobInvtMoveItemList.clt?plan_no='+returnVal.moveCmpls[0].plan_no+"&lotAlias="+invtMoveListJS.lotAlias);
					// 검색 결과가 없는 경우 얼럿 메시지 
					}else if (returnVal.moveCmpls.length == 0){
						wmsCommonJS.wmsMobAlert({title : "Notice", content : getLabel('MOB_SRCH_RESULT_MSG1'), page : "back"});
						
					// 검색 결과가 하나 이상 인 경우.
					}else{
						$(".content").html("");
						var content = "";
						$.each(returnVal.moveCmpls,function(index, value){
							var trTag = invtMoveListJS.tempTr.clone();
							//var trTag  =  $("<tr onClick=\"javascript:wmsCommonJS.goPage('/opusfwd/MobInvtMoveItemList.clt?plan_no='"+value.plan_no+");\"></tr>");
							var td1Tag = invtMoveListJS.tempTd_1.clone();
							var td2Tag = invtMoveListJS.tempTd_2.clone();
							var td3Tag = invtMoveListJS.tempTd_3.clone();
							var td4Tag = invtMoveListJS.tempTd_4.clone();
							
							td1Tag.append(value.plan_dt);
							td2Tag.append(value.sku);
							td3Tag.append($.commaSet(value.fr_ea_qty));
							td4Tag.append(value.plan_sts_cd_nm);
							//td2Tag.append("<a href='javascript:wmsCommonJS.goPage('/opusfwd/MobWHOutDtl.clt?wibBkNo="+value.wibBkNo+"')>"+value.ordNo+"</a>");
							
							trTag.append(td1Tag);
							trTag.append(td2Tag);
							trTag.append(td3Tag);
							trTag.append(td4Tag);
							
							$(".content").append(trTag[0].outerHTML.replaceAll("{}", value.plan_no+"&lotAlias="+invtMoveListJS.lotAlias));
						});
					}
				}
			}
		}
	}
</script>
	
<div class="well">
	<table class="table panel panel-default" border="0">
		<colgroup>
			<col width="110">
			<col width="80">
			<col width="60">
			<col width="*">
		</colgroup>	
		<thead>
			<tr>
				<th style="text-align: center;">Plan Date</th>
				<th style="text-align: right;">#of SKU</th>
				<th style="text-align: right;">Qty</th>
				<th style="text-align: right;">Status</th>
			</tr>
		</thead>
		<tbody class="content">

		</tbody>
	</table>
</div>