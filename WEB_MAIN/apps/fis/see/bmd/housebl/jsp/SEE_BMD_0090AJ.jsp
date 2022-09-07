<%--
=========================================================
*Copyright(c) 2008 CyberLogitec. All Rights Reserved.
=========================================================
=========================================================
*@FileName   : SEE_BMD_0090AJ.jsp
*@FileTitle  : Document Package
*@Description: 
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
		<bean:define id="tmpMap"  name="EventResponse" property="mapVal"/>
		<DATA>
			<intg_bl_seq><![CDATA[<bean:write name="hblVO" property="intg_bl_seq" filter="false" />]]></intg_bl_seq>
			<ref_ofc_cd><![CDATA[<bean:write name="hblVO" property="ref_ofc_cd" filter="false" />]]></ref_ofc_cd>
			<ref_ofc_eng_nm><![CDATA[<bean:write name="hblVO" property="ref_ofc_eng_nm" filter="false" />]]></ref_ofc_eng_nm>
			<ref_ofc_cnt_cd><![CDATA[<bean:write name="hblVO" property="ref_ofc_cnt_cd" filter="false" />]]></ref_ofc_cnt_cd>
			<sea_body><![CDATA[<bean:write name="hblVO" property="sea_body" filter="false" />]]></sea_body>
			<lnr_trdp_nm><![CDATA[<bean:write name="hblVO" property="lnr_trdp_nm" filter="false" />]]></lnr_trdp_nm>
			<loc_inv_flg><![CDATA[<bean:write name="hblVO" property="loc_inv_flg" filter="false" />]]></loc_inv_flg>
			<loc_inv_seq><![CDATA[<bean:write name="hblVO" property="loc_inv_seq" filter="false" />]]></loc_inv_seq>
			<dc_inv_flg><![CDATA[<bean:write name="hblVO" property="dc_inv_flg" filter="false" />]]></dc_inv_flg>
			<dc_inv_seq><![CDATA[<bean:write name="hblVO" property="dc_inv_seq" filter="false" />]]></dc_inv_seq>
			<cmc_inv_seq><![CDATA[<bean:write name="hblVO" property="cmc_inv_seq" filter="false" />]]></cmc_inv_seq>
			<pck_inv_seq><![CDATA[<bean:write name="hblVO" property="pck_inv_seq" filter="false" />]]></pck_inv_seq>
			<rmk_cd><![CDATA[<bean:write name="hblVO" property="rmk_cd" filter="false" />]]></rmk_cd>
			<oe_hbl_form><![CDATA[<bean:write name="tmpMap" property="oe_hbl_form" filter="false" />]]></oe_hbl_form>
			<bl_no><![CDATA[<bean:write name="hblVO" property="bl_no" filter="false" />]]></bl_no>
			<shpr_info><![CDATA[<bean:write name="hblVO" property="shpr_info" filter="false" />]]></shpr_info>
			<cnee_info><![CDATA[<bean:write name="hblVO" property="cnee_info" filter="false" />]]></cnee_info>
		</DATA>
	</logic:notEmpty>    
</logic:empty>