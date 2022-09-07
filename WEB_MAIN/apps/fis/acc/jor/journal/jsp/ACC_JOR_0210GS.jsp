<%--
=========================================================
*@FileName   : ACC_JOR_0210GS.jsp
*@FileTitle  : Tax Bill Check Invoice List
*@Description: Tax Bill Check Invoice List
*@author     : Chungrue - Cyberlogitec
*@version    : 1.0 - 2012/01/17
*@since      : 2012/01/17

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
                            <TD></TD>
                            <TD></TD>
                            <TD><![CDATA[<bean:write name="row" property="inv_post_dt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ofc_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inv_dept_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inv_tp"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="inv_no"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="buy_inv_no"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="inv_aply_curr_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="inv_aply_xcrt"/>]]></TD>
						    <TD><![CDATA[<bean:write name="row" property="inv_sum_amt"/>]]></TD>							
                            <TD><![CDATA[<bean:write name="row" property="bal_sum_amt"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="pay_amt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ttl_pay_amt"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="old_pay_amt"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="gl_no"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="gl_rmk"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ref_no"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="bl_no"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="jnr_desc"/>]]></TD>
                            
                            <TD><![CDATA[<bean:write name="row" property="clr_flag" />]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="inv_seq" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="jnr_no" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="jnr_seq" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="trdp_cd" />]]></TD>
							<TD></TD>
							<TD></TD>
							
							<TD><![CDATA[<bean:write name="row" property="r_post_dt" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="r_bank_seq" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="r_clr_yn" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="r_clr_dt" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="r_void_yn" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="r_void_dt" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="r_chk_no" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="r_amt" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="r_curr_cd" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="r_rmk" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="sell_buy_tp_cd" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="clt_cmpl_flg" />]]></TD>
							
							
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
