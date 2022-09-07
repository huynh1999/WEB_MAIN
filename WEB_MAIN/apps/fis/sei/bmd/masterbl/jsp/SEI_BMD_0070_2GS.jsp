<%--
=========================================================
*@FileName   : SEI_BMD_0070_2GS.jsp
*@FileTitle  : Master B/L Search 
*@Description: Master B/L Search 조회한다.
*@author     : 이광훈 - sea =Export 
*@version    : 1.0 - 01/15/2009
*@since      : 01/15/2009

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
				<bean:define id="rowSet" name="EventResponse" property="listVal"/>
				<SHEET>
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
					<logic:iterate id="row" name="rowSet">
						<tr>
							<TD><![CDATA[<bean:write name="row" property="bl_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="bkg_no"/>]]></TD>
							
							<TD></TD>
							
							<TD><![CDATA[<bean:write name="row" property="shpr_trdp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="shpr_trdp_nm" filter="false"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="cnee_trdp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cnee_trdp_nm" filter="false"/>]]></TD>
							
							
							<TD><![CDATA[<bean:write name="row" property="del_nm"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="express_tp_cd"/>]]></TD>
							<%-- #34257 [BINEX]OIM List 하단 HBL List 항목 추가 --%>
							<%-- 순서 변경 : Express B/L, OB/L Received, Package/Unit, Customer Ref. No, AMS B/L No, ISF No, AR, AP, DC --%>
							<TD><![CDATA[<bean:write name="row" property="org_bl_rcvd_flg"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pck_qty"/> <bean:write name="row" property="pck_ut_nm"/>]]></TD>	
							<TD><![CDATA[<bean:write name="row" property="cust_ref_no" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ams_no" filter="false"/>]]></TD>
							
                            <TD><![CDATA[<bean:write name="row" property="isf_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ar_chk"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="ap_chk"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="dc_chk"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="lnr_trdp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="lnr_trdp_nm" filter="false"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="por_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pol_nm"/>]]></TD>	
							<TD><![CDATA[<bean:write name="row" property="pod_nm"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="cfm_flg"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="clz_flg"/>]]></TD>		
							<TD><![CDATA[<bean:write name="row" property="bl_sts_cd"/>]]></TD>	
							<TD><![CDATA[<bean:write name="row" property="intg_bl_seq"/>]]></TD><!-- OFVFOUR-7951: [JAPT] OPUS down 03/29/2022 -->	
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
