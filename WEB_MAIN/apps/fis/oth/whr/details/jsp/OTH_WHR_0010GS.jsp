<%--
=========================================================
*@FileName   : ACC_INV_0010GS.jsp
*@FileTitle  : Invoice Create
*@Description: Invoice Create
*@author     : Chungrue - Cyberlogitec
*@version    : 1.0 - 2011/11/04
*@since      : 2011/11/04

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
							<TD></TD>
                            <TD><![CDATA[<bean:write name="row" property="wh_recp_no"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="itm_seq"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="length"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="width"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="height"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="pck_qty"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="pck_ut_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="wgt_k"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="wgt_l"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="meas"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="act_wgt"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="act_wgt_l"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="shpd"/>]]></TD>
						    <TD><![CDATA[<bean:write name="row" property="itm_dt"/>]]></TD>							
                            <TD><![CDATA[<bean:write name="row" property="bl_no"/>]]></TD>
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
