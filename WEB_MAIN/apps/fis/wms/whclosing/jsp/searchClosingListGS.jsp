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
							 <TD><![CDATA[<bean:write name="row" property="seq"/>]]></TD>
							 <TD></TD>
							 <TD></TD>
							 <TD><![CDATA[<bean:write name="row" property="cls_no"/>]]></TD>
							  <TD><![CDATA[<bean:write name="row" property="set_fr_dt"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="set_to_dt"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="ctrt_no"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="ctrt_nm"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="cust_cd"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="cust_nm"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="sell_buy_tp_cd"/>]]></TD> <!-- #1069 Closing other entry  -->
							 <TD><![CDATA[<bean:write name="row" property="rate_tp_cd"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="sts_cd"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="ref_no"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="inv_no"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="curr_cd"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="inv_ttl_amt"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="wh_cd"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="f_remark"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="wm_doc_seq"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="inv_seq"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="ofc_cd"/>]]></TD>
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
