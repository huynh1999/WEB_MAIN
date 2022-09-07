<%--
=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
=========================================================
=========================================================
*@FileName   : AIE_BMD_0120AJ.jsp
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
			<saveFlg><![CDATA[<bean:write name="valMap" property="saveFlg" filter="false" />]]></saveFlg>
			<rep_cmdt_cd><![CDATA[<bean:write name="hblVO" property="rep_cmdt_cd" filter="false" />]]></rep_cmdt_cd>
			<rep_cmdt_nm><![CDATA[<bean:write name="hblVO" property="rep_cmdt_nm" filter="false" />]]></rep_cmdt_nm>
			<cmdt_ut1><![CDATA[<bean:write name="hblVO" property="cmdt_ut1" filter="false" />]]></cmdt_ut1>
			<cmdt_ut2><![CDATA[<bean:write name="hblVO" property="cmdt_ut2" filter="false" />]]></cmdt_ut2>
			<pck_qty><![CDATA[<bean:write name="hblVO" property="pck_qty" filter="false" />]]></pck_qty>
			<wgt><![CDATA[<bean:write name="hblVO" property="wgt" filter="false" />]]></wgt>
			<decl_cstms_val><![CDATA[<bean:write name="hblVO" property="decl_cstms_val" filter="false" />]]></decl_cstms_val>
			<cntr_add_flg><![CDATA[<bean:write name="hblVO" property="cntr_add_flg" filter="false" />]]></cntr_add_flg>
			<hbl_no><![CDATA[<bean:write name="hblVO" property="hbl_no" filter="false" />]]></hbl_no>
			<intg_bl_seq><![CDATA[<bean:write name="hblVO" property="intg_bl_seq" filter="false" />]]></intg_bl_seq>
			<pol_cd><![CDATA[<bean:write name="hblVO" property="pol_cd" filter="false" />]]></pol_cd>
			<pol_nm><![CDATA[<bean:write name="hblVO" property="pol_nm" filter="false" />]]></pol_nm>
			<aes_sts><![CDATA[<bean:write name="hblVO" property="aes_sts" filter="false" />]]></aes_sts>
			<lnr_bkg_no><![CDATA[<bean:write name="hblVO" property="lnr_bkg_no" filter="false" />]]></lnr_bkg_no>
			<etd_dt_tm><![CDATA[<wrt:write name="hblVO" property="etd_dt_tm" formatType="DATE" fromFormat="yyyyMMdd" format="MM-dd-yyyy" filter="false" />]]></etd_dt_tm>
			<it_no><![CDATA[<bean:write name="hblVO" property="it_no" filter="false" />]]></it_no>
			<trs_cd><![CDATA[<bean:write name="hblVO" property="trs_cd" filter="false" />]]></trs_cd>
			<pod_cd><![CDATA[<bean:write name="hblVO" property="pod_cd" filter="false" />]]></pod_cd>
			<pod_nm><![CDATA[<bean:write name="hblVO" property="pod_nm" filter="false" />]]></pod_nm>
			<cnt_cd><![CDATA[<bean:write name="hblVO" property="cnt_cd" filter="false" />]]></cnt_cd>
			<cnt_nm><![CDATA[<bean:write name="hblVO" property="cnt_nm" filter="false" />]]></cnt_nm>
			<state_cd><![CDATA[<bean:write name="hblVO" property="state_cd" filter="false" />]]></state_cd>
			<state_nm><![CDATA[<bean:write name="hblVO" property="state_nm" filter="false" />]]></state_nm>
			<carr_trdp_cd1><![CDATA[<bean:write name="hblVO" property="carr_trdp_cd1" filter="false" />]]></carr_trdp_cd1>
			<carr_trdp_nm1><![CDATA[<bean:write name="hblVO" property="carr_trdp_nm1" filter="false" />]]></carr_trdp_nm1>
			<ibd_tp><![CDATA[<bean:write name="hblVO" property="ibd_tp" filter="false" />]]></ibd_tp>
			<trnk_vsl_nm><![CDATA[<bean:write name="hblVO" property="trnk_vsl_nm" filter="false" />]]></trnk_vsl_nm>
			<trnk_vsl_cd><![CDATA[<bean:write name="hblVO" property="trnk_vsl_cd" filter="false" />]]></trnk_vsl_cd>
			<imp_en_no><![CDATA[<bean:write name="hblVO" property="imp_en_no" filter="false" />]]></imp_en_no>
			<rt_flg><![CDATA[<bean:write name="hblVO" property="rt_flg" filter="false" />]]></rt_flg>
			<ftz_cd><![CDATA[<bean:write name="hblVO" property="ftz_cd" filter="false" />]]></ftz_cd>
			<haz_flg><![CDATA[<bean:write name="hblVO" property="haz_flg" filter="false" />]]></haz_flg>
			<exp_cd><![CDATA[<bean:write name="hblVO" property="exp_cd" filter="false" />]]></exp_cd>
			<rsps_eml><![CDATA[<bean:write name="hblVO" property="rsps_eml" filter="false" />]]></rsps_eml>
			<rcc_flg><![CDATA[<bean:write name="hblVO" property="rcc_flg" filter="false" />]]></rcc_flg>
			<shp_nm><![CDATA[<bean:write name="hblVO" property="shp_nm" filter="false" />]]></shp_nm>
			<shp_pic_f><![CDATA[<bean:write name="hblVO" property="shp_pic_f" filter="false" />]]></shp_pic_f>
			<shp_pic_l><![CDATA[<bean:write name="hblVO" property="shp_pic_l" filter="false" />]]></shp_pic_l>
			<shp_phn><![CDATA[<bean:write name="hblVO" property="shp_phn" filter="false" />]]></shp_phn>
			<shp_addr><![CDATA[<bean:write name="hblVO" property="shp_addr" filter="false" />]]></shp_addr>
			<shp_city_nm><![CDATA[<bean:write name="hblVO" property="shp_city_nm" filter="false" />]]></shp_city_nm>
			<shp_state_cd><![CDATA[<bean:write name="hblVO" property="shp_state_cd" filter="false" />]]></shp_state_cd>
			<shp_zip><![CDATA[<bean:write name="hblVO" property="shp_zip" filter="false" />]]></shp_zip>
			<shp_cnt><![CDATA[<bean:write name="hblVO" property="shp_cnt" filter="false" />]]></shp_cnt>
			<shp_tax_type><![CDATA[<bean:write name="hblVO" property="shp_tax_type" filter="false" />]]></shp_tax_type>
			<shp_id><![CDATA[<bean:write name="hblVO" property="shp_id" filter="false" />]]></shp_id>
			<ult_cnee_nm><![CDATA[<bean:write name="hblVO" property="ult_cnee_nm" filter="false" />]]></ult_cnee_nm>
			<ult_cnee_pic><![CDATA[<bean:write name="hblVO" property="ult_cnee_pic" filter="false" />]]></ult_cnee_pic>
			<ult_cnee_phn><![CDATA[<bean:write name="hblVO" property="ult_cnee_phn" filter="false" />]]></ult_cnee_phn>
			<ult_cnee_addr><![CDATA[<bean:write name="hblVO" property="ult_cnee_addr" filter="false" />]]></ult_cnee_addr>
			<ult_cnee_city_nm><![CDATA[<bean:write name="hblVO" property="ult_cnee_city_nm" filter="false" />]]></ult_cnee_city_nm>
			<ult_cnee_state_cd><![CDATA[<bean:write name="hblVO" property="ult_cnee_state_cd" filter="false" />]]></ult_cnee_state_cd>
			<ult_cnee_zip><![CDATA[<bean:write name="hblVO" property="ult_cnee_zip" filter="false" />]]></ult_cnee_zip>
			<ult_cnee_cnt><![CDATA[<bean:write name="hblVO" property="ult_cnee_cnt" filter="false" />]]></ult_cnee_cnt>
			<ult_cnee_tp><![CDATA[<bean:write name="hblVO" property="ult_cnee_tp" filter="false" />]]></ult_cnee_tp>
			<fwd_nm><![CDATA[<bean:write name="hblVO" property="fwd_nm" filter="false" />]]></fwd_nm>
			<fwd_pic><![CDATA[<bean:write name="hblVO" property="fwd_pic" filter="false" />]]></fwd_pic>
			<fwd_phn><![CDATA[<bean:write name="hblVO" property="fwd_phn" filter="false" />]]></fwd_phn>
			<fwd_addr><![CDATA[<bean:write name="hblVO" property="fwd_addr" filter="false" />]]></fwd_addr>
			<fwd_city_nm><![CDATA[<bean:write name="hblVO" property="fwd_city_nm" filter="false" />]]></fwd_city_nm>
			<fwd_state_cd><![CDATA[<bean:write name="hblVO" property="fwd_state_cd" filter="false" />]]></fwd_state_cd>
			<fwd_zip><![CDATA[<bean:write name="hblVO" property="fwd_zip" filter="false" />]]></fwd_zip>
			<fwd_cnt><![CDATA[<bean:write name="hblVO" property="fwd_cnt" filter="false" />]]></fwd_cnt>
			<fwd_tax_type><![CDATA[<bean:write name="hblVO" property="fwd_tax_type" filter="false" />]]></fwd_tax_type>
			<fwd_id><![CDATA[<bean:write name="hblVO" property="fwd_id" filter="false" />]]></fwd_id>
			<inter_cnee_nm><![CDATA[<bean:write name="hblVO" property="inter_cnee_nm" filter="false" />]]></inter_cnee_nm>
			<inter_cnee_pic><![CDATA[<bean:write name="hblVO" property="inter_cnee_pic" filter="false" />]]></inter_cnee_pic>
			<inter_cnee_phn><![CDATA[<bean:write name="hblVO" property="inter_cnee_phn" filter="false" />]]></inter_cnee_phn>
			<inter_cnee_addr><![CDATA[<bean:write name="hblVO" property="inter_cnee_addr" filter="false" />]]></inter_cnee_addr>
			<inter_cnee_city_nm><![CDATA[<bean:write name="hblVO" property="inter_cnee_city_nm" filter="false" />]]></inter_cnee_city_nm>
			<inter_cnee_state_cd><![CDATA[<bean:write name="hblVO" property="inter_cnee_state_cd" filter="false" />]]></inter_cnee_state_cd>
			<inter_cnee_zip><![CDATA[<bean:write name="hblVO" property="inter_cnee_zip" filter="false" />]]></inter_cnee_zip>
			<inter_cnee_cnt><![CDATA[<bean:write name="hblVO" property="inter_cnee_cnt" filter="false" />]]></inter_cnee_cnt>
			<licen_tp><![CDATA[<bean:write name="hblVO" property="licen_tp" filter="false" />]]></licen_tp>
			<licen_no><![CDATA[<bean:write name="hblVO" property="licen_no" filter="false" />]]></licen_no>
			<ddtc_itar_no><![CDATA[<bean:write name="hblVO" property="ddtc_itar_no" filter="false" />]]></ddtc_itar_no>
			<eccn_no><![CDATA[<bean:write name="hblVO" property="eccn_no" filter="false" />]]></eccn_no>
			<ddtc_usml_cd><![CDATA[<bean:write name="hblVO" property="ddtc_usml_cd" filter="false" />]]></ddtc_usml_cd>
			<ddtc_regi_no><![CDATA[<bean:write name="hblVO" property="ddtc_regi_no" filter="false" />]]></ddtc_regi_no>
			<ddtc_pck_qty><![CDATA[<bean:write name="hblVO" property="ddtc_pck_qty" filter="false" />]]></ddtc_pck_qty>
			<ddtc_pck_ut_cd><![CDATA[<bean:write name="hblVO" property="ddtc_pck_ut_cd" filter="false" />]]></ddtc_pck_ut_cd>
			<ddtc_prty_certi_flg><![CDATA[<bean:write name="hblVO" property="ddtc_prty_certi_flg" filter="false" />]]></ddtc_prty_certi_flg>
			<ddtc_eq_flg><![CDATA[<bean:write name="hblVO" property="ddtc_eq_flg" filter="false" />]]></ddtc_eq_flg>
			<vsl_flg><![CDATA[<bean:write name="hblVO" property="vsl_flg" filter="false" />]]></vsl_flg>
			<sndAesRow><![CDATA[<bean:write name="valMap" property="sndAesRow" filter="false" />]]></sndAesRow>
			<file_tp><![CDATA[<bean:write name="hblVO" property="file_tp" filter="false" />]]></file_tp>

		</DATA>
	</logic:notEmpty>
</logic:empty>
