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
    <script type="text/javascript" src="./apps/fis/wms/common/js/WHInPrintOption.js?ver=<%=CLT_JS_VER%>"></script>
<%

//UserInfoDto userInfo = (UserInfoDto) session.getAttribute("AbstractAccountInfo");
//String CLT_PATH = ".";

String req_wib_bk_no   = "";
String req_letter_yn   = "";

try {
	req_wib_bk_no   = request.getParameter("wib_bk_no")== null?"":request.getParameter("wib_bk_no");
	req_letter_yn   = request.getParameter("letter_yn")== null?"":request.getParameter("letter_yn");
	
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
<input type="hidden" id="wib_bk_no" name="wib_bk_no" value="<%= req_wib_bk_no %>"/>
<input type="hidden" id="letter_yn" name="letter_yn" value="<%= req_letter_yn %>"/>
 <!-- Print -->
<input type="hidden" name="file_name">
<input type="hidden" name="title">
<input type="hidden" name="rd_param">
<div class="layer_popup_title">
<div class="page_title_area clear">
	<div class="opus_design_btn">
		 	<button id="btnPrint" type="button" 	class="btn_normal" onclick="doWork('PRINT')"><bean:message key="Print"/></button><!-- 
		  --><button id="btnClose" type="button"  	class="btn_normal" onclick="doWork('CLOSE')"><bean:message key="Close"/></button>
	</div>
</div>
</div>
<div class="layer_popup_contents">
	<div class= "wrap_search">
	<h2 class="title_design">Print Option</h2>
	<div class="opus_design_inquiry ">
		<table id="mainTable_sheet1" border="0"> 
	   	 <colgroup>
           <col width="100" />
           <col width="150" />
         </colgroup>
         <tbody>
        	<tr><td style="height:30px" colspan="2"><input type="checkbox" id="chOption1" name="chOption1"/><label for= "chOption1">Warehouse Inbound Sheet</label></td></tr>
			<tr><td style="height:30px" colspan="2"><input type="checkbox" id="chOption2" name="chOption2"/><label for = "chOption2">Unloading Work Sheet</label></td></tr>
			<tr><td style="height:30px" colspan="2"><input type="checkbox" id="chOption3" name="chOption3" checked="true"/><label for = "chOption3" >Inbound Inspection Sheet</label></td></tr>
			<tr></tr>
         </tbody>
    	</table>
	</div>
	</div>
</div>
</form>

