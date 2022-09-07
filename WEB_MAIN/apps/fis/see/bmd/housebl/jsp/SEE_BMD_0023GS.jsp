<%--
=========================================================
*Copyright(c) 2008 CyberLogitec. All Rights Reserved.
=========================================================
=========================================================
*@FileName   : SEE_BMD_0023GS.jsp
*@FileTitle  : Container List 데이터 그리드 조회
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
					
                    <TD><![CDATA[<bean:write name="row" property="soc_flg"/>]]></TD>										
                    <TD><![CDATA[<bean:write name="row" property="cntr_no"/>]]></TD>
                    <TD><![CDATA[<bean:write name="row" property="cntr_tpsz_cd"/>]]></TD>
                    <TD><![CDATA[<bean:write name="row" property="seal_no1"/>]]></TD>
                    <TD><![CDATA[<bean:write name="row" property="seal_no2"/>]]></TD>
                    <TD><![CDATA[<bean:write name="row" property="seal_no3"/>]]></TD>
					
					<TD><![CDATA[<bean:write name="row" property="cntr_ref_no"/>]]></TD>
					
					<TD><![CDATA[<bean:write name="row" property="cgo_pck_qty"/>]]></TD>
                    <TD><![CDATA[<bean:write name="row" property="cgo_pck_ut"/>]]></TD>
                    <TD><![CDATA[<bean:write name="row" property="cgo_wgt"/>]]></TD>
                    <TD><![CDATA[<bean:write name="row" property="cgo_wgt1"/>]]></TD>
                    <TD><![CDATA[<bean:write name="row" property="cgo_meas"/>]]></TD>
                    <TD><![CDATA[<bean:write name="row" property="cgo_meas1"/>]]></TD>
                    <TD><![CDATA[<bean:write name="row" property="vol_meas"/>]]></TD>
					
					<TD><![CDATA[<bean:write name="row" property="cntr_sprl_trdp_cd"/>]]></TD>
					<TD><![CDATA[<bean:write name="row" property="cntr_sprl_trdp_nm" filter="false"/>]]></TD>
					
					<TD><![CDATA[<bean:write name="row" property="rc_flg"/>]]></TD>
					<TD><![CDATA[<bean:write name="row" property="temp_val"/>]]></TD>
					<TD><![CDATA[<bean:write name="row" property="temp_cd"/>]]></TD>
					<TD><![CDATA[<bean:write name="row" property="mgset_flg"/>]]></TD>
					<TD><![CDATA[<bean:write name="row" property="ca_flg"/>]]></TD>					
					<TD><![CDATA[<bean:write name="row" property="vent_cd"/>]]></TD>
					<TD><![CDATA[<bean:write name="row" property="air_flow"/>]]></TD>					
					<TD><![CDATA[<bean:write name="row" property="air_flow_unit"/>]]></TD>					
					<TD><![CDATA[<bean:write name="row" property="humid"/>]]></TD>	
					
					<TD><![CDATA[<bean:write name="row" property="dg_gds_flg"/>]]></TD>
					<TD><![CDATA[<bean:write name="row" property="cntr_rmk"/>]]></TD>
					<TD><![CDATA[<bean:write name="row" property="trkg_fee_txt"  filter="false"/>]]></TD>
					<!-- #2107 [PATENT] HB/L의 FCL Shipmode 시 SAY 항목 표시 보완 -->
					<TD><![CDATA[<bean:write name="row" property="prt_cgo_flg" filter="false"/>]]></TD>

					<TD><![CDATA[<bean:write name="row" property="intg_bl_seq"/>]]></TD>
                    <TD><![CDATA[<bean:write name="row" property="cntr_list_seq"/>]]></TD>
                    <TD><![CDATA[]]></TD>

					<TD><![CDATA[<bean:write name="row" property="rgst_cntr_yn"/>]]></TD>
					<!-- #1543 [LBS] Container Type/Size Reefer, Ventill 항목 관리 -->
					<TD><![CDATA[<bean:write name="row" property="temp_flg"/>]]></TD>
					<TD><![CDATA[<bean:write name="row" property="vent_flg"/>]]></TD>
					
					<TD><![CDATA[<bean:write name="row" property="pickup_number"/>]]></TD>
					<TD><![CDATA[<bean:write name="row" property="lfd"/>]]></TD>
					<TD><![CDATA[<bean:write name="row" property="cntr_go_date"/>]]></TD>					
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
