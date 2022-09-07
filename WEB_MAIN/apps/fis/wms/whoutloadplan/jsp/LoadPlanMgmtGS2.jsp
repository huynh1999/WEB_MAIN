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
						        ,wob_bk_no : "<bean:write name="row" property="wob_bk_no"/>"
						        ,item_cd : "<bean:write name="row" property="item_cd"/>"
						        ,item_nm : "<bean:write name="row" property="item_nm"/>"
						        ,item_lot : "<bean:write name="row" property="item_lot"/>"
						        ,cust_ord_no : "<bean:write name="row" property="cust_ord_no"/>"
						        ,lp_item_ea_qty : "<bean:write name="row" property="lp_item_ea_qty"/>"
						        ,lp_item_cbm : "<bean:write name="row" property="lp_item_cbm"/>"
						        ,lp_item_grs_kgs : "<bean:write name="row" property="lp_item_grs_kgs"/>"
						        ,lp_item_net_kgs : "<bean:write name="row" property="lp_item_net_kgs"/>"
						        ,lot_id : "<bean:write name="row" property="lot_id"/>"
						        ,id : "<bean:write name="row" property="id"/>"
						        ,seq : "<bean:write name="row" property="seq"/>"
						        ,id_seq : "<bean:write name="row" property="id_seq"/>"
						        ,lp_item_cbf : "<bean:write name="row" property="lp_item_cbf"/>"
						        ,lp_item_grs_lbs : "<bean:write name="row" property="lp_item_grs_lbs"/>"
						        ,lp_item_net_lbs : "<bean:write name="row" property="lp_item_net_lbs"/>"
						        ,shipno : "<bean:write name="row" property="shipno"/>"
						        ,shipno_seq : "<bean:write name="row" property="shipno_seq"/>"
						        ,so_no : "<bean:write name="row" property="so_no"/>"
						        ,wib_bk_no : "<bean:write name="row" property="wib_bk_no"/>"
						        ,sao_sys_no : "<bean:write name="row" property="sao_sys_no"/>"
						        ,po_sys_no : "<bean:write name="row" property="po_sys_no"/>"
						        ,item_sys_no : "<bean:write name="row" property="item_sys_no"/>"
						        ,wh_loc_cd : "<bean:write name="row" property="wh_loc_cd"/>"
						        ,item_seq : "<bean:write name="row" property="item_seq"/>"
						        ,sao_no : "<bean:write name="row" property="sao_no"/>"
						        ,po_no : "<bean:write name="row" property="po_no"/>"
						        ,lp_status : "<bean:write name="row" property="lp_status"/>"
						        ,lp_ship_ltno : "<bean:write name="row" property="lp_ship_ltno"/>"
						        ,lp_ship_seq_ltno : "<bean:write name="row" property="lp_ship_seq_ltno"/>"
						        ,lp_old_id : "<bean:write name="row" property="lp_old_id"/>"
						        ,lp_old_seq : "<bean:write name="row" property="lp_old_seq"/>"
						        ,lp_id : "<bean:write name="row" property="lp_id"/>"
						        ,lp_seq : "<bean:write name="row" property="lp_seq"/>"
						        ,eq_tp_cd : "<bean:write name="row" property="eq_tp_cd"/>"
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
