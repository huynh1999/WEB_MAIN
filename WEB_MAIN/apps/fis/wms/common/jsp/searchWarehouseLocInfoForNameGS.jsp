<%@page contentType = "text/xml; charset=UTF-8"%>
<%@page pageEncoding = "UTF-8"%>
<%@include file = "./../../../../../../syscommon/header/CLTGSHeader.jsp"%>
<%-- 정상처리 --%>
<logic:empty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
		<%-- 조회 결과가 없는 경우 --%>
			<logic:empty name="EventResponse" property="listVal">
				<DATA></DATA>
			</logic:empty>
		<%-- 조회 결과가 있는 경우 --%>
			<logic:notEmpty name="EventResponse" property="listVal">
				<bean:define id="rowSet" name="EventResponse" property="listVal"/>
					<DATA>
					<logic:iterate id="row" name="rowSet">
							<wh_loc_cd><bean:write name="row" property="wh_loc_cd"/></wh_loc_cd>
							<wh_loc_nm><bean:write name="row" property="wh_loc_nm"/></wh_loc_nm>
							<zone_cd><bean:write name="row" property="zone_cd"/></zone_cd>
							<prop_cd><bean:write name="row" property="prop_cd"/></prop_cd>
							<prop_nm><bean:write name="row" property="prop_nm"/></prop_nm>
							<put_tp_cd><bean:write name="row" property="put_tp_cd"/></put_tp_cd>
							<put_tp_nm><bean:write name="row" property="put_tp_nm"/></put_tp_nm>
							<putaway_flg><bean:write name="row" property="putaway_flg"/></putaway_flg>
							<alloc_flg><bean:write name="row" property="alloc_flg"/></alloc_flg>
							<move_flg><bean:write name="row" property="move_flg"/></move_flg>
							<replenish_flg><bean:write name="row" property="replenish_flg"/></replenish_flg>
							<adjust_flg><bean:write name="row" property="adjust_flg"/></adjust_flg>
							<loc_cd><bean:write name="row" property="loc_cd"/></loc_cd>
							<space_tp_cd><bean:write name="row" property="space_tp_cd"/></space_tp_cd>
							<space_tp_nm><bean:write name="row" property="space_tp_nm"/></space_tp_nm>
					</logic:iterate>
					</DATA>
			</logic:notEmpty>
</logic:empty>
<%-- 오류발생 --%>
<logic:notEmpty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
	<ERROR>
		<MESSAGE> <bean:write name="com.clt.framework.core.comm.EXCEPTION_OBJECT      " property="message"/> </MESSAGE>
	</ERROR>
</logic:notEmpty>
