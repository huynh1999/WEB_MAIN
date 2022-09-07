<%--
=========================================================
*Copyright(c) 2008 CyberLogitec. All Rights Reserved.
=========================================================
=========================================================
*@FileName   : SEE_BMD_0020_1GS.jsp
*@FileTitle  : Rate Combination Point 목록 데이터 그리드
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
        <% int rowNum = 1;%>
        <bean:define id="rowSet" name="EventResponse" property="listVal"/>
        <SHEET>
            <DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
            <logic:iterate id="row" name="rowSet">
                        <tr>
                            <TD></TD>
                            <TD></TD>
                            <TD><![CDATA[<bean:write name="row" property="len_dim"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="wdt_dim"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="hgt_dim"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="pce_qty"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="act_dim"/>]]></TD>
                            
                            <TD><![CDATA[<bean:write name="row" property="chg_wgt"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="chg_wgt1"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="meas"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="meas1"/>]]></TD>
                            
                            <TD><![CDATA[<bean:write name="row" property="pck_ut_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="dim_seq"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="wh_recp_no"/>]]></TD>
                
                        </tr>
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
