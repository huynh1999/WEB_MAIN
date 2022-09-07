<%--
=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
=========================================================

=========================================================
*@FileName   : WHM_WHM_0003.jsp
*@FileTitle  : Item Entry 
*@Description: 
*@author     : Tin.Luong - DOU NetWorks
*@version    : 1.0 - 2014/12/20
*@since      : 2014/12/20

*@Change history:
=========================================================
--%>
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
				<SHEET>
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
					<logic:iterate id="row" name="rowSet">
						<tr>
							<TD><![CDATA[<bean:write name="row" property="cust_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="itm_cd" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cust_itm_id"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="itm_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="itm_hts_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="itm_ut_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="itm_inr_qty"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="itm_wgt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="itm_wgt_lbs"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="itm_wdt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="itm_wdt_inch"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="itm_hgt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="itm_hgt_inch"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="itm_len"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="itm_len_inch"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="itm_vol"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="itm_vol_cft"/>]]></TD>
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
