<%--
=========================================================
*@FileName   : MGT_EQS_0011GS.jsp
*@FileTitle  : EQ Status
*@Description: EQ Status 정보를 출력한다.
*@author     : 오요한
*@version    : 1.0 - 12/09/2013
*@since      : 12/09/2013

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
			    <%-- <bean:define id="tmpMapVal" name="EventResponse" property="mapVal"/> --%>
				<bean:define id="rowSet" name="EventResponse" property="listVal"/>
				<SHEET>
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
					<logic:iterate id="row" name="rowSet">
						<tr>
						    <TD><![CDATA[<bean:write name="row" property="mbl_no"/>]]></TD>		
						    <TD><![CDATA[<bean:write name="row" property="bl_seq"/>]]></TD>
						    <TD></TD>
						    <TD></TD>
						    <TD><![CDATA[<bean:write name="row" property="mbl_no"/>]]></TD>
						    <TD><![CDATA[<bean:write name="row" property="ref_ofc_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ref_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="mbl_etd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="mbl_eta"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cntr_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="shpr_trdp_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cnee_trdp_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="lnr_trdp_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="mbl_pol_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="mbl_pod_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="air_sea_clss_cd"/>]]></TD>
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
