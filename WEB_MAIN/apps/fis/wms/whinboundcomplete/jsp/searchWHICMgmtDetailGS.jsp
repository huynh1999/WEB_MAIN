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
							 <TD><![CDATA[<bean:write name="row" property="seq"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="wib_bk_no"/>]]></TD>
							 <TD><bean:write name="row" property="item_cd"/></TD>
							 <TD><bean:write name="row" property="item_nm"/></TD>
							 <TD><![CDATA[<bean:write name="row" property="inbound_dt"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="inbound_hm"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="lot_no"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="item_pkgunit"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="item_pkgqty"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="est_qty"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="rcv_sound_unit"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="rcv_sound_qty"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="rcv_sound_loc_nm"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="rcv_sound_loc_cd"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="rcv_damage_unit"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="rcv_damage_qty"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="rcv_damage_loc_nm"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="rcv_damage_loc_cd"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="in_item_ea_qty"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="in_item_pe_qty"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="os_item_ea_qty"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="unload_inbound_loc_nm"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="item_cbm"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="item_cbf"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="item_grs_kgs"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="item_grs_lbs"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="item_net_kgs"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="item_net_lbs"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="po_no"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="eq_tpsz_cd"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="eq_no"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="seal_no"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="exp_dt"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="lot_04"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="lot_05"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="rmk"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="ibflag"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="ctrt_no"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="po_sys_no"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="item_sys_no"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="item_seq"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="fix_lot_id"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="eq_tp_cd"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="unload_inbound_loc_cd"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="snd_ea_qty"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="dmg_ea_qty"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="pkg_lv1_qty"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="lv1_cbm"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="lv1_cbf"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="lv1_grs_kgs"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="lv1_grs_lbs"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="lv1_net_kgs"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="lv1_net_lbs"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="fix_loc_cd"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="fix_loc_cd_nm"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="pe_qty"/>]]></TD>
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
