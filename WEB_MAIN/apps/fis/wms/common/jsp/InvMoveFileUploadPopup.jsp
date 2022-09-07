<%
/*--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : InvMoveFileUploadPopup.jsp
*@FileTitle  : Inventory Movement & Hold & Damage - File Upload
*@author     : Kieu.Le - DOU Network
*@version    : 1.0
*@since      : 2015/04/16
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
    <script type="text/javascript" src="./apps/fis/wms/common/js/InvMoveFileUploadPopup.js?ver=<%=CLT_JS_VER%>"></script>
    
     <logic:notEmpty name="EventResponse">
    	<logic:notEmpty name="EventResponse" property="mapVal">
    	
    		<bean:define id="mapVal" name="EventResponse" property="mapVal"/>
    		
    		<script type="text/javascript">
		
					var uploadFlag = '<bean:write name="mapVal" property="res"/>';
				
					if(uploadFlag != undefined && uploadFlag != "undefined" && uploadFlag == "OK"){
						ComClosePopup();
					}
				
			</script>
			
    	</logic:notEmpty>
	</logic:notEmpty>
    
<%
	String move_no 	= ""; //move_no
	String move_seq = ""; //move_Seq
	
	try {
		move_no 	= request.getParameter("move_no")== null?"":request.getParameter("move_no");
		move_seq 	= request.getParameter("move_seq")== null?"":request.getParameter("move_seq");
		
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
<form id="form" name="form"  method="POST" action="./InvMoveFileUploadPopup.clt" enctype="multipart/form-data">

<input type="hidden" name="f_cmd" id="f_cmd">

<input type="hidden" name="user_id" 		value="ADMIN" /> 
<input type="hidden" name="user_nm" 		value="ADMINISTRATION_DOU." />
<input type="hidden" name="org_cd" 		value="KRSELLB" />
<input type="hidden" id="move_no" name="move_no" value="<%=move_no%>"/>
<input type="hidden" id="move_seq" name="move_seq" value="<%=move_seq%>"/>


<div class="layer_popup_title">
 	<div class="page_title_area clear">
		<!-- page_title(S) -->
		<h2 class="page_title">
			<span><bean:message key="IMHD_FU"/></span>
		</h2>
		<!-- page_title(E) -->
		<!-- opus_design_btn(S) -->
		<div class="opus_design_btn">
			<button type="button" id="btn_close" name="btn_close" class="btn_accent" onClick="doWork('CLOSE')"><bean:message key="Close"/></button><!-- 
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
						<td><input tabindex = "-1" type="file" name="logo_rectangle" id="logo_rectangle" size="25"/><!-- 
							 --><button type="button" class="btn_etc" name="btn_file_upload" id="btn_file_upload" onClick="btn_File_Upload_new();"><bean:message key="File_Upload"/></button>
						</td>
					</tr>
				</tbody>
			</table>
 			<%-- <script type="text/javascript">comUploadObject('upload1', '<%=session.getId()%>');</script>	 --%>	
			<script type="text/javascript">comSheetObject('sheet1');</script>
		</div>
	</div>
</div>
</form>
<%@include file="/apps/fis/wms/bizcommon/include_common.jsp"%>

