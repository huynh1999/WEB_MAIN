<%
/*=========================================================
 *Copyright(c) 2014 CyberLogitec
 *@FileName : PFM_ACC_0030.jsp
 *@FileTitle : Local Statement
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
	<%-- <link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" /> --%>

	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/PFM_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/pfm/acc/accounting/script/PFM_ACC_0030.js?ver=<%=CLT_JS_VER%>"></script>
	
	<!-- 일자 및 달력팝업 호출 -->
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	
	<!-- #4389 Auto Complete 추가 -->
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/autocomplete_ui.js?ver=<%=CLT_JS_VER%>"></script>
	
	<bean:define id="valMap"  name="EventResponse" property="mapVal"/>
	<bean:define id="sysOfcVO"  name="valMap" property="sysOfcInfo"/>
	<bean:define id="usrOfcInfoVO"  name="valMap" property="ofcInfo"/>
	
	<script type="text/javascript">
		var usrId = "<%= userInfo.getUsrid() %>";
		var usrPhn = "<%= userInfo.getPhn() %>";
		var usrFax = "<%= userInfo.getFax() %>";
		var usrNm = "<%= userInfo.getUser_name() %>";
		var usrEml = "<%= userInfo.getEml() %>";
		var prn_ofc_cd = "<%=(String)application.getAttribute("PRNT_OFC_CD")%>";
		var ofcCntArr = new Array();
		ofcCntArr.push("");
		
		// #4389 Auto Complete 추가
		var AUTOCOMPLETE_YN = 'N';	
		
		<logic:notEmpty name="valMap" property="autocompleteYn">
	    	AUTOCOMPLETE_YN = '<bean:write name="valMap" property="autocompleteYn"/>';
		</logic:notEmpty>
		
		function setupPage() {
			loadPage();
			var agent = navigator.userAgent.toLowerCase(); 
			if (agent.indexOf("msie") != -1) { //ie 일 경우 pdfDownLoad 버튼은 무조건 안나온다.
			}else{
				getBtnObj("pdfDowns").style.display = 'inline';
			}
		}
	</script>
<!-- </head> -->
<form name="frm1" method="POST" action="./">

<!--Command를 담는 공통 -->
<input type="hidden" name="f_cmd"/> 
<input type="hidden" name="f_CurPage"/>

<input type="hidden" name="f_sys_ofc_cd" value="<bean:write name="sysOfcVO" property="ofc_cd"/>"/>

<!--  #2627 - [CLT] ACCT REPORT - ONE CURRENCY OPTION CURRENCY SETUP - item 2 by thoa.dien 170828-->
<logic:notEmpty name="sysOfcVO" property="locl_curr_cd">
	<input type="hidden" name="f_sys_ofc_trf_cur_cd" value="<bean:write name="sysOfcVO" property="locl_curr_cd"/>"/>
</logic:notEmpty>
<logic:empty name="sysOfcVO" property="locl_curr_cd">
	<input type="hidden" name="f_sys_ofc_trf_cur_cd" value="<bean:write name="sysOfcVO" property="trf_cur_cd"/>"/>
</logic:empty>
<!--  #2627 - Changes from Office System Currency to set the local currency based on user's office's local currency information - Thoa.Dien.170928-->
<logic:notEmpty name="usrOfcInfoVO" property="locl_curr_cd">
	<input type="hidden" name="f_usr_ofc_lcl_curr_cd" id="f_usr_ofc_lcl_curr_cd" value="<bean:write name="usrOfcInfoVO" property="locl_curr_cd"/>"/>
</logic:notEmpty>
<logic:empty name="usrOfcInfoVO" property="locl_curr_cd">
	<input type="hidden" name="f_usr_ofc_lcl_curr_cd" id="f_usr_ofc_lcl_curr_cd" value="<bean:write name="usrOfcInfoVO" property="trf_cur_cd"/>"/>
</logic:empty>

<input type="hidden" name="f_sys_ofc_locl_stmt_rmk" value="<bean:write name="sysOfcVO" property="locl_stmt_rmk"/>"/>

<input type="hidden" name="h_per_dt" value="" id="h_per_dt" />
<input type="hidden" name="h_per_strdt" value="" id="h_per_strdt" />
<input type="hidden" name="h_per_enddt" value="" id="h_per_enddt" />
<input type="hidden" name="f_h_per_tp1" value="" id="f_h_per_tp1" />
<input type="hidden" name="f_h_per_tp2" value="" id="f_h_per_tp2" />
<input type="hidden" name="f_h_dpt_tp" value="" id="f_h_dpt_tp" />
<input type="hidden" name="f_h_rpt_tp" value="" id="f_h_rpt_tp" />
<input type="hidden" name="f_h_all_tp" value="" id="f_h_all_tp" />
<input type="hidden" name="f_h_inv_rcvd_flg" value="" id="f_h_inv_rcvd_flg" />
<input type="hidden" name="f_cust_flg" value="" id="f_cust_flg" />

<!-- Report Value -->
<input type="hidden" name="file_name" id="file_name" />
<input type="hidden" name="rd_param" id="rd_param" />
<input type="hidden" name="title" id="title" />
<!-- 6301  [JAPT] Mail sending function related request -->
<input type="hidden" name="mailTitle" id="mailTitle" />
<!--#52512 [CLT] RD File Name을 표준화| Standardization of File Name during downloading the report -->
<input type="hidden" name="rpt_file_name_title"/>


<!--  Report ==> OutLook연동 파라미터 (S) -->
<input type="hidden" name="rpt_biz_tp" id="rpt_biz_tp" />
<input type="hidden" name="rpt_biz_sub_tp" id="rpt_biz_sub_tp" />
<input type="hidden" name="rpt_tp" id="rpt_tp" />
<input type="hidden" name="rpt_acc_grp_id" id="rpt_acc_grp_id" />
<input type="hidden" name="rpt_trdp_cd" id="rpt_trdp_cd" />
<!-- page_title_area(S) -->
<div class="page_title_area clear">
	<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
   <!-- btn_div -->
   <div class="opus_design_btn TOP">
   		<%-- 
		<span style="display:none;" btnAuth="<%= roleBtnVO.getAttr5() %>" ><button type="button" style="display:none;" id = "pdfDowns"   class="btn_accent" onclick="pdfDown('PRINT')"><bean:message key="PDF_download"/></button></span>
		<button id="btnPrint" type="button" style="display:none;" btnAuth="<%= roleBtnVO.getAttr5() %>" class="btn_accent" onclick="doWork('PRINT')"><bean:message key="Print"/></button>
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
<!-- h3 class="title_design"><bean:message key="Search_Condition"/></h3 -->
<div class="opus_design_inquiry entry_pannel ">
	<table>
		<colgroup>
			<col width="110" />
			<col width="110" />
			<col width="100" />
			<col width="100" />
			<col width="*" />
		</colgroup>
		<tbody>
			<tr style="display:none">
				<th><bean:message key="Select_Report_Type"/>&nbsp;</th> <!-- #2499 [PATENT]Outstanding by Sales  -->
				<td>
					<input type="radio" name="f_report_radio" id="f_report_radio1" class="radio_select" checked  onClick="fnPersonOpen(this.value)"><label for="f_report_radio1"><bean:message key="Statement"/></label>
				</td>
				<td>
					<input type="radio" name="f_report_radio" id="f_report_radio2" class="radio_select" onClick="fnPersonOpen(this.value)"><label for="f_report_radio3"><bean:message key="AR/AP_Balance"/></label>
				</td>				
				<td colspan="2">
					<input type="radio" name="f_report_radio" id="f_report_radio3" class="radio_select" onClick="fnPersonOpen(this.value)"><label for="f_report_radio2"><bean:message key="Sales_O/S"/></label>
					
					<span id="spPerson" style="display:none">
					<b>&nbsp;&nbsp;&nbsp;Group By&nbsp;&nbsp;&nbsp;</b>
						<input type="radio" name="f_person_radio" id="f_person_radio1" class="radio_select" checked onClick=""><label for="f_person_radio1"><bean:message key="Sales_Person"/></label>
						<input type="radio" name="f_person_radio" id="f_person_radio2" class="radio_select" onClick=""><label for="f_person_radio2"><bean:message key="Operator"/></label>
	                    <input type="text" id="rlsd_usr_nm" value="" class="search_form-disable" style="width:120px;" readOnly><!-- 
	                      --><button type="button" name="rlsd_by" id="rlsd_by" class="input_seach_btn" tabindex="-1" onClick="doWork('FN_OPR_POPLIST',this)"></button>
	                    <input type="hidden"   id="rlsd_usrid"  value=""  class="search_form-disable" style="width:75px;">				
					</span>
				</td>
			</tr>

			<tr>
				<th><bean:message key="Branch"/>&nbsp;</th>
				<td colspan="3">
                   	<select name="f_ofc_cd" style="width:115px;">
                   	<bean:define id="officeList" name="valMap" property="officeList"/>
                   	 <bean:size id="len" name="officeList" />
                     	<logic:greaterThan name="len" value="1">
                     		<option value=''>ALL</option>
                        </logic:greaterThan>
	                    <logic:iterate id="ofcVO" name="officeList">
	                   	<script type="text/javascript">
	                   		ofcCntArr.push("<bean:write name="ofcVO" property="cnt_cd"/>");
	                   	</script>
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
				<th><bean:message key="Customer"/>&nbsp;</th>
				<td>
					<input type="radio" name="f_cust_radio" id="f_cust_radio" class="radio_select" checked  onClick="javascript:chkCustomer();"><label for="f_cust_radio"><bean:message key="Customer"/></label>
				</td>
				<td>
					<input type="radio" name="f_cust_radio" id="f_cust_radio2" class="radio_select" onClick="javascript:chkCustomer();"><label for="f_cust_radio2"><bean:message key="Account_Group_ID"/></label>
				</td>
				<td>
					<select name="f_acct_cd" id="f_acct_cd" style="width:170px;">
					<option value=''>All</option>
	               	<bean:define id="acctCdList" name="valMap" property="acctCdList"/>
	                   <logic:iterate id="acct_cd" name="acctCdList">
	                   	<option value='<bean:write name="acct_cd"/>'><bean:write name="acct_cd"/></option>
	                   </logic:iterate>
	               	</select>
				</td>
                <td>
                	<input type="text" name="f_cust_trdp_cd" maxlength="20"  value="" onKeyDown="codeNameAction('cust_trdpcode',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('cust_trdpcode',this, 'onBlur')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:90px" class="search_form"><!-- 
                --><button name="customer" id="customer" type="button" class="input_seach_btn" tabindex="-1" onClick="doWork('TRDP_POPLIST')"></button><!-- 
                --><input type="text" name="f_cust_trdp_nm" maxlength="50" value="" dataformat="multilanguage" style="ime-mode:disabled; text-transform:uppercase;width:325px" onBlur="strToUpper(this);" onKeyPress="if(event.keyCode==13){doWork('TRDP_POPLIST_NAME');}" class="search_form"><!-- 
                OFVFOUR-7394: [Webtrans] Adding grid for Invoice list by customer
                --><button type="button" class="btn_etc" id="retBtn" onclick="doWork('SEARCHLIST01')" onKeyDown="if(event.keyCode == 9){frm1.f_totamt_tot.focus();};"><bean:message key="Search"/></button></td>
                </td>
			</tr>
			<tr>
				<td></td>
                <td colspan="3">
                <script language="javascript">comSheetObject('sheet1');</script>
                </td>
			</tr>
		</tbody>
	</table>
	<!--OFVFOUR-7394: [Webtrans] Adding grid for Invoice list by customer-->
	<table>
		<colgroup>
			<col width="110" />
			<col width="580" />
			<col width="80" />
			<col width="200" />
			<col width="*" />
		</colgroup>
		<tbody>
			<tr>
                <td></td>
                <td colspan="4">
                <div class="opus_design_grid" style="width: 1300px;">
					<script type="text/javascript">comSheetObject('sheet2');</script>
				</div>
				</td>
             </tr>
           	<tr>
				<td></td>
				<td></td>
				<th><bean:message key="Total_Amount"/></th>
                <td>
					<input type="text" name="f_totamt_tot" value="0.00" style="width:150px;text-align:right;font-weight:bold" class="search_form-disable" readOnly>
				</td>
				<td></td>
			</tr>
		</tbody>
	</table>
	
	<table>
		<colgroup>
			<col width="110" />
			<col width="110" />
			<col width="100" />
			<col width="210" />
			<col width="*" />
		</colgroup>
		<tbody>
			<tr>
			 	<th><bean:message key="Period_Type"/>&nbsp;</th>
				<td>
					<input type="radio" name="f_per_radio" id="f_per_radio1" class="radio_select" checked><label for="f_per_radio1"><bean:message key="Post_Date"/></label>
				</td>
				<td>
					<input type="radio" name="f_per_radio" id="f_per_radio2" class="radio_select"><label for="f_per_radio2"><bean:message key="Due_Date"/></label>
				</td>
				<td>
					<input type="radio" name="f_per_radio" id="f_per_radio3" class="radio_select"><label for="f_per_radio3"><bean:message key="Invoice_Date"/> (<bean:message key="Sort_By"/> <bean:message key="Invoice_Date"/>)</label>
				</td>
				<td>
               		<input type="radio" name="f_per_radio" id="f_per_radio4" class="radio_select"><label for="f_per_radio4"><bean:message key="Invoice_Date"/> (<bean:message key="Sort_By"/> <bean:message key="Invoice_No"/>)</label>
               	</td>
			</tr>
			<tr>
				<td></td>
				<td>
					<input type="radio" name="f_date_radio" id="f_date_radio1" class="radio_select" onclick="dateFieldChange('1')" ><label for="f_date_radio1"><bean:message key="As_of"/></label>
				</td>
				<td>
					<input type="radio" name="f_date_radio" id="f_date_radio2" class="radio_select" onclick="dateFieldChange('2')" checked><label for="f_date_radio2"><bean:message key="Period"/></label>
				</td>
				<td id="date_td1">
					<input type="text" name="per_dt" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1)" style="width:70px;" maxlength="10" class="search_form"><!-- 
				--><button type="button" name="per_dt_cal" id="per_dt_cal"  class="calendar ir" onclick="doDisplay('DATE11', frm1);"></button>
				</td>
				<td id="date_td2"  style="display:none;">
					<input type="text" name="per_strdt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, this, frm1.per_enddt);firCalFlag=false;" style="width:70px;" maxlength="10" class="search_form"><!-- 
				--><span class="dash">~</span><input type="text" name="per_enddt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, frm1.per_strdt, this);firCalFlag=false;" style="width:70px;" maxlength="10" class="search_form"><!-- 
				--><button type="button" name="per_dt2_cal" id="per_dt2_cal"  class="calendar ir" onclick="doDisplay('DATE12', frm1);"></button>
				</td>
			</tr>
		</tbody>
	</table>
	<table>
		<colgroup>
			<col width="110" />
			<!-- OFVFOUR-8070: [ALA WHITELINE] Add the options to the Local Statement -->
			<col width="110" />
			<col width="*" />
		</colgroup>
		<tbody>
			<tr>
				<th><bean:message key="Currency"/>&nbsp;</th>
				<td>
                   	<select name="f_curr_cd" style="width:115px;">
                   	<option value=''>All</option>
                   	<bean:define id="currencyList" name="valMap" property="currencyList"/>
                       <logic:iterate id="currVO" name="currencyList">
                       	<option value='<bean:write name="currVO" property="cd_val"/>'><bean:write name="currVO" property="cd_nm"/></option>
                       </logic:iterate>
                   	</select>
				</td>
				<!-- OFVFOUR-8070: [ALA WHITELINE] Add the options to the Local Statement -->
				<th style="width:115px;">Tax Assigned</th>
				<td>
					<select name="f_tax_opt" style="width:115px;">
						<option value="">All</option>
						<option value="Y">Yes</option>
						<option value="N">No</option>
					</select>
				</td>
			</tr>
		</tbody>
	</table>
	<table>
		<colgroup>
			<col width="110" />
			<col width="110" />
			<col width="100" />
			<col width="100" />
			<col width="*" />
		</colgroup>
		<tbody>
			<tr>
				 <th><bean:message key="Department_Type"/>&nbsp;</th>
				 <td>
                 	<input name="f_dpt_tp_1" id="f_dpt_tp_1" type="checkbox" class="radio_select" checked>
	              <label for="f_dpt_tp_1"><bean:message key="Air_Import"/></label></td>
                 <td><input name="f_dpt_tp_2" id="f_dpt_tp_2" type="checkbox" class="radio_select" checked><label for="f_dpt_tp_2"><bean:message key="Air_Export"/></label></td>
                 <td><button id="btnPrint" type="button" btnAuth="<%= roleBtnVO.getAttr5() %>" class="btn_etc" onclick="doWork('ALL_DPT')"><bean:message key="All"/></button><!-- 
                  --><button id="btnPrint" type="button" btnAuth="<%= roleBtnVO.getAttr5() %>" class="btn_etc" onclick="doWork('CLEAR_DPT')"><bean:message key="Clear"/></button></td>
			</tr>
			<tr>
				<td></td>
                <td>
                	<input name="f_dpt_tp_3" id="f_dpt_tp_3" type="checkbox" class="radio_select" checked>
                	<label for="f_dpt_tp_3"><bean:message key="Ocean_Import"/></label></td>
                <td>
                	<input name="f_dpt_tp_4" id="f_dpt_tp_4" type="checkbox" class="radio_select" checked>
                	<label for="f_dpt_tp_4"><bean:message key="Ocean_Export"/></label></td>
                <td><input name="f_dpt_tp_5" id="f_dpt_tp_5" type="checkbox" class="radio_select" checked/><label for="f_dpt_tp_5"><bean:message key="Other_Operation"/></label></td>
                <td><input name="f_dpt_tp_6" id="f_dpt_tp_6" type="checkbox" class="radio_select" checked/><label for="f_dpt_tp_6"><bean:message key="Warehouse_Operation"/></label>
                <input name="f_dpt_tp_7" id="f_dpt_tp_7" type="checkbox" class="radio_select" checked/><label for="f_dpt_tp_7"><bean:message key="General"/></label>
                </td>
                
			</tr>
		</tbody>
	</table>
	<table>
		<colgroup>
			<col width="110" />
			<col width="110" />
			<col width="*" />
		</colgroup>
		<tbody>
			<tr>
				 <th><bean:message key="Report_Type"/>&nbsp;</th>
				 <td>
                 	<input name="f_rpt_tp_1" id="f_rpt_tp_1" type="checkbox" class="radio_select" checked>
                 	<label for="f_rpt_tp_1"><bean:message key="Local_Invoice"/></label></td>
                 <td>
                 	<input name="f_rpt_tp_2" id="f_rpt_tp_2" type="checkbox" class="radio_select" checked onclick="rptTypeChange()">
                 	<label for="f_rpt_tp_2"><bean:message key="Account_Payable"/></label></td>
			</tr>
			<tr>
			 	<th><bean:message key="Open_All"/>&nbsp;</th>
                <td>
                	<input type="radio" name="f_filter_by_radio" id="f_filter_by_radio1" class="radio_select"><label for="f_filter_by_radio1"><bean:message key="All"/></label>
                </td>
                <td>
                	<input type="radio" name="f_filter_by_radio" id="f_filter_by_radio2" class="radio_select" checked><label for="f_filter_by_radio2"><bean:message key="Open"/></label>
                </td>
			</tr>
		</tbody>
	</table>
	<table>
		<colgroup>
			<col width="110" />
			<col width="200" />
			<col width="200" />
			<col width="*" />
		</colgroup>
		<tbody>
			<tr>
			 	<td></td>
                <td>
               		<input type="checkbox" name="f_filter_by_chk_1" id="f_filter_by_chk_1" class="radio_select" checked><label for="f_filter_by_chk_1"><bean:message key="Invoice_Received_Only_AP"/></label>
               	</td>
                <td>
               		<input type="checkbox" name="f_filter_by_chk_2" id="f_filter_by_chk_2" class="radio_select"><label for="f_filter_by_chk_2"><bean:message key="Attached_Original_Invoice"/></label>
               	</td>
                <td>
               		<input type="checkbox" name="f_filter_by_chk_3" id="f_filter_by_chk_3" class="radio_select" disabled><label for="f_filter_by_chk_3"><bean:message key="Show_Previous_Balance"/></label>
               	</td>
			</tr>
		</tbody>
	</table>
		<table>
		<colgroup>
			<col width="110" />
			<col width="100" />
			<col width="100" />
			<col width="*" />
		</colgroup>
		<tbody>
			<tr>
				<th>Print Option</th>
				<td>
					<input type="radio" id="rdoOption1" name="rdoOption" checked /><label for="rdoOption1"><bean:message key="General" /></label>
				</td>
				<td>
					<input type="radio" id="rdoOption2" name="rdoOption" /><label for="rdoOption2"><bean:message key="Original" /></label>
				</td>
				<td>
					<input type="radio" id="rdoOption3" name="rdoOption" /><label for="rdoOption3"><bean:message key="Copy" /></label>
				</td>
			</tr>
		</tbody>
	</table>
</div>
<!-- opus_design_inquiry(E) -->
</div>
<!-- wrap_search(E) -->
<iframe name="pdfDn" style="width:0;height:0;visibility:hidden" border=0></iframe>
</div>
</form>	
<script type="text/javascript">
doBtnAuthority("<%= roleBtnVO.getAttr_extension() %>");
</script>	
		
<script>
	var pDoc = parent.parent.parent.document;
	hideProcess('WORKING', pDoc);
</script>


