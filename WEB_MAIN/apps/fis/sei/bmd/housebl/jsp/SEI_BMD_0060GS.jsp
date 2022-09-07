<%--
=========================================================
*@FileName   : SEI_BMD_0060GS.jsp
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
							<TD></TD>
							<TD><![CDATA[<bean:write name="row" property="hbl_no" filter="false"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="ref_ofc_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ref_no" filter="false"/>]]></TD>
							<TD>0</TD>
                            <TD><![CDATA[<bean:write name="row" property="eta_dt_tm"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="etd_dt_tm"/>]]></TD>

							<TD><![CDATA[<bean:write name="row" property="prnr_trdp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="prnr_trdp_nm" filter="false"/>]]></TD>
														
							<TD><![CDATA[<bean:write name="row" property="shpr_trdp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="shpr_trdp_nm" filter="false"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="cnee_trdp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cnee_trdp_nm" filter="false"/>]]></TD>
							
                            <TD><![CDATA[<bean:write name="row" property="act_shpr_trdp_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="act_shpr_trdp_nm" filter="false"/>]]></TD>
							
                            <TD><![CDATA[<bean:write name="row" property="ntfy_trdp_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="ntfy_trdp_nm" filter="false"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="trnk_vsl_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="trnk_voy"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="lnr_trdp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="lnr_trdp_nm" filter="false"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="mbl_no" filter="false"/>]]></TD>
							
							
							<TD><![CDATA[<bean:write name="row" property="isf_no" filter="false"/>]]></TD>
							
							<logic:greaterThan name="row" property="cntr_cnt" value="0" >
								<TD><![CDATA[<bean:write name="row" property="cntr_no"/> + <bean:write name="row" property="cntr_cnt"/>]]></TD>
							</logic:greaterThan>
							<logic:equal name="row" property="cntr_cnt" value="0" > 
								<TD><![CDATA[<bean:write name="row" property="cntr_no"/>]]></TD>
					 		</logic:equal> 
							<logic:equal name="row" property="cntr_cnt" value="-1" > 
								<TD><![CDATA[<bean:write name="row" property="cntr_no"/>]]></TD>
					 		</logic:equal> 
							
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
							<TD><![CDATA[<bean:write name="row" property="f_eta_dt_tm"/>]]></TD>
							
                            <TD><![CDATA[<bean:write name="row" property="cust_trdp_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="cust_trdp_nm" filter="false"/>]]></TD>
							
                            <TD><![CDATA[<bean:write name="row" property="cfs_trdp_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="cfs_trdp_nm" filter="false"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="it_no"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="pck_qty"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="grs_wgt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="grs_wgt1"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="meas"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="org_bl_rcvd_flg"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rcvd_dt_tm"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="express_tp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rlsd_flg"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rlsd_dt_tm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ccn_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="mnf_fr_loc"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="mnf_to_loc"/>]]></TD>
							<!-- #1430 [PATENT] 0215_15 B/L TYPE DIVERSELY -->
							<%--#1619 [CLT] Original B/L Type- 항목 정리 <TD><![CDATA[<bean:write name="row" property="bl_rlse_tp_nm" filter="false"/>]]></TD> --%>
							<TD><![CDATA[<bean:write name="row" property="frt_chk"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ar_chk"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ap_chk"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="dc_chk"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="verify_flag"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="pay_flag"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="memo" filter="false"/>]]></TD>
							
                            <TD><![CDATA[<bean:write name="row" property="proc_usrnm" filter="false"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="sls_usr_nm" filter="false"/>]]></TD>
                            <!-- OFVFOUR-7976: [MATRIX] ADDING CS PIC ON ALL B/L ENTRY AND TRADE PARTNER ENTRY SCREEN -->
							<TD><![CDATA[<bean:write name="row" property="cs_usr_nm" filter="false"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="ams_id" filter="false"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="cust_ref_no" filter="false"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="ams_no" filter="false"/>]]></TD>
                            
                            
                            <TD><![CDATA[<bean:write name="row" property="hbl_ser_no"/>]]></TD>
                            
                            <TD><![CDATA[<bean:write name="row" property="entr_no" filter="false"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="pkup_dt"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="post_dt"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="sub_bl_no" filter="false"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="rep_cmdt_nm" filter="false"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="an_fax_snd_dt"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="an_eml_snd_dt"/>]]></TD> 
                            <!-- #4980 [Best Ocean] Created Time and Last Modify Time columns add to BL List-->
                            <TD><![CDATA[<bean:write name="row" property="rgst_tms" />]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="modi_usr_nm"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="modi_tms_local"/>]]></TD>
                            <!-- #6837 : [JAPT] B/L Type column add request on BL List -->
                            <TD><![CDATA[<bean:write name="row" property="hbl_tp_cd"/>]]></TD> 
                            <TD><![CDATA[<bean:write name="row" property="obl_tp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="intg_bl_seq"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="trk_trdp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="trk_trdp_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cust_ref_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="bl_cnt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="bl_sts_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rlt_intg_bl_seq"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="cntr_cnt"/>]]></TD>
                            <TD><![CDATA[<% if(isBegin){ isBegin = false; %><bean:write name="tmpMapVal" property="pagingTbl"/><%}%>]]></TD>
                            <TD></TD>   
                            <TD><![CDATA[<bean:write name="row" property="po_no"/>]]></TD> 
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
