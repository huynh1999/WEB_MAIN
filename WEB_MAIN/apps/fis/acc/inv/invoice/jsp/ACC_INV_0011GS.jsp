<%--
=========================================================
*@FileName   : ACC_INV_0011GS.jsp
*@FileTitle  : Invoice Create Freight Item
*@Description: Invoice Create Freight Item
*@author     : Choi,Gil-Ju - Cyberlogitec
*@version    : 1.0 - 03/04/2009
*@since      : 03/04/2009

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
							<TD></TD>
							<TD></TD>
							<TD></TD>
							<TD><![CDATA[<bean:write name="row" property="l_hbl_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="l_mbl_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="l_bkg_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="l_wo_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="l_frt_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="l_frt_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="l_rat_curr_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="l_inv_curr_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="l_ru"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="l_qty"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="l_inv_xcrt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="l_inv_amt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="l_vat_rt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="l_inv_vat_amt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="l_inv_sum_amt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="l_frt_seq"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="l_trdp_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="l_inv_iss_flg"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="l_intg_bl_seq"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="l_inv_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="l_frt_ask_clss_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="l_rlt_cnt"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="l_inv_seq"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="l_air_sea_clss_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="l_bnd_clss_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="l_inv_aply_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="l_frgn_curr_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="l_inv_xcrt_dt"/>]]></TD>
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
