<%--
=========================================================
*@FileName   : SEE_AFR_0010GS.jsp
*@FileTitle  : 해운수출 EDI전문 목록
*@Description: 
*@author     : Kang,Jung-Gu - Cyberlogitec
*@version    : 1.0 - 02/06/2009
*@since      : 02/06/2009

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
                <% int idx = 1;%>
                <SHEET>
                    <DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
                    <logic:iterate id="row" name="rowSet">
                        <tr>
							<TD><%=idx++%></TD>
                            <TD></TD>
                            <TD><![CDATA[<bean:write name="row" property="mbl_no"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="hbl_no"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="msg_sts_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="cstms_rgst_flg"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="rsk_ass_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="mtch_sts_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="snd_dt_tm"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="hbl_cmpl_flg"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="atd_cmpl_flg"/>]]></TD>
                            <TD>View</TD>
                            <TD><![CDATA[<bean:write name="row" property="shpr_trdp_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="shpr_trdp_nm"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="shpr_trdp_phn"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="shpr_trdp_addr"/>]]></TD>
                            <TD></TD>
                            <TD><![CDATA[<bean:write name="row" property="shpr_trdp_cnt_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="cnee_trdp_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="cnee_trdp_nm"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="cnee_trdp_phn"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="cnee_trdp_addr"/>]]></TD>
                            <TD></TD>
                            <TD><![CDATA[<bean:write name="row" property="cnee_trdp_cnt_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="ntfy_trdp_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="ntfy_trdp_nm"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="ntfy_trdp_phn"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="ntfy_trdp_addr"/>]]></TD>
                            <TD></TD>
                            <TD><![CDATA[<bean:write name="row" property="ntfy_trdp_cnt_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="lnr_scac_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="lnr_trdp_nm"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="call_sgn_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="trnk_vsl_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="trnk_vsl_nm"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="vsl_cnt_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="trnk_voy_no"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="etd_dt_tm"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="etd_tm"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="etd_tmzn_val"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="eta_dt_tm"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="org_pol_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="org_un_pol_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="org_pol_nm"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="pol_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="un_pol_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="pol_nm"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="pod_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="un_pod_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="pod_nm"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="del_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="un_del_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="del_nm"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="intg_bl_seq"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="intg_mbl_seq"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="rep_cmdt_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="rep_cmdt_nm"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="pck_qty"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="pck_ut_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="grs_wgt"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="wgt_ut_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="meas"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="meas_ut_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="mk_txt"/>]]></TD>
                            <TD></TD>
                            <TD><![CDATA[<bean:write name="row" property="desc_txt"/>]]></TD>
                            <TD></TD>
                            <TD><![CDATA[<bean:write name="row" property="cntr_cnt"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="imdg_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="undg_no"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="ref_no"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="cntr_blank_cnt"/>]]></TD>
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
