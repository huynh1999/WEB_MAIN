<%--
=========================================================
*@FileName   : PFM_MGT_0090_1GS.jsp
*@FileTitle  : G/L Report
*@Description: G/L Report
*@author     : Lee, Hae Kyoung - Cyberlogitec
*@version    : 1.0 - 2014/06/11
*@since      : 2014/06/11

*@Change history:
=========================================================
--%>
<%@ page contentType="text/xml; charset=UTF-8"%>
<%@page pageEncoding="UTF-8"%>
<%@include file="./../../../../../../syscommon/header/CLTGSHeader.jsp"%>
<%-- 정상처리 --%>
<logic:empty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
		<logic:notEmpty name="EventResponse" property="mapVal">
			<bean:define id="valMap" name="EventResponse" property="mapVal"/>
			<FIELD>
				<DATA TOTAL="1">	
					<ret_msg><![CDATA[<bean:write name="valMap" property="ret_msg"/>]]></ret_msg>
				</DATA>
			</FIELD>
		</logic:notEmpty>

		<logic:empty name="EventResponse" property="mapVal">
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
                            <TD><bean:write name="row" property="fr_curr_cd"/></TD>
                            <TD><bean:write name="row" property="fch_rt"/></TD>
							<TD><bean:write name="row" property="xch_rt"/></TD>
							<TD><bean:write name="row" property="ibflag"/></TD>
			            </tr>
					</logic:iterate>
					</DATA>
				</SHEET>
			</logic:notEmpty>
		</logic:empty>
</logic:empty>
<%-- 오류발생 --%>
<logic:notEmpty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
	<ERROR>
		<MESSAGE><![CDATA[ <bean:message name="com.clt.framework.core.comm.EXCEPTION_OBJECT      " property="message"/>]]> </MESSAGE>
	</ERROR>
</logic:notEmpty>