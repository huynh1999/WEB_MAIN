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
							 <TD><![CDATA[<bean:write name="row" property="oth_cost_no"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="sb_cls_cd"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="trans_dt"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="sts_cd"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="cls_dt"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="cls_no"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="bk_no"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="ofc_cd"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="ctrt_no"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="ctrt_nm"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="cust_cd"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="cust_nm"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="frt_cd"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="frt_nm"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="unit_cd"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="ea_qty"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="curr_cd"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="rate"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="amt"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="rmk"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="order_rel"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="eq_tpsz_cd"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="eq_no"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="seal_no"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="wh_cd"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="wh_nm"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="rgst_id"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="rgst_loc_dt"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="modi_id"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="modi_loc_dt"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="ibflag"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="bk_cls_cd"/>]]></TD>
							 <TD><![CDATA[<bean:write name="row" property="eq_tp_cd"/>]]></TD>
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
