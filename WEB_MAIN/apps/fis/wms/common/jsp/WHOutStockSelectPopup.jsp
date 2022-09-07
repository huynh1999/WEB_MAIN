
<%--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : WHOutStockSelectPopup.jsp
*@FileTitle  : Stock Selection
*@author     : Nam.Tran - DOU Network
*@version    : 1.0
*@since      : 2015/04/14
=========================================================--%>

<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoMessage.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/ModalCalendar.js?ver=<%=CLT_JS_VER%>"></script>
    
	<script type="text/javascript" src="./js/common/message/<%=CLT_MSG_PATH%>/WMS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script> 	
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="./apps/fis/wms/common/js/WHOutStockSelectPopup.js?ver=<%=CLT_JS_VER%>"></script>

 <%@ page import="com.clt.syscommon.response.CommonEventResponse"%>
<bean:define id="cdMap"  name="EventResponse" property="mapVal"/>

<%

	String ctrt_no = "";
	String ctrt_nm = "";
	String wh_cd = "";	
    String wh_nm = "";	
	String owner_cd = "";
	String owner_nm = "";
	
	String item_cd = "";
	String item_nm = "";	
	
	String call_tp = "";
	
	String alloc_flg = "";
	String move_flg  = "";
	String putaway_flg = "";

	try {
		ctrt_no = request.getParameter("ctrt_no") == null ? "" : request.getParameter("ctrt_no");
		ctrt_nm = request.getParameter("ctrt_nm") == null ? "" : request.getParameter("ctrt_nm");
		wh_cd = request.getParameter("wh_cd") == null ? "" : request.getParameter("wh_cd");
		owner_cd = request.getParameter("owner_cd") == null ? "" : request.getParameter("owner_cd");
		owner_nm = request.getParameter("owner_nm") == null ? "" : request.getParameter("owner_nm");		
		item_cd = request.getParameter("item_cd") == null ? "" : request.getParameter("item_cd");
		item_nm = request.getParameter("item_nm") == null ? "" : request.getParameter("item_nm");
		call_tp = request.getParameter("call_tp") == null ? "" : request.getParameter("call_tp");
		
		alloc_flg = request.getParameter("f_alloc_flg");
		if(alloc_flg==null){
			alloc_flg = "";
		} 
		move_flg = request.getParameter("f_move_flg");
		if(move_flg==null){
			move_flg = "";
		}
		
		putaway_flg = request.getParameter("f_putaway_flg");
		if(putaway_flg==null){
			putaway_flg = "";
		}
		
	} catch (Exception e) {
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
	
	var WHCDLIST = "";
	var WHNMLIST = "";
	<bean:define id="MsList" name="cdMap" property="warehouse"/>
    <logic:iterate id="WhVO" name="MsList">
           WHCDLIST+= '|';
           WHNMLIST+= '|';
           WHCDLIST+= '<bean:write name="WhVO" property="wh_cd"/>';
           WHNMLIST+= '<bean:write name="WhVO" property="wh_nm"/>';
    </logic:iterate>
</script>

<form id="form" name="form">
<input type="hidden" name="f_cmd">
<input type="hidden" id="call_tp" name="call_tp" value="<%=call_tp%>" />

<input type="hidden" id="g_item_cd" name="g_item_cd" value="<%=item_cd%>" />
<input type="hidden" id="g_item_nm" name="g_item_nm" value="<%=item_nm%>" />

<input type="hidden" id="g_wh_cd" name="g_wh_cd" value="<%=wh_cd%>" />

<input type="hidden" name="f_alloc_flg"  		value="<%=alloc_flg%>">
<input type="hidden" name="f_move_flg"  		value="<%=move_flg%>">
<input type="hidden" name="f_putaway_flg"  		value="<%=putaway_flg%>">

<div class="page_title_area clear">
	<!-- page_title(S) -->
	<h2 class="page_title">
			<span><bean:message key="Stock_Selection"/></span>
		</h2>
	<!-- page_title(E) -->
	<!-- opus_design_btn(S) -->
	<div class="opus_design_btn">
			<button type="button" class="btn_accent" name="btn_Search" id="btn_Search" onClick="doWork('SEARCHLIST');"><bean:message key="Search"/></button><!-- 
			 --><button type="button" class="btn_normal" name="btn_OK" id="btn_OK" onClick="doWork('btn_OK');"><bean:message key="OK"/></button><!-- 
			 --><button type="button" class="btn_normal" name="btn_Close" id="btn_Close" onClick="doWork('CLOSE');"><bean:message key="Close"/></button>
	</div>
	<!-- opus_design_btn(E) -->
	<!-- page_location(S) -->
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
                    <col width="150" />
                    <col width="150" />
                    <col width="150" />
                    <col width="150" />
                    <col width="*"/>
                </colgroup>
                <tbody>
					<tr>
						<th><bean:message key="Warehouse"/></th>
						<td>
								<bean:define id="MsList" name="cdMap" property="warehouse"/>
								<select name="wh_cd" id="wh_cd" class="search_form" style="width:182px;" disabled="disabled">
									<option value=""></option>
									<logic:iterate id="codeVO" name="MsList">
										<option value='<bean:write name="codeVO" property="wh_cd"/>'><bean:write name="codeVO" property="wh_nm"/></option>
									</logic:iterate>
								</select>
							<%-- 	
							<input name="wh_cd" type="text" class="L_input_R" id="wh_cd" value="<%=wh_cd%>" style="width:68px;" readonly/><!-- 
							 --><input name="wh_nm" type="text" class="L_input_R" id="wh_nm" value="<%=wh_nm%>" style="width:110px;" readonly/><!-- 
						 --> --%></td>
						<th><bean:message key="Contract_No1"/></th>
						<td>
							<input name="ctrt_no" dataformat="engup" otherchar="-_" type="text" class="L_input_R" id="ctrt_no" value="<%=ctrt_no%>" style="width:85px;" readonly/><!-- 
							 --><input name="ctrt_nm" type="text" dataformat="engup" otherchar = " ()-_" class="L_input_R" id="ctrt_nm" value="<%=ctrt_nm%>" style="width:130px;" readonly/><!-- 
						 --></td>
	                    <th><bean:message key="Item"/></th>
	                    <td>
	                    
	                    <!-- #3622 [J&A] Outbound stock selection item code search 검색 조건 재변경 -->
	                    	<!-- #1085 [WMS4.0]Stock Selection 검색조건 변경 -->
							<input name="item_cd" otherchar = "-" id = "item_cd" type="text" class="L_input" style="width:204px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);" maxlength="20" /> 
							<%-- <select name="item_cd" id="item_cd" class="search_form" style="width:204px;">
								<option value=""></option>
								<logic:iterate id="skuitem" name="skuCd">
									<option value='<bean:write name="skuitem" property="item_cd"/>'><bean:write name="skuitem" property="item_cd"/> : <bean:write name="skuitem" property="item_nm"/></option>
								</logic:iterate>
							</select> --%>
	                    </td>
					</tr>
	                <tr>
						<th><bean:message key="Lot_ID"/></th>
						<td>
							<input name="fix_lot_id" type="text" class="L_input" id="fix_lot_id" style="width:182px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);" maxlength="16" /><!-- 
						 --></td>
						<th><bean:message key="Location"/></th>
						<td>
							<input name="wh_loc_nm" id = "wh_loc_nm" type="text" class="L_input" style="width:190px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);getLocationInfo()" OnKeyDown="if(event.keyCode==13){getLocationInfo();}"/><!-- 
							 --><button type="button" name="btn_wh_loc_cd" id="btn_wh_loc_cd" class="input_seach_btn" onClick="doWork('btn_wh_loc_cd');" tabindex="-1"></button><!-- 
							 --><input type="hidden" id="wh_loc_cd" name="wh_loc_cd" />
						</td>					
						                
					    <th><bean:message key="Inbound_Date"/></th>
						 <td><input name="inbound_dt_from" id="inbound_dt_from" type="text" class="L_input"  maxlength="10" style="width:75px;" 
						onblur="chkCmprPrd(firCalFlag, false, this, this, form.inbound_dt_to);firCalFlag=false;" 
						onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};"
						onkeypress="onlyNumberCheck();" onkeyup="mkDateFormatType(this, event, false,1)"/><span class="dash">~</span><!--
						--><input name="inbound_dt_to" id="inbound_dt_to" type="text" class="L_input"  maxlength="10" style="width:75px;" 
						onblur="chkCmprPrd(firCalFlag, false, this, form.inbound_dt_from, this);firCalFlag=false;" 
						onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};"
						onkeypress="onlyNumberCheck();" onkeyup="mkDateFormatType(this, event, false,1)"/><!--
						--><button class="calendar" tabindex="-1" type="button" name="btn_inbound_dt_to" id="btn_inbound_dt_to" onClick="doDisplay('DATE11', form);"></button>
						</td>
	                </tr>
					<tr>
						<th><bean:message key="Item_Lot_No"/></th>
						<td>
							<input name="lot_no" type="text" class="L_input" id="lot_no" style="width:182px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);" maxlength="16" /><!-- 
						 --></td>
	                    <th><bean:message key="Reference_No"/></th>
	                    <td>
	                        <input name="ref_no" type="text" class="L_input" id="ref_no" style="width:219px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);" maxlength="100" />
	                    </td>
						<th><bean:message key="LP#"/></th>
	                    <td>
	                        <input name="lic_plat_no" id="lic_plat_no" type="text" style="width:204px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);" maxlength="100" />
	                    </td>
					</tr>     
				</tbody>           
			</table>
	</div>
	</div>

<!-- opus_design_inquiry(E) -->
	<div class="wrap_result">
	<!-- opus_design_grid(S) -->
	<div class="opus_design_grid clear">
		<script type="text/javascript">comSheetObject('sheet1');</script>
	</div>
	</div>

</form>
<%@include file="/apps/fis/wms/bizcommon/include_common.jsp"%>
