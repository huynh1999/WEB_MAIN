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
							 <TD><![CDATA[<bean:write name="row" property="wob_bk_no"/>]]></TD>
							 <TD></TD>
							 <TD></TD>
							 <TD><![CDATA[<bean:write name="row" property="bk_sts_nm"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="dlvr_flg"/>]]></TD>     <!-- #4562 [Korex] WMS Outbound Delivery Status (v461.14) -->
							 <TD><![CDATA[<bean:write name="row" property="inv_sts_nm"/>]]></TD>   <!-- #2321 [WMS4.0] INVOICE PAID STATUS TO BE ADDED TO IN/OUTBOUND LIST -->
							 <TD><![CDATA[<bean:write name="row" property="cust_ord_no"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="ctrt_nm"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="item_cd"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="item_nm"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="item_seq"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="est_out_dt"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="outbound_dt"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="item_pkgunit"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="item_pkgqty"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="item_ea_qty"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="item_ea_qty"/>]]></TD><!-- Order Qty Total -->
							 <TD><![CDATA[<bean:write name="row" property="pick_item_ea_qty"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="pickd_item_ea_qty"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="ship_item_ea_qty"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="lot_no"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="lot_04"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="lot_05"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="item_ser_no"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="lic_plat_no"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="ship_to_nm"/>]]></TD>  <!-- #4209 [BNX WMS4.0] Outbound Management Ship To BUYER_NM column add -->
							 <TD><![CDATA[<bean:write name="row" property="ship_to_addr"/>]]></TD><!-- #4209 [BNX WMS4.0] Outbound Management Ship To BUYER_NM column add -->
							 <TD><![CDATA[<bean:write name="row" property="trucker_cd"/>]]></TD><!-- Trucker Code Column -->
							 <TD><![CDATA[<bean:write name="row" property="trucker_nm"/>]]></TD><!-- Trucker Name Column -->
							 <TD><![CDATA[<bean:write name="row" property="dlv_ord_no"/>]]></TD><!-- D/O No Column -->
							 <TD><![CDATA[<bean:write name="row" property="ref_no"/>]]></TD><!-- Reference Column -->
							 <TD><![CDATA[<bean:write name="row" property="commc_inv_no"/>]]></TD><!-- Invoice No Column -->
							 <TD><![CDATA[<bean:write name="row" property="rmk"/>]]></TD><!-- Remark Column -->
							 <TD><![CDATA[<bean:write name="row" property="ord_tp_nm"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="wob_bk_no"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="lot_id"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="wave_no"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="item_cbm"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="item_cbf"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="item_grs_kgs"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="item_grs_lbs"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="item_net_kgs"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="item_net_lbs"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="wh_cd"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="wib_bk_no"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="po_no"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="inbound_dt"/>]]></TD>
							  <TD><![CDATA[<bean:write name="row" property="curr_cd"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="unit_price"/>]]></TD>
							 
							 <TD><![CDATA[<bean:write name="row" property="wh_loc_nm"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="eq_tpsz_cd"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="eq_no"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="seal_no"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="mbl_no"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="hbl_no"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="sao_no"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="exp_dt"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="smp_wave_flg"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="bk_sts_cd"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="wh_nm"/>]]></TD>
							  <TD></TD>
							 <TD><![CDATA[<bean:write name="row" property="pkg_info"/>]]></TD>
							 
							 <TD><![CDATA[<bean:write name="row" property="rgst_id"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="rgst_loc_dt"/>]]></TD>
			            </tr>
					</logic:iterate>
					</DATA>
				</SHEET>
			</logic:notEmpty>
</logic:empty>
<%-- 오류발생 --%>
<logic:notEmpty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
	<ERROR>
		<logic:empty name="systemLanguage">
			<MESSAGE><![CDATA[ <bean:message name="com.clt.framework.core.comm.EXCEPTION_OBJECT      " property="message"/>]]> </MESSAGE>
		</logic:empty>
		<logic:notEmpty name="systemLanguage">
			<MESSAGE><![CDATA[ <bean:write name="com.clt.framework.core.comm.EXCEPTION_OBJECT      " property="message"/>]]> </MESSAGE>
		</logic:notEmpty>
	</ERROR>
</logic:notEmpty>
