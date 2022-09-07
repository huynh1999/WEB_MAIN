<%
/*=========================================================
*Copyright(c) 2015 DOU Network. All Rights Reserved.
*@FileName   : MDM_MCM_0350.jsp
*@FileTitle  : Truck size type
*@author     : DOU
*@version    : 1.0
*@since      : 2015/07/13
=========================================================*/
%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	<!-- 일자 및 달력팝업 호출 -->
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/MDM_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="./apps/fis/mdm/code/trucksizetype/script/MDM_MCM_0350.js?ver=<%=CLT_JS_VER%>"></script>
	
	
	<script type="text/javascript">
		function setupPage(){
			loadPage();
		}
	</script>
	<form name="frm1" method="POST" action="./">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd" id="f_cmd" />
	<input type="hidden" name="f_CurPage" id="f_CurPage" />
	
	<div class="page_title_area clear">
			<!-- page_title(S) -->
			<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
			<!-- page_title(E) -->
			<!-- page_location(S) -->
			<!-- opus_design_btn(S) -->
			<div class="opus_design_btn TOP">
				<!-- 
			    <button type="button" class="btn_accent" name="btnSearch" id="btnSearch"  onclick="doWork('SEARCH')"><bean:message key="Search"/></button> 
				<button type="button" class="btn_normal" id="btnModify"  name="btnModify" onclick="doWork('MODIFY')"><bean:message key="Save"/> 
				<button type="button" class="btn_normal" id="btnModify"  name="btnModify" onclick="doWork('EXCEL')"><bean:message key="Excel"/></button>
				-->
			</div>
			<!-- opus_design_btn(E) -->
			<div class="location">	
				 <span><%=LEV1_NM%></span> &gt;
			 	 <span><%=LEV2_NM%></span> &gt;
			  	 <span><%=LEV3_NM%></span>
		   		<a href="" class="ir">URL Copy</a>
			</div>
			<!-- page_location(E) -->			
	</div>
    <!-- page_title_area(E) -->	
	
	<!-- wrap search (S) -->
<div class="over_wrap" height="100%">
 	<div class="wrap_search">
	    <!-- inquiry_area(S) -->	
		<div class="opus_design_inquiry entry_pannel ">
			<table>
				<colgroup>
					<col width="50">
					<col width="100">
					<col width="100">
					<col width="200">
					<col width="100">
					<col width="*">
				</colgroup>
				<tbody>
			        <tr>
						<th><bean:message key="Code"/></th>
			           	<td>
			           		<input type="text" name="sCode" id="sCode" value="" dataformat="engup" style="width:80px;text-transform:uppercase" class="search" maxlength = "4" >
			 			</td>
			 			
			 			<th><bean:message key="Description"/></th>
			           	<td>
			           		<input type="text" name="sDecs" id="sDecs" value="" style="width:200px;" class="search">
			 			</td>
			 			
			 			<th><bean:message key="Active"/></th>
			           	<td>
			           		<select type="text" name="sActive" id="sActive"  style="width:100px;" class="search" >
			           			<option value="">All</option>
			           			<option value="Y">Active</option>
			           			<option value="N">Inactive</option>
			           		</select>
			 			</td>
			   		</tr>
		        </tbody>
	   	 	</table>
		</div>
	     <!-- inquiry_area(S) -->	
	</div>
	<!-- wrap search (E) -->
	
	<!-- wrap search (E) -->		
	<div class="wrap_result">
		<div class="opus_design_grid" >
			<!-- opus_design_btn(S) -->
			<div class="opus_design_btn">
				<button type="button" class="btn_normal" name="sheetAdd" id="sheetAdd" onclick="doWork('ROWADD')" btnType="BTN_ADD"><bean:message key = "Add" /></button><!--
			 --></div>
			<!-- opus_design_btn(E) -->
			<script type="text/javascript">comSheetObject('sheet1');</script>
		</div>
	</div>
</div>
</form>

