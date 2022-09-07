<%--
=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
=========================================================
=========================================================
*@FileName   : EDI_ISF_0010AJ.jsp
*@FileTitle  : OI ISF EDI
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
		<bean:define id="ediIsfHdrVO"   name="EventResponse" property="objVal"/>
    	<bean:define id="valMap"  name="EventResponse" property="mapVal"/>
		<DATA> 
			<hbl_no><![CDATA[<bean:write name="ediIsfHdrVO" property="hbl_no" filter="false" />]]></hbl_no>
			<cnee_trdp_cd><![CDATA[<bean:write name="ediIsfHdrVO" property="cnee_trdp_cd" filter="false" />]]></cnee_trdp_cd>
			<cnee_eng_nm><![CDATA[<bean:write name="ediIsfHdrVO" property="cnee_eng_nm" filter="false" />]]></cnee_eng_nm>
			<cnee_lgl_addr><![CDATA[<bean:write name="ediIsfHdrVO" property="cnee_lgl_addr" filter="false" />]]></cnee_lgl_addr>
			<cnee_biz_no><![CDATA[<bean:write name="ediIsfHdrVO" property="cnee_biz_no" filter="false" />]]></cnee_biz_no>
			<cnee_tax_type><![CDATA[<bean:write name="ediIsfHdrVO" property="cnee_tax_type" filter="false" />]]></cnee_tax_type>
			<cnee_state_cd><![CDATA[<bean:write name="ediIsfHdrVO" property="cnee_state_cd" filter="false" />]]></cnee_state_cd>
			<cnee_city_nm><![CDATA[<bean:write name="ediIsfHdrVO" property="cnee_city_nm" filter="false" />]]></cnee_city_nm>
			<cnee_rep_zip><![CDATA[<bean:write name="ediIsfHdrVO" property="cnee_rep_zip" filter="false" />]]></cnee_rep_zip>
			<cnee_cnt_cd><![CDATA[<bean:write name="ediIsfHdrVO" property="cnee_cnt_cd" filter="false" />]]></cnee_cnt_cd>
			<cnee_cnt_nm><![CDATA[<bean:write name="ediIsfHdrVO" property="cnee_cnt_nm" filter="false" />]]></cnee_cnt_nm>
			<hbl_tp_cd><![CDATA[<bean:write name="ediIsfHdrVO" property="hbl_tp_cd" filter="false" />]]></hbl_tp_cd>
			<isf_no><![CDATA[<bean:write name="ediIsfHdrVO" property="isf_no" filter="false" />]]></isf_no>
			<isf_trac_no><![CDATA[<bean:write name="ediIsfHdrVO" property="isf_trac_no" filter="false" />]]></isf_trac_no>
			<rgst_tms><![CDATA[<bean:write name="ediIsfHdrVO" property="rgst_tms" filter="false" />]]></rgst_tms>
			<rgst_usrid><![CDATA[<bean:write name="ediIsfHdrVO" property="rgst_usrid" filter="false" />]]></rgst_usrid>
			<modi_tms><![CDATA[<bean:write name="ediIsfHdrVO" property="modi_tms" filter="false" />]]></modi_tms>
			<modi_usrid><![CDATA[<bean:write name="ediIsfHdrVO" property="modi_usrid" filter="false" />]]></modi_usrid>
			<mbl_no><![CDATA[<bean:write name="ediIsfHdrVO" property="mbl_no" filter="false" />]]></mbl_no>
			<isf_etd><![CDATA[<wrt:write name="ediIsfHdrVO" property="isf_etd" formatType="DATE" fromFormat="yyyyMMdd" format="MM-dd-yyyy" filter="false" />]]></isf_etd>
			<isf_eta><![CDATA[<wrt:write name="ediIsfHdrVO" property="isf_eta" formatType="DATE" fromFormat="yyyyMMdd" format="MM-dd-yyyy" filter="false" />]]></isf_eta>
			<isf_scac><![CDATA[<bean:write name="ediIsfHdrVO" property="isf_scac" filter="false" />]]></isf_scac>
			<isf_vessel><![CDATA[<bean:write name="ediIsfHdrVO" property="isf_vessel" filter="false" />]]></isf_vessel>
			<isf_voyage><![CDATA[<bean:write name="ediIsfHdrVO" property="isf_voyage" filter="false" />]]></isf_voyage>
			<ref_no_6c><![CDATA[<bean:write name="ediIsfHdrVO" property="ref_no_6c" filter="false" />]]></ref_no_6c>
			<isf_pol_cd><![CDATA[<bean:write name="ediIsfHdrVO" property="isf_pol_cd" filter="false" />]]></isf_pol_cd>
			<isf_pol_name><![CDATA[<bean:write name="ediIsfHdrVO" property="isf_pol_name" filter="false" />]]></isf_pol_name>
			<isf_pod_cd><![CDATA[<bean:write name="ediIsfHdrVO" property="isf_pod_cd" filter="false" />]]></isf_pod_cd>
			<isf_pod_name><![CDATA[<bean:write name="ediIsfHdrVO" property="isf_pod_name" filter="false" />]]></isf_pod_name>
			<del><![CDATA[<bean:write name="ediIsfHdrVO" property="del" filter="false" />]]></del>
			<isf_del_name><![CDATA[<bean:write name="ediIsfHdrVO" property="isf_del_name" filter="false" />]]></isf_del_name>
			<fpod><![CDATA[<bean:write name="ediIsfHdrVO" property="fpod" filter="false" />]]></fpod>
			<isf_fpod_name><![CDATA[<bean:write name="ediIsfHdrVO" property="isf_fpod_name" filter="false" />]]></isf_fpod_name>
			<isf_imp_cd><![CDATA[<bean:write name="ediIsfHdrVO" property="isf_imp_cd" filter="false" />]]></isf_imp_cd>
			<isf_imp_name><![CDATA[<bean:write name="ediIsfHdrVO" property="isf_imp_name" filter="false" />]]></isf_imp_name>
			<isf_imp_no><![CDATA[<bean:write name="ediIsfHdrVO" property="isf_imp_no" filter="false" />]]></isf_imp_no>
			<isf_cntry_cd><![CDATA[<bean:write name="ediIsfHdrVO" property="isf_cntry_cd" filter="false" />]]></isf_cntry_cd>
			<isf_imp_dob><![CDATA[<wrt:write name="ediIsfHdrVO" property="isf_imp_dob" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></isf_imp_dob>
			<isf_bond_cd><![CDATA[<bean:write name="ediIsfHdrVO" property="isf_bond_cd" filter="false" />]]></isf_bond_cd>
			<isf_bond_name><![CDATA[<bean:write name="ediIsfHdrVO" property="isf_bond_name" filter="false" />]]></isf_bond_name>
			<isf_bond_holder><![CDATA[<bean:write name="ediIsfHdrVO" property="isf_bond_holder" filter="false" />]]></isf_bond_holder>
			<ref_no_v1><![CDATA[<bean:write name="ediIsfHdrVO" property="ref_no_v1" filter="false" />]]></ref_no_v1>
			<ref_no_sbn><![CDATA[<bean:write name="ediIsfHdrVO" property="ref_no_sbn" filter="false" />]]></ref_no_sbn>
			<infm_est_quan><![CDATA[<bean:write name="ediIsfHdrVO" property="infm_est_quan" filter="false" />]]></infm_est_quan>
			<infm_unit_mea><![CDATA[<bean:write name="ediIsfHdrVO" property="infm_unit_mea" filter="false" />]]></infm_unit_mea>
			<infm_est_value><![CDATA[<bean:write name="ediIsfHdrVO" property="infm_est_value" filter="false" />]]></infm_est_value>
			<infm_est_wgt><![CDATA[<bean:write name="ediIsfHdrVO" property="infm_est_wgt" filter="false" />]]></infm_est_wgt>
			<f_party_cd><![CDATA[<bean:write name="valMap" property="f_party_cd" filter="false" />]]></f_party_cd>
			<desc><![CDATA[<bean:write name="valMap" property="desc" filter="false" />]]></desc> 
			<isf_tp><![CDATA[<bean:write name="ediIsfHdrVO" property="isf_tp" filter="false" />]]></isf_tp> 
			<msg_sts><![CDATA[<bean:write name="ediIsfHdrVO" property="msg_sts" filter="false" />]]></msg_sts> 
			<isf_act_cd><![CDATA[<bean:write name="ediIsfHdrVO" property="isf_act_cd" filter="false" />]]></isf_act_cd> 
			<isf_act_reason><![CDATA[<bean:write name="ediIsfHdrVO" property="isf_act_reason" filter="false" />]]></isf_act_reason> 
			<isf_ship_tp><![CDATA[<bean:write name="ediIsfHdrVO" property="isf_ship_tp" filter="false" />]]></isf_ship_tp> 
			<isf_trans_mode><![CDATA[<bean:write name="ediIsfHdrVO" property="isf_trans_mode" filter="false" />]]></isf_trans_mode> 
			<isf_imp_qual><![CDATA[<bean:write name="ediIsfHdrVO" property="isf_imp_qual" filter="false" />]]></isf_imp_qual> 
			<isf_bond_act_cd><![CDATA[<bean:write name="ediIsfHdrVO" property="isf_bond_act_cd" filter="false" />]]></isf_bond_act_cd> 
			<isf_bond_tp><![CDATA[<bean:write name="ediIsfHdrVO" property="isf_bond_tp" filter="false" />]]></isf_bond_tp> 
		</DATA>
	</logic:notEmpty>
</logic:empty>
