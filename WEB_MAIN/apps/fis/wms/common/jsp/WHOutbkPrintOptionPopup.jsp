<%
/*=========================================================
*Copyright(c) 2013 CyberLogitec
*@FileName : WHOutbkPrintOptionPopup.jsp
*@FileTitle : Print Option & Information
*Open Issues :
*Change history :
*@LastModifyDate : 2014.01.07
*@LastModifier : Sun-Jung YOON
*@LastVersion : 1.0
* 2014.01.07 Sun-Jung YOON
* 1.0 Creation
* 
 =========================================================*/%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
<%@include file="./../../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/ModalCalendar.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoFormControl.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoMessage.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="./apps/fis/wms/common/js/WHOutbkPrintOptionPopup.js?ver=<%=CLT_JS_VER%>"></script>
    
 	<script type="text/javascript" src="./js/common/message/<%=CLT_MSG_PATH%>/WMS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
<%
	//ResponseObjectInfo responseObjectInfo = (ResponseObjectInfo) request.getAttribute("brokerResult");
	//Object obj = responseObjectInfo.getBusinessReturn();

	//UserInfoDto userInfo = (UserInfoDto) session.getAttribute("AbstractAccountInfo");
	String page_tp = "";
	String walc_no = "";
	String wave_no = "";
	String wob_bk_no = "";	
	String wh_cd = "";
	String wob_out_no = "";
	String lp_no = "";

	try {
		page_tp = request.getParameter("page_tp") == null ? "" : request.getParameter("page_tp");
		walc_no = request.getParameter("walc_no") == null ? "" : request.getParameter("walc_no");
		wave_no = request.getParameter("wave_no") == null ? "" : request.getParameter("wave_no");
		wob_bk_no = request.getParameter("wob_bk_no") == null ? "" : request.getParameter("wob_bk_no");		
		wh_cd = request.getParameter("wh_cd") == null ? "" : request.getParameter("wh_cd");
		wob_out_no = request.getParameter("wob_out_no") == null ? "" : request.getParameter("wob_out_no");
		lp_no = request.getParameter("lp_no") == null ? "" : request.getParameter("lp_no");
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
<input type="hidden" name="user_id" value="<%=userInfo.getUsrid()%>" />
<input type="hidden" name="user_nm" value="<%=userInfo.getUser_name()%>" />
<input type="hidden" name="org_cd" value="<%=userInfo.getOfc_cd()%>" /> 
<input type="hidden" name="paper_size" value="A4" />
<input type="hidden" id="page_tp" name="page_tp" value="<%=page_tp%>"/>
<input type="hidden" id="walc_no" name="walc_no" value="<%=walc_no%>"/>
<input type="hidden" id="wave_no" name="wave_no" value="<%=wave_no%>"/>
<input type="hidden" id="wob_bk_no" name="wob_bk_no" value="<%=wob_bk_no%>"/>
<input type="hidden" id="wh_cd" name="wh_cd" value="<%=wh_cd%>" />
<input type="hidden" id="wob_out_no" name="wob_out_no" value="<%=wob_out_no%>" />
<input type="hidden" id="lp_no" name="lp_no" value="<%=lp_no%>" />
<input type="hidden" id="letter_yn" name="letter_yn" value="N"/>
<input type="hidden" id="wave_wob_bk_no" name="wave_wob_bk_no"/>
 <!-- Print -->
<!-- <input type="hidden" name="com_mrdPath">
<input type="hidden" name="com_mrdArguments"> 
<input type="hidden" name="com_mrdBodyTitle"> -->
<input type="hidden" name="rd_param" id="rd_param" />
	<input type="hidden" name="file_name" id="file_name" />
	<input type="hidden" name="title" id="title" />

<div class="page_title_area clear">
	<!-- page_title(S) -->
	<h2 class="page_title"><span><bean:message key="Print_Option_Information"/></span></h2>
	<!-- page_title(E) -->
	<!-- opus_design_btn(S) -->
	<div class="opus_design_btn">
		<button type="button" class="btn_accent" name="btnSave" id="btnSave" onClick="doWork('SAVE');"><bean:message key="Save"/></button><!-- 
		 --><button type="button" class="btn_normal" name="btnPrint" id="btnPrint" onClick="doWork('PRINT');"><bean:message key="Print"/></button><!-- 
		 --><button type="button" class="btn_normal" name="btn_close" id="btn_close" onClick="doWork('CLOSE');"><bean:message key="Close"/></button><!-- 
	 --></div>
	<!-- opus_design_btn(E) -->
	<!-- page_location(S) -->
		<div class="location">
			<span></span>
		</div>
	<!-- page_location(E) -->
	</div>

<div class= "wrap_search">
	<div class="opus_design_inquiry entry_pannel">
		<table>
		    <colgroup>
	            <col width="50" />
	            <col width="220" />
	            <col width="220" />
	            <col width="*" />                    
	        </colgroup>	
	        <tbody>		
				<tr>
					<td><h3 class="title_design"><bean:message key="Print_Option"/></h3></td>
					<td colspan="3"></td>		
				</tr>
				<tr>
					<th><bean:message key="Warehouse_Outbound_Sheet"/></th>
					<td colspan="3"><input type="checkbox" name="chOption1" id="chOption1" value="1" /></td>		
				</tr>
				<tr>
					<th><bean:message key="Picking_Work_Sheet"/></th>
					<td colspan="3">
		                <span class="dash">[</span><!-- 
						 --><input type="checkbox" name="chOption2" id="chOption2" value="2"/><label for="chOption2"><bean:message key="Total"/></label><!--  
						 --><input type="checkbox" name="chOption3" id="chOption3" value="3"/><label for="chOption3"><bean:message key="Case_type"/></label><!--  					 
						 --><input type="checkbox" name="chOption4" id="chOption4" value="4"/><label for="chOption4"><bean:message key="Each_Type"/></label><!-- 
						 --><span class="dash">]</span><!-- 					
					 --></td>					
				</tr>
				<tr>
					<th><bean:message key="Picking_Inspection_Sheet"/></th>
					<td colspan="3"><input type="checkbox" name="chOption5" id="chOption5" value="5"/></td>					
				</tr>
				<tr>
					<th><bean:message key="Packing_List"/></th>
					<td colspan="3"><input type="checkbox" name="chOption6" id="chOption6" value="6"/></td>					
				</tr>
				<tr>
					<th><bean:message key="Loading_Work_Sheet"/></th>
					<td colspan="3"><input type="checkbox" name="chOption7" id="chOption7" value="7"/></td>					
				</tr>								
				<tr>
					<th><bean:message key="Warehouse_Outbound_Complete_Sheet"/></th>
					<td colspan="3"><input type="checkbox" name="chOption8" id="chOption8" value="8"/></td>					
				</tr>
				<tr>
					<td><h3 class="title_design"><bean:message key="Unit_Conversion_Option"/></h3></td>	
					<td>
						<input type="radio" name="rdoUnitConvYn" id="rdoUnitConvYn_Y" value="Y"></input><label for="rdoUnitConvYn_Y"><bean:message key="Yes"/></label><!-- 
					     --><input type="radio" name="rdoUnitConvYn" id="rdoUnitConvYn_N" value="N" checked></input><label for="rdoUnitConvYn_N"><bean:message key="No"/></label>											
					</td>					
					<td></td>		
					<!-- <td><script type="text/javascript">comComboObject('print_size_tp', 1, 120, 1);</script></td>	 -->		
					<td></td>						
				</tr>
			</tbody>
		</table>
	</div>
	
	<div class="opus_design_inquiry wFit">
		<table>
		    <colgroup>
	            <col width="50" />
	            <col width="260" />
	            <col width="255" />
	            <col width="*" />
	        </colgroup>
	        <tbody>
				<tr><td colspan="4"><h3 class="title_design"><bean:message key="Sheet_Information"/></h3></td></tr>
				<tr>
					<th><bean:message key="Supervisor"/></th>
					<td colspan="3"><input name="supv_nm" type="text" class="L_input" id="supv_nm" style="width:290px;" maxlength="100" readOnly/></td>
				</tr>         
				<tr>
					<th><bean:message key="Outbound_Loc"/></th>
					<td>
						<input type="hidden" id="outbound_loc_cd" name="outbound_loc_cd" /><!-- 					
						 --><input name="outbound_loc_nm" id = "outbound_loc_nm" type="text" class="L_input" dataformat="etc" style="width:150px;text-transform:uppercase;" OnKeyDown="if(event.keyCode==13){getOutboundLocInfo(this);}" /><!-- 
						 --><button type="button" name="btn_outbound_loc_cd" id="btn_outbound_loc_cd" class="input_seach_btn" tabindex="-1" onclick="doWork('btn_outbound_loc_cd');"></button><!-- 
					 --></td>
					<th><bean:message key="Dock_No"/></th>
					<td><input name="gate_no" id="gate_no" type="text" class="L_input" style="width:120px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);" maxlength="10" value="" /></td>  					                                        
				</tr>
			</tbody>
		</table>
	</div>
	
	<div class="opus_design_inquiry wFit">
		<table border="0">
		    <colgroup>
	            <col width="88" />
	            <col width="220" />
	            <col width="296" />
	            <col width="*" />
	        </colgroup>			
	        <tbody>	
			    <tr>
					<th><bean:message key="Picking_by"/></th>
					<td colspan="3"><input name="pick_by" type="text" class="L_input" id="pick_by" style="width:290px;" maxlength="100"/></td>
			    </tr>
			    <tr>
					<th><bean:message key="Picking_Date"/></th>
					<td>
						<input name="pick_dt" id="pick_dt" type="text" class="L_input"  maxlength="10" style="width:80px;" OnBeforeDeactivate="ComAddSeparator(this)" OnBeforeActivate="ComClearSeparator(this)"
						 onblur="chkCmprPrd(firCalFlag, false, this, this, this);"/><!-- 
						 --><button type="button" class="calendar ir" name="btn_pick_date" id="btn_pick_date" onclick="doWork('btn_pick_date')"></button><!-- 
					 --></td>
					<th><bean:message key="Picking_Time"/></th>
					<td>
						<input name="pick_hm_fr" id="pick_hm_fr" type="text" class="L_input" style="width:40px;" dataformat="hm" maxlength="5" OnBeforeDeactivate="ComAddSeparator(this, 'hm')" OnBeforeActivate="ComClearSeparator(this, 'hm')" 
						/><!-- 
						 --><span class="dash">~</span><!-- 
						 --><input name="pick_hm_to" id="pick_hm_to" type="text" class="L_input" style="width:40px;" dataformat="hm" maxlength="5" OnBeforeDeactivate="ComAddSeparator(this, 'hm')" OnBeforeActivate="ComClearSeparator(this, 'hm')" /> 
					</td>  					
			     </tr>
			     <tr>
					<th><bean:message key="Message"/><br/><bean:message key="To_Worker"/></th>
					<td colspan="4">
						<textarea name="msg_to_pick" style="width:99%;height:50px" class="L_textarea" id="msg_to_pick" maxlength="100" onBlur="msg_to_pick_lenChk();"></textarea><!-- 				 
					 --></td>
	             </tr>
             </tbody>                
         </table>
	</div>
	
	<div class="opus_design_inquiry wFit">
		<table>
		    <colgroup>
	            <col width="88" />
	            <col width="220" />
	            <col width="220" />
	            <col width="*" />
	        </colgroup>
	        <tbody>
		        <tr>
					<th><bean:message key="Inspected_by"/></th>
					<td><input name="insp_by" type="text" class="L_input" id="insp_by" style="width:290px;" maxlength="100"/></td>
					<th><bean:message key="Inspecting_Time"/></th>
					<td>
						<input name="insp_hm_fr" id="insp_hm_fr" type="text" class="L_input" style="width:40px;" dataformat="hm" maxlength="5" OnBeforeDeactivate="ComAddSeparator(this, 'hm')" OnBeforeActivate="ComClearSeparator(this, 'hm')" /><!-- 						 
						 --><span class="dash">~</span><!-- 					
						 --><input name="insp_hm_to" id="insp_hm_to" type="text" class="L_input" style="width:40px;" dataformat="hm" maxlength="5" OnBeforeDeactivate="ComAddSeparator(this, 'hm')" OnBeforeActivate="ComClearSeparator(this, 'hm')" /><!-- 						 
					 --></td>  					
			     </tr>                
			     <tr>
					<th><bean:message key="Message"/><br/><bean:message key="To_Inspector"/></th>
					<td colspan="4">
						<textarea name="msg_to_insp" style="width:99%;height:50px" class="L_textarea" id="msg_to_insp" maxlength="100" onBlur="msg_to_insp_lenChk();"></textarea><!-- 						 
					 --></td>
	             </tr>
             </tbody>
         </table>
	</div>
	
	<div class="opus_design_inquiry wFit">
		<table>
		    <colgroup>
	            <col width="88" />
	            <col width="220" />
	            <col width="220" />
	            <col width="*" />
	        </colgroup>
	        <tbody>
		        <tr>
					<th><bean:message key="Load_by"/></th>
					<td><input name="load_by" type="text" class="L_input" id="load_by" style="width:290px;" maxlength="100"/></td>
					<th><bean:message key="Load_Time"/></th>
					<td>
						<input name="load_hm_fr" id="load_hm_fr" type="text" class="L_input" style="width:40px;" dataformat="hm" maxlength="5" OnBeforeDeactivate="ComAddSeparator(this, 'hm')" OnBeforeActivate="ComClearSeparator(this, 'hm')" /><!-- 						 
						 --><span class="dash">~</span><!-- 					
						 --><input name="load_hm_to" id="load_hm_to" type="text" class="L_input" style="width:40px;" dataformat="hm" maxlength="5" OnBeforeDeactivate="ComAddSeparator(this, 'hm')" OnBeforeActivate="ComClearSeparator(this, 'hm')" /><!-- 						 
					 --></td>  					
			     </tr>                
			     <tr>
					<th><bean:message key="Message"/><br/><bean:message key="To_Worker"/></th>
					<td colspan="4">
						<textarea name="msg_to_load" style="width:99%;height:50px" class="L_textarea" id="msg_to_load" maxlength="100" onBlur="msg_to_load_lenChk();"></textarea><!-- 						 
					 --></td>
	            </tr>
            </tbody>
		</table>
	</div>
</div>

<div class="wrap_result">
	<!-- opus_design_grid(S) -->
	<div class="opus_design_grid clear" style="display:none">
		<script type="text/javascript">comSheetObject('sheet1');</script>
	</div>
</div>
</form>
<%@include file="/apps/fis/wms/bizcommon/include_common.jsp"%>
