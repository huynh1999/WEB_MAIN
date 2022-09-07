
<%--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : WHOCUpdateFileUploadPopup.jsp
*@FileTitle  : OB Complete Update - File Upload
*@author     : Nam.Tran - DOU Network
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
    <script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/MDM_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="./apps/fis/wms/common/js/WHOCUpdateFileUploadPopup.js?ver=<%=CLT_JS_VER%>"></script>
    
    <logic:notEmpty name="EventResponse">
    	<logic:notEmpty name="EventResponse" property="mapVal">
    	
    		<bean:define id="mapVal" name="EventResponse" property="mapVal"/>
    		
    		<script type="text/javascript">
		
					var uploadFlag = '<bean:write name="mapVal" property="res"/>';
					var div = '<bean:write name="mapVal" property="div"/>';
				
					if(uploadFlag != undefined && uploadFlag != "undefined" && uploadFlag == "OK"){
						ComClosePopup(div);
					}
				
			</script>
			
    	</logic:notEmpty>
	</logic:notEmpty>
    
<%
	//String CLT_PATH 	= ".";
	//구분자
	String div			= ""; //구분자   by booking : bk    by loadplan : lp
	
	//bk, lp별 따로 들어오는 값
	String wob_out_no 	= ""; //by booking complete no (bk)
	String walc_no 		= ""; //할당번호 (bk)
	String lp_no		= ""; //load plan no (lp)
	
	//공통
	String wob_bk_no 	= ""; //booking no(bk, lp)
	String sao_sys_no 	= ""; //sao sys no(bk, lp)
	String po_sys_no 	= ""; //po_sys_no(bk, lp)
	String item_sys_no 	= ""; //item_sys_no(bk, lp)
	String lot_id 		= ""; //lot_id(bk, lp)
	String wh_loc_cd 	= ""; //wh_loc_cd(bk, lp)
	String wib_bk_no    = ""; //wib_bk_no(bk, lp)
	String item_seq 	= ""; //item_seq(bk, lp)
	
	try {
		div 		= request.getParameter("div")== null?"":request.getParameter("div");
		wob_out_no 	= request.getParameter("wob_out_no")== null?"":request.getParameter("wob_out_no");
		walc_no 	= request.getParameter("walc_no")== null?"":request.getParameter("walc_no");
		lp_no 		= request.getParameter("lp_no")== null?"":request.getParameter("lp_no");
		wob_bk_no 	= request.getParameter("wob_bk_no")== null?"":request.getParameter("wob_bk_no");
		sao_sys_no 	= request.getParameter("sao_sys_no")== null?"":request.getParameter("sao_sys_no");
		po_sys_no 	= request.getParameter("po_sys_no")== null?"":request.getParameter("po_sys_no");
		item_sys_no = request.getParameter("item_sys_no")== null?"":request.getParameter("item_sys_no");
		lot_id 		= request.getParameter("lot_id")== null?"":request.getParameter("lot_id");
		wh_loc_cd 	= request.getParameter("wh_loc_cd")== null?"":request.getParameter("wh_loc_cd");
		wib_bk_no   = request.getParameter("wib_bk_no")== null?"":request.getParameter("wib_bk_no");
		item_seq 	= request.getParameter("item_seq")== null?"":request.getParameter("item_seq");
		
		
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
<form id="form" name="form" method="POST" action="./WHOCUpdateFileUploadPopup.clt" enctype="multipart/form-data">
 <input type="hidden" name="f_cmd"/>
<input type="hidden" id="div" name="div" value="<%=div%>"/>
<input type="hidden" id="wob_out_no" name="wob_out_no" value="<%=wob_out_no%>"/>
<input type="hidden" id="walc_no" name="walc_no" value="<%=walc_no%>"/>
<input type="hidden" id="lp_no" name="lp_no" value="<%=lp_no%>"/>
<input type="hidden" id="wob_bk_no" name="wob_bk_no" value="<%=wob_bk_no%>"/>
<input type="hidden" id="sao_sys_no" name="sao_sys_no" value="<%=sao_sys_no%>"/>
<input type="hidden" id="po_sys_no" name="po_sys_no" value="<%=po_sys_no%>"/>
<input type="hidden" id="item_sys_no" name="item_sys_no" value="<%=item_sys_no%>"/>
<input type="hidden" id="lot_id" name="lot_id" value="<%=lot_id%>"/>
<input type="hidden" id="wh_loc_cd" name="wh_loc_cd" value="<%=wh_loc_cd%>"/>
<input type="hidden" id="wib_bk_no" name="wib_bk_no" value="<%=wib_bk_no%>"/>
<input type="hidden" id="item_seq" name="item_seq" value="<%=item_seq%>"/>

<div class="layer_popup_title">
	<!-- page_title(S) -->
	<h2 class="page_title"><span><bean:message key="OB_Complete_Update_File_Upload"/></span></h2>
	<!-- page_title(E) -->
	<!-- opus_design_btn(S) -->
	<div class="opus_design_btn">
		<button type="button" class="btn_accent" name="btn_Close" id="btn_Close" onClick="doWork('CLOSE');"><bean:message key="Close"/></button>
	</div>
	<!-- opus_design_btn(E) -->
</div>
<div class="layer_popup_contents">
	<div class= "wrap_search">
		<div class="opus_design_inquiry entry_pannel">
			<table>
				<colgroup>
					<col width="50" />
					<col width="*" />
				</colgroup>
				<tbody>					
					<tr>
						<th><bean:message key="File_Path"/></th>
						<td>
						
		               <div id="logo_rec_id" style="display: none;"><!--
		                --></div><!--
		                --><input tabindex = "-1" type="file" name="logo_rectangle"  size="25"/><!--
		                --><input name="logo_rec_flg" type="checkbox" value="Y"  style="display: none">
							<%-- <input name="file_path" type="text" class="L_input_R" style="width:400px;"  tabindex="-1" readonly />
							<img src="<%=CLT_PATH%>/web/images/common/icon_file.gif" name="btn_file_path"  id="btn_file_path"  onclick="btn_File_Path()" /> --%>
							<button type="button" class="btn_etc" name="btn_file_upload" id="btn_file_upload" onClick="doWork('btn_file_upload');">File Upload</button>
							
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>

<!-- opus_design_inquiry(E) -->
	<div class="wrap_result">
	<!-- opus_design_grid(S) -->
	<div class="opus_design_grid clear" style="display:none">
		<script type="text/javascript">comSheetObject('sheet1');</script>
	</div>
	</div>
</div>
</form>
<%-- <%@include file="/business/oms/bizcommon/include_common.jsp"%> --%>
