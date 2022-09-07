<!-- 
//=========================================================
//*@FileName   : RPT_PRN_0241.jsp
//*@FileTitle  : RPT
//*@Change history:
//*@author     : cej
//*@version    : 2.0 - 06/2016
//*@since      : 06/2016
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
<script language="javascript" src="<%=CLT_PATH%>/apps/fis/rpt/RPT_PRN_0241.js?ver=%= Math.round(Math.random() * 100) %>"></script>
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
	frm1.to.focus();
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
	<input	type="hidden" name="title" value="Booking Information"/>
	<input	type="hidden" name="stamp"/>
	<input	type="hidden" name="all"/>
	<input	type="hidden" name="rcvd_dt_tm"/> 
	<input	type="hidden" name="file_name"/>
	<input	type="hidden" name="title"/>
	<input	type="hidden" name="rd_param"/>
	<input	type="hidden" name="mailTitle" value="<bean:write name="tmpMap" property="mailTitle"/>"/>
	<input	type="hidden" name="intg_bl_seq" value="<bean:write name="tmpMap" property="intg_bl_seq"/>"/>
	<!--  Report ==> OutLook연동 파라미터 (S) -->
	<input type="hidden" name="rpt_biz_tp"/>
	<input type="hidden" name="rpt_biz_sub_tp"/> 
	<input type="hidden" id="prt_option" name="prt_option" value="opt_print"/>

	<div class="layer_popup_title">
		<!-- Button -->
		<div class="page_title_area clear">
	   	   <h2 class="page_title" align="left"><bean:message key="BOOKING_INFORMATION"/></h2>
		   <div class="opus_design_btn">
		   <input	type="hidden" name="v_ofc_cd"      value="<bean:write name="hmOutParam" property="v_ofc_cd"/>"/>
		   <%-- <input	type="hidden" name="v_ofc_eng_nm"  value="<bean:write name="hmOutParam" property="v_ofc_eng_nm"/>"/>
		   <input	type="hidden" name="v_eml"         value="<bean:write name="hmOutParam" property="v_eml"/>"/>
		   <input	type="hidden" name="v_phn"         value="<bean:write name="hmOutParam" property="v_phn"/>"/>
		   <input	type="hidden" name="v_fax"         value="<bean:write name="hmOutParam" property="v_fax"/>"/>
		   <input	type="hidden" name="prn_ofc_cd"    value="<bean:write name="hmOutParam" property="prn_ofc_cd"/>"/> --%>
			<button id="btnPrint" type="button" class="btn_accent" onclick="doWork('Print')"><bean:message key="Print"/><!--
			--><button type="button" class="btn_accent" onclick="doWork('PREVIEW')" id="btnPreview"><bean:message key="Preview"/></button><!-- 
			--></button><button type="button" class="btn_normal" onclick="doWork('CLOSE')"><bean:message key="Close"/></button>
		   </div>
		</div>
	</div>
	<div class="layer_popup_contents">
		<!-- div class="wrap_result"-->
<div class="over_wrap" height="100%">
		<div class="wrap_search">
	    	<div class="opus_design_grid" style="width:450px">
	    		<table border="0" cellpadding="0" cellspacing="0">
			      
			        <tr height="3px"/> 
			        <tr>
			            <th scope="row" nowrap class="table_search_head" align="right"><bean:message key="To"/></th>
						<td  class="table_search_body">
						 &nbsp;&nbsp;<textarea name="to" class="search_form autoenter_50px" dataformat="excepthan" style="width:330px;height:60px;" onblur="strToUpper(this);" WRAP="off"><bean:write name="hmOutParam" property="BINFO_TO"/></textarea>
						</td>
			        </tr>
			        <tr height="3px"/> 
			        <tr>
			            <th scope="row" nowrap class="table_search_head" align="right"><bean:message key="CC"/></th>
						<td  class="table_search_body">
						 &nbsp;&nbsp;<textarea name="cc" class="search_form autoenter_50px" dataformat="excepthan" style="width:330px;height:60px;" onblur="strToUpper(this);" WRAP="off"><bean:write name="hmOutParam" property="BINFO_CC"/></textarea>
						</td>
			        </tr>		
			        <tr height="3px"/> 
			        <tr>
			            <th scope="row" nowrap class="table_search_head" align="right"><bean:message key="Warehouse"/></th>
						<td  class="table_search_body">
						 &nbsp;&nbsp;<textarea name="warehouse" class="search_form autoenter_50px" dataformat="excepthan" style="width:330px;height:60px;" onblur="strToUpper(this);" WRAP="off"><bean:write name="hmOutParam" property="RCV_WH_NM"/></textarea>
						</td>
			        </tr>
			        <tr height="3px"/> 			        			        	        
			        <tr>
			            <th scope="row" nowrap class="table_search_head" align="right"><bean:message key="DOCK_FORM"/></th>
						<td  class="table_search_body">
						 &nbsp;&nbsp;<input type="text" name="dock_form" value='<bean:write name="hmOutParam" property="CARR_TRDP_NM"/>' maxlength="50" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:330px;">
						</td>
			        </tr>
			        <tr height="3px"/> 			    
			        <tr>
			            <th scope="row" nowrap class="table_search_head" align="right"><bean:message key="FREIGHT_PREPAID_AT"/></th>
						<td  class="table_search_body">
						 &nbsp;&nbsp;<input type="text" name="freight_prepaid_at" value='<bean:write name="hmOutParam" property="BINFO_FRT_PP_AT"/>' maxlength="50" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:330px;">
						</td>
			        </tr>
			        <tr height="3px"/> 		
			        <tr>
			            <th scope="row" nowrap class="table_search_head" align="right"><bean:message key="FREIGHT_PAYABLE_AT"/></th>
						<td  class="table_search_body">
						 &nbsp;&nbsp;<input type="text" name="freight_payable_at" value='<bean:write name="hmOutParam" property="BINFO_FRT_PAY_AT"/>' maxlength="50" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:330px;">
						</td>
			        </tr>	
			        <tr height="3px"/> 			      
			        <tr>
			            <th scope="row" nowrap class="table_search_head" align="right"><bean:message key="PLACE_OF_BL_ISSUE"/></th>
						<td  class="table_search_body">
						 &nbsp;&nbsp;<input type="text" name="place_of_bl_issue" value='<bean:write name="hmOutParam" property="BINFO_PLC_BL_ISSUE"/>' maxlength="50" class="search_form" dataformat="excepthan" style="ime-mode:disabled;width:330px;">
						</td>
			        </tr>					          	    			        
			    </table>
	    	</div>
	    </div>
	</div>
    <div style="float: right; margin-right:0; font-weight: bold;"><input type="checkbox" name="chk_auto_close" id="chk_auto_close" /><label><bean:message key="AUTO_CLOSE"/></label></div>
</div>
</form>
