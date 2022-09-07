<%--
=========================================================
*Copyright(c) 2008 CyberLogitec. All Rights Reserved.
=========================================================

=========================================================
*@FileName   : SEE_BMD_0020GS.jsp
*@FileTitle  : 
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
<logic:empty name="com.clt.framework.core.comm.EXCEPTION_OBJECT">
	
	<%--<logic:empty name="EventResponse" property="objVal">
		{
			"data":"-1"
		}
	</logic:empty>    --%>
	
	<logic:notEmpty name="EventResponse" property="objVal">
		<bean:define id="hblVO"   name="EventResponse" property="objVal"/>
		
		<DATA>
			<result><![CDATA[1]]></result>
			<shpr_trdp_cd><![CDATA[<bean:write name="hblVO"  property="shpr_trdp_cd"  filter="false" />]]></shpr_trdp_cd>
			<shpr_trdp_nm><![CDATA[<bean:write name="hblVO"  property="shpr_trdp_nm"  filter="false" />]]></shpr_trdp_nm>
			<shpr_trdp_addr><![CDATA[<bean:write name="hblVO"  property="shpr_trdp_addr"  filter="false" />]]></shpr_trdp_addr>
			<cnee_trdp_cd><![CDATA[<bean:write name="hblVO"  property="cnee_trdp_cd"  filter="false" />]]></cnee_trdp_cd>
			<cnee_trdp_nm><![CDATA[<bean:write name="hblVO"  property="cnee_trdp_nm"  filter="false" />]]></cnee_trdp_nm>
			<cnee_trdp_addr><![CDATA[<bean:write name="hblVO"  property="cnee_trdp_addr"  filter="false" />]]></cnee_trdp_addr>
			
			<pck_ut_cd><![CDATA[<bean:write name="hblVO"  property="pck_ut_cd"  filter="false" />]]></pck_ut_cd>
			<pck_qty><![CDATA[<bean:write name="hblVO"  property="pck_qty"  filter="false" />]]></pck_qty>
			<grs_wgt><![CDATA[<bean:write name="hblVO"  property="grs_wgt"  filter="false" />]]></grs_wgt>
			<grs_wgt1><![CDATA[<bean:write name="hblVO"  property="grs_wgt1"  filter="false" />]]></grs_wgt1>
			<meas><![CDATA[<bean:write name="hblVO"  property="meas"  filter="false" />]]></meas>
			<meas1><![CDATA[<bean:write name="hblVO"  property="meas1"  filter="false" />]]></meas1>
			
			<obrd_dt_tm1><![CDATA[<wrt:write name="hblVO" property="obrd_dt_tm1" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />]]></obrd_dt_tm1>
			<iss_loc_nm1><![CDATA[<bean:write name="hblVO"  property="iss_loc_nm1"  filter="false" />]]></iss_loc_nm1>
			<onward_rout><![CDATA[<bean:write name="hblVO"  property="onward_rout"  filter="false" />]]></onward_rout>
			<org_bl_qty><![CDATA[<bean:write name="hblVO"  property="org_bl_qty"  filter="false" />]]></org_bl_qty>
			<itn_no><![CDATA[<bean:write name="hblVO"  property="itn_no"  filter="false" />]]></itn_no>
			<trans_shipment><![CDATA[<bean:write name="hblVO"  property="trans_shipment"  filter="false" />]]></trans_shipment>
			<say_txt><![CDATA[<bean:write name="hblVO"  property="say_txt"  filter="false" />]]></say_txt>
			<sad_txt><![CDATA[<bean:write name="hblVO"  property="sad_txt"  filter="false" />]]></sad_txt>
			<mk_grs_wgt><![CDATA[<bean:write name="hblVO"  property="mk_grs_wgt"  filter="false" />]]></mk_grs_wgt>
			<mk_grs_wgt1><![CDATA[<bean:write name="hblVO"  property="mk_grs_wgt1"  filter="false" />]]></mk_grs_wgt1>
			<mk_meas><![CDATA[<bean:write name="hblVO"  property="mk_meas"  filter="false" />]]></mk_meas>
			<mk_meas1><![CDATA[<bean:write name="hblVO"  property="mk_meas1"  filter="false" />]]></mk_meas1>
			<carr_trdp_cd1><![CDATA[<bean:write name="hblVO"  property="carr_trdp_cd1"  filter="false" />]]></carr_trdp_cd1>
			<carr_trdp_nm1><![CDATA[<bean:write name="hblVO"  property="carr_trdp_nm1"  filter="false" />]]></carr_trdp_nm1>
			<mk_txt><![CDATA[<bean:write name="hblVO"  property="mk_txt"  filter="false" />]]></mk_txt>
			<desc_txt1><![CDATA[<bean:write name="hblVO"  property="desc_txt1"  filter="false" />]]></desc_txt1>
			<desc_txt><![CDATA[<bean:write name="hblVO"  property="desc_txt"  filter="false" />]]></desc_txt>
			<exp_frt_desc><![CDATA[<bean:write name="hblVO"  property="exp_frt_desc"  filter="false" />]]></exp_frt_desc>
			<clean_on_board><![CDATA[<bean:write name="hblVO"  property="clean_on_board"  filter="false" />]]></clean_on_board>
			<wgt_disp_cd><![CDATA[<bean:write name="hblVO"  property="wgt_disp_cd"  filter="false" />]]></wgt_disp_cd>
			<rmk><![CDATA[<bean:write name="hblVO"  property="rmk"  filter="false" />]]></rmk>
			<po_no><![CDATA[<bean:write name="hblVO"  property="po_no"  filter="false" />]]></po_no>
			<item_no><![CDATA[<bean:write name="hblVO"  property="item_no"  filter="false" />]]></item_no>
			
			<rep_cmdt_cd><![CDATA[<bean:write name="hblVO"  property="rep_cmdt_cd"  filter="false" />]]></rep_cmdt_cd>
			<rep_cmdt_nm><![CDATA[<bean:write name="hblVO"  property="rep_cmdt_nm"  filter="false" />]]></rep_cmdt_nm>
			<state_cd><![CDATA[<bean:write name="hblVO"  property="state_cd"  filter="false" />]]></state_cd>
			<state_nm><![CDATA[<bean:write name="hblVO"  property="state_nm"  filter="false" />]]></state_nm>
			<cnt_cd><![CDATA[<bean:write name="hblVO"  property="cnt_cd"  filter="false" />]]></cnt_cd>
			<cnt_nm><![CDATA[<bean:write name="hblVO"  property="cnt_nm"  filter="false" />]]></cnt_nm>
			<cargo_tp_cd><![CDATA[<bean:write name="hblVO"  property="cargo_tp_cd"  filter="false" />]]></cargo_tp_cd>			
			<goods_value><![CDATA[<bean:write name="hblVO"  property="goods_value"  filter="false" />]]></goods_value>
			<cfs_rmk><![CDATA[<bean:write name="hblVO"  property="cfs_rmk"  filter="false" />]]></cfs_rmk>
			
			
		</DATA>
		
		<%--{
			"data" : "1",
			"shpr_trdp_cd" : "<bean:write name="hblVO" property="shpr_trdp_cd" filter="false"/>",
			"shpr_trdp_nm" : "<bean:write name="hblVO" property="shpr_trdp_nm" filter="false"/>",
			"shpr_addr" : "<bean:write name="hblVO" property="shpr_trdp_addr" filter="false"/>",
			"cnse_cd" : "<bean:write name="hblVO" property="cnee_trdp_cd" filter="false"/>",
			"cnse_nm" : "<bean:write name="hblVO" property="cnee_trdp_nm" filter="false"/>",
			"cnse_addr" : "<bean:write name="hblVO" property="cnee_trdp_addr" filter="false"/>",
			
			"pck_ut_cd" : "<bean:write name="hblVO" property="pck_ut_cd" filter="false"/>",
			"pck_qty" : "<bean:write name="hblVO" property="pck_qty" filter="false"/>",
			"grs_wgt" : "<bean:write name="hblVO" property="grs_wgt" filter="false"/>",
			"grs_wgt1" : "<bean:write name="hblVO" property="grs_wgt1" filter="false"/>",
			"meas" : "<bean:write name="hblVO" property="meas" filter="false"/>",
			"meas1" : "<bean:write name="hblVO" property="meas1" filter="false"/>",
			
			"obrd_dt_tm1" : "<wrt:write name="hblVO" property="obrd_dt_tm1" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy" filter="false" />",
			"iss_loc_cd1" : "<bean:write name="hblVO" property="iss_loc_cd1" filter="false"/>",
			"iss_loc_nm1" : "<bean:write name="hblVO" property="iss_loc_nm1" filter="false"/>",
			"onward_rout" : "<bean:write name="hblVO" property="onward_rout" filter="false"/>",
			"org_bl_qty" : "<bean:write name="hblVO" property="org_bl_qty" filter="false"/>",
			"itn_no" : "<bean:write name="hblVO" property="itn_no" filter="false"/>",
			"trans_shipment" : "<bean:write name="hblVO" property="trans_shipment" filter="false"/>",
			"say_txt" : "<bean:write name="hblVO" property="say_txt" filter="false"/>",
			"sad_txt" : "<bean:write name="hblVO" property="sad_txt" filter="false"/>",
			"mk_grs_wgt" : "<bean:write name="hblVO" property="mk_grs_wgt" filter="false"/>",
			"mk_grs_wgt1" : "<bean:write name="hblVO" property="mk_grs_wgt1" filter="false"/>",
			"mk_meas" : "<bean:write name="hblVO" property="mk_meas" filter="false"/>",
			"mk_meas1" : "<bean:write name="hblVO" property="mk_meas1" filter="false"/>",
			"carr_trdp_cd1" : "<bean:write name="hblVO" property="carr_trdp_cd1" filter="false"/>",
			"carr_trdp_nm1" : "<bean:write name="hblVO" property="carr_trdp_nm1" filter="false"/>",
			"mk_txt" : "<bean:write name="hblVO" property="mk_txt" filter="false"/>",
			"desc_txt1" : "<bean:write name="hblVO" property="desc_txt1" filter="false"/>",
			"desc_txt" : "<bean:write name="hblVO" property="desc_txt" filter="false"/>",
			"exp_frt_desc" : "<bean:write name="hblVO" property="exp_frt_desc" filter="false"/>",
			"clean_on_board" : "<bean:write name="hblVO" property="clean_on_board" filter="false"/>",
			"wgt_disp_cd" : "<bean:write name="hblVO" property="wgt_disp_cd" filter="false"/>",
			"rmk" : "<bean:write name="hblVO" property="rmk" filter="false"/>",
			"po_no" : "<bean:write name="hblVO" property="po_no" filter="false"/>",
			"item_no" : "<bean:write name="hblVO" property="item_no" filter="false"/>"
		}--%>
		
	</logic:notEmpty>    
</logic:empty>
<%-- 오류발생 --%>
<logic:notEmpty name="com.clt.framework.core.comm.EXCEPTION_OBJECT">
    <ERROR>
        <MESSAGE><![CDATA[ <bean:message name="com.clt.framework.core.comm.EXCEPTION_OBJECT" property="message"/>]]> </MESSAGE>
    </ERROR>
</logic:notEmpty>
