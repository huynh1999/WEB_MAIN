
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
							<in_plan_no><![CDATA[<bean:write name="row" property="in_plan_no"/>]]></in_plan_no>
							<plan_no><![CDATA[<bean:write name="row" property="plan_no"/>]]></plan_no>
							<plan_sts_cd_nm><![CDATA[<bean:write name="row" property="plan_sts_cd_nm"/>]]></plan_sts_cd_nm>
							<plan_sts_cd><![CDATA[<bean:write name="row" property="plan_sts_cd" />]]></plan_sts_cd>
							<plan_dt><![CDATA[<bean:write name="row" property="plan_dt"/>]]></plan_dt>
							<wh_cd><![CDATA[<bean:write name="row" property="wh_cd"/>]]></wh_cd>
							<wh_nm><![CDATA[<bean:write name="row" property="wh_nm"/>]]></wh_nm>
							<ctrt_no><![CDATA[<bean:write name="row" property="ctrt_no"/>]]></ctrt_no>
							<ctrt_nm><![CDATA[<bean:write name="row" property="ctrt_nm"/>]]></ctrt_nm>
							<move_dt><![CDATA[<bean:write name="row" property="move_dt"/>]]></move_dt>
							<move_hm_fr><![CDATA[<bean:write name="row" property="move_hm_fr"/>]]></move_hm_fr>
							<move_hm_to><![CDATA[<bean:write name="row" property="move_hm_to"/>]]></move_hm_to>
							<supv_nm><![CDATA[<bean:write name="row" property="supv_nm"/>]]></supv_nm>
							<work_nm><![CDATA[<bean:write name="row" property="work_nm"/>]]></work_nm>
							<rmk><![CDATA[<bean:write name="row" property="rmk"/>]]></rmk>
							<wave_no><![CDATA[<bean:write name="row" property="wave_no"/>]]></wave_no>
							<flag><![CDATA[<bean:write name="row" property="flag"/>]]></flag>
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

