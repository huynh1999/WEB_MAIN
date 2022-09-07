<%--
=========================================================
*@FileName   : OTH_OPR_0010GS.jsp
*@FileTitle  : OTH_SALES
*@Description: OTH_SALES
*@author     : Chungrue - Cyberlogitec
*@version    : 1.0 - 2011/11/18
*@since      : 2011/11/18

*@Change history:
=========================================================
--%>
<%@ page contentType="text/xml; charset=UTF-8"%>
<%@page pageEncoding="UTF-8"%>
<%@include file="./../../../../../../syscommon/header/CLTGSHeader.jsp"%>
<%-- 정상처리 --%>
<logic:empty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
			<logic:notEmpty name="EventResponse" property="objVal">
				<bean:define id="othDetailsVO" 	name="EventResponse" property="objVal"/>
				<DATA>
					<oth_seq><![CDATA[<bean:write name="othDetailsVO" property="oth_seq" filter="false" />]]></oth_seq>
					<ref_no><![CDATA[<bean:write name="othDetailsVO" property="ref_no" filter="false" />]]></ref_no>
					<sts_cd><![CDATA[<bean:write name="othDetailsVO" property="sts_cd" filter="false" />]]></sts_cd>
					<post_dt><![CDATA[<bean:write  name="othDetailsVO" property="post_dt"  filter="false" />]]></post_dt>
					<ofc_cd><![CDATA[<bean:write name="othDetailsVO" property="ofc_cd" filter="false" />]]></ofc_cd>
					<type><![CDATA[<bean:write name="othDetailsVO" property="type" filter="false" />]]></type>
					<mbl_no><![CDATA[<bean:write name="othDetailsVO" property="mbl_no" filter="false" />]]></mbl_no>
					<hbl_no><![CDATA[<bean:write name="othDetailsVO" property="hbl_no" filter="false" />]]></hbl_no>
					<vsl_flt><![CDATA[<bean:write name="othDetailsVO" property="vsl_flt" filter="false" />]]></vsl_flt>
					<cust_cd><![CDATA[<bean:write name="othDetailsVO" property="cust_cd" filter="false" />]]></cust_cd>
					<cust_nm><![CDATA[<bean:write name="othDetailsVO" property="cust_nm" filter="false" />]]></cust_nm>
					<cust_ref_no><![CDATA[<bean:write name="othDetailsVO" property="cust_ref_no" filter="false" />]]></cust_ref_no>
					<shpr_nm><![CDATA[<bean:write name="othDetailsVO" property="shpr_nm" filter="false" />]]></shpr_nm>
					<cnee_nm><![CDATA[<bean:write name="othDetailsVO" property="cnee_nm" filter="false" />]]></cnee_nm>
					<cmdt_cd><![CDATA[<bean:write name="othDetailsVO" property="cmdt_cd" filter="false" />]]></cmdt_cd>
					<cmdt_nm><![CDATA[<bean:write name="othDetailsVO" property="cmdt_nm" filter="false" />]]></cmdt_nm>
					<loc_nm><![CDATA[<bean:write name="othDetailsVO" property="loc_nm" filter="false" />]]></loc_nm>
					<cntr_info><![CDATA[<bean:write name="othDetailsVO" property="cntr_info" filter="false" />]]></cntr_info>
					<pol_cd><![CDATA[<bean:write name="othDetailsVO" property="pol_cd" filter="false" />]]></pol_cd>
					<pol_nm><![CDATA[<bean:write name="othDetailsVO" property="pol_nm" filter="false" />]]></pol_nm>
					<pod_cd><![CDATA[<bean:write name="othDetailsVO" property="pod_cd" filter="false" />]]></pod_cd>
					<pod_nm><![CDATA[<bean:write name="othDetailsVO" property="pod_nm" filter="false" />]]></pod_nm>
					<fnl_dest_loc_cd><![CDATA[<bean:write name="othDetailsVO" property="fnl_dest_loc_cd" filter="false" />]]></fnl_dest_loc_cd>
					<fnl_dest_loc_nm><![CDATA[<bean:write name="othDetailsVO" property="fnl_dest_loc_nm" filter="false" />]]></fnl_dest_loc_nm>
					<pu_loc_cd><![CDATA[<bean:write name="othDetailsVO" property="pu_loc_cd" filter="false" />]]></pu_loc_cd>
					<pu_loc_nm><![CDATA[<bean:write name="othDetailsVO" property="pu_loc_nm" filter="false" />]]></pu_loc_nm>
					<pck_qty><![CDATA[<bean:write name="othDetailsVO" property="pck_qty" filter="false" />]]></pck_qty>
					<pck_ut_cd><![CDATA[<bean:write name="othDetailsVO" property="pck_ut_cd" filter="false" />]]></pck_ut_cd>
					<grs_wgt_k><![CDATA[<wrt:write name="othDetailsVO" property="grs_wgt_k" formatType="MONEY" format="#,###.00" filter="false" />]]></grs_wgt_k>
					<grs_wgt_l><![CDATA[<wrt:write name="othDetailsVO" property="grs_wgt_l" formatType="MONEY" format="#,###.00" filter="false" />]]></grs_wgt_l>
					<meas_m><![CDATA[<wrt:write name="othDetailsVO" property="meas_m" formatType="MONEY" format="#,###.000" filter="false" />]]></meas_m>
					<meas_f><![CDATA[<wrt:write name="othDetailsVO" property="meas_f" formatType="MONEY" format="#,###.000" filter="false" />]]></meas_f>
					<int_memo><![CDATA[<bean:write name="othDetailsVO" property="int_memo" filter="false" />]]></int_memo>
					<etd_dt_tm><![CDATA[<bean:write name="othDetailsVO" property="etd_dt_tm" filter="false" />]]></etd_dt_tm>
					<eta_dt_tm><![CDATA[<bean:write name="othDetailsVO" property="eta_dt_tm" filter="false" />]]></eta_dt_tm>
					<feta_dt_tm><![CDATA[<bean:write name="othDetailsVO" property="feta_dt_tm" filter="false" />]]></feta_dt_tm>
					
					<!-- #873 [STARWAY] LOAD DATE, DATE OF RECEIPT FIELDS TO BE ADDED -->
					<feta_tm><![CDATA[<bean:write name="othDetailsVO" property="feta_tm" filter="false" />]]></feta_tm>
					<lod_dt_tm><![CDATA[<bean:write name="othDetailsVO" property="lod_dt_tm" filter="false" />]]></lod_dt_tm>
					<lod_tm><![CDATA[<bean:write name="othDetailsVO" property="lod_tm" filter="false" />]]></lod_tm>

					<!-- #657 [OCEAN BLUE, IMPEX] B/L SELECTION FLAG TO SHOW ON VISIBILITY PORTAL -->
					<inter_use_flag><![CDATA[<bean:write name="othDetailsVO" property="inter_use_flag" filter="false" />]]></inter_use_flag>

					<door_loc_cd><![CDATA[<bean:write name="othDetailsVO" property="door_loc_cd" filter="false" />]]></door_loc_cd>
					<door_loc_nm><![CDATA[<bean:write name="othDetailsVO" property="door_loc_nm" filter="false" />]]></door_loc_nm>
					<curr_cd><![CDATA[<bean:write name="othDetailsVO" property="curr_cd" filter="false" />]]></curr_cd>
					<sls_usrid><![CDATA[<bean:write name="othDetailsVO" property="sls_usrid" filter="false" />]]></sls_usrid>
					<sls_ofc_cd><![CDATA[<bean:write name="othDetailsVO" property="sls_ofc_cd" filter="false" />]]></sls_ofc_cd>
					<opr_usrid><![CDATA[<bean:write name="othDetailsVO" property="opr_usrid" filter="false" />]]></opr_usrid>
					<ext_memo><![CDATA[<bean:write name="othDetailsVO" property="ext_memo" filter="false" />]]></ext_memo>
					<ctrb_ofc_cd><![CDATA[<bean:write name="othDetailsVO" property="ctrb_ofc_cd" filter="false" />]]></ctrb_ofc_cd>
					<ctrb_dept_cd><![CDATA[<bean:write name="othDetailsVO" property="ctrb_dept_cd" filter="false" />]]></ctrb_dept_cd>
					<ctrb_ratio_yn><![CDATA[<bean:write name="othDetailsVO" property="ctrb_ratio_yn" filter="false" />]]></ctrb_ratio_yn>
					<ctrb_mgn><![CDATA[<bean:write name="othDetailsVO" property="ctrb_mgn" filter="false" />]]></ctrb_mgn>
					
				</DATA>
			</logic:notEmpty>
</logic:empty>