<%--
=========================================================
*@FileName   : RPT_PRN_0202GS.jsp
*@FileTitle  : Profit Report
*@Description: Profit Report
*@author     : Lee, Hae Kyoung - Cyberlogitec
*@version    : 1.0 - 2013/05/22
*@since      : 2013/05/22

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
							<TD><![CDATA[<bean:write name="row" property="biz_clss_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="bl_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="verify_flag"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="verify_dt_tm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pay_flag"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pay_dt_tm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="hold_flag"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="hold_dt_tm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="hold_reason"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="release_flag"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="release_dt_tm"/>]]></TD>
							<td></td>
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
