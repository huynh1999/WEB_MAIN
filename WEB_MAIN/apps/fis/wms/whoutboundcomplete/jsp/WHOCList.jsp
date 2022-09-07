<%--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : WHOCList.jsp
*@FileTitle  : Outbound Complete Search
*@author     : Bao.Huynh - DOU Network
*@version    : 1.0
*@since      : 2015/04/16
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
    <script type="text/javascript" src="./apps/fis/wms/whoutboundcomplete/script/WHOCList.js?ver=<%=CLT_JS_VER%>"></script>
    
    <%@ page import="com.clt.syscommon.response.CommonEventResponse"%>
    <bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
    <bean:define id="valMap"  name="EventResponse" property="mapVal"/>
    
<%
	
	String req_search_no = "";
	
	try {
		req_search_no = request.getParameter("search_no") == null ? "" : request.getParameter("search_no");	
	} catch (Exception e) {
		out.println(e.toString());
	}
%>
<%-- <script type="text/javascript">
	<%=JSPUtil.getIBCodeCombo("lp_sts_cd", "", "WLS", "0", "")%>	
	</script>   --%>

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
<input type="hidden" name="f_cmd">
<input type="hidden" name="f_CurPage"/>

<input type="hidden" name="out_cnt" value="0" /> 
<input type="hidden" name="req_search_no" id="req_search_no" value="<%=req_search_no%>" />

<input type="hidden" name="def_wh_cd" value="<%=userInfo.getDef_wh_cd()%>" />
<input type="hidden" name="def_wh_nm" value="<%=userInfo.getDef_wh_nm()%>" />
<input type="hidden" name="def_wh_ctrt_no" value="<%=userInfo.getDef_wh_ctrt_no()%>" />
<input type="hidden" name="def_wh_ctrt_nm" value="<%=userInfo.getDef_wh_ctrt_nm()%>" />
<input type="hidden" name="user_id" value="<%=userInfo.getUsrid()%>" />
<input type="hidden" name="org_cd" value="<%=userInfo.getOfc_cd()%>" />
<input type="hidden" name="pageurl" id="pageurl" value="WHOCList.clt"/>

<div class="page_title_area clear">
		<!-- page_title(S) -->
		<h2 class="page_title">
			<button type="button">
				<%= LEV3_NM %>
			</button>
		</h2>
		<!-- page_title(E) -->
		<!-- opus_design_btn(S) -->
		<div class="opus_design_btn TOP">
<%-- 			<button type="button" class="btn_accent" name="btn_Search" id="btn_Search" style="display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>"  onClick="doWork('SEARCHLIST');"><bean:message key="Search"/></button><!-- 
			 --><button type="button" class="btn_normal" name="btn_Excel" id="btn_Excel" style="display:none;" btnAuth="<%= roleBtnVO.getAttr6() %>"  onClick="doWork('EXCEL');"><bean:message key="Excel"/></button>
 --%>		</div>
		<!-- opus_design_btn(E) -->
		<!-- page_location(S) -->
		<div class="location">
			<span><%= LEV1_NM %></span> &gt; <span><%= LEV2_NM %></span> &gt; <span><%= LEV3_NM %></span>
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
						<td>
								<bean:define id="MsList" name="cdMap" property="warehouse"/>
								<select name="wh_cd" id="wh_cd" class="search_form" style="width:225px" required>
									<option value=''></option>
									<logic:iterate id="codeVO" name="MsList">
										<option value='<bean:write name="codeVO" property="wh_cd"/>'><bean:write name="codeVO" property="wh_nm"/></option>
									</logic:iterate>
								</select>
							</td>
						<th><bean:message key="Bkg_No"/></th>
						<td><input name="wob_bk_no" type="text" class="L_input" id="wob_bk_no"  style="width:215px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);" maxlength="14"/>
						</td>
						<th><bean:message key="Complete_No"/></th>
						<td><input name="wob_out_no" type="text" class="L_input" id="wob_out_no"  style="width:215px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);"" />
						</td>
					</tr>
					<tr>
						<th><bean:message key="Contract_No1"/></th>
						<td>
							<input name="ctrt_no" id="ctrt_no" type="text" class="L_input" style="width:80px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" otherchar="-_" onBlur="strToUpper(this);searchTlCtrtInfo();" maxlength="10" OnKeyDown="if(event.keyCode==13){searchTlCtrtInfo();}"/><!-- 
							 --><button type="button" name="btn_ctrt_no" id="btn_ctrt_no" onClick="doWork('btn_ctrt_no');" class="input_seach_btn" tabindex="-1"></button><!-- 
							 --><input name="ctrt_nm" dataformat="engup" otherchar = " ()-_" id="ctrt_nm" type="text" class="L_input" style="width:112px;"  onKeyDown="if(event.keyCode==13){CtrtPopup();}"/>
						</td>
						<th><bean:message key="Booking_Date"/></th>
						<td><input style="width:85px"  type="text" name="bk_date_fm" id="bk_date_fm" onkeyup="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" 
						onblur="chkCmprPrd(firCalFlag, false, this, this, form.bk_date_to);firCalFlag=false;" onkeypress="onlyNumberCheck();" size="10" maxlength="10" class="search_form"><!-- 
							  --><span class="dash">~</span><!--  
							  --><input style="width:86px"  type="text" name="bk_date_to" id="bk_date_to" onkeyup="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" 
							  onblur="chkCmprPrd(firCalFlag, false, this, form.bk_date_fm, this);firCalFlag=false;" onkeypress="onlyNumberCheck();" size="10" maxlength="10" class="search_form"><!-- 
							 --><button type="button" class="calendar" tabindex="-1" name="btn_bk_date_to" id="btn_bk_date_to"  onclick="doDisplay('DATE11', form);"></button>
						</td>
						<th><bean:message key="Complete_Date"/></th>
						<td><input style="width:85px" type="text"  name="outbound_dt_fm" id="outbound_dt_fm" onkeyup="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" 
						onblur="chkCmprPrd(firCalFlag, false, this, this, form.outbound_dt_to);firCalFlag=false;" onkeypress="onlyNumberCheck();" size="10" maxlength="10" class="search_form"><!-- 
							  --><span class="dash">~</span><!--  
							  --><input style="width:86px" type="text"  name="outbound_dt_to" id="outbound_dt_to" onkeyup="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" 
							  onblur="chkCmprPrd(firCalFlag, false, this, form.outbound_dt_fm, this);firCalFlag=false;" onkeypress="onlyNumberCheck();" size="10" maxlength="10" class="search_form"><!-- 
							 --><button class="calendar" type="button" name="btn_outbound_dt_to" id="btn_outbound_dt_to"  onclick="doDisplay('DATE12', form);"></button>
						</td>               
					</tr>
					<tr>
						<th><bean:message key="Consignee"/></th>
						<td><input name="buyer_cd" type="text" class="L_input" style="width:80px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);codeNameAction('BILLTO',this, 'onBlur')" id="buyer_cd" maxlength="10" OnKeyDown="if(event.keyCode==13){codeNameAction('BILLTO',this, 'onKeyDown');}"/><!--
							--><button type="button" name="btn_buyer_cd" id="btn_buyer_cd" onClick="doWork('btn_buyer_cd');" class="input_seach_btn" tabindex="-1"></button><!--
							--><input name="buyer_nm" type="text" class="L_input" id="buyer_nm" style="width:112px;"  onKeyDown="if(event.keyCode==13){CustPopup();}"/>
						</td>
						<th><bean:message key="Item"/></th>
						<td> 
							<input name="item_cd" otherchar = "<%=WMS_OTHER_CHAR%>" id = "item_cd" type="text" class="L_input" style="width:215px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);" maxlength="20"/>
						</td>
						<th><bean:message key="Item_Lot"/></th>
						<td>
							<input name="lot_no" id = "lot_no" type="text" class="L_input" style="width:215px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);" maxlength="20"/>
						</td>
					</tr>
					 <tr>
						<th><bean:message key="Status"/></th>
						<td>					
<!-- 							<script type="text/javascript">ComComboObject('lp_sts_cd', 1, 225, 1);</script>	 -->
							<bean:define id="MsList" name="cdMap" property="lp_sts_cd"/>
							<select name="lp_sts_cd" id="lp_sts_cd" style="width:225px">
							<option value='ALL'>ALL</option>
								<logic:iterate id="codeVO" name="MsList">
								<option value='<bean:write name="codeVO" property="code"/>'><bean:write name="codeVO" property="name"/></option>
								</logic:iterate>
							</select>			
						</td>
						<th>&nbsp;</th>
						<td>&nbsp;</td>
						<th>&nbsp;</th>
						<td>&nbsp;</td>
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
		<!--- Paging(공통) --->
           <table>
			<tr>
			<td width="55px">
				<bean:define id="tmpMapVal" name="EventResponse" property="mapVal"/> 
				 <bean:define id="pagingVal" name="tmpMapVal"     property="paging"/> 
				 <paging:options name="pagingVal" defaultval="200"/> 
			</td>
			<td id="pagingTb" style='font-family: "Tahoma", "Arial", "Verdana";font-size: 11px;'></td>
			</tr>   
		</table>
		</div>
	</div>
</form>
<form name="frm1" method="POST" action="./GateServlet.gsl">
	<input type="hidden" name="goWhere" value="fd" id="goWhere" />
    <input type="hidden" name="bcKey" value="downloadTlFileTemplateWMS" id="bcKey" />
    <input type="hidden" name="file_path" value="" id="file_path" />
    <input type="hidden" name="file_name" value="" id="file_name"/>	
    <input type="hidden" name="docType" value="" id="docType" />
</form>	

<iframe name="ifra_hidden" style="width:0;height:0;visibility:hidden" border=0></iframe>



<script type="text/javascript">
var attr_extension = "<%= roleBtnVO.getAttr_extension() %>";
doBtnAuthority(attr_extension);
</script>	

