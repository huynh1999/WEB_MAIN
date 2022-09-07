<%--
=========================================================
*@FileName   : ACC_JOR_0021GS.jsp
*@FileTitle  : Journal List	MANAGE
*@Description: Journal List	MANAGE
*@author     : Chungrue - Cyberlogitec
*@version    : 1.0 - 2011/11/30
*@since      : 2011/11/30

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
				<!-- #2341 [LBS] Deposit/Payment List 속도 개선을 위한 paging 처리 -->
				<% boolean isBegin = true; %>
	            <bean:define id="tmpMapVal" name="EventResponse" property="mapVal"/>				
				<bean:define id="rowSet" name="EventResponse" property="listVal"/>
				<SHEET>
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
					<logic:iterate id="row" name="rowSet">
						<tr>
							<TD><![CDATA[<bean:write name="row" property="clt_cmpl_flg"/>]]></TD>
							<TD></TD>
                            <TD><![CDATA[<bean:write name="row" property="post_dt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rcvd_fm_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="chk_no" filter="false"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="bank_seq"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="amt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="curr_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="clr_dt"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="void_yn"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="void_dt"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="p_ofc_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="block"/>]]></TD>
						    <TD><![CDATA[<bean:write name="row" property="rgst_usrid"/>]]></TD>
						    <TD><![CDATA[<bean:write name="row" property="rmk"/>]]></TD>
						    <!-- //#6486 [Zencon] Upload email  (Zen#2608) -->
							<TD><![CDATA[<bean:write name="row" property="file_exists"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="jnr_no"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="trdp_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="clt_cmpl_flg"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="clr_yn"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="hbl_no"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="mbl_no"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="ref_no"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="ofc_blck_flg"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="level_value"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="trx_modi_tms"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="slip_no"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="bloked_by"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="issued_by"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="block_dt"/>]]></TD>
							<TD></TD>
							<!-- #2341 [LBS] Deposit/Payment List 속도 개선을 위한 paging 처리 -->
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
