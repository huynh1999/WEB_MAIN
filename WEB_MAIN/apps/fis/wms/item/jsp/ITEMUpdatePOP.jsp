<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>

<!-- 공통 Header -->
<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
<base target="_self"/>

<!-- 해당 Action별 js -->
<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>

<script type="text/javascript" src="./js/common/message/<%=CLT_MSG_PATH%>/WMS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript" src="./apps/fis/wms/item/script/ITEMUpdatePOP.js?ver=<%=CLT_JS_VER%>"></script>

<!--ajax 사용시 -->
<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>

<%
	String in_ctrt_no 	  = "";
	String in_ctrt_nm 	  = "";
	String in_item_cd 	  = "";
	String in_item_nm 	  = "";
	String in_item_sys_no = "";
	 
	try {
		in_ctrt_no = request.getParameter("in_ctrt_no")== null?"":request.getParameter("in_ctrt_no");
		in_ctrt_nm = request.getParameter("in_ctrt_nm")== null?"":request.getParameter("in_ctrt_nm");
		in_item_cd = request.getParameter("in_item_cd")== null?"":request.getParameter("in_item_cd");
		in_item_nm = request.getParameter("in_item_nm")== null?"":request.getParameter("in_item_nm");
		in_item_sys_no = request.getParameter("in_item_sys_no")== null?"":request.getParameter("in_item_sys_no");
	}catch(Exception e) {
		out.println(e.toString());
	}
%>

<script type="text/javascript">
	function setupPage(){
		var errMessage = "";
		if (errMessage.length >= 1) {
			ComShowMessage(errMessage);
		}
		loadPage(true);
	}
</script>

<form name="form">

	<input type="hidden" id="f_cmd" id="f_cmd" /> 
	<input type="hidden" name="user_id" value="<%=userInfo.getUsrid()%>" />
	<input type="hidden" name="f_item_sys_no" id="f_item_sys_no" value="<%=in_item_sys_no %>" />
	
	<div class="layer_popup_title">
	    <div class="page_title_area clear">
	        <h2 class="page_title">
	            <span><bean:message key="Item_Attr_Cng"/></span>
	        </h2>
	        <!-- btn_div -->
	        <div class="opus_design_btn">
	        	<button type="button" class="btn_accent" onclick="doWork('SAVE')"><bean:message key="Save"/></button>
				<button type="button" class="btn_normal" onclick="doWork('CLOSE')"><bean:message key="Close"/></button>
	        </div>
	    </div>
	</div>
	
	<div class="layer_popup_contents">
		<!-- Search option -->
	    <div class="wrap_search">	
		    <div class="opus_design_inquiry entry_pannel">
		        <table>
		        	<colgroup>
		        		<col width="100">
		        		<col width="125">
		        		<col width="125">
		        		<col width="100">
		        		<col width="100">
		        		<col width="100">
		        	</colgroup>
		            <tbody>
		                <tr>
		                    <th><bean:message key="Contract_No"/></th>
		                    <td colspan="2">
			                    <input readonly id="f_ctrt_no" name="f_ctrt_no" value="<%=in_ctrt_no%>" type="text" class="L_input" style="width:80px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" otherchar="-_" onBlur="strToUpper(this);searchTlCtrtInfo();" maxlength="10"/>
			                    <!-- <button type="button" name="btn_ctrt_no" id="btn_ctrt_no"class="input_seach_btn" tabindex="-1" onclick="btn_ctrt()"></button> -->
			                    <input readonly id="f_ctrt_nm" name="f_ctrt_nm" value="<%=in_ctrt_nm%>" type="text" class="L_input" style="width:112px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" otherchar = " ()-_" onBlur="strToUpper(this);" OnKeyDown="if(event.keyCode==13){searchCtrtPop(this);}" maxlength="100"/>
		                    </td>
		                    
		                    <th><bean:message key="Type"/></th>
							<td colspan="2">
								<select name="f_item_cng_flg" id="f_item_cng_flg" style="width:200px" onchange="changeItemCngFlg()" required>
									<option value="CN">Item Code & Name Change</option>
									<option value="IC">Item Code Change</option>
									<option value="IN">Item Name Change</option>
								</select>
							</td>
		                </tr>
		                               
		                <tr>
			                <th><bean:message key="Item_Code"/></th>
							<td colspan="2"><input readonly id="f_item_cd_asis" name="f_item_cd_asis" value="<%=in_item_cd%>" otherchar = "<%=WMS_OTHER_CHAR%>" type="text" dataformat= "engup" class="L_input" style="width:200px;ime-mode:disabled;text-transform:uppercase;" maxlength="20"/></td>
							<th><bean:message key="Item_Name"/></th>
							<td colspan="2"><input readonly id="f_item_nm_asis" name="f_item_nm_asis" value="<%=in_item_nm%>" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" type="text" class="L_input" style="width:200px;ime-mode:disabled;text-transform:uppercase;" maxlength="100"/></td>                
		                </tr>
		                
		                <tr>
			                <th><bean:message key="New_Item_Code"/></th>
							<td colspan="2"><input id="f_item_cd_tobe" name="f_item_cd_tobe" otherchar = "<%=WMS_OTHER_CHAR%>" type="text" dataformat= "engup" class="L_input" style="width:200px;ime-mode:disabled;text-transform:uppercase;" maxlength="20" required/></td>
							<th><bean:message key="New_Item_Name"/></th>
							<td colspan="2"><input id="f_item_nm_tobe" name="f_item_nm_tobe" otherchar = "<%=WMS_OTHER_CHAR%>" dataformat= "engup" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" type="text" required class="L_input" style="width:200px;ime-mode:disabled;text-transform:uppercase;" maxlength="100"/></td>                
		                </tr>
		            </tbody>
		        </table>
		    </div>
		</div>    
		
	    <div class="wrap_result">
	       	<div class="opus_design_grid">
	       		<h3 class="title_design" style="margin-bottom: 10px;" ><bean:message key="Change_History"/></h3>
				<script type="text/javascript">comSheetObject('sheet1');</script>
			</div>
		</div>
	    
	</div>
</form>