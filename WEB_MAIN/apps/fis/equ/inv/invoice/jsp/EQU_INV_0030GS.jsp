<%--
=========================================================
*@FileName   : EQU_INV_0030GS.jsp
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
							<TD></TD>
							<TD></TD>
							<TD><%=loopNum++%></TD>
							<TD><![CDATA[<bean:write name="row" property="bil_dt"/>]]></TD>      
							<TD><![CDATA[<bean:write name="row" property="rgst_tms"/>]]></TD>      
							<TD><![CDATA[<bean:write name="row" property="due_dt"/>]]></TD>      
							<TD><bean:write name="row" property="lr_trdp_nm"/></TD>  
							<TD><![CDATA[<bean:write name="row" property="inv_no"/>]]></TD>      
							<TD><![CDATA[<bean:write name="row" property="bkg_no"/>]]></TD>      
							<TD><![CDATA[<bean:write name="row" property="pol_nm"/>]]></TD>      
							<TD><![CDATA[<bean:write name="row" property="curr_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inv_ttl_amt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pay_amt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="bal_amt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ref_no"/>]]></TD>      
							<TD><![CDATA[<bean:write name="row" property="inv_sts_cd"/>]]></TD>  
							<TD><![CDATA[<bean:write name="row" property="equ_sts_cd"/>]]></TD>  
							<TD IMAGE="0"><![CDATA[<bean:write name="row" property="inv_prt"/>]]></TD>
                            <TD IMAGE="1"><![CDATA[<bean:write name="row" property="inv_cancel"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="slip_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="xch_rt_dt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="buy_dt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rgst_usrid"/>]]></TD>
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
