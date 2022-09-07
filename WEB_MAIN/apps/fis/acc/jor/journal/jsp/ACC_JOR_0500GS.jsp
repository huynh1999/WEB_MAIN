<%--
=========================================================
*@FileName   : ACC_JOR_0500GS.jsp
*@FileTitle  : Invoice List Popup
*@Description: Invoice List Popup
*@author     : Chungrue - Cyberlogitec
*@version    : 1.0 - 2012/02/15
*@since      : 2012/02/15

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
				<%--<bean:define id="strIdx" name="tmpMapVal" property="beginIdx"/> --%>
				<% 
				boolean isBegin = true;
				//int cnt = Integer.parseInt(strIdx.toString());
				%>
				<bean:define id="rowSet" name="EventResponse" property="listVal"/>
				<SHEET>
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
					<logic:iterate id="row" name="rowSet">
						<tr>
                            <TD></TD>
                            <TD><![CDATA[<bean:write name="row" property="trdp_nm" filter="false"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="buy_inv_no" filter="false"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="inv_post_dt"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="inv_dt"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="inv_due_dt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ofc_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inv_dept_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inv_tp"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inv_aply_curr_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="inv_aply_xcrt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inv_no" filter="false"/>]]></TD>
						    <TD><![CDATA[<bean:write name="row" property="inv_sum_amt"/>]]></TD>							
                            <TD><![CDATA[<bean:write name="row" property="bal_sum_amt"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="inv_xcrt_dt"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="inv_aply_xcrt"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="inv_xcrt_sum_amt"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="gl_no"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="gl_rmk" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ref_no" filter="false"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="bl_no" filter="false"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="inv_seq" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="trdp_cd" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="sell_buy_tp_cd" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="jnr_desc" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="acct_cd" />]]></TD>
							<!-- OFVFOUR-7996 [South East World Wide] Adding Agent Ref No. Column and Header Setting Save Function -->
							<TD><![CDATA[<bean:write name="row" property="imp_ref_no" />]]></TD>
							<TD></TD>
							<TD><![CDATA[<% if(isBegin){ isBegin = false; %><bean:write name="tmpMapVal" property="pagingTbl"/><%}%>]]></TD>
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
