<%--
=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
=========================================================
=========================================================
*@FileName   : SEE_BMD_0200AJ.jsp
*@FileTitle  : Booking Entry URL Copy
*@Description: 
*@author     : Tan.Duong - Dou
*@version    : 1.0 - 9/12/2014
*@since      : 05/12/2014

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
			<bkg_seq><![CDATA[<bean:write name="hblVO"  property="bkg_seq"  filter="false" />]]></bkg_seq>
			<f_bkg_seq><![CDATA[<bean:write name="valMap" property="f_bkg_seq" filter="false" />]]></f_bkg_seq>
			<ooh_bkg_rmk><![CDATA[<bean:write name="ofcVO" property="ooh_bkg_rmk" filter="false" />]]></ooh_bkg_rmk>
			<f_bkg_no><![CDATA[<bean:write name="valMap" property="f_bkg_no" filter="false" />]]></f_bkg_no>
			<bkg_sts_cd><![CDATA[<bean:write name="hblVO"  property="bkg_sts_cd"  filter="false" />]]></bkg_sts_cd>
			<bkg_no><![CDATA[<bean:write name="hblVO" property="bkg_no" filter="false" />]]></bkg_no>
			<bkg_dt_tm><![CDATA[<wrt:write name="hblVO" property="bkg_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></bkg_dt_tm>
			<bl_no><![CDATA[<bean:write name="hblVO" property="bl_no" filter="false" />]]></bl_no>
			<po_no><![CDATA[<bean:write name="hblVO" property="po_no" filter="false" />]]></po_no>
			<lc_no><![CDATA[<bean:write name="hblVO" property="lc_no" filter="false" />]]></lc_no>
			<prnr_trdp_cd><![CDATA[<bean:write name="hblVO" property="prnr_trdp_cd" filter="false" />]]></prnr_trdp_cd>
			<prnr_trdp_nm><![CDATA[<bean:write name="hblVO" property="prnr_trdp_nm"  filter="false" />]]></prnr_trdp_nm>
			<prnr_trdp_addr><![CDATA[<bean:write name="hblVO" property="prnr_trdp_addr"  filter="false" />]]></prnr_trdp_addr>
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
			<exp_ref_no><![CDATA[<bean:write name="hblVO" property="exp_ref_no"  filter="false" />]]></exp_ref_no>
			<pu_trdp_cd><![CDATA[<bean:write name="hblVO" property="pu_trdp_cd" filter="false" />]]></pu_trdp_cd>
			<pu_trdp_nm><![CDATA[<bean:write name="hblVO" property="pu_trdp_nm" filter="false" />]]></pu_trdp_nm>
			<cgo_pu_trdp_cd><![CDATA[<bean:write name="hblVO" property="cgo_pu_trdp_cd" filter="false" />]]></cgo_pu_trdp_cd>
			<cgo_pu_trdp_nm><![CDATA[<bean:write name="hblVO" property="cgo_pu_trdp_nm" filter="false" />]]></cgo_pu_trdp_nm>
			<cgo_pu_trdp_addr><![CDATA[<bean:write name="hblVO" property="cgo_pu_trdp_addr" filter="false" />]]></cgo_pu_trdp_addr>
			<rcv_wh_cd><![CDATA[<bean:write name="hblVO" property="rcv_wh_cd" filter="false" />]]></rcv_wh_cd>
			<rcv_wh_nm><![CDATA[<bean:write name="hblVO" property="rcv_wh_nm" filter="false" />]]></rcv_wh_nm>
			<trk_trdp_cd><![CDATA[<bean:write name="hblVO" property="trk_trdp_cd" filter="false" />]]></trk_trdp_cd>
			<trk_trdp_nm><![CDATA[<bean:write name="hblVO" property="trk_trdp_nm" filter="false" />]]></trk_trdp_nm>
			<cust_ref_no><![CDATA[<bean:write name="hblVO" property="cust_ref_no" filter="false" />]]></cust_ref_no>
			<cntr_info><![CDATA[<bean:write name="hblVO" property="cntr_info"  filter="false" />]]></cntr_info>
			<trnk_vsl_cd><![CDATA[<bean:write name="hblVO" property="trnk_vsl_cd" filter="false" />]]></trnk_vsl_cd>
			<trnk_vsl_nm><![CDATA[<bean:write name="hblVO" property="trnk_vsl_nm" filter="false" />]]></trnk_vsl_nm>
			<trnk_voy><![CDATA[<bean:write name="hblVO" property="trnk_voy" filter="false" />]]></trnk_voy>
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
			<lnr_bkg_no><![CDATA[<bean:write name="hblVO" property="lnr_bkg_no" filter="false" />]]></lnr_bkg_no>
			<etd_dt_tm><![CDATA[<wrt:write name="hblVO" property="etd_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></etd_dt_tm>
			<eta_dt_tm><![CDATA[<wrt:write name="hblVO" property="eta_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></eta_dt_tm>
			<etd_por_tm><![CDATA[<wrt:write name="hblVO" property="etd_por_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></etd_por_tm>
			<shp_mod_cd><![CDATA[<bean:write name="hblVO" property="shp_mod_cd" filter="false" />]]></shp_mod_cd>
			<rep_cmdt_cd><![CDATA[<bean:write name="hblVO" property="rep_cmdt_cd" filter="false" />]]></rep_cmdt_cd>
			<rep_cmdt_nm><![CDATA[<bean:write name="hblVO" property="rep_cmdt_nm" filter="false" />]]></rep_cmdt_nm>
			<pck_qty><![CDATA[<bean:write name="hblVO" property="pck_qty" filter="false" />]]></pck_qty>
			<pck_ut_cd><![CDATA[<bean:write name="hblVO" property="pck_ut_cd" filter="false" />]]></pck_ut_cd>
			<grs_wgt><![CDATA[<bean:write name="hblVO" property="grs_wgt" filter="false" />]]></grs_wgt>
			<grs_wgt1><![CDATA[<bean:write name="hblVO" property="grs_wgt1" filter="false" />]]></grs_wgt1>
			<meas><![CDATA[<bean:write name="hblVO" property="meas" filter="false" />]]></meas>
			<meas1><![CDATA[<bean:write name="hblVO" property="meas1" filter="false" />]]></meas1>
			<fm_svc_term_cd><![CDATA[<bean:write name="hblVO" property="fm_svc_term_cd" filter="false" />]]></fm_svc_term_cd>
			<to_svc_term_cd><![CDATA[<bean:write name="hblVO" property="to_svc_term_cd" filter="false" />]]></to_svc_term_cd>
			<cargo_tp_cd><![CDATA[<bean:write name="hblVO" property="cargo_tp_cd" filter="false" />]]></cargo_tp_cd>
			<port_open_dt><![CDATA[<wrt:write name="hblVO" property="port_open_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></port_open_dt>
			<port_open_tm><![CDATA[<wrt:write name="hblVO" property="port_open_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm" filter="false" />]]></port_open_tm>
			<cut_off_dt><![CDATA[<wrt:write name="hblVO" property="cut_off_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></cut_off_dt>
			<cut_off_tm><![CDATA[<wrt:write name="hblVO" property="cut_off_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm" filter="false" />]]></cut_off_tm>
			<rail_cut_off_dt><![CDATA[<wrt:write name="hblVO" property="rail_cut_off_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></rail_cut_off_dt>
			<rail_cut_off_tm><![CDATA[<wrt:write name="hblVO" property="rail_cut_off_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm" filter="false" />]]></rail_cut_off_tm>
			<wh_cut_off_dt><![CDATA[<wrt:write name="hblVO" property="wh_cut_off_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></wh_cut_off_dt>
			<wh_cut_off_tm><![CDATA[<wrt:write name="hblVO" property="wh_cut_off_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm" filter="false" />]]></wh_cut_off_tm>
			<doc_cut_off_dt><![CDATA[<wrt:write name="hblVO" property="doc_cut_off_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></doc_cut_off_dt>
			<doc_cut_off_tm><![CDATA[<wrt:write name="hblVO" property="doc_cut_off_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm" filter="false" />]]></doc_cut_off_tm>
			<vgm_cut_off_dt><![CDATA[<wrt:write name="hblVO" property="vgm_cut_off_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></vgm_cut_off_dt>
			<vgm_cut_off_tm><![CDATA[<wrt:write name="hblVO" property="vgm_cut_off_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm" filter="false" />]]></vgm_cut_off_tm>
			<sls_ofc_cd><![CDATA[<bean:write name="hblVO" property="sls_ofc_cd" filter="false" />]]></sls_ofc_cd>
			<sls_usrid><![CDATA[<bean:write name="hblVO" property="sls_usrid" filter="false" />]]></sls_usrid>
			<sls_usr_nm><![CDATA[<bean:write name="hblVO" property="sls_usr_nm" filter="false" />]]></sls_usr_nm>
			<sls_dept_cd><![CDATA[<bean:write name="hblVO" property="sls_dept_cd" filter="false" />]]></sls_dept_cd>
			<rmk><![CDATA[<bean:write name="hblVO" property="rmk" filter="false" />]]></rmk>
			<rsn_txt><![CDATA[<bean:write name="hblVO" property="rsn_txt" filter="false" />]]></rsn_txt>
			<lnr_ctrt_no><![CDATA[<bean:write name="hblVO" property="lnr_ctrt_no" filter="false" />]]></lnr_ctrt_no>
   			<frt_term_cd><![CDATA[<bean:write name="hblVO" property="frt_term_cd" filter="false" />]]></frt_term_cd>
   			<intg_bl_seq><![CDATA[<bean:write name="hblVO" property="intg_bl_seq" filter="false" />]]></intg_bl_seq>
   			<!-- #1024 [PATENT] Booking Entry 개선 및 Quotation Audit 기능 개발  -->
   			<hbl_tp_cd><![CDATA[<bean:write name="hblVO" property="hbl_tp_cd" filter="false" />]]></hbl_tp_cd>
   			<nomi_flg><![CDATA[<bean:write name="hblVO" property="nomi_flg" filter="false" />]]></nomi_flg>
   			<modi_usrid><![CDATA[<bean:write name="hblVO" property="modi_usrid" filter="false" />]]></modi_usrid>
   			<modi_tms><![CDATA[<wrt:write name="hblVO" property="modi_tms" formatType="DATE" fromFormat="MMddyyyyHHmmss" format="MM-dd-yyyy HH:mm:ss" filter="false" />]]></modi_tms>
   			<rgst_usrid><![CDATA[<bean:write name="hblVO" property="rgst_usrid" filter="false" />]]></rgst_usrid>
   			<iss_usrid><![CDATA[<bean:write name="hblVO" property="iss_usrid" filter="false" />]]></iss_usrid>
   			<asgn_usrid><![CDATA[<bean:write name="hblVO" property="asgn_usrid" filter="false" />]]></asgn_usrid>
   			<rgst_tms><![CDATA[<wrt:write name="hblVO" property="rgst_tms" formatType="DATE" fromFormat="MMddyyyyHHmmss" format="MM-dd-yyyy HH:mm:ss" filter="false" />]]></rgst_tms>
   			<rgst_ofc_cd><![CDATA[<bean:write name="hblVO" property="rgst_ofc_cd" filter="false" />]]></rgst_ofc_cd>
   			<carrier_bkg_seq><![CDATA[<bean:write name="hblVO" property="carrier_bkg_seq" filter="false" />]]></carrier_bkg_seq>
   			<carrier_bkg_no><![CDATA[<bean:write name="hblVO" property="carrier_bkg_no" filter="false" />]]></carrier_bkg_no>
   			<vndr_trdp_cd><![CDATA[<bean:write name="hblVO" property="vndr_trdp_cd" filter="false" />]]></vndr_trdp_cd>
   			<vndr_trdp_nm><![CDATA[<bean:write name="hblVO" property="vndr_trdp_nm" filter="false" />]]></vndr_trdp_nm>
   			<vndr_trdp_addr><![CDATA[<bean:write name="hblVO" property="vndr_trdp_addr" filter="false" />]]></vndr_trdp_addr>
   			<obl_tp_cd><![CDATA[<bean:write name="hblVO" property="obl_tp_cd" filter="false" />]]></obl_tp_cd>
   			<inter_rmk_txt><![CDATA[<bean:write name="hblVO" property="inter_rmk_txt" filter="false" />]]></inter_rmk_txt>
   			<clp_no><![CDATA[<bean:write name="hblVO" property="clp_no" filter="false" />]]></clp_no>
   			<cust_trdp_cd><![CDATA[<bean:write name="hblVO" property="cust_trdp_cd" filter="false" />]]></cust_trdp_cd>
   			<cust_trdp_nm><![CDATA[<bean:write name="hblVO" property="cust_trdp_nm" filter="false" />]]></cust_trdp_nm>
   			<pre_vsl_cd><![CDATA[<bean:write name="hblVO" property="pre_vsl_cd" filter="false" />]]></pre_vsl_cd>
   			<pre_vsl_nm><![CDATA[<bean:write name="hblVO" property="pre_vsl_nm" filter="false" />]]></pre_vsl_nm>
   			<pre_voy><![CDATA[<bean:write name="hblVO" property="pre_voy" filter="false" />]]></pre_voy>
   			<ts1_port_cd><![CDATA[<bean:write name="hblVO" property="ts1_port_cd" filter="false" />]]></ts1_port_cd>
   			<ts1_port_nm><![CDATA[<bean:write name="hblVO" property="ts1_port_nm" filter="false" />]]></ts1_port_nm>
   			<ts1_eta_dt_tm><![CDATA[<wrt:write name="hblVO" property="ts1_eta_dt_tm" formatType="DATE" fromFormat="yyyyMMdd" format="MM-dd-yyyy" filter="false" />]]></ts1_eta_dt_tm>
   			<ts1_etd_dt_tm><![CDATA[<wrt:write name="hblVO" property="ts1_etd_dt_tm" formatType="DATE" fromFormat="yyyyMMdd" format="MM-dd-yyyy" filter="false" />]]></ts1_etd_dt_tm>
   			<carr_trdp_cd><![CDATA[<bean:write name="hblVO" property="carr_trdp_cd" filter="false" />]]></carr_trdp_cd>
   			<carr_trdp_nm><![CDATA[<bean:write name="hblVO" property="carr_trdp_nm" filter="false" />]]></carr_trdp_nm>   			
   			<cstms_tp_cd><![CDATA[<bean:write name="hblVO" property="cstms_tp_cd" filter="false" />]]></cstms_tp_cd>   			
   			<!-- #2070 [PATENT] Customer Booking Entry 화면 Lane 항목 추가 및 Carrier Booking 연동 -->
   			<svc_lane_nm><![CDATA[<bean:write name="hblVO" property="svc_lane_nm" filter="false" />]]></svc_lane_nm>
			<cstms_cut_off_dt><![CDATA[<wrt:write name="hblVO" property="cstms_cut_off_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></cstms_cut_off_dt>
			<cstms_cut_off_tm><![CDATA[<wrt:write name="hblVO" property="cstms_cut_off_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm" filter="false" />]]></cstms_cut_off_tm>
   			<!-- #2461 [PATENT] Customer Booking 화면에서 House B/L Copy Form 인쇄 -->
   			<mk_txt><![CDATA[<bean:write name="hblVO" property="mk_txt" filter="false" />]]></mk_txt>
   			<desc_txt><![CDATA[<bean:write name="hblVO" property="desc_txt" filter="false" />]]></desc_txt>
   			</DATA>
	</logic:notEmpty>    
</logic:empty>
