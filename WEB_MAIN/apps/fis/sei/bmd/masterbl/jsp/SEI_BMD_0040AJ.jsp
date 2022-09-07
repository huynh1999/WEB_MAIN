<%--
=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
=========================================================
=========================================================
*@FileName   : SEI_BMD_0040AJ.jsp
*@FileTitle  : 
*@Description: 
*@author     : Tu.Nguyen - Dou
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
		<bean:define id="hblVO" name="EventResponse" property="objVal" />
		<bean:define id="valMap" name="EventResponse" property="mapVal" />

		<DATA> 
			<bl_sts_cd><![CDATA[<bean:write name="hblVO"  property="bl_sts_cd" filter="false" />]]></bl_sts_cd>
			<intg_bl_seq><![CDATA[<bean:write name="hblVO"  property="intg_bl_seq" filter="false" />]]></intg_bl_seq>
			<f_intg_bl_seq><![CDATA[<bean:write name="valMap" property="f_intg_bl_seq" filter="false" />]]></f_intg_bl_seq>
			<mrn_no><![CDATA[<bean:write name="hblVO" property="mrn_no" filter="false" />]]></mrn_no> 
			<bl_ser_no><![CDATA[<bean:write name="hblVO" property="bl_ser_no" filter="false" />]]></bl_ser_no>
			<bl_no><![CDATA[<bean:write name="hblVO" property="bl_no" filter="false" />]]></bl_no>
			<ref_no><![CDATA[<bean:write name="hblVO" property="ref_no" filter="false" />]]></ref_no>
			<post_dt><![CDATA[<wrt:write name="hblVO" property="post_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></post_dt>
			<f_isNumSep><![CDATA[<bean:write name="valMap" property="f_isNumSep" filter="false" />]]></f_isNumSep>
			<f_ref_no><![CDATA[<bean:write name="valMap" property="f_ref_no" filter="false" />]]></f_ref_no>
			<f_bl_no><![CDATA[<bean:write name="valMap" property="f_bl_no" filter="false" />]]></f_bl_no>
			<ref_ofc_cd><![CDATA[<bean:write name="hblVO" property="ref_ofc_cd" filter="false" />]]></ref_ofc_cd>
			<i_post_dt_imp><![CDATA[<bean:write name="hblVO" property="i_post_dt_imp" filter="false" />]]></i_post_dt_imp>
			<sub_bl_no><![CDATA[<bean:write name="hblVO" property="sub_bl_no" filter="false" />]]></sub_bl_no>
			<hbl_tp_cd><![CDATA[<bean:write name="hblVO" property="hbl_tp_cd" filter="false" />]]></hbl_tp_cd>
			<sc_no><![CDATA[<bean:write name="hblVO" property="sc_no" filter="false" />]]></sc_no>
			<imp_ref_no><![CDATA[<bean:write name="hblVO" property="imp_ref_no" filter="false" />]]></imp_ref_no>
			<shpr_trdp_cd><![CDATA[<bean:write name="hblVO" property="shpr_trdp_cd" filter="false" />]]></shpr_trdp_cd>
			<shpr_trdp_nm><![CDATA[<bean:write name="hblVO" property="shpr_trdp_nm" filter="false" />]]></shpr_trdp_nm>
			<shpr_trdp_addr><![CDATA[<bean:write name="hblVO" property="shpr_trdp_addr" filter="false" />]]></shpr_trdp_addr>
			<cnee_trdp_cd><![CDATA[<bean:write name="hblVO" property="cnee_trdp_cd" filter="false" />]]></cnee_trdp_cd>
			<cnee_trdp_nm><![CDATA[<bean:write name="hblVO" property="cnee_trdp_nm" filter="false" />]]></cnee_trdp_nm>
			<cnee_trdp_addr><![CDATA[<bean:write name="hblVO" property="cnee_trdp_addr" filter="false" />]]></cnee_trdp_addr>
			<ntfy_trdp_cd><![CDATA[<bean:write name="hblVO" property="ntfy_trdp_cd" filter="false" />]]></ntfy_trdp_cd>
			<ntfy_trdp_nm><![CDATA[<bean:write name="hblVO" property="ntfy_trdp_nm" filter="false" />]]></ntfy_trdp_nm>
			<ntfy_trdp_addr><![CDATA[<bean:write name="hblVO" property="ntfy_trdp_addr" filter="false" />]]></ntfy_trdp_addr>
			<prnr_trdp_cd2><![CDATA[<bean:write name="hblVO" property="prnr_trdp_cd2" filter="false" />]]></prnr_trdp_cd2>
			<prnr_trdp_nm2><![CDATA[<bean:write name="hblVO" property="prnr_trdp_nm2" filter="false" />]]></prnr_trdp_nm2>
			<prnr_trdp_addr2><![CDATA[<bean:write name="hblVO" property="prnr_trdp_addr2" filter="false" />]]></prnr_trdp_addr2>
			<agent_trdp_cd><![CDATA[<bean:write name="hblVO" property="agent_trdp_cd" filter="false" />]]></agent_trdp_cd>
			<agent_trdp_nm><![CDATA[<bean:write name="hblVO" property="agent_trdp_nm" filter="false" />]]></agent_trdp_nm>
			<agent_trdp_addr><![CDATA[<bean:write name="hblVO" property="agent_trdp_addr" filter="false" />]]></agent_trdp_addr>
			<lnr_trdp_cd><![CDATA[<bean:write name="hblVO" property="lnr_trdp_cd" filter="false" />]]></lnr_trdp_cd>
			<lnr_trdp_nm><![CDATA[<bean:write name="hblVO" property="lnr_trdp_nm" filter="false" />]]></lnr_trdp_nm>
			<trnk_vsl_cd><![CDATA[<bean:write name="hblVO" property="trnk_vsl_cd" filter="false" />]]></trnk_vsl_cd>
			<trnk_vsl_nm><![CDATA[<bean:write name="hblVO" property="trnk_vsl_nm" filter="false" />]]></trnk_vsl_nm>
			<trnk_voy><![CDATA[<bean:write name="hblVO" property="trnk_voy" filter="false" />]]></trnk_voy>
			<etd_dt_tm><![CDATA[<wrt:write name="hblVO" property="etd_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></etd_dt_tm>
			<eta_dt_tm><![CDATA[<wrt:write name="hblVO" property="eta_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></eta_dt_tm>
			<f_eta_dt_tm><![CDATA[<wrt:write name="hblVO" property="f_eta_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></f_eta_dt_tm>
			<carr_trdp_cd><![CDATA[<bean:write name="hblVO" property="carr_trdp_cd" filter="false" />]]></carr_trdp_cd>
			<carr_trdp_nm><![CDATA[<bean:write name="hblVO" property="carr_trdp_nm" filter="false" />]]></carr_trdp_nm>
			<carr_trdp_addr><![CDATA[<bean:write name="hblVO" property="carr_trdp_addr" filter="false" />]]></carr_trdp_addr>
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
			<cy_trdp_cd><![CDATA[<bean:write name="hblVO" property="cy_trdp_cd" filter="false" />]]></cy_trdp_cd>
			<cy_trdp_nm><![CDATA[<bean:write name="hblVO" property="cy_trdp_nm" filter="false" />]]></cy_trdp_nm>
			<cfs_trdp_cd><![CDATA[<bean:write name="hblVO" property="cfs_trdp_cd" filter="false" />]]></cfs_trdp_cd>
			<cfs_trdp_nm><![CDATA[<bean:write name="hblVO" property="cfs_trdp_nm" filter="false" />]]></cfs_trdp_nm>
			<rt_trdp_cd><![CDATA[<bean:write name="hblVO" property="rt_trdp_cd" filter="false" />]]></rt_trdp_cd>
			<rt_trdp_nm><![CDATA[<bean:write name="hblVO" property="rt_trdp_nm" filter="false" />]]></rt_trdp_nm>
			<it_no><![CDATA[<bean:write name="hblVO" property="it_no" filter="false" />]]></it_no>
			<te_dt_tm><![CDATA[<wrt:write name="hblVO" property="te_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></te_dt_tm>
			<it_loc><![CDATA[<bean:write name="hblVO" property="it_loc" filter="false" />]]></it_loc>
			<frt_term_cd><![CDATA[<bean:write name="hblVO" property="frt_term_cd" filter="false" />]]></frt_term_cd>
			<shp_mod_cd><![CDATA[<bean:write  name="hblVO" property="shp_mod_cd" filter="false" />]]></shp_mod_cd>
			<fm_svc_term_cd><![CDATA[<bean:write name="hblVO" property="fm_svc_term_cd" filter="false" />]]></fm_svc_term_cd>
			<to_svc_term_cd><![CDATA[<bean:write name="hblVO" property="to_svc_term_cd" filter="false" />]]></to_svc_term_cd>
			<pck_qty><![CDATA[<bean:write name="hblVO" property="pck_qty" filter="false" />]]></pck_qty>
			<pck_ut_cd><![CDATA[<bean:write name="hblVO" property="pck_ut_cd" filter="false" />]]></pck_ut_cd>
			<grs_wgt><![CDATA[<bean:write name="hblVO" property="grs_wgt" filter="false" />]]></grs_wgt>
			<grs_wgt1><![CDATA[<bean:write name="hblVO" property="grs_wgt1" filter="false" />]]></grs_wgt1>
			<meas><![CDATA[<bean:write name="hblVO" property="meas" filter="false" />]]></meas> 
			<meas1><![CDATA[<bean:write name="hblVO" property="meas1" filter="false" />]]></meas1>
			<curr_cd><![CDATA[<bean:write name="hblVO" property="curr_cd" filter="false" />]]></curr_cd>
			<profit_share><![CDATA[<bean:write name="hblVO" property="profit_share" filter="false" />]]></profit_share>
			<express_tp_cd><![CDATA[<bean:write name="hblVO" property="express_tp_cd" filter="false" />]]></express_tp_cd>
			<obl_tp_cd><![CDATA[<bean:write name="hblVO" property="obl_tp_cd" filter="false" />]]></obl_tp_cd>
			<rlsd_flg><![CDATA[<bean:write name="hblVO" property="rlsd_flg" filter="false" />]]></rlsd_flg>
			<rlsd_dt_tm><![CDATA[<wrt:write name="hblVO" property="rlsd_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></rlsd_dt_tm>
			<bl_iss_dt><![CDATA[<wrt:write name="hblVO" property="bl_iss_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></bl_iss_dt>
			<issued_by><![CDATA[<bean:write name="hblVO" property="issued_by" filter="false" />]]></issued_by>
			<proc_usrnm><![CDATA[<bean:write name="hblVO" property="proc_usrnm" filter="false" />]]></proc_usrnm>
			<proc_ofccd><![CDATA[<bean:write name="hblVO" property="proc_ofccd" filter="false" />]]></proc_ofccd>
			<proc_dept_cd><![CDATA[<bean:write name="hblVO" property="proc_dept_cd" filter="false" />]]></proc_dept_cd>
			<sls_ofc_cd><![CDATA[<bean:write name="hblVO" property="sls_ofc_cd" filter="false" />]]></sls_ofc_cd>
			<sls_usrid><![CDATA[<bean:write name="hblVO" property="sls_usrid" filter="false" />]]></sls_usrid>
			<sls_usr_nm><![CDATA[<bean:write name="hblVO" property="sls_usr_nm" filter="false" />]]></sls_usr_nm>
			<sls_dept_cd><![CDATA[<bean:write name="hblVO" property="sls_dept_cd" filter="false" />]]></sls_dept_cd>
			<!-- OFVFOUR-7976: [MATRIX] ADDING CS PIC ON ALL B/L ENTRY AND TRADE PARTNER ENTRY SCREEN -->
			<cs_usrid><![CDATA[<bean:write name="hblVO" property="cs_usrid" filter="false" />]]></cs_usrid>
			<cs_usr_nm><![CDATA[<bean:write name="hblVO" property="cs_usr_nm" filter="false" />]]></cs_usr_nm>
			<ccn_no><![CDATA[<bean:write name="hblVO" property="ccn_no" filter="false" />]]></ccn_no>
			<mnf_fr_loc><![CDATA[<bean:write name="hblVO" property="mnf_fr_loc" filter="false" />]]></mnf_fr_loc>
			<mnf_to_loc><![CDATA[<bean:write name="hblVO" property="mnf_to_loc" filter="false" />]]></mnf_to_loc>
			<mk_txt><![CDATA[<bean:write name="hblVO" property="mk_txt" filter="false" />]]></mk_txt>
			<desc_txt><![CDATA[<bean:write name="hblVO" property="desc_txt" filter="false" />]]></desc_txt>
			<rmk><![CDATA[<bean:write name="hblVO" property="rmk"  filter="false" />]]></rmk>
			<desc_txt1><![CDATA[<bean:write name="hblVO" property="desc_txt1" filter="false" />]]></desc_txt1>
			<obrd_dt_tm><![CDATA[<bean:write name="hblVO" property="obrd_dt_tm" filter="false" />]]></obrd_dt_tm>
			<ctrb_ofc_cd><![CDATA[<bean:write name="hblVO" property="ctrb_ofc_cd" filter="false" />]]></ctrb_ofc_cd>
			<ctrb_dept_cd><![CDATA[<bean:write name="hblVO" property="ctrb_dept_cd" filter="false" />]]></ctrb_dept_cd>
			<ctrb_ratio_yn><![CDATA[<bean:write name="hblVO" property="ctrb_ratio_yn" filter="false" />]]></ctrb_ratio_yn>
			<ctrb_mgn><![CDATA[<bean:write name="hblVO" property="ctrb_mgn" filter="false" />]]></ctrb_mgn>
            <cfs_rmk><![CDATA[<bean:write name="hblVO" property="cfs_rmk" filter="false" />]]></cfs_rmk>
            <rep_cmdt_cd><![CDATA[<bean:write name="hblVO" property="rep_cmdt_cd" filter="false" />]]></rep_cmdt_cd>
            <rep_cmdt_nm><![CDATA[<bean:write name="hblVO" property="rep_cmdt_nm" filter="false" />]]></rep_cmdt_nm>
            <f_modify><![CDATA[<bean:write name="valMap" property="f_modify" filter="false" />]]></f_modify> <!--#428 [ZEN] AFTER AR/AP/DC CREATION, FILING # SHOULD BE NOT UPDATED  -->
            <%-- #1619 [CLT] Original B/L Type- 항목 정리<bl_rlse_tp_cd><![CDATA[<bean:write name="hblVO" property="bl_rlse_tp_cd" filter="false" />]]></bl_rlse_tp_cd> --%><!--#1430 [PATENT] 0215_15 B/L TYPE DIVERSELY-->
            <!-- #1804 [Split - 1] [PATENT] Payment Verification - 기능보완  -->
			<verify_flag><![CDATA[<bean:write name="hblVO" property="verify_flag"  filter="false" />]]></verify_flag>
			<!-- #657 [OCEAN BLUE, IMPEX] B/L SELECTION FLAG TO SHOW ON VISIBILITY PORTAL -->
			<inter_use_flag><![CDATA[<bean:write name="hblVO" property="inter_use_flag"  filter="false" />]]></inter_use_flag>
			<!-- #4724	[Best Ocean] Ocean Import OBL Received and Received Date column and entry add -->
			<org_bl_rcvd_flg><![CDATA[<bean:write name="hblVO" property="org_bl_rcvd_flg" filter="false" />]]></org_bl_rcvd_flg>
			<rcvd_dt_tm><![CDATA[<wrt:write name="hblVO" property="rcvd_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></rcvd_dt_tm>
			<berth_dt><![CDATA[<wrt:write name="hblVO" property="berth_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></berth_dt>
		</DATA>
	</logic:notEmpty>
</logic:empty>
