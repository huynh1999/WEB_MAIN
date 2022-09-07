<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
<%@include file="./../../../../syscommon/header/CLTHeader.jsp"%>

<%
	String autoEmailFlag = (String)application.getAttribute("AUTO_EMAIL_FLAG");
	String autoFaxFlag = (String)application.getAttribute("AUTO_FAX_FLAG");
	
	//#52724 - [BINEX] IF REPORT TITLE IS UPDATED BY USER, TO SAVE THE PDF FILE AS "UPDATED TITLE"  FILE NAME도 USER가 입력한 UPDATED TITLE로 저장되도록의 요청
	String rpt_file_name_title = request.getParameter("rpt_file_name_title") != null ? request.getParameter("rpt_file_name_title") : "";
	if (!"".equals(rpt_file_name_title)){
		rpt_file_name_title = rpt_file_name_title.trim();  
	}
%>	

	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/PFM_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/rpt/RPT_PRN_0010.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/rd/rdviewer50u.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/EmailChecker.js?ver=<%=CLT_JS_VER%>"></script>
	
	
	<!-- HTML5 TEST -->
 	<script src="<%=CLT_PATH%>/js/rd/jquery-1.11.0.min.js?ver=<%=CLT_JS_VER%>"></script>
	<script src="<%=CLT_PATH%>/js/rd/crownix-viewer.min.js?ver=<%=CLT_JS_VER%>"></script>
	<link rel="stylesheet" type="text/css" href="<%=CLT_PATH%>/js/css/crownix-viewer.min.css">
	
	<style>
	<!--
		.crownix-container span {white-space:pre}
	-->
	</style>
	
	<script language="javascript">
	var user_ofc_cnt_cd = "<%=userInfo.getOfc_cnt_cd()%>";
	var user_ofc_cnt_nm = "<%=userInfo.getOfc_eng_nm()%>";
	var user_id = "<%=userInfo.getUsrid()%>";
	var user_eml = "<%=userInfo.getEml()%>";
	var user_phn = "<%=userInfo.getPhn()%>";
	var user_fax = "<%=userInfo.getFax()%>";
	var user_nm = "<%=userInfo.getUser_name()%>";
	var rpt_file_path = "<%=userInfo.getRpt_file_path().replaceAll("\\\\","\\\\\\\\")%>";
	var param_intg_bl_seq = "";
	//#4722 [Best Ocean] Email always bcc myself option add
	var eml_bcc_myself_flg = "<%=userInfo.getEml_bcc_myself_flg()%>";
	</script>
	
	<script language="javascript">
		
		function setupPage(){
			
			param_intg_bl_seq = frm1.intg_bl_seq.value;
			
			if((frm1.rpt_biz_sub_tp.value == "AN" || frm1.rpt_biz_sub_tp.value == "AT" || frm1.rpt_biz_sub_tp.value == "UH") && 
					frm1.h_intg_bl_seq.value != null && frm1.h_intg_bl_seq.value != ""){
				param_intg_bl_seq = frm1.h_intg_bl_seq.value;
			}
			
			if(_os.indexOf("Linux") != -1 || _os.indexOf("Macintosh") != -1 ) {  
		 		$("#mainTable").css("top","50px");
				loadPageHtml5();
			}else{
				if (_os.indexOf("MSIE") != -1 || _os.indexOf("Trident") != -1) {
					if(navigator.appName.indexOf("Microsoft") != -1) {
						loadPage();
					}else{	
		 				$("#mainTable").css("top","50px");
						loadPageHtml5();
					}
				} else {
					$("#mainTable").css("top","50px");
					loadPageHtml5();
				}
			}
		}
	</script>

	<bean:define id="tmpMap"  name="EventResponse" property="mapVal"/>
	<bean:parameter id="mailTitle" name="mailTitle" value=""/>
	<bean:parameter id="mailTo" name="mailTo" value=""/>
	<!-- #45983 - [BINEX] Arrival Notice를 E-mail Function으로 Send 할떼 E-mail Title 하고 Attached File Name이 Incorrectly 나옴 -->
	<bean:parameter id="attachFileName" name="attachFileName" value=""/>
	
	<bean:parameter id="intg_bl_seq" name="intg_bl_seq" value=""/>
	
	<!--  Report ==> OutLook연동 파라미터 (S) -->
	<bean:parameter id="rpt_biz_tp" name="rpt_biz_tp" value=""/>
	<bean:parameter id="rpt_biz_sub_tp" name="rpt_biz_sub_tp" value=""/>
	<bean:parameter id="rpt_tp" name="rpt_tp" value=""/>
	<bean:parameter id="rpt_trdp_cd" name="rpt_trdp_cd" value=""/>
	<bean:parameter id="rpt_cc_trdp_cd" name="rpt_cc_trdp_cd" value=""/>
	<bean:parameter id="rpt_pdf_file_nm" name="rpt_pdf_file_nm" value=""/>
	
	<bean:parameter id="f_inv_seq" name="f_inv_seq" value=""/>
	<bean:parameter id="shpr_trdp_cd" name="shpr_trdp_cd" value=""/>
	<bean:parameter id="shpr_trdp_addr" name="shpr_trdp_addr" value=""/>
	<bean:parameter id="i_ooh_bkg_rmk" name="i_ooh_bkg_rmk" value=""/>
	<bean:parameter id="rpt_intg_bl_seq" name="rpt_intg_bl_seq" value=""/>
	<bean:parameter id="h_intg_bl_seq" name="h_intg_bl_seq" value=""/>
	
	<!-- Realsed set (S)-->
	<bean:parameter id="send_type" name="send_type" value=""/>
	<!-- Realsed set (E)-->
		
	
	<!--  Report ==> OutLook연동 파라미터 (E) -->
	
		

<style> body { border-top-width: 6px!important; } </style>
<form method="post" name="frm1" onSubmit="return false;" enctype="multipart/form-data">
	<input type="hidden" name="f_cmd"/>
	<input type="hidden" name="fileName" value='<bean:write name="tmpMap" property="fileName"/>'/>	
	<input type="hidden" name="rdParam" value='<bean:write name="tmpMap" property="rdParam"/>'/>
	<input type="hidden" name="filePath" value=""/>
	<input type="hidden" name="title" value='<bean:write name="tmpMap" property="title"/>'/>
	<input type="hidden" name="mailTitle" value='<bean:write name="mailTitle"/>'/>
	<input type="hidden" name="mailTo" value='<bean:write name="mailTo"/>'/>
	
	<input type="hidden" name="attachFileName" value='<bean:write name="attachFileName"/>'/>
		
	<input type="hidden" name="intg_bl_seq" value='<bean:write name="intg_bl_seq"/>'/>
	
	<!-- Fax/Email 추가 파라미터 -->
	<input type="hidden" name="user_eml" value="<%=userInfo.getEml()%>"/>
	<input type="hidden" name="user_nm" value="<%=userInfo.getUser_name()%>"/>
	<input type="hidden" name="fax_no" value="" />
	<input type="hidden" name="usr_fax_no" value="<%=userInfo.getFax()%>"/>

	<!--  Report ==> OutLook연동 파라미터 (S) -->
	
	<!-- jsjang 2013.8.20 #17610 : [BINEX] 7. Email 전송 History -->
	<input type="hidden" name="f_inv_seq" value='<bean:write name="f_inv_seq"/>'/>
	<input type="hidden" name="usr_fax_no" value="<%=userInfo.getFax()%>"/>
	<input type="hidden" name="fax_no" value=''/>
	<!--  Report ==> OutLook연동 파라미터 (E) -->

	<input type="hidden" name="org_bl_qty" value='<logic:notEmpty name="tmpMap" property="org_bl_qty"><bean:write name="tmpMap" property="org_bl_qty"/></logic:notEmpty>'/>
	
	<!-- Email File관련 연동 추가 파라미터 -->
	<input type="hidden" name="f_eml_file_nm2" value="" />
	<input type="hidden" name="f_eml_file_nm3" value="" />
	<input type="hidden" name="f_eml_file_nm4" value="" />
	<input type="hidden" name="f_eml_file_nm5" value="" />
	
	<!-- Fax2 연동 추가 파라미터 -->
	<input type="hidden" name="fax_param" value="" />
	
	<!-- #27546 [BINEX] Arrival Notice Mail/Fax 전송 시 수신자 설정 -->
	<input type="hidden" name="mailAN_param" value="" />
	<input type="hidden" name="mailAN_return" value="" />
	
	<!--#52724 - [BINEX] IF REPORT TITLE IS UPDATED BY USER, TO SAVE THE PDF FILE AS "UPDATED TITLE"  FILE NAME도 USER가 입력한 UPDATED TITLE로 저장되도록의 요청 -->
	<input type="hidden" name="rpt_file_name_title" id="rpt_file_name_title" value="<%=rpt_file_name_title %>"/>
	
	<!-- Realsed set (S)-->
	<input type="hidden" name="send_type" value="<bean:write name="send_type"/>" />
	<!-- Realsed set (E)-->
	
	<!--  Report ==> OutLook연동 파라미터 (S) -->
	<input type="hidden" name="rpt_biz_tp" value='<bean:write name="rpt_biz_tp"/>'/>
	<input type="hidden" name="rpt_biz_sub_tp" value='<bean:write name="rpt_biz_sub_tp"/>'/>
	<input type="hidden" name="rpt_tp" value='<bean:write name="rpt_tp"/>'/>
	<input type="hidden" name="rpt_trdp_cd" value='<bean:write name="rpt_trdp_cd"/>'/>
	<input type="hidden" name="rpt_cc_trdp_cd" value='<bean:write name="rpt_cc_trdp_cd"/>'/>
	<input type="hidden" name="rpt_pdf_file_nm" value='<bean:write name="rpt_pdf_file_nm"/>'/>
	
	<!-- jsjang 2013.8.20 #17610 : [BINEX] 7. Email 전송 History -->
	<input type="hidden" name="shpr_trdp_cd" value='<bean:write name="shpr_trdp_cd"/>'/>
	<input type="hidden" name="shpr_trdp_addr" value='<bean:write name="shpr_trdp_addr"/>'/>
	<input type="hidden" name="i_ooh_bkg_rmk" value='<bean:write name="i_ooh_bkg_rmk"/>'/>
	<!-- #4722 [Best Ocean] Email always bcc myself option add -->
	<input type="hidden" name="f_eml_bcc" class="search_form" dataformat="excepthan" style="ime-mode isabled;width:370px;" <% if("Y".equals(userInfo.getEml_bcc_myself_flg())){  %> value="<%= userInfo.getEml() %>;" <%} %> />
	
	
	
	<!-- page_title_area -->
	<div class="page_title_area clear">
	   <h2 class="page_title">
			<span><bean:write name="tmpMap" property="title"/></span>
	   </h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn">	   	   
	   	   <% 
				if("Y".equals(autoFaxFlag)){
			%>
		   	<button type="button" class="btn_accent" onclick="doWork('Fax')"><bean:message key="Fax"/></button><!-- 
		  --><% 
				}
			%><!-- 
		 --><button type="button" class="btn_normal" onclick="doWork('Mail')"><bean:message key="Outlook"/></button><!-- 
		 --><% 
				if("Y".equals(autoEmailFlag)){
			%><!-- 
		--><button type="button" class="btn_normal" onclick="doWork('Mail2')"><bean:message key="Email"/></button><!-- 
		 --><% 
				}
			%><!-- 
			--><button id="btnPrint" type="button" class="btn_normal" onclick="doWork('Print')"><bean:message key="Print"/></button><!-- 
		    --><button type="button" class="btn_normal" onclick="doWork('CLOSE')"><bean:message key="Close"/></button>
	   </div>
	</div>
	

	<!-- wrap_result (S) -->
<!--     <div class="wrap_result">
		<div class="opus_design_RD">
		
			<table id="mainTable" width="100%" height="98%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                    <td align="left" valign="top" width="100%" height="98%"  ><script language="javascript">comRdObject('wo_rePort');</script></td>
             	</tr>
        	</table>
		</div>
	</div> -->
	
	
	 	<div style="overflow:hidden">
			<div class="wrap_result">
    			<div style="padding-left:50px">
 

					<div id="mainTable"  class="layout_flex_flex" style="top:50px; left:6px; padding-left:0px; width:calc(100% - 12px); height: 100%;">
				     	<script language="javascript">comRdObject('wo_rePort');</script>
					</div>
					
					<div id="mail_tab"  class="layout_flex_fixed opus_design_inquiry" style="display:none; width:500px;float:right!important" >
				   		<table style="margin-left:5px;">
				   			<colgroup>
				   				<col width="70">
				   				<col width="*">
				   			</colgroup>
				   			<tbody>
				   			
				           		<tr>
				           			<th><bean:message key="To"/></th>
									<td><!-- 
									 --><input type="text" name="f_eml_to" class="search_form" dataformat="excepthan" style="ime-mode isabled;width:370px;"/><!-- 
									 --><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('EML_TO_POPLIST')"></button><!-- 
									 --></td>
				           		</tr>
				           		<tr>
				           			<th><bean:message key="CC"/></th>
									<td><!-- 
									 --><input type="text" name="f_eml_cc" class="search_form" dataformat="excepthan" style="ime-mode isabled;width:370px;"/><!-- 
									 --><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('EML_CC_POPLIST')"></button><!-- 
									  --></td>
				           		</tr>
				           		<tr>
				           			<th><bean:message key="Title"/></th>
				           			<!-- #229 #52070 - ♥[COMMON] REMARK/INTERNAL MEMO에 KOREAN/CHINESE TYPE 가능하도록 -->
									<td><input type="text" name="f_eml_title" class="search_form" style="ime-mode:auto;width:400px;"/></td>
				           		</tr>
				           		<tr>
				           			<th valign="top">Content</th>
									<td>
										<textarea id="f_eml_content" name="f_eml_content" class="search_form_uppDown_apply" style="ime-mode:auto;width:400px;height:300px;"><%= userInfo.getEml_con() %></textarea>
									</td>
				           		</tr>
				           		<tr>
									<td colspan="2" align="center">
										 <button type="button" class="btn_etc" onclick="doWork('Send');"><bean:message key="Send"/></button>
										 <button type="button" class="btn_etc" onclick="doWork('Mail_Close');"><bean:message key="Close"/></button>
									</td>
				           		</tr>				           		
				           		<tr>
				           			<th><bean:message key="File"/></th>
									<td><input type="text" name="f_eml_file" readonly="readonly" class="search_form" dataformat="excepthan" style="ime-mode isabled;width:400px;"/></td>
				           		</tr>
				           		<tr>
				           			<th id="file2"><bean:message key="File2"/></th>
									<td id="fileName2"><input type="file" name="f_eml_file2" class="search_form" dataformat="excepthan" style="ime-mode isabled;width:400px;"/></td>
				           		</tr>
				           		<tr>
				           			<th id="file3"><bean:message key="File3"/></th>
									<td id="fileName3"><input type="file" name="f_eml_file3" class="search_form" dataformat="excepthan" style="ime-mode isabled;width:400px;"/></td>
				           		</tr>
				           		<tr>
				           			<th id="file4"><bean:message key="File4"/></th>
									<td id="fileName4"><input type="file" name="f_eml_file4" class="search_form" dataformat="excepthan" style="ime-mode isabled;width:400px;"/></td>
				           		</tr>
				           		<tr>
				           			<th id="file5"><bean:message key="File5"/></th>
									<td id="fileName5"><input type="file" name="f_eml_file5" class="search_form" dataformat="excepthan" style="ime-mode isabled;width:400px;"/></td>
				           		</tr>
				           	</tbody>
				        </table>
				   </div>
		
				</div>
			</div>
		</div>		
	
	
	<iframe name="ifr_hidden" style="width:0;height:0;visibility:hidden" border=0></iframe>
	</div>
	
</form>


