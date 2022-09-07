
<%--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : WHICList.jsp
*@FileTitle  : Inbound Complete Search
*@author     : Nam.Tran - DOU Network
*@version    : 1.0
*@since      : 2015/04/15
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
    <script type="text/javascript" src="./apps/fis/wms/whinboundcomplete/script/WHICList.js?ver=<%=CLT_JS_VER%>"></script>
    
	<script type="text/javascript" src="./js/common/message/<%=CLT_MSG_PATH%>/WMS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script> 
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
	var almightyFlag = false;
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
<input type="hidden" id="f_cmd" name="f_cmd" value="-1"/>
<input type="hidden" name="req_search_no" id="req_search_no"	value="<%=req_search_no%>" />
<input type="hidden" name="req_search_tp" id="req_search_tp"	value="<%=req_search_tp %>" />
<input type="hidden" name="def_wh_cd" id="def_wh_cd" value="<%=DEF_WH_CD%>" />
<input type="hidden" name="def_wh_nm" id="def_wh_nm" value="<%=DEF_WH_NM%>" />
<input type="hidden" name="def_wh_ctrt_no" id="def_wh_ctrt_no" value="<%=DEF_WH_CTRT_NO%>" />
<input type="hidden" name="def_wh_ctrt_nm" id="def_wh_ctrt_nm" value="<%=DEF_WH_CTRT_NM%>" />
<input type="hidden" name="user_id" id="user_id"  value="<%=userInfo.getUsrid()%>" />
<input type="hidden" name="pageurl" id="pageurl" value="WHICList.clt"/>
<div class="page_title_area clear">
	<!-- page_title(S) -->
	<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	<!-- page_title(E) -->
	<!-- opus_design_btn(S) -->
	<div class="opus_design_btn TOP">
<%-- 		<button type="button" style="display:none;" btnAuth="<%=null != roleBtnVO ?  roleBtnVO.getAttr1() : ""%>" class="btn_accent" name="btn_Search" id="btn_Search" onClick="doWork('SEARCHLIST');"><bean:message key="Search"/></button><!-- 
		--><button type="button" style="display:none;" btnAuth="<%=null != roleBtnVO ?  roleBtnVO.getAttr6() : ""%>" class="btn_normal" name="btn_Excel" id="btn_Excel" onClick="doWork('btn_Excel');"><bean:message key="Excel"/></button><!-- 
		-->
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

<div class= "wrap_search">
	<div class="opus_design_inquiry entry_pannel ">
		<table>
			<colgroup>
				<col width="50" />
				<col width="220" />
				<col width="220" />
                <col width="220" />
				<col width="220" />
				<col width="*" />
			</colgroup>
			<tbody>
				<tr>
					<th><bean:message key="Warehouse"/></th>
					<td><select name="wh_cd" id="wh_cd" style="width: 160px;" required>
									
						</select>
					</td>
					<th><bean:message key="Contract_No1"/></th>
					<td><input name="ctrt_no" id="ctrt_no" type="text" class="L_input" style="width:80px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" otherchar="-_" onBlur="strToUpper(this);getCtrtInfo(this);" maxlength="10" OnKeyDown="if(event.keyCode==13){getCtrtInfo(this);}"/><!-- 
						--><button type="button" name="btn_ctrt_no" id="btn_ctrt_no" class="input_seach_btn" tabindex="-1" onClick="doWork('btn_ctrt_no');"></button><!-- 						
						--><input name="ctrt_nm" id="ctrt_nm" type="text" class="L_input" style="width:120px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" otherchar = " ()-_" onBlur="strToUpper(this);" onKeyDown="if(event.keyCode==13){CtrtPopup();}"/><!-- 
					 --></td>
	 				<th><bean:message key="Order_Type"/></th>
					<td>
						<select name="ord_tp_cd" id="ord_tp_cd" style="width: 120px;">
			        			
             			</select>
					</td>
				</tr>
	            <tr>
					<td>
						<select name="search_in_bk" id="search_in_bk">
							<option value="WIB_BK_NO">In Booking No</option>
							<option value="CUST_ORD_NO">Cust Order No</option>
							<option value="WIB_IN_NO">In Complete No</option>
						</select>
					</td>
					<td><input name="search_no" id = "search_no" type="text" class="L_input" style="width:160px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" otherchar = "," onBlur="strToUpper(this);" /></td>
					<th><p><bean:message key="Status"/></p></th>
					<td>
						<select name="bk_sts_cd" id="bk_sts_cd" disabled>
							<option value="ALL">ALL</option>
							<option value="N">Booked</option>
							<option value="I">Issued</option>
							<option value="P">Partial</option>
							<option value="X">Complete</option>
							<option value="C">Cancel</option>
						</select>
					</td>
					<th>
						<select name="search_tp_dt" id="search_tp_dt">
							<option value="BK_DATE">Booking Date</option>
							<option value="EST_IN_DT">Estimated In Date</option>
						</select>
					</th>
					<td>
						<input name="fm_bk_date" required id="fm_bk_date" type="text" class="input" maxlength="10" style="width:96px;" onkeyup="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};"  OnBeforeDeactivate="ComAddSeparator(this)" OnBeforeActivate="ComClearSeparator(this)"
						onblur="chkCmprPrd(firCalFlag, false, this, this, form.to_bk_date);firCalFlag=false;"/><span class="dash">~</span><!-- 
						 --><input name="to_bk_date" required id="to_bk_date" type="text" class="input" maxlength="10" style="width:97px;" onkeyup="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" OnBeforeDeactivate="ComAddSeparator(this)" OnBeforeActivate="ComClearSeparator(this)"
						 onblur="chkCmprPrd(firCalFlag, false, this, form.fm_bk_date, this);firCalFlag=false;"/><!-- 
						 --><button type="button" class="calendar ir" name="btn_to_bk_date" id="btn_to_bk_date" onClick="doWork('btn_to_bk_date');"></button>
					</td>
	                  
				</tr>
				<tr>
					<th><bean:message key="Inbound_Date"/></th>
					<td><input name="fm_in_date" id="fm_in_date" required type="text" class="input"  maxlength="10" style="width:80px;" onkeyup="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};"  OnBeforeDeactivate="ComAddSeparator(this)" OnBeforeActivate="ComClearSeparator(this)"
						 onblur="chkCmprPrd(firCalFlag, false, this, this, form.to_in_date);firCalFlag=false;"/></button><span class="dash">~</span><!-- 
						 --><input name="to_in_date" id="to_in_date" required type="text" class="input"  maxlength="10" style="width:80px;" onkeyup="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};"  OnBeforeDeactivate="ComAddSeparator(this)" OnBeforeActivate="ComClearSeparator(this)"
						 onblur="chkCmprPrd(firCalFlag, false, this, form.fm_in_date,this);firCalFlag=false;"/><!-- 
						 --><button type="button" class="calendar ir" name="btn_to_in_date" id="btn_to_in_date" onClick="doWork('btn_to_in_date');"></button>
					</td>
					<th><bean:message key="Item_No"/></th>
					<td><input name="item_cd" otherchar = "<%=WMS_OTHER_CHAR%>" id = "item_cd" type="text" class="L_input" style="width:233px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);" maxlength="20"/></td>
					<th><bean:message key="PO_No"/></th>
					<td><input name="po_no" id = "po_no" type="text" class="L_input" style="width:237px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);" maxlength="29"/></td>
				</tr>
				<tr>
					<th><bean:message key="Inbound_Location"/></th>
					<td colspan="5"><input name="wh_loc_nm" id = "wh_loc_nm" type="text" class="L_input"style="width:175px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);getInboundLocInfo('c')" OnKeyDown="if(event.keyCode==13){getInboundLocInfo('e');}"/><!-- 
						 --><button type="button" name="btn_wh_loc_cd" id="btn_wh_loc_cd" class="input_seach_btn" tabindex="-1" onClick="doWork('btn_wh_loc_cd');"></button><!-- 
						 --><input type="hidden" id="wh_loc_cd" name="wh_loc_cd" /><!-- 
						 --><input type="hidden" id="wh_loc_nm_org" name="wh_loc_nm_org" />
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
</form>
 <script type="text/javascript">
var attr_extension = "<%= roleBtnVO.getAttr_extension() %>";
doBtnAuthority(attr_extension);
</script>
