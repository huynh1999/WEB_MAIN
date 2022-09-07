<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<!-- 공통 Header -->
<%@include file="./../../../../../../syscommon/header/CLTMobHeader.jsp"%>

<%
//#3557 [BINEX WMS] MOBILE - INVENTORY SEARCH 에 Contract 조회조건 추가
String ctrtNo = request.getParameter("ctrtNo");

String itemSerNo = request.getParameter("itemSerNo");
String itemCd    = request.getParameter("itemCd");
String licPlatNo = request.getParameter("licPlatNo");
String whLocNm   = request.getParameter("whLocNm");
%>

<script type="text/javascript">
	$(document).ready(function() {
		invtSrchListJS.selectInvtSrchList();
	});

	var invtSrchListJS = {
		//#3557 [BINEX WMS] MOBILE - INVENTORY SEARCH 에 Contract 조회조건 추가
		ctrtNo : ('<%=ctrtNo%>' == 'null') ? '' : '<%=ctrtNo%>',
		
		itemSerNo : ('<%=itemSerNo%>' == 'null') ? '' : '<%=itemSerNo%>',
		itemCd    : ('<%=itemCd%>' == 'null') ? '' : '<%=itemCd%>',
		licPlatNo : ('<%=licPlatNo%>' == 'null') ? '' : '<%=licPlatNo%>',
		whLocNm   : ('<%=whLocNm%>' == 'null') ? '' : '<%=whLocNm%>',
		selectInvtSrchList : function(){
			var sendData = JSON.stringify({
				//#3557 [BINEX WMS] MOBILE - INVENTORY SEARCH 에 Contract 조회조건 추가
				"ctrtNo":invtSrchListJS.ctrtNo,
				
				"itemSerNo":invtSrchListJS.itemSerNo,
				"itemCd":invtSrchListJS.itemCd,
				"licPlatNo":invtSrchListJS.licPlatNo,
				"whLocNm":invtSrchListJS.whLocNm
			});
			ajaxSendPost(invtSrchListJS.setInvtSrchList, 'reqVal', '&goWhere=aj&bcKey=selectInvtSrchList&data='+sendData, './GateServlet.gsl');
		},
		//tempTr1 : $("<tr onClick=\"javascript:goDtlPage();\"></tr>"),
		tempTr1 : $("<tr></tr>"),
		tempTr2 : $("<tr></tr>"),
		tempTd_1_1 : $("<td rowspan=\"2\" style=\"text-align: center;\" scope=\"row\"></td>"),
		tempTd_1_2 : $("<td rowspan=\"2\" style=\"text-align: left;\"></td>"),
		tempTd_1_3 : $("<td style=\"text-align: left;\"></td>"),
		tempTd_1_4 : $("<td rowspan=\"2\" style=\"text-align: right;\"></td>"),
		tempTd_2_3 : $("<td style=\"text-align: left;\"></td>"),
		setInvtSrchList : function(rtnVal){
			var returnVal = wmsCommonJS.ajaxRes(rtnVal)
			
			//#3557 관련 Undefined 처리
			var checkedLicPlatNo1 = (returnVal.mobInvtItems[0].lic_plat_no == undefined) ? "" :  returnVal.mobInvtItems[0].lic_plat_no;
			var checkedItemSerNo1 = (returnVal.mobInvtItems[0].item_ser_no == undefined) ? "" :  returnVal.mobInvtItems[0].item_ser_no;
			
			if(returnVal != false){
				if(returnVal.resultCode == "success") {
					// 검색 결과가 하나 인 경우 상세 페이지로 이동
					if(returnVal.mobInvtItems.length == 1) {
						//#3557 [BINEX WMS] MOBILE - INVENTORY SEARCH 에 Contract 조회조건 추가
						//Contract 및 추가 조건 전달하여 검색결과 UNIQUE 하도록 수정 & 검색결과 하나인 경우와 여러개인 경우의 검색 조건 통일
						//$(location).attr('href', 'MobInvtSrchDtl.clt?itemCd='+returnVal.mobInvtItems[0].item_cd+'&itemSeq='+returnVal.mobInvtItems[0].item_seq+'&licPlatNo='+returnVal.mobInvtItems[0].lic_plat_no+'&itemSerNo='+returnVal.mobInvtItems[0].item_ser_no);
						$(location).attr('href', 'MobInvtSrchDtl.clt?whLocCd='+ returnVal.mobInvtItems[0].wh_loc_cd +'&ctrtNo='+returnVal.mobInvtItems[0].ctrt_no + '&wibBkNo='+ returnVal.mobInvtItems[0].wib_bk_no + '&itemCd='+returnVal.mobInvtItems[0].item_cd+'&itemSeq='+returnVal.mobInvtItems[0].item_seq+'&licPlatNo='+ checkedLicPlatNo1 +'&itemSerNo='+checkedItemSerNo1+"&lotId="+ returnVal.mobInvtItems[0].lot_id );

					// 검색 결과가 없는 경우 얼럿 메시지
					} else if (returnVal.mobInvtItems.length == 0) {
						wmsCommonJS.wmsMobAlert({title : "Notice", content : getLabel('MOB_SRCH_RESULT_MSG1'), page : "back"});
					// 검색 결과가 하나 이상 인 경우.
					} else {
						$(".content").html("");
						var content = "";
						$.each(returnVal.mobInvtItems,function(index, value){
							var trTag1 = invtSrchListJS.tempTr1.clone();
							var trTag2 = invtSrchListJS.tempTr2.clone();
							var td1Tag1 = invtSrchListJS.tempTd_1_1.clone();
							var td1Tag2 = invtSrchListJS.tempTd_1_2.clone();
							var td1Tag3 = invtSrchListJS.tempTd_1_3.clone();
							var td1Tag4 = invtSrchListJS.tempTd_1_4.clone();
							var td2Tag3 = invtSrchListJS.tempTd_2_3.clone();
							
							//#3557 관련 Undefined 처리
							var checkedLicPlatNo2 = (value.lic_plat_no == undefined) ? "" :  value.lic_plat_no;
							var checkedItemSerNo2 = (value.item_ser_no == undefined) ? "" :  value.item_ser_no;

							td1Tag1.append(value.wh_loc_nm);
							td1Tag2.append(value.item_cd+"<br/>"+value.item_nm);
							$(td1Tag2).attr("style", "color: #337ab7; text-decoration: underline; word-wrap: break-word;");

							//#3557 [BINEX WMS] MOBILE - INVENTORY SEARCH 에 Contract 조회조건 추가							
							//Inventory List -> Detail 이동 시 ctrtNo 파라미터 전달 및 추가 조건 전달하여 검색결과 UNIQUE 하도록 수정 & 검색결과 하나인 경우와 여러개인 경우의 검색 조건 통일
							$(td1Tag2).attr("onClick", "wmsCommonJS.goPage('MobInvtSrchDtl.clt?whLocCd="+ value.wh_loc_cd +"&ctrtNo="+value.ctrt_no+"&wibBkNo="+value.wib_bk_no+"&itemCd="+value.item_cd+"&itemSeq="+value.item_seq+"&licPlatNo="+ checkedLicPlatNo2 + "&itemSerNo=" + checkedItemSerNo2 +"&lotId="+ value.lot_id +"')");
							//$(td1Tag2).attr("onClick", "wmsCommonJS.goPage('MobInvtSrchDtl.clt?wibBkNo="+value.wib_bk_no+"&itemCd="+value.item_cd+"&itemSeq="+value.item_seq+"&licPlatNo="+value.lic_plat_no+"')");
							
							td1Tag3.append(value.lic_plat_no);
							td1Tag4.append(value.tot_qty+"<br/>"+value.pck_nm);
							td2Tag3.append(value.item_ser_no);

							trTag1.append(td1Tag1);
							trTag1.append(td1Tag2);
							trTag1.append(td1Tag3);
							trTag1.append(td1Tag4);
							trTag2.append(td2Tag3);

							$(".content").append(trTag1[0].outerHTML);
							$(".content").append(trTag2[0].outerHTML);
						});
					}
				}
			}
		}
	}

</script>

<div class="well">
	<table class="table panel panel-default" border="1">
		<thead>
			<tr>
				<th rowspan="2" style="text-align: center; vertical-align: middle;">Loc.</th>
				<th rowspan="2" style="text-align: center; vertical-align: middle;">SKU</th>
				<th style="text-align: center; vertical-align: middle;">LP#</th>
				<th rowspan="2" style="text-align: center; vertical-align: middle;">Qty</th>
			</tr>
			<tr>
				<th style="text-align: center;">Serial#</th>
			</tr>
		</thead>
		<tbody class="content" />
	</table>
</div>