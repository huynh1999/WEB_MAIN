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
						<wh_cd><![CDATA[<bean:write name="row" property="wh_cd"/>]]></wh_cd>
						<wh_nm><![CDATA[<bean:write name="row" property="wh_nm" />]]></wh_nm>
						<ctrt_no><![CDATA[<bean:write name="row" property="ctrt_no" />]]></ctrt_no>
						<ctrt_nm><![CDATA[<bean:write name="row" property="ctrt_nm"/>]]></ctrt_nm>
						<cycle_cnt_tp_cd><![CDATA[<bean:write name="row" property="cycle_cnt_tp_cd"/>]]></cycle_cnt_tp_cd>
						<cycle_cnt_tp_nm><![CDATA[<bean:write name="row" property="cycle_cnt_tp_nm"/>]]></cycle_cnt_tp_nm>
                        <worker_nm><![CDATA[<bean:write name="row" property="worker_nm"/>]]></worker_nm>
                        <cycle_cnt_dt><![CDATA[<bean:write name="row" property="cycle_cnt_dt"/>]]></cycle_cnt_dt>
                        <cycle_cnt_hm_fr><![CDATA[<bean:write name="row" property="cycle_cnt_hm_fr"/>]]></cycle_cnt_hm_fr>
                        <cycle_cnt_hm_to><![CDATA[<bean:write name="row" property="cycle_cnt_hm_to"/>]]></cycle_cnt_hm_to>
                        <rmk><![CDATA[<bean:write name="row" property="rmk"/>]]></rmk>
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
