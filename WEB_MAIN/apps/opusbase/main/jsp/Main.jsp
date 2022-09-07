<%--
=========================================================
*Copyright(c) 2008 CyberLogitec. All Rights Reserved.
=========================================================

=========================================================
*@FileName   : Main.jsp
*@FileTitle  : 메인화면
*@Description: 로그인 성공시 표시되는 Welcome 페이지
*@author     : Kang,Jung-Gu - Cyberlogitec
*@version    : 1.0 - 08/07/2008
*@since      : 08/07/2008

*@Change history:
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@include file="./../../../../syscommon/header/CLTHeader.jsp"%>
    
<bean:define id="mapVal"  name="EventResponse" property="mapVal"/>
<bean:define id="ntcList" name="mapVal" property="ntcList"/><!-- 게시판 -->
    
<!--link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css"/-->
<script src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
<script src="<%=CLT_PATH%>/js/rd/rdviewer50u.js?ver=<%=CLT_JS_VER%>"></script>
<script>
//UI Design script
$(function(){
	$("html").addClass("mainHTML");
	document.title = "Home";
});

function setupPage(){
	
}
</script>
<script>
    function showMsg(ntcNo){
        popGET('./NoticeRead.clt?f_cmd='+SEARCH01+'&f_brd_seq='+ntcNo, '', 680, 400);
    }
        
    function goHBL(bnd_clss_cd, biz_clss_cd, intg_bl_seq,  air_sea_clss_cd, bl_no){
        if(air_sea_clss_cd=='OCEAN'){
            if(biz_clss_cd=='H'){
            	if(bnd_clss_cd=='O'){
					var paramStr = "./SEE_BMD_0020.clt?f_cmd="+SEARCHLIST+"&f_bl_no="+bl_no+"&f_intg_bl_seq="+intg_bl_seq;
				    parent.mkNewFrame('Booking & HB/L Entry', paramStr);
                }else{
                	var paramStr = "./SEI_BMD_0020.clt?f_cmd="+SEARCHLIST+"&f_bl_no="+bl_no+"&f_intg_bl_seq="+intg_bl_seq;
				    parent.mkNewFrame('HB/L Entry', paramStr);
                }
            }else{
            	if(bnd_clss_cd=='O'){
            		var paramStr = "./SEE_BMD_0040.clt?f_cmd="+SEARCHLIST+"&f_bl_no="+bl_no+"&f_intg_bl_seq="+intg_bl_seq;
				    parent.mkNewFrame('Master B/L Entry', paramStr);
                }else{
                	var paramStr = "./SEI_BMD_0040.clt?f_cmd="+SEARCHLIST+"&f_bl_no="+bl_no+"&f_intg_bl_seq="+intg_bl_seq;
				    parent.mkNewFrame('Master B/L Entry', paramStr);
                }
            }
            
        }else {
        	if(biz_clss_cd=='H'){
        		if(bnd_clss_cd=='O'){
					var paramStr = "./AIE_BMD_0020.clt?f_cmd="+SEARCHLIST+"&f_bl_no="+bl_no+"&f_intg_bl_seq="+intg_bl_seq;
					parent.mkNewFrame('Booking & HAWB Entry', paramStr);
                }else{
                	var paramStr = "./AII_BMD_0020.clt?f_cmd="+SEARCHLIST+"&f_bl_no="+bl_no+"&f_intg_bl_seq="+intg_bl_seq;
					parent.mkNewFrame('HAWB Entry', paramStr);
                }
            }else{
            	if(bnd_clss_cd=='O'){
            		var paramStr = "./AIE_BMD_0040.clt?f_cmd="+SEARCHLIST+"&f_bl_no="+bl_no+"&f_intg_bl_seq="+intg_bl_seq;
					parent.mkNewFrame('MAWB Entry', paramStr);
                }else{
                	var paramStr = "./AII_BMD_0040.clt?f_cmd="+SEARCHLIST+"&f_bl_no="+bl_no+"&f_intg_bl_seq="+intg_bl_seq;
					parent.mkNewFrame('MAWB Entry', paramStr);
                }
            }
        }
    }

    var usrid = "<%=userInfo.getUsrid()%>";
        
    function doWork(srcName){
    	try {
switch(srcName) {
	case "START":
		if(frm1.start_time.value==''){
			ajaxSendPost(setStartTime, 'reqVal', '&goWhere=aj&bcKey=setManageTime&type=I&usrid='+usrid, './GateServlet.gsl');
		}
	break;
	case "END":
		if(frm1.end_time.value==''){
			ajaxSendPost(setEndTime, 'reqVal', '&goWhere=aj&bcKey=setManageTime&type=O&usrid='+usrid, './GateServlet.gsl');
		}
	break;
            }
    	}catch(e) {
            if( e == "[object Error]") {
                
            } else {
                
            }
        }
    }

    function setStartTime(reqVal){
    	var doc = getAjaxMsgXML(reqVal);
    	
    	if(doc[0]=='OK'){
    		frm1.start_time.value = doc[1];
    	}
    }
    
    function setEndTime(reqVal){
    	var doc = getAjaxMsgXML(reqVal);
    	
    	if(doc[0]=='OK'){
    		frm1.end_time.value = doc[1];
    	}
    }

	// RD Chart 
	// 공통전역변수
	var docObjects = new Array();
	var sheetCnt = 0;
	var rdObjects = new Array();
	var rdCnt = 0;
</script>

<form name="frm1" method="POST" class="main_board_form">
    <input  type="hidden" name="f_cmd">

    <!-- page_title_area(S) -->
    <div class="page_title_area clear">
       <h2 class="page_title main_page_title">Global Logistics Management System </h2>
    </div>
    <!-- page_title_area(E) -->

    <div class="layout_wrap" style="padding: 10px">
        <div class="layout_vertical_2" style="width:48%;padding:0 21px 0 0">
		    <!-- main_task(S) -->
		    <div class="main_task">
		   		<h3 class="main_title"><bean:message key="Task_List"/></h3>
		   		<div class="main_cont">
                    <!-- grid2(S) -->
			        <table class="grid2">
			            <colgroup>
			                <col width="" />
			            </colgroup>
				        <thead>
			                <tr>
				                <th><bean:message key="Type"/></th>
								<th><bean:message key="Bound"/></th>
								<th>H/M</th>
								<th><bean:message key="BL_No"/></th>
								<th><bean:message key="Customer"/></th>
								<th><bean:message key="ETD_ETA"/></th>
			                </tr>
				        </thead>
				        <tbody>
					        <%  int taskLoop = 0; 
				                boolean taskBegin = false;
				            %>
				            <logic:notEmpty name="mapVal" property="taskList">
				                <bean:define id="taskObj" name="mapVal" property="taskList"/>
				                <logic:iterate id="task" name="taskObj"> 
			                        <tr onclick="goHBL('<bean:write name="task" property="bnd_clss_cd"/>', '<bean:write name="task" property="biz_clss_cd"/>', '<bean:write name="task" property="intg_bl_seq"/>', '<bean:write name="task" property="air_sea_clss_cd"/>', '<bean:write name="task" property="bl_no"/>')">
			                            <td align="center"><bean:write name="task" property="air_sea_clss_cd"/></td>
										<td align="center"><bean:write name="task" property="bnd_clss_cd"/></td>
										<td align="center"><bean:write name="task" property="biz_clss_cd"/></td>
										<td><bean:write name="task" property="bl_no"/></td>
										<td><bean:write name="task" property="act_shpr_trdp_nm"/></td>
										<td align="center"><wrt:write name="task" property="obrd_dt_tm" formatType="DATE" fromFormat="MMddyyyy" format="MM-dd-yyyy"/></td>
			                        </tr>
				                    <%  taskBegin = true;
				                        taskLoop++;%>
				                </logic:iterate>
				            </logic:notEmpty>
				            <% while(taskLoop < 6){ %>
			                    <tr>
				                    <td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
							    </tr>
				            <%      taskBegin = true;   
				                    taskLoop++;
				               } 
				             %>
				        </tbody>
			        </table>
			        <!-- grid2(E) -->
		        </div>
		    </div>
		    <!-- main_task(E) -->
		    
		    
		    <!-- main_notice(S) -->
		    <div class="main_notice_wrap">
			    <div class="main_notice">
			       	<h3 class="main_title">
			       		<table>
			       			<tr style="cursor: default;">
			       				<td>
			       					<bean:message key="Notice"/>
			       				</td>
			       				<td align="right">
			       					<!--u><b><a href="./NoticeList.clt" target="_blank" class="btn_more"><bean:message key="More"/></a></b></u>-->
			       					<u><b><a href="#" onClick="parent.openPageTab('./NoticeList.clt', 'Notice List')" class="btn_more"><bean:message key="More"/></a></b></u>
			       				</td>
			       			</tr>
			       		</table>
	       			</h3>
			       	<div class="main_cont">
				       	<!-- grid2(S) -->
				        <table class="grid2">
				            <colgroup>
				                <col width="35" />
				                <col />
				                <col width="150" />
				                <col width="88" />
				            </colgroup>
				            <thead>
				                <tr>
				                    <th>No.</th>
								    <th><bean:message key="Title"/></th>
								    <th><bean:message key="Writer"/></th>
								    <th><bean:message key="Date"/></th>
				                </tr>
				            </thead>
				            <tbody>
								<%  int totLoop = 0; 
								boolean isBegin = false;
								%>
								<logic:notEmpty name="ntcList">
								<logic:iterate id="ntc" name="ntcList"> 
									<tr>
										<td><bean:write name="ntc" property="brd_seq"/></td>
										<td class="td_ellipsis ntc_title" onclick="showMsg('<bean:write name="ntc" property="brd_seq"/>');">
											<logic:equal name="ntc" property="new_flg" value="NEW" >
											<img src="<%=CLT_PATH%>/web/img/main/new.gif" id="newImage" width="30">
											<b>
											</logic:equal>
											<bean:write name="ntc" property="brd_tit"/>
										</td>
										<td class="td_ellipsis" title="<bean:write name="ntc" property="modi_eng_usr_nm"/>"><bean:write name="ntc" property="modi_eng_usr_nm"/></td>
										<td><wrt:write name="ntc" property="dp_bgn_dt" formatType="DATE" fromFormat="yyyyMMdd" format="MM-dd-yyyy"/></td>
									</tr>
									<% isBegin = true;
									totLoop++;%>
								</logic:iterate>
								</logic:notEmpty>
								
								<% while(totLoop < 6){ %>
								<tr>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
									<td>&nbsp;</td>
								</tr>
								<%     isBegin = true;   
								totLoop++;
								} %>
				            </tbody>
					   </table>
					   <!-- grid2(E) -->
				   </div>
				</div>
				<!-- main_notice(E) -->
			</div>
		</div>
		<div class="layout_vertical_2" style="width:52%">
		    <!-- main_schedule(S) -->
		    <div class="main_schedule">
		       	<h3 class="main_title"><bean:message key="My_Schedule"/></h3>
		       	<div class="main_cont">
                    <iframe id='calFr' src='./MainCalendar.clt' scrolling='no' style='width:100%'></iframe>
		        </div>
		    </div>
		    <!-- main_schedule(E) -->
		</div>
    </div>
</form>
</body>
</html>