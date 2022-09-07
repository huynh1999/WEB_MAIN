<%-- 
=========================================================
*@FileName	: SEE_BMD_0051.jsp
*@FileTitle  : Shipping Document
*@Description: Shipping Document 등록 수정한다.
*@author	  : 이광훈 - sea =Export 
*@version	 : 1.0 - 01/09/2009
*@since		: 01/09/2009

*@Change history:
=========================================================
--%>

<%@ page contentType="text/xml; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"	prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SEA_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/mgt/alt/alertmgt/script/MGT_POP_0010.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoBizCommon.js?ver=<%=CLT_JS_VER%>"></script>

<%
String userRoleCd = userInfo.getRole_cd();
%>	
	
	<script>
	function setupPage(){

		if (frm1.alt_type.value == "N") {
			$("#tr_alt_sql").css("width",0);
			$("#tr_alt_sql").css("height",0);
			$("#tr_alt_sql").css("display","none");
		} else if ('<%=userRoleCd%>' !='Master' && frm1.alt_type.value == "A"){
			$("#tr_alt_sql").css("display","none");
		} 

		loadPage();
		doWork('SEARCHLIST');
	}
	</script>
<style> body { border-top-width: 6px!important; } </style>
</head>
<div id="WORKING_IMG" style="position:absolute;background-color:#FFFFFF;width:357;height:130;display:none;" valign="middle" align="center">
	 <iframe src='<%=CLT_PATH%>/js/common/wait.html' scrolling='no' frameborder='0' style='margin-top:0px;width:360px; height:135px; border:none;display:block'></iframe>
</div>

<form name="frm1" method="POST" action="./MGT_POP_0010.clt">

	<bean:define id="objVO"  name="EventResponse" property="objVal"/>
    
	<input type="hidden" name="f_cmd" value=""/>
    <input type="hidden" name="fom_seq" value='<bean:write name="objVO" property="fom_seq"/>'/>
    <input type="hidden" name="alt_seq" id="alt_seq" value="<%=request.getParameter("alt_seq")%>"/> 

	<input	type="hidden" name="alt_type"  id="alt_type" value="<%=request.getParameter("alt_type")%>"/> 
	<input	type="hidden" name="phys_ett_nm" value="<%=request.getParameter("phys_ett_nm")%>"/> 
	<input	type="hidden" name="phys_attr_nm" value="<%=request.getParameter("phys_attr_nm")%>"/> 
	
	<!--Command를 담는 공통 -->
	<!-- page_title_area -->
	<div class="layer_popup_title">
		<div class="page_title_area clear">
			<h2 class="page_title">
				<span><bean:message key="Exception_Alert_Msg"/></span>
			</h2>
			<!-- btn_div -->
			<div class="opus_design_btn">
				<button type="button" id="btnDel" style="cursor:hand; display:none;" class="btn_accent" onclick="doWork('DELETE')"><bean:message key="Delete"/></button>
				<button type="button" id="btnAdd" class="btn_accent" onclick="doWork('MODIFY')"><bean:message key="Save"/></button>
				<button type="button" class="btn_normal" onclick="doWork('CLOSE')"><bean:message key="Close"/></button>
			</div>
		</div>
	</div>
	<div class="layer_popup_contents">
		<div class="wrap_search">	
			<div class="opus_design_inquiry ">
				<table>
					<%-- <tr>
						<th width="120"><bean:message key="Type"/></th>
						<td><html:text name="objVO" property="fom_nm" styleClass="search_form" maxlength="20" style="width:238px;"/></td>
					</tr> --%>
					<tr>
						<th><bean:message key="Title"/></th>
						<td><input type="text" name="fom_tit" id="fom_tit"  maxlength="100" value="<bean:write name="objVO" property="fom_tit"/>" style="width:560px;" /></td>
					</tr>
					<tr>
						<th><bean:message key="Contents"/></th>
						<td><textarea name="fom_ctnt" id="fom_ctnt" class="search_form" style="width:560px;height:320px;text-transform:none;" maxlength="2000"><bean:write name="objVO" property="fom_ctnt" filter="false"/></textarea></td>
					</tr>
					<tr id = "tr_alt_sql">
						<th><bean:message key="Query"/></th>
						<td><textarea name="alt_sql" id="alt_sql" class="search_form" style="width:1000px;height:420px" maxlength="5000"><bean:write name="objVO" property="alt_sql" filter="false"/></textarea></td>
					</tr>
				</table>
			</div>
		</div>
	</div>
</form>




