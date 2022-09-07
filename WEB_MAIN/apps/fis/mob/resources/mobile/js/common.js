/**
 * FileName : common.js
 * Summary : 공통 적용 Script.
 * @author Sang-Hyun Kim
 * @since jQuery 2
 */

// OS
var osType = "";
if (navigator.userAgent.match("Android") != null) {
	osType = "";
} else if (navigator.userAgent.match("iPhone") != null || navigator.userAgent.match("iPod") != null || navigator.userAgent.match("iPad") != null) {
	osType = "iOS";
}

// 언어 정보
var type = navigator.appName;
var lang = "";
if (type == "Netscape") {
	lang = navigator.language;
} else {
	lang = navigator.userLanguage;
}
lang = lang.substr(0, 2);

var canvas;
var context;
var loadingIntervalId;

var moveLeft;
var moveRight;

//Bookmark용
var MENU_NAME = [ "" , "basictariff" , "demdet" ,
      			"vesselschedule" , "vesselupdate" , "pointtopoint" , "portschedule" , "myschedule" ,
      			"cargotracking" , "notification" , "mytracking" , "visibility" ,
      			"carbon" , "contactinfo" , "container" , "notice" , "blissuerequest" , "servicenetwork" , "voc" , "qrcode"];

var MENU_PATH = [ "" , "ratetariff/basictariff" , "ratetariff/demdet" ,
      			"schedule/vesselschedule" , "schedule/vesselscheduleupdate" , "schedule/pointtopointschedule" , "schedule/portschedule" , "schedule/myschedule" ,
      			"tracktrace/cargotracking" , "home/notification" , "tracktrace/mytracking" , "tracktrace/visibilitysummary" ,
      			"home/carboncalculator" , "home/contactinformation" , "home/containerspec" , "home/notice" , "bkg/blissuerequest" , "home/servicenetwork" , "home/voc" , "home/qrcode"];


function lodingInitialize() {
	canvas = document.getElementById("viewport");
	if (!canvas.getContext) {
		alert("[Error] No Canvas.getContext.");
		return;
	}
	context = canvas.getContext("2d");
	if (!context) {
		alert("[Error] Failed to getContext.");
		return;
	}

	context.translate(29, 29);
	loadingIntervalId = setInterval(loadingRotate, 100);
}

function loadingRotate() {
	context.rotate(Math.PI / 180 * 10);

	var gradient = context.createLinearGradient(0, 0, 50, 0);
	gradient.addColorStop(0, "#00ADEE");
	gradient.addColorStop(1, "#EEEEEE");

	context.beginPath();
	context.clearRect(-29, -29, 55, 55);
	context.closePath();

	context.beginPath();
	context.arc(0, 0, 20, 0, ((Math.PI / 180) * 250), false);
	context.lineWidth = 5;
	context.strokeStyle = gradient;
	context.stroke();
	context.closePath();
}

// 경로
var rootPath = "";

if (osType == "Android") {
	rootPath = "file:///android_asset/www/";
} else if (osType == "iOS") {
	rootPath = location.href.split("www")[0] + "www/";
    rootPath = rootPath.replace("file://", "");
}


var domain = "http://203.246.154.62:9590";
var gwAprvDomain = "http://gw.hanjin.com/ezGateWayM/ezApproval.asmx/";
var gwBrdDomain = "http://gw.hanjin.com/ezGateWayM/ezBoardSTD.asmx/";
var gwDomain = "http://gw.hanjin.com/";
//Test Server  : http://203.246.154.62:9590

(function($) {

	/**
	 * Set cookie
	 * Use : $.setCookie("id", "test", day);
	 */
	$.setCookie = function(name, value, expiredays) {
		var todayDate = new Date();
		todayDate.setDate(todayDate.getDate() + expiredays);
		document.cookie = name + "=" + escape(value) + "; path=/; expires=" + todayDate.toGMTString() + ";";
	};

	/**
	 * Get cookie
	 * Use : $.getCookie("id");
	 */
	$.getCookie = function(name) {
		var isCookie = false;
		var start = 0, end = 0;
		var i = 0;

		while (i <= document.cookie.length) {
			start = i;
			end = start + name.length;

			if (document.cookie.substring(start, end) == name) {
				isCookie = true;
				break;
    		}
    		i++;
    	}

		if (isCookie == true) {
			start = end + 1;
			end = document.cookie.indexOf(";", start);
			if (end < start) {
				end = document.cookie.length;
			}
    		return document.cookie.substring(start, end);
    	}
    	return "";
    };

    /**
     * NULL 체크
     * Use : $.isEmpty(str);
     */
	$.isEmpty = function(str) {
		if (str == null || str.replace(/ /gi,"") == "") {
			return true;
		}
		return false;
	};

	/**
	 * 문자열 길이 출력
	 * Use : $.getByteLen(str);
	 */
	$.getByteLen = function(str) {
		var byteLength = 0;
		for (var inx = 0; inx < str.length; inx++) {
			var oneChar = escape(str.charAt(inx));
			if (oneChar.indexOf("%u") != -1) {
	        	byteLength += 3;
	        } else if (oneChar.indexOf("%") != -1) {
	        	byteLength += oneChar.length/3;
	        } else {
	        	byteLength++;
	        }
		}
		return byteLength;
	};

	/**
	 * Email 형식 check
	 * Use : $.mailCheck(str);
	 */
	$.mailCheck = function(str) {
		return ($.trim(str).match(/^[_\-\.0-9a-zA-Z]{2,}@[-.0-9a-zA-z]{2,}\.[a-zA-Z]{2,4}$/)) ? true : false;
	};

	/**
	 * B/L Number Check
	 * Use : $.isBlNumber(number);
	 */
	$.isBlNumber = function(number) {
		return ($.trim(number).match(/^[A-Z]{3}[0-9A-T]{1}[0-9A-HJ-NP-Z]{5}[0-9]{3}$/)) ? true : false;
	};

	/**
	 * Container Number Check
	 * Use : $.isCntrNumber(number);
	 */
	$.isCntrNumber = function(number) {
		return ($.trim(number).match(/^[A-Z]{4}[0-9]{7}$/)) ? true : false;
	};

	/**
	 * 숫자만 check
	 * Use : $.isNumber(str);
	 */
	$.isNumber = function(str) {
		return ($.trim(str).match(/^[0-9]+$/)) ? true : false;
	};

	/**
	 * 영어만 check
	 * Use : $.isEng(str);
	 */
	$.isEng = function(str) {
		return ($.trim(str).match(/^[a-zA-Z]+$/)) ? true : false;
	};

	/**
	 * 실수 숫자 check
	 * Use : $.isFloat(str);
	 */
	$.isFloat = function(str) {
		return ($.trim(str).match(/^([0-9]|[0-9]\.[0-9])+$/)) ? true : false;
	};

	/**
	 * 음수, 양수를 포함하는 정수만 체크
	 * Use : $.isInteger(str);
	 */
	$.isInteger = function(str) {
		return ($.trim(str).match(/^([-]{0,1}[1-9](\d*))$|^[0]$/)) ? true : false;
	};

	/**
	 * 숫자 외에 모두 삭제.
	 * Use : $.onlyNum(str);
	 */
	$.onlyNum = function(str) {
		return $.trim(str).replace(/[^0-9]/g, "");
	};

	/**
	 * 영문, 숫자인지 check
	 * Use : $.engNum(str);
	 */
	$.engNum = function(str) {
		return ($.trim(str).match(/^[0-9a-zA-Z]+$/)) ? true : false;
	};

	/**
	 * 세자리수에 콤마 추가
	 * Use : $.commaSet(value);
	 */
	$.commaSet = function(value) {
		var reg = /(^[+-]?\d+)(\d{3})/;
		value = value + "";
		while (reg.test(value)) {
	    	value = value.replace(reg, "$1" + "," + "$2");
		}
		return value;
	};

	/**
	 * Null 값을 &nbsp;로 변환
	 * Use : $.nullToNbsp(value);
	 */
	$.nullToNbsp = function(value) {
		if (value != null && value != "") {
			return value;
		} else {
			return "&nbsp;";
		}
	};

	/**
	 * 입력값 대문자 변환
	 * Use : $("#inputbox").uppercase()
	 */
	$.fn.uppercase = function() {
		$(this).keyup(function() {
			$(this).val($(this).val().toUpperCase());
		});
	};

	/**
	 * 경고성 팝업창 닫기.
	 */
	$.closeWarningDialog = function() {
		$("#warningDialog").remove();
	};

	/**
	 * 경고성 팝업창.
	 * Use : $.warningDialog(messages);
	 */
	$.warningDialog = function(message, second) {
		if ($("#warningDialog").length == 0) {
			var outHtml = "";
			outHtml += "<div id='warningDialog' style='width:100%; margin:0px; padding:0px; color:#555;'>";
			outHtml += "  <div style='background:#cc3336; color:#fff; border:1px solid #982628; vertical-align:middle; overflow:hidden; width:100%;'>";
			outHtml += "    <table border='0' cellpadding='0' cellspacing='0' style='padding-bottom:0px; font-size:25px; padding-right:15px; line-height:20px; width:100%;'>";
			outHtml += "      <tr>";
			outHtml += "        <td><img src='" + rootPath + "images/common/warning.png'></td>";
			outHtml += "        <td style='text-align:center;'> " + message + "</td>";
			outHtml += "      </tr>";
			outHtml += "    </table>";
			outHtml += "  </div>";
			outHtml += "</div>";
			$("body").append(outHtml);
			$("#warningDialog").css("top", "0px");
			$("#warningDialog").css("position", "fixed");
			$("#warningDialog").css("z-index", "9999");

			setTimeout("$.closeWarningDialog()", second * 1000);
		}
	};

	/**
	 * Script message 변환.
	 * 사용방법 : $.msgConvert(As is Message, [value1, value2, ...]);
	 * @return String
	 */
	$.msgConvert = function(message, values) {
		for (var i=0; i<values.length; i++) {
			message = message.replace("\{" + i + "\}", values[i]);
		}
		return message;
	};

	/**
	 * Loading 화면 시작.
	 * Use : $.startLoading();
	 */
	$.startLoading = function() {
		var loadingDiv = $("<div />").attr("id", "loadingBar");
		loadingDiv.css({
			"top" : "0px",
			"left" : "0px",
			"width" : $(document).width(),
			"height" : $(document).height(),
			"position" : "fixed",
			"background" : "transparent",
			"z-index" : 9000
		});

		var blockDiv = $("<div />").css({
			"top" : "0px",
			"left" : "0px",
			"width" : "100%",
			"height" : "100%",
			"position" : "fixed",
			"background-color" : "#000000",
			"opacity" : "0.5",
			"cursor" : "wait",
			"z-index" : 9001
		});
		loadingDiv.append(blockDiv);

		var canvasDiv = $("<div />").css({
			"top" : $(window).height() / 2.5,
			"left" : ($(window).width() - 57) / 2,
			"width" : "57px",
			"height" : "57px",
			"background-color" : "transparent",
			"padding" : "0px",
			"position" : "fixed",
			"z-index" : 9002
		});
		canvasDiv.append($("<img />").attr({
			"src" : rootPath + "images/loading_logo.png",
			"width" : 30,
			"height" : 26
		}).css({
			"position" : "absolute",
			"left" : "15px",
			"top" : "17px"
		}));
		canvasDiv.append($("<canvas />").attr({
			"id" : "viewport",
			"width" : 57,
			"height" : 57
		}));

		loadingDiv.append(canvasDiv);
		$("body").append(loadingDiv);

		lodingInitialize();
	};

	/**
	 * Loading 화면 종료.
	 * Use : $.stopLoading();
	 */
	$.stopLoading = function() {
		clearInterval(loadingIntervalId);
		$("#loadingBar").remove();
	};

	/**
	 * Alert 화면 구성
	 * Use : $.alert({"title":"Alert", "content":"", "type":"C", "ok":function() {}, "close":function() {}});
	 */
	$.alert = function(options) {
		var params = {
			"title" : "Alert",
			"content" : "",
			"type" : "",
			"ok" : function() {},
			"cancel" : function() {}
		};
		params = $.extend(params, options);

		var divTag = $("<div />").attr("class", "Alert");
		divTag.append($("<h2 />").append(params.title));
		divTag.append(params.content);

		divTag.append("<br /><br />");
		if (params.type != "C") {
			var buttonTag = $("<div />").attr("class", "Btn_B");
			var btnClose = $("<p />").attr("class", "alert");
			btnClose.append($("<a />").attr("href", "#").append("Ok"));
			btnClose.click(function() {
				eval(params.ok)();
				$("#alertDiv").remove();
			});
			buttonTag.append(btnClose);
			divTag.append(buttonTag);
		} else {
			var buttonTag = $("<div />").attr("class", "Btn_B");
			var btnClose = $("<p />").attr("class", "alert");
			btnClose.append($("<a />").attr("href", "#").append("Cancel"));
			btnClose.click(function() {
				eval(params.cancel)();
				$("#alertDiv").remove();
			});
			buttonTag.append(btnClose);
			buttonTag.append("&nbsp;&nbsp;");

			var btnOk = $("<p />").attr("class", "alert");
			btnOk.append($("<a />").attr("href", "#").append("Ok"));
			btnOk.click(function() {
				eval(params.ok)();
				$("#alertDiv").remove();
			});
			buttonTag.append(btnOk);
			divTag.append(buttonTag);
		}

		var alertTag = $("<div />").attr({"id":"alertDiv"});
		alertTag.css({
			"left" : 0,
			"top" : 0,
			"width" : $(document).width(),
			"height" : $(document).height(),
			"position" : "absolute",
			"background-color" : "transparent",
			"z-index" : 9000
		});
		alertTag.append($("<div />").css({
			"left" : 0,
			"top" : 0,
			"width" : "100%",
			"height" : $(document).height(),
			"position" : "absolute",
			"background-color" : "#000000",
			"opacity" : 0.6,
			"z-index" : 9001
		}));

		divTag.css({
			"width" : $(document).width() - 32,
			"left" : "0px",
			"top" : $(window).height() * 0.20,
			"z-index" : 9002,
			"position" : "fixed"
		});

		alertTag.append(divTag);
		$("body").append(alertTag);
	};

	/**
	 * Warning Alert 출력.
	 * Use : $.warningAlert(message);
	 */
	$.warningAlert = function(message) {
		var alertDiv = $("<div />").attr("id", "warningAlert");
		if ($("#warningAlert").length == 0) {
			alertDiv = $("<div />").attr("id", "warningAlert");
		} else {
			alertDiv = $("#warningAlert");
			alertDiv.html("");
		}

		alertDiv.css({
			"position" : "absolute",
			"left" : "0px",
			"top" : "0px",
			"width" : "100%",
			"height" : "100%",
			"z-index" : 9000
		});

		var h2 = $("<h2 />").attr("class", "warning");
		h2.append($("<span />").append($("<img />").attr("src", "images/icon_warning.png")));
		h2.append("&nbsp;" + message);
		alertDiv.append(h2);
		$("#HJ").append(alertDiv);

		// 3초간 보여준 후 출력.
		setTimeout(function() {
			$("#warningAlert").remove();
		}, 3000);
	};

	/**
	 * Popup 화면 구성
	 * Use : $.openPopup({"title":"Popup", "content":""});
	 */
	$.openPopup = function(options) {
		var params = {
			"title" : "Popup",
			"content" : ""
		};
		params = $.extend(params, options);

		var divObject;
		if ($("#PopUp").length < 1) {
			divObject = $("<div />").attr("id", "PopUp");
		} else {
			divObject = $("#PopUp");
			divObject.html("");
		}

		divObject.css({
			"left" : 0,
			"top" : 0,
			"width" : $(document).width(),
			"height" : $(document).height(),
			"position" : "absolute",
			"background-color" : "transparent",
			"z-index" : 9000
		});
		divObject.append($("<div />").css({
			"left" : 0,
			"top" : 0,
			"width" : "100%",
			"height" : $(document).height(),
			"position" : "absolute",
			"background-color" : "#000000",
			"opacity" : 0.6,
			"z-index" : 9001
		}));

		var contentDivTag = $("<div />").attr({"id":"Contents", "data-role":"content"});
		contentDivTag.css({
			"width" : $(document).width() - 15,
			"left" : "6px",
			"top" : $(document).scrollTop() + 5,
			"z-index" : 9002,
			"position" : "relative",
			"background" : "#FFFFFF"
		});

		var titleDivTag = $("<div />").attr("class", "Pop_Contents");
		var h2Tag = $("<h2 />");
		h2Tag.append("&nbsp;" + params.title);
		h2Tag.append($("<div />").attr({"id":"btnPopupClose", "class":"top_close"}));
		titleDivTag.append(h2Tag);
		contentDivTag.append(titleDivTag);

		contentDivTag.append(params.content + "<br />");
		divObject.append(contentDivTag);

		$("body").append(divObject);

		$("#btnPopupClose").click(function() {
			$("#PopUp").remove();
		});
	};

	/**
	 * Open Push Notification
	 * Use : $.openNativePopup({"classname":""});
	 */
	$.openPushNoti = function(data) {
		//$.openNativePopup({"classname":"WebDialog"});
	};

	/**
	 * Get Device ID.
	 * Use : $.getDeviceInfo();
	 */
	$.getDeviceInfo = function(options) {
		var params = {
			"callback" : "",
			"data" : ""
		};
		params = $.extend(params, options);

		if (osType == "Android") {
			window.android.getDeviceInfo(JSON.stringify(params));
		} else if (osType == "iOS") {
			window.location = "getdeviceinfo:" + JSON.stringify(params);
		}
	};

	/**
	 * Popup 화면 종료
	 * Use : $.closePopup();
	 */
	$.closePopup = function() {
		$("#PopUp").remove();
	};

	/**
	 * Login Popup 화면 구성.
	 * Use : $.openLogin(openUrl, true or false);
	 */
	var reLoad;
	var openUrl;
	var UID;
	$.openLogin = function(openUrl_, reLoad_) {
		reLoad = reLoad_;
		openUrl = openUrl_;

		var content = "";
		content += "<div id='POPup'>";
		content += "  <div class='loginWrap'>";
		content += "    <div class='btn_close'><a href='#' id='btnLoginPopupClose'><img src='images/icon_close_login.png'></a></div>";
		content += "    <h5 class='login'><span>Login</span></h5>";
		content += "    <div class='loginbox'>";
		content += "      <fieldset id=''>";
		content += "        <legend>Log in</legend>";
		content += "        <div class='ui_postion_rel'>";
		content += "          <div class='icon'><img src='images/icon_login_id.png'></div>";
		content += "          <input type='text' id='loginId' class='ui-input-text2' placeholder='ID'>";
		content += "        </div>";
		content += "        <div class=' mgT15 ui_postion_rel'>";
		content += "          <div class='icon'><img src='images/icon_login_pw.png'></div>";
		content += "          <input type='password' id='loginPw' class='ui-input-text2' placeholder='PW'>";
		content += "        </div>";
		content += "      </fieldset>";
		content += "      <div class='login_btn_set mgT20' id='btnGoLogin'> <a href='#' class='ui_button'>Sign In</a></div>";
		content += "      <div class='id_save mgT10'><div class='savebox'><input type='checkbox' id='saveId' /></div>Save ID</div>";
		content += "    </div>";
		content += "  </div>";
		content += "</div>";

		var divObject;
		if ($("#LoginPopUp").length < 1) {
			divObject = $("<div />").attr("id", "LoginPopUp");
		} else {
			divObject = $("#LoginPopUp");
			divObject.html("");
		}

		divObject.css({
			"left" : 0,
			"top" : 0,
			"width" : $(document).width(),
			"height" : $(document).height(),
			"position" : "absolute",
			"background-color" : "transparent",
			"z-index" : 9000
		});
		divObject.append($("<div />").css({
			"left" : 0,
			"top" : 0,
			"width" : "100%",
			"height" : $(document).height(),
			"position" : "absolute",
			"background-color" : "#000000",
			"opacity" : 0.6,
			"z-index" : 9001
		}));

		var contentDivTag = $("<div />").attr({"id":"Contents", "data-role":"content"});
		contentDivTag.css({
			"width" : $(document).width(),
			"left" : 0,
			"top" : $(document).scrollTop() + 5,
			"z-index" : 9002,
			"position" : "relative",
			"background-color" : "transparent"
		});
		contentDivTag.append(content + "<br />");
		divObject.append(contentDivTag);

		$("body").append(divObject);

		var saveId = $.getCookie("Save_ID");
		if (saveId != undefined && saveId != "") {
			$("#loginId").val(saveId);
			$("#saveId").prop("checked", true);
		}

		$("#btnGoLogin").click(function() {
			if ($("#loginId").val() == "" || $("#loginPw").val() == "") {
				alert(CMI00010);
				return false;
			}

			if ($("#saveId").prop("checked") == true) {
				$.setCookie("Save_ID", $("#loginId").val(), 365);
			} else {
				$.setCookie("Save_ID", "", 365);
			}

			$.startLoading();
			UID = $("#loginId").val();
			$.request({
				"url" : domain + "/mhanjin/LoginGS.do",
				"dataType" : "json",
				"callback" : "loginResult",
				"type" : "POST",
				"data" : {
					"f_cmd" : "2",
					"usr_id" : $("#loginId").val(),
					"usr_pwd" : $("#loginPw").val()
				}
			});

		});

		$("#btnLoginPopupClose").click(function() {
			$("#LoginPopUp").remove();
		});
	};

	loginResult = function( data ){
		$.stopLoading();
		if ( data != undefined && data.TRANS_RESULT_KEY == "S" && data.isSuccess == "S" ) {
			$.setCookie("LOGIN", UID, 365);
			if (reLoad != undefined && reLoad == true) {
				location.href = rootPath + "index.html";
			} else {
				$.changePage( openUrl );
			}
		} else {
			alert(CMI00011);
		}
	};

	/**
	 * Logout 처리
	 * $.logout();
	 */
	var logoutResult;
	$.logout = function() {
		$.request({
			"url" : domain+"/mhanjin/LoginGS.do",
			"dataType" : "json",
			"type" : "POST",
			"callback" : "logoutResult",
			"data" : {
				"f_cmd" : REMOVE
			}
		});
	},
	logoutResult = function( data ) {
		if( data.isSuccess == "S" ) {
			$.setCookie("LOGIN", "", 1);
			location.reload();
		}
	};
///////////////////////////////////////////////////////////////////////////////////////////////////////

	/**
	 * Application 종료 처리.
	 * Use : $.exitApp();
	 */
	$.exitApp = function() {
		if (osType == "Android") {
			window.android.exitApp();
		} else if (osType == "iOS") {
			window.location = "exitapp:";
		}
	};

	/**
	 * Server Request.
	 * Use : $.request({"url":"", "callback":"", "data":{}});
	 */
	$.request = function(options) {
		var params = {
			"url" : "",
			"callback" : "",
			"data" : {}
		};
		params = $.extend(params, options);

		$.each(params.data, function(key, value) {
			if ($.type(value) == "function") {
				params.data[key] = eval(value)();
			}
		});

		if (osType == "Android") {
			window.android.request(JSON.stringify(params));
		} else if (osType == "iOS") {
			window.location = "request:" + JSON.stringify(params);
		}
	};

	/**
	 * Local database 접근
	 * Use : $.executeQuery({"query":"", "type":"R", "callback":"", "data":[]});
	 *       type's value : R -> SELECT, I -> INSERT, U -> UPDATE OR DELETE
	 */
	$.executeQuery = function(options) {
		var params = {
			"query" : "",
			"type" : "R",
			"callback" : "",
			"data" : []
		};
		params = $.extend(params, options);

		for (var i=0; i<params.data.length; i++) {
			if ($.type(params.data[i]) == "function") {
				params.data[i] = eval(params.data[i])();
			}
		}

		if (osType == "Android") {
			window.android.executeQuery(JSON.stringify(params));
		} else if (osType == "iOS") {
			window.location = "executequery:" + JSON.stringify(params);
		}
	};

	/**
	 * Page 전환
	 * Use : $.changePage({"url":"", "data":{}});
	 */
	$.changePage = function(options) {
		var params = {
			"url" : "",
			"data" : {}
		};
		params = $.extend(params, options);

		$.each(params.data, function(key, value) {
			if ($.type(value) == "function") {
				params.data[key] = eval(value)();
			}
		});

		if (osType == "Android") {
			window.android.changePage(JSON.stringify(params));
		} else if (osType == "iOS") {
			window.location = "changepage:" + JSON.stringify(params);
		}
	};

	/**
	 * Page 전환 For MHT
	 * Use : $.loadMhtView({"url":"", "callback":""});
	 */
	$.loadMhtView = function(options) {
		var params = {
			"url" : "",
			"callback" : ""
		};
		params = $.extend(params, options);

		if (osType == "Android") {
			window.android.loadMhtView(JSON.stringify(params));
		} else if (osType == "iOS") {
			window.location = "loadmhtview:" + JSON.stringify(params);
		}
	};

	/**
	 * Page 전환 - SideMenu 시
	 * Use : $.jumpPage({"url":"", "data":{}});
	 */
	$.jumpPage = function(options) {
		var params = {
			"url" : "",
			"data" : {}
		};
		params = $.extend(params, options);

		$.each(params.data, function(key, value) {
			if ($.type(value) == "function") {
				params.data[key] = eval(value)();
			}
		});

		if (osType == "Android") {
			window.android.jumpPage(JSON.stringify(params));
		} else if (osType == "iOS") {
			window.location = "jumppage:" + JSON.stringify(params);
		}
	};

	/**
	 * Auto Complete 화면 출력.
	 * Use : $.openAutoComplete(data);
	 */
	var autoCompleteId = "";
	var autoCompleteType = "";
	$.openAutoComplete = function(data) {
		var handler = function() {
			if ($(this).attr("id") != "divAutoComplete") {
				$("#divAutoComplete").remove();
			}
		};

		if (data.isSuccess == "S" && data.count > 0) {
			var offset = $("#" + autoCompleteId).offset();
			var divLeft = offset.left;
			var divTop = offset.top + $("#" + autoCompleteId).outerHeight();
			var divWidth = $("#" + autoCompleteId).outerWidth();

			var divObject;
			if ($("#divAutoComplete").length < 1) {
				divObject = $("<div />").attr({"id":"divAutoComplete", "class":"Auto_txt"});
			} else {
				divObject = $("#divAutoComplete");
				divObject.html("");
			}

			divObject.css({
				"left" : divLeft,
				"top" : divTop,
				"width" : divWidth,
				"position" : "absolute",
				"background-color" : "#FFFFFF",
				"z-index" : "9000"
			});

			var olObject = $("<ul />");
			for (var i=0; i<data.list.length; i++) {
				var liObject;
				if (autoCompleteType == "D") {
					liObject = $("<li />").attr("title", data.list[i].code).html(data.list[i].desc).css({"min-height":"30px", "bottom":"1px solid"});
				} else {
					liObject = $("<li />").attr("title", data.list[i].code).html(data.list[i].value).css({"min-height":"30px", "bottom":"1px solid"});
				}
				olObject.append(liObject);
			}
			divObject.append(olObject);
			$("body").append(divObject);

			$("#divAutoComplete > ul > li").click(function() {
				$(this).css("background-color", "yellow");
				$("#" + autoCompleteId).val($(this).html());
				$("#" + autoCompleteId + "_code").val($(this).attr("title"));
				$("#divAutoComplete").remove();
				$("body").unbind("click", handler);
			});

			$("body").click(handler);
		} else {
			$("body").unbind("click", handler);
		}
	};

	/**
	 * Input box 자동 완성 기능 제공
	 * Use : $("#inputbox").autoComplete({"type":"D", "min":"3", "query":{"query":"", "data":[]}, "request":{"url":"", "data":{}}, "menual" : [{"code":"", "desc":""}, ...]});
	 *       type's value : D -> Database(query), R -> Request(request), M -> Menual(menual)
	 */
	$.fn.autoComplete = function(options) {
		var params = {
			"type" : "D",
			"min" : 3,
			"id" : $(this).attr("id"),
			"callback" : "",
			"query" : {
				"query" : "",
				"data" : []
			},
			"request" : {
				"url" : "",
				"data" : {}
			},
			"menual" : []
		};
		params = $.extend(params, options);
		var queryData = $.extend(queryData, params.query.data);
		var requestData = $.extend(requestData, params.request.data);

		$(this).keyup(function() {
			if ($(this).val().length >= params.min) {
				var data;
				if (params.type != "M") {
					if (params.type == "D") {
						for (var i=0; i<params.query.data.length; i++) {
							if ($.type(queryData[i]) == "function") {
								params.query.data[i] = eval(queryData[i])();
							}
						}
					} else if (params.type == "R") {
						$.each(requestData, function(key, value) {
							if ($.type(value) == "function") {
								params.request.data.value = eval(value)();
							}
						});
					}

					autoCompleteId = params.id;
					autoCompleteType = params.type;
					if (osType == "Android") {
						data = window.android.autoComplete(JSON.stringify(params));
						$.openAutoComplete(JSON.parse(data));
					} else if (osType == "iOS") {
						window.location = "autocomplete:" + JSON.stringify(params);
					}
				} else {
					data = {
						"isSuccess" : "S",
						"exception" : "",
						"count" : params.menual.length,
						"list" : params.menual
					};
					$.openAutoComplete(data, $(this).attr("id"));
				}
			}
		});
	};

	/**
	 * Open Native Popup.
	 * Use : $.openNativePopup({"classname":""});
	 */
	$.openNativePopup = function(options) {
		var params = {
			"classname" : ""
		};
		params = $.extend(params, options);

		if (osType == "Android") {
			window.android.openNativePopup(JSON.stringify(params));
		} else if (osType == "iOS") {
			window.location = "opennativepopup:" + JSON.stringify(params);
		}
	};

	/**
	 * Popup 화면 종료
	 * Use : $.closePopup();
	 */
	$.closePopup = function() {
		$("#PopUp").remove();
	};

	/**
	 * Call Parent Object.
	 * Use : $.callParentObject(str);
	 */
	$.callParentObject = function(str) {
		if (osType == "Android") {
			window.android_popup.callParentObject(str);
		} else if (osType == "iOS") {
			window.location = "callparentobject:" + str;
		}
	};

	/**
	 * History Back.
	 * $.historyBack();
	 */
	$.historyBack = function() {
		window.history.back();
		/*
		if(window.android){
			if (osType == "Android") {
				window.android.historyBack();
			} else if (osType == "iOS") {
				window.location = "historyback:";
			}
		}else{
			window.history.back();
		}
		*/
		
	};
	
	/**
	 * History Forward.
	 * Use : $.historyForward();
	 */
	$.historyForward = function() {
		if (osType == "Android") {
			window.android.historyForward();
		} else if (osType == "iOS") {
			window.location = "historyforward:";
		}
	};

	/**
	 * Camera, Gallery 호출 후 Server 전송.
	 * Use : $.mediaAccess({"url":"", "callback":"", "type":"", "data":{}});
	 *       type's value : "I" -> Camera Image, "V" -> Camera Video, "G" -> Gallery
	 */
	$.mediaAccess = function(options) {
		var params = {
			"url" : "",
			"callback" : "",
			"type" : "G",
			"data" : {}
		};
		params = $.extend(params, options);

		if (osType == "Android") {
			window.android.mediaAccess(JSON.stringify(params));
		} else if (osType == "iOS") {
			window.location = "mediaaccess:" + JSON.stringify(params);
		}
	};

	/**
	 * Open MultiViewer.
	 * Use : $.openMultiViewer();
	 */
	$.openMultiViewer = function() {

		if (osType == "Android") {
			window.android.openMultiViewer();
		} else if (osType == "iOS") {
			window.location = "openmultiviewer:";
		}
	};

    /**
     * Open Qr Reader
     * Use : $.openQrReader({"param":"", "callback":"", "data":""});
     */
    $.openQrReader = function(options) {
        var params = {
                "param" : "",
				"callback" : "",
                "data": {}
        };
        params = $.extend(params, options);

        if (osType == "Android") {
            window.android.openQrReader(JSON.stringify(params));
        } else if (osType == "iOS") {
            window.location = "openqrreader:" + JSON.stringify(params);
        }
    };

	/**
	 * Open Sliding Side Menu.
	 * Use : $.openSideMenu();
	 */
	$.openSideMenu = function() {
		if (osType == "Android") {
			window.android.openSideMenu();
		} else if (osType == "iOS") {
			window.location = "opensidemenu:";
		}
	};

	/**
	 * Refresh Sliding Side Menu View.
	 * Use : $.refreshSideMenu();
	 */
	$.refreshSideMenu = function() {

		if (osType == "Android") {
			window.android.refreshSideMenu();
		} else if (osType == "iOS") {
			window.location = "refreshsidemenu:";
		}
	};

    /**
     * Add a Name to Contact.
     * Use : $.addContact({"data":""});
     */
    $.addNewContact = function(options) {
        var params = {
            "data" : ""
        };
        params = $.extend(params, options);

        if (osType == "Android") {
            window.android.addContact(JSON.stringify(params));
        } else if (osType == "iOS") {
            window.location = "addcontact:" + JSON.stringify(params);
        }
    };

    /**
     * Update GPS Info.
     * Use : $.updateCurLoc({"callback":"", "data":{}});
     */
    $.updateCurLoc = function(options) {
        var params = {
                "callback" : "",
                "data": {}
        };
        params = $.extend(params, options);

        if (osType == "Android") {
            window.android.currentLocation(JSON.stringify(params));
        } else if (osType == "iOS") {
            window.location = "currentlocation:" + JSON.stringify(params);
        }
    };

	/**
     * Get Distance Between Two Dots.
     * Use : $.getDistance({"param":{"lat1":"", "lon1":"", "lat2":"", "lon2":""}, "callback":"", "data":""});
     */
    $.getDistance = function(options) {
        var params = {
                "param" : {"lat1":"", "lon1":"", "lat2":"", "lon2":""},
				"callback" : "",
                "data": ""
        };
        params = $.extend(params, options);

        if (osType == "Android") {
            window.android.getDistance(JSON.stringify(params));
        } else if (osType == "iOS") {
            window.location = "getdistance:" + JSON.stringify(params);
        }
    };

    /**
     * Update Network Info.
     * Use : $.updateNetSts({"callback":"", "data":""});
     * callback result data : (0: Access Not Available / 1: Reachable WiFi / 2: Reachable WWAN)
     */
    $.updateNetSts = function(options) {
        var params = {
            "callback" : "",
            "data" : ""
        };
        params = $.extend(params, options);

        if (osType == "Android") {
            window.android.checkNetwork(JSON.stringify(params));
        } else if (osType == "iOS") {
            window.location = "checknetwork:" + JSON.stringify(params);
        }
    };

    /**
	 * 날짜 입력 Form 생성.
	 * Use : $.fn.calendar(type, dateStr);
	 *     type : "date", "datetime"(Safari에서만 사용 가능)
	 *     dateStr : 초기값
	 */
	$.fn.calendar = function(type, dateStr) {
		var height = $(this).outerHeight();
		var parentObj = $(this).parent();
		parentObj.addClass("Attach");
		var tagId = $(this).attr("id") + "_dt";

		// Type에 따른 maxlength 조절
		if (type == "date") {
			$(this).attr("maxlength", 10);
		} else if (type == "datetime") {
			$(this).attr("maxlength", 19);
		}

		// 초기값 setting
		if (dateStr != null && dateStr != "") {
			$(this).val(dateStr);
		} else {
			var today = new Date();
			var value = today.getFullYear() + "-" + ((today.getMonth() + 1) < 10 ? "0" + (today.getMonth() + 1) : (today.getMonth() + 1)) + "-" + ((today.getDate() < 10) ? "0" + today.getDate() : today.getDate());
			if (type == "datetime") {
				value += (today.getHours() < 10 ? "0" + today.getHours() : today.getHours()) + ":";
				value += (today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes()) + ":";
				value += today.getSeconds() < 10 ? "0" + today.getSeconds() : today.getSeconds();
			}
			$(this).val(value);
		}

		// 출력할 Tag 생성
		var spanTag = $("<span />").attr("class", "Attach_file_img");
		var inputTag = $("<input />").attr({"type":type, "id":tagId, "value":dateStr, "class":"Attach_file_hdn"});
		spanTag.append(inputTag);
		parentObj.append(spanTag);

		// DatePicker 선택 후 input box에 값 입력
		var id = $(this).attr("id");
		$("#" + tagId).change(function() {
			var dateStr = $(this).val().replace(/[^0-9]/g, "");
			var value = dateStr.substr(0, 4) + "-" + dateStr.substr(4, 2) + "-" + dateStr.substr(6, 2);
			if (type == "datetime") {
				value += " " + dateStr.substr(8, 2) + ":" + dateStr.substr(10, 2) + ":" + dateStr.substr(12, 2);
			}
			$("#" + id).val(value);
		});

		// 직접 입력할 경우, 입력 form check.
		$(this).keyup(function(event) {
			var lastChar = $(this).val().charAt($(this).val().length - 1);
			if (lastChar != "-" && lastChar != ":" && lastChar != " ") {
				var dateStr = $(this).val().replace(/[^0-9]/g, "");

				var value = dateStr.substr(0, 4);
				if (dateStr.length > 4) { value += "-"; }
				value += dateStr.substr(4, 2);
				if (dateStr.length > 6) { value += "-"; }
				value += dateStr.substr(6, 2);
				if (type == "datetime") {
					if ($(this).val().length > 8) {
						value += " ";
						value += dateStr.substr(8, 2);
						if (dateStr.length > 10) { value += ":"; }
						value += dateStr.substr(10, 2);
						if (dateStr.length > 12) { value += ":"; }
						value += dateStr.substr(12, 2);
					}
				}
				$(this).val(value);
			}
		});

		// 입력 날짜 값 검증
		$(this).focusout(function() {
			var id = $(this).attr("id");

			if (type == "date") {
				var isValidate = true;

				if (!$(this).val().match(/[0-9]{4}[-][0-9]{2}[-][0-9]{2}/)) {
					isValidate = false;
				} else {
					var dates = $(this).val().split(/[-]/);
					if (Number(dates[1]) < 1 || Number(dates[1]) > 12 || Number(dates[2]) > 31) {
						isValidate = false;
					}
				}
				if (!isValidate) {
					$.alert({
						"content" : CMW00001,
						"close" : function() {
							$("#" + id).focus();
						}
					});
					return false;
				}
			} else if (type == "datetime") {
				var isValidate = true;

				if (!$(this).val().match(/[0-9]{4}[-][0-9]{2}[-][0-9]{2}[ ][0-9]{2}[:][0-9]{2}[:][0-9]{2}/)) {
					isValidate = false;
				} else {
					var dates = $(this).val().split(/[- :]/);
					if (Number(dates[1]) < 1 || Number(dates[1]) > 12 || Number(dates[2]) > 31
							|| Number(dates[3]) > 59 || Number(dates[4]) > 59 || Number(dates[5]) > 59) {
						isValidate = false;
					}
				}
				if (!isValidate) {
					$.alert({
						"content" : CMW00001,
						"close":function() {
							$("#" + id).focus();
						}
					});
					return false;
				}
			}
		});
	};

	/**
	 * Login Popup 화면 구성.
	 * Use : $.openLogin(openUrl, true or false, pageInit()에 넘겨줄 data);
	 */
	$.openUrl = "";
	$.reLoad;
	$.initData;
	$.openLogin = function(openUrl, reLoad, initData) {
		var content = "";
		content += "<div id='POPup'>";
		content += "  <div class='loginWrap'>";
		content += "    <div class='btn_close'><a href='#' id='btnLoginPopupClose'><img src='" + rootPath + "images/icon_close_login.png'></a></div>";
		content += "    <h5 class='login'><span>Login</span></h5>";
		content += "    <div class='loginbox'>";
		content += "      <fieldset id=''>";
		content += "        <legend>Log in</legend>";
		content += "        <div class='ui_postion_rel'>";
		content += "          <div class='icon'><img src='" + rootPath + "images/icon_login_id.png'></div>";
		content += "          <input type='text' id='loginId' class='ui-input-text2' placeholder='ID'>";
		content += "        </div>";
		content += "        <div class=' mgT15 ui_postion_rel'>";
		content += "          <div class='icon'><img src='" + rootPath + "images/icon_login_pw.png'></div>";
		content += "          <input type='text' id='loginPw' class='ui-input-text2' placeholder='PW'>";
		content += "        </div>";
		content += "      </fieldset>";
		content += "      <div class='login_btn_set mgT20' id='btnGoLogin'> <a href='#' class='ui_button'>Sign In</a></div>";
		content += "      <div class='id_save mgT10'><div class='savebox'><input type='checkbox' id='saveId' /></div>Auto Login</div>";
		content += "    </div>";
		content += "  </div>";
		content += "</div>";

		var divObject;
		if ($("#LoginPopUp").length < 1) {
			divObject = $("<div />").attr("id", "LoginPopUp");
		} else {
			divObject = $("#LoginPopUp");
			divObject.html("");
		}

		divObject.css({
			"left" : 0,
			"top" : 0,
			"width" : $(document).width(),
			"height" : $(document).height(),
			"position" : "absolute",
			"background-color" : "transparent",
			"z-index" : 9000
		});
		divObject.append($("<div />").css({
			"left" : 0,
			"top" : 0,
			"width" : "100%",
			"height" : $(document).height(),
			"position" : "absolute",
			"background-color" : "#000000",
			"opacity" : 0.6,
			"z-index" : 9001
		}));

		var contentDivTag = $("<div />").attr({"id":"Contents", "data-role":"content"});
		contentDivTag.css({
			"width" : $(document).width(),
			"left" : 0,
			"top" : $(document).scrollTop() + 5,
			"z-index" : 9002,
			"position" : "relative",
			"background-color" : "transparent"
		});
		contentDivTag.append(content + "<br />");
		divObject.append(contentDivTag);

		$("body").append(divObject);

		$("#btnGoLogin").click(function() {
			if ($("#loginId").val() == "" || $("#loginPw").val() == "") {
				alert(CMI00010);
				return false;
			}

			$.startLoading();

			$.openUrl = openUrl;
			$.reLoad = reLoad;
			$.initData = initData;
			$.request({
				"url" : domain + "/mhanjin/LoginGS.do",
				"callback" : "$.setLoginResult",
				"data" : {
					"f_cmd" : SEARCH,
					"usr_id" : $("#loginId").val(),
					"usr_pwd" : $("#loginPw").val()
				}
			});
		});

		$("#btnLoginPopupClose").click(function() {
			$("#LoginPopUp").remove();
		});
	};

	$.setLoginResult = function(data) {
		if (data.isSuccess == "S" && data.count > 0) {
			var userId = data.list[0].usrId;
			var userPw = "";
			if ($("#saveId").prop("checked") == true) {
				userPw = data.list[0].usrPwd;
			}

			var query = "UPDATE IHANJIN_INFO SET USER_ID = ?, USER_PW = ?";
			$.executeQuery({
				"query" : query,
				"type" : "U",
				"callback" : "",
				"data" : [userId, userPw]
			});

			if ($.reLoad != undefined && $.reLoad == true) {
				$.stopLoading();
				$("#LoginPopUp").remove();
				pageInit($.initData);
			} else {
				$.changePage({
					"url" : rootPath + $.openUrl,
					"data" : $.initData
				});
			}
		} else {
			$.stopLoading();
			alert(CMI00011);
		}
	};

	/**
	 * Server Session 정보 조회.
	 * Use : $.getUserInfo(callback);
	 */
	$.getUserInfo = function(callback) {
		$.request({
			"url" : domain + "/mhanjin/LoginGS.do",
			"callback" : callback,
			"data" : {
				"f_cmd" : 102
			}
		});
	};

	$.autoLogin = function(data) {
		if (data.count == 0) {
			$.executeQuery({
				"query" : "SELECT USER_ID, USER_PW FROM IHANJIN_INFO",
				"type" : "R",
				"callback" : "$.processLogin",
				"data" : []
			});
		}
	};

	$.processLogin = function(data) {
		if (data.isSuccess == "S") {
			if (data.list[0].user_id != "" && data.list[0].user_pw != "") {
				$.request({
					"url" : domain + "/mhanjin/LoginGS.do",
					"callback" : "$.pageReload",
					"data" : {
						"f_cmd" : 101,
						"usr_id" : data.list[0].user_id,
						"usr_pwd" : data.list[0].user_pw
					}
				});
			}
		}
	};

	$.pageReload = function(data) {
		location.reload();
	};

})(jQuery);

var checkDuplicationCallback;
var callbackFunction;
var callbackFunctionII;
var selectResultCallback;
var addBookMarkDoneCallback;

$(function() {
	// input box에서 clear button style을 위한 처리(디자이너 요청 사항)
	$("a").removeClass("ui-btn ui-btn-up-c ui-shadow ui-btn-corner-all ui-fullsize");

	var currentFileName = document.URL.substring(document.URL.lastIndexOf("/") + 1, document.URL.lastIndexOf("/") + 20);

	if (currentFileName == "sidemenu.html") {
		if (osType == "Android") {
			$.openNativePopup({"classname":"InitActivity"});
		}
	}

	if (currentFileName != "sidemenu.html") {
//		$.getUserInfo("$.autoLogin");
	}

	if( currentFileName != "sidemenu.html" && currentFileName != "index.html" ) {
		//var bm_html = "<div class='slidebtn'><img src='../../images/btn_slide_open.png' width='42px' height='48px' style='z-index:9999' id='slidebtn'></div>";
		//$("#HJ").append(bm_html);
		//var divHeight = $(window).height() * 0.85;
		//$("#slidebtn").css("top", divHeight);
	}

	$("body").on('click', "img[id^='slidebtn']", function(){
		$.openSideMenu();
	});
	/*
	if (currentFileName != "index.html" && currentFileName != "sidemenu.html") {
		var footerDiv = $("<div />").attr("id", "Footer");
		footerDiv.css({
			"bottom" : "0px",
			"list-style" : "none",
			"left" : "0px",
			"padding" : "0px",
			"margin" : "0px",
			"width" : "100%",
			"font-size" : "12px",
			"position" : "fixed"
		});
		footerDiv.append("<ul>");
		footerDiv.append("  <li><img src='" + rootPath + "images/icon_F_home.png' id='btnHome'/></li>");
		footerDiv.append("  <li><img src='" + rootPath + "images/icon_F_arrow_L.png' id='btnBackHistory'/></li>");
		footerDiv.append("  <li><img src='" + rootPath + "images/icon_F_arrow_R.png' id='btnForward'/></li>");
		footerDiv.append("  <li><img src='" + rootPath + "images/icon_F_favorite.png' id='btnBookmark'/></li>");
		footerDiv.append("  <li><img src='" + rootPath + "images/icon_F_multi.png' id='btnMultiViewer'/></li>");
		footerDiv.append("</ul>");
		$("#HJ").append("<br /><br />");
		$("#HJ").append(footerDiv);
	}
	*/
	//bookmark table 구조
	/*
	 * create table bookmark
	 * bm_name varchar(20),
	 * bm_url varchar(200);
	 * bm_order int
	 */
	//bookmark 추가
	var addBookmarkQuery = "insert into bookmark ( bm_idx, bm_name, bm_url, bm_order) values (?, ?, ?, ?)";

	//bookmark 삭제
	var delBookmarkQuery = "delete from bookmark where bm_idx = ?";

	//bookmark 수정
	var updateBookmarkQuery = "update bookmark set bm_order=? where bm_idx=?";

	//bookmark 가져오기 - R
	var getBookmarkQuery = "select bm_idx, bm_name, bm_url, bm_order from bookmark order by bm_order desc";

	//bookmark 인덱스 번호 가져오기 - RI
	var getIdxQuery = "select (ifnull(max(bm_idx),'0') || '') as bm_idx  from bookmark";

	//bookmark 마지막 순서 가져오기 - RO
	var getOrderQuery = "select (ifnull(max(bm_order),'0') || '') as bm_order from bookmark";

	//bookmark 마지막 순서 가져오기 - RO
	var getCountQuery = "select bm_name from bookmark";

	var _bm_name;
	var _bm_url;
	var _bm_idx;
	var _bm_order;

	$("#btnHome").bind('click', function() {
		$.jumpPage({
			"url" : rootPath + "index.html"
		});
	});

	$("#btnBackHistory").bind('click', function() {
		if(wmsCommonJS.isMainPage){
			wmsCommonJS.isMainPage();
			console.log("test2");
		}else{
			$.historyBack();
		}
	});

	$("#btnForward").bind('click', function() {
		$.historyForward();
	});

	//중복 book mark 존재여부 확인
	checkDuplicationCallback = function(data) {
		if( data.isSuccess == "S" ) {
			if( data.list[0].cnt == "0" ) {
				$.executeQuery({"query" : getIdxQuery,
					"type" : "R",
					"callback" : "callbackFunction",
					"data" : []
				});
			} else {
				$.alert({
					"content" : "동일한 Book Mark가 존재 합니다.",
					"close" : ""
				});
			}
		}
	}
	//bookmark가 중복되지 않으므로 idx를 가져옴
	callbackFunction = function(data) {
		if( data.isSuccess == "S" ){
			_bm_idx = data.list[0].bm_idx;
			_bm_idx = parseInt(_bm_idx)+1;

			$.executeQuery({"query" : getOrderQuery,
				"type" : "R",
				"callback" : "callbackFunctionII",
				"data" : []
			});
		} else {
			alert("idx ??");
		}
	}
	//bookmark가 중복되지 않으므로 order를 가져온 후 증가 시켜서 입력
	callbackFunctionII = function(data) {
		if( data.isSuccess == "S" ){
			_bm_order = data.list[0].bm_order;
			_bm_order = parseInt(_bm_order)+1;

			$.executeQuery({
				"query" : addBookmarkQuery,
				"type" : "I",
				"callback" : "addBookMarkDoneCallback",
				"data" : [
					_bm_idx,
					_bm_name,
					_bm_url,
					_bm_order
				]
			});
		} else {
			alert("order ??");
		}
	}

	addBookMarkDoneCallback = function(){
		$.alert({
			"content" : "등록을 완료하였습니다.",
			"close" : ""
		});
	}

	selectResultCallback = function(data) {

	}

	$("#btnBookmark").bind('click', function() {
		var idx = checkMenu( currentFileName );
		var idx_int = parseInt( idx );

		_bm_url = MENU_PATH[idx_int] + "/CUP_MOB_" + idx + "01.html";
		_bm_name = MENU_NAME[idx_int];
		$.executeQuery({"query" : "select count(bm_idx) as cnt from bookmark where bm_url=?",
			"type" : "R",
			"callback" : "checkDuplicationCallback",
			"data" : [_bm_url]
		});
		return false;
	});

	$("#btnMultiViewer").bind('click', function() {
        $.openMultiViewer();
	});


	var checkMenu = function( currNm ) {
		if( currNm.length < 1 ){
			return "";
		}
		var nm = currNm.substring(8, 10);
		return nm;
	}

	// Device Height 보다 작은 화면일 경우, 화면 최소 사이즈를 Device 높이에 맞춤.
	if ($("#HJ").height() + ", " + $(window).height()) {
		$("#HJ").css("min-height", $(window).height());
	}
});
