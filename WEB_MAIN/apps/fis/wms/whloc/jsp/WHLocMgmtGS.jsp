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
							<code><![CDATA[<bean:write name="row" property="code"/>]]></code>
							<name><![CDATA[<bean:write name="row" property="name"/>]]></name>
							<loc_cd><![CDATA[<bean:write name="row" property="loc_cd"/>]]></loc_cd>
							<loc_nm><![CDATA[<bean:write name="row" property="loc_nm" />]]></loc_nm>
							<use_yn><![CDATA[<bean:write name="row" property="use_yn" />]]></use_yn>
							<loc_loc_nm><![CDATA[<bean:write name="row" property="loc_loc_nm"/>]]></loc_loc_nm>
							
							<zone_cd><![CDATA[<bean:write name="row" property="zone_cd"/>]]></zone_cd>
							<space_tp_cd><![CDATA[<bean:write name="row" property="space_tp_cd"/>]]></space_tp_cd>
							<put_tp_cd><![CDATA[<bean:write name="row" property="put_tp_cd"/>]]></put_tp_cd>
							<zone_seq><![CDATA[<bean:write name="row" property="zone_seq" />]]></zone_seq>
							<abc_cd><![CDATA[<bean:write name="row" property="abc_cd" />]]></abc_cd>
							<use_flg><![CDATA[<bean:write name="row" property="use_flg"/>]]></use_flg>
							<rmk><![CDATA[<bean:write name="row" property="rmk"/>]]></rmk>
							<block_cd><![CDATA[<bean:write name="row" property="block_cd"/>]]></block_cd>
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