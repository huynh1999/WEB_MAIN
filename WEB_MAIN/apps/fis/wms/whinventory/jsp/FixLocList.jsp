
<%--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : FixLocList.jsp
*@FileTitle  : FixLocList
*@author     : Long.Le
*@version    : 1.0
*@since      : 2015/04/16
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
    <script type="text/javascript" src="./apps/fis/wms/whinventory/js/FixLocList.js?ver=<%=CLT_JS_VER%>"></script>
	
 	<script type="text/javascript" src="./js/common/message/<%=CLT_MSG_PATH%>/WMS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
<%

/* UserInfoDto userInfo = (UserInfoDto) session.getAttribute("AbstractAccountInfo");
String CLT_PATH = ".";*/

String wh_nm = "";
String ctrt_nm = "";
String loc_cd 		= "";
String loc_nm 		= "";
try {
	loc_cd  	= request.getParameter("loc_cd")== null?"":request.getParameter("loc_cd");
	loc_nm  	= request.getParameter("loc_nm")== null?"":request.getParameter("loc_nm");
}catch(Exception e) {
	out.println(e.toString());
}
%>
<bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
<script  type="text/javascript">
		<%-- 	<%=JSPUtil.getIBCodeCombo("ord_tp_cd", "", "WB3", "0", "")%> --%>
	 /*Warehouse code  */
	var WHCDLIST1 = " |";
	var WHCDLIST2 = " |";
	<% boolean isBegin = false; %>
	<bean:define id="WhList" name="cdMap" property="warehouse"/>
	<logic:iterate id="WhVO" name="WhList">
	    <% if(isBegin){ %>
	    WHCDLIST1+= '|';
	    WHCDLIST2+= '|';
	    <% }else{
	          isBegin = true;
	       } %>
	       WHCDLIST1+= '<bean:write name="WhVO" property="wh_cd"/>';
	       WHCDLIST2+= '<bean:write name="WhVO" property="wh_cd"/>'+': '+ '<bean:write name="WhVO" property="wh_nm"/>';
	</logic:iterate>
</script>  

<script>
	function setupPage(){
		var errMessage = "";
		if (errMessage.length >= 1) {
			comShowMessage(errMessage);
		} // end if
		loadPage(true);
	}
</script>
<form id="form" name="form">

	<input type="hidden" id="f_cmd"/>
	<input type="hidden" name="out_cnt" value="0" /> 
	<input type="hidden" name="def_wh_cd" value="<%=userInfo.getDef_wh_cd()%>" />
	<input type="hidden" name="def_wh_nm" value="<%=userInfo.getDef_wh_nm()%>" />
	<input type="hidden" name="def_wh_ctrt_no" value="<%=userInfo.getDef_wh_ctrt_no()%>" />
	<input type="hidden" name="def_wh_ctrt_nm" value="<%=userInfo.getDef_wh_ctrt_nm()%>" />
	<input type="hidden" name="org_cd" value="<%=userInfo.getOfc_cd()%>" />
	<input type="hidden" name="user_id" id="user_id"  value="<%=userInfo.getUsrid()%>" />
	<input type="hidden" name="pageurl" id="pageurl" value="FixLocList.clt"/>
<div class="page_title_area clear">
	<!-- page_title(S) -->
	<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	<!-- page_title(E) -->
	<!-- opus_design_btn(S) -->
	<div class="opus_design_btn TOP">
<%-- 			<button type="button" class="btn_accent" name="btn_Search" id="btn_Search" onClick="doWork('SEARCHLIST');" style="display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>"><bean:message key="Search"/></button><!-- 
		 --><button type="button" class="btn_normal" name="btn_Excel" id="btn_Excel" onClick="doWork('btn_Excel');" style="display:none;" btnAuth="<%= roleBtnVO.getAttr6() %>"><bean:message key="Excel"/></button><!-- 
	 --> --%></div>
	<!-- opus_design_btn(E) -->
	<!-- page_location(S) -->
		<div class="location">
		   <span><%=LEV1_NM%></span> &gt;
		   <span><%=LEV2_NM%></span> &gt;
		   <span><%=LEV3_NM%></span>
		   <a href="" class="ir">URL Copy</a>
	   </div>
	<!-- page_location(E) -->
</div>
<!-- opus_design_inquiry(S) -->
<div class= "wrap_search">
<div class="opus_design_inquiry ">
	<table>
    	<colgroup>
			<col width="70">
			<col width="300">
			<col width="110">
			<col width="320">
			<col width="140">
	 		<col width="*">
		</colgroup>  
		<tbody>        	
			<tr>
				<th><bean:message key="Warehouse"/></th>
				<td>
					<bean:define id="MsList" name="cdMap" property="warehouse"/>
					<select name="wh_cd" id="wh_cd" class="search_form" style="width: 194px;" required onchange="wh_cd_OnChange(this);">
						<option value=""></option>
						<logic:iterate id="codeVO" name="MsList">
							<option value='<bean:write name="codeVO" property="wh_cd"/>'><bean:write name="codeVO" property="wh_nm"/></option>
						</logic:iterate>
					</select>
				</td>
				<th><bean:message key="Contract_No"/></th>
				<td><input name="ctrt_no" id="ctrt_no"  type="text" class="L_input" style="width:80px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" otherchar="-_" onBlur="strToUpper(this);getCtrtInfo(this);" maxlength="10" OnKeyDown="if(event.keyCode==13){getCtrtInfo(this);}"/><!-- 						
					 --><button type="button" name="btn_ctrt_no" id="btn_ctrt_no" onClick="doWork('btn_ctrt_no');" class="input_seach_btn" tabindex="-1" onclick=""></button><!-- 
					 --><input name="ctrt_nm"  otherchar = " ()-_" id="ctrt_nm"  type="text" class="L_input" style="width:110px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);" onKeyDown="if(event.keyCode==13){CtrtPopup();}"/>
				</td>
        		<th><bean:message key="In_Booking_No"/></th>
				<td><input name="wib_bk_no" id = "wib_bk_no" type="text" class="L_input" style="width:194px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);" maxlength="14"/></td>
			</tr>				
			<tr>
				<th><bean:message key="Zone_Block"/></th>
				<td>
				<!-- <script  type="text/javascript">comComboObject('zone_cd',  1, 104, 1);</script> -->
				<select id="zone_cd" name="zone_cd" onchange="zone_cd_OnChange(this);" style="width:95px;">
				</select><!-- 
					
				 --><!-- <script  type="text/javascript">comComboObject('block_cd', 1, 121, 1);</script> --><!-- 
				 --><select id="block_cd" name="block_cd" style="width:95px;">
					<option value="ALL"><bean:message key="ALL"/></option>
				</select>
				</td>
				<th><bean:message key="Location"/></th>
				<td><input name="wh_loc_nm" id = "wh_loc_nm" type="text" class="L_input" style="width:194px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);getLocationInfo();" OnKeyDown="if(event.keyCode==13){getLocationInfo();}"/><!-- 
					 --><button type="button" name="btn_wh_loc_cd" id="btn_wh_loc_cd" onClick="doWork('btn_wh_loc_cd');" class="input_seach_btn" tabindex="-1" onclick=""></button><!-- 
					 --><input type="hidden" id="wh_loc_cd" name="wh_loc_cd" />
				</td>
				<th><bean:message key="Customer_Order_No"/></th>
				<td><input name="cust_ord_no" id = "cust_ord_no" type="text" class="L_input" style="width:194px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" otherchar = "<%=WMS_OTHER_CHAR%>"  onBlur="strToUpper(this);" maxlength="100"/></td>
			</tr>		
			<tr>
				<th><bean:message key="Item_No"/></th>
				<td><input name="item_cd" otherchar = "<%=WMS_OTHER_CHAR%>" id = "item_cd" type="text" class="L_input" style="width:194px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);" maxlength="20"/></td>
				<th>
						<!-- <script  type="text/javascript">ComComboObject('prop_no_tp', 1, 105, 1);</script> -->
						<select name="prop_no_tp" id="prop_no_tp" onchange="" style="width: 100px; font-weight: bold;"> 
							<option value='LOT_NO' ><bean:message key="Item_Lot_No"/></option> 
 							<option value='LOT_ID' ><bean:message key="Lot_ID"/></option>
 							<option value='LOT_04' ><bean:message key="Lot_04"/></option>
 							<option value='LOT_05' ><bean:message key="Lot_05"/></option>
						</select>
				</th>
				<td><input name="prop_no" type="text" class="L_input" id="prop_no" style="width:223px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);" maxlength="20"/></td>
				<th>
						<!-- <script  type="text/javascript">ComComboObject('prop_date_tp', 1, 115, 1);</script> -->
						<select name="prop_date_tp" id="prop_date_tp" onchange="" style="width: 120px; font-weight: bold;"> 
							<option value='INBOUND_DT'>	<bean:message key="Inbound_Date"/></option> 
 							<option value='EXP_DT'>		<bean:message key="Expiration_Date"/></option>
						</select>
				</th>
				<td><input name="prop_date_fm" id="prop_date_fm" type="text" class="L_input"  maxlength="10" style="width:75px;" 
						onblur="chkCmprPrd(firCalFlag, false, this, this, form.prop_date_to);firCalFlag=false;" 
						onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};"
						onkeypress="onlyNumberCheck();" onkeyup="mkDateFormatType(this, event, false,1)"/><span class="dash">~</span><!--
						--><input name="prop_date_to" id="prop_date_to" type="text" class="L_input"  maxlength="10" style="width:75px;" 
						onblur="chkCmprPrd(firCalFlag, false, this, form.prop_date_fm, this);firCalFlag=false;" 
						onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};"
						onkeypress="onlyNumberCheck();" onkeyup="mkDateFormatType(this, event, false,1)"/><!--
						--><button class="calendar" tabindex="-1" type="button" name="btn_to_bk_date" id="btn_to_bk_date" onClick="doWork('btn_to_bk_date');"></button>
						</td>
			</tr>
		</tbody>				
	</table>
</div>
</div>
<!-- opus_design_inquiry(E) -->
<div class="wrap_result">
	<!-- opus_design_grid(S) -->
	<div class="opus_design_grid clear">
		<script type="text/javascript">comSheetObject('sheet1');</script>
	</div>
</div>
</form>

<script type="text/javascript">
var attr_extension = "<%= roleBtnVO.getAttr_extension() %>";
doBtnAuthority(attr_extension);
</script>
<!-- <iframe id="_iFrameWait_" src="./web/images/common/processing.gif" frameborder="0" marginHeight="0" marginWidth="0" width="343" height="121" style="position:absolute;visibility:hidden;z-index:999;display:none;" ></iframe> -->