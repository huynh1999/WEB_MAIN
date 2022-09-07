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
<logic:empty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
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
							<walc_no><![CDATA[<bean:write name="row" property="walc_no"/>]]></walc_no>
							<supv_nm><![CDATA[<bean:write name="row" property="supv_nm" />]]></supv_nm>
							<outbound_loc_nm><![CDATA[<bean:write name="row" property="outbound_loc_nm" />]]></outbound_loc_nm>
							<outbound_loc_cd><![CDATA[<bean:write name="row" property="outbound_loc_cd"/>]]></outbound_loc_cd>
							<gate_no><![CDATA[<bean:write name="row" property="gate_no"/>]]></gate_no>
							<pick_dt><![CDATA[<bean:write name="row" property="pick_dt"/>]]></pick_dt>
                            <pick_hm_fr><![CDATA[<bean:write name="row" property="pick_hm_fr"/>]]></pick_hm_fr>
                            <pick_hm_to><![CDATA[<bean:write name="row" property="pick_hm_to"/>]]></pick_hm_to>
                            <pick_by><![CDATA[<bean:write name="row" property="pick_by"/>]]></pick_by>
                            <msg_to_pick><![CDATA[<bean:write name="row" property="msg_to_pick"/>]]></msg_to_pick>
                            <insp_by><![CDATA[<bean:write name="row" property="insp_by"/>]]></insp_by>
                            <insp_hm_fr><![CDATA[<bean:write name="row" property="insp_hm_fr"/>]]></insp_hm_fr>
                            <insp_hm_to><![CDATA[<bean:write name="row" property="insp_hm_to"/>]]></insp_hm_to>
                            <msg_to_insp><![CDATA[<bean:write name="row" property="msg_to_insp"/>]]></msg_to_insp>
                            <lp_no><![CDATA[<bean:write name="row" property="lp_no"/>]]></lp_no>
                            <load_by><![CDATA[<bean:write name="row" property="load_by"/>]]></load_by>
                            <load_hm_fr><![CDATA[<bean:write name="row" property="load_hm_fr"/>]]></load_hm_fr>
                            <load_hm_to><![CDATA[<bean:write name="row" property="load_hm_to"/>]]></load_hm_to>
                            <msg_to_load><![CDATA[<bean:write name="row" property="msg_to_load"/>]]></msg_to_load>
                            <wave_wob_bk_no><![CDATA[<bean:write name="row" property="wave_wob_bk_no"/>]]></wave_wob_bk_no>
						</logic:iterate>
					</DATA>
			</logic:notEmpty>
</logic:empty>
<%-- 오류발생 --%>
<logic:notEmpty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
	<ERROR>
		<MESSAGE><![CDATA[ <bean:message name="com.clt.framework.core.comm.EXCEPTION_OBJECT" property="message"/>]]> </MESSAGE>
	</ERROR>
</logic:notEmpty>
