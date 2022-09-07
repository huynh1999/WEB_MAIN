<%--
=========================================================
*@FileName   : EDI_CSTM_0010_1GS.jsp
*@FileTitle  : 항공수출 국내세관 화물적화목록 BL 데이터 표시
*@Description: 
*@author     : Kang,Jung-Gu - Cyberlogitec
*@version    : 1.0 - 07/23/2009
*@since      : 07/23/2009

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
							<TD><![CDATA[]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="edi_sts"/>]]></TD>
							
                            <TD><![CDATA[<bean:write name="row" property="mbl_no"/>]]></TD>
                            <TD><![CDATA[<wrt:write  name="row" property="mbl_obrd_dt" formatType="DATE" fromFormat="yyyyMMdd" format="yyyy-MM-dd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="mbl_flt_no"/>]]></TD>
							
                            <TD><![CDATA[<bean:write name="row" property="hbl_no"/>]]></TD>
							<TD><![CDATA[<wrt:write  name="row" property="hbl_obrd_dt" formatType="DATE" fromFormat="yyyyMMdd" format="yyyy-MM-dd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="hbl_flt_no"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="shpr_cty_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cnee_cty_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="noti_cty_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="fwrd_fcty_plc_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="gds_clss_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="trkr_trdp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rfs_flg"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ucr_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="n1st_spcl_cgo_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="n2nd_spcl_cgo_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="awb_tp_cd"/>]]></TD>
							
                            <TD><![CDATA[<bean:write name="row" property="exp_extd_code"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="mbl_bl_seq"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="hbl_bl_seq"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="pck_qty"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="grs_wgt"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="shp_nm"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="shp_addr"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="cnee_nm"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="cnee_addr"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="rep_cmdt_nm"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="no_xpt_no_cnt"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="no_pck_qty_cnt"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="no_grs_wgt_cnt"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="noti_nm"/>]]></TD>
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
