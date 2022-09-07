<%--
=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
=========================================================

=========================================================
*@FileName   : WWHM_WHM_0009GS.jsp
*@FileTitle  : 
*@Description: 
*@author     : Thoa.Dien - Cyberlogitec
*@version    : 1.0 - 2014/12/22
*@since      : 2014/12/22

*@Change history:
=========================================================
--%>
<%@ page contentType="text/xml; charset=UTF-8"%>
<%@page pageEncoding="UTF-8"%>
<%@include file="./../../../../../../syscommon/header/CLTGSHeader.jsp"%>
<%-- 정상처리 --%>
<logic:empty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
		<%-- 조회 결과가 없는 경우 --%>
			<logic:empty name="EventResponse" property="listVal">
				<SHEET>
					<DATA TOTAL="0"></DATA>
				</SHEET>	
			</logic:empty>
		<%-- 조회 결과가 있는 경우 --%>
			<logic:notEmpty name="EventResponse" property="listVal">
				<bean:define id="rowSet" name="EventResponse" property="listVal"/>
				<SHEET>
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
					<logic:iterate id="row" name="rowSet">
						<tr>
							<TD></TD>
							<TD><bean:write name="row" property="chk1"/></TD>
							<TD><bean:write name="row" property="cust_cd"/></TD>
							<TD><bean:write name="row" property="cust_nm"/></TD>
							<TD><bean:write name="row" property="sb_cls_cd"/></TD>
							<TD><bean:write name="row" property="rate_tp_cd"/></TD>
							<TD><bean:write name="row" property="pre_cls_dt"/></TD>
							<TD><bean:write name="row" property="trans_dt"/></TD>
							<TD><bean:write name="row" property="bk_no"/></TD>
							<TD><bean:write name="row" property="ord_tp_cd"/></TD>
							<TD><bean:write name="row" property="order_rel"/></TD>
							<TD><bean:write name="row" property="load_tp_cd"/></TD>
							<TD><bean:write name="row" property="merge_key"/></TD>
							<TD><bean:write name="row" property="item_cd"/></TD>
							<TD><bean:write name="row" property="item_nm"/></TD>
							<TD><bean:write name="row" property="lot_id"/></TD>
							<!-- LKH 2016.07.21 :: Closing Create 시 Storage 로직 수정 -->
							<TD><bean:write name="row" property="str_in_ea_qty"/></TD>
							<TD><bean:write name="row" property="stock_period"/></TD>
							<TD><bean:write name="row" property="pkg_info"/></TD>
							<TD><bean:write name="row" property="ea_qty"/></TD>
							<TD><bean:write name="row" property="pl_over_wgt"/></TD>
							<TD><bean:write name="row" property="pl_lvl"/></TD>
							<TD><bean:write name="row" property="bx_lvl"/></TD>
							<TD><bean:write name="row" property="in_lvl"/></TD>
							<TD><bean:write name="row" property="ea_lvl"/></TD>
							<TD><bean:write name="row" property="cbm"/></TD>
							<TD><bean:write name="row" property="cbf"/></TD>
							<TD><bean:write name="row" property="grs_kgs"/></TD>
							<TD><bean:write name="row" property="grs_lbs"/></TD>
							<TD><bean:write name="row" property="net_kgs"/></TD>
							<TD><bean:write name="row" property="net_lbs"/></TD>
							<TD><bean:write name="row" property="wh_loc_nm"/></TD>
							<TD><bean:write name="row" property="space_tp_nm"/></TD>
							<TD><bean:write name="row" property="eq_tpsz_cd"/></TD>
							<TD><bean:write name="row" property="eq_no"/></TD>
							<TD><bean:write name="row" property="seal_no"/></TD>
							<TD><bean:write name="row" property="rn"/></TD>
							<TD><bean:write name="row" property="chk2"/></TD>
							<TD><bean:write name="row" property="frt_cd"/></TD>
							<TD><bean:write name="row" property="frt_nm"/></TD>
							<TD><bean:write name="row" property="curr_cd"/></TD>
							<TD><bean:write name="row" property="tot_amt"/></TD>
							<TD><bean:write name="row" property="amt_pl_lvl"/></TD>
							<TD><bean:write name="row" property="amt_bx_lvl"/></TD>
							<TD><bean:write name="row" property="amt_in_lvl"/></TD>
							<TD><bean:write name="row" property="amt_ea_lvl"/></TD>
							<TD><bean:write name="row" property="amt_cbm"/></TD>
							<TD><bean:write name="row" property="amt_cbf"/></TD>
							<TD><bean:write name="row" property="amt_grs_kgs"/></TD>
							<TD><bean:write name="row" property="amt_grs_lbs"/></TD>
							<TD><bean:write name="row" property="amt_net_kgs"/></TD>
							<TD><bean:write name="row" property="amt_net_lbs"/></TD>
							<TD><bean:write name="row" property="amt_loc"/></TD>
							<TD><bean:write name="row" property="amt_eq"/></TD>
							<TD><bean:write name="row" property="ibflag"/></TD>
							<TD><bean:write name="row" property="cls_no"/></TD>
							<TD><bean:write name="row" property="cls_seq"/></TD>
							<TD><bean:write name="row" property="cls_dtl_seq"/></TD>
							<TD><bean:write name="row" property="po_sys_no"/></TD>
							<TD><bean:write name="row" property="item_sys_no"/></TD>
							<TD><bean:write name="row" property="item_seq"/></TD>
							<TD><bean:write name="row" property="po_no"/></TD>
							<TD><bean:write name="row" property="wh_loc_cd"/></TD>
							<TD><bean:write name="row" property="space_tp_cd"/></TD>
							<TD><bean:write name="row" property="eq_tp_cd"/></TD>
							<TD><bean:write name="row" property="src_tp_cd"/></TD>
							<TD><bean:write name="row" property="amt_ord"/></TD>
							<TD><bean:write name="row" property="amt_oth"/></TD>
							<TD><bean:write name="row" property="oth_unit_cd"/></TD>
							<TD><bean:write name="row" property="amt_fix"/></TD>
							<TD><bean:write name="row" property="fix_unit_cd"/></TD>
							<TD><bean:write name="row" property="pkg_lv1_unit_cd"/></TD>
							<TD><bean:write name="row" property="pkg_lv1_qty"/></TD>
							<TD><bean:write name="row" property="pkg_lv2_unit_cd"/></TD>
							<TD><bean:write name="row" property="pkg_lv2_qty"/></TD>
							<TD><bean:write name="row" property="pkg_lv3_unit_cd"/></TD>
							<TD><bean:write name="row" property="pkg_lv3_qty"/></TD>
							<TD><bean:write name="row" property="pkg_lv4_unit_cd"/></TD>
							<TD><bean:write name="row" property="pkg_lv4_qty"/></TD>
							<TD><bean:write name="row" property="pkg_pl_std_qty"/></TD>
							<TD><bean:write name="row" property="pkg_pl_over_wgt"/></TD>
							<TD><bean:write name="row" property="bk_cls_cd"/></TD>
							<TD><bean:write name="row" property="oth_cost_no"/></TD>
							<TD><bean:write name="row" property="sts_cd"/></TD>
							<TD><bean:write name="row" property="sub_key"/></TD>
							<TD><bean:write name="row" property="sub_bk_key"/></TD>
							<TD><bean:write name="row" property="frt_cd_org"/></TD>
							<TD><bean:write name="row" property="frt_nm_org"/></TD>
							<TD><bean:write name="row" property="curr_cd_org"/></TD>
			            </tr>
					</logic:iterate>
					</DATA>
				</SHEET>
			</logic:notEmpty>
</logic:empty>
<%-- 오류발생 --%>
<logic:notEmpty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
	<ERROR>
		<MESSAGE><![CDATA[ <bean:message name="com.clt.framework.core.comm.EXCEPTION_OBJECT      " property="message"/>]]> </MESSAGE>
	</ERROR>
</logic:notEmpty>
