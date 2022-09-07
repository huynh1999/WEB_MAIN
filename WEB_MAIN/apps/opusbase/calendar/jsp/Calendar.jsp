<%@ page import="java.util.*" contentType="text/html;charset=UTF-8" %>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
<%@include file="./../../../../../../../../syscommon/header/CLTHeader.jsp"%>

    <link href="<%=CLT_PATH%>/web/css/calendar.css" rel="stylesheet" type="text/css">
    <link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
    <!-- 일자 및 달력팝업 호출 -->
    <script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SYS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript" src="./apps/opusbase/calendar/script/Calendar.js?ver=<%=CLT_JS_VER%>"></script>
    <style>
    </style>

	<bean:define id="paramMap" name="EventResponse" property="mapVal"/>
    <script>
        function showCalendar(){
			callTp   = '<bean:write name="paramMap" property="callTp"/>';
			periodYn = '<bean:write name="paramMap" property="periodYn"/>';
            dispCalandar(todayYear(), todayMonth(), todayDate());
        }
    </script>
	<title><bean:message key="system.title"/></title>
</head>
<body onload="showCalendar();" style="margin-top:0px;margin-left:0px;">
<form name="frm1">
    <input type="hidden" name="frmYear"  value="">
    <input type="hidden" name="frmMonth" value="">
    <input type="hidden" name="frmDay"   value="">
    <input type="hidden" name="lastDay"  value="">

            
    <input type="hidden" name="toYear"  value="">
    <input type="hidden" name="toMonth" value="">
    <input type="hidden" name="toDay"   value="">
		
	<table width="100%" cellspacing="0" cellpadding="0" bordar="2">
<% boolean dispApp = false; %>
<logic:equal name="paramMap" property="callTp" value="D">		
		<tr>
			<td height="240px"  valign="top">
				<table width="100%" cellspacing="0" cellpadding="0" bordar="0" style="margin-top:0px;">
					<tr>
						<td id="calDev"></td>
					</tr>
                </table>
			</td>
		</tr>
	<logic:equal name="paramMap" property="periodYn" value="Y">
		<% dispApp = true; %>
        <tr>
            <td height="25px" valign="top" align="center">
				<table border="0" align="center" class="grid2" style="width:210; background-color:white;">
					<tr >
					<td width="39" class="tr2_head2"><bean:message key="From"/></td>
					<td width="73"><input type="text" name="frmDate" class="noinput" style="width:72;" value="" readonly></td>
					<td width="25" class="tr2_head"><bean:message key="To"/></td>
					<td width="73"><input type="text" name="toDate"  class="noinput" style="width:72;" value="" readonly></td>
					</tr>
				</table>
            </td>
        </tr>
        <tr>
            <td height="8px"></td>
        </tr>
    </logic:equal>		
</logic:equal>
<logic:equal name="paramMap" property="callTp" value="M">
	    <% dispApp = true; %>
	    <tr>
            <td height="80px"  valign="top">
                <table width="100%" cellspacing="0" cellpadding="0" bordar="0" style="margin-top:0px;">
                    <tr>
                        <td id="calDev"></td>
                    </tr>
                </table>
            </td>
        </tr>
</logic:equal>
        <tr>
            <td>
                <table width="100%" class="sbutton">
                    <tr>
                        <td height="71" class="popup">
                            <table class="sbutton">
                                <tr>
                                    <td class="p_bt">
					   <% if(dispApp){%><img class="cursor" src="./web/img/button/btn_apply.gif" width="66" height="20" border="0" onClick="applyDate();"><% } %>
                                        <img class="cursor" src="./web/img/button/btn_close.gif" width="66" height="20" border="0" onClick="window.close();">
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
	</table>
</form>
</body>
</html>