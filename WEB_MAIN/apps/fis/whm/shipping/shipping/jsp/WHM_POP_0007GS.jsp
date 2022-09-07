<%--
=========================================================
*@FileName   : WHM_POP_0007GS.jsp
*@FileTitle  : CMM
*@Description: PO Item search pop
*@author     : 이광훈 - PO Item search pop
*@version    : 1.0 - 01/23/2008
*@since      : 01/23/2008

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
			
			<bean:define id="tmpMapVal" name="EventResponse" property="mapVal" />
				<% boolean isBegin = true; %>
				<% int cnt = 0; %>
				
				<bean:define id="rowSet" name="EventResponse" property="listVal"/>
				<SHEET>
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
					<logic:iterate id="row" name="rowSet">
						<tr>	
							<TD></TD>
							<TD><bean:write name="row" property="cust_itm_id"/></TD>
							<TD><bean:write name="row" property="itm_cd"/></TD>
							<TD><bean:write name="row" property="itm_nm"/></TD>
							<TD><bean:write name="row" property="itm_ut_cd"/></TD>
							<TD><bean:write name="row" property="itm_inr_qty"/></TD>
							<TD><bean:write name="row" property="loc_cd"/></TD>
							<TD><bean:write name="row" property="ttl_ctn_qty"/></TD>
							<TD><bean:write name="row" property="ttl_ea_qty"/></TD>
							<TD><bean:write name="row" property="ttl_qty"/></TD>
							<TD><bean:write name="row" property="ttl_wgt_kgs"/></TD>
							<TD><bean:write name="row" property="ttl_wgt_lbs"/></TD>
							<TD><bean:write name="row" property="ttl_vol_cbm"/></TD>
							<TD><bean:write name="row" property="ttl_vol_cft"/></TD>
							
							<TD><bean:write name="row" property="itm_wgt"/></TD>
							<TD><bean:write name="row" property="itm_wgt_lbs"/></TD>
							<TD><bean:write name="row" property="act_itm_wgt"/></TD>
							<TD><bean:write name="row" property="itm_vol"/></TD>
							<TD><bean:write name="row" property="itm_vol_cft"/></TD>
							<TD><bean:write name="row" property="itm_len"/></TD>
							<TD><bean:write name="row" property="itm_wdt"/></TD>
							<TD><bean:write name="row" property="itm_hgt"/></TD>
							<TD><bean:write name="row" property="item_sys_no"/></TD>
							
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
