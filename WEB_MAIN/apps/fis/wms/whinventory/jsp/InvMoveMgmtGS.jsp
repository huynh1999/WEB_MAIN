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
							<TD><![CDATA[<bean:write name="row" property="merge_key"/>]]></TD>
							<TD></TD>
							<TD><![CDATA[<bean:write name="row" property="move_no"/>]]></TD>
							<TD><bean:write name="row" property="item_cd"/></TD>
							<TD><bean:write name="row" property="item_nm"/></TD>
							<TD><![CDATA[<bean:write name="row" property="lot_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="lot_id"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="item_ser_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="lic_plat_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="fr_mv_tp_cd_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="fr_wh_loc_cd_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="fr_ea_qty"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="fr_cbm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="fr_cbf"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="fr_grs_kgs"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="fr_grs_lbs"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="fr_net_kgs"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="fr_net_lbs"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="to_mv_tp_cd_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="to_wh_loc_cd_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="to_ea_qty"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="to_cbm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="to_cbf"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="to_grs_kgs"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="to_grs_lbs"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="to_net_kgs"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="to_net_lbs"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="add_row_img"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="add_row_cnt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="del_row_img"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rmk"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="attach_add_img"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="attach_del_img"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inbound_dt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="wib_bk_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ibflag"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="item_sys_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="po_sys_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="fr_mv_tp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="fr_wh_loc_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="fr_wh_loc_prop_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="to_mv_tp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="to_wh_loc_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="to_wh_loc_prop_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="wh_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ctrt_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="so_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="po_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="plan_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="plan_seq"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="file_seq"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="file_path"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="file_sys_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="file_org_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="file_size"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="attach_add"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="attach_del"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="stock_qty"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="to_sum_ea_qty"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="edit_yn"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="md"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pkg_lv1_qty"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="lv1_cbm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="lv1_cbf"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="lv1_grs_kgs"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="lv1_grs_lbs"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="lv1_net_kgs"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="lv1_net_lbs"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="stock_cbm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="stock_cbf"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="stock_grs_kgs"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="stock_grs_lbs"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="stock_net_kgs"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="stock_net_lbs"/>]]></TD>
							
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
