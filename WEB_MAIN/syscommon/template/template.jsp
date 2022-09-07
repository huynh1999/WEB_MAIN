<!DOCTYPE html>
<html     lang="en">
<%  
//LHK 20150417, Cache 사용하지 않도록 추가
response.setHeader("Cache-Control","no-store");   
response.setHeader("Pragma","no-cache");   
response.setDateHeader("Expires",0);   
if (request.getProtocol().equals("HTTP/1.1")) 
        response.setHeader("Cache-Control", "no-cache"); 
%>
<%@ taglib uri="/WEB-INF/tld/template.tld" prefix="template"%>
<%@ page contentType="text/html;charset=UTF-8"%>
<%@page import="com.clt.apps.opusbase.system.menu.dto.MenuTreeVO"%>
<%@page import="java.util.ArrayList"%>
<%@page import="java.util.Map"%>
<%@page import="com.clt.syscommon.response.CommonEventResponse"%>
<%@page import="com.clt.apps.opusbase.utils.LoginUserUtil,com.clt.apps.opusbase.login.dto.UserInfoVO"%>
<head>
<%@include file="./../../../../../syscommon/header/CLTTemplateHeader.jsp"%>
<META HTTP-EQUIV="Pragma" CONTENT="no-cache">
<META HTTP-EQUIV="Expires" CONTENT="0">
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
<title><%="".equals(LEV3_NM)?"Home":LEV3_NM%></title>
<link rel="shortcut icon" href="<%=CLT_PATH%>/favicon_fwd.ico" type="image/x-icon">
<link id="theme" value="default" href="style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css">
<!--[if IE]>
<link rel="stylesheet" type="text/css" href="style/css/IECC.css" />
<![endif]-->
<script src="./js/ibsheet/ibleaders.js?ver=<%=CLT_JS_VER%>" ></script>
<script src="./js/ibsheet/ibsheet.js?ver=<%=CLT_JS_VER%>" TYPE="text/javascript"></script>
<script src="./js/common/IBSheetInfo.js?ver=<%=CLT_JS_VER%>" TYPE="text/javascript"></script>
<script src="./js/common/IBSheetConfig.js?ver=<%=CLT_JS_VER%>" TYPE="text/javascript"></script>
<script src="./js/common/CoBizCommon.js?ver=<%=CLT_JS_VER%>" TYPE="text/javascript"></script>
<script src="./js/common/CoMessage.js?ver=<%=CLT_JS_VER%>" TYPE="text/javascript"></script>
<script src="./js/common/CoCommon.js?ver=<%=CLT_JS_VER%>" TYPE="text/javascript"></script>
<script src="./js/common/CoFormControl.js?ver=<%=CLT_JS_VER%>" TYPE="text/javascript"></script>
<script src="./js/common/ajax_util.js?ver=<%=CLT_JS_VER%>" TYPE="text/javascript"></script>
<script src="./js/common/jquery-3.2.1.min.js" type="text/javascript"></script>
<script src="<%=CLT_PATH%>/js/common/jquery-ui/jquery-ui.min.js"></script>
<script src="style/js/opus_ui.js?ver=<%=CLT_JS_VER%>"></script>
<script src="js/common/CoAxon.js?ver=<%=CLT_JS_VER%>"></script>
<script src="./js/common/CoBizCommonOpus.js?ver=<%=CLT_JS_VER%>" TYPE="text/javascript"></script>
<script type="text/javascript">
    var TEMPLAT_PGM_DESC='';  //#380 [CLT] Zendesk Help Guide 기능 - zE.SetHelpCenterSuggestions
    
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
    //#5281 [Binex] change password error:remove
    //Log Monitor End:Btn
</script>

<script type="text/javascript">
    $(document).ready(function() {
        
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
        ajaxSendPost(getMenuLevel, 'reqVal', '&goWhere=aj&bcKey=getMenuLevel&f_userId=<%=userInfo.getUsrid()%>' , './GateServlet.gsl');
        ajaxSendPost(getBoldYn, 'reqVal', '&goWhere=aj&bcKey=getBoldYn&f_userId=<%=userInfo.getUsrid()%>' , './GateServlet.gsl');

        var page_ui_id = document.URL.substring(document.URL.indexOf("opusfwd")+"opusfwd".length+1,document.URL.indexOf(".clt"));
        var params = "&ofc_cd=" + "<%=userInfo.getOfc_cd()%>"
        +"&ui_id=" + page_ui_id
        +"&com_id="+"DOU";
        
        commonSearchOptionConfig(params);
        
        // #535: [SBS] 다국어 처리 V1.0 
        // 언어 설정별 좌측 메뉴 틀어지는 현상 수정 
        // system option에서 설정된 언어별 css값을 설정
        ajax_Send_css_opt_minWidth_Value();
        ajax_Send_css_opt_fontSize_Value();
        
        // 버튼 생성에 필요한 데이터.
        if(typeof(pgm_id)!='undefined'){ 
            ajaxSendPost(selectProgramButton, 'reqVal', '&goWhere=aj&bcKey=selectProgramButton&pgmId='+pgm_id+'&url='+location.pathname.split("/")[2]+'&role=<%=userInfo.getRole_cd()%>&search='+encodeURIComponent(location.search) , './GateServlet.gsl');
        }else{
            ajaxSendPost(selectProgramButton, 'reqVal', '&goWhere=aj&bcKey=selectProgramButton&url='+location.pathname.split("/")[2]+'&role=<%=userInfo.getRole_cd()%>&search='+encodeURIComponent(location.search) , './GateServlet.gsl');
        }
    });

    function selectProgramButton(rtnVal){
        var doc=getAjaxMsgXML(rtnVal);
        
        if(doc[0]=='OK'){
            if(typeof(doc[1])!='undefined'){
                if(doc[1] != "-1"){
                    var arrData = JSON.parse(doc[1]);
                    setActionButton(arrData);
                }
            }
        }
    }
    function setActionButton(arrData){
        makeDiv.makeHtml(arrData);
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
    function mkNewFrame(val1, val2, tabId){
        if(val2 != null && val2 != undefined){
            if (tabId == null || tabId == undefined) {
                window.open(val2);
                return;
            }
            if (openedTabs[tabId]) {
                var tab = openedTabs[tabId];
                try{
                    if (navigator.appName.indexOf("Netscape") != -1 
                            && tab.history.length > 0) {
                        tab.focus();
                    }else{
                        tab = window.open(val2, '_blank');
                        openedTabs[tabId] = tab;
                    }
                }catch (e) {
                    tab = window.open(val2, '_blank');
                    openedTabs[tabId] = tab;
                }
            } else {
                var tab = window.open(val2, '_blank');
                openedTabs[tabId] = tab;
            }
        }
    }
    //@ sourceURL=template.js
</script>
<script>
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
        
</script>
<!-- Vinh.Vo 2015/01/15 (S)  -->
<script type="text/javascript">

    <%-- var page_ui_id = document.URL.substring(document.URL.indexOf("opusfwd")+"opusfwd".length+1,document.URL.indexOf(".clt"));
    var params = "&ofc_cd=" + "<%=userInfo.getOfc_cd()%>"
    +"&ui_id=" + page_ui_id
    +"&com_id="+"DOU";
    
    commonSearchOptionConfig(params); --%>


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
</script>
<!-- Vinh.Vo 2015/01/15 (E)  -->
<script>
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
        var opt_key = "CSS_MENU_MIN_WIDTH_";
        var sUseLangCd = "<%=userInfo.getUse_lang_cd()%>";
        opt_key = opt_key + sUseLangCd;
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
        var opt_key = "CSS_MENU_FONT_SIZE_";
        var sUseLangCd = "<%=userInfo.getUse_lang_cd()%>";
        opt_key = opt_key + sUseLangCd;
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
        <% 
        UserInfoVO userForHelpDesk = null;
        userForHelpDesk = LoginUserUtil.getUserInfo(request);
        %>
        zE(function() {
            zE.hide();
            zE.setLocale('en');
            zE.identify({
                name: '<%=userForHelpDesk.getUser_name().replaceAll("'","")+"@"+userForHelpDesk.getOfc_locl_nm().replaceAll("'","")%>',  // ? Login 사용자 Local Name + “@” + Company name on office code 
                email: '<%=userForHelpDesk.getEml().replaceAll("'","")%>',  //? Login 사용자 e-mail
                organization: '<%=userForHelpDesk.getDept_nm().replaceAll("'","")%>'//<- Login 사용자 department
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
                
        var pgm_id = "<%=PGM_ID%>" ;
        if(pgm_id != null && pgm_id != ""){
            window.open(ONLINE_MANUAL_URL+"#"+pgm_id);
        }else{
            window.open(ONLINE_MANUAL_URL);
        }
        
    }
    
    function click_support(){
        window.open( '<bean:message bundle="SysPageComment" key="message.admin.homePage"/>');
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
</script>

</head>

<body onload="setupPage()">
    <input type='hidden' id='prm_seq' name='prm_seq' value="<%=roleBtnVO != null ? roleBtnVO.getPgm_mnu_seq() : ""%>">
    <input type='hidden' id='prm_nm' name='prm_nm' value="<%=LEV3_NM%>">
    
    <!-- This obj is for Button Contorl, must not be deleted. jipark 2017.11.23 -->
    <input type='hidden' id='hiddenButton' name='hiddenButton'>

    <!-- HEADER_FIXED (top fixed area) -->
    <div class="header_fixed">
        <!-- util_bar : 상단 로고영역(바) -->
        <div class="util_bar">
            <%
                String wmsUseVer = (String)application.getAttribute("WMS_USE_VER");
                if(wmsUseVer == null){wmsUseVer = "";}
            %>
            <%-- <h1 class='<%="VER3.0".equals(wmsUseVer) || "".equals(wmsUseVer)?"logo":"logo4_5"%> ir'>OPUS Logistics:TM</h1> --%>
            <h1 id="_company" class='logo ir'>OPUS Logistics:TM</h1>
            <div id="_comp_name" style="position : fixed; left: 150px;"></div>

            <!-- util_contents(S) -->
            <div class="util_contents">
                <!-- user_info_div(S) -->
                <div class="user_info_div">
                    <span class="user_info"><span>NAME</span><%=userInfo.getUser_name()%></span><!-- 
                 --><span class="user_info"><span>ID</span><%=userInfo.getUsrid()%></span><!-- 
                 --><span class="user_info"><span>OFFICE</span><%=userInfo.getOfc_locl_nm()%></span>
                </div>
                <!-- user_info_div(E) -->
                
                <!-- layout_change(S) -->
                <div class="layout_change">
                    <button type="button" class="layout_default now_layout"><span></span></button>
                    <button type="button" class="layout_hide"><span></span></button>
                </div>
                <!-- layout_change(E) -->
                <!-- util_btns(S) -->
                <div class="util_btns"> 
                    <!-- <button type="button" class="util_help ir" onclick="openHelpPopUp()"><span>Help</span></button> -->
                    <button type="button" class="util_help ir" onclick="click_help();"><span>Help</span></button>
                    <button type="button" class="util_online ir" onclick="help_url();"><span>online manual</span></button> 
                    <button type="button" class="util_support ir" onclick="click_support();"><span>support</span></button>         
                    <button type="button" class="util_keyboard ir"><span>keyboard</span></button>               
                    <button type="button" class="util_fav ir" onclick="click_favorite();"><span>Favorite link</span></button> 
                    <button type="button" class="util_setting ir"><span>Preferences</span></button>
                </div>
                <div class="util_btns"> 
                    <button type="button" class="util_logout ir" onclick="doLogout();"><span>logout</span></button>                 
                </div>
                <!-- util_btns(E) -->
            </div>
            <!-- util_contents(E) -->
                
            <!-- preferences(S) -->
            <div class="preferences">
                <h2>Preferences</h2>
                <!-- theme(S) -->
                <!-- 
                <h3>Themes</h3>
                <ul>
                    <li>
                        <input type="radio" id="theme_default" name="theme" />
                        <label for="theme_default">Theme White</label>
                    </li>
                    <li>
                        <input type="radio" id="theme_blue" name="theme" />
                        <label for="theme_blue">Theme Blue</label>
                    </li>
                </ul>
                 -->
                <!-- theme(E) -->
                <!-- Menu(S) -->
                <h3>Menu</h3>
                <div>
                    <ul>
                        <li>
                            <input type="radio" id="menu_arco" name="menu_level" data-menu="arco" checked="checked" />
                            <label for="menu_arco">Arccodion Menu</label>
                        </li>
                        <li>
                            <input type="radio" id="menu_horz" name="menu_level" data-menu="horz" />
                            <label for="menu_horz">Horizontal Menu</label>
                        </li>
                    </ul>
                    <!-- <input type="checkbox" id="new_links_chk" checked="checked" />
                    <label for="new_links_chk">Open menu links in new tab</label> -->
                </div>
                <!-- Menu(E) -->
                <!-- Bold Y/N(S) -->
                <h3>Bold (Top Menu & Grid Data)</h3>
                <ul>
                    <li>
                        <input type="radio" id="bold_yes" name="bold_yn" data-menu="yes" checked="checked" />
                        <label for="bold_yes">Yes</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <input type="radio" id="bold_no" name="bold_yn" data-menu="no" />
                        <label for="bold_no">No</label>
                    </li>
                </ul>
                <!-- Bold Y/N(E) -->
                <!-- Download(S) -->
                <h3>Download Report Designer Installer</h3>
                <ul>
                    <li>
                        <a href="./rpt/CX60u_OCX_setup.exe">Report Designer Install File For I/E</a>
                    </li>
                </ul>
                <!-- Download(E) -->
            </div>
            <!-- preferences(E) -->
                
            <!-- favorite_links(S) -->
            <div class="favorite_links">
                <iframe id="ifbookmark" style="width:100%; height:650px;"></iframe>
                <!-- favorites(E) -->
            </div>
            <!-- favorite_links(E) -->
            
            <!-- shortcut_links(S) -->
            <div class="shortcut">
                <!-- title area S -->
                <h2>Shortcut Keys</h2>
                <span class="sub_text">Using shortcut keys allows efficiency, multitasking, complementary, and precision with your operation.</span>
                <!--// title area E -->
                
                <!-- shortcontents area S -->    
                <div class="shortcut_contents">
                    <div class="shortcut_area01">
                        <h3 class="title_design">Basic Shortcut Keys</h3>
                        <ul class="keyline">
                            <li class="key">Alt</li>
                            <li class="plus">+</li>
                            <li class="keyadd">1</li>                           
                            <li class="keyimage"><button class="btn_tmp2">Print</button></li>
                        </ul>
                        <ul class="keyline">
                            <li class="key">Alt</li>
                            <li class="plus">+</li>
                            <li class="keyadd">2</li>                           
                            <li class="keyimage"><button class="btn_tmp2">Copy</button></li>
                        </ul>
                        <ul class="keyline">
                            <li class="key">Alt</li>
                            <li class="plus">+</li>
                            <li class="keyadd">Q</li>                           
                            <li class="keyimage"><button class="btn_tmp2">Save</button></li>
                        </ul>
                        <ul class="keyline">
                            <li class="key">Alt</li>
                            <li class="plus">+</li>
                            <li class="keyadd">W</li>                           
                            <li class="keyimage"><button class="btn_tmp2">New</button></li>
                        </ul>
                        <ul class="keyline">
                            <li class="key">Alt</li>
                            <li class="plus">+</li>
                            <li class="keyadd">F1</li>                          
                            <li class="keyimage"><button class="btn_tmp2">Search</button></li>
                        </ul>
                        <ul class="keyline">
                            <li class="key">Ctrl</li>
                            <li class="plus">+</li>
                            <li class="keyadd">Q</li>
                            <li class="keyname">Save and Close Tab</li>
                        </ul>
                        <ul class="keyline">
                            <li class="key">Ctrl</li>
                            <li class="plus">+</li>
                            <li class="keyadd">W</li>
                            <li class="keyname">Close Tab</li>
                        </ul>
                        <ul class="keyline">
                            <li class="key">Alt</li>
                            <li class="plus">+</li>
                            <li class="keyadd">6</li>
                            <li class="keyname">Close Popup</li>
                        </ul>   
                    </div>
                    <div class="shortcut_area02">
                        <h3 class="title_design">Other Shortcut Keys</h3>
                        <ul class="keyline">
                            <li class="key_none"></li>
                            <li class="plus"></li>
                            <li class="keyadd">F2</li>
                            <li class="keyname">Opens AR/AP<br/>Invoice List</li>
                            <li class="keyimage"><button class="btn_tmp2">Accounting</button></li>
                        </ul>
                        <ul class="keyline">
                            <li class="key_none"></li>
                            <li class="plus"></li>
                            <li class="keyadd">F8</li>
                            <li class="keyname">Switches between <br />Master and House List</li>
                        </ul>
                        <ul class="keyline">
                            <li class="key">Ctrl</li>
                            <li class="plus">+</li>
                            <li class="keyadd">1</li>
                            <li class="keyname">Switch back to the <br />First Tab</li>
                        </ul>    
                        <ul class="keyline">
                            <li class="key">Alt</li>
                            <li class="plus">+</li>
                            <li class="keyadd">5</li>
                            <li class="keyname">Create House B/L</li>
                        </ul>        
                    </div>
                </div>              
                <!--// shortcontents area E -->
            </div>
            <!-- shortcut_links(E) -->
            
        </div>
        <!-- //util_bar -->
    </div>
    <!-- //HEADER_FIXED (top fixed area) -->
    <%
        //To get GNB Data.
        HttpSession httpSession = request.getSession();
        CommonEventResponse commonEventResponse = (CommonEventResponse) httpSession.getAttribute("menuResponse");
        Map<String, ArrayList<MenuTreeVO>> menuMap = commonEventResponse.getMapVal();

        ArrayList<MenuTreeVO> topMenuList = menuMap.get("TOPMENU");
        ArrayList<MenuTreeVO> subMenuList = menuMap.get("SUBMENU");
        ArrayList<MenuTreeVO> pgmMenuList = menuMap.get("PGMMENU");
        ArrayList<MenuTreeVO> myPgmList = menuMap.get("MYPGM");

    %>
    <!-- GNB (Global Navigation Bar) : (S) -->
    <button type="button" class="btn_gnb_hide ir" data-gnbbtn="on">Global navigation bar show/hide<span data-gnbbtn="on"></span></button>
    <div class="gnb_wrap">
        <!-- gnb_2dpeth (S) -->
        <div class="gnb_2dpeth">
            <!-- <strong id="gnb_2depth_name">FORWARDING</strong> -->
            
            <!-- Menu 3 Level(S) -->
            <ul class="gnb_list" id="i_gnb_list" >
                <%
                    for (MenuTreeVO topMenuTreeVO : topMenuList) {
                        String topDisplaySequence = topMenuTreeVO.getDispSeq();
                        
                        //[Menu 사라지는 문제]
                        //out.print("<iframe id='temp' style='z-index: -1; filter:alpha(opacity=0); border: 1px solid; left:0px; top:0px; position:absolute;height:500px;width:1000px; background-color: #303030''>");
                        
                        out.print("<li><a id='" + topMenuTreeVO.getDispSeq() + "'" + " index='" + topMenuTreeVO.getDispIndex() + "'>" + topMenuTreeVO.getDispName() + "</a>");
                        out.print("<div>");
                        out.print("<ul>");
                        int i = 0;
                        for (MenuTreeVO subMenuTreeVO : subMenuList) {
                            if (topDisplaySequence.equals(subMenuTreeVO.getL1seq())) {
                                out.print("<li><a>" + subMenuTreeVO.getDispName() + "</a>");
                                out.print("<div><ul>");
                                String subDisplaySequence = subMenuTreeVO.getDispSeq();
                                for (MenuTreeVO pgmMenuTreeVO : pgmMenuList) {
                                    if (subDisplaySequence.equals(pgmMenuTreeVO.getL2seq())) {
                                        
                                        //out.print("<li><a href=\"" + pgmMenuTreeVO.getPgmURL() + "\" target=\"" + (i++ % 2 == 0 ? "_blank" : "_self") + "\">" + pgmMenuTreeVO.getPgmName() + "</a></li>"); // Hard Code
                                        out.print("<li><a href=\"" + pgmMenuTreeVO.getPgmURL() + "\" target=\"" + (!pgmMenuTreeVO.isReLoadTab() ? "_blank" : "_self") + "\">" + pgmMenuTreeVO.getPgmName() + "</a></li>"); // Real code
                                        
                                    }
                                }
                                out.print("</ul></div>");
                                out.print("</li>");
                            }
                        }
                        out.print("</ul>");
                        out.print("</div>");
                        out.print("</li>");
                        
                        //out.print("</iframe>");
                        
                    }
                %>
            </ul>
            <!-- Menu 3 Level(E) -->
        </div>
        <!-- gnb_2dpeth (E) -->
    </div>
    <!-- GNB (Global Navigation Bar) : (E) -->
    
    <div class="wrap">
    <input type="hidden" id="userId" value="<%=userInfo.getUsrid()%>">
    <template:insert parameter="body" />
    </div>
    <!--  Working Image  -->
    <div id="WORKING_IMG" style="position: fixed;left: 0; right: 0; bottom: 0; top: 0;z-index: 1000;display: none;" valign="middle" align="center">
        <iframe src='<%=CLT_PATH%>/js/common/wait.html' scrolling='no' frameborder='0' style="position: absolute;top: 50%;left: 40%;"></iframe>
    </div>
    <!--  Complete Image  -->
    <div id="COMPLETE_IMG" style="position:fixed;display:none; filter:alpha(opacity = 100); width:280px;height:60px;top:50%;left:50%;margin:-30px 0 0 -140px;z-index:999">
        <iframe src='<%=CLT_PATH%>/js/common/completed.html' scrolling='no'  style='margin-top: 0px; width:100%; height: 60px;'></iframe>
    </div>
    <!--  from for acction logout  -->
    <form method="post" name="frmLogOut" id="frmLogOut" action="LogOut.usr"></form>
    
</body>
</html>