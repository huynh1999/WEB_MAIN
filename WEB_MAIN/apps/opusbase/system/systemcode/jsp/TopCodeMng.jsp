<%--
=========================================================
*Copyright(c) 2008 CyberLogitec. All Rights Reserved.
=========================================================

=========================================================
*@FileName   : CodeMaster.jsp
*@FileTitle  : 마스터코드 관리
*@Description: 마스터 코드 조회/등록/수정/삭제 시 사용되는 메소드임
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
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />

	<!-- 해당 Action별 js -->
    <script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SYS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/opusbase/system/systemcode/script/TopCodeMng.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	
<script>
	function setupPage(){
       	loadPage();
    }
</script>

<form method="post" name="form" onSubmit="return false;">
	<input	type="hidden" name="f_cmd"> 
<!-- page_title_area -->
	<div class="page_title_area clear">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn TOP">
   		   <%-- 
   		   <button type="button" class="btn_accent"  onclick="doWork('SEARCHLIST')"><bean:message key="Search"/></button>
		   <button type="button" class="btn_normal" onclick="doWork('ROWADD')"><bean:message key="Add"/></button> 
		   <button type="button" class="btn_normal" id="btnAdd" onclick="doWork('ADD')"><bean:message key="Save"/></button> 
		   <button type="button" class="btn_normal" onclick="doWork('EXCEL')" name="btn_DownExcel"><bean:message key="Excel"/></button>
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

<div class="over_wrap" height="100%">	
	    <!-- Search option -->
    <div class="wrap_search">	
		<div class="opus_design_inquiry entry_pannel ">
			<table>
				<colgroup>
					<col width="60">
					<col width="130">
					<col width="60">
					<col width="*">
				</colgroup>	
				<tbody>
					<tr>
						<th><bean:message key="Master_Code"/></th>
						<td><!-- 
							 --><input type="text" name="f_master_cd" id="f_master_cd" maxlength="10" value="" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:110;" onKeyPress="ComKeyOnlyAlphabet('uppernum')" onKeyPress="fncSearch()">
						</td>
						
						<th><bean:message key="Name"/></th>
						<td><!-- 
							 --><input type="text" name="f_master_desc" id="f_master_desc" maxlength="200" value="" class="search_form"  style="ime-mode:inactive; text-transform:uppercase;width:400;"  onKeyPress="fncSearch()">
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	
	<!-- wrap_result (S) -->
    <div class="wrap_result">
		<div class="opus_design_grid">
			<script language="javascript">comSheetObject('sheet1');</script>
		</div>
	</div>
	<!-- wrap_result (E) -->
</div>	
</form>
<script>
    var pDoc = parent.parent.parent.document;
    hideProcess('WORKING', pDoc);   
</script>
