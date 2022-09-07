<%--
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : PFM_MGT_0120.jsp
*@FileTitle  : Customer Performance Report 
*@author     : CLT
*@version    : 1.0
*@since      : 2014/07/14
=========================================================*/
--%>


<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />

	<!-- 일자 및 달력팝업 호출 -->
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/PFM_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/pfm/mgt/management/script/PFM_MGT_0120.js?ver=<%=CLT_JS_VER%>"></script>

	<bean:define id="valMap" name="EventResponse" property="mapVal"/>

	<%
		String ofc_cd = userInfo.getOfc_cd();
		String ofcLoclNm = userInfo.getOfc_locl_nm();
		String usrNm = userInfo.getUser_name();
		String email = userInfo.getEml();
		String cnt_cd = userInfo.getOfc_cnt_cd();
		String dept_cd = userInfo.getDept_cd();
	%>

	<script>
		function setupPage()
		{
			loadPage();
		}
		var pDoc = parent.parent.parent.document;
		hideProcess("WORKING", pDoc);
	</script>
<form name="frm1">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd" id="f_cmd"/>

	<input type="hidden" name="f_usr_nm" id="f_usr_nm" value="<%= usrNm %>" />
	<input type="hidden" name="f_email" id="f_email" value="<%= email %>" />
	<input type="hidden" name="f_ofc_cd" id="f_ofc_cd" value="<%= ofc_cd %>" />
	<input type="hidden" name="f_cnt_cd" id="f_cnt_cd" value="<%= cnt_cd %>" />
	<input type="hidden" name="f_dept_cd" id="f_dept_cd" value="<%= dept_cd %>" />
	<input type="hidden" name="f_sys_ofc_cd" id="f_sys_ofc_cd" value='<bean:write name="valMap" property="sysOfcCd"/>'/>

	<input type="hidden" name="customer" id="customer" />
	<input type="hidden" name="bl_trdp_tp_cd" id="bl_trdp_tp_cd" />
	<input type="hidden" name="dept_cd" id="dept_cd" />
	<input type="hidden" name="not_dept_cd" id="not_dept_cd" />
	<input type="hidden" name="sort_by" id="sort_by" />
	<!-- page_title_area(S) -->
	<div class="page_title_area clear">
		<!-- page_title(S) -->
		<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
		<!-- page_title(E) -->
		
		<!-- opus_design_btn(S) -->
		<div class="opus_design_btn">
			<button type="button" class="btn_accent" style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>" onclick="doWork('SEARCHLIST')"><bean:message key="Search"/></button><!--
			--><button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="CLEAR" onclick="doWork('ALLCLEAR')"><bean:message key="Clear"/></button><!--
			 --><button id="btnPrint" name="btnPrint" type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr6() %>" onclick="doWork('EXCEL')" name="btn_DownExcel"><bean:message key="Excel"/></button>
		<!-- opus_design_btn(E) -->
		</div>
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
	<div class= "wrap_search">
	<!-- layout_wrap(S) -->
	<div class= "opus_design_inquiry" >
	<div class="layout_wrap">
	    <div class="layout_flex_fixed" style="width:400px;float:left!important" >
	  		<table>
	  			<colgroup>
	  				<col width="150" />
	  				<col width="*" />
	  			</colgroup>
	  			<tbody>
	  				<tr>
						<th colspan="2" style="text-align: left;"><bean:message key="Customer"/></th>
					</tr>
					<tr>
						<td><input type="radio" name="radio_customer" id="radio_customer" value="TRDP" onClick="setRadio(this);" checked>&nbsp;<label for="radio_customer"><bean:message key="Customer"/></label></td>
						<td>
							<input type="text" name="trdp_cd" maxlength="20" onKeyDown="codeNameAction(this.value);" onBlur="strToUpper(this); codeNameAction(this.value)" dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:70px" class="search_form"><!-- 
							 --><button type="button" class="input_seach_btn" tabindex="-1" onClick="doDisplay('CSTMR_POPUP', document.frm1);"></button><!-- 
							 --><input type="text" name="trdp_nm" maxlength="50" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:147px" onKeyPress="javascript:if(event.keyCode==13){doDisplay('CSTMR_POPUP', document.frm1);}" class="search_form">
						</td>
					</tr>
					<tr>
						<td><input type="radio" name="radio_customer" id="radio_customer2" value="ACCT" onClick="setRadio(this);">&nbsp;<label for="radio_customer2"><bean:message key="Account_Group_ID"/></label></td>
						<td>
							<select name="acct_cd" style="width:170px;">
								<option value="">All</option>
							<bean:define id="acctCdList" name="valMap" property="acctCdList"/>
							<logic:iterate id="acct_cd" name="acctCdList">
								<option value='<bean:write name="acct_cd"/>'><bean:write name="acct_cd"/></option>
							</logic:iterate>
							</select>
						</td>
					</tr>
				</tbody>	
			</table>
			<table class="mar_top_8">
				<colgroup>
	  				<col width="150" />
	  				<col width="100" />
	  				<col width="*" />
	  			</colgroup>
	  			<tbody>
	  				<tr>
						<th style="text-align: left;" colspan="3"><bean:message key="Department"/></th>
						
					</tr>
					<tr>
						<td><input name="chkbox_dept_cd" id="chkbox_dept_cd" type="checkbox" value="SO" checked>&nbsp;<label for="chkbox_dept_cd"><bean:message key="Ocean_Export"/></label></td>
						<td><input name="chkbox_dept_cd" id="chkbox_dept_cd2" type="checkbox" value="AO" checked>&nbsp;<label for="chkbox_dept_cd2"><bean:message key="Air_Export"/></label></td>
						<td><button type="button" class="btn_etc" onclick="setAllCheck(true);"><bean:message key="All"/></button><button type="button" class="btn_etc" onclick="setAllCheck(false);"><bean:message key="Clear"/></button></td>
					</tr>
					<tr>
						<td><input name="chkbox_dept_cd" id="chkbox_dept_cd3" type="checkbox" value="SI" checked>&nbsp;<label for="chkbox_dept_cd3"><bean:message key="Ocean_Import"/></label></td>
						<td colspan="2"><input name="chkbox_dept_cd" id="chkbox_dept_cd4" type="checkbox" value="AI" checked>&nbsp;<label for="chkbox_dept_cd4"><bean:message key="Air_Import"/></label></td>
					</tr>
					<tr>
						<td colspan="3"><input name="chkbox_dept_cd" id="chkbox_dept_cd5" type="checkbox" value="OT" checked>&nbsp;<label for="chkbox_dept_cd5"><bean:message key="Other_Operation"/></label></td>
					</tr>
	  			</tbody>
	  		</table>
		</div>
		<div class="layout_flex_flex" style="padding-left: 400px;" >
  			<table>
  				<colgroup>
  					<col width="120" />
  					<col width="90" />
  					<col width="" />
  				</colgroup>
  				<tbody>
  					<tr>
						<th><bean:message key="Customer_Type"/></th>
						<td colspan="2" style="padding-left: 15px;"><bean:message key="Office"/>
						<bean:define id="oficeList" name="valMap" property="ofcList"/>
							<select name="ofc_cd" style="width:100px;"/>
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
						<td></td>
						<td><input type="radio" name="radio_bl_trdp_tp_cd" id="radio_bl_trdp_tp_cd" value="S02" onClick="setRadio(this);" checked>&nbsp;<label for="radio_bl_trdp_tp_cd"><bean:message key="Customer"/></label></td>
						<td><input type="radio" name="radio_bl_trdp_tp_cd" id="radio_bl_trdp_tp_cd2" value="P01" onClick="setRadio(this);">&nbsp;<label for="radio_bl_trdp_tp_cd2"><bean:message key="Agent"/></label></td>
					</tr>
  				</tbody>
  			</table>
  			<table class="mar_top_8">
  				<tbody>
  				<colgroup>
  					<col width="120" />
  					<col width="90" />
  					<col width="90" />
  					<col width="" />
  				</colgroup>
  					<tr>
						<th><bean:message key="Sort_By"/></th>
						<td><input type="radio" name="radio_sort_by" id="radio_sort_by" value="CMDT" onClick="setRadio(this);" checked>&nbsp;<label for="radio_sort_by"><bean:message key="Commodity"/></label></td>
						<td><input type="radio" name="radio_sort_by" id="radio_sort_by2" value="POL" onClick="setRadio(this);">&nbsp;<label for="radio_sort_by2"><bean:message key="POL"/></label></td>
						<td><input type="radio" name="radio_sort_by" id="radio_sort_by3" value="POD" onClick="setRadio(this);">&nbsp;<label for="radio_sort_by3"><bean:message key="POD"/></label></td>
					</tr>
					<tr>
						<th><bean:message key="Period"/></th>
						<td>
							<select name="period">
								<option value="PDT" selected><bean:message key="Post_Date"/></option>
								<option value="ETD"><bean:message key="ETD"/></option>
								<option value="ETA"><bean:message key="ETA"/></option>
							</select>
						</td>
						<td colspan="2"><!-- 
							 --><input type="text" name="period_strdt" style="width: 70px;" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1)" size='11' maxlength="10" class="search_form"><!-- 
							  --><span class="dash">~</span><!-- 
							 --><input type="text" name="period_enddt" style="width: 70px;" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1)" size='11' maxlength="10" class="search_form"><!-- 
							 --><button type="button" class="calendar" tabindex="-1" name="period_dt_cal" id="period_dt_cal"  onclick="doDisplay('CALENDAR', document.frm1);" ></button><!-- 
						 --></td>
					</tr>
  				</tbody>
  			</table>
		</div>
	</div>
</div>
</div>
<div class="wrap_result">
	<div class="opus_design_grid">
		<script type="text/javascript">comSheetObject('sheet1');</script>
	</div>
</div>
</div>
</form>
  
<script type="text/javascript">
doBtnAuthority("<%= roleBtnVO != null ? roleBtnVO.getAttr_extension() : "" %>");
</script>	

