<%--
=========================================================
*@FileName   : MDM_MCM_0020.jsp
*@FileTitle  : Sub Continent Code
*@Description: Sub Continent Code
*@author     : Choi,Gil-Ju - Cyberlogitec
*@version    : 1.0 - 01/08/2009
*@since      : 01/08/2009

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
	<!-- 일자 및 달력팝업 호출 -->
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/mdm/mcm/location/script/MDM_MCM_0020.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/MDM_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
</head>
<body class="td" onload="javascript:loadPage();">
	<form name="frm1" method="POST" action="./">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd"/> 
	<input type="hidden" name="f_CurPage"/>
        <!-- 타이틀, 네비게이션 -->
    <table width="950" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td class="bigtitle"><%=LEV3_NM%></td>
            <td align="right" nowrap class="navi"><img src="<%=CLT_PATH%>/web/img/main/navi_icon.gif" width="6" height="5" hspace="3" vspace="5" align="texttop"><%=LEV1_NM%> > <%=LEV2_NM%> > <span class="navi_b"><%=LEV3_NM%></span></td>
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
                        <td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="4"></td>
                        <td style="cursor:hand"onclick="displayClear()">
                            <table height="21" border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
                                    <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="New"/></td>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
                                </tr>
                            </table>            
                        </td>
                        <td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="4"></td>
                        <td style="cursor:hand" onclick="doWork('SEARCH')">
							<table id="btnSave" height="21" border="0" cellpadding="0" cellspacing="0">
								<tr>
									<td width="11"><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif" width="11" height="21"></td>
									<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Save"/></td>
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
                <td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
              </tr>
            </table>
          <!-- 간격 -->
            <table width="100%" border="0" cellpadding="0" cellspacing="0">
              <tr>
                <td nowrap class="sub_title" width="120"><img src="<%=CLT_PATH%>/web/img/main/sub_title_arrow.gif" width="7" height="7" hspace="1"><bean:message key="Search_Condition"/></td>
                <td class="sub_title2"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
              </tr>
            </table>
            <table width="100%" border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td height="4"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
              </tr>
            </table>
            <table width="100%" border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td width="430" align="left" valign="top">
                    <table border="0" cellpadding="0" cellspacing="0">
                        <tr>
                            <td width="150" nowrap class="table_search_head"><bean:message key="Sub_Continent_Name"/></td>
                            <td nowrap class="table_search_body">
                            	<bean:define id="paramMap" name="EventResponse" property="mapVal"/>
                            	<input name="s_locl_nm" type="text" value='<bean:write name="paramMap" property="s_locl_nm"/>' class="search_form" style="width:150px;" onKeyPress="fncSubContinentSearch()">
                            </td>
                        </tr>
                    </table>
                </td>
                <td width="400" align="left" valign="top">
                    <table border="0" cellpadding="0" cellspacing="0">
                        <tr>
                            <td width="130" nowrap class="table_search_head"><bean:message key="Sub_Continent_Code"/></td>
                            <td nowrap class="table_search_body">
                            	<select name="s_conti_cd" style="width:100px;">
                            		<bean:define id="paramContiList"  name="paramMap" property="contiList"/>
									<logic:iterate id="ContiVO" name="paramContiList">
                            			<option value='<bean:write name="ContiVO" property="conti_cd"/>'><bean:write name="ContiVO" property="eng_nm"/></option>
                            		</logic:iterate>
                            	</select>
                            </td>
                        </tr>
                    </table>
                </td>
                <td width="150" align="left" valign="top">
                    <table border="0" cellpadding="0" cellspacing="0">
                        <tr>
                            <td width="30" nowrap class="table_search_head"><bean:message key="USE"/></td>
                            <td nowrap class="table_search_body">
                            	<input name="s_use_flg" id="s_use_flg1" type="radio" value="Y" <logic:equal name="paramMap" property="s_use_flg" value="Y">checked</logic:equal>><label for="s_use_flg">Yes</label>&nbsp;&nbsp;
                            	<input name="s_use_flg" id="s_use_flg2" type="radio" value="N" <logic:equal name="paramMap" property="s_use_flg" value="N">checked</logic:equal>><label for="s_use_flg2">No</label>&nbsp;&nbsp;
                            	<input name="s_use_flg" id="s_use_flg3" type="radio" value=""  <logic:equal name="paramMap" property="s_use_flg" value="">checked</logic:equal>><label for="s_use_flg3">All</label>&nbsp;&nbsp;
                            </td>
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
            <td width="480" align="left" class="table_search_bg">
                <!-- 간격 -->
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                    </tr>
                </table>
                <table width="100%" border="0" cellpadding="0" cellspacing="0">
                  <tr>
                    <td nowrap class="sub_title" width="120"><img src="<%=CLT_PATH%>/web/img/main/sub_title_arrow.gif" width="7" height="7" hspace="1"><bean:message key="Continent_List"/></td>
                     <td class="sub_title2"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
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
					<!-------------------- RowAdd button begin -------------------->
					<tr>
						<td>
							<table width="480" border="0" cellpadding="0" cellspacing="0">
								<tr>
									<td width="40px">
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
									<td width="65px" height="10" colspan="2" align="right">&nbsp;</td>
								</tr>
							</table>
						</td>
					</tr>
<!-------------------- RowAdd button end -------------------->
				</table>
            <!-- 간격 -->
            </td>
            <td width="10">&nbsp;</td>
            <td align="left" class="table_search_bg" valign="top">
                <!-- 간격 -->
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
	              <tr>
	                <td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
	              </tr>
	            </table>
	          	<!-- 간격 -->
	            <table width="100%" border="0" cellpadding="0" cellspacing="0">
	              <tr>
	                <td nowrap class="sub_title" width="120"><img src="<%=CLT_PATH%>/web/img/main/sub_title_arrow.gif" width="7" height="7" hspace="1"><bean:message key="Basic_Information"/></td>
	                <td class="sub_title2"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
	              </tr>
	            </table>
	            <table width="100%" border="0" cellspacing="0" cellpadding="0">
	              <tr>
	                <td height="4"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
	              </tr>
	            </table>
	            <table width="100%" border="0" cellspacing="0" cellpadding="0">
	              <tr>
	                <td align="left" valign="top">
	                    <table border="0" cellpadding="0" cellspacing="0">
	                        <tr>
	                            <td width="130" nowrap class="table_search_head_r"><bean:message key="Sub_Continent_Code"/></td>
	                            <td nowrap class="table_search_body">
	                            	<input name="i_conti_cd" type="text" class="search_form" dataformat="excepthan" style="width:30px;text-transform:uppercase;ime-mode:disabled;" maxlength="2" onBlur="javascript:this.value=this.value.toUpperCase();">
	                            </td>
	                        </tr>
	                    </table>
	              </tr>
	            </table>
	            <table width="100%" border="0" cellspacing="0" cellpadding="0">
	              <tr>
	                <td align="left" valign="top">
	                    <table border="0" cellpadding="0" cellspacing="0">
	                        <tr>
	                            <td width="130" nowrap class="table_search_head_r"><bean:message key="Continent_Code"/></td>
	                            <td nowrap class="table_search_body">
	                            	<select name="i_prnt_conti_cd" style="width:100px;">
	                            		<bean:define id="paramContiList"  name="paramMap" property="contiList"/>
										<logic:iterate id="ContiVO" name="paramContiList">
	                            			<option value='<bean:write name="ContiVO" property="conti_cd"/>'><bean:write name="ContiVO" property="eng_nm"/></option>
	                            		</logic:iterate>
	                            	</select>
	                            </td>
	                        </tr>
	                    </table>
	              </tr>
	            </table>
	            <table width="100%" border="0" cellspacing="0" cellpadding="0">
	              <tr>
	                <td height="4"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
	              </tr>
	            </table>
                <table border="0" cellpadding="0" cellspacing="0">
                    <tr>
                        <td width="100" nowrap class="table_search_head_r"><bean:message key="Name_Local"/></td>
                        <td align="right" class="table_search_body"><input name="i_locl_nm" type="text" class="search_form" style="width:180;" maxlength="100" OnBlur="javascript:this.value=this.value.toUpperCase();"></td>
                        <td width="10" align="left" valign="top"><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="20"></td>
                        <td width="60" nowrap class="table_search_head"><label for="i_use_flg"><bean:message key="Use_YN"/></label></td>
                        <td width="20" valign="top" class="table_search_body"><input name="i_use_flg" id="i_use_flg" type="checkbox" value="" onClick="useFlgChange();" checked></td>
                    </tr>
                </table>
                <table border="0" cellpadding="0" cellspacing="0">
                    <tr>
                        <td width="100" nowrap class="table_search_head_r"><bean:message key="Name_Eng"/></td>
                        <td align="right" class="table_search_body"><input name="i_eng_nm" type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:180;" maxlength="100" onBlur="javascript:this.value=this.value.toUpperCase();"></td>
                    </tr>
                </table>
                <table border="0" cellpadding="0" cellspacing="0">
                    <tr>
                        <td width="100" nowrap class="table_search_head"><bean:message key="Description"/><br></td>
                        <td class="table_search_body"><textarea name="i_desc" class="search_form" style="width:300;height:40px"></textarea>
                        </td>
                    </tr>
                </table>
				<table border="0" cellpadding="0" cellspacing="0">
					<tr>
						<td width="85" nowrap class="table_search_head"><bean:message key="Created"/></td>
						<td nowrap class="table_search_body"><bean:message key="By"/>
							<input name="i_rgst_usrid" type="text" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;width:100px;text-align:left" readOnly> <bean:message key="at"/>
							<input name="i_rgst_tms" type="text" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;width:100px;text-align:left" readOnly>
						</td>
					</tr>
				</table>
				<table border="0" cellpadding="0" cellspacing="0">
					<tr>
						<td width="85" nowrap class="table_search_head"><bean:message key="Modified"/></td>
						<td nowrap class="table_search_body"><bean:message key="By"/>
							<input name="i_modi_usrid" type="text" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;width:100px;text-align:left" readOnly> <bean:message key="at"/>
							<input name="i_modi_tms" type="text" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;width:100px;text-align:left" readOnly>
						</td>
					</tr>
				</table>
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                    </tr>
                </table>
            <!-- 간격 -->
            </td>
        </tr>
    </table>
	</form>
</body>
</html>
<script>
	var pDoc = parent.parent.parent.document;
	hideProcess('WORKING', pDoc);
	document.frm1.s_conti_cd.value = '<bean:write name="paramMap" property="s_conti_cd"/>';
</script>