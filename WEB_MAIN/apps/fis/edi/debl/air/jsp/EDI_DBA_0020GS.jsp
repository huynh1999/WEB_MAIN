<%--
=========================================================
*Copyright(c) 2008 CyberLogitec. All Rights Reserved.
=========================================================

=========================================================
*@FileName   : SEE_BMD_0020GS.jsp
*@FileTitle  : 
*@Description: 
*@author     : Kang,Jung-Gu - Cyberlogitec
*@version    : 1.0 - 02/05/2009
*@since      : 02/05/2009

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
							<TD><bean:write name="row" property="intg_bl_seq"/></TD>
							<TD><bean:write name="row" property="mbl_no"/></TD>
							<TD><bean:write name="row" property="bl_type"/></TD>
							<TD><bean:write name="row" property="sts_cd"/></TD>
							<TD><bean:write name="row" property="zapp_sts_cd"/></TD>
							<TD><bean:write name="row" property="lnr_trdp_nm"/></TD>
							<TD><bean:write name="row" property="flt_no"/></TD>
							<TD><bean:write name="row" property="etd_dt_tm"/></TD>
							<TD><bean:write name="row" property="pod_cd"/></TD>
							<TD><bean:write name="row" property="mbl_pck_qty"/></TD>
							<TD><bean:write name="row" property="mbl_grs_wgt"/></TD>
							<TD><bean:write name="row" property="modi_tms"/></TD>
							<TD IMAGE="0"><bean:message key="Departure"/></TD>
							<TD IMAGE="1"></TD>
							<TD IMAGE="2"></TD>
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
