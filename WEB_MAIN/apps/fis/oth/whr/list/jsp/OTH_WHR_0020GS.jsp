<%--
=========================================================
*@FileName   : OTH_WHR_0020.jsp
*@FileTitle  : Other Sales List
*@Description: Other Sales List
*@author     : Jung,Byung-Chul - Cyberlogitec
*@version    : 1.0 - 10/20/2011
*@since      : 10/20/2011

*@Change history:
*@author     : Tuan.Chau
*@version    : 2.0 - 2014/06/18
*@since      : 2014/06/18
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
							<TD></TD>
							<TD><![CDATA[<bean:write name="row" property="wh_recp_no" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="wh_nm"  filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rgst_ofc_cd" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="recp_dt_tm"  filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="status"  filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="trk_bl_no"  filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="po_no"  filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="bl_no"  filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="maker_nm"  filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="shpr_nm"  filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cnee_nm"  filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="op_use_nm"  filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rmk"  filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rgst_usrid"  filter="false"/>]]></TD>
							<%-- OFVFOUR-7351 [UTS CARGO] ADDING COLUMN AND TOTAL TO WH RECEIPT ENTRY AND LIST SCREEN --%>
							<TD><![CDATA[<bean:write name="row" property="pck_qty"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="wgt_k"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="wgt_l"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="meas"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="act_wgt"/>]]></TD>
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
