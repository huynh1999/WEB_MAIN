<%--
=========================================================
*Copyright(c) 2009 CyberLogitec. All Rights Reserved.
=========================================================
=========================================================
*@FileName   : EDI_DBS_0010.jsp
*@FileTitle  : DE Customs EDI (Ocean)
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
    <script language="javascript" src="<%=CLT_PATH%>/apps/fis/edi/debl/see/script/EDI_DBS_0010.js?ver=<%=CLT_JS_VER%>"></script>
	
	<script>	
		var EDI_TPCD1 = '';
	    var EDI_TPCD2 = '';
	    <% boolean isBegin = false; %>
	    <!--Role 코드조회-->
	    <bean:define id="tpszList"  name="valMap" property="cntrTpszList"/>
	    <logic:iterate id="codeVO" name="tpszList">
	        <% if(isBegin){ %>
	        	EDI_TPCD1+= '|';
	            EDI_TPCD2+= '|';
	        <% }else{
	              isBegin = true;
	           } %>
	           EDI_TPCD1+= '<bean:write name="codeVO" property="cntr_tpsz_cd"/>';
	           EDI_TPCD2+= '<bean:write name="codeVO" property="cntr_tpsz_cd"/>';
	    </logic:iterate>
		
		<!-- ###Package 코드## -->
		var EDI_PCKCD1 = '';
		var EDI_PCKCD2 = '';
		<% isBegin = false; %>
	    <bean:define id="pckList" name="valMap" property="pckCdList"/>
		<logic:iterate id="pckVO" name="pckList">
			<% if(isBegin){ %>
				EDI_PCKCD1+= '|';
				EDI_PCKCD2+= '|';
			<% }else{
				  isBegin = true;
			   } %>
			   EDI_PCKCD1+= '<bean:write name="pckVO" property="pck_nm"/>';
			   EDI_PCKCD2+= '<bean:write name="pckVO" property="pck_ut_cd"/>';
		</logic:iterate>
   </script>
</head>
<body class="td" onload="loadPage();">
<form name="frm1" method="POST" action="./EDI_DBS_0010.clt">
    <input type="hidden" name="f_cmd">
    <input type="hidden" name="trns_tp_val" value="<bean:write name="blVO" property="trns_tp"/>">
     <input type="hidden" name="f_msg_tp_val" value="<bean:write name="valMap" property="f_msg_tp_tp"/>">
    <input type="hidden" name="intg_bl_seq" value="<bean:write name="blVO" property="intg_bl_seq"/>">
    <input type="hidden" name="msg_no" value="<bean:write name="blVO" property="msg_no"/>">
    <input type="hidden" name="rep_cmdt_nm" value="<bean:write name="blVO" property="rep_cmdt_nm"/>">
    <input type="hidden" name="refno_dp_flg" value="">
    <input type="hidden" name="cgo_tp_val" value="<bean:write name="blVO" property="cgo_tp"/>">
	
<!--    <html:hidden name="blVO"  property="intg_bl_seq"/>-->
    
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
                        <td onClick="BLSEARCHLIST()" style="cursor:hand">
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
                <table width="100%" border="0" cellpadding="0" cellspacing="0">
                    <tr>
                    	<td width="60" nowrap class="table_search_body"><input type="radio" name="f_msg_tp" id="f_msg_tp1" value="M" checked><label for="f_msg_tp1"><bean:message key="Master"/></label></td>
                        <td width="60" nowrap class="table_search_body"><input type="radio" name="f_msg_tp" id="f_msg_tp2" value="H"><label for="f_msg_tp2"><bean:message key="House"/></label></td>
                        <td width="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                        <td width="70" nowrap class="table_search_head"><bean:message key="BL_No"/></td>
                        <td width="150" class="table_search_body">
                            <input name="f_bl_no"  maxlength="40" value="<bean:write name="valMap" property="f_bl_no"/>" type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:120;text-transform:uppercase;" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){openPopUpEdi('BL_POPLIST',this)}">
                            <img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" onClick="openPopUpEdi('BL_POPLIST',this)" style="cursor:hand" align="absmiddle">
                        </td>
                        <td width="10"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                        <td width="90" nowrap class="table_search_head"><bean:message key="Ref_No"/></td>
                        <td width="150" class="table_search_body">
                            <input name="f_ref_no"  maxlength="20" value="<bean:write name="valMap" property="f_ref_no"/>" type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:120;text-transform:uppercase;" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){openPopUpEdi('REF_POPLIST',this)}">
                            <img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" style="cursor:hand" align="absmiddle" onClick="openPopUpEdi('REF_POPLIST',this)" style="cursor:hand" align="absmiddle">
                        </td>
                        <td width="250" >&nbsp;</td>
                        <td align="left"><input type="text" name="status" value=" * Status : " style="width:80;border:0;background-color:transparent;" readOnly tabindex="1"><input type="text" name="msg_sts" value="<bean:write name="blVO" property="msg_sts"/>" style="width:100;border:0;background-color:transparent;" readOnly tabindex="1"></td>
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
<!--			<td height="22" align="left" background="<%=CLT_PATH%>/web/img/main/tab_table_top.gif">-->
			<td height="22" align="left">
				<table height="22" border="0" cellpadding="0" cellspacing="0">
					<tr>
						<td class="tab_head-l"     id=Tab01 style="cursor:hand;" onClick="javascript:goTabSelect('01');"><span><bean:message key="BL_Info"/></span></td>
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
													<!-- BL Info  START-->
															<td align="left" valign="top" width="280">
																<table width="100%" border="0" cellpadding="0" cellspacing="0">
																	<tr>
																		<td width="40" nowrap class="table_search_head">Type
																		<td width="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
																		<td width="60" nowrap class="table_search_body"><input type="radio" name="trns_tp" id="msg_tp1" value="AES" onClick="javascript:changeTransTpVal();" checked><label for="msg_tp1"><bean:message key="AES"/></label></td>
	                        											<td width="60" nowrap class="table_search_body"><input type="radio" name="trns_tp" id="msg_tp2" value="SAC" onClick="javascript:changeTransTpVal();"><label for="msg_tp2"><bean:message key="SAC"/></label></td>
																	    <td width="60" nowrap class="table_search_body"><input type="radio" name="trns_tp" id="msg_tp3" value="SBF" onClick="javascript:changeTransTpVal();"><label for="msg_tp3"><bean:message key="SBF"/></label></td>
																	</tr>
																</table>
																<div id="cargoLayer" style="display:none">
																<table width="100%" border="0" cellpadding="0" cellspacing="0">
																	<tr>
																		<td width="100" nowrap class="table_search_head"><bean:message key="Cargo_Type"/>
																		<td width="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
																		<td width="60" nowrap class="table_search_body"><input type="radio" name="cgo_tp" id="cgo_tp1" value="F" onClick="javascript:changeCgoTpVal();"checked><label for="cgo_tp1"><bean:message key="FCL"/></label></td>
	                        											<td width="60" nowrap class="table_search_body"><input type="radio" name="cgo_tp" id="cgo_tp2" value="L" onClick="javascript:changeCgoTpVal();"><label for="cgo_tp2"><bean:message key="LCL"/></label></td>
																	</tr>
																</table>
																</div>
																<table width="100%" border="0" cellspacing="0" cellpadding="0">
																	<tr>
																		<td height="10"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
																	</tr>
																</table>
<!--																<table width="100%" border="0" cellpadding="0" cellspacing="0">-->
<!--																	<tr>-->
<!--																		<td nowrap class="sub_title" width="120"><img src="<%=CLT_PATH%>/web/img/main/sub_title_arrow.gif" width="7" height="7" hspace="1"><bean:message key="MAWB_Info"/></td>-->
<!--																		<td class="sub_title2"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>-->
<!--																	</tr>-->
<!--																</table>-->
																<table width="100%" border="0" cellpadding="0" cellspacing="0">
																	<tr>
																		<td width="110" nowrap class="table_search_head_r"><bean:message key="Ref_No"/></td>
												                        <td width="180" class="table_search_body">
												                            <input name="ref_no" maxlength="20" value="<bean:write name="blVO" property="ref_no"/>" type="text" class="search_form" dataformat="excepthan" style="width:130;" style="ime-mode:disabled;width:130;text-transform:uppercase;" onblur="strToUpper(this)">
												                        </td>
												                    </tr>    
																	<tr>
																		<td width="110" nowrap class="table_search_head"><bean:message key="MBL_No"/></td>
                        												<td width="180" class="table_search_body">
                            											<input name="mbl_no"  maxlength="40"  value="<bean:write name="blVO" property="mbl_no"/>" type="text" class="search_form-disable" readOnly dataformat="excepthan" style="ime-mode:disabled;width:150;text-transform:uppercase;" onblur="strToUpper(this)">
                        												</td>
																	</tr>
																	<tr>
																		<td width="110" nowrap class="table_search_head"><bean:message key="HBL_No"/></td>
                        												<td width="180" class="table_search_body">
                            											<input name="hbl_no"  maxlength="40"  value="<bean:write name="blVO" property="hbl_no"/>" type="text" class="search_form-disable" readOnly dataformat="excepthan" style="ime-mode:disabled;width:150;text-transform:uppercase;" onblur="strToUpper(this)">
                        												</td>
																	</tr>
																	<tr>
																		<td width="110" nowrap class="table_search_head_r"><bean:message key="Liner_Bkg_No"/></td>
													                        <td width="180" class="table_search_body">
													                            <input name="lnr_bkg_no" maxlength="20" value="<bean:write name="blVO" property="lnr_bkg_no"/>" type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:130;text-transform:uppercase;" onblur="strToUpper(this)">
													                        </td>
												                    </tr>
												                    <tr>
						                                                <td width="110"  nowrap class="table_search_head"><bean:message key="ABT_No"/></td>
						                                                <td width="180" class="table_search_body">
						                                                    <input type="text" name="abt_no" value="<bean:write name="blVO" property="abt_no"/>"  class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:130;text-transform:uppercase;" onblur="strToUpper(this)">
						                                                </td>
						                                            </tr>  
												                    <tr>
						                                                <td width="110"  nowrap class="table_search_head"><bean:message key="MRN"/></td>
						                                                <td width="180" class="table_search_body">
						                                                    <input type="text" name="mrn" maxlength="20" value="<bean:write name="blVO" property="mrn"/>"  class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:150;text-transform:uppercase;" onblur="strToUpper(this)">
						                                                </td>
						                                            </tr>
						                                            <tr>
						                                                <td width="110"  nowrap class="table_search_head"><bean:message key="EXS_MRN_No"/></td>
						                                                <td width="180" class="table_search_body">
						                                                    <input type="text" name="exs_mrn_no" maxlength="20" value="<bean:write name="blVO" property="exs_mrn_no"/>"  class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:150;text-transform:uppercase;" onblur="strToUpper(this)">
						                                                </td>
						                                            </tr>   
																</table>
																<table width="100%" border="0" cellspacing="0" cellpadding="0">
																	<tr>
																		<td height="30"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
																	</tr>
																</table>
															</td>
													<!-- BL Info  END-->		
													
															<td width="8" align="left" valign="top"><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="8"></td>
															
													<!-- Vessel ~ Measure--> 
															<td align="left" valign="top" width="300">
																<table width="100%" border="0" cellpadding="0" cellspacing="0">
                                                                    <tr>
                                                                        <td width="120" nowrap class="table_search_head"><bean:message key="Vessel_Name"/></td>
                                                                        <td nowrap class="table_search_body" colspan="4">
                                                                            <input type="hidden" name="trnk_vsl_cd" value='<bean:write name="blVO" property="trnk_vsl_cd"/>' class="search_form" onKeyDown="codeNameAction('srVessel',this, 'onKeyDown')" onBlur="codeNameAction('srVessel',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled;width:40px;">
                                                                            <input type="text"   name="trnk_vsl_nm" value='<bean:write name="blVO" property="trnk_vsl_nm"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:110px;text-transform:uppercase;" maxlength="100" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){openPopUp('VESSEL_POPLIST', document.getElementById('trunkvessel'), frm1.trnk_vsl_nm.value);}">
                                                                            <img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" id="trunkvessel" onClick="openPopUp('VESSEL_POPLIST',this)" style="cursor:hand;" align="absmiddle">
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                                <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                                                    <tr>
                                                                        <td width="45" nowrap class="table_search_head_r"><bean:message key="POL"/></td>
                                                                        <td nowrap class="table_search_body">
                                                                            <input type="hidden" name="origin_pol_cd" value='' class="search_form" onKeyDown="codeNameActionEdi('Location_pol',this, 'onKeyDown')" onBlur="codeNameActionEdi('Location_pol',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50;">
                                                                            <input type="text" name="pol_nm" maxlength="50" value='<bean:write name="blVO" property="pol_nm"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:140;text-transform:uppercase;" onKeyUp="if(event.keyCode==13){openPopUpEdi('EDI_LOCATION_POPLIST', document.getElementById('pol'));}">
                                                                            <img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" id="pol" onClick="openPopUpEdi('EDI_LOCATION_POPLIST',this)" style="cursor:hand;" align="absmiddle">
<!--                                                                            <input type="text" name="pol_cd" value='<bean:write name="blVO" property="pol_cd"/>' class="search_form" onKeyUp="openPopUpEdi('EDI_LOCATION_POPLIST', document.getElementById('pol'));" dataformat="excepthan" style="ime-mode:disabled;width:50;text-transform:uppercase;"">-->
                                                                            <input type="text" name="pol_cd" maxlength="5" value='<bean:write name="blVO" property="pol_cd"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:50;text-transform:uppercase;"">
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                   		 <td width="45"></td>
                                                                        <td nowrap class="table_search_body">
																			<bean:define id="polTmlList" name="valMap" property="polTmlCdList"/>
					                                                        <html:select style="width:215px;" name="blVO" property="pol_tml_cd" styleClass="search_form">
					                                                        	<option value=""></option>
					                                                            <html:options collection="polTmlList" property="cd_val" labelProperty="cd_nm" style="width:125px;"/>
					                                                        </html:select>
																		</td>
                                                                    </tr>
                                                                </table>
                                                                <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                                                    <tr>
                                                                        <td width="45" nowrap class="table_search_head_r"><bean:message key="POD"/></td>
                                                                        <td nowrap class="table_search_body">
                                                                            <input type="hidden" name="origin_pod_cd" maxlength="5" value='' class="search_form" onKeyDown="codeNameActionEdi('Location_pod',this, 'onKeyDown')" onBlur="codeNameActionEdi('Location_pod',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50;">
                                                                            <input type="text" name="pod_nm" maxlength="50" value='<bean:write name="blVO" property="pod_nm"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:140;text-transform:uppercase;" onKeyUp="if(event.keyCode==13){openPopUpEdi('EDI_LOCATION_POPLIST', document.getElementById('pod'))};">
                                                                        	<img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" id="pod" onClick="openPopUpEdi('EDI_LOCATION_POPLIST',this)" style="cursor:hand;" align="absmiddle">
<!--                                                                            <input type="text" name="pod_cd" value='<bean:write name="blVO" property="pod_cd"/>' class="search_form" onKeyUp="openPopUpEdi('EDI_LOCATION_POPLIST', document.getElementById('pod'));" dataformat="excepthan" style="ime-mode:disabled;width:50;text-transform:uppercase;">-->
                                                                            <input type="text" name="pod_cd" maxlength="5" value='<bean:write name="blVO" property="pod_cd"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:50;text-transform:uppercase;">
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                                <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                                                    <tr>
                                                                        <td width="45" nowrap class="table_search_head_r"><bean:message key="ETD"/></td>
                                                                        <td nowrap class="table_search_body">
                                                                            <input name="etd_dt_tm" value='<wrt:write name="blVO" property="etd_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:70px;" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1)" size='11' maxlength="10" class="search_form">
                                                                            <img id="etd_dt_tm_cal" onclick="doDisplay('DATE1',frm1.etd_dt_tm);" src="<%=CLT_PATH%>/web/img/button/btns_calendar.gif" width="19" height="21" border="0" align="middle" style="cursor:hand;">
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                                <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                                                    <tr>
                                                                        <td width="45" nowrap class="table_search_head_r"><bean:message key="ETA"/></td>
                                                                        <td nowrap class="table_search_body">
                                                                            <input name="eta_dt_tm" value='<wrt:write name="blVO" property="eta_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:70px;" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1)" size='11' maxlength="10" class="search_form">
                                                                            <img id="eta_dt_tm_cal" onclick="doDisplay('DATE1',frm1.eta_dt_tm);" src="<%=CLT_PATH%>/web/img/button/btns_calendar.gif" width="19" height="21" border="0" align="middle" style="cursor:hand;">
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                                <table border="0" cellpadding="0" cellspacing="0">    
																	<tr>
																		<td width="70" nowrap class="table_search_head"><bean:message key="Package"/></td>
																		<td nowrap class="table_search_body">
																			<input type="text" name="pck_qty" value="<wrt:write name="blVO" property="pck_qty" formatType="MONEY" format="#,###"/>" onkeyPress="onlyNumberCheck();" onkeyup="numberCommaLen(this,7,0)" maxlength="13"  class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:85;text-align:right"> 
																			<bean:define id="pckList" name="valMap" property="pckCdList"/>
																			<html:select name="blVO" property="pck_ut_cd" styleClass="search_form" style="width:120px;">
																				<option></option>
																				<html:options collection="pckList" property="pck_ut_cd" labelProperty="pck_nm"/>
																			</html:select> 
																		</td>
																	</tr>
																</table>
																<table width="100%" border="0" cellpadding="0" cellspacing="0">
																	<tr>
																		<td width="70" nowrap class="table_search_head"><bean:message key="Weight"/></td>
																		<td nowrap class="table_search_body">
																			<input type="text" name="grs_wgt" value="<wrt:write name="blVO" property="grs_wgt" formatType="MONEY" format="#,##0.00"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,8,2);chkComma(this,8,2);" maxlength="13" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:60;text-align:right;">
																			<input type="text" name="grs_wgt_ut_cd" value="K" style="width:23;border:0;background-color:transparent;" readOnly tabindex="1">
																		</td>
																	</tr>
																</table>
																<table width="100%" border="0" cellpadding="0" cellspacing="0">
																	<tr>
																		<td width="70" nowrap class="table_search_head"><bean:message key="Measure"/></td>
																		<td nowrap class="table_search_body">
																			<input type="text" name="meas" value="<wrt:write name="blVO" property="meas" formatType="MONEY" format="#,##0.000"/>" onkeyPress="onlyNumberCheck('.');" onchange="numberCommaLen(this,8,3);chkComma(this,8,3);" maxlength="13" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:60;text-align:right;">
																			<input type="text" name="meas_ut_cd" value="CBM" style="width:30;border:0;background-color:transparent;" readOnly tabindex="5">
																		</td>
																	</tr>
																</table>
																
																 <table width="100%" border="0" cellspacing="0" cellpadding="0">
																	<tr>
																		<td height="17"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
																	</tr>
																</table>
																<!-- Declarant :  -->  
									                            <div id="declLayer" style="display:none">
									                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
																	<tr>
																		<td width="100%" nowrap class="dotline"></td>
																	</tr>
																</table>
																<table width="100%" border="0" cellspacing="0" cellpadding="0">
																	<tr>
																		<td height="2"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
																	</tr>
																</table>
																<table width="100%" border="0" cellpadding="0" cellspacing="0">
																	<tr>
																		<td width="70" nowrap class="table_search_head_r"><bean:message key="Declarant"/></td>
																		<td nowrap class="table_search_body">
																			<input type="hidden" name="decl_trdp_cd" value='<bean:write name="blVO" property="decl_trdp_cd"/>'  class="search_form" onKeyUp="openPopUpEdi('EDI_LINER_POPLIST', document.getElementById('declarant'));">
																			<input type="text"   name="decl_trdp_nm" value='<bean:write name="blVO" property="decl_trdp_nm"/>'  onblur="strToUpper(this)"  class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:125;text-transform:uppercase;" maxlength="50" onKeyPress="if(event.keyCode==13){openPopUpEdi('EDI_LINER_POPLIST', document.getElementById('declarant'));}">
                                                                            <input type="hidden" name="decl_trdp_cnt" value='<bean:write name="blVO" property="decl_trdp_cnt"/>'  class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:48;">
																			<img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" id="declarant"   onClick="openPopUpEdi('EDI_LINER_POPLIST',this)" style="cursor:hand" align="absmiddle">
<!--																			<input type="text" name="carr_trdp_edi_cd" value='<bean:write name="blVO" property="carr_trdp_edi_cd"/>'  class="search_form" onKeyUp="openPopUpEdi('EDI_LINER_POPLIST', document.getElementById('carrier'));" dataformat="excepthan" style="ime-mode:disabled;width:48;">-->
																		</td>
																	</tr>
																</table>
																<table width="100%" border="0" cellpadding="0" cellspacing="0">
																	<tr>
																		<td width="70" nowrap class="table_search_head_r"><bean:message key="Address"/></td>
																		<td align="right" nowrap class="table_search_body">
																			<textarea name="decl_trdp_addr" class="search_form" rows="5" cols="35" maxlength="35" style="width:200;height:40px;" onblur="strToUpper(this);chkCmpAddr(this, 'Shipper Address')" WRAP="off"><bean:write name="blVO" property="decl_trdp_addr" filter="false"/></textarea>
																		</td>
																	</tr>
																</table>
																<table width="100%" border="0" cellpadding="0" cellspacing="0">
																	<tr>
									                                    <td width="70" nowrap class="table_search_head_r"><bean:message key="PIC_eMail"/></td>
									                                    <td align="right" nowrap class="table_search_body">
									                                        <input name="decl_trdp_pic" value='<bean:write name="blVO" property="decl_trdp_pic"/>' maxlength="30" type="text" class="search_form" style="width:98;" >
									                                        <input name="decl_trdp_email" value='<bean:write name="blVO" property="decl_trdp_email"/>' maxlength="30" type="text" class="search_form" style="width:98;">
									                                    </td>
									                                </tr>
									                            </table>  
									                            <table width="100%" border="0" cellpadding="0" cellspacing="0">
																	<tr>
									                                    <td width="70" nowrap class="table_search_head_r"><bean:message key="Tel_Fax"/></td>
									                                    <td align="right" nowrap class="table_search_body">
									                                        <input name="decl_trdp_phn" value='<bean:write name="blVO" property="decl_trdp_phn"/>' maxlength="30" type="text" class="search_form" onkeyDown="onlyNumberCheck();" style="width:98;" >
									                                        <input name="decl_trdp_fax" value='<bean:write name="blVO" property="decl_trdp_fax"/>' maxlength="30" type="text" class="search_form" onkeyDown="onlyNumberCheck();" style="width:98;">
									                                    </td>
									                                </tr>
									                            </table>   
									                            </div> 
															</td>
													<!-- Vessel ~ Measure-->		
															
															<td width="8" align="left" valign="top"><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="8"></td>
															
													<!-- Customer START--> 		
															<td align="left" valign="top" width="320">
									                            <!-- Booking Agent : M - Consignee , H - Partner--> 	
																<table width="100%" border="0" cellpadding="0" cellspacing="0">
																	<tr>
																		<td width="110" nowrap class="table_search_head_r"><bean:message key="Booking_Agent"/></td>
																		<td nowrap class="table_search_body">
																			<input type="hidden" name="agent_trdp_cd" value='<bean:write name="blVO" property="agent_trdp_cd"/>'  class="search_form" onKeyUp="openPopUpEdi('EDI_LINER_POPLIST', document.getElementById('agent'));" dataformat="excepthan" style="ime-mode:disabled;width:48;">
																			<input type="text"   name="agent_trdp_nm" value='<bean:write name="blVO" property="agent_trdp_nm"/>'  onblur="strToUpper(this)"  class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:125;text-transform:uppercase;" maxlength="50" onKeyPress="if(event.keyCode==13){openPopUpEdi('EDI_LINER_POPLIST', document.getElementById('agent'));}">
                                                                            <input type="hidden" name="agent_trdp_cnt" value='<bean:write name="blVO" property="agent_trdp_cnt"/>'  class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:48;">
																			<img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" id="agent"   onClick="openPopUpEdi('EDI_LINER_POPLIST',this)" style="cursor:hand" align="absmiddle">
<!--																		    <input type="text" name="agent_trdp_edi_cd" value='<bean:write name="blVO" property="agent_trdp_edi_cd"/>'  class="search_form" onKeyUp="openPopUpEdi('EDI_LINER_POPLIST', document.getElementById('agent'));" dataformat="excepthan" style="ime-mode:disabled;width:48;">-->
<!--																		    <input type="text" name="agent_trdp_edi_cd" value='<bean:write name="blVO" property="agent_trdp_edi_cd"/>'  readOnly class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:48;">-->
																		</td>
																	</tr>
																</table>
																<table width="100%" border="0" cellpadding="0" cellspacing="0">
																	<tr>
																		<td width="110" nowrap class="table_search_head_r"><bean:message key="Address"/></td>
																		<td align="right" nowrap class="table_search_body">
																			<textarea name="agent_trdp_addr" class="search_form" rows="5" cols="35" maxlength="35" style="width:200;height:40px;" onblur="strToUpper(this);chkCmpAddr(this, 'Agent Address')" WRAP="off"><bean:write name="blVO" property="agent_trdp_addr" filter="false"/></textarea>
																		</td>
																	</tr>
																</table>
																<table width="100%" border="0" cellpadding="0" cellspacing="0">
																	<tr>
									                                    <td width="110" nowrap class="table_search_head_r"><bean:message key="PIC_eMail"/></td>
									                                    <td align="right" nowrap class="table_search_body">
									                                        <input name="agent_trdp_pic" value='<bean:write name="blVO" property="agent_trdp_pic"/>' maxlength="30" type="text" class="search_form" style="width:98;" >
									                                        <input name="agent_trdp_email" value='<bean:write name="blVO" property="agent_trdp_email"/>' maxlength="30" type="text" class="search_form" style="width:98;">
									                                    </td>
									                                </tr>
									                            </table>  
																<table width="100%" border="0" cellpadding="0" cellspacing="0">
																	<tr>
									                                    <td width="110" nowrap class="table_search_head_r"><bean:message key="Tel_Fax"/></td>
									                                    <td align="right" nowrap class="table_search_body">
									                                        <input name="agent_trdp_phn" value='<bean:write name="blVO" property="agent_trdp_phn"/>' maxlength="30" type="text" class="search_form" onkeyDown="onlyNumberCheck();" style="width:98;" >
									                                        <input name="agent_trdp_fax" value='<bean:write name="blVO" property="agent_trdp_fax"/>' maxlength="30" type="text" class="search_form" onkeyDown="onlyNumberCheck();" style="width:98;">
									                                    </td>
									                                </tr>
									                            </table>  
									                            
									                             <table width="100%" border="0" cellspacing="0" cellpadding="0">
																	<tr>
																		<td height="2"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
																	</tr>
																</table>
																<table width="100%" border="0" cellspacing="0" cellpadding="0">
																	<tr>
																		<td width="100%" nowrap class="dotline"></td>
																	</tr>
																</table>
																<table width="100%" border="0" cellspacing="0" cellpadding="0">
																	<tr>
																		<td height="2"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
																	</tr>
																</table>
									                            
									                            <!-- Carrier : Liner -->  
																<table width="100%" border="0" cellpadding="0" cellspacing="0">
																	<tr>
																		<td width="110" nowrap class="table_search_head_r"><bean:message key="Carrier"/></td>
																		<td nowrap class="table_search_body">
																			<input type="hidden" name="carr_trdp_cd" value='<bean:write name="blVO" property="carr_trdp_cd"/>'  class="search_form" onKeyUp="openPopUpEdi('EDI_LINER_POPLIST', document.getElementById('carrier'));" dataformat="excepthan" style="ime-mode:disabled;width:48;">
																			<input type="text"   name="carr_trdp_nm" value='<bean:write name="blVO" property="carr_trdp_nm"/>'  onblur="strToUpper(this)"  class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:125;text-transform:uppercase;" maxlength="50" onKeyPress="if(event.keyCode==13){openPopUpEdi('EDI_LINER_POPLIST', document.getElementById('carrier'));}">
                                                                            <input type="hidden" name="carr_trdp_cnt" value='<bean:write name="blVO" property="carr_trdp_cnt"/>'  class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:48;">
																			<img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" id="carrier"   onClick="openPopUpEdi('EDI_LINER_POPLIST',this)" style="cursor:hand" align="absmiddle">
<!--																			<input type="text" name="carr_trdp_edi_cd" value='<bean:write name="blVO" property="carr_trdp_edi_cd"/>'  class="search_form" onKeyUp="openPopUpEdi('EDI_LINER_POPLIST', document.getElementById('carrier'));" dataformat="excepthan" style="ime-mode:disabled;width:48;">-->
																			<input type="text" name="carr_trdp_edi_cd" value='<bean:write name="blVO" property="carr_trdp_edi_cd"/>'  readOnly class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:48;">
																		</td>
																	</tr>
																</table>
																<table width="100%" border="0" cellpadding="0" cellspacing="0">
																	<tr>
																		<td width="110" nowrap class="table_search_head_r"><bean:message key="Address"/></td>
																		<td align="right" nowrap class="table_search_body">
																			<textarea name="carr_trdp_addr" class="search_form" rows="5" cols="35" maxlength="35" style="width:200;height:40px;" onblur="strToUpper(this);chkCmpAddr(this, 'Carrier Address')" WRAP="off"><bean:write name="blVO" property="carr_trdp_addr" filter="false"/></textarea>
																		</td>
																	</tr>
																</table>
																<table width="100%" border="0" cellpadding="0" cellspacing="0">
																	<tr>
									                                    <td width="110" nowrap class="table_search_head_r"><bean:message key="PIC_eMail"/></td>
									                                    <td align="right" nowrap class="table_search_body">
									                                        <input name="carr_trdp_pic" value='<bean:write name="blVO" property="carr_trdp_pic"/>' maxlength="30" type="text" class="search_form" style="width:98;" >
									                                        <input name="carr_trdp_email" value='<bean:write name="blVO" property="carr_trdp_email"/>' maxlength="30" type="text" class="search_form" style="width:98;">
									                                    </td>
									                                </tr>
									                            </table>  
									                            <table width="100%" border="0" cellpadding="0" cellspacing="0">
																	<tr>
									                                    <td width="110" nowrap class="table_search_head_r"><bean:message key="Tel_Fax"/></td>
									                                    <td align="right" nowrap class="table_search_body">
									                                        <input name="carr_trdp_phn" value='<bean:write name="blVO" property="carr_trdp_phn"/>' maxlength="30" type="text" class="search_form" onkeyDown="onlyNumberCheck();" style="width:98;" >
									                                        <input name="carr_trdp_fax" value='<bean:write name="blVO" property="carr_trdp_fax"/>' maxlength="30" type="text" class="search_form" onkeyDown="onlyNumberCheck();" style="width:98;">
									                                    </td>
									                                </tr>
									                            </table>  
									                            
									                             <table width="100%" border="0" cellspacing="0" cellpadding="0">
																	<tr>
																		<td height="2"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
																	</tr>
																</table>
									                            <!-- Shipper :  -->  
									                            <div id="shpLayer" style="display:none">
									                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
																	<tr>
																		<td width="100%" nowrap class="dotline"></td>
																	</tr>
																</table>
																<table width="100%" border="0" cellspacing="0" cellpadding="0">
																	<tr>
																		<td height="2"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
																	</tr>
																</table>
																<table width="100%" border="0" cellpadding="0" cellspacing="0">
																	<tr>
																		<td width="110" nowrap class="table_search_head_r"><bean:message key="Shipper"/></td>
																		<td nowrap class="table_search_body">
																			<input type="hidden" name="shp_trdp_cd" value='<bean:write name="blVO" property="shp_trdp_cd"/>'  class="search_form" onKeyUp="openPopUpEdi('EDI_LINER_POPLIST', document.getElementById('shipper'));" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:48;">
																			<input type="text"   name="shp_trdp_nm" value='<bean:write name="blVO" property="shp_trdp_nm"/>'  onblur="strToUpper(this)"  class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:125;text-transform:uppercase;" maxlength="50" onKeyPress="if(event.keyCode==13){openPopUpEdi('EDI_LINER_POPLIST', document.getElementById('shipper'));}">
                                                                            <input type="hidden" name="shp_trdp_cnt" value='<bean:write name="blVO" property="shp_trdp_cnt"/>'  class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:48;">
																			<img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" id="shipper"   onClick="openPopUpEdi('EDI_LINER_POPLIST',this)" style="cursor:hand" align="absmiddle">
<!--																			<input type="text" name="carr_trdp_edi_cd" value='<bean:write name="blVO" property="carr_trdp_edi_cd"/>'  class="search_form" onKeyUp="openPopUpEdi('EDI_LINER_POPLIST', document.getElementById('carrier'));" dataformat="excepthan" style="ime-mode:disabled;width:48;">-->
																		</td>
																	</tr>
																</table>
																<table width="100%" border="0" cellpadding="0" cellspacing="0">
																	<tr>
																		<td width="110" nowrap class="table_search_head_r"><bean:message key="Address"/></td>
																		<td align="right" nowrap class="table_search_body">
																			<textarea name="shp_trdp_addr" class="search_form" rows="5" cols="35" maxlength="35" style="width:200;height:40px;" onblur="strToUpper(this);chkCmpAddr(this, 'Shipper Address')" WRAP="off"><bean:write name="blVO" property="shp_trdp_addr" filter="false"/></textarea>
																		</td>
																	</tr>
																</table>
																<table width="100%" border="0" cellpadding="0" cellspacing="0">
																	<tr>
									                                    <td width="110" nowrap class="table_search_head_r"><bean:message key="PIC_eMail"/></td>
									                                    <td align="right" nowrap class="table_search_body">
									                                        <input name="shp_trdp_pic" value='<bean:write name="blVO" property="shp_trdp_pic"/>' maxlength="30" type="text" class="search_form" style="width:98;" >
									                                        <input name="shp_trdp_email" value='<bean:write name="blVO" property="shp_trdp_email"/>' maxlength="30" type="text" class="search_form" style="width:98;">
									                                    </td>
									                                </tr>
									                            </table>  
									                            <table width="100%" border="0" cellpadding="0" cellspacing="0">
																	<tr>
									                                    <td width="110" nowrap class="table_search_head_r"><bean:message key="Tel_Fax"/></td>
									                                    <td align="right" nowrap class="table_search_body">
									                                        <input name="shp_trdp_phn" value='<bean:write name="blVO" property="shp_trdp_phn"/>' maxlength="30" type="text" class="search_form" onkeyDown="onlyNumberCheck();" style="width:98;" >
									                                        <input name="shp_trdp_fax" value='<bean:write name="blVO" property="shp_trdp_fax"/>' maxlength="30" type="text" class="search_form" onkeyDown="onlyNumberCheck();" style="width:98;">
									                                    </td>
									                                </tr>
									                            </table>   
									                            </div> 
															</td>
													<!-- Customer END-->		
															
														</tr>
														<tr>
															<td colspan="5" height="10"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
														</tr>
														<tr>
															<td colspan="3"  width="100%" align="left">
														    <div id="cntrLayer" style="display:none">
														    <table border="0" cellpadding="0" cellspacing="0">    
																	<tr>
																	    <td width="60" id="tdCntrNo" nowrap class="table_search_head_r"><bean:message key="Cntr_No"/></td>
																		<td nowrap class="table_search_body">
																			<input type="text" name="m_cntr_no" value="<bean:write name="blVO" property="m_cntr_no"/>" maxlength="20"  class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:120;text-align:left"> 
																		</td>
																		<td width="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
																		<td width="70" id="tdTpsz" nowrap class="table_search_head_r"><bean:message key="Type_Size"/></td>
																		<td nowrap class="table_search_body">
																			<bean:define id="tpszList" name="valMap" property="cntrTpszList"/>
																			<html:select name="blVO" property="m_cntr_tpsz_cd" styleClass="search_form" style="width:70px;">
																				<option></option>
																				<html:options collection="tpszList" property="cntr_tpsz_cd" labelProperty="cntr_tpsz_cd"/>
																			</html:select> 
																		</td>
																	</tr>
																</table>
																</div>
																</td>
																<td width="100%" colspan="2" align="right">
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
												                        <td onClick="doWork('ZBNUMBER')" style="cursor:hand">
												                           <div id="btnLayer" style="display:none">
												                            <table height="21" border="0" cellpadding="0" cellspacing="0" style="margin-left:5px;cursor:hand">
												                                <tr>
												                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
												                                    <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="ZB_Number"/></td>
												                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif" style="cursor:hand" onclick="doWork('ZBNUMBER')"></td>
												                                </tr>
												                            </table>      
												                            </div>   
												                        </td>
												                        <td onClick="setHblSizeUp()" style="cursor:hand" >
																			<table height="21" border="0" cellpadding="0" cellspacing="0" style="margin-left:5px;cursor:hand">
																				<tr>
																					<td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
																					<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Plus"/></td>
																					<td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
																				</tr>
																			</table>		
																		</td>
												                        <td onClick="setHblSizeDown()" style="cursor:hand">
																			<table height="21" border="0" cellpadding="0" cellspacing="0" style="margin-left:5px;cursor:hand">
																				<tr>
																					<td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
																					<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Minus"/></td>
																					<td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
																				</tr>
																			</table>		
																		</td>
												                    </tr>
												                </table>
												            </td>
												            <td width="8" align="left" valign="top"><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="8"></td>
														</tr>
														<tr>
															<td colspan="5" height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
														</tr>
														<tr>
															<td colspan="5" align="left">
												                <table border="0" width="100%" id="mainTable" cellpadding="0" cellspacing="0">
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
                                    <td width="60%" align="left" valign="top">
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
                                    <td width="40%" align="left" valign="top">
                                        <table width="100%" border="0" cellpadding="0" cellspacing="0">
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