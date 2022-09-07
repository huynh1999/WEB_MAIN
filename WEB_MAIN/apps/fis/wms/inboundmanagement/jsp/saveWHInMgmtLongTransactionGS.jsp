<%--
=========================================================
*@FileName   : saveWHInMgmtLongTransaction.jsp
*@FileTitle  : Warehouse Inbound Booking
*@Description: 
*@author     : Dou
*@version    : 1.0 - 2014/12/23
*@since      : 2014/12/23

*@Change history:
=========================================================
--%>
<%@ page contentType="text/xml; charset=UTF-8"%>
<%@page pageEncoding="UTF-8"%>
<%@include file="./../../../../../../syscommon/header/CLTGSHeader.jsp"%>
<%-- 정상처리 --%>
<logic:empty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
		
				<bean:define id="valMap" name="EventResponse" property="mapVal"/>
				<FIELD>
					<DATA TOTAL="1">	
						<ret_wib_bk_no><![CDATA[<bean:write name="valMap" property="ret_wib_bk_no"/>]]></ret_wib_bk_no>
						<ret_bk_sts_cd><![CDATA[<bean:write name="valMap" property="ret_bk_sts_cd"/>]]></ret_bk_sts_cd>
						<ret_rcv_cnt><![CDATA[<bean:write name="valMap" property="ret_rcv_cnt"/>]]></ret_rcv_cnt>
					</DATA>
				</FIELD>
					
</logic:empty>
<%-- 오류발생 --%>
<logic:notEmpty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
	<ERROR>
		<MESSAGE><![CDATA[ <bean:write name="com.clt.framework.core.comm.EXCEPTION_OBJECT      " property="message"/>]]> </MESSAGE>
	</ERROR>
</logic:notEmpty>
