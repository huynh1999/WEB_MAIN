<%--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : WHBookingPopup.jsp
*@FileTitle  : Booking No Selection
*@author     : Bao.Huynh - DOU Network
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
    <script type="text/javascript" src="./apps/fis/wms/common/js/WHBookingPopup.js?ver=<%=CLT_JS_VER%>"></script>
<%
	//String CLT_PATH = ".";
	String cond_search_yn = ""; //검색조건사용여부. Y이면 WAREHOUSE검색 및 CTRT검색 가능
	                            //N이면 FIX로 들오온값 셋팅후 DISABLED
	String wh_cd	 = ""; //wh_cd
	String ctrt_no	 = ""; //ctrt_no
	String ctrt_nm	 = ""; //ctrt_nm
	try {
		cond_search_yn = request.getParameter("cond_search_yn")== null?"N":request.getParameter("cond_search_yn");
		wh_cd    = request.getParameter("wh_cd")== null?"":request.getParameter("wh_cd");
		ctrt_no  = request.getParameter("ctrt_no")== null?"":request.getParameter("ctrt_no");
		ctrt_nm  = request.getParameter("ctrt_nm")== null?"":request.getParameter("ctrt_nm");
		
	}catch(Exception e) {
		out.println(e.toString());
	}		
%>
<bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
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
<input type="hidden" id="f_cmd" value="0" />
<input type="hidden" name="cond_search_yn" id="cond_search_yn" value="<%=cond_search_yn%>" />
<input type="hidden" name="def_wh_cd" value="<%=wh_cd%>" />

	<div class="layer_popup_title">
	<div class="page_title_area clear">
		<!-- page_title(S) -->
		<h2 class="page_title">
			<span><bean:message key="Booking_No_Selection"/></span>
		</h2>
		<!-- page_title(E) -->
		<!-- opus_design_btn(S) -->
		<div class="opus_design_btn">
			<button type="button" class="btn_accent" name="btnSearch" id="btnSearch" onClick="doWork('SEARCHLIST');"><bean:message key="Search"/></button><!--
			--><button type="button" class="btn_normal" name="btn_OK" id="btn_OK" onClick="doWork('btn_OK');"><bean:message key="OK"/></button><!-- 
			 --><button type="button" class="btn_normal" name="btnClose" id="btnClose" onClick="doWork('CLOSE');"><bean:message key="Close"/></button>
		</div>
		<!-- opus_design_btn(E) -->
		<!-- page_location(S) -->
		</div>
	</div>
	<div class="layer_popup_contents">
		<!-- opus_design_inquiry(S) -->
		<div class="wrap_search">
			<div class="opus_design_inquiry entry_pannel">
				<table>
					<colgroup>
						<col width="50">
						<col width="190">
						<col width="185">
						<col width="*">
					</colgroup>
					<tbody>
						<tr>
							<th><bean:message key="Warehouse"/></th>
							<td>
								<bean:define id="MsList" name="cdMap" property="warehouse"/><!-- 
								 --><select name="wh_cd" id="wh_cd" class="search_form" style="width: 194px;" required>
									<option value=""></option>
									<logic:iterate id="codeVO" name="MsList">
										<option value='<bean:write name="codeVO" property="wh_cd"/>'><bean:write name="codeVO" property="wh_nm"/></option>
									</logic:iterate>
								</select>
							</td>
							<th><bean:message key="Contract"/></th>
							<td><input name="ctrt_no" value="<%=ctrt_no%>" type="text" class="L_input" id="ctrt_no" style="width:90px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" otherchar="-_" onBlur="strToUpper(this);getCtrtInfo(this)" maxlength="10" OnKeyDown="if(event.keyCode==13){getCtrtInfo(this);}"/><!--
							--><button type="button" onClick="doWork('btn_ctrt_no');" name="btn_ctrt_no" id="btn_ctrt_no" class="input_seach_btn" tabindex="-1"></button><!--
							--><input name="ctrt_nm" value="<%=ctrt_nm%>" type="text" class="L_input" id="ctrt_nm" style="width:135px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" otherchar = " ()-_" onBlur="strToUpper(this);" onKeyDown="if(event.keyCode==13){CtrtPopup();}"/></td>
						</tr>
						<tr>
							<td><select name="search_dt" id="search_dt">
								<option value="B"><bean:message key="Booking_Date"/></option>
								<option value="C"><bean:message key="Complete_Date"/></option>
								</select></td>
							<td><input name="fm_bk_date" id="fm_bk_date" type="text" class="L_input"  maxlength="10" style="width:75px;" 
							onblur="chkCmprPrd(firCalFlag, false, this, this, form.to_bk_date);firCalFlag=false;" 
							onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};"
							onkeypress="onlyNumberCheck();" onkeyup="mkDateFormatType(this, event, false,1)" required/><span class="dash">~</span><!--
							--><input name="to_bk_date" id="to_bk_date" type="text" class="L_input"  maxlength="10" style="width:75px;" 
							onblur="chkCmprPrd(firCalFlag, false, this, form.fm_bk_date, this);firCalFlag=false;" 
							onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};"
							onkeypress="onlyNumberCheck();" onkeyup="mkDateFormatType(this, event, false,1)" required/><!--
							--><button class="calendar" onClick="doWork('btn_to_bk_date');" tabindex="-1" type="button" name="btn_to_bk_date" id="btn_to_bk_date"></button>
							</td>
							<th><bean:message key="IN_Outbound"/></th>
							<td><select name="search_tp" id="search_tp" style="width:90px;" >
							<option value="ALL"><bean:message key="ALL"/></option>
							<option value="IN"><bean:message key="Inbound"/></option>
							<option value="OUT"><bean:message key="Outbound"/></option>
							</select></td>
							</tr>
					</tbody>
				</table>
			</div>
		</div>
		<!-- opus_design_inquiry(E) -->
		<div class="wrap_result">
			<h3 class="title_design"><bean:message key="Booking_No_List"/></h3>
			<div class="opus_design_grid clear">
				<script type="text/javascript">comSheetObject('sheet1');</script>
				
			</div>
		</div>
	</div>
</form>	
<%@include file="/apps/fis/wms/bizcommon/include_common.jsp"%>

