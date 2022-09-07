<%--
=========================================================
*@FileName   : EDI_DBA_0030.jsp
*@FileTitle  : EDI
*@Description: EDI Pop
*@author     : LHK - EDI pop
*@version    : 1.0 - 04/23/2012
*@since      : 04/23/2012

*@Change history:
=========================================================
--%>

<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.HashMap"%>
    <%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
    
<!--    <bean:define id="valMap"  name="EventResponse" property="mapVal"/>-->

    <title><bean:message key="system.title"/></title>
    <link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>

	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/EDI_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/COM_FRT_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_CODE_UTIL.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript" src="<%=CLT_PATH%>/apps/fis/edi/debl/air/script/EDI_DBA_0030.js?ver=<%=CLT_JS_VER%>"></script>
	
	<script>	
   </script>
</head>
<body class="td" onload="loadPage();">
<form name="frm1" method="POST" action="./EDI_DBA_0030.clt">
    <input type="hidden" name="f_cmd">
		<input	type="hidden" name="air_sea_clss_cd"/>
		<input	type="hidden" name="bnd_clss_cd"/>
		<input	type="hidden" name="biz_clss_cd"/>
		
		<input	type="hidden" name="intg_bl_seq"/>
		<input	type="hidden" name="sts_cd"/>
		<input	type="hidden" name="etd_dt_tm"/>
		<input	type="hidden" name="bl_type"/>

<!-- 소타이틀, 대버튼 -->
    <table width="430" border="0" cellspacing="0" cellpadding="0">
    	<!-------------------- title begin -------------------->
		<tr>
			<td width="100%" class="bigtitle" align="left"><bean:message key="Departure"/></td>
		</tr>
		<!-------------------- title end -------------------->
		<!--space -->
        <tr>
            <td height="4"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
        </tr>
	    <!--space -->
		<!-------------------- button begin -------------------->
        <tr>
            <td align="right">
                <table border="0" cellspacing="0" cellpadding="0">
                    <tr>
                    	<td style="cursor:hand" onclick="doWork('DEPARTURE')">
							<table height="21" border="0" cellpadding="0" cellspacing="0">
								<tr>
									<td width="11"><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif" width="11" height="21"/></td>
									<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Departure"/></td>
									<td width="8"><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif" width="8" height="21"/></td>
								</tr>
							</table>
						</td>
						<td width="3">&nbsp;</td>
                        <td style="cursor:hand" onclick="doWork('CLOSE');">
                            <table height="21" border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
                                    <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Close"/></td>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
                                </tr>
                            </table>            
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    <!-- 간격 -->
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td height="7"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
        </tr>
    </table>
    <!-- 간격 -->
    <table width="430" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td align="left" class="table_search_bg">
                <table border="0" cellpadding="0" cellspacing="0">
			        <tr>
			            <td width="110" nowrap class="table_search_head">MAWB</td>
			            <td nowrap class="table_search_body">
			            	<input name="mbl_no" type="text" value="" class="search_form-disable" readOnly></td>           
			        </tr>
			        <tr>
			            <td width="110" nowrap class="table_search_head"><bean:message key="Flight_No"/></td>
			            <td nowrap class="table_search_body">
			            	<input name="flt_no" type="text" value="" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;width:55px;text-transform:uppercase;" readOnly></td>           
			        </tr>
			        <tr>
			            <td width="110" nowrap class="table_search_head">Flight Date</td>
			            <td nowrap class="table_search_body">
			            <input type="text" name="etd_dt" value='' onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1)" size='11' maxlength="10" class="search_form">
						<img id="etd_dt_cal" onclick="doDisplay('DATE1' ,frm1.etd_dt);" src="<%=CLT_PATH%>/web/img/button/btns_calendar.gif" width="19" height="21" border="0" align="absmiddle" style="cursor:hand;">
			        </tr>
			        <tr>
			            <td width="110" nowrap class="table_search_head"><bean:message key="Time"/></td>
			            <td nowrap class="table_search_body">
			            <input type="text" name="etd_tm"    value='' maxlength="4" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:40px;" tabindex="25" onchange="timeCheck(this);" onkeypress="onlyNumberCheck();">
			        </tr>
			    </table>
            </td>
        </tr>
    </table>
    <!-- 간격 -->
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td height="7"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
        </tr>
    </table>
	</form>
</body>
</html>



