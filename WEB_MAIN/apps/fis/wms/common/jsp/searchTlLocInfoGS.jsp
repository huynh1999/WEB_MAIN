
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
							<loc_cd><![CDATA[<bean:write name="row" property="loc_cd"/>]]></cust_itm_id>
							<loc_nm><![CDATA[<bean:write name="row" property="loc_nm" />]]></cust_cd>
							<eng_addr><![CDATA[<bean:write name="row" property="eng_addr" />]]></cust_nm>
							<ctry_cd><![CDATA[<bean:write name="row" property="ctry_cd"/>]]></rgst_ofc_cd>
                            <loc_freedays><![CDATA[<bean:write name="row" property="loc_freedays"/>]]></itm_inr_qty>
                            <branch><![CDATA[<bean:write name="row" property="branch"/>]]></itm_wgt>
                            <cust_cd><![CDATA[<bean:write name="row" property="cust_cd"/>]]></itm_vol>
                            <priv_flg><![CDATA[<bean:write name="row" property="priv_flg"/>]]></itm_wdt>
                            
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
