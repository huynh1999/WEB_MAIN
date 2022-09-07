<%--
=========================================================
*@FileName   : AIC_BMD_0010GS.jsp
*@FileTitle  : Carrier Schedule 등록 및 수정
*@Description: Carrier Schedule 등록 및 수정
*@author     : Choi,Gil-Ju - Cyberlogitec
*@version    : 1.0 - 03/18/2009
*@since      : 03/18/2009

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
						<TD></TD>
						<TD></TD>
						<TD></TD>
						
                        <TD><![CDATA[<bean:write name="row" property="trdp_cd"/>]]></TD>
						<TD><![CDATA[<bean:write name="row" property="trdp_nm"/>]]></TD>
						
						<TD><![CDATA[<bean:write name="row" property="flt_no"/>]]></TD>
						<TD><![CDATA[<bean:write name="row" property="dep_loc_cd"/>]]></TD>
						<TD><![CDATA[<bean:write name="row" property="dest_loc_cd"/>]]></TD>
						
						<TD><![CDATA[<bean:write name="row" property="wkdy_mon_flg"/>]]></TD>
						<TD><![CDATA[<bean:write name="row" property="wkdy_tue_flg"/>]]></TD>
						<TD><![CDATA[<bean:write name="row" property="wkdy_wed_flg"/>]]></TD>
						<TD><![CDATA[<bean:write name="row" property="wkdy_thu_flg"/>]]></TD>
						<TD><![CDATA[<bean:write name="row" property="wkdy_fri_flg"/>]]></TD>
						<TD><![CDATA[<bean:write name="row" property="wkdy_sat_flg"/>]]></TD>
						<TD><![CDATA[<bean:write name="row" property="wkdy_sun_flg"/>]]></TD>
						
						<TD><![CDATA[<bean:write name="row" property="dep_hrmnt"/>]]></TD>
						<TD><![CDATA[<bean:write name="row" property="arr_hrmnt"/>]]></TD>
						
						<TD><![CDATA[<bean:write name="row" property="dur_dys_qty"/>]]></TD>
						
						<TD><![CDATA[<bean:write name="row" property="ts1_arpt_loc_cd"/>]]></TD>
						<TD><![CDATA[<bean:write name="row" property="ts1_dur_dys_qty"/>]]></TD>
						<TD><![CDATA[<bean:write name="row" property="ts1_arr_hrmnt"/>]]></TD>
						<TD><![CDATA[<bean:write name="row" property="ts1_trdp_nm"/>]]></TD>
						<TD><![CDATA[<bean:write name="row" property="ts1_flt_no"/>]]></TD>
						
						<TD><![CDATA[<bean:write name="row" property="ts2_arpt_loc_cd"/>]]></TD>
						<TD><![CDATA[<bean:write name="row" property="ts2_dur_dys_qty"/>]]></TD>
						<TD><![CDATA[<bean:write name="row" property="ts2_arr_hrmnt"/>]]></TD>
						<TD><![CDATA[<bean:write name="row" property="ts2_trdp_nm"/>]]></TD>
						<TD><![CDATA[<bean:write name="row" property="ts2_flt_no"/>]]></TD>
						
						<TD><![CDATA[<bean:write name="row" property="rmk"/>]]></TD>
						
						<TD><![CDATA[<bean:write name="row" property="air_skd_seq"/>]]></TD>
						<TD><![CDATA[<bean:write name="row" property="prd_dt"/>]]></TD>
						<TD><![CDATA[<bean:write name="row" property="ts1_trdp_cd"/>]]></TD>
						<TD><![CDATA[<bean:write name="row" property="ts2_trdp_cd"/>]]></TD>
						
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
