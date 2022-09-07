<%--
=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
=========================================================
=========================================================
*@FileName   : SEE_DOC_1030AJ.jsp
*@FileTitle  : OEM Load Plan
*@Description: 
*@author     : Khang.Dong - Dou
*@version    : 1.0 - 09/12/2014
*@since      : 09/12/2014

*@Change history:
=========================================================
--%>
<%@ page contentType="text/xml; charset=UTF-8"%>
<%@page pageEncoding="UTF-8"%>
<%@include file="./../../../../../../syscommon/header/CLTGSHeader.jsp"%>
<logic:empty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
	<logic:notEmpty name="EventResponse" property="objVal">
		<bean:define id="mblVO" name="EventResponse" property="objVal" />
		<DATA> 
		<intg_bl_seq><![CDATA[<bean:write name="mblVO" property="intg_bl_seq" filter="false" />]]></intg_bl_seq>
		<ref_no><![CDATA[<bean:write name="mblVO" property="ref_no" filter="false" />]]></ref_no>
		<mbl_no><![CDATA[<bean:write name="mblVO" property="mbl_no" filter="false" />]]></mbl_no>
		<bkg_no><![CDATA[<bean:write name="mblVO" property="bkg_no" filter="false" />]]></bkg_no>
		<agent_nm><![CDATA[<bean:write name="mblVO" property="agent_nm" filter="false" />]]></agent_nm>
		<trnk_vsl_nm><![CDATA[<bean:write name="mblVO" property="trnk_vsl_nm" filter="false" />]]></trnk_vsl_nm>
		<trnk_voy><![CDATA[<bean:write name="mblVO" property="trnk_voy" filter="false" />]]></trnk_voy>
		<pol_nm><![CDATA[<bean:write name="mblVO" property="pol_nm" filter="false" />]]></pol_nm>
		<etd_dt_tm><![CDATA[<bean:write name="mblVO" property="etd_dt_tm" filter="false" />]]></etd_dt_tm>
		<eta_dt_tm><![CDATA[<bean:write name="mblVO" property="eta_dt_tm" filter="false" />]]></eta_dt_tm>
		<pod_nm><![CDATA[<bean:write name="mblVO" property="pod_nm" filter="false" />]]></pod_nm>
		<fnl_dest_loc_nm><![CDATA[<bean:write name="mblVO" property="fnl_dest_loc_nm" filter="false" />]]></fnl_dest_loc_nm>
		<carr_nm><![CDATA[<bean:write name="mblVO" property="carr_nm" filter="false" />]]></carr_nm>
		<agent_addr><![CDATA[<bean:write name="mblVO" property="agent_addr" filter="false" />]]></agent_addr>
		<rcv_wh_nm><![CDATA[<bean:write name="mblVO" property="rcv_wh_nm" filter="false" />]]></rcv_wh_nm>
		<rcv_wh_addr><![CDATA[<bean:write name="mblVO" property="rcv_wh_addr" filter="false" />]]></rcv_wh_addr>
		<rcv_city_nm><![CDATA[<bean:write name="mblVO" property="rcv_city_nm" filter="false" />]]></rcv_city_nm>
		<rcv_state_nm><![CDATA[<bean:write name="mblVO" property="rcv_state_nm" filter="false" />]]></rcv_state_nm>
		</DATA>
	</logic:notEmpty>
</logic:empty>
