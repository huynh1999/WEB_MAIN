<%
/*=========================================================
*Copyright(c) 2016 CyberLogitec. All Rights Reserved.
*@FileName   : SEE_AFR_0090.jsp
*@FileTitle  : 일본 세관 History
@author      : Park,Cheol-Woo - CyberLogitec
*@version    : 1.0
*@since      : 2016/04/20
=========================================================*/
%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ page import="java.util.HashMap"%>
    <%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
    <link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoFormControl.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoBizCommon.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCommon.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript" src="<%=CLT_PATH%>/apps/fis/edi/afr/script/SEE_AFR_0090.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/EDI_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	
	<script type="text/javascript">
		<!--
		function setupPage() {
			initFinish();
			loadPage();
		}
		//-->
	</script>
	<bean:define id="mapObj" name="EventResponse" property="mapVal"/>
	<form name="frm1" method="POST" action="./SEE_AFR_0090.clt">
	
	<input type="hidden" name="f_cmd">
	<input type="hidden" name="intg_bl_seq" value='<bean:write name="mapObj" property="intg_bl_seq"/>'>
	
	<div class="page_title_area clear">
			<!-- page_title(S) -->
			<h2 class="page_title"><bean:message key="Status"/> <bean:message key="Detail"/></h2>
			<!-- page_title(E) -->
			<!-- opus_design_btn(S) -->
			<div class="opus_design_btn">
			   <button type="button" class="btn_accent" name="btnClose" id="btnClose" onclick="doWork('CLOSE')"><bean:message key="Close"/></button>
			</div>
			<!-- opus_design_btn(E) -->
	</div>
    <!-- page_title_area(E) -->	

	 <!-- wrap search (S) -->
<div class="over_wrap" height="100%">
 	<div class="wrap_search">
	    <!-- inquiry_area(S) -->	
		<div class="opus_design_inquiry entry_pannel ">
		    <table>
		    	<colgroup>
			        	<col width="40">
			        	<col width="50">
			        </colgroup>
				        <tbody>
			               <tr>
								<th style="width:60px"><bean:message key="HBL_No"/></th>
								<td style="width:140px">
									<input type="text" name="s_bl_no" maxlength="40" style="width:150px;" onBlur="strToUpper(this);" dataformat="excepthan" readonly value='<bean:write name="mapObj" property="s_bl_no"/>'>
								</td>
								<th><bean:message key="MBL_No"/></th>
								<td colspan=2>
									<input type="text" name="s_mbl_no" maxlength="40" style="width:150px;" onBlur="strToUpper(this);" dataformat="excepthan" readonly value='<bean:write name="mapObj" property="s_mbl_no"/>'>
								</td>
							</tr>
			         </tbody>
             </table>
		</div>
	     <!-- inquiry_area(S) -->	
	</div>
	<!-- wrap search (E) -->		
	<div class="wrap_result">
    	<div class="opus_design_grid">
    		<script language="javascript">comSheetObject('sheet1');</script>
    	</div>
    </div>

</div>
</form>

