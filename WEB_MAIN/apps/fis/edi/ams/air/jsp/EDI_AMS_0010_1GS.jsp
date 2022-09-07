<%--
=========================================================
*Copyright(c) 2008 CyberLogitec. All Rights Reserved.
=========================================================

=========================================================
*@FileName   : SEE_BMD_0020GS.jsp
*@FileTitle  : 
*@Description: 
*@author     : Kang,Jung-Gu - Cyberlogitec
*@version    : 1.0 - 02/05/2009
*@since      : 02/05/2009

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
				<bean:define id="rowSet" name="EventResponse" property="listVal"/>
				<SHEET>
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
					<logic:iterate id="row" name="rowSet">
						<tr>
							<TD><bean:write name="row" property="shp_nm"/></TD>
							<TD><bean:write name="row" property="shp_addr"/></TD>
							<TD><bean:write name="row" property="shp_city"/></TD>
							<TD><bean:write name="row" property="shp_state"/></TD>
							<TD><bean:write name="row" property="shp_cntry"/></TD>
							<TD><bean:write name="row" property="shp_zip_cd"/></TD>
							<TD><bean:write name="row" property="shp_tel_no"/></TD>
							<TD><bean:write name="row" property="shp_fax_no"/></TD>
							<TD><bean:write name="row" property="shp_tlx_no"/></TD>
							<TD><bean:write name="row" property="cne_nm"/></TD>
							<TD><bean:write name="row" property="cne_addr"/></TD>
							<TD><bean:write name="row" property="cne_city"/></TD>
							<TD><bean:write name="row" property="cne_state"/></TD>
							<TD><bean:write name="row" property="cne_cntry"/></TD>
							<TD><bean:write name="row" property="cne_zip_cd"/></TD>
							<TD><bean:write name="row" property="cne_tel_no"/></TD>
							<TD><bean:write name="row" property="cne_fax_no"/></TD>
							<TD><bean:write name="row" property="cne_tlx_no"/></TD>
							<TD><bean:write name="row" property="cvd_iso_curr_cd"/></TD>
							<TD><bean:write name="row" property="cvd_pc_term"/></TD>
							<TD><bean:write name="row" property="cvd_val_carr"/></TD>
							<TD><bean:write name="row" property="cvd_val_cust"/></TD>
							<TD><bean:write name="row" property="cvd_val_insu"/></TD>
							<TD><bean:write name="row" property="oci_cntry_cd"/></TD>
							<TD><bean:write name="row" property="oci_info_id"/></TD>
							<TD><bean:write name="row" property="oci_cus_info_id"/></TD>
							<TD><bean:write name="row" property="oci_supp_cus_info"/></TD>
							<TD><bean:write name="row" property="oci_supp_cus_info2"/></TD>
							<TD><bean:write name="row" property="oci_exp_date"/></TD>
							<TD><bean:write name="row" property="hsn_no"/></TD>
							<TD><bean:write name="row" property="mbi_air_pfx"/></TD>
							<TD><bean:write name="row" property="mbi_awbl_no"/></TD>
							<TD><bean:write name="row" property="mbi_org_port"/></TD>
							<TD><bean:write name="row" property="mbi_dest_port"/></TD>
							<TD><bean:write name="row" property="mbi_ship_desc_cd"/></TD>
							<TD><bean:write name="row" property="mbi_no_of_pcs"/></TD>
							<TD><bean:write name="row" property="mbi_wgt_cd"/></TD>
							<TD><bean:write name="row" property="mbi_wgt"/></TD>
							<TD><bean:write name="row" property="hbs_hawbl_no"/></TD>
							<TD><bean:write name="row" property="hbs_org_port"/></TD>
							<TD><bean:write name="row" property="hbs_dest_port"/></TD>
							<TD><bean:write name="row" property="hbs_no_of_pcs"/></TD>
							<TD><bean:write name="row" property="hbs_wgt_cd"/></TD>
							<TD><bean:write name="row" property="hbs_wgt"/></TD>
							<TD><bean:write name="row" property="hbs_slac"/></TD>
							<TD><bean:write name="row" property="hbs_gds_desc"/></TD>
							<TD><bean:write name="row" property="hbs_handle_cd_1"/></TD>
							<TD><bean:write name="row" property="hbs_handle_cd_2"/></TD>
							<TD><bean:write name="row" property="eta_dt_tm"/></TD>
							<TD><bean:write name="row" property="flt_no"/></TD>
							<TD><bean:write name="row" property="lnr_iata_cd"/></TD>
							<TD></TD>
							<TD></TD>
							<TD><bean:write name="row" property="mbl_cne_cd"/></TD>
							<TD><bean:write name="row" property="mbl_cne_nm"/></TD>
							<TD><bean:write name="row" property="msg_no"/></TD>
							<TD><bean:write name="row" property="seq"/></TD>
							<TD><bean:write name="row" property="hbs_org_cntry"/></TD>
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
