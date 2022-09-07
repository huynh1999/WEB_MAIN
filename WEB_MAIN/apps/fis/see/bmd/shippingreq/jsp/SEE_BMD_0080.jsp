<%--
=========================================================
*@FileName   : SEE_BMD_0080.jsp
*@FileTitle  : S/R Search 
*@Description: S/R Search 조회한다.
*@author     : 이광훈 - see =Export 
*@version    : 1.0 - 01/15/2009
*@since      : 01/15/2009

*@Change history:
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
    <%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
    <title><bean:message key="system.title"/></title>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SEA_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="./apps/fis/see/bmd/shippingreq/script/SEE_BMD_0080.js?ver=<%=CLT_JS_VER%>"></script>
	<bean:define id="valMap"  name="EventResponse" property="mapVal"/>
</head>
<body leftmargin="0" topmargin="0" marginwidth="0" marginheight="0" class="td" onload="javascript:initFinish();loadPage();doWork('SEARCHLIST')">
	<form name="frm1" method="POST" action="./">
	<input type="hidden" name="f_cmd" value=""> 
	<input type="hidden" name="s_intg_bl_seq" value=""> 
	<input type="hidden" name="f_CurPage"     value="">
	<input type="hidden" name="master_bl_no"  value=""> 
	<input type="hidden" name="house_bl_no"   value="">
	<input type="hidden" name="user_id"  value="<%=userInfo.getUsrid()%>" />
	<input type="hidden" name="pageurl" id="pageurl" value="SEE_BMD_0080.clt"/>
    <!-- 타이틀, 네비게이션 -->
    <table width="1200" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td class="bigtitle"><%=LEV3_NM%></td>
            <td align="right" nowrap="nowrap" class="navi"><img src="<%=CLT_PATH%>/web/img/main/navi_icon.gif" width="6" height="5" hspace="3" vspace="5" align="texttop"><%=LEV1_NM%> > <%=LEV2_NM%> > <span class="navi_b"><%=LEV3_NM%></span></td>
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
                        <td style="cursor:hand" onclick="doWork('SEARCHLIST')">
                            <table height="21" border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
                                    <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Search"/></td>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
                                </tr>
                            </table>            
                        </td>
                        <td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="6"></td>
                        <td style="cursor:hand" onclick="doWork('NEW')">
                            <table height="21" border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
                                    <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="New"/></td>
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
    <table width="1200" border="0" cellpadding="0" cellspacing="0">
      <tr>
        <td align="left" class="table_search_bg"><!-- 간격 -->
            <table width="100%" border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
              </tr>
            </table>
          <!-- 간격 -->
            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                    <td align="left" valign="top">
                        <table border="0" cellpadding="0" cellspacing="0">
                            <tr>
                                <td width="60" nowrap="nowrap" class="table_search_head"><bean:message key="SR_No"/></td>
                                <td width="120" class="table_search_body">
                                	<input type="text" name="f_sr_no" maxlength="15"  class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:100;" 
onblur="strToUpper(this);"/>
                                </td>
                                <td width="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                                <td width="50" nowrap="nowrap" class="table_search_head"><bean:message key="MBL"/></td>
                                <td width="135" class="table_search_body">
                                    <input type="text" name="f_mbl_no" class="search_form" dataformat="excepthan" style="ime-mode isabled;width:115;"/>
                                </td>
								<td width="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>     
                                <td width="40" nowrap="nowrap" class="table_search_head_r"><bean:message key="ETD"/></td>
                                <td width="200" class="table_search_body">
                                    <input type="text" name="etd_strdt" onKeyUp="mkDateFormat(this,event,false)" onBlur="mkDateFormat(this, event, true)" style="width:70;" maxlength="10" class="search_form">
                                    ~
                                    <input type="text" name="etd_enddt" onKeyUp="mkDateFormat(this,event,false)" onBlur="mkDateFormat(this, event, true)" style="width:70;" maxlength="10" class="search_form">
                                    <img id="etd_dt_cal" onclick="doDisplay('DATE11', frm1);" src="<%=CLT_PATH%>/web/img/button/btns_calendar.gif" style="cursor:hand;" align="absmiddle"/>
                                </td>  
                                <td width="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif" /></td>  
                                <td width="50" class="table_search_head_r"><bean:message key="Office"/></td>
								<td width="200" class="table_search_body">
									<div id="div_subcode">
						             	<bean:define id="oficeList" name="valMap" property="ofcList"/>
						             	<input type="hidden" name="f_ofc_cd" value='<bean:write name="valMap" property="ofc_cd"/>'/> 
						             	<select name="ofc_cd" style="width:175px;"/>
				             		<logic:iterate id="ofcVO" name="oficeList">
					             			<option value='<bean:write name="ofcVO" property="ofc_cd"/>'><bean:write name="ofcVO" property="ofc_eng_nm"/></option>
				             		</logic:iterate>
					             		</select>
					            	</div>
								</td>
								<td width="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>       
                                <td width="70" class="table_search_head_r"><bean:message key="Dept"/></td>
                                <td class="table_search_body">
									<bean:define id="dptLst" name="valMap" property="deptList"/>
									<html:select name="valMap" property="f_dpt_cd" style="width:115px;">
										<option value="">All</option>
										<html:options collection="dptLst" property="cd_val" labelProperty="cd_nm"/>
									</html:select>
                                </td>
                            </tr>
						</table>
                        <table border="0" cellpadding="0" cellspacing="0">
                            <tr>     
                                <td width="60" nowrap="nowrap" class="table_search_head"><bean:message key="HBL_No"/></td>
                                <td width="120" class="table_search_body">
                                    <input type="text" name="f_hbl_no"  maxlength="40" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:100;"/>
                                </td>
                                <td width="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
								<td width="45" nowrap="nowrap" class="table_search_head"><bean:message key="Liner"/></td>
                                <td width="135" class="table_search_body">
									<input type="text"   name="f_lnr_nm" maxlength=50"" value='' class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:90px;">
                                	<input type="hidden" name="s_trdp_cd"       value='' class="search_form" onKeyDown="codeNameAction('trdpCode',this, 'onKeyDown')" onBlur="codeNameAction('trdpCode',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50;">
                                    <img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" align="absmiddle" style="cursor:hand" onclick="doWork('PARTNER_POPLIST')"/>
                                    <input type="hidden" name="s_trdp_short_nm"          class="search_form-disable" style="width:50px;"/>
                                </td>
								<td width="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
                                <td width="40" class="table_search_head"><bean:message key="POL"/></td>
                                <td width="200" class="table_search_body">
                                    <input type="text" name="f_pol_cd" maxlength="5"   value='' class="search_form" onKeyDown="codeNameAction('location_pol',this, 'onKeyDown')" onBlur="codeNameAction('location_pol',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50;"/>
                                    <img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" align="absmiddle" style="cursor:hand" onclick="doWork('POL_LOCATION_POPLIST')"/>
                                    <input type="text" name="f_pol_name" value='' class="search_form-disable" style="width:100px;" readonly>
                                </td>
                                <td width="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif" /></td>  
                                <td width="50" class="table_search_head"><bean:message key="POD"/></td>
                                <td width="200" class="table_search_body">
                                    <input type="text" name="f_pod_cd"  maxlength="5" value='' class="search_form" onKeyDown="codeNameAction('location_pod',this, 'onKeyDown')" onBlur="codeNameAction('location_pod',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50;"/>
                                    <img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" align="absmiddle" style="cursor:hand" onclick="doWork('POD_LOCATION_POPLIST')"/>
                                    <input type="text" name="f_pod_name" maxlength="50" value='' class="search_form-disable" style="width:100px;" readonly>
                                </td>
                                <td width="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
                                <td width="80" class="table_search_head_r"><bean:message key="Operator"/></td>
                                <td>
									<input type="text" name="f_pic_id" value='<bean:write name="valMap" property="curPic"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:70;">
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
    <!--빈공간 -->
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
                        <td height="7"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                    </tr>
                </table>
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td align="left" valign="top">
							<table border="0" width="100%" id="mainTable">
								<tr>
									<td>
										<script language="javascript">comSheetObject('sheet1');</script>
									 </td>
								</tr>
							</table>
                        </td>
                    </tr>
                </table>
            <!--- Paging(공통) --->
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td width="60">
                    <!--- Display option Begin --->
                            <bean:define id="pagingVal" name="valMap" property="paging"/>
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
            <!--- Paging(공통) --->
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
</script>