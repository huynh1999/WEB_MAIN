<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<!-- 공통 Header -->
<%@include file="./../../../../../../syscommon/header/CLTMobHeader.jsp"%>
<%
String ctrtNo = request.getParameter("ctrtNo");
String orderNo = request.getParameter("orderNo");
String fmDate = request.getParameter("fmDate");
String toDate = request.getParameter("toDate");
String bkStsCd = request.getParameter("bkStsCd");
String itemCd = request.getParameter("itemCd");		//#2332 [WMS4.0] MOBILE SEARCH CONDITION
String lotAlias = request.getParameter("lotAlias");	//#2807 [BINEX WMS4.0] LOT04, LOT05 NICKNAME CUSTOMIZATION
%>
<script type="text/javascript">
	$( document ).ready(function() {
		whibListJS.selectInCompleteList();
	});
	var whibListJS = {
		ctrtNo : ('<%=ctrtNo%>' == 'null') ? '' : '<%=ctrtNo%>',
		orderNo : ('<%=orderNo%>' == 'null') ? '' : '<%=orderNo%>',
		fmDate : ('<%=fmDate%>' == 'null') ? '' : '<%=fmDate%>',
		toDate : ('<%=toDate%>' == 'null') ? '' : '<%=toDate%>',
		bkStsCd : ('<%=bkStsCd%>' == 'null') ? '' : '<%=bkStsCd%>',
		itemCd : ('<%=itemCd%>' == 'null') ? '' : '<%=itemCd%>',
		lotAlias : ('<%=lotAlias%>' == 'null') ? '' : '<%=lotAlias%>',
		selectInCompleteList : function(){
			var sendData = JSON.stringify({
				"ctrtNo":whibListJS.ctrtNo,
				"orderNo":whibListJS.orderNo,
				"fmDate":whibListJS.fmDate,
				"toDate":whibListJS.toDate,
				"bkStsCd":whibListJS.bkStsCd,
				"itemCd":whibListJS.itemCd     /* #2332 [WMS4.0] MOBILE SEARCH CONDITION */
			});
			ajaxSendPost(whibListJS.setInCompleteList, 'reqVal', '&goWhere=aj&bcKey=selectInCompleteList&data='+sendData, './GateServlet.gsl');
		},
		tempTr : $("<tr onClick=\"javascript:wmsCommonJS.goPage('MobWHInDtl.clt?wibBkNo={}');\"></tr>"), 
		tempTd_1 : $("<td scope=\"row\"></td>"), 
		tempTd_2 : $("<td></td>"), 
		setInCompleteList : function(rtnVal){
			var returnVal = wmsCommonJS.ajaxRes(rtnVal)
			if(returnVal != false){
				if(returnVal.resultCode == "success"){
					// 검색 결과가 하나 인 경우 상세 페이지로 이동
					if(returnVal.ibCmpls.length == 1){
						$(location).attr('href', 'MobWHInDtl.clt?wibBkNo='+returnVal.ibCmpls[0].wibBkNo+'&lotAlias='+whibListJS.lotAlias);
					// 검색 결과가 없는 경우 얼럿 메시지 
					}else if (returnVal.ibCmpls.length == 0){
						wmsCommonJS.wmsMobAlert({content : getLabel('MOB_SRCH_RESULT_MSG1'), page : "MobWHInSrch.clt"});
					// 검색 결과가 하나 이상 인 경우.
					}else{
						$(".content").html("");
						var content = "";
						$.each(returnVal.ibCmpls,function(index, value){
							var trTag = whibListJS.tempTr.clone();
							var td1Tag = whibListJS.tempTd_1.clone();
							var td2Tag = whibListJS.tempTd_2.clone();
							var td3Tag = whibListJS.tempTd_2.clone();
							
							td1Tag.append("<a href='javascript:wmsCommonJS.goPage('MobWHOutDtl.clt?wibBkNo="+value.wibBkNo+"')>"+value.ordNo+"</a>");
							td2Tag.append(value.ctrtNm);
							td3Tag.append(value.refNo);
							
							trTag.append(td1Tag);
							trTag.append(td2Tag);
							trTag.append(td3Tag);
							
							$(".content").append(trTag[0].outerHTML.replaceAll("{}", value.wibBkNo+'&lotAlias='+whibListJS.lotAlias));
						});
					}
				}
			}
		}
	}
</script>
<div class="well">
	<table class="table panel panel-default">
		<thead>
			<tr>
				<th>Order#</th>
				<th>Customer</th>
				<th>Ref#</th>
			</tr>
		</thead>
		<tbody class="content">

		</tbody>
	</table>
</div>