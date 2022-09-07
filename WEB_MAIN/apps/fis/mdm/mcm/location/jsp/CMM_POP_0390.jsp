<%--
=========================================================
*@FileName   : CMM_POP_0390.jsp
*@FileTitle  : CMM
*@Description: location/node pop
*@author     : 이광훈 - location/node pop
*@version    : 1.0 - 01/06/2009
*@since      : 02/04/2009 화면 전체 수정 화의 담당자 김상근, 정원영, 강길남.

*@Change history:
=========================================================
--%>

<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>

	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<title><bean:message key="system.title"/></title>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>

	<!-- 해당 Action별 js -->
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/PUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="./apps/fis/mdm/mcm/location/script/CMM_POP_0390.js?ver=<%=CLT_JS_VER%>"></script>
	
	<!--ajax 사용시 -->
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	
	<!-- 모달창에서 paging이나 submit 할 경우 꼭 추가해야함. -->
	<base target="_self"/>
</head>
<body leftmargin="0" topmargin="0" marginwidth="0" marginheight="0" onload="javascript:loadPage();">
	<form name="form" method="POST" action="./">
		<!--Command를 담는 공통
		 -->
		<input	type="hidden" name="f_cmd"/>
		<input	type="hidden" name="openMean"/>
		<input	type="hidden" name="f_CurPage"/> 
		
		<input	type="hidden" name="s_conti_code"/> 
		<input	type="hidden" name="s_cnt_code"/>
		<input	type="hidden" name="view_code"/>
		
		<input	type="hidden" name="f_mp_val"/>
		<input	type="hidden" name="f_mp_tp" value="POR" />
		<input	type="hidden" name="f_mp_cd"/>
		<input	type="hidden" name="f_eng_nm"/>

	<table width="800" border="0" cellpadding="0" cellspacing="0">
		<tr>
			<td class="td">
				<table width="100%" border="0" cellpadding="0" cellspacing="0"/>
<!-------------------- title begin -------------------->
					<tr>
						<td width="100%" class="bigtitle"><bean:message key="Location_Code"/> Mapping</td>
					</tr>
<!-------------------- title end -------------------->
					<!--space -->
			        <tr>
			            <td height="4"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
			        </tr>
				    <!--space -->
<!-------------------- button begin -------------------->
					<tr>
						<td height="10" align="right">
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
									<td width="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
									<td style="cursor:hand" onclick="doWork('MAPPING')">
										<table id="btnModify" height="21" border="0" cellpadding="0" cellspacing="0" >
											<tr>
												<td width="11"><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif" width="11" height="21"/></td>
												<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Mapping"/></td>
												<td width="8"><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif" width="8" height="21"/></td>
											</tr>
										</table>
									</td>
									<td width="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
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
						<td>
							<table width="100%" border="0" cellpadding="0" cellspacing="0">
								<tr>
									<td align="left" class="table_search">
										<table width="100%" border="0" cellspacing="0" cellpadding="0">
											<tr>
												<td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
											</tr>
										</table>
										<table height="100%" border="0" cellpadding="0" cellspacing="0">											
											<tr>
												<td width="103" class="table_search_head"><bean:message key="Name_On_AMS"/></td>
												<td width="500" class="table_search_body">
													<input type="text" name="s_name_on_ams" class="search_form-disable" value="" style="width:660"  readOnly />
												</td>
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
					
<!-------------------- button end -------------------->
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
												<td width="70" class="table_search_head"><bean:message key="Name"/></td>
												<td width="150" class="table_search_body">
													<input type="text" name="s_loc_nm" class="search_form" maxlength="50" value="" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:150" onKeyPress="fncTpCodeSearch()"/>
												</td>
												<td width="10"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
												<td width="70" class="table_search_head"><bean:message key="Code"/></td>
												<td width="150" class="table_search_body">
													<input type="text" name="s_loc_cd" class="search_form" maxlength="5"  value="" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:150" onKeyPress="fncTpCodeSearch()"/>
												</td>
												 <input	type="hidden" name="s_loc_tp_code"/>
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
										<bean:define id="tmpMapVal" name="EventResponse" property="mapVal"/>
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
								
								<tr>
									<td colspan="3" style='font-family: "Tahoma", "Arial", "Verdana";font-size: 11px;'>
										<input type="checkbox" name="f_add_mapping" id="f_add_mapping" value="" />
										<b><label for="f_add_mapping"><bean:message key="Add_to_History_of_Trade_Partner_Name"/></label></b>
									</td>								
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