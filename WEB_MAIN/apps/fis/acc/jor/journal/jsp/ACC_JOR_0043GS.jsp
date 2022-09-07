<%--
=========================================================
*@FileName   : ACC_JOR_0043GS.jsp
*@FileTitle  : Check Batch Print
*@author     : CLT
*@version    : 1.0
*@since      : 2017/09/05

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
				<!-- #2341 [LBS] Deposit/Payment List 속도 개선을 위한 paging 처리 -->
				<% boolean isBegin = true; %>
				<bean:define id="rowSet" name="EventResponse" property="listVal"/>
				<SHEET>
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
					<logic:iterate id="row" name="rowSet">
						<tr>
                            <TD><![CDATA[<bean:write name="row" property="jnr_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="chk_no" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="bank_seq" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="chk_form" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rider_yn" filter="false"/>]]></TD>
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
