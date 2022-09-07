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
							 <TD><![CDATA[<bean:write name="row" property="wh_cd"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="cust_ord_no"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="ord_tp_cd"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="est_out_dt"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="est_out_hm"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="bk_sts_cd"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="ctrt_no"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="ctrt_nm"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="buyer_addr1"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="buyer_addr2"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="buyer_addr3"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="buyer_addr4"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="buyer_addr5"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="eq_tpsz_cd"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="eq_no"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="seal_no"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="dlv_ord_no"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="load_tp_cd"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="trade_tp_cd"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="fwd_tp_cd"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="mbl_no"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="hbl_no"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="wob_bk_no"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="bk_date"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="ref_no"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="commc_inv_no"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="rmk"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="owner_cd"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="owner_addr1"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="owner_addr2"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="owner_addr3"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="owner_addr4"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="owner_addr5"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="vsl_cd"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="vsl_nm"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="voy"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="carrier_cd"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="carrier_nm"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="pol"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="pod"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="del"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="etd"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="eta"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="seq"/>]]></TD>
							 <TD><bean:write name="row" property="item_cd"/></TD>
							 <TD><bean:write name="row" property="item_nm"/></TD>
							 <TD><![CDATA[<bean:write name="row" property="lot_no"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="pkg_info"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="item_pkgunit"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="item_pkgqty"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="item_ea_qty"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="fix_loc_nm"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="stock_qty"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="wave_no"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="item_cbm"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="item_cbf"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="item_grs_kgs"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="item_grs_lbs"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="item_net_kgs"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="item_net_lbs"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="fix_lot_id"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="inbound_dt"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="exp_dt"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="lot_04"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="lot_05"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="sao_no"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="curr_cd"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="unit_price"/>]]></TD>
			            </tr>
					</logic:iterate>
					</DATA>
				</SHEET>
			</logic:notEmpty>
</logic:empty>
<%-- 오류발생 --%>
<logic:notEmpty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
	<ERROR>
		<MESSAGE><![CDATA[ <bean:write name="com.clt.framework.core.comm.EXCEPTION_OBJECT      " property="message"/>]]> </MESSAGE>
	</ERROR>
</logic:notEmpty>
