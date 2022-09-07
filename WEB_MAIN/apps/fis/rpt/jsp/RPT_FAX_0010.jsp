<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
    <%@include file="./../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/PFM_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/rpt/RPT_FAX_0010.js?ver=<%=CLT_JS_VER%>"></script>
	
<%
	String ofcLoclNm = userInfo.getOfc_locl_nm();
	String ofcCd = userInfo.getOfc_cd();
	String title = request.getParameter("f_title");
	
	String rntUrl = "http://" + request.getServerName() + ":" + request.getServerPort()
		+ CLT_PATH + "/apps/fis/rpt/jsp/RPT_FAX_0011.jsp";
%>
	
</head>
<body class="td" onload="javascript:loadPage();">
<form name="frm1" method="POST" action="./" enctype="multipart/form-data">
	<input	type="hidden" name="f_cmd"/> 
	<!-- Report Value -->
	<input	type="hidden" name="cmd_type"/>
	<input	type="hidden" name="stamp"/>
	<input	type="hidden" name="all"/>
	
	<!-- Fax 전송 관련 -->
	<input type="hidden" name="m_id" value="">
	<input type="hidden" name="m_pw" value="">
	<input type="hidden" name="m_corpfrcode" value="">
	<input type="hidden" name="subject" value="<%= title %>">
	<input type="hidden" name="m_fax" value="">
	<input type="hidden" name="faxNumbersFile" value="">
	<input type="hidden" name="returnURL" value="<%= rntUrl %>">
	<input type="hidden" name="etc1" value="<%= CLT_PATH %>">
	
	<input	type="hidden" name="f_intg_bl_seq" value=""/>
	<input	type="hidden" name="f_ofc_locl_nm" value="<%= ofcLoclNm %>"/>
	<input	type="hidden" name="f_ofc_cd" value="<%= ofcCd %>"/>
	
	<!-- 소타이틀, 대버튼 -->
    <table width="550" border="0" cellspacing="0" cellpadding="0">
    	<!-------------------- title begin -------------------->
		<tr>
			<td width="100%" class="bigtitle" align="left">Fax</td>
		</tr>
		<!-------------------- title end -------------------->
		<!--space -->
        <tr>
            <td height="4"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
        </tr>
	    <!--space -->
		<!-------------------- button begin -------------------->
        <tr>
            <td align="right">
                <table border="0" cellspacing="0" cellpadding="0">
                    <tr>
                    	<td style="cursor:hand" onclick="doWork('SEND')">
							<table height="21" border="0" cellpadding="0" cellspacing="0">
								<tr>
									<td width="11"><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif" width="11" height="21"/></td>
									<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Send"/></td>
									<td width="8"><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif" width="8" height="21"/></td>
								</tr>
							</table>
						</td>
						<td width="3">&nbsp;</td>
                        <td style="cursor:hand" onclick="doWork('CLOSE');">
                            <table height="21" border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
                                    <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Close"/></td>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
                                </tr>
                            </table>            
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    <!-- 간격 -->
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td height="7"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
        </tr>
    </table>
    <!-- 간격 -->
    <table width="550" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td align="left" class="table_search_bg">
                <table border="0" cellpadding="0" cellspacing="0">
			        <tr>
			            <td width="100" nowrap class="table_search_head"><bean:message key="Title"/></td>
			            <td nowrap class="table_search_body">
			            	<input name="f_title" type="text" value="<%= title %>" style="width:250px;" class="search_form" readOnly>
			            </td>
			        </tr>
			    </table>
            </td>
        </tr>
    </table>
    <!-- 간격 -->
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td height="7"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
        </tr>
    </table>
	<!-- 간격 -->
    <table width="550" border="0" cellpadding="0" cellspacing="0">
      	<tr>
        	<td align="left" class="table_search_bg">
	            <table width="100%" border="0" cellspacing="0" cellpadding="0">
	              <tr>
	                <td height="4"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
	              </tr>
	            </table>
            
	            <table border="0" cellpadding="0" cellspacing="0">
	            	<tr>
		                <td width="100" colspan='2' nowrap class="table_search_head"><bean:message key="Fax_File"/></td>
		                <td width="5"></td>
		                <td width="250" class="table_search_head">
		                	<input type="file" name="tifFile" style="width:340px;" class="search_form"/>
                       	</td>
		            </tr>
	            </table>
	            <table width="100%" border="0" cellspacing="0" cellpadding="0">
	              <tr>
	                <td height="4"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
	              </tr>
	            </table>
	            <table border="0" cellpadding="0" cellspacing="0">
	            	<tr>
		                <td width="100" colspan='2' nowrap class="table_search_head"><bean:message key="To_List"/></td>
		                <td width="380"></td>
		                <td style="cursor:hand" onclick="doWork('ROW_ADD')">
							<table height="21" border="0" cellpadding="0" cellspacing="0">
								<tr>
									<td width="11"><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif" width="11" height="21"/></td>
									<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="New"/></td>
									<td width="8"><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif" width="8" height="21"/></td>
								</tr>
							</table>
						</td>
		        	</tr>
	            </table>
	            
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
	                <td height="4"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
	              </tr>
	            </table>
	             <table border="0" width="100%">
					<tr>
						<td>
							<table border="0" width="100%" id="mainTable">
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
</form>
</body>
</html>
