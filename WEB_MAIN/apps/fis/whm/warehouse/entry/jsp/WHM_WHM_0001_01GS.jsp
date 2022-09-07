<%--
=========================================================
*@FileName   : WHM_WHM_0001_WHGS.jsp
*@FileTitle  : Warehouse Entry
*@Description: 
*@author     : Vinh Vo - Dou
*@version    : 1.0 - 2014/12/23
*@since      : 2014/12/23

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
							<wh_cd><![CDATA[<bean:write name="row" property="wh_cd"/>]]></wh_cd>
							<wh_nm><![CDATA[<bean:write name="row" property="wh_nm"/>]]></wh_nm>
							<wh_als_nm><![CDATA[<bean:write name="row" property="wh_als_nm" />]]></wh_als_nm>
							<wh_addr><![CDATA[<bean:write name="row" property="wh_addr"/>]]></wh_addr>
							<wh_cty_nm><![CDATA[<bean:write name="row" property="wh_cty_nm"/>]]></wh_cty_nm>
							<wh_ste_cd><![CDATA[<bean:write name="row" property="wh_ste_cd"/>]]></wh_ste_cd>
                            <wh_zip_cd><![CDATA[<bean:write name="row" property="wh_zip_cd"/>]]></wh_zip_cd>
                            <wh_phn_no><![CDATA[<bean:write name="row" property="wh_phn_no"/>]]></wh_phn_no>
                            <wh_fax_no><![CDATA[<bean:write name="row" property="wh_fax_no"/>]]></wh_fax_no>
                            <wh_rmk><![CDATA[<bean:write name="row" property="wh_rmk"/>]]></wh_rmk>
                            <wh_ofc_cd><![CDATA[<bean:write name="row" property="wh_ofc_cd"/>]]></wh_ofc_cd>
                            <use_flg><![CDATA[<bean:write name="row" property="use_flg"/>]]></use_flg>
                            <incl_ob_dt_flg><![CDATA[<bean:write name="row" property="incl_ob_dt_flg"/>]]></incl_ob_dt_flg>
						</logic:iterate>
					</DATA>
			</logic:notEmpty>
</logic:empty>
<%-- 오류발생 --%>
<logic:notEmpty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
	<ERROR>
		<MESSAGE><![CDATA[ <bean:message name="com.clt.framework.core.comm.EXCEPTION_OBJECT      " property="message"/>]]> </MESSAGE>
	</ERROR>
</logic:notEmpty>
