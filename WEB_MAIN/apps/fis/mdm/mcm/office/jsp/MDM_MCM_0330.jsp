<%
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : MDM_MCM_0330.jsp
*@FileTitle  : Office Code Search
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
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/MDM_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/apps/fis/mdm/mcm/office/script/MDM_MCM_0330.js?ver=<%=CLT_JS_VER%>"></script>
	<script>
		var pDoc = parent.parent.parent.document;
		hideProcess('WORKING', pDoc);
	</script>
	<script type="text/javascript">
		function setupPage(){
			loadPage();
		}
	</script>
	<form name="frm1" method="POST" action="./">
	<input type="hidden" name="f_cmd" id="f_cmd" />
	<input type="hidden" name="f_CurPage" id="f_CurPage" />
	<div class="page_title_area clear">
			<!-- page_title(S) -->
			<h2 class="page_title"><%=LEV3_NM%></h2>
			<!-- page_title(E) -->
			
			<!-- opus_design_btn(S) -->
			<div class="opus_design_btn">
			   <button type="button" class="btn_accent"  onclick="doWork('SEARCHLIST')"><bean:message key="Search"/></button>
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
			<!-- h3 class="title_design"><bean:message key="Search_Condition"/></h3 -->	
		    <table>
		        <colgroup>
		        	<col width="90">
		        	<col width="140">
		        	<col width="130">
		        	<col width="60">
		        	<col width="80">
		        	<col width="*">
		        </colgroup>
		        <tbody>
					  <tr>
                            <th><bean:message key="Office_Name"/></th>
                            <td>
                            	<bean:define id="paramMap" name="EventResponse" property="mapVal"/><!-- 
                            	 --><input name="s_ofc_eng_nm"  id="s_ofc_eng_nm" type="text" value='<bean:write name="paramMap" property="s_ofc_eng_nm"/>' class="search_form" style="width:150px;" onKeyPress="fncOfficeSearch()">
                            </td>
                            <th><bean:message key="Country_Code"/></th>
                           <td>
	                           	<input name="s_cnt_cd" id="s_cnt_cd" type="text" maxlength="2" value='<bean:write name="paramMap" property="s_cnt_cd"/>' class="search_form" dataformat="excepthan" style="width:30px;text-transform:uppercase;ime-mode:disabled;"><!-- 
	                           	 --><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('COUNTRY_POPLIST', 'S')"></button>
                           </td>
                           <th><bean:message key="USE"/></th>
                            <td>
                            	<input name="s_use_flg" id="s_use_flg" type="radio" value="Y" <logic:equal name="paramMap" property="s_use_flg" value="Y">checked</logic:equal>><label for="s_use_flg">Yes</label>&nbsp;&nbsp;<!-- 
                            	 --><input name="s_use_flg"  id="s_use_flg2" type="radio" value="N" <logic:equal name="paramMap" property="s_use_flg" value="N">checked</logic:equal>><label for="s_use_flg2">No</label>&nbsp;&nbsp;<!-- 
                            	 --><input name="s_use_flg" id="s_use_flg3" type="radio" value=""  <logic:equal name="paramMap" property="s_use_flg" value="">checked</logic:equal>><label for="s_use_flg3">All</label>&nbsp;&nbsp;
                            </td>
                        </tr>
				 </tbody>
	        </table>
		</div>
	     <!-- inquiry_area(S) -->	
	</div>
	<!-- wrap search (E) -->	
	
	<div class="wrap_result">
			<h3 class="title_design"><bean:message key="Office_List"/></h3>
			<div class="opus_design_grid"  id="mainTable">
				 <script type="text/javascript">comSheetObject('sheet1');</script>
			</div>
			<div>
	        <!-------------------- Display option Begin -------------------->
										<bean:define id="tmpMapVal" name="EventResponse" property="mapVal"/>
										<bean:define id="pagingVal" name="tmpMapVal"     property="paging"/>
										<paging:options name="pagingVal" defaultval="200"/>
			<!-------------------- Display option End -------------------->					
			<span id="pagingTb" style='font-family: "Tahoma", "Arial", "Verdana";font-size: 11px;'> </span>
			</div>
	</div>
</div>
</form>

