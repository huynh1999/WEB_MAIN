<%--
=========================================================
*@FileName   : EDI_ACI_0011.jsp
*@FileTitle  : CMM
*@Description: CBSA SUB LOCATION 캐나다 세관 
*@author     : Jigun,Oh
*@version    : 
*@since      : 

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
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/EDI_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/edi/aci/script/EDI_ACI_0011.js?ver=<%=CLT_JS_VER%>"></script>
	
	<!--ajax 사용시 -->
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	
	<!-- 모달창에서 paging이나 submit 할 경우 꼭 추가해야함. -->
	<base target="_self"/>
	<%
		String loc_tp_cd = request.getParameter("loc_tp_cd");
	%>
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
	<input type="hidden" id="loc_tp_cd" name = "loc_tp_cd" value="<%=loc_tp_cd%>"/>
	<div class="layer_popup_title">
		<!-- page_title_area -->
		<div class="page_title_area clear">
		   <h2 class="page_title">
				<span><bean:message key="CBSA_Sub_Location_Codes"/></span>
		   </h2>
		   <!-- btn_div -->
		   <div class="opus_design_btn">
			   <button type="button" class="btn_accent" onclick="searchList();"><bean:message key="Search"/></button><!-- 
			--><button type="button" class="btn_normal" onclick="doWork('CLOSE')"><bean:message key="Close"/></button>
		   </div>
		</div>
	</div>
	<div class="layer_popup_contents">
<div class="over_wrap" height="100%">
		<div class="wrap_search">	
		   	<div class="opus_design_inquiry ">
		   		<table>
					<tr>
						<th width="50"><bean:message key="Name"/></th>
						<td width="150"><input type="text" name="f_wh_nm" maxlength="50" class="search_form" value="" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:150px" onKeyPress="fncTpCodeSearch()"/></td>
						<th width="50"><bean:message key="Code"/></th>
						<td width="150"><input type="text" name="f_wh_id" maxlength="4" class="search_form" value="" style="width:150px;text-transform:uppercase;" onKeyPress="ComKeyOnlyAlphabet('uppernum')" onKeyPress="fncTpCodeSearch()"/></td>
						<th width="50"><bean:message key="Port_Relation"/></th>
						<td width="150"><input type="text" name="f_port_rlt_cd" maxlength="4" class="search_form" value="" style="width:150px;text-transform:uppercase;" onKeyPress="ComKeyOnlyAlphabet('uppernum')" onKeyPress="fncTpCodeSearch()"/></td>
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
</div>
</form>
