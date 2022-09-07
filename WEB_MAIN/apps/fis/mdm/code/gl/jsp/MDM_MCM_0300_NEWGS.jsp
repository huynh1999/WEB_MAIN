<%--
=========================================================
*@FileName   : MDM_MCM_0300_NEWGS.jsp
*@FileTitle  : New G/L Code
*@Description: New G/L Code
*@author     : Thoa Dien - DOU Networks
*@version    : 1.0 - 01/05/2018
*@since      : 01/05/2018

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
				<% 
				boolean isBegin = true;
				int cnt = 0;
				%>
				<bean:define id="rowSet" name="EventResponse" property="listVal"/>
				<SHEET>
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
					<logic:iterate id="row" name="rowSet">
						<tr LEVEL='<bean:write name="row" property="level" filter="false"/>'>	
							<TD></TD>
							<TD></TD>
							<TD><% cnt++;%><%= cnt%></TD>
							<TD><![CDATA[<bean:write name="row" property="gl_cd"  filter="false" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="gl_nm"  filter="false" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="prnt_cd" filter="false" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="gl_lvl" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="use_flg" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="dps_flg" filter="false" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pay_flg" filter="false" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="gen_jnr_flg" filter="false" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="role_lvl" filter="false" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="for_opr_flg" filter="false" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="acct_gl_cd" filter="false" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="gl_tp_cd" filter="false" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="gl_pty_tp_cd" filter="false" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="delt_flg"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rgst_ofc_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rgst_usrid"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rgst_tms"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="modi_ofc_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="modi_usrid"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="modi_tms"/>]]></TD>
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
