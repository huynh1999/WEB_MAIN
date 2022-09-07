<%
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : MDM_MCM_0320.jsp
*@FileTitle  : Bank Setup
*@author     : CLT
*@version    : 1.0
*@since      : 2014/06/10
=========================================================*/
%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	<!-- 일자 및 달력팝업 호출 -->
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/MDM_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/mdm/mcm/bank/script/MDM_MCM_0320.js?ver=<%=CLT_JS_VER%>"></script>
	
	<script>
		var pDoc = parent.parent.parent.document;
		hideProcess('WORKING', pDoc);

		var gl_cd = ' |';
		var check_form = ' |';
		var check_form_nm = ' |';
		
		var bank_ofc_cd = ' |';
		
		<bean:define id="rtnMap" name="EventResponse" property="mapVal"/>

		<% boolean isBegin = false; %>
	    <!-- GL Code 코드조회-->
		<bean:define id="param1List"  name="rtnMap" property="GL_CODE"/>
		<logic:iterate id="codeVO" name="param1List">
			<% if(isBegin){ %>
			gl_cd+= '|';
			<% }else{
				  isBegin = true;
			   } %>
			   gl_cd+= '<bean:write name="codeVO" property="gl_cd"/>';
	    </logic:iterate>
	    
	    <% isBegin = false; %>
	    <!-- check form 코드조회-->
<%
	if(((java.util.HashMap)rtnMap).get("CHECK_FORM") != null ){
%>
		<bean:define id="param3List"  name="rtnMap" property="CHECK_FORM"/>
		<logic:iterate id="codeVO" name="param3List">
			<% if(isBegin){ %>
			check_form+= '|';
			check_form_nm+= '|';
			<% }else{
				  isBegin = true;
			   } %>
			   check_form+= '<bean:write name="codeVO" property="cd_nm"/>';
			   check_form_nm+= '<bean:write name="codeVO" property="cd_nm"/>';
	    </logic:iterate>
<%	
	}
%>	    
		var curr_cd = '';
		<!-- #1794 [PATENT] - BUG. BANK ACCOUNT -->
		<% isBegin = false; %>
	    <!-- Currency Code 코드조회-->
		<bean:define id="param2List"  name="rtnMap" property="CURR_CODE"/>
        <logic:iterate id="codeVO" name="param2List">
            <% if(isBegin){ %>
            curr_cd += '|';
            <% }else{
            	isBegin = true;
               } %>
               curr_cd+= '<bean:write name="codeVO" property="cd_val"/>';
        </logic:iterate>
	    
	    /* Office Code 조회   */
	    var bank_ofc_cd='';
	    <%isBegin = false;%>
		<bean:define id="param4List"  name="rtnMap" property="BANK_OFC_CD"/>
		<logic:iterate id="OfcVo" indexId="bankOfcCdIdx" name="param4List">
			<% if(isBegin){ %>
			bank_ofc_cd+= '|';
			<% }else{
				  isBegin = true;
			   } %>
			bank_ofc_cd += '<bean:write name="OfcVo" property="ofc_cd"/>';
	    </logic:iterate>	    
	    <%isBegin = false;%>
	    
	    function setupPage(){
			loadPage();
		}
	    <!--#394 [SUNWAY] BANK SET UP ADD CURRENCY VALIDATION -->
	    <bean:define id="ofccurr_cdMap"  name="rtnMap" property="OFCCURR_CD"/>
	</script>
	<form name="frm1" method="POST" action="./">
	<!--Command를 담는 공통 -->
	<input type="hidden" id="f_cmd" name="f_cmd"/> 
	<input type="hidden" id="f_CurPage" name="f_CurPage"/>
	<input type="hidden" id="ofc_curr_cd" name="ofc_curr_cd" value="<bean:write name="ofccurr_cdMap" property="ofccurr_cd"/>"/>
	<input type="hidden" id="trf_curr_cd" name="trf_curr_cd" value="<bean:write name="ofccurr_cdMap" property="trf_cur_cd"/>"/>
	<input type="text" id="focus_obj" name="focus_obj" style="height:1px; width:1px; border: 0px"> 

  <!-- page_title_area(S) -->
	<div class="page_title_area clear">
		<!-- page_title(S) -->
		<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
		<!-- page_title(E) -->
		
		<!-- btn_div -->
	   <div class="opus_design_btn TOP"> 
	   		<%-- 
	     	<button type="button" class="btn_accent" onclick="doWork('SEARCHLIST');" style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>">Search</button>
	     	<button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr2() %>" onclick="doWork('ROWADD');">Add</button>
	     	<button type="button" class="btn_normal" id="btnModify" style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr3() %>" onclick="doWork('MODIFY')">Save</button>
	     	--%>
	   </div>
	   <!-- btn_div -->
   
 			<!-- page_location(S) -->
		<div class="location">	
			 <span><%=LEV1_NM%></span> &gt;
		 	 <span><%=LEV2_NM%></span> &gt;
		  	 <span><%=LEV3_NM%></span>
	   		<a href="" class="ir">URL Copy</a>
		</div>
		<!-- page_location(E) -->
	</div>
<div class="over_wrap" height="100%">	
	<div>
		<table>
			<tr>
				<th style="color: red;" align="left">&nbsp;&nbsp;&nbsp;* Modifying current G/L No. assigned to current bank requires a batch update from system administrator.</th>
			</tr>
			<tr>
				<th style="color: red;" align="left">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Please contact Logistics.helpdesk@cyberlogitec.com, support.us@cyberlogitec.com, support.cn@cyberlogitec.com to request for the data batch update.</th>
			</tr>
		</table>
	</div>
	<div class="wrap_result">
        <h3 class="title_design"><bean:message key="Bank_List"/></h3>
		<div class="opus_design_grid">
			<script type="text/javascript">comSheetObject('sheet1');</script>
		</div>
	</div>
	<!-- grid_area(E) -->
</div>	
	</form>
<script type="text/javascript">
	doBtnAuthority("<%= roleBtnVO.getAttr_extension() %>");
</script>	