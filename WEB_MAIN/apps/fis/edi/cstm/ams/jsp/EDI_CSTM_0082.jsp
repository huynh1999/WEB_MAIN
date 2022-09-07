<%--
=========================================================
*@FileName   : EDI_CSTM_0082.jsp
*@FileTitle  : 해운 수출 AMS BL추가정보 입력
*@Description: 해운 수출 AMS BL추가정보 입력
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

    <bean:define id="cdList"  name="mapVO" property="cmmcCd"/>

    <link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css">
    <title><bean:message key="system.title"/></title>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript" src="<%=CLT_PATH%>/apps/fis/edi/cstm/ams/script/EDI_CSTM_0082.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/EDI_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
<style> body { border-top-width: 6px!important; } </style>
</head>
<body class="td" onload="javascript:loadPage();doWork('SEARCHLIST');">
<div id="WORKING_IMG" style="position:absolute;margin-top:100;left:180px;background-color:#666666;width:357;height:130;display:none;" valign="middle" align="center">
    <iframe src='<%=CLT_PATH%>/js/common/wait.html' scrolling='no' frameborder='0' style='margin-top:0px;width:360px; height:135px; border:none;display:block'></iframe>
</div>
<form name="frm1" method="POST" action="./EDI_CSTM_0082.clt">
    <!--Command를 담는 공통 -->
    <input type="hidden" name="f_cmd">
    <input type="hidden" name="f_edi_cre_seq"   value='<bean:write name="mapVO" property="edi_cre_seq"/>'>
    <input type="hidden" name="f_edi_msg_seq"   value='<bean:write name="mapVO" property="edi_msg_seq"/>'>
    <input type="hidden" name="f_bl_seq"        value='<bean:write name="mapVO" property="f_bl_seq"/>'>
	<input type="hidden" name="f_cntr_list_seq" value=''>
		
		
    <!-- 타이틀, 네비게이션 -->
    <table width="430" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td class="bigtitle"><bean:message key="House_BL_Input"/></td>
            <td align="right" nowrap class="navi"></td>
        </tr>
    </table>
    <!-- 소타이틀, 대버튼 -->
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
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

    <!-- 타이틀, 네비게이션 -->
    <table width="100%" border="0" cellpadding="0" cellspacing="0">
		<tr><td height="3"></td></tr>
		<tr>
			<td align="left" class="table_search_bg"><!-- 간격 -->
				<table width="100%" border="0" cellspacing="0" cellpadding="0">
					<tr>
						<td width="60" nowrap class="table_search_head"><bean:message key="HBL"/></td>
						<td nowrap  align="left">
							<input type="text" name="f_hawb" value='<bean:write name="blVO" property="bl_no"/>' class="search_form-disable" style="width:120px;" readonly>
						</td>
					</tr>
				</table>
			</td>
		</tr>
		<tr><td height="6"></td></tr>
    </table>
    <!-- 소타이틀, 대버튼 -->
	<table width="100%" border="0" cellspacing="0" cellpadding="0">
		<tr>
			<td height="22" align="left" background="<%=CLT_PATH%>/web/img/main/tab_table_top.gif">
				<table height="22" border="0" cellpadding="0" cellspacing="0">
					<tr>
						<td class="tab_head2" id=Tab01><span style="cursor:hand;" onClick="javascript:goTabSelect('01');"><bean:message key="General_Information"/></span></td>
						<td width="1"></td>
						<td class="tab_head_non2" id=Tab02><span style="cursor:hand;" onClick="javascript:goTabSelect('02');"><bean:message key="Contact_Point"/></span></td>
                        <td width="1"></td>
                        <td class="tab_head_non2" id=Tab03><span style="cursor:hand;" onClick="javascript:goTabSelect('03');"><bean:message key="Container"/></span></td>
					</tr>
				</table>
			</td>
		</tr>
		<tr>
			<td align="center" valign="top" background="<%=CLT_PATH%>/web/img/main/tab_table_bg-500.gif">
				<div id="tabLayer" style="display:inline">
					<table width="500px" border="0" cellpadding="0" cellspacing="0">
						<tr><td colspan="2" height="5px"></td></tr>
						<tr>
							<td width="10px">&nbsp;</td>
							<td align="center" valign="top">
								<table width="100%" border="0" cellspacing="0" cellpadding="0">
								  <tr>
									<td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
								  </tr>
								  <tr>
									<td nowrap class="sub_title" width="120"><img src="<%=CLT_PATH%>/web/img/main/sub_title_arrow.gif" width="7" height="7" hspace="1"><bean:message key="General_Information"/></td>
									<td class="sub_title2"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
								  </tr>
								</table>
								<table width="100%" border="0" cellspacing="0" cellpadding="0">
								  <tr><td height="5px"></td></tr>
								  <tr>
									<td align="left" valign="top">
										<table border="0" cellpadding="0" cellspacing="0">
											<tr>
												<td width="80"  nowrap class="table_search_head"><bean:message key="SNP_Code"/></td>
												<td width="80" nowrap class="table_search_body">
													<input type="text" name="snp_cd" value='<bean:write name="blVO" property="snp_cd"/>' dataformat="excepthan" style="ime-mode:disabled;width:50" class="search_form" maxlength="4">
												</td>
												<td width="25px"></td>          
												<td width="80" nowrap class="table_search_head">파트너코드</td>
												<td nowrap class="table_search_body">
													<input type="text" name="prnr_cd" value='<bean:write name="blVO" property="prnr_cd"/>' dataformat="excepthan" style="ime-mode:disabled;width:50" class="search_form" maxlength="4">
												</td>
											</tr>
											<tr><td colspan="5" height="10px"></td></tr>
											<tr>
												<td nowrap class="table_search_head">미주기항전<br>&nbsp;&nbsp;&nbsp;&nbsp;최종항 코드</td>
												<td nowrap class="table_search_body">
													<input type="text" name="lst_pol_ams_cd" value='<bean:write name="blVO" property="lst_pol_ams_cd"/>' dataformat="excepthan" style="ime-mode:disabled;width:60" class="search_form" maxlength="5">
												</td>
												<td></td>          
												<td nowrap class="table_search_head">최종<br>&nbsp;&nbsp;&nbsp;&nbsp;목적지 코드</td>
												<td nowrap class="table_search_body">
													<input type="text" name="dest_cd" value='<bean:write name="blVO" property="dest_cd"/>' dataformat="excepthan" style="ime-mode:disabled;width:60" class="search_form" maxlength="5">
												</td>
											</tr>
										<!--
                                            <tr><td colspan="5" height="10px"></td></tr>
											<tr>
												<td nowrap class="table_search_head"><bean:message key="IT_Type"/></td>
												<td nowrap class="table_search_body">
													<html:select name="blVO" property="it_tp_cd">
														<option value=""></option>
														<html:options collection="cdList" property="code" labelProperty="code_label"/>
													</html:select>
												</td>
												<td></td>          
												<td nowrap class="table_search_head">IT No.</td>
												<td nowrap class="table_search_body">
													<input type="text" name="it_no" value='<bean:write name="blVO" property="it_no"/>' dataformat="excepthan" style="ime-mode:disabled;width:50" class="search_form" maxlength="11">
												</td>
											</tr>
										-->
                                            <tr><td colspan="5" height="10px"></td></tr>
											<tr>
												<td nowrap class="table_search_head"><bean:message key="HUB"/><br>&nbsp;&nbsp;&nbsp;&nbsp;Location 코드</td>
												<td nowrap class="table_search_body">
													<input type="text" name="hub_loc_cd" value='<bean:write name="blVO" property="hub_loc_cd"/>' dataformat="excepthan" style="ime-mode:disabled;width:60" class="search_form" maxlength="5">
												</td>
												<td></td>          
												<td nowrap class="table_search_head">미국내<br>&nbsp;&nbsp;&nbsp;&nbsp;최종항 코드</td>
												<td nowrap class="table_search_body">
													<input type="text" name="lst_usa_Port_cd" value='<bean:write name="blVO" property="lst_usa_Port_cd"/>' dataformat="excepthan" style="ime-mode:disabled;width:60;" class="search_form" maxlength="5">
												</td>
											</tr>
                                            <tr><td colspan="5" height="10px"></td></tr>
											<tr>
												<td nowrap class="table_search_head">최종<br>&nbsp;&nbsp;&nbsp;&nbsp;화물수취항</td>
												<td nowrap class="table_search_body" colspan="4">
													<input type="text" name="por_full_nm" value='<bean:write name="blVO" property="por_full_nm"/>' dataformat="excepthan" style="ime-mode:disabled;width:200" class="search_form" maxlength="30">
												</td>
											</tr>
										</table>
									 </td>
								  </tr>
								</table>
							</td>
						</tr>
					</table>
				</div>
				<div id="tabLayer" style="display:none">
					<!-- 송하인 정보 -->
                    <table width="500px" border="0" cellpadding="0" cellspacing="0">
                        <tr><td colspan="2" height="5px"></td></tr>
                        <tr>
                            <td width="10px">&nbsp;</td>
							<td align="left" valign="top">
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
												<td width="80"  nowrap class="table_search_head">주소</td>
												<td nowrap class="table_search_body" colspan="4">
													<input type="text" name="shp_plc" value='<bean:write name="blVO" property="shp_plc"/>'       dataformat="excepthan" style="ime-mode:disabled;width:220" class="search_form" maxlength="105">
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
												<td width="80"  nowrap class="table_search_head">주소</td>
												<td nowrap class="table_search_body" colspan="4">
													<input type="text" name="cnee_plc"    value='<bean:write name="blVO" property="cnee_plc"/>'    dataformat="excepthan" style="ime-mode:disabled;width:220" class="search_form" maxlength="105">
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
								  <tr>
									<td nowrap class="sub_title" width="120"><img src="<%=CLT_PATH%>/web/img/main/sub_title_arrow.gif" width="7" height="7" hspace="1"><bean:message key="Notice_Information"/></td>
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
													<input type="text" name="noti_co_nm" value='<bean:write name="blVO" property="noti_co_nm"/>'   dataformat="excepthan" style="ime-mode:disabled;width:220" class="search_form" maxlength="35">
												</td>
											</tr>
											<tr>
												<td width="80"  nowrap class="table_search_head">주소</td>
												<td nowrap class="table_search_body" colspan="4">
													<input type="text" name="noti_plc"    value='<bean:write name="blVO" property="noti_plc"/>'    dataformat="excepthan" style="ime-mode:disabled;width:220" class="search_form" maxlength="105">
												</td>
											</tr>
										</table>
									 </td>
								  </tr>
								</table>
							</td>
						</tr>
					</table>
				</div>
                <div id="tabLayer" style="display:none">
                    <!-- Container -->
                    <table width="500px" border="0" cellpadding="0" cellspacing="0">
                        <tr><td colspan="2" height="5px"></td></tr>
                        <tr>
                            <td width="10px">&nbsp;</td>
                            <td align="left" valign="top">
                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                  <tr>
                                    <td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                                  </tr>
                                  <tr>
                                    <td nowrap class="sub_title" width="120"><img src="<%=CLT_PATH%>/web/img/main/sub_title_arrow.gif" width="7" height="7" hspace="1"><bean:message key="Container"/></td>
                                    <td class="sub_title2"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                                  </tr>
                                </table>
                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
									<tr>
										<td height="10" width="180px"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
										<td align="right">
											<table border="0" cellspacing="0" cellpadding="0">
												<tr>
													<td align="right" style="cursor:hand">
														<table border="0" cellpadding="0" cellspacing="0">
															<tr>
																<td><img src="<%=CLT_PATH%>/web/img/main/tab_bt_left.gif"></td>
																<td background="<%=CLT_PATH%>/web/img/main/tab_bt_bg.gif" class="tab_bt_name_01" onClick="javascript:doWork('ROWADD');"><bean:message key="Add"/></td>
																<td><img src="<%=CLT_PATH%>/web/img/main/tab_bt_right.gif"></td>
															</tr>
														</table>
													</td>
												</tr>
											</table>
										</td>
									</tr>
                                    <tr>
										<td width="180px">
											 <table border="0" width="100%" id="mainTable">
                                                <tr>
                                                    <td>
                                                        <script language="javascript">comSheetObject('sheet1');</script>
                                                    </td>
                                                </tr>
                                            </table>
										</td>
                                        <td>
											<table border="0" width="100%" id="mainTable">
												<tr>
													<td>
														<script language="javascript">comSheetObject('sheet2');</script>
													</td>
												</tr>
											</table>
										</td>
                                    </tr>
                                    <tr>
                                        <td height="10" colspan="2"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                                    </tr>
                                  </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </div>
			</td>
		</tr>
		<tr>
			<td colspan="2" height="1" background="<%=CLT_PATH%>/web/img/main/tab_table_bottomg.gif"></td>
		</tr>
	</table>
</form>
<logic:notEmpty name="mapVO" property="isSaved"><!--저장시 BL목록 재조회-->
	<script>
		opener.doWork('SEARCHLIST02');
	</script>
</logic:notEmpty>
</body>
</html>


