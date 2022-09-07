<%--
=========================================================
*@FileName   : ACC_INV_0020GS.jsp
*@FileTitle  : Invoice List
*@Description: Invoice List
*@author     : Kang,Jung-Gu - Cyberlogitec
*@version    : 1.0 - 03/05/2009
*@since      : 03/05/2009

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
							<TD></TD>
							<TD></TD> 
							<TD><![CDATA[<bean:write name="row" property="cmb_inv_seq"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inv_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="trdp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="trdp_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inv_aply_curr_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="inv_sum_amt"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="wfg_amt"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="pay_amt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="bal_amt"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="buy_inv_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inv_dt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="clt_due_dt"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="inv_sts_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="inv_sts_nm"/>]]></TD>
							<TD IMAGE="0"></TD>
							<TD IMAGE="1"></TD>
                            <TD><![CDATA[<bean:write name="row" property="slip_no"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="inv_to_dt"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="proc_dept_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="proc_usrid"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ofc_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="sell_buy_tp_cd"/>]]></TD>
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
