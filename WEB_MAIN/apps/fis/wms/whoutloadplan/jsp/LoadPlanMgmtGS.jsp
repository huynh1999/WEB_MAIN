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
						<%
								int cnt=0;
						%>
						{data:[
						      <logic:iterate id="row" name="rowSet" >
						       <%cnt++;%>
						       {
						         ibflag  : ""
						        ,chk : ""
						        ,Level : "<bean:write name="row" property="tree_nodetype"/>"
						        ,tree_nodetype : "<bean:write name="row" property="tree_nodetype"/>"
						        ,tree_value : "<bean:write name="row" property="tree_value"/>"
						        ,tree_name : "<bean:write name="row" property="tree_name"/>"
						        ,image : "<bean:write name="row" property="image"/>"
						        ,item_cd : "<bean:write name="row" property="item_cd"/>"
						        ,item_nm : "<bean:write name="row" property="item_nm"/>"
						        ,item_qty : "<bean:write name="row" property="item_qty"/>"
						        ,item_cbm : "<bean:write name="row" property="item_cbm"/>"
						        ,item_grs_kgs : "<bean:write name="row" property="item_grs_kgs"/>"
						        ,item_net_kgs : "<bean:write name="row" property="item_net_kgs"/>"
						        ,sao_no : "<bean:write name="row" property="sao_no"/>"
						        ,sao_sys_no : "<bean:write name="row" property="sao_sys_no"/>"
						        ,po_sys_no : "<bean:write name="row" property="po_sys_no"/>"
						        ,item_sys_no : "<bean:write name="row" property="item_sys_no"/>"
						        ,shipno : "<bean:write name="row" property="shipno"/>"
						        ,shipno_seq : "<bean:write name="row" property="shipno_seq"/>"
						        ,ship_no_seq : "<bean:write name="row" property="ship_no_seq"/>"
						        ,pc_ship_ltno : "<bean:write name="row" property="pc_ship_ltno"/>"
						        ,merge_yn : "<bean:write name="row" property="merge_yn"/>"
						        ,consol_no : "<bean:write name="row" property="consol_no"/>"
						        ,item_lot : "<bean:write name="row" property="item_lot"/>"
						        ,lot_id : "<bean:write name="row" property="lot_id"/>"
						       }
						       <logic:notEqual name="EventResponse" property="listValCnt" value="<%=String.valueOf(cnt)%>">,</logic:notEqual>
						      </logic:iterate>
					     ]}
			</logic:notEmpty>
</logic:empty>
<%-- 오류발생 --%>
<logic:notEmpty name="com.clt.framework.core.comm.EXCEPTION_OBJECT">
	<ERROR>
		<MESSAGE><![CDATA[ <bean:message name="com.clt.framework.core.comm.EXCEPTION_OBJECT" property="message"/>]]> </MESSAGE>
	</ERROR>
</logic:notEmpty>
