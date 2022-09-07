<%--
=========================================================
*@FileName   : MGT_JOB_0050GS.jsp
*@FileTitle  : 
*@Description: 
*@author     : 
*@version    : 
*@since      : 12/28/2016

*@Change history:
=========================================================
--%>
<%@page contentType="text/xml; charset=UTF-8"%>
<%@page pageEncoding="UTF-8"%>
<%@include file="./../../../../../../../../syscommon/header/CLTGSHeader.jsp"%>

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
							<TD></TD>
							<TD><% cnt++;%><%= cnt%></TD>					
							<TD><![CDATA[<bean:write name="row" property="lgs_clss_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="bse_tm_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="bse_tm_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="act_desc"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="srt_seq"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="evnt_itm_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="dflt_pln_itval_hrs"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="dflt_pln_itval_hrs"/>]]></TD>		
							<TD><![CDATA[<bean:write name="row" property="use_flg"/>]]></TD>			
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
