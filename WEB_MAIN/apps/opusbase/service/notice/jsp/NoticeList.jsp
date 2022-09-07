<%--
=========================================================
*Copyright(c) 2008 CyberLogitec. All Rights Reserved.
=========================================================

=========================================================
*@FileName   : MGT_NTC_0010.jsp
*@FileTitle  : 게시판 목록 화면
*@Description: 게시판 목록을 조회합니다.
*@author     : Kang,Jung-Gu - Cyberlogitec
*@version    : 1.0 - 02/05/2009
*@since      : 02/05/2009

*@Change history:
=========================================================
--%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
<%@include file="./../../../../../../../../syscommon/header/CLTHeader.jsp"%>

	<bean:define id="tmpMapVal" name="EventResponse" property="mapVal"/>
	
	<!--link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" -->
    <!-- 일자 및 달력팝업 호출 -->
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	
	<script type="text/javascript" src="./apps/opusbase/service/notice/script/NoticeList.js?ver=<%=CLT_JS_VER%>"></script>
</head>

<script>	
function setupPage(){
	loadPage();
	initFinish();
	doWork('SEARCHLIST');
}
</script>

<form name="fName" method="POST">
    <input type="hidden" name="f_cmd"     value="">
    <input type="hidden" name="f_CurPage" value="">
    <input type="hidden" name="f_brd_seq" value="">
		
    <!-- 타이틀, 네비게이션 -->
    
    <div class="page_title_area clear">
	   <h2 class="page_title"><button type="button"><%=LEV3_NM%></button></h2>
	   <!-- btn_div -->
	   <div class="opus_design_btn TOP">
	   <%-- 
		   <button type="button" class="btn_accent" onclick="doWork('SEARCHLIST');" style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr1() %>">Search</button> 
		   <button type="button" class="btn_normal" onclick="doWork('NEW')"  style="cursor:hand; display:none;" btnAuth="<%= roleBtnVO.getAttr2() %>"><bean:message key="New"/></button>
		    --%>
	   </div>
	   <!-- btn_div -->
	   <div class="location">
		   <span><%=LEV1_NM%></span> &gt;
		   <span><%=LEV2_NM%></span> &gt;
		   <span><%=LEV3_NM%></span>
		   <a href="" class="ir">URL Copy</a>
	   </div>
	</div>
<div class="over_wrap" height="100%">	
	<div class="wrap_search">	
		<div class="opus_design_inquiry entry_pannel ">
            <table>
            	<colgroup>
            		<col width="60">
            		<col width="120">
            		<col width="60">
            		<col width="*">
            	</colgroup>
            	<tbody>
               		<tr>
                      <th><bean:message key="Reg_Date"/></th>
                      <td><!--
                      --><input type="text" name="f_dp_bgn_dt" id="f_dp_bgn_dt" value='<bean:write name="tmpMapVal" property="f_dp_bgn_dt"/>' dataformat="excepthan" style="width:70px;ime-mode:disabled" maxlength="10" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1)" class="search_form"><span class="dash">~</span><!--
                      --><input type="text" name="f_dp_end_dt" id="f_dp_end_dt" value='<bean:write name="tmpMapVal" property="f_dp_end_dt"/>' dataformat="excepthan" style="width:70px;ime-mode:disabled" maxlength="10" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1)" class="search_form"><!--
                      --><button type="button" onclick="doDisplay('DATE1', fName);" class="calendar" tabindex="-1"></button></td>
                      <th><bean:message key="User"/></th>
                      <td ><!-- 
                          --><input type="text" name="f_modi_usrid"  maxlength="12" value='<bean:write name="tmpMapVal" property="f_modi_usrid"/>'   dataformat="excepthan" style="ime-mode:disabled;width:50px;"><!--  
                          --><input type="text" name="f_modi_eng_usr_nm" maxlength="50"  value='<bean:write name="tmpMapVal" property="f_modi_eng_usr_nm"/>'  dataformat="excepthan" style="ime-mode:disabled;width:150px;"></td>
                   </tr>
                </tbody>
           </table>
	    </div>
	</div>
	<div class="wrap_result">
    	<div class="opus_design_grid">
	    	<div class="opus_design_inquiry">
    		<script type="text/javascript">comSheetObject('sheet1');</script>
    	
    		<!--- Paging(공통) --->
		    <table>
		        <tr>
		            <td width="60">
				<!--- Display option Begin --->
						<bean:define id="pagingVal" name="tmpMapVal"     property="paging"/>
						<paging:options name="pagingVal" defaultval="50"/>
				<!--- Display option End --->                 
		            </td>
		            <td align="center">
		                <table  border="0" width="100%">
		                    <tr>
		                        <td id="pagingTb" align="center" class="paging" height="10" valign="bottom"></td>
		                        <td width="60"></td>
		                    </tr>
		                </table>
		            </td>
		        </tr>
		    </table>
		<!--- Paging(공통) --->
    	</div>
    	</div>
    </div>
    
</div>    
</form>
  
<script type="text/javascript">
doBtnAuthority("<%= roleBtnVO.getAttr_extension() %>");
</script>	
