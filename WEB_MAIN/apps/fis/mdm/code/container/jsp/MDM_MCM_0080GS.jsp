<%--
=========================================================
*@FileName   : MDM_MCM_0080GS.jsp
*@FileTitle  : Container Type Size
*@Description: Container Type Size
*@author     : Choi,Gil-Ju - Cyberlogitec
*@version    : 1.0 - 01/13/2009
*@since      : 01/13/2009

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
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
					<logic:iterate id="row" name="rowSet">
						<tr>	
							<TD></TD>
							<TD></TD>
							<TD><% cnt++;%><%= cnt%></TD>
							<TD><![CDATA[<bean:write name="row" property="use_flg"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cntr_tpsz_cd"/>]]></TD>
							<!-- #47 #52766 - [ZEN] Mark & Desc Tab SAY 항목 Long Name 지정 -->
							<TD><![CDATA[<bean:write name="row" property="cntr_tpsz_nm"/>]]></TD>
							<!-- #1543 [LBS] Container Type/Size Reefer, Ventill 항목 관리 -->
							<TD><![CDATA[<bean:write name="row" property="temp_flg"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="vent_flg"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cntr_grp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="teu"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="iso_cntr_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ams_cntr_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cstms_cntr_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="afr_cntr_sz_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="afr_cntr_tp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="n1st_rsv_cntr_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="n2st_rsv_cntr_cd"/>]]></TD>
							<TD><bean:write name="row" property="descr"/></TD>
							<TD><![CDATA[<bean:write name="row" property="db_value"/>]]></TD>
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
