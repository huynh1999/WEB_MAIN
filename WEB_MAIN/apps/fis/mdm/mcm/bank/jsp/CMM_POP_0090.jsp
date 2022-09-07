<%--
=========================================================
*@FileName   : CMM_POP_0090.jsp
*@FileTitle  : CMM
*@Description: BANK POP UP
*@author     : Chungrue
*@version    : 2011/11/28
*@since      : 2011/11/28

*@Change history:
=========================================================
--%>

<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>

	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<base target="_self"/>
    
	<title><bean:message key="system.title"/></title>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>

	<!-- 해당 Action별 js -->
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/PUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="./apps/fis/mdm/mcm/bank/script/CMM_POP_0090.js?ver=<%=CLT_JS_VER%>"></script>
	
		<script type="text/javascript">
		
		function setupPage(){
	    	loadPage();
	    }
	</script>

	<form name="form" method="POST" action="./">
		<!--Command를 담는 공통 -->
	<input	type="hidden" name="f_cmd"/>
	<input  type="hidden" name="f_CurPage"/>
	<input	type="hidden" name="openMean"/>
	<input	type="hidden" name="comboSel"/>
	<input	type="hidden" name="s_ofc_cd"/>
	<div class="layer_popup_title">	
			<!-- page_title_area(S) -->
		<div class="page_title_area clear">
			<!-- page_title(S) -->
			<h2 class="page_title"><span id="title"><bean:message key="Bank_Search"/></span></h2>
			<!-- page_title(E) -->
			<!-- opus_design_btn(S) -->
			<div class="opus_design_btn">
			   <button type="button" class="btn_accent"   onclick="doWork('SEARCHLIST')"><bean:message key="Search"/></button><!-- 
			--><button type="button" class="btn_normal"   onclick="doWork('CLOSE')"><bean:message key="Close"/></button>
		   </div>
			
		</div>
	</div>
	<div class="layer_popup_contents">
		<div class="wrap_result">
	    <div class="opus_design_grid">
	    	<script type="text/javascript">comSheetObject('sheet1');</script>
	    </div>
	    <table>
			<tr>
				<td width="40px"><!-- 
					 --><bean:define id="tmpMapVal" name="EventResponse" property="mapVal"/><!--
					 --><bean:define id="pagingVal" name="tmpMapVal"     property="paging"/><!--
					 --><paging:options name="pagingVal" defaultval="200"/></td>
				<td align="center"><!-- 
					 --><table><!--
						 --><tr><!--
							 --><td id="pagingTb" style='font-family: "Tahoma", "Arial", "Verdana";font-size: 11px;'><!--
							 --></td><!--
						 --></tr><!--
					 --></table></td>
				<td width="40px" height="10" colspan="2" align="right">&nbsp;</td>
			</tr>
		</table>
	</div>
	</div>
</form>	
	