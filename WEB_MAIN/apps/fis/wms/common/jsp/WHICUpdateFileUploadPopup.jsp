<%
/*--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : WHICUpdateFileUpload.jsp
*@FileTitle  : IB Complete Update - File Upload
*@author     : Kieu.Le - DOU Network
*@version    : 1.0
*@since      : 2015/04/20
=========================================================--*/
%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoFormControl.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/ModalCalendar.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="./apps/fis/wms/common/js/WHICUpdateFileUploadPopup.js?ver=<%=CLT_JS_VER%>"></script>
    <logic:notEmpty name="EventResponse">
    	<logic:notEmpty name="EventResponse" property="mapVal">
    	
    		<bean:define id="mapVal" name="EventResponse" property="mapVal"/>
    		
    		<script type="text/javascript">
		
					var uploadFlag = '<bean:write name="mapVal" property="res"/>';
					var div = '<bean:write name="mapVal" property="div"/>';
				
					if(uploadFlag != undefined && uploadFlag != "undefined" && uploadFlag == "OK"){
						ComClosePopup();
					}
				
			</script>
			
    	</logic:notEmpty>
	</logic:notEmpty>
<%
	String wib_bk_no 	= ""; //booking no
	String wib_in_no 	= ""; //complete no
	String po_sys_no 	= ""; //po_sys_no
	String item_sys_no 	= ""; //item_sys_no
	String item_seq 	= ""; //item_seq
	try {
		wib_bk_no 	= request.getParameter("wib_bk_no")== null?"":request.getParameter("wib_bk_no");
		wib_in_no 	= request.getParameter("wib_in_no")== null?"":request.getParameter("wib_in_no");
		po_sys_no 	= request.getParameter("po_sys_no")== null?"":request.getParameter("po_sys_no");
		item_sys_no = request.getParameter("item_sys_no")== null?"":request.getParameter("item_sys_no");
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
<form id="form" name="form" method="POST" action="./WHICUpdateFileUploadPopup.clt" enctype="multipart/form-data" >
<input type="hidden" name="f_cmd">
<input type="hidden" id="wib_bk_no" name="wib_bk_no" value="<%=wib_bk_no%>"/>
<input type="hidden" id="wib_in_no" name="wib_in_no" value="<%=wib_in_no%>"/>
<input type="hidden" id="po_sys_no" name="po_sys_no" value="<%=po_sys_no%>"/>
<input type="hidden" id="item_sys_no" name="item_sys_no" value="<%=item_sys_no%>"/>
<input type="hidden" id="item_seq" name="item_seq" value="<%=item_seq%>"/>

<div class="layer_popup_title">
 	<div class="page_title_area clear">
		<!-- page_title(S) -->
		<h2 class="page_title"><span><bean:message key="IB_Complete_Update_File_Upload"/></span></h2>
		<!-- page_title(E) -->
		<!-- opus_design_btn(S) -->
		<div class="opus_design_btn">
			<button type="button" class="btn_accent" id="btn_Close" name="btn_Close" onClick="doWork('CLOSE');"><bean:message key="Close"/></button><!-- 
		 --></div>
		<!-- opus_design_btn(E) -->
	</div>
</div>

<div class="layer_popup_contents">
	<div class= "wrap_search">
		<div class="opus_design_inquiry entry_pannel">
			<table>
				<colgroup>
					<col width="100" />
					<col width="*" />
				</colgroup>
				<tbody>
					<tr>
						<th><bean:message key="File_Path"/></th>
						<td><!--
			                --><div id="logo_rec_id" style="display: none;"><!--
			                --></div><!--
			                --><input tabindex = "-1" type="file" name="logo_rectangle"  size="25"/><!--
			                --><input name="logo_rec_flg" type="checkbox" value="Y"  style="display: none"><!--
							--><button type="button" class="btn_etc" id="btn_file_upload" name="btn_file_upload" onClick="doWork('btn_file_upload');">File Upload</button>
						<td>
						<td>
						</td>
					</tr>
				</tbody>
			</table>
			<%-- <script type="text/javascript">comUploadObject('upload1', '<%=session.getId()%>');</script> --%>		
			<script type="text/javascript">comSheetObject('sheet1');</script>
		</div>
	</div>
</div>

</form>
<%-- <%@include file="/apps/fis/wms/bizcommon/include_common.jsp"%> --%>
