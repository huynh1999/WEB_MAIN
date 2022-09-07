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
<logic:empty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
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
							<TD><bean:write name="row" property="cust_cd"/></TD>
							<TD><bean:write name="row" property="cust_nm"/></TD>
							<TD><bean:write name="row" property="cust_itm_id"/></TD>
							<TD><bean:write name="row" property="itm_nm"/></TD>
							<TD><bean:write name="row" property="itm_ut_cd"/></TD>
							<TD><bean:write name="row" property="rcv_shp_dt"/></TD>
							<TD><bean:write name="row" property="rcv_shp_tp_cd"/></TD>
							<TD><bean:write name="row" property="splr_rcvr_cd"/></TD>
							<TD><bean:write name="row" property="file_no"/></TD>
							
							<TD><bean:write name="row" property="bgn_bal"/></TD>
							<TD><bean:write name="row" property="in_ctn"/></TD>
							<TD><bean:write name="row" property="in_ea"/></TD>
							<TD><bean:write name="row" property="in_itm_ttl_qty"/></TD>
							<TD><bean:write name="row" property="in_kgs"/></TD>
							<TD><bean:write name="row" property="in_lbs"/></TD>
							<TD><bean:write name="row" property="in_cbm"/></TD>
							<TD><bean:write name="row" property="in_cft"/></TD>			
							
							<TD><bean:write name="row" property="out_ctn"/></TD>
							<TD><bean:write name="row" property="out_ea"/></TD>
							<TD><bean:write name="row" property="out_itm_ttl_qty"/></TD>
							<TD><bean:write name="row" property="out_kgs"/></TD>
							<TD><bean:write name="row" property="out_lbs"/></TD>
							<TD><bean:write name="row" property="out_cbm"/></TD>
							<TD><bean:write name="row" property="out_cft"/></TD>
							<TD><bean:write name="row" property="end_bal"/></TD>
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
