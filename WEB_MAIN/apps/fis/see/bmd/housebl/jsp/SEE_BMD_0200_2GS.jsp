<%--
=========================================================
*Copyright(c) 2008 CyberLogitec. All Rights Reserved.
=========================================================

=========================================================
*@FileName   : SEE_BMD_0500_2GS.jsp
*@FileTitle  : 
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
<%-- 정상처리 --%>
<logic:empty name="com.clt.framework.core.comm.EXCEPTION_OBJECT">
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
            	<tr>
                	<TD></TD>
                    <TD><%=rowNum++%></TD>
					<TD><![CDATA[<bean:write name="row" property="cntr_seq"/>]]></TD>
					<TD><![CDATA[<bean:write name="row" property="bkg_seq"/>]]></TD>
					<TD><![CDATA[<bean:write name="row" property="cntr_no"/>]]></TD>
					<TD><![CDATA[<bean:write name="row" property="cntr_tpsz_cd"/>]]></TD>
					<TD><![CDATA[<bean:write name="row" property="seal_no"/>]]></TD>
					<TD><![CDATA[<bean:write name="row" property="cntr_ref_no"/>]]></TD>
					<TD><![CDATA[<bean:write name="row" property="cgo_pgk_qty"/>]]></TD>
					<TD><![CDATA[<bean:write name="row" property="cgo_pck_ut_cd"/>]]></TD>
					<TD><![CDATA[<bean:write name="row" property="cgo_kgs_wgt"/>]]></TD>
					<TD><![CDATA[<bean:write name="row" property="cgo_lbs_wgt"/>]]></TD>
					<TD><![CDATA[<bean:write name="row" property="cgo_cbm_qty"/>]]></TD>
					<TD><![CDATA[<bean:write name="row" property="cgo_cft_qty"/>]]></TD>
					<TD><![CDATA[<bean:write name="row" property="mty_out_dt"/>]]></TD>
					<TD><![CDATA[<bean:write name="row" property="mty_out_tm"/>]]></TD>
					<TD><![CDATA[<bean:write name="row" property="full_rtn_dt"/>]]></TD>
					<TD><![CDATA[<bean:write name="row" property="full_rtn_tm"/>]]></TD>
					<TD><![CDATA[<bean:write name="row" property="cntr_ibflag"/>]]></TD>
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
