<%
/*=========================================================
 *Copyright(c) 2014 CyberLogitec
 *@FileName : PFM_ACC_0040.jsp
 *@FileTitle : Revenue/Cost Report
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
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/PFM_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/pfm/acc/accounting/script/PFM_ACC_0040.js?ver=<%=CLT_JS_VER%>"></script>
	
	<!-- 일자 및 달력팝업 호출 -->
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	
	<bean:define id="valMap"  name="EventResponse" property="mapVal"/>
	<bean:define id="sysOfcVO"  name="valMap" property="sysOfcInfo"/>
	
	<script type="text/javascript">
		var usrNm = "<%= userInfo.getUser_name() %>";
		var usrId = "<%= userInfo.getUsrid() %>";
		var usrPhn = "<%= userInfo.getPhn() %>";
		var usrFax = "<%= userInfo.getFax() %>";
		var usrEml = "<%= userInfo.getEml() %>";
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
<form name="frm1" method="POST" action="./">
<!-- Report Value -->
<input type="hidden" name="file_name" id="file_name" />
<input type="hidden" name="rd_param" id="rd_param" />
<input type="hidden" name="title" id="title" />

<!--Command를 담는 공통 -->
<input type="hidden" name="f_cmd" id="f_cmd" />
<input type="hidden" name="f_CurPage" id="f_CurPage" />

<input type="hidden" name="f_sys_ofc_cd" value="<bean:write name="sysOfcVO" property="ofc_cd"/>"/>
<input type="hidden" name="f_sys_ofc_trf_cur_cd" value="<bean:write name="sysOfcVO" property="trf_cur_cd"/>"/>
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
<!-- page_title_area(S) -->
<div class="page_title_area clear">
	<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn TOP">
	   		<%-- 
		   <span style="display:none;" btnAuth="<%= roleBtnVO.getAttr5() %>" ><button type="button" style="display:none;" id = "pdfDowns" class="btn_accent" onclick="pdfDown('PRINT')"><bean:message key="PDF_download"/></button></span>
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
		<tbody>
			<colgroup>
				<col width="120" />
				<col width="*" />
			</colgroup>
			<tr>
				<th><bean:message key="Branch"/></th>
				<td >
	                <select name="f_ofc_cd" style="width:115px;">
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
		</tbody>
	</table>
	<!--  table>
		<tbody>
			<colgroup>
				<col width="120" />
				<col width="300" />
				<col width="200" />
				<col width="*" />
			</colgroup>
			<tr>
				<th><bean:message key="Report_Type"/></th>
				<td>
                 	<input name="f_rpt_tp" id="f_rpt_tp1" type="radio" class="radio_select" checked onClick="cntrPaidCheck()">
                    	<label for="f_rpt_tp1"><bean:message key="Revenue_CRDR"/></label>&nbsp;
                 	<select name="f_rpt_tp_sel" style="width:115px;">
                   		<option value="CR">CR</option>
                   		<option value="DR">DR</option>
                   		<option value="CRDR" selected><bean:message key="CRDR"/></option>
                   	</select>
               	</td>
                <td>
                	<input name="f_rpt_tp" id="f_rpt_tp2" type="radio" class="radio_select" onClick="cntrPaidCheck()"><label for="f_rpt_tp2"><bean:message key="Revenue_Invoice"/></label>
                </td>
                <td>
                	<input name="f_rpt_tp" id="f_rpt_tp3" type="radio" class="radio_select" onClick="cntrPaidCheck()"><label for="f_rpt_tp3"><bean:message key="Revenue_All"/></label>
                </td>
			</tr>
			<tr>
				<td></td>
                <td>
                	<input name="f_rpt_tp" id="f_rpt_tp4" type="radio" class="radio_select" onClick="cntrPaidCheck()"><label for="f_rpt_tp4"><bean:message key="Cost_Operation_AP"/></label>
                </td>
                <td>
                	<input name="f_rpt_tp" id="f_rpt_tp5" type="radio" class="radio_select" onClick="cntrPaidCheck()"><label for="f_rpt_tp5"><bean:message key="AP_Expense"/></label> 
                </td>
                <td>
                	<input name="f_rpt_tp" id="f_rpt_tp6" type="radio" class="radio_select" onClick="cntrPaidCheck()"><label for="f_rpt_tp6"><bean:message key="Cost_and_Expense"/></label>
                </td>
			</tr>
		</tbody>
	</table -->
	
	<!-- #240 #52974 - [BNX, UNICO, STAR CLUSTER] AGENT AP FOR CREDIT NOTE -->
	<table>
		<tbody>
			<colgroup>
				<col width="120" />
				<col width="120" />
				<col width="120" />
				<col width="*" />
			</colgroup>
			<tr>
				<th><bean:message key="Report_Type"/></th>
                <td>
                	<input name="f_rpt_tp_rdo" id="f_rpt_tp_rdo1" type="radio" class="radio_select" onClick="changeRptType()"><label for="f_rpt_tp_rdo1"><bean:message key="Revenue"/></label>
                </td>
                <td>
                	<input name="f_rpt_tp_rdo" id="f_rpt_tp_rdo2" type="radio" class="radio_select" onClick="changeRptType()"><label for="f_rpt_tp_rdo2"><bean:message key="Cost"/></label>
                </td>
                <td>
					<button id="btnPrint" type="button" class="btn_etc" onclick="fn_RtpType('ALL')"><bean:message key="All"/></button><!-- 
                 --><button id="btnPrint" type="button" class="btn_etc" onclick="fn_RtpType('CLEAR')"><bean:message key="Clear"/></button></td>
                
                </td>
			</tr>
			<tr>
				<td></td>
                <td>
                	<input name="f_rpt_tp_cbx" id="f_rpt_tp_cbx_1" type="checkbox" class="radio_select" >
                	<label for="f_rpt_tp_cbx_1"><bean:message key="AR"/></label>
                </td>
                <td>
                	<input name="f_rpt_tp_cbx" id="f_rpt_tp_cbx_2" type="checkbox" class="radio_select" >
                	<label for="f_rpt_tp_cbx_2"><bean:message key="AP"/></label>
                </td>
                <td>
                </td>
			</tr>			
			<tr>
				<td></td>
                <td>
                	<input name="f_rpt_tp_cbx" id="f_rpt_tp_cbx_4" type="checkbox" class="radio_select" >
                	<label for="f_rpt_tp_cbx_4"><bean:message key="Debit"/></label>
                </td>
                <td>
                	<input name="f_rpt_tp_cbx" id="f_rpt_tp_cbx_5" type="checkbox" class="radio_select" >
                	<label for="f_rpt_tp_cbx_5"><bean:message key="Credit"/></label>
                </td>
                <td>
					<input name="f_rpt_tp_cbx" id="f_rpt_tp_cbx_6" type="checkbox" class="radio_select" >
					<label for="f_rpt_tp_cbx_6"><bean:message key="Debit_Credit"/></label>                
                </td>
			</tr>			
			<tr><!-- #240 opt 추가 -->
				<td></td>
                <td>
					<input name="f_rpt_tp_cbx" id="f_rpt_tp_cbx_7" type="checkbox" class="radio_select" >
					<label for="f_rpt_tp_cbx_7"><bean:message key="AR_GnA"/></label>                          
                </td>
                <td>
					<input name="f_rpt_tp_cbx" id="f_rpt_tp_cbx_3" type="checkbox" class="radio_select" >
					<label for="f_rpt_tp_cbx_3"><bean:message key="AP_GnA"/></label>                    
                </td>
                <td>
                </td>
			</tr>			
		</tbody>
	</table>
	<table>
		<tbody>
			<colgroup>
				<col width="120" />
				<col width="120" />
				<col width="120" />
				<col width="125" />
				<col width="*" />
			</colgroup>
			<tr>
				<th><bean:message key="Department_Type"/></th>
				<td>
                	<input name="f_dpt_tp_1" id="f_dpt_tp_1" type="checkbox" class="radio_select" checked>
	              <label for="f_dpt_tp_1"><bean:message key="Air_Import"/></label></td>
                <td>
                	<input name="f_dpt_tp_2" id="f_dpt_tp_2" type="checkbox" class="radio_select" checked>
                	<label for="f_dpt_tp_2"><bean:message key="Air_Export"/></label></td>
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
                <td ><input name="f_dpt_tp_5" id="f_dpt_tp_5" type="checkbox" class="radio_select" checked><label for="f_dpt_tp_5"><bean:message key="Other_Operation"/></label></td>
                <td><input name="f_dpt_tp_6" id="f_dpt_tp_6" type="checkbox" class="radio_select" checked/><label for="f_dpt_tp_6"><bean:message key="Warehouse_Operation"/></label></td>
			</tr>
		</tbody>
	</table>
	<table>
		<tbody>
			<colgroup>
				<col width="120" />
				<col width="120" />
				<col width="120" />
				<col width="125" />
				<col width="*" />
			</colgroup>
			<tr>
				<th><bean:message key="Payment_Status"/></th>
				<td>
					<input type="radio" name="f_pay_sts" id="f_pay_sts1" class="radio_select"><label for="f_pay_sts1"><bean:message key="Paid"/></label>
				</td>
				<td>
					<input type="radio" name="f_pay_sts" id="f_pay_sts2" class="radio_select"><label for="f_pay_sts2"><bean:message key="Not_Paid"/></label>
				</td>
				<td>
					<input type="radio" name="f_pay_sts" id="f_pay_sts3" class="radio_select"><label for="f_pay_sts3"><bean:message key="Partial_Over_Paid"/></label>
				</td>
				<td>
               		<input type="radio" name="f_pay_sts" id="f_pay_sts4" class="radio_select" checked><label for="f_pay_sts4"><bean:message key="All"/></label>
               	</td>
			</tr>
		</tbody>
	</table>
	<table>
		<tbody>
			<colgroup>
				<col width="120" />
				<col width="240" />
				<col width="125" />
				<col width="*" />
			</colgroup>
			<tr>
				<th><bean:message key="Period"/></th>
				<td>
					<input type="text" name="per_strdt" required onKeyPress="onlyNumberCheck();mkDateFormatType(this, event, false, 1)"  onKeyUp="onlyNumberCheck();mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, this, frm1.per_enddt);firCalFlag=false;" style="width:75px;" maxlength="10" class="search_form"><!-- 
				--><span class="dash">~</span><!-- 
				--><input type="text" name="per_enddt" required onKeyPress="onlyNumberCheck();mkDateFormatType(this, event, false, 1)" onKeyUp="onlyNumberCheck();mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onBlur="chkCmprPrd(firCalFlag, false, this, frm1.per_strdt, this);firCalFlag=false;" style="width:75px;" maxlength="10" class="search_form"><!-- 
				--><button type="button" name="per_dt_cal" id="per_dt_cal"  class="calendar ir" onclick="doDisplay('DATE12', frm1);"></button>
				</td>
				<td>
               		<input type="checkbox" name="f_per_post_dt_chk" id="f_per_post_dt_chk" class="radio_select" onClick="setDateCheck(this);"><label for="f_per_post_dt_chk"><bean:message key="By_Paid_Date"/></label>
               	</td>
				<td>
               		<input type="checkbox" name="f_per_inv_dt_chk" id="f_per_inv_dt_chk" class="radio_select" onClick="setDateCheck(this);"><label for="f_per_inv_dt_chk"><bean:message key="By_Invoice_Date"/></label>
               	</td>
			</tr>
		</tbody>
	</table>
	<table>
		<tbody>
			<colgroup>
				<col width="120" />
				<col width="120" />
				<col width="120" />
				<col width="125" />
				<col width="120" />
				<col width="*" />
			</colgroup>
			<tr>
				<th><bean:message key="Sort_By"/></th>
				<td>
					<input type="radio" name="f_sort_by" id="f_sort_by1" class="radio_select" checked><label for="f_sort_by1"><bean:message key="Date"/></label>
				</td>
				<td>
					<input type="radio" name="f_sort_by" id="f_sort_by2" class="radio_select"><label for="f_sort_by2"><bean:message key="Agent_Customer"/></label>
				</td>
				<td>
					<input type="radio" name="f_sort_by" id="f_sort_by3" class="radio_select"><label for="f_sort_by3"><bean:message key="Salesman"/></label>
				</td>
				<td>
               		<input type="radio" name="f_sort_by" id="f_sort_by4" class="radio_select"><label for="f_sort_by4"><bean:message key="Invoice_No"/></label>
               	</td>
				<td>
               		<input type="checkbox" name="f_sort_by_chk" id="f_sort_by_chk" class="radio_select" checked><label for="f_sort_by_chk"><bean:message key="Summary"/></label>
               	</td>
               	<td></td>
			</tr>
		</tbody>
	</table>
	<table>
		<tbody>
			<colgroup>
				<col width="120" />
				<col width="120" />
				<col width="*" />
			</colgroup>
			<tr>
				<th><bean:message key="Filter_By"/></th>
				<td>
					<input type="checkbox" name="f_filter_by_chk_1" id="f_filter_by_chk_1" class="radio_select" checked><label for="f_filter_by_chk_1"><bean:message key="Include_VAT"/></label>
				</td>
				<td>
					<input type="checkbox" name="f_filter_by_chk_2" id="f_filter_by_chk_2" class="radio_select" checked><label for="f_filter_by_chk_2"><bean:message key="Include_Duty_Tax"/></label>
				</td>
			</tr>
		</tbody>
	</table>
	<table>
		<tbody>
			<colgroup>
				<col width="120" />
				<col width="*" />
			</colgroup>
			<tr>
				<th><bean:message key="By_Agent_Customer"/></th>
                <td>
                	<input type="text" name="f_cust_trdp_cd" maxlength="20" value="" onKeyDown="codeNameAction('cust_trdpcode',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('cust_trdpcode',this, 'onBlur')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:80px" class="search_form"><!-- 
				--><button id="" type="button" btnAuth="<%= roleBtnVO.getAttr5() %>" class="input_seach_btn" tabindex="-1" onClick="doWork('TRDP_POPLIST')"></button><!-- 
				--><input type="text" name="f_cust_trdp_nm" maxlength="50" value="" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:250px" onBlur="strToUpper(this);" onKeyPress="if(event.keyCode==13){doWork('TRDP_POPLIST');}" class="search_form">
                </td>
			</tr>
		</tbody>
	</table>
	<table>
		<tbody>
			<colgroup>
				<col width="120" />
				<col width="*" />
			</colgroup>
			<tr>
				<th><bean:message key="By_Salesman"/></th>
                <td>
					<input type="text" name="f_sls_usrid" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:80px;" maxlength="12" onKeyDown="codeNameAction('user',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('user',this, 'onBlur')"><!-- 
				--><button id="" type="button" btnAuth="<%= roleBtnVO.getAttr5() %>" class="input_seach_btn" tabindex="-1" onClick="doWork('USER_POPLIST')"></button><!-- 
				--><input type="text" name="f_sls_usrnm" class="search_form-disable" onBlur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:250px;text-align:left" readOnly>
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
			
</body>
</html>
<script>
	var pDoc = parent.parent.parent.document;
	hideProcess('WORKING', pDoc);
</script>


