//var TEMPLAT_PGM_DESC='';  //#380 [CLT] Zendesk Help Guide 기능 - zE.SetHelpCenterSuggestions

/*  [강제 Style 적용] */
// Menu Level getting CallBack
function getMenuLevel(reqVal){
    var menuLvl='';
    var doc=getAjaxMsgXML(reqVal);
    if(doc[0]=='OK'){
        if(typeof(doc[1])!= 'undefined'){
            menuLvl=doc[1];
        }
    }
    // callback
    // Select Menu Level
    if(menuLvl == "" || menuLvl == "H"){
        $(".gnb_list > li > div").addClass("menu_horz");
        $("#menu_arco").attr("checked",false);
        $("#menu_horz").attr("checked",true);
    } else {
        $(".gnb_list > li > div").removeClass("menu_horz");
        $("#menu_arco").attr("checked",true);
        $("#menu_horz").attr("checked",false);
    }
}

// 메뉴선택 (아코디언형 / 가로펼침형)
$("[data-menu='arco']").bind(eventType_click ,function(){
    $(".gnb_list > li > div").removeClass("menu_horz");
});
$("[data-menu='horz']").bind(eventType_click ,function(){
    $(".gnb_list > li > div").addClass("menu_horz");
});

var boldYn='';

// Bold Y/N getting CallBack
function getBoldYn(reqVal){
    var doc=getAjaxMsgXML(reqVal);
    if(doc[0]=='OK'){
        if(typeof(doc[1])!= 'undefined'){
            boldYn=doc[1];
        }
    }

    if(boldYn == "Y"){
        $(".gnb_list > li > a").css("font-weight","bold");
        $("#bold_yes").attr("checked",true);
        $("#bold_no").attr("checked",false);
    } else {
        $(".gnb_list > li > a").css("font-weight","normal");
        $("#bold_yes").attr("checked",false);
        $("#bold_no").attr("checked",true);
    }
}

// Menu Level setting CallBack
function setMenuLevel(){
    // callback
}

// Bold Y/N setting CallBack
function setBoldYn(){
    // callback
}

// USer Theme getting CallBack
function getUserTheme(reqVal){
    var userTheme='';
    var doc=getAjaxMsgXML(reqVal);
    if(doc[0]=='OK'){
        if(typeof(doc[1])!= 'undefined'){
            userTheme=doc[1];
        }
    }
    // callback
    // Select USer Theme
    if(userTheme == "2"){
        $("#theme_default").attr("checked",false);
        $("#theme_blue").attr("checked",true);
        $("#theme").attr("href","style/css/theme_blue.css");
    } else {
        $("#theme_default").attr("checked",true);
        $("#theme_blue").attr("checked",false);
        $("#theme").attr("href","style/css/theme_default.css");
    }
}

// Menu Level setting CallBack
function setUserTheme(reqVal){
    var userTheme='';
    var doc=getAjaxMsgXML(reqVal);
    if(doc[0]=='OK'){
        if(typeof(doc[1])!= 'undefined'){
            userTheme=doc[1];
        }
    }
    // callback
    // Set USer Theme
    if(userTheme == "2"){
        $("#theme").attr("href","style/css/theme_blue.css");
    } else {
        $("#theme").attr("href","style/css/theme_default.css");
    }
}


//Log Monitor Start
var logMonitorFlag = "N"; //Log Monitor Y/N
function gLogMonitor(){
	//#5281 [Binex] change password error
	return;
}
//Log Monitor End

//Log Monitor Start:Btn
function gLogMonitorBtnClick(arg){
	//#5281 [Binex] change password error
	return;
}
//Log Monitor End:Btn
//OFVFOUR-7768: [NUEL EXPRESS] MISSING SOME OF THE BUTTONS WHEN OPENING OEH B/L ENTRY SCREEN
document.addEventListener("DOMContentLoaded", function(event) {
    if(self != top) {
        $(".header_fixed").hide();
        // $(".header_fixed").css("display", "none");
    }
    //#653 [common] unexpected opreation on menu    1depth menu hide 처리...
    $(".gnb_list").stop().animate({
        width:$(".gnb_list").outerWidth()
    },250);

    if(document.frm1!= undefined || document.frm1!= null){
        axon_event.addListenerFormat('keyup', 'ComEditFormating', document.frm1);   //for CNTR
    }
    if(document.form!= undefined || document.form!= null){
        axon_event.addListenerFormat('keyup', 'ComEditFormating', document.form);   //for CNTR
    }
    //axon_event.addListenerPreset('keyup', 'ComPresetFormating', document.form);   //for BULK
    ajaxSendPost(getMenuLevel, 'reqVal', '&goWhere=aj&bcKey=getMenuLevel&f_userId=' + userInfo.usrId , './GateServlet.gsl');
    ajaxSendPost(getBoldYn, 'reqVal', '&goWhere=aj&bcKey=getBoldYn&f_userId=' + userInfo.usrId , './GateServlet.gsl');

    var page_ui_id = document.URL.substring(document.URL.indexOf("opusfwd")+"opusfwd".length+1,document.URL.indexOf(".clt"));
    var params = "&ofc_cd=" + userInfo.ofcCd;
    +"&ui_id=" + page_ui_id
    +"&com_id="+"DOU";

    // commonSearchOptionConfig(params);

    // #535: [SBS] 다국어 처리 V1.0
    // 언어 설정별 좌측 메뉴 틀어지는 현상 수정
    // system option에서 설정된 언어별 css값을 설정
    ajax_Send_css_opt_minWidth_Value();
    ajax_Send_css_opt_fontSize_Value();

    // 버튼 생성에 필요한 데이터.
    if(typeof(pgm_id)!='undefined'){
        ajaxSendPost(selectProgramButton, 'reqVal', '&goWhere=aj&bcKey=selectProgramButton&pgmId='+pgm_id+'&url='+location.pathname.split("/")[2]+'&role=' + userInfo.roleCd +'&search='+encodeURIComponent(location.search) , './GateServlet.gsl');
    }else{
        ajaxSendPost(selectProgramButton, 'reqVal', '&goWhere=aj&bcKey=selectProgramButton&url='+location.pathname.split("/")[2]+'&role=' + userInfo.roleCd +'&search='+encodeURIComponent(location.search) , './GateServlet.gsl');
    }
    //OFVFOUR-7768: [NUEL EXPRESS] MISSING SOME OF THE BUTTONS WHEN OPENING OEH B/L ENTRY SCREEN
    if(typeof btnLoad == 'function'){
    	btnLoad();
    }
});

function selectProgramButton(rtnVal){
    var doc=getAjaxMsgXML(rtnVal);
    //IE에서 버튼 생성 전 setupPage 호출로 인한 에러 때문에브라우저 분기 처리 함(IE는 버튼 생성 후 SetupPage함수 호출됨)
    if(navigator.userAgent.toLowerCase().indexOf('trident') > -1){//ie
    	if(doc[0]=='OK'){
            if(typeof(doc[1])!='undefined'){
                if(doc[1] != "-1"){
                    var arrData = JSON.parse(doc[1]);
                    setActionButton(arrData);
                }else{
                	if( typeof setupPage == 'function' ) {setupPage();}
                }
            }else{
            	if( typeof setupPage == 'function' ) {setupPage();}
            }
        }else{
        	if( typeof setupPage == 'function' ) {setupPage();}
        }
    }else{//other
    	if(doc[0]=='OK'){
	        if(typeof(doc[1])!='undefined'){
	            if(doc[1] != "-1"){
	                var arrData = JSON.parse(doc[1]);
	                setActionButton(arrData);
	            }
	        }
	    }
    }
    
}

function setActionButton(arrData){
//console.time("setActionButton Time");
    makeDiv.makeHtml(arrData);
//console.timeEnd("setActionButton Time");    
    //IE에서 버튼 생성 전 setupPage 호출로 인한 에러 때문에브라우저 분기 처리 함(IE는 버튼 생성 후 SetupPage함수 호출됨)
    if(navigator.userAgent.toLowerCase().indexOf('trident') > -1){
    	if( typeof setupPage == 'function' ) {setupPage();}
    }
}

var makeDiv = {
	temp0 : $('<div class="buttonAear"></<div>'),
	temp1 : $('<div class="dropdown"></<div>'),
	temp2 : $('<div onclick="myFunction();" class="dropbtn btn_normal"></<div>'),
	temp3 : $('<div name="myDropdown" class="dropdown-content"></<div>'),
	makeHtml :function (data){
		var that = this;
		var groupButton=[];
		var groupButton1=[];
		var buttonAear = that.temp0.clone();
		var buttonGroupText;
		var dropdown;
		var buttonGroupObj;
		$.each(data,function(index, value){
			if(value.btn_grp){
				groupButton1.push(value.btn_grp.trim());
			}
		});

		$.each(data,function(index, value){
			if(index == 0){
				$("."+value.btn_pos).html("");
			}
			var btn_grp_nm = "";
			if(value.btn_grp){
				btn_grp_nm = value.btn_grp.trim();
			}
			var grp_cnt = groupButton1.filter(function(value){return (value == btn_grp_nm)}).length;

			// 초기 disp를 3가지로 구분 ( init_disp  'Y' , 'N', 'R' )
			var display = "display : none";

			if(value.init_disp == 'Y' || (value.init_disp == 'R' && value.role_btn_yn == 'Y')){
				display = "display : ";
			}

			//-----------------------------------------------------

			var cssClss;
			if(value.css_clss){
				cssClss = value.css_clss.toLowerCase();
			}else{
				if(value.pb_css_clss){
					cssClss = value.pb_css_clss.toLowerCase();
				}else{
					cssClss = "";
				}
			}
			var actionOnClick="";
			if(value.btn_actin != ""){
				actionOnClick = 'onclick="'+value.btn_actin+'"';
			}
			if(grp_cnt > 1 && btn_grp_nm != ""){
				if($.inArray(btn_grp_nm, groupButton) == -1){
					dropdown = that.temp1.clone();
					buttonGroupText = that.temp3.clone();
					buttonGroupText.addClass(value.css_clss.toLowerCase());

					buttonGroupObj = $('<button type="button" class="'+cssClss+'" '+ display +' id="'+value.btn_id+'"  '+actionOnClick+'>'+value.btn_key+'</button>'+'<span onclick="myFunction('+groupButton.length+');" class="dropbtn '+cssClss+' drop_small">▼</<span>');
					groupButton.push(btn_grp_nm);
					dropdown.append(buttonGroupObj);
				}else{
					var butonObj = '<li id="'+value.btn_id+'" '+actionOnClick+' href="javascript:void(0);">'+value.btn_key+'</li>';
					buttonGroupText.append(butonObj);
					dropdown.append(buttonGroupText);
					buttonAear.append(dropdown);
				}
			}else{
				var butonObj = '';

				// Must Be Button이 Role에 등록되지 않은 경우는 화면에 절대 출력이 안되도록 수정
				if (value.init_disp == 'N' && value.role_btn_yn != 'Y') {
					butonObj = '<span style="display:none;"><button type="button" class="'+cssClss+'" style="'+ display +'"  id="'+value.btn_id+'" '+actionOnClick+'>'+value.btn_key+'</button></span>';
				} else {
					butonObj = '<button type="button" class="'+cssClss+'" style="'+ display +'"  id="'+value.btn_id+'" '+actionOnClick+'>'+value.btn_key+'</button>';
				}

				buttonAear.append(butonObj)
			}
			$("."+value.btn_pos).append(buttonAear);
		});

	}
}

function myFunction(idx) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if(idx == i){
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }else{
                    document.getElementsByName("myDropdown")[idx].classList.toggle("show");
                }

            }else{
                openDropdown.classList.remove('show');
            }
    }

}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
    /*
        * 2016-12-29 IE에서 오류가 발생하여 수정함
        */
    matches = event.target.matches ? event.target.matches('.dropbtn') : event.target.msMatchesSelector('.dropbtn');
    if (!matches){
//      if (!event.target.matches('.dropbtn')) {
        groupButtonRemove();
    }
}

function groupButtonRemove(){
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
        }else{

        }
    }
}

function findTabByUrl(value, index, array) {
    if(value.content_iframe_url == this) return true;
}

function mkNewFrame(val1, val2, tabId){
    if(val2 != null && val2 != undefined){
        if (tabId == null || tabId == undefined) {
            // window.open(val2);
        	openPageTab(val2, val1);
            return;
        }
        if (openedTabs[tabId]) {
            var tab = openedTabs[tabId];
            try{
                if (navigator.appName.indexOf("Netscape") != -1
                        && tab.history.length > 0) {
                    tab.focus();
                }else{
                	openPageTab(val2, val1);
                }
            }catch (e) {
            	openPageTab(val2, val1);
            }
        } else {
        	if(window[_MTAB] != undefined) {
	            var itmIdx = window[_MTAB].aTabItemList.findIndex(findTabByUrl, val2);
	        	openPageTab(val2, val1, itmIdx);
        	} else {
        		parent.openPageTab(val2, val1);
        	}
        }
    }
}

var helpPopHeight= 318;
var shortCutpopHeight= 354;
if(navigator.appName.indexOf("Microsoft") != -1 || navigator.userAgent.indexOf("Firefox") != -1) {
    helpPopHeight = 322;
    shortCutpopHeight = 359;
} else if (navigator.vendor.indexOf("Apple") != -1) {
    helpPopHeight = 218;
    shortCutpopHeight = 254;
}

function openHelpPopUp() {
    window.open('./HelpPage.html','','location=no, directories=no, resizable=no, status=no, toolbar=no, menubar=no, width=500, height='+helpPopHeight+', left=100, top=100, scrollbars=no');
}

function doLogout(){
    document.frmLogOut.submit();
}

function refreshBookmark(){
    document.getElementById("ifbookmark").src="viewBookmark.screen";
}

function commonSearchOptionConfig(params){
    ajaxSendPost(commonSearchOptionConfigCallBack, 'reqVal', '&goWhere=aj&bcKey=commonSearchOptionConfig'+params, './GateServlet.gsl');
}

function commonSearchOptionConfigCallBack(rtnVal){
    var doc=getAjaxMsgXML(rtnVal);

    if(doc[0]=='OK'){
        if(typeof(doc[1])!='undefined'){
            if(doc[1] != "-1"){
                var arrData = JSON.parse(doc[1]);

                var type = "";

                for( i = 0 ; i < arrData.data.length; i++){

                        var key_cd = arrData.data[i].key_cd;
                        var tp_cd = arrData.data[i].tp_cd;
                        var cs_cd = arrData.data[i].cs_cd;
                        var dflt_val = arrData.data[i].dflt_val;
                        var attr = arrData.data[i].attr;
                        var strDate = arrData.data[i].date;

                        switch(tp_cd){
                        case "LBL":
                            type = "label";

                            $("#" + key_cd).text(dflt_val);

                            if(attr != "" && attr !=  "RO"){
                                $("#"+key_cd).hide();
                            }
                            break;

                        case "TXT":
                            type = "input";

                            $("input[name='" + key_cd + "']").val(dflt_val);
                            break;

                        case "DT":
                            type = "input";

                            $("input[name='" + key_cd + "']").val(strDate);
                            break;

                        case "CHK":
                            type = "input";

                            $("input[name='" + key_cd + "']").prop("checked", (dflt_val.toUpperCase() == "T" ? true : false));
                            break;

                        case "CHKA":
                            type = "input";

                            $("input[name='" + key_cd + "']").each(function(index){

                                $(this).prop("checked", (dflt_val[index].toUpperCase() == "T" ? true : false));
                            });
                            break;

                        case "RB":
                            type = "input";

                            $("input[name='" + key_cd + "']").each(function(index){
                                if(index == dflt_val){
                                    $(this).prop("checked", true);
                                }
                            });
                            break;

                        case "SLT":
                            type = "select";

                            $("select[name='" + key_cd + "']").val(dflt_val);

                            break;

                        case "HDN":
                            type = "hidden";
                            $("input[name='" + key_cd + "']").val(dflt_val);
                            break;
                        }

                        if(attr != "" && type != "hidden" && type != "label" ){
                            if(attr == "RO"){
                                $(type + "[name='" + key_cd + "']"). prop('readonly', true);
                            }else{
                                $(type + "[name='" + key_cd + "']").hide();
                            }
                        }
                    }
            }
        }
    }
}

// Vinh.Vo 2015/01/15 (E)
var ZENDESK_SET_TIMEOUT  = "500";

function click_help(){
    setZendeskSetTimeout();
    if($("#helpCenterForm").val() == undefined){
        setHelpPage();
        setTimeout(function(){
            open_help();
        },ZENDESK_SET_TIMEOUT);
    }else{
        open_help();
    }
}

function setZendeskSetTimeout(){
    var opt_key = "ZENDESK_SET_TIMEOUT";
    ajaxSendPost(setZendeskSetTimeoutReq, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
}
function setZendeskSetTimeoutReq(reqVal){
    var doc=getAjaxMsgXML(reqVal);
    if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined) {
        ZENDESK_SET_TIMEOUT = doc[1];
    }
}

function open_help(){
    if(navigator.appName.match(/Explorer/i)){ // I.E 버젼이 9.0, 8.0, 7.0 일 경우에는 기존체제 유지
        if(navigator.appVersion.match(/MSIE \d+.\d+/)[0].split(" ")[1] == '9.0' ||
            navigator.appVersion.match(/MSIE \d+.\d+/)[0].split(" ")[1] == '8.0' ||
            navigator.appVersion.match(/MSIE \d+.\d+/)[0].split(" ")[1] == '7.0'){
            //기존 체제 유지
            openHelpPopUp();
        }else{
            //Zen desk호출
            //zE.hide();
            zE.activate({hideOnClose: true});
        }
    }else{
        //Zen desk호출
        //zE.hide();
        zE.activate({hideOnClose: true});
    }
}

// #535: [SBS] 다국어 처리 V1.0 2차
// 언어 설정별 좌측 메뉴 틀어지는 현상 수정
// system option에서 설정된 언어별 css값을 설정
// MIN_WIDTH설정
function ajax_Send_css_opt_minWidth_Value(){
    var opt_key = "CSS_MENU_MIN_WIDTH_" + userInfo.langCd;
    ajaxSendPost(setSend_css_opt_minWidth_Value, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
}

var leftMenuCss = 177;
function setSend_css_opt_minWidth_Value(reqVal){
    var formObj=document.frm1;
    var doc = getAjaxMsgXML(reqVal);
    if (doc[0] == "OK" && doc[1]!= undefined ) { //DB 에서 option data가 잘 들어가 있는 경우
        if (doc[1] != "") {
            leftMenuCss = doc[1];
            var iGnbList = document.getElementById("i_gnb_list");
            iGnbList.style.minWidth = leftMenuCss + "px";
        }
    }
}

// 폰트 사이즈 설정
function ajax_Send_css_opt_fontSize_Value(){
    var opt_key = "CSS_MENU_FONT_SIZE_" + userInfo.langCd;
    ajaxSendPost(setSend_css_opt_fontSize_Value, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
}

var leftMenuFontSize = 13;
function setSend_css_opt_fontSize_Value(reqVal){
    var formObj=document.frm1;
    var doc = getAjaxMsgXML(reqVal);
    if (doc[0] == "OK" && doc[1]!= undefined ) { //DB 에서 option data가 잘 들어가 있는 경우
        if (doc[1] != "") {
            leftMenuFontSize = doc[1];
            $(".gnb_list li a").css('font-size', leftMenuFontSize + "px");
        }
    }
}

function setHelpPage(){
	//#3627 [CLT] Tab 적용 후 Toolbar 기능 오류 - 활성화 된 탭의 TEMPLAT_PGM_DESC 할당하도록 변경
	TEMPLAT_PGM_DESC = window[_MTAB].GetTabIframe(window[_MTAB].GetSelectedIndex()).contentWindow.TEMPLAT_PGM_DESC;
	
    window.zEmbed || function(e,t){
        var n,o,d,i,s,a=[], r=document.createElement("iframe");
        window.zEmbed = function(){
            a.push(arguments)
        },

        window.zE = window.zE || window.zEmbed, r.src = "javascript:false", r.title = "", r.role = "presentation", (r.frameElement || r).style.cssText = "display: none",
        d = document.getElementsByTagName("script"), d = d[d.length-1], d.parentNode.insertBefore(r,d), i = r.contentWindow, s = i.document;

        try{
            o = s
        }catch(c){
            n = document.domain,
            r.src = 'javascript: var d = document.open(); d.domain = "' + n + '"; void(0);',
            o = s
        }

        o.open()._l = function(){
            var o = this.createElement("script");
            n && (this.domain = n),
            o.id = "js-iframe-async",
            o.src = e,
            this.t =+ new Date,
            this.zendeskHost = t,
            this.zEQueue = a,
            this.body.appendChild(o)
        },

        o.write('<body onload = "document._l();">'),
        o.close()

    }("//assets.zendesk.com/embeddable_framework/main.js","cyberlogitec.zendesk.com");

    zE(function() {
        zE.hide();
        zE.setLocale('en');
        zE.identify({
            name: helpDesk.name,
            email: helpDesk.email,
            organization: helpDesk.organization
        });
        zE.setHelpCenterSuggestions({ url: true });
        zE.setHelpCenterSuggestions({ search: TEMPLAT_PGM_DESC });
        //zE.setHelpCenterSuggestions({ search: 'search' });
    });
}
var favoriteLoad = false;
function click_favorite(){
    if(!favoriteLoad) {
        refreshBookmark();
        favoriteLoad= true;
    }
}

var ONLINE_MANUAL_URL = "";
function setOnlineManualUrl(){
    var opt_key = "ONLINE_MANUAL_URL";
    ajaxSendPost(setOnlineManualUrlReq, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
}
function setOnlineManualUrlReq(reqVal){
    var doc=getAjaxMsgXML(reqVal);
    if (doc[0]=="OK" && doc[1]!="undefined" && doc[1]!=undefined) {
        ONLINE_MANUAL_URL = doc[1];
    }
}

// 온라인메뉴얼 사이트 링크
function help_url(reqVal){
    setOnlineManualUrl();

	//#3627 [CLT] Tab 적용 후 Toolbar 기능 오류 - 활성화 된 탭의 pgm_id 할당하도록 변경
    pgm_id = window[_MTAB].GetTabIframe(window[_MTAB].GetSelectedIndex()).contentWindow.pgm_id;
    
    if(pgm_id != null && pgm_id != ""){
        window.open(ONLINE_MANUAL_URL+"#"+pgm_id);
    }else{
        window.open(ONLINE_MANUAL_URL);
    }

}

//#2060 : [ACROWELL] ACROWELL LOGO
$(function() {
    checkOptCompName();
});

function checkOptCompName(){
    var opt_key = "COMPANY_NAME";
    ajaxSendPost(setSend_check_opt_Value, "reqVal", "&goWhere=aj&bcKey=searchSysOpt&opt_key="+opt_key, "./GateServlet.gsl");
}

function setSend_check_opt_Value(reqVal){
	var doc = getAjaxMsgXML(reqVal);
	if (doc[0] == "OK" && doc[1]!= undefined ) {
		$("#_comp_name").append(" for " + doc[1]);
	}
}