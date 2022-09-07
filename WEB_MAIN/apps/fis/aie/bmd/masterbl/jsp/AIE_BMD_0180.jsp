<%
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : 
*@FileTitle  : 
*@author     : CLT
*@version    : 1.0
*@since      : 2014/07/25
=========================================================*/
%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
    <title><bean:message key="system.title"/></title>

	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/AIR_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="./apps/fis/aie/bmd/masterbl/script/AIE_BMD_0180.js?ver=<%=CLT_JS_VER%>"></script>

	<script type="text/javascript">
		var ofcCd = "<%= userInfo.getOfc_cd() %>";
		var userNm = "<%= userInfo.getUser_name() %>";
		var userTel = "<%= userInfo.getPhn() %>";
		var userFax = "<%= userInfo.getFax() %>";
		var eml     = "<%= userInfo.getEml() %>";
		
		function setupPage(){
			loadPage();
	    }
	</script> 


<form name="frm1" method="POST" action="./">
	<input id="f_cmd" name="f_cmd" type="hidden" />
	<!-- Report Value -->
	<input id="cmd_type" name="cmd_type" type="hidden" />
	<input id="title" name="title" type="hidden" />
	<input id="file_name" name="file_name" type="hidden" />
	<input id="rd_param" name="rd_param" type="hidden" />

	<input id="mailTitle" name="mailTitle" value="" type="hidden" />
	<input id="mailTo" name="mailTo" value="" type="hidden" />

	<input id="master_bl_no" name="master_bl_no" type="hidden" />
	<input id="s_intg_bl_seq" name="s_intg_bl_seq" type="hidden" />
	
<!-- page_title_area(S) -->
	<div class="page_title_area">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn TOP">
		   <%-- <button type="button" class="btn_accent"  onclick="doWork('Print')"><bean:message key="Print"/></button> --%>
	   </div>
	   <!-- btn_div -->
	   <div class="location">
		   <span><%=LEV1_NM%></span> &gt;
		   <span><%=LEV2_NM%></span> &gt;
		   <span><%=LEV3_NM%></span>
		   <a href="" class="ir">URL Copy</a>
	   </div>
	</div>
	
<div class="over_wrap" height="100%">
	<div class="wrap_search">	
		<div class="opus_design_inquiry ">
			<table>
					<colgroup>
						<col width="80">
						<col width="150">
						<col width="100">
						<col width="*">
					</colgroup>
					<tbody>
						<tr>
							<th><bean:message key="MAWB_No"></bean:message></th>
							<td><input id="s_mbl_no" name="s_mbl_no" maxlength="40" value="" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:130px;text-transform:uppercase;" onblur="strToUpper(this);" onkeypress="if(event.keyCode==13){doPop('MBL_POPLIST',this);}" type="text" /><!--
							--><button type="button" class="input_seach_btn" tabindex="-1" onClick="doPop('MBL_POPLIST',this)"></button></td>
							<th><bean:message key="Ref_No"></bean:message></th>
							<td><input id="s_ref_no" name="s_ref_no" maxlength="20" value="" class="search_form" style="width:130px;" onblur="strToUpper(this)" onkeypress="if(event.keyCode==13){doPop('REF_POPLIST',this);}" type="text" /><!-- 
							--><button type="button" class="input_seach_btn" tabindex="-1" onClick="doPop('REF_POPLIST',this)"></button></td>
						</tr>
					</tbody>
			</table>
		</div>
	</div>
	<div class="wrap_result">
		<div class="opus_design_inquiry ">
			<table>
					<colgroup>
						<col width="*">
					</colgroup>
					<tbody>
						<tr>	
		                  	<td><input type="radio" name="s_ship_to" id="s_ship_to1" value="A" onClick="fRadio(this.value);" checked ><label for="s_ship_to1"><bean:message key="Agent"/></label>&nbsp;&nbsp;&nbsp;<!-- 
		                     --><input type="radio" name="s_ship_to" id="s_ship_to2" value="S" onClick="fRadio(this.value);"><label for="s_ship_to2"><bean:message key="Shipper"/></label>&nbsp;&nbsp;&nbsp;<!-- 
		                     --><input type="radio" name="s_ship_to" id="s_ship_to3" value="C" onClick="fRadio(this.value);"><label for="s_ship_to3"><bean:message key="Consignee"/></label>&nbsp;&nbsp;&nbsp;<!-- 
		                     --><input type="radio" name="s_ship_to" id="s_ship_to4" value="N" onClick="fRadio(this.value);"><label for="s_ship_to4"><bean:message key="Notify"/></label></td>
                		</tr>
                		<tr>
              				<td><input name="s_ship_to" id="s_ship_to" value="O" onclick="fRadio(this.value);" onkeypress="if(event.keyCode==13){doPop('PARTNER_POPLIST',this);}" type="radio" /><label for="s_ship_to"><bean:message key="Other_Company"/></label>&nbsp;&nbsp;&nbsp;<!-- 
		                     --><input id="ntc_trdp_cd" name="ntc_trdp_cd" readonly="" maxlength="20" value="" class="search_form-disable" onblur="strToUpper(this);doPop('PARTNER_POPLIST_CLS',this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:48px;" onkeypress="codeNameAction('partner_delivery',this, 'onKeyDown'); " type="text" /><!--
		                     --><button type="button" class="input_seach_btn" tabindex="-1" onClick="doPop('PARTNER_POPLIST',this)"></button><!--
		                     --><input id="ntc_trdp_full_nm" name="ntc_trdp_full_nm" readonly="" maxlength="50" value="" class="search_form-disable" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:134px;" onkeypress="if(event.keyCode==13){doPop('PARTNER_POPLIST',this);}" type="text" /></td>    
                		</tr>
					</tbody>
			</table>
			<table class="line_bluedot"><tr><td></td></tr></table>
    		<h3  class="title_design mar_top_8"><bean:message key="Options"/></h3>
			<table>
					<colgroup>
						<col width="110">
						<col width="110">
						<col width="110">
						<col width="*">
					</colgroup>
					<tbody>
	                    <tr>
			                <td><input name="iv_atc_flg" id="iv_atc_flg" type="checkbox" value="N" ><label for="iv_atc_flg"><bean:message key="IV_Attach"/></label></td>
			                <td><input name="insr_flg" id="insr_flg" type="checkbox" value="N" ><label for="insr_flg"><bean:message key="Insurance"/></label></td>
			                <td><input name="pickup_flg" id="pickup_flg" type="checkbox" value="N" ><label for="pickup_flg"><bean:message key="Pick_Up"/></label></td>
			                <td><input name="lc_flg" id="lc_flg" type="checkbox" value="N" ><label for="lc_flg"><bean:message key="LC"/></label></td>
		              	</tr>
		              	<tr>
			                <td><input name="shpr_ctc_flg" id="shpr_ctc_flg" type="checkbox" value="N" ><label for="shpr_ctc_flg"><bean:message key="Shipper_Contact"/></label></td>
			                <td><input name="impt_flg" id="impt_flg" type="checkbox" value="N" ><label for="impt_flg"><bean:message key="Importer"/></label></td>
			                <td><input name="final_flg" id="final_flg" type="checkbox" value="N" ><label for="final_flg"><bean:message key="Final"/></label></td>
			                <td><input name="sft_doc_flg" id="sft_doc_flg" type="checkbox" value="N" ><label for="sft_doc_flg"><bean:message key="Safety_Doc"/></label></td>
		              	</tr>
		              	<tr>
			                <td><input name="dt_entr_flg" id="dt_entr_flg" type="checkbox" value="N" ><label for="dt_entr_flg"><bean:message key="Data_Entry"/></label></td>
			                <td><input name="sa_flg" id="sa_flg" type="checkbox" value="N" ><label for="sa_flg"><bean:message key="B.SA"/></label></td>
			                <td><input name="call_agt_flg" id="call_agt_flg" type="checkbox" value="N" ><label for="call_agt_flg"><bean:message key="Call_Agent"/></label></td>
			                <td><input name="rtn_doc_flg" id="rtn_doc_flg" type="checkbox" value="N" ><label for="rtn_doc_flg"><bean:message key="Return_Doc"/></label></td>
		              	</tr>	                        
					</tbody>
				</table>
			</div>
	</div>
</div>
</form>
