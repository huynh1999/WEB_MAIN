<%--
=========================================================
*@FileName   : RPT_PRN_0201GS.jsp
*@FileTitle  : Profit Report
*@Description: Profit Report
*@author     : Lee, Hae Kyoung - Cyberlogitec
*@version    : 1.0 - 2013/05/22
*@since      : 2013/05/22

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
				<SHEET>
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
					<logic:iterate id="row" name="rowSet">
						<tr>
							<TD><bean:write name="row" property="bl_no"/></TD>
							<TD><bean:write name="row" property="trdp_nm"/></TD>
							<TD><bean:write name="row" property="sls_usr_nm"/></TD>
							<TD><bean:write name="row" property="fnl_dest_loc_nm"/></TD>
							<TD><bean:write name="row" property="volume"/></TD>
							<TD><bean:write name="row" property="ratio"/></TD>
							<TD><bean:write name="row" property="prf_amt"/></TD>							
							<TD><bean:write name="row" property="inv_curr_cd"/></TD>
							<TD><bean:write name="row" property="inv_curr_cd"/></TD>
							<TD><bean:write name="row" property="inv_curr_cd"/></TD>
							<TD><bean:write name="row" property="prf_sum_amt"/></TD>
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
