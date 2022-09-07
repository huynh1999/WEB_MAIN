<%--
=========================================================
*Copyright(c) 2008 CyberLogitec. All Rights Reserved.
=========================================================

=========================================================
*@FileName   : MENUGS.jsp
*@FileTitle  : 메뉴 데이터 표시
*@Description: 메뉴의 관리
*@author     : Kang,Jung-Gu - Cyberlogitec
*@version    : 1.0 - 08/07/2008
*@since      : 08/07/2008

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
							<TD><![CDATA[<bean:write name="row" property="mrd_key" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="mrd" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="path" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ltr_dflt" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="a4_en_dflt" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="a4_zh_dflt" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="a4_ja_dflt" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pgm_id" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rpt_desc"/>]]></TD>
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
