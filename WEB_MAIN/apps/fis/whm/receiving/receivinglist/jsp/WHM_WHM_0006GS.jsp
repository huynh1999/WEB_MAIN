<%--
=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
=========================================================

=========================================================
*@FileName   : WHM_WHM_0006_01.jsp
*@FileTitle  : Item Entry 
*@Description: 
*@author     : Thoa.Dien - DOU NetWorks
*@version    : 1.0 - 2014/12/28
*@since      : 2014/12/28

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
				<bean:define id="rowSet" name="EventResponse" property="listVal"/>
				<SHEET>
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
					<logic:iterate id="row" name="rowSet">
						<tr>
							<TD></TD>
							<TD></TD>
							<TD><![CDATA[<bean:write name="row" property="wh_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="file_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cust_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="cust_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="estm_rcv_dt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rcv_shp_dt"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="cust_ref_no"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="splr_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="trkr_nm"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="itm_po_no"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="plt_no"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="cntr_no"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="mst_bl_no"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="hus_bl_no"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="rcv_by"/>]]></TD>
                             <TD><![CDATA[<bean:write name="row" property="rgst_ofc_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="splr_rcvr_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="trkr_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="rcv_shp_flg"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="wh_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="len_ut_cd"/>]]></TD>
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
