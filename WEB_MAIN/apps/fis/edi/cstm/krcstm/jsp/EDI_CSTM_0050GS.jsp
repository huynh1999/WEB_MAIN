<%--
=========================================================
*@FileName   : SEE_FRT_0050GS.jsp
*@FileTitle  : 해운수출 EDI전문 목록
*@Description: 
*@author     : Kang,Jung-Gu - Cyberlogitec
*@version    : 1.0 - 02/06/2009
*@since      : 02/06/2009

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
							<TD><![CDATA[<wrt:write  name="row" property="workday" formatType="DATE" fromFormat="yyyyMMdd" format="yyyy-MM-dd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="mbl_no"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="vsl_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="flt_no"/>]]></TD>
							
                            <TD><![CDATA[<bean:write name="row" property="edi_sts"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="smt_dt"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="edi_cre_seq"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="edi_msg_seq"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="cstm_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cstm_nm"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="cstm_dept_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cstm_dept_nm"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="edi_msg_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="vsl_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="lnr_nm"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="workday"/><bean:write name="row" property="flt_no"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="lnr_cstm_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="mrn"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="intg_bl_seq"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="noti_nm"/>]]></TD>
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
