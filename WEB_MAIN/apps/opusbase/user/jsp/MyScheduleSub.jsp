<%--
=========================================================
*Copyright(c) 2008 CyberLogitec. All Rights Reserved.
=========================================================

=========================================================
*@FileName   : MGT_NTC_0010.jsp
*@FileTitle  : 게시판 목록 화면
*@Description: 게시판 목록을 조회합니다.
*@author     : Kang,Jung-Gu - Cyberlogitec
*@version    : 1.0 - 02/05/2009
*@since      : 02/05/2009

*@Change history:
*@author     : Tuan.Chau
*@version    : 2.0 - 27/06/2014
*@since      : 27/06/2014
=========================================================
--%>
<%@ page import="java.util.*" contentType="text/html;charset=UTF-8" %>
<%@ page import="com.clt.syscommon.response.CommonEventResponse" %>
<%@ page import="com.clt.apps.opusbase.main.dto.PsonSkdVO" %>

<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
<%@include file="./../../../../syscommon/header/CLTHeader.jsp"%>

    <link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css">
    <!-- 일자 및 달력팝업 호출 -->
    <script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SYS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>		
    <script language="javascript" src="./apps/opusbase/user/script/MyScheduleSub.js?ver=<%=CLT_JS_VER%>"></script>
	<script>
	$("html").addClass("MainCalendar");
	if(navigator.userAgent.indexOf("Firefox") != -1) {
		$("html").addClass("FFMain");	
	}
	function setupPage(){
		
	}
	</script>
	<!-- #5542 [AIT Int’l of America] Cannot choose specific Time in Schedule -->
	<style> body { overflow-y: auto; } </style>
<form name="fName" method="POST" bgcolor="#0066CC">
    <input type="hidden" name="skd_seq" value="">
	<input type="hidden" name="skd_tp"  value="">
    <input type="hidden" name="skd_dt" id="skd_dt"  value="<bean:write name="f_skd_dt"/>">
    <input type="hidden" name="skd_bgn_tm" value="">
    <input type="hidden" name="skd_end_tm" value="">
	<input type="hidden" name="callId"     value="">

<table border="0" width="100%" cellspacing="0" cellpadding="0" bgcolor="#E6E6FA">
		<tr>
			<td height="8px"></td>
		</tr>
<%
    CommonEventResponse rtnVal = (CommonEventResponse)request.getAttribute("EventResponse");
    ArrayList aList = (ArrayList)rtnVal.getListVal();
    PsonSkdVO skdVO = null;
                               
    StringBuffer sbStr = new StringBuffer();
                               
    String typeStr = "T";
    HashMap rtnMap = new HashMap();
    String dayStr = "";
    String daySeq = "";
    for(int i = 0; i < aList.size(); i++){
        skdVO = (PsonSkdVO)aList.get(i);
        if(skdVO.getSkd_tp()!=null&&skdVO.getSkd_tp().equals(typeStr)){
        	rtnMap.put(skdVO.getSkd_bgn_tm(), skdVO);
        }else{
			sbStr.append("&nbsp;<span onclick=\"callModiDay(");
			sbStr.append("this, ");
			sbStr.append(skdVO.getSkd_seq());
			sbStr.append(", '");
			sbStr.append(skdVO.getSkd_tit());
			sbStr.append("');\" onmouseover=\"this.style.fontWeight='bold'\" onmouseout=\"this.style.fontWeight='normal'\">");
			sbStr.append(skdVO.getSkd_tit());
			sbStr.append("</span><br>");
			
			daySeq = skdVO.getSkd_seq();
			dayStr = skdVO.getSkd_tit();
        }
    }
    
%>
		<tr>
			<td align="center">
				<table border="0" width="99%" cellspacing="1" cellpadding="0" bgcolor="#B0C4DE" style="cursor:hand; border: 1px solid #8090B4; text-align: left;">
					<tr>
						<td height="50" class="navi" bgcolor="#ffffff" ondblclick="popCnf(99, this);" valign="top">
							<%=sbStr%>
						</td>
						<%  if(daySeq.equals("")){ %>
                            <input name="hidMsg99" type="hidden" value="">
						<%  }else{  %>
							<input name="hidMsg99" type="hidden" value="<%=dayStr%>;<%=daySeq%>">
						<%  }  %>
					</tr>
				</table>
			</td>
		</tr>
		<tr>
			<td height="10px"></td>
		</tr>
<%  
	String[] dates    = {"12", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "1",  "2",  "3",  "4",  "5",  "6",  "7",  "8",  "9",  "10", "11"};
	String[] disDates = {"24", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23"};
	String dayTp = "am";
	
	for(int i = 0; i < 24; i++){
		
		if(i>=12){
			dayTp = "pm";
		}
%>
		<tr>
			<td align="center">
				<table border="0" width="99%" cellspacing="1" cellpadding="0" bgcolor="#FFCC33" style="cursor:hand; border: 1px solid #FFCC33;">
					<tr>
						<td bgcolor="#FFFF99" class="navi_b" width="60px" height="50" align="right"><%=dates[i]%><%=dayTp%>&nbsp;&nbsp;</td>
						<td bgcolor="#ffffff" class="navi" ondblclick="popCnf(<%=i%>, this)" style="cursor:hand; border-bottom: 1px solid #FFCC33; text-align: left;">&nbsp;
				<%  if(rtnMap.containsKey(disDates[i])){
							skdVO = (PsonSkdVO)rtnMap.get(disDates[i]);   %>
							<span onclick="callModi(<%=i%>, this, <%=skdVO.getSkd_seq()%>, '<%=skdVO.getSkd_tit()%>');" onmouseover="this.style.fontWeight='bold'" onmouseout="this.style.fontWeight='normal'"><%=skdVO.getSkd_tit()%></span>
						</td>
							<input type="hidden" name="hidMsg<%=i%>" value="<%=skdVO.getSkd_tit()%>;<%=skdVO.getSkd_seq()%>">
				<%  }else{ %>
						</td>
							<input type="hidden" name="hidMsg<%=i%>" value="">
				<%  }  %>

					</tr>
				</table>
			</td>
		</tr>
<% } %>
	</table>
	
	<div id="cnfMsg" style="position:absolute;display:none;">
		<table border="0" cellspacing="2" cellpadding="0" width="300" bgcolor="#6A5ACD">
			<tr>
				<td bgcolor="#FFFFFF" height="130">
					<table border="0" cellspacing="0" cellpadding="0" width="300" style="cursor:hand; border: 1px solid #3374FF;">
						<tr>
							<td width="3px"></td>
							<td colspan="3" id="dispTime" class="table_search_body" style="font-weight:bold;padding-top: 5px;"></td>
						</tr>
						<tr>
							<td height="10" colspan="4"></td>
						</tr>
						<tr>
							<td width="8px"></td>
							<td width="50px" class="table_search_head"><bean:message key="Contents"/></td>
							<td width="10px"></td>
							<td class="table_search_body"><input type="text" name="add_skd_tit" size="37" maxlength="100" class="search_form"></td>
						</tr>
						<tr>
                            <td colspan="4" height="10" class="table_search_body">&nbsp;&nbsp;&nbsp;Ex.) Meeting at 101Building</td>
                        </tr>
                        <tr>
                            <td colspan="4" height="10"></td>
						</tr>
						<tr>
							<td colspan="4" align="center">
								<div class="opus_design_btn">
								   <button  id="btnAdd" type="button" class="btn_etc" onclick="doWork('SAVE_ADD')"><bean:message key="Save_schedule"/></button><button type="button" class="btn_etc" onclick="clearInput('C');"><bean:message key="Cancel"/></button>
							   </div>
							</td>
                        </tr>	
					</table>					
				</td>
			</tr>
		</table>
	</div>


    <div id="modiMsg" style="position:absolute;display:none;">
        <table border="0" cellspacing="2" cellpadding="0" width="300" bgcolor="#6A5ACD">
            <tr>
                <td bgcolor="#FFFFFF" height="130">
                    <table border="0" cellspacing="0" cellpadding="0" width="300" style="cursor:hand; border: 1px solid #3374FF;">
                        <tr>
                            <td width="3px"></td>
                            <td colspan="3" id="dispTime2" class="table_search_body" style="font-weight:bold;padding-top: 5px;"></td>
                        </tr>
                        <tr>
                            <td height="10" colspan="4"></td>
                        </tr>
                        <tr>
                            <td width="8px"></td>
                            <td width="50px" class="table_search_head"><bean:message key="Contents"/></td>
                            <td width="10px"></td>
                            <td class="table_search_body"><input type="text" name="modi_skd_tit" size="37" maxlength="100" class="search_form"></td>
                        </tr>
                        <tr>
                            <td colspan="4" height="10" class="table_search_body">&nbsp;&nbsp;&nbsp;Ex.) Meeting at 101Building</td>
                        </tr>
                        <tr>
                            <td colspan="4" height="10"></td>
                        </tr>
                        <tr>
                            <td colspan="4" align="center" style="padding-left: 3px;">
                            	<div class="opus_design_btn">
								   <button  id="btnModify" type="button" class="btn_etc" onclick="doWork('SAVE_MODIFY')"><bean:message key="Modify_schedule"/></button><!--
								   --><button  id="btnModify" type="button" class="btn_etc" onclick="saveSchedule('REMOVE');"><bean:message key="Delete_schedule"/></button><!--
								   --><button type="button" class="btn_etc" onclick="clearModi('C');"><bean:message key="Cancel"/></button>
							   </div>
                            </td>
                        </tr>   
                    </table>                    
                </td>
            </tr>
        </table>
    </div>
														
</form> 
<script>
    var pDoc = parent.parent.parent.document;
    //hideProcess('WORKING', pDoc);
</script>
