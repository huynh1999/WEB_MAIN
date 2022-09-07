<%--
=========================================================
*@FileName   : ACC_INV_0020.jsp
*@FileTitle  : Invoice List
*@Description: Invoice List
*@author     : Kang,Jung-Gu - Cyberlogitec
*@version    : 1.0 - 03/05/2009
*@since      : 03/05/2009

*@Change history:
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
    <title><bean:message key="system.title"/></title>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/ACC_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="./apps/fis/acc/inv/invoice/script/ACC_INV_0090.js?ver=<%=CLT_JS_VER%>"></script>
		
	<bean:define id="rtnMap"  name="EventResponse" property="mapVal"/>
</head>
<body class="td" onload="javascript:loadPage();initFinish();">
	<form name="frm1" method="POST" action="./">
	<!-- Command를 담는 공통 -->
	<input type="hidden" name="f_cmd"/>
	<input type="hidden" name="open_type"/>
	<input type="hidden" name="cmb_inv_seq"/>  
	<input type="hidden" name="sell_buy_tp_cd"/>
	<input type="hidden" name="date_cd"/>
	
	<!-- GridSetting Value -->
	<input type="hidden" name="user_id"  value="<%=userInfo.getUsrid()%>" />
	<input type="hidden" name="pageurl" id="pageurl" value="ACC_INV_0090.clt"/>
	
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
            <td height="4"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
        </tr>
    </table>
    <!--빈공간 -->
    <!-- 소타이틀, 대버튼 -->
    <table width="1200" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td align="right">
                <table border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="4"/></td>
                        <td style="cursor:hand" onClick="doWork('SEARCHLIST')">
                            <table height="21" border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"/></td>
                                    <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Search"/></td>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"/></td>
                                </tr>
                            </table>
						 </td>
						 <td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="4"/></td>
                         <td style="cursor:hand" onClick="doWork('NEW')">
                            <table height="21" border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"/></td>
                                    <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="New"/></td>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"/></td>
                                </tr>
                            </table>
						</td>
						<td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="4"/></td>
						<td style="cursor:hand" onclick="doWork('PRINT')">
							<div id="mainPrt" style="display:none">
							<table id="btnPrint" height="21" border="0" cellpadding="0" cellspacing="0">
								<tr>
									<td width="11"><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif" width="11" height="21"/></td>
									<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Print"/></td>
									<td width="8"><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif" width="8" height="21"/></td>
								</tr>
							</table>
							</div>
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
            <td height="4"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td> 
        </tr>
    </table>
    <table width="1200" border="0" cellpadding="0" cellspacing="0">
      <tr>
        <td align="left" class="table_search_bg"><!-- 간격 -->
            <table width="100%" border="0" cellspacing="0" cellpadding="0">
              	<tr>
                	<td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
              	</tr>
            </table>
            <!-- 간격 -->
            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                    <td align="left" valign="top">
                        <table border="0" cellpadding="0" cellspacing="0">
                            <tr>
								<td width="80" class="table_search_head_r"><bean:message key="Sea_Air"/></td>
                                <td class="table_search_body">
                                	<select name="f_air_sea_clss_cd" class="search_form">
                                		<option value="">ALL</option>
                                		<option value="S">Sea</option>
                                		<option value="A">Air</option>
                                	</select>
								</td>
								<td width="10"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
                                <td width="60" nowrap="nowrap" class="table_search_head_r"><bean:message key="Sell_Buy"/></td>
                                <td class="table_search_body">
                                	<select name="f_sell_buy_tp_cd" class="search_form">
                                		<option value="" >ALL</option>
                                		<option value="S">Selling</option>
                                		<option value="B">Buying</option>
                                		<option value="D">Debit</option>
                                		<option value="C"><bean:message key="Credit"/></option>
                                	</select>
								</td>
                                <td width="15"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
                                <td nowrap="nowrap" class="table_search_head"><span id="hdd" style="display:none">&nbsp;</span>
                                    <select name="f_date_cd">
                                        <option value="B"><bean:message key="Billing_Date"/></option>
                                        <option value="D"><bean:message key="Due_Date"/></option>
                                    </select>
                                </td>
                                <td class="table_search_body">
                                    <input type="text" name="f_sel_strdt" class="search_form" onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, false,1)" style="width:70;" maxlength="10" value=''/>
                                    ~
                                    <input type="text" name="f_sel_enddt" class="search_form" onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, false,1)" style="width:70;" maxlength="10" value=''/>
                                    <img id="f_sel_dt_cal" onclick="doDisplay('DATE11', frm1);" src="<%=CLT_PATH%>/web/img/button/btns_calendar.gif" style="cursor:hand;" align="absmiddle"/>
                                </td>
								<td width="15"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
                                <td width="50" nowrap="nowrap" class="table_search_head_r"><bean:message key="Status"/></td>
                                <td class="table_search_body">
                                	<select name="f_inv_sts_cd" class="search_form">
                                		<option value="" >ALL</option>
                                		<option value="IS">Invoice Issue</option>
                                		<option value="IC">Invoice Confirm</option>
                                		<option value="IE">Invoice End</option>
                                	</select>
								</td>
								<td width="15"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
                                <td width="60" nowrap="nowrap" class="table_search_head_r"><bean:message key="Slip_YN"/></td>
                                <td nowrap="nowrap" class="table_search_body">
	                                <select name="f_slip_yn"  style="width:80;">
	                                    <option value="">ALL</option>
	                                    <option value="Y">Y</option>
	                                    <option value="N">N</option>
	                                </select>
                                </td>						
                            </tr>
                            <tr>
                                <td width="80" class="table_search_head_r"><bean:message key="Inv_No"/></td>
                                <td class="table_search_body" colspan="4">
									<input type="text" name="f_inv_no" class="search_form" dataformat="excepthan" style="ime-mode isabled;text-transform:uppercase;width:160;" value=''/>
									<img name="img_inv_no" src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" align="absmiddle" style="cursor:hand" onClick="doWork('INV_POPLIST')"/>
                                </td>
                                <td width="15"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
                                <td nowrap="nowrap" class="table_search_head"><bean:message key="Customer"/></td>
                                <td class="table_search_body">
									<input type="text" name="f_trdp_cd" maxlength="20" value='' class="search_form" onKeyDown="codeNameAction('trdpCode',this, 'onKeyDown')" onBlur="codeNameAction('trdpCode',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:50;">
									<img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" id="trdp_cd" onClick="doWork('CUSTOMER_POPLIST')" style="cursor:hand;" align="absmiddle">
									<input type="text" name="f_trdp_nm" value='' class="search_form-disable" readonly>
                                </td>
                                <td width="15"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
                                <td width="60" nowrap="nowrap" class="table_search_head_r"><bean:message key="User"/></td>
                                <td nowrap="nowrap" class="table_search_body">
									<input type="text"   name="f_pic_id" value='' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:110;">
									<img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" id="user" onClick="doWork('USER_POPLIST')" style="cursor:hand;" align="absmiddle">
                                </td>                       
                            </tr>
                        </table>
					  </td>
                    </tr>
                </table>
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
                    </tr>
                </table>
              <!-- 간격 -->
            </td>
        </tr>
    </table>
    <!--빈공간 -->
    <!-- 검색 -->
    <!--빈공간 -->
    <table width="1200" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td height="4"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
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
                        <td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
                    </tr>
                </table>
                <table width="100%" border="0" cellpadding="0" cellspacing="0">
                    <tr>
						<td colspan="2" width="90%">
							<table width="100%" border="0" cellpadding="0" cellspacing="0">
								<tr>
									<td nowrap="nowrap" class="sub_title" width="140"><img src="<%=CLT_PATH%>/web/img/main/sub_title_arrow.gif" width="7" height="7" hspace="3"/><bean:message key="Invoice_List"/></td>
									<td class="sub_title2"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
								</tr>
                            </table>
						</td>
						<td align="right">
							  <table border="0" cellspacing="0" cellpadding="0">
								  <tr>
								  	<td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="6"/></td>
									<td style="cursor:hand" onClick="doWork('ENDCANCEL')">
										<div id="sEndCancel" style="display:none">
										<table height="21" border="0" cellpadding="0" cellspacing="0" width="75">
											<tr>
												<td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"/></td>
												<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="End_Cancel"/></td>
												<td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"/></td>
											</tr>
										</table>
										</div>
									</td>
									<td style="cursor:hand" onClick="doWork('CONFIRMCANCEL')">
										<div id="sConfirmCancel" style="display:none">
										<table height="21" border="0" cellpadding="0" cellspacing="0" width="95">
											<tr>
												<td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"/></td>
												<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Confirm"/><bean:message key="Cancel"/></td>
												<td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"/></td>
											</tr>
										</table>
										</div>
									</td>
									<td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="6"/></td>
									<td style="cursor:hand" onClick="doWork('CONFIRM')">
										<div id="sConfirm" style="display:none">
										<table height="21" border="0" cellpadding="0" cellspacing="0">
											<tr>
												<td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"/></td>
												<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Confirm"/></td>
												<td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"/></td>
											</tr>
										</table>
										</div>
									 </td>
									<td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="6"/></td>
									<td style="cursor:hand" onClick="doWork('EXCEL')">
										<table height="21" border="0" cellpadding="0" cellspacing="0">
											<tr>
												<td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"/></td>
												<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Excel"/></td>
												<td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"/></td>
											</tr>
										</table>
									 </td>
									 <!-- 회계시스템 연동으로 인해 수정.
									 <td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="6"/></td>
									 <td style="cursor:hand" onClick="doWork('BALANCE')">
										<table height="21" border="0" cellpadding="0" cellspacing="0">
											<tr>
												<td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"/></td>
												<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Balance"/></td>
												<td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"/></td>
											</tr>
										</table>
									 </td>
									 -->
									 <td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="6"/></td>
									 <td style="cursor:hand" onClick="doWork('RECIEPTPRINT')">
										<div id="prn" style="display:none">
											<table height="21" border="0" cellpadding="0" cellspacing="0">
												<tr>
													<td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"/></td>
													<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Receipt"/></td>
													<td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"/></td>
												</tr>
											</table>
										</div>
									 </td>
								  </tr>
							  </table>
						</td>	
                    </tr>
                </table>
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
                                    <td>
                                        <script language="javascript">comSheetObject('sheet1');</script>
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
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td height="10"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
        </tr>
    </table>
   </form>
</body>
</html>
<script>
var pDoc = parent.parent.document;
hideProcess('WORKING', pDoc);

</script>