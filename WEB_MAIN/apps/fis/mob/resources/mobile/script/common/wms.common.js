var gv_pathname = location.pathname.split("/")[1];
var wmsCommonJS ={
	selectInput : null,
	mobileCheck : function(){
		var filter = "win16|win32|win64|mac";
		 
		if(navigator.platform){
			if(0 > filter.indexOf(navigator.platform.toLowerCase())){
				return false;
			}else{
				return false;
			}
		}
		return false;
	},
	goPage : function (url,data){
		if(wmsCommonJS.mobileCheck()){
			var addUrl = "http://"+location.host;
			$.changePage({"url":addUrl + "/"+ gv_pathname + "/" + url, "data":data});
		}else{
			$(location).attr('href', "/"+ gv_pathname + "/" + url);
		}
	},
	jumpPage : function(url){
		//var url = "/opusfwd/Main.clt"
		if(wmsCommonJS.mobileCheck()){
			var addUrl = "http://"+location.host;
			$.jumpPage({"url":addUrl+url});
		}else{
			$(location).attr('href', url);
		}
	},
	ajaxRes : function(rtnVal){
		var returnVal = false;
		var doc=getAjaxMsgXML(rtnVal);
		if(doc[0]=='OK'){
			if(typeof(doc[1])!='undefined'){
				if(doc[1] != "-1"){
					var arrData = JSON.parse(doc[1]);
					returnVal = arrData;
					return returnVal;
				}
			}
		}else{
			wmsCommonJS.wmsMobAlert({title : "Notice", content : "System error."})
			return false;
		}
	},
	logout : function(){
		ajaxSendPost(wmsCommonJS.mobLogout, 'reqVal', '&goWhere=aj&bcKey=mobLogout' , './GateServlet.gsl');
	},
	mobLogout : function(rtnVal){
		var returnVal = wmsCommonJS.ajaxRes(rtnVal)
		var url = "/"+location.pathname.split("/")[1]
		if(returnVal != false){
			if(returnVal.resultCode == "success"){
				wmsCommonJS.jumpPage(url + "/MobLogin.usr");
			} 
		}
	},
	historyBack : function(){
		wmsCommonJS.isMainPage();
	},
	isMainPage : function(){
		var re = /\/MobLogin.usr/ig;
		if(re.exec(document.referrer) != null){
			$.confirm({
				title: 'Logout?',
				content: 'Your time is out, you will be automatically logged out in 10 seconds.',
				autoClose: 'logoutUser|10000',
				draggable: true,
				theme: 'light',
				buttons: {
					logoutUser:{
						text: 'OK',
			            action: function () {
			            	wmsCommonJS.logout();
			            }
						
					},
					cancel: function () {
						//console.log("cancel");
					}
				}
			});
		}else{
			history.back(1);
		}
	},
	removeFormVal : function (obj) {
		$('#'+obj).val('');
	},
	selectCtrtCode : function () {
		ajaxSendPost(wmsCommonJS.setCtrtCode, 'reqVal', '&goWhere=aj&bcKey=selectMobCtrtList', './GateServlet.gsl');
	},
	setCtrtCode : function(rtnVal){
		var returnVal = wmsCommonJS.ajaxRes(rtnVal)
		if(returnVal != false){
			if(returnVal.resultCode == "success"){
				$.each(returnVal.ctrts,function(index, value){
					var selectVal = "";
					if(returnVal.userInfo.def_wh_ctrt_no == value.ctrtNo){
						selectVal = "selected";
					}
					$("#ctrtNo").append("<option value='"+value.ctrtNo+"' "+selectVal+">"+value.ctrtNm+"</option>");
				});
			}
		}
	},
	setBarCode : function(code){
		if(wmsCommonJS.selectInput!=null){
			wmsCommonJS.selectInput.val(code);
		}
	},
	numberWithCommas : function(num){
	    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	},
	
	// 입력값에서 콤마를 없앤다.
	removeComma : function(str) {
        return str.replace(/,/gi,"");
	},
	/*
	 * data 
	 * {
	 * 	title : alert 상단 제목
	 * 	content : 알림 내용 html태그도 허용 됨
	 * 	page : 이동할 페이지 명
	 * }
	 * ex 
	 * wmsCommonJS.wmsMobAlert({title : "Notice", content : "Complete", page : "MobWHInSrch.clt"})
	 * 
	 */
	wmsMobAlert : function(data){
		var title = (data.title != undefined) ? data.title : "Notice"
		$.confirm({
			title: title,
			content: data.content,
//			/draggable: true,
			buttons: {
				OK : function () {
					if(data.page){
						if(data.page == "back"){
							wmsCommonJS.historyBack();
						}else{
							$(location).attr('href', data.page);
						}
					}
					if(data.focus){
						data.focus.focus();
					}
				}
			}
		});
	},
	messageReplace : function(msg, values){
		var result = msg.match(/{/g);
		
		if(result.length != values.length){
			wmsCommonJS.wmsMobAlert("변경 할 문자와 대상의 갯수가 맞지 않습니다.");
		}
		
		$.each(result,function(index, value){
			msg = msg.replaceAll(value+index+'}', values[index]);
		});
		
		return msg;
		
	},

	//#2807 [BINEX WMS4.0] LOT04, LOT05 NICKNAME CUSTOMIZATION
	getCtrtLotAlias : function(){
		if($("#ctrtNo option:selected").val() != "" && $("#ctrtNo option:selected").val() != undefined) {
			ajaxSendPost(wmsCommonJS.setCtrtLotAlias, 'reqVal', '&goWhere=aj&bcKey=selectCtrtLotAlias&ctrt_no='+$("#ctrtNo option:selected").val(), './GateServlet.gsl');
		} else {
			ajaxSendPost(wmsCommonJS.setCtrtLotAlias, 'reqVal', '&goWhere=aj&bcKey=selectCtrtLotAlias&ctrt_no='+$("#ctrtNo option:eq(1)").val(), './GateServlet.gsl');
		}
	},
	setCtrtLotAlias : function(rtnVal){
		var returnVal = wmsCommonJS.ajaxRes(rtnVal);
		if(returnVal != false) {
			$("#lotAlias").val(returnVal);
		}
	}
}


/*
//2011년 09월 11일 오후 03시 45분 42초
console.log(new Date().format("yyyy년 MM월 dd일 a/p hh시 mm분 ss초"));
//2011-09-11
console.log(new Date().format("yyyy-MM-dd"));
//'11 09.11
console.log(new Date().format("'yy MM.dd"));
//2011-09-11 일요일
console.log(new Date().format("yyyy-MM-dd E"));
//현재년도 : 2011
console.log("현재년도 : " + new Date().format("yyyy"));* 
 */
Date.prototype.format = function(f) {
    if (!this.valueOf()) return " ";
 
    var weekName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var d = this;
     
    return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) {
        switch ($1) {
            case "yyyy": return d.getFullYear();
            case "yy": return (d.getFullYear() % 1000).zf(2);
            case "MM": return (d.getMonth() + 1).zf(2);
            case "dd": return d.getDate().zf(2);
            case "E": return weekName[d.getDay()];
            case "HH": return d.getHours().zf(2);
            case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
            case "mm": return d.getMinutes().zf(2);
            case "ss": return d.getSeconds().zf(2);
            case "a/p": return d.getHours() < 12 ? "AM" : "PM";
            default: return $1;
        }
    });
};
String.prototype.string = function(len){
	var s = '', i = 0; 
	while (i++ < len) {
		s += this; 
	} return s;
};
String.prototype.zf = function(len){
	return "".string(len - this.length) + this;
};
Number.prototype.zf = function(len){
	return this.toString().zf(len);
};

$(document).on("focus", ".number-only", function() {
	$(this).val("");
});
$(document).on("click", ".number-only", function() {
	$(this).val("");
});
$(document).on("blur", ".number-only",  function() {
	if($(this).val()=="")$(this).val(0);
});

$(document).on("keyup", ".keyup-event", function() {
	
	if($(this)[0].id == "rcvQty"){
		if(whIbDtlJS.selectUomData.length != undefined){
			var receivedQty = $(this)[0].value.replaceAll(",","");
			var uomQty = whIbDtlJS.selectUomData[0];
			$("#rcvTotalQty").val(Number(receivedQty) * Number(uomQty)).number(true);
		}
		
	}else if($(this)[0].id = "qty"){
		var qty = $(this)[0].value.replaceAll(",","");
		var uomQty = whibPtawyDltJS.selectUomData[0];
		$("#totalQty").val(Number(qty) * Number(uomQty)).number(true);
	}
});

$(document).on("focusin", "input:text[barCode]", function() {
	wmsCommonJS.selectInput = $(this);
});
