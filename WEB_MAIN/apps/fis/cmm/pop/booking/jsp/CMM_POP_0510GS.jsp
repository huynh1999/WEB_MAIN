<%--
=========================================================
*@FileName   : CMM_POP_0510GS.jsp
*@FileTitle  : CMM
*@Description: booking search pop
*@author     : 이광훈 - booking search pop
*@version    : 1.0 - 01/29/2009
*@since      : 01/29/2009

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
							<TD><% cnt++;%><%= cnt%></TD>
							<TD><![CDATA[<bean:write name="row" property="bkg_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="bl_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="act_shpr_trdp_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="shpr_trdp_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="bkg_dt_tm"/>]]></TD>	
							<TD><![CDATA[<bean:write name="row" property="proc_ofcnm"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="proc_dept_nm"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="proc_usrnm"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="bkg_seq"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="po_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="lc_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="prnr_trdp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="prnr_trdp_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="act_shpr_trdp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="shpr_trdp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="shpr_trdp_addr" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cnee_trdp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cnee_trdp_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cnee_trdp_addr" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ntfy_trdp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ntfy_trdp_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ntfy_trdp_addr" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="exp_ref_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pu_trdp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pu_trdp_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cgo_pu_trdp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cgo_pu_trdp_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cgo_pu_trdp_addr" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rcv_wh_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rcv_wh_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="trk_trdp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="trk_trdp_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cust_ref_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cntr_info"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="trnk_vsl_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="trnk_vsl_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="trnk_voy"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="por_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="por_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pol_cd"/>]]></TD>	
							<TD><![CDATA[<bean:write name="row" property="pol_nm" filter="false"/>]]></TD>	
							<TD><![CDATA[<bean:write name="row" property="pod_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pod_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="del_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="del_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="fnl_dest_loc_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="fnl_dest_loc_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="lnr_trdp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="lnr_trdp_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="lnr_bkg_no" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="etd_dt_tm"/>]]></TD>		
							<TD><![CDATA[<bean:write name="row" property="eta_dt_tm"/>]]></TD>		
							<TD><![CDATA[<bean:write name="row" property="etd_por_tm"/>]]></TD>		
							<TD><![CDATA[<bean:write name="row" property="shp_mod_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rep_cmdt_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rep_cmdt_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pck_qty"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pck_ut_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="grs_wgt_ut_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="grs_wgt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="grs_wgt1"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="meas_ut_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="meas"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="meas1"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="fm_svc_term_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="to_svc_term_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cargo_tp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cut_off_dt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cut_off_tm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rail_cut_off_dt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rail_cut_off_tm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="wh_cut_off_dt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="wh_cut_off_tm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="doc_cut_off_dt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="doc_cut_off_tm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="sls_ofc_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="sls_dept_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="sls_usrid"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="sls_usr_nm"/>]]></TD>
							<TD><![CDATA[<% if(isBegin){ isBegin = false; %><bean:write name="tmpMapVal" property="pagingTbl"/><%}%>]]></TD>
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
