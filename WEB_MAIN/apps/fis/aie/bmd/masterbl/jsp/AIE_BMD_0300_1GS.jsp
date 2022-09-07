<%--
=========================================================
*Copyright(c) 2008 CyberLogitec. All Rights Reserved.
=========================================================
=========================================================
*@FileName   : AIE_BMD_0300_1GS.jsp
*@FileTitle  : Quotation Charge 목록 데이터 그리드
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
        <SHEET>
            <DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
	            <logic:iterate id="row" name="rowSet">
	                 <tr>    
						<TD></TD>
                        <TD></TD>
                        <TD><![CDATA[<bean:write name="row" property="qttn_seq"/>]]></TD>
                        <TD><![CDATA[<bean:write name="row" property="qttn_chg_seq"/>]]></TD>
                        <TD><![CDATA[<bean:write name="row" property="chg_desc"/>]]></TD>
                        <TD><![CDATA[<bean:write name="row" property="unit"/>]]></TD>
                        <TD><![CDATA[<bean:write name="row" property="qty"/>]]></TD>
                        <TD><![CDATA[<bean:write name="row" property="chg_unit_amt"/>]]></TD>
                        <TD><![CDATA[<bean:write name="row" property="chg_ttl_amt"/>]]></TD>
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
