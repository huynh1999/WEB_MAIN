<%--
=========================================================
*@FileName   : EDI_CSTM_0021.jsp
*@FileTitle  : 항공수출 미세관 AMS BL 추가정보 
*@Description: 
*@author     : Kang,Jung-Gu - Cyberlogitec
*@version    : 1.0 - 07/23/2009
*@since      : 07/23/2009

*@Change history:
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ page import="java.util.HashMap"%>
    <%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>

	<bean:define id="blVO"      name="EventResponse" property="objVal"/>
	<bean:define id="mapVO"     name="EventResponse" property="mapVal"/>
    <bean:define id="stateList" name="EventResponse" property="listVal"/>

    <bean:define id="cdList"  name="mapVO" property="cmmcCd"/>

    <link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css">
    <title><bean:message key="system.title"/></title>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript" src="<%=CLT_PATH%>/apps/fis/edi/cstm/ams/script/EDI_CSTM_0021.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/EDI_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
<style> body { border-top-width: 6px!important; } </style>
</head>
<body class="td">
<form name="frm1" method="POST" action="./EDI_CSTM_0021.clt">
    <!--Command를 담는 공통 -->
    <input type="hidden" name="f_cmd">
    <input type="hidden" name="f_edi_cre_seq" value='<bean:write name="mapVO" property="edi_cre_seq"/>'>
    <input type="hidden" name="f_edi_msg_seq" value='<bean:write name="mapVO" property="edi_msg_seq"/>'>
    <input type="hidden" name="f_bl_seq"      value='<bean:write name="mapVO" property="f_bl_seq"/>'>
		
    <!-- 타이틀, 네비게이션 -->
    <table width="320" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td class="bigtitle"><bean:message key="HAWB_Input"/></td>
            <td align="right" nowrap class="navi"></td>
        </tr>
    </table>
    <!-- 타이틀, 네비게이션 -->
    <table width="100%" border="0" cellpadding="0" cellspacing="0">
       <tr><td height="10"></td></tr>
	   <tr>
        <td align="left" class="table_search_bg"><!-- 간격 -->
            <table width="100%" border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td width="60" nowrap class="table_search_head"><bean:message key="HAWB"/></td>
                <td nowrap  align="left">
                    <input type="text" name="f_hawb" value='<bean:write name="blVO" property="bl_no"/>' class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:120px;" readonly>
                </td>
            </table>
        </td>
      </tr>
    </table>
    <table width="320" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
        </tr>
    </table>
    <table width="100%" border="0" cellpadding="0" cellspacing="0">
        <tr>
            <td align="left" class="table_search_bg" valign="top">
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                  </tr>
                  <tr>
                    <td nowrap class="sub_title" width="120"><img src="<%=CLT_PATH%>/web/img/main/sub_title_arrow.gif" width="7" height="7" hspace="1"><bean:message key="Freight_Information"/></td>
                    <td class="sub_title2"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                  </tr>
				</table>
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
				  <tr><td height="5px"></td></tr>
                  <tr>
                    <td align="left" valign="top">
                        <table border="0" cellpadding="0" cellspacing="0">
                            <tr>
                                <td width="67"  nowrap class="table_search_head">출발지</td>
                                <td width="120" nowrap class="table_search_body">
                                    <input type="text" name="pol_cd" value='<bean:write name="blVO" property="pol_cd"/>' dataformat="excepthan" style="ime-mode:disabled;width:120;" class="search_form" maxlength="3">
                                </td>
								<td width="25px"></td>			
                                <td width="47" nowrap class="table_search_head">수량</td>
                                <td nowrap class="table_search_body">
									<input type="text" name="pck_qty" value='<bean:write name="blVO" property="pck_qty"/>' dataformat="excepthan" style="ime-mode:disabled;width:90;text-align:right" class="search_form">
                                </td>
                            </tr>
                            <tr>
                                <td width="67"  nowrap class="table_search_head">도착지</td>
                                <td width="120" nowrap class="table_search_body">
                                    <input type="text" name="pod_cd" value='<bean:write name="blVO" property="pod_cd"/>' dataformat="excepthan" style="ime-mode:disabled;width:120" class="search_form" maxlength="3">
                                </td>
                                <td width="25px"></td>          
                                <td width="47" nowrap class="table_search_head">중량</td>
                                <td nowrap class="table_search_body">
                                    <input type="text" name="grs_wgt" value='<bean:write name="blVO" property="grs_wgt"/>' dataformat="excepthan" style="ime-mode:disabled;width:90;text-align:right" class="search_form">
                                </td>
                            </tr>
                            <tr>
                                <td width="67" rowspan="2" nowrap class="table_search_head">품명</td>
                                <td nowrap class="table_search_body" colspan="4">
                                    <input type="text" name="itm_nm1" value='<bean:write name="blVO" property="itm_nm1"/>' dataformat="excepthan" style="ime-mode:disabled;width:220" class="search_form" maxlength="15">
                                </td>
                            </tr>
                            <tr>
                                <td nowrap class="table_search_body" colspan="4">
                                    <input type="text" name="itm_nm2" value='<bean:write name="blVO" property="itm_nm2"/>' dataformat="excepthan" style="ime-mode:disabled;width:220" class="search_form" maxlength="20">
                                </td>
                            </tr>
                        </table>
					 </td>
                  </tr>
                </table>
            </td>
        </tr>
    </table>
	<!-- 송하인 정보 -->
    <table width="100%" border="0" cellpadding="0" cellspacing="0">
		<tr><td height="10"></td></tr>
        <tr>
            <td align="left" class="table_search_bg" valign="top">
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                  </tr>
                  <tr>
                    <td nowrap class="sub_title" width="120"><img src="<%=CLT_PATH%>/web/img/main/sub_title_arrow.gif" width="7" height="7" hspace="1"><bean:message key="Shipper_Information"/></td>
                    <td class="sub_title2"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                  </tr>
                </table>
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tr><td height="5px"></td></tr>
                  <tr>
                    <td align="left" valign="top">
                        <table border="0" cellpadding="0" cellspacing="0">
                            <tr>
                                <td width="80"  nowrap class="table_search_head">상호/이름</td>
                                <td nowrap class="table_search_body" colspan="4">
                                    <input type="text" name="shp_co_nm" value='<bean:write name="blVO" property="shp_co_nm"/>' dataformat="excepthan" style="ime-mode:disabled;width:220" class="search_form"  maxlength="35">
                                </td>
                            </tr>
                            <tr>
                                <td width="67"  nowrap class="table_search_head">국가코드</td>
                                <td width="50" nowrap class="table_search_body">
                                    <input type="text" name="shp_cnt_cd" value='<bean:write name="blVO" property="shp_cnt_cd"/>' dataformat="excepthan" style="ime-mode:disabled;width:40" class="search_form" maxlength="2">
                                </td>
                                <td width="25px"></td>          
                                <td width="67" nowrap class="table_search_head">우편번호</td>
                                <td nowrap class="table_search_body">
                                    <input type="text" name="shp_zip_cd" value='<bean:write name="blVO" property="shp_zip_cd"/>' dataformat="excepthan" style="ime-mode:disabled;width:73" class="search_form" maxlength="9">
                                </td>
                            </tr>
                            <tr>
                                <td width="80"  nowrap class="table_search_head"><bean:message key="State_Province"/></td>
                                <td nowrap class="table_search_body" colspan="4">
                                    <input type="text" name="shp_ste" value='<bean:write name="blVO" property="shp_ste"/>'       dataformat="excepthan" style="ime-mode:disabled;width:220" class="search_form"  maxlength="9">
                                </td>
                            </tr>
                            <tr>
                                <td width="80"  nowrap class="table_search_head"><bean:message key="Place"/></td>
                                <td nowrap class="table_search_body" colspan="4">
                                    <input type="text" name="shp_plc" value='<bean:write name="blVO" property="shp_plc"/>'       dataformat="excepthan" style="ime-mode:disabled;width:220" class="search_form" maxlength="17">
                                </td>
                            </tr>
                            <tr>
                                <td width="80"  nowrap class="table_search_head"><bean:message key="Street"/></td>
                                <td nowrap class="table_search_body" colspan="4">
                                    <input type="text" name="shp_st" value='<bean:write name="blVO" property="shp_st"/>'         dataformat="excepthan" style="ime-mode:disabled;width:220" class="search_form"   maxlength="35">
                                </td>
                            </tr>
                            <tr>
                                <td width="67"  nowrap class="table_search_head">연락구분</td>
                                <td width="50" nowrap class="table_search_body">
									<html:select name="blVO" property="shp_cmmc_tp">
                                        <html:options collection="cdList" property="code" labelProperty="code_label"/>
									</html:select>
                                </td>
                                <td width="25px"></td>          
                                <td width="67" nowrap class="table_search_head"><bean:message key="Contact_Point"/></td>
                                <td nowrap class="table_search_body">
                                    <input type="text" name="shp_phn_no" value='<bean:write name="blVO" property="shp_phn_no"/>' dataformat="excepthan" style="ime-mode:disabled;width:110" class="search_form" maxlength="25">
                                </td>
                            </tr>
                        </table>
                     </td>
                  </tr>
                </table>
            </td>
        </tr>
    </table>
    <!-- 수하인 정보 -->
    <table width="100%" border="0" cellpadding="0" cellspacing="0">
        <tr><td height="10"></td></tr>
        <tr>
            <td align="left" class="table_search_bg" valign="top">
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                  </tr>
                  <tr>
                    <td nowrap class="sub_title" width="120"><img src="<%=CLT_PATH%>/web/img/main/sub_title_arrow.gif" width="7" height="7" hspace="1"><bean:message key="Receiver_Information"/></td>
                    <td class="sub_title2"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                  </tr>
                </table>
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                  <tr><td height="5px"></td></tr>
                  <tr>
                    <td align="left" valign="top">
                        <table border="0" cellpadding="0" cellspacing="0">
                            <tr>
                                <td width="80"  nowrap class="table_search_head">상호/이름</td>
                                <td nowrap class="table_search_body" colspan="4">
                                    <input type="text" name="cnee_co_nm" value='<bean:write name="blVO" property="cnee_co_nm"/>'   dataformat="excepthan" style="ime-mode:disabled;width:220" class="search_form" maxlength="35">
                                </td>
                            </tr>
                            <tr>
                                <td width="67"  nowrap class="table_search_head">국가코드</td>
                                <td width="50" nowrap class="table_search_body">
                                    <input type="text" name="cnee_cnt_cd" value='<bean:write name="blVO" property="cnee_cnt_cd"/>' dataformat="excepthan" style="ime-mode:disabled;width:40" class="search_form"  maxlength="2">
                                </td>
                                <td width="25px"></td>          
                                <td width="67" nowrap class="table_search_head">우편번호</td>
                                <td nowrap class="table_search_body">
                                    <input type="text" name="cnee_zip_cd" value='<bean:write name="blVO" property="cnee_zip_cd"/>' dataformat="excepthan" style="ime-mode:disabled;width:73" class="search_form" maxlength="9">
                                </td>
                            </tr>
                            <tr>
                                <td width="80"  nowrap class="table_search_head"><bean:message key="State_Province"/></td>
                                <td nowrap class="table_search_body" colspan="4">
                                	<input type="text" name="cnee_ste" value='<bean:write name="blVO" property="cnee_ste"/>'       dataformat="excepthan" style="ime-mode:disabled;width:220" class="search_form"  maxlength="9">
                                </td>
                            </tr>
                            <tr>
                                <td width="80"  nowrap class="table_search_head"><bean:message key="Place"/></td>
                                <td nowrap class="table_search_body" colspan="4">
                                    <input type="text" name="cnee_plc"    value='<bean:write name="blVO" property="cnee_plc"/>'    dataformat="excepthan" style="ime-mode:disabled;width:220" class="search_form" maxlength="17">
                                </td>
                            </tr>
                            <tr>
                                <td width="80"  nowrap class="table_search_head"><bean:message key="Street"/></td>
                                <td nowrap class="table_search_body" colspan="4">
                                    <input type="text" name="cnee_st"      value='<bean:write name="blVO" property="cnee_st"/>'    dataformat="excepthan" style="ime-mode:disabled;width:220" class="search_form" maxlength="35">
                                </td>
                            </tr>
                            <tr>
                                <td width="67"  nowrap class="table_search_head">연락구분</td>
                                <td width="50" nowrap class="table_search_body">
                                    <html:select name="blVO" property="cnee_cmmc_tp">
                                        <html:options collection="cdList" property="code" labelProperty="code_label"/>
                                    </html:select>
                                </td>
                                <td width="25px"></td>          
                                <td width="67" nowrap class="table_search_head"><bean:message key="Contact_Point"/></td>
                                <td nowrap class="table_search_body">
                                    <input type="text" name="cnee_phn_no" value='<bean:write name="blVO" property="cnee_phn_no"/>' dataformat="excepthan" style="ime-mode:disabled;width:110" class="search_form" maxlength="25">
                                </td>
                            </tr>
                        </table>
                     </td>
                  </tr>
                </table>
            </td>
        </tr>
    </table>
    <!-- 소타이틀, 대버튼 -->
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
		<tr>
			<td height="10px"></td>
		</tr>
        <tr>
            <td align="right">
                <table border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="6"></td>
                        <td style="cursor:hand" onclick="doWork('ADD')">
                            <table id="btnAdd" height="21" border="0" cellpadding="0" cellspacing="0" >
                                <tr>
                                    <td width="11"><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif" width="11" height="21"></td>
                                    <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Save"/></td>
                                    <td width="8"><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif" width="8" height="21"></td>
                                </tr>
                            </table>
                        </td>
                        <td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="6"></td>
                        <td style="cursor:hand" onclick="window.close();">
                            <table height="21" border="0" cellpadding="0" cellspacing="0" >
                                <tr>
                                    <td width="11"><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif" width="11" height="21"></td>
                                    <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Close"/></td>
                                    <td width="8"><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif" width="8" height="21"></td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    <!-- 소타이틀, 대버튼 -->
</form>
<logic:notEmpty name="mapVO" property="isSaved"><!--저장시 BL목록 재조회-->
	<script>
		opener.doWork('SEARCHLIST02');
		this.focus();
	</script>
</logic:notEmpty>
</body>
</html>


