<%--
=========================================================
*@FileName   : WHM_WHM_0001_WHGS.jsp
*@FileTitle  : Warehouse Entry
*@Description: 
*@author     : Vinh Vo - Dou
*@version    : 1.0 - 2014/12/23
*@since      : 2014/12/23

*@Change history:
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
				<bean:define id="rowSet" name="EventResponse" property="listVal"/>
				<SHEET>
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
					<logic:iterate id="row" name="rowSet">
						<tr>
							<TD><![CDATA[U]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cntc_pson_seq"/>]]></TD>
							<TD></TD>
							<TD><![CDATA[<bean:write name="row" property="rep_flg"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rcv_eml_flg"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="cntc_pson_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cntc_pson_phn_no" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cntc_pson_fax_no" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cntc_pson_eml_addr" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cntc_pson_rmk"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rcv_eml_flg"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rep_flg"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="delt_flg"/>]]></TD>                          
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
