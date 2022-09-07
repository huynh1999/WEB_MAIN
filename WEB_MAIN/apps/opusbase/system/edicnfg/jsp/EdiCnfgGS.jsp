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
				<bean:define id="rowSet" name="EventResponse" property="listVal"/>
				<SHEET>
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
					<logic:iterate id="row" name="rowSet">
						<tr>	
							<TD></TD>
							<TD></TD>
							<TD></TD>
								<TD><bean:write name="row" property="scac"/></TD>
								<TD><bean:write name="row" property="tp"/></TD>
								<TD><bean:write name="row" property="url"/></TD>
								<TD><bean:write name="row" property="port"/></TD>
								<TD><bean:write name="row" property="id"/></TD>
								<TD><bean:write name="row" property="pwd"/></TD>
								<TD><bean:write name="row" property="snd_dir"/></TD>
								<TD><bean:write name="row" property="rcv_dir"/></TD>
								<TD><bean:write name="row" property="snd_file_repo"/></TD>
								<TD><bean:write name="row" property="rcv_file_repo"/></TD>
								<TD><bean:write name="row" property="desc"/></TD>
								<TD><bean:write name="row" property="smt_cust_id"/></TD>
								<TD><bean:write name="row" property="sndr_id"/></TD>
								<TD><bean:write name="row" property="rcvr_id"/></TD>
								<TD><bean:write name="row" property="rcvr_pwd"/></TD>
								<TD><bean:write name="row" property="ver"/></TD>
								<TD><bean:write name="row" property="is_passive"/></TD>
								<TD><bean:write name="row" property="sndr_pwd"/></TD>
								<TD><bean:write name="row" property="rpt_id"/></TD>
								<TD><bean:write name="row" property="rpt_pwd"/></TD>
								<TD><bean:write name="row" property="agt_edi_msg_tp_cd"/></TD>
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
