<%--
=========================================================
*@FileName   : ACC_INV_0100GS.jsp
*@FileTitle  : Journal History
*@Description: Journal History
*@author     : Chungrue - Cyberlogitec
*@version    : 1.0 - 2012/02/17
*@since      : 2012/02/17

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
				<SHEET>
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
					<logic:iterate id="row" name="rowSet">
						<tr>
							<TD><![CDATA[<bean:write name="row" property="jnr_tp" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ttl_pay_amt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="chk_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="post_dt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="curr_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="bill_to_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="bill_to_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inv_sum_amt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pay_amt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="bal_amt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="clr_dt"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="bank_seq"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="bank_nm" filter="false"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="rmk" filter="false"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="void_dt" filter="false"/>]]></TD>
                            <TD></TD>
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
