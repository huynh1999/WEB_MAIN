<%--
=========================================================
*Copyright(c) 2008 CyberLogitec. All Rights Reserved.
=========================================================
=========================================================
*@FileName   : SEE_BMD_0031GS.jsp
*@FileTitle  : Shipping Request할 HBL목록 조회
*@Description: 
*@author     : Kang,Jung-Gu - Cyberlogitec
*@version    : 
*@since      : 

*@Change history:
=========================================================
--%>
<%@ page contentType="text/xml; charset=UTF-8"%>
<%@page pageEncoding="UTF-8"%>
<%@include file="./../../../../../../syscommon/header/CLTGSHeader.jsp"%>
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
							<TD><![CDATA[<bean:write name="row" property="inv_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="trdp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="trdp_nm" filter="false"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="frgn_curr_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="frgn_sum_amt"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="locl_amt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inv_curr_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inv_amt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inv_vat_amt"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="inv_sum_amt"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="hbl_no"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="mbl_no"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="proc_dept_nm"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="proc_usrnm"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="inv_seq"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="buy_inv_no"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="inv_post_dt"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="ref_ofc_cd"/>]]></TD>
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
