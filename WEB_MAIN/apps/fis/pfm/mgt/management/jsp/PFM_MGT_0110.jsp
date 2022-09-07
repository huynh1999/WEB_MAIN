<%--
=========================================================
*@FileName   : PFM_MGT_0110.jsp
*@FileTitle  : Customized Report
*@Description: Customized Report
*@author     : PJK - Cyberlogitec
*@version    : 1.0 - 03/30/2012
*@since      : 03/30/2012

*@Change history:
*@author     : Tuan.Chau
*@version    : 2.0 - 2014/07/10
*@since      : 2014/07/10
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	<!-- 일자 및 달력팝업 호출 -->
	<script language="javascript" src="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/PFM_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/pfm/mgt/management/script/PFM_MGT_0110.js?ver=<%=CLT_JS_VER%>"></script>
<script type="text/javascript">
<!--
function setupPage() {
	loadPage();
}
//-->

    /* User Role  */
    /* #2364 */
    var user_role_cd = '<%=userInfo.getRole_cd()%>';

    
</script>
<form name="frm1" method="POST" action="./">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd"/> 
	<input type="hidden" name="f_CurPage"/>
	
	<input name="f_rpt_seq" type="hidden">
   <!-- Button -->
	<div class="page_title_area clear">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn TOP">
	   <%-- 
	   		<button type="button" btnAuth="<%= roleBtnVO.getAttr2() %>" class="btn_accent" onclick="doWork('NEW')" style="display:none;"><bean:message key="New"/></button>
	  	 	<button id="btnModify" type="button" btnAuth="<%= roleBtnVO.getAttr3() %>" 	class="btn_normal" onclick="doWork('MODIFY')" style="display:none;"><bean:message key="Save"/></button>
	   		<button type="button" btnAuth="RUN_QUERY" 	class="btn_normal" onclick="doWork('RUN_QUERY')" style="display:none;"><bean:message key="Run_Query"/></button>
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
	<div class="wrap_result">
	<!-- layout_wrap (S) -->
	<div class="layout_wrap">
	    <div class="layout_vertical_2 pad_rgt_8">
	        <h3 class="title_design"><bean:message key="Report_List"/></h3>
	        <div class="opus_design_grid">
	            <script language="javascript">comSheetObject('sheet1');</script>
	        </div>
            <table>
				<tr>
					<td id="pagingTb" style='font-family: "Tahoma", "Arial", "Verdana";font-size: 11px;'></td>
				</tr>
			</table>
	    </div>
	    
	    <div class="layout_vertical_2">
					<div class="opus_design_inquiry" style="width: 100%">
		        	<h3 class="title_design"><bean:message key="Basic_Information"/></h3>
		        	<table>
		        		<colgroup>
		        			<col width="60"></col>
		        			<col width="60"></col>
		        			<col width="100"></col>
		        			<col width="50"></col>
		        			<col width="50"></col>
		        			<col width="*"></col>
		        		</colgroup>
		        		<tbody>
		        			<tr>
		        				<th><bean:message key="Title"/></th>
								<td colspan="6"><input name="f_rpt_title" maxlength="100" type="text" required onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:544px;"></td>
							</tr>
							<tr>
								<th><bean:message key="Header"/></th>
								<td colspan="6"><input name="f_hdr_txt" type="text"  onblur="strToUpper(this);" style="ime-mode:disabled; text-transform:uppercase;width:544px;"></td>
							</tr>
							<tr>
								<th><bean:message key="RMK"/></th>
								<td colspan="6"><textarea name="f_rmk" type="text"  onblur="strToUpper(this);" style="ime-mode:disabled; text-transform:uppercase;width:545px;height:50px"></textarea></td>
							</tr>							
							<tr>
								<td></td>
								<th style="text-align: center;"><bean:message key="Description"/></th>
								<th style="text-align: center;"><bean:message key="Type"/></th>
								<td></td>
								<th style="text-align: center;"><bean:message key="Description"/></th>
								<th style="padding-left: 20px;text-align: left;"><bean:message key="Type"/></th>
							</tr>
							<tr>
								<th><#1></th>
								<td><input name="f_desc_1" type="text"  onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:150px;"></td>
								<td><!--
								--><select name="f_tp_1" style="width:80px;"><!--
								--><option value=""></option><!--
								--><option value="D"><bean:message key="Date"/></option><!--
								--><option value="N">NUMBER</option><!--
								--><option value="S">STRING</option><!--
								--></select></td>
								<th><#6></th>
								<td><input name="f_desc_6" type="text"  onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:150px;"></td>
								<td><!--
								--><select name="f_tp_6"  style="width:80px;"><!--
								--><option value=""></option><!--
								--><option value="D"><bean:message key="Date"/></option><!--
								--><option value="N">NUMBER</option><!--
								--><option value="S">STRING</option><!--
								--></select></td>
							</tr>
							
							<tr>
								<th><#2></th>
								<td><input name="f_desc_2" type="text"  onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:150px;"></td>
								<td><!--
								--><select name="f_tp_2" style="width:80px;"><!--
								--><option value=""></option><!--
								--><option value="D"><bean:message key="Date"/></option><!--
								--><option value="N">NUMBER</option><!--
								--><option value="S">STRING</option><!--
								--></select></td>
								<th><#7></th>
								<td><input name="f_desc_7" type="text"  onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:150px;"></td>
								<td><!--
								--><select name="f_tp_7" style="width:80px;"><!--
								--><option value=""></option><!--
								--><option value="D"><bean:message key="Date"/></option><!--
								--><option value="N">NUMBER</option><!--
								--><option value="S">STRING</option><!--
								--></select></td>
							</tr>
							
							<tr>
								<th><#3></th>
								<td><input name="f_desc_3" type="text"  onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:150px;"></td>
								<td><!--
								--><select name="f_tp_3" style="width:80px;"><!--
								--><option value=""></option><!--
								--><option value="D"><bean:message key="Date"/></option><!--
								--><option value="N">NUMBER</option><!--
								--><option value="S">STRING</option><!--
								--></select></td>
								<th><#8></th>
								<td><input name="f_desc_8" type="text"  onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:150px;"></td>
								<td><!--
								--><select name="f_tp_8" style="width:80px;"><!--
								--><option value=""></option><!--
								--><option value="D"><bean:message key="Date"/></option><!--
								--><option value="N">NUMBER</option><!--
								--><option value="S">STRING</option><!--
								--></select></td>
							</tr>
							
							<tr>
								<th><#4></th>
								<td><input name="f_desc_4" type="text"  onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:150px;"></td>
								<td><!--
								--><select name="f_tp_4" style="width:80px;"><!--
								--><option value=""></option><!--
								--><option value="D"><bean:message key="Date"/></option><!--
								--><option value="N">NUMBER</option><!--
								--><option value="S">STRING</option><!--
								--></select></td>
								<th><#9></th>
								<td><input name="f_desc_9" type="text"  onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:150px;"></td>
								<td><!--
								--><select name="f_tp_9" style="width:80px;"><!--
								--><option value=""></option><!--
								--><option value="D"><bean:message key="Date"/></option><!--
								--><option value="N">NUMBER</option><!--
								--><option value="S">STRING</option><!--
								--></select></td>
							</tr>	
							
							<tr>
								<th><#5></th>
								<td><input name="f_desc_5" type="text"  onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:150px;"></td>
								<td><!--
								--><select name="f_tp_5" style="width:80px;"><!--
								--><option value=""></option><!--
								--><option value="D"><bean:message key="Date"/></option><!--
								--><option value="N">NUMBER</option><!--
								--><option value="S">STRING</option><!--
								--></select></td>
								<th><#10></th>
								<td><input name="f_desc_10" type="text"  onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:150px;"></td>
								<td><!--
								--><select name="f_tp_10" style="width:80px;"><!--
								--><option value=""></option><!--
								--><option value="D"><bean:message key="Date"/></option><!--
								--><option value="N">NUMBER</option><!--
								--><option value="S">STRING</option><!--
								--></select></td>
							</tr>													
							
							<tr>
								<th><bean:message key="Query"/></th>
								<td colspan="6"></td>
							</tr>
							<tr>
								<td></td>
								<td colspan="5"><textarea name="f_qry_txt"  id="f_qry_txt"onblur="strToUpper(this);" style="width:545px;height:330px;display: none"></textarea></td>
							</tr>
		        		</tbody>
		            </table>
					</div>
					<div class="opus_design_grid" style="display: none;">
						<script language="javascript">comSheetObject('sheet2');</script>
					</div>
	    </div>
	</div>
	</div>
</form>
		
<script type="text/javascript">
doBtnAuthority("<%= roleBtnVO.getAttr_extension() %>");
</script>	
			
</body>
</html>