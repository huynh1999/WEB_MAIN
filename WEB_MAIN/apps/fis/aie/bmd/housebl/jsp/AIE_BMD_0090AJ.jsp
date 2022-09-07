<%--
=========================================================
*Copyright(c) 2008 CyberLogitec. All Rights Reserved.
=========================================================
=========================================================
*@FileName   : AIE_BMD_0090.jsp
*@FileTitle  : Document Package(Air Export HBL)
*@Description: Document Package(Air Export HBL)
*@author     : Hoang.Pham - Cyberlogitec
*@version    : 1.0 - 09/12/2014
*@since      : 09/12/2014

*@Change history:
=========================================================
--%>
<%@ page contentType="text/xml; charset=UTF-8"%>
<%@page pageEncoding="UTF-8"%>
<%@include file="./../../../../../../../../syscommon/header/CLTGSHeader.jsp"%>
<%-- 정상처리 --%>
<logic:empty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
	<logic:notEmpty name="EventResponse" property="objVal">
        <bean:define id="hblVO" name="EventResponse" property="objVal"/>
        <bean:define id="tmpMap" name="EventResponse" property="mapVal"/>
		<DATA>
			<intg_bl_seq><![CDATA[<bean:write name="hblVO" property="intg_bl_seq" filter="false" />]]></intg_bl_seq>
			<hbl_tp_cd><![CDATA[<bean:write name="hblVO" property="hbl_tp_cd" filter="false" />]]></hbl_tp_cd>
			<flt_no><![CDATA[<bean:write name="hblVO" property="flt_no" filter="false" />]]></flt_no>
			<ref_ofc_cd><![CDATA[<bean:write name="hblVO" property="ref_ofc_cd" filter="false" />]]></ref_ofc_cd>
			<ref_ofc_eng_nm><![CDATA[<bean:write name="hblVO" property="ref_ofc_eng_nm" filter="false" />]]></ref_ofc_eng_nm>
			<ref_ofc_cnt_cd><![CDATA[<bean:write name="hblVO" property="ref_ofc_cnt_cd" filter="false" />]]></ref_ofc_cnt_cd>
			<shpr_trdp_nm><![CDATA[<bean:write name="hblVO" property="shpr_trdp_nm" filter="false" />]]></shpr_trdp_nm>
			<lnr_trdp_nm><![CDATA[<bean:write name="hblVO" property="lnr_trdp_nm" filter="false" />]]></lnr_trdp_nm>
			<thr_trdp_nm><![CDATA[<bean:write name="hblVO" property="thr_trdp_nm" filter="false" />]]></thr_trdp_nm>
			<loc_inv_flg><![CDATA[<bean:write name="hblVO" property="loc_inv_flg" filter="false" />]]></loc_inv_flg>
			<loc_inv_seq><![CDATA[<bean:write name="hblVO" property="loc_inv_seq" filter="false" />]]></loc_inv_seq>
			<dc_inv_flg><![CDATA[<bean:write name="hblVO" property="dc_inv_flg" filter="false" />]]></dc_inv_flg>
			<dc_inv_seq><![CDATA[<bean:write name="hblVO" property="dc_inv_seq" filter="false" />]]></dc_inv_seq>
			<cmc_inv_seq><![CDATA[<bean:write name="hblVO" property="cmc_inv_seq" filter="false" />]]></cmc_inv_seq>
			<pck_inv_seq><![CDATA[<bean:write name="hblVO" property="pck_inv_seq" filter="false" />]]></pck_inv_seq>
			<bl_no><![CDATA[<bean:write name="hblVO" property="bl_no" filter="false" />]]></bl_no>
			<shpr_info><![CDATA[<bean:write name="hblVO" property="shpr_info" filter="false" />]]></shpr_info>
			<cnee_info><![CDATA[<bean:write name="hblVO" property="cnee_info" filter="false" />]]></cnee_info>
			<ae_hbl_form><![CDATA[<bean:write name="tmpMap" property="ae_hbl_form" filter="false" />]]></ae_hbl_form>
			
			<%-- #4694 [IMPEX] AIR Document Package --%>
			<ofc_rep_nm><![CDATA[<bean:write name="hblVO" property="ofc_rep_nm" filter="false" />]]></ofc_rep_nm>
		</DATA>
	</logic:notEmpty>    
</logic:empty>