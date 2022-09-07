<%-- 
=========================================================
*@FileName   : EDI_ACL_0020.jsp
*@FileTitle  : ACL EDI Upload
*@Description: ACL EDI File upload한다.
*@author     : 안준상 
*@version    : 1.0 - 01/05/2018
*@since      : 01/05/2018

*@Change history:
=========================================================
--%>

<%@ page contentType="text/xml; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/EDI_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/edi/acl/script/EDI_ACL_0020.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/EDI_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	
	<script>
	<logic:notEmpty name="EventResponse" property="mapVal">
		<bean:define id="tmpMap"  name="EventResponse" property="mapVal"/>
		<logic:notEmpty name="tmpMap" property="SAVED">
			doDispAclList();
		</logic:notEmpty>
	</logic:notEmpty>



	function setupPage(){
	   loadPage();
	}
	</script>
<style> body { border-top-width: 6px!important; } </style>
</head>
<div id="WORKING_IMG" style="position:absolute;background-color:#FFFFFF;width:357;height:130;display:none;" valign="middle" align="center">
    <iframe src='<%=CLT_PATH%>/js/common/wait.html' scrolling='no' frameborder='0' style='margin-top:0px;width:360px; height:135px; border:none;display:block'></iframe>
</div>

<form name="frm1" method="POST" action="./EDI_ACL_0020.clt" enctype="multipart/form-data">
	<!--Command를 담는 공통 -->
    <input type="hidden" name="f_cmd" value=""/>
	
	<!-- page_title_area -->
	<div class="layer_popup_title">
	<div class="page_title_area clear">
	   <h2 class="page_title">
			<span><bean:message key="Acl_EDI_Upload"/></span>
	   </h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn">
			 <button type="button" id="btnAdd" class="btn_accent" onclick="doWork('ADD')"><bean:message key="Save"/></button>
			 <button type="button" class="btn_normal" onclick="doWork('CLOSE')"><bean:message key="Close"/></button>
	   </div>
	</div>
	</div>
	<div class="layer_popup_contents">
	<div class="wrap_search">	
	   	<div class="opus_design_inquiry ">
	   		 <table>
                 <tr>
                     <th><bean:message key="File_Attach"/></th>
                     	<td> 
                     		<input type="file" name="acl_edi_url" class="search_form" size="40"/> 
                     	</td>
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

	


