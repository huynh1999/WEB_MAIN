<%--
=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
=========================================================

=========================================================
*@FileName   : MCLPExpressPopupGS.jsp
*@FileTitle  : 
*@Description: 
*@author     : Khang.Dong - Cyberlogitec
*@version    : 1.0 - 2015/07/10

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
							<TD><![CDATA[<bean:write name="row" property="Grd01out_wb_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="Grd01in_po_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="Grd01in_wb_no"/>]]></TD>
							<TD><bean:write name="row" property="Grd01item_cd"/></TD>
							<TD><bean:write name="row" property="Grd01item_nm"/></TD>
							<TD><![CDATA[<bean:write name="row" property="Grd01item_qty"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="Grd01item_pkgqty"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="Grd01item_cbm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="Grd01item_kgs"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="Grd01item_net_wgt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="Grd01item_pkgunit"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="Grd01cntr_tpsz_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="Grd01cntr_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="Grd01seal_no1"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="Grd01seal_no2"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="Grd01loaded_dt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="Grd01po_sys_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="Grd01item_sys_no"/>]]></TD>
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
