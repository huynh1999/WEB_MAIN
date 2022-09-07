<%
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : ESOPGPPopup.jsp
*@FileTitle  : 
*@author     : Khanh.Nguyen
*@version    : 1.0
*@since      : 2015/03/18
=========================================================*/
%>

<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCommon.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/ModalCalendar.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="./apps/fis/wms/common/js/ESOPGPPopup.js?ver=<%=CLT_JS_VER%>"></script>
	
	<script type="text/javascript" src="./js/common/message/<%=CLT_MSG_PATH%>/WMS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
<%
	String ctrt_no  = "";
	String last_ver = "";
	String sop_ver  = "";
	
	try {
		ctrt_no = request.getParameter("ctrt_no");
		if(ctrt_no==null){
			ctrt_no = "";
		} 
		
		last_ver = request.getParameter("last_ver");
		if(last_ver==null){
			last_ver = "";
		} 
		
		sop_ver = request.getParameter("sop_ver");
		if(sop_ver==null){
			sop_ver = "";
		} 
		
	}catch(Exception e) {
		out.println(e.toString());
	}	
%>
    <bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
	<bean:define id="GRP_CD" name="cdMap" property="GRP_CD"/>
	<bean:define id="GRP_CD2" name="cdMap" property="GRP_CD2"/>
    <script language="javascript">    
	
	var GRP_CD = "";
	var GRP_NM = "";
	
	var GRP2_CD = "";
	var GRP2_NM = "";
	
	<!-- Freight Unit 단위 -->
		<% boolean isBegin_GRP = false; %>
        <logic:iterate id="codeVO" name="GRP_CD">
            <% if(isBegin_GRP){ %>
            GRP2_NM+= '|';
            GRP2_CD+= '|';
            <% }else{
            	isBegin_GRP = true;
               } %>
               GRP_CD+= '<bean:write name="codeVO" property="code"/>' + '|';
               GRP_NM+= '<bean:write name="codeVO" property="name"/>' + '|';
        </logic:iterate>
        
        
		<!-- Freight Unit 단위 -->
			<% boolean isBegin_GRP2 = false; %>
            <logic:iterate id="codeVO" name="GRP_CD2">
                <% if(isBegin_GRP2){ %>
                GRP2_NM+= '|';
                GRP2_CD+= '|';
                <% }else{
                	isBegin_GRP2 = true;
                   } %>
                   GRP2_CD+= '<bean:write name="codeVO" property="code"/>' + '|';
                   GRP2_NM+= '<bean:write name="codeVO" property="name"/>' + '|';
            </logic:iterate>
	
	<%
		/* //Required Service
		 String rtn_val = JSPUtil.getIBSheetCodeCombo("SV1", "0", "");
		String[] grd_combo = rtn_val.split(",");
		String grp_cd = grd_combo[0];
		String grp_nm = grd_combo[1]; 
	
		//General Checkpoint
		 String rtn_val2 = JSPUtil.getIBSheetCodeCombo("PG1", "0", "");
		String[] grd2_combo = rtn_val.split(",");
		String grp2_cd = grd2_combo[0];
		String grp2_nm = grd2_combo[1];  */
	%>
	
	</script>
	
<script type="text/javascript">
	var almightyFlag = false;
	function setupPage(){
		var errMessage = "";
		if (errMessage.length >= 1) {
			ComShowMessage(errMessage);
		} // end if
		loadPage(true);
	}
</script>

<form id="form" name="form">
<input type="hidden" id="f_cmd" value="0" />
<input type="hidden" name="verFlg"		value="" />
<input type="hidden" name="in_ctrt_no" 	value="<%=ctrt_no%>"></input>
<input type="hidden" name="last_ver" 	value="<%=last_ver%>"></input>
<input type="hidden" name="sop_ver" 	value="<%=sop_ver%>"></input>

<div class="layer_popup_title">
<div class="page_title_area clear">

	<h2 class="page_title"><span><bean:message key="General_Procedure"/></span></h2>
	
	<div class="opus_design_btn">
		<button type="button" class="btn_normal" name="btnAdd" id="btnAdd" onClick="doWork('ADD');"><bean:message key="Add"/></button><!-- 
		 --><button type="button" class="btn_normal" name="btnDelete" id="btnDelete" onClick="doWork('DELETE');"><bean:message key="Btn_Del"/></button><!-- 
		 --><button type="button" class="btn_normal" name="btn_ok" id="btn_ok" onClick="doWork('btn_ok');"><bean:message key="OK"/></button><!--
		 --><button type="button" class="btn_normal" name="btn_close" id="btn_close" onClick="doWork('CLOSE');"><bean:message key="Close"/></button>
	</div>
	
	<div class="location">	
		<span id="navigation"></span>
	</div>
	
</div>
</div>

<div class="layer_popup_contents">  
<div class="wrap_result">
	
	<div class="opus_design_grid clear">
		<script type="text/javascript">comSheetObject('sheet1');</script>		
	</div>
</div>
</div>

</form>

<%@include file="/apps/fis/wms/bizcommon/include_common.jsp"%>