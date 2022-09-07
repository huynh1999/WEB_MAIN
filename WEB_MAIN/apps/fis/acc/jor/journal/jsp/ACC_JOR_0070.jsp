<%
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : ACC_JOR_0070.jsp
*@FileTitle  : Batch Accounting
*@author     : CLT
*@version    : 1.0
*@since      : 2014/07/15
=========================================================*/
%>

<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	    <title><bean:message key="system.title"/></title>

	<!-- 일자 및 달력팝업 호출 -->
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoFormControl.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/ACC_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="./apps/fis/acc/jor/journal/script/ACC_JOR_0070.js?ver=<%=CLT_JS_VER%>" > </script> 
	<script>
		var pDoc = parent.parent.parent.document;
		hideProcess('WORKING', pDoc);

	</script>


	<bean:define id="valMap"  name="EventResponse" property="mapVal"/>
	<bean:define id="ofcInfo"  name="valMap" property="ofcInfo"/>



	<script>
		function setSelection(){
			//frm1.s_ofc_cd.value = '<bean:write name="ofcInfo" property="ofc_cd"/>';
		}
	</script>
	
	<script>
		var rvn_bank_seq = '<bean:write name="valMap" property="rvnBankSel"/>';
		var cost_bank_seq = '<bean:write name="valMap" property="costBankSel"/>'; 
		function setupPage(){
			loadPage();
			setSelection();
		}
	</script>

	<form name="frm1" method="POST" action="./ACC_JOR_0070.clt">
	<!--Command를 담는 공통 -->
	<input id="f_cmd" name="f_cmd" type="hidden" />
	<input id="f_CurPage" name="f_CurPage" type="hidden" />
	<input id="f_param_val" name="f_param_val" type="hidden" />
	
	
	<input id="deposit_level" name="deposit_level" type="hidden"  value="<bean:write name="valMap" property="deposit_level"/>"/>
	<input id="payment_level" name="payment_level" type="hidden"  value="<bean:write name="valMap" property="payment_level"/>"/>
	<input id="ofc_cd" name="ofc_cd" value="<%=userInfo.getOfc_cd()%>" type="hidden" />
	<input id="apo_flg" name="apo_flg" value="<%=userInfo.getApo_flg()%>" type="hidden" />	
<!-- 	// #5772 [ZEN CON] Authorizaiton to remove clear date by Operatin Accounting Role -->
	<input type="hidden"  id="Act_radio_flg" value="<%= userInfo.getAct_radio_flg() %>"/>

	<div class="page_title_area clear">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn TOP">
	   	   <%-- 
		   <button type="button" class="btn_accent" style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>" onclick="doWork('SEARCHLIST')"><bean:message key="Search"/></button> 
		   <button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr3() %>"  onclick="doWork('MODIFY')"><bean:message key="Save"/></button>
		   <button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="JNR_HISTORY"  onclick="doWork('JNR_HIS')"><bean:message key="History"/></button>
		   <button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr6() %>"  onclick="doWork('EXCEL')" name="btn_DownExcel"><bean:message key="Excel"/></button>
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
	
<div class="over_wrap" height="100%">
	<div class="wrap_search">
		<div class="opus_design_inquiry entry_pannel ">
			<table>
				<colgroup>
					<col width="320"/>
					<col width="320"/>
					<col width="80"/>
					<col width="*"/>
				</colgroup>
				<tbody>
					<tr>
						<td class="text_check_title">
							<input  type="radio" name="act_radio" id="act_radio1" value="1" onClick="showHidePeriod()"><label for="act_radio1"><bean:message key="Deposit"/></label><!-- 
							 --><input   type="radio" name="act_radio" id="act_radio2" value="2" onClick="showHidePeriod()"><label for="act_radio2"><bean:message key="Clear_Check"/></label><!-- 
							 --><input  type="radio" name="act_radio" id="act_radio3" value="3" onClick="showHidePeriod()"><label for="act_radio3"><bean:message key="Cancel_Deposit"/></label><!-- 
							 --><input  type="radio" name="act_radio" id="act_radio4" value="4" onClick="showHidePeriod()"><label for="act_radio4"><bean:message key="Cancel_Clear"/></label>
						</td>
						<td></td>
						<th><bean:message key="Branch"/></th>
						<td>
							 <bean:define id="oficeList" name="valMap" property="ofcList"/>
	                        <select required name="s_ofc_cd" style="width:150px;">
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
					</tr>
					<tr>
						<td colspan="2">
							<div id="periodDiv" style="display: none;">
								<b><bean:message key="Deposit_Clear_Date"/></b>
								<input type="text" name="s_post_strdt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, this, frm1.s_post_enddt);firCalFlag=false;" size='11' maxlength="10" class="search_form"/>~ <!-- 
								--><input type="text" name="s_post_enddt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, frm1.s_post_strdt, this);firCalFlag=false;" size='11' maxlength="10" class="search_form"/><!-- 
								--><button class="calendar ir" onclick="doDisplay('DATE1', frm1);" name="s_post_dt_cal" id="s_post_dt_cal" type="button"></button><!-- 
								--><input type="checkbox" name="postChk" onClick="setPostDt(1);">
							</div>
							<div id="periodDiv3" style="display: none;">
								<b><bean:message key="Posting_Date"/></b>
								<input type="text" name="s_post_strdt2" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, this, frm1.s_post_enddt2);firCalFlag=false;" size='11' maxlength="10" class="search_form">~ <!-- 
								--><input type="text" name="s_post_enddt2" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, frm1.s_post_strdt2, this);firCalFlag=false;" size='11' maxlength="10" class="search_form"><!-- 
								--><button class="calendar ir" onclick="doDisplay('DATE3', frm1);" name="s_post_dt_cal" id="s_post_dt_cal" type="button"></button><!-- 
								--><input type="checkbox" name="postChk" onClick="setPostDt(2);">
							</div>
							<div id="dcDiv" style="margin-left: 50px;">
								<b><bean:message key="Deposit_Clear_Date"/></b>
	                            <input type="text" name="f_deposit_dt" value="" style="width:70px" onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1);clearCheck();" maxlength="10" class="search_form"/><!-- 
								--><button class="calendar ir" onclick="doDisplay2('DATE1', frm1);" name="f_deposit_dt_cal" id="f_deposit_dt_cal" type="button"></button><!--
					            --><input type="text" name="bat_seq" value="1" class="search_form" onKeyPress="onlyNumberCheck();" style="width:20px;text-align:center" maxlength="2">
							</div>
						</td>
						<th><bean:message key="Bank"/></th>
						<td>
							<bean:define id="paramBankList"  name="valMap" property="bankList"/>
                           <select name="s_bank_cd" style="width:150px;">
                           	<option value="">All</option>
							<logic:iterate id="BankVO" name="paramBankList">
                          			<option value='<bean:write name="BankVO" property="bank_seq"/>'><bean:write name="BankVO" property="bank_nm"/></option>
                          		</logic:iterate>
                          	</select>
						</td>
					</tr>
				</tbody>
			</table>
		</div>	
		</div>
	<!-- opus_design_grid(S) -->
<div class="wrap_result">
	<div class="opus_design_grid clear">
	<script type="text/javascript">comSheetObject('sheet1');</script>
	<script type="text/javascript">comSheetObject('sheet2');</script>
	<!-- opus_design_inquiry(S) -->
	</div>
	<div class="opus_design_inquity wFit">
		<table>
			<colgroup>
				<col width="900" />
				<col width="150" />
				<col width="*" />
			</colgroup>
			<tbody>
				<tr>
					<td></td>
					<th><bean:message key="Paid_Amount"></bean:message></th>
			        <td><input id="f_pay_amt" name="f_pay_amt" value="" style="width:150px;text-align:right;font-weight:bold" class="search_form-disable" readonly="" type="text" /></td>
				</tr>
			</tbody>
		</table>
	</div>
	<!-- opus_design_inquiry(E) -->
</div>
</div>
	</form>
<form name="frm2" method="POST" action="./GateServlet.gsl">
	<input id="goWhere" name="goWhere" value="fd" type="hidden" />
    <input id="bcKey" name="bcKey" value="blFileDown" type="hidden" />
    <input id="s_palt_doc_seq" name="s_palt_doc_seq" value="" type="hidden" />
    <input id="docType" name="docType" value="" type="hidden" />
</form>	

<script type="text/javascript">
doBtnAuthority("<%= roleBtnVO.getAttr_extension() %>");
</script>	



