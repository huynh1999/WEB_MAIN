<%--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : RateLocPopup.jsp
*@FileTitle  : Rate Location Search
*@author     : Tin.Luong - DOU Network
*@version    : 1.0
*@since      : 2015/03/05
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
    <script type="text/javascript" src="./apps/fis/wms/common/js/RateLocPopup.js?ver=<%=CLT_JS_VER%>"></script>
    
<%
	
	String code_cd = "";
	String code_nm = "";
	String code_tp = "";
	String sea_air_cls = "";
	
	String code_tp_ck1 = "";
	String code_tp_ck2 = "checked";
	String code_tp_ck3 = "";
	
	try {
		code_cd = request.getParameter("code_cd")== null?"":request.getParameter("code_cd");
		code_nm = request.getParameter("code_nm")== null?"":request.getParameter("code_nm");
		code_tp = request.getParameter("code_tp")== null?"":request.getParameter("code_tp");

		// S=Osean, A=AIR, D=Domestic
		sea_air_cls = request.getParameter("sea_air_cls")== null?"":request.getParameter("sea_air_cls");
		
		if(code_tp.equals("CTRY")){
			code_tp_ck1 = "checked";
			code_tp_ck2 = "";			
		}else if(code_tp.equals("RGLOC")){
			code_tp_ck2 = "";
			code_tp_ck3 = "checked";
		}
	}catch(Exception e) {
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
	<input type="hidden" name="f_cmd">
	<input type="hidden" name="c_sea_air_cls" value="<%=sea_air_cls%>" />
	
	<div class="layer_popup_title">
		<!-- page_title_area(S) -->
		<div class="page_title_area clear">
			<!-- page_title(S) -->
			<h2 class="page_title"><span><bean:message key="Rate_Location_Search"/></span></h2>
			<!-- page_title(E) -->
			<!-- opus_design_btn(S) -->
			<div class="opus_design_btn">
					<button type="button" class="btn_accent" name="btn_search" id="btn_search" onClick="doWork('SEARCHLIST');"><bean:message key="Search"/></button><!-- 
				  --><button type="button" class="btn_normal" name="btn_Close" id="btn_Close" onClick="doWork('CLOSE');"><bean:message key="Close"/></button><!--
			 --></div>
			<!-- opus_design_btn(E) -->
		</div>
	</div>
	<div class="layer_popup_contents">
		<div class= "wrap_search">
			<div class="opus_design_inquiry entry_pannel">
				<table>
			    	<colgroup>
					<col width="40" />
			   		<col width="120" />
					<col width="200" />
			 		<col width="*" />
					</colgroup>    
					<tbody>      
			                <tr>
						        <th><bean:message key="Code_Type"/></th>
								<td colspan="3"><input type="radio" name="c_code_tp" id="c_code_tp" value="CTRY" <%=code_tp_ck1%> /><label for = "c_code_tp"><bean:message key="Country"/></label><!-- 
									 --><input type="radio" name="c_code_tp" id="c_code_tp1" value="LOC" <%=code_tp_ck2%> /><label for = "c_code_tp1"><bean:message key="City_Port"/></label><!-- 
									 --><input type="radio" name="c_code_tp" id="c_code_tp2" value="RGLOC"  <%=code_tp_ck3%> /><label for = "c_code_tp2"><bean:message key="Code_Type"/></label>
								</td>
					        </tr>
			                <tr>
						        <th><bean:message key="Code"/></th>
								<td><input name="c_code_cd" type="text" class="L_input" style="ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);" maxlength="32" value="<%=code_cd%>" /></td>
						        <th><bean:message key="Code_Name"/></th>
						        <td><input name="c_code_nm" type="text" class="L_input" style="ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);" maxlength="1000" value="<%=code_nm%>" /></td>
					        </tr>
					</tbody>
				</table>
			</div>
		</div>
		<div class="wrap_result">
			<!-- opus_design_grid(S) -->
			<div class="opus_design_grid clear">
				<script type="text/javascript">comSheetObject('sheet1');</script>
			</div>
		</div>
	</div>
</form>
<%@include file="/apps/fis/wms/bizcommon/include_common.jsp"%>
