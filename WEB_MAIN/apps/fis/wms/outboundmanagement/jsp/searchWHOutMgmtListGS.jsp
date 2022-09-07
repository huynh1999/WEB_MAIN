<%@ page contentType="text/xml; charset=UTF-8"%>
<%@page pageEncoding="UTF-8"%>
<%@include file="./../../../../../../syscommon/header/CLTGSHeader.jsp"%>
<%-- 정상처리 --%>
<logic:empty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
		<%-- 조회 결과가 없는 경우 --%>
			<logic:empty name="EventResponse" property="mapVal">
				<SHEET>
					<DATA TOTAL="0"></DATA>
				</SHEET>	
			</logic:empty>
		<%-- 조회 결과가 있는 경우 --%>
			<logic:notEmpty name="EventResponse" property="mapVal">
				<bean:define id="rowSet" name="EventResponse" property="mapVal"/>
				
				<logic:notEmpty name="rowSet" property="sheet6">
 					<bean:define id="rowSetSheet6" name="rowSet" property="sheet6"/>
 					
 					<bean:size id="sheet6_size" name="rowSetSheet6"/>
					<SHEET6>
						<DATA TOTAL="<bean:write name="sheet6_size" />">
						<logic:iterate id="rowSheet" name="rowSetSheet6">
							<tr>
								<TD></TD>
								<TD></TD>
								<TD><bean:write name="rowSheet" property="rate_tp_cd"/></TD>
								<TD><bean:write name="rowSheet" property="frt_cd"/></TD>
								<TD><bean:write name="rowSheet" property="frt_nm"/></TD>
								<TD><bean:write name="rowSheet" property="unit_cd"/></TD>
								<TD><bean:write name="rowSheet" property="unit_cd2"/></TD>
								<TD><bean:write name="rowSheet" property="curr_cd"/></TD>
								<TD><bean:write name="rowSheet" property="unit_price"/></TD>
								<TD><bean:write name="rowSheet" property="qty"/></TD>
								<TD><bean:write name="rowSheet" property="inv_amt"/></TD>
								<TD><bean:write name="rowSheet" property="item_cd"/></TD>
								<!--  #3388-[BINEX WMS4.0] RATE IN & OUT MINIMUM CHARGE - Vien.Cao -->
								<TD><bean:write name="rowSheet" property="rmk"/></TD>
								<TD><bean:write name="rowSheet" property="cls_no"/></TD>
								<TD><bean:write name="rowSheet" property="cls_dt"/></TD>
								<TD><bean:write name="rowSheet" property="inv_no"/></TD>
								<TD><bean:write name="rowSheet" property="wh_cd"/></TD>
								<TD><bean:write name="rowSheet" property="wob_bk_no"/></TD>
								<TD><bean:write name="rowSheet" property="cust_ord_no"/></TD>
								<TD><bean:write name="rowSheet" property="ctrt_no"/></TD>
								<TD><bean:write name="rowSheet" property="ofc_cd"/></TD>
								<TD><bean:write name="rowSheet" property="inv_ttl_amt"/></TD>
								<TD><bean:write name="rowSheet" property="sell_buy_tp_cd"/></TD>
								<TD><bean:write name="rowSheet" property="frt_seq"/></TD>
								<TD><bean:write name="rowSheet" property="cust_cd"/></TD>
								<TD><bean:write name="rowSheet" property="wib_bk_frt_seq"/></TD>
								<TD><bean:write name="rowSheet" property="rating_flg"/></TD>
								<TD><bean:write name="rowSheet" property="sts_cd"/></TD>
								<TD><bean:write name="rowSheet" property="inv_seq"/></TD>
				            </tr>
						</logic:iterate>
						</DATA>
					</SHEET6>
				</logic:notEmpty>
			</logic:notEmpty>
</logic:empty>
<%-- 오류발생 --%>
<logic:notEmpty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
	<ERROR>
		<MESSAGE><![CDATA[ <bean:write name="com.clt.framework.core.comm.EXCEPTION_OBJECT      " property="message"/>]]> </MESSAGE>
	</ERROR>
</logic:notEmpty>
