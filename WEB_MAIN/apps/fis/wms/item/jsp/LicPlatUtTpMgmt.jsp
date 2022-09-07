<%--=========================================================
*@FileName   : LicPlatUtTpMgmt.jsp
*@FileTitle  : License Plate Unit Type
*@Description: 
*@author     : LSY
*@version    : 1.0
*@since      : 10/17/2016

*@Change history:
=========================================================--%>

<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
    
	<script type="text/javascript" src="./js/common/message/<%=CLT_MSG_PATH%>/WMS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script> 
    <script type="text/javascript" src="./apps/fis/wms/item/script/LicPlatUtTpMgmt.js?ver=<%=CLT_JS_VER%>"></script>  
    <bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
    <bean:define id="officeInfo" name="cdMap" property="officeInfo"/>
	<bean:define id="ofcVO" name="officeInfo"/>  
	
    <script type="text/javascript">
		var pDoc = parent.parent.parent.document;
		hideProcess('WORKING', pDoc);
		var PARAM1_1 = '';
		var PARAM1_2 = '';
		<bean:define id="rtnMap" name="EventResponse" property="mapVal"/>
		<% boolean isBegin = false; %>
		<!--Bound Class Code 코드조회-->
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
		
		function setupPage(){
			var errMessage = "";
			if (errMessage.length >= 1) {
				ComShowMessage(errMessage);
			} // end if
			loadPage(true);
		}
		
		var l_ofc_size_ut_cd = "<bean:write name="ofcVO" property="oth_size_ut_cd"/>";
		var l_ofc_meas_ut_cd = "<bean:write name="ofcVO" property="oth_meas_ut_cd"/>";
		var l_ofc_wgt_ut_cd = "<bean:write name="ofcVO" property="oth_wgt_ut_cd"/>";
	</script>
	
	<form name="frm1" method="POST" action="./LicPlatUtTpMgmt.clt">
	<!--Command를 담는 공통 --><!-- 
	 --><input id="f_cmd" name="f_cmd" type="hidden" /><!--
	 --><input id="f_CurPage" name="f_CurPage" type="hidden" /><!--
	 --><input id="f_loc_tp_cd" name="f_loc_tp_cd" type="hidden" /><!--
	 --><input id="save_flg" name="save_flg" value="" type="hidden" /><!--
	 --><input id="h_use_flg" name="h_use_flg" value="" type="hidden" />
        <!-- 타이틀, 네비게이션 -->
        
     <div class="page_title_area clear">
			<!-- page_title(S) -->
			<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
			<!-- page_title(E) -->
			
			<!-- opus_design_btn(S) -->
			<div class="opus_design_btn TOP">
<%-- 				
				<button type="button" class="btn_accent" <%= null != roleBtnVO? "style='display:none;' btnAuth='" + roleBtnVO.getAttr1() + "'"  : "" %> onclick="doWork('SEARCHLIST')" id="btnSearch" name="btnSearch"><bean:message key="Search"/></button>
				<button type="button" class="btn_normal" <%= null != roleBtnVO? "style='display:none;' btnAuth='" + roleBtnVO.getAttr2() + "'"  : "" %> onclick="doWork('NEW')" id="btnNew" name="btnNew"><bean:message key="New"/></button>
				<button type="button" class="btn_normal" <%= null != roleBtnVO? "style='display:none;' btnAuth='" + roleBtnVO.getAttr3() + "'"  : "" %> onclick="doWork('SAVE')" id="btnSave" name="btnSave"><bean:message key="Save"/></button>
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
			<!-- page_location(E) -->
	</div>
    <!-- page_title_area(E) -->
<div class= "over_wrap">	                                                                                                                                      
 	<div class="wrap_search">
	    <!-- inquiry_area(S) -->	
		<div class="opus_design_inquiry entry_pannel">
			<!-- h3 class="title_design"><bean:message key="Search_Condition"/></h3 -->
		    <table>
		        <colgroup>
		        	<col width="40">
		        	<col width="150">
		        	<col width="90">
		        	<col width="150">
		        	<col width="50">
		        	<col width="150">
		        	<col width="20">
		        	<col width="*">
		        </colgroup>
		        <tbody>
		        	<tr>
		        		<th><bean:message key="Code"/></th>
						<td>
							<input name="s_lic_plat_ut_cd" type="text" maxlength="20" value='' class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:150px;" onKeyPress="fncSearch()">
						</td>
				        
						<th><bean:message key="Description"/></th>
						<td>
							<input name="s_lic_plat_desc" type="text" maxlength="100" value='' class="search_form" dataformat="" style="ime-mode:disabled; text-transform:uppercase;width:150px;" onKeyPress="fncSearch()">
						</td>

						<th><bean:message key="Type"/></th>
						<td>
							<logic:notEmpty name="EventResponse">
							<select name="s_lic_plat_ut_tp_cd" class="search_form" style="width: 120px">
			             			<option value=''>ALL</option>
	             					<logic:iterate id="codeVO" name="param1List">
		             					<option value='<bean:write name="codeVO" property="cd_val"/>'><bean:write name="codeVO" property="cd_nm"/></option>
	             					</logic:iterate>
	             				</select>
		             		</logic:notEmpty>
                         </td>
                        <th><bean:message key="Use_YN"/></th>
			            <td><!-- 
                           	 --><input name="s_use_flg" id="s_use_flg1" type="radio" value="Y" checked><label for="s_use_flg1">Yes</label>&nbsp;&nbsp;<!-- 
                           	 --><input name="s_use_flg" id="s_use_flg2" type="radio" value="N"><label for="s_use_flg2">No</label>&nbsp;&nbsp;<!-- 
                           	 --><input name="s_use_flg" id="s_use_flg3" type="radio" value="All"><label for="s_use_flg3">All</label>&nbsp;&nbsp;
                        </td>
		        	</tr>
		        </tbody>
	        </table>
		</div>
	     <!-- inquiry_area(S) -->
	</div>
	<!-- wrap search (E) -->   
	
	<div class="wrap_result">     
	<!-- layout_wrap(S) -->
	<div class="layout_wrap">
	    <div class="layout_vertical_2" >
	    	<h3 class="title_design"><bean:message key="License_Plate_Unit_Code"/> <bean:message key="List"/></h3>
	        <!-- opus_design_grid(S) -->
	        <div class="opus_design_inquiry">
	            <script type="text/javascript">comSheetObject('sheet1');</script>
	        </div>
	        <!-- opus_design_grid(E) -->
	    </div>
	
	    <div class="layout_vertical_2 pad_left_8">
		<!-- inquiry_area(S) -->	
		<div class="opus_design_inquiry sm" style="height: 375px">
		<h3 class="title_design"><bean:message key="Basic_Information"/></h3>
			<table>
				<colgroup>
					<col width="140">
					<col width="250">
					<col width="50">
					<col width="*">
				</colgroup>
				<tbody>
		            <tr>
						<th><bean:message key="Code"/></th>
						<td><!-- 
						--><input Required name="i_lic_plat_ut_cd" type="text" maxlength="20" class="search_form" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:150px;" onBlur="javascript:this.value=this.value.toUpperCase();" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);checkSpecialCharacter(this);">
						</td>
						<th><label for="i_use_flg"><bean:message key="Use_YN"/></label></th>
						<td><!-- 
						--><input name="i_use_flg" id="i_use_flg" type="checkbox" value="" onClick="">
						</td>
					</tr>
		            <tr>
						<th><bean:message key="Description"/></th>
						<td colspan="3"><!-- 
						--><input Required name="i_lic_plat_desc" type="text" maxlength="100" class="search_form" dataformat="excepthan" style="ime-mode:disabled; width:335px;" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);">
						</td>
					</tr>
					<tr>
						<th><bean:message key="Type"/></th>
						<td>
		             		<select Required name="i_lic_plat_ut_tp_cd" class="search_form" style="width: 150px">
             					<logic:iterate id="codeVO" name="param1List">
	             					<option value='<bean:write name="codeVO" property="cd_val"/>'><bean:write name="codeVO" property="cd_nm"/></option>
             					</logic:iterate>
             				</select>
		             	</td>
					</tr>
					<tr>
						<th><bean:message key="Length"/></th>
						<td colspan="3">
							<input type="text" name="i_bss_len" value="" onKeyPress="onlyNumberCheck('.')"  onchange="numberCommaLen(this,3,2);chkComma(this,3,2);fn_sizeChange(this);" maxlength="6" class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:80px;text-align:right;"><!-- 
							--><input type="hidden" name="h_bss_size_ut_cd_1" value="" style="width:60px;border:0;background-color:transparent;" readOnly tabindex="1"><!-- 
							--><input type="text" name="i_bss_size_ut_nm_1" value="" style="width:60px;border:0;background-color:transparent;" readOnly tabindex="1"><!-- 
							--><input type="text" name="i_cnvt_len" value="" onKeyPress="onlyNumberCheck('.')"  onchange="numberCommaLen(this,3,2);chkComma(this,3,2);fn_sizeChange(this);" maxlength="6" class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:80px;text-align:right;" readonly="readonly"><!-- 
							--><input type="hidden" name="h_cnvt_size_ut_cd_1" value="" style="width:60px;border:0;background-color:transparent;" readOnly tabindex="2"><!-- 
							--><input type="text" name="i_cnvt_size_ut_nm_1" value="" style="width:60px;border:0;background-color:transparent;" readOnly tabindex="2">
						</td>
					</tr>
					<tr>
						<th><bean:message key="Width"/></th>
						<td colspan="3">
							<input type="text" name="i_bss_wdt" value="" onKeyPress="onlyNumberCheck('.')"  onchange="numberCommaLen(this,3,2);chkComma(this,3,2);fn_sizeChange(this);" maxlength="6" class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:80px;text-align:right;"><!-- 
							--><input type="hidden" name="h_bss_size_ut_cd_2" value="" style="width:60px;border:0;background-color:transparent;" readOnly tabindex="1"><!-- 
							--><input type="text" name="i_bss_size_ut_nm_2" value="" style="width:60px;border:0;background-color:transparent;" readOnly tabindex="1"><!-- 
							--><input type="text" name="i_cnvt_wdt" value="" onKeyPress="onlyNumberCheck('.')"  onchange="numberCommaLen(this,3,2);chkComma(this,3,2);fn_sizeChange(this);" maxlength="6" class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:80px;text-align:right;" readonly="readonly"><!-- 
							--><input type="hidden" name="h_cnvt_size_ut_cd_2" value="" style="width:60px;border:0;background-color:transparent;" readOnly tabindex="2"><!-- 
							--><input type="text" name="i_cnvt_size_ut_nm_2" value="" style="width:60px;border:0;background-color:transparent;" readOnly tabindex="2">
						</td>
					</tr>
					<tr>
						<th><bean:message key="Height"/></th>
						<td colspan="3">
							<input type="text" name="i_bss_hgt" value="" onKeyPress="onlyNumberCheck('.')"  onchange="numberCommaLen(this,3,2);chkComma(this,3,2);fn_sizeChange(this);" maxlength="6" class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:80px;text-align:right;"><!-- 
							--><input type="hidden" name="h_bss_size_ut_cd_3" value="" style="width:60px;border:0;background-color:transparent;" readOnly tabindex="1"><!-- 
							--><input type="text" name="i_bss_size_ut_nm_3" value="" style="width:60px;border:0;background-color:transparent;" readOnly tabindex="1"><!-- 
							--><input type="text" name="i_cnvt_hgt" value="" onKeyPress="onlyNumberCheck('.')"  onchange="numberCommaLen(this,3,2);chkComma(this,3,2);fn_sizeChange(this);" maxlength="6" class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:80px;text-align:right;" readonly="readonly"><!-- 
							--><input type="hidden" name="h_cnvt_size_ut_cd_3" value="" style="width:60px;border:0;background-color:transparent;" readOnly tabindex="2"><!-- 
							--><input type="text" name="i_cnvt_size_ut_nm_3" value="" style="width:60px;border:0;background-color:transparent;" readOnly tabindex="2">
						</td>
					</tr>
					<tr>
						<th><bean:message key="Measurement"/></th>
						<td colspan="3">
							<input type="text" name="i_bss_meas" value="" onKeyPress="onlyNumberCheck('.')"  onchange="numberCommaLen(this,8,5);chkComma(this,8,5);fn_measureChange(this);" maxlength="14" class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:80px;text-align:right;"><!-- 
							--><input type="hidden" name="h_bss_meas_ut_cd" value="" style="width:60px;border:0;background-color:transparent;" readOnly tabindex="1"><!-- 
							--><input type="text" name="i_bss_meas_ut_nm" value="" style="width:60px;border:0;background-color:transparent;" readOnly tabindex="1"><!-- 
							--><input type="text" name="i_cnvt_meas" value="" onKeyPress="onlyNumberCheck('.')"  onchange="numberCommaLen(this,10,5);chkComma(this,10,5);fn_measureChange(this);" maxlength="16" class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:80px;text-align:right;" readonly="readonly"><!-- 
							--><input type="hidden" name="h_cnvt_meas_ut_cd" value="" style="width:60px;border:0;background-color:transparent;" readOnly tabindex="2"><!-- 
							--><input type="text" name="i_cnvt_meas_ut_nm" value="" style="width:60px;border:0;background-color:transparent;" readOnly tabindex="2">
						</td>
					</tr>
					<tr>
						<th><bean:message key="Weight"/></th>
						<td colspan="3">
							<input type="text" name="i_bss_wgt" value="" onKeyPress="onlyNumberCheck('.')"  onchange="numberCommaLen(this,8,5);chkComma(this,8,5);fn_weightChange(this);" maxlength="14" class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:80px;text-align:right;"><!-- 
							--><input type="hidden" name="h_bss_wgt_ut_cd" value="" style="width:60px;border:0;background-color:transparent;" readOnly tabindex="1"><!-- 
							--><input type="text" name="i_bss_wgt_ut_nm" value="" style="width:60px;border:0;background-color:transparent;" readOnly tabindex="1"><!-- 
							--><input type="text" name="i_cnvt_wgt" value="" onKeyPress="onlyNumberCheck('.')"  onchange="numberCommaLen(this,10,5);chkComma(this,10,5);fn_weightChange(this);" maxlength="16" class="search_form zero_remove" dataformat="excepthan" style="ime-mode:disabled;width:80px;text-align:right;" readonly="readonly"><!-- 
							--><input type="hidden" name="h_cnvt_wgt_ut_cd" value="" style="width:60px;border:0;background-color:transparent;" readOnly tabindex="2"><!-- 
							--><input type="text" name="i_cnvt_wgt_ut_nm" value="" style="width:60px;border:0;background-color:transparent;" readOnly tabindex="2">
						</td>
					</tr>
					<tr>
						<th><bean:message key="Created"/> <bean:message key="By"/></th>
						<td colspan="3">
							<input name="i_rgst_usrid" type="text" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;width:100px;text-align:left" readOnly><bean:message key="at"/><!-- 
							-->&nbsp;<input name="i_rgst_tms" type="text" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;width:150px;text-align:left" readOnly>
						</td>
					</tr>
					<tr>
						<th><bean:message key="Modified"/> <bean:message key="By"/></th>
						<td colspan="3">
							<input name="i_modi_usrid" type="text" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;width:100px;text-align:left" readOnly><bean:message key="at"/><!-- 
							-->&nbsp;<input name="i_modi_tms" type="text" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled;width:150px;text-align:left" readOnly>
					</tr>
				</tbody>
			</table>
		</div>
		<!-- inquiry_area(E) -->	
	    </div>
    </div>
    <!-- layout_wrap(E) -->
    </div>
</div>    
</form>
	                                                                                                                                      
<script type="text/javascript">
	var attr_extension = "<%= null!=roleBtnVO ?roleBtnVO.getAttr_extension():"" %>";
	doBtnAuthority(attr_extension);
</script>	