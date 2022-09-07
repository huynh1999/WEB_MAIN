<%
/*--=========================================================
 *Copyright(c) 2014 CyberLogitec. All Rights Reserved.
 *@FileName   : WHOCEQUpdatePopup.jsp
 *@FileTitle  : Container/Truck Update
 *@author     : TanPham - DOU Network
 *@version    : 1.0
 *@since      : 2015/04/22
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
    <script type="text/javascript" src="./apps/fis/wms/common/js/WHOCEQUpdatePopup.js?ver=<%=CLT_JS_VER%>"></script>
    
<%
	String div	 = ""; //div : bk, lp
	String lp_no = "";
	String eq_tpsz_cd = "";
	String eq_no = "";
	String eq_tp_cd = "";
	String seal_no = "";
	String gate_in_hm = "";
	String gate_out_hm = "";
			
	try {
		div = request.getParameter("div")== null?"":request.getParameter("div");
		lp_no = request.getParameter("lp_no")== null?"":request.getParameter("lp_no");
		eq_tpsz_cd = request.getParameter("eq_tpsz_cd")== null?"":request.getParameter("eq_tpsz_cd");
		eq_no = request.getParameter("eq_no")== null?"":request.getParameter("eq_no");
		eq_tp_cd = request.getParameter("eq_tp_cd")== null?"":request.getParameter("eq_tp_cd");
		seal_no = request.getParameter("seal_no")== null?"":request.getParameter("seal_no");
		gate_in_hm = request.getParameter("gate_in_hm")== null?"":request.getParameter("gate_in_hm");
		gate_out_hm = request.getParameter("gate_out_hm")== null?"":request.getParameter("gate_out_hm");
		
		
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
<input type="hidden" id="req_div" name="req_div" value="<%=div%>"/>
<input type="hidden" id="req_lp_no" name="req_lp_no" value="<%=lp_no%>"/>
<input type="hidden" id="rep_eq_tpsz_cd" name="rep_eq_tpsz_cd" value="<%=eq_tpsz_cd%>"/>
<input type="hidden" id="req_eq_no" name="req_eq_no" value="<%=eq_no%>"/>
<input type="hidden" id="req_eq_tp_cd" name="req_eq_tp_cd" value="<%=eq_tp_cd%>"/>
<input type="hidden" id="req_seal_no" name="req_seal_no" value="<%=seal_no%>"/>
<input type="hidden" id="req_gate_in_hm" name="req_gate_in_hm" value="<%=gate_in_hm%>"/>
<input type="hidden" id="req_gate_out_hm" name="req_gate_out_hm" value="<%=gate_out_hm%>"/>
<input type="hidden" id="f_cmd" value="0" />

<!-- page_title_area(S) -->
<div class="page_title_area clear">
	<!-- page_title(S) -->
	<h2 class="page_title"><span><bean:message key="Container_Truck_Update"/></span></h2>
	<!-- page_title(E) -->
	<!-- opus_design_btn(S) -->
	<div class="opus_design_btn">
			<button type="button" class="btn_normal" name="btn_Ok" id="btn_Ok" onClick="doWork('btn_Ok');"><bean:message key="OK"/></button><!-- 
		  --><button type="button" class="btn_normal" name="btn_Close" id="btn_Close" onClick="doWork('CLOSE');"><bean:message key="Close"/></button><!--
	 --></div>
	<!-- opus_design_btn(E) -->
</div>

<div class= "wrap_search">
<div class="opus_design_inquiry ">
	<table>
    	<colgroup>
    		   <col width="90" />
  			   <col width="100" />
               <col width="100" />
              
		</colgroup>    
		<tbody> 
		 			<tr id="trLpNo" name="trLpNo">					
						<th><bean:message key="LP_NO"/></th>
						<td>
							<input name="lp_no" id="lp_no" type="text" class="L_input_R" style="ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);" readonly/>
						</td>
					</tr>
					<tr>					
						<th><bean:message key="Type"/></th>
						<td>
							<input name="eq_tpsz_cd" id="eq_tpsz_cd" type="text" class="L_input"  onBlur="strToUpper(this);obj_onchange();getContainerTypeInfo();" dataformat="engup" required style="width:90px;ime-mode:disabled;text-transform:uppercase;"/><!-- 
							 --><button class="input_seach_btn" type="button" id="btn_eq_tpsz_cd" name="btn_eq_tpsz_cd" onClick="doWork('btn_eq_tpsz_cd');"></button><!-- 
							 --><input name="eq_tpsz_nm" id="eq_tpsz_nm" type="text" class="L_input_R" dataformat="excepthan" style="width:191px;ime-mode:disabled;text-transform:uppercase;" onBlur="strToUpper(this);"  readonly/><!-- 
							 --><input name="eq_tpsz_cd_org" id="eq_tpsz_cd_org" type="hidden" /><!-- 
							 --><input name="eq_tp_cd" id="eq_tp_cd" type="hidden" />
						</td>
					</tr>
					<tr>					
						<th><bean:message key="CNTR_TR_NO"/></th>
						<td>
							<input name="eq_no" id="eq_no" type="text" class="L_input" style="width:90px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);" maxlength="20"/>
						</td>
					</tr>
					<tr>					
						<th><bean:message key="Seal_No"/></th>
						<td>
							<input name="seal_no0" id="seal_no0" type="text" class="input" dataformat="engup" style="width:90px;ime-mode:disabled; text-transform:uppercase;" onBlur="strToUpper(this);"/><!-- 
						
							 --><input name="seal_no1" id="seal_no1" type="text" class="input" dataformat="engup" style="width:90px;ime-mode:disabled; text-transform:uppercase;" onBlur="strToUpper(this);"/><!-- 
						
							 --><input name="seal_no2" id="seal_no2" type="text" class="input" dataformat="engup" style="width:90px;ime-mode:disabled; text-transform:uppercase;" onBlur="strToUpper(this);"/>
						</td>
					</tr>
					<tr>					
						<th><bean:message key="Gate_In"/></th>
						<td><input name="gate_in_hm" id="gate_in_hm"  onblur="timeCheck(this, form.gate_in_hm, form.gate_out_hm);" type="text" class="L_input" dataformat="hm" 
							   style="width:90px;" maxlength="5" OnBeforeDeactivate="ComAddSeparator(this, 'hm');" OnBeforeActivate="ComClearSeparator(this, 'hm');" /><!-- 
					 --><span class="dash" ><B>/ <bean:message key="Gate_Out"/></B></span><!-- 
					 --><input name="gate_out_hm" id="gate_out_hm" type="text"  onblur="timeCheck(this, form.gate_in_hm, form.gate_out_hm);" class="L_input" dataformat="hm"
						       style="width:90px;" maxlength="5" OnBeforeDeactivate="ComAddSeparator(this, 'hm');" OnBeforeActivate="ComClearSeparator(this, 'hm');" />
						</td>
					</tr>      	
		</tbody>
	</table>
	</div>
	</div>
</form>
<%@include file="/apps/fis/wms/bizcommon/include_common.jsp"%>