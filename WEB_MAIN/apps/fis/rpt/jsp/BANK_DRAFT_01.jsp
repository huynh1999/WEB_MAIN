<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
    <%@include file="./../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/rpt/BANK_DRAFT_01.js?ver=<%=CLT_JS_VER%>"></script>
	
	
	<bean:parameter id="txt_us_amt" name="txt_us_amt"/>
	<bean:parameter id="issue_dt" name="issue_dt"/>
	<bean:parameter id="txt_first_ext" name="txt_first_ext"/>
	<bean:parameter id="txt_ship_nm" name="txt_ship_nm"/>
	<bean:parameter id="txt_lc_no" name="txt_lc_no"/>
	<bean:parameter id="txt_open_bank" name="txt_open_bank"/>
	<bean:parameter id="open_dt" name="open_dt"/>
	<bean:parameter id="txt_input_01" name="txt_input_01"/>
	<bean:parameter id="txt_to_nm" name="txt_to_nm"/>
	<bean:parameter id="txt_to_addr" name="txt_to_addr"/>
	<bean:parameter id="txt_no_nm" name="txt_no_nm"/>
	<bean:parameter id="txt_nty_nm" name="txt_nty_nm"/>
	<bean:parameter id="txt_input_02" name="txt_input_02"/>
	<bean:parameter id="txt_input_03" name="txt_input_03"/>
	<bean:parameter id="txt_glt_addr" name="txt_glt_addr"/>
	<bean:parameter id="txt_glt_nm" name="txt_glt_nm"/>
	<bean:parameter id="origin_cpy_chk1" name="origin_cpy_chk1"/>
	<bean:parameter id="origin_cpy_chk2" name="origin_cpy_chk2"/>
	<bean:parameter id="origin_cpy_chk3" name="origin_cpy_chk3"/>
	<bean:parameter id="txt_input_04" name="txt_input_04"/>
	<bean:parameter id="txt_input_05" name="txt_input_05"/>
	<bean:parameter id="txt_input_06" name="txt_input_06"/>
	<bean:parameter id="txt_input_07" name="txt_input_07"/>
	<bean:parameter id="txt_input_08" name="txt_input_08"/>
	<bean:parameter id="txt_input_09" name="txt_input_09"/>
	<bean:parameter id="txt_input_10" name="txt_input_10"/>
	<bean:parameter id="txt_input_11" name="txt_input_11"/>
	<bean:parameter id="txt_input_12" name="txt_input_12"/>
	<bean:parameter id="txt_input_13" name="txt_input_13"/>
	<bean:parameter id="txt_input_14" name="txt_input_14"/>
	
</head>
<bean:define id="tmpMap"  name="EventResponse" property="mapVal"/>
<body onLoad="loadPage();">
<form name="form" method="POST" action="./">
	<input	type="hidden" name="f_cmd"/> 
	
	<input	type="hidden" name="txt_us_amt" value="<bean:write name="txt_us_amt"/>"/>
	<input	type="hidden" name="issue_dt" value="<bean:write name="issue_dt"/>"/>
	<input	type="hidden" name="txt_first_ext" value="<bean:write name="txt_first_ext"/>"/>
	<input	type="hidden" name="txt_ship_nm" value="<bean:write name="txt_ship_nm"/>"/>
	<input	type="hidden" name="txt_lc_no" value="<bean:write name="txt_lc_no"/>"/>
	<input	type="hidden" name="txt_open_bank" value="<bean:write name="txt_open_bank"/>"/>
	<input	type="hidden" name="open_dt" value="<bean:write name="open_dt"/>"/>
	<input	type="hidden" name="txt_input_01" value="<bean:write name="txt_input_01"/>"/>
	<input	type="hidden" name="txt_to_nm" value="<bean:write name="txt_to_nm"/>"/>
	<input	type="hidden" name="txt_to_addr" value="<bean:write name="txt_to_addr"/>"/>
	<input	type="hidden" name="txt_no_nm" value="<bean:write name="txt_no_nm"/>"/>
	<input	type="hidden" name="txt_nty_nm" value="<bean:write name="txt_nty_nm"/>"/>
	<input	type="hidden" name="txt_input_02" value="<bean:write name="txt_input_02"/>"/>
	<input	type="hidden" name="txt_input_03" value="<bean:write name="txt_input_03"/>"/>
	<input	type="hidden" name="txt_glt_addr" value="<bean:write name="txt_glt_addr"/>"/>
	<input	type="hidden" name="txt_glt_nm" value="<bean:write name="txt_glt_nm"/>"/>
	<input	type="hidden" name="origin_cpy_chk1" value="<bean:write name="origin_cpy_chk1"/>"/>
	<input	type="hidden" name="origin_cpy_chk2" value="<bean:write name="origin_cpy_chk2"/>"/>
	<input	type="hidden" name="origin_cpy_chk3" value="<bean:write name="origin_cpy_chk3"/>"/>
	<input	type="hidden" name="txt_input_04" value="<bean:write name="txt_input_04"/>"/>
	<input	type="hidden" name="txt_input_05" value="<bean:write name="txt_input_05"/>"/>
	<input	type="hidden" name="txt_input_06" value="<bean:write name="txt_input_06"/>"/>
	<input	type="hidden" name="txt_input_07" value="<bean:write name="txt_input_07"/>"/>
	<input	type="hidden" name="txt_input_08" value="<bean:write name="txt_input_08"/>"/>
	<input	type="hidden" name="txt_input_09" value="<bean:write name="txt_input_09"/>"/>
	<input	type="hidden" name="txt_input_10" value="<bean:write name="txt_input_10"/>"/>
	<input	type="hidden" name="txt_input_11" value="<bean:write name="txt_input_11"/>"/>
	<input	type="hidden" name="txt_input_12" value="<bean:write name="txt_input_12"/>"/>
	<input	type="hidden" name="txt_input_13" value="<bean:write name="txt_input_13"/>"/>
	<input	type="hidden" name="txt_input_14" value="<bean:write name="txt_input_14"/>"/>
	
	<!-- Report Value -->
	<input	type="hidden" name="f_to_type"/>
	<input	type="hidden" name="cmd_type"/>
	<input	type="hidden" name="title" value="BankDraft Print"/>
	
	
	
</form>
</body>
</html>
