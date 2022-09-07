<%
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : MGT_HOL_0010.jsp
*@FileTitle  : 휴일관리
*@author     : CLT
*@version    : 1.0
*@since      : 2014/07/29
=========================================================*/
%>
<%@ page pageEncoding="UTF-8" contentType="text/html;charset=UTF-8" %>
<%@ page import="java.util.*"%>
<%@ page import="com.clt.syscommon.response.CommonEventResponse" %>
<%@ page import="com.clt.apps.opusbase.main.dto.PsonSkdVO" %>

<%@ taglib uri="clt-paging" prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/ModalCalendar.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/CalculationUtil.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="./apps/fis/mgt/hol/history/script/MGT_HOL_0010.js?ver=<%=CLT_JS_VER%>"></script>
	<script>
		var pDoc = parent.parent.parent.document;
		hideProcess('WORKING', pDoc);
	</script>
<style>
    .ta {scrollbar-face-color: #FFFFFF; scrollbar-shadow-color: #666666; 
            scrollbar-highlight-color: #666666; scrollbar-3dlight-color: #DDDDDD; 
            scrollbar-darkshadow-color: #DDDDDD; scrollbar-track-color: #DDDDDD; 
            scrollbar-arrow-color: #666666;}
    td {
     text-overflow: ellipsis;
     overflow: hidden;
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
                    posAddX = -100;
                break;
                case 7:
                    posAddX = -100;
                break;
            }       
            switch(dayY){
                case 3:
                    posAddY = -20;
                break;
                case 4:
                    posAddY = -140;
                break;
                case 5:
                    posAddY = -140;
                break;
                case 6:
                    posAddY = -140;
                break;
            }       
    
            var xCnt = event.clientX + document.body.scrollLeft;
            var yCnt = event.clientY + document.body.scrollTop;

            getObj('cnfMsg').style.posLeft= xCnt+2+posAddX;
            getObj('cnfMsg').style.posTop = yCnt+2+posAddY;
            getObj('cnfMsg').style.display= 'block';
            getObj('dispSkd').innerHTML = inMsg.value;
        }else{
        }
    }
    
    function closeMsg(){
    	getObj('cnfMsg').style.display= 'none';
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
    
    if (hMap == null ) {
    	hMap = new HashMap();
    }
    	 
    
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
<script>
	function setupPage(){
		loadPage();
	}
</script>
 <div class="page_title_area clear">
			<!-- page_title(S) -->
			<h2 class="page_title"><%=LEV3_NM%></h2>
			<!-- page_title(E) -->
			
			<!-- opus_design_btn(S) -->
			<div class="opus_design_btn">
			      <button type="button" class="btn_accent"  name="btnSearch" id="btnSearch" onclick="doWork('SEARCHLIST')"><bean:message key="Search"/></button><!-- 
			    --><button type="button" class="btn_normal"  name="btnNew" id="btnNew" onclick="doWork('ROWADD')"><bean:message key="New"/></button><!-- 
			    --><button type="button" class="btn_normal"  name="btnSave" id="btnSave" onclick="check_save_null()"><bean:message key="Save"/></button>
			</div>
			<!-- opus_design_btn(E) -->
			<!-- page_location(S) -->
			<div class="location">	
				 <span><%=LEV1_NM%></span> &gt;
			 	 <span><%=LEV2_NM%></span> &gt;
			  	 <span><%=LEV3_NM%></span>
		   		<a href="" class="ir">URL Copy</a>
			</div>
			<!-- page_location(E) -->
	</div>
    <!-- page_title_area(E) -->

     <!-- wrap search (S) -->
 	<div class="wrap_search">
	    <!-- inquiry_area(S) -->	
		<div class="opus_design_inquiry entry_pannel ">
		    <table>
		        <colgroup>
		        	<col width="90">
		        	<col width="*">
		        </colgroup>
		        <tbody>
					<tr>
                          <th><bean:message key="Country"/></th>
                          <td>
								<select name="f_curr_tp_cd" id="f_curr_tp_cd">
									<option value=""></option>
									<option value="N"><bean:message key="Customer"/></option>
					                <option value="S">Common</option>
								</select>
                          </td>
                          <th><bean:message key="Customer"/></th>
                          <td>
								<input type="text" name="f_trdp_cd" id="f_trdp_cd" size='10'  maxlength="10" class="search_form" /><!-- 									
								--><button type="button" class="input_seach_btn" tabindex="-1"  onclick="doWork('TRDP_POPLIST')"></button><!-- 
								--><input type="text" name="f_trdp_nm" id="f_trdp_nm" size='24' class="search_form-disable" ReadOnly/>
                          </td>
                      </tr>
                      <tr>
                          <th><bean:message key="From_Currency"/></th>
                          <td>
                              <input name="f_fm_curr_cd" id="f_fm_curr_cd" type="text" class="search_form" style="width:40px;"><!-- 
                               --><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('CURRENCY_POPLIST')"></button>
                          </td>
                          <th><bean:message key="Apply_Date"/></th>
                          <td>                                                                       
                              <input type="text" name="f_aply_fm_dt" id="f_aply_fm_dt" size='10' maxlength="10" class="search_form" />~ <!-- 
                               --><input type="text" name="f_aply_to_dt" id="f_aply_to_dt" size='10' maxlength="10" class="search_form" /><!-- 
                               --><button type="button" class="input_seach_btn" tabindex="-1"  id="f_aply_dt_cal" onclick="doDisplay('DATE01', frm1);"></button>
                          </td>
                          <th><bean:message key="Day_Month_Type"/></th>
                          <td>
                              <select name="f_dt_clss_cd" id="f_dt_clss_cd">
                                  <option value=""></option>
                                  <option value="D">Day</option>
                                  <option value="M">Month</option>
                              </select>
                          </td>
                      </tr>							
				 </tbody>
	        </table>
		</div>
	     <!-- inquiry_area(S) -->	
	</div>
	<!-- wrap search (E) -->	
	<div class="wrap_result">
			<h3 class="title_design"><bean:message key="Route_Transit_Time"/></h3>
			<div class="opus_design_grid"  id="mainTable">
				<div class="opus_design_btn"> 
					<button class="btn_normal" onclick="doWork('ROWADD')"><bean:message key="Add"/></button><!-- 
					 --><button class="btn_normal" onclick="doWork('ROWUP')"><bean:message key="Up"/></button><!-- 
					 --><button class="btn_normal" onclick="doWork('ROWDOWN')"><bean:message key="Down"/></button>
				</div>
				 <script type="text/javascript">comSheetObject('sheet1');</script>
			</div>
			<table>
		        <tr>
		            <td>
		               <a href="./MainCalendar.clt<%=preMonth%>"><img src="<%=CLT_PATH%>/web/img/main/cal_bt_left.gif" border="0"></a>
		               <%=dispMon%>
		               <a href="./MainCalendar.clt<%=nxtMonth%>"><img src="<%=CLT_PATH%>/web/img/main/cal_bt_right.gif" border="0"></a>
		            </td>
		        </tr>
    		</table>
    		<table>
                    <tr>
                        <td class="td_head0">Sun</td>
                        <td class="td_head0">Mon</td>
                        <td class="td_head0">Tue</td>
                        <td class="td_head0">Wed</td>
                        <td class="td_head0">Thu</td>
                        <td class="td_head0">Fri</td>
                        <td class="td_head0">Sat</td>
                    </tr>
                    <tr>
<%
    String span = "";
    int isSunday = 0;
    int blankLoop = firDay.get(Calendar.DAY_OF_WEEK);
    boolean newWeek = false;
    blankLoop--;
    String bgColor = null;
    String dayKey = null;
    StringBuffer sbCal = new StringBuffer();

    //월 시작시 빈칸을 넣어준다.
    for(int p = 0; p < blankLoop; p++){
        isSunday++;
        sbCal.append("<td class=\"table_body_calendar\"></td>");
    }
    
    while(firDay.before(lstDay)) {
    	dayKey = String.valueOf(firDay.get(Calendar.DATE));
        bgColor = null;

        if(ctoday.equals(firDay)){ 
            bgColor = "style='background-color:FFFF99;'";
        }

        if(isSunday==0){
	        isSunday++;

            if(newWeek){
                dayX = 1;
                dayY++;
                sbCal.append("<tr><td colspan=\"7\" class=\"table_body_line\"></td></tr>");
                sbCal.append("<tr>");
            }

            sbCal.append("<td class=\"table_body_calendar_l\">");
        } else {
            isSunday++; 
            sbCal.append("<td class=\"table_body_calendar\" ");
            if (bgColor!=null){
            	sbCal.append(bgColor);
            }
            sbCal.append(">");
        }

        sbCal.append("<b>").append(dayKey).append("</b>");
        sbCal.append("<img src=\"").append(CLT_PATH).append("/web/img/main/calendar_bar.gif\" width=\"1\" height=\"12\" hspace=\"2\" align=\"absmiddle\"><br>");
        
        if(hMap.containsKey(dayKey)){
            sbCal.append("<table  width=\"100%\" height=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">");
            sbCal.append("<tr>");
            sbCal.append("<td class=\"table_body_calendar_t\" ");
            if (bgColor!=null){
            	sbCal.append(bgColor);
            }
            sbCal.append(">");
            sbCal.append("<img src=\"").append(CLT_PATH).append("/web/img/main/skdimg.jpg\" onmouseover=\"showMsg(true,");
            sbCal.append(dayKey).append(",").append(dayX).append(",").append(dayY);
            sbCal.append("\" onmouseout=\"showMsg(false,").append(dayKey).append(");\" width=\"35\" height=\"35\" align=\"absmiddle\" style=\"cursor:hand;\">");
            sbCal.append("<input type=\"hidden\" id=\"dayMsg").append(dayKey).append("\" value=\"").append(hMap.get(dayKey)).append("\">");
            sbCal.append("</td>");
            sbCal.append("</tr>");
            sbCal.append("</table>");
        } else {
            sbCal.append("<table onmouseover=\"closeMsg();\"  width=\"100%\" height=\"100%\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">");
            sbCal.append("<tr>");
            sbCal.append("<td class=\"table_body_calendar_t\" ");
            if (bgColor!=null){
            	sbCal.append(bgColor);
            }
            sbCal.append(">&nbsp;</td></tr></table>");
        }
        dayX++;
        sbCal.append("</td>");
        
        if ( firDay.get(Calendar.DAY_OF_WEEK)%7==0){ 
            isSunday = 0;
            newWeek = true;
            sbCal.append("</tr>");
        }

        span="";
        firDay.add(Calendar.DATE, 1);
    }

    if (isSunday>0) {
        for (int p=isSunday; p<7; p++) {
            sbCal.append("<td class=\"table_body_calendar\"></td>");
        }
    }

    out.println(sbCal.toString());

%>
        </tr>
    </table>
	<!-- 달력 END -->
	<textarea><%= sbCal.toString() %></textarea>
	</div>
