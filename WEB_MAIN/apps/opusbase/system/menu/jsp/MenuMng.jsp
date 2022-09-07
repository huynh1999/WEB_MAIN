<%--
=========================================================
*Copyright(c) 2008 CyberLogitec. All Rights Reserved.
=========================================================

=========================================================
*@FileName   : MENU.jsp
*@FileTitle  : 메뉴 표시
*@Description: 메뉴의 관리
*@author     : Kang,Jung-Gu - Cyberlogitec
*@version    : 1.0 - 08/07/2008
*@since      : 08/07/2008

*@Change history:
*@author: Tuan.Chau
*@version: 2.0 - 05/06/2014
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
	<!-- 공통 Header -->
    <%@include file="./../../../../../../../../syscommon/header/CLTHeader.jsp"%>
	
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css">
	
	<!-- 해당 Action별 js -->
    <script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SYS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript" src="./apps/opusbase/system/menu/script/MenuMng.js?ver=<%=CLT_JS_VER%>"></script>
	<script>
		function callFromSub(mLevel, mKey){
			document.forms[0].caller_level.value = mKey;
			document.forms[0].parent_seq.value   = mKey;
			doWork('SEARCHLIST');
		}
		
		function setupPage(){
	     	loadPage();
	     }
	</script>
<form method="post" name="frm1" onSubmit="return false;">
	<input	type="hidden" name="f_cmd"> 
	<input type="hidden" name="parent_seq"   value="">
	<input type="hidden" name="caller_level" value="">
	
	<div class="page_title_area clear">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn TOP">
	   <!-- 
	       	<button type="button" class="btn_accent" onclick="doWork('MOVE');" style="cursor:hand"><bean:message key="Move"/></button>
			<button type="button" class="btn_normal" onclick="doWork('ROWADD');" style="cursor:hand"><bean:message key="Add"/></button> 
			<button type="button" class="btn_normal" id="btnAdd" onclick="doWork('ADD')"  style="cursor:hand"><bean:message key="Save"/></button> 
			<button type="button" class="btn_normal" id="btnModify" onclick="doWork('MODIFY')" style="cursor:hand"><bean:message key="Modify"/></button> 
			<button type="button" class="btn_normal" id="btnDelete" onClick="doWork('REMOVE')" style="cursor:hand;"><bean:message key="Delete"/></button> 
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
    <!-- 타이틀, 네비게이션 -->
<div class="over_wrap" height="100%">    
<!-------------------- contents begin -------------------->
<div class="wrap_result">
	<div class="layout_wrap">
	   <div class="layout_flex_fixed line_bl1" style="width:350px;float:left!important ; height:600px; overflow:hidden; overflow-y:scroll">
	       
	            <iframe id='dispFr' src='./MenuMngSub.clt?workLevel=3' marginwidth='0' marginheight='0' topmargin='0' width="100%" height="100%" scrolling='yes' frameborder='0' style="margin-top:0px;width:350px; height:800px;top:0px;border:none;display:block;border:1 solid #d2d9e1"></iframe>
	       
	    </div>
	     <div style="padding-left:358px">
	        <!-- opus_design_grid(S) -->
	        <div class="opus_design_grid ">
	            <script type="text/javascript">comSheetObject('sheet1');</script>
	        </div>
	        <!-- opus_design_grid(E) -->
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