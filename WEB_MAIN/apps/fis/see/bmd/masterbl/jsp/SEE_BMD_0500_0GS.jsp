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
			<frt_term_cd><![CDATA[<bean:write name="hblVO"  property="frt_term_cd"  filter="false" />]]></frt_term_cd>
			<cargo_tp_cd><![CDATA[<bean:write name="hblVO"  property="cargo_tp_cd"  filter="false" />]]></cargo_tp_cd>	
			<rep_cmdt_cd><![CDATA[<bean:write name="hblVO"  property="rep_cmdt_cd"  filter="false" />]]></rep_cmdt_cd>		
			<rep_cmdt_nm><![CDATA[<bean:write name="hblVO"  property="rep_cmdt_nm"  filter="false" />]]></rep_cmdt_nm>	
			<pck_ut_cd><![CDATA[<bean:write name="hblVO"  property="pck_ut_cd"  filter="false" />]]></pck_ut_cd>
			<pck_qty><![CDATA[<bean:write name="hblVO"  property="pck_qty"  filter="false" />]]></pck_qty>
			<grs_wgt><![CDATA[<bean:write name="hblVO"  property="grs_wgt"  filter="false" />]]></grs_wgt>
			<grs_wgt1><![CDATA[<bean:write name="hblVO"  property="grs_wgt1"  filter="false" />]]></grs_wgt1>
			<meas><![CDATA[<bean:write name="hblVO"  property="meas"  filter="false" />]]></meas>
			<meas1><![CDATA[<bean:write name="hblVO"  property="meas1"  filter="false" />]]></meas1>
			<rmk><![CDATA[<bean:write name="hblVO"  property="rmk"  filter="false" />]]></rmk>	
			<cntr_info><![CDATA[<bean:write name="hblVO"  property="cntr_info"  filter="false" />]]></cntr_info>		
				
		</DATA>
		
	</logic:notEmpty>    
</logic:empty>
<%-- 오류발생 --%>
<logic:notEmpty name="com.clt.framework.core.comm.EXCEPTION_OBJECT">
    <ERROR>
        <MESSAGE><![CDATA[ <bean:message name="com.clt.framework.core.comm.EXCEPTION_OBJECT" property="message"/>]]> </MESSAGE>
    </ERROR>
</logic:notEmpty>
