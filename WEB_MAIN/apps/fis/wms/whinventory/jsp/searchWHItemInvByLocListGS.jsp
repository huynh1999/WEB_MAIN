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
				<% int cnt = 0; %>
				<% boolean isBegin = true; %>
	            <bean:define id="tmpMapVal" name="EventResponse" property="mapVal"/>
				<bean:define id="rowSet" name="EventResponse" property="listVal"/>
				<SHEET>
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
					<logic:iterate id="row" name="rowSet">
						<tr>
							<TD></TD>
							 <TD><bean:write name="row" property="item_cd"/></TD>
							 <TD><bean:write name="row" property="item_nm"/></TD>
							 <!-- OFVFOUR-7852 [GREAT LUCK] ADDING BARCODE NO COLUMN ON WMS -->
							 <TD><![CDATA[<bean:write name="row" property="barcode_no"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="inbound_dt"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="lot_no"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="lot_id"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="wh_loc_nm"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="po_no"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="item_ser_no"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="lic_plat_no"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="pkg_lv1_unit_nm"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="stc_qty"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="hold_qty"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="dmg_qty"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="allc_qty"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="tot_qty"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="item_cbm"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="item_cbf"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="item_grs_kgs"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="item_grs_lbs"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="item_net_kgs"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="item_net_lbs"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="exp_dt"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="lot_04"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="lot_05"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="wib_bk_no"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="cust_ord_no"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="ref_no"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="ctrt_no"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="ctrt_nm"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="wh_cd"/>]]></TD>
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
