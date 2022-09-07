<%--
=========================================================
*Copyright(c) 2008 CyberLogitec. All Rights Reserved.
=========================================================
=========================================================
*@FileName   : ACC_INV_0020.jsp
*@FileTitle  : DB/CR
*@Description: DB/CR
*@author     : Hoang.Pham - Cyberlogitec
*@version    : 1.0 - 2014/12/10
*@since      : 2014/12/10

*@Change history:
=========================================================
--%>
<%@page import="java.util.List"%>
<%@page import="java.util.HashMap"%>
<%@page import="com.clt.syscommon.response.CommonEventResponse"%>
<%@ page contentType="text/xml; charset=UTF-8"%>
<%@page pageEncoding="UTF-8"%>
<%@include file="./../../../../../../../../syscommon/header/CLTGSHeader.jsp"%>
<%-- 정상처리 --%>
<logic:empty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
	<logic:notEmpty name="EventResponse" property="objVal">
        	<bean:define id="blinfoVO"   name="EventResponse" property="objVal"/>
			<bean:define id="valMap"  	 name="EventResponse" property="mapVal"/>
			<%
			CommonEventResponse eventResponse = (CommonEventResponse)request.getAttribute("EventResponse");
			String FRTCD1 = " |";
			String FRTCD2 = " |";
			//#4137 DEBIT/CREDIT  ENTRY- B/L no 콤보 값 ISSUE.
			String BL_NO = "";
			String INTG_BL_SEQ2 = "";
			if(null != eventResponse){
				HashMap<String, Object> mapVal = eventResponse.getMapVal();
				
				List<HashMap> FRT_CD_LIST = (List)mapVal.get("FRT_CD_LIST");
				
				boolean isFirst = true;
				for(HashMap map : FRT_CD_LIST){
					if(!isFirst){
						FRTCD1 += "|";
						FRTCD2 += "|";
					}else{
						isFirst = false;
					}
					FRTCD1 += map.get("FRT_CD");
					FRTCD2 += map.get("FRT_CD") + " : " + map.get("FRT_CD_NM");
				}
				
				List<HashMap> BL_LIST = (List)mapVal.get("BL_LIST");
				
				isFirst = true;
				for(HashMap map : BL_LIST){
					if(!isFirst){
						BL_NO += "|";
						INTG_BL_SEQ2 += "|";
					}else{
						isFirst = false;
					}
					if(map.get("BL_NO") != null){
						if(map.get("BL_NO").equals("")){
							BL_NO += " ";
						}else{
							BL_NO += map.get("BL_NO");
						}
					}
					INTG_BL_SEQ2 += map.get("INTG_BL_SEQ");
				}
			}
			%>
		<DATA>
			<prnr_trdp_cd><![CDATA[<bean:write name="blinfoVO" property="prnr_trdp_cd" filter="false" />]]></prnr_trdp_cd>
			<intg_bl_seq><![CDATA[<bean:write name="blinfoVO" property="intg_bl_seq" filter="false" />]]></intg_bl_seq>
			<oth_seq><![CDATA[<bean:write name="blinfoVO" property="oth_seq" filter="false" />]]></oth_seq>
			<air_sea_clss_cd><![CDATA[<bean:write name="blinfoVO" property="air_sea_clss_cd" filter="false" />]]></air_sea_clss_cd>
			<biz_clss_cd><![CDATA[<bean:write name="blinfoVO" property="biz_clss_cd" filter="false" />]]></biz_clss_cd>
			<bnd_clss_cd><![CDATA[<bean:write name="blinfoVO" property="bnd_clss_cd" filter="false" />]]></bnd_clss_cd>
			<inv_seq><![CDATA[<bean:write name="blinfoVO" property="inv_seq" filter="false" />]]></inv_seq>
			<bl_cnt_cd><![CDATA[<bean:write name="blinfoVO" property="bl_cnt_cd" filter="false" />]]></bl_cnt_cd>
			<ref_ofc_cd><![CDATA[<bean:write name="blinfoVO" property="ref_ofc_cd" filter="false" />]]></ref_ofc_cd>
			<bl_no><![CDATA[<bean:write name="blinfoVO" property="bl_no" filter="false" />]]></bl_no>
			<ref_no><![CDATA[<bean:write name="blinfoVO" property="ref_no" filter="false" />]]></ref_no>
			<oth_no><![CDATA[<bean:write name="blinfoVO" property="oth_no" filter="false" />]]></oth_no>
			<inv_no><![CDATA[<bean:write name="blinfoVO" property="inv_no" filter="false" />]]></inv_no>
			<agent_ps_code><![CDATA[<bean:write name="blinfoVO" property="agent_ps_code" filter="false" />]]></agent_ps_code>
			<post_dt><![CDATA[<bean:write name="blinfoVO" property="post_dt" filter="false" />]]></post_dt>
			<slip_post><![CDATA[<bean:write name="blinfoVO" property="slip_post" filter="false" />]]></slip_post>
			<block_post><![CDATA[<bean:write name="blinfoVO" property="block_post" filter="false" />]]></block_post>
			<max_jnr_dt><![CDATA[<bean:write name="valMap" property="max_jnr_dt" filter="false" />]]></max_jnr_dt>
			<post_dt_inv><![CDATA[<bean:write name="blinfoVO" property="post_dt_inv" filter="false" />]]></post_dt_inv>
			<chk_fr_trdp_cd><![CDATA[<bean:write name="blinfoVO" property="chk_fr_trdp_cd" filter="false" />]]></chk_fr_trdp_cd>
			<chk_fr_inv_curr_cd><![CDATA[<bean:write name="blinfoVO" property="chk_fr_inv_curr_cd" filter="false" />]]></chk_fr_inv_curr_cd>
			<chk_fr_frt_seq><![CDATA[<bean:write name="blinfoVO" property="chk_fr_frt_seq" filter="false" />]]></chk_fr_frt_seq>
			<agent_chg_wgt><![CDATA[<bean:write name="blinfoVO" property="agent_chg_wgt" filter="false" />]]></agent_chg_wgt>
			<agent_grs_wgt><![CDATA[<bean:write name="blinfoVO" property="agent_grs_wgt" filter="false" />]]></agent_grs_wgt>
			<logo1><![CDATA[<bean:write name="blinfoVO" property="logo1" filter="false" />]]></logo1>
			<inv_dt><![CDATA[<bean:write name="blinfoVO" property="inv_dt" filter="false" />]]></inv_dt>
			<chg_wgt><![CDATA[<bean:write name="blinfoVO" property="chg_wgt" filter="false" />]]></chg_wgt>
			<chg_wgt1><![CDATA[<bean:write name="blinfoVO" property="chg_wgt1" filter="false" />]]></chg_wgt1>
			<agent_chg_wgt1><![CDATA[<bean:write name="blinfoVO" property="agent_chg_wgt1" filter="false" />]]></agent_chg_wgt1>
			<agent_grs_wgt1><![CDATA[<bean:write name="blinfoVO" property="agent_grs_wgt1" filter="false" />]]></agent_grs_wgt1>
			<customer_unit_chk><![CDATA[<bean:write name="blinfoVO" property="customer_unit_chk" filter="false" />]]></customer_unit_chk>
			<agent_unit_chk><![CDATA[<bean:write name="blinfoVO" property="agent_unit_chk" filter="false" />]]></agent_unit_chk>
			<grs_wgt><![CDATA[<bean:write name="blinfoVO" property="grs_wgt" filter="false" />]]></grs_wgt>
			<grs_wgt1><![CDATA[<bean:write name="blinfoVO" property="grs_wgt1" filter="false" />]]></grs_wgt1>
			<meas><![CDATA[<bean:write name="blinfoVO" property="meas" filter="false" />]]></meas>
			<prnr_trdp_nm><![CDATA[<bean:write name="blinfoVO" property="prnr_trdp_nm" filter="false" />]]></prnr_trdp_nm>
			<cust_rt><![CDATA[<bean:write name="blinfoVO" property="cust_rt" filter="false" />]]></cust_rt>
			<prnr_trdp_cd2><![CDATA[<bean:write name="blinfoVO" property="prnr_trdp_cd2" filter="false" />]]></prnr_trdp_cd2>
			<agent_rt><![CDATA[<bean:write name="blinfoVO" property="agent_rt" filter="false" />]]></agent_rt>
			<agent_amt><![CDATA[<bean:write name="blinfoVO" property="agent_amt" filter="false" />]]></agent_amt>
			<shp_mod_cd><![CDATA[<bean:write name="blinfoVO" property="shp_mod_cd" filter="false" />]]></shp_mod_cd>
			<cust_amt><![CDATA[<bean:write name="blinfoVO" property="cust_amt" filter="false" />]]></cust_amt>
			<mbl_no><![CDATA[<bean:write name="blinfoVO" property="mbl_no" filter="false" />]]></mbl_no>
			<hbl_no><![CDATA[<bean:write name="blinfoVO" property="hbl_no" filter="false" />]]></hbl_no>
			<vsl_flt><![CDATA[<bean:write name="blinfoVO" property="vsl_flt" filter="false" />]]></vsl_flt>
			<shpr_trdp_nm><![CDATA[<bean:write name="blinfoVO" property="shpr_trdp_nm" filter="false" />]]></shpr_trdp_nm>
			<cnee_trdp_nm><![CDATA[<bean:write name="blinfoVO" property="cnee_trdp_nm" filter="false" />]]></cnee_trdp_nm>
			<pol_nm><![CDATA[<bean:write name="blinfoVO" property="pol_nm" filter="false" />]]></pol_nm>
			<etd_dt_tm><![CDATA[<bean:write name="blinfoVO" property="etd_dt_tm" filter="false" />]]></etd_dt_tm>
			<pod_nm><![CDATA[<bean:write name="blinfoVO" property="pod_nm" filter="false" />]]></pod_nm>
			<eta_dt_tm><![CDATA[<bean:write name="blinfoVO" property="eta_dt_tm" filter="false" />]]></eta_dt_tm>
			<por_nm><![CDATA[<bean:write name="blinfoVO" property="por_nm" filter="false" />]]></por_nm>
			<del_nm><![CDATA[<bean:write name="blinfoVO" property="del_nm" filter="false" />]]></del_nm>
			<fnl_dest_loc_nm><![CDATA[<bean:write name="blinfoVO" property="fnl_dest_loc_nm" filter="false" />]]></fnl_dest_loc_nm>
			<f_eta_dt_tm><![CDATA[<bean:write name="blinfoVO" property="f_eta_dt_tm" filter="false" />]]></f_eta_dt_tm>
			<rep_cmdt_nm><![CDATA[<bean:write name="blinfoVO" property="rep_cmdt_nm" filter="false" />]]></rep_cmdt_nm>
			<pck_qty><![CDATA[<bean:write name="blinfoVO" property="pck_qty" filter="false" />]]></pck_qty>
			<pck_ut_nm><![CDATA[<bean:write name="blinfoVO" property="pck_ut_nm" filter="false" />]]></pck_ut_nm>
			<meas1><![CDATA[<bean:write name="blinfoVO" property="meas1" filter="false" />]]></meas1>
			<vol_wgt><![CDATA[<bean:write name="blinfoVO" property="vol_wgt" filter="false" />]]></vol_wgt>
			<vol_meas><![CDATA[<bean:write name="blinfoVO" property="vol_meas" filter="false" />]]></vol_meas>
			<imp_ref_no><![CDATA[<bean:write name="blinfoVO" property="imp_ref_no" filter="false" />]]></imp_ref_no>
			<profit_share><![CDATA[<bean:write name="blinfoVO" property="profit_share" filter="false" />]]></profit_share>
			<inco_cd><![CDATA[<bean:write name="blinfoVO" property="inco_cd" filter="false" />]]></inco_cd>
			<FRTCD1><![CDATA[<%= FRTCD1%>]]></FRTCD1>
			<FRTCD2><![CDATA[<%= FRTCD2%>]]></FRTCD2>
			<BL_NO><![CDATA[<%= BL_NO%>]]></BL_NO>
			<INTG_BL_SEQ2><![CDATA[<%= INTG_BL_SEQ2%>]]></INTG_BL_SEQ2>
			<m_intg_bl_seq><![CDATA[<bean:write name="blinfoVO" property="m_intg_bl_seq"/>]]></m_intg_bl_seq>
			<!-- #5994 [ACROCARGO] Request to show POR and Carrier Bkg No in both AR, D/C Entry and  -->
			<lnr_bkg_no><![CDATA[<bean:write name="blinfoVO" property="lnr_bkg_no"/>]]></lnr_bkg_no>
			<ntfy_trdp_nm><![CDATA[<bean:write name="blinfoVO" property="ntfy_trdp_nm"/>]]></ntfy_trdp_nm>
		</DATA>
	</logic:notEmpty>    
</logic:empty>
