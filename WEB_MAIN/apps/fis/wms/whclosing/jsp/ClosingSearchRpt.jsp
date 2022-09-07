<%
/*=========================================================
*Copyright(c) 2013 CyberLogitec
*@FileName : WHInPrintOption.jsp
*@FileTitle  : 
*@author     : kiet.tran - DOU Network
*@version    : 1.0
*@since      : 2015/04/21
* 
* History
=========================================================
//TODO MJY : WHICPrintOption.jsp Print Option
// 2014.02.07 Sun-Jung YOON : Print Size 추가
*/
%>
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
    <script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SAL_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="./apps/fis/wms/whclosing/script/ClosingSearchRpt.js?ver=<%=CLT_JS_VER%>"></script>
    
<%

//UserInfoDto userInfo = (UserInfoDto) session.getAttribute("AbstractAccountInfo");
//String CLT_PATH = ".";

String ofc_cd   = "";
String ofc_nm   = "";
String ctrt_no  = "";
String ctrt_nm  = "";
String cust_cd  = "";
String cust_nm  = "";
String closing_no  = "";
String fm_cls_date = "";
String to_cls_date = "";
String wh_cd    = "";
String sb_cd    = "";
String tp_cd    = "";
String st_cd    = "";

try {
	ofc_cd   = request.getParameter("ofc_cd")== null?"":request.getParameter("ofc_cd");
	ofc_nm   = request.getParameter("ofc_nm")== null?"":request.getParameter("ofc_nm");
	ctrt_no  = request.getParameter("ctrt_no")== null?"":request.getParameter("ctrt_no");
	ctrt_nm  = request.getParameter("ctrt_nm")== null?"":request.getParameter("ctrt_nm");
	cust_cd  = request.getParameter("cust_cd")== null?"":request.getParameter("cust_cd");
	cust_nm  = request.getParameter("cust_nm")== null?"":request.getParameter("cust_nm");
	closing_no   = request.getParameter("closing_no")== null?"":request.getParameter("closing_no");
	fm_cls_date  = request.getParameter("fm_cls_date")== null?"":request.getParameter("fm_cls_date");
	to_cls_date  = request.getParameter("to_cls_date")== null?"":request.getParameter("to_cls_date");
	wh_cd    = request.getParameter("wh_cd")== null?"":request.getParameter("wh_cd");
	sb_cd    = request.getParameter("sb_cd")== null?"":request.getParameter("sb_cd");
	tp_cd    = request.getParameter("tp_cd")== null?"":request.getParameter("tp_cd");
	st_cd    = request.getParameter("st_cd")== null?"":request.getParameter("st_cd");
	
}catch(Exception e) {
	out.println(e.toString());
}	

%>

<bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
<bean:define id="rate_tp_cd" name="cdMap" property="rate_tp_cd"/>
<bean:define id="sts_cd" name="cdMap" property="sts_cd"/>
<bean:define id="wh_combo" name="cdMap" property="wh_combo"/>

<script type="text/javascript">
	var rate_tp_cdCode = "";
	var rate_tp_cdText = "";
	
	var sts_cdCode = "";
	var sts_cdText = "";
	
	var wh_comboCode = "";
	var wh_comboText = "";
	
	<logic:iterate id="codeVO" name="rate_tp_cd">
		rate_tp_cdCode+= '<bean:write name="codeVO" property="code"/>' + '|';
		rate_tp_cdText+= '<bean:write name="codeVO" property="name"/>' + '|';
	</logic:iterate>
	
	<logic:iterate id="codeVO" name="sts_cd">
		sts_cdCode+= '<bean:write name="codeVO" property="code"/>' + '|';
		sts_cdText+= '<bean:write name="codeVO" property="name"/>' + '|';
	</logic:iterate>
	
	<logic:iterate id="ClosingSearchVO" name="wh_combo">
		wh_comboCode+= '<bean:write name="ClosingSearchVO" property="wh_cd"/>' + '|';
		wh_comboText+= '<bean:write name="ClosingSearchVO" property="wh_nm"/>' + '|';
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
</script>
<form id="form" name="form">
<input type="hidden" id="paper_size" name="paper_size" value="A4" />
 <!-- Print -->
<input type="hidden" name="file_name">
<input type="hidden" name="title">
<input type="hidden" name="rd_param">

<input type="hidden" name="wh_cd" value="<%=wh_cd%>">
<input type="hidden" name="sb_cd" value="<%=sb_cd%>">
<input type="hidden" name="tp_cd" value="<%=tp_cd%>">
<input type="hidden" name="st_cd" value="<%=st_cd%>">

<div class="layer_popup_title">
<div class="page_title_area clear">
<h2 class="page_title"><span>Closing List Print</span></h2>
	<div class="opus_design_btn">
		 	<button id="btnPrint" type="button" 	class="btn_accent" onclick="doWork('PRINT')"><bean:message key="Print"/></button><!-- 
		  --><button id="btnClose" type="button"  	class="btn_normal" onclick="doWork('CLOSE')"><bean:message key="Close"/></button>
	</div>
</div>
</div>
<div class="layer_popup_contents">
	<div class= "wrap_search">
	<h2 class="title_design">Print Information</h2>
	<div class="opus_design_inquiry ">
		<table id="mainTable_sheet1" border="0"> 
	   	 <colgroup>
           <col width="100" />
           <col width="220" />
           <col width="100" />
           <col width="220" />
           <col width="100" />
           <col width="*" />
         </colgroup>
         <tbody>
         	<tr>
				<th><bean:message key="Office"/></th>
				<td>
					<input name="ofc_cd" id="ofc_cd" type="text" value="<%=ofc_cd%>" class="L_input" style="width:80px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);codeNameAction('office','onBlur');" maxlength="10" onkeypress="if(event.keyCode==13){codeNameAction('office', 'onKeyDown');}"/><!--
				--><button type="button" name="btn_ofc_cd" id="btn_ofc_cd" class="input_seach_btn" tabindex="-1" onClick="doWork('btn_ofc_cd');"></button><!--
				--><input name="ofc_nm" id="ofc_nm" type="text" value="<%=ofc_nm%>" class="L_input_R" style="width:122px;" readonly />
				</td>
				<th><bean:message key="Contract_No"/></th>
				<td>
					<input name="ctrt_no" id="ctrt_no" type="text" value="<%=ctrt_no%>" class="L_input" style="width:80px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" otherchar="-_" onBlur="strToUpper(this);searchTlCtrtInfo();" maxlength="10" OnKeyDown="if(event.keyCode==13){CtrtPopup();}"/><!--
				--><button type="button" name="btn_ctrt_no" id="btn_ctrt_no" class="input_seach_btn" tabindex="-1" onClick="doWork('btn_ctrt_no');"></button><!--						
				--><input name="ctrt_nm" id="ctrt_nm" type="text" value="<%=ctrt_nm%>" class="L_input" style="width:122px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" otherchar = " ()-_" onBlur="strToUpper(this);" onKeyDown="if(event.keyCode==13){CtrtPopup();}"/>
				</td>
				<th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<bean:message key="Billing_Customer"/></th>
				<td>
					<input name="cust_cd" id="cust_cd" type="text" value="<%=cust_cd%>" class="L_input" style="width:80px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);codeName('CUSTUMER',this, 'onBlur');" maxlength="10" onkeypress="if(event.keyCode==13){codeName('CUSTUMER',this, 'onKeyDown');}"/><!--
				--><button type="button" name="btn_cust_cd" id="btn_cust_cd" class="input_seach_btn" tabindex="-1" onClick="doWork('btn_cust_cd');"></button><!--
				--><input name="cust_nm" id="cust_nm" type="text" value="<%=cust_nm%>" class="L_input" style="width:122px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);" maxlength="50" onKeyDown="if(event.keyCode==13){CustomerPopup();}" />
				</td>
			</tr>
			
         	<tr>
				<th><bean:message key="Closing_No"/></th>
				<td>
					<input name="closing_no" otherchar = "-_" id = "closing_no" value="<%=closing_no%>" type="text" class="L_input" style="width:215px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" onBlur="strToUpper(this);" maxlength="14" />
				</td>
				<th><bean:message key="Closing_Month"/></th>
				<td>
					<input name="fm_cls_date" type="text" value="<%=fm_cls_date%>" maxlength="7" style="width:80px;" id="fm_cls_date" onkeypress="onlyNumberCheck();" onblur="checkDateType(this,this,3,form.to_cls_date)" onkeyup="addSeperator(this, event, false,1)" required><!-- 
					 --><button class="calendar" type="button" name="btn_fm_cls_date" id="btn_fm_cls_date" onClick="doWork('btn_fm_cls_date');"></button><!-- 
					 --><span class="dash">~</span><!-- 
					 --><input name="to_cls_date" type="text" value="<%=to_cls_date%>" maxlength="7" style="width:80px;"  id="to_cls_date" onkeypress="onlyNumberCheck();" onblur="checkDateTypes(this,this,3,form.fm_cls_date)" onkeyup="addSeperator(this, event, false,1)" required><!-- 
					 --><button class="calendar" type="button" name="btn_to_cls_date" id="btn_to_cls_date" onClick="doWork('btn_to_cls_date');"></button>
				</td>
				<th><bean:message key="Warehouse"/></th>
				<td>
					<select name="wh_combo" id="wh_combo" style="width: 235px;">
	        			
           			</select>
				</td>
			</tr>
			<tr>
				<th><bean:message key="SELL/BUY"/></th>
					<td>
					<select id="sb_cls_cd" name="sb_cls_cd" style="width: 70px;">
						<option value="ALL">ALL</option>
						<option value="S">SELL</option>
						<option value="B">BUY</option>
					</select>
				</td>
				<th><bean:message key="Type"/></th>
				<td>
					<select name="rate_tp_cd" id="rate_tp_cd" style="width: 80px;">
	        			
           				</select>
				</td>
				<th><bean:message key="Status"/></th>
				<td>
					<select name="sts_cd" id="sts_cd" style="width: 80px;">
	        			
           				</select>
				</td>
			</tr>
			<tr>
			<th><bean:message key="Remark"/></th>
			<td colspan="6">
			<textarea name="rmk" class="search_form autoenter_50" dataformat="excepthan" style="width:940px;height:150px;" wrap="off"></textarea>
			</td>
			</tr>
         </tbody>
    	</table>
	</div>
	</div>
</div>
</form>

