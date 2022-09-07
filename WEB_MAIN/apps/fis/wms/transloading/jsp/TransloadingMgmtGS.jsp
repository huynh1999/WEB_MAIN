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
<logic:empty name="com.clt.framework.core.comm.EXCEPTION_OBJECT">
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
							<TD><bean:write name="row" property="tlo_no"/></TD>
							<TD><bean:write name="row" property="tlo_sts_cd"/></TD>
							<TD><bean:write name="row" property="bk_date"/></TD>
							<TD><bean:write name="row" property="bk_no"/></TD>
							<TD><bean:write name="row" property="tlo_bk_sts_cd"/></TD>
							<TD><bean:write name="row" property="tro_no"/></TD>
							<TD><bean:write name="row" property="act_dt"/></TD>
							<TD><bean:write name="row" property="act_hm"/></TD>
							<TD><bean:write name="row" property="cust_ord_no"/></TD>
							<TD><bean:write name="row" property="trade_tp_cd"/></TD>
							<TD><bean:write name="row" property="node_loc_tp_cd"/></TD>
							<TD><bean:write name="row" property="node_loc_cd"/></TD>
							<TD><bean:write name="row" property="node_loc_nm"/></TD>
							<TD><bean:write name="row" property="node_addr"/></TD>
							<TD><bean:write name="row" property="mbl_no"/></TD>
							<TD><bean:write name="row" property="cntr_tpsz_cd"/></TD>
							<TD><bean:write name="row" property="cntr_no"/></TD>
							<TD><bean:write name="row" property="seal_no"/></TD>
							<TD><bean:write name="row" property="load_id"/></TD>
							<TD><bean:write name="row" property="item_cd"/></TD>
							<TD><bean:write name="row" property="ord_qty"/></TD>
							<TD><bean:write name="row" property="dsp_qty"/></TD>
							<TD><bean:write name="row" property="shp_qty"/></TD>
							<TD><bean:write name="row" property="rsd_qty"/></TD>
							<TD><bean:write name="row" property="trucker_cd"/></TD>
							<TD><bean:write name="row" property="trucker_nm"/></TD>
							<TD><bean:write name="row" property="truck_tpsz_cd"/></TD>
							<TD><bean:write name="row" property="truck_no"/></TD>
							<TD><bean:write name="row" property="trail_no"/></TD>
							<TD><bean:write name="row" property="curr_cd"/></TD>
							<TD><bean:write name="row" property="basic_amt"/></TD>
							<TD><bean:write name="row" property="nego_amt"/></TD>
							<TD><bean:write name="row" property="add_amt"/></TD>
							<TD><bean:write name="row" property="tot_amt"/></TD>
							<TD><bean:write name="row" property="ctrt_no"/></TD>
							<TD><bean:write name="row" property="ctrt_nm"/></TD>
							<TD><bean:write name="row" property="org_cd"/></TD>
							<TD><bean:write name="row" property="wh_cd"/></TD>
							<TD><bean:write name="row" property="wh_nm"/></TD>
							<TD><bean:write name="row" property="trans_tp_cd"/></TD>
							<TD><bean:write name="row" property="tlo_seq"/></TD>
							<TD><bean:write name="row" property="tro_seq"/></TD>
							<TD><bean:write name="row" property="trd_no"/></TD>
							<TD><bean:write name="row" property="act_cust"/></TD>
							<TD><bean:write name="row" property="est_dt"/></TD>
							<TD><bean:write name="row" property="fwd_tp_cd"/></TD>
							<TD><bean:write name="row" property="vsl_cd"/></TD>
							<TD><bean:write name="row" property="vsl_nm"/></TD>
							<TD><bean:write name="row" property="voy"/></TD>
							<TD><bean:write name="row" property="pol"/></TD>
							<TD><bean:write name="row" property="pol_nm"/></TD>
							<TD><bean:write name="row" property="pol_etd"/></TD>
							<TD><bean:write name="row" property="hbl_no"/></TD>
							<TD><bean:write name="row" property="pod"/></TD>
							<TD><bean:write name="row" property="pod_nm"/></TD>
							<TD><bean:write name="row" property="pod_eta"/></TD>
							<TD><bean:write name="row" property="item_cd"/></TD>
							<TD><bean:write name="row" property="item_nm"/></TD>
							<TD><bean:write name="row" property="ship_ea_qty"/></TD>
							<TD><bean:write name="row" property="ship_cbm"/></TD>
							<TD><bean:write name="row" property="ship_net_kgs"/></TD>
							<TD><bean:write name="row" property="ship_grs_kgs"/></TD>
							<TD><bean:write name="row" property="fr_node_loc_cd"/></TD>
							<TD><bean:write name="row" property="fr_node_loc_nm"/></TD>
							<TD><bean:write name="row" property="fr_node_tp_cd"/></TD>
							<TD><bean:write name="row" property="fr_node_addr"/></TD>
							<TD><bean:write name="row" property="fr_node_pic_nm"/></TD>
							<TD><bean:write name="row" property="fr_node_pic_tel"/></TD>
							<TD><bean:write name="row" property="to_node_loc_cd"/></TD>
							<TD><bean:write name="row" property="to_node_loc_nm"/></TD>
							<TD><bean:write name="row" property="to_node_tp_cd"/></TD>
							<TD><bean:write name="row" property="to_node_addr"/></TD>
							<TD><bean:write name="row" property="to_node_pic_nm"/></TD>
							<TD><bean:write name="row" property="to_node_pic_tel"/></TD>
							<TD><bean:write name="row" property="disp_dt"/></TD>
							<TD><bean:write name="row" property="disp_hm"/></TD>
							<TD><bean:write name="row" property="act_trucker"/></TD>
							<TD><bean:write name="row" property="driver1_nm"/></TD>
							<TD><bean:write name="row" property="driver1_lic_no"/></TD>
							<TD><bean:write name="row" property="driver2_nm"/></TD>
							<TD><bean:write name="row" property="driver2_lic_no"/></TD>
							<TD><bean:write name="row" property="gatein_dt"/></TD>
							<TD><bean:write name="row" property="gatein_hm"/></TD>
							<TD><bean:write name="row" property="load_dt"/></TD>
							<TD><bean:write name="row" property="load_hm"/></TD>
							<TD><bean:write name="row" property="gateout_dt"/></TD>
							<TD><bean:write name="row" property="gateout_hm"/></TD>
							<TD><bean:write name="row" property="cmpl_flg"/></TD>
							<TD><bean:write name="row" property="bkg_flg"/></TD>
							<TD><bean:write name="row" property="tlo_cmpl_est_dt"/></TD>
							<TD><bean:write name="row" property="tlo_cmpl_act_dt"/></TD>
							<TD><bean:write name="row" property="tlo_cmpl_act_hm"/></TD>
							<TD></TD>
			            </tr>
					</logic:iterate>
					</DATA>
				</SHEET>
			</logic:notEmpty>
</logic:empty>
<%-- 오류발생 --%>
<logic:notEmpty name="com.clt.framework.core.comm.EXCEPTION_OBJECT">
	<ERROR>
		<MESSAGE><![CDATA[ <bean:message name="com.clt.framework.core.comm.EXCEPTION_OBJECT" property="message"/>]]> </MESSAGE>
	</ERROR>
</logic:notEmpty>
