<%
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : UserPopup.jsp
*@FileTitle  : User Popup
*@author     : Khang.Dong - DOU Network
*@version    : 1.0
*@since      : 2015/03/13
=========================================================*/
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
    <script type="text/javascript" src="./apps/fis/wms/common/js/UserPopup.js?ver=<%=CLT_JS_VER%>"></script>
    
 	<script type="text/javascript" src="./js/common/message/<%=CLT_MSG_PATH%>/WMS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>

<%
	String org_cd = "";
	String user_id = "";
	String user_nm = "";	

	try {
		org_cd = request.getParameter("org_cd");
		user_id = request.getParameter("user_id");
		user_nm = request.getParameter("user_nm");

		if(org_cd==null){
			org_cd = "";
		} 
		if(user_id==null){
			user_id = "";
		} 
		if(user_nm==null){
			user_nm = "";
		} 		
	}catch(Exception e) {
		out.println(e.toString());
	}	
%>
<head>
<script type="text/javascript">
function setupPage(){
	var errMessage = "";
	if (errMessage.length >= 1) {
		ComShowMessage(errMessage);
	} // end if
	loadPage(true);
}
</script>
</head>
<form id="form" name="form">
<input type="hidden" id="f_cmd" value="0" />
 <div class="page_title_area clear">
	<!-- page_title(S) -->
	<h2 class="page_title">
			<span><bean:message key="User_Popup"/></span>
		</h2>
	<!-- page_title(E) -->
	<!-- opus_design_btn(S) -->
	<div class="opus_design_btn">
			<button type="button" class="btn_accent" name="btn_Search" id="btn_Search" onClick="doWork('btn_Search');"><bean:message key="Search"/></button><!-- 
			 --><button type="button" class="btn_accent" name="btn_Close" id="btn_Close" onClick="doWork('btn_Excel');"><bean:message key="Close"/></button>
	 </div>
	<!-- opus_design_btn(E) -->
	<!-- page_location(S) -->
		<div class="location">
			<span></span>
		</div>
	<!-- page_location(E) -->
</div>
<div class="wrap_search">
    <!-- opus_design_inquiry(S) -->
    <div class="opus_design_inquiry entry_pannel">
        <table>
            <colgroup>
                <col width="100" />
                <col width="*" />
            </colgroup>
            <tbody>
                   <tr>
						<th><bean:message key="Branch"/></th>
						<td><input name="org_cd" style="width: 400px;text-transform:uppercase;" type="text" id="org_cd" dataformat="engup" value="<%=org_cd%>" /> </td>
					</tr>
	                <tr>
						<th><bean:message key="User_ID"/></th>
						<td><input name="picCd" style="width: 400px;text-transform:uppercase;" type="text" id="picCd" dataformat="engup" value="<%=user_id%>" /> </td>
					</tr>
	                <tr>
						<th><bean:message key="User_Name"/></th>
						<td><input name="picNm" style="width: 400px;text-transform:uppercase;" type="text" id="picNm" dataformat="engup" value="<%=user_nm%>" /> </td>
					</tr>
            </tbody>
       </table>
    </div>
</div>
<div class="wrap_result"> 
    <!-- opus_design_grid(S) -->
    <div class="opus_design_grid">
        <script type="text/javascript">comSheetObject('sheet1');</script>
    </div>
</div>  
</form>


<%@include file="/apps/fis/wms/bizcommon/include_common.jsp"%>
