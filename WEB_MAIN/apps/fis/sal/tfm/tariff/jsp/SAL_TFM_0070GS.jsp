<%--
=========================================================
*@FileName   : EQU_MST_0010GS.jsp
*@FileTitle  : Equipment Agreement
*@Description: Equipment Agreement
*@author     : Daesoo Kang - Cyberlogitec
*@version    : 1.0 - 10/15/2009
*@since      : 10/15/2009

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
				<bean:define id="rowSet" name="EventResponse" property="listVal"/>
				<% int loopNum = 1;%>
				<SHEET>
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
					<logic:iterate id="row" name="rowSet">
						<tr>
							<TD></TD>
							<TD><![CDATA[<bean:write name="row" property="type"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="iata_code"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="iata_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="dep_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="dep_cd_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="dest_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="dest_cd_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="trf_seq"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rnk_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cmdt_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="chg_wgt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="crr_rt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="frt_amt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="avg_rt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="avg_amt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cre_usr_id"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cre_dt"/>]]></TD>
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
