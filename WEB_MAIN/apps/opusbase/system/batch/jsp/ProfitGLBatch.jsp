<%--
=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : SYS_ROL_0010.jsp
*@FileTitle  : 롤 관리화면
*@author     : CLT
*@version    : 1.0
*@since      : 2014/06/04
=========================================================
--%>

<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ page import="com.clt.apps.opusbase.utils.LoginUserUtil,com.clt.apps.opusbase.login.dto.UserInfoVO"%>
	<!-- 공통 Header -->
    <%@include file="./../../../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	
	
	
	
	<!-- 해당 Action별 js -->
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SYS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="./apps/opusbase/system/batch/script/ProfitGLBatch.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/FMS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<bean:define id="batchVO"   name="EventResponse" property="objVal"/>
	<bean:define id="valMap"  name="EventResponse" property="mapVal"/>
<script>
function setupPage(){
	loadPage();
}	

var ofcCd = "<%= userInfo.getOfc_cd() %>";
</script>


<!-- page_title_area(S) -->
<div class="page_title_area clear ">
	<!-- page_title(S) -->
	<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	<!-- page_title(E) -->			
	<!-- opus_design_btn(S) -->
	<div class="opus_design_btn TOP">
	</div>
	
	<!-- opus_design_btn(E) -->	
	    <!-- page_location(S) -->
	<div class="location">
       <!-- location 내용 동적생성 (별도 코딩 불필요) -->
		<span><%=LEV1_NM%></span> &gt;
	    <span><%=LEV2_NM%></span> &gt;
	    <span><%=LEV3_NM%></span>
	</div>
</div>

<form name='frm1' method="post" action="./ProfitGLBatch.clt">
	<input	type="hidden" name="f_cmd"/>
<div class="over_wrap" height="100%">
	<div class="wrap_search">	
	<div class="opus_design_inquiry entry_pannel" style="width:100%">
		<table>
			<colgroup>
				<col width ="190px"> 
				<col width ="110px">
				<col width ="20px">
				<col width ="30px">
				<col width ="100px">
			</colgroup>
			<tbody>
				<tr>
				<td style="text-align:right">
				<b><bean:message key="Processing_Type"/></b>
				&nbsp;&nbsp;&nbsp;	
				</td>
					<td>
						<input type='checkbox' name='pfit' id='pfit'>
					<label for="pfit"><bean:message key="Volume_and_profit"/></label>
						
					</td>
					<td>				
						<input type='checkbox' name='gl' id="gl">
						<label for="gl"><bean:message key="GL"/></label>
						
					</td>
				</tr>
				<tr>
					<td style="text-align:right">
						<b><bean:message key="Processing_Date"/></b>
						&nbsp;&nbsp;&nbsp;
					</td>
					<td>
						<input type="text" class="search_form" name='proc_dt' style='width:75px' dataformat="mdy"  onblur="mkDateFormatType(this, event, true, 1);"  /><!-- 
						 --><button type="button" name="proc_dt_cal" id="proc_dt_cal" class="calendar" onclick="doDisplay('DATE1',frm1)"></button>
					</td>		
				</tr>
				<tr>
					<td style="text-align:right">
						 <br>
							<b><bean:message key="Last_Processed_Year_End"/></b>&nbsp;&nbsp;&nbsp;
					</td>
				</tr>
				<tr>
					<td  style="text-align:right;height:30px">
						<bean:message key="Date" />&nbsp;&nbsp;&nbsp;
					</td>
					<td>
						<input type='text' name='lst_proc_yr_end_stl' value="<bean:write name="batchVO" property="lst_proc_yr_end_stl"/>" readonly="readonly" style="width:75px"/>
					</td>
				</tr>						
				<tr>
					<td style="text-align:right">
					<br>
						<b><bean:message key="Last_Effective_Date"/></b>	&nbsp;&nbsp;
					</td>
				</tr>
				<tr>
					<td style="text-align:right">
						<bean:message key="Volume_and_profit"/>&nbsp;&nbsp;&nbsp;
					</td>
					<td>
						<input type='text' name='pfit_proc_dt' value="<bean:write name="batchVO" property="pfit_proc_dt"/>" readonly="readonly" style="width:75px"/>
					</td>
				</tr>
				<tr>
					<td style="text-align:right">
						<bean:message key="GL"/>&nbsp;&nbsp;&nbsp;
					</td>
					<td>
						<input type='text' name='gl_proc_dt' value="<bean:write name="batchVO" property="gl_proc_dt"/>" readonly="readonly" style="width:75px"/>
					</td>
						
				</tr>								
				<tr>
					<td style="text-align:right">	
					<br>
						<b><bean:message key="Last_Batch_Run_Executed_Date"/></b>&nbsp;&nbsp;&nbsp;
					</td>
				</tr>
				<tr>
					<td style="text-align:right">
						<bean:message key="Volume_and_profit"/>&nbsp;&nbsp;&nbsp;
					</td>
					<td>
						<input type='text' name='pfit_rgst_tms' value="<bean:write name="batchVO" property="pfit_rgst_tms"/>" readonly="readonly" style="width:75px"/>
					</td>
				</tr>
				<tr>
					<td style="text-align:right">
						<bean:message key="GL"/>&nbsp;&nbsp;&nbsp;
					</td>
					<td>
						<input type='text' name='gl_rgst_tms' value="<bean:write name="batchVO" property="gl_rgst_tms"/>" readonly="readonly" style="width:75px"/>
					</td>
						
				</tr>
				
		
				<tr>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
			</tbody>
		</table>
	</div>
	</div>
</div>

	
	<div style="display:none"><script language="javascript">comSheetObject('sheet1');</script>
	</div>
</form>



