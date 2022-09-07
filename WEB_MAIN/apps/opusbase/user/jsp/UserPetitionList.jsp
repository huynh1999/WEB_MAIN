<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@include file="./../../../../syscommon/header/CLTHeader.jsp"%>

	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css">
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SYS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="./apps/opusbase/user/script/UserPetitionList.js?ver=<%=CLT_JS_VER%>"></script>
</head>
<body class="td" onload="javascript:loadPage();">
<form name="frm1" method="POST" enctype="multipart/form-data">
    <input type="hidden" name="f_cmd" 	  value="">
    <input type="hidden" name="f_brd_seq" value="">
    
    <input type="hidden" name="f_eml_to" value="opus@cyberlogitec.com"/>
		
    <!-- 타이틀, 네비게이션 -->
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td class="bigtitle"><%=LEV3_NM%></td>
            <td align="right" nowrap class="navi"><img src="<%=CLT_PATH%>/web/img/main/navi_icon.gif" width="6" height="5" hspace="3" vspace="5" align="texttop"><%=LEV1_NM%> > <%=LEV2_NM%> > <span class="navi_b"><%=LEV3_NM%></span></td>
        </tr>
    </table>
    <!-- 타이틀, 네비게이션 -->
    <!--빈공간 -->
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td height="4"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
        </tr>
    </table>
    <!--빈공간 -->
    <!-- 소타이틀, 대버튼 -->
    <!-- 
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td align="right">
                <table border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="6"></td>
                        <td  style="cursor:hand">
                            <table onclick="doWork('SEARCHLIST');" height="21" border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
                                    <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Search"/></td>
                                    <td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
                                </tr>
                            </table>
                         </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
     -->
    <!-- 소타이틀, 대버튼 -->
    <!--빈공간 -->
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td height="4"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
        </tr>
    </table>
    <table width="100%" border="0" cellpadding="0" cellspacing="0">
        <tr>
        	<!-- 
            <td width="700" align="left">
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                    </tr>
                </table>
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td align="left" valign="top">
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
                        <td height="7"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                    </tr>
                </table>
            </td>
             -->
            <td valign="top">
            	<!-- 간격 -->
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                    </tr>
                </table>
            	<table id="mail_tab" style="display:inline;margin-left:10px;">
            		<tr>
            			<td width="80" class="table_search_head"><bean:message key="Title"/></td>
						<td class="table_search_body">
							<input type="text" name="f_eml_title" class="search_form" dataformat="excepthan" style="ime-mode isabled;width:245;"/>
						</td>
            		</tr>
            		<tr>
            			<td width="80" valign="top" class="table_search_head">Content</td>
            			<td class="table_search_body">
							<textarea id="f_eml_content" name="f_eml_content" class="search_form" style="width:245;height:240px"></textarea>
						</td>
            		</tr>
            		<tr>
            			<td width="80" class="table_search_head"><bean:message key="File"/></td>
						<td class="table_search_body">
							<input type="file" name="f_eml_file" class="search_form" dataformat="excepthan" style="ime-mode isabled;width:245;"/>
							<!-- <img src="/<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" align="absmiddle" style="cursor:hand" onclick="set2file();"/> -->
						</td>
            		</tr>
            		<tr>
            			<td width="80" id="file2" class="table_search_head" style="display:block;"><bean:message key="File2"/></td>
						<td id="fileName2" class="table_search_body" style="display:block;">
							<input type="file" name="f_eml_file2" class="search_form" dataformat="excepthan" style="ime-mode isabled;width:245;"/>
							<!-- <img id="img2" src="/<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" align="absmiddle" style="cursor:hand;" onclick="set3file();"/> -->
						</td>
            		</tr>
            		<tr>
            			<td width="80" id="file3" class="table_search_head" style="display:block;"><bean:message key="File3"/></td>
						<td id="fileName3" class="table_search_body" style="display:block;">
							<input type="file" name="f_eml_file3" class="search_form" dataformat="excepthan" style="ime-mode isabled;width:245;"/>
							<!-- <img id="img3" src="/<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" align="absmiddle" style="cursor:hand;" onclick="set4file();"/> -->
						</td>
            		</tr>
            		<tr>
            			<td width="80" id="file4" class="table_search_head" style="display:block;"><bean:message key="File4"/></td>
						<td id="fileName4" class="table_search_body" style="display:block;">
							<input type="file" name="f_eml_file4" class="search_form" dataformat="excepthan" style="ime-mode isabled;width:245;"/>
							<!-- <img id="img4" src="/<%=CLT_PATH%>/web/img/main/search_bt.gif" width="19" height="20" border="0" align="absmiddle" style="cursor:hand;" onclick="set5file();"/> -->
						</td>
            		</tr>
            		<tr>
            			<td width="80" id="file5" class="table_search_head" style="display:block;"><bean:message key="File5"/></td>
						<td id="fileName5" class="table_search_body" style="display:block;">
							<input type="file" name="f_eml_file5" class="search_form" dataformat="excepthan" style="ime-mode isabled;width:245;"/>
						</td>
            		</tr>
            		<tr>
						<td colspan="2" align="center">
							<table>
								<tr>
									<td style="cursor:hand" onclick="doWork('Send');">
										<table height="21" border="0" cellpadding="0" cellspacing="0">
											<tr>
												<td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
												<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Send"/></td>
												<td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
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
                        <td height="7"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
    <iframe name="ifr_hidden" style="width:0;height:0;visibility:hidden" border=0></iframe>
</form>
</body>
</html>