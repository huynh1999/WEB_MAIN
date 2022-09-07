<%--
=========================================================
*Copyright(c) 2015 CyberLogitec. All Rights Reserved.
*@FileName   : RateUploadPopupGS.jsp
*@FileTitle  : Location
*@author     : CLT
*@version    : 1.0
*@since      : 2014/10/21
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
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
						<logic:iterate id="row" name="rowSet">
							<wob_bk_no><![CDATA[<bean:write name="row" property="wob_bk_no"/>]]></wob_bk_no>
							<walc_no_cnt><![CDATA[<bean:write name="row" property="walc_no_cnt"/>]]></walc_no_cnt>
							<issu_cnt><![CDATA[<bean:write name="row" property="issu_cnt"/>]]></issu_cnt>
							<ship_cnt><![CDATA[<bean:write name="row" property="ship_cnt"/>]]></ship_cnt>
							<lp_cnt><![CDATA[<bean:write name="row" property="lp_cnt"/>]]></lp_cnt>
							<search_tp><![CDATA[<bean:write name="row" property="search_tp"/>]]></search_tp>
							<search_div><![CDATA[<bean:write name="row" property="search_div"/>]]></search_div>
							<exception_msg><![CDATA[<bean:write name="row" property="exception_msg"/>]]></exception_msg>
							
                       </logic:iterate>
					</DATA>
			</logic:notEmpty>
</logic:empty>
<%-- 오류발생 --%>
<logic:notEmpty name="com.clt.framework.core.comm.EXCEPTION_OBJECT">
	<ERROR>
		<MESSAGE><![CDATA[ <bean:message name="com.clt.framework.core.comm.EXCEPTION_OBJECT" property="message"/>]]> </MESSAGE>
	</ERROR>
</logic:notEmpty>