<%--
=========================================================
*Copyright(c) 2009 CyberLogitec. All Rights Reserved.
=========================================================
=========================================================
*@FileName   : SEE_BMD_0020.jsp
*@FileTitle  : HGBL등록
*@Description: HBL 등록 및 조회
*@author     : Kang,Jung-Gu
*@version    : 1.0 - 09/28/2009
*@since      :

*@Change history:
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.HashMap"%>
    <%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
    <bean:define id="hblVO"   name="EventResponse" property="objVal"/>
    <bean:define id="valMap"  name="EventResponse" property="mapVal"/>
    <link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SEA_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/COM_FRT_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/shippingreq/script/SEE_BMD_0030.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_CODE_UTIL.js?ver=<%=CLT_JS_VER%>"></script>

	<script>
		function btnLoad(){
			if(frm1.bl_sts_cd.value=='NA'){
				getObj('hblCallObj').style.display = 'block';
		
				frm1.mrn.className = 'search_form';
				frm1.mrn.readOnly  = false;
				
				frm1.lnr_bkg_no.className = 'search_form';
				frm1.lnr_bkg_no.readOnly  = false;
		
                <logic:notEmpty name="hblVO" property="pol_cd">
					<logic:empty name="valMap" property="f_sr_no">
						getBtnObj('btnAdd').style.display    = 'block';
					</logic:empty>
                </logic:notEmpty>		
		
			}else if(frm1.bl_sts_cd.value=='SR'){
                frm1.sr_no.className = 'search_form-disable';
				frm1.sr_no.readOnly  = true;
				
		        frm1.mrn.className = 'search_form';
                frm1.mrn.readOnly  = false;
                
                frm1.lnr_bkg_no.className = 'search_form';
                frm1.lnr_bkg_no.readOnly  = false;
		
                getBtnObj('btnAdd').style.display    = 'none';

                getObj('mblKeyObj').style.display = 'block';
                getObj('hblCallObj').style.display = 'block';
		
                getObj('rwblObj').style.display = 'block';
                getBtnObj('mfObj').style.display = 'block';
                getBtnObj('btnPrint').style.display = 'block';
                getBtnObj('btnModify').style.display = 'block';
                getBtnObj('btnDelete').style.display  = 'block';
                getObj('mkMblObj').style.display  = 'block';
		
                getObj('emlSnd').style.display  = 'block';
                getObj('fileUp').style.display  = 'block';
		
			}else if(frm1.bl_sts_cd.value=='MC'){
                frm1.mrn.className = 'search_form-disable';
                frm1.mrn.readOnly  = true;
				
                frm1.lnr_bkg_no.className = 'search_form-disable';
                frm1.lnr_bkg_no.readOnly  = true;
        
				frm1.mrn.className = 'search_form';
                frm1.mrn.readOnly  = false;
		
                frm1.bl_no.className = 'search_form';
                frm1.bl_no.readOnly  = false;
		
                getObj('rwblObj').style.display = 'block';
                getBtnObj('mfObj').style.display = 'block';
                getBtnObj('btnPrint').style.display = 'block';
                getBtnObj('btnModify').style.display  = 'block';
                getObj('mblKeyObj').style.display = 'none';
                getObj('hblCallObj').style.display= 'none';
                getBtnObj('btnDelete').style.display  = 'block';
                getObj('mkMblObj').style.display= 'none';
		
                getObj('emlSnd').style.display  = 'block';
                getObj('fileUp').style.display  = 'block';		
			}
		}
		
		var shpAddr = '<bean:write name="hblVO" property="shpr_trdp_nm"/> O/B OF';
   </script>
</head>
<body class="td" onload="loadPage();btnLoad();doHideProcess();doWork('SEARCHLIST01');doDispHBL_List('<bean:write name="hblVO"  property="dir_intg_bl_seq"/>');">
<form name="frm1" method="POST" action="./SEE_BMD_0030.clt">
	<input type="hidden" name="f_cmd">
	<html:hidden name="hblVO"  property="bl_sts_cd"/>	
    <html:hidden name="hblVO"  property="intg_bl_seq"/>
	<html:hidden name="valMap" property="f_intg_bl_seq"/>
	<input type="hidden" name="mk_bl_no" value="<bean:write name="hblVO" property="bl_no"/>">
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
                        <td>
                            <table id="hblCallObj" height="21" border="0" cellpadding="0" cellspacing="0" onClick="doWork('HBLADD')" style="display:none;margin-left:5px;cursor:hand">
                                <tr>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
                                    <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="HBL_ADD"/></td>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
                                </tr>
                            </table>    
                        </td>
                        <td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" id="newImage" width="4"></td>
						<td onClick="doWork('SEARCHLIST')" style="cursor:hand">
							<table height="21" border="0" cellpadding="0" cellspacing="0">
								<tr>
									<td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
									<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Search"/></td>
									<td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
								</tr>
							</table>		
						</td>
						<td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" id="newImage" width="4"></td>
						<td onClick="clearScreen();" style="cursor:hand">
							<table height="21" border="0" cellpadding="0" cellspacing="0">
								<tr>
									<td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
									<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="New"/></td>
									<td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
								</tr>
							</table>
						</td>
                        <td>
                            <table id="btnPrint" height="21" border="0" cellpadding="0" cellspacing="0" onClick="doWork('PRINT');" style="display:none;margin-left:5px;cursor:hand">
                                <tr>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
                                    <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Print"/></td>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
                                </tr>
                            </table>
                        </td>
                        <td>
                            <table id="mfObj" height="21" border="0" cellpadding="0" cellspacing="0" onClick="doWork('MFPRINT')" style="margin-left:5px;cursor:hand">
                                <tr>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
                                    <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="M_F"/></td>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
                                </tr>
                            </table>    
                        </td>
                        <td>
                            <table id="rwblObj" height="21" border="0" cellpadding="0" cellspacing="0" onClick="doWork('RWBLPRINT');" style="margin-left:5px;cursor:hand">
                                <tr>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
                                    <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="RWBL"/></td>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
                                </tr>
                            </table>
                        </td>
                        <td>
                            <table id="btnAdd" height="21" border="0" cellpadding="0" cellspacing="0" onClick="doWork('ADD')" style="display:none;margin-left:5px;cursor:hand">
                                <tr>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
                                    <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Save"/></td>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
                                </tr>
                            </table>    
                        </td>
                        <td>
                            <table id="btnModify" height="21" border="0" cellpadding="0" cellspacing="0" onClick="doWork('MODIFY')" style="display:none;margin-left:5px;cursor:hand">
                                <tr>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
                                    <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Save"/></td>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
                                </tr>
                            </table>    
                        </td>
                        <td>
                            <table id="btnDelete" height="21" border="0" cellpadding="0" cellspacing="0" onClick="doWork('REMOVE')" style="display:none;margin-left:5px;cursor:hand">
                                <tr>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
                                    <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Delete"/></td>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
                                </tr>
                            </table>    
                        </td>
                        <td>
                            <table id="mkMblObj" height="21" border="0" cellpadding="0" cellspacing="0" onClick="doWork('MKMBL')" style="display:none;margin-left:5px;cursor:hand">
                                <tr>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
                                    <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="MBL_Creat"/></td>
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
				<table border="0" width="450" cellpadding="0" cellspacing="0">
					<tr>
						<td width="60" nowrap class="table_search_head"><bean:message key="SR_No"/></td>
						<td width="160" class="table_search_body">
							<input type="text" name="f_sr_no" maxlength="15" value="<bean:write name="valMap" property="f_sr_no"/>" class="search_form" dataformat="excepthan" style="width:115;" style="ime-mode:disabled;width:115;text-transform:uppercase;" onblur="strToUpper(this)">
							<img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" onClick="srOpenPopUp('SR_POPLIST',this)" style="cursor:hand" align="absmiddle">
						</td>
						<td width="10"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
						<td width="70" nowrap class="table_search_head"><bean:message key="MBL_No"/></td>
						<td width="200" class="table_search_body">
							<input type="text" name="f_bl_no"  maxlength="40" value="<bean:write name="valMap" property="f_bl_no"/>" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:150;text-transform:uppercase;" onblur="strToUpper(this)">
							<img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" onClick="srOpenPopUp('MBL_POPLIST',this)" style="cursor:hand" align="absmiddle">
						</td>
						<td></td>
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
			<td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
		</tr>
		<tr>
			<td align="center">
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
    <table width="1200" border="0" cellspacing="0" cellpadding="0">
        <tr>
<!--            <td height="22" align="left" background="<%=CLT_PATH%>/web/img/main/tab_table_top.gif">-->
				<td height="22" align="left">
                <table height="22" border="0" cellpadding="0" cellspacing="0">
                    <tr>
                        <td class="tab_head-l"     id=Tab01 style="cursor:hand;" onClick="javascript:goTabSelect('01');"><span><bean:message key="Shipping_Request_Entry"/></span></td>
                        <td width="1"></td> 
                        <td class="tab_head_non-l" id=Tab02 style="cursor:hand;" onClick="javascript:goTabSelect('02');"><span><bean:message key="Mark_Desc"/></span></td>
                        <td width="1"></td> 
                        <td class="tab_head_non-l" id=Tab03 style="cursor:hand;" onClick="javascript:goTabSelect('03');"><span><bean:message key="Shipping_Document"/></span></td>
                        <td width="1"></td> 
                        <td class="tab_head_non-l" id=Tab04 style="cursor:hand;" onClick="javascript:goTabSelect('04');"><span><bean:message key="Container"/></span></td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
<!--            <td align="center" valign="top" background="<%=CLT_PATH%>/web/img/main/tab_table_bg.gif">-->
				<td align="center" valign="top" class="table_search_bg">
                <table width="100%" border="0" cellspacing="10" cellpadding="0">
                    <tr>
                        <td valign="top">
				<div id="tabLayer" style="display:inline"><!--Shipping Request Main-->
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td valign="top" align="left">
                                        <table width="900" border="0" cellspacing="0" cellpadding="0">
                                            <tr>
                                                <td width="70" nowrap class="table_search_head"><bean:message key="SR_No"/></td>
                                                <td width="100" class="table_search_body">
                                                    <input type="text" name="sr_no" value="<bean:write name="hblVO" property="sr_no"/>" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;width:115;" readonly>
                                                </td>
												<td></td>														
                                                <td width="10"></td>
                                                <td width="70" nowrap class="table_search_head_r"><bean:message key="MBL_No"/></td>
                                                <td class="table_search_body">
                                                    <input type="text"   name="bl_no" value='<bean:write name="hblVO" property="bl_no"/>' class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;width:150;text-transform:uppercase;" onblur="strToUpper(this)" readonly>
													<input type="hidden" name="mbl_chk" value="<bean:write name="hblVO" property="bl_no"/>">
                                                </td>
												<td align="left">
                                                    <table id="mblKeyObj" border="0" cellpadding="0" cellspacing="0" style="display:none;">
                                                        <tr>
                                                            <td class="table_search_body"><input type="checkbox" name="doKeyIn" id="doKeyIn"   onclick="doKeyInCheck(this);" border="0"><label for="doKeyIn"><bean:message key="Writable"/></label></td>
                                                        </tr>
                                                    </table>
                                                </td>               
                                                <td width="10"></td>
                                                <td width="50"  nowrap class="table_search_head"><bean:message key="MRN"/></td>
                                                <td width="120" class="table_search_body">
                                                    <input type="text" name="mrn"    value="<bean:write name="hblVO" property="mrn"/>" class="search_form-disable" maxlength="20" dataformat="excepthan" style="ime-mode:disabled;width:115;text-transform:uppercase;" onblur="strToUpper(this)" readonly>
                                                </td>
                                                <td width="10"></td>
                                                <td width="110"  nowrap class="table_search_head"><bean:message key="Liner_Bkg_No"/></td>
                                                <td class="table_search_body">
                                                    <input type="text" name="lnr_bkg_no" value="<bean:write name="hblVO" property="lnr_bkg_no"/>" class="search_form-disable" maxlength="20" dataformat="excepthan" style="ime-mode:disabled;width:130;text-transform:uppercase;" onblur="strToUpper(this)" readonly>
                                                </td>
												<td></td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="10px"></td>
                                </tr>
                                <tr>
                                    <td valign="top">
                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                            <tr>
                                                <td align="left" valign="top" width="300">
                                        <!-- 왼쪽  -->
                                                    <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                                        <tr>
                                                            <td nowrap class="sub_title" width="120"><img src="<%=CLT_PATH%>/web/img/main/sub_title_arrow.gif" width="7" height="7" hspace="1"><bean:message key="Customer"/></td>
                                                            <td class="sub_title2"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                                                        </tr>
                                                    </table>
                                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                        <tr>
                                                            <td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                                                        </tr>
                                                    </table>
                                                    <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                                        <tr>
                                                            <td width="70" nowrap class="table_search_head_r"><bean:message key="Shipper"/></td>
                                                            <td nowrap class="table_search_body">
                                                                <input type="text"   name="shpr_trdp_nm" value='<bean:write name="hblVO" property="shpr_trdp_nm"/>'  class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:175;text-transform:uppercase;" onblur="strToUpper(this)" maxlength="50">
																<input type="hidden" name="shpr_trdp_cd" value='<bean:write name="hblVO" property="shpr_trdp_cd"/>'  class="search_form" onKeyDown="codeNameAction('trdpCode_shipper',this, 'onKeyDown')" onBlur="codeNameAction('trdpCode_shipper',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled;width:48;">
																<img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" id="shipper"   onClick="openPopUp('LINER_POPLIST',this)" style="cursor:hand" align="absmiddle">
                                                            </td>
															<!--
                                                            <td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="4"></td>
                                                            <td id="shipper" width="30" align="right" style="cursor:hand" onClick="openPopUp('PIC_POP', this)">
                                                               <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                                                   <tr>
                                                                       <td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
                                                                       <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="PIC"/></td>
                                                                       <td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
                                                                   </tr>
                                                               </table>
                                                           </td>
															-->
                                                        </tr>
                                                    </table>
                                                    <!--
                                                    <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                                        <tr>
                                                            <td width="70" class="table_search_head"><bean:message key="Rec_DOC"/></td>
                                                            <input name="cust_doc_seq" type="hidden" class="search_form" style="width:120;">
                                                            <td align="right" class="table_search_body"><input name="cust_no" type="text" class="search_form" style="width:120;"></td>
                                                            <td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="4"></td>
                                                            <td align="right" style="cursor:hand" onClick="openPopUp('CUSTBKG', this)">
                                                                 <table border="0" cellpadding="0" cellspacing="0">
                                                                    <tr>
                                                                        <td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
                                                                        <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name" >Cust BKG</td>
                                                                        <td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    -->
                                                    <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                                        <tr>
                                                            <td width="290" class="table_search_body">
                                                                <textarea name="shpr_trdp_addr" class="search_form" dataformat="excepthan" style="width:272;height:80px;" onblur="strToUpper(this);chkCmpAddr(this, 'Shipper Address')" WRAP="off"><bean:write name="hblVO" property="shpr_trdp_addr" filter="false"/></textarea>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                                        <tr>
                                                            <td width="70" nowrap class="table_search_head_r"><bean:message key="Consignee"/></td>
                                                            <td nowrap class="table_search_body">
                                                                <input type="hidden"   name="cnee_trdp_cd" value='<bean:write name="hblVO" property="cnee_trdp_cd"/>' class="search_form" onKeyDown="codeNameAction('trdpCode_consignee',this, 'onKeyDown')" onBlur="codeNameAction('trdpCode_consignee',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:48;">
                                                                <input type="text" name="cnee_trdp_nm"   maxlength="50" value='<bean:write name="hblVO" property="cnee_trdp_nm"/>'   class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:175;text-transform:uppercase;" onblur="strToUpper(this)">
                                                                <img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" id="consignee" onClick="openPopUp('LINER_POPLIST',this)" style="cursor:hand" align="absmiddle">
                                                            </td>
                                                            <!--
                                                            <td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="4"></td>
                                                            <td id="consignee" align="right" style="cursor:hand" onClick="openPopUp('PIC_POP', this)">
                                                                <table border="0" cellpadding="0" cellspacing="0">
                                                                    <tr>
                                                                        <td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
                                                                        <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name" ><bean:message key="PIC"/></td>
                                                                        <td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                            -->
                                                        </tr>
                                                    </table>
                                                    <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                                        <tr>
                                                            <td width="290" class="table_search_body">
                                                                <textarea name="cnee_trdp_addr" class="search_form" dataformat="excepthan" style="width:272;height:80px;" onblur="strToUpper(this);chkCmpAddr(this, 'Consignee Address')" WRAP="off"><bean:write name="hblVO" property="cnee_trdp_addr" filter="false"/></textarea>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                                        <tr>
                                                            <td width="70" nowrap class="table_search_head"><bean:message key="Notify"/></td>
                                                            <td nowrap class="table_search_body">
                                                                <input type="hidden"   name="ntfy_trdp_cd" value='<bean:write name="hblVO" property="ntfy_trdp_cd"/>' class="search_form" onKeyDown="codeNameAction('trdpCode_notify',this, 'onKeyDown')" onBlur="codeNameAction('trdpCode_notify',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:48;">
                                                                <input type="text" name="ntfy_trdp_nm"   value='<bean:write name="hblVO" property="ntfy_trdp_nm"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:175;text-transform:uppercase;" onblur="strToUpper(this)" maxlength="50">
                                                                <img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" id="notify" onClick="openPopUp('LINER_POPLIST',this)" style="cursor:hand" align="absmiddle">
                                                            </td>
                                                            <!--
                                                            <td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="4"></td>
                                                            <td id="notify" align="right" style="cursor:hand" onClick="openPopUp('PIC_POP', this)">
                                                                <table border="0" cellpadding="0" cellspacing="0">
                                                                    <tr>
                                                                        <td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
                                                                        <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="PIC"/></td>
                                                                        <td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                            -->
                                                        </tr>
                                                    </table>
                                                    <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                                        <tr>
                                                            <td nowrap class="table_search_body">
                                                                <img src="<%=CLT_PATH%>/web/img/main/ico_t2.gif" border="0"><a href="javascript:copyValue('SAC')"><bean:message key="Same_As_Consignee"/></a>&nbsp;
                                                                <img src="<%=CLT_PATH%>/web/img/main/ico_t2.gif" border="0"><a href="javascript:copyValue('CNEE')"><bean:message key="Copy"/></a>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                                        <tr>
                                                            <td width="290" class="table_search_body">
                                                                <textarea name="ntfy_trdp_addr" class="search_form" dataformat="excepthan" style="width:272;height:80px;" onblur="strToUpper(this);chkCmpAddr(this, 'Notify Address')" WRAP="off"><bean:write name="hblVO" property="ntfy_trdp_addr" filter="false"/></textarea>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                                <td width="20" align="left" valign="top"><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="8"></td>
                                                <td valign="top">
                                    <!-- ############ Right Begin ############ -->
                                                    <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                                        <tr>
                                                            <td align="left" valign="top" width="300">
                                                                <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                                                    <tr>
                                                                        <td nowrap class="sub_title" width="120"><img src="<%=CLT_PATH%>/web/img/main/sub_title_arrow.gif" width="7" height="7" hspace="1"><bean:message key="Vessel"/></td>
                                                                        <td class="sub_title2"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                                                                    </tr>
                                                                </table>
                                                                <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                                                    <tr>
																		<td width="110" nowrap class="table_search_head_r"><bean:message key="Liner"/></td>
																		<td nowrap class="table_search_body">
																			<input type="text"   name="lnr_trdp_cd" value='<bean:write name="hblVO" property="lnr_trdp_cd"/>' onKeyDown="codeNameAction('trdpCode_liner',this, 'onKeyDown')" onBlur="codeNameAction('trdpCode_liner',this, 'onBlur')" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:50px;">
																			<img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" id="liner" onClick="openPopUp('LINER_POPLIST',this)" style="cursor:hand" align="absmiddle">
																			<input type="text"   name="lnr_trdp_nm" value='<bean:write name="hblVO" property="lnr_trdp_nm"/>' onblur="strToUpper(this)" class="search_form" style="width:160px;text-transform:uppercase;"  onKeyPress="if(event.keyCode==13){openPopUp('LINER_POPLIST', document.getElementById('liner'));}">
																		</td>
																	</tr>
																	<tr>
                                                                        <td width="110" nowrap class="table_search_head"><bean:message key="Liner_PIC"/></td>
                                                                        <td nowrap class="table_search_body">
                                                                            <input type="text" name="lnr_trdp_pic" value='<bean:write name="hblVO" property="lnr_trdp_pic"/>' class="search_form" style="width:150px;">
                                                                        </td>			
																				
                                                                        <!--
                                                                        <td id="liner" width="30" align="right" style="cursor:hand" onClick="openPopUp('PIC_POP', this)">
                                                                           <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                                                               <tr>
                                                                                   <td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
                                                                                   <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="PIC"/></td>
                                                                                   <td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
                                                                               </tr>
                                                                           </table>
                                                                       </td>
                                                                        -->
                                                                    </tr>
                                                                </table>
                                                                <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                                                    <tr>
                                                                        <td width="110" nowrap class="table_search_head_r"><bean:message key="VSL_VOY"/></td>
                                                                        <td nowrap class="table_search_body" colspan="4">
                                                                            <input type="hidden" name="trnk_vsl_cd" value='<bean:write name="hblVO" property="trnk_vsl_cd"/>' class="search_form" onKeyDown="codeNameAction('srVessel',this, 'onKeyDown')" onBlur="codeNameAction('srVessel',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:40px;">
                                                                            <input type="text"   name="trnk_vsl_nm" value='<bean:write name="hblVO" property="trnk_vsl_nm"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:150px;text-transform:uppercase;" maxlength="50" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){openPopUp('VESSEL_POPLIST', document.getElementById('trunkvessel'), frm1.trnk_vsl_nm.value);}">
                                                                            <img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" id="trunkvessel" onClick="openPopUp('VESSEL_POPLIST',this)" style="cursor:hand;" align="absmiddle">/
                                                                            <input type="text"   name="trnk_voy"    value='<bean:write name="hblVO" property="trnk_voy"/>'    class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:60px;text-transform:uppercase;" maxlength="5" onblur="strToUpper(this)">
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                                <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                                                    <tr>
                                                                        <td width="110" nowrap class="table_search_head_r"><bean:message key="ETD"/></td>
                                                                        <td nowrap class="table_search_body">
                                                                            <input name="etd_dt_tm" value='<wrt:write name="hblVO" property="etd_dt_tm" formatType="DATE" fromFormat="yyyyMMdd" format="yyyy-MM-dd"/>' type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:70px;" onKeyUp="mkDateFormat(this,event,false)" onBlur="mkDateFormat(this, event, true)">
                                                                            <img id="etd_dt_tm_cal" onclick="doDisplay('DATE1',frm1);" src="<%=CLT_PATH%>/web/img/button/btns_calendar.gif" width="19" height="21" border="0" align="middle" style="cursor:hand;">
                                                                        </td>
                                                                        <td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="4"></td>
                                                                        <td width="50" nowrap class="table_search_head"><bean:message key="ETA"/></td>
                                                                        <td nowrap class="table_search_body">
                                                                            <input name="eta_dt_tm" value='<wrt:write name="hblVO" property="eta_dt_tm" formatType="DATE" fromFormat="yyyyMMdd" format="yyyy-MM-dd"/>' type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:70px;" onKeyUp="mkDateFormat(this,event,false)" onBlur="mkDateFormat(this, event, true)">
                                                                            <img id="eta_dt_tm_cal" onclick="doDisplay('DATE2',frm1);" src="<%=CLT_PATH%>/web/img/button/btns_calendar.gif" width="19" height="21" border="0" align="middle" style="cursor:hand;">
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                                <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                                                    <tr>
                                                                        <td nowrap class="sub_title" width="120"><img src="<%=CLT_PATH%>/web/img/main/sub_title_arrow.gif" width="7" height="7" hspace="1"><bean:message key="Route"/></td>
                                                                        <td class="sub_title2"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                                                                    </tr>
                                                                </table>
                                                                <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                                                    <tr>
                                                                        <td width="110" nowrap class="table_search_head"><bean:message key="POR"/></td>
                                                                        <td nowrap class="table_search_body">
                                                                            <input name="por_cd" maxlength="5" value='<bean:write name="hblVO" property="por_cd"/>' type="text" class="search_form" onKeyDown="codeNameAction('Location_por',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('Location_por',this, 'onBlur');" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50;">
                                                                            <img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" id="por" onClick="openPopUp('LOCATION_POPLIST',this)" style="cursor:hand;" align="absmiddle">
                                                                            <html:hidden name="hblVO" property="por_nod_cd"/>
                                                                            <input name="por_nm" maxlength="50" value='<bean:write name="hblVO" property="por_nm"/>' type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:160;text-transform:uppercase;" onblur="strToUpper(this)"   onKeyPress="if(event.keyCode==13){openPopUp('LOCATION_POPLIST', document.getElementById('por'), frm1.por_nm.value);}">
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                                <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                                                    <tr>
                                                                        <td width="110" nowrap class="table_search_head_r"><bean:message key="POL"/></td>
                                                                        <td nowrap class="table_search_body">
                                                                            <input name="pol_cd" maxlength="5" value='<bean:write name="hblVO" property="pol_cd"/>' type="text" class="search_form" onKeyDown="codeNameAction('Location_pol',this, 'onKeyDown')" onBlur="codeNameAction('Location_pol',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50;">
                                                                            <img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" id="pol" onClick="openPopUp('LOCATION_POPLIST',this)" style="cursor:hand;" align="absmiddle">
                                                                            <html:hidden name="hblVO" property="pol_nod_cd"/>
                                                                            <input name="pol_nm" maxlength="50" value='<bean:write name="hblVO" property="pol_nm"/>' type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:160;text-transform:uppercase;" onblur="strToUpper(this)"  onKeyPress="if(event.keyCode==13){openPopUp('LOCATION_POPLIST', document.getElementById('pol'), frm1.pol_nm.value);}">
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                                <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                                                    <tr>
                                                                        <td width="110" nowrap class="table_search_head_r"><bean:message key="POD"/></td>
                                                                        <td nowrap class="table_search_body">
                                                                            <input name="pod_cd" maxlength="5" value='<bean:write name="hblVO" property="pod_cd"/>' type="text" class="search_form" onKeyDown="codeNameAction('Location_pod',this, 'onKeyDown')" onBlur="codeNameAction('Location_pod',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50;">
                                                                            <img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" id="pod" onClick="openPopUp('LOCATION_POPLIST',this)" style="cursor:hand;" align="absmiddle">
                                                                            <html:hidden name="hblVO" property="pod_nod_cd"/>
                                                                            <input name="pod_nm" maxlength="50" value='<bean:write name="hblVO" property="pod_nm"/>' type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:160;text-transform:uppercase;" onblur="strToUpper(this)"  onKeyPress="if(event.keyCode==13){openPopUp('LOCATION_POPLIST', document.getElementById('pod'), frm1.pod_nm.value);}">
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                                <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                                                    <tr>
                                                                        <td width="110" nowrap class="table_search_head_r"><bean:message key="DEL"/></td>
                                                                        <td nowrap class="table_search_body">
                                                                            <input name="del_cd" maxlength="5" value='<bean:write name="hblVO" property="del_cd"/>' type="text" class="search_form" onKeyDown="codeNameAction('Location_del',this, 'onKeyDown')" onBlur="codeNameAction('Location_del',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50;">
                                                                            <img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" id="del" onClick="openPopUp('LOCATION_POPLIST',this)" style="cursor:hand;" align="absmiddle">
                                                                            <html:hidden name="hblVO" property="del_nod_cd"/>
                                                                            <input name="del_nm" maxlength="50" value='<bean:write name="hblVO" property="del_nm"/>' type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:160;text-transform:uppercase;" onblur="strToUpper(this)"  onKeyPress="if(event.keyCode==13){openPopUp('LOCATION_POPLIST', document.getElementById('del'), frm1.del_nm.value);}">
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                                <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                                                    <tr>
                                                                        <td width="110" nowrap class="table_search_head"><bean:message key="F_Dest"/></td>
                                                                        <td nowrap class="table_search_body">
                                                                            <input name="fnl_dest_loc_cd" maxlength="5" value='<bean:write name="hblVO" property="fnl_dest_loc_cd"/>' type="text" class="search_form" onKeyDown="codeNameAction('Location_dest',this, 'onKeyDown')" onBlur="codeNameAction('Location_dest',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50;">
                                                                            <img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" id="dest" onClick="openPopUp('LOCATION_POPLIST',this)" style="cursor:hand;" align="absmiddle">
                                                                            <html:hidden name="hblVO" property="fnl_dest_nod_cd"/>
                                                                            <input name="fnl_dest_loc_nm" maxlength="50" value='<bean:write name="hblVO" property="fnl_dest_loc_nm"/>' type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:160;text-transform:uppercase;" onblur="strToUpper(this)"  onKeyPress="if(event.keyCode==13){openPopUp('LOCATION_POPLIST', document.getElementById('dest'), frm1.fnl_dest_loc_nm.value);}">
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                            <td width="40" align="left" valign="top"><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="8"></td>
                                                            <td align="left" valign="top" width="300">
                                                                <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                                                    <tr>
                                                                        <td nowrap class="sub_title" width="120"><img src="<%=CLT_PATH%>/web/img/main/sub_title_arrow.gif" width="7" height="7" hspace="1"><bean:message key="Shippment_and_Item"/></td>
                                                                        <td class="sub_title2"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                                                                    </tr>
                                                                </table>
                                                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                    <tr>
                                                                        <td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                                                                    </tr>
                                                                </table>
                                                                <table border="0" cellpadding="0" cellspacing="0">
                                                                    <tr>
                                                                        <td width="110" nowrap class="table_search_head_r"><bean:message key="Shipment_Type"/></td>
                                                                        <td nowrap class="table_search_body">
                                                                            <bean:define id="shipModeList" name="valMap" property="shipModeList"/>
                                                                            <html:select name="hblVO" property="shp_mod_cd" styleClass="search_form">
                                                                                <html:options collection="shipModeList" property="cd_val" labelProperty="cd_nm"/>
                                                                            </html:select>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td width="100" nowrap class="table_search_head_r"><bean:message key="Package"/></td>
                                                                        <td nowrap class="table_search_body">
                                                                            <input type="text" name="pck_qty" value="<wrt:write name="hblVO" property="pck_qty" formatType="MONEY" format="#,###"/>" onkeyDown="onlyNumberCheck()" onkeyup="numberCommaLen(this,7,0)" maxlength="7"  class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:85;text-align:right"> 
                                                                            <bean:define id="pckList" name="valMap" property="pckCdList"/>
                                                                            <html:select name="hblVO" property="pck_ut_cd" styleClass="search_form" style="width:120px;">
                                                                                <option></option>
                                                                                <html:options collection="pckList" property="pck_ut_cd" labelProperty="pck_nm"/>
                                                                            </html:select> 
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td width="100" nowrap class="table_search_head_r"><bean:message key="GWeight"/></td>
                                                                        <td nowrap class="table_search_body">
                                                                            <input type="text" name="grs_wgt" value="<wrt:write name="hblVO" property="grs_wgt" formatType="MONEY" format="#,##0.00"/>" onkeyDown="onlyNumberCheck()" onkeyup="numberCommaLen(this,8,2)" onblur="chkComma(this,8,2)"  maxlength="13" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:85;text-align:right;">
                                                                            <bean:define id="weightunitList" name="valMap" property="weightunitList"/>
                                                                            <html:select name="hblVO" property="grs_wgt_ut_cd" styleClass="search_form" style="width:100px;">
                                                                                <html:options collection="weightunitList" property="cd_val" labelProperty="cd_nm"/>
                                                                            </html:select> 
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td width="100" nowrap class="table_search_head_r"><bean:message key="AWeight"/></td>
                                                                        <td nowrap class="table_search_body">
                                                                            <input type="text" name="act_wgt" value="<wrt:write name="hblVO" property="act_wgt" formatType="MONEY" format="#,##0.00"/>" onkeyDown="onlyNumberCheck()" onkeyup="numberCommaLen(this,8,2)" onblur="chkComma(this,8,2)" maxlength="13" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:85;text-align:right;">
                                                                            <html:select name="hblVO" property="act_wgt_ut_cd" styleClass="search_form" style="width:100px;">
                                                                                <html:options collection="weightunitList" property="cd_val" labelProperty="cd_nm"/>
                                                                            </html:select>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                                <table border="0" cellpadding="0" cellspacing="0">
                                                                    <tr>
                                                                        <td width="97" nowrap class="table_search_head_r"><bean:message key="Measurement"/></td>
                                                                        <td nowrap class="table_search_body">
                                                                            <input type="text" name="meas"    value="<wrt:write name="hblVO" property="meas" formatType="MONEY" format="#,##0.0000"/>"  onkeyDown="onlyNumberCheck()" onkeyup="numberCommaLen(this,8,4)" onblur="chkComma(this,8,4)" maxlength="13" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:85;text-align:right;">
                                                                            <bean:define id="measureList" name="valMap" property="measureList"/>
                                                                            <html:select name="hblVO" property="meas_ut_cd" styleClass="search_form">
                                                                                <html:options collection="measureList" property="cd_val" labelProperty="cd_nm"/>
                                                                            </html:select>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                                <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                                                    <tr>
                                                                        <td width="97" nowrap class="table_search_head"><bean:message key="SVC_Term"/></td>
                                                                        <td nowrap class="table_search_body">
                                                                            <bean:define id="serviceList" name="valMap" property="serviceList"/>
                                                                            <html:select name="hblVO" property="fm_svc_term_cd" styleClass="search_form">
                                                                                <html:options collection="serviceList" property="cd_val" labelProperty="cd_nm"/>
                                                                            </html:select> ~ 
                                                                            <html:select name="hblVO" property="to_svc_term_cd" styleClass="search_form">
                                                                                <html:options collection="serviceList" property="cd_val" labelProperty="cd_nm"/>
                                                                            </html:select> 
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                                <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                                                    <tr>
                                                                        <td width="97" nowrap class="table_search_head"><bean:message key="FRT_Term"/></td>
                                                                        <td nowrap class="table_search_body">
                                                                            <bean:define id="frtList" name="valMap" property="frtCdList"/>
                                                                            <html:select name="hblVO" property="frt_term_cd" styleClass="search_form">
                                                                                <html:options collection="frtList" property="cd_val" labelProperty="cd_nm"/>
                                                                            </html:select> 
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
                                                                        <td nowrap class="sub_title" width="120"><img src="<%=CLT_PATH%>/web/img/main/sub_title_arrow.gif" width="7" height="7" hspace="1"><bean:message key="Management"/></td>
                                                                        <td class="sub_title2"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                                                                    </tr>
                                                                </table>
                                                                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                                    <tr>
                                                                        <td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                                                                    </tr>
                                                                </table>
																<table width="100%" border="0" cellpadding="0" cellspacing="0">
																	<tr>
																		<td width="100" nowrap class="table_search_head_r"><bean:message key="Issued_At"/></td>
																		<td nowrap class="table_search_body_r">
																			<input type="text"   name="iss_loc_cd" value="<bean:write name="hblVO" property="iss_loc_cd"/>" class="search_form" style="width:60;" onKeyDown="codeNameAction('Location_iss',this, 'onKeyDown')" onBlur="codeNameAction('Location_iss',this, 'onBlur')">
																			<img id="iss" onClick="openPopUp('LOCATION_POPLIST',this)" src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" style="cursor:hand;" align="absmiddle">
																			<input type="text"   name="iss_loc_nm" value="<bean:write name="hblVO" property="iss_loc_nm"/>" class="search_form" style="width:160;text-transform:uppercase;" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){openPopUp('LOCATION_POPLIST', document.getElementById('iss'), frm1.iss_loc_nm.value);}"> 
																		</td>
																	</tr>
																	<tr>
																		<td width="100" nowrap class="table_search_head_r"><bean:message key="Payable_At"/></td>
																		<td nowrap class="table_search_body">
																			<input type="text"   name="pay_loc_cd" value="<bean:write name="hblVO" property="pay_loc_cd"/>" class="search_form" style="width:60;" onKeyDown="codeNameAction('Location_pay',this, 'onKeyDown')" onBlur="codeNameAction('Location_pay',this, 'onBlur')">
																			<img id="pay" onClick="openPopUp('LOCATION_POPLIST',this)" src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" style="cursor:hand;" align="absmiddle">
																			<input type="text"   name="pay_loc_nm" value="<bean:write name="hblVO" property="pay_loc_nm"/>" class="search_form" style="width:160;text-transform:uppercase;" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){openPopUp('LOCATION_POPLIST', document.getElementById('pay'), frm1.pay_loc_nm.value);}"> 
																		</td>
																	</tr>
																</table>
																<table width="100%" border="0" cellpadding="0" cellspacing="0">
																	<tr>
																		<td width="97" nowrap class="table_search_head_r"><bean:message key="Issued"/>&nbsp;<bean:message key="Date"/></td>
																		<td nowrap class="table_search_body">
																			<input type="text" name="bl_iss_dt" value="<wrt:write name="hblVO" property="bl_iss_dt" formatType="DATE" fromFormat="yyyyMMdd" format="yyyy-MM-dd"/>" class="search_form" onKeyUp="mkDateFormat(this,event,false)" onBlur="mkDateFormat(this, event, true)" dataformat="excepthan" style="ime-mode:disabled;width:70px;">
																			<img id="bl_iss_dt_cal" onclick="doDisplay('DATE5' ,frm1);" src="<%=CLT_PATH%>/web/img/button/btns_calendar.gif" width="19" height="21" border="0" align="absmiddle" style="cursor:hand;">
																		</td>
																	</tr>
																	<tr>
																		<td width="97" nowrap class="table_search_head_r"><bean:message key="Operator"/></td>
																		<td nowrap class="table_search_body">
																			<input type="text"   name="opr_usrid" value="<bean:write name="hblVO" property="proc_usrid"/>" class="search_form-disable" readOnly style="width:80;">
																			<img id="oprBtn" src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" onClick="openPopUp('OPR_POPLIST',this)" style="cursor:hand;" align="absmiddle">
																			<input type="hidden" name="opr_usrnm"   value="<bean:write name="hblVO" property="proc_usrnm"/>">
																			<input type="hidden" name="opr_ofc_cd"  value="<bean:write name="hblVO" property="proc_ofccd"/>">
																			<input type="hidden" name="opr_dept_cd" value="<bean:write name="hblVO" property="proc_dept_cd"/>">
																		</td>
																	</tr>
																</table>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td colspan="3" height="19px"></td>
                                                        </tr>
                                                        <tr>
                                                            <td colspan="3">
                                                                <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                                                    <tr>
                                                                        <td nowrap class="sub_title" width="120"><img src="<%=CLT_PATH%>/web/img/main/sub_title_arrow.gif" width="7" height="7" hspace="1"><bean:message key="House_BL_List"/></td>
                                                                        <td class="sub_title2"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td height="5" colspan="2"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td align="center" colspan="2">
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
                                                        </tr>
                                                    </table>
                                    <!-- ############ right  end ############ -->
                                                </td>
                                                <td width="180" align="left" valign="top"><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="8"></td>
                                            </tr> 
                                        </table>
                                    </td>
                                </tr>
                            </table>					
				</div>
				<div id="tabLayer" style="display:none"><!--Shipping Request Mark & Description-->
                            <table width="100%" border="0" bordercolor="blue" cellspacing="0" cellpadding="0">                          
                                <!-- Mark -->
                                <tr>
                                    <td height="10px" colspan="4"></td>
                                </tr>
                                <tr>
                                    <td width="200" align="left" valign="top">
                                        <table width="200" border="0" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td width="160" align="left">
                                                    <table width="160" height="20px" border="0" cellpadding="0" cellspacing="0">
                                                        <tr>
                                                        	<td nowrap="nowrap" width="160">
										                    	<table border="0" cellpadding="0" cellspacing="0">
										                    		<tr>
										                    			<td nowrap="nowrap"  class="sub_title"  width="160">
										                    				<img src="<%=CLT_PATH%>/web/img/main/sub_title_arrow.gif" width="7" height="7" hspace="1"><bean:message key="Mark"/>
										                    			</td>
										                    		</tr>
										                    	</table>
										                    </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                                <td><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                                            </tr>
                                            <tr>
                                                <td valign="top" colspan="2"> 
"                                                    <textarea name="mk_txt" rows="35" maxlength="4000" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" onblur="mkChck(this, 20);strToUpper(this);keyUp_maxLength(this);" dataformat="excepthan" style="width:191;" WRAP="off"><bean:write name="hblVO" property="mk_txt" filter="false"/></textarea>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td width="10" align="left" valign="top"><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="10"></td>
                                    <td width="400" align="left" valign="top">
                                        <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td width="160" align="left">
                                                    <table width="160" height="20px" border="0" cellpadding="0" cellspacing="0">
                                                        <tr>
                                                        	<td nowrap="nowrap" width="160">
										                    	<table border="0" cellpadding="0" cellspacing="0">
										                    		<tr>
										                    			<td nowrap="nowrap"  class="sub_title"  width="160">
										                    				<img src="<%=CLT_PATH%>/web/img/main/sub_title_arrow.gif" width="7" height="7" hspace="1"><bean:message key="Description"/>
										                    			</td>
										                    		</tr>
										                    	</table>
										                    </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                                <td><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                                            </tr>
                                            <tr>
                                                <td valign="top" colspan="2"> 
                                                    <textarea name="desc_txt" rows="35" maxlength="4000" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" onblur="descChk(this,40);strToUpper(this);keyUp_maxLength(this);" dataformat="excepthan" style="width:351;" WRAP="off"><bean:write name="hblVO" property="desc_txt" filter="false"/></textarea>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
									<td></td>
                                </tr>
                                <tr>
                                    <td height="10px"  colspan="4"></td>
                                </tr>
                            </table>
                            <table width="100%" border="0" bordercolor="blue" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td width="160" align="left">
                                        <table width="160" height="20px" border="0" cellpadding="0" cellspacing="0">
                                            <tr>
                                           		<td nowrap="nowrap" width="160">
							                    	<table border="0" cellpadding="0" cellspacing="0">
							                    		<tr>
							                    			<td nowrap="nowrap"  class="sub_title"  width="160">
							                    				<img src="<%=CLT_PATH%>/web/img/main/sub_title_arrow.gif" width="7" height="7" hspace="1"><bean:message key="Remark"/>
							                    			</td>
							                    		</tr>
							                    	</table>
							                    </td>
                                            </tr>
                                        </table>
                                    </td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td colspan="3">
                                        <textarea name="rmk" cols="175" rows="2" maxlength="400" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" onblur="strToUpper(this);keyUp_maxLength(this);" ><bean:write name="hblVO" property="rmk" filter="false"/></textarea>
                                    </td>
                                </tr>   
                            </table>
                </div>
                <div id="tabLayer" style="display:none"><!--Shipping Request Mark & Description-->
                            <table width="100%" border="0" bordercolor="blue" cellspacing="0" cellpadding="0">
                                <!-- Mark -->
                                <tr>
                                    <td height="10px" colspan="3"></td>
                                </tr>
                                <tr>
                                    <td align="left" valign="top">
                                        <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td width="160" align="left">
                                                    <table width="160" height="20px" border="0" cellpadding="0" cellspacing="0">
                                                        <tr>
                                                        	<td nowrap="nowrap" width="160">
										                    	<table border="0" cellpadding="0" cellspacing="0">
										                    		<tr>
										                    			<td nowrap="nowrap"  class="sub_title"  width="160">
										                    				<img src="<%=CLT_PATH%>/web/img/main/sub_title_arrow.gif" width="7" height="7" hspace="1"><bean:message key="Shipping_Document"/>
										                    			</td>
										                    		</tr>
										                    	</table>
										                    </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                                <td><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
												<td align="right">
													<table border="0" cellpadding="0" cellspacing="0">
														<tr>
															<td>
																<table id="emlSnd" height="21" border="0" cellpadding="0" cellspacing="0" onClick="doWork('SNDEML')" style="display:none;margin-left:5px;cursor:hand">
																	<tr>
																		<td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
																		<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="EMail"/></td>
																		<td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
																	</tr>
																</table>        
															</td>
															<td width="3"></td>
															<td>
																<table id="fileUp" height="21" border="0" cellpadding="0" cellspacing="0" onClick="doWork('DOCFILE')" style="display:none;margin-left:5px;cursor:hand">
																	<tr>
																		<td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
																		<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Upload"/></td>
																		<td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
																	</tr>
																</table>        
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
																<script language="javascript">comSheetObject('sheet3');</script>
															</td>
														</tr>
													</table>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
							</table>
		      </div>
              <div id="tabLayer" style="display:none"><!--Container List-->
                            <table width="100%" border="0" bordercolor="blue" cellspacing="0" cellpadding="0">                          
                                <!-- Mark -->
                                <tr>
                                    <td height="10px" colspan="3"></td>
                                </tr>
                                <tr>
                                    <td align="left" valign="top">
                                        <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td width="160" align="left">
                                                    <table width="160" height="20px" border="0" cellpadding="0" cellspacing="0">
                                                        <tr>
                                                        	<td nowrap="nowrap" width="160">
										                    	<table border="0" cellpadding="0" cellspacing="0">
										                    		<tr>
										                    			<td nowrap="nowrap"  class="sub_title"  width="160">
										                    				<img src="<%=CLT_PATH%>/web/img/main/sub_title_arrow.gif" width="7" height="7" hspace="1"><bean:message key="Container_List"/>
										                    			</td>
										                    		</tr>
										                    	</table>
										                    </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                                <td><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                                                <td align="right"></td>               
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
                                        </table>
                                    </td>
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
<form name="frm2" method="POST" action="./GateServlet.gsl">
    <input type="hidden" name="goWhere" value="fd"/>
    <input type="hidden" name="bcKey"   value="blFileDown"/>
    <input type="hidden" name="s_palt_doc_seq" value=""/>
    <input type="hidden" name="docType" value=""/>
</form>
</body>
</html>
