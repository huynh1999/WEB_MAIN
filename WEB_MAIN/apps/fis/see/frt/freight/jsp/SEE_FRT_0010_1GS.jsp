<%--
=========================================================
*@FileName   : SEE_FRT_0010_1GS.jsp
*@FileTitle  : House B/L Freight 화면 Freight목록 데이
*@Description: House B/L Freight 화면 Freight목록 데이
*@author     : Kang,Jung-Gu - Cyberlogitec
*@version    : 1.0 - 02/06/2009
*@since      : 02/06/2009

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
							<TD><![CDATA[<bean:write name="row" property="frt_seq"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="frt_cd" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="frt_cd_nm" filter="false"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="trdp_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="trdp_nm" filter="false"/>]]></TD>
							
							
                            <TD><![CDATA[<bean:write name="row" property="aply_ut_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="cntr_tpsz_cd"/>]]></TD>
							
                            <TD><![CDATA[<bean:write name="row" property="scg_incl_flg"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="frt_term_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="rat_curr_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="ru"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="agent_ru"/>]]></TD>
                            
                            <TD><![CDATA[<bean:write name="row" property="qty"/>]]></TD>
                            
                            <TD><![CDATA[<bean:write name="row" property="trf_cur_sum_amt"/>]]></TD>
							
                            <TD><![CDATA[<bean:write name="row" property="vat_rt"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="vat_amt"/>]]></TD>

						    <TD><![CDATA[<bean:write name="row" property="inv_curr_cd"/>]]></TD>							
                            <TD><![CDATA[<bean:write name="row" property="inv_xcrt"/>]]></TD>
                            <TD></TD>
                            <TD><![CDATA[<bean:write name="row" property="inv_xcrt_dt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inv_amt"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="inv_vat_amt" />]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="inv_sum_amt" />]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="cr_amt" />]]></TD>

							<TD><![CDATA[<bean:write name="row" property="perf_curr_cd"/>]]></TD>							
                            <TD><![CDATA[<bean:write name="row" property="perf_xcrt"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="perf_amt"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="perf_vat_amt"/>]]></TD>
                            
                            <TD><![CDATA[<bean:write name="row" property="inv_no"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="buy_inv_no"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="inv_seq"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="cmb_inv_no"/>]]></TD> <!-- #2504 [PATENT]Debit Note & AP for billing code based invoices -->
                            <TD><![CDATA[<bean:write name="row" property="inv_sts_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="inv_sts_nm"/>]]></TD>
							<TD></TD>
							<TD></TD>
							<TD><![CDATA[<bean:write name="row" property="sell_buy_tp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="auto_trf_flg"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="trf_ctrt_no"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="trf_dtl_seq"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="ibflag"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="frt_ask_clss_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inv_due_dt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="agent_amt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="reserve_field01"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cmb_inv_seq"/>]]></TD> <!-- #2504 [PATENT]Debit Note & AP for billing code based invoices -->
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
