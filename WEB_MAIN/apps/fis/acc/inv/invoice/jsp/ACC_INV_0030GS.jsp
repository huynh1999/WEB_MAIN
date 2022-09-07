<%--
=========================================================
*@FileName   : ACC_INV_0030.jsp
*@FileTitle  : AP Invoice
*@Description: AP Invoice
*@author     : Chungrue - Cyberlogitec
*@version    : 1.0 - 2011/11/11
*@since      : 2011/11/11

*@Change history:
*@author     : Tuan.Chau
*@version    : 2.0 - 2014/06/19
*@since      : 2014/06/19
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
							<TD><![CDATA[<bean:write name="row" property="frt_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="frt_cd_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="trdp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="trdp_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="frt_term_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="aply_ut_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="cntr_tpsz_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rat_curr_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="vat_rt"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="vat_rt_cd"/>]]></TD>
                            
                            <!-- #1098 [BNX] INDIA 오피스 - 요구사항 항목 -->
                            <TD><![CDATA[<bean:write name="row" property="vat_rt1"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="vat_rt_cd1"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="vat_rt2"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="vat_rt_cd2"/>]]></TD>
                            
                            <TD><![CDATA[<bean:write name="row" property="whld_vat_rt"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="vat_amt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ru"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="qty"/>]]></TD>
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
							<TD><![CDATA[<bean:write name="row" property="inv_seq" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="intg_bl_seq" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inv_no" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inv_rmk" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inv_dt" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inv_post_dt" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inv_due_dt" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="last_pay_dt" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inv_trdp_cd" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inv_trdp_cd_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="buy_inv_no" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="oth_seq" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="last_chk_no" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inv_bal_amt" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inv_pay_amt" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inco_cd" />]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="clt_cmpl_flg" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="buy_inv_rcv" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="tax_bil_flg" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cmb_inv_seq" />]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="jnr_yn" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="jnr_dt" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cls_yn" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cls_dt" />]]></TD>							
							
							<TD><![CDATA[<bean:write name="row" property="block_dt" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="frt_inv_post_dt" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="modi_tms" />]]></TD>
							<!-- WMS ACCOUNT LKH 2015.01.20 -->
							<TD><![CDATA[<bean:write name="row" property="wms_seq" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="tax_flg" />]]></TD>
							<!-- #1799 [PATENT] VOUCHER 양식 - Deposit/Payment for CHINA Account Slip [Form] -->
							<TD><![CDATA[<bean:write name="row" property="vchr_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="vchr_tp_cd"/>]]></TD>
							<!-- #3505 [JTC]ACCT - Local Currency 금액 환산 & SLIP 반영  -->
							<TD><![CDATA[<bean:write name="row" property="locl_curr_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="locl_xcrt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="locl_amt"/>]]></TD>
							<!-- #6307 [Starcluster-MEX] Add tax Inv No in aging, local and agent statement (Zen#2159) -->
							<TD><![CDATA[<bean:write name="row" property="tax_no" />]]></TD>							
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
							<TD><![CDATA[<bean:write name="row" property="frt_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="frt_cd_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="trdp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="trdp_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="frt_term_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="aply_ut_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="cntr_tpsz_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="vat_rt"/>]]></TD>
                            <!-- VAT CODE ADD #52015 [CLC]AR과 AP 기능에 상이한 Currency를 하나의 Invoice에 Exchange Rate 적용하여 표시되도록 함 -->                             
                            <TD><![CDATA[<bean:write name="row" property="vat_rt_cd"/>]]></TD>
                            
                            <!-- #1098 [BNX] INDIA 오피스 - 요구사항 항목 -->
                            <TD><![CDATA[<bean:write name="row" property="vat_rt1"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="vat_rt_cd1"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="vat_rt2"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="vat_rt_cd2"/>]]></TD>
                            
                            <TD><![CDATA[<bean:write name="row" property="whld_vat_rt"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="vat_amt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ru"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="qty"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="trf_cur_sum_amt"/>]]></TD>
						    <TD><![CDATA[<bean:write name="row" property="rat_curr_cd"/>]]></TD>							
                            <TD><![CDATA[<bean:write name="row" property="inv_xcrt"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="inv_xcrt_dt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inv_amt"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="inv_vat_amt" />]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="inv_sum_amt" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inv_seq" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="intg_bl_seq" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inv_no" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inv_rmk" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inv_dt" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inv_post_dt" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inv_due_dt" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="last_pay_dt" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inv_trdp_cd" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inv_trdp_cd_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="buy_inv_no" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="oth_seq" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="last_chk_no" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inv_bal_amt" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inv_pay_amt" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inco_cd" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inv_aply_curr_cd" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="clt_cmpl_flg" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="buy_inv_rcv" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="tax_bil_flg" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cmb_inv_seq" />]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="jnr_yn" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="jnr_dt" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cls_yn" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cls_dt" />]]></TD>							
							
							<TD><![CDATA[<bean:write name="row" property="block_dt" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="frt_inv_post_dt" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="modi_tms" />]]></TD>
							<!-- WMS ACCOUNT LKH 2015.01.20 -->
							<TD><![CDATA[<bean:write name="row" property="wms_seq" />]]></TD>
							
							<!-- 누락추가 -->
							<TD><![CDATA[<bean:write name="row" property="tax_flg" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="vchr_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="vchr_tp_cd"/>]]></TD>
														
							<!-- #3505 [JTC]ACCT - Local Currency 금액 환산 & SLIP 반영  -->
							<TD><![CDATA[<bean:write name="row" property="locl_curr_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="locl_xcrt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="locl_amt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="tax_no" />]]></TD>							
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