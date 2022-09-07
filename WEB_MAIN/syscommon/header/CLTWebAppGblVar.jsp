<%--
=========================================================
*Copyright(c) 2008 CyberLogitec. All Rights Reserved.
=========================================================

=========================================================
*@FileName   : CLTWebAppGblVar.jsp
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

//#2047 [Fulltrans][LAX] [CLA+LBS] OPUS // Fulltrans LAX - Shanghai Operation Check Needed
String LOGIN_PAGE_LINK_URL = "%E6%B2%AAICP%E5%A4%8716003048%E5%8F%B7-1";
String LOGIN_PAGE_LINK_VAL = "http://www.miitbeian.gov.cn";
%>

<%
CLT_PATH = request.getContextPath();
%>

<script type="text/javascript">
var WMS_OTHER_CHAR_JS  = "[_-+/().# ]";                 // IBSheet
var WMS_OTHER_CHAR_JS_SCRIPT = "_\\-+/().\\# ";         // Script
var WMS_OTHER_CHAR_JS_REGEXP = /[0-9a-zA-Z()_\-+./# ]/; // 정규식
var _MTAB = "IbTabM";
</script>
