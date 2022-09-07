<%--
=========================================================
*Copyright(c) 2008 CyberLogitec. All Rights Reserved.
=========================================================

=========================================================
*@FileName   : PROGRAMSUB.jsp
*@FileTitle  : 메뉴 표시
*@Description: 메뉴의 관리
*@author     : Kang,Jung-Gu - Cyberlogitec
*@version    : 1.0 - 08/07/2008
*@since      : 08/07/2008
*
*@Change history:
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ page import="com.clt.syscommon.response.CommonEventResponse"%>
<%@ page import="com.clt.apps.opusbase.system.menu.dto.MenuTreeVO"%>
<%@ page import="java.util.ArrayList"%>
	<!-- 공통 Header -->
    <%@include file="./../../../../../../../../syscommon/header/CLTHeader.jsp"%>

	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css">

	<%	String workLevel = (String)request.getParameter("workLevel"); 
	%>
	<script>
		function setupPage(){
    	}
		function callMenu(mLevel, mKey){
	<% if(workLevel.equals("3")){ %>
				if(mLevel==4){
					alert('Last menu depth!');
				}else{
					parent.callFromSub(mLevel, mKey);				
				}
	<% }else{ %>
				parent.callFromSub(mLevel, mKey);
	<% } %>
		}	
		
		function folder_toggle(level1_seq, level2_seq, level){
			
			if(level == 1){
				var folder_icon = "folder_icon_"+level1_seq;
				var folder_icon = document.getElementsByName(folder_icon);

				for(i=1;i<folder_icon.length;i++){
					if(folder_icon[i].style.display != 'none'){
						folder_icon[i].style.display = 'none';
					}else{	
						folder_icon[i].style.display = 'inline';
					}	
				}
					
			}
			
			if(level == 2){
					var file_icon = "file_icon_"+level1_seq+"_"+level2_seq;
					var file_icons = document.getElementsByName(file_icon);

					for(i=0;i<file_icons.length;i++){
						if(file_icons[i].style.display != 'none'){
							file_icons[i].style.display = 'none';
						}else{	
							file_icons[i].style.display = 'inline';
						}	
					}
			}
					
		}
		$("html").addClass("MainCalendar");
		$("body").css("overflow","auto")
		if(navigator.userAgent.indexOf("Firefox") != -1) {
			$("html").addClass("FFMain");	
		}
	</script>
<form method="post" name="form" onSubmit="return false;">
	<table width="100%" height="100%" border="0" cellpadding="0" cellspacing="0">
		<tr>
			<td width="10px"></td>
			<td valign="top">
<%  CommonEventResponse rtnEvent = (CommonEventResponse)request.getAttribute("EventResponse");
    if(rtnEvent.getListVal()!=null){    
        ArrayList menuList = (ArrayList)rtnEvent.getListVal();
        
        MenuTreeVO menuVO = null;
        
        int menuSize = menuList.size();
        
        StringBuffer identStr = new StringBuffer();     
        String blank= "<img src='./web/img/main/tree/blank.gif'     width='21' border='0'             align='absmiddle'>"; 
        String dot1 = "<img src='./web/img/main/tree/dot_lone1.gif' width='21' height='18' border='0' align='absmiddle'>"; //상위-하위 존재시
        String dot2 = "<img src='./web/img/main/tree/dot_lone2.gif'            border='0'             align='absmiddle'>"; //하위 존재시
        String dot3 = "<img src='./web/img/main/tree/dot_lone3.gif' width='21' height='18' border='0' align='absmiddle'>"; //하위
        
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
		<div id="folder_icon_<%=level1_seq%>" style="display:inline">
		<%       
          if(menuVO.getPgmName()==null){
			%>			
				<table border="0" cellspacing="0" cellpadding="0">
					<tr>
						<td height="18" nowrap><%=identStr%><img src="./web/img/main/tree/folder_icon.gif" border="0" align="absmiddle" onClick="folder_toggle('<%=level1_seq%>', '<%=level2_seq%>', '<%=menuVO.getDispLevel()%>')"><a href="javascript:callMenu(<%=menuVO.getDispLevel()%>, <%=menuVO.getDispSeq()%>);folder_toggle('<%=level1_seq%>', '<%=level2_seq%>', '<%=menuVO.getDispLevel()%>')" class="menu_tree"><%=menuVO.getDispName()%></a></td>
					</tr>
				</table>		
		<% //프로그램인 경우 
		   }else{
		%>
				<div id="file_icon_<%=level1_seq%>_<%=level2_seq%>" style="display:none">
				<table border="0" cellspacing="0" cellpadding="0">
					<tr>
						<td height="18px" nowrap class="menu_tree"><%=identStr%><img src="./web/img/main/tree/file_icon.gif" width="21" border="0" align="absmiddle"><%=menuVO.getPgmName()%></td>
					</tr>
				</table>
				</div>
		<%  }   %>
		</div>
		<% 			
        }
		} 
	}  %>
			</td>
		</tr>
	</table>
</form>
</html>