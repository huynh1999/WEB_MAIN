<%--
=========================================================
*Copyright(c) 2008 CyberLogitec. All Rights Reserved.
=========================================================

=========================================================
*@FileName   : CLTWebAppGblVarTab.jsp
*@FileTitle  : Web Application Global Variables
*@Description: Web Application Global Variables
*@author     : Jigun, Oh - Cyberlogitec
*@version    : 1.0 - 02/20/2017
*@since      : 02/20/2017

*@Change history:
=========================================================
--%>

<%! 
String CLT_PATH = "";  
String CLT_MSG_PATH = ""; 
String CLT_JS_VER = "v4.7.0.10_01"; 
String MULTI_LANGUAGE = ""; 
String MULTI_IMEMODE = "ime-mode:disabled;";
String POPUP_FULL_SCREEN = "N";

String LEV1_NM = "";
String LEV2_NM = "";
String LEV3_NM = "";
String PGM_ID = "";
String PGM_DESC = ""; //#380 [CLT] Zendesk Help Guide 기능 - zE.SetHelpCenterSuggestions

//#1811 [WMS4.0]Item Code 특수문자 허용
//String WMS_OTHER_CHAR = "()_\\-+.&/\\@\\#\\!\\%\\^\\*\\$\\~\\` ";
String WMS_OTHER_CHAR = "_\\-+/().\\# ";

//#4862 [Binex] Filing No. 에 & 들어가면 발생하는 문제
//입력 제외 특수문자 처리 변수 otherchar 
String FWD_OTHER_CHAR = "&'+";

//#2047 [Fulltrans][LAX] [CLA+LBS] OPUS // Fulltrans LAX - Shanghai Operation Check Needed
String LOGIN_PAGE_LINK_URL = "%E6%B2%AAICP%E5%A4%8716003048%E5%8F%B7-1";
String LOGIN_PAGE_LINK_VAL = "http://www.miitbeian.gov.cn";
UserInfoVO userInfo = null;
RoleBtnVO roleBtnVO = null;
NaviVo naviVo = null;
String pageUrl = null;
%>
<%
CLT_PATH = request.getContextPath();
userInfo = LoginUserUtil.getUserInfo(request);
CLT_MSG_PATH = userInfo.getUse_lang_cd();
roleBtnVO = (RoleBtnVO)request.getAttribute("roleBtnVO");
POPUP_FULL_SCREEN = userInfo.getPopup_full_screen();
pageUrl = (String)request.getAttribute("requestURL");	
if(pageUrl != null){
	if (pageUrl.lastIndexOf("/") > 0 && pageUrl.length() > pageUrl.lastIndexOf("/")+1) {
		pageUrl = pageUrl.substring( pageUrl.lastIndexOf("/")+1 );
	}
}
%>
