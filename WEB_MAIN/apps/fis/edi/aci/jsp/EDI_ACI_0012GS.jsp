<%--
=========================================================
*@FileName   : EDI_ACI_0010GS.jsp
*@FileTitle  : ACI EDI List
*@Description: 
*@author     : OJG - Cyberlogitec
*@version    : 1.0 - 10/04/2016
*@since      : 10/04/2016

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
                <% int idx = 1; int cnt=1;%>
                <SHEET>
                    <DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
                    <logic:iterate id="row" name="rowSet">
                        <tr>
                            <TD><% cnt++;%><%= cnt%></TD>
                            <TD><![CDATA[<bean:write name="row" property="snd_dt_tm"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="rcv_dt_tm"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="mf_sub_tp_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="smt_tp_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="msg_sts_nm"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="err_msg"/>]]></TD>
                            <TD></TD>
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