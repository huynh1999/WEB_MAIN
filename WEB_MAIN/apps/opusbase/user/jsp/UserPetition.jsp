<%--
=========================================================
*Copyright(c) 2008 CyberLogitec. All Rights Reserved.
=========================================================

=========================================================
*@FileName   : MGT_NTC_0020.jsp
*@FileTitle  : 게시판 등록화면
*@Description: 게시판 등록/수정화면입니다.
*@author     : Kang,Jung-Gu - Cyberlogitec
*@version    : 1.0 - 02/05/2009
*@since      : 02/05/2009

*@Change history:
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
<%@include file="./../../../../../../../../syscommon/header/CLTHeader.jsp"%>
<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css">

	<bean:define id="mapVO" name="EventResponse" property="mapVal"/>
	<bean:define id="ntcVO" name="EventResponse" property="objVal"/>
	
    <script language="javascript" src="./apps/opusbase/service/notice/script/NoticeMngRead.js?ver=<%=CLT_JS_VER%>"></script>	
	
	<!-- 일자 및 달력팝업 호출 -->
    <script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SYS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script>
    <logic:notEmpty name="mapVO" property="noticeDocExt">
            var noticeDocExt = '<bean:write name="mapVO" property="noticeDocExt"/>';        
    </logic:notEmpty>
		
	</script>
</head>
<body class="td" onload="setDfDate();">
<form name="fName" method="POST" enctype="multipart/form-data">
    <input type="hidden" name="f_cmd"     value="">
	<input type="hidden" name="f_brd_seq" value="<bean:write name="ntcVO" property="brd_seq"/>">
    <input type="hidden" name="f_brd_file"value="<bean:write name="ntcVO" property="file_url"/>">

	<html:hidden name="mapVO" property="f_CurPage"/>
    <html:hidden name="mapVO" property="f_dp_bgn_dt"/>
    <html:hidden name="mapVO" property="f_dp_end_dt"/>
    <html:hidden name="mapVO" property="f_wrt_id"/>
    <html:hidden name="mapVO" property="f_wrt_nm"/>
						
    <!-- 타이틀, 네비게이션 -->
    <table width="950" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td class="bigtitle"><bean:message key="Notice_Registration"/></td>
            <td align="right" nowrap class="navi"><img src="<%=CLT_PATH%>/web/img/main/navi_icon.gif" width="6" height="5" hspace="3" vspace="5" align="texttop"><%=LEV1_NM%> > <%=LEV2_NM%> > <span class="navi_b"><%=LEV3_NM%></span></td>
        </tr>
    </table>
    <!-- 타이틀, 네비게이션 -->
    <!--빈공간 -->
    <table width="950" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td height="4"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
        </tr>
    </table>
    <!--빈공간 -->
    <!-- 소타이틀, 대버튼 -->
    <table width="950" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td align="right">
                <table border="0" cellspacing="0" cellpadding="0">
        <logic:empty name="ntcVO" property="brd_seq"><!--최초 등록시-->
                    <tr>
                        <td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="6"></td>
                        <td onclick="doWork('ADD');" style="cursor:hand">
                            <table id="btnAdd" height="21" border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
                                    <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Save"/></td>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
                                </tr>
                            </table>
                         </td>
                         <td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="6"></td>
                         <td onclick="doWork('SEARCHLIST');" style="cursor:hand">
                            <table height="21" border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
                                    <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="List"/></td>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
                                </tr>
                            </table>
                          </td>
                    </tr>
        </logic:empty>
        <logic:notEmpty name="ntcVO" property="brd_seq"><!--수정록시-->
                    <tr>
                        <td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="6"></td>
                        <td onclick="doWork('MODIFY');" style="cursor:hand">
                            <table id="btnModify" height="21" border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
                                    <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Save"/></td>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
                                </tr>
                            </table>
                         </td>
                        <td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="6"></td>
                        <td onclick="doWork('REMOVE');" style="cursor:hand">
                            <table id="btnDelete" height="21" border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
                                    <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Delete"/></td>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
                                </tr>
                            </table>
                         </td>
                         <td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="6"></td>
                         <td onclick="doWork('SEARCHLIST');" style="cursor:hand">
                            <table height="21" border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
                                    <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="List"/></td>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
                                </tr>
                            </table>
                          </td>
                    </tr>
        </logic:notEmpty>
                </table>
            </td>
        </tr>
    </table>
    <!-- 소타이틀, 대버튼 -->
    <!--빈공간 -->
    <table width="950" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td height="4"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
        </tr>
    </table>
				
    <table width="950" border="0" cellpadding="0" cellspacing="0">
        <tr>
            <td align="left" class="table_search_bg">
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td align="left" valign="top">
						    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td width="80" nowrap class="table_search_head"><bean:message key="Title"/></td>
                                    <td class="table_search_body" colspan="6">
                                       <input type="text" name="brd_tit" value="<bean:write name="ntcVO" property="brd_tit"/>" maxlength="100" class="search_form" style="width:500;">
                                    </td>
                                </tr>
							</table>
						</td>
					</tr>
					<tr>
						<td height="4"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
					</tr>
						<td align="left" valign="top">
						    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                    <td width="80" nowrap class="table_search_head"><bean:message key="Level"/></td>
                                    <td width="100"class="table_search_body">
                                       <select name="dp_scp">
										   <option value="P" <logic:equal name="ntcVO" property="dp_scp" value="P">selected</logic:equal>><bean:message key="Public"/></option>
							               <option value="M" <logic:equal name="ntcVO" property="dp_scp" value="M">selected</logic:equal>><bean:message key="Private"/></option>
									   </select>
                                    </td>
                                    <td width="15"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
									<td width="120" nowrap class="table_search_head"><bean:message key="Notification_Period"/><!--<bean:message key="Expire_Date"/>--></td>
									<td width="90" class="table_search_body">
										<%boolean dispDt = false; %>
										<logic:notEmpty name="ntcVO" property="dp_end_dt">
											<logic:notEqual name="ntcVO" property="dp_end_dt" value="30001231"><% dispDt = true; %></logic:notEqual>
										</logic:notEmpty>
										
										<select name="f_period_tp" onchange="doDispDate(this)">
											<option value="P" <% if(!dispDt){ %>selected<% } %> >Permanent</option>
											<option value="T" <% if(dispDt){ %>selected<% } %> >Temporary</option>
										</select>
									</td>
									<td width=""120 class="table_search_body">
										<div id="dateDispObj" <% if(!dispDt){ %>style="display:none;"<% } %>>
											<input type="text" name="dp_end_dt" value="<wrt:write name="ntcVO" property="dp_end_dt" formatType="DATE" fromFormat="yyyyMMdd" format="yyyy-MM-dd"/>" class="search_form" dataformat="excepthan" style="width:80px;ime-mode:disabled" maxlength="10" onkeyup="mkDateFormat(this,event,false)" onblur="mkDateFormat(this, event, true)">
											<img src="<%=CLT_PATH%>/web/img/button/btns_calendar.gif" onclick="doDisplay('DATE1', fName);" style="cursor:hand;" width="19" height="21" border="0" align="absmiddle">
										</div>
									</td>
									<td>&nbsp;</td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td height="4"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                    </tr>
                        <td align="left" valign="top">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
								<tr>
                                    <td width="80" nowrap class="table_search_head"><bean:message key="Attach_File"/></td>
                                    <td class="table_search_body" colspan="6">
                            <logic:notEmpty name="ntcVO" property="file_url">
                                       <bean:write name="ntcVO" property="file_url"/>&nbsp;&nbsp;<img onclick="doWork('REMOVE01');" src="<%=CLT_PATH%>/web/img/main/trash.gif" border="0" style="cursor:hand;" align="absmiddle"><br>
                            </logic:notEmpty>
                                       <input type="file" name="brd_file" class="search_form" style="width:420;">
                                    </td>
                                </tr>
						    </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    <table width="950" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td height="4"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
        </tr>
    </table>
    <table width="950" border="0" cellpadding="0" cellspacing="0">
        <tr>
            <td align="left" class="table_search_bg">
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td align="left" valign="top">
                            <table border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td width="80" nowrap class="table_search_head"><bean:message key="Contents"/></td>
                                    <td class="table_search_body">
                                       <textarea name="brd_ctnt" cols="160" rows="22" ><bean:write name="ntcVO" property="brd_ctnt"/></textarea>
                                    </td>
                                    <td width="15"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</form>
<form name="fName2" method="POST">
    <html:hidden name="mapVO" property="f_CurPage"/>
    <html:hidden name="mapVO" property="f_dp_bgn_dt"/>
    <html:hidden name="mapVO" property="f_dp_end_dt"/>
    <html:hidden name="mapVO" property="f_wrt_id"/>
    <html:hidden name="mapVO" property="f_wrt_nm"/>
</form>
<script>
	doHideProcess();
</script>
</body>
</html>