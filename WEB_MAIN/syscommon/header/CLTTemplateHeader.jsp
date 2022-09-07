<%--
=========================================================
*Copyright(c) 2008 CyberLogitec. All Rights Reserved.
=========================================================

=========================================================
*@FileName   : CLTTemplateHeader.jsp
*@FileTitle  :
*@Description: 
*@author     : OJG
*@version    : 1.0 - 07/17/2014
*@since      :  07/17/2014

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
<%@include file="./CLTWebAppGblVar.jsp"%>
<%  
	UserInfoVO userInfo = null;
	
	//2012.11.27 Lee Hae Kyoung 
	NaviVo naviVo = null; 
	CLT_PATH = request.getContextPath();
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
		POPUP_FULL_SCREEN = userInfo.getPopup_full_screen();
		// #535: [SBS] 다국어 처리 V1.0 
		naviVo = NaviInfo.getNaviInfo(pageUrl, CLT_MSG_PATH);
		if(naviVo != null){
			LEV1_NM = 	naviVo.getLev1_nm();
			LEV2_NM = 	naviVo.getLev2_nm();
			LEV3_NM = 	naviVo.getLev3_nm();
			PGM_ID  =   naviVo.getPgm_id();
		}				
	}catch(Exception exc){
	}
%>
	<% if(userInfo==null){ %>
		<script>location.href='./NoSession.clt';</script>
    <% }else{ %>
		<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/message.js?ver=<%=CLT_JS_VER%>"></script>
		<script language="javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/FMS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
		<script src="<%=CLT_PATH%>/js/common/jquery-3.2.1.min.js"></script>
		
		<script language="javascript">
			var UserLangCd = '<%=userInfo.getUse_lang_cd()%>';
			var UserOfcCd  = '<%=userInfo.getOfc_cd()%>';
		</script>

		<script language="javascript">

				 document.onkeydown=document_onkeydown;
			      function document_onkeydown(){
			         try{         
			        	 if(ComGetEvent("keycode")==27){
								window.event.returnValue = false;
								return;
			        	 }
			        	 
			            if(ComGetEvent("keycode")!=8) return true; 
			            var se = ComGetEvent();
			              if(se.readOnly!=null && !se.readOnly) return true;
			              if (se.isTextEdit!=null && se.isTextEdit) return true;
			              if (se.isContentEditable!=null && se.isContentEditable) return true;
			              ComJsEventStop();
			              return false;
			         }catch(err) {
			            return false;
			             //ComFuncErrMsg("Backspace ÃÂ«ÃÂ°ÃÂ©ÃÂ¬ÃÂ§ÃÂ ÃÂ¬ÃÂ²ÃÂÃÂ«ÃÂ¦ÃÂ¬ ÃÂ¬ÃÂÃÂÃÂ«ÃÂÃÂ¬\n" + err.message);
			         }
			      }			
				
			
		</script>
		
		<script language="javascript"> 
		/*
			window.onbeforeunload=function(){
				if (window.event.clientY < 0 && (window.event.clientX > (document.documentElement.clientWidth - 5) || window.event.clientX < 15) ) { 
					return "";
				} 
			} 
		*/ 
		$(document).ready(function(){			
			$("form:not(.filter) :input:visible:enabled:first").focus();
		});
		</script>
	<% } %>

	
	<%
		RoleBtnVO roleBtnVO = (RoleBtnVO)request.getAttribute("roleBtnVO");
		if(roleBtnVO!=null){
			String attr1 = roleBtnVO.getAttr1();						// attr1: Retrieve
			String attr2 = roleBtnVO.getAttr2();						// attr2: New(Add)
			String attr3 = roleBtnVO.getAttr3();						// attr3: Save
			String attr4 = roleBtnVO.getAttr4();						// attr4: Delete
			String attr5 = roleBtnVO.getAttr5();						// attr5: Print
			String attr6 = roleBtnVO.getAttr6();						// attr6: Excel
			String attr7 = roleBtnVO.getAttr7();						// attr7: 
			String attr8 = roleBtnVO.getAttr8();						// attr8: 
			String attr9 = roleBtnVO.getAttr9();						// attr9: 
			String attr_extension   = roleBtnVO.getAttr_extension();	// Add by pomsjung
			String url   = roleBtnVO.getPgm_url();
			String prm_seq = roleBtnVO.getPgm_mnu_seq(); // PGM  (Add by pomsjung))
		%>
			<script type="text/javascript">
				var attr1 = "<%= attr1 %>";								
				var attr2 = "<%= attr2 %>";
				var attr3 = "<%= attr3 %>";
				var attr4 = "<%= attr4 %>";
				var attr5 = "<%= attr5 %>";
				var attr6 = "<%= attr6 %>";
				var attr7 = "<%= attr7 %>";
				var attr8 = "<%= attr8 %>";
				var attr9 = "<%= attr9 %>";
				var url   = "<%= url   %>";
				var attr_extension   = "<%= attr_extension   %>";		
				var prm_seq = "<%= prm_seq %>";
			</script>
		<%
		}
	%>
	
<script type="text/javascript">
var LOCAL_CD = '<%=CLT_MSG_PATH%>';
var MULTI_LANGUAGE = '<%=MULTI_LANGUAGE%>'; 
var POPUP_FULL_SCREEN = '<%=POPUP_FULL_SCREEN%>';
function doBtnAuthority(type) {
	var all = document.all;	
	for (var i=0; i<all.length; i++) {
		if (all[i].getAttribute("btnAuth") != null) {
			var tmpBtnAuth = all[i].getAttribute("btnAuth");
				if (tmpBtnAuth == "Y") {
					all[i].style.display = "";
			}
		}
	}
	
	var tmpType = type.split(",");
	for (var i=0; i<all.length; i++) {
		if (all[i].getAttribute("btnAuth") != null) {
			var tmpBtnAuth = all[i].getAttribute("btnAuth");
			for (var j=0; j<type.length; j++) {
				if (tmpBtnAuth == tmpType[j]) {
					all[i].style.display = "";
				}
			}
		}
	}	
}
</script>
