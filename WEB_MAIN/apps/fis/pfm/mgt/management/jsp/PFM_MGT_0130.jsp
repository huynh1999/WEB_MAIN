<%--
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : PFM_MGT_0130.jsp
*@FileTitle  : Performance Trend By Customer 
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
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/pfm/mgt/management/script/PFM_MGT_0130.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/PFM_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/rd/rdviewer50u.js?ver=<%=CLT_JS_VER%>"></script>

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
		
		var rpt_file_path = "<%=userInfo.getRpt_file_path().replaceAll("\\\\","\\\\\\\\")%>";
	</script>
</head>
<form name="frm1">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd" id="f_cmd" />

	<input type="hidden" name="f_usr_nm" value="<%= usrNm %>" id="f_usr_nm" />
	<input type="hidden" name="f_email" value="<%= email %>" id="f_email" />
	<input type="hidden" name="f_ofc_cd" value="<%= ofc_cd %>" id="f_ofc_cd" />
	<input type="hidden" name="f_cnt_cd" value="<%= cnt_cd %>" id="f_cnt_cd" />
	<input type="hidden" name="f_dept_cd" value="<%= dept_cd %>" id="f_dept_cd" />
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
		--><button type="button" class="btn_normal" style="cursor:hand; display:none;" btnAuth="CLEAR" onclick="doWork('ALLCLEAR')"><bean:message key="Clear"/></button>
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
	
<!-- layout_wrap(S) -->
<div class="over_wrap" height="100%">
<div class="wrap_search">
	<div class= "opus_design_inquiry" >
		<table>
			<colgroup>
				<col width="100" />
				<col width="300" />
				<col width="120" />
				<col width="180" />
				<col width="130" />
				<col width="*" />
			</colgroup>
			<tbody>
				<tr>
					<th style="text-align: left;"><bean:message key="Customer"/></th>
					<td colspan="5"></td>
				</tr>
				<tr>
					<td><input type="radio" name="radio_customer" id="radio_customer" value="TRDP" onClick="setRadio(this);" checked><label for="radio_customer"><bean:message key="Customer"/></label></td>
					<td><!-- 
						 --><input type="text" name="trdp_cd" id="trdp_cd" maxlength="20" onKeyDown="codeNameAction(this.value);" onBlur="strToUpper(this); codeNameAction(this.value)" dataformat="excepthan" style="ime-mode:disabled;text-transform:uppercase;width:70px" class="search_form"><!-- 
						 --><button type="button" class="input_seach_btn" tabindex="-1" onClick="doDisplay('CSTMR_POPUP', document.frm1);"></button><!-- 
						 --><input type="text" name="trdp_nm" id="trdp_nm" maxlength="50" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:147px" onKeyPress="javascript:if(event.keyCode==13){doDisplay('CSTMR_POPUP', document.frm1);}" class="search_form"><!-- 
					 --></td>
					<td><input type="radio" name="radio_customer"  id="radio_customer2" value="ACCT" onClick="setRadio(this);">&nbsp;<label for="radio_customer2"><bean:message key="Account_Group_ID"/></label></td>
					<td>
						<select name="acct_cd" style="width:170px;">
							<option value="">All</option>
						<bean:define id="acctCdList" name="valMap" property="acctCdList"/>
						<logic:iterate id="acct_cd" name="acctCdList">
							<option value='<bean:write name="acct_cd"/>'><bean:write name="acct_cd"/></option>
						</logic:iterate>
						</select>
					</td>
					<th><bean:message key="Office"/></th>
					<td>
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
			</tbody>
		</table>
		
		<div class="layout_wrap mar_top_8">
	    	<div class="layout_vertical_2" style="width:400px !important;" >
	    		<Table>
	    			<colgroup>
	    				<col width="100" />
	    				<col width="*" />
	    			</colgroup>
	    			<tbody>
	    				<tr>
							<th style="text-align: left;"><bean:message key="Customer_Type"/></th>
							<td></td>
						</tr>
						<tr>
							<td><input type="radio" name="radio_bl_trdp_tp_cd" id="radio_bl_trdp_tp_cd" value="S02" onClick="setRadio(this);" checked>&nbsp;<label for="radio_bl_trdp_tp_cd"><bean:message key="Customer"/></label></td>
							<td><input type="radio" name="radio_bl_trdp_tp_cd" id="radio_bl_trdp_tp_cd2" value="P01" onClick="setRadio(this);">&nbsp;<label for="radio_bl_trdp_tp_cd2"><bean:message key="Agent"/></label></td>
						</tr>
	    			</tbody>
	    		</Table>
	    	</div>
	    	<div class="layout_vertical_2" style="width:400px !important;" >
	    		<Table>
	    			<colgroup>
	    				<col width="120" />
	    				<col width="120" />
	    				<col width="" />
	    			</colgroup>
	    			<tbody>
	    				<tr>
							<td style="text-align: left;"><b><bean:message key="Department"/></b></td>
							<td colspan="2"></td>
						</tr>
						<tr>
							<td><input type="radio" name="radio_dept_cd" id="radio_dept_cd" value="SO" onClick="setRadio(this);validationDepartment();" checked>&nbsp;<label for="radio_dept_cd"><bean:message key="Ocean_Export"/></label></td>
							<td colspan="2"><input type="radio" name="radio_dept_cd" id="radio_dept_cd2" value="AO" onClick="setRadio(this);validationDepartment()">&nbsp;<label for="radio_dept_cd2"><bean:message key="Air_Export"/></label></td>
						</tr>
						<tr>
							<td><input type="radio" name="radio_dept_cd" id="radio_dept_cd3" value="SI" onClick="setRadio(this);validationDepartment();">&nbsp;<label for="radio_dept_cd3"><bean:message key="Ocean_Import"/></label></td>
							<td><input type="radio" name="radio_dept_cd" id="radio_dept_cd4" value="AI" onClick="setRadio(this);validationDepartment();">&nbsp;<label for="radio_dept_cd4"><bean:message key="Air_Import"/></label></td>
							<td><input type="radio" name="radio_dept_cd" id="radio_dept_cd5" value="OT" onClick="setRadio(this);validationDepartment();">&nbsp;<label for="radio_dept_cd5"><bean:message key="Other"/></label></td>
						</tr>
	    			</tbody>
	    		</Table>
	    	</div>
	    	<div class="layout_vertical_2" style="width:400px !important;" >
	    		<Table>
	    			<colgroup>
	    				<col width="120" />
	    				<col width="120" />
	    				<col width="" />
	    			</colgroup>
	    			<tbody>
	    				<tr>
							<th style="text-align: left;"><bean:message key="Sort_By"/></th>
							<td colspan="2"></td>
						</tr>
						<tr>
							<td><input type="radio" name="radio_sort_by" id="radio_sort_by" value="MEAS" onClick="setRadio(this);validationSortBy();" checked>&nbsp;<label for="radio_sort_by"><bean:message key="Measurement"/></label></td>
							<td><input type="radio" name="radio_sort_by" id="radio_sort_by2" value="GRS_WGT" onClick="setRadio(this);validationSortBy();">&nbsp;<label for="radio_sort_by2"><bean:message key="GWeight"/></label></td>
							<td><input type="radio" name="radio_sort_by" id="radio_sort_by3" value="CHG_WGT" onClick="setRadio(this);validationSortBy();">&nbsp;<label for="radio_sort_by3"><bean:message key="Chargeable_Weight"/></label></td>
						</tr>
						<tr>
							<td colspan="3">
								<input type="radio" name="radio_sort_by" id="radio_sort_by4" value="BL_COUNT" onClick="setRadio(this);validationSortBy();">&nbsp;<label for="radio_sort_by4"><bean:message key="Number_of_HBL_HAWB"/></label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<!-- 
								 --><input type="radio" name="radio_sort_by" id="radio_sort_by5" value="TEU" onClick="setRadio(this);validationSortBy();">&nbsp;<label for="radio_sort_by5"><bean:message key="TEU_Ocean_FCL_BL"/></label>
							</td>
						</tr>
	    			</tbody>
	    		</Table>
	    	</div>
	    </div>
	</div>
</div>	
<!-- layout_wrap(E) -->

<div class="wrap_result">
	<div style="height: 500px;width: 1100px;">
		<script type="text/javascript">comRdObject("report1");</script>
	</div>
</div>
</div>
</form>
  
<script type="text/javascript">
doBtnAuthority("<%= roleBtnVO != null ? roleBtnVO.getAttr_extension() : "" %>");
</script>	
	
</body>
</html>

