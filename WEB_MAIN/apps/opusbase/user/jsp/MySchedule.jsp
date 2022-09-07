<%--
=========================================================
*Copyright(c) 2008 CyberLogitec. All Rights Reserved.
=========================================================

=========================================================
*@FileName   : MGT_NTC_0010.jsp
*@FileTitle  : 게시판 목록 화면
*@Description: 게시판 목록을 조회합니다.
*@author     : Kang,Jung-Gu - Cyberlogitec
*@version    : 1.0 - 02/05/2009
*@since      : 02/05/2009

*@Change history:
=========================================================
--%>
<%@ page import="java.util.*" contentType="text/html;charset=UTF-8" %>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
<%@include file="./../../../../syscommon/header/CLTHeader.jsp"%>

<%--     <link href="<%=CLT_PATH%>/web/css/calendar.css" rel="stylesheet" type="text/css"> --%>
    <link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css">

	<!-- 일자 및 달력팝업 호출 -->
    <script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SYS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
    
    <script language="javascript" src="./apps/opusbase/user/script/MySchedule.js?ver=<%=CLT_JS_VER%>"></script>
	<style>
	</style>
    <script>
    function setupPage(){
    	showCalendar();
    }
	function showCalendar(){
		dispCalandar(<bean:write name="curYear"/>, <bean:write name="curMonth"/>, <bean:write name="curDay"/>);
	}
	</script>
</head>
<form name="fName" method="POST">
	<input type="hidden" name="yyyyMM" value="">
	
	<div class="page_title_area clear">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <div class="location">
		   <span><%=LEV1_NM%></span> &gt;
		   <span><%=LEV2_NM%></span> &gt;
		   <span><%=LEV3_NM%></span>
		   <a href="" class="ir">URL Copy</a>
	   </div>
	</div>
	<div class='wrap_result'>
	    <table>
	        <tr>
	            <td width="200" height="490" valign="top">
					<table width="200">
						<tr>
							<td style="padding-bottom:5px; height: 10px;background-color:rgb(116, 116, 201)"></td>
						</tr>
						<tr><td height="5px"/></tr>
						<tr>
							<td id="calDev" style="cursor:hand; border: 1px solid #7388B6;padding-left: 5px;padding-right: 5px;padding-bottom: 2px;padding-top: 2px;"></td>
						</tr>
						<tr><td height="5px"/></tr>
						<tr>
							<td style="padding-bottom:5px; height: 10px;background-color:rgb(116, 116, 201)"></td>
						</tr>
					</table>
				</td>
	            <td valign="top" height="490" style="padding-left: 5px;">
					<iframe id="iFrname" src="./MyScheduleSub.clt?f_skd_dt=<bean:write name="curTime"/>" marginwidth='0' marginheight='0' topmargin='0' width="100%" height="100%" scrolling='auto' frameborder='0' style="margin-top:0px;top:0px;border:none;display:block;border:0;"></iframe>
				</td>
	        </tr>
	    </table>
    </div>
</form>
<script>
    var pDoc = parent.parent.parent.document;
    hideProcess('WORKING', pDoc);
</script>
</body>
</html>