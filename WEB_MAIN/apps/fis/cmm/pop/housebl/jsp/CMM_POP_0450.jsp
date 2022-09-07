
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
<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/PUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/COM_FRT_MSG.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_CODE_UTIL.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/cmm/pop/housebl/script/CMM_POP_0450.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript">
	<bean:define id="officeInfo" name="valMap" property="officeInfo"/>
    <bean:define id="ofcVO" name="officeInfo"/>
    var v_ofc_cd = "<bean:write name="ofcVO" property="ofc_cd"/>";
    var sea_cob = "<bean:write name="ofcVO" property="sea_cob"/>";
    var vsl_show_flg = "<bean:write name="ofcVO" property="vsl_show_flg"/>";
    var load_port_show_flg = "<bean:write name="ofcVO" property="load_port_show_flg"/>";
    
	function setupPage() {
		setOfficeData();
		loadPage();
	}
</script>
<form name="frm1" method="POST" action="./">
	<input type="hidden" name="f_cmd" id="f_cmd" />
	<input type="hidden" name="lnr_trdp_cd" id="lnr_trdp_cd" />
	<input type="hidden" name="lnr_trdp_nm" id="lnr_trdp_nm" />
	<input type="hidden" name="eta_dt_tm" id="eta_dt_tm" />
	<input type="hidden" name="por_cd" id="por_cd" />
	<input type="hidden" name="etd_por_tm" id="etd_por_tm" />
	<input type="hidden" name="trnk_vsl_nm" id="trnk_vsl_nm" />
	<input type="hidden" name="trnk_voy" id="trnk_voy" />
	<input type="hidden" name="cnee_trdp_nm" id="cnee_trdp_nm" />
	<input type="hidden" name="ntfy_trdp_nm" id="ntfy_trdp_nm" />
	<input type="hidden" name="del_cd" id="del_cd" />
	<input type="hidden" name="del_nm" id="del_nm" />
	<input type="hidden" name="fnl_dest_loc_cd" id="fnl_dest_loc_cd" />
	<input type="hidden" name="lnr_bkg_no" id="lnr_bkg_no" />
	<input type="hidden" name="cntr_info" id="cntr_info" />
	<input type="hidden" name="trnk_vsl_cd" id="trnk_vsl_cd" />
	<input type="hidden" name="mrn_no" id="mrn_no" />
	<input type="hidden" name="cnee_trdp_addr" id="cnee_trdp_addr" />
	<input type="hidden" name="ntfy_trdp_addr" id="ntfy_trdp_addr" />
	<input type="hidden" name="fnl_dest_loc_nm" id="fnl_dest_loc_nm" />		
	<input type="hidden" name="por_nm" id="por_nm" />	
	<input type="hidden" name="post_dt" id="post_dt" />
	<input type="hidden" name="rep_cmdt_cd" id="rep_cmdt_cd" />	
	<input type="hidden" name="rep_cmdt_nm" id="rep_cmdt_nm" />		
	<input type="hidden" name="desc_txt" id="desc_txt" />
	<input type="hidden" name="sad_txt" id="sad_txt" />
	<input type="hidden" name="mk_txt" id="mk_txt" />
	<input type="hidden" name="mk_grs_wgt" id="mk_grs_wgt" />
	<input type="hidden" name="mk_grs_wgt1" id="mk_grs_wgt1" />
	<input type="hidden" name="mk_meas" id="mk_meas" />
	<input type="hidden" name="mk_meas1" id="mk_meas1" />
	
	<!-- Default Value -->
	<input type="hidden" name="bl_sts_cd"			id="bl_sts_cd"			value="MC" />
	<input type="hidden" name="hbl_tp_cd" 			id="hbl_tp_cd"/>
	<!-- <input type="hidden" name="pck_ut_cd"			id="pck_ut_cd"			value="<bean:write name="hblVO" property="pck_ut_cd"/>"/>
	<input type="hidden" name="pck_qty"				id="pck_qty"			value="<bean:write name="hblVO" property="pck_qty"/>"/>  -->
	<input type="hidden" name="pck_ut_cd"			id="pck_ut_cd"			value="CT"/>
	<input type="hidden" name="pck_qty"				id="pck_qty"			value="0"/>	
	<!-- <input type="hidden" name="grs_wgt" 			id="grs_wgt"			value="<bean:write name="hblVO" property="grs_wgt"/>"/>
	<input type="hidden" name="grs_wgt1" 			id="grs_wgt1"			value="<bean:write name="hblVO" property="grs_wgt1"/>"/> -->
	
	<input type="hidden" name="grs_wgt" 			id="grs_wgt"			value="0"/>
	<input type="hidden" name="grs_wgt1" 			id="grs_wgt1"			value="0"/>
		
	<input type="hidden" name="chg_wgt" 			id="chg_wgt"			value="0"/>
	<input type="hidden" name="chg_wgt" 			id="chg_wgt1"			value="0"/>
	<input type="hidden" name="grs_wgt_ut_cd" 		id="grs_wgt_ut_cd"		value="K"/>
	
	<!-- <input type="hidden" name="meas" 				id="meas"				value="<bean:write name="hblVO" property="meas"/>"/> -->
	<input type="hidden" name="meas" 				id="meas"				value="0"/>
	
	<input type="hidden" name="meas1" 				id="meas1"				value="0"/>
	<input type="hidden" name="meas_ut_cd" 			id="meas_ut_cd"			value="CBM"/>
	<input type="hidden" name="vol_wgt" 			id="vol_wgt"			value="<bean:write name="hblVO" property="vol_wgt"/>"/>
	<input type="hidden" name="fm_svc_term_cd"		id="fm_svc_term_cd"		value="CY"/>
	<input type="hidden" name="to_svc_term_cd"		id="to_svc_term_cd"		value="CY"/>
	<input type="hidden" name="bl_iss_dt" 			id="bl_iss_dt"			value="<bean:write name="hblVO" property="bl_iss_dt"/>"/>
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
	<!-- <input type="hidden" name="shpr_trdp_cd" 		id="shpr_trdp_cd"		value="<bean:write name="hblVO" property="shpr_trdp_cd"/>"/>
	<input type="hidden" name="shpr_trdp_addr" 		id="shpr_trdp_addr"		value="<bean:write name="hblVO" property="shpr_trdp_addr"/>"/>
	<input type="hidden" name="shpr_trdp_nm" 		id="shpr_trdp_nm"		value="<bean:write name="hblVO" property="shpr_trdp_nm"/>"/>  -->
	
	<input type="hidden" name="shpr_trdp_cd" 		id="shpr_trdp_cd"		value=""/>
	<input type="hidden" name="shpr_trdp_addr" 		id="shpr_trdp_addr"		value=""/>
	<input type="hidden" name="shpr_trdp_nm" 		id="shpr_trdp_nm"		value=""/>	
	 
	<input type="hidden" name="ctrb_ratio_yn" 		id="ctrb_ratio_yn"		value="<bean:write name="hblVO" property="ctrb_ratio_yn"/>"/>
	<input type="hidden" name="ctrb_ofc_cd" 		id="ctrb_ofc_cd"		value="<bean:write name="hblVO" property="ctrb_ofc_cd"/>"/>
	<input type="hidden" name="ctrb_dept_cd" 		id="ctrb_dept_cd"		value="<bean:write name="hblVO" property="ctrb_dept_cd"/>"/>
	<input type="hidden" name="ctrb_mgn" 			id="ctrb_mgn"			value="<bean:write name="hblVO" property="ctrb_mgn"/>"/>
	<!-- <input type="hidden" name="profit_share" 		id="profit_share"		value="<bean:write name="hblVO" property="profit_share"/>"/>  -->
	<input type="hidden" name="profit_share" 		id="profit_share"		value="0"/>
	<input type="hidden" name="clean_on_board" 		id="clean_on_board"		value="<bean:write name="hblVO" property="clean_on_board"/>"/>

	
	<div class="layer_popup_title">
		<div class="page_title_area clear">
			<!-- page_title(S) -->
			<h2 class="page_title">
				<bean:message key="MBL_Creation" />
			</h2>
			<!-- page_title(E) -->

			<!-- opus_design_btn(S) -->
			<div class="opus_design_btn">
				<button type="button" class="btn_accent" name="btnSave"
					id="btnSave" onclick="doWork('SAVE')">
					<bean:message key="Create" />
				</button><button type="button" class="btn_normal" id="btnCancel"
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
						<col width="50">
						<col width="50">
						<col width="27">
						<col width="50">
						<col width="170">
						<col width="*">
					</colgroup>
					<tbody>
						<tr>
							<th><bean:message key="ETD" /></th>
							<td><!-- #30284 [BINEX]OEH On-Board Date 동기화 : cobChange()추가 -->
	                               <input required name="etd_dt_tm" value='<wrt:write name="hblVO" property="etd_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:90px;" onKeyUp="mkDateFormatType(this, event, false, 1);" onBlur="mkDateFormatType(this, event, true, 1);dateRangeValid(this, 'ETD');" size='11' maxlength="10" class="search_form"><!-- 
	                            --><button required  type="button" class="calendar" tabindex="-1" name="etd_dt_tm_cal" id="etd_dt_tm_cal"  onclick="doDisplay('DATE1',frm1.etd_dt_tm);" ></button></button>
							</td>
							<th><bean:message key="Ship_Mode" /></th>
							<td><bean:define id="shipModeList" name="valMap"
									property="shipModeList" /> <html:select name="hblVO"
									property="shp_mod_cd" styleClass="input1" style="width:150px;"
									onchange="shipModeChangeDef(this);">
									<html:options collection="shipModeList" property="cd_val"
										labelProperty="cd_nm" />
								</html:select></td>
							<th><bean:message key="BL_Ref_Office" /></th>
							<td><bean:define id="ofcList" name="valMap"
									property="ofcList" /> <html:select name="hblVO"
									property="ref_ofc_cd" styleClass="search_form"
									style="width:170px;" onchange="ofcChDEta();">
									<html:options collection="ofcList" property="ofc_cd"
										labelProperty="ofc_cd" />
								</html:select>
								<input type="hidden" name="h_ref_ofc_cd" value="<bean:write name="hblVO" property="ref_ofc_cd"/>">
							</td>
						</tr>
						<tr>
							<th><bean:message key="POL" /></th>
							<td colspan="3"> <input required  type="text" name="pol_cd" maxlength="5" value='<bean:write name="hblVO" property="pol_cd"/>' class="search_form" onKeyDown="codeNameAction('Location_pol',this, 'onKeyDown','S');" onBlur="codeNameAction('Location_pol',this, 'onBlur','S');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:90px;"><!-- 
                                        --><button type="button" name="pol" id="pol" class="input_seach_btn" tabindex="-1" onClick="openSeeMasterPopUp('LOCATION_POPLIST',this)"></button><!-- 
                                        --><html:hidden name="hblVO" property="pol_nod_cd"/><!-- 
                                        --><input required  type="text" name="pol_nm" maxlength="50" value='<bean:write name="hblVO" property="pol_nm"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:267px;text-transform:uppercase;" onblur="strToUpper(this);" onKeyPress="if(event.keyCode==13){openSeeMasterPopUp('LOCATION_POPLIST', document.getElementById('pol'), frm1.pol_nm.value);}"></td>
							<th><bean:message key="OBL_Type" /></th>
							<td><bean:define id="oblCdList" name="valMap"
									property="oblCdList" /> <html:select name="hblVO"
									property="obl_tp_cd" styleClass="search_form"
									style="width:170px;">
									<html:options collection="oblCdList" property="cd_val"
										labelProperty="cd_nm" />
								</html:select>
								<input type="hidden" name="h_obl_tp_cd" value="<bean:write name="hblVO" property="obl_tp_cd"/>">
							</td>
						</tr>
						<tr>
							<th><bean:message key="POD" /></th>
							<td colspan="3"><input required  type="text" name="pod_cd" maxlength="5" value='<bean:write name="hblVO" property="pod_cd"/>' class="search_form" onKeyDown="codeNameAction('Location_pod',this, 'onKeyDown','S')" onBlur="codeNameAction('Location_pod',this, 'onBlur','S');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:90px;"><!-- 
                                        --><button type="button" name="pod" id="pod" class="input_seach_btn" tabindex="-1" onClick="openSeeMasterPopUp('LOCATION_POPLIST',this)"></button><!-- 
                                        --><html:hidden name="hblVO" property="pod_nod_cd"/><!-- 
                                        --><input required  type="text" name="pod_nm" maxlength="50" value='<bean:write name="hblVO" property="pod_nm"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:267px;text-transform:uppercase;" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){openSeeMasterPopUp('LOCATION_POPLIST', document.getElementById('pod'), frm1.pod_nm.value);}"></td>
							<th><bean:message key="Tariff_Currency_Code" /></th>
							<td><bean:define id="currCdList" name="valMap" property="currCdList"/>
                                <html:select name="hblVO" property="curr_cd" styleClass="search_form" style="width:170px;" >
                                	<html:options collection="currCdList" property="cd_val" labelProperty="cd_nm"/>
                                </html:select>
                                <input type="hidden" name="h_curr_cd" value="<bean:write name="hblVO" property="curr_cd"/>">
                            </td>
						</tr>
					</tbody>
				</table>
			</div>

			<!-- inquiry_area(S) -->
		</div>
		<div class="wrap_result">
			<div class="opus_design_inquiry">
				<table>
					<colgroup>
						<col width="144">
						<col width="200">
						<col width="170">
						<col width="*">
					</colgroup>
					<tbody>
						<tr>
							<th><bean:message key="Service_Contract_No" /></th>
							<td><input type="text" name="sc_no"    
									value='<bean:write name="hblVO" property="sc_no"/>' 
									class="search_form" dataformat="excepthan" 
									style="ime-mode:disabled;resize:none;
									width:90px;
									text-transform:uppercase;" 
									onblur="strToUpper(this)" 
									maxlength="20" style="ime-mode:disabled;
									resize:none; text-transform:uppercase;" ></td>
							<th><bean:message key="Customer_Ref_No" /></th>
							<td><input type="text" name="cust_ref_no"  value='<bean:write name="hblVO" property="cust_ref_no"/>'  class="search_form" dataformat="excepthan" style="ime-mode:disabled;resize:none;width:170px;text-transform:uppercase;" onblur="strToUpper(this)" maxlength="20"></td>
						</tr>
						<tr>
							<th><bean:message key="Final_Dest_Pier" /></th>
							<td><input name="rcv_wh_cd" value='<bean:write name="hblVO" property="rcv_wh_cd"/>' type="text" class="search_form" onKeyDown="codeNameAction('trdpCode_rcv',this, 'onKeyDown')" onBlur="codeNameAction('trdpCode_rcv',this, 'onBlur');javascript:this.value=this.value.toUpperCase();" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:90px;" onblur="strToUpper(this);"><!-- 
                                        --><button type="button" name="rcv" id="rcv" class="input_seach_btn" tabindex="-1" onClick="openSeeMasterPopUp('LINER_POPLIST',this)"></button><!-- 
                                        --><html:hidden name="hblVO" property="fnl_dest_nod_cd"/><!-- 
                                        --><input type="text" name="rcv_wh_nm" value='<bean:write name="hblVO" property="rcv_wh_nm"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:173px;text-transform:uppercase;" onblur="strToUpper(this)" onKeyPress="if(event.keyCode==13){openSeeMasterPopUp('LINER_POPLIST', document.getElementById('rcv'), frm1.rcv_wh_nm.value);}" maxlength="50"></td>
							<th><bean:message key="Brokerage_Rate" /></th>
							<td><input type="text" name="broker_rt" maxlength="5" value="<bean:write name="hblVO" property="broker_rt"/>" class="search_form zero_remove" onKeyPress="ComKeyOnlyNumber(this)" dataformat="excepthan" style="ime-mode:disabled;width:155px;text-align:right"><!-- 
					                 --><input type="text" value="%" class="search_form" style="width:20px;border:0;background-color:transparent;" tabindex="7"></td>
						</tr>
						<tr>
							<th><bean:message key="Destination_Agent" /></th>
							<td colspan="3"><input type="text" name="prnr_trdp_cd" maxlength="20" value='<bean:write name="hblVO" property="prnr_trdp_cd"/>' onKeyDown="if(this.readOnly==true){return};codeNameAction('trdpCode_partner',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('trdpCode_partner',this, 'onBlur')" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:90px;"><!-- 
                                        --><button type="button" name="partner" id="partner" class="input_seach_btn" tabindex="-1" onClick="if(frm1.prnr_trdp_cd.readOnly==true){return};openSeeMasterPopUp('LINER_POPLIST',this)"></button><!-- 
                                        --><input type="text"   name="prnr_trdp_nm" maxlength="50" value='<bean:write name="hblVO" property="prnr_trdp_nm"/>' onblur="strToUpper(this)" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:173px;" onKeyPress="if(this.readOnly==true){return};if(event.keyCode==13){openSeeMasterPopUp('LINER_POPLIST', document.getElementById('partner'), frm1.prnr_trdp_nm.value);}">
										    <input type="hidden" name="prnr_trdp_addr" value='<bean:write name="hblVO" property="prnr_trdp_addr"/>'></td>
							<th></th>
							<td></td>
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


