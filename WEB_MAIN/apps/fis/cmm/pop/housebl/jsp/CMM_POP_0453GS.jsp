<%--
=========================================================
*Copyright(c) 2008 CyberLogitec. All Rights Reserved.
=========================================================
=========================================================
*@FileName   : SEE_BMD_0030GS.jsp
*@FileTitle  : Shipping Request 처리용 Grid
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
<logic:empty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
	<logic:notEmpty name="EventResponse" property="objVal">
		<bean:define id="rowField" name="EventResponse" property="objVal"/>
		<FIELD>
			<DATA TOTAL="1">
				<lnr_trdp_cd><![CDATA[<bean:write name="rowField" property="lnr_trdp_cd"/>]]></lnr_trdp_cd>			
				<lnr_trdp_nm><![CDATA[<bean:write name="rowField" property="lnr_trdp_nm"/>]]></lnr_trdp_nm>
				<eta_dt_tm><![CDATA[<bean:write name="rowField" property="eta_dt_tm"/>]]></eta_dt_tm>
				<eta_tm><![CDATA[<bean:write name="rowField" property="eta_tm"/>]]></eta_tm>
				<pol_cd><![CDATA[<bean:write name="rowField" property="pol_cd"/>]]></pol_cd>
				<pol_nm><![CDATA[<bean:write name="rowField" property="pol_nm"/>]]></pol_nm>
				<pod_cd><![CDATA[<bean:write name="rowField" property="pod_cd"/>]]></pod_cd>
				<pod_nm><![CDATA[<bean:write name="rowField" property="pod_nm"/>]]></pod_nm>
				<etd_tm><![CDATA[<bean:write name="rowField" property="etd_tm"/>]]></etd_tm>
				<ref_no><![CDATA[<bean:write name="rowField" property="ref_no"/>]]></ref_no>	
				<ref_ofc_cd><![CDATA[<bean:write name="rowField" property="ref_ofc_cd"/>]]></ref_ofc_cd>	
				<intg_bl_seq><![CDATA[<bean:write name="rowField" property="intg_bl_seq"/>]]></intg_bl_seq>
				<bl_no><![CDATA[<bean:write name="rowField" property="mbl_no"/>]]></bl_no>			
			</DATA>
		</FIELD>
	</logic:notEmpty>    
</logic:empty>
<%-- 오류발생 --%>
<logic:notEmpty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
    <ERROR>
        <MESSAGE><![CDATA[ <bean:message name="com.clt.framework.core.comm.EXCEPTION_OBJECT      " property="message"/>]]> </MESSAGE>
    </ERROR>
</logic:notEmpty>
