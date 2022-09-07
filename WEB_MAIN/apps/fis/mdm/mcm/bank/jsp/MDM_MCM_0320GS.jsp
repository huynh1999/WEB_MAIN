<%--
=========================================================
*@FileName   : MDM_MCM_0010GS.jsp
*@FileTitle  : Contient Code
*@Description: 대륙 정보 조회
*@author     : Choi,Gil-Ju - Cyberlogitec
*@version    : 1.0 - 01/07/2009
*@since      : 01/07/2009

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
						<tr>	
							<TD></TD>
							<TD><![CDATA[<bean:write name="row" property="bank_seq"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="gl_cd"    filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="bank_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="chk_form" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="init_amt"  filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="curr_cd"  filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="chk_no_use_flg" filter="false"/>]]></TD>  <!-- chk_no_use_flg -->
							<TD><![CDATA[<bean:write name="row" property="cur_chk_no"  filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="lst_chk_no"  filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rvn_flg"  filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cost_flg"  filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="bank_ofc_cd"  filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inact_tms" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="use_flg" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="clr_dt_cell" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="chk_no_cell" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="amt_cell" filter="false"/>]]></TD>
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
