<%--
=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
=========================================================
=========================================================
*@FileName   : SAL_TPM_0010AJ.jsp
*@FileTitle  : Pre-Pickup Order Entry URL Copy
*@Description: 
*@author     : Tu.Nguyen - Dou
*@version    : 1.0 - 05/12/2014
*@since      : 05/12/2014

*@Change history:
=========================================================
--%>
<%@page import="java.util.List"%>
<%@page import="java.util.HashMap"%>
<%@page import="com.clt.syscommon.response.CommonEventResponse"%>
<%@ page contentType="text/xml; charset=UTF-8"%>
<%@page pageEncoding="UTF-8"%>
<%@include file="./../../../../../../syscommon/header/CLTGSHeader.jsp"%>
<logic:empty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
	<logic:notEmpty name="EventResponse" property="objVal">
		<bean:define id="blinfoVO"   name="EventResponse" property="objVal"/>
		<bean:define id="valMap"  	 name="EventResponse" property="mapVal"/>
		<%
			CommonEventResponse eventResponse = (CommonEventResponse)request.getAttribute("EventResponse");
			String FRTCD1 = " |";
			String FRTCD2 = " |";
			String BL_NO = " ";
			String INTG_BL_SEQ2 = " ";
			String vatFrtCd = "";
			String whldVatFrtCd = "";
			String arrVatFrtCd = "";
			String arrTaxRate = "";
			
			if(null != eventResponse){
				HashMap<String, Object> mapVal = eventResponse.getMapVal();
				
				List<HashMap> FRT_CD_LIST = (List)mapVal.get("FRT_CD_LIST");
				
				boolean isFirst = true;
				boolean isVatFirst = true;
				for(HashMap map : FRT_CD_LIST){
					if(!isFirst){
						FRTCD1 += "|";
						FRTCD2 += "|";
					}else{
						isFirst = false;
					}
					FRTCD1 += map.get("FRT_CD");
					FRTCD2 += map.get("FRT_CD") + " : " + map.get("FRT_CD_NM");
					
					if("VAT".equals((String)map.get("FRT_CLSS_CD"))){
						vatFrtCd = (String)map.get("FRT_CD");
						if(!isVatFirst){
							arrVatFrtCd += "|";
							arrTaxRate += "|";
						}else{
							isVatFirst = false;
						}
						arrVatFrtCd += (String)map.get("FRT_CD");
						arrTaxRate += (String)map.get("TAX_RATE");
					}
					if("WHD".equals((String)map.get("FRT_CLSS_CD"))){
						whldVatFrtCd = (String)map.get("FRT_CD");
					}
				}
			}
			%>
		<DATA>
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
			<inv_dt><![CDATA[<bean:write name="blinfoVO" property="inv_dt" filter="false" />]]></inv_dt>
			<chg_wgt><![CDATA[<bean:write name="blinfoVO" property="chg_wgt" filter="false" />]]></chg_wgt>
			<chg_wgt1><![CDATA[<bean:write name="blinfoVO" property="chg_wgt1" filter="false" />]]></chg_wgt1>
			<agent_chg_wgt1><![CDATA[<bean:write name="blinfoVO" property="agent_chg_wgt1" filter="false" />]]></agent_chg_wgt1>
			<agent_grs_wgt1><![CDATA[<bean:write name="blinfoVO" property="agent_grs_wgt1" filter="false" />]]></agent_grs_wgt1>
			<customer_unit_chk><![CDATA[<bean:write name="blinfoVO" property="customer_unit_chk" filter="false" />]]></customer_unit_chk>
			<mbl_no><![CDATA[<bean:write name="blinfoVO" property="mbl_no" filter="false" />]]></mbl_no>
			<hbl_no><![CDATA[<bean:write name="blinfoVO" property="hbl_no" filter="false" />]]></hbl_no>
			<agent_trdp_nm><![CDATA[<bean:write name="blinfoVO" property="agent_trdp_nm" filter="false" />]]></agent_trdp_nm>
			<shpr_trdp_nm><![CDATA[<bean:write name="blinfoVO" property="shpr_trdp_nm" filter="false" />]]></shpr_trdp_nm>
			<cnee_trdp_nm><![CDATA[<bean:write name="blinfoVO" property="cnee_trdp_nm" filter="false" />]]></cnee_trdp_nm>
			<vsl_flt><![CDATA[<bean:write name="blinfoVO" property="vsl_flt" filter="false" />]]></vsl_flt>
			<por_nm><![CDATA[<bean:write name="blinfoVO" property="por_nm" filter="false" />]]></por_nm>
			<pol_nm><![CDATA[<bean:write name="blinfoVO" property="pol_nm" filter="false" />]]></pol_nm>
			<etd_dt_tm><![CDATA[<bean:write name="blinfoVO" property="etd_dt_tm" filter="false" />]]></etd_dt_tm>
			<pod_nm><![CDATA[<bean:write name="blinfoVO" property="pod_nm" filter="false" />]]></pod_nm>
			<eta_dt_tm><![CDATA[<bean:write name="blinfoVO" property="eta_dt_tm" filter="false" />]]></eta_dt_tm>
			<del_nm><![CDATA[<bean:write name="blinfoVO" property="del_nm" filter="false" />]]></del_nm>
			<fnl_dest_loc_nm><![CDATA[<bean:write name="blinfoVO" property="fnl_dest_loc_nm" filter="false" />]]></fnl_dest_loc_nm>
			<f_eta_dt_tm><![CDATA[<bean:write name="blinfoVO" property="f_eta_dt_tm" filter="false" />]]></f_eta_dt_tm>
			<rep_cmdt_nm><![CDATA[<bean:write name="blinfoVO" property="rep_cmdt_nm" filter="false" />]]></rep_cmdt_nm>
			<pck_qty><![CDATA[<bean:write name="blinfoVO" property="pck_qty" filter="false" />]]></pck_qty>
			<pck_ut_nm><![CDATA[<bean:write name="blinfoVO" property="pck_ut_nm" filter="false" />]]></pck_ut_nm>
			<grs_wgt><![CDATA[<bean:write name="blinfoVO" property="grs_wgt" filter="false" />]]></grs_wgt>
			<grs_wgt1><![CDATA[<bean:write name="blinfoVO" property="grs_wgt1" filter="false" />]]></grs_wgt1>
			<meas><![CDATA[<bean:write name="blinfoVO" property="meas" filter="false" />]]></meas>
			<meas1><![CDATA[<bean:write name="blinfoVO" property="meas1" filter="false" />]]></meas1>
			<vol_wgt><![CDATA[<bean:write name="blinfoVO" property="vol_wgt" filter="false" />]]></vol_wgt>
			<vol_meas><![CDATA[<bean:write name="blinfoVO" property="vol_meas" filter="false" />]]></vol_meas>
			<prnr_trdp_cd><![CDATA[<bean:write name="blinfoVO" property="prnr_trdp_cd" filter="false" />]]></prnr_trdp_cd>
			<prnr_trdp_nm><![CDATA[<bean:write name="blinfoVO" property="prnr_trdp_nm" filter="false" />]]></prnr_trdp_nm>
			
			<bill_to_cd><![CDATA[<bean:write name="blinfoVO" property="bill_to_cd" filter="false" />]]></bill_to_cd>
			<bill_to_nm><![CDATA[<bean:write name="blinfoVO" property="bill_to_nm" filter="false" />]]></bill_to_nm>
			 
			<!-- WMS ACCOUNT LKH 2015.01.20 -->
			<wms_seq><![CDATA[<bean:write name="blinfoVO" property="wms_seq"/>]]></wms_seq>
			<wms_no><![CDATA[<bean:write name="blinfoVO" property="wms_no"/>]]></wms_no>
			
			<FRTCD1><![CDATA[<%= FRTCD1%>]]></FRTCD1>
			<FRTCD2><![CDATA[<%= FRTCD2%>]]></FRTCD2>
			<VAT_FRT_CD><![CDATA[<%= vatFrtCd%>]]></VAT_FRT_CD>
			<WHLD_VAT_FRT_CD><![CDATA[<%= whldVatFrtCd%>]]></WHLD_VAT_FRT_CD>
			<ARR_VAT_FRT_CD><![CDATA[<%= arrVatFrtCd%>]]></ARR_VAT_FRT_CD>
			<ARR_TAX_RATE><![CDATA[<%= arrTaxRate%>]]></ARR_TAX_RATE>
			<m_intg_bl_seq><![CDATA[<bean:write name="blinfoVO" property="m_intg_bl_seq"/>]]></m_intg_bl_seq>
			
			<!-- #2189 [BNX][INDIA] AP Actual Shipper & CNEE 추가 // 1 Master 3 House -->
			<act_shpr_trdp_nm><![CDATA[<bean:write name="blinfoVO" property="act_shpr_trdp_nm" filter="false" />]]></act_shpr_trdp_nm>
			<act_cnee_trdp_nm><![CDATA[<bean:write name="blinfoVO" property="act_cnee_trdp_nm" filter="false" />]]></act_cnee_trdp_nm>
			<!-- #5994 [ACROCARGO] Request to show POR and Carrier Bkg No in both AR, D/C Entry and  -->
			<lnr_bkg_no><![CDATA[<bean:write name="blinfoVO" property="lnr_bkg_no"/>]]></lnr_bkg_no>
			<ntfy_trdp_nm><![CDATA[<bean:write name="blinfoVO" property="ntfy_trdp_nm"/>]]></ntfy_trdp_nm>
			<!-- 	#5894 [Zencon] Credit overlimited TP 에 대한 A/P 제한 -->
			<shpr_trdp_cd><![CDATA[<bean:write name="blinfoVO" property="shpr_trdp_cd" filter="false" />]]></shpr_trdp_cd>
			<act_shpr_trdp_cd><![CDATA[<bean:write name="blinfoVO" property="act_shpr_trdp_cd" filter="false" />]]></act_shpr_trdp_cd>
			<cnee_trdp_cd><![CDATA[<bean:write name="blinfoVO" property="cnee_trdp_cd" filter="false" />]]></cnee_trdp_cd>
		</DATA>
	</logic:notEmpty>    
</logic:empty>
