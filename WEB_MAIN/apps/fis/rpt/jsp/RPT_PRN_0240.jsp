<!-- 
//=========================================================
//*@FileName   : RPT_PRN_0240.jsp
//*@FileTitle  : RPT
//*@Change history:
//*@author     : Seol Young Cheol
//*@version    : 2.0 - 11/13/2015
//*@since      : 11/13/2015
//=========================================================
 -->
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@include file="./../../../../syscommon/header/CLTHeader.jsp"%>
<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_CODE_UTIL.js?ver=<%=CLT_JS_VER%>"></script>
<script language="javascript" src="<%=CLT_PATH%>/apps/fis/rpt/RPT_PRN_0240.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/COM_FRT_MSG.js?ver=<%=CLT_JS_VER%>"></script>
<script language="javascript" src="<%=CLT_PATH%>/js/common/cookie.js?ver=<%=CLT_JS_VER%>"></script>
<script language="javascript">
	//memo 를 핸들링 하는 부분
	function chkText(){
	}

	var usrid = "<%=userInfo.getUsrid()%>";
	var ofc_cnt_cd1 = "<%=userInfo.getOfc_cnt_cd()%>";
</script>
<script>
function setupPage(){
	loadPage();
}

var v_ofc_eng_nm = "<%=userInfo.getOfc_eng_nm()%>";	 
var v_eml = "<%=userInfo.getEml()%>";												
var v_ofc_cd = "<%=userInfo.getOfc_cd()%>";
var v_phn = "<%=userInfo.getPhn()%>";  
var v_fax = "<%=userInfo.getFax()%>";
var prn_ofc_cd = "<%=(String)application.getAttribute("PRNT_OFC_CD")%>";
</script>	
<bean:define id="hmOutParam"  name="EventResponse" property="objVal"/>
<bean:define id="tmpMap"  name="EventResponse" property="mapVal"/>
<style> body { border-top-width: 6px!important; } </style>
<form name="frm1" method="POST" action="./">
	<input	type="hidden" name="f_cmd"/> 
	<!-- Report Value -->
	<input	type="hidden" name="cmd_type"/>
	<input	type="hidden" name="title" value="Booking Confirmation"/>
	<input	type="hidden" name="stamp"/>
	<input	type="hidden" name="all"/>
	<input	type="hidden" name="rcvd_dt_tm"/>
	<input	type="hidden" name="rider_flg" value="<bean:write name="tmpMap" property="rider_flg"/>"/>
	<input	type="hidden" name="h_agent_text" value="<bean:write name="tmpMap" property="agent_text"/>"/>
	<input	type="hidden" name="org_rmk" value="<bean:write name="hmOutParam" property="RMK"/>"/>
	<input	type="hidden" name="file_name"/>
	<input	type="hidden" name="title"/>
	<input	type="hidden" name="rd_param"/>
	<input	type="hidden" name="mailTitle" value="<bean:write name="tmpMap" property="mailTitle"/>"/>
	<input	type="hidden" name="mailTo" value="<bean:write name="tmpMap" property="mailTo"/>"/>
	<!--  Report ==> OutLook연동 파라미터 (S) -->
	<input type="hidden" name="rpt_biz_tp"/>
	<input type="hidden" name="rpt_biz_sub_tp"/>
	<!--  Report ==> OutLook연동 파라미터 (E) -->
	<!--  OE HBL Form -->
	<input	type="hidden" name="oe_hbl_form" value="<bean:write name="tmpMap" property="oe_hbl_form"/>"/>
	
	<input type="hidden" id="prt_option" name="prt_option" value="opt_print"/>
	<!--  Logo Yn Form -->
	<input	type="hidden" name="logoYn" value="<bean:write name="tmpMap" property="logoYn"/>"/>	
	
	<div class="layer_popup_title">
		<!-- Button -->
		<div class="page_title_area clear">
	   	   <h2 class="page_title" align="left"><bean:message key="Booking_Confirmation"/></h2>
		   <div class="opus_design_btn">
		   <%-- <input	type="hidden" name="v_ofc_eng_nm"  value="<bean:write name="hmOutParam" property="v_ofc_eng_nm"/>"/>
		   <input	type="hidden" name="v_eml"         value="<bean:write name="hmOutParam" property="v_eml"/>"/>
		   <input	type="hidden" name="v_ofc_cd"      value="<bean:write name="hmOutParam" property="v_ofc_cd"/>"/>
		   <input	type="hidden" name="v_phn"         value="<bean:write name="hmOutParam" property="v_phn"/>"/>
		   <input	type="hidden" name="v_fax"         value="<bean:write name="hmOutParam" property="v_fax"/>"/>
		   <input	type="hidden" name="prn_ofc_cd"    value="<bean:write name="hmOutParam" property="prn_ofc_cd"/>"/> --%>
			<button id="btnPrint" type="button" class="btn_accent" onclick="doWork('Print')"><bean:message key="Print"/></button><!--
			--><button type="button" class="btn_accent" onclick="doWork('PREVIEW')" id="btnPreview"><bean:message key="Preview"/></button><!-- 
			--><button type="button" class="btn_normal" onclick="doWork('CLOSE')"><bean:message key="Close"/></button>
		   </div>
		</div>
	</div>
	<div class="layer_popup_contents">
		<div class="wrap_result">
	    	<div class="opus_design_grid" style="width:720px">
	    		<table border="0" cellpadding="0" cellspacing="0">
			        <tr>
			            <th width="90px" scope="row" nowrap class="table_search_head" align="right"><bean:message key="BL_Number"/></th>
			            <td colspan="8" width="130px" class="table_search_body">&nbsp;&nbsp;<!-- 
			            	 --><input type="text" name="house_bl_no" style="width:104px;" value='<bean:write name="hmOutParam" property="BL_NO"/>' readonly>
			                    <input type="hidden" name="intg_bl_seq" value="<bean:write name="hmOutParam" property="INTG_BL_SEQ"/>"/>
			            </td>       
			        </tr>
			        <tr height="3px"/>
			        
			        <tr>
			            <th scope="row" nowrap class="table_search_head" align="right"><bean:message key="Trucker"/></th>
						<td colspan="8" class="table_search_body">
						    &nbsp;&nbsp;<input type="text" name="trk_trdp_cd" maxlength="20" value='<bean:write name="hmOutParam" property="TRUCKER_CD"/>' onKeyDown="codeNameAction('trdpCode_trk',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction('trdpCode_trk',this, 'onBlur')" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:75px;"><!--
                            --><button type="button" name="trk" id="trk" class="input_seach_btn" tabindex="-1" onClick="openPopUp('LINER_POPLIST',this)"></button><!--
                            --><input type="text"   name="trk_trdp_nm" maxlength="50" value='<bean:write name="hmOutParam" property="TRUCKER_NM"/>' onblur="strToUpper(this)" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:163px;" onKeyPress="if(event.keyCode==13){openPopUp('LINER_POPLIST', document.getElementById('trk'), frm1.trk_trdp_nm.value);}"><!--
							--><input type="hidden" name="trk_trdp_addr" value='<bean:write name="hmOutParam" property="trk_trdp_addr"/>'>
						</td>
			        </tr>
			        <tr height="3px"/>
			        <tr>
			        	<th scope="row" nowrap class="table_search_head" align="right"><bean:message key="Phone"/></th>
			        	<td class="table_search_body" style="width:120px;" >
			        		&nbsp;&nbsp;<input type="text" name="trk_trdp_phn" maxlength="30" onkeyPress="onlyNumberCheck('-.,()[]');" dataformat="excepthan" style="ime-mode:disabled;width:104px;" value='<bean:write name="hmOutParam" property="TRK_TRDP_PHN"/>'>
			        	</td>
			        	<th scope="row" nowrap class="table_search_head" align="right" style="width: 45px"><bean:message key="Fax"/></th>
			        	<td class="table_search_body">
			        		&nbsp;&nbsp;<input type="text" name="trk_trdp_fax" maxlength="30" onkeyPress="onlyNumberCheck('-.,()[]');" dataformat="excepthan" style="ime-mode:disabled;width:106px;" value='<bean:write name="hmOutParam" property="TRK_TRDP_FAX"/>'>
			        	</td>
			        </tr>
			    </table>
			    <table>
					<tr height="10px"></tr>
				</table>
			    <table border="0" cellpadding="0" cellspacing="0">
		        	<h3 class="title_design"><bean:message key="Cut_Off_Date"/></h3>
			        <tr>
	              		<th scope="row" nowrap class="table_search_head" align="right"><bean:message key="Port_Open"/></th>
	              		<td width="120px">
	              		    &nbsp;&nbsp;<input type="text" name="port_open_dt" id=""port_open_dt"" maxlength="10" value='<wrt:write name="hmOutParam" property="port_open_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' class="search_form"  dataformat="excepthan" style="ime-mode:disabled;width:75px;" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1);dateRangeValid(this, 'Port Open Date');"><!-- 
							--><button type="button" class="calendar" tabindex="-1" name="port_open_dt_cal" id="port_open_dt_cal"  onclick="doDisplay('DATE1', frm1.port_open_dt);" ></button>
						</td>
						<th scope="row" nowrap class="table_search_head" align="right" style="width: 47px"><bean:message key="Time"/></th>
						<td>
						    &nbsp;&nbsp;<input type="text" name="port_open_tm" value='<wrt:write name="hmOutParam" property="port_open_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm"/>' maxlength="4" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:40px;" onchange="timeCheck(this);" onkeypress="onlyNumberCheck();">
						</td>
							
	              		<th scope="row" nowrap class="table_search_head" align="right"><bean:message key="Warehouse"/></th>
	              		<td width="120px">
	              		    &nbsp;&nbsp;<input type="text" name="wh_cut_off_dt" id="wh_cut_off_dt" maxlength="10" value='<wrt:write name="hmOutParam" property="WH_CUT_OFF_DT" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' class="search_form"  dataformat="excepthan" style="ime-mode:disabled;width:75px;" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1);dateRangeValid(this, 'W/H Cut-Off Date');"><!-- 
							--><button type="button" class="calendar" tabindex="-1" name="f_etd_dt_cal" id="f_etd_dt_cal"  onclick="doDisplay('DATE1', frm1.wh_cut_off_dt);" ></button>
						</td>
						<th scope="row" nowrap class="table_search_head" align="right" style="width: 47px"><bean:message key="Time"/></th>
						<td>
						    &nbsp;&nbsp;<input type="text" name="wh_cut_off_tm" value='<wrt:write name="hmOutParam" property="WH_CUT_OFF_TM" formatType="DATE" fromFormat="HHmm" format="HH:mm"/>' maxlength="4" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:40px;" onchange="timeCheck(this);" onkeypress="onlyNumberCheck();">
						</td>
							
	              	</tr>
			        <tr height="6px"/>
			        <tr>
	              		<th scope="row" nowrap class="table_search_head" align="right"><bean:message key="Port"/></th>
	              		<td width="120px">
	              		    &nbsp;&nbsp;<input type="text" name="port_cut_off_dt" id="port_cut_off_dt" maxlength="10" value='<wrt:write name="hmOutParam" property="PORT_CUT_OFF_DT" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' class="search_form"  dataformat="excepthan" style="ime-mode:disabled;width:75px;" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1);dateRangeValid(this, 'PORT Cut-Off Date');"><!-- 
							--><button type="button" class="calendar" tabindex="-1" name="f_etd_dt_cal" id="f_etd_dt_cal"  onclick="doDisplay('DATE1', frm1.port_cut_off_dt);" ></button>
						</td>
						<th scope="row" nowrap class="table_search_head" align="right" style="width: 47px"><bean:message key="Time"/></th>
						<td>
						    &nbsp;&nbsp;<input type="text" name="port_cut_off_tm" value='<wrt:write name="hmOutParam" property="PORT_CUT_OFF_TM" formatType="DATE" fromFormat="HHmm" format="HH:mm"/>' maxlength="4" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:40px;" onchange="timeCheck(this);" onkeypress="onlyNumberCheck();">
						</td>
							
	              		<th scope="row" nowrap class="table_search_head" align="right"><bean:message key="DOC"/></th>
	              		<td width="120px">
	              		    &nbsp;&nbsp;<input type="text" name="doc_cut_off_dt" id="doc_cut_off_dt" maxlength="10" value='<wrt:write name="hmOutParam" property="DOC_CUT_OFF_DT" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' class="search_form"  dataformat="excepthan" style="ime-mode:disabled;width:75px;" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1);dateRangeValid(this, 'DOC Cut-Off Date');"><!-- 
							--><button type="button" class="calendar" tabindex="-1" name="f_etd_dt_cal" id="f_etd_dt_cal"  onclick="doDisplay('DATE1', frm1.doc_cut_off_dt);" ></button>
						</td>
						<th scope="row" nowrap class="table_search_head" align="right" style="width: 47px"><bean:message key="Time"/></th>
						<td>
						    &nbsp;&nbsp;<input type="text" name="doc_cut_off_tm" value='<wrt:write name="hmOutParam" property="DOC_CUT_OFF_TM" formatType="DATE" fromFormat="HHmm" format="HH:mm"/>' maxlength="4" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:40px;" onchange="timeCheck(this);" onkeypress="onlyNumberCheck();">
						</td>
							
	              	</tr>
	              	<tr height="6px"/>
	              	<tr>
	              		<th scope="row" nowrap class="table_search_head" align="right"><bean:message key="Rail"/></th>
	              		<td width="120px">
	              		    &nbsp;&nbsp;<input type="text" name="rail_cut_off_dt" id="rail_cut_off_dt" maxlength="10" value='<wrt:write name="hmOutParam" property="RAIL_CUT_OFF_DT" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' class="search_form"  dataformat="excepthan" style="ime-mode:disabled;width:75px;" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1);dateRangeValid(this, 'RAIL Cut-Off Date');"><!-- 
							--><button type="button" class="calendar" tabindex="-1" name="f_etd_dt_cal" id="f_etd_dt_cal"  onclick="doDisplay('DATE1', frm1.rail_cut_off_dt);" ></button>
						</td>
						<th scope="row" nowrap class="table_search_head" align="right" style="width: 47px"><bean:message key="Time"/></th>
						<td>
						    &nbsp;&nbsp;<input type="text" name="rail_cut_off_tm" value='<wrt:write name="hmOutParam" property="RAIL_CUT_OFF_TM" formatType="DATE" fromFormat="HHmm" format="HH:mm"/>' maxlength="4" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:40px;" onchange="timeCheck(this);" onkeypress="onlyNumberCheck();">
						</td>
						
	              		<th scope="row" nowrap class="table_search_head" align="right"><bean:message key="VGM"/></th>
	              		<td width="120px">
	              		    &nbsp;&nbsp;<input type="text" name="vgm_cut_off_dt" id="vgm_cut_off_dt" maxlength="10" value='<wrt:write name="hmOutParam" property="vgm_cut_off_dt" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/>' class="search_form"  dataformat="excepthan" style="ime-mode:disabled;width:75px;" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1);dateRangeValid(this, 'VGM Cut-Off Date');"><!-- 
							--><button type="button" class="calendar" tabindex="-1" name="vgm_cut_off_dt_cal" id="f_etd_dt_cal"  onclick="doDisplay('DATE1', frm1.vgm_cut_off_dt);" ></button>
						</td>
						<th scope="row" nowrap class="table_search_head" align="right" style="width: 47px"><bean:message key="Time"/></th>
						<td>
						    &nbsp;&nbsp;<input type="text" name="vgm_cut_off_tm" value='<wrt:write name="hmOutParam" property="vgm_cut_off_tm" formatType="DATE" fromFormat="HHmm" format="HH:mm"/>' maxlength="4" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:40px;" onchange="timeCheck(this);" onkeypress="onlyNumberCheck();">
						</td>
						
	              	</tr>
	              	<tr height="12px"/>
	              	<tr>
	              		<th scope="row" nowrap class="table_search_head" align="right"><bean:message key="Remark"/></th>
	              		<td colspan="8">&nbsp;&nbsp;<textarea name="rmk" class="search_form autoenter_50px" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>text-transform:uppercase;width:575px;height:200px;" WRAP="off"><bean:write name="hmOutParam" property="RMK" filter="false"/></textarea>
	              	    </td>
	              	</tr>
			    </table>
	    	</div>
	    </div>
    	<div style="float: right; margin-right:0; font-weight: bold;"><input type="checkbox" name="chk_auto_close" id="chk_auto_close" /><label><bean:message key="AUTO_CLOSE"/></label></div>
	</div>
</form>



