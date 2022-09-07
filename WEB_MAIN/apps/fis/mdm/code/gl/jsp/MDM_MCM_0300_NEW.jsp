<%
/*=========================================================
*Copyright(c) 2017 CyberLogitec. All Rights Reserved.
*@FileName   : MDM_MCM_0300.jsp
*@FileTitle  : GL Code
*@author     : CLT
*@version    : 1.0
*@since      : 2014/06/09
=========================================================*/
%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>

	<!-- 일자 및 달력팝업 호출 -->
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/MDM_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="./apps/fis/mdm/code/gl/script/MDM_MCM_0300_NEW.js?ver=<%=CLT_JS_VER%>"></script>
	
	
	<script>
		var pDoc = parent.parent.parent.document;
		hideProcess('WORKING', pDoc);
		
		var PARAM1_1 = '';
		var PARAM1_2 = '';
		var PARAM3_1 = '';
		var PARAM3_2 = '';
		
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
	    
		var PARAM2_1 = '';
		var PARAM2_2 = '';
		
		<% isBegin = false; %>
	    <!-- Role Level-->
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
	    <!-- Party Type Code 코드조회-->
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
	    function setupPage(){
	     	loadPage();
	     }
	</script>

<form name="frm1" method="POST" action="./">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd" id="f_cmd" />
	<input type="hidden" name="f_CurPage" id="f_CurPage" />
	<input type="hidden" name="trdp_cd" id="trdp_cd" />
	<input type="hidden" name="gl_cd_s" id="gl_cd_s" />
    <!-- 타이틀, 네비게이션 -->
	<!-- page_title_area(S) -->
	<div class="page_title_area clear">
		<!-- page_title(S) -->
		<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
		<!-- page_title(E) -->
		<!-- opus_design_btn(S) -->
		<div class="opus_design_btn TOP">
		</div>
		<!-- opus_design_btn(E) -->
	
		<!-- page_location(S) -->
		<div class="location">	
			<span><%=LEV1_NM%></span> &gt;
		    <span><%=LEV2_NM%></span> &gt;
		    <span><%=LEV3_NM%></span>
		    <a href="" class="ir">URL Copy</a>
		</div>
		<!-- page_location(E) -->
			
	</div>
	<!-- page_title_area(E) -->
	
	
	<!-- opus_design_inquiry(S) -->
<div class="over_wrap" height="100%">
	<div class= "wrap_search">
		<div class="opus_design_inquiry entry_pannel ">
			<table>
				<colgroup>
					<col width="70">
					<col width="110">
					<col width="90">
					<col width="*">
				</colgroup>
				<tbody>
					<tr>
						<th><bean:message key="GL_Code"></bean:message></th>
						<td>
							<input type="text" name="s_gl_cd" id="s_gl_cd" maxlength="20" value="" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:110px;" onkeypress="ComKeyOnlyAlphabet('uppernum')"  />
							</td>
						<th><bean:message key="GL"></bean:message> <bean:message key="Name"></bean:message></th>	
						<td>
							<input type="text" name="s_gl_nm" id="s_gl_nm" maxlength="50" value="" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:100px;" onkeypress="fncSearch()"  />
							</td>
						
						<td></td>	
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	<!-- opus_design_inquiry(E) -->
	
	<div class="wrap_result">
		<!-- layout_wrap(S) -->
		<div class="layout_wrap">
		    <div class="layout_vertical_3" style="width:69%;">
				 <!-- opus_design_grid(S) -->
				 <div class="opus_design_grid" id="mainTable">
				 <h3 class="title_design"><bean:message key="GL_Master"></bean:message></h3>
					<!-- opus_design_btn(S) -->
					<div class="opus_design_btn">
						<button type="button" class="btn_normal" onclick="doWork('ADD_SIBLING')" id="btnAddSibling" name="btnAddSibling"><bean:message key="Add_Sibling"/></button> 
						<button type="button" class="btn_normal" onclick="doWork('ADD_CHILD')"   id="btnAddChild"   name="btnAddChild"><bean:message key="Add_Child"/></button> 
						<button type="button" class="btn_normal" onclick="doWork('SAVE')"  		 id="btnSave"       name="btnSave"><bean:message key="Save"/></button>
					</div>
					<span class="clear"></span>
					<!-- opus_design_btn(E) -->
					<script type="text/javascript">comSheetObject('sheet1');</script>
				</div>
				<!-- opus_design_grid(E) -->
		    </div>
		    
		     <div class="layout_vertical_3 mar_left_8" style="width:30%;">
				<h3 class="title_design"><bean:message key="Local_Name"></bean:message></h3>
				      	  
				<div class="opus_design_inquiry">
					<table class="grid_2">
						<colgroup>
							<col width="90">
							<col width="*">
						</colgroup>
						<tbody>
							<tr>
								<th><bean:message key="GL_Code"></bean:message></th>
								<td><input type="text" name="i_gl_cd" id="i_gl_cd" maxlength="20" readonly value="" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:100%;" /></td>
							</tr>
							<tr>
								<th><bean:message key="Name"></bean:message></th>	
								<td><input type="text" name="i_gl_nm" id="i_gl_nm" maxlength="50" readonly value="" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:100%;"  /></td>
							</tr>
						</tbody>
					</table>
				</div>
				
			    <!-- opus_design_grid(S) -->
				<div class="opus_design_grid" >
					<!-- opus_design_btn(S) -->
					<div class="opus_design_btn">
						<button type="button" class="btn_normal" onclick="doWork('LCLADD')"    id="btnLclAdd"   name="btnAddSibling"><bean:message key="Add"/></button> 
						<button type="button" class="btn_normal" onclick="doWork('LCLDELETE')" id="btnLclDel"   name="btnAddChild"><bean:message key="Delete"/></button> 
						<button type="button" class="btn_normal" onclick="doWork('LCLSAVE')"   id="btnLclSave"  name="btnSave"><bean:message key="Save"/></button>
					</div>
					<!-- opus_design_btn(E) -->
					<script type="text/javascript">comSheetObject('sheet2');</script>
				</div>
				<!-- opus_design_grid(E) -->
		    </div>
		    <div class="layout_vertical_3 mar_left_8" style="min-width:1%;"></div>
		</div>
		<!-- layout_wrap(E) -->
		
		 <h3 class="title_design"><bean:message key="History"/></h3>
        <div class="opus_design_grid">
			<script type="text/javascript">comSheetObject('sheet3');</script>
		</div> 
	</div>
</div>
</form>
<script type="text/javascript">
		doBtnAuthority("<%= roleBtnVO != null ? roleBtnVO.getAttr_extension() : "" %>");
</script>

