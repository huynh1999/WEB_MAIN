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
			
			<pck_ut_cd><![CDATA[<bean:write name="hblVO"  property="pck_ut_cd"  filter="false" />]]></pck_ut_cd>
			<pck_qty><![CDATA[<bean:write name="hblVO"  property="pck_qty"  filter="false" />]]></pck_qty>
			<grs_wgt><![CDATA[<bean:write name="hblVO"  property="grs_wgt"  filter="false" />]]></grs_wgt>
			<grs_wgt1><![CDATA[<bean:write name="hblVO"  property="grs_wgt1"  filter="false" />]]></grs_wgt1>
			<meas><![CDATA[<bean:write name="hblVO"  property="meas"  filter="false" />]]></meas>
			<meas1><![CDATA[<bean:write name="hblVO"  property="meas1"  filter="false" />]]></meas1>

			<sad_txt><![CDATA[<bean:write name="hblVO"  property="sad_txt"  filter="false" />]]></sad_txt>
			<mk_grs_wgt><![CDATA[<bean:write name="hblVO"  property="mk_grs_wgt"  filter="false" />]]></mk_grs_wgt>
			<mk_grs_wgt1><![CDATA[<bean:write name="hblVO"  property="mk_grs_wgt1"  filter="false" />]]></mk_grs_wgt1>
			<mk_meas><![CDATA[<bean:write name="hblVO"  property="mk_meas"  filter="false" />]]></mk_meas>
			<mk_meas1><![CDATA[<bean:write name="hblVO"  property="mk_meas1"  filter="false" />]]></mk_meas1>

			<mk_txt><![CDATA[<bean:write name="hblVO"  property="mk_txt"  filter="false" />]]></mk_txt>
			<desc_txt1><![CDATA[<bean:write name="hblVO"  property="desc_txt1"  filter="false" />]]></desc_txt1>
			<desc_txt><![CDATA[<bean:write name="hblVO"  property="desc_txt"  filter="false" />]]></desc_txt>
			<wgt_disp_cd><![CDATA[<bean:write name="hblVO"  property="wgt_disp_cd"  filter="false" />]]></wgt_disp_cd>

			<rmk><![CDATA[<bean:write name="hblVO"  property="rmk"  filter="false" />]]></rmk>
			<cfs_rmk><![CDATA[<bean:write name="hblVO"  property="cfs_rmk"  filter="false" />]]></cfs_rmk>
			
		</DATA>
		
	</logic:notEmpty>    
</logic:empty>
<%-- 오류발생 --%>
<logic:notEmpty name="com.clt.framework.core.comm.EXCEPTION_OBJECT">
    <ERROR>
        <MESSAGE><![CDATA[ <bean:message name="com.clt.framework.core.comm.EXCEPTION_OBJECT" property="message"/>]]> </MESSAGE>
    </ERROR>
</logic:notEmpty>
