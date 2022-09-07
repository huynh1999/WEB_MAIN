<%@ page contentType="text/xml; charset=UTF-8"%>
<%@page pageEncoding="UTF-8"%>
<%@include file="./../../../../../../syscommon/header/CLTGSHeader.jsp"%>
<%-- 정상처리 --%>
<logic:empty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
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
							 <TD></TD>
							 <TD><![CDATA[<bean:write name="row" property="unload_sht"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="ctrt_no"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="ctrt_nm"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="wib_bk_no"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="ord_tp_nm"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="bk_date"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="est_in_dt"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="bk_status"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="os"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="latest_inbound_day"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="latest_inbound_time"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="load_tp_cd_nm"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="wh_cd"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="ibflag"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="unload_sht_yn"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="wh_nm"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="loc_freedays"/>]]></TD>
			            </tr>
					</logic:iterate>
					</DATA>
				</SHEET>
			</logic:notEmpty>
</logic:empty>
<%-- 오류발생 --%>
<logic:notEmpty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
	<ERROR>
		<MESSAGE><![CDATA[ <bean:message name="com.clt.framework.core.comm.EXCEPTION_OBJECT      " property="message"/>]]> </MESSAGE>
	</ERROR>
</logic:notEmpty>
