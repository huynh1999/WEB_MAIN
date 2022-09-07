<%--
=========================================================
*@FileName   : SEE_FRT_0010_1GS.jsp
*@FileTitle  : House B/L Freight 화면 Freight목록 데이
*@Description: House B/L Freight 화면 Freight목록 데이
*@author     : Kang,Jung-Gu - Cyberlogitec
*@version    : 1.0 - 02/06/2009
*@since      : 02/06/2009

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
				<% int loopNum = 1; %>
				<bean:define id="rowSet" name="EventResponse" property="listVal"/>
				<SHEET>
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
					<logic:iterate id="row" name="rowSet">
                        <tr>    
                            <TD><%=loopNum++%></TD>
                            <TD><![CDATA[<bean:write name="row" property="bl_no"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="shipper_trdp_nm"   filter="false"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="consignee_trdp_nm" filter="false"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="partner_trdp_nm"   filter="false"/>]]></TD>
							
                            <TD><![CDATA[<bean:write name="row" property="por_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="pol_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="pod_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="del_cd"/>]]></TD>
							
                            <TD><![CDATA[<bean:write name="row" property="grs_wgt"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="meas"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="sell_amt"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="buy_amt"/>]]></TD>
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
