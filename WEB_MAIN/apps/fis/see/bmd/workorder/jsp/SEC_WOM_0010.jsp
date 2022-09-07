<%--
=========================================================
*Copyright(c) 2009 CyberLogitec. All Rights Reserved.
=========================================================
=========================================================
*@FileName   : SEC_WOM_0010.jsp
*@FileTitle  : Work Order 등록
*@Description: 
*@author     : Kang,Jung-Gu
*@version    : 1.0 - 09/28/2009
*@since      :

*@Change history:
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
    <%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
    <title><bean:message key="system.title"/></title>
    <link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SEA_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/workorder/script/SEC_WOM_0010.js?ver=<%=CLT_JS_VER%>"></script>
		
	<bean:define id="woVO"  name="EventResponse" property="objVal"/>
	<bean:define id="valMap" name="EventResponse" property="mapVal"/>
	<script language="javascript">
	var UNITCD1 = '';
	var UNITCD2 = '';
			<% boolean isBegin = false; %>
			
			<!--Role 코드조회-->
			<logic:notEmpty name="valMap" property="UNITCD">
				<bean:define id="unitList" name="valMap" property="UNITCD"/>
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
		
        var TPCD1 = '';
        var TPCD2 = '';
        <% isBegin = false; %>
        <!--Role 코드조회-->
        <bean:define id="tpszList"  name="valMap" property="cntrTpszList"/>
        <logic:iterate id="codeVO" name="tpszList">
            <% if(isBegin){ %>
                TPCD1+= '|';
                TPCD2+= '|';
            <% }else{
                  isBegin = true;
               } %>
            TPCD1+= '<bean:write name="codeVO" property="cntr_tpsz_cd"/>';
            TPCD2+= '<bean:write name="codeVO" property="cntr_tpsz_cd"/>';
        </logic:iterate>
        function btnLoad(){
            if(frm1.wo_sts_cd.value=='NA'){
                if(frm1.bkg_no.value!=''){ 
                	getBtnObj('btnAdd').style.display    = 'block';
                	getObj('rowAddBtn').style.display = 'block';

                }else{
                    var tmpBtn = getObj('bkgBtn');
                    tmpBtn.style.display = 'block';
                }
            //저장
            }else if(frm1.wo_sts_cd.value=='A'){
            	getBtnObj('btnAdd').style.display   = 'none';
            	getBtnObj('cancelObj').style.display= 'none';
            	getBtnObj('btnModify').style.display   = 'block';
		
            	getBtnObj('btnDelete').style.display = 'block';
            	getBtnObj('btnPrint').style.display = 'block';
            	getBtnObj('issObj').style.display  = 'block';
            	getBtnObj('btnCopy').style.display  = 'block';
            	getObj('rowAddBtn').style.display= 'block';
		        
            //Issue
            }else if(frm1.wo_sts_cd.value=='B'){
            	getBtnObj('btnModify').style.display   = 'none';
            	getBtnObj('issObj').style.display   = 'none';
            	getBtnObj('btnDelete').style.display = 'none';
		
            	getBtnObj('btnPrint').style.display  = 'block';
            	getBtnObj('cancelObj').style.display= 'block';
            	getBtnObj('btnCopy').style.display  = 'block';
            	getObj('rowAddBtn').style.display= 'none';
            }
        }
	</script>
</head>
<body class="td" onLoad="btnLoad();loadPage();loadData();">
<form name="frm1" method="POST" action="./SEC_WOM_0010.clt">
	<input type="hidden" name="f_cmd">
	<html:hidden name="woVO" property="intg_bl_seq"/>
	<html:hidden name="woVO" property="wo_sts_cd"/>
	<html:hidden name="woVO" property="bnd_clss_cd"/>
	<table width="950" border="0"  bordercolor="red" cellspacing="0" cellpadding="0">
		<tr>
			<td class="bigtitle"><%=LEV3_NM%></td>
			<td align="right" nowrap="nowrap" class="navi"><img src="<%=CLT_PATH%>/web/img/main/navi_icon.gif" width="6" height="5" hspace="3" vspace="5" align="texttop"><%=LEV1_NM%> <%=LEV2_NM%> > <span class="navi_b"><%=LEV3_NM%></span></td>
		</tr>
	</table>
	<table width="950" border="0" cellspacing="0" cellpadding="0">
		<tr>
			<td height="4"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
		</tr>
	</table>
	<table width="950" border="0" cellspacing="0" cellpadding="0">
		<tr>
			<td align="right">
				<table border="0" cellspacing="0" cellpadding="0">
					<tr>
						<td onClick="doWork('SEARCH')" style="cursor:hand">
							<table height="21" border="0" cellpadding="0" cellspacing="0">
								<tr>
									<td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="4"></td>
									<td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
									<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Search"/></td>
									<td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
								</tr>
							</table>
						</td>
						<td onClick="doWork('NEW')" style="cursor:hand">
							<table height="21" border="0" cellpadding="0" cellspacing="0">
								<tr>
									<td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="4"></td>
									<td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
									<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="New"/></td>
									<td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
								</tr>
							</table>			
						</td>
						<td>
							<table  id="btnAdd" onClick="doWork('ADD')" height="21" border="0" cellpadding="0" cellspacing="0" style="cursor:hand;display:none;">
								<tr>
									<td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="4"></td>
									<td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
									<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Save"/></td>
									<td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
								</tr>
							</table>
						</td>
						<td>
                            <table  id="btnModify" onClick="doWork('MODIFY')" height="21" border="0" cellpadding="0" cellspacing="0" style="cursor:hand;display:none;">
                                <tr>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="4"></td>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
                                    <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Save"/></td>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
                                </tr>
                            </table>
                        </td>
                        <td>
                            <table id="btnDelete" height="21" border="0" cellpadding="0" cellspacing="0"  onClick="doWork('REMOVE')" style="display:none;margin-left:5px;cursor:hand">
                                <tr>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
                                    <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Delete"/></td>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
                                </tr>
                            </table>    
                        </td>
						<td>
							<!--issue / cancel 일때는 버튼을 숨긴다 -->	
							<table id="issObj" height="21" border="0" cellpadding="0" cellspacing="0" onClick="doWork('ISSUE')" style="cursor:hand;display:none;">
								<tr>
									<td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="4"></td>
									<td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
									<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Issue"/></td>
									<td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
								</tr>
							</table>
						</td>
						<!-- cancel -->
						<td>
							<table id="cancelObj" height="21" border="0" cellpadding="0" cellspacing="0" onClick="doWork('CANCEL')" style="cursor:hand;display:none;">
								<tr>
									<td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="4"></td>
									<td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
									<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Issue"/> <bean:message key="Cancel"/></td>
									<td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
								</tr>
							</table>
						</td>
						<td>
							<table id="btnPrint" height="21" border="0" cellpadding="0" cellspacing="0" onClick="doWork('PRINT')" style="cursor:hand;display:none;">
								<tr>
									<td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="4"></td>
									<td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
									<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Print"/></td>
									<td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
								</tr>
							</table>
						</td>
                        <td>
                            <table id="btnCopy" height="21" border="0" cellpadding="0" cellspacing="0" onClick="doWork('COPY')" style="cursor:hand;display:none;">
                                <tr>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="4"></td>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
                                    <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Copy"/></td>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
                                </tr>
                            </table>
                        </td>
                        <td>
                            <table height="21" border="0" cellpadding="0" cellspacing="0" onclick="doWork('HOUSEBL');" style="cursor:hand;display:none;">
                                <tr>
                                	<td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="4"></td>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
                                    <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="HBL"/></td>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
                                </tr>
                            </table>
                        </td>					
					</tr>
				</table>
			</td>
		</tr>
	</table>
	<table width="950" border="0" cellspacing="0" cellpadding="0">
		<tr>
			<td height="4"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
		</tr>
	</table>
	<table width="950" border="0" cellpadding="0" cellspacing="0">
		<tr>
			<td align="left" class="table_search_bg">
				<table width="100%" border="0" cellspacing="0" cellpadding="0">
					<tr>
						<td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
					</tr>
				</table>
				<table border="0" cellpadding="0" cellspacing="0">
					<tr>
						<td nowrap class="table_search_head"><bean:message key="Work_Order_No"/></td>
						<td class="table_search_body">
							<input type="text" name="f_wo_no" value="<bean:write name="woVO" property="wo_no"/>" class="search_form" style="width:120;text-transform:uppercase;" onblur="strToUpper(this)">
							<img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" style="cursor:hand" align="absmiddle" onclick="doWork('WO_POPLIST')"/>
						</td>
						<td class="table_search_body" width="280"></td>
						<td nowrap class="table_search_body">
						</td>
						<!--
						<td class="table_search_body" width="30"></td>
						<td nowrap class="table_search_body">Bound : </td>
						<td class="table_search_body">
						</td>
						<td class="table_search_body" width="30"></td>
						<td nowrap class="table_search_body">Issued At : </td>
								-->
						<td class="table_search_body"></td>
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
	</table>	
	<table width="950" border="0" cellspacing="0" cellpadding="0">
		<tr>
			<td align="left" class="table_search_bg" >
				<table width="100%" border="0" cellpadding="0" cellspacing="0">
					<tr>
						<td colspan ="3">
							<table border="0" cellpadding="0" cellspacing="0">
								<tr>
									<td nowrap class="table_search_head"><bean:message key="Work_Order_No"/></td> 
									<td class="table_search_body">
										<input name="wo_no" type="text" class="search_form-disable" style="width:120" value='<bean:write name="woVO" property="wo_no"/>' readonly>
									</td>
									<td width="15"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
									<td nowrap class="table_search_head"><bean:message key="WO_Kind"/></td>
									<td nowrap class="table_search_body">
                                        <bean:define id="wotypeList" name="valMap" property="wotypeList"/>
                                        <html:select name="woVO" property="wo_tp_cd" styleClass="search_form">
                                            <html:options collection="wotypeList" property="cd_val" labelProperty="cd_nm"/>
                                        </html:select>
									</td>
									<td width="25"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
									<td nowrap class="table_search_head_r"><bean:message key="Booking_No"/></td>
									<td class="table_search_body">
										<input type="text" name="bkg_no" value='<bean:write name="woVO" property="bkg_no"/>' class="search_form-disable" style="width:120" readonly>
									</td>
                                    <td width="5px"></td>
                                    <td>
                                        <img id="bkgBtn" src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" align="absmiddle" style="cursor:hand;display:none;" onclick="doWork('BKNO_POPLIST')"/>
                                    </td>
									<td width="15"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
									<td nowrap class="table_search_head"><bean:message key="HBL_No"/></td>
									<td class="table_search_body">
										<input type="text" name="hbl_no" value='<bean:write name="woVO" property="hbl_no"/>' class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:120" readonly>
									</td>
								</tr>
							</table>
						</td>
					</tr>
					<tr>
						<td valign="top" width="400"><!-- 화면 죄측 -->
							<table width="100%" border="0" cellspacing="0" cellpadding="0">
								<tr>
									<td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
								</tr>
							</table>
							<table width="100%" border="0" cellpadding="0" cellspacing="0">
								<tr>
									<td nowrap class="sub_title" width="120"><img src="<%=CLT_PATH%>/web/img/main/sub_title_arrow.gif" width="7" height="7" hspace="1">Route Information</td>
									<td class="sub_title2"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
								</tr>
							</table>
							<table width="100%" border="0" cellspacing="0" cellpadding="0">
								<tr>
									<td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
								</tr>
							</table>					
					<div id="org_route" style="display:block;">
							<table width="440" border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td width="90" nowrap class="table_search_head_r">                                 
                                        <bean:message key="Pickup_CY_1"/>
                                    </td>
                                    <td nowrap class="table_search_body">
										<input type="text"   name="org_rout_nod_cd" class="search_form" style="width:60;"  value='<bean:write name="woVO" property="org_rout_nod_cd"/>' onKeyDown="codeNameAction('Nodecode_org',this, 'onKeyDown')" onBlur="codeNameAction('Nodecode_org',this, 'onBlur')" >
                                        <input type="hidden" name="org_rout_loc_cd" value='<bean:write name="woVO" property="org_rout_loc_cd"/>'>
                                        <img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" id="shipper" style="cursor:hand" align="absmiddle" onclick="openPopUp('Port_POPLIST','org')"/>
                                        <input type="text"   name="org_rout_loc_nm" value='<bean:write name="woVO" property="org_rout_loc_nm"/>'  class="search_form-disable" readOnly style="width:233;" maxlength="50">
                                    </td>
                                </tr>
							</table>
                            <table width="440" border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td width="90" nowrap class="table_search_head">
										<bean:message key="Door_Address"/>
									</td>
                                    <td class="table_search_body">
                                        <textarea name="org_rout_addr" class="search_form" style="width:320;height:37px"><bean:write name="woVO" property="org_rout_addr"/></textarea>
									</td>
                                </tr>
							</table>
                            <table width="440" border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td width="90" nowrap class="table_search_head">
                                        <bean:message key="PIC"/>
                                    </td>
                                    <td width="105" align="right" class="table_search_body">
                                        <input type="text" name="org_rout_pic" value='<bean:write name="woVO" property="org_rout_pic"/>' maxlength="50" class="search_form" style="width:100;">
                                    </td>
                                    <td align="left" valign="top"><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="5"></td>
                                    <td width="57" nowrap class="table_search_head"><bean:message key="Tel_Fax"/></td>
                                    <td align="right" nowrap class="table_search_body">
                                        <input type="text" name="org_rout_pic_phn" value='<bean:write name="woVO" property="org_rout_pic_phn"/>' maxlength="30" class="search_form" onkeyDown="onlyNumberCheck()" style="width:80;">
                                        <input type="text" name="org_rout_pic_fax" value='<bean:write name="woVO" property="org_rout_pic_fax"/>' maxlength="30" class="search_form" onkeyDown="onlyNumberCheck()" style="width:80;" >
                                    </td>
                                </tr>
                            </table>
                            <table width="440" border="0" cellpadding="0" cellspacing="0">
								<tr>
                                    <td width="105" nowrap class="table_search_head_r">                                 
                                        Pickup Order No.
                                    </td>
                                    <td nowrap class="table_search_body" colspanb="4">
                                        <input type="text" name="pkup_ord_no" value='<bean:write name="woVO" property="pkup_ord_no"/>' maxlength="40" class="search_form" style="width:290;">
                                    </td>
                                </tr>
                            </table>
							<table width="440" border="0" cellpadding="0" cellspacing="0">
								<tr>
									<td width="90" nowrap class="table_search_head"><bean:message key="Pickup_Time"/></td>
									<td align="right" class="table_search_body">
										<input type="text" name="org_rout_dt"  value='<wrt:write name="woVO" property="org_rout_dt_tm" formatType="DATE" fromFormat="yyyyMMddHHmm" format="yyyy-MM-dd"/>' maxlength="10" onKeyUp="mkDateFormat(this,event,false)" onBlur="mkDateFormat(this, event, true)" class="search_form" style="width:80;">
										<img id="org_rout_dt_cal" onclick="doDisplay('DATE1', frm1);" src="<%=CLT_PATH%>/web/img/button/btns_calendar.gif" style="cursor:hand;" align="absmiddle"/>
										<input type="text" name="org_rout_tm"  value='<wrt:write name="woVO" property="org_rout_dt_tm" formatType="DATE" fromFormat="yyyyMMddHHmm" format="HH:mm"/>'       class="search_form"  maxlength="5" style="width:50;" onkeyup="timeFormat(this)">
										</td>
									<td align="left" valign="top"><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="5"></td>
								</tr>
							</table>
							<table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td height="10px"></td>
                                </tr>
								<tr>
									
									<td class="sub_title2">&nbsp;</td>								
								</tr>
							</table>
                            <table width="440" border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td width="90" nowrap class="table_search_head">                                 
                                        <bean:message key="Pickup_CY_2"/>
                                    </td>
                                    <td nowrap class="table_search_body">
                                        <input type="text"   name="org2_rout_nod_cd" class="search_form" style="width:60;"  value='<bean:write name="woVO" property="org2_rout_nod_cd"/>' onKeyDown="codeNameAction('Nodecode_org2',this, 'onKeyDown')" onBlur="codeNameAction('Nodecode_org2',this, 'onBlur')" >
                                        <input type="hidden" name="org2_rout_loc_cd" value='<bean:write name="woVO" property="org2_rout_loc_cd"/>'>
                                        <img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" id="shipper" style="cursor:hand" align="absmiddle" onclick="openPopUp('Port_POPLIST','org2')"/>
                                        <input type="text"   name="org2_rout_loc_nm" value='<bean:write name="woVO" property="org2_rout_loc_nm"/>' class="search_form-disable" readOnly style="width:233;"  maxlength="50">
                                    </td>
                                </tr>
                            </table>
                            <table width="440" border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td width="90" nowrap class="table_search_head">
                                        <bean:message key="Door_Address"/>
                                    </td>
                                    <td class="table_search_body">
                                        <textarea name="org2_rout_addr" class="search_form" style="width:320;height:37px"><bean:write name="woVO" property="org2_rout_addr"/></textarea>
                                    </td>
                                </tr>
                            </table>
                            <table width="440" border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td width="90" nowrap class="table_search_head">
                                        <bean:message key="PIC"/>
                                    </td>
                                    <td width="105" align="right" class="table_search_body">
                                        <input type="text" name="org2_rout_pic" value='<bean:write name="woVO" property="org2_rout_pic"/>' maxlength="50" class="search_form" style="width:100;">
                                    </td>
                                    <td align="left" valign="top"><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="5"></td>
                                    <td width="57" nowrap class="table_search_head"><bean:message key="Tel_Fax"/></td>
                                    <td align="right" nowrap class="table_search_body">
                                        <input type="text" name="org2_rout_pic_phn" value='<bean:write name="woVO" property="org2_rout_pic_phn"/>' maxlength="30" class="search_form" onkeyDown="onlyNumberCheck()" style="width:80;">
                                        <input type="text" name="org2_rout_pic_fax" value='<bean:write name="woVO" property="org2_rout_pic_fax"/>' maxlength="30" class="search_form" onkeyDown="onlyNumberCheck()" style="width:80;" >
                                    </td>
                                </tr>
                            </table>
                            <table width="440" border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td width="105" nowrap class="table_search_head">                                 
                                        Pickup Order No.
                                    </td>
                                    <td nowrap class="table_search_body" colspanb="4">
                                        <input type="text" name="pkup_ord_no2" value='<bean:write name="woVO" property="pkup_ord_no2"/>' maxlength="40" class="search_form" style="width:290;">
                                    </td>
                                </tr>
                            </table>
                            <table width="440" border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td width="90" nowrap class="table_search_head"><bean:message key="Pickup_Time"/></td>
                                    <td align="right" class="table_search_body">
                                        <input type="text" name="org2_rout_dt" value='<wrt:write name="woVO" property="org2_rout_dt_tm" formatType="DATE" fromFormat="yyyyMMddHHmm" format="yyyy-MM-dd"/>' maxlength="10" onKeyUp="mkDateFormat(this,event,false)" onBlur="mkDateFormat(this, event, true)" class="search_form" style="width:80;">
                                        <img id="org2_rout_dt_cal" onclick="doDisplay('DATE1', frm1);" src="<%=CLT_PATH%>/web/img/button/btns_calendar.gif" style="cursor:hand;" align="absmiddle"/>
                                        <input type="text" name="org2_rout_tm" value='<wrt:write name="woVO" property="org2_rout_dt_tm" formatType="DATE" fromFormat="yyyyMMddHHmm" format="HH:mm"/>'       class="search_form"  maxlength="5" style="width:50;" onkeyup="timeFormat(this)">
                                        </td>
                                    <td align="left" valign="top"><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="5"></td>
                                </tr>
                            </table>
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                                </tr>
                            </table>
					</div>
                    <div id="via_route" style="display:block;">
							<table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td height="10px"></td>
                                </tr>
                                <tr>
                                    <td class="sub_title2">&nbsp;</td>                              
                                </tr>
                            </table>
							<table border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td width="90" id="objDoor" nowrap class="table_search_head">
                                        <div id="work4"><bean:message key="Door_Place"/></div>
                                        <div id="work5" style="display:none"></div>
                                        <div id="work6" style="display:none"><bean:message key="Door"/></div>
                                    </td>
                                    <td nowrap class="table_search_body">
                                        <input type="text"   name="via_rout_loc_cd" value='<bean:write name="woVO" property="via_rout_loc_cd"/>'  onKeyDown="codeNameAction('Location_via',this, 'onKeyDown')" onBlur="codeNameAction('Location_via',this, 'onBlur')" class="search_form" style="width:60;">
                                        <img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" id="shipper" style="cursor:hand" align="absmiddle" onclick="openPopUp('Port_POPLIST','via')"/>
										<input type="hidden" name="via_rout_nod_cd" class="search_form" style="width:60;"  value='<bean:write name="woVO" property="via_rout_nod_cd"/>'>
                                        <input type="text"   name="via_rout_loc_nm" class="search_form-disable" style="width:233;" value='<bean:write name="woVO" property="via_rout_loc_nm"/>'>
                                    </td>                                   
                                </tr>
                            </table>
                            <table width="440" border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td width="90" nowrap class="table_search_head"><bean:message key="Door_Address"/></td>
                                    <td width="350" class="table_search_body">
										<input type="text" name="via_rout_addr" value="<bean:write name="woVO" property="via_rout_addr"/>" class="search_form"  style="width:325;">
									</td>
                                </tr>
                            </table>
                            <table width="440" border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td width="90" nowrap class="table_search_head"><bean:message key="Door_PIC"/></td>
                                    <td align="right" class="table_search_body">
                                        <input type="text" name="via_rout_pic" value='<bean:write name="woVO" property="via_rout_pic"/>' maxlength="50" class="search_form" style="width:100;">
                                        </td>
                                    <td align="left" valign="top"><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="5"></td>
                                    <td width="57" nowrap class="table_search_head"><bean:message key="Tel_Fax"/></td>
                                    <td align="right" nowrap class="table_search_body">
                                        <input type="text" name="via_rout_pic_phn" value='<bean:write name="woVO" property="via_rout_pic_phn"/>' maxlength="30" class="search_form" onkeyDown="onlyNumberCheck()" style="width:80;">
                                        <input type="text" name="via_rout_pic_fax" value='<bean:write name="woVO" property="via_rout_pic_fax"/>' maxlength="30" class="search_form" onkeyDown="onlyNumberCheck()" style="width:80;">
                                    </td>
                                </tr>
                            </table>
                            <table width="440" border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td width="90" nowrap class="table_search_head"><bean:message key="Door_Time"/></td>
                                    <td align="right" class="table_search_body">
                                        <input type="text" name="via_rout_dt" value='<wrt:write name="woVO" property="via_rout_dt_tm" formatType="DATE" fromFormat="yyyyMMddHHmm" format="yyyy-MM-dd"/>' maxlength="10" onKeyUp="mkDateFormat(this,event,false)" onBlur="mkDateFormat(this, event, true)" class="search_form" style="width:80;">
                                        <img id="via_rout_dt_cal" onclick="doDisplay('DATE2', frm1);" src="<%=CLT_PATH%>/web/img/button/btns_calendar.gif" style="cursor:hand;" align="absmiddle"/>
                                        <input type="text" name="via_rout_tm" value='<wrt:write name="woVO" property="via_rout_dt_tm" formatType="DATE" fromFormat="yyyyMMddHHmm" format="HH:mm"/>'       maxlength="5" style="width:50;" onkeyup="timeFormat(this)" class="search_form">
                                    </td>
                                </tr>
                            </table>
                    </div>
                    <div id="des_route" style="display:block;">
							<table width="100%" border="0" cellspacing="0" cellpadding="0">
								<tr>
									<td height="10px"></td>
								</tr>
                                <tr>
                                    <td class="sub_title2">&nbsp;</td>                              
                                </tr>
                            </table>
							<table width="440" border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td width="90" nowrap class="table_search_head_r">                                 
                                        <bean:message key="Return_CY"/>
                                    </td>
                                    <td nowrap class="table_search_body">
										<input type="text" name="dest_rout_nod_cd" class="search_form" style="width:60;" value='<bean:write name="woVO" property="dest_rout_nod_cd"/>'  onKeyDown="codeNameAction('Nodecode_dest',this, 'onKeyDown')" onBlur="codeNameAction('Nodecode_dest',this, 'onBlur')" >
                                        <input type="hidden" name="dest_rout_loc_cd" type="text" class="search_form" style="width:48;" value='<bean:write name="woVO" property="dest_rout_loc_cd"/>'>
                                        <img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" id="shipper" style="cursor:hand" align="absmiddle" onclick="openPopUp('Port_POPLIST','dest')"/>
                                        <input type="text" name="dest_rout_loc_nm" class="search_form-disable" style="width:233;" value='<bean:write name="woVO" property="dest_rout_loc_nm"/>' readOnly>
									</td>
                                </tr>
                            </table>
                            <table width="440" border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td width="90" nowrap class="table_search_head"><bean:message key="Door_Address"/></td>
                                    <td class="table_search_body">
                                        <textarea name="dest_rout_addr" class="search_form" style="width:325;height:35px"><bean:write name="woVO" property="dest_rout_addr"/></textarea>
                                    </td>
                                </tr>
                            </table>
                            <table width="440" border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td width="90" nowrap class="table_search_head"><bean:message key="Door_PIC"/></td>
                                    <td width="57" align="right" class="table_search_body">
                                        <input name="dest_rout_pic" type="text" class="search_form" style="width:100;" value='<bean:write name="woVO" property="dest_rout_pic"/>' maxlength="50"></td>
                                    <td align="left" valign="top"><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="5"></td>
                                    <td width="57" nowrap class="table_search_head"><bean:message key="Tel_Fax"/></td>
                                    <td align="right" nowrap class="table_search_body">
                                        <input name="dest_rout_pic_phn" maxlength="30" type="text" class="search_form" onkeyDown="onlyNumberCheck()" style="width:80;" value='<bean:write name="woVO" property="dest_rout_pic_phn"/>'>
                                        <input name="dest_rout_pic_fax" maxlength="30" type="text" class="search_form" onkeyDown="onlyNumberCheck()" style="width:80;" value='<bean:write name="woVO" property="dest_rout_pic_fax"/>'>
                                    </td>
                                </tr>
                            </table>
							<table width="440" border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td width="106" nowrap class="table_search_head_r">                                 
                                        <bean:message key="Return_Order_No"/>
                                    </td>
                                    <td nowrap class="table_search_body">
                                        <input type="text" name="dest_ord_no" value='<bean:write name="woVO" property="dest_ord_no"/>' maxlength="40" class="search_form" style="width:290;">
                                    </td>
                                </tr>
							</table>
							<table width="440" border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td width="90" nowrap class="table_search_head">                                 
                                        <bean:message key="Remark"/>
                                    </td>
                                    <td nowrap class="table_search_body">
                                        <textarea name="dest_rmk" class="search_form" style="width:325;height:35px"><bean:write name="woVO" property="dest_rmk"/></textarea>
                                    </td>
                                </tr>
                            </table>
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                                </tr>
                            </table>
                    </div>
                        </td>
                        <td width="15" align="top" valign="top">
                            <img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="15">
                        </td>
<!-- 화면 우측 -->
                        <td align="top" valign="top">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                                </tr>
                            </table>
<!-- Work Ordered TransPorter 시작-->
                            <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td nowrap class="sub_title" width="120"><img src="<%=CLT_PATH%>/web/img/main/sub_title_arrow.gif" width="7" height="7" hspace="1"><bean:message key="Transporter"/></td>
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
                                    <td width="80" nowrap class="table_search_head_r"><bean:message key="Transporter"/></td>
                                    <td align="right" class="table_search_body">
                                        <input type="text" name="trsp_trdp_cd" maxlength="10" class="search_form" style="width:50;" value='<bean:write name="woVO" property="trsp_trdp_cd"/>' onKeyDown="codeNameAction('partner_trdpcode',this, 'onKeyDown')" onBlur="codeNameAction('partner_trdpcode',this, 'onBlur')">
                                        <img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" style="cursor:hand" align="absmiddle" onclick="doWork('PARTNER_POPLIST')"/>
                                        <input type="text" name="trsp_trdp_nm" value='<bean:write name="woVO" property="trsp_trdp_nm"/>' class="search_form" style="width:253;" maxlength="100">
                                    </td>
                                </tr>
                            </table>
                            <table border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td width="80" nowrap class="table_search_head"><bean:message key="PIC"/></td>
                                    <td align="right" class="table_search_body">
                                        <input name="trsp_trdp_pic" maxlength="50" type="text" class="search_form" style="width:100;" value='<bean:write name="woVO" property="trsp_trdp_pic"/>'></td>
                                    <td align="left" valign="top"><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="5"></td>
                                    <td width="57" nowrap class="table_search_head"><bean:message key="Tel_Fax"/></td>
                                    <td align="right" nowrap class="table_search_body">
                                        <input name="trsp_trdp_phn" maxlength="30" type="text" class="search_form" onkeyDown="onlyNumberCheck()" style="width:80;" value='<bean:write name="woVO" property="trsp_trdp_phn"/>'>
                                        <input name="trsp_trdp_fax" maxlength="30" type="text" class="search_form" onkeyDown="onlyNumberCheck()" style="width:80;" value='<bean:write name="woVO" property="trsp_trdp_fax"/>'>
                                    </td>
                                </tr>
                            </table>
                            <table border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td width="80" nowrap class="table_search_head"><bean:message key="Remark"/></td>
                                    <td width="350" class="table_search_body">
                                        <textarea name="rmk" class="search_form"  style="width:325;height:60px"><bean:write name="woVO" property="rmk"/></textarea>
                                    </td>
                                </tr>
                            </table>
<!-- Work Ordered TransPorter 종료-->
<!-- Work Ordered 목록 시작-->
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                                    <td height="7"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                                </tr>
                            </table>
                            <table width="100%" border="0" cellpadding="0" cellspacing="0">
								<tr>
									<td height="0">
										<table width="135" border="0" cellpadding="0" cellspacing="0">
											<tr>
												<td nowrap class="sub_title" width="135"><img src="<%=CLT_PATH%>/web/img/main/sub_title_arrow.gif" width="7" height="7" hspace="1"><bean:message key="Booking_Container"/></td>
											</tr>
										</table>
									</td>
									<td>
										<table width="0" id="mainTable">
                                            <tr>
                                                <td>
                                                 <script language="javascript">comSheetObject('sheet1');</script>
                                                </td>
                                            </tr>
                                        </table>     
									</td>
									<td>
										<table width="18" border="0" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td nowrap class="sub_title" width="170"><img src="<%=CLT_PATH%>/web/img/main/sub_title_arrow.gif" width="7" height="7" hspace="1"><bean:message key="Work_Ordered_Container"/></td>
                                            </tr>
                                        </table>
									</td>
									<td align="right">
										<table id="rowAddBtn" border="0" cellpadding="0" cellspacing="0" style="cursor:hand;display:none;">
											<tr>
												<td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
												<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="tab_bt_name" onClick="javascript:gridAdd(2);"><bean:message key="New"/></td>
												<td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
											</tr>
										</table>
									</td>
								</tr>
                                <tr>
                                    <td nowrap align ="right" width="140">
                                        <table width="100%" id="mainTable">
                                            <tr>
                                                <td>
                                                 <script language="javascript">comSheetObject('sheet2');</script>
                                                </td>
                                            </tr>
                                        </table>        
                                    </td>
                                    <td width="5" align="center">
                                        <img src="<%=CLT_PATH%>/web/img/main/arrow_br.gif" width="20" align="absmiddle">
                                    </td>
                                    <td nowrap align ="right" colspan="2">
                                        <table width="100%" id="mainTable">
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
                                    <td height="10"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                                </tr>
                            </table>
<!-- Work Ordered 목록 종료-->
<!-- Cargo Information 시작 -->
                            <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td nowrap class="sub_title" width="120"><img src="<%=CLT_PATH%>/web/img/main/sub_title_arrow.gif" width="7" height="7" hspace="1">Cargo Infromation</td>
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
                                    <td width="100" nowrap class="table_search_head"><bean:message key="Cargo_Closing"/></td>
                                    <td align="right" class="table_search_body">
                                        <input type="text" name="cgo_clz_dt" maxlength="10" onKeyUp="mkDateFormat(this,event,false)" onBlur="mkDateFormat(this, event, true)" class="search_form" style="width:80;" value='<wrt:write name="woVO" property="cgo_clz_dt_tm" formatType="DATE" fromFormat="yyyyMMddHHmm" format="yyyy-MM-dd"/>'>
                                        <img id="cgo_clz_dt_cal" onclick="doDisplay('DATE4', frm1);" src="<%=CLT_PATH%>/web/img/button/btns_calendar.gif" style="cursor:hand;" align="absmiddle"/>
                                        <input type="text" name="cgo_clz_tm" class="search_form"  maxlength="5" style="width:50;" value='<wrt:write name="woVO" property="cgo_clz_dt_tm" formatType="DATE" fromFormat="yyyyMMddHHmm" format="HH:mm"/>'  onkeyup="timeFormat(this)">
                                        </td>
                                    <td align="left" valign="top"><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="5"></td>
                                </tr>
                            </table>
                            <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td width="50" nowrap class="table_search_head_r"><bean:message key="POL"/></td>
                                    <td nowrap class="table_search_body">
                                        <input type="text"   name="pol_cd" maxlength="5"  value='<bean:write name="woVO" property="pol_cd"/>' class="search_form" onKeyDown="codeNameAction('Location_pol',this, 'onKeyDown')" onBlur="codeNameAction('Location_pol',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50;">
                                        <input type="hidden" name="pol_nod_cd" value=''>
                                        <img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" id="pol" onClick="openPopUp('LOCATION_POPLIST',this)" style="cursor:hand;" align="absmiddle">
                                        <input type="text"   name="pol_nm" maxlength="50" value='<bean:write name="woVO" property="pol_nm"/>' class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;width:160;" readonly>
                                    </td>
                                </tr>
                            </table>
                            <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td width="50" nowrap class="table_search_head_r"><bean:message key="POD"/></td>
                                    <td nowrap class="table_search_body">
                                        <input type="text"   name="pod_cd" maxlength="5" value='<bean:write name="woVO" property="pod_cd"/>' class="search_form" onKeyDown="codeNameAction('Location_pod',this, 'onKeyDown')" onBlur="codeNameAction('Location_pod',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50;">
                                        <input type="hidden" name="pod_nod_cd" value=''>
                                        <img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" id="pod" onClick="openPopUp('LOCATION_POPLIST',this)" style="cursor:hand;" align="absmiddle">
                                        <input type="text"   name="pod_nm" maxlength="50" value='<bean:write name="woVO" property="pod_nm"/>' class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:160;" readonly>
                                    </td>
                                </tr>
                            </table>
                            <table border="0" cellpadding="0" cellspacing="0">
							   <tr>
                                    <td width="80" nowrap class="table_search_head"><bean:message key="Commodity"/></td>
                                    <td nowrap class="table_search_body">
                                        <input type="text" name="cgo_itm_cmdt_cd" value='<bean:write name="woVO" property="cgo_itm_cmdt_cd"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:85;" onKeyDown="codeNameAction('commodity',this, 'onKeyDown')" onBlur="codeNameAction('commodity',this, 'onBlur')">
                                        <img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" style="cursor:hand;" align="absmiddle" onClick="doWork('COMMODITY_POPLIST')" >
                                        <input type="text" name="cgo_itm_cmdt_nm" value='<bean:write name="woVO" property="cgo_itm_cmdt_nm"/>' class="search_form" maxlength="200" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:240;"></td>
                                    </td>
                                </tr>
								<tr>
									<td nowrap class="table_search_head"><bean:message key="Package"/></td>
									<td nowrap class="table_search_body">
										<input type="text" name="cgo_pck_qty" value="<wrt:write name="woVO" property="cgo_pck_qty" formatType="MONEY" format="#,###"/>" onkeyDown="onlyNumberCheck()" onkeyup="numberCommaLen(this,7,0)" maxlength="12"  class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:85;text-align:right"> 
										<bean:define id="pckList" name="valMap" property="pckCdList"/>
										<html:select name="woVO" property="cgo_pck_ut_cd" styleClass="search_form" style="width:120px;">
											<option></option>
											<html:options collection="pckList" property="pck_ut_cd" labelProperty="pck_nm"/>
										</html:select> 
									</td>
								</tr>
								<tr>
									<td nowrap class="table_search_head"><bean:message key="GWeight"/></td>
									<td nowrap class="table_search_body">
										<input type="text" name="grs_wgt" value="<wrt:write name="woVO" property="grs_wgt" formatType="MONEY" format="#,##0.00"/>" onkeyDown="onlyNumberCheck()" onkeyup="numberCommaLen(this,8,2)" onblur="chkComma(this,8,2)" maxlength="13" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:85;text-align:right;">
										<bean:define id="weightunitList" name="valMap" property="weightunitList"/>
										<html:select name="woVO" property="grs_wgt_ut_cd" styleClass="search_form" style="width:100px;">
											<html:options collection="weightunitList" property="cd_val" labelProperty="cd_nm"/>
										</html:select> 
									</td>
								</tr>
								<tr>
									<td nowrap class="table_search_head"><bean:message key="AWeight"/></td>
									<td nowrap class="table_search_body">
										<input type="text" name="act_wgt" value="<wrt:write name="woVO" property="act_wgt" formatType="MONEY" format="#,##0.00"/>" onkeyDown="onlyNumberCheck()" onkeyup="numberCommaLen(this,8,2)" onblur="chkComma(this,8,2)" maxlength="13" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:85;text-align:right;">
										<html:select name="woVO" property="act_wgt_ut_cd" styleClass="search_form" style="width:100px;">
											<html:options collection="weightunitList" property="cd_val" labelProperty="cd_nm"/>
										</html:select>
									</td>
								</tr>
								<tr>
									<td nowrap class="table_search_head"><bean:message key="Measurement"/></td>
									<td nowrap class="table_search_body">
										<input type="text" name="cgo_meas"    value="<wrt:write name="woVO" property="cgo_meas" formatType="MONEY" format="#,##0.0000"/>"  onkeyDown="onlyNumberCheck()" onkeyup="numberCommaLen(this,8,4)" onblur="chkComma(this,8,4)" maxlength="13" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:85;text-align:right;">
										<bean:define id="measureList" name="valMap" property="measureList"/>
										<html:select name="woVO" property="cgo_meas_ut_cd" styleClass="search_form">
											<html:options collection="measureList" property="cd_val" labelProperty="cd_nm"/>
										</html:select>
									</td>
								</tr>
							    <tr>
                                    <td width="80" nowrap class="table_search_head_r"><bean:message key="Liner"/></td>
                                    <td nowrap class="table_search_body">
                                        <input type="text" name="lnr_trdp_cd" value='<bean:write name="woVO" property="lnr_trdp_cd"/>' class="search_form" onKeyDown="codeNameAction('partner_liner',this, 'onKeyDown')" onBlur="codeNameAction('partner_liner',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled;width:50px;">
                                        <img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" id="liner" onClick="openPopUp('LINER_POPLIST',this)" style="cursor:hand" align="absmiddle">
                                        <input type="text" name="lnr_trdp_nm" value='<bean:write name="woVO" property="lnr_trdp_nm"/>' class="search_form" style="width:270px;">
                                    </td>
                                </tr>
                                <tr>
                                    <td width="90" nowrap class="table_search_head"><bean:message key="Liner_Bkg_No"/></td>
                                    <td nowrap class="table_search_body">
                                        <input type="text" name="lnr_bkg_no" value='<bean:write name="woVO" property="lnr_bkg_no"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:150px;" onblur="strToUpper(this)" maxlength="20">
                                    </td>
                                </tr>
                            </table>
							<table border="0" cellpadding="0" cellspacing="0">
                               <tr>
                                    <td width="70" nowrap class="table_search_head"><bean:message key="Line_Code"/></td>
                                    <td width="100" nowrap class="table_search_body">
                                        <input type="text" name="wo_line_cd" value='<bean:write name="woVO" property="wo_line_cd"/>' class="search_form" style="width:85;" maxlength="7">
                                    </td>
									<td width="20px"></td>
                                    <td width="70" nowrap class="table_search_head"><bean:message key="VSL_Code"/></td>
                                    <td width="100" nowrap class="table_search_body">
                                        <input type="text" name="wo_vsl_cd" value='<bean:write name="woVO" property="wo_vsl_cd"/>' class="search_form" style="width:85;" maxlength="10">
                                    </td>
                                    <td width="20px"></td>
                                    <td width="70" nowrap class="table_search_head"><bean:message key="Port_Code"/></td>
                                    <td width="100" nowrap class="table_search_body">
                                        <input type="text" name="wo_port_cd" value='<bean:write name="woVO" property="wo_port_cd"/>' class="search_form" style="width:85;" maxlength="7">
                                    </td>
                                </tr>
							</table>
<!-- Cargo Information 종료 -->
						</td>
                    </tr>
                    <tr>
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
