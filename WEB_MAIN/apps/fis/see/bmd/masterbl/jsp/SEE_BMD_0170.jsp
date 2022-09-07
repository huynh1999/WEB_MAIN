<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>

<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>

<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_CODE_UTIL.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SEA_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript" src="./apps/fis/see/bmd/masterbl/script/SEE_BMD_0170.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript" src="<%=CLT_PATH%>/js/common/autocomplete_ui.js?ver=<%=CLT_JS_VER%>"></script>  <!-- #1208 [OEM Shipping Instruction] Cannot auto suggestion when name inputted -->

<bean:define id="mblVO" name="EventResponse" property="mapVal"/>
<bean:define id="mapVal" name="EventResponse" property="mapVal"/>
<bean:parameter id="intg_bl_seq" name="intg_bl_seq" value=""/>

<script type="text/javascript">
	function setupPage() {
		loadPage();
	}
	var ofcCd = "<%= userInfo.getOfc_cd() %>";
	var userNm = "<%= userInfo.getUser_name() %>";
	var userTel = "<%= userInfo.getPhn() %>";
	var userFax = "<%= userInfo.getFax() %>";
	var userEml = "<%= userInfo.getEml() %>";

	var SHOW_MOTHER_VSL_INFO_ON_SI = 'N';

	var p_intg_bl_seq = "<%= intg_bl_seq %>"

	<logic:notEmpty name="mapVal" property="showMotherVslInfoOnSi">
		SHOW_MOTHER_VSL_INFO_ON_SI = '<bean:write name="mapVal" property="showMotherVslInfoOnSi"/>';
	</logic:notEmpty>
	//<!-- #1208 [OEM Shipping Instruction] Cannot auto suggestion when name inputted -->
	var AUTOCOMPLETE_YN = 'Y';
	 <logic:notEmpty name="mapVal" property="autocompleteYn">
		AUTOCOMPLETE_YN = '<bean:write name="mapVal" property="autocompleteYn"/>';
	</logic:notEmpty> 
</script>

<form name="frm1" method="POST" action="./">
	<input type="hidden" name="f_cmd" id="f_cmd" />
	<!-- Report Value -->
	<input type="hidden" name="cmd_type" id="cmd_type" />
	<input type="hidden" name="title" id="title" />
	<input type="hidden" name="file_name" id="file_name" />
	<input type="hidden" name="rd_param" id="rd_param" />

	<input type="hidden" name="mailTitle" value="" id="mailTitle" />
	<input type="hidden" name="mailTo" value="" id="mailTo" />

	<input type="hidden" name="s_mbl_no" id="s_mbl_no" />

	<!-- Actual Shipper 정보 - Report -->
	<input type="hidden" name="act_shpr" id="act_shpr" />

	<!--  Report ==> OutLook연동 파라미터 (S) -->
	<input type="hidden" name="intg_bl_seq" id="intg_bl_seq" value="<%= intg_bl_seq %>" />
	<input type="hidden" name="rpt_biz_tp" id="rpt_biz_tp" />
	<input type="hidden" name="rpt_biz_sub_tp" id="rpt_biz_sub_tp" />
	<input type="hidden" name="rpt_tp" id="rpt_tp" />
	<input type="hidden" name="rpt_trdp_cd" id="rpt_trdp_cd" />
	<!-- 6301 [JAPT] Mail sending function related request -->
	<input	type="hidden" name="lnr_bkg_no" id="lnr_bkg_no" value="<bean:write name='mapVal' property='lnr_bkg_no'/>"/>
	<input type="hidden" name="trnk_vsl_nm" id="trnk_vsl_nm" value="<bean:write name='mapVal' property='trnk_vsl_nm'/>"/>
	<input type="hidden" name="trnk_voy" id="trnk_voy" value="<bean:write name='mapVal' property='trnk_voy'/>"/>
	<input type="hidden" name="etd_dt_tm" id="etd_dt_tm" value="<bean:write name='mapVal' property='etd_dt_tm'/>"/>
	
	<!--  Report ==> OutLook연동 파라미터 (E) -->

	<!-- page_title_area(S) -->
	<div class="page_title_area clear">
		<!-- page_title(S) -->
		<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
		<!-- page_title(E) -->
		<!-- opus_design_btn(S) -->
		<div class="opus_design_btn TOP">
			<%-- <button type="button" class="btn_accent" onclick="doWork('Print')" id="btnPrint" name="btnPrint"><bean:message key="Print"/></button><!-- --%>
		<!-- opus_design_btn(E) -->
		</div>
		<!-- page_location(S) -->
		<div class="location">
			<span id="navigation">
			<%=LEV1_NM%> > <%=LEV2_NM%> ><span class="navi_b"><%=LEV3_NM%></span>
			</span>
		</div>
		<!-- page_location(E) -->
	</div>
	<!-- page_title_area(E) -->
	<div class= "wrap_search">
		<!-- opus_design_inquiry(S) -->
		<div class="opus_design_inquiry ">
			<table>
					<colgroup>
						<col width="50">
						<col width="150">
						<col width="70">
						<col width="*">
					</colgroup>
					<tbody>
						<tr>
							<th><bean:message key="Ref_No"/></th>
							<td colspan="3">
								<input name="s_ref_no"  id="s_ref_no" maxlength="20" value='<bean:write name="mblVO" property="s_ref_no"/>' type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:130px;text-transform:uppercase;" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){doPop('REF_POPLIST',this);}" onFocus="select();"><!--
								--><button type="button" class="input_seach_btn" tabindex="-1" onClick="doPop('REF_POPLIST',this)"></button>
							</td>
						</tr>
					</tbody>
			</table>
		</div>
	</div>
		<!-- opus_design_inquiry(E) -->
		<!-- opus_design_inquiry(S) -->
	<div class= "wrap_result">
		<div class="opus_design_inquiry">
			<div>
				<table>
					<tbody>
						<tr>
							<td>
								<input type="radio" name="s_ship_to" id="s_ship_to1" value="B" onClick="fRadio(this.value);"><label for="s_ship_to1"><bean:message key="Broker"/></label> <!--
								 --><!-- #3355 [JTC]Dock Receipt 수정 --><!-- 
								 --><!-- OFVFOUR-7100: [JAPT]  OEM S/I print - change the default option to Customer --><!--
								 --><input type="radio" name="s_ship_to" id="s_ship_to6" value="T" onClick="fRadio(this.value);" checked><label for="s_ship_to6"><bean:message key="Customer"/></label> <!--
								 --><input type="radio" name="s_ship_to" id="s_ship_to2" value="S" onClick="fRadio(this.value);"><label for="s_ship_to2"><bean:message key="Shipper"/></label> <!--
								 --><input type="radio" name="s_ship_to" id="s_ship_to3" value="C" onClick="fRadio(this.value);"><label for="s_ship_to3"><bean:message key="Consignee"/></label> <!--
								 --><input type="radio" name="s_ship_to" id="s_ship_to4" value="N" onClick="fRadio(this.value);"><label for="s_ship_to4"><bean:message key="Notify"/></label>
							</td>
						</tr>
						<tr>
							<td>
								<input type="radio" name="s_ship_to" id="s_ship_to5" value="O" onClick="fRadio(this.value);"><label for="s_ship_to5"><bean:message key="Other_Company"/></label> <!--
								--><input name="ntc_trdp_cd" id="ntc_trdp_cd" readonly type="text" maxlength="20" value='' class="search_form-disable" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:48px;" onKeyPress="if(event.keyCode==13){doPop('PARTNER_POPLIST');}"><!--
								--><button type="button" class="input_seach_btn" tabindex="-1" onClick="doPop('PARTNER_POPLIST')"></button><!--
								--><input name="ntc_trdp_full_nm" id="ntc_trdp_full_nm" readonly type="text" maxlength="50" value='' class="search_form-disable" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:237px;" onKeyPress="if(event.keyCode==13){doPop('PARTNER_POPLIST');}">
							</td>
						</tr>
						<tr>
							<td>
								<textarea name="s_rmk" id="s_rmk" maxlength="218" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" onblur="strToUpper(this);keyUp_maxLength(this);if(!checkTxtAreaLn(this, 53, 5, 'Remark'))this.focus();" class="search_form" style="width:434px;height:80px;"></textarea>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div style="margin-top: 8px;">
				<table>
					<tbody>
						<tr>
							<th style="text-align: left;"><bean:message key="PLACE_OF_BL_ISSUE"/></th>
						</tr>
						<tr>
							<td>
								<input type="text" name="bl_issue_place" id="place_of_bl_issue" onblur="strToUpper(this);" class="search_form" style="width:200px;" />
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div style="margin-top: 8px;">
				<table>
					<tbody>
						<tr>
							<th style="text-align: left;"><bean:message key="Freight_Arrange"/></th>
						</tr>
						<tr>
							<td>
								<input type="radio" name="s_frt_arrng" id="s_frt_arrng_y" value="Y"><label for="s_frt_arrng_y">YES</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<!-- 
								--><input type="radio" name="s_frt_arrng" id="s_frt_arrng_n" value="N" checked><label for="s_frt_arrng_n">NO</label>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div id="div_show_mother_vsl" style="margin-top: 8px; display: none;">
				<table>
					<tbody>
						<tr>
							<th style="text-align: left;"><bean:message key="Show_Mother_VSL_Info"/></th>
						</tr>
						<tr>
							<td><!--
								--><input type="checkbox" name="s_mother_vsl_voy" id="s_mother_vsl_voy"><label for="s_mother_vsl_voy"><bean:message key="Mother_VSL_VOY_No"/></label>&nbsp;&nbsp;&nbsp;<!-- 
								--><input type="checkbox" name="s_ts_port_etd" id="s_ts_port_etd"><label for="s_ts_port_etd"><bean:message key="T/S_Port/ETD"/></label><!-- 
							 --></td>
						</tr>
					</tbody>
				</table>
			</div>
			<div style="margin-top: 8px;">
				<table>
					<tbody>
						<tr>
							<th style="text-align: left;"><bean:message key="Remark_for_Document"/></th>
						</tr>
						<tr>
							<td>
								<textarea name="dock_rcpt_rmk" id="dock_rcpt_rmk" maxlength="8000" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" onblur="keyUp_maxLength(this);urlRemark(this);" class="search_form" style="width:800px;height:300px;text-transform:none;"></textarea>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
		<!-- opus_design_inquiry(E) -->
	</div>
</form>