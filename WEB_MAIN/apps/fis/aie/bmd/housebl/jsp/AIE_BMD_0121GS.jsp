<%--
=========================================================
*Copyright(c) 2008 CyberLogitec. All Rights Reserved.
=========================================================
=========================================================
*@FileName   : AIE_BMD_0121GS.jsp
*@FileTitle  : AES Commodity 데이터 그리드
*@Description: 
*@author     : PJK - Cyberlogitec
*@version    : 1.0 - 11/16/2011
*@since      : 12/12/2011

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
                <TR>
                    <TD></TD>
                    <TD><![CDATA[<bean:write name="row" property="intg_bl_seq"/>]]></TD>
                    <TD><![CDATA[<bean:write name="row" property="aes_cmdt_seq"/>]]></TD>
                    <TD></TD>
                    <TD><![CDATA[<bean:write name="row" property="org_tp"/>]]></TD>
                    <TD><![CDATA[<bean:write name="row" property="cmdt_cd"/>]]></TD>
                    <TD><![CDATA[<bean:write name="row" property="cmdt_desc"/>]]></TD>
                    <TD><![CDATA[<bean:write name="row" property="pck_qty"/>]]></TD>
                    <TD><![CDATA[<bean:write name="row" property="pck_ut_cd"/>]]></TD>
                    <TD><![CDATA[<bean:write name="row" property="pck_qty1"/>]]></TD>
                    <TD><![CDATA[<bean:write name="row" property="pck_ut_cd1"/>]]></TD>
                    <TD><![CDATA[<bean:write name="row" property="usd_val"/>]]></TD>
                    <TD><![CDATA[<bean:write name="row" property="grs_wgt"/>]]></TD>
                    <TD><![CDATA[<bean:write name="row" property="eccn_no"/>]]></TD>
                    <TD><![CDATA[<bean:write name="row" property="pga_lic_flg"/>]]></TD>
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
