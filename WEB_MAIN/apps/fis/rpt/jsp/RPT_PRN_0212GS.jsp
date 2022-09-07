<%--
=========================================================
*@FileName   : RPT_PRN_0181GS.jsp
*@FileTitle  : Profit Report
*@Description: Profit Report
*@author     : Dat Nguyen Tat - Cyberlogitec Vietnam
*@version    : 1.0 - 2019/09/23
*@since      : 2019/09/23

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
				    <% int loopCnt = 1;%>
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
					<logic:iterate id="row" name="rowSet">
						<tr>
							<TD><bean:write name="row" property="bl_kind"/></TD>
							<TD><bean:write name="row" property="clt_cmpl_flg"/></TD>
							<TD><bean:write name="row" property="bl_no"/></TD>
							<TD><bean:write name="row" property="inv_no"/></TD>
							<TD><bean:write name="row" property="bill_to"/></TD>
							<TD><bean:write name="row" property="inv_post_dt"/></TD>
							<TD><bean:write name="row" property="local_inv_ttl_amt"/></TD>
							<TD><bean:write name="row" property="cost_inv_ttl_amt"/></TD>
							<TD><bean:write name="row" property="agent_inv_ttl_amt"/></TD>
							<TD><bean:write name="row" property="clr_yn"/></TD>	
							<TD></TD>
							<TD><bean:write name="row" property="prf_amt"/></TD>
                            <TD><bean:write name="row" property="sell_buy_tp_cd"/></TD>
                            <TD><bean:write name="row" property="org_bl_rcvd_flg"/></TD>
                            <TD><bean:write name="row" property="express_tp_cd"/></TD>
                            <TD><bean:write name="row" property="rlsd_dt_tm"/></TD>
                            <TD><bean:write name="row" property="last_chk_no"/></TD>
                            <TD><bean:write name="row" property="last_pay_dt"/></TD>
							<TD><bean:write name="row" property="inv_curr_cd"/></TD>
							<TD><bean:write name="row" property="inv_curr_cd"/></TD>
							<TD><bean:write name="row" property="inv_curr_cd"/></TD>
							<TD><%=loopCnt++%></TD>
							<TD><bean:write name="row" property="rcvd_dt_tm"/></TD>
							
							<TD><bean:write name="row" property="ref_ofc_cd"/></TD>
							<TD><bean:write name="row" property="inv_seq"/></TD>
							<TD><bean:write name="row" property="trdp_cd"/></TD>
							<TD><bean:write name="row" property="ofc_cd"/></TD>
							<TD><bean:write name="row" property="bl_cnt_cd"/></TD>		
							<TD><bean:write name="row" property="block_tms"/></TD>
							<TD><bean:write name="row" property="block_name"/></TD>	
							<TD><bean:write name="row" property="vchr_no"/></TD>
							<TD><bean:write name="row" property="tax_no"/></TD>											
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
