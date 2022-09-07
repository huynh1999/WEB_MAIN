<%--
=========================================================
*@FileName   : PFM_MGT_0170GS.jsp
*@FileTitle  : Total Volume & Profit by Month
*@Description: Total Volume & Profit by Month
*@author     : CyberLogitec
*@version    : 1.0 - 2013/04/13
*@since      :2013/04/13

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
							<TD><bean:write name="row" property="ref_ofc_cd"/></TD>
							<TD><bean:write name="row" property="dept_nm"/></TD>
							<TD><bean:write name="row" property="shp_mod_cd"/></TD>
							
							<logic:greaterEqual name="row" property="vol" value="0">
								<TD><bean:write name="row" property="vol"/></TD>
							</logic:greaterEqual>
							<logic:lessThan name="row" property="vol" value="0">
								<TD COLOR="RED"><bean:write name="row" property="vol"/></TD>
							</logic:lessThan>	
							
							<logic:greaterEqual name="row" property="teu" value="0">
								<TD><bean:write name="row" property="teu"/></TD>
							</logic:greaterEqual>
							<logic:lessThan name="row" property="teu" value="0">
								<TD COLOR="RED"><bean:write name="row" property="teu"/></TD>
							</logic:lessThan>		
							
							<logic:greaterEqual name="row" property="cntr_cnt" value="0">
								<TD><bean:write name="row" property="cntr_cnt"/></TD>
							</logic:greaterEqual>
							<logic:lessThan name="row" property="cntr_cnt" value="0">
								<TD COLOR="RED"><bean:write name="row" property="cntr_cnt"/></TD>
							</logic:lessThan>
							
							<logic:greaterEqual name="row" property="grs_wgt" value="0">
								<TD><bean:write name="row" property="grs_wgt"/></TD>
							</logic:greaterEqual>
							<logic:lessThan name="row" property="grs_wgt" value="0">
								<TD COLOR="RED"><bean:write name="row" property="grs_wgt"/></TD>
							</logic:lessThan>
							
							<logic:greaterEqual name="row" property="chg_wgt" value="0">
								<TD><bean:write name="row" property="chg_wgt"/></TD>
							</logic:greaterEqual>
							<logic:lessThan name="row" property="chg_wgt" value="0">
								<TD COLOR="RED"><bean:write name="row" property="chg_wgt"/></TD>
							</logic:lessThan>
							
							<logic:greaterEqual name="row" property="profit" value="0">
								<TD><bean:write name="row" property="profit"/></TD>
							</logic:greaterEqual>
							<logic:lessThan name="row" property="profit" value="0">
								<TD COLOR="RED"><bean:write name="row" property="profit"/></TD>
							</logic:lessThan>
							
							<logic:greaterEqual name="row" property="prf_avg" value="0">
								<TD><bean:write name="row" property="prf_avg"/></TD>
							</logic:greaterEqual>
							<logic:lessThan name="row" property="prf_avg" value="0">
								<TD COLOR="RED"><bean:write name="row" property="prf_avg"/></TD>
							</logic:lessThan>
							
							<TD><bean:write name="row" property="profit"/></TD>
							<TD><bean:write name="row" property="tot_tgt_amt"/></TD>
							<TD><bean:write name="row" property="tot_ofc_incnt_pct"/></TD>
							<TD><bean:write name="row" property="tot_opr_incnt_pct"/></TD>
							<TD><bean:write name="row" property="tot_acctg_incnt_pct"/></TD>
							
							<% 	for(int i=1; i<13; i++){ %>
							<logic:greaterEqual name="row" property='<%="vol_"+i%>' value="0">
								<TD><bean:write name="row" property='<%="vol_"+i%>'/></TD>
							</logic:greaterEqual>
							<logic:lessThan name="row" property='<%="vol_"+i%>' value="0">
								<TD COLOR="RED"><bean:write name="row" property='<%="vol_"+i%>'/></TD>
							</logic:lessThan>	
							<logic:greaterEqual name="row" property='<%="teu_"+i%>' value="0">
								<TD><bean:write name="row" property='<%="teu_"+i%>'/></TD>
							</logic:greaterEqual>
							<logic:lessThan name="row" property='<%="teu_"+i%>' value="0">
								<TD COLOR="RED"><bean:write name="row" property='<%="teu_"+i%>'/></TD>
							</logic:lessThan>		
							<logic:greaterEqual name="row" property='<%="cntr_cnt_"+i%>' value="0">
								<TD><bean:write name="row" property='<%="cntr_cnt_"+i%>'/></TD>
							</logic:greaterEqual>
							<logic:lessThan name="row" property='<%="cntr_cnt_"+i%>' value="0">
								<TD COLOR="RED"><bean:write name="row" property='<%="cntr_cnt_"+i%>'/></TD>
							</logic:lessThan>
							<logic:greaterEqual name="row" property='<%="grs_wgt_"+i%>' value="0">
								<TD><bean:write name="row" property='<%="grs_wgt_"+i%>'/></TD>
							</logic:greaterEqual>
							<logic:lessThan name="row" property='<%="grs_wgt_"+i%>' value="0">
								<TD COLOR="RED"><bean:write name="row" property='<%="grs_wgt_"+i%>'/></TD>
							</logic:lessThan>
							<logic:greaterEqual name="row" property='<%="chg_wgt_"+i%>' value="0">
								<TD><bean:write name="row" property='<%="chg_wgt_"+i%>'/></TD>
							</logic:greaterEqual>
							<logic:lessThan name="row" property='<%="chg_wgt_"+i%>' value="0">
								<TD COLOR="RED"><bean:write name="row" property='<%="chg_wgt_"+i%>'/></TD>
							</logic:lessThan>
							<logic:greaterEqual name="row" property='<%="profit_"+i%>' value="0">
								<TD><bean:write name="row" property='<%="profit_"+i%>'/></TD>
							</logic:greaterEqual>
							<logic:lessThan name="row" property='<%="profit_"+i%>' value="0">
								<TD COLOR="RED"><bean:write name="row" property='<%="profit_"+i%>'/></TD>
							</logic:lessThan>
							<logic:greaterEqual name="row" property='<%="prf_avg_"+i%>' value="0">
								<TD><bean:write name="row" property='<%="prf_avg_"+i%>'/></TD>
							</logic:greaterEqual>
							<logic:lessThan name="row" property='<%="prf_avg_"+i%>' value="0">
								<TD COLOR="RED"><bean:write name="row" property='<%="prf_avg_"+i%>'/></TD>
							</logic:lessThan>
							
							<TD><bean:write name="row" property='<%="profit_"+i%>'/></TD>
							<TD><bean:write name="row" property='<%="tgt_amt_"+i%>'/></TD>
							<TD><bean:write name="row" property='<%="ofc_incnt_pct_"+i%>'/></TD>
							<TD><bean:write name="row" property='<%="opr_incnt_pct_"+i%>'/></TD>
							<TD><bean:write name="row" property='<%="acctg_incnt_pct_"+i%>'/></TD>
							
							<%		
								}
							%>
							<TD>0</TD>
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
