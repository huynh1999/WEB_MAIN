
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
	src="<%=CLT_PATH%>/apps/fis/cmm/pop/housebl/script/CMM_POP_0452.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript">
    <bean:define id="officeInfo" name="valMap" property="officeInfo"/>
    <bean:define id="ofcVO" name="officeInfo"/>
    var v_ofc_cd = "<bean:write name="ofcVO" property="ofc_cd"/>";
    var user_ofc_cnt_cd = "<%=userInfo.getOfc_cnt_cd()%>";
    function setupPage() {
		setOfficeData();
		loadPage();
	}
</script>
<form name="frm1" method="POST" action="./">
	<input type="hidden" name="f_cmd" id="f_cmd" />
	<input type="hidden" name="org_lnr_bkg_no"  value='<bean:write name="hblVO" property="lnr_bkg_no"/>'>
	<input type="hidden" name="hbl_tp_cd" id="hbl_tp_cd" />
	<input type="hidden" name="cnee_trdp_nm" id="cnee_trdp_nm" />
	<input type="hidden" name="cnee_trdp_addr" id="cnee_trdp_addr" />
	<input type="hidden" name="ntfy_trdp_nm" id="ntfy_trdp_nm" />
	<input type="hidden" name="ntfy_trdp_addr" id="ntfy_trdp_addr" />
	<input type="hidden" name="prnr_trdp_cd2" id="prnr_trdp_cd2" />
	<input type="hidden" name="prnr_trdp_nm2" id="prnr_trdp_nm2" />
	<input type="hidden" name="lnr_trdp_cd" id="lnr_trdp_cd" />
	<input type="hidden" name="lnr_trdp_nm" id="lnr_trdp_nm" />
	<input type="hidden" name="flt_no" id="flt_no" />
	<input type="hidden" name="eta_dt_tm" id="eta_dt_tm" />
	<input type="hidden" name="eta_tm" id="eta_tm" />
	<input type="hidden" name="fst_to_cd" id="fst_to_cd" />
	<input type="hidden" name="fst_to_nm" id="fst_to_nm" />
	<input type="hidden" name="ts1_port_cd" id="ts1_port_cd" />
	<input type="hidden" name="ts1_flt_no" id="ts1_flt_no" />
	<input type="hidden" name="ts2_port_cd" id="ts2_port_cd" />
	<input type="hidden" name="ts2_flt_no" id="ts2_flt_no" />
	<input type="hidden" name="ts3_port_cd" id="ts3_port_cd" />
	<input type="hidden" name="ts3_flt_no" id="ts3_flt_no" />
	<input type="hidden" name="rt_clss_cd" id="rt_clss_cd" />
	<input type="hidden" name="post_dt" id="post_dt" />	
	
	
	<!-- Default Value -->
	<input type="hidden" name="bl_sts_cd"			id="bl_sts_cd"			value="MC" />
	<input type="hidden" name="pck_ut_cd"			id="pck_ut_cd"			value="<bean:write name="hblVO" property="pck_ut_cd"/>"/>
	<input type="hidden" name="pck_qty"				id="pck_qty"			value="<bean:write name="hblVO" property="pck_qty"/>"/>
	<input type="hidden" name="grs_wgt" 			id="grs_wgt"			value="<bean:write name="hblVO" property="grs_wgt"/>"/>
	<input type="hidden" name="grs_wgt1" 			id="grs_wgt1"			value="<bean:write name="hblVO" property="grs_wgt1"/>"/>
	<input type="hidden" name="chg_wgt" 			id="chg_wgt"			value="<bean:write name="hblVO" property="chg_wgt"/>"/>
	<input type="hidden" name="chg_wgt1" 			id="chg_wgt1"			value="<bean:write name="hblVO" property="chg_wgt1"/>"/>
	<input type="hidden" name="bl_grs_wgt" 			id="bl_grs_wgt"			value="<bean:write name="hblVO" property="bl_grs_wgt"/>"/>
	<input type="hidden" name="bl_grs_wgt1" 		id="bl_grs_wgt1"		value="<bean:write name="hblVO" property="bl_grs_wgt1"/>"/>
	<input type="hidden" name="bl_chg_wgt" 			id="bl_chg_wgt"			value="<bean:write name="hblVO" property="bl_chg_wgt"/>"/>
	<input type="hidden" name="bl_chg_wgt1" 		id="bl_chg_wgt1"		value="<bean:write name="hblVO" property="bl_chg_wgt1"/>"/>
	<input type="hidden" name="grs_wgt_ut_cd" 		id="grs_wgt_ut_cd"		value="K"/>
	<input type="hidden" name="chg_wgt_ut_cd" 		id="chg_wgt_ut_cd"		value="K"/>
	<input type="hidden" name="size_ut_cd"	 		id="size_ut_cd"			value="INCH"/>
	<input type="hidden" name="wgt_disp_cd"	 		id="wgt_disp_cd"		value="KL"/>
	<input type="hidden" name="vol_wgt"	 			id="vol_wgt"			value="<bean:write name="hblVO" property="vol_wgt"/>"/>
	<input type="hidden" name="vol_meas"	 		id="vol_meas"			value="<bean:write name="hblVO" property="vol_meas"/>"/>

	<input type="hidden" name="decl_crr_val"		id="decl_crr_val"		value="<bean:write name="hblVO" property="decl_crr_val"/>"/>
	<input type="hidden" name="decl_cstms_val"		id="decl_cstms_val"		value="<bean:write name="hblVO" property="decl_cstms_val"/>"/>
	<input type="hidden" name="amt_insur_val"		id="amt_insur_val"		value="<bean:write name="hblVO" property="amt_insur_val"/>"/>
	
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
	<input type="hidden" name="shpr_trdp_cd" 		id="shpr_trdp_cd"		value="<bean:write name="hblVO" property="shpr_trdp_cd"/>"/>
	<input type="hidden" name="shpr_trdp_addr" 		id="shpr_trdp_addr"		value="<bean:write name="hblVO" property="shpr_trdp_addr"/>"/>
	<input type="hidden" name="shpr_trdp_nm" 		id="shpr_trdp_nm"		value="<bean:write name="hblVO" property="shpr_trdp_nm"/>"/>
	<input type="hidden" name="iss_trdp_cd" 		id="iss_trdp_cd"		value="<bean:write name="hblVO" property="iss_trdp_cd"/>"/>
	<input type="hidden" name="iss_trdp_addr" 		id="iss_trdp_addr"		value="<bean:write name="hblVO" property="iss_trdp_addr"/>"/>
	<input type="hidden" name="iss_trdp_nm" 		id="iss_trdp_nm"		value="<bean:write name="hblVO" property="iss_trdp_nm"/>"/>
	<input type="hidden" name="ctrb_ratio_yn" 		id="ctrb_ratio_yn"		value="<bean:write name="hblVO" property="ctrb_ratio_yn"/>"/>
	<input type="hidden" name="ctrb_ofc_cd" 		id="ctrb_ofc_cd"		value="<bean:write name="hblVO" property="ctrb_ofc_cd"/>"/>
	<input type="hidden" name="ctrb_dept_cd" 		id="ctrb_dept_cd"		value="<bean:write name="hblVO" property="ctrb_dept_cd"/>"/>
	<input type="hidden" name="ctrb_mgn" 			id="ctrb_mgn"			value="<bean:write name="hblVO" property="ctrb_mgn"/>"/>
	<input type="hidden" name="profit_share" 		id="profit_share"		value="<bean:write name="hblVO" property="profit_share"/>"/>
	<input type="hidden" name="iata_cd"				id="iata_cd"			value="<bean:write name="hblVO" property="iata_cd"/>"/>
	<input type="hidden" name="cargo_tp_cd"			id="cargo_tp_cd"		value="<bean:write name="hblVO" property="cargo_tp_cd"/>"/>
	<input type="hidden" name="desc_txt"			id="desc_txt"			value=""/>



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
						<col width="100">
						<col width="50">
						<col width="120">
						<col width="*">
					</colgroup>
					<tbody>
						<tr>
						    <th><bean:message key="Flight_Date"/></th>
							<td><!-- 
							 --><input required type="text" name="etd_dt_tm" id="etd_dt_tm" maxlength="10" value='<wrt:write name="hblVO" property="etd_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' class="search_form"  dataformat="excepthan" style="ime-mode:disabled;width:126px;" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1);dateRangeValid(this, 'Flight Date');"><!-- 
							 --><button type="button" class="calendar" tabindex="-1" id="etd_dt_tm_cal" onclick="doDisplay('DATE1' ,frm1.etd_dt_tm);"></button><!-- 
							 --><strong><bean:message key="Time"/></strong>  <input type="text" name="etd_tm" value='<wrt:write name="hblVO" property="etd_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm"/>' maxlength="4" class="search_form" dataformat="num" style="ime-mode:disabled;width:42px;" onchange="timeCheck(this);" onkeypress="onlyNumberCheck();"></td>
							<th><bean:message key="Destination"/></th>
							<td>
								<input required type="text"   name="pod_cd" maxlength="5" value='<bean:write name="hblVO" property="pod_cd"/>' onKeyDown="codeNameAction('Location_air_des',this, 'onKeyDown','A')" onBlur="strToUpper(this);codeNameAction('Location_air_des',this, 'onBlur','A')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:90px;" class="search_form" ><!-- 
							 --><button type="button" class="input_seach_btn" tabindex="-1" id="air_des" onClick="openAieMasterPopUp('LOCATION_POPLIST',this)"></button><!-- 
							 --><input type="hidden" name="pod_nod_cd"     value='<bean:write name="hblVO" property="pod_nod_cd"/>'><!-- 
							 --><input required type="text"   name="pod_nm"   maxlength="50"   value='<bean:write name="hblVO" property="pod_nm"/>'     class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:210px;text-transform:uppercase;" onblur="strToUpper(this);" onKeyPress="if(event.keyCode==13){openAieMasterPopUp('LOCATION_POPLIST', document.getElementById('air_des'), frm1.pod_nm.value);}">
							 </td>														
						</tr>
						<tr>
							<th><bean:message key="Liner_Bkg_No"/></th>
							<td><input type="text" name="lnr_bkg_no" maxlength="20"  value="<bean:write name="hblVO" property="lnr_bkg_no"/>" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:233px;text-transform:uppercase;" onblur="strToUpper(this);checkDuplicateLinerBkgNo()"></td>
							<th nowrap class="table_search_head_r"><bean:message key="Departure"/></th>
							<td>
								<input required type="text"   name="pol_cd" maxlength="5" value='<bean:write name="hblVO" property="pol_cd"/>' onKeyDown="codeNameAction('Location_pol',this, 'onKeyDown','A')" onBlur="strToUpper(this);codeNameAction('Location_pol',this, 'onBlur','A')" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:90px;" class="search_form"><!-- 
							 --><button type="button" class="input_seach_btn" tabindex="-1" id="pol" onClick="openAieMasterPopUp('LOCATION_POPLIST',this)"></button><!-- 
							 --><input type="hidden" name="pol_nod_cd" value='<bean:write name="hblVO" property="pol_nod_cd"/>' ><!-- 
							 --><input required type="text" name="pol_nm" maxlength="50" value='<bean:write name="hblVO" property="pol_nm"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:210px;text-transform:uppercase;" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){openAieMasterPopUp('LOCATION_POPLIST', document.getElementById('pol'), frm1.pol_nm.value);}">
							 </td>
						</tr>
						<tr>
							<th><bean:message key="Billing_Carrier"/></th>
							<td>
								<input type="text"   name="carr_trdp_cd" value='<bean:write name="hblVO" property="carr_trdp_cd"/>' onKeyDown="codeNameAction('trdpCode_carr',this, 'onKeyDown');"  onblur="strToUpper(this); codeNameAction('trdpCode_carr',this, 'onKeyDown');" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:70px;" maxlength="20;" onKeyPress="ComKeyOnlyAlphabet('uppernum');"><!-- 
							 --><button type="button" class="input_seach_btn" tabindex="-1" id="carr"  onClick="openAieMasterPopUp('LINER_POPLIST',this)"></button><!-- 
							 --><input type="text"   name="carr_trdp_nm" value='<bean:write name="hblVO" property="carr_trdp_nm"/>' onblur="strToUpper(this)" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:130px;" onKeyPress="if(event.keyCode==13){openAieMasterPopUp('LINER_POPLIST', document.getElementById('carr'), frm1.carr_trdp_nm.value);}" maxlength="50">
							 	<input type="hidden" name="carr_trdp_addr" value='<bean:write name="hblVO" property="carr_trdp_addr"/>'>
							 </td>
							<th><bean:message key="ITN_No"/></th>
		                    <td><input type="text" name="itn_no" value="<bean:write name="hblVO" property="itn_no"/>" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:333px;" onblur="strToUpper(this)" maxlength="20" ></td>
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
						<col width="100">
						<col width="200">
						<col width="121">
						<col width="*">
					</colgroup>
					<tbody>
						<tr>
						 	<th><bean:message key="IATA_Code"/></th>
                            <td><input type="text" name="iata_cd" maxlength="20" value='<bean:write name="hblVO" property="iata_cd"/>' class="search_form" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:233px;"></td>						
							<th nowrap class="table_search_head"><bean:message key="Acct_No"/></th>
                            <td><input type="text" name="mm_txt" maxlength="50" value='<bean:write name="hblVO" property="mm_txt"/>' class="search_form" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:333px;"></td>
						</tr>
						<tr>
							<th><bean:message key="Tariff_Currency_Code"/></th>
                            <td> 
                            <bean:define id="currCdList" name="valMap" property="currCdList"/> 
                            <html:select name="hblVO" property="curr_cd" styleClass="search_form" style="width:65px;"> 
                            		<html:options collection="currCdList" property="cd_val" labelProperty="cd_nm"/> 
                            </html:select> 
                            <input type="hidden" name="h_curr_cd" value="<bean:write name="hblVO" property="curr_cd"/>"><!--  
                            --><strong><bean:message key="BL_Ref_Office" /></strong>
                            <bean:define id="ofcList" name="valMap"
									property="ofcList" /> <html:select name="hblVO"
									property="ref_ofc_cd" styleClass="search_form"
									style="width:72px;" onchange="ofcChDEta();">
									<html:options collection="ofcList" property="ofc_cd"
										labelProperty="ofc_cd" />
								</html:select>
								<input type="hidden" name="h_ref_ofc_cd" value="<bean:write name="hblVO" property="ref_ofc_cd"/>">
                            </td>
							<th><bean:message key="Carriers_Spot_No"/></th>
					      <td><input type="text" name="spot_no" maxlength="40" value='<bean:write name="hblVO" property="spot_no"/>' class="search_form" onBlur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:333px;"></td>
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


