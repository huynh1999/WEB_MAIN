<%
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : EDI_CSTM_0012.jsp
*@FileTitle  : 국내세관 부서 코드 관리
*@author     : CLT
*@version    : 1.0
*@since      : 2014/07/28
=========================================================*/
%>

<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
    <%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
<%-- 	<bean:define id="mapObj" name="EventResponse" property="mapVal" value=""/> --%>
    <link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css">
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/edi/cstm/krcstm/script/EDI_CSTM_0012.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/EDI_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
    <script type="text/javascript">
		function setupPage(){
			loadPage();
			doWork('SEARCH');
		}
	</script>
<bean:define id="mapObj" name="EventResponse" property="mapVal"/>	
<form name="frm1" method="POST" action="./EDI_CSTM_0012.clt">
    <!--Command를 담는 공통 -->
    <input type="hidden" name="f_cmd" id="f_cmd" />
	<input type="hidden" name="f_set_fdcd" id="f_set_fdcd" />
    <input type="hidden" name="f_cd_seq" id="f_cd_seq" />
    <input type="hidden" name="f_cstm_cd" id="f_cstm_cd" > 
    <input type="hidden" name="f_cstm_seq" id="f_cstm_seq" value="<bean:write name="mapObj" property="cd_seq"/>"> 
		
	<div class="page_title_area clear">
			<!-- page_title(S) -->
			<h2 class="page_title"><bean:message key="Korea_Customs_Dept_Code_Retrieve"/></h2>
			<!-- page_title(E) -->
			
			<!-- opus_design_btn(S) -->
			<div class="opus_design_btn">
			   <button type="button" class="btn_accent" name="btnDefault_Select" id="btnDefault_Select" onclick="doWork('COMMAND01')"><bean:message key="Default_Select"/></button><!-- 
			--><button type="button" class="btn_normal" id="btnClose" id="btnClose" onclick="doWork('CLOSE')"><bean:message key="Close"/></button> 
			</div>
			<!-- opus_design_btn(E) -->
	</div>
    <!-- page_title_area(E) -->	

		 <!-- wrap search (S) -->
<div class="over_wrap" height="100%">
 	<div class="wrap_search">
	    <!-- inquiry_area(S) -->	
		<div class="opus_design_inquiry entry_pannel ">
			<!-- h3 class="title_design"><bean:message key="Search_Condition"/></h3 -->	
		    <table id="tpObj">
		    	<colgroup>
			        	<col width="40">
			        	<col width="50">
			        	<col width="70">
			        	<col width="140">
			        	<col width="30">
			        	<col width="50">
			        	<col width="50">
			        	<col width="*">
			        </colgroup>
		        <tbody>
                  <tr>
                      <th>코드</th>
                      <td>
                          <input type="text" name="f_cd_val" id="f_cd_val" value='' class="search_form" style="width:40px;" maxlength="3">
                      </td>
                      <th>부서명</th>
                      <td>
                          <input type="text" name="f_cd_lbl" id="f_cd_lbl" value='' class="search_form" style="width:150px;" maxlength="50">
                      </td>
                      <td>
                          <button id="saveBt" type="button" class="btn_etc" onclick="doWork('COMMAND02')" >등록</button>
                      </td>
                      <td>
                          <button id="modiBt" style="display:none;"  type="button" class="btn_etc" onclick="doWork('COMMAND03')">수정</button>
                      </td>
                      <td>
                          <button id="delBt"  style="display:none;"  onclick="doWork('COMMAND04')" type="button" class="btn_etc">삭제</button>
                      </td>
                      <td>
                          <button type="button" class="btn_etc" onclick="doWork('RESET')"><bean:message key="Reset"/></button>
                      </td>
                  </tr>
              </table>
		</div>
	     <!-- inquiry_area(S) -->	
	</div>
	<!-- wrap search (E) -->

	<div class="wrap_result">
		<div class="opus_design_grid" id="mainTable">
			<script type="text/javascript">comSheetObject('sheet1');</script>
		</div>
	</div>
</div>
</form>

