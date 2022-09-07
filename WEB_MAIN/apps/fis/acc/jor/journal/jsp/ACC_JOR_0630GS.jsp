<%--
=========================================================
*Copyright(c) 2008 CyberLogitec. All Rights Reserved.
=========================================================

=========================================================
*@FileName   : EdiCnfg.jsp
*@FileTitle  : Edi Config Settings
*@Description: Edi Config Settings
*@author     : 
*@version    : 
*@since      : 

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
			<logic:notEmpty name="EventResponse" property="listVal">
				<% boolean isBegin = true; %>
				<bean:define id="tmpMapVal" name="EventResponse" property="mapVal"/>
				<bean:define id="rowSet" name="EventResponse" property="listVal"/>
				<SHEET>
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
					<logic:iterate id="row" name="rowSet">
						<tr>	
							<TD></TD>
							<TD></TD>
								<TD><bean:write name="row" property="detp_nm"/></TD>
								<TD><bean:write name="row" property="ref_ofc_cd"/></TD>
								<TD><bean:write name="row" property="rgst_usrid"/></TD>
								<TD><bean:write name="row" property="ref_no"/></TD>
								<TD><bean:write name="row" property="mbl_no"/></TD>
								<TD><bean:write name="row" property="hbl_no"/></TD>
								<TD><bean:write name="row" property="hbl_tp_nm"/></TD>
								<TD><bean:write name="row" property="nomi_flg_nm"/></TD>
								<TD><bean:write name="row" property="etd"/></TD>
								<TD><bean:write name="row" property="eta"/></TD>
								<TD><bean:write name="row" property="post_dt"/></TD>
								<TD><bean:write name="row" property="inv_no"/></TD>
								<TD><bean:write name="row" property="inv_aply_curr_cd"/></TD>
								<TD><bean:write name="row" property="inv_amt"/></TD>
								<TD><bean:write name="row" property="inv_dt"/></TD>
								<TD><bean:write name="row" property="inv_rgst_tms"/></TD>
								<TD><bean:write name="row" property="gap"/></TD>
								<TD><bean:write name="row" property="modi_tms"/></TD>
								<TD><bean:write name="row" property="ml_intg_bl_seq"/></TD>
								<TD><bean:write name="row" property="hl_intg_bl_seq"/></TD>
								<TD><bean:write name="row" property="air_sea_clss_cd"/></TD>
								<TD><bean:write name="row" property="bnd_clss_cd"/></TD>								
								<TD><bean:write name="row" property="hbl_tp_cd"/></TD>
								<TD><bean:write name="row" property="nomi_flg"/></TD>
								<TD><bean:write name="row" property="inv_seq"/></TD>
								<TD><![CDATA[<% if(isBegin){ isBegin = false; %><bean:write name="tmpMapVal" property="pagingTbl"/><%}%>]]></TD>
								<TD><bean:write name="row" property="tot_cnt"/></TD>
								<TD><bean:write name="row" property="rnum"/></TD>
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
