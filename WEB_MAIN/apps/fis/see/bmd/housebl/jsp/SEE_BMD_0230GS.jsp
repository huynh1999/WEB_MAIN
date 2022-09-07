<%--
=========================================================
*@FileName   : SEE_BMD_0230GS.jsp
*@FileTitle  : Coload B/L Search 
*@Description: Coload B/L Search 조회한다.
*@author     : cej
*@version    : 1.0 - 01/14/2009
*@since      : 01/14/2009

*@Change history:
=========================================================
--%>
<%@ page contentType="text/xml; charset=UTF-8"%>
<%@page pageEncoding="UTF-8"%>
<%@include file="./../../../../../../syscommon/header/CLTGSHeader.jsp"%>
<%-- 정상처리 --%>
<logic:empty name="com.clt.framework.core.comm.EXCEPTION_OBJECT">
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
							<TD><% cnt++;%><%= cnt%></TD>
							<TD></TD> 
							<TD><![CDATA[<bean:write name="row" property="hbl_no"/>]]></TD>		
							<TD><![CDATA[<bean:write name="row" property="bl_no"/>]]></TD>		
							<TD><![CDATA[<bean:write name="row" property="xtra_bl_seq"/>]]></TD> 	
							<TD><![CDATA[<bean:write name="row" property="ref_ofc_cd"/>]]></TD>							
							<TD><![CDATA[<bean:write name="row" property="ref_no"/>]]></TD>							
							<TD><![CDATA[<bean:write name="row" property="shp_mod_cd"/>]]></TD>							
							<TD><![CDATA[<bean:write name="row" property="etd_dt_tm"/>]]></TD>							
							<TD><![CDATA[<bean:write name="row" property="prnr_trdp_nm"/>]]></TD> 
							<TD><![CDATA[<bean:write name="row" property="shpr_trdp_nm"/>]]></TD> 
							<TD><![CDATA[<bean:write name="row" property="cnee_trdp_nm"/>]]></TD> 
							<TD><![CDATA[<bean:write name="row" property="ntfy_trdp_nm" filter="false"/>]]></TD> 
							<TD><![CDATA[<bean:write name="row" property="act_shpr_trdp_nm" filter="false"/>]]></TD> 
							<TD><![CDATA[<bean:write name="row" property="vndr_trdp_nm" filter="false"/>]]></TD> 
							<TD><![CDATA[<bean:write name="row" property="trnk_vsl_nm" filter="false"/>]]></TD> 
                            <TD><![CDATA[<bean:write name="row" property="mbl_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="bl_sts_cd"/>]]></TD> 
							<TD><![CDATA[<bean:write name="row" property="intg_bl_seq"/>]]></TD>						
							<TD></TD>
							<TD><![CDATA[<% if(isBegin){ isBegin = false; %><bean:write name="tmpMapVal" property="pagingTbl"/><%}%>]]></TD>
			            </tr>
					</logic:iterate>
					</DATA>
				</SHEET>
				
			</logic:notEmpty>
</logic:empty>
<%-- 오류발생 --%>
<logic:notEmpty name="com.clt.framework.core.comm.EXCEPTION_OBJECT">
	<ERROR>
		<MESSAGE><![CDATA[ <bean:message name="com.clt.framework.core.comm.EXCEPTION_OBJECT" property="message"/>]]> </MESSAGE>
	</ERROR>
</logic:notEmpty>
