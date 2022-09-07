<%--
=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
=========================================================
=========================================================
*@FileName   : SAL_TPM_0010AJ.jsp
*@FileTitle  : Trade Partner Entry
*@Description: 
*@author     : Tu.Nguyen - Dou
*@version    : 1.0 - 05/12/2014
*@since      : 05/12/2014

*@Change history:
=========================================================
--%>
<%@ page contentType="text/xml; charset=UTF-8"%>
<%@page pageEncoding="UTF-8"%>
<%@include file="./../../../../../../../../syscommon/header/CLTGSHeader.jsp"%>

<%-- 정상처리 --%>
<logic:empty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
	<logic:notEmpty name="EventResponse" property="mapVal">
		<bean:define id="mdmmcm0070VO" name="EventResponse" property="mapVal"/>
		<bean:define id="tmpMap" name="mdmmcm0070VO" property="key"/>
		<bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
		<DATA>
			<sls_ofc_cd><![CDATA[<bean:write name="tmpMap" property="sls_ofc_cd" filter="false" />]]></sls_ofc_cd>
			<sls_ofc_nm><![CDATA[<bean:write name="tmpMap" property="sls_ofc_nm" filter="false" />]]></sls_ofc_nm>
			<bankCode><![CDATA[<bean:write name="cdMap" property="bankCode" filter="false" />]]></bankCode>
			<rtlPrnrTp><![CDATA[<bean:write name="cdMap" property="rtlPrnrTp" filter="false" />]]></rtlPrnrTp>
			<trdDiv><![CDATA[<bean:write name="cdMap" property="trdDiv" filter="false" />]]></trdDiv>
			<trdp_tp_cd><![CDATA[<bean:write name="tmpMap" property="trdp_tp_cd" filter="false" />]]></trdp_tp_cd>
			<tp_grp><![CDATA[<bean:write name="tmpMap" property="tp_grp" filter="false" />]]></tp_grp>
			<delt_flg><![CDATA[<bean:write name="tmpMap" property="delt_flg" filter="false" />]]></delt_flg>
			<sts_cd><![CDATA[<bean:write name="tmpMap" property="sts_cd" filter="false" />]]></sts_cd>
			<trdp_tp_nm><![CDATA[<bean:write name="tmpMap" property="trdp_tp_nm" filter="false" />]]></trdp_tp_nm>
			<sls_gp_cd><![CDATA[<bean:write name="tmpMap" property="sls_gp_cd" filter="false" />]]></sls_gp_cd>
			<cr_term_cd><![CDATA[<bean:write name="tmpMap" property="cr_term_cd" filter="false" />]]></cr_term_cd>
			<cr_term_dt><![CDATA[<bean:write name="tmpMap" property="cr_term_dt" filter="false" />]]></cr_term_dt>
			<crd_lmt_amt><![CDATA[<bean:write name="tmpMap" property="crd_lmt_amt" filter="false" />]]></crd_lmt_amt>
			<vis_id><![CDATA[<bean:write name="tmpMap" property="vis_id" filter="false" />]]></vis_id>
			<copyFlag><![CDATA[<bean:write name="cdMap" property="copyFlag" filter="false" />]]></copyFlag>
			<f_isNumSep><![CDATA[<bean:write name="cdMap" property="f_isNumSep" filter="false" />]]></f_isNumSep>
			<default_maincmp_yn><![CDATA[<bean:write name="tmpMap" property="default_maincmp_yn" filter="false" />]]></default_maincmp_yn>
			<trdp_cd><![CDATA[<bean:write name="tmpMap" property="trdp_cd" filter="false" />]]></trdp_cd>
			<shrt_nm><![CDATA[<bean:write name="tmpMap" property="shrt_nm" filter="false" />]]></shrt_nm>
			<eng_nm><![CDATA[<bean:write name="tmpMap" property="eng_nm" filter="false" />]]></eng_nm>
			<locl_nm><![CDATA[<bean:write name="tmpMap" property="locl_nm" filter="false" />]]></locl_nm>
			<lgl_addr><![CDATA[<bean:write name="tmpMap" property="lgl_addr" filter="false" />]]></lgl_addr>
			<city_cd><![CDATA[<bean:write name="tmpMap" property="city_cd" filter="false" />]]></city_cd>
			<city_nm><![CDATA[<bean:write name="tmpMap" property="city_nm" filter="false" />]]></city_nm>
			<state_cd><![CDATA[<bean:write name="tmpMap" property="state_cd" filter="false" />]]></state_cd>
			<rep_zip><![CDATA[<bean:write name="tmpMap" property="rep_zip" filter="false" />]]></rep_zip>
			<cnt_cd><![CDATA[<bean:write name="tmpMap" property="cnt_cd" filter="false" />]]></cnt_cd>
			<cnt_nm><![CDATA[<bean:write name="tmpMap" property="cnt_nm" filter="false" />]]></cnt_nm>
			<smt_id><![CDATA[<bean:write name="tmpMap" property="smt_id" filter="false" />]]></smt_id>
			<edi_cust_id><![CDATA[<bean:write name="tmpMap" property="edi_cust_id" filter="false" />]]></edi_cust_id>
			<eng_addr><![CDATA[<bean:write name="tmpMap" property="eng_addr" filter="false" />]]></eng_addr>
			<tax_iss_addr><![CDATA[<bean:write name="tmpMap" property="tax_iss_addr" filter="false" />]]></tax_iss_addr>
			<ceo_nm><![CDATA[<bean:write name="tmpMap" property="ceo_nm" filter="false" />]]></ceo_nm>
			<biz_no><![CDATA[<bean:write name="tmpMap" property="biz_no" filter="false" />]]></biz_no>
			<tax_type><![CDATA[<bean:write name="tmpMap" property="tax_type" filter="false" />]]></tax_type>
			<corp_no><![CDATA[<bean:write name="tmpMap" property="corp_no" filter="false" />]]></corp_no>
			<acct_cd><![CDATA[<bean:write name="tmpMap" property="acct_cd" filter="false" />]]></acct_cd>
			<iata_cd><![CDATA[<bean:write name="tmpMap" property="iata_cd" filter="false" />]]></iata_cd>
			<scac_cd><![CDATA[<bean:write name="tmpMap" property="scac_cd" filter="false" />]]></scac_cd>
			<prefix><![CDATA[<bean:write name="tmpMap" property="prefix" filter="false" />]]></prefix>
			<dcnsl_cd><![CDATA[<bean:write name="tmpMap" property="dcnsl_cd" filter="false" />]]></dcnsl_cd>
			<cbsa_scac_cd><![CDATA[<bean:write name="tmpMap" property="cbsa_scac_cd" filter="false" />]]></cbsa_scac_cd>
			<cmdt_cd><![CDATA[<bean:write name="tmpMap" property="cmdt_cd" filter="false" />]]></cmdt_cd>
			<cmdt_nm><![CDATA[<bean:write name="tmpMap" property="cmdt_nm" filter="false" />]]></cmdt_nm>
			<sls_usrid><![CDATA[<bean:write name="tmpMap" property="sls_usrid" filter="false" />]]></sls_usrid>
			<sls_usrnm><![CDATA[<bean:write name="tmpMap" property="sls_usrnm" filter="false" />]]></sls_usrnm>
			<!-- OFVFOUR-7976: [MATRIX] ADDING CS PIC ON ALL B/L ENTRY AND TRADE PARTNER ENTRY SCREEN -->
			<cs_usrid><![CDATA[<bean:write name="tmpMap" property="cs_usrid" filter="false" />]]></cs_usrid>
			<cs_usrnm><![CDATA[<bean:write name="tmpMap" property="cs_usrnm" filter="false" />]]></cs_usrnm>
			<bill_to_agent><![CDATA[<bean:write name="tmpMap" property="bill_to_agent" filter="false" />]]></bill_to_agent>
			<rgst_usrid><![CDATA[<bean:write name="tmpMap" property="rgst_usrid" filter="false" />]]></rgst_usrid>
			<rgst_dt><![CDATA[<bean:write name="tmpMap" property="rgst_dt" filter="false" />]]></rgst_dt>
			<modi_usrid><![CDATA[<bean:write name="tmpMap" property="modi_usrid" filter="false" />]]></modi_usrid>
			<modi_dt><![CDATA[<bean:write name="tmpMap" property="modi_dt" filter="false" />]]></modi_dt>
			<ar_vat_line><![CDATA[<bean:write name="tmpMap" property="ar_vat_line" filter="false" />]]></ar_vat_line>
			<ap_vat_line><![CDATA[<bean:write name="tmpMap" property="ap_vat_line" filter="false" />]]></ap_vat_line>
			<clm_flg><![CDATA[<bean:write name="tmpMap" property="clm_flg" filter="false" />]]></clm_flg>
			<reserve_field09><![CDATA[<bean:write name="tmpMap" property="reserve_field09" filter="false" />]]></reserve_field09>
			<oi_ref_prfx><![CDATA[<bean:write name="tmpMap" property="oi_ref_prfx" filter="false" />]]></oi_ref_prfx>
			<oi_ref_seq_no><![CDATA[<bean:write name="tmpMap" property="oi_ref_seq_no" filter="false" />]]></oi_ref_seq_no>
			<oe_ref_prfx><![CDATA[<bean:write name="tmpMap" property="oe_ref_prfx" filter="false" />]]></oe_ref_prfx>
			<oe_ref_seq_no><![CDATA[<bean:write name="tmpMap" property="oe_ref_seq_no" filter="false" />]]></oe_ref_seq_no>
			<ai_ref_prfx><![CDATA[<bean:write name="tmpMap" property="ai_ref_prfx" filter="false" />]]></ai_ref_prfx>
			<ai_ref_seq_no><![CDATA[<bean:write name="tmpMap" property="ai_ref_seq_no" filter="false" />]]></ai_ref_seq_no>
			<ae_ref_prfx><![CDATA[<bean:write name="tmpMap" property="ae_ref_prfx" filter="false" />]]></ae_ref_prfx>
			<ae_ref_seq_no><![CDATA[<bean:write name="tmpMap" property="ae_ref_seq_no" filter="false" />]]></ae_ref_seq_no>
			<oe_hbl_prfx><![CDATA[<bean:write name="tmpMap" property="oe_hbl_prfx" filter="false" />]]></oe_hbl_prfx>
			<oe_hbl_seq_no><![CDATA[<bean:write name="tmpMap" property="oe_hbl_seq_no" filter="false" />]]></oe_hbl_seq_no>
			<ae_awb_prfx><![CDATA[<bean:write name="tmpMap" property="ae_awb_prfx" filter="false" />]]></ae_awb_prfx>
			<ae_awb_seq_no><![CDATA[<bean:write name="tmpMap" property="ae_awb_seq_no" filter="false" />]]></ae_awb_seq_no>
			<profit_share><![CDATA[<bean:write name="tmpMap" property="profit_share" filter="false" />]]></profit_share>
			<an_bond_no><![CDATA[<bean:write name="tmpMap" property="an_bond_no" filter="false" />]]></an_bond_no>
			<an_bond_exp_dt><![CDATA[<bean:write name="tmpMap" property="an_bond_exp_dt" filter="false" />]]></an_bond_exp_dt>
			<an_bond_entr_usrid><![CDATA[<bean:write name="tmpMap" property="an_bond_entr_usrid" filter="false" />]]></an_bond_entr_usrid>
			<an_bond_entr_usrnm><![CDATA[<bean:write name="tmpMap" property="an_bond_entr_usrnm" filter="false" />]]></an_bond_entr_usrnm>
			<an_bond_pur_cd><![CDATA[<bean:write name="tmpMap" property="an_bond_pur_cd" filter="false" />]]></an_bond_pur_cd>
			<an_bond_pur_nm><![CDATA[<bean:write name="tmpMap" property="an_bond_pur_nm" filter="false" />]]></an_bond_pur_nm>
			<an_bond_pur_dt><![CDATA[<bean:write name="tmpMap" property="an_bond_pur_dt" filter="false" />]]></an_bond_pur_dt>
			<ofc_hr><![CDATA[<bean:write name="tmpMap" property="ofc_hr" filter="false" />]]></ofc_hr>
			<ctrt_no><![CDATA[<bean:write name="tmpMap" property="ctrt_no" filter="false" />]]></ctrt_no>
			<crd_appr_dt><![CDATA[<bean:write name="tmpMap" property="crd_appr_dt" filter="false" />]]></crd_appr_dt>
			<spi_edi_vndr_cd><![CDATA[<bean:write name="tmpMap" property="spi_edi_vndr_cd" filter="false" />]]></spi_edi_vndr_cd>
			<spi_vndr_mapg_cd><![CDATA[<bean:write name="tmpMap" property="spi_vndr_mapg_cd" filter="false" />]]></spi_vndr_mapg_cd>
			<!-- #3355 [JTC]Dock Receipt 수정 -->
			<ofc_fm_hr><![CDATA[<bean:write name="tmpMap" property="ofc_fm_hr" filter="false" />]]></ofc_fm_hr>
			<ofc_to_hr><![CDATA[<bean:write name="tmpMap" property="ofc_to_hr" filter="false" />]]></ofc_to_hr>
			<dock_rcpt_rmk><![CDATA[<bean:write name="tmpMap" property="dock_rcpt_rmk" filter="false" />]]></dock_rcpt_rmk>
			<agt_edi_cd><![CDATA[<bean:write name="tmpMap" property="agt_edi_cd" filter="false" />]]></agt_edi_cd>
			<agt_edi_msg_tp_cd><![CDATA[<bean:write name="tmpMap" property="agt_edi_msg_tp_cd" filter="false" />]]></agt_edi_msg_tp_cd>
			<shpr_cd><![CDATA[<bean:write name="tmpMap" property="shpr_cd" filter="false" />]]></shpr_cd>
		</DATA>
	</logic:notEmpty>    
</logic:empty>