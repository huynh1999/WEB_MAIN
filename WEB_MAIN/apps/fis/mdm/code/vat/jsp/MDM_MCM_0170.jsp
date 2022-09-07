<%
/*=========================================================
*Copyright(c) 2014 CyberLogitec. All Rights Reserved.
*@FileName   : MDM_MCM_0170.jsp
*@FileTitle  : Vat Rate
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
	<script>
		var pDoc = parent.parent.parent.document;
		hideProcess('WORKING', pDoc);
	</script>
	<script type="text/javascript">
		function setupPage(){
			loadPage();
		}
	</script>
	<script type="text/javascript" src="<%=CLT_PATH%>/js/common/message/<%=CLT_MSG_PATH%>/MDM_COM_MSG.js?ver=<%=CLT_JS_VER%>"></script>
	<script type="text/javascript" src="./apps/fis/mdm/code/vat/script/MDM_MCM_0170.js?ver=<%=CLT_JS_VER%>"></script>
	<form name="frm1" method="POST" action="./">
	<input type="hidden" name="f_cmd" id="f_cmd" />
	<input type="hidden" name="f_CurPage" id="f_CurPage" />
	<input type="hidden" name="trdp_cd" id="trdp_cd"/>
	
	<div class="page_title_area clear">
			<!-- page_title(S) -->
			<h2 class="page_title"><%=LEV3_NM%></h2>
			<!-- page_title(E) -->
			<!-- page_location(S) -btnModify->
			<!-- opus_design_btn(S) -->
			<div class="opus_design_btn">
			   <button type="button" class="btn_accent" name="btnSearch" id="btnSearch"   onclick="doWork('SEARCHLIST')"><bean:message key="Search"/></button><!-- 
			--><button type="button" class="btn_normal" id="btnModify" name="btnModify"  onclick="doWork('MODIFY')"><bean:message key="Save"/></button>
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
			<!-- h3 class="title_design"><bean:message key="Search_Condition"/></h3 -->
		    <table>
		       <colgroup>
		        	<col width="80">
		        	<col width="80">
		        	<col width="80">
		        	<col width="*">
		        </colgroup>
		        <tbody>
		        	 <tr>
                          <th><bean:message key="Country"/></th>
                          <td>
                          	<input name="s_cnt_cd" id="s_cnt_cd" type="text" maxlength="5" value='' class="search_form" dataformat="excepthan" style="ime-mode:disabled; text-transform:uppercase;width:50px;"><!-- 
                          	--><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('CONTRY_LIST')"></button>
                          </td>
                          <th><bean:message key="Freight"/></th>
                          <td>
                          	<input name="s_frt_cd" id="s_frt_cd" type="text" maxlength="5" value='' class="search_form" style="width:50px;"><!-- 
                          	 --><button type="button" class="input_seach_btn" tabindex="-1" onclick="doWork('FREIGHT_LIST')"></button>
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
			<h3 class="title_design"><bean:message key="Basic_Information"/></h3>
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
