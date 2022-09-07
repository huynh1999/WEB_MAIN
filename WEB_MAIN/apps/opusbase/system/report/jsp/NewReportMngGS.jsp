<%--
=========================================================
*Copyright(c) 2008 CyberLogitec. All Rights Reserved.
=========================================================

=========================================================
*@FileName   : MENUGS.jsp
*@FileTitle  : 메뉴 데이터 표시
*@Description: 메뉴의 관리
*@author     : Duc.Nguyen
*@version    : 1.0 - 2017/12/06
*@since      : 2017/12/06

*@Change history:
=========================================================
--%>
<%@ page contentType="text/xml; charset=UTF-8"%>
<%@page pageEncoding="UTF-8"%>
<%@include file="./../../../../../../../../syscommon/header/CLTGSHeader.jsp"%>

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
					<logic:iterate id="row" name="rowSet">
						<tr>
							<TD></TD>
							<TD></TD>
							<TD></TD>
							<TD><![CDATA[<bean:write name="row" property="mdl_id" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rpt_id" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rpt_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="call_id" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="purp_desc" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="mrd_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="mrd_path_cd" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ppr_cd" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="lang_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="chk_flg"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="priv_flg"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rmk"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="qry_ctnt"/>]]></TD>							
							<TD></TD>							
							<TD><![CDATA[<bean:write name="row" property="delt_rsn_rmk"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pdf_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pdf_path"/>]]></TD>
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
