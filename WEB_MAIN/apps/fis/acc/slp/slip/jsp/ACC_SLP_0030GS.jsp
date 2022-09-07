<%--
=========================================================
*@FileName   : ACC_SLP_0030GS.jsp
*@FileTitle  : Slip List
*@Description: Slip List
*@author     : Chungrue - Cyberlogitec
*@version    : 1.0 - 2011/11/28
*@since      : 2011/11/28

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
				<%
					int cnt = 0;
				%>
				<SHEET>
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
					<logic:iterate id="row" name="rowSet">
						<tr>
                            <TD></TD>
                            <TD><![CDATA[<bean:write name="row" property="clt_cmpl_flg" />]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="post_dt"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="dt_seq"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="inv_dt"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="slip_no" />]]></TD>
                            <TD><%=++cnt%></TD>                         
                            <TD><![CDATA[<bean:write name="row" property="com_tp" />]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="com_nm" filter="false"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="com_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="sls_usrid"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="sls_usrnm"/>]]></TD>
                            <!-- //#2166 [PATENT] JOURNAL LIST 화면 조정 -->                              
                            <TD><![CDATA[<bean:write name="row" property="curr_cd"/>]]></TD>                               
                            <TD><![CDATA[<bean:write name="row" property="g_debit"/>]]></TD>
						    <TD><![CDATA[<bean:write name="row" property="g_credit"/>]]></TD>
						    <TD><![CDATA[<bean:write name="row" property="rmk" filter="false"/>]]></TD>						    
						    <TD><![CDATA[<bean:write name="row" property="if_yn" />]]></TD>
						    <TD><![CDATA[<bean:write name="row" property="issued_by"/>]]></TD>
						    <TD><![CDATA[<bean:write name="row" property="p_ofc_cd"/>]]></TD>
						    <TD><![CDATA[<bean:write name="row" property="delt_flg"/>]]></TD>
						    
						    <!-- //#2166 [PATENT] JOURNAL LIST 화면 조정 -->
							<TD><![CDATA[<bean:write name="row" property="aud_flg" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="aud_usr_id" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="aud_dt" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="aud_flg" />]]></TD>
														    
						    <TD><![CDATA[<bean:write name="row" property="acct_slip_no" />]]></TD>
						    <TD><![CDATA[<bean:write name="row" property="acct_dt" />]]></TD>
						    <TD><![CDATA[<bean:write name="row" property="ref_no" />]]></TD>
						    <TD><![CDATA[<bean:write name="row" property="slip_2nd_tp" />]]></TD>
						    
						    <TD><![CDATA[<bean:write name="row" property="bloked_by" />]]></TD>
						    <TD><![CDATA[<bean:write name="row" property="issued_by" />]]></TD>
						    <TD><![CDATA[<bean:write name="row" property="block_dt" />]]></TD>
						    <%-- #1799 [PATENT] VOUCHER 양식 - Deposit/Payment for CHINA Account Slip [Form] --%>
							<TD><![CDATA[<bean:write name="row" property="vchr_no" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="vchr_tp_nm" />]]></TD>
							<!-- #2110 [PATENT] VOUCHER PRINT 버튼 추가, VOUCHER 양식 업데이트, VOUCHER NO 자동생성 -->
							<TD><![CDATA[<bean:write name="row" property="rgst_usrid" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="locl_usr_nm" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="aud_usr_name" />]]></TD>
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
