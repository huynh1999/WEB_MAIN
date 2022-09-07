<%--
=========================================================
*Copyright(c) 2008 CyberLogitec. All Rights Reserved.
=========================================================

=========================================================
*@FileName   : MainTab.jsp
*@FileTitle  : 메인 Tab 화면
*@Description: Tab 메인 페이지
*@author     : ignos - Cyberlogitec
*@version    : 1.0 - 12/01/2017
*@since      : 12/01/2017

*@Change history:
=========================================================
--%>
<%@include file="./../../../../syscommon/header/CLTHeaderTabMain.jsp"%>
<script src="<%=CLT_PATH%>/apps/opusbase/main/script/MainTab.js?ver=<%=CLT_JS_VER%>"></script>

<script>
function setupPage(){
    loadPage();
    openTab();
}

function openTab() {
    var pageUrl = "<%= request.getParameter("pageUrl") %>";
    if(pageUrl != "null") {
        window[_MTAB].DeleteItem(0, true);
        addTabItem(pageUrl, "<%= request.getParameter("tabTitle") %>");
    }
}
</script>

        <div class="opus_design_tab">
            <script type="text/javascript">ComTabObjectIB(_MTAB)</script>
        </div>
