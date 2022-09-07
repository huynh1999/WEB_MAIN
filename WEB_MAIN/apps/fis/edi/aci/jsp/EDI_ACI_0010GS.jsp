<%--
=========================================================
*@FileName   : EDI_ACI_0010GS.jsp
*@FileTitle  : ACI EDI List
*@Description: 
*@author     : OJG - Cyberlogitec
*@version    : 1.0 - 10/04/2016
*@since      : 10/04/2016

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
                            <TD><![CDATA[<bean:write name="row" property="crr_scac_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="mbl_no"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="fwrd_scac_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="hbl_no"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="cnsl_ind_flg"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="pre_hbl_no"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="mvmt_tp_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="smt_tp_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="msg_sts_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="rsk_ass_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="hbl_cmpl_flg"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="hbl_cmpl_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="dspo_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="mtch_sts_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="atd_cmpl_flg"/>]]></TD>
                            <TD>View</TD>
                            <TD><![CDATA[<bean:write name="row" property="shpr_trdp_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="shpr_trdp_nm"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="shpr_trdp_addr"/>]]></TD>
                            <TD>0</TD>
                            <TD><![CDATA[<bean:write name="row" property="shpr_trdp_cty_nm"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="shpr_trdp_ste_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="shpr_trdp_cnt_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="shpr_trdp_zip_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="cnee_trdp_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="cnee_trdp_nm"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="cnee_trdp_addr"/>]]></TD>
                            <TD>0</TD>
                            <TD><![CDATA[<bean:write name="row" property="cnee_trdp_cty_nm"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="cnee_trdp_ste_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="cnee_trdp_cnt_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="cnee_trdp_zip_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="poc_trdp_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="poc_trdp_nm"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="poc_trdp_addr"/>]]></TD>
                            <TD></TD>
                            <TD><![CDATA[<bean:write name="row" property="poc_trdp_cty_nm"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="poc_trdp_ste_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="poc_trdp_cnt_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="poc_trdp_zip_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="fnl_dest_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="fnl_dest_nm"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="sub_fnl_dest_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="pod_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="pod_nm"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="sub_pod_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="del_nm"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="del_cnt_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="grs_wgt"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="meas"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="cntr_cnt"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="cntr_cgo"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="dg_cgo"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="rmk3_txt"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="haz_cntc_nm"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="haz_cntc_phn"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="intg_bl_seq"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="intg_mbl_seq"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="air_sea_clss_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="bnd_clss_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="cstms_rgst_flg"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="ref_no"/>]]></TD>
                            <TD></TD>
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
