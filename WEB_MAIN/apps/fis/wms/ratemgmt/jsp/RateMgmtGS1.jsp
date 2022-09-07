<%@ page contentType="text/xml; charset=UTF-8"%>
<%@page pageEncoding="UTF-8"%>
<%@include file="./../../../../../../syscommon/header/CLTGSHeader.jsp"%>
<%-- 정상처리 --%>
<logic:empty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
	<COMON>
				<bean:define id="mapVal" name="EventResponse" property="mapVal"/>
				<bean:define id="rowSet" name="mapVal" property="mainRateList"/>
			<SHEET1>
				<SHEET>
					<DATA TOTAL="<bean:write name="mapVal" property="mainRateTotal"/>">
					<logic:iterate id="row" name="rowSet">
						<tr>
							<TD></TD>
							<TD></TD>
							<TD><bean:write name="row" property="ctrt_no"/></TD>
							<TD><bean:write name="row" property="sb_cls_cd"/></TD>
							<TD><bean:write name="row" property="rate_no"/></TD>
							<TD>Warehouse</TD>
							<TD><bean:write name="row" property="branch"/></TD>
							<TD><bean:write name="row" property="eff_fr_dt"/></TD>
							<TD><bean:write name="row" property="eff_to_dt"/></TD>
							<TD><bean:write name="row" property="loc_cd"/></TD>
							<TD><bean:write name="row" property="loc_nm"/></TD>
							<TD><bean:write name="row" property="commodity_desc"/></TD>
							<TD></TD>
							<TD>N</TD>
							<TD>N</TD>
			            </tr>
					</logic:iterate>
					</DATA>
				</SHEET>
			</SHEET1>
		<%--  		<SHEET>
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
					<logic:iterate id="row" name="rowSet">
						<tr>
							<TD></TD>
							<TD></TD>
							<TD><bean:write name="row" property="ctrt_no"/></TD>
							<TD><bean:write name="row" property="sb_cls_cd"/></TD>
							<TD><bean:write name="row" property="rate_no"/></TD>
							<TD><bean:write name="row" property="frt_mode"/></TD>
							<TD><bean:write name="row" property="branch"/></TD>
							<TD><bean:write name="row" property="eff_fr_dt"/></TD>
							<TD><bean:write name="row" property="eff_to_dt"/></TD>
							<TD><bean:write name="row" property="loc_cd"/></TD>
							<TD><bean:write name="row" property="loc_nm"/></TD>
							<TD><bean:write name="row" property="commodity_desc"/></TD>
							<TD></TD>
							<TD>N</TD>
							<TD>N</TD>
			            </tr>
					</logic:iterate>
					</DATA>
				</SHEET>
			--%>
	</COMON>
</logic:empty>
<%-- 오류발생 --%>
<logic:notEmpty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
	<ERROR>
		<MESSAGE><![CDATA[ <bean:message name="com.clt.framework.core.comm.EXCEPTION_OBJECT      " property="message"/>]]> </MESSAGE>
	</ERROR>
</logic:notEmpty>
