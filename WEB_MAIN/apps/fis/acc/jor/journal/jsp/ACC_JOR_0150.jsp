<%
/*=========================================================
*Copyright(c) 2015 CyberLogitec. All Rights Reserved.
*@FileName   : ACC_JOR_0150.jsp
*@FileTitle  : Bad Debit List
*@author     : 
*@version    : 1.0
*@since      : 20150301
=========================================================*/
%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@page import="com.clt.framework.component.util.JSPUtil"%></html>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->	
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	<script type="text/javascript"src="<%=CLT_PATH%>/apps/fis/acc/jor/journal/script/ACC_JOR_0150.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript"src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/ACC_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>    
	<!-- 일자 및 달력팝업 호출 -->
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	
	<!-- #2396 [BINEX] Volume and Profit Report: +-를 기능 점검 -->
	<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_CODE_UTIL.js?ver=<%=CLT_JS_VER%>"></script>
	
	<title><bean:message key="system.title"/></title>
	
	<%@ page import="com.clt.syscommon.response.CommonEventResponse"%>
	<bean:define id="valMap"  name="EventResponse" property="mapVal"/>
	<bean:define id="sysOfcVO"  name="valMap" property="sysOfcInfo"/>
	<bean:define id="usrOfcVO"  name="valMap" property="ofcInfo"/>
	
	<%
		String ofc_cd		= userInfo.getOfc_cd();
		String ofc_eng_nm 	= userInfo.getOfc_eng_nm();
		String usrNm = userInfo.getUser_name();
	%>
<script>
function setupPage(){
	loadPage();
}
var usrNm = "<%= userInfo.getUser_name() %>";
var user_id = "<%=userInfo.getUsrid()%>";
var user_eml = "<%=userInfo.getEml()%>";
var user_phn = "<%=userInfo.getPhn()%>";
var user_fax = "<%=userInfo.getFax()%>";
var ofc_eng_nm = "<%=ofc_eng_nm%>";
</script>
  <body class="td" onload="javascript:loadPage();">
	<form name="frm1" method="post" action="./ACCJOR_0150.clt" style="margin:0px">
	<input type="hidden" name="f_cmd" id="f_cmd"/>
	<input type="hidden" name="f_CurPage" id="f_CurPage"/>
	<input type="hidden" name="pageurl" id="pageurl" value="./ACCJOR_0150.clt"/>
	
	<!--  #2627 - [CLT] ACCT REPORT - ONE CURRENCY OPTION CURRENCY SETUP - by thoa.dien 170828-->
	<logic:notEmpty name="sysOfcVO" property="locl_curr_cd">
		<input type="hidden" name="f_sys_ofc_trf_cur_cd" id="f_sys_ofc_trf_cur_cd" value="<bean:write name="sysOfcVO" property="locl_curr_cd"/>"/>
	</logic:notEmpty>
	<logic:empty name="sysOfcVO" property="locl_curr_cd">
		<input type="hidden" name="f_sys_ofc_trf_cur_cd" id="f_sys_ofc_trf_cur_cd" value="<bean:write name="sysOfcVO" property="trf_cur_cd"/>"/>
	</logic:empty>
	<!--  #2627 - Changes from Office System Currency to set the local currency based on user's office's local currency information - Thoa.Dien.170928-->
	<logic:notEmpty name="usrOfcVO" property="locl_curr_cd">
		<input type="hidden" name="f_usr_ofc_lcl_curr_cd" id="f_usr_ofc_lcl_curr_cd" value="<bean:write name="usrOfcVO" property="locl_curr_cd"/>"/>
	</logic:notEmpty>
	<logic:empty name="usrOfcVO" property="locl_curr_cd">
		<input type="hidden" name="f_usr_ofc_lcl_curr_cd" id="f_usr_ofc_lcl_curr_cd" value="<bean:write name="usrOfcVO" property="trf_cur_cd"/>"/>
	</logic:empty>
	
	<input type="hidden" name="file_name">
	<input type="hidden" name="title">
	<input type="hidden" name="f_rpt_type" id="f_rpt_type"/>
	<input type="hidden" name="rd_param" id="rd_param"/>
	 
	
	<!-- page_title_area(S) -->
	<div class="page_title_area clear">
		<!-- page_title(S) -->
		<!-- 타이틀 내용 동적생성 (별도 코딩 불필요) -->
		<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
		<!-- page_title(E) -->
		<!-- opus_design_btn(S) -->
		<div class="opus_design_btn TOP">
			<%-- 
			 <button type="button" class="btn_accent" onclick="doWork('SEARCH')"><bean:message key="Search"/></button> 
			 <button type="button" class="btn_normal" onClick="doWork('PRINT');" name="btn_Print"><bean:message key="Print"/></button> 	 
			 <button type="button" class="btn_normal" onClick="doWork('EXCEL');" name="btn_DownExcel"><bean:message key="Excel"/></button>
			--%>
		</div>
		<!-- opus_design_btn(E) -->
		<!-- page_location(S) -->
		<div class="location">
			<span><%=LEV1_NM%></span> &gt;
		 	<span><%=LEV2_NM%></span> &gt;
		  	<span><%=LEV3_NM%></span>
	   		<a href="" class="ir">URL Copy</a>
		</div>
	</div>
<!-- opus_design_inquiry(S) -->	
<div class="over_wrap" height="100%">
<div class="wrap_search">
			<!-- h3 class="title_design"><bean:message key="Search_Condition"/></h3 -->
			<div class="opus_design_inquiry entry_pannel ">
				<table>
					   <colgroup>
				        	<col width="140">
				        	<col width="128">
				        	<col width="140">
				        	<col width="200">
				        	<col width="*">
					   </colgroup>
					   <tbody>
							<tr>
								<th><label style="background-color:#d4f6ff;"><bean:message key="Aging_Report_Type"/></label></th>
		                        <td><input name="f_agn_rpt_tp_1" id="f_agn_rpt_tp_1" value="A" type="checkbox" class="radio_select" checked>
		                        	<label for="f_agn_rpt_tp_1"><bean:message key="Debit_Note"/></label>
		                        </td>
		                        <td>
		                        	<input name="f_agn_rpt_tp_2" id="f_agn_rpt_tp_2" value="A" type="checkbox" class="radio_select" checked>
		                        	<label for="f_agn_rpt_tp_2"><bean:message key="Local_Invoice"/></label>
		                        </td>
		                        <td>
		                        	<input name="f_agn_rpt_tp_6" id="f_agn_rpt_tp_6" value="A" type="checkbox" class="radio_select" checked>
		                        	<label for="f_agn_rpt_tp_6"><bean:message key="General_AR"/></label>
		                        </td>
		                        <td><!-- 
										--><button  onclick="doWork('ALL_AGN')" type="button" class="btn_etc"><bean:message key="All"/></button><!-- 
										--><button  onclick="doWork('CLEAR_AGN')" type="button"  class="btn_etc"><bean:message key="Clear"/></button>
		                        </td>
							</tr>
							<tr>
								<td></td>
		                        <td>
		                        	<input name="f_agn_rpt_tp_3" id="f_agn_rpt_tp_3" value="A" type="checkbox" class="radio_select" checked>
		                       		<label for="f_agn_rpt_tp_3"><bean:message key="Credit_Note"/></label>
		                        </td>
		                        <td>
		                        	<input name="f_agn_rpt_tp_4" id="f_agn_rpt_tp_4" value="A" type="checkbox" class="radio_select" checked>
		                        	<label for="f_agn_rpt_tp_4"><bean:message key="Account_Payable"/></label>
		                        </td>
		                        <td colspan="2">
		                        	<input name="f_agn_rpt_tp_5" id="f_agn_rpt_tp_5" value="A" type="checkbox" class="radio_select" checked>
		                        	<label for="f_agn_rpt_tp_5"><bean:message key="General_AP"/></label>
		                        </td>
							</tr>
				 		</tbody>
							<tr>
								<th><label style="background-color:#d4f6ff;"><bean:message key="Department_Type"/></label></th>
		                        <td>
		                        	<input name="f_dpt_tp_1" id="f_dpt_tp_1" type="checkbox" value="A" onclick="checkReleased()" class="radio_select" checked>
		                        	<label for="f_dpt_tp_1"><bean:message key="Ocean_Import"/></label>
		                        </td>
		                        <td>
		                        	<input name="f_dpt_tp_2"  id="f_dpt_tp_2" type="checkbox" value="A" onclick="checkReleased()" class="radio_select" checked>
		                       		<label for="f_dpt_tp_2"><bean:message key="Ocean_Export"/></label>
		                        </td>
		                        <td>
		                        	<input name="f_dpt_tp_3"  id="f_dpt_tp_3" type="checkbox" value="A" onclick="checkReleased()" class="radio_select" checked>
		                        	<label for="f_dpt_tp_3"><bean:message key="Other_Operation"/></label>
		                        </td>
		                        <td><!-- 
										--><button  onclick="doWork('ALL_DPT')" type="button" class="btn_etc"><bean:message key="All"/></button><!-- 
										--><button  onclick="doWork('CLEAR_DPT')" type="button"  class="btn_etc"><bean:message key="Clear"/></button>
		                        </td>
							</tr>
							<tr>
								<td></td>
		                        <td>
		                        	<input name="f_dpt_tp_4" id="f_dpt_tp_4" type="checkbox" value="A"onclick="checkReleased()" class="radio_select" checked>
		                        	<label for="f_dpt_tp_4"><bean:message key="Air_Import"/></label>
		                        </td>
		                        <td>
		                        	<input name="f_dpt_tp_5" id="f_dpt_tp_5" type="checkbox" value="A" onclick="checkReleased()" class="radio_select" checked>
		                       		<label for="f_dpt_tp_5"><bean:message key="Air_Export"/></label>
		                        </td>
		                        <td >
		                        	<input name="f_dpt_tp_6" id="f_dpt_tp_6" type="checkbox" value="A" onclick="checkReleased()" class="radio_select" checked>
		                       		<label for="f_dpt_tp_6"><bean:message key="Individual_Invs_ARAPs"/></label>
		                        </td>
		                        <td>
		                        	<input name="f_dpt_tp_7"  id="f_dpt_tp_7" type="checkbox"  value="A" onclick="checkReleased()" class="radio_select" checked>
		                        	<label for="f_dpt_tp_7"><bean:message key="Warehouse_Operation"/></label>
		                        </td>
							</tr>
				 		</tbody>
				</table>
				<table>
						<colgroup>
				        	<col width="140">
				        	<col width="128">
				        	<col width="140">
				        	<col width="*">
					   </colgroup>
					   <tbody>
							<tr>
								<th></th>
								<td>
									<input type="radio" name="f_date_radio" id="f_date_radio1" value="A" class="radio_select" onclick="dateFieldChange('1')" checked><label for="f_date_radio1"><bean:message key="As_of"/></label>
								</td>
								<td>
									<input type="radio" name="f_date_radio" id="f_date_radio2" value="P" class="radio_select" onclick="dateFieldChange('2')" ><label for="f_date_radio2"><bean:message key="Period"/></label>
								</td>
								<td id="date_td" style="width: 150px">
									<span id="span_start_dt" style="display: none">
									<input required style="width:86px" type="text" name="f_start_dt" id="f_start_dt" onKeyUp="onlyNumberCheck();mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="onlyNumberCheck();chkCmprPrd(firCalFlag, false, this, this, frm1.f_end_dt);firCalFlag=false;" maxlength="10" class="search_form">
									<span class="dash">~</span>
									</span>
									<input required style="width:86px" type="text" name="f_end_dt" id="f_end_dt" onKeyUp="onlyNumberCheck();mkDateFormatType(this, event, false, 1);" onBlur="onlyNumberCheck();mkDateFormatType(this, event, true, 1);" maxlength="10" class="search_form">
									<button type="button" class="calendar" tabindex="-1" name="eta_dt_cal" id="f_dt_cal" onclick="doDisplay('DATE11', frm1);"></button>
								</td>
								<td>
									<input type="radio" name="f_dt_tp_radio" id="f_dt_tp_radio" value="P" class="radio_select" checked><label for="f_dt_tp_radio"><bean:message key="Post_Date"/></label>
									<input type="radio" name="f_dt_tp_radio" id="f_dt_tp_radio2" value="I" class="radio_select" ><label for="f_dt_tp_radio2"><bean:message key="Invoice_Date"/></label>
								</td>
							</tr>
							<tr>
								<th><bean:message key="Currency"/></th>
								<td colspan="2">
		                           	<select name="f_curr_cd" id="f_curr_cd" style="width:115px;">
		                           	<bean:define id="currencyList" name="valMap" property="currencyList"/>
		                               <logic:iterate id="currVO" name="currencyList">
		                               	<option value='<bean:write name="currVO" property="cd_val"/>'><bean:write name="currVO" property="cd_nm"/></option>
		                               </logic:iterate>
		                           	</select>
								</td>
							</tr>
							<tr>
								<th><bean:message key="Branch"/></th>
								<td colspan="2">
		                           	<select name="f_ofc_cd" id="f_ofc_cd" style="width:115px;">
		                           	<bean:define id="officeList" name="valMap" property="officeList"/>
			                            <bean:size id="len" name="officeList" />
			                            <logic:greaterThan name="len" value="1">
			                            	<option value=''>ALL</option>
			                            </logic:greaterThan>
		                                <logic:iterate id="ofcVO" name="officeList">
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
								<th><bean:message key="Accounting_Type"/></th>
								<td>
									<input type="radio" name="f_acct_tp_radio" id="f_acct_tp_radio" class="radio_select" checked value="A"  ><label for="f_acct_tp_radio"><bean:message key="Accrual_Basis"/></label>
								</td>
								<td>
									<input type="radio" name="f_acct_tp_radio" id="f_acct_tp_radio2" class="radio_select" value="C" > <label for="f_acct_tp_radio2"><bean:message key="Cash_Basis"/></label>
								</td>
							</tr>
							<tr>
								<th><label for="released_check"><bean:message key="Cargo_Released_Only"/></label></th>
		                        <td colspan="2">
		                        	<input name="released_check" id="released_check" type="checkbox" value="O" class="radio_select">
		                        </td>
							</tr>
				 		</tbody>
				</table>
			</div>
	</div>

<!-- opus_design_result(S) -->
<div class="wrap_result">
	<!-- opus_design_grid(S) -->
    <div class="opus_design_grid">
	    <!-- #2396 [BINEX] Volume and Profit Report: +-를 기능 점검 -->
		<div class="opus_design_btn">
			<button type="button" class="btn_accent" onClick="setSizeUp(docObjects[0], '700')"><bean:message key="Plus"/></button>
			<button type="button" class="btn_normal"  onClick="setSizeDown(docObjects[0], '280')"><bean:message key="Minus"/></button>
		</div>	   	 	
		<script type="text/javascript">comSheetObject('sheet1');</script>
   	</div>
   	<!-- opus_design_grid(E) -->	

</div>
<!-- opus_design_result(E) -->
</div>
</form>
<script>
	var pDoc = parent.parent.parent.document;
	hideProcess('WORKING', pDoc);
</script>


