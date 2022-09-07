<%--
=========================================================
*@FileName	: ACC_INV_0050.jsp
*@FileTitle	: Performance Report1
*@Description: Performance Report1
*@author	 : Kang dae soo - Cyberlogitec
*@version	: 1.0 - 11/15/2009
*@since		: 11/15/2009

*@Change history:
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"	prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
		<title><bean:message key="system.title"/></title>
	<!-- 일자 및 달력팝업 호출 -->
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/ACC_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="./apps/fis/acc/inv/report/script/ACC_INV_0050.js?ver=<%=CLT_JS_VER%>"></script>

<style> body { border-top-width: 6px!important; } </style>
</head>
<body class="td" onload="javascript:loadPage();">
	<form name="frm1" method="POST" action="./">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd"/> 
	<input type="hidden" name="f_CurPage"/>
	<!-- 타이틀, 네비게이션 -->
	<table width="950" border="0" cellspacing="0" cellpadding="0">
		<tr>
			<td class="bigtitle"><bean:message key="Sales_Profit_Report_I"/></td>
			<td align="right" nowrap="nowrap" class="navi"><img src="<%=CLT_PATH%>/web/img/main/navi_icon.gif" width="6" height="5" hspace="3" vspace="5" align="texttop"><bean:message key="Home"/> > <bean:message key="MDM"/> > <span class="navi_b"><bean:message key="Sales_Profit_Report_I"/></span></td>
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
						<td style="cursor:hand" onclick="doWork('SEARCHLIST')">
							<table height="21" border="0" cellpadding="0" cellspacing="0" >
								<tr>
									<td width="11"><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif" width="11" height="21"></td>
									<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Search"/></td>
									<td width="8"><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif" width="8" height="21"></td>
								</tr>
							</table>
						</td>
						<td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="10"></td>
						<td style="cursor:hand" onclick="doWork('NEW')">
							<table height="21" border="0" cellpadding="0" cellspacing="0">
								<tr>
									<td width="11"><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif" width="11" height="21"></td>
									<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="New"/></td>
									<td width="8"><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif" width="8" height="21"></td>
								</tr>
							</table>
						</td>
						<td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="10"></td>
						<td style="cursor:hand" onclick="doWork('PRINT')">
							<table id="btnPrint" height="21" border="0" cellpadding="0" cellspacing="0">
								<tr>
									<td width="11"><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif" width="11" height="21"></td>
									<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Print"/></td>
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
				<td height="4"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
				</tr>
			</table>
			<table width="100%" border="0" cellspacing="0" cellpadding="0">
				<tr>
				<td width="120" align="left" valign="top">
					<table border="0" cellpadding="0" cellspacing="0">
						<tr>
							<td width="65" class="table_search_head_r"><bean:message key="Sea_Air"/></td>
                               <td class="table_search_body">
                               	<select name="air_sea_clss_cd" class="search_form">
                               		<option value="S">Sea</option>
                               		<option value="A">Air</option>
                               	</select>
							</td>
							<td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="10"></td>
							<td width="60" class="table_search_head_r"><bean:message key="Bound"/></td>
							<td class="table_search_body">
								<select name="bnd_clss_cd" class="search_form">
								<bean:define id="rtnMap" name="EventResponse" property="mapVal"/>
									<option value=''>ALL</option>
									<bean:define id="param1List"  name="rtnMap" property="PARAM1"/>
	                            	<logic:iterate id="codeVO" name="param1List">
									<option value='<bean:write name="codeVO" property="cd_val"  filter="false"/>'><bean:write name="codeVO" property="cd_nm"  filter="false"/></option>
									</logic:iterate>
								</select>
							</td>
							<td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="10"></td>
							<td width="30" nowrap="nowrap" class="table_search_head_r"><bean:message key="ETD_ETA"/></td>
							<td nowrap="nowrap" class="table_search_body">
								<input name="fm_et_dt" type="text" value='' onKeyUp="mkDateFormat(this,event,false)" onBlur="mkDateFormat(this, event, true)" class="search_form" style="width:72px;" maxlength="12"/>
								<img id="fm_et_dt_cal" src="<%=CLT_PATH%>/web/img/button/btns_calendar.gif" onclick="doDisplay('DATE1', frm1);" align="absmiddle" style="cursor:pointer"/>
								~
								<input name="to_et_dt" type="text" value='' onKeyUp="mkDateFormat(this,event,false)" onBlur="mkDateFormat(this, event, true)" class="search_form" style="width:72px;" maxlength="12"/>
								<img id="to_et_dt_cal" src="<%=CLT_PATH%>/web/img/button/btns_calendar.gif" onclick="doDisplay('DATE2', frm1);" align="absmiddle" style="cursor:pointer"/>
							</td>
							<td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="10"></td>
							<td width="60" nowrap="nowrap" class="table_search_head_r"><bean:message key="Team"/></td>
							<td nowrap="nowrap" class="table_search_body">
							<select name="dept_cd">
								<bean:define id="param2List"  name="rtnMap" property="PARAM2"/>
	                            	<option value=''>ALL</option>
	                            	<logic:iterate id="codeVO" name="param2List">
									<option value='<bean:write name="codeVO" property="cd_val"  filter="false"/>'><bean:write name="codeVO" property="cd_nm"  filter="false"/></option>
									</logic:iterate>
							</select>
							</td>
							
						</tr>
					</table>
				</td>
				</tr>
				<tr>
				<td width="120" align="left" valign="top">
					<table border="0" cellpadding="0" cellspacing="0">
						 <tr>
							<td width="30" nowrap="nowrap" class="table_search_head"><bean:message key="POL"/></td>
							<td nowrap="nowrap" class="table_search_body">
								<input name="pol_cd" maxlength="5" value='' type="text" class="search_form" onKeyDown="codeNameAction('Location_pol',this, 'onKeyDown')" onBlur="codeNameAction('Location_pol',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:50;">
								<img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" id="pol" onClick="doWork('POL_POPLIST')" style="cursor:hand;" align="absmiddle">
							</td>
							<td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="10"></td>
							<td width="30" nowrap="nowrap" class="table_search_head"><bean:message key="POD"/></td>
							<td nowrap="nowrap" class="table_search_body">
								<input name="pod_cd" maxlength="5" value='' type="text" class="search_form" onKeyDown="codeNameAction('Location_pod',this, 'onKeyDown')" onBlur="codeNameAction('Location_pod',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:50;">
								<img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" id="pod" onClick="doWork('POD_POPLIST')" style="cursor:hand;" align="absmiddle">
							</td>
							<td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="10"></td>
							<td width="30" nowrap="nowrap" class="table_search_head"><bean:message key="DEL"/></td>
							<td nowrap="nowrap" class="table_search_body">
								<input name="del_cd" maxlength="5" value='' type="text" class="search_form" onKeyDown="codeNameAction('Location_del',this, 'onKeyDown')" onBlur="codeNameAction('Location_del',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:50;">
								<img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" id="del" onClick="doWork('DEL_POPLIST')" style="cursor:hand;" align="absmiddle">
							</td>
							<td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="17"></td>
							<td width="30" nowrap="nowrap" class="table_search_head"><bean:message key="User"/></td>
							<td nowrap="nowrap" class="table_search_body">
								<input name="usr_cd" value='' type="text" class="search_form" onKeyDown="codeNameAction('user',this, 'onKeyDown')" onBlur="codeNameAction('user',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:50;">
								<img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" id="user" onClick="doWork('USER_POPLIST')" style="cursor:hand;" align="absmiddle">
								<input name="usr_nm" value='' type="text" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:100;" disabled="true">
							</td>
							<td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="17"></td>
							<td width="60" nowrap="nowrap" class="table_search_head"><bean:message key="Customer"/></td>
							<td nowrap="nowrap" class="table_search_body">
								<input name="trdp_cd" maxlength="20" value='' type="text" class="search_form" onKeyDown="codeNameAction('trdpCode',this, 'onKeyDown')" onBlur="codeNameAction('trdpCode',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:50;">
								<img src="<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" id="trdp_cd" onClick="doWork('CUSTOMER_POPLIST')" style="cursor:hand;" align="absmiddle">
								<input name="trdp_nm" maxlength="50" value='' type="text" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:100;" disabled="true">
							</td>
							<td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="10"></td>
						</tr>
					</table>
				</td>
			</tr>
			</table>
			<!-- 간격 -->
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
			<td height="10"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
		</tr>
	</table>
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
					 <td nowrap="nowrap" width="120">
                    	<table border="0" cellpadding="0" cellspacing="0">
                    		<tr>
                    			<td nowrap="nowrap"  class="sub_title"  width="120">
                    				<img src="<%=CLT_PATH%>/web/img/main/sub_title_arrow.gif" width="7" height="7" hspace="1"><bean:message key="Basic_Information"/>
                    			</td>
                    		</tr>
                    	</table>
                    </td>
					 <td class="sub_title2"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
					 <td align="right" style="cursor:hand" onclick="doWork('EXCEL')" width="75" id="excel" style="display:none">
                         <table height="21" border="0" cellpadding="0" cellspacing="0">
                             <tr>
                                 <td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"/></td>
                                 <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Excel"/></td>
                                 <td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"/></td>
                             </tr>
                         </table>            
                     </td>
					 <td align="right" style="cursor:hand" onclick="doWork('ROWADD')">
							<table height="21" border="0" cellpadding="0" cellspacing="0" id="rowAdd" style="display:none">
								<tr>
									<td width="11"><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif" width="11" height="21"></td>
									<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="New"/></td>
									<td width="8"><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif" width="8" height="21"></td>
								</tr>
							</table>
						</td>
					</tr>
				</table>
				<table width="100%" border="0" cellspacing="0" cellpadding="0">
					<tr>
					<td height="4"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
					</tr>
				</table>
				<!-- 간격 -->
				<table border="0" width="100%">
					<tr>
						<td>
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
		<td height="4"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
		</tr>
	</table>
	</form>
<script>
	var pDoc = parent.parent.parent.document;
	hideProcess('WORKING', pDoc);
</script>
</body>
</html>


