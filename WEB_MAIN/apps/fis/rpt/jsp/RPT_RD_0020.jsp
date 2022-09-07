<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->

	<%@include file="./../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	
    <script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/rpt/RPT_RD_0020.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/rd/rdviewer50u.js?ver=<%=CLT_JS_VER%>"></script>
	
	
	<%
		String ofcLoclNm = userInfo.getOfc_locl_nm();
		String usrNm = userInfo.getUser_name();
		String email = userInfo.getEml();
		String userId = userInfo.getUsrid();
	%>
	
	<!-- HTML5 TEST -->
 	<script src="<%=CLT_PATH%>/js/rd/jquery-1.11.0.min.js?ver=<%=CLT_JS_VER%>"></script>
	<script src="<%=CLT_PATH%>/js/rd/crownix-viewer.min.js?ver=<%=CLT_JS_VER%>"></script>
	<link rel="stylesheet" type="text/css" href="<%=CLT_PATH%>/js/css/crownix-viewer.min.css">
	
	<style>
	<!--
		.crownix-container span {white-space:pre}
	-->
	</style>
	
	<bean:parameter id="fileName" name="file_name"/>
	<bean:parameter id="rdParam" name="rd_param"/>
	<bean:parameter id="title" name="title"/>
	<bean:parameter id="jnr_no" name="f_jnr_no"/>
	
	<bean:parameter id="f_inv_seq" name="f_inv_seq" value=""/>

	<bean:parameter id="rpt_intg_bl_seq" name="rpt_intg_bl_seq" value=""/>	
	
	
	<script language="javascript">
		var user_ofc_cnt_cd = "<%=userInfo.getOfc_cnt_cd()%>";
		var rpt_file_path = "<%=userInfo.getRpt_file_path().replaceAll("\\\\","\\\\\\\\")%>";
		var listYn = "N";
		
		function setupPage(){
			if(typeof(opener.document.frm1.pageurl)!='undefined'){
				var pageUrl = opener.document.frm1.pageurl.value;
				pageUrl = pageUrl.substring(0, pageUrl.indexOf(".clt"));
				
				if(pageUrl == "ACC_JOR_0040" || pageUrl == "ACC_JOR_0041" || pageUrl == "ACC_JOR_0042"){ // Payment List
					listYn = "Y";
				}
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
	
	<!-- jsjang 2013.8.20 #17610 : [BINEX] 7. Email 전송 History -->
	<script language="javascript" for="wo_rePort" event="PrintFinished()">
		registRptPrintHistory();
	</script>		

<style> body { border-top-width: 6px!important; } </style>
<form method="post" name="frm1" onSubmit="return false;">
	<input type="hidden" name="fileName" value="<bean:write name="fileName"/>"/>
	<input type="hidden" name="rdParam" value="<bean:write name="rdParam"/>"/>
	<input type="hidden" name="f_jnr_no" value="<bean:write name="jnr_no"/>"/>
	<input type="hidden" name="proc_usrid" value="<%=userId %>"/>
	
	<!-- jsjang 2013.8.20 #17610 : [BINEX] 7. Email 전송 History -->
	<input type="hidden" name="f_inv_seq" value='<bean:write name="f_inv_seq"/>'/>
	<input type="hidden" name="title" value='<bean:write name="title"/>'/>
	<input type="hidden" name="rpt_intg_bl_seq" value='<bean:write name="rpt_intg_bl_seq"/>'/>	
	<input type="hidden" name="mailTo" value=''/>
	<div class="layer_popup_title">
		<!-- page_title_area -->
		<div class="page_title_area clear">
		   <h2 class="page_title">
				<span><bean:write name="title"/></span>
		   </h2>
		   <!-- btn_div -->
		   <div class="opus_design_btn">
			   <button type="button" class="btn_accent" id="btnPrint" onClick="doWork('Print');"><bean:message key="Print"/></button>
			   <button type="button" class="btn_normal" onclick="doWork('CLOSE');"><bean:message key="Close"/></button>
		   </div>
		</div>
	</div>
	
 	<div style="overflow:hidden">
		<div class="wrap_result">
    		<div style="padding-left:50px">
	 			<div id="mainTable"  class="layout_flex_flex" style="top:50px; left:6px; padding-left:0px; width:calc(100% - 12px); height:100%;">
 	    		 	<script language="javascript">comRdObject('wo_rePort');</script>
				</div>
			</div>
		</div>
	</div>
	
</form>


