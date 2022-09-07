<%--
=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : UserInfoMng
*@FileTitle  : 
*@author     : CLT
*@version    : 1.0
*@since      : 2014/06/04
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>

<%-- Token을 생성하는 기능을 가진 공통함수  Include--%>
<%@include file="./../../../../../../syscommon/header/CLTTokenHeader.jsp"%>
	<title><bean:message key="system.title"/></title>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />

	<%--Stinger Input Validation Script--%>
    <bean:write name="checkStr" filter="false"/>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SYS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="./apps/opusbase/user/script/UserInfoMng.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="./js/common/shortcut.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="./js/common/message/<%=CLT_MSG_PATH%>/FMS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<SCRIPT type="text/javascript" SRC="<%=CLT_PATH%>/js/common/PwdChecker.js?ver=<%=CLT_JS_VER%>" TYPE="text/javascript"></SCRIPT>

	<bean:define id="usrVO"  name="EventResponse" property="objVal"/>
    <bean:define id="rtnMap" name="EventResponse" property="mapVal"/>
    <!-- #535: [SBS] 다국어 처리 V1.0 -->
    <bean:define id="languageType" name="rtnMap" property="PARAM1"/>
    <bean:define id="rpt_biz_tp" name="rtnMap" property="PARAM4"/>
    <bean:define id="rpt_biz_sub_tp" name="rtnMap" property="PARAM3"/>
    
<script type="text/javascript">
<!-- 
function setupPage(){
	loadPage();
	//setSelect();
}

//-->
	//OFVFOUR-7227 [KING FREIGHT NY] APPLYING LINK TO PROFILE EMAIL BODY
	var rpt_biz_tp_cd= 'ALL';
	var rpt_biz_tp_nm='ALL';
	<logic:iterate id="codeVO" name="rpt_biz_tp">
		rpt_biz_tp_nm+= '|<bean:write name="codeVO" property="cd_nm"/>';
		rpt_biz_tp_cd+= '|<bean:write name="codeVO" property="cd_val"/>';
    </logic:iterate>
    var rpt_biz_sub_tp_cd= 'ALL';
	var rpt_biz_sub_tp_nm='ALL';
	<logic:iterate id="codeVO" name="rpt_biz_sub_tp">
		rpt_biz_sub_tp_nm+= '|<bean:write name="codeVO" property="cd_nm"/>';
		rpt_biz_sub_tp_cd+= '|<bean:write name="codeVO" property="cd_val"/>';
    </logic:iterate>
</script>	
<form name="form" method="POST" action="./UserInfoMng.clt">
    <input  type="hidden" name="f_cmd" id="f_cmd"> 
    <input type="hidden" name="TOKEN" id="TOKEN" value="<%=tokenStr%>">
    <input type="hidden" name="save_yn" id="save_yn" value="<bean:write name="usrVO" property="save_yn"/>">
<!-- page_title_area(S) -->
	<div class="page_title_area clear ">
		<!-- page_title(S) -->
		<h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
		<!-- page_title(E) -->
			
		<!-- opus_design_btn(S) -->
		<div class="opus_design_btn TOP" >
		<!-- 
			  <button type="button" class="btn_normal" onclick="doWork('MODIFY')" id="btnModify">Save</button>
			   -->
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
	<div class="wrap_search_tab"></div>  
	<div class="wrap_result_tab"> 
	    <ul class="opus_design_tab">
	        <li id=Tab01 class="nowTab"><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('01');"><span>Basic Information</span></a></li>
	        <li id=Tab02 style="display:none"><a href="#" style="cursor:hand;" onClick="javascript:goTabSelect('02');"><span>Sort Information</span></a></li> 
	    </ul>
	    <div id="tabLayer" name="tabLayer" style="display:inline"><!--Booking&BL-->
			<div class= "opus_design_inquiry wFit"> 
				<table>
					<colgroup>
						<col width="100">
						<col width="175">
						<col width="60">
						<col width="*">
					</colgroup>
					<tr height="8px"></tr>
					<tr>
						<th>ID</th>
						<td>
							<input type="text" name="usrid"      value="<bean:write name="usrVO" property="usrid"/>"      readonly class="search_form-disable">
						</td>
	                    <th><bean:message key="Office"/></th>
	                    <td>
	                        <input type="text" name="ofc_eng_nm" value="<bean:write name="usrVO" property="ofc_eng_nm"/>" style="width:200px;" readonly class="search_form-disable">
	                    </td>
					</tr>
					<tr>
						<th><bean:message key="Name_Eng"/></th>
						<td colspan="3">
							<input type="text" name="eng_usr_nm" value="<bean:write name="usrVO" property="eng_usr_nm"/>" maxlength="300" alt="FirstName" dataformat="excepthan" style="ime-mode:disabled" class="search_form">
						</td>
					</tr>
					<tr>
						<th><bean:message key="Name_Local"/></th>
						<td>
							<input type="text" name="locl_usr_nm" value="<bean:write name="usrVO" property="locl_usr_nm"/>" maxlength="300" class="search_form">
						</td>
						<!-- #535: [SBS] 다국어 처리 V1.0 -->
						<th><bean:message key="Language"/></th>
						<td>
							<input type="hidden" name="h_languageType" value="<bean:write name="usrVO" property="use_lang_cd"/>">
			                <select name="use_lang_cd" style="width:100px;" OnChange="" value="<bean:write name="usrVO" property="use_lang_cd"/>" >
			                <logic:iterate id="codeVO" name="languageType">
			                <option value='<bean:write name="codeVO" property="cd_val"/>'><bean:write name="codeVO" property="cd_nm"/></option>
			                </logic:iterate>
			                </select>
						</td>
						
					</tr>
					<tr>
						<th><bean:message key="Phone"/></th>
						<td>
							<input type="text"   name="phn"    dataformat="excepthan"   value="<bean:write name="usrVO" property="phn"/>" maxlength="30" class="search_form">
						</td>
						<th><bean:message key="Fax"/></th>
						<td>
							<input type="text"   name="fax"    dataformat="excepthan"   value="<bean:write name="usrVO" property="fax"/>" maxlength="30"  style="width:200px;" class="search_form">
						</td>
					</tr>
					<tr>
						<th><bean:message key="Sns_Id"/></th>
						<td>
							<input type="text"   name="sns_info"    dataformat="excepthan"   value="<bean:write name="usrVO" property="sns_info"/>" maxlength="20" class="search_form">
						</td>
						<th><bean:message key="Fax"/></th>
						<td>
							<input type="text"   name="fax"    dataformat="excepthan"   value="<bean:write name="usrVO" property="fax"/>" maxlength="30"  style="width:200px;" class="search_form">
						</td>
					</tr>
					<tr>
						<th><bean:message key="EMail"/></th>
						<td colspan="3">
							<input type="text"   name="eml"       value="<bean:write name="usrVO" property="eml"/>" maxlength="50" class="search_form">
						</td>
					</tr>
					
					<tr>
	                     <th><bean:message key="Email"/> <bean:message key="Password"/></th>
	                     <td colspan="3">
	                         <input type="password"   name="eml_pass"  value="<bean:write name="usrVO" property="eml_pass"/>" maxlength="300">
	                     </td>
	                 </tr>
	                 
	                 <input type="hidden" name="eml_svc_tp" value="E" >
                     <tr>
	                     <th><bean:message key="Always_BCC_Myself"/></th>
	                     <td colspan="3">
	                         <input type="checkBox" <logic:equal name="usrVO" property="eml_bcc_myself_flg" value= "Y" >checked</logic:equal> name="eml_bcc_myself_flg" value="<bean:write name="usrVO" property="eml_bcc_myself_flg"/>" onclick="flgChange(this);">
	                     </td>
	                 </tr>
					<tr>
						<th><bean:message key="Address"/></th>
						<td colspan="3">
							<input type="text"   name="addr"      value="<bean:write name="usrVO" property="addr"/>" size="80" maxlength="100" onblur="strToUpper(this);" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;" class="search_form">
						</td>
					</tr>
					<tr>
						<th><bean:message key="Report_file_path"/></th>
						<td colspan="3">
							<input type="text"   name="rpt_file_path"   value="<bean:write name="usrVO" property="rpt_file_path"/>" size="80" maxlength="100" dataformat="excepthan" style="ime-mode:disabled; class="search_form">
						</td>
					</tr>
					<tr>
						<th><bean:message key="Email_Con" /></th>
						<td colspan="3">
							<textarea name="eml_con" style="width:498px; height:200px; ime-mode:disabled;" class="search_form_uppDown_apply"><bean:write name="usrVO" property="eml_con" filter="false" /></textarea>
								
						</td>
					</tr>
					<tr>
						<th><bean:message key="Contract_No"/></th>
						<td colspan="3">
							<input name="dflt_wh_ctrt_no" id="dflt_wh_ctrt_no" type="text" class="L_input" value="<bean:write name="usrVO" property="dflt_wh_ctrt_no"/>" style="width:100px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup" maxlength="10" OnKeyDown="if(event.keyCode==13){getCtrtInfo(this);}" onChange="getCtrtInfo(this)" onblur="getCtrtInfo(this)"/><!-- 
							 --><button type="button" name="btn_ctrt_no" id="btn_ctrt_no" onclick="doWork('btn_ctrt_no')" class="input_seach_btn" tabindex="-1"></button><!-- 						
							 --><input name="dflt_wh_ctrt_nm" id="dflt_wh_ctrt_nm" type="text" value="<bean:write name="usrVO" property="dflt_wh_ctrt_nm"/>" class="L_input" style="width:365px;ime-mode:disabled;text-transform:uppercase;" dataformat="engup"  readonly />
						</td>
					</tr>
				</table>	
			</div>    
		</div>    
		 <div id="tabLayer" name="tabLayer" style="display:none"> 
			<div class="wrap_result"> 	
				<div class="opus_design_grid" style="width:600px">	
					<script type="text/javascript">comSheetObject('sheet1');</script>
				</div>	 
			</div>	
		</div>
		<div id="tabLayer" name="tabLayer" style="display:inline"> 
			<div class="wrap_result"> 	
				<div class="opus_design_grid" >
					<h3 class="title_design"><bean:message key="Setup"/></h3>
					<div class="opus_design_btn">
						<button id="btnRowAdd2" type="button" onClick="doWork('ROWADD_RPT')" class="btn_normal"><bean:message key="Add"/></button>
						<button id="btnSave2" type="button" onClick="doWork('MODIFY_EML');" class="btn_normal"><bean:message key="Save"/></button>
					</div>	
					<script type="text/javascript">comSheetObject('sheet2');</script>
				</div>	 
			</div>	
		</div>  
	</div>  
</div>  
</form>
<script>
    var pDoc = document;
    hideProcess('WORKING', pDoc);   
</script>   


