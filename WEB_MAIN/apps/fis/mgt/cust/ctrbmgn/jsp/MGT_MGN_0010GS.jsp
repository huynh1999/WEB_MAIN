<%--
=========================================================
*@FileName   : MGT_MGN_0010GS.jsp
*@FileTitle  : Trade Partner ManagementList
*@Description: 공헌이익 데이터를 표시한다. 
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
							<TD><![CDATA[<bean:write name="row" property="cust_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cust_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ctrb_ofc_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ctrb_ratio_yn"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ctrb_mgn"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="fm_dt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="to_dt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ctrb_mgn_seq"/>]]></TD>
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
