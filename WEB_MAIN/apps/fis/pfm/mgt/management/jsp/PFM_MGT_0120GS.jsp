<%--
=========================================================
*@FileName   : PFM_MGT_0120.jsp
*@FileTitle  : Customer Performance Report
*@Description: Customer Performance Report
*@author     : Cyberlogitec
*@version    : 1.0 - 02/12/2013
*@since      : 02/12/2013

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
					<td><bean:write name="row" property="rank"/></td>
					<td><bean:write name="row" property="trdp_nm"/></td>
					<td><bean:write name="row" property="dept_nm"/></td>
					<td><bean:write name="row" property="rep_cmdt_nm"/></td>
					<td><bean:write name="row" property="pol_nm"/></td>
					<td><bean:write name="row" property="pod_nm"/></td>
					<td><bean:write name="row" property="bl_count"/></td>
					<td><bean:write name="row" property="grs_wgt"/></td>
					<td><bean:write name="row" property="grs_wgt1"/></td>
					<td><bean:write name="row" property="meas"/></td>
					<td><bean:write name="row" property="meas1"/></td>
					<td><bean:write name="row" property="chg_wgt"/></td>
					<td><bean:write name="row" property="chg_wgt1"/></td>
				</tr>
			</logic:iterate>
			</DATA>
		</SHEET>
	</logic:notEmpty>
</logic:empty>
<%-- 오류발생 --%>
<logic:notEmpty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
	<ERROR>
		<MESSAGE><![CDATA[<bean:message name="com.clt.framework.core.comm.EXCEPTION_OBJECT      " property="message"/>]]> </MESSAGE>
	</ERROR>
</logic:notEmpty>
