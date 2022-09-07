<%
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : ContainerTypePopup.jsp
*@FileTitle  : Program Management 
*@author     : Khang.Dong - DOU Network
*@version    : 1.0
*@since      : 2015/03/12
=========================================================*/
%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="./apps/fis/wms/common/js/ContainerTypePopup.js?ver=<%=CLT_JS_VER%>"></script>
	
	<script type="text/javascript" src="./js/common/message/<%=CLT_MSG_PATH%>/WMS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>    
<%

	String eq_unit = "";
	String eq_unit_name = "";
	String type    = "";

	try {
		eq_unit = request.getParameter("eq_unit");
		if(eq_unit==null){
			eq_unit = "";
		}
		eq_unit_name = request.getParameter("eq_unit_name");
		if(eq_unit_name==null){
			eq_unit_name = "";
		}
		type = request.getParameter("type");
		if(type==null){
			type = "";
		}
	}catch(Exception e) {
		out.println(e.toString());
	}	
%>
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
<input type="hidden" name="type" value="<%=type%>" id="type" />
<input type="hidden" name="f_cmd" id="f_cmd" />
<div class="page_title_area clear">
	<!-- page_title(S) -->
	<h2 class="page_title">
			<span><bean:message key="Container_Type"/></span>
	</h2>
	<!-- page_title(E) -->
	<!-- opus_design_btn(S) -->
	<div class="opus_design_btn">
			<button type="button" class="btn_accent" id="btn_Search" name="btn_Search" onClick="doWork('SEARCHLIST');"><bean:message key="Search"/></button><!-- 
			 --><button type="button" class="btn_normal" id="btn_OK" name="btn_OK" onClick="doWork('btn_OK');"><bean:message key="OK"/></button><!--  
			 --><button type="button" class="btn_normal" id="btn_Close" name="btn_Close" onClick="doWork('CLOSE');"><bean:message key="Close"/></button> 
	 </div>
	<!-- opus_design_btn(E) -->
	<!-- page_location(S) -->
		<div class="location">
			<span></span>
		</div>
	<!-- page_location(E) -->
</div>
<div class= "wrap_search">
    <!-- opus_design_inquiry(S) -->
    <div class="opus_design_inquiry entry_pannel ">
        <table>
            <colgroup>
                <col width="100" />
                <col width="*" />
            </colgroup>
            <tbody>
        	 	<tr>
					<th><bean:message key="Type"/></th>
					<td>
						<input type="radio" name="f_type" value="CNTR" checked="" id="f_type1" /><label for="f_type1"><bean:message key="Container"/></label>
						<input type="radio" name="f_type" value="TRUCK" id="f_type2" /><label for="f_type2"><bean:message key="Truck"/></label>
					</td>
					</tr>
                <tr>
					<th><bean:message key="Code"/></th>
					<td><input name="eqUnit" type="text"  id="eqUnit" style="ime-mode:disabled;text-transform:uppercase;"   dataformat="engup" onBlur="strToUpper(this);" value="<%=eq_unit%>" onkeypress="if(event.keyCode==13){doWork('SEARCHLIST')}" onkeypress="onlyNumberCheck('');"/> </td>
				</tr>
                <tr>
					<th><bean:message key="Description"/></th>
					<td><input name="descr" type="text"  id="descr" style="ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);" value="<%=eq_unit_name %>" onkeypress="if(event.keyCode==13){doWork('SEARCHLIST')}"/></td>
				</tr>
            </tbody>
            </table>
	</div>
</div>
<div class="wrap_result">
	<div class="opus_design_grid">
        <script type="text/javascript">comSheetObject('sheet1');</script>
    </div>
</div>
</form>
<%@include file="/apps/fis/wms/bizcommon/include_common.jsp"%>
