<%--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : ContractRoutePopup.jsp
*@FileTitle  : 
*@author     : Lam.Nguyen Dou Network
*@version    : 1.0
*@since      : 2015/03/11
=========================================================--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="./apps/fis/wms/common/js/ContractRoutePopup.js?ver=<%=CLT_JS_VER%>"></script>
     
	<script type="text/javascript" src="./js/common/message/<%=CLT_MSG_PATH%>/WMS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
<%
	String ctrt_no = "";
	String ctrt_nm = "";
	String ord_tp_lvl1_cd = "";
	String ord_tp_lvl2_cd = "";
	String ctrt_use_flg = "";
	String old_ctrt_no = "";
	String old_rpt_no = "";

	try {
		ctrt_no = request.getParameter("ctrt_no") == null ? "" : request.getParameter("ctrt_no");
		ctrt_nm = request.getParameter("ctrt_nm") == null ? "" : request.getParameter("ctrt_nm");

		ord_tp_lvl1_cd = request.getParameter("ord_tp_lvl1_cd") == null ? "" : request.getParameter("ord_tp_lvl1_cd");
		ord_tp_lvl2_cd = request.getParameter("ord_tp_lvl2_cd") == null ? "" : request.getParameter("ord_tp_lvl2_cd");
		ctrt_use_flg = request.getParameter("ctrt_use_flg") == null ? "" : request.getParameter("ctrt_use_flg");

		old_ctrt_no = request.getParameter("old_ctrt_no") == null ? "" : request.getParameter("old_ctrt_no");
		old_rpt_no = request.getParameter("old_rpt_no") == null ? "" : request.getParameter("old_rpt_no");
	} catch (Exception e) {
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
<input type="hidden" id="f_cmd" />
<input type="hidden" id="f_CurPage" />
<input type="hidden" name="ctrt_cust_cd_old" id="ctrt_cust_cd_old"/>
<input type="hidden" name="cancel_flg" id="cancel_flg"/>
<input type="hidden" name="ord_tp_lvl1_cd" value="<%=ord_tp_lvl1_cd%>" id="ord_tp_lvl1_cd"/>
<input type="hidden" name="ord_tp_lvl2_cd" value="<%=ord_tp_lvl2_cd%>" id="ord_tp_lvl2_cd"/>
<input type="hidden" name="ctrt_use_flg"   value="<%=ctrt_use_flg%>" id="ctrt_use_flg"/>
<input type="hidden" name="old_ctrt_no"    value="<%=old_ctrt_no%>" id="old_ctrt_no"/>
<input type="hidden" name="old_rpt_no"     value="<%=old_rpt_no%>" id="old_rpt_no"/>
<input type="hidden" name="org_cd" 		   value="KRSELLB" id="org_cd"/>

<input type="hidden" name="search_flg" value="N" id="search_flg"/>
	<!-- page_title_area(S) -->
	<div class="page_title_area clear">
	
		<!-- page_title(S) -->
		<h2 class="page_title"><span><bean:message key="Contract_Search"/></span></h2>
		<!-- page_title(E) -->
					
		<!-- opus_design_btn(S) -->
		<div class="opus_design_btn">
			<button type="button" class="btn_accent" name="btn_Search" id="btn_Search" onClick="form.f_CurPage.value=1;doWork('SEARCHLIST');"><bean:message key="Search"/></button><!-- 
			 --><button type="button" class="btn_normal" name="btn_OK" id="btn_OK" onClick="doWork('btn_OK');"><bean:message key="OK"/></button><!-- 
			 --><button type="button" class="btn_normal" name="btn_Close" id="btn_Close" onClick="doWork('CLOSE');"><bean:message key="Close"/></button>
		</div>
		<!-- opus_design_btn(E) -->	
	
		<!-- page_location(S) -->
		<div class="location">	
			<span id="navigation"></span>
		</div>
		<!-- page_location(E) -->
		
	</div>
	<!-- page_title_area(E) -->


		<div class="wrap_search">
			<!-- opus_design_inquiry(S) -->
			<div class="opus_design_inquiry ">
				<table>
					<colgroup>
						<col width="120" />
						<col width="120" />
						<col width="110" />
						<col width="*" />
					</colgroup>
					<tbody>
						<tr>
							<th><bean:message key="Contract_No1"/></th>
							<td><input name="ctrt_no" type="text" class="L_input" value="<%=ctrt_no%>" style="width:100px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" otherchar="-_" onBlur="strToUpper(this);" onkeypress="if(event.keyCode==13){doWork('SEARCHLIST')}"
								maxlength="10"/></td>
							<th><bean:message key="Contract_Name"/></th>
							<td><input name="ctrt_nm" type="text" class="L_input"
								value="<%=ctrt_nm%>" style="width:172px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" otherchar = " ()-_" onBlur="strToUpper(this);" maxlength="100" onkeypress="if(event.keyCode==13){doWork('SEARCHLIST')}"/></td>
						</tr>
						<tr>
							<th><bean:message key="Contract_Main_Customer"/></th>
							<td colspan="3">
								<input name="ctrt_cust_cd" type="text" class="L_input" style="width:70px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" maxlength="20"  OnKeyPress="if(event.keyCode==13){codeNameAction('CUSTUMER',form.ctrt_cust_cd,'onKeyDown');}"  onBlur="strToUpper(this);codeNameAction('CUSTUMER',form.ctrt_cust_cd,'onBlur');"/><!-- 
						 		 --><button type="button" class="input_seach_btn" name="btn_ctrt_cust_cd" id="btn_ctrt_cust_cd" alt="search" onClick="doWork('btn_ctrt_cust_cd');"></button><!-- 
						 		--><input name="ctrt_cust_nm" id="ctrt_cust_nm" type="text" class="L_input_R" style="width:300px;" readonly />
					 		</td>
						</tr>
					</tbody>
				</table>
			</div>
			<!-- opus_design_inquiry(E) -->
		</div>
		
		<div class="wrap_result">
			<!-- opus_design_grid(S) -->
			<div class="opus_design_grid clear">
				<script type="text/javascript">
					comSheetObject('sheet1');
				</script>
				 <div class="opus_design_inquiry">
		              <table border="0">
							<tr>
								<td width="100">
									<bean:define id="tmpMapVal" name="EventResponse" property="mapVal"/>
									<bean:define id="pagingVal" name="tmpMapVal"     property="paging"/>
									<paging:options name="pagingVal" defaultval="200"/>
								</td>
								<td align="center" width="700">
									<table width="700">
										<tr>
											<td width="700" id="pagingTb" style='font-family: "Tahoma", "Arial", "Verdana";font-size: 11px;'>
											</td>
										</tr>
									</table>		
								</td>
								<td width="100"></td>
							</tr>
						</table>
					</div>
			</div>
			
			<div class="opus_design_grid clear" style="display: none;">
				<script type="text/javascript">
					comSheetObject('sheet2');
				</script>
			</div>
			<div class="opus_design_grid clear">
				<script type="text/javascript">
					comSheetObject('sheet3');
				</script>
			</div>
		</div>
</form>
<%-- <%@include file="/apps/fis/wms/bizcommon/include_common.jsp"%> --%>
