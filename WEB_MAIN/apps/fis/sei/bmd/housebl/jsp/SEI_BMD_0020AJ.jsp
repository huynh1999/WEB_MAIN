<%--
=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
=========================================================
=========================================================
*@FileName   : SEE_BMD_0130AJ.jsp
*@FileTitle  : Pre-Pickup Order Entry URL Copy
*@Description: 
*@author     : Tu.Nguyen - Dou
*@version    : 1.0 - 09/12/2014
*@since      : 09/12/2014

*@Change history:
=========================================================
--%>
<%@ page contentType="text/xml; charset=UTF-8"%>
<%@page import="java.util.HashMap"%>
<%@page import="java.util.List"%>
<%@page import="com.clt.syscommon.response.CommonEventResponse"%>
<%@page pageEncoding="UTF-8"%>
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
				<intg_bl_seq><![CDATA[<bean:write name="hblVO"  property="intg_bl_seq" filter="false" />]]></intg_bl_seq>
				<f_intg_bl_seq><![CDATA[<bean:write name="valMap" property="f_intg_bl_seq" filter="false" />]]></f_intg_bl_seq>
				<inv_rmk><![CDATA[<bean:write name="ofcVO" property="inv_rmk" filter="false" />]]></inv_rmk>
				<dflt_an_memo><![CDATA[<bean:write name="ofcVO" property="dflt_an_memo" filter="false" />]]></dflt_an_memo>
				<bl_no><![CDATA[<bean:write name="hblVO" property="bl_no" filter="false" />]]></bl_no>
				<mbl_curr_cd><![CDATA[<bean:write name="hblVO" property="mbl_curr_cd" filter="false" />]]></mbl_curr_cd>
				<f_isNumSep><![CDATA[<bean:write name="valMap" property="f_isNumSep" filter="false" />]]></f_isNumSep>
				<f_bl_no><![CDATA[<bean:write name="valMap" property="f_bl_no" filter="false" />]]></f_bl_no>
				<bl_sts_label><![CDATA[<bean:write name="hblVO" property="bl_sts_label" filter="false" />]]></bl_sts_label>
				<hbl_tp_cd><![CDATA[<bean:write name="hblVO" property="hbl_tp_cd" filter="false" />]]></hbl_tp_cd>
				<post_dt><![CDATA[<wrt:write name="hblVO" property="post_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></post_dt>
				<ams_no><![CDATA[<bean:write name="hblVO" property="ams_no" filter="false" />]]></ams_no>
				<isf_no><![CDATA[<bean:write name="hblVO" property="isf_no" filter="false" />]]></isf_no>
				<ref_no><![CDATA[<bean:write name="hblVO" property="ref_no" filter="false" />]]></ref_no>
				<ref_ofc_cd><![CDATA[<bean:write name="hblVO" property="ref_ofc_cd" filter="false" />]]></ref_ofc_cd>
				<rlt_intg_bl_seq><![CDATA[<bean:write name="hblVO" property="rlt_intg_bl_seq" filter="false" />]]></rlt_intg_bl_seq>
				<mbl_no><![CDATA[<bean:write name="hblVO" property="mbl_no" filter="false" />]]></mbl_no>
				<sub_bl_no><![CDATA[<bean:write name="hblVO" property="sub_bl_no" filter="false" />]]></sub_bl_no>
				<bl_ser_no><![CDATA[<bean:write name="hblVO" property="bl_ser_no" filter="false" />]]></bl_ser_no>
				<jb_tmplt_nm><![CDATA[<bean:write name="hblVO" property="jb_tmplt_nm" filter="false" />]]></jb_tmplt_nm>
				<jb_tmplt_seq><![CDATA[<bean:write name="hblVO" property="jb_tmplt_seq" filter="false" />]]></jb_tmplt_seq>
				<sub_mbl_flg><![CDATA[<bean:write name="hblVO" property="sub_mbl_flg" filter="false" />]]></sub_mbl_flg>
				<po_no><![CDATA[<bean:write name="hblVO" property="po_no" filter="false" />]]></po_no>
				<lc_no><![CDATA[<bean:write name="hblVO" property="lc_no" filter="false" />]]></lc_no>
				<inv_no><![CDATA[<bean:write name="hblVO" property="inv_no" filter="false" />]]></inv_no>
				<cust_ref_no><![CDATA[<bean:write name="hblVO" property="cust_ref_no" filter="false" />]]></cust_ref_no>
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
				<cust_trdp_cd><![CDATA[<bean:write name="hblVO" property="cust_trdp_cd" filter="false" />]]></cust_trdp_cd>
				<cust_trdp_nm><![CDATA[<bean:write name="hblVO" property="cust_trdp_nm" filter="false" />]]></cust_trdp_nm>
				<cust_trdp_addr><![CDATA[<bean:write name="hblVO" property="cust_trdp_addr"  filter="false" />]]></cust_trdp_addr>
				<obrd_dt_tm><![CDATA[<wrt:write name="hblVO" property="obrd_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></obrd_dt_tm>
				<pre_vsl_cd><![CDATA[<bean:write name="hblVO" property="pre_vsl_cd" filter="false" />]]></pre_vsl_cd>
				<pre_vsl_nm><![CDATA[<bean:write name="hblVO" property="pre_vsl_nm" filter="false" />]]></pre_vsl_nm>
				<pre_voy><![CDATA[<bean:write name="hblVO" property="pre_voy" filter="false" />]]></pre_voy>
				<trnk_vsl_cd><![CDATA[<bean:write name="hblVO" property="trnk_vsl_cd" filter="false" />]]></trnk_vsl_cd>
				<trnk_vsl_nm><![CDATA[<bean:write name="hblVO" property="trnk_vsl_nm" filter="false" />]]></trnk_vsl_nm>
				<trnk_voy><![CDATA[<bean:write name="hblVO" property="trnk_voy" filter="false" />]]></trnk_voy>
				<lane_cd><![CDATA[<bean:write name="hblVO" property="lane_cd" filter="false" />]]></lane_cd>
				<svc_lane_nm><![CDATA[<bean:write name="hblVO" property="svc_lane_nm" filter="false" />]]></svc_lane_nm>
				<por_cd><![CDATA[<bean:write name="hblVO" property="por_cd" filter="false" />]]></por_cd>
				<por_nm><![CDATA[<bean:write name="hblVO" property="por_nm" filter="false" />]]></por_nm>
				<etd_por_tm><![CDATA[<wrt:write name="hblVO" property="etd_por_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></etd_por_tm>
				<pol_cd><![CDATA[<bean:write name="hblVO" property="pol_cd" filter="false" />]]></pol_cd>
				<pol_nm><![CDATA[<bean:write name="hblVO" property="pol_nm" filter="false" />]]></pol_nm>
				<etd_dt_tm><![CDATA[<wrt:write name="hblVO" property="etd_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></etd_dt_tm>
				<pod_cd><![CDATA[<bean:write name="hblVO" property="pod_cd" filter="false" />]]></pod_cd>
				<pod_nm><![CDATA[<bean:write name="hblVO" property="pod_nm" filter="false" />]]></pod_nm>
				<eta_dt_tm><![CDATA[<wrt:write name="hblVO" property="eta_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></eta_dt_tm>
				<del_cd><![CDATA[<bean:write name="hblVO" property="del_cd" filter="false" />]]></del_cd>
				<del_nm><![CDATA[<bean:write name="hblVO" property="del_nm" filter="false" />]]></del_nm>
				<d_eta_dt_tm><![CDATA[<wrt:write name="hblVO" property="d_eta_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></d_eta_dt_tm>
				<fnl_dest_loc_cd><![CDATA[<bean:write name="hblVO" property="fnl_dest_loc_cd" filter="false" />]]></fnl_dest_loc_cd>
				<fnl_dest_loc_nm><![CDATA[<bean:write name="hblVO" property="fnl_dest_loc_nm" filter="false" />]]></fnl_dest_loc_nm>
				<f_eta_dt_tm><![CDATA[<wrt:write name="hblVO" property="f_eta_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></f_eta_dt_tm>
				<lnr_trdp_cd><![CDATA[<bean:write name="hblVO" property="lnr_trdp_cd" filter="false" />]]></lnr_trdp_cd>
				<lnr_trdp_nm><![CDATA[<bean:write name="hblVO" property="lnr_trdp_nm" filter="false" />]]></lnr_trdp_nm>
				<agent_trdp_cd><![CDATA[<bean:write name="hblVO" property="agent_trdp_cd" filter="false" />]]></agent_trdp_cd>
				<agent_trdp_nm><![CDATA[<bean:write name="hblVO" property="agent_trdp_nm" filter="false" />]]></agent_trdp_nm>
				<agent_trdp_addr><![CDATA[<bean:write name="hblVO" property="agent_trdp_addr" filter="false" />]]></agent_trdp_addr>
				<door_loc_cd><![CDATA[<bean:write name="hblVO" property="door_loc_cd" filter="false" />]]></door_loc_cd>
				<door_loc_nm><![CDATA[<bean:write name="hblVO" property="door_loc_nm" filter="false" />]]></door_loc_nm>
				<cfs_trdp_cd><![CDATA[<bean:write name="hblVO" property="cfs_trdp_cd" filter="false" />]]></cfs_trdp_cd>
				<cfs_trdp_nm><![CDATA[<bean:write name="hblVO" property="cfs_trdp_nm" filter="false" />]]></cfs_trdp_nm>
				<avail_dt_tm><![CDATA[<wrt:write name="hblVO" property="avail_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></avail_dt_tm>
				<lfd_dt_tm><![CDATA[<wrt:write name="hblVO" property="lfd_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></lfd_dt_tm>
				<go_dt_tm><![CDATA[<wrt:write name="hblVO" property="go_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></go_dt_tm>
				<cnt_cd><![CDATA[<bean:write name="hblVO" property="cnt_cd" filter="false" />]]></cnt_cd>
				<cnt_nm><![CDATA[<bean:write name="hblVO" property="cnt_nm" filter="false" />]]></cnt_nm>
				<trk_trdp_cd><![CDATA[<bean:write name="hblVO" property="trk_trdp_cd" filter="false" />]]></trk_trdp_cd>
				<trk_trdp_nm><![CDATA[<bean:write name="hblVO" property="trk_trdp_nm" filter="false" />]]></trk_trdp_nm>
				<trk_trdp_addr><![CDATA[<bean:write name="hblVO" property="trk_trdp_addr" filter="false" />]]></trk_trdp_addr>
				<cfs_nod_cd><![CDATA[<bean:write name="hblVO" property="cfs_nod_cd" filter="false" />]]></cfs_nod_cd>
				<cfs_loc_nm><![CDATA[<bean:write name="hblVO" property="cfs_loc_nm" filter="false" />]]></cfs_loc_nm>
				<cfs_loc_cd><![CDATA[<bean:write name="hblVO" property="cfs_loc_cd" filter="false" />]]></cfs_loc_cd>
				<csts_clr_tp><![CDATA[<bean:write name="hblVO" property="csts_clr_tp" filter="false" />]]></csts_clr_tp>
				<shp_mod_cd><![CDATA[<bean:write  name="hblVO" property="shp_mod_cd" filter="false" />]]></shp_mod_cd>
				<inco_cd><![CDATA[<bean:write name="hblVO" property="inco_cd" filter="false" />]]></inco_cd>
				<rep_cmdt_cd><![CDATA[<bean:write name="hblVO" property="rep_cmdt_cd" filter="false" />]]></rep_cmdt_cd>
				<rep_cmdt_nm><![CDATA[<bean:write name="hblVO" property="rep_cmdt_nm" filter="false" />]]></rep_cmdt_nm>
				<pck_qty><![CDATA[<bean:write name="hblVO" property="pck_qty" filter="false" />]]></pck_qty>
				<pck_ut_cd><![CDATA[<bean:write name="hblVO" property="pck_ut_cd" filter="false" />]]></pck_ut_cd>
				<grs_wgt><![CDATA[<bean:write name="hblVO" property="grs_wgt" filter="false" />]]></grs_wgt>
				<grs_wgt1><![CDATA[<bean:write name="hblVO" property="grs_wgt1" filter="false" />]]></grs_wgt1>
				<meas><![CDATA[<bean:write name="hblVO" property="meas" filter="false" />]]></meas>
				<meas1><![CDATA[<bean:write name="hblVO" property="meas1" filter="false" />]]></meas1>
				<size_ut_cd><![CDATA[<bean:write name="hblVO" property="size_ut_cd" filter="false" />]]></size_ut_cd>
				<wh_recp_no><![CDATA[<bean:write name="hblVO" property="wh_recp_no" filter="false" />]]></wh_recp_no>
				<curr_cd><![CDATA[<bean:write name="hblVO" property="curr_cd" filter="false" />]]></curr_cd>
				<frt_term_cd><![CDATA[<bean:write name="hblVO" property="frt_term_cd" filter="false" />]]></frt_term_cd>
				<fm_svc_term_cd><![CDATA[<bean:write name="hblVO" property="fm_svc_term_cd" filter="false" />]]></fm_svc_term_cd>
				<to_svc_term_cd><![CDATA[<bean:write name="hblVO" property="to_svc_term_cd" filter="false" />]]></to_svc_term_cd>
				<nomi_flg><![CDATA[<bean:write name="hblVO" property="nomi_flg" filter="false" />]]></nomi_flg>
				<shp_tp_cd><![CDATA[<bean:write name="hblVO" property="shp_tp_cd" filter="false" />]]></shp_tp_cd>
				<profit_share><![CDATA[<bean:write name="hblVO" property="profit_share" filter="false" />]]></profit_share>
				<express_tp_cd><![CDATA[<bean:write name="hblVO" property="express_tp_cd" filter="false" />]]></express_tp_cd>
				<obl_tp_cd><![CDATA[<bean:write name="hblVO" property="obl_tp_cd" filter="false" />]]></obl_tp_cd>
				<cargo_tp_cd><![CDATA[<bean:write name="hblVO" property="cargo_tp_cd" filter="false" />]]></cargo_tp_cd>
				<svc_scope><![CDATA[<bean:write name="hblVO" property="svc_scope" filter="false" />]]></svc_scope>
				<org_bl_rcvd_flg><![CDATA[<bean:write name="hblVO" property="org_bl_rcvd_flg" filter="false" />]]></org_bl_rcvd_flg>
				<rcvd_dt_tm><![CDATA[<wrt:write name="hblVO" property="rcvd_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></rcvd_dt_tm>
				<ror_flg><![CDATA[<bean:write name="hblVO" property="ror_flg" filter="false" />]]></ror_flg>
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
				<sls_ofc_cd><![CDATA[<bean:write name="hblVO" property="sls_ofc_cd" filter="false" />]]></sls_ofc_cd>
				<sls_usrid><![CDATA[<bean:write name="hblVO" property="sls_usrid" filter="false" />]]></sls_usrid>
				<sls_usr_nm><![CDATA[<bean:write name="hblVO" property="sls_usr_nm" filter="false" />]]></sls_usr_nm>
				<sls_dept_cd><![CDATA[<bean:write name="hblVO" property="sls_dept_cd" filter="false" />]]></sls_dept_cd>
				<!-- OFVFOUR-7976: [MATRIX] ADDING CS PIC ON ALL B/L ENTRY AND TRADE PARTNER ENTRY SCREEN -->
				<cs_usrid><![CDATA[<bean:write name="hblVO" property="cs_usrid" filter="false" />]]></cs_usrid>
				<cs_usr_nm><![CDATA[<bean:write name="hblVO" property="cs_usr_nm" filter="false" />]]></cs_usr_nm>
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
				<sad_txt><![CDATA[<bean:write name="hblVO" property="sad_txt"  filter="false" />]]></sad_txt>
				<say_txt><![CDATA[<bean:write name="hblVO" property="say_txt"  filter="false" />]]></say_txt>
				<!-- OFVFOUR-8085: [Lever Logistics] OIH B/L - Custom Clerance Port/Date -->
				<cstms_clr_port_cd><![CDATA[<bean:write name="hblVO" property="cstms_clr_port_cd"  filter="false" />]]></cstms_clr_port_cd>
				<cstms_clr_port_nm><![CDATA[<bean:write name="hblVO" property="cstms_clr_port_nm"  filter="false" />]]></cstms_clr_port_nm>
				<cstms_clr_dt><![CDATA[<wrt:write name="hblVO" property="cstms_clr_dt" formatType="DATE" fromFormat="yyyyMMdd" format="MM-dd-yyyy" filter="false" />]]></cstms_clr_dt>
				<mk_txt><![CDATA[<bean:write name="hblVO" property="mk_txt"  filter="false" />]]></mk_txt>
				<desc_txt><![CDATA[<bean:write name="hblVO" property="desc_txt"  filter="false" />]]></desc_txt>
				<rmk><![CDATA[<bean:write name="hblVO" property="rmk"  filter="false" />]]></rmk>
				<desc_txt1><![CDATA[<bean:write name="hblVO" property="desc_txt1"  filter="false" />]]></desc_txt1>
				<an_inv_no><![CDATA[<bean:write name="hblVO" property="an_inv_no" filter="false" />]]></an_inv_no>
				<an_due_dt><![CDATA[<wrt:write name="hblVO" property="an_due_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></an_due_dt>
				<an_curr_cd><![CDATA[<bean:write name="hblVO" property="an_curr_cd" filter="false" />]]></an_curr_cd>
				<hbl_ser_pfx><![CDATA[<bean:write name="hblVO" property="hbl_ser_pfx" filter="false" />]]></hbl_ser_pfx>
				<hbl_ser_no><![CDATA[<bean:write name="hblVO" property="hbl_ser_no" filter="false" />]]></hbl_ser_no>
				<ctrb_ofc_cd><![CDATA[<bean:write name="hblVO" property="ctrb_ofc_cd" filter="false" />]]></ctrb_ofc_cd>
				<ctrb_dept_cd><![CDATA[<bean:write name="hblVO" property="ctrb_dept_cd" filter="false" />]]></ctrb_dept_cd>
				<ctrb_ratio_yn><![CDATA[<bean:write name="hblVO" property="ctrb_ratio_yn" filter="false" />]]></ctrb_ratio_yn>
				<ctrb_mgn><![CDATA[<bean:write name="hblVO" property="ctrb_mgn" filter="false" />]]></ctrb_mgn>
                <csms_rlse_dt><![CDATA[<wrt:write name="hblVO" property="csms_rlse_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></csms_rlse_dt>
                <pkup_dt><![CDATA[<wrt:write name="hblVO" property="pkup_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></pkup_dt>
                <entr_no><![CDATA[<bean:write name="hblVO" property="entr_no" filter="false" />]]></entr_no>
                <cfs_rmk><![CDATA[<bean:write name="hblVO" property="cfs_rmk" filter="false" />]]></cfs_rmk>
                
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
                <mrn_no><![CDATA[<bean:write name="hblVO" property="mrn_no" filter="false" />]]></mrn_no>
                <f_modify><![CDATA[<bean:write name="valMap" property="f_modify" filter="false" />]]></f_modify> <!--#428 [ZEN] AFTER AR/AP/DC CREATION, FILING # SHOULD BE NOT UPDATED  -->
                <%-- #1619 [CLT] Original B/L Type- 항목 정리<bl_rlse_tp_cd><![CDATA[<bean:write name="hblVO" property="bl_rlse_tp_cd" filter="false" />]]></bl_rlse_tp_cd> --%><!--#1430 [PATENT] 0215_15 B/L TYPE DIVERSELY-->
                <CNTCD1><![CDATA[<%= CNTCD1%>]]></CNTCD1>
				<CNTCD2><![CDATA[<%= CNTCD2%>]]></CNTCD2>
				<!-- #1804 [Split - 1] [PATENT] Payment Verification - 기능보완  -->
				<verify_flag><![CDATA[<bean:write name="hblVO" property="verify_flag"  filter="false" />]]></verify_flag>
				<!-- #657 [OCEAN BLUE, IMPEX] B/L SELECTION FLAG TO SHOW ON VISIBILITY PORTAL -->
				<inter_use_flag><![CDATA[<bean:write name="hblVO" property="inter_use_flag"  filter="false" />]]></inter_use_flag>
				<!-- OFVFOUR-7736 [SENKO USA] Consignee and Delivery Location -->
				<lgl_addr><![CDATA[<bean:write name="hblVO" property="lgl_addr" filter="false" />]]></lgl_addr>
				
				<berth_dt><![CDATA[<wrt:write name="hblVO" property="berth_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></berth_dt>
		</DATA>
	</logic:notEmpty>    
</logic:empty>
