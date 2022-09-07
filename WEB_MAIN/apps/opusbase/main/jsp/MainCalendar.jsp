<%@ page import="java.util.*" contentType="text/html;charset=UTF-8" %>
<%@ page pageEncoding="UTF-8"%>
<%@ page import="com.clt.syscommon.response.CommonEventResponse" %>
<%@ page import="com.clt.apps.opusbase.main.dto.PsonSkdVO" %>
<%@include file="./../../../../../syscommon/header/CLTHeader.jsp"%>
<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css">

<script>
$("html").addClass("MainCalendar");
if(navigator.userAgent.indexOf("Firefox") != -1) {
	$("html").addClass("FFMain");	
}

function setupPage() {
}
</script>
<style>
	.title {
		background: #FFCC66;width:100%;
		height: 15px;
	}
	#dispSkd span {
		background: #FFCC66;width:100%;
		height: 15px;
	}
	.schedule_icon {
		position: absolute;
		top: 30px;
		right: 10px;
	}
</style>
<script>
	function showMsg(showYn, dayKey, dayX, dayY){
		var inMsg = getObj('dayMsg'+dayKey);
		if(showYn){

			var posAddX = 0;
			var posAddY = 0;
			switch(dayX){
				case 6:
					posAddX = -150;
				break;
                case 7:
                    posAddX = -150;
                break;
			}		
            switch(dayY){
                case 3:
					posAddY = -70;
                break;
                case 4:
					posAddY = -190;
                break;
                case 5:
					posAddY = -190;
                break;
                case 6:
					posAddY = -190;
                break;
            }       
    
			var xCnt = event.clientX + document.body.scrollLeft;
			var yCnt = event.clientY + document.body.scrollTop;
			
			cnfMsg.style.left= xCnt+2+posAddX + "px";
			cnfMsg.style.top = yCnt+2+posAddY + "px";
			cnfMsg.style.display= 'block';
			dispSkd.innerHTML = inMsg.value;
		}else{
		}
	}
	
	function closeMsg(){
		cnfMsg.style.display= 'none';
	}
</script>
<%  Calendar ctoday = Calendar.getInstance();
	Calendar firDay = Calendar.getInstance();
	Calendar lstDay = Calendar.getInstance();
	
	Object yearObj  = request.getParameter("yearVal");
	Object monthObj = request.getParameter("monthVal");
	
	//메시지 목록
	CommonEventResponse cmEvent = (CommonEventResponse)request.getAttribute("EventResponse");
	HashMap hMap = cmEvent.getMapVal();
	
	int curYear = 0;
	int curMonth= 0;
	
   //사용자가 일자를 지정한 경우
	if(yearObj==null){
		curYear = ctoday.get(Calendar.YEAR);
		curMonth= ctoday.get(Calendar.MONTH);

		firDay.set(ctoday.get(Calendar.YEAR), curMonth, 1);
		lstDay.set(ctoday.get(Calendar.YEAR), curMonth+1, 1);
		
		
	//사용자가 일자를 지정하지 않은 경우
	}else{
		curYear = Integer.parseInt((String)yearObj);
		curMonth= Integer.parseInt((String)monthObj);	
		firDay.set(curYear, curMonth, 1);
		
		if(curMonth==11){
			lstDay.set(curYear+1, 0, 1);
		}else{
			lstDay.set(curYear, curMonth+1, 1);	
		}
	}
	StringBuffer dispMon = new StringBuffer();
	dispMon.append(curYear);
	dispMon.append(".");
	if(curMonth<9){
		dispMon.append("0");
	}
	dispMon.append(curMonth+1);
	
	String yearVal = "?yearVal=";
	String monthVal= "&monthVal=";
	
	StringBuffer preMonth = new StringBuffer(yearVal);
	StringBuffer nxtMonth = new StringBuffer(yearVal);
	if(curMonth==0){
		preMonth.append(curYear-1);
		preMonth.append(monthVal);
		preMonth.append(11);

		nxtMonth.append(curYear);
		nxtMonth.append(monthVal);
		nxtMonth.append(1);
		
	}else if(curMonth==11){
		preMonth.append(curYear);
		preMonth.append(monthVal);
		preMonth.append(10);
		
		nxtMonth.append(curYear+1);
		nxtMonth.append(monthVal);
		nxtMonth.append(0);		
		
	}else{
		preMonth.append(curYear);
		preMonth.append(monthVal);
		preMonth.append(curMonth-1);
		
		nxtMonth.append(curYear);
		nxtMonth.append(monthVal);
		nxtMonth.append(curMonth+1);		
	}
	
	int dayX = 1;
	int dayY = 1;
%>
<body onmouseleave="closeMsg();" style="height:100%">
    
    <!-- main_calendar(S) -->
    <table class="main_calendar">
        <thead>
            <tr>
                <td colspan="7" class="date_td">
	                <!-- main_calendar_date(S) -->
				    <div class="main_calendar_date">
				        <a href="./MainCalendar.clt<%=preMonth%>"></a><!-- 
				     --><span><%=dispMon%></span><!-- 
				     --><a href="./MainCalendar.clt<%=nxtMonth%>"></a>
				    </div>
				    <!-- main_calendar_date(E) -->
			    </td>
            </tr>
            <tr>
				<th scope="col">Sun</th>
				<th scope="col">Mon</th>
				<th scope="col">Tue</th>
				<th scope="col">Wed</th>
				<th scope="col">Thu</th>
				<th scope="col">Fri</th>
				<th scope="col">Sat</th>
			</tr>
        </thead>
        <tbody>
            <tr>
                <%  String span = "";
				    String day  = "";
				    int isSunday = 0;
				    int blankLoop = firDay.get(Calendar.DAY_OF_WEEK);
				    boolean newWeek = false;
				    blankLoop--;
				    String dayKey = null;
				    
				  //월 시작시 빈칸을 넣어준다.
				    for(int p = 0; p < blankLoop; p++){
				        isSunday++;
				%><td>&nbsp;</td><%
				
				    }   
				    
				    while(firDay.before(lstDay)) {
				        day = ""+firDay.get(Calendar.DATE);
				        dayKey = day;
				        

				%>
				<%      if(isSunday==0){ 
				            isSunday++;
				            
				            if(newWeek){
				                dayX = 1;
				                dayY++;
				%><tr><%          
				}%>    <%
				
				}else{ 
		            isSunday++; 
				%>    <% 
				} %>
				<%if(ctoday.equals(firDay)){%>
					<td class='today' style="position: relative;">
				<%} else{%>
					<td style="position: relative;">
				<%} %>
				
	                <%=day%>
	                <% if(hMap.containsKey(dayKey)){ %>
							<span class="schedule_icon" onmouseover="showMsg(true, <%=dayKey%>, <%=dayX%>, <%=dayY%>)" onmouseout="showMsg(false, <%=dayKey%>)"><img src="<%=CLT_PATH%>/web/img/main/skdimg.jpg" height="22px" hspace="2" align="absmiddle"></span>
							<input type="hidden" id="dayMsg<%=dayKey%>" value="<%=((String)hMap.get(dayKey)).replaceAll("<span style='background:FFCC66;;width:100%;'>", "<div class='title'>").replaceAll("</span>", "</div>")%>"">
	                <%  }  %>
	                    <%dayX++;%>    </td><%
            if ( firDay.get(Calendar.DAY_OF_WEEK)%7==0){ 
	            isSunday = 0;
	            newWeek = true;
            %></tr><%
    } 
        span="";
        firDay.add(Calendar.DATE, 1);
    }  %>
<%  if(isSunday>0){ 
       for(int p = isSunday; p < 7; p++){  %><td></td><% } 
   }       
%>
            </tr>
        </tbody>
    </table>
    <!-- 날짜변환  -->
    <div id="cnfMsg" style="position:absolute;display:none; background-color: #FFFFFF; width: 150px; height: 180px; overflow: auto; border: 2px solid #FFCC33;">
			<table>
				<tr>
					<td width="3px"></td>
					<td colspan="3" id="dispSkd" class="table_search_body" style='color:#000000;font-family:"Tahoma","Arial","Verdana";font-size: 11px;'></td>
				</tr>
			</table>
	</div>