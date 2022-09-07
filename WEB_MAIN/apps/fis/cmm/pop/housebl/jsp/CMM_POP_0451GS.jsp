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
				<intg_bl_seq><![CDATA[<bean:write name="rowField" property="intg_bl_seq"/>]]></intg_bl_seq>
				<sr_no><![CDATA[<bean:write name="rowField" property="sr_no"/>]]></sr_no>
				<bl_no><![CDATA[<bean:write name="rowField" property="bl_no"/>]]></bl_no>
				<bl_sts_cd><![CDATA[<bean:write name="rowField" property="bl_sts_cd"/>]]></bl_sts_cd>
				<ref_no><![CDATA[<bean:write name="rowField" property="ref_no"/>]]></ref_no>
				<etd_dt_tm><![CDATA[<bean:write name="rowField" property="etd_dt_tm"/>]]></etd_dt_tm>
				<pol_cd><![CDATA[<bean:write name="rowField" property="pol_cd"/>]]></pol_cd>
				<pod_cd><![CDATA[<bean:write name="rowField" property="pod_cd"/>]]></pod_cd>
				<sc_no><![CDATA[<bean:write name="rowField" property="sc_no"/>]]></sc_no>
				<rcv_wh_cd><![CDATA[<bean:write name="rowField" property="rcv_wh_cd"/>]]></rcv_wh_cd>
				<prnr_trdp_cd><![CDATA[<bean:write name="rowField" property="prnr_trdp_cd"/>]]></prnr_trdp_cd>
				<ref_ofc_cd><![CDATA[<bean:write name="rowField" property="ref_ofc_cd"/>]]></ref_ofc_cd>
				<obl_tp_cd><![CDATA[<bean:write name="rowField" property="obl_tp_cd"/>]]></obl_tp_cd>			
				<curr_cd><![CDATA[<bean:write name="rowField" property="curr_cd"/>]]></curr_cd>	
				<cust_ref_no><![CDATA[<bean:write name="rowField" property="cust_ref_no"/>]]></cust_ref_no>	
				<imp_ref_no><![CDATA[<bean:write name="rowField" property="imp_ref_no"/>]]></imp_ref_no>	
				<mrn_no><![CDATA[<bean:write name="rowField" property="mrn_no"/>]]></mrn_no>
				<bl_ser_no><![CDATA[<bean:write name="rowField" property="bl_ser_no"/>]]></bl_ser_no>
				<fm_svc_term_cd><![CDATA[<bean:write name="rowField" property="fm_svc_term_cd"/>]]></fm_svc_term_cd>
				<carr_trdp_cd><![CDATA[<bean:write name="rowField" property="carr_trdp_cd"/>]]></carr_trdp_cd>
				<f_eta_dt_tm><![CDATA[<bean:write name="rowField" property="f_eta_dt_tm"/>]]></f_eta_dt_tm>
				<rt_trdp_cd><![CDATA[<bean:write name="rowField" property="rt_trdp_cd"/>]]></rt_trdp_cd>	
				<it_no><![CDATA[<bean:write name="rowField" property="it_no"/>]]></it_no>
				<pod_nm><![CDATA[<bean:write name="rowField" property="pod_nm"/>]]></pod_nm>
				<pol_nm><![CDATA[<bean:write name="rowField" property="pol_nm"/>]]></pol_nm>
				<lnr_trdp_nm><![CDATA[<bean:write name="rowField" property="lnr_trdp_nm"/>]]></lnr_trdp_nm>
				<shp_mod_cd><![CDATA[<bean:write name="rowField" property="shp_mod_cd"/>]]></shp_mod_cd>		
				<lnr_trdp_cd><![CDATA[<bean:write name="rowField" property="lnr_trdp_cd"/>]]></lnr_trdp_cd>	
				<eta_dt_tm><![CDATA[<bean:write name="rowField" property="eta_dt_tm"/>]]></eta_dt_tm>			
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
