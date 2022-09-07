<%--
=========================================================
*@FileName   : SEI_DOC_1000_1GS.jsp
*@FileTitle  : Devanning/Segregation Report
*@Description: Devanning/Segregation Report
*@author     : Lee Hae Kyoung - Cyberlogitec
*@version    : 1.0 - 2011/12/13
*@since      : 2011/12/13

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
                            <TD><![CDATA[<bean:write name="row" property="cntr_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="seal_no1"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cntr_tpsz_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cntr_list_seq"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="cntr_intg_bl_seq"/>]]></TD>
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
