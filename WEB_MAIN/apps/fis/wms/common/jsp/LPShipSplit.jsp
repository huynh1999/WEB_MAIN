
<%--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : LPShipSplit.do
*@FileTitle  : Shipment Split
*@author     : Nam.Tran - DOU Network
*@version    : 1.0
*@since      : 2015/04/21
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
    <script type="text/javascript" src="./apps/fis/wms/common/js/LPShipSplit.js?ver=<%=CLT_JS_VER%>"></script>
    
 	<script type="text/javascript" src="./js/common/message/<%=CLT_MSG_PATH%>/WMS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
<%
	String consol_no 	= "";
	String shipno 		= "";
	String shipno_seq	= "";
	String item_lot 	= "";
	String lot_id 		= "";
	String ttl_ea_qty 	= "";
	String item 		= "";
	String item_name 	= "";
	String tree_name 	= "";
	try {
		consol_no 	= request.getParameter("consol_no")== null?"":request.getParameter("consol_no");
		shipno 		= request.getParameter("shipno")== null?"":request.getParameter("shipno");
		shipno_seq 	= request.getParameter("shipno_seq")== null?"":request.getParameter("shipno_seq");
		item_lot 	= request.getParameter("item_lot")== null?"":request.getParameter("item_lot");
		lot_id 		= request.getParameter("lot_id")== null?"":request.getParameter("lot_id");
		ttl_ea_qty 	= request.getParameter("ttl_ea_qty")== null?"":request.getParameter("ttl_ea_qty");
		item 		= request.getParameter("item")== null?"":request.getParameter("item");
		item_name 	= request.getParameter("item_name")== null?"":request.getParameter("item_name");
		tree_name 	= request.getParameter("tree_name")== null?"":request.getParameter("tree_name");
		
	}catch(Exception e) {
		out.println(e.toString());
	}	
%>

<script type="text/javascript">
	var almightyFlag = false;
	function setupPage(){
		var errMessage = "";
		if (errMessage.length >= 1) {
			ComShowMessage(errMessage);
		} // end if
		loadPage(true);
	}
</script>

<form id="form" name="form">
<input type="hidden" id="f_cmd" value="0"/> 
<input type="hidden" name="user_id" 	value="<%=userInfo.getUsrid()%>">
<input type="hidden" name="org_cd" 		value="<%=userInfo.getOfc_cd()%>">
<input type="hidden" name="shipno" 		value="<%=shipno%>" />
<input type="hidden" name="shipno_seq" 	value="<%=shipno_seq%>" />
<input type="hidden" name="consol_no" 	value="<%=consol_no%>" />
<input type="hidden" name="tree_name" 	value="<%=tree_name%>" />

<div class="page_title_area clear">
	<!-- page_title(S) -->
	<h2 class="page_title"><span><bean:message key="Shipment_Split"/></span></h2>
	<!-- page_title(E) -->
	<div class="opus_design_btn">
		<button type="button" class="btn_accent" name="btn_Apply" id="btn_Apply" onClick="doWork('btn_Apply');"><bean:message key="Apply"/></button><!-- 
		 --><button type="button" class="btn_normal" name="btn_Close" id="btn_Close" onClick="doWork('CLOSE');"><bean:message key="Close"/></button>
	</div>
	<div class="location">
		<span></span>
	</div>
	<!-- page_location(E) -->
</div>

<div class= "wrap_search">
	<div class="opus_design_inquiry entry_pannel">
		<table>
		    <colgroup>
	            <col width="50" />
	            <col width="100" />
	            <col width="142" />
	            <col width="*" />
             </colgroup>
	             <tbody>
					<tr>
						<th><bean:message key="Item"/></th>
						<td colspan="3">
							<input type="text" id="item" name="item" class="Readonly" value="<%=item%>" style="width: 125px" readonly/><!-- 
							 --><input type="text" id="item_name" name="item_name"  class="Readonly" value="<%=item_name%>" style="width:270px" readonly/>
						</td>
					</tr>
					<tr>
						<th><bean:message key="Item_LOT"/></th>
						<td><input type="text" id="item_lot" name="item_lot" class="Readonly" value="<%=item_lot%>" style="width: 125px" readonly/></td>
						<th><bean:message key="LOT_ID"/></th>
						<td><input type="text" id="lot_id" name="lot_id" class="Readonly" value="<%=lot_id%>" style="width: 125px" readonly/></td>
					</tr>
					<tr>
						<th><bean:message key="TTL_EA_Qty"/></th>
						<td colspan="3"><input type="text" id="ttl_ea_qty" name="ttl_ea_qty" class="Readonly" value="<%=ttl_ea_qty%>" style="width:125px;text-align:right" readonly/></td>
					</tr>
					
					<tr>
						<th><bean:message key="Split_Qty"/></th>
						<td colspan="3">
						    <input type="text" id="sp_qty" name="sp_qty" dataformat="float" class="L_input" style="width: 125px;text-align:right" /><!-- 
						     --><input type="checkbox" id="sp_eq" name="sp_eq"/><label for="sp_eq"><bean:message key="Split_Equally"/></label>
						</td>
						<th></th>
					</tr>
				</tbody>
		</table>
	</div>
</div>

<!-- opus_design_inquiry(E) -->
<div class="wrap_result">
	
	<div class="opus_design_grid clear">
	<!-- opus_design_grid(S) -->
	<div class="opus_design_btn">
		<button type="button" class="btn_normal" name="btn_Split" id="btn_Split" onClick="doWork('btn_Split');"><bean:message key="Split"/></button><!-- 
		 --><button type="button" class="btn_normal" name="btn_Delete" id="btn_Delete" onClick="doWork('btn_Delete');"><bean:message key="Delete"/></button><!-- 
	 --></div>
		<script type="text/javascript">comSheetObject('sheet1');</script>
	</div>
</div>
</form>
<%@include file="/apps/fis/wms/bizcommon/include_common.jsp"%>

