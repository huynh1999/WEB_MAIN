<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<!-- 공통 Header -->
<%@include file="./../../../../../../syscommon/header/CLTMobHeader.jsp"%>
<%
String ctrtNo = request.getParameter("ctrtNo");
String orderNo = request.getParameter("orderNo");
String frLocCd = request.getParameter("frLocCd");  //#2205 [WMS4.0]MOBILE PUTAWAY 화면 From Location Default QC 세팅
String bkStsCd = request.getParameter("bkStsCd");
String itemCd  = request.getParameter("itemCd");   //#2332 [WMS4.0] MOBILE SEARCH CONDITION
String lotAlias = request.getParameter("lotAlias");	//#2807 [BINEX WMS4.0] LOT04, LOT05 NICKNAME CUSTOMIZATION
%>
<script type="text/javascript">
	$( document ).ready(function() {
		whibPtawyListJS.selectInPtawyList();
	});
	var whibPtawyListJS = {
			ctrtNo : ('<%=ctrtNo%>' == 'null') ? '' : '<%=ctrtNo%>',
			orderNo : ('<%=orderNo%>' == 'null') ? '' : '<%=orderNo%>',
			frLocCd : ('<%=frLocCd%>' == 'null') ? '' : '<%=frLocCd%>',   //#2205 [WMS4.0]MOBILE PUTAWAY 화면 From Location Default QC 세팅
			bkStsCd : ('<%=bkStsCd%>' == 'null') ? '' : '<%=bkStsCd%>',
			itemCd : ('<%=itemCd%>' == 'null') ? '' : '<%=itemCd%>',
			lotAlias : ('<%=lotAlias%>' == 'null') ? '' : '<%=lotAlias%>',
			selectInPtawyList : function(){
				var sendData = JSON.stringify({
					"ctrtNo":whibPtawyListJS.ctrtNo,
					"orderNo":whibPtawyListJS.orderNo,
					"bkStsCd":whibPtawyListJS.bkStsCd,
					"frLocCd":whibPtawyListJS.frLocCd,    //#2205 [WMS4.0]MOBILE PUTAWAY 화면 From Location Default QC 세팅
					"itemCd":whibPtawyListJS.itemCd       //#2332 [WMS4.0] MOBILE SEARCH CONDITION
				});
				ajaxSendPost(whibPtawyListJS.setIbPtawyList, 'reqVal', '&goWhere=aj&bcKey=selectIbPtawyList&data='+sendData, './GateServlet.gsl');
			},
			tempTr : $("<tr></tr>"), 
			tempTd_1 : $("<td scope=\"row\"></td>"), 
			tempTd_2 : $("<td></td>"), 
			setIbPtawyList : function(rtnVal){
				var returnVal = wmsCommonJS.ajaxRes(rtnVal)
				if(returnVal != false){
					if(returnVal.resultCode == "success"){
						// 검색 결과가 하나 인 경우 상세 페이지로 이동
						if(returnVal.ibPtawys.length == 1){
							//#2059 [WMS4.0] 모바일 Putawy 조회 화면 Contract 번호 미 입력 후 조회 시 검색 안됨
							//whibPtawyListJS.ctrtNo -> returnVal.ibPtawys[0].ctrt_no 변경
							$(location).attr('href', 'MobWHInPtawyDlt.clt?ctrtNo='+returnVal.ibPtawys[0].ctrt_no+'&wibInNo='+returnVal.ibPtawys[0].wib_in_no+'&lotId='+returnVal.ibPtawys[0].lot_id+'&itemSeq='+returnVal.ibPtawys[0].item_seq+'&lotAlias='+whibPtawyListJS.lotAlias);
						// 검색 결과가 없는 경우 얼럿 메시지 
						}else if (returnVal.ibPtawys.length == 0){
							wmsCommonJS.wmsMobAlert({content : getLabel('MOB_SRCH_RESULT_MSG1'), page : "back"});
						// 검색 결과가 하나 이상 인 경우.
						}else{
							$(".content").html("");
							var content = "";
							$.each(returnVal.ibPtawys,function(index, value){
								var trTag = whibPtawyListJS.tempTr.clone();
								var td1Tag = whibPtawyListJS.tempTd_1.clone();
								var td2Tag = whibPtawyListJS.tempTd_2.clone();
								var td3Tag = whibPtawyListJS.tempTd_2.clone();
								var td4Tag = whibPtawyListJS.tempTd_2.clone();
								
								td1Tag[0].setAttribute('style', 'color: #337ab7; text-decoration: underline')
								//#2059 [WMS4.0] 모바일 Putawy 조회 화면 Contract 번호 미 입력 후 조회 시 검색 안됨
								//whibPtawyListJS.ctrtNo -> value.ctrt_no 변경
								//#2807 [BINEX WMS4.0] LOT04, LOT05 NICKNAME CUSTOMIZATION
								td1Tag.append("<a href='javascript:wmsCommonJS.goPage(\"MobWHInPtawyDlt.clt?ctrtNo="+value.ctrt_no+"&wibInNo="+value.wib_in_no+"&lotId="+value.lot_id+"&itemSeq="+value.item_seq+"&lotAlias="+whibPtawyListJS.lotAlias+"\")'>"+value.item_cd + " : " + value.item_nm+"</a>");
								td2Tag.append(value.inbound_loc_nm);
								td3Tag.append(value.putaway_wh_loc_nm);
								td4Tag[0].setAttribute('style', 'text-align: right;')
								td4Tag.append(wmsCommonJS.numberWithCommas(Number(value.ea_qty)));
								
								trTag.append(td1Tag);
								trTag.append(td2Tag);
								trTag.append(td3Tag);
								trTag.append(td4Tag);
								
								$(".content").append(trTag[0].outerHTML.replaceAll("{}", value.wibBkNo));
							});
						}
					}
				}
			},
	}
</script>
<div class="well">
	<table class="table panel table-bordered panel-default">
		<thead>
			<tr>
				<th>SKU</th>
				<th>From</th>
				<th>To</th>
				<th>Qty</th>
			</tr>
		</thead>
		<tbody class="content">
		</tbody>
	</table>
</div>