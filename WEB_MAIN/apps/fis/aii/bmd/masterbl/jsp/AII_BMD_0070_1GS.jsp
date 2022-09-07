<%--
=========================================================
*@FileName   : AII_BMD_0070_1GS.jsp
*@FileTitle  : Master B/L Search 
*@Description: MAWB에 속하는 HAWB목록을 조회 
*@author     : Kang,Jung-Gu 
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
				<bean:define id="rowSet" name="EventResponse" property="listVal"/>
				<SHEET>
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
					<logic:iterate id="row" name="rowSet">
						<tr>
							<TD><% cnt++;%><%= cnt%></TD>
							<TD></TD>
							<TD><![CDATA[<bean:write name="row" property="bkg_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="bl_no"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="shpr_trdp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="shpr_trdp_nm" filter="false"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="cnee_trdp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cnee_trdp_nm" filter="false"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="lnr_trdp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="lnr_trdp_nm" filter="false"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="por_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pol_nm"/>]]></TD>	
							<TD><![CDATA[<bean:write name="row" property="pod_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="del_nm"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="cfm_flg"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="clz_flg"/>]]></TD>		
							<TD><![CDATA[<bean:write name="row" property="bl_sts_cd"/>]]></TD>		
							<TD><![CDATA[<bean:write name="row" property="intg_bl_seq"/>]]></TD><!-- OFVFOUR-7951: [JAPT] OPUS down 03/29/2022 -->
							<TD><![CDATA[<bean:write name="row" property="pck_qty"/>]]></TD>		
							<TD><![CDATA[<bean:write name="row" property="pck_ut_nm"/>]]></TD>		
							<TD><![CDATA[<bean:write name="row" property="grs_wgt"/>]]></TD>		
							<TD><![CDATA[<bean:write name="row" property="grs_wgt1"/>]]></TD>		
							<TD><![CDATA[<bean:write name="row" property="chg_wgt"/>]]></TD>		
							<TD><![CDATA[<bean:write name="row" property="chg_wgt1"/>]]></TD>		
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
