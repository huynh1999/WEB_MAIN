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
    <script type="text/javascript" src="./apps/fis/whm/history/script/HSTPrint.js?ver=<%=CLT_JS_VER%>"></script>
<%

//UserInfoDto userInfo = (UserInfoDto) session.getAttribute("AbstractAccountInfo");
//String CLT_PATH = ".";

String wh_nm   = "";
String cust_nm   = "";
String cust_cd   = "";
String wh_cd   = "";

try {
	wh_nm   = request.getParameter("wh_nm")== null?"":request.getParameter("wh_nm");
	wh_cd   = request.getParameter("wh_nm")== null?"":request.getParameter("wh_cd");
	cust_nm   = request.getParameter("cust_nm")== null?"":request.getParameter("cust_nm");
	cust_cd   = request.getParameter("cust_nm")== null?"":request.getParameter("cust_cd");
	
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
</script>

<form id="form" name="form">
<input type="hidden" id="paper_size" name="paper_size" value="A4" />
 <!-- Print -->
<input type="hidden" name="file_name">
<input type="hidden" name="title">
<input type="hidden" name="rd_param">
<input type="hidden" name="wh_cd" value="<%=wh_cd%>">
<input type="hidden" name="cust_cd" value="<%=cust_cd%>">
<input type="hidden" name="ofc_cd" value="<%=userInfo.getOfc_cd()%>" />
<div class="layer_popup_title">
<div class="page_title_area clear">
<h2 class="page_title"><span>Closing History Print</span></h2>
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
           <col width="200" />
           <col width="150" />
           <col width="*" />
         </colgroup>
         <tbody>
         	<tr>
         	<th><bean:message key="Warehouse"/></th>
			<td>	
			<input type="text"  name="wh_nm" id="wh_nm" value="<%=wh_nm%>" style="width:194px" readonly="readonly">
			</td>
         	<th>Customer Name</th>
			<td>	
			<input type="text"  name="cust_nm" id="cust_nm" value="<%=cust_nm%>" style="width:194px" readonly="readonly">
			</td>
			</tr>
			
         	<tr>
         	<th>Date Closing</th>
			<td>	
			<input type="text" name="fm_date" id="fm_date" class="L_input" style="width:75px;" dataformat="mdy" maxlength="10" onkeyup="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" 
			onblur="chkCmprPrd(firCalFlag, false, this, this, form.to_date);firCalFlag=false;" onkeypress="onlyNumberCheck();" required="required"><!-- 
			
				  --><span class="dash">~</span><!--  
				  
				  --><input style="width:75px" type="text" name="to_date" id="to_date" onkeyup="mkDateFormatType(this,event,false,1);if(event.keyCode==13){firCalFlag=true;};" 
				  onblur="chkCmprPrd(firCalFlag, false, this, form.fm_date, this);firCalFlag=false;" onkeypress="onlyNumberCheck();" required="required"><!-- 
				 --><button type="button" class="calendar" tabindex="-1" name="btn_bk_date_to" id="btn_bk_date_to"  onclick="doDisplay('DATE11', form);"></button>
			</td>
			<th></th>
			<td></td>
			</tr>
			<tr>
			<th><bean:message key="Remark"/></th>
			<td colspan="3">
			<textarea name="rmk" class="search_form autoenter_50" dataformat="excepthan" style="width:547px;height:150px;" wrap="off"></textarea>
			</td>
			</tr>
         </tbody>
    	</table>
	</div>
	</div>
</div>
</form>

