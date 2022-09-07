<%--
=========================================================
*Copyright(c) 2017 DouNetwork. All Rights Reserved.
=========================================================

=========================================================
*@FileName   : ReportSetMng.jsp
*@FileTitle  : Report Set Management
*@Description: 
*@author     : Diem.Huynh - DouNetwork
*@version    : 1.0 - 12/04/2017
*@since      : 12/04/2017

*@Change history:
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
	<!-- 공통 Header -->
    <%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/MDM_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/apps/opusbase/system/report/script/ReportSetMng.js?ver=<%=CLT_JS_VER%>"></script>
	
	
		<bean:define id="rtnMap" name="EventResponse" property="mapVal"/>
	<script type="text/javascript">
		function setupPage(){
			loadPage();
			//doWork('SEARCHLIST');
		}
	</script>

<form method="post" name="frm1" onSubmit="return false;">
<input	type="hidden" name="f_cmd"/> 
<input type="hidden" name="f_rpt_set_id"/>

<div class="page_title_area clear">
   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
   <!-- btn_div -->
   <div class="opus_design_btn TOP"></div>
   <!-- btn_div -->
   <div class="location">
	   <span><%=LEV1_NM%></span> &gt;
	   <span><%=LEV2_NM%></span> &gt;
	   <span><%=LEV3_NM%></span>
	   <a href="" class="ir">URL Copy</a>
   </div>
</div>

<div class="wrap_search">
	<div class="opus_design_inquiry">
		
		<table style="width: 600px;">	
			<colgroup>
		        <col width="10">
	        	<col width="110">
	        	<col width="66">
	        	<col width="180">
			</colgroup>
			<tr>
				<th><bean:message key="Call_ID"/></th>
				<td><input type="text" id="f_call_id" value="" class="search_form" maxlength="50" style="ime-mode:disabled;width:150px; margin-right: 100px"/></td>
				<th><bean:message key="Report_ID"/></th>
				<td><input type="text" id="f_rpt_id" value="" class="search_form" maxlength="50" style="ime-mode:disabled;width:150px; margin-right: 100px"/></td>
				<th><bean:message key="Report_Set"/></th>
				<td>
                	<bean:define id="paramList"  name="rtnMap" property="PARAM"/>
                		<select name="f_set_id" id="f_set_id" style="width:110px;">
							<logic:iterate id="codeVO" name="paramList">
                				<option value='<bean:write name="codeVO" property="cd_val"/>'><bean:write name="codeVO" property="cd_nm"/></option>
                			</logic:iterate>
                	</select>
                </td>
			</tr>
		</table>
	</div>
</div>
<div class="wrap_result">
	        <!-- opus_design_grid(E) -->
	        <div class="opus_design_grid">
				<!-- opus_design_btn(E) -->
	        	<script type="text/javascript">comSheetObject('sheet1');</script>
	        </div>
</div>
</form>