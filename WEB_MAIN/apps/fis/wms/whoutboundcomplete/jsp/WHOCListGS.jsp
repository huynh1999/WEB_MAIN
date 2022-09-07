<%--
=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : WarehouseLocPopup.jsp
*@FileTitle  : Location
*@author     : CLT
*@version    : 1.0
*@since      : 2014/10/21
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
				<bean:define id="tmpMapVal" name="EventResponse" property="mapVal"/>
				<% 
				boolean isBegin = true;
				int cnt = 0;
				%>
				<SHEET>
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
					<logic:iterate id="row" name="rowSet">
						<tr>
							<TD></TD>
							<TD><![CDATA[<bean:write name="row" property="wob_out_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="outbound_dt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="lp_sts_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="bk_date"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="wob_bk_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cust_ord_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ord_tp_nm"/>]]></TD>
							
							<TD><bean:write name="row" property="item_cd"/></TD>
							<TD><bean:write name="row" property="item_nm"/></TD>
							<TD><![CDATA[<bean:write name="row" property="item_pkgunit"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="item_pkgqty"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="item_ea_qty"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="alloc_ea_qty"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="lp_item_ea_qty"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="out_item_ea_qty"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inbound_dt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="lot_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="wh_loc_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="out_item_cbm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="out_item_cbf"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="out_item_grs_kgs"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="out_item_grs_lbs"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="out_item_net_kgs"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="out_item_net_lbs"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="buyer_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="buyer_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ctrt_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ctrt_nm"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="eq_tpsz_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="eq_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="seal_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="gate_in_hm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="gate_out_hm"/>]]></TD>
							<TD></TD>
							<TD><![CDATA[<bean:write name="row" property="rmk"/>]]></TD>
							
							<TD></TD>
							<TD><![CDATA[<bean:write name="row" property="exp_dt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="lot_04"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="lot_05"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="lot_id"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="wave_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="so_no"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="wib_bk_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="po_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="wh_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="file_seq"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="file_path"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="file_sys_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="file_org_nm"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="whoc_flag"/>]]></TD>
							<TD><![CDATA[<% if(isBegin){ isBegin = false; %><bean:write name="tmpMapVal" property="pagingTbl"/><%}%>]]></TD>
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