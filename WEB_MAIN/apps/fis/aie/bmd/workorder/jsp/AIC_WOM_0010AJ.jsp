<%--
=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
=========================================================
=========================================================
*@FileName   : AIC_WOM_0010AJ.jsp
*@FileTitle  : Pre-Pickup Order Entry URL Copy
*@Description: 
*@author     : Trieu.Nguyen - Dou
*@version    : 1.0 - 05/12/2014
*@since      : 9/12/2014

*@Change history:
=========================================================
--%>
<%@ page contentType="text/xml; charset=UTF-8"%>
<%@page pageEncoding="UTF-8"%>
<%@include file="./../../../../../../syscommon/header/CLTGSHeader.jsp"%>
<logic:empty name="com.clt.framework.core.comm.EXCEPTION_OBJECT ">
	<logic:notEmpty name="EventResponse" property="mapVal">
	<logic:notEmpty name="EventResponse" property="objVal">
	<bean:define id="valMap" name="EventResponse" property="mapVal"/>
	<bean:define id="woPickDeliVO"  name="EventResponse" property="objVal"/>
	<bean:define id="officeInfo" name="valMap" property="officeInfo"/>
    <bean:define id="ofcVO" name="officeInfo"/>
		<DATA>
			<sysOfcCd><![CDATA[<bean:write name="valMap" property="sysOfcCd" filter="false" />]]></sysOfcCd>
			<intg_bl_seq><![CDATA[<bean:write name="woPickDeliVO" property="intg_bl_seq" filter="false" />]]></intg_bl_seq>
			<wo_sts_cd><![CDATA[<bean:write name="woPickDeliVO" property="wo_sts_cd" filter="false" />]]></wo_sts_cd>
			<bnd_clss_cd><![CDATA[<bean:write name="woPickDeliVO" property="bnd_clss_cd" filter="false" />]]></bnd_clss_cd>
			<oth_seq><![CDATA[<bean:write name="woPickDeliVO" property="oth_seq" filter="false" />]]></oth_seq>
			<pkup_rmk><![CDATA[<bean:write name="ofcVO" property="pkup_rmk" filter="false" />]]></pkup_rmk>
			<wo_no><![CDATA[<bean:write name="woPickDeliVO" property="wo_no" filter="false" />]]></wo_no>
			<wo_tp_cd><![CDATA[<bean:write name="woPickDeliVO" property="wo_tp_cd" filter="false" />]]></wo_tp_cd>
			<pickup_trdp_cd><![CDATA[<bean:write name="woPickDeliVO" property="pickup_trdp_cd" filter="false" />]]></pickup_trdp_cd>
			<pickup_trdp_nm><![CDATA[<bean:write name="woPickDeliVO" property="pickup_trdp_nm" filter="false" />]]></pickup_trdp_nm>
			<pickup_trdp_addr><![CDATA[<bean:write name="woPickDeliVO" property="pickup_trdp_addr" filter="false" />]]></pickup_trdp_addr>
			<pickup_pic><![CDATA[<bean:write name="woPickDeliVO" property="pickup_pic" filter="false" />]]></pickup_pic>
			<pickup_phn><![CDATA[<bean:write name="woPickDeliVO" property="pickup_phn" filter="false" />]]></pickup_phn>
			<pickup_fax><![CDATA[<bean:write name="woPickDeliVO" property="pickup_fax" filter="false" />]]></pickup_fax>
			<pickup_ref_no><![CDATA[<bean:write name="woPickDeliVO" property="pickup_ref_no" filter="false" />]]></pickup_ref_no>
			<pickup_dt><![CDATA[<wrt:write name="woPickDeliVO" property="pickup_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></pickup_dt>
			<pickup_tm><![CDATA[<wrt:write name="woPickDeliVO" property="pickup_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm" filter="false" />]]></pickup_tm>
			<pickup_to_tm><![CDATA[<wrt:write name="woPickDeliVO" property="pickup_to_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm" filter="false" />]]></pickup_to_tm>
			<delivery_trdp_cd><![CDATA[<bean:write name="woPickDeliVO" property="delivery_trdp_cd" filter="false" />]]></delivery_trdp_cd>
			<delivery_trdp_nm><![CDATA[<bean:write name="woPickDeliVO" property="delivery_trdp_nm" filter="false" />]]></delivery_trdp_nm>
			<delivery_trdp_addr><![CDATA[<bean:write name="woPickDeliVO" property="delivery_trdp_addr" filter="false" />]]></delivery_trdp_addr>
			<delivery_pic><![CDATA[<bean:write name="woPickDeliVO" property="delivery_pic" filter="false" />]]></delivery_pic>
			<delivery_phn><![CDATA[<bean:write name="woPickDeliVO" property="delivery_phn" filter="false" />]]></delivery_phn>
			<delivery_fax><![CDATA[<bean:write name="woPickDeliVO" property="delivery_fax" filter="false" />]]></delivery_fax>
			<delivery_ref_no><![CDATA[<bean:write name="woPickDeliVO" property="delivery_ref_no" filter="false" />]]></delivery_ref_no>
			<delivery_dt><![CDATA[<wrt:write name="woPickDeliVO" property="delivery_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></delivery_dt>
			<delivery_tm><![CDATA[<wrt:write name="woPickDeliVO" property="delivery_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm" filter="false" />]]></delivery_tm>
			<delivery_to_tm><![CDATA[<wrt:write name="woPickDeliVO" property="delivery_to_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm" filter="false" />]]></delivery_to_tm>
			<return_trdp_cd><![CDATA[<bean:write name="woPickDeliVO" property="return_trdp_cd" filter="false" />]]></return_trdp_cd>
			<return_trdp_nm><![CDATA[<bean:write name="woPickDeliVO" property="return_trdp_nm" filter="false" />]]></return_trdp_nm>
			<return_trdp_addr><![CDATA[<bean:write name="woPickDeliVO" property="return_trdp_addr" filter="false" />]]></return_trdp_addr>
			<return_pic><![CDATA[<bean:write name="woPickDeliVO" property="return_pic" filter="false" />]]></return_pic>
			<return_phn><![CDATA[<bean:write name="woPickDeliVO" property="return_phn" filter="false" />]]></return_phn>
			<return_fax><![CDATA[<bean:write name="woPickDeliVO" property="return_fax" filter="false" />]]></return_fax>
			<return_ref_no><![CDATA[<bean:write name="woPickDeliVO" property="return_ref_no" filter="false" />]]></return_ref_no>
			<return_dt><![CDATA[<wrt:write name="woPickDeliVO" property="return_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></return_dt>
			<return_tm><![CDATA[<wrt:write name="woPickDeliVO" property="return_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm" filter="false" />]]></return_tm>
			<return_to_tm><![CDATA[<wrt:write name="woPickDeliVO" property="return_to_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm" filter="false" />]]></return_to_tm>
			<bl_no><![CDATA[<bean:write name="woPickDeliVO" property="bl_no" filter="false" />]]></bl_no>
			<!-- OFVFOUR-7798: [Southeast] Update the Title/Subject of Pickup# Notice -->
			<mbl_no_ref><![CDATA[<bean:write name="woPickDeliVO" property="mbl_no_ref" filter="false" />]]></mbl_no_ref>
			<bill_to_ref_no><![CDATA[<bean:write name="woPickDeliVO" property="bill_to_ref_no" filter="false" />]]></bill_to_ref_no>
			<bill_to_trdp_cd><![CDATA[<bean:write name="woPickDeliVO" property="bill_to_trdp_cd" filter="false" />]]></bill_to_trdp_cd>
			<bill_to_trdp_nm><![CDATA[<bean:write name="woPickDeliVO" property="bill_to_trdp_nm" filter="false" />]]></bill_to_trdp_nm>
			<bill_to_trdp_addr><![CDATA[<bean:write name="woPickDeliVO" property="bill_to_trdp_addr" filter="false" />]]></bill_to_trdp_addr>
			<bill_to_pic><![CDATA[<bean:write name="woPickDeliVO" property="bill_to_pic" filter="false" />]]></bill_to_pic>
			<bill_to_phn><![CDATA[<bean:write name="woPickDeliVO" property="bill_to_phn" filter="false" />]]></bill_to_phn>
			<bill_to_fax><![CDATA[<bean:write name="woPickDeliVO" property="bill_to_fax" filter="false" />]]></bill_to_fax>
			<trucker_trdp_cd><![CDATA[<bean:write name="woPickDeliVO" property="trucker_trdp_cd" filter="false" />]]></trucker_trdp_cd>
			<trucker_trdp_nm><![CDATA[<bean:write name="woPickDeliVO" property="trucker_trdp_nm" filter="false" />]]></trucker_trdp_nm>
			<trucker_trdp_addr><![CDATA[<bean:write name="woPickDeliVO" property="trucker_trdp_addr" filter="false" />]]></trucker_trdp_addr>
			<trucker_pic><![CDATA[<bean:write name="woPickDeliVO" property="trucker_pic" filter="false" />]]></trucker_pic>
			<trucker_phn><![CDATA[<bean:write name="woPickDeliVO" property="trucker_phn" filter="false" />]]></trucker_phn>
			<trucker_fax><![CDATA[<bean:write name="woPickDeliVO" property="trucker_fax" filter="false" />]]></trucker_fax>
			<pol_cd><![CDATA[<bean:write name="woPickDeliVO" property="pol_cd" filter="false" />]]></pol_cd>
			<pol_nm><![CDATA[<bean:write name="woPickDeliVO" property="pol_nm" filter="false" />]]></pol_nm>
			<pod_cd><![CDATA[<bean:write name="woPickDeliVO" property="pod_cd" filter="false" />]]></pod_cd>
			<pod_nm><![CDATA[<bean:write name="woPickDeliVO" property="pod_nm" filter="false" />]]></pod_nm>
			<cgo_itm_cmdt_cd><![CDATA[<bean:write name="woPickDeliVO" property="cgo_itm_cmdt_cd" filter="false" />]]></cgo_itm_cmdt_cd>
			<cgo_itm_cmdt_nm><![CDATA[<bean:write name="woPickDeliVO" property="cgo_itm_cmdt_nm" filter="false" />]]></cgo_itm_cmdt_nm>
			<cgo_pck_qty><![CDATA[<wrt:write name="woPickDeliVO" property="cgo_pck_qty" formatType="MONEY" format="#,###" filter="false" />]]></cgo_pck_qty>
			<cgo_pck_ut_cd><![CDATA[<bean:write name="woPickDeliVO" property="cgo_pck_ut_cd" filter="false" />]]></cgo_pck_ut_cd>
			<act_wgt_k><![CDATA[<wrt:write name="woPickDeliVO" property="act_wgt_k" formatType="MONEY" format="#,##0.00" filter="false" />]]></act_wgt_k>
			<act_wgt_l><![CDATA[<wrt:write name="woPickDeliVO" property="act_wgt_l" formatType="MONEY" format="#,##0.00" filter="false" />]]></act_wgt_l>
			<cgo_meas_m><![CDATA[<wrt:write name="woPickDeliVO" property="cgo_meas_m" formatType="MONEY" format="#,##0.000" filter="false" />]]></cgo_meas_m>
			<cgo_meas_f><![CDATA[<wrt:write name="woPickDeliVO" property="cgo_meas_f" formatType="MONEY" format="#,##0.000" filter="false" />]]></cgo_meas_f>
			<lnr_trdp_cd><![CDATA[<bean:write name="woPickDeliVO" property="lnr_trdp_cd" filter="false" />]]></lnr_trdp_cd>
			<lnr_trdp_nm><![CDATA[<bean:write name="woPickDeliVO" property="lnr_trdp_nm" filter="false" />]]></lnr_trdp_nm>
			<lnr_bkg_no><![CDATA[<bean:write name="woPickDeliVO" property="lnr_bkg_no" filter="false" />]]></lnr_bkg_no>
			<prt_md_yn><![CDATA[<bean:write name="woPickDeliVO" property="prt_md_yn" filter="false" />]]></prt_md_yn>
			<rmk><![CDATA[<bean:write name="woPickDeliVO" property="rmk" filter="false" />]]></rmk>
			<wh_instr_txt><![CDATA[<bean:write name="woPickDeliVO" property="wh_instr_txt" filter="false" />]]></wh_instr_txt>
			<cstms_instr_txt><![CDATA[<bean:write name="woPickDeliVO" property="cstms_instr_txt" filter="false" />]]></cstms_instr_txt>
			<cstms_cust_cd><![CDATA[<bean:write name="woPickDeliVO" property="cstms_cust_cd" filter="false" />]]></cstms_cust_cd>
			<cstms_cust_nm><![CDATA[<bean:write name="woPickDeliVO" property="cstms_cust_nm" filter="false" />]]></cstms_cust_nm>
			<cstms_cust_pic><![CDATA[<bean:write name="woPickDeliVO" property="cstms_cust_pic" filter="false" />]]></cstms_cust_pic>
			<cstms_cust_phn><![CDATA[<bean:write name="woPickDeliVO" property="cstms_cust_phn" filter="false" />]]></cstms_cust_phn>
			<cstms_cust_fax><![CDATA[<bean:write name="woPickDeliVO" property="cstms_cust_fax" filter="false" />]]></cstms_cust_fax>
			<cut_off_dt><![CDATA[<wrt:write name="woPickDeliVO" property="cut_off_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></cut_off_dt>
			<cut_off_tm><![CDATA[<wrt:write name="woPickDeliVO" property="cut_off_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm" filter="false" />]]></cut_off_tm>
			<cut_off_to_tm><![CDATA[<wrt:write name="woPickDeliVO" property="cut_off_to_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm" filter="false" />]]></cut_off_to_tm>
			<exp_ref_no><![CDATA[<bean:write name="woPickDeliVO" property="exp_ref_no" filter="false" />]]></exp_ref_no>
			<cust_cd><![CDATA[<bean:write name="woPickDeliVO" property="cust_cd" filter="false" />]]></cust_cd>
			<cust_nm><![CDATA[<bean:write name="woPickDeliVO" property="cust_nm" filter="false" />]]></cust_nm>
			<cust_pic><![CDATA[<bean:write name="woPickDeliVO" property="cust_pic" filter="false" />]]></cust_pic>
			<cust_phn><![CDATA[<bean:write name="woPickDeliVO" property="cust_phn" filter="false" />]]></cust_phn>
			<cust_fax><![CDATA[<bean:write name="woPickDeliVO" property="cust_fax" filter="false" />]]></cust_fax>
			<cust_addr><![CDATA[<bean:write name="woPickDeliVO" property="cust_addr" filter="false" />]]></cust_addr>
			<wh_cd><![CDATA[<bean:write name="woPickDeliVO" property="wh_cd" filter="false" />]]></wh_cd>
			<wh_nm><![CDATA[<bean:write name="woPickDeliVO" property="wh_nm" filter="false" />]]></wh_nm>
			<wh_pic><![CDATA[<bean:write name="woPickDeliVO" property="wh_pic" filter="false" />]]></wh_pic>
			<wh_phn><![CDATA[<bean:write name="woPickDeliVO" property="wh_phn" filter="false" />]]></wh_phn>
			<wh_fax><![CDATA[<bean:write name="woPickDeliVO" property="wh_fax" filter="false" />]]></wh_fax>
			<wh_ref_no><![CDATA[<bean:write name="woPickDeliVO" property="wh_ref_no" filter="false" />]]></wh_ref_no>
			<wh_dt><![CDATA[<wrt:write name="woPickDeliVO" property="wh_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></wh_dt>
			<wh_tm><![CDATA[<wrt:write name="woPickDeliVO" property="wh_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm" filter="false" />]]></wh_tm>
			<wh_to_tm><![CDATA[<wrt:write name="woPickDeliVO" property="wh_to_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm" filter="false" />]]></wh_to_tm>
			<trnk_vsl_cd><![CDATA[<bean:write name="woPickDeliVO" property="trnk_vsl_cd" filter="false" />]]></trnk_vsl_cd>
			<trnk_vsl_nm><![CDATA[<bean:write name="woPickDeliVO" property="trnk_vsl_nm" filter="false" />]]></trnk_vsl_nm>
			<cstms_tp_cd><![CDATA[<bean:write name="woPickDeliVO" property="cstms_tp_cd" filter="false" />]]></cstms_tp_cd>
			<trnk_voy><![CDATA[<bean:write name="woPickDeliVO" property="trnk_voy" filter="false" />]]></trnk_voy>
			
			<!-- #2045 hsk -->
			<drv_nm><![CDATA[<bean:write name="woPickDeliVO" property="drv_nm" filter="false" />]]></drv_nm>
			<drv_phn><![CDATA[<bean:write name="woPickDeliVO" property="drv_phn" filter="false" />]]></drv_phn>
			<trk_plat_no><![CDATA[<bean:write name="woPickDeliVO" property="trk_plat_no" filter="false" />]]></trk_plat_no>
			<wh_lodg_instr_txt><![CDATA[<bean:write name="woPickDeliVO" property="wh_lodg_instr_txt" filter="false" />]]></wh_lodg_instr_txt>
			
			<!--  pickupDelivery New UI hsk-->
			<cstms_cust_addr><![CDATA[<bean:write name="woPickDeliVO" property="cstms_cust_addr" filter="false" />]]></cstms_cust_addr>
			<wh_addr><![CDATA[<bean:write name="woPickDeliVO" property="wh_addr" filter="false" />]]></wh_addr>
			<cargo_tp_cd><![CDATA[<bean:write name="woPickDeliVO" property="cargo_tp_cd" filter="false" />]]></cargo_tp_cd>
			<cntr_smry><![CDATA[<bean:write name="woPickDeliVO" property="cntr_smry" filter="false" />]]></cntr_smry>
			<etd_dt_tm><![CDATA[<wrt:write name="woPickDeliVO" property="etd_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></etd_dt_tm>
			<eta_dt_tm><![CDATA[<wrt:write name="woPickDeliVO" property="eta_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></eta_dt_tm>
			<rgst_usrid><![CDATA[<bean:write name="woPickDeliVO" property="rgst_usrid" filter="false" />]]></rgst_usrid>
			<rgst_tms><![CDATA[<wrt:write name="woPickDeliVO" property="rgst_tms"  filter="false" formatType="DATE" fromFormat="MMddyyyyHHmmss" format="MM-dd-yyyy HH:mm:ss" />]]></rgst_tms>
			<modi_usrid><![CDATA[<bean:write name="woPickDeliVO" property="modi_usrid" filter="false" />]]></modi_usrid>
			<modi_tms><![CDATA[<wrt:write name="woPickDeliVO" property="modi_tms"  filter="false" formatType="DATE" fromFormat="MMddyyyyHHmmss" format="MM-dd-yyyy HH:mm:ss" />]]></modi_tms>
			<biz_unit_trdp_cd><![CDATA[<bean:write name="woPickDeliVO" property="biz_unit_trdp_cd" filter="false" />]]></biz_unit_trdp_cd>
			<biz_unit_trdp_nm><![CDATA[<bean:write name="woPickDeliVO" property="biz_unit_trdp_nm" filter="false" />]]></biz_unit_trdp_nm>
			
			<!-- #2668 [PATENT] Bugs were reported when doing internal testing (Work Order) -->
			<ref_no><![CDATA[<bean:write name="woPickDeliVO" property="ref_no" filter="false" />]]></ref_no>
			<!-- OFVFOUR-7857[SENKO USA] Container Summary on Pickup & Delivery Order form -->
			<cntr_info><![CDATA[<bean:write name="woPickDeliVO" property="cntr_info" filter="false" />]]></cntr_info>
		</DATA>
		</logic:notEmpty>
	</logic:notEmpty>    
</logic:empty>
