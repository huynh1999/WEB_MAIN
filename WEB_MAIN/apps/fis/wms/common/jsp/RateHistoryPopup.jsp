<%--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : RateHistoryPopup.jsp
*@FileTitle  : Rate History
*@author     : Tin.Luong Dou Network
*@version    : 1.0
*@since      : 2015/03/11
=========================================================--%>
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
    
    <script type="text/javascript" src="./apps/fis/wms/common/js/RateHistoryPopup.js?ver=<%=CLT_JS_VER%>"></script>  
<%
	String ctrt_no = "";
	String sb_cls_cd = "";
	try {
		ctrt_no = request.getParameter("ctrt_no")== null?"":request.getParameter("ctrt_no");
		sb_cls_cd = request.getParameter("sb_cls_cd")== null?"":request.getParameter("sb_cls_cd");
	}catch(Exception e) {
		out.println(e.toString());
	}

%>

<logic:notEmpty name="EventResponse">
    <bean:define id="valMap" name="EventResponse" property="mapVal"/>
</logic:notEmpty>    
    <script type="text/javascript">    
<%-- 	<%=JSPUtil.getIBCodeCombo("ftr_mod", "", "FT1", "0", "")%>	 --%>
<%-- 	<%=JSPUtil.getIBCodeCombo("rate_filer", "", "FT2", "0", "")%> --%>



	var rate_tp_cdText = "";
	var rate_tp_cdCode = "";
	<bean:define id="rate_tp_cd" name="valMap" property="rate_tp_cd"/>
	<logic:notEmpty name="rate_tp_cd">
	<logic:iterate id="item" name="rate_tp_cd">
	rate_tp_cdCode+="|"+'<bean:write name="item" property="code"/>';
	rate_tp_cdText+="|"+'<bean:write name="item" property="name"/>';
	</logic:iterate>
	
	rate_tp_cdCode = rate_tp_cdCode.substring(1);
	rate_tp_cdText = rate_tp_cdText.substring(1);
	</logic:notEmpty>

	<%boolean isBegin = false; %>
	// License Plate No
	var LIC_PLATE_CD = '';
	var LIC_PLATE_TEXT = '';
	<% isBegin = false; %>
	<bean:define id="lic_plat_ut_list" name="valMap" property="lic_plat_ut_list"/>
	<logic:iterate id="LICVO" name="lic_plat_ut_list">
	<% if(isBegin){ %>
	    LIC_PLATE_CD+= '|';
	    LIC_PLATE_TEXT+= '|';
	<% }else{
	      isBegin = true;
	   } %>
	   LIC_PLATE_CD+= '<bean:write name="LICVO" property="lic_plat_ut_cd"/>';
	   LIC_PLATE_TEXT+= '<bean:write name="LICVO" property="lic_plat_ut_cd"/>';
	</logic:iterate>
	
	var TPCD1 = '';
    var TPCD2 = '';
    var TPCD3 = '';
    <% isBegin = false; %>
    <!--Role 코드조회-->
    <bean:define id="tpszList"  name="valMap" property="cntrTpszList"/>
    <logic:iterate id="codeVO" name="tpszList">
        <% if(isBegin){ %>
            TPCD1+= '|';
            TPCD2+= '|';
            TPCD3+= '|';
        <% }else{
              isBegin = true;
           } %>
        TPCD1+= '<bean:write name="codeVO" property="cntr_tpsz_cd"/>';
        TPCD2+= '<bean:write name="codeVO" property="cntr_tpsz_cd"/>';
        TPCD3+= '<bean:write name="codeVO" property="cntr_grp_cd"/>';
    </logic:iterate>
    
	// Truck Code List
    var TRUCK_CD = '';
    var TRUCK_TEXT = '';
    <% isBegin = false; %>
    <bean:define id="trkTpszList" name="valMap" property="trkTpszList"/>
    <logic:iterate id="TRKVO" name="trkTpszList">
    <% if(isBegin){ %>
	    TRUCK_CD+= '|';
	    TRUCK_TEXT+= '|';
    <% }else{
          isBegin = true;
       } %>
       TRUCK_CD+= '<bean:write name="TRKVO" property="trk_tp_ct"/>';
       TRUCK_TEXT+= '<bean:write name="TRKVO" property="descr"/>';
    </logic:iterate>    

    
    var WH_CD = '';
    var WH_TEXT = '';
    <% isBegin = false; %>
    <bean:define id="warehouse" name="valMap" property="warehouse"/>
    <logic:iterate id="WHVO" name="warehouse">
    <% if(isBegin){ %>
    WH_CD+= '|';
    WH_TEXT+= '|';
    <% }else{
          isBegin = true;
       } %>
    WH_CD+= '<bean:write name="WHVO" property="wh_cd"/>';
    WH_TEXT+= '<bean:write name="WHVO" property="wh_nm"/>';
    </logic:iterate>    
	</script>
	
<!-- <iframe id="_iFrameWait_" src="./web/images/common/processing.gif" frameborder="0" marginHeight="0" marginWidth="0" width="343" height="121" style="position:absolute;visibility:hidden;z-index:999;display:none;" ></iframe>                                                                                                                                                                                                                                              -->
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
<input type="hidden" name="ctrt_no" value="<%=ctrt_no%>">
<input type="hidden" name="sb_cls_cd" value="<%=sb_cls_cd%>">
<input type="hidden" name="user_id" value="<%=userInfo.getUsrid()%>"/>
<input type="hidden" name="org_cd" value="<%= userInfo.getOfc_cd() %>" />
<input type="hidden" name="rate_no" />
<div class="layer_popup_title">
	<!-- page_title_area(S) -->
	<div class="page_title_area clear">
		<!-- page_title(S) -->
		<h2 class="page_title"><span><bean:message key="Rate_History"/></span></h2>
		<!-- page_title(E) -->
		<!-- opus_design_btn(S) -->
		<div class="opus_design_btn">
			<button type="button" class="btn_accent" name="btn_Close" id="btn_Close" onClick="doWork('CLOSE');"><bean:message key="Close"/></button>
		</div>
		<!-- opus_design_btn(E) -->	
	</div>
	<!-- page_title_area(E) -->
</div>
<div class="layer_popup_contents">
	<div class="wrap_result">
		<div id="selling" style="display:inline" >
        	<h3 class="title_design"><bean:message key="Basic_Information"/></h3>
        </div>
		<!-- opus_design_grid(S) -->
		<div class="opus_design_grid clear">
			<script type="text/javascript">comSheetObject('sheet1');</script>
		</div>
        <div id="buyling" style="display:inline" >  
        	<h3 class="title_design"><bean:message key="Detail_Information"/> <bean:message key="History"/></h3>
        </div>
		<div class="opus_design_grid clear" style="display:inline">
			<script type="text/javascript">comSheetObject('sheet2');</script>
		</div>
	</div>
</div>
</form>
<%@include file="/apps/fis/wms/bizcommon/include_common.jsp"%>