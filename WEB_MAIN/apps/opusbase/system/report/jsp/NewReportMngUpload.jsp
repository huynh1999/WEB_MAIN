<%-- 
=========================================================
*@FileName   : NewReportMngUpload.jsp
*@FileTitle  : New report Manage Upload
*@Description: New report Manage Upload
*@author     : Duc.Nguyen
*@version    : 1.0 - 2017/12/08
*@since      : 2017/12/08

*@Change history:
=========================================================
--%>

%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/ModalCalendar.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="./apps/opusbase/system/report/script/NewReportMngUpload.js?ver=<%=CLT_JS_VER%>"></script>
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
<form id="form" name="form"  method="POST" action="./NewReportMngUpload.clt" enctype="multipart/form-data">

<input type="hidden" name="f_cmd" id="f_cmd">
<input type="hidden" id="rpt_id" name="rpt_id" value=""/>
<input type="hidden" id="mrd_path" name="mrd_path" value=""/>

<div class="layer_popup_title">
 	<div class="page_title_area clear">
		<!-- page_title(S) -->
		<h2 class="page_title">
			<span><bean:message key="PDF_Upload"/></span>
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
		<div class="opus_design_inquiry wFit">
			<table>
				<colgroup>
					<col width="100" />
					<col width="*" />
				</colgroup>
				<tbody>
					<tr>
						<th><bean:message key="File_Path"/></th>
						<td><input tabindex = "-1" type="file" name="f_pdf_nm" id="f_pdf_nm" size="25"/><!-- 
							 --><button type="button" class="btn_etc" name="btn_file_upload" id="btn_file_upload" onClick="btn_File_Upload_new();"><bean:message key="File_Upload"/></button>
						</td>
					</tr>
				</tbody>
			</table>			
		</div>
	</div>
</div>
</form>
<%@include file="/apps/fis/wms/bizcommon/include_common.jsp"%>

	