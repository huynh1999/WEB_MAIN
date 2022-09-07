<%--
=========================================================
*Copyright(c) 2008 CyberLogitec. All Rights Reserved.
=========================================================

=========================================================
*@FileName   : CLTMobHeader.jsp
*@FileTitle  : 
*@Description: 
*@author     : 
*@version    : 
*@since      : 

*@Change history:
=========================================================
--%>
<%@ page import="com.clt.apps.opusbase.utils.LoginUserUtil,com.clt.apps.opusbase.login.dto.UserInfoVO"%>
<%@ page import="com.clt.apps.opusbase.main.dto.NaviVo,com.clt.apps.opusbase.utils.NaviInfo"%>


<%@include file="./CLTWebAppGblVar.jsp"%>


<%  
	CLT_PATH = request.getContextPath();
	UserInfoVO userInfo = null;
	
	NaviVo naviVo = null; 
	
	String pageUrl = (String)request.getAttribute("requestURL");	
	if(pageUrl != null){
		if (pageUrl.lastIndexOf("/") > 0 && pageUrl.length() > pageUrl.lastIndexOf("/")+1) {
			pageUrl = pageUrl.substring( pageUrl.lastIndexOf("/")+1 );
		}
	}
	
	try{
		userInfo = LoginUserUtil.getUserInfo(request);
		CLT_MSG_PATH = userInfo.getUse_lang_cd();
		MULTI_LANGUAGE = userInfo.getMulti_language();
		if ("Y".equals(MULTI_LANGUAGE)){
			MULTI_IMEMODE = "ime-mode:auto;";
		}
		// #535: [SBS] 다국어 처리 V1.0 
		naviVo = NaviInfo.getNaviInfo(pageUrl, CLT_MSG_PATH);
		if(naviVo != null){
			LEV1_NM = 	naviVo.getLev1_nm();
			LEV2_NM = 	naviVo.getLev2_nm();
			LEV3_NM = 	naviVo.getLev3_nm();
			PGM_ID = naviVo.getPgm_id();
		}				
	}catch(Exception exc){
	}  
	
%>

<script language="javascript">
	var UserLangCd = '<%=userInfo.getUse_lang_cd()%>';
	var UserOfcCd  = '<%=userInfo.getOfc_cd()%>';
	var APP_PATH = '<%=CLT_PATH%>'; 
	var ofcFlg = "<%=userInfo.getOfc_flg()%>";
	var Def_wh_ctrt_no = "<%=userInfo.getDef_wh_ctrt_no()%>";
	var Def_wh_ctrt_nm = "<%=userInfo.getDef_wh_ctrt_nm()%>";
	var Def_wh_cd = "<%=userInfo.getDef_wh_cd()%>";
	var Def_wh_nm = "<%=userInfo.getDef_wh_nm()%>";
	var Def_ofc_curr_cd = "<%=userInfo.getOfc_curr_cd()%>";
	var LOCAL_CD = '<%=CLT_MSG_PATH%>';
	var MULTI_LANGUAGE = '<%=MULTI_LANGUAGE%>'; 
	var pgm_id = '<%=PGM_ID%>';
</script>
	


