<%--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : WHOutWorkSht.jsp
*@FileTitle  : Outbound Worksheet
*@author     : Khoa.Nguyen - DOU Network
*@version    : 1.0
*@since      : 2016/04/26
=========================================================--%>
<%@ page contentType="text/html; charset=UTF-8"%>
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
    <script language="javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_FRT.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_CODE_UTIL.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="apps/fis/wms/outboundmanagement/script/WaveSmpMgmtPrintOption.js?ver=<%=CLT_JS_VER%>"></script>
<%
	String wave_no = "";
	String allc_cnt_tot = "";
	String lp_cnt_tot = "";
	String callByScreen = "";
	
	try {
		wave_no = request.getParameter("wave_no") == null ? "" : request.getParameter("wave_no");
		allc_cnt_tot = request.getParameter("allc_cnt_tot") == null ? "0" : request.getParameter("allc_cnt_tot");
		lp_cnt_tot = request.getParameter("lp_cnt_tot") == null ? "0" : request.getParameter("lp_cnt_tot");
		callByScreen = request.getParameter("callByScreen") == null ? "" : request.getParameter("callByScreen");
	} catch (Exception e) {
		out.println(e.toString());
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
<input type="hidden" name="paper_size" id="paper_size" value="" />
<input type="hidden" name="f_cmd" id="f_cmd" value="" />
<input type="hidden" name="user_id" id="user_id" value="<%=userInfo.getUsrid()%>" />
<input type="hidden" id="wave_no" name="wave_no" value="<%=wave_no%>"/>
<input type="hidden" name="lp_cnt_tot" id="lp_cnt_tot" value="<%=lp_cnt_tot%>"/>
<input type="hidden" name="allc_cnt_tot" id="allc_cnt_tot" value="<%=allc_cnt_tot%>" />
<input type="hidden" name="callByScreen" id="callByScreen" value="<%=callByScreen%>" />
<input type="hidden" id="title" name="title" value=""/>
<input type="hidden" id="file_name" name="file_name" value=""/>
<input type="hidden" id="rd_param" name="rd_param" value=""/>
<div class="page_title_area clear">
		<h2 class="page_title">
			<span><bean:message key="Print_Option"/></span>
		</h2>
		<div class="opus_design_btn">
			 <button type="button" class="btn_normal" name="btnPrint" id="btnPrint" onClick="doWork('PRINT');"><bean:message key="Print"/></button><!-- 
			 --><button type="button" class="btn_normal" name="btnClose" id="btnClose" onClick="doWork('CLOSE');"><bean:message key="Close"/></button>
		</div>
</div>
<div class="wrap_search">
			<div class="opus_design_inquiry" style="height: 180px;">			
				<!-- <div class="layout_vertical_2" style="width:49%"> -->
					<div class="opus_design_inquiry" style="height:180px;">
						<table>
						    <colgroup>
			                    <col width="100" />
			                    <col width="50" />
			                    <col width="*" />
			                </colgroup>  
			                <tr id="outboundWorkSheetTR">
				                <th><label for="chOptWorkSht"><bean:message key="Outbound_WorkSheet"/></label></th>
				                <td>
				                	<input type="checkbox" name="chOptWorkSht" id="chOptWorkSht" />
				                </td>
			                </tr>
			                <tr>
				                <th><bean:message key="Picking_Sheet"/></th>
				                <td>
				                	<span class="dash">[&nbsp;&nbsp;&nbsp;</span><input type="checkbox" name="chOptPickShtByOrder" id="chOptPickShtByOrder" onclick="pick_opt_change('ORDER');"/><label for="chOptPickShtByOrder"><bean:message key="Order"/></label>
				                </td>
				                <td>
									<input type="checkbox" name="chOptPickShtByWave" id="chOptPickShtByWave" onclick="pick_opt_change('SKU');pick_by_sku_onclick(this);" /><label for="chOptPickShtByWave"><bean:message key="Wave"/></label><span class="dash">&nbsp;&nbsp;&nbsp;]</span>
				                </td>
			                </tr>
			                
			                <tr>
				                <th><bean:message key="Sorting_Sheet"/></th>
				                <td>
				                	<span class="dash">[&nbsp;&nbsp;&nbsp;</span><input type="checkbox" name="chOptSortSht" id="chOptSortSht" /><label for="chOptSortSht"><bean:message key="Ship_To"/></label><span class="dash">&nbsp;&nbsp;&nbsp;]</span>
				                </td>
			                </tr>
			                <tr id="outboundHOManifestTR">
				                <th><bean:message key="Outbound_HO_Manifest"/></th>
				                <td>
				                	<span class="dash">[&nbsp;&nbsp;&nbsp;</dash><input type="checkbox" name="chOptHOManifestShtByShipTo" id="chOptHOManifestShtByShipTo" onclick="complete_opt_change('SHIPTO');"/><label for="chOptHOManifestShtByShipTo"><bean:message key="Ship_To"/></label>
				                </td>
				                <td>
									<input type="checkbox" name="chOptHOManifestShtByOrder" id="chOptHOManifestShtByOrder" onclick="complete_opt_change('ORDER');"/><label for="chOptHOManifestShtByOrder"><bean:message key="Order"/></label><span class="dash">&nbsp;&nbsp;&nbsp;]</span>
				                </td>
			                </tr>
			                <tr id="goodsIssueTR">
			                	<th><label for="chOptGoodsIssue"><bean:message key="GOODS_ISSUE"/></label></th>
				                <td>
				                	<input type="checkbox" name="chOptGoodsIssue" id="chOptGoodsIssue" />
				                </td>
			                </tr>
			                <tr>
							<th><bean:message key="Print_LOT_Type"/></th>
							<td>
								<select name="prn_lot_tp" id="prn_lot_tp" style="width:120px">
									<option value="LOT01">Inbound Date</option>
									<option value="LOT02" selected="selected">LOT NO</option>
									<option value="LOT03">Expiration Date</option>
									<option value="LOT04">LOT04</option>
									<option value="LOT05">LOT05</option>
								</select>
							</td>
						</tr> 
			                <tr>
			                <th><bean:message key="Picking_Unit"/></th>
							<td>
								<select name="pick_unit" id="pick_unit" style="width:120px">
									<option value=""></option>
									<option value="EA">Handling Unit</option>
									<option value="IN">Package Unit</option>
									<option value="BX">Palletization</option>
								</select>
							</td>
			                </tr>                                              
						</table>
					</div>
				 <!-- </div> -->
				 <!-- <div class="layout_vertical_2" style="width:49%;padding-left:8px;" >
				<div class="opus_design_inquiry" style="height:180px;">
					<table>
						<colgroup>
							<col width="100">
							<col width="*">
						</colgroup>
						<tr>
							<th><bean:message key="Print_LOT_Type"/></th>
							<td>
								<select name="prn_lot_tp" id="prn_lot_tp" style="width:120px">
									<option value="LOT01">Inbound Date</option>
									<option value="LOT02" selected="selected">LOT NO</option>
									<option value="LOT03">Expiration Date</option>
									<option value="LOT03">LOT04</option>
									<option value="LOT04">LOT05</option>
								</select>
							</td>
						</tr>
						<tr>
							<th><bean:message key="Picking_Unit"/></th>
							<td>
								<select name="pick_unit" id="pick_unit" style="width:120px">
									<option value="EA" selected>EA</option>
									<option value="IN">IN</option>
									<option value="BX">BX</option>
									<option value="PL">PL</option>
								</select>
							</td>
						</tr>
					</table>
				</div>
			</div> -->
		</div>
		<div class="opus_design_grid clear"  style="display:none;">
			<script type="text/javascript">comSheetObject('sheet1');</script>
		</div>
		<div id="printArea" name="printArea"></div>
	</div>
</form>
<%-- <%@include file="/business/oms/bizcommon/include_common.jsp"%> --%>