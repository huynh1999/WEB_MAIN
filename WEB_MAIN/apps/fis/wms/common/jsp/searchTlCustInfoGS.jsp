
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
							<cust_cd><![CDATA[<bean:write name="row" property="cust_cd" />]]></cust_cd>
							<cust_nm><![CDATA[<bean:write name="row" property="cust_nm" />]]></cust_nm>
							<addr1><![CDATA[<bean:write name="row" property="addr1"/>]]></rgst_ofc_cd>
							<addr2><![CDATA[<bean:write name="row" property="addr2"/>]]></itm_cd>
							<addr3><![CDATA[<bean:write name="row" property="addr3"/>]]></itm_nm>
                            <addr4><![CDATA[<bean:write name="row" property="addr4"/>]]></itm_hts_cd>
                            <addr5><![CDATA[<bean:write name="row" property="addr5"/>]]></itm_ut_cd>
                            <tel><![CDATA[<bean:write name="row" property="tel"/>]]></itm_inr_qty>
                            <fax><![CDATA[<bean:write name="row" property="fax"/>]]></itm_wgt>
                            <org_flg><![CDATA[<bean:write name="row" property="org_flg"/>]]></itm_vol>
                            <cust_loc_nm><![CDATA[<bean:write name="row" property="cust_loc_nm"/>]]></itm_wdt>
                          
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
