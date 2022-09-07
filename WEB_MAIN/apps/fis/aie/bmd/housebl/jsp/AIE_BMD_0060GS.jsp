<%--
=========================================================
*@FileName   : AIE_BMD_0060GS.jsp
*@FileTitle  : Booking And House B/L Search 
*@Description: Booking And House B/L Search 조회한다.
*@author     : 이광훈 - see =Export 
*@version    : 1.0 - 11/20/2011
*@since      : 11/20/2011

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
							<TD><![CDATA[<bean:write name="row" property="bl_no" filter="false"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="ref_ofc_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ref_no" filter="false"/>]]></TD>
							<TD>0</TD>
							<TD><![CDATA[<bean:write name="row" property="lnr_bkg_no"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="mbl_no" filter="false"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="prnr_trdp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="prnr_trdp_nm" filter="false"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="etd_dt_tm1"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="etd_dt_tm2"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="flt_no" filter="false"/>]]></TD>

							<TD><![CDATA[<bean:write name="row" property="shpr_trdp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="shpr_trdp_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cnee_trdp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cnee_trdp_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ntfy_trdp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ntfy_trdp_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="act_shpr_trdp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="act_shpr_trdp_nm" filter="false"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="vndr_trdp_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="vndr_trdp_nm" filter="false"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="lnr_trdp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="lnr_trdp_nm" filter="false"/>]]></TD>
							
							
														
							<TD><![CDATA[<bean:write name="row" property="pol_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pol_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pod_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pod_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ts1_port_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ts2_port_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ts3_port_cd"/>]]></TD>	
							
							<TD><![CDATA[<bean:write name="row" property="lc_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="po_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="inv_no"/>]]></TD>
								
							<TD><![CDATA[<bean:write name="row" property="pck_qty"/>]]></TD>	
							<TD><![CDATA[<bean:write name="row" property="grs_wgt"/>]]></TD>	
							<TD><![CDATA[<bean:write name="row" property="grs_wgt1"/>]]></TD>	
							<TD><![CDATA[<bean:write name="row" property="chg_wgt"/>]]></TD>	
							<TD><![CDATA[<bean:write name="row" property="chg_wgt1"/>]]></TD>	
							<TD><![CDATA[<bean:write name="row" property="vol_meas"/>]]></TD>	
							
							<TD><![CDATA[<bean:write name="row" property="bl_dt_tm"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="frt_chk"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ar_chk"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="ap_chk"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="dc_chk"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="lnr_bkg_no"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="memo"/>]]></TD>
                            
                            <TD><![CDATA[<bean:write name="row" property="proc_usrnm"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="sls_usr_nm"/>]]></TD>
                                                        
                            <TD><![CDATA[<bean:write name="row" property="post_dt"/>]]></TD>
                            <!-- #4980 [Best Ocean] Created Time and Last Modify Time columns add to BL List-->
                            <TD><![CDATA[<bean:write name="row" property="rgst_tms" />]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="modi_usr_nm"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="modi_tms_local"/>]]></TD>    
                            <!-- #6837 : [JAPT] B/L Type column add request on BL List -->                        
							<TD><![CDATA[<bean:write name="row" property="hbl_tp_cd"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="intg_bl_seq"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ref_ofc_cnt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="third_trdp_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ref_ofc_eng_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="bl_sts_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rlt_intg_bl_seq"/>]]></TD>
							
                            <TD><![CDATA[<% if(isBegin){ isBegin = false; %><bean:write name="tmpMapVal" property="pagingTbl"/><%}%>]]></TD>
                            
                            <TD><![CDATA[<bean:write name="row" property="m_shpr_trdp_nm"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="iss_trdp_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="iss_trdp_nm"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="iss_trdp_addr"/>]]></TD>
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
