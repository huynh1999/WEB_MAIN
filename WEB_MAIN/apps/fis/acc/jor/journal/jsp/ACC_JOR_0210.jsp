<%--
=========================================================
*@FileName   : ACC_JOR_0210.jsp
*@FileTitle  : Tax Bill Check Journal
*@Description: Tax Bill Check Journal
*@author     : Chungrue - Cyberlogitec
*@version    : 1.0 - 2012/01/17
*@since      : 2012/01/17

*@Change history:
*@author     : Tuan.Chau
*@version    : 2.0 - 24/07/2014
*@since      : 24/07/2014
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
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoFormControl.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/ACC_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="./apps/fis/acc/jor/journal/script/ACC_JOR_0210.js?ver=<%=CLT_JS_VER%>" ></script>
	
	<%
		String ofcLoclNm = userInfo.getOfc_locl_nm();
		String usrNm = userInfo.getUser_name();
		String email = userInfo.getEml();
		String userId = userInfo.getUsrid();
	%>
	
	<script>
		var pDoc = parent.parent.parent.document;
		hideProcess('WORKING', pDoc);

	</script>
	
	
	<bean:define id="valMap" name="EventResponse" property="mapVal"/>
	<bean:define id="ofcVO" name="valMap" property="ofcInfo"/>
	
	<bean:define id="jnrNo"   name="valMap" property="jnr_no"/>
	<bean:define id="cust_cd" name="valMap" property="cust_cd"/>
	<bean:define id="inv_no"  name="valMap" property="inv_no"/>
	<bean:define id="bankSel"  name="valMap" property="bankSel"/>
	<bean:define id="slip_post"  name="valMap" property="slip_post"/>

	
	<script>
		function setSelection(){
			
			frm1.f_curr_cd.value = '<bean:write name="ofcVO" property="trf_cur_cd"/>';
			frm1.f_bank_cd.value = '<bean:write name="bankSel"/>';

			frm1.t_jnr_no.value  = '<bean:write name="jnrNo"/>';
			frm1.t_cust_cd.value = '<bean:write name="cust_cd"/>';
			frm1.t_inv_no.value  = '<bean:write name="inv_no"/>';
		}
		
		function searchSelection(){
			
			frm1.f_bank_cd.value = '<bean:write name="bankSel"/>';

			frm1.t_jnr_no.value  = '<bean:write name="jnrNo"/>';
			frm1.t_cust_cd.value = '<bean:write name="cust_cd"/>';
			frm1.t_inv_no.value  = '<bean:write name="inv_no"/>';
		}
		
		<!-- OFC_CD -->
		var OFCCD = '';
		
        <logic:notEmpty name="valMap" property="ofcList">
			<% boolean isBegin = false; %>
            <bean:define id="ofcList" name="valMap" property="ofcList"/>
            <logic:iterate id="ofcVO" name="ofcList">
                <% if(isBegin){ %>
                       OFCCD += '|';
                <% }else{
                       isBegin = true;
                   } %>
                OFCCD+= '<bean:write name="ofcVO" property="ofc_cd"/>';
            </logic:iterate>
        </logic:notEmpty>
        
        var CURRCD = '';
        <logic:notEmpty name="valMap" property="currList">
			<% boolean isBegin2 = false; %>
	        <bean:define id="currList" name="valMap" property="currList"/>
	        <logic:iterate id="currVO" name="currList">
	            <% if(isBegin2){ %>
	                   CURRCD += '|';
	            <% }else{
	                   isBegin2 = true;
	               } %>
	            CURRCD+= '<bean:write name="currVO"/>';
	        </logic:iterate>
    	</logic:notEmpty>
    	
    	
    	var GLCD = '';
        <logic:notEmpty name="valMap" property="glList">
			<% boolean isBegin3 = false; %>
	        <bean:define id="glList" name="valMap" property="glList"/>
	        <logic:iterate id="glVO" name="glList">
	            <% if(isBegin3){ %>
	            	   GLCD += '|';
	            <% }else{
	                   isBegin3 = true;
	               } %>
	            GLCD+= '<bean:write name="glVO" property="gl_cd"/>';
	        </logic:iterate>
    	</logic:notEmpty>
        
    	function setupPage() {
    		setSelection();
    		loadPage();    		
    	}
	</script>	
<form name="frm1" method="POST" action="./ACC_JOR_0210.clt">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd"/>
	<input type="hidden" name="f_CurPage"/>
	
	<input type="hidden" name="f_inv_seq" 			value=""/>
	<input type="hidden" name="f_inv_no" 			value=""/>
	<input type="hidden" name="f_print_type" 		value=""/>
	
	<input type="hidden" name="f_jnr_no" 			value=""/>
	<input type="hidden" name="s_jnr_no" 			value=""/> <!-- LIST에서 이동시 사용 -->
	<input type="hidden" name="t_jnr_no" 			value=""/> <!-- LIST에서 이동시 사용 -->
	<input type="hidden" name="old_void_chk" 		value=""/>
	
	
	<input type="hidden" name="file_name" 			value=""/>
	<input type="hidden" name="rd_param"  			value=""/>
	<input type="hidden" name="title"    			value=""/>
	<input type="hidden" name="proc_userid" 		value="<%=userId%>"/>
	
	<input type="hidden" name="f_rcv_amt"    		value=""/>
	
	<input type="hidden" name="t_cust_cd" 			value=""/> <!-- LIST에서 이동시 사용 -->
	<input type="hidden" name="t_inv_no" 			value=""/> <!-- LIST에서 이동시 사용 -->
	
	<input type="hidden" name="rider_yn"    		value=""/>
	
	<input type="hidden" name ="slip_post" 			value="<bean:write name="slip_post"/>"/> <!-- LIST에서 이동시 사용 -->
	<input type="hidden" name ="old_post_dt" 		value=""/>
	
	<input type="hidden" name="role_cd"  value="<%=userInfo.getRole_cd()%>" />
	
	<div class="page_title_area clear">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn"><!--
	   --><button type="button" class="btn_accent" onclick="doWork('SEARCHLIST')"><bean:message key="Search"/></button><!--
	   --><span id="saveBtn2" onclick="doWork('MODIFY')"><button id="btnModify" type="button" class="btn_normal"><bean:message key="Save"/></button></span><!--
	   --><span id="printBtn02" style="display:none" onclick="doWork('PRINT')"><button id="btnPrint" type="button" class="btn_normal"><bean:message key="Print"/></button></span><!--
	   --><span id="riderprintBtn02" style="display:none" onclick="doWork('RIDERPRINT')"><button type="button" class="btn_normal"><bean:message key="Rider_Print"/></button></span><!--
	   --><button onclick="clearAll()" type="button" class="btn_normal"><bean:message key="Clear"/></button>
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
					<col width="120"></col>
					<col width="250"></col>
					<col width="70"></col>
					<col width="250"></col>
					<col width="300"></col>
					<col width="*"></col>
				</colgroup>
				<tbody>
					<tr>
						<th><bean:message key="Vendor"/></th>
                        <td><!--
                        --><input type="text" required name="s_cust_cd" maxlength="20" value="" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px" onKeyDown="codeNameAction('CUSTOMER',this, 'onKeyDown')" onBlur="codeNameAction('CUSTOMER',this, 'onBlur')" ><!--
                        --><button type="button" class="input_seach_btn" tabindex="-1" id="customer" onClick="doWork('CUSTOMER_POPLIST')"></button><!--
                        --><input type="text" required name="s_cust_nm" maxlength="50" value="" onKeyDown="custEnterAction(this,'CUSTOMER')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:130px" >
                        </td>
                        
						<th><bean:message key="Paid_To"/></th>
                        <td><!--
                        --><input type="text" name="s_paid_cd" maxlength="20" value="" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px" onKeyDown="codeNameAction('CUSTOMER2',this, 'onKeyDown')" onBlur="codeNameAction('CUSTOMER2',this, 'onBlur')" ><!--
                        --><button type="button" class="input_seach_btn" tabindex="-1" id="customer" onClick="doWork('CUSTOMER_POPLIST2')"></button><!--
                        --><input type="text" name="s_paid_nm" maxlength="50" value="" onKeyDown="custEnterAction(this,'CUSTOMER2')"dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:130px" >
                        </td>
                        
                        <th style="text-align: left;"><!--
                        --><label for="dept_chk1"><bean:message key="Local"/></label> <input type="checkbox" name="dept_chk1" id="dept_chk1" value="1" checked>&nbsp;<!--
                        --><label for="dept_chk2"><bean:message key="CR_DB"/></label> <input type="checkbox" name="dept_chk2" id="dept_chk2" value="2">&nbsp;<!--
                        --><label for="dept_chk3"><bean:message key="AP"/></label>   <input type="checkbox" name="dept_chk3" id="dept_chk3" value="3" checked>
                        </th>
                        <td></td>
					</tr>
					
					<tr>
						<th><bean:message key="Vendor_Invoice_No"/></th>
                        <td><input type="text" name="s_inv_no" maxlength="50" value="" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:233px" ></td>
					</tr>
				</tbody>
			</table>
			<table>
				<colgroup>
					<col width="120"></col>
					<col width="120"></col>
					<col width="70"></col>
					<col width="170"></col>
					<col width="120"></col>
					<col width="120"></col>
					<col width="120"></col>
					<col width="*"></col>
				</colgroup>
				<tbody>
					<tr>
						<th><bean:message key="Post_Date"/></th>
                        <td><!--
                        --><input type="text" name="f_post_dt" value=""  onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1);checkPostDate();" dataformat="excepthan" style="ime-mode:disabled;width:75px;"><!--
                        --><button type="button" id="f_post_dt_cal" onclick="doDisplay('DATE3' ,frm1);" class="calendar" tabindex="-1"></button>
                        </td>
                        
						<th><label for="deposit_chk">Clear</label> <input type="checkbox" name="deposit_chk" id="deposit_chk" onClick="setDepositDate();"></th>
						<th><bean:message key="Clear_Date"/></th>
                        <td><!--
                        --><input type="text" name="f_deposit_dt" value=""  onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1);checkDeposit();" dataformat="excepthan" style="ime-mode:disabled;width:75px;"><!--
                        --><button type="button" id="f_deposit_dt_cal" onclick="doDisplay('DATE1' ,frm1);" class="calendar" tabindex="-1"></button>
                        </td>
                        
                        
						<th><label for="vofor_chk">Void</label> <input type="checkbox" name="void_chk" id="void_chk" onClick="setVoidDate();" disabled></th>
						<th><bean:message key="Void_Date"/></th>
                        <td><!--
                        --><input type="text" name="f_void_dt" value="" class="search_form-disable" onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1)" dataformat="excepthan" style="ime-mode:disabled;width:75px;" readOnly><!--
                        --><button type="button" id="f_void_dt_cal" onclick="doDisplay('DATE2' ,frm1);" class="calendar" tabindex="-1"></button>
                        </td>
                        <td></td>
					</tr>
				</tbody>
			</table>
			<table>
				<colgroup>
					<col width="120"></col>
					<col width="120"></col>
					<col width="70"></col>
					<col width="90"></col>
					<col width="80"></col>
					<col width="120"></col>
					<col width="*"></col>
				</colgroup>
				<tbody>
					<tr>
						<th><bean:message key="Currency"/></th>
                        <td><!--
                        --><select name="f_curr_cd" style="width:75px;"><!--
                        --><bean:define id="paramCurrList"  name="valMap" property="currList"/><!--
                        --><logic:iterate id="CurrVO" name="paramCurrList"><!--
                        --><option value='<bean:write name="CurrVO"/>'><bean:write name="CurrVO"/></option><!--
                        --></logic:iterate></select>
                        </td>
                        
						<th><bean:message key="Check_No"/></th>
                        <td><input type="text" name="f_chk_no" maxlength="20" value="" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:80px" ></td>
                        
						<th><bean:message key="Bank"/></th>
                        <td><!--
                        --><select name="f_bank_cd" style="width:171px;"><!--
                        --><bean:define id="paramBankList"  name="valMap" property="bankList"/><!--
                        --><logic:iterate id="BankVO" name="paramBankList"><!--
                        --><option value='<bean:write name="BankVO" property="bank_seq"/>'><bean:write name="BankVO" property="bank_nm"/></option><!--
                        --></logic:iterate></select>
                        </td>
                        <td></td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	<div class="wrap_result">
    	<div class="opus_design_grid">
    		<script language="javascript">comSheetObject('sheet1');</script>
			<script language="javascript">comSheetObject('sheet2');</script>
    	</div>
    	<div class="opus_design_inquiry">
    	<table>
			<tr>
				<td width="650px"></td>
				<th width="100px">Invoice Amount</th>
                <td width="120px"><input type="text" name="f_inv_amt" value="" style="width:100px;text-align:right;font-weight:bold" class="search_form-disable" readOnly></td>
				
				<th width="100px"><bean:message key="Balance_Amount"/></th>
                <td width="120px"><input type="text" name="f_bal_amt" value="" style="width:100px;text-align:right;font-weight:bold" class="search_form-disable" readOnly></td>
				
				<th width="100px"><bean:message key="Pay_Amount"/></th>
                <td width="120px"><input type="text" name="f_pay_amt" value="" style="width:100px;text-align:right;font-weight:bold" class="search_form-disable" readOnly></td>
                <td></td>
			</tr>
		</table>
		<table>
            <tr>
                <th><bean:message key="Remark"/></th>
                <td><textarea name="f_remark" maxlength="500"  dataformat="excepthan" style="width:600px;height:50px;"></textarea></td>
            </tr>
        </table>
        </div>
    </div>
</div>
</form>


