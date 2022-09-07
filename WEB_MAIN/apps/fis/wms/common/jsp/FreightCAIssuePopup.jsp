<%--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : FreightCAIssuePopup.jsp
*@FileTitle  : C/A Issue
*@author     : Phuoc.Le - DOU Network
*@version    : 1.0
*@since      : 2015/03/19
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
    <script type="text/javascript" src="./apps/fis/wms/common/js/FreightCAIssuePopup.js?ver=<%=CLT_JS_VER%>"></script>
    <bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
    
<%
	String frt_doc_no = "";
	String doc_cls_cd = "";
	String in_ca_no = "";
	String in_auto_ca_use = "";
	String in_ca_status_nm = "";
	String readonly_flg = "";
	
	try {
		frt_doc_no = request.getParameter("frt_doc_no")== null?"":request.getParameter("frt_doc_no");
		doc_cls_cd = request.getParameter("doc_cls_cd")== null?"":request.getParameter("doc_cls_cd");
		in_ca_no = request.getParameter("ca_no")== null?"":request.getParameter("ca_no");
		in_auto_ca_use = request.getParameter("auto_ca_use")== null?"":request.getParameter("auto_ca_use");
		in_ca_status_nm = request.getParameter("ca_status_nm")== null?"":request.getParameter("ca_status_nm");
		readonly_flg = request.getParameter("readonly_flg")== null?"":request.getParameter("readonly_flg");
	}catch(Exception e) {
		out.println(e.toString());
	}	
%>

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
<input type="hidden" id="f_cmd" value="0" />
	<input type="hidden" name="user_id" value="ADMIN" /> 
	<input type="hidden" name="user_nm" value="ADMINISTRATION_DOU." />
	<input type="hidden" name="org_cd"  value="KRSELLB"  />
	<input type="hidden" name="org_nm"  value="HJLK CORPORATION"  /> 
	<input type="hidden" name="ok_flag"  value=""  /> 
	<input type="hidden" name="doc_cls_cd"  value="<%=doc_cls_cd%>"  />
	<input type="hidden" name="in_ca_no"  value="<%=in_ca_no%>"  />
	<input type="hidden" name="in_ca_status_nm"  value="<%=in_ca_status_nm%>"  />
	<input type="hidden" name="readonly_flg"  value="<%=readonly_flg%>"  />
	
 	<div class="layer_popup_title">
		<div class="page_title_area clear">
			<!-- page_title(S) -->
			<h2 class="page_title">
				<span><bean:message key="CA_Issue"/></span>
			</h2>
			<!-- page_title(E) -->
			<!-- opus_design_btn(S) -->
			<div class="opus_design_btn">
				<%
	           	if(!readonly_flg.equals("Y")){
	            %>
				<button type="button" class="btn_accent" name="btn_save" id="btn_save" onClick="btn_Save()"><bean:message key="CA_Issue"/></button><!-- 
				 --><%
				}
				%><!-- 
			 --><button type="button" class="btn_normal" name="btn_close" id="btn_close" onClick="btn_Close()"><bean:message key="Close"/></button><!--
		 --></div>
			<!-- opus_design_btn(E) -->
		</div>
	</div>
	
	<div class="layer_popup_contents">
		<div class= "wrap_search">
			<div class="opus_design_inquiry entry_pannel ">
				<table border="0" cellspacing="0" cellpadding="0">
					<colgroup>
						<col width="70" />
						<col width="120" />
						<col width=""/>
					</colgroup>
					<tr>
						<th><bean:message key="DOC_No"/></th>
						<td>
							<input name="frt_doc_no" type="text" class="L_input_R" id="frt_doc_no" value="<%=frt_doc_no%>" dataformat="etc" style="width:117px;" tabindex="-1" readonly />
						</td>
						<td></td>
					</tr>
					<%
	              	if(!readonly_flg.equals("Y")){
	               	%>
	               	<tr>	
						<th><bean:message key="CA_Reason"/></th>
						<td>
						    
						    <bean:define id="MsList" name="cdMap" property="rtn_ca_reason_combo"/>
							<select name="rtn_ca_reason_combo" id="rtn_ca_reason_combo" class="search_form">
								<logic:iterate id="codeVO" name="MsList">
								<option value=''></option>
									<option value='<bean:write name="codeVO" property="code_cd"/>'><bean:write name="codeVO" property="code_nm"/></option>
								</logic:iterate>
							</select>
							<input name="rmk" type="text" class="L_input" id="rmk" style="width:520px;" maxlength="300" onBlur="rmk_len_chk();" />
						</td>
					</tr>
					<%
					}
					%>
				</table>
			</div>
		</div>
		
		<div class="wrap_result">
			<h3 class="title_design"> <bean:message key="CA_Reason_History"/></h3>
			<!-- opus_design_grid(S) -->
			<div class="opus_design_grid clear">
			<!-- opus_design_btn(E) -->
				<script type="text/javascript">comSheetObject('sheet1');</script>
			</div>
		</div>
	</div>
</form>
<%@include file="/apps/fis/wms/bizcommon/include_common.jsp"%>
