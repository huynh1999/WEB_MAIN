<%--
=========================================================
*@FileName   : SAL_TFM_0040.jsp
*@FileTitle  : Tariff Management
*@Description: Tariff Management
*@author     : Kim,Sang-Geun - Cyberlogitec
*@version    : 1.0 - 02/13/2009
*@since      : 02/13/2009

*@Change history:
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css">
		<title><bean:message key="system.title"/></title>
	<!-- 일자 및 달력팝업 호출 -->
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SAL_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="./apps/fis/sal/tfm/tariff/script/SAL_TFM_0040.js?ver=<%=CLT_JS_VER%>"></script>
	
</head>
<script language="javascript">
	<!-- 처리시 메시지 -->
	var PARAM1_1 = '';
	var PARAM1_2 = '';
	var PARAM2_1 = '';
	var PARAM2_2 = '';
	var PARAM3_1 = '';
	var PARAM3_2 = '';
	
	<bean:define id="rtnMap" name="EventResponse" property="mapVal"/>
	
	<% boolean isBegin = false; %>
	<!-- Bound Class Code 코드조회-->
	<bean:define id="param1List"  name="rtnMap" property="PARAM1"/>
	<logic:iterate id="codeVO" name="param1List">
		<% if(isBegin){ %>
			PARAM1_1+= '|';
			PARAM1_2+= '|';
		<% }else{
			  isBegin = true;
		   } %>
		PARAM1_1+= '<bean:write name="codeVO" property="cd_nm"  filter="false"/>';
	    PARAM1_2+= '<bean:write name="codeVO" property="cd_val" filter="false"/>';
	</logic:iterate>

	<!-- Sell Buy Type Code 코드조회-->
	<bean:define id="param2List"  name="rtnMap" property="PARAM2"/>
	<logic:iterate id="codeVO" name="param2List">
		<% if(isBegin){ %>
			PARAM2_1+= '|';
			PARAM2_2+= '|';
		<% }else{
			  isBegin = true;
		   } %>
		PARAM2_1+= '<bean:write name="codeVO" property="cd_nm"  filter="false"/>';
	    PARAM2_2+= '<bean:write name="codeVO" property="cd_val" filter="false"/>';
	</logic:iterate>    
	
	<!-- Customer Type Code 코드조회-->
	<bean:define id="param3List"  name="rtnMap" property="PARAM3"/>
	<logic:iterate id="codeVO" name="param3List">
		<% if(isBegin){ %>
			PARAM3_1+= '|';
			PARAM3_2+= '|';
		<% }else{
			  isBegin = true;
		   } %>
		PARAM3_1+= '<bean:write name="codeVO" property="cd_nm"  filter="false"/>';
	    PARAM3_2+= '<bean:write name="codeVO" property="cd_val" filter="false"/>';
	</logic:iterate>
</script>

<body class="td" onLoad="javascript:loadPage();">
<form name="frm1">
<input type="hidden" name="f_cmd">
<input type="hidden" name="f_trdp_cd">
<input type="hidden" name="f_trf_ctrt_no">
<input type="hidden" name="user_id"  value="<%=userInfo.getUsrid()%>" />
<input type="hidden" name="pageurl" id="pageurl" value="SAL_TFM_0040.clt"/>
    <!-- 타이틀, 네비게이션 -->
    <table width="1200" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td class="bigtitle"><%=LEV3_NM%></td>
            <td align="right" nowrap class="navi"><img src="<%=CLT_PATH%>/web/img/main/navi_icon.gif" width="6" height="5" hspace="3" vspace="5" align="texttop"><%=LEV1_NM%> > <%=LEV2_NM%> > <span class="navi_b"><%=LEV3_NM%></span></td>
        </tr>
    </table>
    <!-- 타이틀, 네비게이션 -->
    <!--빈공간 -->
    <table width="1200" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td height="4"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
        </tr>
    </table>
    <!--빈공간 -->
    <!-- 소타이틀, 대버튼 -->
    <table width="1200" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td align="right">
                <table border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="6"></td>
                        <td style="cursor:hand" onClick="doWork('SEARCHLIST');">
                            <table height="21" border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
                                    <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Search"/></td>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
                                </tr>
                            </table>            
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    <!-- 소타이틀, 대버튼 -->
    <!--빈공간 -->
    <table width="1200" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td height="4"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
        </tr>
    </table>
    <!--빈공간 -->
    <!-- 검색 -->
    <table width="1200" border="0" cellpadding="0" cellspacing="0">
        <tr>
            <td align="left" class="table_search_bg">
            <!-- 간격 -->
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                    </tr>
                </table>
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td align="left" valign="top">
                            <table border="0" cellpadding="0" cellspacing="0">
		                        <tr>
		                            
		                            <td width="67" nowrap="nowrap" class="table_search_head"><bean:message key="Class"/></td>
									<td class="table_search_body">
										<select name="trf_tp_cd" class="search_form">
											<option value=''>ALL</option>
											<option value='S'>Sea</option>
											<option value='A'>Air</option>
											<option value='I'>Iata</option>
											<option value='L'>Inland</option>
										</select>
									</td>
									
									<td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="10"></td>
									<td width="60" nowrap="nowrap" class="table_search_head"><bean:message key="Bound"/></td>
									<td class="table_search_body">
										<select name="bnd_clss_cd" class="search_form">
											<option value=''>ALL</option>
											<logic:iterate id="codeVO" name="param1List">
												<option value='<bean:write name="codeVO" property="cd_val"/>'><bean:write name="codeVO" property="cd_nm"/></option>
											</logic:iterate>
										</select>
									</td>
									
			                      	<td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="10"></td>
		                            <td width="110" nowrap="nowrap" class="table_search_head"><bean:message key="Selling_Buying"/></td>
        		                    <td class="table_search_body">
                                        <select name="sell_buy_tp_cd" class="search_form" style="width:100;">
											<option value=''>ALL</option>
											<logic:iterate id="codeVO" name="param2List">
												<option value='<bean:write name="codeVO" property="cd_val"/>'><bean:write name="codeVO" property="cd_nm"/></option>
											</logic:iterate>
										</select>
                                    </td>
                                    

		                            <td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="30"></td>
		                            <td width="120" nowrap="nowrap" class="table_search_head"><bean:message key="Apply_Date"/></td>
		                            <td nowrap="nowrap" class="table_search_body">
		                            	<input name="trf_term_dt" type="text" value='' onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1)" class="search_form" style="width:72px;" maxlength="12"/>
		                            	<img src="<%=CLT_PATH%>/web/img/button/btns_calendar.gif" onclick="doDisplay('DATE1', frm1);" align="absmiddle" style="cursor:pointer"/>
									</td>
		                        </tr>
		                    </table>
                            <table border="0" cellpadding="0" cellspacing="0">
                            	<tr>
		                            <td width="60" nowrap="nowrap" class="table_search_head"><bean:message key="Customer"/></td>
		                            <td nowrap="nowrap" class="table_search_body">
		                            	<input name="trdp_cd" maxlength="20" value='' type="text" class="search_form" onKeyDown="codeNameAction('trdpCode',this, 'onKeyDown')" onBlur="codeNameAction('trdpCode',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:60;">
										<img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" id="trdp_cd" onClick="doWork('CUSTOMER_POPLIST')" style="cursor:hand;" align="absmiddle">
										<input name="trdp_nm" maxlength="50" value='' type="text" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:140;" disabled="true">
		                            </td>
		                            <td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="10"></td>
		                            <td width="110" nowrap="nowrap" class="table_search_head"><bean:message key="POL_Departure"/></td>
		                            <td nowrap="nowrap" class="table_search_body">
		                            	<input name="pol_cd" value='' type="text" class="search_form" onKeyDown="codeNameAction('Location_pol',this, 'onKeyDown')" onBlur="codeNameAction('Location_pol',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:100;">
										<img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" id="pol" onClick="doWork('POPUP_POL')" style="cursor:hand;" align="absmiddle">
		                            </td>
		                            <td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="10"></td>
		                            <td width="120" nowrap="nowrap" class="table_search_head"><bean:message key="POD_Destination"/></td>
		                            <td nowrap="nowrap" class="table_search_body">
		                            	<input name="pod_cd" value='' type="text" class="search_form" onKeyDown="codeNameAction('Location_pod',this, 'onKeyDown')" onBlur="codeNameAction('Location_pod',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:72;">
										<img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" id="pod" onClick="doWork('POPUP_POD')" style="cursor:hand;" align="absmiddle">
		                            </td>
		                            <td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="15"></td>
		                            <td width="120" nowrap="nowrap" class="table_search_head"><bean:message key="F_Dest"/></td>
		                            <td nowrap="nowrap" class="table_search_body">
		                            	<input name="dest_del_cd" value='' type="text" class="search_form" onKeyDown="codeNameAction('Location_dest',this, 'onKeyDown')" onBlur="codeNameAction('Location_dest',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:100;">
										<img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" id="pol" onClick="doWork('POPUP_DEL')" style="cursor:hand;" align="absmiddle">
		                            </td>
                            	</tr>
                        	</table>
                    	</td>
                    </tr>
                </table>
                <!-- 간격 -->
                <!-- 간격 -->
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                    </tr>
                </table>
                <!-- 간격 -->
            </td>
        </tr>
    </table>
    <!-- 소타이틀, 대버튼 -->
    <!--빈공간 -->
    <table width="1200" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td height="4"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
        </tr>
    </table>
    <!--빈공간 -->
    <!-- 검색 -->
    <table width="1200" border="0" cellpadding="0" cellspacing="0">
        <tr>
            <td align="left" class="table_search_bg"><!-- 간격 -->
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                    </tr>
                </table>
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td align="left" valign="top">
							<table width="100%" id="mainTable">
								<tr><td>
									 <script language="javascript">comSheetObject('sheet1');</script>
								</td></tr>
							</table>
                        </td>
                    </tr>
                </table>
                <!-- 간격 -->
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                <td height="7"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                </tr>
                </table>
                <!-- 간격 -->
            </td>
        </tr>
    </table>
    <!-------------------- Paging Begin -------------------->
    <table border="0" width="1200">
        <tr>
            <td height="4"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
        </tr>
        <tr>
            <td width="55">
                <bean:define id="tmpMapVal" name="EventResponse" property="mapVal"/>
            </td>                               
            <td align="center">
                <table>
                    <tr>
                        <td id="pagingTb" style='font-family: "Tahoma", "Arial", "Verdana";font-size: 11px;'>
                        </td>
                    </tr>
                </table>        
            </td>
            <td width="55"></td>
        </tr>
    </table>
<!-------------------- Paging End -------------------->
</form>
</body>
</html>
<script>
	var pDoc = parent.parent.document;
	hideProcess('WORKING', pDoc);   
</script>