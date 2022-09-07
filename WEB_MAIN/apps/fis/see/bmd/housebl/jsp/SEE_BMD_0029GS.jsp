<%--
=========================================================
*Copyright(c) 2008 CyberLogitec. All Rights Reserved.
=========================================================

=========================================================
*@FileName   : MGT_NTC_0010GS.jsp
*@FileTitle  : 게시판 목록 화면 게시판 데이터
*@Description: 게시판 목록의 게시판 데이터를 표시합니다.
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
<logic:empty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
        <%-- 조회 결과가 없는 경우 --%>
            <logic:empty name="EventResponse" property="listVal">
                <SHEET>
                    <DATA TOTAL="0"></DATA>
                </SHEET>    
            </logic:empty>
            
        <%-- 조회 결과가 있는 경우 --%>
		    <% boolean isBegin = true; %>
	        <bean:define id="tmpMapVal" name="EventResponse" property="mapVal"/>
            <logic:notEmpty name="EventResponse" property="listVal">
                <bean:define id="rowSet" name="EventResponse" property="listVal"/>
                <SHEET>
                    <DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
                    <logic:iterate id="row" name="rowSet">
                        <TR>
							<TD></TD>
                            <TD><![CDATA[<bean:write name="row" property="cntr_sprl_trdp_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="cntr_sprl_trdp_nm" filter="false"/>]]></TD>

                            <TD><![CDATA[<bean:write name="row" property="cntr_no"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="cntr_tpsz_cd"/>]]></TD>
                            
                            <TD><![CDATA[<bean:write name="row" property="seal_no1"/>]]></TD>
                            
                            <TD><![CDATA[<bean:write name="row" property="cgo_pck_qty"/>]]></TD>
		                    <TD><![CDATA[<bean:write name="row" property="cgo_pck_ut"/>]]></TD>
		                    <TD><![CDATA[<bean:write name="row" property="cgo_wgt"/>]]></TD>
		                    <TD><![CDATA[<bean:write name="row" property="cgo_wgt1"/>]]></TD>
		                    <TD><![CDATA[<bean:write name="row" property="cgo_meas"/>]]></TD>
		                    <TD><![CDATA[<bean:write name="row" property="cgo_meas1"/>]]></TD>
		                    <TD><![CDATA[<bean:write name="row" property="vol_meas"/>]]></TD>
                            
                            <TD><![CDATA[<bean:write name="row" property="soc_flg"/>]]></TD>
                            
							<TD><![CDATA[<bean:write name="row" property="agmt_dt"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="eff_dt"/>]]></TD>

                            <TD><![CDATA[<% if(isBegin){ isBegin = false; %><bean:write name="tmpMapVal" property="pagingTbl"/><%}%>]]></TD>
                        </TR>
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
