
<%--
=========================================================
*@FileName   : WHM_WHM_0001_WHGS.jsp
*@FileTitle  : Warehouse Entry
*@Description: 
*@author     : Vinh Vo - Dou
*@version    : 1.0 - 2014/12/23
*@since      : 2014/12/23

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
					<DATA TOTAL="">
						<logic:iterate id="row" name="rowSet">
							<f_consol_no><![CDATA[<bean:write name="row" property="f_consol_no"/>]]></f_consol_no>
							<ttl_item_ea_qty><![CDATA[<bean:write name="row" property="ttl_item_ea_qty"/>]]></ttl_item_ea_qty>
							<ttl_item_cbm><![CDATA[<bean:write name="row" property="ttl_item_cbm"/>]]></ttl_item_cbm>
							<ttl_item_grs_kgs><![CDATA[<bean:write name="row" property="ttl_item_grs_kgs"/>]]></ttl_item_grs_kgs>
							<ttl_item_net_kgs><![CDATA[<bean:write name="row" property="ttl_item_net_kgs"/>]]></ttl_item_net_kgs>
						</logic:iterate>
					</DATA>
			</logic:notEmpty>
</logic:empty>
<%-- 오류발생 --%>
<logic:notEmpty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
	<ERROR>
		<MESSAGE><![CDATA[ <bean:message name="com.clt.framework.core.comm.EXCEPTION_OBJECT      " property="message"/>]]> </MESSAGE>
	</ERROR>
</logic:notEmpty>

