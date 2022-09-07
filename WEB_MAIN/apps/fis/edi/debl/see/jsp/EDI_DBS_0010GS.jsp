<%--
=========================================================
*Copyright(c) 2008 CyberLogitec. All Rights Reserved.
=========================================================

=========================================================
*@FileName   : EDI_DBS_0010GS.jsp
*@FileTitle  : 
*@Description: 
*@author     : Lee,Hae-Kyoung - Cyberlogitec
*@version    : 1.0 - 04/05/2012
*@since      : 04/05/2012

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
						    <TD></TD>
						    <TD></TD>
							<TD><bean:write name="row" property="goods_item_seq"/></TD>
							<TD><bean:write name="row" property="cntr_no"/></TD>
							<TD><bean:write name="row" property="cntr_list_seq"/></TD>
							<TD><bean:write name="row" property="cntr_tpsz_cd"/></TD>
							<TD><bean:write name="row" property="goods_pkg"/></TD>
							<TD><bean:write name="row" property="goods_pkg_type"/></TD>
							<TD><bean:write name="row" property="goods_gross_wgt"/></TD>
							<TD><bean:write name="row" property="goods_gross_wgt_unit"/></TD>
							<TD><bean:write name="row" property="goods_net_wgt"/></TD>
							<TD><bean:write name="row" property="goods_net_wgt_unit"/></TD>
							<TD><bean:write name="row" property="goods_pos_no"/></TD>
							<TD><bean:write name="row" property="goods_pkg_id"/></TD>
							<TD><bean:write name="row" property="z_number"/></TD>
							<TD><bean:write name="row" property="b_number"/></TD>
							<TD><bean:write name="row" property="cntr_desc"/></TD>
							<TD><bean:write name="row" property="msg_no"/></TD>
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
