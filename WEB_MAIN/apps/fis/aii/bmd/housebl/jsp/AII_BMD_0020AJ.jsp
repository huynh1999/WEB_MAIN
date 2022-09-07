<%--
=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
=========================================================
=========================================================
*@FileName   : ACC_INV_0010AJ.jsp
*@FileTitle  : A/R Entry
*@Description: 
*@author     : TinLuong - Dou
*@version    : 1.0 - 05/12/2014
*@since      : 05/12/2014

*@Change history:
=========================================================
--%>
<%@ page contentType="text/xml; charset=UTF-8"%>
<%@page pageEncoding="UTF-8"%>
<%@include file="./../../../../../../syscommon/header/CLTGSHeader.jsp"%>
<logic:empty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
	<logic:notEmpty name="EventResponse" property="objVal">
		<bean:define id="blinfoVO"   name="EventResponse" property="objVal"/>
		<bean:define id="valMap"  	 name="EventResponse" property="mapVal"/>
		<bean:define id="hblVO"   name="EventResponse" property="objVal"/>
    	<bean:define id="officeInfo" name="valMap" property="officeInfo"/>
        <bean:define id="ofcVO" name="officeInfo"/>
		<DATA>
			<bl_sts_cd><![CDATA[<bean:write name="hblVO"  property="bl_sts_cd" filter="false" />]]></bl_sts_cd>
			<intg_bl_seq><![CDATA[<bean:write name="hblVO"  property="intg_bl_seq" filter="false" />]]></intg_bl_seq>
			<f_intg_bl_seq><![CDATA[<bean:write name="valMap" property="f_intg_bl_seq" filter="false" />]]></f_intg_bl_seq>
			<bl_no><![CDATA[<bean:write name="hblVO" property="bl_no" filter="false" />]]></bl_no>
			<dflt_an_memo><![CDATA[<bean:write name="ofcVO" property="dflt_an_memo" filter="false" />]]></dflt_an_memo>
			<mbl_curr_cd><![CDATA[<bean:write name="hblVO" property="mbl_curr_cd" filter="false" />]]></mbl_curr_cd>
			<f_isNumSep><![CDATA[<bean:write name="valMap" property="f_isNumSep" filter="false" />]]></f_isNumSep>
			<f_bl_no><![CDATA[<bean:write name="valMap" property="f_bl_no" filter="false" />]]></f_bl_no>
			<bl_sts_label><![CDATA[<bean:write name="hblVO" property="bl_sts_label" filter="false" />]]></bl_sts_label>
			<frt_term_cd><![CDATA[<bean:write name="hblVO" property="frt_term_cd" filter="false" />]]></frt_term_cd>
			
			<hbl_tp_cd><![CDATA[<bean:write name="hblVO" property="hbl_tp_cd"  filter="false" />]]></hbl_tp_cd>
			<post_dt><![CDATA[<wrt:write name="hblVO" property="post_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></post_dt>
			<ams_no><![CDATA[<bean:write name="hblVO" property="ams_no" filter="false" />]]></ams_no>
			<isf_no><![CDATA[<bean:write name="hblVO" property="isf_no" filter="false" />]]></isf_no>
			<bl_ser_no><![CDATA[<bean:write name="hblVO" property="bl_ser_no" filter="false" />]]></bl_ser_no>
			<ref_no><![CDATA[<bean:write name="hblVO" property="ref_no" filter="false" />]]></ref_no>
			<ref_ofc_cd><![CDATA[<bean:write name="hblVO" property="ref_ofc_cd" filter="false" />]]></ref_ofc_cd>
			<rlt_intg_bl_seq><![CDATA[<bean:write name="hblVO" property="rlt_intg_bl_seq" filter="false" />]]></rlt_intg_bl_seq>
			<mbl_no><![CDATA[<bean:write name="hblVO" property="mbl_no" filter="false" />]]></mbl_no>
			<cust_ref_no><![CDATA[<bean:write name="hblVO" property="cust_ref_no" filter="false" />]]></cust_ref_no>
			<prnr_ref_no><![CDATA[<bean:write name="hblVO" property="prnr_ref_no" filter="false" />]]></prnr_ref_no>
			<jb_tmplt_nm><![CDATA[<bean:write name="hblVO" property="jb_tmplt_nm" filter="false" />]]></jb_tmplt_nm>
			<jb_tmplt_seq><![CDATA[<bean:write name="hblVO" property="jb_tmplt_seq" filter="false" />]]></jb_tmplt_seq>
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
			<cust_trdp_cd><![CDATA[<bean:write name="hblVO" property="cust_trdp_cd" filter="false" />]]></cust_trdp_cd>
			<cust_trdp_nm><![CDATA[<bean:write name="hblVO" property="cust_trdp_nm" filter="false" />]]></cust_trdp_nm>
			<cust_trdp_addr><![CDATA[<bean:write name="hblVO" property="cust_trdp_addr"  filter="false" />]]></cust_trdp_addr>
			<act_shpr_trdp_cd><![CDATA[<bean:write name="hblVO" property="act_shpr_trdp_cd" filter="false" />]]></act_shpr_trdp_cd>
			<act_shpr_trdp_nm><![CDATA[<bean:write name="hblVO" property="act_shpr_trdp_nm" filter="false" />]]></act_shpr_trdp_nm>
			<act_shp_info><![CDATA[<bean:write name="hblVO" property="act_shp_info"  filter="false" />]]></act_shp_info>
			<third_trdp_cd><![CDATA[<bean:write name="hblVO" property="third_trdp_cd" filter="false" />]]></third_trdp_cd>
			<third_trdp_nm><![CDATA[<bean:write name="hblVO" property="third_trdp_nm" filter="false" />]]></third_trdp_nm>
			<third_trdp_addr><![CDATA[<bean:write name="hblVO" property="third_trdp_addr" filter="false" />]]></third_trdp_addr>
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
			<f_eta_dt_tm><![CDATA[<wrt:write name="hblVO" property="f_eta_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></f_eta_dt_tm>
			<f_eta_tm><![CDATA[<wrt:write name="hblVO" property="f_eta_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm" filter="false" />]]></f_eta_tm>
			<pol_cd><![CDATA[<bean:write name="hblVO" property="pol_cd" filter="false" />]]></pol_cd>
			<pol_nm><![CDATA[<bean:write name="hblVO" property="pol_nm" filter="false" />]]></pol_nm>
			<pol_nod_cd><![CDATA[<bean:write name="hblVO" property="pol_nod_cd" filter="false" />]]></pol_nod_cd>
			<ts1_port_cd><![CDATA[<bean:write name="hblVO" property="ts1_port_cd" filter="false" />]]></ts1_port_cd>
			<ts1_flt_no><![CDATA[<bean:write name="hblVO" property="ts1_flt_no" filter="false" />]]></ts1_flt_no>
			<ts2_port_cd><![CDATA[<bean:write name="hblVO" property="ts2_port_cd" filter="false" />]]></ts2_port_cd>
			<ts2_flt_no><![CDATA[<bean:write name="hblVO" property="ts2_flt_no" filter="false" />]]></ts2_flt_no>
			<ts3_port_cd><![CDATA[<bean:write name="hblVO" property="ts3_port_cd" filter="false" />]]></ts3_port_cd>
			<ts3_flt_no><![CDATA[<bean:write name="hblVO" property="ts3_flt_no" filter="false" />]]></ts3_flt_no>
			<pod_cd><![CDATA[<bean:write name="hblVO" property="pod_cd" filter="false" />]]></pod_cd>
			<pod_nm><![CDATA[<bean:write name="hblVO" property="pod_nm" filter="false" />]]></pod_nm>
			<pod_nod_cd><![CDATA[<bean:write name="hblVO" property="pod_nod_cd" filter="false" />]]></pod_nod_cd>
			<fnl_dest_loc_cd><![CDATA[<bean:write name="hblVO" property="fnl_dest_loc_cd" filter="false" />]]></fnl_dest_loc_cd>
			<fnl_dest_loc_nm><![CDATA[<bean:write name="hblVO" property="fnl_dest_loc_nm" filter="false" />]]></fnl_dest_loc_nm>
			<door_loc_cd><![CDATA[<bean:write name="hblVO" property="door_loc_cd" filter="false" />]]></door_loc_cd>
			<door_loc_nm><![CDATA[<bean:write name="hblVO" property="door_loc_nm" filter="false" />]]></door_loc_nm>
			<cfs_trdp_cd><![CDATA[<bean:write name="hblVO" property="cfs_trdp_cd" filter="false" />]]></cfs_trdp_cd>
			<cfs_trdp_nm><![CDATA[<bean:write name="hblVO" property="cfs_trdp_nm" filter="false" />]]></cfs_trdp_nm>
			<cfs_nod_cd><![CDATA[<bean:write name="hblVO" property="cfs_nod_cd" filter="false" />]]></cfs_nod_cd>
			<cfs_loc_nm><![CDATA[<bean:write name="hblVO" property="cfs_loc_nm" filter="false" />]]></cfs_loc_nm>
			<cfs_loc_cd><![CDATA[<bean:write name="hblVO" property="cfs_loc_cd" filter="false" />]]></cfs_loc_cd>
			<sto_start_dt><![CDATA[<wrt:write name="hblVO" property="sto_start_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></sto_start_dt>
			<go_dt_tm><![CDATA[<wrt:write name="hblVO" property="go_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></go_dt_tm>
			<foreign_dest><![CDATA[<bean:write name="hblVO" property="foreign_dest" filter="false" />]]></foreign_dest>
			<wh_arrv_dt_tm><![CDATA[<wrt:write name="hblVO" property="wh_arrv_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></wh_arrv_dt_tm>
			<wh_arrv_tm><![CDATA[<wrt:write name="hblVO" property="wh_arrv_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm" filter="false" />]]></wh_arrv_tm>
			<doc_pkup_on_dt_tm><![CDATA[<wrt:write name="hblVO" property="doc_pkup_on_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></doc_pkup_on_dt_tm>
			<doc_pkup_on_tm><![CDATA[<wrt:write name="hblVO" property="doc_pkup_on_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm" filter="false" />]]></doc_pkup_on_tm>
			<doc_pkup_by><![CDATA[<bean:write name="hblVO" property="doc_pkup_by" filter="false" />]]></doc_pkup_by>
			<cgo_rlsd_on_dt_tm><![CDATA[<wrt:write name="hblVO" property="cgo_rlsd_on_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></cgo_rlsd_on_dt_tm>
			<cgo_rlsd_on_tm><![CDATA[<wrt:write name="hblVO" property="cgo_rlsd_on_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm" filter="false" />]]></cgo_rlsd_on_tm>
			<cgo_rlsd_to><![CDATA[<bean:write name="hblVO" property="cgo_rlsd_to" filter="false" />]]></cgo_rlsd_to>
			<rep_cmdt_cd><![CDATA[<bean:write name="hblVO" property="rep_cmdt_cd" filter="false" />]]></rep_cmdt_cd>
			<rep_cmdt_nm><![CDATA[<bean:write name="hblVO" property="rep_cmdt_nm" filter="false" />]]></rep_cmdt_nm>
			<pck_qty><![CDATA[<bean:write name="hblVO" property="pck_qty" filter="false" />]]></pck_qty>
			<pck_ut_cd><![CDATA[<bean:write name="hblVO" property="pck_ut_cd" filter="false" />]]></pck_ut_cd>
			<inco_cd><![CDATA[<bean:write name="hblVO" property="inco_cd"  filter="false" />]]></inco_cd>
			<grs_wgt><![CDATA[<bean:write name="hblVO" property="grs_wgt" filter="false" />]]></grs_wgt>
			<grs_wgt1><![CDATA[<bean:write name="hblVO" property="grs_wgt1" filter="false" />]]></grs_wgt1>
			<chg_wgt><![CDATA[<bean:write name="hblVO" property="chg_wgt" filter="false" />]]></chg_wgt>
			<chg_wgt1><![CDATA[<bean:write name="hblVO" property="chg_wgt1" filter="false" />]]></chg_wgt1>
			<curr_cd><![CDATA[<bean:write name="hblVO" property="curr_cd"  filter="false" />]]></curr_cd>
			<frt_term_cd><![CDATA[<bean:write name="hblVO" property="frt_term_cd"  filter="false" />]]></frt_term_cd>
			<size_ut_cd><![CDATA[<bean:write name="hblVO" property="size_ut_cd" filter="false" />]]></size_ut_cd>
			<wh_recp_no><![CDATA[<bean:write name="hblVO" property="wh_recp_no" filter="false" />]]></wh_recp_no>
			<srd_flg><![CDATA[<bean:write name="hblVO" property="srd_flg"  filter="false" />]]></srd_flg>
			<nomi_flg><![CDATA[<bean:write name="hblVO" property="nomi_flg"  filter="false" />]]></nomi_flg>
			<shp_tp_cd><![CDATA[<bean:write name="hblVO" property="shp_tp_cd"  filter="false" />]]></shp_tp_cd>
			<bl_iss_dt><![CDATA[<wrt:write name="hblVO" property="bl_iss_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></bl_iss_dt>
			<issued_by><![CDATA[<bean:write name="hblVO" property="issued_by" filter="false" />]]></issued_by>
			<proc_usrnm><![CDATA[<bean:write name="hblVO" property="proc_usrnm" filter="false" />]]></proc_usrnm>
			<proc_ofccd><![CDATA[<bean:write name="hblVO" property="proc_ofccd" filter="false" />]]></proc_ofccd>
			<proc_dept_cd><![CDATA[<bean:write name="hblVO" property="proc_dept_cd" filter="false" />]]></proc_dept_cd>
			<sls_ofc_cd><![CDATA[<bean:write name="hblVO" property="sls_ofc_cd" filter="false" />]]></sls_ofc_cd>
			<sls_usrid><![CDATA[<bean:write name="hblVO" property="sls_usrid" filter="false" />]]></sls_usrid>
			<sls_usr_nm><![CDATA[<bean:write name="hblVO" property="sls_usr_nm" filter="false" />]]></sls_usr_nm>
			<sls_dept_cd><![CDATA[<bean:write name="hblVO" property="sls_dept_cd" filter="false" />]]></sls_dept_cd>
			<lc_no><![CDATA[<bean:write name="hblVO" property="lc_no" filter="false" />]]></lc_no>
			<inv_no><![CDATA[<bean:write name="hblVO" property="inv_no" filter="false" />]]></inv_no>
			<po_no><![CDATA[<bean:write name="hblVO" property="po_no" filter="false" />]]></po_no>
			<cnt_cd><![CDATA[<bean:write name="hblVO" property="cnt_cd" filter="false" />]]></cnt_cd>
			<cnt_nm><![CDATA[<bean:write name="hblVO" property="cnt_nm" filter="false" />]]></cnt_nm>
			<trk_trdp_cd><![CDATA[<bean:write name="hblVO" property="trk_trdp_cd" filter="false" />]]></trk_trdp_cd>
			<trk_trdp_nm><![CDATA[<bean:write name="hblVO" property="trk_trdp_nm" filter="false" />]]></trk_trdp_nm>
			<trk_trdp_addr><![CDATA[<bean:write name="hblVO" property="trk_trdp_addr" filter="false" />]]></trk_trdp_addr>
			
			<it_class><![CDATA[<bean:write name="hblVO" property="it_class" filter="false" />]]></it_class>
			<it_no><![CDATA[<bean:write name="hblVO" property="it_no" filter="false" />]]></it_no>
			<te_dt_tm><![CDATA[<wrt:write name="hblVO" property="te_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></te_dt_tm>
			<it_loc><![CDATA[<bean:write name="hblVO" property="it_loc" filter="false" />]]></it_loc>
			<te><![CDATA[<bean:write name="hblVO" property="te" filter="false" />]]></te>
			<bond_carr_cd><![CDATA[<bean:write name="hblVO" property="bond_carr_cd" filter="false" />]]></bond_carr_cd>
			<bond_carr_nm><![CDATA[<bean:write name="hblVO" property="bond_carr_nm" filter="false" />]]></bond_carr_nm>
			<bond_no><![CDATA[<bean:write name="hblVO" property="bond_no" filter="false" />]]></bond_no>
			<goods_at><![CDATA[<bean:write name="hblVO" property="goods_at" filter="false" />]]></goods_at>
			<goods_value><![CDATA[<bean:write name="hblVO" property="goods_value" filter="false" />]]></goods_value>
			<ccn_no><![CDATA[<bean:write name="hblVO" property="ccn_no" filter="false" />]]></ccn_no>
			<ccn_dt><![CDATA[<wrt:write name="hblVO" property="ccn_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></ccn_dt>
			<pre_ccn_no><![CDATA[<bean:write name="hblVO" property="pre_ccn_no" filter="false" />]]></pre_ccn_no>
			<mnf_fr_loc><![CDATA[<bean:write name="hblVO" property="mnf_fr_loc" filter="false" />]]></mnf_fr_loc>
			<mnf_to_loc><![CDATA[<bean:write name="hblVO" property="mnf_to_loc" filter="false" />]]></mnf_to_loc>
			<mk_txt><![CDATA[<bean:write name="hblVO" property="mk_txt"  filter="false" />]]></mk_txt>
			<desc_txt><![CDATA[<bean:write name="hblVO" property="desc_txt"  filter="false" />]]></desc_txt>
			<rmk><![CDATA[<bean:write name="hblVO" property="rmk"  filter="false" />]]></rmk>
			<att_mk_txt><![CDATA[<bean:write name="hblVO" property="att_mk_txt"  filter="false" />]]></att_mk_txt> <!-- #1572 [CARGOZONE] AIH ENTRY - AUTHORITY TO MAKE ENTRY REMARK MAPPING ERROR -->
			<desc_txt1><![CDATA[<bean:write name="hblVO" property="desc_txt1"  filter="false" />]]></desc_txt1>
			<ctrb_ofc_cd><![CDATA[<bean:write name="hblVO" property="ctrb_ofc_cd" filter="false" />]]></ctrb_ofc_cd>
			<ctrb_dept_cd><![CDATA[<bean:write name="hblVO" property="ctrb_dept_cd" filter="false" />]]></ctrb_dept_cd>
			<ctrb_ratio_yn><![CDATA[<bean:write name="hblVO" property="ctrb_ratio_yn" filter="false" />]]></ctrb_ratio_yn>
			<ctrb_mgn><![CDATA[<bean:write name="hblVO" property="ctrb_mgn" filter="false" />]]></ctrb_mgn>
			
			<!-- #399 [BNXON, Common] Available date is not shown on Air Import Arival Notice -->
			<avail_dt_tm><![CDATA[<bean:write name="hblVO" property="avail_dt_tm" filter="false" />]]></avail_dt_tm>
			<ucr_no><![CDATA[<bean:write name="hblVO" property="ucr_no" filter="false" />]]></ucr_no>
			<mrn_no><![CDATA[<bean:write name="hblVO" property="mrn_no" filter="false" />]]></mrn_no>
			<eta_fpoe_tm><![CDATA[<wrt:write name="hblVO" property="eta_fpoe_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></eta_fpoe_tm>
			<fpoe_tm><![CDATA[<wrt:write name="hblVO" property="fpoe_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm" filter="false" />]]></fpoe_tm>
			<!-- #1041 [BNX Vietnam] A/R Entry does not show any information from AIH -->
			<agent_trdp_cd><![CDATA[<bean:write name="hblVO" property="agent_trdp_cd" filter="false" />]]></agent_trdp_cd>
			<agent_trdp_nm><![CDATA[<bean:write name="hblVO" property="agent_trdp_nm" filter="false" />]]></agent_trdp_nm>
			<agent_trdp_addr><![CDATA[<bean:write name="hblVO" property="agent_trdp_addr" filter="false" />]]></agent_trdp_addr>
			<!-- #657 [OCEAN BLUE, IMPEX] B/L SELECTION FLAG TO SHOW ON VISIBILITY PORTAL -->
			<inter_use_flag><![CDATA[<bean:write name="hblVO" property="inter_use_flag" filter="false" />]]></inter_use_flag>
			<f_modify><![CDATA[<bean:write name="valMap" property="f_modify" filter="false" />]]></f_modify> <!--#428 [ZEN] AFTER AR/AP/DC CREATION, FILING # SHOULD BE NOT UPDATED  -->
			<!-- #3376 [JTC] Japan Trust 용 Profit Report 개발 -->
			<lane_cd><![CDATA[<bean:write name="hblVO" property="lane_cd" filter="false" />]]></lane_cd>
			<svc_lane_nm><![CDATA[<bean:write name="hblVO" property="svc_lane_nm" filter="false" />]]></svc_lane_nm>				
		</DATA>
	</logic:notEmpty>    
</logic:empty>
