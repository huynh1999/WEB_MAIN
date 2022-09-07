<%--
=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
=========================================================
 
=========================================================
*@FileName   : WWHM_WHM_0009GS.jsp
*@FileTitle  : 
*@Description: 
*@author     : Thoa.Dien - Cyberlogitec
*@version    : 1.0 - 2014/12/22
*@since      : 2014/12/22

*@Change history:
=========================================================
--%>
<%@ page contentType="text/xml; charset=UTF-8"%>
<%@page pageEncoding="UTF-8"%>
<%@include file="./../../../../../../syscommon/header/CLTGSHeader.jsp"%>
<%-- 정상처리 --%>
<logic:empty name="com.clt.framework.core.comm.EXCEPTION_OBJECT">
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
							<%-- OFVFOUR-7739 [PQC][Contract Item List] - Infinite loading error --%>
							<TD><![CDATA[<bean:write name="row" property="item_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="item_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="item_grp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ctrt_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ctrt_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pkg_lv1_unit_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pkg_lv1_qty"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="item_pkgunit"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="item_pkgbaseqty"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pkg_lv3_unit_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pkg_lv3_qty"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pkg_lv4_unit_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pkg_lv4_qty"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="item_length"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="item_width"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="item_height"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="item_cbm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="item_kgs"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="item_net_wgt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="item_use_flg"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rgst_id"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rgst_sys_dt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="modi_id"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="modi_sys_dt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="item_sys_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="barcode_no"/>]]></TD>
			            <TD><![CDATA[<% if(isBegin){ isBegin = false; %><bean:write name="tmpMapVal" property="pagingTbl"/><%}%>]]></TD>
			            </tr>
					</logic:iterate>
					</DATA>
				</SHEET>
			</logic:notEmpty>
</logic:empty>
<%-- 오류발생 --%>
<logic:notEmpty name="com.clt.framework.core.comm.EXCEPTION_OBJECT">
	<ERROR>
		<MESSAGE><![CDATA[ <bean:message name="com.clt.framework.core.comm.EXCEPTION_OBJECT" property="message"/>]]> </MESSAGE>
	</ERROR>
</logic:notEmpty>
