<%--
=========================================================
*@FileName   : SEE_BMD_0210GS.jsp
*@FileTitle  : Booking And House B/L Search 
*@Description: Booking And House B/L Search 조회한다.
*@author     : 이광훈 - see =Export 
*@version    : 1.0 - 01/14/2009
*@since      : 01/14/2009

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
				<% int cnt = 0; %>
				<% boolean isBegin = true; %>
	            <bean:define id="tmpMapVal" name="EventResponse" property="mapVal"/>
				<bean:define id="rowSet" name="EventResponse" property="listVal"/>
				<SHEET>
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
					<logic:iterate id="row" name="rowSet">
						<tr>	
							<TD><% cnt++;%><%= cnt%></TD>
							<TD><![CDATA[<bean:write name="row" property="bkg_sts_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="bkg_no" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="biz_clss_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="lnr_bkg_no" filter="false"/>]]></TD>							
							<TD><![CDATA[<bean:write name="row" property="bkg_dt_tm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rgst_ofc_cd"/>]]></TD>
							<!-- #1890 [PATENT] Booking List, Consolidation List 개선 사항 - 링크 등 추가 -->
							<TD><![CDATA[<bean:write name="row" property="filling_no"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="mbl_no"  filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="hbl_no"  filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="shp_mod_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="etd_dt_tm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="prnr_trdp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="prnr_trdp_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="shpr_trdp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="shpr_trdp_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cnee_trdp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cnee_trdp_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ntfy_trdp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ntfy_trdp_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="act_shpr_trdp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="act_shpr_trdp_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="trnk_vsl_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="trnk_voy"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="lnr_trdp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="lnr_trdp_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="por_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="por_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pol_cd"/>]]></TD>	
							<TD><![CDATA[<bean:write name="row" property="pol_nm" filter="false"/>]]></TD>	
							<TD><![CDATA[<bean:write name="row" property="pod_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pod_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="del_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="del_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="exp_ref_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="lc_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="meas"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="grs_wgt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="grs_wgt1"/>]]></TD>
							<!-- #1890 [PATENT] Booking List, Consolidation List 개선 사항 - 링크 등 추가 -->
							<TD><![CDATA[<bean:write name="row" property="trkg_svc_flg"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cstms_svc_flg"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="asgn_usr_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rgst_usrnm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="sls_usr_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="bkg_seq"/>]]></TD>
                            <TD><![CDATA[<% if(isBegin){ isBegin = false; %><bean:write name="tmpMapVal" property="pagingTbl"/><%}%>]]></TD>
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