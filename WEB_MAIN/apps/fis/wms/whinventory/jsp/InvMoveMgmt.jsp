<%
/*--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : InvMoveMgmt.jsp
*@FileTitle  : Inventory Movement & Hold & Damage Managemet
*@author     : Khang.Dong - DOU Network
*@version    : 1.0
*@since      : 2015/07/17
=========================================================--*/
%>
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
    <script type="text/javascript" src="./apps/fis/wms/whinventory/js/InvMoveMgmt.js?ver=<%=CLT_JS_VER%>"></script>
    <bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
<%


String DEF_WH_CTRT_NO   = userInfo.getDef_wh_ctrt_no()== null?"":userInfo.getDef_wh_ctrt_no();
String DEF_WH_CTRT_NM   = userInfo.getDef_wh_ctrt_nm()== null?"":userInfo.getDef_wh_ctrt_nm();
String DEF_WH_CD		= userInfo.getDef_wh_cd()== null?"":userInfo.getDef_wh_cd();
String DEF_WH_NM		= userInfo.getDef_wh_nm()== null?"":userInfo.getDef_wh_nm();
//invmove search list에서 link
String req_plan_no  = "";

//wave에서 link
String req_wave_no  = "";
String req_wave_wh_cd  = "";
String req_wave_wh_nm  = "";
String req_wave_ctrt_no  = "";
String req_wave_ctrt_nm  = "";
try {
	req_plan_no   = request.getParameter("plan_no")== null?"":request.getParameter("plan_no");
	
	req_wave_no			= request.getParameter("wave_no")== null?"":request.getParameter("wave_no");
	req_wave_wh_cd		= request.getParameter("wave_wh_cd")== null?"":request.getParameter("wave_wh_cd");
	req_wave_wh_nm		= request.getParameter("wave_wh_nm")== null?"":request.getParameter("wave_wh_nm");
	req_wave_ctrt_no	= request.getParameter("wave_ctrt_no")== null?"":request.getParameter("wave_ctrt_no");
	req_wave_ctrt_nm	= request.getParameter("wave_ctrt_nm")== null?"":request.getParameter("wave_ctrt_nm");
	
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
</script>

<form id="form" name="form">
<input type="hidden" name="f_cmd" id="f_cmd" value="0" />
<input type="hidden" name="def_wh_cd" id="def_wh_cd" value="<%=DEF_WH_CD%>" />
<input type="hidden" name="def_wh_nm" id="def_wh_nm" value="<%=DEF_WH_NM%>" />
<input type="hidden" name="def_wh_ctrt_no" id="def_wh_ctrt_no" value="<%=DEF_WH_CTRT_NO%>" />
<input type="hidden" name="def_wh_ctrt_nm" id="def_wh_ctrt_nm" value="<%=DEF_WH_CTRT_NM%>" />

<input type="hidden" name="req_plan_no" id="req_plan_no" value="<%=req_plan_no%>" />
<input type="hidden" name="req_wave_no" id="req_wave_no" value="<%=req_wave_no%>" />
<input type="hidden" name="wave_no" id="wave_no" />
<input type="hidden" name="req_wave_wh_cd" id="req_wave_wh_cd" value="<%=req_wave_wh_cd%>" />
<input type="hidden" name="req_wave_wh_nm" id="req_wave_wh_nm" value="<%=req_wave_wh_nm%>" />
<input type="hidden" name="req_wave_ctrt_no" id="req_wave_ctrt_no" value="<%=req_wave_ctrt_no%>" />
<input type="hidden" name="req_wave_ctrt_nm" id="req_wave_ctrt_nm" value="<%=req_wave_ctrt_nm%>" />
<input type="hidden" name="wh_list_ath" value="<%=userInfo.getWh_list_ath()%>" /> <!-- Get list warehouse from TB_SEQ table -->
<input type="hidden" name="wh_cfg" value="<%=userInfo.getWh_cfg()%>" /> <!-- Get list warehouse from TB_USR table --> 

<input type="hidden" name="mode" id="mode" />
<input type="hidden" name="plan_cnt" id="plan_cnt" />
<input type="hidden" name="wh_cd_org" id="wh_cd_org" />
<input type="hidden" name="wh_nm_org" id="wh_nm_org" />
<input type="hidden" name="ctrt_no_org" id="ctrt_no_org" />
<input type="hidden" name="ctrt_nm_org" id="ctrt_nm_org" />

<input type="hidden" id="paper_size" name="paper_size" value="A4" />
<input type="hidden" id="com_mrdBodyTitle" name="com_mrdBodyTitle" value="Inventory Movement Work Sheet Print" />
<input type="hidden" id="com_mrdArguments" name="com_mrdArguments"/>
<input type="hidden" id="com_mrdPath" name="com_mrdPath" />
<input type="hidden" name="file_name">
<input type="hidden" name="title">
<input type="hidden" name="rd_param">

<input type="hidden" name="user_id" id="user_id"  value="<%=userInfo.getUsrid()%>" />
<input type="hidden" name="pageurl" id="pageurl" value="InvMoveMgmt.clt"/>
<div class="page_title_area clear">
	<!-- page_title(S) -->
	<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	<!-- page_title(E) -->
	<!-- opus_design_btn(S) -->
	<div class="opus_design_btn TOP">
<%-- 			<button type="button" style="display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>"  class="btn_accent" name="btn_search" id="btn_search" onclick="doWork('SEARCHLIST')"><bean:message key="Search"/></button><!-- 
		 --><button type="button" style="display:none;" btnAuth="<%= roleBtnVO.getAttr3() %>"  class="btn_normal" name="btnSave" id="btnSave" onclick="doWork('SAVE')"><bean:message key="Save"/></button><!-- 
		 	 --><button type="button" btnAuth="CANCEL"  class="btn_normal" name="btn_cancel" id="btn_cancel" onclick="doWork('btn_cancel')"><bean:message key="Cancel"/></button><!-- 
		 	 --><button type="button" btnAuth="MOVEMENT"  class="btn_normal" name="btn_move" id="btn_move" onclick="doWork('btn_move')"><bean:message key="Movement"/></button><!-- 
		 	 --><button type="button" style="display:none;" btnAuth="<%= roleBtnVO.getAttr5() %>"  class="btn_normal" name="btnPrint" id="btnPrint" onclick="doWork('PRINT')"><bean:message key="Print"/></button><!-- 
		 	 --><button type="button" style="display:none;" btnAuth="<%= roleBtnVO.getAttr2() %>"  class="btn_normal" name="btn_new" id="btn_new" onclick="doWork('NEW')"><bean:message key="New"/></button>
 --%>	</div>
	<!-- opus_design_btn(E) -->
	<!-- page_location(S) -->
		<div class="location">
			<span><%=LEV1_NM%></span>&gt;
			<span><%=LEV2_NM%></span>&gt;
			<span><%=LEV3_NM%></span>
			<a href="" class="ir">URL Copy</a>
		</div>
	<!-- page_location(E) -->
</div>

<div class="over_wrap">
<div class= "wrap_search">
	<div class="opus_design_inquiry entry_pannel">
		<table>
			<colgroup>
				<col width="70" />
				<col width="*"/>						
			</colgroup>
			<tbody>
				<tr>					
					<th><bean:message key="Plan_No"/></th>
					<!-- #1718 [WMS4.0] INVENTORY MOVEMENT PLAN NO. 타입 수정 -->
					<td><input name="in_plan_no" id="in_plan_no" type="text" class="L_input" maxlength="14" style="width:150px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);"/></td>
				</tr>
			</tbody>
		</table>
	</div>
</div>
<div class= "wrap_result">
	<div class="opus_design_inquiry">
		<table>
			<colgroup>
				<col width="70">
				<col width="260">
				<col width="130">
                <col width="250">
				<col width="150">
				<col width="*">
			</colgroup>
			<tr>
				<th><bean:message key="Plan_No"/></th>
				<td><input name="plan_no" id="plan_no" type="text" class="L_input" tabindex="-1" style="width:250px;" readOnly/>
				</td>
				<th><bean:message key="Status"/></th>
				<td><input name="plan_sts_cd_nm" id ="plan_sts_cd_nm" type="text" class="L_input" tabindex="-1" style="width:85px;" readOnly/>
				    <input type="hidden" class="L_input" name="plan_sts_cd" id="plan_sts_cd" readOnly />
				</td>
				<th><bean:message key="Plan_Date"/>
                      </th>
				<td>
					<input name="plan_dt" id = "plan_dt" type="text" class="L_input_R" tabindex="-1" onkeypress="onlyNumberCheck();" style="width:75px;" readOnly/>
				</td>
			</tr>
			<tr>
				<th><bean:message key="Warehouse"/></th>
				<td>		
				
						<bean:define id="MsList" name="cdMap" property="warehouse"/>
						<select name="wh_cd" id="wh_cd" class="search_form" style="width: 190px;" required disabled="disabled">
							<option value=""></option>
							<logic:iterate id="codeVO" name="MsList">
								<option value='<bean:write name="codeVO" property="wh_cd"/>'><bean:write name="codeVO" property="wh_nm"/></option>
							</logic:iterate>
						</select>
				</td>
				<th><a style="color:#0000FF" href="javascript:btn_link_ctrt();" id="btn_link_ctrt"><span class="point_B"><bean:message key="Contract_No1"/></span></th>
					<td>
						<input name="ctrt_no" id="ctrt_no" type="text" class="L_input" required style="width:85px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" otherchar="-_" onBlur="strToUpper(this);getCtrtInfo(this);" maxlength="10" OnKeyDown="if(event.keyCode==13){getCtrtInfo(this);}" readOnly/><!-- 						
						 --><button type="button" name="btn_ctrt_no" id="btn_ctrt_no" class="input_seach_btn" tabindex="-1" onclick="doWork('btn_ctrt_no')"></button><!-- 
						 --><input name="ctrt_nm" id="ctrt_nm" type="text" class="L_input_R" required readOnly style="width:110px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" otherchar = " ()-_" onBlur="strToUpper(this);" readOnly/>	
					</td>
                      <th><bean:message key="Movement_Date"/></th>
				<td>					
					<input name="move_dt" id="move_dt" onkeypress="onlyNumberCheck();" onkeyup="mkDateFormatType(this, event, false,1)" onblur="mkDateFormatType(this, event, true,1)" type="text" class="L_input" maxlength="10" style="width:75px;" OnBeforeDeactivate="ComAddSeparator(this)" OnBeforeActivate="ComClearSeparator(this)" readOnly required/><!-- 
					 --><button type="button" name="btn_move_dt" id="btn_move_dt" class="calendar ir" tabindex="-1" onclick="doWork('btn_move_dt')"></button><!-- 
					 --><input name="move_hm_fr" id="move_hm_fr" type="text" class="L_input" style="width:40px;" dataformat="hm" onkeyup="formatTime(this);" maxlength="5" OnBeforeDeactivate="ComAddSeparator(this, 'hm');" OnBeforeActivate="ComClearSeparator(this, 'hm');" onblur="timeCheck(this, form.move_hm_fr, form.move_hm_to);"/><!-- 
					 --><input name="move_hm_to" id="move_hm_to" type="text" class="L_input" style="width:40px;" dataformat="hm" onkeyup="formatTime(this);" maxlength="5" OnBeforeDeactivate="ComAddSeparator(this, 'hm');" OnBeforeActivate="ComClearSeparator(this, 'hm');" onblur="timeCheck(this, form.move_hm_fr, form.move_hm_to);"/>
				</td>
			</tr>
                  <tr>
				<th><bean:message key="Supervisor"/>						
				</th>
				<td>
					<input name="supv_nm" id="supv_nm" type="text" class="L_input" maxlength="100" style="width:250px;" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);chkSpecialValue(this);"/>
				</td>
				<th><bean:message key="Worker"/></th>
				<td>
					<input name="work_nm" id="work_nm" type="text" class="L_input" maxlength="100" style="width:228px;" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);chkSpecialValue(this);"/>
				</td>
				<th></th>
				<td></td>
			</tr>
			<tr>
				<th><bean:message key="Remark"/></th>
				<td colspan="5">	
					<textarea name="rmk" id="rmk" class="L_textarea" style="width:983px;" maxlength="1000" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);chkSpecialValue(this);"></textarea>
				</td>
			</tr>
		</table>
	</div>
<!-- opus_design_inquiry(E) -->

<!-- opus_design_inquiry(E) -->
	<!-- opus_design_grid(S) -->
	<div class="opus_design_grid clear">
		<div class="opus_design_btn">  
			<button type="button" class="btn_accent" id="btn_add" name="btn_add" onclick="doWork('btn_add')"><bean:message key="Row_Add"/></button><!-- 
			 --><button type="button" class="btn_accent" id="btn_del" name="btn_del" onclick="doWork('btn_del')"><bean:message key="Row_Del"/></button>
		</div>
		<script type="text/javascript">comSheetObject('sheet1');</script>
	</div>
</div>
</div>
</form>

<%@include file="/apps/fis/wms/bizcommon/include_common.jsp"%>

<script type="text/javascript">
	var attr_extension = "<%= roleBtnVO.getAttr_extension() %>";
	doBtnAuthority(attr_extension);
</script>
<form name="frm1" method="POST" action="./GateServlet.gsl">
	<input type="hidden" name="goWhere" value="fd" id="goWhere" />
    <input type="hidden" name="bcKey" value="downloadTlFileTemplateWMS" id="bcKey" />
    <input type="hidden" name="file_path" value="" id="file_path" />
    <input type="hidden" name="file_name" value="" id="file_name"/>	
    <input type="hidden" name="docType" value="" id="docType" />
</form>	

<iframe name="ifra_hidden" style="width:0;height:0;visibility:hidden" border=0></iframe>