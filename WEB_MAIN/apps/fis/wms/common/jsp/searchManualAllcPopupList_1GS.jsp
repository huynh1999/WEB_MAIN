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
							<prev_rum><![CDATA[<bean:write name="row" property="prev_rum"/>]]></prev_rum>
							<curr_rum><![CDATA[<bean:write name="row" property="curr_rum" />]]></curr_rum>
							<next_rum><![CDATA[<bean:write name="row" property="next_rum" />]]></next_rum>
							<sao_sys_no><![CDATA[<bean:write name="row" property="sao_sys_no"/>]]></sao_sys_no>
							<item_sys_no><![CDATA[<bean:write name="row" property="item_sys_no"/>]]></item_sys_no>
							<item_seq><![CDATA[<bean:write name="row" property="item_seq"/>]]></item_seq>
                            <item_cd><bean:write name="row" property="item_cd"/></item_cd>
                            <item_nm><bean:write name="row" property="item_nm"/></item_nm>
                            <inbound_dt><![CDATA[<bean:write name="row" property="inbound_dt"/>]]></inbound_dt>
                            <fix_lot_id><![CDATA[<bean:write name="row" property="fix_lot_id"/>]]></fix_lot_id>
                            <lot_no><![CDATA[<bean:write name="row" property="lot_no"/>]]></lot_no>
                            <exp_dt><![CDATA[<bean:write name="row" property="exp_dt"/>]]></exp_dt>
                            <lot_04><![CDATA[<bean:write name="row" property="lot_04"/>]]></lot_04>
                            <lot_05><![CDATA[<bean:write name="row" property="lot_05"/>]]></lot_05>
                            
                            <item_ea_qty><![CDATA[<bean:write name="row" property="item_ea_qty"/>]]></item_ea_qty>
                            <alloc_ea_qty><![CDATA[<bean:write name="row" property="alloc_ea_qty"/>]]></alloc_ea_qty>
                            <walc_no><![CDATA[<bean:write name="row" property="walc_no"/>]]></walc_no>
                            <fix_loc_cd><![CDATA[<bean:write name="row" property="fix_loc_cd"/>]]></fix_loc_cd>
                            <fix_loc_cd_nm><![CDATA[<bean:write name="row" property="fix_loc_cd_nm"/>]]></fix_loc_cd_nm>
                            <s_wob_bk_no><![CDATA[<bean:write name="row" property="s_wob_bk_no"/>]]></s_wob_bk_no>
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
