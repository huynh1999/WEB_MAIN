<%--
=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
=========================================================
 
=========================================================
*@FileName   : WHAllcStrgGS.jsp
*@FileTitle  : 
*@Description: 
*@author     : Tien Duong - Cyberlogitec
*@version    : 1.0 - 2016/07/09
*@since      : 2016/07/09

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
				<bean:define id="tmpMap" name="EventResponse" property="mapVal"/>
				<bean:define id="rowSet" name="EventResponse" property="listVal"/>
				<SHEET>
					<ETC-DATA> 
					    <ETC KEY="mess"><bean:write name="tmpMap" property="strMess"/></ETC>
					</ETC-DATA> 
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
					<logic:iterate id="row" name="rowSet">
						<tr>
							<TD></TD>
							<TD></TD>
							<TD></TD>
							<TD><bean:write name="row" property="cust_ord_no"/></TD>
							<TD><bean:write name="row" property="bk_sts_nm"/></TD>
							<TD><bean:write name="row" property="est_out_dt"/></TD>
							<TD><bean:write name="row" property="ship_to"/></TD>
							<TD><bean:write name="row" property="ctrt_no"/></TD>
							<TD><bean:write name="row" property="ctrt_nm"/></TD>
							<TD><bean:write name="row" property="wob_bk_no"/></TD>
							<TD><bean:write name="row" property="bk_date"/></TD>
							<TD><bean:write name="row" property="wh_cd"/></TD>
							<TD><bean:write name="row" property="wh_nm"/></TD>
							<TD><bean:write name="row" property="bk_sts_cd"/></TD>
							<TD></TD>
							<TD></TD>
							<TD></TD>
							<TD></TD>
							<TD></TD>
							<TD></TD>
							<TD></TD>
			            </tr>
					</logic:iterate>
					</DATA>
				</SHEET>
			</logic:notEmpty>
</logic:empty>
<%-- 오류발생 --%>
<logic:notEmpty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
	<ERROR>
		<MESSAGE><![CDATA[ <bean:write name="com.clt.framework.core.comm.EXCEPTION_OBJECT      " property="message"/>]]> </MESSAGE>
	</ERROR>
</logic:notEmpty>
