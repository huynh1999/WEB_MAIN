<%--
=========================================================
*@FileName   : MDM_MCM_0250GS.jsp
*@FileTitle  : Trade Partner ManagementList
*@Description: Trade Partner ManagementList
*@author     : Choi,Gil-Ju - Cyberlogitec
*@version    : 1.0 - 01/07/2009
*@since      : 01/07/2009

*@Change history: #2827 : [BINEX]Fresh Cargo C/I & P/L 기능 수정
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
				%>
				<bean:define id="rowSet" name="EventResponse" property="listVal"/>
				<SHEET>
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
					<logic:iterate id="row" name="rowSet">
						<tr>
							<TD></TD>
							<TD></TD>
							<TD><![CDATA[<bean:write name="row" property="item_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="attr_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="vsbl_flg"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="var_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="lbl_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pck_tp_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="sz_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="grs_kgs_wgt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="grs_lbs_wgt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="net_kgs_wgt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="net_lbs_wgt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inv_amt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ctrt_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="item_sys_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="item_atrr_seq"/>]]></TD>
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
