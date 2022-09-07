<%--
=========================================================
*@FileName   : ACC_JOR_0700GS.jsp
*@FileTitle  : Journal History
*@Description: Journal History
*@author     : 
*@version    : 
*@since      : 

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
							<TD><![CDATA[<bean:write name="row" property="modi_tms"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="modi_usrid"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="delt_flg"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="trdp_cd" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rcvd_fm_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="post_dt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="curr_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="bank_seq"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="chk_no" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="amt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="clr_dt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="void_dt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="modi_seq"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="jnr_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="mig_yn"/>]]></TD>
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
