<%--
=========================================================
*@FileName   : SEE_FRT_0040.jsp
*@FileTitle  : Correction Advice
*@Description: Correction Advice list search
*@author     : 이광훈 - see =Export 
*@version    : 1.0 - 01/22/2009
*@since      : 01/22/2009

*@Change history:
=========================================================
--%>

<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
    <%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
    <title><bean:message key="system.title"/></title>
	<!-- 공통 Header -->
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>

	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SEA_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="./apps/fis/sec/frt/cainfo/script/SEC_FRT_0060.js?ver=<%=CLT_JS_VER%>"></script>
	
</head>
<bean:define id="objVO"  name="EventResponse" property="objVal"/>

<body class="td" onload="javascript:initFinish();loadPage();doWork('SEARCHLIST');">
<form name="form" method="POST" action="./">
	<!-- Command를 담는 공통 -->
	<input	type="hidden" name="f_cmd"/> 
	<input	type="hidden" name="s_ca_no"/> 
	<input	type="hidden" name="s_intg_bl_seq"/> 
	
	<!-- 화면이동 변수 처리-->
	<input	type="hidden" name="pre_ofc_cd" value='<bean:write name="objVO" property="s_ofc_cd"/>'/>	
	<input	type="hidden" name="openMean" value='<bean:write name="objVO" property="openMean"/>'/>
	
    <!-- 타이틀, 네비게이션 -->
    <table width="950" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td class="bigtitle"><bean:message key="Correction_Advice_Search"/></td>
	<logic:notEmpty name="EventResponse">
       	<bean:define id="ofcMap"  name="EventResponse" property="mapVal"/>
       	<input type="hidden" name="bnd_clss_cd" value='<bean:write name="ofcMap" property="bnd_clss_cd"/>'/>
			<logic:equal name="ofcMap" property="bnd_clss_cd" value="O">
			<td align="right" nowrap class="navi"><img src="<%=CLT_PATH%>/web/img/main/navi_icon.gif" width="6" height="5" hspace="3" vspace="5" align="texttop"><%=LEV1_NM%> > <bean:message key="Export"/> > <span class="navi_b"><%=LEV3_NM%></span></td>
			</logic:equal>
			<logic:equal name="ofcMap" property="bnd_clss_cd" value="I">
			<td align="right" nowrap class="navi"><img src="<%=CLT_PATH%>/web/img/main/navi_icon.gif" width="6" height="5" hspace="3" vspace="5" align="texttop"><%=LEV1_NM%> > <bean:message key="Import"/> > <span class="navi_b"><%=LEV3_NM%></span></td>
			</logic:equal>
	</logic:notEmpty>
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
                    <tr>
                        <td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="6"></td>
                        <td style="cursor:hand" onclick="doWork('SEARCHLIST');">
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
    <table width="950" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td height="4"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
        </tr>
    </table>
    <!--빈공간 -->
    <table width="950" border="0" cellpadding="0" cellspacing="0">
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
		                          	<td width="75" nowrap class="table_search_head"><bean:message key="HBL_No"/></td>
		                            <td class="table_search_body">
		                            	<input name="s_house_bl_no" type="text" maxlength="40" class="search_form" dataformat="excepthan" style="ime-mode isabled;text-transform:uppercase;width:115;" value='<bean:write name="objVO" property="s_house_bl_no"/>'/>
		                            </td>
		                          	<td width="15"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
		                          	<td width="60" nowrap class="table_search_head"><bean:message key="MBL_No"/></td>
		                            <td class="table_search_body">
		                            	<input name="s_master_bl_no" type="text" maxlength="40" class="search_form" dataformat="excepthan" style="ime-mode isabled;text-transform:uppercase;width:115;" value='<bean:write name="objVO" property="s_master_bl_no"/>'/>
		                            </td>
		                          	<td width="15"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
		                          	<td width="50" nowrap class="table_search_head_r"><bean:message key="Date"/></td>
		                          	<td class="table_search_body">
										<input type="text" name="s_rgst_strdt" onKeyUp="mkDateFormat(this,event,false)" onBlur="mkDateFormat(this, event, true)" style="width:70;" maxlength="10" value='<bean:write name="objVO" property="s_rgst_strdt"/>' class="search_form">
										~
										<input type="text" name="s_rgst_enddt" onKeyUp="mkDateFormat(this,event,false)" onBlur="mkDateFormat(this, event, true)" style="width:70;" maxlength="10" value='<bean:write name="objVO" property="s_rgst_enddt"/>' class="search_form">
										<img id="s_rgst_dt_cal" onclick="doDisplay('DATE11', form);" src="<%=CLT_PATH%>/web/img/button/btns_calendar.gif" style="cursor:hand;" align="absmiddle"/>
									</td>
		                          	<td width="15"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
		                          	<td width="50" nowrap class="table_search_head_r"><bean:message key="Status"/></td>
		                          	<td nowrap class="table_search_body">
		                          		<input type="radio" name="s_status" id="s_status1" value="N" <logic:equal name="objVO" property="s_status" value="N"> checked</logic:equal> ><label for="s_status1"><bean:message key="All"/></label>
		                            	<input type="radio" name="s_status" id="s_status2" value="I" <logic:equal name="objVO" property="s_status" value="I"> checked</logic:equal> ><label for="s_status2"><bean:message key="Issued"/></label>
		                            	<input type="radio" name="s_status" id="s_status3" value="C" <logic:equal name="objVO" property="s_status" value="C"> checked</logic:equal> ><label for="s_status3"><bean:message key="Confirmed"/></label>
		                           	</td>
		                        </tr>
	                          	<tr>
	                          		<td width="50" nowrap class="table_search_head"><bean:message key="Partner"/></td>
	                            	<td nowrap class="table_search_body" colspan="4">
		                            	<input name="s_trdp_cd" type="text" class="search_form" style="width:50;" value='<bean:write name="objVO" property="s_trdp_cd"/>'>
		                                <img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" align="absmiddle"	style="cursor:hand;" onclick="doWork('PARTNER_POPLIST')">
		                                <input name="s_trdp_short_nm" type="text" class="search_form-disable" style="width:50;" value='<bean:write name="objVO" property="s_trdp_short_nm"/>'>
		                                <input name="s_trdp_full_nm" type="text" class="search_form-disable" style="width:150;" value='<bean:write name="objVO" property="s_trdp_full_nm"/>'>
		                            </td>
		                            <td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" /></td>
		                            <td class="table_search_head_r"><bean:message key="Office"/></td>
									<td class="table_search_body" colspan="5">
				             <logic:notEmpty name="EventResponse">
						             	<bean:define id="ofcMap"  name="EventResponse" property="mapVal"/>
						             	<bean:define id="oficeList" name="ofcMap" property="ofcList"/>
						             	<bean:define id="ofc_cd" name="ofcMap" property="ofc_cd"/> 
						             	<input	type="hidden" name="s_ofc_cd" value='<bean:write name="ofcMap" property="ofc_cd"/>'/> 
						             	<select name="ofc_cd" style="width:115;"/>
				             		<logic:iterate id="ofcVO" name="oficeList">
					             			<option value='<bean:write name="ofcVO" property="ofc_cd"/>'><bean:write name="ofcVO" property="ofc_eng_nm"/></option>
				             		</logic:iterate>
				             </logic:notEmpty>
					             		</select>
									</td>
	                          	</tr>
                        </table>
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
    <!--빈공간 -->
    <table width="950" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td height="4"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
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
                        <td height="7"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                    </tr>
                </table>
				<table border="0" width="100%" id="mainTable">
					<tr>
						<td>
							<script language="javascript">comSheetObject('sheet1');</script>
						 </td>
					</tr>
				</table>
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                    <td height="7"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                </tr>
                </table>
            </td>
        </tr>
    </table>
    </form>
</body>
</html>