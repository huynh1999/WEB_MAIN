<%
/*=========================================================
*Copyright(c) 2013 CyberLogitec
*@FileName : MCLPLoadPopup.jsp
*@FileTitle : 
*Open Issues :
*Change history :
*@LastModifyDate : 2013.4.24
*@LastModifier : 김영철
*@LastVersion : 1.0
=========================================================*/
%>
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
    <script type="text/javascript" src="./apps/fis/wms/common/js/LoadPlanPopup.js?ver=<%=CLT_JS_VER%>"></script>
    
	<script type="text/javascript" src="./js/common/message/<%=CLT_MSG_PATH%>/WMS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
<%
	String consol_no = "";
	String consol_tp = "";
	
	/* String DEF_WH_CTRT_NO   = "CTSZP14039";
	String DEF_WH_CTRT_NM   = "LINE PLUS";
	String DEF_WH_CD		= "KRACYW01";
	String DEF_WH_NM		= "ANSAN US LOGISTICS WAREHOUSE"; */
 	String DEF_WH_CTRT_NO   = userInfo.getDef_wh_ctrt_no()== null?"":userInfo.getDef_wh_ctrt_no();
	String DEF_WH_CTRT_NM   = userInfo.getDef_wh_ctrt_nm()== null?"":userInfo.getDef_wh_ctrt_nm();
	String DEF_WH_CD		= userInfo.getDef_wh_cd()== null?"":userInfo.getDef_wh_cd();
	String DEF_WH_NM		= userInfo.getDef_wh_nm()== null?"":userInfo.getDef_wh_nm();
			
	try {
		consol_no = request.getParameter("consol_no")== null?"":request.getParameter("consol_no");
		consol_tp = request.getParameter("consol_tp")== null?"":request.getParameter("consol_tp");
	}catch(Exception e) {
		out.println(e.toString());
	}	
%>
    <script>
    	<%-- <%=JSPUtil.getIBCodeCombo("lp_sts_cd", "", "WLS", "0", "")%> --%>
    </script>
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
<input type="hidden" id="f_cmd" value="0"/> 
<input type="hidden" name="h_consol_tp" value="<%=consol_tp%>">
<input type="hidden" name="h_consol_no" value="<%=consol_no%>">
<input type="hidden" name="f_consol_no" >
<input type="hidden" name="f_wh_cd" >
<input type="hidden" name="org_cd" value="<%=userInfo.getOfc_cd()%>">
<input type="hidden" name="user_id" value="<%=userInfo.getUsrid()%>">

<div class="page_title_area clear">
	<!-- page_title(S) -->
	<h2 class="page_title">
			<span><bean:message key="CARGO_SEARCH"/></span>
		</h2>
	<!-- page_title(E) -->
	<!-- opus_design_btn(S) -->
	<div class="opus_design_btn">
			<button type="button" class="btn_accent" name="btn_Search" id="btn_Search"  onClick="doWork('SEARCHLIST');"><bean:message key="Search"/></button><!-- 
			 --><button type="button" class="btn_normal" name="btn_Select" id="btn_Select" onClick="doWork('btn_Select');"><bean:message key="Select"/></button><!-- 
			  --><button type="button" class="btn_normal" name="btnAdd" id="btnAdd" onClick="doWork('ADD');"><bean:message key="Add"/></button><!-- 
			  --><button type="button" class="btn_normal" name="btn_Close" id="btn_Close" onClick="doWork('CLOSE');"><bean:message key="Close"/></button><!-- 
	 --></div>
	<!-- opus_design_btn(E) -->
	<!-- page_location(S) -->
		<div class="location">
			<span></span>
		</div>
	<!-- page_location(E) -->
	</div>

<div class= "wrap_search">
	<div class="opus_design_inquiry entry_pannel">
		<table>
			<colgroup>
				<col width="50" />
				<col width="150" />
				<col width="150" />
	            <col width="150" />
				<col width="150" />
				<col width="*" />
			</colgroup>
			<tbody>
				<tr>
					<th><bean:message key="Consol_No"/></th>
					<td>
						<input name="consol_no" type="text" value="<%=consol_no%>" class="L_input" style="width:188px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);" id="consol_no" maxlength="14" /><!-- 
					 --></td>
					<th></th>
					<td></td>
					<th></th>
					<td></td>
				</tr>
				<tr>
					<th><bean:message key="Warehouse"/></th>
					<td>
						<bean:define id="MsList" name="cdMap" property="warehouse"/>
						<select name="wh_cd" id="wh_cd" class="search_form" style="width: 188px;" required>
							<logic:iterate id="codeVO" name="MsList">
								<option value='<bean:write name="codeVO" property="wh_cd"/>'><bean:write name="codeVO" property="wh_nm"/></option>
							</logic:iterate>
						</select>
					    <%-- <input name="wh_cd" value="<%=DEF_WH_CD %>" type="text" class="L_input" id="wh_cd"  style="width:60px;text-transform:uppercase;" OnKeyDown="if(event.keyCode==13){getLocInfo(this);}" onBlur="getLocInfo(this)" maxlength="8" required/><!-- 
					     --><button type="button" name="btn_wh_cd" id="btn_wh_cd" class="input_seach_btn" tabindex="-1" onClick="doWork('btn_wh_cd');"></button><!--  --%>
					     <input name="wh_nm" value="<%=DEF_WH_CD %>" type="text" class="L_input_R" id="wh_nm" hidden="hidden" style="width:95px;" tabindex="-1" readonly required />  
					 </td>
					<th><bean:message key="Contract_No"/></th>
					<td>
						<input name="ctrt_no" type="text" class="L_input" style="width:80px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" otherchar="-_" onBlur="strToUpper(this);searchTlCtrtInfo();" id="ctrt_no" value="<%=DEF_WH_CTRT_NO %>" maxlength="10" required/><!-- 
						 --><button type="button" name="btn_ctrt_no" id="btn_ctrt_no" class="input_seach_btn" tabindex="-1" onClick="doWork('btn_ctrt_no');"></button><!--  
						 --><input name="ctrt_nm" type="text" class="L_input" style="width:110px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" otherchar = " ()-_" onBlur="strToUpper(this);" id="ctrt_nm" value="<%=DEF_WH_CTRT_NM %>" required disabled="disabled" readonly="readonly"/><!-- 
					 --></td>
					<th><bean:message key="LP_Status"/></th>
					<td>
						<bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
						<bean:define id="MsList" name="cdMap" property="LPStatus"/>
						<select name="lp_sts_cd" id="lp_sts_cd" class="search_form">
							<option value='ALL'><bean:message key="All"/></option>
							<logic:iterate id="CodeInfoVO" name="MsList">
								<option value='<bean:write name="CodeInfoVO" property="code"/>'><bean:write name="CodeInfoVO" property="name"/></option>
							</logic:iterate>
						</select>
					</td>
				</tr>
		                 <tr>
					<th><bean:message key="Booking_No"/></th>
					<td><input name="wob_bk_no" type="text" class="L_input" style="width:188px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);" id="wob_bk_no" maxlength="14"/></td>
					<th><bean:message key="Cust_Order_No"/></th>
					<td><input name="cust_ord_no" type="text" class="L_input" style="width:223px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);" id="cust_ord_no" maxlength="100"/></td>
					<th><bean:message key="Booking_Date"/></th>
					<td>
						<input name="fm_bk_dt" type="text" class="L_input"  maxlength="10" style="width:80px;" OnBeforeDeactivate="ComAddSeparator(this)" OnBeforeActivate="ComClearSeparator(this)"
						 onblur="chkCmprPrd(firCalFlag, false, this, this, form.to_bk_dt);firCalFlag=false;" onkeypress="onlyNumberCheck();" onkeyup="mkDateFormatType(this, event, false,1)"/><!-- 
						 --><span class="dash">~</span><!-- 
						 --><input name="to_bk_dt" type="text" class="L_input"  maxlength="10" style="width:80px;" OnBeforeDeactivate="ComAddSeparator(this)" OnBeforeActivate="ComClearSeparator(this)"
						  onblur="chkCmprPrd(firCalFlag, false, this,form.fm_bk_dt, this );firCalFlag=false;" onkeypress="onlyNumberCheck();" onkeyup="mkDateFormatType(this, event, false,1)"/><!-- 
						 --><button type="button" class="calendar ir" name="btn_to_bk_dt" id="btn_to_bk_dt" onClick="doWork('btn_to_bk_dt');"></button><!-- 
					 --></td>
				</tr>
		                 <tr>
					<th><bean:message key="Item"/></th>
					<td><input name="item_cd" otherchar = "<%=WMS_OTHER_CHAR%>" type="text" class="L_input" style="width:188px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);" id="item_cd" maxlength="20"/></td>
					<th><bean:message key="LOT_ID"/></th>
					<td><input name="lot_id" type="text" class="L_input" style="width:223px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);" id="lot_id" maxlength="16"/></td>
					<th><bean:message key="Estimated_OUT_Date"/></th>
					<td>
						<input name="fm_est_date" type="text" class="L_input"  maxlength="10" style="width:80px;" OnBeforeDeactivate="ComAddSeparator(this)" OnBeforeActivate="ComClearSeparator(this)"
						 onblur="chkCmprPrd(firCalFlag, false, this, this, form.to_est_date);firCalFlag=false;" onkeypress="onlyNumberCheck();" onkeyup="mkDateFormatType(this, event, false,1)"/><!-- 
						 --><span class="dash">~</span><!-- 
						 --><input name="to_est_date" type="text" class="L_input"  maxlength="10" style="width:80px;" OnBeforeDeactivate="ComAddSeparator(this)" OnBeforeActivate="ComClearSeparator(this)"
						  onblur="chkCmprPrd(firCalFlag, false, this,form.fm_est_date, this );firCalFlag=false;" onkeypress="onlyNumberCheck();" onkeyup="mkDateFormatType(this, event, false,1)"/><!-- 
						 --><button type="button" class="calendar ir" name="btn_to_est_date" id="btn_to_est_date" onClick="doWork('btn_to_est_date');"></button><!-- 
					 --></td>
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
<%@include file="/apps/fis/wms/bizcommon/include_common.jsp"%>
