<%--
=========================================================
*@FileName   : MDM_MCM_0330.jsp
*@FileTitle  : Office Code Search
*@Description: Office Code Search
*@author     : Kim,Jin-Hyuk - Cyberlogitec
*@version    : 1.0 - 2011/10/17
*@since      : 2011/10/17

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
				<bean:define id="strIdx" name="tmpMapVal" property="beginIdx"/>
				<% 
				boolean isBegin = true;
				int cnt = Integer.parseInt(strIdx.toString());
				%>
				
				<bean:define id="rowSet" name="EventResponse" property="listVal"/>
				<SHEET>
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
					<logic:iterate id="row" name="rowSet">
						<tr>	
							<TD></TD>
							<TD></TD>
							<TD><% cnt++;%><%= cnt%></TD>
							<TD><![CDATA[<bean:write name="row" property="ofc_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ofc_eng_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="descr" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cnt_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="loc_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="use_flg"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cnt_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="loc_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ofc_addr"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ofc_zip"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ofc_phn"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ofc_fax"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="prnt_ofc_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="prnt_ofc_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rgst_usrid"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rgst_ofc_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rgst_tms"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="modi_usrid"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="modi_ofc_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="modi_tms"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="sls_ofc_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="finc_ofc_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="trdp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="sls_ofc_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="finc_ofc_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="trdp_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="trf_cur_cd"/>]]></TD>
							<TD><![CDATA[<% if(isBegin){ isBegin = false; %><bean:write name="tmpMapVal" property="pagingTbl"/><%}%>]]></TD>
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
