<%--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : InvAdjustList.jsp
*@FileTitle  : Inventory Adjustment Search
*@author     : Tin.Luong - DOU Network
*@version    : 1.0
*@since      : 2015/04/16
=========================================================--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoFormControl.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/ModalCalendar.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="./apps/fis/wms/whinventory/script/InvAdjustList.js?ver=<%=CLT_JS_VER%>"></script>
	<bean:define id="cdMap"  name="EventResponse" property="mapVal"/>

<%

String req_adjust_no   = "";
String DEF_WH_CTRT_NO   = userInfo.getDef_wh_ctrt_no()== null?"":userInfo.getDef_wh_ctrt_no();
String DEF_WH_CTRT_NM   = userInfo.getDef_wh_ctrt_nm()== null?"":userInfo.getDef_wh_ctrt_nm();
String DEF_WH_CD  = userInfo.getDef_wh_cd()== null?"":userInfo.getDef_wh_cd();
String DEF_WH_NM  = userInfo.getDef_wh_nm()== null?"":userInfo.getDef_wh_nm();

try {
	req_adjust_no = request.getParameter("adjust_no")== null?"":request.getParameter("adjust_no");
}catch(Exception e) {
	out.println(e.toString());
}


%>
    
<!--    	<script type="text/javascript"> -->
<%--    	<%=JSPUtil.getIBCodeCombo("reason_cd", "", "WAR", "0", "")%> --%>
<!-- 	</script>   -->
    
<script type="text/javascript">
	function setupPage(){
		var errMessage = "";
		if (errMessage.length >= 1) {
			ComShowMessage(errMessage);
		} // end if
		loadPage(true);
	}
    
    <%boolean isBegin = false; %>

    var WHCDLIST = "";
    var WHNMLIST = "";
    <bean:define id="MsList" name="cdMap" property="warehouse"/>
       <logic:iterate id="WhVO" name="MsList">
            <% if(isBegin){ %>
            WHCDLIST+= '|';
            WHNMLIST+= '|';
        <% }else{
              isBegin = true;
            } %> 
              WHCDLIST+= '<bean:write name="WhVO" property="wh_cd"/>';
              WHNMLIST+= '<bean:write name="WhVO" property="wh_nm"/>';
       </logic:iterate>
</script>
<form id="form" name="form">
<input type="hidden" id="f_cmd" value="0"/>
<input type="hidden" name="out_cnt" value="0" /> 
<%-- <input type="hidden" name="def_wh_cd" value="<%=userInfo.getDef_wh_cd()%>" /> --%>
<%-- <input type="hidden" name="def_wh_nm" value="<%=userInfo.getDef_wh_nm()%>" /> --%>
<%-- <input type="hidden" name="def_wh_ctrt_no" value="<%=userInfo.getDef_wh_ctrt_no()%>" /> --%>
<%-- <input type="hidden" name="def_wh_ctrt_nm" value="<%=userInfo.getDef_wh_ctrt_nm()%>" /> --%>
<%-- <input type="hidden" name="user_id" value="<%=userInfo.getUser_id()%>" /> --%>
<%-- <input type="hidden" name="org_cd" value="<%=userInfo.getOrg_cd()%>" /> --%>
<input type="hidden" name="req_adjust_no" id="req_adjust_no" value="<%=req_adjust_no%>" />

<input type="hidden" name="def_wh_cd" id="def_wh_cd" value="<%=DEF_WH_CD%>" />
<input type="hidden" name="def_wh_nm" id="def_wh_nm" value="<%=DEF_WH_NM%>" />
<input type="hidden" name="def_wh_ctrt_no" id="def_wh_ctrt_no" value="<%=DEF_WH_CTRT_NO%>" />
<input type="hidden" name="def_wh_ctrt_nm" id="def_wh_ctrt_nm" value="<%=DEF_WH_CTRT_NM%>" />
<input type="hidden" name="org_cd" id="org_cd" value="<%=userInfo.getOfc_cd()%>" />
<input type="hidden" name="user_id" id="user_id"  value="<%=userInfo.getUsrid()%>" />
<input type="hidden" name="pageurl" id="pageurl" value="InvAdjustList.clt"/>
<div class="page_title_area clear">
	<!-- page_title(S) -->
	<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	<!-- page_title(E) -->
	<!-- opus_design_btn(S) -->
	<div class="opus_design_btn TOP">
<%-- 			<button type="button" style="display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>"  class="btn_accent" name="btn_Search" id="btn_Search" onClick="doWork('SEARCHLIST');"><bean:message key="Search"/></button><!-- 
		 --><button type="button" btnAuth="HISTORY"  class="btn_normal" name="btn_History" id="btn_History" onClick="doWork('btn_History');"><bean:message key="History"/></button><!-- 
		 --><button type="button" style="display:none;" btnAuth="<%= roleBtnVO.getAttr6() %>"  class="btn_normal" name="btn_Excel" id="btn_Excel" onClick="doWork('EXCEL');"><bean:message key="Excel"/></button><!-- 
 --%>	 --></div>
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

<div class= "over_wrap">
<div class= "wrap_search">
<div class="opus_design_inquiry entry_pannel">
	<table>
    	<colgroup>
			<col width="70">
			<col width="240">
			<col width="110">
			<col width="230">
			<col width="160">
	 		<col width="*">
		</colgroup>   
		<tbody>     
			<tr>
				<th><bean:message key="Warehouse"/></th>
					<td>
						<bean:define id="MsList" name="cdMap" property="warehouse"/>
								<select name="wh_cd" id="wh_cd" class="search_form" style="width: 170px;" required>
									<option value=""></option>
									<logic:iterate id="codeVO" name="MsList">
										<option value='<bean:write name="codeVO" property="wh_cd"/>'><bean:write name="codeVO" property="wh_nm"/></option>
									</logic:iterate>
								</select>						
					</td>
				<th><bean:message key="Contract_No"/></th>
					<td>
						<input name="ctrt_no" id="ctrt_no" type="text" class="L_input" style="width:80px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" otherchar="-_" onBlur="strToUpper(this);getCtrtInfo(this);" maxlength="10" OnKeyDown="if(event.keyCode==13){getCtrtInfo(this);}" onChange="getCtrtInfo(this)" required/><!-- 
						 --><button type="button" name="btn_ctrt_no" id="btn_ctrt_no" class="input_seach_btn" tabindex="-1" onClick="doWork('btn_ctrt_no');"></button><!-- 						
						 --><input name="ctrt_nm" id="ctrt_nm" type="text" class="L_input" style="width:93px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" otherchar = " ()-_" onBlur="strToUpper(this);" onKeyDown="if(event.keyCode==13){CtrtPopup();}" required/>
					</td>
				<th><bean:message key="Adjustment_Key"/></th>
				<td><input name="adjust_no" type="text" class="L_input" id="adjust_no" style="width:195px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);" maxlength="14"/></td>
			</tr>				
     		<tr>
				<th><bean:message key="Item_No"/></th>
					<td>
						<input name="item_cd" otherchar = "<%=WMS_OTHER_CHAR%>" id = "item_cd" type="text" class="L_input" style="width:170px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);" maxlength="20"/><!-- 
					 --></td>				<th>
				<select id="prop_no_tp" name="prop_no_tp">
					<option value="LOT_NO"><bean:message key="Item_Lot_No"/></option>
			        <option value="LOT_ID"><bean:message key="Lot_ID"/></option>
				</select>
				</th>
				<td><input name="prop_no" type="text" class="L_input" id="prop_no" style="width:206px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" otherchar = "<%=WMS_OTHER_CHAR%>" onBlur="strToUpper(this);" maxlength="20"/></td>
				<th><bean:message key="Adjustment_Date"/></th>
				<td><input name="adjust_date_fm" id="adjust_date_fm" type="text" class="L_input"  maxlength="10" style="width:75px;" OnBeforeDeactivate="ComAddSeparator(this)" OnBeforeActivate="ComClearSeparator(this)"
				onkeypress="onlyNumberCheck();" onkeyup="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onblur="chkCmprPrd(firCalFlag, false, this, this,form.adjust_date_to);firCalFlag=false;"/><!-- 
					 --><span class="dash">~</span><!-- 
					 --><input name="adjust_date_to" id="adjust_date_to" type="text" class="L_input"  maxlength="10" style="width:75px;" OnBeforeDeactivate="ComAddSeparator(this)" OnBeforeActivate="ComClearSeparator(this)"
					 onkeypress="onlyNumberCheck();" onkeyup="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onblur="chkCmprPrd(firCalFlag, false, this, form.adjust_date_fm,this);firCalFlag=false;"/><!-- 
					 --><button type="button" name="btn_adjust_date_to" id="btn_adjust_date_to" class="calendar ir" tabindex="-1" onClick="doWork('btn_adjust_date_to');"></button>
				</td>
			</tr>
  			<tr>
				<th><bean:message key="Reason"/></th>
				<td>	
					<bean:define id="MsList" name="cdMap" property="reason_cd"/>
					<select name="reason_cd" id="reason_cd" class="search_form" style="width: 170px;">
						<option value='All'><bean:message key="ALL"/></option>
						<logic:iterate id="codeVO" name="MsList">
							<option value='<bean:write name="codeVO" property="code"/>'><bean:write name="codeVO" property="name"/></option>
						</logic:iterate>
					</select>
				</td>
				<th><bean:message key="Location"/></th>
				<td><input name="wh_loc_nm" id = "wh_loc_nm" type="text" class="L_input" style="width:177px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);getLocationInfo('c')"  OnKeyDown="if(event.keyCode==13){getLocationInfo('e');}" onChange="getLocationInfo('c')"/><!-- 
					 --><button type="button" name="btn_wh_loc_cd" id="btn_wh_loc_cd" class="input_seach_btn" tabindex="-1" onClick="doWork('btn_wh_loc_cd');"></button><!-- 
					 --><input type="hidden" id="wh_loc_cd" name="wh_loc_cd" /><!-- 
					 --><input type="hidden" id="wh_loc_nm_org" name="wh_loc_nm_org" />
				</td>
				<th><bean:message key="In_Booking_No"/></th>
				<td><input name="wib_bk_no" type="text" class="L_input" id="wib_bk_no" style="width:195px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" otherchar = "<%=WMS_OTHER_CHAR%>" onBlur="strToUpper(this);" maxlength="14" /></td>
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
</div>
</form>

<script type="text/javascript">
var attr_extension = "<%= roleBtnVO.getAttr_extension() %>";
doBtnAuthority(attr_extension);
</script>

<!-- <iframe id="_iFrameWait_" src="./web/images/common/processing.gif" frameborder="0" marginHeight="0" marginWidth="0" width="343" height="121" style="position:absolute;visibility:hidden;z-index:999;display:none;" ></iframe> -->
