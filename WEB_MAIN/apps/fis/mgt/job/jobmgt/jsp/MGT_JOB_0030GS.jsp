<%--
=========================================================
*@FileName   : MGT_JOB_0020GS.jsp
*@FileTitle  : Job Visibility Summary
*@Description: Job Visibility Summary
*@author     : Choi,Gil-Ju - Cyberlogitec
*@version    : 1.0 - 02/12/2009
*@since      : 02/12/2009

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
				<% int cnt = 0; %>		
				<bean:define id="rowSet" name="EventResponse" property="listVal"/>
				<SHEET>
					<DATA>
					<logic:iterate id="row" name="rowSet">
						<% cnt++;%>
						<tr>	
							<TD><%=cnt%></TD>
							<TD><![CDATA[<bean:write name="row" property="bnd_clss_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cd_nm"/>]]></TD>
							<TD IMAGE="0"></TD>
							<TD><![CDATA[<bean:write name="row" property="jb_pln_dt_tm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="jb_act_dt_tm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="modi_usrid"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="intg_bl_seq"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="jb_sts_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="curr_tm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="sts_color"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="category"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="template"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="recv_dt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="bkg_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="hbl_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="mbl_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="bl_sts_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="sr_no"/>]]></TD>
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
