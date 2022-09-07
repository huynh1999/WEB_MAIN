<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@page import="com.clt.framework.component.util.JSPUtil"%></html>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	    <title><bean:message key="system.title"/></title>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoFormControl.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoBizCommon.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/whm/warehouse/entry/script/WHM_WHM_0001.js?ver=<%=CLT_JS_VER%>"></script>
	<%@ page import="com.clt.syscommon.response.CommonEventResponse"%>
	<%
		String ofc_cd		= userInfo.getOfc_cd();
		String ofc_eng_nm = userInfo.getOfc_eng_nm();
		String usrNm = userInfo.getUser_name();
		String email = userInfo.getEml();
		String func = request.getParameter("func");
		String wh_cd = request.getParameter("wh_cd");
	%>
	
	<bean:define id="mapVal" name="EventResponse" property="mapVal"/>
	
	<script type="text/javascript">
	var comcd_sptp_cd = '<bean:write name="mapVal" property="sptp_cd"/>';
    var comcd_sptp_nm = '<bean:write name="mapVal" property="sptp_nm"/>';
    var comcd_tp_cd = '<bean:write name="mapVal" property="tp_cd"/>';
    var comcd_tp_nm = '<bean:write name="mapVal" property="tp_nm"/>';
    var attr_extension = "<%= roleBtnVO.getAttr_extension() %>";
	</script>



<!--  <body class="td" onload="javascript:loadPage();">-->
<form name="frm1" method="post" action="./" style="margin:0px">	

	<!-- 세션 유저 정보    -->
	<input	type="hidden" name="f_usr_nm" value="<%= usrNm %>"/>
	<input	type="hidden" name="f_email" value="<%= email %>"/>
	<input	type="hidden" name="f_ofc_cd" value="<%= ofc_cd %>"/>
	<input	type="hidden" name="f_ofc_nm" value="<%= ofc_eng_nm %>"/>
	<!-- ------------------------------------------------------ -->
	<input type="hidden" id="f_cmd" name="f_cmd"/>
	<input type="hidden" id="wh_cd" name="wh_cd"/>
	<input type="hidden" id="func" name = "func" value="<%=func%>"/>
	<input type="hidden" id="wh_cd_param" name = "wh_cd_param" value="<%=wh_cd%>"/>
	
	<!-- page_title_area(S) -->
	<div class="page_title_area clear">
		<!-- page_title(S) -->
		<!-- 타이틀 내용 동적생성 (별도 코딩 불필요) -->
		<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
		<!-- page_title(E) -->
		<!-- opus_design_btn(S) -->
		<div class="opus_design_btn TOP">
		<%-- 
			<button type="button" class="btn_accent" style="display: none;" btnAuth="<%= roleBtnVO.getAttr1() %>" name="btn_Retrieve" id="btn_Retrieve" btnType="BTN_SEARCH"><bean:message key="Search"/></button> 
			<button type="button" class="btn_normal" name="btn_New" id="btn_New" btnType="BTN_NEW"><bean:message key="New"/></button>
			<button type="button" class="btn_normal" style="display: none;" btnAuth="<%= roleBtnVO.getAttr3() %>" name="btn_Save" id="btn_Save" btnType="BTN_SAVE"><bean:message key="Save"/></button>
			 --%>
		</div>
		<!-- opus_design_btn(E) -->
		<!-- page_location(S) -->
		<div class="location">
			  <span><%=LEV1_NM%></span> &gt;
			 	<span><%=LEV2_NM%></span> &gt;
			  	<span><%=LEV3_NM%></span>
		   		<a href="" class="ir">URL Copy</a>
		</div>
	</div>
	
<div class="over_wrap" height="100%">
	<div class= "wrap_search_tab" id="wrap_search">
		<div class="opus_design_inquiry wFit">
		<table>
			<colgroup>
				<col width="50">
				<col width="*">
			</colgroup>
			<tbody>
	        <tr>
				<th><bean:message key="Code"/></th>
	           	<td>
	           		<input type="text" name=TxtCode id="TxtCode" value="" style="width:200px;text-transform:uppercase;" class="search" maxlength = "10" onchange="validCode(this)" onKeyPress="ComKeyOnlyAlphabet('uppernum')">
	 			</td>
	   		</tr>
	        </tbody>
	    </table>
		</div>
	</div>
	
	<div class="wrap_result_tab">
	    <ul id="ulTab" class="opus_design_tab">
	        <li class="nowTab"><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('01');"><span><bean:message key="Basic_Information"/></span></a></li>
	        <li><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('02');"><span><bean:message key="Location"/></span></a></li>
	    </ul>
	    <div  id="tabLayer" name="tabLayer" style="display:inline">
		   
				<div class="opus_design_inquiry">
					<table style="width:500px;">
						<colgroup>
							<col width="50px">
							<col width="150px">
							<col width="50px">
							<col width="150px">
							<col width="50px">
							<col width="50px">
						</colgroup>
						<tbody>
							<tr>
					        	<th><bean:message key="Code"/></th>
					           	<td>
					           		<input type="text" name="TxtCreCode" id="TxtCreCode" value="" style="width:200px;text-transform:uppercase;" class="search" required maxlength = "10" onchange="validCode(this)" onKeyPress="ComKeyOnlyAlphabet('uppernum')" onblur="checkDupInsertWhCode()">
					 			</td>
				 			</tr>
					        <tr>
								<th><bean:message key = "Name" /></th>
					           	<td colspan="3" >
					           		<input type="text" name="TxtName" id="TxtName" value="" style="width:100%;text-transform:uppercase;" onBlur="strToUpper(this);" class="search_form" maxlength="50" required>
					 			</td>
					 			<th><bean:message key = "Use" /></th>
					 			 <td >
                                     <select name="cbxUse" id="cbxUse" class="search_form" style="width:50px;">
                                         <option value="Y">Y</option>
                                         <option value="N">N</option>
                                     </select>
	                             </td>
					 		</tr>
					 		<tr>
					 			<th><bean:message key = "Alias" /></th>
					           	<td colspan="3">
					           		<input type="text" name=TxtAlias id="TxtAlias" value=""  style="width:100%;text-transform:uppercase;" onBlur="strToUpper(this);" maxlength="50" class="search_form" required>
					 			</td>
					 			<td></td>
					 			<td></td>
					 		</tr>
					 		<tr>
					 			<th valign = "top"><bean:message key = "Address" /></th>
					           	<td colspan="3">
					           		<textarea id="TxtAddress" name="TxtAddress" rows="5" maxlength="400" cols="100" wrap="off" style="width:100%;" onblur="onBlurTextCounter(this, 400);strToUpper(this);"></textarea>
					 			</td>
					 			<td></td>
					 			<td></td>
					 		</tr>
					 		<tr>
					 			<th><bean:message key = "City" /></th>
					           	<td colspan="3">
					           		<input type="text" name=TxtCity id="TxtCity" value="" maxlength="50" style="width:100%;text-transform:uppercase;" onBlur="strToUpper(this);" class="search_form">
					 			</td>
					 			<td></td>
					 			<td></td>
					   		</tr>
					   		<tr>
					 			<th><bean:message key = "State" /></th>
					           	<td>
					           		<input type="text" name=TxtState id="TxtState" value="" style="width:100px;" class="search_form" maxlength=2 disabled onKeyPress="ComKeyOnlyAlphabet()"><!--
					           		  --><button type="button" name="btn_PopState" id="btn_PopState" class="input_seach_btn" ></button>
					 			</td>
					 			<th><bean:message key = "ZIP" /></th>
					 			<td align = "right"><input type="text" name=TxtZip id="TxtZip" value=""  dataformat="excepthan" maxlength="10" style="width:100%;text-transform:uppercase;" onBlur="strToUpper(this);" align="right"  class="search_form"></td>
					 			<td></td>
					   		</tr>
					   		<tr>
					 			<th><bean:message key = "Phone" /></th>
					           	<td>
					           		<input type="text" name=TxtPhone id="TxtPhone" value="" dataformat="excepthan" maxlength="12"  style="width:130px;text-transform:uppercase;" onBlur="strToUpper(this);" class="search_form">
					 			</td>
					 			<th><bean:message key = "Fax" /></th>
					 			<td><input type="text" name=TxtFax id="TxtFax" value="" dataformat="excepthan" maxlength="12" style="width:100%;text-transform:uppercase;" onBlur="strToUpper(this);" align="right"  class="search_form"></td>
					 			<td></td>
					   		</tr>
					   		<tr>
					 			<th valign = "top"><bean:message key = "Remark" /></th>
					           	<td colspan="3">
					           		<textarea id="TxtRemark" name="TxtRemark" rows="5" cols="100" wrap="off" maxlength="400" style="width:100%;" onblur="onBlurTextCounter(this, 400);strToUpper(this);"></textarea>
					 			</td>
					 			<td></td>
					 			<td></td>
					 		</tr>
				        </tbody>
		    		</table>
		    	</div>
		    	<!-- opus_design_grid(S) -->
				<div class="opus_design_grid" >
					<h3 class="title_design"><bean:message key = "Contact_Person_Information" /></h3>
	
					<!-- opus_design_btn(S) -->
					<div class="opus_design_btn">
						<button type="button" class="btn_normal" name="btn_sheet1Add" id="btn_sheet1Add" btnType="BTN_ADD"><bean:message key = "Add" /></button><!--					
					 --></div>
					<!-- opus_design_btn(E) -->
					<script type="text/javascript">comSheetObject('sheet1');</script>
				</div>
				<!-- opus_design_grid(E) -->
		</div>
		
		<div id="tabLayer" name="tabLayer" style="display:none">
			  <!-- opus_design_grid(S) -->
				<div class="opus_design_grid" >
					<!-- <h3 class="title_design">Contact person information</h3> -->
	
					<!-- opus_design_btn(S) -->
					<div class="opus_design_btn">
						<button type="button" class="btn_normal" name="btn_sheet2Add" id="btn_sheet2Add" btnType="BTN_ADD"><bean:message key = "Add" /></button><!--
					 --></div>
					<!-- opus_design_btn(E) -->
					<script type="text/javascript">comSheetObject('sheet2');</script>
				</div>
				<!-- opus_design_grid(E) -->
		</div>
	</div>   
</div>
</form>

<script>
function setupPage(){
	loadPage();
}
doBtnAuthority(attr_extension);
</script>
<!-- </body> -->
