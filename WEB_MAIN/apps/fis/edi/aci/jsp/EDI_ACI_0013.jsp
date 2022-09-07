<%--
=========================================================
*@FileName   : EDI_ACI_0013.jsp
*@FileTitle  : CMM
*@Description: House Bill Close Message 캐나다 세관 
*@author     : Jigun,Oh
*@version    : 
*@since      : 

*@Change history:
=========================================================
--%>

<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<bean:define id="valMap"  name="EventResponse" property="mapVal"/>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />

	<!-- 해당 Action별 js -->
	<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/EDI_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script language="javascript" src="<%=CLT_PATH%>/apps/fis/edi/aci/script/EDI_ACI_0013.js?ver=<%=CLT_JS_VER%>"></script>
	
	<!--ajax 사용시 -->
	<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	
	<!-- 모달창에서 paging이나 submit 할 경우 꼭 추가해야함. -->
	<base target="_self"/>
	
	<script language="javascript">
		var ACT_RSN_CD = '';
	    var ACT_RSN_NM = '';
	    <% boolean isBegin = false; %>
		<logic:notEmpty name="valMap" property="actRsnList">
			<% isBegin = false; %>
			<bean:define id="actRsnList"  name="valMap" property="actRsnList"/>
			<logic:iterate id="actRsnVO" name="actRsnList">
				<% if(isBegin){ %>
					ACT_RSN_CD+= '|';
					ACT_RSN_NM+= '|';
				<% }else{
					  isBegin = true;
				   } %>
				ACT_RSN_CD+= '<bean:write name="actRsnVO" property="cd_val"/>';
				ACT_RSN_NM+= '<bean:write name="actRsnVO" property="cd_nm"/>';
			</logic:iterate>		
		</logic:notEmpty>
		
		var MSG_STS_CD = '';
        var MSG_STS_NM = '';
        <% isBegin = false; %>
		<logic:notEmpty name="valMap" property="stsList">
			<% isBegin = false; %>
			<bean:define id="msgStsLst"  name="valMap" property="stsList"/>
			<logic:iterate id="msgStsVO" name="msgStsLst">
				<% if(isBegin){ %>
					MSG_STS_CD+= '|';
					MSG_STS_NM+= '|';
				<% }else{
					  isBegin = true;
				   } %>
				MSG_STS_CD+= '<bean:write name="msgStsVO" property="cd_val"/>';
				MSG_STS_NM+= '<bean:write name="msgStsVO" property="cd_nm"/>';
			</logic:iterate>		
		</logic:notEmpty>
		
		var DSPO_CD = '';
        var DSPO_NM = '';
        <% isBegin = false; %>
		<logic:notEmpty name="valMap" property="dspoCdLst">
			<% isBegin = false; %>
			<bean:define id="dspoCdLst"  name="valMap" property="dspoCdLst"/>
			<logic:iterate id="dspoVO" name="dspoCdLst">
				<% if(isBegin){ %>
						DSPO_CD+= '|';
						DSPO_NM+= '|';
				<% }else{
					  isBegin = true;
				   } %>
				DSPO_CD+= '<bean:write name="dspoVO" property="cd_val"/>';
				DSPO_NM+= '<bean:write name="dspoVO" property="cd_nm"/>';
			</logic:iterate>		
		</logic:notEmpty>
		
		function setupPage(){
	       	loadPage();
	    }
	</script>
<form name="form" method="POST" action="./">
	<!--Command를 담는 공통
	 -->
	<input	type="hidden" name="f_cmd"/>
	<input	type="hidden" name="openMean"/>
	<input	type="hidden" name="f_CurPage"/> 
	<input	type="hidden" name="f_mbl_no"/> 
	
	<div class="layer_popup_title">
		<!-- page_title_area -->
		<div class="page_title_area clear">
		   <h2 class="page_title">
				<span><bean:message key="House_Bill_Close_Message"/></span>
		   </h2>
		   <!-- btn_div -->
		   <div class="opus_design_btn">
			   <button type="button" class="btn_accent" onclick="doWork('TRANSMIT')"><bean:message key="Transmit"/></button><!-- 
			--><button type="button" class="btn_normal" onclick="doWork('DELETE_TRANSMIT')"><bean:message key="Delete"/> <bean:message key="Transmit"/></button><!-- 
			--><button type="button" class="btn_normal" onclick="doWork('CLOSE')"><bean:message key="Close"/></button>
		   </div>
		</div>
	</div>
	<div class="layer_popup_contents">
		<div class="wrap_result">
			<div class="opus_design_inquiry">
				<table>
					<colgroup>
						<col width="100">
						<col width="*">
					</colgroup>
					<tbody>
						<tr height="25px">
							<th><bean:message key="Close_CCN"/></th>
							<td>
								<input type="text" id="f_clz_ccn_no" name="f_clz_ccn_no" maxlength="50" readonly="readonly" value=''  onblur="strToUpper(this);" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:150px;">
							</td>
							<td>
								<input type="text" id="f_clz_msg_sts_nm" name="f_clz_msg_sts_nm" maxlength="20" readonly="readonly" value=''  onblur="strToUpper(this);" class="search_form-disable" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:150px;">
							</td>
						</tr>
						<tr height="25px" style="display:none" id="clz_err_msg">
							<th><bean:message key="Error"/></th>
							<td colspan="2">
								<textarea name="f_clz_err_msg" cols="100" rows="3"  readOnly style = "background-color:#f4f6f6;ime-mode:disabled; text-transform:none; font-family:TAHOMA; overflow:auto; resize:none; white-space: pre-wrap;"></textarea>
							</td>
						</tr>
						<tr height="25px">
							<th><bean:message key="Amendment_after_Arrival"/></th>
							<td colspan="2">
								<input type="checkbox" id="f_atd_cmpl_flg" name="f_atd_cmpl_flg" value="Y" onclick="clickAtdCmplFlg();"/>
							</td>
						</tr>
						<tr height="25px">
							<th><bean:message key="Amendment_Reason"/></th>
							<td colspan="2">
								<bean:define id="cdList" name="valMap" property="actRsnList"/>
			             		<select name="f_act_rsn_cd" style="width:300px;">
			             			<option value=""></option>
			           				<logic:iterate id="codeVO" name="cdList">
			            			<option value='<bean:write name="codeVO" property="cd_val"/>'><bean:write name="codeVO" property="cd_nm"/></option>
			           				</logic:iterate>
		           				</select>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="opus_design_inquiry">
				<div class="opus_design_grid">
					<script language="javascript">comSheetObject('sheet1');</script>
				</div>
			</div>
		</div>
	</div>
</form>