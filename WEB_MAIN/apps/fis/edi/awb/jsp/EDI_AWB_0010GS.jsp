<%--
=========================================================
*@FileName   : EDI_AWB_0010GS.jsp
*@FileTitle  : AWB EDI MAWB TAB
*@Description: 
*@author     : Wonki Eo - Cyberlogitec
*@version    : 1.0 - 10/23/2018
*@since      : 10/23/2018

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
                <bean:define id="rowSet" name="EventResponse" property="listVal"/>
                <%-- <% int idx = 1;%> --%>
                <SHEET>
                    <DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
                    <logic:iterate id="row" name="rowSet">
                        <tr>
							<%-- <TD><%=idx++%></TD> --%>
                            <TD></TD>
                            <TD><![CDATA[<bean:write name="row" property="msg_no"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="intg_bl_seq"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="biz_clss_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="cust_id"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="airln_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="msg_tp_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="awb_pfx_no"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="org_bl_no"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="awb_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="hbl_cnt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="msg_sts_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="err_msg"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cstms_rgst_flg"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cstms_cnt_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="snt_tms"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="mod_tms"/>]]></TD>
							<TD>View</TD>
							<TD><![CDATA[<bean:write name="row" property="org_port_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="org_port_nm"/>]]></TD>							
							<TD><![CDATA[<bean:write name="row" property="etd_dt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="dest_port_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="dest_port_nm"/>]]></TD>							
							<TD><![CDATA[<bean:write name="row" property="eta_dt"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="piec_qty"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="awb_wgt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="awb_wgt_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="awb_vol"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="awb_vol_cd"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="flt_crr_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="flt_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="flt_dy"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="n1st_crr_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="org_flt_no"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="spcl_rqst_desc"/>]]></TD>
							<TD>M</TD> <%-- Multi line Edit Box --%>
							<TD><![CDATA[<bean:write name="row" property="acct_info_desc"/>]]></TD>
							<TD>M</TD> <%-- Multi line Edit Box --%>
							<TD><![CDATA[<bean:write name="row" property="rt_gds_desc"/>]]></TD>
							<TD>M</TD> <%-- Multi line Edit Box --%>
							
							<TD><![CDATA[<bean:write name="row" property="ppd_wgt_chg_amt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ppd_val_chg_amt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ppd_tax_amt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ppd_agt_chg_amt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ppd_crr_chg_amt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ppd_ttl_chg_amt"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="clt_wgt_chg_amt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="clt_val_chg_amt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="clt_tax_amt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="clt_agt_chg_amt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="clt_crr_chg_amt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="clt_ttl_chg_amt"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="rt_piec_qty"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rt_wgt_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rt_wgt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rt_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rt_val"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rt_chg_wgt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rt_chg_amt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rt_gds_desc"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rt_cnsl_desc"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rt_vol_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rt_vol"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rt_cmdt_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rt_org_cnt_cd"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="shpr_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="shpr_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="shpr_addr"/>]]></TD>
							<TD>M</TD> <%-- Multi line Edit Box --%>
							<TD><![CDATA[<bean:write name="row" property="shpr_cty_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="shpr_cnt_cd"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="cnee_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cnee_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cnee_addr"/>]]></TD>
							<TD>M</TD> <%-- Multi line Edit Box --%>							
							<TD><![CDATA[<bean:write name="row" property="cnee_cty_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cnee_cnt_cd"/>]]></TD>

							<TD><![CDATA[<bean:write name="row" property="ntfy_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ntfy_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ntfy_addr"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ntfy_cty_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ntfy_cnt_cd"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="agt_iata_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="agt_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="agt_addr"/>]]></TD>
							<TD>M</TD> <%-- Multi line Edit Box --%>							
							
							<TD><![CDATA[<bean:write name="row" property="decl_curr_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="decl_pay_term_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="decl_crr_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="decl_cstms_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="decl_insur_no"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="iss_dt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="iss_loc_nm"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="ofc_port_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ofc_desi_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="co_desi_cd"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="part_id"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="part_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="part_port_cd"/>]]></TD>
						
							<TD><![CDATA[<bean:write name="row" property="doc_sts_cd"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="airln_sprt"/>]]></TD>
							
							<TD></TD>

                        </tr>
                    </logic:iterate>
                    </DATA>
                </SHEET>
            </logic:notEmpty>
</logic:empty>
<%-- 오류발생 --%>
<logic:notEmpty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
    <SHEET>
    	<RESULT CODE="-1" MESSAGE="<bean:message name="com.clt.framework.core.comm.EXCEPTION_OBJECT      " property="message"/>">
    	</RESULT>
    </SHEET>
</logic:notEmpty>
