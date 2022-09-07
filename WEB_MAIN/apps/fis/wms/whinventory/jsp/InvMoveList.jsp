<%--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : InvMoveList.jsp
*@FileTitle  : Inventory Movement & Hold & Damage Search
*@author     : Bao.Huynh - DOU Network
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
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoBizCommon.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/ModalCalendar.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="./apps/fis/wms/whinventory/js/InvMoveList.js?ver=<%=CLT_JS_VER%>"></script>
    <bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
    
	<script type="text/javascript" src="./js/common/message/<%=CLT_MSG_PATH%>/WMS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	
	<bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
	<bean:define id="valMap"  name="EventResponse" property="mapVal"/>
<%

String req_move_no   = "";
String req_mv_tp_cd  = "";

String DEF_WH_CTRT_NO   = userInfo.getDef_wh_ctrt_no()== null?"":userInfo.getDef_wh_ctrt_no();
String DEF_WH_CTRT_NM   = userInfo.getDef_wh_ctrt_nm()== null?"":userInfo.getDef_wh_ctrt_nm();
String DEF_WH_CD		= userInfo.getDef_wh_cd()== null?"":userInfo.getDef_wh_cd();
String DEF_WH_NM		= userInfo.getDef_wh_nm()== null?"":userInfo.getDef_wh_nm();

try {
	req_move_no   = request.getParameter("move_no")== null?"":request.getParameter("move_no");
	req_mv_tp_cd   = request.getParameter("mv_tp_cd")== null?"":request.getParameter("mv_tp_cd");
	
}catch(Exception e) {
	out.println(e.toString());
}	

%>
 		<script  type="text/javascript">
<%--	<%=JSPUtil.getIBCodeCombo("plan_sts_cd", "", "WPS", "0", "")%> --%>
		</script>
<script type="text/javascript">
	function setupPage(){
		var errMessage = "";
		if (errMessage.length >= 1) {
			comShowMessage(errMessage);
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
<input type="hidden" name="f_cmd" id="f_cmd"/>
<input type="hidden" name="f_CurPage"/>

<input type="hidden" name="req_move_no" id="req_move_no"	value="<%=req_move_no%>" />
<input type="hidden" name="req_mv_tp_cd" id="req_mv_tp_cd"	value="<%=req_mv_tp_cd %>" />
<input type="hidden" name="def_wh_cd" id="def_wh_cd" value="<%=DEF_WH_CD%>" />
<input type="hidden" name="def_wh_nm" id="def_wh_nm" value="<%=DEF_WH_NM%>" />
<input type="hidden" name="def_wh_ctrt_no" id="def_wh_ctrt_no" value="<%=DEF_WH_CTRT_NO%>" />
<input type="hidden" name="def_wh_ctrt_nm" id="def_wh_ctrt_nm" value="<%=DEF_WH_CTRT_NM%>" />
<input type="hidden" name="user_id" id="user_id"  value="<%=userInfo.getUsrid()%>" />
<input type="hidden" name="pageurl" id="pageurl" value="InvMoveList.clt"/>
<div class="page_title_area clear">
		<!-- page_title(S) -->
		<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
		<!-- page_title(E) -->
		<!-- opus_design_btn(S) -->
		<div class="opus_design_btn TOP">
<%-- 			<button type="button" style="display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>"  class="btn_accent" name="btn_Search" id="btn_Search" onClick="doWork('SEARCHLIST');"><bean:message key="Search"/></button><!-- 
			 --><button type="button" style="display:none;" btnAuth="<%= roleBtnVO.getAttr6() %>"  class="btn_normal" name="btn_Excel" id="btn_Excel" onClick="doWork('EXCEL');"><bean:message key="Excel_D/L"/></button><!--
			 --><button type="button" btnAuth="HISTORY"  class="btn_normal" name="btn_history" id="btn_history" disabled="" onClick="doWork('btn_history');"><bean:message key="History"/></button>
 --%>		</div>
		<!-- opus_design_btn(E) -->
		<!-- page_location(S) -->
		<div class="location">
			<span><%=LEV1_NM%></span> &gt;
			<span><%=LEV2_NM%></span> &gt;
			<span><%=LEV3_NM%></span>
		</div>
		<!-- page_location(E) -->
	</div>
	<!-- opus_design_inquiry(S) -->
<div class= "over_wrap">
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
						<td>
							<bean:define id="MsList" name="cdMap" property="warehouse"/>
							<select name="wh_cd" id="wh_cd" class="search_form" style="width:230px" required>
								<option value=''></option>
								<logic:iterate id="codeVO" name="MsList">
									<option value='<bean:write name="codeVO" property="wh_cd"/>'><bean:write name="codeVO" property="wh_nm"/></option>
								</logic:iterate>
							</select>
						</td>
						<th><bean:message key="Contract_No"/></th>
						<td>
						<input name="ctrt_no" type="text" class="L_input" id="ctrt_no" style="width:80px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" otherchar="-_" onBlur="strToUpper(this);getCtrtInfo(this);" OnKeyDown="if(event.keyCode==13){getCtrtInfo(this);}" required="required"/><!-- 
						--><button type="button" name="btn_ctrt_no" id="btn_ctrt_no" class="input_seach_btn" tabindex="-1" onClick="doWork('btn_ctrt_no');"></button><!--						
						--><input name="ctrt_nm" id="ctrt_nm" type="text" class="L_input"  style="width:117px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" otherchar = " ()-_" onBlur="strToUpper(this);" onKeyDown="if(event.keyCode==13){CtrtPopup();}" required="required"/>
						</td>
						<th><select id="move_plan_no_tp" style="width: 120px;">
							<option value="MOVE_NO">Movement Key</option>
							<option value="PLAN_NO">Plan No.</option>
							</select>
						</th>
						<td><input name="move_no" id = "move_no" type="text" class="L_input" style="width:200px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);"/>
						</td>
					</tr>
					<tr>
						<th><bean:message key="Status"/></th>
						<td>
								<bean:define id="MsList" name="cdMap" property="plan_sts_cd"/>
								<select name="plan_sts_cd" id="plan_sts_cd" class="search_form" style="width: 230px;">
									<option value='ALL'>All</option>
									<logic:iterate id="codeVO" name="MsList">
										<option value='<bean:write name="codeVO" property="code"/>'><bean:write name="codeVO" property="name"/></option>
									</logic:iterate>
								</select>
						</td>
						<th>
							<select id="fr_to_tp" style="width: 110px;">
							<option value="FR">From Location</option>
							<option value="TO">To Location</option>
							</select>
						</th>
						<td>
							<input name="wh_loc_nm" id="wh_loc_nm" type="text" class="L_input" style="width:201px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);getLocationInfo('c');" OnKeyDown="if(event.keyCode==13){getLocationInfo('e');}" onChange="getLocationInfo('c')"/><!-- 
							 --><button type="button" name="btn_wh_loc_cd" id="btn_wh_loc_cd" class="input_seach_btn" tabindex="-1" onClick="doWork('btn_wh_loc_cd');"></button><!--
							 --><input type="hidden" id="wh_loc_cd" name="wh_loc_cd" /><!--
							 --><input type="hidden" id="wh_loc_nm_org" name="wh_loc_nm_org" />
						</td>
						<th>
						<select id="move_plan_dt_tp" style="width: 120px;">
							<option value="MOVE_DT">Movement Date</option>
							<option value="PLAN_DT">Plan Date</option>
						</select>
						<td><input name="fm_mv_date" id="fm_mv_date" type="text" class="L_input"  maxlength="10" style="width:78px;" 
						onblur="chkCmprPrd(firCalFlag, false, this, this, form.to_mv_date);firCalFlag=false;" 
						onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};"
						onkeypress="onlyNumberCheck();" onkeyup="mkDateFormatType(this, event, false,1)"/><span class="dash">~</span><!--
						--><input name="to_mv_date" id="to_mv_date" type="text" class="L_input"  maxlength="10" style="width:78px;" 
						onblur="chkCmprPrd(firCalFlag, false, this, form.fm_mv_date, this);firCalFlag=false;" 
						onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};"
						onkeypress="onlyNumberCheck();" onkeyup="mkDateFormatType(this, event, false,1)"/><!--
						--><button class="calendar" tabindex="-1" type="button" name="btn_fm_in_date" id="btn_fm_in_date" onClick="doWork('btn_fm_in_date');"></button>
						</td>
					</tr>
					<tr>
						<th><bean:message key="Item_No"/></th>
						<td><input name="item_cd" otherchar = "<%=WMS_OTHER_CHAR%>" id="item_cd" type="text" class="L_input"  style="width:80px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);getItemInfo(this);" OnKeyDown="if(event.keyCode==13){getItemInfo(this);}"/><!-- 
						 --><button type="button" name="btn_item_cd" id="btn_item_cd" class="input_seach_btn" tabindex="-1" onClick="doWork('btn_item_cd');"></button><!-- 
						  --><input name="item_nm" id="item_nm" type="text" class="L_input" style="width:117px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);" onKeyDown="if(event.keyCode==13){itemPopup();}"/>
						  </td>
						<th>
						<select id="lot_attrib_tp" style="width: 110px;">
							<option value="LOT_NO">Item Lot No.</option>
							<option value="LOT_ID">Lot ID</option>
							<option value="LOT_04">Lot 04</option>
							<option value="LOT_05">Lot 05</option>
						</select>
						<td><input name="lot_attrib" id = "lot_attrib" type="text" class="L_input" style="width:230px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" otherchar = "<%=WMS_OTHER_CHAR%>" onBlur="strToUpper(this);"/>
						</td>
						<th>
						<select id="date_tp" style="width: 120px;">
							<option value="INBOUND_DT">Inbound Date</option>
							<option value="EXP_DT">Expiration Date</option>
						</select>
						<td><input name="fm_in_date" id="fm_in_date" type="text" class="L_input"  maxlength="10" style="width:78px;" 
						onblur="chkCmprPrd(firCalFlag, false, this, this, form.to_in_date);firCalFlag=false;" 
						onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};"
						onkeypress="onlyNumberCheck();" onkeyup="mkDateFormatType(this, event, false,1)"/><span class="dash">~</span><!--
						--><input name="to_in_date" id="to_in_date" type="text" class="L_input"  maxlength="10" style="width:78px;" 
						onblur="chkCmprPrd(firCalFlag, false, this, form.fm_in_date, this);firCalFlag=false;" 
						onKeyUp="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};"
						onkeypress="onlyNumberCheck();" onkeyup="mkDateFormatType(this, event, false,1)"/><!--
						--><button class="calendar" tabindex="-1" type="button" name="btn_bk_date_to" id="btn_bk_date_to" onClick="doWork('btn_bk_date_to');"></button>
						</td>
					</tr>
					<tr>
						<th>
						<select id="search_tp">
							<option value="WIB_BK_NO">In Booking No.</option>
							<option value="CUST_ORD_NO">Cust Order No.</option>
						</select>
						<td colspan="3">
							<input name="search_no" id="search_no" otherchar = "<%=WMS_OTHER_CHAR%>" type="text" class="L_input" style="width:230px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);"/>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	<!-- opus_design_inquiry(E) -->
	
	<div class="wrap_result">
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
<%@include file="/apps/fis/wms/bizcommon/include_common.jsp"%>	

<script type="text/javascript">
var attr_extension = "<%= roleBtnVO.getAttr_extension() %>";
doBtnAuthority(attr_extension);
</script>
