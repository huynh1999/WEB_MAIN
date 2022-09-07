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
		<bean:define id="mblVO"   name="EventResponse" property="objVal"/>
		<bean:define id="valMap"  name="EventResponse" property="mapVal"/>
    	<bean:define id="officeInfo" name="valMap" property="officeInfo"/>
        <bean:define id="ofcVO" name="officeInfo"/>
		<DATA>
			<f_bkg_no><![CDATA[<bean:write name="valMap" property="f_bkg_no" filter="false" />]]></f_bkg_no>
			<f_bkg_seq><![CDATA[<bean:write name="valMap" property="f_bkg_seq" filter="false" />]]></f_bkg_seq>
			<f_lnr_bkg_no><![CDATA[<bean:write name="valMap" property="f_lnr_bkg_no" filter="false" />]]></f_lnr_bkg_no>
			<bkg_sts_cd><![CDATA[<bean:write name="mblVO"  property="bkg_sts_cd"  filter="false" />]]></bkg_sts_cd>
			<bkg_seq><![CDATA[<bean:write name="mblVO"  property="bkg_seq"  filter="false" />]]></bkg_seq>
			<bkg_no><![CDATA[<bean:write name="mblVO" property="bkg_no" filter="false" />]]></bkg_no>
			<lnr_bkg_no><![CDATA[<bean:write name="mblVO" property="lnr_bkg_no" filter="false" />]]></lnr_bkg_no>
			<bkg_dt_tm><![CDATA[<wrt:write name="mblVO" property="bkg_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></bkg_dt_tm>
			<lnr_trdp_cd><![CDATA[<bean:write name="mblVO" property="lnr_trdp_cd" filter="false" />]]></lnr_trdp_cd>
			<lnr_trdp_nm><![CDATA[<bean:write name="mblVO" property="lnr_trdp_nm" filter="false" />]]></lnr_trdp_nm>
			<shpr_trdp_cd><![CDATA[<bean:write name="mblVO" property="shpr_trdp_cd" filter="false" />]]></shpr_trdp_cd>
			<shpr_trdp_nm><![CDATA[<bean:write name="mblVO" property="shpr_trdp_nm" filter="false" />]]></shpr_trdp_nm>
			<shpr_trdp_addr><![CDATA[<bean:write name="mblVO" property="shpr_trdp_addr"  filter="false" />]]></shpr_trdp_addr>
			<shpr_pic_nm><![CDATA[<bean:write name="mblVO" property="shpr_pic_nm"  filter="false" />]]></shpr_pic_nm>
			<shpr_pic_phn><![CDATA[<bean:write name="mblVO" property="shpr_pic_phn"  filter="false" />]]></shpr_pic_phn>
			<cust_ref_no><![CDATA[<bean:write name="mblVO" property="cust_ref_no" filter="false" />]]></cust_ref_no>
			<cnee_trdp_cd><![CDATA[<bean:write name="mblVO" property="cnee_trdp_cd" filter="false" />]]></cnee_trdp_cd>
			<cnee_trdp_nm><![CDATA[<bean:write name="mblVO" property="cnee_trdp_nm" filter="false" />]]></cnee_trdp_nm>
			<cnee_trdp_addr><![CDATA[<bean:write name="mblVO" property="cnee_trdp_addr"  filter="false" />]]></cnee_trdp_addr>
			<cnee_pic_nm><![CDATA[<bean:write name="mblVO" property="cnee_pic_nm"  filter="false" />]]></cnee_pic_nm>
			<cnee_pic_phn><![CDATA[<bean:write name="mblVO" property="cnee_pic_phn"  filter="false" />]]></cnee_pic_phn>
			<ntfy_trdp_cd><![CDATA[<bean:write name="mblVO" property="ntfy_trdp_cd" filter="false" />]]></ntfy_trdp_cd>
			<ntfy_trdp_nm><![CDATA[<bean:write name="mblVO" property="ntfy_trdp_nm" filter="false" />]]></ntfy_trdp_nm>
			<ntfy_trdp_addr><![CDATA[<bean:write name="mblVO" property="ntfy_trdp_addr"  filter="false" />]]></ntfy_trdp_addr>
			<ntfy_pic_nm><![CDATA[<bean:write name="mblVO" property="ntfy_pic_nm"  filter="false" />]]></ntfy_pic_nm>
			<ntfy_pic_phn><![CDATA[<bean:write name="mblVO" property="ntfy_pic_phn"  filter="false" />]]></ntfy_pic_phn>
			<carr_trdp_cd><![CDATA[<bean:write name="mblVO" property="carr_trdp_cd" filter="false" />]]></carr_trdp_cd>
			<carr_trdp_nm><![CDATA[<bean:write name="mblVO" property="carr_trdp_nm" filter="false" />]]></carr_trdp_nm>
			<carr_trdp_addr><![CDATA[<bean:write name="mblVO" property="carr_trdp_addr"  filter="false" />]]></carr_trdp_addr>
			<lnr_ctrt_no><![CDATA[<bean:write name="mblVO" property="lnr_ctrt_no" filter="false" />]]></lnr_ctrt_no>
			<fwrd_agn_trdp_cd><![CDATA[<bean:write name="mblVO" property="fwrd_agn_trdp_cd" filter="false" />]]></fwrd_agn_trdp_cd>
			<fwrd_agn_trdp_nm><![CDATA[<bean:write name="mblVO" property="fwrd_agn_trdp_nm"  filter="false" />]]></fwrd_agn_trdp_nm>
			<fwrd_agn_trdp_addr><![CDATA[<bean:write name="mblVO" property="fwrd_agn_trdp_addr"  filter="false" />]]></fwrd_agn_trdp_addr>
			<prnr_trdp_cd><![CDATA[<bean:write name="mblVO" property="prnr_trdp_cd" filter="false" />]]></prnr_trdp_cd>
			<prnr_trdp_nm><![CDATA[<bean:write name="mblVO" property="prnr_trdp_nm"  filter="false" />]]></prnr_trdp_nm>
			<prnr_trdp_addr><![CDATA[<bean:write name="mblVO" property="prnr_trdp_addr"  filter="false" />]]></prnr_trdp_addr>
			<trnk_vsl_cd><![CDATA[<bean:write name="mblVO" property="trnk_vsl_cd" filter="false" />]]></trnk_vsl_cd>
			<trnk_vsl_nm><![CDATA[<bean:write name="mblVO" property="trnk_vsl_nm" filter="false" />]]></trnk_vsl_nm>
			<trnk_voy><![CDATA[<bean:write name="mblVO" property="trnk_voy" filter="false" />]]></trnk_voy>
			<por_cd><![CDATA[<bean:write name="mblVO" property="por_cd" filter="false" />]]></por_cd>
			<por_nm><![CDATA[<bean:write name="mblVO" property="por_nm" filter="false" />]]></por_nm>
			<pol_cd><![CDATA[<bean:write name="mblVO" property="pol_cd" filter="false" />]]></pol_cd>
			<pol_nm><![CDATA[<bean:write name="mblVO" property="pol_nm" filter="false" />]]></pol_nm>
			<pod_cd><![CDATA[<bean:write name="mblVO" property="pod_cd" filter="false" />]]></pod_cd>
			<pod_nm><![CDATA[<bean:write name="mblVO" property="pod_nm" filter="false" />]]></pod_nm>
			<del_cd><![CDATA[<bean:write name="mblVO" property="del_cd" filter="false" />]]></del_cd>
			<del_nm><![CDATA[<bean:write name="mblVO" property="del_nm" filter="false" />]]></del_nm>
			<fnl_dest_loc_cd><![CDATA[<bean:write name="mblVO" property="fnl_dest_loc_cd" filter="false" />]]></fnl_dest_loc_cd>
			<fnl_dest_loc_nm><![CDATA[<bean:write name="mblVO" property="fnl_dest_loc_nm" filter="false" />]]></fnl_dest_loc_nm>
			<etd_por_tm><![CDATA[<wrt:write name="mblVO" property="etd_por_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></etd_por_tm>
			<etd_dt_tm><![CDATA[<wrt:write name="mblVO" property="etd_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></etd_dt_tm>
			<eta_dt_tm><![CDATA[<wrt:write name="mblVO" property="eta_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></eta_dt_tm>
			<eta_del_dt_tm><![CDATA[<wrt:write name="mblVO" property="eta_del_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></eta_del_dt_tm>
			<eta_fnl_dest_dt_tm><![CDATA[<wrt:write name="mblVO" property="eta_fnl_dest_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></eta_fnl_dest_dt_tm>
			<rep_cmdt_cd><![CDATA[<bean:write name="mblVO" property="rep_cmdt_cd" filter="false" />]]></rep_cmdt_cd>
			<rep_cmdt_nm><![CDATA[<bean:write name="mblVO" property="rep_cmdt_nm" filter="false" />]]></rep_cmdt_nm>
			<frt_term_cd><![CDATA[<bean:write name="mblVO" property="frt_term_cd" filter="false" />]]></frt_term_cd>
			<pck_qty><![CDATA[<bean:write name="mblVO" property="pck_qty" filter="false" />]]></pck_qty>
			<pck_ut_cd><![CDATA[<bean:write name="mblVO" property="pck_ut_cd" filter="false" />]]></pck_ut_cd>
			<grs_wgt><![CDATA[<bean:write name="mblVO" property="grs_wgt" filter="false" />]]></grs_wgt>
			<grs_wgt1><![CDATA[<bean:write name="mblVO" property="grs_wgt1" filter="false" />]]></grs_wgt1>
			<meas><![CDATA[<bean:write name="mblVO" property="meas" filter="false" />]]></meas>
			<meas1><![CDATA[<bean:write name="mblVO" property="meas1" filter="false" />]]></meas1>
			<fm_svc_term_cd><![CDATA[<bean:write name="mblVO" property="fm_svc_term_cd" filter="false" />]]></fm_svc_term_cd>
			<to_svc_term_cd><![CDATA[<bean:write name="mblVO" property="to_svc_term_cd" filter="false" />]]></to_svc_term_cd>
			<cargo_tp_cd><![CDATA[<bean:write name="mblVO" property="cargo_tp_cd" filter="false" />]]></cargo_tp_cd>
			<cntr_info><![CDATA[<bean:write name="mblVO" property="cntr_info"  filter="false" />]]></cntr_info>
			<rgst_usrid><![CDATA[<bean:write name="mblVO" property="rgst_usrid"  filter="false" />]]></rgst_usrid>
			<rgst_tms><![CDATA[<wrt:write name="mblVO" property="rgst_tms"  filter="false" formatType="DATE" fromFormat="MMddyyyyHHmmss" format="MM-dd-yyyy HH:mm:ss" />]]></rgst_tms>
			<modi_usrid><![CDATA[<bean:write name="mblVO" property="modi_usrid"  filter="false" />]]></modi_usrid>
			<modi_tms><![CDATA[<wrt:write name="mblVO" property="modi_tms" filter="false" formatType="DATE" fromFormat="MMddyyyyHHmmss" format="MM-dd-yyyy HH:mm:ss" />]]></modi_tms>
			<rmk><![CDATA[<bean:write name="mblVO" property="rmk"  filter="false" />]]></rmk>
			<rsn_txt><![CDATA[<bean:write name="mblVO" property="rsn_txt" filter="false" />]]></rsn_txt>
			<svc_lane_nm><![CDATA[<bean:write name="mblVO" property="svc_lane_nm" filter="false" />]]></svc_lane_nm>  <!-- /#943  [PATENT] Lane 및 Port Cut-off time 추가  -->
		    <!-- #1024 [PATENT] Booking Entry 개선 및 Quotation Audit 기능 개발 -->
		    <hbl_tp_cd><![CDATA[<bean:write name="mblVO" property="hbl_tp_cd" filter="false" />]]></hbl_tp_cd>
			<shp_mod_cd><![CDATA[<bean:write name="mblVO" property="shp_mod_cd" filter="false" />]]></shp_mod_cd>
			<nomi_flg><![CDATA[<bean:write name="mblVO" property="nomi_flg" filter="false" />]]></nomi_flg>
			<ref_no><![CDATA[<bean:write name="mblVO" property="ref_no" filter="false" />]]></ref_no>
			<port_open_dt><![CDATA[<wrt:write name="mblVO" property="port_open_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></port_open_dt>
			<port_open_tm><![CDATA[<wrt:write name="mblVO" property="port_open_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm" filter="false" />]]></port_open_tm>
			<cut_off_dt><![CDATA[<wrt:write name="mblVO" property="cut_off_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></cut_off_dt>
			<cut_off_tm><![CDATA[<wrt:write name="mblVO" property="cut_off_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm" filter="false" />]]></cut_off_tm>
			<rail_cut_off_dt><![CDATA[<wrt:write name="mblVO" property="rail_cut_off_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></rail_cut_off_dt>
			<rail_cut_off_tm><![CDATA[<wrt:write name="mblVO" property="rail_cut_off_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm" filter="false" />]]></rail_cut_off_tm>
			<doc_cut_off_dt><![CDATA[<wrt:write name="mblVO" property="doc_cut_off_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></doc_cut_off_dt>
			<doc_cut_off_tm><![CDATA[<wrt:write name="mblVO" property="doc_cut_off_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm" filter="false" />]]></doc_cut_off_tm>
			<vgm_cut_off_dt><![CDATA[<wrt:write name="mblVO" property="vgm_cut_off_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></vgm_cut_off_dt>
			<vgm_cut_off_tm><![CDATA[<wrt:write name="mblVO" property="vgm_cut_off_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm" filter="false" />]]></vgm_cut_off_tm>
			<pu_trdp_cd><![CDATA[<bean:write name="mblVO" property="pu_trdp_cd" filter="false" />]]></pu_trdp_cd>
			<pu_trdp_nm><![CDATA[<bean:write name="mblVO" property="pu_trdp_nm" filter="false" />]]></pu_trdp_nm>
			<rcv_wh_cd><![CDATA[<bean:write name="mblVO" property="rcv_wh_cd" filter="false" />]]></rcv_wh_cd>
			<rcv_wh_nm><![CDATA[<bean:write name="mblVO" property="rcv_wh_nm" filter="false" />]]></rcv_wh_nm>
			<sls_ofc_cd><![CDATA[<bean:write name="mblVO" property="sls_ofc_cd" filter="false" />]]></sls_ofc_cd>
			<sls_usrid><![CDATA[<bean:write name="mblVO" property="sls_usrid" filter="false" />]]></sls_usrid>
			<bl_no><![CDATA[<bean:write name="mblVO" property="bl_no" filter="false" />]]></bl_no>
			<act_shpr_trdp_cd><![CDATA[<bean:write name="mblVO" property="act_shpr_trdp_cd" filter="false" />]]></act_shpr_trdp_cd>
			<act_shpr_trdp_nm><![CDATA[<bean:write name="mblVO" property="act_shpr_trdp_nm" filter="false" />]]></act_shpr_trdp_nm>
			<obl_tp_cd><![CDATA[<bean:write name="mblVO" property="obl_tp_cd" filter="false" />]]></obl_tp_cd>
			<asgn_usrid><![CDATA[<bean:write name="mblVO" property="asgn_usrid" filter="false" />]]></asgn_usrid>
			<cstms_cut_off_dt><![CDATA[<wrt:write name="mblVO" property="cstms_cut_off_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></cstms_cut_off_dt>
			<cstms_cut_off_tm><![CDATA[<wrt:write name="mblVO" property="cstms_cut_off_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm" filter="false" />]]></cstms_cut_off_tm>
			<trkg_svc_flg><![CDATA[<bean:write name="mblVO" property="trkg_svc_flg" filter="false" />]]></trkg_svc_flg>
			<cstms_svc_flg><![CDATA[<bean:write name="mblVO" property="cstms_svc_flg" filter="false" />]]></cstms_svc_flg>
			<inter_rmk_txt><![CDATA[<bean:write name="mblVO" property="inter_rmk_txt" filter="false" />]]></inter_rmk_txt>
			<iss_loc_cd><![CDATA[<bean:write name="mblVO" property="iss_loc_cd" filter="false" />]]></iss_loc_cd>
			<iss_loc_nm><![CDATA[<bean:write name="mblVO" property="iss_loc_nm" filter="false" />]]></iss_loc_nm>
			<org_bl_qty><![CDATA[<bean:write name="mblVO" property="org_bl_qty" filter="false" />]]></org_bl_qty>
			<cstms_tp_cd><![CDATA[<bean:write name="mblVO" property="cstms_tp_cd" filter="false" />]]></cstms_tp_cd>   
			<!-- #4899 ** [Binex] Carrier Booking Entry to have Customer Ref. No., Export References No., Agent Ref. No. -->
			<exp_ref_no><![CDATA[<bean:write name="mblVO" property="exp_ref_no" filter="false" />]]></exp_ref_no>
			<prnr_ref_no><![CDATA[<bean:write name="mblVO" property="prnr_ref_no" filter="false" />]]></prnr_ref_no>
		</DATA>
	</logic:notEmpty>    
</logic:empty>
