<%--
=========================================================
*@FileName   : ACC_INV_0040GS.jsp
*@FileTitle  : Invoice List
*@Description: Invoice List
*@author     : Chungrue - Cyberlogitec
*@version    : 1.0 - 2011/11/09
*@since      : 2011/11/09

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
							<TD><%=cnt%></TD>
							<TD><![CDATA[<bean:write name="row" property="bl_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="trdp_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="tax_inv_tit"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="tax_inv_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="iss_dt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="vol"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pol"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pod"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inv_sum_amt"/>]]></TD>
							<TD></TD>
							<TD><![CDATA[<bean:write name="row" property="tax_sum_amt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="void_yn"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="tax_inv_tp"/>]]></TD>
							<TD></TD>
							<TD><![CDATA[<bean:write name="row" property="tax_inv_seq"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="tax_inv_sts_cd"/>]]></TD>
							
							<%=cnt++%>
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
