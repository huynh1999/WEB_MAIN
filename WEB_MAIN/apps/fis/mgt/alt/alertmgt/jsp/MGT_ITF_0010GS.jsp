<%--
=========================================================
*@FileName   : MGT_EQS_0011GS.jsp
*@FileTitle  : EQ Status
*@Description: EQ Status 정보를 출력한다.
*@author     : 오요한
*@version    : 1.0 - 12/09/2013
*@since      : 12/09/2013

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
			    <%-- <bean:define id="tmpMapVal" name="EventResponse" property="mapVal"/> --%>
				<bean:define id="rowSet" name="EventResponse" property="listVal"/>
				<SHEET>
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
					<logic:iterate id="row" name="rowSet">
						<tr>
						    <TD><![CDATA[<bean:write name="row" property="mbl_no"/>]]></TD>		
						    <TD><![CDATA[<bean:write name="row" property="bl_seq"/>]]></TD>
						    <TD></TD>
						    <TD><![CDATA[<bean:write name="row" property="status_bl"/>]]></TD>
						    <TD><![CDATA[<bean:write name="row" property="ref_no"/>]]></TD>
						    <TD><![CDATA[<bean:write name="row" property="mbl_no"/>]]></TD>
						    <TD></TD><!-- cfm_flg --> 
						    <TD><![CDATA[<bean:write name="row" property="dc_note"/>]]></TD>
						    <TD>View</TD>
						    <%-- Agent EDI Spec 추가 사항 2018.12.10 --%>
						    <TD><![CDATA[<bean:write name="row" property="mbl_org_ref_no"/>]]></TD>
						    <TD><![CDATA[<bean:write name="row" property="mbl_org_agt_trdp_nm"/>]]></TD>
						    <TD><![CDATA[<bean:write name="row" property="mbl_shpr_trdp_nm"/>]]></TD>
						    
						    <TD><![CDATA[<bean:write name="row" property="mbl_cnee_trdp_nm"/>]]></TD>
						    <TD></TD>
						    <TD><![CDATA[<bean:write name="row" property="trnk_vsl_nm"/>]]></TD>
						    <TD><![CDATA[<bean:write name="row" property="trnk_voy"/>]]></TD>
						    <TD><![CDATA[<bean:write name="row" property="mbl_etd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="mbl_eta"/>]]></TD>
							<%--#3704 [JAPT] Post Date 컬럼 추가--%>
							<TD><![CDATA[<bean:write name="row" property="post_dt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="mbl_por_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="mbl_pol_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="mbl_pod_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="mbl_del_nm"/>]]></TD>
							<%-- Agent EDI Spec 추가 사항 2018.12.10 --%>
							<TD><![CDATA[<bean:write name="row" property="shp_mod"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="bl_no"/>]]></TD>

							<TD><![CDATA[<bean:write name="row" property="etd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="eta"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cntr_total"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="shpr_trdp_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cnee_trdp_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ntfy_trdp_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="por_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pol_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pod_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="del_nm"/>]]></TD>

							<%--#3704 [JAPT] Post Date 컬럼 추가--%>							
							<TD><![CDATA[<bean:write name="row" property="dnld_tms"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="dnld_usr_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="iss_tms"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="iss_usr_nm"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="edi_tp"/>]]></TD>
							
							<%-- Agent EDI Spec 추가 사항 2018.12.10 --%>
							<TD><![CDATA[<bean:write name="row" property="rcvr_brnc_ofc_cd"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="bl_table_count"/>]]></TD>
							
							<%-- Agent EDI Spec 추가 사항 2018.12.10 --%>
							<TD><![CDATA[<bean:write name="row" property="mbl_org_agt_cd"/>]]></TD>	
							<TD><![CDATA[<bean:write name="row" property="mbl_shpr_cd"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="mbl_cnee_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="shpr_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cnee_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ntfy_cd"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="intg_bl_seq"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="hbl_por_un_loc_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="hbl_pol_un_loc_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="hbl_pod_un_loc_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="hbl_del_un_loc_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="mbl_por_un_loc_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="mbl_pol_un_loc_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="mbl_pod_un_loc_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="mbl_del_un_loc_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="mbl_por_un_loc_chk"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="mbl_pol_un_loc_chk"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="mbl_pod_un_loc_chk"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="mbl_del_un_loc_chk"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="hbl_por_un_loc_chk"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="hbl_pol_un_loc_chk"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="hbl_pod_un_loc_chk"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="hbl_del_un_loc_chk"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="mbl_map_por_loc_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="mbl_map_pol_loc_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="mbl_map_pod_loc_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="mbl_map_del_loc_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="hbl_map_por_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="hbl_map_pol_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="hbl_map_pod_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="hbl_map_del_cd"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="shpr_trdp_addr"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="shpr_trdp_cnt_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cnee_trdp_addr"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cnee_trdp_cnt_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ntf_trdp_addr"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ntf_trdp_cnt_cd"/>]]></TD>
							
							<%-- Agent EDI Spec 추가 사항 2018.12.10 --%>
							<TD><![CDATA[<bean:write name="row" property="mbl_org_agt_trdp_addr"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="mbl_org_agt_trdp_cnt_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="mbl_shpr_trdp_addr"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="mbl_shpr_trdp_cnt_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="mbl_cnee_trdp_addr"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="mbl_cnee_trdp_cnt_cd"/>]]></TD>
							
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
