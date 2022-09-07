<%--
=========================================================
*@FileName   : EDI_CSTM_0040GS.jsp
*@FileTitle  : 항공수입 인도승락서 국내세관 EDI 관리
*@Description: 항공수입 인도승락서 국내세관 EDI 관리
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
                            <TD><![CDATA[<bean:write name="row" property="selection"/>]]></TD>
                            <TD><![CDATA[<wrt:write  name="row" property="arr_dt" formatType="DATE" fromFormat="yyyyMMdd" format="yyyy-MM-dd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="flight_no"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="mawb"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="hawb"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="consignee"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="wh_nm"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="edi_code"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="status"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="do_no"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="do_ref"/>]]></TD>
                            <TD><![CDATA[<wrt:write  name="row" property="do_dt" formatType="DATE" fromFormat="yyyyMMdd" format="yyyy-MM-dd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="amount"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="weight"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="edi_view"/>]]></TD>

                            <TD><![CDATA[<bean:write name="row" property="hawb_seq"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="edi_cre_seq"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="edi_snd_seq"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="edi_msg_no"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="warehouse"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="wh_cd"/>]]></TD>
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
