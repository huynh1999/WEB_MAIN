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
								String prefix = "Grd01";
						%>
						{data:[
						      <logic:iterate id="row" name="rowSet" >
						       <%cnt++;%>
						       {
						         Grd01chk : ""
						        ,Level : "<bean:write name="row" property="tree_nodetype"/>"
						        ,Grd01tree_nodetype : "<bean:write name="row" property="tree_nodetype"/>"
						        ,Grd01tree_value : "<bean:write name="row" property="tree_value"/>"
						        ,Grd01tree_name : "<bean:write name="row" property="tree_name"/>"
						        ,Grd01lp_sts_cd : "<bean:write name="row" property="lp_sts_cd"/>"
						        ,Grd01bk_date : "<bean:write name="row" property="bk_date"/>"
						        ,Grd01ord_item_qty : "<bean:write name="row" property="ord_item_qty"/>"
						        ,Grd01lp_item_ea_qty : "<bean:write name="row" property="lp_item_ea_qty"/>"
						        ,Grd01lp_item_cbm : "<bean:write name="row" property="lp_item_cbm"/>"
						        ,Grd01lp_item_grs_kgs : "<bean:write name="row" property="lp_item_grs_kgs"/>"
						        ,Grd01lp_item_net_kgs : "<bean:write name="row" property="lp_item_net_kgs"/>"
						        ,Grd01cust_ord_no : "<bean:write name="row" property="cust_ord_no"/>"
						        ,Grd01est_out_dt : "<bean:write name="row" property="est_out_dt"/>"
						        ,Grd01ctrt_no : "<bean:write name="row" property="ctrt_no"/>"
						        ,Grd01wh_cd : "<bean:write name="row" property="wh_cd"/>"
						        ,Grd01wh_nm : "<bean:write name="row" property="wh_nm"/>"
						        ,Grd01shipno : "<bean:write name="row" property="shipno"/>"
						        ,Grd01shipno_seq : "<bean:write name="row" property="shipno_seq"/>"
						        ,Grd01so_no : "<bean:write name="row" property="so_no"/>"
						        ,Grd01wob_bk_no : "<bean:write name="row" property="wob_bk_no"/>"
						        ,Grd01wib_bk_no : "<bean:write name="row" property="wib_bk_no"/>"
						        ,Grd01sao_sys_no : "<bean:write name="row" property="sao_sys_no"/>"
						        ,Grd01po_sys_no : "<bean:write name="row" property="po_sys_no"/>"
						        ,Grd01item_sys_no : "<bean:write name="row" property="item_sys_no"/>"
						        ,Grd01lot_id : "<bean:write name="row" property="lot_id"/>"
						        ,Grd01wh_loc_cd : "<bean:write name="row" property="wh_loc_cd"/>"
						        ,Grd01item_seq : "<bean:write name="row" property="item_seq"/>"
						        ,Grd01sao_no : "<bean:write name="row" property="sao_no"/>"
						        ,Grd01po_no : "<bean:write name="row" property="po_no"/>"
						        ,Grd01item_cd : "<bean:write name="row" property="item_cd"/>"
						        ,Grd01item_nm : "<bean:write name="row" property="item_nm"/>"
						        ,Grd01lp_item_cbf : "<bean:write name="row" property="lp_item_cbf"/>"
						        ,Grd01lp_item_grs_lbs : "<bean:write name="row" property="lp_item_grs_lbs"/>"
						        ,Grd01lp_item_net_lbs : "<bean:write name="row" property="lp_item_net_lbs"/>"
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
