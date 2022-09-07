<%--
=========================================================
*@FileName   : SEI_FRT_0020.jsp
*@FileTitle  : House B/L Freight
*@Description: 해운수입 MBL Freight
*@author     : Kang,Jung-Gu
*@version    : 1.0 - 02/02/2009
*@since      : 02/02/2009

*@Change history:
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ page import="java.util.HashMap"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
    <logic:notEmpty name="EventResponse">
        <bean:define id="blInfo" name="EventResponse" property="objVal"/>
    </logic:notEmpty>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css">
	<title><bean:message key="system.title"/></title>
    
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/COM_FRT_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/see/frt/freight/script/FRT_CMM_UTIL.js?ver=<%=CLT_JS_VER%>"></script>
    <%-- <script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SEA_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script> --%>
    <script language="javascript" src="<%=CLT_PATH%>/apps/fis/sei/frt/freight/script/SEI_FRT_0020.js?ver=<%=CLT_JS_VER%>"></script>
	<script>
		var STATUSCD1 = '';
		var STATUSCD2 = '';
		
		var UNITCD1 = '';
		var UNITCD2 = '';
		<% String ofc_curr = ""; 
		   String stdCurr  = "";
		   String trf_cur_cd = "";
		   String to_rt_ut = "";
		%>
		
		<% boolean isBegin = false; 
		   boolean isWritabl = false;
		%>
	
			<bean:define id="rtnMap" name="EventResponse" property="mapVal"/>
			<logic:equal name="rtnMap" property="cmd_right" value="E">
				<% isWritabl = true;%>
			</logic:equal>
		
			<!--Role 코드조회-->
			<logic:notEmpty name="rtnMap" property="UNITCD">
					<bean:define id="unitList" name="rtnMap" property="UNITCD"/>
					<logic:iterate id="codeVO" name="unitList">
						<% if(isBegin){ %>
							UNITCD1+= '|';
							UNITCD2+= '|';
						<% }else{
							  isBegin = true;
						   } %>
						UNITCD1+= '<bean:write name="codeVO" property="cd_nm"/>';
						UNITCD2+= '<bean:write name="codeVO" property="cd_val"/>';
					</logic:iterate>
			</logic:notEmpty>
	
			<!-- Currency 조회 -->
			<logic:notEmpty name="rtnMap" property="OfcCurrency">
				<bean:define id="curMap" name="rtnMap" property="OfcCurrency"/>
				<%  HashMap tmpMap = (HashMap)curMap;
					ofc_curr     = (String)tmpMap.get("ofccurr_cd");
					trf_cur_cd = (String)tmpMap.get("trf_cur_cd");
					to_rt_ut    = (String)tmpMap.get("to_rt_ut");
				%>
			</logic:notEmpty>
			var obdtCur = '<%=to_rt_ut%>';
	
		
			<!-- Default Performance Currency -->
			<logic:notEmpty name="rtnMap" property="STDCURR">
				<bean:define id="stdPerfCurr" name="rtnMap" property="STDCURR"/>
				<% stdCurr = (String)stdPerfCurr; %>
			</logic:notEmpty>
			var dfPerfCurr = '<%=stdCurr%>';
	</script>
</head>
<body class="td" onLoad="loadPage();doWork('SEARCHLIST01');">
<form name="frm1" method="POST" action="./SEE_FRT_0020.clt">
	<input type="hidden" name="f_cmd"         value="">
	<input type="hidden" name="f_CurPage"     value="">
    <input type="hidden" name="intg_bl_seq"  value="<bean:write name="blInfo" property="intg_bl_seq"/>">
	<input type="hidden" name="curRow2"       value="">
    <input type="hidden" name="curRow5"       value="">
	<input type="hidden" name="f_CurTab"      value="01">
	<input type="hidden" name="ofc_curr"      value="<%=ofc_curr%>">
    <input type="hidden" name="trf_cur_cd"    value="<%=trf_cur_cd%>">
	<input type="hidden" name="xcrtDt"        value="<bean:write name="blInfo" property="eta_dt_tm"/>">
	
	<html:hidden name="rtnMap" property="f_ofc_cnt_cd"/>

    <!--Invoice추가-->    
    <input type="hidden" name="tax_bil_flg"  value="">  
    <input type="hidden" name="inv_dt"       value="">
    <input type="hidden" name="inv_due_dt"   value="">  
    <input type="hidden" name="inv_rmk"      value="">  
    <input type="hidden" name="buy_inv_no"   value="">  
			
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
                        <td onClick="doWork('SEARCHLIST')" style="cursor:hand">
                            <table height="21" border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
                                    <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Search"/></td>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
                                </tr>
                            </table>            
                        </td>
                <% if(isWritabl){ %>
                        <td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="6"></td>
                        <td id="btnSave" onClick="doWork('SAVE')" style="display:block;cursor:hand;">
                            <table height="21" border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
                                    <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Save"/></td>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
                                </tr>
                            </table>            
                        </td>
                <% } %>
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
	<table width="950" border="0" cellpadding="0" cellspacing="0">
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
                                    <td nowrap class="table_search_head"><bean:message key="MBL_No"/></td>
                                    <td nowrap class="table_search_body" width="140">
                                        <input type="text" name="f_master_bl_no"   maxlength="40" value="<bean:write name="rtnMap" property="f_master_bl_no"/>" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:115px;">
                                        <img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" onclick="doWork('MBL_POPLIST');" style="cursor:hand;" width="19" height="18" border="0" align="absmiddle">
                                    </td>
									<td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="10"></td>
                                    <td nowrap class="table_search_head"><bean:message key="HBL_No"/></td>
                                    <td nowrap class="table_search_body">
                                        <input type="text" name="f_house_bl_no" maxlength="40"  value='<bean:write name="rtnMap" property="f_house_bl_no"/>'  class="search_form"  dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:120px;">
                                        <img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" onclick="doWork('HBL_POPLIST');"  style="cursor:hand;" width="19" height="18" border="0" align="absmiddle">
                                    </td>
									<input type="hidden" name="f_bkg_no"         value="<bean:write name="blInfo" property="bkg_no"/>"  class="search_form" style="width:120px;">
								</tr>
							</table>
						</td>
					</tr>
				</table>
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
    <table width="950" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td height="4"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
        </tr>
    </table>
    <!--빈공간 -->
    <!-- 검색 결과 -->
    <table width="950" border="0" cellpadding="0" cellspacing="0">
        <tr>
            <td align="left" class="table_search_bg">
                <!-- 간격 -->
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                    </tr>
                </table>
                <table width="100%" border="0" cellpadding="0" cellspacing="0">
                    <tr>
                        <td nowrap class="sub_title" width="120"><img src="<%=CLT_PATH%>/web/img/main/sub_title_arrow.gif" width="7" height="7" hspace="1"><bean:message key="BL_Information"/></td>
                        <td class="sub_title2"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                    </tr>
                </table>
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                    </tr>
                </table>
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td width="770" valign="top">
                            <table width="770" border="0" cellspacing="1" cellpadding="0" class="table">
                                <tr>
                                    <td class="grid_head"><bean:message key="MBL_No"/></td>
                                    <td class="table_body_l" colspan="2">
                                        <bean:write name="blInfo" property="mbl_no"/>
                                        <input type="hidden" name="master_bl_no" maxlength="40" value="<bean:write name="blInfo" property="mbl_no"/>">
                                    </td>
                                    <td class="grid_head"><bean:message key="Liner_Bkg"/></td>
                                    <td class="table_body_l" colspan="3">
                                        <bean:write name="blInfo" property="lnr_bkg_no"/>
                                        <input type="hidden" name="lnr_bkg_no" maxlength="20" value="<bean:write name="blInfo" property="lnr_bkg_no"/>">
                                    </td>
                                    <td class="grid_head" colspan="2"><bean:message key="SR_No"/></td>
                                    <td class="table_body_l" colspan="2">
                                        <bean:write name="blInfo" property="sr_no"/>
                                        <input type="hidden" name="sr_no"     value="<bean:write name="blInfo" property="sr_no"/>">
                                    </td>
                                </tr>
                                <tr>
                                    <td class="grid_head" width="60px"><bean:message key="Shipper"/></td>
                                    <td class="table_body_c" width="45">
										<bean:write name="blInfo" property="shpr_trdp_cd"/>
										<input type="hidden" name="hid_shp_cd"     value="<bean:write name="blInfo" property="shpr_trdp_cd"/>">
                                        <input type="hidden" name="hid_shp_nm"     value="<bean:write name="blInfo" property="shpr_trdp_nm"/>">
									</td>
                                    <td class="table_body_l" width="100">
										<bean:write name="blInfo" property="shpr_trdp_nm"/>

									</td>
                                    <td class="grid_head" width="75px"><bean:message key="Cargo_Type"/></td>
                                    <td class="table_body_c" width="30">
										<bean:write name="blInfo" property="shp_mod_cd"/>
									</td>
                                    <td class="grid_head" width="60px"><bean:message key="POR"/></td>
                                    <td class="table_body_l" width="70">
										<bean:write name="blInfo" property="por_cd"/>
										<input type="hidden" name="f_por_cd" value="<bean:write name="blInfo" property="por_cd"/>">
									</td>
                                    <td class="grid_head" width="60px"><bean:message key="POL"/></td>
                                    <td class="table_body_l" width="70">
										<bean:write name="blInfo" property="pol_cd"/>
                                        <input type="hidden" name="f_pol_cd" value="<bean:write name="blInfo" property="pol_cd"/>">
									</td>
                                    <td class="grid_head" width="80px"><bean:message key="Package"/></td>
                                    <td class="table_body_l" width="90">
										<bean:write name="blInfo" property="pck_ut_cd"/>
									</td>
                                </tr>
                                <tr>
                                    <td class="grid_head"><bean:message key="Partner"/></td>
                                    <td class="table_body_c">
										<bean:write name="blInfo" property="prnr_trdp_cd"/>
									</td>
                                    <td class="table_body_l">
                                        <bean:write name="blInfo" property="prnr_trdp_nm"/>
									</td>
                                    <td class="grid_head"><bean:message key="Incoterms"/></td>
                                    <td class="table_body_c">
										<bean:write name="blInfo" property="inco_cd"/>
									</td>
                                    <td class="grid_head"><bean:message key="POD"/></td>
                                    <td class="table_body_l">
										<bean:write name="blInfo" property="pod_cd"/>
                                        <input type="hidden" name="f_pod_cd" value="<bean:write name="blInfo" property="pod_cd"/>">
									</td>
                                    <td class="grid_head"><bean:message key="DEL"/></td>
                                    <td class="table_body_l">
										<bean:write name="blInfo" property="del_cd"/>
                                        <input type="hidden" name="f_del_cd" value="<bean:write name="blInfo" property="del_cd"/>">
									</td>
                                    <td class="grid_head"><bean:message key="Weight"/></td>
                                    <td class="table_body_r">
										<bean:write name="blInfo" property="grs_wgt"/>&nbsp;<bean:write name="blInfo" property="grs_wgt_ut"/>
										<html:hidden name="blInfo" property="grs_wgt_ut"/>
									</td>
                                </tr>
                                <tr>
                                    <td class="grid_head"><bean:message key="Liner"/></td>
                                    <td class="table_body_c">
										<bean:write name="blInfo" property="lnr_trdp_cd"/>
										<input type="hidden" name="hid_lin_cd" value="<bean:write name="blInfo" property="lnr_trdp_cd"/>">
										<input type="hidden" name="hid_lin_nm" value="<bean:write name="blInfo" property="lnr_trdp_nm"/>">
									</td>
                                    <td class="table_body_l">
										<bean:write name="blInfo" property="lnr_trdp_nm"/>
									</td>
                                    <td class="grid_head"><bean:message key="FRT_Term"/></td>
                                    <td class="table_body_c">
										<bean:write name="blInfo" property="frt_term_cd"/>
									</td>
                                     <td class="grid_head"><bean:message key="ETA"/></td>
                                    <td class="table_body_l"><wrt:write name="blInfo" property="eta_dt_tm" formatType="DATE" fromFormat="yyyyMMdd" format="yyyy.MM.dd"/>
                                    </td>
                                    <td class="grid_head"><bean:message key="SVC_Term"/></td>
                                    <td class="table_body_l">
										<bean:write name="blInfo" property="svc_term_cd"/>
									</td>
                                    <td class="grid_head"><bean:message key="Measurement"/></td>
                                    <td class="table_body_r">
										<bean:write name="blInfo" property="meas"/>&nbsp;<bean:write name="blInfo" property="meas_ut"/>
										<html:hidden name="blInfo" property="meas_ut"/>
									</td>
                                </tr>
                            </table>
                        </td>
                        <td width="10"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                        <td valign="top">
                            <table border="0" width="100%">
								<tr>
									<td colspan="2">
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
                        </td>
                    </tr>
                </table>
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
	                    <td width="70" nowrap class="table_search_head"><bean:message key="KRW_USD"/></td>
	                    <td align="left" class="table_search_body" style="text-valing:middle">
	                        <input type="text" name="dispCur"    value='<%=to_rt_ut%>'  class="search_form"  style="text-align:right;width:90px;" readonly>
	                    </td>
	                    <td width="220">&nbsp;</td>
	                    <td width="70" nowrap class="table_search_head"><bean:message key="Buying_D"/>:</td>
	                    <td align="left" class="table_search_body" style="text-valing:middle">
	                        <input type="text" name="sb_usd"    value=''  class="search_form"  style="text-align:right;width:90px;" readonly>
	                    </td>
	                    <td width="10">&nbsp;</td>
	                    <td width="67" nowrap class="table_search_head"><bean:message key="Credit_D"/>:</td>
	                    <td align="left" class="table_search_body">
	                        <input type="text" name="dc_usd"    value=''  class="search_form"  style="text-align:right;width:90px;" readonly>
	                    </td>
	                    <td width="10">&nbsp;</td>
	                    <td width="65" nowrap class="table_search_head"><bean:message key="Profit"/>($):</td>
	                    <td align="left" class="table_search_body">
	                        <input type="text" name="profit"    value=''  class="search_form"  style="text-align:right;width:100px;" readonly>
	                    </td>
                    </tr>
                </table>
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                    </tr>
                </table>
                <table width="100%" border="0" cellpadding="0" cellspacing="0">
                    <tr>
                        <td nowrap class="sub_title" width="120"><img src="<%=CLT_PATH%>/web/img/main/sub_title_arrow.gif" width="7" height="7" hspace="1"><bean:message key="HBL"/></td>
                        <td class="sub_title2"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                    </tr>
                </table>
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                    </tr>
                </table>
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
					<tr>
						<td>
							<table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td colspan="2">
                                        <table border="0" width="100%" id="mainTable">
                                            <tr>
                                                <td>
                                                    <script language="javascript">comSheetObject('sheet2');</script>
                                                 </td>
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
                        <td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    <table width="950" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td height="10"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
        </tr>
    </table>
    <!--빈공간 -->
    <!-- 검색 -->
	<table width="950" border="0" cellpadding="0" cellspacing="0">
		<tr>
			<td align="left" class="table_search_bg"><!-- 간격 -->
				<table width="100%" border="0" cellspacing="5" cellpadding="0">
                    <tr>
                        <td valign="top" align="right">
                    <!--B/C Button Layer-->
                            <table id="sdBtns"  border="0" cellspacing="0" cellpadding="0" <% if(isWritabl){ %>style="display:block;"<% }else{ %>style="display:none;"<% } %>>
                                <tr>
                                    <td>
                                        <table onClick="doFrtWork('COMMAND04_M');" style="cursor:hand;margin-left:5px;" border="0" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td><img src="<%=CLT_PATH%>/web/img/main/tab_bt_left.gif"></td>
                                                <td background="<%=CLT_PATH%>/web/img/main/tab_bt_bg.gif" class="tab_bt_name_01"><bean:message key="Auto"/></td>
                                                <td><img src="<%=CLT_PATH%>/web/img/main/tab_bt_right.gif"></td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td>
                                        <table onClick="setDfltFrt('')"  style="cursor:hand;margin-left:5px;" border="0" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td><img src="<%=CLT_PATH%>/web/img/main/tab_bt_left.gif"></td>
                                                <td background="<%=CLT_PATH%>/web/img/main/tab_bt_bg.gif" class="tab_bt_name_01">Default Freight</td>
                                                <td><img src="<%=CLT_PATH%>/web/img/main/tab_bt_right.gif"></td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td>
                                        <table onClick="doWork('ROWADD')" style="cursor:hand;margin-left:5px;" border="0" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td><img src="<%=CLT_PATH%>/web/img/main/tab_bt_left.gif"></td>
                                                <td background="<%=CLT_PATH%>/web/img/main/tab_bt_bg.gif" class="tab_bt_name_01"><bean:message key="New"/></td>
                                                <td><img src="<%=CLT_PATH%>/web/img/main/tab_bt_right.gif"></td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td>
                                        <table onClick="doFrtWork('COMMAND06_M')" style="cursor:hand;margin-left:5px;" border="0" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td><img src="<%=CLT_PATH%>/web/img/main/tab_bt_left.gif"></td>
                                                <td background="<%=CLT_PATH%>/web/img/main/tab_bt_bg.gif" class="tab_bt_name_01"><bean:message key="Confirm"/></td>
                                                <td><img src="<%=CLT_PATH%>/web/img/main/tab_bt_right.gif"></td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td>
                                        <table onClick="doFrtWork('COMMAND07_M')" style="cursor:hand;margin-left:5px;" border="0" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td><img src="<%=CLT_PATH%>/web/img/main/tab_bt_left.gif"></td>
                                                <td background="<%=CLT_PATH%>/web/img/main/tab_bt_bg.gif" class="tab_bt_name_01"><bean:message key="Confirm_Cancel"/></td>
                                                <td><img src="<%=CLT_PATH%>/web/img/main/tab_bt_right.gif"></td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td>
                                        <table onClick="doFrtWork('COMMAND08_M')" style="cursor:hand;margin-left:5px;" border="0" cellpadding="0" cellspacing="0" >
                                            <tr>
                                                <td><img src="<%=CLT_PATH%>/web/img/main/tab_bt_left.gif"></td>
                                                <td background="<%=CLT_PATH%>/web/img/main/tab_bt_bg.gif" class="tab_bt_name_01"><bean:message key="Create"/> <bean:message key="Invoice"/></td>
                                                <td><img src="<%=CLT_PATH%>/web/img/main/tab_bt_right.gif"></td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                    <!--B/C Button Layer-->
                        </td>
                    </tr>
                    <tr>
                        <td align="left" valign="top">
                            <table border="0" width="100%" id="mainTable">
                                <tr>
                                    <td>
                                        <script language="javascript">comSheetObject('sheet3');</script>
                                     </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td align="right" valign="top">
                            
                            <!-- 검색창 -->
                            <table width="680" height="10" border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td width="130" nowrap class="table_search_head"><bean:message key="Invoice_Total"/>($) :</td>
                                    <td width="20"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                                    <td width="50" nowrap class="table_body_blue" align="right"><bean:message key="Buying"/></td>
                                    <td class="table_search_body">
                                        <input type="text" name="inv_sell"    value=''  class="search_form"  style="text-align:right;width:115px;" readonly>
                                    </td>
                                    <td width="20"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                                    <td width="50" nowrap class="table_body_blue" align="right"><bean:message key="Credit"/></td>
                                    <td class="table_search_body">
                                        <input type="text" name="inv_debit"    value=''  class="search_form"  style="text-align:right;width:115px;" readonly>
                                    </td>
                                    <td width="20"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                                    <td width="50" nowrap class="table_body_blue" align="right"><bean:message key="Total"/></td>
                                    <td class="table_search_body">
                                        <input type="text" name="inv_total"    value=''  class="search_form"  style="text-align:right;width:115px;" readonly>
                                    </td>
                                </tr>
                            <!--
                                <tr>
                                    <td nowrap class="table_search_head"><bean:message key="Performance_Total"/> :</td>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                                    <td nowrap class="table_body_blue" align="right"><bean:message key="Buying"/></td>
                                    <td class="table_search_body">
                                        <input type="text" name="pef_sell"    value=''  class="search_form"  style="text-align:right;width:115px;" readonly>
                                    </td>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                                    <td nowrap class="table_body_blue" align="right"><bean:message key="Credit"/></td>
                                    <td class="table_search_body">
                                        <input type="text" name="pef_debit"    value=''  class="search_form"  style="text-align:right;width:115px;" readonly>
                                    </td>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                                    <td nowrap class="table_body_blue" align="right"><bean:message key="Total"/></td>
                                    <td class="table_search_body">
                                        <input type="text" name="pef_total"    value=''  class="search_form"  style="text-align:right;width:115px;" readonly>
                                    </td>
                                </tr>
                                -->
                                <input type="hidden" name="pef_sell"    value=''  class="search_form"  style="text-align:right;width:115px;" readonly>
                                <input type="hidden" name="pef_debit"   value=''  class="search_form"  style="text-align:right;width:115px;" readonly>
                                <input type="hidden" name="pef_total"   value=''  class="search_form"  style="text-align:right;width:115px;" readonly>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>

    </table>
</body>
</html>
<script language="javascript">
	doHideProcess();
</script>