<%
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : MGT_LOG_0010.jsp
*@FileTitle  : 
*@author     : CLT
*@version    : 1.0
*@since      : 2014/07/29
=========================================================*/
%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/SUP_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/mgt/log/mail/script/MGT_LOG_0010.js?ver=<%=CLT_JS_VER%>"></script>
	<script>
		var pDoc = parent.parent.parent.document;
		hideProcess('WORKING', pDoc);
	</script>
<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css">
<!--ajax 사용시 -->
<style type="text/css">
<!--
style1 {color: #CC0000}
-->
</style>
<script type="text/javascript">
		function setupPage(){
			loadPage();
		}
	</script>
<form name="frm1" method="POST" action="./">
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd" id="f_cmd" />
	<input type="hidden" name="work_flg" id="work_flg" />
	<input type="hidden" name="f_CurPage" id="f_CurPage" />
    <!-- 타이틀, 네비게이션 -->
 <div class="page_title_area clear">
			<!-- page_title(S) -->
			<h2 class="page_title" id="page_title"><%=LEV3_NM%></h2>
			<!-- page_title(E) -->
			
			<!-- opus_design_btn(S) -->
			<div class="opus_design_btn">
			       <button type="button" class="btn_accent" onClick="doWork('SEARCHLIST')"><bean:message key="Search"/></button>
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
<div class="over_wrap" height="100%">
 	<div class="wrap_search">
	    <!-- inquiry_area(S) -->	
		<div class="opus_design_inquiry entry_pannel ">
			<h3 class="title_design"><bean:message key="Service_Lane"/></h3>	
		    <table>
		        <colgroup>
		        	<col width="50">
		        	<col width="*">
		        </colgroup>
		        <tbody>
						<tr>
	                        <th><bean:message key="Date"/></th>
							<td>
								<input type="text" name="f_strdt" id="f_strdt" value='' dataformat="excepthan" style="width:100px;ime-mode:disabled" maxlength="10" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1)" class="search_form">~ <!--  
								 --><input type="text" name="f_enddt"  id="f_enddt" value='' dataformat="excepthan" style="width:100px;ime-mode:disabled" maxlength="10" onKeyUp="mkDateFormatType(this, event, false, 1)" onBlur="mkDateFormatType(this, event, true, 1)" class="search_form"><!--
								 --><button type="button" class="calendar" tabindex="-1" id="f_dt_cal" name="f_dt_cal"  onclick="doDisplay('DATE1', frm1);"></button>
							</td>
	                   </tr>
				 </tbody>
	        </table>
		</div>
	     <!-- inquiry_area(S) -->	
	</div>
	<!-- wrap search (E) -->	
    
     <div class="wrap_result">
			<div class="opus_design_grid"  id="mainTable">
				 <script type="text/javascript">comSheetObject('sheet1');</script>
			</div>
	</div>
</div>
</form>

