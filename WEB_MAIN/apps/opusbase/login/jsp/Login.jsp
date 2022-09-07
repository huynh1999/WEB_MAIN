<meta charset="utf-8" />
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<!-- Mobile meta tag(S) -->
<meta name="viewport" id="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">
<script>
if(navigator.userAgent.toLowerCase().indexOf('android') > -1)
    document.getElementById('viewport').setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, target-densityDpi=medium-dpi');
</script>
<meta name="format-detection" content="telephone=no" />
<!-- Mobile meta tag(E) -->
<title>OPUS Logistics</title>
<link rel="shortcut icon" href="<%=CLT_PATH%>/favicon_fwd.ico" type="image/x-icon">
<link rel="stylesheet" type="text/css" href="style/css/theme_default.css?ver=<%=CLT_JS_VER%>" />
<link rel="stylesheet" type="text/css" href="style/css/layout.css">
<script src="js/common/jquery-3.2.1.min.js"></script>
<script src="style/js/opus_ui.js?ver=<%=CLT_JS_VER%>"></script>
<script src="js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
<%@include file="./../../../../syscommon/header/CLTInitTokenHeader.jsp"%>
<%@ page import="java.util.Calendar, java.text.SimpleDateFormat"%>
<bean:write name="checkStr" filter="false"/>
<%
	Calendar calendar = Calendar.getInstance();	
 	SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy");
 	String loginPageLink = (String)application.getAttribute("LOGIN_PAGE_LINK");
%>
<script>
	var lastVersion = "<%=CLT_JS_VER%>";
	var year = "<%=dateFormat.format(calendar.getTime())%>";
	var getContextPath = "<%=request.getContextPath() %>";
	
	function checkCookie(cName){
		var i,x,y,ARRcookies=document.cookie.split(";");
		for (i=0;i<ARRcookies.length;i++)
		{
		 x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
		 y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
		 x=x.replace(/^\s+|\s+$/g,"");
		 if (x==cName){
			 return unescape(y);
		 }
		}
	}

 	function showNoticePopup(chkBrowser){		
		modal_center_open("./apps/opusbase/login/jsp/ReleasNotice_Popup.html?getContextPath="+getContextPath+"&version="+lastVersion+"&chkBrowser="+chkBrowser, '', 700,540,"yes");
	} 
	
	function checkChrome(){
		var ua = window.navigator.userAgent;
/* 		if(ua.indexOf('Safari') > 0) {
			if(ua.indexOf('Chrome') > 0){
				var getVersion = checkCookie("releaseNotice");
				if( getVersion != lastVersion || getVersion == undefined || getVersion == null){										
					showNoticePopup("Chrome");
				}				
			}
		}else if(ua.indexOf('MSIE') > 0){
			var getVersion = checkCookie("releaseNotice");			
			if( getVersion != lastVersion || getVersion == undefined || getVersion == null){				
				showNoticePopup("MSIE");
			}
		} */
		
		//#2047 [Fulltrans][LAX] [CLA+LBS] OPUS // Fulltrans LAX - Shanghai Operation Check Needed
		var loginPageLink = ("<%=loginPageLink%>");
		var loginPageLinkHtml = "";
		
		loginPageLink == "Y" ? loginPageLinkHtml = " <a href = " + "<%=LOGIN_PAGE_LINK_VAL%>" + " target='_blank'>" + decodeURIComponent("<%=LOGIN_PAGE_LINK_URL%>") + "</a>" : loginPageLinkHtml = "";
				
		var divTest = document.getElementById("logFooter");
		divTest.innerHTML = "<p>Copyright "+year+". <strong>CyberLogitec</strong> Co.,Ltd. All Rights Reserved. <font>"+ lastVersion +"</font>" + loginPageLinkHtml +"</p>";		
	}
	
	function checkBrowser(){
		var browser=navigator.appName;
		var b_version=navigator.appVersion;
		var version=parseFloat(b_version);
		var lCbrowser = browser.toLowerCase();
	
		if(lCbrowser.indexOf('explorer')< 0 ){
			UserLangCd = window.navigator.language;
			UserLangCd = UserLangCd.toUpperCase();
			//alert(getLabel('OPUS_MSG19'));
		}
	}
	
	//enter event
	$(document).keypress(function(e) {
	    if(e.which == 13) {
	    	submitForm()
	    }
	});

	$(window).on("load", function(e){
		setTimeout(function(){
	        $(".login_div_form > span input").each(function(){
	            if($(this).val() != "" && $(this).val() != null){
	                $(this).parent().addClass("val_ready");
	            } else {
	                $(this).parent().removeClass("val_ready");
	            }
	        });
	        
	        $(":input:visible:enabled:first").focus();
	        
	    },10);
	    
	    //password autocomplete 
	    if(event.type == "keyup" && event.keyCode == 13){
	        setTimeout(function(){
	            $(".login_div_form > span input").each(function(){
	                if($(this).val() != "" && $(this).val() != null){
	                    $(this).parent().addClass("val_ready");
	                } else {
	                    $(this).parent().removeClass("val_ready");
	                }
	            });
	        },10);
	    }
	    
	    $(".login_div_form > span input").bind("keyup focusout",function(){
	        if($(this).val() != "" && $(this).val() != null){
	            $(this).parent().addClass("val_ready");
	        } else {
	            $(this).parent().removeClass("val_ready");
	        }
	    });
	    
		checkChrome();	
	});

	function rtnMsg(){	
		form.j_username.focus();
		<logic:notEmpty name="EventResponse">
			<bean:define id="valMap"  name="EventResponse" property="mapVal"/>
			<logic:notEmpty name="valMap">
				<logic:equal name="valMap" property="msg" value="user">
					alert('You have entered an incorrect User ID or Password.\r\nPlease re-enter or contact your administrator.');
				</logic:equal>
				<logic:equal name="valMap" property="msg" value="pw">
					alert('You have entered an incorrect User ID or Password.\r\nPlease re-enter or contact your administrator.');
				</logic:equal>
				<logic:equal name="valMap" property="msg" value="mac">
					alert('Your Mac Address is not registered.\r\nPlease contact system administrator.');
				</logic:equal>
				<!-- #65: #52672 - [CLA] Security Management / OPUS Forwarding 보안 문제  -->
				<logic:equal name="valMap" property="msg" value="ip">
					alert('Not authenticated.\r\nYou are not authorized to access OPUS.\r\nStop accessing immediately. ');
				</logic:equal>
				<logic:equal name="valMap" property="msg" value="userid">
					alert('Your input user ID, password is wrong 3 times.\r\nPlease contact system administrator.');
				</logic:equal>
				<logic:equal name="valMap" property="msg" value="fail">
					alert('Try again.');
				</logic:equal>
				<logic:equal name="valMap" property="msg" value="chg_pwd">					
					alert('Please change your password.\n(After 90 days, must be changed.)');					
				</logic:equal>
				<logic:equal name="valMap" property="msg" value="multilogin">
                    var retVal = confirm('Another user is already logged in with the same ID.\nContinue?');
                    if(retVal){
                        form.multi_login.value = 'Y';
                        form.j_username.value = '<bean:write name="valMap" property="usrid"/>';
                        form.j_password.value = '<bean:write name="valMap" property="pwd"/>';
						showProcess('WORKING', document);
						this.document.getElementById("loginForm").submit(); 
                        // document.form.submit();
                    }else{
                        console.log('cancel login!');
                    }
                </logic:equal>      
			</logic:notEmpty>
		</logic:notEmpty>
	}

	function submitForm() {
		//Input 검증로직
		if(!validate()){
			return
		}
		with(document.form){
			if(document.all("j_username").value.length < 1){
				//alert(getLabel('OPUS_MSG20'));
				document.all("j_username").focus();
				return;
			}
			if(document.all("j_password").value.length < 1){
				//alert(getLabel('OPUS_MSG21'));
				document.all("j_password").focus();
				return;
			}
			showProcess('WORKING', document);
	//test 기간 동안 주석처리 함. 
	//		if(document.all("j_password").value=="1111"){
	//			alert("Please Change your password.");
	//		}
			submit();
		}
	}
	
	function setCookie(name, value, expiredays){
		var todayDate = new Date();
		todayDate.setDate( todayDate.getDate() + expiredays );		
		//document.cookie = name + "=" +  escape(value) + "; path=/opusfwd; expires=" + todayDate.toGMTString() + ";"
		document.cookie = name + "=" +  escape(value) + "; path=" + getContextPath + "; expires=" + todayDate.toGMTString() + ";"
	}
	
	function getCookie(cookieName){
		var cookies = document.cookie;
		var cookieName = cookieName +"=";
		var start_idx_name = cookies.indexOf(cookieName);
		
		if(start_idx_name == -1) return "";
		
		var start_idx_value = start_idx_name + cookieName.length;
		var end_idx_value = cookies.indexOf(";",start_idx_value);
		
		if(end_idx_value == -1) end_idx_value = cookies.length;
		
		var cookieValue = cookies.substring(start_idx_value,end_idx_value);
		return cookieValue;
	}
	
	$(window).on("load", function(e){
		var image = new Image(); 
		image.src = "/siteresource" + getContextPath + "/fwd_imgs/company_logo.gif";
		$("#com_logo").attr("src", image.src).on("error", function() {
			$("#com_logo").hide();
		});
	});
</script>

<!-- MAC Address 인증 ActiveX -->
<SCRIPT language="JavaScript" for="auth" event="OnError(ErrMsg)">
	alert("Error : " + ErrMsg);
</SCRIPT>
</head>
<logic:notEmpty name="EventResponse">
	<bean:define id="valMap"  name="EventResponse" property="mapVal"/>
	<logic:notEmpty name="valMap">
		<logic:equal name="valMap" property="msg" value="redirection">
			<body class="login_body" onload='javascript:document.getElementById("loginInfo").style.display = "none";doShowProcess();				
				if(location.protocol==="https:"){
					location.replace("https://" +location.host+"<%=request.getContextPath() %>/UserLogin.usr");
				} else {
					location.replace("http://" +location.host+"<%=request.getContextPath() %>/UserLogin.usr");
				}
				' /> 
			<!-- TopFrame.screen LoginRe.screen -->
		</logic:equal>
		<logic:notEqual name="valMap" property="msg" value="redirection">
			<body class="login_body" onload="rtnMsg();">
		</logic:notEqual>
	</logic:notEmpty>
	<logic:empty  name="valMap">			
		<body class="login_body" onload="rtnMsg();" >
	</logic:empty>
</logic:notEmpty>
<logic:empty name="EventResponse">	
	<body class="login_body" onload="rtnMsg();">
</logic:empty>
	<!--  Working Image  -->
	<div id="WORKING_IMG" style="position: fixed;left: 0; right: 0; bottom: 0; top: 0;z-index: 1000;display: none;" valign="middle" align="center">
		<iframe src='<%=CLT_PATH%>/js/common/wait.html' scrolling='no' frameborder='0' style="position: absolute;top: 50%;left: 40%;"></iframe>
	</div>
	<!--  login_wrap(S) -->
	<div id="login">
		<div class="login_box">
			<!-- h1><img src="style/images/theme_default/login_logo.png" alt="OPUS Forwarding: High Performing Global Logistics Solution" /-->
			<!-- <h1><img src="style/images/theme_default/tit_login01.png" alt="EUSU : CyberLogitec" /></h1> -->		
			<div style="position: absolute; top: 100px;">
				<img id="com_logo" />
			</div>
			<div id="loginInfo" class="login_cont">
				<h2>OPUS Logistics</h2>
				<p>&nbsp;Global Logistics Management System</p>
				<%-- OFVFOUR-7758 Add autocomplete = 'off' in the Login.jsp --%>
				<form id="loginForm" name="form" method="post" action="UserLogin.usr" autocomplete="off">
					<input type="hidden" name="f_cmd" value="2" />
					<input type="hidden" name="TOKEN" value=<%=tokenStr %> />
					<input type="hidden" name="multi_login" />
					<fieldset>
						<legend>login box</legend>
							<ul>
								<li><input id="login_id" name="j_username" size="15" placeholder="USER ID" /></li>
								<li><input id="login_pw" name="j_password" type="password" size="15" placeholder="PASSWORD" onkeypress="event.keyCode==13?submitForm():'' " /></li>
							</ul>
						<button type="button" onclick="submitForm();" alt="Login">LOGIN</button>
					</fieldset>
				</form>
				<!--<div class="help">
						<p><a href="#">Forgot your password?</a></p>
						<p><a href="#">Don’t have an account?</a></p>
				</div> -->
			</div>
		</div>
	</div>	
	<div id="logFooter"></div>		
</body>
</html>
