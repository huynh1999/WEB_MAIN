<%--
=========================================================
*Copyright(c) 2008 CyberLogitec. All Rights Reserved.
=========================================================
=========================================================
*@FileName   : SEE_BMD_0020_1GS.jsp
*@FileTitle  : Booking Container 데이터 그리드
*@Description: 
*@author     : Kang,Jung-Gu - Cyberlogitec
*@version    : 1.0 - 02/05/2009
*@since      : 02/05/2009

*@Change history:
=========================================================
--%>
<%@ page contentType="text/xml; charset=UTF-8"%>
<%@page pageEncoding="UTF-8"%>
<%@include file="./../../../../../../syscommon/header/CLTGSHeader.jsp"%>
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
	            <bean:define id="tmpMapVal" name="EventResponse" property="mapVal"/>
				<bean:define id="rowSet" name="EventResponse" property="listVal"/>
				<SHEET>
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
					<logic:iterate id="row" name="rowSet">
						<tr>	
							<TD></TD>
							<TD><![CDATA[<bean:write name="row" property="wo_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="trsp_trdp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="trsp_trdp_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="trsp_trdp_addr" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="org_rout_trdp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="org_rout_trdp_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="org_rout_addr" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="dest_rout_trdp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="dest_rout_trdp_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="dest_rout_addr" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="bill_to_trdp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="bill_to_trdp_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="bill_to_trdp_addr" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cgo_itm_cmdt_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cgo_pck_qty"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pck_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="act_wgt_k"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="act_wgt_l"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cgo_meas_m"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cgo_meas_f"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="iss_dt_tm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="iss_usrid" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ofc_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="org_rout_dt_tm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="org2_rout_dt_tm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rmk" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="dest_rout_dt_tm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="via_rout_dt_tm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="via_rout_addr"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="shpr_trdp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="shpr_trdp_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="shpr_trdp_addr" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cnee_trdp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cnee_trdp_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cnee_trdp_addr" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="prnr_trdp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="prnr_trdp_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="prnr_trdp_addr" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="org2_rout_addr" filter="false"/>]]></TD>
                            <TD><![CDATA[<% if(isBegin){ isBegin = false; %><bean:write name="tmpMapVal" property="pagingTbl"/><%}%>]]></TD>
			            </tr>
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
