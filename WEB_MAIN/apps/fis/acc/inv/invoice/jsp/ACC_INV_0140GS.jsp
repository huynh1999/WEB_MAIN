<%--
=========================================================
*@FileName   : ACC_INV_0040GS.jsp
*@FileTitle  : Invoice List
*@Description: Invoice List
*@author     : Chungrue - Cyberlogitec
*@version    : 1.0 - 2011/11/09
*@since      : 2011/11/09

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
				    <logic:notEmpty name="EventResponse" property="mapVal">
					<bean:define id="tmpMapVal" name="EventResponse" property="mapVal"/>
					<ETC-DATA> 
					    <ETC KEY="r_type"><bean:write name="tmpMapVal" property="r_type"/></ETC>
					    <ETC KEY="r_tax_inv_seq"><bean:write name="tmpMapVal" property="r_tax_inv_seq"/></ETC>
					</ETC-DATA> 				
					</logic:notEmpty>
					<DATA TOTAL="0"></DATA>
				</SHEET>	
			</logic:empty>
		<%-- 조회 결과가 있는 경우 --%>
			<logic:notEmpty name="EventResponse" property="listVal">
				<% int cnt = 0; %>
				<% boolean isBegin = true; %>
	            <bean:define id="tmpMapVal" name="EventResponse" property="mapVal"/>
				<bean:define id="rowSet" name="EventResponse" property="listVal"/>
				<SHEET>
				
					<ETC-DATA> 
					    <ETC KEY="r_type"><bean:write name="tmpMapVal" property="r_type"/></ETC>
						<ETC KEY="trdp_cd"><bean:write name="tmpMapVal" property="trdp_cd"/></ETC>
						<ETC KEY="trdp_nm"><bean:write name="tmpMapVal" property="trdp_nm"/></ETC>
						<ETC KEY="dept_cd"><bean:write name="tmpMapVal" property="dept_cd"/></ETC>
						<ETC KEY="paid_currency"><bean:write name="tmpMapVal" property="paid_currency"/></ETC>
						<ETC KEY="tax_inv_no"><bean:write name="tmpMapVal" property="tax_inv_no"/></ETC>
						<ETC KEY="tax_inv_tit"><bean:write name="tmpMapVal" property="tax_inv_tit"/></ETC>
						<ETC KEY="iss_dt"><bean:write name="tmpMapVal" property="iss_dt" /></ETC>
						<ETC KEY="void_yn"><bean:write name="tmpMapVal" property="void_yn"/></ETC>
						<ETC KEY="tax_inv_tp"><bean:write name="tmpMapVal" property="tax_inv_tp"/></ETC>
						<ETC KEY="tax_ratio"><bean:write name="tmpMapVal" property="tax_ratio"/></ETC>
						<ETC KEY="tax_inv_seq"><bean:write name="tmpMapVal" property="tax_inv_seq"/></ETC>					    
						<ETC KEY="rmk"><bean:write name="tmpMapVal" property="rmk"/></ETC>					    
					</ETC-DATA> 
									
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
					<logic:iterate id="row" name="rowSet">
						<tr>
							<TD></TD>
							<TD><![CDATA[<bean:write name="row" property="bl_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inv_post_dt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="issued_by_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inv_rmk"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inv_aply_curr_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inv_sum_amt"/>]]></TD>
							<td><![CDATA[<bean:write name="row" property="chk_flag"/>]]></td>
							<TD><![CDATA[<bean:write name="row" property="paid_currency"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="xch_rt_ut"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inv_xcrt_sum_amt"/>]]></TD>
							<td><![CDATA[<bean:write name="row" property="tax_ratio"/>]]></td>
							<td><![CDATA[<bean:write name="row" property="tax_amt"/>]]></td>tax_amt
							<TD><![CDATA[<bean:write name="row" property="inv_dt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inv_due_dt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ofc_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inv_dept_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inv_tp"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inv_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="buy_inv_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ref_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="bal_sum_amt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inv_seq"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="trdp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="trdp_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="clr_flag"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="sell_buy_tp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="air_sea_clss_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="modi_tms"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="bnd_clss_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="biz_clss_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="intg_bl_seq"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inv_aply_xcrt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="issued_by"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="bl_curr_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="bl_post_dt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="tax_inv_seq"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="dtl_seq"/>]]></TD>
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
