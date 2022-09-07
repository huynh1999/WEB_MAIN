
<%--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : WHOCUpdate.jsp
*@FileTitle  : Outbound Complete Update
*@author     : Nam.Tran - DOU Network
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
    <script type="text/javascript" src="./apps/fis/wms/whoutboundcomplete/script/WHOCUpdate.js?ver=<%=CLT_JS_VER%>"></script>
    
    <%@ page import="com.clt.syscommon.response.CommonEventResponse"%>
    <bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
<%

String req_search_no   = "";
String req_search_tp   = "";
String req_search_div   = ""; //bk, lp
try {
	req_search_no   = request.getParameter("search_no")== null?"":request.getParameter("search_no");
	req_search_tp   = request.getParameter("search_tp")== null?"":request.getParameter("search_tp");
	req_search_div   = request.getParameter("search_div")== null?"":request.getParameter("search_div");
	
}catch(Exception e) {
	out.println(e.toString());
}	

%>
<%--     <script type="text/javascript">
	<%=JSPUtil.getIBCodeCombo("lp_sts_cd", "", "WLS", "0", "")%>
	</script>  --%>
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

<input type="hidden" name="req_search_no" id="req_search_no"	value="<%=req_search_no%>" />
<input type="hidden" name="req_search_tp" id="req_search_tp"	value="<%=req_search_tp %>" />
<input type="hidden" name="req_search_div" id="req_search_div"  value="<%=req_search_div %>" />
<input type="hidden" name="in_cnt" id="in_cnt" value="0" />

<input type="hidden" name="user_id" value="<%=userInfo.getUsrid()%>" />
<input type="hidden" name="org_cd" value="<%=userInfo.getOfc_cd()%>" />

<input type="hidden" name="def_wh_cd" id="def_wh_cd" value="<%=userInfo.getDef_wh_cd()%>" />
<input type="hidden" name="wh_list_ath" value="<%=userInfo.getWh_list_ath()%>" /> <!-- Get list warehouse from TB_SEQ table -->
<input type="hidden" name="wh_cfg" value="<%=userInfo.getWh_cfg()%>" /> <!-- Get list warehouse from TB_USR table --> 

<div class="page_title_area clear">
	<!-- page_title(S) -->
	<h2 class="page_title">
			<button type="button"><%= LEV3_NM %></button>
		</h2>
	<!-- page_title(E) -->
	<!-- page_location(S) -->
		<div class="location">
			<span><%= LEV1_NM %></span> &gt; <span><%= LEV2_NM %></span> &gt; <span><%= LEV3_NM %></span>
		</div>
	<!-- page_location(E) -->
</div>

<div class="wrap_result_tab">
	<ul id="ulTab" class="opus_design_tab">
        <li id=Tab01 class="nowTab"><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('01');"><span><bean:message key="By_Booking"/></span></a></li><!-- 
         --><li id=Tab02><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('02');"><span><bean:message key="By_Load_Plan"/></span></a></li>
    </ul>
			
	<div id="tabLayer" name="tabLayer" style="display:inline">  
	<div class="opus_design_btn TOP">
<%-- 		<button type="button" class="btn_accent" name="btn_Search_Booking" id="btn_Search_Booking" onClick="doWork('SEARCHLIST');" style="display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>"><bean:message key="Search"/></button><!-- 
		--><button type="button" class="btn_normal" name="btn_save_bk" id="btn_save_bk" onClick="doWork('SAVE');" style="display:none;" btnAuth="<%= roleBtnVO.getAttr3() %>"><bean:message key="Save"/></button><!-- 
		--><button type="button" class="btn_normal" name="btn_cancel_bk" id="btn_cancel_bk" onClick="doWork('btn_cancel_bk');" style="display:none;" btnAuth="CANCEL"><bean:message key="Cancel"/></button><!--
		--><button type="button" class="btn_normal" name="link_TruckFee_bk" id="link_TruckFee_bk" onclick= "btn_TruckFee('bk');" style="display:none;" btnAuth="TRUCK_FEE"><bean:message key="Truck_Fee"/></button><!--
		--><button type="button" class="btn_normal" name="link_OthCost_bk" id="link_OthCost_bk" onclick= "btn_Oth_Cost('bk');" style="display:none;" btnAuth="OTHER_COSTS"><bean:message key="Other_Costs"/></button><!--
		--><button type="button" class="btn_normal" name="link_Print_bk" id="link_Print_bk" onclick= "btn_Print('bk');" style="display:none;" btnAuth="<%= roleBtnVO.getAttr5() %>"><bean:message key="Print"/></button><!--
	 	-->
 --%>	 </div>
<!-- 	<div class="opus_design_btn">
			<button type="button" onclick= "btn_TruckFee('bk');" id="link_TruckFee_bk"><bean:message key="Truck_Fee"/></button>
			<button type="button" onclick= "btn_Oth_Cost('bk');" id="link_OthCost_bk"><bean:message key="Other_Costs"/></button>
			<button type="button" onclick= "btn_Print('bk');" id="link_Print_bk"><bean:message key="Print"/></button>
	</div>  -->
	<div class="opus_design_inquiry sm">
		<table>
			<colgroup>
			<col width="110" />
			<col width="150"/>
			<col width="150" />
			<col width="*"/>						
			</colgroup>
			<tbody>
				<tr>
					<th><bean:message key="OB_Complete_No"/></th>
					<td><input name="in_wob_out_no" id="in_wob_out_no" type="text" class="L_input" style="width:120px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);" maxlength="20" required/>
					</td>
					<th><bean:message key="OB_Booking_No"/></th>
					<td><input name="in_wob_bk_no" id="in_wob_bk_no" value="" type="text" class="L_input" style="width:120px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);" maxlength="20" required/>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
	<p class="line_bluedot"></p>
	<div class="opus_design_inquiry">
		<table>
			<colgroup>
				<col width="115" />
				<col width="220" />
				<col width="220" />
                <col width="220" />
				<col width="220" />
				<col width="*" />
			</colgroup>
			<tbody>
				<tr>
					<th><bean:message key="OB_Complete_No"/></th>
					<td>					
						<input name="wob_out_no" id="wob_out_no" type="text" class="L_input_R" style="width:224px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);" readOnly tabindex="-1"/><!-- 		
						 --><input name="walc_no" id="walc_no" type="hidden" /><!-- 		
					 --></td>
					<th><a href="javascript:btn_link_outbk();" id="btn_link_inbk"><span class="point_B"><bean:message key="OB_Booking_No"/></span></a></th>
					<td colspan="3">	
						<input name="bk_wob_bk_no" id="bk_wob_bk_no" type="text" class="L_input_R" style="width:224px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);" readOnly tabindex="-1"/><!-- 						
						 --><input name="bk_so_no" id="bk_so_no" type="hidden" /><!-- 	
					 --></td>
				</tr>
				<tr>
					<th><bean:message key="Warehouse"/></th>
					<td>
						<input name="bk_wh_cd" id="bk_wh_cd" type="text" class="L_input_R" style="width:80px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);" readOnly tabindex="-1" /><!-- 						
						 --><input name="bk_wh_nm" id="bk_wh_nm" type="text" class="L_input_R" style="width:140px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);" readOnly tabindex="-1" /><!-- 
					 --></td>
					<th><a href="javascript:btn_link_ctrt('bk');" id="btn_link_ctrt"><span class="point_B"><bean:message key="Contract_No1"/></span></a></th>
					<td>
						<input name="bk_ctrt_no" id="bk_ctrt_no" type="text" class="L_input_R" style="width:80px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);" readOnly tabindex="-1" /><!-- 
						 --><input name="bk_ctrt_nm" id="bk_ctrt_nm" type="text" class="L_input_R" id="user_nm" style="width:140px;" readOnly tabindex="-1" /><!-- 
					 --></td>
					<th><bean:message key="Consignee"/></th>
					<td>
						<input name="bk_buyer_cd" id="bk_buyer_cd" type="text" class="L_input_R" style="width:84px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);" readOnly tabindex="-1" /><!-- 
						 --><input name="bk_buyer_nm" id="bk_buyer_nm" type="text" class="L_input_R" id="user_nm" style="width:136px;" readOnly tabindex="-1" /><!-- 
					 --></td>
				</tr>
	            <tr>
					<th><bean:message key="Complete_Date"/></th>
					<td>					
						<input name="bk_outbound_dt" id="bk_outbound_dt" type="text" class="L_input_R" style="width:80px;"  maxlength="10" readOnly tabindex="-1" /><!-- 
					 --></td>
					<th><bean:message key="Loading_By"/></th>
					<td>
					    <input name="bk_load_by" id="bk_load_by" type="text" class="L_input" style="width:224px;"/><!-- 
					 --></td>
					<th><bean:message key="Loading_Start_Finish"/></th>
					<td>
					    <input name="bk_load_hm_fr" id="bk_load_hm_fr" type="text" class="L_input" style="width:50px;" dataformat="hm" maxlength="5" onblur="timeCheck(this, form.bk_load_hm_fr, form.bk_load_hm_to);" OnBeforeDeactivate="ComAddSeparator(this, 'hm');" OnBeforeActivate="ComClearSeparator(this, 'hm');"/><!-- 
					     --><input name="bk_load_hm_to" id="bk_load_hm_to" type="text" class="L_input" style="width:50px;" dataformat="hm" maxlength="5" onblur="timeCheck(this, form.bk_load_hm_fr, form.bk_load_hm_to);" OnBeforeDeactivate="ComAddSeparator(this, 'hm');" OnBeforeActivate="ComClearSeparator(this, 'hm');"/>
					</td>
				</tr>
	            <tr>
					<th><bean:message key="Customs_Ref_No"/></th>
					<td>
	                	<input name="bk_custms_ref_no" id="bk_custms_ref_no" type="text" class="L_input" style="width:224px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);"/><!-- 
					 --></td>
					<th><bean:message key="Updated_By"/></th>
					<td>
	                    <input name="bk_modi_ofc" id="bk_modi_ofc" type="text" class="L_input_R" style="width:80px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);" maxlength="10" readOnly tabindex="-1" /><!-- 
						 --><input name="bk_modi_nm" id="bk_modi_nm" type="text" class="L_input_R"  style="width:140px;" readOnly tabindex="-1" /><!-- 
					 --></td>
					<th><bean:message key="Updated_Date"/></th>
					<td>
					    <input name="bk_modi_loc_dt" id="bk_modi_loc_dt" type="text" class="L_input_R" style="width:84px;"  maxlength="10" readOnly tabindex="-1" /><!-- 
					 --></td>
				</tr>
				<tr>
					<th><bean:message key="Remark"/></th>
					<td colspan="5">
<!-- 						<textarea name="bk_rmk" id="bk_rmk" class="L_textarea"></textarea> -->
							<input name="bk_rmk" id="bk_rmk" type="text" class="L_textarea" style="width:100%;">
					</td>
				</tr>
			</tbody>
		</table>
	</div>

	<div class="opus_design_grid clear">
	<!-- opus_design_grid(S) -->
		<script type="text/javascript">comSheetObject('sheet1');</script>
	</div>
	</div>
	
	
		
	<div id="tabLayer" name="tabLayer" style="display:none">
	
	<!-- opus_design_btn(S) -->
	<div class="opus_design_btn">
		<button type="button" class="btn_accent" name="btn_Search_Load_Plan" id="btn_Search_Load_Plan" onClick="doWork('SEARCHLIST');" style="display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>"><bean:message key="Search"/></button><!-- 
		 --><button type="button" class="btn_normal" name="btn_save_lp" id="btn_save_lp" onClick="doWork('SAVE');" style="display:none;" btnAuth="<%= roleBtnVO.getAttr3() %>"><bean:message key="Save"/></button><!-- 
		  --><button type="button" class="btn_normal" name="btn_reinstate_lp" id="btn_reinstate_lp" onClick="doWork('btn_reinstate_lp');" style="display:none;" btnAuth="REINSTATE"><bean:message key="Reinstate"/></button><!-- 
		  --><button type="button" class="btn_normal" name="btn_cancel_lp" id="btn_cancel_lp" onClick="doWork('btn_cancel_lp');" style="display:none;" btnAuth="BLP_CANCEL"><bean:message key="Cancel"/></button><!-- 
		  --><button type="button" class="btn_normal" name="link_Print_lp" id="link_Print_lp" onclick= "btn_Print('lp');" style="display:none;" btnAuth="<%= roleBtnVO.getAttr5() %>"><bean:message key="Print"/></button><!-- 
	 --></div>
<!--  	<div class="opus_design_btn">
			<button type="button" onclick= "btn_Print('lp');" id="link_Print_lp"><bean:message key="Print"/></button>
	</div>  -->
	<!-- opus_design_btn(E) -->
	
	<div class="opus_design_inquiry sm">
		<table>
			<colgroup>
			<col width="110" />
			<col width="*"/>						
			</colgroup>
			<tbody>
				<tr>
					<th><bean:message key="Load_Plan_No"/></th>
					<td><input name="in_lp_no" id="in_lp_no" type="text" class="L_input" style="width:120px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);" maxlength="20" required/></td>
				</tr>
			</tbody>
		</table>
	</div>
	<p class="line_bluedot"></p>
	<div class="opus_design_inquiry">
		<table>
			<colgroup>
				<col width="115" />
				<col width="220" />
				<col width="220" />
                <col width="220" />
				<col width="220" />
				<col width="*" />
			</colgroup>
			<tbody>
				<tr>
					<th><bean:message key="Load_Plan_No"/></th>
					<td>					
						<input name="lp_no" id="lp_no" type="text" class="L_input_R" style="width:224px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);" readOnly tabindex="-1"/><!-- 					
					 --></td>
					<th><a href="javascript:btn_link_lp();" id="btn_link_lp"><span class="point_B"><bean:message key="Console_No"/></span></a></th>
					<td>					
						<input name="consol_no" id="consol_no" type="text" class="L_input_R" style="width:256px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);" readOnly tabindex="-1"/><!-- 					
					 --></td>
					<th><bean:message key="Status"/></th>
					<td>					
						<bean:define id="MsList" name="cdMap" property="lp_sts_cd"/>
							<select name="lp_sts_cd" id="lp_sts_cd" style="width:90px">
							<option value=''></option>
								<logic:iterate id="codeVO" name="MsList">
								<option value='<bean:write name="codeVO" property="code"/>'><bean:write name="codeVO" property="name"/></option>
								</logic:iterate>
							</select><!-- 
						 --><input type="checkbox" id="checkComplete" name="checkComplete" onclick="check_flg(this);"/><label for="checkComplete"><bean:message key="Complete"/></label><!-- 
					 --></td>
				</tr>
				<tr>
					<th><bean:message key="Warehouse"/></th>
					<td>
						<input name="lp_wh_cd" id="lp_wh_cd" type="text" class="L_input_R" style="width:80px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);" readOnly tabindex="-1" /><!-- 						
						 --><input name="lp_wh_nm" id="lp_wh_nm" type="text" class="L_input_R" style="width:140px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);" readOnly tabindex="-1" /><!-- 
					 --></td>
					<th><a href="javascript:btn_link_ctrt('lp');" id="btn_link_ctrt"><span class="point_B"><bean:message key="Contract_No1"/></span></a></th>
					<td>
						<input name="lp_ctrt_no" id="lp_ctrt_no" type="text" class="L_input_R" style="width:80px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);" readOnly tabindex="-1" /><!-- 
						 --><input name="lp_ctrt_nm" id="lp_ctrt_nm" type="text" class="L_input_R" id="user_nm" style="width:172px;" readOnly tabindex="-1" /><!-- 
					 --></td>
					<th><bean:message key="Consignee"/></th>
					<td>
						<input name="lp_buyer_cd" id="lp_buyer_cd" type="text" class="L_input_R" style="width:84px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);" readOnly tabindex="-1" /><!-- 
						 --><input name="lp_buyer_nm" id="lp_buyer_nm" type="text" class="L_input_R" id="user_nm" style="width:136px;" readOnly tabindex="-1" /><!-- 
					 --></td>
				</tr>
				<tr>
					<th><bean:message key="CNTR_TR_Type_No"/></th>
					<td>
						<input name="eq_tpsz_cd" id="eq_tpsz_cd" type="text" class="L_input_R" style="width:80px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);" readOnly/><!-- 
						 --><input name="eq_no" id="eq_no" type="text" class="L_input" style="width:140px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);" maxlength="20"/><!-- 
					 --></td>
					<th><bean:message key="Seal_No"/></th>
					<td>
						<input name="seal_no" id="seal_no" type="hidden" /><!-- 
						 --><input name="seal_no0" id="seal_no0" type="text" class="L_input" style="width:80px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);"/><!-- 
						 --><input name="seal_no1" id="seal_no1" type="text" class="L_input" style="width:84px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);"/><!-- 
						 --><input name="seal_no2" id="seal_no2" type="text" class="L_input" style="width:84px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);"/><!-- 
					 --></td>
					<th><bean:message key="Gate_In_Out"/></th>
					<td>
						<input name="lp_gate_in_hm" id="lp_gate_in_hm" type="text" class="L_input" style="width:40px;" dataformat="hm" maxlength="5" onblur="timeCheck(this, form.lp_gate_in_hm, form.lp_gate_out_hm);" OnBeforeDeactivate="ComAddSeparator(this, 'hm');" OnBeforeActivate="ComClearSeparator(this, 'hm');"/><!-- 
						 --><input name="lp_gate_out_hm" id="lp_gate_out_hm" type="text" class="L_input" style="width:40px;" dataformat="hm" maxlength="5" onblur="timeCheck(this, form.lp_gate_in_hm, form.lp_gate_out_hm);" OnBeforeDeactivate="ComAddSeparator(this, 'hm');" OnBeforeActivate="ComClearSeparator(this, 'hm');"/><!-- 						
					 --></td>
				</tr>
	            <tr>
					<th><bean:message key="Complete_Date"/></th>
					<td>					
						<input name="lp_outbound_dt" id="lp_outbound_dt" type="text" class="L_input_R" style="width:80px;"  maxlength="10" readOnly tabindex="-1"
						onclick = "OmsFunFocusDel(this)" onkeypress="onlyNumberCheck();" onkeyup="mkDateFormatType(this, event, false,1)" /><!-- 
						 --><button type="button" class="calendar ir" name="btn_lp_outbound_dt" id="btn_lp_outbound_dt" onClick="doWork('btn_lp_outbound_dt');"></button><!-- 
						 --><input name="lp_outbound_dt_org" id="lp_outbound_dt_org" type="hidden" />
					</td>
					<th><bean:message key="Loading_By"/></th>
					<td>
					    <input name="lp_load_by" id="lp_load_by" type="text" class="L_input" style="width:256px;"/><!-- 
					 --></td>
					<th><bean:message key="Loading_Start_Finish"/></th>
					<td>
						<input name="lp_load_hm_fr" id="lp_load_hm_fr" type="text" class="L_input" style="width:40px;" dataformat="hm" maxlength="5" onblur="timeCheck(this, form.lp_load_hm_fr, form.lp_load_hm_to);" OnBeforeDeactivate="ComAddSeparator(this, 'hm');" OnBeforeActivate="ComClearSeparator(this, 'hm');"/><!-- 
						 --><input name="lp_load_hm_to" id="lp_load_hm_to" type="text" class="L_input" style="width:40px;" dataformat="hm" maxlength="5" onblur="timeCheck(this, form.lp_load_hm_fr, form.lp_load_hm_to);" OnBeforeDeactivate="ComAddSeparator(this, 'hm');" OnBeforeActivate="ComClearSeparator(this, 'hm');"/>
					</td>
				</tr>
	            <tr>
	            	<th><bean:message key="Customs_Ref_No"/></th>
					<td>
						<input name="lp_custms_ref_no" id="lp_custms_ref_no" type="text" class="L_input" style="width:224px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);"/><!-- 
					 --></td>							
	                <th><bean:message key="Updated_By"/></th>
					<td>
	                    <input name="lp_modi_ofc" id="lp_modi_ofc" type="text" class="L_input_R" style="width:80px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);" maxlength="10" readOnly tabindex="-1" /><!-- 
						 --><input name="lp_modi_nm" id="lp_modi_nm" type="text" class="L_input_R"  style="width:172px;" readOnly tabindex="-1" /><!-- 
					 --></td>
					<th><bean:message key="Updated_Date"/></th>
					<td>
					    <input name="lp_modi_loc_dt" id="lp_modi_loc_dt" type="text" class="L_input_R" style="width:84px;"  maxlength="10" readOnly tabindex="-1" /><!-- 
					 --></td>
				</tr>
				<tr>
					<th><bean:message key="Remark"/></th>
					<td colspan="5">
<!-- 						<textarea name="lp_rmk" id="lp_rmk" class="L_textarea"></textarea> -->
						<input name="lp_rmk" id="lp_rmk" type="text" class="L_textarea" style="width:100%;">
					</td>
				</tr>
			</tbody>
		</table>
</div>

	<div class="opus_design_grid clear">
	<!-- opus_design_grid(S) -->
		<script type="text/javascript">comSheetObject('sheet2');</script>
	</div>
	</div>
	</div>
</form>
<form name="frm1" method="POST" action="./GateServlet.gsl">
	<input type="hidden" name="goWhere" value="fd" id="goWhere" />
    <input type="hidden" name="bcKey" value="downloadTlFileTemplateWMS" id="bcKey" />
    <input type="hidden" name="file_path" value="" id="file_path" />
    <input type="hidden" name="file_name" value="" id="file_name"/>	
    <input type="hidden" name="docType" value="" id="docType" />
</form>	

<iframe name="ifra_hidden" style="width:0;height:0;visibility:hidden" border=0></iframe>

<%@include file="/apps/fis/wms/bizcommon/include_common.jsp"%>

<script type="text/javascript">
	var attr_extension = "<%= roleBtnVO.getAttr_extension() %>";
	doBtnAuthority(attr_extension);
</script>