<%--
=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
=========================================================
=========================================================
*@FileName   : SEE_BMD_0020AJ.jsp
*@FileTitle  : Pre-Pickup Order Entry URL Copy
*@Description: 
*@author     : Tan.Duong - Dou
*@version    : 1.0 - 9/12/2014
*@since      : 05/12/2014

*@Change history:
=========================================================
--%>
<%@ page contentType="text/xml; charset=UTF-8"%>
<%@page import="java.util.HashMap"%>
<%@page import="java.util.List"%>
<%@page import="com.clt.syscommon.response.CommonEventResponse"%>
<%@include file="./../../../../../../syscommon/header/CLTGSHeader.jsp"%>

<logic:empty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
	<logic:notEmpty name="EventResponse" property="objVal">
		<bean:define id="hblVO"   name="EventResponse" property="objVal"/>
    	<bean:define id="valMap"  name="EventResponse" property="mapVal"/>
    	<%
		CommonEventResponse eventResponse = (CommonEventResponse)request.getAttribute("EventResponse");
		String CNTCD1 = "";
		String CNTCD2 = "";
		
		//if(null != eventResponse){
			HashMap<String, Object> mapVal = eventResponse.getMapVal();
			
			List<HashMap> cntrNoLst = (List)mapVal.get("cntrNoLst");
			
			boolean isFirst = true;
			
			if(cntrNoLst != null){
				for(HashMap map : cntrNoLst){
					if(!isFirst){
						CNTCD1 += "|";
						CNTCD2 += "|";
					}else{
						isFirst = false;
					}
					CNTCD1 += map.get("cd_val");
					CNTCD2 += map.get("cd_nm");
				}
			}
		//}
		%>
    	<bean:define id="officeInfo" name="valMap" property="officeInfo"/>
        <bean:define id="ofcVO" name="officeInfo"/>
		<DATA>
			<bl_sts_cd><![CDATA[<bean:write name="hblVO"  property="bl_sts_cd"  filter="false" />]]></bl_sts_cd>
			<intg_bl_seq><![CDATA[<bean:write name="hblVO" property="intg_bl_seq" filter="false" />]]></intg_bl_seq>
			<f_intg_bl_seq><![CDATA[<bean:write name="valMap" property="f_intg_bl_seq" filter="false" />]]></f_intg_bl_seq>
			<bl_no><![CDATA[<bean:write name="hblVO" property="bl_no" filter="false" />]]></bl_no>
			<curr_cd><![CDATA[<bean:write name="hblVO" property="curr_cd" filter="false" />]]></curr_cd>
			<mbl_curr_cd><![CDATA[<bean:write name="hblVO" property="mbl_curr_cd" filter="false" />]]></mbl_curr_cd>
			<ooh_bkg_rmk><![CDATA[<bean:write name="ofcVO" property="ooh_bkg_rmk" filter="false" />]]></ooh_bkg_rmk>
			<f_isNumSep><![CDATA[<bean:write name="valMap" property="f_isNumSep" filter="false" />]]></f_isNumSep>
			<f_bl_no><![CDATA[<bean:write name="valMap" property="f_bl_no" filter="false" />]]></f_bl_no>
			<bl_sts_label><![CDATA[<bean:write name="hblVO" property="bl_sts_label" filter="false" />]]></bl_sts_label>
			<hbl_tp_cd><![CDATA[<bean:write name="hblVO" property="hbl_tp_cd"  filter="false" />]]></hbl_tp_cd>
			<lnr_bkg_no><![CDATA[<bean:write name="hblVO" property="lnr_bkg_no" filter="false" />]]></lnr_bkg_no>
			<mbl_no><![CDATA[<bean:write name="hblVO" property="mbl_no" filter="false" />]]></mbl_no>
			<reserve_field03><![CDATA[<bean:write name="hblVO" property="reserve_field03" filter="false" />]]></reserve_field03>
			<ref_no><![CDATA[<bean:write name="hblVO" property="ref_no" filter="false" />]]></ref_no>
			<ref_ofc_cd><![CDATA[<bean:write name="hblVO" property="ref_ofc_cd" filter="false" />]]></ref_ofc_cd>
			<rlt_intg_bl_seq><![CDATA[<bean:write name="hblVO" property="rlt_intg_bl_seq" filter="false" />]]></rlt_intg_bl_seq>
			<post_dt><![CDATA[<wrt:write name="hblVO" property="post_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></post_dt>
			<mrn_no><![CDATA[<bean:write name="hblVO" property="mrn_no" filter="false" />]]></mrn_no>
			<doc_recpt_no><![CDATA[<bean:write name="hblVO" property="doc_recpt_no" filter="false" />]]></doc_recpt_no>
			<jb_tmplt_nm><![CDATA[<bean:write name="hblVO" property="jb_tmplt_nm" filter="false" />]]></jb_tmplt_nm>
			<jb_tmplt_seq><![CDATA[<bean:write name="hblVO" property="jb_tmplt_seq" filter="false" />]]></jb_tmplt_seq>
			<sub_mbl_flg><![CDATA[<bean:write name="hblVO" property="sub_mbl_flg" filter="false" />]]></sub_mbl_flg>
			<lc_no><![CDATA[<bean:write name="hblVO" property="lc_no" filter="false" />]]></lc_no>
			<inv_no><![CDATA[<bean:write name="hblVO" property="inv_no" filter="false" />]]></inv_no>
			<cust_ref_no><![CDATA[<bean:write name="hblVO" property="cust_ref_no" filter="false" />]]></cust_ref_no>
			<prnr_ref_no><![CDATA[<bean:write name="hblVO" property="prnr_ref_no" filter="false" />]]></prnr_ref_no>
			<bkg_no><![CDATA[<bean:write name="hblVO" property="bkg_no" filter="false" />]]></bkg_no>
			<bkg_seq><![CDATA[<bean:write name="hblVO" property="bkg_seq" filter="false" />]]></bkg_seq>
			<prnr_trdp_cd><![CDATA[<bean:write name="hblVO" property="prnr_trdp_cd" filter="false" />]]></prnr_trdp_cd>
			<prnr_trdp_nm><![CDATA[<bean:write name="hblVO" property="prnr_trdp_nm" filter="false" />]]></prnr_trdp_nm>
			<prnr_trdp_addr><![CDATA[<bean:write name="hblVO" property="prnr_trdp_addr" filter="false" />]]></prnr_trdp_addr>
			<shpr_trdp_nm><![CDATA[<bean:write name="hblVO" property="shpr_trdp_nm" filter="false" />]]></shpr_trdp_nm>
			<shpr_trdp_cd><![CDATA[<bean:write name="hblVO" property="shpr_trdp_cd" filter="false" />]]></shpr_trdp_cd>
			<shpr_trdp_addr><![CDATA[<bean:write name="hblVO" property="shpr_trdp_addr"  filter="false" />]]></shpr_trdp_addr>
			<cnee_trdp_cd><![CDATA[<bean:write name="hblVO" property="cnee_trdp_cd" filter="false" />]]></cnee_trdp_cd>
			<cnee_trdp_nm><![CDATA[<bean:write name="hblVO" property="cnee_trdp_nm" filter="false" />]]></cnee_trdp_nm>
			<cnee_trdp_addr><![CDATA[<bean:write name="hblVO" property="cnee_trdp_addr"  filter="false" />]]></cnee_trdp_addr>
			<ntfy_trdp_cd><![CDATA[<bean:write name="hblVO" property="ntfy_trdp_cd" filter="false" />]]></ntfy_trdp_cd>
			<ntfy_trdp_nm><![CDATA[<bean:write name="hblVO" property="ntfy_trdp_nm" filter="false" />]]></ntfy_trdp_nm>
			<ntfy_trdp_addr><![CDATA[<bean:write name="hblVO" property="ntfy_trdp_addr"  filter="false" />]]></ntfy_trdp_addr>
			<act_shpr_trdp_cd><![CDATA[<bean:write name="hblVO" property="act_shpr_trdp_cd" filter="false" />]]></act_shpr_trdp_cd>
			<act_shpr_trdp_nm><![CDATA[<bean:write name="hblVO" property="act_shpr_trdp_nm" filter="false" />]]></act_shpr_trdp_nm>
			<act_shp_info><![CDATA[<bean:write name="hblVO" property="act_shp_info"  filter="false" />]]></act_shp_info>
			<cust_trdp_cd><![CDATA[<bean:write name="hblVO" property="cust_trdp_cd" filter="false" />]]></cust_trdp_cd>
			<cust_trdp_nm><![CDATA[<bean:write name="hblVO" property="cust_trdp_nm" filter="false" />]]></cust_trdp_nm>
			<cust_trdp_addr><![CDATA[<bean:write name="hblVO" property="cust_trdp_addr"  filter="false" />]]></cust_trdp_addr>
			<exp_ref_no><![CDATA[<bean:write name="hblVO" property="exp_ref_no"  filter="false" />]]></exp_ref_no>
			<vndr_trdp_cd><![CDATA[<bean:write name="hblVO" property="vndr_trdp_cd" filter="false" />]]></vndr_trdp_cd>
			<vndr_trdp_nm><![CDATA[<bean:write name="hblVO" property="vndr_trdp_nm" filter="false" />]]></vndr_trdp_nm>
			<vndr_trdp_addr><![CDATA[<bean:write name="hblVO" property="vndr_trdp_addr" filter="false" />]]></vndr_trdp_addr>
			<cgo_pu_trdp_cd><![CDATA[<bean:write name="hblVO" property="cgo_pu_trdp_cd" filter="false" />]]></cgo_pu_trdp_cd>
			<cgo_pu_trdp_nm><![CDATA[<bean:write name="hblVO" property="cgo_pu_trdp_nm" filter="false" />]]></cgo_pu_trdp_nm>
			<cgo_pu_trdp_addr><![CDATA[<bean:write name="hblVO" property="cgo_pu_trdp_addr" filter="false" />]]></cgo_pu_trdp_addr>
			<trk_trdp_cd><![CDATA[<bean:write name="hblVO" property="trk_trdp_cd" filter="false" />]]></trk_trdp_cd>
			<trk_trdp_nm><![CDATA[<bean:write name="hblVO" property="trk_trdp_nm" filter="false" />]]></trk_trdp_nm>
			<trk_trdp_addr><![CDATA[<bean:write name="hblVO" property="trk_trdp_addr" filter="false" />]]></trk_trdp_addr>
			<cntr_info><![CDATA[<bean:write name="hblVO" property="cntr_info" filter="false" />]]></cntr_info>
			<obrd_dt_tm><![CDATA[<wrt:write name="hblVO" property="obrd_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></obrd_dt_tm>
			<trnk_vsl_cd><![CDATA[<bean:write name="hblVO" property="trnk_vsl_cd" filter="false" />]]></trnk_vsl_cd>
			<trnk_vsl_nm><![CDATA[<bean:write name="hblVO" property="trnk_vsl_nm" filter="false" />]]></trnk_vsl_nm>
			<trnk_voy><![CDATA[<bean:write name="hblVO" property="trnk_voy" filter="false" />]]></trnk_voy>
			<pre_vsl_cd><![CDATA[<bean:write name="hblVO" property="pre_vsl_cd" filter="false" />]]></pre_vsl_cd>
			<pre_vsl_nm><![CDATA[<bean:write name="hblVO" property="pre_vsl_nm" filter="false" />]]></pre_vsl_nm>
			<pre_voy><![CDATA[<bean:write name="hblVO" property="pre_voy" filter="false" />]]></pre_voy>
			<ts1_port_cd><![CDATA[<bean:write name="hblVO" property="ts1_port_cd"  filter="false" />]]></ts1_port_cd>
			<ts1_port_nm><![CDATA[<bean:write name="hblVO" property="ts1_port_nm" filter="false" />]]></ts1_port_nm>
			<ts1_etd_dt_tm><![CDATA[<wrt:write name="hblVO" property="ts1_etd_dt_tm" formatType="DATE" fromFormat="yyyyMMdd" format="MM-dd-yyyy" filter="false" />]]></ts1_etd_dt_tm>
			<ts1_eta_dt_tm><![CDATA[<wrt:write name="hblVO" property="ts1_eta_dt_tm" formatType="DATE" fromFormat="yyyyMMdd" format="MM-dd-yyyy" filter="false" />]]></ts1_eta_dt_tm>
			<por_cd><![CDATA[<bean:write name="hblVO" property="por_cd" filter="false" />]]></por_cd>
			<por_nm><![CDATA[<bean:write name="hblVO" property="por_nm" filter="false" />]]></por_nm>
			<pol_cd><![CDATA[<bean:write name="hblVO" property="pol_cd" filter="false" />]]></pol_cd>
			<pol_nm><![CDATA[<bean:write name="hblVO" property="pol_nm" filter="false" />]]></pol_nm>
			<pod_cd><![CDATA[<bean:write name="hblVO" property="pod_cd" filter="false" />]]></pod_cd>
			<pod_nm><![CDATA[<bean:write name="hblVO" property="pod_nm" filter="false" />]]></pod_nm>
			<del_cd><![CDATA[<bean:write name="hblVO" property="del_cd" filter="false" />]]></del_cd>
			<del_nm><![CDATA[<bean:write name="hblVO" property="del_nm" filter="false" />]]></del_nm>
			<fnl_dest_loc_cd><![CDATA[<bean:write name="hblVO" property="fnl_dest_loc_cd" filter="false" />]]></fnl_dest_loc_cd>
			<fnl_dest_loc_nm><![CDATA[<bean:write name="hblVO" property="fnl_dest_loc_nm" filter="false" />]]></fnl_dest_loc_nm>
			<lnr_trdp_cd><![CDATA[<bean:write name="hblVO" property="lnr_trdp_cd" filter="false" />]]></lnr_trdp_cd>
			<lnr_trdp_nm><![CDATA[<bean:write name="hblVO" property="lnr_trdp_nm" filter="false" />]]></lnr_trdp_nm>
			<etd_dt_tm><![CDATA[<wrt:write name="hblVO" property="etd_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></etd_dt_tm>
			<eta_dt_tm><![CDATA[<wrt:write name="hblVO" property="eta_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></eta_dt_tm>
			<etd_por_tm><![CDATA[<wrt:write name="hblVO" property="etd_por_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></etd_por_tm>
			<inco_cd><![CDATA[<bean:write name="hblVO" property="inco_cd"  filter="false" />]]></inco_cd>
			<shp_mod_cd><![CDATA[<bean:write name="hblVO" property="shp_mod_cd"  filter="false" />]]></shp_mod_cd>
			<rep_cmdt_cd><![CDATA[<bean:write name="hblVO" property="rep_cmdt_cd" filter="false" />]]></rep_cmdt_cd>
			<rep_cmdt_nm><![CDATA[<bean:write name="hblVO" property="rep_cmdt_nm" filter="false" />]]></rep_cmdt_nm>
			<agent_trdp_cd><![CDATA[<bean:write name="hblVO" property="agent_trdp_cd" filter="false" />]]></agent_trdp_cd>
			<agent_trdp_nm><![CDATA[<bean:write name="hblVO" property="agent_trdp_nm" filter="false" />]]></agent_trdp_nm>
			<agent_trdp_addr><![CDATA[<bean:write name="hblVO" property="agent_trdp_addr" filter="false" />]]></agent_trdp_addr>
			<prnr_trdp_cd2><![CDATA[<bean:write name="hblVO" property="prnr_trdp_cd2" filter="false" />]]></prnr_trdp_cd2>
			<prnr_trdp_nm2><![CDATA[<bean:write name="hblVO" property="prnr_trdp_nm2" filter="false" />]]></prnr_trdp_nm2>
			<prnr_trdp_addr2><![CDATA[<bean:write name="hblVO" property="prnr_trdp_addr2" filter="false" />]]></prnr_trdp_addr2>
			<state_cd><![CDATA[<bean:write name="hblVO" property="state_cd" filter="false" />]]></state_cd>
			<state_nm><![CDATA[<bean:write name="hblVO" property="state_nm" filter="false" />]]></state_nm>
			<cnt_cd><![CDATA[<bean:write name="hblVO" property="cnt_cd" filter="false" />]]></cnt_cd>
			<cnt_nm><![CDATA[<bean:write  name="hblVO" property="cnt_nm" filter="false" />]]></cnt_nm>
			<pck_qty><![CDATA[<bean:write name="hblVO" property="pck_qty" filter="false" />]]></pck_qty>
			<pck_ut_cd><![CDATA[<bean:write name="hblVO" property="pck_ut_cd"  filter="false" />]]></pck_ut_cd>
			<grs_wgt><![CDATA[<bean:write name="hblVO" property="grs_wgt" filter="false" />]]></grs_wgt>
			<grs_wgt1><![CDATA[<bean:write name="hblVO" property="grs_wgt1" filter="false" />]]></grs_wgt1>
			<meas><![CDATA[<bean:write name="hblVO" property="meas" filter="false" />]]></meas>
			<meas1><![CDATA[<bean:write name="hblVO" property="meas1" filter="false" />]]></meas1>
			<size_ut_cd><![CDATA[<bean:write name="hblVO" property="size_ut_cd" filter="false" />]]></size_ut_cd>
			<wh_recp_no><![CDATA[<bean:write name="hblVO" property="wh_recp_no" filter="false" />]]></wh_recp_no>
			<agent_rt><![CDATA[<bean:write name="hblVO" property="agent_rt" filter="false" />]]></agent_rt>
			<agent_amt><![CDATA[<bean:write name="hblVO" property="agent_amt" filter="false" />]]></agent_amt>
			<agent_curr_cd><![CDATA[<bean:write name="hblVO" property="agent_curr_cd"  filter="false" />]]></agent_curr_cd>
			<cust_rt><![CDATA[<bean:write name="hblVO" property="cust_rt" filter="false" />]]></cust_rt>
			<cust_amt><![CDATA[<bean:write name="hblVO" property="cust_amt" filter="false" />]]></cust_amt>
			<cust_curr_cd><![CDATA[<bean:write name="hblVO" property="cust_curr_cd"  filter="false" />]]></cust_curr_cd>
			<frt_term_a_cd><![CDATA[<bean:write name="hblVO" property="frt_term_a_cd"  filter="false" />]]></frt_term_a_cd>
			<frt_term_c_cd><![CDATA[<bean:write name="hblVO" property="frt_term_c_cd"  filter="false" />]]></frt_term_c_cd>
			<fm_svc_term_cd><![CDATA[<bean:write name="hblVO" property="fm_svc_term_cd"  filter="false" />]]></fm_svc_term_cd>
			<to_svc_term_cd><![CDATA[<bean:write name="hblVO" property="to_svc_term_cd"  filter="false" />]]></to_svc_term_cd>
			<profit_share><![CDATA[<bean:write name="hblVO" property="profit_share" filter="false" />]]></profit_share>
			<express_tp_cd><![CDATA[<bean:write name="hblVO" property="express_tp_cd"  filter="false" />]]></express_tp_cd>
			<obl_tp_cd><![CDATA[<bean:write name="hblVO" property="obl_tp_cd" filter="false" />]]></obl_tp_cd>
			<cargo_tp_cd><![CDATA[<bean:write name="hblVO" property="cargo_tp_cd"  filter="false" />]]></cargo_tp_cd>
			<nomi_flg><![CDATA[<bean:write name="hblVO" property="nomi_flg"  filter="false" />]]></nomi_flg>
			<shp_tp_cd><![CDATA[<bean:write name="hblVO" property="shp_tp_cd"  filter="false" />]]></shp_tp_cd>
			<wh_cut_off_dt><![CDATA[<wrt:write name="hblVO" property="wh_cut_off_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></wh_cut_off_dt>
			<wh_cut_off_tm><![CDATA[<wrt:write name="hblVO" property="wh_cut_off_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm" filter="false" />]]></wh_cut_off_tm>
			<sls_ofc_cd><![CDATA[<bean:write name="hblVO" property="sls_ofc_cd" filter="false" />]]></sls_ofc_cd>
			<sls_usrid><![CDATA[<bean:write name="hblVO" property="sls_usrid" filter="false" />]]></sls_usrid>
			<sls_usr_nm><![CDATA[<bean:write name="hblVO" property="sls_usr_nm" filter="false" />]]></sls_usr_nm>
			<sls_dept_cd><![CDATA[<bean:write name="hblVO" property="sls_dept_cd" filter="false" />]]></sls_dept_cd>
			<bkg_dt_tm><![CDATA[<wrt:write name="hblVO" property="bkg_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></bkg_dt_tm>
			<rlsd_flg><![CDATA[<bean:write name="hblVO" property="rlsd_flg" filter="false" />]]></rlsd_flg>
			<rlsd_dt_tm><![CDATA[<wrt:write name="hblVO" property="rlsd_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></rlsd_dt_tm>
			<rlsd_usrid><![CDATA[<bean:write name="hblVO" property="rlsd_usrid" filter="false" />]]></rlsd_usrid>
			<rlsd_usr_nm><![CDATA[<bean:write name="hblVO" property="rlsd_usr_nm" filter="false" />]]></rlsd_usr_nm>
			<rlsd_dept_cd><![CDATA[<bean:write name="hblVO" property="rlsd_dept_cd" filter="false" />]]></rlsd_dept_cd>
			<bl_iss_dt><![CDATA[<wrt:write name="hblVO" property="bl_iss_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></bl_iss_dt>
			<issued_by><![CDATA[<bean:write name="hblVO" property="issued_by" filter="false" />]]></issued_by>
			<proc_usrnm><![CDATA[<bean:write name="hblVO" property="proc_usrnm" filter="false" />]]></proc_usrnm>
			<proc_ofccd><![CDATA[<bean:write name="hblVO" property="proc_ofccd" filter="false" />]]></proc_ofccd>
			<proc_dept_cd><![CDATA[<bean:write name="hblVO" property="proc_dept_cd" filter="false" />]]></proc_dept_cd>
			<iss_loc_nm1><![CDATA[<bean:write name="hblVO" property="iss_loc_nm1" filter="false" />]]></iss_loc_nm1>
			<obrd_dt_tm1><![CDATA[<wrt:write name="hblVO" property="obrd_dt_tm1" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></obrd_dt_tm1>
			<org_bl_qty><![CDATA[<bean:write name="hblVO" property="org_bl_qty" filter="false" />]]></org_bl_qty>
			<itn_no><![CDATA[<bean:write name="hblVO" property="itn_no" filter="false" />]]></itn_no>
			<trans_shipment><![CDATA[<bean:write name="hblVO" property="trans_shipment" filter="false" />]]></trans_shipment>
			<onward_rout><![CDATA[<bean:write name="hblVO" property="onward_rout" filter="false" />]]></onward_rout>
			<sad_txt><![CDATA[<bean:write name="hblVO" property="sad_txt"  filter="false" />]]></sad_txt>
			<say_txt><![CDATA[<bean:write name="hblVO" property="say_txt"  filter="false" />]]></say_txt>
			<mk_grs_wgt><![CDATA[<bean:write name="hblVO" property="mk_grs_wgt" filter="false" />]]></mk_grs_wgt>
			<mk_grs_wgt1><![CDATA[<bean:write name="hblVO" property="mk_grs_wgt1" filter="false" />]]></mk_grs_wgt1>
			<mk_meas><![CDATA[<bean:write name="hblVO" property="mk_meas" filter="false" />]]></mk_meas>
			<mk_meas1><![CDATA[<bean:write name="hblVO" property="mk_meas1" filter="false" />]]></mk_meas1>
			<carr_trdp_cd1><![CDATA[<bean:write name="hblVO" property="carr_trdp_cd1" filter="false" />]]></carr_trdp_cd1>
			<carr_trdp_nm1><![CDATA[<bean:write name="hblVO" property="carr_trdp_nm1" filter="false" />]]></carr_trdp_nm1>
			<mk_txt><![CDATA[<bean:write name="hblVO" property="mk_txt"  filter="false" />]]></mk_txt>
			<desc_txt1><![CDATA[<bean:write name="hblVO" property="desc_txt1"  filter="false" />]]></desc_txt1>
			<desc_txt><![CDATA[<bean:write name="hblVO" property="desc_txt"  filter="false" />]]></desc_txt>
			<exp_frt_desc><![CDATA[<bean:write name="hblVO" property="exp_frt_desc"  filter="false" />]]></exp_frt_desc>
			<clean_on_board><![CDATA[<bean:write name="hblVO" property="clean_on_board" filter="false" />]]></clean_on_board>
			<wgt_disp_cd><![CDATA[<bean:write name="hblVO" property="wgt_disp_cd"  filter="false" />]]></wgt_disp_cd>
			<rmk><![CDATA[<bean:write name="hblVO" property="rmk"  filter="false" />]]></rmk>
			<po_no><![CDATA[<bean:write name="hblVO" property="po_no"  filter="false" />]]></po_no>
			<item_no><![CDATA[<bean:write name="hblVO" property="item_no"  filter="false" />]]></item_no>
			<ctrb_ofc_cd><![CDATA[<bean:write name="hblVO" property="ctrb_ofc_cd" filter="false" />]]></ctrb_ofc_cd>
			<ctrb_dept_cd><![CDATA[<bean:write name="hblVO" property="ctrb_dept_cd" filter="false" />]]></ctrb_dept_cd>
			<ctrb_ratio_yn><![CDATA[<bean:write name="hblVO" property="ctrb_ratio_yn" filter="false" />]]></ctrb_ratio_yn>
			<ctrb_mgn><![CDATA[<bean:write name="hblVO" property="ctrb_mgn" filter="false" />]]></ctrb_mgn>
			<doc_form><![CDATA[<bean:write name="hblVO" property="doc_form" filter="false" />]]></doc_form>
			<wh_trdp_cd><![CDATA[<bean:write name="hblVO" property="wh_trdp_cd" filter="false" />]]></wh_trdp_cd>
			<wh_trdp_nm><![CDATA[<bean:write name="hblVO" property="wh_trdp_nm" filter="false" />]]></wh_trdp_nm>
			
			<!-- C.W Park Mbl 정보 가져옴. #304 -->
			<m_pck_qty><![CDATA[<bean:write name="hblVO" property="m_pck_qty" filter="false" />]]></m_pck_qty>
			<m_pck_ut_cd><![CDATA[<bean:write name="hblVO" property="m_pck_ut_cd" filter="false" />]]></m_pck_ut_cd>
			<m_grs_wgt><![CDATA[<bean:write name="hblVO" property="m_grs_wgt" filter="false" />]]></m_grs_wgt>
			<m_mk_grs_wgt1><![CDATA[<bean:write name="hblVO" property="m_mk_grs_wgt1" filter="false" />]]></m_mk_grs_wgt1>
			<m_grs_wgt_ut_cd><![CDATA[<bean:write name="hblVO" property="m_grs_wgt_ut_cd" filter="false" />]]></m_grs_wgt_ut_cd>
			<m_act_wgt><![CDATA[<bean:write name="hblVO" property="m_act_wgt" filter="false" />]]></m_act_wgt>
			<m_act_wgt_ut_cd><![CDATA[<bean:write name="hblVO" property="m_act_wgt_ut_cd" filter="false" />]]></m_act_wgt_ut_cd>
			<m_meas><![CDATA[<bean:write name="hblVO" property="m_meas" filter="false" />]]></m_meas>
			<m_mk_meas1><![CDATA[<bean:write name="hblVO" property="m_mk_meas1" filter="false" />]]></m_mk_meas1>
			<m_meas_ut_cd><![CDATA[<bean:write name="hblVO" property="m_meas_ut_cd" filter="false" />]]></m_meas_ut_cd>
			<m_shp_mod_cd><![CDATA[<bean:write name="hblVO" property="m_shp_mod_cd" filter="false" />]]></m_shp_mod_cd>
			<f_modify><![CDATA[<bean:write name="valMap" property="f_modify" filter="false" />]]></f_modify> <!--#428 [ZEN] AFTER AR/AP/DC CREATION, FILING # SHOULD BE NOT UPDATED  -->

			<!-- #3355 [JTC]Dock Receipt 수정 -->
			<ams_no><![CDATA[<bean:write name="hblVO" property="ams_no" filter="false" />]]></ams_no>
			<isf_no><![CDATA[<bean:write name="hblVO" property="isf_no" filter="false" />]]></isf_no>

			<%-- #1619 [CLT] Original B/L Type- 항목 정리<bl_rlse_tp_cd><![CDATA[<bean:write name="hblVO" property="bl_rlse_tp_cd" filter="false" />]]></bl_rlse_tp_cd> --%><!--#1430 [PATENT] 0215_15 B/L TYPE DIVERSELY-->
			<CNTCD1><![CDATA[<%= CNTCD1%>]]></CNTCD1>
			<CNTCD2><![CDATA[<%= CNTCD2%>]]></CNTCD2>
			<!-- #1804 [Split - 1] [PATENT] Payment Verification - 기능보완  -->
			<verify_flag><![CDATA[<bean:write name="hblVO" property="verify_flag"  filter="false" />]]></verify_flag>

			<!-- #657 [OCEAN BLUE, IMPEX] B/L SELECTION FLAG TO SHOW ON VISIBILITY PORTAL (2017.07.03) -->
			<surrend><![CDATA[<bean:write name="hblVO" property="surrend" filter="false" />]]></surrend>  <!-- 누락됐었음. -->
			<inter_use_flag><![CDATA[<bean:write name="hblVO" property="inter_use_flag" filter="false" />]]></inter_use_flag>

			<!-- #2354 [PATENT] House Bill Based - Processing Logic Enhancement -->
			<hbl_cnt><![CDATA[<bean:write name="hblVO" property="hbl_cnt"  filter="false" />]]></hbl_cnt>

			<!-- #3171 [CLT] OEH BL - Mark탭의 Carrier 정보 연계 -->
			<vsl_show_flg><![CDATA[<bean:write name="hblVO" property="vsl_show_flg"  filter="false" />]]></vsl_show_flg>
			<load_port_show_flg><![CDATA[<bean:write name="hblVO" property="load_port_show_flg"  filter="false" />]]></load_port_show_flg>
			
			<!-- #3376 [JTC] Japan Trust 용 Profit Report 개발 -->
			<lane_cd><![CDATA[<bean:write name="hblVO" property="lane_cd" filter="false" />]]></lane_cd>
			<svc_lane_nm><![CDATA[<bean:write name="hblVO" property="svc_lane_nm" filter="false" />]]></svc_lane_nm>
			
			<!-- #3608 [JTC]OEH Entry 에 DOC Cut-Off Date 추가 -->
			<hbl_cut_off_dt><![CDATA[<wrt:write name="hblVO" property="hbl_cut_off_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></hbl_cut_off_dt>
			<hbl_cut_off_tm><![CDATA[<wrt:write name="hblVO" property="hbl_cut_off_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm" filter="false" />]]></hbl_cut_off_tm>			
			<!-- #4128 [JAPT] New request - OEH TRI#, TLI# -->
			<tli_no><![CDATA[<bean:write name="hblVO" property="tli_no" filter="false" />]]></tli_no>
		</DATA>
	</logic:notEmpty>    
</logic:empty>
