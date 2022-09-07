<%
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : WHList.jsp
*@FileTitle  : 
*@author     : Khanh.Nguyen
*@version    : 1.0
*@since      : 2015/03/12
=========================================================*/
%>

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
    <script type="text/javascript" src="./apps/fis/wms/whloc/script/WHList.js?ver=<%=CLT_JS_VER%>"></script>

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
<input type="hidden" id="f_cmd" value="0"/>
<input type="hidden" name="def_wh_cd" id="def_wh_cd" value="<%=userInfo.getDef_wh_cd()== null?"":userInfo.getDef_wh_cd()%>" />
<input type="hidden" name="def_wh_nm" id="def_wh_nm" value="<%=userInfo.getDef_wh_nm()== null?"":userInfo.getDef_wh_nm()%>" />

<div class="page_title_area clear">

	<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	
	<div class="opus_design_btn TOP">
<%-- 	
			<button type="button" style="display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>"  class="btn_accent" name="btn_search" id="btn_search" onClick="doWork('SEARCHLIST');"><bean:message key="Search"/></button> 
			<button type="button" style="display:none;" btnAuth="<%= roleBtnVO.getAttr2() %>"  class="btn_normal" name="btn_new" id="btn_new" onClick="doWork('NEW');"><bean:message key="New"/></button>
 --%>			
	</div>

	<div class="location">
		<span><%=LEV1_NM%></span> &gt;
	 	<span><%=LEV2_NM%></span> &gt;
	  	<span><%=LEV3_NM%></span>
   		<a href="" class="ir">URL Copy</a>
	</div>
</div>
<div class= "over_wrap">
<div class= "wrap_search">
<div class="opus_design_inquiry entry_pannel">
	<table>
		<colgroup>
               <col width="80">
               <col width="130">
               <col width="100">
               <col width="150">
               <col width="90">
            <col width="*">
	    </colgroup>
	     
		<tr>
						<th><bean:message key="Warehouse"/></th>
						<td>
							<bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
							<bean:define id="WhList" name="cdMap" property="WH_LIST"/>
							<select name="wh_cd" id="wh_cd" class="search_form" style="width: 213px;">
								<option value="" selected><bean:message key="All"/></option>
								<logic:iterate id="WhVO" name="WhList">
									<option value='<bean:write name="WhVO" property="wh_cd"/>'><bean:write name="WhVO" property="wh_nm"/></option>
								</logic:iterate>
							</select>
						 </td>
						<th><bean:message key="City"/></th>
						<td>
						    <input name="sub_loc_cd" type="text" class="" id="sub_loc_cd" maxlength="20" style="width:130px;text-transform:uppercase;"/>
                        </td>
<!--                         <th><bean:message key="Office"/></th> -->
<!-- 						<td><input name="sales_ofc_cd" type="text" class="" id="sales_ofc_cd" style="width:80px;text-transform:uppercase;" OnKeyDown="if(event.keyCode==13){codeNameAction('office','onBlur');}" maxlength="7"  onkeypress="if(event.keyCode==13){codeNameAction('office', 'onKeyDown');}" onblur="codeNameAction('office','onBlur');"/> -->
<!--                              <button type="button" id="btn_sales_ofc_cd" name="btn_sales_ofc_cd" class="input_seach_btn" onClick="doWork('btn_sales_ofc_cd');"></button> -->
<!--                              <input name="sales_ofc_nm" type="text" class="" id="sales_ofc_nm" style="width:130px;text-transform:uppercase;" readOnly tabindex="-1"/> -->
<!--                         </td> -->
						<th><bean:message key="USE"/></th>
						<td>
							<select name="use_yn" id="use_yn" style="width:80px">
								<option value="" selected><bean:message key="All"/></option>
                            	<option value="Y"><bean:message key="Y"/></option>
                                <option value="N"><bean:message key="N"/></option>
                            </select>
						</td>
		</tr>
	</table>
</div>
</div>

<div class="wrap_result">
	<h3 class="title_design"><bean:message key="Warehouse_Search"/></h3>
	<div class="opus_design_grid clear" >
		<script type="text/javascript">comSheetObject('sheet1');</script>
	</div>
	
	<!-- <h3 class="title_design"><bean:message key="Contract_List"/></h3> -->
	<div class="opus_design_grid clear" style="display: none;">
		<div class="opus_design_btn">
			<!-- <button type="button" class="btn_normal" id="btn_ESop" name="btn_ESop" onClick="doWork('btn_ESop');">E-SOP_Details</button> -->
		</div>
		<script type="text/javascript">comSheetObject('sheet2');</script>
	</div>
</div>
</div>
</form>

<script type="text/javascript">
var attr_extension = "<%= roleBtnVO.getAttr_extension() %>";
doBtnAuthority(attr_extension);
</script>