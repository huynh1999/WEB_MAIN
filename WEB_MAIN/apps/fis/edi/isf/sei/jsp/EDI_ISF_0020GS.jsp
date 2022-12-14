<%--
=========================================================
*Copyright(c) 2008 CyberLogitec. All Rights Reserved.
=========================================================

=========================================================
*@FileName   : EDI_DBS_0020GS.jsp
*@FileTitle  : 
*@Description: 
*@author     : Lee,Hae-Kyoung - Cyberlogitec
*@version    : 1.0 - 04/05/2012
*@since      : 04/05/2012

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
				<bean:define id="rowSet" name="EventResponse" property="listVal"/>
				<SHEET>
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
					<logic:iterate id="row" name="rowSet">
						<tr>
						    <TD><%=++cnt%></TD>
						    <TD><bean:write name="row" property="hbl_no"/></TD>
							<TD><bean:write name="row" property="mbl_no"/></TD>
							<TD><bean:write name="row" property="hbl_tp"/></TD>
							<TD><bean:write name="row" property="isf_no"/></TD>
							<TD><bean:write name="row" property="msg_sts"/></TD>
							<TD><bean:write name="row" property="isf_tp"/></TD>
							<TD><bean:write name="row" property="isf_trac_no"/></TD>
							<TD><bean:write name="row" property="im_entt_name"/></TD>
							<TD><bean:write name="row" property="etd_dt_tm"/></TD>
							<TD><bean:write name="row" property="eta_dt_tm"/></TD>
							<TD><bean:write name="row" property="pol_nm"/></TD>
							<TD><bean:write name="row" property="pod_nm"/></TD>
							<TD><bean:write name="row" property="del_nm"/></TD>
							<TD><bean:write name="row" property="trnk_vsl_nm"/></TD>
							<TD><bean:write name="row" property="trnk_voy"/></TD>
							<TD><bean:write name="row" property="intg_bl_seq"/></TD>
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
