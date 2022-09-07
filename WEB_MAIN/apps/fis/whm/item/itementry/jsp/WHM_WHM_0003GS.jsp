<%--
=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
=========================================================

=========================================================
*@FileName   : WHM_WHM_0003.jsp
*@FileTitle  : 
*@Description: 
*@author     : Tin.Luong - DOU NetWorks
*@version    : 1.0 - 2014/12/20
*@since      : 2014/12/20

*@Change history:
=========================================================
--%>
<%@ page contentType="text/xml; charset=UTF-8"%>
<%@page pageEncoding="UTF-8"%>
<%@include file="./../../../../../../syscommon/header/CLTGSHeader.jsp"%>
<%-- 정상처리 --%>
<logic:empty name="com.clt.framework.core.comm.EXCEPTION_OBJECT">
		<%-- 조회 결과가 없는 경우 --%>
			<logic:empty name="EventResponse" property="listVal">
					<DATA TOTAL="0"></DATA>
			</logic:empty>
		<%-- 조회 결과가 있는 경우 --%>
			<logic:notEmpty name="EventResponse" property="listVal">
				<bean:define id="rowSet" name="EventResponse" property="listVal"/>
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
						<logic:iterate id="row" name="rowSet">
							<cust_itm_id><![CDATA[<bean:write name="row" property="cust_itm_id"/>]]></cust_itm_id>
							<cust_cd><![CDATA[<bean:write name="row" property="cust_cd" />]]></cust_cd>
							<cust_nm><![CDATA[<bean:write name="row" property="cust_nm" />]]></cust_nm>
							<rgst_ofc_cd><![CDATA[<bean:write name="row" property="rgst_ofc_cd"/>]]></rgst_ofc_cd>
							<itm_cd><![CDATA[<bean:write name="row" property="itm_cd"/>]]></itm_cd>
							<itm_nm><![CDATA[<bean:write name="row" property="itm_nm"/>]]></itm_nm>
                            <itm_hts_cd><![CDATA[<bean:write name="row" property="itm_hts_cd"/>]]></itm_hts_cd>
                            <itm_ut_cd><![CDATA[<bean:write name="row" property="itm_ut_cd"/>]]></itm_ut_cd>
                            <itm_inr_qty><![CDATA[<bean:write name="row" property="itm_inr_qty"/>]]></itm_inr_qty>
                            <itm_wgt><![CDATA[<bean:write name="row" property="itm_wgt"/>]]></itm_wgt>
                            <itm_vol><![CDATA[<bean:write name="row" property="itm_vol"/>]]></itm_vol>
                            <itm_wdt><![CDATA[<bean:write name="row" property="itm_wdt"/>]]></itm_wdt>
                            <itm_hgt><![CDATA[<bean:write name="row" property="itm_hgt"/>]]></itm_hgt>
                            <itm_len><![CDATA[<bean:write name="row" property="itm_len"/>]]></itm_len>
                            
                            <itm_prc_amt><![CDATA[<bean:write name="row" property="itm_prc_amt"/>]]></itm_prc_amt>
                            <itm_wgt_lbs><![CDATA[<bean:write name="row" property="itm_wgt_lbs"/>]]></itm_wgt_lbs>
                            <itm_vol_cft><![CDATA[<bean:write name="row" property="itm_vol_cft"/>]]></itm_vol_cft>
                            <itm_wdt_inch><![CDATA[<bean:write name="row" property="itm_wdt_inch"/>]]></itm_wdt_inch>
                            <itm_hgt_inch><![CDATA[<bean:write name="row" property="itm_hgt_inch"/>]]></itm_hgt_inch>
                            <itm_len_inch><![CDATA[<bean:write name="row" property="itm_len_inch"/>]]></itm_len_inch>
                            <itm_curr_cd><![CDATA[<bean:write name="row" property="itm_curr_cd"/>]]></itm_curr_cd>
                            <use_flg><![CDATA[<bean:write name="row" property="use_flg"/>]]></use_flg>
						</logic:iterate>
					</DATA>
			</logic:notEmpty>
</logic:empty>
<%-- 오류발생 --%>
<logic:notEmpty name="com.clt.framework.core.comm.EXCEPTION_OBJECT">
	<ERROR>
		<MESSAGE><![CDATA[ <bean:message name="com.clt.framework.core.comm.EXCEPTION_OBJECT" property="message"/>]]> </MESSAGE>
	</ERROR>
</logic:notEmpty>
