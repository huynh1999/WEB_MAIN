<%--
=========================================================
*@FileName   : ARI_DOC_1010.jsp
*@FileTitle  : AUTHPORITY TO MAKE ENTRY
*@Description: AUTHPORITY TO MAKE ENTRY
*@author     : Chungrue
*@version    : 2011/12/07
*@since      : 2011/12/07

*@Change history:
=========================================================
--%>

<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>

	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<base target="_self"/>
        
	<title><bean:message key="system.title"/></title>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>

	<!-- 해당 Action별 js -->
	<script type="text/javascript" src="./apps/fis/aii/bmd/masterbl/script/ARI_DOC_1010.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/AIR_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<%
		String autoEmailFlag = (String)application.getAttribute("AUTO_EMAIL_FLAG");
		String autoFaxFlag = (String)application.getAttribute("AUTO_FAX_FLAG");
	%>
	<script type="text/javascript">
		var usrnm = "<%= userInfo.getUser_name() %>";
		var usrEml = "<%= userInfo.getEml() %>";
		var usrPhn = "<%= userInfo.getPhn() %>";
		var usrFax = "<%= userInfo.getFax() %>";
	
		function setupPage(){
	    	loadPage();
	    }
	</script>
<bean:define id="tmpMap"  name="EventResponse" property="mapVal"/>		
<style> body { border-top-width: 6px!important; } </style>
	<form name="form" method="POST" action="./">
		<!--Command를 담는 공통 -->
	<input	type="hidden" name="f_cmd"/>
	<input  type="hidden" name="f_CurPage"/>
	<input	type="hidden" name="f_intg_bl_seq" value="<%=request.getParameter("intg_bl_seq")%>"/>
	<input	type="hidden" name="f_ref_ofc_cd" value="<%=request.getParameter("ref_ofc_cd")%>"/> 
	
	<!--  PRINT용 2011/12/07 Chungrue 추가 -->
	<input type="hidden" name="file_name">
	<input type="hidden" name="title">
	<input type="hidden" name="rd_param">
	<input type="hidden" name="f_rpt_biz_tp" value="AIH"/>
	<input type="hidden" name="mailTitle" value="">
	<input	type="hidden" name="intg_bl_seq" value=""/>
	<input	type="hidden" name="h_intg_bl_seq" value=""/>
	<input  type="hidden" name="h_usrEmlCon" value="<%= userInfo.getEml_con() %>" />
	
	<!--  Report ==> OutLook연동 파라미터 (S) -->
	<input type="hidden" name="rpt_biz_tp" id="rpt_biz_tp" />
	<input type="hidden" name="rpt_biz_sub_tp" id="rpt_biz_sub_tp" />
	<input type="hidden" name="rpt_pdf_file_nm"/>
	
			<!--#52724 - [BINEX] IF REPORT TITLE IS UPDATED BY USER, TO SAVE THE PDF FILE AS "UPDATED TITLE"  FILE NAME도 USER가 입력한 UPDATED TITLE로 저장되도록의 요청 -->
	<input type="hidden" name="rpt_file_name_title"/>
	
	
	<div class="layer_popup_title">
			<!-- page_title_area(S) -->
			<div class="page_title_area">
			   <h2 class="page_title"><bean:message key="Master_Authority_To_Make_Entry"/></h2>
			   <!-- btn_div -->
			   <div class="opus_design_btn">
			   	    <% 
						if("Y".equals(autoFaxFlag)){
					%>
						 <button type="button" class="btn_accent" onclick="doWork('FAX')"><bean:message key="Fax"/></button><!-- 
					--><%
						}
						if("Y".equals(autoEmailFlag)){
					%><!-- 
					 --><button type="button" class="btn_normal" onclick="doWork('EMAIL')"><bean:message key="Email"/></button><!-- 
					 --><%
						}
					%><!-- 
				   --><button type="button" id="btnPrint" class="btn_normal"  onclick="doWork('PRINT')"><bean:message key="Print"/></button><!--
				   --><button type="button" id="btnPrint" class="btn_normal"  onclick="doWork('CLOSE')"><bean:message key="Close"/></button>
			   </div>
			   <!-- btn_div -->
			</div>
	</div>	
	<div class="layer_popup_contents">
<div class="over_wrap" height="100%">
		<div class="wrap_search">	
			<div class="opus_design_inquiry ">
				<table>
						<colgroup>
							<col width="70">
							<col width="70">
							<col width="70">
							<col width="*">
						</colgroup>
						<tbody>
							<tr>
								<th><bean:message key="Ref_No"/></th>
								<td><input type="text" name="f_ref_no" value="<%=request.getParameter("ref_no")%>"  class="search_form-disable" style="width:150;" readOnly></td>
								<th><bean:message key="Title_Name"/></th>
								<td>
									<bean:define id="Authority_Title_Name" name="tmpMap" property="Authority_Title_Name"/>
									<select id="f_tit_nm" name="f_tit_nm" style= "width:210px;">								
										<logic:iterate id="comVO" name="Authority_Title_Name">
											<option value='<bean:write name="comVO" property="cd_val"/>'><bean:write name="comVO" property="cd_nm"/></option>									
										</logic:iterate>
									</select>
								</td>
								
							</tr>	
							<tr>	
								<th><bean:message key="MAWB_No"/></th>
								<td><input type="text" name="f_mawb_no"  maxlength="40" value="<%=request.getParameter("mbl_no")%>"  class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:150;" readOnly></td>
								<th><bean:message key="Office_Name"/></th>
								<td>
									<input type="text" name="f_curr_nm"  maxlength="68" value='<bean:write name="tmpMap" property="ref_Office_Name"/>'  class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled; width:300px;">
								</td>
							</tr>
						</tbody>
				</table>
			</div>
		</div>
		<div class="wrap_result">
			<h3 class="title_design"><bean:message key="Select_List"/></h3>
			<div class="opus_design_grid clear">
				<script type="text/javascript">comSheetObject('sheet1');</script>
			</div>
		</div>
	</div>	
</div>
</form>




