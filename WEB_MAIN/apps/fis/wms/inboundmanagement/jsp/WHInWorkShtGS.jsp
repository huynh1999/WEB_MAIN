<%--
=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
=========================================================
 
=========================================================
*@FileName   : WWHM_WHM_0009GS.jsp
*@FileTitle  : 
*@Description: 
*@author     : Thoa.Dien - Cyberlogitec
*@version    : 1.0 - 2014/12/22
*@since      : 2014/12/22

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
				<SHEET>
					<DATA TOTAL="0"></DATA>
				</SHEET>	
			</logic:empty>
		<%-- 조회 결과가 있는 경우 --%>
			<logic:notEmpty name="EventResponse" property="listVal">
				<bean:define id="tmpMap" name="EventResponse" property="mapVal"/>
				<bean:define id="rowSet" name="EventResponse" property="listVal"/>
				<SHEET>
					<ETC-DATA> 
					    <ETC KEY="mess"><bean:write name="tmpMap" property="strMess"/></ETC>
					</ETC-DATA> 
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
					<logic:iterate id="row" name="rowSet">
						<tr>
							<TD><bean:write name="row" property="cust_ord_no"/></TD>   
							<TD><bean:write name="row" property="supv_nm"/></TD>       
							<TD><bean:write name="row" property="unload_dt"/></TD>     
							<TD><bean:write name="row" property="unload_hm_fr"/></TD>  
							<TD><bean:write name="row" property="unload_hm_to"/></TD>  
							<TD><bean:write name="row" property="msg_to_wk"/></TD>     
							<TD><bean:write name="row" property="gate_in_hm"/></TD> 
							<TD><bean:write name="row" property="gate_out_hm"/></TD>
							<TD><bean:write name="row" property="driver_nm"/></TD>     
							<TD><bean:write name="row" property="driver_lic_no"/></TD> 
							<TD><bean:write name="row" property="gate_no"/></TD>       
							<TD><bean:write name="row" property="unload_loc"/></TD>    
							<TD><bean:write name="row" property="unload_loc_nm"/></TD> 
							<TD><bean:write name="row" property="eq_tpsz_cd"/></TD>    
							<TD><bean:write name="row" property="eq_no"/></TD>         
							<TD><bean:write name="row" property="unload_sht_yn"/></TD> 
							<TD><bean:write name="row" property="bk_sts_cd"/></TD>     
							<TD><bean:write name="row" property="wh_cd"/></TD>         
			            </tr>
					</logic:iterate>
					</DATA>
				</SHEET>
			</logic:notEmpty>
</logic:empty>
<%-- 오류발생 --%>
<logic:notEmpty name="com.clt.framework.core.comm.EXCEPTION_OBJECT">
	<ERROR>
		<MESSAGE><![CDATA[ <bean:message name="com.clt.framework.core.comm.EXCEPTION_OBJECT" property="message"/>]]> </MESSAGE>
	</ERROR>
</logic:notEmpty>
