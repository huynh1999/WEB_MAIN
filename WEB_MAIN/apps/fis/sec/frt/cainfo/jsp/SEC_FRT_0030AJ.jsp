<%--
=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
=========================================================
=========================================================
*@FileName   : SEC_FRT_0030AJ.jsp
*@FileTitle  : AIH Correction Notice
*@Description: 
*@author     : Vinh.Vo - Dou
*@version    : 1.0 - 9/12/2014
*@since      : 9/12/2014

*@Change history:
=========================================================
--%>
<%@ page contentType="text/xml; charset=UTF-8"%>
<%@page pageEncoding="UTF-8"%>
<%@include file="./../../../../../../syscommon/header/CLTGSHeader.jsp"%>
<logic:empty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
	<logic:notEmpty name="EventResponse" property="objVal">
		<bean:define id="objVO"  name="EventResponse" property="objVal"/>
		<bean:define id="tmpMap"  name="EventResponse" property="mapVal"/>
		<DATA> 
			<blFlg><![CDATA[<bean:write name="tmpMap" property="blFlg" filter="false" />]]></blFlg>
			<s_intg_bl_seq><![CDATA[<bean:write name="objVO" property="s_intg_bl_seq" filter="false" />]]></s_intg_bl_seq>
			<intg_bl_seq><![CDATA[<bean:write name="objVO" property="intg_bl_seq" filter="false" />]]></intg_bl_seq>
			<bkg_no><![CDATA[<bean:write name="objVO" property="bkg_no" filter="false" />]]></bkg_no>
			<ca_seq><![CDATA[<bean:write name="objVO" property="ca_seq" filter="false" />]]></ca_seq>
			<bnd_clss_cd><![CDATA[<bean:write name="objVO" property="bnd_clss_cd" filter="false" />]]></bnd_clss_cd>
			<air_sea_clss_cd><![CDATA[<bean:write name="tmpMap" property="air_sea_clss_cd" filter="false" />]]></air_sea_clss_cd>
			<biz_clss_cd><![CDATA[<bean:write name="tmpMap" property="biz_clss_cd" filter="false" />]]></biz_clss_cd>
			<ca_sts_cd><![CDATA[<bean:write name="objVO" property="ca_sts_cd" filter="false" />]]></ca_sts_cd>
			<master_bl_seq><![CDATA[<bean:write name="tmpMap" property="master_bl_seq" filter="false" />]]></master_bl_seq>
			<master_ca_sts_cd><![CDATA[<bean:write name="tmpMap" property="master_ca_sts_cd" filter="false" />]]></master_ca_sts_cd>
			<cls_flg><![CDATA[<bean:write name="objVO" property="cls_flg" filter="false" />]]></cls_flg>
			<save_yn><![CDATA[<bean:write name="objVO" property="save_yn" filter="false" />]]></save_yn>
			<s_house_bl_no><![CDATA[<bean:write name="objVO" property="s_house_bl_no" filter="false" />]]></s_house_bl_no>
			<s_master_bl_no><![CDATA[<bean:write name="objVO" property="s_master_bl_no" filter="false" />]]></s_master_bl_no>
			<s_trdp_cd><![CDATA[<bean:write name="objVO" property="s_trdp_cd" filter="false" />]]></s_trdp_cd>
			<s_trdp_short_nm><![CDATA[<bean:write name="objVO" property="s_trdp_short_nm" filter="false" />]]></s_trdp_short_nm>
			<s_trdp_full_nm><![CDATA[<bean:write name="objVO" property="s_trdp_full_nm" filter="false" />]]></s_trdp_full_nm>
			<s_status><![CDATA[<bean:write name="objVO" property="s_status" filter="false" />]]></s_status>
			<s_rgst_strdt><![CDATA[<bean:write name="objVO" property="s_rgst_strdt" filter="false" />]]></s_rgst_strdt>
			<s_rgst_enddt><![CDATA[<bean:write name="objVO" property="s_rgst_enddt" filter="false" />]]></s_rgst_enddt>
			<s_ofc_cd><![CDATA[<bean:write name="objVO" property="s_ofc_cd" filter="false" />]]></s_ofc_cd>
			<call_val><![CDATA[<bean:write name="tmpMap" property="call_val" filter="false" />]]></call_val>
			<s_ca_no><![CDATA[<bean:write name="tmpMap" property="s_ca_no" filter="false" />]]></s_ca_no>
			<rgst_usrid><![CDATA[<bean:write name="objVO" property="rgst_usrid" filter="false" />]]></rgst_usrid>
			<ca_no><![CDATA[<bean:write name="objVO" property="ca_no" filter="false" />]]></ca_no>
			<house_bl_no><![CDATA[<bean:write name="objVO" property="house_bl_no" filter="false" />]]></house_bl_no>
			<master_bl_no><![CDATA[<bean:write name="objVO" property="master_bl_no" filter="false" />]]></master_bl_no>
			<iss_usrid><![CDATA[<bean:write name="objVO" property="iss_usrid" filter="false" />]]></iss_usrid>
			<iss_ofc_cd><![CDATA[<bean:write name="objVO" property="iss_ofc_cd" filter="false" />]]></iss_ofc_cd>
			<ntc_trdp_pic_phn><![CDATA[<bean:write name="objVO" property="ntc_trdp_pic_phn" filter="false" />]]></ntc_trdp_pic_phn>
			<ntc_trdp_pic_fax><![CDATA[<bean:write name="objVO" property="ntc_trdp_pic_fax" filter="false" />]]></ntc_trdp_pic_fax>
			<ntc_trdp_cd><![CDATA[<bean:write name="objVO" property="ntc_trdp_cd" filter="false" />]]></ntc_trdp_cd>
			<ntc_trdp_full_nm><![CDATA[<bean:write name="objVO" property="ntc_trdp_full_nm" filter="false" />]]></ntc_trdp_full_nm>
			<ntc_trdp_pic><![CDATA[<bean:write name="objVO" property="ntc_trdp_pic" filter="false" />]]></ntc_trdp_pic>
			<cfm_usrid><![CDATA[<bean:write name="objVO" property="cfm_usrid" filter="false" />]]></cfm_usrid>
			<cfm_ofc_cd><![CDATA[<bean:write name="objVO" property="cfm_ofc_cd" filter="false" />]]></cfm_ofc_cd>
			<ntc_trdp_pic_eml><![CDATA[<bean:write name="objVO" property="ntc_trdp_pic_eml" filter="false" />]]></ntc_trdp_pic_eml>
			<grs_wgt_flg><![CDATA[<bean:write name="objVO" property="grs_wgt_flg" filter="false" />]]></grs_wgt_flg>
			<cbm_flg><![CDATA[<bean:write name="objVO" property="cbm_flg" filter="false" />]]></cbm_flg>
			<mk_desc_flg><![CDATA[<bean:write name="objVO" property="mk_desc_flg" filter="false" />]]></mk_desc_flg>
			<vsl_flg><![CDATA[<bean:write name="objVO" property="vsl_flg" filter="false" />]]></vsl_flg>
			<cntr_flg><![CDATA[<bean:write name="objVO" property="cntr_flg" filter="false" />]]></cntr_flg>
			<frt_term_flg><![CDATA[<bean:write name="objVO" property="frt_term_flg" filter="false" />]]></frt_term_flg>
			<shpr_pty_flg><![CDATA[<bean:write name="objVO" property="shpr_pty_flg" filter="false" />]]></shpr_pty_flg>
			<cnee_pty_flg><![CDATA[<bean:write name="objVO" property="cnee_pty_flg" filter="false" />]]></cnee_pty_flg>
			<ntfy_pty_flg><![CDATA[<bean:write name="objVO" property="ntfy_pty_flg" filter="false" />]]></ntfy_pty_flg>
			<cmdt_flg><![CDATA[<bean:write name="objVO" property="cmdt_flg" filter="false" />]]></cmdt_flg>
			<rout_flg><![CDATA[<bean:write name="objVO" property="rout_flg" filter="false" />]]></rout_flg>
			<trf_inv_amt_flg><![CDATA[<bean:write name="objVO" property="trf_inv_amt_flg" filter="false" />]]></trf_inv_amt_flg>
			<otr_flg><![CDATA[<bean:write name="objVO" property="otr_flg" filter="false" />]]></otr_flg>
			<pre_info_txt><![CDATA[<bean:write name="objVO" property="pre_info_txt"  filter="false" />]]></pre_info_txt>
			<corr_info_txt><![CDATA[<bean:write name="objVO" property="corr_info_txt"  filter="false" />]]></corr_info_txt>
		</DATA>
	</logic:notEmpty>
</logic:empty>
