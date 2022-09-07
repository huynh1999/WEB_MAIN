<%
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : CMM_POP_0480.jsp
*@FileTitle  : Transfer Request popup
*@author     : CLT
*@version    : 1.0
*@since      : 2017/09/18
=========================================================*/
%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ page import = "java.net.URLDecoder" %>
<%@ taglib uri="clt-paging"   prefix="paging" %>
<!-- 공통 Header -->
<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>

	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	<title><bean:message key="system.title"/></title>
	
	<!-- 일자 및 달력팝업 호출 -->
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/PUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/COM_FRT_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/cmm/pop/masterbl/script/CMM_POP_0480.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_CODE_UTIL.js?ver=<%=CLT_JS_VER%>"></script>
	<SCRIPT TYPE="TEXT/JAVASCRIPT" SRC="<%=CLT_PATH%>/js/common/autocomplete_ui.js?VER=<%=CLT_JS_VER%>"></SCRIPT>
	<bean:define id="hmOutParam"  name="EventResponse" property="objVal"/>
    

	<script type="text/javascript">
			function setupPage(){
				loadPage();
			}
	</script>
<style> body { border-top-width: 6px!important; } </style>
	<form name="frm1" method="POST" action="./">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd" id="f_cmd" />
	<input type="hidden" name="f_CurPage" id="f_CurPage" />
	
	<bean:parameter name="refNo" id="refNo" value=""/>
	<bean:parameter name="mbl_no" id="mbl_no"  value=""/>
	<bean:parameter name="intg_bl_seq" id="intg_bl_seq" value=""/>
	<!-- ------------------------------------------------------------------------- -->
	<!-- 프린터용 -->
	<input type="hidden" name="file_name" id="file_name" />
	<input type="hidden" name="title" id="title" />
	<input type="hidden" name="rd_param" id="rd_param" />
	<input type="hidden" name="ofc_eng_nm" id="ofc_eng_nm" value="">
	<input type="hidden" name="eml" id="eml" value="<%= userInfo.getEml() %>">
	<input type="hidden" name="user_name" id="user_name" value="">
	<input type="hidden" name="tel" id="tel" value="<%= userInfo.getPhn() %>">
	<input type="hidden" name="fax" id="fax" value="<%= userInfo.getFax() %>">
	<input type="hidden" name="mailTitle" id="mailTitle" value=""/>
	<input type="hidden" name="intg_bl_seq" id="intg_bl_seq" value="<%=intg_bl_seq%>"/>
	
	 
	<!--  Report ==> OutLook연동 파라미터 (S) -->
	
	<!--#52512 [CLT] RD File Name을 표준화| Standardization of File Name during downloading the report -->
	<input type="hidden" name="rpt_file_name_title"/>

	<!--  Report ==> OutLook연동 파라미터 (E) -->
	<div class="layer_popup_title">
		 <div class="page_title_area clear">
				<!-- page_title(S) -->
				<h2 class="page_title"><bean:message key="Transfer_Request"/></h2>
				<!-- page_title(E) -->
				
				<!-- opus_design_btn(S) -->
				<div class="opus_design_btn">
				<button type="button" class="btn_normal" onclick="doWork('PRINT')"><bean:message key="Print"/></button>
				<button type="button" class="btn_normal"  onclick="doWork('CLOSE');"><bean:message key="Close"/></button>
				</div>
				<!-- opus_design_btn(E) -->
	    
	  			<!-- page_location(S) -->
				<div class="location">	
					 <span><%=LEV1_NM%></span>
				 	 <span><%=LEV2_NM%></span>
				  	 <span><%=LEV3_NM%></span>
			   		<a href="" class="ir">URL Copy</a>
				</div>
				<!-- page_location(E) -->
		</div>
	    <!-- page_title_area(E) -->
	</div>
	<div class="layer_popup_contents">
		<!-- wrap search (S) -->
	 	<div class="wrap_search">
		    <!-- inquiry_area(S) -->	
			<div class="opus_design_inquiry ">
				
			    
		        <table>
			        <colgroup>
			        	<col width="120" />
			        	<col width="100" />
			        	<col width="90" />
			        	<col width="*" />
			        </colgroup>
			        <tbody>
			        	 <tr>
                            <th><bean:message key="Ref_No"/></th>
                            <td>
                            	<input name="ref_no" id="ref_no" maxlength="20" type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:120px;" value='<%=refNo%>' readOnly>
                            </td>
                            <th><bean:message key="MAWB"/></th>
                            <td>
                            	<input name="bl_no" id="bl_no" maxlength="40" type="text" class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:165px;" value='<%=mbl_no%>' readOnly>
                            </td>
		                 </tr>
		             </tbody>
		        </table>
		        <table>
			         <colgroup>
			        	<col width="120">
			        	<col width="*">
			        
			        </colgroup>
				        <tbody>
                         <tr>
                            <th><bean:message key="Attention"/></th>
                            <td>
                            	<input name="attn" id="attn" maxlength="100" type="text" class="search_form" onBlur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:386px;" value=''>
                            </td>
                            
		                 </tr>
		              	</tbody>
		          </table>
		        <table>
			         <colgroup>
			        	<col width="120">
			        	<col width="*">
			        
			        </colgroup>
				        <tbody>
                         <tr>
                            <th><bean:message key="Ams_Fax"/></th>
                            <td>
                            	<input name="ams_fax" id="ams_fax" maxlength="20" type="text" class="search_form" onBlur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:386px;" value=''>
                            </td>
                            
		                 </tr>
		              	</tbody>
		          </table>
		          <table>
			         <colgroup>
			        	<col width="120">
			        	<col width="*">
			        
			        </colgroup>
				        <tbody>
                         <tr>
                            <th><bean:message key="Title"/></th>
                            <td>
                            	<input name="title_text" id="title_text" maxlength="100" type="text" class="search_form" onBlur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:386px;" value=''>
                            </td>
                            
		                 </tr>
		              	</tbody>
		          </table>
		          <table>
			         <colgroup>
			        	<col width="120">
			        	<col width="*">
			      
			        </colgroup>
				        <tbody>
                         <tr>
                            <th><bean:message key="Release_to"/></th>
                            <td><!-- 
		                     --><input type="text" name="trdp_cd" value='<bean:write name="hmOutParam" property="trdp_cd"/>' class="search_form" style="ime-mode:disabled; text-transform:uppercase;width:60px;"  onKeyDown="codeNameAction2('trdpcode_dest',this, 'onKeyDown')" onBlur="strToUpper(this);codeNameAction2('trdpcode_dest',this, 'onBlur')" ><!-- 
		                     --><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('PARTNER_POPLIST', this)"></button><!-- 
		                     --><input type="text" name="trdp_nm" value='<bean:write name="hmOutParam" property="trdp_nm"/>' class="search_form"  style="ime-mode:disabled; text-transform:uppercase;width:294px;" onKeyPress="if(event.keyCode==13){doWork('PARTNER_POPLIST', this);}" onBlur="strToUpper(this);"><!-- 
		                     --></td>
                            
		                 </tr>
		              	</tbody>
		          </table>  
			</div>
		     <!-- inquiry_area(S) -->	
		</div>
		<!-- wrap search (E) -->
	</div>
</form>
<script>
	var pDoc = parent.parent.parent.document;
	hideProcess('WORKING', pDoc);
	
	var AUTOCOMPLETE_YN = 'N';
	
	
</script>




