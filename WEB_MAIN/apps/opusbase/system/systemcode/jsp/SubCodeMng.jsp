<%--
=========================================================
*Copyright(c) 2008 CyberLogitec. All Rights Reserved.
=========================================================

=========================================================
*@FileName   : CodeSub.jsp
*@FileTitle  : 마스터 코드(카테고리)의 서브 코드 정보를 등록하는 화면임  
*@Description: 서브코드의 조회/등록/수정/삭제를 담당함
*@author     : Kang,Jung-Gu - Cyberlogitec
*@version    : 1.0 - 08/07/2008
*@since      : 08/07/2008

*@Change history:
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<!-- 공통 Header -->
	<%@include file="./../../../../../../../../syscommon/header/CLTHeader.jsp"%>
    <script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SYS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/opusbase/system/systemcode/script/SubCodeMng.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
<script>
	function setupPage(){
       	loadPage();
    	<%
    	String com_cd = (String)request.getParameter("com_cd");
    	if(com_cd == null){com_cd = "";}
    	String cd_spc_qty = (String)request.getParameter("cd_spc_qty");
    	if (com_cd != ""){
    	%>    	
    	doWork('SEARCHLIST');
    	<%
    	}
    	%>
    }
</script>

<form method="post" name="frm1" onSubmit="return false;">
	<input type="hidden" name="f_cmd">
    <input type="hidden" name="f_type_com_cd" value=""> 
	<input type="hidden" name="f_com_cd" value="">
	<!-- page_title_area -->
	<div class="page_title_area clear">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn TOP">
	   <%-- 
		    <button type="button" class="btn_accent" onclick="doWork('ROWADD')"><bean:message key="Add"/></button> 
			<button type="button" class="btn_normal" id="btnAdd" onclick="doWork('ADD')"><bean:message key="Save"/></button> 
			<button type="button" class="btn_normal" onclick="doWork('EXCEL')" name="btn_DownExcel"><bean:message key="Excel"/></button>
		--%> 
	   </div>
	   <!-- btn_div -->
	   <div class="location">
		   <span><%=LEV1_NM%></span> &gt;
		   <span><%=LEV2_NM%></span> &gt;
		   <span><%=LEV3_NM%></span>
		   <a href="" class="ir">URL Copy</a>
	   </div>
	</div>
<div class="over_wrap" height="100%">	
	<!-- wrap_search (S) -->
	<div class="wrap_search">	
		<div class="opus_design_inquiry entry_pannel ">
			<table>
				<colgroup>
					<col width="80">
					<col width="200">
					<col width="90">
					<col width="*">
				</colgroup>
				<tbody>
					<tr>
						<th><bean:message key="Master_Name"/></th>
						<td> 
							 <select name="f_cd_select" onchange="doWork('SEARCHLIST');"> 
							 	<option value=""></option> 
							 		<logic:notEmpty name="findParam"> 
							 			<logic:iterate id="cdVO" name="findParam"> 
							 			<logic:equal name="cdVO" property="com_cd" value="<%=com_cd%>">
							 			<option value='<bean:write name="cdVO" property="com_cd"/>;<bean:write name="cdVO" property="cd_spc_qty"/>' selected="selected"><bean:write name="cdVO" property="com_cd_nm"/></option> 
							 			</logic:equal>
							 			<logic:notEqual name="cdVO" property="com_cd" value="<%=com_cd%>">
							 			 <option value='<bean:write name="cdVO" property="com_cd"/>;<bean:write name="cdVO" property="cd_spc_qty"/>'><bean:write name="cdVO" property="com_cd_nm"/></option> 
							 			</logic:notEqual>
							 			  
							 			</logic:iterate> 
							 		</logic:notEmpty> 
							 </select> 
						 </td>
						<th><bean:message key="Code_Length"/></th>
						<td><input type="text" name="cd_maxlen" style="width:40px;text-align:center;" readonly ></td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	<!-- wrap_result (S) -->
    <div class="wrap_result">
		<div class="opus_design_grid">
			<script language="javascript">comSheetObject('sheet1');</script>
		</div>
	</div>
	<!-- wrap_result (E) -->
</div>	
</form>
<script>
    var pDoc = parent.parent.parent.document;
    hideProcess('WORKING', pDoc);   
</script>
