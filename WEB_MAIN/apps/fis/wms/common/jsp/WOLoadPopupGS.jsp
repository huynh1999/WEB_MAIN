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
							<TD><![CDATA[<bean:write name="row" property="check"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="hbl_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="mbl_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ctrt_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ctrt_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pol"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="etd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pod"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="eta"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="del"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cntr_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="po_no"/>]]></TD>
							<TD><bean:write name="row" property="item_cd"/></TD>
							<TD><bean:write name="row" property="item_nm"/></TD>
							<TD><![CDATA[<bean:write name="row" property="lot_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pallet_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="item_qty"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="item_pkgqty"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="item_cbm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="item_kgs"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="item_net_wgt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="item_pkgunit"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="shp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="shp_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cne_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cne_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="carrier_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="carrier_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="vsl_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="vsl_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="voy"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="flight_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rtp_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="so_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pnl_svc_tp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="item_sys_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="po_sys_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cntr_tpsz_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="liner_bkg_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="est_cmpl_dt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="sales_ofc_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="sales_pic_id"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pol_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pod_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="del_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="por"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="por_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="an_ymd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="final_freeday_ymd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cntr_yard_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cntr_seal1"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="loc_job_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="loc_job_flg"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="loc_job_flg_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="loc_job_close_dt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="loc_job_close_dt_hm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="frt_closing_dt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="frt_closing_flg_nm"/>]]></TD>
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
