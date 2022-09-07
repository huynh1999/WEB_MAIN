<%--
=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
=========================================================

=========================================================
*@FileName   : WHM_WHM_0003.jsp
*@FileTitle  : Item Entry 
*@Description: 
*@author     : Khang.Dong - DOU NetWorks
*@version    : 1.0 - 2015/07/09

*@Change history:
=========================================================
--%>
<%@ page contentType="text/xml; charset=UTF-8"%>
<%@page pageEncoding="UTF-8"%>
<%@include file="./../../../../../../syscommon/header/CLTGSHeader.jsp"%>
<%-- 정상처리 --%>
<logic:empty name="com.clt.framework.core.comm.EXCEPTION_OBJECT">
		<%-- 조회 결과가 없는 경우 --%>
			<logic:empty name="EventResponse" property="mapVal">
					<DATA TOTAL="0"></DATA>
			</logic:empty>
		<%-- 조회 결과가 있는 경우 --%>
			<logic:notEmpty name="EventResponse" property="mapVal">
				<bean:define id="rowSet" name="EventResponse" property="mapVal"/>
				
				<logic:notEmpty name="rowSet" property="listCnt">
				<CHECK>
						<listCnt><![CDATA[<bean:write name="rowSet" property="listCnt"/>]]></listCnt>
					</CHECK>
					</logic:notEmpty>
					
				<logic:notEmpty name="rowSet" property="header">
 					<bean:define id="rowSetField" name="rowSet" property="header"/>
					<FIELD>
						<DATA TOTAL="1">
							<logic:iterate id="rowField" name="rowSetField">
							
								<supv_nm><![CDATA[<bean:write name="rowField" property="supv_nm"/>]]></supv_nm>
								<unload_dt><![CDATA[<bean:write name="rowField" property="unload_dt"/>]]></unload_dt>
								<unload_hm_fr><![CDATA[<bean:write name="rowField" property="unload_hm_fr"/>]]></unload_hm_fr>
								<unload_hm_to><![CDATA[<bean:write name="rowField" property="unload_hm_to"/>]]></unload_hm_to>
								<unload_by><![CDATA[<bean:write name="rowField" property="unload_by"/>]]></unload_by>
								<msg_to_wk><![CDATA[<bean:write name="rowField" property="msg_to_wk"/>]]></msg_to_wk>
								<insp_by><![CDATA[<bean:write name="rowField" property="insp_by"/>]]></insp_by>
								<insp_hm_fr><![CDATA[<bean:write name="rowField" property="insp_hm_fr"/>]]></insp_hm_fr>
								<insp_hm_to><![CDATA[<bean:write name="rowField" property="insp_hm_to"/>]]></insp_hm_to>
								<msg_to_insp><![CDATA[<bean:write name="rowField" property="msg_to_insp"/>]]></msg_to_insp>
							</logic:iterate>
						</DATA>
					</FIELD>
				</logic:notEmpty>
				
				<logic:notEmpty name="rowSet" property="list">
 					<bean:define id="rowSetSheet1" name="rowSet" property="list"/>
 					
 					<bean:size id="sheet1_size" name="rowSetSheet1"/>
				<SHEET>
					<DATA TOTAL="<bean:write name="sheet1_size"/>">
					<logic:iterate id="row" name="rowSetSheet1">
						<tr>
							<TD><![CDATA[<bean:write name="row" property="ibflag"/>]]></TD>
							<TD><bean:write name="row" property="item_cd"/></TD>
							<TD><![CDATA[<bean:write name="row" property="lot_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="item_pkgunit"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="item_pkgqty"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="eq_tpsz_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="eq_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="seal_no"/>]]></TD>
							<TD></TD>
							<TD><![CDATA[<bean:write name="row" property="unload_gate_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="unload_inbound_loc_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="unload_inbound_loc_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="po_sys_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="item_sys_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="item_seq"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="eq_tp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="fix_loc_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="fix_loc_nm"/>]]></TD>
			            </tr>
					</logic:iterate>
					</DATA>
				</SHEET>
			</logic:notEmpty>
			
		</logic:notEmpty>
</logic:empty>
<%-- 오류발생 --%>
<logic:notEmpty name="com.clt.framework.core.comm.EXCEPTION_OBJECT">
	<ERROR>
		<MESSAGE><![CDATA[ <bean:message name="com.clt.framework.core.comm.EXCEPTION_OBJECT" property="message"/>]]> </MESSAGE>
	</ERROR>
</logic:notEmpty>
