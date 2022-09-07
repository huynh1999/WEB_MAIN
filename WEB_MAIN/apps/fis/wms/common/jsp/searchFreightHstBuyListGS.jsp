<%@page contentType = "text/xml; charset=UTF-8"%>
<%@page pageEncoding = "UTF-8"%>
<%@include file = "./../../../../../../syscommon/header/CLTGSHeader.jsp"%>
<%-- 정상처리 --%>
<logic:empty name="com.clt.framework.core.comm.EXCEPTION_OBJECT">
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
							<TD><![CDATA[<bean:write name="row" property="hst_seq"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="hst_tp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="update_user"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="update_time"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="frt_seq"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cust_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cust_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="frt_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="frt_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="accrual_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="curr_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="exrate"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="unit_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="unit_qty"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="unit_price"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="amt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="loc_amt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="val_cls_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="vat_amt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="curr_vat_amt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="internal_sts_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ttl_amt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="sb_cls_cd"/>]]></TD>
			            </tr>
					</logic:iterate>
					</DATA>
				</SHEET>
			</logic:notEmpty>
</logic:empty>
<%-- 오류발생 --%>
<logic:notEmpty name="com.clt.framework.core.comm.EXCEPTION_OBJECT">
	<ERROR>
		<MESSAGE><![CDATA[ <bean:message name="com.clt.framework.core.comm.EXCEPTION_OBJECT" property = "message"/>]]> </MESSAGE>
	</ERROR>
</logic:notEmpty>
