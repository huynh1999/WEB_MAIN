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
				<bean:define id="tmpMapVal" name="EventResponse" property="mapVal"/>
				<% 
				boolean isBegin = true;
				%>
				<bean:define id="rowSet" name="EventResponse" property="listVal"/>
				<SHEET>
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
					<logic:iterate id="row" name="rowSet">
						<tr>
							<TD><![CDATA[<bean:write name="row" property="wib_in_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="wib_bk_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="po_sys_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="item_sys_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="item_seq"/>]]></TD>
							<TD></TD>
							<TD><![CDATA[<bean:write name="row" property="cust_ord_no"/>]]></TD>
							<TD><bean:write name="row" property="item_cd"/></TD>
							<TD><bean:write name="row" property="item_nm"/></TD>
							<TD><![CDATA[<bean:write name="row" property="inbound_loc_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rcv_snd_dmg_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inbound_lcs_plt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pkgunit"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pkgqty"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ea_qty"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="non_putaway_ea_qty"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="row_add"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="row_add_qty"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="row_del"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="putaway_wh_loc_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="putaway_wh_loc_prop_nm"/>]]></TD>
							<TD></TD>
							<TD><![CDATA[<bean:write name="row" property="putaway_lcs_plt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="putaway_pkgunit"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="putaway_pkgqty"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="putaway_ea_qty"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inbound_dt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="lot_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="putaway_cbm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="putaway_cbf"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="putaway_grs_kgs"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="putaway_grs_lbs"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="putaway_net_kgs"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="putaway_net_lbs"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ctrt_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ctrt_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ibflag"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="putaway_seq"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="putaway_cnt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="putaway_item_cnt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rcv_snd_dmg_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inbound_loc_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="fix_loc_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="putaway_wh_loc_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="edit_flag"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ob_cnt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="wh_cd"/>]]></TD>
							<TD></TD>
							<TD><![CDATA[<bean:write name="row" property="put_tp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="put_yn"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rcv_cbm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rcv_cbf"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rcv_grs_kgs"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rcv_grs_lbs"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rcv_net_kgs"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rcv_net_lbs"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pkg_lv1_qty"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pkg_lv1_unit_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pkg_lv2_qty"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pkg_lv2_unit_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pkg_lv3_qty"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pkg_lv3_unit_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pkg_lv4_qty"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pkg_lv4_unit_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="lv1_cbm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="lv1_cbf"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="lv1_grs_kgs"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="lv1_grs_lbs"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="lv1_net_kgs"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="lv1_net_lbs"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="supv_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="putaway_dt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="putaway_hm_fr"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="putaway_hm_to"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="msg_to_wk"/>]]></TD>
							<TD><![CDATA[<% if(isBegin){ isBegin = false; %><bean:write name="tmpMapVal" property="pagingTbl"/><%}%>]]></TD>
			            </tr>
					</logic:iterate>
					</DATA>
				</SHEET>
			</logic:notEmpty>
</logic:empty>
<%-- 오류발생 --%>
<logic:notEmpty name="com.clt.framework.core.comm.EXCEPTION_OBJECT">
	<ERROR>
		<MESSAGE><![CDATA[ <bean:message name="com.clt.framework.core.comm.EXCEPTION_OBJECT" property="message"/>]]> </MESSAGE>
	</ERROR>
</logic:notEmpty>
