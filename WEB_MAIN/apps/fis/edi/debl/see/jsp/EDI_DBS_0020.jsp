<%--
=========================================================
*Copyright(c) 2009 CyberLogitec. All Rights Reserved.
=========================================================
=========================================================
*@FileName   : EDI_DBS_0020.jsp
*@FileTitle  : DE Customs EDI (Ocean) List
*@Description: DE Customs EDI (Ocean) 저장 및 전송
*@author     : Lee, HaeKyoung
*@version    : 1.0 - 04/05/2012
*@since      :

*@Change history:
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.HashMap"%>
    <%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
    
    <bean:define id="valMap"  name="EventResponse" property="mapVal"/>

    <title><bean:message key="system.title"/></title>
    <link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/EDI_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/COM_FRT_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_CODE_UTIL.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript" src="<%=CLT_PATH%>/apps/fis/edi/debl/see/script/EDI_DBS_0020.js?ver=<%=CLT_JS_VER%>"></script>
	<script>	
   </script>
</head>
<body class="td" onload="loadPage();">
<form name="frm1" method="POST" action="./EDI_DBS_0020.clt">
    <input type="hidden" name="f_cmd">
    
    <input type="hidden" name="chk_sts">
    
    <table width="1200" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td class="bigtitle"><%=LEV3_NM%></td>
			<td align="right" nowrap="nowrap" class="navi"><img src="<%=CLT_PATH%>/web/img/main/navi_icon.gif" width="6" height="5" hspace="3" vspace="5" align="texttop"><%=LEV1_NM%> > <%=LEV2_NM%> > <span class="navi_b"><%=LEV3_NM%></span></td>
        </tr>
    </table>
    <table width="1200" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td height="4"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
        </tr>
    </table>
    <table width="1200" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td>
            </td>
            <td align="right">
                <table border="0" cellspacing="0" cellpadding="0">
                    <tr>
                    	<!-- 
                        <td onClick="doWork('test')" style="cursor:hand">
                            <table height="21" border="0" cellpadding="0" cellspacing="0" style="margin-left:5px;cursor:hand">
                                <tr>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
                                    <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Search"/></td>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
                                </tr>
                            </table>        
                        </td>
                         -->
                        <td onClick="doWork('SEARCHLIST')" style="cursor:hand">
                            <table height="21" border="0" cellpadding="0" cellspacing="0" style="margin-left:5px;cursor:hand">
                                <tr>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
                                    <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Search"/></td>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
                                </tr>
                            </table>        
                        </td>
                        <td onClick="doWork('TRANSMIT')" style="cursor:hand">
                            <table height="21" border="0" cellpadding="0" cellspacing="0" style="margin-left:5px;cursor:hand">
                                <tr>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
                                    <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Transmit"/></td>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
                                </tr>
                            </table>        
                        </td>
                        <td onClick="doWork('CANCEL')" style="cursor:hand">
                            <table height="21" border="0" cellpadding="0" cellspacing="0" style="margin-left:5px;cursor:hand">
                                <tr>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
                                    <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Cancel"/></td>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
                                </tr>
                            </table>        
                        </td>
<!--                        <td onClick="doWork('AMENDMENT')" style="cursor:hand">-->
<!--                            <table height="21" border="0" cellpadding="0" cellspacing="0" style="margin-left:5px;cursor:hand">-->
<!--                                <tr>-->
<!--                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>-->
<!--                                    <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name">Amendment</td>-->
<!--                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>-->
<!--                                </tr>-->
<!--                            </table>        -->
<!--                        </td>-->
<!--                        <td onClick="doWork('DELETE')" style="cursor:hand">-->
<!--                            <table height="21" border="0" cellpadding="0" cellspacing="0" style="margin-left:5px;cursor:hand">-->
<!--                                <tr>-->
<!--                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>-->
<!--                                    <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name">Delete</td>-->
<!--                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>-->
<!--                                </tr>-->
<!--                            </table>        -->
<!--                        </td>-->
<!--						<td onClick="doWork('DELETE')" style="cursor:hand">-->
<!--                            <table height="21" border="0" cellpadding="0" cellspacing="0" style="margin-left:5px;cursor:hand">-->
<!--                                <tr>-->
<!--                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>-->
<!--                                    <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name">Delete</td>-->
<!--                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>-->
<!--                                </tr>-->
<!--                            </table>        -->
<!--                        </td>-->
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    <table width="1200" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td height="4"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
        </tr>
    </table>
    <table width="1200" border="0" cellpadding="0" cellspacing="0">
        <tr>
            <td align="left" class="table_search_bg">
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                    </tr>
                </table>
                <table border="0" cellpadding="0" cellspacing="0">
                    <tr>
                    	<td width="60" nowrap class="table_search_body"><input type="radio" name="f_bl_type" id="f_prn_opt1" value="M" checked><label for="f_prn_opt1"><bean:message key="Master"/></label></td>
                        <td width="60" nowrap class="table_search_body"><input type="radio" name="f_bl_type" id="f_prn_opt2" value="H"><label for="f_prn_opt2"><bean:message key="House"/></label></td>
                        <td width="60" nowrap class="table_search_head"><bean:message key="BL_No"/></td>
                        <td width="140" class="table_search_body">
                            <input name="f_bl_no"  maxlength="40" value="<bean:write name="valMap" property="f_bl_no"/>" type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:100;text-transform:uppercase;" onblur="strToUpper(this)">
                            <img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" onClick="openPopUp('BL_POPLIST',this)" style="cursor:hand" align="absmiddle">
                        </td>
                       	<td width="10"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                        <td width="90" nowrap class="table_search_head"><bean:message key="Ref_No"/></td>
                        <td width="140" class="table_search_body">
                            <input name="f_ref_no"  maxlength="20" value="<bean:write name="valMap" property="f_ref_no"/>" type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:100;text-transform:uppercase;" onblur="strToUpper(this)">
                            <img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" style="cursor:hand" align="absmiddle">
                        </td>
                        <td width="80"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
						<td width="60"  nowrap="nowrap" class="table_search_head"><bean:message key="Status"/></td>
                        <td width="80" nowrap="nowrap" class="table_search_body">
                       		<select name="f_msg_sts" class="search_form" style="width:80px;">
                       			   <option value=""></option>
                                   <option value="0"><bean:message key="Upload"/></option>
                                   <option value="9">Transmit</option>
                                   <option value="1">Cancel</option>
                                   <option value="2">Delete</option>
                                   <option value="3">Error</option>
                              </select>
                      	</td>
                      	<td width="55"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
						<td width="60"   nowrap="nowrap" class="table_search_head"><bean:message key="Type"/></td>
                        <td width="60" nowrap="nowrap" class="table_search_body">
                       		<select name="f_trns_tp" class="search_form" style="width:60px;">
                       			   <option value=""></option>
                                   <option value="AES">AES</option>
                                   <option value="SAC">SAC</option>
                                   <option value="SBF"> SBF</option>
                              </select>
                      	</td>
                    </tr>
                </table>
                <table border="0" cellpadding="0" cellspacing="0">
                    <tr>
                        <td width="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                        <td width="90"  class="table_search_head"><bean:message key="Upload_Date"/></td>
                        <td width="210" class="table_search_body">
							<input type="text" name="f_rgst_strdt" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1)" size='11' maxlength="10" class="search_form">
							~
							<input type="text" name="f_rgst_enddt" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1)" size='11' maxlength="10" class="search_form">
							<img id="f_rgst_dt_cal" onclick="doDisplay('DATE11', frm1);" src="<%=CLT_PATH%>/web/img/button/btns_calendar.gif" style="cursor:hand;" align="absmiddle"/>
						</td>
						<td width="20"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
						<td width="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                        <td width="90"  class="table_search_head"><bean:message key="ETD"/></td>
                        <td width="210" class="table_search_body">
							<input type="text" name="f_etd_strdt" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1)" size='11' maxlength="10" class="search_form">
							~
							<input type="text" name="f_etd_enddt" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1)" size='11' maxlength="10" class="search_form">
							<img id="f_etd_dt_cal" onclick="doDisplay('DATE12', frm1);" src="<%=CLT_PATH%>/web/img/button/btns_calendar.gif" style="cursor:hand;" align="absmiddle"/>
						</td>
						<td width="10"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
						<td width="60" nowrap class="table_search_head"><bean:message key="Vessel"/></td>
                        <td width="140" class="table_search_body">
                            <input name="f_trnk_vsl_nm"  value="<bean:write name="valMap" property="f_trnk_vsl_nm"/>" type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:120;text-transform:uppercase;" onblur="strToUpper(this)">
                        </td>
                    </tr>
                </table>
                <table border="0" cellpadding="0" cellspacing="0">
                    <tr>
                        <td width="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                        <td width="90"  class="table_search_head"><bean:message key="Register_Date"/></td>
                        <td width="210" class="table_search_body">
							<input type="text" name="f_rgst_strdt1" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1)" size='11' maxlength="10" class="search_form">
							~
							<input type="text" name="f_rgst_enddt1" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1)" size='11' maxlength="10" class="search_form">
							<img id="f_rgst_dt1_cal" onclick="doDisplay('DATE13', frm1);" src="<%=CLT_PATH%>/web/img/button/btns_calendar.gif" style="cursor:hand;" align="absmiddle"/>
						</td>
                    </tr>
                </table>
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
		<tr>
			<td height="1"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
		</tr>
	</table>
    
	<table width="1200" border="0" cellspacing="0" cellpadding="0">
		<tr>
			<td height="22" align="left">
				<table height="22" border="0" cellpadding="0" cellspacing="0">
					<tr>
					<td></td>
					</tr>
				</table>
			</td>
		</tr>
		<tr>
<!--			<td align="center" valign="top" background="<%=CLT_PATH%>/web/img/main/tab_table_bg.gif">-->
			<td align="center" valign="top"  class="table_search_bg">
				<table width="100%" border="0" cellspacing="10" cellpadding="0">
					<tr>
						<td valign="top">
                            <table width="100%" border="0" bordercolor="blue" cellspacing="0" cellpadding="0">                          
                                <!-- Message -->
                                <tr>
                                    <td height="10px" colspan="3"></td>
                                </tr>
                                <tr>
                                    <td align="left" valign="top" colspan="3">
                                        <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td valign="top" align="center" colspan="3"> 
                                                    <table border="0" width="100%" id="mainTable" cellpadding="0" cellspacing="0">
                                                        <tr>
                                                            <td>
                                                                <script language="javascript">comSheetObject('sheet1');</script>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
								</tr>
                            </table>
						</td>
					</tr>
				</table>
			</td>
		</tr>
<!--		<tr>-->
<!--			<td width="1200" height="1" background="<%=CLT_PATH%>/web/img/main/tab_table_bottomg.gif"></td>-->
<!--		</tr>-->
	</table>
</form>
</body>
</html>