<%--
=========================================================
*Copyright(c) 2008 CyberLogitec. All Rights Reserved.
=========================================================

=========================================================
*@FileName   : SEE_BMD_0020GS.jsp
*@FileTitle  : 
*@Description: 
*@author     : Kang,Jung-Gu - Cyberlogitec
*@version    : 1.0 - 02/05/2009
*@since      : 02/05/2009

*@Change history:
=========================================================
--%>
<%@ page contentType="text/xml; charset=UTF-8"%>
<%@page pageEncoding="UTF-8"%>
<%@include file="./../../../../../../../../syscommon/header/CLTGSHeader.jsp"%>
<%-- 정상처리 --%>
<logic:empty name="com.clt.framework.core.comm.EXCEPTION_OBJECT">
	
	<%--<logic:empty name="EventResponse" property="objVal">
		{
			"data":"-1"
		}
	</logic:empty>    --%>
	
	<logic:notEmpty name="EventResponse" property="objVal">
		<bean:define id="hblVO"   name="EventResponse" property="objVal"/>
		
		<DATA>
			<result><![CDATA[1]]></result>
			<shpr_trdp_cd><![CDATA[<bean:write name="hblVO"  property="shpr_trdp_cd"  filter="false" />]]></shpr_trdp_cd>
			<shpr_trdp_nm><![CDATA[<bean:write name="hblVO"  property="shpr_trdp_nm"  filter="false" />]]></shpr_trdp_nm>
			<shpr_trdp_addr><![CDATA[<bean:write name="hblVO"  property="shpr_trdp_addr"  filter="false" />]]></shpr_trdp_addr>
			<cnee_trdp_cd><![CDATA[<bean:write name="hblVO"  property="cnee_trdp_cd"  filter="false" />]]></cnee_trdp_cd>
			<cnee_trdp_nm><![CDATA[<bean:write name="hblVO"  property="cnee_trdp_nm"  filter="false" />]]></cnee_trdp_nm>
			<cnee_trdp_addr><![CDATA[<bean:write name="hblVO"  property="cnee_trdp_addr"  filter="false" />]]></cnee_trdp_addr>
			<cargo_tp_cd><![CDATA[<bean:write name="hblVO"  property="cargo_tp_cd"  filter="false" />]]></cargo_tp_cd>
			<pck_ut_cd><![CDATA[<bean:write name="hblVO"  property="pck_ut_cd"  filter="false" />]]></pck_ut_cd>
			<pck_qty><![CDATA[<bean:write name="hblVO"  property="pck_qty"  filter="false" />]]></pck_qty>
			<grs_wgt><![CDATA[<bean:write name="hblVO"  property="grs_wgt"  filter="false" />]]></grs_wgt>
			<grs_wgt1><![CDATA[<bean:write name="hblVO"  property="grs_wgt1"  filter="false" />]]></grs_wgt1>
			<chg_wgt><![CDATA[<bean:write name="hblVO"  property="chg_wgt"  filter="false" />]]></chg_wgt>
			<chg_wgt1><![CDATA[<bean:write name="hblVO"  property="chg_wgt1"  filter="false" />]]></chg_wgt1>
			<bl_grs_wgt><![CDATA[<bean:write name="hblVO"  property="bl_grs_wgt"  filter="false" />]]></bl_grs_wgt>
			<bl_grs_wgt1><![CDATA[<bean:write name="hblVO"  property="bl_grs_wgt1"  filter="false" />]]></bl_grs_wgt1>
			<bl_chg_wgt><![CDATA[<bean:write name="hblVO"  property="bl_chg_wgt"  filter="false" />]]></bl_chg_wgt>
			<bl_chg_wgt1><![CDATA[<bean:write name="hblVO"  property="bl_chg_wgt1"  filter="false" />]]></bl_chg_wgt1>
			<vol_wgt><![CDATA[<bean:write name="hblVO"  property="vol_wgt"  filter="false" />]]></vol_wgt>
			<vol_meas><![CDATA[<bean:write name="hblVO"  property="vol_meas"  filter="false" />]]></vol_meas>
			<rep_cmdt_cd><![CDATA[<bean:write name="hblVO"  property="rep_cmdt_cd"  filter="false" />]]></rep_cmdt_cd>
			<rep_cmdt_nm><![CDATA[<bean:write name="hblVO"  property="rep_cmdt_nm"  filter="false" />]]></rep_cmdt_nm>
			
			<decl_crr_val><![CDATA[<bean:write name="hblVO"  property="decl_crr_val"  filter="false" />]]></decl_crr_val>
			<decl_cstms_val><![CDATA[<bean:write name="hblVO"  property="decl_cstms_val"  filter="false" />]]></decl_cstms_val>
			<amt_insur_val><![CDATA[<bean:write name="hblVO"  property="amt_insur_val"  filter="false" />]]></amt_insur_val>

			<mk_txt><![CDATA[<bean:write name="hblVO"  property="mk_txt"  filter="false" />]]></mk_txt>
			<desc_txt><![CDATA[<bean:write name="hblVO"  property="desc_txt"  filter="false" />]]></desc_txt>
			<certi_hndl_info><![CDATA[<bean:write name="hblVO"  property="certi_hndl_info"  filter="false" />]]></certi_hndl_info>
			<hndl_info_txt><![CDATA[<bean:write name="hblVO"  property="hndl_info_txt"  filter="false" />]]></hndl_info_txt>
			<acctg_info_txt><![CDATA[<bean:write name="hblVO"  property="acctg_info_txt"  filter="false" />]]></acctg_info_txt>
			
		</DATA>
		
	</logic:notEmpty>    
</logic:empty>
<%-- 오류발생 --%>
<logic:notEmpty name="com.clt.framework.core.comm.EXCEPTION_OBJECT">
    <ERROR>
        <MESSAGE><![CDATA[ <bean:message name="com.clt.framework.core.comm.EXCEPTION_OBJECT" property="message"/>]]> </MESSAGE>
    </ERROR>
</logic:notEmpty>
