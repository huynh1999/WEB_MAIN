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
					<FIELD>
						<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
							<logic:iterate id="row" name="rowSet">
								<adjust_no><![CDATA[<bean:write name="row" property="adjust_no"/>]]></adjust_no>
								<adjust_dt><![CDATA[<bean:write name="row" property="adjust_dt"/>]]></adjust_dt>
								<wib_bk_no><![CDATA[<bean:write name="row" property="wib_bk_no"/>]]></wib_bk_no>
								<inbound_dt><![CDATA[<bean:write name="row" property="inbound_dt"/>]]></inbound_dt>
								<wh_loc_cd><![CDATA[<bean:write name="row" property="wh_loc_cd"/>]]></wh_loc_cd>
								<wh_loc_nm><![CDATA[<bean:write name="row" property="wh_loc_nm"/>]]></wh_loc_nm>
								<item_cd><bean:write name="row" property="item_cd"/></item_cd>
								<item_nm><bean:write name="row" property="item_nm"/></item_nm>
								<lot_no><![CDATA[<bean:write name="row" property="lot_no"/>]]></lot_no>
								<lot_id><![CDATA[<bean:write name="row" property="lot_id"/>]]></lot_id>
								<reason_cd><![CDATA[<bean:write name="row" property="reason_cd"/>]]></reason_cd>
								<fr_ea_qty><![CDATA[<bean:write name="row" property="fr_ea_qty"/>]]></fr_ea_qty>
								<to_ea_qty><![CDATA[<bean:write name="row" property="to_ea_qty"/>]]></to_ea_qty>
								<wh_pic_nm><![CDATA[<bean:write name="row" property="wh_pic_nm"/>]]></wh_pic_nm>
								<owner_pic_nm><![CDATA[<bean:write name="row" property="owner_pic_nm"/>]]></owner_pic_nm>
								<rmk><![CDATA[<bean:write name="row" property="rmk"/>]]></rmk>
								
								
								<fr_cbm><![CDATA[<bean:write name="row" property="fr_cbm"/>]]></fr_cbm>
								<fr_cbf><![CDATA[<bean:write name="row" property="fr_cbf"/>]]></fr_cbf>
								<to_cbm><![CDATA[<bean:write name="row" property="to_cbm"/>]]></to_cbm>
								<to_cbf><![CDATA[<bean:write name="row" property="to_cbf"/>]]></to_cbf>
								<fr_grs_kgs><![CDATA[<bean:write name="row" property="fr_grs_kgs"/>]]></fr_grs_kgs>
								<fr_grs_lbs><![CDATA[<bean:write name="row" property="fr_grs_lbs"/>]]></fr_grs_lbs>
								<to_grs_kgs><![CDATA[<bean:write name="row" property="to_grs_kgs"/>]]></to_grs_kgs>
								<to_grs_lbs><![CDATA[<bean:write name="row" property="to_grs_lbs"/>]]></to_grs_lbs>
								<fr_net_kgs><![CDATA[<bean:write name="row" property="fr_net_kgs"/>]]></fr_net_kgs>
								<fr_net_lbs><![CDATA[<bean:write name="row" property="fr_net_lbs"/>]]></fr_net_lbs>
								<to_net_kgs><![CDATA[<bean:write name="row" property="to_net_kgs"/>]]></to_net_kgs>
								<to_net_lbs><![CDATA[<bean:write name="row" property="to_net_lbs"/>]]></to_net_lbs>
							</logic:iterate>
						</DATA>
					</FIELD>
			</logic:notEmpty>
</logic:empty>
<%-- 오류발생 --%>
<logic:notEmpty name="com.clt.framework.core.comm.EXCEPTION_OBJECT">
	<ERROR>
		<MESSAGE><![CDATA[ <bean:message name="com.clt.framework.core.comm.EXCEPTION_OBJECT" property="message"/>]]> </MESSAGE>
	</ERROR>
</logic:notEmpty>
