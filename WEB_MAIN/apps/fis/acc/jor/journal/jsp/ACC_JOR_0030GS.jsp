<%--
=========================================================
*@FileName   : ACC_JOR_0030.jsp
*@FileTitle  : Check Journal
*@Description: Check Journal
*@author     : Chungrue - Cyberlogitec
*@version    : 1.0 - 2011/11/23
*@since      : 2011/11/23

*@Change history:
*@Change history:
*@author     : Tuan.Chau
*@version    : 2.0 - 2014/07/10
*@since      : 2014/07/10
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
							<TD></TD>                                                                                   <!-- del_chk           -->
							<TD><![CDATA[<bean:write name="row" property="inv_post_dt"/>]]></TD>                        <!-- inv_post_dt       -->
							<TD><![CDATA[<bean:write name="row" property="inv_dt"/>]]></TD>                             <!-- inv_dt            -->
							<TD><![CDATA[<bean:write name="row" property="inv_due_dt"/>]]></TD>                         <!-- inv_due_dt        -->
							<TD><![CDATA[<bean:write name="row" property="ofc_cd"/>]]></TD>                             <!-- ofc_cd            -->
							<TD><![CDATA[<bean:write name="row" property="inv_tp"/>]]></TD>                             <!-- inv_tp            -->
							<TD><![CDATA[<bean:write name="row" property="gl_no"/>]]></TD>                              <!-- gl_no             -->
							<TD><![CDATA[<bean:write name="row" property="gl_rmk" filter="false"/>]]></TD>              <!-- gl_rmk            -->
							<TD><![CDATA[<bean:write name="row" property="inv_aply_curr_cd"/>]]></TD>                   <!-- inv_aply_curr_cd  -->
							<TD><![CDATA[<bean:write name="row" property="inv_no"/>]]></TD>                             <!-- inv_no            -->
							<TD><![CDATA[<bean:write name="row" property="buy_inv_no" filter="false"/>]]></TD>          <!-- buy_inv_no        -->
							<TD><![CDATA[<bean:write name="row" property="inv_sum_amt"/>]]></TD>                        <!-- inv_sum_amt       -->
							<TD><![CDATA[<bean:write name="row" property="bal_sum_amt"/>]]></TD>                        <!-- bal_sum_amt_1     -->
							<TD><![CDATA[<bean:write name="row" property="bal_sum_amt"/>]]></TD>                        <!-- bal_sum_amt       -->
							<TD><![CDATA[<bean:write name="row" property="pay_amt"/>]]></TD>                            <!-- pay_amt           -->
							<TD></TD>                                                                                   <!-- chk_flag          -->
							<TD><![CDATA[<bean:write name="row" property="inv_xcrt_dt"/>]]></TD>                        <!-- inv_xcrt_dt       -->
							<TD><![CDATA[<bean:write name="row" property="inv_aply_xcrt"/>]]></TD>                      <!-- inv_aply_xcrt     -->
							<TD><![CDATA[<bean:write name="row" property="inv_xcrt_sum_amt"/>]]></TD>                   <!-- inv_xcrt_sum_amt  -->
							<TD><![CDATA[<bean:write name="row" property="ttl_pay_amt"/>]]></TD>                        <!-- ttl_pay_amt       -->
							<TD><![CDATA[<bean:write name="row" property="old_pay_amt"/>]]></TD>                        <!-- old_pay_amt       -->
							<!-- #3505 [JTC]ACCT - Local Currency 금액 환산 & SLIP 반영 -->
							<TD><![CDATA[<bean:write name="row" property="locl_xcrt"/>]]></TD>                          <!-- locl_xcrt         -->
							<TD><![CDATA[<bean:write name="row" property="locl_ttl_amt"/>]]></TD>                       <!-- locl_ttl_amt      -->
							<TD><![CDATA[<bean:write name="row" property="locl_bal_amt"/>]]></TD>                       <!-- locl_bal_amt_1    -->
							<TD><![CDATA[<bean:write name="row" property="locl_bal_amt"/>]]></TD>                       <!-- locl_bal_amt      -->
							<TD><![CDATA[<bean:write name="row" property="locl_amt"/>]]></TD>                           <!-- locl_amt          -->
							<TD><![CDATA[<bean:write name="row" property="locl_amt"/>]]></TD>                           <!-- locl_bal_amt      -->
							<TD><![CDATA[<bean:write name="row" property="bl_no"/>]]></TD>                              <!-- bl_no             -->
							<TD><![CDATA[<bean:write name="row" property="ref_no"/>]]></TD>                             <!-- ref_no            -->
							<TD><![CDATA[<bean:write name="row" property="jnr_desc"/>]]></TD>                           <!-- jnr_desc          -->
							<TD><![CDATA[<bean:write name="row" property="inv_dept_cd"/>]]></TD>                        <!-- inv_dept_cd       -->
							<TD><![CDATA[<bean:write name="row" property="clr_flag" />]]></TD>                          <!-- clr_flag          -->
							<TD><![CDATA[<bean:write name="row" property="inv_seq" />]]></TD>                           <!-- inv_seq           -->
							<TD><![CDATA[<bean:write name="row" property="jnr_no" />]]></TD>                            <!-- jnr_no            -->
							<TD><![CDATA[<bean:write name="row" property="jnr_seq" />]]></TD>                           <!-- jnr_seq           -->
							<TD><![CDATA[<bean:write name="row" property="trdp_cd" />]]></TD>                           <!-- trdp_cd           -->
							<TD><![CDATA[<bean:write name="row" property="payto_cd" />]]></TD>                          <!-- payto_cd          -->
							<TD></TD>                                                                                   <!-- clr_gl            -->
							<TD></TD>                                                                                   <!-- ibflag            -->
							<!-- OFVFOUR-7996 [South East World Wide] Adding Agent Ref No. Column and Header Setting Save Function  -->
							<TD><![CDATA[<bean:write name="row" property="imp_ref_no"/>]]></TD>   
							<TD><![CDATA[<bean:write name="row" property="r_post_dt" />]]></TD>                         <!-- r_post_dt         -->
							<TD><![CDATA[<bean:write name="row" property="r_bank_seq" />]]></TD>                        <!-- r_bank_seq        -->
							<TD><![CDATA[<bean:write name="row" property="r_clr_yn" />]]></TD>                          <!-- r_clr_yn          -->
							<TD><![CDATA[<bean:write name="row" property="r_clr_dt" />]]></TD>                          <!-- r_clr_dt          -->
							<TD><![CDATA[<bean:write name="row" property="r_void_yn" />]]></TD>                         <!-- r_void_yn         -->
							<TD><![CDATA[<bean:write name="row" property="r_void_dt" />]]></TD>                         <!-- r_void_dt         -->
							<TD><![CDATA[<bean:write name="row" property="r_chk_no" filter="false"/>]]></TD>            <!-- r_chk_no          -->
							<TD><![CDATA[<bean:write name="row" property="r_amt" />]]></TD>                             <!-- r_amt             -->
							<TD><![CDATA[<bean:write name="row" property="r_curr_cd" />]]></TD>                         <!-- r_curr_cd         -->
							<TD><![CDATA[<bean:write name="row" property="r_rmk" filter="false"/>]]></TD>               <!-- r_rmk             -->
							<TD><![CDATA[<bean:write name="row" property="sell_buy_tp_cd" />]]></TD>                    <!-- sell_buy_tp_cd    -->
							<TD><![CDATA[<bean:write name="row" property="clt_cmpl_flg" />]]></TD>                      <!-- clt_cmpl_flg      -->

							<TD><![CDATA[<bean:write name="row" property="inp_type" />]]></TD>                          <!-- inp_type          -->
							<TD><![CDATA[<bean:write name="row" property="air_sea_clss_cd" />]]></TD>                   <!-- air_sea_clss_cd   -->

							<TD><![CDATA[<bean:write name="row" property="jnr_yn" />]]></TD>                            <!-- jnr_yn            -->
							<TD><![CDATA[<bean:write name="row" property="jnr_dt" />]]></TD>                            <!-- jnr_dt            -->
							<TD><![CDATA[<bean:write name="row" property="cls_yn" />]]></TD>                            <!-- cls_yn            -->
							<TD><![CDATA[<bean:write name="row" property="cls_dt" />]]></TD>                            <!-- cls_dt            -->

							<TD><![CDATA[<bean:write name="row" property="modi_tms" />]]></TD>                          <!-- modi_tms          -->
							<TD><![CDATA[<bean:write name="row" property="clr_gl_cd" />]]></TD>                         <!-- clr_gl_cd         -->

							<TD><![CDATA[<bean:write name="row" property="bnd_clss_cd" />]]></TD>                       <!-- bnd_clss_cd       -->
							<TD><![CDATA[<bean:write name="row" property="biz_clss_cd" />]]></TD>                       <!-- biz_clss_cd       -->
							<TD><![CDATA[<bean:write name="row" property="intg_bl_seq" />]]></TD>                       <!-- intg_bl_seq       -->
							<TD><![CDATA[<bean:write name="row" property="chk_pnt_yn" />]]></TD>                        <!-- chk_pnt_yn        -->
							<TD><![CDATA[<bean:write name="row" property="trdp_nm" filter="false"/>]]></TD>             <!-- trdp_nm           -->
							<TD><![CDATA[<bean:write name="row" property="payto_nm" filter="false"/>]]></TD>            <!-- payto_nm          -->
							<TD><![CDATA[<bean:write name="row" property="master_ofc_cd" filter="false"/>]]></TD>       <!-- master_ofc_cd     -->
							<!-- #3505 [JTC]ACCT - Local Currency 금액 환산 & SLIP 반영 -->
							<TD><![CDATA[<bean:write name="row" property="tot_locl_amt" />]]></TD>                      <!-- tot_locl_amt      -->
							<TD><![CDATA[<bean:write name="row" property="tot_locl_xcrt" />]]></TD>                     <!-- tot_locl_xcrt     -->

							<TD><![CDATA[<bean:write name="row" property="jnr_modi_tms" />]]></TD>                      <!-- jnr_modi_tms       -->
							<!--  #6375 [Bug-Deposit/Payment Entry] Bank Field could be shown regardless of Use Flag   -->
							<TD><![CDATA[<bean:write name="row" property="r_bank_nm" />]]></TD>                         <!-- r_bank_nm        -->
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
