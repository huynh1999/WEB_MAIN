<%--
=========================================================
*@FileName   : MDM_MCM_0340GS.jsp
*@FileTitle  : Other Operation COde
*@Description: Other Operation COde
*@author     : Jung,Byung-Chul - Cyberlogitec
*@version    : 1.0 - 10/19/2011
*@since      : 10/19/2011

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
				<% 
				boolean isBegin = true;
				int cnt = 0;
				%>
				
				<bean:define id="rowSet" name="EventResponse" property="listVal"/>
				<SHEET>
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
					<logic:iterate id="row" name="rowSet">
			            <tr>
			            	<TD></TD>	
							<TD><![CDATA[<bean:write name="row" property="wh_recp_no" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="wh_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="recp_dt_tm"  filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="status"  filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="maker_nm"  filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="shpr_nm"  filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cnee_nm"  filter="false"/>]]></TD>							
							<TD><![CDATA[<bean:write name="row" property="op_use_nm"  filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="po_no"  filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pck_qty"  filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="wgt_k"  filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="wgt_l"  filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="meas"  filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="length"  filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="width"  filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="height"  filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="maker_cd"  filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="shpr_cd"  filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cnee_cd"  filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="maker_eng_addr"  filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="shpr_eng_addr"  filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cnee_eng_addr"  filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="shpd"  filter="false"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="act_wgt_k"  filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="act_wgt_l"  filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="exist_flg"  filter="false"/>]]></TD>
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
