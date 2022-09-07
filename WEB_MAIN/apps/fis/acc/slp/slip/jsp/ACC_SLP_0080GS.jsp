<%--
=========================================================
*@FileName   : ACC_SLP_0080GS.jsp
*@FileTitle  : Accounting Block Maintenance
*@Description: Accounting Block Maintenance
*@author     : LHK - Cyberlogitec
*@version    : 1.0 - 2013/09/30
*@since      : 2013/09/30

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
			<% int cnt = 0; %>
				<bean:define id="rowSet" name="EventResponse" property="listVal"/>
				<SHEET>
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
					<logic:iterate id="row" name="rowSet">
						<tr>
                            <TD><% cnt++;%><%= cnt%></TD>
                            <%-- OFVFOUR-7670 [PQC][Block Management] The system shows "Loading" when clicking the Search button --%>
                            <TD><![CDATA[<bean:write name="row" property="bl_blk_flg"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="bl_dept_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="bl_ref_ofc_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="bl_post_dt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="bl_ref_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="bl_bl_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="bl_shpr_trdp_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="bl_cnee_trdp_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="bl_agent_trdp_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="bl_pol_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="bl_pod_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="bl_vsl_flt"/>]]></TD>
							<TD><![CDATA[]]></TD>
							<TD><![CDATA[<bean:write name="row" property="bl_intg_bl_seq"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="bl_oth_seq"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="bl_jn_flg"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="bl_ey_flg"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="bl_post_dt"/>]]></TD>
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
