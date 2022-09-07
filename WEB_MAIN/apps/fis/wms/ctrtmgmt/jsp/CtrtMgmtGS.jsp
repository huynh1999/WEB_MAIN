<%--
=========================================================
*@FileName   : CtrtMgmtGS.jsp
*@FileTitle  : Contract Management
*@Description: 
*@author     : Vinh Vo - Dou
*@version    : 1.0 - 2015/07/14
*@since      : 2015/07/14

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
				<% boolean isBegin = true; %>
				 <bean:define id="tmpMapVal" name="EventResponse" property="mapVal"/>
				<bean:define id="rowSet" name="EventResponse" property="listVal"/>
				<SHEET>
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
					<logic:iterate id="row" name="rowSet">
						<tr>
							<TD></TD>
							<TD><![CDATA[<bean:write name="row" property="ctrt_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ctrt_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ctrt_cust_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ctrt_cust_nm"/>]]></TD>
							<TD></TD>
							<TD><![CDATA[<bean:write name="row" property="sales_ofc_cd" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="sales_ofc_nm" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="sales_pic_id" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="sales_pic_nm" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ctrt_cust_cd" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ctrt_cust_nm" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="eff_fr_dt" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="eff_to_dt" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ctrt_del_flg" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cal_method_cd" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="incl_ib_dt_flg" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="incl_ob_dt_flg" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="curr_cd" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="unit_price" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cyc_cd" />]]></TD>
							<TD><![CDATA[<% if(isBegin){ isBegin = false; %><bean:write name="tmpMapVal" property="pagingTbl"/><%}%>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="unit" />]]></TD>

							<!-- #2511 [WMS4.0]Storage closing without each item's rate data -->
							<TD><![CDATA[<bean:write name="row" property="vol_unit" />]]></TD>

							<!-- #2807 [BINEX WMS4.0] LOT04, LOT05 NICKNAME CUSTOMIZATION -->
							<TD><![CDATA[<bean:write name="row" property="lot4_alias" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="lot5_alias" />]]></TD>
							<!-- #6027 [LATONA] WMS 개선 문의사항 - Auto Allocation 이후, LP 수량 수정 가능하도록 -->
							<TD><![CDATA[<bean:write name="row" property="ovr_aloc_yn" />]]></TD>
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
