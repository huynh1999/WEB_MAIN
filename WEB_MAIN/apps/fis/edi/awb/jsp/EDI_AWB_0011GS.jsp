<%--
=========================================================
*@FileName   : EDI_AWB_0011GS.jsp
*@FileTitle  : AWB EDI HAWB TAB
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
                            <TD><![CDATA[<bean:write name="row" property="mawb_intg_bl_seq"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="biz_clss_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="cust_id"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="airln_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="msg_tp_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="awb_pfx_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="org_bl_no"/>]]></TD>                                                      
                            <TD><![CDATA[<bean:write name="row" property="hawb_no"/>]]></TD>

							<TD><![CDATA[<bean:write name="row" property="msg_sts_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="err_msg"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cstms_rgst_flg"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cstms_cnt_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="snt_tms"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="mod_tms"/>]]></TD>
							<TD>View</TD>
							<TD><![CDATA[<bean:write name="row" property="hawb_org_port_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="org_port_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="etd_dt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="hawb_dest_port_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="dest_port_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="eta_dt"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="hawb_piec_qty"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="hawb_wgt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="hawb_wgt_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="awb_vol"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="awb_vol_cd"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="flt_crr_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="flt_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="flt_dy"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="n1st_crr_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="org_flt_no"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="hawb_gds_desc"/>]]></TD>
							<TD>M</TD> <%-- Multi line Edit Box --%>
							
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
							
							<TD><![CDATA[<bean:write name="row" property="decl_curr_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="decl_pay_term_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="decl_crr_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="decl_cstms_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="decl_insur_no"/>]]></TD>
							
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
