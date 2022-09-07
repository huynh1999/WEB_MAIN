<%--
=========================================================
*@FileName   : 
*@FileTitle  : 
*@Description: 
*@author     : 
*@version    : 
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
				<% int cnt = 0; %>
				<% boolean isBegin = true; %>
				<bean:define id="tmpMapVal" name="EventResponse" property="mapVal"/>
				<bean:define id="rowSet" name="EventResponse" property="listVal"/>
				<SHEET>
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
					<logic:iterate id="row" name="rowSet">
						<tr>	
							<TD><![CDATA[<bean:write name="row" property="rnum" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="block_flag" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="wo_no" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ref_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="master_bl_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="house_bl_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="etd_dt_tm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="eta_dt_tm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="wo_tp_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="trucker_trdp_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pickup_trdp_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="delivery_trdp_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="return_trdp_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pol_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pod_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cgo_pck_qty"/>]]></TD>	
							<TD><![CDATA[<bean:write name="row" property="act_wgt_k" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="act_wgt_l"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="lnr_trdp_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ofc_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="opr_usrid"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="edi_status"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="intg_bl_seq"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="biz_clss_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="return_trdp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="air_sea_clss_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="trucker_trdp_cd"/>]]></TD>
							<TD></TD>
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
