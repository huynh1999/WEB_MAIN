<%--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : WHInBkList.jsp
*@FileTitle  : Inbound Booking Search
*@author     : Bao.Huynh - DOU Network
*@version    : 1.0
*@since      : 2015/04/16
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
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="./apps/fis/wms/whinbooking/script/WHInBkList.js?ver=<%=CLT_JS_VER%>"></script>
<%
String loc_cd 		= "";
String loc_nm 		= "";

String DEF_WH_CTRT_NO   = userInfo.getDef_wh_ctrt_no()== null?"":userInfo.getDef_wh_ctrt_no();
String DEF_WH_CTRT_NM   = userInfo.getDef_wh_ctrt_nm()== null?"":userInfo.getDef_wh_ctrt_nm();
String DEF_WH_CD		= userInfo.getDef_wh_cd()== null?"":userInfo.getDef_wh_cd();
String DEF_WH_NM		= userInfo.getDef_wh_nm()== null?"":userInfo.getDef_wh_nm();

try {
	loc_cd  	= request.getParameter("loc_cd")== null?"":request.getParameter("loc_cd");
	loc_nm  	= request.getParameter("loc_nm")== null?"":request.getParameter("loc_nm");
}catch(Exception e) {
	out.println(e.toString());
}
%>
<bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
<bean:define id="ord_tp_cd" name="cdMap" property="ord_tp_cd"/>
<bean:define id="warehouse" name="cdMap" property="warehouse"/>
<script language="javascript">    
	var ord_tp_cdCode = "";
	var ord_tp_cdText = "";
   <logic:iterate id="codeVO" name="ord_tp_cd">
	    ord_tp_cdCode+= '<bean:write name="codeVO" property="code"/>' + '|';
	    ord_tp_cdText+= '<bean:write name="codeVO" property="name"/>' + '|';
   </logic:iterate>
   
</script>

<script type="text/javascript">
	function setupPage(){
		var errMessage = "";
		if (errMessage.length >= 1) {
			ComShowMessage(errMessage);
		} // end if
		loadPage(true);
	}
	var warehouseCode = "";
	var warehouseText = "";
    <logic:iterate id="WhVO" name="warehouse">
	    warehouseCode+= '<bean:write name="WhVO" property="wh_cd"/>' + '|';
	    warehouseText+= '<bean:write name="WhVO" property="wh_nm"/>' + '|';
    </logic:iterate>
</script>
    

<form id="form" name="form">

<input type="hidden" id="f_cmd" name="f_cmd" value="0"/> 
<input type="hidden" name="user_id" value="<%=userInfo.getUsrid()%>" />
<input type="hidden" name="org_cd" value="<%=userInfo.getOfc_cd()%>" />
<input type="hidden" name="def_wh_cd" value="<%=DEF_WH_CD%>" />
<input type="hidden" name="def_wh_ctrt_no" value="<%=DEF_WH_CTRT_NO%>" />
<input type="hidden" name="def_wh_ctrt_nm" value="<%=DEF_WH_CTRT_NM%>" />
<input type="hidden" name="wh_list_ath" value="<%=userInfo.getWh_list_ath()%>" /> <!-- Get list warehouse from TB_SEQ table -->
<input type="hidden" name="wh_cfg" value="<%=userInfo.getWh_cfg()%>" /> <!-- Get list warehouse from TB_USR table --> 
<input type="hidden" name="pageurl" id="pageurl" value="WHInBkList.clt"/>
<div class="page_title_area clear">
		<!-- page_title(S) -->
		<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
		<!-- page_title(E) -->
		<!-- opus_design_btn(S) -->
		<div class="opus_design_btn TOP">
<%-- 			<button type="button" class="btn_accent" name="btn_Search" id="btn_Search" onClick="doWork('SEARCHLIST');" style="display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>"><bean:message key="Search"/></button><!-- 
			 --><button type="button"  class="btn_normal" name="btn_Excel" id="btn_Excel" onClick="doWork('EXCEL');" style="display:none;" btnAuth="<%= roleBtnVO.getAttr6() %>"><bean:message key="Excel"/></button><!-- 
			 --><button type="button" btnAuth="INBOUND_COMPLETE" class="btn_normal" name="btn_whicMgmt" id="btn_whicMgmt" onClick="doWork('btn_whicMgmt');" style="display:none;" ><bean:message key="Inbound_Complete"/></button>
 --%>		</div>
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
	<div class="wrap_search">
		<div class="opus_design_inquiry entry_pannel ">
			<table>
				<colgroup>
					<col width="50">
					<col width="190">
					<col width="185">
					<col width="150">
					<col width="185">
					<col width="*">
				</colgroup>
				<tbody>
					<tr>
						<th><bean:message key="Warehouse"/></th>
						<td><select name="warehouse" id="warehouse" style="width: 160px;" required onchange="check_authority_wh();">
							<option value="ALL"></option>
							</select>
						</td>
						<th><bean:message key="Contract_No1"/></th>
						<td><input name="ctrt_no" id="ctrt_no" value="<%=DEF_WH_CTRT_NO%>" type="text" class="L_input" style="width:75px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" otherchar="-_" onBlur="strToUpper(this);getCtrtInfo(this);" maxlength="10" OnKeyDown="if(event.keyCode==13){getCtrtInfo(this);}"/><!-- 
							 --><button type="button" name="btn_ctrt_no" id="btn_ctrt_no" class="input_seach_btn" tabindex="-1" onClick="doWork('btn_ctrt_no');"></button><!-- 
							 --><input name="ctrt_nm" id="ctrt_nm" value="<%=DEF_WH_CTRT_NM%>" type="text" class="L_input" style="width:115px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" otherchar = " ()-_" onBlur="strToUpper(this);" onKeyDown="if(event.keyCode==13){CtrtPopup();}"/>
						</td>
						<th><bean:message key="Order_Type"/></th>
						<td><select name="ord_tp_cd" id="ord_tp_cd" style="width: 120px;" class="search_form"></select></td>
					</tr>
					<tr>
						<th><bean:message key="Booking_No"/></th>
						<td><input name="wib_bk_no" type="text" class="L_input" id="wib_bk_no" style="width:160px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);" maxlength="14"/></td>
						<th><bean:message key="Booking_Date"/></th>
						<td>	
						<input style="width:90px" type="text" name="fm_bk_date" id="fm_bk_date" class="L_input" style="width:75px;"  maxlength="10" onkeyup="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" 
						onblur="chkCmprPrd(firCalFlag, false, this, this, form.to_bk_date);firCalFlag=false;" onkeypress="onlyNumberCheck();" ><!-- 
							  --><span class="dash">~</span><!--  
							  --><input style="width:89px" type="text" name="to_bk_date" id="to_bk_date" onkeyup="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" 
							  onblur="chkCmprPrd(firCalFlag, false, this, form.fm_bk_date, this);firCalFlag=false;" onkeypress="onlyNumberCheck();"><!-- 
							 --><button type="button" class="calendar" tabindex="-1" name="btn_bk_date_to" id="btn_bk_date_to"  onclick="doDisplay('DATE11', form);"></button>
						</td>
						<th><bean:message key="Status"/></th>
						<td><select name="bk_sts_cd" id="bk_sts_cd" style="width:120px">
								<option value="ALL" selected="selected">ALL</option>
								<option value="N">Booked</option>
								<option value="I" >Issued</option>
								<option value="P">Partial</option>
								<option value="X">Complete</option>
								<option value="C">Cancel</option>
							</select>
						</td>               
					</tr>
					<tr>
						<th><bean:message key="Item_No"/></th>
						<td><input name="item_cd" otherchar = "<%=WMS_OTHER_CHAR%>" id = "item_cd" type="text" class="L_input" style="width:220px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);" maxlength="20"/></td>
						<th><bean:message key="Item_Lot"/></th>
						<td ><input name="lot_no" id = "lot_no" type="text" class="L_input" style="width:223px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);"/></td>
						<th><bean:message key="Reference_No"/></th>
                        <td><input name="ref_no" id = "ref_no" type="text" class="L_input" style="width:215px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);"/></td>
					</tr>
					 <tr>
						<th><bean:message key="Cust_Order_No"/></th>
						<td><input name="cust_ord_no" type="text" class="L_input" id="cust_ord_no" style="width:220px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" otherchar = "<%=WMS_OTHER_CHAR%>"  onBlur="strToUpper(this);"/></td>
						<th><bean:message key="PO_No1"/></th>
						<td><input name="po_no" type="text" class="L_input" id="po_no" style="width:223px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);"/></td>
						<th><bean:message key="CNTR_TR_NO"/></th>
						<td><input name="eq_no" type="text" class="L_input" id="eq_no" style="width:215px;ime-mode:disabled;text-transform:uppercase;" dataformat="etc" onBlur="strToUpper(this);"/></td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	<!-- opus_design_inquiry(E) -->

	<div class="wrap_result">
		<div class="opus_design_grid clear" id="mainTable">
			<script type="text/javascript">comSheetObject('sheet1');</script>
			
		</div>
	</div>
</form>

<%@include file="/apps/fis/wms/bizcommon/include_common.jsp"%>

<script type="text/javascript">
	var attr_extension = "<%= roleBtnVO.getAttr_extension() %>";
	doBtnAuthority(attr_extension);
</script>

