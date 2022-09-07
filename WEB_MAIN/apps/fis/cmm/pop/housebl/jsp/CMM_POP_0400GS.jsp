<%--
=========================================================
*@FileName   : CMM_POP_0400GS.jsp
*@FileTitle  : CMM
*@Description: PO Item search pop
*@author     : 이광훈 - PO Item search pop
*@version    : 1.0 - 01/23/2008
*@since      : 01/23/2008

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
			
			<bean:define id="tmpMapVal" name="EventResponse" property="mapVal" />
				<% boolean isBegin = true; %>
				<% int cnt = 0; %>
				
				<bean:define id="rowSet" name="EventResponse" property="listVal"/>
				<SHEET>
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
					<logic:iterate id="row" name="rowSet">
						<tr>	
							<TD></TD>
							<TD><![CDATA[<bean:write name="row" property="cust_po_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cust_itm_id"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cust_itm_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="shpwin_fr_dt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="shpwin_to_dt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="org_loc_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="dest_loc_nm" filter="false"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="pck_qty"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pck_ut_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pck_ut_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pck_inr_qty"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ea_cnt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ttl_qty"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cmdt_kgs_wgt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cmdt_lbs_wgt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cmdt_cbm_meas"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cmdt_cft_meas"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="hs_grp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="shp_cmdt_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="shp_cmdt_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="po_cmdt_seq"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="po_sys_no"/>]]></TD>
							<TD><![CDATA[<% if(isBegin){ isBegin = false; %><bean:write name="tmpMapVal" property="pagingTbl"/><%}%>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="item_sys_no"/>]]></TD>
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
