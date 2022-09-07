<%--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : WHOutMgmtPrintOption.jsp
*@FileTitle  : Outbound Management Print Option Selection
*@author     : Tien.Duong - DOU Network
*@version    : 1.0
*@since      : 2016/08/31
=========================================================--%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ModalCalendar.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript" src="./apps/fis/wms/outboundmanagement/script/WHOutMgmtPrintOption.js?ver=<%=CLT_JS_VER%>"></script>
<%
	String req_wob_bk_no   = "";
	String wave_no   = "";
	String bk_sts_cd   = "";

	try {
		req_wob_bk_no   = request.getParameter("wob_bk_no")== null?"":request.getParameter("wob_bk_no");
		wave_no   = request.getParameter("wave_no")== null?"":request.getParameter("wave_no");
		bk_sts_cd   = request.getParameter("bk_sts_cd")== null?"":request.getParameter("bk_sts_cd");
	}catch(Exception e) {
		out.println(e.toString());
	}
	//LKH::#1939 [BINEX WMS4.0] PDF EXPORTED FILE NAME
	String rpt_file_name_title = request.getParameter("rpt_file_name_title") != null ? request.getParameter("rpt_file_name_title") : "";
	if (!"".equals(rpt_file_name_title)){
		rpt_file_name_title = rpt_file_name_title.trim();
	}
%>
<script type="text/javascript">
	function setupPage(){
		var errMessage = "";
		if (errMessage.length >= 1) {
			ComShowMessage(errMessage);
		} // end if
		loadPage(true);
	}
</script>

<form id="form" name="form">
	<input type="hidden" id="wob_bk_no" name="wob_bk_no" value="<%=req_wob_bk_no%>"/>
	<input type="hidden" id="wave_no" name="wave_no" value="<%=wave_no%>"/>
	<input type="hidden" id="bk_sts_cd" name="bk_sts_cd" value="<%=bk_sts_cd%>"/>
	<input type="hidden" id="title" name="title" value=""/>
	<input type="hidden" id="file_name" name="file_name" value=""/>
	<input type="hidden" id="rd_param" name="rd_param" value=""/>
	<!-- LKH::#1939 [BINEX WMS4.0] PDF EXPORTED FILE NAME -->
	<input type="hidden" name="rpt_file_name_title" value=""/>
	<input type="hidden" name="file_name_title" value="<%=rpt_file_name_title%>"/>

	<div class="page_title_area clear">
		<!-- opus_design_btn(S) -->
		<div class="opus_design_btn">
			<button type="button" class="btn_accent" name="btnPrint" id="btnPrint" onClick="doWork('PRINT');" ><bean:message key="Print"/></button><!--
			 --><button type="button" class="btn_normal" name="btnClose" id="btnClose" onClick="doWork('CLOSE');" ><bean:message key="Close"/></button>
		</div>
		<!-- opus_design_btn(E) -->
	</div>

	<!-- opus_design_inquiry(S) -->
	<div class="wrap_search">
		<div class="opus_design_inquiry entry_pannel ">
			<h3 class="title_design"><bean:message key="Print_Option"/></h3>
			<table width="100%" id="mainTable_sheet1" border="0">
				<tr>
					<td style="height:27px" width="100px">
						<label for="chOption1"><bean:message key="Outbound_WorkSheet"/></label>
					</td>
					<td style="padding-left: 12px"><input type="checkbox" id="chOption1" name="chOption1"></input></td>
				</tr>
				<tr style="display: none;">
					<th><bean:message key="Outbound_HO_Manifest"/></th>
					<td><span class="dash">[&nbsp;&nbsp;</dash><input type="checkbox" name="chOptHOManifestShtByShipTo" id="chOptHOManifestShtByShipTo" onclick="complete_opt_change('SHIPTO');"/><label for="chOptHOManifestShtByShipTo"><bean:message key="Ship_To"/></label><!--
					-->&nbsp;&nbsp;&nbsp;<input type="checkbox" name="chOptHOManifestShtByOrder" id="chOptHOManifestShtByOrder" onclick="complete_opt_change('ORDER');"/><label for="chOptHOManifestShtByOrder"><bean:message key="Order"/></label><span class="dash">&nbsp;&nbsp;]</span></td>
				</tr>
				<tr>
					<td style="height:27px" >
						<label for="chOption2"><bean:message key="Packing_Slip"/></label>
					</td>
					<td style="padding-left: 12px">
						<input type="checkbox" id="chOption2" name="chOption2"  />
						<input type="checkbox" id="chOption3" name="chOption3" disabled /><label for="chOption3">Round Up the Packing Unit</label>
					</td>
				</tr>
			</table>
		</div>
	</div>
	<div class="wrap_result" style="display: none;">
	</div>
</form>
<%-- <%@include file="/apps/fis/wms/bizcommon/include_common.jsp"%> --%>
