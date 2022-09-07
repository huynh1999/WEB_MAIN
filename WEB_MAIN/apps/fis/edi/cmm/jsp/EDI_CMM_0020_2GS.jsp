<%--
=========================================================
*Copyright(c) 2008 CyberLogitec. All Rights Reserved.
=========================================================

=========================================================
*@FileName   : EDI_BKG_0010GS.jsp
*@FileTitle  : 
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
<%-- 정상처리 --%>
<logic:empty name="com.clt.framework.core.comm.EXCEPTION_OBJECT">
		<%-- 조회 결과가 없는 경우 --%>
			<logic:empty name="EventResponse" property="listVal">
				<SHEET>
					<DATA TOTAL="0"></DATA>
				</SHEET>	
			</logic:empty>
		<%-- 조회 결과가 있는 경우 --%>
			<logic:notEmpty name="EventResponse" property="listVal">
				<bean:define id="rowSet" name="EventResponse" property="listVal"/>
				<% int rowNum = 1;%>
				<SHEET>
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
					<logic:iterate id="row" name="rowSet">
						<tr>
							<TD><%=rowNum++%></TD>
		                    <TD></TD>								
		                    <TD><![CDATA[<bean:write name="row" property="cntr_no"/>]]></TD>
		                    <TD><![CDATA[<bean:write name="row" property="cntr_tpsz_cd"/>]]></TD>
		                    <TD><![CDATA[<bean:write name="row" property="cgo_wgt"/>]]></TD>
		                    <TD><![CDATA[<bean:write name="row" property="cgo_meas"/>]]></TD>
		                    <TD><![CDATA[<bean:write name="row" property="seal_no1"/>]]></TD>
		                    <TD><![CDATA[<bean:write name="row" property="seal_tp1"/>]]></TD>
		                    <TD><![CDATA[<bean:write name="row" property="seal_no2"/>]]></TD>
		                    <TD><![CDATA[<bean:write name="row" property="seal_tp2"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="vgm_cgo_wgt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="vgm_cgo_wgt_tp"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="vgm_dt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="vgm_tm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="vgm_method"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="vgm_cntr_tp"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="vgm_spc_trdp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="vgm_spc_trdp_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="vgm_spc_trdp_pic"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="vgm_am_trdp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="vgm_am_trdp_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="vgm_am_trdp_pic" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="vgm_seq"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="intg_bl_seq"/>]]></TD>
		                    <TD><![CDATA[<bean:write name="row" property="cntr_list_seq"/>]]></TD>
			            </tr>
					</logic:iterate>
					</DATA>
				</SHEET>
			</logic:notEmpty>
</logic:empty>
<%-- 오류발생 --%>
<logic:notEmpty name="com.clt.framework.core.comm.EXCEPTION_OBJECT">
	<ERROR>
		<MESSAGE><![CDATA[ <bean:message name="com.clt.framework.core.comm.EXCEPTION_OBJECT" property="message"/>]]> </MESSAGE>
	</ERROR>
</logic:notEmpty>
