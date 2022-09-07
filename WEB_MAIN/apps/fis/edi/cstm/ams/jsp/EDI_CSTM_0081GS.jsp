<%--
=========================================================
*@FileName   : EDI_CSTM_0081.jsp
*@FileTitle  : 해운 수출 AMS 생성 대상 데이터선택
*@Description: 
*@author     : Kang,Jung-Gu - Cyberlogitec
*@version    : 1.0 - 07/23/2009
*@since      : 07/23/2009

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
                        <tr <logic:notEmpty name="row" property="edi_sts">EDIT="FALSE" COLOR="RED"</logic:notEmpty>>      
                            <TD></TD>
                            <TD></TD>
                            <TD><![CDATA[<bean:write name="row" property="workday"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="mbl_no"/>]]></TD>
							
                            <TD><![CDATA[<bean:write name="row" property="vsl_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="vsl_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="flt_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pol_nm"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="pol_cd"/>]]></TD>
							
                            <TD><![CDATA[<bean:write name="row" property="mbl_bl_seq"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="edi_sts"/>]]></TD>
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
