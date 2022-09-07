<%--
=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
=========================================================

=========================================================
*@FileName   : WWHM_WHM_0009GS.jsp
*@FileTitle  : 
*@Description: 
*@author     : Thoa.Dien - Cyberlogitec
*@version    : 1.0 - 2014/12/22
*@since      : 2014/12/22

*@Change history:
=========================================================
--%>
<%@ page contentType="text/xml; charset=UTF-8"%>
<%@page pageEncoding="UTF-8"%>
<%@include file="./../../../../../../syscommon/header/CLTGSHeader.jsp"%>
<%-- 정상처리 --%>
<logic:empty name="com.clt.framework.core.comm.EXCEPTION_OBJECT">
		<%-- 조회 결과가 없는 경우 --%>
			<logic:empty name="EventResponse" property="mapVal">
				<SHEET>
					<DATA TOTAL="0"></DATA>
				</SHEET>	
			</logic:empty>
		<%-- 조회 결과가 있는 경우 --%>
			<logic:notEmpty name="EventResponse" property="mapVal">
				<bean:define id="rowSet" name="EventResponse" property="mapVal"/>
				<logic:notEmpty name="rowSet" property="field">
 					<bean:define id="rowSetField" name="rowSet" property="field"/>
					<FIELD>
						<DATA TOTAL="1">
							<logic:iterate id="rowField" name="rowSetField">
								<listCnt><![CDATA[<bean:write name="rowSet" property="listCnt"/>]]></listCnt>
								<item_sys_no><![CDATA[<bean:write name="rowField" property="item_sys_no"/>]]></item_sys_no>
								<item_nm><![CDATA[<bean:write name="rowField" property="item_nm"/>]]></item_nm>
								<lv1_cbm><![CDATA[<bean:write name="rowField" property="lv1_cbm"/>]]></lv1_cbm>
								<lv1_cbf><![CDATA[<bean:write name="rowField" property="lv1_cbf"/>]]></lv1_cbf>
								<lv1_grs_kgs><![CDATA[<bean:write name="rowField" property="lv1_grs_kgs"/>]]></lv1_grs_kgs>
								<lv1_grs_lbs><![CDATA[<bean:write name="rowField" property="lv1_grs_lbs"/>]]></lv1_grs_lbs>
								<lv1_net_kgs><![CDATA[<bean:write name="rowField" property="lv1_net_kgs"/>]]></lv1_net_kgs>
								<lv1_net_lbs><![CDATA[<bean:write name="rowField" property="lv1_net_lbs"/>]]></lv1_net_lbs>
								<pkg_lv1_qty><![CDATA[<bean:write name="rowField" property="pkg_lv1_qty"/>]]></pkg_lv1_qty>
								<pkg_lv1_unit_cd><![CDATA[<bean:write name="rowField" property="pkg_lv1_unit_cd"/>]]></pkg_lv1_unit_cd>
								<pkg_lv2_qty><![CDATA[<bean:write name="rowField" property="pkg_lv2_qty"/>]]></pkg_lv2_qty>
								<pkg_lv2_unit_cd><![CDATA[<bean:write name="rowField" property="pkg_lv2_unit_cd"/>]]></pkg_lv2_unit_cd>
								<pkg_lv3_qty><![CDATA[<bean:write name="rowField" property="pkg_lv3_qty"/>]]></pkg_lv3_qty>
								<pkg_lv3_unit_cd><![CDATA[<bean:write name="rowField" property="pkg_lv3_unit_cd"/>]]></pkg_lv3_unit_cd>
								<pkg_lv4_qty><![CDATA[<bean:write name="rowField" property="pkg_lv4_qty"/>]]></pkg_lv4_qty>
								<pkg_lv4_unit_cd><![CDATA[<bean:write name="rowField" property="pkg_lv4_unit_cd"/>]]></pkg_lv4_unit_cd>
								<pkg_info><![CDATA[<bean:write name="rowField" property="pkg_info"/>]]></pkg_info>
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
