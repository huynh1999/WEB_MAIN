<%--
=========================================================
*@FileName   : SAL_TFM_0010GS.jsp
*@FileTitle  : Tariff Management Contract
*@Description: Tariff Management Contract
*@author     : Choi,Gil-Ju - Cyberlogitec
*@version    : 1.0 - 01/22/2009
*@since      : 01/22/2009

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
		<% int loopNum = 1;%>
		<SHEET>
			<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
				<logic:iterate id="row" name="rowSet">
					<tr>
						<TD></TD>
						<TD><%=loopNum++%></TD>
						<TD><![CDATA[<bean:write name="row" property="trdp_cd"/>]]></TD>
						<TD><bean:write name="row" property="trdp_nm"/></TD>
						<TD><![CDATA[<bean:write name="row" property="trf_tp_cd"/>]]></TD>
						<TD><![CDATA[<bean:write name="row" property="trf_ctrt_no"/>]]></TD>
						<TD><![CDATA[<bean:write name="row" property="sell_buy_tp_cd"/>]]></TD>
						<TD><![CDATA[<bean:write name="row" property="pol_cd"/>]]></TD>
						<TD><![CDATA[<bean:write name="row" property="pol_nm" filter="false" />]]></TD>
						<TD><![CDATA[<bean:write name="row" property="pod_cd"/>]]></TD>
						<TD><![CDATA[<bean:write name="row" property="pod_nm" filter="false" />]]></TD>
						<TD><![CDATA[<bean:write name="row" property="dest_del_cd"/>]]></TD>
						<TD><![CDATA[<bean:write name="row" property="dest_del_nm" filter="false" />]]></TD>
						<TD><![CDATA[<bean:write name="row" property="trf_term_fm_dt"/>]]></TD>
						<TD><![CDATA[<bean:write name="row" property="trf_term_to_dt"/>]]></TD>
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
