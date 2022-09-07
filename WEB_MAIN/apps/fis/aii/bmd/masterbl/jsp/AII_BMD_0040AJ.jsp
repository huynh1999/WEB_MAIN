<%
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
=========================================================
=========================================================
*@FileName   : AII_BMD_0040AJ.jsp
*@FileTitle  : AIM AWB Entry
*@Description: 
*@author     : Hoang.Pham
*@version    : 1.0 - 2014/12/10
*@since      : 2014/12/10

*@Change history:
=========================================================*/
%>
<%@ page contentType="text/xml; charset=UTF-8"%>
<%@page pageEncoding="UTF-8"%>
<%@include file="./../../../../../../syscommon/header/CLTGSHeader.jsp"%>
<logic:empty name="com.clt.framework.core.comm.EXCEPTION_OBJECT ">
	<logic:notEmpty name="EventResponse" property="mapVal">
	<logic:notEmpty name="EventResponse" property="objVal">
    <bean:define id="hblVO"   name="EventResponse" property="objVal"/>
    <bean:define id="valMap"  name="EventResponse" property="mapVal"/>
		<DATA>
			<bl_sts_cd><![CDATA[<bean:write name="hblVO"  property="bl_sts_cd" filter="false" />]]></bl_sts_cd>
			<intg_bl_seq><![CDATA[<bean:write name="hblVO"  property="intg_bl_seq" filter="false" />]]></intg_bl_seq>
			<sr_no><![CDATA[<bean:write name="hblVO"  property="sr_no" filter="false" />]]></sr_no>
			<f_intg_bl_seq><![CDATA[<bean:write name="valMap" property="f_intg_bl_seq" filter="false" />]]></f_intg_bl_seq>
			<bl_no><![CDATA[<bean:write name="hblVO" property="bl_no" filter="false" />]]></bl_no>
			<ref_no><![CDATA[<bean:write name="hblVO" property="ref_no" filter="false" />]]></ref_no>
			<post_dt><![CDATA[<wrt:write name="hblVO" property="post_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></post_dt>
			<f_isNumSep><![CDATA[<bean:write name="valMap" property="f_isNumSep" filter="false" />]]></f_isNumSep>
			<f_ref_no><![CDATA[<bean:write name="valMap" property="f_ref_no" filter="false" />]]></f_ref_no>
			<f_bl_no><![CDATA[<bean:write name="valMap" property="f_bl_no" filter="false" />]]></f_bl_no>
			<ref_ofc_cd><![CDATA[<bean:write name="hblVO" property="ref_ofc_cd" filter="false" />]]></ref_ofc_cd>
			<i_post_dt_imp><![CDATA[<bean:write name="hblVO" property="i_post_dt_imp" filter="false" />]]></i_post_dt_imp>
			<mrn_no><![CDATA[<bean:write name="hblVO" property="mrn_no" filter="false" />]]></mrn_no>
			<bl_ser_no><![CDATA[<bean:write name="hblVO" property="bl_ser_no" filter="false" />]]></bl_ser_no>
			<hbl_tp_cd><![CDATA[<bean:write name="hblVO" property="hbl_tp_cd" filter="false" />]]></hbl_tp_cd>
			<imp_ref_no><![CDATA[<bean:write name="hblVO" property="imp_ref_no" filter="false" />]]></imp_ref_no>
			<shpr_trdp_cd><![CDATA[<bean:write name="hblVO" property="shpr_trdp_cd" filter="false" />]]></shpr_trdp_cd>
			<shpr_trdp_nm><![CDATA[<bean:write name="hblVO" property="shpr_trdp_nm" filter="false" />]]></shpr_trdp_nm>
			<shpr_trdp_addr><![CDATA[<bean:write name="hblVO" property="shpr_trdp_addr"  filter="false" />]]></shpr_trdp_addr>
			<cnee_trdp_cd><![CDATA[<bean:write name="hblVO" property="cnee_trdp_cd" filter="false" />]]></cnee_trdp_cd>
			<cnee_trdp_nm><![CDATA[<bean:write name="hblVO" property="cnee_trdp_nm" filter="false" />]]></cnee_trdp_nm>
			<cnee_trdp_addr><![CDATA[<bean:write name="hblVO" property="cnee_trdp_addr"  filter="false" />]]></cnee_trdp_addr>
			<manifest_to><![CDATA[<bean:write name="hblVO" property="manifest_to" filter="false" />]]></manifest_to>
			<lnr_trdp_cd><![CDATA[<bean:write name="hblVO" property="lnr_trdp_cd" filter="false" />]]></lnr_trdp_cd>
			<lnr_trdp_nm><![CDATA[<bean:write name="hblVO" property="lnr_trdp_nm" filter="false" />]]></lnr_trdp_nm>
			<obrd_dt_tm><![CDATA[<wrt:write name="hblVO" property="obrd_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></obrd_dt_tm>
			<flt_no><![CDATA[<bean:write name="hblVO" property="flt_no" filter="false" />]]></flt_no>
			<etd_dt_tm><![CDATA[<wrt:write name="hblVO" property="etd_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></etd_dt_tm>
			<etd_tm><![CDATA[<wrt:write name="hblVO" property="etd_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm" filter="false" />]]></etd_tm>
			<eta_fpoe_tm><![CDATA[<wrt:write name="hblVO" property="eta_fpoe_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></eta_fpoe_tm>
			<fpoe_tm><![CDATA[<wrt:write name="hblVO" property="fpoe_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm" filter="false" />]]></fpoe_tm>
			<eta_dt_tm><![CDATA[<wrt:write name="hblVO" property="eta_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></eta_dt_tm>
			<eta_tm><![CDATA[<wrt:write name="hblVO" property="eta_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm" filter="false" />]]></eta_tm>
			<f_eta_dt_tm><![CDATA[<wrt:write name="hblVO" property="f_eta_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></f_eta_dt_tm>
			<f_eta_tm><![CDATA[<wrt:write name="hblVO" property="f_eta_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm"  filter="false" />]]></f_eta_tm>
			<carr_trdp_cd><![CDATA[<bean:write name="hblVO" property="carr_trdp_cd" filter="false" />]]></carr_trdp_cd>
			<carr_trdp_nm><![CDATA[<bean:write name="hblVO" property="carr_trdp_nm" filter="false" />]]></carr_trdp_nm>
			<carr_trdp_addr><![CDATA[<bean:write name="hblVO" property="carr_trdp_addr" filter="false" />]]></carr_trdp_addr>
			<pol_cd><![CDATA[<bean:write name="hblVO" property="pol_cd" filter="false" />]]></pol_cd>
			<pol_nm><![CDATA[<bean:write name="hblVO" property="pol_nm" filter="false" />]]></pol_nm>
			<pol_nod_cd><![CDATA[<bean:write name="hblVO" property="pol_nod_cd" filter="false" />]]></pol_nod_cd>
			<ts1_port_cd><![CDATA[<bean:write name="hblVO" property="ts1_port_cd" filter="false" />]]></ts1_port_cd>
			<ts1_flt_no><![CDATA[<bean:write name="hblVO" property="ts1_flt_no" filter="false" />]]></ts1_flt_no>
			<ts2_port_cd><![CDATA[<bean:write name="hblVO" property="ts2_port_cd" filter="false" />]]></ts2_port_cd>
			<ts2_flt_no><![CDATA[<bean:write name="hblVO" property="ts2_flt_no" filter="false" />]]></ts2_flt_no>
			<ts3_port_cd><![CDATA[<bean:write name="hblVO" property="ts3_port_cd" filter="false" />]]></ts3_port_cd>
			<ts3_flt_no><![CDATA[<bean:write name="hblVO" property="ts3_flt_no" filter="false" />]]></ts3_flt_no>
			<first_port_cd><![CDATA[<bean:write name="hblVO" property="first_port_cd" filter="false" />]]></first_port_cd>
			<first_port_nm><![CDATA[<bean:write name="hblVO" property="first_port_nm" filter="false" />]]></first_port_nm>
			<pod_cd><![CDATA[<bean:write name="hblVO" property="pod_cd" filter="false" />]]></pod_cd>
			<pod_nm><![CDATA[<bean:write name="hblVO" property="pod_nm" filter="false" />]]></pod_nm>
			<pod_nod_cd><![CDATA[<bean:write name="hblVO" property="pod_nod_cd" filter="false" />]]></pod_nod_cd>
			<last_port_cd><![CDATA[<bean:write name="hblVO" property="last_port_cd" filter="false" />]]></last_port_cd>
			<frt_loc_cd><![CDATA[<bean:write name="hblVO" property="frt_loc_cd" filter="false" />]]></frt_loc_cd>
			<frt_loc_nm><![CDATA[<bean:write name="hblVO" property="frt_loc_nm" filter="false" />]]></frt_loc_nm>
			<cfs_nod_cd><![CDATA[<bean:write name="hblVO" property="cfs_nod_cd" filter="false" />]]></cfs_nod_cd>
			<cfs_loc_nm><![CDATA[<bean:write name="hblVO" property="cfs_loc_nm" filter="false" />]]></cfs_loc_nm>
			<cfs_loc_cd><![CDATA[<bean:write name="hblVO" property="cfs_loc_cd" filter="false" />]]></cfs_loc_cd>
			<sto_start_dt><![CDATA[<wrt:write name="hblVO" property="sto_start_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></sto_start_dt>
			<rep_cmdt_cd><![CDATA[<bean:write name="hblVO" property="rep_cmdt_cd" filter="false" />]]></rep_cmdt_cd>
			<rep_cmdt_nm><![CDATA[<bean:write name="hblVO" property="rep_cmdt_nm" filter="false" />]]></rep_cmdt_nm>
			<pck_qty><![CDATA[<bean:write name="hblVO" property="pck_qty" filter="false" />]]></pck_qty>
			<pck_ut_cd><![CDATA[<bean:write name="hblVO" property="pck_ut_cd"  filter="false" />]]></pck_ut_cd>
			<grs_wgt><![CDATA[<bean:write name="hblVO" property="grs_wgt" filter="false" />]]></grs_wgt>
			<grs_wgt1><![CDATA[<bean:write name="hblVO" property="grs_wgt1" filter="false" />]]></grs_wgt1>
			<chg_wgt><![CDATA[<bean:write name="hblVO" property="chg_wgt" filter="false" />]]></chg_wgt>
			<chg_wgt1><![CDATA[<bean:write name="hblVO" property="chg_wgt1" filter="false" />]]></chg_wgt1>
			<vol_wgt><![CDATA[<bean:write name="hblVO" property="vol_wgt" filter="false" />]]></vol_wgt>
			<vol_meas><![CDATA[<bean:write name="hblVO" property="vol_meas" filter="false" />]]></vol_meas>
			<frt_term_cd><![CDATA[<bean:write name="hblVO" property="frt_term_cd"  filter="false" />]]></frt_term_cd>
			<curr_cd><![CDATA[<bean:write name="hblVO" property="curr_cd"  filter="false" />]]></curr_cd>
			<bl_iss_dt><![CDATA[<wrt:write name="hblVO" property="bl_iss_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></bl_iss_dt>
			<issued_by><![CDATA[<bean:write name="hblVO" property="issued_by" filter="false" />]]></issued_by>
			<proc_usrnm><![CDATA[<bean:write name="hblVO" property="proc_usrnm" filter="false" />]]></proc_usrnm>
			<proc_ofccd><![CDATA[<bean:write name="hblVO" property="proc_ofccd" filter="false" />]]></proc_ofccd>
			<proc_dept_cd><![CDATA[<bean:write name="hblVO" property="proc_dept_cd" filter="false" />]]></proc_dept_cd>
			<sls_ofc_cd><![CDATA[<bean:write name="hblVO" property="sls_ofc_cd" filter="false" />]]></sls_ofc_cd>
			<sls_usrid><![CDATA[<bean:write name="hblVO" property="sls_usrid" filter="false" />]]></sls_usrid>
			<sls_usr_nm><![CDATA[<bean:write name="hblVO" property="sls_usr_nm" filter="false" />]]></sls_usr_nm>
			<sls_dept_cd><![CDATA[<bean:write name="hblVO" property="sls_dept_cd" filter="false" />]]></sls_dept_cd>
			<ccn_no><![CDATA[<bean:write name="hblVO" property="ccn_no" filter="false" />]]></ccn_no>
			<mnf_fr_loc><![CDATA[<bean:write name="hblVO" property="mnf_fr_loc" filter="false" />]]></mnf_fr_loc>
			<mnf_to_loc><![CDATA[<bean:write name="hblVO" property="mnf_to_loc" filter="false" />]]></mnf_to_loc>
			<hndl_info_txt><![CDATA[<bean:write name="hblVO" property="hndl_info_txt"  filter="false" />]]></hndl_info_txt>
			<mk_txt><![CDATA[<bean:write name="hblVO" property="mk_txt"  filter="false" />]]></mk_txt>
			<desc_txt><![CDATA[<bean:write name="hblVO" property="desc_txt"  filter="false" />]]></desc_txt>
			<ctrb_ofc_cd><![CDATA[<bean:write name="hblVO" property="ctrb_ofc_cd" filter="false" />]]></ctrb_ofc_cd>
			<ctrb_dept_cd><![CDATA[<bean:write name="hblVO" property="ctrb_dept_cd" filter="false" />]]></ctrb_dept_cd>
			<ctrb_ratio_yn><![CDATA[<bean:write name="hblVO" property="ctrb_ratio_yn" filter="false" />]]></ctrb_ratio_yn>
			<ctrb_mgn><![CDATA[<bean:write name="hblVO" property="ctrb_mgn" filter="false" />]]></ctrb_mgn>
			<!-- #1041 [BNX Vietnam] A/R Entry does not show any information from AIH -->
			<agent_trdp_cd><![CDATA[<bean:write name="hblVO" property="agent_trdp_cd" filter="false" />]]></agent_trdp_cd>
			<agent_trdp_nm><![CDATA[<bean:write name="hblVO" property="agent_trdp_nm" filter="false" />]]></agent_trdp_nm>
			<agent_trdp_addr><![CDATA[<bean:write name="hblVO" property="agent_trdp_addr" filter="false" />]]></agent_trdp_addr>
			<f_modify><![CDATA[<bean:write name="valMap" property="f_modify" filter="false" />]]></f_modify> <!--#428 [ZEN] AFTER AR/AP/DC CREATION, FILING # SHOULD BE NOT UPDATED  -->
			<!-- #657 [OCEAN BLUE, IMPEX] B/L SELECTION FLAG TO SHOW ON VISIBILITY PORTAL -->
			<inter_use_flag><![CDATA[<bean:write name="hblVO" property="inter_use_flag" filter="false" />]]></inter_use_flag>			
		</DATA>
		</logic:notEmpty>
	</logic:notEmpty>    
</logic:empty>
