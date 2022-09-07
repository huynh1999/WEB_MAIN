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
	<logic:notEmpty name="EventResponse" property="objVal">
		<bean:define id="woPickDeliVO"  name="EventResponse" property="objVal"/>
		<DATA>
			<wo_no><![CDATA[<bean:write name="woPickDeliVO" property="wo_no" filter="false" />]]></wo_no>
			<trsp_trdp_cd><![CDATA[<bean:write name="woPickDeliVO" property="trsp_trdp_cd" filter="false" />]]></trsp_trdp_cd>
			<trsp_trdp_nm><![CDATA[<bean:write name="woPickDeliVO" property="trsp_trdp_nm" filter="false" />]]></trsp_trdp_nm>
			<trsp_trdp_addr><![CDATA[<bean:write name="woPickDeliVO" property="trsp_trdp_addr" filter="false" />]]></trsp_trdp_addr>
			<org_rout_trdp_cd><![CDATA[<bean:write name="woPickDeliVO" property="org_rout_trdp_cd" filter="false" />]]></org_rout_trdp_cd>
			<org_rout_trdp_nm><![CDATA[<bean:write name="woPickDeliVO" property="org_rout_trdp_nm" filter="false" />]]></org_rout_trdp_nm>
			<org_rout_addr><![CDATA[<bean:write name="woPickDeliVO" property="org_rout_addr" filter="false" />]]></org_rout_addr>
			<dest_rout_trdp_cd><![CDATA[<bean:write name="woPickDeliVO" property="dest_rout_trdp_cd" filter="false" />]]></dest_rout_trdp_cd>
			<dest_rout_trdp_nm><![CDATA[<bean:write name="woPickDeliVO" property="dest_rout_trdp_nm" filter="false" />]]></dest_rout_trdp_nm>
			<dest_rout_addr><![CDATA[<bean:write name="woPickDeliVO" property="dest_rout_addr" filter="false" />]]></dest_rout_addr>
			<bill_to_trdp_cd><![CDATA[<bean:write name="woPickDeliVO" property="bill_to_trdp_cd" filter="false" />]]></bill_to_trdp_cd>
			<bill_to_trdp_nm><![CDATA[<bean:write name="woPickDeliVO" property="bill_to_trdp_nm" filter="false" />]]></bill_to_trdp_nm>
			<bill_to_trdp_addr><![CDATA[<bean:write name="woPickDeliVO" property="bill_to_trdp_addr" filter="false" />]]></bill_to_trdp_addr>
			<iss_dt_tm><![CDATA[<bean:write name="woPickDeliVO" property="iss_dt_tm" filter="false" />]]></iss_dt_tm>
			<iss_usrid><![CDATA[<bean:write name="woPickDeliVO" property="iss_usrid" filter="false" />]]></iss_usrid>
			<org_rout_dt_tm><![CDATA[<bean:write name="woPickDeliVO" property="org_rout_dt_tm" filter="false" />]]></org_rout_dt_tm>
			<org2_rout_dt_tm><![CDATA[<bean:write name="woPickDeliVO" property="org2_rout_dt_tm" filter="false" />]]></org2_rout_dt_tm>
			<rmk><![CDATA[<bean:write name="woPickDeliVO" property="rmk" filter="false" />]]></rmk>
			<dest_rout_dt_tm><![CDATA[<bean:write name="woPickDeliVO" property="dest_rout_dt_tm" filter="false" />]]></dest_rout_dt_tm>
			<via_rout_dt_tm><![CDATA[<bean:write name="woPickDeliVO" property="via_rout_dt_tm" filter="false" />]]></via_rout_dt_tm>
			<cgo_pck_qty><![CDATA[<wrt:write name="woPickDeliVO" property="cgo_pck_qty" formatType="MONEY" format="#,###" filter="false" />]]></cgo_pck_qty>
			<cgo_pck_ut_cd><![CDATA[<bean:write name="woPickDeliVO" property="cgo_pck_ut_cd" filter="false" />]]></cgo_pck_ut_cd>
			<!-- OFVFOUR-7817: [PQC][WH Pickup Order Entry] - The values of Package, Measurement, Volume Weight fields in existing WH Pickup Order Entry DOES NOT display comma for each 1,000 unit -->
			<act_wgt_k><![CDATA[<wrt:write name="woPickDeliVO" property="act_wgt_k" formatType="MONEY" format="#,##0.000" filter="false" />]]></act_wgt_k>
			<act_wgt_l><![CDATA[<wrt:write name="woPickDeliVO" property="act_wgt_l" formatType="MONEY" format="#,##0.000" filter="false" />]]></act_wgt_l>
			<cgo_meas_m><![CDATA[<wrt:write name="woPickDeliVO" property="cgo_meas_m" formatType="MONEY" format="#,##0.000" filter="false" />]]></cgo_meas_m>
			<cgo_meas_f><![CDATA[<wrt:write name="woPickDeliVO" property="cgo_meas_f" formatType="MONEY" format="#,##0.000" filter="false" />]]></cgo_meas_f>
			<chg_wgt><![CDATA[<wrt:write name="woPickDeliVO" property="chg_wgt" formatType="MONEY" format="#,##0.000" filter="false" />]]></chg_wgt>
			<chg_wgt1><![CDATA[<wrt:write name="woPickDeliVO" property="chg_wgt1" formatType="MONEY" format="#,##0.000" filter="false" />]]></chg_wgt1>
			<via_rout_addr><![CDATA[<bean:write name="woPickDeliVO" property="via_rout_addr" filter="false" />]]></via_rout_addr>
			<prnr_trdp_cd><![CDATA[<bean:write name="woPickDeliVO" property="prnr_trdp_cd" filter="false" />]]></prnr_trdp_cd>
			<prnr_trdp_nm><![CDATA[<bean:write name="woPickDeliVO" property="prnr_trdp_nm" filter="false" />]]></prnr_trdp_nm>
			<prnr_trdp_addr><![CDATA[<bean:write name="woPickDeliVO" property="prnr_trdp_addr" filter="false" />]]></prnr_trdp_addr>
			<shpr_trdp_cd><![CDATA[<bean:write name="woPickDeliVO" property="shpr_trdp_cd" filter="false" />]]></shpr_trdp_cd>
			<shpr_trdp_nm><![CDATA[<bean:write name="woPickDeliVO" property="shpr_trdp_nm" filter="false" />]]></shpr_trdp_nm>
			<shpr_trdp_addr><![CDATA[<bean:write name="woPickDeliVO" property="shpr_trdp_addr" filter="false" />]]></shpr_trdp_addr>
			<cnee_trdp_cd><![CDATA[<bean:write name="woPickDeliVO" property="cnee_trdp_cd" filter="false" />]]></cnee_trdp_cd>
			<cnee_trdp_nm><![CDATA[<bean:write name="woPickDeliVO" property="cnee_trdp_nm" filter="false" />]]></cnee_trdp_nm>
			<cnee_trdp_addr><![CDATA[<bean:write name="woPickDeliVO" property="cnee_trdp_addr" filter="false" />]]></cnee_trdp_addr>
			<org2_rout_addr><![CDATA[<bean:write name="woPickDeliVO" property="org2_rout_addr" filter="false" />]]></org2_rout_addr>
			<certi_pkup_as_cd><![CDATA[<bean:write name="woPickDeliVO" property="certi_pkup_as_cd" filter="false" />]]></certi_pkup_as_cd>
			<org_ofc_hr><![CDATA[<bean:write name="woPickDeliVO" property="org_ofc_hr" filter="false" />]]></org_ofc_hr>
			<via_ofc_hr><![CDATA[<bean:write name="woPickDeliVO" property="via_ofc_hr" filter="false" />]]></via_ofc_hr>
			<size_ut_cd><![CDATA[<bean:write name="woPickDeliVO" property="size_ut_cd" filter="false" />]]></size_ut_cd>
		</DATA>
	</logic:notEmpty>    
</logic:empty>
