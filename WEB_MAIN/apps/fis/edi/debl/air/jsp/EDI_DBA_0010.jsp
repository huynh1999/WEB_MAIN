<%--
=========================================================
*Copyright(c) 2009 CyberLogitec. All Rights Reserved.
=========================================================
=========================================================
*@FileName   : EDI_DBA_0010.jsp
*@FileTitle  : DE Customs EDI (Air)
*@Description: DE Customs EDI (Air) 저장 및 전송
*@author     : Lee, HaeKyoung
*@version    : 1.0 - 03/22/2012
*@since      :

*@Change history:
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.HashMap"%>
    <%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
    
    <bean:define id="blVO"   name="EventResponse" property="objVal"/>
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
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/edi/debl/air/script/EDI_DBA_0010.js?ver=<%=CLT_JS_VER%>"></script>
	<script>	
   </script>
</head>
<body class="td" onload="loadPage();">
<form name="frm1" method="POST" action="./EDI_DBA_0010.clt">
    <input type="hidden" name="f_cmd">
    <input type="hidden" name="bl_type_val" value="<bean:write name="blVO" property="bl_type"/>">
    <input type="hidden" name="intg_bl_seq" value="<bean:write name="blVO" property="intg_bl_seq"/>">
    <input type="hidden" name="mrn" value="<bean:write name="blVO" property="mrn"/>">
    <input type="hidden" name="zpi_local_goods" value="<bean:write name="blVO" property="zpi_local_goods"/>">
    <input type="hidden" name="zpi_pre_note" value="<bean:write name="blVO" property="zpi_pre_note"/>">
	
<!--    <html:hidden name="blVO"  property="intg_bl_seq"/>-->
    
    <table width="1200" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td class="bigtitle"><%=LEV3_NM%></td>
            <td align="right" nowrap class="navi"><img src="<%=CLT_PATH%>/web/img/main/navi_icon.gif" width="6" height="5" hspace="3" vspace="5" align="texttop"><%=LEV1_NM%> > <%=LEV2_NM%> ><span class="navi_b"><%=LEV3_NM%></span></td>
        </tr>
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
                        <td onClick="doWork('SEARCHLIST')" style="cursor:hand">
                            <table height="21" border="0" cellpadding="0" cellspacing="0" style="margin-left:5px;cursor:hand">
                                <tr>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
                                    <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Search"/></td>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
                                </tr>
                            </table>        
                        </td>
                        <td onClick="doWork('UPLOAD')" style="cursor:hand">
                            <table height="21" border="0" cellpadding="0" cellspacing="0" style="margin-left:5px;cursor:hand">
                                <tr>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
                                    <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Upload"/></td>
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
                <table width="100%" border="0" cellpadding="0" cellspacing="0">
                    <tr>
                    	<td width="60" nowrap class="table_search_body"><input type="radio" name="f_bl_type" id="f_prn_opt1" value="M" checked><label for="f_prn_opt1"><bean:message key="MAWB"/></label></td>
                        <td width="60" nowrap class="table_search_body"><input type="radio" name="f_bl_type" id="f_prn_opt2" value="H"><label for="f_prn_opt2"><bean:message key="HAWB"/></label></td>
                        <td width="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                        <td width="70" nowrap class="table_search_head"><bean:message key="AWB_No"/></td>
                        <td width="180" class="table_search_body">
                            <input name="f_bl_no"  value="<bean:write name="valMap" property="f_bl_no"/>" type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:150;text-transform:uppercase;" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){openPopUp('BL_POPLIST',this);}">
                            <img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" onClick="openPopUp('BL_POPLIST',this)" style="cursor:hand" align="absmiddle">
                        </td>
                        <td width="500" >&nbsp;</td>
                        <td align="left"><input type="text" name="status" value=" * Status : " style="width:80;border:0;background-color:transparent;" readOnly tabindex="1"><input type="text" name="sts_cd" value="<bean:write name="blVO" property="sts_cd"/>" style="width:100;border:0;background-color:transparent;" readOnly tabindex="1"></td>
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
			<td height="10"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
		</tr>
	</table>
    
	<table width="1200" border="0" cellspacing="0" cellpadding="0">
		<tr>
			<td height="22" align="left" background="<%=CLT_PATH%>/web/img/main/tab_table_top.gif">
				<table height="22" border="0" cellpadding="0" cellspacing="0">
					<tr>
						<td class="tab_head-l"     id=Tab01 style="cursor:hand;" onClick="javascript:goTabSelect('01');"><span><bean:message key="AWB_Info"/></span></td>
						<td width="1"></td>	
                        <td class="tab_head_non-l" id=Tab02 style="cursor:hand;" onClick="javascript:goTabSelect('02');"><span><bean:message key="Message"/></span></td>
                        <td width="1"></td>
					</tr>
				</table>
			</td>
		</tr>
		<tr>
<!--			<td align="center" valign="top" background="<%=CLT_PATH%>/web/img/main/tab_table_bg.gif">-->
			<td align="center" valign="top" class="table_search_bg">
				<table width="100%" border="0" cellspacing="10" cellpadding="0">
					<tr>
						<td valign="top">
		<div id="tabLayer" style="display:inline"><!--AWB Info.-->
							<table width="100%" border="0" bordercolor="red" cellspacing="0" cellpadding="0">
								<tr>
									<td colspan="5" >
										<table width="100%" border="0" cellspacing="0" cellpadding="0">
											<tr>
												<td valign="top">
													<table width="100%" border="0" cellspacing="0" cellpadding="0">
														<tr>
													<!-- MAWB Info  START-->
															<td align="left" valign="top" width="300">
																<table width="100%" border="0" cellpadding="0" cellspacing="0">
																	<tr>
																		<td width="70" nowrap class="table_search_head"><bean:message key="MH"/></td>
																		<td width="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
																		<td width="60" nowrap class="table_search_body"><input type="radio" name="bl_type" id="bl_type1" value="M" checked><label for="bl_type1"><bean:message key="MAWB"/></label></td>
	                        											<td width="60" nowrap class="table_search_body"><input type="radio" name="bl_type" id="bl_type2" value="H" ><label for="bl_type2"><bean:message key="HAWB"/></label></td>
																	</tr>
																	<tr>
																		<td width="70" nowrap class="table_search_head"><bean:message key="AWB_Type"/></td>
																		<td width="115" class="table_search_body" colspan="3">
																			<bean:define id="blTypeList" name="valMap" property="blTypeList"/>
																			<html:select name="blVO" property="awb_direct" styleClass="search_form" style="width:115;">
																				<html:options collection="blTypeList" property="cd_val" labelProperty="cd_nm"/>
																			</html:select>
																		</td>
																	</tr>
																</table>
																<table width="100%" border="0" cellspacing="0" cellpadding="0">
																	<tr>
																		<td height="20"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
																	</tr>
																</table>
																<table width="100%" border="0" cellpadding="0" cellspacing="0">
																	<tr>
																		<td nowrap class="sub_title" width="120"><img src="<%=CLT_PATH%>/web/img/main/sub_title_arrow.gif" width="7" height="7" hspace="1"><bean:message key="MAWB_Info"/></td>
																		<td class="sub_title2"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
																	</tr>
																</table>
																<table width="100%" border="0" cellpadding="0" cellspacing="0">
																	<tr>
																		<td width="70" nowrap class="table_search_head"><bean:message key="MAWB_No"/></td>
                        												<td width="180" class="table_search_body">
                            											<input name="mbl_no" maxlength="40"  value="<bean:write name="blVO" property="mbl_no"/>" type="text" class="search_form-disable" readOnly dataformat="excepthan" style="ime-mode:disabled;width:150;text-transform:uppercase;" onblur="strToUpper(this)">
                        												</td>
																	</tr>
																</table>
																<table width="100%" border="0" cellpadding="0" cellspacing="0">
																	<tr>
																		<td width="70" nowrap class="table_search_head_r"><bean:message key="AWB"/> <bean:message key="PCS"/></td>
																		<td nowrap class="table_search_body">
																			<input type="text" name="mbl_pck_qty" value="<wrt:write name="blVO" property="mbl_pck_qty" formatType="MONEY" format="#,###"/>" onkeyPress="onlyNumberCheck();" onkeyup="numberCommaLen(this,7,0)" maxlength="13"  class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:60;text-align:right"> 
																		</td>
																		<td width="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
																		<td width="85" nowrap class="table_search_head_r"><bean:message key="G_Weight"/></td>
																		<td nowrap class="table_search_body">
																			<input type="text" name="mbl_grs_wgt" value="<wrt:write name="blVO" property="mbl_grs_wgt" formatType="MONEY" format="#,##0.0"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,8,1);chkComma(this,8,1);" maxlength="13" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:60;text-align:right;"">
																			<input type="text" name="mbl_grs_wgt_ut_cd" value="<bean:write name="blVO" property="mbl_grs_wgt_ut_cd"/>" style="width:30;border:0;background-color:transparent;" readOnly tabindex="1">
																		</td>
																	</tr>
																	<tr>
																		<td width="70" nowrap class="table_search_head_r"><bean:message key="Rate"/> <bean:message key="PCS"/></td>
																		<td nowrap class="table_search_body">
																			<input type="text" name="mbl_rt_pck_qty" value="<wrt:write name="blVO" property="mbl_rt_pck_qty" formatType="MONEY" format="#,###"/>" onkeyPress="onlyNumberCheck();" onkeyup="numberCommaLen(this,7,0)" maxlength="13"  class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:60;text-align:right"> 
																		</td>
																		<td width="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
																		<td width="85" nowrap class="table_search_head_r"><bean:message key="Rate_Weight"/></td>
																		<td nowrap class="table_search_body">
																			<input type="text" name="mbl_rt_grs_wgt" value="<wrt:write name="blVO" property="mbl_rt_grs_wgt" formatType="MONEY" format="#,##0.0"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,8,1);chkComma(this,8,1);" maxlength="13" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:60;text-align:right;" >
																			<input type="text" name="mbl_rt_grs_wgt_ut_cd" value="<bean:write name="blVO" property="mbl_rt_grs_wgt_ut_cd"/>" style="width:30;border:0;background-color:transparent;" readOnly tabindex="1">
																		</td>
																	</tr>
																</table>
																<table width="100%" border="0" cellpadding="0" cellspacing="0">
					                                                <tr>
					                                                	<td nowrap class="table_search_head_r"><bean:message key="Rate"/></td>
																		<td nowrap class="table_search_body">
																			<bean:define id="rateClssCdList" name="valMap" property="rateClssCdList"/>
					                                                        <html:select name="blVO" property="mbl_rt_clss_cd" styleClass="search_form">
					                                                        	<option value=""></option>
					                                                            <html:options collection="rateClssCdList" property="cd_val" labelProperty="cd_nm"/>
					                                                        </html:select>
																		</td>
					                                                </tr>
					                                            </table>
					                                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
																	<tr>
																		<td height="20"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
																	</tr>
																</table>
																<table width="100%" border="0" cellpadding="0" cellspacing="0">
																	<tr>
																		<td nowrap class="sub_title" width="120"><img src="<%=CLT_PATH%>/web/img/main/sub_title_arrow.gif" width="7" height="7" hspace="1"><bean:message key="HAWB_Info"/></td>
																		<td class="sub_title2"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
																	</tr>
																</table>
																<table width="100%" border="0" cellpadding="0" cellspacing="0">
																	<tr>
																		<td width="70" nowrap class="table_search_head"><bean:message key="HAWB_No"/></td>
                        												<td width="180" class="table_search_body">
                            											<input name="hbl_no" maxlength="40"  value="<bean:write name="blVO" property="hbl_no"/>" type="text" class="search_form-disable" readOnly dataformat="excepthan" style="ime-mode:disabled;width:150;text-transform:uppercase;" onblur="strToUpper(this)">
                        												</td>
																	</tr>
																</table>
																<table width="100%" border="0" cellpadding="0" cellspacing="0">
																	<tr>
																	    <td width="40" id="tdPcs" nowrap class="table_search_head"><bean:message key="PCS"/></td>
																		<td nowrap class="table_search_body">
																			<input type="text" name="hbl_pck_qty" value="<wrt:write name="blVO" property="hbl_pck_qty" formatType="MONEY" format="#,###"/>" onkeyPress="onlyNumberCheck();" onkeyup="numberCommaLen(this,7,0)" maxlength="13"  class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:60;text-align:right"> 
																		</td>
																		<td width="10"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
																	    <td width="70" id="tdWgt" nowrap class="table_search_head"><bean:message key="G_Weight"/></td>
																		<td nowrap class="table_search_body">
																			<input type="text" name="hbl_grs_wgt" value="<wrt:write name="blVO" property="hbl_grs_wgt" formatType="MONEY" format="#,##0.0"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,8,1);chkComma(this,8,1);" maxlength="13" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:60;text-align:right;">
																			<input type="text" name="hbl_grs_wgt_ut_cd" value="<bean:write name="blVO" property="hbl_grs_wgt_ut_cd"/>" style="width:30;border:0;background-color:transparent;" readOnly tabindex="1">
																		</td>
																	</tr>
																</table>
																<table width="100%" border="0" cellspacing="0" cellpadding="0">
																	<tr>
																		<td height="45"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
																	</tr>
																</table>
																<table width="100%" border="0" cellpadding="0" cellspacing="0">
					                                                <tr>
																	    <td nowrap id="tdCmdt" class="table_search_head"><bean:message key="Commodity"/></td>
					                                                    <td nowrap class="table_search_body">
					                                                        <input type="text" name="hbl_rep_cmdt_cd" value="<bean:write name="blVO" property="hbl_rep_cmdt_cd"/>" class="search_form" onKeyDown="codeNameActionEdi('commodity',this, 'onKeyDown')" onBlur="codeNameActionEdi('commodity',this, 'onBlur')" dataformat="excepthan" style="ime-mode:disabled;width:45;">
					                                                        <img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" onClick="openPopUp('COMMODITY_POPLIST1',this)" style="cursor:hand;" align="absmiddle">
					                                                        <input type="text" name="hbl_rep_cmdt_nm" value="<bean:write name="blVO" property="hbl_rep_cmdt_nm"/>" maxlength="200" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:155;" onchange="" onKeyPress="if(event.keyCode==13){openPopUp('COMMODITY_POPLIST1',this);}">
					                                                    </td>
					                                                </tr>
																</table>
																<table width="100%" border="0" cellpadding="0" cellspacing="0">
					                                                <tr>
					                                                    <td width="130" nowrap class="table_search_head_r"><bean:message key="Goods_at_the_Airport"/></td>
					                                                    <td width="40" nowrap class="table_search_body"><input type="radio" name="rd_zpi_local_goods" id="zpi_local_goods1" value="Y" onClick="javascript:changeZpiVal();" checked><label for="zpi_local_goods1">Yes</label></td>
	                        											<td nowrap class="table_search_body"><input type="radio" name="rd_zpi_local_goods" id="zpi_local_goods2" value="N" onClick="javascript:changeZpiVal();"><label for="zpi_local_goods2">No</label></td>
					                                                </tr>
																</table>
															</td>
													<!-- MAWB Info  END-->		
													
															<td width="8" align="left" valign="top"><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="8"></td>
															
													<!-- AirLine & route  START--> 
															<td align="left" valign="top" width="280">
																<table width="100%" border="0" cellpadding="0" cellspacing="0">
																	<tr>
																		<td nowrap class="sub_title" width="120"><img src="<%=CLT_PATH%>/web/img/main/sub_title_arrow.gif" width="7" height="7" hspace="1"><bean:message key="Airline_route"/></td>
																		<td class="sub_title2"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
																	</tr>
																</table>
																<table width="100%" border="0" cellpadding="0" cellspacing="0">
                                                                    <tr>
																		<td width="100" nowrap class="table_search_head_r"><bean:message key="Air_Line_FLT_No"/></td>
                                                                        <td width="119" nowrap class="table_search_body">
                                                                            <input type="hidden"   name="lnr_trdp_cd" value='<bean:write name="blVO" property="lnr_trdp_cd"/>' onKeyDown="codeNameActionEdi('trdpCode_liner',this, 'onKeyDown')" onBlur="codeNameActionEdi('trdpCode_liner',this, 'onBlur')" class="search_form-disable" readOnly dataformat="excepthan" style="ime-mode:disabled;width:50px;">
                                                                            <input type="text"   name="lnr_trdp_nm" value='<bean:write name="blVO" property="lnr_trdp_nm"/>' onKeyDown="codeNameActionEdi('trdpCode_liner',this, 'onKeyDown')" onBlur="codeNameActionEdi('trdpCode_liner',this, 'onBlur')" class="search_form-disable" readOnly dataformat="excepthan" style="ime-mode:disabled;width:117px;">
                                                                        </td>
                                                                        <td nowrap class="table_search_body">
                                                                            <input type="text" name="flt_no"      value='<bean:write name="blVO" property="flt_no"/>'   onblur="strToUpper(this)"  class="search_form-disable" readOnly dataformat="excepthan" style="ime-mode:disabled;width:55px;text-transform:uppercase;" maxlength="15">
                                                                        </td>
                                                                    </tr>
                                                                </table>
																<table width="100%" border="0" cellpadding="0" cellspacing="0">
																	<tr>
																		<td width="100" nowrap class="table_search_head_r"><bean:message key="Departure"/></td>
																		<td width="61" nowrap class="table_search_body">
																			<input type="text"   name="pol_cd" value='<bean:write name="blVO" property="pol_cd"/>' onKeyDown="codeNameActionEdi('Location_pol',this, 'onKeyDown')" onBlur="codeNameActionEdi('Location_pol',this, 'onBlur')" dataformat="excepthan" style="ime-mode:disabled;width:58;" class="search_form-disable" readOnly>
																		</td>
																		<td width="73" nowrap class="table_search_body">
																			<input type="text" name="etd_dt_tm" value='<wrt:write name="blVO" property="etd_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' class="search_form-disable" readOnly  dataformat="excepthan" style="ime-mode:disabled;width:70px;" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1)">
																		</td>
																		<td nowrap class="table_search_body">
																			<input type="text" name="etd_tm" value='<wrt:write name="blVO" property="etd_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm"/>' maxlength="5" class="search_form-disable" readOnly dataformat="excepthan" style="ime-mode:disabled;width:40px;" onchange="timeCheck(this);" onkeypress="onlyNumberCheck();">
																		</td>
																	</tr>
																	<tr>
																		<td width="100" nowrap class="table_search_head_r"><bean:message key="Destination"/></td>
																		<td nowrap class="table_search_body">
																			<input type="text"   name="pod_cd" value='<bean:write name="blVO" property="pod_cd"/>' onKeyDown="codeNameActionEdi('Location_pod',this, 'onKeyDown')" onBlur="codeNameActionEdi('Location_pod',this, 'onBlur')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:58;" class="search_form-disable" readOnly>
																		</td>
																		<td nowrap class="table_search_body">
																			<input type="text" name="eta_dt_tm" value='<wrt:write name="blVO" property="eta_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' class="search_form-disable" readOnly dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px;" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1)">
																		</td>
																		<td nowrap class="table_search_body">
																			<input type="text" name="eta_tm" value='<wrt:write name="blVO" property="eta_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm"/>' maxlength="5" class="search_form-disable" readOnly dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:40px;" onchange="timeCheck(this);" onkeypress="onlyNumberCheck();">
																		</td>
																	</tr>
																</table>
																<table width="100%" border="0" cellspacing="0" cellpadding="0">
																	<tr>
																		<td height="15"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
																	</tr>
																</table>
																<table border="0" cellpadding="0" cellspacing="0">
					                                                <tr>
					                                                	<td width="100" nowrap class="table_search_head"><bean:message key="Currency"/></td>
					                                                    <td nowrap class="table_search_body">
					                                                        <bean:define id="currCdList" name="valMap" property="currCdList"/>
					                                                        <html:select name="blVO" property="curr_cd" styleClass="search_form" style="width:55;">
					                                                            <html:options collection="currCdList" property="cd_val" labelProperty="cd_nm"/>
					                                                        </html:select>
					                                                        <input type="hidden" name="curr_cd" value="<bean:write name="blVO" property="curr_cd"/>">
					                                                    </td>
					                                                </tr>
					                                            </table>
																<table width="100%" border="0" cellpadding="0" cellspacing="0">
					                                                <tr>
					                                                    <td width="100" nowrap class="table_search_head"><bean:message key="DV_Carriage"/></td>
					                                                    <td nowrap class="table_search_body">
					                                                        <input type="text" name="decl_crr_val" maxlength="50"  value='<bean:write name="blVO" property="decl_crr_val"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:120px;">
					                                                    </td>
																	</tr>
					                                                <tr>
					                                                    <td width="100" nowrap class="table_search_head"><bean:message key="DV_Customs"/></td>
					                                                    <td nowrap class="table_search_body">
					                                                        <input type="text" name="decl_cstms_val" maxlength="50" value='<bean:write name="blVO" property="decl_cstms_val"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:120px;">
					                                                    </td>
					                                                </tr>
					                                                <tr>
					                                                    <td  nowrap class="table_search_head"><bean:message key="Insurance"/></td>
					                                                    <td nowrap class="table_search_body">
					                                                        <input type="text" name="amt_insur_val" maxlength="50" value='<bean:write name="blVO" property="amt_insur_val"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:120px;" >
					                                                    </td>
					                                                </tr>
					                                            </table>  
					                                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
																	<tr>
																		<td height="15"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
																	</tr>
																</table>
					                                            <table width="100%" border="0" cellpadding="0" cellspacing="0">
					                                                <tr>
					                                                	<td width="130" nowrap class="table_search_head_r"><bean:message key="Gate_Handling_Agent"/></td>
					                                                </tr>
					                                                <tr>
					                                                	<td nowrap class="table_search_body">
					                                                		<img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="10">
																			<bean:define id="gateHdAgentList" name="valMap" property="gateHdAgentList"/>
<!--					                                                        <div style="width:230px; overflow:hidden; position:relative;"> -->
					                                                        <html:select style="width:230px;" name="blVO" property="gate_han_agt" styleClass="search_form" onchange="setCar_han_agtd(this)">
					                                                        	<option value=""></option>
					                                                            <html:options collection="gateHdAgentList" property="cd_val" labelProperty="cd_nm" style="width:150px;"/>
					                                                        </html:select>
<!--					                                                        </div>-->
																		</td>
					                                                </tr>
					                                            </table>
					                                            <table width="100%" border="0" cellpadding="0" cellspacing="0">
					                                                <tr>
					                                                	<td width="180" nowrap class="table_search_head_r"><bean:message key="Carrier_Handling_Agent"/></td>
					                                                </tr>
					                                                <tr>
					                                                	<td nowrap class="table_search_body">
					                                                		<img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="10">
																			<bean:define id="gateHdAgentList" name="valMap" property="gateHdAgentList"/>
					                                                        <html:select style="width:230px;" name="blVO" property="car_han_agt" styleClass="search_form" >
					                                                        	<option value=""></option>
					                                                            <html:options collection="gateHdAgentList" property="cd_val" labelProperty="cd_nm" style="width:150px;"/>
					                                                        </html:select>
																		</td>
					                                                </tr>
					                                            </table> 
					                                            <table width="100%" border="0" cellpadding="0" cellspacing="0">
					                                                <tr>
					                                                	<td width="130" nowrap class="table_search_head_r"><bean:message key="Customs_Office"/></td>
					                                                </tr>
					                                                <tr>
																		<td nowrap class="table_search_body">
																			<img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="10">
																			<bean:define id="custOfcCdList" name="valMap" property="custOfcCdList"/>
					                                                        <html:select style="width:230px;" name="blVO" property="cust_ofc_cd" styleClass="search_form">
					                                                        	<option value=""></option>
					                                                            <html:options collection="custOfcCdList" property="cd_val" labelProperty="cd_nm" style="width:150px;" />
					                                                        </html:select>
																		</td>
					                                                </tr>
					                                            </table> 
					                                            <table width="100%" border="0" cellpadding="0" cellspacing="0">
																	<tr>
																		<td width="35" nowrap class="table_search_head_r"><bean:message key="TIN"/></td>
                        												<td class="table_search_body">
                            											<input name="tin_cd"  value='<bean:write name="blVO" property="tin_cd"/>' type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:60;text-transform:uppercase;" onblur="strToUpper(this)">
                        												</td>
																	</tr>
																</table>
															</td>
													<!-- AirLine & route  END-->		
															
															<td width="8" align="left" valign="top"><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="8"></td>
															
													<!-- Customer START--> 		
															<td rowspan="5" align="left" valign="top" width="320">
																<table width="100%" border="0" cellpadding="0" cellspacing="0">
																	<tr>
																		<td nowrap class="sub_title" width="120"><img src="<%=CLT_PATH%>/web/img/main/sub_title_arrow.gif" width="7" height="7" hspace="1"><bean:message key="Customer"/></td>
																		<td class="sub_title2"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
																	</tr>
																</table>
																
																<!-- Forwarder--> 	
																<table width="100%" border="0" cellpadding="0" cellspacing="0">
																	<tr>
																		<td width="110" nowrap class="table_search_head_r"><bean:message key="Forwarder"/></td>
																		<td nowrap class="table_search_body">
																			<input type="hidden" name="frwd_trdp_cd"  value='<bean:write name="blVO" property="frwd_trdp_cd"/>'  onKeyDown="codeNameActionEdi('trdpCode_consignee',this, 'onKeyDown')" onBlur="codeNameActionEdi('trdpCode_consignee',this, 'onBlur');" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:48;">
																				<input type="text"   name="frwd_ofc_nm"  value='<bean:write name="blVO" property="frwd_ofc_nm"/>'  onblur="strToUpper(this);"   class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:198;text-transform:uppercase;" maxlength="50">
<!--																			<input type="text"   name="frwd_ofc_nm"  value='<bean:write name="blVO" property="frwd_ofc_nm"/>'  onblur="strToUpper(this);checkTrdpCode(this);"   class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:175;text-transform:uppercase;" maxlength="50" onKeyPress="if(event.keyCode==13){openAiePopUp('LINER_POPLIST', document.getElementById('consignee'), frm1.cnee_trdp_nm.value);}">-->
<!--																			<img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" id="consignee" onClick="openAiePopUp('LINER_POPLIST',this)" style="cursor:hand" align="absmiddle">-->
																		</td>
																	</tr>
																</table>
																<table width="100%" border="0" cellpadding="0" cellspacing="0">
																	<tr>
									                                    <td width="110" nowrap class="table_search_head_r"><bean:message key="PIC_eMail"/></td>
									                                    <td align="right" nowrap class="table_search_body">
									                                        <input name="frwd_trdp_pic" value='<bean:write name="blVO" property="frwd_trdp_pic"/>' maxlength="30" type="text" class="search_form" style="width:98;" >
									                                        <input name="frwd_trdp_email" value='<bean:write name="blVO" property="frwd_trdp_email"/>' maxlength="30" type="text" class="search_form" style="width:98;">
									                                    </td>
									                                </tr>
									                            </table>
																<table width="100%" border="0" cellpadding="0" cellspacing="0">
																	<tr>
									                                    <td width="110" nowrap class="table_search_head"><bean:message key="Tel_Fax"/></td>
									                                    <td align="right" nowrap class="table_search_body">
									                                        <input name="frwd_trdp_phn" value='<bean:write name="blVO" property="frwd_trdp_phn"/>' maxlength="30" type="text" class="search_form" onkeyDown="onlyNumberCheck();" style="width:98;" >
									                                        <input name="frwd_trdp_fax" value='<bean:write name="blVO" property="frwd_trdp_fax"/>' maxlength="30" type="text" class="search_form" onkeyDown="onlyNumberCheck();" style="width:98;">
									                                    </td>
									                                </tr>
									                            </table>
									                            
									                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
																	<tr>
																		<td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
																	</tr>
																</table>
																<table width="100%" border="0" cellspacing="0" cellpadding="0">
																	<tr>
																		<td width="100%" nowrap class="dotline"></td>
																	</tr>
																</table>
																<table width="100%" border="0" cellspacing="0" cellpadding="0">
																	<tr>
																		<td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
																	</tr>
																</table>
																
									                            <!-- Shipper--> 	
																<table width="100%" border="0" cellpadding="0" cellspacing="0">
																	<tr>
																		<td width="110" nowrap class="table_search_head_r"><bean:message key="Shipper"/></td>
																		<td nowrap class="table_search_body">
																			<input type="text"   name="shpr_trdp_nm" value='<bean:write name="blVO" property="shpr_trdp_nm"/>'  onblur="strToUpper(this)"  class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:175;text-transform:uppercase;" maxlength="50" onKeyPress="if(event.keyCode==13){openPopUp('LINER_POPLIST', document.getElementById('shipper'), frm1.shpr_trdp_nm.value);}">
                                                                            <input type="hidden" name="shpr_trdp_cd" value='<bean:write name="blVO" property="shpr_trdp_cd"/>'  class="search_form" onKeyDown="codeNameActionEdi('trdpCode_shipper',this, 'onKeyDown')" onBlur="codeNameActionEdi('trdpCode_shipper',this, 'onBlur')" dataformat="excepthan" style="ime-mode:disabled;width:48;">
																			<img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" id="shipper"   onClick="openPopUp('EDI_LINER_POPLIST',this)" style="cursor:hand" align="absmiddle">
																		</td>
																	</tr>
																</table>
																<table width="100%" border="0" cellpadding="0" cellspacing="0">
																	<tr>
																		<td width="110" nowrap class="table_search_head_r"><bean:message key="Address"/></td>
																		<td align="right" nowrap class="table_search_body">
																			<textarea name="shpr_trdp_addr" class="search_form" dataformat="excepthan" style="width:200;height:80px;" onblur="strToUpper(this);chkCmpAddr(this, 'Shipper Address')" WRAP="off"><bean:write name="blVO" property="shpr_trdp_addr" filter="false"/></textarea>
																		</td>
																	</tr>
																</table>
									                            <table width="100%" border="0" cellpadding="0" cellspacing="0">
																	<tr>
									                                    <td width="110" nowrap class="table_search_head_r"><bean:message key="City_Country"/></td>
									                                    <td align="right" nowrap class="table_search_body">
									                                        <input name="shpr_trdp_city" value='<bean:write name="blVO" property="shpr_trdp_city"/>' maxlength="30" type="text" class="search_form" style="width:64;" >
									                                        <input name="shpr_trdp_cnt" value='<bean:write name="blVO" property="shpr_trdp_cnt"/>' maxlength="30" type="text" class="search_form" style="width:49;" >
									                                    </td>
									                                </tr>
									                            </table> 
									                            <table width="100%" border="0" cellpadding="0" cellspacing="0">
																	<tr>
									                                    <td width="110" nowrap class="table_search_head"><bean:message key="Zip"/></td>
									                                    <td align="right" nowrap class="table_search_body">
									                                        <input name="shpr_trdp_zip" value='<bean:write name="blVO" property="shpr_trdp_zip"/>' maxlength="10" type="text" onKeyPress="ComKeyOnlyNumber(this)" class="search_form" style="width:65;" >
									                                    </td>
									                                </tr>
									                            </table> 
																<table width="100%" border="0" cellpadding="0" cellspacing="0">
																	<tr>
									                                    <td width="110" nowrap class="table_search_head"><bean:message key="Tel_Fax"/></td>
									                                    <td align="right" nowrap class="table_search_body">
									                                        <input name="shpr_trdp_phn" value='<bean:write name="blVO" property="shpr_trdp_phn"/>' maxlength="30" type="text" class="search_form" onkeyDown="onlyNumberCheck();" style="width:98;" >
									                                        <input name="shpr_trdp_fax" value='<bean:write name="blVO" property="shpr_trdp_fax"/>' maxlength="30" type="text" class="search_form" onkeyDown="onlyNumberCheck();" style="width:98;">
									                                    </td>
									                                </tr>
									                            </table>  
									                            
									                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
																	<tr>
																		<td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
																	</tr>
																</table>
																<table width="100%" border="0" cellspacing="0" cellpadding="0">
																	<tr>
																		<td width="100%" nowrap class="dotline"></td>
																	</tr>
																</table>
																<table width="100%" border="0" cellspacing="0" cellpadding="0">
																	<tr>
																		<td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
																	</tr>
																</table>
									                            <!-- Consignee-->  
																<table width="100%" border="0" cellpadding="0" cellspacing="0">
																	<tr>
																		<td width="110" nowrap class="table_search_head_r"><bean:message key="Consignee"/></td>
																		<td nowrap class="table_search_body">
																			<input type="hidden" name="cnee_trdp_cd"  value='<bean:write name="blVO" property="cnee_trdp_cd"/>'  onKeyDown="codeNameActionEdi('trdpCode_consignee',this, 'onKeyDown')" onBlur="codeNameActionEdi('trdpCode_consignee',this, 'onBlur');" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:48;">
																			<input type="text"   name="cnee_trdp_nm"  value='<bean:write name="blVO" property="cnee_trdp_nm"/>'  onblur="strToUpper(this);"   class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:175;text-transform:uppercase;" maxlength="50" onKeyPress="if(event.keyCode==13){openAiePopUp('LINER_POPLIST', document.getElementById('consignee'), frm1.cnee_trdp_nm.value);}">
																			<img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" id="consignee" onClick="openPopUp('EDI_LINER_POPLIST',this)" style="cursor:hand" align="absmiddle">
																		</td>
																	</tr>
																</table>
																<table width="100%" border="0" cellpadding="0" cellspacing="0">
																	<tr>
																		<td width="110" nowrap class="table_search_head_r"><bean:message key="Address"/></td>
																		<td align="right" nowrap class="table_search_body">
																			<textarea name="cnee_trdp_addr" class="search_form" dataformat="excepthan" style="width:200;height:80px;" onblur="strToUpper(this);chkCmpAddr(this, 'Consignee Address')" WRAP="off"><bean:write name="blVO" property="cnee_trdp_addr" filter="false"/></textarea>
																		</td>
																	</tr>
																</table>
																<table width="100%" border="0" cellpadding="0" cellspacing="0">
																	<tr>
									                                    <td width="110" nowrap class="table_search_head_r"><bean:message key="City_Country"/></td>
									                                    <td align="right" nowrap class="table_search_body">
									                                        <input name="cnee_trdp_city" value='<bean:write name="blVO" property="cnee_trdp_city"/>' maxlength="30" type="text" class="search_form" style="width:64;" >
									                                        <input name="cnee_trdp_cnt" value='<bean:write name="blVO" property="cnee_trdp_cnt"/>' maxlength="30" type="text" class="search_form" style="width:34;" >
									                                    </td>
									                                </tr>
									                            </table>
									                            <table width="100%" border="0" cellpadding="0" cellspacing="0">
																	<tr>
									                                    <td width="110" nowrap class="table_search_head"><bean:message key="Zip"/></td>
									                                    <td align="right" nowrap class="table_search_body">
									                                        <input name="cnee_trdp_zip" value='<bean:write name="blVO" property="cnee_trdp_zip"/>' maxlength="10" onKeyPress="ComKeyOnlyNumber(this)" type="text" class="search_form" style="width:65;" >
									                                    </td>
									                                </tr>
									                            </table>      
																<table width="100%" border="0" cellpadding="0" cellspacing="0">
																	<tr>
									                                    <td width="110" nowrap class="table_search_head"><bean:message key="Tel_Fax"/></td>
									                                    <td align="right" nowrap class="table_search_body">
									                                        <input name="cnee_trdp_phn" value='<bean:write name="blVO" property="cnee_trdp_phn"/>' maxlength="30" type="text" class="search_form" onkeyDown="onlyNumberCheck();" style="width:98;" >
									                                        <input name="cnee_trdp_fax" value='<bean:write name="blVO" property="cnee_trdp_fax"/>' maxlength="30" type="text" class="search_form" onkeyDown="onlyNumberCheck();" style="width:98;">
									                                    </td>
									                                </tr>
									                            </table>    
															</td>
													<!-- Customer END-->		
															
														</tr>
														<tr>
															<td colspan="4" height="10"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
														</tr>
														<tr>
															<td width="550" colspan="3" align="right">
																<table border="0" cellspacing="0" cellpadding="0">
												                    <tr>
												                        <td onClick="doWork('ADD')" style="cursor:hand">
												                            <table height="21" border="0" cellpadding="0" cellspacing="0" style="margin-left:5px;cursor:hand">
												                                <tr>
												                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
												                                    <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Add"/></td>
												                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif" style="cursor:hand" onclick="doWork('ADD')"></td>
												                                </tr>
												                            </table>        
												                        </td>
												                    </tr>
												                </table>
												            </td>
												            <td width="8" align="left" valign="top"><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="8"></td>
														</tr>
														<tr>
															<td colspan="4" height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
														</tr>
														<tr>
															<td colspan="3" align="left">
												                <table border="0" width="550" id="mainTable" cellpadding="0" cellspacing="0">
												                    <tr>
												                        <td>
												                            <script language="javascript">comSheetObject('sheet1');</script>
												                        </td>
												                    </tr>
												                </table>
												            </td>
												            <td width="8" align="left" valign="top"><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="8"></td>
														</tr>
													</table> 
												</td>
											</tr>
										   <tr>
												<td colspan="3" height="19px"></td>
											</tr>
										</table>
									</td>
								</tr>
							</table>
		</div>
		<div id="tabLayer" style="display:none">
                            <table width="100%" border="0" bordercolor="blue" cellspacing="0" cellpadding="0">                          
                                <!-- Message -->
                                <tr>
                                    <td height="10px" colspan="3"></td>
                                </tr>
                                <tr>
                                    <td width="40%" align="left" valign="top">
                                        <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td align="left">
                                                    <table height="18px" border="0" cellpadding="0" cellspacing="0">
                                                        <tr>
                                                            <td nowrap class="sub_title"><img src="<%=CLT_PATH%>/web/img/main/sub_title_arrow.gif" width="7" height="7" hspace="1"><bean:message key="Send_Message"/></td>
                                                        </tr>
                                                        <tr>
									                        <td height="2"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
									                    </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td valign="top" align="center"> 
                                                    <table border="0" width="100%" id="mainTable" cellpadding="0" cellspacing="0">
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
                                    <td width="8" align="left" valign="top"><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="8"></td>
                                    <td width="56%" align="left" valign="top">
                                        <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td align="left">
                                                    <table height="18px" border="0" cellpadding="0" cellspacing="0">
                                                        <tr>
                                                            <td nowrap class="sub_title"><img src="<%=CLT_PATH%>/web/img/main/sub_title_arrow.gif" width="7" height="7" hspace="1"><bean:message key="Technical_Message"/></td>
                                                        </tr>
                                                        <tr>
									                        <td height="2"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
									                    </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td valign="top" align="center"> 
                                                    <table border="0" width="100%" id="mainTable" cellpadding="0" cellspacing="0">
                                                        <tr>
                                                            <td>
                                                                <script language="javascript">comSheetObject('sheet3');</script>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
								</tr>
								<tr>
                                    <td height="20px" colspan="3"></td>
                                </tr>
                                <tr>
                                    <td align="left" valign="top" colspan="3">
                                        <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td width="160" align="left">
                                                    <table width="160" height="18px" border="0" cellpadding="0" cellspacing="0">
                                                        <tr>
                                                            <td nowrap class="sub_title"><img src="<%=CLT_PATH%>/web/img/main/sub_title_arrow.gif" width="7" height="7" hspace="1"><bean:message key="Status_Message"/></td>
                                                        </tr>
                                                        <tr>
									                        <td height="2"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
									                    </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td valign="top" align="center" colspan="3"> 
                                                    <table border="0" width="100%" id="mainTable" cellpadding="0" cellspacing="0">
                                                        <tr>
                                                            <td>
                                                                <script language="javascript">comSheetObject('sheet4');</script>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td valign="top" align="center" colspan="3"> 
                                                    <table border="0" width="100%" id="mainTable" cellpadding="0" cellspacing="0">
                                                        <tr>
                                                            <td>
                                                                <script language="javascript">comSheetObject('sheet5');</script>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td valign="top" align="center" colspan="3"> 
                                                    <table border="0" width="100%" id="mainTable" cellpadding="0" cellspacing="0">
                                                        <tr>
                                                            <td>
                                                                <script language="javascript">comSheetObject('sheet6');</script>
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