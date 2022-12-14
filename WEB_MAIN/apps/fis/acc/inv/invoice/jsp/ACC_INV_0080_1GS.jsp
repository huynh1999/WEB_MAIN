<%--
=========================================================
*@FileName   : SEE_BMD_0080GS.jsp
*@FileTitle  : S/R Search 
*@Description: S/R Search 조회한다.
*@author     : 이광훈 - see =Export 
*@version    : 1.0 - 01/15/2009
*@since      : 01/15/2009

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
            
                <% int cnt = 0; %>
                <% boolean isBegin = true; %>
                <bean:define id="rowSet" name="EventResponse" property="listVal"/>
                <SHEET>
                    <DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
                    <logic:iterate id="row" name="rowSet">
                        <tr> 
							<TD></TD>
                            <TD><![CDATA[<bean:write name="row" property="inv_no"/>]]></TD>
                            
                            <TD><![CDATA[<bean:write name="row" property="buy_inv_no"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="inv_dt"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="et_dt_tm"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="bl_no"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="mbl_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="frgn_curr_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="frgn_sum_amt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="locl_amt"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="dept_nm"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="inv_aply_curr_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="inv_amt"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="inv_vat_amt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inv_sum_amt"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="inv_seq"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="ofc_cd"/>]]></TD>
                            <TD></TD>
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
