<%--
=========================================================
*@FileName   : MonthlyStorageRptGS.jsp
*@FileTitle  : Monthly Storage Report
*@Description: 
*@author     : Vinh Vo - Dou
*@version    : 1.0 - 2015/07/18
*@since      : 2015/07/18

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
							<TD><bean:write name="row" property="item_cd"/></TD>
							<TD><bean:write name="row" property="item_nm"/></TD>
							<TD><![CDATA[<bean:write name="row" property="lot_id"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="stc_qty" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="out_qty" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inbound_dt" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="outbound_dt" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="str_fr_dt" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="str_to_dt" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="str_days" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ctrt_no" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ctrt_nm" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="wh_cd" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="wh_nm" />]]></TD>
							
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
