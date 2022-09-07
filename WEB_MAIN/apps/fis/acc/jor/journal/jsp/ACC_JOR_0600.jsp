<%--
=========================================================
*@FileName   : ACC_JOR_0600.jsp
*@FileTitle  : Payment History
*@Description: Payment History
*@author     : wyjoung - Cyberlogitec
*@version    : 1.0 - 2013/11/01
*@since      : 2013/11/01

*@Change history: LHK, 2014/04/09 
*@author     : Tuan.Chau
*@version    : 2.0 - 2014/07/09
*@since      : 2014/07/09
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	    <title><bean:message key="system.title"/></title>
	
	<!-- 일자 및 달력팝업 호출 -->
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/ACC_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="./apps/fis/acc/jor/journal/script/ACC_JOR_0600.js?ver=<%=CLT_JS_VER%>" />
	
	<%
		String ofcLoclNm = userInfo.getOfc_locl_nm();
		String usrNm 	 = userInfo.getUser_name();
		String email 	 = userInfo.getEml();
		String cnt_cd 	 = userInfo.getOfc_cnt_cd();
	%>
	
	<script>
		var pDoc = parent.parent.parent.document;
		hideProcess('WORKING', pDoc);
	</script>

	<bean:define id="valMap"  name="EventResponse" property="mapVal"/>
	<bean:define id="bankSel"  name="valMap" property="bankSel"/>
	<bean:define id="ofcInfo"  name="valMap" property="ofcInfo"/>

<script>
function setupPage(){
	loadPage();
}
</script>
<form name="frm1" method="POST" action="./ACC_JOR_0600.clt">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd"/>
	<input type="hidden" name="f_CurPage"/>
	
	<!-- GridSetting Value -->
	<input type="hidden" name="role_cd" value="<%=userInfo.getRole_cd()%>" />
	<input type="hidden" name="user_id" value="<%=userInfo.getUsrid()%>" />
	<input type="hidden" name="ofc_nm"  value="<%=userInfo.getOfc_locl_nm()%>" />
	<input type="hidden" name="ofc_cd"  value="<%=userInfo.getOfc_cd()%>" />
	<input type="hidden" name="pageurl" id="pageurl" value="ACC_JOR_0600.clt"/>

	<!-- Button -->
	<div class="page_title_area clear">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn TOP">
	   		<%-- 
	   		<button type="button" style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>" class="btn_accent" onclick="doWork('SEARCHLIST')"><bean:message key="Search"/></button>
	   		<button type="button" style="cursor:hand; display:none;" btnAuth="CLEAR" class="btn_normal" onclick="clearAll()"><bean:message key="Clear"/></button>
	   		<button type="button" style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr6() %>" class="btn_normal" onclick="doWork('EXCEL')" name="btn_DownExcel"><bean:message key="Excel"/></button>
	   		<button type="button" btnAuth="MINIMIZE" class="btn_normal" onclick="doWork('MINIMIZE')"><bean:message key="Minimize"/></button>
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
	
	<!-- inquiry_area(S) -->	
<div class="over_wrap" height="100%">
	<div class="wrap_search">
		<div class="opus_design_inquiry" style="width:100%">
			<table id="mainForm">
				<colgroup>
		        	<col width="110">
		        	<col width="110">
		        	<col width="300">
		        	<col width="20">
		        	<col width="140">
		        	<col width="380">
		        	<col width="*">
				</colgroup>
			    <tbody>
			    	<tr height="5px"></tr>
					<tr>						
						<th><bean:message key="Branch"/></th>
                        <td colspan="3"><!--
                        --><bean:define id="oficeList" name="valMap" property="ofcList"/><!--
                        --><select name="f_ofc_cd" style="width:150px;"/><!--
                        --><bean:size id="len" name="oficeList" /><!--
                        --><logic:greaterThan name="len" value="1"><!--
                        	--><option value=''>ALL</option><!--
                        --></logic:greaterThan><!--
                        --><logic:iterate id="ofcVO" name="oficeList"><!--
                        	--><logic:equal name="ofcVO" property="ofc_cd" value="<%= userInfo.getOfc_cd()%>" >
	                            <option selected="selected"  value='<bean:write name="ofcVO" property="ofc_cd"/>'><bean:write name="ofcVO" property="ofc_cd"/></option>
	                         	</logic:equal>
	                         	<logic:notEqual name="ofcVO" property="ofc_cd" value="<%= userInfo.getOfc_cd()%>" >
	                            <option value='<bean:write name="ofcVO" property="ofc_cd"/>'><bean:write name="ofcVO" property="ofc_cd"/></option>
	                         	</logic:notEqual><!--
                        --></logic:iterate><!--
                        --></select></td>
                        <th><bean:message key="Currency"/></th>
                        <td><!--
                        --><select name="f_inv_aply_curr_cd" style="width:80px;"><!--
                        --><option value="">ALL</option><!--
                        --><bean:define id="paramCurrList"  name="valMap" property="currList"/><!--
                        --><logic:iterate id="CurrVO" name="paramCurrList"><!--
                        --><option value='<bean:write name="CurrVO"/>'><bean:write name="CurrVO"/></option><!--
                        --></logic:iterate><!--
                        --></select></td>
						<td></td>
			         </tr>
					 <tr>
                        <th><bean:message key="Period"/></th>
                        <td><!--
                        --><select name="f_date_flag" style="width:100px;"><!--
                        --><option value="A">Invoice Date</option><!--
                        --><option value="B">Due Date</option><!--
                        --><option value="C">Paid Date</option><!--
                        --></select></td>
						<td><!--
                        --><input style="width:75px;" type="text" id="f_start_date" name="f_start_date" maxlength="10" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, this, frm1.f_start_date);firCalFlag=false;" size='11' class="search_form"><!--
                        --><span class="dash">~</span><!--
                        --><input style="width:75px;" type="text" id="f_end_date" name="f_end_date" maxlength="10" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, frm1.f_end_date, this);firCalFlag=false;" size='11' class="search_form"><!--
                        --><button id="s_search_dt_cal" type="button" onclick="doDisplay('DATE1', frm1);" class="calendar" tabindex="-1"></button></td>
                        
                        <td></td>
                        <th><input type="radio" name="f_cust_flag" id="f_cust_flag1" value="A" checked><label for="f_cust_flag1"><bean:message key="Vendor_Customer"/></label></th>
                        <td><!--
                        --><input type="hidden" name="s_cust_flag" value="A"><!--
                        --><input type="text" name="f_trdp_cd" maxlength="20" onKeyDown="codeNameAction('TRDPCD',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('TRDPCD',this, 'onBlur')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px" class="search_form"><!--
                        --><button type="button" class="input_seach_btn" tabindex="-1" id="billto" onclick="doWork('CUSTOMER_POPLIST')"></button><!--
                        --><input type="text" name="f_trdp_nm" maxlength="100" onKeyDown="custEnterAction(this,'CUSTOMER_NAME')" onBlur="strToUpper(this);" dataformat="multiLanguage" style="ime-mode:disabled; text-transform:uppercase;width:180px" class="search_form"></td>
					</tr>
					<tr>
						<td colspan="4"></td>
					    <th><input type="radio" name="f_cust_flag" id="f_cust_flag2" value="B"><label for="f_cust_flag2"><bean:message key="Account_Group_ID"/></label></th>
					    <td valign="top"><!--
                        --><select name="f_grp_id_cd" style="width:170px;"><!--
                        --><option value=''>All</option><!--
                        --><bean:define id="acctCdList" name="valMap" property="acctCdList"/><!--
                        --><logic:iterate id="acct_cd" name="acctCdList"><!--
                        --><option value='<bean:write name="acct_cd"/>'><bean:write name="acct_cd"/></option><!--
                        --></logic:iterate><!--
                        --></select></td>
					</tr>
			    	<tr>
						<th><bean:message key="Department_Type"/></td>
                        <td colspan="2">
                        	<table border="0" width="100%" id="searchInfo1" style="display:block;align:left">
                        		<colgroup>
						        	<col width="150px">
						        	<col width="150px">
						        	<col width="150px">
						        	<col width="*">
								</colgroup>
							    <tbody>
	                        		<tr>
					                	<td><input name="f_dpt_tp_4" id="f_dpt_tp_4" type="checkbox" value="A" checked ><label for="f_dpt_tp_4"><bean:message key="Ocean_Export"/></label></td>
					                	<td><input name="f_dpt_tp_5" id="f_dpt_tp_5" type="checkbox" value="A" checked><label for="f_dpt_tp_5"><bean:message key="Ocean_Import"/></label></td>
					                	<td>
					                		<div class="opus_design_btn">
											   <button type="button" class="btn_etc" onclick="doWork('ALL_DPT')"><bean:message key="All"/></button><!--
	   											--><button type="button" btnAuth="CLEAR" 	class="btn_etc" onclick="doWork('CLEAR_DPT')"><bean:message key="Clear"/></button>
											</div>
					                	</td>
					      			</tr>
					      			<tr>
					               		<td><input name="f_dpt_tp_2" id="f_dpt_tp_2" type="checkbox" value="A" checked><label for="f_dpt_tp_2"><bean:message key="Air_Export"/></label></td>
						                <td><input name="f_dpt_tp_3" id="f_dpt_tp_3" type="checkbox" value="A" checked><label for="f_dpt_tp_3"><bean:message key="Air_Import"/></label></td>
						                <td><input name="f_dpt_tp_1" id="f_dpt_tp_1" type="checkbox" value="A" checked><label for="f_dpt_tp_1"><bean:message key="Other"/></label></td>
					      			</tr>
				      			</tbody>
                        	</table>
                        </td>
					    <td colspan="3">
							<table id="searchInfo1" style="display:block;align:left">
								<colgroup>
							        	<col width="160px">
							        	<col width="40px">
							        	<col width="70px">
							        	<col width="40px">
							        	<col width="*">
								</colgroup>
								<tbody>
							    	<tr>
							    		<th><bean:message key="Invoice_Kind"/></th>
					                	<td><input name="f_sell_buy_tp_cd_s" id="f_sell_buy_tp_cd_s" value="A" type="checkbox" checked><label for="f_sell_buy_tp_cd_s"><bean:message key="AR"/></label></td>
						                <td><input name="f_sell_buy_tp_cd_b" id="f_sell_buy_tp_cd_b" value="A" type="checkbox" checked><label for="f_sell_buy_tp_cd_b"><bean:message key="AP_Cost"/></label></td>
					                	<td><input name="f_sell_buy_tp_cd_d" id="f_sell_buy_tp_cd_d" value="A" type="checkbox" checked><label for="f_sell_buy_tp_cd_d"><bean:message key="Debit"/></label></td>
					                	<td><input name="f_sell_buy_tp_cd_c" id="f_sell_buy_tp_cd_c" value="A" type="checkbox" checked><label for="f_sell_buy_tp_cd_c"><bean:message key="Credit"/></label></td>
					      			</tr>
							    	<tr>
							    		<th><bean:message key="Invoice_Status"/></th>
						                <td>
						                	<input type="hidden" name="s_inv_sts_cd" value="A">
						                	<input type="radio" name="f_inv_sts_cd" id="f_inv_sts_cd1" value="A" class="radio_select"><label for="f_inv_sts_cd1"><bean:message key="All"/></label>
						                </td>
						                <td colspan="7" class="table_search_body"><input type="radio" name="f_inv_sts_cd" id="f_inv_sts_cd2" value="O" class="radio_select" checked><label for="f_inv_sts_cd2"><bean:message key="Open"/></label></td>
					      			</tr>
					      		</tbody>
                        	</table>
					    </td>
	      			</tr>
				</tbody>
			</table>
		</div>
	</div>

	<div class="wrap_result">
    	<div class="opus_design_grid">
    		<script language="javascript">comSheetObject('sheet1');</script>
    	</div>
    </div>
</div>
</form>
<script type="text/javascript">
	doBtnAuthority("<%= roleBtnVO.getAttr_extension() %>");
</script>

