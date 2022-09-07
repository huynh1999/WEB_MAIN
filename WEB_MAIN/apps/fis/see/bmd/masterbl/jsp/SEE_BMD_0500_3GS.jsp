<%--
=========================================================
*Copyright(c) 2008 CyberLogitec. All Rights Reserved.
=========================================================
=========================================================
*@FileName   : SEE_BMD_0500_3GS.jsp
*@FileTitle  : PO목록 데이터 그리드
*@Description: 
*@author     : Kang,Jung-Gu - Cyberlogitec
*@version    : 1.0 - 02/05/2009
*@since      : 02/05/2009

*@Change history:
=========================================================
--%>
<%@ page contentType="text/xml; charset=UTF-8"%>
<%@page pageEncoding="UTF-8"%>
<%@include file="./../../../../../../../../syscommon/header/CLTGSHeader.jsp"%>
<logic:empty name="com.clt.framework.core.comm.EXCEPTION_OBJECT">
    <logic:empty name="EventResponse" property="listVal">
        <SHEET>
            <DATA TOTAL="0"></DATA>
        </SHEET>    
    </logic:empty>
    <logic:notEmpty name="EventResponse" property="listVal">
        <bean:define id="rowSet" name="EventResponse" property="listVal"/>
        <SHEET>
            <DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
            <logic:iterate id="row" name="rowSet">
                        <tr>    
							<TD></TD>
                            <TD><![CDATA[<bean:write name="row" property="bkg_seq"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="po_sys_no"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="po_cmdt_seq"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="cust_po_no"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="cust_itm_id"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="cust_itm_nm"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="item_shp_cmdt_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="item_shp_cmdt_nm"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="cmdt_pck_qty"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="cmdt_pck_ut_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="cmdt_pck_ut_nm"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="cmdt_pck_inr_qty"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="cmdt_ea_cnt"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="cmdt_ttl_qty"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="cmdt_kgs_wgt"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="cmdt_lbs_wgt"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="cmdt_cbm_meas"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="cmdt_cft_meas"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="item_ibflag"/>]]></TD>
                            <TD></TD>
                        </tr>
            </logic:iterate>
            </DATA>
        </SHEET>
    </logic:notEmpty>
</logic:empty>
<logic:notEmpty name="com.clt.framework.core.comm.EXCEPTION_OBJECT">
    <ERROR>
        <MESSAGE><![CDATA[ <bean:message name="com.clt.framework.core.comm.EXCEPTION_OBJECT" property="message"/>]]> </MESSAGE>
    </ERROR>
</logic:notEmpty>
