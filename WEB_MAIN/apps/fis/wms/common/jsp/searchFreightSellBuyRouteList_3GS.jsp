<%@ page contentType="text/xml; charset=UTF-8"%>
<%@page pageEncoding="UTF-8"%>
<%@include file="./../../../../../../syscommon/header/CLTGSHeader.jsp"%>
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
						   <TD></TD>
						    <TD><![CDATA[<bean:write name="row" property="frt_mode_nm"/>]]></TD>
						    <TD><![CDATA[<bean:write name="row" property="rate_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="priority"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="por"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="por_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pol"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pol_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pod"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pod_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="del"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="del_nm"/>]]></TD>
						    <TD><![CDATA[<bean:write name="row" property="svcterm_fr_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="svcterm_to_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="departure_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="departure_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="arrival_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="arrival_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="origin_loc_nm"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="dest_loc_nm"/>]]></TD>
						    <TD><![CDATA[<bean:write name="row" property="loc_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="commodity_desc"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="co_loader_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="carrier_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="sc_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="bullet_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="named_acct_flg"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="eff_fr_dt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="eff_to_dt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ctrt_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="frt_mode"/>]]></TD>
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
		<MESSAGE><![CDATA[ <bean:message name="com.clt.framework.core.comm.EXCEPTION_OBJECT" property="message"/>]]> </MESSAGE>
	</ERROR>
</logic:notEmpty>
