<%--
=========================================================
*Copyright(c) 2008 CyberLogitec. All Rights Reserved.
=========================================================
=========================================================
*@FileName   : SEE_BKG_0010_1GS.jsp
*@FileTitle  : Consolidation
*@Description: 
*@author     : 
*@version    : 
*@since      : 

*@Change history:
=========================================================
--%>
<%@ page contentType="text/xml; charset=UTF-8"%>
<%@page pageEncoding="UTF-8"%>
<%@include file="./../../../../../../syscommon/header/CLTGSHeader.jsp"%>
<logic:empty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
    <logic:empty name="EventResponse" property="listVal">
        <SHEET>
            <DATA TOTAL="0"></DATA>
        </SHEET>    
    </logic:empty>
    <logic:notEmpty name="EventResponse" property="listVal">
        <bean:define id="rowSet" name="EventResponse" property="listVal"/>		
		<% boolean isBegin = true; %>		
		<bean:define id="rowSet" name="EventResponse" property="listVal"/>
        <SHEET>
            <DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
            <logic:iterate id="row" name="rowSet">            
                <TR>
                    <TD></TD>	
                    <TD><![CDATA[<bean:write name="row" property="cntr_seq"/>]]></TD>			
                    <TD><![CDATA[<bean:write name="row" property="bkg_no"/>]]></TD>			
                    <TD><![CDATA[<bean:write name="row" property="bkg_seq"/>]]></TD>	
                    <TD><![CDATA[<bean:write name="row" property="biz_clss_cd"/>]]></TD>
                    <TD><![CDATA[<bean:write name="row" property="bkg_sts_nm"/>]]></TD>
                    <TD><![CDATA[<bean:write name="row" property="cgo_kgs_wgt"/>]]></TD>
                    <TD><![CDATA[<bean:write name="row" property="cgo_cbm_qty"/>]]></TD>
                    <TD><![CDATA[<bean:write name="row" property="shpr_trdp_nm"/>]]></TD>
                    <TD><![CDATA[<bean:write name="row" property="cnee_trdp_nm"/>]]></TD>
					<TD><![CDATA[<bean:write name="row" property="prnr_trdp_nm"/>]]></TD>
	                <TD><![CDATA[<bean:write name="row" property="pol_nm"/>]]></TD>
                    <TD><![CDATA[<bean:write name="row" property="pod_nm"/>]]></TD>					
                    <TD><![CDATA[<bean:write name="row" property="etd_dt_tm"/>]]></TD>
                    <TD><![CDATA[<bean:write name="row" property="eta_dt_tm"/>]]></TD>
                    <!-- #2606 [PATENT] Booking 기능 오류 항목 - 4. Consolidation Entry 화면 요건 DEL 항목 추가 -->
                    <TD><![CDATA[<bean:write name="row" property="del_nm"/>]]></TD>
                    <TD><![CDATA[<bean:write name="row" property="cgo_pgk_qty"/>]]></TD>		
                    <TD><![CDATA[<bean:write name="row" property="cgo_pck_ut_cd"/>]]></TD>					
					
					<TD><![CDATA[<bean:write name="row" property="cgo_lbs_wgt"/>]]></TD>
					
					<TD><![CDATA[<bean:write name="row" property="cgo_cft_qty"/>]]></TD>
					<TD><![CDATA[<bean:write name="row" property="cgo_pgk_qty"/>]]></TD>						
					<TD><![CDATA[<bean:write name="row" property="cgo_kgs_wgt"/>]]></TD>
					<TD><![CDATA[<bean:write name="row" property="cgo_lbs_wgt"/>]]></TD>
					<TD><![CDATA[<bean:write name="row" property="cgo_cbm_qty"/>]]></TD>
					<TD><![CDATA[<bean:write name="row" property="cgo_cft_qty"/>]]></TD>
					<TD><![CDATA[<bean:write name="row" property="new_cntr_seq"/>]]></TD>
					<TD><![CDATA[<bean:write name="row" property="cntr_instr_txt"/>]]></TD>
                </TR>
            </logic:iterate>
            </DATA>
        </SHEET>
    </logic:notEmpty>
</logic:empty>
<logic:notEmpty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
    <ERROR>
        <MESSAGE><![CDATA[ <bean:message name="com.clt.framework.core.comm.EXCEPTION_OBJECT      " property="message"/>]]> </MESSAGE>
    </ERROR>
</logic:notEmpty>
