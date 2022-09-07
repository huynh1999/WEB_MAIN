<%--
=========================================================
*Copyright(c) 2009 CyberLogitec. All Rights Reserved.
*
=========================================================
=========================================================
*@FileName   : MyPgm.jsp
*@FileTitle  : 즐겨찾기
*@Description: 
*@author     : 
*@version    : 
*@since      : 

*@Change history:
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ page import="com.clt.syscommon.response.CommonEventResponse"%>
<%@ page import="com.clt.apps.opusbase.system.menu.dto.MenuTreeVO"%>
<%@ page import="java.util.ArrayList"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
    <%@include file="./../../../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css">
	
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SYS_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<SCRIPT type="text/javascript" SRC="./apps/opusbase/user/script/MyPgm.js?ver=<%=CLT_JS_VER%>" ></SCRIPT>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<bean:define id="valMap" name="EventResponse" property="mapVal"/>
	
	<script>
		function setupPage(){
	     	loadPage();
	     }
	</script>

<body leftmargin="0" topmargin="0" marginwidth="0" marginheight="0" >
<form method="post" name="form" onSubmit="return false;" action="./MyPgm.clt">
	<input	type="hidden" name="f_cmd" value=""> 
	<input	type="hidden" name="save_yn" value="<bean:write name="valMap" property="save_yn"/>">
	
	<div class="page_title_area clear">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn TOP">
<!-- 		   <button style="cursor:hand" id="btnAdd" onclick="doWork('ADD')" type="button" class="btn_accent"><bean:message key="Save"/></button>
 -->	   </div>
	   <!-- btn_div -->
	   <div class="location">
		   <span><%=LEV1_NM%></span> &gt;
		   <span><%=LEV2_NM%></span> &gt;
		   <span><%=LEV3_NM%></span>
		   <a href="" class="ir">URL Copy</a>
	   </div>
	</div>
	
	<div class="wrap_search">	
		<div class="opus_design_inquiry wFit ">
				<table>
					<tr>
						<th width="50"><bean:message key="Role"/></th>
						<td>
					        <logic:notEmpty name="EventResponse">
				             	<bean:define id="cdMap"  name="EventResponse" property="mapVal"/>
						        <bean:define id="cdList" name="cdMap" property="cdList"/>
				             	
						        	<select name="f_rolecd_cd" disabled >
			             				<option value=""></option>
					        			<logic:iterate id="cdVO" name="cdList">
					             			<option value='<bean:write name="cdVO" property="code"/>'<logic:equal name="cdVO"  property="code" value="<%=userInfo.getRole_cd()%>">selected</logic:equal>><bean:write name="cdVO" property="code_label"/></option>
					             		</logic:iterate>
					             	</select>
			             	</logic:notEmpty>
						</td>
					</tr>
				</table>
		</div>
	</div>
	<div class="wrap_result">
    	<div class="opus_design_grid">		
			<table>
				<tr>
					<td align="left" class="table_search_bg">
						<div  style="width:100%;height:540px;overflow-y:scroll;">
							<table>
								<tr>
									<td width="50px"></td>
									<td valign="top">
							<%CommonEventResponse rtnEvent = (CommonEventResponse)request.getAttribute("EventResponse");
							boolean bFirst = true;
							String curLevel1Seq = "";
							
							if(rtnEvent.getListVal()!=null){    
								ArrayList menuList = (ArrayList)rtnEvent.getListVal();
								
								MenuTreeVO menuVO = null;
								
								int menuSize = menuList.size();
								
								StringBuffer identStr = new StringBuffer();     
								String blank= "<img src='./web/img/main/tree/blank.gif'     width='21' border='0'             align='absmiddle'>"; 
								String dot1 = "<img src='./web/img/main/tree/dot_lone1.gif' width='21' height='18' border='0' align='absmiddle'>"; //상위-하위 존재시
								String dot2 = "<img src='./web/img/main/tree/dot_lone2.gif'            border='0'             align='absmiddle'>"; //하위 존재시
								String dot3 = "<img src='./web/img/main/tree/dot_lone3.gif' width='21' height='18' border='0' align='absmiddle'>"; //하위
								
								String level1Temp = "";
								
								ArrayList perMenu = null;
								int loopNum = 1;
								String topStr = dot2;
								MenuTreeVO cmpVO = null;
								
								String level1_seq = null;
								String level2_seq = null;
								//메뉴인경우
								for(int i = 0; i < menuSize; i++){
									perMenu = (ArrayList)menuList.get(i);
						
									if(loopNum==menuSize){
										topStr = blank;
									}
									loopNum++;
									
									for(int p = 0; p < perMenu.size(); p++){
										identStr.delete(0, identStr.length());
						
										menuVO = (MenuTreeVO)perMenu.get(p);
										
										if(menuVO.getDispLevel()==1){
											level1_seq = menuVO.getDispSeq();
										}
										
										//최 상위레벨인경우
										if(menuVO.getDispLevel()>1){
											boolean upper1st = false;
											boolean upper2nd = false;
											boolean hasLower = false;
											boolean sameLevel= false;
											boolean curValCheck = false;
											boolean menuBegin = false;
											for(int k = p; k < perMenu.size(); k++){
												
												cmpVO = (MenuTreeVO)perMenu.get(k);
												
												//현재 레벨의 메뉴가 뒤에 확인
												if(curValCheck){
													
													
													if(menuVO.getDispLevel()==cmpVO.getDispLevel()){
														
														if(menuVO.getPgmName()==null){
															sameLevel = true;
														}else{
															if(!menuBegin){
																sameLevel = true;   
															}
														}
													}
													
													//상위 레벨이 있는지 확인
													if(menuVO.getDispLevel()>cmpVO.getDispLevel()){
												   
														if(cmpVO.getDispLevel()==2){
															upper1st = true;
															
														}else if(cmpVO.getDispLevel()==3){
															upper2nd = true;
														}
													}
													
													//하위 레벨이 있는지 확인
													if(menuVO.getDispLevel()<cmpVO.getDispLevel()){
														
														
														if(menuVO.getPgmName()==null){
															hasLower = true;
														}else{
															if(!menuBegin){
																hasLower = true;   
															}
														}
													}
													menuBegin = true;
												}
												
												 if(!curValCheck){
													 if(menuVO.getDispSeq().equals(cmpVO.getDispSeq())){
														 curValCheck = true; 
													 }
													
												}
						
											}
											
											identStr.append(topStr);
											
											if(menuVO.getDispLevel()==2){
												level2_seq = menuVO.getDispSeq();
												
												if(upper1st){
												   identStr.append(dot2);
												   
												}else if(sameLevel){
													identStr.append(dot1);
													
												}else{
													identStr.append(dot3);
												}
												
										   }else if(menuVO.getDispLevel()==3){
												if(upper1st){
												   identStr.append(dot2);
												   
												}else{
													identStr.append(blank);
												}
												
												if(sameLevel){
													identStr.append(dot1);
													
												}else if(!hasLower&&!sameLevel){
													identStr.append(dot3);
												}
						
											}else if(menuVO.getDispLevel()==4){
												
												if(upper1st){
												   identStr.append(dot2);
												   
												}else{
													identStr.append(blank);
												}
												
												if(upper2nd){
												   identStr.append(dot2);
												   
												}else{
													identStr.append(blank);
												}
												
												if(sameLevel){
													identStr.append(dot1);
													
												}else if(!hasLower&&!sameLevel){
													identStr.append(dot3);
												}
											}
											
										}
								
								%>
								<div name="folder_icon_<%=level1_seq%>" style="display:inline">
								<% 
								//메뉴인 경우
								if(menuVO.getPgmName()==null){
									if(level2_seq == null){
										level2_seq = "";
									}
									
									if(bFirst){
										curLevel1Seq = level1_seq;
										bFirst = false;
									}else if(!level1_seq.equals(curLevel1Seq)){
										level2_seq = "";
										curLevel1Seq = level1_seq;;
									}
									
								%>			
									<table border="0" cellspacing="0" cellpadding="0">
										<tr>
											<td height="18" nowrap class="menu_tree"><%=identStr%><img src="./web/img/main/tree/folder_icon.gif" border="0" align="absmiddle" onClick="folder_toggle('<%=level1_seq%>', '<%=level2_seq%>', '<%=menuVO.getDispLevel()%>')"><input type="checkbox" name="menuSeq"  id="menuSeq_<%=level1_seq+"_"+level2_seq+"_"%>" value="<%=menuVO.getDispSeq()%>" <%=menuVO.getRolApplyCheck()%> onClick="selectCheckBox(this.checked, '<%=level1_seq+"_"+level2_seq+"_"%>')" ><%=menuVO.getDispName()%></td>
										</tr>
									</table>		
									
							<% //프로그램인 경우 
							   }else{ 
								   %>
								   <div name="file_icon_<%=level1_seq%>_<%=level2_seq%>" style="display:inline">
									<table border="0" cellspacing="0" cellpadding="0">
										<tr>
											<td height="18px" nowrap class="menu_tree"><%=identStr%><img src="./web/img/main/tree/file_icon.gif" width="21" border="0" align="absmiddle"><input type="checkbox" name="pgmSeq" id="pgmSeq_<%=level1_seq+"_"+level2_seq+"_"+menuVO.getDispSeq()%>" value="<%=menuVO.getDispSeq()%>" <%=menuVO.getRolApplyCheck()%> onClick="selectCheckBox(this.checked, '<%=level1_seq+"_"+level2_seq+"_"+menuVO.getDispSeq()%>')" ><%=menuVO.getPgmName()%></td>
										</tr>
									</table>
									</div>										
					<%  	 }   %>
									</div>
					
					<% 			
						} 
					}
				}  %>							
									</td>
								</tr>
							</table>
						</div>
					</td>
				</tr>
			</table>
		</div>
	</div>
</form>
<script>
	doHideProcess();	
</script>