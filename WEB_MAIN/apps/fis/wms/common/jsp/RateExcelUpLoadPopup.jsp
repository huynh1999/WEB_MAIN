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
<script type="text/javascript" src="./apps/fis/wms/common/js/RateExcelUpLoadPopup.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript" src="js/common/CoMessage.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript" src="js/common/CoCommon.js?ver=<%=CLT_JS_VER%>"></script>

<script type="text/javascript" src="./js/common/message/<%=CLT_MSG_PATH%>/WMS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>

<%	
	String ctrt_no = "";
	
	try {
		ctrt_no = request.getParameter("ctrt_no")== null?"":request.getParameter("ctrt_no");		
	}catch(Exception e) {
		out.println(e.toString());
	}	
%>

<bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
<bean:define id="ftr_mod" name="cdMap" property="ftr_mod"/>

<script>
var ftr_modText = "";
var ftr_modCode = "";
<!-- Freight Unit 단위 -->
		<% boolean isBegin = false; %>
		<logic:iterate id="codeVO" name="ftr_mod">
            <% if(isBegin){ %>
            ftr_modText+= '|';
            ftr_modCode+= '|';
            <% }else{
             	isBegin = true;
            } %>
            ftr_modCode+= '<bean:write name="codeVO" property="code"/>' + '|';
            ftr_modText+= '<bean:write name="codeVO" property="name"/>' + '|';
        </logic:iterate>
</script>

<script type="text/javascript">
<%--   	<%=JSPUtil.getIBCodeCombo("ftr_mod", "", "FT1", "0", "")%>	 --%>
<%-- 	<%=JSPUtil.getIBCodeCombo("rate_filer", "", "FT2", "0", "")%> --%>
	var almightyFlag = false;
	function setupPage(){
		var errMessage = "";
		if (errMessage.length >= 1) {
			ComShowMessage(errMessage);
		} // end if
		loadPage(true);
	}
</script>
<iframe id="_iFrameWait_" src="<%=CLT_PATH%>/web/img/main/processing.gif" frameborder="0" marginHeight="0" marginWidth="0" width="343" height="121" style="position:absolute;visibility:hidden;z-index:999;display:none;" ></iframe>                                                                                                                                                                                                                                             

<form id="form" name="form">
<input type="hidden" name="f_cmd" id="f_cmd" />

<input type="hidden" name="ctrt_no" value="<%=ctrt_no%>"/>

<div class="layer_popup_title">
	<!-- page_title_area(S) -->
	<div class="page_title_area clear">
	
		<!-- page_title(S) -->
		<h2 class="page_title"><span>Excel Upload</span></h2>
		<!-- page_title(E) -->
					
		<!-- opus_design_btn(S) -->
		<div class="opus_design_btn">
		<div class="Btn_T">
			 <button type="button" class="btn_accent" name="file_path" id="file_path" onclick="doWork('file_path')"><bean:message key="Upload_Excel"/></button><!-- 
			 --><button type="button" class="btn_accent" name="btn_OK" id="btn_OK" onClick="doWork('btn_OK');"><bean:message key="OK"/></button><!-- 
			 --><button type="button" class="btn_normal" name="btn_Close" id="btn_Close" onClick="doWork('CLOSE');"><bean:message key="Close"/></button>
			</div>
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
						<col width="100">
						<col width="400">
						<col width="200">
	                    <col width="*">
					</colgroup>
					<tr>
						<th><bean:message key="Rate_Type"/></th>	
						<td>
							<input type="radio" name="rate_type" id="rate_type1" value="S" checked></input><label for="rate_type1"><bean:message key="Rate_Type"/>Selling</label>
						    <input type="radio" name="rate_type" id="rate_type2" value="B"></input><label for="rate_type2"><bean:message key="Rate_Type"/>Buying</label>
						 </td>
						<th><bean:message key="Freight_Mode"/></th>
						<td>
							<input type="radio" name="frt_mode" id="frt_mode1" value="S" checked onClick="doWork('frt_mode');"></input><label for="frt_mode1"><bean:message key="SEA"/></label>
						    <input type="radio" name="frt_mode" id="frt_mode2" value="A" onClick="doWork('frt_mode');"></input><label for="frt_mode2"><bean:message key="AIR"/></label>
						    <input type="radio" name="frt_mode" id="frt_mode3" value="D" onClick="doWork('frt_mode');"></input><label for="frt_mode3"><bean:message key="Domestic"/></label>
						 </td>
					</tr>
					<tr>
						<!-- <th><bean:message key="File_Path"/></th> -->
<!-- 						<td colspan="3"> -->
<!-- 							<input name="file_path" type="text" class="L_input_R" id="file_path" style="width:400px;" /> -->
<%-- 							<img src="<%=CLT_PATH%>/web/img/main/icon_file.gif" alt="search" name="btn_file_path"/> --%>
							
<!-- 						</td> -->
						<!-- <td>
							<div id="logo_rec_id" style="display: none;">
			               </div>
			               <input tabindex = "-1" type="file" name="file_path"  size="25" accept=".xls"/>
			               <input name="logo_rec_flg" type="checkbox" value="Y"  style="display: none">
						</td> -->
					</tr>
				</table>
			</div>
			<!-- opus_design_inquiry(E) -->
		</div>
		<div class="wrap_result">
			<!-- opus_design_grid(S) -->
			<div class="opus_design_grid clear">
				<script type="text/javascript">
					comSheetObject('sheet1');
				</script>
			</div>
			<div class="opus_design_grid clear">
				<script type="text/javascript">
					comSheetObject('sheet2');
				</script>
			</div>
			<div class="opus_design_grid clear" style="display: none;">
				<script type="text/javascript">
					comSheetObject('sheet3');
				</script>
			</div>
		</div>
	</div>
</form>
<%-- <%@include file="/business/oms/bizcommon/include_common.jsp"%> --%>
