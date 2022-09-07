<%
/*--=========================================================
 *Copyright(c) 2014 CyberLogitec. All Rights Reserved.
 *@FileName   : WHCreateMultiItemPopup.jsp
 *@FileTitle  : Pack Unit definition Popup
 *@author     : TinLuong - DOU Network
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
    <script type="text/javascript" src="./apps/fis/wms/common/js/WHCreateMultiItemPopup.js?ver=<%=CLT_JS_VER%>"></script>
    
	<script type="text/javascript" src="./js/common/message/<%=CLT_MSG_PATH%>/WMS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
	<bean:define id="officeInfo" name="cdMap" property="officeInfo"/>
	<bean:define id="ofcVO" name="officeInfo"/>  
	<bean:define id="lic_plat_ut_list" name="cdMap" property="lic_plat_ut_list"/>
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
<script >
<!--
	var ofc_size_ut_cd = "<bean:write name="ofcVO" property="oth_size_ut_cd"/>";
	var h_ut_tp_cd =  ofc_size_ut_cd;
	
    var lic_plat_ut_listCd = "";
    var lic_plat_ut_listNm = "";
	<!-- License Plate Unit Code -->
	<% boolean isBegin_lic = false; %>
    <logic:iterate id="lic_plat_ut" name="lic_plat_ut_list">
        <% if(isBegin_lic){ %>
        lic_plat_ut_listCd+= '|';
        lic_plat_ut_listNm+= '|';
        <% }else{
        	isBegin_lic = true;
           } %>
           lic_plat_ut_listCd +='<bean:write name="lic_plat_ut" property="lic_plat_ut_cd"/>';
           lic_plat_ut_listNm +='<bean:write name="lic_plat_ut" property="lic_plat_ut_cd"/> : <bean:write name="lic_plat_ut" property="lic_plat_desc"/>';
    </logic:iterate>
//-->
</script>
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
<input type="hidden" name="user_id" value="<%= userInfo.getUsrid()%>" />

<input type="hidden" name="f_unit_val">
<input type="hidden" name="f_hts_val">
<input type="hidden" name="f_group_val">
<input type="hidden" name="f_param_item_val">
<input type="hidden" name="f_item_vall">

<!-- page_title_area(S) -->
<div class="page_title_area clear">
	<!-- page_title(S) -->
	<h2 class="page_title"><span><bean:message key="Create_Multi_Item"/></span></h2>
	<!-- page_title(E) -->
	<!-- opus_design_btn(S) -->
	<div class="opus_design_btn">
		<button type="button" class="btn_accent" name="btn_verify" id="btn_verify" onClick="doWork('VERIFY');"><bean:message key="Verify"/></button><!-- 
	 --><button type="button" class="btn_normal" name="btnSave" id="btnSave" onClick="doWork('SAVE');"><bean:message key="Save"/></button><!-- 
	 --><button type="button" class="btn_normal" name="btn_template" id="btn_template" onClick="doWork('TEMPATE_DOWNLOAD');" btnAuth="TEMPATE_DOWNLOAD"><bean:message key="Template_Download"/></button><!-- 
	 --><button type="button" class="btn_normal" name="btn_upload_excel" id="btn_upload_excel" onClick="doWork('UPLOAD_EXEL');" btnAuth="UPLOAD_EXEL"><bean:message key="Excel_Upload"/></button><!-- 
	 --><button type="button" class="btn_normal" name="btn_Close" id="btn_Close" onClick="doWork('CLOSE');"><bean:message key="Close"/></button><!--
	 --></div>
	<!-- opus_design_btn(E) -->
</div>

<div class= "wrap_search">
<div class="opus_design_inquiry ">
	<table>
    	<colgroup>
  			   <col width="60" />
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
			<div class="opus_design_btn">  
				 <button type="button" class="btn_normal" id="btn_row_vol" name="btn_row_vol" onClick="doWork('ROW_VOL');"><bean:message key="Vol_Cal"/></button><!-- 
			  --><button type="button" class="btn_normal" id="btn_row_add" name="btn_row_add" onClick="doWork('ROW_ADD');"><bean:message key="Add"/></button><!-- 
			  --><button type="button" class="btn_normal" id="btn_row_del" name="btn_row_del" onClick="doWork('ROW_DEL');"><bean:message key="DEL"/></button><!-- 
			 --></div> 
			<script type="text/javascript">comSheetObject('sheet1');</script>
		</div>
</div>
</form>

<div id="VerifyMessageDiv" style="position: fixed;left: 18px; right: 18px; bottom: 0; top: 0;z-index: 1000;display:none;" valign="middle" align="center">
	<div id="div001" style="width:100%; background-color:#F45C20; position: absolute;top: 122px;left: 0%;" align="center">
	<div id='div002' style="margin:2px;padding:2px; background-color:#FFFFFF;" align="center">
		<h2 class="page_title"><span>Verify Message</span></h2>
		<Br>
		<textarea id="verifyMsgTextArea" name="verifyMsgTextArea" style="width:100%;height:340px;text-transform:none;ime-mode:inactive" readOnly></textarea>
		<Br><Br>
		<button type="button" class="btn_normal" name="btn_Close" id="btn_Close" onClick="javascript:document.getElementById('VerifyMessageDiv').style.display='none';"><bean:message key="Close"/></button>
		</div>
	</div>
</div>


<form name="frm1" method="POST" action="./GateServlet.gsl">
	<input type="hidden" name="goWhere" value="fd" id="goWhere" />
    <input type="hidden" name="bcKey" value="downloadTlFileTemplateWMS" id="bcKey" />
    <input type="hidden" name="file_path" value="" id="file_path" />
    <input type="hidden" name="file_name" value="" id="file_name"/>	
    <input type="hidden" name="docType" value="" id="docType" />
</form>
<!--  Working Image  -->
<div id="WORKING_IMG" style="position: fixed;left: 0; right: 0; bottom: 0; top: 0;z-index: 1000;display: none;" valign="middle" align="center">
	<iframe src='<%=CLT_PATH%>/js/common/wait.html' scrolling='no' frameborder='0' style="position: absolute;top: 50%;left: 40%;"></iframe>
</div>
<%@include file="/apps/fis/wms/bizcommon/include_common.jsp"%>