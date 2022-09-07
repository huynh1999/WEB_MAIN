<%
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : SalesPicPopup.jsp
*@FileTitle  : SalesPicPopup
*@author     : CLT
*@version    : 1.0
*@since      : 2014/10/21
=========================================================*/
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
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoMessage.js?ver=<%=CLT_JS_VER%>"></script>
    
	<script type="text/javascript" src="./js/common/message/<%=CLT_MSG_PATH%>/WMS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script> 	
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="./apps/fis/wms/common/js/SalesPicPopup.js?ver=<%=CLT_JS_VER%>"></script>
<%
	//UserInfoDto userInfo = (UserInfoDto) session.getAttribute("AbstractAccountInfo");

 	String org_cd  = "";
	String pic_cd  = "";
	String pic_nm  = "";	

	String sales_act_no = "";
	String act_ver 		= "";
	String chg_flg 		= "";

	try {
// 		org_cd = request.getParameter("org_cd") == null ? "" : request.getParameter("org_cd");

// 		pic_cd = request.getParameter("pic_cd") == null ? "" : request.getParameter("pic_cd");
// 		pic_nm = request.getParameter("pic_nm") == null ? "" : request.getParameter("pic_nm");
// 		sales_act_no = request.getParameter("sales_act_no") == null ? "" : request.getParameter("sales_act_no");
// 		act_ver = request.getParameter("act_ver") == null ? "" : request.getParameter("act_ver");
// 		chg_flg = request.getParameter("chg_flg") == null ? "" : request.getParameter("chg_flg");

		if(org_cd==null){
			org_cd = "";
		} 
		if(pic_cd==null){
			pic_cd = "";
		} 
		if(pic_nm==null){
			pic_nm = "";
		} 

		if(sales_act_no==null){
			sales_act_no = "";
		}
		if(act_ver==null){
			act_ver = "";
		}
		if(chg_flg==null){
			chg_flg = "";
		}
	}catch(Exception e) {
		out.println(e.toString());
	}	
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

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
<input type="hidden" id="f_cmd" value="0" />
<input type="hidden" name="sales_act_no" value="<%=sales_act_no%>" id="sales_act_no" />
<input type="hidden" name="act_ver" value="<%=act_ver%>" id="act_ver" />
<input type="hidden" name="chg_flg" value="<%=chg_flg%>" id="chg_flg" />
<%-- <input type="hidden" name="org_cd" value="<%=userInfo.getOfc_cd()%>" id="org_cd" /> --%>
<%-- <input type="hidden" name="pic_cd" value="<%=pic_cd%>" id="pic_cd" /> --%>
<%-- <input type="hidden" name="pic_nm" value="<%=pic_nm%>" id="pic_nm" /> --%>

<div class="layer_popup_title">

<!-- page_title_area(S) -->
<div class="page_title_area clear">

	<!-- page_title(S) -->
	<h2 class="page_title"><span><bean:message key="Sales_PIC_Popup"/></span></h2>
	<!-- page_title(E) -->
	
	<!-- opus_design_btn(S) -->
	<div class="opus_design_btn">
		<button type="button" class="btn_accent" name="btn_search" id="btn_search" onClick="doWork('btn_search');"><bean:message key="Search"/></button><!-- 
		 --><div id="btn_layer" style="display:none"><button type="button" class="btn_normal" name="btn_ok" id="btn_ok" onClick="doWork('btn_ok');"><bean:message key="OK"/></button></div><!-- 	
		 --><button type="button" class="btn_normal" name="btn_close" id="btn_close" onClick="doWork('btn_close');"><bean:message key="Close"/></button>
	</div>
	<!-- opus_design_btn(E) -->	

	<!-- page_location(S) -->
	<div class="location">	
		<span id="navigation"></span>
	</div>
	<!-- page_location(E) -->
	
</div>
<!-- page_title_area(E) -->
</div>

<div class="layer_popup_contents">  
<div class="wrap_search">
<!-- opus_design_inquiry(S) -->
	<div class="opus_design_inquiry entry_pannel">
		<table>
			<colgroup>
				<col width="110"/>
				<col width="*" />				
			</colgroup> 
			<tbody>
                <tr>
					<th><bean:message key="Sales_Branch"/></th>
					<td><input name="org_cd" type="text" class="L_input" id="org_cd" style="text-transform:uppercase;" dataformat="han"  value="<%=org_cd%>" /></td>
				</tr>
                <tr>
					<th><bean:message key="Sales_PIC_ID"/></th>
					<td><input name="picCd" type="text" class="L_input" id="textfield" style="text-transform:uppercase;" dataformat="han"  value="<%=pic_cd%>"  /></td>
				</tr>
                <tr>
					<th><bean:message key="Sales_PIC_Name"/></th>
					<td><input name="picNm" type="text" class="L_input" id="textfield" style="text-transform:uppercase;" dataformat="han" otherchar=" /\.,*'-" value="<%=pic_nm%>"  /></td>
				</tr>
			</tbody>
		</table>
	</div>
	<!-- opus_design_inquiry(E) -->
</div>
<div class="wrap_result">
	
	<!-- opus_design_grid(S) -->
	<div class="opus_design_grid">	
			
		<script type="text/javascript">comSheetObject('sheet1');</script>		
	</div>
	<!-- opus_design_grid(E) --> 
</div>
</div>

</form>

<%@include file="/apps/fis/wms/bizcommon/include_common.jsp"%>

