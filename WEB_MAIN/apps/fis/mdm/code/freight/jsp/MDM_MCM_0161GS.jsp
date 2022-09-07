<%--
=========================================================
*@FileName   : MDM_MCM_0160GS.jsp
*@FileTitle  : Freight Code
*@Description: Freight Code
*@author     : Choi,Gil-Ju - Cyberlogitec
*@version    : 1.0 - 01/14/2009
*@since      : 01/14/2009

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
				<bean:define id="rowSet" name="EventResponse" property="listVal"/>
				<SHEET>
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
					<logic:iterate id="row" name="rowSet">
						<tr>	
							<TD><![CDATA[<bean:write name="row" property="modi_tms"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="modi_usrid"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="his_type"/>]]></TD>
                            
							<TD><bean:write name="row" property="frt_cd"/></TD>
							<TD><![CDATA[<bean:write name="row" property="frt_cd_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="frt_cd_locl_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="frt_curr"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="pfmc_flg"/>]]></TD>
                            
                            <TD><![CDATA[<bean:write name="row" property="tax_flg"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="tax_rate"/>]]></TD>
                            
                            <!-- #1098 [BNX] INDIA 오피스 - 요구사항 항목 -->
                            <TD><![CDATA[<bean:write name="row" property="tax_rate1"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="tax_rate2"/>]]></TD>
                            
                            <TD><![CDATA[<bean:write name="row" property="whld_tax_rate"/>]]></TD>
                            
                            <TD><![CDATA[<bean:write name="row" property="gl_cd_rev" filter="false"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="gl_rmk_rev" filter="false"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="gl_cd_cost" filter="false"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="gl_rmk_cost" filter="false"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="gl_cd_prnr" filter="false"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="gl_rmk_prnr" filter="false"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="gl_cd_prnr2" filter="false"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="gl_rmk_prnr2" filter="false"/>]]></TD>
							
                            <TD><![CDATA[<bean:write name="row" property="ar_flg"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="ap_flg"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="dc_flg"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="gnr_flg"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="oim_flg"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="oih_flg"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="aim_flg"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="aih_flg"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="oem_flg"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="oeh_flg"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="aem_flg"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="aeh_flg"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="wms_flg"/>]]></TD>							
							<TD><![CDATA[<bean:write name="row" property="frt_clss_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="srt_seq"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="use_flg"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="dflt_flg"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="frt_grp_cd"/>]]></TD>
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
