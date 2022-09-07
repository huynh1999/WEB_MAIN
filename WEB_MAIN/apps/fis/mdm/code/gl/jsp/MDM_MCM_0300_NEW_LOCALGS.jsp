<%--
=========================================================
*@FileName   : MDM_MCM_0300_NEW_LOCALGS.jsp
*@FileTitle  : New Local Name
*@Description: New Local Name
*@author     : Thoa Dien - DOU Networks
*@version    : 1.0 - 01/05/2018
*@since      : 01/05/2018

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
				<% 
				boolean isBegin = true;
				int cnt = 0;
				%>
				<SHEET>
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
					<logic:iterate id="row" name="rowSet">
						<tr>
							<TD></TD>
							<TD><% cnt++;%><%= cnt%></TD>
							<TD><![CDATA[<bean:write name="row" property="lcl_co_ofc_cd"  filter="false" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="lcl_ref_cd"  filter="false" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="lcl_nm"  filter="false" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="use_flg"  filter="false" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="blk_flg"  filter="false" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="lcl_cd_tp_cd"  filter="false" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="lcl_rgst_ofc_cd" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="lcl_rgst_usrid" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="lcl_rgst_tms"  filter="false" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="lcl_modi_ofc_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="lcl_modi_usrid"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="lcl_modi_tms"/>]]></TD>
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
