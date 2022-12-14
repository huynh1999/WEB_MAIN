<%--
=========================================================
*Copyright(c) 2008 CyberLogitec. All Rights Reserved.
=========================================================
=========================================================
*@FileName   : AIE_BMD_0029GS.jsp
*@FileTitle  : Hawaii Freight List 데이터 그리드 조회
*@Description: 
*@author     : Kang,Jung-Gu - Cyberlogitec
*@version    : 1.0 - 02/05/2009
*@since      : 02/05/2009

*@Change history:
=========================================================
--%>
<%@ page contentType="text/xml; charset=UTF-8"%>
<%@page pageEncoding="UTF-8"%>
<%@include file="./../../../../../../../../syscommon/header/CLTGSHeader.jsp"%>
<logic:empty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
    <logic:empty name="EventResponse" property="listVal">
        <SHEET>
            <DATA TOTAL="0"></DATA>
        </SHEET>    
    </logic:empty>
    <logic:notEmpty name="EventResponse" property="listVal">
        <bean:define id="rowSet" name="EventResponse" property="listVal"/>
		<% int rowNum = 1;%>
        <SHEET>
            <DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
            <logic:iterate id="row" name="rowSet">
                <TR>
                    <TD></TD>
					<TD></TD>
                    <TD><%=rowNum++%></TD>
					
                    <TD><![CDATA[<bean:write name="row" property="frt_nm" filter="false" />]]></TD>
                    <TD><![CDATA[<bean:write name="row" property="grs_wgt1"/>]]></TD>
                    <TD><![CDATA[<bean:write name="row" property="meas1"/>]]></TD>
                    <TD><![CDATA[<bean:write name="row" property="ru"/>]]></TD>
                    <TD><![CDATA[<bean:write name="row" property="inv_amt"/>]]></TD>
                    <TD><![CDATA[<bean:write name="row" property="cod_amt"/>]]></TD>
					<TD><![CDATA[<bean:write name="row" property="adv_amt"/>]]></TD>
                    
                    <TD><![CDATA[<bean:write name="row" property="frt_seq"/>]]></TD>		
					<TD><![CDATA[<bean:write name="row" property="intg_bl_seq"/>]]></TD>
                </TR>
            </logic:iterate>
                </DATA>
        </SHEET>
    </logic:notEmpty>
</logic:empty>
<logic:notEmpty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
    <ERROR>
        <MESSAGE><![CDATA[ <bean:message name="com.clt.framework.core.comm.EXCEPTION_OBJECT      " property="message"/>]]> </MESSAGE>
    </ERROR>
</logic:notEmpty>
