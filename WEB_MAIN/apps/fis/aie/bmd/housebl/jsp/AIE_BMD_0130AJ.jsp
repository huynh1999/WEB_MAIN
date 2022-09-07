<%--
=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
=========================================================
=========================================================
*@FileName   : AIE_BMD_0130AJ.jsp
*@FileTitle  : AEH AWB Entry
*@Description: 
*@author     : Khang.Dong - Dou
*@version    : 1.0 - 10/12/2014
*@since      : 10/12/2014

*@Change history:
=========================================================
--%>
<%@ page contentType="text/xml; charset=UTF-8"%>
<%@page pageEncoding="UTF-8"%>
<%@include file="./../../../../../../syscommon/header/CLTGSHeader.jsp"%>
<logic:empty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
	<logic:notEmpty name="EventResponse" property="mapVal">
		<bean:define id="valMap" name="EventResponse" property="mapVal"/>
		<bean:define id="plVO"   name="valMap" property="plInfo"/>
		<DATA> 
		<wrk_tp><![CDATA[<bean:write name="plVO" property="wrk_tp" filter="false" />]]></wrk_tp>
		<print_yn><![CDATA[<bean:write name="plVO" property="print_yn" filter="false" />]]></print_yn>
		<save_yn><![CDATA[<bean:write name="plVO" property="save_yn" filter="false" />]]></save_yn>
		<bl_no><![CDATA[<bean:write name="plVO" property="bl_no" filter="false" />]]></bl_no>
		<intg_bl_seq><![CDATA[<bean:write name="plVO" property="intg_bl_seq" filter="false" />]]></intg_bl_seq>
		<seller_addr><![CDATA[<bean:write name="plVO" property="seller_addr" filter="false" />]]></seller_addr>
		<cnee_addr><![CDATA[<bean:write name="plVO" property="cnee_addr" filter="false" />]]></cnee_addr>
		<notify_addr><![CDATA[<bean:write name="plVO" property="notify_addr" filter="false" />]]></notify_addr>
		<inv_no><![CDATA[<bean:write name="plVO" property="inv_no" filter="false" />]]></inv_no>
		<inv_dt><![CDATA[<bean:write name="plVO" property="inv_dt" filter="false" />]]></inv_dt>
		<lc_no><![CDATA[<bean:write name="plVO" property="lc_no" filter="false" />]]></lc_no>
		<lc_dt><![CDATA[<bean:write name="plVO" property="lc_dt" filter="false" />]]></lc_dt>
		<lc_issue_bank><![CDATA[<bean:write name="plVO" property="lc_issue_bank" filter="false" />]]></lc_issue_bank>
		<svc_term><![CDATA[<bean:write name="plVO" property="svc_term" filter="false" />]]></svc_term>
		<pol_nm><![CDATA[<bean:write name="plVO" property="pol_nm" filter="false" />]]></pol_nm>
		<etd_dttm><![CDATA[<bean:write name="plVO" property="etd_dttm" filter="false" />]]></etd_dttm>
		<pod_nm><![CDATA[<bean:write name="plVO" property="pod_nm" filter="false" />]]></pod_nm>
		<carr_trdp_cd><![CDATA[<bean:write name="plVO" property="carr_trdp_cd" filter="false" />]]></carr_trdp_cd>
		<carr_trdp_nm><![CDATA[<bean:write name="plVO" property="carr_trdp_nm" filter="false" />]]></carr_trdp_nm>
		<vsl_flt><![CDATA[<bean:write name="plVO" property="vsl_flt" filter="false" />]]></vsl_flt>
		<mk_txt><![CDATA[<bean:write name="plVO" property="mk_txt" filter="false" />]]></mk_txt>
		<qty><![CDATA[<bean:write name="plVO" property="qty" filter="false" />]]></qty> 
		<desc_txt><![CDATA[<bean:write name="plVO" property="desc_txt" filter="false" />]]></desc_txt>
		<price><![CDATA[<bean:write name="plVO" property="price" filter="false" />]]></price>
		<amount><![CDATA[<bean:write name="plVO" property="amount" filter="false" />]]></amount>

		</DATA>
	</logic:notEmpty>
</logic:empty>
