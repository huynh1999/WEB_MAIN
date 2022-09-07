<%--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : WHICItemListPopupGS.jsp
*@FileTitle  : Inbound Complete Search
*@author     : Hoai.Vo
*@version    : 1.0
*@since      : 2015/06/05
=========================================================--%>

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
							<TD></TD>
                            <TD><![CDATA[<bean:write name="row" property="Seq"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="file_org_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="upload_date"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="file_size"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="doc_no" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="file_path"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="file_sys_nm"/>]]></TD>
							<TD></TD>
							<TD></TD>
							<TD></TD>
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
