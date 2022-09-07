<%--
=========================================================
*@FileName   : EQU_MST_0012.jsp
*@FileTitle  : Agreement Cntr Supply
*@Description: Agreement Cntr Supply 등록 한다.
*@author     : kang daesoo  
*@version    : 1.0 - 11/09/2009
*@since      : 11/09/2009

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

<script language="javascript" src="<%=CLT_PATH%>/js/common/EmailChecker.js?ver=<%=CLT_JS_VER%>"></script>
<script language="javascript" src="./apps/fis/equ/mst/agreement/script/EQU_MST_0012.js?ver=<%=CLT_JS_VER%>"></script>
<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/EQU_MSG.js?ver=<%=CLT_JS_VER%>"></script>


<style> body { border-top-width: 6px!important; } </style>
</head>
<div id="WORKING_IMG" style="position:absolute;background-color:#FFFFFF;width:357;height:130;display:none;" valign="middle" align="center">
    <iframe src='<%=CLT_PATH%>/js/common/wait.html' scrolling='no' frameborder='0' style='margin-top:0px;width:360px; height:135px; border:none;display:block'></iframe>
</div>
<body class="td" onload="javascript:loadPage();">
<form name="frm1" method="POST" action="./EQU_MST_0012.clt">
	<!--Command를 담는 공통 -->
    <input type="hidden" name="f_cmd" value=""/> 
	<input type="hidden" name="openMean"   value=""/> 
	<input type="hidden" name="agmt_no"   value="<%=request.getParameter("agmt_no")%>"/> 
		
    <!-- 타이틀, 네비게이션 -->
    <table width="420" border="0" cellspacing="0" cellpadding="0">
		<tr>
    		<td class="bigtitle"><bean:message key="Container_Supply"/></td>
  		</tr>
    </table>
    <!-- 타이틀, 네비게이션 -->
    <!--빈공간 -->
    <table width="420" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td height="4"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
        </tr>
    </table>

    <table width="420" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
        </tr>
    </table>
    <!--빈공간 -->
    <!-- Mail Sender/receiver info. -->
    <table width="420" border="0" cellpadding="0" cellspacing="0">
        <tr>
            <td align="left" class="table_search_bg"><!-- 간격 -->
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
                    </tr>
                </table>
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td width="100%" rowspan="2" align="left" valign="top">
							<table width="100%" border="0" cellpadding="0" cellspacing="0">
								 <tr>
									 <td width="60" class="table_search_head"><bean:message key="To"/></td>
									 <td class="table_search_body">
										 <input type="text" name="eml_to_addr" value='' maxlength="400" class="search_form" style="width:333;"/>
									 </td>
								 </tr>
                                 <tr>
                                     <td width="60" class="table_search_head"><bean:message key="CC"/></td>
                                     <td class="table_search_body">
                                         <input type="text" name="eml_cc_addr" value='' maxlength="400" class="search_form" style="width:333;"/>
                                     </td>
                                 </tr>
                                 <tr>
                                     <td width="60" class="table_search_head"><bean:message key="Title"/></td>
                                     <td class="table_search_body">
                                         <input type="text" name="eml_tit"     value='' maxlength="100" class="search_form" style="width:333;"/>
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
            </td>
        </tr>
    </table>
    <!-- Mail Sender/receiver info. -->
	 <!-- 간격 -->
    <table width="420" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td height="7"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
        </tr>
    </table>
    <!-- 간격 -->
    <!-- Mail msg. -->
    <table width="420" border="0" cellpadding="0" cellspacing="0">
        <tr>
            <td align="left" class="table_search_bg"><!-- 간격 -->
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
                    </tr>
                </table>
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td width="100%" rowspan="2" align="left" valign="top">
                            <table width="100%" border="0" cellpadding="0" cellspacing="0">
                                 <tr>
                                     <td width="60" class="table_search_head"><bean:message key="Contents"/></td>
                                     <td class="table_search_body">
                                         <textarea name="eml_msg" cols="62" rows="8"></textarea>
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
            </td>
        </tr>
    </table>
    <!-- Mail msg. -->
     <!-- 간격 -->
    <table width="420" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td height="7"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
        </tr>
    </table>
    <!-- 간격 -->				
	<table width="420" border="0" cellspacing="0" cellpadding="0">
		<tr>
			<td width="30%" class="table_head"><img src="<%=CLT_PATH%>/web/img/main/sub_title_arrow.gif" width="7" height="9" hspace="4"/>information</td>
		    <td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="5"/></td>
		</tr>				
	</table>		
    <table width="420" border="0" cellpadding="0" cellspacing="0">
        <tr>
            <td align="left" class="table_search_bg"><!-- 간격 -->
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
                    </tr>
                </table>
                <table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td width="100%" rowspan="2" align="left" valign="top">
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
    <!-- 간격 -->
    <table width="420" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td height="7"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"/></td>
        </tr>
    </table>
    <!-- 간격 --> 
	<!-- 소타이틀, 대버튼 -->
    <table width="420" border="0" cellspacing="0" cellpadding="0">
        <tr>
            <td align="right">
                <table border="0" cellspacing="0" cellpadding="0">
                    <tr>
                        <td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="6"/></td>
                        <td style="cursor:hand" onclick="doWork('APPLY')">
							<table height="21" border="0" cellpadding="0" cellspacing="0" >
								<tr>
									<td width="11"><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif" width="11" height="21"/></td>
									<td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Email_Send"/></td>
									<td width="8"><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif" width="8" height="21"/></td>
								</tr>
							</table>
						</td>
                        <td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="4"/></td>
                        <td style="cursor:hand" onclick="window.close();">
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
    </table>
</form>
</body>
</html>


