<%--
=========================================================
*@FileName   : OTH_OPR_0011GS.jsp
*@FileTitle  : OTH_SALES CONTAINER
*@Description: OTH_SALES CONTAINER
*@author     : Chungrue - Cyberlogitec
*@version    : 1.0 - 2011/11/18
*@since      : 2011/11/18

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
				<SHEET>
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
					<logic:iterate id="row" name="rowSet">
						<tr>
                            <TD></TD>
							<TD><![CDATA[<bean:write name="row" property="cntr_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cntr_tpsz_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="seal_no1"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cntr_ref_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cgo_pck_qty"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cgo_wgt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cgo_wgt1"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cgo_meas"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cgo_meas1"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pkup_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="lst_free_dt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cntr_seq"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="oth_seq"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ref_no"/>]]></TD>
							<TD></TD>
							
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
