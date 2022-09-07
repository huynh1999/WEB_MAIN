<%--
=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
=========================================================

=========================================================
*@FileName   : WWHM_WHM_0009GS.jsp
*@FileTitle  : 
*@Description: 
*@author     : Thoa.Dien - Cyberlogitec
*@version    : 1.0 - 2014/12/22
*@since      : 2014/12/22

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
				<SHEET>
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
					<logic:iterate id="row" name="rowSet">
						<tr>
							<TD></TD>
							<TD><bean:write name="row" property="loc_cd"/></TD>
							<TD><bean:write name="row" property="loc_nm"/></TD>
							<TD><bean:write name="row" property="addr"/></TD>
							<TD><bean:write name="row" property="loc_addr1"/></TD>
							<TD><bean:write name="row" property="loc_addr2"/></TD>
							<TD><bean:write name="row" property="loc_addr3"/></TD>
							<TD><bean:write name="row" property="loc_addr4"/></TD>
							<TD><bean:write name="row" property="loc_addr5"/></TD>
							<TD><bean:write name="row" property="loc_freedays"/></TD>
							<TD><bean:write name="row" property="origin_pic_nm"/></TD>
							<TD><bean:write name="row" property="origin_pic_tel"/></TD>
							<TD><bean:write name="row" property="origin_pic_fax"/></TD>
							<TD><bean:write name="row" property="origin_pic_email"/></TD>
							<TD><bean:write name="row" property="dest_loc_cd"/></TD>
							<TD><bean:write name="row" property="dest_loc_addr"/></TD>
							<TD><bean:write name="row" property="dest_pic_nm"/></TD>
							<TD><bean:write name="row" property="dest_pic_tel"/></TD>
							<TD><bean:write name="row" property="dest_pic_fax"/></TD>
							<TD><bean:write name="row" property="dest_pic_email"/></TD>
							<TD><bean:write name="row" property="ofc_cd"/></TD>
							<TD><bean:write name="row" property="rmq_svc"/></TD>
							<TD><bean:write name="row" property="cust_pic_nm"/></TD>
							<TD><bean:write name="row" property="tel"/></TD>
							<TD><bean:write name="row" property="fax"/></TD>
							<TD><bean:write name="row" property="email"/></TD>
							<TD><bean:write name="row" property="branch"/></TD>
							<TD><bean:write name="row" property="priv_flg"/></TD>
							<TD><bean:write name="row" property="cust_cd"/></TD>
							<TD><bean:write name="row" property="cust_nm"/></TD>
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
