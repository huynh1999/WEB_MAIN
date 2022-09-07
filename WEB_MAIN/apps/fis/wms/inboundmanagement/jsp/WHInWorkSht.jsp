<%--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : ContractRoutePopup.jsp
*@FileTitle  : 
*@author     : Lam.Nguyen Dou Network
*@version    : 1.0
*@since      : 2015/03/11
=========================================================--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoFormControl.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoBizCommon.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="./apps/fis/wms/inboundmanagement/script/WHInWorkSht.js?ver=<%=CLT_JS_VER%>"></script>
     
	<script type="text/javascript" src="./js/common/message/<%=CLT_MSG_PATH%>/WMS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
<%
	String wib_bk_no = "";
	try {
		wib_bk_no = request.getParameter("wib_bk_no") == null ? "" : request.getParameter("wib_bk_no");
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
		loadPage();
	}
</script>
<form id="form" name="form">
<input type="hidden" id="f_cmd" />
<input type="hidden" id="f_CurPage" />
<input type="hidden" id="file_name" name="file_name" />
<input type="hidden" id="rd_param" name="rd_param" />
<input type="hidden" id="title" name="title" />
<input type="hidden" name="paper_size" id="paper_size" value="<%-- <%=userInfo.getPaper_size()%> --%>" />
	<!-- page_title_area(S) -->
	<div class="page_title_area clear">
	
		<!-- page_title(S) -->
		<h2 class="page_title"><span>Inbound Worksheet</span></h2>
		<!-- page_title(E) -->
					
		<!-- opus_design_btn(S) -->
		<div class="opus_design_btn">
			<button type="button" class="btn_accent" name="btnSave" id="btnSave" onClick="doWork('SAVE');"><bean:message key="Save"/></button><!-- 
			 --><button type="button" class="btn_normal" name="btnDelete" id="btnDelete" onClick="doWork('DELETE');"><bean:message key="Delete"/></button><!-- 
			 --><button type="button" class="btn_normal" name="btnPrint" id="btnPrint" onClick="doWork('PRINT');"><bean:message key="Print"/></button><!--
			 --><button type="button" class="btn_normal" name="btnClose" id="btnClose" onClick="doWork('CLOSE');"><bean:message key="Close"/></button>
		</div>
		<!-- opus_design_btn(E) -->	
	</div>
	<!-- page_title_area(E) -->
		<div class="wrap_search">
			<!-- opus_design_inquiry(S) -->
			<div class="opus_design_inquiry entry_pannel ">
				<table>
					<colgroup>
						<col width="14%" />
	                    <col width="37%" />
	                    <col width="16%" />
	                    <col width="" />
					</colgroup>
					<tbody>
						<tr>
							<th><bean:message key="Order_No"/></th>
							<td colspan="3">
					        	<input name="cust_ord_no" id="cust_ord_no" type="text" readonly tabindex="-1" style="width: 100%;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onblur="strToUpper(this);"/>
					        	<input name="wib_bk_no" id="wib_bk_no" type="hidden" value="<%=wib_bk_no%>"/>	
					        	<input type="hidden" name="unload_sht_yn" id="unload_sht_yn" />
					        	<input type="hidden" name="bk_sts_cd" id="bk_sts_cd" />	
					        	<input type="hidden" name="wh_cd" id="wh_cd" />			     
					        </td>   
						</tr>
						<tr>
							<th><bean:message key="Supervisor"/></th>
							<td>
								<input name="supv_nm" id="supv_nm" type="text" maxlength="100" style="width: 400px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onblur="strToUpper(this);"/>
							</td>
							<th><bean:message key="Unloading_Sheet"/></th>
							<td>
								<input name="unload_dt" id="unload_dt" type="text" style="width:80px;" onkeypress="onlyNumberCheck();" onkeyup="mkDateFormatType(this, event, false,1)" maxlength="10" onbeforedeactivate="ComAddSeparator(this)" onbeforeactivate="ComClearSeparator(this)" onblur="chkCmprPrd(firCalFlag, false, this, this, this);"/><!--
								 --><button type="button" class="calendar ir" name="btn_unload_dt" id="btn_unload_dt" onclick="doWork('btn_unload_dt');" tabindex="-1"></button><!-- 
								 --><input onblur="timeCheck(this, form.unload_hm_fr, form.unload_hm_to);" name="unload_hm_fr" id="unload_hm_fr" type="text" style="width:40px;" dataformat="hm" maxlength="5" OnBeforeDeactivate="ComAddSeparator(this, 'hm')" OnBeforeActivate="ComClearSeparator(this, 'hm')" /><!-- 
								 --><span class="dash">~</span><!-- 
								 --><input onblur="timeCheck(this, form.unload_hm_fr, form.unload_hm_to);" name="unload_hm_to" id="unload_hm_to" type="text" style="width:40px;" dataformat="hm" maxlength="5" OnBeforeDeactivate="ComAddSeparator(this, 'hm')" OnBeforeActivate="ComClearSeparator(this, 'hm')" />
							</td>  		
						</tr>
					</tbody>
				</table>
				<table class="line_bluedot"><tr><td></td></tr></table>
				<table border="0">
			    <colgroup>
                    <col width="14%" />
                    <col width="" />
                </colgroup>							
                <tr>
					<th><bean:message key="Working_Instruction"/></th>
					<td>
						<textarea name="msg_to_wk" id="msg_to_wk" style="height:50px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onblur="strToUpper(this);" class="L_textarea" maxlength="100"></textarea>				 
					</td>
                </tr>          
			</table>
			<table class="line_bluedot"><tr><td></td></tr></table>
			<table border="0">
			    <colgroup>
                    <col width="14%" />
                    <col width="37%" />
                    <col width="16%" />
                    <col width="" />
                </colgroup>                      
                <tr>
					<th><bean:message key="CNTRTR"/></th>
					<td>
						<input name="eq_tpsz_cd" id="eq_tpsz_cd" type="text" style="width: 40px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onblur="strToUpper(this);" readonly tabindex="-1"/><!-- 
						 --><input name="eq_no" id="eq_no" type="text" style="width: 356px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onblur="strToUpper(this);" readonly tabindex="-1"/> 
					</td>
					<th><bean:message key="Gate_In_Out"/></th>
					<td>
						<input onblur="timeCheck(this, form.gate_in_hm, form.gate_out_hm);" name="gate_in_hm" id="gate_in_hm" type="text" style="width:40px;" dataformat="hm" maxlength="5" OnBeforeDeactivate="ComAddSeparator(this, 'hm')" OnBeforeActivate="ComClearSeparator(this, 'hm')" />	<!-- 					 
						 --><span class="dash">~</span><!-- 						
						 --><input onblur="timeCheck(this, form.gate_in_hm, form.gate_out_hm);" name="gate_out_hm" id="gate_out_hm" type="text" style="width:40px;" dataformat="hm" maxlength="5" OnBeforeDeactivate="ComAddSeparator(this, 'hm')" OnBeforeActivate="ComClearSeparator(this, 'hm')" />						 
					</td>  					
                </tr>                
                <tr>
					<th><bean:message key="Driver"/></th>
					<td>
						<input name="driver_nm" id="driver_nm" type="text" maxlength="100" style="width: 400px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onblur="strToUpper(this);" dataformat="engup"/>						 
					</td>
					<th><bean:message key="Licence_No"/></th>
					<td>
						<input name="driver_lic_no" id="driver_lic_no" type="text" maxlength="20" style="width: 140px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onblur="strToUpper(this);"/>						 
					</td>
                </tr>     
            </table>
            <table class="line_bluedot"><tr><td></td></tr></table>
            <table border="0">
			    <colgroup>
                    <col width="14%" />
                    <col width="37%" />
                    <col width="16%" />
                    <col width="" />
                </colgroup>                      
                <tr>
					<th><bean:message key="Gate_No"/></th>
					<td>
						<input name="gate_no" id="gate_no" type="text" maxlength="20" style="width: 400px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onblur="strToUpper(this);"/>						 
					</td>
					<th><bean:message key="Unloading_Location"/></th>
					<td>
						<input name="unload_loc_nm" id="unload_loc_nm" type="text" maxlength="10" style="width: 60px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);getInboundLocInfo('c')" OnKeyDown="if(event.keyCode==13){locPopup();}"/><!-- 
						 --><button type="button" name="btn_unload_loc" id="btn_unload_loc" class="input_seach_btn" tabindex="-1" onClick="doWork('btn_unload_loc');"></button><!-- 
						 --><input type="hidden" name="unload_loc" id="unload_loc" />
					</td>  					
                </tr>                
            </table>   
            <table class="line_bluedot"><tr><td></td></tr></table>
            <table border="0">
			    <colgroup>
                    <col width="14%" />
                    <col width="" />
                    <col width="10%" />
                    <col width="10" />
                </colgroup>                                                 
                <tr>
					<th><bean:message key="Print_Option"/></th>
					<td>
						<input type="checkbox" name="chOption1" id="chOption1" value="1"><label for="chOption1"><bean:message key="Inbound_WorkSheet"/></label></input> 
						<input type="checkbox" name="chOption2" id="chOption2" value="2"><label for="chOption2" title="OS&D : Over Short & Damaged"><bean:message key="Inbound_OSDSheet"/></label></input> 
						<input type="checkbox" name="chOption5" id="chOption5" value="3"><label for="chOption5"><bean:message key="Warehouse_Receipt"/></label></input>
						<input type="checkbox" name="chOption3" id="chOption3" value="4"><label for="chOption3"><bean:message key="Pallet_Label"/></label></input>
					</td>
					<th><!-- <bean:message key="Print_Size"/> --></th>
					<td>
						<!-- <select name="print_size_tp" id="print_size_tp" style="width: 90px;">
							<option value="A4">A4</option>
							<option value="LT">LT</option>
						</select> -->
					</td>  										
                </tr>
			</table>
			</div>
			<!-- opus_design_inquiry(E) -->
		</div>
		
		<div class="wrap_result" style="display: none;">
			<!-- opus_design_grid(S) -->
			<div class="opus_design_grid clear">
				<script type="text/javascript">comSheetObject('sheet1');</script>
			</div>
		</div>
		<div id="COMPLETE_IMG" style="position:fixed;display:none; filter:alpha(opacity = 100); width:280px;height:60px;top:50%;left:50%;margin:-30px 0 0 -140px;z-index:999">
			<iframe src='<%=CLT_PATH%>/js/common/completed.html' scrolling='no'  style='margin-top: 0px; width:100%; height: 60px;'></iframe>
		</div>
</form>
<%-- <%@include file="/apps/fis/wms/bizcommon/include_common.jsp"%> --%>

