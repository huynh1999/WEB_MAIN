<%--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : WaveOrderSelectPopup.jsp
*@FileTitle  : WaveOrderSelectPopup
*@author     : Tien Duong - DOU Network
*@version    : 1.0
*@since      : 2015/03/17
=========================================================--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoFormControl.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/ModalCalendar.js?ver=<%=CLT_JS_VER%>"></script>
    
	<script type="text/javascript" src="./js/common/message/<%=CLT_MSG_PATH%>/WMS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="./apps/fis/wms/common/js/WaveOrderSelectPopup.js?ver=<%=CLT_JS_VER%>"></script>
<%
	
	String wave_ctrt_no = "";
	String wave_ctrt_nm = "";
	String wave_wh_cd = "";	
	String wave_wh_nm = "";	
	String wave_in_search_tp = "";
	String wave_in_no = "";
	try 
	{
		wave_ctrt_no = request.getParameter("wave_ctrt_no") == null ? "" : request.getParameter("wave_ctrt_no");
		wave_ctrt_nm = request.getParameter("wave_ctrt_nm") == null ? "" : request.getParameter("wave_ctrt_nm");
		wave_wh_cd = request.getParameter("wave_wh_cd") == null ? "" : request.getParameter("wave_wh_cd");
		wave_wh_nm = request.getParameter("wave_wh_nm") == null ? "" : request.getParameter("wave_wh_nm");
		wave_in_search_tp = request.getParameter("wave_in_search_tp") == null ? "" : request.getParameter("wave_in_search_tp");
		wave_in_no = request.getParameter("wave_in_no") == null ? "" : request.getParameter("wave_in_no");
	}catch(Exception e){
		out.println(e.toString());
	}	
%>

<bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
<bean:define id="warehouse" name="cdMap" property="warehouse"/>
<bean:define id="ord_tp_cd" name="cdMap" property="ord_tp_cd"/>
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
<input type="hidden" name="f_cmd">
<input type="hidden" id="q_search_tp" value ="<%=wave_in_search_tp%>"/>
<input type="hidden" id="q_search_no" value ="<%=wave_in_no%>"/>
<input type="hidden" id="in_wave_wh_cd" value ="<%=wave_wh_cd%>"/>
<div class="page_title_area clear">
	<!-- page_title(S) -->
	<h2 class="page_title">
			<span>Wave Order Select Popup</span>
		</h2>
	<!-- page_title(E) -->
	<!-- opus_design_btn(S) -->
	<div class="opus_design_btn">
			<button type="button" class="btn_accent" name="btnSearch" id="btnSearch" onClick="doWork('SEARCHLIST');"><bean:message key="Search"/></button><!-- 
		 --><button type="button" class="btn_normal" name="btnOK" id="btnOK" onClick="doWork('OK');"><bean:message key="OK"/></button><!-- 
		 --><button type="button" class="btn_normal" name="btnClose" id="btnClose" onClick="doWork('CLOSE');"><bean:message key="Close"/></button>
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
				<col width="100">
				<col width="200">
				<col width="130">
             	<col width="300">
				<col width="100">
				<col width="*">
			</colgroup>
			<tr>
				<th><bean:message key="Warehouse"/></th>
				<td>
					<bean:define id="warehouse" name="cdMap" property="warehouse"/>
					<select name="list_wh_cd" id="list_wh_cd" style="width: 190px;" required>
						<logic:iterate id="WhVO" name="warehouse">
							<option value='<bean:write name="WhVO" property="wh_cd"/>'><bean:write name="WhVO" property="wh_nm"/></option>
						</logic:iterate>
					</select>
				</td>
				<th><bean:message key="Contract_No"/></th>
				<td><input name="wave_ctrt_no" id="wave_ctrt_no" value="<%=wave_ctrt_no%>" type="text" class="search_form" style="width:80px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onblur="strToUpper(this);getCtrtInfo2(this,document.form.wave_ctrt_nm);" maxlength="10"/><!-- 						
			  	 --><button type="button" name="btn_ctrt_no" id="btn_ctrt_no" class="input_seach_btn" tabindex="-1" onclick="doWork('btn_wave_ctrt_no')"></button><!-- 
				 --><input name="wave_ctrt_nm" id="wave_ctrt_nm" value="<%=wave_ctrt_nm%>" type="text" class="search_form" style="width:150px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onblur="strToUpper(this);" onKeyDown="if(event.keyCode==13){CtrtPopup('e');}"/>
				</td>
                <th>
                	<select style="width:100px;" name="wave_in_search_tp" id="wave_in_search_tp" class="search_form">
						<option value='CUST_ORD_NO'>Order No</option>
						<option value='WOB_BK_NO'>Booking No</option>
					</select>
                </th>
				<td><input name="wave_in_no" id = "wave_in_no" type="text" style="width: 190px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onblur="strToUpper(this);"/>
				</td>
			</tr>
          	<tr>
				<td><select style="width:100px;" name="wave_in_date_tp" id="wave_in_date_tp" class="search_form">
					<option value='EST_OUT_DT'>Estimated Date</option>
					<option value='BK_DATE'>Booking Date</option>
					</select>
				</td>
				<td>
					<input name="wave_fm_date" id="wave_fm_date" type="text" class="L_input" style="width:80px;" maxlength="10" onkeyup="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onblur="chkCmprPrd(firCalFlag, false, this, this, form.wave_to_date);firCalFlag=false;" onkeypress="onlyNumberCheck();"/><!--
				 --><span class="dash">~</span><!--  
				 --><input name="wave_to_date" id="wave_to_date" type="text" class="L_input" style="width:80px;" maxlength="10" onkeyup="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onblur="chkCmprPrd(firCalFlag, false, this, form.wave_fm_date, this);firCalFlag=false;" onkeypress="onlyNumberCheck();"/><!--
				 --><button class="calendar" type="button" id="btn_wave_to_date" name="btn_wave_to_date" onclick="doWork('btn_wave_to_date');" ></button>
				</td>
				<th><bean:message key="Order_Type"/></th>
				<td>
					<bean:define id="ord_tp_cd" name="cdMap" property="ord_tp_cd"/>
					<select name="wave_ord_tp_cd" id="wave_ord_tp_cd" style="width: 190px;">
						<script type="text/javascript">
							$('#wave_ord_tp_cd').append($("<option></option>").attr("value","ALL").text("ALL")); 
						</script>
						<logic:iterate id="ordVO" name="ord_tp_cd">
							<option value='<bean:write name="ordVO" property="code"/>'><bean:write name="ordVO" property="name"/></option>
						</logic:iterate>
					</select>
			    </td>
			</tr>
		</table>
	</div>
	<div class= "opus_design_grid">
		<script type="text/javascript">comSheetObject('sheet1');</script>
	</div>
</div>
</form>
<%@include file="/apps/fis/wms/bizcommon/include_common.jsp"%>
