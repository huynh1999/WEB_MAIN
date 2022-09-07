<%--
=========================================================
*Copyright(c) 2008 CyberLogitec. All Rights Reserved.
=========================================================

=========================================================
*@FileName   : CLTHeader.jsp
*@FileTitle  : AªA³AμA­A?Aμ A­A?A¤A≪A?A?A­A?A?A￢A?A¼
*@Description: AªA³AμA­A?Aμ A­A?A¤A≪A?A?A­A?A?A￢A?A¼
*@author     : Kang,Jung-Gu - Cyberlogitec
*@version    : 1.0 - 08/28/2008
*@since      : 08/28/2008

*@Change history:
=========================================================
--%>
<%@ page language="java" pageEncoding="UTF-8"%>
<%@ page import="com.clt.apps.opusbase.utils.LoginUserUtil,com.clt.apps.opusbase.login.dto.UserInfoVO"%>
<%@ page import="java.util.ArrayList,com.clt.apps.opusbase.system.role.dto.RoleBtnVO"%>
<%@ page import="com.clt.apps.opusbase.main.dto.NaviVo,com.clt.apps.opusbase.utils.NaviInfo"%>

<%@ taglib uri="struts-bean"  prefix="bean"%>
<%@ taglib uri="struts-html"  prefix="html"%>
<%@ taglib uri="struts-logic" prefix="logic"%>
<%@ taglib uri="clt-rowset"   prefix="clt"%>
<%@ taglib uri="clt-writer"   prefix="wrt"%>

<!-- CLTH S -->
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
<script src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/FMS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
<script src="<%=CLT_PATH%>/syscommon/script/CLTHeaderTab.js?ver=<%=CLT_JS_VER%>"></script>
<script>
var UserLangCd = '<%=userInfo.getUse_lang_cd()%>';
var UserOfcCd  = '<%=userInfo.getOfc_cd()%>';
var APP_PATH = '<%=CLT_PATH%>'; 
var ofcFlg = "<%=userInfo.getOfc_flg()%>";
var Def_wh_ctrt_no = "<%=userInfo.getDef_wh_ctrt_no()%>";
var Def_wh_ctrt_nm = "<%=userInfo.getDef_wh_ctrt_nm()%>";
var Def_wh_cd = "<%=userInfo.getDef_wh_cd()%>";
var Def_wh_nm = "<%=userInfo.getDef_wh_nm()%>";
var Def_ofc_curr_cd = "<%=userInfo.getOfc_curr_cd()%>";
var LOCAL_CD = "<%=CLT_MSG_PATH%>";
var MULTI_LANGUAGE = '<%=userInfo.getMulti_language()%>'; 

//#2927 [LOA WMS4.0] ITEM CBM CALCULATION (S)
//- CBM, CBF 의 자리수는 기본적으로 소수점 3자리이지만 TB_SYS_PROP의 "WMS_CBM_POINT_COUNT" 에 정의한 값을 사용키로 함.
var WMS_CBM_POINT_COUNT = '<%=(String)application.getAttribute("WMS_CBM_POINT_COUNT") == null ? "3" : (String)application.getAttribute("WMS_CBM_POINT_COUNT")%>';
//#2927 [LOA WMS4.0] ITEM CBM CALCULATION (E)

$(document).ready(function(){
    $("form:not(.filter) :input:visible:enabled:first").focus();

    $('textarea').each(function(index, item) {
        item.onfocus = function() {
            window.setTimeout(function() {
                moveCaretToEnd(item);
            }, 1);
        };
    });

    $('textarea[maxlength]').bind('keyup change', function() {
        var str = $(this).val();
        var mx = parseInt($(this).attr('maxlength'));

        if (str.length > mx) {
            $(this).val(str.substr(0, mx));
            return false;
        }
    });
});

$(window).resize(function() {
    if (!ComFuncCheck("resizeSheet")) return;
    if(this.resizing) {
        clearTimeout(this.resizing);
    }
    this.resizing = setTimeout(function() {
        resizeSheet();
    }, 220);
});
</script>
<% } %>
<!-- CLTH E -->
