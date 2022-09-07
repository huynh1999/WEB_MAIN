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
				<% boolean isBegin = true; %>
				<bean:define id="rowSet" name="EventResponse" property="listVal"/>
				<bean:define id="tmpMapVal" name="EventResponse" property="mapVal"/>
				<SHEET>
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
					<logic:iterate id="row" name="rowSet">
						<tr>
							<TD></TD>
							<TD><bean:write name="row" property="plan_no"/></TD>
							<TD><bean:write name="row" property="plan_dt"/></TD>
							<TD><bean:write name="row" property="plan_sts_cd_nm"/></TD>
							<TD><bean:write name="row" property="move_no"/></TD>
							<TD><bean:write name="row" property="move_dt"/></TD>
							<TD><bean:write name="row" property="rn"/></TD>
							<TD><bean:write name="row" property="item_cd"/></TD>
							<TD><bean:write name="row" property="item_nm"/></TD>
							<TD><bean:write name="row" property="lot_no"/></TD>
							<TD><bean:write name="row" property="lot_id"/></TD>
							<TD><bean:write name="row" property="item_ser_no"/></TD>
							<TD><bean:write name="row" property="lic_plat_no"/></TD>
							<TD><bean:write name="row" property="fr_type"/></TD>
							<TD><bean:write name="row" property="fr_wh_loc_cd_nm"/></TD>
							<TD><bean:write name="row" property="fr_ea_qty"/></TD>
							<TD><bean:write name="row" property="fr_cbm"/></TD>
							<TD><bean:write name="row" property="fr_cbf"/></TD>
							<TD><bean:write name="row" property="fr_grs_kgs"/></TD>
							<TD><bean:write name="row" property="fr_grs_lbs"/></TD>
							<TD><bean:write name="row" property="fr_net_kgs"/></TD>
							<TD><bean:write name="row" property="fr_net_lbs"/></TD>
							<TD><bean:write name="row" property="to_type"/></TD>
							<TD><bean:write name="row" property="to_wh_loc_cd_nm"/></TD>
							<TD><bean:write name="row" property="to_ea_qty"/></TD>
							<TD><bean:write name="row" property="to_cbm"/></TD>
							<TD><bean:write name="row" property="to_cbf"/></TD>
							<TD><bean:write name="row" property="to_grs_kgs"/></TD>
							<TD><bean:write name="row" property="to_grs_lbs"/></TD>
							<TD><bean:write name="row" property="to_net_kgs"/></TD>
							<TD><bean:write name="row" property="to_net_lbs"/></TD>
							<TD></TD>
							<TD><bean:write name="row" property="rmk"/></TD>
							<TD></TD>
							<TD></TD>
							<TD><bean:write name="row" property="inbound_dt"/></TD>
							<TD><bean:write name="row" property="wib_bk_no"/></TD>
							<TD><bean:write name="row" property="cust_ord_no"/></TD>
							<TD><bean:write name="row" property="ctrt_no"/></TD>
							<TD><bean:write name="row" property="ctrt_nm"/></TD>
							<TD><bean:write name="row" property="wh_cd"/></TD>
							<TD></TD>
							<TD><bean:write name="row" property="move_seq"/></TD>
							<TD><bean:write name="row" property="file_seq"/></TD>
							<TD><bean:write name="row" property="file_path"/></TD>
							<TD><bean:write name="row" property="file_sys_nm"/></TD>
							<TD><bean:write name="row" property="file_org_nm"/></TD>
							<TD><bean:write name="row" property="file_size"/></TD>
							<TD><bean:write name="row" property="wh_nm"/></TD>
							<TD><bean:write name="row" property="mv_tp_cd"/></TD>
							<TD><![CDATA[<% if(isBegin){ isBegin = false; %><bean:write name="tmpMapVal" property="pagingTbl"/><%}%>]]></TD>
			            </tr>
					</logic:iterate>
					</DATA>
				</SHEET>
			</logic:notEmpty>
</logic:empty>
<%-- 오류발생 --%>
<logic:notEmpty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
	<ERROR>
		<MESSAGE><![CDATA[ <bean:message name="com.clt.framework.core.comm.EXCEPTION_OBJECT" property="message"/>]]> </MESSAGE>
	</ERROR>
</logic:notEmpty>
