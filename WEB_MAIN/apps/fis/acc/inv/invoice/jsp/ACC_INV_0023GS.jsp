<%--
=========================================================
*@FileName   : ACC_INV_0023GS.jsp
*@FileTitle  : CR/DB NOTE Auto(O/F)
*@Description: CR/DB NOTE Auto(O/F)
*@author     : Chungrue - Cyberlogitec
*@version    : 1.0 - 2012/03/06
*@since      : 2012/03/06

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
							<TD><![CDATA[<bean:write name="row" property="frt_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="frt_cd_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="trdp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="trdp_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="sell_buy_tp_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="frt_term_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="aply_ut_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="cntr_tpsz_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="qty"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="ru"/>]]></TD>
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
							<TD><![CDATA[<bean:write name="row" property="intg_bl_seq" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="intg_bl_seq_2" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="agent_ps_code" />]]></TD>
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
