<%--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : ClosingBackgroundSearch.jsp
*@FileTitle  : W/H Closing Background Search
*@author     : Tuan.Chau - DOU Network
*@version    : 1.0
*@since      : 2015/07/17
=========================================================--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCommon.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ModalCalendar.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript" src="./apps/fis/wms/whclosing/script/ClosingDetail.js?ver=<%=CLT_JS_VER%>"></script>
<%


String req_cls_no		= "";
String req_cust_cd	= "";
String req_sb_cls_cd	= "";
String req_rate_tp_cd	= "";

try {
	req_cls_no   = request.getParameter("cls_no")== null?"":request.getParameter("cls_no");
	req_cust_cd   = request.getParameter("cust_cd")== null?"":request.getParameter("cust_cd");
	req_sb_cls_cd   = request.getParameter("sb_cls_cd")== null?"":request.getParameter("sb_cls_cd");
	req_rate_tp_cd   = request.getParameter("rate_tp_cd")== null?"":request.getParameter("rate_tp_cd");
	
}catch(Exception e) {
	out.println(e.toString());
}	


%>
	<bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
	<bean:define id="order_rel" name="cdMap" property="order_rel"/>
	<bean:define id="ord_tp_cd" name="cdMap" property="ord_tp_cd"/>
	<bean:define id="load_tp_cd" name="cdMap" property="load_tp_cd"/>
	<bean:define id="rate_tp_cd" name="cdMap" property="rate_tp_cd"/>
	
	<script language="javascript">    
	
	var order_relCode = "";
	var order_relText = "";
	
	<!-- Freight Unit 단위 -->
		<% boolean isBegin_order_rel = false; %>
        <logic:iterate id="codeVO" name="order_rel">
            <% if(isBegin_order_rel){ %>
            order_relText+= '|';
            order_relCode+= '|';
            <% }else{
            	isBegin_order_rel = true;
               } %>
               order_relCode+= '<bean:write name="codeVO" property="code"/>' + '|';
               order_relText+= '<bean:write name="codeVO" property="name"/>' + '|';
        </logic:iterate>
        
	
        <!-- Combobox in grid Order Type Code 단위 -->
		var ord_tp_cdText = "";
		var ord_tp_cdCode = "";
		<% boolean isBegin_ord_tp_cd = false; %>
        <logic:iterate id="codeVO" name="ord_tp_cd">
            <% if(isBegin_ord_tp_cd){ %>
            ord_tp_cdText+= '|';
            ord_tp_cdCode+= '|';
            <% }else{
            	isBegin_ord_tp_cd = true;
               } %>
               ord_tp_cdCode+= '<bean:write name="codeVO" property="code"/>' + '|';
               ord_tp_cdText+= '<bean:write name="codeVO" property="name"/>' + '|';
        </logic:iterate>
        
        <!-- Combobox in grid Load Type Code 단위 -->
		var load_tp_cdText = "";
		var load_tp_cdCode = "";
		<% boolean isBegin_load_tp_cd = false; %>
        <logic:iterate id="codeVO" name="load_tp_cd">
            <% if(isBegin_load_tp_cd){ %>
            load_tp_cdText+= '|';
            load_tp_cdCode+= '|';
            <% }else{
            	isBegin_load_tp_cd = true;
               } %>
               load_tp_cdCode+= '<bean:write name="codeVO" property="code"/>' + '|';
               load_tp_cdText+= '<bean:write name="codeVO" property="name"/>' + '|';
        </logic:iterate>
        
        <!-- Combobox in grid Rate Type Code 단위 -->
		var rate_tp_cdText = "";
		var rate_tp_cdCode = "";
		<% boolean isBegin_rate_tp_cd = false; %>
        <logic:iterate id="codeVO" name="rate_tp_cd">
            <% if(isBegin_rate_tp_cd){ %>
            rate_tp_cdText+= '|';
            rate_tp_cdCode+= '|';
            <% }else{
            	isBegin_rate_tp_cd = true;
               } %>
               rate_tp_cdCode+= '<bean:write name="codeVO" property="code"/>';
               rate_tp_cdText+= '<bean:write name="codeVO" property="name"/>';
        </logic:iterate>
        /*Freight code  */
        var FreightText = ' |';
		var FreightCode = ' |';
		<%boolean isBegin_Freight = false; %>
	    <bean:define id="FrtList" name="cdMap" property="Freight"/>
	    <logic:iterate id="FrtVO" name="FrtList">
	        <% if(isBegin_Freight){ %>
	        FreightCode+= '|';
	        FreightText+= '|';
	        <% }else{
	              isBegin_Freight = true;
	           } %>
	           FreightCode+= '<bean:write name="FrtVO" property="frt_cd" filter="false"/>';
	           FreightText+= '<bean:write name="FrtVO" property="frt_cd" filter="false"/>'+': '+'<bean:write name="FrtVO" property="frt_cd_nm" filter="false"/>';
	    </logic:iterate>
	    /*Curr code  */
		var CurrCode = "";
		<%boolean isBegin_Curr = false; %>
	    <bean:define id="CurrList" name="cdMap" property="Curr"/>
	    <logic:iterate id="CurrVO" name="CurrList">
	        <% if(isBegin_Curr){ %>
	        CurrCode+= '|';
	        <% }else{
	        		isBegin_Curr = true;
	           } %>
	           CurrCode+= '<bean:write name="CurrVO" property="cd_val"/>';
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
</script>

<form id="form" name="form">
<input type="hidden" name="f_cmd" value="0">
<input type="hidden" id="mode" name="mode" />
<input type="hidden" id="auth_lvl" name="auth_lvl" value="" />
<input type="hidden" name="org_cd"  value="" />
<input type="hidden" name="fb_cls_cd"  value="" />

<input type="hidden" name="def_wh_cd" id="def_wh_cd" value="<%=userInfo.getDef_wh_cd()%>" />
<input type="hidden" name="def_wh_nm" id="def_wh_nm" value="<%=userInfo.getDef_wh_nm()%>" />
<input type="hidden" name="def_wh_ctrt_no" id="def_wh_ctrt_no" value="<%=userInfo.getDef_wh_ctrt_no()%>" />
<input type="hidden" name="def_wh_ctrt_nm" id="def_wh_ctrt_nm" value="<%=userInfo.getDef_wh_ctrt_nm()%>" />
<input type="hidden" name="def_org_cd" id="def_org_cd" value="<%=userInfo.getOfc_cd()%>" />
<input type="hidden" name="def_org_nm" id="def_org_nm" value="<%=userInfo.getOfc_eng_nm()%>" />

<input type="hidden" name="wh_list_ath" value="<%=userInfo.getWh_list_ath()%>" /> <!-- Get list warehouse from TB_SEQ table -->
<input type="hidden" name="wh_cfg" value="<%=userInfo.getWh_cfg()%>" /> <!-- Get list warehouse from TB_USR table --> 

<input type="hidden" name="req_cls_no" id="req_cls_no" value="<%=req_cls_no%>"/>
<input type="hidden" name="req_cust_cd" id="req_cust_cd" value="<%=req_cust_cd%>"/>
<input type="hidden" name="req_sb_cls_cd" id="req_sb_cls_cd" value="<%=req_sb_cls_cd%>"/>
<input type="hidden" name="req_rate_tp_cd" id="req_rate_tp_cd" value="<%=req_rate_tp_cd%>"/>
<input type="hidden" name="user_id" id="user_id"  value="<%=userInfo.getUsrid()%>" />
<input type="hidden" name="pageurl" id="pageurl" value="ClosingDetail.clt"/>
 <!-- Print -->
<input type="hidden" name="file_name">
<input type="hidden" name="title">
<input type="hidden" name="rd_param">

<div class="page_title_area clear">
	<!-- page_title(S) -->
	<h2 class="page_title"><button type="button"><%=LEV3_NM %></button></h2>
	<!-- page_title(E) -->
	<!-- opus_design_btn(S) -->
	<div class="opus_design_btn TOP">
		<%-- 	<button type="button" style="display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>"  class="btn_accent" name="btn_Search" id="btn_Search" onclick="doWork('SEARCHLIST')"><bean:message key="Search"/></button><!-- 
		 --><button type="button" style="display:none;" btnAuth="<%= roleBtnVO.getAttr3() %>"  class="btn_normal" name="btnSave" id="btnSave"  onclick="doWork('SAVE')"><bean:message key="Save"/></button><!-- 
		 --><button type="button" style="display:none;" btnAuth="<%= roleBtnVO.getAttr4() %>"  class="btn_normal" name="btnDelete" id="btnDelete"  onclick="doWork('DELETE')"><bean:message key="Delete"/></button><!--
		 --><button type="button" style="display:none;" btnAuth="<%= roleBtnVO.getAttr6() %>"  class="btn_normal" name="btn_excel" id="btn_excel"  onclick="doWork('EXCEL')"><bean:message key="Excel"/></button><!--
		 
		 --><button type="button" style="display:inline;" btnAuth="<%= roleBtnVO.getAttr6() %>"  class="btn_normal" name="btnPrint" id="btnPrint" onclick="doWork('PRINT')"><bean:message key="Print"/></button><!--
		 
		 --><button type="button" style="display:none;" btnAuth="<%= roleBtnVO.getAttr2() %>"  class="btn_normal" name="btn_new" id="btn_new"  onclick="doWork('NEW')"><bean:message key="New"/></button><!--
	 --> --%></div>
	<!-- opus_design_btn(E) -->
<!-- 	<div class="opus_design_btn"> -->
<!--    		<button  id="link_ClosingMgmt" name="link_ClosingMgmt" onclick="doWork('link_ClosingMgmt')"><bean:message key="Closing_Management" /></button>  -->
<!--  	</div> -->
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
				<col width="90" />
				<col width="130" />
				<col width="78" />
				<col width="*"/>						
			</colgroup>
			<tbody>
				<tr>					
					<th><bean:message key="Closing_No"/></th>
					<td>
						<input name="in_cls_no" id="in_cls_no" type="text" class="L_input" style="width:120px;" dataformat="engup"  maxlength="14" />
					</td>
					<th><bean:message key="Alignment"/></th>
					<td>
						<select name="sort_tp_cd" id="sort_tp_cd" class="search_form"  style="ime-mode:disabled;width:150px;text-align:left">
							<option value='A'>By Item</option>
							<option value='B'>By Transction Date</option>
							<option value='C'>By LOT</option>
						</select>
					</td>
				</tr>
			</tbody>	
		</table>
	</div>
</div>

<div class="wrap_result">
<div id="headLayer" style="display:inline">	
	<div class="opus_design_inquiry">
		<table>
			<colgroup>
				<col width="90">
				<col width="240">
				<col width="195">
                <col width="300">
				<col width="100">
				<col width="*">
			</colgroup>
			<tbody>
				<tr>
					<th><a style="color:#0000FF" href="javascript:btn_link_clsno();" id="btn_link_clsno"><span class="point_B"><bean:message key="Closing_No"/></span></a></th>
					<td colspan="5"><input name="cls_no" type="text" class="L_input_R" id="cls_no" readOnly tabindex="-1" style="width:120px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);"/></td>
				</tr>
				<tr>
					<th><bean:message key="Closing_Date"/></th>
					<td>
						<input name="cls_dt" id="cls_dt" type="text" class="L_input_R" maxlength="10" style="width:120px;"
								onkeyup="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onkeypress="onlyNumberCheck();" 
								OnBeforeDeactivate="ComAddSeparator(this); setSetPeriod(this);" OnBeforeActivate="ComClearSeparator(this)" onblur="chkCmprPrd(firCalFlag, false, this, this, this);firCalFlag=false;" required /><!-- 
						 --><button type="button" name="btn_cls_dt" id="btn_cls_dt" onclick="doWork('btn_cls_dt')" class="calendar ir" tabindex="-1"></button>
					</td>
					<th><bean:message key="Settlement_Period"/></th>
					<td><input name="set_fr_dt" id="set_fr_dt" type="text" class="L_input" maxlength="10" style="width:75px;"
								onkeyup="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onkeypress="onlyNumberCheck();" 
								OnBeforeDeactivate="ComAddSeparator(this)" OnBeforeActivate="ComClearSeparator(this)" onblur="chkCmprPrd(firCalFlag, false, this, this, form.set_to_dt);firCalFlag=false;"/><!-- 
						 --><span class="dash">~</span><!--
						 --><input name="set_to_dt" id="set_to_dt" type="text" class="L_input" maxlength="10" style="width:75px;"
						 		onkeyup="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" onkeypress="onlyNumberCheck();" 
						 		OnBeforeDeactivate="ComAddSeparator(this)" OnBeforeActivate="ComClearSeparator(this)" onblur="chkCmprPrd(firCalFlag, false, this, form.set_fr_dt, this);firCalFlag=false;"/><!-- 
						 --><button type="button" name="btn_set_to_dt" id="btn_set_to_dt"  onclick="doWork('btn_set_to_dt')" class="calendar ir" tabindex="-1"></button>
					</td>
					<td colspan="2"><button type="button" class="btn_etc"  onClick="btn_Change_Date('week');" id="btn_change_date1" name="btn_change_date1"><bean:message key="1Week"/></button><!-- 
						 --><button type="button" class="btn_etc"  onClick="btn_Change_Date('half_month');" id="btn_change_date2" name="btn_change_date2"><bean:message key="H.Month"/></button><!-- 
						 --><button type="button" class="btn_etc"  onClick="btn_Change_Date('month');" id="btn_change_date3" name="btn_change_date3"><bean:message key="1Month"/></button>
					</td>	
				</tr>
				<tr>
					<th><bean:message key="Office"/></th>
					<td><input name="ofc_cd" id="ofc_cd" type="text" class="L_input_R" style="width:120px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);" readOnly tabindex="-1" /><!-- 
						 --><input name="ofc_nm" id="ofc_nm" type="text" class="L_input_R" id="user_nm" style="width:180px;" readOnly tabindex="-1" />
					</td>
	                <th><bean:message key="Warehouse"/></th>
					<td>
						<bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
						<bean:define id="WhList" name="cdMap" property="WH_LIST"/>
						<select name="wh_cd" id="wh_cd" class="search_form" style="width: 195px;" required onchange="check_authority_wh();">
							<option value=''></option>
							<logic:iterate id="WhVO" name="WhList">
								<option value='<bean:write name="WhVO" property="wh_cd"/>'><bean:write name="WhVO" property="wh_nm"/></option>
							</logic:iterate>
						</select>
					</td>
					<th><bean:message key="Contract_No"/></th>
					<td>
						<input name="ctrt_no" id="ctrt_no" type="text" class="L_input" style="width:80px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" otherchar="-_" onBlur="strToUpper(this);getCtrtInfo(this, '')" maxlength="10" OnKeyDown="if(event.keyCode==13){getCtrtInfo(this, '');}" required/><!-- 						
						 --><button type="button" name="btn_ctrt_no" id="btn_ctrt_no"  onclick="doWork('btn_ctrt_no')" class="input_seach_btn" tabindex="-1" onclick=""></button><!-- 
						 --><input name="ctrt_nm" id="ctrt_nm" type="text" class="L_input" style="width:110px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" otherchar = " ()-_" onBlur="strToUpper(this);" onKeyDown="if(event.keyCode==13){CtrtPopup();}" required/><!-- 
						 --><input name="rtp_no" id="rtp_no" type="hidden" />	
					</td>						
				</tr>  
				<tr>
					<th><bean:message key="SELL/BUY"/></th>
					<td>
						<select name="sb_cls_cd" id="sb_cls_cd" class="search_form">
							<option value='ALL'>All</option>
							<option value='S'>SELL</option>
							<option value='B'>BUY</option>
						</select>
					</td>
					<th><bean:message key="Type"/></th>
					<td>
						<bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
						<bean:define id="MsList" name="cdMap" property="rate_tp_cd"/>
						<select name="rate_tp_cd" id="rate_tp_cd" class="search_form">
							<option value='ALL'>All</option>
							<logic:iterate id="codeVO" name="MsList">
								<option value='<bean:write name="codeVO" property="code"/>'><bean:write name="codeVO" property="name"/></option>
							</logic:iterate>
						</select>
					</td>
					<th><bean:message key="Billing_Customer"/></th>
					<td>
						<select name="cust_cd" id="cust_cd" class="search_form"  style="ime-mode:disabled;width:50px;text-align:left" onChange = "cust_cd_OnChange()">
							<option value='ALL'>All</option>
						</select>
						<input type="hidden" id="cust_cd_arr" name="cust_cd_arr"/>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>	
	<p class="line_bluedot"></p>
	<div class="opus_design_grid">
	
		<div class="opus_design_inquiry">
			<table>
            	<colgroup>
					<col width="90">
					<col width="110">
					<col width="110">
					<col width="80">
					<col width="60">
					<col width="150">
					<col width="100">
					<col width="80">
					<col width="*">
				</colgroup>
				<tbody>
					<tr>
						<th><bean:message key="Booking_No"/></th>
						<td><input name="dis_bk_no" id="dis_bk_no" type="text" class="L_input_R" style="width:100px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);" readOnly tabindex="-1" /></td>
						<th><bean:message key="Booking_Amount"/></th>
						<td><input name="dis_bk_amount" id="dis_bk_amount" type="text" class="L_input_R" dataformat="float" style="width:80px;" readOnly tabindex="-1" /></td>
						<th><bean:message key="Freight"/></th>
						<td><input name="dis_frt_cd" id="dis_frt_cd" type="text" class="L_input_R" style="width:75px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);" readOnly tabindex="-1" /><!-- 
							 --><input name="dis_frt_nm" id="dis_frt_nm" type="text" class="L_input_R" id="user_nm" style="width:150px;" readOnly tabindex="-1" />
						</td>
						<th><bean:message key="Total_Amount"/></th>
						<td><input name="dis_frt_amt" id="dis_frt_amt" type="text" class="L_input_R" dataformat="float" style="width:80px;" readOnly tabindex="-1" /></td>
						<th align="right">
							<input type="checkbox" id="checkAmtSheetInfoShow" name="checkAmtSheetInfoShow" onclick="chngAmtInfo();" /><label for="checkAmtSheetInfoShow"><bean:message key="Amount_Info"/></label>
							&nbsp;
							<div class="opus_design_btn">
							<!-- LKH 2016.07.21 -->
								<button type="button" class="btn_normal" id="btn_show" name="btn_show" onClick="btn_Show('PLUS')" style="display:inline"><bean:message key="Plus"/></button>
								<button type="button" class="btn_normal" id="btn_hide" name="btn_show" onClick="btn_Show('MINUS')" style="display:inline"><bean:message key="Minus"/></button>
				
								<!-- <button type="button" class="btn_normal"  onClick="btn_Create();" id="btn_create" name="btn_create"><bean:message key="Create"/></button>
								 --><button type="button" class="btn_normal"  onClick="btn_Add();" id="btn_add" name="btn_add"><bean:message key="Add"/></button><!-- 
								 --><button type="button" class="btn_normal"  onClick="btn_Del();" id="btn_del" name="btn_del"><bean:message key="Del"/></button>
							</div>
						</th>
					</tr>
				</tbody>
			</table>
		</div>
		<script type="text/javascript">comSheetObject('sheet1');</script>
	</div>
	<div id="create_popup" style="position:absolute; display: none;margin-top:0px;margin-left:735px;height:95px;width:180px;border-radius: 4px; border: solid 1 px #b7d6f8; background-color: #dceeff; right: 145px; top: 190px;">
		<div class="opus_design_inquiry">
			<table>
				<colgroup>
					<col width="20">
					<col width="*">
				</colgroup>
				<tbody>
					<tr>
						<td></td>
						<td style="height:5px;"></td>
					</tr> 
					<tr>
						<td></td>
						<td><input type="radio" name="create_popup_type" id="create_popup_type1" value="F" checked></input><label for="create_popup_type1">Foreground</label>
						</td>
					</tr>
					<tr>
						<td></td>	
						<td><input type="radio" name="create_popup_type" id="create_popup_type2" value="B"></input><label for="create_popup_type2">Background</label>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div style="height:5px;"></div>
		<div style="text-align:center;">
			 <button type="button" class="btn_normal" onClick="btn_Create_Popup_OK()"><bean:message key="OK"/></button><!-- 
		  --><button type="button" class="btn_normal" onClick="btn_Create_Popup_Close()"><bean:message key="Close"/></button>
		</div>
	</div>
</div>
</div>
</form>

<script type="text/javascript">
var attr_extension = "<%= roleBtnVO.getAttr_extension() %>";
doBtnAuthority(attr_extension);
</script>
