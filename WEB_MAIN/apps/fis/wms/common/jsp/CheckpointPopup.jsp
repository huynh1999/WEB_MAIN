<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/ModalCalendar.js?ver=<%=CLT_JS_VER%>"></script>
    
	<script type="text/javascript" src="./js/common/message/<%=CLT_MSG_PATH%>/WMS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script> 	
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="./apps/fis/wms/common/js/CheckpointPopup.js?ver=<%=CLT_JS_VER%>"></script>
    
    <%@ page import="com.clt.syscommon.response.CommonEventResponse"%>
    <bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
    
<%
	
	String req_svc_cd = "";
	
	try {
		req_svc_cd = request.getParameter("req_svc_cd")== null?"":request.getParameter("req_svc_cd");
	}catch(Exception e) {
		out.println(e.toString());
	}	
	
%>

<script>
	var codeText = '';
	var codeCode = '';
</script>

<logic:notEmpty name="cdMap" property="code">
 	<bean:define id="MsList" name="cdMap" property="code"/>
	<script>

	<% boolean isBegin = false; %>
          <logic:iterate id="codeVO" name="MsList">
              <% if(isBegin){ %>
              codeText+= '|';
              codeCode+= '|';
              <% }else{
                    isBegin = true;
                 } %>
                 codeText+= '<bean:write name="codeVO" property="name"/>';
                 codeCode+= '<bean:write name="codeVO" property="code"/>';
          </logic:iterate>
	</script>  
</logic:notEmpty>

<script type="text/javascript">
	function setupPage(){
		var errMessage = "";
		if (errMessage.length >= 1) {
			ComShowMessage(errMessage);
		} // end if
		loadPage(true);
	}
</script>

<form id="form" name="form">
<input type="hidden" name="f_cmd">
<input type="hidden" name="f_req_svc_cd" value="<%=req_svc_cd%>"/>

<div class="layer_popup_title">
	<!-- page_title_area(S) -->
	<div class="page_title_area clear">
		<!-- page_title(S) -->
		<h2 class="page_title"><span><bean:message key="Checkpoint"/></span></h2>
		<!-- page_title(E) -->
		
		<!-- opus_design_btn(S) -->
		<div class="opus_design_btn">
			<button type="button" class="btn_accent" name="btn_Search" id="btn_Search" onClick="doWork('SEARCHLIST');"><bean:message key="Search"/></button><!-- 
		 --><button type="button" class="btn_normal" name="btn_Close" id="btn_Close" onClick="doWork('CLOSE');"><bean:message key="Close"/></button>
		</div>
		<!-- opus_design_btn(E) -->		
	</div>
	<!-- page_title_area(E) -->
</div>
<div class="layer_popup_contents">
	<div class= "wrap_search">
			<div class="opus_design_inquiry entry_pannel ">
			<table>
				<colgroup>
					<col width="100" />
					<col width="*"/>
				</colgroup>
				<tbody>
                <tr>
			        <th><bean:message key="Required_Service"/></th>
			        <td>
			        <select name="code" id="code" style="width:250px">
					</select>
					</td>
		        </tr>
		        </tbody>
			</table>
			</div>
	</div>
			<!-- opus_design_grid(S) -->
	<div class="wrap_result">	
		<div class="opus_design_grid">
			<script type="text/javascript">comSheetObject('sheet1');</script>	
		</div>
		<!-- opus_design_grid(E) -->	
	</div>	
</div>
</form>
<%@include file="/apps/fis/wms/bizcommon/include_common.jsp"%>
