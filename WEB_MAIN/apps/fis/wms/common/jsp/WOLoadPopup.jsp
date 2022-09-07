 <%
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : WOLoadPopup.jsp
*@FileTitle  : BL Load
*@author     : Khang.Dong - DOU Network
*@version    : 1.0
*@since      : 2015/03/13
=========================================================*/
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
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="./apps/fis/wms/common/js/WOLoadPopup.js?ver=<%=CLT_JS_VER%>"></script>
	
 	<script type="text/javascript" src="./js/common/message/<%=CLT_MSG_PATH%>/WMS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
<%

	String popup_flag = "";
	String opener_sheet_idx = "";
	String order_tp = "";
	String ctrt_no = "";
	String ctrt_nm = "";
	String org_cd = "";
	String po_item_flag = "";

	try {
		popup_flag = request.getParameter("popup_flag")== null?"":request.getParameter("popup_flag");
		opener_sheet_idx = request.getParameter("opener_sheet_idx")== null?"":request.getParameter("opener_sheet_idx");
		order_tp = request.getParameter("order_tp")== null?"":request.getParameter("order_tp");
		ctrt_no = request.getParameter("ctrt_no")== null?"":request.getParameter("ctrt_no");
		ctrt_nm = request.getParameter("ctrt_nm")== null?"":request.getParameter("ctrt_nm");
		org_cd = request.getParameter("org_cd")== null?"":request.getParameter("org_cd");
		po_item_flag = request.getParameter("po_item_flag")== null?"N":request.getParameter("po_item_flag");
	}catch(Exception e) {
		out.println(e.toString());
	}	
%>
<head>
<script type="text/javascript">
function setupPage(){
	var errMessage = "";
	if (errMessage.length >= 1) {
		ComShowMessage(errMessage);
	} // end if
	loadPage(true);
}
</script>
</head>
<form id="form" name="form">
<input type="hidden" id="f_cmd" value="0" />
<input type="hidden" name="popup_flag" value="<%=popup_flag%>" id="popup_flag" />
<input type="hidden" name="opener_sheet_idx" value="<%=opener_sheet_idx%>" id="opener_sheet_idx" />
<input type="hidden" name="in_order_tp" value="<%=order_tp%>" id="in_order_tp" />
<input type="hidden" name="in_ctrt_no" value="<%=ctrt_no%>" id="in_ctrt_no" />
<input type="hidden" name="org_cd" value="RRRR" id="org_cd" />

<input type="hidden" name="ctrt_no_old" value="" id="ctrt_no_old" />
<input type="hidden" name="carrier_cd_old" value="" id="carrier_cd_old" />
<input type="hidden" name="shp_cd_old" value="" id="shp_cd_old" />
<input type="hidden" name="cne_cd_old" value="" id="cne_cd_old" />
<input type="hidden" name="pol_old" value="" id="pol_old" />
<input type="hidden" name="pod_old" value="" id="pod_old" />
<input type="hidden" name="del_old" value="" id="del_old" />

<input type="hidden" name="po_item_flag" value="<%=po_item_flag%>" id="po_item_flag" />
 <div class="page_title_area clear">
	<!-- page_title(S) -->
	<h2 class="page_title">
			<span>BL Load</span>
		</h2>
	<!-- page_title(E) -->
	<!-- opus_design_btn(S) -->
	<div class="opus_design_btn">
			<button type="button" class="btn_accent" name="btn_Search" id="btn_Search" onClick="doWork('SEARCHLIST');"><bean:message key="Search"/></button><!-- 
			--><button type="button" class="btn_normal" name="btn_OK" id="btn_OK" onClick="doWork('btn_OK');"><bean:message key="OK"/></button><!--
			 --><button type="button" class="btn_normal" name="btn_Close" id="btn_Close" onClick="doWork('CLOSE');"><bean:message key="Close"/></button> 
	 </div>
	<!-- opus_design_btn(E) -->
	<!-- page_location(S) -->
		<div class="location">
			<span></span>
		</div>
	<!-- page_location(E) -->
</div>
<div class="wrap_search">
    <!-- opus_design_inquiry(S) -->
    <div class="opus_design_inquiry entry_pannel">
        <table>
				<colgroup>
					<col width="100" />
					<col width="200" />
					<col width="120" />
                    <col width="200" />
					<col width="120" />
					<col width="" />
				</colgroup>
				<tr>
					<th><bean:message key="Type"/></th>	
					<th>
						<input type="radio" name="radio_type" value="S" checked="" id="radio_type1" /><label for="radio_type1">Sea</label><!-- 
					     --><input type="radio" name="radio_type" value="A" id="radio_type2" /><label for="radio_type2">Air</label><!-- 
					     --><label for="check_item">Load by PO/Item</label><input type="checkbox" name="check_item" id="check_item" /> 
					 </th>
					<th>MBL/MAWB NO</th>
					<td>
					<input name="mbl_no" type="text" id="mbl_no" style="width:235px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);" maxlength="20"/>
					</td>
					<th>HBL/HAWB NO</th>
					<td>
					<input name="hbl_no" type="text" id="hbl_no" style="width:235px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);"/>
					</td>
				</tr>
                   <tr>
					<th>Contract No.</th>
					<td>
						<input name="ctrt_no" id="ctrt_no" type="text" maxlength="10" style="width:80px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" otherchar="-_" onBlur="strToUpper(this);searchTlCtrtInfo();" value="<%=ctrt_no%>" /><!-- 
						 --><button class="input_seach_btn" type="button" id="btn_ctrt_no" name="btn_ctrt_no" onClick="doWork('btn_ctrt_no');"></button><!-- 
						 --><input name="ctrt_nm" id="ctrt_nm" type="text" style="width:122px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" otherchar = " ()-_" onBlur="strToUpper(this);" value="<%=ctrt_nm%>" />
					</td>
                    <th>ETD</th>
					<td>
						<input name="fm_etd" type="text" dataformat="ymd" maxlength="10" style="width:80px;" onkeypress="onlyNumberCheck();" onkeyup="mkDateFormatType(this, event, false,1)" onblur="mkDateFormatType(this, event, true,1)" onbeforedeactivate="ComAddSeparator(this)" onbeforeactivate="ComClearSeparator(this)" id="fm_etd"
						 /><!-- 
						 --><!-- 
						 --><span class="dash">~</span><!--  
						  --><input name="to_etd" type="text" dataformat="ymd" onkeypress="onlyNumberCheck();" onkeyup="mkDateFormatType(this, event, false,1)" onblur="mkDateFormatType(this, event, true,1)" maxlength="10" style="width:80px;" onbeforedeactivate="ComAddSeparator(this)" onbeforeactivate="ComClearSeparator(this)" id="to_etd" 
						 onclick = "OmsFunFocusDel(this)" /><!-- 
						 --><button class="calendar" type="button" id="btn_to_etd" name="btn_to_etd" onClick="doWork('btn_to_etd');"></button>
					</td>
					<th>ETA</th>
					<td>
						<input name="fm_eta" type="text" dataformat="ymd" maxlength="10" style="width:80px;" onkeypress="onlyNumberCheck();" onkeyup="mkDateFormatType(this, event, false,1)" onblur="mkDateFormatType(this, event, true,1)" onbeforedeactivate="ComAddSeparator(this)" onbeforeactivate="ComClearSeparator(this)" id="fm_eta" 
						onclick = "OmsFunFocusDel(this)" /><!-- 
						 --><!-- 
						  --><span class="dash">~</span><!-- 
						 --><input name="to_eta" type="text" dataformat="ymd" maxlength="10" style="width:80px;" onkeypress="onlyNumberCheck();" onkeyup="mkDateFormatType(this, event, false,1)" onblur="mkDateFormatType(this, event, true,1)" onbeforedeactivate="ComAddSeparator(this)" onbeforeactivate="ComClearSeparator(this)" id="to_eta" 
						onclick = "OmsFunFocusDel(this)" onblur="chkCmprPrd(firCalFlag, false, this,form.fm_eta ,this );firCalFlag=false;" /><!-- 
						 --><button class="calendar" type="button" id="btn_to_eta" name="btn_to_eta" onClick="doWork('btn_to_eta');"></button>
					</td>
				</tr>
                   <tr>
					<th>POL</th>
					<td>
						<input name="pol" type="text" id="pol" style="width:80px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);searchLocNm('pol');" maxlength="5" /><!-- 
						 --><button class="input_seach_btn" type="button" id="btn_pol" name="btn_pol" onClick="doWork('btn_pol');"></button><!-- 
						 --><input name="pol_nm" type="text" id="pol_nm" style="width:122px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);" />
					</td>
                    <th>POD</th>
					<td>
						<input name="pod" type="text" id="pod" style="width:80px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);searchLocNm('pod');" maxlength="5" /><!-- 
						--><button class="input_seach_btn" type="button" id="btn_pod" name="btn_pod" onClick="doWork('btn_pod');"></button><!--
						--><input name="pod_nm" type="text" id="pod_nm" style="width:122px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);" />
					</td>
                    <th>DEL</th>
					<td>
						<input name="del" type="text" id="del" style="width:80px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);searchLocNm('del');" maxlength="5" /><!-- 
						--><button class="input_seach_btn" type="button" id="btn_del" name="btn_del" onClick="doWork('btn_del');"></button><!--
						--><input name="del_nm" type="text" id="del_nm" style="width:122px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);" />
					</td>
				</tr>
                   <tr>
                    <th>Carrier</th>
					<td>
						<input name="carrier_cd" type="text" id="carrier_cd" style="width:80px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);searchTlCustInfo('carrier_cd');" maxlength="10" /><!-- 
						--><button class="input_seach_btn" type="button" id="btn_carrier" name="btn_carrier" onClick="doWork('btn_carrier');"></button><!--
						--><input name="carrier_nm" type="text" id="carrier_nm" style="width:122px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);" />
					</td>
					<th>Vessel/Voyage</th>
					<td colspan="3">
						<input name="mvsl_cd" type="text" id="mvsl_cd" style="width:80px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);searchVslNm();" maxlength="10" /><!-- 
						 --><button class="input_seach_btn" type="button" id="btn_vsl" name="btn_vsl" onClick="doWork('btn_vsl');"></button><!-- 
						 --><input name="mvsl_nm" type="text" id="mvsl_nm" style="width:122px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);" maxlength="60"/><!-- 
						 --><input name="voy" type="text" id="voy" style="width:60px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);" maxlength="5" />
					</td>
				</tr>
                   <tr>
					<th>Flight No.</th>
					<td>
					    <input name="flight_no" type="text" id="flight_no" style="width:235px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);" />
					</td>
					<th>Shipper</th>
					<td>				    
						<input name="shp_cd" type="text" id="shp_cd" style="width:80px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);searchTlCustInfo('shp_cd');" maxlength="10" /><!-- 
						 --><button class="input_seach_btn" type="button" id="btn_shipper" name="btn_shipper" onClick="doWork('btn_shipper');"></button><!-- 
						 --><input name="shp_nm" type="text" id="shp_nm" style="width:122px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);"/>
					</td>
					<th>Consignee</th>
					<td>				    
						<input name="cne_cd" type="text" id="cne_cd" style="width:80px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);searchTlCustInfo('cne_cd');" maxlength="10" /><!-- 
						 --><button class="input_seach_btn" type="button" id="btn_consignee" name="btn_consignee" onClick="doWork('btn_consignee');"></button><!-- 
						 --><input name="cne_nm" type="text" id="cne_nm" style="width:122px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);"/>
					</td>
                   </tr>
			</table>
    </div>
</div>
<div class="wrap_result"> 
    <!-- opus_design_grid(S) -->
    <div class="opus_design_grid">
        <script type="text/javascript">comSheetObject('sheet1');</script>
    </div>
</div> 
</form>


<%@include file="/apps/fis/wms/bizcommon/include_common.jsp"%>
