<%--
=========================================================
*@FileName   : SEE-BMD-0026GS.jsp
*@FileTitle  : JobVisibility LIST 조회
*@Description: JobVisibility LIST를 조회한다.
*@author     : 정성욱 
*@version    : 1.0 - 03/3/2009
*@since      : 03/3/2009

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
				<% int cnt = 1; %>		
				<bean:define id="rowSet" name="EventResponse" property="listVal"/>
				<SHEET>
					<DATA>
					<logic:iterate id="row" name="rowSet">
                        <tr>    
                            <TD></TD>
							<TD><%=cnt++%></TD>
							<TD><![CDATA[<bean:write name="row" property="jb_sts_nm"/>]]></TD>
							<TD IMAGE=""><bean:write name="row" property="sts_img"/></TD>
							<TD><![CDATA[<bean:write name="row" property="jb_pln_dt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="jb_pln_tm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="jb_act_dt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="jb_act_tm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="dur_tm_qty"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="modi_usrid"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="jb_tmplt_seq"/>]]></TD>
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
