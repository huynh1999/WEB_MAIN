<%--
=========================================================
*@FileName   : ACC_INV_0021.jsp
*@FileTitle  : Invoice Pop
*@Description: Invoice Pop
*@author     : Kang,Jung-Gu - Cyberlogitec
*@version    : 1.0 - 03/09/2009
*@since      : 03/09/2009

*@Change history:
=========================================================
--%>

<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<title>Invoice Balance Detail Clearing</title>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/ACC_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="./apps/fis/acc/inv/invoice/script/ACC_INV_0021.js?ver=<%=CLT_JS_VER%>"></script>
	
	<base target="_self"/>
	
</head>

<bean:define id="objVO"  name="EventResponse" property="objVal"/>
<body class="td" onload="javascript:loadPage();">
	
	<form name="form" method="POST" action="./">
	<!-- Command를 담는 공통 -->
	<input type="hidden" name="f_cmd"/> 
	
	<input type="hidden" name="s_inv_seq" value='<bean:write name="objVO" property="inv_seq"/>'/>
	<input type="hidden" name="s_inv_no" value='<bean:write name="objVO" property="inv_no"/>'/>
	<input type="hidden" name="i_sell_buy_tp_cd" value='<bean:write name="objVO" property="sell_buy_tp_cd"/>'/>
	<input type="hidden" name="i_frt_ask_clss_cd" value='<bean:write name="objVO" property="frt_ask_clss_cd"/>'/>
	<input type="hidden" name="i_inv_sts_cd" value='<bean:write name="objVO" property="inv_sts_cd"/>'/>
	
    <table width="750" border="0" cellpadding="0" cellspacing="0">
		<tr>
			<td align="left">
				<table width="100%" border="0" cellpadding="0" cellspacing="0">
<!-------------------- title begin -------------------->
					<tr>
						<td width="100%" class="bigtitle"><bean:message key="Invoice_Balance_Detail_Clearing"/></td>
					</tr>
<!-------------------- title end -------------------->
					<!--space -->
			        <tr>
			            <td height="4"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
			        </tr>
			    </table>
			</td>
		</tr>
	</table>
    <table width="750" border="0" cellpadding="0" cellspacing="0">
        <tr>
            <td align="left" class="table_search_bg">
                <!-- 간격 -->
                <table width="750" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
                    </tr>
                </table>
                <table width="750" border="0" cellpadding="0" cellspacing="0">
                    <tr>
						<td>
							<table width="750" border="0" cellpadding="0" cellspacing="0">
								<tr>
									<td width="90%">
										<table width="100%" border="0" cellpadding="0" cellspacing="0">
											<tr>
												<td class="sub_title" width="140"><img src="<%=CLT_PATH%>/web/img/main/sub_title_arrow.gif" width="7" height="7" hspace="3"/><bean:message key="Invoice_Seq_Data"/></td>
												<td class="sub_title2"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
											</tr>
			                            </table>
									</td>
									<td height="10" align="right">
										<table border="0" cellspacing="0" cellpadding="0">
											<tr>
												<td style="cursor:hand" onClick="window.close()">
													<table height="21" border="0" cellpadding="0" cellspacing="0" >
														<tr>
															<td width="11"><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif" width="11" height="21"/></td>
															<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Close"/></td>
															<td width="8"><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif" width="8" height="21"/></td>
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
<!-------------------- button end -------------------->
					<tr>
						<td>
							<table width="100%" border="0" cellspacing="0" cellpadding="0">
						        <tr>
						            <td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
						        </tr>
						    </table>
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
			                    <tr>
			                        <td height="2"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
			                    </tr>
			                </table> 
                            <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                	<td width="150" class="table_search_head"><bean:message key="Customer"/> </td>
                                    <td><input type="text" name="i_trdp_nm" maxlength="50" class="search_form-disable" style="width:150;" value='<bean:write name="objVO" property="trdp_nm"/>' /></td>
                                	<td width="150" class="table_search_head"><bean:message key="Sell_Buy"/></td>
                                    <td><input type="text" name="i_sell_buy_tp_nm" class="search_form-disable" style="width:150;" value='<bean:write name="objVO" property="sell_buy_tp_nm"/>' /></td>
								</tr>
							</table> 
							<table width="100%" border="0" cellspacing="0" cellpadding="0">
			                    <tr>
			                        <td height="2"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
			                    </tr>
			                </table>
							<table width="100%" border="0" cellpadding="0" cellspacing="0"> 
                                <tr>
                                	<td width="150" class="table_search_head"><bean:message key="Invoice_Kind"/></td>
                                    <td><input type="text" name="i_frt_ask_clss_nm" class="search_form-disable" style="width:150;" value='<bean:write name="objVO" property="frt_ask_clss_nm"/>' /></td>
                                    <td width="150" class="table_search_head"><bean:message key="Status"/> </td>
                                    <td><input type="text" name="i_inv_sts_nm" class="search_form-disable" style="width:150;" value='<bean:write name="objVO" property="inv_sts_nm"/>' /></td>   
                                </tr>
                            </table> 
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
			                    <tr>
			                        <td height="2"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
			                    </tr>
			                </table> 
                            <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                	<td width="150" class="table_search_head"><bean:message key="Invoice_Amount"/></td>
                                    <td><input type="text" name="i_perf_ttl_amt" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;width:150px;text-align:right" value='<bean:write name="objVO" property="perf_ttl_amt"/>' /></td>
                                    <td width="150" class="table_search_head"><bean:message key="Performance_Amount"/></td>
                                    <td><input type="text" name="i_locl_ttl_amt" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;width:150px;text-align:right" value='<bean:write name="objVO" property="locl_ttl_amt"/>' /></td>
                            	</tr>
                            	<tr>
                                	<td width="150" class="table_search_head"><bean:message key="Invoice_Total_Amount"/></td>
                                    <td><input type="text" name="i_inv_ttl_amt" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;width:150px;text-align:right" value='<bean:write name="objVO" property="inv_ttl_amt"/>' /></td>
                                    <td width="150" class="table_search_head"><bean:message key="Currency"/> </td>
                                    <td><input type="text" name="i_currency" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;width:40px;" value='<bean:write name="objVO" property="inv_aply_curr_cd"/>' /></td> 
                                </tr>
                            </table> 
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
			                    <tr>
			                        <td height="2"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
			                    </tr>
			                </table>
                            <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                	<td width="150" class="table_search_head"><bean:message key="Office"/></td>
                                    <td><input type="text" name="i_ofc_eng_nm" class="search_form-disable" style="width:150;" value='<bean:write name="objVO" property="ofc_eng_nm"/>' /></td>
                                    <td width="150" class="table_search_head"><bean:message key="Creation_By"/> </td>
                                    <td><input type="text" name="i_eng_usr_nm" class="search_form-disable" style="width:150;" value='<bean:write name="objVO" property="eng_usr_nm"/>' /></td>
                             	</tr>
                            </table> 
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
			                    <tr>
			                        <td height="2"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
			                    </tr>
			                </table>
                            <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td width="150" class="table_search_head"><bean:message key="Settlement_Start"/></td>
                                    <td><input type="text" name="i_stl_fm_dt" class="search_form-disable" style="width:150;" value='<bean:write name="objVO" property="stl_fm_dt"/>' /></td>
                                    <td width="150" class="table_search_head"><bean:message key="Settlement_End"/></td>
                                    <td><input type="text" name="i_stl_to_dt" class="search_form-disable" style="width:150;" value='<bean:write name="objVO" property="stl_to_dt"/>' /></td>
                                </tr>
                          	</table>  
						</td>
					</tr>
<!-------------------- middle begin -------------------->
					<tr>
			            <td height="15"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
			        </tr>
					<tr>
						<td>
							<table width="100%" border="0" cellpadding="0" cellspacing="0">
								<tr>
									<td width="80%">
										<table width="100%" border="0" cellpadding="0" cellspacing="0">
											<tr>
												<td class="sub_title" width="140"><img src="<%=CLT_PATH%>/web/img/main/sub_title_arrow.gif" width="7" height="7" hspace="3"/><bean:message key="Invoice_No_List"/></td>
												<td class="sub_title2"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
											</tr>
			                            </table>
									</td>
									<td height="10" align="right">
										<table border="0" cellspacing="0" cellpadding="0">
											<tr>
												<td style="cursor:hand" onClick="doWork('ADD')">
													<table id="btnAdd" height="21" border="0" cellpadding="0" cellspacing="0" >
														<tr>
															<td width="11"><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif" width="11" height="21"/></td>
															<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Save"/></td>
															<td width="8"><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif" width="8" height="21"/></td>
														</tr>
													</table>
												</td>
												<td width="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
												<td style="cursor:hand" onClick="doWork('ROWADD')">
													<table height="21" border="0" cellpadding="0" cellspacing="0" >
														<tr>
															<td width="11"><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif" width="11" height="21"/></td>
															<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="New"/></td>
															<td width="8"><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif" width="8" height="21"/></td>
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
<!-------------------- middle end -------------------->
					<tr>
						<td>
							<table width="100%" border="0" cellspacing="0" cellpadding="0">
						        <tr>
						            <td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
						        </tr>
						    </table>
							<table border="0" width="100%" id="mainTable">								
								<tr>
									<td colspan = "2">
								     	<script language="javascript">comSheetObject('sheet1');</script>
								     </td>
								</tr>
							</table>
						</td>
					</tr>
				</table>
				 <!-- 간격 -->
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
                    </tr>
                </table>
			</td>
		</tr>
	</table>
</form>
</body>
</html>