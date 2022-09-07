<%--
=========================================================
*Copyright(c) 2008 CyberLogitec. All Rights Reserved.
=========================================================
=========================================================
*@FileName   : SEE_BMD_0260GS.jsp
*@FileTitle  : Consolidation
*@Description: 
*@author     : 
*@version    : 
*@since      : 

*@Change history:
=========================================================
--%>
<%@ page contentType="text/xml; charset=UTF-8"%>
<%@page pageEncoding="UTF-8"%>
<%@include file="./../../../../../../syscommon/header/CLTGSHeader.jsp"%>
<logic:empty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
    <logic:empty name="EventResponse" property="listVal">
        <SHEET>
            <DATA TOTAL="0"></DATA>
        </SHEET>    
    </logic:empty>
    <logic:notEmpty name="EventResponse" property="listVal">
        <bean:define id="rowSet" name="EventResponse" property="listVal"/>		
		<% boolean isBegin = true; %>
		<bean:define id="tmpMapVal" name="EventResponse" property="mapVal"/>
		<bean:define id="rowSet" name="EventResponse" property="listVal"/>
        <SHEET>
            <DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
            <logic:iterate id="row" name="rowSet">
                <TR>
                    <TD></TD>	
                    <TD></TD>		
                    <TD><![CDATA[<bean:write name="row" property="plan_no"/>]]></TD>										
                    <TD><![CDATA[<bean:write name="row" property="con_status"/>]]></TD>
                    <TD><![CDATA[<bean:write name="row" property="system_bkg_no"/>]]></TD>
                    <TD><![CDATA[<bean:write name="row" property="carrier_bkg_no"/>]]></TD>
                    <TD><![CDATA[<bean:write name="row" property="trnk_vsl_nm" filter="false"/>]]></TD>
					<TD><![CDATA[<bean:write name="row" property="trnk_voy"/>]]></TD>
					<TD><![CDATA[<bean:write name="row" property="lnr_trdp_cd"/>]]></TD>
					<TD><![CDATA[<bean:write name="row" property="lnr_trdp_nm" filter="false"/>]]></TD>
                    <TD><![CDATA[<bean:write name="row" property="bkg_seq"/>]]></TD>
                    <TD><![CDATA[<bean:write name="row" property="filling_no"/>]]></TD>
					<TD><![CDATA[<bean:write name="row" property="master_bl_no"/>]]></TD>
					<TD><![CDATA[<bean:write name="row" property="pol_cd"/>]]></TD>
	                <TD><![CDATA[<bean:write name="row" property="pol_nm"/>]]></TD>
                    <TD><![CDATA[<bean:write name="row" property="pod_cd"/>]]></TD>	
                    <TD><![CDATA[<bean:write name="row" property="pod_nm"/>]]></TD>					
                    <TD><![CDATA[<bean:write name="row" property="etd_dt_tm"/>]]></TD>
                    <TD><![CDATA[<bean:write name="row" property="eta_dt_tm"/>]]></TD>
                    <TD><![CDATA[<bean:write name="row" property="cntr_sum"/>]]></TD>					
					<TD><![CDATA[<bean:write name="row" property="issued_by"/>]]></TD>
					<TD><![CDATA[<bean:write name="row" property="issued_at"/>]]></TD>
					<TD><![CDATA[<% if(isBegin){ isBegin = false; %><bean:write name="tmpMapVal" property="pagingTbl"/><%}%>]]></TD>
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
