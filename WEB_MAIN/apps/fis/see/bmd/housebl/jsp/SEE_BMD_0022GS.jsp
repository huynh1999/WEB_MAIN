<%--
=========================================================
*Copyright(c) 2008 CyberLogitec. All Rights Reserved.
=========================================================
=========================================================
*@FileName   : SEE_BMD_0022GS.jsp
*@FileTitle  : 국내세관용 수출신고 번호
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

                    <TD><![CDATA[<bean:write name="row" property="edi_snd_sts_nm"/>]]></TD>										
                    <TD><![CDATA[<bean:write name="row" property="xpt_no"/>]]></TD>
                    <TD><![CDATA[<bean:write name="row" property="edi_pck_qty"/>]]></TD>
                    <TD><![CDATA[<bean:write name="row" property="edi_pck_ut_cd"/>]]></TD>
					<TD><![CDATA[<bean:write name="row" property="edi_pck_ut_nm"/>]]></TD>
					
					<TD><![CDATA[<bean:write name="row" property="edi_grs_wt"/>]]></TD>
					
	                <TD><![CDATA[<bean:write name="row" property="sprt_flg"/>]]></TD>
                    <TD><![CDATA[<bean:write name="row" property="sprt_seq"/>]]></TD>
					
                    <TD><![CDATA[<bean:write name="row" property="sam_pck_tp"/>]]></TD>
                    <TD><![CDATA[<bean:write name="row" property="sam_pck_qty"/>]]></TD>
                    <TD><![CDATA[<bean:write name="row" property="sam_pck_ut_cd"/>]]></TD>
					
					<TD><![CDATA[<bean:write name="row" property="edi_xpt_seq"/>]]></TD>
					<TD><![CDATA[<bean:write name="row" property="edi_snd_sts_cd"/>]]></TD>
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
