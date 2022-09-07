<%
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : CreatePropList.jsp
*@FileTitle  : Language Properties Create 
*@author     : CLT
*@version    : 1.0
*@since      : 2016/09/19
=========================================================*/
%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
    
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SYS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/opusbase/system/menu/script/CreatePropList.js?ver=<%=CLT_JS_VER%>"></script>

	<script type="text/javascript">
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
	 	
   	 	function setupPage(){
	    	loadPage();
	    }
	</script>
<form name="frm1" method="POST" action="./">
	<input	type="hidden" name="f_cmd"/> 

	<div class="layer_popup_title">
		<!-- page_title_area -->
		<div class="page_title_area clear">
		   <h2 class="page_title"><bean:message key="CREATE_PROP_LIST"/></h2>
		   <!-- btn_div -->
		   <div class="opus_design_btn">
		   	<button type="button" class="btn_accent" <%= null != roleBtnVO? "style='display:none;' btnAuth='" + roleBtnVO.getAttr1() + "'"  : "" %> onclick="doWork('SEARCHLIST');"><bean:message key="Search"/></button><!-- 
			--><button type="button" class="btn_normal" onclick="doWork('CREATE')"><bean:message key="Create"/></button><!-- 
			--><button type="button" class="btn_normal" onclick="doWork('CLOSE');"><bean:message key="Close"/></button>
		   </div>
		</div>
	</div>
	<div class="layer_popup_contents">
		<div class="wrap_search">	
		   	<div class="opus_design_inquiry ">
		   		<table>
				<colgroup>
					<col width="80">
					<col width="220">
					<col width="60">
					<col width="190">
					<col width="60">
					<col width="*">
				</colgroup>
				<tbody>
			        <tr>
			            <th><bean:message key="MSG_PROP_TYPE"/></th>
						<td>
	                        <select name="f_msg_prop_tp" id="f_msg_prop_tp" class="search_form" style="width:220px;" onchange="javascript:msgFileCodeFilter(this);">
	                            <option value="">ALL</option>
	                            <logic:iterate id="codeVO" name="PARAM1">
	                                <option value='<bean:write name="codeVO" property="cd_val"/>'><bean:write name="codeVO" property="cd_nm"/></option>
	                            </logic:iterate>
	                        </select>
						</td>
						
						<th><bean:message key="MSG_PROP_FILE"/></th>
						<td>
	                        <select name="f_msg_prop_file" id="f_msg_prop_file" class="search_form" style="width:190px;">
	                            <option value="">ALL</option>
	                            <logic:iterate id="codeVO" name="PARAM2">
	                                <option value='<bean:write name="codeVO" property="cd_val"/>'><bean:write name="codeVO" property="rmk"/></option>
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
			        </tr>
			    </tbody>
			    </table>
		   	</div>
		</div>
		<div class="wrap_result">
			<!-- <h3 class="title_design"><bean:message key="Select_List"/></h3> -->
			<div class="opus_design_grid" style="height:290px">
				<script language="javascript">comSheetObject('sheet1');</script>
			</div>
		</div>
	</div>
</form>
