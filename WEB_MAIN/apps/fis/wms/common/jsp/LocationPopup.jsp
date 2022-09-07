<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoFormControl.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/ModalCalendar.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="./apps/fis/wms/common/js/LocationPopup.js?ver=<%=CLT_JS_VER%>"></script>
    
 	<script type="text/javascript" src="./js/common/message/<%=CLT_MSG_PATH%>/WMS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
<%
	
	String loc_cd = "";
	String loc_nm = "";
	String clear_flg = "";
	String type = "";
	String ctrt_no = "";
	String ctrt_nm = "";
	String radio_location = "";
	String radio_search = "";
	String multi_contact_flg = "";
	
	try {
		loc_cd = request.getParameter("loc_cd")== null?"":request.getParameter("loc_cd");
		loc_nm = request.getParameter("loc_nm")== null?"":request.getParameter("loc_nm");
		clear_flg = request.getParameter("clear_flg")== null?"N":request.getParameter("clear_flg");
		type = request.getParameter("type")== null?"P":request.getParameter("type");
		ctrt_no = request.getParameter("ctrt_no")== null?"":request.getParameter("ctrt_no");
		ctrt_nm = request.getParameter("ctrt_nm")== null?"":request.getParameter("ctrt_nm");
		radio_location = request.getParameter("radio_location")== null?"":request.getParameter("radio_location");
		radio_search = request.getParameter("radio_search")== null?"":request.getParameter("radio_search");
		multi_contact_flg = request.getParameter("multi_contact_flg")== null?"":request.getParameter("multi_contact_flg");
		
	}catch(Exception e) {
		out.println(e.toString());
	}	
%>
	<bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
	<bean:define id="ctrt_cust_cd" name="cdMap" property="ctrt_cust_cd"/>
	<bean:define id="cust_cd" name="cdMap" property="cust_cd"/>
    <script language="javascript">    
	
	var cust_cdCode = "";
	var cust_cdText = "";
	
	var ctrt_cust_cdCode = "";
	var ctrt_cust_cdText = "";
	
	<!-- Freight Unit 단위 -->
        <logic:iterate id="codeVO" name="cust_cd">
	        cust_cdCode+= '<bean:write name="codeVO" property="code"/>' + '|';
	        cust_cdText+= '<bean:write name="codeVO" property="name"/>' + '|';
        </logic:iterate>
        
        
		<!-- Freight Unit 단위 -->
            <logic:iterate id="codeVO" name="ctrt_cust_cd">
	            ctrt_cust_cdCode+= '<bean:write name="codeVO" property="code"/>' + '|';
	            ctrt_cust_cdText+= '<bean:write name="codeVO" property="name"/>' + '|';
            </logic:iterate>
	</script>
	<script type="text/javascript">
	//Party type
	<%-- <%=JSPUtil.getIBCodeCombo("ctrt_cust_cd", "", "CC7", "1", "")%>
	<%=JSPUtil.getIBCodeCombo("cust_cd", "", "PF", "1", "")%> --%>
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
<input	type="hidden" name="openMean"/>
<input	type="hidden" name="openMean1"/>
<input type="hidden" name="clear_flg" value="<%=clear_flg%>" id="clear_flg" />
<input type="hidden" name="type_search" value="A" id="type_search" />
<input type="hidden" name="type" value="<%=type%>" id="type" />
<input type="hidden" name="in_ctrt_no" value="<%=ctrt_no%>" id="in_ctrt_no" />
<input type="hidden" name="in_ctrt_nm" value="<%=ctrt_nm%>" id="in_ctrt_nm" />
<input type="hidden" name="in_radio_location" value="<%=radio_location%>" id="in_radio_location" />
<input type="hidden" name="in_radio_search" value="<%=radio_search%>" id="in_radio_search" />
<input type="hidden" name="org_cd" value="<%=userInfo.getOfc_cd()%>" id="org_cd" />
<input type="hidden" name="multi_contact_flg" value="<%=multi_contact_flg%>" id="multi_contact_flg" />
<!-- page_title_area(S) -->
<div class="page_title_area clear">
	<!-- page_title(S) -->
	<h2 class="page_title"><span><bean:message key="Common_Location"/></span></h2>
	<!-- page_title(E) -->
	<!-- opus_design_btn(S) -->
	<div class="opus_design_btn">
			<button type="button" class="btn_accent" name="btn_search" id="btn_search" onClick="doWork('btn_Search');"><bean:message key="Search"/></button><!-- 
		 --><button type="button" class="btn_normal" name="btn_ok" id="btn_ok" onClick="doWork('btn_ok');"><bean:message key="OK"/></button><!-- 
		  --><button type="button" class="btn_normal" name="btn_Close" id="btn_Close" onClick="doWork('btn_Close');"><bean:message key="Close"/></button><!--
	 --></div>
	<!-- opus_design_btn(E) -->
</div>
<div class= "wrap_search">
<div class="opus_design_inquiry entry_pannel">
	<table>
    	<colgroup>
		<col width="120" />
   		<col width="320" />
		<col width="200" />
 		<col width="*" />
		</colgroup>    
		<tbody>        	
                <tr>
                	<th><bean:message key="Location_Category"/></th>
                	<td id="location"><!-- 
			             --><input type="radio" name="radio_location" id="radio_location" value="O" checked onclick="on_location(this);" /><label for = "radio_location">Operation Location</label><!-- 
			             --><input type="radio" name="radio_location" id="radio_location1" value="C" onclick="on_location(this);" /><label for = "radio_location1">Customer Location</label> 
			        </td>
			        <th><bean:message key="Search"/></th>
			        <td id="search">
			            <input type="radio" name="radio_search" id="radio_search" value="A"  checked onclick="on_search('A');" /><label for = "radio_search">All</label><!-- 
			             --><input type="radio" name="radio_search" id="radio_search1" value="C"  onclick="on_search('C');"/><label for = "radio_search1">Contract</label>
			        </td>
		        </tr>
		        <tr>
		        	<th><bean:message key="Type"/></th>
			        <td>
			        	<!-- <script type="text/javascript">ComComboObject('cust_cd', 1, 200, 1);</script> -->
			        		<select name="cust_cd" id="cust_cd" class="search_form" onchange="cust_cd_OnChange();" style="width: 180px;">
			        			
             				</select>
		            </td>
		            <th></th>
		            <td></td>
		        </tr>
				<tr>
					<th><bean:message key="Code"/></th>
					<td><input name="loc_cd" type="text" class="L_input" id="textfield" value="<%=loc_cd%>"  dataformat="engup" maxlength="32" style="text-transform:uppercase;" /></td>
                    <th><bean:message key="Location_Customer_Name"/></th>
                    <td><input name="loc_nm" type="text" class="L_input" id="textfield" value="<%=loc_nm%>"  dataformat="engup" otherchar="`~!@#$%^&*\/-=+_"  maxlength="200" style="text-transform:uppercase;"  /></td>
				</tr>
				<tr>
					<th><bean:message key="Contract_No1"/></th>
					<td><input name="ctrt_no" type="text" class="L_input_R" id="textfield" dataformat="engup" otherchar="'`~!@#$%^&*\/-=+_" maxlength="32" readOnly /></td>
                    <th><bean:message key="Contract_Name"/></th>
                    <td><input name="ctrt_nm" type="text" class="L_input_R" id="textfield" dataformat="engup" otherchar="'`~!@#$%^&*\/-=+_"  maxlength="200" readOnly /></td>
				</tr>
			</tbody>
	</table>
</div>
</div>
<div class="wrap_result">
	<!-- opus_design_grid(S) -->
	<div class="opus_design_grid clear" id="mainTable_sheet1" style="display:none">
		<script type="text/javascript">comSheetObject('sheet1');</script>
	</div>
	
	<div class="opus_design_grid clear" id="mainTable_sheet2" style="display:none">
		<script type="text/javascript">comSheetObject('sheet2');</script>
	</div>
	
	<div class="opus_design_grid clear" id="mainTable_sheet3" style="display:none">
		<script type="text/javascript">comSheetObject('sheet3');</script>
	</div>
	
	<h3 class="title_design"><bean:message key="Contact"/></h3>
	<div class="opus_design_grid clear" id="mainTable_sheet4" style="display:none">
		<script type="text/javascript">comSheetObject('sheet4');</script>
	</div>
	
	<div class="opus_design_grid clear" id="mainTable_sheet5" style="display:none">
		<script type="text/javascript">comSheetObject('sheet5');</script>
	</div>
</div>
</form>
<%@include file="/apps/fis/wms/bizcommon/include_common.jsp"%>
