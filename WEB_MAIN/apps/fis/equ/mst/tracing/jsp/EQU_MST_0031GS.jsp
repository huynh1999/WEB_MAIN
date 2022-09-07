<%--
=========================================================
*@FileName   : EQU_MST_0030GS.jsp
*@FileTitle  : Tracing Management
*@Description: Tracing Management
*@author     : Daesoo Kang - Cyberlogitec
*@version    : 1.0 - 10/15/2009
*@since      : 10/15/2009

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
				<% int loopNum = 1;%>
				<SHEET>
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
					<logic:iterate id="row" name="rowSet">
						<tr>
							<TD></TD>
							<TD></TD>
							<TD><%= loopNum++ %></TD>
							<TD><![CDATA[<bean:write name="row" property="trdp_cd"/>]]></TD>
							<TD><bean:write name="row" property="trdp_nm"/></TD>
							<TD><![CDATA[<bean:write name="row" property="cnee_trdp_cd"/>]]></TD>
							<TD><bean:write name="row" property="cnee_trdp_nm"/></TD>
							<TD><![CDATA[<bean:write name="row" property="ac_ship_cd"/>]]></TD>
							<TD><bean:write name="row" property="ac_ship_nm"/></TD>
							<TD><![CDATA[<bean:write name="row" property="ship_trdp_cd"/>]]></TD>
							<TD><bean:write name="row" property="ship_trdp_nm"/></TD>
							<TD><![CDATA[<bean:write name="row" property="trnk_vsl_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="trnk_vsl_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cntr_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cntr_tpsz_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="lstm_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pol_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pol_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pod_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pod_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="etd_dt_tm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="eta_dt_tm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="dis_dt_tm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="n1st_wgn_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="eta_bod_dt_tm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="etd_bod_dt_tm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="n2nd_wgn_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cur_sts_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="fnl_dest_loc_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="eta_fd_dt_tm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ata_fd_dt_tm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="tot_tm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="trac_rmk"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="intg_bl_seq"/>]]></TD>
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
