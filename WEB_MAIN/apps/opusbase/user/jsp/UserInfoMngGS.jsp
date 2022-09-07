<%--
=========================================================
*Copyright(c) 2009 CyberLogitec. All Rights Reserved.
=========================================================

=========================================================
*@FileName   : UserInfoMngGS.jsp
*@FileTitle  :  정렬 관리
*@Description: 정렬 관리
*@author     : CEJ- Cyberlogitec
*@version    : 1.0 - 2016
*@since      : 2016 
=========================================================
--%>
<%@ page contentType="text/xml; charset=UTF-8"%>
<%@page pageEncoding="UTF-8"%>
<%@include file="./../../../../../../../../syscommon/header/CLTGSHeader.jsp"%>
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
                            <TD><![CDATA[<bean:write name="row" property="pgm_nm"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="attr1"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="attr2"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="attr3"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="attr4"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pgm_url"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pgm_usr_id"/>]]></TD>
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
