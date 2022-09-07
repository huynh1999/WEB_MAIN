<%--
=========================================================
*Copyright(c) 2008 CyberLogitec. All Rights Reserved.
=========================================================
=========================================================
*@FileName   : AIC_WOM_0010GS.jsp
*@FileTitle  : Container List 데이터 그리드 조회
*@Description: 
*@author     : 
*@version    : 
*@since      : 

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
                    <TD><![CDATA[<bean:write name="row" property="chk"/>]]></TD>
                    <TD><![CDATA[<bean:write name="row" property="cntr_no"/>]]></TD>
                    <TD><![CDATA[<bean:write name="row" property="cntr_tpsz_cd"/>]]></TD>
                    <TD><![CDATA[<bean:write name="row" property="seal_no1"/>]]></TD>
					<TD><![CDATA[<bean:write name="row" property="cgo_pck_qty"/>]]></TD>
                    <TD><![CDATA[<bean:write name="row" property="cgo_pck_ut"/>]]></TD>
                    <TD><![CDATA[<bean:write name="row" property="cgo_wgt"/>]]></TD>
                    <TD><![CDATA[<bean:write name="row" property="cgo_meas"/>]]></TD>
					<TD><![CDATA[<bean:write name="row" property="pickup_number"/>]]></TD>
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
