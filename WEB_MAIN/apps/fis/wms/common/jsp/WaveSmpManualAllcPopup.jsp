<%--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : ManualAllcPopup.jsp
*@FileTitle  : Manual Allocation
*@author     : Khang.Dong - DOU Network
*@version    : 1.0
*@since      : 2015/07/09
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
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/WMS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="./apps/fis/wms/common/js/WaveSmpManualAllcPopup.js?ver=<%=CLT_JS_VER%>"></script>
<%
	String div       = ""; //div : ALLC, WAVE
	                       //ALLC일경우 search_no에 단일 부킹번호 wob_bk_no
	                       //WAVE일경우 search_no에 wave_no
	String cond_div  = "";
	String search_no = "";
	String wob_bk_no = ""; //booking no
	String wave_no   = ""; //wave no
	String rum       = ""; //순번
	String wh_cd	 = ""; //wh_cd
	try {
		div       = request.getParameter("div")== null?"":request.getParameter("div");
		cond_div  = request.getParameter("cond_div")== null?"ALL":request.getParameter("cond_div");
		search_no  = request.getParameter("search_no")== null?"":request.getParameter("search_no");
		if("ALLC".equals(div))
		{
			wob_bk_no = request.getParameter("search_no")== null?"":request.getParameter("search_no");
		}
		else
		{
			wave_no = request.getParameter("search_no")== null?"":request.getParameter("search_no");
		}
		rum       = request.getParameter("rum")== null?"":request.getParameter("rum");
		wh_cd     = request.getParameter("wh_cd")== null?"":request.getParameter("wh_cd");
		
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
<input type="hidden" id="div" name="div" value="<%=div%>"/>
<input type="hidden" id="cond_div" name="cond_div" value="<%=cond_div%>"/>
<input type="hidden" id="search_no" name="search_no" value="<%=search_no%>"/>
<input type="hidden" id="wob_bk_no" name="wob_bk_no" value="<%=wob_bk_no%>"/>
<input type="hidden" id="wave_no" name="wave_no" value="<%=wave_no%>"/>
<input type="hidden" id="rum" name="rum" value="<%=rum%>"/>
<input type="hidden" id="wh_cd" name="wh_cd" value="<%=wh_cd%>"/>
<input type="hidden" id="prev_rum" name="prev_rum" />
<input type="hidden" id="curr_rum" name="curr_rum" />
<input type="hidden" id="next_rum" name="next_rum" />
<input type="hidden" id="tol_rum" name="tol_rum" />
<input type="hidden" id="sao_sys_no" name="sao_sys_no" />
<input type="hidden" id="item_sys_no" name="item_sys_no" />
<input type="hidden" id="item_seq" name="item_seq" />
<input type="hidden" id="inbound_dt" name="inbound_dt" />
<input type="hidden" id="expiration_dt" name="expiration_dt" />
<input type="hidden" id="just_lot_id" name="just_lot_id" />
<input type="hidden" id="walc_no" name="walc_no" />
<input type="hidden" id="fix_loc_cd" name="fix_loc_cd" />
<input type="hidden" id="fix_loc_cd_nm" name="fix_loc_cd_nm" />
<input type="hidden" name="user_id" value="" />
<input type="hidden" name="user_nm" value="" />
<input type="hidden" name="org_cd" value="" />
<input type="hidden" id="pickd_flg" name="pickd_flg" />



	<div class="layer_popup_title">
		<div class="page_title_area clear">
			<!-- page_title(S) -->
			<h2 class="page_title">
				<span><bean:message key="Manual_Allocation"/></span>
			</h2>
			<!-- page_title(E) -->
			<!-- opus_design_btn(S) -->
			<div class="opus_design_btn">
				<button type="button" class="btn_accent" name="btn_Search" id="btn_Search" onClick="doWork('SEARCHLIST');"><bean:message key="Search"/></button><!--
					--><button type="button" class="btn_normal" name="btn_Apply" id="btn_Apply" onClick="doWork('btn_Apply');"><bean:message key="Apply_Alloc"/></button><!-- 
					 --><button type="button" class="btn_normal" name="btn_Close" id="btn_Close" onClick="doWork('CLOSE');"><bean:message key="Close"/></button>
			</div>
			<!-- opus_design_btn(E) -->
		</div>
	</div>
	<div class="layer_popup_contents">
		<!-- opus_design_inquiry(S) -->
		<div class="wrap_search">
			<div class="opus_design_inquiry entry_pannel">
				<table>
					<colgroup>
						<col width="100">
						<col width="130">
						<col width="80">
						<col width="*" />
					</colgroup>
					<tbody>
						<tr>
							<th><bean:message key="Booking_No"/></th>
							<td><input name="s_wob_bk_no" id = "s_wob_bk_no" type="text" style="width:120px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);" readOnly tabindex="-1" /></td>
							<th><bean:message key="Item"/></th>
							<td><input name="item_cd" otherchar = "<%=WMS_OTHER_CHAR%>" id="item_cd" type="text" style="width:90px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);" readonly tabindex="-1"/><!--
							--><input name="item_nm" id="item_nm" type="text" style="width:236px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);" readonly tabindex="-1"/><!-- 
							 --><button type="button" class="btn_left" name="btn_prev" id="btn_prev" onClick="doWork('btn_prev');"></button><!-- 
							 --><button type="button" class="btn_right" name="btn_next" id="btn_next" onClick="doWork('btn_next');"></button></td>
							 <!-- #6027 [LATONA] WMS 개선 문의사항 - Auto Allocation 이후, LP 수량 수정 가능하도록 -->
							 <th><bean:message key="ovr_aloc_yn"/></th>
							 <td><input name="ovr_aloc_yn " id = "ovr_aloc_yn" type="text" style="width:20px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);" readOnly tabindex="-1" /></td>
								<%-- <img width="20px" height="15px" src="<%=CLT_PATH%>/web/images/common/btn_pre.gif" style="cursor:hand" id="btn_prev" onclick="btn_Prev();">
								<img width="20px" height="15px" src="<%=CLT_PATH%>/web/images/common/btn_next.gif" style="cursor:hand" id="btn_next" onclick="btn_Next();"> --%>
							<tr>
					</tbody>
				</table>
			</div>
		</div>
		<div class="wrap_result">
			<div class="opus_design_inquiry">
				<table>
					<colgroup>
						<col width="100">
						<col width="210">
						<col width="70">
						<col width="180">
						<col width="70">
						<col width="*">
					</colgroup>
					<tbody>
						<tr>
							<th><bean:message key="Inbound_Date"/></th>
							<td><input  name="fm_in_date" id="fm_in_date" type="text" onkeypress="onlyNumberCheck();" onkeyup="mkDateFormatType(this, event, false,1)" onblur="mkDateFormatType(this, event, true,1)" size="11" maxlength="10" style="width:75px;" OnBeforeDeactivate="ComAddSeparator(this)" OnBeforeActivate="ComClearSeparator(this)" 
							onblur="chkCmprPrd(firCalFlag, false, this, this, form.to_in_date);firCalFlag=false;"/><!-- 
								 --><span class='dash'>~</span><!-- 
								 --><input   name="to_in_date" id="to_in_date" type="text" maxlength="10" style="width:75px;" onkeypress="onlyNumberCheck();" onkeyup="mkDateFormatType(this, event, false,1)" onblur="mkDateFormatType(this, event, true,1)" size="11" OnBeforeDeactivate="ComAddSeparator(this)" OnBeforeActivate="ComClearSeparator(this)" 
								 onblur="chkCmprPrd(firCalFlag, false, this, form.fm_in_date, this);firCalFlag=false;" /><!-- 
								 --><button class="calendar" type="button" name="btn_to_in_date" id="btn_to_in_date" onClick="doWork('btn_to_in_date');"></button>					
							</td>
							<th><bean:message key="Lot_ID"/></th>
							<td><input name="fix_lot_id" id="fix_lot_id" type="text" style="ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);"/></td>
							<th><bean:message key="Item_Lot_No"/></th>
							<td>
								<input name="lot_no" id="lot_no" type="text" style="ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);"/>
							</td>
							</tr>
							<tr>					
							<th><bean:message key="Expiration_Date"/></th>
							<td>
								<input name="exp_dt" id="exp_dt" type="text" dataformat="ymd" maxlength="10" style="width:75px;" OnBeforeDeactivate="ComAddSeparator(this)" OnBeforeActivate="ComClearSeparator(this)"
								onclick = "OmsFunFocusDel(this)" onblur="chkCmprPrd(firCalFlag, false, this, this, this);firCalFlag=false;" onkeypress="onlyNumberCheck();"
	        					onkeyup="mkDateFormatType(this, event, false,1)" onblur="mkDateFormatType(this, event, true,1)"/><!-- 
								 --><button class="calendar" type="button" name="btn_exp_dt" id="btn_exp_dt" onClick="doWork('btn_exp_dt');"></button>
							</td>
							<th><bean:message key="Lot_4"/></th>
							<td>
								<input name="lot_04" id="lot_04" type="text" style="ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);"/>
							</td>
							<th><bean:message key="Lot_5"/></th>
							<td>
								<input name="lot_05" id="lot_05" type="text" style="ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);"/>
							</td>
						</tr>
						<tr>
							<th><bean:message key="Location"/></th>
							<td ><input name="wh_loc_nm" id="wh_loc_nm" type="text" style="width:165px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);getLocationInfo('c')" OnKeyDown="if(event.keyCode==13){doWork('btn_wh_loc_cd');}" onChange="getLocationInfo('c')"/><!-- 
								 --><button type="button" name="btn_wh_loc_cd" id="btn_wh_loc_cd" onClick="doWork('btn_wh_loc_cd');" class="input_seach_btn" tabindex="-1"></button><!-- 
								 --><input type="hidden" id="wh_loc_cd" name="wh_loc_cd" /><!-- 
								 --><input type="hidden" id="wh_loc_nm_org" name="wh_loc_nm_org" />
							</td>
							<th><bean:message key="LP#"/></th>
                       	 	<td><input name="lic_plat_no" id="lic_plat_no" type="text" style="ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);"/><!-- 
                       	 	 --><textarea name="hbl_no"  id="hbl_no" class="L_textarea" onblur="" dataformat="etc" style="resize:none;width:148px;ime-mode:disabled;text-transform:uppercase;display: none;"></textarea></td>
                        	<th><bean:message key="TR_CNTR_NO"/></th>
                        	<td><input type="text" name="eq_no"  id="eq_no" class="L_textarea" onBlur="strToUpper(this);" dataformat="excepthan" style="resize:none;width:148px;ime-mode:disabled;text-transform:uppercase;"/></td>
                    	</tr>
                    	<tr>
	                        <th><bean:message key="Reference_No"/></th>
	                        <td><input name="ref_no" id="ref_no" type="text" dataformat="excepthan" onBlur="strToUpper(this);" maxlength="100" style="resize:none;width:165px;ime-mode:disabled;text-transform:uppercase;"/></td>
	                        <th><bean:message key="Serial"/>#</th>
	                        <td><input name="item_ser_no" id="item_ser_no" type="text" dataformat="excepthan" onBlur="strToUpper(this);" maxlength="100" style="resize:none;width:148px;ime-mode:disabled;text-transform:uppercase;"/></td>
	                        <th><bean:message key="PO"/>#</th>
	                        <td><input name="po_no" id="po_no" type="text" dataformat="excepthan" onBlur="strToUpper(this);" maxlength="100" style="resize:none;width:148px;ime-mode:disabled;text-transform:uppercase;"/></td>
                    	</tr>
					</tbody>
				</table>
			</div>
			<p class="line_bluedot"></p>
			<div class="opus_design_grid clear">
				<h3 class="title_design"><bean:message key="Stock_List"/></h3>
				<div style="text-align:Right; padding-bottom:5px;">
				<bean:message key="Order_Qty"/> <input name="item_ea_qty" id="item_ea_qty" type="text" dataformat="float" style="width:90px;text-align:right;" readonly tabindex="-1"/>
				&nbsp;&nbsp;<bean:message key="Allocation_Qty"/> <input name=alloc_ea_qty id="alloc_ea_qty" type="text" dataformat="float" style="width:90px;text-align:right;" readonly tabindex="-1"/>
				&nbsp;&nbsp;<bean:message key="Un-Allocation_Qty"/> <input name="un_alloc_qty" id="un_alloc_qty" type="text" dataformat="float" style="width:90px;text-align:right;" readonly tabindex="-1"/>
				</div>
				<script type="text/javascript">comSheetObject('sheet1');</script>
				
			</div>
			<h3 align="center" id='navigation_item' name='navigation_item'></h3>
		</div>
	</div>
	<div id="COMPLETE_IMG" style="position:fixed;display:none; filter:alpha(opacity = 100); width:280px;height:60px;top:50%;left:50%;margin:-30px 0 0 -140px;z-index:999">
		<iframe src='<%=CLT_PATH%>/js/common/completed.html' scrolling='no'  style='margin-top: 0px; width:100%; height: 60px;'></iframe>
	</div>
</form>	
<%-- <%@include file="/apps/fis/wms/bizcommon/include_common.jsp"%> --%>

