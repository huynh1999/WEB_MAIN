<%--
=========================================================
*@FileName   : SEE_AFR_0090GS.jsp
*@FileTitle  : AFR History
*@Description: 
*@author     : Park,Cheol-Woo - Cyberlogitec
*@version    : 1.0 - 05/10/2016
*@since      : 05/10/2016

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
                            <TD><![CDATA[<bean:write name="row" property="rgst_tms"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="msg_type"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="edi_sts"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="msg_rcv_date"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="err_msg"/>]]></TD>
                            <TD></TD>
                            <TD><![CDATA[<bean:write name="row" property="err_sol_msg"/>]]></TD>
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
