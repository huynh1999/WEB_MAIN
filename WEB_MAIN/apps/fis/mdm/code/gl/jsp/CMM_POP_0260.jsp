<%--
=========================================================
*@FileName   : CMM_POP_0260.jsp
*@FileTitle  : CMM
*@Description: GL CODE POP UP
*@author     : Chungrue
*@version    : 2011/11/30
*@since      : 2011/11/30

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
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/PUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="./apps/fis/mdm/code/gl/script/CMM_POP_0260.js?ver=<%=CLT_JS_VER%>"></script>

<script type="text/javascript">
<!--
function setupPage() {
	loadPage();
}
//-->
</script>		
<form name="form" method="POST" action="./">
		<!--Command를 담는 공통 -->
	<input	type="hidden" name="f_cmd"/>
	<input  type="hidden" name="f_CurPage"/>
	<input	type="hidden" name="openMean"/>
	<input	type="hidden" name="comboSel"/>
	
	<input	type="hidden" name="f_jnr_tp"/>
	<input	type="hidden" name="f_block_all_yn"/>
	
	<div class="layer_popup_title">
		<!-- page_title_area(S) -->
		<div class="page_title_area">
		   <h2 class="page_title"><span><bean:message key="GL_Code"/></span></h2>
		   <!-- btn_div -->
		   <div class="opus_design_btn">
			   <button type="button" class="btn_accent" onclick="searchList();"><bean:message key="Search"/></button><!-- 
			 --><button type="button" class="btn_normal" onclick="doWork('CLOSE')"><bean:message key="Close"/></button>
		   </div>
		</div>
	</div>
	<div class="layer_popup_contents">
		<!-- wrap search(S) -->
		<div class="wrap_search">
			<div class="opus_design_inquiry ">
				<table>
					<tr>
						<th width="60"><bean:message key="Code"/></th>
						<td width="100">
							<input type="text" name="s_gl_cd" maxlength="20" value="" onKeyDown="doSearch();" onKeyPress="ComKeyOnlyAlphabet('uppernum')" class="search_form" style="width:80px;">
						</td>
						
						<th width="75"><bean:message key="Description"/></th>
						<td width="150">
							<input type="text" name="s_gl_rmk" maxlength="200"  value="" onKeyDown="doSearch();" class="search_form" style="width:150px;">
						</td>
						<td></td>
					</tr>
				</table>
			</div>
		</div>
		<div class="wrap_result">
			<div class="opus_design_inquiry">
			<div class="opus_design_grid">
				<script language="javascript">comSheetObject('sheet1');</script>
			</div>	
			</div>
		</div>
	</div>
</form>


