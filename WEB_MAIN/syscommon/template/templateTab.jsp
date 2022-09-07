<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib uri="/WEB-INF/tld/template.tld" prefix="template"%>
<%@page import="java.util.Map"%>
<%@page import="com.clt.apps.opusbase.system.menu.dto.MenuTreeVO"%>
<%@page import="com.clt.syscommon.response.CommonEventResponse"%>
<!DOCTYPE html>
<%
	//IE에서 버튼 생성 전 setupPage 호출로 인한 에러 때문에브라우저 분기 처리 함(IE는 버튼 생성 후 SetupPage함수 호출됨)
	String ieFlg ="N";
	if(request.getHeader("User-Agent").toLowerCase().indexOf("trident") >-1){ieFlg ="Y";}
%>
<html>
<head>
<meta charset="UTF-8" />
<META HTTP-EQUIV="Pragma" CONTENT="no-cache">
<META HTTP-EQUIV="Expires" CONTENT="0">
<!-- Mobile meta tag(S) -->
<meta name="viewport" id="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">
<script>
if(navigator.userAgent.toLowerCase().indexOf('android') > -1)
    document.getElementById('viewport').setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, target-densityDpi=medium-dpi');
</script>
<meta name="format-detection" content="telephone=no" />
<!-- Mobile meta tag(E) -->
<title><%="".equals(LEV3_NM)?"OPUS Logistics":LEV3_NM%></title>
<link rel="shortcut icon" href="<%=CLT_PATH%>/favicon_fwd.ico" type="image/x-icon">
<link id="theme" value="default" href="style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css">

<script src="./js/common/jquery-3.2.1.min.js"></script>
<script src="./js/common/CoBizCommon.js?ver=<%=CLT_JS_VER%>"></script>
<script src="./js/common/CoMessage.js?ver=<%=CLT_JS_VER%>"></script>
<script src="./js/common/CoCommon.js?ver=<%=CLT_JS_VER%>"></script>
<script src="./js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
<script src="./js/common/CoAxon.js?ver=<%=CLT_JS_VER%>"></script>
<script src="./js/common/CoFormControl.js?ver=<%=CLT_JS_VER%>"></script>
<script src="./js/common/CoBizCommonOpus.js?ver=<%=CLT_JS_VER%>"></script>
<script src="style/js/opus_ui.js?ver=<%=CLT_JS_VER%>"></script>
<script src="./js/context/jquery.contextMenu.min.js"></script>
<link rel="stylesheet" href="./js/context/jquery.contextMenu.css" type="text/css" media="screen">
<link rel="stylesheet" href="./js/context/font-awesome.min.css">
<script src="./js/ibsheet/ibleaders.js?ver=<%=CLT_JS_VER%>" ></script>
<script src="./js/ibmditab/ibmditab.js?ver=<%=CLT_JS_VER%>"></script>
<script src="./js/ibmditab/ibmditabinfo.js?ver=<%=CLT_JS_VER%>"></script>
<script src="./syscommon/script/template.js?ver=<%=CLT_JS_VER%>"></script>

<%@include file="./../../../../../syscommon/header/CLTTemplateHeaderTab.jsp"%>

<!-- Vinh.Vo 2015/01/15 (S)  -->
<script>
var userInfo = {
    usrId: "<%=userInfo.getUsrid()%>",
    ofcCd: "<%=userInfo.getOfc_cd()%>",
    roleCd: "<%=userInfo.getRole_cd()%>",
    langCd: "<%=userInfo.getUse_lang_cd()%>"
};
    
var helpDesk = {
    name: '<%=userInfo.getUser_name().replaceAll("'","")+"@"+userInfo.getOfc_locl_nm().replaceAll("'","")%>',
    email: '<%=userInfo.getEml().replaceAll("'","")%>', 
    organization: '<%=userInfo.getDept_nm().replaceAll("'","")%>'
};

var pgm_id = "<%=PGM_ID%>";

function click_support(){
    window.open('<bean:message bundle="SysPageComment" key="message.admin.homePage"/>');
}

var webSocket;  
function openSocket(){
    if(webSocket !== undefined && webSocket.readyState !== WebSocket.CLOSED){
        // writeResponse("WebSocket is already opened.");
        return;
    }
        
    webSocket = new WebSocket("ws://" + window.location.host + "/opusfwd/websocketendpoint");

    webSocket.onopen = function(event){
        console.log("Connection open");
        if(event.data === undefined)
            return;

        // writeResponse(event.data);
    };

    webSocket.onmessage = function(event){
        // writeResponse(event.data);
    };

    webSocket.onclose = function(event){
        writeResponse("Connection has been closed.<br> Another user may have logged by your ID");
    };
}

function writeResponse(text){
    console.log(text);
    // $("#logout_notification").fadeIn("slow").append(text);
}

$(function(){
    if(userInfo.usrId != "cltmaster") {
        openSocket();
    }
});
</script>
</head>
<!-- templateTab.jsp -->
<body onload="<%="Y".equals(ieFlg)?"":"setupPage();"%>">
    <input type='hidden' id='prm_seq' name='prm_seq' value="<%=roleBtnVO != null ? roleBtnVO.getPgm_mnu_seq() : ""%>">
    <input type='hidden' id='prm_nm' name='prm_nm' value="<%=LEV3_NM%>">

    <!-- HEADER_FIXED0 (top fixed area) -->
    <div class="header_fixed">
        <!-- util_bar : 상단 로고영역(바) -->
        <div class="util_bar">
            <button type="button" class="btn_gnb_hide ir" data-gnbbtn="on">Global navigation bar show/hide<span data-gnbbtn="on"></span></button>
            <h1 id="_company" class='logo ir'>OPUS LogisticsA:TM</h1>
            <div id="_comp_name" style="position : fixed; left: 150px; padding: 5px 25px;"></div>

            <div class="util_contents">
                <div class="user_info_div">
                    <span class="user_info"><span>NAME</span><%=userInfo.getUser_name()%></span><!-- 
                 --><span class="user_info"><span>ID</span><%=userInfo.getUsrid()%></span><!-- 
                 --><span class="user_info"><span>OFFICE</span><%=userInfo.getOfc_locl_nm()%></span>
                </div>
                
                <div class="util_btns"> 
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
            </div>
            <!-- util_contents(E) -->
                
            <!-- preferences(S) -->
            <div class="preferences">
                <h2>Preferences</h2>
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
                    <li><a href="./rpt/CX60u_OCX_setup.exe">Report Designer Install File For I/E</a></li>
                </ul>
                <!-- Download(E) -->
            </div>
            <!-- preferences(E) -->
                
            <!-- favorite_links(S) -->
            <div class="favorite_links">
                <iframe id="ifbookmark" style="width:100%; height:650px;"></iframe>
            </div>
            <!-- favorite_links(E) -->
            
            <!-- shortcut_links(S) -->
            <div class="shortcut">
                <!-- title area S -->
                <h2>Shortcut Keys</h2>
                <span class="sub_text">Using shortcut keys allows efficiency, multitasking, complementary, and precision with your operation.</span>
                <!-- title area E -->
                
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
                            <li class="key">Alt</li>
                            <li class="plus">+</li>
                            <li class="keyadd">C</li>
                            <li class="keyname">Close Tab</li>
                        </ul>
                        <ul class="keyline">
                            <li class="key">Alt</li>
                            <li class="plus">+</li>
                            <li class="keyadd">6</li>
                            <li class="keyname">Close Popup</li>
                        </ul>   
                        <ul class="keyline">
                            <li class="key">Ctrl</li>
                            <li class="plus">+</li>
                            <li class="keyadd">1</li>
                            <li class="keyname">Move to next Tab</li>
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
                            <li class="key">Alt</li>
                            <li class="plus">+</li>
                            <li class="keyadd">5</li>
                            <li class="keyname">Create House B/L</li>
                        </ul>        
                        <!-- OFVFOUR-7601 [BNX] Adding new function onto A/R and DC Entry screen -->
                        <ul class="keyline">
                            <li class="key_none"></li>
                            <li class="plus"></li>
                            <li class="keyadd">F9</li>
                            <li class="keyname">Open House B/L List</li>
                        </ul>
                    </div>
                </div>              
                <!--// shortcontents area E -->
            </div>
            <!-- shortcut_links(E) -->
            
        </div>
        <!-- //util_bar -->
    </div>
    <!-- //HEADER_FIXED0 (top fixed area) -->
    <!-- GNB (Global Navigation Bar) : (S) -->
    <div class="gnb_wrap">
        <!-- gnb_2dpeth(S) -->
        <div class="gnb_2dpeth">
            <!-- Menu 3 Level(S) -->
            <ul class="gnb_list" id="i_gnb_list">
<%@include file="./../../../../../syscommon/FullMenu.jsp"%>
            </ul>
            <!-- Menu 3 Level(E) -->
        </div>
        <!-- gnb_2dpeth(E) -->
    </div>
    <!-- GNB (Global Navigation Bar) : (E) -->
    
    <div class="tab_wrap">
        <input type="hidden" id="userId" value="<%=userInfo.getUsrid()%>">
<!-- body insert(S) -->
        <template:insert parameter="body" />
<!-- body insert(E) -->
    </div>

    <!--div id="logout_notification" style="display: none"></div-->
    <form method="post" name="frmLogOut" id="frmLogOut" action="LogOut.usr"></form>
</body>
</html>