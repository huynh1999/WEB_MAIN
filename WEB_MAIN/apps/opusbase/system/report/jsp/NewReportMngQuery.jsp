<%-- 
=========================================================
*@FileName   : NewReportMngQuery.jsp
*@FileTitle  : New report Manage
*@Description: New report Manage
*@author     : Duc.Nguyen
*@version    : 1.0 - 2017/12/08
*@since      : 2017/12/08

*@Change history:
=========================================================
--%>

<%@ page contentType="text/xml; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SEA_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="./apps/opusbase/system/report/script/NewReportMngQuery.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoBizCommon.js?ver=<%=CLT_JS_VER%>"></script>
	
	<script>		
	function setupPage(){
	   loadPage();
	}
	</script>
</head>
<div id="WORKING_IMG" style="position:absolute;background-color:#FFFFFF;width:357;height:130;display:none;" valign="middle" align="center">
    <iframe src='<%=CLT_PATH%>/js/common/wait.html' scrolling='no' frameborder='0' style='margin-top:0px;width:360px; height:135px; border:none;display:block'></iframe>
</div>

<form method="post" name="frm1" onSubmit="return false;">
	<!--Command를 담는 공통 -->
    <input type="hidden" name="f_cmd" value=""/>    
	<!-- page_title_area -->
	<div class="layer_popup_title">
	<div class="page_title_area clear">
	   <h2 class="page_title">
			<span><bean:message key="Query"/></span>
	   </h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn">
	   		<button type="button" id="btnAdd" class="btn_accent" onclick="doWork('SAVE')"><bean:message key="OK"/></button>
	   		<button type="button" class="btn_normal" onclick="doWork('CANCEL')"><bean:message key="Cancel"/></button>		   
	   </div>
	</div>
	</div>
	<div class="layer_popup_contents">
	<div class="wrap_search">	
	   	<div class="opus_design_inquiry">	   		
	   		 <table>
                 <tr>
                     <th><bean:message key="Query"/></th>
                     <td><textarea name="f_qry" class="search_form" dataformat="multiLanguage" style="<%=MULTI_IMEMODE%>width:560px;height:300px"></textarea></td>
                 </tr>
             </table>
	   	</div>
	</div>
	</div>
</form>
<!--  Complete Image  -->
<div id="COMPLETE_IMG" style="position:fixed;display:none; filter:alpha(opacity = 100); width:280px;height:60px;top:50%;left:50%;margin:-30px 0 0 -140px;z-index:999">
	<iframe src='<%=CLT_PATH%>/js/common/completed.html' scrolling='no'  style='margin-top: 0px; width:100%; height: 60px;'></iframe>
</div>

	