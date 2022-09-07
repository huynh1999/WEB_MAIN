<%--
=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
=========================================================

=========================================================
*@FileName   : WWHM_WHM_0009GS.jsp
*@FileTitle  : 
*@Description: 
*@author     : Thoa.Dien - Cyberlogitec
*@version    : 1.0 - 2014/12/22
*@since      : 2014/12/22

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
							<TD><bean:write name="row" property="so_no"/></TD>
							<TD><bean:write name="row" property="ord_tp_lvl1_cd"/></TD>
							<TD><bean:write name="row" property="ord_tp_lvl2_cd"/></TD>
							<TD><bean:write name="row" property="pnl_svc_tp_cd"/></TD>
							<TD><bean:write name="row" property="ctrt_no"/></TD>
							<TD><bean:write name="row" property="ctrt_nm"/></TD>
							<TD><bean:write name="row" property="ctrt_cust_cd"/></TD>
							<TD><bean:write name="row" property="ctrt_cust_nm"/></TD>
							<TD><bean:write name="row" property="rtp_no"/></TD>
							<TD><bean:write name="row" property="hbl_no"/></TD>
							<TD><bean:write name="row" property="mbl_no"/></TD>
							<TD><bean:write name="row" property="hawb_no"/></TD>
							<TD><bean:write name="row" property="mawb_no"/></TD>
							<TD><bean:write name="row" property="etd_fr_dt"/></TD>
							<TD><bean:write name="row" property="etd_to_dt"/></TD>
							<TD><bean:write name="row" property="eta_from_dt"/></TD>
							<TD><bean:write name="row" property="eta_to_dt"/></TD>
							<TD><bean:write name="row" property="rgst_sys_fr_dt"/></TD>
							<TD><bean:write name="row" property="rgst_sys_to_dt"/></TD>
							<TD><bean:write name="row" property="sales_ofc_cd"/></TD>
							<TD><bean:write name="row" property="sales_ofc_nm"/></TD>
							<TD><bean:write name="row" property="sales_pic_id"/></TD>
							<TD><bean:write name="row" property="sales_pic_nm"/></TD>
							<TD><bean:write name="row" property="por"/></TD>
							<TD><bean:write name="row" property="por_nm"/></TD>
							<TD><bean:write name="row" property="pol"/></TD>
							<TD><bean:write name="row" property="pol_nm"/></TD>
							<TD><bean:write name="row" property="pol_etd"/></TD>
							<TD><bean:write name="row" property="pod"/></TD>
							<TD><bean:write name="row" property="pod_nm"/></TD>
							<TD><bean:write name="row" property="pod_eta"/></TD>
							<TD><bean:write name="row" property="del"/></TD>
							<TD><bean:write name="row" property="del_nm"/></TD>
							<TD><bean:write name="row" property="carrier_cd"/></TD>
							<TD><bean:write name="row" property="carrier_nm"/></TD>
							<TD><bean:write name="row" property="vsl_cd"/></TD>
							<TD><bean:write name="row" property="vsl_nm"/></TD>
							<TD><bean:write name="row" property="voy"/></TD>
							<TD><bean:write name="row" property="pnl_svc_tp_nm"/></TD>
							<TD><bean:write name="row" property="est_cmpl_dt"/></TD>
							<TD><bean:write name="row" property="loc_job_no"/></TD>
							<TD><bean:write name="row" property="loc_job_flg"/></TD>
							<TD><bean:write name="row" property="loc_job_flg_nm"/></TD>
							<TD><bean:write name="row" property="loc_job_close_dt"/></TD>
							<TD><bean:write name="row" property="loc_job_close_dt_hm"/></TD>
							<TD><bean:write name="row" property="frt_closing_dt"/></TD>
							<TD><bean:write name="row" property="frt_closing_flg_nm"/></TD>
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
