<%@ page contentType="text/xml; charset=UTF-8"%>
<%@page pageEncoding="UTF-8"%>
<%@include file="./../../../../../../syscommon/header/CLTGSHeader.jsp"%>
<%-- 정상처리 --%>
<logic:empty name="com.clt.framework.core.comm.EXCEPTION_OBJECT">

	<%-- 조회 결과가 있는 경우 --%>
		<logic:notEmpty name="EventResponse" property="listVal">
			<bean:define id="rowSet" name="EventResponse" property="listVal"/>
				<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
					<logic:iterate id="row" name="rowSet">
						<kit_no><![CDATA[<bean:write name="row" property="kit_no"/>]]></kit_no>
						<kit_wh_cd><![CDATA[<bean:write name="row" property="wh_cd" />]]></kit_wh_cd>
						<kit_ctrt_no><![CDATA[<bean:write name="row" property="ctrt_no"/>]]></kit_ctrt_no>
						<kit_ctrt_nm><![CDATA[<bean:write name="row" property="ctrt_nm"/>]]></kit_ctrt_nm>
						<kit_dt><![CDATA[<bean:write name="row" property="kit_dt"/>]]></kit_dt>
                        <kit_hm_fr><![CDATA[<bean:write name="row" property="kit_hm_fr"/>]]></kit_hm_fr>
                        <kit_hm_to><![CDATA[<bean:write name="row" property="kit_hm_to"/>]]></kit_hm_to>
                        <kit_item_cd><bean:write name="row" property="item_cd"/></kit_item_cd>
                        <kit_item_nm><![CDATA[<bean:write name="row" property="item_nm"/>]]></kit_item_nm>
                        <kit_item_grp_cd><![CDATA[<bean:write name="row" property="item_grp_cd"/>]]></kit_item_grp_cd>
                        <kit_item_ea_qty><![CDATA[<bean:write name="row" property="item_ea_qty"/>]]></kit_item_ea_qty>
                        <kit_wh_loc_nm><![CDATA[<bean:write name="row" property="kit_wh_loc_nm"/>]]></kit_wh_loc_nm>
                        <kit_wh_loc_cd><![CDATA[<bean:write name="row" property="kit_wh_loc_cd"/>]]></kit_wh_loc_cd>
                        <kit_lot_no><![CDATA[<bean:write name="row" property="lot_no"/>]]></kit_lot_no>
                        <kit_lot_id><![CDATA[<bean:write name="row" property="lot_id"/>]]></kit_lot_id>
                        <kit_exp_dt><![CDATA[<bean:write name="row" property="exp_dt"/>]]></kit_exp_dt>
                        <kit_lot_04><![CDATA[<bean:write name="row" property="lot_04"/>]]></kit_lot_04>
                        <kit_lot_05><![CDATA[<bean:write name="row" property="lot_05"/>]]></kit_lot_05>
                        <kit_ctrt_pic_nm><![CDATA[<bean:write name="row" property="ctrt_pic_nm"/>]]></kit_ctrt_pic_nm>
                        <kit_supv_nm><![CDATA[<bean:write name="row" property="supv_nm"/>]]></kit_supv_nm>
                        <kit_worker_nm><![CDATA[<bean:write name="row" property="worker_nm"/>]]></kit_worker_nm>
                        <kit_item_cbm><![CDATA[<bean:write name="row" property="item_cbm"/>]]></kit_item_cbm>
                        <kit_item_cbf><![CDATA[<bean:write name="row" property="item_cbf"/>]]></kit_item_cbf>
                        <kit_item_grs_kgs><![CDATA[<bean:write name="row" property="item_grs_kgs"/>]]></kit_item_grs_kgs>
                        <kit_item_grs_lbs><![CDATA[<bean:write name="row" property="item_grs_lbs"/>]]></kit_item_grs_lbs>
                        <kit_item_net_kgs><![CDATA[<bean:write name="row" property="item_net_kgs"/>]]></kit_item_net_kgs>
                        <kit_item_net_lbs><![CDATA[<bean:write name="row" property="item_net_lbs"/>]]></kit_item_net_lbs>
                        <kit_item_sys_no><![CDATA[<bean:write name="row" property="item_sys_no"/>]]></kit_item_sys_no>
                        <kit_rmk><![CDATA[<bean:write name="row" property="rmk"/>]]></kit_rmk>
					</logic:iterate>
				</DATA>
		</logic:notEmpty>
</logic:empty>
<%-- 오류발생 --%>
<logic:notEmpty name="com.clt.framework.core.comm.EXCEPTION_OBJECT">
	<ERROR>
		<MESSAGE><![CDATA[ <bean:message name="com.clt.framework.core.comm.EXCEPTION_OBJECT" property="message"/>]]> </MESSAGE>
	</ERROR>
</logic:notEmpty>
