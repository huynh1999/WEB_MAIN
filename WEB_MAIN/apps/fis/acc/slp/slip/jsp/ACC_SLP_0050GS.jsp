<%--
=========================================================
*@FileName   : ACC_SLP_0050GS.jsp
*@FileTitle  : Trade Partner Interface
*@Description: Trade Partner Interface
*@author     : Chungrue - Cyberlogitec
*@version    : 1.0 - 2012/02/13
*@since      : 2012/02/13

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
				<%
					int cnt = 0;
				%>
				<SHEET>
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
					<logic:iterate id="row" name="rowSet">
						<tr>
                            <TD></TD>
                            <TD><![CDATA[<bean:write name="row" property="trdp_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="eng_nm" filter="false"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="locl_nm"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="lgl_addr" filter="false"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="tax_iss_addr" filter="false"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="rgst_ofc_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="corp_no"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="rgst_tms"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="rtn_flag"/>]]></TD>
							<TD></TD>
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
