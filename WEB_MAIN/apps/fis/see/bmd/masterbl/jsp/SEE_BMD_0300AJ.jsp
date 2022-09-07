<%--
=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
=========================================================
=========================================================
*@FileName   : SEE_BMD_0300AJ.jsp
*@FileTitle  : Ocean Quotation
*@Description: 
*@author     : Tan.Duong - Dou
*@version    : 1.0 - 9/12/2014
*@since      : 05/12/2014

*@Change history:
=========================================================
--%>
<%@ page contentType="text/xml; charset=UTF-8"%>
<%@include file="./../../../../../../syscommon/header/CLTGSHeader.jsp"%>
<logic:empty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
	<logic:notEmpty name="EventResponse" property="objVal">
		<bean:define id="qttnVo"   name="EventResponse" property="objVal"/>
		<bean:define id="valMap"  name="EventResponse" property="mapVal"/>
		<DATA>
			<air_sea_clss_cd><![CDATA[<bean:write name="valMap"  property="air_sea_clss_cd"  filter="false" />]]></air_sea_clss_cd>
			<bnd_clss_cd><![CDATA[<bean:write name="valMap"  property="bnd_clss_cd"  filter="false" />]]></bnd_clss_cd>
			<f_qttn_seq><![CDATA[<bean:write name="valMap" property="f_qttn_seq" filter="false" />]]></f_qttn_seq>
			<qttn_seq><![CDATA[<bean:write name="qttnVo"  property="qttn_seq"  filter="false" />]]></qttn_seq>
			<f_qttn_no><![CDATA[<bean:write name="valMap" property="f_qttn_no" filter="false" />]]></f_qttn_no>
			<qttn_no><![CDATA[<bean:write name="qttnVo" property="qttn_no" filter="false" />]]></qttn_no>
			<qttn_dt><![CDATA[<wrt:write name="qttnVo" property="qttn_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></qttn_dt>
			<cust_cd><![CDATA[<bean:write name="qttnVo" property="cust_cd" filter="false" />]]></cust_cd>
			<cust_nm><![CDATA[<bean:write name="qttnVo" property="cust_nm" filter="false" />]]></cust_nm>
			<cust_addr><![CDATA[<bean:write name="qttnVo" property="cust_addr" filter="false" />]]></cust_addr>
			<cust_pic_nm><![CDATA[<bean:write name="qttnVo" property="cust_pic_nm" filter="false" />]]></cust_pic_nm>
			<agn_cd><![CDATA[<bean:write name="qttnVo" property="agn_cd" filter="false" />]]></agn_cd>
			<agn_nm><![CDATA[<bean:write name="qttnVo" property="agn_nm"  filter="false" />]]></agn_nm>
			<inco_cd><![CDATA[<bean:write name="qttnVo" property="inco_cd" filter="false" />]]></inco_cd>
			<vty_dt><![CDATA[<wrt:write name="qttnVo" property="vty_dt" formatType="DATE" fromFormat="yyyyMMdd" format="MM-dd-yyyy" filter="false" />]]></vty_dt>
			<cmdt_cd><![CDATA[<bean:write name="qttnVo" property="cmdt_cd" filter="false" />]]></cmdt_cd>
			<cmdt_nm><![CDATA[<bean:write name="qttnVo" property="cmdt_nm"  filter="false" />]]></cmdt_nm>
			<pck_qty><![CDATA[<bean:write name="qttnVo" property="pck_qty" filter="false" />]]></pck_qty>
			<pck_ut_cd><![CDATA[<bean:write name="qttnVo" property="pck_ut_cd" filter="false" />]]></pck_ut_cd>
			<grs_wgt_kg><![CDATA[<bean:write name="qttnVo" property="grs_wgt_kg"  filter="false" />]]></grs_wgt_kg>
			<grs_wgt_lbs><![CDATA[<bean:write name="qttnVo" property="grs_wgt_lbs" filter="false" />]]></grs_wgt_lbs>
			<meas_cbm><![CDATA[<bean:write name="qttnVo" property="meas_cbm" filter="false" />]]></meas_cbm>
			<meas_cft><![CDATA[<bean:write name="qttnVo" property="meas_cft"  filter="false" />]]></meas_cft>
			<mode><![CDATA[<bean:write name="qttnVo" property="mode"  filter="false" />]]></mode>
			<tt><![CDATA[<bean:write name="qttnVo" property="tt"  filter="false" />]]></tt>
			<carr_nm><![CDATA[<bean:write name="qttnVo" property="carr_nm"  filter="false" />]]></carr_nm>
			<por_cd><![CDATA[<bean:write name="qttnVo" property="por_cd" filter="false" />]]></por_cd>
			<por_nm><![CDATA[<bean:write name="qttnVo" property="por_nm" filter="false" />]]></por_nm>
			<pol_cd><![CDATA[<bean:write name="qttnVo" property="pol_cd"  filter="false" />]]></pol_cd>
			<pol_nm><![CDATA[<bean:write name="qttnVo" property="pol_nm"  filter="false" />]]></pol_nm>
			<pod_cd><![CDATA[<bean:write name="qttnVo" property="pod_cd" filter="false" />]]></pod_cd>
			<pod_nm><![CDATA[<bean:write name="qttnVo" property="pod_nm" filter="false" />]]></pod_nm>
			<del_cd><![CDATA[<bean:write name="qttnVo" property="del_cd" filter="false" />]]></del_cd>
			<del_nm><![CDATA[<bean:write name="qttnVo" property="del_nm" filter="false" />]]></del_nm>
			<fnl_dest_loc_cd><![CDATA[<bean:write name="qttnVo" property="fnl_dest_loc_cd" filter="false" />]]></fnl_dest_loc_cd>
			<fnl_dest_loc_nm><![CDATA[<bean:write name="qttnVo" property="fnl_dest_loc_nm" filter="false" />]]></fnl_dest_loc_nm>
			<!-- state_cd><![CDATA[<bean:write name="qttnVo" property="state_cd" filter="false" />]]></state_cd -->
			<!-- state_nm><![CDATA[<bean:write name="qttnVo" property="state_nm" filter="false" />]]></state_nm -->
			<!-- state_cnt_cd><![CDATA[<bean:write name="qttnVo" property="state_cnt_cd" filter="false" />]]></state_cnt_cd -->
			<curr_cd><![CDATA[<bean:write name="qttnVo" property="curr_cd" filter="false" />]]></curr_cd>
			<opr_usr_id><![CDATA[<bean:write name="qttnVo" property="opr_usr_id" filter="false" />]]></opr_usr_id>
			<bkg_no><![CDATA[<bean:write name="qttnVo" property="bkg_no" filter="false" />]]></bkg_no>
			<cust_ref_no><![CDATA[<bean:write name="qttnVo" property="cust_ref_no" filter="false" />]]></cust_ref_no>
			<free_form_chk><![CDATA[<bean:write name="qttnVo" property="free_form_chk" filter="false" />]]></free_form_chk>
			<free_form_txt><![CDATA[<bean:write name="qttnVo" property="free_form_txt" filter="false" />]]></free_form_txt>
			<rmk><![CDATA[<bean:write name="qttnVo" property="rmk" filter="false" />]]></rmk>
			<eq_type><![CDATA[<bean:write name="qttnVo" property="eq_type" filter="false" />]]></eq_type>
		</DATA>
	</logic:notEmpty>    
</logic:empty>
