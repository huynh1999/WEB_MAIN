<%--
=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : SYS_ROL_0010.jsp
*@FileTitle  : 롤 관리화면
*@author     : CLT
*@version    : 1.0
*@since      : 2014/06/04
=========================================================
--%>

<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
	<!-- 공통 Header -->
    <%@include file="./../../../../../../../../syscommon/header/CLTHeader.jsp"%>
	
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	
	<!-- 해당 Action별 js -->
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SYS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="./apps/opusbase/system/role/script/RoleMng.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	
<script type="text/javascript">
<!--
function setupPage(){
	loadPage();
	//setSelect();
}

//-->
		var ROLCD1 = '|';
		var ROLCD2 = '|';
		
		<bean:define id="rtnMap" name="EventResponse" property="mapVal"/>
		<% boolean isBegin = false; %>
		<!--Role 코드조회-->
		<bean:define id="cdList"  name="rtnMap" property="cdList"/>
		<logic:iterate id="codeVO" name="cdList">
			<% if(isBegin){ %>
				ROLCD1+= '|';
				ROLCD2+= '|';
			<% }else{
				  isBegin = true;
			   } %>
			ROLCD1+= '<bean:write name="codeVO" property="code_label" filter="false"/>';
			ROLCD2+= '<bean:write name="codeVO" property="code" filter="false"/>';
		</logic:iterate>
</script>	
<style> body { border-top-width: 6px!important; } </style>
<form method="post" name="form" onSubmit="return false;">
	<input	type="hidden" name="f_cmd" id="f_cmd"> 
	<input type="hidden" name="role_cd" id="role_cd" value="<%=userInfo.getRole_cd() %>">
	<input type="hidden" name="dup_row" id="dup_row" value="">
	<input type="hidden" name="dup_row_cnt" id="dup_row_cnt" value="0">
	<input type="hidden" name="f_role_cd" id="f_role_cd" value="">

<!-- page_title_area(S) -->
	<div class="page_title_area clear ">
		<!-- page_title(S) -->
		<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
		<!-- page_title(E) -->			
		<!-- opus_design_btn(S) -->
		<div class="opus_design_btn TOP">
		<%-- 
			<button type="button" class="btn_accent" onclick="doWork('SEARCHLIST');" style="display:none" btnAuth="<%= roleBtnVO.getAttr1() %>"><bean:message key="Search"/></button>
			<button type="button" class="btn_normal" onclick="doWork('ROWADD')" style="display:none" btnAuth="<%= roleBtnVO.getAttr2() %>"><bean:message key="Add"/></button>
			<button type="button" class="btn_normal" onclick="doWork('ADD')" id = "btnAdd" style="display:none" btnAuth="<%= roleBtnVO.getAttr3() %>"><bean:message key="Save"/></button>
			<button type="button" class="btn_normal" onclick="doWork('EXCEL')" style="display:none" btnAuth="<%= roleBtnVO.getAttr6() %>" name="btn_DownExcel"><bean:message key="Excel"/></button>
			<button type="button" class="btn_normal" onclick="doWork('COPY')" style="display:none" btnAuth="COPY" name="btnCopy"><bean:message key="Copy"/></button>
			 --%>
		</div>
		
		<!-- opus_design_btn(E) -->	
		    <!-- page_location(S) -->
		<div class="location">
        <!-- location 내용 동적생성 (별도 코딩 불필요) -->
			<span><%=LEV1_NM%></span> &gt;
		    <span><%=LEV2_NM%></span> &gt;
		    <span><%=LEV3_NM%></span>
		    <a href="" class="ir">URL Copy</a>
		</div>
	</div>
    <!-- page_location(E) -->   
	<div class="over_wrap" height="100%">    
		<div class="wrap_result"> 	
	
		<div class="layout_wrap">
		    <div class="layout_flex_fixed" style="width:600px;float:left!important" >
		    	<div id="disp_val_msg" style="width:100%;float:left!important;">
					<div class="layout_flex_fixed" style="width:800px;float:left!important">
				   		<h3 class="title_design">Role</h3>
					</div>
					<div class="opus_design_grid">
						<script type="text/javascript">comSheetObject('sheet1');</script>
					</div>
				</div>
		    </div>
		    <div style="padding-left: 810px;" id="role_fnc">
				<h3 class="title_design">Control Option</h3>
				<div class="opus_design_grid">
					<script type="text/javascript">comSheetObject('sheet2');</script>
				</div>
		    </div>
		</div>
	</div>         			
</div>	

</form>

<script type="text/javascript">
doBtnAuthority("<%= roleBtnVO.getAttr_extension() %>");
</script>	



