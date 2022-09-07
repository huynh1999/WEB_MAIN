
<%--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : WHPutawayMgmt.jsp
*@FileTitle  : Putaway Management
*@author     : Nam.Tran - DOU Network
*@version    : 1.0
*@since      : 2015/04/15
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
    <script type="text/javascript" src="./apps/fis/wms/whinputaway/script/WHPutawayMgmt.js?ver=<%=CLT_JS_VER%>"></script>  
    
 	<script type="text/javascript" src="./js/common/message/<%=CLT_MSG_PATH%>/WMS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
 	<bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
 	<bean:define id="prop_cd" name="cdMap" property="prop_cd"/>
<%
	String wib_in_no = "";
	String wib_bk_no = "";
	String lnk_wh_cd = "";
	String DEF_WH_CD		= userInfo.getDef_wh_cd()== null?"":userInfo.getDef_wh_cd();
	
	try {
		wib_in_no = request.getParameter("wib_in_no") == null ? "" : request.getParameter("wib_in_no");
		wib_bk_no = request.getParameter("wib_bk_no") == null ? "" : request.getParameter("wib_bk_no");
		lnk_wh_cd = request.getParameter("wh_cd") == null ? "" : request.getParameter("wh_cd");
	} catch (Exception e) {
		out.println(e.toString());
	}
%>
<script language="javascript">
	var prop_cdText = "";
	var prop_cdCode = "";
	
	<logic:iterate id="codeVO" name="prop_cd">
	
	prop_cdCode+= '<bean:write name="codeVO" property="code"/>' + '|';
	prop_cdText+= '<bean:write name="codeVO" property="name"/>' + '|';
	</logic:iterate>
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
<input type="hidden" name="f_cmd">
<input type="hidden" name="form_mode" value="" />
<input type="hidden" name="wh_cd" value="" />
<input type="hidden" name="proc_type" value="" />
<input type="hidden" name="ob_cnt" value="0" />
<input type="hidden" name="in_cnt" value="0" />
<%-- <input type="hidden" name="curr_date" value="<%=DateUtility.transformDate(CalendarUtilities.dateToString(new Date()), "-")%>" /> --%>

<input type="hidden" name="user_id" value="<%=userInfo.getUsrid()%>" />
<input type="hidden" name="user_nm" value="<%=userInfo.getUser_name()%>" />
<input type="hidden" name="org_cd" value="<%=userInfo.getOfc_cd()%>" />

<input type="hidden" name="lnk_wh_cd" id="lnk_wh_cd" value="<%=lnk_wh_cd%>" />
<input type="hidden" name="def_wh_cd" id="def_wh_cd" value="<%=DEF_WH_CD%>" />
<input type="hidden" name="wh_list_ath" value="<%=userInfo.getWh_list_ath()%>" /> <!-- Get list warehouse from TB_SEQ table -->
<input type="hidden" name="wh_cfg" value="<%=userInfo.getWh_cfg()%>" /> <!-- Get list warehouse from TB_USR table --> 
<input type="hidden" name="pageurl" id="pageurl" value="WHPutawayMgmt.clt"/>
<div class="page_title_area clear">
	<!-- page_title(S) -->
	<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	<!-- page_title(E) -->
	<!-- opus_design_btn(S) -->
	<div class="opus_design_btn TOP">
<%-- 		<button type="button" style="display:none;" btnAuth="<%=null != roleBtnVO ?  roleBtnVO.getAttr1() : ""%>" class="btn_accent" name="btn_Search" id="btn_Search" onClick="doWork('SEARCHLIST');"><bean:message key="Search"/></button><!-- 
		--><button type="button" style="display:none;" btnAuth="<%=null != roleBtnVO ?  roleBtnVO.getAttr3() : ""%>" class="btn_normal" name="btnSave" id="btnSave" onClick="doWork('SAVE');"><bean:message key="Save"/></button><!-- 
		--><button type="button" style="display:none;" btnAuth="CANCEL"  class="btn_normal" name="btn_cancel" id="btn_cancel" onClick="doWork('btn_cancel');"><bean:message key="Cancel"/></button><!-- 
		--><button type="button" style="display:none;" btnAuth="HISTORY"  class="btn_normal" name="btn_history" id="btn_history" onClick="doWork('btn_history');"><bean:message key="History"/></button><!-- 
		--><button type="button" style="display:none;" btnAuth="<%=null != roleBtnVO ?  roleBtnVO.getAttr6() : ""%>" class="btn_normal" name="link_print" id="link_print" onClick="doWork('link_print');"><bean:message key="Print"/></button>
 --%>	</div>
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

<div class= "wrap_search">
	<div class="opus_design_inquiry entry_pannel ">
		<table>
			<colgroup>
				<col width="105" />
				<col width="232"/>
				<col width="315" />
				<col width="*"/>						
			</colgroup>
			<tbody>
				<tr>					
					<th><bean:message key="IB_Complete_No"/></th>
					<td><input name="c_wib_in_no" id="c_wib_in_no" value="<%=wib_in_no%>" type="text" class="L_input" style="width:120px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);" maxlength="24" OnKeyDown="if(event.keyCode==13){btn_Search();}" required onkeypress="onlyNumberCheck('');"/></td>
					<th><bean:message key="IN_Booking_No"/></th>
					<td><input name="c_wib_bk_no" id="c_wib_bk_no" value="<%=wib_bk_no%>" type="text" class="L_input" style="width:119px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);" maxlength="24" OnKeyDown="if(event.keyCode==13){btn_Search();}" required onkeypress="onlyNumberCheck('');"/></td>
				</tr>
			</tbody>
		</table>
	</div>
	</div>
<div class= "wrap_result">	
	<div class="opus_design_inquiry">
		<table >
			<colgroup>
				<col width="100" />
				<col width="150" />						
				<col width="200" />
                <col width="150" />                        
				<col width="150" />
				<col width="150" />						
				<col width="150" />
				<col width="*" />						
			</colgroup>
			<tbody>
				<tr>
					<th><a style="color:#0000FF" href="javascript:btn_link_inbk();" id="btn_link_inbk"><span class="point_B"><bean:message key="IN_Booking_No"/></span></a></th>
					<td><input name="wib_bk_no" type="text" class="L_input_R" id="wib_bk_no" style="width:120px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);" readOnly tabindex="-1" /></td>
					<th><a style="color:#0000FF" href="javascript:btn_link_ic();" id="btn_link_ic"><span class="point_B"><bean:message key="IB_Complete_No"/></span></a></th>
					<td colsapan="5"><input name="wib_in_no" type="text" class="L_input_R" id="wib_in_no" style="width:119px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);" readOnly tabindex="-1" /></td>
				</tr>
				<tr>
					<th><bean:message key="Supervisor"/></th>
					<td>					
						<input name="supv_nm" type="text" class="L_input" id="supv_nm" style="width:340px;" maxlength="100"/>					
					</td>						
					<th><bean:message key="Inbound_Date"/></th>
					<td><input name="inbound_dt" id="inbound_dt" type="text" class="L_input_R" style="width:119px;"  maxlength="10" readOnly tabindex="-1" /></td>						
					<th><bean:message key="Putaway_Start"/></th>
					<td><input onkeyup="formatTime(this);" onblur="timeCheck(this, form.putaway_hm_fr, form.putaway_hm_to);" name="putaway_hm_fr" id="putaway_hm_fr" type="text" class="L_input" style="width:40px;" dataformat="hm" maxlength="5" OnBeforeDeactivate="ComAddSeparator(this, 'hm')" OnBeforeActivate="ComClearSeparator(this, 'hm')" /></td>						
					<th><bean:message key="Putaway_Finish"/></th>
					<td><input onkeyup="formatTime(this);" onblur="timeCheck(this, form.putaway_hm_fr, form.putaway_hm_to);" name="putaway_hm_to" id="putaway_hm_to" type="text" class="L_input" style="width:40px;" dataformat="hm" maxlength="5" OnBeforeDeactivate="ComAddSeparator(this, 'hm')" OnBeforeActivate="ComClearSeparator(this, 'hm')" /></td>						
				</tr>
	            <tr>
	                <th><bean:message key="Worker"/></th>
					<td><input name="work_nm" type="text" class="L_input" id="work_nm" style="width:340px;" maxlength="100"/></td>
					<th><bean:message key="Message_To_Worker"/></th>
					<td colspan="5"><input name="msg_to_wk" type="text" class="L_input" id="msg_to_wk" style="width:640px;" maxlength="100"/></td>
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
<%@include file="/apps/fis/wms/bizcommon/include_common.jsp"%>
