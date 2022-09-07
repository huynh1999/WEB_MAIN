<%--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : WHOutList.jsp
*@FileTitle  : Outbound List
*@author     : Khoa.Nguyen - DOU Network
*@version    : 1.0
*@since      : 2016/05/04
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
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/WMS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="apps/fis/wms/outboundmanagement/script/WHOutList.js?ver=<%=CLT_JS_VER%>"></script>
    
<logic:notEmpty name="EventResponse">
	<bean:define id="valMap" name="EventResponse" property="mapVal"/>
	<bean:define id="bk_sts_cd" name="valMap" property="bk_sts_cd"/>
	<bean:define id="ord_tp_cd" name="valMap" property="ord_tp_cd"/>
	<bean:define id="warehouse" name="valMap" property="warehouse"/>
	
	<!-- #4798 [Korex] WMS View Type Default Option -->
	<bean:define id="vw_tp_cd" name="valMap" property="vw_tp_cd"/>
	
</logic:notEmpty>

<%
//#1700 [WMS4.0] Inbound / Outbound Status 색상 구분
String BG_BOOKED   = "#8BBDFF";
String BG_ALLOCATED= "#E4F7BA";
String BG_PICKED   = "#CEF76E";
String BG_COMPLETE = "#FAED7D";
String BG_CANCEL   = "#FFA7A7";

%>	
	
<script>

//#1700 [WMS4.0] Inbound / Outbound Status 색상 구분
var bgBooked   = "<%=BG_BOOKED %>";
var bgAllocated= "<%=BG_ALLOCATED%>";
var bgPicked   = "<%=BG_PICKED%>";
var bgComplete = "<%=BG_COMPLETE %>";
var bgCancel   = "<%=BG_CANCEL %>";

var ord_tp_cdText = "";
var ord_tp_cdCode = "";

'<logic:notEmpty name="ord_tp_cd">'
	'<logic:iterate id="item" name="ord_tp_cd">'
		ord_tp_cdCode+="|"+'<bean:write name="item" property="code"/>';
		ord_tp_cdText+="|"+'<bean:write name="item" property="name"/>';
	'</logic:iterate>'
	
	ord_tp_cdCode = ord_tp_cdCode.substring(1);
	ord_tp_cdText = ord_tp_cdText.substring(1);
'</logic:notEmpty>'
//<!-- //#1950 WMS4.0 In/outBound Status 관리 개선   completed => Shipped   -->
var bk_sts_cdText = "Booked|Allocated|Picked|Shipped|Canceled";  //<!-- //#1700 [WMS4.0] Inbound / Outbound Status  -->
var bk_sts_cdCode = "I|A|P|X|C";

/* '<logic:notEmpty name="bk_sts_cd">'
	'<logic:iterate id="item" name="bk_sts_cd">'
		bk_sts_cdCode+="|"+'<bean:write name="item" property="code"/>';
		bk_sts_cdText+="|"+'<bean:write name="item" property="name"/>';
	'</logic:iterate>'
	
	bk_sts_cdCode = bk_sts_cdCode.substring(1);
	bk_sts_cdText = bk_sts_cdText.substring(1);
'</logic:notEmpty>'  */

var wh_cdText = "";
var wh_cdCode = "";

'<logic:notEmpty name="warehouse">'
	'<logic:iterate id="item" name="warehouse">'
		wh_cdCode+="|"+'<bean:write name="item" property="wh_cd"/>';
		wh_cdText+="|"+'<bean:write name="item" property="wh_nm"/>';
	'</logic:iterate>'
	
	wh_cdCode = wh_cdCode.substring(1);
	wh_cdText = wh_cdText.substring(1);
'</logic:notEmpty>'

// #4798 [Korex] WMS View Type Default Option
var vw_tp_cdText = "";
var vw_tp_cdCode = "";

'<logic:notEmpty name="vw_tp_cd">'
	'<logic:iterate id="item" name="vw_tp_cd">'
		vw_tp_cdCode+="|"+'<bean:write name="item" property="code"/>';
		vw_tp_cdText+="|"+'<bean:write name="item" property="name"/>';
	'</logic:iterate>'
	
	vw_tp_cdCode = vw_tp_cdCode.substring(1);
	vw_tp_cdText = vw_tp_cdText.substring(1);
'</logic:notEmpty>'

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
	<input type="hidden" name="def_wh_cd" id="def_wh_cd" value="<%=userInfo.getDef_wh_cd()%>" />
	<input type="hidden" name="def_wh_nm" id="def_wh_nm" value="<%=userInfo.getDef_wh_nm()%>" />
	<input type="hidden" name="def_wh_ctrt_no" id="def_wh_ctrt_no" value="<%=userInfo.getDef_wh_ctrt_no()%>" />
	<input type="hidden" name="def_wh_ctrt_nm" id="def_wh_ctrt_nm" value="<%=userInfo.getDef_wh_ctrt_nm()%>" />
	<input type="hidden" name="def_std_unit" id="def_std_unit" value="<%-- <%=userInfo.getDef_std_unit()%> --%>" /> 
 	<input type="hidden" name="f_cmd" value="" />
 	<input type="hidden" name="user_id" id="user_id"  value="<%=userInfo.getUsrid()%>" />
	<input type="hidden" name="pageurl" id="pageurl" value="WHOutList.clt"/>
	<div class="page_title_area clear">
		<!-- page_title(S) -->
		<h2 class="page_title" id='bigtitle'><button type="button"><span><%=LEV3_NM%></span></button></h2>
		<!-- page_title(E) -->
		<!-- opus_design_btn(S) -->
		<div class="opus_design_btn TOP">
			<button type="button" 	class="btn_accent" 	name="btn_search" 		id="btn_search" 	<%= null != roleBtnVO? "style='display:none;' btnAuth='" + roleBtnVO.getAttr1() + "'"  : "" %>		onclick="doWork('SEARCHLIST')"><bean:message key="Search"/></button><!-- 
		 --><button type="button"   class="btn_normal" 	name="btn_new" 			id="btn_new"		<%= null != roleBtnVO? "style='display:none;' btnAuth='" + roleBtnVO.getAttr2() + "'"  : "" %>		onclick="doWork('NEW')" 		><bean:message key="New"/></button><!-- 
		 --><button type="button" 	class="btn_normal" 	name="allocComplete"	id="allocComplete" 	<%= null != roleBtnVO? "style='display:none;' btnAuth='ALLOCATION'" : "" %> onClick="allocCmplPopup();"><bean:message key="AllocComplete"/></button><!-- 
		 --><%-- <button type="button" 	class="btn_normal" 	name="link_Wave" 		id="link_Wave" 		<%= null != roleBtnVO? "style='display:none;' btnAuth='WAVE'"  : "" %>								onclick="doWork('link_Wave')" 	><bean:message key="Wave"/></button> --%><!-- 
		 --><button type="button" 	class="btn_normal" 	name="btn_excel" 		id="btn_excel" 		<%= null != roleBtnVO? "style='display:none;' btnAuth='" + roleBtnVO.getAttr6() + "'"  : "" %>		onclick="doWork('EXCEL')"><bean:message key="Excel"/></button>
		</div>
		<!-- opus_design_btn(E) -->
		<!-- page_location(S) -->
	 	<div class="location">
		   <span><%=LEV1_NM%></span> &gt;
		   <span><%=LEV2_NM%></span> &gt;
		   <span><%=LEV3_NM%></span>
	   	</div>
		<!-- page_location(E) -->
	</div>
<div class="over_wrap">	
	<div class="wrap_search">
	 	<div class="opus_design_inquiry entry_pannel">
			<table>
				<colgroup>
					<col width="50" />
					<col width="250" />
					<col width="50" />
                    <col width="320" />
					<col width="50" />
					<col width="280" />
					<col width="50" />
					<col width="*" />
				</colgroup>
				<tr>
					<th><bean:message key="Warehouse"/></th>
					<td>
						<select name="wh_cd" id="wh_cd" class="search_form" style="width: 200px;" required>
                			<logic:notEmpty name ="valMap" property="warehouse">                      	
								<logic:iterate id="item" name="warehouse">
		                        	<option value='<bean:write name="item" property="wh_cd"/>'><bean:write name="item" property="wh_nm"/></option>
		                        </logic:iterate>
	                        </logic:notEmpty>
						</select>					
					</td>
					<th><bean:message key="Contract_No"/></th>
					<td>
						<input name="ctrt_no" id="ctrt_no" type="text" style="width:80px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" otherchar="-_" onBlur="strToUpper(this);getCtrtInfo(this);" maxlength="10" OnKeyDown="if(event.keyCode==13){getCtrtInfo(this);}"/><!-- 						
						 --><button type="button" name="btn_ctrt_no" id="btn_ctrt_no" class="input_seach_btn" tabindex="-1" onClick="doWork('btn_ctrt_no');"></button><!-- 
						 --><input name="ctrt_nm" id="ctrt_nm" type="text" style="width:150px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);" onKeyDown="if(event.keyCode==13){get_ctrt_no('EnterK');}"/>
					</td>
					<th><bean:message key="Order_Type"/></th>
					<td>
						<select name="ord_tp_cd" id="ord_tp_cd" class="search_form" style="width: 120px;">
						</select>
					</td>
					<th><bean:message key="View_Type"/></th>
					<td>
						<select name="vw_tp_cd" id="vw_tp_cd" class="search_form" style="width: 120px;" onchange="changeViewType();">
						</select>
					</td>                      
				</tr>				
                <tr>
                	<th>
						<select name="cond_tp_no" id="cond_tp_no" class="search_form" style="width: 90px;">
						</select>
					</th>
					<td>
						<input name="cond_no" type="text" id="cond_no" style="ime-mode:disabled;text-transform:uppercase;width: 200px;"  dataformat="excepthan" onBlur="strToUpper(this);" onKeyDown="if(event.keyCode==13){doWork('SEARCHLIST');}"/>
					</td>
					<th><bean:message key="Status"/></th>
					<td>
						<select name="bk_sts_cd" id="bk_sts_cd" class="search_form" style="width: 109px;">
						</select>
					</td>  
					<th>
						<select name="cond_tp_date" id="cond_tp_date" class="search_form" style="width: 109px;">
						</select>
					</th> 
					<td>
						<input name="cond_fm_date" id="cond_fm_date" type="text"  maxlength="10" style="width:80px;" 
						onblur="chkCmprPrd(firCalFlag, false, this, this, form.cond_to_date);firCalFlag=false;" 
						onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};"
						onkeypress="onlyNumberCheck();" onblur="mkDateFormatType(this, event, true,1)"/><span class="dash">~</span><!--
						--><input name="cond_to_date" id="cond_to_date" type="text"  maxlength="10" style="width:80px;" 
						onblur="chkCmprPrd(firCalFlag, false, this, form.cond_fm_date, this);firCalFlag=false;" 
						onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};"
						onkeypress="onlyNumberCheck();" onblur="mkDateFormatType(this, event, true,1)"/><!--
						--><button class="calendar" tabindex="-1" type="button" name="btn_cond_to_date" id="btn_cond_to_date" onClick="doWork('btn_cond_to_date');"></button>
					</td> 
				</tr>
                <tr>
					<th><bean:message key="SKU"/></th>
					<td>
						<input name="item_cd" id = "item_cd" type="text" dataformat="engup" otherchar = "<%=WMS_OTHER_CHAR%>" onBlur="strToUpper(this);" onKeyDown="if(event.keyCode==13){doWork('SEARCHLIST');}" style="ime-mode:disabled;text-transform:uppercase;width: 200px;" maxlength="20" />
					</td>
					<th>
						<select name="ship_to_tp" id="ship_to_tp" class="search_form" style="width: 100px;" onchange="ship_to_tp_OnChange(this.value);">
						</select>
					</th> 
					<td>
						<div id="divBuyerAddr" style="display:none">
							<input name="buyer_addr" id = "buyer_addr" type="text" style="ime-mode:disabled;text-transform:uppercase;width: 263px;" dataformat="excepthan" onBlur="strToUpper(this);" onKeyDown="if(event.keyCode==13){doWork('SEARCHLIST');}"/>
						</div>
						<div id="divBuyerCode">
							<input name="buyer_cd" id="buyer_cd" type="text" style="width:80px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" otherchar="-_" onBlur="strToUpper(this);getCustInfo(this);" maxlength="10" onchange="getCustInfo(this)"/><!-- 						
							 --><button type="button" name="btn_buyer_cd" id="btn_buyer_cd" class="input_seach_btn" tabindex="-1" onClick="doWork('btn_buyer_cd');"></button><!-- 
							 --><input name="buyer_nm" id="buyer_nm" type="text" style="width:150px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);" onKeyDown="if(event.keyCode==13){doWork('btn_buyer_cd');}"/>
						</div>												
					</td>
					<th><bean:message key="Unit_of_Search"/></th>
					<td>
						<select name="search_tp" id="search_tp" class="search_form" style="width: 120px;" onchange="search_tp_OnChange(this.value)">
						</select>
					</td>
				</tr>		
				<tr>
					<th><bean:message key="Item_Lot"/></th>
					<td>
						<input name="lot_no" id = "lot_no" type="text" dataformat="excepthan" onBlur="strToUpper(this);" onKeyDown="if(event.keyCode==13){doWork('SEARCHLIST');}" style="ime-mode:disabled;text-transform:uppercase;width: 200px;" maxlength="20" />
					</td>
					<th>
						<select name="ref_tp" id="ref_tp" class="search_form" style="width: 100px;">
						</select>
					</th>
					<td>
						<input name="ref_no" id = "ref_no" type="text" dataformat="excepthan" onBlur="strToUpper(this);" onKeyDown="if(event.keyCode==13){doWork('SEARCHLIST');}" style="ime-mode:disabled;text-transform:uppercase;width: 263px;" maxlength="100"/>
					</td>
					<th><bean:message key="Unit_of_Measure"/></th>
					<td>
						<select name="measure_tp" id="measure_tp" class="search_form" style="width: 120px;" onchange="measure_tp_OnChange(this.value)">
						</select>
					</td>
				</tr>
			</table>
		</div>
	</div>
	<div class="wrap_result">
		<div class="opus_design_grid">
			<!-- //#1700 [WMS4.0] Inbound / Outbound Status 색상 구분 start -->
			<div class="layout_vertical_3">
				<table class = "sm">
					<tr height="20" >
						<th width="150" class="table_search_head" id="stAll" style="cursor:pointer"> <!-- #1940 [WMS4.0] Inbound / Outbound Status 색상 구분 이후 추가 개선 사항 -->
						   <bean:message key="Current_Status_BG_Color"/>
						</th>
						 
						<th bgcolor="<%=BG_BOOKED %>" width="80" class="table_search_head" id="stBooked" style="cursor:pointer"> <!-- #1940 [WMS4.0] Inbound / Outbound Status 색상 구분 이후 추가 개선 사항 -->
						   Booked
						</th>
	                    <th bgcolor="<%=BG_ALLOCATED %>" width="80" class="table_search_head" id="stAllocated" style="cursor:pointer"> <!-- #1940 [WMS4.0] Inbound / Outbound Status 색상 구분 이후 추가 개선 사항 -->
	                    	Allocated
	                    </th>
	                    <th bgcolor="<%=BG_PICKED %>" width="80" class="table_search_head" id="stPicked" style="cursor:pointer"> <!-- #1940 [WMS4.0] Inbound / Outbound Status 색상 구분 이후 추가 개선 사항 -->
	                    	Picked
	                    </th>						
						<th bgcolor="<%=BG_COMPLETE %>" width="80" class="table_search_head" id="stComplete" style="cursor:pointer"> <!-- #1940 [WMS4.0] Inbound / Outbound Status 색상 구분 이후 추가 개선 사항 -->
						   Shipped <!-- //#1950 WMS4.0 In/outBound Status 관리 개선   Completed => Shipped  -->
						</th>
						<th bgcolor="<%=BG_CANCEL %>" width="80" class="table_search_head" id="stCancel" style="cursor:pointer"> <!-- #1940 [WMS4.0] Inbound / Outbound Status 색상 구분 이후 추가 개선 사항 -->
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
<script type="text/javascript">
	var attr_extension = "<%= null!=roleBtnVO ?roleBtnVO.getAttr_extension():"" %>";
	doBtnAuthority(attr_extension);
</script>