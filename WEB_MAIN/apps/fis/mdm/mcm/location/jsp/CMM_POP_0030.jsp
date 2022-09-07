<%--
=========================================================
*@FileName   : CMM_POP_0030.jsp
*@FileTitle  : CMM
*@Description: location/node pop
*@author     : 이광훈 - location/node pop
*@version    : 1.0 - 01/06/2009
*@since      : 02/04/2009 화면 전체 수정 화의 담당자 김상근, 정원영, 강길남.

*@Change history:
=========================================================
--%>

<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>

	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />

	<!-- 해당 Action별 js -->
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/PUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="./apps/fis/mdm/mcm/location/script/CMM_POP_0030.js?ver=<%=CLT_JS_VER%>"></script>
	
	<!--ajax 사용시 -->
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	
	<!-- 모달창에서 paging이나 submit 할 경우 꼭 추가해야함. -->
	<base target="_self"/>
	
	<script language="javascript">
		function setupPage(){
	       	loadPage();
	    }
	</script>
<form name="form" method="POST" action="./">
	<!--Command를 담는 공통
	 -->
	<input	type="hidden" name="f_cmd"/>
	<input	type="hidden" name="openMean"/>
	<input	type="hidden" name="f_CurPage"/> 
	
	<input	type="hidden" name="s_conti_code"/> 
	<input	type="hidden" name="s_cnt_code"/>
	<input	type="hidden" name="view_code"/>
	<!--#342 [CLA] VOLUME & PROFIT REPORT IMPROVEMENTS - 2. addition [CHK)] multi-selection Duc.Nguyen 2017.09.21)  -->
	<input type="hidden" name="f_MultiSelect" />
	<div class="layer_popup_title">
		<!-- page_title_area -->
		<div class="page_title_area clear">
		   <h2 class="page_title">
				<span><bean:message key="Location_Code"/></span>
		   </h2>
		   <!-- btn_div -->
		   <div class="opus_design_btn">
		   <!--#342 [CLA] VOLUME & PROFIT REPORT IMPROVEMENTS - 2. addition [CHK)] multi-selection Duc.Nguyen 2017.09.21)  -->
		   <button type="button" style="display:none" id="btnApply" class="btn_normal" onclick="doWork('APPLY')" ><bean:message key="Apply"/></button><!-- 
		    --><button type="button" class="btn_accent" onclick="searchList();"><bean:message key="Search"/></button><!-- 
			--><button type="button" class="btn_normal" onclick="doWork('CLOSE')"><bean:message key="Close"/></button>
		   </div>
		</div>
	</div>
	<div class="layer_popup_contents">
		<div class="wrap_search">	
		   	<div class="opus_design_inquiry ">
		   		<table>
					<tr>
						<th width="50"><bean:message key="Name"/></th>
						<td width="150"><input type="text" name="s_loc_nm" maxlength="50" class="search_form" value="" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:150px" onKeyPress="fncTpCodeSearch()"/></td>
						<th width="50"><bean:message key="Code"/></th>
						<td width="150"><input type="text" name="s_loc_cd" maxlength="5" class="search_form" value="" style="width:150px;text-transform:uppercase;" onKeyPress="ComKeyOnlyAlphabet('uppernum')" onKeyPress="fncTpCodeSearch()"/></td>
						<th width="50" class="table_search_head"><bean:message key="Type"/></th>
						<td> 
						 <bean:define id="cdMap"  name="EventResponse" property="mapVal"/> 
						 <bean:define id="cdList" name="cdMap" property="locationType"/> 
						 <select name="s_loc_tp_code" class="search_form" style="width:140px;"> 
						 	<option value="">All</option> 
						 	<logic:iterate id="codeVO" name="cdList"> 
						  			<option value='<bean:write name="codeVO" property="cd_val"/>'><bean:write name="codeVO" property="cd_nm"/></option> 
						 	</logic:iterate> 
						  </select> 
						 </td>
					</tr>
				</table>
		   	</div>
		</div>
		<!-- wrap_result (S) -->
	    <div class="wrap_result">
			<div class="opus_design_inquiry">
				<div class="opus_design_grid">
					<script language="javascript">comSheetObject('sheet1');</script>
				</div>
				<table>
					<tr>
						<td width="55px"> 
						 <bean:define id="tmpMapVal" name="EventResponse" property="mapVal"/> 
						 <bean:define id="pagingVal" name="tmpMapVal"     property="paging"/> 
						 <paging:options name="pagingVal" defaultval="200"/> 
						 </td>								
						 <td id="pagingTb" style='font-family: "Tahoma", "Arial", "Verdana";font-size: 11px;'></td> 
					</tr>
				</table>
			</div>
		</div>
	</div>
</form>

