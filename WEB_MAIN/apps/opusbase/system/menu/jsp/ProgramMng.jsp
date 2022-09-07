<%--
=========================================================
*Copyright(c) 2008 CyberLogitec. All Rights Reserved.
=========================================================

=========================================================
*@FileName   : PROGRAM.jsp
*@FileTitle  : 프로그램 관리화면
*@Description: 프로그램 관리화면
*@author     : Kang,Jung-Gu - Cyberlogitec
*@version    : 1.0 - 08/07/2008
*@since      : 08/07/2008

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
    <script type="text/javascript" src="./apps/opusbase/system/menu/script/ProgramMng.js?ver=<%=CLT_JS_VER%>"></script>
	
    <bean:define id="valMap" name="EventResponse" property="mapVal"/>    
	<script>
		function callFromSub(mLevel, mKey){
			document.forms[0].caller_level.value = mKey;
			document.forms[0].parent_seq.value   = mKey;
			doWork('SEARCHLIST');
		}
		
		<!-- ###Tp 코드## -->
		var btCssCode = '';
		var btCssName = '';
		<% boolean isBegin = false; %>
	    <bean:define id="cdList" name="valMap" property="codeList"/>
		<logic:iterate id="ComCdDtlVO" name="cdList">
			<% if(isBegin){ %>
			btCssCode+= '|';
			btCssName+= '|';
			<% }else{
				  isBegin = true;
			   } %>
			   btCssCode+= '<bean:write name="ComCdDtlVO" property="cd_val"/>';
			   btCssName+= '<bean:write name="ComCdDtlVO" property="rmk"/>';
		</logic:iterate>
		
		<!-- ###Tp 코드## -->
		var initDispCode = '';
		var initDispName = '';
		<% isBegin = false; %>
	    <bean:define id="cdList" name="valMap" property="initDispCodeList"/>
		<logic:iterate id="ComCdDtlVO" name="cdList">
			<% if(isBegin){ %>
			initDispCode+= '|';
			initDispName+= '|';
			<% }else{
				  isBegin = true;
			   } %>
			   initDispCode+= '<bean:write name="ComCdDtlVO" property="cd_val"/>';
			   initDispName+= '<bean:write name="ComCdDtlVO" property="cd_nm"/>';
		</logic:iterate>
		
		function setupPage(){
	     	loadPage();
	     	var height = $(window).height()
	     	$("#dispFr").css("height", height - 120);
	     }
	</script>
</head>
<form method="post" name="frm1" onSubmit="return false;">
	<input	type="hidden" name="f_cmd"> 
	<input type="hidden" name="parent_seq"   value="">
	<input type="hidden" name="caller_level" value="">
	<input type="hidden" name="p_pgm_id" id="p_pgm_id">
	
	<div class="page_title_area clear">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn TOP">
	   		<!-- 
		   <button type="button" class="btn_accent" onclick="doWork('MOVE');" style="cursor:hand"><bean:message key="Move"/></button>
		   <button type="button" class="btn_normal" onclick="doWork('ROWADD');" style="cursor:hand"><bean:message key="Add"/></button>
		   <button type="button" class="btn_normal" id="btnAdd" onclick="doWork('ADD')"  style="cursor:hand"><bean:message key="Save"/></button>
		   <button type="button" class="btn_normal" id="btnModify" onclick="doWork('MODIFY')" style="cursor:hand"><bean:message key="Modify"/></button>
		   <button type="button" class="btn_normal" id="btnDelete"onClick="doWork('REMOVE')" style="cursor:hand;"><bean:message key="Delete"/></button>
		   <button type="button" class="btn_normal" onClick="doWork('EXCEL')" style="cursor:hand;" name="btn_DownExcel"><bean:message key="Excel"/></button>
		    -->
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
<div class="wrap_result">
	<div class="opus_design_inquiry">
	    <div class="layout_flex_fixed" style="width:250px;float:left!important">
	        <!-- opus_design_grid(S) -->
	        <div class="opus_design_grid">
	            <iframe id='dispFr' src='./ProgramMngSub.clt?workLevel=4' marginwidth='0' marginheight='0' topmargin='0' width="100%" height="100%" frameborder='0' style="margin-top:0px;width:250px; height:100%;top:0px;border:none;display:block;border:1 solid #d2d9e1"></iframe>
	        </div>
	        <!-- opus_design_grid(E) -->
	    </div>
	   
		<div>
	    <div class="layout_flex_flex" style="padding-left:258px">
	        <!-- opus_design_grid(S) -->
	        <div class="opus_design_grid">
	            <script type="text/javascript">comSheetObject('sheet1');</script>
	        </div>
	        <!-- opus_design_grid(E) -->
	        <div class="opus_design_grid">
	        <h3 class="title_design">Buttons</h3>
	        	<div class="opus_design_btn"> 
					<button id="btnRowAdd2" type="button" onClick="doWork('ROWADD2')" class="btn_normal"><bean:message key="Add"/></button>
					<button id="btnSave2" type="button" onClick="doWork('SAVE2');" class="btn_normal"><bean:message key="Save"/></button>
				</div>
	        	<script type="text/javascript">comSheetObject('sheet2');</script>
	        </div>
	    </div>
	    </div>
	</div>
</div>
</div>
</form>
<script>
    var pDoc = parent.parent.parent.document;
    hideProcess('WORKING', pDoc);   
</script>
</html>