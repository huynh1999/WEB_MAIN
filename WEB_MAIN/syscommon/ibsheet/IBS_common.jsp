<%--=========================================================================
'주  시 스 템 : 공통
'서브  시스템 : 
'프로그램 ID  : IBS_common.jsp
'프로그램 명  : 
'프로그램개요 : IB시트 Header 정보(정렬순서, Width)저장
             - 사용자별/화면별/Sheet별
'작   성   자 : 
'작   성   일 : 2009.11.13
=============================================================================
'수정자/수정일 :
'수정사유/내역 :
=========================================================================--%>
<%@ page import="com.clt.syscommon.ibsheet.IbSheetUtil"%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page import="com.clt.apps.opusbase.utils.LoginUserUtil,com.clt.apps.opusbase.login.dto.UserInfoVO"%>
<%@ page import="java.util.ArrayList,com.clt.apps.opusbase.system.role.dto.RoleBtnVO"%>
<%@ page import="com.clt.apps.opusbase.main.dto.NaviVo,com.clt.apps.opusbase.utils.NaviInfo"%>
<%@include file="./../header/CLTWebAppGblVarTab.jsp"%>
<!DOCTYPE html>
<html lang="en">
<head>
<script src="<%=CLT_PATH%>/js/common/jquery-3.2.1.min.js"></script>
<script src="<%=CLT_PATH%>/js/common/CoFormControl.js?ver=<%=CLT_JS_VER%>"></script>
</head>
<body>
<%
IbSheetUtil util=IbSheetUtil.getInstance();
String mode=request.getParameter("ibs_udataMode");
String usr_id=request.getParameter("ibs_udataUsrId");	
String scrn_id=request.getParameter("ibs_udataScrnId");	
String sh_id=request.getParameter("ibs_udataShId");	
String hdr_desc=request.getParameter("ibs_udataHdrDesc");
String bMsgOut=request.getParameter("ibs_udataMsgOut");
String callBackFunc = request.getParameter("callBackFunc");
try {		
	if("SAVE".equals(mode)) {	// Header 정보 저장
		util.saveIbSetting(usr_id, scrn_id, sh_id, hdr_desc);
		if("true".equals(bMsgOut)) {
%>		
		<script>
			showErrMessage("Header Setting Save Success!!");
		</script>
<%			
	}			
} else if("DEL".equals(mode)) {	// Header 정보 삭제
	util.delIbSetting(usr_id, scrn_id, sh_id);	
	if("true".equals(bMsgOut)) {
%>
		<script>
			showErrMessage("Header Setting ResetSuccess!!");
		</script>
<%
	}			
} else if("SEARCH".equals(mode)) {	// Header 정보 조회
	hdr_desc=util.searchIbSetting(usr_id, scrn_id, sh_id);
%>	
	<script>
		var colSeq="";
		var colSize="";
		var sh_id="<%=sh_id%>";
		var hdr_desc="<%=hdr_desc%>";
		if(hdr_desc != null && hdr_desc != "") {
			var sheetObj=eval("parent." + sh_id);
			var arrVal=hdr_desc.split("||");
			if(arrVal.length == 2) {
				colSeq=arrVal[0];
				colSize=arrVal[1];
				// 1. Column 배열 순서
				var arrValSeq=colSeq.split("|");
				// #52389 - [UCB] 개인별 COLUMN SETTING RESET
				//if(sheetObj.LastCol() + 1 == arrValSeq.length) {
					for(var i=0; i<arrValSeq.length; i++) {	
						if (sheetObj.SaveNameCol(arrValSeq[i]) !== i) {
							sheetObj.MoveColumnPos(arrValSeq[i], i);
						}
					}
					// 2. Column size
					arrValSize=colSize.split("|");
					if(sheetObj.LastCol()+ 1 == arrValSize.length) {
						for(var i=0; i<arrValSize.length; i++) {	
							sheetObj.SetColWidth(i,arrValSize[i]);
							/* Column Size가 1인 경우에는 Hidden */
							if(sheetObj.GetColWidth(i)==1){
								sheetObj.SetColHidden(i,1);
							}
						}
					}
				//}
			}
		}
	</script>				
<% if("true".equals(bMsgOut)) { %>
		<script>
			showErrMessage("Header Setting ResetSuccess!!");
		</script>
<%
		}
	}
} catch(Exception e) {
	e.printStackTrace();
	out.println("ERROR");
} finally{
%>
	<script>
	var callBackFunc = '<%=callBackFunc%>';

	if(callBackFunc != null && callBackFunc != "undefined" && callBackFunc != ""){
		eval("parent."+callBackFunc+"()");
	}
	</script>
<% } %>
</body>
</html>