<%--
=========================================================
*@FileName   : LicPlatUtTpMgmtGS.jsp
*@FileTitle  : License Plate Unit Type
*@Description: 
*@author     : LSY
*@version    : 1.0
*@since      : 10/17/2016

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
				<% 
				boolean isBegin = true;
				int cnt = 1;
				%>
				
				<bean:define id="rowSet" name="EventResponse" property="listVal"/>
				<SHEET>
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
					<logic:iterate id="row" name="rowSet">
						<tr>	
							<TD></TD>
							<TD><% cnt++;%></TD>
							<TD><![CDATA[<bean:write name="row" property="lic_plat_ut_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="lic_plat_desc" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="lic_plat_ut_tp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="use_flg"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="bss_len"/>]]></TD>					
							<TD><![CDATA[<bean:write name="row" property="bss_wdt"/>]]></TD>					
							<TD><![CDATA[<bean:write name="row" property="bss_hgt"/>]]></TD>					
							<TD><![CDATA[<bean:write name="row" property="bss_meas"/>]]></TD>					
							<TD><![CDATA[<bean:write name="row" property="bss_wgt"/>]]></TD>					
							<TD><![CDATA[<bean:write name="row" property="bss_size_ut_cd"/>]]></TD>					
							<TD><![CDATA[<bean:write name="row" property="bss_meas_ut_cd"/>]]></TD>					
							<TD><![CDATA[<bean:write name="row" property="bss_wgt_ut_cd"/>]]></TD>					
							<TD><![CDATA[<bean:write name="row" property="bss_size_ut_nm"/>]]></TD>					
							<TD><![CDATA[<bean:write name="row" property="bss_meas_ut_nm"/>]]></TD>					
							<TD><![CDATA[<bean:write name="row" property="bss_wgt_ut_nm"/>]]></TD>					
							<TD><![CDATA[<bean:write name="row" property="cnvt_len"/>]]></TD>					
							<TD><![CDATA[<bean:write name="row" property="cnvt_wdt"/>]]></TD>					
							<TD><![CDATA[<bean:write name="row" property="cnvt_hgt"/>]]></TD>					
							<TD><![CDATA[<bean:write name="row" property="cnvt_meas"/>]]></TD>					
							<TD><![CDATA[<bean:write name="row" property="cnvt_wgt"/>]]></TD>					
							<TD><![CDATA[<bean:write name="row" property="cnvt_size_ut_cd"/>]]></TD>					
							<TD><![CDATA[<bean:write name="row" property="cnvt_meas_ut_cd"/>]]></TD>					
							<TD><![CDATA[<bean:write name="row" property="cnvt_wgt_ut_cd"/>]]></TD>					
							<TD><![CDATA[<bean:write name="row" property="cnvt_size_ut_nm"/>]]></TD>					
							<TD><![CDATA[<bean:write name="row" property="cnvt_meas_ut_nm"/>]]></TD>					
							<TD><![CDATA[<bean:write name="row" property="cnvt_wgt_ut_nm"/>]]></TD>					
							<TD><![CDATA[<bean:write name="row" property="delt_flg"/>]]></TD>					
							<TD><![CDATA[<bean:write name="row" property="rgst_usrid"/>]]></TD>					
							<TD><![CDATA[<bean:write name="row" property="rgst_ofc_cd"/>]]></TD>					
							<TD><![CDATA[<bean:write name="row" property="rgst_tms"/>]]></TD>					
							<TD><![CDATA[<bean:write name="row" property="modi_usrid"/>]]></TD>					
							<TD><![CDATA[<bean:write name="row" property="modi_ofc_cd"/>]]></TD>					
							<TD><![CDATA[<bean:write name="row" property="modi_tms"/>]]></TD>					
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
