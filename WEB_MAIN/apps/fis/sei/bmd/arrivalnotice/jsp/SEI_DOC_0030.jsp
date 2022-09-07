<%--
=========================================================
*@FileName   : SEI_DOC_0030.jsp
*@FileTitle  : A/N, D/O 등록 수정 
*@Description: A/N, D/O 등록, 수정,  조회한다.
*@author     : 이광훈 - sei =Export 
*@version    : 1.0 - 01/16/2009 
*@since      : 01/16/2009

*@Change history:
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>

	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SEA_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="./apps/fis/sei/bmd/arrivalnotice/script/SEI_DOC_0030.js?ver=<%=CLT_JS_VER%>"></script>
</head>

<body class="td" onload="javascript:initFinish();loadPage();doWork('SEARCHLIST');" onunload="closewin();">
	<form name="form" method="POST" action="./SEI_DOC_0030.clt">
		<!-- 화면이동을 위한 처리 -->
		<input	type="hidden" name="f_cmd"/> 
		<input	type="hidden" name="f_CurPage"/> 
		<logic:notEmpty name="EventResponse">
           	<bean:define id="valMap"  name="EventResponse" property="mapVal"/>
           	<input	type="hidden" name="in_intg_bl_seq" value='<bean:write name="valMap" property="s_intg_bl_seq"/>'/> 
           	<input	type="hidden" name="in_house_bl_no" value='<bean:write name="valMap" property="s_house_bl_no"/>'/> 
         </logic:notEmpty>
		
    <!-- 타이틀, 네비게이션 -->
    <table width="950" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td class="bigtitle"><%=LEV3_NM%></td>
            <td align="right" nowrap class="navi"><img src="<%=CLT_PATH%>/web/img/main/navi_icon.gif" width="6" height="5" hspace="3" vspace="5" align="texttop"><%=LEV1_NM%> > <%=LEV2_NM%> ><span class="navi_b"><%=LEV3_NM%></span></td>
        </tr>
    </table>
    <!-- 타이틀, 네비게이션 -->
    <!--빈공간 -->
    <table width="950" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td height="4"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
        </tr>
    </table>
    <!--빈공간 -->
    <!-- 소타이틀, 대버튼 -->
    <table width="950" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td align="right">
                <table border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="6"/></td>
                        <td style="cursor:hand" onclick="doWork('SEARCHLIST')">
                            <table height="21" border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"/></td>
                                    <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Search"/></td>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"/></td>
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
    <table width="950" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td height="4"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
        </tr>
    </table>
    <!--빈공간 -->
    <!-- 검색 -->
    <table width="950" border="0" cellpadding="0" cellspacing="0">
        <tr>
            <td align="left" class="table_search_bg">
                <!-- 간격 -->
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
                    </tr>
                </table>
                <!-- 간격 -->
                <!-- 검색창 -->
                <table border="0" cellpadding="0" cellspacing="0">
                    <tr>
                        <td width="55"  class="table_search_head"><bean:message key="Status"/></td>
                        <td width="200" class="table_search_body">
                            <input type="radio" name="s_status" id="s_status1" checked value="1"/><label for="s_status1"><bean:message key="Status"/><bean:message key="All"/></label>
                            <input type="radio" name="s_status" id="s_status2" value="2"/><label for="s_status2"><bean:message key="Issued"/></label>
                            <input type="radio" name="s_status" id="s_status3" value="3"/><label for="s_status3"><bean:message key="Not_Issued"/></label>
                        </td>
                        <td width="15"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
                        <td width="40"  class="table_search_head_r"><bean:message key="ETA"/></td>
                        <td class="table_search_body">
							<input type="text" name="eta_strdt" onKeyUp="mkDateFormat(this,event,false)" onBlur="mkDateFormat(this, event, true)" size='11' maxlength="10" class="search_form">
							~
							<input type="text" name="eta_enddt" onKeyUp="mkDateFormat(this,event,false)" onBlur="mkDateFormat(this, event, true)" size='11' maxlength="10" class="search_form">
							<img id="eta_dt_cal" onclick="doDisplay('DATE11', form);" src="<%=CLT_PATH%>/web/img/button/btns_calendar.gif" style="cursor:hand;" align="absmiddle">
						</td>
						<td width="15"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
                        <td width="75" class="table_search_head_r"><bean:message key="Office"/></td>
						<td width="115" class="table_search_body">
							<div id="div_subcode">
				             	<bean:define id="oficeList" name="valMap" property="ofcList"/>
				             	<bean:define id="ofc_cd" name="valMap" property="ofc_cd"/>
				             	<input	type="hidden" name="s_ofc_cd" value='<bean:write name="valMap" property="ofc_cd"/>'/> 
				             	<select name="ofc_cd" style="width:115;"/>
		             		<logic:iterate id="ofcVO" name="oficeList">
			             			<option value='<bean:write name="ofcVO" property="ofc_cd"/>'><bean:write name="ofcVO" property="ofc_eng_nm"/></option>
		             		</logic:iterate>
			             		</select>
			            	</div>
						</td>
					</tr>
					<tr>
                        <td width="60"  class="table_search_head"><bean:message key="HBL_No"/></td>
                        <td class="table_search_body">
	                        <input name="s_house_bl_no" type="text" maxlength="40" class="search_form" dataformat="excepthan" style="ime-mode isabled;text-transform:uppercase;width:115;"/>
                            <img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" align="absmiddle" style="cursor:hand" onclick="doWork('HBL_POPLIST')"/>
                        </td>
                        <td width="15"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
                        <td width="70"  class="table_search_head"><bean:message key="Customer"/></td>
                        <td class="table_search_body">
                        	<input name="s_trdp_cd" maxlength="20" type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px;"/>
                            <img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" align="absmiddle" style="cursor:hand" onclick="doWork('PARTNER_POPLIST')"/>
                            <input name="s_trdp_short_nm" type="text" class="search_form-disable" style="width:50px;"/>
                            <input name="s_trdp_full_nm" maxlength="50" type="text" class="search_form-disable" style="width:180px;"/>
                        </td>
                    </tr>
                </table>
                <!-- 검색창 -->
                <!-- 간격 -->
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
                    </tr>
                </table>
                <!-- 간격 -->
            </td>
        </tr>
    </table>
    <table width="950" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td height="4"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
        </tr>
    </table>
    <!--빈공간 -->
    <table width="950" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td height="4"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
        </tr>
    </table>
    <!--빈공간 -->
    <!-- 검색 -->
    <table width="950" border="0" cellpadding="0" cellspacing="0">
        <tr>
            <td align="left" class="table_search_bg">
                <!-- 간격 -->
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
                    </tr>
                </table>
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td align="left" valign="top">
							<table border="0" width="100%" id="mainTable">
								<tr>
									<td colspan ="2">
										<script language="javascript">comSheetObject('sheet1');</script>
									 </td>
								</tr>
							</table>
							<table width="100%" border="0" cellspacing="0" cellpadding="0">
								<tr>
									<td width="60">
								<!--- Display option Begin --->
										<bean:define id="pagingVal" name="valMap"     property="paging"/>
										<paging:options name="pagingVal" defaultval="200"/>
								<!--- Display option End --->                 
									</td>
									<td align="center">
										<table  border="0" width="100%">
											<tr>
												<td id="pagingTb" align="center" class="paging" height="10" valign="bottom"></td>
												<td width="60"></td>
											</tr>
										</table>
									</td>
								</tr>
							</table>
                        </td>
                    </tr>
                </table>
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td height="7"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    </form>
	<form name="frm2" method="POST" action="./GateServlet.gsl">
		<input type="hidden" name="goWhere" value="fd">
		<input type="hidden" name="bcKey"   value="andoFileDown">
		<input type="hidden" name="s_palt_doc_seq" value="">
		<input type="hidden" name="s_palt_doc_tp_cd" value="">
		<input type="hidden" name="docType" value="">
	</form>
</body>
</html>