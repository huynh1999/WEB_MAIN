<%--
=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
=========================================================

=========================================================
*@FileName   : searchWHOutWorkShtInfoGS.jsp
*@FileTitle  : 
*@Description: 
*@author     : Khoa.Nguyen - DOU NetWorks
*@version    : 1.0 - 2016/05/13

*@Change history:
=========================================================
--%>
<%@ page contentType="text/xml; charset=UTF-8"%>
<%@page pageEncoding="UTF-8"%>
<%@include file="./../../../../../../syscommon/header/CLTGSHeader.jsp"%>
<%-- 정상처리 --%>
<logic:empty name="com.clt.framework.core.comm.EXCEPTION_OBJECT">
	<logic:notEmpty name="EventResponse" property="mapVal">
		<bean:define id="rowSet" name="EventResponse" property="mapVal"/>
		
		<logic:notEmpty name="rowSet" property="listCnt">
			<CHECK>
				<listCnt><![CDATA[<bean:write name="rowSet" property="listCnt"/>]]></listCnt>
			</CHECK>
		</logic:notEmpty>
		
		<logic:notEmpty name="rowSet" property="form">
				<bean:define id="rowSetField" name="rowSet" property="form"/>
			<FIELD>
				<DATA TOTAL="1">
					<logic:iterate id="rowField" name="rowSetField">
						<cust_ord_no><![CDATA[<bean:write name="rowField" property="cust_ord_no"/>]]></cust_ord_no>
						<supv_nm><![CDATA[<bean:write name="rowField" property="supv_nm"/>]]></supv_nm>
						<work_by><![CDATA[<bean:write name="rowField" property="work_by"/>]]></work_by>
						<msg_to_work><![CDATA[<bean:write name="rowField" property="msg_to_work"/>]]></msg_to_work>
						<work_sht_yn><![CDATA[<bean:write name="rowField" property="work_sht_yn"/>]]></work_sht_yn>
						<wh_cd><![CDATA[<bean:write name="rowField" property="wh_cd"/>]]></wh_cd>
					</logic:iterate>
				</DATA>
			</FIELD>
		</logic:notEmpty>
	</logic:notEmpty>
</logic:empty>
<%-- 오류발생 --%>
<logic:notEmpty name="com.clt.framework.core.comm.EXCEPTION_OBJECT">
	<ERROR>
		<MESSAGE><![CDATA[ <bean:message name="com.clt.framework.core.comm.EXCEPTION_OBJECT" property="message"/>]]> </MESSAGE>
	</ERROR>
</logic:notEmpty>
