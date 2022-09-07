<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
    
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
    <title><bean:message key="system.title"/></title>

	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SEA_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="./apps/opusbase/system/report/script/ReportSetPop.js?ver=<%=CLT_JS_VER%>"></script>
	
<script type="text/javascript">
<!--
function setupPage() {
	//loadPage();
}
//-->

</script>
<form name="frm1" method="POST">
	<!-- Report Value -->
	<input	type="hidden" name="f_cmd"/> 
	<div class="layer_popup_title">
	<!-- page_title_area -->
	<div class="page_title_area clear">
	   <h2 class="page_title">
			<span><bean:message key="Report_Set_Title"/></span>
	   </h2>
	   
	</div>
	</div>
	<div style="width:300px; height:200px;margin-top: 60px">
		<table style="width: 300px;height: 100px;margin-left:50px">
			<tr>
				<td colspan="2">
					<bean:define id="rowSet" name="EventResponse" property="listVal"/> 
					<select name="f_rpt_set_cd" id="f_rpt_set_cd" style="width:270px;height:30px">
						<option value=""><bean:message key="Report_Set_Name" /></option> 
					<logic:iterate id="row" name="rowSet">
						<option value='<bean:write name="row" property="cd_val"/>'>
							<bean:write name="row" property="cd_nm" />
						</option>
					</logic:iterate>
					 </select>
				</td>
			</tr>
				<td>
					<button type="button" class="btn_normal" onclick="doWork('OK')"  style="width:115px;height:30px">
						<bean:message key="OK" />
					</button>
				</td>
				<td>
					<button type="button" class="btn_normal" onclick="doWork('CANCEL')" style="width:115px;height:30px;margin-right:5px">
						<bean:message key="Cancel" />
					</button>
				</td>
			</tr>
		</table>
	</div>

</form>
</body>
</html>

	        	    
			