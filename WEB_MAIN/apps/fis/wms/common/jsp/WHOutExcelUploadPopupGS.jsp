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
							<TD><bean:write name="row" property="chk"/></TD>
							<TD><bean:write name="row" property="item_cd"/></TD>
							<TD><bean:write name="row" property="item_nm"/></TD>
						    <TD><bean:write name="row" property="lot_no"/></TD>
							<TD><bean:write name="row" property="item_pkgunit"/></TD>
							<TD><bean:write name="row" property="item_pkgqty"/></TD>
							<TD><bean:write name="row" property="item_cbm"/></TD>
							<TD><bean:write name="row" property="item_cbf"/></TD>
							<TD><bean:write name="row" property="item_grs_kgs"/></TD>
							<TD><bean:write name="row" property="item_grs_lbs"/></TD>
							<TD><bean:write name="row" property="item_net_kgs"/></TD>
							<TD><bean:write name="row" property="item_net_lbs"/></TD>
							<TD><bean:write name="row" property="inbound_dt"/></TD>
							<TD><bean:write name="row" property="exp_dt"/></TD>
							<TD><bean:write name="row" property="lot_04"/></TD>
							<TD><bean:write name="row" property="lot_05"/></TD>
							<TD><bean:write name="row" property="cust_item_cd"/></TD>
							<TD><bean:write name="row" property="sao_no"/></TD>
							<TD><bean:write name="row" property="curr_cd"/></TD>
							<TD><bean:write name="row" property="unit_price"/></TD>
							<TD><bean:write name="row" property="item_sys_no"/></TD>
							<TD><bean:write name="row" property="item_ea_qty"/></TD>
							<TD><bean:write name="row" property="pkg_lv1_qty"/></TD>
							<TD><bean:write name="row" property="lv1_cbm"/></TD>
							<TD><bean:write name="row" property="lv1_cbf"/></TD>
							<TD><bean:write name="row" property="lv1_grs_kgs"/></TD>
							<TD><bean:write name="row" property="lv1_grs_lbs"/></TD>
							<TD><bean:write name="row" property="lv1_net_kgs"/></TD>
							<TD><bean:write name="row" property="lv1_net_lbs"/></TD>
							<TD><bean:write name="row" property="ibflag"/></TD>
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
