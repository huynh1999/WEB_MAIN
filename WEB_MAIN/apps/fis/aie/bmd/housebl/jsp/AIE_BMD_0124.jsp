<%--
=========================================================
*Copyright(c) 2009 CyberLogitec. All Rights Reserved.
=========================================================
=========================================================
*@FileName   : AIE_BMD_0124.jsp
*@FileTitle  : A.E.S Send
*@Description: A.E.S 전송
*@author     : PJK
*@version    : 1.0 - 12/12/2011
*@since      :

*@Change history:
=========================================================
--%>

<%@page import="com.clt.syscommon.response.CommonEventResponse"%>
<%@page import="java.util.HashMap"%>

<form name="frm3" action="https://ace.cbp.dhs.gov/nace/aes/aesdirect-ui/secured/createWeblinkFiling" method="POST" target="blank">
<div id="aes_data_1">
	<input type="hidden" name="wl_app_ident" id="wl_app_ident"  value="wlcyb01">
	<input type="hidden" name="wl_app_name"  id="wl_app_name" value="OPUS Forwarding">
	
	<input type="hidden" name="wl_nologin_url" id="wl_nologin_url" value="http://<%=request.getServerName()%>:<%=request.getServerPort()%><%=request.getContextPath()%>/NoLogin.html">
	<input type="hidden" name="wl_nosed_url"  id="wl_nosed_url"  value="http://<%=request.getServerName()%>:<%=request.getServerPort()%><%=request.getContextPath()%>/NoEei.html">
	<input type="hidden" name="wl_success_url" id="wl_success_url"  value="http://<%=request.getServerName()%>:<%=request.getServerPort()%><%=request.getContextPath()%>/Success.html">
	<input type="hidden" name="EMAIL" id="EMAIL"  value="<bean:write name="hblVO" property="rsps_eml"/>">
	
	<input type="hidden" name="VPN" id="VPN" value="">
	<input type="hidden" name="NOEMAIL" id="NOEMAIL" value="">
</div>
<div id="aes_data_2">
	<input type="hidden" name="SRN" id="SRN" value="<bean:write name="hblVO" property="hbl_no"/>">
	<input type="hidden" name="BN"  id="BN" value="">
	<input type="hidden" name="FO"  id="FO" value="<bean:write name="hblVO" property="file_tp"/>">
	<input type="hidden" name="ST"  id="ST" value="<bean:write name="hblVO" property="state_cd"/>">
	<input type="hidden" name="FTZ" id="FTZ" value="<bean:write name="hblVO" property="ftz_cd"/>">
	<input type="hidden" name="POE" id="POE" value="<bean:write name="hblVO" property="pol_cd"/>">
	<input type="hidden" name="COD" id="COD" value="<bean:write name="hblVO" property="cnt_cd"/>">
	<input type="hidden" name="POU" id="POU" value="">
	<input type="hidden" name="EDA" id="EDA" value="<wrt:write name="hblVO" property="etd_dt_tm" formatType="DATE" fromFormat="yyyyMMdd" format="MM/dd/yy"/>">
	<input type="hidden" name="MOT" id="MOT" value="<bean:write name="hblVO" property="trs_cd"/>">
	<input type="hidden" name="SCAC" id="SCAC" value="<bean:write name="hblVO" property="carr_trdp_cd1"/>">
	<input type="hidden" name="VN"  id="VN" value="<bean:write name="hblVO" property="carr_trdp_nm1"/>">
	<input type="hidden" name="VF"  id="VF" value="<bean:write name="hblVO" property="vsl_flg"/>">
	<input type="hidden" name="RCC" id="RCC" value="<bean:write name="hblVO" property="rcc_flg"/>">
	<input type="hidden" name="HAZ" id="HAZ" value="<bean:write name="hblVO" property="haz_flg"/>">
	<input type="hidden" name="RT"  id="RT" value="<bean:write name="hblVO" property="rt_flg"/>">
	<input type="hidden" name="IBN" id="IBN" value="<bean:write name="hblVO" property="imp_en_no"/>">
	<input type="hidden" name="IBT" id="IBT" value="<bean:write name="hblVO" property="ibd_tp"/>">
</div>
<div id="aes_data_3">
	<input type="hidden" name="AD0_1"  id="AD0_1" value="<bean:write name="hblVO" property="shp_nm"/>">
	<input type="hidden" name="AD0_2"  id="AD0_2" value="<bean:write name="hblVO" property="shp_id"/>">
	<input type="hidden" name="AD0_3"  id="AD0_3" value="<bean:write name="hblVO" property="shp_tax_type"/>">
	<input type="hidden" name="AD0_4"  id="AD0_4" value="">
	<input type="hidden" name="AD0_5"  id="AD0_5" value="">
	<input type="hidden" name="AD0_6"  id="AD0_6" value="<bean:write name="hblVO" property="shp_city_nm"/>">
	<input type="hidden" name="AD0_7"  id="AD0_7" value="<bean:write name="hblVO" property="shp_state_cd"/>">
	<input type="hidden" name="AD0_8"  id="AD0_8" value="<bean:write name="hblVO" property="shp_zip"/>">
	<input type="hidden" name="AD0_9"  id="AD0_9" value="<bean:write name="hblVO" property="shp_pic_f"/>">
	<input type="hidden" name="AD0_11" id="AD0_11" value="<bean:write name="hblVO" property="shp_pic_l"/>">
	<input type="hidden" name="AD0_12" id="AD0_12" value="">
</div>
<div id="aes_data_4">
	<input type="hidden" name="AD1_3"   id="AD1_3" value="<bean:write name="hblVO" property="ult_cnee_nm"/>">
	<input type="hidden" name="AD1_5"   id="AD1_5" value="<bean:write name="hblVO" property="ult_cnee_pic"/>">
	<input type="hidden" name="AD1_7"   id="AD1_7" value="<bean:write name="hblVO" property="ult_cnee_phn"/>">
	<input type="hidden" name="AD1_8"   id="AD1_8" value="">
	<input type="hidden" name="AD1_9"   id="AD1_9" value="">
	<input type="hidden" name="AD1_10"  id="AD1_10" value="<bean:write name="hblVO" property="ult_cnee_city_nm"/>">
	<input type="hidden" name="AD1_11"  id="AD1_11" value="<bean:write name="hblVO" property="ult_cnee_state_cd"/>">
	<input type="hidden" name="AD1_12"  id="AD1_12" value="<bean:write name="hblVO" property="ult_cnee_cnt"/>">
	<input type="hidden" name="AD1_13"  id="AD1_13" value="<bean:write name="hblVO" property="ult_cnee_zip"/>">
	<input type="hidden" name="AD1_14"  id="AD1_14" value="<bean:write name="hblVO" property="ult_cnee_tp"/>">
</div>
<div id="aes_data_5">
	<input type="hidden" name="AD4_3"   id="AD4_3"  value="<bean:write name="hblVO" property="inter_cnee_nm"/>">
	<input type="hidden" name="AD4_5"   id="AD4_5"  value="<bean:write name="hblVO" property="inter_cnee_pic"/>">
	<input type="hidden" name="AD4_7"   id="AD4_7"  value="<bean:write name="hblVO" property="inter_cnee_phn"/>">
	<input type="hidden" name="AD4_8"   id="AD4_8"  value="">
	<input type="hidden" name="AD4_9"   id="AD4_9"  value="">
	<input type="hidden" name="AD4_10"  id="AD4_10"  value="<bean:write name="hblVO" property="inter_cnee_city_nm"/>">
	<input type="hidden" name="AD4_11"  id="AD4_11"  value="<bean:write name="hblVO" property="inter_cnee_state_cd"/>">
	<input type="hidden" name="AD4_12"  id="AD4_12"  value="<bean:write name="hblVO" property="inter_cnee_cnt"/>">
	<input type="hidden" name="AD4_13"  id="AD4_13"  value="<bean:write name="hblVO" property="inter_cnee_zip"/>">
</div>
<div id="aes_data_6">
	<input type="hidden" name="AD3_2"   id="AD3_2"     value="<bean:write name="hblVO" property="fwd_tax_type"/>">
	<input type="hidden" name="AD3_3"   id="AD3_3"     value="<bean:write name="hblVO" property="fwd_nm"/>">
	<input type="hidden" name="AD3_4"   id="AD3_4"     value="<bean:write name="hblVO" property="fwd_id"/>">
	<input type="hidden" name="AD3_5"   id="AD3_5"     value="<bean:write name="hblVO" property="fwd_pic"/>">
	<input type="hidden" name="AD3_7"   id="AD3_7"     value="<bean:write name="hblVO" property="fwd_phn"/>">
	<input type="hidden" name="AD3_8"   id="AD3_8"     value="">
	<input type="hidden" name="AD3_9"   id="AD3_9"     value="">
	<input type="hidden" name="AD3_10"  id="AD3_10"     value="<bean:write name="hblVO" property="fwd_city_nm"/>">
	<input type="hidden" name="AD3_11"  id="AD3_11"     value="<bean:write name="hblVO" property="fwd_state_cd"/>">
	<input type="hidden" name="AD3_12"  id="AD3_12"     value="<bean:write name="hblVO" property="cnt_cd"/>">
	<input type="hidden" name="AD3_13"  id="AD3_13"     value="<bean:write name="hblVO" property="fwd_zip"/>">
</div>
<%
	CommonEventResponse cmmEvent = (CommonEventResponse)request.getAttribute("EventResponse");
	HashMap rtnMap = cmmEvent.getMapVal();
	if(rtnMap.containsKey("sndAesRow")){
		int row = (Integer)rtnMap.get("sndAesRow") + 1;
		
		for(int i = 1 ; i < row ; i++){
%>
<div id="aes_data_temp_<%= i %>">
   	<input type="hidden" name="isLine<%= i %>" id="isLine<%= i %>" value="Y">
	<input type="hidden" name="IT<%= i %>_1"   id="IT<%= i %>_1"   value="<bean:write name="hblVO" property="exp_cd"/>">
	<input type="hidden" name="IT<%= i %>_2"   id="IT<%= i %>_2"   value="">
	<input type="hidden" name="IT<%= i %>_3"   id="IT<%= i %>_3"   value="">
	<input type="hidden" name="IT<%= i %>_4"   id="IT<%= i %>_4"   value="">
	<input type="hidden" name="IT<%= i %>_5"   id="IT<%= i %>_5"   value="">
	<input type="hidden" name="IT<%= i %>_6"   id="IT<%= i %>_6"   value="">
	<input type="hidden" name="IT<%= i %>_7"   id="IT<%= i %>_7"   value="">
	<input type="hidden" name="IT<%= i %>_8"   id="IT<%= i %>_8"   value="<bean:write name="hblVO" property="licen_tp"/>">
	<input type="hidden" name="IT<%= i %>_9"   id="IT<%= i %>_9"   value="<bean:write name="hblVO" property="licen_no"/>">
	<input type="hidden" name="IT<%= i %>_12"  id="IT<%= i %>_12"   value="">
	<input type="hidden" name="IT<%= i %>_13"  id="IT<%= i %>_13"   value="">
	<input type="hidden" name="IT<%= i %>_15"  id="IT<%= i %>_15"   value="">
	<input type="hidden" name="IT<%= i %>_16"  id="IT<%= i %>_16"   value="">
	<input type="hidden" name="IT<%= i %>_17"  id="IT<%= i %>_17"   value="">
	<input type="hidden" name="IT<%= i %>_18"  id="IT<%= i %>_18"   value="">
	<input type="hidden" name="IT<%= i %>_19"  id="IT<%= i %>_19"   value="">
	<input type="hidden" name="IT<%= i %>_20" id="IT<%= i %>_20" value="">
	<input type="hidden" name="IT<%= i %>_21" id="IT<%= i %>_21" value="">
	
	<input type="hidden" name="EP<%= i %>_1" id="EP<%= i %>_1" value="">
	<input type="hidden" name="EP<%= i %>_2" id="EP<%= i %>_2" value="">
	<input type="hidden" name="EP<%= i %>_3" id="EP<%= i %>_3" value="">
	<input type="hidden" name="EP<%= i %>_4" id="EP<%= i %>_4" value="">
	<input type="hidden" name="EP<%= i %>_5" id="EP<%= i %>_5" value="">
	
	<input type="hidden" name="ODTC<%= i %>_1"  id="ODTC<%= i %>_1"  value="<bean:write name="hblVO" property="ddtc_itar_no"/>">
	<input type="hidden" name="ODTC<%= i %>_2"  id="ODTC<%= i %>_2"  value="<bean:write name="hblVO" property="ddtc_regi_no"/>">
	<input type="hidden" name="ODTC<%= i %>_3"  id="ODTC<%= i %>_3"  value="<bean:write name="hblVO" property="ddtc_eq_flg"/>">
	<input type="hidden" name="ODTC<%= i %>_4"  id="ODTC<%= i %>_4"  value="<bean:write name="hblVO" property="ddtc_prty_certi_flg"/>">
	<input type="hidden" name="ODTC<%= i %>_5"  id="ODTC<%= i %>_5"  value="<bean:write name="hblVO" property="ddtc_usml_cd"/>">
	<input type="hidden" name="ODTC<%= i %>_6"  id="ODTC<%= i %>_6"  value="<bean:write name="hblVO" property="ddtc_pck_qty"/>">
	<input type="hidden" name="ODTC<%= i %>_7"  id="ODTC<%= i %>_7"  value="<bean:write name="hblVO" property="ddtc_pck_ut_cd"/>">
</div>
<%
		}
	}
%>
</form>