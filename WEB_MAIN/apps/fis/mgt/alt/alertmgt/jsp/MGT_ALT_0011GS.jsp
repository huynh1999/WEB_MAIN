<%--
=========================================================
*@FileName   : MGT_EQS_0011GS.jsp
*@FileTitle  : EQ Status
*@Description: EQ Status 정보를 출력한다.
*@author     : 오요한
*@version    : 1.0 - 12/09/2013
*@since      : 12/09/2013

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
					int cnt = 0;
					boolean isBegin = true;
				%>
			
				<bean:define id="rowSet" name="EventResponse" property="listVal"/>
				<SHEET>
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
					<logic:iterate id="row" name="rowSet">
						<tr>		
							<TD></TD>
							<TD></TD>
							<TD><![CDATA[<bean:write name="row" property="use_flg"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="alt_tp"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="ofc_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="alt_nm"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="phys_ett_nm"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="phys_attr_nm"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="eml_to"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="eml_cc"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="usr_param"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="trdp_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="tp_grp"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="st_days"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="st_hours"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="st_tm"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="end_days"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="end_hours"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="end_tm"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="batch_tm"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="wknd_snd_flg"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="last_snd_tm"/>]]></TD>
                            <TD></TD>
                            <TD><![CDATA[<bean:write name="row" property="alt_seq"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="rgst_fom_seq"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="rgst_usrid"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="rgst_tms"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="modi_usrid"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="modi_tms"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="fom_modi_usrid"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="fom_modi_tms"/>]]></TD>
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
