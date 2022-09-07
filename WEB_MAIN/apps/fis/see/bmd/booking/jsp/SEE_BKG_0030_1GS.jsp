<%--
=========================================================
*@FileName   : SEE_BKG_0030_4GS.jsp
*@FileTitle  : PO목록 데이터 그리드
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
<logic:empty name="com.clt.framework.core.comm.EXCEPTION_OBJECT">
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
                            <TD><![CDATA[<bean:write name="row" property="bkg_no"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="suffix"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="pck_qty"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="pck_ut_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="pck_ut_nm"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="grs_wgt"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="grs_wgt1"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="meas"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="meas1"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="bkg_seq"/>]]></TD>
							<TD></TD>
                        </tr>
            </logic:iterate>
            </DATA>
        </SHEET>
    </logic:notEmpty>
</logic:empty>
<logic:notEmpty name="com.clt.framework.core.comm.EXCEPTION_OBJECT">
    <ERROR>
        <MESSAGE><![CDATA[ <bean:message name="com.clt.framework.core.comm.EXCEPTION_OBJECT" property="message"/>]]> </MESSAGE>
    </ERROR>
</logic:notEmpty>
