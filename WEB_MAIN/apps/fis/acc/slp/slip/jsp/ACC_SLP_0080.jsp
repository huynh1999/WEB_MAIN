<%
/*=========================================================
 *Copyright(c) 2014 CyberLogitec
 *@FileName : ACC_SLP_0080.jsp
 *@FileTitle : Accounting Block Maintenance
 *@author     : CLT
 *@version    : 1.0
 *@since      : 2014/06/17
 =========================================================*/
%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	    <title><bean:message key="system.title"/></title>
	    
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoFormControl.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/ACC_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="./apps/fis/acc/slp/slip/script/ACC_SLP_0080.js?ver=<%=CLT_JS_VER%>"></script>
	
	<bean:define id="valMap"   name="EventResponse" property="mapVal"/>
	<bean:define id="ofcInfo"  name="valMap" property="ofcInfo"/>
	
<%
	String ofcCd = userInfo.getOfc_cd();
%>
	
<script>	
function setupPage(){
	loadPage();
}

$(document).ready(function(){			
	frm1.s_ofc_cd.focus();
});
</script>	
<form name="frm1" method="POST" action="./">
<input type="hidden" name="f_cmd" id="f_cmd" />
<!-- Report Value -->
<input type="hidden" name="cmd_type" id="cmd_type" />
<input type="hidden" name="search_opt" value="" id="search_opt" />
<input type="hidden" name="s_block_satus" value="" id="s_block_satus" />
<input type="hidden" name="s_bl_flg" value="" id="s_bl_flg" />
<input type="hidden" name="s_bl_oth_flg" value="" id="s_bl_oth_flg" />
<input type="hidden" name="s_in_flg" value="" id="s_in_flg" />
<input type="hidden" name="s_in_ga_flg" value="" id="s_in_ga_flg" />
<input type="hidden" name="s_dp_flg" value="" id="s_dp_flg" />
<input type="hidden" name="f_ofc_cd" value="<%= userInfo.getOfc_cd()%>" id="f_ofc_cd"/>
<!-- page_title_area(S) -->
<div class="page_title_area clear">
	<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
   <!-- btn_div -->
   <div class="opus_design_btn TOP">
   	   <%-- 
	   <button id="btnPrint" type="button" style="display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>" class="btn_accent" onclick="doWork('SEARCHLIST')"><bean:message key="Search"/></button> 
	   <button type="button" style="display:none;" btnAuth="<%= roleBtnVO.getAttr3() %>" class="btn_normal" onclick="doWork('SAVE')"><bean:message key="Save"/></button>
	   --%>
   </div>
   <!-- btn_div -->
   <div class="location">
	   <span><%=LEV1_NM%></span> &gt;
	   <span><%=LEV2_NM%></span> &gt;
	   <span><%=LEV3_NM%></span>
	   <a href="" class="ir">URL Copy</a>
   </div>
</div>
<!-- page_title_area(E) -->
<!-- wrap_search(S) -->
<div class="over_wrap" height="100%">
<div class="wrap_search">
<!-- opus_design_inquiry(S) -->
<div class="opus_design_inquiry entry_pannel ">
	<table>
		<tbody>
			<colgroup>
				<col width="5" />
				<col width="50" />
				<col width="70" />
				<col width="50" />
				<col width="*" />
			</colgroup>
			<tr>
				<td></td>
				<td><input type="radio" name="s_search_opt" id="s_opt_dtl" value="bl" checked onClick="search_opt_sheet()"><label for="s_opt_dtl"><bean:message key="File"/></label></td>
               	<td><input type="radio" name="s_search_opt" id="s_opt_dt2" value="in" onClick="search_opt_sheet()"><label for="s_opt_dt2"><bean:message key="Invoice"/></label></td>
                <td><input type="radio" name="s_search_opt" id="s_opt_dt3" value="dp" onClick="search_opt_sheet()"><label for="s_opt_dt3"><bean:message key="Deposit"/>/<bean:message key="Payment"/></label></td>
                <td><input type="radio" name="s_search_opt" id="s_opt_dt4" value="sl" onClick="search_opt_sheet()"><label for="s_opt_dt4"><bean:message key="General_Journal"/></label></td>
				<td></td>
			</tr>
		</tbody>
	</table>
	<table>
		<tbody>
			<colgroup>
				<col width="45" />
				<col width="170" /> <!-- OFVFOUR-7988 [Fin Whale] Block Management - Adding Invoice Date Range Option -->
				<col width="70" />
				<col width="70" />
				<col width="70" />
				<col width="*" />
			</colgroup>
			<tr>
				<th><bean:message key="Branch"/></th>
                <td>
               	<bean:define id="oficeList" name="valMap" property="ofcList"/>
	                <select name="s_ofc_cd" id="s_ofc_cd" style="width:140px">
							<bean:size id="len" name="oficeList" />
	                        <logic:greaterThan name="len" value="1">
	                        	<option value=''>ALL</option>
	                        </logic:greaterThan>
	             			<logic:iterate id="ofcVO" name="oficeList">
	                     		<logic:equal name="ofcVO" property="ofc_cd" value="<%= userInfo.getOfc_cd()%>" >
	                            <option selected="selected"  value='<bean:write name="ofcVO" property="ofc_cd"/>'><bean:write name="ofcVO" property="ofc_cd"/></option>
	                         	</logic:equal>
	                         	<logic:notEqual name="ofcVO" property="ofc_cd" value="<%= userInfo.getOfc_cd()%>" >
	                            <option value='<bean:write name="ofcVO" property="ofc_cd"/>'><bean:write name="ofcVO" property="ofc_cd"/></option>
	                         	</logic:notEqual>
	             			</logic:iterate>
	                 </select>
                </td>
                <th>
				<!-- OFVFOUR-7988 [Fin Whale] Block Management - Adding Invoice Date Range Option -->
                <select name="s_dt_cd_type" style="width:135px">
                	<option value='post_dt'><bean:message key="Post_Date"/></option>
                	<option value='inv_dt'><bean:message key="Invoice_Date"/></option>
                	<option value='deposit_dt'><bean:message key="Deposit_Clear_Date"/></option>
                </select>
                </th>
	            <td>
					<input type="text" name="s_prd_strdt" required onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, this, frm1.s_prd_enddt);firCalFlag=false;" style="width:70px"  size='11' maxlength="10" class="search_form"><!-- 
				--><span class="dash">~</span><!-- 
				--><input type="text" name="s_prd_enddt" required onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, frm1.s_prd_strdt, this);firCalFlag=false;" style="width:70px" size='11' maxlength="10" class="search_form"><!-- 
				--><button type="button" onclick="doDisplay('DATE11', frm1);" id="s_prd_dt_cal" name="s_prd_dt_cal" class="calendar" tabindex="-1"></button>
				</td> 
				<th><bean:message key="Block"/></th>
                <td>
                	<bean:define id="ynLst" name="valMap" property="yesNoCdList"/>
                    <select name="s_block_yn" style="width:60px" required>
             			<logic:iterate id="lstVO" name="ynLst">
                     		<option value='<bean:write name="lstVO" property="cd_val"/>'><bean:write name="lstVO" property="cd_nm"/></option>
             			</logic:iterate>
                 </select>
                </td> 
			</tr>
		</tbody>
	</table>
	<table id="searchInfo1">
		<tbody>
			<colgroup>
				<col width="5" />
				<col width="100" />
				<col width="100" />
				<col width="70" />
				<col width="70" />
				<col width="70" />
				<col width="70" />
				<col width="*" />
			</colgroup>
			<tr>
				<td></td>
               	<td><input name="s_bl_oe_flg" id="s_bl_oe_flg" type="checkbox" checked ><label for="s_bl_oe_flg"><bean:message key="Ocean_Export"/></label></td>        	
               	<td><input name="s_bl_oi_flg" id="s_bl_oi_flg" type="checkbox" checked><label for="s_bl_oi_flg"><bean:message key="Ocean_Import"/></label></td>
               	<td></td>
                <th><bean:message key="Ref_No"/></th>
	            <td>
	            	<input name="s_ref_no" type="text" value="" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:150px;" maxlength="20" class="search_form">
	            </td>        
	            <th><bean:message key="MBL_No"/></th>
	            <td>
	            	<input name="s_bl_no" type="text" value="" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:150px;" maxlength="20" class="search_form">
	            </td> 
   			</tr>
   			<tr>	
   				<td></td>		
				<td><input name="s_bl_ae_flg" id="s_bl_ae_flg" type="checkbox" checked><label for="s_bl_ae_flg"><bean:message key="Air_Export"/></label></td>	
               	<td><input name="s_bl_ai_flg" id="s_bl_ai_flg" type="checkbox" checked><label for="s_bl_ai_flg"><bean:message key="Air_Import"/></label></td>
               	<td><input name="s_bl_ot_flg" id="s_bl_ot_flg" type="checkbox" checked><label for="s_bl_ot_flg"><bean:message key="Other"/></label></td>
   			</tr>
		</tbody>
	</table>
	<table style="display:none" id="searchInfo2">
		<tbody>
			<colgroup>
				<col width="5">
				<col width="50">
				<col width="50">
				<col width="80">
				<col width="80">
				<col width="70">
				<col width="70">
				<col width="70">
				<col width="70">
				<col width="*">
			</colgroup>
			<tr>
				<td></td>
               	<td><input name="s_inv_ar_flg" id="s_inv_ar_flg" type="checkbox" checked ><label for="s_inv_ar_flg"><bean:message key="AR"/></label></td>
               	<td><input name="s_inv_dc_flg" id="s_inv_dc_flg" type="checkbox" checked><label for="s_inv_dc_flg"><bean:message key="DC"/></label></td>
                <td><input name="s_inv_ap_flg" id="s_inv_ap_flg" type="checkbox" checked><label for="s_inv_ap_flg"><bean:message key="AP_Cost"/></label></td>
                <td><input name="s_inv_ar_ga_flg" id="s_inv_ar_ga_flg" type="checkbox" checked><label for="s_inv_ar_ga_flg"><bean:message key="AR_GnA"/></label></td>
                <td><input name="s_inv_ap_ga_flg" id="s_inv_ap_ga_flg" type="checkbox" checked><label for="s_inv_ap_ga_flg"><bean:message key="AP_GnA"/></label></td>
                <th><bean:message key="Inv_No"/></th>
	            <td>
	           		<input type="text" name="s_inv_no"  maxlength="50" value="" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:150;text-transform:uppercase;" onBlur="strToUpper(this);"></td>        
	            <th><bean:message key="Bill_To_Pay_To"/></th>
	            <td>
		            <input type="text" name="s_inv_bill_to_cd" maxlength="20" value="" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px" onKeyDown="codeNameAction('BILLTO',this, 'onKeyDown')" onBlur="codeNameAction('BILLTO',this, 'onBlur')" class="search_form"><!-- 
				--><button type="button" name="billto" id="billto"  class="input_seach_btn" tabindex="-1" onClick="doWork('CUSTOMER_POPLIST')"></button><!-- 
				--><input type="text" name="s_inv_bill_to_nm" maxlength="50" value="" onKeyDown="custEnterAction(this,'CUSTOMER')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:140px" class="search_form">
                </td>
     		</tr>
     		<tr>
     			<td colspan="6"></td>
                <th><bean:message key="Ref_No"/></th>
	            <td>
	            	<input name="s_inv_ref_no" type="text" value="" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:150px;" maxlength="20" class="search_form">
	            </td>        
	            <th><bean:message key="BL_No"/></th>
	            <td>
	            	<input name="s_inv_bl_no" type="text" value="" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:150px;" maxlength="20" class="search_form">
	            </td> 
     		</tr>
		</tbody>
	</table>
	<table style="display:none" id="searchInfo3">
		<tbody>
			<colgroup>
				<col width="5" />
				<col width="50" />
				<col width="70" />
				<col width="70" />
				<col width="70" />
				<col width="70" />
				<col width="70" />
				<col width="70" />
				<col width="*" />
			</colgroup>
			<tr>       
				<td></td> 
               	<td><input name="s_deposit_flg" id="s_deposit_flg" type="checkbox" checked ><label for="s_deposit_flg"><bean:message key="Deposit"/></label></td>
               	<td><input name="s_payment_flg" id="s_payment_flg" type="checkbox" checked><label for="s_payment_flg"><bean:message key="Payment"/></label></td>
                <th><bean:message key="Bank"/></th>
                <td>
                       <select name="s_bank_cd" style="width:180px;">
                       	<option value="">ALL</option>
                      		<bean:define id="paramBankList"  name="valMap" property="bankList"/>
							<logic:iterate id="BankVO" name="paramBankList">
                      			<option value='<bean:write name="BankVO" property="bank_seq"/>'><bean:write name="BankVO" property="bank_nm"/></option>
                      		</logic:iterate>
                      	</select>
                </td>
                <th><bean:message key="Check_No"/></th>
	            <td>
	           		<input type="text" name="s_chk_no"  maxlength="20" value="" dataformat="excepthan" style="ime-mode:disabled;width:150px;text-transform:uppercase;" onBlur="strToUpper(this);" class="search_form" >      
	            <th><bean:message key="Received_From_Pay_To"/></th>
	            <td>
		            <input type="text" name="s_rcvd_fm_cd" maxlength="20" value="" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px" onKeyDown="codeNameAction('RCVDFM',this, 'onKeyDown')" onBlur="codeNameAction('RCVDFM',this, 'onBlur')" class="search_form"><!-- 
				--><button type="button" name="rcvdfm" id="rcvdfm"  class="input_seach_btn" tabindex="-1" onClick="doWork('CUSTOMER_POPLIST2')"></button><!-- 
				--><input type="text" name="s_rcvd_fm_nm" maxlength="100" value="" onKeyDown="custEnterAction(this,'CUSTOMER2')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:140px" class="search_form">
                </td>           
	        </tr>
		</tbody>
	</table>
</div>
<!-- opus_design_inquiry(E) -->
</div>
<!-- wrap_search(E) -->

<!-- wrap_result(S) -->
<div class="wrap_result">
<!-- opus_design_grid(S) -->
<div class="opus_design_grid" style="display:block" id="mainTable">
	<script type="text/javascript">comSheetObject('sheet1');</script>
</div>
<!-- opus_design_grid(E) -->
<!-- opus_design_grid(S) -->
<div class="opus_design_grid" style="display:none" id="mainTable2">
	<script type="text/javascript">comSheetObject('sheet2');</script>
</div>
<!-- opus_design_grid(E) -->
<!-- opus_design_grid(S) -->
<div class="opus_design_grid" style="display:none" id="mainTable3">
	<script type="text/javascript">comSheetObject('sheet3');</script>
</div>
<div class="opus_design_grid" style="display:none" id="mainTable4">
	<script type="text/javascript">comSheetObject('sheet4');</script>
</div>
<!-- opus_design_grid(E) -->
</div>
<!-- wrap_result(E) -->	
</div>
</form>

<script type="text/javascript">
	var attr_extension = "<%= null!=roleBtnVO ?roleBtnVO.getAttr_extension():"" %>";
	doBtnAuthority(attr_extension);
	</script>


