<%--
=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
=========================================================
=========================================================
*@FileName   : SAL_TPM_0010AJ.jsp
*@FileTitle  : Pre-Pickup Order Entry URL Copy
*@Description: 
*@author     : Tu.Nguyen - Dou
*@version    : 1.0 - 05/12/2014
*@since      : 05/12/2014

*@Change history:
=========================================================
--%>
<%@ page contentType="text/xml; charset=UTF-8"%>
<%@page pageEncoding="UTF-8"%>
<%@include file="./../../../../../../syscommon/header/CLTGSHeader.jsp"%>
<logic:empty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
	<logic:notEmpty name="EventResponse" property="mapVal">
			<bean:define id="valMap" name="EventResponse" property="mapVal"/>
			<bean:define id="coVO"   name="valMap" property="coInfo"/>
		<DATA>
			<intg_bl_seq><![CDATA[<bean:write name="coVO" property="intg_bl_seq" filter="false" />]]></intg_bl_seq>
			<wrk_tp><![CDATA[<bean:write name="coVO" property="wrk_tp" filter="false" />]]></wrk_tp>
			<print_yn><![CDATA[<bean:write name="coVO" property="print_yn" filter="false" />]]></print_yn>
			<save_yn><![CDATA[<bean:write name="coVO" property="save_yn" filter="false" />]]></save_yn>
			<txt_hbl_no><![CDATA[<bean:write name="coVO" property="txt_hbl_no" filter="false" />]]></txt_hbl_no>
			<shpr_addr><![CDATA[<bean:write name="coVO" property="shpr_addr" filter="false" />]]></shpr_addr>
			<cnee_addr><![CDATA[<bean:write name="coVO" property="cnee_addr" filter="false" />]]></cnee_addr>
			<notify_addr><![CDATA[<bean:write name="coVO" property="notify_addr" filter="false" />]]></notify_addr>
			<agent_addr><![CDATA[<bean:write name="coVO" property="agent_addr" filter="false" />]]></agent_addr>
			<bl_no><![CDATA[<bean:write name="coVO" property="bl_no" filter="false" />]]></bl_no>
			<inv_dt><![CDATA[<bean:write name="coVO" property="inv_dt" filter="false" />]]></inv_dt>
			<exp_ref_no><![CDATA[<bean:write name="coVO" property="exp_ref_no" filter="false" />]]></exp_ref_no>
			<cnt_origin><![CDATA[<bean:write name="coVO" property="cnt_origin" filter="false" />]]></cnt_origin>
			<point_entry><![CDATA[<bean:write name="coVO" property="point_entry" filter="false" />]]></point_entry>
			<exp_carrier><![CDATA[<bean:write name="coVO" property="exp_carrier" filter="false" />]]></exp_carrier>
			<pol_nm><![CDATA[<bean:write name="coVO" property="pol_nm" filter="false" />]]></pol_nm>
			<pod_nm><![CDATA[<bean:write name="coVO" property="pod_nm" filter="false" />]]></pod_nm>
			<chamber><![CDATA[<bean:write name="coVO" property="chamber" filter="false" />]]></chamber>
			<state_nm><![CDATA[<bean:write name="coVO" property="state_nm" filter="false" />]]></state_nm>
			<mk_txt><![CDATA[<bean:write name="coVO" property="mk_txt" filter="false" />]]></mk_txt>
			<qty><![CDATA[<bean:write name="coVO" property="qty" filter="false" />]]></qty>
			<desc_txt><![CDATA[<bean:write name="coVO" property="desc_txt" filter="false" />]]></desc_txt>
			<grs_wgt><![CDATA[<bean:write name="coVO" property="grs_wgt" filter="false" />]]></grs_wgt>
			<chg_wgt><![CDATA[<bean:write name="coVO" property="chg_wgt" filter="false" />]]></chg_wgt>
			<meas><![CDATA[<bean:write name="coVO" property="meas" filter="false" />]]></meas>

		</DATA>
	</logic:notEmpty>    
</logic:empty>
