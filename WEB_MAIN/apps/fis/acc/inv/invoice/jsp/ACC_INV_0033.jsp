<%--
=========================================================
*@FileName   : ACC_INV_0033.jsp
*@FileTitle  : AP Expense OTHER BRANCH
*@Description: AP Expense OTHER BRANCH
*@author     : Chungrue - Cyberlogitec
*@version    : 1.0 - 2012/05/15
*@since      : 2012/05/15

*@Change history:
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
	
	<!-- 일자 및 달력팝업 호출 -->
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoFormControl.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoBizCommon.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/ACC_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="./apps/fis/acc/inv/invoice/script/ACC_INV_0033.js?ver=<%=CLT_JS_VER%>"></script>
	
	<%
		String ofc_cd		= userInfo.getOfc_cd();
		String ofcLoclNm 	= userInfo.getOfc_locl_nm();
		String usrNm 		= userInfo.getUser_name();
		String usrId		= userInfo.getUsrid();
		String usrPhn		= userInfo.getPhn();
		String usrFax		= userInfo.getFax();
		String email 		= userInfo.getEml();
		String cnt_cd 		= userInfo.getOfc_cnt_cd();
	%>
	
	<script>
		var pDoc = parent.parent.parent.document;
		hideProcess('WORKING', pDoc);
		
		function setupPage(){
			loadPage();setSelect();
		}
	</script>
	
	<bean:define id="blinfoVO"   name="EventResponse" property="objVal"/>
	<bean:define id="valMap"  	 name="EventResponse" property="mapVal"/>
	<bean:define id="ofcVO"  	 name="valMap" property="ofcInfo"/>
	
	<script>
		function setSelect(){
			var formObj = document.frm1;
			
			frm1.f_curr_cd.value = '<bean:write name="ofcVO" property="trf_cur_cd"/>';
			
		}
		
		<!-- Freight SEA_Unit 단위 -->
	    var UNITCD1 = ' |';
		var UNITCD2 = ' |';
		
		<logic:notEmpty name="valMap" property="UNITCD">
			<% boolean isBegin = false; %>
            <bean:define id="unitList" name="valMap" property="UNITCD"/>
            <logic:iterate id="codeVO" name="unitList">
                <% if(isBegin){ %>
                    UNITCD1+= '|';
                    UNITCD2+= '|';
                <% }else{
                      isBegin = true;
                   } %>
                UNITCD1+= '<bean:write name="codeVO" property="cd_nm"/>';
                UNITCD2+= '<bean:write name="codeVO" property="cd_val"/>';
            </logic:iterate>
        </logic:notEmpty>
		
        
        
        <!-- ###CONTAINER T<bean:message key="Profit_Share"/>Z 항목### -->
		var TPSZ1 = ' |';
		var TPSZ2 = ' |';
        <logic:notEmpty name="valMap" property="cntrTpszList">
			<% boolean isBegin3 = false; %>
            <bean:define id="TpszList" name="valMap" property="cntrTpszList"/>
            <logic:iterate id="codeVO" name="TpszList">
                <% if(isBegin3){ %>
                	TPSZ1+= '|';
                	TPSZ2+= '|';
                <% }else{
                      isBegin3 = true;
                   } %>
                TPSZ1+= '<bean:write name="codeVO" property="cntr_tpsz_cd"/>';
                TPSZ2+= '<bean:write name="codeVO" property="cntr_tpsz_cd"/>';
            </logic:iterate>
        </logic:notEmpty>
        
        
        
        
        <!-- ###FRT_CD LIST 항목### -->
		var FRTCD1 = ' |';
		var FRTCD2 = ' |';
        <logic:notEmpty name="valMap" property="FRT_CD_LIST">
			<% boolean isBegin5 = false; %>
            <bean:define id="FRT_CD_LIST" name="valMap" property="FRT_CD_LIST"/>
            <logic:iterate id="codeVO" name="FRT_CD_LIST">
                <% if(isBegin5){ %>
                	FRTCD1+= '|';
                	FRTCD2+= '|';
                <% }else{
                      isBegin5 = true;
                   } %>
                   FRTCD1+= '<bean:write name="codeVO" property="FRT_CD" filter="false"/>';
                   FRTCD2+= '<bean:write name="codeVO" property="FRT_CD" filter="false"/>' + ": " + '<bean:write name="codeVO" property="FRT_CD_NM" filter="false"/>';
            </logic:iterate>
        </logic:notEmpty>
        
	</script>
<form name="frm1" method="POST" action="./ACC_INV_0033.clt">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd"/>
	<input type="hidden" name="f_CurPage"/>
	<input type="hidden" name="trdp_cd"/>
	<input type="hidden" name="f_frgn_curr_cd">
	<input type="hidden" name="f_frgn_amt">
	<input type="hidden" name="f_frgn_vat_amt">
	<input type="hidden" name="f_frgn_sum_amt">
	<input type="hidden" name="f_curRow">
	<input type="hidden" name="f_old_sum_amt">
	
	<input	type="hidden" name="f_usr_nm" value="<%= usrNm %>"/>
	<input	type="hidden" name="f_email" value="<%= email %>"/>
	<input	type="hidden" name="f_ofc_cd" value="<%= ofc_cd %>"/>
	<input	type="hidden" name="f_usrId" value="<%= usrId %>"/>
	<input	type="hidden" name="f_usrPhn" value="<%= usrPhn %>"/>
	<input	type="hidden" name="f_usrFax" value="<%= usrFax %>"/>
	<input	type="hidden" name="f_cnt_cd" value="<%= cnt_cd %>"/>
	
	<input type="hidden" name="f_inv_seq"    value="<bean:write name="blinfoVO" property="inv_seq"/>">
	<input type="hidden" name="temp_inv_no"  value="<bean:write name="blinfoVO" property="inv_no"/>"/>
	<input type="hidden" name="f_ref_ofc_cd" value=""/>
	
	<!-- 마감 FLAG -->
	<input type="hidden" name = "f_clt_cmpl_flg">
	<input type="hidden" name = "f_today_dt">
	
	<input type="hidden" name = "old_post_dt" value="<bean:write name="blinfoVO" property="post_dt"/>"/>
	<input type="hidden" name = "slip_post"   value="<bean:write name="blinfoVO" property="slip_post"/>"/>
	
	<input type="hidden" name="s_inv_no"  value="">
	
	<input type="hidden" name="file_name">
	<input type="hidden" name="title">
	<input type="hidden" name="rd_param">
	<!-- page_title_area(S)  -->
	<div class="page_title_area clear">
			<!-- page_title(S) -->
			<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
			<!-- page_title(E) -->
			
			<!-- opus_design_btn(S) -->
			<div class="opus_design_btn"><!-- 
				--><button type="button" class="btn_accent" id="btnModify" onclick="doWork('MODIFY')"><bean:message key="Save"/></button><!-- 
				--><span id="deleteBtn2" style="display: none;"><button type="button" class="btn_normal" id="btnDelete" onclick="doWork('DELETE')"><bean:message key="Delete"/></button></span><!-- 
				--><button type="button" class="btn_normal" id="btnCopy" onclick="doWork('COPY')"><bean:message key="Copy"/></button><!-- 
				--><button type="button" class="btn_normal" id="btnPrint" onclick="doWork('PRINT')"><bean:message key="Print"/></button><!-- 
				--><button type="button" class="btn_normal" onclick="clearAll()"><bean:message key="Clear"/></button>
			</div>
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
    <!-- page_title_area(E) -->
<div class="over_wrap" height="100%">
	<div class="wrap_search">
		<div class="opus_design_inquiry ">
			<table>
				<colgroup>
					<col width="120">
					<col width="200">
					<col width="120">
					<col width="*">
				</colgroup>
				<tbody>
                    <tr>
                        <th><bean:message key="Vendor"/></th>
                        <td>
				            <input required type="text" name="f_vendor_cd" maxlength="20" value="" onKeyDown="codeNameAction('VENDOR',this, 'onKeyDown')" onBlur="codeNameAction('VENDOR',this, 'onBlur')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px" class="search_form"><!-- 
				         --><button type="button" class="input_seach_btn" tabindex="-1"  onclick="doWork('CUSTOMER_POPLIST')"></button><!-- 
				         --><input required type="text" name="f_vendor_nm" maxlength="50" value="" onKeyDown="custEnterAction(this,'CUSTOMER')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:150px" class="search_form">
                        </td>
                        <th><bean:message key="Amount_Due"/></th>
                        <td>
				           <input type="text" name="f_amt_due" value="" style="width:120px;text-align:right" class="search_form-disable" readOnly>
                        </td>
                    </tr>
                    <tr>
                    	<th><bean:message key="Vendor_Invoice_No"/></th>
                    	<td colspan="3"><input type="text" name="f_inv_no" maxlength="50" value="" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:233px" class="search_form"></td>
                    </tr>
                    <tr>
                    	<th><bean:message key="Posting_Date"/></th>
                    	<td colspan="3">
                    		<input required type="text" name="f_post_dt" id="f_post_dt" value="" style="width:70px" onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1);setInvDt();checkPostDate();" maxlength="10" class="search_form"><!-- 
				         --><button type="button" class="calendar ir" id="f_post_dt_cal" onclick="doDisplay('DATE1', frm1);"></button>
                    	</td>
                    </tr>
                    <tr>
                    	<th><bean:message key="Invoice_Date"/></th>
                    	<td colspan="3">
                    		<input required type="text" name="f_inv_dt" value="" style="width:70px" onKeyUp="mkDateFormatType(this, event, false,1);enterCalcCreateTerms()" onBlur="mkDateFormatType(this, event, true,1);calcCreateTerms();" maxlength="10" class="search_form"><!-- 
				         --><button type="button" class="calendar ir" id="f_inv_dt_cal" onclick="doDisplay('DATE2', frm1);"></button>
                    	</td>
                    </tr>
                    <tr>
                    	<th><bean:message key="Terms"/></th>
                    	<td colspan="3">
                    		<select name="f_terms" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:131px;text-align:left" onchange="javascript:calcCreateTerms();">
								<option value=""></option>
								<option value="A">Days ____</option>
								<option value="B">End of this month</option>
								<option value="C">End of next month</option>
								<option value="D">____th of next month</option>
							</select><!-- 
						--><input type="text" name="f_term_dt" value="" onKeyDown="enterCalcCreateTerms();" onBlur="calcCreateTerms();" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:23px;text-align:left">
                    	</td>
                    </tr>
                    <tr>
                    	<th><bean:message key="Due_Date"/></th>
                    	<td colspan="3">
                    		<input required type="text" name="f_due_dt" value="" style="width:70px" onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1)" maxlength="10" class="search_form"><!-- 
				         --><button type="button" class="calendar ir" id="f_due_dt_cal" onclick="doDisplay('DATE3', frm1);"></button>
                    	</td>
                    </tr>
                    <tr>
                    	<th><bean:message key="Currency"/></th>
                    	<td colspan="3">
                    		<select required name="f_curr_cd" style="width:70px;">
				            	<option value=""></option>
                           		<bean:define id="paramCurrList"  name="valMap" property="currList"/>
								<logic:iterate id="CurrVO" name="paramCurrList">
                           			<option value='<bean:write name="CurrVO"/>'><bean:write name="CurrVO"/></option>
                           		</logic:iterate>
                           	</select>
                    	</td>
                    </tr>
                    <tr>
                    	<th><label for="f_buy_inv_rcv"><bean:message key="Invoice_Received"/></label></th>
                    	<td colspan="3">
                    		 <input type="checkbox" name="f_buy_inv_rcv" id="f_buy_inv_rcv" value="Y">
                    	</td>
                    </tr>
                    <tr>
                    	<th><bean:message key="Remark"/></th>
                    	<td colspan="3">
                    		 <textarea name="f_remark" maxlength="500" class="search_form" style="width:470px;height:50px;"></textarea>
                    	</td>
                    </tr>
                    </tbody>
                </table>
		</div>
	</div>
	<div class="wrap_result">
		<div class="opus_design_grid">
			<div class="opus_design_btn">
			 	<button type="button" class="btn_normal" onclick="doWork('ROWADD')"><bean:message key="Add"/></button>
			 </div>
			<script language="javascript">comSheetObject('sheet1');</script>
			<div style="display: none;">
				<script language="javascript">comSheetObject('sheet2');</script>
			</div>
		</div>
		<div class="opus_design_inquiry">
			<table>
				<colgroup>
					<col width="50">
					<col width="100">
					<col width="70">
					<col width="100">
					<col width="80">
					<col width="*">
				</colgroup>
				<tbody>
					<tr>
						<th><bean:message key="Amount"/></th>
	                    <td>
							<input type="text" name="f_amt_tot" value="" style="width:100px;text-align:right;font-weight:bold" class="search_form-disable" readOnly>
						</td>
						
						<th><bean:message key="Vat_Amount"/></th>
	                    <td>
							<input type="text" name="f_vatamt_tot" value="" style="width:100px;text-align:right;font-weight:bold" class="search_form-disable" readOnly>
						</td>
						
						<th><bean:message key="Total_Amount"/></th>
	                    <td>
							<input type="text" name="f_totamt_tot" value="" style="width:100px;text-align:right;font-weight:bold" class="search_form-disable" readOnly>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</div>
</form>
