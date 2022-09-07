<%
/*--=========================================================
 *Copyright(c) 2014 CyberLogitec. All Rights Reserved.
 *@FileName   : WHInPackDefPopup.jsp
 *@FileTitle  : Pack Unit definition Popup
 *@author     : TanPham - DOU Network
 *@version    : 1.0
 *@since      : 2015/04/22
 =========================================================--*/
		 
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
    <script type="text/javascript" src="./apps/fis/wms/common/js/WHInPackDefPopup.js?ver=<%=CLT_JS_VER%>"></script>
    
	<script type="text/javascript" src="./js/common/message/<%=CLT_MSG_PATH%>/WMS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
<%

	String ctrt_no = "";
	String ctrt_nm = "";
	String item_cd = "";
	String fix_lot_id = "";
	String inbound_dt = "";

	try {
		ctrt_no = request.getParameter("ctrt_no") == null ? "" : request.getParameter("ctrt_no");
		ctrt_nm = request.getParameter("ctrt_nm") == null ? "" : request.getParameter("ctrt_nm");
		item_cd = request.getParameter("item_cd") == null ? "" : request.getParameter("item_cd");
		fix_lot_id = request.getParameter("fix_lot_id") == null ? "" : request.getParameter("fix_lot_id");
		inbound_dt = request.getParameter("inbound_dt") == null ? "" : request.getParameter("inbound_dt");
	} catch (Exception e) {
		out.println(e.toString());
	}
%>

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
<input type="hidden" name="f_cmd">


<!-- page_title_area(S) -->
<div class="page_title_area clear">
	<!-- page_title(S) -->
	<h2 class="page_title"><span><bean:message key="Pack_Unit_Definition"/></span></h2>
	<!-- page_title(E) -->
	<!-- opus_design_btn(S) -->
	<div class="opus_design_btn">
			<button type="button" class="btn_normal" name="btnSave" id="btnSave" onClick="doWork('SAVE');"><bean:message key="Save"/></button><!-- 
		  --><button type="button" class="btn_normal" name="btn_Close" id="btn_Close" onClick="doWork('CLOSE');"><bean:message key="Close"/></button><!--
	 --></div>
	<!-- opus_design_btn(E) -->
</div>

<div class= "wrap_search">
<div class="opus_design_inquiry ">
	<table>
    	<colgroup>
  			   <col width="100" />
               
               <col width="*"/>
		</colgroup>    
		<tbody>        	
                <tr>		        
			        <th><bean:message key="Contract"/></th>
			        <td>
						<input name="ctrt_no" dataformat="engup" otherchar="-_" type="text" class="L_input_R" id="ctrt_no" value="<%=ctrt_no%>" style="width:80px;" readonly/><!-- 
						 --><input name="ctrt_nm" type="text" dataformat="engup" otherchar = " ()-_" class="L_input_R" id="ctrt_nm" value="<%=ctrt_nm%>" style="width:150px;" readonly/>
					</td>
			     
			       
		        </tr>
		        
			</tbody>
	</table>
</div>
</div>
<div class="wrap_result">
		<div class= "opus_design_grid" style="margin-bottom:8px;">
			<script type="text/javascript">comSheetObject('sheet1');</script>
		</div>
</div>
</form>

<%@include file="/apps/fis/wms/bizcommon/include_common.jsp"%>