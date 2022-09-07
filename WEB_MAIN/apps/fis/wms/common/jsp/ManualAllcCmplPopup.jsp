<%--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : ManualAllcPopup.jsp
*@FileTitle  : Manual Allocation
*@author     : Khang.Dong - DOU Network
*@version    : 1.0
*@since      : 2015/07/09
=========================================================--%>
<%@page import="java.util.HashMap"%>
<%@page import="com.clt.syscommon.response.CommonEventResponse"%>
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
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/WMS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="./apps/fis/wms/common/js/ManualAllcCmplPopup.js?ver=<%=CLT_JS_VER%>"></script>
	
<%
	String wob_bk_no = ""; //booking no
	String wave_no   = ""; //wave no
	String wh_cd	 = ""; //wh_cd
	try {
		wob_bk_no = request.getParameter("wob_bk_no")== null?"":request.getParameter("wob_bk_no");
		wave_no = request.getParameter("wave_no")== null? "" :request.getParameter("wave_no");
		wh_cd     = request.getParameter("wh_cd")== null?"":request.getParameter("wh_cd");
		CommonEventResponse eventResponse = (CommonEventResponse)request.getAttribute("EventResponse");
		if(null == wave_no || "".equals(wave_no)){
			if(null != eventResponse){
				HashMap<String, Object> mapVal = eventResponse.getMapVal();
				wave_no = (String)mapVal.get("WaveNo");
			}
		}
		
	}catch(Exception e) {
		out.println(e.toString());
	}		
%>
<logic:notEmpty name="EventResponse">
	<logic:notEmpty name="EventResponse" property="mapVal">
		<bean:define id="valMap"  name="EventResponse" property="mapVal"/>
		<bean:define id="MsList_strg_no" name="valMap" property="strg_no"/>
	</logic:notEmpty>
</logic:notEmpty>

<script type="text/javascript">

	var strg_noCode = "";
	var strg_noText = "";
	'<logic:notEmpty name="MsList_strg_no">'
		'<logic:iterate id="codeVO" name="MsList_strg_no">'
			strg_noCode+="|"+'<bean:write name="codeVO" property="strg_cd"/>';
			strg_noText+="|"+'<bean:write name="codeVO" property="strg_cd"/>';
		'</logic:iterate>'
		
		strg_noCode = strg_noCode.substring(1);
		strg_noText = strg_noText.substring(1);
	'</logic:notEmpty>'

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
<input type="hidden" id="wob_bk_no" name="wob_bk_no" value="<%=wob_bk_no%>"/>
<input type="hidden" id="wave_no" name="wave_no" value="<%=wave_no%>"/>
<input type="hidden" id="wh_cd" name="wh_cd" value="<%=wh_cd%>"/>
<input type="hidden" id="prev_rum" name="prev_rum" />
<input type="hidden" id="curr_rum" name="curr_rum" />
<input type="hidden" id="next_rum" name="next_rum" />
<input type="hidden" id="sao_sys_no" name="sao_sys_no" />
<input type="hidden" id="item_sys_no" name="item_sys_no" />
<input type="hidden" id="item_seq" name="item_seq" />
<input type="hidden" id="inbound_dt" name="inbound_dt" />
<input type="hidden" id="expiration_dt" name="expiration_dt" />
<input type="hidden" id="just_lot_id" name="just_lot_id" />
<input type="hidden" id="walc_no" name="walc_no" />
<input type="hidden" id="fix_loc_cd" name="fix_loc_cd" />
<input type="hidden" id="fix_loc_cd_nm" name="fix_loc_cd_nm" />

<!-- Report 2017.01.24 Requirement No.12.2 -->
<input type="hidden" name="user_id" id="user_id" value="<%=userInfo.getUsrid()%>" />
<input type="hidden" id="title" name="title" value=""/>
<input type="hidden" id="file_name" name="file_name" value=""/>
<input type="hidden" id="rd_param" name="rd_param" value=""/>
<!-- [WMS 개선 문의사항]-2.	Allocation & Complete :2.2 Tab Customaizing 과 Save적용 -->
<input type="hidden" name="pageurl" id="pageurl" value="ManualAllcCmplPopup.clt"/>

	<div class="layer_popup_title">
		<div class="page_title_area clear">
			<!-- page_title(S) -->
			<h2 class="page_title">
					<span><bean:message key="Allocation_Complete"/></span>
				</h2>
			<!-- page_title(E) -->
			<!-- opus_design_btn(S) -->
			<div class="opus_design_btn"><!--
				--><button type="button" class="btn_accent" name="btn_Search" id="btn_Search" onClick="doWork('SAVE');"><bean:message key="Save"/></button><!--
				--><button type="button" class="btn_accent" name="btn_SaveX" id="btn_SaveX" onClick="doWork('SAVEX');"><bean:message key="Save/X"/></button><!-- #2324 [WMS4.0] SHIPPING STRATEGY IMPROVEMENT --><!--
				--><button type="button" class="btn_normal" name="btn_Apply" id="btn_Apply" onClick="doWork('CLOSE');"><bean:message key="Close"/></button><!-- 
			 	--><button type="button" class="btn_normal" name="btn_Close" id="btn_Close" onClick="doWork('PRINT');"><bean:message key="Picking_Sheet"/></button><!--
			--></div>
			<!-- opus_design_btn(E) -->
		</div>
	</div>
	<div class="layer_popup_contents">
		<div class="wrap_result">
			<div class="opus_design_inquiry" style="text-align: right; width: 78%; float: left;"><!-- #2322 [WMS4.0] DATE FIELD TO HAVE [TODAY] BUTTON -->
				<table>
					<colgroup>
						<col width="85%">
						<col width="*">
					</colgroup>
					<tbody>
						<tr>
							<th><bean:message key="Outbound_Date"/></th>
							<td><!--
							--><input name="outbound_dt" id="outbound_dt" type="text" style="width:80px;" dataformat="mdy" onblur='mkDateFormatType(this, event, true,1);dateWmsRangeValid(this, "Outbound Date", "true");' required/><!--
				 			--><button class="calendar" type="button" id="btn_wave_dt" name="btn_wave_dt" onclick="doWork('btn_outbound_dt');" ></button><!-- 
				 			--><button class="btn_etc" type="button" name="btn_today" id="btn_today" tabindex="-1" onclick="javascript:setOutoundDtToday();">Today</button><!-- 
				 			--></td>
						</tr>
					</tbody>
				</table>
			</div>
			<!-- <p class="line_bluedot"></p> -->
			<div class="opus_design_grid clear">
				<div class="opus_design_btn">
					<button type="button" class="btn_accent" name="btn_add" id="btn_add"  onclick="btn_Allocation()"><bean:message key="Auto"/> <bean:message key="Allocation"/></button><!-- 
				 --><button type="button" class="btn_normal" name="btn_del" id="btn_del"  onclick="btn_ManualAlloc()"><bean:message key="Manual_Allocation"/></button><!--
				 --><button type="button" class="btn_normal" name="btn_del" id="btn_del"  onclick="btn_Cancel_Allc()"><bean:message key="Cancel"/></button>
				</div>
				<script type="text/javascript">comSheetObject('sheet1');</script>
				
			</div>
		</div>
	</div>
	<div id="COMPLETE_IMG" style="position:fixed;display:none; filter:alpha(opacity = 100); width:280px;height:60px;top:50%;left:50%;margin:-30px 0 0 -140px;z-index:999">
		<iframe src='<%=CLT_PATH%>/js/common/completed.html' scrolling='no'  style='margin-top: 0px; width:100%; height: 60px;'></iframe>
	</div>
</form>	
<%@include file="/apps/fis/wms/bizcommon/include_common.jsp"%>
