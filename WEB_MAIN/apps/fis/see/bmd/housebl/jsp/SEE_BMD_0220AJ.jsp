<%--
=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
=========================================================
=========================================================
*@FileName   : SEE_BMD_0220AJ.jsp
*@FileTitle  :  
*@Description: 
*@author     :  
*@version    : 1.0 - 03/18/2016
*@since      : 03/18/2016

*@Change history:
=========================================================
--%>
<%@ page contentType="text/xml; charset=UTF-8"%>
<%@include file="./../../../../../../syscommon/header/CLTGSHeader.jsp"%>
<logic:empty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
	<logic:notEmpty name="EventResponse" property="objVal">
		<bean:define id="hblVO"   name="EventResponse" property="objVal"/>
    	<bean:define id="valMap"  name="EventResponse" property="mapVal"/>
    	<bean:define id="officeInfo" name="valMap" property="officeInfo"/>
        <bean:define id="ofcVO" name="officeInfo"/>
		<DATA>
			<bl_sts_cd><![CDATA[<bean:write name="hblVO"  property="bl_sts_cd"  filter="false" />]]></bl_sts_cd>
			<intg_bl_seq><![CDATA[<bean:write name="hblVO" property="intg_bl_seq" filter="false" />]]></intg_bl_seq>
			<f_intg_bl_seq><![CDATA[<bean:write name="valMap" property="f_intg_bl_seq" filter="false" />]]></f_intg_bl_seq>
			<bl_no><![CDATA[<bean:write name="hblVO" property="bl_no" filter="false" />]]></bl_no>
			<hbl_no><![CDATA[<bean:write name="hblVO" property="hbl_no" filter="false" />]]></hbl_no>
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
			<mrn><![CDATA[<bean:write name="hblVO" property="mrn" filter="false" />]]></mrn>
			<doc_recpt_no><![CDATA[<bean:write name="hblVO" property="doc_recpt_no" filter="false" />]]></doc_recpt_no>
			
			
			<sub_mbl_flg><![CDATA[<bean:write name="hblVO" property="sub_mbl_flg" filter="false" />]]></sub_mbl_flg>
			<lc_no><![CDATA[<bean:write name="hblVO" property="lc_no" filter="false" />]]></lc_no>
			<inv_no><![CDATA[<bean:write name="hblVO" property="inv_no" filter="false" />]]></inv_no>
			<cust_ref_no><![CDATA[<bean:write name="hblVO" property="cust_ref_no" filter="false" />]]></cust_ref_no>
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
			
			<act_shp_info><![CDATA[<bean:write name="hblVO" property="act_shp_info"  filter="false" />]]></act_shp_info>
			
			<exp_ref_no><![CDATA[<bean:write name="hblVO" property="exp_ref_no"  filter="false" />]]></exp_ref_no>
			
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
			
			<wh_recp_no><![CDATA[<bean:write name="hblVO" property="wh_recp_no" filter="false" />]]></wh_recp_no>
			<agent_rt><![CDATA[<bean:write name="hblVO" property="agent_rt" filter="false" />]]></agent_rt>
			<agent_amt><![CDATA[<bean:write name="hblVO" property="agent_amt" filter="false" />]]></agent_amt>
			
			<cust_rt><![CDATA[<bean:write name="hblVO" property="cust_rt" filter="false" />]]></cust_rt>
			<cust_amt><![CDATA[<bean:write name="hblVO" property="cust_amt" filter="false" />]]></cust_amt>
			
			<frt_term_a_cd><![CDATA[<bean:write name="hblVO" property="frt_term_a_cd"  filter="false" />]]></frt_term_a_cd>
			<frt_term_c_cd><![CDATA[<bean:write name="hblVO" property="frt_term_c_cd"  filter="false" />]]></frt_term_c_cd>
			<fm_svc_term_cd><![CDATA[<bean:write name="hblVO" property="fm_svc_term_cd"  filter="false" />]]></fm_svc_term_cd>
			<to_svc_term_cd><![CDATA[<bean:write name="hblVO" property="to_svc_term_cd"  filter="false" />]]></to_svc_term_cd>
			<profit_share><![CDATA[<bean:write name="hblVO" property="profit_share" filter="false" />]]></profit_share>
			<express_tp_cd><![CDATA[<bean:write name="hblVO" property="express_tp_cd"  filter="false" />]]></express_tp_cd>
			<cargo_tp_cd><![CDATA[<bean:write name="hblVO" property="cargo_tp_cd"  filter="false" />]]></cargo_tp_cd>
			<nomi_flg><![CDATA[<bean:write name="hblVO" property="nomi_flg"  filter="false" />]]></nomi_flg>
			<shp_tp_cd><![CDATA[<bean:write name="hblVO" property="shp_tp_cd"  filter="false" />]]></shp_tp_cd>
			<wh_cut_off_dt><![CDATA[<wrt:write name="hblVO" property="wh_cut_off_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></wh_cut_off_dt>
			<wh_cut_off_tm><![CDATA[<wrt:write name="hblVO" property="wh_cut_off_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm" filter="false" />]]></wh_cut_off_tm>
			
			
			
			
			<bkg_dt_tm><![CDATA[<wrt:write name="hblVO" property="bkg_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></bkg_dt_tm>
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
			<carr_trdp_cd><![CDATA[<bean:write name="hblVO" property="carr_trdp_cd" filter="false" />]]></carr_trdp_cd>
			<carr_trdp_nm><![CDATA[<bean:write name="hblVO" property="carr_trdp_nm" filter="false" />]]></carr_trdp_nm>
			<mk_txt><![CDATA[<bean:write name="hblVO" property="mk_txt"  filter="false" />]]></mk_txt>
			<desc_txt1><![CDATA[<bean:write name="hblVO" property="desc_txt1"  filter="false" />]]></desc_txt1>
			<desc_txt><![CDATA[<bean:write name="hblVO" property="desc_txt"  filter="false" />]]></desc_txt>
			<exp_frt_desc><![CDATA[<bean:write name="hblVO" property="exp_frt_desc"  filter="false" />]]></exp_frt_desc>
			<clean_on_board><![CDATA[<bean:write name="hblVO" property="clean_on_board" filter="false" />]]></clean_on_board>
			<wgt_disp_cd><![CDATA[<bean:write name="hblVO" property="wgt_disp_cd"  filter="false" />]]></wgt_disp_cd>
			<rmk><![CDATA[<bean:write name="hblVO" property="rmk"  filter="false" />]]></rmk>
			<mrn_no><![CDATA[<bean:write name="hblVO" property="mrn_no"  filter="false" />]]></mrn_no>
			
			
			
			
			
		</DATA>
	</logic:notEmpty>    
</logic:empty>
