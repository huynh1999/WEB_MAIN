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
						<pick_dt><![CDATA[<bean:write name="rowField" property="pick_dt"/>]]></pick_dt>
						<pick_hm_fr><![CDATA[<bean:write name="rowField" property="pick_hm_fr"/>]]></pick_hm_fr>
						<pick_hm_to><![CDATA[<bean:write name="rowField" property="pick_hm_to"/>]]></pick_hm_to>
						<supv_nm><![CDATA[<bean:write name="rowField" property="supv_nm"/>]]></supv_nm>
						<load_dt><![CDATA[<bean:write name="rowField" property="load_dt"/>]]></load_dt>
						<load_hm_fr><![CDATA[<bean:write name="rowField" property="load_hm_fr"/>]]></load_hm_fr>
						<load_hm_to><![CDATA[<bean:write name="rowField" property="load_hm_to"/>]]></load_hm_to>
						<pick_by><![CDATA[<bean:write name="rowField" property="pick_by"/>]]></pick_by>
						<msg_to_pick><![CDATA[<bean:write name="rowField" property="msg_to_pick"/>]]></msg_to_pick>
						<pick_sht_yn><![CDATA[<bean:write name="rowField" property="pick_sht_yn"/>]]></pick_sht_yn>
						<wh_cd><![CDATA[<bean:write name="rowField" property="wh_cd"/>]]></wh_cd>
						<gate_no><![CDATA[<bean:write name="rowField" property="gate_no"/>]]></gate_no>
						<outbound_loc_cd><![CDATA[<bean:write name="rowField" property="outbound_loc_cd"/>]]></outbound_loc_cd>
						<outbound_loc_nm><![CDATA[<bean:write name="rowField" property="outbound_loc_nm"/>]]></outbound_loc_nm>
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
