<%--
=========================================================
*@FileName   : MGT_STK_0011GS.jsp
*@FileTitle  : MASTER STOCK SUMMARY
*@Description: MASTER STOCK SUMMARY
*@author     : Chungrue - Cyberlogitec
*@version    : 1.0 - 2009/11/05
*@since      : 2009/11/05

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
				<% int cnt=1;%>
				<SHEET>
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
					<logic:iterate id="row" name="rowSet">
						<tr>	
							<TD><%=cnt++%></TD>
							<TD><![CDATA[<bean:write name="row" property="s_crr_iata_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="s_aloc_area_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="s_allc_dt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="s_use_tot"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="s_stk_tot"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="s_mbl_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="s_st_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="s_lst_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="s_stk_tp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="s_usrid"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="s_usrnm"/>]]></TD>
							<!-- #5755 [Impex-Germany] Dublicate error message when creating MAWB stock  -->
							<TD><![CDATA[<bean:write name="row" property="s_delt_flg"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="s_not_del_cnt"/>]]></TD>
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
