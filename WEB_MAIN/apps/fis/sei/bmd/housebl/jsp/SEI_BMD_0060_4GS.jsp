<%--
=========================================================
*Copyright(c) 2008 CyberLogitec. All Rights Reserved.
=========================================================
=========================================================
*@FileName   : SEE_BMD_0020_4GS.jsp
*@FileTitle  : Shipping Document목록 데이터 그리드
*@Description: 
*@author     : Kang,Jung-Gu - Cyberlogitec
*@version    : 1.0  
*@since      : 2016 03

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
                             
                            <TD><![CDATA[<bean:write name="row" property="hbl_no"/>]]></TD> 
                            <TD><![CDATA[<bean:write name="row" property="ref_no"/>]]></TD> 
                            <TD><![CDATA[<bean:write name="row" property="post_dt"/>]]></TD> 
                            <TD><![CDATA[<bean:write name="row" property="cfs_trdp_nm"/>]]></TD> 
                            <TD><![CDATA[<bean:write name="row" property="cntr_no"/>]]></TD> 
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
