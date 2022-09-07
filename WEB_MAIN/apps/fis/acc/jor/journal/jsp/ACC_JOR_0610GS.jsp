<%--
=========================================================
*@FileName   : ACC_JOR_0610.jsp
*@FileTitle  : Payment History Level 2
*@Description: Payment History
*@author     : wyjoung - Cyberlogitec
*@version    : 1.0 - 2014/04/10
*@since      : 2014/04/10

*@Change history:  
*@author     : Tuan.Chau
*@version    : 2.0 - 2014/07/25
*@since      : 2014/07/25
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
						    <TD><![CDATA[<bean:write name="row" property="jnr_no" filter="false"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="post_dt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="jnr_tp" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="bank_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="p_ofc_cd" filter="false"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="trdp_nm" filter="false"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="chk_no" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="amt"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="curr_cd" filter="false"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="clr_dt"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="void_dt"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="tax_no"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="inv_aply_curr_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="inv_no" filter="false"/>]]></TD>
						    <TD><![CDATA[<bean:write name="row" property="inv_post_dt"/>]]></TD>
						    <TD><![CDATA[<bean:write name="row" property="inv_dt"/>]]></TD>
						    <TD><![CDATA[<bean:write name="row" property="inv_due_dt"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="ofc_cd" filter="false"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="inv_tp" filter="false"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="inv_sum_amt"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="pay_amt"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="bal_sum_amt"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="gl_no" filter="false"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="gl_nm" filter="false"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="jnr_desc" filter="false"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="sub_total_amt"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="sub_total_amt"/>]]></TD>
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
		<MESSAGE> <bean:message name="com.clt.framework.core.comm.EXCEPTION_OBJECT      " property="message"/> </MESSAGE>
	</ERROR>
</logic:notEmpty>
