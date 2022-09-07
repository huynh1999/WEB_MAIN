<%--
=========================================================
*@FileName   : MGT_JOB_0010GS.jsp
*@FileTitle  : Job Management
*@Description: Job Management
*@author     : Jung,Hyun-woong - Cyberlogitec
*@version    : 1.0 - 01/19/2009
*@since      : 01/07/2009

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
				<bean:define id="tmpMapVal" name="EventResponse" property="mapVal"/>
				<bean:define id="strIdx" name="tmpMapVal" property="beginIdx"/>
				<% 
				boolean isBegin = true;
				%>				
				<bean:define id="rowSet" name="EventResponse" property="listVal"/>
				<SHEET>
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
					<logic:iterate id="row" name="rowSet">
						<tr>	
							<TD></TD>	
							<TD></TD>							
							<TD><![CDATA[<bean:write name="row" property="jb_tmplt_seq"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="jb_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="srt_seq"/>]]></TD>							
							<TD><![CDATA[<bean:write name="row" property="bse_tm_cd"/>]]></TD>					
							<TD><![CDATA[<bean:write name="row" property="pln_itval_hrs"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="act_itval_hrs"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="xter_dp_flg"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="eml_snd_flg"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="use_flg"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="jb_tmplt_itm_seq"/>]]></TD>
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
