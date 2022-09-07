<%--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : WHUnloadSht.jsp	
*@FileTitle  : Unloading Task Note
*@author     : Khang.Dong - DOU Network
*@version    : 1.0
*@since      : 2015/07/09
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
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="./apps/fis/wms/common/js/WHUnloadSht.js?ver=<%=CLT_JS_VER%>"></script>
    
 	<script type="text/javascript" src="./js/common/message/<%=CLT_MSG_PATH%>/WMS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
<%

	String wib_bk_no = "";
	String wh_cd = "";
	String ctrt_no = "";

	try {
		wib_bk_no = request.getParameter("wib_bk_no") == null ? "" : request.getParameter("wib_bk_no");
		wh_cd = request.getParameter("wh_cd") == null ? "" : request.getParameter("wh_cd");
		ctrt_no = request.getParameter("ctrt_no") == null ? "" : request.getParameter("ctrt_no");
	} catch (Exception e) {
		out.println(e.toString());
	}
%>

<script type="text/javascript">
	var almightyFlag = false;
	function setupPage(){
		var errMessage = "";
		if (errMessage.length >= 1) {
			ComShowMessage(errMessage);
		} // end if
		loadPage(true);
	}
</script>

<form id="form" name="form">
<input type="hidden" id="f_cmd" value="0" />
<input type="hidden" name="form_mode" value="NEW" />
<%-- <input type="hidden" name="curr_date" value="<%=DateUtility.transformDate(CalendarUtilities.dateToString(new Date()), "-")%>" /> --%>
<%-- <input type="hidden" name="user_id" value="<%=userInfo.getUser_id()%>" />
<input type="hidden" name="user_nm" value="<%=userInfo.getUser_nm()%>" />
<input type="hidden" name="org_cd" value="<%=userInfo.getOrg_cd()%>" />
<input type="hidden" name="paper_size" value="<%=userInfo.getPaper_size()%>" /> --%>
<input type="hidden" name="paper_size" value="A4" /> 
<input type="hidden" name="user_id" value="<%=userInfo.getUsrid()%>" />
<input type="hidden" name="user_nm" value="<%=userInfo.getUser_name()%>" />
<input type="hidden" name="org_cd" value="<%=userInfo.getOfc_cd()%>" />
<input type="hidden" name="wh_cd" value="<%=wh_cd%>" />
<input type="hidden" name="ctrt_no" value="<%=ctrt_no%>" />
<input type="hidden" name="wib_bk_no_1" value="<%=wib_bk_no%>" />
 <!-- Print -->
<!-- <input type="hidden" name="com_mrdPath">
<input type="hidden" name="com_mrdArguments"> 
<input type="hidden" name="com_mrdBodyTitle"> -->
<input type="hidden" name="rd_param" id="rd_param" />
	<input type="hidden" name="file_name" id="file_name" />
	<input type="hidden" name="title" id="title" />

<div class="page_title_area clear">
		<!-- page_title(S) -->
		<h2 class="page_title">
				<span><bean:message key="Unloading_Task_Note"/></span>
		</h2>
		<!-- page_title(E) -->
		<!-- opus_design_btn(S) -->
		<div class="opus_design_btn">
			<button type="button" class="btn_accent" name="btnSave" id="btnSave" onClick="doWork('SAVE');"><bean:message key="Save"/></button><!--
			--><button type="button" class="btn_normal" name="btnDelete" id="btnDelete" onClick="doWork('DELETE');"><bean:message key="Delete"/></button><!--
			 --><button type="button" class="btn_normal" name="btnPrint" id="btnPrint" onClick="doWork('PRINT');"><bean:message key="Print"/></button><!-- 
			 --><button type="button" class="btn_normal" name="window.close" id="window.close" onClick="doWork('CLOSE');"><bean:message key="Close"/></button>
		</div>
		<!-- opus_design_btn(E) -->
		<!-- page_location(S) -->
		<div class="location">
			<span></span>
		</div>
		<!-- page_location(E) -->
	</div>

<!-- opus_design_inquiry(S) -->
	<div class="wrap_search">
		<div class="opus_design_inquiry sm ">
			<table>
				<colgroup>
					<col width="80">
					<col width="180">
					<col width="80">
					<col width="*" />
				</colgroup>
				<tbody>
					<tr>
			        <th><bean:message key="Booking_No"/></th>
			        <td colspan="3">
			        	<input name="wib_bk_no" type="text" class="L_input_R" id="wib_bk_no" style="width:120px;" value="<%=wib_bk_no%>" readonly/>			     
			        </td>   
		        	</tr>
		        	 <tr>
					<th><bean:message key="Supervisor"/></th>
					<td>
						<input name="supv_nm" type="text" class="input" id="supv_nm" style="width:370px;" maxlength="80"/>
					</td>
					<th><bean:message key="Unloading_Date"/></th>
					<td>
						<input name="unload_dt" id="unload_dt" type="text" class="L_input" style="width:75px;" maxlength="10" OnBeforeDeactivate="ComAddSeparator(this)" OnBeforeActivate="ComClearSeparator(this)" 
						onkeypress="onlyNumberCheck();" onkeyup="mkDateFormatType(this, event, false,1)" onblur="chkCmprPrd(firCalFlag, false, this, this, this);firCalFlag=false;" /><!-- 
						 --><button class="calendar" type="button" name="btn_unload_dt" id="btn_unload_dt" onClick="doWork('btn_unload_dt');"></button>
					</td>  					                                        
					</tr>	
				</tbody>
				<tbody>
				<tr>
					<th><bean:message key="Unloading_by"/></th>
					<td>
						<input name="unload_by" type="text" class="L_input" id="unload_by" style="width:370px;" maxlength="80"/> 
					</td>
					<th><bean:message key="Unloading_Time_(HH:MM)"/></th>
					<td>
						<input name="unload_hm_fr" id="unload_hm_fr" type="text" class="L_input" style="width:45px;" dataformat="hm" maxlength="5" onblur="timeCheck(this, form.unload_hm_fr, form.unload_hm_to);" OnBeforeDeactivate="ComAddSeparator(this, 'hm');" OnBeforeActivate="ComClearSeparator(this, 'hm');"/><!-- 
						 --><span class='dash'>~</span><!-- 
						 --><input name="unload_hm_to" id="unload_hm_to" type="text" class="L_input" style="width:45px;" dataformat="hm" maxlength="5" onblur="timeCheck(this, form.unload_hm_fr, form.unload_hm_to);" OnBeforeDeactivate="ComAddSeparator(this, 'hm');" OnBeforeActivate="ComClearSeparator(this, 'hm');"/> 
					</td>  					
                </tr>
				<tr>
					<th><bean:message key="Message_(To_Worker)"/></th>
					<td colspan="3">
						<textarea name="msg_to_wk" style="width:99%;height:50px;text-transform:lowercase;" class="L_textarea"  id="msg_to_wk" maxlength="100" onBlur="msg_to_wk_lenChk();"></textarea>				 
					</td>
                </tr>	
				</tbody>
				<tbody>
				<tr>
					<th><bean:message key="Inspecting_by"/></th>
					<td>
						<input name="insp_by" type="text" class="L_input" id="insp_by" style="width:370px;" maxlength="100"/> 
					</td>
					<th><bean:message key="Inspecting_Time_(HH:MM)"/></th>
					<td>
						<input name="insp_hm_fr" id="insp_hm_fr" type="text" class="L_input" style="width:45px;" dataformat="hm" maxlength="5" OnBeforeDeactivate="ComAddSeparator(this, 'hm')" OnBeforeActivate="ComClearSeparator(this, 'hm')" onblur="timeCheck(this,form.insp_hm_fr, form.insp_hm_to);" /><!-- 						 
						 --><span class='dash'>~</span><!-- 						
						 --><input name="insp_hm_to" id="insp_hm_to" type="text" class="L_input" style="width:45px;" dataformat="hm"  maxlength="5" OnBeforeDeactivate="ComAddSeparator(this, 'hm')" OnBeforeActivate="ComClearSeparator(this, 'hm')" onblur="timeCheck(this,form.insp_hm_fr, form.insp_hm_to);" />						 
					</td>  					
                </tr>
                <tr>
					<th><bean:message key="Message_(To_Inspector)"/></th>
					<td colspan="3">
						<textarea name="msg_to_insp" style="width:99%;height:50px;text-transform:lowercase;" class="L_textarea" id="msg_to_insp" maxlength="100" onBlur="msg_to_insp_lenChk();"></textarea>						 
					</td>
                </tr>
				</tbody>
				<tbody>
					<tr>
					<th><bean:message key="Print_Option"/></th>
					<td>
						<input type="checkbox" name="chOption2" id="chOption2" value="1" checked /><label for = "chOption2">Unloading Work Sheet</label><!--   
						 --><input type="checkbox" name="chOption3" id="chOption3" value="2"/><label for = "chOption3">Inbound Inspection Sheet</label> 
					</td>
					<th></th>
					<td>
					</td>  										
                </tr>
				</tbody>
			</table>
		</div>
	</div>
	<!-- opus_design_inquiry(E) -->	
	
<div class="wrap_result"> 
	<h3 class="title_design"><bean:message key="Container_Truck_Plan_List"/></h3>
    <!-- opus_design_grid(S) -->
    <div class="opus_design_grid">
        <script type="text/javascript">comSheetObject('sheet1');</script>
    </div>
</div>
</form> 
<%@include file="/apps/fis/wms/bizcommon/include_common.jsp"%>