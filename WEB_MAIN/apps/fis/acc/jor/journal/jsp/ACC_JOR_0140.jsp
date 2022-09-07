<%
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : ACC_JOR_0140.jsp
*@FileTitle  : Aging Report
*@author     : CLT
*@version    : 1.0
*@since      : 2014/06/18
=========================================================*/
%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ page import="com.clt.apps.opusbase.system.menu.dto.MenuTreeVO"%>
<%@ page import="java.util.ArrayList"%>
<%@ page import="java.util.Map"%>
<%@ page import="com.clt.syscommon.response.CommonEventResponse"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	<script type="text/javascript"src="<%=CLT_PATH%>/apps/fis/acc/jor/journal/script/ACC_JOR_0140.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript"src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/ACC_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>	
	<!-- 일자 및 달력팝업 호출 -->
	<script type="text/javascript"src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript"src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript"src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	
	<bean:define id="valMap"  name="EventResponse" property="mapVal"/>
	<bean:define id="sysOfcVO"  name="valMap" property="sysOfcInfo"/>
	<bean:define id="ofcInfoVO"  name="valMap" property="ofcInfo"/>
	
	<%
		String GA_AR_YN = "N";
		String GA_AP_YN = "N"; 
		
		HttpSession httpSession = request.getSession();
		CommonEventResponse commonEventResponse = (CommonEventResponse) httpSession.getAttribute("menuResponse");
		Map<String, ArrayList<MenuTreeVO>> menuMap = commonEventResponse.getMapVal();

		ArrayList<MenuTreeVO> pgmMenuList = menuMap.get("PGMMENU");
		
		for (MenuTreeVO pgmMenuTreeVO : pgmMenuList) {
			String pgm_url = pgmMenuTreeVO.getPgmURL();
			
			if (pgm_url.indexOf(".clt") > -1){
				pgm_url = pgm_url.substring(2, pgm_url.indexOf(".clt"));
				
				if (pgm_url.equals("ACC_INV_0035")){ // A/R ENTRY(G&A)
					GA_AR_YN = "Y";
				}
				if (pgm_url.equals("ACC_INV_0031")){ // A/P Entry(G&A)
					GA_AP_YN = "Y";
				}
			}
		}
	%>
	
	<script type="text/javascript">
		function setupPage(){
			loadPage();
			var agent = navigator.userAgent.toLowerCase(); 
			if (agent.indexOf("msie") != -1) { //ie 일 경우 pdfDownLoad 버튼은 무조건 안나온다.
			}else{
				getBtnObj("pdfDowns").style.display = 'inline';
			}
	 	}
		var usrNm = "<%= userInfo.getUser_name() %>";
		var user_id = "<%=userInfo.getUsrid()%>";
		var user_eml = "<%=userInfo.getEml()%>";
		var user_phn = "<%=userInfo.getPhn()%>";
		var user_fax = "<%=userInfo.getFax()%>";
		
		var GA_AR_YN = "<%=GA_AR_YN%>";
		var GA_AP_YN = "<%=GA_AP_YN%>";
		
	</script>
	<form name="frm1" id="frm1" method="POST" action="./">
	<!-- Report Value -->
	<input id="file_name" name="file_name" type="hidden" />
	<input id="rd_param" name="rd_param" type="hidden" />
	<input id="title" name="title" type="hidden" />

	<!--Command를 담는 공통 -->
	<input id="f_cmd" name="f_cmd" type="hidden" />
	<input id="f_CurPage" name="f_CurPage" type="hidden" />
	
	<input type="hidden" name="f_sys_ofc_cd" id="f_sys_ofc_cd" value="<bean:write name="sysOfcVO" property="ofc_cd"/>"/>
	
	<!--  #2627 - [CLT] ACCT REPORT - ONE CURRENCY OPTION CURRENCY SETUP - item 2 by thoa.dien 170828-->
	<logic:notEmpty name="sysOfcVO" property="locl_curr_cd">
		<input type="hidden" name="f_sys_ofc_trf_cur_cd" id="f_sys_ofc_trf_cur_cd" value="<bean:write name="sysOfcVO" property="locl_curr_cd"/>"/>
	</logic:notEmpty>
	<logic:empty name="sysOfcVO" property="locl_curr_cd">
		<input type="hidden" name="f_sys_ofc_trf_cur_cd" id="f_sys_ofc_trf_cur_cd" value="<bean:write name="sysOfcVO" property="trf_cur_cd"/>"/>
	</logic:empty>
	
	<!--  #2627 - Changes from Office System Currency to set the local currency based on user's office's local currency information - Thoa.Dien.170928-->
	<logic:notEmpty name="ofcInfoVO" property="locl_curr_cd">
		<input type="hidden" name="f_lcl_curr_cd" id="f_lcl_curr_cd" value="<bean:write name="ofcInfoVO" property="locl_curr_cd"/>"/>
	</logic:notEmpty>
	<logic:empty name="ofcInfoVO" property="locl_curr_cd">
		<input type="hidden" name="f_lcl_curr_cd" id="f_lcl_curr_cd" value="<bean:write name="ofcInfoVO" property="trf_cur_cd"/>"/>
	</logic:empty>
	
        <!-- 타이틀, 네비게이션 -->
        
     <div class="page_title_area clear">
				<!-- page_title(S) -->
				<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
				<!-- page_title(E) -->
				
				<!-- opus_design_btn(S) -->
				<div class="opus_design_btn TOP">
					<%-- 
					<span style="display: none;" btnAuth="<%= roleBtnVO.getAttr5() %>" ><button type="button" class="btn_accent" style="cursor:hand; display:none;" id = "pdfDowns" onclick="pdfDown('Print');"><bean:message key="PDF_download"/></button></span>
					<button type="button" class="btn_accent" style="cursor:hand; display:none;"  btnAuth="<%= roleBtnVO.getAttr5() %>" onclick="doWork('Print');"><bean:message key="Print"/></button>
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
				<!-- page_location(E) -->
	</div>
	<!-- page_title_area(E) -->   
        
    	<!-- inquiry_area(S) -->	
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
		                        <td><input name="f_agn_rpt_tp_1" id="f_agn_rpt_tp_1" type="checkbox" class="radio_select" checked>
		                        	<label for="f_agn_rpt_tp_1"><bean:message key="Debit_Note"/></label>
		                        </td>
		                        <td>
		                        	<input name="f_agn_rpt_tp_2" id="f_agn_rpt_tp_2" type="checkbox" class="radio_select" checked>
		                        	<label for="f_agn_rpt_tp_2"><bean:message key="Local_Invoice"/></label>
		                        </td>
		                        <td>
		                        	<input name="f_agn_rpt_tp_6" id="f_agn_rpt_tp_6" type="checkbox" class="radio_select" disabled="disabled">
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
		                        	<input name="f_agn_rpt_tp_3" id="f_agn_rpt_tp_3" type="checkbox" class="radio_select" checked>
		                       		<label for="f_agn_rpt_tp_3"><bean:message key="Credit_Note"/></label>
		                        </td>
		                        <td>
		                        	<input name="f_agn_rpt_tp_4" id="f_agn_rpt_tp_4" type="checkbox" class="radio_select" checked>
		                        	<label for="f_agn_rpt_tp_4"><bean:message key="Account_Payable"/></label>
		                        </td>
		                        <td colspan="2">
		                        	<input name="f_agn_rpt_tp_5" id="f_agn_rpt_tp_5" type="checkbox" class="radio_select" disabled="disabled">
		                        	<label for="f_agn_rpt_tp_5"><bean:message key="General_AP"/></label>
		                        </td>
							</tr>
				 		</tbody>
							<tr>
								<th><label style="background-color:#d4f6ff;"><bean:message key="Department_Type"/></label></th>
		                        <td>
		                        	<input name="f_dpt_tp_1" id="f_dpt_tp_1" type="checkbox" onclick="checkReleased()" class="radio_select" checked>
		                        	<label for="f_dpt_tp_1"><bean:message key="Ocean_Import"/></label>
		                        </td>
		                        <td>
		                        	<input name="f_dpt_tp_2"  id="f_dpt_tp_2" type="checkbox" onclick="checkReleased()" class="radio_select" checked>
		                       		<label for="f_dpt_tp_2"><bean:message key="Ocean_Export"/></label>
		                        </td>
		                        <td>
		                        	<input name="f_dpt_tp_3"  id="f_dpt_tp_3" type="checkbox" onclick="checkReleased()" class="radio_select" checked>
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
		                        	<input name="f_dpt_tp_4" id="f_dpt_tp_4" type="checkbox" value="O" onclick="checkReleased()" class="radio_select" checked>
		                        	<label for="f_dpt_tp_4"><bean:message key="Air_Import"/></label>
		                        </td>
		                        <td>
		                        	<input name="f_dpt_tp_5" id="f_dpt_tp_5" type="checkbox" value="R" onclick="checkReleased()" class="radio_select" checked>
		                       		<label for="f_dpt_tp_5"><bean:message key="Air_Export"/></label>
		                        </td>
		                        <td >
		                        	<input name="f_dpt_tp_6" id="f_dpt_tp_6" type="checkbox" value="P" onclick="checkReleased()" class="radio_select" checked>
		                       		<label for="f_dpt_tp_6"><bean:message key="Individual_Invs_ARAPs"/></label>
		                        </td>
		                        <td>
		                        	<input name="f_dpt_tp_7"  id="f_dpt_tp_7" type="checkbox" onclick="checkReleased()" class="radio_select" checked>
		                        	<label for="f_dpt_tp_7"><bean:message key="Warehouse_Operation"/></label>
		                        </td>
							</tr>
							<!-- OFVFOUR-8031 [Lever Logistics] Aging Report - Trade Partner Type -->
							<tr>
								<th><label style="background-color:#d4f6ff;"><bean:message key="Partner_Type"/></label></th>
								<td colspan="2">
		                           	<select name="f_tp_type_cd" id="f_tp_type_cd" style="width:115px;">
		                           	<bean:define id="tradepartnerTypeCode" name="valMap" property="tradepartnerTypeCode"/>
		                           	<option value=''>ALL</option>
		                               <logic:iterate id="tpType" name="tradepartnerTypeCode">
		                               	<option value='<bean:write name="tpType" property="cd_val"/>'><bean:write name="tpType" property="cd_nm"/></option>
		                               </logic:iterate>
		                           	</select>
								</td>
							</tr>
							<tr>
		                        <th><bean:message key="View_Type"/></th>
				                <td>
				                	<input type="radio" name="f_view_tp_radio"  id="f_view_tp_radio" class="radio_select" onclick="viewTypeChange('sum');" checked><label for="f_view_tp_radio"><bean:message key="Summary"/></label>
				                </td>
				                <td>
				                	<input type="radio" name="f_view_tp_radio" id="f_view_tp_radio2" class="radio_select" onclick="viewTypeChange('dtl');"><label for="f_view_tp_radio2"><bean:message key="Detail_Landscape"/></label>
				                </td>
				                <td colspan="2">
				                	<input name="f_view_tp_chk" id="f_view_tp_chk" type="checkbox" class="radio_select"><label for="f_view_tp_chk"><bean:message key="Aging_By_Month"/></label>
				                </td>
		                    </tr>
							<tr>
								<th><bean:message key="Sort_By"/></th>
		                        <td>
		                        	<input name="f_post_dt" id="f_post_dt" type="checkbox" value="O" class="radio_select" disabled>
		                        	<label for="f_post_dt"><bean:message key="Post_Date"/></label>
		                        </td>
		                        
		                        <td>
		                        	<input name="f_inv_dt" id="f_inv_dt" type="checkbox" value="0" class="radio_select" disabled>
		                       		<label for="f_inv_dt">Invoice Date</label>
		                        </td>
		                        <td >
		                        	<input name="f_inv_no" id="f_inv_no" type="checkbox" value="0" class="radio_select" disabled>
		                       		<label for="f_inv_no">Invoice No.</label>
		                        </td>
							</tr>
				 		</tbody>
				</table>
				
				<table>
						<colgroup>
				        	<col width="140">
				        	<col width="128">
				        	<col width="*">
					   </colgroup>
					   <tbody>
							<tr>
								<th><bean:message key="Ending_Date"/></th>
								<td><!-- 
									 --><input required  style="width:86px" type="text" name="f_end_dt" id="f_end_dt" onkeyPress="onlyNumberCheck();mkDateFormatType(this, event, false, 1);" onKeyUp="onlyNumberCheck();mkDateFormatType(this, event, false, 1)" onBlur="onlyNumberCheck();mkDateFormatType(this, event, true, 1)" style="width:93;" maxlength="10" class="search_form"><!-- 
									 --><button type="button" class="calendar" tabindex="-1" name="eta_dt_cal" id="f_dt_cal" onclick="doDisplay('DATE11', frm1);"></button>
								</td>
								<td>
									<input type="radio" name="f_dt_tp_radio" id="f_dt_tp_radio" class="radio_select" onclick="disableDept('POST');" checked><label for="f_dt_tp_radio"><bean:message key="Post_Date"/></label>
									<input type="radio" name="f_dt_tp_radio" id="f_dt_tp_radio2" class="radio_select" onclick="disableDept('INVOICE');"><label for="f_dt_tp_radio2"><bean:message key="Invoice_Date"/></label>
									<input type="radio" name="f_dt_tp_radio" id="f_dt_tp_radio3" class="radio_select" onclick="disableDept('DUE');"><label for="f_dt_tp_radio3"><bean:message key="Due_Date"/></label>
									<input type="radio" name="f_dt_tp_radio" id="f_dt_tp_radio4" class="radio_select" onclick="disableDept('ETD');"><label for="f_dt_tp_radio4"><bean:message key="ETD"/></label>
								</td>
							</tr>
<!-- 							#6232 [Zencon] Aging Report - Due Date 관련 추가 요건 -->
							<tr>
								<th><bean:message key="over_due"/></th>
								<td>
									<input  style="width:86px;text-align: right;" type="text" name="f_overDue_dt" id="f_overDue_dt" onkeyPress="onlyNumberCheck()" onKeyUp="onlyNumberCheck()" onBlur="onlyNumberCheck()" style="width:93;" maxlength="10" class="search_form">
									<bean:message key="Days"/>
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
									<input type="radio" name="f_acct_tp_radio" id="f_acct_tp_radio" class="radio_select" checked><label for="f_acct_tp_radio"><bean:message key="Accrual_Basis"/></label>
								</td>
								<td>
									<input type="radio" name="f_acct_tp_radio" id="f_acct_tp_radio2" class="radio_select"><label for="f_acct_tp_radio2"><bean:message key="Cash_Basis"/></label>
								</td>
							</tr>
							<tr>
								<th><label for="released_check"><bean:message key="Cargo_Released_Only"/></label></th>
		                        <td colspan="2">
		                        	<input name="released_check" id="released_check" type="checkbox" value="O" class="radio_select">
		                        </td>
							</tr>
							<tr>
								<th><bean:message key="By"/></th>
		                        <td colspan="2">
		                           	<select name="f_by_cd" id="f_by_cd" style="width:115px;">
		                           	<bean:define id="byTpList" name="valMap" property="byTpList"/>
		                               <logic:iterate id="currVO" name="byTpList">
		                               	<option value='<bean:write name="currVO" property="cd_val"/>'><bean:write name="currVO" property="cd_nm"/></option>
		                               </logic:iterate>
		                           	</select>
		                        	<!-- <input name="byEtd_check" id="byEtd_check" type="checkbox" value="" class="radio_select"> -->
		                        </td>
							</tr>
				 		</tbody>
				</table>
			</div>
	</div>
	<!-- inquiry_area(E) --> 
		<iframe name="pdfDn" style="width:0;height:0;visibility:hidden" border=0></iframe>
</div>
</form>
<script type="text/javascript">
	doBtnAuthority("<%=roleBtnVO.getAttr_extension() %>");
</script>	
<script>
	var pDoc = parent.parent.parent.document;
	hideProcess('WORKING', pDoc);
</script>


