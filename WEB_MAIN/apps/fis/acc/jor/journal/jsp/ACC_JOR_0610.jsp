<%--
=========================================================
*@FileName   : ACC_JOR_0610.jsp
*@FileTitle  : Payment History Level 2
*@Description: Payment History
*@author     : wyjoung - Cyberlogitec
*@version    : 1.0 - 2014/04/10
*@since      : 2014/04/10

*@Change history:  
*@author     : Tuan.Chau
*@version    : 2.0 - 2014/07/25
*@since      : 2014/07/25
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
	<script language="javascript" src="./apps/fis/acc/jor/journal/script/ACC_JOR_0610.js?ver=<%=CLT_JS_VER%>" ></script>
	
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
<script type="text/javascript">
<!--
function setupPage() {
	loadPage();
}
//-->
</script>
<form name="frm1" method="POST" action="./ACC_JOR_0610.clt">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd"/>
	<input type="hidden" name="f_CurPage"/>
	
	<!-- GridSetting Value -->
	<input type="hidden" name="role_cd" value="<%=userInfo.getRole_cd()%>" />
	<input type="hidden" name="user_id" value="<%=userInfo.getUsrid()%>" />
	<input type="hidden" name="ofc_nm"  value="<%=userInfo.getOfc_locl_nm()%>" />
	<input type="hidden" name="ofc_cd"  value="<%=userInfo.getOfc_cd()%>" />
	<input type="hidden" name="pageurl" id="pageurl" value="ACC_JOR_0610.clt"/>
	<input type="hidden" name="s_cust_flag" value="A">
	
	<!-- Button -->
	<div class="page_title_area clear">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn TOP">
	   		<%-- 
		   <button type="button" btnAuth="<%= roleBtnVO.getAttr1() %>" class="btn_accent" onclick="doWork('SEARCHLIST')" style="display:none;"><bean:message key="Search"/></button>
		   <button type="button" btnAuth="CLEAR" class="btn_normal" onclick="clearAll();" style="display:none;"><bean:message key="Clear"/></button>
		   <button type="button" btnAuth="<%= roleBtnVO.getAttr6() %>" 	class="btn_normal" onclick="doWork('EXCEL')" style="display:none;" name="btn_DownExcel"><bean:message key="Excel"/></button>
		   <button type="button" btnAuth="MINIMIZE" 	class="btn_normal" onclick="doWork('MINIMIZE')"><bean:message key="Minimize"/></button>
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
			<table id="mainForm">
				<colgroup>
					<col width="90">
					<col width="360">
					<col width="150">
					<col width="520">
					<col width="*">
				</colgroup>
				<tbody>
					<tr>
						<th><bean:message key="Branch"/></th>
                        <td><!--
                        --><bean:define id="oficeList" name="valMap" property="ofcList"/><!--
                        --><select name="f_ofc_cd" style="width:100px;"/><!--
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
                        --></logic:iterate></select>
                        </td>
                        <th><input type="radio" name="f_cust_flag" id="f_cust_flag1" value="A" checked><label for="f_cust_flag1"><bean:message key="Vendor_Customer"/></label></th>
                        <td><!--
                        --><input type="text" name="f_trdp_cd" maxlength="20" onBlur="strToUpper(this);codeNameAction('TRDPCD',this, 'onBlur')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px" class="search_form"><!--
                        --><button type="button" class="input_seach_btn" tabindex="-1" id="billto" onClick="doWork('CUSTOMER_POPLIST')"></button><!--
                        --><input type="text" name="f_trdp_nm" maxlength="100" onKeyDown="custEnterAction(this,'CUSTOMER_NAME')" onBlur="strToUpper(this);" dataformat="multiLanguage" style="ime-mode:disabled; text-transform:uppercase;width:180px" class="search_form">
                      	</td>
                      	<td></td>
					</tr>
					
					<tr>
					    <th><bean:message key="Bank"/></th>
                        <td><!--
                        --><select name="f_bank_cd" style="width:268px;"><!--
                        --><option value="">ALL</option><!--
                        --><bean:define id="paramBankList"  name="valMap" property="bankList"/><!--
                        --><logic:iterate id="BankVO" name="paramBankList"><!--
                        --><option value='<bean:write name="BankVO" property="bank_seq"/>'><bean:write name="BankVO" property="bank_nm"/></option><!--
                        --></logic:iterate></select>
                        </td>
                        
                        <th><input type="radio" name="f_cust_flag" id="f_cust_flag2" value="B"><label for="f_cust_flag2"><bean:message key="Account_Group_ID"/></label></th>
					    <td><!--
                        --><select name="f_grp_id_cd" style="width:200px;"><!--
                        --><option value=''>All</option><!--
                        --><bean:define id="acctCdList" name="valMap" property="acctCdList"/><!--
                        --><logic:iterate id="acct_cd" name="acctCdList"><!--
                        --><option value='<bean:write name="acct_cd"/>'><bean:write name="acct_cd"/></option><!--
                        --></logic:iterate></select>
						</td>
					</tr>
					<tr>
						<th><bean:message key="Period"/></th>
                        <td><!--
                        --><select name="f_date_flag" style="width:100px;"><!--
                        --><option value="A"><bean:message key="Post_Date"/></option><!--
                        --><option value="B"><bean:message key="Clear_Date"/></option></select><!--
                        --><input style="width:75px;" type="text" name="f_start_date" maxlength="10" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, this, frm1.f_start_date);firCalFlag=false;" size='11' class="search_form"><!--
                        --><span class="dash">~</span><!--
                        --><input style="width:75px;" type="text" name="f_end_date" maxlength="10" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, frm1.f_end_date, this);firCalFlag=false;" size='11' class="search_form"><!--
                        --><button type="button" id="s_search_dt_cal" onclick="doDisplay('DATE1', frm1);" class="calendar" tabindex="-1"></button>
                        </td>
						
			    		<th><bean:message key="GL_No"/></th>
		                <td><!--
                        --><input type="text" name="f_gl_no" maxlength="20" onBlur="strToUpper(this);glCodeNameAction(this)" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px" class="search_form"><!--
                        --><button type="button" class="input_seach_btn" tabindex="-1" id="billto" onClick="glCodePopup(this)"></button><!--
                        --><input type="text" name="f_gl_nm" maxlength="100" onKeyDown="glCodeEnterAction(this)" onBlur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:180px" class="search_form">
	                	</td>
					</tr>
			    	<tr>
						<th><bean:message key="Payment_Type"/></th>
	                	<td><input name="f_payment_tp_d" id="f_payment_tp_d" type="checkbox" value="A" checked ><label for="f_payment_tp_d"><bean:message key="Deposit"/></label>&nbsp;&nbsp;<!--
                        --><input name="f_payment_tp_p" id="f_payment_tp_p" type="checkbox" value="A" checked><label for="f_payment_tp_p"><bean:message key="Payment"/></label></td>
			    		<th><bean:message key="Invoice_Kind"/></th>
						<td><input name="f_sell_buy_tp_cd_s" id="f_sell_buy_tp_cd_s" value="A" type="checkbox" checked><label for="f_sell_buy_tp_cd_s"><bean:message key="AR"/></label>&nbsp;&nbsp;<!--
                        --><input name="f_sell_buy_tp_cd_b" id="f_sell_buy_tp_cd_b" value="A" type="checkbox" checked><label for="f_sell_buy_tp_cd_b"><bean:message key="AP_Cost"/></label>&nbsp;&nbsp;<!--
                        --><input name="f_sell_buy_tp_cd_d" id="f_sell_buy_tp_cd_d" value="A" type="checkbox" checked><label for="f_sell_buy_tp_cd_d"><bean:message key="Debit"/></label>&nbsp;&nbsp;<!--
                        --><input name="f_sell_buy_tp_cd_c" id="f_sell_buy_tp_cd_c" value="A" type="checkbox" checked><label for="f_sell_buy_tp_cd_c"><bean:message key="Credit"/></label>&nbsp;&nbsp;<!--
                        --><input name="f_sell_buy_tp_cd_ar_gnr" id="f_sell_buy_tp_cd_ar_gnr" value="A" type="checkbox" checked><label for="f_sell_buy_tp_cd_ar_gnr"><bean:message key="AR_GnA"/></label>&nbsp;&nbsp;<!--
                        --><input name="f_sell_buy_tp_cd_ap_gnr" id="f_sell_buy_tp_cd_ap_gnr" value="A" type="checkbox" checked><label for="f_sell_buy_tp_cd_ap_gnr"><bean:message key="AP_GnA"/></label>&nbsp;&nbsp;<!--
                        --><input name="f_sell_buy_tp_cd_na" id="f_sell_buy_tp_cd_na" value="A" type="checkbox" checked><label for="f_sell_buy_tp_cd_na">N/A</label>
					    </td>
					    
					    <td>
							<button type="button" class="btn_etc" onclick="doWork('ALL_DPT')"><bean:message key="All"/></button><!--
							--><button type="button" class="btn_etc" onclick="doWork('CLEAR_DPT')"> <bean:message key="Clear"/></button>
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


