<%--
=========================================================
*@FileName   : ACC_INV_0032GS.jsp
*@FileTitle  : EXPENSE List
*@Description: EXPENSE List
*@author     : Chungrue - Cyberlogitec
*@version    : 1.0 - 2011/12/29
*@since      : 2011/12/29

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
				<bean:define id="strIdx" name="tmpMapVal" property="beginIdx"/>
				<% 
				boolean isBegin = true;
				int cnt = Integer.parseInt(strIdx.toString());
				%>
				<bean:define id="rowSet" name="EventResponse" property="listVal"/>
				<SHEET>
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
					<logic:iterate id="row" name="rowSet">
						<tr>
							<TD></TD>
							<TD></TD>
                            <TD><![CDATA[<bean:write name="row" property="inv_tp"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="post_dt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inv_dt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inv_due_dt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="reserve_field02" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="vnd_inv_no" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inv_no" filter="false"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="trdp_nm" filter="false"/>]]></TD>
                            <!--[CSR #6020] [StarCluster-Mex] 추가 요청/확인 사항 - G&A Invoice List : Tax 필드 추가-->
                            <TD><![CDATA[<bean:write name="row" property="duty_tax_amt"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="non_taxable_amt"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="taxable_amt"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="vat_amt"/>]]></TD>
                            <!-- #6881 - [STAR-MEX] G&A INVOICE LIST - WITHHOLDING AMOUNT COLUMN -->
                            <TD><![CDATA[<bean:write name="row" property="whd_amt"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="inv_sum_amt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pay_amt"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="last_pay_dt"/>]]></TD>
                           <!-- #5859 [StarCluster-Mex] Adding Paid Column --> 
                            <TD><![CDATA[<bean:write name="row" property="last_chk_no"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="bal_amt"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="over_due"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ofc_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="inv_aply_curr_cd" />]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="rgst_usrid" />]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="rgst_tms" />]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="modi_usrid" />]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="modi_tms" />]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="inv_modi_tms" />]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="inv_rmk" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inv_seq" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="trdp_cd" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="sell_buy_tp_cd" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="clt_cmpl_flg" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="bl_cnt_cd" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="trx_modi_tms" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="slip_no" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="bloked_by" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="issued_by" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="block_dt" />]]></TD>
							<%-- #1799 [PATENT] VOUCHER 양식 - Deposit/Payment for CHINA Account Slip [Form] --%>
							<TD><![CDATA[<bean:write name="row" property="vchr_no" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="vchr_tp_nm" />]]></TD>
							
							<TD></TD>
							<TD><![CDATA[<% if(isBegin){ isBegin = false; %><bean:write name="tmpMapVal" property="pagingTbl"/><%}%>]]></TD>
							<%-- OFVFOUR-7598 [StarCluster-Mex] Adding Total amount in G&A Invoice list --%>
							<TD><![CDATA[<bean:write name="row" property="inv_sum_tot_amt" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pay_tot_amt" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="bal_tot_amt" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="duty_tax_tot_amt" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="non_taxable_tot_amt" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="taxable_tot_amt" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="vat_tot_amt" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="whd_tot_amt" />]]></TD>
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
