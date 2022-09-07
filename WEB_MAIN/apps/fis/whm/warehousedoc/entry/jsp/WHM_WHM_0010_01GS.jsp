<%--
=========================================================
*@FileName   : ACC_INV_0011GS.jsp
*@FileTitle  : Invoice Create
*@Description: Invoice Create
*@author     : Chungrue - Cyberlogitec
*@version    : 1.0 - 2011/11/04
*@since      : 2011/11/04

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
				</SHEET>	
			</logic:empty>
		<%-- 조회 결과가 있는 경우 --%>
			<logic:notEmpty name="EventResponse" property="listVal">
				<bean:define id="rowSet" name="EventResponse" property="listVal"/>
				<SHEET>
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
					<logic:iterate id="row" name="rowSet">
						<tr>
                            <TD></TD>														
                            <TD><![CDATA[<bean:write name="row" property="check_flag"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="f_wh_nm"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="file_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cust_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="bkg_dt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="rcv_shp_dt"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="cust_ref_no"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="splr_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="trkr_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="po_no"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="plt_no"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="cntr_no"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="mbl_no"/>]]></TD>                            
                            <TD><![CDATA[<bean:write name="row" property="hbl_no"/>]]></TD>						    
                            <TD><![CDATA[<bean:write name="row" property="rcv_by"/>]]></TD>
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
