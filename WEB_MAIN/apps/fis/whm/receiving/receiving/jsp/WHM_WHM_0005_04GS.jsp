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
							<TD></TD>
							<TD></TD>
							<TD><![CDATA[<bean:write name="row" property="cust_itm_id"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="itm_nm"/>]]></TD>
							<TD></TD>
							<TD><![CDATA[<bean:write name="row" property="itm_inr_qty"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="itm_ctn_qty"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="itm_ea_qty" />]]></TD>
							<TD></TD>
							<TD></TD>
							<TD><![CDATA[<bean:write name="row" property="itm_desc" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="itm_po_no" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="itm_len"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="itm_wdt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="itm_hgt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="itm_dim_wgt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="itm_dim_wgt_lbs"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="itm_act_wgt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="itm_act_wgt_lbs"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="itm_vol"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="itm_vol_cft"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="itm_ut_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="itm_loc_id"/>]]></TD>
							<TD></TD>
							<TD><![CDATA[<bean:write name="row" property="itm_bgn_bal_qty"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="itm_endg_bal_qty"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="item_sys_no"/>]]></TD>
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
