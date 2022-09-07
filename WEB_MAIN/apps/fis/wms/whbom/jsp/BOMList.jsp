<%--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : BOMList.jsp
*@FileTitle  : BOM Search
*@author     : Bao.Huynh - DOU Network
*@version    : 1.0
*@since      : 2015/04/15
=========================================================--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/ModalCalendar.js?ver=<%=CLT_JS_VER%>"></script>
    
	<script type="text/javascript" src="./js/common/message/<%=CLT_MSG_PATH%>/WMS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script> 
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="./apps/fis/wms/whbom/script/BOMList.js?ver=<%=CLT_JS_VER%>"></script> 
<bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
<bean:define id="wh_combo" name="cdMap" property="wh_combo"/>
<%

//UserInfoDto userInfo = (UserInfoDto) session.getAttribute("AbstractAccountInfo");
//String CLT_PATH = ".";


String DEF_WH_CTRT_NO   = userInfo.getDef_wh_ctrt_no()== null?"":userInfo.getDef_wh_ctrt_no();
String DEF_WH_CTRT_NM   = userInfo.getDef_wh_ctrt_nm()== null?"":userInfo.getDef_wh_ctrt_nm();
String DEF_WH_CD		= userInfo.getDef_wh_cd()== null?"":userInfo.getDef_wh_cd();
String DEF_WH_NM		= userInfo.getDef_wh_nm()== null?"":userInfo.getDef_wh_nm();

try {
	
	
}catch(Exception e) {
	out.println(e.toString());
}	

%>
<script type="text/javascript">
	function setupPage(){
		var errMessage = "";
		if (errMessage.length >= 1) {
			ComShowMessage(errMessage);
		} // end if
		loadPage(true);
	}
	
	var wh_comboCode = "";
	var wh_comboText = "";
	
	<logic:iterate id="BOMListVO" name="wh_combo">
		wh_comboCode+= '<bean:write name="BOMListVO" property="wh_cd"/>' + '|';
		wh_comboText+= '<bean:write name="BOMListVO" property="wh_nm"/>' + '|';
	</logic:iterate>
</script>


<form id="form" name="form">
<input type="hidden" name="f_cmd" id="f_cmd" />

<input type="hidden" name="def_wh_cd" id="def_wh_cd" value="<%=DEF_WH_CD%>" />
<input type="hidden" name="def_wh_nm" id="def_wh_nm" value="<%=DEF_WH_NM%>" />
<input type="hidden" name="def_wh_ctrt_no" id="def_wh_ctrt_no" value="<%=DEF_WH_CTRT_NO%>" />
<input type="hidden" name="def_wh_ctrt_nm" id="def_wh_ctrt_nm" value="<%=DEF_WH_CTRT_NM%>" />
<input type="hidden" name="user_id" id="user_id"  value="<%=userInfo.getUsrid()%>" />
<input type="hidden" name="pageurl" id="pageurl" value="BOMList.clt"/>
<div class="page_title_area clear">

	<!-- page_title(S) -->
		<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	<!-- page_title(E) -->
		<!-- opus_design_btn(S) -->
		<div class="opus_design_btn TOP">
<%-- 			<button type="button" class="btn_accent" name="btn_Search" id="btn_Search" onclick="doWork('SEARCHLIST');" style="cursor:hand; display:none;"  btnAuth="<%= roleBtnVO.getAttr1() %>"><bean:message key="Search"/></button><!-- 
			 --><button type="button" class="btn_normal" name="btn_Excel" id="btn_Excel" onclick="doWork('EXCEL');" style="cursor:hand; display:none;"  btnAuth="<%= roleBtnVO.getAttr6() %>"><bean:message key="Excel"/></button>
 --%>		</div>
		<!-- opus_design_btn(E) -->
		<div class="location">	
		<span><%=LEV1_NM%></span> &gt;
		<span><%=LEV2_NM%></span> &gt;
		<span><%=LEV3_NM%></span>
		<a href="" class="ir">URL Copy</a>
		</div>
	</div>

<!-- opus_design_inquiry(S) -->
	<div class="wrap_search">
		<div class="opus_design_inquiry entry_pannel ">
			<table>
				<colgroup>
					<col width="50">
					<col width="190">
					<col width="185">
					<col width="150">
					<col width="185">
					<col width="*">
				</colgroup>
				<tbody>
					<tr>
						<th><bean:message key="Warehouse"/></th>
							<td>
								<select name="wh_combo" id="wh_combo" required style="width: 198px;">
	             				</select>
							</td>
						<th><bean:message key="Contract_No"/></th>
						<td><input name="ctrt_no" id="ctrt_no" type="text" value="<%=DEF_WH_CTRT_NO%>" class="L_input" style="width:78px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" otherchar="-_" onBlur="strToUpper(this);getCtrtInfo(this);" maxlength="10" OnKeyDown="if(event.keyCode==13){getCtrtInfo(this);}" required="required"/><!--
						--><button type="button" name="btn_ctrt_no" id="btn_ctrt_no" class="input_seach_btn" tabindex="-1" onclick="doWork('btn_ctrt_no');"></button><!--						
						--><input name="ctrt_nm" id="ctrt_nm" type="text" value="<%=DEF_WH_CTRT_NM%>" class="L_input" style="width:80px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" otherchar = " ()-_" onBlur="strToUpper(this);" onKeyDown="if(event.keyCode==13){CtrtPopup();}" required="required"/>
							</td>
						<th><bean:message key="Kitting_No"/></th>
						<td><input name="kit_no" id = "kit_no" type="text" class="L_input" style="ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);" maxlength="20"/>
						</td>
					</tr>
					<tr>
						<th><bean:message key="Kitting_Date"/></th>
						<td>
							<input name="fm_kit_dt" id="fm_kit_dt" type="text" required class="L_input" maxlength="10" style="width:77px;" OnBeforeDeactivate="ComAddSeparator(this)" OnBeforeActivate="ComClearSeparator(this)"
							onkeypress="onlyNumberCheck();" onkeyup="mkDateFormatType(this, event, false,1)" onblur="chkCmprPrd(firCalFlag, false, this, this, form.to_kit_dt);firCalFlag=false;"/><!-- 
							 --><span class='dash'>~</span><!-- 
							 --><input name="to_kit_dt" id="to_kit_dt" type="text" required class="L_input" maxlength="10" style="width:77px;" OnBeforeDeactivate="ComAddSeparator(this)" OnBeforeActivate="ComClearSeparator(this)"
							 onkeypress="onlyNumberCheck();" onkeyup="mkDateFormatType(this, event, false,1)" onblur="chkCmprPrd(firCalFlag, false, this,form.fm_kit_dt ,this );firCalFlag=false;"/><!-- 
							 --><button class="calendar" type="button" name="btn_to_kit_dt" id="btn_to_kit_dt" onclick="doWork('btn_to_kit_dt');"></button>
						</td>
						<th><bean:message key="Kit_Item"/></th>
						<td><input name="kit_item_cd" id = "kit_item_cd" type="text" class="L_input" style="width:191px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" otherchar = "<%=WMS_OTHER_CHAR%>" onBlur="strToUpper(this);"/>
						</td>
						<th><bean:message key="Kit_Item_Lot"/></th>
						<td>
							<input name="kit_lot_no" id = "kit_lot_no" type="text" class="L_input" style="ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);"/>
						</td>               
					</tr>
					<tr>
						<th><bean:message key="Location"/></th>
						<td><input name="wh_loc_nm" id="wh_loc_nm" type="text" class="L_input" style="width:198px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);getLocationInfo('c')" OnKeyDown="if(event.keyCode==13){getLocationInfo('e');}"/><!-- 
							 --><button type="button" name="btn_wh_loc_cd" id="btn_wh_loc_cd" class="input_seach_btn" tabindex="-1" onclick="doWork('btn_wh_loc_cd');"></button><!-- 
							 --><input type="hidden" id="wh_loc_cd" name="wh_loc_cd" /><!-- 
							 --><input type="hidden" id="wh_loc_nm_org" name="wh_loc_nm_org" />
						</td>
						<th><bean:message key="Inventory_Qty"/></th>
						<td colspan="3">
							<!-- script type="text/javascript">ComComboObject('inv_tp', 1, 115, 1);</script> -->
							<select id="inv_tp" name="inv_tp" style="width: 100px;">
								<option><bean:message key="ALL"/></option>
								<option><bean:message key="Y"/></option>
								<option><bean:message key="N"/></option>
							</select>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	<!-- opus_design_inquiry(E) -->

<!-- opus_design_inquiry(E) -->
	
	<div class="wrap_result">
		<div class="opus_design_grid clear">
			<script type="text/javascript">comSheetObject('sheet1');</script>
			
		</div>
	</div>
</form>

<script type="text/javascript">
doBtnAuthority("<%= roleBtnVO.getAttr_extension() %>");
</script>

