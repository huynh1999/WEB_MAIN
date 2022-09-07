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
    <script type="text/javascript" src="./apps/opusbase/system/report/script/ReportMng.js?ver=<%=CLT_JS_VER%>"></script>
	
	<script>
		function setupPage(){
			loadPage();
			//doWork('SEARCHLIST');
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
	   <button type="button" class="btn_accent" onclick="doWork('SEARCHLIST');" style="cursor:hand"><bean:message key="Search"/></button>
	   <button type="button" class="btn_normal" onclick="doWork('ROWADD');" style="cursor:hand"><bean:message key="Add"/></button>
	   <button type="button" id="btnSave" class="btn_normal" onclick="doWork('SAVE');" style="cursor:hand"><bean:message key="Save"/></button>
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
<div class="wrap_search">
	<div class="opus_design_inquiry ">
		
		<table style="width: 600px;">	
			<colgroup>
		        <col width="10">
	        	<col width="110">
	        	<col width="66">
	        	<col width="180">
			</colgroup>
			<tr>
				<th>Mrd Key.</th>
				<td><input type="text" id="f_mrd_key" value="" class="search_form" dataformat="excepthan" onKeyDown="if(event.keyCode == 13){doWork('SEARCHLIST')};" style="ime-mode:disabled;width:250px"/></td>
				<th>Program ID.</th>
				<td><input type="text" id="f_pgm_id" value="" class="search_form" dataformat="excepthan" onKeyDown="if(event.keyCode == 13){doWork('SEARCHLIST')};" style="ime-mode:disabled;width:100px"/></td>
			</tr>
		</table>
</div>
</div>
<div class="wrap_result">
	<div class="layout_wrap">
        <!-- opus_design_grid(E) -->
        <div class="opus_design_grid">
        	<script type="text/javascript">comSheetObject('sheet1');</script>
        </div>
	</div>
</div>
</div>
</form>
</html>