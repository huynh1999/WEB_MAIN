<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
<%@include file="./../../../../syscommon/header/CLTHeader.jsp"%>

<%
	//#52724 - [BINEX] IF REPORT TITLE IS UPDATED BY USER, TO SAVE THE PDF FILE AS "UPDATED TITLE"  FILE NAME도 USER가 입력한 UPDATED TITLE로 저장되도록의 요청
	String rpt_file_name_title = request.getParameter("rpt_file_name_title") != null ? request.getParameter("rpt_file_name_title") : "";
	if (!"".equals(rpt_file_name_title)){
		rpt_file_name_title = rpt_file_name_title.trim();  
	} 
%>
	<bean:parameter id="fileName" name="file_name"/>
	<bean:parameter id="rdParam" name="rd_param"/>
	
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/rpt/RPT_RD_0070.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/rd/rdviewer50u.js?ver=<%=CLT_JS_VER%>"></script>

	<script>
		var user_ofc_cnt_cd = "<%=userInfo.getOfc_cnt_cd()%>";
		//OFVFOUR-7087 [JAPT] Stamp does not show on Local statement when click PDF Download 
		var RD_path_tmp=RD_path;
		var fileNmArr;
		function setupPage(){
			loadPage();
		}
	</script>	

<style> body { border-top-width: 6px!important; } </style>
<form method="post" name="frm1" onSubmit="return false;">
	
	<input type="hidden" name="f_cmd"/>
	<input type="hidden" name="fileName" value='<bean:write name="fileName"/>'/>
	<input type="hidden" name="rdParam" value='<bean:write name="rdParam"/>'/>	
	<input type="hidden" name="filePath" value=""/>
</form>
<form name="frm2" method="POST" action="./GateServlet.gsl">
	<input type="hidden" name="goWhere" value="fd"/>
    <input type="hidden" name="bcKey"   value="rdPdfFileDown"/>
    <input type="hidden" name="filePath" value=""/>	
    <input type="hidden" name="fileNm" value=""/>
    
    <!-- #52512 [CLT] RD File Name을 표준화| Standardization of File Name during downloading the report -->
    <input type="hidden" name="rpt_file_name_title" value="<%=rpt_file_name_title%>"/>
</form>	


