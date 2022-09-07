<%--
=========================================================
*@FileName   : CMM_POP_0070.jsp
*@FileTitle  : CMM
*@Description: currency pop
*@author     : 이광훈 - currency pop
*@version    : 1.0 - 01/02/2009
*@since      : 01/02/2009

*@Change history:
=========================================================
--%>

<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>

	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
    <link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>

	<!-- 해당 Action별 js -->
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/PUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="./apps/fis/mdm/code/freight/script/CMM_POP_0070.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script>
		function setupPage(){
			loadPage();
		}
		
	</script>
<form name="form" method="POST" action="./">
		<!--Command를 담는 공통
		 -->
		<input	type="hidden" name="f_cmd"/>
		<input	type="hidden" name="openMean"/>	
		<input	type="hidden" name="air_sea_clss_cd"/>	
		<input	type="hidden" name="bnd_clss_cd"/>	
		<input	type="hidden" name="biz_clss_cd"/>	
		<input	type="hidden" name="tabStr"/>
		<input	type="hidden" name="inv_flg"/>
		<input	type="hidden" name="gnr_flg"/>
		<div class="layer_popup_title">
			<div class="page_title_area clear">
			   <h2 class="page_title"><button type="button"><bean:message key="Freight_Code"/></button></h2>
			   <!-- btn_div -->
			   <div class="opus_design_btn"><!--
			   --><button onclick="doWork('SEARCHLIST')" id="btnModify" class="btn_accent"><bean:message key="Search"/></button><!--
			   --><button onclick="doWork('CLOSE');" class="btn_normal"><bean:message key="Close"/></button>
			   </div>
			</div>
		</div>
		<div class="layer_popup_contents">
			<div class="wrap_search">
				<div class="opus_design_inquiry ">
					<table>
						<colgroup>
							<col width="60">
							<col width="100">
							<col width="75">
							<col width="*">
						</colgroup>
						<tr>
							<th><bean:message key="Code"/></th>
							<td>
								<input type="text" name="s_frt_cd" maxlength="10" value="" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:80px;" onKeyPress="ComKeyOnlyAlphabet('uppernum')" onKeyPress="if(event.keyCode==13){doWork('SEARCHLIST');}">
							</td>
							<th><bean:message key="Name"/></th>
							<td>
								<input type="text" name="s_frt_cd_nm" maxlength="100"  value="" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:150;" onKeyPress="if(event.keyCode==13){doWork('SEARCHLIST');}">
							</td>
						</tr>
					</table>			
				</div>
			</div>
			<div class="wrap_result">
				<div class="opus_design_grid">
					<script language="javascript">comSheetObject('sheet1');</script>
				</div>
			</div>
		</div>
</form>

