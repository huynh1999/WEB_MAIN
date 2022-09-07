<%--
=========================================================
*Copyright(c) 2008 CyberLogitec. All Rights Reserved.
=========================================================
=========================================================
*@FileName   : SEE_BMD_0031GS.jsp
*@FileTitle  : Shipping Request할 HBL목록 조회
*@Description: 
*@author     : Kang,Jung-Gu - Cyberlogitec
*@version    : 
*@since      : 

*@Change history:
=========================================================
--%>
<%@ page contentType="text/xml; charset=UTF-8"%>
<%@page pageEncoding="UTF-8"%>
<%@include file="./../../../../../../syscommon/header/CLTGSHeader.jsp"%>
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
							<TD></TD>
							<TD><![CDATA[<bean:write name="row" property="bkg_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="bl_no"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="act_shpr_trdp_nm" filter="false"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="trnk_vsl_nm" filter="false"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="trnk_voy"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="obrd_dt_tm"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="pol_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pol_nod_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pol_nm" filter="false"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="pod_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pod_nod_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pod_nm" filter="false"/>]]></TD>
							
                            <TD><![CDATA[<bean:write name="row" property="del_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="del_nod_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="del_nm" filter="false"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="rep_cmdt_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="rep_cmdt_nm" filter="false"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="grs_wgt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="grs_wgt_ut_cd"/>]]></TD>

                            <TD><![CDATA[<bean:write name="row" property="act_wgt"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="act_wgt_ut_cd"/>]]></TD>
														
							<TD><![CDATA[<bean:write name="row" property="meas"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="meas_ut_cd"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="pck_qty"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="pck_ut_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pck_ut_nm" filter="false"/>]]></TD>
							
                            <TD><![CDATA[<bean:write name="row" property="intg_bl_seq"/>]]></TD>
							<TD></TD>
							
                            <TD><![CDATA[<bean:write name="row" property="lnr_trdp_cd"/>]]></TD>
                            <TD><![CDATA[<bean:write name="row" property="lnr_trdp_nm"  filter="false"/>]]></TD>
							
							<TD><![CDATA[<bean:write name="row" property="shpr_trdp_nm" filter="false"/>]]></TD>
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
