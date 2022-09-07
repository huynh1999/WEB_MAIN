<!-- /*=========================================================
*Copyright(c) 2015 CyberLogitec. All Rights Reserved.
*@FileName   : TransloadingInboundItemPopup.jsp
*@FileTitle  : TransloadingInboundItemPopup
*@author     : TinLuong - DOU Network
*@version    : 1.0
*@since      : 2015/06/25
=========================================================*/ -->
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
    <script type="text/javascript" src="./apps/fis/wms/common/js/TransloadingInboundItemPopup.js?ver=<%=CLT_JS_VER%>"></script>                                                                                                                                                                                                                               
<%
	String wh_cd = "";
	String ctrt_no = "";
	String tlo_no = "";
	String tlo_seq = "";
	String bk_no = "";
	String truck_tpsz_cd = "";
	String cntr_tpsz_cd = "";
	
	try {
		wh_cd = request.getParameter("wh_cd")== null?"":request.getParameter("wh_cd");
		ctrt_no = request.getParameter("ctrt_no")== null?"":request.getParameter("ctrt_no");
		tlo_no = request.getParameter("tlo_no")== null?"":request.getParameter("tlo_no");
		tlo_seq = request.getParameter("tlo_seq")== null?"":request.getParameter("tlo_seq");
		bk_no = request.getParameter("bk_no")== null?"":request.getParameter("bk_no");
		truck_tpsz_cd = request.getParameter("truck_tpsz_cd")== null?"":request.getParameter("truck_tpsz_cd");
		cntr_tpsz_cd = request.getParameter("cntr_tpsz_cd")== null?"":request.getParameter("cntr_tpsz_cd");
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
 
<input type="hidden" name="user_id" 		value="<%=userInfo.getUsrid()%>" /> 
<input type="hidden" name="user_nm" 		value="<%=userInfo.getUser_name()%>" />
<input type="hidden" name="org_cd" 			value="<%=userInfo.getOfc_cd()%>" />
<input type="hidden" name="org_nm" 			value="<%=userInfo.getOfc_eng_nm()%>" /> 
<%-- <input type="hidden" name="auth_lvl" 		value="<%=userInfo.getAuth_lvl()%>" /> --%>
<input type="text" name="wh_cd" 		    value="<%=wh_cd%>" />
<input type="text" name="ctrt_no" 		value="<%=ctrt_no%>" />
<input type="text" name="tlo_no" 			value="<%=tlo_no%>" />
<input type="text" name="tlo_seq" 		value="<%=tlo_seq%>" />
<input type="text" name="bk_no" 			value="<%=bk_no%>" />
<input type="text" name="truck_tpsz_cd" 	value="<%=truck_tpsz_cd%>" />
<input type="text" name="cntr_tpsz_cd" 	value="<%=cntr_tpsz_cd%>" />
<input type="hidden" name="item_ea_qty" 	value="" />
<input type="hidden" name="item_cbm" 	value="" />
<input type="hidden" name="item_grs_kgs" 	value="" />
<input type="hidden" name="item_grs_lbs" 	value="" />

<div class="layer_popup_title">
	<!-- page_title_area(S) -->
	<div class="page_title_area clear">
	
		<!-- page_title(S) -->
		<h2 class="page_title"><span><bean:message key="Inbound_Item_List"/></span></h2>
		<!-- page_title(E) -->
					
		<!-- opus_design_btn(S) -->
		<div class="opus_design_btn">
			<button type="button" class="btn_accent" name="btn_row_add" id="btn_row_add"><bean:message key="Add"/></button><!-- 
			 --><button type="button" class="btn_normal" name="btn_row_del" id="btn_row_del"><bean:message key="Btn_Del"/></button><!-- 
			 --><button type="button" class="btn_normal" name="btn_save" id="btn_save"><bean:message key="Save"/></button><!-- 
			  --><button type="button" class="btn_normal" name="btn_apply" id="btn_apply"><bean:message key="Apply"/></button><!-- 
			  --><button type="button" class="btn_normal" name="btn_Close" id="btn_Close"><bean:message key="Close"/></button><!-- 
		 --></div>
		<!-- opus_design_btn(E) -->	
	
		<!-- page_location(S) -->
		<div class="location">	
			<span id="navigation"></span>
		</div>
		<!-- page_location(E) -->
		
	</div>
	<!-- page_title_area(E) -->
</div>

<div class="layer_popup_contents">

		<div class="wrap_search">
			<!-- opus_design_inquiry(S) -->
			<div class="opus_design_inquiry entry_pannel">
				<table>
                    <colgroup>
                        <col width="50" />
                        <col width="100" />
                        <col width="100" />
                        <col width="100" />
                        <col width="100" />
                        <col width="100" />
                        <col width="100" />
                        <col width="100" />
                        <col width="100" />
                        <col width="100" />
                        <col width="100" />
                        <col width="100" />
                        <col width="100" />
                        <col width="100" />
                        <col width="100" />
                        <col width="10" />
                        <col width="*" />
                    </colgroup>
                    <tbody>
	                    <tr>
							<th><bean:message key="TP/SZ"/></th>
							<td><input name="tpsz_cd" type="text" class="L_input_R" id="tpsz_cd"  dataformat="engupnum" style="width:85px;" readonly /></td>
							<th></th>
							<th><bean:message key="Load_Capa"/></th>
							<th><bean:message key="CBM"/></th>
							<td><input name="std_cbm" type="text" class="L_input_R" id="std_cbm" style="width:85px;text-align:right;" dataformat="float" readonly /></td>
							<th></th>
							<th><bean:message key="KG"/></th>
							<td><input name="std_kgs" type="text" class="L_input_R" id="std_kgs" style="width:85px;text-align:right;" dataformat="float" readonly /></td>
							<th></th>
							<th><bean:message key="LB"/></th>
							<td><input name="std_lbs" type="text" class="L_input_R" id="std_lbs" style="width:85px;text-align:right;" dataformat="float" readonly /></td>
							<th></th>
							<th><bean:message key="Fill"/></th>
							<td><input name="cal_fill" type="text" class="L_input_R" id="cal_fill" style="width:85px;text-align:right;" dataformat="float" readonly /></td>
							<th>%</th>
							<th></th>
						</tr>
						<tr>
							<th><bean:message key="Total_Qty"/></th>
							<td><input name="cal_item_ea_qty" type="text" class="L_input_R" id="item_ea_qty"  dataformat="engupnum" style="width:85px;text-align:right;" readonly /></td>
							<th></th>
							<th><bean:message key="Loaded_TLT"/></th>
							<th><bean:message key="CBM"/></th>
							<td><input name="cal_item_cbm" type="text" class="L_input_R" id="item_cbm" style="width:85px;text-align:right;" dataformat="float" readonly /></td>
							<th></th>
							<th><bean:message key="KG"/></th>
							<td><input name="cal_item_grs_kgs" type="text" class="L_input_R" id="item_grs_kgs" style="width:85px;text-align:right;" dataformat="float" readonly /></td>
							<th></th>
							<th><bean:message key="LB"/></th>
							<td><input name="cal_item_grs_lbs" type="text" class="L_input_R" id="item_grs_lbs" style="width:85px;text-align:right;" dataformat="float" readonly /></td>
							<th></th>
							<th></th>
							<td></td>
							<th></th>
							<th></th>
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
			</div>
		</div>
	</div>
</form>
<%@include file="/apps/fis/wms/bizcommon/include_common.jsp"%>
