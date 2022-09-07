<%
/*--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : WHInvPrintOption.jsp
*@FileTitle  : Print Size
*@author     : Kieu.Le - DOU Network
*@version    : 1.0
*@since      : 2015/04/16
=========================================================--*/
%>
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
    <script type="text/javascript" src="./apps/fis/wms/common/js/WHInvPrintOption.js?ver=<%=CLT_JS_VER%>"></script>

    
<%
//UserInfoDto userInfo = (UserInfoDto) session.getAttribute("AbstractAccountInfo");

String req_plan_no   = "";

try {
req_plan_no   = request.getParameter("plan_no")== null?"":request.getParameter("plan_no");
	
}catch(Exception e) {
	out.println(e.toString());
}	


%>
<<script type="text/javascript">
		function setupPage(){
			var errMessage = "";
			if (errMessage.length >= 1) {
				ComShowMessage(errMessage);
			} // end if
			loadPage(true);
		}
	</script>
<form id="form" name="form">
<input type="hidden" id="plan_no" name="plan_no" value="<%=req_plan_no%>"/>
<input type="hidden" id="paper_size" name="paper_size" value="A4" />
<input type="hidden" id="com_mrdBodyTitle" name="com_mrdBodyTitle" value="Inventory Movement Work Sheet Print" />
<input type="hidden" id="com_mrdArguments" name="com_mrdArguments"/>
<input type="hidden" id="com_mrdPath" name="com_mrdPath" />
<input type="hidden" name="file_name">
<input type="hidden" name="title">
<input type="hidden" name="rd_param">

<div class="layer_popup_title">
 	<div class="page_title_area clear">
		<!-- page_title(S) -->
		<h2 class="page_title">
			<span>Print Size</span>
		</h2>
		<!-- page_title(E) -->
		<!-- opus_design_btn(S) -->
		<div class="opus_design_btn">
			<button type="button" class="btn_accent" onClick="btn_Print();"><bean:message key="Print"/></button><!-- 
			--><button type="button" class="btn_normal" onClick="doWork('CLOSE')"><bean:message key="Close"/></button><!-- 
		 --></div>
		<!-- opus_design_btn(E) -->
	</div>
</div>

<div class="layer_popup_contents">
	<div class= "wrap_search">
		<div class="opus_design_inquiry entry_pannel">
			<table width="100%"  id="mainTable_sheet1" border="0"> 
				<tr>
					<td style="padding-left:5px">
					<select id="print_size_tp" name="print_size_tp" style="width: 100px; font-weight: bold;"> 
 							<option value='A4' ><bean:message key="A4"/></option> 
 							<option value='Letter' ><bean:message key="Letter"/></option>
 					</select> 
						
					</td>
				</tr>
			</table> 
		</div>
	</div>
</div>
</form>

