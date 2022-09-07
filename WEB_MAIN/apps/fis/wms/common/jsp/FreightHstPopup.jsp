<%--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : FreightHstPopup.jsp
*@FileTitle  : Freight History
*@author     : Phuoc.Le - DOU Network
*@version    : 1.0
*@since      : 2015/03/19
=========================================================--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging" prefix="paging" %>
<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ModalCalendar.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript" src="./apps/fis/wms/common/js/FreightHstPopup.js?ver=<%=CLT_JS_VER%>"></script> 

<%
	String frt_doc_no = "";
	String doc_cls_cd = "";
	
	try {
		frt_doc_no = request.getParameter("frt_doc_no");
		doc_cls_cd = request.getParameter("doc_cls_cd");
		
		if(frt_doc_no == null){
			frt_doc_no = "";
		} 
		if(doc_cls_cd == null){
			doc_cls_cd = "";
		} 
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
	 <input type="hidden" name="f_cmd" /> 
	 <input type="hidden" name="user_id" value="<%=userInfo.getUsrid()%>" /> 
	 <input type="hidden" name="user_nm" value="<%=userInfo.getUser_name()%>" />
	 <input type="hidden" name="org_cd"  value="<%=userInfo.getOfc_cd()%>"  />
	 <input type="hidden" name="org_nm"  value="<%=userInfo.getOfc_locl_nm()%>"  /> 
 	
 	<div class="layer_popup_title">
	 	<div class="page_title_area clear">
			<!-- page_title(S) -->
			<h2 class="page_title">
				<span><bean:message key="Freight_History"/></span>
			</h2>
			<!-- page_title(E) -->
			<!-- opus_design_btn(S) -->
			<div class="opus_design_btn">
				<button type="button" class="btn_accent" id="btn_Close" name="btn_Close" onClick="doWork('CLOSE');"><bean:message key="Close"/></button><!-- 
			 --></div>
			<!-- opus_design_btn(E) -->
		</div>
	</div>
	
	<div class="layer_popup_contents">
		<div class= "wrap_search">
			<div class="opus_design_inquiry entry_pannel ">
				<table>
					<colgroup>
	                    <col width="100" />
	                    <col width=""/>
	                </colgroup>
	                <tr>
	                	<%
	               	    if(doc_cls_cd.equals("W")){
	                	%>
						<th>Work Order No.</th>
						<%
						}else if(doc_cls_cd.equals("S")){
						%>
						<th>Service Order No.</th>
						<%
						}else if(doc_cls_cd.equals("F")){
						%>
						<th>FCR No.</th>
						<%
						}
						%>
						<td>
							<input name=frt_doc_no type="text" class="L_input_R" id="frt_doc_no" style="width:150px" dataformat="engup" value="<%=frt_doc_no%>" readOnly/>
							<input name=doc_cls_cd type="hidden" value="<%=doc_cls_cd%>" />
						</td>
					</tr>
				</table>
			</div>
		</div>
		
		<div class="wrap_result_tab">
			<ul id="ulTab" class="opus_design_tab">
				<li id=Tab01 class="nowTab"><a href="javascript:void();" onClick="goTabSelect('01')" style="cursor:hand;" ><span><bean:message key="Selling_History"/></span></a></li>
		        <li id=Tab02><a href="javascript:void();" onClick="goTabSelect('02')" style="cursor:hand;" ><span><bean:message key="Buying_History"/></span></a></li>
		        <li id=Tab02><a href="javascript:void();" onClick="goTabSelect('03')" style="cursor:hand;" ><span><bean:message key="View_History"/></span></a></li>
			</ul>
			
			<div id="tabLayer" name="tabLayer" style="display:inline">
				<div class="opus_design_grid clear">
					<script type="text/javascript">comSheetObject('sheet1');</script>
				</div>
			</div>
			
			<div id="tabLayer" name="tabLayer" style="display:none">
				<div class="opus_design_grid clear">
					<script type="text/javascript">comSheetObject('sheet2');</script>
				</div>
			</div>
			
			<div id="tabLayer" name="tabLayer" style="display:none">
				<div class="opus_design_grid clear">
					<script type="text/javascript">comSheetObject('sheet3');</script>
				</div>
			</div>
		</div>
		
		<div class="wrap_result" style="padding-top: 0px;">
			<h3 class="title_design"><bean:message key="Delete_history"/></h3>
			<div class="opus_design_grid clear">
				<script type="text/javascript">comSheetObject('sheet4');</script>
			</div>
		</div>
	</div>
</form>
<%@include file="/apps/fis/wms/bizcommon/include_common.jsp"%>
