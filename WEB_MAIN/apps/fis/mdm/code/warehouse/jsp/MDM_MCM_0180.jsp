<%
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : MDM_MCM_0180.jsp
*@FileTitle  : Package Code
*@author     : CLT
*@version    : 1.0
*@since      : 2014/07/28
=========================================================*/
%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page pageEncoding="UTF-8"%>
<%@ taglib uri="clt-paging"   prefix="paging" %>
	<!-- 공통 Header -->
	<%@include file="./../../../../../../syscommon/header/CLTHeader.jsp"%>
	<link href="<%=CLT_PATH%>/style/css/theme_default.css?ver=<%=CLT_JS_VER%>" rel="stylesheet" type="text/css" />
	<!-- 일자 및 달력팝업 호출 -->
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/DateFormat.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/CoCalendar.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/ajax_util.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/MDM_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="./apps/fis/mdm/code/warehouse/script/MDM_MCM_0180.js?ver=<%=CLT_JS_VER%>"></script>
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
	<!--Command를 담는 공통 -->
	<input type="hidden" name="f_cmd" id="f_cmd" />
	<input type="hidden" name="f_CurPage" id="f_CurPage" />
	<input type="hidden" name="trdp_cd" id="trdp_cd" />
	
	<div class="page_title_area clear">
			<!-- page_title(S) -->
			<h2 class="page_title"><%=LEV3_NM%></h2>
			<!-- page_title(E) -->
			<!-- page_location(S) -->
			<!-- opus_design_btn(S) -->
			<div class="opus_design_btn">
			   <button type="button" class="btn_accent" name="btnSearch" id="btnSearch"  onclick="doWork('SEARCHLIST')"><bean:message key="Search"/></button><!-- 
			--><button type="button" class="btn_normal" id="btnAdd" name="btnAdd"    onclick="doWork('ROWADD')"><bean:message key="Add"/></button><!-- 
			--><button type="button" class="btn_normal" id="btnModify"  name="btnModify" onclick="doWork('MODIFY')"><bean:message key="Save"/></button> 
			</div>
			<!-- opus_design_btn(E) -->
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
		<div class="opus_design_inquiry ">
			<h3 class="title_design"><bean:message key="Basic_Information"/></h3>
		    <table>
		        <colgroup>
		        	<col width="100">
		        	<col width="100">
		        	<col width="120">
		        	<col width="100">
		        	<col width="150">
		        	<col width="100">
		        	<col width="100">
		        	<col width="*">
		        </colgroup>
			        <tbody>
			        	 <tr>
	                        <th><bean:message key="Sea_Air"/></th>
	                        <td>
	                            <select name="air_sea_clss_cd" id="air_sea_clss_cd">
	                                <option value=''>ALL</option>
	                                <option value='S'>Sea</option>
	                                <option value='A'>Air</option>
	                            </select>
	                        </td>
	                        <th><bean:message key="WareHouse_Code"/></th>
	                        <td>
	                            <input name="wh_cd"  id="wh_cd" type="text" value="" class="search_form" style="width:120px;" maxlength="15" ><!-- 
	                             --><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('LINER_POPLIST')"></button>
	                        </td>
	                        <th><bean:message key="Warehouse_Name"/></th>
	                        <td>
	                            <input name="wh_nm" id="wh_nm" type="text" value="" class="search_form" style="width:120px;" maxlength="10" >
	                        </td>
	                        <th><bean:message key="EDI_Code"/></th>
	                        <td>
	                            <input name="edi_cd" id="edi_cd" type="text" value="" class="search_form" style="width:40px;" maxlength="10" >
	                        </td>
	                    </tr>
		        </tbody>
	        </table>
		</div>
	     <!-- inquiry_area(S) -->	
	</div>
	<!-- wrap search (E) -->
	
	<!-- wrap search (E) -->		
	<div class="wrap_result">
		<div class="opus_design_inquiry entry_pannel">
			<h3 class="title_design"><bean:message key="Basic_Information"/></h3>
			<div class="opus_design_grid"  id="mainTable">
				 <script type="text/javascript">comSheetObject('sheet1');</script>
			</div>
			<table>
		        <tr>
		            <td width="55">
		                <bean:define id="tmpMapVal" name="EventResponse" property="mapVal"/>
		                <bean:define id="pagingVal" name="tmpMapVal"     property="paging"/>
		                <paging:options name="pagingVal" defaultval="200"/>
		            </td>
		            <td id="pagingTb" style='font-family: "Tahoma", "Arial", "Verdana";font-size: 11px;'></td>                               
		        </tr>
		    </table>
		</div>
	</div>
</div>
</form>

