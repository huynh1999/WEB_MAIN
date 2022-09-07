
<%--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : InvAdjustPopup.jsp
*@FileTitle  : Inventory Adjustment
*@author     : Nam.Tran - DOU Network
*@version    : 1.0
*@since      : 2015/04/14
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
    <script type="text/javascript" src="./apps/fis/wms/common/js/InvAdjustPopup.js?ver=<%=CLT_JS_VER%>"></script>
    
 	<script type="text/javascript" src="./js/common/message/<%=CLT_MSG_PATH%>/WMS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
<%
	//ResponseObjectInfo responseObjectInfo = (ResponseObjectInfo) request.getAttribute("brokerResult");
	//Object obj = responseObjectInfo.getBusinessReturn();

	//UserInfoVo userInfo = (UserInfoVo) session.getAttribute("AbstractAccountInfo");

	String page_tp = "";	
	String adjust_no = "";
	
	String wib_bk_no = "";
	String po_sys_no = "";
	String item_sys_no = "";
	String lot_id = "";	
	String wh_loc_cd = "";
	String wh_cd = "";
	String po_no = "";
	String item_ser_no = "";
	String lic_plat_no = "";
	
	int set_required = 0;

	try {
		page_tp = request.getParameter("page_tp") == null ? "" : request.getParameter("page_tp");		
		adjust_no = request.getParameter("adjust_no") == null ? "" : request.getParameter("adjust_no");		
		
		wib_bk_no = request.getParameter("wib_bk_no") == null ? "" : request.getParameter("wib_bk_no");
		po_sys_no = request.getParameter("po_sys_no") == null ? "" : request.getParameter("po_sys_no");
		item_sys_no = request.getParameter("item_sys_no") == null ? "" : request.getParameter("item_sys_no");
		lot_id = request.getParameter("lot_id") == null ? "" : request.getParameter("lot_id");		
		wh_loc_cd = request.getParameter("wh_loc_cd") == null ? "" : request.getParameter("wh_loc_cd");
		wh_cd = request.getParameter("wh_cd") == null ? "" : request.getParameter("wh_cd");
		po_no = request.getParameter("po_no") == null ? "" : request.getParameter("po_no");
		item_ser_no = request.getParameter("item_ser_no") == null ? "" : request.getParameter("item_ser_no");
		lic_plat_no = request.getParameter("lic_plat_no") == null ? "" : request.getParameter("lic_plat_no");
		if(page_tp.equals("MGMT")){
			set_required = 1;
		}else{
			set_required = 0;
		}
	} catch (Exception e) {
		out.println(e.toString());
	}

%>
    <bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
   	<script type="text/javascript">
   	<%-- <%=JSPUtil.getIBCodeCombo("reason_cd", "", "WAR", "0", "")%> --%>
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
<input type="hidden" name="form_mode" value="NEW" />
<%-- <input type="hidden" name="curr_date" value="<%=DateUtility.transformDate(CalendarUtilities.dateToString(new Date()), "-")%>" /> --%>
<input type="hidden" name="user_id" value="<%=userInfo.getUsrid()%>" />
<input type="hidden" name="user_nm" value="<%=userInfo.getUser_name()%>" />
<input type="hidden" name="org_cd" value="<%=userInfo.getOfc_cd()%>" />

<input type="hidden" id="c_wib_bk_no" name="c_wib_bk_no" value="<%=wib_bk_no%>"/>
<input type="hidden" id="c_po_sys_no" name="c_po_sys_no" value="<%=po_sys_no%>"/>
<input type="hidden" id="c_item_sys_no" name="c_item_sys_no" value="<%=item_sys_no%>"/>
<input type="hidden" id="c_lot_id" name="c_lot_id" value="<%=lot_id%>"/>
<input type="hidden" id="c_wh_loc_cd" name="c_wh_loc_cd" value="<%=wh_loc_cd%>" />
<input type="hidden" id="c_adjust_no" name="c_adjust_no" value="<%=adjust_no%>"/>
<input type="hidden" id="c_po_no" name="c_po_no" value="<%=po_no%>"/>
<input type="hidden" id="c_item_ser_no" name="c_item_ser_no" value="<%=item_ser_no%>"/>
<input type="hidden" id="c_lic_plat_no" name="c_lic_plat_no" value="<%=lic_plat_no%>"/>

<input type="hidden" id="page_tp" name="page_tp" value="<%=page_tp%>"/>
<input type="hidden" id="po_sys_no" name="po_sys_no" value="" />
<input type="hidden" id="item_sys_no" name="item_sys_no" value="" />
<input type="hidden" id="wh_cd" name="wh_cd" value="<%= wh_cd %>" />
<input type="hidden" id="ctrt_no" name="ctrt_no" value="" />
<input type="hidden" id="so_no" name="so_no" value="" />
<input type="hidden" id="po_no" name="po_no" value="<%= po_no%>" />
<input type="hidden" id="item_ser_no" name="item_ser_no" value="<%= item_ser_no%>" />
<input type="hidden" id="lic_plat_no" name="lic_plat_no" value="<%= lic_plat_no%>" />
<input type="hidden" name="lv1_cbm" id="lv1_cbm" value="0" />
<input type="hidden" name="lv1_cbf" id="lv1_cbf" value="0" />
<input type="hidden" name="lv1_grs_kgs" id="lv1_grs_kgs" value="0" />
<input type="hidden" name="lv1_grs_lbs" id="lv1_grs_lbs" value="0" />
<input type="hidden" name="lv1_net_kgs" id="lv1_net_kgs" value="0" />
<input type="hidden" name="lv1_net_lbs" id="lv1_net_lbs" value="0" />
<input type="hidden" id="f_cmd" value="0" />
<input type="hidden" name="search_flg" value="N" id="search_flg"/>
<input type="hidden" name="cancel_flg" id="cancel_flg"/>
<input type="hidden" name="def_wh_cd" value="<%=userInfo.getDef_wh_cd()%>" />
<input type="hidden" name="wh_list_ath" value="<%=userInfo.getWh_list_ath()%>" /> <!-- Get list warehouse from TB_SEQ table -->
<input type="hidden" name="wh_cfg" value="<%=userInfo.getWh_cfg()%>" /> <!-- Get list warehouse from TB_USR table --> 
<div class="page_title_area clear">
	<!-- page_title(S) -->
	<h2 class="page_title">
			<span><bean:message key="Inventory_Adjustment"/></span>
		</h2>
	<!-- page_title(E) -->
	<!-- opus_design_btn(S) -->
	<div class="opus_design_btn">
			<button type="button" class="btn_accent" name="btnSave" id="btnSave" onClick="doWork('SAVE');"><bean:message key="Save"/></button><!-- 
			 --><button type="button" class="btn_normal" name="btn_Close" id="btn_Close" onClick="doWork('CLOSE');"><bean:message key="Close"/></button>
	</div>
	<!-- opus_design_btn(E) -->
	<!-- page_location(S) -->
		<div class="location">
			<span></span>
		</div>
	<!-- page_location(E) -->
	</div>

<div class= "wrap_search">
	<div class="opus_design_inquiry entry_pannel">
		<table border="0">
		    <colgroup>
	            <col width="30" />
	            <col width="150" />
	            <col width="150" />
	            <col width="150" />
	            <col width="150" />
	            <col width="*" />                    
	        </colgroup>
	        <tbody>
				<tr>
					<th><bean:message key="Adjustment_Key"/></th>
					<td>
						<input name="adjust_no" type="text" class="L_input_R" id="adjust_no" style="width:181px;" readonly/>
					</td>
					<th><bean:message key="Adjustment_Date"/></th>
					<td>
						<input name="adjust_dt" type="text" class="L_input_R" id="adjust_dt" style="width:186px;" readonly/>
					</td>
					<th>&nbsp;</th>
					<td>&nbsp;</td>					
				</tr>     
			</tbody>    
		</table>
	</div>
	
	<div class="opus_design_inquiry wFit">
		<table border="0">
	    <colgroup>
	        <col width="97" />
	        <col width="150" />
	        <col width="150" />
	        <col width="150" />
	        <col width="151" />
	        <col width="*" />                    
	    </colgroup>		
	    <tbody>	
			<tr>
				<th><bean:message key="In_Booking_No"/></th>
				<td>
					<input name="wib_bk_no" type="text" class="L_input_R" id="wib_bk_no" style="width:181px;" readonly/>
				</td>
				<th><bean:message key="Inbound_Date"/></th>
				<td>
					<input name="inbound_dt" type="text" class="L_input_R" id="inbound_dt" style="width:186px;" readonly/>
				</td>
				<th><bean:message key="Location"/></th>
				<td>
					<input name="wh_loc_cd" type="hidden" class="L_input_R" id="wh_loc_cd" style="width:186px;" readonly/>
					<input name="wh_loc_nm" type="text" class="L_input_R" id="wh_loc_nm" style="width:186px;" readonly/>
				</td>					
			</tr>
			<tr>
				<th><bean:message key="Item"/></th>
				<td>
					<input name="item_cd" otherchar = "<%=WMS_OTHER_CHAR%>" type="hidden" class="L_input_R" id="item_cd" style="width:181px;" readonly/>
					<input name="item_nm" type="text" class="L_input_R" id="item_nm" style="width:181px;" readonly/>
				</td>
				<th><bean:message key="Item_Lot_No"/></th>
				<td>
					<input name="lot_no" type="text" class="L_input_R" id="lot_no" style="width:186px;" readonly/>
				</td>
				<th><bean:message key="Lot_Id"/></th>
				<td>
					<input name="lot_id" type="text" class="L_input_R" id="lot_id" style="width:186px;" readonly/>
				</td>					
			</tr>   
		</tbody>	      
	</table>
	</div>
	
	<div class="opus_design_inquiry wFit">
		<table border="0">
		    <colgroup>
	            <col width="97" />
	            <col width="150" />
	            <col width="150" />
	            <col width="150" />
	            <col width="150" />
	            <col width="*" />                    
	        </colgroup>
	            <tbody>
		             <tr>
						<th><bean:message key="Reason"/></th>
						<td>
							<input name="reason_cd_1" type="hidden" class="L_input_R" id="reason_cd_1" readonly required="required"/>
								<%-- <script type="text/javascript">comComboObject('reason_cd', 1, 181, 1, <%=set_required%>);</script>  --%>
								<bean:define id="MsList" name="cdMap" property="reason_cd"/>
								<select name="reason_cd" id="reason_cd" class="search_form" required>
									<logic:iterate id="codeVO" name="MsList">
										<option value='<bean:write name="codeVO" property="code"/>'><bean:write name="codeVO" property="name"/></option>
									</logic:iterate>
								</select>
						</td>
						<th><bean:message key="Available_Qty_(EA)"/></th>
						<td>
							<input name="fr_ea_qty" id="fr_ea_qty" type="text" class="L_input_R" value="" dataformat="float" style="width:186px;text-align:right" readonly/>
						</td>
						<th><bean:message key="ADJ_Qty_EA"/></th>
						<td>
							<input name="to_ea_qty" id="to_ea_qty" type="text" class="L_input" value="" dataformat="num" style="width:186px;text-align:right" maxlength="5" onblur="changeQty();"/>						
						</td>  										  					
				      </tr>
				      <tr>
						<th><bean:message key="Warehouse_PIC"/></th>
						<td>
							<input name="wh_pic_nm" type="text" class="L_input" id="wh_pic_nm" style="width:181px;" maxlength="100"/> 
						</td>
						<th><bean:message key="Available_CBM"/></th>
						<td>
							CBM<input name="fr_cbm" id="fr_cbm" type="text" class="L_input_R" value="0.000" dataformat="float" style="width:60px;text-align:right" readonly/>
							&nbsp;&nbsp;CFT<input name="fr_cbf" id="fr_cbf" type="text" class="L_input_R" value="0.000" dataformat="float" style="width:63px;text-align:right" readonly/>
						</td>
						<th><bean:message key="ADJ_CBM"/></th>
						<!-- #2927 [LOA WMS4.0] ITEM CBM CALCULATION
						<td>
							CBM<input name="to_cbm" id="to_cbm" type="text" class="L_input" value="0.000" dataformat="float" style="width:60px;text-align:right" onblur="checkNumFormat(this, '9999999999.000');"/>
							&nbsp;&nbsp;CFT<input name="to_cbf" id="to_cbf" type="text" class="L_input" value="0.000" dataformat="float" style="width:63px;text-align:right" onblur="checkNumFormat(this, '9999999999.000');"/>
						</td>
						 -->
						<td>
							CBM<input name="to_cbm" id="to_cbm" type="text" class="L_input" value="0.000" dataformat="float" style="width:60px;text-align:right" />
							&nbsp;&nbsp;CFT<input name="to_cbf" id="to_cbf" type="text" class="L_input" value="0.000" dataformat="float" style="width:63px;text-align:right" />
						</td>
		             </tr>  
		             <tr>
						<th><bean:message key="Owner_PIC"/></th>
						<td>
							<input name="owner_pic_nm" type="text" class="L_input" id="owner_pic_nm" style="width:181px;" maxlength="100"/>
						</td>
						<th><bean:message key="Available_GWT"/></th>
						<td>
							KGS&nbsp;<input name="fr_grs_kgs" id="fr_grs_kgs"  type="text" class="L_input_R" value="0.000" dataformat="float" style="width:60px;text-align:right" readonly/>
							&nbsp;&nbsp;LBS&nbsp;<input name="fr_grs_lbs" id="fr_grs_lbs" type="text" class="L_input_R" value="0.000" dataformat="float" style="width:60px;text-align:right" readonly/>						
						</td>
						<th><bean:message key="ADJ_GWT"/></th>
						<td>
							KGS&nbsp;<input name="to_grs_kgs" id="to_grs_kgs" type="text" class="L_input" value="0.000" dataformat="float" style="width:60px;text-align:right" onblur="checkNumFormat(this, '9999999999.000');"/>
							&nbsp;&nbsp;LBS&nbsp;<input name="to_grs_lbs" id="to_grs_lbs" type="text" class="L_input" value="0.000" dataformat="float" style="width:60px;text-align:right" onblur="checkNumFormat(this, '9999999999.000');"/>
						</td>
		             </tr>   
		             <tr>
						<th>&nbsp;</th>
						<td>&nbsp;
						</td>
						<th><bean:message key="Available_NWT"/></th>
						<td>
							KGS&nbsp;<input name="fr_net_kgs" id="fr_net_kgs" type="text" class="L_input_R" value="0.000" dataformat="float" style="width:60px;text-align:right" readonly/>
							&nbsp;&nbsp;LBS&nbsp;<input name="fr_net_lbs" id="fr_net_lbs" type="text" class="L_input_R" value="0.000" dataformat="float" style="width:60px;text-align:right" readonly/>
						</td>
						<th><bean:message key="ADJ_NWT"/></th>
						<td>
							KGS&nbsp;<input name="to_net_kgs" id="to_net_kgs" type="text" class="L_input" value="0.000" dataformat="float" style="width:60px;text-align:right" onblur="checkNumFormat(this, '9999999999.000');"/>
							&nbsp;&nbsp;LBS&nbsp;<input name="to_net_lbs" id="to_net_lbs" type="text" class="L_input" value="0.000" dataformat="float" style="width:60px;text-align:right" onblur="checkNumFormat(this, '9999999999.000');"/>
						</td>
		             </tr>                                           
		             <tr>
						<th><bean:message key="Remark"/></th>					
						<td colspan="5">
							<textarea name="rmk" style="width:868px;height:50px" class="L_textarea" id="rmk" maxlength="1000" onBlur="remark_lenChk();"></textarea>						 
						</td>
		             </tr>
	            </tbody>
			</table>
	</div>
	</div>

<!-- opus_design_inquiry(E) -->
	<div class="wrap_result">
	<!-- opus_design_grid(S) -->
	<div class="opus_design_grid clear" style="display:none">
		<script type="text/javascript">comSheetObject('sheet1');</script>
	</div>
	</div>
	<div id="COMPLETE_IMG" style="position:fixed;display:none; filter:alpha(opacity = 100); width:280px;height:60px;top:50%;left:50%;margin:-30px 0 0 -140px;z-index:999">
		<iframe src='<%=CLT_PATH%>/js/common/completed.html' scrolling='no'  style='margin-top: 0px; width:100%; height: 60px;'></iframe>
	</div>
</form>
<%@include file="/apps/fis/wms/bizcommon/include_common.jsp"%>
