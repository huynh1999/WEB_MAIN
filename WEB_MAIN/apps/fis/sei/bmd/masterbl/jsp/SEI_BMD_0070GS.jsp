<%--
=========================================================
*@FileName   : SEI_BMD_0070GS.jsp
*@FileTitle  : Master B/L Search 
*@Description: Master B/L Search 조회한다.
*@author     : PJK - see =Import 
*@version    : 1.0 - 11/25/2011
*@since      : 11/25/2011

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
							<TD><![CDATA[<bean:write name="row" property="ref_no" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="bl_no" filter="false"/>]]></TD>
							
							<%-- #29408 [BINEX]B/L List 검색조건 추가  --%>
							<%-- 
 							<logic:greaterThan name="row" property="hbl_cnt" value="0" >
								<TD><![CDATA[<bean:write name="row" property="hbl_no"/> + <bean:write name="row" property="hbl_cnt"/>]]></TD>
							</logic:greaterThan>
							<logic:equal name="row" property="hbl_cnt" value="0" > 
								<TD><![CDATA[<bean:write name="row" property="hbl_no"/>]]></TD>
					 		</logic:equal> 
					 		 --%>
							<TD>
								<logic:equal name="row" property="bl_sts_cd" value="MC">0</logic:equal>
								<logic:equal name="row" property="bl_sts_cd" value="MF">0</logic:equal>
								<logic:equal name="row" property="bl_sts_cd" value="HO">0</logic:equal>
							</TD>
							<TD>1</TD>  
							<TD><![CDATA[<bean:write name="row" property="shp_mod_cd"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="ref_ofc_cd"/>]]></TD>							
							<TD><![CDATA[<bean:write name="row" property="lnr_bkg_no" filter="false"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="hbl_cnt"/>]]></TD>

							<TD><![CDATA[<bean:write name="row" property="eta_dt_tm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="f_eta_dt_tm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="etd_dt_tm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="prnr_trdp_cd2"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="prnr_trdp_nm2" filter="false"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="shpr_trdp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="shpr_trdp_nm" filter="false"/>]]></TD>

							<TD><![CDATA[<bean:write name="row" property="cnee_trdp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cnee_trdp_nm" filter="false"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="carr_trdp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="carr_trdp_nm" filter="false"/>]]></TD>
							
                            <TD><![CDATA[<bean:write name="row" property="trnk_vsl_nm" filter="false"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="trnk_voy" filter="false"/>]]></TD>

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
							
							<TD><![CDATA[<bean:write name="row" property="cy_trdp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cy_trdp_nm" filter="false"/>]]></TD>
							
							<logic:greaterThan name="row" property="cntr_cnt" value="0" >
								<TD><![CDATA[<bean:write name="row" property="cntr_no"/> + <bean:write name="row" property="cntr_cnt"/>]]></TD>
							</logic:greaterThan>
							<logic:equal name="row" property="cntr_cnt" value="0" > 
								<TD><![CDATA[<bean:write name="row" property="cntr_no"/>]]></TD>
					 		</logic:equal> 
							<logic:equal name="row" property="cntr_cnt" value="-1" > 
								<TD><![CDATA[<bean:write name="row" property="cntr_no"/>]]></TD>
					 		</logic:equal> 
							
							<TD><![CDATA[<bean:write name="row" property="cfs_trdp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cfs_trdp_nm" filter="false"/>]]></TD>
							<!-- #4724	[Best Ocean] Ocean Import OBL Received and Received Date column and entry add -->
							<TD><![CDATA[<bean:write name="row" property="org_bl_rcvd_flg"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rcvd_dt_tm"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="rlsd_flg"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rlsd_dt_tm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ccn_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="mnf_fr_loc"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="mnf_to_loc"/>]]></TD>
							<!-- #1430 [PATENT] 0215_15 B/L TYPE DIVERSELY -->
							<%-- #1619 [CLT] Original B/L Type- 항목 정리<TD><![CDATA[<bean:write name="row" property="bl_rlse_tp_nm" filter="false"/>]]></TD>--%>
                            <TD><![CDATA[<bean:write name="row" property="frt_chk"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="ar_chk"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="ap_chk"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="dc_chk"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="verify_flag"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="pay_flag"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="memo" filter="false"/>]]></TD>
                            
                            <TD><![CDATA[<bean:write name="row" property="proc_usrnm"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="sls_usr_nm" filter="false"/>]]></TD>
							<!-- OFVFOUR-7976: [MATRIX] ADDING CS PIC ON ALL B/L ENTRY AND TRADE PARTNER ENTRY SCREEN -->
							<TD><![CDATA[<bean:write name="row" property="cs_usr_nm" filter="false"/>]]></TD>
                            
                            <TD><![CDATA[<bean:write name="row" property="ams_id" filter="false"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="imp_ref_no"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="post_dt"/>]]></TD>

                            <!-- #4980 [Best Ocean] Created Time and Last Modify Time columns add to BL List-->
                            <TD><![CDATA[<bean:write name="row" property="rgst_tms" />]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="modi_usr_nm"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="modi_tms_local"/>]]></TD>
                            <!-- #6837 : [JAPT] B/L Type column add request on BL List -->
                            <TD><![CDATA[<bean:write name="row" property="hbl_tp_cd"/>]]></TD>
                            <!-- OFVFOUR-7105 [JAPAN TRUST] Adding "Original B/L Type" Column and Search on B/L List  -->
                            <TD><![CDATA[<bean:write name="row" property="obl_tp_cd"/>]]></TD>

                            <!-- OFVFOUR-7337: [GPL] Adding Service Term column on OI MBL List-->
                            <TD><![CDATA[<bean:write name="row" property="fm_to_svc_term"/>]]></TD>
                            
							<TD><![CDATA[<bean:write name="row" property="bl_sts_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="intg_bl_seq"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cntr_cnt"/>]]></TD>
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
