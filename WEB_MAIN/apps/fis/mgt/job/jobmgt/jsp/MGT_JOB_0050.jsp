<%--
=========================================================
*@FileName   : MGT_JOB_0050.jsp
*@FileTitle  : WorkFlow 기초 Data 관리
*@Description: WorkFlow에서 사용
*@author     : 
*@version    : 
*@since      : 12/28/2016

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
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/mgt/job/jobmgt/script/MGT_JOB_0050.js?ver=<%=CLT_JS_VER%>"></script>
	
<script>
	function setupPage(){
       	loadPage();
    }
</script>
<script>
    var pDoc = parent.parent.parent.document;
    hideProcess('WORKING', pDoc); 
    
	<!-- 처리시 메시지 -->
	var CNF_MSG1 = '<bean:message key="Do_you_want_to_run"/>';
	var PARAM1_1 = ' |';
	var PARAM1_2 = ' |';
	var PARAM2_1 = ' |';
	var PARAM2_2 = ' |';
	var PARAM3_1 = ' |';
	var PARAM3_2 = ' |';
	var PARAM4_1 = ' |';
	var PARAM4_2 = ' |';
	var PARAM5_1 = ' |';
	var PARAM5_2 = ' |';

	<bean:define id="rtnMap" name="EventResponse" property="mapVal"/>

	<% boolean isBegin = false; %>
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

	<% isBegin = false; %>
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

    <% isBegin = false; %>
    <bean:define id="param3List"  name="rtnMap" property="PARAM3"/>
	<logic:iterate id="codeVO" name="param3List">
		<% if(isBegin){ %>
			PARAM3_1+= '|';
			PARAM3_2+= '|';
		<% }else{
			  isBegin = true;
		   } %>
		PARAM3_1+= '<bean:write name="codeVO" property="cd_nm"/>';
        PARAM3_2+= '<bean:write name="codeVO" property="cd_val"/>';
    </logic:iterate>

    <% isBegin = false; %>
    <bean:define id="param4List"  name="rtnMap" property="PARAM4"/>
	<logic:iterate id="codeVO" name="param4List">
		<% if(isBegin){ %>
			PARAM4_1+= '|';
			PARAM4_2+= '|';
		<% }else{
			  isBegin = true;
		   } %>
		PARAM4_1+= '<bean:write name="codeVO" property="cd_nm"/>';
        PARAM4_2+= '<bean:write name="codeVO" property="cd_val"/>';
    </logic:iterate>
    
    <% isBegin = false; %>
    <bean:define id="param5List"  name="rtnMap" property="PARAM5"/>
	<logic:iterate id="codeVO" name="param5List">
		<% if(isBegin){ %>
			PARAM5_1+= '|';
			PARAM5_2+= '|';
		<% }else{
			  isBegin = true;
		   } %>
		PARAM5_1+= '<bean:write name="codeVO" property="cd_nm"/>';
        PARAM5_2+= '<bean:write name="codeVO" property="cd_val"/>';
    </logic:iterate>    

</script>
</head>
<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css">

<form method="post" name="form" action="./">
	<input	type="hidden" name="f_cmd"> 
<!-- page_title_area -->
	<div class="page_title_area clear">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
		<div class="opus_design_btn TOP">
		 <%-- 
			<button style="cursor:hand;display:inline;" btnAuth="<%//= roleBtnVO.getAttr1()%>" type="button" class="btn_accent" onclick="doWork('SEARCHLIST')" ><bean:message key="Search" /></button><!-- 
		--><button style="cursor:hand;display:inline;" btnAuth="<%//= roleBtnVO.getAttr3()%>" type="button" class="btn_normal" onclick="doWork('ROWADD')"><bean:message key="Add"/></button><!-- 
		--><button id="btnModify" style="cursor:hand;display:inline;" btnAuth="<%//= roleBtnVO.getAttr3()%>" type="button" class="btn_normal" onclick="doWork('MODIFY')"><bean:message key="Save"/></button>
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
	<!-- opus_design_inquiry(S) -->
<div class="over_wrap" height="100%">
	<div class= "wrap_search">
	<div class="opus_design_inquiry entry_pannel ">
		<table>
			<colgroup>
				<col width="100">
			</colgroup>
			<tbody>
				<tr>				
					<th><bean:message key="Category"/></th>
					<td>
					<select name="clss_cd" id="clss_cd" style="width:105px" onchange="doWork('SEARCHLIST')">
						<option value="SO">Ocean Export</option>					
						<option value="SI">Ocean Import</option>				
						<option value="AO">Air Export</option>				
						<option value="AI">Air Import</option>				
						<!-- 기존 inbound outbound로 되어있는 것일 export import로 코드 변경하려 하였으나 일단 기존대로 사용하기로 함
						<option value="">ALL</option>					
						<option value="OE">Ocean Export</option>					
						<option value="OI">Ocean Import</option>				
						<option value="AE">Air Export</option>				
						<option value="AI">Air Import</option>	
						-->				
					</select>
					
					<!-- 
					<bean:define id="valMap"  name="EventResponse" property="mapVal"/>
					<bean:define id="param1List"  name="rtnMap" property="PARAM1"/>
					<select name="clss_cd" id="clss_cd" style="width:105px" onchange="doWork('SEARCHLIST')">
					<option value=''>ALL</option>
					<logic:iterate id="codeVO" name="param1List">
					<option value='<bean:write name="codeVO" property="cd_val"/>'><bean:write name="codeVO" property="cd_nm"/></option>
					</logic:iterate>
					 -->
					</td>
				</tr>
			</tbody>
		</table>
	</div>
	<!-- opus_design_inquiry(E) -->
	</div>	
	<!-- wrap_result (S) -->
    <div class="wrap_result">			
		<div class="opus_design_grid">
			<script type="text/javascript">comSheetObject('sheet1');</script>
		</div> 
	</div>
	<!-- wrap_result (E) -->
</div>
</form>

