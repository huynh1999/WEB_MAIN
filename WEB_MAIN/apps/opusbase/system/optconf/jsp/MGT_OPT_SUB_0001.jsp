
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ page import="com.clt.syscommon.response.CommonEventResponse"%>
<%@ page import="com.clt.apps.fis.mdm.mcm.office.dto.OfcVO"%>
<%@ page import="java.util.ArrayList"%>
	<!-- 공통 Header -->
    <%@include file="./../../../../../../../../syscommon/header/CLTHeader.jsp"%>

	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css">
	
	<style type="text/css">
	   a {
	      text-decoration:none;
	   }
	   
	   .active {
	   		color: #7AADEE;
	   		font-weight: bold;
	   }
	</style>
	
	<script>
		function setupPage(){
    	}
		$("html").addClass("MainCalendar");
		if(navigator.userAgent.indexOf("Firefox") != -1) {
			$("html").addClass("FFMain");	
		}
		
		function callMenu(ofccd){
			parent.callFromSub(ofccd);
		}	
		
		$(function(){
			$("a").click(function(){
				$("a").removeClass("active");
				$(this).addClass("active");
				
			});
		});
	</script>

	
<form method="post" name="form" onSubmit="return false;">
	<table width="100%" border="0" cellpadding="0" cellspacing="0">
		<tr>
			<td width="10px"></td>
			<td valign="top">
<%  CommonEventResponse rtnEvent = (CommonEventResponse)request.getAttribute("EventResponse");
    if(rtnEvent.getListVal()!=null){    
        ArrayList menuList = (ArrayList)rtnEvent.getListVal();
        
        OfcVO menuVO = null;
        
        int menuSize = menuList.size();
        
        StringBuffer identStr = new StringBuffer();     
        String blank= "<img src='./web/img/main/tree/blank.gif'     width='21' border='0'             align='absmiddle'>"; 
        String dot1 = "<img src='./web/img/main/tree/dot_lone1.gif' width='21' height='18' border='0' align='absmiddle'>"; //상위-하위 존재시
        String dot2 = "<img src='./web/img/main/tree/dot_lone2.gif'            border='0'             align='absmiddle'>"; //하위 존재시
        String dot3 = "<img src='./web/img/main/tree/dot_lone3.gif' width='21' height='18' border='0' align='absmiddle'>"; //하위
        
        ArrayList perMenu = null;
        int loopNum = 1;
		
        //메뉴인경우
        for(int i = 0; i < menuSize; i++){
        %>
        
		<div class="folder_icon" style="display:inline">
		
				<!-- <div id="file_icon_1" style="display:none"> -->
				<table border="0" cellspacing="0" cellpadding="0">
					<tr>
						<td height="18px" nowrap class="menu_tree"><img src="./web/img/main/tree/folder_icon.gif" width="21" border="0" align="absmiddle"><a  href="javascript:callMenu(<%="'" + ((OfcVO)menuList.get(i)).getOfc_cd()+"'"%>)" class="menu_tree"><%=((OfcVO)menuList.get(i)).getOfc_cd() + "-" + ((OfcVO)menuList.get(i)).getOfc_eng_nm()%></a></td>
					</tr>
				</table>
				<!-- </div> -->
		</div>
		<% 	
   		 }
	}  %>
			</td>
		</tr>
	</table>
</form>
</html>