<%--
=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : MsgLngMng.jsp
*@FileTitle  : Language Properties
*@author     : LSY
*@version    : 1.0
*@since      : 2016/09/19
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	    <title><bean:message key="system.title"/></title>
	<!-- 일자 및 달력팝업 호출 -->
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SYS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/FMS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="./apps/opusbase/system/menu/script/MsgLngMng.js?ver=<%=CLT_JS_VER%>" ></script>
	
	<script>
		var pDoc = parent.parent.parent.document;
		hideProcess('WORKING', pDoc);
		
 		var PARAM1_1 = '';
 		var PARAM1_2 = '';

 		<bean:define id="rtnMap" name="EventResponse" property="mapVal"/>
 		<% boolean isBegin = false; %> 
     	<!--Bound Class Code 코드조회-->
			<bean:define id="PARAM1"  name="rtnMap" property="PARAM1"/>
 		<logic:iterate id="codeVO" name="PARAM1">
 			<% if(isBegin){ %> 
 				PARAM1_1+= '|';
 				PARAM1_2+= '|';
 			<% }else{ 
 			  	isBegin = true;
 		   	} %> 
 			PARAM1_1+= '<bean:write name="codeVO" property="cd_nm"/>';
         	PARAM1_2+= '<bean:write name="codeVO" property="cd_val"/>';
     	</logic:iterate>
     	
 		var PARAM2_1 = '';
 		var PARAM2_2 = '';

 		<% isBegin = false; %> 
     	<!--Bound Class Code 코드조회-->
		<bean:define id="PARAM2"  name="rtnMap" property="PARAM2"/>
 		<logic:iterate id="codeVO" name="PARAM2">
 			<% if(isBegin){ %> 
 				PARAM2_1+= '|';
 				PARAM2_2+= '|';
 			<% }else{ 
 			  	isBegin = true;
 		   	} %> 
 			PARAM2_1+= '<bean:write name="codeVO" property="cd_nm"/>';
         	PARAM2_2+= '<bean:write name="codeVO" property="cd_val"/>';
     	</logic:iterate>
     	
 		var PARAM3_1 = '';
 		var PARAM3_2 = '';

 		<% isBegin = false; %> 
     	<!--Bound Class Code 코드조회-->
			<bean:define id="PARAM3"  name="rtnMap" property="PARAM3"/>
 		<logic:iterate id="codeVO" name="PARAM3">
 			<% if(isBegin){ %> 
 				PARAM3_1+= '|';
 				PARAM3_2+= '|';
 			<% }else{ 
 			  	isBegin = true;
 		   	} %> 
 			PARAM3_1+= '<bean:write name="codeVO" property="cd_nm"/>';
         	PARAM3_2+= '<bean:write name="codeVO" property="cd_val"/>';
     	</logic:iterate>
	</script>
<script type="text/javascript">
<!--
function setupPage(){
	loadPage();
}
//-->
</script>
	<form name="frm1" method="POST" action="./">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd" id="f_cmd"/> 
	<input type="hidden" name="f_CurPage" id="f_CurPage"/>
	<input type="hidden" name="h_msg_key" id="h_msg_key"/>
    <!-- 타이틀, 네비게이션 -->
 <!-- page_title_area(S) -->
	<div class="page_title_area clear ">
		<!-- page_title(S) -->
		<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
		<!-- page_title(E) -->
			
		<!-- opus_design_btn(S) -->
		<div class="opus_design_btn TOP" >
		<%-- 
		 	    <button type="button" class="btn_accent" <%= null != roleBtnVO? "style='display:none;' btnAuth='" + roleBtnVO.getAttr1() + "'"  : "" %> onclick="doWork('SEARCHLIST');"><bean:message key="Search"/></button> 
		 		<button type="button" class="btn_normal" onclick="doWork('ROWADD')" ><bean:message key="Add"/></button> 
		 		<button type="button" class="btn_normal" <%= null != roleBtnVO? "style='display:none;' btnAuth='" + roleBtnVO.getAttr3() + "'"  : "" %> onclick="doWork('MODIFY')" id="btnModify"><bean:message key="Save"/></button>
		 		<button type="button" class="btn_normal" <%= null != roleBtnVO? "style='display:none;' btnAuth='" + roleBtnVO.getAttr6() + "'"  : "" %> onclick="doWork('EXCEL')" name="btn_DownExcel"><bean:message key="Excel"/></button>
		 		 --%>
		</div>
		<!-- opus_design_btn(E) -->	
		    <!-- page_location(S) -->
		<div class="location">
        <!-- location 내용 동적생성 (별도 코딩 불필요) -->
			<span><%=LEV1_NM%></span> &gt;
		    <span><%=LEV2_NM%></span> &gt;
		    <span><%=LEV3_NM%></span>
		    <a href="" class="ir">URL Copy</a>
		</div>
	</div>
<div class="over_wrap" height="100%">	
    <!-- page_location(E) -->      
<div class= "wrap_search">
		<div class= "opus_design_inquiry">
		<table>
			<colgroup>
				<col width="80">
				<col width="180">
				<col width="60">
				<col width="160">
				<col width="60">
				<col width="100">
				<col width="60">
				<col width="100">
				<col width="60">
				<col width="*">
			</colgroup>
			<tbody>
					<tr>
						<th><bean:message key="MSG_PROP_TYPE"/></th>
						<td>
	                        <select name="f_msg_prop_tp" id="f_msg_prop_tp" class="search_form" style="width:180px;" onchange="javascript:msgFileCodeFilter(this);">
	                            <!-- <option value="">ALL</option> -->
	                            <logic:iterate id="codeVO" name="PARAM1">
	                                <option value='<bean:write name="codeVO" property="cd_val"/>'><bean:write name="codeVO" property="cd_nm"/></option>
	                            </logic:iterate>
	                        </select>
						</td>
						
						<th><bean:message key="MSG_PROP_FILE"/></th>
						<td>
	                        <select name="f_msg_prop_file" id="f_msg_prop_file" class="search_form" style="width:160px;">
	                            <option value="">ALL</option>
	                            <logic:iterate id="codeVO" name="PARAM2">
	                                <option value='<bean:write name="codeVO" property="cd_val"/>'><bean:write name="codeVO" property="cd_nm"/></option>
	                            </logic:iterate>
	                        </select>
						</td>
						
						<th><bean:message key="Language"/></th>
						<td>
	                        <select name="f_lang_cd" class="search_form" style="width:100px;">
	                            <option value="">ALL</option>
	                            <logic:iterate id="codeVO" name="PARAM3">
	                                <option value='<bean:write name="codeVO" property="cd_val"/>'><bean:write name="codeVO" property="cd_nm"/></option>
	                            </logic:iterate>
	                        </select>
						</td>
						
						<th><bean:message key="MSG_KEY"/></th>
						<td>
							<input type="text" name="f_msg_key" maxlength="60" value="" dataformat="excepthan" style="ime-mode:disabled;" onKeyPress="fncSearch();">
						</td>
						
						
						<th><bean:message key="MSG_VALUE"/></th>
						<td>
							<input type="text" name="f_msg_val" maxlength="500" value="" style="ime-mode:disabled;width:500px;" onKeyPress="fncSearch();">
						</td>
						
					</tr>
			</tbody>			
		</table>

</div>
</div>    
<div class="wrap_result"> 	
	<div class="opus_design_btn">
		<button type="button" class="btn_etc" onclick="doWork('CREATE')"><bean:message key="Create"/></button>
	</div>
	<!-- <h3 class="title_design mar_btm_8"><bean:message key="Basic_Information"/></h3> -->
	<div class="opus_design_grid">	
		<script type="text/javascript">comSheetObject('sheet1');</script>
	</div>
</div>  
</div>
</form>  
 
<script type="text/javascript">
	var attr_extension = "<%= null!=roleBtnVO ?roleBtnVO.getAttr_extension():"" %>";
	doBtnAuthority(attr_extension);
</script>	
