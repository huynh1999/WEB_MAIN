<%--
=========================================================
*@FileName   : RPT_RD_0010.jsp
*@FileTitle  : RPT
*@Change history:
*@author     : 
*@version    : 
*@since      : 
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	
	<style>
		body {border-top-width:0px!important;}
		.ui-dialog-titlebar-close {
			visibility: hidden;
		}
	</style>
	
	<%@include file="./../../../../syscommon/header/CLTHeader.jsp"%>
	<%
	String autoEmailFlag = (String)application.getAttribute("AUTO_EMAIL_FLAG");
	String autoFaxFlag = (String)application.getAttribute("AUTO_FAX_FLAG");
	String MFileFlag = userInfo.getMfile_flag();
	//#52724 - [BINEX] IF REPORT TITLE IS UPDATED BY USER, TO SAVE THE PDF FILE AS "UPDATED TITLE"  FILE NAME도 USER가 입력한 UPDATED TITLE로 저장되도록의 요청
	String rpt_file_name_title = request.getParameter("rpt_file_name_title") != null ? request.getParameter("rpt_file_name_title") : "";
	if (!"".equals(rpt_file_name_title)){
		rpt_file_name_title = rpt_file_name_title.trim();  
	}
	%>	
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
	<title><bean:message key="system.title"/></title>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/rpt/RPT_RD_0010.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/rd/rdviewer50u.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/EmailChecker.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/cookie.js?ver=<%=CLT_JS_VER%>"></script>
	<bean:parameter id="fileName" name="file_name"/>
	<bean:parameter id="rdParam" name="rd_param"/>
	<bean:parameter id="title" name="title"/>
	<bean:parameter id="mailTitle" name="mailTitle" value=""/>
	<!-- #45983 - [BINEX] Arrival Notice를 E-mail Function으로 Send 할떼 E-mail Title 하고 Attached File Name이 Incorrectly 나옴 -->
	<bean:parameter id="attachFileName" name="attachFileName" value=""/>
	<bean:parameter id="mailTo" name="mailTo" value=""/>
	<bean:parameter id="mailCc" name="mailCc" value=""/>
	<bean:parameter id="intg_bl_seq" name="intg_bl_seq" value=""/>	
	
	<!--#6859:[KING FREIGHT] ADDING 'LOG' BUTTON ON B/L LIST UNDER LOCAL TRANSPORT -->
	<bean:parameter id="oth_seq" name="oth_seq" value=""/>	
	
	<!-- HTML5 TEST -->
	<script src="<%=CLT_PATH%>/js/rd/crownix-viewer.min.js?ver=<%=CLT_JS_VER%>"></script>
	<link rel="stylesheet" type="text/css" href="<%=CLT_PATH%>/js/css/crownix-viewer.min.css">
	
	<style>
	<!--
		.crownix-container span {white-space:pre}
	-->
	</style>
	
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
	<!--  Report ==> OutLook연동 파라미터 (E) -->
	
	
	<!-- Realsed set (S)-->
	<bean:parameter id="send_type" name="send_type" value=""/>
	<!-- Realsed set (E)-->
	
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
	
	<!-- jsjang 2013.8.20 #17610 : [BINEX] 7. Email 전송 History -->
	<script language="javascript" for="wo_rePort" event="PrintFinished()">
		registRptPrintHistory();
	</script>
	
	<script language="javascript" for="wo_rePort" event="ReportFinished()">
		ReportFinished();
	</script>
	
<script>
function setupPage(){
	//OFVFOUR-7227 [KING FREIGHT NY] APPLYING LINK TO PROFILE EMAIL BODY 
	ajaxSendPost(setEmailContent, "reqVal", "&goWhere=aj&bcKey=selectEmailContent&rpt_biz_tp="+frm1.rpt_biz_tp.value+"&rpt_biz_sub_tp="+frm1.rpt_biz_sub_tp.value, "./GateServlet.gsl");	
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

/*
function rdinitializer() {
	loadPage();
	rdObjects[0].ZoomIn();
	rdObjects[0].ZoomIn();
	rdObjects[0].ZoomIn();
	rdObjects[0].ZoomIn();
} */
</script>	

<style> body { border-top-width: 6px!important; } </style>
<form method="post" name="frm1" onSubmit="return false;" enctype="multipart/form-data">
	<input type="hidden" name="f_cmd"/>
	<input type="hidden" name="fileName" value='<bean:write name="fileName"/>'/>
	<input type="hidden" name="rdParam" value='<bean:write name="rdParam"/>'/>
	<input type="hidden" name="firstFileName" value='<bean:write name="fileName"/>'/>
	<input type="hidden" name="firstRdParam" value='<bean:write name="rdParam"/>'/>
	<input type="hidden" name="filePath" value=""/>
	<input type="hidden" name="title" value='<bean:write name="title"/>'/>
	<input type="hidden" name="mailTitle" value='<bean:write name="mailTitle"/>'/>
	<input type="hidden" name="attachFileName" value='<bean:write name="attachFileName"/>'/>
	<input type="hidden" name="mailTo" value='<bean:write name="mailTo"/>'/>
	<input type="hidden" name="mailCc" value='<bean:write name="mailCc"/>'/>
	<input type="hidden" name="intg_bl_seq" value='<bean:write name="intg_bl_seq"/>'/>
	
	<!--#6859:[KING FREIGHT] ADDING 'LOG' BUTTON ON B/L LIST UNDER LOCAL TRANSPORT -->
	<input type="hidden" name="oth_seq" value='<bean:write name="oth_seq"/>'/>
	
	<!-- Fax/Email 추가 파라미터 -->
	<input type="hidden" name="user_eml" value="<%=userInfo.getEml()%>"/>
	<input type="hidden" name="user_nm" value="<%=userInfo.getUser_name()%>"/>
	<input type="hidden" name="fax_no" value="" />
	<input type="hidden" name="usr_fax_no" value="<%=userInfo.getFax()%>"/>
	
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
	<input type="hidden" name="f_inv_seq" value='<bean:write name="f_inv_seq"/>'/>
	<input type="hidden" name="rpt_intg_bl_seq" value='<bean:write name="rpt_intg_bl_seq"/>'/>
	<!--  Report ==> OutLook연동 파라미터 (E) -->

	
	<input type="hidden" name="h_intg_bl_seq" value='<bean:write name="h_intg_bl_seq"/>'/>
	
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
	<input type="hidden" name="prt_option" id="prt_option" value="<%= request.getParameter("prt_option") %>"/>
	
	<div class="layer_popup_title">
	<!-- page_title_area -->
	<div class="page_title_area clear">
	   <h2 class="page_title">
			<span><bean:write name="title"/></span>
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
			--><% 
				if("Y".equals(MFileFlag)){
			%>
				<button id="btnMfile" type="button" class="btn_normal" onclick="doWork('MFILE')">M-Files</button>
			<% 
				}
			%><button id="btnPrint" type="button" class="btn_normal" onclick="doWork('Print')"><bean:message key="Print"/></button><!-- 
		    --><button type="button" class="btn_normal" onclick="doWork('CLOSE')"><bean:message key="Close"/></button>
	   </div>
	</div>
</div>
 	<div style="overflow:hidden">
		<div class="wrap_result">
    <div style="padding-left:50px">
 	    <div id="mainTable"  class="layout_flex_flex" style="top:50px; left:6px; padding-left:0px; width:calc(100% - 12px); height:100%;">
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
	           		<!-- #1177 [BNX] OPUS EMAIL FUNCTION TO HAVE BCC (Blind carbon copy) -->
	           		<tr>
	           			<th><bean:message key="BCC"/></th>
						<td><!-- 
						 --><input type="text" name="f_eml_bcc" class="search_form" dataformat="excepthan" style="ime-mode isabled;width:370px;" <% if("Y".equals(userInfo.getEml_bcc_myself_flg())){  %> value="<%= userInfo.getEml() %>;" <%} %> /><!-- 
						 --><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('EML_BCC_POPLIST')"></button><!-- 
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
							<textarea id="f_eml_content" name="f_eml_content" class="search_form_uppDown_apply" style="ime-mode:auto;width:400px;height:250px;overflow:auto"><%= userInfo.getEml_con() %></textarea>
						</td>
	           		</tr>
	           		<tr>
						<td colspan="2" align="center">
							 <button type="button" class="btn_etc" onclick="doWork('Send');"><bean:message key="Send"/></button>
							 <button type="button" class="btn_etc" onclick="doWork('Mail_Close');"><bean:message key="Close"/></button>
							 <input type="checkbox" name="chk_auto_close" id="chk_auto_close" /><label><bean:message key="AUTO_CLOSE"/></label>
							 <br>
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
</form>

<div id="dialog" title="Dialog"></div>

<!-- M OPUS_FWD_2014\WEB_MAIN\apps\fis\acc\inv\invoice\script\ACC_INV_0010.js
M OPUS_FWD_2014\WEB_MAIN\apps\fis\acc\inv\invoice\script\ACC_INV_0030.js
M OPUS_FWD_2014\WEB_MAIN\apps\fis\acc\inv\invoice\script\ACC_INV_0031.js
M OPUS_FWD_2014\WEB_MAIN\apps\fis\acc\inv\invoice\script\ACC_INV_0035.js -->
