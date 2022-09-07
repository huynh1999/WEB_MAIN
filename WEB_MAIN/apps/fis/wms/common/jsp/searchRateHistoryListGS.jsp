<%--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : WHICItemListPopupGS.jsp
*@FileTitle  : Inbound Complete Search
*@author     : Hoai.Vo
*@version    : 1.0
*@since      : 2015/06/05
=========================================================--%>

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
							<TD></TD>
							<TD><bean:write name="row" property="ctrt_no"/></TD>
							<TD><bean:write name="row" property="sb_cls_cd"/></TD>
							<TD><bean:write name="row" property="hst_tp_nm"/></TD>
							<TD><bean:write name="row" property="cust_cd"/></TD>
							<TD><bean:write name="row" property="cust_nm"/></TD>
							<TD><bean:write name="row" property="rate_tp_cd"/></TD>
							<TD><bean:write name="row" property="frt_cd"/></TD>
							<TD><bean:write name="row" property="frt_nm"/></TD>
							<TD><bean:write name="row" property="unit_cd"/></TD>
							<TD><bean:write name="row" property="unit_cd2"/></TD>
							<TD><bean:write name="row" property="curr_cd"/></TD>
							<TD><bean:write name="row" property="unit_price"/></TD>
							<TD><bean:write name="row" property="item_cd"/></TD>
							<TD><bean:write name="row" property="eff_fr_dt"/></TD>
							<TD><bean:write name="row" property="eff_to_dt"/></TD>
							<TD><bean:write name="row" property="rmk"/></TD>
							<TD><bean:write name="row" property="rgst_id"/></TD>
							<TD><bean:write name="row" property="rgst_sys_dt"/></TD>
							
							<TD><bean:write name="row" property="rate_no"/></TD>
							<TD><bean:write name="row" property="rate_seq"/></TD>
							<TD><bean:write name="row" property="ofc_cd"/></TD>
							<TD><bean:write name="row" property="fix_rate_flg"/></TD>
							<TD><bean:write name="row" property="frt_cd"/></TD>
							<TD><bean:write name="row" property="frt_nm"/></TD>
							<TD><bean:write name="row" property="cond_first"/></TD>
							<TD><bean:write name="row" property="cond_second"/></TD>
							<TD><bean:write name="row" property="ext_rate"/></TD>
							<TD><bean:write name="row" property="int_rate"/></TD>
							<TD><bean:write name="row" property="full_mon_rate"/></TD>
							<TD><bean:write name="row" property="half_mon_rate"/></TD>
							<TD><bean:write name="row" property="week_rate"/></TD>
							<TD><bean:write name="row" property="day_opt"/></TD>
							<TD><bean:write name="row" property="day_rate"/></TD>
							<TD><bean:write name="row" property="frt_mode"/></TD>

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
