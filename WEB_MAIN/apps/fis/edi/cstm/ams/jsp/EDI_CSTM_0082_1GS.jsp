<%--
=========================================================
*@FileName   : EDI_CSTM_0082GS.jsp
*@FileTitle  : 해운수출 AMS BL목록 조회
*@Description: 
*@author     : Shin,Beom-Chul - Cyberlogitec
*@version    : 1.0 - 07/24/2009
*@since      : 07/24/2009

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
                <% int idx = 1;%>
                <SHEET>
                    <DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
                    <logic:iterate id="row" name="rowSet">
                        <tr>
                            <TD></TD>
							<TD></TD>
                            <TD><![CDATA[<bean:write name="row" property="cntr_no"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="shp_cmdt_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="hts_cd"/>]]></TD>
							
                            <TD><![CDATA[<bean:write name="row" property="pck_qty"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="dg_gds_cd_tp"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="dg_gds_cd"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="pck_ut_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="shp_cmdt_seq"/>]]></TD>
							<TD></TD>
                            <TD><![CDATA[<bean:write name="row" property="cntr_list_seq"/>]]></TD>
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
