<%--
=========================================================
*@FileName   : MDM_MCM_0301.jsp
*@FileTitle  : GL Code
*@Description: GL Code
*@author     : Kim,Jin-Hyuk - Cyberlogitec
*@version    : 1.0 - 2011/10/07
*@since      : 2011/10/07

*@Change history:
*@author	 : Tuan.Chau
*@version	 : 2.0 - 2014/06/11
*@since		 : 2014/06/11
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
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/MDM_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="./apps/fis/mdm/code/gl/script/MDM_MCM_0301.js?ver=<%=CLT_JS_VER%>"></script>
	
	
	<script>
		var pDoc = parent.parent.parent.document;
		hideProcess('WORKING', pDoc);
		
		var PARAM1_1 = ' |';
		var PARAM1_2 = ' |';
		
		<bean:define id="rtnMap" name="EventResponse" property="mapVal"/>

		<% boolean isBegin = false; %>
	    <!-- GL Type Code 코드조회-->
		<bean:define id="param1List"  name="rtnMap" property="PARAM1"/>
		<logic:iterate id="codeVO" name="param1List">
			<% if(isBegin){ %>
				PARAM1_1+= '|';
				PARAM1_2+= '|';
			<% }else{
				  isBegin = true;
			   } %>
			PARAM1_1+= '<bean:write name="codeVO" property="cd_nm"/>';
	        PARAM1_2+= '<bean:write name="codeVO" property="cd_val"/>';
	    </logic:iterate>
	    
		var PARAM2_1 = ' |';
		var PARAM2_2 = ' |';
		
		<% isBegin = false; %>
	    <!-- GL Group Code 코드조회-->
		<bean:define id="param2List"  name="rtnMap" property="PARAM2"/>
		<logic:iterate id="codeVO" name="param2List">
			<% if(isBegin){ %>
				PARAM2_1+= '|';
				PARAM2_2+= '|';
			<% }else{
				  isBegin = true;
			   } %>
			PARAM2_1+= '<bean:write name="codeVO" property="cd_nm"/>';
	        PARAM2_2+= '<bean:write name="codeVO" property="cd_val"/>';
	    </logic:iterate>

	</script>
<script>
function setupPage(){
	loadPage();
}
</script>
<form name="frm1" method="POST" action="./">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd"/> 
	<input type="hidden" name="f_CurPage"/>
	<input type="hidden" name="trdp_cd"/>
    
    <!-- Button -->
	<div class="page_title_area clear">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <div class="opus_design_btn TOP">
	   <%-- 
		   <button type="button" class="btn_accent" btnAuth="<%= roleBtnVO.getAttr1() %>" onclick="doWork('SEARCHLIST')">Search</button>
		   <button type="button" class="btn_normal" onclick="doWork('ROWADD')"><bean:message key="Add"/></button>
		   <button id="btnModify" type="button" btnAuth="<%= roleBtnVO.getAttr3() %>" class="btn_normal" onclick="doWork('MODIFY')"><bean:message key="Save"/></button>
		   <button id="btnExcel" type="button"  btnAuth="<%= roleBtnVO.getAttr6() %>" class="btn_normal" onclick="doWork('EXCEL')" name="btn_DownExcel"><bean:message key="Excel"/></button>
		    --%>
	   </div>
	   <!-- btn_div -->
	   <div class="location">
		   <span><%=LEV1_NM%></span> &gt;
		   <span><%=LEV2_NM%></span> &gt;
		   <span><%=LEV3_NM%></span>
		   <a href="" class="ir">URL Copy</a>
	   </div>
	</div>
    <!-- Search option -->
<div class="over_wrap" height="100%">
    <div class="wrap_search">	
		<div class="opus_design_inquiry entry_pannel ">
			<table>
				<colgroup>
					<col width="60">
					<col width="130">
					<col width="60">
					<col width="*">
				</colgroup>	
				<tbody>
					<tr>
						<th><bean:message key="GL_Code"/></th>
						<td><!-- 
							 --><input type="text" name="s_ggl_cd" maxlength="20" value="" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:110;" onKeyPress="ComKeyOnlyAlphabet('uppernum')" onKeyPress="fncSearch()">
						</td>
						
						<th><bean:message key="Name"/></th>
						<td><!-- 
							 --><input type="text" name="s_ggl_desc" maxlength="200" value="" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:400;" onKeyPress="fncSearch()">
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
    
    <div class="wrap_result">
    	<div class="opus_design_grid">
    		<script language="javascript">comSheetObject('sheet1');</script>
    	</div>
    	<div>
			<table border="0" width="1200">
				<tr>
					<td width="55">
						<bean:define id="tmpMapVal" name="EventResponse" property="mapVal"/>
						<bean:define id="pagingVal" name="tmpMapVal"     property="paging"/>
						<paging:options name="pagingVal" defaultval="200"/>
					</td>
					<td id="pagingTb" style='font-family: "Tahoma", "Arial", "Verdana";font-size: 11px;' width="840px">
					</td>
				</tr>
			</table>
    	</div>
    </div>
</div>
</form>
<script type="text/javascript">
	doBtnAuthority("<%= roleBtnVO.getAttr_extension() %>");
</script>	


