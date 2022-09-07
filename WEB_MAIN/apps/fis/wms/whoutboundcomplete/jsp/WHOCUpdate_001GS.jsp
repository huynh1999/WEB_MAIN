
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
                            <wob_out_no><![CDATA[<bean:write name="row" property="wob_out_no"/>]]></wob_out_no>
                            <walc_no><![CDATA[<bean:write name="row" property="walc_no"/>]]></walc_no>
							<wob_bk_no><![CDATA[<bean:write name="row" property="wob_bk_no"/>]]></wob_bk_no>
							<so_no><![CDATA[<bean:write name="row" property="so_no"/>]]></so_no>
							<wh_cd><![CDATA[<bean:write name="row" property="wh_cd"/>]]></wh_cd>
							<wh_nm><![CDATA[<bean:write name="row" property="wh_nm"/>]]></wh_nm>
                            <ctrt_no><![CDATA[<bean:write name="row" property="ctrt_no"/>]]></ctrt_no>
                            
                            <ctrt_nm><![CDATA[<bean:write name="row" property="ctrt_nm"/>]]></ctrt_nm>
                            <buyer_cd><![CDATA[<bean:write name="row" property="buyer_cd"/>]]></buyer_cd>
                            <buyer_nm><![CDATA[<bean:write name="row" property="buyer_nm"/>]]></buyer_nm>
							<outbound_dt><![CDATA[<bean:write name="row" property="outbound_dt"/>]]></outbound_dt>
                            <load_by><![CDATA[<bean:write name="row" property="load_by"/>]]></load_by>
                            <load_hm_fr><![CDATA[<bean:write name="row" property="load_hm_fr"/>]]></load_hm_fr>
                            <load_hm_to><![CDATA[<bean:write name="row" property="load_hm_to"/>]]></load_hm_to>
                            
                            <custms_ref_no><![CDATA[<bean:write name="row" property="custms_ref_no"/>]]></custms_ref_no>
                            <modi_ofc_cd><![CDATA[<bean:write name="row" property="modi_ofc_cd"/>]]></modi_ofc_cd>
						    <modi_nm><![CDATA[<bean:write name="row" property="modi_nm"/>]]></modi_nm>							
                            <modi_loc_dt><![CDATA[<bean:write name="row" property="modi_loc_dt"/>]]></modi_loc_dt>
                            <rmk><![CDATA[<bean:write name="row" property="rmk"/>]]></rmk>
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
