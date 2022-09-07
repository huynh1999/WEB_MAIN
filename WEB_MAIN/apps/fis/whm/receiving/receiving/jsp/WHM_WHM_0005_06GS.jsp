
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
                            <itm_cd><![CDATA[<bean:write name="row" property="itm_cd"/>]]></itm_cd>
                            <cust_itm_id><![CDATA[<bean:write name="row" property="cust_itm_id"/>]]></cust_itm_id>
                            <itm_nm><![CDATA[<bean:write name="row" property="itm_nm"/>]]></itm_nm>
                            <itm_ut_cd><![CDATA[<bean:write name="row" property="itm_ut_cd"/>]]></itm_ut_cd>
                            <itm_inr_qty><![CDATA[<bean:write name="row" property="itm_inr_qty"/>]]></itm_inr_qty>
                            <itm_wgt><![CDATA[<bean:write name="row" property="itm_wgt"/>]]></itm_wgt>
                            <itm_wgt_lbs><![CDATA[<bean:write name="row" property="itm_wgt_lbs"/>]]></itm_wgt_lbs>
                            <itm_vol><![CDATA[<bean:write name="row" property="itm_vol"/>]]></itm_vol>
                            <itm_vol_cft><![CDATA[<bean:write name="row" property="itm_vol_cft"/>]]></itm_vol_cft>
                            <itm_len><![CDATA[<bean:write name="row" property="itm_len"/>]]></itm_len>
                            <itm_wdt><![CDATA[<bean:write name="row" property="itm_wdt"/>]]></itm_wdt>
                            <itm_hgt><![CDATA[<bean:write name="row" property="itm_hgt"/>]]></itm_hgt>
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
