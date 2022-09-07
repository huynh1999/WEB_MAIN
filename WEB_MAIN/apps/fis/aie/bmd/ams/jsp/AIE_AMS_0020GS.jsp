<%--
=========================================================
*@FileName   : AIE_AMS_0020.jsp
*@FileTitle  : AMS SEND(AIR)
*@Description: AMS SEND(AIR)
*@author     : Chungrue
*@version    : 1.0 - 2012/09/10
*@since      : 2012/09/10

*@Change history: 
*@author     : Tuan.Chau
*@version    : 2.0
*@since      : 2014/07/25
==========================================================
--%>
<%@ page contentType="text/xml; charset=UTF-8"%>
<%@page pageEncoding="UTF-8"%>
<%@include file="./../../../../../../syscommon/header/CLTGSHeader.jsp"%>
<%-- 정상처리 --%>
<logic:empty name="com.clt.framework.core.comm.EXCEPTION_OBJECT      ">
	<logic:notEmpty name="EventResponse" property="objVal">
		<bean:define id="row" name="EventResponse" property="objVal"/>
		<SHEET>
			<DATA TOTAL="1">
				<TR>
					<TD><![CDATA[<bean:write name="row" property="intg_bl_seq"/>]]></TD>
					<TD><![CDATA[<bean:write name="row" property="mbl_no"/>]]></TD>
					<TD><![CDATA[<bean:write name="row" property="pol_cd"/>]]></TD>
					<TD><![CDATA[<bean:write name="row" property="pol_nm" filter="false"/>]]></TD>
					<TD><![CDATA[<bean:write name="row" property="pod_cd"/>]]></TD>
					<TD><![CDATA[<bean:write name="row" property="pod_nm" filter="false"/>]]></TD>
					<TD><![CDATA[<bean:write name="row" property="qty"/>]]></TD>
					<TD><![CDATA[<bean:write name="row" property="wgt"/>]]></TD>
					<TD><![CDATA[<bean:write name="row" property="shp_cd"/>]]></TD>
                    <TD><![CDATA[<bean:write name="row" property="shp_nm" filter="false"/>]]></TD>
                    <TD><![CDATA[<bean:write name="row" property="shp_addr" filter="false"/>]]></TD>
                    <TD><![CDATA[<bean:write name="row" property="shp_zip"/>]]></TD>
                    <TD><![CDATA[<bean:write name="row" property="shp_cnt"/>]]></TD>
                    <TD><![CDATA[<bean:write name="row" property="cne_cd"/>]]></TD>
                    <TD><![CDATA[<bean:write name="row" property="cne_nm" filter="false"/>]]></TD>
                    <TD><![CDATA[<bean:write name="row" property="cne_addr" filter="false"/>]]></TD>
                    <TD><![CDATA[<bean:write name="row" property="cne_zip"/>]]></TD>
                    <TD><![CDATA[<bean:write name="row" property="cne_cnt"/>]]></TD>
                    <TD><![CDATA[<bean:write name="row" property="curr_cd"/>]]></TD>
                    <TD><![CDATA[<bean:write name="row" property="frt_term_cd"/>]]></TD>
                    <TD><![CDATA[<bean:write name="row" property="shp_nm"/>]]></TD>
                    <TD></TD>
					
	            </TR>
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
