<%/*=========================================================
			 *Copyright(c) 2014 CyberLogitec. All Rights Reserved.
			 *@FileName   : CMM_POP_0320.jsp
			 *@FileTitle  : ?
			 *@author     : CLT
			 *@version    : 1.0
			 *@since      : 2014/07/24
			 =========================================================*/%>
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
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/PUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/COM_FRT_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/mdm/mcm/partner/script/CMM_POP_0900.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/see/bmd/housebl/script/BL_CODE_UTIL.js?ver=<%=CLT_JS_VER%>"></script>
	
	<bean:define id="valMap"  	 name="EventResponse" property="mapVal"/>
	
	<script type="text/javascript">
		function setupPage(){
			loadPage();
		}
	</script>
<form name="frm1" method="POST" action="./">

<div class="layer_popup_title">
<input type="hidden" name="f_cmd" id="f_cmd"/>
<input type="hidden" name="f_type"  id="f_type"/>
<input type="hidden" name="f_bl_no" id="f_bl_no"/>
<input type="hidden" name="f_intg_bl_seq" id="f_intg_bl_seq"/>
<input type="hidden" name="fr_trdp_cd"  id="fr_trdp_cd"/>
<input type="hidden" name="fr_frt_seq"  id="fr_frt_seq"/>


<input type="hidden" name="file_name">
<input type="hidden" name="title">
<input type="hidden" name="rd_param">

	<!-- page_title_area -->
	<div class="page_title_area clear">
		<h2 class="page_title">
			<span><bean:message key="Print"/></span>
		</h2>
		<!-- btn_div -->
		<div class="opus_design_btn">
			<button type="button" class="btn_normal" onclick="doWork('CLOSE')"><bean:message key="Close"/></button>
		</div>
	</div>

    <div style="font-size: 12px; margin:10px 0px 0px 15px;">
		<span class="warning_msg"></span>
	</div>
 	<div>
		<table width="250" border="0" cellspacing="0" cellpadding="0">
			<tr>
				<td height="5"></td>
			</tr>
		</table>
	</div>
	
	<div>
		<span style="display: none" id = "chk_table">
			<table border="0"  cellspacing="0" cellpadding="0">
				<tr align="left">
					<td width="10px"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
					<td width="50px"></td>
					<td width="45px"><input name="f_group_yn" id="f_group_yn" value="Y" type="radio">Yes</td>
					<td width="45px"><input name="f_group_yn" id="f_group_yn" value="N" type="radio" checked= "checked"><label for="ap_chk">No</label></td>
					<td width="45px"></td>
					<td width="60px"></td>
					<td width="10px"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
				</tr>
			</table>
			<table  border="0" cellspacing="0" cellpadding="0">
				<tr>
					<td></td>
					<td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif">
					</td>
				</tr>
			</table>
		</span>
		<table   border="0"  cellspacing="10" cellpadding="10">
			<tr style="display:none;">
				<td width="7px"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
				<th width="112px"><bean:message key="Voucher_Type"/></th>
                <td width="173px"> 
                	 <bean:define id="vchrTpCdList" name="valMap" property="vchrTpCdList"/>
                    <html:select name="valMap" property="f_vchr_tp_cd" style="width:100px;">
                        <html:options collection="vchrTpCdList" property="cd_val" labelProperty="cd_nm"/>
                    </html:select>
                </td>	
				 <th width="110px"><bean:message key="Voucher_No"/></th>
                 <td width="150px">
                 	<input type="text" name="f_vchr_no" maxlength="20" onBlur="strToUpper(this);" onclick="if(this.value=='AUTO'){this.value=''}" style="ime-mode:disabled; text-transform:uppercase;width:100px" dataformat="excepthan" value="AUTO">
                 </td>  
                                   		
			</tr>
			<tr>
				<td width="7px"><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>	
				<th><bean:message key="Financial_Office"/></th>
				<td>
                      <bean:define id="oficeList" name="valMap" property="ofcList"/>
                      <select name="f_ofc_cd" id="f_ofc_cd" style="width:80px;">
                      	<bean:size id="len" name="oficeList" />
                  		<logic:iterate id="ofcVO" name="oficeList">
                       		<logic:equal name="ofcVO" property="ofc_cd" value="<%= userInfo.getOfc_cd()%>" >
                         		<option selected="selected"  value='<bean:write name="ofcVO" property="ofc_cd"/>'><bean:write name="ofcVO" property="ofc_cd"/></option>
                     	 	</logic:equal>
                     	 	<logic:notEqual name="ofcVO" property="ofc_cd" value="<%= userInfo.getOfc_cd()%>" >
                         		<option value='<bean:write name="ofcVO" property="ofc_cd"/>'><bean:write name="ofcVO" property="ofc_cd"/></option>
                     	 	</logic:notEqual>
                 		 </logic:iterate>
                      </select>				
				</td>
				<td></td>
				<td></td>
			</tr>
			<tr><td height="10"></td></tr>		
			<tr >	
				<td ><img src="<%=CLT_PATH%>/web/img/main/blank.gif"></td>
				<th ><label><span id="ar_rmk" style="display:none"><bean:message key="D/C_Note_Memo"/></span>
									     <span id="ap_rmk" style="display:none"><bean:message key="AP_Memo"/></span>
							      </label>
				</th>
	    		<td colspan="3"><textarea name="f_rmk" id="f_rmk" style="text-transform:none;ime-mode:inactive;width:350px;" maxlength="300" cols="80" rows="4" onkeypress="keyPress_maxLength(this);" onkeyup="keyUp_maxLength(this);" onblur="keyUp_maxLength(this);"></textarea>
			    </td>				
			</tr>

		</table>
	</div>
	<table width="250" border="0" cellspacing="0" cellpadding="0">
		<tr>
			<td height="5"><img src="<%=CLT_PATH%>/web/img/main/blank.gif">
			</td>
		</tr>
	</table>
	<div align="center">
		<button type="button" class="btn_normal" onclick="doWork('PRINT')">Print</button>
	</div>
</div>
<div style="display:none;">
	<script type="text/javascript">comSheetObject('sheet1');</script>
</div>
</form>
<script>
	var pDoc = parent.parent.parent.document;
	hideProcess('WORKING', pDoc);
</script>