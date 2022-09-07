
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
                            <frt_doc_no><![CDATA[<bean:write name="row" property="frt_doc_no"/>]]></frt_doc_no>
                            <frt_br_cd><![CDATA[<bean:write name="row" property="frt_br_cd"/>]]></frt_br_cd>
							<sell_exrate_dt><![CDATA[<bean:write name="row" property="sell_exrate_dt"/>]]></sell_exrate_dt>
							<sell_curr_cd><![CDATA[<bean:write name="row" property="sell_curr_cd"/>]]></sell_curr_cd>
							<sell_exrate><![CDATA[<bean:write name="row" property="sell_exrate"/>]]></sell_exrate>
							<sell_usd_conv_rate><![CDATA[<bean:write name="row" property="sell_usd_conv_rate"/>]]></sell_usd_conv_rate>
                            <buy_exrate_dt><![CDATA[<bean:write name="row" property="buy_exrate_dt"/>]]></buy_exrate_dt>
                            
                            <buy_curr_cd><![CDATA[<bean:write name="row" property="buy_curr_cd"/>]]></buy_curr_cd>
                            <buy_exrate><![CDATA[<bean:write name="row" property="buy_exrate"/>]]></buy_exrate>
                            <buy_usd_conv_rate><![CDATA[<bean:write name="row" property="buy_usd_conv_rate"/>]]></buy_usd_conv_rate>
							<sell_exrate_cls_cd><![CDATA[<bean:write name="row" property="sell_exrate_cls_cd"/>]]></sell_exrate_cls_cd>
                            <buy_exrate_cls_cd><![CDATA[<bean:write name="row" property="buy_exrate_cls_cd"/>]]></buy_exrate_cls_cd>
                            <sell_cust_cd><![CDATA[<bean:write name="row" property="sell_cust_cd"/>]]></sell_cust_cd>
                            <sell_cust_nm><![CDATA[<bean:write name="row" property="sell_cust_nm"/>]]></sell_cust_nm>
                            
                            <buy_cust_cd><![CDATA[<bean:write name="row" property="buy_cust_cd"/>]]></buy_cust_cd>
                            <buy_cust_nm><![CDATA[<bean:write name="row" property="buy_cust_nm"/>]]></buy_cust_nm>
						    <ca_no><![CDATA[<bean:write name="row" property="ca_no"/>]]></ca_no>							
                            <ca_status_nm><![CDATA[<bean:write name="row" property="ca_status_nm"/>]]></ca_status_nm>
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
