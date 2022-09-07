<%--
=========================================================
*@FileName   : SEE_AMS_0020GS.jsp
*@FileTitle  : SEE AMS 
*@Description: SEE AMS 
*@author     : Chungrue
*@version    : 1.0 - 2012/09/10
*@since      : 2012/09/10

*@Change history:
=========================================================
--%>
<%@ page contentType="text/xml; charset=UTF-8"%>
<%@page pageEncoding="UTF-8"%>

<%@include file="./../../../../../../syscommon/header/CLTGSHeader.jsp"%>
<%-- 정상처리 --%>
<logic:empty name="ERR_MSG">
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
							<TD>0</TD>
							<TD></TD>	<!-- valid_cd -->
							<TD>N</TD>	<!-- ready_flg -->
							<TD><![CDATA[<bean:write name="row" property="mbl_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="hbl_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="hbl_tp"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="sub_tp"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="msg_sts_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="cstms_rgst_flg"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="dspo_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="hold_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ams_sts"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ams_file_no"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="etd_dt_tm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="eta_dt_tm"/>]]></TD>
		                    <TD><![CDATA[<bean:write name="row" property="ams_por_cd"/>]]></TD>
		                    <TD><![CDATA[<bean:write name="row" property="por_nm"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="ams_pol_cd"/>]]></TD>
							<TD><![CDATA[<bean:write name="row" property="pol_nm"/>]]></TD>
		                    <TD><![CDATA[<bean:write name="row" property="ams_lst_pol_cd"/>]]></TD>
		                    <TD><![CDATA[<bean:write name="row" property="lst_pol_nm"/>]]></TD>
		                    <TD><![CDATA[<bean:write name="row" property="ams_pod_cd"/>]]></TD>
		                    <TD><![CDATA[<bean:write name="row" property="pod_nm"/>]]></TD>
		                    <TD><![CDATA[<bean:write name="row" property="ams_del_cd"/>]]></TD>
		                    <TD><![CDATA[<bean:write name="row" property="pck_qty"/>]]></TD>
		                    <TD><![CDATA[<bean:write name="row" property="pck_ut_cd"/>]]></TD>
		                    <!-- #3876 [JAPT] AMS EDI - CNTR Item modification, Qty sum and Mark&numbers.-->
		                    <TD><![CDATA[<bean:write name="row" property="ttl_itm_pck_qty"/>]]></TD>
		                    <TD><![CDATA[<bean:write name="row" property="grs_wgt"/>]]></TD>
		                    <TD><![CDATA[<bean:write name="row" property="it_tp"/>]]></TD>
		                    <TD><![CDATA[<bean:write name="row" property="shpr_nm"/>]]></TD>
		                    <TD><![CDATA[<bean:write name="row" property="shpr_addr"/>]]></TD>
		                    <TD></TD>
		                    <TD><![CDATA[<bean:write name="row" property="cnee_nm"/>]]></TD>
		                    <TD><![CDATA[<bean:write name="row" property="cnee_addr"/>]]></TD>
		                    <TD></TD>
		                    <TD><![CDATA[<bean:write name="row" property="ntfy_nm"/>]]></TD>
		                    <TD><![CDATA[<bean:write name="row" property="ntfy_addr"/>]]></TD>
		                    <TD></TD>
		                    <TD><![CDATA[<bean:write name="row" property="intg_bl_seq"/>]]></TD>
		                    <TD><![CDATA[<bean:write name="row" property="por_cd"/>]]></TD>
		                    <TD><![CDATA[<bean:write name="row" property="pol_cd"/>]]></TD>
		                    <TD><![CDATA[<bean:write name="row" property="lst_pol_cd"/>]]></TD>
		                    <TD><![CDATA[<bean:write name="row" property="pod_cd"/>]]></TD>
		                    <TD><![CDATA[<bean:write name="row" property="del_cd"/>]]></TD>
		                    <TD><![CDATA[<bean:write name="row" property="it_no"/>]]></TD>
		                    <TD><![CDATA[<bean:write name="row" property="bond_id"/>]]></TD>
		                    <TD><![CDATA[<bean:write name="row" property="hub_ams"/>]]></TD>
		                    <TD><![CDATA[<bean:write name="row" property="last_usa_ams"/>]]></TD>		                    
		                    <TD><![CDATA[<bean:write name="row" property="snp_cd"/>]]></TD>
		                    <TD><![CDATA[<bean:write name="row" property="lst_pol_cd"/>]]></TD>
		                    <TD><![CDATA[<bean:write name="row" property="ts_cgo"/>]]></TD>
		                    <TD><![CDATA[<bean:write name="row" property="ts_cd"/>]]></TD>
		                    <TD><![CDATA[<bean:write name="row" property="lst_usa_cd"/>]]></TD>
		                    <TD><![CDATA[<bean:write name="row" property="ams_snd"/>]]></TD>
		                    <TD><![CDATA[<bean:write name="row" property="cust_ref_no"/>]]></TD>
		                    <TD><![CDATA[<bean:write name="row" property="intg_mbl_seq"/>]]></TD>
		                    <TD><![CDATA[<bean:write name="row" property="ref_no"/>]]></TD>
		                    <!--#3698 [JAPT] AMS code 로 package 전송-->
		                    <TD><![CDATA[<bean:write name="row" property="ams_pck_ut_cd"/>]]></TD>
		                    <TD></TD>
	            		</tr>
					</logic:iterate>
					</DATA>
				</SHEET>
			</logic:notEmpty>
</logic:empty>
<%-- 오류발생 --%>
<logic:notEmpty name="ERR_MSG">
	<ERROR>
		<MESSAGE><![CDATA[<%=(String)request.getAttribute("ERR_MSG")%>]]> </MESSAGE>
	</ERROR>
</logic:notEmpty>
