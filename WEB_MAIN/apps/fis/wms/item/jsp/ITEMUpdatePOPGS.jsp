<%--
=========================================================
*@FileName   : CMM_POP_0110GS.jsp
*@FileTitle  : CMM
*@Description: commodity pop
*@author     : 이광훈 - commodity pop
*@version    : 1.0 - 01/05/2009
*@since      : 01/05/2009
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
			<% boolean isBegin = true; %>
				
				<bean:define id="rowSet" name="EventResponse" property="listVal"/>
				<SHEET>
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
					<logic:iterate id="row" name="rowSet">
						<tr>	
							<TD><![CDATA[<bean:write name="row" property="item_cng_flg"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="item_sys_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ctrt_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="item_cd_asis"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="item_nm_asis" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="item_cd_tobe"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="item_nm_tobe" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rgst_id"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rgst_sys_dt" />]]></TD>
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
