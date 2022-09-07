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
			<pck_ut_cd><![CDATA[<bean:write name="hblVO"  property="pck_ut_cd"  filter="false" />]]></pck_ut_cd>
			<pck_qty><![CDATA[<bean:write name="hblVO"  property="pck_qty"  filter="false" />]]></pck_qty>
			<grs_wgt><![CDATA[<bean:write name="hblVO"  property="grs_wgt"  filter="false" />]]></grs_wgt>
			<grs_wgt1><![CDATA[<bean:write name="hblVO"  property="grs_wgt1"  filter="false" />]]></grs_wgt1>
			<chg_wgt><![CDATA[<bean:write name="hblVO"  property="chg_wgt"  filter="false" />]]></chg_wgt>
			<chg_wgt1><![CDATA[<bean:write name="hblVO"  property="chg_wgt1"  filter="false" />]]></chg_wgt1>
			<agent_grs_wgt><![CDATA[<bean:write name="hblVO"  property="agent_grs_wgt"  filter="false" />]]></agent_grs_wgt>
			<agent_grs_wgt1><![CDATA[<bean:write name="hblVO"  property="agent_grs_wgt1"  filter="false" />]]></agent_grs_wgt1>
			<agent_chg_wgt><![CDATA[<bean:write name="hblVO"  property="agent_chg_wgt"  filter="false" />]]></agent_chg_wgt>
			<agent_chg_wgt1><![CDATA[<bean:write name="hblVO"  property="agent_chg_wgt1"  filter="false" />]]></agent_chg_wgt1>
			<vol_wgt><![CDATA[<bean:write name="hblVO"  property="vol_wgt"  filter="false" />]]></vol_wgt>
			<vol_meas><![CDATA[<bean:write name="hblVO"  property="vol_meas"  filter="false" />]]></vol_meas>
			<rep_cmdt_cd><![CDATA[<bean:write name="hblVO"  property="rep_cmdt_cd"  filter="false" />]]></rep_cmdt_cd>
			<rep_cmdt_nm><![CDATA[<bean:write name="hblVO"  property="rep_cmdt_nm"  filter="false" />]]></rep_cmdt_nm>
			<goods_value><![CDATA[<bean:write name="hblVO"  property="goods_value"  filter="false" />]]></goods_value>
			
			<decl_crr_val><![CDATA[<bean:write name="hblVO"  property="decl_crr_val"  filter="false" />]]></decl_crr_val>
			<decl_cstms_val><![CDATA[<bean:write name="hblVO"  property="decl_cstms_val"  filter="false" />]]></decl_cstms_val>
	

			<mk_txt><![CDATA[<bean:write name="hblVO"  property="mk_txt"  filter="false" />]]></mk_txt>
			<desc_txt><![CDATA[<bean:write name="hblVO"  property="desc_txt"  filter="false" />]]></desc_txt>
			<desc_txt1><![CDATA[<bean:write name="hblVO"  property="desc_txt1"  filter="false" />]]></desc_txt1>
			<rmk><![CDATA[<bean:write name="hblVO"  property="rmk"  filter="false" />]]></rmk>

			<hndl_info_txt><![CDATA[<bean:write name="hblVO"  property="hndl_info_txt"  filter="false" />]]></hndl_info_txt>
			<acctg_info_txt><![CDATA[<bean:write name="hblVO"  property="acctg_info_txt"  filter="false" />]]></acctg_info_txt>
			
			<cnt_cd><![CDATA[<bean:write name="hblVO"  property="cnt_cd"  filter="false" />]]></cnt_cd>
			<cnt_nm><![CDATA[<bean:write name="hblVO"  property="cnt_nm"  filter="false" />]]></cnt_nm>
			
		</DATA>
		
	</logic:notEmpty>    
</logic:empty>
<%-- 오류발생 --%>
<logic:notEmpty name="com.clt.framework.core.comm.EXCEPTION_OBJECT">
    <ERROR>
        <MESSAGE><![CDATA[ <bean:message name="com.clt.framework.core.comm.EXCEPTION_OBJECT" property="message"/>]]> </MESSAGE>
    </ERROR>
</logic:notEmpty>
