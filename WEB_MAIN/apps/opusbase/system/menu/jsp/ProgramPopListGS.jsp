<%--
=========================================================
*@FileName   : ProgramPopListGS.jsp
*@FileTitle  : CMM
*@Description: Program pop
*@author     : 정원영 - Program pop
*@version    : 1.0 - 12/24/2013
*@since      : 07/01/2009

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
							<TD></TD>
							<TD><%= cnt++%></TD>
                            <TD><![CDATA[<bean:write name="row" property="pgm_seq"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="pgm_nm" filter="false"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="pgm_url" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pgm_desc"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="lev1_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="lev2_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="lev3_nm"/>]]></TD>
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
