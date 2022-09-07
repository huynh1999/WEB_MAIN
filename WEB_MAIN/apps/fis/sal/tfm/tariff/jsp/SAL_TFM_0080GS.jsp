<%--
=========================================================
*@FileName   : SAL_TFM_0080GS.jsp
*@FileTitle  : Rate Management
*@Description: Rate Management
*@author     : 
*@version    : 1.0 - 05/23/2017
*@since      : 

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
				<bean:define id="tmpMapVal" name="EventResponse" property="mapVal"/>
				<bean:define id="strIdx" name="tmpMapVal" property="beginIdx"/>
				<% 
				boolean isBegin = true;
				int cnt = Integer.parseInt(strIdx.toString());
				%>
				<bean:define id="rowSet" name="EventResponse" property="listVal"/>
				<SHEET>
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
					<logic:iterate id="row" name="rowSet">
						<tr>
							<TD></TD>
							<TD></TD>
							<TD></TD>
							<TD><![CDATA[<bean:write name="row" property="rt_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pol_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pol_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pod_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pod_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="etd_dt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="eta_dt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="vld_fm_dt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="vld_to_dt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ref_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cntr_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cntr_tpsz_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cntr_ttl_qty"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cntr_usd_qty"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cntr_remain_qty"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ext_flg"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="mod_cd"/>]]></TD>							
							<TD><![CDATA[<bean:write name="row" property="svc_lane_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rt_sts_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="buy_rt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="buy_curr_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="buy_term_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="sell_rt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="sell_curr_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="sell_term_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ts_port_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ts_port_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cmdt_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cmdt_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rt_ut_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rt_tp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cgo_tp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="crr_trdp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="crr_trdp_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="bil_crr_trdp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="bil_crr_trdp_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="sls_ofc_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="sls_usr_id"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="trkr_trdp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="trkr_trdp_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="fm_svc_term_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="to_svc_term_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rgst_usrid"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rgst_tms"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="modi_usrid"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="modi_tms"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rt_rmk"/>]]></TD>
							<TD><![CDATA[<% if(isBegin){ isBegin = false; %><bean:write name="tmpMapVal" property="pagingTbl"/><%}%>]]></TD>
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
