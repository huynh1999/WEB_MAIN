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
							<wave_no><![CDATA[<bean:write name="row" property="wave_no"/>]]></wave_no>
							<pick_dt><![CDATA[<bean:write name="row" property="pick_dt"/>]]></pick_dt>
							<pick_hm_fr><![CDATA[<bean:write name="row" property="pick_hm_fr"/>]]></pick_hm_fr>
							<pick_hm_to><![CDATA[<bean:write name="row" property="pick_hm_to" />]]></pick_hm_to>
							<rmk><![CDATA[<bean:write name="row" property="rmk" />]]></rmk>
							<wave_wh_cd><![CDATA[<bean:write name="row" property="wave_wh_cd"/>]]></wave_wh_cd>
							
							<wave_wh_nm><![CDATA[<bean:write name="row" property="wave_wh_nm"/>]]></wave_wh_nm>
							<wave_ctrt_no><![CDATA[<bean:write name="row" property="wave_ctrt_no"/>]]></wave_ctrt_no>
							<wave_ctrt_nm><![CDATA[<bean:write name="row" property="wave_ctrt_nm"/>]]></wave_ctrt_nm>
							
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