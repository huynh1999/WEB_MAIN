<%--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : WHInMgmtPrintOption.jsp
*@FileTitle  : WHInMgmtPrintOption
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
    <script type="text/javascript" src="./apps/fis/wms/inboundmanagement/script/WHInMgmtPrintOption.js?ver=<%=CLT_JS_VER%>"></script>
<%
	String req_wib_bk_no   = "";
	String req_bk_sts_cd   = "";
	String req_sum_bx_label_qty = "";
	try {
		req_wib_bk_no   = request.getParameter("wib_bk_no")== null?"":request.getParameter("wib_bk_no");
		req_bk_sts_cd   = request.getParameter("bk_sts_cd")== null?"":request.getParameter("bk_sts_cd");
		req_sum_bx_label_qty = request.getParameter("sum_bx_label_qty")== null?"0":request.getParameter("sum_bx_label_qty");
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
<input type="hidden" id="wib_bk_no" name="wib_bk_no" value="<%=req_wib_bk_no%>"/>
<input type="hidden" id="bk_sts_cd" name="bk_sts_cd" value="<%=req_bk_sts_cd%>"/>
<input type="hidden" id="title" name="title" value=""/>
<input type="hidden" id="file_name" name="file_name" value=""/>
<input type="hidden" id="rd_param" name="rd_param" value=""/>
<input type="hidden" id="sum_bx_label_qty" name="sum_bx_label_qty" value="<%=req_sum_bx_label_qty%>" />
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
			<!-- #6421 : [Hanaro] WMS issue (Locatoin, Excel Upload, Inventory movement) -->
			<table width="100%" id="mainTable_sheet1" border="0">
				<tr>
					<td>
					<h3 class="title_design"><bean:message key="Print_Option"/></h3>
					</td>
					<td style="display: none" id="detail_opt">
					<h3 class="title_design">Detailed Option</h3>
					</td>
				</tr> 
			</table>
			<table width="100%" id="mainTable_sheet1" border="0"> 
				<tr>
					<td style="height:27px" width="100px">
						<label for="chOption1"><bean:message key="Inbound_WorkSheet"/></label>
					</td>
					<td style="padding-left: 12px">
						<input type="checkbox" id="chOption1" name="chOption1" onclick="changePrintOption(this);"></input>
					</td>
					<td style="padding-left: 28px ;height:27px; display: none" id="chOption7_lbl">
						<label for="chOption7"><bean:message key="paper_size"/></label>
					</td>
					<td style="padding-left: 12px ;display: none" id="chOption7_val">
						<select id="option7_size" name="option7_size" style="width:80px;margin-left:20px;">
							<option value="L">Letter</option>
							<option value="4x6">4” X 6”</option>
						</select> 
					</td>
				</tr>
				<tr style="display: none;">
					<td style="height:27px" >
						<input type="checkbox" id="chOption2" name="chOption2" onclick="changePrintOption(this);"><label for="chOption2"><bean:message key="Inbound_OSDSheet"/></label></input>  
					</td>
				</tr>
				<tr style="display: none;">
					<td style="height:27px" >
						<input type="checkbox" id="chOption5" name="chOption5" onclick="changePrintOption(this);"><label for="chOption5"><bean:message key="Warehouse_Receipt"/></label></input>  
					</td>
				</tr>
			</table> 	
			<h3 class="title_design" style="display: none"><bean:message key="Label_Option"/></h3>
			<table width="100%" id="mainTable_sheet1" border="0"> 
				<tr style="display: none">
					<td style="height:25px">
						<input type="checkbox" id="chOption4" name="chOption4" onclick="changeLabelOption('BX', this);"><label for="chOption4"><bean:message key="Box_Label"/></label></input> 
					</td>
				</tr>
				<tr style="display: none">
					<td style="height:25px">
						<select id="box_lvl_opt" name="box_lvl_opt" style="width:80px;margin-left:20px;">
							<option value="4x3">4” X 3”</option>
							<option value="4x6">4” X 6”</option>
						</select>
					</td>
				</tr>
				<tr>
					<td style="height:27px" width="124px">
						<label for="chOption3"><bean:message key="Pallet_Label"/></label>
					</td>
					<td style="padding-left: 12px">
						<input type="checkbox" id="chOption3" name="chOption3" ></input>
					</td>
				</tr>
			</table>	
		</div>
	</div>
	<div class="wrap_result" style="display: none;">
		<div class="opus_design_grid clear">
			<script type="text/javascript">comSheetObject('sheet1');</script>
		</div>
	</div>
</form>
<%@include file="/apps/fis/wms/bizcommon/include_common.jsp"%>
