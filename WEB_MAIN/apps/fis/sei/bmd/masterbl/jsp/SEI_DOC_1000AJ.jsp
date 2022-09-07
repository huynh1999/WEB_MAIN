<%--
=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
=========================================================
=========================================================
*@FileName   : SEE_BMD_0130AJ.jsp
*@FileTitle  : Pre-Pickup Order Entry URL Copy
*@Description: 
*@author     : Tu.Nguyen - Dou
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
		<bean:define id="mblVO"   name="EventResponse" property="objVal"/>
		<DATA>
			<intg_bl_seq><![CDATA[<bean:write name="mblVO" property="intg_bl_seq" filter="false" />]]></intg_bl_seq>
			<cntr_info><![CDATA[<bean:write name="mblVO" property="cntr_info" filter="false" />]]></cntr_info>
			<pic_eml><![CDATA[<bean:write name="mblVO" property="pic_eml" filter="false" />]]></pic_eml>
			<ref_no><![CDATA[<bean:write name="mblVO" property="ref_no" filter="false" />]]></ref_no>
			<mbl_no><![CDATA[<bean:write name="mblVO" property="mbl_no" filter="false" />]]></mbl_no>
			<cfs_trdp_cd><![CDATA[<bean:write name="mblVO" property="cfs_trdp_cd" filter="false" />]]></cfs_trdp_cd>
			<cfs_trdp_nm><![CDATA[<bean:write name="mblVO" property="cfs_trdp_nm" filter="false" />]]></cfs_trdp_nm>
			<cy_trdp_cd><![CDATA[<bean:write name="mblVO" property="cy_trdp_cd" filter="false" />]]></cy_trdp_cd>
			<cy_trdp_nm><![CDATA[<bean:write name="mblVO" property="cy_trdp_nm" filter="false" />]]></cy_trdp_nm>
			<cfs_firm_cd><![CDATA[<bean:write name="mblVO" property="cfs_firm_cd" filter="false" />]]></cfs_firm_cd>
			<cfs_lgl_addr><![CDATA[<bean:write name="mblVO" property="cfs_lgl_addr" filter="false" />]]></cfs_lgl_addr>
			<cfs_city_nm><![CDATA[<bean:write name="mblVO" property="cfs_city_nm" filter="false" />]]></cfs_city_nm>
			<cfs_zip_cd><![CDATA[<bean:write name="mblVO" property="cfs_zip_cd" filter="false" />]]></cfs_zip_cd>
			<cfs_state_cd><![CDATA[<bean:write name="mblVO" property="cfs_state_cd" filter="false" />]]></cfs_state_cd>
			<trnk_vsl_nm><![CDATA[<bean:write name="mblVO" property="trnk_vsl_nm" filter="false" />]]></trnk_vsl_nm>
			<trnk_voy><![CDATA[<bean:write name="mblVO" property="trnk_voy" filter="false" />]]></trnk_voy>
			<mbl_it_no><![CDATA[<bean:write name="mblVO" property="mbl_it_no" filter="false" />]]></mbl_it_no>
			<rmk_dev><![CDATA[<bean:write name="mblVO" property="rmk_dev" filter="false" />]]></rmk_dev>
		</DATA>
	</logic:notEmpty>    
</logic:empty>
