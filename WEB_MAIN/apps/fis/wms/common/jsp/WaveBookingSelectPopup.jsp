<%--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : WaveBookingSelectPopup.jsp
*@FileTitle  : Wave Booking Select Popup
*@author     : Bao.Huynh - DOU Network
*@version    : 1.0
*@since      : 2015/04/20
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
<script type="text/javascript" src="./apps/fis/wms/common/js/WaveBookingSelectPopup.js?ver=<%=CLT_JS_VER%>"></script>

 	<script type="text/javascript" src="./js/common/message/<%=CLT_MSG_PATH%>/WMS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
<bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
<bean:define id="wh_combo" name="cdMap" property="wh_combo"/>
<%
	String ctrt_no = "";
	String ctrt_nm = "";
	String wh_cd = "";	
    String wh_nm = "";	

	try {
		ctrt_no = request.getParameter("ctrt_no") == null ? "" : request.getParameter("ctrt_no");
		ctrt_nm = request.getParameter("ctrt_nm") == null ? "" : request.getParameter("ctrt_nm");
		wh_cd = request.getParameter("wh_cd") == null ? "" : request.getParameter("wh_cd");
		wh_nm = request.getParameter("wh_nm") == null ? "" : request.getParameter("wh_nm");		
		
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
	var wh_comboCode = "";
	var wh_comboText = "";
	
	<logic:iterate id="WhLstVO" name="wh_combo">
	wh_comboCode+= '<bean:write name="WhLstVO" property="wh_cd"/>' + '|';
	wh_comboText+= '<bean:write name="WhLstVO" property="wh_nm"/>' + '|';
</logic:iterate>
</script>
	<form id="form" name="form">
	<input type="hidden" id="f_cmd"/>
	<div class="page_title_area clear">
		<!-- page_title(S) -->
		<h2 class="page_title">
				<span><bean:message key="Wave_Order_List_Booking_Selection"/></span>
		</h2>
		<!-- page_title(E) -->
		<!-- opus_design_btn(S) -->
		<div class="opus_design_btn">
			<button type="button" class="btn_accent" name="btn_Search" id="btn_Search" onClick="doWork('btn_Search');"><bean:message key="Search"/></button><!-- 
			 --><button type="button" class="btn_normal" name="btn_OK" id="btn_OK" onClick="doWork('btn_OK');"><bean:message key="OK"/></button><!-- 
			 --><button type="button" class="btn_normal" name="window.close" id="window.close" onClick="doWork('window.close');"><bean:message key="Close"/></button>
		</div>
		<!-- opus_design_btn(E) -->
		<!-- page_location(S) -->
		<div class="location">
			<span></span>
		</div>
		<!-- page_location(E) -->
	</div>

<!-- opus_design_inquiry(S) -->
	<div class="wrap_search">
		<div class="opus_design_inquiry entry_pannel">
			<table>
				<colgroup>
					<col width="50">
					<col width="190">
					<col width="185">
					<col width="150">
					<col width="185">
					<col width="*">
				</colgroup>
				<tbody>
					<tr>
						<th><bean:message key="Warehouse"/></th>
							<td>
								<select name="wh_combo" id="wh_combo" style="width: 100px;">
	             				</select>
	             			</td>	
						<th><bean:message key="Contract_No"/></th>
						<td><input name="ctrt_no" dataformat="engup" otherchar="-_" type="text" class="L_input_R" id="ctrt_no" value="<%=ctrt_no%>" style="width:80px;" readonly/><!--
						--><input name="ctrt_nm" type="text" class="L_input_R" id="ctrt_nm" dataformat="engup" otherchar = " ()-_" value="<%=ctrt_nm%>" style="width:160px;" readonly/>
							</td>
						<th><bean:message key="Consignee"/></th>
						<td><input name="buyer_cd" type="text" class="L_input" id="buyer_cd" style="width:70px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);getConsigneeInfo(this);" OnKeyDown="if(event.keyCode==13){getConsigneeInfo(this);}" onChange="getConsigneeInfo(this);"/><!-- 
						 --><button type="button" name="btn_buyer_cd" id="btn_buyer_cd" onClick="doWork('btn_buyer_cd');" class="input_seach_btn" tabindex="-1"></button><!-- 
						  --><input name="buyer_nm" type="text" class="L_input" id="buyer_nm" style="width:110px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);" onKeyDown="if(event.keyCode==13){ConsigneePopup();}"/>
						</td>
					</tr>
					<tr>
						<th><bean:message key="Booking_No"/></th>
						<td>
							<input name="in_wob_bk_no" type="text" class="L_input" id="in_wob_bk_no" style="width:202px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);"/>
						</td>
						<th><bean:message key="Booking_Date"/></th>
						<td><input name="fm_bk_date" id="fm_bk_date" type="text" class="L_input" maxlength="10" style="width:75px;" onkeypress="onlyNumberCheck();" 
							 onkeyup="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" OnBeforeDeactivate="ComAddSeparator(this)" OnBeforeActivate="ComClearSeparator(this)"
						onblur="chkCmprPrd(firCalFlag, false, this, this, form.to_bk_date);firCalFlag=false;"/><!-- 
							 --><span class="dash">~</span><!-- 
							  --><input name="to_bk_date" id="to_bk_date" type="text" class="L_input" maxlength="10" style="width:75px;" OnBeforeDeactivate="ComAddSeparator(this)" OnBeforeActivate="ComClearSeparator(this)"
							  onblur="chkCmprPrd(firCalFlag, false, this,form.fm_bk_date ,this );firCalFlag=false;"/><!-- 
							 --><button class="calendar ir" type="button" name="btn_to_bk_date" id="btn_to_bk_date" onClick="doWork('btn_to_bk_date');" tabindex="-1"></button>
						</td>
				</tbody>
			</table>
		</div>
	</div>
	<!-- opus_design_inquiry(E) -->
<div class="wrap_result">
		<div class="opus_design_grid clear">
			<script type="text/javascript">comSheetObject('sheet1');</script>
			
		</div>
	</div>
</form>
<%-- <%@include file="/business/oms/bizcommon/include_common.jsp"%> --%>
