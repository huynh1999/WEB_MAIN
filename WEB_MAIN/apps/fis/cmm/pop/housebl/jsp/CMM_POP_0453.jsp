
<%
	/*=========================================================
	*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
	*@FileName   : CMM_POP_0322.jsp
	*@FileTitle  : 
	*@author     : CLT
	*@version    : 1.0
	*@since      : 2014/07/28
	=========================================================*/
%>

<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging" prefix="paging"%>
<!-- 공통 Header -->
<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet"
	type="text/css" />

<bean:define id="hblVO" name="EventResponse" property="objVal" />
<bean:define id="valMap" name="EventResponse" property="mapVal" />

<title><bean:message key="system.title" /></title>

<!-- 일자 및 달력팝업 호출 -->
<script type="text/javascript"
	src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript"
	src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript"
	src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript"
	src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/PUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript"
	src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/COM_FRT_MSG.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript"
	src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_CODE_UTIL.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript"
	src="<%=CLT_PATH%>/apps/fis/cmm/pop/housebl/script/CMM_POP_0453.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript">
	<bean:define id="officeInfo" name="valMap" property="officeInfo"/>
    <bean:define id="ofcVO" name="officeInfo"/>
    var v_ofc_cd = "<bean:write name="ofcVO" property="ofc_cd"/>";
	function setupPage() {
		setOfficeData();
		loadPage();
	}
	var user_ofc_cnt_cd = "<%=userInfo.getOfc_cnt_cd()%>";
</script>
<form name="frm1" method="POST" action="./">
	<input type="hidden" name="f_cmd" id="f_cmd" />
	<input type="hidden" name="flt_no"  value='<bean:write name="hblVO" property="flt_no"/>'>
	<input type="hidden" name="bl_no" value='<bean:write name="hblVO" property="bl_no"/>'>
	<input type="hidden" name="hbl_tp_cd" id="hbl_tp_cd" />
	<input type="hidden" name="shpr_trdp_nm" id="shpr_trdp_nm" />
	<input type="hidden" name="shpr_trdp_addr" id="shpr_trdp_addr" />
	<input type="hidden" name="ntfy_trdp_nm" id="ntfy_trdp_nm" />
	<input type="hidden" name="ntfy_trdp_addr" id="ntfy_trdp_addr" />
	<input type="hidden" name="prnr_trdp_cd2" id="prnr_trdp_cd2" />
	<input type="hidden" name="prnr_trdp_nm2" id="prnr_trdp_nm2" />
	<input type="hidden" name="ts1_port_cd" id="ts1_port_cd" />
	<input type="hidden" name="ts1_flt_no" id="ts1_flt_no" />
	<input type="hidden" name="ts2_port_cd" id="ts2_port_cd" />
	<input type="hidden" name="ts2_flt_no" id="ts2_flt_no" />
	<input type="hidden" name="ts3_port_cd" id="ts3_port_cd" />
	<input type="hidden" name="ts3_flt_no" id="ts3_flt_no" />
	<input type="hidden" name="frt_loc_cd" id="frt_loc_cd" />
	<input type="hidden" name="frt_loc_nm" id="frt_loc_nm" />
	<input type="hidden" name="sto_start_dt" id="sto_start_dt" />
	<input type="hidden" name="post_dt" id="post_dt" />	
	
	
		
	<!-- Default Value -->
 	<input type="hidden" name="bl_sts_cd"			id="bl_sts_cd"			value="MC" />
	<input type="hidden" name="express_tp_cd"		id="express_tp_cd"		value="<bean:write name="hblVO" property="express_tp_cd"/>"/>
	<input type="hidden" name="pck_ut_cd"			id="pck_ut_cd"			value="<bean:write name="hblVO" property="pck_ut_cd"/>"/>
	<input type="hidden" name="pck_qty"				id="pck_qty"			value="<bean:write name="hblVO" property="pck_qty"/>"/>
	<input type="hidden" name="grs_wgt" 			id="grs_wgt"			value="<bean:write name="hblVO" property="grs_wgt"/>"/>
	<input type="hidden" name="grs_wgt1" 			id="grs_wgt1"			value="<bean:write name="hblVO" property="grs_wgt1"/>"/>
	<input type="hidden" name="chg_wgt" 			id="chg_wgt"			value="0"/>
	<input type="hidden" name="chg_wgt1" 			id="chg_wgt1"			value="0"/>
	<input type="hidden" name="grs_wgt_ut_cd" 		id="grs_wgt_ut_cd"		value="K"/>
	<input type="hidden" name="chg_wgt_ut_cd" 		id="chg_wgt_ut_cd"		value="K"/>	
	<input type="hidden" name="meas" 				id="meas"				value="0"/>
 	<input type="hidden" name="vol_wgt" 			id="vol_wgt"			value="<bean:write name="hblVO" property="vol_wgt"/>"/>
	<input type="hidden" name="vol_meas" 			id="vol_meas"			value="<bean:write name="hblVO" property="vol_meas"/>"/>		
	<input type="hidden" name="curr_cd" 			id="curr_cd"			value="<bean:write name="hblVO" property="curr_cd"/>"/>
	
	<input type="hidden" name="cnee_trdp_cd" 		id="cnee_trdp_cd"		value="<bean:write name="hblVO" property="cnee_trdp_cd"/>"/>
	<input type="hidden" name="cnee_trdp_nm" 		id="cnee_trdp_nm"		value="<bean:write name="hblVO" property="cnee_trdp_nm"/>"/>
	<input type="hidden" name="cnee_trdp_addr" 		id="cnee_trdp_addr"		value="<bean:write name="hblVO" property="cnee_trdp_addr"/>"/>
	<input type="hidden" name="ctrb_ratio_yn" 		id="ctrb_ratio_yn"		value="<bean:write name="hblVO" property="ctrb_ratio_yn"/>"/>
	<input type="hidden" name="ctrb_ofc_cd" 		id="ctrb_ofc_cd"		value="<bean:write name="hblVO" property="ctrb_ofc_cd"/>"/>
	<input type="hidden" name="ctrb_dept_cd" 		id="ctrb_dept_cd"		value="<bean:write name="hblVO" property="ctrb_dept_cd"/>"/>
	<input type="hidden" name="ctrb_mgn" 			id="ctrb_mgn"			value="<bean:write name="hblVO" property="ctrb_mgn"/>"/>

 	<input type="hidden" name="bl_iss_dt" 			id="bl_iss_dt"			value="<bean:write name="hblVO" property="bl_iss_dt"/>"/>
	<input type="hidden" name="bl_dt_tm"			id="bl_dt_tm"			value="<bean:write name="hblVO" property="bl_dt_tm"/>"/>
	<input type="hidden" name="sls_ofc_cd" 			id="sls_ofc_cd"			value="<bean:write name="hblVO" property="sls_ofc_cd"/>"/>
	<input type="hidden" name="sls_usrid" 			id="sls_usrid"			value="<bean:write name="hblVO" property="sls_usrid"/>"/>
	<input type="hidden" name="sls_usr_nm" 			id="sls_usr_nm"			value="<bean:write name="hblVO" property="sls_usr_nm"/>"/>
	<input type="hidden" name="sls_dept_cd" 		id="sls_dept_cd"		value="<bean:write name="hblVO" property="sls_dept_cd"/>"/>
	<input type="hidden" name="proc_ofccd" 			id="proc_ofccd"			value="<bean:write name="hblVO" property="proc_ofccd"/>"/>
	<input type="hidden" name="proc_dept_cd" 		id="proc_dept_cd"		value="<bean:write name="hblVO" property="proc_dept_cd"/>"/>
	<input type="hidden" name="proc_usrid" 			id="proc_usrid"			value="<bean:write name="hblVO" property="proc_usrid"/>"/>
	<input type="hidden" name="proc_usrnm" 			id="proc_usrnm"			value="<bean:write name="hblVO" property="proc_usrnm"/>"/>
	<input type="hidden" name="issued_by" 			id="issued_by"			value="<bean:write name="hblVO" property="issued_by"/>"/>
	<input type="hidden" name="frt_term_cd" 		id="frt_term_cd"		value="<bean:write name="hblVO" property="frt_term_cd"/>"/>
	<input type="hidden" name="otr_chg_term_cd" 	id="otr_chg_term_cd"	value="<bean:write name="hblVO" property="otr_chg_term_cd"/>"/>
	<input type="hidden" name="iss_trdp_cd" 		id="iss_trdp_cd"		value="<bean:write name="hblVO" property="iss_trdp_cd"/>"/>
	<input type="hidden" name="iss_trdp_addr" 		id="iss_trdp_addr"		value="<bean:write name="hblVO" property="iss_trdp_addr"/>"/>
	<input type="hidden" name="iss_trdp_nm" 		id="iss_trdp_nm"		value="<bean:write name="hblVO" property="iss_trdp_nm"/>"/>
	<input type="hidden" name="profit_share" 		id="profit_share"		value="<bean:write name="hblVO" property="profit_share"/>"/>
	<input type="hidden" name="iata_cd"				id="iata_cd"			value="<bean:write name="hblVO" property="iata_cd"/>"/>
	<input type="hidden" name="cargo_tp_cd"			id="cargo_tp_cd"		value="<bean:write name="hblVO" property="cargo_tp_cd"/>"/>


	<div class="layer_popup_title">
		<div class="page_title_area clear">
			<!-- page_title(S) -->
			<h2 class="page_title">
				<bean:message key="MBL_Creation" />
			</h2>
			<!-- page_title(E) -->

			<!-- opus_design_btn(S) -->
			<div class="opus_design_btn">
				<button type="button" class="btn_accent" name="btnSearch"
					id="btnSearch" onclick="doWork('SAVE')">
					<bean:message key="Create" />
				</button>
				<!--<!-- 
				    -->
				<button type="button" class="btn_normal" id="btnCancel"
					onclick="doWork('CLOSE')">
					<bean:message key="Cancel" />
				</button>
			</div>
			<!-- opus_design_btn(E) -->
		</div>
		<!-- page_title_area(E) -->
	</div>
	<div class="layer_popup_contents">
		<!-- wrap search (S) -->
		<div class="wrap_search">
			<!-- inquiry_area(S) -->
			<div class="opus_design_inquiry entry_pannel ">
				<table>
					<colgroup>
						<col width="120">
						<col width="50">
						<col width="120">
						<col width="*">
					</colgroup>
					<tbody>
						<tr>
		                    <th><bean:message key="Departure"/></th>
									<td><!--
		                            --><input type="text" required  name="pol_cd" maxlength="5" value='<bean:write name="hblVO" property="pol_cd"/>' onKeyDown="codeNameAction('Location_pol',this, 'onKeyDown','A')" onBlur="strToUpper(this);codeNameAction('Location_pol',this, 'onBlur','A')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:90px;" ><!--
		                            --><button type="button" class="input_seach_btn" tabindex="-1" id=pol  onClick="openAiiMasterPopUp('LOCATION_POPLIST',this)"></button><!--
		                            --><input type="text" required  name="pol_nm"  maxlength="50"   value='<bean:write name="hblVO" property="pol_nm"/>'  dataformat="excepthan" style="ime-mode:disabled;width:140px;text-transform:uppercase;" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){openAiiMasterPopUp('LOCATION_POPLIST', document.getElementById('pol'), frm1.pol_nm.value);}"><!--
		                            --><input type="hidden" name="pol_nod_cd"     value='<bean:write name="hblVO" property="pol_nod_cd"/>' ></td>        
							<th><bean:message key="ETA_of_FPOE"/></th>
									<td><!--
		                            --><input type="text" name="eta_fpoe_tm" value='<wrt:write name="hblVO" property="eta_fpoe_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1);dateRangeValid(this, 'ETA of FPOE');"  dataformat="excepthan" style="ime-mode:disabled;width:126px;" size='11' maxlength="10"><!--
		                            --><button type="button" id="eta_fpoe_tm_cal" onclick="doDisplay('DATE1', frm1.eta_fpoe_tm);" class="calendar" tabindex="-1"></button>
		                            <strong><bean:message key="Time"/></strong>
									<input type="text" name="fpoe_tm"    value='<wrt:write name="hblVO" property="fpoe_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm"/>' maxlength="4"  dataformat="num" style="ime-mode:disabled;width:44px;" onchange="timeCheck(this);" onkeypress="onlyNumberCheck();"></td>														
						</tr>
						<tr>									
							<th><bean:message key="Airline"/></th>
		                            <td><!--
		                            --><input type="text" required  name="lnr_trdp_cd" maxlength="20" value='<bean:write name="hblVO" property="lnr_trdp_cd"/>' onKeyDown="codeNameAction('trdpCode_imp_air_carr',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('trdpCode_imp_air_carr',this, 'onBlur')"  dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:90px;"><!--
		                            --><button type="button" class="input_seach_btn" tabindex="-1" id="liner" onClick="openAiiMasterPopUp('LINER_POPLIST_M',this)"></button><!--
		                            --><input type="text" required  name="lnr_trdp_nm" maxlength="50" value='<bean:write name="hblVO" property="lnr_trdp_nm"/>' onblur="strToUpper(this)"  dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:140px;" onKeyPress="if(event.keyCode==13){openAiiMasterPopUp('LINER_POPLIST_M', document.getElementById('liner'), frm1.lnr_trdp_nm.value);}"><!--
		                            --><input type="hidden" name="obrd_dt_tm"  value='<wrt:write name="hblVO" property="obrd_dt_tm" formatType="DATE" fromFormat="yyyyMMdd" format="yyyy-MM-dd"/>'  onKeyUp="mkDateFormat(this,event,false)" onBlur="mkDateFormat(this, event, true)" dataformat="excepthan" style="ime-mode:disabled;width:70px;"></td>
							<th><span id="flight_dt_word"><bean:message key="Flight_Date"/></span></th>
		                            <td style="text-align: left"><!--
		                            --><input type="text" name="etd_dt_tm" value='<wrt:write name="hblVO" property="etd_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1);dateRangeValid(this, 'Departure Date');" style="width:126px" maxlength="10" ><!--
		                            --><button type="button" id="etd_dt_tm_cal" onclick="doDisplay('DATE1' ,frm1.etd_dt_tm);" class="calendar" tabindex="-1"></button>
		                            <strong><bean:message key="Time"/></strong>
		                            <input type="text" name="etd_tm"    value='<wrt:write name="hblVO" property="etd_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm"/>' maxlength="4"  dataformat="num" style="ime-mode:disabled;width:44px;" onchange="timeCheck(this);" onkeypress="onlyNumberCheck();"></td>
						</tr>
						<tr>
							<th><bean:message key="Destination"/></th>
										<td><!--
			                            --><input type="text" required  name="pod_cd" maxlength="5" value='<bean:write name="hblVO" property="pod_cd"/>' onKeyDown="codeNameAction('Location_air_des',this, 'onKeyDown','A')" onBlur="strToUpper(this);codeNameAction('Location_air_des',this, 'onBlur','A');if(frm1.first_port_cd.value == ''){codeNameAction('Location_first',this, 'onBlur');}" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:90px;"  ><!--
			                            --><button type="button" class="input_seach_btn" tabindex="-1" id="air_des" onClick="openAiiMasterPopUp('LOCATION_POPLIST',this)" ></button><!--
			                            --><input type="text" required  name="pod_nm"  maxlength="50"   value='<bean:write name="hblVO" property="pod_nm"/>'      dataformat="excepthan" style="ime-mode:disabled;width:140px;text-transform:uppercase;" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){openAiiMasterPopUp('LOCATION_POPLIST', document.getElementById('air_des'), frm1.pod_nm.value);}"><!--
			                            --><input type="hidden" name="pod_nod_cd"     value='<bean:write name="hblVO" property="pod_nod_cd"/>'>
										</td>							
							<th><bean:message key="Arrival_Date"/></th>
		                            <td><!--
		                            --><input type="text" required name="eta_dt_tm" value='<wrt:write name="hblVO" property="eta_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1);dateRangeValid(this, 'Arrival Date');txtAtChange(this, frm1.f_eta_dt_tm)" style="width:126px" maxlength="10" ><!--
		                            --><button type="button" id="eta_dt_tm_cal" onclick="doDisplay('DATE1' ,frm1.eta_dt_tm);" class="calendar" tabindex="-1"></button>
		                            <strong><bean:message key="Time"/></strong>
		                            <input type="text" name="eta_tm"   value='<wrt:write name="hblVO" property="eta_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm"/>' maxlength="4"   dataformat="num" style="ime-mode:disabled;width:44px;" onchange="timeCheck(this);" onkeypress="onlyNumberCheck();"></td>
						</tr>
						<tr>
							<th><bean:message key="Billing_Carrier"/></th>
									<td><!--
		                            --><input type="text"   name="carr_trdp_cd" value='<bean:write name="hblVO" property="carr_trdp_cd"/>' onKeyDown="codeNameAction('trdpCode_carr',this, 'onKeyDown');"  onblur="strToUpper(this); codeNameAction('trdpCode_carr',this, 'onKeyDown');"  dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:90px;" maxlength="20;" onKeyPress="ComKeyOnlyAlphabet('uppernum');"><!--
		                            --><button type="button" class="input_seach_btn" tabindex="-1" id="carr"  onClick="openAiiMasterPopUp('LINER_POPLIST',this)"></button><!--
		                            --><input type="text"   name="carr_trdp_nm" value='<bean:write name="hblVO" property="carr_trdp_nm"/>' onblur="strToUpper(this)"  dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:140px;" onKeyPress="if(event.keyCode==13){openAiiMasterPopUp('LINER_POPLIST', document.getElementById('carr'), frm1.carr_trdp_nm.value);}" maxlength="50"><!--
		                            --><input type="hidden" name="carr_trdp_addr" value='<bean:write name="hblVO" property="carr_trdp_addr"/>'>
									</td>
							<th><div id="st_hear"><bean:message key="Delivery_ETA"/></div></th>							
										<td><!--
			                            --><input type="text" name="f_eta_dt_tm" value='<wrt:write name="hblVO" property="f_eta_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1);dateRangeValid(this, 'Delivery ETA');"  dataformat="excepthan" style="ime-mode:disabled;width:126px;" size='11' maxlength="10"><!--
			                            --><button type="button" id="f_eta_dt_tm_cal" onclick="doDisplay('DATE1', frm1.f_eta_dt_tm);" class="calendar" tabindex="-1"></button>
			                            <strong><bean:message key="Time"/></strong>
										<input type="text" name="f_eta_tm"    value='<wrt:write name="hblVO" property="f_eta_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm"/>' maxlength="4"  dataformat="num" style="ime-mode:disabled;width:44px;" onchange="timeCheck(this);" onkeypress="onlyNumberCheck();"></td>	
						</tr>
					</tbody>
				</table>
			</div>

			<!-- inquiry_area(S) -->
		</div>
		<div class="wrap_result">
			<div id="hiddenSheet" style="display:none">        
				<div class="opus_design_grid clear">                                                                                                                                                                                                      
					<script type="text/javascript">comSheetObject('sheet1');</script>                 
				</div>                                                                                                                                                               
			</div>
			<div class="opus_design_inquiry">
				<table>
					<colgroup>
						<col width="120">
						<col width="200">
						<col width="121">
						<col width="*">
					</colgroup>
					<tbody>
						<tr>
						 	<th><bean:message key="Last_Foreign_Port"/></th>
		                            <td><input type="text" name="last_port_cd" value='<bean:write name="hblVO" property="last_port_cd"/>'  dataformat="excepthan" style="ime-mode:disabled;width:263px;text-transform:uppercase;" onblur="strToUpper(this)" maxlength="12"></td>						
							<th nowrap class="table_search_head"><bean:message key="Acct_No"/></th>
                            <td><input type="text" name="mm_txt" maxlength="50" value='<bean:write name="hblVO" property="mm_txt"/>' class="search_form" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:238px;"></td>
						</tr>
						<tr>
                           <th><bean:message key="First_Port_of_Entry"/></th>
		                            <td><!--
		                            --><input type="text" name="first_port_cd" maxlength="5" value='<bean:write name="hblVO" property="first_port_cd"/>'  onKeyDown="codeNameAction('Location_first',this, 'onKeyDown','A')" onBlur="codeNameAction('Location_first',this, 'onBlur','A');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:90px;"><!--
		                            --><button type="button" class="input_seach_btn" tabindex="-1" id="first" onClick="openAiiMasterPopUp('LOCATION_POPLIST',this)"></button><!--
		                            --><input type="text" name="first_port_nm" value='<bean:write name="hblVO" property="first_port_nm"/>'  dataformat="excepthan" style="ime-mode:disabled;width:140px;text-transform:uppercase;" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){openAiiMasterPopUp('LOCATION_POPLIST', document.getElementById('first'), frm1.first_port_nm.value);}"  maxlength="50"></td>
                           <th><bean:message key="BL_Ref_Office" /></th>
                            <td><bean:define id="ofcList" name="valMap"
									property="ofcList" /> <html:select name="hblVO"
									property="ref_ofc_cd" styleClass="search_form"
									style="width:72px;" onchange="ofcChDEta();">
									<html:options collection="ofcList" property="ofc_cd"
										labelProperty="ofc_cd" />
								</html:select>
								<input type="hidden" name="h_ref_ofc_cd" value="<bean:write name="hblVO" property="ref_ofc_cd"/>">
                            </td>							
						</tr>
						<%-- <tr>
							<th><bean:message key="MRN"/></th>
							<td><input type="text" name="mrn"  maxlength="20"   value="<bean:write name="hblVO" property="mrn"/>" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;width:263px;text-transform:uppercase;" onblur="strToUpper(this)" readonly></td>							
							<th><bean:message key="MSN"/></th>
							<td><input type="text" name="bl_ser_no" maxlength="20" value="<bean:write name="hblVO" property="bl_ser_no"/>" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;width:238px;text-transform:uppercase;" onblur="strToUpper(this)" readonly></td>
						</tr> --%>
						<tr>						
							<th><bean:message key="Manifest_To"/></th>
		                    <td><input type="text" name="manifest_to" maxlength="50"  value='<bean:write name="hblVO" property="manifest_to"/>'  dataformat="excepthan" style="ime-mode:disabled;width:263px;text-transform:uppercase;" onblur="strToUpper(this)"></td>
		                </tr>            
					</tbody>
				</table>
			</div>
		</div>
	</div>
</form>
<script>
	var pDoc = parent.parent.parent.document;
	hideProcess('WORKING', pDoc);
</script>


