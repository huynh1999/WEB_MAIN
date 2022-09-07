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
								<c_wib_in_no><![CDATA[<bean:write name="rowField" property="c_wib_in_no"/>]]></c_wib_in_no>
								<c_wib_bk_no><![CDATA[<bean:write name="rowField" property="c_wib_bk_no"/>]]></c_wib_bk_no>
								<wib_in_no><![CDATA[<bean:write name="rowField" property="wib_in_no"/>]]></wib_in_no>
								<wib_bk_no><![CDATA[<bean:write name="rowField" property="wib_bk_no"/>]]></wib_bk_no>
								<supv_nm><![CDATA[<bean:write name="rowField" property="supv_nm"/>]]></supv_nm>
								<inbound_dt><![CDATA[<bean:write name="rowField" property="inbound_dt"/>]]></inbound_dt>
								<inbound_hm><![CDATA[<bean:write name="rowField" property="inbound_hm"/>]]></inbound_hm>
								<putaway_hm_fr><![CDATA[<bean:write name="rowField" property="putaway_hm_fr"/>]]></putaway_hm_fr>
								<putaway_hm_to><![CDATA[<bean:write name="rowField" property="putaway_hm_to"/>]]></putaway_hm_to>
								<work_nm><![CDATA[<bean:write name="rowField" property="work_nm"/>]]></work_nm>
								<msg_to_wk><![CDATA[<bean:write name="rowField" property="msg_to_wk"/>]]></msg_to_wk>
								<wh_cd><![CDATA[<bean:write name="rowField" property="wh_cd"/>]]></wh_cd>
								<user_id><![CDATA[<bean:write name="rowField" property="user_id"/>]]></user_id>
								<org_cd><![CDATA[<bean:write name="rowField" property="org_cd"/>]]></org_cd>
								<form_mode><![CDATA[<bean:write name="rowField" property="form_mode"/>]]></form_mode>
								<rtncd><![CDATA[<bean:write name="rowField" property="rtncd"/>]]></rtncd>
								<rtnmsg><![CDATA[<bean:write name="rowField" property="rtnmsg"/>]]></rtnmsg>
							</logic:iterate>
						</DATA>
					</FIELD>
				</logic:notEmpty>
				
				<logic:notEmpty name="rowSet" property="sheet1">
 					<bean:define id="rowSetSheet1" name="rowSet" property="sheet1"/>
 					
 					<bean:size id="sheet1_size" name="rowSetSheet1"/>
 					
					<SHEET1>
						<DATA TOTAL="<bean:write name="sheet1_size" />">
						<logic:iterate id="rowSheet1" name="rowSetSheet1">
							<tr>
								<TD><bean:write name="rowSheet1" property="po_sys_no"/></TD>
								<TD><bean:write name="rowSheet1" property="item_sys_no"/></TD>
								<TD><bean:write name="rowSheet1" property="item_seq"/></TD>
								<TD></TD>
								<TD><bean:write name="rowSheet1" property="item_cd"/></TD>
								<TD><bean:write name="rowSheet1" property="item_nm"/></TD>
								<TD><bean:write name="rowSheet1" property="lot_id"/></TD>
								<TD><bean:write name="rowSheet1" property="inbound_dt"/></TD>
								<TD><bean:write name="rowSheet1" property="lot_no"/></TD>
								<TD><bean:write name="rowSheet1" property="inbound_loc_cd"/></TD>
								<TD><bean:write name="rowSheet1" property="inbound_loc_nm"/></TD>
								<TD><bean:write name="rowSheet1" property="rcv_snd_dmg_cd"/></TD>
								<TD><bean:write name="rowSheet1" property="rcv_snd_dmg_nm"/></TD>
								<TD><bean:write name="rowSheet1" property="pkgunit"/></TD>
								<TD><bean:write name="rowSheet1" property="pkgqty"/></TD>
								<TD><bean:write name="rowSheet1" property="ea_qty"/></TD>
								<TD><bean:write name="rowSheet1" property="non_putaway_ea_qty"/></TD>
								<TD><bean:write name="rowSheet1" property="putaway_wh_loc_cd"/></TD>
								<TD><bean:write name="rowSheet1" property="putaway_wh_loc_nm"/></TD>
								<TD><bean:write name="rowSheet1" property="putaway_wh_loc_prop_nm"/></TD>
								<TD><bean:write name="rowSheet1" property="putaway_pkgunit"/></TD>
								<TD><bean:write name="rowSheet1" property="putaway_pkgqty"/></TD>
								<TD><bean:write name="rowSheet1" property="putaway_ea_qty"/></TD>
								<TD><bean:write name="rowSheet1" property="putaway_cbm"/></TD>
								<TD><bean:write name="rowSheet1" property="putaway_cbf"/></TD>
								<TD><bean:write name="rowSheet1" property="putaway_grs_kgs"/></TD>
								<TD><bean:write name="rowSheet1" property="putaway_grs_lbs"/></TD>
								<TD><bean:write name="rowSheet1" property="putaway_net_kgs"/></TD>
								<TD><bean:write name="rowSheet1" property="putaway_net_lbs"/></TD>
								<TD></TD>
								<TD><bean:write name="rowSheet1" property="add_row"/></TD>
								<TD></TD>
								<TD></TD>
								<TD></TD>
								<TD><bean:write name="rowSheet1" property="ctrt_no"/></TD>
								<TD><bean:write name="rowSheet1" property="putaway_seq"/></TD>
								<TD><bean:write name="rowSheet1" property="edit_flag"/></TD>
								<TD><bean:write name="rowSheet1" property="ob_cnt"/></TD>
								<TD><bean:write name="rowSheet1" property="inv_chg_flg"/></TD>
								<TD><bean:write name="rowSheet1" property="call_flg"/></TD>
								<TD><bean:write name="rowSheet1" property="fix_loc_cd"/></TD>
								<TD><bean:write name="rowSheet1" property="fix_loc_nm"/></TD>
								<TD><bean:write name="rowSheet1" property="old_putaway_wh_loc_cd"/></TD>
								<TD><bean:write name="rowSheet1" property="old_putaway_ea_qty"/></TD>
								<TD><bean:write name="rowSheet1" property="old_inv_qty"/></TD>
								<TD><bean:write name="rowSheet1" property="put_tp_cd"/></TD>
								<TD><bean:write name="rowSheet1" property="wib_in_no"/></TD>
								<TD><bean:write name="rowSheet1" property="wh_cd"/></TD>
								<TD><bean:write name="rowSheet1" property="wh_nm"/></TD>
								<TD><bean:write name="rowSheet1" property="ctrt_no"/></TD>
								<TD><bean:write name="rowSheet1" property="ctrt_nm"/></TD>
								<TD><bean:write name="rowSheet1" property="pkg_lv1_qty"/></TD>
								<TD><bean:write name="rowSheet1" property="lv1_cbm"/></TD>
								<TD><bean:write name="rowSheet1" property="lv1_cbf"/></TD>
								<TD><bean:write name="rowSheet1" property="lv1_grs_kgs"/></TD>
								<TD><bean:write name="rowSheet1" property="lv1_grs_lbs"/></TD>
								<TD><bean:write name="rowSheet1" property="lv1_net_kgs"/></TD>
								<TD><bean:write name="rowSheet1" property="lv1_net_lbs"/></TD>
				            </tr>
						</logic:iterate>
						</DATA>
					</SHEET1>
				</logic:notEmpty>
			</logic:notEmpty>
</logic:empty>
<%-- 오류발생 --%>
<logic:notEmpty name="com.clt.framework.core.comm.EXCEPTION_OBJECT">
	<ERROR>
		<MESSAGE><![CDATA[ <bean:message name="com.clt.framework.core.comm.EXCEPTION_OBJECT" property="message"/>]]> </MESSAGE>
	</ERROR>
</logic:notEmpty>
