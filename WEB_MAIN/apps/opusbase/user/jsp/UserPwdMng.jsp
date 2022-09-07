<%--
=========================================================
*Copyright(c) 2009 CyberLogitec. All Rights Reserved.
*
=========================================================
=========================================================
*@FileName   : UserPwdMng.jsp
*@Description: 
*@author     : Tuan.Chau
*@version    : 1.0	
*@since      : 06/06/2014

*@Change history:
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>

<%-- Token을 생성하는 기능을 가진 공통함수  Include--%>
<%@include file="./../../../../../../syscommon/header/CLTTokenHeader.jsp"%>
<style>
    .pwdChkTbl2 {font-family:Tahoma,sans-serif; font-weight:bold; width:260px; border:0; height:15px; background-color:#FFF;}
    .pwdChkCon0 {background-color:#EBEBEB; border-right:solid 1px #BEBEBE; border-bottom:solid 1px #BEBEBE; text-align:center;}
    
    .pwdChkTbl1 {border:0; margin:0 0 0 15px; padding:0; width:100%;}
    .pwdChkTbl1 span {font-size:70%;}
    
    .pwdChkTbl2 span {font-size:70%;}
    .pwdChkTbl3 {font-family:Tahoma,sans-serif; font-weight:bold; width:70px; border:0; height:19px; background-color:#FFF; margin:3px 15px 15px 0;}
    .pwdChkTbl3 span {font-size:70%;}
    .pwdChkTbl4 {font-family:Verdana, Arial, Helvetica, sans-serif; font-weight:normal; border:0; background-color:#FFF; margin:0px 20px 0 20px;}
    .pwdChkTd1 {font-size:70%; color:#000; font-weight:bold; vertical-align:top; text-align:right; width:180px; padding:5px 7px 13px 0;}
    .pwdChkTd2 {width:420px; vertical-align:top; padding:0 0 13px 0;}
    .pwdChkTd3 {width:420px; vertical-align:top; padding:0 0 13px 0;}
    .pwdChkTd4 {font-family:Verdana, Arial, Helvetica, sans-serif; font-size:70%; vertical-align:top; padding-bottom:15px;}
    .pwdChkTd4 h3 {font-family: Verdana, Arial, Helvetica, sans-serif; font-size: 130%; font-weight: bold; margin: 8px 0px 0px 0px; padding-bottom: 8px;}
    .pwdChkTd5 {width:98px; vertical-align:top;}
    
    
    .pwdChkCon1 {background-color:#FF4545; border-right:solid 1px #BB2B2B; border-bottom:solid 1px #BB2B2B; text-align:center;}
    .pwdChkCon2 {background-color:#FFD35E; border-right:solid 1px #E9AE10; border-bottom:solid 1px #E9AE10; text-align:center;}
    .pwdChkCon3 {background-color:#3ABB1C; border-right:solid 1px #267A12; border-bottom:solid 1px #267A12; text-align:center;}
    .pwdChkCon4 {background-color:#3ABB1C; border-right:solid 1px #267A12; border-bottom:solid 1px #267A12; text-align:center;}
    
    #inputPC {font-size:70%; width:210px; height:19px; border:solid 1px #AAA;}
    hr.divider {border: 0; width: 95%; height: 2px; color: #B8B8B8; background: #B8B8B8; margin:15px 0 0 20px;}
</style>
	<title><bean:message key="system.title"/></title>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css">
	<script language="javascript" src="<%=CLT_PATH%>/js/common/shortcut.js?ver=<%=CLT_JS_VER%>"></script>
    <script language="javascript" src="<%=CLT_PATH%>/js/common/js/common/message/<%=CLT_MSG_PATH%>/SYS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<SCRIPT LANGUAGE="javascript" SRC="<%=CLT_PATH%>/js/common/PwdChecker.js?ver=<%=CLT_JS_VER%>" TYPE="text/javascript"></SCRIPT>
    <script>
        function doWork(cmd){
        	if(cmd == "SAVE"){
        		if(form.pwd.value==''){
					alert('Please insert \"Current Password\"!');
					form.pwd.focus();
			
				}else if(form.new_pwd.value.length<2){
	                alert('Please insert \"New Password\" more than 2 characters!');
	                form.new_pwd.focus();
					return;
				
				}
        		/*	[20140120 OJG] PASSWORD 2자리이상 제한으로 변경
        		else if(form.new_pwd.value.length<6){
	                alert('Please insert \"New Password\" more than 6 characters!');
	                form.new_pwd.focus();
					return;
				
				}else if(form.new_pwd.value.length>10){
	                alert('\"New Password\" is too long! Please insert 6-10 characters!');
	                form.new_pwd.focus();
	                return;
	
				}
        		*/
				else if(form.new_pwd.value!=form.new_pwd_cnf.value){
	                alert('Please insert the same password with \"New Password\"!');
	                form.new_pwd_cnf.focus();
	                return;
			
				}
				else if(userPwdJS.status < 3 ){
	                alert('The entered password can be saved only if it is more than \"Strong\".');
	                form.new_pwd.value = "";
	                form.new_pwd_cnf.value = "";
	                form.new_pwd.focus();
				}
				else{
				     if(confirm('Do you want to save?')){
						form.f_cmd.value = MODIFY;
						showCompleteProcess();
						form.submit();  
					}
				}
        	}
			
        }
		
		function showMsg(){
			var rslt =  '<bean:write name="EventResponse" property="objVal"/>';
			
			if(rslt == "WORK"){
				alert('Your account password has changed. Please login again.');
				//#5281 [Binex] change password error:3차
				if(window.top == window.self) {
					//doLogout();
					setTimeout(function() {
						doLogout();
					}, 1000);
				} else {
					setTimeout(function() {
						parent.doLogout();
					}, 1000);
				}
				
			}else if(rslt == "FAIL"){
				alert('Current Password is wrong');
			}    
		}
		
		function setupPage(){
			showMsg();
		}
		userPwdJS = {
				status : 0
		}
    </script>
<form name="form" id="formId" method="POST" action="./UserPwdMng.clt">
    <input type="hidden" name="f_cmd"> 
    <input type="hidden" name="TOKEN" value="<%=tokenStr%>">

	
	<div class="page_title_area clear">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn TOP">
	   <!-- 
		   <button id="btnSave" style="cursor:hand" type="button" class="btn_accent" onclick="doWork('SAVE')"><bean:message key="Save"/></button>
		    -->
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
		<div class="opus_design_inquiry wFit">
			<h3 class="title_design"><bean:message key="Login_Information"/></h3>
			<table>
				<colgroup>
					<col width="100">
					<col width="160">
					<col width="*">
				</colgroup>
				<tbody>
	                <tr>
	                    <th><bean:message key="Current_Password"/></th>
	                    <td colspan="2"><!-- 
	                         --><input type="password"   name="pwd"  maxlength="20" class="search_form" style="width:150px">
	                    </td>
	                </tr>
					<tr>
	                     <td colspan="3" height="40">
	                         <b><bean:message key="Enter_your_current_password_and_choose_a_new_password"/></b>
	                     </td>
	                 </tr>
					<tr>
						<th class="table_search_body"><bean:message key="New_Password"/></th>
						<td>
							<input type="password"   name="new_pwd"  value="" style="width:150px" onchange="EvalPwdStrength(document.forms[0],this.value);" onKeyUp="EvalPwdStrength(document.forms[0],this.value);" maxlength="20" class="search_form">
							<br>&nbsp;<bean:message key="6_10_Characters_case_sensitive"/>
						</td>
						<td align="left" valign="top">
							<table class="pwdChkTbl2">         
								<tr>
									<td id="idSM1" width="25%" class="pwdChkCon0" align="center">
										<span style="font-size:1px"></span>
										<span id="idSMT1" style="display:none;"><bean:message key="Weak"/></span>
									</td>
									<td id="idSM2" width="25%" class="pwdChkCon0" align="center" style="border-left:solid 1px #fff">
										<span style="font-size:1px"></span>
										<span id="idSMT0" style="display:inline;font-weight:normal;color:#666"><bean:message key="Not_rated"/></span>
										<span id="idSMT2" style="display:none;">Medium</span>
									</td>
									<td id="idSM3" width="25%" class="pwdChkCon0" align="center" style="border-left:solid 1px #fff">
										<span style="font-size:1px"> </span><span id="idSMT3" style="display:none;"><bean:message key="Strong"/></span>
									</td>
									<td id="idSM4" width="25%" class="pwdChkCon0" align="center" style="border-left:solid 1px #fff">
										<span style="font-size:1px"> </span>
										<span id="idSMT4" style="display:none;"><bean:message key="BEST"/></span>
									</td>
								</tr>
							</table>
						</td>
					</tr>
					<tr>
						<td></td>
						<td colspan="2" style="padding-bottom: 20px;">
							Please be sure new password not to include the personal information such as Date of birth,
							<br>telephone or social security number.
						</td>
					</tr>
					<tr>
						<th><bean:message key="Retype_New_Password"/></th>
						<td colspan="2"><!-- 
							 --><input type="password"   name="new_pwd_cnf"  value="" maxlength="20" class="search_form" style="width:150"><!--
							 --><br><bean:message key="6_10_Characters_case_sensitive"/>
						</td>
					</tr>
					<tr>
						<td></td>
						<td colspan="2">
							Please be sure new password not to include the personal information such as Date of birth, 
							<br>telephone or social security number.
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</form>
<script>
	doHideProcess();
</script>