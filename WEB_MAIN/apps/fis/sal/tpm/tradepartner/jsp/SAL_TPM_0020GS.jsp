<%--
=========================================================
*@FileName   : SAL_TPM_0020.jsp
*@FileTitle  : Trade Partner ManagementList
*@Description: Trade Partner ManagementList
*@author     : Choi,Gil-Ju - Cyberlogitec
*@version    : 1.0 - 01/07/2009
*@since      : 01/07/2009

*@Change history:
*@author	: Tuan.Chau
*@version	: 2.0 - 14/07/2014
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
							<%-- <TD><% cnt++;%><%= cnt%></TD> --%>
							<%--#1122 [Trade Partner List] Miss data when exporting Excel (All)--%>
							<TD><![CDATA[<bean:write name="row" property="rownum"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="trdp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="trdp_tp_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="shrt_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="acct_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="eng_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="locl_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="lgl_addr"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="eng_addr"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rgst_tp_nm"/>]]></TD>
	 						<TD><![CDATA[<bean:write name="row" property="pic_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pic_phn"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pic_mphn"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pic_fax"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pic_eml"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cnt_locl_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="city_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="state_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="state_locl_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rep_zip"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cb_trdp_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="biz_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ceo_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="dept"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="iata_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="sls_gp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cr_term_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cr_term_dt"/>]]></TD>
							<TD></TD>
							<TD><![CDATA[<bean:write name="row" property="profit_share"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="crd_lmt_amt"/>]]></TD>
							<TD></TD>
							<TD><![CDATA[<bean:write name="row" property="sls_usrnm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="delt_flg"/>]]></TD>
							<TD><![CDATA[<% if(isBegin){ isBegin = false; %><bean:write name="tmpMapVal" property="pagingTbl"/><%}%>]]></TD>
						    <TD><![CDATA[<bean:write name="row" property="rep_phn"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="shrt_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rep_fax"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cnt_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="trdp_tp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rgst_tp_cd"/>]]></TD>
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
