<%--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : TrsHistoryList.jsp
*@FileTitle  : Transaction History
*@author     : Tin.Luong - DOU Network
*@version    : 1.0
*@since      : 2015/03/05
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
    <script type="text/javascript" src="./apps/fis/wms/whinventory/js/TrsHistoryList.js?ver=<%=CLT_JS_VER%>"></script>
	<bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
 	<bean:define id="valMap"  name="EventResponse" property="mapVal"/>
<%
	
	
	
	String wh_cd 		= "";
	String wh_nm 		= "";
	String ctrt_no 		= "";
	String ctrt_nm 		= "";
	String trs_no 		= "";
	String trs_type    = "";
	try {
		wh_cd    	= request.getParameter("wh_cd")== null?""/* userInfo.getDef_wh_cd() */:request.getParameter("wh_cd");
		wh_nm     	= request.getParameter("wh_nm")== null?""/* userInfo.getDef_wh_nm() */:request.getParameter("wh_nm");
		ctrt_no  	= request.getParameter("ctrt_no")== null?""/* userInfo.getDef_wh_ctrt_no() */:request.getParameter("ctrt_no");
		ctrt_nm  	= request.getParameter("ctrt_nm")== null?""/* userInfo.getDef_wh_ctrt_nm() */:request.getParameter("ctrt_nm");
		trs_no  	= request.getParameter("trs_no")== null?"":request.getParameter("trs_no");
		trs_type  	= request.getParameter("trs_type")== null?"":request.getParameter("trs_type");
	}catch(Exception e) {
		out.println(e.toString());
	}
%>
	<%-- <script type="text/javascript">
	<%=JSPUtil.getIBCodeCombo("trs_tp_cd", "", "WTT", "0", "")%>
	<%=JSPUtil.getIBCodeCombo("trs_sts_cd", "", "WTS", "0", "")%>
	</script>  --%>
    
<script type="text/javascript">
	function setupPage(){
		var errMessage = "";
		if (errMessage.length >= 1) {
			ComShowMessage(errMessage);
		} // end if
		loadPage(true);
	}
	
	var WHCDLIST = "";
	var WHNMLIST = "";
	<bean:define id="MsList" name="cdMap" property="warehouse"/>
    <logic:iterate id="WhVO" name="MsList">
           WHCDLIST+= '|';
           WHNMLIST+= '|';
           WHCDLIST+= '<bean:write name="WhVO" property="wh_cd"/>';
           WHNMLIST+= '<bean:write name="WhVO" property="wh_nm"/>';
    </logic:iterate>
    
</script>
<form id="form" name="form">
<input type="hidden" id="f_cmd" value="0" />
<input type="hidden" name="f_CurPage"/>

 <input type="hidden" name="def_wh_cd" value="<%=userInfo.getDef_wh_cd()%>" />
 <input type="hidden" name="def_wh_nm" value="<%=userInfo.getDef_wh_nm()%>" />
 <input type="hidden" name="def_wh_ctrt_no" value="<%=userInfo.getDef_wh_ctrt_no()%>" />
 <input type="hidden" name="def_wh_ctrt_nm" value="<%=userInfo.getDef_wh_ctrt_nm()%>" />
 <input type="hidden" name="user_nm" value="<%=userInfo.getUser_name()%>" />
<input type="hidden" name="org_cd" value="<%=userInfo.getOfc_cd()%>" />
<input type="hidden" name="trs_type" value="<%=trs_type%>" />
<input type="hidden" name="user_id" id="user_id"  value="<%=userInfo.getUsrid()%>" />
<input type="hidden" name="pageurl" id="pageurl" value="TrsHistoryList.clt"/>
<div class="page_title_area clear">
	<!-- page_title(S) -->
	<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	<!-- page_title(E) -->
	<!-- opus_design_btn(S) -->
	<div class="opus_design_btn TOP">
<%-- 			<button type="button" style="display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>"  class="btn_accent" name="btn_Search" id="btn_Search" onClick="doWork('SEARCHLIST');">Search</button><!-- 
		 --><button type="button" style="display:none;" btnAuth="<%= roleBtnVO.getAttr6() %>"  class="btn_normal" name="btn_Excel" id="btn_Excel" onClick="doWork('EXCEL');">Excel</button><!-- 
	 --> --%></div>
	<!-- opus_design_btn(E) -->
	<!-- page_location(S) -->
		<div class="location">
			<span><%=LEV1_NM%></span>&gt;
			<span><%=LEV2_NM%></span>&gt;
			<span><%=LEV3_NM%></span>
		</div>
	<!-- page_location(E) -->
</div>
<!-- opus_design_inquiry(S) -->

<div class= "over_wrap">
<div class= "wrap_search">
<div class="opus_design_inquiry entry_pannel">
	<table>
    	<colgroup>
			<col width="110">
			<col width="250">
			<col width="110">
			<col width="250">
			<col width="150">
	 		<col width="*">
		</colgroup>   
		<tbody>        	
			<tr>
				<th><bean:message key="Warehouse"/></th>
				<td>
					<bean:define id="MsList" name="cdMap" property="warehouse"/>
					<select name="wh_cd" id="wh_cd" class="search_form" style="width:213px" required>
						<option value=''></option>
						<logic:iterate id="codeVO" name="MsList">
							<option value='<bean:write name="codeVO" property="wh_cd"/>'><bean:write name="codeVO" property="wh_nm"/></option>
						</logic:iterate>
					</select>
				</td>
				<th><bean:message key="Contract_No"/></th>
				<td><input name="ctrt_no" id="ctrt_no" type="text" class="L_input" value="<%=ctrt_no%>" style="width:70px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" otherchar="-_" onBlur="strToUpper(this);getCtrtInfo(this)" maxlength="10" OnKeyDown="if(event.keyCode==13){getCtrtInfo(this);}" required="required"/><!-- 						
					 --><button type="button" name="btn_ctrt_no" id="btn_ctrt_no"class="input_seach_btn" tabindex="-1" onClick="doWork('btn_ctrt_no');"></button><!-- 
					 --><input name="ctrt_nm" id="ctrt_nm" type="text" class="L_input" value="<%=ctrt_nm%>" style="width:110px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" otherchar = " ()-_" onKeyDown="if(event.keyCode==13){CtrtPopup();}" required="required" />
				</td>
				<th><bean:message key="Transaction_Date"/></th>
				<td>
				<input style="width:78px" type="text" required name="fm_trs_loc_dt" id="fm_trs_loc_dt" onkeyup="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" 
						onblur="chkCmprPrd(firCalFlag, false, this, this, form.to_trs_loc_dt);firCalFlag=false;" size="10" maxlength="10" class="search_form"><!-- 
						
							  --><span class="dash">~</span><!--  
							   
							  --><input style="width:78px" required type="text" name="to_trs_loc_dt" id="to_trs_loc_dt" onkeyup="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" 
							  onblur="chkCmprPrd(firCalFlag, false, this, form.fm_trs_loc_dt, this);firCalFlag=false;" size="10" maxlength="10" class="search_form"><!-- 
							 --><button type="button" class="calendar" tabindex="-1" name="btn_bk_date_to" id="btn_bk_date_to"  onclick="doDisplay('DATE11', form);"></button>
				<!-- <input name="fm_trs_loc_dt" id="fm_trs_loc_dt" onblur="chkCmprPrd(firCalFlag, false, this, this, form.to_bk_date);firCalFlag=false;" 
						onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};"
						onkeypress="onlyNumberCheck();" onkeyup="mkDateFormatType(this, event, false,1)" type="text" class="L_input" style="width:75px;" 
				 />
					<span class="dash">~</span>
					<input name="to_trs_loc_dt" id="to_trs_loc_dt" onblur="chkCmprPrd(firCalFlag, false, this, this, form.to_bk_date);firCalFlag=false;" 
						onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};"
						onkeypress="onlyNumberCheck();" onkeyup="mkDateFormatType(this, event, false,1)" type="text" class="L_input" maxlength="10" style="width:75px;" 
					 	 onclick = "OmsFunFocusDel(this)" />
					<button type="button" name="btn_fm_trs_loc_dt" id="btn_fm_trs_loc_dt" class="calendar ir" tabindex="-1" onClick="doWork('btn_fm_trs_loc_dt');"></button> -->
				</td>
			</tr>				
 			<tr>
 				<th><bean:message key="Transaction_Type"/></th>
				<td>
					<bean:define id="MsList" name="cdMap" property="trs_tp_cd"/>
					<select name="trs_tp_cd" id="trs_tp_cd" class="search_form" style="width: 213px">
						<option value='ALL'>ALL</option>
						<logic:iterate id="codeVO" name="MsList">
						<option value='<bean:write name="codeVO" property="code"/>'><bean:write name="codeVO" property="name"/></option>
						</logic:iterate>
					</select>
				</td>
				<th><bean:message key="Transaction_No"/></th>
				<td><input name="trs_no" type="text" class="L_input" id="trs_no" value="<%=trs_no%>" style="width:213px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);" maxlength="24" /></td>
				<th><bean:message key="Transaction_Status"/></th>
				<td>
					<bean:define id="MsList" name="cdMap" property="trs_sts_cd"/>
					<select name="trs_sts_cd" id="trs_sts_cd" class="search_form" style="width: 200px">
						<option value='ALL'>ALL</option>
						<logic:iterate id="codeVO" name="MsList">
						<option value='<bean:write name="codeVO" property="code"/>'><bean:write name="codeVO" property="name"/></option>
						</logic:iterate>
					</select>
				</td>
			</tr>
   			<tr>
<!--    			//#5899 [OceanBlue-WMS] WMS inventory by Item Name -->
				<th>
					<select id="item_type" name="item_type">
						<option value="ITEM_CD"><bean:message key="Item_Code"/></option>
						<option value="ITEM_NM"><bean:message key="Item_Name"/></option>
					</select>
				</th>
				<td><input name="item_cd" otherchar = "<%=WMS_OTHER_CHAR%>" id = "item_cd" type="text" class="L_input" style="width:213px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);" maxlength="20"/></td>
				<th><bean:message key="Lot_ID"/></th>
				<td><input name="lot_id" id = "lot_id" type="text" class="L_input" style="width:213px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);"/></td>
				<th><bean:message key="Item_Lot_No"/></th>
				<td><input name="lot_no" id = "lot_no" type="text" class="L_input" style="width:200px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" otherchar = "<%=WMS_OTHER_CHAR%>" onBlur="strToUpper(this);"/></td>			
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
	
	<div class="opus_design_inquiry">
              <table border="0" width="720">
					<tr>
						<td width="100">
							<bean:define id="tmpMapVal" name="EventResponse" property="mapVal"/>
							<bean:define id="pagingVal" name="tmpMapVal"     property="paging"/>
							<paging:options name="pagingVal" defaultval="200"/>
						</td>
						<td align="center" width="700">
							<table width="700">
								<tr>
									<td width="700px;" id="pagingTb" style='font-family: "Tahoma", "Arial", "Verdana";font-size: 11px;'>
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

<script type="text/javascript">
var attr_extension = "<%= roleBtnVO.getAttr_extension() %>";
doBtnAuthority(attr_extension);
</script>