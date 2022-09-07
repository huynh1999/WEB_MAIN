<%--=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : CommodityPopup.jsp
*@FileTitle  : HTS Code(Item/Commodity) Info Popup
*@author     : Nam.Tran - DOU Network
*@version    : 1.0
*@since      : 2015/06/10
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
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/ModalCalendar.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="./apps/fis/wms/common/js/CommodityPopup.js?ver=<%=CLT_JS_VER%>"></script>
    <bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
	
	<script type="text/javascript" src="./js/common/message/<%=CLT_MSG_PATH%>/WMS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
<%
	String hts_cd = "";
	String multi_yn = "";
	String cnt = "";
	String DEF_ORG_CD		= userInfo.getOfc_cd()== null?"":userInfo.getOfc_cd();
	String DEF_ORG_NM		= userInfo.getOfc_locl_nm()== null?"":userInfo.getOfc_locl_nm();
	try {
		hts_cd = request.getParameter("hts_cd");
		if(hts_cd==null){
			hts_cd = "";
		} 
		multi_yn = request.getParameter("multi_yn")== null?"":request.getParameter("multi_yn");
		cnt = request.getParameter("cnt")== null?"":request.getParameter("cnt");
	}catch(Exception e) {
		out.println(e.toString());
	}	
%>
<script type="text/javascript">
	var almightyFlag = false;
	function setupPage(){
		var errMessage = "";
		if (errMessage.length >= 1) {
			ComShowMessage(errMessage);
		} // end if
		loadPage(true);
	}
</script>
<form id="form" name="form">
<input type="hidden" name="multi_yn" 	value="<%=multi_yn%>" /> 
<input type="hidden" name="cnt" 	value="<%=cnt%>" /> 
<input type="hidden" id="f_cmd" value="0" />

<div class="page_title_area clear">
	<!-- page_title(S) -->
	<h2 class="page_title">
			<span><bean:message key="HTS_Code_Item_Commodity_Info_Popup"/></span>
		</h2>
	<!-- page_title(E) -->
	<!-- opus_design_btn(S) -->
	<div class="opus_design_btn">
		<button type="button" class="btn_accent" name="btn_Search" id="btn_Search" onClick="doWork('SEARCHLIST');"><bean:message key="Search"/></button><!-- 
		 --><button type="button" class="btn_normal" name="btn_Excel" id="btn_Excel" onClick="doWork('btn_Excel');"><bean:message key="Excel"/></button><!--  
		  --><div id="btnApplyShow" style="display:none;"><!-- 
			  --><button type="button" class="btn_normal" name="btnAdd" id="btnAdd" onClick="doWork('ADD');"><bean:message key="Add"/></button><!-- 
		 	  --><button type="button" class="btn_normal" name="btn_Replace" id="btn_Replace" onClick="doWork('btn_Replace');"><bean:message key="Replace"/></button><!-- 
			 --></div><!-- 
		 --><button type="button" class="btn_normal" name="btnClose" id="btnClose" onClick="doWork('CLOSE');"><bean:message key="Close"/></button>
	</div>
	<!-- opus_design_btn(E) -->
	<!-- page_location(S) -->
		<div class="location">
			<span></span>
		</div>
	<!-- page_location(E) -->
	</div>

<div class= "wrap_search">
	<div class="opus_design_inquiry entry_pannel ">
		<table>
			    <colgroup>
					<col width="125" />
					<col width="150" />
					<col width="210" />
                    <col width="150" />
					<col width="150" />
					<col width="*" />
				</colgroup>
				<tr>
					<th><bean:message key="Description(Eng)"/></th>
					<td><input name="hts_desc_eng" type="text" class="L_input" id="hts_desc_eng" dataformat="etc" maxlength="400" style="width: 213px;" /></td>
					<th><bean:message key="Two_digit_Group"/></th>
					<td>
					<bean:define id="MsList" name="cdMap" property="td_grp_cd"/>
						<select name="td_grp_cd" id="td_grp_cd" class="search_form" style="width: 130px;">
						<option value="ALL">ALL</option>
							<logic:iterate id="codeVO" name="MsList">
								<option value='<bean:write name="codeVO" property="code"/>'><bean:write name="codeVO" property="cd_nm"/></option>
							</logic:iterate>
						</select>
					</td>
					<th><bean:message key="Four_digit_Group"/></th>
					<td>
					<bean:define id="MsList" name="cdMap" property="fd_grp_cd"/>
						<select name="fd_grp_cd" id="fd_grp_cd" class="search_form" style="width: 130px;">
						<option value="ALL">ALL</option>
							<logic:iterate id="codeVO" name="MsList">
								<option value='<bean:write name="codeVO" property="code"/>'><bean:write name="codeVO" property="cd_nm"/></option>
							</logic:iterate>
						</select>
					</td>
				</tr>
                <tr>
					<th><bean:message key="Code"/></th>
					<td><input name="hts_cd" type="text" class="L_input" id="hts_cd" value="<%=hts_cd%>" style="width:70px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);" maxlength="10"/></td>
					<th><bean:message key="Used_YN"/></th>
					<td colspan="3">
						<select id="use_yn" name="use_yn" class="search_form">
							<option value="Y">Y</option>
						</select>
					</td>
				</tr>
			</table>
	</div>
	
	<div class="opus_design_inquiry wFit">
		<table>
			    <colgroup>
					<col width="50" />
					<col width="18" />
					<col width="150" />
                    <col width="18" />
					<col width="150" />
					<col width="*" />
				</colgroup>
				<tr>
					<th><bean:message key="Branch"/></th>
					<td colspan="5">
							<input name="ofc_cd" id="ofc_cd" type="text" value="<%= DEF_ORG_CD %>" class="L_input_R" style="width:70px;ime-mode:disabled;text-transform:uppercase;" dataformat="excepthan" onBlur="strToUpper(this);" readonly tabindex="-1" /><!-- 
							 --><button type="button" name="btn_ofc_cd" id="btn_ofc_cd" class="input_seach_btn" tabindex="-1" disabled></button><!-- 
							 --><input name="ofc_nm" id="ofc_nm" type="text" value="<%= DEF_ORG_NM %>" class="L_input_R" style="width:110px;" readonly tabindex="-1" />
					</td>
				</tr>
                <tr>
					<th><bean:message key="Description"/>(<bean:message key="Local"/>)</th>
					<td><input name="hts_desc_loc" type="text" class="L_input" id="hts_desc_loc" dataformat="etc" maxlength="400" style="width: 213px;" /></td>
					<th><bean:message key="Two_digit_Group"/>(<bean:message key="Local"/>)</th>
					<td>
					<!-- <script  type="text/javascript">ComComboObject('td_grp_cd_loc', 1, 130, 1);</script> -->
					<bean:define id="MsList" name="cdMap" property="td_grp_cd_loc"/>
						<select name="td_grp_cd_loc" id="td_grp_cd_loc" class="search_form" style="width: 130px;">
						<option value="ALL">ALL</option>
							<logic:iterate id="codeVO" name="MsList">
								<option value='<bean:write name="codeVO" property="code"/>'><bean:write name="codeVO" property="cd_nm"/></option>
							</logic:iterate>
						</select>
					</td>
					<th><bean:message key="Four_digit_Group"/>(<bean:message key="Local"/>)</th>
					<td>
					<!-- <script  type="text/javascript">ComComboObject('fd_grp_cd_loc', 1, 130, 1);</script> -->
					<bean:define id="MsList" name="cdMap" property="fd_grp_cd_loc"/>
						<select name="fd_grp_cd_loc" id="fd_grp_cd_loc" class="search_form" style="width: 130px;">
						<option value="ALL">ALL</option>
							<logic:iterate id="codeVO" name="MsList">
								<option value='<bean:write name="codeVO" property="code"/>'><bean:write name="codeVO" property="cd_nm"/></option>
							</logic:iterate>
						</select>
					</td>
				</tr>
			</table>
	</div>
</div>

<div class="wrap_result">
	<!-- opus_design_grid(S) -->
	<div class="opus_design_grid clear">
		<script type="text/javascript">comSheetObject('sheet1');</script>
	</div>
</div>

<div class= "wrap_search">
	<div class="opus_design_inquiry wFit">
		<table>
				<colgroup>
					<col width="50" />
					<col width="33" />
					<col width="200" />
					<col width="*" />
				</colgroup>
				<tr>
					<th><bean:message key="HTS_Code"/></th>
					<td>					
						<input name="dis_hts_cd" type="text" class="L_input_R" id="dis_hts_cd" readOnly tabindex="-1" style="width:70px;"/>					
					</td>
					<th><bean:message key="Two_digit_Group"/>(<bean:message key="Eng"/>)</th>
					<td><input name="dis_td_grp_desc_eng" type="text" class="L_input_R" id="dis_td_grp_desc_eng"  readOnly tabindex="-1" />
					</td>
				</tr>
				<tr>
					<th><bean:message key="HTS_Description"/>(<bean:message key="Eng"/>)</th>
					<td>					
						<input name="dis_hts_desc_eng" type="text" class="L_input_R" id="dis_hts_desc_eng" readOnly tabindex="-1" style="width: 188px;" />					
					</td>
					<th><bean:message key="Four_digit_Group"/>(<bean:message key="Eng"/>)</th>
					<td><input name="dis_fd_grp_desc_eng" type="text" class="L_input_R" id="dis_fd_grp_desc_eng"  readOnly tabindex="-1" />
					</td>
				</tr>	
				<tr>
					<th><bean:message key="Branch"/></th>
					<td>					
						<input name="dis_branch" id="dis_branch" type="text"  class="L_input_R" style="width:70px;" readonly tabindex="-1" />
						<input name="dis_branch_nm" id="dis_branch_nm" type="text"  class="L_input_R" style="width:110px;" readonly tabindex="-1" />
					</td>
					<th><bean:message key="Two_digit_Group"/>(<bean:message key="Local"/>)</th>
					<td><input name="dis_td_grp_desc_loc" type="text" class="L_input_R" id="dis_td_grp_desc_loc"  readOnly tabindex="-1" />
					</td>
				</tr>
				<tr>
					<th><bean:message key="HTS_Description"/>(<bean:message key="Local"/>)</th>
					<td>					
						<input name="dis_hts_desc_loc" type="text" class="L_input_R" id="dis_hts_desc_loc" readOnly tabindex="-1" style="width: 188px;" />					
					</td>
					<th><bean:message key="Four_digit_Group"/>(<bean:message key="Local"/>)</th>
					<td><input name="dis_fd_grp_desc_loc" type="text" class="L_input_R" id="dis_fd_grp_desc_loc"  readOnly tabindex="-1" />
					</td>
				</tr>	
				<tr>
					<th><bean:message key="Use_YN"/></th>
					<td colspan="3">					
						<input name="dis_use_yn" type="text" class="L_input_R" id="dis_use_yn" readOnly tabindex="-1" style="width:70px;"/>					
					</td>
				</tr>					
			</table>
	</div>
</div>
</form>
</body>
</html>
<%@include file="/apps/fis/wms/bizcommon/include_common.jsp"%>
