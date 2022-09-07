<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
<%@include file="./../../../../syscommon/header/CLTHeader.jsp"%>

<%
	String autoEmailFlag = (String)application.getAttribute("AUTO_EMAIL_FLAG");
	String autoFaxFlag = (String)application.getAttribute("AUTO_FAX_FLAG");
%>	
	
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/rpt/RPT_RD_0050.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/rd/rdviewer50u.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/EmailChecker.js?ver=<%=CLT_JS_VER%>"></script>

	<bean:parameter id="rdParam" name="rd_param"/>
	<bean:parameter id="title" name="title"/>
	<bean:parameter id="mailTitle" name="mailTitle" value=""/>
	<!-- #45983 - [BINEX] Arrival Notice를 E-mail Function으로 Send 할떼 E-mail Title 하고 Attached File Name이 Incorrectly 나옴 -->
	<bean:parameter id="attachFileName" name="attachFileName" value=""/>
	<bean:parameter id="mailTo" name="mailTo" value=""/>
	<bean:parameter id="mailCc" name="mailCc" value=""/>
	<bean:parameter id="intg_bl_seq" name="intg_bl_seq" value=""/>
	
	<!--  Report ==> OutLook연동 파라미터 (S) -->
	<bean:parameter id="rpt_biz_tp" name="rpt_biz_tp" value=""/>
	<bean:parameter id="rpt_biz_sub_tp" name="rpt_biz_sub_tp" value=""/>
	<bean:parameter id="rpt_tp" name="rpt_tp" value=""/>
	<bean:parameter id="rpt_trdp_cd" name="rpt_trdp_cd" value=""/>
	<bean:parameter id="rpt_cc_trdp_cd" name="rpt_cc_trdp_cd" value=""/>
	
	<bean:parameter id="f_inv_seq" name="f_inv_seq" value=""/>
	<bean:parameter id="shpr_trdp_cd" name="shpr_trdp_cd" value=""/>
	<bean:parameter id="shpr_trdp_addr" name="shpr_trdp_addr" value=""/>
	<bean:parameter id="i_ooh_bkg_rmk" name="i_ooh_bkg_rmk" value=""/>
	<bean:parameter id="rpt_intg_bl_seq" name="rpt_intg_bl_seq" value=""/>
	<!--  Report ==> OutLook연동 파라미터 (E) -->
	

	<script language="javascript">
	var user_ofc_cnt_cd = "<%=userInfo.getOfc_cnt_cd()%>";
	var user_id = "<%=userInfo.getUsrid()%>";
	var user_eml = "<%=userInfo.getEml()%>";
	var user_phn = "<%=userInfo.getPhn()%>";
	var user_fax = "<%=userInfo.getFax()%>";
	var user_nm = "<%=userInfo.getUser_name()%>";
	</script>
	
	<!-- jsjang 2013.8.20 #17610 : [BINEX] 7. Email 전송 History -->
	<script language="javascript" for="wo_rePort" event="PrintFinished()">
		registRptPrintHistory();
	</script>	
	<script>
		function setupPage(){
			loadPage();
	    }
	</script>
<form method="post" name="frm1" onSubmit="return false;" enctype="multipart/form-data">
	<input type="hidden" name="f_cmd" id="f_cmd"/>
	<input type="hidden" name="fileName" id="fileName" value='<bean:write name="fileName"/>'/>
	<input type="hidden" name="rdParam" id="rdParam" value='<bean:write name="rdParam"/>'/>
	<input type="hidden" name="filePath" id="filePath" value=""/>
	<input type="hidden" name="title" id="title" value='<bean:write name="title"/>'/>
	<input type="hidden" name="mailTitle" id="mailTitle" value='<bean:write name="mailTitle"/>'/>
	<input type="hidden" name="attachFileName" value='<bean:write name="attachFileName"/>'/>
	<input type="hidden" name="mailTo" value='<bean:write name="mailTo"/>'/>
	<input type="hidden" name="mailCc" value='<bean:write name="mailCc"/>'/>
	<input type="hidden" name="intg_bl_seq" value='<bean:write name="intg_bl_seq"/>'/>
	
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
	
	<!-- jsjang 2013.8.20 #17610 : [BINEX] 7. Email 전송 History -->
	<input type="hidden" name="shpr_trdp_cd" value='<bean:write name="shpr_trdp_cd"/>'/>
	<input type="hidden" name="shpr_trdp_addr" value='<bean:write name="shpr_trdp_addr"/>'/>
	<input type="hidden" name="i_ooh_bkg_rmk" value='<bean:write name="i_ooh_bkg_rmk"/>'/>
	<input type="hidden" name="f_inv_seq" value='<bean:write name="f_inv_seq"/>'/>
	<input type="hidden" name="rpt_intg_bl_seq" value='<bean:write name="rpt_intg_bl_seq"/>'/>
	<!--  Report ==> OutLook연동 파라미터 (E) -->
	
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
	<div class="layer_popup_title">
	<!-- page_title_area -->
	<div class="page_title_area clear">
	   <h2 class="page_title">
			<span><bean:write name="title"/></span>
	   </h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn">
			<% if("Y".equals(autoEmailFlag)){%>
		   <button type="button" class="btn_accent" onClick="doWork('Fax');"><bean:message key="Fax"/></button><!-- 
 			--><%}%><!-- 
 		 --><button type="button" class="btn_normal" onClick="doWork('Mail');"><bean:message key="Outlook"/></button><!-- 
		     --><%if("Y".equals(autoEmailFlag)){%><!-- 
		    --><button type="button" class="btn_normal" onClick="doWork('Mail2');"><bean:message key="EMail"/></button><!-- 
		    --><%}%><!-- 
		    --><button type="button" class="btn_normal" onClick="doWork('Print');"><bean:message key="Print"/></button><!-- 
		    --><button type="button" class="btn_normal" onclick="doWork('CLOSE');"><bean:message key="Close"/></button>
	   </div>
	</div>
	</div>
	<div class="layer_popup_contents" style="overflow: hidden;">
		<div class="wrap_result">
	 <!-- wrap_result (S) -->
    <div class="layout_wrap" style="padding-left:50px">
     	<div id="mainTable" class="layout_flex_flex" style="padding-right:508px">
     		<script language="javascript">comRdObject('wo_rePort');</script>
	   </div>
	   
	   <div id="mail_tab"  class="layout_flex_fixed opus_design_inquiry" style="display:none;width:500px;float:right!important" >
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
						<td><textarea id="f_eml_content" name="f_eml_content" class="search_form_uppDown_apply" style="ime-mode:auto;width:400px;height:300px;"><%= userInfo.getEml_con() %></textarea></td>
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
	<iframe name="ifr_hidden" style="width:0;height:0;visibility:hidden" border=0></iframe>
	</div>
</form>