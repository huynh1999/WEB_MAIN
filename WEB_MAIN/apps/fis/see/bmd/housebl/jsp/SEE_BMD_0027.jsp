<%--
=========================================================
*Copyright(c) 2009 CyberLogitec. All Rights Reserved.
=========================================================
=========================================================
*@FileName   : SEE_BMD_0027.jsp
*@FileTitle  : Container Inventory Search
*@Description: Inventory 에 등록된 Container를 조회
*@author     : Kang,Jung-Gu
*@version    : 1.0 - 09/28/2009
*@since      :

*@Change history:
=========================================================
--%>

<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<title><bean:message key="system.title"/></title>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
    <script language="javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/SEE_BMD_0027.js?ver=<%=CLT_JS_VER%>"></script>
	<bean:define id="tmpMapVal" name="EventResponse" property="mapVal"/>
	<bean:define id="tpszList"  name="tmpMapVal" property="cntrTpszList"/>
	<bean:define id="leaseList" name="tmpMapVal" property="leaseCdList"/>
    <script>    
        <% boolean isBegin = false; %>
		
        var LEASECD1 = '';
        var LEASECD2 = '';
        
        <% isBegin = false; %>
        <!--Lease/Type-->
        <logic:iterate id="codeVO" name="leaseList">
            <% if(isBegin){ %>
                LEASECD1+= '|';
                LEASECD2+= '|';
            <% }else{
                  isBegin = true;
               } %>
            LEASECD1+= '<bean:write name="codeVO" property="cd_nm"/>';
            LEASECD2+= '<bean:write name="codeVO" property="cd_val"/>';
        </logic:iterate>
   </script>
</head>
<body leftmargin="0" topmargin="0" marginwidth="0" marginheight="0" onload="javascript:loadPage();doWork('SEARCHLIST')">
	<form name="frm1" method="POST" action="./">
		<!--Command를 담는 공통		 -->
		<input	type="hidden" name="f_cmd"/>
		<input	type="hidden" name="openMean"/>
		<input	type="hidden" name="f_CurPage"/> 	
		<input	type="hidden" name="rgst_cntr_yn"/> 	
		
	<table width="650" border="0" cellpadding="0" cellspacing="0">
		<tr>
			<td class="td">
				<table width="100%" border="0" cellpadding="0" cellspacing="0"/>
					<tr>
						<td width="100%" class="bigtitle"><bean:message key="Container_Inventory_Search"/></td>
					</tr>
			        <tr>
			            <td height="4"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
			        </tr>
					<tr>
						<td height="10"align="right">
							<table border="0" cellspacing="0" cellpadding="0">
								<tr>
									<td style="cursor:hand" onclick="doWork('SEARCHLIST')">
										<table height="21" border="0" cellpadding="0" cellspacing="0" >
											<tr>
												<td width="11"><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif" width="11" height="21"/></td>
												<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Search"/></td>
												<td width="8"><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif" width="8" height="21"/></td>
											</tr>
										</table>
									</td>
                                    <td width="3">&nbsp;</td>
                                    <td style="cursor:hand" onclick="doWork('APPLY')" id="apply">
                                        <table height="21" border="0" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td width="11"><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif" width="11" height="21"/></td>
                                                <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Apply"/></td>
                                                <td width="8"><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif" width="8" height="21"/></td>
                                            </tr>
                                        </table>
                                    </td>
									<td width="3">&nbsp;</td>
									<td style="cursor:hand" onclick="doWork('CLOSE')">
										<table height="21" border="0" cellpadding="0" cellspacing="0">
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
					<tr>
						<td height="7"></td>
					</tr>
<!-------------------- search begin -------------------->
					<tr>
						<td>
							<table width="100%" border="0" cellpadding="0" cellspacing="0">
								<tr>
									<td align="left" class="table_search_bg">
										<table width="100%" border="0" cellspacing="0" cellpadding="0">
											<tr>
												<td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
											</tr>
										</table>
										<table height="100%" border="0" cellpadding="0" cellspacing="0">
											<tr>
												<td width="60" class="table_search_head"><bean:message key="Lessor"/></td>
												<td width="210" class="table_search_body">
													<input type="text" name="f_cntr_sprl_trdp_cd" class="search_form" value="" style="width:60"/>
													<img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" id="shipper" onClick="openPopUp()" style="cursor:hand" align="absmiddle">
													<input type="text" name="f_cntr_sprl_trdp_nm" class="search_form-disable" value="" style="width:120" readonly>
												</td>
                                                <td width="10"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
                                                <td width="70" class="table_search_head"><bean:message key="Type_Size"/></td>
                                                <td width="150" class="table_search_body">
													<select name="f_cntr_tpsz_cd">
														<option value=""></option>
											    <logic:iterate id="codeVO" name="tpszList">
														<option value="<bean:write name="codeVO" property="cntr_tpsz_cd"/>"><bean:write name="codeVO" property="cntr_tpsz_cd"/></option>
												</logic:iterate>
													</select>
                                                </td>
												<td></td>
											</tr>
										</table>
										<table width="100%" border="0" cellspacing="0" cellpadding="0">
											<tr>
												<td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
											</tr>
										</table>
									</td>
								</tr>
							</table>
						</td>
					</tr>
<!-------------------- search end -------------------->
					<tr>
						<td>
							<table width="100%" border="0" cellspacing="0" cellpadding="0">
						        <tr>
						            <td height="4"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
						        </tr>
						    </table>
							<table border="0" width="100%" id="mainTable">								
								<tr>
									<td colspan = "2">
								     	<script language="javascript">comSheetObject('sheet1');</script>
								     </td>
								</tr>
							</table>
							<table border="0" width="100%">
								<tr>
									<td width="55">
				<!-------------------- Display option Begin -------------------->
										<bean:define id="pagingVal" name="tmpMapVal"     property="paging"/>
										<paging:options name="pagingVal" defaultval="200"/>
			<!-------------------- Display option End -------------------->					
									</td>								
									<td align="center">
										<table>
											<tr>
												<td id="pagingTb" style='font-family: "Tahoma", "Arial", "Verdana";font-size: 11px;'>
												</td>
											</tr>
										</table>		
									</td>
                                    <td width="55"></td>
								</tr>
							</table>
						</td>
					</tr>
				</table>
			</td>
		</tr>
	</table>		
	</form>
</body>
</html>