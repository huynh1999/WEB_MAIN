<%--
=========================================================
*@FileName   : ACC_INV_0020GS.jsp
*@FileTitle  : CR/DB NOTE
*@Description: CR/DB NOTE
*@author     : Chungrue - Cyberlogitec
*@version    : 1.0 - 2011/11/14
*@since      : 2011/11/14

*@Change history:
=========================================================
--%>
<%@ page contentType="text/xml; charset=UTF-8"%>
<%@page pageEncoding="UTF-8"%>
<%@include file="./../../../../../../syscommon/header/CLTGSHeader.jsp"%>
<%-- 정상처리 --%>

<%
	String multiCurrFlag = (String)application.getAttribute("MULTI_CURR_FLAG");
%>	

<%
	if("Y".equals(multiCurrFlag)){	//Multi Currency
%>		
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
                            <TD><![CDATA[<bean:write name="row" property="frt_seq"/>]]></TD>
                            <TD></TD>
                            <TD><![CDATA[<bean:write name="row" property="intg_bl_seq_2"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="frt_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="frt_cd_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="trdp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="trdp_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="sell_buy_tp_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="frt_term_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="aply_ut_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="cntr_tpsz_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="rat_curr_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="ru"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="qty"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="agent_ru"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="trf_cur_sum_amt"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="inv_curr_cd" />]]></TD>
                            <%
                            	//<TD><![CDATA[<bean:write name="row" property="inv_aply_curr_cd" />]]></TD>
                            %>
                            <TD><![CDATA[<bean:write name="row" property="inv_xcrt_dt"/>]]></TD>							
                            <TD><![CDATA[<bean:write name="row" property="inv_xcrt"/>]]></TD>
                            
							<TD><![CDATA[<bean:write name="row" property="inv_amt"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="inv_vat_amt" />]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="inv_sum_amt" />]]></TD>
                            
                            <TD><![CDATA[<bean:write name="row" property="agent_amt"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="debit_amt" />]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="credit_amt" />]]></TD>
                            <TD></TD>
							<TD><![CDATA[<bean:write name="row" property="inv_seq" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="intg_bl_seq" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inv_no" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inv_rmk" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inv_dt" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inv_post_dt" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inv_due_dt" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="last_pay_dt" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="agent_ps_code" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="profit_share" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inv_trdp_cd" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inv_trdp_cd_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cust_ref_no" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="oth_seq" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="last_chk_no" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inv_bal_amt" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inv_pay_amt" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inco_cd" />]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="clt_cmpl_flg" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="tax_bil_flg" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cmb_inv_seq" />]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="jnr_yn" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="jnr_dt" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cls_yn" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cls_dt" />]]></TD>
														
							<TD><![CDATA[<bean:write name="row" property="block_dt" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="modi_tms" />]]></TD>
							
							<!-- #1799 [PATENT] VOUCHER 양식 - Deposit/Payment for CHINA Account Slip [Form] -->
							<TD><![CDATA[<bean:write name="row" property="vchr_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="vchr_tp_cd"/>]]></TD>
							<!-- #3505 [JTC]ACCT - Local Currency 금액 환산 & SLIP 반영  -->
							<TD><![CDATA[<bean:write name="row" property="locl_curr_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="locl_xcrt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="locl_amt"/>]]></TD>	
							<!-- #5333 [STAR CLUSTER MEXICO] TAX INVOICE NO FIELD ADD TO D/C ENTRY -->
							<TD><![CDATA[<bean:write name="row" property="tax_no"/>]]></TD>
							
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
<%		
	}else{
%>
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
                            <TD><![CDATA[<bean:write name="row" property="frt_seq"/>]]></TD>
                            <TD></TD>
                            <TD><![CDATA[<bean:write name="row" property="intg_bl_seq_2"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="frt_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="frt_cd_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="trdp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="trdp_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="sell_buy_tp_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="frt_term_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="aply_ut_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="cntr_tpsz_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="ru"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="qty"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="agent_ru"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="trf_cur_sum_amt"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="rat_curr_cd"/>]]></TD>							
                            <TD><![CDATA[<bean:write name="row" property="inv_xcrt"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="inv_xcrt_dt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inv_amt"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="inv_vat_amt" />]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="inv_sum_amt" />]]></TD>
                            
                            <TD><![CDATA[<bean:write name="row" property="agent_amt"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="debit_amt" />]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="credit_amt" />]]></TD>
                            <TD></TD>
							<TD><![CDATA[<bean:write name="row" property="inv_seq" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="intg_bl_seq" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inv_no" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inv_rmk" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inv_dt" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inv_post_dt" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inv_due_dt" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="last_pay_dt" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="agent_ps_code" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="profit_share" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inv_trdp_cd" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inv_trdp_cd_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cust_ref_no" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="oth_seq" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="last_chk_no" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inv_bal_amt" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inv_pay_amt" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inco_cd" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inv_aply_curr_cd" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="clt_cmpl_flg" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="tax_bil_flg" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cmb_inv_seq" />]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="jnr_yn" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="jnr_dt" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cls_yn" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cls_dt" />]]></TD>
														
							<TD><![CDATA[<bean:write name="row" property="block_dt" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="modi_tms" />]]></TD>
							
							<!-- 누락추가 -->
							<TD><![CDATA[<bean:write name="row" property="vchr_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="vchr_tp_cd"/>]]></TD>
														
							<!-- #3505 [JTC]ACCT - Local Currency 금액 환산 & SLIP 반영  -->
							<TD><![CDATA[<bean:write name="row" property="locl_curr_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="locl_xcrt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="locl_amt"/>]]></TD>								
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
<%		
	}
%>

