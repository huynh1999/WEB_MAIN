
<%--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : DailyClosing.jsp
*@FileTitle  : Daily Closing
*@author     : Long.Le
*@version    : 1.0
*@since      : 2015/04/17
=========================================================--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoFormControl.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/ModalCalendar.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="./apps/fis/wms/whclosing/script/DailyClosing.js?ver=<%=CLT_JS_VER%>"></script>
	
 	<script type="text/javascript" src="./js/common/message/<%=CLT_MSG_PATH%>/WMS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
<%
String DEF_WH_CTRT_NO   = request.getParameter("Def_wh_ctrt_no")== null?"":request.getParameter("Def_wh_ctrt_no");
String DEF_WH_CTRT_NM   = request.getParameter("Def_wh_ctrt_nm")== null?"":request.getParameter("Def_wh_ctrt_nm");
String DEF_WH_CD		= request.getParameter("Def_wh_cd")== null?"":request.getParameter("Def_wh_cd");
String DEF_WH_NM		= request.getParameter("Def_wh_nm")== null?"":request.getParameter("Def_wh_nm");
String wh_nm = "";
String ctrt_nm = "";
String loc_cd 		= "";
String loc_nm 		= "";
String wh_cd 		= "";
String ctrt_no 		= "";
String prop_date_fm 		= "";
String prop_date_to 		= "";
try {
	loc_cd  	= request.getParameter("loc_cd")== null?"":request.getParameter("loc_cd");
	loc_nm  	= request.getParameter("loc_nm")== null?"":request.getParameter("loc_nm");
}catch(Exception e) {
	out.println(e.toString());
}

%>
<bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
<script> 
	var WHCDLIST1 = '';
	var WHCDLIST2 = '';
	<%boolean isBegin = false; %>
    <bean:define id="WhList" name="cdMap" property="warehouse"/>
    <logic:iterate id="WhVO" name="WhList">
        <% if(isBegin){ %>
        WHCDLIST1+= '|';
        WHCDLIST2+= '|';
        <% }else{
              isBegin = true;
           } %>
           WHCDLIST1+= '<bean:write name="WhVO" property="wh_cd"/>';
           WHCDLIST2+= '<bean:write name="WhVO" property="wh_nm"/>';
    </logic:iterate>
</script>
<!-- 	<script type="text/javascript"> -->
<%-- 	<%=JSPUtil.getIBCodeCombo("ord_tp_cd", "", "WB3", "0", "")%> --%>
<!-- 	</script>   -->
	
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

<input type="hidden" id="f_cmd"/>
<input type="hidden" name="out_cnt" value="0" /> 
<input type="hidden" name="def_wh_cd" id="def_wh_cd" value="<%=userInfo.getDef_wh_cd()%>" />
<input type="hidden" name="def_wh_nm" id="def_wh_nm" value="<%=userInfo.getDef_wh_nm()%>" />
<input type="hidden" name="def_wh_ctrt_no" id="def_wh_ctrt_no" value="<%=userInfo.getDef_wh_ctrt_no()%>" />
<input type="hidden" name="def_wh_ctrt_nm" id="def_wh_ctrt_nm" value="<%=userInfo.getDef_wh_ctrt_nm()%>" />
<input type="hidden" name="org_cd" value="<%=userInfo.getOfc_cd()%>" />
<input type="hidden" name="user_id" id="user_id"  value="<%=userInfo.getUsrid()%>" />
<input type="hidden" name="pageurl" id="pageurl" value="DailyClosing.clt"/>
<input type="hidden" name="f_CurPage"> 

<div class="page_title_area clear">
	<!-- page_title(S) -->
	<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	<!-- page_title(E) -->
	<!-- opus_design_btn(S) -->
	<div class="opus_design_btn TOP">
<%-- 		<button type="button" class="btn_accent" name="btn_Search" id="btn_Search" onClick="doWork('SEARCHLIST');" style="display: none;" btnAuth="<%= roleBtnVO.getAttr1() %>"><bean:message key="Search"/></button><!-- 
		 --><button type="button" class="btn_normal" name="btn_Excel" id="btn_Excel" onClick="doWork('EXCEL');" style="display: none;" btnAuth="<%= roleBtnVO.getAttr6() %>"><bean:message key="Excel"/></button>
 --%>	</div>
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

<div class="over_wrap" style="height:100%">
<div class= "wrap_search">
	<div class="opus_design_inquiry ">
		<table>
			<colgroup>
				<col width="50" />
				<col width="150" />
				<col width="150" />
	            <col width="150" />
				<col width="150" />
				<col width="*" />
			</colgroup>	
			<tbody>		
				<tr>
					<th><bean:message key="Warehouse"/></th>
					<td>					
						<bean:define id="MsList" name="cdMap" property="warehouse"/>
						<select name="wh_cd" id="wh_cd" class="search_form" style="width: 206px;">
							<logic:iterate id="codeVO" name="MsList">
								<option value='<bean:write name="codeVO" property="wh_cd"/>'><bean:write name="codeVO" property="wh_nm"/></option>
							</logic:iterate>
						</select>
					</td>
					<th><bean:message key="Contract_No"/></th>
					<td>
						<input name="ctrt_no" id="ctrt_no" value="<%=DEF_WH_CTRT_NO %>" type="text" class="L_input" style="width:80px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" otherchar="-_" onBlur="strToUpper(this);getCtrtInfo(this)" maxlength="10" OnKeyDown="if(event.keyCode==13){getCtrtInfo(this);}" required/><!-- 
						 --><button type="button" name="btn_ctrt_no" id="btn_ctrt_no" onClick="doWork('btn_ctrt_no');" class="input_seach_btn" tabindex="-1"></button><!-- 						
						 --><input name="ctrt_nm" id="ctrt_nm" value="<%=DEF_WH_CTRT_NM %>" type="text" class="L_input" style="width:122px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" otherchar = " ()-_" onBlur="strToUpper(this);" onKeyDown="if(event.keyCode==13){CtrtPopup();}" required/><!-- 
					 --></td>
		        	<th><bean:message key="Inventory_by"/></th>
					<td>
						<!-- <script type="text/javascript">ComComboObject('inv_by_tp', 1, 215, 1);</script> -->
						<select id="inv_by_tp" name="inv_by_tp" onchange="inv_by_tp_OnChange(this,this,this,this,this,this,form.inv_by_tp.value);">
								<option value="ITEM"><bean:message key="By_Item"/></option>
								<option value="LOT"><bean:message key="By_Lot"/></option>
								<option value="LOC"><bean:message key="By_Location"/></option>
						</select>
					</td>
				</tr>				
		        <tr>
					<th><bean:message key="Item"/></th>
					<td><input name="item_cd" otherchar = "<%=WMS_OTHER_CHAR%>" id = "item_cd" type="text" class="L_input" style="width:206px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);setClosingDate();" maxlength="20" onChange="setClosingDate();"/></td>
					<th><bean:message key="Closing_Date"/></th>
					<td>
					    <input name="prop_date_fm" id="prop_date_fm" type="text" class="L_input" maxlength="10" style="width:80px;" onkeypress="onlyNumberCheck();" 
							 onkeyup="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onblur="chkCmprPrd(firCalFlag, false, this, this, this);firCalFlag=false;setClosingToDate();" required/><!-- 
						  --><button type="button" class="calendar ir" name="btn_fm_bk_date" id="btn_fm_bk_date" onClick="doWork('btn_fm_bk_date');"></button>~
						 <input name="prop_date_to" id="prop_date_to" type="text" class="L_input" maxlength="10" style="width:80px;" onblur="chkCmprPrd(firCalFlag, false, this, form.prop_date_fm, this);firCalFlag=false;"/><!-- 
						 --><button type="button" class="calendar ir" name="btn_to_bk_date" id="btn_to_bk_date" onClick="doWork('btn_to_bk_date');"></button><!-- 
					 --></td>
					<th>
						<!-- <script type="text/javascript">ComComboObject('prop_no_tp', 1, 105, 1);</script> -->
						<select id="prop_no_tp" name="prop_no_tp" style="ime-mode:disabled;width:100px;text-align:left">
								<option value="LOT_NO"><bean:message key="Item_Lot_No"/></option>
								<option value="LOT_ID"><bean:message key="Lot_ID"/></option>
								<option value="LOT_04"><bean:message key="Lot_04"/></option>
								<option value="LOT_05"><bean:message key="Lot_05"/></option>
						</select>
					</th>
					<td><input name="prop_no" type="text" class="L_input" id="prop_no" style="width:216px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);" maxlength="20"/></td>
					
				</tr>
		        <tr>
					<th><bean:message key="Location"/></th>
					<td>
						<input name="wh_loc_nm" id = "wh_loc_nm" type="text" class="L_input" style="width:177px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);"/><!-- 
						 --><button type="button" name="btn_wh_loc_cd" id="btn_wh_loc_cd" onClick="doWork('btn_wh_loc_cd');" class="input_seach_btn" tabindex="-1"></button><!-- 
						 --><input type="hidden" id="wh_loc_cd" name="wh_loc_cd" /><!-- 
					 --></td>
					<th><bean:message key="In_Booking_No"/></th>
					<td><input name="wib_bk_no" type="text" class="L_input" id="wib_bk_no" style="width:235px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);" maxlength="14"/></td>
					<th><bean:message key="Customer_Order_No"/></th>
					<td><input name="cust_ord_no" id = "cust_ord_no" type="text" class="L_input" style="width:216px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" otherchar = "<%=WMS_OTHER_CHAR%>" onBlur="strToUpper(this);" maxlength="100" /></td>
				</tr>	
			</tbody>					
		</table>
	</div>
</div>

<div class="wrap_result">
	<!-- Tin.Luong Comment - pending - 20150817
		<div class="opus_design_grid clear" style="float: right; margin-bottom: 5px;">
		<strong><bean:message key="Re-Build_Date"/></strong>
					<input name="rebuild_dt" id="rebuild_dt" type="text" class="L_input" maxlength="10" style="width:80px;" 
					onkeypress="onlyNumberCheck();" 
							 onkeyup="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onblur="chkCmprPrd(firCalFlag, false, this, form.rebuild_dt, this);firCalFlag=false;" onclick = "" />
		<button type="button" class="calendar ir" name="btn_rebuild_dt" id="btn_rebuild_dt" onClick="doWork('btn_rebuild_dt');"></button>
		 <div class="opus_design_btn">
		 	<button type="button" class="btn_normal" name="btn_Rebuild" id="btn_Rebuild" onClick="doWork('btn_Rebuild');"><bean:message key="Re_Build"/></button>
		</div>			
	 </div> -->
	<div class="opus_design_grid clear" id="div_sheet_item" style="display:none">
	<!-- opus_design_grid(S) -->
		<script type="text/javascript">comSheetObject('sheet1');</script>
	</div>
	<div class="opus_design_grid clear" id="div_sheet_lot" style="display: none;">
	<!-- opus_design_grid(S) -->
		<script type="text/javascript">comSheetObject('sheet2');</script>
	</div>
	<div class="opus_design_grid clear" id="div_sheet_loc" style="display: none;">
	<!-- opus_design_grid(S) -->
		<script type="text/javascript">comSheetObject('sheet3');</script>
	</div>
	<div class="opus_design_inquiry">
	         <table>
				<tr>
					<td width="100">
						<bean:define id="tmpMapVal" name="EventResponse" property="mapVal"/>
						<bean:define id="pagingVal" name="tmpMapVal"     property="paging"/>
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
</div>
</form>

<!-- Auth -->
<script type="text/javascript">
var attr_extension = "<%= roleBtnVO.getAttr_extension() %>";
doBtnAuthority(attr_extension);
</script>

<!-- <iframe id="_iFrameWait_" src="./web/images/common/processing.gif" frameborder="0" marginHeight="0" marginWidth="0" width="343" height="121" style="position:absolute;visibility:hidden;z-index:999;display:none;" ></iframe> -->