<%--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : WHInBookingExcelUploadPopup.jsp
*@FileTitle  : Booking Excel Upload

*@author     : DOU Network
*@version    : 1.0
*@since      : 2016/05/16
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
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/WMS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_FRT.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_CODE_UTIL.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="apps/fis/wms/common/js/WHInBookingExcelUploadPopup.js?ver=<%=CLT_JS_VER%>"></script>
    
<logic:notEmpty name="EventResponse">
    <bean:define id="valMap" name="EventResponse" property="mapVal"/>
</logic:notEmpty>

<script type="text/javascript">
var WH_CD = '';
var WH_TEXT = '';
<% Boolean isBegin = false; %>
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

var CNTR_CD = '';
var CNTR_TEXT = '';
<% isBegin = false; %>
<bean:define id="cntrInfoList" name="valMap" property="cntrInfoList"/>
<logic:iterate id="cntrVO" name="cntrInfoList">
<% if(isBegin){ %>
CNTR_CD+= '|';
CNTR_TEXT+= '|';
<% }else{
      isBegin = true;
   } %>
CNTR_CD+= '<bean:write name="cntrVO" property="ctrt_no"/>';
CNTR_TEXT+= '<bean:write name="cntrVO" property="ctrt_no"/> : <bean:write name="cntrVO" property="ctrt_nm"/>';
</logic:iterate>

var ord_tp_cdCode = "";
var ord_tp_cdText = "";
<bean:define id="MsList_tpcd" name="valMap" property="ord_tp_cd"/>
'<logic:notEmpty name="MsList_tpcd">'
	'<logic:iterate id="codeVO" name="MsList_tpcd">'
		ord_tp_cdCode+="|"+'<bean:write name="codeVO" property="code"/>';
		ord_tp_cdText+="|"+'<bean:write name="codeVO" property="name"/>';
	'</logic:iterate>'
	
	ord_tp_cdCode = ord_tp_cdCode.substring(1);
	ord_tp_cdText = ord_tp_cdText.substring(1);
'</logic:notEmpty>'

var skuCdText = "";
var skuCdCode = "";
<bean:define id="skuCd" name="valMap" property="skuCdList"/>
'<logic:notEmpty name="skuCd">'
	'<logic:iterate id="skuitem" name="skuCd">'
		skuCdCode+="|"+'<bean:write name="skuitem" property="item_cd"/>';
		skuCdText+="|"+'<bean:write name="skuitem" property="item_nm"/>';
	'</logic:iterate>'
	skuCdCode = skuCdCode.substring(1);
	skuCdText = skuCdText.substring(1); 
'</logic:notEmpty>'

function setupPage(){
	var errMessage = "";
	if (errMessage.length >= 1) {
		ComShowMessage(errMessage);
	} // end if
	loadPage(true);
}
</script>
<form id="form" name="form">
	<input type="hidden" name="user_id" id="user_id" 	value="<%=userInfo.getUsrid()%>" /> 
	<input type="hidden" name="org_cd"  id="org_cd" 	value="<%=userInfo.getOfc_cd()%>" />
	<input type="hidden" name="def_wh_cd" id="def_wh_cd" value="<%=userInfo.getDef_wh_cd()%>" />
	<input type="hidden" name="def_wh_nm" id="def_wh_nm" value="<%=userInfo.getDef_wh_nm()%>" />
	<input type="hidden" name="def_wh_ctrt_no" id="def_wh_ctrt_no" value="<%=userInfo.getDef_wh_ctrt_no()%>" />
	<input type="hidden" name="def_wh_ctrt_nm" id="def_wh_ctrt_nm" value="<%=userInfo.getDef_wh_ctrt_nm()%>" />
	<input type="hidden" name="xls_no"  id="xls_no" 		value="" /> 
	<input type="hidden" name="f_cmd" id="f_cmd" value="" />
	<div class="page_title_area clear">
		<h2 class="page_title">
			<span>Booking Excel Upload</span>
		</h2>
		<div class="opus_design_btn">
			<button type="button" class="btn_accent" name="btn_upload_excel" id="btn_upload_excel" onclick="doWork('btn_upload_excel');">Upload Excel</button><!-- 
			 --><!-- <button type="button" class="btn_normal" name="btnSave" id="btnSave" onClick="doWork('SAVE');"><bean:message key="Save"/> --></button><!--
			 --><button type="button" class="btn_normal" name="btnOK" id="btnOK" onClick="doWork('OK');"><bean:message key="OK"/></button><!--
			 --><button type="button" class="btn_normal" name="btnClose" id="btnClose" onClick="doWork('CLOSE');"><bean:message key="Close"/></button>
		</div>
	</div>
	
	<div class= "wrap_search">
	<div class= "opus_design_inquiry">
		<table>
			<colgroup>
				<col width="70">
				<col width="160">
				<col width="60">
				<col width="100">
				<col width=75>
				<col width="*">
			</colgroup>
			<tr>
				<th><bean:message key="Order_No"/></th>
				<td><input name="cust_ord_no" required id="cust_ord_no" type="text" dataformat="engup" otherchar = "<%=WMS_OTHER_CHAR%>" onblur="strToUpper(this);" maxlength="100" style="ime-mode:disabled;text-transform:uppercase;" onchange="custOrdNoDupCheck(this);"/> 
				</td>
				<th><bean:message key="Order_Type"/></th>
				<td>
					<select name="ord_tp_cd" id="ord_tp_cd" class="search_form" required>
						<logic:iterate id="codeVO" name="MsList_tpcd">
							<option value='<bean:write name="codeVO" property="code"/>'><bean:write name="codeVO" property="name"/></option>
						</logic:iterate>
					</select>
				</td>
				<th><bean:message key="Contract_No"/></th>
				<td><input name="ctrt_no" id="ctrt_no" type="text" style="ime-mode:disabled;text-transform:uppercase;width:100px;" dataformat="excepthan" onblur="strToUpper(this);" maxlength="10" required="required"
									OnKeyDown="if(event.keyCode==13){getCtrtInfo(this);}" onblur="strToUpper(this);getCtrtInfo(this);" onChange="getCtrtInfo(this)"/><!-- 						
					 --><button type="button" name="btn_ctrt_no" id="btn_ctrt_no" class="input_seach_btn" tabindex="-1" onclick="doWork('btn_ctrt_no');"  ></button><!-- 
					 --><input name="ctrt_nm" id="ctrt_nm" type="text" style="ime-mode:disabled;text-transform:uppercase;width:200px;" dataformat="excepthan" onblur="strToUpper(this);" OnKeyDown="if(event.keyCode==13){CtrtPopup('form');}" readonly="readonly"/>
				</td>
			</tr>
		</table>
		<table>
			<colgroup>
				<col width="70">
				<col width="160">
				<col width="60">
				<col width="100">
				<col width="75">
				<col width="*">
			</colgroup>
			<tr>
				<th><bean:message key="Warehouse"/></th>
				<td>
					<select name="wh_cd" id="wh_cd" class="search_form" style="width: 143px" required>
						<logic:iterate id="codeVO" name="warehouse">
							<option value='<bean:write name="codeVO" property="wh_cd"/>'><bean:write name="codeVO" property="wh_nm"/></option>
						</logic:iterate>
					</select>
				</td>
				<th><bean:message key="Estimate_Date"/></th>
				<td><input name="est_in_dt" id="est_in_dt" type="text" style="width:75px;" maxlength="10" 
						onkeyup="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onkeypress="onlyNumberCheck();" onblur="mkDateFormatType(this, event, true,1)" required/><!-- 
				--><button type="button" class="calendar ir" name="btn_est_in_dt" id="btn_est_in_dt" onClick="doWork('btn_est_in_dt');" tabindex="-1"></button><!-- 
				-->
				</td>
				<th><bean:message key="Inbound_Date"/></th>
				<td><input name="inbound_dt" id="inbound_dt" type="text" style="width:75px;" maxlength="10" 
					onkeypress="onlyNumberCheck();" onkeyup="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" 
					onblur="mkDateFormatType(this, event, true,1);"/><!-- 
				--><button type="button" class="calendar ir" name="btn_inbound_dt" id="btn_inbound_dt" onClick="doWork('btn_inbound_dt');" tabindex="-1"></button><!--  
			    -->	
				</td>
			</tr>
		</table>
	</div>
	</div>
	
	<div class="wrap_result">
		<div class="opus_design_grid clear">
			<script type="text/javascript">comSheetObject('sheet1');</script>
		</div>
		<div class="opus_design_grid clear"  style="display:none;">
			<script type="text/javascript">comSheetObject('sheet2');</script>
		</div>
	</div>
	
	<!--  Working Image  -->
	<div id="WORKING_IMG" style="position: fixed;left: 0; right: 0; bottom: 0; top: 0;z-index: 1000;display: none;" valign="middle" align="center">
		<iframe src='<%=CLT_PATH%>/js/common/wait.html' scrolling='no' frameborder='0' style="position: absolute;top: 50%;left: 40%;"></iframe>
	</div>
	<!--  Complete Image  -->
	<div id="COMPLETE_IMG" style="position:fixed;display:none; filter:alpha(opacity = 100); width:280px;height:60px;top:50%;left:50%;margin:-30px 0 0 -140px;z-index:999">
		<iframe src='<%=CLT_PATH%>/js/common/completed.html' scrolling='no'  style='margin-top: 0px; width:100%; height: 60px;'></iframe>
	</div>
</form>