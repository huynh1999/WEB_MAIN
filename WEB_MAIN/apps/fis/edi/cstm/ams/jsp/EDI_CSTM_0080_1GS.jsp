<%--
=========================================================
*@FileName   : EDI_CSTM_0080_1.jsp
*@FileTitle  : 해운수출 미세관 AMS BL 정보 조회
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
                        <tr>
							<TD><![CDATA[]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="hbl_no"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="mbl_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pod_cd"/>]]></TD>
          
                            <TD><![CDATA[<bean:write name="row" property="pck_qty"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="grs_wgt"/>]]></TD>

                            <TD><![CDATA[<bean:write name="row" property="shp_co_nm"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="cnee_co_nm"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="noti_co_nm"/>]]></TD>

                            <TD><![CDATA[<bean:write name="row" property="intg_bl_seq"/>]]></TD>
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
