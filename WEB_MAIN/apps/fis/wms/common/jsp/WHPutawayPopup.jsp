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
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="./apps/fis/wms/common/js/WHPutawayPopup.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
     
	<script type="text/javascript" src="./js/common/message/<%=CLT_MSG_PATH%>/WMS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<bean:define id="valMap" name="EventResponse" property="mapVal"/>
<%
 	String wib_bk_no = "";
	try {
		wib_bk_no = request.getParameter("wib_bk_no") == null ? "" : request.getParameter("wib_bk_no");
	} catch (Exception e) {
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
<input type="hidden" id="f_cmd" />
<input type="hidden" id="f_CurPage" />
<input type="hidden" name="ctrt_cust_cd_old" id="ctrt_cust_cd_old"/>
<input type="hidden" name="cancel_flg" id="cancel_flg"/>
<input type="hidden" name="title" id="title"/>
<input type="hidden" name="file_name" id="file_name"/>
<input type="hidden" name="rd_param" id="rd_param"/>
<input type="hidden" name="userId" id="userId" value ="<%=userInfo.getUsrid()%>"/>
<input type="hidden" name="org_cd" value="KRSELLB" id="org_cd"/>
<input type="hidden" id="print_wib_bk_no_in" name="print_wib_bk_no_in"/>
<input type="hidden" name="search_flg" value="N" id="search_flg"/>
	<!-- page_title_area(S) -->
	<div class="page_title_area clear">
	
		<!-- page_title(S) -->
		<h2 class="page_title"><span><bean:message key="Putaway"/></span></h2>
		<!-- page_title(E) -->
					
		<!-- opus_design_btn(S) -->
		<div class="opus_design_btn">
			<button type="button" class="btn_normal" name="btn_Save" id="btn_Search" onClick="doWork('SAVE');"><bean:message key="Save"/></button><!-- 
			 --><button type="button" class="btn_normal" name="btn_cancel" id="btn_cancel" onClick="doWork('CANCEL');"><bean:message key="Cancel"/></button><!-- 
			 --><button type="button" class="btn_normal" name="btn_excel" id="btn_excel" onClick="doWork('EXCEL');"><bean:message key="Excel"/></button><!-- 
			 --><button type="button" class="btn_normal" name="btn_Print" id="btn_Print" onClick="doWork('PRINT');"><bean:message key="Print"/></button><!-- 
			 --><button type="button" class="btn_normal" name="btn_close" id="btn_close" onClick="doWork('CLOSE');"><bean:message key="Close"/></button>
		</div>
		<!-- opus_design_btn(E) -->	
	</div>
	<!-- page_title_area(E) -->

<div class="wrap_search">
<!-- opus_design_inquiry(S) -->
<div class="opus_design_inquiry ">
	<table>
		<colgroup>
			<col width="120" />
			<col width="340" />
			<col width="110" />
			<col width="210" />
			<col width="110" />
			<col width="*" />
		</colgroup>
		<tbody>
			<tr>
				<th><bean:message key="Supervisor"/></th>
				<td><input name="supv_nm" type="text" dataformat="excepthan" id="supv_nm" style="ime-mode:disabled;text-transform:uppercase;width:340px;" onblur="strToUpper(this);" maxlength="100"/></td>
				<th><bean:message key="Putaway_Date"/></th>
				<td><input name="putaway_dt" id="putaway_dt" type="text" style="width:80px;" dataformat="mdy" maxlength="10" /><!-- 
					 --><button type="button" class="calendar" tabindex="-1" name="btn_putaway_dt" id="btn_putaway_dt" onclick="doDisplay('DATE1', form);"></button><!-- 
					 --><img  name="btn_putaway_dt" id="btn_putaway_dt" style="cursor:pointer"/><!-- 
					 --><input onblur="timeCheck(this, form.putaway_hm_fr, form.putaway_hm_to);" name="putaway_hm_fr" id="putaway_hm_fr" type="text" style="width:40px;" dataformat="hm" maxlength="5" /><!-- 
					  --><span class="dash">~</span><!-- 
					  --><input onblur="timeCheck(this, form.putaway_hm_fr, form.putaway_hm_to);" name="putaway_hm_to" id="putaway_hm_to" type="text" style="width:40px;" dataformat="hm" maxlength="5"  />
				</td> 
				<th><bean:message key="Print_LOT_Type"/></th>
				<td>
					<select name="prn_lot_tp" id="prn_lot_tp" style="width:120px">
						<option value="LOT01">Inbound Date</option>
						<option value="LOT02" selected="selected">LOT NO</option>
						<option value="LOT03">Expiration Date</option>
						<option value="LOT03">LOT04</option>
						<option value="LOT04">LOT05</option>
					</select>
				</td>
			</tr>
			<tr>
				<th><bean:message key="Working_Instruction"/></th>
				<td colspan="3">
					<textarea name="msg_to_wk" id="msg_to_wk" dataformat="excepthan" onblur="strToUpper(this);"></textarea>
				</td>
			</tr>
		</tbody>
	</table>
</div>
<!-- opus_design_inquiry(E) -->
</div>
		
<div class="wrap_result">
	<!-- opus_design_grid(S) -->
	 <div class="opus_design_grid clear">
		<script type="text/javascript">comSheetObject('sheet1');
		</script> 
	</div>
 	<div class="opus_design_inquiry">
	   <table border="0">
			<tr>
				<td width="100">
					<bean:define id="pagingVal" name="valMap"     property="pagingTb"/>
					<paging:options name="pagingVal" defaultval="200"/> 
				</td>
				<td align="center" width="700">
					<table width="700">
						<tr>
							<td width="700" id="pagingTb" style='font-family: "Tahoma", "Arial", "Verdana";font-size: 11px;'>
							</td>
						</tr>
					</table>		
				</td>
				<td width="100"></td>
			</tr>
		</table>
	</div> 
</div>
<div id="COMPLETE_IMG" style="position:fixed;display:none; filter:alpha(opacity = 100); width:280px;height:60px;top:50%;left:50%;margin:-30px 0 0 -140px;z-index:999">
		<iframe src='<%=CLT_PATH%>/js/common/completed.html' scrolling='no'  style='margin-top: 0px; width:100%; height: 60px;'></iframe>
	</div>
</form>
<%-- <%@include file="/apps/fis/wms/bizcommon/include_common.jsp"%> --%>
