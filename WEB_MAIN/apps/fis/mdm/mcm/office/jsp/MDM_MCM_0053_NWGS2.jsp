<%--
=========================================================
*@FileName   : MDM_MCM_0051GS.jsp
*@FileTitle  : OEH REMARK
*@Description: OEH REMARK 를 조회한다.
*@author     : JSJSANG
*@version    : 1.0 - 07/24/2013
*@since      : 07/23/2013

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
					<DATA>
					<logic:iterate id="row" name="rowSet">
						<% cnt++;%>
						<tr>
							<TD></TD>	
							<TD><![CDATA[<bean:write name="row" property="dc_pfit_shr_id"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="dc_pfit_shr_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pfit_shr_frt_cd" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="mbl_pfit_shr_pct" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="hbl_pfit_shr_pct" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="modi_flg" filter="false"/>]]></TD>
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
