<%--
=========================================================
*@FileName   : ACC_SLP_0050.jsp
*@FileTitle  : Trade Parter Interface
*@Description: Trade Parter Interface
*@author     : Chungrue - Cyberlogitec
*@version    : 1.0 - 2012/02/13
*@since      : 2012/02/13

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
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/ACC_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="./apps/fis/acc/slp/slip/script/ACC_SLP_0050.js?ver=<%=CLT_JS_VER%>" />
	
	<bean:define id="valMap"   name="EventResponse" property="mapVal"/>
	
	<script>
		var pDoc = parent.parent.parent.document;
		hideProcess('WORKING', pDoc);

	</script>
	
	
</head>
<body class="td" onload="javascript:loadPage();">
	<form name="frm1" method="POST" action="./ACC_SLP_0050.clt">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd"/>
	<input type="hidden" name="f_CurPage"/>
	
	
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
            <td height="4"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
        </tr>
    </table>
    <!--빈공간 -->
    <!-- 소타이틀, 대버튼 -->
    <table width="1200" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td align="right">
                <table border="0" cellspacing="0" cellpadding="0">
                    <tr>
                    	<td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="4"></td>
                        <td style="cursor:hand" onclick="doWork('SEARCHLIST')">
							<table height="21" border="0" cellpadding="0" cellspacing="0">
								<tr>
									<td width="11"><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif" width="11" height="21"></td>
									<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Search"/></td>
									<td width="8"><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif" width="8" height="21"></td>
								</tr>
							</table>
						</td>
						<td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="4"></td>
                        <td style="cursor:hand" onclick="clearAll()">
							<table height="21" border="0" cellpadding="0" cellspacing="0">
								<tr>
									<td width="11"><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif" width="11" height="21"></td>
									<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Clear"/></td>
									<td width="8"><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif" width="8" height="21"></td>
								</tr>
							</table>
						</td>
						
                        <td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="4"></td>
                        <td style="cursor:hand" onclick="doWork('INTERFACE')">
                            <table height="21" border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
                                    <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Interface"/></td>
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
				
				<table border="0" width="100%" cellpadding="0" cellspacing="0">
					<tr>
						<td>
							<table border="0" width="257" cellpadding="0" cellspacing="0">
								<tr>
									<td width="100" nowrap class="table_search_head_r"><bean:message key="Branch"/></td>
									<td width="153" class="table_search_body">
			                            <bean:define id="oficeList" name="valMap" property="ofcList"/>
			                            <select name="s_ofc_cd" style="width:150px;"/>
                            
			                            <bean:size id="len" name="oficeList" />
			                            <logic:greaterThan name="len" value="1">
			                            <option value=''>ALL</option>
			                            </logic:greaterThan>

			                        	<logic:iterate id="ofcVO" name="oficeList">
			                                <option value='<bean:write name="ofcVO" property="ofc_cd"/>'><bean:write name="ofcVO" property="ofc_cd"/></option>
			                        	</logic:iterate>
			                            </select>
			                        </td>
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
			</td>
		</tr>
		
		
		
		<tr>
			<td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
		</tr>
		
		
		<tr>
			<td align="left" class="table_search_bg">
				<table width="100%" border="0" cellspacing="0" cellpadding="0">
					<tr>
						<td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
					</tr>
				</table>
				
				<table border="0" width="100%" cellpadding="0" cellspacing="0">
					<tr>
						<td>
							<table border="0" width="257" cellpadding="0" cellspacing="0">
								<tr>
									<td width="100" nowrap class="table_search_head_r"><bean:message key="Acct_Company"/></td>
									<td width="153" class="table_search_body">
										<select name="f_cust_cd" style="width:153px;">
			                        		<bean:define id="paramAcctList"  name="valMap" property="acctList"/>
											<logic:iterate id="AcctVO" name="paramAcctList">
			                        			<option value='<bean:write name="AcctVO" property="ACCT_IF_CMP"/>'><bean:write name="AcctVO" property="ACCT_IF_CMP"/></option>
			                        		</logic:iterate>
			                        	</select>
									</td>
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
			</td>
		</tr>
		
		
	</table>
	
    <!--빈공간 -->
    <table width="1200" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td height="10"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
        </tr>
    </table>
    
    
	<table width="1200" border="0" cellpadding="0" cellspacing="0">
        <tr>
            <td align="left" class="table_search_bg">
				<!-- 간격 -->
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
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
				
				<table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                    </tr>
                </table>
			</td>
		</tr>
	</table>
	</form>
</body>
</html>