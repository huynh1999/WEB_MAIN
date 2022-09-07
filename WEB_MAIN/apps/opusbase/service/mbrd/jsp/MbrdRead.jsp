<%--
=========================================================
*Copyright(c) 2008 CyberLogitec. All Rights Reserved.
=========================================================

=========================================================
*@FileName   : MGT_NTC_0030.jsp
*@FileTitle  : 게시판 내용확인 화면
*@Description: 게시판 내용확인합니다.
*@author     : Kang,Jung-Gu - Cyberlogitec
*@version    : 1.0 - 02/05/2009
*@since      : 02/05/2009

*@Change history:
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
<%@include file="./../../../../../../../../syscommon/header/CLTHeader.jsp"%>
<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css">

	<bean:define id="ntcVO" name="EventResponse" property="objVal"/>
	<bean:define id="mapVO" name="EventResponse" property="mapVal"/>
	
	<!-- 일자 및 달력팝업 호출 -->
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script>
		function doWork(srcName){
			try {
				switch(srcName){
					case "SEARCHLIST":
						doShowProcess();
						fName.action = './NoticeList.clt';
						fName.submit();
					break;
                    case "COMMAND01":
						fName2.target = '_self';
                        fName2.submit();
                    break;
        <logic:notEmpty name="mapVO" property="WRITER">
                    case "MODIFY":
			            doShowProcess();
						fName.f_cmd.value = MODIFY;
                        fName.target = '_self';
                        fName.submit();
                    break;
        </logic:notEmpty>
 			    }
			}catch(e) {
				if( e == "[object Error]") {
					showErrMessage(getMsg('COM12111'));
				}else{
					showErrMessage(e);
				}
			}
		}
	</script>
</head>
<body class="td">
<form name="fName" method="POST" action="./NoticeRead.clt">
    <input type="hidden" name="f_cmd" value="">
    <input type="hidden" name="f_CurPage" value="">

	<html:hidden name="mapVO" property="f_CurPage"/>
	<html:hidden name="mapVO" property="f_brd_seq"/>
	<html:hidden name="mapVO" property="f_dp_bgn_dt"/>
	<html:hidden name="mapVO" property="f_dp_end_dt"/>
	<html:hidden name="mapVO" property="f_wrt_id"/>
	<html:hidden name="mapVO" property="f_wrt_nm"/>
	
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
		<logic:notEmpty name="mapVO" property="WRITER">
                        <td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="6"></td>
                        <td onclick="doWork('MODIFY');" style="cursor:hand">
                           <table height="21" border="0" cellpadding="0" cellspacing="0">
                               <tr>
                                   <td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
                                   <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="Modify"/></td>
                                   <td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
                               </tr>
                           </table>
                        </td>
		</logic:notEmpty>
						<td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="6"></td>
						<td onclick="doWork('SEARCHLIST');" style="cursor:hand">
						   <table height="21" border="0" cellpadding="0" cellspacing="0">
							   <tr>
								   <td><img src="<%=CLT_PATH%>/web/img/main/bt_left.gif"></td>
								   <td background="<%=CLT_PATH%>/web/img/main/bt_bg.gif" class="bt_name"><bean:message key="List"/></td>
								   <td><img src="<%=CLT_PATH%>/web/img/main/bt_right.gif"></td>
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
                        <td align="left" valign="top">
						    <table border="0" cellpadding="0" cellspacing="0">
						    	<tr>
									<td width="80" nowrap class="table_search_head"><bean:message key="Title"/></td>
									<td class="table_search_body">
									   <input type="text" name="brd_tit"   value='<bean:write name="ntcVO" property="brd_tit"/>'class="search_form-disable" style="width:500;" readonly>
									</td>
									<td width="15"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
								</tr>
                                <tr>
                                    <td width="80" nowrap class="table_search_head"><bean:message key="Writer"/></td>
                                    <td class="table_search_body">
									   <input type="text" name="disp_only" value='<bean:write name="ntcVO" property="modi_usrid"/>'      class="search_form-disable" style="width:50;"  readonly> 
									   <input type="text" name="disp_only" value='<bean:write name="ntcVO" property="modi_eng_usr_nm"/>' class="search_form-disable" style="width:120;" readonly>
                                    </td>
                                    <td width="15"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                                </tr>
			<logic:notEmpty name="ntcVO" property="file_url">
								<tr><td height="8px" colspan="2"></td></tr>
                                <tr>
                                    <td width="80" nowrap class="table_search_head"><bean:message key="Attach_File"/></td>
                                    <td class="table_search_body">
                                       <a href="javascript:doWork('COMMAND01');"><b><bean:write name="ntcVO" property="file_url"/></b></a>
                                    </td>
                                    <td width="15"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                                </tr>
            </logic:notEmpty>
                                <tr><td height="20px" colspan="2"></td></tr>
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
                        <td align="left" valign="top">
                            <table border="0" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td width="80" nowrap class="table_search_head"><bean:message key="Contents"/></td>
                                    <td class="table_search_body">
                                       <textarea name="brd_ctnt" maxlength="1000" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" onblur="strToUpper(this);keyUp_maxLength(this);" cols="160" rows="27" readonly><bean:write name="ntcVO" property="brd_ctnt"/></textarea>
                                    </td>
                                    <td width="15"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</form>
<form name="fName2" method="POST" action="./GateServlet.gsl">
    <input type="hidden" name="goWhere"   value="fd"/>
    <input type="hidden" name="bcKey"     value="brdFileDown"/>
    <input type="hidden" name="f_brd_tp"  value="N"/>	
    <input type="hidden" name="f_file_seq"   id="f_file_seq"  value="1"/>
	<html:hidden name="mapVO" property="f_brd_seq"/>
</form>
<script>
	doHideProcess();
</script>
</body>
</html>