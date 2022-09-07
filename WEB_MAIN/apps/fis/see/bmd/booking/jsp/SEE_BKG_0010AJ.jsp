<%--
=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
=========================================================
=========================================================
*@FileName   : SEE_BKG_0010AJ.jsp
*@FileTitle  : Consolidation Entry
*@Description: 
*@author     : 
*@version    : 1.0 
*@since      : 03/21/2017

*@Change history:
=========================================================
--%>
<%@ page contentType="text/xml; charset=UTF-8"%>
<%@page pageEncoding="UTF-8"%>
<%@include file="./../../../../../../syscommon/header/CLTGSHeader.jsp"%>
<logic:empty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
	<logic:notEmpty name="EventResponse" property="mapVal">		
		<bean:define id="valMap" name="EventResponse" property="mapVal"/>
		<bean:define id="ConsolVO"   name="valMap" property="bookingInfo"/>
		<DATA> 		
		<mbl_no><![CDATA[<bean:write name="ConsolVO" property="mbl_no" filter="false" />]]></mbl_no>
		<filling_no><![CDATA[<bean:write name="ConsolVO" property="filling_no" filter="false" />]]></filling_no>
		<plan_no><![CDATA[<bean:write name="ConsolVO" property="plan_no" filter="false" />]]></plan_no>
		<status><![CDATA[<bean:write name="ConsolVO" property="con_status" filter="false" />]]></status>
		<bkg_no><![CDATA[<bean:write name="ConsolVO" property="bkg_no" filter="false" />]]></bkg_no>
		<bkg_seq><![CDATA[<bean:write name="ConsolVO" property="bkg_seq" filter="false" />]]></bkg_seq>
		<trnk_vsl_nm><![CDATA[<bean:write name="ConsolVO" property="trnk_vsl_nm" filter="false" />]]></trnk_vsl_nm>
		<trnk_voy><![CDATA[<bean:write name="ConsolVO" property="trnk_voy" filter="false" />]]></trnk_voy>
		<cntr_sum><![CDATA[<bean:write name="ConsolVO" property="cntr_sum" filter="false" />]]></cntr_sum>
		<pol_cd><![CDATA[<bean:write name="ConsolVO" property="pol_cd" filter="false" />]]></pol_cd>
		<pol_nm><![CDATA[<bean:write name="ConsolVO" property="pol_nm" filter="false" />]]></pol_nm>		
		<etd_dt_tm><![CDATA[<wrt:write name="ConsolVO" property="etd_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></etd_dt_tm>
		<pod_cd><![CDATA[<bean:write name="ConsolVO" property="pod_cd" filter="false" />]]></pod_cd>
		<pod_nm><![CDATA[<bean:write name="ConsolVO" property="pod_nm" filter="false" />]]></pod_nm>
		<eta_dt_tm><![CDATA[<wrt:write name="ConsolVO" property="eta_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></eta_dt_tm>	
		<lnr_bkg_no><![CDATA[<bean:write name="ConsolVO" property="lnr_bkg_no" filter="false" />]]></lnr_bkg_no>
		<sls_ofc_cd><![CDATA[<bean:write name="ConsolVO" property="sls_ofc_cd" filter="false" />]]></sls_ofc_cd>
		<sls_usrid><![CDATA[<bean:write name="ConsolVO" property="sls_usrid" filter="false" />]]></sls_usrid>	
		<clp_sts_cd><![CDATA[<bean:write name="ConsolVO" property="clp_sts_cd" filter="false" />]]></clp_sts_cd>
		<del_cd><![CDATA[<bean:write name="ConsolVO" property="del_cd" filter="false" />]]></del_cd>
		<del_nm><![CDATA[<bean:write name="ConsolVO" property="del_nm" filter="false" />]]></del_nm><!-- #2606 [PATENT] Booking 기능 오류 항목 - 4. Consolidation Entry 화면 요건 DEL 검색 조건 추가 -->		
		</DATA>	
	</logic:notEmpty>
</logic:empty>
