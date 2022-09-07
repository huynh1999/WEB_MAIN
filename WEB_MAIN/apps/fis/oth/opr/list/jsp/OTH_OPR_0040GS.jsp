<%--
=========================================================
*@FileName   : OTH_OPR_0040GS.jsp
*@FileTitle  : Master B/L Search 
*@Description: Master B/L Search 조회한다.
*@author     : 이광훈 - see =Export 
*@version    : 1.0 - 01/15/2009
*@since      : 01/15/2009

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
				<% int cnt = 0; %>
	            <% boolean isBegin = true; %>
	            <bean:define id="tmpMapVal" name="EventResponse" property="mapVal"/>
				<bean:define id="rowSet" name="EventResponse" property="listVal"/>
				<SHEET>
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
					<logic:iterate id="row" name="rowSet">
						<tr>								
							<TD><![CDATA[<bean:write name="row" property="cust_po_no"  filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="po_sys_no"  filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cust_trdp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cust_trdp_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="buyr_trdp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="buyr_trdp_nm" filter="false"/>]]></TD>							
							<TD><![CDATA[<bean:write name="row" property="vndr_trdp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="vndr_trdp_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ord_sts_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="org_loc_cd"/>]]></TD>	
							<TD><![CDATA[<bean:write name="row" property="org_loc_nm"  filter="false"/>]]></TD>	
							<TD><![CDATA[<bean:write name="row" property="dest_loc_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="dest_loc_nm"  filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ord_dt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="arr_dt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="shpwin_fr_dt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="shpwin_to_dt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cgo_rdy_dt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="air_sea_clss_cd"/>]]></TD>
							<TD><![CDATA[<% if(isBegin){ isBegin = false; %><bean:write name="tmpMapVal" property="pagingTbl"/><%}%>]]></TD>
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
