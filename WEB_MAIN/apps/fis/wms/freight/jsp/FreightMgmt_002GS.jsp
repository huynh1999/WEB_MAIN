<%--
=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : WarehouseLocPopup.jsp
*@FileTitle  : Location
*@author     : CLT
*@version    : 1.0
*@since      : 2014/10/21
=========================================================
--%>

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
							<TD></TD>
							<TD><![CDATA[<bean:write name="row" property="frt_br_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cust_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cust_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="accrual_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="internal_sts_cd"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="frt_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="frt_nm"/>]]></TD>
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
							<TD><![CDATA[<bean:write name="row" property="ttl_amt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pass_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inv_no"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="inv_ymd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inv_acct_usd_amt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="create_user"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="update_user"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="usd_amt"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="cust_org_yn"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="relay_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="relay_seq"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="relay_inv_flag"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="incls_vat_amt_flg"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="internal_exrate"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="frt_seq"/>]]></TD>
							<TD></TD>
							<TD></TD>
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