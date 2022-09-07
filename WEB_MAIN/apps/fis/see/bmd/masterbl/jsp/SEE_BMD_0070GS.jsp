<%--
=========================================================
*@FileName   : SEE_BMD_0070GS.jsp
*@FileTitle  : Master B/L Search 
*@Description: Master B/L Search 조회한다.
*@author     : 이광훈 - see =Export 
*@version    : 1.0 - 01/15/2009
*@since      : 01/15/2009

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
							<TD><![CDATA[<bean:write name="row" property="ref_no"  filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="bl_no"  filter="false"/>]]></TD>
							
							<%-- #29408 [BINEX]B/L List 검색조건 추가  
 							<logic:greaterThan name="row" property="hbl_cnt" value="0" >
								<TD><![CDATA[<bean:write name="row" property="hbl_no"/> + <bean:write name="row" property="hbl_cnt"/>]]></TD>
							</logic:greaterThan>
							<logic:equal name="row" property="hbl_cnt" value="0" > 
								<TD><![CDATA[<bean:write name="row" property="hbl_no"/>]]></TD>
					 		</logic:equal> 
							--%>
							<TD>
								<logic:equal name="row" property="bl_sts_cd" value="MC">0</logic:equal>
								<logic:equal name="row" property="bl_sts_cd" value="HO">0</logic:equal>
							</TD>
							<TD>1</TD>
							
							<TD><![CDATA[<bean:write name="row" property="shp_mod_cd"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="ref_ofc_cd"/>]]></TD>							
							<TD><![CDATA[<bean:write name="row" property="lnr_bkg_no"  filter="false"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="hbl_cnt"/>]]></TD>

							<TD><![CDATA[<bean:write name="row" property="etd_dt_tm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="eta_dt_tm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="doc_cut_off_dt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="vgm_cut_off_dt"/>]]></TD>
							
							<!-- #3910 [V461] CONTAINER COLUMN ON EXPORT BL LIST -->
							<logic:greaterThan name="row" property="cntr_cnt" value="0" >
								<TD><![CDATA[<bean:write name="row" property="cntr_no"/> + <bean:write name="row" property="cntr_cnt"/>]]></TD>
							</logic:greaterThan>
							<logic:equal name="row" property="cntr_cnt" value="0" > 
								<TD><![CDATA[<bean:write name="row" property="cntr_no"/>]]></TD>
					 		</logic:equal> 
							<logic:equal name="row" property="cntr_cnt" value="-1" > 
								<TD><![CDATA[<bean:write name="row" property="cntr_no"/>]]></TD>
					 		</logic:equal> 
							
							<TD><![CDATA[<bean:write name="row" property="cntr_summary" filter="false"/>]]></TD> <!-- #1230 HBL list modification FULLTRANS -->
							
							<TD><![CDATA[<bean:write name="row" property="prnr_trdp_cd2"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="prnr_trdp_nm4" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="prnr_trdp_nm3" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="prnr_trdp_nm2" filter="false"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="shpr_trdp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="shpr_trdp_nm" filter="false"/>]]></TD>

							<TD><![CDATA[<bean:write name="row" property="cnee_trdp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cnee_trdp_nm" filter="false"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="carr_trdp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="carr_trdp_nm" filter="false"/>]]></TD>
							
                            <TD><![CDATA[<bean:write name="row" property="trnk_vsl_nm"  filter="false"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="trnk_voy"/>]]></TD>
                            <!--  #943  [PATENT] Lane 추가  -->	
                            <TD><![CDATA[<bean:write name="row" property="svc_lane_nm"/>]]></TD>

							<TD><![CDATA[<bean:write name="row" property="lnr_trdp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="lnr_trdp_nm" filter="false"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="por_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="por_nm"  filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pol_cd"/>]]></TD>	
							<TD><![CDATA[<bean:write name="row" property="pol_nm"  filter="false"/>]]></TD>	
							<TD><![CDATA[<bean:write name="row" property="pod_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pod_nm"  filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="del_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="del_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pkup_dt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rlsd_flg"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rlsd_dt_tm"/>]]></TD>
							<!-- #1430 [PATENT] 0215_15 B/L TYPE DIVERSELY -->
							<%--#1619 [CLT] Original B/L Type- 항목 정리<TD><![CDATA[<bean:write name="row" property="bl_rlse_tp_nm" filter="false"/>]]></TD>--%>
							
                            <TD><![CDATA[<bean:write name="row" property="frt_chk"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="ar_chk"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="ap_chk"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="dc_chk"/>]]></TD>
                            <!-- #1019 [UFF] Add “FWDR Reference No” column and search field to OEM B/L List -->
                            <TD><![CDATA[<bean:write name="row" property="cust_ref_no"/>]]></TD>
                            
                            <TD><![CDATA[<bean:write name="row" property="verify_flag"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="pay_flag"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="memo" filter="false"/>]]></TD>
                            
                            <TD><![CDATA[<bean:write name="row" property="proc_usrnm" filter="false"/>]]></TD>
                           
                            <TD><![CDATA[<bean:write name="row" property="sls_usr_nm" filter="false"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="post_dt" filter="false"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="prnr_ref_no" filter="false"/>]]></TD>
                            <!-- #3704 [JAPT] Agent EDI send flag 추가 -->
                            <TD><![CDATA[<bean:write name="row" property="snd_flg" filter="false"/>]]></TD>
                            
                            <!-- #4980 [Best Ocean] Created Time and Last Modify Time columns add to BL List-->
                            <TD><![CDATA[<bean:write name="row" property="rgst_tms" />]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="modi_usr_nm"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="modi_tms_local"/>]]></TD>
                            <!-- #6837 : [JAPT] B/L Type column add request on BL List -->
                            <TD><![CDATA[<bean:write name="row" property="hbl_tp_cd"/>]]></TD>
                            
							<TD><![CDATA[<bean:write name="row" property="intg_bl_seq"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="bl_sts_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="bnd_release_flag"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="bnd_hold_flag"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="obl_tp_cd"/>]]></TD>
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
