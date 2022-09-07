<%--
=========================================================
*@FileName   : SEI_DOC_0030GS.jsp
*@FileTitle  : SEI Booking And House B/L Search 
*@Description: Booking And House B/L Search 조회한다.
*@author     : 이광훈 - sei =Export 
*@version    : 1.0 - 01/16/2009
*@since      : 01/16/2009

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
				<% int cnt = 0; %>
				
				<bean:define id="rowSet" name="EventResponse" property="listVal"/>
				<SHEET>
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
					<logic:iterate id="row" name="rowSet">
						<tr>
							<TD></TD>
							<TD></TD>
							<TD><% cnt++;%><%= cnt%></TD>
							<TD><![CDATA[<bean:write name="row" property="house_bl_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="master_bl_no"/>]]></TD>
							
						<logic:notEmpty name="row" property="an_palt_doc_tp_cd">
							<TD IMAGE="3"></TD>							
							<TD IMAGE="<bean:write name="row" property="an_palt_doc_pdf_url"/>"></TD>
                            <TD><bean:write name="row" property="an_palt_doc_pdf_url"/></TD>
							<TD IMAGE="2"></TD>
						</logic:notEmpty>
						<logic:empty name="row" property="an_palt_doc_tp_cd">
							<TD IMAGE="4"></TD>
							<TD></TD>
							<TD></TD>
							<TD></TD>
						</logic:empty>	
						<logic:notEmpty name="row" property="do_palt_doc_tp_cd">
							<TD IMAGE="3"></TD>
							<TD IMAGE="<bean:write name="row" property="do_palt_doc_pdf_url"/>"></TD>
							<TD><bean:write name="row" property="do_palt_doc_pdf_url"/></TD>
							<TD IMAGE="2"></TD>
						</logic:notEmpty>
						<logic:empty name="row" property="do_palt_doc_tp_cd">
							<TD IMAGE="4"></TD>
							<TD></TD>
							<TD></TD>
							<TD></TD>
						</logic:empty>
							<TD><![CDATA[<bean:write name="row" property="eta_dt_tm"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="shpr_trdp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="shpr_trdp_nm" filter="false"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="cnee_trdp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cnee_trdp_nm" filter="false"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="lnr_trdp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="lnr_trdp_nm" filter="false"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="por_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pol_nm"/>]]></TD>	
							<TD><![CDATA[<bean:write name="row" property="pod_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="del_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="grs_wgt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="meas"/>]]></TD>			
											
							<TD><![CDATA[<bean:write name="row" property="intg_bl_seq"/>]]></TD>	
							<TD><![CDATA[<bean:write name="row" property="an_palt_doc_seq"/>]]></TD>	
							<TD><![CDATA[<bean:write name="row" property="do_palt_doc_seq"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="intg_bl_rgst_tms"/>]]></TD>	
							<TD><![CDATA[<% if(isBegin){ isBegin = false; %><bean:write name="tmpMapVal" property="pagingTbl"/><%}%>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="an_palt_doc_tp_cd"/>]]></TD>
						    <TD><![CDATA[<bean:write name="row" property="do_palt_doc_tp_cd"/>]]></TD>
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
