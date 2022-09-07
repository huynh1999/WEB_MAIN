<%
/*=========================================================
 *Copyright(c) 2014 CyberLogitec
 *@FileName : PFM_ACC_0020.jsp
 *@FileTitle : Agent Statement
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
	
	<!-- 일자 및 달력팝업 호출 -->
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/PFM_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/pfm/acc/accounting/script/PFM_ACC_0020.js?ver=<%=CLT_JS_VER%>"></script>
	
	<!-- #4389 Auto Complete 추가 -->
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/autocomplete_ui.js?ver=<%=CLT_JS_VER%>"></script>
	
	<bean:define id="valMap"  name="EventResponse" property="mapVal"/>
	<bean:define id="sysOfcVO"  name="valMap" property="sysOfcInfo"/>
	<bean:define id="usrOfcVO"  name="valMap" property="ofcInfo"/>
	
	<script type="text/javascript">
		var usrId = "<%= userInfo.getUsrid() %>";
		var usrPhn = "<%= userInfo.getPhn() %>";
		var usrFax = "<%= userInfo.getFax() %>";
		var usrNm = "<%= userInfo.getUser_name() %>";
		var usrEml = "<%= userInfo.getEml() %>";
		var ofcLoclNm = "<%= userInfo.getOfc_locl_nm() %>";
		var usrOfcCd = "<%= userInfo.getOfc_cd() %>";
		var usrCntCd = "<%= userInfo.getOfc_cnt_cd() %>";
		
		var ofcCntArr = new Array();
		ofcCntArr.push("");
		
		// #4389 Auto Complete 추가
		var AUTOCOMPLETE_YN = 'N';	
		
		<logic:notEmpty name="valMap" property="autocompleteYn">
	    	AUTOCOMPLETE_YN = '<bean:write name="valMap" property="autocompleteYn"/>';
		</logic:notEmpty>
		
		function setupPage(){
			loadPage();
			
			var agent = navigator.userAgent.toLowerCase(); 
			if (agent.indexOf("msie") != -1) { //ie 일 경우 pdfDownLoad 버튼은 무조건 안나온다.
			}else{
				getBtnObj("pdfDowns").style.display = 'inline';
			}
		}
	</script>
</head>
<form name="frm1" method="POST" action="./" onsubmit="return false;">
<!--Command를 담는 공통 -->
<input type="hidden" name="f_cmd" id="f_cmd" />
<input type="hidden" name="f_CurPage" id="f_CurPage" />

<input type="hidden" name="f_sys_ofc_cd" value="<bean:write name="sysOfcVO" property="ofc_cd"/>"/>

<!--  #2627 - [CLT] ACCT REPORT - ONE CURRENCY OPTION CURRENCY SETUP - item 2 by thoa.dien 170828 -->
<logic:notEmpty name="sysOfcVO" property="locl_curr_cd">
	<input type="hidden" name="f_sys_ofc_trf_cur_cd" value="<bean:write name="sysOfcVO" property="locl_curr_cd"/>"/>
</logic:notEmpty>
<logic:empty name="sysOfcVO" property="locl_curr_cd">
	<input type="hidden" name="f_sys_ofc_trf_cur_cd" value="<bean:write name="sysOfcVO" property="trf_cur_cd"/>"/>
</logic:empty>

<!--  #2627 - Changes from Office System Currency to set the local currency based on user's office's local currency information - Thoa.Dien.170928-->
<logic:notEmpty name="usrOfcVO" property="locl_curr_cd">
	<input type="hidden" name="f_usr_ofc_lcl_curr_cd" id="f_usr_ofc_lcl_curr_cd" value="<bean:write name="usrOfcVO" property="locl_curr_cd"/>"/>
</logic:notEmpty>
<logic:empty name="usrOfcVO" property="locl_curr_cd">
	<input type="hidden" name="f_usr_ofc_lcl_curr_cd" id="f_usr_ofc_lcl_curr_cd" value="<bean:write name="usrOfcVO" property="trf_cur_cd"/>"/>
</logic:empty>

<input type="hidden" name="f_sys_ofc_agent_stmt_rmk" value="<bean:write name="sysOfcVO" property="agent_stmt_rmk"/>"/>
<input type="hidden" name="f_dpt_tp" value="" id="f_dpt_tp" />
<input type="hidden" name="f_date_tp" value="" id="f_date_tp" />
<input type="hidden" name="f_agt_flg" value="" id="f_agt_flg" />
<input type="hidden" name="f_paid_flg" value="" id="f_paid_flg" />
<input type="hidden" name="f_locl_rcv_flg" value="" id="f_locl_rcv_flg" />
<!-- #433 [LOGIFOCUS] AGENT STATEMENT SEARCH DOESN'T SHOW OTHER FILE'S INVOICES --> 
<input type="hidden" name="f_sell_buy_tp" value="" id="f_sell_buy_tp" />

<!-- #447 [STAR CLUSTER] AGENT STATEMENT HEADER/FOOTER HQ OFFICE 정보가 아닌 소속 OFFICE -->
<input type="hidden" name="f_prnt_ofc_cd" value="<bean:write name="usrOfcVO" property="prnt_ofc_cd"/>"/>

<!-- Report Value -->
<input type="hidden" name="file_name" id="file_name" />
<input type="hidden" name="rd_param" id="rd_param" />
<input type="hidden" name="title" id="title" />
<!-- // CSR #2987 : AGENT STATEMENT EXPORTED FILE NAME -->
<input type="hidden" name="rpt_file_name_title"/>

<!--  Report ==> OutLook연동 파라미터 (S) -->
<input type="hidden" name="rpt_biz_tp" id="rpt_biz_tp" />
<input type="hidden" name="rpt_biz_sub_tp" id="rpt_biz_sub_tp" />
<input type="hidden" name="rpt_tp" id="rpt_tp" />
<input type="hidden" name="rpt_acc_grp_id" id="rpt_acc_grp_id" />
<input type="hidden" name="rpt_trdp_cd" id="rpt_trdp_cd" />
<input type="hidden" name="date_type_lbl" id="date_type_lbl" value="<bean:message key="Date_Type"/>" />
<!-- page_title_area(S) -->
<div class="page_title_area clear">
	<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
   <!-- btn_div -->
   <div class="opus_design_btn TOP">
   		<%-- 
	  	<span style="display:none;" btnAuth="<%= roleBtnVO.getAttr5() %>" ><button type="button" style="display:none;" id = "pdfDowns"  class="btn_accent" onclick="pdfDown('Print')"><bean:message key="PDF_download"/></button></span>
		<button id="btnPrint" type="button" style="display:none;" btnAuth="<%= roleBtnVO.getAttr5() %>" class="btn_accent" onclick="doWork('Print')"><bean:message key="Print"/></button>
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
			<col width="150" />
			<col width="10" />
			<col width="*" />
		</colgroup>
		<tbody>
			<th><bean:message key="Branch"/></th>
			<td>
               	<select name="f_ofc_cd" id="f_ofc_cd" style="width:115px;" onchange="setHeaderFooter();">           	
               	<bean:define id="officeList" name="valMap" property="officeList"/>
                    <bean:size id="len" name="officeList" />
                      <logic:greaterThan name="len" value="1">
                     	  <option value='' >ALL</option>
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
			<td>
            	<input name="f_by_bill_to" id="f_by_bill_to" type="checkbox" class="radio_select">
            </td>
            <td><label for="f_by_bill_to"><bean:message key="By_Bill_To"/></label></td>
			</tr>
		</tbody>
	</table>
	<table>
		<colgroup>
			<col width="110" />
			<col width="150" />
			<col width="150" />
			<col width="230" />
			<col width="*" />
		</colgroup>
		<tbody>
			<tr>
               	<th><bean:message key="Agent"/></th>
               	<td>
				<input type="radio" name="f_agt_radio" id="f_agt_radio" class="radio_select" checked  onClick="javascript:chkAgent();"><label for="f_agt_radio"><bean:message key="Agent"/></label>
				</td>
				<td>
				<input type="radio" name="f_agt_radio" id="f_agt_radio2" class="radio_select" onClick="javascript:chkAgent();"><label for="f_agt_radio2"><bean:message key="Account_Group_ID"/></label>
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
	               	<input type="text" name="f_agt_trdp_cd" id="f_agt_trdp_cd" maxlength="20" value="" onKeyDown="codeNameAction('agt_trdpcode',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('agt_trdpcode',this, 'onBlur')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:80px" class="search_form"><!-- 
	             --><button type="button" name="agent" id="agent"  class="input_seach_btn" tabindex="-1" onClick="doWork('TRDP_POPLIST')"></button><!-- 
	             --><input type="text" name="f_agt_trdp_nm" id="f_agt_trdp_nm" maxlength="50" value="" onBlur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:315px" onKeyPress="if(event.keyCode==13){doWork('TRDP_POPLIST_NAME');}" class="search_form"><!-- 
	             --><button type="button" class="btn_etc" id="retBtn" onclick="doWork('SEARCHLIST')" onKeyDown="if(event.keyCode == 9){frm1.f_totamt_tot.focus();};"><bean:message key="Search"/></button></td>
            </tr>
		</tbody>
	</table>
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
                <div class="opus_design_grid" style="width: 1120px; padding-left: 100px;">
					<script type="text/javascript">comSheetObject('sheet1');</script>
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
			<col width="140" />
			<col width="140" />
			<col width="140" />
			<col width="140" />
			<col width="*" />
		</colgroup>
		<tbody>
			<tr>
				<th><bean:message key="Date_Type"/></th>
				<td>
					<input value="<bean:message key="Post_Date"/>" type="radio" name="f_per_radio" id="f_per_radio" class="radio_select" onclick="dateTypeChange('N');get_fPerRadio(this)" checked><label for="f_per_radio"><bean:message key="Post_Date"/></label>
				</td>
				<td>
					<input value="<bean:message key="ETD"/>" type="radio" name="f_per_radio" id="f_per_radio2" class="radio_select" onclick="dateTypeChange('Y');get_fPerRadio(this)"><label for="f_per_radio2"><bean:message key="ETD"/></label>
				</td>
				<td>
					<input value="<bean:message key="Invoice_Date"/>" type="radio" name="f_per_radio" id="f_per_radio3" class="radio_select" onclick="dateTypeChange('N');get_fPerRadio(this)"><label for="f_per_radio3"><bean:message key="Invoice_Date"/></label>
				</td>
				<td>
               		<input value="<bean:message key="ETA"/>" type="radio" name="f_per_radio" id="f_per_radio4" class="radio_select" onclick="dateTypeChange('Y');get_fPerRadio(this)"><label for="f_per_radio4"><bean:message key="ETA"/></label>
               	</td>
				<td>
               		<input type="checkbox" name="f_per_chk" id="f_per_chk" class="radio_select" disabled><label for="f_per_chk"><bean:message key="ETD_ETA"/></label>
               	</td>
			</tr>
		</tbody>
	</table>
	<table>
		<colgroup>
			<col width="110" />
			<col width="140" />
			<col width="140" />
			<col width="*" />
		</colgroup>
		<tbody>
			<tr>
              	<td></td>
              	<!-- OFVFOUR-7479: [SOUTH EAST] Add " As Of " to the date option on the Agent Statement search page  -->
              	<td>
					<input type="radio" name="f_date_radio" id="f_date_radio1" class="radio_select" onclick="dateFieldChange('1')" ><label for="f_date_radio1"><bean:message key="As_of"/></label>
				</td>
				<td>
					<input type="radio" name="f_date_radio" id="f_date_radio2" class="radio_select" onclick="dateFieldChange('2')" checked><label for="f_date_radio2"><bean:message key="Period"/></label>
				</td>
				<td>
					<!-- <bean:message key="Period"/>&nbsp;&nbsp;&nbsp;-->
				   <input type="text" name="per_strdt" id="per_strdt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, this, frm1.per_enddt);firCalFlag=false;" style="width:70px;" maxlength="10" class="search_form"><!-- 
				--><span class="dash" id="dash1">~</span><!-- 
				--><input type="text" name="per_enddt" id="per_enddt" onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, frm1.per_strdt, this);firCalFlag=false;" style="width:70px;" maxlength="10" class="search_form"><!-- 
				--><button type="button" name="per_dt_cal" id="per_dt_cal" onclick="doDisplay('DATE11', frm1);" class="calendar ir"></button>
				   <button type="button" name="per_dt2_cal" id="per_dt2_cal" style="display: none;" class="calendar ir" onclick="doDisplay('DATE12', frm1);"></button>
				</td>
             </tr>
		</tbody>
	</table>
	<table>
		<colgroup>
			<col width="110" />
			<col width="*" />
		</colgroup>
		<tbody>
			<tr>
				<th><bean:message key="Currency"/></th>
				<td >
                   	<select name="f_curr_cd" style="width:115px;">
                   	<option value=''>All</option>
                   	<bean:define id="currencyList" name="valMap" property="currencyList"/>
                       <logic:iterate id="currVO" name="currencyList">
                       	<option value='<bean:write name="currVO" property="cd_val"/>'><bean:write name="currVO" property="cd_nm"/></option>
                       </logic:iterate>
                   	</select>
				</td>
			</tr>
		</tbody>
	</table>
	<table>
		<colgroup>
			<col width="110" />
			<col width="110" />
			<col width="110" />
			<col width="*" />
		</colgroup>
		<tbody>
			<tr>
                <th><bean:message key="Department_Type"/></th>
				<td>
                	<input name="f_dpt_tp_1" id="f_dpt_tp_1" type="checkbox" class="radio_select" checked>
	              <label for="f_dpt_tp_1"><bean:message key="Air_Import"/></label></td>
                <td>
                	<input name="f_dpt_tp_2" id="f_dpt_tp_2" type="checkbox" class="radio_select" checked>
                	<label for="f_dpt_tp_2"><bean:message key="Air_Export"/></label></td>
                <td><button class="btn_etc" onclick="doWork('ALL_DPT')"><bean:message key="All"/></button><!-- 
                 --><button class="btn_etc" onclick="doWork('CLEAR_DPT')"><bean:message key="Clear"/></button></td>
             </tr>
             <tr>
				<td></td>
                <td>
                	<input name="f_dpt_tp_3" id="f_dpt_tp_3" type="checkbox" class="radio_select" checked>
               		<label for="f_dpt_tp_3"><bean:message key="Ocean_Import"/></label></td>
                <td>
                	<input name="f_dpt_tp_4" id="f_dpt_tp_4" type="checkbox" class="radio_select" checked>
                	<label for="f_dpt_tp_4"><bean:message key="Ocean_Export"/></label></td>
                <td colspan="2">
                	<input name="f_dpt_tp_5" id="f_dpt_tp_5" type="checkbox" class="radio_select" checked>
                	<label for="f_dpt_tp_5"><bean:message key="Other_Operation"/></label>
                </td>
			</tr>
		</tbody>
	</table>
	<table>
		<colgroup>
			<col width="110" />
			<col width="110" />
			<col width="110" />
			<col width="120" />
			<col width="*" />
		</colgroup>
		<tbody>
			<tr>
                <th><bean:message key="Report_By"/></th>
			 	<td>
                	<input name="f_debit_sell_buy_tp_cd" id="f_debit_sell_buy_tp_cd" type="checkbox" class="radio_select" checked onClick="javascript:chkRptType();">
                	<label for="f_debit_sell_buy_tp_cd"><bean:message key="Debit"/></label></td>
                <td>
                	<input name="f_credit_sell_buy_tp_cd" id="f_credit_sell_buy_tp_cd" type="checkbox" class="radio_select" checked onClick="javascript:chkRptType();">
               		<label for="f_credit_sell_buy_tp_cd"><bean:message key="Credit"/></label></td>
               	<td>
                	<input name="f_ar_sell_buy_tp_cd" id="f_ar_sell_buy_tp_cd" type="checkbox" class="radio_select">
               		<label for="f_ar_sell_buy_tp_cd"><bean:message key="AR_By_Agent"/></label></td>
				<td>
                	<input name="f_ap_sell_buy_tp_cd" id="f_ap_sell_buy_tp_cd" type="checkbox" class="radio_select">
               		<label for="f_ap_sell_buy_tp_cd"><bean:message key="AP_By_Agent"/></label></td>               	
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
				<th>Header/Footer</th>
				<td>
					<select name="header_ofc_cd" id="header_ofc_cd" style="width:115px;">           	
						<bean:define id="officeList" name="valMap" property="officeList"/>
							<logic:iterate id="ofcVO" name="officeList">
								<option value='<bean:write name="ofcVO" property="ofc_cd"/>'><bean:write name="ofcVO" property="ofc_cd"/></option>
							</logic:iterate>
					</select>
				</td>
				<td> /
					<select name="footer_ofc_cd" id="footer_ofc_cd" style="width:115px;">           	
						<bean:define id="officeList" name="valMap" property="officeList"/>
							<logic:iterate id="ofcVO" name="officeList">
								<option value='<bean:write name="ofcVO" property="ofc_cd"/>'><bean:write name="ofcVO" property="ofc_cd"/></option>
							</logic:iterate>
					</select>
				</td>
			</tr>
		</tbody>
	</table>
	<table>
		<colgroup>
			<col width="110" />
			<col width="110" />
			<col width="110" />
			<col width="120" />
			<col width="145" />
			<!-- OFVFOUR-7485 [Webtrans] Previous Balance option on Agent Statement -->
			<col width="80" />
			<col width="*" />
		</colgroup>
		<tbody>
			<tr>
                <th><bean:message key="Filter_By"/></th>
                <td>
                	<input type="radio" name="f_filter_by_radio" id="f_filter_by_radio1" class="radio_select">
                	<label for="f_filter_by_radio1"><bean:message key="All"/></label>
                </td>
                <td>
                	<input type="radio" name="f_filter_by_radio" id="f_filter_by_radio2" class="radio_select" checked>
                	<label for="f_filter_by_radio2"><bean:message key="Open"/></label>
                </td>
                <td>
                	<input type="radio" name="f_filter_by_radio" id="f_filter_by_radio3" class="radio_select">
                	<label for="f_filter_by_radio3"><bean:message key="Paid"/></label>
                </td>
                <td>
               		<input type="checkbox" name="f_filter_by_chk_1" id="f_filter_by_chk_1" class="radio_select">
               		<label for="f_filter_by_chk_1"><bean:message key="Local_AR_Received"/></label>
               	</td>
                <td>
               		<input type="checkbox" name="f_filter_by_chk_2" id="f_filter_by_chk_2" class="radio_select">
               		<label for="f_filter_by_chk_2"><bean:message key="Detail"/></label>
               	</td>
               	<!-- OFVFOUR-7485 [Webtrans] Previous Balance option on Agent Statement -->
               	<td>
               		<input type="checkbox" name="f_filter_by_chk_5" id="f_filter_by_chk_5" class="radio_select">
               		<label for="f_filter_by_chk_5"><bean:message key="Removed_previous_balance"/></label>
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
                <td></td>
                <td>
              		<input type="checkbox" name="f_filter_by_chk_3" id="f_filter_by_chk_3" class="radio_select" disabled><label for="f_filter_by_chk_3"><bean:message key="Attached_CR_DR_Note_Invoice"/></label>
              	</td>
                <td>
              		<input type="checkbox" name="f_filter_by_chk_4" id="f_filter_by_chk_4" class="radio_select" checked><label for="f_filter_by_chk_4"><bean:message key="Show_Local_AR_Paid_Status"/></label>
              	</td>
             </tr>
		</tbody>
	</table>
	<table>
		<colgroup>
			<col width="110" />
			<col width="180" />
			<col width="100" />
			<col width="*" />
		</colgroup>
		<tbody>
			<tr>
                <th><bean:message key="Order_By"/></th>
                <td>
                	<input type="radio" name="f_order_by_radio" id="f_order_by_radio1" class="radio_select" checked>
                	<label  id="fPerRadioValue" for="f_order_by_radio1"></label>
                </td>
                <td>
                	<input type="radio" name="f_order_by_radio" id="f_order_by_radio2" class="radio_select">
                	<label for="f_order_by_radio2"><bean:message key="Filling_No"/></label>
                </td>
                 <td>
                	<input type="radio" name="f_order_by_radio" id="f_order_by_radio3" class="radio_select">
                	<label for="f_order_by_radio3"><bean:message key="Due_Date"/></label>
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
<div class="opus_design_grid">
	<script type="text/javascript">comSheetObject('sheet2');</script>
</div>
<!-- opus_design_grid(E) -->
</div>
<!-- wrap_result(E) -->
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


