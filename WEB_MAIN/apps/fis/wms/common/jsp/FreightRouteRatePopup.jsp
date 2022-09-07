<%--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : FreightRouteRatePopup.jsp
*@FileTitle  : Route/Rate Information - SEA
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
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoFormControl.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/ModalCalendar.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="./apps/fis/wms/common/js/FreightRouteRatePopup.js?ver=<%=CLT_JS_VER%>"></script>
<%
	String ctrt_no = "";
	String ctrt_nm = "";
	String sb_cls_cd = "";
	String cust_cd = "";
	String cust_nm ="";
	String code_cd = "";
	
	try {
		cust_nm = request.getParameter("cust_nm")== null?"":request.getParameter("cust_nm");
		code_cd = request.getParameter("code_cd")== null?"":request.getParameter("code_cd");
		cust_cd = request.getParameter("cust_cd")== null?"":request.getParameter("cust_cd");
		ctrt_no = request.getParameter("ctrt_no")== null?"":request.getParameter("ctrt_no");
		ctrt_nm = request.getParameter("ctrt_nm")== null?"":request.getParameter("ctrt_nm");
		sb_cls_cd = request.getParameter("sb_cls_cd")== null?"":request.getParameter("sb_cls_cd");
	}catch(Exception e) {
		out.println(e.toString());
	}
%>
<bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
<!--     <script type="text/javascript">     -->
<%-- 	<%=JSPUtil.getIBCodeCombo("ftr_mod", "", "FT1", "0", "")%>	 --%>
<%-- 	<%=JSPUtil.getIBCodeCombo("rate_filer", "", "FT2", "0", "")%> --%>
<%-- 	<%=JSPUtil.getIBCodeCombo("svcterm_fr_cd", "", "WOL", "0", "")%>	 --%>
<%-- 	<%=JSPUtil.getIBCodeCombo("svcterm_to_cd", "", "WOL", "0", "")%> --%>
<!-- 	</script> -->

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
	
<!-- <iframe id="_iFrameWait_" src="/web/img/ibsheet/processing.gif" frameborder="0" marginHeight="0" marginWidth="0" width="343" height="121" style="position:absolute;visibility:hidden;z-index:999;display:none;" ></iframe>                                                                                                                                                                                                                                              -->
                                                                                                                                                                                                                            
<form id="form" name="form">   
 	<input type="hidden" name="f_cmd" value="0"/>
	<input type="hidden" name="user_id" 		value="ADMIN" /> 
	<input type="hidden" name="user_nm" 		value="ADMINISTRATION_DOU." />
	<input type="hidden" name="org_cd" 			value="KRSELLB" />
	<input type="hidden" name="org_nm" 			value="HJLK CORPORATION" /> 
	<input type="hidden" name="auth_lvl" 		value="" />
	<input type="hidden" name="select_ctrt_no"  value=""/>
	<input type="hidden" name="sb_cls_cd" 		value="<%=sb_cls_cd%>" />
	<input type="hidden" name="cust_nm" 		value="<%=cust_nm%>" />
	<input type="hidden" name="cust_cd" 		value="<%=cust_cd%>" />

 	<div class="layer_popup_title">
		<div class="page_title_area clear">
			<!-- page_title(S) -->
			<h2 class="page_title">
				<span><bean:message key="Route_Rate_Information_SEA"/></span>
			</h2>
			<!-- page_title(E) -->
			<!-- opus_design_btn(S) -->
			<div class="opus_design_btn">
				<button type="button" class="btn_accent" name="btn_Search" id="btn_Search" onClick="doWork('SEARCHLIST');"><bean:message key="Search"/></button><!-- 
				 --><button type="button" class="btn_normal" name="btn_OK" id="btn_OK" onClick="doWork('btn_OK');"><bean:message key="OK"/></button><!-- 
	         --><button type="button" class="btn_normal" name="btn_Close" id="btn_Close" onClick="doWork('CLOSE');"><bean:message key="Close"/></button><!--
		 --></div>
		</div>
	</div>
	
	<div class="layer_popup_contents">
		<div class= "wrap_search">
			<div class="opus_design_inquiry entry_pannel">
				<table>
	                <colgroup>
	                    <col width="90" />
	                    <col width="220" />
	                    <col width="130" />
	                    <col width="220" />
	                    <col width="110" />
	                    <col width="" />
	                </colgroup>
	                <tr>
						<th><bean:message key="Contract_No"/></th>
						<td><input name="ctrt_no" type="text" class="L_input" id="ctrt_no"  dataformat="engup" style="width:80px;text-transform:uppercase;" maxlength="10" value="<%=ctrt_no%>" onblur="searchAjaxColInfo('ctrt_no');"/><!-- 
							 --><button type="button" class="input_seach_btn" name="btn_ctrt_no" id="btn_ctrt_no" onClick="doWork('btn_ctrt_no');" alt="search" style="cursor:hand"></button><!-- 
							 --><input name="ctrt_nm" type="text" class="L_input" id="ctrt_nm" dataformat="engup"  style="width:120px;text-transform:uppercase;" value="<%=ctrt_nm%>"/></td>
						<th><bean:message key="Application_Date"/></th>
						<td><input name="eff_dt" type="text" class="L_input" id="eff_dt" style="width:80px;" maxlength="10" OnBeforeDeactivate="ComAddSeparator(this)" OnBeforeActivate="ComClearSeparator(this)"
						onkeypress="onlyNumberCheck();" onkeyup="mkDateFormatType(this, event, false,1)" onblur="mkDateFormatType(this, event, true,1)"/><!-- --><button type="button" class="calendar ir" name="btn_eff_dt" id="btn_eff_dt" alt="search" onClick="doWork('btn_eff_dt');" style="cursor:hand"/></button></td>
						<td></td>
						<td></td>
					</tr>
	                
	            </table>
			</div>
		</div>
	
		<div class="wrap_result_tab">
			<div class="opus_design_grid clear">
				<div class="opus_design_grid clear">	
					<script type="text/javascript">comSheetObject('sheet1');</script>
				</div>
				<ul class="Divide">
	                <li style="width:99.9%;margin-right:15px;">
						<div class="opus_design_inquiry wFit">
		                    <!----- Search S ----->
		                    <div class="TB_input" style="margin-bottom:5px;">
		                        <table>
		                            <colgroup>
		                                <col width="65" />
		                                <col width="200" />
		                                <col width="470" />
		                                <col width="" />
		                            </colgroup>
		                            <tr>
		                                <th><bean:message key="Rate_Filter"/></th>
		                                <td>
<!-- 		                                	<script type="text/javascript">comComboObject('sell_filer', 1, 120, 1);</script> -->
												<bean:define id="sell_filer" name="cdMap" property="sell_filer"/>
												<select name="sell_filer" class="search_form" id="sell_filer" style="width:110px;" onchange="sell_filer_OnChange()">
<!-- 													<option value=''><bean:message key="All"/></option> -->
<!-- 													<logic:iterate id="codeVO" name="sell_filer"> -->
<%-- 														<option value='<bean:write name="codeVO" property="code"/>'><bean:write name="codeVO" property="name"/></option> --%>
<!-- 													</logic:iterate> -->
												</select>
		                                </td>
		                                <th>&nbsp</th>
		                            	<td> </td>
		                            </tr>
		                        </table>                
		                    </div>
		                    <!-----// Search E ----->
		             	</div>
	                </li>
	            </ul>
	            
	            <div class="opus_design_grid clear">
					<script type="text/javascript">comSheetObject('sheet2');</script>
				</div>
			</div>

		</div>
	</div>
</form>
<%@include file="/apps/fis/wms/bizcommon/include_common.jsp"%>

