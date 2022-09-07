<%--
=========================================================
*@FileName   : OTH_OPR_0010GS.jsp
*@FileTitle  : OTH_SALES
*@Description: OTH_SALES
*@author     : Chungrue - Cyberlogitec
*@version    : 1.0 - 2011/11/18
*@since      : 2011/11/18

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
							<TD><![CDATA[<bean:write name="row" property="g_ref_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="g_type"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="g_mbl_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="g_hbl_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="g_oth_seq"/>]]></TD>
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
