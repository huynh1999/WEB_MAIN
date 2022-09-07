<%--
=========================================================
*@FileName   : MGT_LOG_0020GS.jsp
*@FileTitle  : Fax Log
*@Description: Fax Log
*@author     : PJK - Cyberlogitec
*@version    : 1.0 - 2011/12/19
*@since      : 2011/12/19

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
				<% 
				boolean isBegin = true;
				int cnt = 1;
				%>
				
				<bean:define id="rowSet" name="EventResponse" property="listVal"/>
				<SHEET>
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
					<logic:iterate id="row" name="rowSet">
						<tr>	
							<TD><%= cnt++%></TD>
							<TD><![CDATA[<bean:write name="row" property="fax_title" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="snd_pic_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rcpt_cmp_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rcpt_pic_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="fax_no"/>]]></TD>							
							<TD><![CDATA[<bean:write name="row" property="fax_status"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rgst_tms"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="fax_cre_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="fax_seq"/>]]></TD>
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
