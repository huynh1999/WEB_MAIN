<%--
=========================================================
*@FileName   : SEE_AMS_0050.jsp
*@FileTitle  : SmartLink AMS HBL Detail
*@Description: SmartLink AMS HBL Detail
*@author     : OJG
*@version    : 
*@since      : 

*@Change history:
=========================================================
--%>

<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
	<title><bean:message key="system.title"/></title>
	<!-- 일자 및 달력팝업 호출 -->
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="./apps/fis/see/bmd/ams/script/SEE_AMS_0050.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SEA_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	
	<bean:define id="hblVo"   name="EventResponse" property="objVal"/>
	<bean:define id="valMap"  name="EventResponse" property="mapVal"/>
	<script>
		function setupPage()
		{
			initFinish();loadPage();
		}
	</script>
	<%
		String ofc_cd		= userInfo.getOfc_cd();
		String ofc_eng_nm 	= userInfo.getOfc_eng_nm();
		String usrNm 		= userInfo.getUser_name();
		String phn 			= userInfo.getPhn();
		String fax 			= userInfo.getFax();
		String email 		= userInfo.getEml();
	%>

<form name="frm1" method="POST" action="./SEE_AMS_0050.clt">
	<input type="hidden" name="f_cmd">
    <input type="hidden" name="f_CurPage"> 
     <input type="hidden" name="f_isNumSep" 	value='01'>    
    
	<input	type="hidden" name="msg_no" value="<bean:write name="hblVo" property="msg_no"/>"/>
	<input	type="hidden" name="blnbr" value="<bean:write name="hblVo" property="blnbr"/>"/>
    
    <input type="hidden" name="file_name">
	<input type="hidden" name="title">
	<input type="hidden" name="rd_param">
	<input type="hidden" name="mailTitle" value="">
	<input type="hidden" name="mailTo" value="">

	<!--  Report ==> OutLook연동 파라미터 (S) -->
	<input type="hidden" name="rpt_biz_tp"/>
	<input type="hidden" name="rpt_biz_sub_tp"/>
	<input type="hidden" name="rpt_trdp_cd"/>
	<!--  Report ==> OutLook연동 파라미터 (E) -->

	<input type="hidden" name="intg_bl_seq" value="">
	<input type="hidden" name="rlt_intg_bl_seq" value="">
	<input type="hidden" name="s_intg_bl_seq" value="">
	<input type="hidden" name="master_bl_no"  value=""> 
	<input type="hidden" name="house_bl_no"   value=""> 
	
	<!-- GridSetting Value -->
	<input type="hidden" name="user_id"  value="<%=userInfo.getUsrid()%>" />
	<input type="hidden" name="pageurl" id="pageurl" value="SEE_AMS_0010.clt"/>
	<div class="layer_popup_title">
	<!-- page_title_area(S) -->
	<div class="page_title_area clear">
		<!-- page_title(S) -->
		<h2 class="page_title"><span id="title">AMS House B/L</span></h2>
		<!-- page_title(E) -->
		
		<!-- opus_design_btn(S) -->
		<div class="opus_design_btn">
			<button type="button" class="btn_accent"  onclick="ComClosePopup();"><bean:message key="Close"/></button>
		</div>
	<!-- page_title_area(E) -->
	</div>	
	</div>
	<div class="layer_popup_contents">
	<!-- wrap_search(S) -->
	<div class="wrap_result_tab">
		 <ul id="ulTab" class="opus_design_tab">
	        <li class="nowTab"><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('01');"><span><bean:message key="HBL_Information"/></span></a></li>
	        <li><a href="#" onClick="javascript:goTabSelect('02');"><span><bean:message key="Container_Info"/></span></a></li>
	        <li><a href="#" onClick="javascript:goTabSelect('03');"><span><bean:message key="Hazardous_Goods"/></span></a></li>
	    </ul>
	
		<!-- tabLayer1 (S) -->
		<div name="tabLayer" id="tabLayer" style="display:inline">
			<!-- layout_wrap(S) -->
			<div class="layout_wrap" style="height: 434px;">
			    <div class="layout_vertical_2">
			        <!-- opus_design_inquiry(S) -->
			        <div class="opus_design_inquiry">
			            <table>
							<colgroup>
								<col width="80">
								<col width="*">
							</colgroup>
							<tbody>
                               <tr>
                               	  <th><bean:message key="MBL_No"/></th>
                                  <td>
                                   	<input type="text" name="refnbr"  value='<bean:write name="hblVo" property="refnbr"/>' class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:150px;" />
                                  </td>
                               </tr>
                               
                               <tr>
                               	 <th><bean:message key="HBL_No"/></th>
                                 <td>
                                   	<input type="text" name="blnbr"  value='<bean:write name="hblVo" property="blnbr"/>' class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:150px;" />
                                 </td>
                               </tr>
                               <tr>
                               	   <th><bean:message key="POR"/></th>
                                   <td>
                                   	<input type="text" name="por_fullname"  value='<bean:write name="hblVo" property="por_fullname"/>' class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:350px;" />
                                   </td>
                               </tr>
                               <tr>
                               	    <th rowspan="2" valign="top"><bean:message key="Shipper"/></th>
                                   <td>
	                                   	<input type="text" name="shpr_nm"  value='<bean:write name="hblVo" property="shpr_nm"/>' class="search_form-disable" style="ime-ode:disabled; text-transform:uppercase;width:350px;" />
                                    </td>
                               </tr>
                               <tr>
                                   <td>
	                                   <textarea name="shpr_add" class="search_form-disable"  dataformat="excepthan" style="width:350px;height:80px;"  WRAP="off"><bean:write name="hblVo" property="shpr_add" filter="false"/></textarea>
                                    </td>
                               </tr>
							</tbody>
						</table>
			        </div>
			        <!-- opus_design_inquiry(E) -->
			    </div>
			    <div class="layout_vertical_2">
			       <!-- opus_design_inquiry(S) -->
			        <div class="opus_design_inquiry">
			            <table>
							<colgroup>
								<col width="80">
								<col width="*">
							</colgroup>
							<tbody>
                               <tr>
                               	<th rowspan="2" valign="top"><bean:message key="Consignee"/></th>
                                <td>
                                   	<input type="text" name="cnee_nm"  value='<bean:write name="hblVo" property="cnee_nm"/>' class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:350px;" />
                                </td>
                               </tr>
                               <tr>
                                <td>
                                   	<textarea name="shpr_add" class="search_form-disable" dataformat="excepthan" style="width:350px;height:80px;"  WRAP="off"><bean:write name="hblVo" property="cnee_add" filter="false"/></textarea>
                                </td>
                               </tr>
                               
                                <tr>
                               	   <th rowspan="2" valign="top"><bean:message key="Notify"/></th>
                                   <td>
	                                   	<input type="text" name="ntfy_nm"  value='<bean:write name="hblVo" property="ntfy_nm"/>' class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:350px;" />
                                    </td>
                               </tr>
                                <tr>
                                   <td>
	                                   	<textarea name="ntfy_add" class="search_form-disable" dataformat="excepthan" style="width:350px;height:80px;"  WRAP="off"><bean:write name="hblVo" property="ntfy_add" filter="false"/></textarea>
                                    </td>
                               </tr>
							</tbody>
						</table>
			        </div>
			        <!-- opus_design_inquiry(E) -->
			    </div>
			</div>
		</div>
	   <div name="tabLayer" id="tabLayer" style="display:none">
	   		<div class="opus_design_grid"><script language="javascript">comSheetObject('sheet1');</script></div>
	   </div>
	   <div name="tabLayer" id="tabLayer" style="display:none">
	   		<div class="opus_design_grid"><script language="javascript">comSheetObject('sheet2');</script></div>
	   </div>
	</div>
	</div>
</form>

<%@page import="java.net.URLEncoder"%>