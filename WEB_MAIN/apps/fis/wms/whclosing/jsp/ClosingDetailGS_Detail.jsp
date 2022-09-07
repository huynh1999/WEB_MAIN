<%--
=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
=========================================================

=========================================================
*@FileName   : WHM_WHM_0003.jsp
*@FileTitle  : 
*@Description: 
*@author     : Tin.Luong - DOU NetWorks
*@version    : 1.0 - 2014/12/20
*@since      : 2014/12/20

*@Change history:
=========================================================
--%>
<%@ page contentType="text/xml; charset=UTF-8"%>
<%@page pageEncoding="UTF-8"%>
<%@include file="./../../../../../../syscommon/header/CLTGSHeader.jsp"%>
<%-- 정상처리 --%>
<logic:empty name="com.clt.framework.core.comm.EXCEPTION_OBJECT">
		<%-- 조회 결과가 없는 경우 --%>
			<logic:empty name="EventResponse" property="listVal">
					<DATA TOTAL="0"></DATA>
			</logic:empty>
		<%-- 조회 결과가 있는 경우 --%>
			<logic:notEmpty name="EventResponse" property="listVal">
				<bean:define id="rowSet" name="EventResponse" property="listVal"/>
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
						<logic:iterate id="row" name="rowSet">
							<in_cls_no><![CDATA[<bean:write name="row" property="in_cls_no"/>]]></in_cls_no>
							<cls_dt><![CDATA[<bean:write name="row" property="cls_dt"/>]]></cls_dt>
							<set_fr_dt><![CDATA[<bean:write name="row" property="set_fr_dt"/>]]></set_fr_dt>
							<set_to_dt><![CDATA[<bean:write name="row" property="set_to_dt"/>]]></set_to_dt>
							<ofc_cd><![CDATA[<bean:write name="row" property="ofc_cd"/>]]></ofc_cd>
							<ofc_nm><![CDATA[<bean:write name="row" property="ofc_nm"/>]]></ofc_nm>
							<wh_cd><![CDATA[<bean:write name="row" property="wh_cd"/>]]></wh_cd>
							<wh_nm><![CDATA[<bean:write name="row" property="wh_nm"/>]]></wh_nm>
							<ctrt_no><![CDATA[<bean:write name="row" property="ctrt_no"/>]]></ctrt_no>
							<ctrt_nm><![CDATA[<bean:write name="row" property="ctrt_nm"/>]]></ctrt_nm>
							<rtp_no><![CDATA[<bean:write name="row" property="rtp_no"/>]]></rtp_no>
							<cust_cd_arr><![CDATA[<bean:write name="row" property="cust_cd_arr"/>]]></cust_cd_arr>
							
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
