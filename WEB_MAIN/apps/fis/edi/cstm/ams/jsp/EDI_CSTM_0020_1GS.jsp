<%--
=========================================================
*@FileName   : EDI_CSTM_0020_1GS.jsp
*@FileTitle  : 항공수출 미세관 AMS BL Data 표시
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
                            <TD><![CDATA[<bean:write name="row" property="bl_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pol_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pod_cd"/>]]></TD>
          
                            <TD><![CDATA[<bean:write name="row" property="pck_qty"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="grs_wgt"/>]]></TD>

                            <TD><![CDATA[<bean:write name="row" property="itm_nm1"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="itm_nm2"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="cre_dt"/>]]></TD>
							
                            <TD><![CDATA[<bean:write name="row" property="shp_co_nm"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="shp_cnt_cd"/>]]></TD>                            
                            <TD><![CDATA[<bean:write name="row" property="shp_ste"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="shp_plc"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="shp_st"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="shp_zip_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="shp_phn_no"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="cnee_co_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cnee_cnt_cd"/>]]></TD>							
							<TD><![CDATA[<bean:write name="row" property="cnee_ste"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cnee_plc"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cnee_st"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="cnee_zip_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="cnee_phn_no"/>]]></TD>

							<TD><![CDATA[<bean:write name="row" property="intg_bl_seq"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="mbl_seq"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="mbl_no"/>]]></TD>
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
