<%--
=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
=========================================================
=========================================================
*@FileName   : AIE_BMD_0020AJ.jsp
*@FileTitle  : AEH AWB Entry
*@Description: 
*@author     : Khang.Dong - Dou
*@version    : 1.0 - 09/12/2014
*@since      : 09/12/2014

*@Change history:
=========================================================
--%>
<%@ page contentType="text/xml; charset=UTF-8"%>
<%@page pageEncoding="UTF-8"%>
<%@include file="./../../../../../../syscommon/header/CLTGSHeader.jsp"%>
<logic:empty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
	<logic:notEmpty name="EventResponse" property="objVal">
		<bean:define id="hblVO" name="EventResponse" property="objVal" />
		<bean:define id="valMap" name="EventResponse" property="mapVal" />
		<DATA> 
		<bl_sts_cd><![CDATA[<bean:write name="hblVO"  property="bl_sts_cd" filter="false" />]]></bl_sts_cd>
		<intg_bl_seq><![CDATA[<bean:write name="hblVO"  property="intg_bl_seq" filter="false" />]]></intg_bl_seq>
		<f_intg_bl_seq><![CDATA[<bean:write name="valMap" property="f_intg_bl_seq" filter="false" />]]></f_intg_bl_seq>
		<bl_no><![CDATA[<bean:write name="hblVO" property="bl_no" filter="false" />]]></bl_no>
		<curr_cd><![CDATA[<bean:write name="hblVO" property="curr_cd" filter="false" />]]></curr_cd>
		<mbl_curr_cd><![CDATA[<bean:write name="hblVO" property="mbl_curr_cd" filter="false" />]]></mbl_curr_cd>
		<f_isNumSep><![CDATA[<bean:write name="valMap" property="f_isNumSep" filter="false" />]]></f_isNumSep>
		<m_shpr_trdp_nm><![CDATA[<bean:write name="hblVO" property="m_shpr_trdp_nm" filter="false" />]]></m_shpr_trdp_nm>
		<f_bl_no><![CDATA[<bean:write name="valMap" property="f_bl_no" filter="false" />]]></f_bl_no>
		<bl_sts_label><![CDATA[<bean:write name="hblVO" property="bl_sts_label" filter="false" />]]></bl_sts_label>
		<hbl_tp_cd><![CDATA[<bean:write name="hblVO" property="hbl_tp_cd"  filter="false" />]]></hbl_tp_cd>
		<jb_tmplt_nm><![CDATA[<bean:write name="hblVO" property="jb_tmplt_nm" filter="false" />]]></jb_tmplt_nm>
		<jb_tmplt_seq><![CDATA[<bean:write name="hblVO"  property="jb_tmplt_seq" filter="false" />]]></jb_tmplt_seq>
		<mrn_no><![CDATA[<bean:write name="hblVO" property="mrn_no" filter="false" />]]></mrn_no> 
		<inv_no><![CDATA[<bean:write name="hblVO" property="inv_no" filter="false" />]]></inv_no>
		<ref_no><![CDATA[<bean:write name="hblVO" property="ref_no" filter="false" />]]></ref_no>
		<ref_ofc_cd><![CDATA[<bean:write name="hblVO" property="ref_ofc_cd" filter="false" />]]></ref_ofc_cd>
		<rlt_intg_bl_seq><![CDATA[<bean:write name="hblVO" property="rlt_intg_bl_seq" filter="false" />]]></rlt_intg_bl_seq>
		<lnr_bkg_no><![CDATA[<bean:write name="hblVO" property="lnr_bkg_no" filter="false" />]]></lnr_bkg_no>
		<mbl_no><![CDATA[<bean:write name="hblVO" property="mbl_no" filter="false" />]]></mbl_no>
		<po_no><![CDATA[<bean:write name="hblVO" property="po_no" filter="false" />]]></po_no>
		<prnr_ref_no><![CDATA[<bean:write name="hblVO" property="prnr_ref_no" filter="false" />]]></prnr_ref_no>
		<bl_dt_tm><![CDATA[<wrt:write name="hblVO" property="bl_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></bl_dt_tm>
		<post_dt><![CDATA[<wrt:write name="hblVO" property="post_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></post_dt>
		<lc_no><![CDATA[<bean:write name="hblVO" property="lc_no" filter="false" />]]></lc_no>
		<exp_ref_no><![CDATA[<bean:write name="hblVO" property="exp_ref_no" filter="false" />]]></exp_ref_no>
		<reserve_field03><![CDATA[<bean:write name="hblVO" property="reserve_field03" filter="false" />]]></reserve_field03>
		<prnr_trdp_cd><![CDATA[<bean:write name="hblVO" property="prnr_trdp_cd" filter="false" />]]></prnr_trdp_cd>
		<prnr_trdp_nm><![CDATA[<bean:write name="hblVO" property="prnr_trdp_nm" filter="false" />]]></prnr_trdp_nm>
		<prnr_trdp_addr><![CDATA[<bean:write name="hblVO" property="prnr_trdp_addr" filter="false" />]]></prnr_trdp_addr>
		<shpr_trdp_cd><![CDATA[<bean:write name="hblVO" property="shpr_trdp_cd" filter="false" />]]></shpr_trdp_cd>
		<shpr_trdp_nm><![CDATA[<bean:write name="hblVO" property="shpr_trdp_nm" filter="false" />]]></shpr_trdp_nm>
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
		<vndr_trdp_cd><![CDATA[<bean:write name="hblVO" property="vndr_trdp_cd" filter="false" />]]></vndr_trdp_cd>
		<vndr_trdp_nm><![CDATA[<bean:write name="hblVO" property="vndr_trdp_nm" filter="false" />]]></vndr_trdp_nm>
		<vndr_trdp_addr><![CDATA[<bean:write name="hblVO" property="vndr_trdp_addr" filter="false" />]]></vndr_trdp_addr>
		<disp_ntfy_flg><![CDATA[<bean:write name="hblVO" property="disp_ntfy_flg" filter="false" />]]></disp_ntfy_flg>
		<prnr_trdp_cd2><![CDATA[<bean:write name="hblVO" property="prnr_trdp_cd2" filter="false" />]]></prnr_trdp_cd2>
		<prnr_trdp_nm2><![CDATA[<bean:write name="hblVO" property="prnr_trdp_nm2" filter="false" />]]></prnr_trdp_nm2>
		<prnr_trdp_addr2><![CDATA[<bean:write name="hblVO" property="prnr_trdp_addr2" filter="false" />]]></prnr_trdp_addr2>
		<lnr_trdp_cd><![CDATA[<bean:write name="hblVO" property="lnr_trdp_cd" filter="false" />]]></lnr_trdp_cd>
		<lnr_trdp_nm><![CDATA[<bean:write name="hblVO" property="lnr_trdp_nm" filter="false" />]]></lnr_trdp_nm>
		<obrd_dt_tm><![CDATA[<wrt:write name="hblVO" property="obrd_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></obrd_dt_tm>
		<flt_no><![CDATA[<bean:write name="hblVO" property="flt_no" filter="false" />]]></flt_no>
		<etd_dt_tm><![CDATA[<wrt:write name="hblVO" property="etd_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></etd_dt_tm>
		<etd_tm><![CDATA[<wrt:write name="hblVO" property="etd_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm" filter="false" />]]></etd_tm>
		<eta_dt_tm><![CDATA[<wrt:write name="hblVO" property="eta_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></eta_dt_tm>
		<eta_tm><![CDATA[<wrt:write name="hblVO" property="eta_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm" filter="false" />]]></eta_tm>
		<pol_cd><![CDATA[<bean:write name="hblVO" property="pol_cd" filter="false" />]]></pol_cd>
		<pol_nod_cd><![CDATA[<bean:write name="hblVO" property="pol_nod_cd" filter="false" />]]></pol_nod_cd>
		<pol_nm><![CDATA[<bean:write name="hblVO" property="pol_nm" filter="false" />]]></pol_nm>
		<fst_to_cd><![CDATA[<bean:write name="hblVO" property="fst_to_cd" filter="false" />]]></fst_to_cd>
		<fst_to_nm><![CDATA[<bean:write name="hblVO" property="fst_to_nm" filter="false" />]]></fst_to_nm>
		<ts1_port_cd><![CDATA[<bean:write name="hblVO" property="ts1_port_cd" filter="false" />]]></ts1_port_cd>
		<ts1_flt_no><![CDATA[<bean:write name="hblVO" property="ts1_flt_no" filter="false" />]]></ts1_flt_no>
		<ts2_port_cd><![CDATA[<bean:write name="hblVO" property="ts2_port_cd" filter="false" />]]></ts2_port_cd>
		<ts2_flt_no><![CDATA[<bean:write name="hblVO" property="ts2_flt_no" filter="false" />]]></ts2_flt_no>
		<ts3_port_cd><![CDATA[<bean:write name="hblVO" property="ts3_port_cd" filter="false" />]]></ts3_port_cd>
		<ts3_flt_no><![CDATA[<bean:write name="hblVO" property="ts3_flt_no" filter="false" />]]></ts3_flt_no>
		<pod_cd><![CDATA[<bean:write name="hblVO" property="pod_cd" filter="false" />]]></pod_cd>
		<pod_nod_cd><![CDATA[<bean:write name="hblVO" property="pod_nod_cd" filter="false" />]]></pod_nod_cd>
		<pod_nm><![CDATA[<bean:write name="hblVO" property="pod_nm" filter="false" />]]></pod_nm>
		<cfs_nod_cd><![CDATA[<bean:write name="hblVO" property="cfs_nod_cd" filter="false" />]]></cfs_nod_cd>
		<cfs_loc_nm><![CDATA[<bean:write name="hblVO" property="cfs_loc_nm" filter="false" />]]></cfs_loc_nm>
		<cfs_loc_cd><![CDATA[<bean:write name="hblVO" property="cfs_loc_cd" filter="false" />]]></cfs_loc_cd>
		<issued_by><![CDATA[<bean:write name="hblVO" property="issued_by" filter="false" />]]></issued_by>
		<proc_usrnm><![CDATA[<bean:write name="hblVO" property="proc_usrnm" filter="false" />]]></proc_usrnm>
		<proc_ofccd><![CDATA[<bean:write name="hblVO" property="proc_ofccd" filter="false" />]]></proc_ofccd>
		<proc_dept_cd><![CDATA[<bean:write name="hblVO" property="proc_dept_cd" filter="false" />]]></proc_dept_cd>
		<bkg_dt_tm><![CDATA[<wrt:write name="hblVO" property="bkg_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></bkg_dt_tm>
		<bl_iss_dt><![CDATA[<wrt:write name="hblVO" property="bl_iss_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></bl_iss_dt>
		<sls_ofc_cd><![CDATA[<bean:write name="hblVO" property="sls_ofc_cd" filter="false" />]]></sls_ofc_cd>
		<sls_usrid><![CDATA[<bean:write name="hblVO" property="sls_usrid" filter="false" />]]></sls_usrid>
		<sls_usr_nm><![CDATA[<bean:write name="hblVO" property="sls_usr_nm" filter="false" />]]></sls_usr_nm>
		<sls_dept_cd><![CDATA[<bean:write name="hblVO" property="sls_dept_cd" filter="false" />]]></sls_dept_cd>
		<agent_trdp_cd><![CDATA[<bean:write name="hblVO" property="agent_trdp_cd" filter="false" />]]></agent_trdp_cd>
		<agent_trdp_nm><![CDATA[<bean:write name="hblVO" property="agent_trdp_nm" filter="false" />]]></agent_trdp_nm>
		<agent_trdp_addr><![CDATA[<bean:write name="hblVO" property="agent_trdp_addr" filter="false" />]]></agent_trdp_addr>
		<cnt_cd><![CDATA[<bean:write name="hblVO" property="cnt_cd" filter="false" />]]></cnt_cd>
		<cnt_nm><![CDATA[<bean:write name="hblVO" property="cnt_nm" filter="false" />]]></cnt_nm>
		<iss_trdp_cd><![CDATA[<bean:write name="hblVO" property="iss_trdp_cd" filter="false" />]]></iss_trdp_cd>
		<iss_trdp_nm><![CDATA[<bean:write name="hblVO" property="iss_trdp_nm" filter="false" />]]></iss_trdp_nm>
		<iss_trdp_addr><![CDATA[<bean:write name="hblVO" property="iss_trdp_addr"  filter="false" />]]></iss_trdp_addr>
		<rep_cmdt_cd><![CDATA[<bean:write name="hblVO" property="rep_cmdt_cd" filter="false" />]]></rep_cmdt_cd>
		<rep_cmdt_nm><![CDATA[<bean:write name="hblVO" property="rep_cmdt_nm" filter="false" />]]></rep_cmdt_nm>
		<pck_qty><![CDATA[<bean:write name="hblVO" property="pck_qty" filter="false" />]]></pck_qty>
		<pck_ut_cd><![CDATA[<bean:write name="hblVO" property="pck_ut_cd"  filter="false" />]]></pck_ut_cd>
		<inco_cd><![CDATA[<bean:write name="hblVO" property="inco_cd"  filter="false" />]]></inco_cd>
		<rt_clss_cd><![CDATA[<bean:write name="hblVO" property="rt_clss_cd"  filter="false" />]]></rt_clss_cd>
		<cargo_tp_cd><![CDATA[<bean:write name="hblVO" property="cargo_tp_cd"  filter="false" />]]></cargo_tp_cd>
		<agent_grs_wgt><![CDATA[<bean:write name="hblVO" property="agent_grs_wgt" filter="false" />]]></agent_grs_wgt>
		<agent_grs_wgt1><![CDATA[<bean:write name="hblVO" property="agent_grs_wgt1" filter="false" />]]></agent_grs_wgt1>
		<grs_wgt><![CDATA[<bean:write name="hblVO" property="grs_wgt" filter="false" />]]></grs_wgt>
		<grs_wgt1><![CDATA[<bean:write name="hblVO" property="grs_wgt1" filter="false" />]]></grs_wgt1>
		<agent_chg_wgt><![CDATA[<bean:write name="hblVO" property="agent_chg_wgt" filter="false" />]]></agent_chg_wgt>
		<agent_chg_wgt1><![CDATA[<bean:write name="hblVO" property="agent_chg_wgt1" filter="false" />]]></agent_chg_wgt1>
		<chg_wgt><![CDATA[<bean:write name="hblVO" property="chg_wgt" filter="false" />]]></chg_wgt>
		<chg_wgt1><![CDATA[<bean:write name="hblVO" property="chg_wgt1" filter="false" />]]></chg_wgt1>
		<vol_wgt><![CDATA[<bean:write name="hblVO" property="vol_wgt" filter="false" />]]></vol_wgt>
		<vol_meas><![CDATA[<bean:write name="hblVO" property="vol_meas" filter="false" />]]></vol_meas>
		<size_ut_cd><![CDATA[<bean:write name="hblVO" property="size_ut_cd" filter="false" />]]></size_ut_cd>
		<wh_recp_no><![CDATA[<bean:write name="hblVO" property="wh_recp_no" filter="false" />]]></wh_recp_no>
		<agent_unit_chk><![CDATA[<bean:write name="hblVO" property="agent_unit_chk" filter="false" />]]></agent_unit_chk>
		<agent_rt><![CDATA[<bean:write name="hblVO" property="agent_rt" filter="false" />]]></agent_rt>
		<agent_amt><![CDATA[<bean:write name="hblVO" property="agent_amt" filter="false" />]]></agent_amt>
		<agent_curr_cd><![CDATA[<bean:write name="hblVO" property="agent_curr_cd" filter="false" />]]></agent_curr_cd>
		<customer_unit_chk><![CDATA[<bean:write name="hblVO" property="customer_unit_chk" filter="false" />]]></customer_unit_chk>
		<cust_rt><![CDATA[<bean:write name="hblVO" property="cust_rt" filter="false" />]]></cust_rt>
		<cust_amt><![CDATA[<bean:write name="hblVO" property="cust_amt" filter="false" />]]></cust_amt>
		<cust_curr_cd><![CDATA[<bean:write name="hblVO" property="cust_curr_cd"  filter="false" />]]></cust_curr_cd>
		<frt_term_cd><![CDATA[<bean:write name="hblVO" property="frt_term_cd"  filter="false" />]]></frt_term_cd>
		<otr_chg_term_cd><![CDATA[<bean:write name="hblVO" property="otr_chg_term_cd"  filter="false" />]]></otr_chg_term_cd>
		<profit_share><![CDATA[<bean:write name="hblVO" property="profit_share" filter="false" />]]></profit_share>
		<nomi_flg><![CDATA[<bean:write name="hblVO" property="nomi_flg"  filter="false" />]]></nomi_flg>
		<decl_crr_val><![CDATA[<bean:write name="hblVO" property="decl_crr_val" filter="false" />]]></decl_crr_val>
		<decl_cstms_val><![CDATA[<bean:write name="hblVO" property="decl_cstms_val" filter="false" />]]></decl_cstms_val>
		<shp_tp_cd><![CDATA[<bean:write name="hblVO" property="shp_tp_cd" filter="false" />]]></shp_tp_cd>
		<amt_insur_val><![CDATA[<bean:write name="hblVO" property="amt_insur_val" filter="false" />]]></amt_insur_val>
		<hndl_info_txt><![CDATA[<bean:write name="hblVO" property="hndl_info_txt"  filter="false" />]]></hndl_info_txt>
		<mk_txt><![CDATA[<bean:write name="hblVO" property="mk_txt"  filter="false" />]]></mk_txt>
		<acctg_info_txt><![CDATA[<bean:write name="hblVO" property="acctg_info_txt"  filter="false" />]]></acctg_info_txt>
		<desc_txt><![CDATA[<bean:write name="hblVO" property="desc_txt"  filter="false" />]]></desc_txt>
		<wgt_disp_cd><![CDATA[<bean:write name="hblVO" property="wgt_disp_cd"  filter="false" />]]></wgt_disp_cd>
		<itn_no><![CDATA[<bean:write name="hblVO" property="itn_no" filter="false" />]]></itn_no>
		<rmk><![CDATA[<bean:write name="hblVO" property="rmk"  filter="false" />]]></rmk>
		<ctrb_ofc_cd><![CDATA[<bean:write name="hblVO" property="ctrb_ofc_cd" filter="false" />]]></ctrb_ofc_cd>
		<ctrb_dept_cd><![CDATA[<bean:write name="hblVO" property="ctrb_dept_cd" filter="false" />]]></ctrb_dept_cd>
		<ctrb_ratio_yn><![CDATA[<bean:write name="hblVO" property="ctrb_ratio_yn" filter="false" />]]></ctrb_ratio_yn>
		<ctrb_mgn><![CDATA[<bean:write name="hblVO" property="ctrb_mgn" filter="false" />]]></ctrb_mgn>
		<certi_sts_cd><![CDATA[<bean:write name="hblVO" property="certi_sts_cd" filter="false" />]]></certi_sts_cd>
		<ucr_no><![CDATA[<bean:write name="hblVO" property="ucr_no" filter="false" />]]></ucr_no>
		<f_modify><![CDATA[<bean:write name="valMap" property="f_modify" filter="false" />]]></f_modify> <!--#428 [ZEN] AFTER AR/AP/DC CREATION, FILING # SHOULD BE NOT UPDATED  -->
		<!-- #657 [OCEAN BLUE, IMPEX] B/L SELECTION FLAG TO SHOW ON VISIBILITY PORTAL -->
		<inter_use_flag><![CDATA[<bean:write name="hblVO" property="inter_use_flag" filter="false" />]]></inter_use_flag>
		<cust_ref_no><![CDATA[<bean:write name="hblVO" property="cust_ref_no" filter="false" />]]></cust_ref_no>
		<item_no><![CDATA[<bean:write name="hblVO" property="item_no" filter="false" />]]></item_no>
		<!-- #3376 [JTC] Japan Trust 용 Profit Report 개발 -->
		<lane_cd><![CDATA[<bean:write name="hblVO" property="lane_cd" filter="false" />]]></lane_cd>
		<svc_lane_nm><![CDATA[<bean:write name="hblVO" property="svc_lane_nm" filter="false" />]]></svc_lane_nm>
		<certi_hndl_info><![CDATA[<bean:write name="hblVO" property="certi_hndl_info" filter="false" />]]></certi_hndl_info>			
		</DATA>
	</logic:notEmpty>
</logic:empty>
