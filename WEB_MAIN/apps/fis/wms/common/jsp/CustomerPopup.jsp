<%--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : CustomerPopup.jsp
*@FileTitle  : Customer
*@author     : CLT
*@version    : 1.0
*@since      : 2014/10/21
=========================================================--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/ModalCalendar.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="./apps/fis/wms/common/js/CustomerPopup.js?ver=<%=CLT_JS_VER%>"></script>
	
	<script type="text/javascript" src="./js/common/message/<%=CLT_MSG_PATH%>/WMS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>	
<%
	String cust_cd = "";
	String cust_nm = "";
	String clear_flg = "";
	String in_part_tp = "";
	String ctrt_no = "";
	String ctrt_nm = "";
	
	try {
		cust_cd = request.getParameter("cust_cd")== null?"":request.getParameter("cust_cd");
		cust_nm = request.getParameter("cust_nm")== null?"":request.getParameter("cust_nm");
		clear_flg = request.getParameter("clear_flg")== null?"N":request.getParameter("clear_flg");
		in_part_tp = request.getParameter("in_part_tp")== null?"N":request.getParameter("in_part_tp");
		ctrt_no = request.getParameter("ctrt_no")== null?"":request.getParameter("ctrt_no");
		ctrt_nm = request.getParameter("ctrt_nm")== null?"":request.getParameter("ctrt_nm");
	}catch(Exception e) {
		out.println(e.toString());
	}	
%>
	<bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
	<bean:define id="part_tp" name="cdMap" property="part_tp"/>
	<bean:define id="part_tp2" name="cdMap" property="part_tp2"/>
    <script language="javascript">    
	
	var part_tpCode = "";
	var part_tpText = "";
	
	var part_tp2Code = "";
	var part_tp2Text = "";
	
	<!-- Freight Unit 단위 -->
		<% boolean isBegin_part_tp = false; %>
        <logic:iterate id="codeVO" name="part_tp">
            <% if(isBegin_part_tp){ %>
            part_tpText+= '|';
            part_tpCode+= '|';
            <% }else{
            	isBegin_part_tp = true;
               } %>
               part_tpCode+= '<bean:write name="codeVO" property="code"/>' + '|';
               part_tpText+= '<bean:write name="codeVO" property="name"/>' + '|';
        </logic:iterate>
        
        
		<!-- Freight Unit 단위 -->
			<% boolean isBegin_part_tp2 = false; %>
            <logic:iterate id="codeVO" name="part_tp2">
                <% if(isBegin_part_tp2){ %>
                part_tp2Text+= '|';
                part_tp2Code+= '|';
                <% }else{
                	isBegin_part_tp2 = true;
                   } %>
                   part_tp2Code+= '<bean:write name="codeVO" property="code"/>' + '|';
                   part_tp2Text+= '<bean:write name="codeVO" property="name"/>' + '|';
            </logic:iterate>
	
	<%
		/* //Required Service
		 String rtn_val = JSPUtil.getIBSheetCodeCombo("SV1", "0", "");
		String[] grd_combo = rtn_val.split(",");
		String grp_cd = grd_combo[0];
		String grp_nm = grd_combo[1]; 
	
		//General Checkpoint
		 String rtn_val2 = JSPUtil.getIBSheetCodeCombo("PG1", "0", "");
		String[] grd2_combo = rtn_val.split(",");
		String grp2_cd = grd2_combo[0];
		String grp2_nm = grd2_combo[1];  */
	%>
	
	</script>
	<script type="text/javascript">
	//Party type
<%-- 	<%=JSPUtil.getIBCodeCombo("part_tp", "", "CC", "0", "")%> --%>
<%-- 	<%=JSPUtil.getIBCodeCombo("part_tp2", "", "CC1", "0", "")%> --%>
	</script>
<script type="text/javascript">
	var almightyFlag = false;
	function setupPage(){
		var errMessage = "";
		if (errMessage.length >= 1) {
			ComShowMessage(errMessage);
		} // end if
		loadPage(true);
	}
</script>
<form id="form" name="form">
<input type="hidden" name="f_cmd">
<input type="hidden" name="clear_flg" value="<%=clear_flg%>" id="clear_flg" />
<input type="hidden" name="in_part_tp" value="<%=in_part_tp%>" id="in_part_tp" />
<input type="hidden" name="in_ctrt_no" value="<%=ctrt_no%>" id="in_ctrt_no" />
<input type="hidden" name="in_ctrt_nm" value="<%=ctrt_nm%>" id="in_ctrt_nm" />
<div class="layer_popup_title">
	<!-- page_title_area(S) -->
	<div class="page_title_area clear">
		<!-- page_title(S) -->
		<h2 class="page_title"><span><bean:message key="Customer"/></span></h2>
		<!-- page_title(E) -->
		<!-- opus_design_btn(S) -->
		<div class="opus_design_btn">
				<button type="button" class="btn_accent" name="btn_retrieve" id="btn_retrieve" onClick="doWork('btn_retrieve');"><bean:message key="Search"/></button><!-- 
			 --><button type="button" class="btn_normal" name="btn_Close" id="btn_Close" onClick="doWork('btn_Close');"><bean:message key="Close"/></button><!-- 
		 --></div>
		<!-- opus_design_btn(E) -->
	</div>
</div>
<div class="layer_popup_contents">
<div class= "wrap_search">
<div class="opus_design_inquiry entry_pannel ">
	<table>
    	<colgroup>
		<col width="80" />
   		<col width="200" />
		<col width="60" />
 		<col width="*" />
		</colgroup>    
		<tbody>        	
	  		<tr>
		        <th><bean:message key="Search"/></th>
		        <td><input type="hidden" name="cust_tp" id="cust_tp" value="A"><input type="radio" name="cust_type" id="cust_type" onClick="doWork('cust_type');" checked /><label for = "cust_type"><bean:message key="All"/></label><input type="radio" name="cust_type" id="cust_type1" onClick="doWork('cust_type1');" /><label for = "cust_type1"><bean:message key="Contract"/></label></td>
		        <th><bean:message key="Party_Type"/></th>
		        <td>
		        	<!-- <script type="text/javascript">ComComboObject('part_tp', 1, 120, 1);</script> -->
		        		<select name="part_tp" id="part_tp" class="search_form">
		          			
		          		</select>
		        </td>
	        </tr>
			<tr>
				<th><bean:message key="Code"/></th>
				<td><input name="cust_cd" type="text" class="L_input"  dataformat="engup" maxlength="10" style="width: 270px;text-transform:uppercase;" value="<%=cust_cd%>" /></td>
                <th><bean:message key="English_Name"/></th>
                <td><input name="cust_nm" type="text" class="L_input" dataformat="engup" style="width: 210px;text-transform:uppercase;" maxlength="400" value="<%=cust_nm%>" otherchar="~!@#$%^&*()_+|{}:>?`=\[];',./-" /></td>
			</tr>
			<tr>
				<th><bean:message key="Local_Name"/></th>
				<td><input name="cust_loc_nm" type="text" class="L_input" dataformat="engup" maxlength="400" style="width: 270px;text-transform:uppercase;" otherchar="~!@#$%^&*()_+|{}:>?`=\[];',./-"/></td>
                <th><bean:message key="Contract_No"/></th>
                <td><input name="ctrt_cd" type="text" class="L_input_R" dataformat="engup" maxlength="10" style="width: 210px;text-transform:uppercase;" value="<%=ctrt_no%>" readOnly /></td>
			</tr>
			<tr>
				<th><bean:message key="Contract_Name"/></th>
				<td><input name="ctrt_nm" type="text" class="L_input_R" dataformat="engup" maxlength="400" style="width: 270px;text-transform:uppercase;" value="<%=ctrt_nm%>" readOnly /></td>
                <th></th>
                <td></td>
			</tr>
			</table>
		</div>
</div>
<div class="wrap_result">
	<!-- opus_design_grid(S) -->
	<div class="opus_design_grid clear">
		<script type="text/javascript">comSheetObject('sheet1');</script>
	</div>
</div>
</div>
</form>
<%@include file="/apps/fis/wms/bizcommon/include_common.jsp"%>
