<%--
=========================================================
*Copyright(c) 2009 CyberLogitec. All Rights Reserved.
=========================================================

=========================================================
*@FileName   : TabWindow.jsp
*@FileTitle  : Tab 처리를 하기 위한 Window 
*@Description: 
*@author     : Kang,Jung-Gu - Cyberlogitec
*@version    : 1.0 - 08/07/2008
*@since      : 08/07/2008

*@Change history:
=========================================================
--%>
<%@ page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>

<%@ page import="java.util.ArrayList"%>
<%@ page import="java.util.HashMap"%>
<%@ page import="com.clt.syscommon.response.CommonEventResponse"%>
<%@ page import="com.clt.apps.opusbase.system.menu.dto.*"%>

<%@include file="./../../../../../syscommon/header/CLTHeader.jsp"%>

<%  
	
CommonEventResponse rtnEvent = (CommonEventResponse)request.getAttribute("EventResponse");

ArrayList topMenuList = null;
ArrayList subMenuList = null;
ArrayList pgmMenuList = null;
ArrayList myPgmList = null;

HashMap menuMap = rtnEvent.getMapVal();

if(menuMap !=null){	
	 topMenuList = (ArrayList)menuMap.get("TOPMENU");
	 //subMenuList = (ArrayList)menuMap.get("SUBMENU");
	 pgmMenuList = (ArrayList)menuMap.get("PGMMENU");
	 myPgmList = (ArrayList)menuMap.get("MYPGM");
}	
MenuTreeVO topMenuVO = null;
int topMenuSize = topMenuList.size();
String preLev1 = "";
String preLev2 = "";
int	subMenuLeft = 0;

MenuTreeVO pgmMenuVO = null;
int pgmMenuSize = pgmMenuList.size();

String bbsSvrIp = (String)application.getAttribute("BBS_SVR_IP");

%>
	
<link href="<%=CLT_PATH%>/web/css/menu.css" rel="stylesheet" type="text/css">
<script src="<%=CLT_PATH%>/js/common/jquery-3.2.1.min.js?ver=<%=CLT_JS_VER%>" type="text/javascript"></script>


<script type="text/javascript">

	function iconHandler(obj, iconNm) {
			obj.src = "<%=CLT_PATH%>/web/img/top_menu/"+ iconNm +".gif";
	}
	
	function subMenuHandler(menuid, flag) {

		var topMenuObj = jQuery('#menuidx_' + menuid);
		var targetObj = jQuery('#submenu_' + menuid);
		
		if (flag == 'show') {
			topMenuObj.addClass('top_menu_over');
			var tempPos = topMenuObj.position();
			targetObj.css('left', tempPos.left);

			targetObj.show();
			
		} else {
			topMenuObj.removeClass('top_menu_over');
			targetObj.hide();
		}
	}

	var tabClick = false;
	function showLeftMenu(){
		var toggleBtnObj  = document.getElementById("toggleBtn");
		var leftMenuObj  = document.getElementById("leftMenu");
		
		if(tabClick){
			tabClick = false;
			leftMenuObj.style.display = 'none';
			toggleBtnObj.style.left ='0px';
			leftToggle.src = "<%=CLT_PATH%>/web/img/left/left_left_open.gif";

		}else{
			tabClick = true;
			leftMenuObj.style.display = 'block';
			toggleBtnObj.style.left ='174px';
			leftToggle.src = "<%=CLT_PATH%>/web/img/left/left_left_close.gif";
		}
	}

	$(document).ready(function() {
		// 2차 메뉴 position을 재 설정한다.
		$('td.top_menu_td').each(function() {

			var tempId = $(this).attr('id').split('_')[1];
			// TabWindow frame영역의 activex object와 zindex처리를 위한 iframe 코드 삽입.
			
			var subMenuObj = $('#submenu_' + tempId);
			var addIframeForActiveX = $('<iframe id="temp" style="z-index: -1; filter:alpha(opacity=0); border: 1px solid; left:0px; top:0px; position:absolute;"></iframe>');
			addIframeForActiveX.width(subMenuObj.width());
			addIframeForActiveX.height(subMenuObj.height());
			subMenuObj.append(addIframeForActiveX);
		});
	})
	
	//메인화면 조회
	function dispMaing(){
		parent.midFr.mainFr.dSt('1');
	}
	
	//메뉴얼
	function downManual(){
		document.forms[0].target = "_blank";
		location.href = "HelpPage.html";
	}

	function getCookieVal(offset)
	{
	    var endstr = document.cookie.indexOf (";", offset);
	    if (endstr == -1) endstr = document.cookie.length;
	    return unescape(document.cookie.substring(offset, endstr));
	}
	
	function GetCookie(name)
	{
	    var arg = name + "=";
	    var alen = arg.length;
	    var clen = document.cookie.length;
	    var i = 0;
	    while (i < clen) //while open
	    {
	        var j = i + alen;
	        if (document.cookie.substring(i, j) == arg)
	            return getCookieVal (j);
	        i = document.cookie.indexOf(" ", i) + 1;
	        if (i == 0) break;
	    } //while close
	    return null;
	}
	
	//로그아웃
	function doLogout(){
		var fs_chk = GetCookie('fs_chk');
		if(fs_chk == "Y"){
			document.forms[0].target = "_parent";
		}else{
			document.forms[0].target = "_top";
		}
		document.forms[0].submit();
	}
	
	var menuCnt = 100;
	var pgmCnt = 550;
	function toggleMyMnu(topMnu, subMnu){
		/*
		alert(topMnu + "/" + subMnu);
		
		if(subMnu == ""){
			for(var i=0; i <menuCnt; i++){
				//
				if(document.getElementById("my_mnu_" + topMnu + "_" + i) != null){
					document.getElementById("my_mnu_" + topMnu + "_" + i).style.display = "none";
				}
				//
				for(var j=0; j<pgmCnt; j++){
					if(document.getElementById("my_mnu_" + topMnu + "_" + i + "_" + j) != null){
						document.getElementById("my_mnu_" + topMnu + "_" + i + "_" + j).style.display = "none";
					}
				}
			}
		}
		*/
	}
	
	function doWork(){
		return;
	}
	
	function openHelpPopUp() { 
		window.open('./HelpPage.html','','location=no, directories=no, resizable=no, status=no, toolbar=no, menubar=no, width=500, height=600, left=100, top=100, scrollbars=no'); 
	} 
	
	function openHelpDeskPopUp(){
		var curTabId = parent.midFr.mainFr.currTabId;	//alert(parent.midFr.mainFr.document.getElementById("tb" +  parent.midFr.mainFr.currTabId).innerHTML );
		var pgmSeqParam = 0; 
		var pgmNmParam = "Home"; 
		var pgmUrlParam = ""; 
		var pgmURLTemp = ""; 
		var locUrl = "";
		
		if(curTabId == 0){
			curTabId = 1;	//초기로딩 시 Home Tab Focus 처리
		}
		
		var oij = parent.midFr.mainFr.document.getElementById("if"+curTabId);
		locUrl = oij.getAttribute("src");
		pgmURLTemp = locUrl.split("?")[0];
		
		var uploadFileServerIp  = "<%=bbsSvrIp%>";
		var uploadFileServerPort  = location.port;
		//var uploadFileServerPort  = "8001";
		locUrl = ("http://"+uploadFileServerIp+":"+uploadFileServerPort+"/<%=CLT_PATH%>/")+locUrl.replaceAll("./", "");
		
		for(var i=0; i<pgmUrl.length; i++){
			if(pgmURLTemp == pgmUrl[i]){
				pgmSeqParam = pgmSeq[i];
				pgmNmParam = pgmNm[i];
				pgmUrlParam =  pgmUrl[i];
				break;
			}
		}
		
		var param = "?pgm_seq="+pgmSeqParam+"&pgm_url="+pgmUrlParam+"&pgm_nm="+pgmNmParam+"&loc_url="+encodeURIComponent(locUrl)+"&usrid="+"<%=userInfo.getUsrid()%>"+"&locl_usr_nm="+encodeURIComponent("<%=userInfo.getUser_name()%>");


<%
if(bbsSvrIp == null || bbsSvrIp.equals("")){
%>
	window.open('./MbrdList.usr' + param,'','location=no, directories=no, resizable=no, status=no, toolbar=no, menubar=no, width=1200, height=700, left=100, top=100, scrollbars=no');
<%
}else{
%>
	window.open('http://' + '<%=bbsSvrIp%>' +  ':8001/<%=CLT_PATH%>/MbrdList.usr' + param,'','location=no, directories=no, resizable=no, status=no, toolbar=no, menubar=no, width=1200, height=700, left=100, top=100, scrollbars=no');
<%
}
%>		
		//window.open('./MbrdList.usr' + param,'','location=no, directories=no, resizable=no, status=no, toolbar=no, menubar=no, width=1200, height=700, left=100, top=100, scrollbars=no'); 
		
		
		
	}
	
	var pgmUrl = new Array();	//Program URL
	var pgmSeq = new Array();	//Program SEQ
	var pgmNm = new Array();	//Program Name
<%
	if(pgmMenuList != null && pgmMenuList.size() > 0){
		for(int i = 0; i < pgmMenuList.size(); i++){
			pgmMenuVO = (MenuTreeVO)pgmMenuList.get(i);
%>			
			pgmUrl[<%=i%>] = '<%=pgmMenuVO.getPgmURL()%>';
			pgmSeq[<%=i%>] = '<%=pgmMenuVO.getDispSeq()%>';
			pgmNm[<%=i%>] = '<%=pgmMenuVO.getPgmName()%>';
			
<%			
		}
	}
%>

</script>

</head>

<body>
<form method="POST" action="./LogOut.usr"></form>
<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
	<tr>
		<td colspan="4" style="height:35;">
		
			<!-- 
			로그인시 요청되는 LoginHTMLAction.java에서 top메뉴에서 사용될 정보를 호출해서 request에 setAttribute로 처리.
			iframe을 안쓰고 본 페이지에 구현하는 방식으로 가야한다. 
			-->
		
			<!-- [S] top menu -->
			<table width="100%" height="35" border="0" cellpadding="0" cellspacing="0">
			  	<tr >
			    	<td width="174"  height="35"><img src="<%=CLT_PATH%>/web/img/top_menu/top_logo.gif" width="174" height="35" border="0" style="cursor:hand;" onclick="dispMaing();"></td>
			    	<td>
						<table width="100%" height="35" border="0" cellspacing="0" cellpadding="0" background="<%=CLT_PATH%>/web/img/top_menu/top_bg01.gif" style="background-repeat: no-repeat;background-position: left center;">
					  		<tr valign="middle">
<%  
	if(topMenuList.size() > 0){
		for(int i = 0; i < topMenuSize; i++){
			topMenuVO = (MenuTreeVO)topMenuList.get(i);
				
%>			
								<td id="menuidx_<%=topMenuVO.getDispSeq()%>" class="top_menu top_menu_td" align="center" valign="middle" onMouseOver="subMenuHandler(<%=topMenuVO.getDispSeq()%>, 'show');" onMouseOut="subMenuHandler(<%=topMenuVO.getDispSeq()%>, 'hide');">
									<%=topMenuVO.getDispName()%>
								</td>
<%		
		}
	}else{	
%>
								<td class="top_menu"> </td>
<%		
	}
%>		
							<td class="top_menu"> </td>
							<td class="top_menu_right">
									<img src="<%=CLT_PATH%>/web/img/top_menu/icon_help_over.gif"   id="helpImg" onclick="openHelpPopUp();"  title="Help" style="cursor:hand;border:0;"></a>
									<img src="<%=CLT_PATH%>/web/img/top_menu/icon_logout_over.gif" onclick="doLogout()" title="Logout" style="cursor:hand;border:0;">
									
									<img src="<%=CLT_PATH%>/web/img/top_menu/icon_info_over.gif"   id="helpImg" onclick="openHelpDeskPopUp();"  title="Help Desk" style="cursor:hand;border:0;"></a>
									
							</td>
							</tr>
						</table>
					</td>
				</tr>
			</table>
			<!-- [E] top menu -->
			<!-- [S] 2차 및 3차 메뉴  -->
<%	
	if(pgmMenuList.size() > 0){
		for(int i = 0; i < pgmMenuSize; i++){
			pgmMenuVO = (MenuTreeVO)pgmMenuList.get(i);
			
			if(i == 0){
%>			
			<div style="z-index: 1" id="submenu_<%=pgmMenuVO.getL1seq()%>" onmouseover="subMenuHandler(<%=pgmMenuVO.getL1seq()%>, 'show');this.style.display = 'block';" onmouseout="subMenuHandler(<%=pgmMenuVO.getL1seq()%>, 'none');this.style.display = 'none';" style="position: absolute; top: 35px; display: none;">
			
			<table class="sub_menu_tbl" cellpadding="0" cellspacing="0" style="z-index:0">
			<tr>
<%
			}
			if(i > 0 && !preLev1.equals(pgmMenuVO.getL1seq())){
%>		
			
						</table>
				  	</td>
				  </tr>
				</table>
			</div>
			<div style="z-index:1;" id="submenu_<%=pgmMenuVO.getL1seq()%>" onmouseover="subMenuHandler(<%=pgmMenuVO.getL1seq()%>, 'show');this.style.display = 'block';" onmouseout="subMenuHandler(<%=pgmMenuVO.getL1seq()%>, 'none');this.style.display = 'none';" style="position: absolute; top: 35px; display: none;">
			
			<table class="sub_menu_tbl" cellpadding="0" cellspacing="0" style="z-index:0">
				<tr>
<%
			}
			if(i == 0){
%>			
				    <td align="left" valign="top" width="160">
				    <table width="100%" border="0" cellspacing="0" cellpadding="0">
				    	<tr>
				        	<td class="sub_menu" >&nbsp;<img src="<%=CLT_PATH%>/web/img/left/level_1dot.gif"> <%=pgmMenuVO.getLev2()%></td>
				      	</tr>
<%
			}
				if(i > 0 && !preLev2.equals(pgmMenuVO.getL2seq())){
					if(preLev1.equals(pgmMenuVO.getL1seq())){
				
%>			
				  		</table>
				  	</td>
				  	<%} %>
				    <td align="left" valign="top" width="160">
				    <table width="100%" border="0" cellspacing="0" cellpadding="0">
				    	<tr>
				        	<td class="sub_menu" >&nbsp;<img src="<%=CLT_PATH%>/web/img/left/level_1dot.gif"> <%=pgmMenuVO.getLev2()%></td>
				      	</tr>
<%
			}
%>					
				      <tr>
				        <td class="pgm_menu" title="<%=pgmMenuVO.getPgmName()%>" onClick="mainFr.mkNewFrame('<%=pgmMenuVO.getPgmName()%>', '<%=pgmMenuVO.getPgmURL()%>')" style="cursor:pointer;z-index:0;filter:alpha(opacity=100)" onMouseOver="this.className='pgm_menu_over'" onMouseOut="this.className='pgm_menu'"><img src="<%=CLT_PATH%>/web/img/left/level_2dot.gif"> <%=pgmMenuVO.getPgmName()%></td>
				      </tr>
<%
			if(i == pgmMenuList.size()-1){
%>			
					</table>
			  	</td>
			  </tr>
			</table>
				
		</div>
<%
			}
			preLev1 = pgmMenuVO.getL1seq();
			preLev2 = pgmMenuVO.getL2seq();
		}	
	}	
%>	
			<!-- [E] 2차 및 3차 메뉴  -->
		</td>
	</tr>
	<tr><td colspan="4" style="height:1;"><img src="<%=CLT_PATH%>/web/img/main/blank.gif" height="1"></td></tr>
	<tr height="100%" >
		<td style="width: 175px; text-align: left;margin-right:-1px;" height="100%" valign="top" background="<%=CLT_PATH%>/web/img/left/left_bg.gif" align="right" cellspacing="0" cellpadding="0">
			<!-- [S] left menu -->
			<div id="leftMenu"  style="overflow:hidden; overflow-y:auto; width:175px; height:520px;  left: 0px; top: 35px; display: none;border:0;margin-right:-1px;">
			<table width="100%" border="0" cellpadding="0" cellspacing="0" style="height:520px; table-layout:fixed" >
			  <tr>
			    <td width="100%"  border="0" cellpadding="0" cellspacing="0" valign="top">
			    <table width="100%" border="0" cellspacing="0" cellpadding="0">
			      <tr>
			        <td height="30" >
			        	<table width="100%" border="0" cellspacing="0" cellpadding="0">
					      <tr>
					        <td width="20" onClick="mainFr.mkNewFrame('Profile', './UserInfoMng.clt')"><img src="<%=CLT_PATH%>/web/img/left/left_dot.gif" width="16" height="11" style="cursor:pointer"></td>
					        <td onClick="mainFr.mkNewFrame('Profile', './UserInfoMng.clt')" style="cursor:pointer"><%=userInfo.getUsrid()%></td>
					        <td><%=userInfo.getOfc_cd()%></td>
					      </tr>
					     </table> 
			        </td>
			      </tr>
			      <tr>
			        <td height="10"></td>
			      </tr>
			      <tr>
			        <td class="left_menu"><img src="<%=CLT_PATH%>/web/img/left/level_1dot.gif">Favorites</td>
			      </tr>
			      
			<%
				String topMnuNm = null;
				String subMnuNm = null;
				ProgramVO programVO = null;
				if(myPgmList != null && myPgmList.size() > 0){
					for(int i=0; i<myPgmList.size(); i++){
						programVO = (ProgramVO)myPgmList.get(i);
						
						if(i == 0){
			%>
				  
				  <tr id="my_mnu_<%=programVO.getTop_mnu_seq()%>" > <!-- /web/img/main/tree/folder_icon.gif" style="width:13px" -->
			        <td class="left_menu" title="<%=programVO.getTop_mnu_nm()%>" ><img src="<%=CLT_PATH%>/web/img/left/level_1dot.gif" onclick="toggleMyMnu('<%=programVO.getTop_mnu_seq()%>', '')">
			        	<span style="width:115px;overflow:hidden;text-overflow:ellipsis;"><NOBR><%=programVO.getTop_mnu_nm()%></NOBR></span>
			        </td>
			      </tr>
			      <tr id="my_mnu_<%=programVO.getTop_mnu_seq()%>_<%=programVO.getSub_mnu_seq()%>">
			        <td class="left_menu" title="<%=programVO.getSub_mnu_nm()%>" >&nbsp;&nbsp;<img src="<%=CLT_PATH%>/web/img/left/level_1dot.gif" onclick="toggleMyMnu('<%=programVO.getTop_mnu_seq()%>', '<%=programVO.getSub_mnu_seq()%>')">
			        	<span style="width:115px;overflow:hidden;text-overflow:ellipsis;"><NOBR> <%=programVO.getSub_mnu_nm()%></NOBR></span>
			        </td>
			      </tr>
			      <tr id="my_mnu_<%=programVO.getTop_mnu_seq()%>_<%=programVO.getSub_mnu_seq()%>_<%=programVO.getPgm_seq()%>">
			        <td class="left_menu2" title="<%=programVO.getPgm_nm()%>" onClick="mainFr.mkNewFrame('<%=programVO.getPgm_nm()%>', '<%=programVO.getPgm_url()%>')" onMouseOver="this.className='left_menu_over'" onMouseOut="this.className='left_menu2'"><img src="<%=CLT_PATH%>/web/img/left/level_2dot.gif">
			        	<span style="width:115px;overflow:hidden;text-overflow:ellipsis;"><NOBR> <%=programVO.getPgm_nm()%></NOBR></span>
			        </td>
			      </tr>
			<%	 	
						}else{
							
							if(topMnuNm.equals(programVO.getTop_mnu_nm()) && !subMnuNm.equals(programVO.getSub_mnu_nm())){
			%>
				   <tr id="my_mnu_<%=programVO.getTop_mnu_seq()%>_<%=programVO.getSub_mnu_seq()%>">
			        <td class="left_menu" title="<%=programVO.getSub_mnu_nm()%>" >&nbsp;&nbsp;<img src="<%=CLT_PATH%>/web/img/left/level_1dot.gif" onclick="toggleMyMnu('<%=programVO.getTop_mnu_seq()%>', '<%=programVO.getSub_mnu_seq()%>')">
			        	<span style="width:115px;overflow:hidden;text-overflow:ellipsis;"><NOBR> <%=programVO.getSub_mnu_nm()%></NOBR></span>
			        </td>
			      </tr>
			      <tr id="my_mnu_<%=programVO.getTop_mnu_seq()%>_<%=programVO.getSub_mnu_seq()%>_<%=programVO.getPgm_seq()%>">
			        <td class="left_menu2" title="<%=programVO.getPgm_nm()%>" onClick="mainFr.mkNewFrame('<%=programVO.getPgm_nm()%>', '<%=programVO.getPgm_url()%>')" onMouseOver="this.className='left_menu_over'" onMouseOut="this.className='left_menu2'"><img src="<%=CLT_PATH%>/web/img/left/level_2dot.gif">
			        	<span style="width:115px;overflow:hidden;text-overflow:ellipsis;"><NOBR> <%=programVO.getPgm_nm()%></NOBR></span>
			        </td>
			      </tr>											
			<%				
							}else if(!( topMnuNm + subMnuNm ).equals(programVO.getTop_mnu_nm() + programVO.getSub_mnu_nm())){
			%>
				  <tr id="my_mnu_<%=programVO.getTop_mnu_seq()%>">
			        <td class="left_menu" title="<%=programVO.getTop_mnu_nm()%>" ><img src="<%=CLT_PATH%>/web/img/left/level_1dot.gif"  onclick="toggleMyMnu('<%=programVO.getTop_mnu_seq()%>', '')">
			        	<span style="width:115px;overflow:hidden;text-overflow:ellipsis;"><NOBR><%=programVO.getTop_mnu_nm()%></NOBR></span>
			        </td>
			      </tr>
			      <tr id="my_mnu_<%=programVO.getTop_mnu_seq()%>_<%=programVO.getSub_mnu_seq()%>" >
			        <td class="left_menu" title="<%=programVO.getSub_mnu_nm()%>" >&nbsp;&nbsp;<img src="<%=CLT_PATH%>/web/img/left/level_1dot.gif" onclick="toggleMyMnu('<%=programVO.getTop_mnu_seq()%>', '<%=programVO.getSub_mnu_seq()%>')">
			        	<span style="width:115px;overflow:hidden;text-overflow:ellipsis;"><NOBR> <%=programVO.getSub_mnu_nm()%></NOBR></span>
			        </td>
			      </tr>
			      <tr id="my_mnu_<%=programVO.getTop_mnu_seq()%>_<%=programVO.getSub_mnu_seq()%>_<%=programVO.getPgm_seq()%>">
			        <td class="left_menu2" title="<%=programVO.getPgm_nm()%>" onClick="mainFr.mkNewFrame('<%=programVO.getPgm_nm()%>', '<%=programVO.getPgm_url()%>')" onMouseOver="this.className='left_menu_over'" onMouseOut="this.className='left_menu2'"><img src="<%=CLT_PATH%>/web/img/left/level_2dot.gif">
			        	<span style="width:115px;overflow:hidden;text-overflow:ellipsis;"><NOBR> <%=programVO.getPgm_nm()%></NOBR></span>
			        </td>
			      </tr>					
			<%				
							
							}else{
			%>
				  <tr id="my_mnu_<%=programVO.getTop_mnu_seq()%>_<%=programVO.getSub_mnu_seq()%>_<%=programVO.getPgm_seq()%>">
			        <td class="left_menu2" title="<%=programVO.getPgm_nm()%>" onClick="mainFr.mkNewFrame('<%=programVO.getPgm_nm()%>', '<%=programVO.getPgm_url()%>')" onMouseOver="this.className='left_menu_over'" onMouseOut="this.className='left_menu2'"><img src="<%=CLT_PATH%>/web/img/left/level_2dot.gif">
			        	<span style="width:115px;overflow:hidden;text-overflow:ellipsis;"><NOBR> <%=programVO.getPgm_nm()%></NOBR></span>
			        </td>
			      </tr>
			<%			
							}
					}
						
			%>
				  
			<%		
						
						topMnuNm = programVO.getTop_mnu_nm();
						subMnuNm = programVO.getSub_mnu_nm();
						
					}
				}	
			%>	      
			      <!-- tr>
			        <td class="left_menu_over"><img src="<%=CLT_PATH%>/web/img/left/level_2dot.gif">&nbsp;&nbsp;Master AWB</td>
			      </tr>
			      <tr>
			        <td class="left_menu2"><img src="<%=CLT_PATH%>/web/img/left/level_2dot.gif">&nbsp;&nbsp;Master AWB</td>
			      </tr-->
			      
			      <tr>
			        <td>&nbsp;</td>
			      </tr>
			    </table></td>
			  </tr>
			</table>
			</div>	
			<!-- [E] left menu -->
		</td>
		<td style="width:16;" align="left" style="display: block;align:left;margin-left:-1px;border:0;" cellspacing="0" cellpadding="0">
			<div id="toggleBtn" style="display: block;position:absolute;left:0px;top:303px;border:0;margin-left:-1px;">
			<table cellpadding="0" cellsapcing="0" align="left" valign="top" style="align:left;border:0;margin-left:-1px;">
				<tr>
					<td bgcolor="#FFFFFF" cellspacing="0" cellpadding="0" style="border:0;margin-left:-1px;">
						<img id="leftToggle" src="<%=CLT_PATH%>/web/img/left/left_left_open.gif" onclick="showLeftMenu()" style="cursor:hand;margin-left:-1px;" border="0"><br>
					</td>
				</tr>
			</table>
			</div>
		</td>	
		<td><img src="<%=CLT_PATH%>/web/img/main/blank.gif" width="25px"></td>
		<td width="100%" style="margin-top:0px;margin-left:0px;margin-right:0px;margin-bottom:0px;border:none;" bgcolor="#FFFFFF" scroll="no">
			<iframe id="mainFr" src="./TabWindow.screen" width="100%" height="100%" scrolling="no" frameborder="NO"  frameborder="0"  border="0"></iframe>
		</td>
	</tr>	
</table>

	
<div id="WORKING_IMG" style="z-index: 1;position:absolute;width:100%;height:100%;display:none;background-color:#CCCCFF;margin-top:0px;margin-left:0px;" class="transparent" valign="middle" align="center">
	<table style="margin-top:25%;">
		<tr>
			<td><img src='<%=CLT_PATH%>/web/img/main/processing.gif' border="0" style="z-index: 0;filter:alpha(opacity=100);"/></td>
		</tr>
	</table>
</div>
    
</body>

</html> 