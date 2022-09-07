<%--
=========================================================
*@FileName   : SEE_AMS_0022GS.jsp
*@FileTitle  : SEE AMS 
*@Description: SEE AMS 
*@author     : Chungrue
*@version    : 1.0 - 2012/09/10
*@since      : 2012/09/10

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
					<% int cnt=1; %>
					<logic:iterate id="row" name="rowSet">
						<tr>	
							<TD></TD>
							<TD><![CDATA[<bean:write name="row" property="cntr_list_seq"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="shp_cmdt_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="shp_cmdt_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pck_qty"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pck_ut_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="shp_cmdt_wgt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="shp_cmdt_meas"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="item_rmk"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="dg_cd_tp"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="dg_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="dg_cntc_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="shp_cmdt_seq"/>]]></TD>
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
		<MESSAGE><![CDATA[ <bean:message name="com.clt.framework.core.comm.EXCEPTION_OBJECT      " property="message"/>]]> </MESSAGE>
	</ERROR>
</logic:notEmpty>
