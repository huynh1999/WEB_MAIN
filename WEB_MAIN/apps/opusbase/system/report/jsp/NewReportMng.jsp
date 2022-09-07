<%--
=========================================================
*Copyright(c) 2008 CyberLogitec. All Rights Reserved.
=========================================================

=========================================================
*@FileName   : NewReportMng.jsp
*@FileTitle  : New report Manage
*@Description: New report Manage
*@author     : Duc.Nguyen
*@version    : 1.0 - 2017/12/04
*@since      : 2017/12/04

*@Change history:
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
	<!-- 공통 Header -->
    <%@include file="./../../../../../../../../syscommon/header/CLTHeader.jsp"%>
	
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css">
	
	<!-- 해당 Action별 js -->
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SYS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/MDM_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/COM_FRT_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="./apps/opusbase/system/report/script/NewReportMng.js?ver=<%=CLT_JS_VER%>"></script>
		
	<bean:define id="valMap" name="EventResponse" property="mapVal"/>
	<script>
		var MDLCD1 = '';
		var MDLCD2 = '';
		var MRDCD1 = '';
		var MRDCD2 = '';
		var PPRCD1 = '';
		var PPRCD2 = '';
		var LANGCD1 = '';
		var LANGCD2 = '';
		function setSelect(){
			var formObj = document.frm1;			
			<!-- Module ID -->
	        <logic:notEmpty name="valMap" property="mdl_cd">
				<% boolean isBegin = false; %>
	            <bean:define id="mdlList" name="valMap" property="mdl_cd"/>
	            <logic:iterate id="codeVO" name="mdlList">
	                <% if(isBegin){ %>
	                	MDLCD1 += '|';
	                	MDLCD2 += '|';
	                <% }else{
	                      isBegin = true;
	                   } %>
                   MDLCD1 += '<bean:write name="codeVO" property="name"/>';
                   MDLCD2 += '<bean:write name="codeVO" property="code"/>';
	            </logic:iterate>
	        </logic:notEmpty>
	        <!-- MRD path -->
	        <logic:notEmpty name="valMap" property="mrd_patch_cd">
				<% boolean isBegin = false; %>
	            <bean:define id="mrdList" name="valMap" property="mrd_patch_cd"/>
	            <logic:iterate id="codeVO" name="mrdList">
	                <% if(isBegin){ %>
	                	MRDCD1 += '|';
	                	MRDCD2 += '|';
	                <% }else{
	                      isBegin = true;
	                   } %>
	                   MRDCD1 += '<bean:write name="codeVO" property="name"/>';
	                   MRDCD2 += '<bean:write name="codeVO" property="code"/>';
	            </logic:iterate>
	        </logic:notEmpty>
	        <!-- Paper -->
	        <logic:notEmpty name="valMap" property="ppr_tp_cd">
				<% boolean isBegin = false; %>
	            <bean:define id="pprList" name="valMap" property="ppr_tp_cd"/>
	            <logic:iterate id="codeVO" name="pprList">
	                <% if(isBegin){ %>
	                	PPRCD1 += '|';
	                	PPRCD2 += '|';
	                <% }else{
	                      isBegin = true;
	                   } %>
	                   PPRCD1 += '<bean:write name="codeVO" property="name"/>';
	                   PPRCD2 += '<bean:write name="codeVO" property="code"/>';
	            </logic:iterate>
	        </logic:notEmpty>
	        <!-- Language -->
	        <logic:notEmpty name="valMap" property="lang_cd">
				<% boolean isBegin = false; %>
	            <bean:define id="langList" name="valMap" property="lang_cd"/>
	            <logic:iterate id="codeVO" name="langList">
	                <% if(isBegin){ %>
	                	LANGCD1 += '|';
	                	LANGCD2 += '|';
	                <% }else{
	                      isBegin = true;
	                   } %>
	                   LANGCD1 += '<bean:write name="codeVO" property="name"/>';
	                   LANGCD2 += '<bean:write name="codeVO" property="code"/>';
	            </logic:iterate>
	        </logic:notEmpty>
		}
	</script>
	<script>
		function setupPage(){
			setSelect();
			loadPage();
		}
	</script>
</head>
<form method="post" name="frm1" onSubmit="return false;">
<input	type="hidden" name="f_cmd"> 
<input type="hidden" name="parent_seq"   value="">
<input type="hidden" name="caller_level" value="">
<input type="hidden" name="p_pgm_id" id="p_pgm_id">
<input type="hidden" name="pop_yn" id="pop_yn" value="">

<div class="page_title_area clear">
   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
   <!-- btn_div -->
   <div class="opus_design_btn TOP">
	   <!-- <button type="button" class="btn_accent" onclick="doWork('SEARCHLIST');" style="cursor:hand"><bean:message key="Search"/></button>
	   <button type="button" id="btnSave" class="btn_normal" onclick="doWork('SAVE');" style="cursor:hand"><bean:message key="Save"/></button> -->
   </div>
   <!-- btn_div -->
   <div class="location">
	   <span><%=LEV1_NM%></span> &gt;
	   <span><%=LEV2_NM%></span> &gt;
	   <span><%=LEV3_NM%></span>
	   <a href="" class="ir">URL Copy</a>
   </div>
</div>
<div class="over_wrap" height="100%">
<div class="wrap_search">
	<div class="opus_design_inquiry entry_pannel">
		<table>	
			<colgroup>
		        <col width="50">
	        	<col width="110">
	        	<col width="80">
	        	<col width="110">
	        	<col width="100">
	        	<col width="210">
	        	<col width="60">
	        	<col width="*">
			</colgroup>
			<tr>
				<th><bean:message key="Call_ID"/></th>
				<td><input type="text" id="f_call_id" value="" class="search_form" dataformat="excepthan" onKeyDown="if(event.keyCode == 13){doWork('SEARCHLIST')};" style="ime-mode:disabled;width:100px;text-transform:uppercase;"/></td>
				<th><bean:message key="Report_ID"/></th>
				<td><input type="text" id="f_rpt_id" value="" class="search_form" dataformat="excepthan" onKeyDown="if(event.keyCode == 13){doWork('SEARCHLIST')};" style="ime-mode:disabled;width:100px;text-transform:uppercase;"/></td>
				<th><bean:message key="Report_Name"/></th>
				<td><input type="text" id="f_rpt_nm" value="" class="search_form" dataformat="excepthan" onKeyDown="if(event.keyCode == 13){doWork('SEARCHLIST')};" style="ime-mode:disabled;width:200px"/></td>
				<th><bean:message key="Paper"/></th>				
				<td>
					<select name="f_ppr_cd" id="f_ppr_cd" style="width:100px;" onKeyPress="if(event.keyCode==13){doWork('SEARCHLIST');}">
						<option value=''>All</option>
                     		<bean:define id="pprTpList"  name="valMap" property="ppr_tp_cd"/>
							<logic:iterate id="codeVO" name="pprTpList">
                     			<option value='<bean:write name="codeVO" property="code"/>'><bean:write name="codeVO" property="name"/></option>
                     		</logic:iterate>
                 	</select>
				</td>
			</tr>
		</table>
	</div>
</div>
<div class="wrap_result">
	<!-- opus_design_grid(S) -->
    <div class="opus_design_grid">
    	<!-- opus_design_btn(S) -->
		<div class="opus_design_btn">
     		<button type="button"  class="btn_normal" name="btn_del" id="btn_del" onclick="doWork('ROWADD')"><bean:message key="Add"/></button>
     		<button type="button"  class="btn_normal" name="btn_pdf_up" id="btn_pdf_up" onclick="doWork('UPLOAD')"><bean:message key="PDF_Upload"/></button>
     	</div>
     	<!-- opus_design_btn(E) -->
		<script type="text/javascript">comSheetObject('sheet1');</script>
   	</div>
   	<!-- opus_design_grid(E) -->	

</div>
</div>
</form>

<form name="frm2" method="POST" action="./GateServlet.gsl">
    <input type="hidden" name="goWhere" value="fd"/>
    <input type="hidden" name="bcKey"   value="rlFileDown"/>
    <input type="hidden" name="pdf_nm" value=""/>
    <input type="hidden" name="pdf_path" value=""/>
</form>
</html>