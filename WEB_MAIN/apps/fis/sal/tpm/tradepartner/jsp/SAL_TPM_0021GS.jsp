<%--
=========================================================
*@FileName   : SAL_TPM_0021GS.jsp
*@FileTitle  : Trade Partner Management
*@Description: Trade Partner Management
*@author     : Choi,Gil-Ju - Cyberlogitec
*@version    : 1.0 - 01/07/2009
*@since      : 01/07/2009

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
							<TD></TD>
							<TD></TD>
							<TD><![CDATA[<bean:write name="row" property="cntc_seq"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="sls_pson_pic" filter="false" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="sls_his_tit" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="sls_his_ctnt" filter="false"/>]]></TD>
							<TD <logic:notEmpty name="row" property="sls_his_flat_nm">IMAGE="0"</logic:notEmpty>></TD>
							<TD><![CDATA[<bean:write name="row" property="rgst_tms"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="sheet1"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="sls_his_flat_url" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="sls_his_flat_nm" filter="false"/>]]></TD>
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