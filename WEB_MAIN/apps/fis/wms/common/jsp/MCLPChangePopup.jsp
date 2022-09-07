<%--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : MCLPChangePopup.jsp
*@FileTitle  : CLP Move to another CLP Creation No
*@author     : Kieu.Le - DOU Network
*@version    : 1.0
*@since      : 2015/03/18
=========================================================--%>

<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoFormControl.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/ModalCalendar.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoMessage.js?ver=<%=CLT_JS_VER%>"></script>
    
	<script type="text/javascript" src="./js/common/message/<%=CLT_MSG_PATH%>/WMS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script> 
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="./apps/fis/wms/common/js/MCLPChangePopup.js?ver=<%=CLT_JS_VER%>"></script>
<%

	String bk_tp = "";
	String mclp_no = "";
	try {
		bk_tp = request.getParameter("bk_tp")== null?"":request.getParameter("bk_tp");
		mclp_no = request.getParameter("mclp_no")== null?"":request.getParameter("mclp_no");
	}catch(Exception e) {
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
<input type="hidden" name="search_flg" value="N">
<input type="hidden" name="bk_tp" value="<%=bk_tp%>">
<input type="hidden" name="mclp_no_main" value="<%=mclp_no%>">
<input type="hidden" name="pol_old">
<input type="hidden" name="pod_old">
<input type="hidden" name="pol_nm_old">
<input type="hidden" name="pod_nm_old">
	<div class="layer_popup_title">
	<div class="page_title_area clear">
		<!-- page_title(S) -->
		<h2 class="page_title">
				<span><bean:message key="CLP_Move_to_another_CLP_Creation_No"/></span>
			</h2>
		<!-- page_title(E) -->
		<!-- opus_design_btn(S) -->
		<div class="opus_design_btn">
				<button type="button" class="btn_accent" name="btn_search" id="btn_search" onClick="doWork('SEARCHLIST');"><bean:message key="Search"/></button><!--
				--><button type="button" class="btn_normal" name="btn_ok" id="btn_ok" onClick="doWork('btn_ok');"><bean:message key="OK"/></button><!--
				--><button type="button" class="btn_normal" name="btn_close" id="btn_close" onClick="doWork('CLOSE');"><bean:message key="Close"/></button><!--
			  --></div>
		<!-- opus_design_btn(E) -->
		</div>
	</div>	
	<div class="layer_popup_contents">
		<div class= "wrap_search">
			<div class="opus_design_inquiry entry_pannel">
				<table>
					<colgroup>
						<col width="50" />
						<col width="200" />
						<col width="120" />
                        <col width="200" />
						<col width="120" />
						<col width="*" />
					</colgroup>
					<tbody>
                    <tr>
						<th><bean:message key="HBL_No"/></th>
						<td>
							<input name="hbl_no" type="text" class="L_input" id="hbl_no"  dataformat="engup" style="width:194px;text-transform:uppercase;"/>
						</td>
						<th><bean:message key="Service_Order_No"/></th>
						<td>
							<input name="so_no" type="text" class="L_input" id="so_no"  dataformat="engup" style="width:194px;text-transform:uppercase;" maxlength="13"/><!-- 
							 --><button type="button" class="input_seach_btn" tabindex="-1" name="btn_so_no" id="btn_so_no" onClick="doWork('btn_so_no');"></button>
						</td>
						<th><bean:message key="Consol_No"/></th>
						<td>
							<input name="mclp_no" type="text" class="L_input" id="mclp_no" style="width:223px;text-transform:uppercase;" dataformat="engup" />
                        </td>
					</tr>
                    <tr>
						<th><bean:message key="CLP_No"/></th>
                    	<td><input name="clp_no" type="text" class="L_input" id="nclp_no" style="width:194px;text-transform:uppercase;" dataformat="engup"/>
                        </td>
						<th><bean:message key="Container_No"/></th>
						<td>
							<input name="cntr_no" type="text" class="L_input" id="ctrt_no" dataformat="engup"  style="width:194px;text-transform:uppercase;" /><!-- 
							 --><button type="button" class="input_seach_btn" tabindex="-1" name="btn_cntr_no" id="btn_cntr_no" onClick="doWork('btn_cntr_no');"></button>
						</td>
						<th><bean:message key="POL"/></th>
						<td>
							<input name="pol" type="text" class="L_input" id="pol" dataformat="engup" style="width:75px;text-transform:uppercase;"  onblur="searchLocNm('pol');"/><!-- 
							 --><button type="button" class="input_seach_btn" tabindex="-1" name="btn_pol" id="btn_pol" onClick="doWork('btn_pol');"></button><!-- 
							 --><input name="pol_nm" type="text" class="L_input" id="pol_nm" style="width:115px;" dataformat="engup" />
						</td>
					</tr>
					<tr>
						<th><bean:message key="POD"/></th>
						<td>
							<input name="pod" type="text" class="L_input" id="pod" dataformat="engup" style="width:60px;text-transform:uppercase;"  onblur="searchLocNm('pod');"/><!-- 
							 --><button type="button" class="input_seach_btn" tabindex="-1" name="btn_pod" id="btn_pod" onClick="doWork('btn_pod');"></button><!-- 
							 --><input name="pod_nm" type="text" class="L_input" id="pod_nm" style="width:101px;" dataformat="engup" />
						</td>
						<th><bean:message key="ETD"/></th>
						<td>
							<input name="fm_pol_etd" type="text" class="L_input"  maxlength="10" style="width:75px;" OnBeforeDeactivate="ComAddSeparator(this)" OnBeforeActivate="ComClearSeparator(this)" onkeypress="onlyNumberCheck();" onkeyup="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onblur="chkCmprPrd(firCalFlag, false, this, form.to_pol_etd,this);firCalFlag=false;"/><!-- 
							 --><span class="dash">~</span><!-- 
							 --><input name="to_pol_etd" type="text" class="L_input"  maxlength="10" style="width:75px;" OnBeforeDeactivate="ComAddSeparator(this)" OnBeforeActivate="ComClearSeparator(this)"
							  onkeypress="onlyNumberCheck();" onkeyup="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onblur="chkCmprPrd(firCalFlag, false, this, form.fm_pol_etd,this);firCalFlag=false;"/><!-- 
							 --><button type="button" class="calendar" tabindex="-1" name="btn_to_pol_etd" id="btn_to_pol_etd" onClick="doWork('btn_to_pol_etd');"></button>
						</td>
                        <th><bean:message key="ETA"/></th>
						<td>
							<input name="fm_pod_eta" type="text" class="L_input"  maxlength="10" style="width:75px;" OnBeforeDeactivate="ComAddSeparator(this)" OnBeforeActivate="ComClearSeparator(this)"
							onkeypress="onlyNumberCheck();" onkeyup="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onblur="chkCmprPrd(firCalFlag, false, this, form.to_pod_eta,this);firCalFlag=false;"/><!-- 
							 --><span class="dash">~</span><!-- 
							 --><input name="to_pod_eta" type="text" class="L_input"  maxlength="10" style="width:75px;" OnBeforeDeactivate="ComAddSeparator(this)" OnBeforeActivate="ComClearSeparator(this)"
							  onkeypress="onlyNumberCheck();" onkeyup="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onblur="chkCmprPrd(firCalFlag, false, this, form.fm_pod_eta,this);firCalFlag=false;"/><!-- 
							 --><button type="button" class="calendar" tabindex="-1" name="btn_to_pod_eta" id="btn_to_pod_eta" onClick="doWork('btn_to_pod_eta');"></button>
						</td>
					</tr>
					</tbody>
				</table>
			</div>
		</div>
		<!-- opus_design_inquiry(E) -->
		
		<div class="wrap_result">
			<!-- opus_design_grid(S) -->
			<div class="opus_design_grid clear">
				<script type="text/javascript">comSheetObject('sheet1');</script>
			</div>
		</div>
	</div>
</form>
<%@include file="/apps/fis/wms/bizcommon/include_common.jsp"%>

