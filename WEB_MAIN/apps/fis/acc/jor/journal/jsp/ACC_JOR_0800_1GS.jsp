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
                            <TD><![CDATA[<bean:write name="row" property="jnr_tp"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="curr_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rcv_amt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="coll_amt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="org_coll_amt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ex_gl_amt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="bank_seq"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="chk_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="post_dt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="post_dt"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="clr_yn"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="clr_dt"/>]]></TD>
						    <TD><![CDATA[<bean:write name="row" property="void_yn"/>]]></TD>
						    <TD><![CDATA[<bean:write name="row" property="void_yn"/>]]></TD>
						    <TD><![CDATA[<bean:write name="row" property="void_dt"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="void_dt"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="jnr_no"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="grp_slip_no"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="p_ofc_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="trdp_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="trdp_nm"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="clt_cmpl_flg"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="cur_chk_no"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="lst_chk_no"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="jnr_yn"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="cls_yn"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="vchr_tp_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="vchr_no"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="ex_gl_amt"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="rcv_tp_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="r_rmk"/>]]></TD>
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
