<%--
=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
=========================================================
=========================================================
*@FileName   : SEE_BMD_0150AJ.jsp
*@FileTitle  : OEH Certificate of Origin
*@Description: 
*@author     : Diem.Huynh - Dou
*@version    : 1.0 - 01/05/2018
*@since      : 05/12/2014

*@Change history:
=========================================================
--%>
<%@ page contentType="text/xml; charset=UTF-8"%>
<%@page pageEncoding="UTF-8"%>
<%@page import="java.util.List"%>
<%@page import="java.util.Iterator"%>
<%@page import="java.util.Set"%>
<%@page import="java.util.HashMap"%>
<%@page import="com.clt.syscommon.response.CommonEventResponse"%>
<%@page import="com.clt.apps.fis.mdm.mcm.bank.dto.BankVO"%>
<%@include file="./../../../../../../syscommon/header/CLTGSHeader.jsp"%>
<logic:empty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
	<logic:notEmpty name="EventResponse" property="mapVal">
		<bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
     	<bean:define id="cdList" name="cdMap" property="GL_CODE"/>
     	<bean:define id="cdList1" name="cdMap" property="FREIGHT_CODE"/>
     	<bean:define id="cdList2" name="cdMap" property="FREIGHT_CODE_NW"/>
     	
     	<bean:define id="fontSize" name="cdMap" property="PARAM1"/>
     	<bean:define id="wgtUtCd" name="cdMap" property="PARAM2"/>
     	<bean:define id="measUtCd" name="cdMap" property="PARAM3"/>
     	<bean:define id="length" name="cdMap" property="PARAM4"/>
     	<bean:define id="postDate" name="cdMap" property="PARAM5"/>
     	<bean:define id="taxType" name="cdMap" property="PARAM6"/>
     	<bean:define id="invPostDate" name="cdMap" property="PARAM7"/>

     	<bean:define id="impPostDate" name="cdMap" property="PARAM8"/>
     	<bean:define id="cdList_tz" name="cdMap" property="PARAM9"/>
     	<bean:define id="invRefDate" name="cdMap" property="PARAM10"/>
     	<bean:define id="round" name="cdMap" property="PARAM11"/>
     	<bean:define id="ofcVO"  name="EventResponse" property="objVal"/>
     	<%
     	//#2113 [PATENT] Bank Account - Office 항목 지정에 따른 사용분류
		CommonEventResponse eventResponse = (CommonEventResponse)request.getAttribute("EventResponse");
		String BANKCD1 = " |";
		String BANKCD2 = " |";

		if(null != eventResponse){
			HashMap<String, Object> mapVal = eventResponse.getMapVal();
			
			boolean isFirst = true;

			BankVO bankVO = null;
			List bankList = (List)mapVal.get("BANK_LIST");
			for(int i = 0; i < bankList.size(); i++){
				bankVO = (BankVO)bankList.get(i);				
				if(!isFirst){
					BANKCD1 += "|";
					BANKCD2 += "|";
				}else{
					isFirst = false;
				}
				BANKCD1 += bankVO.getBank_seq();
				BANKCD2 += bankVO.getBank_nm();
			}
		}
		%>
		<DATA>
			<f_isNumSep><![CDATA[<bean:write name="cdMap" property="f_isNumSep" filter="false" />]]></f_isNumSep>
			<s_ofc_cd><![CDATA[<bean:write name="cdMap" property="s_ofc_cd" filter="false" />]]></s_ofc_cd>
			<s_ofc_nm><![CDATA[<bean:write name="cdMap" property="s_ofc_nm" filter="false" />]]></s_ofc_nm>
			<sys_ofc_cd><![CDATA[<bean:write name="ofcVO" property="sys_ofc_cd" filter="false" />]]></sys_ofc_cd>
			<ofc_cd><![CDATA[<bean:write name="ofcVO" property="ofc_cd" filter="false" />]]></ofc_cd>
			<use_flg><![CDATA[<bean:write name="ofcVO" property="use_flg" filter="false" />]]></use_flg>
			<is_co_flg><![CDATA[<bean:write name="ofcVO" property="is_co_flg" filter="false" />]]></is_co_flg>
			<cnt_cd><![CDATA[<bean:write name="ofcVO" property="cnt_cd" filter="false" />]]></cnt_cd>
			<cnt_nm><![CDATA[<bean:write name="ofcVO" property="cnt_nm" filter="false" />]]></cnt_nm>
			<state_cd><![CDATA[<bean:write name="ofcVO" property="state_cd" filter="false" />]]></state_cd>
			<state_nm><![CDATA[<bean:write name="ofcVO" property="state_nm" filter="false" />]]></state_nm>
			<loc_cd><![CDATA[<bean:write name="ofcVO" property="loc_cd" filter="false" />]]></loc_cd>
			<loc_nm><![CDATA[<bean:write name="ofcVO" property="loc_nm" filter="false" />]]></loc_nm>
			<prnt_ofc_cd><![CDATA[<bean:write name="ofcVO" property="prnt_ofc_cd" filter="false" />]]></prnt_ofc_cd>
			<prnt_ofc_nm><![CDATA[<bean:write name="ofcVO" property="prnt_ofc_nm" filter="false" />]]></prnt_ofc_nm>
			<time_zone><![CDATA[<bean:write name="ofcVO" property="time_zone" filter="false" />]]></time_zone>
			<!-- Basis Setting tab -->
			<kgs_lbs_auto_calc><![CDATA[<bean:write name="ofcVO" property="kgs_lbs_auto_calc" filter="false" />]]></kgs_lbs_auto_calc>
			<air_grs_wgt_dcm_plc><![CDATA[<bean:write name="ofcVO" property="air_grs_wgt_dcm_plc" filter="false" />]]></air_grs_wgt_dcm_plc>
			<air_grs_wgt_rnd><![CDATA[<bean:write name="ofcVO" property="air_grs_wgt_rnd" filter="false" />]]></air_grs_wgt_rnd>
			<air_chg_wgt_dcm_plc><![CDATA[<bean:write name="ofcVO" property="air_chg_wgt_dcm_plc" filter="false" />]]></air_chg_wgt_dcm_plc>
			<air_chg_wgt_rnd><![CDATA[<bean:write name="ofcVO" property="air_chg_wgt_rnd" filter="false" />]]></air_chg_wgt_rnd>
			<air_vol_wgt_dcm_plc><![CDATA[<bean:write name="ofcVO" property="air_vol_wgt_dcm_plc" filter="false" />]]></air_vol_wgt_dcm_plc>
			<air_vol_wgt_rnd><![CDATA[<bean:write name="ofcVO" property="air_vol_wgt_rnd" filter="false" />]]></air_vol_wgt_rnd>
			<sea_grs_wgt_dcm_plc><![CDATA[<bean:write name="ofcVO" property="sea_grs_wgt_dcm_plc" filter="false" />]]></sea_grs_wgt_dcm_plc>
			<sea_grs_wgt_rnd><![CDATA[<bean:write name="ofcVO" property="sea_grs_wgt_rnd" filter="false" />]]></sea_grs_wgt_rnd>
			<sea_vol_wgt_dcm_plc><![CDATA[<bean:write name="ofcVO" property="sea_vol_wgt_dcm_plc" filter="false" />]]></sea_vol_wgt_dcm_plc>
			<sea_vol_wgt_rnd><![CDATA[<bean:write name="ofcVO" property="sea_vol_wgt_rnd" filter="false" />]]></sea_vol_wgt_rnd>
			<sts_set><![CDATA[<bean:write name="ofcVO" property="sts_set" filter="false" />]]></sts_set>
			<no_mbl><![CDATA[<bean:write name="ofcVO" property="no_mbl" filter="false" />]]></no_mbl>
			<cre_hbl_flg><![CDATA[<bean:write name="ofcVO" property="cre_hbl_flg" filter="false" />]]></cre_hbl_flg>
			<prn_cre_inv><![CDATA[<bean:write name="ofcVO" property="prn_cre_inv" filter="false" />]]></prn_cre_inv>
			<inv_apro><![CDATA[<bean:write name="ofcVO" property="inv_apro" filter="false" />]]></inv_apro>
			<csr_apro><![CDATA[<bean:write name="ofcVO" property="csr_apro" filter="false" />]]></csr_apro>
			
			<sls_ofc_cd><![CDATA[<bean:write name="ofcVO" property="sls_ofc_cd" filter="false" />]]></sls_ofc_cd>
			<sls_ofc_nm><![CDATA[<bean:write name="ofcVO" property="sls_ofc_nm" filter="false" />]]></sls_ofc_nm>
			<finc_ofc_cd><![CDATA[<bean:write name="ofcVO" property="finc_ofc_cd" filter="false" />]]></finc_ofc_cd>
			<finc_ofc_nm><![CDATA[<bean:write name="ofcVO" property="finc_ofc_nm" filter="false" />]]></finc_ofc_nm>
			<trf_cur_cd><![CDATA[<bean:write name="ofcVO" property="trf_cur_cd" filter="false" />]]></trf_cur_cd>
			
			<!-- #138 Local Currency 추가 -->
			<locl_curr_cd><![CDATA[<bean:write name="ofcVO" property="locl_curr_cd" filter="false" />]]></locl_curr_cd>
			<!-- #829 Default Report Type -->
			<rpt_tp_cd><![CDATA[<bean:write name="ofcVO" property="rpt_tp_cd" filter="false" />]]></rpt_tp_cd>
			
			<ofc_eng_nm><![CDATA[<bean:write name="ofcVO" property="ofc_eng_nm" filter="false" />]]></ofc_eng_nm>
			<ofc_locl_nm><![CDATA[<bean:write name="ofcVO" property="ofc_locl_nm" filter="false" />]]></ofc_locl_nm>
			<ofc_rep_nm><![CDATA[<bean:write name="ofcVO" property="ofc_rep_nm" filter="false" />]]></ofc_rep_nm>
			<descr><![CDATA[<bean:write name="ofcVO" property="descr" filter="false" />]]></descr>
			<ofc_addr><![CDATA[<bean:write name="ofcVO" property="ofc_addr" filter="false" />]]></ofc_addr>
			<ofc_zip><![CDATA[<bean:write name="ofcVO" property="ofc_zip" filter="false" />]]></ofc_zip>
			<ofc_phn><![CDATA[<bean:write name="ofcVO" property="ofc_phn" filter="false" />]]></ofc_phn>
			<ofc_fax><![CDATA[<bean:write name="ofcVO" property="ofc_fax" filter="false" />]]></ofc_fax>
			<ofc_email><![CDATA[<bean:write name="ofcVO" property="ofc_email" filter="false" />]]></ofc_email>
			<ofc_url><![CDATA[<bean:write name="ofcVO" property="ofc_url" filter="false" />]]></ofc_url>
			<iata_cd><![CDATA[<bean:write name="ofcVO" property="iata_cd" filter="false" />]]></iata_cd>
			<fmc_no><![CDATA[<bean:write name="ofcVO" property="fmc_no" filter="false" />]]></fmc_no>
			<tax_type><![CDATA[<bean:write name="ofcVO" property="tax_type" filter="false" />]]></tax_type>
			<tax_no><![CDATA[<bean:write name="ofcVO" property="tax_no" filter="false" />]]></tax_no>
			<tsa_sec_no><![CDATA[<bean:write name="ofcVO" property="tsa_sec_no" filter="false" />]]></tsa_sec_no>
			<use_hbl_ser><![CDATA[<bean:write name="ofcVO" property="use_hbl_ser" filter="false" />]]></use_hbl_ser>
			
			
			<aes_cntc_nm><![CDATA[<bean:write name="ofcVO" property="aes_cntc_nm" filter="false" />]]></aes_cntc_nm>
			<aes_addr><![CDATA[<bean:write name="ofcVO" property="aes_addr" filter="false" />]]></aes_addr>
			<aes_city><![CDATA[<bean:write name="ofcVO" property="aes_city" filter="false" />]]></aes_city>
			<aes_state_cd><![CDATA[<bean:write name="ofcVO" property="aes_state_cd" filter="false" />]]></aes_state_cd>
			<aes_zip><![CDATA[<bean:write name="ofcVO" property="aes_zip" filter="false" />]]></aes_zip>
			<aes_cnt_cd><![CDATA[<bean:write name="ofcVO" property="aes_cnt_cd" filter="false" />]]></aes_cnt_cd>
			<aes_rspn_email><![CDATA[<bean:write name="ofcVO" property="aes_rspn_email" filter="false" />]]></aes_rspn_email>
			<aes_prt_type><![CDATA[<bean:write name="ofcVO" property="aes_prt_type" filter="false" />]]></aes_prt_type>
			
			<it_next_no><![CDATA[<bean:write name="ofcVO" property="it_next_no" filter="false" />]]></it_next_no>
			<it_end><![CDATA[<bean:write name="ofcVO" property="it_end" filter="false" />]]></it_end>
			
			<ccn_prfx><![CDATA[<bean:write name="ofcVO" property="ccn_prfx" filter="false" />]]></ccn_prfx>
			<oi_ccn_seqno><![CDATA[<bean:write name="ofcVO" property="oi_ccn_seqno" filter="false" />]]></oi_ccn_seqno>
			<ai_ccn_seqno><![CDATA[<bean:write name="ofcVO" property="ai_ccn_seqno" filter="false" />]]></ai_ccn_seqno>
			
			<oth_wgt_ut_cd><![CDATA[<bean:write name="ofcVO" property="oth_wgt_ut_cd" filter="false" />]]></oth_wgt_ut_cd>
			<oth_meas_ut_cd><![CDATA[<bean:write name="ofcVO" property="oth_meas_ut_cd" filter="false" />]]></oth_meas_ut_cd>
			<oth_size_ut_cd><![CDATA[<bean:write name="ofcVO" property="oth_size_ut_cd" filter="false" />]]></oth_size_ut_cd>
			
			<logo_square_filenm><![CDATA[<bean:write name="ofcVO" property="logo_square_filenm" filter="false" />]]></logo_square_filenm>
			<logo_square><![CDATA[<bean:write name="ofcVO" property="logo_square" filter="false" />]]></logo_square>
			<logo_rectangle_filenm><![CDATA[<bean:write name="ofcVO" property="logo_rectangle_filenm" filter="false" />]]></logo_rectangle_filenm>
			<logo_rectangle><![CDATA[<bean:write name="ofcVO" property="logo_rectangle" filter="false" />]]></logo_rectangle>
			<logo_sub_filenm><![CDATA[<bean:write name="ofcVO" property="logo_sub_filenm" filter="false" />]]></logo_sub_filenm>
			<logo_sub><![CDATA[<bean:write name="ofcVO" property="logo_sub" filter="false" />]]></logo_sub>
			
			<rvn_bank_seq><![CDATA[<bean:write name="ofcVO" property="rvn_bank_seq" filter="false" />]]></rvn_bank_seq>
			<cost_bank_seq><![CDATA[<bean:write name="ofcVO" property="cost_bank_seq" filter="false" />]]></cost_bank_seq>
			
			<pps_use_flg><![CDATA[<bean:write name="ofcVO" property="pps_use_flg" filter="false" />]]></pps_use_flg>
			<pps_payto_trdp_cd><![CDATA[<bean:write name="ofcVO" property="pps_payto_trdp_cd" filter="false" />]]></pps_payto_trdp_cd>
			<pps_payto_trdp_nm><![CDATA[<bean:write name="ofcVO" property="pps_payto_trdp_nm" filter="false" />]]></pps_payto_trdp_nm>
			<pps_cntr20_rt><![CDATA[<bean:write name="ofcVO" property="pps_cntr20_rt" filter="false" />]]></pps_cntr20_rt>
			<pps_cntr40_rt><![CDATA[<bean:write name="ofcVO" property="pps_cntr40_rt" filter="false" />]]></pps_cntr40_rt>
			<pps_cbm_rt><![CDATA[<bean:write name="ofcVO" property="pps_cbm_rt" filter="false" />]]></pps_cbm_rt>
			
			<ctf_use_flg><![CDATA[<bean:write name="ofcVO" property="ctf_use_flg" filter="false" />]]></ctf_use_flg>
			<ctf_payto_trdp_cd><![CDATA[<bean:write name="ofcVO" property="ctf_payto_trdp_cd" filter="false" />]]></ctf_payto_trdp_cd>
			<ctf_payto_trdp_nm><![CDATA[<bean:write name="ofcVO" property="ctf_payto_trdp_nm" filter="false" />]]></ctf_payto_trdp_nm>
			<ctf_cntr20_rt><![CDATA[<bean:write name="ofcVO" property="ctf_cntr20_rt" filter="false" />]]></ctf_cntr20_rt>
			<ctf_cntr40_rt><![CDATA[<bean:write name="ofcVO" property="ctf_cntr40_rt" filter="false" />]]></ctf_cntr40_rt>
			<ctf_cbm_rt><![CDATA[<bean:write name="ofcVO" property="ctf_cbm_rt" filter="false" />]]></ctf_cbm_rt>
			<cf_use_flg><![CDATA[<bean:write name="ofcVO" property="cf_use_flg" filter="false" />]]></cf_use_flg>
			<cf_payto_trdp_cd><![CDATA[<bean:write name="ofcVO" property="cf_payto_trdp_cd" filter="false" />]]></cf_payto_trdp_cd>
			<cf_payto_trdp_nm><![CDATA[<bean:write name="ofcVO" property="cf_payto_trdp_nm" filter="false" />]]></cf_payto_trdp_nm>
			<cf_cntr20_rt><![CDATA[<bean:write name="ofcVO" property="cf_cntr20_rt" filter="false" />]]></cf_cntr20_rt>
			<cf_cntr40_rt><![CDATA[<bean:write name="ofcVO" property="cf_cntr40_rt" filter="false" />]]></cf_cntr40_rt>
			<cf_cbm_rt><![CDATA[<bean:write name="ofcVO" property="cf_cbm_rt" filter="false" />]]></cf_cbm_rt>
			
			<stamp_normal_filenm><![CDATA[<bean:write name="ofcVO" property="stamp_normal_filenm" filter="false" />]]></stamp_normal_filenm>
			<stamp_normal><![CDATA[<bean:write name="ofcVO" property="stamp_normal" filter="false" />]]></stamp_normal>	
			<stamp_guarantee_filenm><![CDATA[<bean:write name="ofcVO" property="stamp_guarantee_filenm" filter="false" />]]></stamp_guarantee_filenm>
			<stamp_guarantee><![CDATA[<bean:write name="ofcVO" property="stamp_guarantee" filter="false" />]]></stamp_guarantee>
			
			<!-- #376 [ZEN] OFFICE CODE > ACCCOUTING OPTION > INVOICE POST DAET OPTION -->
			<post_dt_acct><![CDATA[<bean:write name="ofcVO" property="post_dt_acct" filter="false" />]]></post_dt_acct>
			
			<!-- Accounting Decimal Point -->
			<vat_rt_dp_cnt><![CDATA[<bean:write name="ofcVO" property="vat_rt_dp_cnt" filter="false" />]]></vat_rt_dp_cnt>
			<xch_rt_dp_cnt><![CDATA[<bean:write name="ofcVO" property="xch_rt_dp_cnt" filter="false" />]]></xch_rt_dp_cnt>

			<!-- WMS-->
			<wh_sto_acc_cd><![CDATA[<bean:write name="ofcVO" property="wh_sto_acc_cd" filter="false" />]]></wh_sto_acc_cd>

			
			<!-- #673 [BNX] [ACL] 폴란드 오피스 요구사항 
			<nip><![CDATA[<bean:write name="ofcVO" property="nip" filter="false" />]]></nip>
			<vat_id_ue><![CDATA[<bean:write name="ofcVO" property="vat_id_ue" filter="false" />]]></vat_id_ue>-->
			
			
			
			<!-- #1098 [BNX] INDIA 오피스 - 요구사항 항목 -->
			<tax_opt><![CDATA[<bean:write name="ofcVO" property="tax_opt" filter="false" />]]></tax_opt>
			

			<!--<oe_lnr_bkg_ymd_prfx><![CDATA[<bean:write name="ofcVO" property="oe_lnr_bkg_ymd_prfx" filter="false" />]]></oe_lnr_bkg_ymd_prfx>
			<oe_bkg_ymd_prfx><![CDATA[<bean:write name="ofcVO" property="oe_bkg_ymd_prfx" filter="false" />]]></oe_bkg_ymd_prfx>
			<oe_hbl_ymd_prfx><![CDATA[<bean:write name="ofcVO" property="oe_hbl_ymd_prfx" filter="false" />]]></oe_hbl_ymd_prfx>
			<ae_awb_ymd_pfx><![CDATA[<bean:write name="ofcVO" property="ae_awb_ymd_pfx" filter="false" />]]></ae_awb_ymd_pfx>-->
			<BANKCD1><![CDATA[<%= BANKCD1%>]]></BANKCD1>
			<BANKCD2><![CDATA[<%= BANKCD2%>]]></BANKCD2>
			
			<dsclm_rmk><![CDATA[<bean:write name="ofcVO" property="dsclm_rmk" filter="false" />]]></dsclm_rmk>

			<!-- #3410 [JTC]Ocean Export/Import 수정 사항 
			<i_ae_awb_ymd_seq><![CDATA[<bean:write name="ofcVO" property="ae_awb_ymd_seq" filter="false" />]]></i_ae_awb_ymd_seq>
			<i_oe_hbl_ymd_seq><![CDATA[<bean:write name="ofcVO" property="oe_hbl_ymd_seq" filter="false" />]]></i_oe_hbl_ymd_seq>
			<i_oe_bkg_ymd_seq><![CDATA[<bean:write name="ofcVO" property="oe_bkg_ymd_seq" filter="false" />]]></i_oe_bkg_ymd_seq>
			<i_oe_lnr_bkg_ymd_seq><![CDATA[<bean:write name="ofcVO" property="oe_lnr_bkg_ymd_seq" filter="false" />]]></i_oe_lnr_bkg_ymd_seq>-->

		</DATA>
	</logic:notEmpty>    
</logic:empty>
