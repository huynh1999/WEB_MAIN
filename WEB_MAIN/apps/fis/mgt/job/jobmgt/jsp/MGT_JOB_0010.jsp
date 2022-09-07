<%--
=========================================================
*@FileName   : MGT_JOB_0010.jsp
*@FileTitle  : Job Management
*@Description: Trade Partner ManagementList
*@author     : Phitran
*@since      :06/11/2014
*@Change history:
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SYS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
	<!-- 일자 및 달력팝업 호출 -->
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	
	
	<script>
		var pDoc = parent.parent.parent.document;
		hideProcess('WORKING', pDoc);
	</script>
	<script>
	function setupPage()
	{
		loadPage();
	}
	
	$(document).ready(function(){			
		frm1.category_code.focus();
	});
</script>					
<!--ajax 사용시 -->
<script>
    var pDoc = parent.parent.parent.document;
    hideProcess('WORKING', pDoc); 
    
	<!-- 처리시 메시지 -->
	var CNF_MSG1 = '<bean:message key="Do_you_want_to_run"/>';
	var PARAM1_1 = ' |';
	var PARAM1_2 = ' |';
	var PARAM2_1 = ' |';
	var PARAM2_2 = ' |';
	var PARAM3_1 = ' |';
	var PARAM3_2 = ' |';
	var PARAM4_1 = ' |';
	var PARAM4_2 = ' |';
	var PARAM5_1 = ' |';
	var PARAM5_2 = ' |';

	<bean:define id="rtnMap" name="EventResponse" property="mapVal"/>
	
	<% boolean isBegin = false; %>
	<bean:define id="param1List"  name="rtnMap" property="PARAM1"/>
	<logic:iterate id="codeVO" name="param1List">
		<% if(isBegin){ %>
			PARAM1_1+= '|';
			PARAM1_2+= '|';
		<% }else{
			  isBegin = true;
		   } %>
		PARAM1_1+= '<bean:write name="codeVO" property="cd_nm"/>';
        PARAM1_2+= '<bean:write name="codeVO" property="cd_val"/>';
    </logic:iterate>	
    
    <% isBegin = false; %>
	<bean:define id="param2List"  name="rtnMap" property="PARAM2"/>
	<logic:iterate id="codeVO" name="param2List">
		<% if(isBegin){ %>
			PARAM2_1+= '|';
			PARAM2_2+= '|';
		<% }else{
			  isBegin = true;
		   } %>
		PARAM2_1+= '<bean:write name="codeVO" property="cd_nm"/>';
        PARAM2_2+= '<bean:write name="codeVO" property="cd_val"/>';
    </logic:iterate>
    

</script>
<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/mgt/job/jobmgt/script/MGT_JOB_0010.js?ver=<%=CLT_JS_VER%>"></script>
<style type="text/css">
<!--
style1 {color: #CC0000}
-->
</style>
</head>

<form name="frm1" method="POST" action="./">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd" id="f_cmd" />
	<input type="hidden" name="work_flg" id="work_flg" />
	<input type="hidden" name="f_CurPage" id="f_CurPage" />
	<input type="hidden" name="f_Flag" id="f_Flag" />
	<!--Category Code를 넘긴다 -->
	<input type="hidden" name="c_code" id="c_code" />
	<!--Template 삭제여부/저장후조회를 위해 hidden으로 처리한다. -->
	<input type="hidden" name="tmp_del" id="tmp_del" />
	<input type="hidden" name="template_code" id="tmplt_seq" />
	
	<bean:define id="rtnMap" name="EventResponse" property="mapVal"/>	
	<input type="hidden" name="tmp_seq"  id="tmp_seq" value="<bean:write name="rtnMap" property="jb_tmplt_seq"></bean:write>" />
	
	 <div class="page_title_area clear">
	   <h2 class="page_title" id='bigtitle'><button type="button"><%=LEV3_NM%></button></h2>
		   <!-- btn_div -->
		   <div class="opus_design_btn TOP">
		   <%-- 
			   <button type="button" class="btn_accent" onclick="doWork('SEARCHLIST');" style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>"><bean:message key="Search"/></button> 
			   <button type="button" class="btn_normal" onclick="doWork('NEW')"  style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr2() %>"><bean:message key="New"/></button>
               <button id="save_btn" type="button" class="btn_normal" onclick="check_save_null()" style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr3() %>"><bean:message key="Save"/></button>
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
	<div class= "wrap_search">
 		<div class= "opus_design_inquiry entry_pannel">
 			<table>
 				<colgroup>
 					<col width="120">
 					<col width="*">
 				</colgroup>
 				<tr>
 					<th><bean:message key="Category"/></th>
 					<td id="div_subcode">
 					<select name="category_code" id="category_code" style="width:105px" onchange="doWork('SEARCHLIST')">		
 						<option value="SO">Ocean Export</option>					
						<option value="SI">Ocean Import</option>				
						<option value="AO">Air Export</option>				
						<option value="AI">Air Import</option>				
						<!-- 기존 inbound outbound로 되어있는 것일 export import로 코드 변경하려 하였으나 일단 기존대로 사용하기로 함
						<option value="OE">Ocean Export</option>					
						<option value="OI">Ocean Import</option>				
						<option value="AE">Air Export</option>				
						<option value="AI">Air Import</option>	
						 -->				
					</select>
 					<% /* 
 						<logic:notEmpty name="EventResponse">
						     <bean:define id="categoryMap"  name="EventResponse" property="mapVal"/>
						     <bean:define id="categoryList" name="categoryMap" property="categoryList"/>
						     <select name="category_code" id="category_code">
					             <logic:iterate id="categoryVO" name="categoryList">
						             <option value='<bean:write name="categoryVO" property="cd_val"/>'><bean:write name="categoryVO" property="cd_nm"/></option>
					             </logic:iterate>
				             </select>
					    </logic:notEmpty>	
					    */
					    %>
 					</td>
 					<td></td>
 				</tr>
 			</table>
 		</div>
 	</div>
 	<!-- new-->
	<div class="wrap_result">
		<div class="layout_vertical_2" style="width: 20%">
			<h3 class="title_design"><bean:message key="Template_List"/></h3>
	       	<div class="opus_design_grid">
				<script type="text/javascript">comSheetObject('sheet1');</script>
			</div>
		</div>
		<div class="layout_vertical_2 mar_left_8" style="width: 79%">
			<div class= "opus_design_inquiry">
	 			<table>
	 				<colgroup>
	 					<col width="120">
	 					<col width="160">
	 					<col width="100">
	 					<col width="220">
	 					<col width="130">
	 					<col width="*">
	 				</colgroup>
	 				<tr>
	 					<th><bean:message key="Template_List_Name"/></th>
	 					<td>
							<input required type="text" name="tmplt_nm" value="" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:145px" maxlength="50" class="search_form">									
						</td>
						<th><bean:message key="Description"/></th>
						<td>
	                        <input required type="text" name="description" value="" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:220px" maxlength="200" class="search_form">
						</td>
						<th><label for="tmplet_del"><bean:message key="Template_Delete"/></label></th>
						<td>
							<input type="checkbox" name="tmplet_del" id="tmplet_del" />
						</td>
	 				</tr>
	 			</table>
	 		</div>
	 		<table class="line_bluedot"><tr><td></td></tr></table>
			<div class="opus_design_grid">
			 <div class="opus_design_btn">
			  <button type="button" class="btn_accent" name="cnrtAdd" id="cnrtAdd" onClick="doWork('ROWADD')"><bean:message key="Add"/></button>
              <button type="button" class="btn_accent" name="cnrtAdd" id="cnrtAdd" onClick="doWork('MODIFY1')"><bean:message key="Delete"/></button>
            </div>
			<script type="text/javascript">comSheetObject('sheet2');</script>
			</div>
		</div>
	</div> 
    <!-- new-->    
	
	

 
	<!-- OLD
	<div class="wrap_result">
 		<div class= "opus_design_inquiry">
 			<table>
 				<colgroup>
 					<col width="120">
 					<col width="160">
 					<col width="100">
 					<col width="220">
 					<col width="130">
 					<col width="*">
 				</colgroup>
 				<tr>
 					<th><bean:message key="Template_List_Name"/></th>
 					<td>
						<input required type="text" name="tmplt_nm" value="" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:145px" maxlength="50" class="search_form">									
					</td>
					<th><bean:message key="Description"/></th>
					<td>
                        <input required type="text" name="description" value="" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:220px" maxlength="200" class="search_form">
					</td>
					<th><label for="tmplet_del"><bean:message key="Template_Delete"/></label></th>
					<td>
						<input type="checkbox" name="tmplet_del" id="tmplet_del" />
					</td>
 				</tr>
 			</table>
 		</div>
 	
    	<div class="opus_design_grid" id="mainTable">
    		<script type="text/javascript">comSheetObject('sheet1');</script>
    	</div>
		<div class="opus_design_inquiry">
			<table>
				<colgroup>
					<col width="700">
					<col width="150">
					<col width="100">
					<col width="*">
				</colgroup>
				<tr>
					<th><bean:message key="Basic_Time"/></th>
					<td height="7">
		            	<select name="basic_time" style="width:130px">
		          			<option selected="true" value=""></option>
		          		</select>
          			</td>
          			<th><bean:message key="Calc_Logic"/></th>
          			<td height="7">
	            		<select name="cal_loc" style="width:60px;text-align:center;font-size:14">
		         			<option value='PLS'> + </option>
		         			<option value='MIN'> - </option>
		         		</select>
	          		</td>
				</tr>
			</table>
		</div>
			</div>
		 -->
</div>
</form>                  
<script type="text/javascript">
doBtnAuthority("<%= roleBtnVO != null ? roleBtnVO.getAttr_extension() : "" %>");

</script>	


