<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<script>
	var LoginJs = {
		goPage : function (){
			var url = "/"+location.pathname.split("/")[1]+"/MobMain.clt"
			if(wmsCommonJS.mobileCheck()){
				var addUrl = "http://"+location.host;
				$.jumpPage({"url":addUrl+url});
			}else{
				$(location).attr('href', url);
			}
		},
		login : function(){
			ajaxSendPost(LoginJs.mobLogin, 'reqVal', '&goWhere=aj&bcKey=mobLogin&userId='+$("#user_id").val()+'&userPwd='+$("#inputPassword").val() , './GateServletNSession.gsl');
		},
		mobLogin : function(rtnVal){
			var returnVal = wmsCommonJS.ajaxRes(rtnVal)
			if(returnVal != false){
				if(returnVal.resultCode == "success"){
					LoginJs.goPage();
				}else if (returnVal.resultCode == "user"){
					$("#user_id").val("");
					$("#inputPassword").val("");
					wmsCommonJS.wmsMobAlert({content : getLabel('MOB_MEM_CHECK_MSG1')});
				}else if (returnVal.resultCode == "pw"){
					$("#inputPassword").val("");
					wmsCommonJS.wmsMobAlert({content : getLabel('MOB_MEM_CHECK_MSG2')});
				}
			}
		}
	};
	
	$( document ).ready(function() {
		// 쿠키값을 가져온다.
		var cookie_user_id = LoginCookieInfo.getLogin();
		var cookie_inputPassword = LoginCookieInfo.getPwLogin();
		/**
		* 쿠키값이 존재하면 id/password에 쿠키에서 가져온 id/password를 할당한 뒤
		* 체크박스를 체크상태로 변경
		*/
		if(cookie_user_id != "") {
			$("#user_id").val(cookie_user_id);
			$("#inputPassword").val(cookie_inputPassword);
			$("#remember_me").attr("checked", true);
		}
		
		// Remember me 체크시
		$("#remember_me").on("click", function(){
			var _this = this;
			var isRemember;
				
			if($(_this).is(":checked")) {
				isRemember = confirm(getLabel('MOB_LOG_INFO_MSG1'));
								
				if(!isRemember)    
				$(_this).attr("checked", false);
			}
		});
		
		// 로그인 버튼 클릭시
		$("#btSubmit").on("click", function(){
			if($("#remember_me").is(":checked")){ // 저장 체크시
				LoginCookieInfo.saveLogin($("#user_id").val());
				LoginCookieInfo.savePwLogin($("#inputPassword").val());
			}else{ // 체크 해제시는 공백
				LoginCookieInfo.saveLogin("");	 // ID 쿠키 삭제
				LoginCookieInfo.savePwLogin(""); // PW 쿠키 삭제
			}
		});
	});
	
	//-------------------------------------------------------------------------
	// 로그인 정보 저장
	//-------------------------------------------------------------------------
	// 쿠키에 365일간 저장
	var expire_date = 365;
	var LoginCookieInfo = {
		// 로그인 정보 저장
		// ID 저장
		saveLogin : function (id){
			if(id != "") {
				// userid 쿠키에 id 값을 저장
				LoginCookieInfo.setSave("userid", id, expire_date);
			}else{
				// userid 쿠키 삭제
				LoginCookieInfo.setSave("userid", id, -1);
			}
		},
		savePwLogin : function(id){
			// PW 저장			
			if(id != "") {
				// input Password 쿠키에 id 값을 저장
				LoginCookieInfo.setSave("inputPassword", id, expire_date);
			}else{
				// input Password 쿠키 삭제
				LoginCookieInfo.setSave("inputPassword", id, -1);
			}
		},
		// Cookie에 저장
		setSave : function(name, value, expiredays){
			var today = new Date();
			today.setDate( today.getDate() + expiredays );
			document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + today.toGMTString() + ";"
		},
		// 쿠키값을 가져온다.
		getLogin : function(){
			// userid 쿠키에서 id 값을 가져온다.
			var cook = document.cookie + ";";
			var idx = cook.indexOf("userid", 0);
			var val = "";
			
			if(idx != -1) {
				cook = cook.substring(idx, cook.length);
				begin = cook.indexOf("=", 0) + 1;
				end = cook.indexOf(";", begin);
				val = unescape(cook.substring(begin, end));
			}
			return val;
		},
		// 쿠키값을 가져온다.
		getPwLogin : function(){
			// userid 쿠키에서 PW 값을 가져온다.
			var cook = document.cookie + ";";
			var idx = cook.indexOf("inputPassword", 0);
			var val = "";
			
			if(idx != -1) {
				cook = cook.substring(idx, cook.length);
				begin = cook.indexOf("=", 0) + 1;
				end = cook.indexOf(";", begin);
				val = unescape(cook.substring(begin, end));
			}
			return val;
		}
	};
	
</script>
<div id="contents">
	<div class="container">
		<form class="form-signin" method="post" action="javascript:LoginJs.login();">
			<h2 class="form-signin-heading opus-wms-mobile-log">OPUS WMS<br>Mobile</h2>
			<label for="inputEmail" class="sr-only">USER ID</label>
			<input type="userId" id="user_id" class="form-control" placeholder="USER ID" required autofocus>
			<label for="inputPassword" class="sr-only">Password</label>
			<input type="password" id="inputPassword" class="form-control" placeholder="Password" required>
			<div class="checkbox">
				<label>
					<input type="checkbox" value="" id="remember_me"> Remember me
				</label>
			</div>
			<button id="btSubmit" data-loading-text="Loading..." autocomplete="off" class="btn btn-lg btn-primary btn-block" type="submit">LOGIN</button>
		</form>
	</div> <!-- /container -->
</div><!--// #content -->