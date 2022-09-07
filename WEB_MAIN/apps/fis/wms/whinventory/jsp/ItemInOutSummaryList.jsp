
<%--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : ItemInOutSummaryList.jsp
*@FileTitle  : IN & OUT Summary
*@author     : Nam.Tran - DOU Network
*@version    : 1.0
*@since      : 2015/04/14
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
    <script type="text/javascript" src="./apps/fis/wms/whinventory/js/ItemInOutSummaryList.js?ver=<%=CLT_JS_VER%>"></script>
	
	<script type="text/javascript" src="./js/common/message/<%=CLT_MSG_PATH%>/WMS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
	
<%

String DEF_WH_CTRT_NO   = userInfo.getDef_wh_ctrt_no()== null?"":userInfo.getDef_wh_ctrt_no();
String DEF_WH_CTRT_NM   = userInfo.getDef_wh_ctrt_nm()== null?"":userInfo.getDef_wh_ctrt_nm();
String DEF_WH_CD		= userInfo.getDef_wh_cd()== null?"":userInfo.getDef_wh_cd();
String DEF_WH_NM		= userInfo.getDef_wh_nm()== null?"":userInfo.getDef_wh_nm();

String loc_cd 		= "";
String loc_nm 		= "";
try {
	loc_cd  	= request.getParameter("loc_cd")== null?"":request.getParameter("loc_cd");
	loc_nm  	= request.getParameter("loc_nm")== null?"":request.getParameter("loc_nm");
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
	 /*Warehouse code  */
	<%boolean isBegin = false; %>
	var WHCDLIST = "";
	var WHNMLIST = "";
	<bean:define id="MsList" name="cdMap" property="warehouse"/>
    <logic:iterate id="WhVO" name="MsList">
    	    <% if(isBegin){ %>
    	    WHCDLIST+= '|';
    	    WHNMLIST+= '|';
	    <% }else{
	          isBegin = true;
 	       } %> 
           WHCDLIST+= '<bean:write name="WhVO" property="wh_cd"/>';
           WHNMLIST+= '<bean:write name="WhVO" property="wh_nm"/>';
    </logic:iterate>
</script>


<form id="form" name="form">

<input type="hidden" id="f_cmd"/>
<input type="hidden" name="out_cnt" value="0" /> 
<input type="hidden" name="user_id" value="<%=userInfo.getUsrid()%>" />
<input type="hidden" name="org_cd" value="<%=userInfo.getOfc_cd()%>" />
<input type="hidden" name="def_wh_cd" id="def_wh_cd" value="<%=DEF_WH_CD%>" />
<input type="hidden" name="def_wh_nm" id="def_wh_nm" value="<%=DEF_WH_NM%>" />
<input type="hidden" name="def_wh_ctrt_no" id="def_wh_ctrt_no" value="<%=DEF_WH_CTRT_NO%>" />
<input type="hidden" name="def_wh_ctrt_nm" id="def_wh_ctrt_nm" value="<%=DEF_WH_CTRT_NM%>" />
<input type="hidden" name="pageurl" id="pageurl" value="ItemInOutSummary.clt"/>
<div class="page_title_area clear">
	<!-- page_title(S) -->
		<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	<!-- page_title(E) -->
	<!-- opus_design_btn(S) -->
	<div class="opus_design_btn TOP">
<%-- 		<button type="button" class="btn_accent" name="btn_Search" id="btn_Search" onClick="doWork('SEARCHLIST');" style="display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>"><bean:message key="Search"/></button><!-- 
		 --><button type="button" class="btn_normal" name="btn_Excel" id="btn_Excel" onClick="doWork('EXCEL');" style="display:none;" btnAuth="<%= roleBtnVO.getAttr6() %>"><bean:message key="Excel"/></button><!-- 
	 --> --%></div>
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

<div class= "over_wrap">
<div class= "wrap_search">
<div class="opus_design_inquiry entry_pannel">
	<table>
		<colgroup>
			<col width="150">
			<col width="180">
			<col width="100">
            <col width="230">
			<col width="170">
			<col width="220">
			<col width="100">
			<col width="*">
		</colgroup>	
		<tbody>		
			<tr>
				<th><bean:message key="Warehouse"/></th>
				<td>
					<bean:define id="MsList" name="cdMap" property="warehouse"/>
					<select name="wh_cd" id="wh_cd" class="search_form" style="width:170px" required>
							<option value=''></option>
						<logic:iterate id="codeVO" name="MsList">
							<option value='<bean:write name="codeVO" property="wh_cd"/>'><bean:write name="codeVO" property="wh_nm"/></option>
						</logic:iterate>
					</select>
				</td>
				<th><bean:message key="Contract_No"/></th>
				<td>
					<input name="ctrt_no" id="ctrt_no" value="<%=DEF_WH_CTRT_NO %>" type="text" class="L_input" style="width:80px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" otherchar="-_" onBlur="strToUpper(this);searchTlCtrtInfo();" maxlength="10" OnKeyDown="if(event.keyCode==13){getCtrtInfo(this);}"/><!-- 
					 --><button type="button" name="btn_ctrt_no" id="btn_ctrt_no" class="input_seach_btn" tabindex="-1" onClick="doWork('btn_ctrt_no');"></button><!-- 						
					 --><input name="ctrt_nm" id="ctrt_nm" value="<%=DEF_WH_CTRT_NM %>" otherchar="-_/,.&@() " type="text" class="L_input" style="width:110px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" otherchar = " ()-_" onBlur="strToUpper(this);" onKeyDown="if(event.keyCode==13){CtrtPopup();}"/>
				</td>
	            <th>
	            	<select id="prop_date_tp" name="prop_date_tp" style="width: 120px;" >
						<option value="INBOUND_DT">Inbound Date</option>
						<option value="OUTBOUND_DT">Outbound Date</option>
						<option value="INOUT_DT">IN&Out Date</option>
						<option value="EXP_DT">Expiration Date</option>
					</select>
	            </th>
				<td>
				    <input name="prop_date_fm" id="prop_date_fm" type="text" required class="L_input" maxlength="10" style="width:80px;"  
				    onkeypress="onlyNumberCheck();" onkeyup="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onblur="chkCmprPrd(firCalFlag, false, this,this, form.prop_date_to);firCalFlag=false;"/><!-- 
				     --><span class="dash">~</span><!-- 
					 --><input name="prop_date_to" id="prop_date_to" type="text" required class="L_input" maxlength="10" style="width:80px;" 
					 onkeypress="onlyNumberCheck();" onkeyup="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onblur="chkCmprPrd(firCalFlag, false, this, form.prop_date_fm,this);firCalFlag=false;"/><!-- 
					 --><button type="button" class="calendar ir" name="btn_prop_date_to" id="btn_prop_date_to" onClick="doWork('btn_prop_date_to');"></button>
				</td>
				<td colspan="2">
					<button type="button" class="btn_etc" name="btn_change_date1" id="btn_change_date1"  onclick="doWork('btn_change_date1')">1<bean:message key="Week"/></button><!-- 
					 --><button type="button" class="btn_etc" name="btn_change_date2" id="btn_change_date2" onclick="doWork('btn_change_date2')"><bean:message key="HMonth"/></button><!-- 
					 --><button type="button" class="btn_etc" name="btn_change_date3" id="btn_change_date3" onclick="doWork('btn_change_date3')">1<bean:message key="Month"/></button>
				</td>
			</tr>	
			<tr>
				<th>
					<select id="prop_bk_tp" name="prop_bk_tp" style="width: 135px;" >
						<option value="IN_BK_NO">In Booking No.</option>
						<option value="OUT_BK_NO">Out Booking No.</option>
						<option value="IN_CUS_NO">In Cust Order No.</option>
						<option value="OUT_CUS_NO">Out Cust Order No.</option>
						<option value="IN_REF_NO">In Reference No.</option>
						<option value="OUT_REF_NO">Out Reference No.</option>
					</select>
				</th>
				<td><input name="prop_bk_no" id="prop_bk_no" otherchar="()_\-,.& " type="text" class="L_input" style="width:170px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);" maxlength="100"/></td>
<!-- 				//#5899 [OceanBlue-WMS] WMS inventory by Item Name -->
				<th>
					<select id="item_type" name="item_type">
						<option value="ITEM_CD"><bean:message key="Item_Code"/></option>
						<option value="ITEM_NM"><bean:message key="Item_Name"/></option>
					</select>
				</th>
				<td><input name="item_cd" otherchar = "<%=WMS_OTHER_CHAR%>" id = "item_cd" type="text" class="L_input" style="width:223px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);" maxlength="20"/></td>
				<th><bean:message key="Inventory_by"/></th>
				<td>
					<select id="inv_by_tp" name="inv_by_tp" style="width:120px;" onchange="inv_by_tp_OnChange(this,this.value);">
						<option value="ITEM">By Item</option>
						<option value="LOT">By Lot</option>
					</select>
				</td>
				<th>
					<select id="prop_no_tp" name="prop_no_tp" style="width: 120px;display: none;">
						<option value="LOT_NO">Item Lot No.</option>
						<option value="LOT_ID">Lot ID</option>
						<option value="LOT_04">Lot 04</option>
						<option value="LOT_05">Lot 05</option>
					</select>
				</th>
				<td >
					<input name="prop_no" type="text" class="L_input" id="prop_no"  style="width:204px;ime-mode:disabled;text-transform:uppercase;display: none;" dataformat="engup" otherchar = "<%=WMS_OTHER_CHAR%>" onBlur="strToUpper(this);" maxlength="20"/>
				</td>
			</tr>
		</tbody>
	</table>
</div>
</div>

<div class="wrap_result">
	<div class="opus_design_grid clear">
	<!-- opus_design_grid(S) -->
		<script type="text/javascript">comSheetObject('sheet1');</script>
	</div>
</div>
</div>
</form>

<script type="text/javascript">
var attr_extension = "<%= roleBtnVO.getAttr_extension() %>";
doBtnAuthority(attr_extension);
</script>