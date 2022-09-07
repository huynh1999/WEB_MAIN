<%--
=========================================================
*@FileName   : EQU_INV_0010GS.jsp
*@FileTitle  : Invoice Creation
*@Description: Invoice Creation
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
							<TD>U</TD>
							<TD></TD>
							<TD><%=loopNum++%></TD>
							<TD><![CDATA[<bean:write name="row" property="bkg_no"/>]]></TD>
							<TD><bean:write name="row" property="lr_trdp_nm"/></TD>
							<TD><![CDATA[<bean:write name="row" property="cntr_tpsz_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="unit_prc"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="qty"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="amt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inv_vat_amt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pkup_nod_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cy_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cy_pkup_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="splr_pic"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="splr_tel_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inv_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="xch_rt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="vat_rt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="tot_bkg_no"/>]]></TD>
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
