<%
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : CMM_MSG_0010.jsp
*@FileTitle  :  Validation Message Display
*@author     : CLT
*@version    : 1.0
*@since      : 2014/07/28
=========================================================*/
%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ page import="java.util.HashMap"%>
    <%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
<%-- 	<bean:define id="blVO"  name="EventResponse" property="objVal"/> --%>
    <link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoFormControl.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoBizCommon.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/cmm/msg/script/CMM_MSG_0010.js?ver=<%=CLT_JS_VER%>"></script>
	 <script type="text/javascript">
		function setupPage(){
			loadPage();
		}
	</script>
	<form name="frm1" method="POST" action="./CMM_MSG_0010.clt">
	<div class="page_title_area clear">
			<!-- page_title(S) -->
			<h2 class="page_title">Validation Message</h2>
			<!-- page_title(E) -->
			<!-- opus_design_btn(S) -->
			<div class="opus_design_btn">
			<!-- 2016.04.12 C.W.Park Modified -->
			   <button type="button" class="btn_accent" name="btnClose" id="btnClose" onclick="doWork('CLOSE');"><bean:message key="Close"/></button>
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
		        <tbody>
					<tr>
						<!-- 2016.04.12 C.W.Park Modified -->
						<td colspan=3>
							<textarea name="val_msg" cols="127" rows="30" readonly style = "ime-mode:disabled; text-transform:none; font-family:TAHOMA; overflow:auto; resize:none; white-space: pre-wrap;"></textarea>
						</td>
					</tr>
	         </tbody>
             </table>
		</div>
	     <!-- inquiry_area(S) -->	
	</div>
	<!-- wrap search (E) -->		
</div>
</form>

