<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<!-- 공통 Header -->
<%@include file="./../../../../../../syscommon/header/CLTMobHeader.jsp"%>
<%
String customerNo = request.getParameter("customerNo");
String orderNo = request.getParameter("orderNo");
String bkStsCd = request.getParameter("bkStsCd");
String itemCd = request.getParameter("itemCd");			//#2332 [WMS4.0] MOBILE SEARCH CONDITION
String lotAlias = request.getParameter("lotAlias");		//#2807 [BINEX WMS4.0] LOT04, LOT05 NICKNAME CUSTOMIZATION
%>
<script type="text/javascript">
	$( document ).ready(function() {
		whoutListJS.selectPickingList();
	});
	var whoutListJS = {
		customerNo : ('<%=customerNo%>' == 'null') ? '' : '<%=customerNo%>',
		orderNo : ('<%=orderNo%>' == 'null') ? '' : '<%=orderNo%>',
		bkStsCd : ('<%=bkStsCd%>' == 'null') ? '' : '<%=bkStsCd%>',
		itemCd : ('<%=itemCd%>' == 'null') ? '' : '<%=itemCd%>',
		lotAlias : ('<%=lotAlias%>' == 'null') ? '' : '<%=lotAlias%>',
		selectPickingList : function(){
			/* #2332 [WMS4.0] MOBILE SEARCH CONDITION */
			ajaxSendPost(whoutListJS.setPickingList, 'reqVal', '&goWhere=aj&bcKey=selectPickingList&bkStsCd='+whoutListJS.bkStsCd+'&customerNo='+whoutListJS.customerNo+'&orderNo='+whoutListJS.orderNo+'&itemCd='+whoutListJS.itemCd, './GateServlet.gsl');
		},
		//tempTr : $("<tr onClick=\"javascript:wmsCommonJS.goPage('MobWHOutShpDtl.clt?wobBkNo={}');\"></tr>"), 
		tempTr : $("<tr></tr>"),  
		tempTd_1 : $("<td scope=\"row\"></td>"), 
		tempTd_2 : $("<td></td>"), 
		tempTd_3 : $("<td style=\"text-align: right;\"></td>"),
		setPickingList : function(rtnVal){
			var returnVal = wmsCommonJS.ajaxRes(rtnVal)
			if(returnVal != false){
				if(returnVal.resultCode == "success"){
					if(returnVal.pickings.length == 1){
						$(location).attr('href', 'MobWHOutShpDtl.clt?wobBkNo='+returnVal.pickings[0].wobBkNo+'&waveNo='+returnVal.pickings[0].waveNo+"&lotAlias="+whoutListJS.lotAlias);
					}else if (returnVal.pickings.length == 0){
						wmsCommonJS.wmsMobAlert({content : getLabel('MOB_SRCH_RESULT_MSG1'),page:"back"});
						//$.historyBack();
					}else{
						$(".content").html("");
						var content = "";
						$.each(returnVal.pickings,function(index, value){
							// 객체 생성
							var trTag = whoutListJS.tempTr.clone();
							var td1Tag = whoutListJS.tempTd_1.clone();
							var td2_1Tag = whoutListJS.tempTd_2.clone();
							var td2_2Tag = whoutListJS.tempTd_2.clone();
							var td3Tag = whoutListJS.tempTd_3.clone();
							
							// 값 셋팅.
							td1Tag.append("<a href=\"javascript:wmsCommonJS.goPage('MobWHOutShpDtl.clt?wobBkNo="+value.wobBkNo +"&waveNo="+value.waveNo+"&lotAlias="+whoutListJS.lotAlias+"')\">"+value.orderNo+"</a>");
							td2_1Tag.append(value.customerNo);
							td2_2Tag.append(value.refNo);
							td3Tag.append($.commaSet(eval(value.shQty)));
							
							trTag.append(td1Tag);
							trTag.append(td2_1Tag);
							trTag.append(td2_2Tag);
							trTag.append(td3Tag);
							
							$(".content").append(trTag[0].outerHTML.replaceAll("{}", value.wobBkNo));
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
				<th>Qty</th>
			</tr>
		</thead>
		<tbody class="content">

		</tbody>
	</table>
</div>