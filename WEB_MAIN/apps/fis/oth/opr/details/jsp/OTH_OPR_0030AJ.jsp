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
		<bean:define id="poVO"   name="EventResponse" property="objVal"/>
    	<bean:define id="valMap"  name="EventResponse" property="mapVal"/>
		<DATA>
			<f_isNumSep><![CDATA[<bean:write name="valMap" property="f_isNumSep" filter="false" />]]></f_isNumSep>
			<f_cust_po_no><![CDATA[<bean:write name="valMap"  property="f_cust_po_no" filter="false" />]]></f_cust_po_no>
			<f_po_sys_no><![CDATA[<bean:write name="valMap"  property="f_po_sys_no" filter="false" />]]></f_po_sys_no>
			<cust_po_no><![CDATA[<bean:write name="poVO" property="cust_po_no" filter="false" />]]></cust_po_no>
			<ref_ofc_cd><![CDATA[<bean:write name="poVO" property="ref_ofc_cd" filter="false" />]]></ref_ofc_cd>
			<po_sys_no><![CDATA[<bean:write name="poVO" property="po_sys_no" filter="false" />]]></po_sys_no>
			<ord_sts_cd><![CDATA[<bean:write name="poVO" property="ord_sts_cd" filter="false" />]]></ord_sts_cd>
			<ctrt_no><![CDATA[<bean:write name="poVO" property="ctrt_no" filter="false" />]]></ctrt_no>
			<ctrt_nm><![CDATA[<bean:write name="poVO" property="ctrt_nm" filter="false" />]]></ctrt_nm>
			<cust_trdp_cd><![CDATA[<bean:write name="poVO" property="cust_trdp_cd" filter="false" />]]></cust_trdp_cd>
			<cust_trdp_nm><![CDATA[<bean:write name="poVO" property="cust_trdp_nm" filter="false" />]]></cust_trdp_nm>
			<cust_trdp_addr><![CDATA[<bean:write name="poVO" property="cust_trdp_addr"  filter="false" />]]></cust_trdp_addr>
			<cust_trdp_pic><![CDATA[<bean:write name="poVO" property="cust_trdp_pic" filter="false" />]]></cust_trdp_pic>
			<cust_trdp_eml><![CDATA[<bean:write name="poVO" property="cust_trdp_eml" filter="false" />]]></cust_trdp_eml>
			<cust_trdp_phn><![CDATA[<bean:write name="poVO" property="cust_trdp_phn" filter="false" />]]></cust_trdp_phn>
			<cust_trdp_fax><![CDATA[<bean:write name="poVO" property="cust_trdp_fax" filter="false" />]]></cust_trdp_fax>
			<buyr_trdp_cd><![CDATA[<bean:write name="poVO" property="buyr_trdp_cd" filter="false" />]]></buyr_trdp_cd>
			<buyr_trdp_nm><![CDATA[<bean:write name="poVO" property="buyr_trdp_nm" filter="false" />]]></buyr_trdp_nm>
			<vndr_trdp_cd><![CDATA[<bean:write name="poVO" property="vndr_trdp_cd" filter="false" />]]></vndr_trdp_cd>
			<vndr_trdp_nm><![CDATA[<bean:write name="poVO" property="vndr_trdp_nm" filter="false" />]]></vndr_trdp_nm>
			<vndr_trdp_addr><![CDATA[<bean:write name="poVO" property="vndr_trdp_addr"  filter="false" />]]></vndr_trdp_addr>
			<vndr_trdp_pic><![CDATA[<bean:write name="poVO" property="vndr_trdp_pic" filter="false" />]]></vndr_trdp_pic>
			<vndr_trdp_eml><![CDATA[<bean:write name="poVO" property="vndr_trdp_eml" filter="false" />]]></vndr_trdp_eml>
			<vndr_trdp_phn><![CDATA[<bean:write name="poVO" property="vndr_trdp_phn" filter="false" />]]></vndr_trdp_phn>
			<vndr_trdp_fax><![CDATA[<bean:write name="poVO" property="vndr_trdp_fax" filter="false" />]]></vndr_trdp_fax>
			<fctry_trdp_cd><![CDATA[<bean:write name="poVO" property="fctry_trdp_cd" filter="false" />]]></fctry_trdp_cd>
			<fctry_trdp_nm><![CDATA[<bean:write name="poVO" property="fctry_trdp_nm" filter="false" />]]></fctry_trdp_nm>
			<fctry_trdp_addr><![CDATA[<bean:write name="poVO" property="fctry_trdp_addr"  filter="false" />]]></fctry_trdp_addr>
			<fctry_trdp_pic><![CDATA[<bean:write name="poVO" property="fctry_trdp_pic" filter="false" />]]></fctry_trdp_pic>
			<fctry_trdp_eml><![CDATA[<bean:write name="poVO" property="fctry_trdp_eml" filter="false" />]]></fctry_trdp_eml>
			<fctry_trdp_phn><![CDATA[<bean:write name="poVO" property="fctry_trdp_phn" filter="false" />]]></fctry_trdp_phn>
			<fctry_trdp_fax><![CDATA[<bean:write name="poVO" property="fctry_trdp_fax" filter="false" />]]></fctry_trdp_fax>
			
			<shpto_trdp_cd><![CDATA[<bean:write name="poVO" property="shpto_trdp_cd" filter="false" />]]></shpto_trdp_cd>
			<shpto_trdp_nm><![CDATA[<bean:write name="poVO" property="shpto_trdp_nm" filter="false" />]]></shpto_trdp_nm>
			<shpto_trdp_addr><![CDATA[<bean:write name="poVO" property="shpto_trdp_addr"  filter="false" />]]></shpto_trdp_addr>
			<shpto_trdp_pic><![CDATA[<bean:write name="poVO" property="shpto_trdp_pic" filter="false" />]]></shpto_trdp_pic>
			<shpto_trdp_eml><![CDATA[<bean:write name="poVO" property="shpto_trdp_eml" filter="false" />]]></shpto_trdp_eml>
			<shpto_trdp_phn><![CDATA[<bean:write name="poVO" property="shpto_trdp_phn" filter="false" />]]></shpto_trdp_phn>
			<shpto_trdp_fax><![CDATA[<bean:write name="poVO" property="shpto_trdp_fax" filter="false" />]]></shpto_trdp_fax>
			
			
			<org_loc_cd><![CDATA[<bean:write name="poVO" property="org_loc_cd" filter="false" />]]></org_loc_cd>
			<org_loc_nm><![CDATA[<bean:write name="poVO" property="org_loc_nm" filter="false" />]]></org_loc_nm>
			<dest_loc_cd><![CDATA[<bean:write name="poVO" property="dest_loc_cd" filter="false" />]]></dest_loc_cd>
			<dest_loc_nm><![CDATA[<bean:write name="poVO" property="dest_loc_nm" filter="false" />]]></dest_loc_nm>
			<air_sea_clss_cd><![CDATA[<bean:write name="poVO" property="air_sea_clss_cd" filter="false" />]]></air_sea_clss_cd>
			<frt_term_cd><![CDATA[<bean:write name="poVO" property="frt_term_cd" filter="false" />]]></frt_term_cd>
			<inco_cd><![CDATA[<bean:write name="poVO" property="inco_cd" filter="false" />]]></inco_cd>
			<cust_instr_txt><![CDATA[<bean:write name="poVO" property="cust_instr_txt"  filter="false" />]]></cust_instr_txt>
			<po_rmk><![CDATA[<bean:write name="poVO" property="po_rmk"  filter="false" />]]></po_rmk>
			<ord_dt><![CDATA[<wrt:write name="poVO" property="ord_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></ord_dt>
			<arr_dt><![CDATA[<wrt:write name="poVO" property="arr_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></arr_dt>
			<shpwin_fr_dt><![CDATA[<wrt:write name="poVO" property="shpwin_fr_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></shpwin_fr_dt>
			<shpwin_to_dt><![CDATA[<wrt:write name="poVO" property="shpwin_to_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></shpwin_to_dt>
			<cgo_rdy_dt><![CDATA[<wrt:write name="poVO" property="cgo_rdy_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></cgo_rdy_dt>
			<dept_cd><![CDATA[<bean:write name="poVO" property="dept_cd" filter="false" />]]></dept_cd>
			<cntr_qty><![CDATA[<bean:write name="poVO" property="cntr_qty" filter="false" />]]></cntr_qty>
			<cntr_tpsz_cd><![CDATA[<bean:write name="poVO" property="cntr_tpsz_cd" filter="false" />]]></cntr_tpsz_cd>
			<rgst_usrid><![CDATA[<bean:write name="poVO" property="rgst_usrid" filter="false" />]]></rgst_usrid>
			<rgst_tms><![CDATA[<bean:write name="poVO" property="rgst_tms" filter="false" />]]></rgst_tms>
			<modi_usrid><![CDATA[<bean:write name="poVO" property="modi_usrid" filter="false" />]]></modi_usrid>
			<modi_tms><![CDATA[<bean:write name="poVO" property="modi_tms" filter="false" />]]></modi_tms>			
			<shpwin_alert_yn><![CDATA[<bean:write name="poVO" property="shpwin_alert_yn" filter="false" />]]></shpwin_alert_yn>
			<noti_send_yn><![CDATA[<bean:write name="poVO" property="noti_send_yn" filter="false" />]]></noti_send_yn>			
			<ord_yr><![CDATA[<bean:write name="poVO" property="ord_yr" filter="false" />]]></ord_yr>			
			<ord_wk><![CDATA[<bean:write name="poVO" property="ord_wk" filter="false" />]]></ord_wk>			
			
		</DATA>
	</logic:notEmpty>    
</logic:empty>