<%--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : FreightMgmt.jsp
*@FileTitle  : Freight Management
*@author     : Phuoc.Le - DOU Network
*@version    : 1.0
*@since      : 2015/03/19
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
    <script type="text/javascript" src="./apps/fis/wms/freight/script/FreightMgmt.js?ver=<%=CLT_JS_VER%>"></script> 
    
    <%@ page import="com.clt.syscommon.response.CommonEventResponse"%>
    <bean:define id="cdMap"  name="EventResponse" property="mapVal"/>                                                                                                                                                                            
<%
	
	String in_frt_doc_no 	 = "";
	String in_doc_cls_cd 	 = "";
	String link_doc_no   	 = ""; 
	String link_doc_cls_cd   = ""; 
	
	/* String text = userInfo.getCurr_cd(); */
	String text = "KRW";
	
	try {
		in_frt_doc_no = request.getParameter("frt_doc_no")== null?"":request.getParameter("frt_doc_no");
		in_doc_cls_cd = request.getParameter("doc_cls_cd")== null?"":request.getParameter("doc_cls_cd");
		
		link_doc_no       = request.getParameter("link_doc_no")== null?"":request.getParameter("link_doc_no");
		link_doc_cls_cd   = request.getParameter("link_doc_cls_cd")== null?"":request.getParameter("link_doc_cls_cd");
		
		if(link_doc_no != null && !"".equals(link_doc_no)){
			in_frt_doc_no = link_doc_no;
		}
		if(link_doc_cls_cd != null && !"".equals(link_doc_cls_cd)){
			in_doc_cls_cd = link_doc_cls_cd;
		}
		
	}catch(Exception e) {
		out.println(e.toString());
	}
%>

<script>
	var accrual_cdText = '';
	var accrual_cdCode = '';
	
	var pass_cdText = '';
	var pass_cdCode = '';
	
    var hdr11="Doc Type|Doc No.|Freight|Service Provider / Carrier|Service Provider / Carrier|";
    var hdr21="Doc Type|Doc No.|Freight|Code|Name|";
    
    var hdr12="Seq|Del|Branch|Customer|Customer|Accrual|Internal|Freight|Freight|Curr|Ex.Rate|Unit|Pkgs|Rate|NET AMT(ENT)|NET AMT(LOC)|VAT(%)|VAT(LOC)|VAT(ENT)|SUB TTL|Pass|Invoice No.|Invoice Date|ACCT(USD)|Create User|Update User||||||||||";
    var hdr22="Seq|Del|Branch|Code|Name|Accrual|Internal|Code|Desc.|Curr|Ex.Rate|Unit|Pkgs|Rate|NET AMT(ENT)|NET AMT(LOC)|VAT(%)|VAT(LOC)|VAT(ENT)|SUB TTL|Pass|Invoice No.|Invoice Date|ACCT(USD)|Create User|Update User||||||||||";
	
    var hdr13="Seq|Del|Branch|Provider|Provider|Accrual|Internal|Freight|Freight|Curr|Ex.Rate|Unit|Pkgs|Rate|NET AMT(ENT)|NET AMT(LOC)|VAT(%)|VAT(LOC)|VAT(ENT)|SUB TTL|Pass|Invoice No.|Invoice Date|ACCT(USD)|Create User|Update User||||||||||";
    var hdr23="Seq|Del|Branch|Code|Name|Accrual|Internal|Code|Desc.|Curr|Ex.Rate|Unit|Pkgs|Rate|NET AMT(ENT)|NET AMT(LOC)|VAT(%)|VAT(LOC)|VAT(ENT)|SUB TTL|Pass|Invoice No.|Invoice Date|ACCT(USD)|Create User|Update User||||||||||";
</script>

<logic:notEmpty name="cdMap" property="accrual_cd">
 	<bean:define id="MsList" name="cdMap" property="accrual_cd"/>
	<script>

	<% boolean isBegin = false; %>
          <logic:iterate id="codeVO" name="MsList">
              <% if(isBegin){ %>
              accrual_cdText+= '|';
              accrual_cdCode+= '|';
              <% }else{
                    isBegin = true;
                 } %>
                 accrual_cdText+= '<bean:write name="codeVO" property="name"/>';
                 accrual_cdCode+= '<bean:write name="codeVO" property="code"/>';
          </logic:iterate>
	</script>  
</logic:notEmpty>

<logic:notEmpty name="cdMap" property="accrual_cd">
 	<bean:define id="MsList" name="cdMap" property="accrual_cd"/>
	<script>

	<% boolean isBegin = false; %>
          <logic:iterate id="codeVO" name="MsList">
              <% if(isBegin){ %>
              pass_cdText+= '|';
              pass_cdCode+= '|';
              <% }else{
                    isBegin = true;
                 } %>
                 pass_cdText+= '<bean:write name="codeVO" property="name"/>';
                 pass_cdCode+= '<bean:write name="codeVO" property="code"/>';
          </logic:iterate>
	</script>  
</logic:notEmpty>
	
	<script type="text/javascript">
	
<%-- 	<%=JSPUtil.getIBCodeCombo("sell_exrate_cls_cd", "", "FT3", "0", "")%>
	<%=JSPUtil.getIBCodeCombo("buy_exrate_cls_cd", "", "FT3", "0", "")%>
	
	<%=JSPUtil.getIBCodeCombo("accrual_cd", "", "FNA", "0", "")%>
	<%=JSPUtil.getIBCodeCombo("pass_cd", "", "FNP", "0", "")%> --%>
	
	var SELL_VAT_CD = "";
	var SELL_VAT_NM = "";
	var SELL_VAT_OPT1 = "";
	var BUY_VAT_CD = "";
	var BUY_VAT_NM = "";
	
	var VAT_EDIT_BR = "";
	var VAT_EDIT_SB_CLS_CD = "";
	var VAT_LOC_EDIT_BR = "";
	var VAT_LOC_EDIT_SB_CLS_CD = "";
	var LOC_AMT_EDIT_BR = "";
	var LOC_AMT_EDIT_SB_CLS_CD = "";
	
	</script>
	
<logic:notEmpty name="cdMap" property="rtn_sell_vat">
 	<bean:define id="MsList" name="cdMap" property="rtn_sell_vat"/>
	<script>

	<% boolean isBegin = false; %>
          <logic:iterate id="codeVO" name="MsList">
              <% if(isBegin){ %>
              SELL_VAT_NM+= '|';
              SELL_VAT_CD+= '|';
              SELL_VAT_OPT1+= '|';
              <% }else{
                    isBegin = true;
                 } %>
                 SELL_VAT_NM+= '<bean:write name="codeVO" property="code_nm"/>';
                 SELL_VAT_CD+= '<bean:write name="codeVO" property="code_cd"/>';
                 SELL_VAT_OPT1+= '<bean:write name="codeVO" property="code_cd"/>';
          </logic:iterate>
	</script>  
</logic:notEmpty>

<logic:notEmpty name="cdMap" property="rtn_buy_vat">
 	<bean:define id="MsList" name="cdMap" property="rtn_buy_vat"/>
	<script>

	<% boolean isBegin = false; %>
          <logic:iterate id="codeVO" name="MsList">
              <% if(isBegin){ %>
              BUY_VAT_NM+= '|';
              BUY_VAT_CD+= '|';
              <% }else{
                    isBegin = true;
                 } %>
                 BUY_VAT_NM+= '<bean:write name="codeVO" property="code_nm"/>';
                 BUY_VAT_CD+= '<bean:write name="codeVO" property="code_cd"/>';
          </logic:iterate>
	</script>  
</logic:notEmpty>

<logic:notEmpty name="cdMap" property="rtn_vat_edit">
 	<bean:define id="MsList" name="cdMap" property="rtn_vat_edit"/>
	<script>

	<% boolean isBegin = false; %>
          <logic:iterate id="codeVO" name="MsList">
              <% if(isBegin){ %>
              VAT_EDIT_SB_CLS_CD+= '|';
              VAT_EDIT_BR+= '|';
              <% }else{
                    isBegin = true;
                 } %>
                 VAT_EDIT_SB_CLS_CD+= '<bean:write name="codeVO" property="codeNm"/>';
                 VAT_EDIT_BR+= '<bean:write name="codeVO" property="codeCd"/>';
          </logic:iterate>
	</script>  
</logic:notEmpty>

<logic:notEmpty name="cdMap" property="rtn_vat_loc_edit">
 	<bean:define id="MsList" name="cdMap" property="rtn_vat_loc_edit"/>
	<script>

	<% boolean isBegin = false; %>
          <logic:iterate id="codeVO" name="MsList">
              <% if(isBegin){ %>
              VAT_LOC_EDIT_SB_CLS_CD+= '|';
              VAT_LOC_EDIT_BR+= '|';
              <% }else{
                    isBegin = true;
                 } %>
                 VAT_LOC_EDIT_SB_CLS_CD+= '<bean:write name="codeVO" property="codeNm"/>';
                 VAT_LOC_EDIT_BR+= '<bean:write name="codeVO" property="codeCd"/>';
          </logic:iterate>
	</script>  
</logic:notEmpty>

<logic:notEmpty name="cdMap" property="rtn_loc_amt_edit">
 	<bean:define id="MsList" name="cdMap" property="rtn_loc_amt_edit"/>
	<script>

	<% boolean isBegin = false; %>
          <logic:iterate id="codeVO" name="MsList">
              <% if(isBegin){ %>
              LOC_AMT_EDIT_SB_CLS_CD+= '|';
              LOC_AMT_EDIT_BR+= '|';
              <% }else{
                    isBegin = true;
                 } %>
                 LOC_AMT_EDIT_SB_CLS_CD+= '<bean:write name="codeVO" property="codeNm"/>';
                 LOC_AMT_EDIT_BR+= '<bean:write name="codeVO" property="codeCd"/>';
          </logic:iterate>
	</script>  
</logic:notEmpty> 
	
	<%
/* 	String rtn_sell_vat = JSPUtil.getQueryCodeCombo("searchFreightMgmtVatList", "", "", "","S", userInfo.getOrg_cd(),"","","","","","","","");
	String[] vat_sell_combo = rtn_sell_vat.split(",");
	String sell_vat_cd = vat_sell_combo[0];
	String sell_vat_nm = vat_sell_combo[1];
	
	String rtn_buy_vat = JSPUtil.getQueryCodeCombo("searchFreightMgmtVatList", "", "", "","B", userInfo.getOrg_cd(),"","","","","","","","");
	String[] vat_buy_combo = rtn_buy_vat.split(",");
	String buy_vat_cd = vat_buy_combo[0];
	String buy_vat_nm = vat_buy_combo[1];
	
	String rtn_vat_edit = JSPUtil.getQueryCodeCombo("searchCommonCodeList", "S31","","","","","","","","","","","","");
	String[] vat_edit_combo = rtn_vat_edit.split(",");
	String vat_edit_br = vat_edit_combo[1];
	String vat_edit_sb_cls_cd = vat_edit_combo[2];
	
	String rtn_vat_loc_edit = JSPUtil.getQueryCodeCombo("searchCommonCodeList", "S32","","","","","","","","","","","","");
	String[] vat_loc_edit_combo = rtn_vat_loc_edit.split(",");
	String vat_loc_edit_br = vat_loc_edit_combo[1];
	String vat_loc_edit_sb_cls_cd = vat_loc_edit_combo[2];
	
	String rtn_loc_amt_edit = JSPUtil.getQueryCodeCombo("searchCommonCodeList", "S33","","","","","","","","","","","","");
	String[] loc_amt_edit_combo = rtn_loc_amt_edit.split(",");
	String loc_amt_edit_br = loc_amt_edit_combo[1];
	String loc_amt_edit_sb_cls_cd = loc_amt_edit_combo[2]; */
	%>
<%-- 	SELL_VAT_CD = "<%=sell_vat_cd%>";
	SELL_VAT_NM = "<%=sell_vat_nm%>";
	SELL_VAT_OPT1 = "<%=sell_vat_cd%>"; 
	BUY_VAT_CD = "<%=buy_vat_cd%>";
	BUY_VAT_NM = "<%=buy_vat_nm%>";
	VAT_EDIT_BR = "<%=vat_edit_br%>";
	VAT_EDIT_SB_CLS_CD = "<%=vat_edit_sb_cls_cd%>";
	VAT_LOC_EDIT_BR = "<%=vat_loc_edit_br%>";
	VAT_LOC_EDIT_SB_CLS_CD = "<%=vat_loc_edit_sb_cls_cd%>";
	LOC_AMT_EDIT_BR = "<%=loc_amt_edit_br%>";
	LOC_AMT_EDIT_SB_CLS_CD = "<%=loc_amt_edit_sb_cls_cd%>"; --%>
	

	                                                                                                                                      
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

 <input type="hidden" name="form_mode" 	    value="NEW" />
 
 <input type="hidden" name="curr_date" 	    value="2015-07-20" />
 <input type="hidden" name="user_id" 		value="ADMIN" /> 
 <input type="hidden" name="user_nm" 		value="ADMINISTRATION_DOU." />
 <input type="hidden" name="org_cd" 		value="KRSELLB" />
 <input type="hidden" name="org_nm" 		value="HJLK CORPORATION" /> 
 <input type="hidden" name="auth_lvl"    	value="LB" /> 
 
<%--  <input type="hidden" name="curr_date" 	    value="<%=DateUtility.transformDate(CalendarUtilities.dateToString(new Date()), "-")%>" />
 <input type="hidden" name="user_id" 		value="<%=userInfo.getUser_id()%>" /> 
 <input type="hidden" name="user_nm" 		value="<%=userInfo.getUser_nm()%>" />
 <input type="hidden" name="org_cd" 		value="<%=userInfo.getOrg_cd()%>" />
 <input type="hidden" name="org_nm" 		value="<%=userInfo.getOrg_nm()%>" /> 
 <input type="hidden" name="auth_lvl"    	value="<%=userInfo.getAuth_lvl()%>" />  --%>
 
 <input type="hidden" name="doc_no" 		value="" id="doc_no"/> 
 <input type="hidden" name="doc_cls_cd" 	value="<%=in_doc_cls_cd%>" /> 
 <input type="hidden" name="op_ofc_cd" 	    value="" id="op_ofc_cd"/> 
 <input type="hidden" name="wo_ord_tp_cd"   value="" id="wo_ord_tp_cd"/>
 <input type="hidden" name="ori_br_cd" 	    value="" id="ori_br_cd"/>
 <input type="hidden" name="dest_br_cd" 	value="" id="dest_br_cd"/>
 <input type="hidden" name="tri_br_cd" 	    value="" id="tri_br_cd"/>
 <input type="hidden" name="incls_vat_amt_flg" 	value="" id="incls_vat_amt_flg"/> 
 <input type="hidden" name="sell_vat_def_cd" 	value="" id="sell_vat_def_cd"/> 
 <input type="hidden" name="buy_vat_def_cd" 	value="" id="buy_vat_def_cd"/> 
 <input type="hidden" name="bf_sell_exrate_dt" 	value="" id="bf_sell_exrate_dt"/>
 <input type="hidden" name="bf_buy_exrate_dt" 	value="" id="bf_buy_exrate_dt"/>
 <input type="hidden" name="ctrt_cust_cd" 	    value="" id="ctrt_cust_cd"/>
 <input type="hidden" name="ctrt_cust_nm"    	value="" id="ctrt_cust_nm"/> 
 <input type="hidden" name="ctry_cd"    	    value="" id="ctry_cd"/>  
 <input type="hidden" name="loc_job_flg" 	value="" id="loc_job_flg"/>
 <input type="hidden" name="sell_cust_cd"  	value=""  id="sell_cust_cd"/>
 <input type="hidden" name="sell_cust_nm" 	value=""  id="sell_cust_nm"/>  
 <input type="hidden" name="buy_cust_cd" 	value=""  id="buy_cust_cd"/>
 <input type="hidden" name="buy_cust_nm" 	value=""  id="buy_cust_nm"/>  
 <input type="hidden" name="auto_ca_use" 	value="" id="auto_ca_use"/>
 <input type="hidden" name="ca_popup_yn" 	value="" id="ca_popup_yn"/>
 <input type="hidden" name="rmk" 	value="" id="rmk"/>
 <input type="hidden" name="ca_reason_code" 	value="" id="ca_reason_code"/>
 <input type="hidden" name="doc_type" 	value="" id="doc_type"/>
 <input type="hidden" name="ord_tp_lvl2_cd" 	value="" id="ord_tp_lvl2_cd"/> 
 <input type="hidden" name="frt_doc_cnt" 			id="frt_doc_cnt" value="0" id="frt_doc_cnt"/>
 <input type="hidden" name="ex_in_cd" 	value="" id="ex_in_cd"/> 
	 
	 <div class="page_title_area clear">
		<!-- page_title(S) -->
		<h2 class="page_title">
			<button type="button"><%= LEV3_NM %></button>
		</h2>
		<!-- page_title(E) -->
		<!-- opus_design_btn(S) -->
		<div class="opus_design_btn">
			<button type="button" class="btn_accent" name="btn_copyFrom" id="btn_copyFrom" onClick="doWork('btn_copyFrom');"><bean:message key="Copy_From"/></button><!-- 
		 --><button type="button" class="btn_normal" name="btn_retrieve" id="btn_retrieve" onClick="doWork('btn_retrieve');"><bean:message key="Search"/></button><!-- 
		 --><button type="button" class="btn_normal" name="btn_save" id="btn_save" onClick="doWork('btn_save');"><bean:message key="Save"/></button><!-- 
	 	<div class="opus_design_btn">
			<!-- <a href="javascript:btn_Invoice();" name="link_invoice" id="link_invoice">Invoice</a>
			<a href="javascript:btn_Csr();" name="link_consultation" id="link_consultation">Consultation Slip</a>
			<a href="javascript:btn_Hst();" name="link_history" id="link_history">History</a> -->
			<button type="button" onClick="btn_Invoice();" name="link_invoice" id="link_invoice"><bean:message key="Invoice"/></button><!-- 
			 --><button type="button" onClick="btn_Csr();" name="link_consultation" id="link_consultation"><bean:message key="Consultation_Slip"/></button><!-- 
			 --><button type="button" onClick="btn_Hst();" name="link_history" id="link_history"><bean:message key="History"/></button><!-- 
		 --></div>
		<!-- opus_design_btn(E) -->
		<!-- page_location(S) -->
		<div class="location">
			<span><%= LEV1_NM %></span> &gt; <span><%= LEV2_NM %></span> &gt; <span><%= LEV3_NM %></span>
		</div>
		<!-- page_location(E) -->
	</div>
	
	<div class= "wrap_search">
		<div class="opus_design_inquiry entry_pannel ">		
			<table>
				<colgroup>
					<col width="50" />
					<col width="50" />
					<col width="*"/>
				</colgroup>
				<tr>
					<th><input type="radio" dataformat="engup" name="in_doc_cls_cd" id="radio1" value="W" checked /><!-- 
                            --><label for="radio1"><bean:message key="WO_No"/></label>
                           <input type="radio" dataformat="engup" name="in_doc_cls_cd" id="radio2" value="F" /><!-- 
                            --><label for="radio2"><bean:message key="FCR_No"/></label>
                           <input type="radio" dataformat="engup" name="in_doc_cls_cd" id="radio3" value="S" /><!-- 
                            --><label for="radio3"><bean:message key="Service_Order_No"/></label></th>
                    <td>
					    <input name="in_frt_doc_no" value="<%=in_frt_doc_no %>" type="text" class="L_input" id="in_frt_doc_no" dataformat="engup" otherchar= "-._ " style="width:130px;text-transform:uppercase;" OnKeyDown="if(event.keyCode==13){btn_Search();}" maxlength="20"/>
					</td>
					<th><bean:message key="Job_No"/></th>
					<td><input name="in_job_no" id="in_job_no" type="text" class="L_input" dataformat="engup" maxlength="20" style="width:180px;text-transform:uppercase;" /></td>
				</tr>
			</table>
			
			<div id="headLayer" style="height: 205px; margin-top: 10px;">
				<div class="layout_vertical_2" style="width: 30%;">
			        <!----- TB_input S ----->
                    <div class="TB_input" style="margin-bottom:0px;">
                        <table>
                            <tr>
                                <th style="width: 190px;"><a href="javascript:btn_link_ctrt();"><span style="text-align:left;width:125px;" class="point_B"><bean:message key="Contract_No1"/></span></a></th>
                                <td>
                                	<input name="ctrt_no" type="text" class="L_input_R" id="ctrt_no" style="width:70px;" readOnly/><!-- 
                                     --><input name="ctrt_nm" type="text" class="L_input_R" id="ctrt_nm" style="width:130px;" readOnly/>
                                </td>
                            </tr>
                            <tr>
                                <th style="width:125px;"><bean:message key="Sales_Office_PIC"/></th>
                                <td>
                                	<input name="sales_ofc_cd" type="text" class="L_input_R" id="sales_ofc_cd" style="width:70px;" readOnly/><!-- 
                                	 --><input name="sales_pic_nm" type="text" class="L_input_R" id="sales_pic_nm" style="width:130px;" readOnly/>
                                </td>
                            </tr>
                       	</table>
                        <!----- 점선라인 S ----->
                        <p class="line_bluedot" style="margin: 0px 10px;"></p>
                        <!-----// 점선라인 E ----->
                       	<table>    
                            <tr>
                                <th style="width: 190px;"><bean:message key="Main_SVC_Type"/></th>
                                <td><input name="pnl_svc_tp_nm" type="text" class="L_input_R" id="pnl_svc_tp_nm" style="width:204px;" readOnly/></td>
                            </tr>
                            <tr>
                                <th><bean:message key="Contract_Order_Type"/></th>
                                <td><input name="ctrt_ord_tp_nm" type="text" class="L_input_R" id="ctrt_ord_tp_nm" style="width:204px;" readOnly/></td>
                            </tr>
                            <tr>
	                            <th><bean:message key="Job_Closing_Date"/></th>
								<td>
								    <input name="loc_job_close_dt" type="text" class="L_input_R" id="loc_job_close_dt" dataformat="ymd" style="width:60px;" maxlength="10" tabindex="-1" readonly /><!-- 
		                             --><input name="loc_job_close_dt_hm" type="text" class="L_input_R" id="loc_job_close_dt_hm" dataformat="hm" style="width:40px;" maxlength="5" tabindex="-1" readonly /><!-- 
		                             --><input name="loc_job_flg_nm" type="text" class="L_input_R" id="loc_job_flg_nm" dataformat="engup" maxlength="50" style="width:96px;" tabindex="-1" readonly />
								</td>
							</tr>	
							<tr>
							    <th><bean:message key="Freight_Closing_Date"/></th>
								<td><input name="frt_closing_dt" type="text" class="L_input_R" id="frt_closing_dt" style="width:110px;" maxlength="20" tabindex="-1" readonly /><!-- 
		                             --><input name="frt_closing_flg_nm" type="text" class="L_input_R" id="frt_closing_flg_nm" dataformat="engup" maxlength="50" style="width:90px;" tabindex="-1" readonly />
								</td>
							</tr>
							<tr>
							    <th><a href="javascript:btn_link_ca();"><bean:message key="CA_NO"/></a>
							    <button type="button" id="btn_ca_history" class="btn_etc" onClick="btn_ca_history();" ><bean:message key="Reason_History"/></button></th>
							    <td><input name="ca_no" type="text" class="L_input_R" id="ca_no" style="width:110px;" maxlength="20" tabindex="-1" readonly /><!-- 
		                             --><input name="ca_status_nm" type="text" class="L_input_R" id="ca_status_nm" dataformat="engup" maxlength="50" style="width:90px;" tabindex="-1" readonly />
								</td>
							</tr>
                        </table>
                    </div>
                    <!-----// TB_input E ----->
			    </div>
			    <div class="layout_vertical_2" style="width: 67%;">
			        <script type="text/javascript">comSheetObject('sheet1');</script>
			    </div>
			</div>
			
			<div class="Btn_C" style="text-align: center;">
				<img src="<%=CLT_PATH%>/web/img/main/icon_show.gif" style="cursor:hand;display:none;" id="show" onClick="btn_show('O')">
				<img src="<%=CLT_PATH%>/web/img/main/icon_hide.gif" style="cursor:hand" id="hide" onClick="btn_show('H')">
				<!--  
				<a class="Btn_In" href="javascript:btn_show('O');"><span>Show</span></a>
				<a class="Btn_In" href="javascript:btn_show('H');"><span>Hide</span></a>
				-->
			</div>
			
			<!----- Divide S ----->
            <div style="margin-top: 15px; height: 132px;">
				<div class="layout_vertical_2" style="width: 30%;">
                	<!----- TB_input S ----->
                    <div class="TB_input">
                        <table>
                            <tr>
                                <th style="width:160px;"><bean:message key="Shipper"/></th>
                                <td>
                                	<input name="ship_cd" type="text" class="L_input_R" id="ship_cd" style="width:80px;" readOnly/><!-- 
                                	 --><input name="ship_nm" type="text" class="L_input_R" id="ship_nm" style="width:150px;" readOnly/>
                                </td>
                            </tr>
                            <tr>
                                <th><bean:message key="Consignee"/></th>
                                <td>
                                	<input name="cne_cd" type="text" class="L_input_R" id="cne_cd" style="width:80px;" readOnly/><!-- 
                                	 --><input name="cne_nm" type="text" class="L_input_R" id="cne_nm" style="width:150px;" readOnly/>
                                </td>
                            </tr>
                        </table>
                        <!----- 점선라인 S ----->
                        <p class="line_bluedot" style="margin: 0px 10px;"></p>
                        <!-----// 점선라인 E ----->
                        <table>    
                            <tr>
                                <th style="width:160px;"><bean:message key="W_O_Customer"/></th>
                                <td>
                                	<input name="wo_cust_cd" type="text" class="L_input_R" id="wo_cust_cd" style="width:80px;" readOnly/><!-- 
                                	 --><input name="wo_cust_nm" type="text" class="L_input_R" id="wo_cust_nm" style="width:150px;" readOnly/>
                                </td>
                            </tr>
                            <tr>
                                <th><bean:message key="Service_Provider"/></th>
                                <td>
                                	<input name="sprov_cd" type="text" class="L_input_R" id="sprov_cd" style="width:80px;" readOnly/><!-- 
                                	 --><input name="sprov_nm" type="text" class="L_input_R" id="sprov_nm" style="width:150px;" readOnly/>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <!-----// TB_input E ----->
                </div>
				<div class="layout_vertical_2" style="width: 67%;">
	                <!----- TB_input S ----->
                    <div class="TB_input">
                        <table>
                            <tr>
                                <th style="width: 90px;"><bean:message key="Item_QTY"/></th>
                                <td style="width: 100px;"><input name="tot_qty" type="text" class="L_input_R" id="tot_qty" style="width: 100px;text-align:right" readOnly/></td>
                                <th style="width: 90px;"><bean:message key="PKG_Unit"/></th>
                                <td style="width: 160px;">
                                	<input name="tot_pkgqty" type="text" class="L_input_R" id="tot_pkgqty" style="width:100px;text-align:right" readOnly/><!-- 
                                	 --><input name="tot_pkgunit" type="text" class="L_input_R" id="tot_pkgunit" style="width:50px;" readOnly/>
                                </td>
                                <th style="width: 112px;"><bean:message key="Container"/></th>
                                <td colspan="5">
	                                <input name="cntr_type1" type="text" class="L_input_R" id="cntr_type1" style="width:40px;" readOnly/><!-- 
                                	 --><input name="cntr_type2" type="text" class="L_input_R" id="cntr_type2" style="width:40px;" readOnly/><!-- 
                                	 --><input name="cntr_type3" type="text" class="L_input_R" id="cntr_type3" style="width:40px;" readOnly/><!-- 
                                	 --><input name="cntr_type4" type="text" class="L_input_R" id="cntr_type4" style="width:40px;" readOnly/><!-- 
                                	 --><input name="cntr_type5" type="text" class="L_input_R" id="cntr_type5" style="width:40px;" readOnly/>
	                            </td>
                            </tr>
                            <tr>
                                <th><bean:message key="CBM"/></th>
                                <td><input name="tot_cbm" type="text" class="L_input_R" id="tot_cbm" style="width:100px;text-align:right" readOnly/></td>
                                <th><bean:message key="KGS"/></th>
                                <td><input name="tot_kgs" type="text" class="L_input_R" id="tot_kgs" style="width:100px;text-align:right" readOnly/></td>
                                <th><bean:message key="Type_QTY"/></th>
                                <td colspan="5">
	                                <input name="cntr_cnt1" type="text" class="L_input_R" id="cntr_cnt1" style="width:40px;text-align:right" readOnly/><!-- 
                                	 --><input name="cntr_cnt2" type="text" class="L_input_R" id="cntr_cnt2" style="width:40px;text-align:right" readOnly/><!-- 
                                	 --><input name="cntr_cnt3" type="text" class="L_input_R" id="cntr_cnt3" style="width:40px;text-align:right" readOnly/><!-- 
                                	 --><input name="cntr_cnt4" type="text" class="L_input_R" id="cntr_cnt4" style="width:40px;text-align:right" readOnly/><!-- 
                                	 --><input name="cntr_cnt5" type="text" class="L_input_R" id="cntr_cnt5" style="width:40px;text-align:right" readOnly/>
	                            </td>
                            </tr>
                        </table>
                        <!----- 점선라인 S ----->
                        <p class="line_bluedot" style="margin: 0px 10px;">
                        <!-----// 점선라인 E ----->
                        <table>
                            <!-- <colgroup>
                                <col width="13%" />
                            	<col width="16%" />
                                <col width="13%" />
                            	<col width="16%" />
                                <col width="18%" />
                                <col width="" />
                            </colgroup> -->
                            <tr>
                            	<th style="width: 90px;"><bean:message key="ETD"/></th>
                                <td style="width: 100px;"><input name="etd" type="text" class="L_input_R" id="etd" style="width:100px;" readOnly/></td>
                                <th style="width: 90px;"><bean:message key="ETA"/></th>
                                <td style="width: 163px;"><input name="eta" type="text" class="L_input_R" id="eta" style="width:100px;" readOnly/></td>
                                <th style="width: 110px;"><bean:message key="Performance_Date"/></th>
                                <td><input name="est_cmpl_dt" type="text" class="L_input_R" id="est_cmpl_dt" style="width:100px;" readOnly/></td>                                
                            </tr>
                            <tr>
                            	<th><bean:message key="Update_Date"/></th>
                                <td><input name="upd_dt" type="text" class="L_input_R" id="upd_dt" style="width:100px;" readOnly/></td>
                                <th><bean:message key="Update_User"/></th>
                                <td><input name="upd_user_nm" type="text" class="L_input_R" id="upd_user_nm" style="width:100px;" readOnly/></td>
                                <th><bean:message key="Update_Office"/></th>
                                <td><input name="upd_org_nm" type="text" class="L_input_R" id="upd_org_nm" style="width:100px;" readOnly/></td>                                
                            </tr>
                        </table>    
                    </div>
                    <!-----// TB_input E ----->
                </div>
            </div>
            <!-----// Divide E ----->
		</div>
	</div>
	<div class="wrap_result_tab">
		<ul id="ulTab" class="opus_design_tab">
			<li id=Tab01 class="nowTab"><a href="javascript:void();" onClick="goTabSelect('01')" style="cursor:hand;" ><span><bean:message key="Selling"/></span></a></li>
	        <li id=Tab02><a href="javascript:void();" onClick="goTabSelect('02')" style="cursor:hand;" ><span><bean:message key="Buying"/></span></a></li>
			<button type="button" id="btn_indirectCost" name="btn_indirectCost" onClick="doWork('btn_indirectCost');" class="btn_etc" style="float: right;text-align: center;height: 23px;"><bean:message key="Indirect_Buying"/></button>
		</ul>
		<div id="tabLayer" name="tabLayer" style="display:inline">  
			<div class= "opus_design_inquiry">
				<table>
                    <tr>
                    	<th style="width: 90px; padding:0px"><bean:message key="Ex_Rate_Date"/></th>
                        <td style="padding:0px; width: 130px;">
                            <input name="sell_exrate_dt" type="text" class="input1" id="sell_exrate_dt" dataformat="ymd" style="width:90px;" maxlength="10" OnBeforeDeactivate="ComAddSeparator(this);getExrateDtInfo('S');" OnBeforeActivate="ComClearSeparator(this);getExrateDtInfo('S');" onblur="chkCmprPrd(firCalFlag, false, this, this, this);firCalFlag=false;" onclick = "OmsFunFocusDel(this)" /><!-- 
                        	 --><button type="button" class="calendar ir" name="btn_sell_exrate_dt" onClick="doWork('btn_sell_exrate_dt');"></button>
                        </td>
                        <th style="padding:0px; width: 80px;"><bean:message key="Ex_Class"/></th>
                        <td style="padding:0px 0px 0px 5px">
                        	<bean:define id="MsList" name="cdMap" property="sell_exrate_cls_cd"/>
							<select name="sell_exrate_cls_cd" id="sell_exrate_cls_cd" style="width:100px">
								<logic:iterate id="codeVO" name="MsList">
								<option value='<bean:write name="codeVO" property="code"/>'><bean:write name="codeVO" property="name"/></option>
								</logic:iterate>
							</select>
						</td>
                        <th width: 90px;"><bean:message key="Foreign_Curr"/></th>
                        <td><input name="sell_curr_cd" type="text" class="input1" id="sell_curr_cd" style="width:40px;text-transform:uppercase;" dataformat="engup"  maxlength="3"  /><!-- 
                             --><button type="button" class="input_seach_btn" name="btn_sell_curr_cd" onClick="doWork('btn_sell_curr_cd');"></button>
                        </td>
                        <th><bean:message key="ExRate"/></th>
                        <td style="padding:0px 0px 0px 0px"><input name="sell_exrate" type="text" class="input1" id="sell_exrate" style="width:85px;text-align:right;" dataformat="float" maxlength="15" /></td>
                        <th>1 USD=</th>
                        <td style="padding:0px 0px 0px 0px">
                            <input name="sell_usd_conv_rate" type="text" class="L_input_R" id="sell_usd_conv_rate" style="width:85px;text-align:right;" dataformat="float" readOnly/><!-- 
                             --><input name="sell_loc_curr_cd" type="text" class="L_input_R" id="sell_loc_curr_cd" value="<%=text%>" style="width:34px;" readOnly/>
                        </td>
                        <td style="text-align: right">
                        	<button type="button" class="btn_etc" onClick="re_apply('S');"><bean:message key="Re_Apply"/></button><!-- 
			            	 --><button type="button" class="btn_etc" onClick="internal_apply('S');"><bean:message key="Internal"/></button><!-- 
			            	 --><button type="button" class="btn_etc" onClick="routeRate('S');" id="btn_routeRate"><bean:message key="Route_Rate"/></button>
			            </td>   
                    </tr>
                </table>
			</div>
			
			<div class= "opus_design_grid clear">
				<table style="width: 90%; float: left;">
                    <tr>
                        <td>
							<select name="sell_cust" id="sell_cust" style="width:100px" onChange="sell_cust_OnChange()">
							</select>
						</td>
                        <td><button type="button" class="btn_etc" onClick="btn_Excel_sell();" ><bean:message key="Excel"/></button></td>
                     	<th><bean:message key="Sub_TTL"/></th>
                     	<td><input name="sum_tot_amt_sell" type="text" class="L_input_R" id="sum_tot_amt_sell" style="width:95px;text-align:right;" dataformat="float" readOnly /></td>
                        <th><bean:message key="VAT_Local"/></th>
                        <td><input name="sum_vat_amt_sell" type="text" class="L_input_R" id="sum_vat_amt_sell" style="width:95px;text-align:right;" dataformat="float" readOnly/></td>
                        <th><bean:message key="Net_AMT_Local"/></th>
                        <td><input name="sum_loc_amt_sell" type="text" class="L_input_R" id="sum_loc_amt_sell" style="width:95px;text-align:right;" dataformat="float" readOnly /></td>
                        <th><bean:message key="USD_AMT_Monthly"/></th>
                        <td><input name="sum_inv_acct_sell" type="text" class="L_input_R" id="sum_inv_acct_sell" style="width:95px;text-align:right;" dataformat="float" readOnly /></td>
                    </tr>
                </table>
				<div class="opus_design_btn">
					<button type="button" class="btn_normal" onClick="row_sell_add();"><bean:message key="Add"/></button><!-- 
				 --><button type="button" class="btn_normal" onClick="row_sell_del();"><bean:message key="Del"/></button>
                </div> 
                <script type="text/javascript">comSheetObject('sheet2');</script>
			</div>
		</div>
		
		<div id="tabLayer" name="tabLayer" style="display:none">  
			<div class= "opus_design_inquiry">
				<table>
                    <tr>
                    	<th style="width: 90px; padding:0px"><bean:message key="Ex_Rate_Date"/></th>
                        <td style="padding:0px; width: 130px;">
                            <input name="buy_exrate_dt" type="text" class="input1" id="buy_exrate_dt" dataformat="ymd" style="width:90px;" maxlength="10" OnBeforeDeactivate="ComAddSeparator(this);getExrateDtInfo('B');" OnBeforeActivate="ComClearSeparator(this);getExrateDtInfo('B');" onblur="chkCmprPrd(firCalFlag, false, this, this, this);firCalFlag=false;" onclick = "OmsFunFocusDel(this)"/><!-- 
                        	 --><button type="button" class="calendar ir" name="btn_buy_exrate_dt" onClick="doWork('btn_buy_exrate_dt');"></button>
                        </td>
                        <th style="padding:0px; width: 80px;"><bean:message key="Ex_Class"/></th>
                        <td style="padding:0px 0px 0px 5px">
                        	<bean:define id="MsList" name="cdMap" property="buy_exrate_cls_cd"/>
							<select name="buy_exrate_cls_cd" id="buy_exrate_cls_cd" style="width:100px">
								<logic:iterate id="codeVO" name="MsList">
								<option value='<bean:write name="codeVO" property="code"/>'><bean:write name="codeVO" property="name"/></option>
								</logic:iterate>
							</select>
                        </td>
                        <th width: 90px;"><bean:message key="Foreign_Curr"/></th>
                        <td style="padding:0px 0px 0px 0px">
                            <input name="buy_curr_cd" type="text" class="input1" id="buy_curr_cd" style="width:40px;text-transform:uppercase;" dataformat="engup"  maxlength="3" /><!-- 
                             --><button type="button" class="input_seach_btn" name="btn_buy_curr_cd" onClick="doWork('btn_buy_curr_cd');"></button>
                        </td>
                        <th><bean:message key="ExRate"/></th>
                        <td><input name="buy_exrate" type="text" class="L_input" id="buy_exrate" style="width:85px;text-align:right;" dataformat="float" maxlength="15" /></td>
                        <th>1 USD=</th>
                        <td style="padding:0px 0px 0px 0px">
                            <input name="buy_usd_conv_rate" type="text" class="L_input_R" id="buy_usd_conv_rate" style="width:85px;text-align:right;" dataformat="float" readOnly/><!-- 
                             --><input name="buy_loc_curr_cd" type="text" class="L_input_R" id="buy_loc_curr_cd" value="<%=text%>" style="width:34px;" readOnly/>
                        </td>
                        <td style="text-align: right">
                        	<button type="button" class="btn_etc" onClick="re_apply('B');"><bean:message key="Re_Apply"/></button><!-- 
			            	 --><button type="button" class="btn_etc" onClick="internal_apply('B');"><bean:message key="Internal"/></button><!-- 
			            	 --><button type="button" class="btn_etc" onClick="routeRate('B');" id="btn_routeRate_buy"><bean:message key="Route_Rate"/></button>
			            </td>   
                    </tr>
                </table>
			</div>
			
			<div class= "opus_design_grid clear">
				<table style="width: 90%; float: left;">
                    <tr>
                        <td>
							<select name="buy_cust" id="buy_cust" style="width:100px" onChange="buy_cust_OnChange()">
							</select>
                        </td>
                        <td><button type="button" class="btn_etc" onClick="btn_Excel_buy();" ><bean:message key="Excel"/></button></td>
                    	<th><bean:message key="Sub_TTL"/></th>
                        <td><input name="sum_tot_amt_buy" type="text" class="L_input_R" id="sum_tot_amt_buy" style="width:95px;text-align:right;" dataformat="float" readOnly /></td>
                        <th><bean:message key="VAT_Local"/></th>
                        <td><input name="sum_vat_amt_buy" type="text" class="L_input_R" id="sum_vat_amt_buy" style="width:95px;text-align:right;" dataformat="float" readOnly/></td>
                        <th><bean:message key="Net_AMT_Local"/></th>
                        <td><input name="sum_loc_amt_buy" type="text" class="L_input_R" id="sum_loc_amt_buy" style="width:95px;text-align:right;" dataformat="float" readOnly /></td>
                        <th><bean:message key="USD_AMT_Monthly"/></th>
                        <td><input name="sum_inv_acct_buy" type="text" class="L_input_R" id="sum_inv_acct_buy" style="width:95px;text-align:right;" dataformat="float" readOnly /></td>
                    </tr>
                </table>
				<div class="opus_design_btn">
					<button type="button" class="btn_normal" onClick="row_buy_add();"><bean:message key="Add"/></button><!-- 
				 --><button type="button" class="btn_normal" onClick="row_buy_del();"><bean:message key="Del"/></button>
                </div>
                <script type="text/javascript">comSheetObject('sheet3');</script>
			</div>
		</div>
	</div>
</form>

<form name="form1">
<input type="hidden" name="downloadLocation" />
<input type="hidden" name="downloadFileName" />

</form>

<iframe name="ifra_hidden" style="width:0;height:0;visibility:hidden" border=0></iframe>
