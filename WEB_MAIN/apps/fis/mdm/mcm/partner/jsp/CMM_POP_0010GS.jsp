<%--
=========================================================
*@FileName   : CMM_POP_0010GS.jsp
*@FileTitle  : CMM
*@Description: trade partner pop
*@author     : 이광훈 - trade partner pop
*@version    : 1.0 - 12/29/2008
*@since      : 12/29/2008

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
			
			<bean:define id="tmpMapVal" name="EventResponse" property="mapVal" />
			<% boolean isBegin = true; %>
				<bean:define id="rowSet" name="EventResponse" property="listVal"/>
				<SHEET>
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
					<logic:iterate id="row" name="rowSet">
						<tr>	
							<TD></TD>
							<TD><![CDATA[<bean:write name="row" property="trdp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="eng_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="locl_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="shrt_nm" filter="false"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="lgl_addr" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="city_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="state_cd" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rep_zip" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pic_phn"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pic_mphn"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="trdp_tp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="tp_grp"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="iata_cd" filter="false"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="acct_cd" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="tax_iss_addr" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cnt_nm" filter="false"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="eng_addr" filter="false"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="pic_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pic_fax"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pic_eml" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pic_desc" filter="false"/>]]></TD>
								
							<TD><![CDATA[<bean:write name="row" property="cmp_rmk" filter="false"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="cnt_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="sls_usrnm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rep_zip"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="sls_gp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="profit_share"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="crd_lmt_amt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cur_lmt_amt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cr_term_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cr_term_dt"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="city_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="state_cd" filter="false"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="prefix" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="biz_no" filter="false"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="cmdt_cd" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cmdt_nm" filter="false"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="trdp_addr"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="trdp_addr2"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="tax_type" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="reserve_field09" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="over_due" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="over_limit" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="grand_total" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="an_bond_no" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="an_bond_exp_dt" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ctrt_no" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="dflt_addr" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ofc_fm_hr" />]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ofc_to_hr" />]]></TD>
							<!-- OFVFOUR-7911 [AIF] MANAGING/ALERT CUSTOMER'S OUTSTANDING (OVERDUE) -->
							<TD><![CDATA[<bean:write name="row" property="overdue_total" />]]></TD>
							
							<TD></TD>
							
							<TD><![CDATA[<% if(isBegin){ isBegin = false; %><bean:write name="tmpMapVal" property="pagingTbl"/><%}%>]]></TD>
			            </tr>
					</logic:iterate>
					</DATA>
				</SHEET>
				
			</logic:notEmpty>
</logic:empty>
<%-- 오류발생 --%>
