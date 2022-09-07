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
				<SHEET>
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
					<logic:iterate id="row" name="rowSet">
						<tr>
							<TD><bean:write name="row" property="seq"/></TD>
							<TD><bean:write name="row" property="wib_bk_no"/></TD>
							<TD><bean:write name="row" property="cust_ord_no"/></TD>
							<TD><bean:write name="row" property="est_in_dt"/></TD>
							<TD><bean:write name="row" property="bk_sts_nm"/></TD>
							<TD><bean:write name="row" property="ctrt_nm"/></TD>
							<TD><bean:write name="row" property="rn"/></TD>
							<TD><bean:write name="row" property="item_cd"/></TD>
							<TD><bean:write name="row" property="item_nm"/></TD>
							<TD><bean:write name="row" property="inbound_dt"/></TD>
							<TD><bean:write name="row" property="lot_no"/></TD>
							<TD><bean:write name="row" property="item_pkgunit"/></TD>
							<TD><bean:write name="row" property="item_pkgqty"/></TD>
							<TD><bean:write name="row" property="pkg_info"/></TD>
							<TD><bean:write name="row" property="item_ea_qty"/></TD>
							<TD><bean:write name="row" property="snd_pkgunit"/></TD>
							<TD><bean:write name="row" property="snd_pkgqty"/></TD>
							<TD><bean:write name="row" property="inbound_loc_nm"/></TD>
							<TD><bean:write name="row" property="dmg_pkgunit"/></TD>
							<TD><bean:write name="row" property="dmg_pkgqty"/></TD>
							<TD><bean:write name="row" property="dmg_loc_nm"/></TD>
							<TD><bean:write name="row" property="in_item_ea_qty"/></TD>
							<TD><bean:write name="row" property="in_item_pe_qty"/></TD>
							<TD><bean:write name="row" property="os_item_ea_qty"/></TD>
							<TD><bean:write name="row" property="inbound_loc_nm"/></TD>
							<TD><bean:write name="row" property="in_item_cbm"/></TD>
							<TD><bean:write name="row" property="in_item_cbf"/></TD>
							<TD><bean:write name="row" property="in_item_grs_kgs"/></TD>
							<TD><bean:write name="row" property="in_item_grs_lbs"/></TD>
							<TD><bean:write name="row" property="in_item_net_kgs"/></TD>
							<TD><bean:write name="row" property="in_item_net_lbs"/></TD>
							<TD><bean:write name="row" property="lot_id"/></TD>
							<TD><bean:write name="row" property="exp_dt"/></TD>
							<TD><bean:write name="row" property="lot_04"/></TD>
							<TD><bean:write name="row" property="lot_05"/></TD>
							<TD><bean:write name="row" property="ord_tp_nm"/></TD>
							<TD><bean:write name="row" property="wh_cd"/></TD>
							<TD><bean:write name="row" property="bk_sts_cd"/></TD>
			            </tr>
					</logic:iterate>
					</DATA>
				</SHEET>
			</logic:notEmpty>
</logic:empty>
<%-- 오류발생 --%>
<logic:notEmpty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
	<ERROR>
		<MESSAGE><![CDATA[ <bean:message name="com.clt.framework.core.comm.EXCEPTION_OBJECT      " property="message"/>]]> </MESSAGE>
	</ERROR>
</logic:notEmpty>
