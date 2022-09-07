<%--
=========================================================
*Copyright(c) 2008 CyberLogitec. All Rights Reserved.
=========================================================

=========================================================
*@FileName   : topmenu.jsp
*@FileTitle  : 상단메뉴 
*@Description: 
*@author     : Kang,Jung-Gu - Cyberlogitec
*@version    : 1.0 - 08/07/2008
*@since      : 08/07/2008

*@Change history:
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@page pageEncoding="UTF-8"%>
<%@ page import="java.util.ArrayList"%>
<%@ page import="com.clt.syscommon.response.CommonEventResponse"%>
<%@ page import="com.clt.apps.opusbase.system.menu.dto.MenuTreeVO"%>
<%@include file="./../../../../syscommon/header/CLTHeader.jsp"%>

<link href="<%=CLT_PATH%>/web/css/top.css" rel="stylesheet" type="text/css">
<script language="JavaScript" src="common/js/default.js?ver=<%=CLT_JS_VER%>"></script>
<script language="javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
<script>
	var oldObj;
	var oldIdx;
	var preFix = '<%=CLT_PATH%>';
	var oldSub; 
	
	//메뉴 선택시
	function callSubMenu(obj, callIdx){
		if(typeof(oldObj)=='undefined'){
			oldObj = obj;
			oldIdx = callIdx;
			
			var callStr = 'sub'+callIdx;
			oldSub = getObj('sub'+callIdx);
			clearOdjSelect(obj, callIdx, 'T');
		}else if(oldObj!=obj){
			oldObj = obj;
			oldIdx = callIdx;

			parent.parent.setOldKeyClear();	
	
			oldSub = getObj('sub'+callIdx);			
			clearOdjSelect(obj, callIdx, 'T');
		}
	}

	/**
	 * OnOmouse Out시 이미지 초기화
	 */
	function outChg(obj, callIdx){
		var disp = true;
		if(typeof(oldObj)=='undefined'){
			disp = false;
		}else if(oldObj!=obj){
			disp = false;
		}
		if(!disp){
			chgTopImg(obj, callIdx, 'n');
			
			var callStr = 'sub'+callIdx;
			var toHideObj = getObj('sub'+callIdx);

			if(typeof(toHideObj)!='undefined'&&toHideObj!=null){
				toHideObj.style.display = 'none';
			}
		}
		
		if(typeof(oldSub)!='undefined'){
			oldSub.style.display = 'block';
		}
	}
	
	
	/**
	 * 대메뉴 OnMouseOver/Out시 이벤트 처리
	 */
	function onChgTop(obj, callIdx){
		chgTopImg(obj, callIdx, 'r');
	}
	
	
	/**
	 * 메뉴표시 스크립트
	 */
	function chgTopImg(obj, callIdx, imgDiv){
		obj.src = preFix+'/web/img/top_menu/menu'+callIdx+'_'+imgDiv+'.gif';
		
		//서브메뉴 표시로직
		var tmpSub = getObj('sub'+callIdx);
		if(typeof(tmpSub)!='undefined'&&tmpSub!=null){

			var subDisp = 'none';
			if(imgDiv=='r'){
				subDisp = 'block';
			}
			
			//마우스 Over이고 현재 sub menu와 이전 sub menu가 다를때 
			if(imgDiv=='r'&&oldSub!=tmpSub){
	
				if(typeof(oldSub)!='undefined'){
					oldSub.style.display = 'none';
					
				}else{
					clearOdjSelect(obj, callIdx, 'S');
				}
				tmpSub.style.display = subDisp;
			}
		}
	}

	/**
	 * 스타일 등을 초기화함
	 */
	function clearOdjSelect(obj, callIdx, clearType){
		
		//메뉴 선택
		if(clearType=='T'){
			if(callIdx!=1&&typeof(menuIdx1)!='undefined'){
				menuIdx1.src = preFix+'/web/img/top_menu/menu1_n.gif';
			}
			if(callIdx!=2&&typeof(menuIdx2)!='undefined'){
				menuIdx2.src = preFix+'/web/img/top_menu/menu2_n.gif';
			}
			if(callIdx!=3&&typeof(menuIdx3)!='undefined'){
				menuIdx3.src = preFix+'/web/img/top_menu/menu3_n.gif';
			}
			if(callIdx!=4&&typeof(menuIdx4)!='undefined'){
				menuIdx4.src = preFix+'/web/img/top_menu/menu4_n.gif';
			}
			if(callIdx!=5&&typeof(menuIdx5)!='undefined'){
				menuIdx5.src = preFix+'/web/img/top_menu/menu5_n.gif';
			}
			if(callIdx!=6&&typeof(menuIdx6)!='undefined'){
				menuIdx6.src = preFix+'/web/img/top_menu/menu6_n.gif';
			}
			if(callIdx!=7&&typeof(menuIdx7)!='undefined'){
				menuIdx7.src = preFix+'/web/img/top_menu/menu7_n.gif';
			}
			if(callIdx!=8&&typeof(menuIdx8)!='undefined'){
				menuIdx8.src = preFix+'/web/img/top_menu/menu8_n.gif';
			}
			if(callIdx!=9&&typeof(menuIdx9)!='undefined'){
				menuIdx9.src = preFix+'/web/img/top_menu/menu9_n.gif';
			}
			if(callIdx!=10&&typeof(menuIdx10)!='undefined'){
				menuIdx10.src = preFix+'/web/img/top_menu/menu10_n.gif';
			}
		}else{
			if(callIdx!=1&&typeof(sub1)!='undefined'){
				sub1.style.display = 'none';
			}
			if(callIdx!=2&&typeof(sub2)!='undefined'){
				sub2.style.display = 'none';
			}
			if(callIdx!=3&&typeof(sub3)!='undefined'){
				sub3.style.display = 'none';
			}
			if(callIdx!=4&&typeof(sub4)!='undefined'){
				sub4.style.display = 'none';
			}
			if(callIdx!=5&&typeof(sub5)!='undefined'){
				sub5.style.display = 'none';
			}
			if(callIdx!=6&&typeof(sub6)!='undefined'){
				sub6.style.display = 'none';
			}
			if(callIdx!=7&&typeof(sub7)!='undefined'){
				sub7.style.display = 'none';
			}
			if(callIdx!=8&&typeof(sub8)!='undefined'){
				sub8.style.display = 'none';
			}
			if(callIdx!=9&&typeof(sub9)!='undefined'){
				sub9.style.display = 'none';
			}
			if(callIdx!=10&&typeof(sub10)!='undefined'){
				sub10.style.display = 'none';
			}
		}
	}
	
	var subObj;
	/**
	 * 서브메뉴 OnMouseOver/Out시 이벤트 처리
	 */
	function onChgSub(obj){
		obj.style.fontWeight = 'bold';
	}

	//2012.06.20 이미지 누르면 home으로 돌아가는 기능구현
	function goHome(){
		parent.mainFr.dSt('1');
	}
	
	/**
	 * 서브메뉴 OnOmouse Out시 이미지 초기화
	 */
	function outChgSub(obj){
		if(typeof(subObj)=='undefined'){
			obj.style.fontWeight = 'normal';
		}else if(subObj!=obj){
			obj.style.fontWeight = 'normal';
		}

	}
	
	/**
	 * 좌측 메뉴조회
	 * param callId
	 * param callObj
	 * param dispText
	 * param clickVal ('TAB', 'TOP') : 'TAB'에서 클릭시 메뉴 보이기 , 숨기기 이벤트 를 타지 않도록 처리
	 */
	var level2CallId = 0;
	function dispSubMenu(callId, callObj, dispText,	clickVal){
/*		
	 	if(callId=="8"){
			parent.mainFr.mkNewFrame('TradePartner Search','./SAL_TPM_0020.clt');
		}else if(callId=="45"){
			parent.mainFr.mkNewFrame('Master B/L Search','./SEE_BMD_0070.clt');
		}else if(callId=="44"){
			parent.mainFr.mkNewFrame('House B/L Search', './SEE_BMD_0060.clt');
		}else if(callId=="48"){
			parent.mainFr.mkNewFrame('Master B/L Search','./SEI_BMD_0070.clt');
		}else if(callId=="47"){
			parent.mainFr.mkNewFrame('House B/L Search','./SEI_BMD_0060.clt');
		}else if(callId=="53"){
			parent.mainFr.mkNewFrame('MAWB Search','./AIE_BMD_0070.clt');
		}else if(callId=="52"){
			parent.mainFr.mkNewFrame('HAWB Search','./AIE_BMD_0060.clt');
		}else if(callId=="55"){
			parent.mainFr.mkNewFrame('MAWB Search','./AII_BMD_0070.clt');
		}else if(callId=="56"){
			parent.mainFr.mkNewFrame('HAWB Search','./AII_BMD_0060.clt');
		}else if(callId=="59"){
			parent.mainFr.mkNewFrame('Invoice List','./ACC_INV_0040.clt');
		}else if(callId=="61"){
			parent.mainFr.mkNewFrame('Ohter Sales List','./OTH_OPR_0020.clt');
		} 
*/
		
		if(typeof(subObj)!='undefined'&&subObj!=callObj){
			subObj.style.fontWeight = 'normal';
		}
		parent.parent.setOldKeyClear();

		level2CallId = callId;
		displayedMenu = dispText;
		subObj = callObj;

		ajaxSendPost(dispAjaxReq, 'reqVal', '&goWhere=aj&bcKey=submenu&f_parent_seq='+callId, './GateServlet.gsl');

		if(clickVal == 'TOP'){
			doDisp(calledMenu);
		}
		
	}
	
	var calledMenu;
	var displayedMenu;
	
	/**
	 * Ajax를 사용한 처리후 Return Value를 처리하기 위한 메소드임
	 * @param regVal XML 메시지 
	 */
	function getMnuAjaxMsgXML(reqVal){
		var rtnArr;
		try{    
			 rtnArr = new Array(2);
			
			// Mozilla and Netscape browsers
			if (document.implementation.createDocument) {
				var parser = new DOMParser()
				doc = parser.parseFromString(reqVal, "text/xml")
			// MSIE
			} else if (window.ActiveXObject) {
				doc = new ActiveXObject("Microsoft.XMLDOM")
				doc.async="false"
				doc.loadXML(reqVal.responseText)
			}
			var root = doc.getElementsByTagName('ajaxRtn').item(0);
			for (var iNode = 0; iNode < root.childNodes.length; iNode++) {
			   var node = root.childNodes.item(iNode);
			   
			   for (i = 0; i < node.childNodes.length; i++) {
				  var sibling = node.childNodes.item(i);
				  rtnArr[iNode] = sibling.data;
			   }
			}
		}catch (err) {
			return err.number;
		}
		return rtnArr;
	}

	
	//코드표시 Ajax
	function dispAjaxReq(reqVal){
		var doc = getMnuAjaxMsgXML(reqVal);
		if(doc==-2146827864){
			parent.mainFr.location.reload();
		}else{
			var targetFr= 'mainFrame';
		
			if(doc[0]=='OK'){
				if(typeof(doc[1])!='undefined'){
	
					//조회해온 결과를 Parent에 표시함
					var rtnArr = doc[1].split(';');
					var arrLen = rtnArr.length-1;
			
					calledMenu = new Array(arrLen);
					
					for(var i = 0; i<arrLen; i++){
						var cdVals = rtnArr[i].split(',');
						
						var pgmInfo = new Array(3);
						
						//메뉴
						if(cdVals[1]=='-1'){
							pgmInfo[0] = cdVals[0];
							calledMenu[i] = pgmInfo;
						}else if(typeof(cdVals[1])!='undefined'){
		
							pgmInfo[0]  = cdVals[0];
							pgmInfo[1]  = cdVals[1];
							pgmInfo[2]  = targetFr;
							calledMenu[i] = pgmInfo;
						}
					}
				}else{
					calledMenu = null;
				}
			}else{
				alert(ERR_MSG1);		
			}
		}
	}
	
	function doDisp(calledMenu){
		var tbObj = parent.parent.document.getElementById('menuSpace');
		var tb = '';
		var newRow;
		var newCell;

		var lineImg = APP_PATH+'/web/img/left/left_menu_dotline.gif';

		var tmpArr;
		var isBegin = false;
		
		var loopNum = 0;
		
		oldKey = -1;
		if(typeof(calledMenu)!='undefined'&&calledMenu!=null){
			var menuSrc = '<table border="0" cellsapcing="0" cellpadding="0">\n';
					
			menuSrc+= '<tr>\n ';
			menuSrc+= ' <td width="135" height="21" class="left_menu_1th">\n';
			menuSrc+= displayedMenu;
			menuSrc+= '</td>\n ';
			menuSrc+= '</tr>\n ';
			
			var menuLen = calledMenu.length;
			for(var j = 0; j < menuLen; j++){
				tmpArr = calledMenu[j];
				
				if(typeof(tmpArr[1])=='undefined'){
					menuSrc+= '<tr>\n';
					loopNum++;
					
					if(isBegin){
						menuSrc+= '     <td  height="1" background="'+APP_PATH+'/web/img/left/left_menu_dotline.gif"></td>\n';
						menuSrc+= '</tr>\n\n';
						isBegin = false;
					}
					menuSrc+= '<td id="mid'+loopNum+'" onclick="showSubOwn('+loopNum+');" height="10" class="left_menu_nochoice" style="cursor:hand;">\n';
					menuSrc+= '     <img  id="img'+loopNum+'" src="'+APP_PATH+'/web/img/left/left_2thmenu_icon-.gif" width="9" height="9" border="0">\n'+'&nbsp;'+tmpArr[0];
					menuSrc+= '</td>\n'
					isBegin = true;
				}else{
					var tbStart = true;
					for(var p = j; p < menuLen; p++){
						tmpArr = calledMenu[p];
						if(typeof(tmpArr[1])=='undefined'){
							if(p<menuLen){
								j = p-1;	
							}
							break;
						}else{
							if(tbStart){
								menuSrc+= '<tr id="sub'+loopNum+'"\n';
								if(loopNum>0){
									menuSrc+= ' style="display:block;">\n';
								}else{
									menuSrc+= '>\n';
								}
								
								menuSrc+= '<td>\n<table cellspacing="0" border="0" cellpadding="0">';
								tbStart = false;
							}	
							menuSrc+= ' <tr>\n<td title="'+tmpArr[0]+'">\n';
							<!--menuSrc+= '    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="'+tmpArr[1]+'" onclick="doChg(this)" target="'+tmpArr[2]+'" class="left_submenu">-'+tmpArr[0]+'</a>';-->
	menuSrc+= '<a href="javascript:mkNewFrame(\''+tmpArr[0]+'\', \''+tmpArr[1]+'\')" onclick="doChg(this)" target="'+tmpArr[2]+'" class="left_submenu" style="cursor: pointer;">-';
							menuSrc+= '<span style="width:115px;overflow:hidden;text-overflow:ellipsis;"><NOBR>';
							menuSrc+= tmpArr[0];
							menuSrc+= '</NOBR></span>';
							menuSrc+= '</a>';
							menuSrc+= ' </td>\n</tr>\n';
							j = p;
						}
					}
					if(!tbStart){
						menuSrc+= '</table>\n</td>\n'
					}

				}
				menuSrc+= '</tr>\n\n';
			}
			menuSrc+= '</table>\n'; 
			//document.write('<textarea>'+menuSrc+'</textarea>');
			tbObj.innerHTML = menuSrc;

			//좌측 메뉴 표시
			parent.parent.doWorkMemuOnly();
		}
	}
	
	
    function getParentObj(strKey){
        return parent.parent.document.getElementById(strKey);
    }
    
    function dispMyPgm(){
		displayedMenu = "Favorites";
		ajaxSendPost(dispAjaxReq, 'reqVal', '&goWhere=aj&bcKey=searchMyPgm', './GateServlet.gsl');
		if(calledMenu == null){
			var tbObj = parent.parent.document.getElementById('menuSpace');
			var menuSrc = '<table border="0" cellsapcing="0" cellpadding="0">\n';
			menuSrc+= '<tr>\n ';
			menuSrc+= ' <td width="135" height="21" class="left_menu_1th">\n';
			menuSrc+= displayedMenu;
			menuSrc+= '</td>\n ';
			menuSrc+= '</tr>\n ';
			menuSrc+= '</table>\n'; 
			tbObj.innerHTML = menuSrc;
			parent.parent.doWorkMemuOnly();
		}else{
			doDisp(calledMenu);
		}
		
	}
	
</script>
<style>
	.top_menu_tbl {
		font-family: 'Arial';
		font-size: 11px;
		font-weight: normal;
		color: #5A5A5A;
		text-decoration: none;
		text-align: left;
	}
	</style>
</head>
<body onload="dispMyPgm()">
<div id="subMenuDiv" style="position:absolute;top:33px;left:150px;">
<%
boolean disp1 = false;
boolean disp2 = false;
boolean disp3 = false;
boolean disp4 = false;
boolean disp5 = false;
boolean disp6 = false;
boolean disp7 = false;
boolean disp8 = false;
boolean disp9 = false;
boolean disp10 = false;

CommonEventResponse rtnEvent = (CommonEventResponse)request.getAttribute("EventResponse");
if(rtnEvent.getListVal()!=null){	
	ArrayList menuList = (ArrayList)rtnEvent.getListVal();
	
	MenuTreeVO menuVO = null;
	int menuSize = menuList.size();
	
	String parentKey = null;
	String useKey = "";
	boolean isUsed = false;
	String lftSpen = ""; 
	String toStpen = "20";
	int curPosit = 0;
	for(int i = 0; i < menuSize; i++){
		menuVO = (MenuTreeVO)menuList.get(i);

		if(menuVO.getDispLevel()==1){
			
			if(!disp1&&menuVO.getDispName().equals("Sales")){
				disp1 = true;
				parentKey = "1";
				
				lftSpen   = "120";
				curPosit  = 40;
			}else if(!disp2&&menuVO.getDispName().equals("Ocean Export")){
				disp2 = true;
				parentKey = "2";
				
				lftSpen   = Integer.toString(curPosit);
				curPosit+=120;
			}else if(!disp3&&menuVO.getDispName().equals("Ocean Import")){
				disp3 = true;
				parentKey = "3";

				lftSpen   = Integer.toString(curPosit);
				curPosit+=120;
			}else if(!disp4&&menuVO.getDispName().equals("Air Export")){
				disp4 = true;
				parentKey = "4";

				lftSpen   = Integer.toString(curPosit);
				curPosit+=90;
			}else if(!disp5&&menuVO.getDispName().equals("Air Import")){
				disp5 = true;
				parentKey = "5";

				lftSpen   = Integer.toString(curPosit);
				curPosit+=110;
			}else if(!disp6&&menuVO.getDispName().equals("Accounting")){
				disp6 = true;
				parentKey = "6";

				lftSpen   = Integer.toString(curPosit);
				curPosit+=50;
			}else if(!disp7&&menuVO.getDispName().equals("Other")){
				disp7 = true;
				parentKey = "7";

				lftSpen   = Integer.toString(curPosit);
				curPosit+=115;
			}else if(!disp8&&menuVO.getDispName().equals("Performance")){
				disp8 = true;
				parentKey = "8";

				lftSpen   = Integer.toString(curPosit);
				curPosit+=75;
			}else if(!disp9&&menuVO.getDispName().equals("Management")){
				disp9 = true;
				parentKey = "9";

				lftSpen   = Integer.toString(curPosit);
				curPosit+=115;
			}else if(!disp10&&menuVO.getDispName().equals("Code")){
				disp10 = true;
				parentKey = "10";

				lftSpen   = Integer.toString(curPosit);
			}
			
		}else if(menuVO.getDispLevel()==2){
%>			
			<% if(!useKey.equals(parentKey)){ 
				  if(isUsed){
						isUsed = false; 
						toStpen= lftSpen;
						%>
							<td width="100%" height="18px" background="<%=CLT_PATH%>/web/img/top_menu/top_sub_bg.gif"></td>
						</tr>
					</table>
				  <% } 
				  		isUsed = true;
				  		useKey = parentKey;
				  %>
				
					<table id="sub<%=parentKey%>" border="0" cellspacing="0" cellpadding="0" style="display:none;margin-top:0px;margin-left:<%=toStpen%>px;height:100%;">
						<tr><td width="11px" height="18px"><img src="<%=CLT_PATH%>/web/img/top_menu/top_sub_left.gif" width="11px" height="18px" border="0"/></td>
			<%	} %>
							<td nowrap background="<%=CLT_PATH%>/web/img/top_menu/top_sub_bg.gif" width="9px"></td>
							<td nowrap background="<%=CLT_PATH%>/web/img/top_menu/top_sub_bg.gif" id="topSub" class="top_menu_tbl" style="vertical-align:middle;cursor:hand;" onmouseover="onChgSub(this);" onmouseout="outChgSub(this);" onclick="dispSubMenu('<%=menuVO.getDispSeq()%>', this, '<%=menuVO.getDispName()%>', 'TOP');"><%=menuVO.getDispName()%></td>
							<td nowrap background="<%=CLT_PATH%>/web/img/top_menu/top_sub_bg.gif" width="9px"></td>
<%	    }
  	} 
}  %>			<td width="100%" height="18px" background="<%=CLT_PATH%>/web/img/top_menu/top_sub_bg.gif"></td>
			</tr>
		</table>
	</div>

	<table width="100%" height="52" border="0" cellpadding="0" cellspacing="0" background="<%=CLT_PATH%>/web/img/top_menu/top_bg.gif">
	  	<tr>
	    	<td width="146" height="52" valign="top"><img src="<%=CLT_PATH%>/web/img/top_menu/top_logo.gif" width="166" height="41" border="0" style="cursor:hand;" onclick="goHome();"></td>
			<td width="20" height="52" valign="top"></td>
	    	<td valign="top" class="top_menu_tb">
				<table border="0" cellspacing="0" cellpadding="0">
			  		<tr>
	  		<%	if(disp1){ %>
						<td class="top_menu">
							<img id="menuIdx1" src="<%=CLT_PATH%>/web/img/top_menu/menu1_n.gif" onclick="callSubMenu(this, 1);" onMouseOver="onChgTop(this, 1);" onMouseOut="outChg(this, 1);" border="0" style="cursor:hand;">
						</td>
			<%	}   if(disp2){ %>
						<td class="top_menu">
							<img style="margin-left: 7px; margin-right: 6px;" src="<%=CLT_PATH%>/web/img/top_menu/menu_wall.gif" border="0">
							<img id="menuIdx2" src="<%=CLT_PATH%>/web/img/top_menu/menu2_n.gif" onclick="callSubMenu(this, 2);" onMouseOver="onChgTop(this, 2);" onMouseOut="outChg(this, 2);" border="0" style="cursor:hand;">
						</td>
			<%	}   if(disp3){ %>
						<td class="top_menu">
							<img style="margin-left: 7px; margin-right: 6px;" src="<%=CLT_PATH%>/web/img/top_menu/menu_wall.gif" border="0">
							<img id="menuIdx3" src="<%=CLT_PATH%>/web/img/top_menu/menu3_n.gif" onclick="callSubMenu(this, 3);" onMouseOver="onChgTop(this, 3);" onMouseOut="outChg(this, 3);" border="0" style="cursor:hand;">
						</td>
			<%	}   if(disp4){ %>
						<td class="top_menu">
							<img style="margin-left: 7px; margin-right: 6px;" src="<%=CLT_PATH%>/web/img/top_menu/menu_wall.gif" border="0">
							<img id="menuIdx4" src="<%=CLT_PATH%>/web/img/top_menu/menu4_n.gif" onclick="callSubMenu(this, 4);" onMouseOver="onChgTop(this, 4);" onMouseOut="outChg(this, 4);" border="0" style="cursor:hand;">
						</td>
			<%	}   if(disp5){ %>
						<td class="top_menu">
							<img style="margin-left: 7px; margin-right: 6px;" src="<%=CLT_PATH%>/web/img/top_menu/menu_wall.gif" border="0">
							<img id="menuIdx5" src="<%=CLT_PATH%>/web/img/top_menu/menu5_n.gif" onclick="callSubMenu(this, 5);" onMouseOver="onChgTop(this, 5);" onMouseOut="outChg(this, 5);" border="0" style="cursor:hand;">
						</td>
			<%	}   if(disp6){ %>
						<td class="top_menu">
							<img style="margin-left: 7px; margin-right: 6px;" src="<%=CLT_PATH%>/web/img/top_menu/menu_wall.gif" border="0">
							<img id="menuIdx6" src="<%=CLT_PATH%>/web/img/top_menu/menu6_n.gif" onclick="callSubMenu(this, 6);" onMouseOver="onChgTop(this, 6);"  onMouseOut="outChg(this, 6);"border="0" style="cursor:hand;">
						</td>
			<%	}   if(disp7){ %>
						<td class="top_menu">
							<img style="margin-left: 7px; margin-right: 6px;" src="<%=CLT_PATH%>/web/img/top_menu/menu_wall.gif" border="0">
							<img id="menuIdx7" src="<%=CLT_PATH%>/web/img/top_menu/menu7_n.gif" onclick="callSubMenu(this, 7);" onMouseOver="onChgTop(this, 7);" onMouseOut="outChg(this, 7);" border="0" style="cursor:hand;">
						</td>
			<%	}   if(disp8){ %>
						<td class="top_menu">
							<img style="margin-left: 7px; margin-right: 6px;" src="<%=CLT_PATH%>/web/img/top_menu/menu_wall.gif" border="0">
							<img id="menuIdx8" src="<%=CLT_PATH%>/web/img/top_menu/menu8_n.gif" onclick="callSubMenu(this, 8);" onMouseOver="onChgTop(this, 8);" onMouseOut="outChg(this, 8);" border="0" style="cursor:hand;">
						</td>
			<%	}   if(disp9){ %>
						<td class="top_menu">
							<img style="margin-left: 7px; margin-right: 6px;" src="<%=CLT_PATH%>/web/img/top_menu/menu_wall.gif" border="0">
							<img id="menuIdx9" src="<%=CLT_PATH%>/web/img/top_menu/menu9_n.gif" onclick="callSubMenu(this, 9);" onMouseOver="onChgTop(this, 9);" onMouseOut="outChg(this, 9);" border="0" style="cursor:hand;">
						</td>
			<%	}   if(disp10){ %>
						<td class="top_menu">
							<img style="margin-left: 7px; margin-right: 6px;" src="<%=CLT_PATH%>/web/img/top_menu/menu_wall.gif" border="0">
							<img id="menuIdx10" src="<%=CLT_PATH%>/web/img/top_menu/menu10_n.gif" onclick="callSubMenu(this, 10);" onMouseOver="onChgTop(this, 10);" onMouseOut="outChg(this, 10);" border="0" style="cursor:hand;">
						</td>
			<%	}	%>
					</tr>
				</table>
			</td>
		</tr>
	</table>
	<map name="home">
		<area shape="rect" coords="6,5,134,36" href="#">
	</map>
	<map name="logistics">
		<area shape="rect" coords="262,10,361,39" href="#">
	</map>
	</body>
</html>