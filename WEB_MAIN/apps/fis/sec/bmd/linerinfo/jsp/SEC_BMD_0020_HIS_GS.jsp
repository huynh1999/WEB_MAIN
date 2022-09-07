<%--
=========================================================
*@FileName   : SEE-BMD-0010GS.jsp
*@FileTitle  : 최상위 메뉴 표시
*@Description: 최상위 메뉴의 관리
*@author     : 이광훈 - 주문
*@version    : 1.0 - 12/22/2008
*@since      : 12/22/2008

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
			<bean:define id="rowSet" name="EventResponse" property="listVal" />
				
				<SHEET>
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
					<logic:iterate id="row" name="rowSet">
						<tr>	
							<TD><![CDATA[<bean:write name="row" property="mbl_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="lnr_bkg_no"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="event_status"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="event_date" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="event_loc_nm" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cntr_no" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cntr_tp" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="voyage_no" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="vsl_nm" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="por_loc_nm" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pol_loc_nm" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pod_loc_nm" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="del_loc_nm" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rgst_tms" />]]></TD>
							
							<%--#3764 [BINEX] CONTAINER MOVEMENT EVENT UPDATE TO SHOW 315 HISTORY --%>
							<TD><![CDATA[<bean:write name="row" property="src" />]]></TD>
							
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
