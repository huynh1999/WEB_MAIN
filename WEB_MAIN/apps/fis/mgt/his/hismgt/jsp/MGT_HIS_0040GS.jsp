<%--
=========================================================
*@FileName   : MGT_HIS_0040GS.jsp
*@FileTitle  : RD History
*@Description: Searching RD History(Email, Print)
*@author     : jsjang - Cyberlogitec
*@version    : 1.0 - 2013/08/22
*@since      : 2013/08/22

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
				int cnt = 1;
				%>
				<bean:define id="tmpMapVal" name="EventResponse" property="mapVal"/>
				<bean:define id="rowSet" name="EventResponse" property="listVal"/>
				<SHEET>
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
					<logic:iterate id="row" name="rowSet">
						<tr>	
							<TD></TD>
							<TD><![CDATA[<bean:write name="row" property="rnum"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="his_seq"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="his_type"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="his_call_view"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="bl_no"/>]]></TD>							
							<TD><![CDATA[<bean:write name="row" property="inv_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="oth_ref_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="his_4"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="eng_usr_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rgst_tms"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rcvr_info"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="proc_sts_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="err_msg"/>]]></TD>
							<TD>0</TD>
							<TD><![CDATA[<bean:write name="row" property="snd_no" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="his_title"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="his_1"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="his_2"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="his_3"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="his_call_url" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="his_call_frm"/>]]></TD>
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
