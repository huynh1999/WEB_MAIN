<%--
=========================================================
*@FileName   : SEE_BKG_0030GS.jsp
*@FileTitle  : Carrier Booking / Customer Booking split
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
				<bean:define id="rowSet" name="EventResponse" property="listVal"/>
				<SHEET>
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
					<logic:iterate id="row" name="rowSet">
						<tr>
						    <TD><![CDATA[<bean:write name="row" property="lnr_bkg_no" filter="false"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="bkg_sts_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="bkg_no" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="biz_clss_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="act_shpr_trdp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="act_shpr_trdp_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="lnr_trdp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="lnr_trdp_nm" filter="false"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="trnk_vsl_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="trnk_voy"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="por_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="por_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pol_cd"/>]]></TD>	
							<TD><![CDATA[<bean:write name="row" property="pol_nm" filter="false"/>]]></TD>	
							<TD><![CDATA[<bean:write name="row" property="pod_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pod_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="del_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="del_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pck_qty"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pck_ut_cd"/>]]></TD>	
							<TD><![CDATA[<bean:write name="row" property="pck_ut_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="grs_wgt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="grs_wgt1"/>]]></TD>							
							<TD><![CDATA[<bean:write name="row" property="meas"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="meas1"/>]]></TD>

							<TD><![CDATA[<bean:write name="row" property="bkg_seq"/>]]></TD>
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