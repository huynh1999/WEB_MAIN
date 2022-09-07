<%--
=========================================================
*@FileName   : MGT_CUR_0010GS.jsp
*@FileTitle  : Trade Partner ManagementList
*@Description: 일 환율 및 월 환율의 데이터를 표시한다. 
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
				<bean:define id="tmpMapVal" name="EventResponse" property="mapVal"/>
				<bean:define id="strIdx" name="tmpMapVal" property="beginIdx"/>
				<% 
				boolean isBegin = true;
				int cnt = Integer.parseInt(strIdx.toString());
				%>
			
				<bean:define id="rowSet" name="EventResponse" property="listVal"/>
				<SHEET>
					<DATA TOTAL="">
					<logic:iterate id="row" name="rowSet">
						<tr>							
							<TD></TD>
							<TD><%= ++cnt%></TD>
							<TD></TD>
							
                            <TD><![CDATA[<bean:write name="row" property="curr_tp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="trdp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="trdp_nm"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="fm_curr_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="fm_rt_ut"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="to_curr_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="to_rt_ut"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="xch_rt_ut"/>]]></TD>
														
							<TD><![CDATA[<bean:write name="row" property="dt_clss_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="aply_fm_dt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="aply_to_dt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rmk"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="proc_usrid"/>]]></TD>			
							<TD><![CDATA[<bean:write name="row" property="inv_xcrt_seq"/>]]></TD>				
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
