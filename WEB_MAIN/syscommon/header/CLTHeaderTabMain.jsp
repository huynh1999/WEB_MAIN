<%--
=========================================================
*Copyright(c) 2008 CyberLogitec. All Rights Reserved.
=========================================================

=========================================================
*@FileName   : CLTHeaderTabMain.jsp
*@FileTitle  : AªA³AμA­A?Aμ A­A?A¤A≪A?A?A­A?A?A￢A?A¼
*@Description: AªA³AμA­A?Aμ A­A?A¤A≪A?A?A­A?A?A￢A?A¼
*@author     : Kang,Jung-Gu - Cyberlogitec
*@version    : 1.0 - 08/28/2008
*@since      : 08/28/2008

*@Change history:
=========================================================
--%>
<%@ page import="com.clt.apps.opusbase.utils.LoginUserUtil,com.clt.apps.opusbase.login.dto.UserInfoVO"%>
<%@ page import="java.util.ArrayList,com.clt.apps.opusbase.system.role.dto.RoleBtnVO"%>
<%@ page import="com.clt.apps.opusbase.main.dto.NaviVo,com.clt.apps.opusbase.utils.NaviInfo"%>

<%@ taglib uri="struts-bean"  prefix="bean"%>
<%@ taglib uri="struts-html"  prefix="html"%>
<%@ taglib uri="struts-logic" prefix="logic"%>
<%@ taglib uri="clt-rowset"   prefix="clt"%>
<%@ taglib uri="clt-writer"   prefix="wrt"%>

<!-- CLTHT S -->
<%@include file="./CLTWebAppGblVarTab.jsp"%>
<%  
naviVo = NaviInfo.getNaviInfo(pageUrl, CLT_MSG_PATH);

if(naviVo != null){
	LEV1_NM = 	naviVo.getLev1_nm();
	LEV2_NM = 	naviVo.getLev2_nm();
	LEV3_NM = 	naviVo.getLev3_nm();
	PGM_ID  =   naviVo.getPgm_id();
	PGM_DESC = naviVo.getPgm_desc(); //#380 [CLT] Zendesk Help Guide 기능 - zE.SetHelpCenterSuggestions
}

if(userInfo != null){ %>
<script src="<%=CLT_PATH%>/js/common/shortcut.js?ver=<%=CLT_JS_VER%>"></script>
<script src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/message.js?ver=<%=CLT_JS_VER%>"></script>
<script>
var UserLangCd = '<%=userInfo.getUse_lang_cd()%>';
var UserOfcCd  = '<%=userInfo.getOfc_cd()%>';
var APP_PATH = '<%=CLT_PATH%>'; 
var ofcFlg = "<%=userInfo.getOfc_flg()%>";
var LOCAL_CD = "<%=CLT_MSG_PATH%>";
var MULTI_LANGUAGE = '<%=userInfo.getMulti_language()%>'; 
var POPUP_FULL_SCREEN = '<%=userInfo.getPopup_full_screen()%>'; 
</script>
<% } %>
<!-- CLTHT E -->
