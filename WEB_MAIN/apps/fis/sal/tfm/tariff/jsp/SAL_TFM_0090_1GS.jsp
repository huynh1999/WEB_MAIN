<%--
=========================================================
*@FileName   : SAL_TFM_0080_1GS.jsp
*@FileTitle  : Rate Mgmt His
*@Description: Rate Mgmt His
*@author     :
*@version    : 1.0 - 05/29/2017
*@since      :

*@Change history:
=========================================================
--%>
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
				<bean:define id="tmpMapVal" name="EventResponse" property="mapVal"/>
				<bean:define id="rowSet" name="EventResponse" property="listVal"/>
				<SHEET>
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
					<logic:iterate id="row" name="rowSet">
						<tr>
							<TD></TD>
							<TD></TD>
							<TD><![CDATA[<bean:write name="row" property="rt_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rt_no_sub_seq"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rt_ofc_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cust_vndr_tp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cust_vndr_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cust_vndr_cd_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="bil_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="bil_cd_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="aply_ut_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cntr_tpsz_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="curr_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="dtl_eff_fm_dt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="dtl_eff_to_dt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inc_bil_flg"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rmk"/>]]></TD>
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
