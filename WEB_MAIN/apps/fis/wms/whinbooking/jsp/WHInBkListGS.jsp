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
							<TD></TD>
							<TD><bean:write name="row" property="wib_bk_no"/></TD>
							<TD><bean:write name="row" property="bk_date"/></TD>
							<TD><bean:write name="row" property="bk_sts_nm"/></TD>
							<TD><bean:write name="row" property="ctrt_nm"/></TD>
							<TD><bean:write name="row" property="cust_ord_no"/></TD>
							<TD><bean:write name="row" property="item_cd"/></TD>
							<TD><bean:write name="row" property="item_nm"/></TD>
							<TD><bean:write name="row" property="eq_no"/></TD>
							<TD><bean:write name="row" property="lot_no"/></TD>
							<TD><bean:write name="row" property="item_pkgunit"/></TD>
							<TD><bean:write name="row" property="item_pkgqty"/></TD>
							<TD><bean:write name="row" property="item_cbm"/></TD>
							<TD><bean:write name="row" property="item_cbf"/></TD>
							<TD><bean:write name="row" property="item_grs_kgs"/></TD>
							<TD><bean:write name="row" property="item_grs_lbs"/></TD>
							<TD><bean:write name="row" property="item_net_kgs"/></TD>
							<TD><bean:write name="row" property="item_net_lbs"/></TD>
							<TD><bean:write name="row" property="inbound_dt"/></TD>
							<TD><bean:write name="row" property="exp_dt"/></TD>
							<TD><bean:write name="row" property="lot_04"/></TD>
							<TD><bean:write name="row" property="lot_05"/></TD>
							<TD><bean:write name="row" property="ord_tp_nm"/></TD>
							<TD><bean:write name="row" property="po_no"/></TD>
							<TD><bean:write name="row" property="wh_cd"/></TD>
							<TD><bean:write name="row" property="ref_no"/></TD>
							<TD><bean:write name="row" property="wib_in_no"/></TD>
							<TD><bean:write name="row" property="bk_sts_cd"/></TD>
			            </tr>
					</logic:iterate>
					</DATA>
				</SHEET>
			</logic:notEmpty>
</logic:empty>
<%-- 오류발생 --%>
<logic:notEmpty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
	<ERROR>
		<logic:empty name="systemLanguage">
			<MESSAGE><![CDATA[ <bean:message name="com.clt.framework.core.comm.EXCEPTION_OBJECT      " property="message"/>]]> </MESSAGE>
		</logic:empty>
		<logic:notEmpty name="systemLanguage">
			<MESSAGE><![CDATA[ <bean:write name="com.clt.framework.core.comm.EXCEPTION_OBJECT      " property="message"/>]]> </MESSAGE>
		</logic:notEmpty>
	</ERROR>
</logic:notEmpty>
