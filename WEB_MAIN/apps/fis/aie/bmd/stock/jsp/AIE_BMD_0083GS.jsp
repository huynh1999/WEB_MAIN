<%--
=========================================================
*@FileName   : MGT_STK_0013GS.jsp
*@FileTitle  : MASTER STOCK CREATE
*@Description: MASTER STOCK CREATE
*@author     : Chungrue - Cyberlogitec
*@version    : 1.0 - 2009/11/20
*@since      : 2009/11/20

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
							<TD></TD>
							<TD><![CDATA[<bean:write name="row" property="stk_tp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="trdp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="crr_iata_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="aloc_area_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="crr_agn_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="auth_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="allc_dt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="st_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="lst_no"/>]]></TD>
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
