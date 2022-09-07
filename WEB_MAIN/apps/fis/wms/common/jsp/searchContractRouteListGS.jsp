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
							<TD><![CDATA[<bean:write name="row" property="pnl_svc_tp_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ord_tp_lvl1_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ord_tp_lvl2_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="svc_hbl"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="svc_hawb"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="svc_sb"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="svc_wb"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="svc_wo"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rtp_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ord_tp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ord_tp_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ord_tp_lvl1_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ord_tp_lvl2_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ord_tp_lvl3_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ord_tp_lvl3_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ord_tp_lvl4_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ord_tp_lvl4_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ord_tp_kwd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ctrt_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ctrt_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pnl_svc_tp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="loc_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="loc_addr"/>]]></TD>
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
