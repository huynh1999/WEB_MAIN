<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	
	<bean:define id="hblVO"   name="EventResponse" property="objVal"/>
    <bean:define id="valMap"  name="EventResponse" property="mapVal"/>
    
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
    <title><bean:message key="system.title"/></title>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SEA_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/SEE_BMD_0190.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/autocomplete_ui.js?ver=<%=CLT_JS_VER%>"></script>	
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_FRT.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_CODE_UTIL.js?ver=<%=CLT_JS_VER%>"></script>
	
<script>
var AUTOCOMPLETE_YN = 'N';
<logic:notEmpty name="valMap" property="autocompleteYn">
	AUTOCOMPLETE_YN = '<bean:write name="valMap" property="autocompleteYn"/>';
</logic:notEmpty>
</script>	
	
	
<script type="text/javascript">

function setupPage() {
	loadPage();
}


</script>

<form name="frm1" method="POST" action="./">
	<!-- Report Value -->
	<input	type="hidden" name="f_cmd"/> 
	<div class="layer_popup_title">
	<!-- page_title_area -->
	<div class="page_title_area clear">
	   <h2 class="page_title">
			<span><bean:message key="Transshipped_Information"/></span>
	   </h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn">
		<button type="button" class="btn_accent" onclick="doWork('CLOSE')"><bean:message key="Close"/></button>
	   </div>
	</div>
	</div>
	<div class="layer_popup_contents">
	<div class="wrap_result">
		<div class="opus_design_inquiry">
		<table>
			<colgroup>
				<col width="88"></col>
				<col width="150"></col>
				<col width="88"></col>
				<col width="*"></col>
			</colgroup>
			<tbody>
				<tr>
                    <th><bean:message key="T_S_VSL_VOY"/></th>
                    <td colspan="3">
                        <input type="hidden" name="pre_vsl_cd" maxlength="50" value='<bean:write name="hblVO" property="pre_vsl_cd"/>'  >
                        <input type="text" name="pre_vsl_nm"   value='<bean:write name="hblVO" property="pre_vsl_nm"/>' onblur="strToUpper(this);" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:150px;text-transform:uppercase;" maxlength="50" onchange="" onKeyPress="if(event.keyCode==13){openPopUp('VESSEL_POPLIST', document.getElementById('prevesel'), frm1.pre_vsl_nm.value);}"><!--
                        --><button type="button" class="input_seach_btn" tabindex="-1" id="prevesel" onClick="openPopUp('VESSEL_POPLIST',this);"></button><!--
                        --><input type="text" name="pre_voy"      value='<bean:write name="hblVO" property="pre_voy"/>'   onchange="" onblur="strToUpper(this);"  class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:60px;text-transform:uppercase;" maxlength="15">
                    </td>
                </tr>
                <tr>
					<th><bean:message key="T_S_Port"/></th>
					<td>
						<input type="text" name="ts_pol_cd" id="ts_pol_cd"  maxlength="5" value='<bean:write name="hblVO" property="ts1_port_cd"/>' class="search_form" onKeyDown="codeNameAction('Location_ts_pol',this, 'onKeyDown','S')" onBlur="strToUpper(this);codeNameAction('Location_ts_pol',this, 'onBlur','S');" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px;"><!--
                        --><button type="button" class="input_seach_btn" tabindex="-1" name="ts_pol" id="ts_pol" onClick="openPopUp('LOCATION_POPLIST',this);"></button><!--
                        --><input type="text" name="ts_pol_nm" id="ts_pol_nm" maxlength="50" value='<bean:write name="hblVO" property="ts1_port_nm"/>' class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:162px;text-transform:uppercase;" onblur="strToUpper(this);" onKeyPress="if(event.keyCode==13){openPopUp('LOCATION_POPLIST', document.getElementById('ts_pol'), frm1.ts_pol_nm.value);}" onchange="">
					</td>
				</tr>
				<tr>
					<th><bean:message key="T_S_ETA"/></th>
					<td>
						<input name="ts_eta_dt_tm" value='<wrt:write name="hblVO" property="ts1_eta_dt_tm" formatType="DATE" fromFormat="yyyyMMdd" format="MM-dd-yyyy"/>'   type="text" class="search_form" onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1);" dataformat="excepthan" style="ime-mode:disabled;width:70px;" maxlength="10" >
					</td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<th><bean:message key="T_S_ETD"/></th>
					<td><input name="ts_etd_dt_tm" value='<wrt:write name="hblVO" property="ts1_etd_dt_tm" formatType="DATE" fromFormat="yyyyMMdd" format="MM-dd-yyyy"/>'   type="text" class="search_form" onKeyUp="mkDateFormatType(this, event, false,1)" onBlur="mkDateFormatType(this, event, true,1);" dataformat="excepthan" style="ime-mode:disabled;width:70px;" maxlength="10" ></td>
					<td></td>
					<td></td>
				</tr>
			</tbody>
		</table>
		</div>
	</div>
	</div>
</form>
</body>
</html>
