<%--
=========================================================
*@FileName   : SEE_AMS_0010GS.jsp
*@FileTitle  : SEE AMS 
*@Description: SEE AMS 
*@author     : Chungrue
*@version    : 1.0 - 2012/09/10
*@since      : 2012/09/10

*@author2     : Tuan.Chau
*@version    : 2.0 - 2014/06/04
*@since      : 2014/06/04

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
				<bean:define id="rowSet" name="EventResponse" property="listVal"/>
				<SHEET>
					<DATA TOTAL="<bean:write name="EventResponse" property="listValCnt"/>">
					<logic:iterate id="row" name="rowSet">
						<tr>
							<!--#3712 [JAPT]HBL 단위로 EDI Entry 연결-->
							<TD>0</TD>	
				          	<TD><![CDATA[<bean:write name="row" property="hbl_no"/>]]></TD>
				          	<TD><![CDATA[<bean:write name="row" property="mbl_no"/>]]></TD>
				          	<TD><![CDATA[<bean:write name="row" property="ams_file_no"/>]]></TD>
				          	<TD><![CDATA[<bean:write name="row" property="send_msg" filter="false"/>]]></TD>
				          	<TD><![CDATA[<bean:write name="row" property="msg_sts_nm"/>]]></TD>
				          	<TD><![CDATA[<bean:write name="row" property="cstms_rgst_flg"/>]]></TD>
				          	<TD><![CDATA[<bean:write name="row" property="dspo_cd"/>]]></TD>
				          	<TD><![CDATA[<bean:write name="row" property="hold_cd"/>]]></TD>
				          	<TD><![CDATA[<bean:write name="row" property="send_dt"/>]]></TD>
				          	<TD><![CDATA[<bean:write name="row" property="lnr_trdp_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="trnk_vsl_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="trnk_voy"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pol_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pol_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pod_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pod_nm"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="etd_dt_tm"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="eta_dt_tm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="hbl_tp"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="lnr_trdp_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="intg_bl_seq"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="trnk_vsl_cd"/>]]></TD>

							<!--  #3685 [JAPT] AMS EDI - Transshipment AMS 전송 기능 보완-->
                            <TD><![CDATA[<bean:write name="row" property="trnk_vsl_nm_bl"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="pre_vsl_nm_shp"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="trnk_voy_bl"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="pre_voy_shp"/>]]></TD>
                            <TD></TD>
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
