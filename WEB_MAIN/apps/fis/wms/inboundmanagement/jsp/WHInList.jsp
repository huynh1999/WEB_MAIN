<%--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : WHInList.jsp
*@FileTitle  : Inbound Search
*@author     : Tien.Duong - DOU Network
*@version    : 1.0
*@since      : 2016/08/31
=========================================================--%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/ModalCalendar.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/WMS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="./apps/fis/wms/inboundmanagement/script/WHInList.js?ver=<%=CLT_JS_VER%>"></script>
<%


String req_search_no   = "";
String req_search_tp   = "";
String DEF_WH_CTRT_NO   = userInfo.getDef_wh_ctrt_no()== null?"":userInfo.getDef_wh_ctrt_no();
String DEF_WH_CTRT_NM   = userInfo.getDef_wh_ctrt_nm()== null?"":userInfo.getDef_wh_ctrt_nm();
String DEF_WH_CD		= userInfo.getDef_wh_cd()== null?"":userInfo.getDef_wh_cd();
String DEF_WH_NM		= userInfo.getDef_wh_nm()== null?"":userInfo.getDef_wh_nm();

try {
	req_search_no   = request.getParameter("search_no")== null?"":request.getParameter("search_no");
	req_search_tp   = request.getParameter("search_tp")== null?"":request.getParameter("search_tp");
	
}catch(Exception e) {
	out.println(e.toString());
}	

//#1700 [WMS4.0] Inbound / Outbound Status 색상 구분
String BG_BOOKED   = "#8BBDFF";
String BG_COMPLETE = "#FAED7D";
String BG_CANCEL   = "#FFA7A7";

%>

<bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
<bean:define id="ord_tp_cd" name="cdMap" property="ord_tp_cd"/>
<bean:define id="warehouse" name="cdMap" property="warehouse"/>

<!-- #4798 [Korex] WMS View Type Default Option -->
<bean:define id="vw_tp_cd" name="cdMap" property="vw_tp_cd"/>

<script language="javascript">    
	var ord_tp_cdCode = "";
	var ord_tp_cdText = "";
   <logic:iterate id="codeVO" name="ord_tp_cd">
	    ord_tp_cdCode+= '<bean:write name="codeVO" property="code"/>' + '|';
	    ord_tp_cdText+= '<bean:write name="codeVO" property="name"/>' + '|';
   </logic:iterate>
   
	// #4798 [Korex] WMS View Type Default Option
	var vw_tp_cdCode = "";
	var vw_tp_cdText = "";
   <logic:iterate id="codeVO" name="vw_tp_cd">
	   vw_tp_cdCode+= '<bean:write name="codeVO" property="code"/>' + '|';
	   vw_tp_cdText+= '<bean:write name="codeVO" property="name"/>' + '|';
   </logic:iterate>
   
	//#1700 [WMS4.0] Inbound / Outbound Status 색상 구분
   var bgBooked   = "<%=BG_BOOKED %>";
   var bgComplete = "<%=BG_COMPLETE %>";
   var bgCancel   = "<%=BG_CANCEL %>";
   
</script>
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
<input type="hidden" name="req_search_no" id="req_search_no"	value="<%=req_search_no%>" />
<input type="hidden" name="req_search_tp" id="req_search_tp"	value="<%=req_search_tp %>" />
<input type="hidden" name="def_wh_cd" id="def_wh_cd" value="<%=DEF_WH_CD%>" />
<input type="hidden" name="def_wh_nm" id="def_wh_nm" value="<%=DEF_WH_NM%>" />
<input type="hidden" name="def_wh_ctrt_no" id="def_wh_ctrt_no" value="<%=DEF_WH_CTRT_NO%>" />
<input type="hidden" name="def_wh_ctrt_nm" id="def_wh_ctrt_nm" value="<%=DEF_WH_CTRT_NM%>" />
<input type="hidden" name="def_std_unit" id="def_std_unit" value="<%-- <%=userInfo.getDef_std_unit()%> --%>" /> 
<input type="hidden" name="user_id" id="user_id"  value="<%=userInfo.getUsrid()%>" />
<input type="hidden" name="pageurl" id="pageurl" value="WHInList.clt"/>
<input type="hidden" id="f_cmd"/>
<div class="page_title_area clear">
	<!-- page_title(S) -->
	<h2 class="page_title"><button type="button"><span id="bigtitle"><%=LEV3_NM%></span></button></h2>
	<!-- page_title(E) -->
	<!-- opus_design_btn(S) -->
	<div class="opus_design_btn TOP">
		<button type="button" <%= null != roleBtnVO? "style='display:none;' btnAuth='" + roleBtnVO.getAttr1() + "'"  : "" %> class="btn_accent" name="btn_Search" id="btn_Search" onClick="doWork('SEARCHLIST');" ><bean:message key="Search"/></button>
		<button type="button" <%= null != roleBtnVO? "style='display:none;' btnAuth='" + roleBtnVO.getAttr2() + "'"  : "" %>  class="btn_normal" name="btn_New" id="btn_New" onClick="doWork('NEW');" ><bean:message key="New"/></button> 
		<button type="button" <%= null != roleBtnVO? "style='display:none;' btnAuth='" + roleBtnVO.getAttr6() + "'"  : "" %>  class="btn_normal" name="btn_Excel" id="btn_Excel" onClick="doWork('EXCEL');" ><bean:message key="Excel"/></button>
	</div>
	<!-- opus_design_btn(E) -->
	<!-- page_location(S) -->
	<div class="location">
	   <span><%=LEV1_NM%></span> &gt;
	   <span><%=LEV2_NM%></span> &gt;
	   <span><%=LEV3_NM%></span>
	   <a href="" class="ir">URL Copy</a>
   </div>
	<!-- page_location(E) -->
</div>
<!-- opus_design_inquiry(S) -->
<div class="over_wrap">
	<div class="wrap_search">
		<div class="opus_design_inquiry entry_pannel ">
			<table>
				<colgroup>
					<col width="50">
					<col width="190">
					<col width="185">
					<col width="150">
					<col width="185">
					<col width="250">
					<col width="100">
					<col width="*">
				</colgroup>
				<tbody>
					<tr>
						<th><bean:message key="Warehouse"/></th>
						<td>
							<bean:define id="warehouse" name="cdMap" property="warehouse"/>
								<select name="wh_cd" id="wh_cd" style="width: 190px;" required>
									<logic:iterate id="WhVO" name="warehouse">
										<option value='<bean:write name="WhVO" property="wh_cd"/>'><bean:write name="WhVO" property="wh_nm"/></option>
									</logic:iterate>
								</select>
							</select>
						</td>
						<th><bean:message key="Contract_No1"/></th>
						<td><input name="ctrt_no" id="ctrt_no" value="<%=DEF_WH_CTRT_NO%>" type="text" style="width:80px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" otherchar="-_" onBlur="strToUpper(this);getCtrtInfo2(this);" maxlength="10"/><!-- 
							 --><button type="button" class="input_seach_btn" name="btn_ctrt_no" id="btn_ctrt_no" tabindex="-1" onClick="doWork('btn_ctrt_no');"></button><!-- 
							 --><input name="ctrt_nm" id="ctrt_nm" value="<%=DEF_WH_CTRT_NM%>" type="text" style="width:115px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" otherchar = " ()-_" onBlur="strToUpper(this);" onKeyDown="if(event.keyCode==13){get_ctrt_no('EnterK');}"/>
						</td>
						<th><bean:message key="Order_Type"/></th>
						<td><bean:define id="ord_tp_cd" name="cdMap" property="ord_tp_cd"/>
							<select name="ord_tp_cd" id="ord_tp_cd">
								<option value="ALL">ALL</option>
								<logic:iterate id="codeVO" name="ord_tp_cd">
									<option value='<bean:write name="codeVO" property="code"/>'><bean:write name="codeVO" property="name"/></option>
								</logic:iterate>
							</select>
						</td>
						<th><bean:message key="View_Type"/></th>
						<td><bean:define id="vw_tp_cd" name="cdMap" property="vw_tp_cd"/>
							<select name="vw_tp_cd" id="vw_tp_cd" class="search_form" style="width: 120px;" onchange="changeViewType();">
								<logic:iterate id="codeVO" name="vw_tp_cd">
									<option value='<bean:write name="codeVO" property="code"/>'><bean:write name="codeVO" property="name"/></option>
								</logic:iterate>
							</select>
						</td> 
					</tr>
					<tr>
						<th><select name="search_in_bk" id="search_in_bk" style="width: 90px;">
							<option value="CUST_ORD_NO">Order No.</option>
							<option value="WIB_BK_NO">Booking No.</option>
							</select>
						</th>
						<td><input name="search_no" type="text" otherchar="," id="search_no" style="width:190px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);" onKeyDown="if(event.keyCode==13){doWork('SEARCHLIST');}"/></td>
						<th><bean:message key="Status"/></th>
						<td><select name="bk_sts_cd" id="bk_sts_cd" style="width:80px">
								<option value="ALL" selected="selected">ALL</option>
								<option value="I">Booked</option>
								<!-- //#1950 WMS4.0 In/outBound Status 관리 개선   Completed => Received  -->
								<option value="X">Received</option> <!-- //#1700 [WMS4.0] Inbound / Outbound Status  -->
								<option value="C">Canceled</option>  <!-- //#1700 [WMS4.0] Inbound / Outbound Status  -->
							</select>
						</td> 
						<th><select name="search_tp_dt" id="search_tp_dt" style="width: 105px;">
							<option value="BK_DATE">Booking Date</option>
							<option value="EST_IN_DT">Estimated Date</option>
							<option value="INBOUND_DT">Inbound Date</option>
							</select>
						</th>
						<td><input style="width:80px" type="text" name="fm_bk_date" id="fm_bk_date" style="width:80px;" dataformat="mdy" maxlength="10" onkeyup="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" 
								onblur="chkCmprPrd(firCalFlag, false, this, this, form.to_bk_date);firCalFlag=false;" onkeypress="onlyNumberCheck();" ><!-- 
							  --><span class="dash">~</span><!--  
							  --><input style="width:80px" type="text" name="to_bk_date" id="to_bk_date" onkeyup="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" 
							  	onblur="chkCmprPrd(firCalFlag, false, this, form.fm_bk_date, this);firCalFlag=false;" onkeypress="onlyNumberCheck();"><!-- 
							 --><button type="button" class="calendar" tabindex="-1" name="btn_bk_date_to" id="btn_bk_date_to"  onclick="doWork('btn_fm_to_date');"></button>
						</td>
					</tr>
					<tr>
						<th><bean:message key="SKU"/></th>
						<td><input name="item_cd" otherchar = "<%=WMS_OTHER_CHAR%>" id = "item_cd" type="text" style="width:190px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);" maxlength="20" onKeyDown="if(event.keyCode==13){doWork('SEARCHLIST');}"/></td>
						<th><bean:message key="Inbound_Location"/></th>
						<td><input name="wh_loc_nm" id = "wh_loc_nm" type="text" style="ime-mode:disabled;text-transform:uppercase;width:194px" dataformat="excepthan" onBlur="strToUpper(this);getInboundLocInfo('c')" OnKeyDown="if(event.keyCode==13){locPopup();}"/><!-- 
							 --><button type="button" class="input_seach_btn" tabindex="-1" name="btn_wh_loc_cd" id="btn_wh_loc_cd" onClick="doWork('btn_wh_loc_cd');"></button><!-- 
							 --><input type="hidden" id="wh_loc_cd" name="wh_loc_cd" /><!-- 
							 --><input type="hidden" id="wh_loc_nm_org" name="wh_loc_nm_org" />
						</td>
						<th><bean:message key="Unit_of_Measure"/></th>
						<td><select name="measure_tp" id="measure_tp" onchange="measure_tp_OnChange(this.value)" style="width: 80px;" >
								<option value="KGS">KGS</option>
								<option value="LBS">LBS</option>
								<option value="ALL" selected="selected">ALL</option>
							</select>
						</td>
					</tr>
					 <tr>
						<th><bean:message key="Item_Lot"/></th>
						<td><input name="lot_no" id = "lot_no" type="text" dataformat="etc" style="ime-mode:disabled; text-transform:uppercase;width:190px" maxlength="20" onblur="strToUpper(this);" onKeyDown="if(event.keyCode==13){doWork('SEARCHLIST');}"/></td>
						<th><select name="ref_tp" id="ref_tp" style="width: 100px;" >
							<option value="REF_NO">Reference No.</option>
							<option value="MBL_NO">M B/L No.</option>
							<option value="HBL_NO">H B/L No.</option>
							<option value="PO_NO">PO No.</option>
							</select>
						</th>
						<td colspan="3"><input name="ref_no" id = "ref_no" type="text" dataformat="etc" style="ime-mode:disabled; text-transform:uppercase;width:223px" maxlength="100" onblur="strToUpper(this);" onKeyDown="if(event.keyCode==13){doWork('SEARCHLIST');}" /></td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	<!-- opus_design_inquiry(E) -->
	<div class="wrap_result">
		<div class="opus_design_grid clear" id="mainTable">
			<!-- //#1700 [WMS4.0] Inbound / Outbound Status 색상 구분 start -->
			<div class="layout_vertical_3">
				<table class = "sm">
					<tr height="20" >
						<th width="150" class="table_search_head" id="stAll" style="cursor:pointer"> <!-- #1940 [WMS4.0] Inbound / Outbound Status 색상 구분 이후 추가 개선 사항 -->
						   <bean:message key="Current_Status_BG_Color"/>
						</th>
						 
						<th bgcolor="<%=BG_BOOKED %>" width="70" class="table_search_head" id="stBooked" style="cursor:pointer"> <!-- #1940 [WMS4.0] Inbound / Outbound Status 색상 구분 이후 추가 개선 사항 -->
						   Booked
						</th>
						<th bgcolor="<%=BG_COMPLETE %>" width="70" class="table_search_head" id="stComplete" style="cursor:pointer"> <!-- #1940 [WMS4.0] Inbound / Outbound Status 색상 구분 이후 추가 개선 사항 -->
						   Received   <!-- //#1950 WMS4.0 In/outBound Status 관리 개선   Completed => Received  -->
						</th>
						<th bgcolor="<%=BG_CANCEL %>" width="70" class="table_search_head" id="stCancel" style="cursor:pointer"> <!-- #1940 [WMS4.0] Inbound / Outbound Status 색상 구분 이후 추가 개선 사항 -->
						   Canceled
						</th>
					</tr>
				</table>  			
			</div>
			<!-- //#1700 [WMS4.0] Inbound / Outbound Status 색상 구분 end -->
			<div class="opus_design_btn">  
				<button type="button" class="btn_normal" id="sheet1_btn_show" name="sheet1_btn_show" onClick="doWork('sheet1_btn_show');">>></button><!-- 
			 --><button type="button" class="btn_normal" id="sheet1_btn_hide" name="sheet1_btn_hide" onClick="doWork('sheet1_btn_hide');" style="display: none;"><<</button>
			</div>
			<div style="overflow:hidden">
			<script type="text/javascript">comSheetObject('sheet1');</script>
			</div>
		</div>
	</div>
</div>
</form>

<%@include file="/apps/fis/wms/bizcommon/include_common.jsp"%>
<script type="text/javascript">
	var attr_extension = "<%= null!=roleBtnVO ?roleBtnVO.getAttr_extension():"" %>";
	doBtnAuthority(attr_extension);
</script>
