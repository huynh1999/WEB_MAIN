
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
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
						<logic:iterate id="row" name="rowSet">
                            <file_no><![CDATA[<bean:write name="row" property="file_no"/>]]></file_no>
                            <rgst_ofc_cd><![CDATA[<bean:write name="row" property="rgst_ofc_cd"/>]]></rgst_ofc_cd>
							<wh_cd><![CDATA[<bean:write name="row" property="wh_cd"/>]]></wh_cd>
							<wh_nm><![CDATA[<bean:write name="row" property="wh_nm"/>]]></wh_nm>
							<rcv_shp_tp_cd><![CDATA[<bean:write name="row" property="rcv_shp_tp_cd"/>]]></rcv_shp_tp_cd>
							<cust_cd><![CDATA[<bean:write name="row" property="cust_cd"/>]]></cust_cd>
							<cust_nm><![CDATA[<bean:write name="row" property="cust_nm"/>]]></cust_nm>
                            <splr_rcvr_cd><![CDATA[<bean:write name="row" property="splr_rcvr_cd"/>]]></splr_rcvr_cd>
                            <splr_rcvr_nm><![CDATA[<bean:write name="row" property="splr_rcvr_nm"/>]]></splr_rcvr_nm>
                            <trkr_cd><![CDATA[<bean:write name="row" property="trkr_cd"/>]]></trkr_cd>
                            <trkr_nm><![CDATA[<bean:write name="row" property="trkr_nm"/>]]></trkr_nm>
							<cust_ref_no><![CDATA[<bean:write name="row" property="cust_ref_no"/>]]></cust_ref_no>
                            <inter_rmk><![CDATA[<bean:write name="row" property="inter_rmk"/>]]></inter_rmk>
                            <xter_rmk><![CDATA[<bean:write name="row" property="xter_rmk"/>]]></xter_rmk>
                            <rcv_shp_flg><![CDATA[<bean:write name="row" property="rcv_shp_flg"/>]]></rcv_shp_flg>
                            <opr_cd><![CDATA[<bean:write name="row" property="opr_cd"/>]]></opr_cd>
                            <opr_nm><![CDATA[<bean:write name="row" property="opr_nm"/>]]></opr_nm>
						    <estm_rcv_dt><![CDATA[<bean:write name="row" property="estm_rcv_dt"/>]]></estm_rcv_dt>							
                            <rcv_shp_dt><![CDATA[<bean:write name="row" property="rcv_shp_dt"/>]]></rcv_shp_dt>
                            <plt_no><![CDATA[<bean:write name="row" property="plt_no"/>]]></plt_no>
                            <cntr_no><![CDATA[<bean:write name="row" property="cntr_no"/>]]></cntr_no>
                            <mst_bl_no><![CDATA[<bean:write name="row" property="mst_bl_no"/>]]></mst_bl_no>
                            <hus_bl_no><![CDATA[<bean:write name="row" property="hus_bl_no"/>]]></hus_bl_no>
                            <cust_ofc_cd><![CDATA[<bean:write name="row" property="cust_ofc_cd"/>]]></cust_ofc_cd>
                            <splr_rcvr_ofc_cd><![CDATA[<bean:write name="row" property="splr_rcvr_ofc_cd"/>]]></splr_rcvr_ofc_cd>
                            <trkr_ofc_cd><![CDATA[<bean:write name="row" property="trkr_ofc_cd"/>]]></trkr_ofc_cd>
                            <opr_ofc_cd><![CDATA[<bean:write name="row" property="opr_ofc_cd"/>]]></opr_ofc_cd>
                            <len_ut_cd><![CDATA[<bean:write name="row" property="len_ut_cd"/>]]></len_ut_cd>
                            <ctrt_no><![CDATA[<bean:write name="row" property="ctrt_no"/>]]></ctrt_no>
                            <ctrt_nm><![CDATA[<bean:write name="row" property="ctrt_nm"/>]]></ctrt_nm>
                            <cre_dt><![CDATA[<bean:write name="row" property="cre_dt"/>]]></cre_dt>
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
